'use client'

import clsx from 'clsx'

import { useLayout } from '@/providers/layout'

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
      onClick={handleClick}
      className={clsx(
        'bg-slate-50 hover:bg-slate-100 active:border-slate-500 border border-slate-200 rounded py-0.5 px-2 transition-colors duration-300',
        classes,
      )}
    >
      {onClick === 'toggle' ? 'Toggle' : 'Dismiss'}
    </button>
  )
}
