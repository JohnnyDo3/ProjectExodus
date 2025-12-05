'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { ChevronLeft, ChevronRight, Shield, Sprout, Heart, Leaf, BookOpen, Scale, Eye, Handshake, Award } from 'lucide-react'

interface CarouselItem {
  number: number
  title: string
  description: string
  iconName: string
  color: string
}

interface CircularCarouselProps {
  items: CarouselItem[]
}

// Helper function to get icon component from name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    Shield,
    Sprout,
    Heart,
    Leaf,
    BookOpen,
    Scale,
    Eye,
    Handshake,
    Award,
  }
  return icons[iconName] || Shield
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

    // Opacity and scale based on position - better visibility
    const distance = Math.abs(position)
    const opacity = Math.max(0.65, 1 - distance * 0.18)
    const scale = Math.max(0.7, 1 - distance * 0.1)
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
    <div className="relative w-full overflow-hidden py-10 md:py-20">
      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="relative mx-auto h-[400px] sm:h-[500px] md:h-[600px]"
        style={{
          perspective: '2000px',
          perspectiveOrigin: 'center center',
        }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Carousel Items */}
        <div className="relative w-full h-full flex items-center justify-center">
          {items.map((item, index) => {
            const Icon = getIconComponent(item.iconName)
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
                    border-2 sm:border-4 bg-[var(--card)]/98 shadow-2xl cursor-pointer
                    ${isCenter ? 'border-[var(--primary)]' : 'border-[var(--background)]'}
                  `}
                  style={{
                    width: '500px',
                    maxWidth: '85vw',
                    filter: isCenter ? 'none' : 'blur(0.5px)',
                  }}
                  onClick={() => setCurrentIndex(index)}
                >
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
                      {/* Number Badge */}
                      <div
                        className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-[var(--primary-foreground)] text-xl sm:text-2xl md:text-4xl font-black shadow-xl"
                        style={{
                          background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                        }}
                      >
                        {item.number}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Icon */}
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex-shrink-0" style={{ color: item.color }} />
                          <h3 className="text-lg sm:text-xl md:text-3xl font-black truncate" style={{ color: item.color }}>
                            {item.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-sm sm:text-base md:text-lg font-bold text-theme-muted leading-relaxed line-clamp-3">
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
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex items-center justify-between px-2 sm:px-4 md:px-8 pointer-events-none z-50">
        <button
          onClick={handlePrevious}
          className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-[var(--card)] border-2 sm:border-4 border-[var(--primary)] flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-all shadow-2xl transform hover:scale-110"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </button>

        <button
          onClick={handleNext}
          className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-[var(--card)] border-2 sm:border-4 border-[var(--primary)] flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-all shadow-2xl transform hover:scale-110"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
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
