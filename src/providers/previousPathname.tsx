'use client'

import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useRef } from 'react'

function usePrevious<T>(value: T) {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export const PreviousPathnameContext = createContext<{ previousPathname?: string }>({})

export function usePreviousPathname() {
  const context = useContext(PreviousPathnameContext)
  if (context === undefined) {
    throw new Error('usePreviousPathname must be used within a PreviousPathnameProvider')
  }
  return context.previousPathname
}

export function PreviousPathnameProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const previousPathname = usePrevious(pathname)

  return (
    <PreviousPathnameContext.Provider value={{ previousPathname }}>
      {children}
    </PreviousPathnameContext.Provider>
  )
}
