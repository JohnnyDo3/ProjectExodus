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

const MobileGlobeFallback = dynamic(() => import('./MobileGlobeFallback'), {
  ssr: false,
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
      <p
        className="text-[10px] font-mono font-medium tracking-[0.4em] uppercase mb-3"
        style={{ color: 'rgba(212, 165, 74, 0.4)' }}
      >
        SYS::ARCH.NAV
      </p>

      <h1
        className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.1em] uppercase mb-4"
        style={{
          color: 'rgba(212, 165, 74, 0.85)',
          textShadow: '0 0 30px rgba(212, 165, 74, 0.2)',
        }}
      >
        Architecture
      </h1>

      <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent animate-pulse" />

      <p
        className="mt-4 text-[10px] font-mono tracking-[0.3em] uppercase animate-pulse"
        style={{ color: 'rgba(255, 255, 255, 0.25)' }}
      >
        INITIALIZING GLOBE
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

  const { isDay } = useTimeTheme()
  const isMobile = useIsMobile()

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

        {/* Globe — touch-action:none lets Three.js OrbitControls handle touch gestures */}
        <div className="absolute inset-0" style={{ padding: '2vh 2vw 12vh 2vw', touchAction: 'none' }}>
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

        {/* ── Top left: HUD Title + period ── */}
        <div
          className="absolute top-4 left-4 md:top-6 md:left-6 z-10 pointer-events-none"
          style={fadeIn(0.1)}
        >
          {/* HUD bracket frame */}
          <div
            className="relative pl-3 py-2"
            style={{
              borderLeft: '2px solid rgba(212,165,74,0.5)',
              borderTop: '1px solid rgba(212,165,74,0.2)',
            }}
          >
            {/* Corner accent */}
            <div className="absolute -top-px -left-px w-3 h-3" style={{
              borderTop: '2px solid rgba(212,165,74,0.8)',
              borderLeft: '2px solid rgba(212,165,74,0.8)',
            }} />

            <p
              className="text-[9px] md:text-[10px] font-mono font-medium tracking-[0.3em] uppercase mb-1"
              style={{ color: 'rgba(212,165,74,0.5)' }}
            >
              SYS::ARCH.NAV
            </p>
            <h1
              className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.08em] uppercase"
              style={{
                color: 'rgba(255,255,255,0.9)',
                textShadow: '0 0 20px rgba(212,165,74,0.15)',
              }}
            >
              Architecture
            </h1>
            <div
              className="w-full h-px mt-2 mb-1.5"
              style={{ background: 'linear-gradient(to right, rgba(212,165,74,0.4), transparent 80%)' }}
            />
            <p
              className="text-[10px] md:text-xs font-mono"
              style={{
                color: 'rgba(212,165,74,0.85)',
                opacity: currentPeriod ? 1 : 0,
                transition: 'opacity 0.6s ease-out',
                textShadow: '0 0 8px rgba(212,165,74,0.3)',
              }}
            >
              {currentPeriod ? `${currentPeriod.name} // ${formatYear(timelineYear)}` : '\u00A0'}
            </p>
          </div>
        </div>

        {/* ── Top right: HUD Stats panel ── */}
        <div
          className="absolute top-4 right-4 md:top-6 md:right-6 z-10 pointer-events-none text-right"
          style={fadeIn(0.25)}
        >
          <div
            className="relative pr-3 py-2"
            style={{
              borderRight: '2px solid rgba(212,165,74,0.5)',
              borderTop: '1px solid rgba(212,165,74,0.2)',
            }}
          >
            {/* Corner accent */}
            <div className="absolute -top-px -right-px w-3 h-3" style={{
              borderTop: '2px solid rgba(212,165,74,0.8)',
              borderRight: '2px solid rgba(212,165,74,0.8)',
            }} />

            <p
              className="text-[9px] md:text-[10px] font-mono font-medium tracking-[0.3em] uppercase mb-2"
              style={{ color: 'rgba(212,165,74,0.5)' }}
            >
              TELEMETRY
            </p>

            <div className="flex flex-col items-end gap-1.5">
              {/* Connections stat */}
              <div className="flex items-center gap-2.5">
                <span
                  className="text-[9px] md:text-[10px] font-mono tracking-[0.2em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  ARC.LINK
                </span>
                <span className="w-px h-3" style={{ background: 'rgba(212,165,74,0.3)' }} />
                <span
                  className="text-sm md:text-base font-mono tabular-nums min-w-[2ch]"
                  style={{
                    color: 'rgba(212,165,74,0.9)',
                    textShadow: '0 0 10px rgba(212,165,74,0.4)',
                  }}
                >
                  {String(arcCount).padStart(3, '0')}
                </span>
              </div>
              {/* Regions stat */}
              <div className="flex items-center gap-2.5">
                <span
                  className="text-[9px] md:text-[10px] font-mono tracking-[0.2em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  RGN.NODE
                </span>
                <span className="w-px h-3" style={{ background: 'rgba(212,165,74,0.3)' }} />
                <span
                  className="text-sm md:text-base font-mono tabular-nums min-w-[2ch]"
                  style={{
                    color: 'rgba(212,165,74,0.9)',
                    textShadow: '0 0 10px rgba(212,165,74,0.4)',
                  }}
                >
                  {String(regionCount).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div
              className="w-full h-px mt-2 mb-1.5"
              style={{ background: 'linear-gradient(to left, rgba(212,165,74,0.4), transparent 80%)' }}
            />
            <p
              className="text-[9px] md:text-[10px] font-mono max-w-[200px] leading-relaxed hidden sm:block ml-auto"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              Influence propagation between civilizations
            </p>
          </div>
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
