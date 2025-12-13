'use client'

// ============================================
// BOOK OPEN ANIMATION
// "And the book was opened..." - Revelation 20:12
// Simple, reliable animation sequence
// ============================================

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { BOOK_DIMENSIONS, CORE_TOPIC_ICONS, getDeviceType } from './bookConstants'
import { X } from 'lucide-react'

// ============================================
// TYPES
// ============================================

interface BookOpenAnimationProps {
  topicSlug: string
  topicTitle: string
  targetPage: number
  onAnimationComplete: () => void
  reducedMotion?: boolean
  className?: string
}

// ============================================
// MAIN COMPONENT
// ============================================

export function BookOpenAnimation({
  topicSlug,
  topicTitle,
  onAnimationComplete,
  reducedMotion = false,
  className,
}: BookOpenAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true)
  const [coverOpen, setCoverOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const completedRef = useRef(false)
  const [dimensions, setDimensions] = useState(BOOK_DIMENSIONS.desktop)

  const topicIcon = CORE_TOPIC_ICONS[topicSlug] || '📖'

  // Get responsive dimensions
  useEffect(() => {
    function updateDimensions() {
      const device = getDeviceType()
      setDimensions(BOOK_DIMENSIONS[device])
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Handle completion
  const handleComplete = () => {
    if (!completedRef.current) {
      completedRef.current = true
      setIsAnimating(false)
      onAnimationComplete()
    }
  }

  // Reduced motion - skip immediately
  useEffect(() => {
    if (reducedMotion) {
      handleComplete()
    }
  }, [reducedMotion])

  // Auto-advance animation sequence
  useEffect(() => {
    if (reducedMotion || completedRef.current) return

    // Timeline:
    // 0ms: Book starts descending
    // 800ms: Book lands, start opening cover
    // 800ms: Cover opens
    // 1800ms: Show inside briefly
    // 2300ms: Complete

    const openCoverTimer = setTimeout(() => {
      setCoverOpen(true)
    }, 800)

    const showContentTimer = setTimeout(() => {
      setShowContent(true)
    }, 1600)

    const completeTimer = setTimeout(() => {
      handleComplete()
    }, 2200)

    return () => {
      clearTimeout(openCoverTimer)
      clearTimeout(showContentTimer)
      clearTimeout(completeTimer)
    }
  }, [reducedMotion])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Escape' || e.key === 'Enter') {
        e.preventDefault()
        handleComplete()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (reducedMotion || !isAnimating) {
    return null
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center',
        'bg-black/80 backdrop-blur-md',
        className
      )}
      onClick={handleComplete}
    >
      {/* Skip button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleComplete()
        }}
        className="absolute top-6 right-6 z-20 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all text-sm font-medium"
        aria-label="Skip animation"
      >
        Skip <span className="opacity-60 ml-1">ESC</span>
      </button>

      {/* Phase text */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 text-white/70 text-lg tracking-widest uppercase font-serif"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {!coverOpen && 'The book descends...'}
        {coverOpen && !showContent && 'The revelation begins...'}
        {showContent && 'Enter the sacred text...'}
      </motion.div>

      {/* Book Container - matches main book dimensions */}
      <div
        style={{
          width: dimensions.width,
          maxWidth: dimensions.maxWidth,
          height: dimensions.height,
          maxHeight: dimensions.maxHeight,
          perspective: '2500px',
        }}
      >
        {/* Animated Book */}
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
          initial={{ y: '-120%', rotateX: 25, scale: 0.7, opacity: 0 }}
          animate={{
            y: 0,
            rotateX: 0,
            scale: 1,
            opacity: 1
          }}
          transition={{
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1], // Bounce easing
          }}
        >
          {/* Book body wrapper for 3D */}
          <div
            className="relative w-full h-full rounded-lg overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.5), 0 30px 60px -30px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Back cover / Inside pages */}
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                background: showContent
                  ? 'linear-gradient(135deg, #f5f0e8 0%, #e8e0d4 100%)'
                  : 'linear-gradient(135deg, #1a1612 0%, #2a2420 50%, #1a1612 100%)',
                transition: 'background 0.5s ease',
              }}
            >
              {/* Inside pages preview when cover opens */}
              {showContent && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center p-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center max-w-lg">
                    <div className="text-6xl mb-6">{topicIcon}</div>
                    <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
                      {topicTitle}
                    </h2>
                    <div className="w-32 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-600 to-transparent mb-4" />
                    <p className="text-gray-600 italic font-serif">
                      Click anywhere to begin your journey
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Front cover - flips open */}
            <motion.div
              className="absolute inset-0 rounded-lg"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'left center',
                backfaceVisibility: 'hidden',
              }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: coverOpen ? -160 : 0 }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {/* Cover front face */}
              <div
                className="absolute inset-0 rounded-lg flex flex-col items-center justify-center p-8"
                style={{
                  background: 'linear-gradient(135deg, #1a1612 0%, #2a2420 30%, #1a1612 50%, #0f0d0a 100%)',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Gold border */}
                <div
                  className="absolute inset-6 border-2 rounded pointer-events-none"
                  style={{ borderColor: 'rgba(212, 175, 55, 0.4)' }}
                />

                {/* Decorative corners */}
                <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }} />
                <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }} />
                <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }} />
                <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }} />

                {/* Content */}
                <span className="text-7xl mb-6">{topicIcon}</span>

                <div className="w-40 h-0.5 mb-6" style={{
                  background: 'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.6), transparent)'
                }} />

                <div className="text-xl font-serif tracking-wide" style={{ color: '#d4af37' }}>
                  THE SACRED BOOK OF
                </div>

                <h1 className="text-4xl font-serif font-black mt-2 text-center px-8" style={{ color: '#f4e5c2' }}>
                  {topicTitle.toUpperCase()}
                </h1>

                <div className="w-40 h-0.5 mt-6" style={{
                  background: 'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.6), transparent)'
                }} />

                {/* Subtitle */}
                <p className="mt-6 text-sm font-serif italic" style={{ color: 'rgba(244, 229, 194, 0.6)' }}>
                  A Journey of Discovery
                </p>
              </div>

              {/* Cover back face (inside front cover) */}
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: '#2a2420',
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                }}
              />
            </motion.div>

            {/* Book spine effect on left side */}
            <div
              className="absolute top-0 left-0 bottom-0 w-4 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.3), transparent)',
              }}
            />
          </div>

          {/* Book shadow */}
          <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-8 rounded-[50%]"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              filter: 'blur(12px)',
            }}
            initial={{ opacity: 0.3, scaleX: 0.5 }}
            animate={{ opacity: 0.6, scaleX: 1 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      </div>

      {/* Sacred quote at bottom */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p className="text-white/60 text-base italic font-serif">
          "And the book was opened..."
        </p>
        <p className="text-white/40 text-sm mt-2">— Revelation 20:12</p>
      </motion.div>
    </div>
  )
}

export default BookOpenAnimation
