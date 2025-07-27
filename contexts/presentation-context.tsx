"use client"

import React, { createContext, useContext, useState } from 'react'

interface PresentationContextType {
  showBroadcast: boolean
  showNavigation: boolean
  toggleBroadcast: () => void
  toggleNavigation: () => void
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined)

export function PresentationProvider({ children }: { children: React.ReactNode }) {
  const [showBroadcast, setShowBroadcast] = useState(true)
  const [showNavigation, setShowNavigation] = useState(true)

  const toggleBroadcast = () => setShowBroadcast(!showBroadcast)
  const toggleNavigation = () => setShowNavigation(!showNavigation)

  return (
    <PresentationContext.Provider value={{
      showBroadcast,
      showNavigation,
      toggleBroadcast,
      toggleNavigation
    }}>
      {children}
    </PresentationContext.Provider>
  )
}

export function usePresentation() {
  const context = useContext(PresentationContext)
  if (context === undefined) {
    throw new Error('usePresentation must be used within a PresentationProvider')
  }
  return context
} 