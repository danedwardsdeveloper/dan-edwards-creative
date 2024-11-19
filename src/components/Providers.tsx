'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { createContext, useEffect, useRef } from 'react'

import { AudioProvider } from '@/providers/audio'
import { LayoutProvider } from '@/providers/layout'
import { LoadingProvider } from '@/providers/loading'

function usePrevious<T>(value: T) {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

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

export const AppContext = createContext<{ previousPathname?: string }>({})

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const previousPathname = usePrevious(pathname)

  return (
    <LoadingProvider>
      <LayoutProvider>
        <AppContext.Provider value={{ previousPathname }}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <ThemeWatcher />
            <AudioProvider>{children}</AudioProvider>
          </ThemeProvider>
        </AppContext.Provider>
      </LayoutProvider>
    </LoadingProvider>
  )
}
