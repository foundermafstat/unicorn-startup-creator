"use client"

import { useEffect } from "react"

interface FullscreenLayoutProps {
  children: React.ReactNode
}

export function FullscreenLayout({ children }: FullscreenLayoutProps) {
  useEffect(() => {
    // Убираем прокрутку с body
    document.body.style.overflow = 'hidden'
    
    return () => {
      // Восстанавливаем прокрутку при размонтировании
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden">
      {children}
    </div>
  )
} 