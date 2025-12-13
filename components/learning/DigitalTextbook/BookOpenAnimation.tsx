'use client'

// ============================================
// BOOK OPEN ANIMATION
// "And the book was opened..." - Revelation 20:12
// The Revelation Sequence: Descent → Pause → Opening → Seeking
// ============================================

import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils/cn'
import { ANIMATION_TIMINGS, CORE_TOPIC_ICONS } from './bookConstants'

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

type AnimationPhase = 'waiting' | 'descent' | 'landing' | 'pause' | 'opening' | 'seeking' | 'complete'

// ============================================
// DUST PARTICLES
// Subtle dust effect on book landing
// ============================================

function DustParticles({ isActive }: { isActive: boolean }) {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 200,
    y: Math.random() * -50,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 0.3,
    duration: Math.random() * 0.5 + 0.5,
  }))

  return (
    <AnimatePresence>
      {isActive && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-[var(--muted-foreground)]"
              style={{
                width: particle.size,
                height: particle.size,
                left: '50%',
                bottom: 0,
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 0.6,
                scale: 0,
              }}
              animate={{
                x: particle.x,
                y: particle.y,
                opacity: 0,
                scale: 1,
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: 'easeOut',
              }}
              exit={{ opacity: 0 }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

// ============================================
// MAIN ANIMATION COMPONENT
// ============================================

export function BookOpenAnimation({
  topicSlug,
  topicTitle,
  targetPage,
  onAnimationComplete,
  reducedMotion = false,
  className,
}: BookOpenAnimationProps) {
  const [phase, setPhase] = useState<AnimationPhase>('waiting')
  const [showDust, setShowDust] = useState(false)
  const [flippingPage, setFlippingPage] = useState(0)
  const bookControls = useAnimation()
  const coverControls = useAnimation()
  const animationCompleteRef = useRef(false)
  const hasStartedRef = useRef(false)

  const topicIcon = CORE_TOPIC_ICONS[topicSlug] || '📖'

  // ============================================
  // REDUCED MOTION - Skip animations
  // ============================================

  useEffect(() => {
    if (reducedMotion) {
      setPhase('complete')
      onAnimationComplete()
    }
  }, [reducedMotion, onAnimationComplete])

  // ============================================
  // ANIMATION SEQUENCE
  // ============================================

  const runAnimation = useCallback(async () => {
    // Prevent double-running
    if (hasStartedRef.current || animationCompleteRef.current) return
    hasStartedRef.current = true

    try {
      // Act I: The Descent
      setPhase('descent')
      await bookControls.start({
        y: 0,
        rotateX: 0,
        scale: 1,
        transition: {
          duration: ANIMATION_TIMINGS.descent.duration / 1000,
          ease: [0.25, 0.46, 0.45, 0.94], // Gravity-like easing
        },
      })

      if (animationCompleteRef.current) return

      // Landing bounce
      setPhase('landing')
      setShowDust(true)
      await bookControls.start({
        y: [0, -15, 0, -5, 0],
        transition: {
          duration: 0.4,
          times: [0, 0.3, 0.5, 0.8, 1],
          ease: 'easeOut',
        },
      })
      setTimeout(() => setShowDust(false), 500)

      if (animationCompleteRef.current) return

      // Act II: The Pause
      setPhase('pause')
      await new Promise((resolve) =>
        setTimeout(resolve, ANIMATION_TIMINGS.pause.duration)
      )

      if (animationCompleteRef.current) return

      // Act III: The Opening
      setPhase('opening')
      await coverControls.start({
        rotateY: -180,
        transition: {
          duration: ANIMATION_TIMINGS.opening.duration / 1000,
          ease: [0.4, 0, 0.2, 1],
        },
      })

      if (animationCompleteRef.current) return

      // Act IV: The Seeking (flip to target page)
      if (targetPage > 1) {
        setPhase('seeking')
        const pagesToFlip = Math.floor((targetPage - 1) / 2)

        for (let i = 0; i < pagesToFlip; i++) {
          if (animationCompleteRef.current) return
          setFlippingPage(i + 1)
          // Accelerating flip speed
          const progress = i / pagesToFlip
          const flipTime = Math.max(
            ANIMATION_TIMINGS.seeking.minFlipTime,
            ANIMATION_TIMINGS.seeking.basePageFlip *
              Math.pow(ANIMATION_TIMINGS.seeking.acceleration, progress * 5)
          )
          await new Promise((resolve) => setTimeout(resolve, flipTime))
        }
      }

      // Complete - only call once
      if (!animationCompleteRef.current) {
        animationCompleteRef.current = true
        setPhase('complete')
        onAnimationComplete()
      }
    } catch (error) {
      // If animation fails, complete anyway
      console.error('Book animation error:', error)
      if (!animationCompleteRef.current) {
        animationCompleteRef.current = true
        setPhase('complete')
        onAnimationComplete()
      }
    }
  }, [bookControls, coverControls, targetPage, onAnimationComplete])

  // Start animation on mount
  useEffect(() => {
    if (!reducedMotion && !hasStartedRef.current) {
      // Small delay before starting
      const animationTimer = setTimeout(runAnimation, 100)

      // Failsafe: If animation doesn't complete within 3 seconds, force completion
      const failsafeTimer = setTimeout(() => {
        if (!animationCompleteRef.current) {
          console.warn('Book animation failsafe triggered')
          animationCompleteRef.current = true
          setPhase('complete')
          onAnimationComplete()
        }
      }, 3000)

      return () => {
        clearTimeout(animationTimer)
        clearTimeout(failsafeTimer)
      }
    }
  }, [runAnimation, reducedMotion, onAnimationComplete])

  // ============================================
  // RENDER
  // ============================================

  if (reducedMotion) {
    return null // Instantly show the book without animation
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center',
        'bg-black/80 backdrop-blur-md',
        className
      )}
    >
      {/* Ambient light effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 70%, rgba(0,0,0,0.3) 0%, transparent 50%)
          `,
        }}
      />

      {/* Phase text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {phase === 'descent' && 'The book descends...'}
          {phase === 'landing' && 'It arrives.'}
          {phase === 'pause' && 'Awaiting the seeker...'}
          {phase === 'opening' && 'The revelation begins...'}
          {phase === 'seeking' && `Turning to your path... (${flippingPage})`}
        </motion.div>
      </AnimatePresence>

      {/* The Book */}
      <motion.div
        className="relative"
        style={{
          width: '60vw',
          maxWidth: '800px',
          height: '50vh',
          maxHeight: '600px',
          perspective: '2000px',
        }}
        initial={{
          y: '-100vh',
          rotateX: 15,
          scale: 0.8,
        }}
        animate={bookControls}
      >
        {/* Book body */}
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Back cover (visible) */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              background: `
                linear-gradient(135deg,
                  #1a1612 0%,
                  #2a2420 30%,
                  #1a1612 50%,
                  #0f0d0a 100%
                )
              `,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              transform: 'translateZ(-20px)',
            }}
          />

          {/* Pages stack */}
          <div
            className="absolute inset-2 rounded-r-lg"
            style={{
              background: 'linear-gradient(to right, #e8e0d4, #f5f0e8)',
              transform: 'translateZ(-10px)',
            }}
          />

          {/* Front cover (animates open) */}
          <motion.div
            className="absolute inset-0 rounded-lg origin-left"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
            initial={{ rotateY: 0 }}
            animate={coverControls}
          >
            {/* Cover front */}
            <div
              className="absolute inset-0 rounded-lg overflow-hidden"
              style={{
                background: `
                  linear-gradient(135deg,
                    #1a1612 0%,
                    #2a2420 30%,
                    #1a1612 50%,
                    #0f0d0a 100%
                  )
                `,
                backfaceVisibility: 'hidden',
              }}
            >
              {/* Gold border */}
              <div
                className="absolute inset-4 border-2 rounded-sm"
                style={{
                  borderColor: 'rgba(212, 175, 55, 0.4)',
                }}
              />

              {/* Title */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <span className="text-5xl mb-4">{topicIcon}</span>
                <div
                  className="w-24 h-0.5 mb-4"
                  style={{
                    background: 'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.6), transparent)',
                  }}
                />
                <h2
                  className="text-xl font-serif tracking-wide"
                  style={{ color: '#d4af37' }}
                >
                  THE BOOK OF
                </h2>
                <h1
                  className="text-3xl font-serif font-black mt-1"
                  style={{ color: '#f4e5c2' }}
                >
                  {topicTitle.toUpperCase()}
                </h1>
              </div>
            </div>

            {/* Cover back (inside) */}
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                background: '#2a2420',
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
              }}
            />
          </motion.div>

          {/* Seeking animation overlay */}
          <AnimatePresence>
            {phase === 'seeking' && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="text-4xl"
                  animate={{
                    rotateY: [0, -30, 0],
                    x: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 0.15,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  📄
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dust particles on landing */}
        <DustParticles isActive={showDust} />

        {/* Book shadow */}
        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-[50%]"
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            filter: 'blur(8px)',
          }}
          animate={{
            scaleX: phase === 'descent' ? 0.5 : 1,
            opacity: phase === 'descent' ? 0.3 : 0.6,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Sacred quote at bottom */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase !== 'descent' ? 0.6 : 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-white/50 text-sm italic font-serif">
          "And the book was opened..."
        </p>
        <p className="text-white/30 text-xs mt-1">— Revelation 20:12</p>
      </motion.div>
    </div>
  )
}

export default BookOpenAnimation
