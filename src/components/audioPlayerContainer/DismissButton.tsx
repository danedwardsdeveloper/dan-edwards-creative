'use client'

import clsx from 'clsx'

import { useLayout } from '@/providers/layout'

function DismissIcon({}: React.ComponentPropsWithoutRef<'svg'> & {}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  )
}

export default function DismissButton({
  onClick = 'toggle',
  classes,
}: {
  onClick?: 'toggle' | 'close'
  classes?: string
}) {
  const { toggleAudioPlayer, setShowAudioPlayer } = useLayout()

  const handleClick = () => {
    if (onClick === 'toggle') {
      toggleAudioPlayer()
    } else {
      setShowAudioPlayer(false)
    }
  }

  return (
    <button
      type="button"
      className={clsx(
        'group relative rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 md:order-none',
        classes,
      )}
      aria-label="Close audio player"
      onClick={handleClick}
    >
      <div className="absolute -inset-4 md:hidden" />
      <DismissIcon className="h-6 w-6 fill-slate-500 stroke-slate-500 group-hover:fill-slate-700 group-hover:stroke-slate-700" />
    </button>
  )
}
