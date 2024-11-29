'use client'

import ObfuscatedEmail from '../privacy-policy-and-terms-of-service/components/ObfuscatedEmail'
import { NewsletterForm } from '@/components/newsletterForm'
import TwoColumnLayout from '@/components/TwoColumnLayout'

export default function ContactPage() {
  return (
    <TwoColumnLayout
      title={'Contact'}
      intro={`If you'd like to work with me or have a question, I'd love to hear from you.`}
      columnOne={<ObfuscatedEmail />}
      columnTwo={<NewsletterForm />}
    />
  )
}
