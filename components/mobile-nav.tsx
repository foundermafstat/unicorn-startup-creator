"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Badge } from "./ui/badge";
import { useTranslations } from "@/components/translations-context"
import { useTheme } from "next-themes";
import Image from "next/image";
import { usePresentation } from "@/contexts/presentation-context";
import { 
  Eye, 
  EyeOff, 
  Navigation, 
  NavigationOff,
  Mic,
  MicOff,
  Sun,
  Moon,
  Monitor
} from "lucide-react";

export function MobileNav() {
  const { t } = useTranslations();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { showBroadcast, showNavigation, toggleBroadcast, toggleNavigation } = usePresentation();

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('system')
    } else {
      setTheme('dark')
    }
  }

  const getThemeIcon = () => {
    if (!mounted) return <Monitor className="h-4 w-4" />
    
    switch (theme) {
      case 'dark':
        return <Moon className="h-4 w-4" />
      case 'light':
        return <Sun className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const getThemeText = () => {
    if (!mounted) return 'System'
    
    switch (theme) {
      case 'dark':
        return 'Dark'
      case 'light':
        return 'Light'
      default:
        return 'System'
    }
  }

  return (
    <div className="md:hidden flex gap-2 w-full items-center overflow-auto">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="icon" variant="outline" aria-label="Open navigation">
            <MenuIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[95vw] rounded-lg flex flex-col flex-1 justify-start items-start overflow-y-auto p-6">
          <DialogHeader className="w-full">
            <DialogTitle className="w-full text-left text-2xl font-bold">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 text-2xl"
              >
                {mounted && (
                  <Image
                    src={theme === 'dark' ? '/images/unicorn-white.png' : '/images/unicorn-black.png'}
                    alt="Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                )}
                {siteConfig.name}
                <Badge variant="outline" className="text-normal">
                  {t('header.beta')}
                </Badge>
              </Link>
            </DialogTitle>
          </DialogHeader>

          <div className="w-full flex flex-col gap-4 mt-6">
            {/* Control Buttons */}
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-muted-foreground">Controls</h3>
              
              <Button
                variant="outline"
                onClick={toggleTheme}
                className="justify-start"
                title={mounted ? `Current theme: ${theme || 'system'}` : "Theme"}
              >
                {getThemeIcon()}
                <span className="ml-2">Theme: {getThemeText()}</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={toggleBroadcast}
                className="justify-start"
              >
                {showBroadcast ? (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    <Eye className="h-4 w-4 mr-2" />
                    Hide Broadcast
                  </>
                ) : (
                  <>
                    <MicOff className="h-4 w-4 mr-2" />
                    <EyeOff className="h-4 w-4 mr-2" />
                    Show Broadcast
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={toggleNavigation}
                className="justify-start"
              >
                {showNavigation ? (
                  <>
                    <Navigation className="h-4 w-4 mr-2" />
                    Hide Navigation
                  </>
                ) : (
                  <>
                    <NavigationOff className="h-4 w-4 mr-2" />
                    Show Navigation
                  </>
                )}
              </Button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-muted-foreground">Navigation</h3>
              
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                {t('header.title')}
              </Link>
              <Link href="/features" className="text-sm font-medium transition-colors hover:text-primary">
                Features
              </Link>
              <Link href="/presentations" className="text-sm font-medium transition-colors hover:text-primary">
                Presentations
              </Link>
              <Link href="/project-generator" className="text-sm font-medium transition-colors hover:text-primary">
                {t('header.projectGenerator')}
              </Link>
              <Link href="/settings" className="text-sm font-medium transition-colors hover:text-primary">
                Settings
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}