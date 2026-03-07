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

/**
 * BATTLEMENT - Crenelated parapet with alternating merlons and crenels
 * Reference: Carcassonne fortress, France (13th century)
 * Architectural Detail: Defensive parapet featuring square-cut merlons with arrow loops
 */
const BattlementSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="battlement-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#battlement-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Surrounding castle structure */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Curtain wall extending left and right */}
        <path d="M5 50 L5 95 L10 95 L10 50" />
        <path d="M90 50 L95 50 L95 95 L90 95" />
        {/* Wall foundation */}
        <path d="M10 95 L90 95" />
        {/* Tower suggestion behind */}
        <circle cx="8" cy="35" r="4" />
        <circle cx="92" cy="35" r="4" />
        {/* Interior floor level */}
        <path d="M10 50 L90 50" />
      </g>

      {/* PRIMARY: Battlement structure - SOLID emphasized lines */}
      <g strokeWidth="1.2">
        {/* Main wall body */}
        <path d="M10 50 L10 95 L90 95 L90 50" strokeWidth="1.5" />

        {/* Crenelated parapet - merlons (high parts) and crenels (low parts) */}
        <path d="M10 50 L10 30 L22 30 L22 45 L32 45 L32 30 L44 30 L44 45 L54 45 L54 30 L66 30 L66 45 L76 45 L76 30 L90 30 L90 50" strokeWidth="1.5" />

        {/* Inner face of merlons */}
        <path d="M12 32 L12 48" strokeWidth="0.6" />
        <path d="M20 32 L20 48" strokeWidth="0.6" />
        <path d="M34 32 L34 43" strokeWidth="0.6" />
        <path d="M42 32 L42 43" strokeWidth="0.6" />
        <path d="M56 32 L56 43" strokeWidth="0.6" />
        <path d="M64 32 L64 43" strokeWidth="0.6" />
        <path d="M78 32 L78 48" strokeWidth="0.6" />
        <path d="M88 32 L88 48" strokeWidth="0.6" />

        {/* Arrow loops in merlons */}
        <path d="M16 36 L16 42" strokeWidth="2" />
        <path d="M38 34 L38 40" strokeWidth="2" />
        <path d="M60 34 L60 40" strokeWidth="2" />
        <path d="M82 36 L82 42" strokeWidth="2" />

        {/* Stone coursing detail */}
        <path d="M20 60 L35 60" strokeWidth="0.5" opacity="0.5" />
        <path d="M45 60 L70 60" strokeWidth="0.5" opacity="0.5" />
        <path d="M15 75 L40 75" strokeWidth="0.5" opacity="0.5" />
        <path d="M50 75 L80 75" strokeWidth="0.5" opacity="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * DRAWBRIDGE - Retractable timber bridge with chain mechanism
 * Reference: Tower of London drawbridge (medieval era)
 * Architectural Detail: Planked bridge suspended by chains, crossing defensive moat
 */
const DrawbridgeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="drawbridge-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#drawbridge-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Castle gatehouse and towers */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Gatehouse towers */}
        <path d="M5 20 L5 95 L25 95 L25 20" />
        <path d="M75 20 L75 95 L95 95 L95 20" />

        {/* Battlements on towers */}
        <path d="M5 20 L5 12 L10 12 L10 18 L15 18 L15 12 L20 12 L20 18 L25 18 L25 20" />
        <path d="M75 20 L75 12 L80 12 L80 18 L85 18 L85 12 L90 12 L90 18 L95 18 L95 20" />

        {/* Gate opening arch */}
        <path d="M25 35 L25 75 Q50 85, 75 75 L75 35 Q50 25, 25 35" />

        {/* Moat water */}
        <path d="M5 85 Q25 92, 50 85 Q75 78, 95 85" />
        <path d="M5 90 Q25 97, 50 90 Q75 83, 95 90" />

        {/* Arrow loops in towers */}
        <path d="M15 45 L15 55" />
        <path d="M85 45 L85 55" />
      </g>

      {/* PRIMARY: Drawbridge structure - SOLID emphasized lines */}
      <g strokeWidth="1.2">
        {/* Bridge deck (lowered position) */}
        <path d="M25 75 L75 75" strokeWidth="2.5" />
        <path d="M28 78 L72 78" strokeWidth="1.5" />

        {/* Bridge planks - emphasized */}
        {[30, 40, 50, 60, 70].map((x, i) => (
          <path key={i} d={`M${x} 75 L${x} 78`} strokeWidth="1.2" />
        ))}

        {/* Lifting chains - solid for primary mechanism */}
        <path d="M28 35 L35 75" strokeWidth="1.5" />
        <path d="M72 35 L65 75" strokeWidth="1.5" />

        {/* Chain attachment points */}
        <circle cx="28" cy="35" r="3" strokeWidth="1.5" />
        <circle cx="72" cy="35" r="3" strokeWidth="1.5" />
        <circle cx="35" cy="75" r="2" strokeWidth="1.2" />
        <circle cx="65" cy="75" r="2" strokeWidth="1.2" />

        {/* Iron reinforcement bands on bridge */}
        <path d="M32 76.5 L68 76.5" strokeWidth="0.8" opacity="0.7" />
      </g>
    </g>
  </svg>
)

/**
 * MOAT - Water-filled defensive ditch with sloped banks
 * Reference: Bodiam Castle moat, England (14th century)
 * Architectural Detail: Wide wet moat with revetment walls, typical depth 2-4m
 */
const MoatSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="moat-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#moat-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Castle wall and surrounding terrain */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Castle wall above */}
        <path d="M30 15 L30 55 L70 55 L70 15" />

        {/* Battlements */}
        <path d="M30 15 L30 8 L38 8 L38 13 L46 13 L46 8 L54 8 L54 13 L62 13 L62 8 L70 8 L70 15" />

        {/* Outer ground level */}
        <path d="M5 85 L5 95 L95 95 L95 85" />

        {/* Outer bank slopes */}
        <path d="M5 85 L15 70" />
        <path d="M95 85 L85 70" />

        {/* Foundation stones visible */}
        <path d="M28 55 L28 58 L72 58 L72 55" />
      </g>

      {/* PRIMARY: Moat water body - SOLID emphasized lines */}
      <g strokeWidth="1.2">
        {/* Inner bank revetment slopes */}
        <path d="M25 55 L15 70" strokeWidth="1.5" />
        <path d="M75 55 L85 70" strokeWidth="1.5" />

        {/* Primary water surface */}
        <path d="M5 70 L95 70" strokeWidth="2.5" />
        <path d="M5 75 L95 75" strokeWidth="2" />
        <path d="M5 80 L95 80" strokeWidth="1.5" />

        {/* Water ripples - movement indication */}
        <path d="M15 72 Q20 70, 25 72 Q30 74, 35 72" strokeWidth="1" opacity="0.7" />
        <path d="M45 73 Q50 71, 55 73 Q60 75, 65 73" strokeWidth="1" opacity="0.7" />
        <path d="M70 72 Q75 70, 80 72 Q85 74, 90 72" strokeWidth="1" opacity="0.7" />

        {/* Moat bottom contour */}
        <path d="M15 82 L85 82" strokeWidth="1" />

        {/* Water depth indicators - cross hatching */}
        <path d="M20 75 L25 70" strokeWidth="0.6" opacity="0.5" />
        <path d="M30 80 L40 70" strokeWidth="0.6" opacity="0.5" />
        <path d="M50 80 L60 70" strokeWidth="0.6" opacity="0.5" />
        <path d="M70 80 L80 70" strokeWidth="0.6" opacity="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * PORTCULLIS - Heavy vertical-sliding iron gate
 * Reference: Warwick Castle gatehouse (14th century)
 * Architectural Detail: Latticed iron grille with spiked bottom, chain-lifted
 */
const PortcullisSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="portcullis-halo" intensity={1} />}
    <g filter={showHalo ? "url(#portcullis-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Gate archway and stonework */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Outer stonework arch */}
        <path d="M12 95 L12 33 Q50 5, 88 33 L88 95" />

        {/* Inner archway */}
        <path d="M15 95 L15 35 Q50 10, 85 35 L85 95" />
        <path d="M20 92 L20 38 Q50 18, 80 38 L80 92" />

        {/* Portcullis guide slots */}
        <path d="M17 35 L17 95" />
        <path d="M83 35 L83 95" />

        {/* Winch chamber above */}
        <path d="M40 5 L60 5 L60 10 L40 10 Z" />
        <circle cx="50" cy="7.5" r="2" />
      </g>

      {/* PRIMARY: Portcullis grid - SOLID emphasized lines */}
      <g strokeWidth="1.2">
        {/* Vertical bars - main structure */}
        {[28, 38, 50, 62, 72].map((x, i) => (
          <path key={`v${i}`} d={`M${x} 25 L${x} 90`} strokeWidth="2" />
        ))}

        {/* Horizontal reinforcement bars */}
        {[35, 50, 65, 80].map((y, i) => (
          <path key={`h${i}`} d={`M25 ${y} L75 ${y}`} strokeWidth="1.8" />
        ))}

        {/* Pointed spikes at bottom */}
        {[28, 38, 50, 62, 72].map((x, i) => (
          <path key={`s${i}`} d={`M${x-2} 90 L${x} 95 L${x+2} 90`} strokeWidth="1.5" fill="currentColor" />
        ))}

        {/* Lifting chains */}
        <path d="M35 20 L35 8 L40 8" strokeWidth="1.5" />
        <path d="M65 20 L65 8 L60 8" strokeWidth="1.5" />

        {/* Chain links detail */}
        <circle cx="35" cy="15" r="1.5" strokeWidth="1" />
        <circle cx="35" cy="10" r="1.5" strokeWidth="1" />
        <circle cx="65" cy="15" r="1.5" strokeWidth="1" />
        <circle cx="65" cy="10" r="1.5" strokeWidth="1" />
      </g>
    </g>
  </svg>
)

/**
 * TOWER - Circular defensive keep with battlements
 * Reference: Chateau de Coucy donjon, France (13th century)
 * Architectural Detail: Round tower with machicolations, arrow slits, and conical roof
 */
const TowerSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="tower-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#tower-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Curtain walls and defensive perimeter */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Curtain walls connecting to tower */}
        <path d="M5 60 L25 60 L25 95 L5 95" />
        <path d="M75 60 L95 60 L95 95 L75 95" />

        {/* Wall walks */}
        <path d="M5 60 L25 60" />
        <path d="M75 60 L95 60" />

        {/* Conical roof structure */}
        <path d="M20 35 L50 10 L80 35" />
        <path d="M25 35 L50 15 L75 35" />

        {/* Ground level */}
        <path d="M25 95 L75 95" />
      </g>

      {/* PRIMARY: Circular tower structure */}
      <g strokeWidth="1.2">
        {/* Main cylindrical tower body - curved walls showing roundness */}
        <path d="M25 95 L25 38" strokeWidth="2" />
        <path d="M75 95 L75 38" strokeWidth="2" />
        {/* Curved top showing cylindrical form */}
        <ellipse cx="50" cy="38" rx="25" ry="6" strokeWidth="1.8" />

        {/* Conical roof */}
        <path d="M25 38 Q25 32, 50 15 Q75 32, 75 38" strokeWidth="1.5" />
        <path d="M50 15 L50 10" strokeWidth="1.2" />

        {/* Battlements around top - on the elliptical parapet */}
        <path d="M26 35 L26 30 L32 30 L32 34" strokeWidth="1.5" />
        <path d="M36 33 L36 28 L42 28 L42 32" strokeWidth="1.5" />
        <path d="M46 32 L46 27 L54 27 L54 32" strokeWidth="1.5" />
        <path d="M58 32 L58 28 L64 28 L64 33" strokeWidth="1.5" />
        <path d="M68 34 L68 30 L74 30 L74 35" strokeWidth="1.5" />

        {/* Machicolations - projecting corbelled gallery with floor openings */}
        <path d="M20 42 L80 42" strokeWidth="1.2" />
        <path d="M20 42 L20 46 L25 46" strokeWidth="1.3" />
        <path d="M80 42 L80 46 L75 46" strokeWidth="1.3" />
        {/* Corbel brackets supporting the gallery */}
        <path d="M28 42 Q26 44, 25 46" strokeWidth="0.8" />
        <path d="M38 42 Q36 44, 35 46" strokeWidth="0.8" />
        <path d="M50 42 Q48 44, 47 46" strokeWidth="0.8" />
        <path d="M62 42 Q60 44, 59 46" strokeWidth="0.8" />
        <path d="M72 42 Q70 44, 69 46" strokeWidth="0.8" />
        {/* Murder holes (floor openings between corbels) */}
        <path d="M30 44 L30 46" strokeWidth="0.5" opacity="0.6" />
        <path d="M43 44 L43 46" strokeWidth="0.5" opacity="0.6" />
        <path d="M55 44 L55 46" strokeWidth="0.5" opacity="0.6" />
        <path d="M66 44 L66 46" strokeWidth="0.5" opacity="0.6" />

        {/* Arrow slits - narrow cross-shaped */}
        <path d="M36 55 L36 65" strokeWidth="2" />
        <path d="M33 60 L39 60" strokeWidth="1" />
        <path d="M64 55 L64 65" strokeWidth="2" />
        <path d="M61 60 L67 60" strokeWidth="1" />

        {/* Arrow slit - lower level */}
        <path d="M50 72 L50 82" strokeWidth="2" />
        <path d="M47 77 L53 77" strokeWidth="1" />

        {/* Entrance archway at base */}
        <path d="M40 80 L40 95 L60 95 L60 80 Q50 74, 40 80" strokeWidth="1.8" />

        {/* Stone coursing curves showing cylindrical form */}
        <path d="M25 55 Q50 58, 75 55" strokeWidth="0.8" opacity="0.6" />
        <path d="M25 70 Q50 73, 75 70" strokeWidth="0.8" opacity="0.6" />
        <path d="M25 85 L40 85" strokeWidth="0.8" opacity="0.6" />
        <path d="M60 85 L75 85" strokeWidth="0.8" opacity="0.6" />
      </g>
    </g>
  </svg>
)

// Export mapping for all fortification elements
export const FORTIFICATION_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'battlement': BattlementSVG,
  'drawbridge': DrawbridgeSVG,
  'moat': MoatSVG,
  'portcullis': PortcullisSVG,
  'tower': TowerSVG,
}

export {
  BattlementSVG,
  DrawbridgeSVG,
  MoatSVG,
  PortcullisSVG,
  TowerSVG,
}
