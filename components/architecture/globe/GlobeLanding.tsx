'use client'

import { useState, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import GlobeTimeline from './GlobeTimeline'
import { useTimeTheme } from '@/components/providers/TimeThemeProvider'
import {
  ALL_ARCS,
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
// LOADING SKELETON
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
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-amber-500/60 text-sm font-mono animate-pulse">Loading globe...</span>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// MOBILE DETECTION HOOK
// =============================================================================

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  if (typeof window !== 'undefined' && !isMobile) {
    // Check once on mount
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
    // Defer to avoid SSR issues
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
  // Default timeline to the first arc's year
  const firstArcYear = ALL_ARCS.length > 0 ? ALL_ARCS[0].startYear : -12000

  const [timelineYear, setTimelineYear] = useState(firstArcYear)

  // Theme: day vs night
  const { isDay } = useTimeTheme()

  // Mobile detection
  const isMobile = useIsMobile()

  // Derived
  const currentPeriod = useMemo(() => getCurrentPeriodForYear(timelineYear), [timelineYear])

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

        {/* Globe / Mobile fallback */}
        <div className="absolute inset-0" style={{ padding: '2vh 2vw 14vh 2vw' }}>
          {isMobile ? (
            <MobileGlobeFallback currentYear={timelineYear} />
          ) : (
            <ArchitectureGlobe
              currentYear={timelineYear}
              isDayTheme={isDay}
            />
          )}
        </div>

        {/* Title — top left */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 pointer-events-none">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            Architecture
          </h1>
          {currentPeriod && (
            <p
              className="text-xs md:text-sm font-medium mt-1"
              style={{ color: 'rgba(212,165,74,0.9)' }}
            >
              {currentPeriod.name} · {formatYear(timelineYear)}
            </p>
          )}
        </div>

        {/* Timeline — bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 px-3 pb-3 md:px-6 md:pb-4"
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
