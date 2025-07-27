"use client"

import React from "react"
import { VoiceSelector } from "@/components/voice-select"
import { BroadcastButton } from "@/components/broadcast-button"
import { StatusDisplay } from "@/components/status"
import { TokenUsageDisplay } from "@/components/token-usage"
import { MessageControls } from "@/components/message-controls"
import { TextInput } from "@/components/text-input"
import { motion } from "framer-motion"
import { useBroadcastContext } from "@/hooks/use-broadcast-context"
import { usePresentation } from "@/contexts/presentation-context"
import { useState } from "react"
import { ChevronUp, ChevronDown, RefreshCw } from "lucide-react"

export const BroadcastInterface: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const {
    voice,
    setVoice,
    status,
    isSessionActive,
    handleStartStopClick,
    msgs,
    conversation,
    sendTextMessage
  } = useBroadcastContext()

  const { showBroadcast } = usePresentation()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Always render the same structure, but with different content based on mounted state
  // Don't return null to prevent hydration mismatch
  
  return (
    <motion.div 
      data-broadcast-interface="true"
      className={`fixed bottom-4 right-4 z-50 bg-card text-card-foreground rounded-xl border shadow-lg p-4 transition-all duration-300 ${
        mounted && showBroadcast ? (isCollapsed ? 'w-64' : 'w-80') : 'w-80'
      }`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: mounted && showBroadcast ? 1 : 0, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      suppressHydrationWarning
      style={{ 
        visibility: mounted && !showBroadcast ? 'hidden' : 'visible',
        opacity: mounted && !showBroadcast ? 0 : 1
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">
          {mounted && showBroadcast ? 'Voice Interface' : 'Loading...'}
        </h3>
                  <div className="flex items-center gap-2">
            {mounted && showBroadcast ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {isSessionActive && (
                  <button
                    onClick={() => {
                      // Restart audio session
                      handleStartStopClick();
                      setTimeout(() => handleStartStopClick(), 1000);
                    }}
                    className="h-6 w-6 p-0 hover:bg-muted rounded"
                    title="Restart audio session"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="h-6 w-6 p-0"
                >
                  {isCollapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </>
            )}
          </div>
      </div>
      
      {!isCollapsed && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {mounted && showBroadcast ? (
            <>
              <VoiceSelector value={voice} onValueChange={setVoice} />
              
              <div className="flex flex-col items-center gap-4">
                <BroadcastButton 
                  isSessionActive={isSessionActive} 
                  onClick={handleStartStopClick}
                />
              </div>
              
              {msgs.length > 4 && <TokenUsageDisplay messages={msgs} />}
              
              {status && (
                <motion.div 
                  className="w-full flex flex-col gap-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MessageControls conversation={conversation} msgs={msgs} />
                  <TextInput 
                    onSubmit={sendTextMessage}
                    disabled={!isSessionActive}
                  />
                </motion.div>
              )}
              
              {status && <StatusDisplay status={status} />}
              
              {/* Audio status indicator */}
              {isSessionActive && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Voice active</span>
                </div>
              )}
            </>
          ) : mounted ? (
            <>
              <div className="w-full h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </div>
              <div className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="w-full h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </>
          ) : null}
        </motion.div>
      )}
    </motion.div>
  )
} 