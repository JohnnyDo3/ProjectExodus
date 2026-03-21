'use client'

import { useState, useRef, useCallback } from 'react'
import type { PeriodDefinition } from '@/data/architecture/periods'
import { formatYear, getEraColor } from '@/data/architecture/globeConnections'

interface PeriodMarkerProps {
  period: PeriodDefinition
  leftPercent: number
  isSelected: boolean
  onClick: () => void
}

export function PeriodMarker({ period, leftPercent, isSelected, onClick }: PeriodMarkerProps) {
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const handleMouseEnter = useCallback(() => {
    clearTimeout(timerRef.current)
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    timerRef.current = setTimeout(() => setIsHovered(false), 150)
  }, [])

  const eraColor = getEraColor(period.startYear)
  const expanded = isHovered || isSelected

  return (
    <div
      className="absolute z-20"
      style={{
        left: `${leftPercent}%`,
        bottom: '100%',
        transform: 'translateX(-50%)',
      }}
    >
      {/* Vertical connecting line */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '-4px',
          width: '1px',
          height: expanded ? '20px' : '10px',
          background: `linear-gradient(to top, ${eraColor}, transparent)`,
          opacity: expanded ? 0.8 : 0.3,
          transition: 'height 0.3s ease, opacity 0.3s ease',
        }}
      />

      {/* Marker dot */}
      <button
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative flex items-center justify-center cursor-pointer"
        style={{
          marginBottom: expanded ? '16px' : '6px',
          transition: 'margin-bottom 0.3s ease',
        }}
        aria-label={`Select ${period.name} (${formatYear(period.startYear)})`}
      >
        {/* Glow ring */}
        {expanded && (
          <div
            className="absolute rounded-full"
            style={{
              width: '24px',
              height: '24px',
              background: `radial-gradient(circle, ${eraColor}40 0%, transparent 70%)`,
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        )}

        {/* Diamond shape */}
        <div
          style={{
            width: expanded ? '10px' : '6px',
            height: expanded ? '10px' : '6px',
            background: isSelected ? '#fff' : eraColor,
            border: isSelected ? `2px solid ${eraColor}` : 'none',
            borderRadius: '1px',
            transform: 'rotate(45deg)',
            boxShadow: expanded
              ? `0 0 8px ${eraColor}80, 0 0 16px ${eraColor}40`
              : 'none',
            transition: 'all 0.3s ease',
          }}
        />
      </button>

      {/* Holographic tooltip */}
      {expanded && (
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap"
          style={{
            bottom: '100%',
            marginBottom: '4px',
            animation: 'floatHolo 3s ease-in-out infinite',
          }}
        >
          <div
            className="relative px-2.5 py-1.5 rounded-md backdrop-blur-md"
            style={{
              background: 'rgba(0,0,0,0.75)',
              border: `1px solid ${eraColor}50`,
              boxShadow: `0 0 12px ${eraColor}20, inset 0 0 12px ${eraColor}08`,
            }}
          >
            {/* Scan line overlay */}
            <div
              className="absolute inset-0 rounded-md overflow-hidden pointer-events-none"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(212,165,74,0.03) 2px,
                  rgba(212,165,74,0.03) 4px
                )`,
              }}
            />

            <div className="relative flex items-center gap-1.5">
              <span className="text-sm">{period.icon}</span>
              <div>
                <div
                  className="text-[10px] font-semibold tracking-wide"
                  style={{ color: eraColor }}
                >
                  {period.shortName}
                </div>
                <div
                  className="text-[8px] font-medium tracking-wider uppercase"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  {formatYear(period.startYear)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes floatHolo {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-2px); }
        }
      `}</style>
    </div>
  )
}
