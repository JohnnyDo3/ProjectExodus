'use client'

import React from 'react'

// Reusable HaloFilter for golden glow effect
const HaloFilter = ({ id, intensity = 1 }: { id: string; intensity?: number }) => (
  <defs>
    <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation={3 * intensity} result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values={`1 0 0 0 0.3
                0 0.8 0 0 0.2
                0 0 0.2 0 0
                0 0 0 ${0.6 * intensity} 0`}
        result="glow"
      />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
)

interface SVGProps {
  showHalo?: boolean
}

// 1. Ashlar - precisely cut stone blocks
const AshlarSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="ashlar-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#ashlar-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Regular, precisely cut stones */}
      {[0, 1, 2, 3, 4].map((row) => {
        const offset = row % 2 === 0 ? 0 : 20
        return [0, 1, 2].map((col) => {
          const x = 10 + offset + col * 40
          const y = 10 + row * 16
          const width = col === 2 && row % 2 === 1 ? 20 : 38
          return x < 90 && (
            <path key={`${row}-${col}`} d={`M${x} ${y} L${Math.min(x+width, 90)} ${y} L${Math.min(x+width, 90)} ${y+15} L${x} ${y+15} Z`} />
          )
        })
      })}
      {/* Clean mortar joints */}
      <path d="M10 10 L90 10" strokeWidth="0.4" opacity="0.5" />
      <path d="M10 26 L90 26" strokeWidth="0.4" opacity="0.5" />
      <path d="M10 42 L90 42" strokeWidth="0.4" opacity="0.5" />
      <path d="M10 58 L90 58" strokeWidth="0.4" opacity="0.5" />
      <path d="M10 74 L90 74" strokeWidth="0.4" opacity="0.5" />
      <path d="M10 90 L90 90" strokeWidth="0.4" opacity="0.5" />
      {/* Border */}
      <path d="M10 10 L90 10 L90 90 L10 90 Z" strokeWidth="1" />
    </g>
  </svg>
)

// 2. Bond - brick arrangement pattern
const BondSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="bond-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#bond-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Flemish bond pattern - alternating stretchers and headers */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => {
        const y = 10 + row * 10
        const offset = row % 2 === 0 ? 0 : 12
        return (
          <g key={row}>
            {/* Stretcher */}
            <path d={`M${10+offset} ${y} L${10+offset+20} ${y} L${10+offset+20} ${y+9} L${10+offset} ${y+9} Z`} />
            {/* Header */}
            <path d={`M${32+offset} ${y} L${32+offset+10} ${y} L${32+offset+10} ${y+9} L${32+offset} ${y+9} Z`} />
            {/* Stretcher */}
            <path d={`M${44+offset} ${y} L${44+offset+20} ${y} L${44+offset+20} ${y+9} L${44+offset} ${y+9} Z`} />
            {/* Header */}
            <path d={`M${66+offset} ${y} L${Math.min(66+offset+10, 90)} ${y} L${Math.min(66+offset+10, 90)} ${y+9} L${66+offset} ${y+9} Z`} />
            {row % 2 === 0 && offset === 0 && (
              <path d={`M${78} ${y} L${90} ${y} L${90} ${y+9} L${78} ${y+9} Z`} />
            )}
          </g>
        )
      })}
      {/* Border */}
      <path d="M10 10 L90 10 L90 90 L10 90 Z" strokeWidth="1" />
    </g>
  </svg>
)

// 3. Brick wall
const BrickSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="brick-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#brick-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Running bond brick pattern */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row) => {
        const y = 8 + row * 10
        const offset = row % 2 === 0 ? 0 : 10
        return [0, 1, 2, 3, 4].map((col) => {
          const x = 8 + offset + col * 18
          return x + 16 <= 92 && (
            <path key={`${row}-${col}`} d={`M${x} ${y} L${x+16} ${y} L${x+16} ${y+8} L${x} ${y+8} Z`} />
          )
        })
      })}
      {/* Mortar texture */}
      <path d="M8 18 L92 18" strokeWidth="0.3" opacity="0.4" />
      <path d="M8 28 L92 28" strokeWidth="0.3" opacity="0.4" />
      <path d="M8 38 L92 38" strokeWidth="0.3" opacity="0.4" />
      <path d="M8 48 L92 48" strokeWidth="0.3" opacity="0.4" />
      {/* Border */}
      <path d="M8 8 L92 8 L92 92 L8 92 Z" strokeWidth="1" />
    </g>
  </svg>
)

// 4. Coursing - horizontal layers in wall
const CoursingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="coursing-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#coursing-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Wall section showing courses */}
      <path d="M10 10 L90 10 L90 90 L10 90 Z" />
      {/* Course lines (varying heights to show different course types) */}
      <path d="M10 18 L90 18" strokeWidth="1" />
      <path d="M10 28 L90 28" strokeWidth="1" />
      <path d="M10 36 L90 36" strokeWidth="1" />
      <path d="M10 46 L90 46" strokeWidth="1" />
      <path d="M10 54 L90 54" strokeWidth="1" />
      <path d="M10 64 L90 64" strokeWidth="1" />
      <path d="M10 72 L90 72" strokeWidth="1" />
      <path d="M10 82 L90 82" strokeWidth="1" />
      {/* Vertical joints - staggered */}
      <path d="M30 10 L30 18" />
      <path d="M55 10 L55 18" />
      <path d="M80 10 L80 18" />
      <path d="M20 18 L20 28" />
      <path d="M45 18 L45 28" />
      <path d="M70 18 L70 28" />
      <path d="M35 28 L35 36" />
      <path d="M60 28 L60 36" />
      <path d="M85 28 L85 36" />
      {/* Course height dimension */}
      <path d="M95 18 L98 18 L98 28 L95 28" strokeWidth="0.4" />
      <path d="M96.5 20 L96.5 26" strokeWidth="0.4" />
    </g>
  </svg>
)

// 5. Drystone - wall without mortar
const DrystoneSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="drystone-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#drystone-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Irregular stone shapes - no mortar visible */}
      <path d="M10 15 L28 12 L35 18 L30 28 L12 25 Z" />
      <path d="M28 12 L50 10 L55 15 L48 25 L35 18 Z" />
      <path d="M50 10 L72 12 L75 22 L60 28 L55 15 Z" />
      <path d="M72 12 L90 15 L88 30 L75 22 Z" />
      <path d="M12 25 L30 28 L28 42 L10 38 Z" />
      <path d="M30 28 L48 25 L52 38 L35 45 L28 42 Z" />
      <path d="M48 25 L60 28 L65 42 L52 38 Z" />
      <path d="M60 28 L75 22 L80 35 L72 45 L65 42 Z" />
      <path d="M75 22 L88 30 L90 45 L80 35 Z" />
      <path d="M10 38 L28 42 L25 58 L12 55 Z" />
      <path d="M28 42 L35 45 L38 60 L25 58 Z" />
      <path d="M35 45 L52 38 L58 55 L45 62 L38 60 Z" />
      <path d="M52 38 L65 42 L68 58 L58 55 Z" />
      <path d="M65 42 L72 45 L75 60 L68 58 Z" />
      <path d="M72 45 L80 35 L90 45 L88 62 L75 60 Z" />
      {/* Lower courses */}
      <path d="M12 55 L25 58 L22 72 L10 68 Z" />
      <path d="M25 58 L45 62 L42 78 L22 72 Z" />
      <path d="M45 62 L68 58 L70 75 L48 80 L42 78 Z" />
      <path d="M68 58 L88 62 L90 80 L70 75 Z" />
      {/* Cap stones */}
      <path d="M10 68 L22 72 L20 85 L8 82 Z" />
      <path d="M22 72 L42 78 L40 90 L20 85 Z" />
      <path d="M42 78 L70 75 L72 88 L45 92 L40 90 Z" />
      <path d="M70 75 L90 80 L92 92 L72 88 Z" />
    </g>
  </svg>
)

// 6. Masonry - general stone/brick construction
const MasonrySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="masonry-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#masonry-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Mixed masonry pattern */}
      {/* First course - large stones */}
      <path d="M10 10 L45 10 L45 25 L10 25 Z" />
      <path d="M47 10 L90 10 L90 25 L47 25 Z" />
      {/* Second course */}
      <path d="M10 27 L30 27 L30 40 L10 40 Z" />
      <path d="M32 27 L65 27 L65 40 L32 40 Z" />
      <path d="M67 27 L90 27 L90 40 L67 40 Z" />
      {/* Third course */}
      <path d="M10 42 L50 42 L50 55 L10 55 Z" />
      <path d="M52 42 L90 42 L90 55 L52 55 Z" />
      {/* Fourth course */}
      <path d="M10 57 L35 57 L35 70 L10 70 Z" />
      <path d="M37 57 L70 57 L70 70 L37 70 Z" />
      <path d="M72 57 L90 57 L90 70 L72 70 Z" />
      {/* Fifth course */}
      <path d="M10 72 L55 72 L55 85 L10 85 Z" />
      <path d="M57 72 L90 72 L90 85 L57 85 Z" />
      {/* Mortar lines */}
      <path d="M10 10 L90 10 L90 90 L10 90 Z" strokeWidth="1" />
      {/* Texture marks */}
      <path d="M20 16 L28 18" opacity="0.3" />
      <path d="M55 32 L62 35" opacity="0.3" />
      <path d="M25 48 L32 50" opacity="0.3" />
      <path d="M78 62 L84 64" opacity="0.3" />
    </g>
  </svg>
)

// 7. Rubble - irregular uncut stones
const RubbleSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="rubble-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#rubble-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Very irregular stone shapes */}
      <path d="M12 12 L25 10 L30 20 L22 28 L10 22 Z" />
      <path d="M25 10 L42 15 L45 28 L30 20 Z" />
      <path d="M42 15 L58 10 L65 22 L55 30 L45 28 Z" />
      <path d="M58 10 L78 12 L82 25 L70 30 L65 22 Z" />
      <path d="M78 12 L92 18 L90 32 L82 25 Z" />
      <path d="M10 22 L22 28 L18 42 L8 38 Z" />
      <path d="M22 28 L30 20 L45 28 L40 42 L25 45 L18 42 Z" />
      <path d="M45 28 L55 30 L60 45 L48 48 L40 42 Z" />
      <path d="M55 30 L70 30 L75 42 L68 52 L60 45 Z" />
      <path d="M70 30 L82 25 L90 32 L88 48 L75 42 Z" />
      <path d="M8 38 L18 42 L15 58 L10 55 Z" />
      <path d="M18 42 L25 45 L28 60 L15 58 Z" />
      <path d="M25 45 L40 42 L48 48 L45 62 L32 65 L28 60 Z" />
      <path d="M48 48 L60 45 L68 52 L65 68 L52 70 L45 62 Z" />
      <path d="M68 52 L75 42 L88 48 L90 65 L78 70 L65 68 Z" />
      {/* Lower section */}
      <path d="M10 55 L28 60 L25 78 L8 75 Z" />
      <path d="M28 60 L45 62 L48 80 L30 82 L25 78 Z" />
      <path d="M45 62 L65 68 L62 85 L48 80 Z" />
      <path d="M65 68 L90 65 L92 88 L68 90 L62 85 Z" />
      {/* Border */}
      <path d="M8 10 L92 10 L92 92 L8 92 Z" strokeWidth="1" />
    </g>
  </svg>
)

// 8. Rustication - deeply grooved stone blocks
const RusticationSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="rustication-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#rustication-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Rusticated stones with deep joints */}
      {[0, 1, 2, 3].map((row) => {
        const offset = row % 2 === 0 ? 0 : 22
        return [0, 1, 2].map((col) => {
          const x = 8 + offset + col * 44
          const y = 10 + row * 20
          const width = 40
          if (x + width > 92) return null
          return (
            <g key={`${row}-${col}`}>
              {/* Stone block */}
              <path d={`M${x} ${y} L${x+width} ${y} L${x+width} ${y+18} L${x} ${y+18} Z`} />
              {/* Beveled/chamfered edges showing depth */}
              <path d={`M${x+2} ${y+2} L${x+width-2} ${y+2} L${x+width-2} ${y+16} L${x+2} ${y+16} Z`} strokeWidth="0.5" />
              {/* Rough texture on face */}
              <path d={`M${x+8} ${y+6} L${x+12} ${y+8}`} opacity="0.4" />
              <path d={`M${x+22} ${y+10} L${x+28} ${y+12}`} opacity="0.4" />
            </g>
          )
        })
      })}
      {/* Deep joint grooves */}
      <path d="M8 28 L92 28" strokeWidth="2" />
      <path d="M8 48 L92 48" strokeWidth="2" />
      <path d="M8 68 L92 68" strokeWidth="2" />
      <path d="M8 88 L92 88" strokeWidth="2" />
      {/* Vertical deep joints */}
      <path d="M48 10 L48 28" strokeWidth="2" />
      <path d="M30 28 L30 48" strokeWidth="2" />
      <path d="M74 28 L74 48" strokeWidth="2" />
      <path d="M52 48 L52 68" strokeWidth="2" />
      {/* Border */}
      <path d="M8 10 L92 10 L92 90 L8 90 Z" strokeWidth="1" />
    </g>
  </svg>
)

// Export mapping for all wall elements
export const WALL_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'ashlar': AshlarSVG,
  'bond': BondSVG,
  'brick': BrickSVG,
  'coursing': CoursingSVG,
  'drystone': DrystoneSVG,
  'masonry': MasonrySVG,
  'rubble': RubbleSVG,
  'rustication': RusticationSVG,
}

export {
  AshlarSVG,
  BondSVG,
  BrickSVG,
  CoursingSVG,
  DrystoneSVG,
  MasonrySVG,
  RubbleSVG,
  RusticationSVG,
}
