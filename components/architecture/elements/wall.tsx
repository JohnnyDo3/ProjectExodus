'use client'

import React from 'react'
import { MaterialPatterns } from './materialPatterns'

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

/**
 * ASHLAR
 * Architectural Reference: Classical and Renaissance masonry featuring precisely dressed stone
 * blocks laid in regular courses with fine mortar joints. Distinguished by uniform dimensions
 * and smooth faces. Common in Georgian, Federal, and Beaux-Arts architecture.
 */
const AshlarSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="ashlar-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#ashlar-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Building elevation outline */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.5">
        {/* Floor lines */}
        <path d="M2 25 L5 25" />
        <path d="M2 50 L5 50" />
        <path d="M2 75 L5 75" />
        <text x="1" y="27" fontSize="3" opacity="0.6">2ND FL</text>
        <text x="1" y="52" fontSize="3" opacity="0.6">1ST FL</text>
        <text x="1" y="77" fontSize="3" opacity="0.6">GRADE</text>
        {/* Building outline */}
        <path d="M5 5 L5 95 M95 5 L95 95" />
        <path d="M5 5 L95 5" />
      </g>

      {/* PRIMARY: Ashlar stonework - precisely cut regular blocks */}
      <g strokeWidth="0.8">
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
        {/* Wall border */}
        <path d="M10 10 L90 10 L90 90 L10 90 Z" strokeWidth="1.2" />
      </g>
    </g>
  </svg>
)

/**
 * BOND
 * Architectural Reference: Flemish bond masonry pattern alternating headers (short face)
 * and stretchers (long face) in each course. Creates structural integrity and decorative
 * pattern. Prominent in Dutch Colonial, Georgian, and Federal architecture.
 */
const BondSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="bond-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#bond-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Wall elevation with foundation */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.5">
        {/* Foundation line */}
        <path d="M5 92 L95 92" />
        <text x="3" y="96" fontSize="3" opacity="0.6">FNDN</text>
        {/* Roof line */}
        <path d="M5 5 L50 2 L95 5" />
        {/* Corner quoins */}
        <path d="M5 10 L8 10 L8 90" />
        <path d="M92 10 L95 10 L95 90" />
      </g>

      {/* PRIMARY: Flemish bond pattern - alternating stretchers and headers */}
      <g strokeWidth="0.8">
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
        {/* Wall border */}
        <path d="M10 10 L90 10 L90 90 L10 90 Z" strokeWidth="1.2" />
      </g>
    </g>
  </svg>
)

/**
 * BRICK
 * Architectural Reference: Running bond brick pattern with staggered vertical joints.
 * Standard pattern in residential and commercial construction. Each brick offset by
 * half-length creates load distribution. Universal in Victorian through Modern eras.
 */
const BrickSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="brick-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#brick-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Wall section with structural elements */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.5">
        {/* Floor/foundation reference */}
        <path d="M2 8 L6 8 M2 92 L6 92" />
        <text x="1" y="6" fontSize="3" opacity="0.6">TOP</text>
        <text x="1" y="95" fontSize="3" opacity="0.6">BTM</text>
        {/* Cavity/backing wall */}
        <path d="M93 8 L96 8 L96 92 L93 92" />
        {/* Weep holes */}
        <circle cx="20" cy="94" r="0.8" opacity="0.5" />
        <circle cx="50" cy="94" r="0.8" opacity="0.5" />
        <circle cx="80" cy="94" r="0.8" opacity="0.5" />
      </g>

      {/* PRIMARY: Running bond brick pattern */}
      <g strokeWidth="0.8">
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
        {/* Wall border */}
        <path d="M8 8 L92 8 L92 92 L8 92 Z" strokeWidth="1.2" />
      </g>
    </g>
  </svg>
)

/**
 * COURSING
 * Architectural Reference: Horizontal layers (courses) in masonry construction showing
 * varying heights for different functional/aesthetic purposes. String courses, belt courses,
 * and water tables define floor levels and architectural divisions in Classical styles.
 */
const CoursingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="coursing-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#coursing-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Building elevation showing floor levels */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.5">
        {/* Floor level indicators */}
        <path d="M2 28 L8 28" />
        <path d="M2 64 L8 64" />
        <text x="1" y="27" fontSize="3" opacity="0.6">2ND</text>
        <text x="1" y="63" fontSize="3" opacity="0.6">1ST</text>
        {/* Adjacent wall sections */}
        <path d="M92 10 L98 10 L98 90 L92 90" />
        {/* Ground line */}
        <path d="M2 90 L98 90" />
      </g>

      {/* PRIMARY: Course lines showing varying heights */}
      <g strokeWidth="0.8">
        {/* Wall section */}
        <path d="M10 10 L90 10 L90 90 L10 90 Z" strokeWidth="1.2" />
        {/* Course lines (varying heights for different course types) */}
        <path d="M10 18 L90 18" strokeWidth="1" />
        <path d="M10 28 L90 28" strokeWidth="1.2" /> {/* String course */}
        <path d="M10 36 L90 36" strokeWidth="1" />
        <path d="M10 46 L90 46" strokeWidth="1" />
        <path d="M10 54 L90 54" strokeWidth="1" />
        <path d="M10 64 L90 64" strokeWidth="1.2" /> {/* Belt course */}
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
    </g>
  </svg>
)

/**
 * DRYSTONE
 * Architectural Reference: Traditional mortarless construction relying on gravity,
 * friction, and careful stone selection. Interlocking irregular stones create stable
 * walls. Found in rural vernacular architecture, agricultural boundaries, and landscape.
 */
const DrystoneSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="drystone-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#drystone-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Landscape section */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.5">
        {/* Ground/terrain lines */}
        <path d="M2 95 Q20 92 40 94 T80 92 L98 95" />
        {/* Vegetation indication */}
        <path d="M3 90 L5 85 L7 90" />
        <path d="M93 88 L95 83 L97 88" />
        {/* Wall section cut lines */}
        <path d="M10 5 L10 12" />
        <path d="M90 5 L90 12" />
        <text x="45" y="4" fontSize="3" opacity="0.6">SECTION</text>
      </g>

      {/* PRIMARY: Irregular stone shapes - no mortar visible */}
      <g strokeWidth="0.8">
        {/* Top course */}
        <path d="M10 15 L28 12 L35 18 L30 28 L12 25 Z" />
        <path d="M28 12 L50 10 L55 15 L48 25 L35 18 Z" />
        <path d="M50 10 L72 12 L75 22 L60 28 L55 15 Z" />
        <path d="M72 12 L90 15 L88 30 L75 22 Z" />
        {/* Second course */}
        <path d="M12 25 L30 28 L28 42 L10 38 Z" />
        <path d="M30 28 L48 25 L52 38 L35 45 L28 42 Z" />
        <path d="M48 25 L60 28 L65 42 L52 38 Z" />
        <path d="M60 28 L75 22 L80 35 L72 45 L65 42 Z" />
        <path d="M75 22 L88 30 L90 45 L80 35 Z" />
        {/* Third course */}
        <path d="M10 38 L28 42 L25 58 L12 55 Z" />
        <path d="M28 42 L35 45 L38 60 L25 58 Z" />
        <path d="M35 45 L52 38 L58 55 L45 62 L38 60 Z" />
        <path d="M52 38 L65 42 L68 58 L58 55 Z" />
        <path d="M65 42 L72 45 L75 60 L68 58 Z" />
        <path d="M72 45 L80 35 L90 45 L88 62 L75 60 Z" />
        {/* Fourth course */}
        <path d="M12 55 L25 58 L22 72 L10 68 Z" />
        <path d="M25 58 L45 62 L42 78 L22 72 Z" />
        <path d="M45 62 L68 58 L70 75 L48 80 L42 78 Z" />
        <path d="M68 58 L88 62 L90 80 L70 75 Z" />
        {/* Cap stones */}
        <path d="M10 68 L22 72 L20 85 L8 82 Z" strokeWidth="1" />
        <path d="M22 72 L42 78 L40 90 L20 85 Z" strokeWidth="1" />
        <path d="M42 78 L70 75 L72 88 L45 92 L40 90 Z" strokeWidth="1" />
        <path d="M70 75 L90 80 L92 92 L72 88 Z" strokeWidth="1" />
      </g>
    </g>
  </svg>
)

/**
 * MASONRY
 * Architectural Reference: General stonework or brickwork showing varied unit sizes
 * in traditional bond patterns. Coursed rubble or mixed masonry common in vernacular
 * and institutional architecture. Structural integrity through interlocking and mortar.
 */
const MasonrySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="masonry-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#masonry-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Wall section with structural frame */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.5">
        {/* Floor joists/beams bearing on wall */}
        <path d="M90 25 L96 25" />
        <path d="M90 55 L96 55" />
        <path d="M90 85 L96 85" />
        <text x="97" y="27" fontSize="2.5" opacity="0.6">FLR</text>
        <text x="97" y="57" fontSize="2.5" opacity="0.6">FLR</text>
        <text x="97" y="87" fontSize="2.5" opacity="0.6">FLR</text>
        {/* Wall thickness indication */}
        <path d="M10 3 L90 3" />
        <path d="M10 3 L10 5 M90 3 L90 5" />
        <text x="45" y="2" fontSize="3" opacity="0.6">WALL</text>
      </g>

      {/* PRIMARY: Mixed masonry pattern */}
      <g strokeWidth="0.8">
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
        {/* Wall outline */}
        <path d="M10 10 L90 10 L90 90 L10 90 Z" strokeWidth="1.2" />
        {/* Texture marks */}
        <path d="M20 16 L28 18" opacity="0.3" />
        <path d="M55 32 L62 35" opacity="0.3" />
        <path d="M25 48 L32 50" opacity="0.3" />
        <path d="M78 62 L84 64" opacity="0.3" />
      </g>
    </g>
  </svg>
)

/**
 * RUBBLE
 * Architectural Reference: Uncut or roughly shaped stones laid without regular coursing.
 * Field stone construction common in vernacular architecture. Structural stability through
 * mass and careful interlocking. Found in medieval, agricultural, and rustic buildings.
 */
const RubbleSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="rubble-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#rubble-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Wall section view */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.5">
        {/* Foundation footing */}
        <path d="M5 92 L10 92 L10 95 L5 95" />
        <path d="M90 92 L95 92 L95 95 L90 95" />
        <text x="3" y="98" fontSize="3" opacity="0.6">FTG</text>
        {/* Wall height reference */}
        <path d="M2 10 L5 10 M2 50 L5 50 M2 92 L5 92" />
        <path d="M3 10 L3 92" strokeWidth="0.3" />
        {/* Coping/cap indication */}
        <path d="M8 8 L92 8 L95 5 L5 5 Z" />
      </g>

      {/* PRIMARY: Very irregular stone shapes with mortar */}
      <g strokeWidth="0.8">
        {/* Top course */}
        <path d="M12 12 L25 10 L30 20 L22 28 L10 22 Z" />
        <path d="M25 10 L42 15 L45 28 L30 20 Z" />
        <path d="M42 15 L58 10 L65 22 L55 30 L45 28 Z" />
        <path d="M58 10 L78 12 L82 25 L70 30 L65 22 Z" />
        <path d="M78 12 L92 18 L90 32 L82 25 Z" />
        {/* Second course */}
        <path d="M10 22 L22 28 L18 42 L8 38 Z" />
        <path d="M22 28 L30 20 L45 28 L40 42 L25 45 L18 42 Z" />
        <path d="M45 28 L55 30 L60 45 L48 48 L40 42 Z" />
        <path d="M55 30 L70 30 L75 42 L68 52 L60 45 Z" />
        <path d="M70 30 L82 25 L90 32 L88 48 L75 42 Z" />
        {/* Third course */}
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
        {/* Wall boundary */}
        <path d="M8 10 L92 10 L92 92 L8 92 Z" strokeWidth="1.2" />
      </g>
    </g>
  </svg>
)

/**
 * RUSTICATION
 * Architectural Reference: Ashlar masonry with deeply recessed joints and sometimes
 * roughened stone faces. Creates dramatic shadow lines and texture. Prominent in
 * Renaissance, Baroque, and Neoclassical architecture, especially at building bases.
 */
const RusticationSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <MaterialPatterns />
    {showHalo && <HaloFilter id="rustication-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#rustication-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Building facade with floor levels - refined */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.4">
        {/* Floor level indicators */}
        <path d="M2 30 L6 30" />
        <path d="M2 70 L6 70" />
        <text x="1" y="29" fontSize="3" opacity="0.5">2ND</text>
        <text x="1" y="69" fontSize="3" opacity="0.5">1ST</text>
        {/* Window openings */}
        <path d="M25 5 L25 8 L35 8 L35 5" />
        <path d="M65 5 L65 8 L75 8 L75 5" />
        {/* Adjacent wall */}
        <path d="M92 8 L98 8 L98 92" />
        {/* Base/plinth */}
        <path d="M5 92 L98 92" strokeWidth="0.6" />
      </g>

      {/* PRIMARY: Rusticated stones - BOLD STONE MATERIALITY */}
      <g strokeWidth="0.8">
        {[0, 1, 2, 3].map((row) => {
          const offset = row % 2 === 0 ? 0 : 22
          return [0, 1, 2].map((col) => {
            const x = 8 + offset + col * 44
            const y = 10 + row * 20
            const width = 40
            if (x + width > 92) return null
            return (
              <g key={`${row}-${col}`}>
                {/* Rough stone material fill */}
                <rect x={x} y={y} width={width} height={18} fill="url(#stone-rough)" opacity="0.35" stroke="none" />

                {/* Stone block outer edge - BOLD */}
                <path d={`M${x} ${y} L${x+width} ${y} L${x+width} ${y+18} L${x} ${y+18} Z`} strokeWidth="1.2" />

                {/* Beveled/chamfered edges showing depth - enhanced */}
                <path d={`M${x+2} ${y+2} L${x+width-2} ${y+2} L${x+width-2} ${y+16} L${x+2} ${y+16} Z`} strokeWidth="0.6" opacity="0.7" />
                <path d={`M${x+3} ${y+3} L${x+width-3} ${y+3} L${x+width-3} ${y+15} L${x+3} ${y+15} Z`} strokeWidth="0.3" opacity="0.4" />

                {/* Rough-hewn chisel marks - MORE DETAIL */}
                <path d={`M${x+8} ${y+6} L${x+12} ${y+8}`} opacity="0.35" strokeWidth="0.5" />
                <path d={`M${x+22} ${y+10} L${x+28} ${y+12}`} opacity="0.35" strokeWidth="0.5" />
                <path d={`M${x+15} ${y+12} L${x+19} ${y+14}`} opacity="0.3" strokeWidth="0.4" />

                {/* Weathering and natural stone variation */}
                <path d={`M${x+10} ${y+4} L${x+13} ${y+5}`} opacity="0.2" strokeWidth="0.3" />
                <path d={`M${x+30} ${y+8} L${x+33} ${y+9}`} opacity="0.2" strokeWidth="0.3" />

                {/* Shadow on beveled edge */}
                <path d={`M${x+2} ${y+2} L${x+2} ${y+16}`} opacity="0.2" strokeWidth="0.4" strokeDasharray="1 0.5" />
              </g>
            )
          })
        })}

        {/* Deep horizontal joint grooves - ENHANCED DEPTH */}
        <path d="M8 28 L92 28" strokeWidth="3" opacity="0.75" />
        <path d="M8 27 L92 27" strokeWidth="0.8" opacity="0.3" />
        <path d="M8 48 L92 48" strokeWidth="3" opacity="0.75" />
        <path d="M8 47 L92 47" strokeWidth="0.8" opacity="0.3" />
        <path d="M8 68 L92 68" strokeWidth="3" opacity="0.75" />
        <path d="M8 67 L92 67" strokeWidth="0.8" opacity="0.3" />
        <path d="M8 88 L92 88" strokeWidth="3" opacity="0.75" />
        <path d="M8 87 L92 87" strokeWidth="0.8" opacity="0.3" />

        {/* Deep vertical joint grooves - ENHANCED DEPTH */}
        <path d="M48 10 L48 28" strokeWidth="3" opacity="0.75" />
        <path d="M47 10 L47 28" strokeWidth="0.8" opacity="0.3" />
        <path d="M30 28 L30 48" strokeWidth="3" opacity="0.75" />
        <path d="M29 28 L29 48" strokeWidth="0.8" opacity="0.3" />
        <path d="M74 28 L74 48" strokeWidth="3" opacity="0.75" />
        <path d="M73 28 L73 48" strokeWidth="0.8" opacity="0.3" />
        <path d="M52 48 L52 68" strokeWidth="3" opacity="0.75" />
        <path d="M51 48 L51 68" strokeWidth="0.8" opacity="0.3" />

        {/* Wall outline - refined */}
        <path d="M8 10 L92 10 L92 90 L8 90 Z" strokeWidth="1.4" />
      </g>
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
