'use client'

import { memo, useMemo } from 'react'

// Pixel-art aquatic decorations for the fishbowl floor

// Sandy bottom with varied texture
export const SandyBottom = memo(({ color = '#C4A862', lighter = '#D4B872', detail = '#B89B52' }: {
  color?: string
  lighter?: string
  detail?: string
}) => (
  <svg className="absolute bottom-0 left-0 w-full" height="80" preserveAspectRatio="none" viewBox="0 0 800 80" shapeRendering="crispEdges">
    {/* Base sand */}
    <rect x="0" y="20" width="800" height="60" fill={color} />
    <rect x="0" y="15" width="800" height="10" fill={lighter} />
    {/* Sand dunes / undulation */}
    <rect x="0" y="12" width="60" height="4" fill={lighter} />
    <rect x="50" y="8" width="80" height="6" fill={lighter} />
    <rect x="120" y="10" width="40" height="6" fill={lighter} />
    <rect x="180" y="6" width="100" height="10" fill={lighter} />
    <rect x="300" y="10" width="60" height="6" fill={lighter} />
    <rect x="380" y="5" width="90" height="12" fill={lighter} />
    <rect x="500" y="8" width="70" height="8" fill={lighter} />
    <rect x="580" y="12" width="50" height="4" fill={lighter} />
    <rect x="650" y="6" width="80" height="10" fill={lighter} />
    <rect x="740" y="10" width="60" height="6" fill={lighter} />
    {/* Sand detail pixels */}
    {[30, 95, 150, 220, 290, 340, 420, 490, 560, 630, 710, 770].map((x, i) => (
      <rect key={`grain-${i}`} x={x} y={22 + (i % 3) * 8} width="3" height="3" fill={detail} opacity="0.5" />
    ))}
    {[60, 125, 200, 270, 350, 450, 530, 600, 680, 750].map((x, i) => (
      <rect key={`grain2-${i}`} x={x} y={30 + (i % 4) * 6} width="2" height="2" fill={detail} opacity="0.4" />
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
        <rect x="6" y="16" width="8" height="4" fill={color} />
        <rect x="8" y="10" width="4" height="6" fill={color} />
        <rect x="4" y="6" width="4" height="6" fill={color} />
        <rect x="12" y="4" width="4" height="8" fill={color} />
        <rect x="2" y="2" width="4" height="4" fill={lighter} />
        <rect x="14" y="0" width="4" height="4" fill={lighter} />
        <rect x="8" y="6" width="4" height="4" fill={lighter} opacity="0.5" />
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
        <rect x="8" y="6" width="8" height="1" fill={lighter} opacity="0.4" />
        <rect x="6" y="10" width="12" height="1" fill={lighter} opacity="0.4" />
        <rect x="8" y="14" width="8" height="1" fill={lighter} opacity="0.3" />
      </g>
    )
  }

  // fan
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="8" y="14" width="4" height="6" fill={color} />
      <rect x="2" y="6" width="16" height="8" fill={color} opacity="0.8" />
      <rect x="4" y="2" width="12" height="6" fill={lighter} opacity="0.6" />
      <rect x="6" y="0" width="8" height="4" fill={lighter} opacity="0.4" />
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

// ─── Shipwreck-specific decorations ───────────────────────────────

const ShipwreckHull = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Hull planks */}
    <rect x="0" y="8" width="60" height="12" fill="#5C3D2E" />
    <rect x="4" y="4" width="52" height="6" fill="#6B4C3A" />
    <rect x="8" y="0" width="44" height="6" fill="#7A5B48" />
    {/* Plank lines */}
    <rect x="0" y="10" width="60" height="1" fill="#4A2E1E" opacity="0.5" />
    <rect x="0" y="14" width="60" height="1" fill="#4A2E1E" opacity="0.4" />
    <rect x="4" y="6" width="52" height="1" fill="#4A2E1E" opacity="0.3" />
    {/* Broken mast */}
    <rect x="25" y="-20" width="4" height="22" fill="#6B4C3A" />
    <rect x="24" y="-22" width="6" height="4" fill="#7A5B48" />
    {/* Barnacles */}
    <rect x="8" y="12" width="3" height="3" fill="#9CA3AF" opacity="0.6" />
    <rect x="40" y="10" width="2" height="2" fill="#9CA3AF" opacity="0.5" />
    <rect x="50" y="14" width="3" height="2" fill="#9CA3AF" opacity="0.4" />
    {/* Algae growth */}
    <rect x="15" y="6" width="4" height="2" fill="#2E7D32" opacity="0.5" />
    <rect x="35" y="2" width="6" height="2" fill="#388E3C" opacity="0.4" />
  </g>
))
ShipwreckHull.displayName = 'ShipwreckHull'

const TreasureChest = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Chest body */}
    <rect x="0" y="6" width="16" height="10" fill="#6B4C3A" />
    {/* Lid - slightly open */}
    <rect x="-1" y="2" width="18" height="5" fill="#7A5B48" />
    <rect x="0" y="1" width="16" height="2" fill="#8B6C58" />
    {/* Metal bands */}
    <rect x="0" y="8" width="16" height="1" fill="#D4A43A" opacity="0.7" />
    <rect x="0" y="3" width="16" height="1" fill="#D4A43A" opacity="0.6" />
    {/* Lock */}
    <rect x="6" y="6" width="4" height="3" fill="#D4A43A" />
    <rect x="7" y="7" width="2" height="1" fill="#B8862D" />
    {/* Gold coins spilling */}
    <circle cx="18" cy="14" r="2" fill="#FFD700" opacity="0.8" />
    <circle cx="20" cy="12" r="1.5" fill="#FFD700" opacity="0.6" />
    <circle cx="-2" cy="15" r="1.5" fill="#FFD700" opacity="0.5" />
  </g>
))
TreasureChest.displayName = 'TreasureChest'

const Anchor = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Shank */}
    <rect x="6" y="0" width="3" height="20" fill="#4B5563" />
    {/* Ring */}
    <circle cx="7.5" cy="2" r="3" fill="none" stroke="#4B5563" strokeWidth="2" />
    {/* Arms */}
    <rect x="0" y="16" width="15" height="3" fill="#4B5563" />
    {/* Flukes */}
    <path d="M0 16 L-2 20 L3 19 Z" fill="#6B7280" />
    <path d="M15 16 L17 20 L12 19 Z" fill="#6B7280" />
    {/* Crown */}
    <rect x="3" y="0" width="9" height="2" fill="#6B7280" />
    {/* Rust */}
    <rect x="5" y="8" width="5" height="2" fill="#B45309" opacity="0.4" />
  </g>
))
Anchor.displayName = 'Anchor'

// ─── Tropical-specific decorations ────────────────────────────────

const TropicalPlant = memo(({ x, height = 50, color = '#00C853' }: { x: number; height?: number; color?: string }) => {
  const lighter = '#69F0AE'
  return (
    <g
      style={{
        animation: `kelpSway 5s ease-in-out ${Math.random() * 2}s infinite`,
        transformOrigin: `${x + 6}px 100%`,
      }}
    >
      {Array.from({ length: Math.floor(height / 5) }, (_, i) => {
        const leafSpread = Math.sin((i / (height / 5)) * Math.PI) * 8
        return (
          <g key={i}>
            {/* Stem */}
            <rect x={x + 4} y={100 - (i + 1) * 5} width="4" height="5" fill={color} />
            {/* Leaves - alternating sides */}
            {i % 2 === 0 && i > 1 && (
              <ellipse
                cx={x - leafSpread + 4}
                cy={100 - (i + 1) * 5 + 2}
                rx={leafSpread + 2}
                ry="3"
                fill={lighter}
                opacity="0.7"
              />
            )}
            {i % 2 === 1 && i > 1 && (
              <ellipse
                cx={x + leafSpread + 8}
                cy={100 - (i + 1) * 5 + 2}
                rx={leafSpread + 2}
                ry="3"
                fill={color}
                opacity="0.8"
              />
            )}
          </g>
        )
      })}
      {/* Top frond */}
      <ellipse cx={x + 6} cy={100 - height - 2} rx="6" ry="4" fill={lighter} opacity="0.6" />
    </g>
  )
})
TropicalPlant.displayName = 'TropicalPlant'

const TikiStatue = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Base */}
    <rect x="2" y="18" width="16" height="4" fill="#78716C" />
    {/* Body */}
    <rect x="4" y="8" width="12" height="10" fill="#A8A29E" />
    {/* Head */}
    <rect x="3" y="2" width="14" height="8" fill="#A8A29E" />
    {/* Eyes */}
    <rect x="5" y="4" width="4" height="3" fill="#1A1A2E" />
    <rect x="11" y="4" width="4" height="3" fill="#1A1A2E" />
    <rect x="6" y="5" width="2" height="1" fill="#00E676" opacity="0.8" />
    <rect x="12" y="5" width="2" height="1" fill="#00E676" opacity="0.8" />
    {/* Mouth */}
    <rect x="7" y="8" width="6" height="2" fill="#1A1A2E" />
    {/* Crown */}
    <rect x="5" y="0" width="3" height="3" fill="#FFD700" opacity="0.7" />
    <rect x="12" y="0" width="3" height="3" fill="#FFD700" opacity="0.7" />
    {/* Moss */}
    <rect x="2" y="16" width="4" height="2" fill="#2E7D32" opacity="0.5" />
  </g>
))
TikiStatue.displayName = 'TikiStatue'

// ─── Themed decoration configs ────────────────────────────────────

interface DecoConfig {
  rocks: Array<{ x: number; y: number; variant: 'small' | 'medium' | 'large'; color: string }>
  kelps: Array<{ x: number; height: number; variant: 'thin' | 'wide' | 'bushy'; color: string; delay: number }>
  corals: Array<{ x: number; y: number; variant: 'branch' | 'brain' | 'fan'; color: string }>
  bubbles: Array<{ x: number; count: number }>
  sandColors?: { color: string; lighter: string; detail: string }
}

const OCEAN_DECOR: DecoConfig = {
  rocks: [
    { x: 50, y: 76, variant: 'large', color: '#6B7280' },
    { x: 200, y: 82, variant: 'medium', color: '#78716C' },
    { x: 380, y: 80, variant: 'small', color: '#6B7280' },
    { x: 520, y: 78, variant: 'large', color: '#57534E' },
    { x: 680, y: 82, variant: 'medium', color: '#78716C' },
  ],
  kelps: [
    { x: 30, height: 55, variant: 'bushy', color: '#2E7D32', delay: 0 },
    { x: 100, height: 40, variant: 'thin', color: '#388E3C', delay: 0.5 },
    { x: 160, height: 50, variant: 'wide', color: '#2E7D32', delay: 1 },
    { x: 420, height: 45, variant: 'thin', color: '#388E3C', delay: 1.5 },
    { x: 550, height: 60, variant: 'bushy', color: '#1B5E20', delay: 0.3 },
    { x: 630, height: 35, variant: 'thin', color: '#388E3C', delay: 2 },
    { x: 740, height: 50, variant: 'wide', color: '#2E7D32', delay: 0.8 },
  ],
  corals: [
    { x: 260, y: 72, variant: 'branch', color: '#E91E63' },
    { x: 460, y: 74, variant: 'fan', color: '#FF5722' },
    { x: 600, y: 70, variant: 'brain', color: '#E91E63' },
  ],
  bubbles: [
    { x: 80, count: 3 },
    { x: 340, count: 2 },
    { x: 570, count: 4 },
    { x: 720, count: 2 },
  ],
}

const TROPICAL_DECOR: DecoConfig = {
  rocks: [
    { x: 80, y: 80, variant: 'medium', color: '#78716C' },
    { x: 350, y: 82, variant: 'small', color: '#A8A29E' },
    { x: 600, y: 78, variant: 'medium', color: '#78716C' },
  ],
  kelps: [
    { x: 50, height: 55, variant: 'bushy', color: '#00C853', delay: 0 },
    { x: 180, height: 45, variant: 'wide', color: '#00E676', delay: 0.8 },
    { x: 450, height: 50, variant: 'bushy', color: '#00C853', delay: 1.2 },
    { x: 650, height: 40, variant: 'wide', color: '#69F0AE', delay: 0.4 },
    { x: 760, height: 55, variant: 'bushy', color: '#00C853', delay: 1.8 },
  ],
  corals: [
    { x: 130, y: 70, variant: 'branch', color: '#FF6D00' },
    { x: 300, y: 72, variant: 'fan', color: '#FF1744' },
    { x: 500, y: 68, variant: 'branch', color: '#FFD600' },
    { x: 700, y: 74, variant: 'brain', color: '#FF6D00' },
  ],
  bubbles: [
    { x: 120, count: 3 },
    { x: 400, count: 2 },
    { x: 550, count: 3 },
    { x: 700, count: 2 },
  ],
  sandColors: { color: '#D4A43A', lighter: '#E8C468', detail: '#B8862D' },
}

const SHIPWRECK_DECOR: DecoConfig = {
  rocks: [
    { x: 30, y: 76, variant: 'large', color: '#57534E' },
    { x: 250, y: 80, variant: 'medium', color: '#44403C' },
    { x: 480, y: 82, variant: 'small', color: '#57534E' },
    { x: 650, y: 78, variant: 'large', color: '#44403C' },
  ],
  kelps: [
    { x: 70, height: 30, variant: 'thin', color: '#2E7D32', delay: 0 },
    { x: 300, height: 25, variant: 'thin', color: '#1B5E20', delay: 1 },
    { x: 550, height: 35, variant: 'wide', color: '#2E7D32', delay: 0.5 },
    { x: 750, height: 28, variant: 'thin', color: '#1B5E20', delay: 1.5 },
  ],
  corals: [
    { x: 180, y: 76, variant: 'brain', color: '#795548' },
    { x: 420, y: 74, variant: 'fan', color: '#8D6E63' },
  ],
  bubbles: [
    { x: 200, count: 4 },
    { x: 500, count: 3 },
    { x: 380, count: 2 },
  ],
  sandColors: { color: '#8B7355', lighter: '#A08B6C', detail: '#6B5B45' },
}

const MINIMAL_DECOR: DecoConfig = {
  rocks: [
    { x: 150, y: 82, variant: 'small', color: '#6B7280' },
    { x: 400, y: 80, variant: 'medium', color: '#6B7280' },
    { x: 650, y: 82, variant: 'small', color: '#78716C' },
  ],
  kelps: [
    { x: 40, height: 50, variant: 'bushy', color: '#2E7D32', delay: 0 },
    { x: 120, height: 45, variant: 'wide', color: '#388E3C', delay: 0.6 },
    { x: 200, height: 55, variant: 'bushy', color: '#1B5E20', delay: 1.2 },
    { x: 300, height: 40, variant: 'thin', color: '#388E3C', delay: 0.3 },
    { x: 380, height: 50, variant: 'wide', color: '#2E7D32', delay: 1.8 },
    { x: 470, height: 55, variant: 'bushy', color: '#388E3C', delay: 0.9 },
    { x: 560, height: 45, variant: 'wide', color: '#1B5E20', delay: 1.5 },
    { x: 650, height: 50, variant: 'bushy', color: '#2E7D32', delay: 0.4 },
    { x: 740, height: 40, variant: 'wide', color: '#388E3C', delay: 2.0 },
  ],
  corals: [],
  bubbles: [
    { x: 300, count: 2 },
    { x: 600, count: 2 },
  ],
}

const THEME_CONFIGS: Record<string, DecoConfig> = {
  ocean: OCEAN_DECOR,
  tropical: TROPICAL_DECOR,
  shipwreck: SHIPWRECK_DECOR,
  minimal: MINIMAL_DECOR,
}

// Complete decoration layer for the fishbowl floor
export const DecorationLayer = memo(({ width, theme = 'ocean' }: { width: number; theme?: string }) => {
  const config = THEME_CONFIGS[theme] || THEME_CONFIGS.ocean
  const sandColors = config.sandColors || { color: '#C4A862', lighter: '#D4B872', detail: '#B89B52' }

  const decorations = useMemo(() => config, [config])

  return (
    <div className="absolute bottom-0 left-0 w-full" style={{ height: '120px' }}>
      <SandyBottom color={sandColors.color} lighter={sandColors.lighter} detail={sandColors.detail} />
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 800 100"
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

        {/* Theme-specific extras */}
        {theme === 'shipwreck' && (
          <>
            <ShipwreckHull x={120} y={58} />
            <TreasureChest x={400} y={78} />
            <Anchor x={600} y={60} />
          </>
        )}
        {theme === 'tropical' && (
          <>
            <TropicalPlant x={250} height={55} color="#00C853" />
            <TropicalPlant x={550} height={45} color="#00E676" />
            <TikiStatue x={380} y={74} />
          </>
        )}
      </svg>
    </div>
  )
})
DecorationLayer.displayName = 'DecorationLayer'
