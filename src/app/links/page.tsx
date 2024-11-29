'use client'

import LinksList from './components/LinksList'
import { NewsletterForm } from '@/components/newsletterForm'
import TwoColumnLayout from '@/components/TwoColumnLayout'

import { allLinks } from './data'

export default function LinksPage() {
  return (
    <TwoColumnLayout
      title={'Links'}
      intro={`Dan Edwards | Pop music producer & songwriter in Salisbury, UK. All my links in one place`}
      columnOne={<LinksList linkItems={allLinks} classes="mb-64" />}
      columnTwo={<NewsletterForm />}
    />
  )
}
