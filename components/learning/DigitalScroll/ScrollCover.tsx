'use client'

// ============================================
// BOOK COVER
// The threshold, the invitation
// "And the book was opened..." - Revelation 20:12
// ============================================

import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils/cn'
import { ANIMATION_TIMINGS, CORE_TOPIC_ICONS, A11Y_CONFIG } from './scrollConstants'

interface ScrollCoverProps {
  topicSlug: string
  topicTitle: string
  isOpen: boolean
  onOpenComplete?: () => void
  className?: string
}

export function ScrollCover({
  topicSlug,
  topicTitle,
  isOpen,
  onOpenComplete,
  className,
}: ScrollCoverProps) {
  const controls = useAnimation()
  const [coverState, setCoverState] = useState<'closed' | 'opening' | 'closing' | 'open'>('closed')

  const topicIcon = CORE_TOPIC_ICONS[topicSlug] || '📖'

  // ============================================
  // COVER ANIMATION SEQUENCE
  // ============================================

  useEffect(() => {
    if (isOpen && coverState === 'closed') {
      // Begin opening sequence
      setCoverState('opening')

      controls.start({
        rotateY: -180,
        transition: {
          duration: ANIMATION_TIMINGS.opening.duration / 1000,
          ease: [0.4, 0, 0.2, 1],
        },
      }).then(() => {
        setCoverState('open')
        onOpenComplete?.()
      })
    } else if (!isOpen && coverState === 'open') {
      // Close the book
      setCoverState('closing')

      controls.start({
        rotateY: 0,
        transition: {
          duration: ANIMATION_TIMINGS.opening.duration / 1000,
          ease: [0.4, 0, 0.2, 1],
        },
      }).then(() => {
        setCoverState('closed')
      })
    }
  }, [isOpen, coverState, controls, onOpenComplete])

  // ============================================
  // RENDER
  // ============================================

  return (
    <motion.div
      className={cn(
        'absolute inset-0 z-30',
        // 3D origin at left edge (like a real book cover)
        'origin-left',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
      }}
      initial={{ rotateY: 0 }}
      animate={controls}
      aria-label={A11Y_CONFIG.ariaLabels.cover}
    >
      {/* FRONT COVER */}
      <div
        className={cn(
          'absolute inset-0',
          'rounded-r-lg',
          'overflow-hidden',
        )}
        style={{
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Leather-like texture */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg,
                #1a1612 0%,
                #2a2420 30%,
                #1a1612 50%,
                #0f0d0a 100%
              )
            `,
          }}
        />

        {/* Embossed pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Gold border frame */}
        <div
          className="absolute inset-4 border-2 rounded-sm"
          style={{
            borderColor: 'rgba(212, 175, 55, 0.4)',
            boxShadow: 'inset 0 0 20px rgba(212, 175, 55, 0.1)',
          }}
        />

        {/* Decorative corners */}
        <CoverCorner position="top-left" />
        <CoverCorner position="top-right" />
        <CoverCorner position="bottom-left" />
        <CoverCorner position="bottom-right" />

        {/* Title Area */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          {/* Topic Icon */}
          <motion.div
            className="text-6xl sm:text-7xl md:text-8xl mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {topicIcon}
          </motion.div>

          {/* Decorative line */}
          <div
            className="w-32 h-0.5 mb-6"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.6), transparent)',
            }}
          />

          {/* Title */}
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-wide"
            style={{
              color: '#d4af37',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            THE BOOK OF
          </motion.h1>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-wider mt-2"
            style={{
              color: '#f4e5c2',
              textShadow: '0 2px 8px rgba(0,0,0,0.6)',
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {topicTitle.toUpperCase()}
          </motion.h2>

          {/* Decorative line */}
          <div
            className="w-32 h-0.5 mt-6"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.6), transparent)',
            }}
          />

          {/* Subtitle */}
          <motion.p
            className="text-sm sm:text-base mt-8 italic"
            style={{
              color: 'rgba(244, 229, 194, 0.7)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            A Journey of Understanding
          </motion.p>

          {/* Project Exodus mark */}
          <motion.div
            className="absolute bottom-8 text-xs tracking-widest"
            style={{
              color: 'rgba(212, 175, 55, 0.5)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            PROJECT EXODUS
          </motion.div>
        </div>

        {/* Spine edge shadow */}
        <div
          className="absolute inset-y-0 left-0 w-4"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)',
          }}
        />

        {/* Edge highlight */}
        <div
          className="absolute inset-y-0 right-0 w-px"
          style={{
            background: 'rgba(255,255,255,0.1)',
          }}
        />
      </div>

      {/* BACK OF COVER (visible when opened) */}
      <div
        className="absolute inset-0 rounded-r-lg"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: `
            linear-gradient(135deg,
              #2a2420 0%,
              #1a1612 100%
            )
          `,
        }}
      >
        {/* Marble paper pattern */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 30%),
              radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.1) 0%, transparent 30%),
              radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%)
            `,
          }}
        />
      </div>
    </motion.div>
  )
}

// ============================================
// DECORATIVE CORNER ORNAMENT
// ============================================

interface CoverCornerProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

function CoverCorner({ position }: CoverCornerProps) {
  const positionClasses = {
    'top-left': 'top-6 left-6',
    'top-right': 'top-6 right-6 rotate-90',
    'bottom-left': 'bottom-6 left-6 -rotate-90',
    'bottom-right': 'bottom-6 right-6 rotate-180',
  }

  return (
    <div
      className={cn(
        'absolute w-8 h-8',
        positionClasses[position]
      )}
      style={{
        color: 'rgba(212, 175, 55, 0.5)',
      }}
    >
      <svg viewBox="0 0 32 32" fill="currentColor">
        <path d="M0 0 L8 0 L8 2 L2 2 L2 8 L0 8 Z M0 0 L0 8 L2 8 L2 2 L8 2 L8 0 Z" />
        <circle cx="4" cy="4" r="1.5" />
      </svg>
    </div>
  )
}

// ============================================
// INSIDE COVER (Dedication Page)
// ============================================

interface InsideCoverProps {
  topicSlug: string
  topicTitle: string
  chapterCount: number
  verseCount: number
  pageCount: number
  selectedLevel?: string
  onLevelSelect?: (level: string) => void
  onStartReading?: () => void
  className?: string
}

export function InsideCover({
  topicSlug,
  topicTitle,
  chapterCount,
  verseCount,
  pageCount,
  selectedLevel,
  onLevelSelect,
  onStartReading,
  className,
}: InsideCoverProps) {
  const topicIcon = CORE_TOPIC_ICONS[topicSlug] || '📖'

  const levels = [
    { id: 'ELEMENTARY', label: 'Elementary', icon: '🌱' },
    { id: 'MIDDLE_SCHOOL', label: 'Middle', icon: '📚' },
    { id: 'HIGH_SCHOOL', label: 'High School', icon: '🎓' },
    { id: 'UNDERGRADUATE', label: 'College', icon: '🔬' },
    { id: 'GRADUATE', label: 'Graduate', icon: '📊' },
    { id: 'PHD', label: 'Pro', icon: '🧬' },
  ]

  return (
    <div
      className={cn(
        'w-full h-full flex flex-col items-center justify-center px-4 py-4',
        'text-center overflow-hidden',
        className
      )}
      style={{
        color: 'var(--foreground)',
      }}
    >
      {/* Decorative stars */}
      <div className="flex items-center gap-2 mb-3 shrink-0">
        <span className="text-amber-500/60 text-sm">✦</span>
        <span className="text-3xl">{topicIcon}</span>
        <span className="text-amber-500/60 text-sm">✦</span>
      </div>

      {/* Title */}
      <h2
        className="text-xl sm:text-2xl font-serif font-bold tracking-wide mb-1 shrink-0"
        style={{ color: 'var(--primary)' }}
      >
        THE BOOK OF
      </h2>
      <h3
        className="text-lg sm:text-xl font-serif font-bold tracking-wider mb-2 shrink-0"
        style={{ color: 'var(--foreground)' }}
      >
        {topicTitle.toUpperCase()}
      </h3>

      {/* Dedication quote */}
      <p className="text-xs italic text-[var(--muted-foreground)] mb-4 max-w-[200px] shrink-0">
        "A sustainability journey for those who seek"
      </p>

      {/* Divider */}
      <div
        className="w-32 h-px mb-4 shrink-0"
        style={{
          background: 'linear-gradient(to right, transparent, var(--border), transparent)',
        }}
      />

      {/* Level selection */}
      <div className="mb-4 w-full max-w-[280px] shrink-0">
        <h3 className="text-[10px] font-bold text-[var(--muted-foreground)] mb-2 tracking-wider uppercase">
          Select Your Path
        </h3>
        <div className="grid grid-cols-3 gap-1.5">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => onLevelSelect?.(level.id)}
              className={cn(
                'px-2 py-1.5 rounded text-[10px] font-medium transition-all',
                'border',
                selectedLevel === level.id
                  ? 'border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--muted)]'
              )}
            >
              <span className="block text-base mb-0.5">{level.icon}</span>
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div
        className="w-32 h-px mb-3 shrink-0"
        style={{
          background: 'linear-gradient(to right, transparent, var(--border), transparent)',
        }}
      />

      {/* Book stats */}
      <p className="text-[10px] text-[var(--muted-foreground)] mb-4 shrink-0">
        {chapterCount} Chapters • {verseCount} Verses • {pageCount} Pages
      </p>

      {/* Start reading button */}
      <motion.button
        onClick={onStartReading}
        className={cn(
          'px-6 py-2 rounded-lg text-xs font-bold tracking-wider shrink-0',
          'bg-[var(--primary)] text-[var(--primary-foreground)]',
          'hover:opacity-90 transition-opacity',
          'flex items-center gap-2'
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        BEGIN JOURNEY
        <span>→</span>
      </motion.button>
    </div>
  )
}

export default ScrollCover
