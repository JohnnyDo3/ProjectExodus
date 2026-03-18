'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import GlobeTimeline from './GlobeTimeline'
import GlobeInfoPanel from './GlobeInfoPanel'
import SkylineDivider from './SkylineDivider'
import {
  getArcsForYear,
  getPointsForYear,
  getActivePeriodsForYear,
  getCurrentPeriodForYear,
  formatYear,
  getYearDuration,
  getArcsForYear as getArcs,
  ALL_ARCS,
  REGION_CENTROIDS,
  type GlobeArc,
} from '@/data/architecture/globeConnections'
import { ARCHITECTURAL_PERIODS } from '@/data/architecture/periods'

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
      // Check screen width + touch capability
      const narrow = window.innerWidth < 768
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      // Check WebGL support
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
            // Detect known low-power GPUs
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
    // No need for resize listener — this is checked once on mount
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
      setTooltip({
        visible: true,
        x: touch.clientX,
        y: touch.clientY - 50,
        content,
      })
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
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return { tooltip, onTouchStart, onTouchEnd, dismiss }
}

// =============================================================================
// AUTO-PLAY TIMING
// =============================================================================

const MIN_YEAR = -12000
const MAX_YEAR = 2025
const TOTAL_RANGE = MAX_YEAR - MIN_YEAR

const PREHISTORIC_END = -3500

const PREHISTORIC_DURATION = 40000
const HISTORY_DURATION = 90000

// Year step for keyboard arrow keys
const KEYBOARD_YEAR_STEP = 200
const KEYBOARD_YEAR_STEP_LARGE = 1000

function getYearsPerMs(year: number, speed: number): number {
  if (year < PREHISTORIC_END) {
    const prehistoricRange = PREHISTORIC_END - MIN_YEAR
    return (prehistoricRange / PREHISTORIC_DURATION) * speed
  }
  const historyRange = MAX_YEAR - PREHISTORIC_END
  return (historyRange / HISTORY_DURATION) * speed
}

// =============================================================================
// REGION LIST (for keyboard cycling)
// =============================================================================

const REGION_IDS = Object.keys(REGION_CENTROIDS)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function GlobeLanding() {
  // State
  const [currentYear, setCurrentYear] = useState(MIN_YEAR)
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

  // Mobile detection
  const isMobile = useIsMobile()

  // Long-press tooltip
  const { tooltip: longPressTooltip, onTouchStart: lpTouchStart, onTouchEnd: lpTouchEnd, dismiss: dismissTooltip } = useLongPress(400)

  // Derived state
  const arcs = useMemo(() => getArcsForYear(currentYear), [currentYear])
  const points = useMemo(() => getPointsForYear(currentYear), [currentYear])
  const activePeriods = useMemo(() => getActivePeriodsForYear(currentYear), [currentYear])
  const currentPeriod = useMemo(() => getCurrentPeriodForYear(currentYear), [currentYear])

  // Stats for info panel
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

    // Get key characteristics for this era
    const keyChars = regionPeriods
      .flatMap(p => p.keyCharacteristics || [])
      .slice(0, 4)

    // Get description from the most recent active period (use HIGH_SCHOOL level for concise text)
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

  // Hovered arc data formatted for info panel
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
  // Auto-play animation loop
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      return
    }

    lastTickRef.current = performance.now()

    const tick = (now: number) => {
      const delta = now - lastTickRef.current
      lastTickRef.current = now

      setCurrentYear(prev => {
        const yearsPerMs = getYearsPerMs(prev, speed)
        const nextYear = prev + yearsPerMs * delta
        if (nextYear >= MAX_YEAR) {
          return MIN_YEAR
        }
        return Math.min(nextYear, MAX_YEAR)
      })

      animFrameRef.current = requestAnimationFrame(tick)
    }

    animFrameRef.current = requestAnimationFrame(tick)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isPlaying, speed])

  // -------------------------------------------------------------------------
  // 1.5 second pause, then auto-play starts
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
      // Only handle if globe section is in viewport
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
          setCurrentYear(prev =>
            Math.min(prev + (e.shiftKey ? KEYBOARD_YEAR_STEP_LARGE : KEYBOARD_YEAR_STEP), MAX_YEAR)
          )
          break

        case 'ArrowLeft':
          e.preventDefault()
          setIsPlaying(false)
          setCurrentYear(prev =>
            Math.max(prev - (e.shiftKey ? KEYBOARD_YEAR_STEP_LARGE : KEYBOARD_YEAR_STEP), MIN_YEAR)
          )
          break

        case 'Tab':
          // Cycle through active regions
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
          // Zoom into currently focused region (if one is selected)
          if (zoomedRegion) {
            // Already zoomed — no-op
          } else if (points.length > 0) {
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
  // Touch gesture: swipe left/right on timeline area to scrub
  // -------------------------------------------------------------------------

  const touchStartRef = useRef<{ x: number; y: number; year: number } | null>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        year: currentYear,
      }
    }
  }, [currentYear])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current || e.touches.length !== 1) return

    const dx = e.touches[0].clientX - touchStartRef.current.x
    const dy = e.touches[0].clientY - touchStartRef.current.y

    // Only trigger horizontal scrub if mostly horizontal
    if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 20) {
      e.preventDefault()
      setIsPlaying(false)
      // Map screen width to full year range
      const yearDelta = (dx / window.innerWidth) * TOTAL_RANGE * 0.5
      const newYear = Math.max(MIN_YEAR, Math.min(MAX_YEAR, touchStartRef.current.year + yearDelta))
      setCurrentYear(newYear)
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null
  }, [])

  // -------------------------------------------------------------------------
  // Callbacks
  // -------------------------------------------------------------------------

  const handleTimelineChange = useCallback((year: number) => {
    setCurrentYear(year)
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
  // ARIA live region announcements
  // -------------------------------------------------------------------------

  const ariaAnnouncement = useMemo(() => {
    const parts: string[] = []
    if (currentPeriod) parts.push(currentPeriod.name)
    parts.push(formatYear(Math.round(currentYear)))
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
      {/* ARIA live region for screen readers */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {ariaAnnouncement}
      </div>

      {/* Globe Hero Section — FIXED behind everything */}
      <div
        ref={containerRef}
        className="fixed inset-0 w-full h-screen overflow-hidden"
        style={{ zIndex: 0 }}
        role="application"
        aria-label="Interactive Architecture Globe. Space: play/pause. Arrow keys: scrub timeline. Tab: cycle regions. Enter: zoom in. Escape: zoom out."
        aria-roledescription="3D globe visualization"
        tabIndex={0}
        // Touch gestures on the globe area
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
              currentYear={Math.round(currentYear)}
              onRegionClick={handleRegionClick}
            />
          ) : (
            <ArchitectureGlobe
              currentYear={Math.round(currentYear)}
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
                aria-label={`Current period: ${currentPeriod.name}, ${formatYear(Math.round(currentYear))}`}
              >
                {currentPeriod.name} · {formatYear(Math.round(currentYear))}
              </p>
            )}
            <p className="text-[10px] md:text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              12,000 BCE – {formatYear(Math.round(currentYear))} · {getYearDuration(MIN_YEAR, Math.round(currentYear))} Years
            </p>
            <p className="text-[10px] md:text-xs italic" style={{ color: 'rgba(255,255,255,0.4)' }}>
              From First Shelters to Skyscrapers
            </p>
          </div>
        </div>

        {/* Info Panel — top right */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
          <GlobeInfoPanel
            currentYear={Math.round(currentYear)}
            activeConnections={activeConnections}
            activeRegions={activeRegions}
            activePeriods={activePeriodsCount}
            hoveredArc={hoveredArcData}
            zoomedRegion={zoomedRegionData}
            onCloseRegion={handleCloseRegion}
          />
        </div>

        {/* Timeline — bottom, compact */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 px-3 pb-3 md:px-6 md:pb-4"
          role="group"
          aria-label="Timeline controls"
        >
          <GlobeTimeline
            currentYear={Math.round(currentYear)}
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

      {/* Spacer — pushes content below the fixed globe */}
      <div className="h-screen" style={{ position: 'relative', zIndex: 0 }} aria-hidden="true" />

      {/* Skyline Divider — sits between globe and content, scrolls over the globe */}
      <div className="relative" style={{ zIndex: 10, marginTop: '-1px' }} aria-hidden="true">
        <SkylineDivider className="text-[var(--background)]" />
      </div>
    </>
  )
}
