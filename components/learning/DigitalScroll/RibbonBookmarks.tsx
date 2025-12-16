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
  SCROLL_DIMENSIONS,
  ANIMATION_TIMINGS,
  A11Y_CONFIG,
  getDeviceType,
  type GuardianRibbon,
} from './scrollConstants'

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
  isExpanded?: boolean
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
  isExpanded = false,
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

  const dimensions = SCROLL_DIMENSIONS[deviceType]
  const isDesktop = deviceType === 'desktop'

  // ============================================
  // RENDER
  // ============================================

  return (
    <div
      className={cn(
        'z-40',
        // Desktop: vertical ribbons - position differently for expanded vs normal
        isDesktop && !isExpanded && 'absolute -top-16 left-8 flex flex-row gap-2',
        // Desktop expanded: fixed position at top-left of screen, inside viewport
        isDesktop && isExpanded && 'fixed top-4 left-4 flex flex-row gap-2 bg-black/30 backdrop-blur-sm rounded-xl p-2',
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
  const Icon = ribbon.icon
  const isDesktop = deviceType === 'desktop'

  // Enhanced dimensions for better visibility
  const ribbonWidth = isDesktop ? 28 : 32
  const ribbonHeight = isDesktop ? 90 : 40

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
        width: ribbonWidth,
        height: ribbonHeight,
        background: ribbon.colors.gradient,
        // Desktop: pointed ribbon shape
        ...(isDesktop && {
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
        }),
        // Active glow - enhanced
        boxShadow: isActive
          ? `0 0 25px ${ribbon.colors.from}, 0 0 50px ${ribbon.colors.from}50, inset 0 0 10px rgba(255,255,255,0.2)`
          : isHovered
          ? `0 6px 20px ${ribbon.colors.from}80, inset 0 0 8px rgba(255,255,255,0.15)`
          : '2px 4px 10px rgba(0,0,0,0.4)',
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={isDesktop ? { y: 12, scale: 1.05 } : { scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      animate={
        isActive
          ? {
              y: isDesktop ? [0, 6, 0] : 0,
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
      {/* Icon - more visible */}
      {isDesktop ? (
        <Icon className="w-4 h-4 text-white drop-shadow-md mb-0.5" strokeWidth={2.5} />
      ) : (
        <Icon className="w-5 h-5 text-white drop-shadow-md" strokeWidth={2.5} />
      )}

      {/* Chapter number (desktop only) - more visible */}
      {isDesktop && (
        <span className="text-[9px] font-bold text-white drop-shadow-sm">
          {ribbon.chapterIndex + 1}
        </span>
      )}

      {/* Completed checkmark */}
      {isCompleted && (
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}

      {/* Enhanced Tooltip with Archetype Logo on hover (desktop only) */}
      <AnimatePresence>
        {isHovered && isDesktop && (
          <motion.div
            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50"
            initial={{ opacity: 0, x: -15, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -15, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {/* Archetype Card with Logo */}
            <div
              className="px-4 py-3 rounded-xl backdrop-blur-md border border-white/20 shadow-2xl min-w-[140px]"
              style={{
                background: `linear-gradient(135deg, ${ribbon.colors.from}dd, ${ribbon.colors.to}dd)`,
              }}
            >
              {/* Large Archetype Icon */}
              <div className="flex items-center justify-center mb-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    boxShadow: `0 0 20px ${ribbon.colors.from}60`,
                  }}
                >
                  <Icon className="w-6 h-6 text-white drop-shadow-lg" strokeWidth={2} />
                </div>
              </div>

              {/* Guardian Name */}
              <div className="text-center">
                <div className="font-black text-white text-sm tracking-wider drop-shadow-md">
                  {ribbon.name}
                </div>
                <div className="text-white/80 text-[10px] font-medium mt-0.5">
                  {ribbon.title}
                </div>
                <div
                  className="text-[9px] font-bold mt-1 px-2 py-0.5 rounded-full inline-block"
                  style={{ background: 'rgba(255,255,255,0.2)' }}
                >
                  {ribbon.value}
                </div>
              </div>
            </div>

            {/* Arrow pointing to ribbon */}
            <div
              className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 rotate-45"
              style={{ background: `${ribbon.colors.from}dd` }}
            />
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
  const dimensions = SCROLL_DIMENSIONS[deviceType]
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
