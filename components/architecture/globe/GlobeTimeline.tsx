'use client'

import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  formatYear,
  ALL_ARCS,
  getEraColor,
  ERA_TIERS,
  getEraTier,
  getArcsForYear,
  getPointsForYear,
  getCurrentPeriodForYear,
} from '@/data/architecture/globeConnections'
import { ARCHITECTURAL_PERIODS, type PeriodDefinition } from '@/data/architecture/periods'

interface GlobeTimelineProps {
  currentYear: number
  onChange: (year: number) => void
  selectedPeriod?: PeriodDefinition | null
  onPeriodSelect?: (period: PeriodDefinition | null) => void
}

// Timeline range
const MIN_YEAR = ALL_ARCS.length > 0 ? ALL_ARCS[0].startYear : -12000
const MAX_YEAR = 2025
const RANGE = MAX_YEAR - MIN_YEAR
const STEP = 10

function yearToPercent(year: number): number {
  return ((year - MIN_YEAR) / RANGE) * 100
}

function clampedLabelLeft(pct: number): string {
  if (pct < 6) return '0%'
  if (pct > 94) return '100%'
  return `${pct}%`
}

function labelTransform(pct: number): string {
  if (pct < 6) return 'translateX(0)'
  if (pct > 94) return 'translateX(-100%)'
  return 'translateX(-50%)'
}

// =============================================================================
// Build chapter segments from architectural periods
// =============================================================================

interface Chapter {
  period: PeriodDefinition
  startPct: number
  endPct: number
  color: string
}

function buildChapters(): Chapter[] {
  const sorted = [...ARCHITECTURAL_PERIODS].sort((a, b) => a.startYear - b.startYear)
  return sorted.map((p) => ({
    period: p,
    startPct: yearToPercent(Math.max(p.startYear, MIN_YEAR)),
    endPct: yearToPercent(Math.min(p.endYear, MAX_YEAR)),
    color: getEraColor(p.startYear),
  }))
}

// =============================================================================
// Build period labels for above/below alternating display
// =============================================================================

interface PeriodLabel {
  period: PeriodDefinition
  pct: number
  above: boolean
  color: string
}

const MIN_ROW_GAP_PCT = 4.0

function buildLabels(): PeriodLabel[] {
  const sorted = [...ARCHITECTURAL_PERIODS].sort((a, b) => a.startYear - b.startYear)
  const labels: PeriodLabel[] = []
  let lastAbovePct = -Infinity
  let lastBelowPct = -Infinity

  for (const p of sorted) {
    const pct = yearToPercent(p.startYear)
    const aboveOk = pct - lastAbovePct >= MIN_ROW_GAP_PCT
    const belowOk = pct - lastBelowPct >= MIN_ROW_GAP_PCT

    if (!aboveOk && !belowOk) continue

    const above = aboveOk && belowOk
      ? (pct - lastAbovePct) >= (pct - lastBelowPct)
      : aboveOk

    labels.push({ period: p, pct, above, color: getEraColor(p.startYear) })

    if (above) lastAbovePct = pct
    else lastBelowPct = pct
  }
  return labels
}

// =============================================================================
// Build era segments for the material bar
// =============================================================================

interface EraSegment {
  name: string
  material: string
  color: string
  startPct: number
  endPct: number
  labelPct: number
}

function buildEraSegments(): EraSegment[] {
  return ERA_TIERS.map((t) => {
    const startPct = yearToPercent(Math.max(t.minYear, MIN_YEAR))
    const endPct = yearToPercent(Math.min(t.maxYear, MAX_YEAR))
    return {
      name: t.name,
      material: t.material,
      color: t.color,
      startPct,
      endPct,
      labelPct: (startPct + endPct) / 2,
    }
  })
}

// =============================================================================
// Component
// =============================================================================

export default function GlobeTimeline({
  currentYear,
  onChange,
  selectedPeriod,
  onPeriodSelect,
}: GlobeTimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null)

  const thumbPercent = useMemo(() => yearToPercent(currentYear), [currentYear])
  const formattedYear = useMemo(() => formatYear(currentYear), [currentYear])
  const chapters = useMemo(() => buildChapters(), [])
  const labels = useMemo(() => buildLabels(), [])
  const eraSegments = useMemo(() => buildEraSegments(), [])

  // Live stats for the current year
  const activePeriod = useMemo(() => getCurrentPeriodForYear(currentYear), [currentYear])
  const currentEra = useMemo(() => getEraTier(currentYear), [currentYear])
  const arcCount = useMemo(() => getArcsForYear(currentYear).length, [currentYear])
  const regionCount = useMemo(() => getPointsForYear(currentYear).length, [currentYear])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseInt(e.target.value, 10))
    },
    [onChange],
  )

  const handleTouchStart = useCallback(() => {
    try { navigator.vibrate?.(8) } catch {}
  }, [])

  const handleChapterClick = useCallback(
    (period: PeriodDefinition) => {
      if (!onPeriodSelect) return
      onPeriodSelect(selectedPeriod?.id === period.id ? null : period)
      onChange(period.startYear)
    },
    [onPeriodSelect, selectedPeriod, onChange],
  )

  return (
    <div
      className="relative w-full bg-black/60 backdrop-blur-md px-4 pb-2 md:px-5 select-none"
      style={{
        borderTop: '1px solid rgba(212,165,74,0.3)',
        borderLeft: '1px solid rgba(212,165,74,0.1)',
        borderRight: '1px solid rgba(212,165,74,0.1)',
        borderBottom: '1px solid rgba(212,165,74,0.05)',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 2% 100%, 0 85%)',
        paddingTop: '10px',
      }}
    >
      <style jsx>{`
        .globe-timeline-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 14px;
          background: transparent;
          cursor: pointer;
          position: relative;
          z-index: 15;
          margin: 0;
          touch-action: pan-x;
        }
        .globe-timeline-range::-webkit-slider-runnable-track {
          height: 14px;
          background: transparent;
          border-radius: 7px;
        }
        .globe-timeline-range::-moz-range-track {
          height: 14px;
          background: transparent;
          border-radius: 7px;
          border: none;
        }
        .globe-timeline-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #D4A54A;
          border: 2px solid rgba(255,255,255,0.9);
          box-shadow: 0 0 10px rgba(212,165,74,0.7), 0 0 20px rgba(212,165,74,0.3);
          margin-top: -3px;
          cursor: grab;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .globe-timeline-range::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #D4A54A;
          border: 2px solid rgba(255,255,255,0.9);
          box-shadow: 0 0 10px rgba(212,165,74,0.7), 0 0 20px rgba(212,165,74,0.3);
          cursor: grab;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .globe-timeline-range::-webkit-slider-thumb:hover {
          box-shadow: 0 0 16px rgba(212,165,74,1), 0 0 30px rgba(212,165,74,0.5);
          transform: scale(1.15);
        }
        .globe-timeline-range::-moz-range-thumb:hover {
          box-shadow: 0 0 16px rgba(212,165,74,1), 0 0 30px rgba(212,165,74,0.5);
          transform: scale(1.15);
        }
        .globe-timeline-range:active::-webkit-slider-thumb { cursor: grabbing; transform: scale(1.05); }
        .globe-timeline-range:active::-moz-range-thumb { cursor: grabbing; transform: scale(1.05); }
        .globe-timeline-range:focus { outline: none; }
        .globe-timeline-range:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(212,165,74,0.25), 0 0 10px rgba(212,165,74,0.7);
        }
        .globe-timeline-range:focus::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(212,165,74,0.25), 0 0 10px rgba(212,165,74,0.7);
        }
      `}</style>

      {/* ── ACTIVE PERIOD STRIP ── */}
      <div className="flex items-center justify-between gap-3 mb-2 px-1 min-h-[24px]">
        {/* Left: Active period info */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {activePeriod ? (
            <>
              <span className="text-sm md:text-base flex-shrink-0">{activePeriod.icon}</span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-[11px] md:text-xs font-bold truncate"
                    style={{ color: activePeriod.color }}
                  >
                    {activePeriod.name}
                  </span>
                  <span
                    className="text-[9px] font-medium flex-shrink-0"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    {formatYear(activePeriod.startYear)} – {activePeriod.ongoing ? 'Present' : formatYear(activePeriod.endYear)}
                  </span>
                </div>
                <p
                  className="text-[9px] leading-tight truncate hidden sm:block"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {activePeriod.funFact.slice(0, 90)}{activePeriod.funFact.length > 90 ? '…' : ''}
                </p>
              </div>
            </>
          ) : (
            <span
              className="text-[10px] font-medium tracking-wider uppercase"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Slide to explore
            </span>
          )}
        </div>

        {/* Right: Live stats */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <div className="flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(212,165,74,0.6)" strokeWidth="2">
                <path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span className="text-[10px] font-bold tabular-nums" style={{ color: 'rgba(212,165,74,0.8)' }}>
                {regionCount}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(212,165,74,0.6)" strokeWidth="2">
                <path d="M4 12h16M12 4l8 8-8 8" />
              </svg>
              <span className="text-[10px] font-bold tabular-nums" style={{ color: 'rgba(212,165,74,0.8)' }}>
                {arcCount}
              </span>
            </div>
          </div>
          <div
            className="px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wide uppercase"
            style={{
              color: currentEra.color,
              background: `${currentEra.color}15`,
              border: `1px solid ${currentEra.color}30`,
            }}
          >
            {currentEra.material}
          </div>
        </div>
      </div>

      {/* ── ERA MATERIAL BAR ── */}
      <div className="relative h-[14px] mb-1 rounded-full overflow-hidden flex">
        {eraSegments.map((seg) => {
          const widthPct = seg.endPct - seg.startPct
          if (widthPct <= 0) return null
          const isCurrent = currentYear >= ERA_TIERS.find(t => t.material === seg.material)!.minYear &&
                           currentYear <= ERA_TIERS.find(t => t.material === seg.material)!.maxYear
          return (
            <div
              key={seg.material}
              className="relative h-full flex items-center justify-center overflow-hidden"
              style={{
                width: `${widthPct}%`,
                background: isCurrent ? `${seg.color}30` : `${seg.color}12`,
                borderRight: '1px solid rgba(0,0,0,0.3)',
                transition: 'background 0.3s ease',
              }}
            >
              {widthPct > 6 && (
                <span
                  className="text-[7px] md:text-[8px] font-bold tracking-wider uppercase whitespace-nowrap"
                  style={{
                    color: isCurrent ? `${seg.color}` : `${seg.color}60`,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {seg.material}
                </span>
              )}
            </div>
          )
        })}
        {/* Playhead line on era bar */}
        <div
          className="absolute top-0 bottom-0 w-px z-10"
          style={{
            left: `${thumbPercent}%`,
            background: 'rgba(255,255,255,0.6)',
            transition: 'left 0.08s ease-out',
          }}
        />
      </div>

      {/* ── LABELS ABOVE TRACK ── */}
      <div className="relative h-[28px] pointer-events-none mb-0.5">
        {labels.filter(l => l.above).map((l) => (
          <div
            key={l.period.id}
            className="absolute"
            style={{
              left: `${l.pct}%`,
              bottom: 0,
              transform: 'translateX(-50%)',
            }}
          >
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: '-4px',
                width: '1px',
                height: '8px',
                background: `${l.color}60`,
              }}
            />
            <div className="text-center whitespace-nowrap">
              <span
                className="text-[8px] md:text-[9px] font-bold block leading-tight"
                style={{ color: l.color }}
              >
                {l.period.shortName}
              </span>
              <span
                className="text-[6px] md:text-[7px] font-medium block leading-tight"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {formatYear(l.period.startYear)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── SLIDER AREA ── */}
      <div className="relative" ref={trackRef}>
        {/* Floating year label */}
        <div
          className="absolute pointer-events-none z-20"
          style={{
            left: clampedLabelLeft(thumbPercent),
            transform: labelTransform(thumbPercent),
            transition: 'left 0.08s ease-out',
            top: '-18px',
          }}
        >
          <span
            className="inline-block px-2 py-0.5 text-[11px] font-bold rounded-md whitespace-nowrap backdrop-blur-sm border tabular-nums"
            style={{
              color: 'rgba(255,220,160,1)',
              background: 'rgba(0,0,0,0.85)',
              borderColor: 'rgba(212,165,74,0.4)',
              boxShadow: '0 0 8px rgba(212,165,74,0.15)',
            }}
          >
            {formattedYear}
          </span>
        </div>

        {/* Chapter segments (YouTube-style clickable sections) */}
        <div className="absolute top-1/2 left-0 right-0 h-3.5 -translate-y-1/2 rounded-full overflow-hidden flex z-[5]">
          {chapters.map((ch) => {
            const widthPct = ch.endPct - ch.startPct
            if (widthPct <= 0) return null
            const isSelected = selectedPeriod?.id === ch.period.id
            const isHovered = hoveredChapter === ch.period.id
            const isActive = activePeriod?.id === ch.period.id && !selectedPeriod

            return (
              <button
                key={ch.period.id}
                className="relative h-full transition-all duration-150"
                style={{
                  width: `${widthPct}%`,
                  left: `${ch.startPct}%`,
                  position: 'absolute',
                  background: isSelected
                    ? `${ch.color}`
                    : isActive
                      ? `${ch.color}A0`
                      : isHovered
                        ? `${ch.color}90`
                        : `${ch.color}55`,
                  borderRight: '1px solid rgba(0,0,0,0.4)',
                  opacity: isSelected ? 1 : isActive ? 0.95 : isHovered ? 0.9 : 0.7,
                }}
                onClick={() => handleChapterClick(ch.period)}
                onMouseEnter={() => setHoveredChapter(ch.period.id)}
                onMouseLeave={() => setHoveredChapter(null)}
                title={`${ch.period.name} (${formatYear(ch.period.startYear)} – ${ch.period.ongoing ? 'Present' : formatYear(ch.period.endYear)})`}
                aria-label={`Select ${ch.period.name}`}
              >
                {isSelected && (
                  <div
                    className="absolute inset-0"
                    style={{
                      boxShadow: `inset 0 0 8px ${ch.color}, 0 0 6px ${ch.color}80`,
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Enhanced hover tooltip for chapters */}
        {hoveredChapter && (() => {
          const ch = chapters.find(c => c.period.id === hoveredChapter)
          if (!ch) return null
          const centerPct = (ch.startPct + ch.endPct) / 2
          return (
            <div
              className="absolute z-30 pointer-events-none"
              style={{
                left: clampedLabelLeft(centerPct),
                transform: labelTransform(centerPct),
                top: '-68px',
              }}
            >
              <div
                className="px-3 py-2 rounded-lg backdrop-blur-md whitespace-nowrap"
                style={{
                  background: 'rgba(0,0,0,0.9)',
                  border: `1px solid ${ch.color}50`,
                  boxShadow: `0 0 15px ${ch.color}15`,
                }}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs">{ch.period.icon}</span>
                  <span className="text-[11px] font-bold" style={{ color: ch.color }}>
                    {ch.period.shortName}
                  </span>
                  <span className="text-[9px] font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {formatYear(ch.period.startYear)} – {ch.period.ongoing ? 'Present' : formatYear(ch.period.endYear)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[8px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {ch.period.primaryRegions.filter(r => r !== 'global').length} regions
                  </span>
                  <span className="text-[8px]" style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                  <span className="text-[8px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {ch.period.keyCharacteristics[0]}
                  </span>
                </div>
              </div>
            </div>
          )
        })()}

        {/* Range input */}
        <input
          type="range"
          min={MIN_YEAR}
          max={MAX_YEAR}
          step={STEP}
          value={currentYear}
          onChange={handleChange}
          onInput={handleChange as any}
          onTouchStart={handleTouchStart}
          className="globe-timeline-range relative z-10 w-full"
          aria-label={`Timeline: ${formattedYear}`}
          aria-valuemin={MIN_YEAR}
          aria-valuemax={MAX_YEAR}
          aria-valuenow={currentYear}
          aria-valuetext={formattedYear}
        />
      </div>

      {/* ── LABELS BELOW TRACK ── */}
      <div className="relative h-[26px] mt-0.5 pointer-events-none">
        {labels.filter(l => !l.above).map((l) => (
          <div
            key={l.period.id}
            className="absolute"
            style={{
              left: `${l.pct}%`,
              top: 0,
              transform: 'translateX(-50%)',
            }}
          >
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: '-4px',
                width: '1px',
                height: '8px',
                background: `${l.color}60`,
              }}
            />
            <div className="text-center whitespace-nowrap pt-1">
              <span
                className="text-[8px] md:text-[9px] font-bold block leading-tight"
                style={{ color: l.color }}
              >
                {l.period.shortName}
              </span>
              <span
                className="text-[6px] md:text-[7px] font-medium block leading-tight"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {formatYear(l.period.startYear)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
