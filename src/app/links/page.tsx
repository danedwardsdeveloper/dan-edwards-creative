'use client'

import LinksList from './components/LinksList'
import { SimpleLayout } from '@/components/SimpleLayout'

import { musicLinkItems } from './data'

export default function LinksPage() {
  return (
    <SimpleLayout
      title={'Dan Edwards, pop music producer & songwriter'}
      intro={`All my links in one place. Pre-save my upcoming single Piece of Me (ft. rowan).`}
      articleContent={false}
    >
      <LinksList linkItems={musicLinkItems} />
    </SimpleLayout>
  )
}
