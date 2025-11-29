'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface Expert {
  quote: string
  author: string
  role: string
  image: string
}

interface ExpertCarouselProps {
  experts: Expert[]
  autoPlayInterval?: number
}

export function ExpertCarousel({ experts, autoPlayInterval = 5000 }: ExpertCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % experts.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [experts.length, autoPlayInterval, isPaused])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + experts.length) % experts.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % experts.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Quote Card */}
      <Card className="bg-earth-700/50 border-2 border-earth-600 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-10 md:p-16 text-center relative">
          {/* Quote Icon */}
          <Quote className="w-12 h-12 text-moss-500/30 absolute top-6 left-6" />

          {/* Content */}
          <div
            key={currentIndex}
            className="animate-fade-in"
          >
            <div className="text-7xl mb-8">{experts[currentIndex].image}</div>
            <blockquote className="text-2xl md:text-3xl font-medium text-sand-100 mb-8 italic leading-relaxed">
              "{experts[currentIndex].quote}"
            </blockquote>
            <div>
              <div className="text-xl font-black text-sand-100">{experts[currentIndex].author}</div>
              <div className="text-base font-medium text-sand-400">{experts[currentIndex].role}</div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-earth-600/50 hover:bg-earth-500/50 flex items-center justify-center transition-colors"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-6 h-6 text-sand-300" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-earth-600/50 hover:bg-earth-500/50 flex items-center justify-center transition-colors"
            aria-label="Next quote"
          >
            <ChevronRight className="w-6 h-6 text-sand-300" />
          </button>
        </CardContent>
      </Card>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {experts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-moss-500 w-8'
                : 'bg-earth-600 hover:bg-earth-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="text-center mt-4">
        <span className="text-sm text-sand-500">
          {isPaused ? 'Paused' : 'Auto-playing'} • {currentIndex + 1} of {experts.length}
        </span>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
