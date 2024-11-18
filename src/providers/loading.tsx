'use client'

import { createContext, useEffect, useState } from 'react'

export const LoadingContext = createContext({
  isLoading: true,
  setIsLoading: (loading: boolean) => {},
})

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 800)),
    ]).then(() => setIsLoading(false))
  }, [])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}
