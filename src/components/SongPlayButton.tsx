'use client'

import { ReactNode } from 'react'

import { type Song, useAudioPlayer } from '@/providers/audio'

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

  return (
    <button
      type="button"
      onClick={() => player.toggle()}
      aria-label={`${player.playing ? 'Pause' : 'Play'} song ${song.title}`}
      {...props}
    >
      {player.playing ? playing : paused}
    </button>
  )
}
