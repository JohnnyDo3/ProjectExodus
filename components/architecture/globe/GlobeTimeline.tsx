'use client'

import React, { useCallback, useMemo, useRef } from 'react'
import { formatYear, getCurrentPeriodForYear } from '@/data/architecture/globeConnections'

interface GlobeTimelineProps {
  currentYear: number
  onChange: (year: number) => void
  isPlaying: boolean
  onTogglePlay: () => void
  speed: number
  onSpeedChange: (speed: number) => void
}

const MIN_YEAR = -12000
const MAX_YEAR = 2025
const RANGE = MAX_YEAR - MIN_YEAR

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

const SPEEDS = [1, 2, 4] as const

function yearToPercent(year: number): number {
  return ((year - MIN_YEAR) / RANGE) * 100
}

function buildTrackGradient(): string {
  const stops = ERA_SEGMENTS.map((seg) => {
    const startPct = yearToPercent(seg.start)
    const endPct = yearToPercent(seg.end)
    return `${seg.color} ${startPct}%, ${seg.color} ${endPct}%`
  })
  return `linear-gradient(to right, ${stops.join(', ')})`
}

export default function GlobeTimeline({
  currentYear,
  onChange,
  isPlaying,
  onTogglePlay,
  speed,
  onSpeedChange,
}: GlobeTimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const thumbPercent = useMemo(() => yearToPercent(currentYear), [currentYear])
  const trackGradient = useMemo(() => buildTrackGradient(), [])
  const currentPeriod = useMemo(() => getCurrentPeriodForYear(currentYear), [currentYear])
  const formattedYear = useMemo(() => formatYear(currentYear), [currentYear])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseInt(e.target.value, 10))
    },
    [onChange]
  )

  return (
    <div className="relative w-full rounded-xl bg-black/40 backdrop-blur-sm px-4 py-3 select-none">
      <style jsx>{`
        .globe-timeline-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 8px;
          background: transparent;
          cursor: pointer;
          position: relative;
          z-index: 10;
          margin: 0;
        }

        .globe-timeline-range::-webkit-slider-runnable-track {
          height: 8px;
          background: transparent;
          border-radius: 4px;
        }

        .globe-timeline-range::-moz-range-track {
          height: 8px;
          background: transparent;
          border-radius: 4px;
          border: none;
        }

        .globe-timeline-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #D4A54A;
          border: 2px solid #ffffff;
          box-shadow: 0 0 8px rgba(212, 165, 74, 0.6), 0 2px 4px rgba(0, 0, 0, 0.3);
          margin-top: -6px;
          cursor: grab;
          transition: box-shadow 0.15s ease, transform 0.15s ease;
        }

        .globe-timeline-range::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #D4A54A;
          border: 2px solid #ffffff;
          box-shadow: 0 0 8px rgba(212, 165, 74, 0.6), 0 2px 4px rgba(0, 0, 0, 0.3);
          cursor: grab;
          transition: box-shadow 0.15s ease, transform 0.15s ease;
        }

        .globe-timeline-range::-webkit-slider-thumb:hover {
          box-shadow: 0 0 14px rgba(212, 165, 74, 0.9), 0 2px 6px rgba(0, 0, 0, 0.4);
          transform: scale(1.15);
        }

        .globe-timeline-range::-moz-range-thumb:hover {
          box-shadow: 0 0 14px rgba(212, 165, 74, 0.9), 0 2px 6px rgba(0, 0, 0, 0.4);
          transform: scale(1.15);
        }

        .globe-timeline-range:active::-webkit-slider-thumb {
          cursor: grabbing;
        }

        .globe-timeline-range:active::-moz-range-thumb {
          cursor: grabbing;
        }

        .globe-timeline-range:focus {
          outline: none;
        }

        .globe-timeline-range:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(212, 165, 74, 0.3), 0 0 8px rgba(212, 165, 74, 0.6);
        }

        .globe-timeline-range:focus::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(212, 165, 74, 0.3), 0 0 8px rgba(212, 165, 74, 0.6);
        }
      `}</style>

      {/* Controls row */}
      <div className="flex items-center gap-3">
        {/* Play/Pause button */}
        <button
          onClick={onTogglePlay}
          className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-150"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="1" width="3.5" height="12" rx="0.75" fill="#D4A54A" />
              <rect x="8.5" y="1" width="3.5" height="12" rx="0.75" fill="#D4A54A" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 1.5L12 7L3 12.5V1.5Z" fill="#D4A54A" />
            </svg>
          )}
        </button>

        {/* Speed buttons */}
        <div className="flex-shrink-0 flex items-center gap-1">
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-2 py-0.5 text-xs font-medium rounded transition-colors duration-150 ${
                speed === s
                  ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Slider area */}
        <div className="flex-1 relative" ref={trackRef}>
          {/* Floating year label */}
          <div
            className="absolute -top-7 pointer-events-none"
            style={{
              left: `${thumbPercent}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <span className="inline-block px-2 py-0.5 text-xs font-semibold text-amber-200 bg-black/60 rounded-md whitespace-nowrap backdrop-blur-sm border border-amber-500/20">
              {formattedYear}
            </span>
          </div>

          {/* Era-colored track background */}
          <div
            className="absolute top-1/2 left-0 right-0 h-2 rounded-full overflow-hidden -translate-y-1/2 pointer-events-none"
            style={{ background: trackGradient }}
          >
            {/* Played portion overlay for subtle glow */}
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${thumbPercent}%`,
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1))',
              }}
            />
          </div>

          {/* Range input */}
          <input
            type="range"
            min={MIN_YEAR}
            max={MAX_YEAR}
            step={1}
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
          <div className="relative h-5 mt-1 pointer-events-none">
            {ERA_LABELS.map((era) => {
              const pct = yearToPercent(era.year)
              return (
                <span
                  key={era.label}
                  className="absolute text-[10px] whitespace-nowrap"
                  style={{
                    left: `${pct}%`,
                    transform: 'translateX(-50%)',
                    color: 'var(--muted-foreground, rgba(255,255,255,0.45))',
                  }}
                >
                  {era.label}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      {/* Current period label */}
      {currentPeriod && (
        <div className="text-center mt-1">
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--foreground, rgba(255,255,255,0.9))' }}
          >
            {currentPeriod.name}
          </span>
          <span
            className="text-sm mx-2"
            style={{ color: 'var(--muted-foreground, rgba(255,255,255,0.4))' }}
          >
            &middot;
          </span>
          <span
            className="text-sm"
            style={{ color: 'var(--muted-foreground, rgba(255,255,255,0.5))' }}
          >
            {formattedYear}
          </span>
        </div>
      )}
    </div>
  )
}
