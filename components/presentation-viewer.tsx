"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp,
  ChevronDown,
  Play, 
  Pause, 
  Maximize, 
  Minimize, 
  X,
  Volume2,
  Mic,
  SkipBack,
  SkipForward,
  Settings,
  RotateCcw,
  VolumeX
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useBroadcastContext } from "@/hooks/use-broadcast-context"
import { toast } from "sonner"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectFade, Keyboard, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { usePresentation } from "@/contexts/presentation-context"
import { usePresentationControl } from "@/contexts/presentation-control-context"

interface Slide {
  id: number
  title: string
  content: string
  image?: string
  backgroundColor?: string
}

interface Presentation {
  id: string
  title: string
  slides: Slide[]
}

// Sample presentations data
const presentationsData: Record<string, Presentation> = {
  "unicorn-startup-creator": {
    id: "unicorn-startup-creator",
    title: "Unicorn Startup Creator & Presenter",
    slides: [
      {
        id: 1,
        title: "Unicorn Startup Creator & Presenter",
        content: "The AI Agent That Creates and Pitches the Next Generation of Billion-Dollar Startups. This cutting-edge application leverages OpenAI's Realtime API with WebRTC technology to create an interactive voice-controlled startup creation and presentation platform.",
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      },
      {
        id: 2,
        title: "The Problem We Solve",
        content: "Creating successful startups is hard. Founders often misread timing or market dynamics, struggle to pitch with clarity or confidence, and lack access to strategic or creative talent. This leads to wasted time, capital, and energy.",
        backgroundColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      },
      {
        id: 3,
        title: "Our Revolutionary Solution",
        content: "Unicorn Startup Creator changes the game by combining real-time data, autonomous agents, and ChainOpera AI's logic endpoints. It surfaces valuable startup opportunities, validates concepts against real market signals, and generates complete investor-grade pitch materials.",
        backgroundColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      },
      {
        id: 4,
        title: "Meet the Developer",
        content: "The system was architected and implemented by Ihor Sokolov, also known as vibecoder. He's a full-stack web developer with extensive experience in AI integration, real-time systems, and Web3 product development.",
        backgroundColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
      },
      {
        id: 5,
        title: "ChainOpera AI - The Key Enabler",
        content: "ChainOpera AI is our flexible execution layer for high-context logic generation. It handles semantic business model synthesis, founder-narrative generation, investor-focused storytelling, and multi-modal component generation through dynamically registered endpoints.",
        backgroundColor: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
      },
      {
        id: 6,
        title: "Real-Time Voice Interaction",
        content: "Our application demonstrates the integration of OpenAI's latest Realtime API with WebRTC for real-time voice interactions. It enables users to create, manage, and present startup ideas through natural voice commands and AI assistance with sub-second response times.",
        backgroundColor: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
      },
      {
        id: 7,
        title: "AI-Powered Tools & Features",
        content: "The system includes comprehensive AI tools triggered via voice commands: navigation tools, presentation controls, utility functions, and project information tools. Key features include autonomous startup generation, complete pitch creation, market validation, and avatar presentations.",
        backgroundColor: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
      },
      {
        id: 8,
        title: "Technology Stack",
        content: "Built with Next.js 15, React 19, TypeScript, and Tailwind CSS. The AI components include GPT-4o Realtime for voice interactions, Whisper-1 for speech recognition, and a modular micro-service architecture with dynamic endpoint registration.",
        backgroundColor: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
      },
      {
        id: 9,
        title: "Target Audience & Use Cases",
        content: "The system serves founders validating ideas, startup incubators and accelerators, VC analysts for deal flow analysis, entrepreneurs seeking strategic guidance, and investors evaluating startup opportunities. It's available via API, CLI, and visual UI.",
        backgroundColor: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
      },
      {
        id: 10,
        title: "Architecture & Design Philosophy",
        content: "The architecture uses a modular, API-first design with distributed agent orchestration. Each generation request routes to specialized ChainOpera endpoints, allowing independent scaling and domain-specific reasoning chains for diverse startup contexts.",
        backgroundColor: "linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)"
      },
      {
        id: 11,
        title: "Key Benefits & Impact",
        content: "The main benefits are: it surfaces valuable startup opportunities, validates concepts against real market signals, generates investor-grade materials, delivers pitches via avatars, and iterates through feedback loops. It's essentially your co-founder, strategist, pitch coach, and creative director all in one.",
        backgroundColor: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
      },
      {
        id: 12,
        title: "Future Vision & Roadmap",
        content: "Our development roadmap includes advanced workflow orchestration, enhanced AI capabilities, external API integration, and enterprise features. We're building not just a static product, but a developer-facing AI framework that others can extend and embed into their workflows.",
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }
    ]
  }
};

interface PresentationViewerProps {
  presentationId: string
}

export function PresentationViewer({ presentationId }: PresentationViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isAutoplayActive, setIsAutoplayActive] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isAutoNarrating, setIsAutoNarrating] = useState(false)
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true)
  
  const swiperRef = useRef<any>(null)
  const { isSessionActive, sendTextMessage } = useBroadcastContext()
  const { showNavigation } = usePresentation()
  const { setControlFunctions } = usePresentationControl()
  
  const presentation = presentationsData[presentationId]
  
  // Ensure component is mounted before rendering Swiper
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!presentation) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Presentation Not Found</h1>
          <p className="text-muted-foreground">The requested presentation does not exist.</p>
        </div>
      </div>
    )
  }

  const totalSlides = presentation.slides.length
  const progress = ((currentSlide + 1) / totalSlides) * 100

  // Функция автоматического озвучивания слайда
  const narrateSlide = useCallback((slideNumber: number) => {
    // slideNumber приходит как номер слайда (1,2,3...), конвертируем в индекс (0,1,2...)
    const slideIndex = slideNumber - 1
    
    if (!isSessionActive || !presentation.slides[slideIndex]) {
      return
    }

    const slide = presentation.slides[slideIndex]
    const narrationText = `${slide.title}. ${slide.content}`
    
    setIsAutoNarrating(true)
    
    // Отправляем текст для озвучивания
    sendTextMessage(narrationText)
    
    // Показываем уведомление
    toast.success("Narrating slide", {
      description: `Narrating: ${slide.title}`,
      duration: 3000,
    })
    
    // Рассчитываем время ожидания на основе длины текста (примерно 150 слов в минуту)
    const wordCount = narrationText.split(' ').length
    const estimatedReadingTime = Math.max(wordCount * 0.4, 10) // Минимум 10 секунд
    const totalWaitTime = estimatedReadingTime + 3000 // +3 секунды на паузу
    
    // Сбрасываем состояние через рассчитанное время и переходим к следующему слайду
    setTimeout(() => {
      setIsAutoNarrating(false)
      
      // После завершения озвучивания переходим на следующий слайд (если автоплей включен и не последний слайд)
      if (autoPlayEnabled && slideIndex < totalSlides - 1 && swiperRef.current) {
        setTimeout(() => {
          swiperRef.current.swiper.slideNext()
        }, 2000) // Увеличенная пауза после озвучивания
      }
    }, totalWaitTime * 1000)
  }, [isSessionActive, presentation.slides, sendTextMessage, totalSlides, autoPlayEnabled])

  // Auto-hide controls after 3 seconds of inactivity
  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeout) {
      clearTimeout(controlsTimeout)
    }
    // Убираем автоматическое скрытие - интерфейс всегда видим
    setShowControls(true)
  }, [])

  useEffect(() => {
    resetControlsTimeout()
    return () => {
      if (controlsTimeout) {
        clearTimeout(controlsTimeout)
      }
    }
  }, [])

  const goToSlide = useCallback((slideIndex: number) => {
    // slideIndex приходит как номер слайда (1,2,3...), конвертируем в индекс (0,1,2...)
    const actualIndex = slideIndex - 1
    
    if (actualIndex >= 0 && actualIndex < totalSlides && swiperRef.current) {
      swiperRef.current.swiper.slideTo(actualIndex)
      setCurrentSlide(actualIndex)
      toast.success(`Slide ${slideIndex}`, {
        description: `Moving to slide ${slideIndex}`,
        duration: 2000,
      })
    }
  }, [totalSlides])

  const nextSlide = useCallback(() => {
    if (swiperRef.current && currentSlide < totalSlides - 1) {
      swiperRef.current.swiper.slideNext()
      toast.success("Next slide", {
        description: "Moving to the next slide",
        duration: 2000,
      })
    }
  }, [currentSlide, totalSlides])

  const previousSlide = useCallback(() => {
    if (swiperRef.current && currentSlide > 0) {
      swiperRef.current.swiper.slidePrev()
      toast.success("Previous slide", {
        description: "Moving to the previous slide",
        duration: 2000,
      })
    }
  }, [currentSlide])

  const goToFirst = useCallback(() => {
    goToSlide(1) // Передаем 1, чтобы получить индекс 0
  }, [goToSlide])

  const goToLast = useCallback(() => {
    goToSlide(totalSlides) // Передаем totalSlides, чтобы получить индекс totalSlides - 1
  }, [goToSlide, totalSlides])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
      toast.success("Fullscreen mode", {
        description: "Entered fullscreen mode",
        duration: 2000,
      })
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
      toast.success("Fullscreen mode", {
        description: "Exited fullscreen mode",
        duration: 2000,
      })
    }
  }, [])

  const togglePause = useCallback(() => {
    setIsPaused(!isPaused)
    setAutoPlayEnabled(!autoPlayEnabled)
    
    if (swiperRef.current) {
      if (isPaused) {
        // Включаем автоплей
        setIsAutoplayActive(true)
        toast.success("Autoplay enabled", {
          description: "Slides will advance after narration",
          duration: 2000,
        })
      } else {
        // Отключаем автоплей
        setIsAutoplayActive(false)
        toast.success("Autoplay disabled", {
          description: "Slides will not advance automatically",
          duration: 2000,
        })
      }
    }
  }, [isPaused, autoPlayEnabled])

  const exitPresentation = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
    window.history.back()
    toast.success("Presentation ended", {
      description: "Exited presentation",
      duration: 2000,
    })
  }, [])

  const handleReset = useCallback(() => {
    goToSlide(1) // Передаем 1, чтобы получить индекс 0
    setIsPaused(false)
    setAutoPlayEnabled(true)
    setIsAutoplayActive(true)
    toast.success("Presentation reset", {
      description: "Starting from first slide",
      duration: 2000,
    })
  }, [goToSlide])

  const extendSlideTime = useCallback(() => {
    if (isAutoNarrating) {
      // Продлеваем время на текущем слайде на 10 секунд
      setIsAutoNarrating(false)
      setTimeout(() => {
        setIsAutoNarrating(true)
        toast.success("Extended slide time", {
          description: "Added 10 more seconds to current slide",
          duration: 2000,
        })
      }, 100)
    }
  }, [isAutoNarrating])

  // Register control functions with the context
  useEffect(() => {
    if (mounted) {
      setControlFunctions({
        nextSlide,
        previousSlide,
        goToSlide,
        goToFirst,
        goToLast,
        togglePause,
        toggleFullscreen,
        exitPresentation,
        handleReset,
        narrateSlide,
        extendSlideTime,
        currentSlide // Добавляем текущий индекс слайда
      })
    }
  }, [mounted, setControlFunctions, nextSlide, previousSlide, goToSlide, goToFirst, goToLast, togglePause, toggleFullscreen, exitPresentation, handleReset, narrateSlide, extendSlideTime, currentSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
        case " ":
          event.preventDefault()
          nextSlide()
          break
        case "ArrowLeft":
          event.preventDefault()
          previousSlide()
          break
        case "Home":
          event.preventDefault()
          goToFirst()
          break
        case "End":
          event.preventDefault()
          goToLast()
          break
        case "Escape":
          event.preventDefault()
          exitPresentation()
          break
        case "f":
        case "F":
          event.preventDefault()
          toggleFullscreen()
          break
        case "p":
        case "P":
          event.preventDefault()
          togglePause()
          break
        case "r":
        case "R":
          event.preventDefault()
          handleReset()
          break
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [currentSlide, totalSlides, nextSlide, previousSlide, goToFirst, goToLast, exitPresentation, toggleFullscreen, togglePause, handleReset])

  const handleSlideChange = useCallback((swiper: any) => {
    const newSlideIndex = swiper.activeIndex
    setCurrentSlide(newSlideIndex)
    
    // Автоматически озвучиваем новый слайд (передаем номер слайда, а не индекс)
    narrateSlide(newSlideIndex + 1)
  }, [narrateSlide])

  // Show loading state while mounting
  if (!mounted) {
    return (
      <div className="h-full flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading presentation...</div>
      </div>
    )
  }

  return (
    <div 
      className="relative h-full w-full bg-black"
    >
      {/* Debug info - HIDDEN */}
      {/* <div className="absolute top-4 left-4 z-50 text-white text-sm bg-black/50 p-2 rounded">
        Presentation: {presentationId} | Slides: {totalSlides} | Current: {currentSlide + 1} | Mounted: {mounted ? 'Yes' : 'No'}
      </div> */}

      {/* Swiper Container */}
      <div className="absolute inset-0">
        {mounted && (
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, EffectFade, Keyboard, Autoplay]}
            effect="fade"
            fadeEffect={{
              crossFade: true
            }}
            speed={800}
            autoplay={false} // Отключаем стандартный автоплей
            keyboard={{
              enabled: true,
              onlyInViewport: true
            }}
            onSlideChange={handleSlideChange}
            onAutoplayStart={() => setIsAutoplayActive(true)}
            onAutoplayStop={() => setIsAutoplayActive(false)}
            className="h-full w-full"
            allowTouchMove={true}
            touchRatio={1}
            touchAngle={45}
            grabCursor={true}
          >
            {presentation.slides.map((slide, index) => (
              <SwiperSlide key={slide.id} className="h-full w-full">
                <div 
                  className="h-full w-full flex items-center justify-center p-8 relative"
                  style={{
                    background: slide.backgroundColor || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  }}
                >
                  <div className="text-center text-white max-w-4xl z-10">
                    <motion.h1 
                      className="text-5xl md:text-7xl font-bold mb-8"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.div 
                      className="text-xl md:text-2xl leading-relaxed whitespace-pre-line"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      {slide.content}
                    </motion.div>
                  </div>
                  
                  {/* Slide number indicator */}
                  <div className="absolute top-8 left-8 text-white/50 text-sm font-medium">
                    {index + 1} / {totalSlides}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Progress value={progress} className="h-1 rounded-none" />
      </div>

      {/* Voice Status - HIDDEN */}
      {/* <div className="absolute top-4 right-4 z-20">
        <div className="flex items-center gap-2">
          <Badge variant={isSessionActive ? "default" : "secondary"} className="bg-black/50 text-white">
            <Mic className="h-3 w-3 mr-1" />
            {isSessionActive ? "Voice Active" : "Voice Inactive"}
          </Badge>
          {isAutoplayActive && (
            <Badge variant="outline" className="bg-black/50 text-white border-white/30">
              <Play className="h-3 w-3 mr-1" />
              Autoplay
            </Badge>
          )}
          {isAutoNarrating && (
            <Badge variant="outline" className="bg-black/50 text-white border-white/30">
              <Volume2 className="h-3 w-3 mr-1 animate-pulse" />
              Narrating
            </Badge>
          )}
        </div>
      </div> */}

      {/* Slide Navigation Dots */}
      {showNavigation && (
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex gap-2">
            {presentation.slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index + 1)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/50 hover:bg-white/75 hover:scale-110"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Slide Thumbnails Navigation - HIDDEN */}
      {/* <AnimatePresence>
        {showControls && showNavigation && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20"
          >
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2 max-h-96 overflow-y-auto">
              <div className="flex flex-col gap-2">
                {presentation.slides.map((slide, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index + 1)}
                    className={`relative w-16 h-12 rounded-md overflow-hidden transition-all duration-300 ${
                      index === currentSlide
                        ? "ring-2 ring-white scale-110"
                        : "hover:scale-105 opacity-70 hover:opacity-100"
                    }`}
                    style={{
                      background: slide.backgroundColor || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    {index === currentSlide && (
                      <div className="absolute inset-0 bg-white/20" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Pause Overlay */}
      {isPaused && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
          <div className="text-center text-white">
            <Pause className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl font-medium">Autoplay Paused</p>
            <p className="text-sm opacity-75 mt-2">Click button or say 'resume' to continue</p>
          </div>
        </div>
      )}

      {/* Control Panel - Voice Interface Style */}
      <AnimatePresence>
        {showControls && showNavigation && (
          <motion.div
            className={`fixed bottom-4 left-4 z-50 bg-card text-card-foreground rounded-xl border shadow-lg p-4 transition-all duration-300 ${
              isMinimized ? 'w-64' : 'w-80'
            }`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Presentation Control</h3>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  isPaused ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-6 w-6 p-0"
                >
                  {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            {!isMinimized && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress Info */}
                <div className="text-xs text-muted-foreground">
                  {currentSlide + 1}/{totalSlides} • {Math.round(progress)}% complete
                </div>

                {/* Navigation Controls */}
                <div className="grid grid-cols-4 gap-2">
                  <Button
                    onClick={goToFirst}
                    disabled={currentSlide === 0}
                    variant="outline"
                    size="sm"
                    className="h-8"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>

                  <Button
                    onClick={previousSlide}
                    disabled={currentSlide === 0}
                    variant="outline"
                    size="sm"
                    className="h-8"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <Button
                    onClick={nextSlide}
                    disabled={currentSlide === totalSlides - 1}
                    variant="outline"
                    size="sm"
                    className="h-8"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  <Button
                    onClick={goToLast}
                    disabled={currentSlide === totalSlides - 1}
                    variant="outline"
                    size="sm"
                    className="h-8"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>

                {/* Control Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={togglePause}
                    variant="outline"
                    size="sm"
                    className="h-8"
                  >
                    {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  </Button>

                  <Button
                    onClick={toggleFullscreen}
                    variant="outline"
                    size="sm"
                    className="h-8"
                  >
                    {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Voice and Time Control */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => narrateSlide(currentSlide + 1)}
                    disabled={!isSessionActive || isAutoNarrating}
                    variant="outline"
                    size="sm"
                    className="h-8"
                  >
                    {isAutoNarrating ? <VolumeX className="h-4 w-4 animate-pulse" /> : <Volume2 className="h-4 w-4" />}
                  </Button>

                  <Button
                    onClick={extendSlideTime}
                    disabled={!isAutoNarrating}
                    variant="outline"
                    size="sm"
                    className="h-8"
                    title="Add 10 more seconds to current slide"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                {/* Reset and Exit */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={handleReset}
                    variant="ghost"
                    size="sm"
                    className="h-8"
                  >
                    Reset
                  </Button>

                  <Button
                    onClick={exitPresentation}
                    variant="destructive"
                    size="sm"
                    className="h-8"
                  >
                    Exit
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 