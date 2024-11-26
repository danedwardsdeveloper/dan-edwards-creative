'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

import { logger } from '@/library/logger'

import { SimpleLayout } from '@/components/SimpleLayout'
import Spinner from '@/components/Spinner'
import StyledLink from '@/components/StyledLink'

import { decodeEmail } from '../api/subscriptions/utilities'
import { ApiEndpoints, ApiPath } from '@/types/apiEndpoints'

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
        const token = typesafeParams.x
        const encodedEmail = typesafeParams.e

        logger.info('Received unsubscribe parameters', { encodedEmail, hasToken: !!token })

        if (!token && !encodedEmail) {
          logger.info('No token or email provided, showing default state')
          setState('default')
          return
        }

        setState(UnsubscribeStates.loading)

        if (!token || !encodedEmail) {
          logger.info('Missing required parameter', { hasToken: !!token, hasEmail: !!encodedEmail })
          setState(UnsubscribeStates.invalid)
          return
        }

        const path: ApiPath<'/api/subscriptions/unsubscribe'> = '/api/subscriptions/unsubscribe'

        logger.info('Making unsubscribe request', { encodedEmail, path })

        const response = await fetch(`${path}?x=${token}&e=${encodedEmail}`, {
          method: 'DELETE',
        })

        const data: ApiEndpoints['/api/subscriptions/unsubscribe']['DELETE']['response'] =
          await response.json()

        const message = data.message

        if (message === 'Invalid link') {
          setState(UnsubscribeStates.invalid)
          return
        }

        if (message === 'Already unsubscribed') {
          setState(UnsubscribeStates.already)
          return
        }

        if (message === 'Unsubscribed successfully') {
          setEmail(decodeEmail(encodedEmail))
          setState(UnsubscribeStates.success)
        }
      } catch {
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
