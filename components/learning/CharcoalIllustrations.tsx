'use client'

import { ReactNode, useMemo } from 'react'
import { motion } from 'framer-motion'

// Charcoal & Ancient Anshan Art Style Illustrations
// Inspired by Persian minimalist line art, charcoal sketches, and carved woodblock prints
// With hieroglyphic color palette: ochre, turquoise, terracotta, gold, lapis
// This creates soulful, meditative visuals that feel carved from the ages

const handwritten = "font-['Caveat',_cursive]"

// ===========================================
// HIEROGLYPHIC COLOR PALETTE
// ===========================================

export const ANCIENT_COLORS = {
  // Primary colors from ancient Egyptian/Persian art
  charcoal: '#2d2a26',      // Deep black/charcoal for outlines
  papyrus: '#f5f1e8',       // Cream background
  ochre: '#c9a227',         // Golden ochre - sun, divinity
  deepOchre: '#a67c00',     // Darker gold
  turquoise: '#30a3a3',     // Egyptian blue/turquoise - sky, water
  teal: '#1a7a7a',          // Deeper turquoise
  terracotta: '#c45c3e',    // Earth red - life, earth
  rust: '#9b3d2b',          // Deeper terracotta
  lapis: '#1e4d7b',         // Lapis lazuli blue - royalty, sky
  sienna: '#8b5a2b',        // Brown earth tones
  sage: '#5d7a5d',          // Muted green - vegetation
  cream: '#efe9dc',         // Light papyrus
  sand: '#d4c4a8',          // Sandy beige
}

// ===========================================
// SVG FILTERS - Charcoal & Carving Effects
// ===========================================

export function CharcoalFilters() {
  return (
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        {/* Charcoal texture - grainy, soft edges */}
        <filter id="charcoal" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="0.3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="atop" />
        </filter>

        {/* Carved/etched effect - sharp with slight erosion */}
        <filter id="carved" x="-5%" y="-5%" width="110%" height="110%">
          <feMorphology operator="erode" radius="0.3" result="eroded" />
          <feGaussianBlur in="eroded" stdDeviation="0.2" result="blurred" />
          <feComposite in="SourceGraphic" in2="blurred" operator="over" />
        </filter>

        {/* Smudge effect - like charcoal rubbed with finger */}
        <filter id="smudge" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" in="blur" result="faded" />
          <feComposite in="SourceGraphic" in2="faded" operator="over" />
        </filter>

        {/* Ink wash - gradient opacity like ink bleeding */}
        <filter id="inkwash">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
          <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
        </filter>

        {/* Aged/weathered look */}
        <filter id="aged">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Hieroglyphic color gradients */}
        <linearGradient id="ochreGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={ANCIENT_COLORS.ochre} stopOpacity="0.9" />
          <stop offset="100%" stopColor={ANCIENT_COLORS.deepOchre} stopOpacity="0.7" />
        </linearGradient>

        <linearGradient id="turquoiseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={ANCIENT_COLORS.turquoise} stopOpacity="0.8" />
          <stop offset="100%" stopColor={ANCIENT_COLORS.teal} stopOpacity="0.6" />
        </linearGradient>

        <linearGradient id="terracottaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={ANCIENT_COLORS.terracotta} stopOpacity="0.8" />
          <stop offset="100%" stopColor={ANCIENT_COLORS.rust} stopOpacity="0.6" />
        </linearGradient>

        <linearGradient id="lapisGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={ANCIENT_COLORS.lapis} stopOpacity="0.7" />
          <stop offset="100%" stopColor={ANCIENT_COLORS.teal} stopOpacity="0.5" />
        </linearGradient>

        <radialGradient id="sunGold" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ANCIENT_COLORS.ochre} stopOpacity="1" />
          <stop offset="70%" stopColor={ANCIENT_COLORS.deepOchre} stopOpacity="0.8" />
          <stop offset="100%" stopColor={ANCIENT_COLORS.sienna} stopOpacity="0.3" />
        </radialGradient>

        {/* Charcoal gradient for shading */}
        <linearGradient id="charcoalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#3d3d3d" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#5c5c5c" stopOpacity="0.3" />
        </linearGradient>

        {/* Sepia wash for aged paper feel */}
        <linearGradient id="sepiaWash" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3d2914" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#5c4033" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// ===========================================
// CHARCOAL DRAWING PRIMITIVES
// ===========================================

// Charcoal stroke - thick, soft edges
export function CharcoalStroke({
  d,
  thickness = 2,
  opacity = 0.8,
  variant = 'solid'
}: {
  d: string
  thickness?: number
  opacity?: number
  variant?: 'solid' | 'sketchy' | 'fading'
}) {
  const strokeProps = {
    fill: 'none',
    stroke: '#2d2a26',
    strokeWidth: thickness,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    opacity,
    filter: 'url(#charcoal)'
  }

  if (variant === 'sketchy') {
    // Multiple overlapping strokes for sketchy effect
    return (
      <g>
        <path {...strokeProps} d={d} opacity={opacity * 0.3} transform="translate(0.5, 0.5)" />
        <path {...strokeProps} d={d} opacity={opacity * 0.5} transform="translate(-0.3, 0.3)" />
        <path {...strokeProps} d={d} />
      </g>
    )
  }

  if (variant === 'fading') {
    return (
      <path
        {...strokeProps}
        strokeDasharray="15 5 8 3"
        opacity={opacity * 0.7}
      />
    )
  }

  return <path {...strokeProps} d={d} />
}

// Charcoal fill - soft shading
export function CharcoalShade({
  d,
  intensity = 'medium'
}: {
  d: string
  intensity?: 'light' | 'medium' | 'dark'
}) {
  const opacity = intensity === 'light' ? 0.15 : intensity === 'medium' ? 0.3 : 0.5

  return (
    <g>
      <path
        d={d}
        fill="#2d2a26"
        opacity={opacity}
        filter="url(#smudge)"
      />
    </g>
  )
}

// ===========================================
// ANSHAN-STYLE MINIMALIST ELEMENTS
// ===========================================

// Flowing wave pattern - ancient Persian motif
export function AnshanWave({
  x, y, width, amplitude = 10, frequency = 3
}: {
  x: number
  y: number
  width: number
  amplitude?: number
  frequency?: number
}) {
  let path = `M${x},${y}`

  for (let i = 0; i < frequency; i++) {
    const segWidth = width / frequency
    const x1 = x + i * segWidth + segWidth * 0.25
    const x2 = x + i * segWidth + segWidth * 0.75
    const x3 = x + (i + 1) * segWidth

    path += ` Q${x1},${y - amplitude} ${x + i * segWidth + segWidth / 2},${y}`
    path += ` Q${x2},${y + amplitude} ${x3},${y}`
  }

  return (
    <CharcoalStroke d={path} thickness={1.5} variant="solid" />
  )
}

// Spiral - ancient symbol of growth and eternity
export function AnshanSpiral({
  x, y, size = 30, turns = 3, direction = 'clockwise'
}: {
  x: number
  y: number
  size?: number
  turns?: number
  direction?: 'clockwise' | 'counterclockwise'
}) {
  let path = `M${x},${y}`
  const dir = direction === 'clockwise' ? 1 : -1

  for (let i = 0; i < turns * 360; i += 15) {
    const angle = (i * Math.PI) / 180 * dir
    const radius = (i / (turns * 360)) * size
    const px = x + Math.cos(angle) * radius
    const py = y + Math.sin(angle) * radius
    path += ` L${px},${py}`
  }

  return (
    <CharcoalStroke d={path} thickness={1.2} opacity={0.7} />
  )
}

// Lotus/palmette - sacred Persian motif with terracotta
export function AnshanLotus({
  x, y, size = 40, colored = true
}: {
  x: number
  y: number
  size?: number
  colored?: boolean
}) {
  const scale = size / 40
  const petalColor = colored ? ANCIENT_COLORS.terracotta : ANCIENT_COLORS.charcoal
  const accentColor = colored ? ANCIENT_COLORS.ochre : ANCIENT_COLORS.charcoal

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Central petal with fill */}
      <path
        d="M0,0 Q-5,-20 0,-35 Q5,-20 0,0"
        fill={colored ? `${petalColor}30` : 'none'}
        stroke={petalColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        filter="url(#charcoal)"
      />
      {/* Side petals */}
      {[-1, 1].map((dir) => (
        <g key={dir}>
          <path
            d={`M0,-5 Q${dir * 15},-18 ${dir * 12},-30`}
            fill="none"
            stroke={petalColor}
            strokeWidth="1.2"
            opacity="0.8"
            strokeLinecap="round"
            filter="url(#charcoal)"
          />
          <path
            d={`M0,-2 Q${dir * 20},-10 ${dir * 22},-22`}
            fill="none"
            stroke={accentColor}
            strokeWidth="1"
            opacity="0.6"
            strokeLinecap="round"
          />
        </g>
      ))}
      {/* Base curve */}
      <path
        d="M-15,5 Q0,-5 15,5"
        fill="none"
        stroke={petalColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        filter="url(#charcoal)"
      />
      {/* Center dot */}
      <circle
        cx="0"
        cy="-15"
        r="3"
        fill={accentColor}
        opacity="0.5"
      />
    </g>
  )
}

// Geometric border pattern
export function AnshanBorder({
  x, y, width, variant = 'meander'
}: {
  x: number
  y: number
  width: number
  variant?: 'meander' | 'zigzag' | 'dots'
}) {
  if (variant === 'zigzag') {
    const segments = Math.floor(width / 15)
    let path = `M${x},${y}`
    for (let i = 0; i < segments; i++) {
      const isUp = i % 2 === 0
      path += ` L${x + (i + 0.5) * 15},${y + (isUp ? -6 : 6)}`
      path += ` L${x + (i + 1) * 15},${y}`
    }
    return <CharcoalStroke d={path} thickness={1} opacity={0.5} />
  }

  if (variant === 'dots') {
    const dots: ReactNode[] = []
    const spacing = 12
    for (let i = 0; i < width / spacing; i++) {
      dots.push(
        <circle
          key={i}
          cx={x + i * spacing}
          cy={y}
          r={2}
          fill="#2d2a26"
          opacity={0.4}
          filter="url(#charcoal)"
        />
      )
    }
    return <g>{dots}</g>
  }

  // Meander (Greek key style but softer)
  let path = `M${x},${y}`
  const unit = 10
  const repeats = Math.floor(width / (unit * 4))

  for (let i = 0; i < repeats; i++) {
    const startX = x + i * unit * 4
    path += ` L${startX + unit},${y}`
    path += ` L${startX + unit},${y - unit}`
    path += ` L${startX + unit * 3},${y - unit}`
    path += ` L${startX + unit * 3},${y + unit}`
    path += ` L${startX + unit * 2},${y + unit}`
    path += ` L${startX + unit * 2},${y}`
    path += ` L${startX + unit * 4},${y}`
  }

  return <CharcoalStroke d={path} thickness={1} opacity={0.4} />
}

// ===========================================
// CARVED ILLUSTRATION ELEMENTS
// ===========================================

// Mountain - carved woodblock style
export function CarvedMountain({
  x, y, width, height
}: {
  x: number
  y: number
  width: number
  height: number
}) {
  const peakX = x + width * 0.4 + Math.random() * width * 0.2
  const peakY = y - height

  // Main outline
  const outline = `M${x},${y} L${peakX},${peakY} L${x + width},${y}`

  // Carved texture lines (hatching)
  const hatchLines: string[] = []
  const lineCount = Math.floor(width / 8)

  for (let i = 0; i < lineCount; i++) {
    const lineX = x + (i / lineCount) * width
    const lineTop = y - height * (1 - Math.abs((lineX - peakX) / (width * 0.5)))
    if (lineTop < y - 5) {
      hatchLines.push(`M${lineX},${y} L${lineX + 3},${lineTop + 10}`)
    }
  }

  return (
    <g filter="url(#carved)">
      <CharcoalStroke d={outline} thickness={2} />
      {hatchLines.map((d, i) => (
        <CharcoalStroke
          key={i}
          d={d}
          thickness={0.8}
          opacity={0.3}
        />
      ))}
      {/* Snow cap */}
      <CharcoalStroke
        d={`M${peakX - 15},${peakY + 20} Q${peakX},${peakY - 5} ${peakX + 15},${peakY + 20}`}
        thickness={1}
        opacity={0.5}
      />
    </g>
  )
}

// Tree - minimalist carved style with sage green
export function CarvedTree({
  x, y, height = 60, style = 'pine', colored = true
}: {
  x: number
  y: number
  height?: number
  style?: 'pine' | 'willow' | 'cypress'
  colored?: boolean
}) {
  const foliageColor = colored ? ANCIENT_COLORS.sage : ANCIENT_COLORS.charcoal
  const trunkColor = colored ? ANCIENT_COLORS.sienna : ANCIENT_COLORS.charcoal

  if (style === 'willow') {
    // Graceful drooping branches
    return (
      <g>
        <path
          d={`M${x},${y} L${x},${y - height * 0.4}`}
          fill="none"
          stroke={trunkColor}
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#charcoal)"
        />
        {[-1, -0.5, 0, 0.5, 1].map((offset, i) => (
          <path
            key={i}
            d={`M${x},${y - height * 0.4}
                Q${x + offset * 20},${y - height * 0.6}
                ${x + offset * 30},${y - height * 0.1}`}
            fill="none"
            stroke={foliageColor}
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.7"
            filter="url(#charcoal)"
          />
        ))}
      </g>
    )
  }

  if (style === 'cypress') {
    // Tall, flame-like shape
    return (
      <g>
        <path
          d={`M${x},${y}
              Q${x - 8},${y - height * 0.3} ${x - 6},${y - height * 0.5}
              Q${x - 4},${y - height * 0.8} ${x},${y - height}
              Q${x + 4},${y - height * 0.8} ${x + 6},${y - height * 0.5}
              Q${x + 8},${y - height * 0.3} ${x},${y}`}
          fill={colored ? `${foliageColor}40` : 'none'}
          stroke={foliageColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#charcoal)"
        />
        {/* Trunk */}
        <path
          d={`M${x - 3},${y} L${x - 2},${y - height * 0.2} L${x + 2},${y - height * 0.2} L${x + 3},${y}`}
          fill="none"
          stroke={trunkColor}
          strokeWidth="1"
          opacity="0.8"
        />
      </g>
    )
  }

  // Pine - classic minimal triangle
  return (
    <g>
      {/* Trunk */}
      <path
        d={`M${x - 3},${y} L${x},${y - height * 0.3} L${x + 3},${y}`}
        fill="none"
        stroke={trunkColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        filter="url(#charcoal)"
      />
      {/* Foliage layers */}
      {[0.3, 0.5, 0.75, 0.95].map((h, i) => {
        const layerWidth = (1 - h) * height * 0.5 + 8
        const layerY = y - height * h
        return (
          <path
            key={i}
            d={`M${x - layerWidth},${layerY + 15}
                L${x},${layerY}
                L${x + layerWidth},${layerY + 15}`}
            fill={colored && i > 1 ? `${foliageColor}25` : 'none'}
            stroke={foliageColor}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity={0.9 - i * 0.1}
            filter="url(#charcoal)"
          />
        )
      })}
    </g>
  )
}

// Sun - ancient solar symbol with ochre gold
export function CarvedSun({
  x, y, size = 40, colored = true
}: {
  x: number
  y: number
  size?: number
  colored?: boolean
}) {
  const rays: ReactNode[] = []
  const rayCount = 12
  const rayColor = colored ? ANCIENT_COLORS.ochre : ANCIENT_COLORS.charcoal

  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * Math.PI * 2
    const innerR = size * 0.4
    const outerR = size * 0.8
    const isLong = i % 2 === 0

    rays.push(
      <line
        key={i}
        x1={x + Math.cos(angle) * innerR}
        y1={y + Math.sin(angle) * innerR}
        x2={x + Math.cos(angle) * (isLong ? outerR : outerR * 0.7)}
        y2={y + Math.sin(angle) * (isLong ? outerR : outerR * 0.7)}
        stroke={rayColor}
        strokeWidth={isLong ? 2 : 1.5}
        strokeLinecap="round"
        opacity={0.8}
        filter="url(#charcoal)"
      />
    )
  }

  return (
    <g>
      {rays}
      {/* Central circle with golden fill */}
      <circle
        cx={x}
        cy={y}
        r={size * 0.35}
        fill={colored ? "url(#sunGold)" : "none"}
        stroke={ANCIENT_COLORS.charcoal}
        strokeWidth="1.5"
        opacity="0.9"
        filter="url(#charcoal)"
      />
      {/* Inner detail circle */}
      <circle
        cx={x}
        cy={y}
        r={size * 0.15}
        fill="none"
        stroke={colored ? ANCIENT_COLORS.deepOchre : ANCIENT_COLORS.charcoal}
        strokeWidth="1"
        opacity="0.6"
      />
    </g>
  )
}

// Water - flowing waves with turquoise hieroglyphic color
export function CarvedWater({
  x, y, width, rows = 3, colored = true
}: {
  x: number
  y: number
  width: number
  rows?: number
  colored?: boolean
}) {
  const waves: ReactNode[] = []
  const waterColor = colored ? ANCIENT_COLORS.turquoise : ANCIENT_COLORS.charcoal

  for (let row = 0; row < rows; row++) {
    const rowY = y + row * 12
    const offset = (row % 2) * 15
    const amplitude = 5 - row * 0.5
    const frequency = Math.floor(width / 30)

    let path = `M${x - offset},${rowY}`
    for (let i = 0; i < frequency; i++) {
      const segWidth = (width + offset * 2) / frequency
      const x1 = x - offset + i * segWidth + segWidth * 0.25
      const x2 = x - offset + i * segWidth + segWidth * 0.75
      const x3 = x - offset + (i + 1) * segWidth

      path += ` Q${x1},${rowY - amplitude} ${x - offset + i * segWidth + segWidth / 2},${rowY}`
      path += ` Q${x2},${rowY + amplitude} ${x3},${rowY}`
    }

    waves.push(
      <path
        key={row}
        d={path}
        fill="none"
        stroke={waterColor}
        strokeWidth={1.5 - row * 0.2}
        strokeLinecap="round"
        opacity={0.7 - row * 0.15}
        filter="url(#charcoal)"
      />
    )
  }

  return <g>{waves}</g>
}

// Bird - minimalist ancient style
export function CarvedBird({
  x, y, size = 20, direction = 'right'
}: {
  x: number
  y: number
  size?: number
  direction?: 'left' | 'right'
}) {
  const dir = direction === 'right' ? 1 : -1
  const scale = size / 20

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale * dir}, ${scale})`}>
      {/* Simple curved wings */}
      <CharcoalStroke
        d="M-15,5 Q-8,-5 0,0 Q8,-5 15,5"
        thickness={1.5}
        opacity={0.7}
      />
    </g>
  )
}

// Leaf - single minimalist leaf
export function CarvedLeaf({
  x, y, size = 25, rotation = 0
}: {
  x: number
  y: number
  size?: number
  rotation?: number
}) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
      <CharcoalStroke
        d={`M0,0 Q${-size * 0.3},${-size * 0.5} 0,${-size} Q${size * 0.3},${-size * 0.5} 0,0`}
        thickness={1.2}
        opacity={0.7}
      />
      {/* Center vein */}
      <CharcoalStroke
        d={`M0,0 L0,${-size * 0.9}`}
        thickness={0.6}
        opacity={0.4}
      />
    </g>
  )
}

// ===========================================
// COMPLETE LANDSCAPE SCENES
// ===========================================

// Serene mountain landscape
export function MountainLandscape({
  width = 400,
  height = 200
}: {
  width?: number
  height?: number
}) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <CharcoalFilters />

      {/* Sun */}
      <CarvedSun x={width * 0.8} y={height * 0.2} size={30} />

      {/* Birds */}
      {[0.3, 0.4, 0.35].map((pos, i) => (
        <CarvedBird
          key={i}
          x={width * pos + i * 20}
          y={height * 0.15 + i * 8}
          size={12 + i * 2}
        />
      ))}

      {/* Mountains - layered */}
      <CarvedMountain x={0} y={height} width={width * 0.5} height={height * 0.6} />
      <CarvedMountain x={width * 0.3} y={height} width={width * 0.5} height={height * 0.5} />
      <CarvedMountain x={width * 0.6} y={height} width={width * 0.5} height={height * 0.4} />

      {/* Trees in foreground */}
      {[0.1, 0.25, 0.75, 0.9].map((pos, i) => (
        <CarvedTree
          key={i}
          x={width * pos}
          y={height}
          height={30 + i * 5}
          style={i % 2 === 0 ? 'pine' : 'cypress'}
        />
      ))}

      {/* Ground line */}
      <CharcoalStroke
        d={`M0,${height} L${width},${height}`}
        thickness={2}
        opacity={0.6}
      />
    </svg>
  )
}

// Flowing water scene
export function WaterLandscape({
  width = 400,
  height = 200
}: {
  width?: number
  height?: number
}) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <CharcoalFilters />

      {/* Sky area with birds */}
      {[0.2, 0.4, 0.6].map((pos, i) => (
        <CarvedBird
          key={i}
          x={width * pos}
          y={height * 0.1 + i * 5}
          size={10}
        />
      ))}

      {/* Willow trees */}
      <CarvedTree x={width * 0.15} y={height * 0.6} height={80} style="willow" />
      <CarvedTree x={width * 0.85} y={height * 0.6} height={70} style="willow" />

      {/* Water */}
      <CarvedWater x={0} y={height * 0.65} width={width} rows={4} />

      {/* Lotus flowers on water */}
      <AnshanLotus x={width * 0.3} y={height * 0.75} size={25} />
      <AnshanLotus x={width * 0.6} y={height * 0.8} size={20} />

      {/* Decorative border at bottom */}
      <AnshanBorder x={0} y={height - 5} width={width} variant="dots" />
    </svg>
  )
}

// Garden scene with botanical elements
export function GardenLandscape({
  width = 400,
  height = 200
}: {
  width?: number
  height?: number
}) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <CharcoalFilters />

      {/* Spiral decorations */}
      <AnshanSpiral x={width * 0.1} y={height * 0.3} size={20} turns={2} />
      <AnshanSpiral x={width * 0.9} y={height * 0.25} size={25} turns={2.5} direction="counterclockwise" />

      {/* Lotus flowers at various positions */}
      <AnshanLotus x={width * 0.2} y={height * 0.5} size={35} />
      <AnshanLotus x={width * 0.5} y={height * 0.45} size={45} />
      <AnshanLotus x={width * 0.8} y={height * 0.5} size={30} />

      {/* Scattered leaves */}
      {[0.15, 0.35, 0.55, 0.75, 0.95].map((pos, i) => (
        <CarvedLeaf
          key={i}
          x={width * pos}
          y={height * 0.7}
          size={20}
          rotation={-20 + i * 10}
        />
      ))}

      {/* Ground with wave pattern */}
      <AnshanWave x={0} y={height * 0.85} width={width} amplitude={3} frequency={8} />

      {/* Decorative border */}
      <AnshanBorder x={width * 0.1} y={height - 8} width={width * 0.8} variant="meander" />
    </svg>
  )
}

// ===========================================
// ILLUSTRATION FRAME WITH CHARCOAL AESTHETIC
// ===========================================

export function CharcoalFrame({
  children,
  title,
  subtitle,
  className = ''
}: {
  children: ReactNode
  title?: string
  subtitle?: string
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Aged parchment background */}
      <div className="bg-gradient-to-br from-[#f5f1e8] via-[#efe9dc] to-[#e8e0d0] rounded-sm overflow-hidden">
        {/* Paper grain texture */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
          }}
        />

        {/* Age spots */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 right-12 w-24 h-24 bg-amber-300/10 rounded-full blur-2xl" />
          <div className="absolute bottom-12 left-8 w-20 h-20 bg-amber-400/8 rounded-full blur-xl" />
        </div>

        {/* Charcoal smudge edges */}
        <div className="absolute inset-0 pointer-events-none" style={{
          boxShadow: 'inset 0 0 60px rgba(45, 42, 38, 0.08)'
        }} />

        {/* Content */}
        <div className="relative p-6 sm:p-8">
          {/* Title area */}
          {title && (
            <div className="text-center mb-6">
              <h3 className={`${handwritten} text-3xl sm:text-4xl text-[#2d2a26] tracking-wide`}>
                {title}
              </h3>
              {subtitle && (
                <p className={`${handwritten} text-lg text-[#5c5550] italic mt-1`}>
                  {subtitle}
                </p>
              )}
              {/* Decorative underline */}
              <svg className="w-32 h-4 mx-auto mt-2 opacity-40" viewBox="0 0 128 16">
                <path
                  d="M10,8 Q32,4 64,8 Q96,12 118,8"
                  fill="none"
                  stroke="#2d2a26"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}

          {/* Main illustration */}
          <div className="relative">
            {children}
          </div>
        </div>

        {/* Corner wear marks */}
        {['tl', 'tr', 'bl', 'br'].map((corner) => (
          <div
            key={corner}
            className={`absolute w-16 h-16 pointer-events-none ${
              corner === 'tl' ? 'top-0 left-0' :
              corner === 'tr' ? 'top-0 right-0' :
              corner === 'bl' ? 'bottom-0 left-0' :
              'bottom-0 right-0'
            }`}
            style={{
              background: `radial-gradient(ellipse at ${
                corner.includes('l') ? '0%' : '100%'
              } ${
                corner.includes('t') ? '0%' : '100%'
              }, rgba(45, 42, 38, 0.03) 0%, transparent 70%)`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default {
  CharcoalFilters,
  CharcoalStroke,
  CharcoalShade,
  AnshanWave,
  AnshanSpiral,
  AnshanLotus,
  AnshanBorder,
  CarvedMountain,
  CarvedTree,
  CarvedSun,
  CarvedWater,
  CarvedBird,
  CarvedLeaf,
  MountainLandscape,
  WaterLandscape,
  GardenLandscape,
  CharcoalFrame
}
