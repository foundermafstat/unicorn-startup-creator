"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import useWebRTCAudioSession from "@/hooks/use-webrtc"
import { tools } from "@/lib/tools"
import { useToolsFunctions, setGlobalRouter } from "@/hooks/use-tools"
import { useRouter } from "next/navigation"

interface BroadcastContextType {
  voice: string
  setVoice: (voice: string) => void
  status: any
  isSessionActive: boolean
  handleStartStopClick: () => void
  msgs: any[]
  conversation: any
  sendTextMessage: (message: string) => void
}

const BroadcastContext = createContext<BroadcastContextType | undefined>(undefined)

export const BroadcastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [voice, setVoice] = useState("ash")
  const router = useRouter();

  // Set global router for navigation functions
  useEffect(() => {
    setGlobalRouter(router);
    console.log('Global router set in BroadcastProvider');
  }, [router]);

  // WebRTC Audio Session Hook
  const {
    status,
    isSessionActive,
    registerFunction,
    handleStartStopClick,
    msgs,
    conversation,
    sendTextMessage
  } = useWebRTCAudioSession(voice, tools)

  // Get all tools functions
  const toolsFunctions = useToolsFunctions();

  useEffect(() => {
    // Register all functions by iterating over the object
    console.log('Registering functions, toolsFunctions keys:', Object.keys(toolsFunctions));
    
    Object.entries(toolsFunctions).forEach(([name, func]) => {
      const functionNames: Record<string, string> = {
        timeFunction: 'getCurrentTime',
        backgroundFunction: 'changeBackgroundColor',
        partyFunction: 'partyMode',
        launchWebsite: 'launchWebsite', 
        copyToClipboard: 'copyToClipboard',
        scrapeWebsite: 'scrapeWebsite',
        navigateToPage: 'navigateToPage',
        nextSlide: 'nextSlide',
        previousSlide: 'previousSlide',
        goToSlideNumber: 'goToSlideNumber',
        firstSlide: 'firstSlide',
        lastSlide: 'lastSlide',
        togglePause: 'togglePause',
        toggleFullscreen: 'toggleFullscreen',
        exitPresentation: 'exitPresentation'
      };
      
      console.log('Registering function:', name, 'as', functionNames[name], 'function type:', typeof func);
      registerFunction(functionNames[name], func);
    });
  }, [registerFunction, toolsFunctions])

  const value = {
    voice,
    setVoice,
    status,
    isSessionActive,
    handleStartStopClick,
    msgs,
    conversation,
    sendTextMessage
  }

  return (
    <BroadcastContext.Provider value={value}>
      {children}
    </BroadcastContext.Provider>
  )
}

export const useBroadcastContext = () => {
  const context = useContext(BroadcastContext)
  if (context === undefined) {
    throw new Error('useBroadcastContext must be used within a BroadcastProvider')
  }
  return context
} 