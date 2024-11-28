'use client'

import { createContext, useCallback, useContext, useState } from 'react'

interface LayoutContextType {
  showAudioPlayer: boolean
  setShowAudioPlayer: (show: boolean) => void
  toggleAudioPlayer: () => void

  menusVisible: boolean
  setMenusVisible: (show: boolean) => void

  mobilePanelVisible: boolean
  setMobilePanelVisible: (open: boolean) => void
  toggleMobilePanelVisible: () => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function useLayout() {
  const context = useContext(LayoutContext)
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [showAudioPlayer, setShowAudioPlayer] = useState(true)
  const [menusVisible, setMenusVisible] = useState(true)
  const [mobilePanelVisible, setMobilePanelVisible] = useState(false)

  const toggleAudioPlayer = useCallback(() => {
    setShowAudioPlayer(prev => !prev)
  }, [])

  const toggleMobilePanelVisible = useCallback(() => {
    setMobilePanelVisible(prev => !prev)
  }, [])

  return (
    <LayoutContext.Provider
      value={{
        showAudioPlayer,
        setShowAudioPlayer,
        toggleAudioPlayer,
        menusVisible,
        setMenusVisible,
        mobilePanelVisible,
        setMobilePanelVisible,
        toggleMobilePanelVisible,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}
