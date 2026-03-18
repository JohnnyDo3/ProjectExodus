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

// Dynamic import of the heavy globe component
const ArchitectureGlobe = dynamic(() => import('./ArchitectureGlobe'), {
  ssr: false,
  loading: () => <GlobeLoadingSkeleton />,
})

// =============================================================================
// LOADING SKELETON — wireframe sphere
// =============================================================================

function GlobeLoadingSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Wireframe sphere using CSS */}
        <div
          className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-amber-500/30 animate-pulse"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(212,165,74,0.05) 0%, transparent 70%)',
          }}
        >
          {/* Latitude lines */}
          <div className="absolute inset-0 rounded-full border border-amber-500/15" style={{ margin: '20%' }} />
          <div className="absolute inset-0 rounded-full border border-amber-500/15" style={{ margin: '40%' }} />
          {/* Longitude line */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full">
            <div className="w-full h-full rounded-full border border-amber-500/15" style={{ transform: 'scaleX(0.3)' }} />
          </div>
        </div>
        {/* Loading text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-amber-500/60 text-sm font-mono animate-pulse">Loading globe...</span>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// AUTO-PLAY TIMING
// =============================================================================

const MIN_YEAR = -12000
const MAX_YEAR = 2025
const TOTAL_RANGE = MAX_YEAR - MIN_YEAR

// Prehistoric threshold — fast speed before this, normal after
const PREHISTORIC_END = -3500

// Base duration in ms for one full play-through at 1x speed
const PREHISTORIC_DURATION = 40000  // 40 seconds for -12000 to -3500
const HISTORY_DURATION = 90000      // 90 seconds for -3500 to 2025

function getYearsPerMs(year: number, speed: number): number {
  if (year < PREHISTORIC_END) {
    const prehistoricRange = PREHISTORIC_END - MIN_YEAR
    return (prehistoricRange / PREHISTORIC_DURATION) * speed
  }
  const historyRange = MAX_YEAR - PREHISTORIC_END
  return (historyRange / HISTORY_DURATION) * speed
}

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
  const mountTimeRef = useRef(Date.now())

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

    // Get periods active in this region at current year
    const regionPeriods = activePeriods.filter(p =>
      p.primaryRegions.includes(zoomedRegion)
    )

    // Get iconic buildings from those periods
    const buildings = regionPeriods.flatMap(p => p.iconicBuildings).slice(0, 5)

    return {
      name: centroid.name,
      connectionCount: inbound + outbound,
      inbound,
      outbound,
      activePeriods: regionPeriods.map(p => p.name),
      iconicBuildings: buildings,
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
          // Loop back
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
  // 1-2 second pause, then auto-play starts
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
  // Callbacks
  // -------------------------------------------------------------------------

  const handleTimelineChange = useCallback((year: number) => {
    setCurrentYear(year)
    // Touching the slider pauses auto-play
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
    setIsPlaying(false) // Pause when zooming
  }, [])

  const handleCloseRegion = useCallback(() => {
    setZoomedRegion(null)
  }, [])

  const handleArcHover = useCallback((arc: GlobeArc | null) => {
    setHoveredArc(arc)
  }, [])

  // Click on globe background to fly back
  const handleGlobeBackgroundClick = useCallback(() => {
    if (zoomedRegion) {
      setZoomedRegion(null)
    }
  }, [zoomedRegion])

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <>
      {/* Globe Hero Section — FIXED behind everything */}
      <div
        className="fixed inset-0 w-full h-screen overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {/* Dark background */}
        <div className="absolute inset-0 bg-black" />

        {/* Globe fills viewport */}
        <div className="absolute inset-0" style={{ padding: '2vh 2vw 14vh 2vw' }}>
          <ArchitectureGlobe
            currentYear={Math.round(currentYear)}
            onRegionClick={handleRegionClick}
            onArcHover={handleArcHover}
            zoomedRegion={zoomedRegion}
            isPlaying={isPlaying}
          />
        </div>

        {/* Title — top left */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 pointer-events-none">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            Architecture
          </h1>
          <div className="mt-1 space-y-0.5">
            {currentPeriod && (
              <p className="text-xs md:text-sm font-medium" style={{ color: 'rgba(212,165,74,0.9)' }}>
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
        <div className="absolute bottom-0 left-0 right-0 z-10 px-3 pb-3 md:px-6 md:pb-4">
          <GlobeTimeline
            currentYear={Math.round(currentYear)}
            onChange={handleTimelineChange}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            speed={speed}
            onSpeedChange={handleSpeedChange}
          />
        </div>

        {/* Keyboard instructions (sr-only) */}
        <div className="sr-only" role="application" aria-label="Interactive 3D Architecture Globe. Use arrow keys to control timeline, Space to play/pause, Tab to cycle regions, Enter to zoom in, Escape to zoom out.">
          Architecture Globe Visualization
        </div>
      </div>

      {/* Spacer — pushes content below the fixed globe */}
      <div className="h-screen" style={{ position: 'relative', zIndex: 0 }} />

      {/* Skyline Divider — sits between globe and content, scrolls over the globe */}
      <div className="relative" style={{ zIndex: 10, marginTop: '-1px' }}>
        <SkylineDivider className="text-[var(--background)]" />
      </div>
    </>
  )
}
