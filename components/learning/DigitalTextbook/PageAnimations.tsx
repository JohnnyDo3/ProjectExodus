'use client'

// ============================================
// PAGE CONTENT ANIMATIONS
// Sacred scroll-reveal effects and visual flourishes
// For the Digital Textbook learning experience
// ============================================

import { motion, useInView, Variants } from 'framer-motion'
import { useRef, ReactNode, Children, isValidElement, cloneElement } from 'react'
import { cn } from '@/lib/utils/cn'

// ============================================
// ANIMATED PARAGRAPH
// Reveals text with a sacred scroll effect
// ============================================

interface AnimatedParagraphProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function AnimatedParagraph({ children, delay = 0, className }: AnimatedParagraphProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.p
      ref={ref}
      className={cn('relative', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.p>
  )
}

// ============================================
// STAGGERED CONTENT REVEAL
// Wraps content and animates children with stagger
// ============================================

interface StaggeredContentProps {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

export function StaggeredContent({ children, staggerDelay = 0.1, className }: StaggeredContentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return (
            <motion.div variants={itemVariants}>
              {child}
            </motion.div>
          )
        }
        return child
      })}
    </motion.div>
  )
}

// ============================================
// SACRED TITLE REVEAL
// Animated title with decorative flourishes
// ============================================

interface SacredTitleProps {
  children: ReactNode
  subtitle?: string
  color?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function SacredTitle({ children, subtitle, color, size = 'lg', className }: SacredTitleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  const sizeClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  }

  return (
    <div ref={ref} className={cn('relative text-center', className)}>
      {/* Top flourish */}
      <motion.svg
        className="w-32 h-6 mx-auto mb-3"
        viewBox="0 0 128 24"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <path
          d="M4 12 L40 12 M88 12 L124 12"
          stroke={color || 'var(--primary)'}
          strokeWidth="1"
          strokeLinecap="round"
          opacity={0.4}
        />
        <circle cx="64" cy="12" r="3" fill={color || 'var(--primary)'} opacity={0.6} />
        <circle cx="48" cy="12" r="1.5" fill={color || 'var(--primary)'} opacity={0.4} />
        <circle cx="80" cy="12" r="1.5" fill={color || 'var(--primary)'} opacity={0.4} />
        {/* Decorative curves */}
        <path
          d="M54 8 Q64 4 74 8 M54 16 Q64 20 74 16"
          stroke={color || 'var(--primary)'}
          strokeWidth="0.5"
          fill="none"
          opacity={0.3}
        />
      </motion.svg>

      {/* Title */}
      <motion.h2
        className={cn(
          'font-serif font-bold',
          sizeClasses[size]
        )}
        style={{ color: color || 'var(--foreground)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className="text-sm text-[var(--muted-foreground)] mt-2 italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Bottom flourish */}
      <motion.svg
        className="w-24 h-4 mx-auto mt-3"
        viewBox="0 0 96 16"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <path
          d="M8 8 L88 8"
          stroke={color || 'var(--primary)'}
          strokeWidth="1"
          strokeLinecap="round"
          opacity={0.3}
        />
        <path
          d="M24 8 L48 8 L72 8"
          stroke={color || 'var(--primary)'}
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.5}
        />
      </motion.svg>
    </div>
  )
}

// ============================================
// MARGIN ORNAMENT
// Decorative element for page margins
// ============================================

interface MarginOrnamentProps {
  type?: 'leaf' | 'vine' | 'scroll' | 'star' | 'diamond'
  position?: 'left' | 'right'
  color?: string
  className?: string
}

export function MarginOrnament({ type = 'leaf', position = 'left', color, className }: MarginOrnamentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const ornaments = {
    leaf: (
      <path
        d="M12 2 C8 6 4 10 4 16 C4 22 8 24 12 24 C16 24 20 22 20 16 C20 10 16 6 12 2 M12 8 L12 20"
        fill="none"
        stroke={color || 'var(--primary)'}
        strokeWidth="1"
        opacity={0.4}
      />
    ),
    vine: (
      <>
        <path
          d="M12 0 C12 8 6 12 12 20 C18 12 12 8 12 0"
          fill="none"
          stroke={color || 'var(--primary)'}
          strokeWidth="1"
          opacity={0.4}
        />
        <circle cx="8" cy="8" r="2" fill={color || 'var(--primary)'} opacity={0.3} />
        <circle cx="16" cy="14" r="2" fill={color || 'var(--primary)'} opacity={0.3} />
      </>
    ),
    scroll: (
      <path
        d="M4 4 C4 4 8 8 12 8 C16 8 20 4 20 4 M4 12 C4 12 8 16 12 16 C16 16 20 12 20 12 M4 20 C4 20 8 24 12 24 C16 24 20 20 20 20"
        fill="none"
        stroke={color || 'var(--primary)'}
        strokeWidth="1"
        opacity={0.4}
      />
    ),
    star: (
      <>
        <polygon
          points="12,2 14,10 22,10 16,14 18,22 12,18 6,22 8,14 2,10 10,10"
          fill="none"
          stroke={color || 'var(--primary)'}
          strokeWidth="1"
          opacity={0.4}
        />
        <circle cx="12" cy="12" r="2" fill={color || 'var(--primary)'} opacity={0.3} />
      </>
    ),
    diamond: (
      <>
        <polygon
          points="12,2 22,12 12,22 2,12"
          fill="none"
          stroke={color || 'var(--primary)'}
          strokeWidth="1"
          opacity={0.4}
        />
        <polygon
          points="12,6 18,12 12,18 6,12"
          fill="none"
          stroke={color || 'var(--primary)'}
          strokeWidth="0.5"
          opacity={0.3}
        />
      </>
    ),
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        'absolute top-1/2 -translate-y-1/2',
        position === 'left' ? 'left-1' : 'right-1',
        className
      )}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        style={{ transform: position === 'right' ? 'scaleX(-1)' : undefined }}
      >
        {ornaments[type]}
      </svg>
    </motion.div>
  )
}

// ============================================
// GLOWING EMPHASIS
// Text with subtle glow animation
// ============================================

interface GlowingEmphasisProps {
  children: ReactNode
  color?: string
  className?: string
}

export function GlowingEmphasis({ children, color, className }: GlowingEmphasisProps) {
  return (
    <motion.span
      className={cn('relative inline-block font-semibold', className)}
      style={{ color: color || 'var(--primary)' }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.span
        className="absolute inset-0 blur-sm opacity-30"
        style={{ color: color || 'var(--primary)' }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {children}
      </motion.span>
      <span className="relative">{children}</span>
    </motion.span>
  )
}

// ============================================
// ANIMATED LIST
// Staggered list item reveal
// ============================================

interface AnimatedListProps {
  items: ReactNode[]
  ordered?: boolean
  color?: string
  className?: string
}

export function AnimatedList({ items, ordered = false, color, className }: AnimatedListProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  const ListTag = ordered ? motion.ol : motion.ul

  return (
    <div ref={ref}>
      <ListTag
        className={cn('space-y-3', ordered ? 'list-decimal list-inside' : 'list-none', className)}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 },
          },
        }}
      >
        {items.map((item, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {!ordered && (
              <span
                className="w-2 h-2 rounded-full mt-2 shrink-0"
                style={{ background: color || 'var(--primary)' }}
              />
            )}
            <span className="flex-1">{item}</span>
          </motion.li>
        ))}
      </ListTag>
    </div>
  )
}

// ============================================
// VERSE NUMBER BADGE
// Decorative verse indicator
// ============================================

interface VerseNumberBadgeProps {
  number: number
  color?: string
  className?: string
}

export function VerseNumberBadge({ number, color, className }: VerseNumberBadgeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className={cn('inline-flex items-center gap-2', className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, type: 'spring' }}
    >
      <svg className="w-16 h-8" viewBox="0 0 64 32">
        {/* Left wing */}
        <motion.path
          d="M4 16 C8 12 12 12 16 16 C12 20 8 20 4 16"
          fill="none"
          stroke={color || 'var(--primary)'}
          strokeWidth="1"
          opacity={0.4}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        {/* Right wing */}
        <motion.path
          d="M60 16 C56 12 52 12 48 16 C52 20 56 20 60 16"
          fill="none"
          stroke={color || 'var(--primary)'}
          strokeWidth="1"
          opacity={0.4}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        {/* Center circle */}
        <circle
          cx="32"
          cy="16"
          r="10"
          fill={`${color || 'var(--primary)'}15`}
          stroke={color || 'var(--primary)'}
          strokeWidth="1"
          opacity={0.6}
        />
        {/* Number */}
        <text
          x="32"
          y="16"
          textAnchor="middle"
          dominantBaseline="central"
          fill={color || 'var(--primary)'}
          fontSize="10"
          fontWeight="bold"
          fontFamily="serif"
        >
          {number}
        </text>
      </svg>
    </motion.div>
  )
}

// ============================================
// PAGE CORNER FLOURISH
// Decorative corner element
// ============================================

interface PageCornerFlourishProps {
  corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  color?: string
  className?: string
}

export function PageCornerFlourish({ corner, color, className }: PageCornerFlourishProps) {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true })

  const rotations = {
    'top-left': 0,
    'top-right': 90,
    'bottom-right': 180,
    'bottom-left': 270,
  }

  const positions = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
    'bottom-right': 'bottom-2 right-2',
    'bottom-left': 'bottom-2 left-2',
  }

  return (
    <motion.svg
      ref={ref}
      className={cn('absolute w-10 h-10', positions[corner], className)}
      viewBox="0 0 40 40"
      style={{ transform: `rotate(${rotations[corner]}deg)` }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Corner bracket */}
      <motion.path
        d="M4 20 L4 4 L20 4"
        fill="none"
        stroke={color || 'var(--primary)'}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.4}
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
      {/* Decorative curl */}
      <motion.path
        d="M4 4 Q12 12 8 20 Q4 16 8 12"
        fill="none"
        stroke={color || 'var(--primary)'}
        strokeWidth="0.75"
        opacity={0.3}
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
      {/* Corner dot */}
      <circle cx="6" cy="6" r="2" fill={color || 'var(--primary)'} opacity={0.5} />
    </motion.svg>
  )
}

// ============================================
// ANIMATED SECTION DIVIDER
// Enhanced divider with animation
// ============================================

interface AnimatedDividerProps {
  variant?: 'simple' | 'ornate' | 'wave' | 'dots'
  color?: string
  className?: string
}

export function AnimatedDivider({ variant = 'simple', color, className }: AnimatedDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const renderDivider = () => {
    switch (variant) {
      case 'ornate':
        return (
          <svg className="w-full h-6" viewBox="0 0 200 24" preserveAspectRatio="xMidYMid meet">
            <motion.path
              d="M0 12 L60 12"
              stroke={color || 'var(--border)'}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.4 }}
            />
            <motion.circle
              cx="70" cy="12" r="3"
              fill={color || 'var(--primary)'}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
            <motion.path
              d="M80 6 Q100 2 120 6 Q100 10 80 6 M80 18 Q100 22 120 18 Q100 14 80 18"
              fill="none"
              stroke={color || 'var(--primary)'}
              strokeWidth="1"
              opacity={0.5}
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            <motion.circle
              cx="130" cy="12" r="3"
              fill={color || 'var(--primary)'}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.4 }}
            />
            <motion.path
              d="M140 12 L200 12"
              stroke={color || 'var(--border)'}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 }}
            />
          </svg>
        )
      case 'wave':
        return (
          <svg className="w-full h-6" viewBox="0 0 200 24" preserveAspectRatio="xMidYMid meet">
            <motion.path
              d="M0 12 Q25 6 50 12 Q75 18 100 12 Q125 6 150 12 Q175 18 200 12"
              fill="none"
              stroke={color || 'var(--border)'}
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
              transition={{ duration: 0.8 }}
            />
          </svg>
        )
      case 'dots':
        return (
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: color || 'var(--primary)' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 0.4 } : {}}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              />
            ))}
          </div>
        )
      default:
        return (
          <motion.div
            className="h-px w-full"
            style={{ background: `linear-gradient(to right, transparent, ${color || 'var(--border)'}, transparent)` }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6 }}
          />
        )
    }
  }

  return (
    <div ref={ref} className={cn('my-6', className)}>
      {renderDivider()}
    </div>
  )
}

// ============================================
// CONTENT FADE WRAPPER
// Adds fade-in effect to any content
// ============================================

interface ContentFadeProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  className?: string
}

export function ContentFade({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className,
}: ContentFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  const directionOffset = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { y: 0, x: 20 },
    right: { y: 0, x: -20 },
    none: { y: 0, x: 0 },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x: directionOffset[direction].x,
        y: directionOffset[direction].y,
      }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Export all
export {
  type AnimatedParagraphProps,
  type StaggeredContentProps,
  type SacredTitleProps,
  type MarginOrnamentProps,
  type GlowingEmphasisProps,
  type AnimatedListProps,
  type VerseNumberBadgeProps,
  type PageCornerFlourishProps,
  type AnimatedDividerProps,
  type ContentFadeProps,
}
