"use client"

import React from "react"
import { Welcome } from "@/components/welcome"
import { ToolsEducation } from "@/components/tools-education"
import { VoiceNavigationDemo } from "@/components/voice-navigation-demo"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GithubIcon, Sparkles, Mic, Zap, Globe, Target, Users, Code, Rocket } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "@/components/translations-context"
import { HeroParticles } from "@/components/hero-particles"
import { projectInfo } from "@/lib/project-info"

const App: React.FC = () => {
  const { t } = useTranslations()

  return (
    <main className="h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 dark:bg-pink-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Particles effect */}
      <HeroParticles />

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div 
          className="container mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >


          {/* Main title */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 bg-gradient-to-r from-gray-900 via-purple-800 to-blue-600 dark:from-white dark:via-purple-200 dark:to-blue-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {projectInfo.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-6 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {projectInfo.tagline}
          </motion.p>

          {/* Project description */}
          <motion.div 
            className="max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light">
              {projectInfo.description.full}
            </p>
          </motion.div>

          {/* Key features grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex flex-col items-center gap-2 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-light text-center">Voice Control</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-light text-center">Startup Creation</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-purple-500 rounded-full flex items-center justify-center">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-light text-center">Presentations</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-light text-center">AI Agents</span>
            </div>
          </motion.div>

          {/* Technology stack */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Technology Stack</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {projectInfo.technology.core.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-xs font-light">
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </main>
  )
}

export default App;