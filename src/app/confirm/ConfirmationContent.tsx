'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import logger from '@/library/logger'
import { typesafeFetch } from '@/library/typesafeFetch'

import { SimpleLayout } from '@/components/SimpleLayout'
import Spinner from '@/components/Spinner'
import StyledLink from '@/components/StyledLink'

import { ApiEndpoints } from '@/types/apiEndpoints'

type ConfirmationState = 'default' | 'loading' | 'invalid' | 'success' | 'already' | 'error'

export default function ConfirmationContent() {
  const [state, setState] = useState<ConfirmationState>('default')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')

  const searchParams = useSearchParams()

  useEffect(() => {
    async function confirmSubscription() {
      try {
        const typesafeParams = Object.fromEntries(
          searchParams.entries(),
        ) as ApiEndpoints['/api/subscriptions/confirm']['PATCH']['params']
        const token = typesafeParams.x
        const email = typesafeParams.e

        logger.debug('Received confirmation parameters', { email, hasToken: !!token })

        if (!token && !email) {
          logger.info('No token or email provided, showing default state')
          setState('default')
          return
        }

        setState('loading')

        if (!token || !email) {
          logger.info('Missing required parameter', { hasToken: !!token, hasEmail: !!email })
          setState('invalid')
          return
        }

        const data = await typesafeFetch({
          path: '/api/subscriptions/confirm',
          method: 'PATCH',
          params: {
            e: email,
            x: token,
          },
        })

        const message = data.message

        if (message === "Missing param: 'e'" || message === "Missing param: 'x'") {
          setState('invalid')
          return
        }

        if (message === 'Email already confirmed') {
          if (data.subscriber) {
            setFirstName(data.subscriber.firstName)
            setEmail(data.subscriber.email)
          }
          setState('already')
          return
        }

        if (message === 'Email confirmed successfully') {
          if (data.subscriber) {
            setFirstName(data.subscriber.firstName)
            setEmail(data.subscriber.email)
          }
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
          Thank you{firstName ? `, ${firstName}` : ''} for your support.
          <br />
          <br />
          {email ? email : 'Your email'} has been subscribed to my newsletter.
        </>
      ),
    },
    already: {
      title: 'Already subscribed',
      intro: (
        <>
          {email ? email : 'Your email'} is already subscribed to my newsletter.
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
