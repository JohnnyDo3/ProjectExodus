'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import GlobeTimeline from './GlobeTimeline'
import { useTimeTheme } from '@/components/providers/TimeThemeProvider'
import {
  formatYear,
  getCurrentPeriodForYear,
  getArcsForYear,
  getPointsForYear,
} from '@/data/architecture/globeConnections'

// Dynamic imports
const ArchitectureGlobe = dynamic(() => import('./ArchitectureGlobe'), {
  ssr: false,
  loading: () => <GlobeLoadingSkeleton />,
})

// =============================================================================
// CONSTANTS
// =============================================================================

const PRESENT_YEAR = 2025
const MIN_LOADING_MS = 2200

// =============================================================================
// LOADING SKELETON (shown while JS chunk loads)
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
// PAGE-LEVEL LOADING OVERLAY
// =============================================================================

function PageLoadingOverlay({ visible }: { visible: boolean }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 1s ease-out',
      }}
    >
      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-5"
        style={{ color: 'rgba(212, 165, 74, 0.85)' }}
      >
        Architecture
      </h1>

      <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent animate-pulse" />

      <p
        className="mt-5 text-[11px] font-medium tracking-[0.2em] uppercase animate-pulse"
        style={{ color: 'rgba(255, 255, 255, 0.3)' }}
      >
        Loading globe
      </p>
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function GlobeLanding() {
  const [timelineYear, setTimelineYear] = useState(PRESENT_YEAR)
  const [isLoading, setIsLoading] = useState(true)
  const mountTimeRef = useRef(Date.now())
  const globeReadyRef = useRef(false)

  const { isDay } = useTimeTheme()

  // Derived
  const currentPeriod = useMemo(() => getCurrentPeriodForYear(timelineYear), [timelineYear])
  const arcCount = useMemo(() => getArcsForYear(timelineYear).length, [timelineYear])
  const regionCount = useMemo(() => getPointsForYear(timelineYear).length, [timelineYear])

  // Globe ready callback
  const handleGlobeReady = useCallback(() => {
    globeReadyRef.current = true
    const elapsed = Date.now() - mountTimeRef.current
    const remaining = Math.max(0, MIN_LOADING_MS - elapsed)
    setTimeout(() => setIsLoading(false), remaining)
  }, [])

  // Fallback timeout
  useEffect(() => {
    const fallback = setTimeout(() => {
      if (!globeReadyRef.current) setIsLoading(false)
    }, 3500)
    return () => clearTimeout(fallback)
  }, [])

  const handleTimelineChange = useCallback((year: number) => {
    setTimelineYear(year)
  }, [])

  // Shared fade style generator for staggered reveal
  const fadeIn = (delay: number) => ({
    opacity: isLoading ? 0 : 1,
    transform: isLoading ? 'translateY(10px)' : 'translateY(0)',
    transition: `opacity 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  })

  return (
    <>
      <PageLoadingOverlay visible={isLoading} />

      {/* Globe — FIXED, starts below header */}
      <div
        className="fixed top-16 sm:top-20 left-0 right-0 bottom-0 overflow-hidden"
        style={{ zIndex: 0 }}
        aria-label="Interactive Architecture Globe"
        aria-roledescription="3D globe visualization"
      >
        <div className="absolute inset-0 bg-black" />

        {/* Globe */}
        <div className="absolute inset-0" style={{ padding: '2vh 2vw 12vh 2vw' }}>
          <ArchitectureGlobe
            currentYear={timelineYear}
            isDayTheme={isDay}
            onReady={handleGlobeReady}
          />
        </div>

        {/* ── Top left: Title + period ── */}
        <div
          className="absolute top-4 left-4 md:top-6 md:left-6 z-10 pointer-events-none"
          style={fadeIn(0.1)}
        >
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            Architecture
          </h1>
          <p
            className="text-xs md:text-sm font-medium mt-1.5"
            style={{
              color: 'rgba(212,165,74,0.85)',
              opacity: currentPeriod ? 1 : 0,
              transition: 'opacity 0.6s ease-out',
            }}
          >
            {currentPeriod ? `${currentPeriod.name} · ${formatYear(timelineYear)}` : '\u00A0'}
          </p>
        </div>

        {/* ── Top right: Stats ── */}
        <div
          className="absolute top-4 right-4 md:top-6 md:right-6 z-10 pointer-events-none text-right"
          style={fadeIn(0.25)}
        >
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] md:text-[11px] font-medium tracking-widest uppercase"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                Connections
              </span>
              <span
                className="text-base md:text-lg font-light tabular-nums min-w-[2ch]"
                style={{ color: 'rgba(212,165,74,0.85)' }}
              >
                {arcCount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] md:text-[11px] font-medium tracking-widest uppercase"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                Regions
              </span>
              <span
                className="text-base md:text-lg font-light tabular-nums min-w-[2ch]"
                style={{ color: 'rgba(212,165,74,0.85)' }}
              >
                {regionCount}
              </span>
            </div>
          </div>
          <p
            className="text-[10px] md:text-[11px] mt-2 max-w-[180px] leading-relaxed hidden sm:block"
            style={{ color: 'rgba(255,255,255,0.28)' }}
          >
            Arcs show how building knowledge spread between civilizations.
          </p>
        </div>

        {/* ── Timeline ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 px-3 pb-3 md:px-5 md:pb-4"
          style={fadeIn(0.4)}
          role="group"
          aria-label="Timeline controls"
        >
          <GlobeTimeline
            currentYear={timelineYear}
            onChange={handleTimelineChange}
          />
        </div>
      </div>

      {/* Spacer */}
      <div
        className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)]"
        style={{ position: 'relative', zIndex: 0 }}
        aria-hidden="true"
      />
    </>
  )
}
