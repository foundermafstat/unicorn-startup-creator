"use client"

import React, { createContext, useContext, useRef } from 'react'
import { toast } from 'sonner'
import { setGlobalPresentationControl } from '@/hooks/use-tools'

interface PresentationControlContextType {
  nextSlide: () => void
  previousSlide: () => void
  goToSlide: (slideNumber: number) => void
  goToFirst: () => void
  goToLast: () => void
  togglePause: () => void
  toggleFullscreen: () => void
  exitPresentation: () => void
  resetPresentation: () => void
  narrateSlide: (slideNumber: number) => void
  currentSlide: number // Добавляем текущий индекс слайда
  setControlFunctions: (functions: any) => void
}

const PresentationControlContext = createContext<PresentationControlContextType | undefined>(undefined)

export function PresentationControlProvider({ children }: { children: React.ReactNode }) {
  const controlFunctionsRef = useRef<any>(null)

  const setControlFunctions = (functions: any) => {
    controlFunctionsRef.current = functions
    // Also register with global for useToolsFunctions access
    setGlobalPresentationControl(functions)
  }

  const nextSlide = () => {
    if (controlFunctionsRef.current?.nextSlide) {
      controlFunctionsRef.current.nextSlide()
    } else {
      toast.error("Presentation not available")
    }
  }

  const previousSlide = () => {
    if (controlFunctionsRef.current?.previousSlide) {
      controlFunctionsRef.current.previousSlide()
    } else {
      toast.error("Presentation not available")
    }
  }

  const goToSlide = (slideNumber: number) => {
    if (controlFunctionsRef.current?.goToSlide) {
      controlFunctionsRef.current.goToSlide(slideNumber - 1) // Convert to 0-based index
    } else {
      toast.error("Presentation not available")
    }
  }

  const goToFirst = () => {
    if (controlFunctionsRef.current?.goToFirst) {
      controlFunctionsRef.current.goToFirst()
    } else {
      toast.error("Presentation not available")
    }
  }

  const goToLast = () => {
    if (controlFunctionsRef.current?.goToLast) {
      controlFunctionsRef.current.goToLast()
    } else {
      toast.error("Presentation not available")
    }
  }

  const togglePause = () => {
    if (controlFunctionsRef.current?.togglePause) {
      controlFunctionsRef.current.togglePause()
    } else {
      toast.error("Presentation not available")
    }
  }

  const toggleFullscreen = () => {
    if (controlFunctionsRef.current?.toggleFullscreen) {
      controlFunctionsRef.current.toggleFullscreen()
    } else {
      toast.error("Presentation not available")
    }
  }

  const exitPresentation = () => {
    if (controlFunctionsRef.current?.exitPresentation) {
      controlFunctionsRef.current.exitPresentation()
    } else {
      toast.error("Presentation not available")
    }
  }

  const resetPresentation = () => {
    if (controlFunctionsRef.current?.handleReset) {
      controlFunctionsRef.current.handleReset()
      toast.success("Presentation reset", {
        description: "Reset to beginning",
        duration: 2000,
      })
    } else {
      toast.error("Presentation not available", {
        description: "No active presentation found",
        duration: 3000,
      })
    }
  }

  const narrateSlide = (slideNumber: number) => {
    if (controlFunctionsRef.current?.narrateSlide) {
      controlFunctionsRef.current.narrateSlide(slideNumber)
      toast.success("Narrating slide", {
        description: `Narrating slide ${slideNumber + 1}`,
        duration: 2000,
      })
    } else {
      toast.error("Presentation not available", {
        description: "No active presentation found",
        duration: 3000,
      })
    }
  }

  return (
    <PresentationControlContext.Provider value={{
      nextSlide,
      previousSlide,
      goToSlide,
      goToFirst,
      goToLast,
      togglePause,
      toggleFullscreen,
      exitPresentation,
      resetPresentation,
      narrateSlide,
      currentSlide: controlFunctionsRef.current?.currentSlide || 0, // Добавляем текущий индекс слайда
      setControlFunctions
    }}>
      {children}
    </PresentationControlContext.Provider>
  )
}

export function usePresentationControl() {
  const context = useContext(PresentationControlContext)
  if (context === undefined) {
    throw new Error('usePresentationControl must be used within a PresentationControlProvider')
  }
  return context
} 