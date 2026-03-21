'use client'

import React, { useCallback, useMemo, useRef, useState } from 'react'
import { formatYear, ALL_ARCS, getEraColor } from '@/data/architecture/globeConnections'
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
// Periods become clickable chapters on the track (like YouTube chapters)
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
// Filter to avoid overlap — minimum gap between labels
// =============================================================================

interface PeriodLabel {
  period: PeriodDefinition
  pct: number
  above: boolean // true = above track, false = below
  color: string
}

const MIN_ROW_GAP_PCT = 4.0 // minimum % gap between labels on the SAME row

function buildLabels(): PeriodLabel[] {
  const sorted = [...ARCHITECTURAL_PERIODS].sort((a, b) => a.startYear - b.startYear)
  const labels: PeriodLabel[] = []
  let lastAbovePct = -Infinity
  let lastBelowPct = -Infinity

  for (const p of sorted) {
    const pct = yearToPercent(p.startYear)
    // Try to place on whichever row has more room; prefer above first
    const aboveOk = pct - lastAbovePct >= MIN_ROW_GAP_PCT
    const belowOk = pct - lastBelowPct >= MIN_ROW_GAP_PCT

    if (!aboveOk && !belowOk) continue

    // Pick the row with the most available gap
    const above = aboveOk && belowOk
      ? (pct - lastAbovePct) >= (pct - lastBelowPct)
      : aboveOk

    labels.push({
      period: p,
      pct,
      above,
      color: getEraColor(p.startYear),
    })

    if (above) lastAbovePct = pct
    else lastBelowPct = pct
  }
  return labels
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
      // Toggle: click same period to deselect
      onPeriodSelect(selectedPeriod?.id === period.id ? null : period)
      // Jump slider to the start of the period
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
        paddingTop: '32px',
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

      {/* ── LABELS ABOVE TRACK ── */}
      <div className="relative h-[38px] pointer-events-none mb-1">
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
            {/* Tick line down to track */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: '-4px',
                width: '1px',
                height: '10px',
                background: `${l.color}60`,
              }}
            />
            <div className="text-center whitespace-nowrap">
              <span
                className="text-[9px] md:text-[10px] font-bold block leading-tight"
                style={{ color: l.color }}
              >
                {l.period.shortName}
              </span>
              <span
                className="text-[7px] md:text-[8px] font-medium block leading-tight"
                style={{ color: 'rgba(255,255,255,0.35)' }}
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
            top: '-22px',
          }}
        >
          <span
            className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-md whitespace-nowrap backdrop-blur-sm border"
            style={{
              color: 'rgba(255,220,160,1)',
              background: 'rgba(0,0,0,0.8)',
              borderColor: 'rgba(212,165,74,0.3)',
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

            return (
              <button
                key={ch.period.id}
                className="relative h-full transition-all duration-150"
                style={{
                  width: `${widthPct}%`,
                  marginLeft: ch.startPct === yearToPercent(Math.max(ch.period.startYear, MIN_YEAR))
                    ? undefined : undefined,
                  left: `${ch.startPct}%`,
                  position: 'absolute',
                  background: isSelected
                    ? `${ch.color}`
                    : isHovered
                      ? `${ch.color}90`
                      : `${ch.color}55`,
                  borderRight: '1px solid rgba(0,0,0,0.4)',
                  opacity: isSelected ? 1 : isHovered ? 0.95 : 0.7,
                }}
                onClick={() => handleChapterClick(ch.period)}
                onMouseEnter={() => setHoveredChapter(ch.period.id)}
                onMouseLeave={() => setHoveredChapter(null)}
                title={`${ch.period.name} (${formatYear(ch.period.startYear)} – ${ch.period.ongoing ? 'Present' : formatYear(ch.period.endYear)})`}
                aria-label={`Select ${ch.period.name}`}
              >
                {/* Selected highlight bar */}
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

        {/* Hover tooltip for chapters */}
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
                top: '-44px',
              }}
            >
              <div
                className="px-2.5 py-1 rounded-md backdrop-blur-md whitespace-nowrap"
                style={{
                  background: 'rgba(0,0,0,0.85)',
                  border: `1px solid ${ch.color}60`,
                }}
              >
                <span className="text-[10px] font-bold" style={{ color: ch.color }}>
                  {ch.period.icon} {ch.period.shortName}
                </span>
                <span className="text-[9px] font-medium ml-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {formatYear(ch.period.startYear)}
                </span>
              </div>
            </div>
          )
        })()}

        {/* Range input (sits on top of chapters) */}
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
      <div className="relative h-[34px] mt-1 pointer-events-none">
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
            {/* Tick line up to track */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: '-4px',
                width: '1px',
                height: '10px',
                background: `${l.color}60`,
              }}
            />
            <div className="text-center whitespace-nowrap pt-1.5">
              <span
                className="text-[9px] md:text-[10px] font-bold block leading-tight"
                style={{ color: l.color }}
              >
                {l.period.shortName}
              </span>
              <span
                className="text-[7px] md:text-[8px] font-medium block leading-tight"
                style={{ color: 'rgba(255,255,255,0.35)' }}
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
