'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import { Container } from '@/components/Container'
import ErrorButtons from '@/components/ErrorButtons'
import { SimpleLayout } from '@/components/SimpleLayout'

import { usePreviousPathname } from '@/providers/previousPathname'

function ErrorContent() {
  const searchParams = useSearchParams()
  const errorMessage = searchParams.get('message') || 'An error occurred'
  const previousPathname = usePreviousPathname()

  return (
    <SimpleLayout title="Error" intro={errorMessage}>
      <ErrorButtons path={previousPathname} />
    </SimpleLayout>
  )
}

export default function ErrorPage() {
  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorContent />
      </Suspense>
    </Container>
  )
}
