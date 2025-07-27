"use client"

import { useParams } from "next/navigation"
import { PresentationViewer } from "@/components/presentation-viewer"
import { FullscreenLayout } from "@/components/fullscreen-layout"

export default function PresentationPage() {
  const params = useParams()
  const presentationId = params.id as string

  return (
    <FullscreenLayout>
      <PresentationViewer presentationId={presentationId} />
    </FullscreenLayout>
  )
} 