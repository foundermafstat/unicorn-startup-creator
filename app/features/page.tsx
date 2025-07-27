"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, Globe, Settings, Zap, Shield, Palette } from "lucide-react"

export default function FeaturesPage() {
     const features = [
     {
       icon: Mic,
       title: "Voice Interaction",
       description: "Communicate with AI by voice in real-time with minimal latency",
       badge: "Core Feature"
     },
     {
       icon: Globe,
       title: "Multilingual",
       description: "Support for various languages and voices for global audience",
       badge: "Internationalization"
     },
     {
       icon: Settings,
       title: "Voice Settings",
       description: "Choose from multiple available voices and customize parameters",
       badge: "Customization"
     },
     {
       icon: Zap,
       title: "API Integration",
       description: "Connect to external services and perform actions through voice",
       badge: "Extensibility"
     },
     {
       icon: Shield,
       title: "Security",
       description: "Secure connections and data processing according to standards",
       badge: "Security"
     },
     {
       icon: Palette,
       title: "Adaptive Design",
       description: "Modern interface that works on all devices",
       badge: "UX/UI"
     }
   ]

  return (
    <main className="h-full">
      <motion.div 
        className="container flex flex-col items-center justify-center mx-auto max-w-6xl my-20 p-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="w-full space-y-8"
        >
                     <div className="text-center space-y-4">
             <h1 className="text-4xl font-bold tracking-tight">Features</h1>
             <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
               Explore all capabilities of our voice AI interface
             </p>
           </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <feature.icon className="h-8 w-8 text-primary" />
                      <Badge variant="secondary" className="text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                 <span className="text-sm text-muted-foreground">Available</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

                     <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6, duration: 0.4 }}
             className="mt-16 space-y-6"
           >
                            <Card className="max-w-2xl mx-auto">
                 <CardHeader>
                   <CardTitle>Cross-page Interface</CardTitle>
                   <CardDescription>
                     Voice interface is available on all pages of the application
                   </CardDescription>
                 </CardHeader>
                 <CardContent>
                   <p className="text-muted-foreground">
                     Try navigating to any page - the broadcast interface will remain active 
                     and the session won't be interrupted. This allows you to use voice control 
                     in any part of the application.
                   </p>
                 </CardContent>
               </Card>

                            <Card className="max-w-2xl mx-auto">
                 <CardHeader>
                   <CardTitle>Voice Navigation</CardTitle>
                   <CardDescription>
                     Navigate between pages using voice commands
                   </CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   <p className="text-muted-foreground">
                     Simply say "go to home" or "open settings" - AI will automatically 
                     navigate you to the desired page.
                   </p>
                   <div className="grid grid-cols-2 gap-4 text-sm">
                     <div className="space-y-2">
                       <h4 className="font-medium">Main commands:</h4>
                       <ul className="space-y-1 text-muted-foreground">
                         <li>• "go to home"</li>
                         <li>• "open about"</li>
                         <li>• "show features"</li>
                         <li>• "open settings"</li>
                       </ul>
                     </div>
                     <div className="space-y-2">
                       <h4 className="font-medium">Alternative phrases:</h4>
                       <ul className="space-y-1 text-muted-foreground">
                         <li>• "home", "main", "start"</li>
                         <li>• "project", "info", "about"</li>
                         <li>• "capabilities", "functions", "features"</li>
                         <li>• "configuration", "options", "settings"</li>
                       </ul>
                     </div>
                   </div>
                 </CardContent>
               </Card>
           </motion.div>
        </motion.div>
      </motion.div>
    </main>
  )
} 