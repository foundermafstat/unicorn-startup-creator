"use client"

import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectFade } from 'swiper/modules'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  SkipBack,
  SkipForward
} from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

export function TestSwiper() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const swiperRef = useRef<any>(null)

  const slides = [
    {
      id: 1,
      title: "Slide 1",
      subtitle: "This is the first slide",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      title: "Slide 2", 
      subtitle: "This is the second slide",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      title: "Slide 3",
      subtitle: "This is the third slide", 
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      id: 4,
      title: "Slide 4",
      subtitle: "This is the fourth slide",
      background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
      id: 5,
      title: "Slide 5",
      subtitle: "This is the fifth slide",
      background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
      id: 6,
      title: "Slide 6",
      subtitle: "This is the sixth slide",
      background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    },
    {
      id: 7,
      title: "Slide 7",
      subtitle: "This is the seventh slide",
      background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
    },
    {
      id: 8,
      title: "Slide 8",
      subtitle: "This is the eighth slide",
      background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
    }
  ]

  const totalSlides = slides.length

  const goToSlide = (index: number) => {
    if (swiperRef.current && index >= 0 && index < totalSlides) {
      swiperRef.current.swiper.slideTo(index)
      setCurrentSlide(index)
    }
  }

  const nextSlide = () => {
    if (swiperRef.current && currentSlide < totalSlides - 1) {
      swiperRef.current.swiper.slideNext()
    }
  }

  const previousSlide = () => {
    if (swiperRef.current && currentSlide > 0) {
      swiperRef.current.swiper.slidePrev()
    }
  }

  const goToFirst = () => goToSlide(0)
  const goToLast = () => goToSlide(totalSlides - 1)

  const handleSlideChange = (swiper: any) => {
    setCurrentSlide(swiper.activeIndex)
  }

  return (
    <div className="h-full w-full bg-black relative">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, EffectFade]}
        effect="fade"
        speed={800}
        className="h-full w-full"
        allowTouchMove={false}
        noSwiping={true}
        noSwipingClass="swiper-slide"
        onSlideChange={handleSlideChange}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="h-full w-full">
            <div 
              className="h-full w-full flex items-center justify-center"
              style={{ background: slide.background }}
            >
              <div className="text-center text-white">
                <h1 className="text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Control Panel */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToFirst}
            disabled={currentSlide === 0}
            className="text-white hover:bg-white/20"
          >
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={previousSlide}
            disabled={currentSlide === 0}
            className="text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2 text-white">
            <span className="text-sm font-medium">
              {currentSlide + 1} / {totalSlides}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="text-white hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={goToLast}
            disabled={currentSlide === totalSlides - 1}
            className="text-white hover:bg-white/20"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/50 hover:bg-white/75 hover:scale-110"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-20">
        <Badge variant="outline" className="bg-black/50 text-white border-white/30">
          Test Mode
        </Badge>
      </div>
    </div>
  )
} 