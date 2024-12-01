'use client'

import clsx from 'clsx'
import { ReactNode } from 'react'

import { Header } from '@/components/Header'
import { PauseIcon, PlayIcon } from '@/components/Icons'
import { AdditionalImage } from '@/components/Images'
import { NewsletterForm } from '@/components/newsletterForm'
import { SongPlayButton } from '@/components/SongPlayButton'
import StyledLink from '@/components/StyledLink'
import TwoColumnLayout from '@/components/TwoColumnLayout'

import { streamingProfileItems } from './links/data'
import { chewingGum } from './songs/data'

import chewingGumArtwork from '@/images/album-artwork/chewing-gum-dan-edwards-ft-rowan-artwork.jpg'
import pieceOfMeArtwork from '@/images/album-artwork/piece-of-me-dan-edwards-ft-rowan-artwork.png'

function StreamingProfileLinks() {
  return (
    <>
      {streamingProfileItems.map(item => (
        <StyledLink
          href={item.href}
          key={item.href}
          text={item.shortDescription}
          colour="blue"
          classes="me-4"
        />
      ))}
    </>
  )
}

/* cspell:disable */
const paragraphs = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
]
/* cspell:enable */

interface CardProps {
  children: ReactNode
  image: ReactNode
  title: string
  intro: string
}

function Card({ children, image, title, intro }: CardProps) {
  return (
    <div
      className={clsx(
        'max-w-md',
        'flex flex-col space-y-4',
        'my-12 md:my-8 items-start  rounded-xl md:p-4',
        'md:border border-zinc-200 dark:border-zinc-700',
      )}
    >
      {image}
      <div>
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">{title}</h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-balance mb-6">{intro}</p>
        {children}
      </div>
    </div>
  )
}

function ColumnOne() {
  return (
    <>
      <div className="article-content">
        {[paragraphs, paragraphs].map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <Card
        title="Upcoming release"
        intro={`Listen to a preview of my upcoming single, 'Chewing Gum' (ft. rowan). Subscribe to my newsletter, and I'll tell you when it's released.`}
        image={
          <AdditionalImage
            src={chewingGumArtwork}
            alt={`Chewing Gum (ft. rowan) by Dan Edwards - album artwork `}
            classes="max-w-md"
            margin={false}
          />
        }
      >
        <div className="flex flex-col gap-4">
          <SongPlayButton
            song={chewingGum}
            className="flex items-center gap-x-3 text-sm font-bold leading-6 text-blue-500 hover:text-blue-700 active:text-blue-900"
            playing={
              <>
                <PauseIcon className="h-2.5 w-2.5 fill-current" />
                <span aria-hidden="true">Listen</span>
              </>
            }
            paused={
              <>
                <PlayIcon className="h-2.5 w-2.5 fill-current" />
                <span aria-hidden="true">Listen</span>
              </>
            }
          />
        </div>
      </Card>

      <Card
        title="Latest release"
        intro={`Check out my latest single, 'Piece of Me' (ft. rowan).`}
        image={
          <AdditionalImage
            src={pieceOfMeArtwork}
            alt={`Piece of Me (ft. rowan) by Dan Edwards - album artwork `}
            border
            margin={false}
          />
        }
      >
        <StreamingProfileLinks />
      </Card>
    </>
  )
}

export default function Page() {
  return (
    <>
      <Header title={'Dan Edwards creative'} intro={'Pop music producer & songwriter in Salisbury, UK'} />
      <TwoColumnLayout columnOne={<ColumnOne />} columnTwo={<NewsletterForm />} />
    </>
  )
}
