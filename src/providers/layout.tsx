'use client'

import { createContext, useContext, useState } from 'react'

import { useAudioPlayer } from './audio'

interface LayoutContextType {
  showAudioPlayer: boolean
  setShowAudioPlayer: (show: boolean) => void
  toggleAudioPlayer: () => void

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

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false)
  const [mobilePanelVisible, setMobilePanelVisible] = useState(false)
  const { isPlaying, pause } = useAudioPlayer()

  const toggleAudioPlayer = () => {
    setShowAudioPlayer(prev => !prev)
    if (isPlaying()) {
      pause()
    }
  }

  const toggleMobilePanelVisible = () => {
    setMobilePanelVisible(prev => !prev)
  }

  return (
    <LayoutContext.Provider
      value={{
        showAudioPlayer,
        setShowAudioPlayer,
        toggleAudioPlayer,
        mobilePanelVisible,
        setMobilePanelVisible,
        toggleMobilePanelVisible,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}
