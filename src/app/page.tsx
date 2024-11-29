'use client'

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

function ColumnOne() {
  return (
    <>
      <div className="article-content">
        {[paragraphs, paragraphs].map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        <h2>{`Upcoming release: Chewing Gum (ft. rowan)`}</h2>
        <p>{`Listen to a preview of my upcoming single `}</p>
        <div className="mt-4 flex flex-col gap-4">
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
          <StyledLink
            href={`/songs/${chewingGum.slug}`}
            colour="blue"
            classes="block"
            aria-label={`View details for Chewing Gum (ft. rowan)`}
          >
            More details
          </StyledLink>
        </div>

        <AdditionalImage
          src={chewingGumArtwork}
          alt={`Chewing Gum (ft. rowan) by Dan Edwards - album artwork `}
          classes="max-w-md"
        />

        <h2>{`Piece of Me ft. rowan`}</h2>
        <p>Check out my latest release</p>
        <StreamingProfileLinks />
        <AdditionalImage
          src={pieceOfMeArtwork}
          alt={`Piece of Me (ft. rowan) by Dan Edwards - album artwork `}
          border
          classes="max-w-md"
        />
      </div>
    </>
  )
}

export default function Page() {
  return (
    <TwoColumnLayout
      title={'Dan Edwards creative'}
      intro={'Pop music producer & songwriter in Salisbury, UK'}
      columnOne={<ColumnOne />}
      columnTwo={<NewsletterForm />}
    />
  )
}
