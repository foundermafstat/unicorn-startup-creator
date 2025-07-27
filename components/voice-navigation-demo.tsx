"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation, Mic, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export const VoiceNavigationDemo: React.FC = () => {
  const commands = [
    { command: "go to home", path: "/", icon: "🏠", alternatives: ["home", "main", "start"] },
    { command: "open about", path: "/about", icon: "ℹ️", alternatives: ["about", "project", "info"] },
    { command: "show features", path: "/features", icon: "✨", alternatives: ["features", "capabilities", "functions"] },
    { command: "open settings", path: "/settings", icon: "⚙️", alternatives: ["settings", "configuration", "options"] },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="w-full max-w-2xl"
    >
      <Card>
        <CardHeader>
                     <CardTitle className="flex items-center gap-2">
             <Navigation className="h-5 w-5" />
             Voice Navigation
             <Badge variant="secondary" className="ml-auto">New</Badge>
           </CardTitle>
           <CardDescription>
             Try these voice commands to navigate the site
           </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {commands.map((cmd, index) => (
              <motion.div
                key={cmd.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
                className="flex items-center justify-between p-3 rounded-lg border bg-muted/50 hover:bg-muted transition-colors"
              >
                                 <div className="flex items-center gap-3">
                   <span className="text-lg">{cmd.icon}</span>
                   <div className="flex-1">
                     <p className="font-medium text-sm">"{cmd.command}"</p>
                     <p className="text-xs text-muted-foreground">
                       Also: {cmd.alternatives.join(', ')}
                     </p>
                   </div>
                 </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </motion.div>
            ))}
          </div>
          
                     <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
             <div className="flex items-center gap-2 text-sm">
               <Mic className="h-4 w-4 text-primary" />
               <span className="text-primary font-medium">Tip:</span>
               <span className="text-muted-foreground">
                 Say "go to home" or "open settings" - AI will automatically navigate you to the desired page
               </span>
             </div>
           </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 