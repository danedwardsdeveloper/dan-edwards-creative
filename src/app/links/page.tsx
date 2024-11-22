'use client'

import LinksList from './components/LinksList'
import { SimpleLayout } from '@/components/SimpleLayout'

import { musicLinkItems } from './data'

export default function LinksPage() {
  return (
    <SimpleLayout
      title={'Links'}
      intro={`Dan Edwards | Pop music producer & songwriter in Salisbury, UK. All my links in one place`}
      articleContent={false}
    >
      <LinksList linkItems={musicLinkItems} classes="mb-64" />
    </SimpleLayout>
  )
}
