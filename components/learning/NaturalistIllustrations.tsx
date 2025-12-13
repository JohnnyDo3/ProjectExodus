'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

// Naturalist-style hand-drawn illustrations
// Inspired by vintage scientific illustrations from Darwin's journals,
// botanical encyclopedias, and field naturalist sketches

const handwritten = "font-['Caveat',_cursive]"

// ===========================================
// CORE DRAWING PRIMITIVES
// ===========================================

// Generate wobbly path for hand-drawn effect
function wobblePath(points: [number, number][], wobbleAmount: number = 2): string {
  if (points.length < 2) return ''

  let path = `M${points[0][0]},${points[0][1]}`

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const midX = (prev[0] + curr[0]) / 2 + (Math.random() - 0.5) * wobbleAmount
    const midY = (prev[1] + curr[1]) / 2 + (Math.random() - 0.5) * wobbleAmount
    path += ` Q${midX},${midY} ${curr[0]},${curr[1]}`
  }

  return path
}

// Cross-hatching pattern for shading
export function CrossHatch({
  x, y, width, height,
  density = 'medium',
  angle = 45,
  opacity = 0.3
}: {
  x: number
  y: number
  width: number
  height: number
  density?: 'light' | 'medium' | 'dense'
  angle?: number
  opacity?: number
}) {
  const spacing = density === 'light' ? 8 : density === 'medium' ? 5 : 3

  const lines: ReactNode[] = []
  const diagonal = Math.sqrt(width * width + height * height)

  for (let i = -diagonal; i < diagonal; i += spacing) {
    lines.push(
      <line
        key={`h1-${i}`}
        x1={x + i}
        y1={y}
        x2={x + i + height}
        y2={y + height}
        stroke="#5d4e37"
        strokeWidth="0.5"
        opacity={opacity}
      />
    )
  }

  return (
    <g clipPath={`url(#clip-${x}-${y})`}>
      <defs>
        <clipPath id={`clip-${x}-${y}`}>
          <rect x={x} y={y} width={width} height={height} />
        </clipPath>
      </defs>
      <g transform={`rotate(${angle}, ${x + width/2}, ${y + height/2})`}>
        {lines}
      </g>
    </g>
  )
}

// Stippling (dot shading) pattern
export function Stipple({
  x, y, width, height,
  density = 'medium',
  opacity = 0.4
}: {
  x: number
  y: number
  width: number
  height: number
  density?: 'light' | 'medium' | 'dense'
  opacity?: number
}) {
  const count = density === 'light' ? 20 : density === 'medium' ? 50 : 100
  const dots: ReactNode[] = []

  for (let i = 0; i < count; i++) {
    const dotX = x + Math.random() * width
    const dotY = y + Math.random() * height
    const size = 0.5 + Math.random() * 1

    dots.push(
      <circle
        key={i}
        cx={dotX}
        cy={dotY}
        r={size}
        fill="#5d4e37"
        opacity={opacity * (0.5 + Math.random() * 0.5)}
      />
    )
  }

  return <g>{dots}</g>
}

// ===========================================
// BOTANICAL ELEMENTS
// ===========================================

// Hand-drawn leaf
export function SketchLeaf({
  x, y, size = 30, rotation = 0, variant = 'simple'
}: {
  x: number
  y: number
  size?: number
  rotation?: number
  variant?: 'simple' | 'serrated' | 'compound'
}) {
  const scale = size / 30

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}>
      {/* Main leaf outline */}
      <path
        d={variant === 'simple'
          ? "M0,0 Q-8,-15 0,-30 Q8,-15 0,0"
          : variant === 'serrated'
          ? "M0,0 Q-5,-8 -7,-12 Q-4,-15 -6,-20 Q-3,-23 -4,-27 Q0,-30 4,-27 Q3,-23 6,-20 Q4,-15 7,-12 Q5,-8 0,0"
          : "M0,0 Q-4,-10 0,-15 Q4,-10 0,0 M0,-15 Q-3,-20 0,-25 Q3,-20 0,-15"
        }
        fill="none"
        stroke="#5d4e37"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Center vein */}
      <path
        d="M0,0 L0,-28"
        fill="none"
        stroke="#5d4e37"
        strokeWidth="0.5"
        opacity="0.6"
      />
      {/* Side veins */}
      {[-20, -14, -8].map((y, i) => (
        <g key={i}>
          <path
            d={`M0,${y} Q${-4 - i},${y - 3} ${-6 - i * 0.5},${y - 2}`}
            fill="none"
            stroke="#5d4e37"
            strokeWidth="0.3"
            opacity="0.4"
          />
          <path
            d={`M0,${y} Q${4 + i},${y - 3} ${6 + i * 0.5},${y - 2}`}
            fill="none"
            stroke="#5d4e37"
            strokeWidth="0.3"
            opacity="0.4"
          />
        </g>
      ))}
    </g>
  )
}

// Hand-drawn flower
export function SketchFlower({
  x, y, size = 20, petals = 5
}: {
  x: number
  y: number
  size?: number
  petals?: number
}) {
  const petalElements: ReactNode[] = []

  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * Math.PI * 2 - Math.PI / 2
    const petalX = Math.cos(angle) * size * 0.4
    const petalY = Math.sin(angle) * size * 0.4

    petalElements.push(
      <ellipse
        key={i}
        cx={x + petalX}
        cy={y + petalY}
        rx={size * 0.35}
        ry={size * 0.2}
        fill="none"
        stroke="#5d4e37"
        strokeWidth="0.8"
        transform={`rotate(${(angle * 180) / Math.PI + 90}, ${x + petalX}, ${y + petalY})`}
      />
    )
  }

  return (
    <g>
      {petalElements}
      {/* Center */}
      <circle cx={x} cy={y} r={size * 0.15} fill="none" stroke="#5d4e37" strokeWidth="1" />
      <Stipple x={x - size * 0.1} y={y - size * 0.1} width={size * 0.2} height={size * 0.2} density="dense" />
    </g>
  )
}

// Hand-drawn tree
export function SketchTree({
  x, y, height = 80, style = 'deciduous'
}: {
  x: number
  y: number
  height?: number
  style?: 'deciduous' | 'conifer' | 'palm'
}) {
  const trunkHeight = height * 0.4
  const crownSize = height * 0.7

  if (style === 'conifer') {
    return (
      <g>
        {/* Trunk */}
        <path
          d={`M${x - 4},${y} L${x - 3},${y - trunkHeight} L${x + 3},${y - trunkHeight} L${x + 4},${y}`}
          fill="none"
          stroke="#5d4e37"
          strokeWidth="1"
        />
        {/* Triangular crown layers */}
        {[0.3, 0.5, 0.7, 0.9].map((h, i) => (
          <path
            key={i}
            d={`M${x},${y - trunkHeight - crownSize * h}
                L${x - crownSize * (0.5 - h * 0.3)},${y - trunkHeight - crownSize * (h - 0.2)}
                L${x + crownSize * (0.5 - h * 0.3)},${y - trunkHeight - crownSize * (h - 0.2)} Z`}
            fill="none"
            stroke="#5d4e37"
            strokeWidth="0.8"
          />
        ))}
      </g>
    )
  }

  // Deciduous tree
  return (
    <g>
      {/* Trunk with bark texture */}
      <path
        d={`M${x - 5},${y} Q${x - 4},${y - trunkHeight * 0.5} ${x - 3},${y - trunkHeight}
            L${x + 3},${y - trunkHeight} Q${x + 4},${y - trunkHeight * 0.5} ${x + 5},${y}`}
        fill="none"
        stroke="#5d4e37"
        strokeWidth="1"
      />
      {/* Bark lines */}
      {[0.2, 0.4, 0.6, 0.8].map((h, i) => (
        <path
          key={i}
          d={`M${x - 3 + i % 2},${y - trunkHeight * h} L${x - 2 + i % 2},${y - trunkHeight * (h + 0.1)}`}
          stroke="#5d4e37"
          strokeWidth="0.3"
          opacity="0.5"
        />
      ))}
      {/* Organic crown shape */}
      <path
        d={`M${x - crownSize * 0.4},${y - trunkHeight}
            Q${x - crownSize * 0.5},${y - trunkHeight - crownSize * 0.3} ${x - crownSize * 0.3},${y - trunkHeight - crownSize * 0.5}
            Q${x - crownSize * 0.1},${y - trunkHeight - crownSize * 0.7} ${x},${y - trunkHeight - crownSize * 0.6}
            Q${x + crownSize * 0.1},${y - trunkHeight - crownSize * 0.7} ${x + crownSize * 0.3},${y - trunkHeight - crownSize * 0.5}
            Q${x + crownSize * 0.5},${y - trunkHeight - crownSize * 0.3} ${x + crownSize * 0.4},${y - trunkHeight}`}
        fill="none"
        stroke="#5d4e37"
        strokeWidth="1"
      />
      {/* Foliage texture */}
      <Stipple
        x={x - crownSize * 0.3}
        y={y - trunkHeight - crownSize * 0.5}
        width={crownSize * 0.6}
        height={crownSize * 0.4}
        density="light"
        opacity={0.3}
      />
    </g>
  )
}

// ===========================================
// NATURAL ELEMENTS
// ===========================================

// Sun with rays
export function SketchSun({ x, y, size = 40 }: { x: number; y: number; size?: number }) {
  const rays: ReactNode[] = []
  const rayCount = 12

  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * Math.PI * 2
    const innerR = size * 0.5
    const outerR = size * 0.8 + Math.random() * size * 0.2
    const wobble = (Math.random() - 0.5) * 3

    rays.push(
      <line
        key={i}
        x1={x + Math.cos(angle) * innerR}
        y1={y + Math.sin(angle) * innerR}
        x2={x + Math.cos(angle) * outerR + wobble}
        y2={y + Math.sin(angle) * outerR + wobble}
        stroke="#5d4e37"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
    )
  }

  return (
    <g>
      {rays}
      <circle
        cx={x}
        cy={y}
        r={size * 0.4}
        fill="none"
        stroke="#5d4e37"
        strokeWidth="1.5"
      />
      {/* Inner detail */}
      <circle
        cx={x}
        cy={y}
        r={size * 0.25}
        fill="none"
        stroke="#5d4e37"
        strokeWidth="0.5"
        opacity="0.5"
      />
    </g>
  )
}

// Cloud
export function SketchCloud({ x, y, width = 60 }: { x: number; y: number; width?: number }) {
  const scale = width / 60

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <path
        d={`M-25,0
            Q-30,-15 -15,-15
            Q-10,-25 5,-20
            Q15,-30 25,-20
            Q35,-15 30,0
            Q35,5 25,5
            Q15,10 0,5
            Q-15,10 -25,0`}
        fill="none"
        stroke="#5d4e37"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Inner cloud detail */}
      <path
        d="M-15,-5 Q-10,-12 0,-8"
        fill="none"
        stroke="#5d4e37"
        strokeWidth="0.5"
        opacity="0.4"
      />
    </g>
  )
}

// Water/waves
export function SketchWater({
  x, y, width, height
}: {
  x: number
  y: number
  width: number
  height: number
}) {
  const waves: ReactNode[] = []
  const waveCount = Math.floor(height / 8)

  for (let i = 0; i < waveCount; i++) {
    const waveY = y + i * 8 + 4
    const amplitude = 3 + Math.random() * 2
    const wavelength = 20 + Math.random() * 10

    let path = `M${x},${waveY}`
    for (let wx = 0; wx < width; wx += wavelength) {
      const nextX = Math.min(x + wx + wavelength, x + width)
      const midX = x + wx + wavelength / 2
      const wobble = (Math.random() - 0.5) * 2
      path += ` Q${midX},${waveY - amplitude + wobble} ${nextX},${waveY}`
    }

    waves.push(
      <path
        key={i}
        d={path}
        fill="none"
        stroke="#5d4e37"
        strokeWidth="0.8"
        opacity={0.3 + (i / waveCount) * 0.3}
      />
    )
  }

  return <g>{waves}</g>
}

// Mountain range
export function SketchMountains({
  x, y, width, maxHeight = 100
}: {
  x: number
  y: number
  width: number
  maxHeight?: number
}) {
  const peaks: [number, number][] = []
  let currentX = x

  // Generate random peaks
  while (currentX < x + width) {
    const peakHeight = maxHeight * (0.4 + Math.random() * 0.6)
    const peakWidth = 30 + Math.random() * 50
    peaks.push([currentX + peakWidth / 2, y - peakHeight])
    currentX += peakWidth * 0.7
  }

  // Build path
  let path = `M${x},${y}`
  peaks.forEach(([px, py], i) => {
    const prevX = i === 0 ? x : peaks[i - 1][0]
    const prevY = i === 0 ? y : peaks[i - 1][1] + (y - peaks[i - 1][1]) * 0.3
    path += ` L${(prevX + px) / 2},${y - (y - py) * 0.3} L${px},${py}`
  })
  path += ` L${x + width},${y}`

  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke="#5d4e37"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Snow caps */}
      {peaks.map(([px, py], i) => (
        <path
          key={i}
          d={`M${px - 8},${py + 15} L${px},${py} L${px + 8},${py + 15}`}
          fill="none"
          stroke="#5d4e37"
          strokeWidth="0.5"
          opacity="0.4"
        />
      ))}
      {/* Shading */}
      {peaks.map(([px, py], i) => (
        <CrossHatch
          key={`hatch-${i}`}
          x={px - 15}
          y={py}
          width={30}
          height={y - py - 20}
          density="light"
          angle={60}
          opacity={0.15}
        />
      ))}
    </g>
  )
}

// Ground/soil layers
export function SketchGround({
  x, y, width, depth = 60
}: {
  x: number
  y: number
  width: number
  depth?: number
}) {
  const layers = [
    { name: 'topsoil', height: depth * 0.2, density: 'dense' as const },
    { name: 'subsoil', height: depth * 0.35, density: 'medium' as const },
    { name: 'rock', height: depth * 0.45, density: 'light' as const },
  ]

  let currentY = y

  return (
    <g>
      {/* Surface line with grass */}
      <path
        d={Array.from({ length: Math.floor(width / 10) }, (_, i) => {
          const gx = x + i * 10
          return `M${gx},${y} Q${gx + 3},${y - 5 - Math.random() * 5} ${gx + 5},${y}`
        }).join(' ')}
        fill="none"
        stroke="#5d4e37"
        strokeWidth="0.8"
      />

      {/* Soil layers */}
      {layers.map((layer, i) => {
        const layerY = currentY
        currentY += layer.height

        return (
          <g key={layer.name}>
            {/* Layer boundary */}
            <path
              d={`M${x},${layerY + layer.height}
                  Q${x + width * 0.3},${layerY + layer.height + (Math.random() - 0.5) * 5}
                  ${x + width * 0.6},${layerY + layer.height + (Math.random() - 0.5) * 5}
                  L${x + width},${layerY + layer.height}`}
              fill="none"
              stroke="#5d4e37"
              strokeWidth={i === layers.length - 1 ? 0 : 0.5}
              opacity="0.5"
            />
            {/* Texture */}
            <Stipple
              x={x}
              y={layerY}
              width={width}
              height={layer.height}
              density={layer.density}
              opacity={0.2 + i * 0.1}
            />
          </g>
        )
      })}

      {/* Roots */}
      {[0.2, 0.5, 0.8].map((pos, i) => (
        <path
          key={i}
          d={`M${x + width * pos},${y}
              Q${x + width * pos + (Math.random() - 0.5) * 20},${y + depth * 0.3}
              ${x + width * pos + (Math.random() - 0.5) * 30},${y + depth * 0.5}`}
          fill="none"
          stroke="#5d4e37"
          strokeWidth="0.5"
          opacity="0.4"
        />
      ))}
    </g>
  )
}

// ===========================================
// DIAGRAM ELEMENTS
// ===========================================

// Annotation with leader line
export function SketchAnnotation({
  x, y, targetX, targetY, text, position = 'right'
}: {
  x: number
  y: number
  targetX: number
  targetY: number
  text: string
  position?: 'left' | 'right' | 'top' | 'bottom'
}) {
  // Add wobble to line
  const midX = (x + targetX) / 2 + (Math.random() - 0.5) * 5
  const midY = (y + targetY) / 2 + (Math.random() - 0.5) * 5

  return (
    <g>
      {/* Leader line */}
      <path
        d={`M${targetX},${targetY} Q${midX},${midY} ${x},${y}`}
        fill="none"
        stroke="#5d4e37"
        strokeWidth="0.8"
        strokeDasharray="3,2"
        opacity="0.6"
      />
      {/* Target dot */}
      <circle cx={targetX} cy={targetY} r="2" fill="#5d4e37" opacity="0.7" />
      {/* Text */}
      <text
        x={x}
        y={y}
        textAnchor={position === 'left' ? 'end' : position === 'right' ? 'start' : 'middle'}
        className={`${handwritten} fill-amber-900`}
        fontSize="11"
      >
        {text}
      </text>
      {/* Underline */}
      <line
        x1={position === 'left' ? x - text.length * 5 : x}
        y1={y + 3}
        x2={position === 'left' ? x : x + text.length * 5}
        y2={y + 3}
        stroke="#5d4e37"
        strokeWidth="0.5"
        opacity="0.4"
      />
    </g>
  )
}

// Numbered callout
export function SketchCallout({
  x, y, number, text
}: {
  x: number
  y: number
  number: number
  text?: string
}) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r="10"
        fill="none"
        stroke="#5d4e37"
        strokeWidth="1"
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        className={`${handwritten} fill-amber-900`}
        fontSize="12"
      >
        {number}
      </text>
      {text && (
        <text
          x={x + 15}
          y={y + 4}
          textAnchor="start"
          className={`${handwritten} fill-amber-800`}
          fontSize="10"
        >
          {text}
        </text>
      )}
    </g>
  )
}

// Scale bar
export function SketchScaleBar({
  x, y, width, label
}: {
  x: number
  y: number
  width: number
  label: string
}) {
  return (
    <g>
      <line
        x1={x}
        y1={y}
        x2={x + width}
        y2={y}
        stroke="#5d4e37"
        strokeWidth="1"
      />
      <line x1={x} y1={y - 5} x2={x} y2={y + 5} stroke="#5d4e37" strokeWidth="1" />
      <line x1={x + width} y1={y - 5} x2={x + width} y2={y + 5} stroke="#5d4e37" strokeWidth="1" />
      <text
        x={x + width / 2}
        y={y - 8}
        textAnchor="middle"
        className={`${handwritten} fill-amber-800`}
        fontSize="10"
      >
        {label}
      </text>
    </g>
  )
}

// Compass rose
export function SketchCompass({ x, y, size = 40 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Outer circle */}
      <circle cx="0" cy="0" r={size * 0.5} fill="none" stroke="#5d4e37" strokeWidth="1" />
      {/* Inner circle */}
      <circle cx="0" cy="0" r={size * 0.15} fill="none" stroke="#5d4e37" strokeWidth="0.5" />
      {/* Cardinal points */}
      {['N', 'E', 'S', 'W'].map((dir, i) => {
        const angle = (i * 90 - 90) * Math.PI / 180
        const r = size * 0.35
        return (
          <g key={dir}>
            <line
              x1={Math.cos(angle) * size * 0.2}
              y1={Math.sin(angle) * size * 0.2}
              x2={Math.cos(angle) * size * 0.45}
              y2={Math.sin(angle) * size * 0.45}
              stroke="#5d4e37"
              strokeWidth={dir === 'N' ? 2 : 1}
            />
            <text
              x={Math.cos(angle) * (size * 0.6)}
              y={Math.sin(angle) * (size * 0.6) + 4}
              textAnchor="middle"
              className={`${handwritten} fill-amber-900`}
              fontSize={dir === 'N' ? 14 : 10}
            >
              {dir}
            </text>
          </g>
        )
      })}
    </g>
  )
}

// Decorative page divider
export function PageDivider({
  x, y, width, variant = 'flourish'
}: {
  x: number
  y: number
  width: number
  variant?: 'flourish' | 'simple' | 'botanical'
}) {
  const center = x + width / 2

  if (variant === 'simple') {
    return (
      <g>
        <line x1={x} y1={y} x2={x + width * 0.4} y2={y} stroke="#5d4e37" strokeWidth="0.5" opacity="0.4" />
        <circle cx={center} cy={y} r="3" fill="none" stroke="#5d4e37" strokeWidth="0.5" opacity="0.4" />
        <line x1={x + width * 0.6} y1={y} x2={x + width} y2={y} stroke="#5d4e37" strokeWidth="0.5" opacity="0.4" />
      </g>
    )
  }

  if (variant === 'botanical') {
    return (
      <g opacity="0.4">
        <line x1={x} y1={y} x2={x + width * 0.35} y2={y} stroke="#5d4e37" strokeWidth="0.5" />
        <SketchLeaf x={center} y={y + 15} size={20} rotation={0} />
        <line x1={x + width * 0.65} y1={y} x2={x + width} y2={y} stroke="#5d4e37" strokeWidth="0.5" />
      </g>
    )
  }

  // Flourish
  return (
    <g opacity="0.4">
      <path
        d={`M${x},${y} Q${x + width * 0.2},${y - 5} ${center - 20},${y}
            M${center - 20},${y} Q${center},${y - 10} ${center + 20},${y}
            M${center + 20},${y} Q${x + width * 0.8},${y - 5} ${x + width},${y}`}
        fill="none"
        stroke="#5d4e37"
        strokeWidth="0.8"
      />
      <circle cx={center} cy={y - 8} r="2" fill="#5d4e37" />
    </g>
  )
}

export default {
  CrossHatch,
  Stipple,
  SketchLeaf,
  SketchFlower,
  SketchTree,
  SketchSun,
  SketchCloud,
  SketchWater,
  SketchMountains,
  SketchGround,
  SketchAnnotation,
  SketchCallout,
  SketchScaleBar,
  SketchCompass,
  PageDivider
}
