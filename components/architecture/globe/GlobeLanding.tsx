'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import GlobeTimeline from './GlobeTimeline'
import GlobeInfoPanel from './GlobeInfoPanel'
import {
  getArcsForYear,
  getPointsForYear,
  getActivePeriodsForYear,
  getCurrentPeriodForYear,
  formatYear,
  getYearDuration,
  REGION_CENTROIDS,
  type GlobeArc,
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
// LOADING SKELETON — wireframe sphere
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

  useEffect(() => {
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
      setIsMobile((narrow && touch) || weakGPU)
    }
    check()
  }, [])

  return isMobile
}

// =============================================================================
// LONG-PRESS HOOK
// =============================================================================

interface LongPressTooltip {
  visible: boolean
  x: number
  y: number
  content: string
}

function useLongPress(delay: number = 500) {
  const [tooltip, setTooltip] = useState<LongPressTooltip>({
    visible: false, x: 0, y: 0, content: '',
  })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onTouchStart = useCallback((e: React.TouchEvent, content: string) => {
    const touch = e.touches[0]
    timerRef.current = setTimeout(() => {
      setTooltip({ visible: true, x: touch.clientX, y: touch.clientY - 50, content })
    }, delay)
  }, [delay])

  const onTouchEnd = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = null
    setTooltip(prev => ({ ...prev, visible: false }))
  }, [])

  const dismiss = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }))
  }, [])

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  return { tooltip, onTouchStart, onTouchEnd, dismiss }
}

// =============================================================================
// LOGARITHMIC TIME PACING
//
// Maps the year range to a normalized t ∈ [0,1] via log scale.
// Early years (prehistory) compress; recent years (modern) expand.
// =============================================================================

const MIN_YEAR = -12000
const MAX_YEAR = 2025
const TOTAL_RANGE = MAX_YEAR - MIN_YEAR // 14025

// Full play-through duration at speed=1 (ms)
const FULL_DURATION_MS = 150000 // 2.5 minutes

// Piecewise time allocation:
// Prehistory (-12000 → -3500) gets 10% of t-space (fast build-up)
// History (-3500 → 2025) gets 90% with log distribution (modern = slowest)
const PREHISTORY_END = -3500
const PREHISTORY_RANGE = PREHISTORY_END - MIN_YEAR  // 8500
const HISTORY_RANGE = MAX_YEAR - PREHISTORY_END      // 5525
const PREHISTORY_T = 0.10  // 10% of t-space
const HISTORY_LOG_BASE = Math.log(HISTORY_RANGE + 1)

/** Ease-out curve: fast start, decelerates at end */
function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3)
}

/** Inverse ease-out cubic */
function easeOutCubicInverse(y: number): number {
  return 1 - Math.pow(1 - y, 1 / 3)
}

/** Convert year → normalised t (0→1) */
function yearToT(year: number): number {
  const clamped = Math.max(MIN_YEAR, Math.min(MAX_YEAR, year))
  if (clamped < PREHISTORY_END) {
    // Ease-out through prehistory: fast early, slows down approaching -3500
    const progress = (clamped - MIN_YEAR) / PREHISTORY_RANGE
    return easeOutCubicInverse(progress) * PREHISTORY_T
  }
  // Log scale through history, expanded into t=[0.10, 1.0]
  const progress = Math.log(clamped - PREHISTORY_END + 1) / HISTORY_LOG_BASE
  return PREHISTORY_T + progress * (1 - PREHISTORY_T)
}

/** Convert normalised t (0→1) → year */
function tToYear(t: number): number {
  const clamped = Math.max(0, Math.min(1, t))
  if (clamped < PREHISTORY_T) {
    // Inverse ease-out: maps linear t to decelerating years
    const tNorm = clamped / PREHISTORY_T
    const progress = easeOutCubic(tNorm)
    return MIN_YEAR + progress * PREHISTORY_RANGE
  }
  // Log inverse through history
  const historyT = (clamped - PREHISTORY_T) / (1 - PREHISTORY_T)
  return PREHISTORY_END + Math.exp(historyT * HISTORY_LOG_BASE) - 1
}

// Keyboard step sizes (in t-space)
const KEYBOARD_STEP = 0.015       // ~small jump
const KEYBOARD_STEP_LARGE = 0.06  // ~large jump

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function GlobeLanding() {
  // State — t is the normalised time parameter, year is derived
  const [tParam, setTParam] = useState(0) // 0 → 1
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [zoomedRegion, setZoomedRegion] = useState<string | null>(null)
  const [hoveredArc, setHoveredArc] = useState<GlobeArc | null>(null)
  const [globeLoaded, setGlobeLoaded] = useState(false)

  const animFrameRef = useRef<number>(0)
  const lastTickRef = useRef<number>(0)
  const initialPauseRef = useRef(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const regionCycleIndexRef = useRef(-1)

  // Derive year from t
  const currentYear = Math.round(tToYear(tParam))

  // Mobile detection
  const isMobile = useIsMobile()

  // Long-press tooltip
  const { tooltip: longPressTooltip, onTouchStart: lpTouchStart, onTouchEnd: lpTouchEnd, dismiss: dismissTooltip } = useLongPress(400)

  // Derived state
  const arcs = useMemo(() => getArcsForYear(currentYear), [currentYear])
  const points = useMemo(() => getPointsForYear(currentYear), [currentYear])
  const activePeriods = useMemo(() => getActivePeriodsForYear(currentYear), [currentYear])
  const currentPeriod = useMemo(() => getCurrentPeriodForYear(currentYear), [currentYear])

  const activeConnections = arcs.length
  const activeRegions = points.length
  const activePeriodsCount = activePeriods.length

  // Region detail for zoomed state
  const zoomedRegionData = useMemo(() => {
    if (!zoomedRegion) return null
    const centroid = REGION_CENTROIDS[zoomedRegion]
    if (!centroid) return null

    const inbound = arcs.filter(a => a.targetRegion === zoomedRegion).length
    const outbound = arcs.filter(a => a.sourceRegion === zoomedRegion).length

    const regionPeriods = activePeriods.filter(p =>
      p.primaryRegions.includes(zoomedRegion)
    )

    const buildings = regionPeriods.flatMap(p => p.iconicBuildings).slice(0, 5)

    const keyChars = regionPeriods
      .flatMap(p => p.keyCharacteristics || [])
      .slice(0, 4)

    const description = regionPeriods.length > 0
      ? regionPeriods[regionPeriods.length - 1].description?.HIGH_SCHOOL
      : undefined

    return {
      name: centroid.name,
      connectionCount: inbound + outbound,
      inbound,
      outbound,
      activePeriods: regionPeriods.map(p => p.name),
      iconicBuildings: buildings,
      keyMaterials: keyChars,
      description,
    }
  }, [zoomedRegion, arcs, activePeriods])

  // Hovered arc data
  const hoveredArcData = useMemo(() => {
    if (!hoveredArc) return null
    return {
      sourcePeriodName: hoveredArc.sourcePeriodName,
      targetPeriodName: hoveredArc.targetPeriodName,
      startYear: hoveredArc.startYear,
      sourceRegion: hoveredArc.sourceRegion,
      targetRegion: hoveredArc.targetRegion,
      eraColor: hoveredArc.eraColor,
      eraMaterial: hoveredArc.eraMaterial,
    }
  }, [hoveredArc])

  // -------------------------------------------------------------------------
  // Auto-play animation loop (logarithmic time)
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      return
    }

    lastTickRef.current = performance.now()

    const tPerMs = (1 / FULL_DURATION_MS) * speed

    const tick = (now: number) => {
      const delta = now - lastTickRef.current
      lastTickRef.current = now

      setTParam(prev => {
        const next = prev + tPerMs * delta
        if (next >= 1) return 0 // loop
        return Math.min(next, 1)
      })

      animFrameRef.current = requestAnimationFrame(tick)
    }

    animFrameRef.current = requestAnimationFrame(tick)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isPlaying, speed])

  // -------------------------------------------------------------------------
  // Initial pause then auto-play
  // -------------------------------------------------------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      if (initialPauseRef.current) {
        initialPauseRef.current = false
        setIsPlaying(true)
        setGlobeLoaded(true)
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // -------------------------------------------------------------------------
  // Keyboard handlers
  // -------------------------------------------------------------------------

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return

      switch (e.key) {
        case ' ':
        case 'Spacebar':
          e.preventDefault()
          setIsPlaying(prev => !prev)
          break

        case 'ArrowRight':
          e.preventDefault()
          setIsPlaying(false)
          setTParam(prev => Math.min(prev + (e.shiftKey ? KEYBOARD_STEP_LARGE : KEYBOARD_STEP), 1))
          break

        case 'ArrowLeft':
          e.preventDefault()
          setIsPlaying(false)
          setTParam(prev => Math.max(prev - (e.shiftKey ? KEYBOARD_STEP_LARGE : KEYBOARD_STEP), 0))
          break

        case 'Tab':
          if (points.length > 0) {
            e.preventDefault()
            const activeRegionIds = points.map(p => p.region)
            regionCycleIndexRef.current =
              (regionCycleIndexRef.current + (e.shiftKey ? -1 : 1) + activeRegionIds.length) % activeRegionIds.length
            setZoomedRegion(activeRegionIds[regionCycleIndexRef.current])
            setIsPlaying(false)
          }
          break

        case 'Enter':
          if (!zoomedRegion && points.length > 0) {
            e.preventDefault()
            const idx = Math.max(0, regionCycleIndexRef.current)
            const activeRegionIds = points.map(p => p.region)
            setZoomedRegion(activeRegionIds[idx % activeRegionIds.length])
            setIsPlaying(false)
          }
          break

        case 'Escape':
          if (zoomedRegion) {
            e.preventDefault()
            setZoomedRegion(null)
            regionCycleIndexRef.current = -1
          }
          break

        case '+':
        case '=':
          e.preventDefault()
          setSpeed(prev => Math.min(prev * 2, 4))
          break

        case '-':
        case '_':
          e.preventDefault()
          setSpeed(prev => Math.max(prev / 2, 1))
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [points, zoomedRegion])

  // -------------------------------------------------------------------------
  // Touch gestures: swipe to scrub
  // -------------------------------------------------------------------------

  const touchStartRef = useRef<{ x: number; y: number; t: number } | null>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: tParam }
    }
  }, [tParam])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current || e.touches.length !== 1) return

    const dx = e.touches[0].clientX - touchStartRef.current.x
    const dy = e.touches[0].clientY - touchStartRef.current.y

    if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 20) {
      e.preventDefault()
      setIsPlaying(false)
      const tDelta = (dx / window.innerWidth) * 0.3
      setTParam(Math.max(0, Math.min(1, touchStartRef.current.t + tDelta)))
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null
  }, [])

  // -------------------------------------------------------------------------
  // Callbacks
  // -------------------------------------------------------------------------

  const handleTimelineChange = useCallback((year: number) => {
    setTParam(yearToT(year))
    setIsPlaying(false)
  }, [])

  const handleTogglePlay = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed)
  }, [])

  const handleRegionClick = useCallback((region: string) => {
    setZoomedRegion(region)
    setIsPlaying(false)
  }, [])

  const handleCloseRegion = useCallback(() => {
    setZoomedRegion(null)
    regionCycleIndexRef.current = -1
  }, [])

  const handleArcHover = useCallback((arc: GlobeArc | null) => {
    setHoveredArc(arc)
  }, [])

  // -------------------------------------------------------------------------
  // ARIA
  // -------------------------------------------------------------------------

  const ariaAnnouncement = useMemo(() => {
    const parts: string[] = []
    if (currentPeriod) parts.push(currentPeriod.name)
    parts.push(formatYear(currentYear))
    parts.push(`${activeConnections} connections across ${activeRegions} regions`)
    if (zoomedRegion && zoomedRegionData) {
      parts.push(`Zoomed into ${zoomedRegionData.name}`)
    }
    return parts.join('. ')
  }, [currentPeriod, currentYear, activeConnections, activeRegions, zoomedRegion, zoomedRegionData])

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <>
      {/* ARIA live region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" role="status">
        {ariaAnnouncement}
      </div>

      {/* Globe Hero — FIXED, starts below header (h-16 / sm:h-20) */}
      <div
        ref={containerRef}
        className="fixed top-16 sm:top-20 left-0 right-0 bottom-0 overflow-hidden"
        style={{ zIndex: 0 }}
        role="application"
        aria-label="Interactive Architecture Globe. Space: play/pause. Arrow keys: scrub timeline. Tab: cycle regions. Enter: zoom in. Escape: zoom out."
        aria-roledescription="3D globe visualization"
        tabIndex={0}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Dark background */}
        <div className="absolute inset-0 bg-black" />

        {/* Globe / Mobile fallback */}
        <div className="absolute inset-0" style={{ padding: '2vh 2vw 14vh 2vw' }}>
          {isMobile ? (
            <MobileGlobeFallback
              currentYear={currentYear}
              onRegionClick={handleRegionClick}
            />
          ) : (
            <ArchitectureGlobe
              currentYear={currentYear}
              onRegionClick={handleRegionClick}
              onArcHover={handleArcHover}
              zoomedRegion={zoomedRegion}
              isPlaying={isPlaying}
            />
          )}
        </div>

        {/* Title — top left */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 pointer-events-none">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight"
            style={{ color: 'rgba(255,255,255,0.85)' }}
            id="globe-title"
          >
            Architecture
          </h1>
          <div className="mt-1 space-y-0.5">
            {currentPeriod && (
              <p
                className="text-xs md:text-sm font-medium"
                style={{ color: 'rgba(212,165,74,0.9)' }}
                aria-label={`Current period: ${currentPeriod.name}, ${formatYear(currentYear)}`}
              >
                {currentPeriod.name} · {formatYear(currentYear)}
              </p>
            )}
            <p className="text-[10px] md:text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              12,000 BCE – {formatYear(currentYear)} · {getYearDuration(MIN_YEAR, currentYear)} Years
            </p>
            <p className="text-[10px] md:text-xs italic" style={{ color: 'rgba(255,255,255,0.4)' }}>
              From First Shelters to Skyscrapers
            </p>
          </div>
        </div>

        {/* Info Panel — top right (stat board + region card) */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
          <GlobeInfoPanel
            currentYear={currentYear}
            activeConnections={activeConnections}
            activeRegions={activeRegions}
            activePeriods={activePeriodsCount}
            hoveredArc={hoveredArcData}
            zoomedRegion={zoomedRegionData}
            onCloseRegion={handleCloseRegion}
          />
        </div>

        {/* Timeline — bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 px-3 pb-3 md:px-6 md:pb-4"
          role="group"
          aria-label="Timeline controls"
        >
          <GlobeTimeline
            currentYear={currentYear}
            onChange={handleTimelineChange}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            speed={speed}
            onSpeedChange={handleSpeedChange}
          />
        </div>

        {/* Long-press tooltip (mobile) */}
        {longPressTooltip.visible && (
          <div
            className="fixed z-50 pointer-events-none px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm border border-amber-500/30 text-xs text-white"
            style={{
              left: longPressTooltip.x,
              top: longPressTooltip.y,
              transform: 'translate(-50%, -100%)',
            }}
            role="tooltip"
          >
            {longPressTooltip.content}
          </div>
        )}
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
