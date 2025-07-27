"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslations } from "@/components/translations-context";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MobileNav } from "./mobile-nav";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
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

export function Header() {
  const { t } = useTranslations()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { showBroadcast, showNavigation, toggleBroadcast, toggleNavigation } = usePresentation()
  
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
  
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full sticky top-0 z-50 border-b bg-background"
    >
      <div className=" mx-auto px-4 h-12 flex items-center justify-between gap-2">
        <MobileNav />
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-md:hidden flex items-center gap-6"
        >
          <Link href="/" className="flex gap-3 items-center">
            <motion.h1 
              className="text-lg font-medium tracking-tighter flex gap-2 items-center"
              whileHover={{ scale: 1.02 }}
            >
              {mounted && (
                <Image
                  src={theme === 'dark' ? '/images/unicorn-white.png' : '/images/unicorn-black.png'}
                  alt="Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              )}
              {t('header.logo')}
            </motion.h1>
           
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/about">
              <Button variant="ghost" size="sm">
                About
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="ghost" size="sm">
                Features
              </Button>
            </Link>
            <Link href="/presentations">
              <Button variant="ghost" size="sm">
                Presentations
              </Button>
            </Link>
            <Link href="/project-generator" className="text-sm font-medium transition-colors hover:text-primary">
              {t('header.projectGenerator')}
            </Link>
            <Link href="/settings">
              <Button variant="ghost" size="sm">
                Settings
              </Button>
            </Link>
          </div>
        </motion.nav>

        <div className="flex items-center gap-2">
          

          {/* Broadcast Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleBroadcast}
            className="flex items-center gap-2"
          >
            {showBroadcast ? (
              <>
                <Mic className="h-4 w-4" />
                <Eye className="h-4 w-4" />
              </>
            ) : (
              <>
                <MicOff className="h-4 w-4" />
                <EyeOff className="h-4 w-4" />
              </>
            )}
          </Button>

          {/* Navigation Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleNavigation}
            className="flex items-center gap-2"
          >
            {showNavigation ? (
              <Navigation className="h-4 w-4" />
            ) : (
              <NavigationOff className="h-4 w-4" />
            )}
          </Button>

          <LanguageSwitcher />

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="flex items-center gap-2"
            title={mounted ? `Current theme: ${theme || 'system'}` : "Theme"}
          >
            {getThemeIcon()}
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
