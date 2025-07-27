"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Brain, 
  Mic, 
  Zap, 
  Users, 
  Code, 
  Rocket, 
  Target, 
  Globe, 
  Shield, 
  Lightbulb,
  ArrowRight,
  Play,
  Presentation,
  Cpu,
  Network,
  Database,
  Building
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="h-full">
      <motion.div 
        className="container flex flex-col items-center justify-center mx-auto max-w-6xl my-20 p-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="w-full text-center space-y-6 mb-16"
        >
          <div className="space-y-4">
            <Badge variant="secondary" className="mb-4">
              <Brain className="w-4 h-4 mr-2" />
              AI-Powered Startup Creation
            </Badge>
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Unicorn Startup Creator & Presenter
            </h1>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              The AI Agent That Creates and Pitches the Next Generation of Billion-Dollar Startups
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              An AI-powered agent that autonomously generates, validates, and pitches billion-dollar startup ideas. 
              It compresses months of strategic, design, and storytelling work into a matter of minutes.
             </p>
           </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Link href="/presentations/unicorn-startup-creator">
                <Play className="w-5 h-5 mr-2" />
                View Presentation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/features">
                <Presentation className="w-5 h-5 mr-2" />
                Explore Features
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Problem & Solution Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <Target className="w-5 h-5" />
                  The Problem We Solve
                </CardTitle>
                <CardDescription className="text-red-600 dark:text-red-300">
                  Creating successful startups is hard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-red-700 dark:text-red-300">
                  Founders often face these critical challenges:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Misread timing or market dynamics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Struggle to pitch with clarity or confidence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Lack access to strategic or creative talent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Waste time iterating manually without data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Fail to validate ideas until it's too late</span>
                  </li>
                </ul>
                <p className="text-sm font-medium text-red-700 dark:text-red-400 mt-4">
                  This leads to wasted time, capital, and energy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <Rocket className="w-5 h-5" />
                  Our Revolutionary Solution
                </CardTitle>
                <CardDescription className="text-green-600 dark:text-green-300">
                  Unicorn Startup Creator changes the game
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-green-700 dark:text-green-300">
                  By combining real-time data, autonomous agents, and ChainOpera AI's logic endpoints:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Surfaces valuable startup opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Validates concepts against real market signals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Generates complete, investor-grade pitch materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Delivers the pitch via lifelike avatar presenters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Iterates through investor-style feedback loops</span>
                  </li>
                </ul>
                <p className="text-sm font-medium text-green-700 dark:text-green-400 mt-4">
                  It's your co-founder, strategist, pitch coach, and creative director — all in one.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Developer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-full mb-16"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Code className="w-6 h-6" />
                Meet the Developer
              </CardTitle>
              <CardDescription className="text-lg">
                The mind behind Unicorn Startup Creator
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Ihor Sokolov</h3>
                <p className="text-muted-foreground">Full-stack web developer</p>
                <Badge variant="outline" className="text-sm">
                  <Globe className="w-3 h-3 mr-1" />
                  vibecoder
                </Badge>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Expertise</h4>
                  <div className="space-y-1">
                    <Badge variant="secondary" className="text-xs">AI Integration</Badge>
                    <Badge variant="secondary" className="text-xs">Real-time Systems</Badge>
                    <Badge variant="secondary" className="text-xs">Web3 Development</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Philosophy</h4>
                  <div className="space-y-1">
                    <Badge variant="secondary" className="text-xs">Distributed Orchestration</Badge>
                    <Badge variant="secondary" className="text-xs">API-First Design</Badge>
                    <Badge variant="secondary" className="text-xs">Developer-Focused</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Approach</h4>
                  <div className="space-y-1">
                    <Badge variant="secondary" className="text-xs">Modular Architecture</Badge>
                    <Badge variant="secondary" className="text-xs">Extensible Backends</Badge>
                    <Badge variant="secondary" className="text-xs">Client UIs</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-full mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Technology Stack</h2>
            <p className="text-muted-foreground">Built with cutting-edge technologies for maximum performance</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
                         <Card>
               <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  Core Technologies
                </CardTitle>
                 <CardDescription>Modern development stack</CardDescription>
               </CardHeader>
               <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-sm">Next.js 15 with App Router</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-sm">React 19</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-sm">TypeScript</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-sm">Tailwind CSS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-sm">shadcn/ui components</span>
                </div>
               </CardContent>
             </Card>

             <Card>
               <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI & Voice Technologies
                </CardTitle>
                <CardDescription>Advanced AI integration</CardDescription>
               </CardHeader>
               <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="text-sm">OpenAI Realtime API</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="text-sm">WebRTC for real-time communication</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="text-sm">Whisper-1 for speech recognition</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="text-sm">GPT-4o Realtime for voice interactions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="text-sm">ChainOpera AI integration</span>
                </div>
               </CardContent>
             </Card>

             <Card>
               <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  Architecture & Libraries
                </CardTitle>
                <CardDescription>Scalable and extensible design</CardDescription>
               </CardHeader>
               <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm">Modular micro-service design</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm">Dynamic endpoint registration</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm">Framer Motion animations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm">Firecrawl web scraping</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm">Multi-language support</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="w-full mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Key Features</h2>
            <p className="text-muted-foreground">Comprehensive capabilities for startup creation and presentation</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-2">
                  <Mic className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg">Real-Time Voice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Sub-second response times for voice interactions with natural language processing
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-2">
                  <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-lg">AI Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Autonomous startup idea generation and validation with market signal analysis
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-2">
                  <Presentation className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-lg">Pitch Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Complete pitch deck and presentation creation with investor-grade materials
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-lg">Avatar Presenters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Lifelike avatar presenters for pitch delivery with natural voice synthesis
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Target Audience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="w-full mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Target Audience</h2>
            <p className="text-muted-foreground">Designed for the entire startup ecosystem</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                  <Rocket className="w-5 h-5" />
                  Founders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Looking to validate and pitch startup ideas with professional-grade materials and strategic guidance
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50/50 dark:bg-purple-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
                  <Building className="w-5 h-5" />
                  Incubators & Accelerators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Supporting portfolio companies with AI-powered tools for idea validation and pitch development
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <Target className="w-5 h-5" />
                  VC Analysts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Analyzing deal flow with comprehensive startup data and market validation insights
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                  <Lightbulb className="w-5 h-5" />
                  Entrepreneurs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Seeking strategic guidance and AI-powered tools for business model development
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <Shield className="w-5 h-5" />
                  Investors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Evaluating startup opportunities with comprehensive market analysis and validation data
                </p>
               </CardContent>
             </Card>

            <Card className="border-indigo-200 bg-indigo-50/50 dark:bg-indigo-950/20">
               <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
                  <Globe className="w-5 h-5" />
                  Developers
                </CardTitle>
               </CardHeader>
              <CardContent>
                <p className="text-sm text-indigo-700 dark:text-indigo-300">
                  Extending and customizing the platform with API-first architecture and modular design
                </p>
               </CardContent>
             </Card>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="w-full text-center"
        >
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Create Your Unicorn?</h2>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Experience the future of startup creation with AI-powered tools that transform ideas into investor-ready presentations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                  <Link href="/presentations/unicorn-startup-creator">
                    <Play className="w-5 h-5 mr-2" />
                    Start Presentation
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  <Link href="/features">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Explore Features
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </main>
  )
} 