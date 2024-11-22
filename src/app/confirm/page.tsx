'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { SimpleLayout } from '@/components/SimpleLayout'
import Spinner from '@/components/Spinner'
import StyledLink from '@/components/StyledLink'

type ConfirmationState = 'default' | 'loading' | 'invalid' | 'success' | 'already' | 'error'

interface SubscriberResponse {
  error?: string
  message?: string
  subscriber?: {
    name: string
    email: string
  }
}

export default function ConfirmPage() {
  const [state, setState] = useState<ConfirmationState>('default')
  const [subscriber, setSubscriber] = useState<{ name: string; email: string }>({ name: '', email: '' })
  const searchParams = useSearchParams()

  useEffect(() => {
    async function confirmSubscription() {
      try {
        const token = searchParams.get('x')
        const email = searchParams.get('e')

        if (!token && !email) {
          setState('default')
          return
        }

        setState('loading')

        if (!token || !email) {
          setState('invalid')
          return
        }

        const response = await fetch(`/api/subscriptions/confirm?x=${token}&e=${email}`, {
          method: 'PATCH',
        })

        const data: SubscriberResponse = await response.json()

        if (!response.ok) {
          setState('invalid')
          return
        }

        if (data.message === 'Email already confirmed' && data.subscriber) {
          setSubscriber(data.subscriber)
          setState('already')
          return
        }

        if (data.subscriber) {
          setSubscriber(data.subscriber)
          setState('success')
        }
      } catch {
        setState('error')
      }
    }

    confirmSubscription()
  }, [searchParams])

  const content = {
    default: {
      title: 'Confirm',
      intro: 'Please check your email to confirm your subscription.',
    },
    loading: {
      title: 'Confirm',
      intro: (
        <>
          Checking your subscription details... <Spinner classes="mt-4" />
        </>
      ),
    },
    invalid: {
      title: 'Invalid link',
      intro: (
        <>
          This subscription confirmation link is invalid or expired.
          <br />
          <br />
          Please double-check the link in your email, sign up again for a fresh confirmation link, or{' '}
          <StyledLink href="/contact" text="contact me" /> directly
        </>
      ),
    },
    success: {
      title: 'Subscription confirmed',
      intro: (
        <>
          Thank you{subscriber.name ? ` ${subscriber.name},` : ''} for your support.
          <br />
          <br />
          {subscriber.email ? subscriber.email : 'Your email'} has been subscribed to my newsletter.
        </>
      ),
    },
    already: {
      title: 'Already subscribed',
      intro: (
        <>
          {subscriber.email ? subscriber.email : 'Your email'} is already subscribed to my newsletter.
          <br />
          <br />
          Thank you for your continued support.
        </>
      ),
    },
    error: {
      title: 'Something went wrong',
      intro: (
        <>
          Please double-check the link in your email, sign up again for a fresh confirmation link, or{' '}
          <StyledLink href="/contact" text="contact me" /> directly.
        </>
      ),
    },
  }

  return <SimpleLayout title={content[state].title} intro={content[state].intro} />
}
