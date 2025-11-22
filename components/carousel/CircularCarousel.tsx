'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselItem {
  number: number
  title: string
  description: string
  icon: any
  color: string
}

interface CircularCarouselProps {
  items: CarouselItem[]
}

export function CircularCarousel({ items }: CircularCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, items.length])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const getItemStyle = (index: number) => {
    // Calculate position relative to current index
    let position = index - currentIndex

    // Wrap around for circular effect
    if (position > items.length / 2) {
      position -= items.length
    } else if (position < -items.length / 2) {
      position += items.length
    }

    // Calculate 3D transforms for circular carousel effect with organic curves
    // Using golden ratio for natural spacing: φ ≈ 1.618
    const phi = 1.618
    const angle = (position * 360) / items.length
    const translateZ = 450 // Distance from center - slightly increased for depth
    const rotateY = angle

    // Curvilinear motion - natural arc following fibonacci spiral principles
    const angleRad = (angle * Math.PI) / 180
    const translateX = Math.sin(angleRad) * (600 * phi / 2)
    const translateY = Math.cos(angleRad) * 25 - 25 // Gentle vertical curve

    // Opacity and scale based on position - smoother falloff
    const distance = Math.abs(position)
    const opacity = Math.max(0.25, 1 - distance * 0.25)
    const scale = Math.max(0.65, 1 - distance * 0.12)
    const zIndex = Math.floor(100 - Math.abs(position) * 10)

    return {
      transform: `
        translateX(${translateX}px)
        translateY(${translateY}px)
        translateZ(${translateZ}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `,
      opacity,
      zIndex,
      transition: 'all 0.85s cubic-bezier(0.34, 1.56, 0.64, 1)', // Organic spring easing
      willChange: 'transform, opacity', // Performance optimization
    }
  }

  return (
    <div className="relative w-full overflow-hidden py-20">
      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="relative mx-auto"
        style={{
          perspective: '2000px',
          perspectiveOrigin: 'center center',
          height: '600px',
        }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Carousel Items */}
        <div className="relative w-full h-full flex items-center justify-center">
          {items.map((item, index) => {
            const Icon = item.icon
            const style = getItemStyle(index)
            const isCenter = index === currentIndex

            return (
              <div
                key={item.number}
                className="absolute"
                style={{
                  ...style,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                <Card
                  className={`
                    border-4 bg-[var(--card)]/95 shadow-2xl cursor-pointer
                    ${isCenter ? 'border-[var(--primary)]' : 'border-[var(--background)]'}
                  `}
                  style={{
                    width: '500px',
                    maxWidth: '90vw',
                  }}
                  onClick={() => setCurrentIndex(index)}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      {/* Number Badge */}
                      <div
                        className="flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center text-[var(--primary-foreground)] text-4xl font-black shadow-xl"
                        style={{
                          background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                        }}
                      >
                        {item.number}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        {/* Icon */}
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className="w-8 h-8" style={{ color: item.color }} />
                          <h3 className="text-3xl font-black" style={{ color: item.color }}>
                            {item.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-lg font-bold text-theme-muted leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex items-center justify-between px-8 pointer-events-none z-50">
        <button
          onClick={handlePrevious}
          className="pointer-events-auto w-16 h-16 rounded-full bg-[var(--card)] border-4 border-[var(--primary)] flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-all shadow-2xl transform hover:scale-110"
          aria-label="Previous"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          onClick={handleNext}
          className="pointer-events-auto w-16 h-16 rounded-full bg-[var(--card)] border-4 border-[var(--primary)] flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-all shadow-2xl transform hover:scale-110"
          aria-label="Next"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="flex items-center justify-center gap-3 mt-12">
        {items.map((item, index) => (
          <button
            key={item.number}
            onClick={() => {
              setCurrentIndex(index)
              setIsAutoPlaying(false)
            }}
            className={`
              h-3 rounded-full transition-all duration-300
              ${index === currentIndex
                ? 'w-12 bg-[var(--primary)]'
                : 'w-3 bg-[var(--muted)] hover:bg-[var(--primary)]/50'
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Helper Text */}
      <div className="text-center mt-6">
        <p className="text-sm font-bold text-theme-muted">
          {isAutoPlaying ? (
            <>⟳ Auto-rotating • Hover to pause</>
          ) : (
            <>⏸ Paused • Click arrows or dots to navigate</>
          )}
        </p>
      </div>
    </div>
  )
}
