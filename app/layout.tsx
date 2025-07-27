import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TranslationsProvider } from "@/components/translations-context"
import { BroadcastProvider } from "@/hooks/use-broadcast-context"
import { PresentationProvider } from "@/contexts/presentation-context"
import { PresentationControlProvider } from "@/contexts/presentation-control-context"
import { Header } from "@/components/header"
import { BroadcastInterface } from "@/components/broadcast-interface"
import { Toaster } from "@/components/ui/sonner"

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Unicorn Startup Creator",
  description: "Voice-controlled presentation platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} min-h-dvh bg-background font-sans antialiased geist_e531dabc-module__QGiZLq`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TranslationsProvider>
            <BroadcastProvider>
              <PresentationProvider>
                <PresentationControlProvider>
                  <div className="relative flex flex-col bg-background">
                    <Header />
                    <main className="flex-1">
                      {children}
                    </main>
                    <BroadcastInterface />
                  </div>
                  <Toaster 
                    position="bottom-left"
                    toastOptions={{
                      style: {
                        background: 'hsl(var(--card))',
                        color: 'hsl(var(--card-foreground))',
                        border: '1px solid hsl(var(--border))',
                      },
                    }}
                  />
                </PresentationControlProvider>
              </PresentationProvider>
            </BroadcastProvider>
          </TranslationsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
