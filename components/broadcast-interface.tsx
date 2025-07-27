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
import { ChevronUp, ChevronDown } from "lucide-react"

export const BroadcastInterface: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  
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

  if (!showBroadcast) {
    return null
  }
  
  return (
    <motion.div 
      className={`fixed bottom-4 right-4 z-50 bg-card text-card-foreground rounded-xl border shadow-lg p-4 transition-all duration-300 ${
        isCollapsed ? 'w-64' : 'w-80'
      }`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Voice Interface</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-6 w-6 p-0"
          >
            {isCollapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
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
        </motion.div>
      )}
    </motion.div>
  )
} 