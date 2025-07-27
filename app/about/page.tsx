"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <main className="h-full">
      <motion.div 
        className="container flex flex-col items-center justify-center mx-auto max-w-4xl my-20 p-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="w-full space-y-6"
        >
                     <div className="text-center space-y-4">
             <h1 className="text-4xl font-bold tracking-tight">About Project</h1>
             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
               Innovative solution for voice interaction with AI based on OpenAI Realtime API
             </p>
           </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
                         <Card>
               <CardHeader>
                 <CardTitle>Technologies</CardTitle>
                 <CardDescription>Modern development stack</CardDescription>
               </CardHeader>
               <CardContent className="space-y-2">
                 <p>• Next.js 14 with App Router</p>
                 <p>• OpenAI Realtime API (WebRTC)</p>
                 <p>• TypeScript</p>
                 <p>• Tailwind CSS</p>
                 <p>• Framer Motion</p>
                 <p>• shadcn/ui components</p>
               </CardContent>
             </Card>

             <Card>
               <CardHeader>
                 <CardTitle>Capabilities</CardTitle>
                 <CardDescription>What our application can do</CardDescription>
               </CardHeader>
               <CardContent className="space-y-2">
                 <p>• Real-time voice interaction</p>
                 <p>• Support for various voices</p>
                 <p>• Integration with external APIs</p>
                 <p>• Cross-page interface on all pages</p>
                 <p>• Adaptive design</p>
                 <p>• Multilingual support</p>
               </CardContent>
             </Card>

             <Card>
               <CardHeader>
                 <CardTitle>Architecture</CardTitle>
                 <CardDescription>How the application is structured</CardDescription>
               </CardHeader>
               <CardContent className="space-y-2">
                 <p>• Modular component structure</p>
                 <p>• Hooks for state management</p>
                 <p>• Context for translations</p>
                 <p>• Theme providers</p>
                 <p>• TypeScript typing</p>
                 <p>• Performance optimization</p>
               </CardContent>
             </Card>

             <Card>
               <CardHeader>
                 <CardTitle>Development</CardTitle>
                 <CardDescription>Development process</CardDescription>
               </CardHeader>
               <CardContent className="space-y-2">
                 <p>• Modern React practices</p>
                 <p>• Component-based approach</p>
                 <p>• Reusable UI elements</p>
                 <p>• Animations and transitions</p>
                 <p>• Responsiveness</p>
                 <p>• Accessibility (a11y)</p>
               </CardContent>
             </Card>
          </div>
        </motion.div>
      </motion.div>
    </main>
  )
} 