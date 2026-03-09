'use client'

import { memo, useMemo } from 'react'

// Pixel-art aquatic decorations for the fishbowl floor

// Sandy bottom with varied texture
export const SandyBottom = memo(() => (
  <svg className="absolute bottom-0 left-0 w-full" height="80" preserveAspectRatio="none" viewBox="0 0 800 80" shapeRendering="crispEdges">
    {/* Base sand */}
    <rect x="0" y="20" width="800" height="60" fill="#C4A862" />
    <rect x="0" y="15" width="800" height="10" fill="#D4B872" />
    {/* Sand dunes / undulation */}
    <rect x="0" y="12" width="60" height="4" fill="#D4B872" />
    <rect x="50" y="8" width="80" height="6" fill="#D4B872" />
    <rect x="120" y="10" width="40" height="6" fill="#D4B872" />
    <rect x="180" y="6" width="100" height="10" fill="#D4B872" />
    <rect x="300" y="10" width="60" height="6" fill="#D4B872" />
    <rect x="380" y="5" width="90" height="12" fill="#D4B872" />
    <rect x="500" y="8" width="70" height="8" fill="#D4B872" />
    <rect x="580" y="12" width="50" height="4" fill="#D4B872" />
    <rect x="650" y="6" width="80" height="10" fill="#D4B872" />
    <rect x="740" y="10" width="60" height="6" fill="#D4B872" />
    {/* Sand detail pixels - darker grains */}
    {[30, 95, 150, 220, 290, 340, 420, 490, 560, 630, 710, 770].map((x, i) => (
      <rect key={`grain-${i}`} x={x} y={22 + (i % 3) * 8} width="3" height="3" fill="#B89B52" opacity="0.5" />
    ))}
    {[60, 125, 200, 270, 350, 450, 530, 600, 680, 750].map((x, i) => (
      <rect key={`grain2-${i}`} x={x} y={30 + (i % 4) * 6} width="2" height="2" fill="#A88B42" opacity="0.4" />
    ))}
    {/* Tiny shells */}
    <rect x="110" y="24" width="4" height="3" fill="#E8D5B0" rx="1" />
    <rect x="450" y="22" width="5" height="3" fill="#F0E0C0" rx="1" />
    <rect x="690" y="26" width="4" height="3" fill="#E8D5B0" rx="1" />
  </svg>
))
SandyBottom.displayName = 'SandyBottom'

// Pixel-art rock
interface RockProps {
  x: number
  y: number
  variant?: 'small' | 'medium' | 'large'
  color?: string
}

export const Rock = memo(({ x, y, variant = 'medium', color = '#6B7280' }: RockProps) => {
  const darker = color === '#6B7280' ? '#4B5563' : '#5A6370'
  const lighter = color === '#6B7280' ? '#9CA3AF' : '#8B939F'

  if (variant === 'small') {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect x="2" y="4" width="8" height="4" fill={color} />
        <rect x="4" y="2" width="4" height="2" fill={lighter} />
        <rect x="3" y="4" width="2" height="2" fill={lighter} opacity="0.5" />
      </g>
    )
  }

  if (variant === 'large') {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect x="4" y="8" width="24" height="8" fill={color} />
        <rect x="6" y="4" width="20" height="6" fill={color} />
        <rect x="10" y="2" width="12" height="4" fill={lighter} />
        <rect x="8" y="6" width="4" height="4" fill={lighter} opacity="0.4" />
        <rect x="18" y="8" width="6" height="4" fill={darker} opacity="0.3" />
        {/* Moss spots */}
        <rect x="6" y="6" width="3" height="2" fill="#5D8A3C" opacity="0.6" />
        <rect x="20" y="4" width="4" height="2" fill="#5D8A3C" opacity="0.4" />
      </g>
    )
  }

  // medium
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="2" y="6" width="16" height="6" fill={color} />
      <rect x="4" y="4" width="12" height="4" fill={color} />
      <rect x="6" y="2" width="8" height="4" fill={lighter} />
      <rect x="5" y="5" width="3" height="3" fill={lighter} opacity="0.4" />
      <rect x="12" y="6" width="4" height="3" fill={darker} opacity="0.3" />
    </g>
  )
})
Rock.displayName = 'Rock'

// Pixel-art Kelp/Seaweed - animated swaying
interface KelpProps {
  x: number
  height?: number
  variant?: 'thin' | 'wide' | 'bushy'
  color?: string
  delay?: number
}

export const Kelp = memo(({ x, height = 60, variant = 'thin', color = '#2E7D32', delay = 0 }: KelpProps) => {
  const lighter = '#4CAF50'
  const darker = '#1B5E20'

  return (
    <g
      style={{
        animation: `kelpSway 4s ease-in-out ${delay}s infinite`,
        transformOrigin: `${x + 4}px 100%`,
      }}
    >
      {variant === 'thin' && (
        <>
          {Array.from({ length: Math.floor(height / 6) }, (_, i) => (
            <g key={i}>
              <rect
                x={x + (i % 2 === 0 ? 0 : 2)}
                y={100 - (i + 1) * 6}
                width="4"
                height="6"
                fill={i % 3 === 0 ? lighter : color}
              />
              {i % 2 === 0 && (
                <rect
                  x={x + (i % 4 === 0 ? -3 : 6)}
                  y={100 - (i + 1) * 6 + 1}
                  width="4"
                  height="3"
                  fill={lighter}
                  opacity="0.7"
                />
              )}
            </g>
          ))}
        </>
      )}
      {variant === 'wide' && (
        <>
          {Array.from({ length: Math.floor(height / 6) }, (_, i) => (
            <g key={i}>
              <rect
                x={x + (i % 2 === 0 ? -1 : 1)}
                y={100 - (i + 1) * 6}
                width="8"
                height="6"
                fill={i % 3 === 0 ? lighter : color}
              />
              {i % 3 === 0 && (
                <>
                  <rect x={x - 4 + (i % 2) * 2} y={100 - (i + 1) * 6} width="4" height="4" fill={lighter} opacity="0.6" />
                  <rect x={x + 8 - (i % 2) * 2} y={100 - (i + 1) * 6 + 1} width="4" height="4" fill={color} opacity="0.7" />
                </>
              )}
            </g>
          ))}
        </>
      )}
      {variant === 'bushy' && (
        <>
          {Array.from({ length: Math.floor(height / 5) }, (_, i) => {
            const spread = Math.min(i * 0.5, 4)
            return (
              <g key={i}>
                <rect
                  x={x - spread + (i % 2)}
                  y={100 - (i + 1) * 5}
                  width={6 + spread * 2}
                  height="5"
                  fill={i % 2 === 0 ? color : darker}
                />
                {i % 2 === 0 && (
                  <rect
                    x={x + 1}
                    y={100 - (i + 1) * 5}
                    width="3"
                    height="3"
                    fill={lighter}
                    opacity="0.5"
                  />
                )}
              </g>
            )
          })}
        </>
      )}
    </g>
  )
})
Kelp.displayName = 'Kelp'

// Pixel-art coral
interface CoralProps {
  x: number
  y: number
  variant?: 'branch' | 'brain' | 'fan'
  color?: string
}

export const Coral = memo(({ x, y, variant = 'branch', color = '#E91E63' }: CoralProps) => {
  const lighter = '#F48FB1'

  if (variant === 'branch') {
    return (
      <g transform={`translate(${x}, ${y})`}>
        {/* Base */}
        <rect x="6" y="16" width="8" height="4" fill={color} />
        {/* Trunk */}
        <rect x="8" y="10" width="4" height="6" fill={color} />
        {/* Branches */}
        <rect x="4" y="6" width="4" height="6" fill={color} />
        <rect x="12" y="4" width="4" height="8" fill={color} />
        <rect x="2" y="2" width="4" height="4" fill={lighter} />
        <rect x="14" y="0" width="4" height="4" fill={lighter} />
        <rect x="8" y="6" width="4" height="4" fill={lighter} opacity="0.5" />
        {/* Tips */}
        <rect x="3" y="0" width="2" height="2" fill={lighter} opacity="0.7" />
        <rect x="15" y="-2" width="2" height="2" fill={lighter} opacity="0.7" />
      </g>
    )
  }

  if (variant === 'brain') {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect x="4" y="8" width="16" height="8" fill={color} />
        <rect x="6" y="4" width="12" height="6" fill={color} />
        <rect x="8" y="2" width="8" height="4" fill={lighter} />
        {/* Brain ridges */}
        <rect x="8" y="6" width="8" height="1" fill={lighter} opacity="0.4" />
        <rect x="6" y="10" width="12" height="1" fill={lighter} opacity="0.4" />
        <rect x="8" y="14" width="8" height="1" fill={lighter} opacity="0.3" />
      </g>
    )
  }

  // fan
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Stem */}
      <rect x="8" y="14" width="4" height="6" fill={color} />
      {/* Fan spread */}
      <rect x="2" y="6" width="16" height="8" fill={color} opacity="0.8" />
      <rect x="4" y="2" width="12" height="6" fill={lighter} opacity="0.6" />
      <rect x="6" y="0" width="8" height="4" fill={lighter} opacity="0.4" />
      {/* Holes in fan */}
      <rect x="6" y="8" width="2" height="2" fill="transparent" />
      <rect x="12" y="6" width="2" height="2" fill="transparent" />
      <rect x="8" y="4" width="2" height="2" fill="transparent" />
    </g>
  )
})
Coral.displayName = 'Coral'

// Bubbles - rising animation
interface BubbleStreamProps {
  x: number
  count?: number
}

export const BubbleStream = memo(({ x, count = 3 }: BubbleStreamProps) => (
  <g>
    {Array.from({ length: count }, (_, i) => (
      <circle
        key={i}
        cx={x + (i % 2) * 4}
        cy={0}
        r={2 + (i % 2)}
        fill="rgba(255, 255, 255, 0.3)"
        stroke="rgba(255, 255, 255, 0.5)"
        strokeWidth="0.5"
        style={{
          animation: `bubbleRise ${3 + i * 0.7}s ease-in ${i * 1.2}s infinite`,
        }}
      />
    ))}
  </g>
))
BubbleStream.displayName = 'BubbleStream'

// Complete decoration layer for the fishbowl floor
export const DecorationLayer = memo(({ width }: { width: number }) => {
  const scale = width / 800

  const decorations = useMemo(() => ({
    rocks: [
      { x: 50, y: 76, variant: 'large' as const, color: '#6B7280' },
      { x: 200, y: 82, variant: 'medium' as const, color: '#78716C' },
      { x: 380, y: 80, variant: 'small' as const, color: '#6B7280' },
      { x: 520, y: 78, variant: 'large' as const, color: '#57534E' },
      { x: 680, y: 82, variant: 'medium' as const, color: '#78716C' },
    ],
    kelps: [
      { x: 30, height: 55, variant: 'bushy' as const, color: '#2E7D32', delay: 0 },
      { x: 100, height: 40, variant: 'thin' as const, color: '#388E3C', delay: 0.5 },
      { x: 160, height: 50, variant: 'wide' as const, color: '#2E7D32', delay: 1 },
      { x: 420, height: 45, variant: 'thin' as const, color: '#388E3C', delay: 1.5 },
      { x: 550, height: 60, variant: 'bushy' as const, color: '#1B5E20', delay: 0.3 },
      { x: 630, height: 35, variant: 'thin' as const, color: '#388E3C', delay: 2 },
      { x: 740, height: 50, variant: 'wide' as const, color: '#2E7D32', delay: 0.8 },
    ],
    corals: [
      { x: 260, y: 72, variant: 'branch' as const, color: '#E91E63' },
      { x: 460, y: 74, variant: 'fan' as const, color: '#FF5722' },
      { x: 600, y: 70, variant: 'brain' as const, color: '#E91E63' },
    ],
    bubbles: [
      { x: 80, count: 3 },
      { x: 340, count: 2 },
      { x: 570, count: 4 },
      { x: 720, count: 2 },
    ],
  }), [])

  return (
    <div className="absolute bottom-0 left-0 w-full" style={{ height: '120px' }}>
      <SandyBottom />
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox={`0 0 800 100`}
        preserveAspectRatio="xMidYMax meet"
        shapeRendering="crispEdges"
      >
        {decorations.kelps.map((k, i) => (
          <Kelp key={`kelp-${i}`} {...k} />
        ))}
        {decorations.rocks.map((r, i) => (
          <Rock key={`rock-${i}`} {...r} />
        ))}
        {decorations.corals.map((c, i) => (
          <Coral key={`coral-${i}`} {...c} />
        ))}
        {decorations.bubbles.map((b, i) => (
          <BubbleStream key={`bubble-${i}`} {...b} />
        ))}
      </svg>
    </div>
  )
})
DecorationLayer.displayName = 'DecorationLayer'
