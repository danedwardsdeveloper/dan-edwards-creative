'use client'

import { Header } from '@/components/Header'
import { NewsletterForm } from '@/components/newsletterForm'
import TwoColumnLayout from '@/components/TwoColumnLayout'

import ObfuscatedEmail from './ObfuscatedEmail'

export default function ContactPage() {
  return (
    <>
      <Header
        title={'Contact'}
        intro={`If you'd like to work with me or have a question, I'd love to hear from you.`}
      />
      <TwoColumnLayout columnOne={<ObfuscatedEmail />} columnTwo={<NewsletterForm />} />
    </>
  )
}
