'use client'

import clsx from 'clsx'

import { AudioPlayer } from './AudioPlayer'
import { useLayout } from '@/providers/layout'

export default function AudioPlayerContainer() {
  const { showAudioPlayer } = useLayout()

  return (
    <div
      data-container="AudioPlayerContainer"
      className={clsx(
        'bg-slate-100',
        'transition-all duration-500 overflow-hidden',
        showAudioPlayer ? 'h-[113px]' : 'h-0',
      )}
    >
      <AudioPlayer />
    </div>
  )
}
