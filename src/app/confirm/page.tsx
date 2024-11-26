'use client'

import { Suspense } from 'react'

import { SimpleLayout } from '@/components/SimpleLayout'
import Spinner from '@/components/Spinner'

import ConfirmationContent from './ConfirmationContent'

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
