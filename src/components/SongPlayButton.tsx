'use client'

import { ReactNode } from 'react'

import { chewingGum, useAudioPlayer } from '@/providers/audio'
import { useLayout } from '@/providers/layout'

export function SongPlayButton({
  playing,
  paused,
  ...props
}: React.ComponentPropsWithoutRef<'button'> & {
  playing: ReactNode
  paused: ReactNode
}) {
  const player = useAudioPlayer()
  const { setShowAudioPlayer } = useLayout()

  function handleClick() {
    player.togglePlaying()
    setShowAudioPlayer(true)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`${player.playing ? 'Pause' : 'Play'} song ${chewingGum.title}`}
      {...props}
    >
      {player.playing ? playing : paused}
    </button>
  )
}
