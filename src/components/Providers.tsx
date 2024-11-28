'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import { useEffect } from 'react'

import AudioProvider from '@/providers/audio'
import LayoutProvider from '@/providers/layout'
import LoadingProvider from '@/providers/loading'
import PreviousPathnameProvider from '@/providers/previousPathname'

function ThemeWatcher() {
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    function onMediaChange() {
      const systemTheme = media.matches ? 'dark' : 'light'
      if (resolvedTheme === systemTheme) {
        setTheme('system')
      }
    }

    onMediaChange()
    media.addEventListener('change', onMediaChange)

    return () => {
      media.removeEventListener('change', onMediaChange)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <LayoutProvider>
        <PreviousPathnameProvider>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <ThemeWatcher />
            <AudioProvider>{children}</AudioProvider>
          </ThemeProvider>
        </PreviousPathnameProvider>
      </LayoutProvider>
    </LoadingProvider>
  )
}
