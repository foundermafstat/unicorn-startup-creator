"use client"

import { PresentationViewer } from "@/components/presentation-viewer"
import { FullscreenLayout } from "@/components/fullscreen-layout"

export default function TestPresentationPage() {
  return (
    <FullscreenLayout>
      <PresentationViewer presentationId="demo" />
    </FullscreenLayout>
  )
} 