'use client'
import HoveringBackButton from '@/components/HoveringBackButton'
import { Header } from '@/components/Header'
import { useContext } from 'react'
import { AppContext } from '../providers'
import { musicLinkItems } from './data'
import { Container } from '@/components/Container'
import LinksList from './components/LinksList'

export default function LinksPage() {
  const { previousPathname } = useContext(AppContext)

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <article>
            <HoveringBackButton previousPathname={previousPathname} />
            <Header
              title="Dan Edwards, pop music producer & songwriter"
              subtitle="All my links in one place. Pre-save my upcoming single Piece of Me (ft. rowan)."
            />
            <div className="mx-auto mt-16 max-w-md">
              <LinksList linkItems={musicLinkItems} />
            </div>
          </article>
        </div>
      </div>
    </Container>
  )
}
