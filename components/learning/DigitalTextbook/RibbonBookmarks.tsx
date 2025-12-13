'use client'

// ============================================
// RIBBON BOOKMARKS
// The Seven Guardian Ribbons + Yin-Yang Continue
// Each ribbon = one chapter, colors match Guardian Archetypes
// ============================================

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils/cn'
import {
  GUARDIAN_RIBBONS,
  RIBBON_ORDER,
  YIN_YANG_RIBBON,
  BOOK_DIMENSIONS,
  ANIMATION_TIMINGS,
  A11Y_CONFIG,
  getDeviceType,
  type GuardianRibbon,
} from './bookConstants'

// ============================================
// TYPES
// ============================================

interface RibbonBookmarksProps {
  currentChapter: number
  completedChapters: number[]
  onChapterClick: (chapterIndex: number) => void
  onContinueClick: () => void
  continuePosition?: {
    chapter: number
    verse: number
    page: number
  }
  className?: string
}

// ============================================
// MAIN COMPONENT
// ============================================

export function RibbonBookmarks({
  currentChapter,
  completedChapters,
  onChapterClick,
  onContinueClick,
  continuePosition,
  className,
}: RibbonBookmarksProps) {
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [hoveredRibbon, setHoveredRibbon] = useState<string | null>(null)

  useEffect(() => {
    function updateDevice() {
      setDeviceType(getDeviceType())
    }
    updateDevice()
    window.addEventListener('resize', updateDevice)
    return () => window.removeEventListener('resize', updateDevice)
  }, [])

  const dimensions = BOOK_DIMENSIONS[deviceType]
  const isDesktop = deviceType === 'desktop'

  // ============================================
  // RENDER
  // ============================================

  return (
    <div
      className={cn(
        'z-40',
        // Desktop: vertical ribbons extending upward from top of book
        isDesktop && 'absolute -top-16 left-8 flex flex-row gap-2',
        // Tablet: horizontal strip at top
        deviceType === 'tablet' && 'flex flex-row justify-center gap-1 py-2 bg-[var(--muted)]',
        // Mobile: compact horizontal strip
        deviceType === 'mobile' && 'flex flex-row justify-between gap-0.5 px-2 py-1 bg-[var(--muted)]',
        className
      )}
      role="navigation"
      aria-label="Chapter bookmarks"
    >
      {/* Seven Guardian Ribbons */}
      {RIBBON_ORDER.map((ribbonKey, index) => {
        const ribbon = GUARDIAN_RIBBONS[ribbonKey]
        const isActive = currentChapter === index
        const isCompleted = completedChapters.includes(index)

        return (
          <Ribbon
            key={ribbon.id}
            ribbon={ribbon}
            isActive={isActive}
            isCompleted={isCompleted}
            isHovered={hoveredRibbon === ribbon.id}
            deviceType={deviceType}
            onClick={() => onChapterClick(index)}
            onMouseEnter={() => setHoveredRibbon(ribbon.id)}
            onMouseLeave={() => setHoveredRibbon(null)}
          />
        )
      })}

      {/* Yin-Yang Continue Ribbon */}
      <YinYangRibbon
        isActive={false}
        deviceType={deviceType}
        continuePosition={continuePosition}
        onClick={onContinueClick}
        onMouseEnter={() => setHoveredRibbon('continue')}
        onMouseLeave={() => setHoveredRibbon(null)}
        isHovered={hoveredRibbon === 'continue'}
      />
    </div>
  )
}

// ============================================
// SINGLE RIBBON COMPONENT
// ============================================

interface RibbonProps {
  ribbon: GuardianRibbon
  isActive: boolean
  isCompleted: boolean
  isHovered: boolean
  deviceType: 'desktop' | 'tablet' | 'mobile'
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function Ribbon({
  ribbon,
  isActive,
  isCompleted,
  isHovered,
  deviceType,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: RibbonProps) {
  const dimensions = BOOK_DIMENSIONS[deviceType]
  const Icon = ribbon.icon
  const isDesktop = deviceType === 'desktop'

  return (
    <motion.button
      className={cn(
        'relative flex items-center justify-center',
        'transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black',
        // Desktop: vertical ribbon with pointed bottom
        isDesktop && 'flex-col',
        // Tablet/Mobile: square buttons
        !isDesktop && 'rounded-md'
      )}
      style={{
        width: dimensions.ribbonWidth,
        height: dimensions.ribbonHeight,
        background: ribbon.colors.gradient,
        // Desktop: pointed ribbon shape
        ...(isDesktop && {
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
        }),
        // Active glow
        boxShadow: isActive
          ? `0 0 20px ${ribbon.colors.from}, 0 0 40px ${ribbon.colors.from}40`
          : isHovered
          ? `0 4px 12px ${ribbon.colors.from}60`
          : '2px 2px 8px rgba(0,0,0,0.3)',
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={isDesktop ? { y: 10 } : { scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={
        isActive
          ? {
              y: isDesktop ? [0, 5, 0] : 0,
            }
          : {}
      }
      transition={
        isActive
          ? {
              y: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }
          : {}
      }
      aria-label={A11Y_CONFIG.ariaLabels.ribbon(ribbon.name)}
      aria-current={isActive ? 'page' : undefined}
      title={`${ribbon.title} - ${ribbon.value}`}
    >
      {/* Icon */}
      {isDesktop ? (
        <Icon className="w-3 h-3 text-white/90 mb-0.5" strokeWidth={2.5} />
      ) : (
        <Icon className="w-4 h-4 text-white/90" strokeWidth={2.5} />
      )}

      {/* Chapter number (desktop only) */}
      {isDesktop && (
        <span className="text-[8px] font-bold text-white/80">
          {ribbon.chapterIndex + 1}
        </span>
      )}

      {/* Completed checkmark */}
      {isCompleted && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}

      {/* Tooltip on hover (desktop only) */}
      <AnimatePresence>
        {isHovered && isDesktop && (
          <motion.div
            className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-black/90 text-white text-xs whitespace-nowrap z-50"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            <div className="font-bold">{ribbon.name}</div>
            <div className="text-white/70">{ribbon.title}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// ============================================
// YIN-YANG CONTINUE RIBBON
// ============================================

interface YinYangRibbonProps {
  isActive: boolean
  deviceType: 'desktop' | 'tablet' | 'mobile'
  continuePosition?: {
    chapter: number
    verse: number
    page: number
  }
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  isHovered: boolean
}

function YinYangRibbon({
  isActive,
  deviceType,
  continuePosition,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isHovered,
}: YinYangRibbonProps) {
  const dimensions = BOOK_DIMENSIONS[deviceType]
  const isDesktop = deviceType === 'desktop'

  // Animated gradient for yin-yang effect
  const [gradientPhase, setGradientPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPhase((prev) => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.button
      className={cn(
        'relative flex items-center justify-center',
        'transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black',
        // Separator before yin-yang
        isDesktop && 'ml-4',
        !isDesktop && 'ml-2 rounded-md'
      )}
      style={{
        width: dimensions.ribbonWidth,
        height: dimensions.ribbonHeight,
        // Animated gradient
        background: `linear-gradient(${gradientPhase}deg, #000000, #ffffff, #000000)`,
        // Desktop: pointed ribbon shape
        ...(isDesktop && {
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
        }),
        boxShadow: isHovered
          ? '0 0 15px rgba(255,255,255,0.3), 0 0 30px rgba(0,0,0,0.3)'
          : '2px 2px 8px rgba(0,0,0,0.3)',
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={isDesktop ? { y: 10 } : { scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        // Gentle pulse
        scale: [1, 1.02, 1],
      }}
      transition={{
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      aria-label={A11Y_CONFIG.ariaLabels.continueRibbon}
      title={
        continuePosition
          ? `Continue: Chapter ${continuePosition.chapter + 1}, Verse ${continuePosition.verse + 1}, Page ${continuePosition.page + 1}`
          : 'Continue Reading'
      }
    >
      {/* Yin-Yang Symbol */}
      <div className="relative w-4 h-4">
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <circle cx="12" cy="12" r="11" fill="#000" />
          <path
            d="M12 1 A11 11 0 0 1 12 23 A5.5 5.5 0 0 1 12 12 A5.5 5.5 0 0 0 12 1"
            fill="#fff"
          />
          <circle cx="12" cy="6.5" r="2" fill="#000" />
          <circle cx="12" cy="17.5" r="2" fill="#fff" />
        </svg>
      </div>

      {/* Tooltip on hover (desktop only) */}
      <AnimatePresence>
        {isHovered && isDesktop && (
          <motion.div
            className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-black/90 text-white text-xs whitespace-nowrap z-50"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            <div className="font-bold">CONTINUE</div>
            {continuePosition && (
              <div className="text-white/70">
                Ch.{continuePosition.chapter + 1} • V.{continuePosition.verse + 1} • P.{continuePosition.page + 1}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default RibbonBookmarks
