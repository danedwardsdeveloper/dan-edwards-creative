'use client'

import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { MoonIcon, SunIcon } from '../Icons'

export function ThemeToggleIcons() {
  const { resolvedTheme, setTheme } = useTheme()
  const otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
      className={clsx(
        // 'bg-white/90 backdrop-blur dark:bg-zinc-800/90',
        'group rounded-full px-3 py-2',
        'transition  dark:ring-white/10 dark:hover:ring-white/20',
      )}
      onClick={() => setTheme(otherTheme)}
    >
      <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-blue-50 [@media(prefers-color-scheme:dark)]:stroke-blue-400 [@media(prefers-color-scheme:dark)]:group-hover:fill-blue-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-blue-600" />
      <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-blue-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-blue-500" />
    </button>
  )
}
