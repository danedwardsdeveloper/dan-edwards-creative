'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

import logger from '@/library/logger'
import { typesafeFetch } from '@/library/typesafeFetch'

import { SimpleLayout } from '@/components/SimpleLayout'
import Spinner from '@/components/Spinner'
import StyledLink from '@/components/StyledLink'

import { decodeEmail } from '../api/subscriptions/utilities'
import { ApiEndpoints } from '@/types/apiEndpoints'

const UnsubscribeStates = {
  default: 'default',
  loading: 'loading',
  invalid: 'invalid',
  success: 'success',
  already: 'already',
  error: 'error',
} as const

type UnsubscribeState = (typeof UnsubscribeStates)[keyof typeof UnsubscribeStates]

function UnsubscribeContent() {
  const [state, setState] = useState<UnsubscribeState>(UnsubscribeStates.default)
  const [email, setEmail] = useState<string>('')
  const searchParams = useSearchParams()

  useEffect(() => {
    async function handleUnsubscribe() {
      try {
        const typesafeParams = Object.fromEntries(
          searchParams.entries(),
        ) as ApiEndpoints['/api/subscriptions/unsubscribe']['DELETE']['params']

        setState(UnsubscribeStates.loading)

        const token = typesafeParams.x
        const encodedEmail = typesafeParams.e

        logger.debug('Received unsubscribe parameters', { encodedEmail, hasToken: !!token })

        if (!token && !encodedEmail) {
          logger.debug('No token or email provided, showing default state')
          setState('default')
          return
        }

        if (!token || !encodedEmail) {
          logger.info('Missing required parameter', { hasToken: !!token, hasEmail: !!encodedEmail })
          setState(UnsubscribeStates.invalid)
          return
        }

        const response = await typesafeFetch({
          path: '/api/subscriptions/unsubscribe',
          method: 'DELETE',
          params: {
            x: token,
            e: encodedEmail,
          },
        })

        const message = response.message

        switch (message) {
          case 'Invalid link':
            setState(UnsubscribeStates.invalid)
            break
          case 'Already unsubscribed':
            setState(UnsubscribeStates.already)
            break
          case 'Unsubscribed successfully':
            setEmail(decodeEmail(encodedEmail))
            setState(UnsubscribeStates.success)
            break
          case 'Failed to unsubscribe':
            setState(UnsubscribeStates.error)
            break
          default:
            logger.error('Unexpected response message', { message: response.message })
            setState(UnsubscribeStates.error)
        }
      } catch (error) {
        logger.error('Error handling unsubscribe', { error })
        setState(UnsubscribeStates.invalid)
      }
    }

    handleUnsubscribe()
  }, [searchParams])

  const content = {
    default: {
      title: 'Unsubscribe',
      intro: 'Please check your email for the unsubscribe link.',
    },
    loading: {
      title: 'Unsubscribe',
      intro: (
        <>
          Unsubscribing... <Spinner classes="mt-4" />
        </>
      ),
    },
    invalid: {
      title: 'Invalid link',
      intro: (
        <>
          This unsubscribe link is invalid or expired.
          <br />
          <br />
          Please double-check the link in your email or <StyledLink href="/contact" text="contact me" />{' '}
          directly
        </>
      ),
    },
    success: {
      title: 'Successfully unsubscribed',
      intro: (
        <>
          {`${email} successfully unsubscribed from the newsletter.`}
          <br />
          <br />
          You can always <StyledLink href="/newsletter" text="subscribe again" />.
        </>
      ),
    },
    already: {
      title: 'Already unsubscribed',
      intro: (
        <>
          {`We have no record of ${email ? email : ' your email'} on our mailing list.`}
          <br />
          <br />
          {`If you'd like to receive updates again, you can `}
          <StyledLink href="/newsletter" text="subscribe here" />.
        </>
      ),
    },
    error: {
      title: 'Something went wrong',
      intro: (
        <>
          We encountered an error while processing your unsubscribe request.
          <br />
          <br />
          Please try again or <StyledLink href="/contact" text="contact me" /> directly.
        </>
      ),
    },
  }

  return <SimpleLayout title={content[state].title} intro={content[state].intro} />
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <SimpleLayout
          title="Unsubscribe"
          intro={
            <>
              Loading unsubscribe details... <Spinner classes="mt-4" />
            </>
          }
        />
      }
    >
      <UnsubscribeContent />
    </Suspense>
  )
}
