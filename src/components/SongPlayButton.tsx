'use client'

import { ReactNode } from 'react'

import { type Song, useAudioPlayer } from '@/providers/audio'
import { useLayout } from '@/providers/layout'

export function SongPlayButton({
  song,
  playing,
  paused,
  ...props
}: React.ComponentPropsWithoutRef<'button'> & {
  song: Song
  playing: ReactNode
  paused: ReactNode
}) {
  const player = useAudioPlayer(song)
  const { setShowAudioPlayer } = useLayout()

  function handleClick() {
    player.togglePlaying()
    setShowAudioPlayer(true)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`${player.playing ? 'Pause' : 'Play'} song ${song.title}`}
      {...props}
    >
      {player.playing ? playing : paused}
    </button>
  )
}
