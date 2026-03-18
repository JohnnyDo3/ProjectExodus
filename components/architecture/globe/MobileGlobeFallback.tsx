'use client'

import { useMemo } from 'react'
import {
  formatYear,
  getCurrentPeriodForYear,
  getArcsForYear,
  getPointsForYear,
  REGION_CENTROIDS,
  ERA_TIERS,
  getEraTier,
} from '@/data/architecture/globeConnections'

// =============================================================================
// Simple Mercator projection helpers
// =============================================================================

function toX(lng: number, width: number): number {
  return ((lng + 180) / 360) * width
}

function toY(lat: number, height: number): number {
  return ((90 - lat) / 180) * height
}

// =============================================================================
// Mobile Globe Fallback — flat map with arcs
// =============================================================================

interface MobileGlobeFallbackProps {
  currentYear: number
  onRegionClick?: (region: string) => void
}

export default function MobileGlobeFallback({
  currentYear,
  onRegionClick,
}: MobileGlobeFallbackProps) {
  const arcs = useMemo(() => getArcsForYear(currentYear), [currentYear])
  const points = useMemo(() => getPointsForYear(currentYear), [currentYear])
  const period = useMemo(() => getCurrentPeriodForYear(currentYear), [currentYear])
  const eraTier = useMemo(() => getEraTier(currentYear), [currentYear])

  const W = 360
  const H = 200

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      {/* Stylized globe circle with map projection inside */}
      <div
        className="relative w-full max-w-sm aspect-square rounded-full overflow-hidden border-2"
        style={{ borderColor: `${eraTier.color}40` }}
      >
        {/* Dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />

        {/* Grid lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Longitude lines */}
          {[-120, -60, 0, 60, 120].map((lng) => (
            <line
              key={`lng-${lng}`}
              x1={toX(lng, W)}
              y1={0}
              x2={toX(lng, W)}
              y2={H}
              stroke="rgba(212,165,74,0.1)"
              strokeWidth={0.5}
            />
          ))}

          {/* Latitude lines */}
          {[-60, -30, 0, 30, 60].map((lat) => (
            <line
              key={`lat-${lat}`}
              x1={0}
              y1={toY(lat, H)}
              x2={W}
              y2={toY(lat, H)}
              stroke="rgba(212,165,74,0.1)"
              strokeWidth={0.5}
            />
          ))}

          {/* Arcs (curved lines between regions) */}
          {arcs.slice(-30).map((arc) => {
            const x1 = toX(arc.fromLng, W)
            const y1 = toY(arc.fromLat, H)
            const x2 = toX(arc.toLng, W)
            const y2 = toY(arc.toLat, H)
            const midY = Math.min(y1, y2) - 15

            return (
              <path
                key={arc.id}
                d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${midY} ${x2} ${y2}`}
                fill="none"
                stroke={arc.eraColor}
                strokeWidth={0.8}
                strokeOpacity={0.6}
              />
            )
          })}

          {/* Region points */}
          {points.map((point) => (
            <g key={point.region}>
              {/* Glow */}
              <circle
                cx={toX(point.lng, W)}
                cy={toY(point.lat, H)}
                r={Math.max(3, Math.min(6, point.connectionCount * 0.5))}
                fill={eraTier.color}
                fillOpacity={0.2}
              />
              {/* Dot */}
              <circle
                cx={toX(point.lng, W)}
                cy={toY(point.lat, H)}
                r={Math.max(1.5, Math.min(3, point.connectionCount * 0.25))}
                fill={eraTier.color}
                className="cursor-pointer"
                onClick={() => onRegionClick?.(point.region)}
              />
            </g>
          ))}
        </svg>

        {/* Atmosphere glow */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${eraTier.color}10 0%, transparent 60%)`,
            boxShadow: `inset 0 0 40px ${eraTier.color}15`,
          }}
        />
      </div>

      {/* Period info overlay */}
      {period && (
        <div className="mt-4 text-center">
          <p className="text-sm font-medium" style={{ color: eraTier.color }}>
            {period.name}
          </p>
          <p className="text-xs text-white/50">
            {formatYear(currentYear)} · {eraTier.material} Era
          </p>
        </div>
      )}
    </div>
  )
}
