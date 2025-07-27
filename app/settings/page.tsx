"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Volume2, Mic, Globe, Moon, Sun, Monitor } from "lucide-react"
import { useBroadcastContext } from "@/hooks/use-broadcast-context"

export default function SettingsPage() {
  const { voice, isSessionActive, msgs } = useBroadcastContext()
  
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
             <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
               Configure the application to your preferences
             </p>
           </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card>
              <CardHeader>
                                 <CardTitle className="flex items-center gap-2">
                   <Volume2 className="h-5 w-5" />
                   Audio Settings
                 </CardTitle>
                 <CardDescription>
                   Microphone and volume settings
                 </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                                 <div className="space-y-2">
                   <Label htmlFor="microphone">Microphone</Label>
                   <div className="flex items-center space-x-2">
                     <Switch id="microphone" defaultChecked />
                     <Label htmlFor="microphone">Enable microphone</Label>
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                   <Label>Microphone volume</Label>
                   <Slider defaultValue={[80]} max={100} step={1} />
                 </div>
                 
                 <div className="space-y-2">
                   <Label>AI response volume</Label>
                   <Slider defaultValue={[70]} max={100} step={1} />
                 </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                                 <CardTitle className="flex items-center gap-2">
                   <Globe className="h-5 w-5" />
                   Interface
                 </CardTitle>
                 <CardDescription>
                   Appearance settings
                 </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                                 <div className="space-y-2">
                   <Label>Theme</Label>
                   <div className="flex items-center space-x-2">
                     <Button variant="outline" size="sm">
                       <Sun className="h-4 w-4 mr-2" />
                       Light
                     </Button>
                     <Button variant="outline" size="sm">
                       <Moon className="h-4 w-4 mr-2" />
                       Dark
                     </Button>
                     <Button variant="outline" size="sm">
                       <Monitor className="h-4 w-4 mr-2" />
                       System
                     </Button>
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                   <Label>Interface language</Label>
                   <div className="flex items-center space-x-2">
                     <Button variant="outline" size="sm">English</Button>
                     <Button variant="outline" size="sm">Русский</Button>
                     <Button variant="outline" size="sm">Español</Button>
                   </div>
                 </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                                 <CardTitle className="flex items-center gap-2">
                   <Mic className="h-5 w-5" />
                   Voice Settings
                 </CardTitle>
                 <CardDescription>
                   Voice interaction settings
                 </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                                 <div className="space-y-2">
                   <Label htmlFor="auto-start">Auto-start</Label>
                   <div className="flex items-center space-x-2">
                     <Switch id="auto-start" />
                     <Label htmlFor="auto-start">Automatically start session</Label>
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                   <Label htmlFor="voice-feedback">Voice feedback</Label>
                   <div className="flex items-center space-x-2">
                     <Switch id="voice-feedback" defaultChecked />
                     <Label htmlFor="voice-feedback">Announce operation status</Label>
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                   <Label>Microphone sensitivity</Label>
                   <Slider defaultValue={[60]} max={100} step={1} />
                 </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Information</CardTitle>
                <CardDescription>
                  Current voice interface status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span className={`text-sm font-medium ${isSessionActive ? 'text-green-600' : 'text-red-600'}`}>
                    {isSessionActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Selected voice:</span>
                  <span className="text-sm font-medium capitalize">{voice}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Messages:</span>
                  <span className="text-sm font-medium">{msgs.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex justify-center gap-4 mt-8"
          >
            <Button variant="outline">Reset Settings</Button>
            <Button>Save Changes</Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  )
} 