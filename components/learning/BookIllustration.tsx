'use client'

import { useState, ReactNode } from 'react'
import { motion } from 'framer-motion'

// Hand-drawn sketch style wrapper for illustrations
// Creates the feeling of pages carved from an old naturalist's journal

interface BookIllustrationProps {
  children: ReactNode
  title?: string
  caption?: string
  artist?: string
  year?: string
  className?: string
  variant?: 'botanical' | 'technical' | 'landscape' | 'diagram'
}

// Handwritten font
const handwritten = "font-['Caveat',_cursive]"

// SVG filter for hand-drawn sketch effect
const SketchFilter = () => (
  <svg className="absolute w-0 h-0">
    <defs>
      {/* Pencil/charcoal texture effect */}
      <filter id="sketch-filter" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>

      {/* Aged paper texture */}
      <filter id="paper-texture" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
        <feDiffuseLighting in="noise" lightingColor="#f5f0e6" surfaceScale="1.5">
          <feDistantLight azimuth="45" elevation="60" />
        </feDiffuseLighting>
      </filter>

      {/* Sepia tone effect */}
      <filter id="sepia-tone">
        <feColorMatrix type="matrix" values="
          0.393 0.769 0.189 0 0
          0.349 0.686 0.168 0 0
          0.272 0.534 0.131 0 0
          0 0 0 1 0
        "/>
      </filter>

      {/* Ink bleed effect */}
      <filter id="ink-bleed">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" result="blur" />
        <feMorphology in="blur" operator="dilate" radius="0.2" result="dilated" />
        <feComposite in="SourceGraphic" in2="dilated" operator="over" />
      </filter>
    </defs>
  </svg>
)

// Decorative corner ornaments
function CornerOrnament({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const transforms: Record<string, string> = {
    tl: '',
    tr: 'scale(-1, 1)',
    bl: 'scale(1, -1)',
    br: 'scale(-1, -1)'
  }

  return (
    <svg
      className={`absolute w-12 h-12 text-amber-800/40 ${
        position === 'tl' ? 'top-2 left-2' :
        position === 'tr' ? 'top-2 right-2' :
        position === 'bl' ? 'bottom-2 left-2' :
        'bottom-2 right-2'
      }`}
      viewBox="0 0 50 50"
      style={{ transform: transforms[position] }}
    >
      <path
        d="M5,5 Q5,25 25,25 Q25,5 45,5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M10,10 C15,15 15,20 25,20"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

// Page margin decorations - botanical leaves
function MarginDecoration({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`absolute top-1/4 ${side === 'left' ? '-left-4' : '-right-4'} opacity-20`}>
      <svg width="30" height="120" viewBox="0 0 30 120" className="text-amber-900">
        {/* Vine stem */}
        <path
          d="M15,0 C18,30 12,60 15,90 C18,100 15,110 15,120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* Leaves */}
        {[20, 45, 70, 95].map((y, i) => (
          <g key={i} transform={`translate(15, ${y})`}>
            <ellipse
              cx={i % 2 === 0 ? 8 : -8}
              cy="0"
              rx="6"
              ry="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              transform={`rotate(${i % 2 === 0 ? 30 : -30})`}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}

export function BookIllustration({
  children,
  title,
  caption,
  artist = "Natural History Collection",
  year = "1847",
  className = "",
  variant = 'diagram'
}: BookIllustrationProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <SketchFilter />

      {/* Aged parchment background */}
      <div className="relative bg-gradient-to-br from-amber-50 via-[#f5f0e6] to-amber-100/80 rounded-sm overflow-hidden">
        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'multiply'
          }}
        />

        {/* Aged stain effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-300/15 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-amber-400/10 rounded-full blur-xl" />
        </div>

        {/* Corner ornaments */}
        <CornerOrnament position="tl" />
        <CornerOrnament position="tr" />
        <CornerOrnament position="bl" />
        <CornerOrnament position="br" />

        {/* Margin decorations */}
        <MarginDecoration side="left" />
        <MarginDecoration side="right" />

        {/* Page border - multiple aged lines */}
        <div className="absolute inset-3 border border-amber-800/20 rounded-sm pointer-events-none" />
        <div className="absolute inset-4 border border-amber-900/10 rounded-sm pointer-events-none" />

        {/* Main content area */}
        <div className="relative p-6 sm:p-8">
          {/* Title plate */}
          {title && (
            <div className="text-center mb-6">
              <div className="inline-block relative">
                {/* Decorative line above */}
                <div className="flex items-center justify-center gap-3 mb-2">
                  <svg width="60" height="8" viewBox="0 0 60 8" className="text-amber-800/40">
                    <path d="M0,4 L20,4 M25,4 L35,4 M40,4 L60,4" stroke="currentColor" strokeWidth="1" />
                    <circle cx="22.5" cy="4" r="2" fill="currentColor" />
                    <circle cx="37.5" cy="4" r="2" fill="currentColor" />
                  </svg>
                </div>

                <h3 className={`${handwritten} text-3xl sm:text-4xl text-amber-900 tracking-wide`}>
                  {title}
                </h3>

                {/* Decorative line below */}
                <div className="flex items-center justify-center gap-3 mt-2">
                  <svg width="80" height="12" viewBox="0 0 80 12" className="text-amber-800/30">
                    <path d="M0,6 Q20,2 40,6 Q60,10 80,6" stroke="currentColor" strokeWidth="1" fill="none" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Illustration container with vintage frame effect */}
          <div className="relative">
            {/* Inner shadow frame */}
            <div
              className="absolute inset-0 rounded pointer-events-none"
              style={{
                boxShadow: 'inset 0 2px 8px rgba(139, 69, 19, 0.15), inset 0 -2px 8px rgba(139, 69, 19, 0.1)'
              }}
            />

            {/* Illustration content - apply sepia/sketch styling */}
            <div
              className="relative overflow-hidden rounded"
              style={{
                filter: 'sepia(0.15) contrast(1.05) brightness(0.98)'
              }}
            >
              {children}
            </div>
          </div>

          {/* Caption area */}
          {caption && (
            <div className="mt-6 text-center">
              <p className={`${handwritten} text-lg text-amber-800/80 italic leading-relaxed max-w-xl mx-auto`}>
                "{caption}"
              </p>
            </div>
          )}

          {/* Attribution footer */}
          <div className="mt-6 pt-4 border-t border-amber-800/10">
            <div className="flex items-center justify-between text-xs text-amber-700/50">
              <span className="italic">{artist}</span>
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" className="opacity-60">
                  <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
                  <path d="M8,4 L8,8 L11,10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
                Plate {Math.floor(Math.random() * 50) + 1}, {year}
              </span>
            </div>
          </div>
        </div>

        {/* Page fold effect */}
        <div
          className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, transparent 50%, rgba(139, 69, 19, 0.05) 50%)'
          }}
        />
      </div>

      {/* Subtle hover glow */}
      <motion.div
        className="absolute inset-0 rounded-sm pointer-events-none"
        style={{
          boxShadow: '0 4px 20px rgba(139, 69, 19, 0.1)'
        }}
        animate={{
          boxShadow: isHovered
            ? '0 8px 30px rgba(139, 69, 19, 0.15)'
            : '0 4px 20px rgba(139, 69, 19, 0.1)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

// Sketch-style label component for diagrams
export function SketchLabel({
  children,
  x,
  y,
  anchor = 'middle',
  size = 'md'
}: {
  children: string
  x: number
  y: number
  anchor?: 'start' | 'middle' | 'end'
  size?: 'sm' | 'md' | 'lg'
}) {
  const fontSize = size === 'sm' ? 10 : size === 'md' ? 12 : 16

  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className={`${handwritten} fill-amber-900`}
      fontSize={fontSize}
      style={{ filter: 'url(#ink-bleed)' }}
    >
      {children}
    </text>
  )
}

// Hand-drawn line component
export function SketchLine({
  x1, y1, x2, y2,
  variant = 'solid'
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  variant?: 'solid' | 'dashed' | 'dotted'
}) {
  // Add slight wobble to make it look hand-drawn
  const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * 3
  const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * 3

  return (
    <path
      d={`M${x1},${y1} Q${midX},${midY} ${x2},${y2}`}
      fill="none"
      stroke="#5d4e37"
      strokeWidth="1"
      strokeLinecap="round"
      strokeDasharray={
        variant === 'dashed' ? '6,4' :
        variant === 'dotted' ? '2,3' :
        undefined
      }
      opacity="0.8"
    />
  )
}

// Hand-drawn arrow component
export function SketchArrow({
  x1, y1, x2, y2,
  label
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  label?: string
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const arrowLength = 8
  const arrowAngle = Math.PI / 6

  const arrow1X = x2 - arrowLength * Math.cos(angle - arrowAngle)
  const arrow1Y = y2 - arrowLength * Math.sin(angle - arrowAngle)
  const arrow2X = x2 - arrowLength * Math.cos(angle + arrowAngle)
  const arrow2Y = y2 - arrowLength * Math.sin(angle + arrowAngle)

  // Add wobble
  const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * 4
  const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * 4

  return (
    <g>
      <path
        d={`M${x1},${y1} Q${midX},${midY} ${x2},${y2}`}
        fill="none"
        stroke="#5d4e37"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d={`M${arrow1X},${arrow1Y} L${x2},${y2} L${arrow2X},${arrow2Y}`}
        fill="none"
        stroke="#5d4e37"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      {label && (
        <text
          x={midX}
          y={midY - 8}
          textAnchor="middle"
          className={`${handwritten} fill-amber-800`}
          fontSize="11"
        >
          {label}
        </text>
      )}
    </g>
  )
}

export default BookIllustration
