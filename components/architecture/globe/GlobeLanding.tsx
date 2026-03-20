'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import GlobeTimeline from './GlobeTimeline'
import { useTimeTheme } from '@/components/providers/TimeThemeProvider'
import {
  formatYear,
  getCurrentPeriodForYear,
} from '@/data/architecture/globeConnections'

// Dynamic imports
const ArchitectureGlobe = dynamic(() => import('./ArchitectureGlobe'), {
  ssr: false,
  loading: () => <GlobeLoadingSkeleton />,
})

const MobileGlobeFallback = dynamic(() => import('./MobileGlobeFallback'), {
  ssr: false,
})

// =============================================================================
// CONSTANTS
// =============================================================================

const PRESENT_YEAR = 2025
const MIN_LOADING_MS = 2000 // minimum 2 seconds of loading screen

// =============================================================================
// LOADING SKELETON (shown while JS bundle loads)
// =============================================================================

function GlobeLoadingSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div
          className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-amber-500/30 animate-pulse"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(212,165,74,0.05) 0%, transparent 70%)',
          }}
        >
          <div className="absolute inset-0 rounded-full border border-amber-500/15" style={{ margin: '20%' }} />
          <div className="absolute inset-0 rounded-full border border-amber-500/15" style={{ margin: '40%' }} />
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full">
            <div className="w-full h-full rounded-full border border-amber-500/15" style={{ transform: 'scaleX(0.3)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// LOADING OVERLAY (branded 2-second loading screen)
// =============================================================================

function LoadingOverlay({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.6s ease-out',
      }}
    >
      {/* Title */}
      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4"
        style={{ color: 'rgba(212, 165, 74, 0.9)' }}
      >
        Architecture
      </h1>

      {/* Subtle pulsing line */}
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent animate-pulse" />

      {/* Subtext */}
      <p
        className="mt-4 text-sm font-medium tracking-[0.15em] uppercase animate-pulse"
        style={{ color: 'rgba(255, 255, 255, 0.4)' }}
      >
        Loading globe
      </p>
    </div>
  )
}

// =============================================================================
// MOBILE DETECTION HOOK
// =============================================================================

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  if (typeof window !== 'undefined' && !isMobile) {
    const check = () => {
      const narrow = window.innerWidth < 768
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      let weakGPU = false
      try {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
        if (!gl) {
          weakGPU = true
        } else {
          const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info')
          if (debugInfo) {
            const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
            if (/swiftshader|llvmpipe|software/i.test(renderer)) {
              weakGPU = true
            }
          }
        }
      } catch {
        weakGPU = true
      }
      if ((narrow && touch) || weakGPU) {
        setIsMobile(true)
      }
    }
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(check)
    }
  }

  return isMobile
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function GlobeLanding() {
  const [timelineYear, setTimelineYear] = useState(PRESENT_YEAR)
  const [isLoading, setIsLoading] = useState(true)
  const mountTimeRef = useRef(Date.now())
  const globeReadyRef = useRef(false)

  // Theme
  const { isDay } = useTimeTheme()
  const isMobile = useIsMobile()

  // Derived
  const currentPeriod = useMemo(() => getCurrentPeriodForYear(timelineYear), [timelineYear])

  // Globe signals it's ready — dismiss loading after minimum time
  const handleGlobeReady = useCallback(() => {
    globeReadyRef.current = true
    const elapsed = Date.now() - mountTimeRef.current
    const remaining = Math.max(0, MIN_LOADING_MS - elapsed)
    setTimeout(() => setIsLoading(false), remaining)
  }, [])

  // Fallback: if globe never signals ready, dismiss after 3s
  useEffect(() => {
    const fallback = setTimeout(() => {
      if (!globeReadyRef.current) {
        setIsLoading(false)
      }
    }, 3000)
    return () => clearTimeout(fallback)
  }, [])

  // Timeline control — always interactive
  const handleTimelineChange = useCallback((year: number) => {
    setTimelineYear(year)
  }, [])

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <>
      {/* Globe — FIXED, starts below header */}
      <div
        className="fixed top-16 sm:top-20 left-0 right-0 bottom-0 overflow-hidden"
        style={{ zIndex: 0 }}
        aria-label="Interactive Architecture Globe"
        aria-roledescription="3D globe visualization"
      >
        {/* Dark background */}
        <div className="absolute inset-0 bg-black" />

        {/* Loading overlay — sits on top, fades out after 2s */}
        <LoadingOverlay visible={isLoading} />

        {/* Globe / Mobile fallback */}
        <div className="absolute inset-0" style={{ padding: '2vh 2vw 14vh 2vw' }}>
          {isMobile ? (
            <MobileGlobeFallback currentYear={timelineYear} />
          ) : (
            <ArchitectureGlobe
              currentYear={timelineYear}
              isDayTheme={isDay}
              onReady={handleGlobeReady}
            />
          )}
        </div>

        {/* Title — top left, always visible */}
        <div
          className="absolute top-4 left-4 md:top-6 md:left-6 z-10 pointer-events-none"
          style={{
            opacity: isLoading ? 0 : 1,
            transform: isLoading ? 'translateY(12px)' : 'translateY(0)',
            transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s',
          }}
        >
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            Architecture
          </h1>
          <p
            className="text-xs md:text-sm font-medium mt-1"
            style={{
              color: 'rgba(212,165,74,0.9)',
              opacity: currentPeriod ? 1 : 0,
              transition: 'opacity 1s ease-out',
            }}
          >
            {currentPeriod ? `${currentPeriod.name} · ${formatYear(timelineYear)}` : '\u00A0'}
          </p>
        </div>

        {/* Globe explanation — bottom left, above timeline */}
        <div
          className="absolute bottom-16 md:bottom-20 left-4 md:left-6 z-10 pointer-events-none max-w-xs"
          style={{
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 1s ease-out 0.5s',
          }}
        >
          <p
            className="text-[11px] md:text-xs leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Each arc traces how building knowledge flowed between regions across millennia.
            Drag the timeline to see connections appear through history.
          </p>
        </div>

        {/* Timeline — always visible and interactive */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 px-3 pb-3 md:px-6 md:pb-4"
          style={{
            opacity: isLoading ? 0 : 1,
            transform: isLoading ? 'translateY(16px)' : 'translateY(0)',
            transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s',
          }}
          role="group"
          aria-label="Timeline controls"
        >
          <GlobeTimeline
            currentYear={timelineYear}
            onChange={handleTimelineChange}
          />
        </div>
      </div>

      {/* Spacer — pushes page content below the fixed globe area */}
      <div
        className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)]"
        style={{ position: 'relative', zIndex: 0 }}
        aria-hidden="true"
      />
    </>
  )
}
