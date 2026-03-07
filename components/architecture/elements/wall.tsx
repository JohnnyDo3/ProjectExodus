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

      {/* PRIMARY: Mixed/coursed rubble masonry - irregular stones with rough courses */}
      <g strokeWidth="0.8">
        {/* Wall outline */}
        <path d="M10 10 L90 10 L90 90 L10 90 Z" strokeWidth="1.2" />

        {/* First course - large irregular stones */}
        <path d="M10 10 L42 10 L44 14 L42 25 L10 24 Z" />
        <path d="M44 10 L90 10 L90 22 L46 24 L44 14 Z" />

        {/* Second course - mixed sizes, slightly irregular */}
        <path d="M10 26 L28 25 L30 28 L32 38 L10 40 Z" />
        <path d="M32 25 L58 24 L60 30 L62 39 L34 38 Z" />
        <path d="M60 24 L90 23 L90 37 L64 39 L60 30 Z" />
        {/* Small infill stone */}
        <path d="M30 30 L34 29 L34 34 L30 35 Z" strokeWidth="0.6" opacity="0.7" />

        {/* Third course - varied heights */}
        <path d="M10 42 L48 40 L50 44 L48 56 L10 55 Z" />
        <path d="M50 40 L90 38 L90 52 L52 55 L50 44 Z" />
        {/* Small wedge stone */}
        <path d="M48 44 L52 43 L52 48 L48 49 Z" strokeWidth="0.6" opacity="0.7" />

        {/* Fourth course - rougher shapes */}
        <path d="M10 57 L32 56 L35 60 L33 70 L10 71 Z" />
        <path d="M35 56 L66 55 L68 58 L70 69 L37 70 Z" />
        <path d="M68 55 L90 54 L90 68 L72 69 L68 58 Z" />

        {/* Fifth course - with small fill stones */}
        <path d="M10 73 L52 71 L55 75 L53 85 L10 86 Z" />
        <path d="M55 71 L90 70 L90 84 L57 85 L55 75 Z" />
        {/* Fill/pinning stones in gaps */}
        <path d="M52 73 L55 72 L55 76 L52 77 Z" strokeWidth="0.5" opacity="0.6" />
        <path d="M33 70 L37 69 L37 73 L33 74 Z" strokeWidth="0.5" opacity="0.6" />

        {/* Rough stone texture marks */}
        <path d="M20 16 L26 19" opacity="0.3" />
        <path d="M55 32 L60 36" opacity="0.3" />
        <path d="M25 48 L30 52" opacity="0.3" />
        <path d="M78 62 L82 65" opacity="0.3" />
        <path d="M42 78 L46 80" opacity="0.3" />
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
      {/* THREE-POINT PERSPECTIVE GRID - Viewing facade from ground-level at angle */}
      <g opacity="0.08" strokeWidth="0.2" strokeDasharray="3 4">
        {/* Left vanishing point (off-canvas left, ~-20, 40) */}
        {/* Lines converging to left vanishing point */}
        <path d="M 10 95 L 5 45" />
        <path d="M 15 95 L 8 45" />

        {/* Right vanishing point (off-canvas right, ~120, 35) */}
        {/* Lines converging to right vanishing point */}
        <path d="M 90 95 L 95 40" />
        <path d="M 85 95 L 93 40" />

        {/* Vertical vanishing point (upward, ~50, -50) */}
        {/* Vertical lines slightly converging upward */}
        <path d="M 15 100 L 45 5" />
        <path d="M 50 100 L 50 5" />
        <path d="M 85 100 L 55 5" />

        {/* Horizontal depth guides (perspective curves) */}
        <path d="M 10 90 Q 50 88, 90 85" opacity="0.6" />
        <path d="M 12 50 Q 50 48, 88 46" opacity="0.6" />
        <path d="M 18 15 Q 50 13, 82 12" opacity="0.6" />
      </g>

      {/* CONTEXT: Building facade with floor levels - refined */}
      <g strokeDasharray="3 2" opacity="0.2" strokeWidth="0.35">
        {/* Floor level indicators (perspective-adjusted) */}
        <path d="M2 32 L6 32" />
        <path d="M2 68 L6 68" />
        <text x="1" y="31" fontSize="2.5" opacity="0.5">2ND</text>
        <text x="1" y="67" fontSize="2.5" opacity="0.5">1ST</text>
        {/* Window openings (perspective-adjusted) */}
        <path d="M25 8 L25 12 L33 12 L34 8" />
        <path d="M67 8 L67 12 L74 12 L75 8" />
        {/* Adjacent wall receding */}
        <path d="M 88 12 L 95 15 L 95 88" />
        {/* Base/plinth (perspective curve) */}
        <path d="M 8 92 Q 50 94, 95 90" strokeWidth="0.5" />
      </g>

      {/* PRIMARY: Rusticated stones - THREE-POINT PERSPECTIVE */}
      <g strokeWidth="0.8">
        {/* BOTTOM ROW - Closest to viewer (largest, widest) */}
        {/* Stone 1 (bottom-left, closest) */}
        <g>
          <path d="M 10 92 L 46 92 L 45 73 L 12 74 Z" strokeWidth="1.3" />
          <path d="M 12 90 L 44 90 L 43 75 L 14 76 Z" strokeWidth="0.7" opacity="0.7" />
          <path d="M 14 88 L 42 88 L 41 77 L 16 78 Z" strokeWidth="0.35" opacity="0.4" />
          {/* Chisel marks */}
          <path d="M 18 82 L 22 84" opacity="0.35" strokeWidth="0.5" />
          <path d="M 30 85 L 34 87" opacity="0.35" strokeWidth="0.5" />
        </g>

        {/* Stone 2 (bottom-center) */}
        <g>
          <path d="M 46 92 L 82 91 L 80 72 L 45 73 Z" strokeWidth="1.3" />
          <path d="M 48 90 L 80 89 L 78 74 L 47 75 Z" strokeWidth="0.7" opacity="0.7" />
          <path d="M 50 88 L 78 87 L 76 76 L 49 77 Z" strokeWidth="0.35" opacity="0.4" />
          {/* Chisel marks */}
          <path d="M 55 82 L 59 84" opacity="0.35" strokeWidth="0.5" />
          <path d="M 68 85 L 72 86" opacity="0.35" strokeWidth="0.5" />
        </g>

        {/* Stone 3 (bottom-right, receding) */}
        <g>
          <path d="M 82 91 L 94 89 L 92 71 L 80 72 Z" strokeWidth="1.2" />
          <path d="M 83 89 L 92 87 L 90 73 L 81 74 Z" strokeWidth="0.6" opacity="0.7" />
          {/* Chisel mark */}
          <path d="M 85 80 L 88 81" opacity="0.35" strokeWidth="0.5" />
        </g>

        {/* SECOND ROW - Mid-distance */}
        {/* Stone 4 (left) */}
        <g>
          <path d="M 12 74 L 30 73 L 30 54 L 14 56 Z" strokeWidth="1.2" />
          <path d="M 14 72 L 28 71 L 28 56 L 16 58 Z" strokeWidth="0.6" opacity="0.7" />
          <path d="M 16 70 L 26 69 L 26 58 L 18 60 Z" strokeWidth="0.3" opacity="0.4" />
          {/* Chisel marks */}
          <path d="M 18 64 L 21 65" opacity="0.35" strokeWidth="0.45" />
        </g>

        {/* Stone 5 (center) */}
        <g>
          <path d="M 30 73 L 68 72 L 67 53 L 30 54 Z" strokeWidth="1.2" />
          <path d="M 32 71 L 66 70 L 65 55 L 32 56 Z" strokeWidth="0.6" opacity="0.7" />
          <path d="M 34 69 L 64 68 L 63 57 L 34 58 Z" strokeWidth="0.3" opacity="0.4" />
          {/* Chisel marks */}
          <path d="M 40 64 L 44 65" opacity="0.35" strokeWidth="0.45" />
          <path d="M 54 66 L 58 67" opacity="0.35" strokeWidth="0.45" />
        </g>

        {/* Stone 6 (right) */}
        <g>
          <path d="M 68 72 L 90 70 L 88 52 L 67 53 Z" strokeWidth="1.2" />
          <path d="M 69 70 L 88 68 L 86 54 L 68 55 Z" strokeWidth="0.6" opacity="0.7" />
          {/* Chisel mark */}
          <path d="M 74 62 L 77 63" opacity="0.35" strokeWidth="0.45" />
        </g>

        {/* THIRD ROW - Far distance (narrower, smaller) */}
        {/* Stone 7 (left) */}
        <g>
          <path d="M 14 56 L 44 54 L 44 36 L 18 38 Z" strokeWidth="1.1" />
          <path d="M 16 54 L 42 52 L 42 38 L 20 40 Z" strokeWidth="0.55" opacity="0.7" />
          {/* Chisel marks */}
          <path d="M 24 46 L 27 47" opacity="0.3" strokeWidth="0.4" />
        </g>

        {/* Stone 8 (center) */}
        <g>
          <path d="M 44 54 L 74 53 L 74 35 L 44 36 Z" strokeWidth="1.1" />
          <path d="M 46 52 L 72 51 L 72 37 L 46 38 Z" strokeWidth="0.55" opacity="0.7" />
          {/* Chisel marks */}
          <path d="M 52 46 L 55 47" opacity="0.3" strokeWidth="0.4" />
        </g>

        {/* Stone 9 (right) */}
        <g>
          <path d="M 74 53 L 86 51 L 85 34 L 74 35 Z" strokeWidth="1.1" />
          <path d="M 75 51 L 84 49 L 83 36 L 75 37 Z" strokeWidth="0.55" opacity="0.7" />
        </g>

        {/* TOP ROW - Farthest (smallest, most compressed) */}
        {/* Stone 10 (left) */}
        <g>
          <path d="M 18 38 L 36 36 L 37 20 L 22 22 Z" strokeWidth="1.0" />
          <path d="M 20 36 L 34 34 L 35 22 L 24 24 Z" strokeWidth="0.5" opacity="0.7" />
        </g>

        {/* Stone 11 (center) */}
        <g>
          <path d="M 37 36 L 63 35 L 63 19 L 37 20 Z" strokeWidth="1.0" />
          <path d="M 39 34 L 61 33 L 61 21 L 39 22 Z" strokeWidth="0.5" opacity="0.7" />
        </g>

        {/* Stone 12 (right) */}
        <g>
          <path d="M 63 35 L 82 33 L 81 18 L 63 19 Z" strokeWidth="1.0" />
          <path d="M 64 33 L 80 31 L 79 20 L 64 21 Z" strokeWidth="0.5" opacity="0.7" />
        </g>

        {/* Deep horizontal joint grooves - PERSPECTIVE-CORRECTED */}
        {/* Bottom joint (closest, thickest) */}
        <path d="M 10 92 Q 50 93, 94 89" strokeWidth="3.5" opacity="0.75" />
        <path d="M 10 91 Q 50 92, 94 88" strokeWidth="1" opacity="0.3" />

        {/* Second joint */}
        <path d="M 12 74 Q 50 74, 90 70" strokeWidth="3.2" opacity="0.75" />
        <path d="M 12 73 Q 50 73, 90 69" strokeWidth="0.9" opacity="0.3" />

        {/* Third joint */}
        <path d="M 14 56 Q 50 55, 86 51" strokeWidth="3" opacity="0.75" />
        <path d="M 14 55 Q 50 54, 86 50" strokeWidth="0.85" opacity="0.3" />

        {/* Top joint (farthest, thinnest) */}
        <path d="M 18 38 Q 50 37, 82 33" strokeWidth="2.8" opacity="0.75" />
        <path d="M 18 37 Q 50 36, 82 32" strokeWidth="0.8" opacity="0.3" />

        {/* Deep vertical joint grooves - PERSPECTIVE-CORRECTED (converging upward) */}
        {/* Left vertical joints */}
        <path d="M 30 73 L 30 54" strokeWidth="3" opacity="0.75" />
        <path d="M 29 73 L 29 54" strokeWidth="0.8" opacity="0.3" />
        <path d="M 44 54 L 44 36" strokeWidth="2.8" opacity="0.75" />
        <path d="M 43 54 L 43 36" strokeWidth="0.75" opacity="0.3" />

        {/* Center vertical joints */}
        <path d="M 46 92 L 45 73" strokeWidth="3.2" opacity="0.75" />
        <path d="M 45 92 L 44 73" strokeWidth="0.85" opacity="0.3" />
        <path d="M 63 35 L 63 19" strokeWidth="2.6" opacity="0.75" />
        <path d="M 62 35 L 62 19" strokeWidth="0.7" opacity="0.3" />

        {/* Right vertical joints */}
        <path d="M 68 72 L 67 53" strokeWidth="3" opacity="0.75" />
        <path d="M 67 72 L 66 53" strokeWidth="0.8" opacity="0.3" />
        <path d="M 82 91 L 80 72" strokeWidth="3" opacity="0.75" />
        <path d="M 81 91 L 79 72" strokeWidth="0.8" opacity="0.3" />
        <path d="M 74 53 L 74 35" strokeWidth="2.8" opacity="0.75" />
        <path d="M 73 53 L 73 35" strokeWidth="0.75" opacity="0.3" />

        {/* Wall outline - THREE-POINT PERSPECTIVE */}
        <path d="M 10 92 L 94 89 L 82 18 L 18 20 Z" strokeWidth="1.5" />
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
