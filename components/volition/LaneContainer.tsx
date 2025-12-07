'use client'

import { useRef, useState, useEffect, useCallback, ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile'

interface LaneContainerProps {
  children: ReactNode
  className?: string
  showNavArrows?: boolean
  onLaneChange?: (laneIndex: number) => void
}

export function LaneContainer({
  children,
  className = '',
  showNavArrows = true,
  onLaneChange,
}: LaneContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [currentLaneIndex, setCurrentLaneIndex] = useState(0)

  // Check scroll capabilities
  const checkScrollCapabilities = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)

    // Calculate current lane index for mobile
    if (isMobile) {
      const laneWidth = clientWidth
      const newIndex = Math.round(scrollLeft / laneWidth)
      if (newIndex !== currentLaneIndex) {
        setCurrentLaneIndex(newIndex)
        onLaneChange?.(newIndex)
      }
    }
  }, [isMobile, currentLaneIndex, onLaneChange])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    checkScrollCapabilities()

    container.addEventListener('scroll', checkScrollCapabilities)
    window.addEventListener('resize', checkScrollCapabilities)

    return () => {
      container.removeEventListener('scroll', checkScrollCapabilities)
      window.removeEventListener('resize', checkScrollCapabilities)
    }
  }, [checkScrollCapabilities])

  // Scroll by lane width
  const scrollByLane = useCallback((direction: 'left' | 'right') => {
    const container = containerRef.current
    if (!container) return

    const laneWidth = isMobile ? container.clientWidth : 320 // Lane width + gap
    const scrollAmount = direction === 'left' ? -laneWidth : laneWidth

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    })
  }, [isMobile])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        scrollByLane('left')
      } else if (e.key === 'ArrowRight') {
        scrollByLane('right')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [scrollByLane])

  return (
    <div className={`relative ${className}`}>
      {/* Navigation arrows (desktop only) */}
      {showNavArrows && !isMobile && (
        <>
          {/* Left arrow */}
          <button
            onClick={() => scrollByLane('left')}
            disabled={!canScrollLeft}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[var(--card)] shadow-lg border border-[var(--border)] flex items-center justify-center transition-all ${
              canScrollLeft
                ? 'opacity-100 hover:bg-[var(--muted)] hover:scale-110'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-[var(--foreground)]" />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scrollByLane('right')}
            disabled={!canScrollRight}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[var(--card)] shadow-lg border border-[var(--border)] flex items-center justify-center transition-all ${
              canScrollRight
                ? 'opacity-100 hover:bg-[var(--muted)] hover:scale-110'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-5 h-5 text-[var(--foreground)]" />
          </button>
        </>
      )}

      {/* Scroll container */}
      <div
        ref={containerRef}
        className={`
          flex gap-4 overflow-x-auto overflow-y-hidden
          scrollbar-none scroll-smooth
          ${isMobile ? 'snap-x snap-mandatory' : ''}
          px-4 md:px-6 pb-4
        `}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children}
      </div>

      {/* Fade edges (desktop only) */}
      {!isMobile && (
        <>
          <div
            className={`absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-[var(--background)] to-transparent pointer-events-none z-10 transition-opacity ${
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            className={`absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-[var(--background)] to-transparent pointer-events-none z-10 transition-opacity ${
              canScrollRight ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      )}

      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
