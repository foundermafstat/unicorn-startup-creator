"use client"

import React from "react"
import { Welcome } from "@/components/welcome"
import { ToolsEducation } from "@/components/tools-education"
import { VoiceNavigationDemo } from "@/components/voice-navigation-demo"
import { motion } from "framer-motion"

const App: React.FC = () => {

  return (
    <main className="h-full">
      <motion.div 
        className="container flex flex-col items-center justify-center mx-auto max-w-3xl my-20 p-12 border rounded-lg shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Welcome />
        <div className="w-full flex flex-col items-center gap-6 mt-8">
          <VoiceNavigationDemo />
          <ToolsEducation />
        </div>
      </motion.div>
    </main>
  )
}

export default App;