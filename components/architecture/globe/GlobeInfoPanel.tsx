'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { formatYear, REGION_CENTROIDS } from '@/data/architecture/globeConnections'

// =============================================================================
// TYPES
// =============================================================================

interface GlobeInfoPanelProps {
  currentYear: number
  activeConnections: number
  activeRegions: number
  activePeriods: number
  hoveredArc: {
    sourcePeriodName: string
    targetPeriodName: string
    startYear: number
    sourceRegion: string
    targetRegion: string
    eraColor: string
    eraMaterial: string
  } | null
  zoomedRegion: {
    name: string
    connectionCount: number
    inbound: number
    outbound: number
    activePeriods: string[]
    iconicBuildings: { name: string; location: string; year: string }[]
  } | null
  onCloseRegion: () => void
}

// =============================================================================
// ANIMATED COUNTER HOOK
// =============================================================================

function useAnimatedCounter(target: number, duration: number = 500): number {
  const [display, setDisplay] = useState(target)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number>(target)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const from = startRef.current
    const to = target

    if (from === to) return

    startTimeRef.current = null

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(from + (to - from) * eased)

      setDisplay(current)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setDisplay(to)
        startRef.current = to
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
      startRef.current = to
    }
  }, [target, duration])

  return display
}

// =============================================================================
// REGION DISPLAY NAME HELPER
// =============================================================================

function getRegionDisplayName(regionId: string): string {
  const centroid = REGION_CENTROIDS[regionId]
  return centroid ? centroid.name : regionId
}

// =============================================================================
// PERIOD DOT COLORS
// =============================================================================

const PERIOD_COLORS: Record<string, string> = {
  'Early Prehistoric': '#6B4423',
  'Late Prehistoric': '#8B7355',
  'Ancient': '#C4A882',
  'Classical': '#CD7F32',
  'Medieval': '#4A9E8E',
  'Renaissance': '#D4A54A',
  'Modern': '#B8C4D0',
}

function getPeriodColor(periodName: string): string {
  for (const [key, color] of Object.entries(PERIOD_COLORS)) {
    if (periodName.toLowerCase().includes(key.toLowerCase())) {
      return color
    }
  }
  return '#888888'
}

// =============================================================================
// COMPONENT
// =============================================================================

export default function GlobeInfoPanel({
  currentYear,
  activeConnections,
  activeRegions,
  activePeriods,
  hoveredArc,
  zoomedRegion,
  onCloseRegion,
}: GlobeInfoPanelProps) {
  const animatedConnections = useAnimatedCounter(activeConnections)
  const animatedRegions = useAnimatedCounter(activeRegions)
  const animatedPeriods = useAnimatedCounter(activePeriods)

  const isZoomed = zoomedRegion !== null

  return (
    <>
      {/* Arc Hover Tooltip */}
      {hoveredArc && (
        <ArcTooltip arc={hoveredArc} />
      )}

      {/* Main Panel */}
      <div
        className={[
          'absolute top-4 right-4 z-20',
          'bg-black/30 backdrop-blur-[8px] border border-white/10 rounded-xl',
          'shadow-lg shadow-black/20',
          'transition-all duration-500 ease-in-out',
          isZoomed ? 'w-72 p-0' : 'w-auto p-3',
        ].join(' ')}
      >
        {isZoomed && zoomedRegion ? (
          <RegionCard
            region={zoomedRegion}
            onClose={onCloseRegion}
          />
        ) : (
          <MiniStats
            connections={animatedConnections}
            regions={animatedRegions}
            periods={animatedPeriods}
            year={currentYear}
          />
        )}
      </div>
    </>
  )
}

// =============================================================================
// MINI STATS DASHBOARD
// =============================================================================

function MiniStats({
  connections,
  regions,
  periods,
  year,
}: {
  connections: number
  regions: number
  periods: number
  year: number
}) {
  return (
    <div className="flex items-center gap-4">
      <StatItem value={connections} label="connections" />
      <div className="w-px h-6 bg-white/10" />
      <StatItem value={regions} label="regions" />
      <div className="w-px h-6 bg-white/10" />
      <StatItem value={periods} label="active periods" />
    </div>
  )
}

function StatItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span
        className="font-mono text-lg font-semibold leading-none"
        style={{ color: 'var(--foreground)' }}
      >
        {value}
      </span>
      <span
        className="text-[10px] uppercase tracking-wider leading-none whitespace-nowrap"
        style={{ color: 'var(--muted-foreground)' }}
      >
        {label}
      </span>
    </div>
  )
}

// =============================================================================
// REGION CARD (ZOOMED STATE)
// =============================================================================

function RegionCard({
  region,
  onClose,
}: {
  region: NonNullable<GlobeInfoPanelProps['zoomedRegion']>
  onClose: () => void
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div
      className={[
        'transition-all duration-500 ease-out',
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2',
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-white/10">
        <h3
          className="text-sm font-semibold tracking-wide"
          style={{ color: 'var(--foreground)' }}
        >
          {region.name}
        </h3>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          style={{ color: 'var(--muted-foreground)' }}
          aria-label="Close region panel"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 2l8 8M10 2l-8 8" />
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="overflow-y-auto max-h-[50vh] px-4 py-3 space-y-4">
        {/* Connection Breakdown */}
        <div>
          <div
            className="font-mono text-xl font-bold"
            style={{ color: 'var(--foreground)' }}
          >
            {region.connectionCount}
            <span
              className="text-xs font-sans font-normal ml-1.5"
              style={{ color: 'var(--muted-foreground)' }}
            >
              connections
            </span>
          </div>
          <div
            className="text-xs mt-1 font-mono"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {region.inbound}&#8594; &middot; {region.outbound}&#8592;
          </div>
        </div>

        {/* Active Periods */}
        {region.activePeriods.length > 0 && (
          <div>
            <h4
              className="text-[10px] uppercase tracking-wider mb-2"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Active Periods
            </h4>
            <ul className="space-y-1.5">
              {region.activePeriods.map((period) => (
                <li key={period} className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: getPeriodColor(period) }}
                  />
                  <span
                    className="text-xs"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {period}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Iconic Buildings */}
        {region.iconicBuildings.length > 0 && (
          <div>
            <h4
              className="text-[10px] uppercase tracking-wider mb-2"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Notable Buildings
            </h4>
            <ul className="space-y-2">
              {region.iconicBuildings.map((building, i) => (
                <li key={`${building.name}-${i}`} className="flex flex-col">
                  <span
                    className="text-xs font-medium"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {building.name}
                  </span>
                  <span
                    className="text-[10px]"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {building.location} &middot; {building.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

// =============================================================================
// ARC HOVER TOOLTIP
// =============================================================================

function ArcTooltip({
  arc,
}: {
  arc: NonNullable<GlobeInfoPanelProps['hoveredArc']>
}) {
  const sourceDisplay = getRegionDisplayName(arc.sourceRegion)
  const targetDisplay = getRegionDisplayName(arc.targetRegion)

  return (
    <div
      className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
    >
      <div
        className="px-3 py-2 rounded-lg shadow-lg shadow-black/30 text-center"
        style={{ backgroundColor: arc.eraColor }}
      >
        <div className="text-xs font-semibold text-white leading-tight">
          {arc.sourcePeriodName} &#8594; {arc.targetPeriodName}
        </div>
        <div className="text-[10px] text-white/80 leading-tight mt-0.5">
          {formatYear(arc.startYear)} &middot; {arc.eraMaterial}
        </div>
        <div className="text-[10px] text-white/70 leading-tight mt-0.5">
          {sourceDisplay} &#8594; {targetDisplay}
        </div>
      </div>
    </div>
  )
}
