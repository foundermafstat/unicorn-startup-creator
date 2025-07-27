"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Presentation, Play, Settings } from "lucide-react"
import Link from "next/link"

const presentations = [
  {
    id: "unicorn-startup-creator",
    title: "Unicorn Startup Creator & Presenter",
    description: "The AI Agent That Creates and Pitches the Next Generation of Billion-Dollar Startups",
    slides: 12,
    duration: "8-10 min",
    category: "Product"
  }
]

export default function PresentationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Presentations</h1>
        <p className="text-muted-foreground">
          Interactive presentations with voice control capabilities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {presentations.map((presentation) => (
          <Card key={presentation.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Presentation className="h-5 w-5" />
                  {presentation.title}
                </CardTitle>
                <Badge variant="secondary">{presentation.category}</Badge>
              </div>
              <CardDescription>{presentation.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Slides: {presentation.slides}</span>
                  <span>Duration: {presentation.duration}</span>
                </div>
                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/presentations/${presentation.id}`}>
                      <Play className="h-4 w-4 mr-2" />
                      Start Presentation
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 p-6 bg-muted rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Voice Commands for Presentations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Navigation</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• "next slide" or "forward"</li>
              <li>• "previous slide" or "back"</li>
              <li>• "go to slide [number]"</li>
              <li>• "first slide" or "last slide"</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Control</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• "start presentation"</li>
              <li>• "pause" or "resume"</li>
              <li>• "exit presentation"</li>
              <li>• "fullscreen" or "exit fullscreen"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 