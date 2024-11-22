'use client'

import { NewsletterForm } from '@/components/newsletterForm'
import { SimpleLayout } from '@/components/SimpleLayout'

export default function Page() {
  return (
    <SimpleLayout
      title={'Dan Edwards creative'}
      intro={'Pop music producer & songwriter in Salisbury, UK'}
      articleContent={false}
    >
      <NewsletterForm />
    </SimpleLayout>
  )
}
