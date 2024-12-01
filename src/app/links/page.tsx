'use client'

import LinksList from './components/LinksList'
import { Header } from '@/components/Header'
import { NewsletterForm } from '@/components/newsletterForm'
import TwoColumnLayout from '@/components/TwoColumnLayout'

import { allLinks } from './data'

export default function LinksPage() {
  return (
    <>
      <Header
        title={'Links'}
        intro={
          <>
            {`Dan Edwards creative.`}
            <br />
            {`Pop music producer & songwriter in Salisbury, UK.`}
          </>
        }
      />
      <TwoColumnLayout columnOne={<LinksList linkItems={allLinks} />} columnTwo={<NewsletterForm />} />
    </>
  )
}
