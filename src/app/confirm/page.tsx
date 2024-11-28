'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useEffect, useState } from 'react'

import logger from '@/library/logger'
import { typesafeFetch } from '@/library/typesafeFetch'

import { SimpleLayout } from '@/components/SimpleLayout'
import Spinner from '@/components/Spinner'
import StyledLink from '@/components/StyledLink'

import { decodeEmail } from '../api/subscriptions/utilities'
import { ApiEndpoints } from '@/types/apiEndpoints'

type ConfirmationState = 'default' | 'loading' | 'invalid' | 'success' | 'already' | 'error' | 'not found'

type ContentItem = {
  title: string
  intro: string | JSX.Element
}

type ContentRecord = Record<ConfirmationState, ContentItem>

function ConfirmationContent() {
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
        const encodedEmail = typesafeParams.e

        logger.debug('Received confirmation parameters: ', { email: encodedEmail, hasToken: !!token })

        if (!token && !encodedEmail) {
          logger.info('No token or email provided, showing default state')
          setState('default')
          return
        }

        setState('loading')

        if (!token || !encodedEmail) {
          logger.info('Missing required parameter', { hasToken: !!token, hasEmail: !!encodedEmail })
          setState('invalid')
          return
        }

        const decodedEmail = decodeEmail(encodedEmail)
        if (!decodedEmail) {
          setState('invalid')
          return
        }

        const data = await typesafeFetch({
          path: '/api/subscriptions/confirm',
          method: 'PATCH',
          params: {
            e: encodedEmail,
            x: token,
          },
        })

        if (data.subscriber) {
          setFirstName(data.subscriber.firstName)
          setEmail(data.subscriber.email)
        } else {
          setEmail(decodeEmail(encodedEmail))
        }

        switch (data.message) {
          case 'Subscriber not found':
            setState('not found')
            break

          case "Missing param: 'e'":
          case "Missing param: 'x'":
            setState('invalid')
            break

          case 'Email already confirmed':
            setState('already')
            break

          case 'Email confirmed successfully':
            setState('success')
            break

          default:
            throw new Error('Unexpected response')
        }
      } catch (error) {
        logger.error('Confirmation error:', error)
        setState('error')
      }
    }

    confirmSubscription()
  }, [searchParams])

  const content: ContentRecord = {
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
    'not found': {
      title: 'Not found',
      intro: (
        <>
          {email ? email : 'Email'} not found in our database. Please try subscribing again or{' '}
          <StyledLink href="/contact" text="contact me" /> directly.
        </>
      ),
    },
  }

  return <SimpleLayout title={content[state].title} intro={content[state].intro} />
}

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <SimpleLayout
          title="Confirm"
          intro={
            <>
              Loading subscription details... <Spinner classes="mt-4" />
            </>
          }
        />
      }
    >
      <ConfirmationContent />
    </Suspense>
  )
}
