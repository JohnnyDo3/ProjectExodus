'use client'

// ============================================
// BOOK CONTAINER
// The 3D perspective vessel that holds the sacred book
// ============================================

import { useRef, useEffect, useState, forwardRef, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { BOOK_DIMENSIONS, PERSPECTIVE_CONFIG, A11Y_CONFIG, getDeviceType } from './bookConstants'

interface BookContainerProps {
  children: ReactNode
  isOpen: boolean
  className?: string
  onKeyDown?: (e: React.KeyboardEvent) => void
}

export const BookContainer = forwardRef<HTMLDivElement, BookContainerProps>(
  function BookContainer({ children, isOpen, className, onKeyDown }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [dimensions, setDimensions] = useState(BOOK_DIMENSIONS.desktop)
    const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

    // ============================================
    // RESPONSIVE DIMENSIONS
    // ============================================

    useEffect(() => {
      function updateDimensions() {
        const type = getDeviceType()
        setDeviceType(type)
        setDimensions(BOOK_DIMENSIONS[type])
      }

      updateDimensions()
      window.addEventListener('resize', updateDimensions)
      return () => window.removeEventListener('resize', updateDimensions)
    }, [])

    // ============================================
    // FOCUS MANAGEMENT
    // ============================================

    useEffect(() => {
      if (isOpen && containerRef.current) {
        containerRef.current.focus()
      }
    }, [isOpen])

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================

    const handleKeyDown = (e: React.KeyboardEvent) => {
      // Delegate to parent handler
      onKeyDown?.(e)
    }

    // ============================================
    // RENDER
    // ============================================

    return (
      <motion.div
        ref={ref || containerRef}
        className={cn(
          // Full viewport overlay
          'fixed inset-0 z-50',
          'flex items-center justify-center',
          // Background overlay
          'bg-black/70 backdrop-blur-sm',
          className
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        role="dialog"
        aria-modal="true"
        aria-label={A11Y_CONFIG.ariaLabels.book}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* 3D Perspective Container */}
        <div
          className="relative"
          style={{
            perspective: PERSPECTIVE_CONFIG.container,
            perspectiveOrigin: 'center center',
            width: dimensions.width,
            maxWidth: dimensions.maxWidth,
            height: dimensions.height,
            maxHeight: dimensions.maxHeight,
          }}
        >
          {/* Book Body - 3D Transform Preserve */}
          <motion.div
            className={cn(
              'relative w-full h-full',
              // Book shadow for depth
              'drop-shadow-2xl'
            )}
            style={{
              transformStyle: 'preserve-3d',
            }}
            initial={{
              y: -200,
              rotateX: 15,
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              y: 0,
              rotateX: 0,
              opacity: 1,
              scale: 1
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 25,
              mass: 1.2,
            }}
          >
            {/* The Book Structure */}
            <div
              className={cn(
                'relative w-full h-full',
                // Two-page spread on desktop
                deviceType === 'desktop' && 'flex flex-row',
                // Single page on tablet/mobile
                deviceType !== 'desktop' && 'flex flex-col'
              )}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {children}
            </div>
          </motion.div>
        </div>

        {/* Close hint - positioned at top */}
        <motion.div
          className="absolute top-6 right-6 text-white/60 text-sm font-medium flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <kbd className="px-2 py-1 bg-white/10 rounded text-xs">ESC</kbd>
          <span>to close</span>
        </motion.div>
      </motion.div>
    )
  }
)

// ============================================
// BOOK WRAPPER - Contains Left/Right Pages
// ============================================

interface BookWrapperProps {
  children: ReactNode
  className?: string
}

export function BookWrapper({ children, className }: BookWrapperProps) {
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  useEffect(() => {
    function updateDevice() {
      setDeviceType(getDeviceType())
    }
    updateDevice()
    window.addEventListener('resize', updateDevice)
    return () => window.removeEventListener('resize', updateDevice)
  }, [])

  return (
    <div
      className={cn(
        'relative w-full h-full',
        // Book styling
        'rounded-lg overflow-hidden',
        // Two-page spread on desktop
        deviceType === 'desktop' && 'flex flex-row',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        // Paper-like background
        background: 'var(--book-paper, var(--card))',
        // Book shadow
        boxShadow: `
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 10px 15px -3px rgba(0, 0, 0, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
      }}
    >
      {children}
    </div>
  )
}

// ============================================
// LEFT PAGE (Verso)
// ============================================

interface PageContainerProps {
  children: ReactNode
  side: 'left' | 'right'
  className?: string
}

export function PageContainer({ children, side, className }: PageContainerProps) {
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  useEffect(() => {
    function updateDevice() {
      setDeviceType(getDeviceType())
    }
    updateDevice()
    window.addEventListener('resize', updateDevice)
    return () => window.removeEventListener('resize', updateDevice)
  }, [])

  const isDesktop = deviceType === 'desktop'

  return (
    <div
      className={cn(
        'relative',
        // IMPORTANT: PageFlip already positions this in a w-1/2 container
        // so we need w-full h-full here to fill that container
        'w-full h-full',
        // Asymmetric padding for book layout:
        // - More padding on OUTER edge (far from centerfold)
        // - Less padding on INNER edge (close to centerfold)
        side === 'left' && isDesktop && 'pl-4 pr-3 py-3',
        side === 'right' && isDesktop && 'pl-3 pr-4 py-3',
        !isDesktop && 'p-3',
        // Page styling
        'bg-[var(--book-paper,var(--card))]',
        // Side-specific styling
        side === 'left' && isDesktop && [
          // Left page has shadow on right edge
          'border-r border-[var(--border)]',
        ],
        side === 'right' && isDesktop && [
          // Right page styling
        ],
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
      }}
      role="region"
      aria-label={side === 'left'
        ? A11Y_CONFIG.ariaLabels.leftPage
        : A11Y_CONFIG.ariaLabels.rightPage}
    >
      {/* Page content - fills entire page height, centered content */}
      <div className="relative w-full h-full flex flex-col">
        {children}
      </div>

      {/* Page curl shadow effect for left page */}
      {side === 'left' && isDesktop && (
        <div
          className="absolute inset-y-0 right-0 w-6 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.04))',
          }}
        />
      )}

      {/* Page fold shadow for right page */}
      {side === 'right' && isDesktop && (
        <div
          className="absolute inset-y-0 left-0 w-3 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.06))',
          }}
        />
      )}
    </div>
  )
}

// ============================================
// BOOK SPINE
// ============================================

interface BookSpineProps {
  className?: string
}

export function BookSpine({ className }: BookSpineProps) {
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  useEffect(() => {
    function updateDevice() {
      setDeviceType(getDeviceType())
    }
    updateDevice()
    window.addEventListener('resize', updateDevice)
    return () => window.removeEventListener('resize', updateDevice)
  }, [])

  // No spine on tablet/mobile
  if (deviceType !== 'desktop') return null

  return (
    <div
      className={cn(
        'absolute top-0 left-1/2 -translate-x-1/2 h-full z-10',
        'pointer-events-none',
        className
      )}
      style={{
        width: BOOK_DIMENSIONS.desktop.spineWidth,
      }}
      aria-label={A11Y_CONFIG.ariaLabels.spine}
    >
      {/* Spine gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right,
            rgba(0,0,0,0.12) 0%,
            rgba(0,0,0,0.05) 20%,
            transparent 50%,
            rgba(0,0,0,0.05) 80%,
            rgba(0,0,0,0.12) 100%
          )`,
        }}
      />

      {/* Center line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.25), rgba(0,0,0,0.15))',
        }}
      />

      {/* Binding stitches effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1 h-2 bg-[rgba(0,0,0,0.1)] rounded-full" />
      <div className="absolute top-2/4 left-1/2 -translate-x-1/2 w-1 h-2 bg-[rgba(0,0,0,0.1)] rounded-full" />
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-1 h-2 bg-[rgba(0,0,0,0.1)] rounded-full" />
    </div>
  )
}

// ============================================
// PAGE EDGES (Stack effect on right side)
// ============================================

interface PageEdgesProps {
  pageCount?: number
  className?: string
}

export function PageEdges({ pageCount = 50, className }: PageEdgesProps) {
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  useEffect(() => {
    function updateDevice() {
      setDeviceType(getDeviceType())
    }
    updateDevice()
    window.addEventListener('resize', updateDevice)
    return () => window.removeEventListener('resize', updateDevice)
  }, [])

  // Simplified for mobile
  if (deviceType === 'mobile') return null

  // Generate page edge lines (max 8 visible lines)
  const edgeCount = Math.min(8, Math.floor(pageCount / 10))

  return (
    <div
      className={cn(
        'absolute top-2 right-0 bottom-2 w-3 pointer-events-none',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        transform: 'translateZ(-1px)',
      }}
    >
      {Array.from({ length: edgeCount }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0"
          style={{
            right: `${i * 2}px`,
            width: '1px',
            background: `linear-gradient(to bottom,
              transparent 0%,
              var(--book-page-edge, var(--border)) 5%,
              var(--book-page-edge, var(--border)) 95%,
              transparent 100%
            )`,
            opacity: 1 - i * 0.1,
          }}
        />
      ))}
    </div>
  )
}

export default BookContainer
