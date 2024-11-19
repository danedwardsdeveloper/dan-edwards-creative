'use client'

import LinksList from './components/LinksList'
import { SimpleLayout } from '@/components/SimpleLayout'

import { musicLinkItems } from './data'

export default function LinksPage() {
  return (
    <SimpleLayout
      title={'Dan Edwards creative | Links'}
      intro={`I'm a pop music producer and songwriter in Salisbury, UK. Here are all my links in one place.`}
      articleContent={false}
    >
      <LinksList linkItems={musicLinkItems} classes="mb-32" />
    </SimpleLayout>
  )
}
