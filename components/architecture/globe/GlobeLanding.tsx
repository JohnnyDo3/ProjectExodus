'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import GlobeTimeline from './GlobeTimeline'
import { useTimeTheme } from '@/components/providers/TimeThemeProvider'
import {
  formatYear,
  getCurrentPeriodForYear,
} from '@/data/architecture/globeConnections'
import type { IntroPhase } from './ArchitectureGlobe'

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

const SWEEP_DURATION = 42000 // 42 seconds — slower, more cinematic
const SWEEP_START_YEAR = -3500
const SWEEP_END_YEAR = 2025
const PAUSE_DURATION = 1500 // 1.5 second pause after reveal

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
  // ── Intro phase state machine ──
  const [introPhase, setIntroPhase] = useState<IntroPhase>('building')
  const [timelineYear, setTimelineYear] = useState(SWEEP_START_YEAR)
  const sweepRafRef = useRef<number>(0)
  const sweepStartRef = useRef(0)
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Theme
  const { isDay } = useTimeTheme()
  const isMobile = useIsMobile()

  // Derived
  const currentPeriod = useMemo(() => getCurrentPeriodForYear(timelineYear), [timelineYear])

  // ── Phase transition callbacks ──

  const handleBuildComplete = useCallback(() => {
    setIntroPhase('revealing')
  }, [])

  const handleRevealComplete = useCallback(() => {
    setIntroPhase('pausing')
    // After a short pause, start the sweep
    pauseTimerRef.current = setTimeout(() => {
      setIntroPhase('sweeping')
    }, PAUSE_DURATION)
  }, [])

  // ── Sweep animation: -3500 → 2025 over 42s ──

  useEffect(() => {
    if (introPhase !== 'sweeping') return

    sweepStartRef.current = performance.now()

    const tick = () => {
      const elapsed = performance.now() - sweepStartRef.current
      const t = Math.min(elapsed / SWEEP_DURATION, 1)

      // Mild ease-in: starts a bit slower, accelerates toward modern era
      const eased = Math.pow(t, 1.3)
      const year = Math.round(
        SWEEP_START_YEAR + (SWEEP_END_YEAR - SWEEP_START_YEAR) * eased
      )

      setTimelineYear(year)

      if (t >= 1) {
        setIntroPhase('idle')
      } else {
        sweepRafRef.current = requestAnimationFrame(tick)
      }
    }

    sweepRafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(sweepRafRef.current)
    }
  }, [introPhase])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
      cancelAnimationFrame(sweepRafRef.current)
    }
  }, [])

  // ── User timeline control (only during idle) ──

  const handleTimelineChange = useCallback((year: number) => {
    setTimelineYear(year)
  }, [])

  // Show timeline during sweep (auto-playing, non-interactive) and idle (interactive)
  const showTimeline = introPhase === 'sweeping' || introPhase === 'idle'
  const timelineInteractive = introPhase === 'idle'

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
              introPhase={introPhase}
              onBuildComplete={handleBuildComplete}
              onRevealComplete={handleRevealComplete}
            />
          )}
        </div>

        {/* Title — top left, fades in gradually during pausing phase */}
        <div
          className="absolute top-4 left-4 md:top-6 md:left-6 z-10 pointer-events-none"
          style={{
            opacity: introPhase === 'building' || introPhase === 'revealing' ? 0 : 1,
            transform: introPhase === 'building' || introPhase === 'revealing' ? 'translateY(12px)' : 'translateY(0)',
            transition: 'opacity 2.5s ease-out, transform 2.5s ease-out',
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

        {/* Timeline — slides in from below with gentle ease */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 px-3 pb-3 md:px-6 md:pb-4"
          style={{
            opacity: showTimeline ? 1 : 0,
            transform: showTimeline ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 2s ease-out 0.3s, transform 2s ease-out 0.3s',
            pointerEvents: timelineInteractive ? 'auto' : 'none',
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
