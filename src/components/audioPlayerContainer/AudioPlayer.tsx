'use client'

import clsx from 'clsx'
// import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { ForwardButton } from '@/components/audioPlayerContainer/ForwardButton'
import { PlayButton } from '@/components/audioPlayerContainer/PlayButton'
import { RewindButton } from '@/components/audioPlayerContainer/RewindButton'
import { Slider } from '@/components/audioPlayerContainer/Slider'

import DismissButton from './DismissButton'
import { useAudioPlayer } from '@/providers/audio'

function parseTime(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds - hours * 3600) / 60)
  seconds = seconds - hours * 3600 - minutes * 60
  return [hours, minutes, seconds]
}

function formatHumanTime(seconds: number) {
  const [h, m, s] = parseTime(seconds)
  return `${h} hour${h === 1 ? '' : 's'}, ${m} minute${m === 1 ? '' : 's'}, ${s} second${s === 1 ? '' : 's'}`
}

export default function AudioPlayer() {
  const player = useAudioPlayer()

  const wasPlayingRef = useRef(false)

  const [currentTime, setCurrentTime] = useState<number | null>(player.currentTime)

  useEffect(() => {
    setCurrentTime(null)
  }, [player.currentTime])

  return (
    <div
      data-container="AudioPlayer"
      className={clsx(
        'bg-blue-50/90 p-4 pb-safe z-40',
        'shadow shadow-slate-200/80 dark:shadow-slate-600/80',
        'backdrop-blur-sm md:px-6 dark:bg-slate-900/90',
        'md:border-t md:border-x border-slate-900/5',
      )}
    >
      <div className="max-w-xl flex items-center gap-6 mx-auto">
        <div className="hidden md:block ">
          <PlayButton />
        </div>
        <div
          className={clsx(
            'mb-[env(safe-area-inset-bottom)] flex flex-1 flex-col gap-3 p-2',
            'overflow-hidden',
          )}
        >
          {/* <Link
          href={`songs/${player.song.slug}`}
          className="truncate text-center text-sm font-bold leading-6 md:text-left dark:text-slate-200"
          title={player.song.title}
        >
          {player.song.title}
        </Link> */}
          <span className="truncate text-center text-sm font-bold leading-6 md:text-left dark:text-slate-200">
            {player.song?.title}
          </span>
          <div className="flex justify-between gap-6">
            <div className="flex items-center md:hidden">
              <DismissButton />
            </div>
            <div className="flex flex-none items-center gap-4">
              <RewindButton player={player} />
              <div className="md:hidden">
                <PlayButton />
              </div>
              <ForwardButton player={player} />
            </div>
            <Slider
              label="Current time"
              maxValue={player.duration}
              step={1}
              value={[currentTime ?? player.currentTime]}
              onChange={([value]: number[]) => setCurrentTime(value)}
              onChangeEnd={([value]: number[]) => {
                player.seek(value)
                if (wasPlayingRef.current) {
                  player.play()
                }
              }}
              numberFormatter={{ format: formatHumanTime } as Intl.NumberFormat}
              onChangeStart={() => {
                wasPlayingRef.current = player.playing
                player.pause()
              }}
            />
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <DismissButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
