'use client'

// ============================================
// PAGE FLIP ANIMATION
// Realistic 3D page turning with physics
// ============================================

import { motion, useAnimation, PanInfo } from 'framer-motion'
import { useState, useRef, useEffect, useCallback, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import { ANIMATION_TIMINGS, PERSPECTIVE_CONFIG, A11Y_CONFIG, getDeviceType } from './bookConstants'

// ============================================
// TYPES
// ============================================

interface PageFlipProps {
  leftPage: ReactNode
  rightPage: ReactNode
  nextLeftPage?: ReactNode
  nextRightPage?: ReactNode
  prevLeftPage?: ReactNode
  prevRightPage?: ReactNode
  currentSpread: number
  totalSpreads: number
  onFlipComplete?: (direction: 'next' | 'prev') => void
  onFlipStart?: (direction: 'next' | 'prev') => void
  isAnimating?: boolean
  className?: string
}

type FlipState = 'idle' | 'flipping-next' | 'flipping-prev' | 'dragging'

// ============================================
// MAIN COMPONENT
// ============================================

export function PageFlip({
  leftPage,
  rightPage,
  nextLeftPage,
  nextRightPage,
  prevLeftPage,
  prevRightPage,
  currentSpread,
  totalSpreads,
  onFlipComplete,
  onFlipStart,
  isAnimating,
  className,
}: PageFlipProps) {
  const [flipState, setFlipState] = useState<FlipState>('idle')
  const [dragProgress, setDragProgress] = useState(0) // -1 to 1 (negative = prev, positive = next)
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const containerRef = useRef<HTMLDivElement>(null)
  const flipControls = useAnimation()

  useEffect(() => {
    function updateDevice() {
      setDeviceType(getDeviceType())
    }
    updateDevice()
    window.addEventListener('resize', updateDevice)
    return () => window.removeEventListener('resize', updateDevice)
  }, [])

  const isDesktop = deviceType === 'desktop'
  const canFlipNext = currentSpread < totalSpreads - 1
  const canFlipPrev = currentSpread > 0

  // ============================================
  // FLIP ANIMATION
  // ============================================

  const flipToNext = useCallback(async () => {
    if (!canFlipNext || flipState !== 'idle') return

    setFlipState('flipping-next')
    onFlipStart?.('next')

    await flipControls.start({
      rotateY: -180,
      transition: {
        duration: ANIMATION_TIMINGS.pageFlip.duration / 1000,
        ease: [0.4, 0, 0.2, 1],
      },
    })

    setFlipState('idle')
    flipControls.set({ rotateY: 0 })
    onFlipComplete?.('next')
  }, [canFlipNext, flipState, flipControls, onFlipStart, onFlipComplete])

  const flipToPrev = useCallback(async () => {
    if (!canFlipPrev || flipState !== 'idle') return

    setFlipState('flipping-prev')
    onFlipStart?.('prev')

    // For prev, we animate from -180 to 0
    flipControls.set({ rotateY: -180 })
    await flipControls.start({
      rotateY: 0,
      transition: {
        duration: ANIMATION_TIMINGS.pageFlip.duration / 1000,
        ease: [0.4, 0, 0.2, 1],
      },
    })

    setFlipState('idle')
    onFlipComplete?.('prev')
  }, [canFlipPrev, flipState, flipControls, onFlipStart, onFlipComplete])

  // ============================================
  // GESTURE HANDLING
  // ============================================

  const handleDragStart = () => {
    if (flipState !== 'idle') return
    setFlipState('dragging')
  }

  const handleDrag = (_: any, info: PanInfo) => {
    if (flipState !== 'dragging') return

    const containerWidth = containerRef.current?.offsetWidth || 1
    const dragPercent = info.offset.x / (containerWidth / 2)
    const clampedDrag = Math.max(-1, Math.min(1, -dragPercent))
    setDragProgress(clampedDrag)
  }

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (flipState !== 'dragging') return

    const containerWidth = containerRef.current?.offsetWidth || 1
    const velocity = info.velocity.x
    const threshold = containerWidth * 0.25

    // Determine if we should complete the flip
    if (info.offset.x < -threshold || velocity < -500) {
      if (canFlipNext) {
        flipToNext()
      }
    } else if (info.offset.x > threshold || velocity > 500) {
      if (canFlipPrev) {
        flipToPrev()
      }
    }

    setFlipState('idle')
    setDragProgress(0)
  }

  // ============================================
  // KEYBOARD NAVIGATION
  // Keyboard navigation is handled by parent (DigitalTextbook)
  // to allow single-page navigation instead of spread-based
  // ============================================

  // ============================================
  // RENDER - DESKTOP (TWO-PAGE SPREAD)
  // ============================================

  if (isDesktop) {
    return (
      <div
        ref={containerRef}
        className={cn('relative w-full h-full', className)}
        style={{
          perspective: PERSPECTIVE_CONFIG.container,
          perspectiveOrigin: 'center center',
        }}
      >
        {/* Left Page (static verso) - hidden during flip-next since the flipping page back reveals new left */}
        <div
          className="absolute left-0 top-0 w-1/2 h-full"
          style={{
            // When flipping next, hide current left page so flipping page back (new left) can show cleanly
            visibility: flipState === 'flipping-next' ? 'hidden' : 'visible',
          }}
        >
          {flipState === 'flipping-prev' ? prevLeftPage : leftPage}
        </div>

        {/* New left page visible behind during flip-next (under the flipping page) */}
        {flipState === 'flipping-next' && (
          <div
            className="absolute left-0 top-0 w-1/2 h-full"
            style={{ zIndex: 5 }}
          >
            {nextLeftPage}
          </div>
        )}

        {/* Right Page (static recto - visible when not flipping) */}
        <div
          className="absolute right-0 top-0 w-1/2 h-full"
          style={{
            visibility: flipState === 'idle' ? 'visible' : 'hidden',
          }}
        >
          {rightPage}
        </div>

        {/* Previous right page visible behind during flip-prev */}
        {flipState === 'flipping-prev' && (
          <div
            className="absolute right-0 top-0 w-1/2 h-full"
            style={{ zIndex: 5 }}
          >
            {prevRightPage}
          </div>
        )}

        {/* Flipping Page Layer */}
        {flipState !== 'idle' && (
          <motion.div
            className="absolute right-0 top-0 w-1/2 h-full origin-left"
            style={{
              transformStyle: 'preserve-3d',
              zIndex: 20,
            }}
            animate={flipControls}
          >
            {/* Front of flipping page */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
              }}
            >
              {flipState === 'flipping-next' ? rightPage : prevRightPage}
            </div>

            {/* Back of flipping page */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              {flipState === 'flipping-next' ? nextLeftPage : leftPage}
            </div>

            {/* Dynamic shadow on page during flip */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.15), transparent)',
                backfaceVisibility: 'hidden',
              }}
            />
          </motion.div>
        )}

        {/* Next right page (visible behind during flip next) */}
        {flipState === 'flipping-next' && (
          <div
            className="absolute right-0 top-0 w-1/2 h-full"
            style={{ zIndex: 5 }}
          >
            {nextRightPage}
          </div>
        )}

        {/* Navigation Zones (click to flip) */}
        <button
          className="absolute left-0 top-0 w-16 h-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity z-30 flex items-center justify-start pl-2"
          onClick={() => flipToPrev()}
          disabled={!canFlipPrev || flipState !== 'idle'}
          aria-label="Previous page"
        >
          <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[var(--foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </button>

        <button
          className="absolute right-0 top-0 w-16 h-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity z-30 flex items-center justify-end pr-2"
          onClick={() => flipToNext()}
          disabled={!canFlipNext || flipState !== 'idle'}
          aria-label="Next page"
        >
          <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[var(--foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    )
  }

  // ============================================
  // RENDER - TABLET/MOBILE (SINGLE PAGE WITH SWIPE)
  // ============================================

  return (
    <motion.div
      ref={containerRef}
      className={cn('relative w-full h-full touch-pan-y', className)}
      style={{
        perspective: '1000px',
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      {/* Current Page */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: dragProgress * -100,
          scale: 1 - Math.abs(dragProgress) * 0.05,
        }}
      >
        {rightPage}
      </motion.div>

      {/* Next Page (peeking from right) */}
      {canFlipNext && dragProgress > 0 && (
        <motion.div
          className="absolute inset-0"
          style={{
            x: `${100 - dragProgress * 100}%`,
            opacity: dragProgress,
          }}
        >
          {nextRightPage}
        </motion.div>
      )}

      {/* Previous Page (peeking from left) */}
      {canFlipPrev && dragProgress < 0 && (
        <motion.div
          className="absolute inset-0"
          style={{
            x: `${-100 - dragProgress * 100}%`,
            opacity: -dragProgress,
          }}
        >
          {prevRightPage}
        </motion.div>
      )}

      {/* Swipe hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-[var(--muted-foreground)]">
        ← Swipe to turn →
      </div>
    </motion.div>
  )
}

// ============================================
// RAPID PAGE FLIP (For seeking to position)
// ============================================

interface RapidFlipProps {
  fromSpread: number
  toSpread: number
  onComplete: () => void
  className?: string
}

export function RapidPageFlip({ fromSpread, toSpread, onComplete, className }: RapidFlipProps) {
  const [currentSpread, setCurrentSpread] = useState(fromSpread)
  const direction = toSpread > fromSpread ? 1 : -1
  const totalFlips = Math.abs(toSpread - fromSpread)

  useEffect(() => {
    if (currentSpread === toSpread) {
      onComplete()
      return
    }

    // Accelerating flip speed
    const progress = Math.abs(currentSpread - fromSpread) / totalFlips
    const baseTime = ANIMATION_TIMINGS.seeking.basePageFlip
    const acceleratedTime = Math.max(
      ANIMATION_TIMINGS.seeking.minFlipTime,
      baseTime * Math.pow(ANIMATION_TIMINGS.seeking.acceleration, progress * 10)
    )

    const timer = setTimeout(() => {
      setCurrentSpread((prev) => prev + direction)
    }, acceleratedTime)

    return () => clearTimeout(timer)
  }, [currentSpread, toSpread, fromSpread, direction, totalFlips, onComplete])

  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      {/* Rapid flip animation visualization */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          rotateY: [0, direction * -15, 0],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="text-4xl">📖</div>
      </motion.div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-white/80">
        Turning to page {(toSpread + 1) * 2}...
      </div>
    </div>
  )
}

// ============================================
// PAGE TURN SOUND HOOK
// ============================================

export function usePageTurnSound(enabled: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (enabled && typeof window !== 'undefined') {
      audioRef.current = new Audio('/sounds/page-turn.mp3')
      audioRef.current.volume = 0.3
    }
    return () => {
      audioRef.current = null
    }
  }, [enabled])

  const playSound = useCallback(() => {
    if (enabled && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {
        // Ignore autoplay errors
      })
    }
  }, [enabled])

  return playSound
}

export default PageFlip
