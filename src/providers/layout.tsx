'use client'

import { createContext, useContext, useState } from 'react'

interface LayoutContextType {
  showAudioPlayer: boolean
  setShowAudioPlayer: (show: boolean) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function useLayout() {
  const context = useContext(LayoutContext)
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [showAudioPlayer, setShowAudioPlayer] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <LayoutContext.Provider
      value={{
        showAudioPlayer,
        setShowAudioPlayer,
        mobileMenuOpen,
        setMobileMenuOpen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}
