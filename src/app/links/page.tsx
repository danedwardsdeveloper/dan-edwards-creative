'use client'
import { musicLinkItems } from './data'
import LinksList from './components/LinksList'
import TwoColumnLayout from '@/components/TwoColumnLayout'
import PreSaveCard from '@/components/PreSaveCard'

export default function LinksPage() {
  return (
    <TwoColumnLayout 
      title={'Dan Edwards, pop music producer & songwriter'} 
      intro={`All my links in one place. Pre-save my upcoming single Piece of Me (ft. rowan).`} 
      columnOne={<LinksList linkItems={musicLinkItems} />} 
      columnTwo={<PreSaveCard />} 
       />
  )
}
