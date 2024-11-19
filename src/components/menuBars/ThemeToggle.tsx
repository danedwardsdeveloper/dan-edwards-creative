import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { MoonIcon, SunIcon } from '../Icons'
import { baseStyles, colourStyles, sizeStyles } from './styles'

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
        'group rounded-full bg-white/90 px-3 py-2',
        'backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20',
      )}
      onClick={() => setTheme(otherTheme)}
    >
      <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-blue-50 [@media(prefers-color-scheme:dark)]:stroke-blue-400 [@media(prefers-color-scheme:dark)]:group-hover:fill-blue-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-blue-600" />
      <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-blue-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-blue-500" />
    </button>
  )
}

export function ThemeToggleButtons() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex gap-2">
      <button
        type="button"
        aria-label="Switch to light theme"
        className={clsx(
          baseStyles,
          sizeStyles.base,
          resolvedTheme === 'light' ? colourStyles.active : colourStyles.inactive,
          'flex items-center gap-2 w-1/2',
        )}
        onClick={() => setTheme('light')}
      >
        <SunIcon className="h-5 w-5 stroke-blue-500" />
        Light mode
      </button>

      <button
        type="button"
        aria-label="Switch to dark theme"
        className={clsx(
          baseStyles,
          sizeStyles.base,
          resolvedTheme === 'dark' ? colourStyles.active : colourStyles.inactive,
          'flex items-center gap-2 w-1/2',
        )}
        onClick={() => setTheme('dark')}
      >
        <MoonIcon className="h-5 w-5 stroke-blue-500" />
        Dark mode
      </button>
    </div>
  )
}
