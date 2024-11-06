'use client'
import { Button } from '@/components/Button'
import clsx from 'clsx'
import Image from 'next/image'
import { SpotifyIcon } from './Icons'
import pieceOfMeImage from '../images/pre-save-images/piece-of-me-dan-edwards-ft-rowan-artwork.png'
import { PauseIcon, PlayIcon } from './Icons'
import { EpisodePlayButton } from './EpisodePlayButton'

import { type Episode } from './AudioProvider'

const trackPreview: Episode = {
  title: `Piece of Me - Dan Edwards (ft. rowan) [clip]`,
  slug: 'piece-of-me-clip-mq',
}

export default function PreSaveCard({ classes }: { classes?: string }) {
  const handlePreSave = async () => {
    try {
      const response = await fetch('/api/spotify/authenticate')
      const data = await response.json()
      window.location.href = data.url
    } catch (error) {
      console.error('Error initiating Spotify auth:', error)
    }
  }

  return (
    <div
      className={clsx(
        'group mx-auto max-w-md rounded-xl bg-slate-100 p-4 dark:bg-slate-800',
        classes,
      )}
    >
      <Image
        src={pieceOfMeImage}
        alt={`Piece of Me by Dan Edwards (ft. rowan) cover art`}
        className="rounded-md"
        priority
        placeholder="blur"
      />
      <EpisodePlayButton
        episode={trackPreview}
        className="flex items-center gap-x-3 pt-4 text-sm font-bold leading-6 text-emerald-500 hover:text-emerald-700 active:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-500 dark:active:text-emerald-500"
        playing={
          <>
            <PauseIcon className="h-2.5 w-2.5 fill-current" />
            <span aria-hidden="true">Listen to preview</span>
          </>
        }
        paused={
          <>
            <PlayIcon className="h-2.5 w-2.5 fill-current" />
            <span aria-hidden="true">Listen to preview</span>
          </>
        }
      />
      <div className="flex flex-col space-y-3 pt-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">{`'Pre-saving' a song on Spotify means the track will appear in your  'Liked songs' playlist as soon as it's released. You'll need a Spotify account - free or premium - and you'll need to sign in to Spotify to authorise the pre-save on the next page.`}</p>
        <Button
          onClick={handlePreSave}
          className="flex justify-start text-sm sm:justify-between sm:text-base"
          variant="green"
        >
          <SpotifyIcon className="h-10 w-10" colour="black" />
          <span className="ml-2 text-base font-semibold">
            Pre-Save on Spotify
          </span>
          <div className="hidden h-10 w-10 sm:block" />
        </Button>
        <p className="text-slate-900 dark:text-slate-100">{`Available everywhere Friday 8 November`}</p>
      </div>
    </div>
  )
}
