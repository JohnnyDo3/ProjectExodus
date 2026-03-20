'use client'

import React, { useCallback, useMemo, useRef } from 'react'
import { formatYear, getCurrentPeriodForYear, ALL_ARCS } from '@/data/architecture/globeConnections'

interface GlobeTimelineProps {
  currentYear: number
  onChange: (year: number) => void
}

// Timeline range: from first arc year to 2025
const MIN_YEAR = ALL_ARCS.length > 0 ? ALL_ARCS[0].startYear : -12000
const MAX_YEAR = 2025
const RANGE = MAX_YEAR - MIN_YEAR

// Coarser step — 14k year range doesn't need single-year precision
const STEP = 10

const ERA_SEGMENTS = [
  { label: 'Earth/Hide', color: '#6B4423', start: -12000, end: -6000 },
  { label: 'Bone/Wood', color: '#8B7355', start: -6000, end: -3500 },
  { label: 'Stone', color: '#C4A882', start: -3500, end: -500 },
  { label: 'Bronze', color: '#CD7F32', start: -500, end: 500 },
  { label: 'Copper', color: '#4A9E8E', start: 500, end: 1400 },
  { label: 'Gold', color: '#D4A54A', start: 1400, end: 1800 },
  { label: 'Steel', color: '#B8C4D0', start: 1800, end: 2025 },
] as const

const ERA_LABELS = [
  { label: 'Prehistoric', year: -9000 },
  { label: 'Ancient', year: -4000 },
  { label: 'Classical', year: -500 },
  { label: 'Medieval', year: 900 },
  { label: 'Renaissance', year: 1500 },
  { label: 'Modern', year: 1900 },
] as const

function yearToPercent(year: number): number {
  return ((year - MIN_YEAR) / RANGE) * 100
}

// Clamp thumb label so it doesn't overflow the track edges
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

function buildTrackGradient(): string {
  const stops = ERA_SEGMENTS
    .filter(seg => seg.end > MIN_YEAR)
    .map((seg) => {
      const startPct = yearToPercent(Math.max(seg.start, MIN_YEAR))
      const endPct = yearToPercent(seg.end)
      return `${seg.color} ${startPct}%, ${seg.color} ${endPct}%`
    })
  return `linear-gradient(to right, ${stops.join(', ')})`
}

export default function GlobeTimeline({
  currentYear,
  onChange,
}: GlobeTimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const thumbPercent = useMemo(() => yearToPercent(currentYear), [currentYear])
  const trackGradient = useMemo(() => buildTrackGradient(), [])
  const formattedYear = useMemo(() => formatYear(currentYear), [currentYear])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseInt(e.target.value, 10))
    },
    [onChange]
  )

  return (
    <div className="relative w-full rounded-xl bg-black/50 backdrop-blur-md border border-white/[0.06] px-4 pt-8 pb-2 md:px-5 select-none">
      <style jsx>{`
        .globe-timeline-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 10px;
          background: transparent;
          cursor: pointer;
          position: relative;
          z-index: 10;
          margin: 0;
        }

        .globe-timeline-range::-webkit-slider-runnable-track {
          height: 10px;
          background: transparent;
          border-radius: 5px;
        }

        .globe-timeline-range::-moz-range-track {
          height: 10px;
          background: transparent;
          border-radius: 5px;
          border: none;
        }

        .globe-timeline-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #D4A54A;
          border: 2px solid rgba(255,255,255,0.9);
          box-shadow: 0 0 10px rgba(212, 165, 74, 0.7), 0 0 20px rgba(212, 165, 74, 0.3);
          margin-top: -4px;
          cursor: grab;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .globe-timeline-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #D4A54A;
          border: 2px solid rgba(255,255,255,0.9);
          box-shadow: 0 0 10px rgba(212, 165, 74, 0.7), 0 0 20px rgba(212, 165, 74, 0.3);
          cursor: grab;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .globe-timeline-range::-webkit-slider-thumb:hover {
          box-shadow: 0 0 16px rgba(212, 165, 74, 1), 0 0 30px rgba(212, 165, 74, 0.5);
          transform: scale(1.2);
        }

        .globe-timeline-range::-moz-range-thumb:hover {
          box-shadow: 0 0 16px rgba(212, 165, 74, 1), 0 0 30px rgba(212, 165, 74, 0.5);
          transform: scale(1.2);
        }

        .globe-timeline-range:active::-webkit-slider-thumb {
          cursor: grabbing;
          transform: scale(1.1);
        }

        .globe-timeline-range:active::-moz-range-thumb {
          cursor: grabbing;
          transform: scale(1.1);
        }

        .globe-timeline-range:focus {
          outline: none;
        }

        .globe-timeline-range:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(212, 165, 74, 0.25), 0 0 10px rgba(212, 165, 74, 0.7);
        }

        .globe-timeline-range:focus::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(212, 165, 74, 0.25), 0 0 10px rgba(212, 165, 74, 0.7);
        }
      `}</style>

      {/* Slider area */}
      <div className="relative" ref={trackRef}>
        {/* Floating year label — pinned inside track bounds */}
        <div
          className="absolute -top-6 pointer-events-none"
          style={{
            left: clampedLabelLeft(thumbPercent),
            transform: labelTransform(thumbPercent),
            transition: 'left 0.08s ease-out',
          }}
        >
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-md whitespace-nowrap backdrop-blur-sm border"
            style={{
              color: 'rgba(255,220,160,1)',
              background: 'rgba(0,0,0,0.7)',
              borderColor: 'rgba(212,165,74,0.25)',
            }}
          >
            {formattedYear}
          </span>
        </div>

        {/* Era-colored track background */}
        <div
          className="absolute top-1/2 left-0 right-0 h-2.5 rounded-full overflow-hidden -translate-y-1/2 pointer-events-none"
          style={{ background: trackGradient }}
        >
          {/* Subtle sheen on played portion */}
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${thumbPercent}%`,
              background: 'linear-gradient(to right, transparent 30%, rgba(255,255,255,0.08))',
              transition: 'width 0.08s ease-out',
            }}
          />
        </div>

        {/* Range input */}
        <input
          type="range"
          min={MIN_YEAR}
          max={MAX_YEAR}
          step={STEP}
          value={currentYear}
          onChange={handleChange}
          className="globe-timeline-range relative z-10 w-full"
          aria-label={`Timeline: ${formattedYear}`}
          aria-valuemin={MIN_YEAR}
          aria-valuemax={MAX_YEAR}
          aria-valuenow={currentYear}
          aria-valuetext={formattedYear}
        />

        {/* Era labels below the track */}
        <div className="relative h-4 mt-0.5 pointer-events-none">
          {ERA_LABELS.filter(era => era.year >= MIN_YEAR).map((era) => {
            const pct = yearToPercent(era.year)
            return (
              <span
                key={era.label}
                className="absolute text-[9px] md:text-[10px] font-medium tracking-wide uppercase whitespace-nowrap"
                style={{
                  left: `${pct}%`,
                  transform: 'translateX(-50%)',
                  color: 'rgba(255,255,255,0.35)',
                }}
              >
                {era.label}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
