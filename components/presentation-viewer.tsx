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
  demo: {
    id: "demo",
    title: "Demo Presentation",
    slides: [
      {
        id: 1,
        title: "Welcome to Voice-Controlled Presentations",
        content: "This presentation demonstrates the power of voice commands for controlling slides. Try saying 'next slide' or 'previous slide'.",
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      },
      {
        id: 2,
        title: "Voice Commands",
        content: "You can use voice commands like:\n• 'next slide' or 'forward'\n• 'previous slide' or 'back'\n• 'go to slide 3'\n• 'first slide' or 'last slide'",
        backgroundColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      },
      {
        id: 3,
        title: "Interactive Features",
        content: "The presentation includes:\n• Full-screen mode\n• Progress tracking\n• Voice control\n• Smooth animations",
        backgroundColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      },
      {
        id: 4,
        title: "Real-time Control",
        content: "Control the presentation in real-time using your voice. The system recognizes natural language commands and responds instantly.",
        backgroundColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
      },
      {
        id: 5,
        title: "Thank You",
        content: "Thank you for experiencing voice-controlled presentations. This technology makes presentations more interactive and accessible.",
        backgroundColor: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
      }
    ]
  },
  features: {
    id: "features",
    title: "Features Overview",
    slides: [
      {
        id: 1,
        title: "Voice Interface",
        content: "Advanced voice recognition system that understands natural language commands for seamless presentation control.",
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      },
      {
        id: 2,
        title: "Real-time Communication",
        content: "WebRTC-powered audio streaming for instant voice command processing and response.",
        backgroundColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      },
      {
        id: 3,
        title: "AI-Powered Tools",
        content: "Integration with OpenAI's API for intelligent command interpretation and natural language processing.",
        backgroundColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      },
      {
        id: 4,
        title: "Cross-Platform Support",
        content: "Works seamlessly across different browsers and devices with responsive design and adaptive layouts.",
        backgroundColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
      },
      {
        id: 5,
        title: "Customizable Interface",
        content: "Flexible UI components and themes that can be customized to match your brand and presentation style.",
        backgroundColor: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
      },
      {
        id: 6,
        title: "Analytics & Insights",
        content: "Track presentation performance, audience engagement, and voice command usage patterns.",
        backgroundColor: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
      },
      {
        id: 7,
        title: "Accessibility Features",
        content: "Built-in accessibility features including voice navigation, screen reader support, and keyboard shortcuts.",
        backgroundColor: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
      },
      {
        id: 8,
        title: "Future Roadmap",
        content: "Planned features include:\n• Multi-language support\n• Gesture recognition\n• AR/VR integration\n• Advanced analytics",
        backgroundColor: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
      }
    ]
  },
  tutorial: {
    id: "tutorial",
    title: "Voice Commands Tutorial",
    slides: [
      {
        id: 1,
        title: "Getting Started",
        content: "Welcome to the voice commands tutorial. Learn how to control presentations using natural voice commands.",
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      },
      {
        id: 2,
        title: "Basic Navigation",
        content: "Basic navigation commands:\n• 'next slide' - go to next slide\n• 'previous slide' - go to previous slide\n• 'forward' - same as next slide\n• 'back' - same as previous slide",
        backgroundColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      },
      {
        id: 3,
        title: "Advanced Navigation",
        content: "Advanced navigation commands:\n• 'go to slide 3' - jump to specific slide\n• 'first slide' - go to beginning\n• 'last slide' - go to end\n• 'slide 5' - shorthand for go to slide",
        backgroundColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      },
      {
        id: 4,
        title: "Presentation Control",
        content: "Presentation control commands:\n• 'start presentation' - begin presentation\n• 'pause' - pause presentation\n• 'resume' - continue presentation\n• 'exit presentation' - end presentation",
        backgroundColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
      },
      {
        id: 5,
        title: "Display Controls",
        content: "Display control commands:\n• 'fullscreen' - enter fullscreen mode\n• 'exit fullscreen' - leave fullscreen\n• 'hide controls' - hide interface\n• 'show controls' - show interface",
        backgroundColor: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
      },
      {
        id: 6,
        title: "Practice Time",
        content: "Now try these commands:\n• Say 'next slide' to continue\n• Say 'go to slide 1' to restart\n• Say 'fullscreen' to enter fullscreen\n• Say 'exit fullscreen' to return",
        backgroundColor: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
      }
    ]
  }
}

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
    toast.success("Озвучивание слайда", {
      description: `Озвучивается: ${slide.title}`,
      duration: 3000,
    })
    
    // Сбрасываем состояние через 5 секунд и переходим к следующему слайду
    setTimeout(() => {
      setIsAutoNarrating(false)
      
      // После завершения озвучивания переходим на следующий слайд (если автоплей включен и не последний слайд)
      if (autoPlayEnabled && slideIndex < totalSlides - 1 && swiperRef.current) {
        setTimeout(() => {
          swiperRef.current.swiper.slideNext()
        }, 1000) // Небольшая пауза после озвучивания
      }
    }, 5000)
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
      toast.success(`Слайд ${slideIndex}`, {
        description: `Переход на слайд ${slideIndex}`,
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
        toast.success("Автоплей включен", {
          description: "Слайды будут переключаться после озвучивания",
          duration: 2000,
        })
      } else {
        // Отключаем автоплей
        setIsAutoplayActive(false)
        toast.success("Автоплей отключен", {
          description: "Слайды не будут переключаться автоматически",
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
    toast.success("Презентация сброшена", {
      description: "Начинаем с первого слайда",
      duration: 2000,
    })
  }, [goToSlide])

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
        currentSlide // Добавляем текущий индекс слайда
      })
    }
  }, [mounted, setControlFunctions, nextSlide, previousSlide, goToSlide, goToFirst, goToLast, togglePause, toggleFullscreen, exitPresentation, handleReset, narrateSlide, currentSlide])

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
      {/* Debug info */}
      <div className="absolute top-4 left-4 z-50 text-white text-sm bg-black/50 p-2 rounded">
        Presentation: {presentationId} | Slides: {totalSlides} | Current: {currentSlide + 1} | Mounted: {mounted ? 'Yes' : 'No'}
      </div>

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

      {/* Voice Status */}
      <div className="absolute top-4 right-4 z-20">
        <div className="flex items-center gap-2">
          <Badge variant={isSessionActive ? "default" : "secondary"} className="bg-black/50 text-white">
            <Mic className="h-3 w-3 mr-1" />
            {isSessionActive ? "Voice Active" : "Voice Inactive"}
          </Badge>
          {isAutoplayActive && (
            <Badge variant="outline" className="bg-black/50 text-white border-white/30">
              <Play className="h-3 w-3 mr-1" />
              Автоплей
            </Badge>
          )}
          {isAutoNarrating && (
            <Badge variant="outline" className="bg-black/50 text-white border-white/30">
              <Volume2 className="h-3 w-3 mr-1 animate-pulse" />
              Narrating
            </Badge>
          )}
        </div>
      </div>

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

      {/* Slide Thumbnails Navigation */}
      <AnimatePresence>
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
      </AnimatePresence>

      {/* Pause Overlay */}
      {isPaused && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
          <div className="text-center text-white">
            <Pause className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl font-medium">Автоплей отключен</p>
            <p className="text-sm opacity-75 mt-2">Нажмите кнопку или скажите 'включить автоплей' для продолжения</p>
          </div>
        </div>
      )}

      {/* Control Panel - Styled like BroadcastInterface */}
      <AnimatePresence>
        {showControls && showNavigation && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-4 left-4 z-50"
          >
            <Card className={`w-80 transition-all duration-300 ${isMinimized ? 'h-16' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">Presentation Control</CardTitle>
                    <Badge 
                      variant={isPaused ? "secondary" : "default"}
                      className="text-xs"
                    >
                      {isPaused ? "Автоплей выкл" : "Автоплей вкл"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="h-8 w-8 p-0"
                    >
                      {isMinimized ? <Settings className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Slide {currentSlide + 1} of {totalSlides} • {Math.round(progress)}% complete
                </CardDescription>
              </CardHeader>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CardContent className="space-y-4">
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span className="text-muted-foreground">
                            {Math.round(progress)}%
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      <Separator />

                      {/* Navigation Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={goToFirst}
                          disabled={currentSlide === 0}
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <SkipBack className="h-4 w-4" />
                          First
                        </Button>

                        <Button
                          onClick={goToLast}
                          disabled={currentSlide === totalSlides - 1}
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <SkipForward className="h-4 w-4" />
                          Last
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={previousSlide}
                          disabled={currentSlide === 0}
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>

                        <Button
                          onClick={nextSlide}
                          disabled={currentSlide === totalSlides - 1}
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <ChevronRight className="h-4 w-4" />
                          Next
                        </Button>
                      </div>

                      {/* Control Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={togglePause}
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                          {isPaused ? "Включить автоплей" : "Отключить автоплей"}
                        </Button>

                        <Button
                          onClick={toggleFullscreen}
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                          {isFullscreen ? "Exit FS" : "Fullscreen"}
                        </Button>
                      </div>

                      {/* Narration Button */}
                      <div className="grid grid-cols-1 gap-2">
                        <Button
                          onClick={() => narrateSlide(currentSlide + 1)}
                          disabled={!isSessionActive || isAutoNarrating}
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          {isAutoNarrating ? (
                            <>
                              <VolumeX className="h-4 w-4 animate-pulse" />
                              Озвучивается...
                            </>
                          ) : (
                            <>
                              <Volume2 className="h-4 w-4" />
                              Озвучить слайд
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Reset and Exit Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={handleReset}
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <RotateCcw className="h-4 w-4" />
                          Reset
                        </Button>

                        <Button
                          onClick={exitPresentation}
                          variant="destructive"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <X className="h-4 w-4" />
                          Exit
                        </Button>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 