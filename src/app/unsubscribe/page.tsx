'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { logger } from '@/library/logger'

import { SimpleLayout } from '@/components/SimpleLayout'
import Spinner from '@/components/Spinner'
import StyledLink from '@/components/StyledLink'

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

export default function UnsubscribePage() {
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

        const basePath: ApiPath = '/api/subscriptions/unsubscribe'
        logger.info('Making unsubscribe request', { encodedEmail, basePath })

        const response = await fetch(`${basePath}?x=${token}&e=${encodedEmail}`, {
          method: 'DELETE',
        })

        const data =
          (await response.json()) as ApiEndpoints['/api/subscriptions/unsubscribe']['DELETE']['response']

        if (response.status === 400) {
          setState(UnsubscribeStates.invalid)
          return
        }

        if (response.status === 404) {
          setState(UnsubscribeStates.already)
          return
        }

        if (!response.ok) {
          setState(UnsubscribeStates.error)
          return
        }

        setEmail(encodedEmail)
        setState(UnsubscribeStates.success)
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
          Processing your unsubscribe request... <Spinner classes="mt-4" />
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
          ${email} successfully unsubscribed from the newsletter.
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
          You are already unsubscribed from the newsletter.
          <br />
          <br />
          If you'd like to receive updates again, you can{' '}
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
