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
 * ACROTERION - Ornamental element positioned at apex and corners of pediment
 * Reference: Greek/Roman temple architecture (Parthenon, Temple of Zeus)
 * Typically features palmette or anthemion motifs with volutes
 */
const AcroterionSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="acroterion-halo" intensity={1} />}
    <g filter={showHalo ? "url(#acroterion-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Pediment roof structure */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 80 L50 55 L95 80" />
        <path d="M10 85 L90 85" />
        <path d="M15 75 L15 85" />
        <path d="M85 75 L85 85" />
      </g>

      {/* PRIMARY: Center acroterion - palmette style */}
      <g strokeWidth="0.8">
        {/* Pedestal */}
        <path d="M45 55 L45 20 L55 20 L55 55" />
        <path d="M43 55 L43 58 L57 58 L57 55 Z" />

        {/* Central stem */}
        <path d="M50 20 L50 8" strokeWidth="1" />

        {/* Palmette leaves - primary ornament */}
        <path d="M50 8 Q55 15, 58 25 Q55 22, 50 20" />
        <path d="M50 8 Q45 15, 42 25 Q45 22, 50 20" />
        <path d="M50 10 Q60 18, 62 30" />
        <path d="M50 10 Q40 18, 38 30" />

        {/* Side volutes */}
        <path d="M42 35 Q38 30, 35 35 Q32 42, 38 45" />
        <path d="M58 35 Q62 30, 65 35 Q68 42, 62 45" />

        {/* Inner detail */}
        <path d="M50 15 Q52 18, 54 22" strokeWidth="0.5" />
        <path d="M50 15 Q48 18, 46 22" strokeWidth="0.5" />
      </g>

      {/* PRIMARY: Corner acroteria - smaller */}
      <g strokeWidth="0.8">
        <path d="M8 75 L8 65 L15 65 L15 75" />
        <path d="M11 65 L11 58 Q12 55, 11.5 52" />
        <path d="M9 58 L13 58" strokeWidth="0.5" />

        <path d="M92 75 L92 65 L85 65 L85 75" />
        <path d="M89 65 L89 58 Q88 55, 88.5 52" />
        <path d="M87 58 L91 58" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * BALUSTER - Turned vertical support in classical balustrade
 * Reference: Renaissance palaces, Baroque staircases (Villa Farnese)
 * Features vase-shaped profile with neck, belly, and base
 */
const BalusterSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="baluster-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#baluster-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Rails and mounting structure */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M20 12 L80 12 L80 18 L20 18 Z" />
        <path d="M20 82 L80 82 L80 88 L20 88 Z" />
        <path d="M25 12 L25 88" />
        <path d="M75 12 L75 88" />
      </g>

      {/* PRIMARY: Classical baluster profile - vase shape */}
      <g strokeWidth="1">
        {/* Capital */}
        <path d="M42 18 L42 22 Q38 25, 38 32 Q40 38, 45 42" />
        <path d="M58 18 L58 22 Q62 25, 62 32 Q60 38, 55 42" />
        <path d="M42 18 L58 18" />

        {/* Neck (narrowest point) */}
        <path d="M45 42 Q44 45, 44 50 Q44 55, 45 58" />
        <path d="M55 42 Q56 45, 56 50 Q56 55, 55 58" />

        {/* Belly (widest point) */}
        <path d="M45 58 Q38 62, 38 70 Q40 78, 45 80" />
        <path d="M55 58 Q62 62, 62 70 Q60 78, 55 80" />

        {/* Base */}
        <path d="M45 80 L42 82" />
        <path d="M55 80 L58 82" />
        <path d="M42 82 L58 82" />

        {/* Profile rings - decorative detail */}
        <path d="M44 24 L56 24" strokeWidth="0.6" />
        <path d="M45 42 L55 42" strokeWidth="0.6" />
        <path d="M44 50 L56 50" strokeWidth="0.6" />
        <path d="M43 70 L57 70" strokeWidth="0.6" />
      </g>

      {/* Center line showing symmetry */}
      <path d="M50 18 L50 82" strokeWidth="0.3" opacity="0.3" strokeDasharray="2 2" />
    </g>
  </svg>
)

/**
 * BALUSTRADE - Series of balusters supporting handrail
 * Reference: Palladian architecture, grand staircases (Palace of Versailles)
 * Combines turned balusters with continuous top rail and base
 */
const BalustradeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="balustrade-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#balustrade-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Floor/terrace base */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 88 L95 88" />
        <path d="M5 92 L95 92" />
      </g>

      {/* PRIMARY: Top handrail */}
      <g strokeWidth="1">
        <path d="M8 20 L92 20 L92 26 L8 26 Z" />
        <path d="M10 23 L90 23" strokeWidth="0.4" />
      </g>

      {/* PRIMARY: Bottom rail/plinth */}
      <g strokeWidth="1">
        <path d="M8 80 L92 80 L92 86 L8 86 Z" />
      </g>

      {/* PRIMARY: Multiple balusters */}
      <g strokeWidth="0.8">
        {[15, 30, 45, 60, 75].map((x, i) => (
          <g key={i}>
            {/* Vase profile */}
            <path d={`M${x-3} 26 L${x-3} 30 Q${x-5} 35, ${x-4} 42`} />
            <path d={`M${x+3} 26 L${x+3} 30 Q${x+5} 35, ${x+4} 42`} />
            <path d={`M${x-4} 42 Q${x-5} 50, ${x-3} 55`} />
            <path d={`M${x+4} 42 Q${x+5} 50, ${x+3} 55`} />
            <path d={`M${x-3} 55 Q${x-6} 65, ${x-4} 75 L${x-4} 80`} />
            <path d={`M${x+3} 55 Q${x+6} 65, ${x+4} 75 L${x+4} 80`} />
            {/* Profile rings */}
            <path d={`M${x-3} 42 L${x+3} 42`} strokeWidth="0.4" />
            <path d={`M${x-4} 65 L${x+4} 65`} strokeWidth="0.4" />
          </g>
        ))}
      </g>

      {/* PRIMARY: End posts (newels) */}
      <g strokeWidth="1">
        <path d="M5 15 L5 90 L11 90 L11 15 Z" />
        <path d="M89 15 L89 90 L95 90 L95 15 Z" />
        {/* Post caps */}
        <path d="M4 12 L12 12 L12 15 L4 15 Z" />
        <path d="M88 12 L96 12 L96 15 L88 15 Z" />
        <circle cx="8" cy="10" r="2" />
        <circle cx="92" cy="10" r="2" />
      </g>
    </g>
  </svg>
)

/**
 * BRACKET - Projecting support for cornice, shelf, or balcony
 * Reference: Italian Renaissance corbels, French console brackets
 * Features scrolled profile with acanthus leaf enrichment
 */
const BracketSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="bracket-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#bracket-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Wall surface */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M8 5 L8 95" />
        <path d="M12 10 L12 90" />
        <path d="M8 15 L25 15" />
        <path d="M8 45 L25 45" />
        <path d="M8 75 L25 75" />
      </g>

      {/* CONTEXT: Supported element (cornice/shelf) */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M25 20 L95 20" />
        <path d="M25 25 L95 25 L95 35 L25 35" />
        <path d="M30 25 L30 35" />
        <path d="M60 25 L60 35" />
        <path d="M90 25 L90 35" />
      </g>

      {/* PRIMARY: Main bracket shape - scrolled console */}
      <g strokeWidth="1.2">
        {/* Vertical attachment to wall */}
        <path d="M25 35 L25 75" />

        {/* Outer scroll profile */}
        <path d="M25 35 Q45 38, 55 50 Q65 62, 55 75 Q45 85, 25 75" />

        {/* Back edge */}
        <path d="M23 35 L23 75" strokeWidth="0.5" />
      </g>

      {/* PRIMARY: Inner scroll detail */}
      <g strokeWidth="0.8">
        <path d="M28 40 Q40 42, 48 50 Q55 58, 50 68 Q45 76, 30 72" />

        {/* Scroll volute */}
        <path d="M55 75 Q60 72, 58 68 Q55 65, 52 68" />
        <circle cx="55" cy="71" r="1.5" />
      </g>

      {/* PRIMARY: Acanthus leaf decoration */}
      <g strokeWidth="0.7">
        <path d="M30 50 Q35 48, 38 52 Q36 54, 33 53" />
        <path d="M32 58 Q38 55, 42 60 Q40 62, 36 60" />
        <path d="M30 65 Q36 63, 40 68 Q38 70, 34 68" />
        <path d="M35 44 Q38 42, 40 45" />
      </g>

      {/* PRIMARY: Top attachment plate */}
      <g strokeWidth="0.8">
        <path d="M25 32 L35 32 L35 38 L25 38 Z" />
        <path d="M27 32 L27 38" strokeWidth="0.4" />
        <path d="M33 32 L33 38" strokeWidth="0.4" />
      </g>
    </g>
  </svg>
)

/**
 * CARTOUCHE - Ornamental tablet or shield for inscriptions/emblems
 * Reference: Baroque facades, French Rococo (Palace of Fontainebleau)
 * Features scrolled edges with elaborate framing
 */
const CartoucheSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="cartouche-halo" intensity={1} />}
    <g filter={showHalo ? "url(#cartouche-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Wall or facade surface */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 5 L95 5 L95 95 L5 95 Z" />
        <path d="M10 10 L90 10" />
        <path d="M10 90 L90 90" />
        <path d="M10 10 L10 90" />
        <path d="M90 10 L90 90" />
      </g>

      {/* PRIMARY: Main shield shape - baroque style */}
      <g strokeWidth="1.2">
        <path d="M50 10 Q75 15, 85 35 Q90 55, 75 75 Q60 90, 50 92 Q40 90, 25 75 Q10 55, 15 35 Q25 15, 50 10" />
      </g>

      {/* PRIMARY: Inner border/frame */}
      <g strokeWidth="0.8">
        <path d="M50 18 Q68 22, 77 38 Q82 52, 70 68 Q58 80, 50 82 Q42 80, 30 68 Q18 52, 23 38 Q32 22, 50 18" />
      </g>

      {/* PRIMARY: Scrollwork on sides */}
      <g strokeWidth="0.8">
        <path d="M15 35 Q8 40, 10 50 Q8 55, 15 58" />
        <path d="M85 35 Q92 40, 90 50 Q92 55, 85 58" />
        <path d="M12 45 Q10 50, 12 55" />
        <path d="M88 45 Q90 50, 88 55" />
      </g>

      {/* PRIMARY: Top decoration */}
      <g strokeWidth="0.8">
        <path d="M45 10 Q50 5, 55 10" />
        <path d="M50 5 L50 2" strokeWidth="1" />
        <circle cx="50" cy="3" r="1.5" />
      </g>

      {/* PRIMARY: Bottom flourish */}
      <g strokeWidth="0.8">
        <path d="M50 92 L50 98" />
        <path d="M45 95 Q50 100, 55 95" />
        <path d="M47 96 L53 96" strokeWidth="0.5" />
      </g>

      {/* PRIMARY: Decorative curls at corners */}
      <g strokeWidth="0.7">
        <path d="M25 20 Q20 25, 22 30 Q24 28, 24 25" />
        <path d="M75 20 Q80 25, 78 30 Q76 28, 76 25" />
        <path d="M20 70 Q15 75, 20 80 Q22 78, 22 75" />
        <path d="M80 70 Q85 75, 80 80 Q78 78, 78 75" />
      </g>

      {/* Interior field for text/emblem - subtle */}
      <ellipse cx="50" cy="50" rx="20" ry="25" opacity="0.2" strokeWidth="0.5" strokeDasharray="2 2" />
    </g>
  </svg>
)

/**
 * FESTOON - Carved representation of draped garland
 * Reference: Classical Roman architecture, Adam style interiors
 * Depicts fabric, flowers, or fruit swag between rosettes
 */
const FestoonSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="festoon-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#festoon-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Wall or frieze surface */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 10 L95 10" />
        <path d="M5 15 L95 15" />
        <path d="M10 10 L10 90" />
        <path d="M90 10 L90 90" />
      </g>

      {/* PRIMARY: Hanging points - decorative rosettes */}
      <g strokeWidth="0.8">
        <circle cx="15" cy="20" r="6" />
        <circle cx="15" cy="20" r="3" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x = 15 + 4 * Math.cos(rad)
          const y = 20 + 4 * Math.sin(rad)
          return <path key={i} d={`M${x},${y} L${15 + 5 * Math.cos(rad)},${20 + 5 * Math.sin(rad)}`} strokeWidth="0.5" />
        })}

        <circle cx="85" cy="20" r="6" />
        <circle cx="85" cy="20" r="3" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x = 85 + 4 * Math.cos(rad)
          const y = 20 + 4 * Math.sin(rad)
          return <path key={`r${i}`} d={`M${x},${y} L${85 + 5 * Math.cos(rad)},${20 + 5 * Math.sin(rad)}`} strokeWidth="0.5" />
        })}
      </g>

      {/* PRIMARY: Main swag curve - draped fabric/foliage */}
      <g strokeWidth="1.2">
        <path d="M15 26 Q25 35, 35 55 Q45 70, 50 72 Q55 70, 65 55 Q75 35, 85 26" />
      </g>

      {/* PRIMARY: Secondary swag line (depth) */}
      <g strokeWidth="0.6">
        <path d="M20 32 Q35 45, 50 60 Q65 45, 80 32" />
      </g>

      {/* PRIMARY: Leaf/flower details along swag */}
      <g strokeWidth="0.8">
        <path d="M22 38 Q25 42, 28 38 Q25 35, 22 38" />
        <path d="M32 52 Q35 57, 38 52 Q35 48, 32 52" />
        <path d="M45 65 Q48 70, 50 68 Q52 70, 55 65 Q52 62, 50 64 Q48 62, 45 65" />
        <path d="M62 52 Q65 57, 68 52 Q65 48, 62 52" />
        <path d="M72 38 Q75 42, 78 38 Q75 35, 72 38" />
      </g>

      {/* PRIMARY: Fruit clusters */}
      <g strokeWidth="0.7">
        <circle cx="30" cy="48" r="3" />
        <circle cx="33" cy="52" r="2.5" />
        <circle cx="27" cy="51" r="2" />

        <circle cx="70" cy="48" r="3" />
        <circle cx="67" cy="52" r="2.5" />
        <circle cx="73" cy="51" r="2" />
      </g>

      {/* PRIMARY: Ribbon tails */}
      <g strokeWidth="0.8">
        <path d="M15 26 L12 35 Q10 45, 15 50" />
        <path d="M14 27 L11 36 Q9 46, 14 51" strokeWidth="0.5" />

        <path d="M85 26 L88 35 Q90 45, 85 50" />
        <path d="M86 27 L89 36 Q91 46, 86 51" strokeWidth="0.5" />
      </g>

      {/* PRIMARY: Central bow/knot at bottom */}
      <g strokeWidth="0.8">
        <path d="M46 72 Q50 78, 54 72" />
        <path d="M48 75 L48 82 Q47 85, 50 86 Q53 85, 52 82 L52 75" />
        <path d="M49 78 L51 78" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * FINIAL - Ornamental termination atop post, pinnacle, or gable
 * Reference: Gothic spires, Renaissance balustrades (St. Peter's Square)
 * Features stacked turned elements culminating in pointed top
 */
const FinialSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="finial-halo" intensity={1} />}
    <g filter={showHalo ? "url(#finial-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Base post/newel */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M38 88 L38 90 L62 90 L62 88" />
        <path d="M36 90 L64 90" />
        <path d="M36 92 L64 92" />
        <path d="M40 75 L40 90" />
        <path d="M60 75 L60 90" />
      </g>

      {/* PRIMARY: Base platform */}
      <g strokeWidth="1">
        <path d="M40 90 L40 75 L60 75 L60 90" />
        <path d="M35 90 L65 90" strokeWidth="1.2" />
        <path d="M37 88 L63 88" strokeWidth="0.6" />
      </g>

      {/* PRIMARY: Lower bulb/sphere */}
      <g strokeWidth="1">
        <path d="M42 75 Q35 70, 35 62 Q35 54, 42 50" />
        <path d="M58 75 Q65 70, 65 62 Q65 54, 58 50" />
        <path d="M42 62 L58 62" strokeWidth="0.5" opacity="0.5" />
      </g>

      {/* PRIMARY: Neck/transition */}
      <g strokeWidth="1">
        <path d="M42 50 Q40 48, 42 45" />
        <path d="M58 50 Q60 48, 58 45" />
        <path d="M42 45 L58 45" />
        <path d="M42 50 L58 50" />
      </g>

      {/* PRIMARY: Upper bulb - fluted urn */}
      <g strokeWidth="1.2">
        <path d="M42 45 Q32 40, 32 30 Q32 20, 45 15" />
        <path d="M58 45 Q68 40, 68 30 Q68 20, 55 15" />
      </g>

      {/* PRIMARY: Flute lines on urn */}
      <g strokeWidth="0.5">
        <path d="M38 35 L42 25" />
        <path d="M44 42 L46 22" />
        <path d="M50 42 L50 20" />
        <path d="M56 42 L54 22" />
        <path d="M62 35 L58 25" />
      </g>

      {/* PRIMARY: Pointed finial top */}
      <g strokeWidth="1.2">
        <path d="M45 15 Q50 5, 55 15" />
        <path d="M50 5 L50 2" />
      </g>

      {/* PRIMARY: Decorative rings */}
      <g strokeWidth="0.6">
        <path d="M35 30 Q35 28, 36 26" />
        <path d="M65 30 Q65 28, 64 26" />
        <circle cx="50" cy="58" r="2.5" opacity="0.6" />
      </g>

      {/* Symmetry axis */}
      <path d="M50 2 L50 90" strokeWidth="0.3" opacity="0.2" strokeDasharray="1 2" />
    </g>
  </svg>
)

/**
 * FRIEZE - Horizontal band with sculptural or painted decoration
 * Reference: Classical entablature (Doric/Ionic/Corinthian orders)
 * Positioned between architrave and cornice, often with repeating patterns
 */
const FriezeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="frieze-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#frieze-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Supporting wall structure */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 72 L5 95 L95 95 L95 72" />
        <path d="M15 75 L15 95" />
        <path d="M35 75 L35 95" />
        <path d="M55 75 L55 95" />
        <path d="M75 75 L75 95" />
      </g>

      {/* PRIMARY: Upper cornice molding */}
      <g strokeWidth="1.2">
        <path d="M5 30 L95 30" />
      </g>
      <g strokeWidth="0.8">
        <path d="M5 33 L95 33" />
      </g>

      {/* PRIMARY: Main frieze band */}
      <g strokeWidth="1">
        <path d="M5 35 L5 65 L95 65 L95 35 Z" />
      </g>

      {/* PRIMARY: Frieze decoration - Greek key/meander pattern */}
      <g strokeWidth="0.8">
        <path d="M10 42 L10 50 L18 50 L18 42 L10 42" />
        <path d="M18 50 L18 58 L26 58" />
        <path d="M26 58 L26 50 L34 50 L34 58 L26 58" />
        <path d="M34 50 L34 42 L42 42" />
        <path d="M42 42 L42 50 L50 50 L50 42 L42 42" />
        <path d="M50 50 L50 58 L58 58" />
        <path d="M58 58 L58 50 L66 50 L66 58 L58 58" />
        <path d="M66 50 L66 42 L74 42" />
        <path d="M74 42 L74 50 L82 50 L82 42 L74 42" />
        <path d="M82 50 L82 58 L90 58" />
      </g>

      {/* PRIMARY: Lower architrave */}
      <g strokeWidth="0.8">
        <path d="M5 67 L95 67" />
      </g>
      <g strokeWidth="1.2">
        <path d="M5 70 L95 70" />
      </g>

      {/* PRIMARY: Dentil molding below frieze */}
      <g strokeWidth="0.8">
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x, i) => (
          <path key={i} d={`M${x-3} 67 L${x-3} 63 L${x+1} 63 L${x+1} 67`} />
        ))}
      </g>

      {/* Detail lines */}
      <g strokeWidth="0.4" opacity="0.5">
        <path d="M8 50 L92 50" />
      </g>
    </g>
  </svg>
)

/**
 * GARGOYLE - Projecting water spout carved as grotesque figure
 * Reference: Gothic cathedrals (Notre-Dame de Paris, Canterbury)
 * Functions as drainage while serving as apotropaic guardian
 */
const GargoyleSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="gargoyle-halo" intensity={1.1} />}
    <g filter={showHalo ? "url(#gargoyle-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Wall and gutter attachment */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M3 20 L3 80 L20 80 L20 20 Z" />
        <path d="M8 30 L8 70" />
        <path d="M12 30 L12 70" />
        <path d="M16 30 L16 70" />
        <path d="M3 45 L20 45" />
        <path d="M3 55 L20 55" />
      </g>

      {/* CONTEXT: Water drainage channel */}
      <g strokeDasharray="2 2" opacity="0.3" strokeWidth="0.5">
        <path d="M98 50 Q102 52, 100 58 Q98 65, 95 75 Q93 82, 90 90" />
      </g>

      {/* PRIMARY: Body projecting from wall */}
      <g strokeWidth="1.2">
        <path d="M20 35 Q35 30, 50 35 Q65 40, 75 50" />
        <path d="M20 65 Q35 70, 50 65 Q65 60, 75 50" />
      </g>

      {/* PRIMARY: Head and neck */}
      <g strokeWidth="1.2">
        <path d="M75 50 Q85 45, 90 48 Q95 50, 90 55 Q85 58, 75 50" />
      </g>

      {/* PRIMARY: Grotesque face features */}
      <g strokeWidth="0.8">
        {/* Eyes */}
        <circle cx="82" cy="48" r="2" />
        <circle cx="85" cy="52" r="2" />
        <path d="M80 47 L78 45" />
        <path d="M83 53 L82 56" />

        {/* Open mouth (water spout) */}
        <path d="M90 48 L98 46 L98 54 L90 52 Z" strokeWidth="1" />
        <path d="M92 50 L96 50" strokeWidth="0.5" />
      </g>

      {/* PRIMARY: Ears/horns */}
      <g strokeWidth="0.8">
        <path d="M82 42 L85 35 L88 43" />
        <path d="M85 35 L86 33" strokeWidth="0.5" />
      </g>

      {/* PRIMARY: Wings/shoulders */}
      <g strokeWidth="0.9">
        <path d="M30 40 Q40 35, 50 40 Q45 38, 40 42 Q35 44, 30 40" />
        <path d="M30 60 Q40 65, 50 60 Q45 62, 40 58 Q35 56, 30 60" />
        <path d="M35 38 Q40 36, 43 39" strokeWidth="0.5" />
        <path d="M35 62 Q40 64, 43 61" strokeWidth="0.5" />
      </g>

      {/* PRIMARY: Claws gripping wall */}
      <g strokeWidth="0.8">
        <path d="M20 42 L25 45 L22 48 L20 46" />
        <path d="M22 44 L24 43" strokeWidth="0.5" />
        <path d="M20 58 L25 55 L22 52 L20 54" />
        <path d="M22 56 L24 57" strokeWidth="0.5" />
      </g>

      {/* PRIMARY: Texture/scales on body */}
      <g strokeWidth="0.6">
        <path d="M35 48 Q38 50, 35 52" />
        <path d="M45 46 Q48 50, 45 54" />
        <path d="M55 47 Q58 50, 55 53" />
        <path d="M65 48 Q68 50, 65 52" />
      </g>

      {/* PRIMARY: Tail suggestion */}
      <g strokeWidth="0.7">
        <path d="M25 50 Q22 55, 24 60" />
      </g>
    </g>
  </svg>
)

/**
 * GROTESQUE - Decorative carved figure (non-functional, unlike gargoyle)
 * Reference: Romanesque capitals, Renaissance ornament (Green Man motif)
 * Often depicts human/animal hybrid with foliage elements
 */
const GrotesqueSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="grotesque-halo" intensity={1} />}
    <g filter={showHalo ? "url(#grotesque-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Architectural frame (capital, corbel, or panel) */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M15 10 L15 90 L85 90 L85 10" />
        <path d="M20 15 L80 15" />
        <path d="M20 85 L80 85" />
        <path d="M20 15 L20 85" />
        <path d="M80 15 L80 85" />
      </g>

      {/* PRIMARY: Face outline - Green Man style */}
      <g strokeWidth="1.2">
        <ellipse cx="50" cy="50" rx="25" ry="30" />
      </g>

      {/* PRIMARY: Foliage emerging from sides */}
      <g strokeWidth="0.9">
        <path d="M25 45 Q15 40, 10 50 Q15 55, 20 52 Q22 48, 25 45" />
        <path d="M75 45 Q85 40, 90 50 Q85 55, 80 52 Q78 48, 75 45" />
        <path d="M12 48 Q10 50, 12 52" strokeWidth="0.6" />
        <path d="M88 48 Q90 50, 88 52" strokeWidth="0.6" />
      </g>

      {/* PRIMARY: Foliage from top of head */}
      <g strokeWidth="0.9">
        <path d="M30 25 Q25 15, 35 10 Q40 15, 38 22 Q34 24, 30 25" />
        <path d="M70 25 Q75 15, 65 10 Q60 15, 62 22 Q66 24, 70 25" />
        <path d="M32 12 Q30 10, 33 8" strokeWidth="0.6" />
        <path d="M68 12 Q70 10, 67 8" strokeWidth="0.6" />
      </g>

      {/* PRIMARY: Eyes - leaf shaped */}
      <g strokeWidth="0.8">
        <path d="M40 42 Q45 38, 50 42 Q45 46, 40 42" />
        <path d="M50 42 Q55 38, 60 42 Q55 46, 50 42" />
        <circle cx="45" cy="42" r="1.5" />
        <circle cx="55" cy="42" r="1.5" />
      </g>

      {/* PRIMARY: Nose */}
      <g strokeWidth="0.8">
        <path d="M50 45 L48 55 L52 55 Z" />
        <path d="M48 54 Q50 56, 52 54" strokeWidth="0.5" />
      </g>

      {/* PRIMARY: Mouth with foliage sprouting */}
      <g strokeWidth="0.9">
        <path d="M40 62 Q45 68, 50 65 Q55 68, 60 62" />
        <path d="M45 65 Q42 75, 35 82 Q30 88, 25 85" />
        <path d="M50 67 L50 85 Q48 88, 50 90" />
        <path d="M55 65 Q58 75, 65 82 Q70 88, 75 85" />
      </g>

      {/* PRIMARY: Vine tendrils */}
      <g strokeWidth="0.7">
        <path d="M35 82 Q32 85, 30 84" />
        <path d="M65 82 Q68 85, 70 84" />
        <path d="M37 78 Q35 80, 36 82" strokeWidth="0.5" />
        <path d="M63 78 Q65 80, 64 82" strokeWidth="0.5" />
      </g>

      {/* PRIMARY: Cheek foliage details */}
      <g strokeWidth="0.7">
        <path d="M30 55 Q25 58, 28 63 Q30 60, 30 57" />
        <path d="M70 55 Q75 58, 72 63 Q70 60, 70 57" />
      </g>

      {/* PRIMARY: Additional leaf details */}
      <g strokeWidth="0.6">
        <path d="M42 72 L38 78" />
        <path d="M58 72 L62 78" />
        <path d="M48 82 L46 88" />
        <path d="M52 82 L54 88" />
      </g>
    </g>
  </svg>
)

/**
 * MEDALLION - Circular relief ornament, often with portrait or emblem
 * Reference: Roman imperial portraiture, Renaissance palace decoration
 * Features concentric frames with central figurative or symbolic motif
 */
const MedallionSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="medallion-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#medallion-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Wall or ceiling surface */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 5 L95 5 L95 95 L5 95 Z" />
        <path d="M10 50 L5 50" />
        <path d="M95 50 L90 50" />
        <path d="M50 5 L50 10" />
        <path d="M50 95 L50 90" />
      </g>

      {/* PRIMARY: Outer circle frame */}
      <g strokeWidth="1.2">
        <circle cx="50" cy="50" r="40" />
      </g>
      <g strokeWidth="0.8">
        <circle cx="50" cy="50" r="37" />
      </g>

      {/* PRIMARY: Decorative border - egg and dart pattern */}
      <g strokeWidth="0.6">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x = 50 + 38.5 * Math.cos(rad)
          const y = 50 + 38.5 * Math.sin(rad)
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="2" />
              <path d={`M${x},${y} L${50 + 36 * Math.cos(rad)},${50 + 36 * Math.sin(rad)}`} strokeWidth="0.4" />
            </g>
          )
        })}
      </g>

      {/* PRIMARY: Inner field circle */}
      <g strokeWidth="0.9">
        <circle cx="50" cy="50" r="30" />
      </g>

      {/* PRIMARY: Central motif - classical profile portrait */}
      <g strokeWidth="0.9">
        {/* Face profile */}
        <path d="M40 35 Q45 30, 55 32 Q60 35, 58 42" />
        <path d="M58 42 Q56 48, 50 55" />
        <path d="M50 55 Q45 58, 42 55" />
        <path d="M42 55 Q38 50, 40 42 Q40 38, 40 35" />
      </g>

      {/* PRIMARY: Profile facial features */}
      <g strokeWidth="0.7">
        {/* Nose */}
        <path d="M52 38 L55 40 Q56 42, 54 43" />
        {/* Eye */}
        <circle cx="48" cy="40" r="1.5" />
        <path d="M46 39 Q48 38, 50 39" strokeWidth="0.5" />
        {/* Mouth */}
        <path d="M45 48 Q48 50, 50 48" />
      </g>

      {/* PRIMARY: Hair/laurel wreath */}
      <g strokeWidth="0.8">
        <path d="M40 35 Q35 32, 38 28 Q42 25, 48 27" />
        <path d="M48 27 Q55 25, 60 30 Q58 33, 55 32" />
        {/* Leaf details */}
        <path d="M40 30 Q38 28, 40 26" strokeWidth="0.5" />
        <path d="M45 26 Q44 24, 46 23" strokeWidth="0.5" />
        <path d="M52 26 Q52 24, 54 24" strokeWidth="0.5" />
        <path d="M58 30 Q59 28, 58 26" strokeWidth="0.5" />
      </g>

      {/* PRIMARY: Ribbon/scroll below portrait */}
      <g strokeWidth="0.8">
        <path d="M35 70 Q50 75, 65 70" />
        <path d="M35 72 Q50 77, 65 72" strokeWidth="0.5" />
        <path d="M38 68 L32 75" />
        <path d="M62 68 L68 75" />
      </g>

      {/* Decorative cross lines for dimension */}
      <g strokeWidth="0.3" opacity="0.3" strokeDasharray="1 2">
        <path d="M50 10 L50 90" />
        <path d="M10 50 L90 50" />
      </g>
    </g>
  </svg>
)

/**
 * MOLDING - Continuous decorative profile strip
 * Reference: Classical orders (Vitruvius), Renaissance treatises
 * Combines cyma, ovolo, bead, cavetto, and dentil profiles
 */
const MoldingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="molding-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#molding-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Wall or structural element behind */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 5 L5 95" />
        <path d="M3 10 L8 10" />
        <path d="M3 30 L8 30" />
        <path d="M3 50 L8 50" />
        <path d="M3 70 L8 70" />
        <path d="M3 90 L8 90" />
      </g>

      {/* PRIMARY: Cyma recta (top wave molding) */}
      <g strokeWidth="1">
        <path d="M10 15 Q30 12, 50 15 Q70 18, 90 15" />
        <path d="M10 20 Q30 17, 50 20 Q70 23, 90 20" />
      </g>

      {/* PRIMARY: Ovolo (quarter round) */}
      <g strokeWidth="1">
        <path d="M10 25 L90 25" />
        <path d="M10 25 Q10 32, 15 32 L85 32 Q90 32, 90 25" />
      </g>

      {/* PRIMARY: Fillet (flat band) */}
      <g strokeWidth="1">
        <path d="M10 35 L90 35" />
        <path d="M10 40 L90 40" />
      </g>

      {/* PRIMARY: Bead molding (astragal) */}
      <g strokeWidth="0.8">
        {[15, 25, 35, 45, 55, 65, 75, 85].map((x, i) => (
          <circle key={i} cx={x} cy="47" r="4" />
        ))}
        <path d="M10 47 L90 47" strokeWidth="0.5" opacity="0.4" />
      </g>

      {/* PRIMARY: Cavetto (concave quarter round) */}
      <g strokeWidth="1">
        <path d="M10 55 Q10 62, 15 65 L85 65 Q90 62, 90 55" />
        <path d="M10 55 L90 55" />
      </g>

      {/* PRIMARY: Dentil course (tooth-like blocks) */}
      <g strokeWidth="0.9">
        {[12, 22, 32, 42, 52, 62, 72, 82].map((x, i) => (
          <path key={i} d={`M${x} 70 L${x} 78 L${x+6} 78 L${x+6} 70 Z`} />
        ))}
      </g>

      {/* PRIMARY: Fascia (flat face) */}
      <g strokeWidth="1.2">
        <path d="M10 82 L90 82" />
        <path d="M10 90 L90 90" />
      </g>
      <g strokeWidth="0.5">
        <path d="M10 86 L90 86" />
      </g>

      {/* PRIMARY: Profile section view (right edge) */}
      <g strokeWidth="1.2" opacity="0.6">
        <path d="M95 20 L98 20 Q100 25, 98 30 L100 35 L98 40 L100 47 L98 55 Q96 60, 98 65 L95 70 L98 82 L95 90" />
      </g>

      {/* Detail reference lines */}
      <g strokeWidth="0.3" opacity="0.3" strokeDasharray="1 2">
        <path d="M8 15 L98 15" />
        <path d="M8 32 L98 32" />
        <path d="M8 47 L98 47" />
        <path d="M8 65 L98 65" />
      </g>
    </g>
  </svg>
)

/**
 * PARAPET - Low protective wall at edge of roof, terrace, or balcony
 * Reference: Medieval castles, Renaissance palazzi (Palazzo Medici)
 * Features solid wall with decorative openings and coping cap
 */
const ParapetSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="parapet-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#parapet-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Roof surface and structure below */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 85 L95 85" />
        <path d="M10 90 L90 90" />
        <path d="M10 85 L10 92" />
        <path d="M30 85 L30 92" />
        <path d="M50 85 L50 92" />
        <path d="M70 85 L70 92" />
        <path d="M90 85 L90 92" />
      </g>

      {/* PRIMARY: Main parapet wall */}
      <g strokeWidth="1.2">
        <path d="M8 45 L8 85 L92 85 L92 45" />
      </g>

      {/* PRIMARY: Coping (protective top cap) */}
      <g strokeWidth="1.2">
        <path d="M5 42 L95 42 L95 48 L5 48 Z" />
      </g>
      <g strokeWidth="0.6">
        <path d="M5 45 L95 45" />
        <path d="M7 44 L93 44" opacity="0.5" />
      </g>

      {/* PRIMARY: Decorative openings - quatrefoil pattern */}
      <g strokeWidth="0.8">
        {/* Left quatrefoil */}
        <circle cx="25" cy="65" r="8" />
        <path d="M25 57 Q30 62, 25 67 Q20 62, 25 57" />
        <path d="M17 65 Q22 60, 27 65 Q22 70, 17 65" />
        <path d="M33 65 Q28 60, 23 65 Q28 70, 33 65" />
        <path d="M25 73 Q20 68, 25 63 Q30 68, 25 73" />

        {/* Center quatrefoil */}
        <circle cx="50" cy="65" r="8" />
        <path d="M50 57 Q55 62, 50 67 Q45 62, 50 57" />
        <path d="M42 65 Q47 60, 52 65 Q47 70, 42 65" />
        <path d="M58 65 Q53 60, 48 65 Q53 70, 58 65" />
        <path d="M50 73 Q45 68, 50 63 Q55 68, 50 73" />

        {/* Right quatrefoil */}
        <circle cx="75" cy="65" r="8" />
        <path d="M75 57 Q80 62, 75 67 Q70 62, 75 57" />
        <path d="M67 65 Q72 60, 77 65 Q72 70, 67 65" />
        <path d="M83 65 Q78 60, 73 65 Q78 70, 83 65" />
        <path d="M75 73 Q70 68, 75 63 Q80 68, 75 73" />
      </g>

      {/* PRIMARY: End piers (buttresses) */}
      <g strokeWidth="1">
        <path d="M5 38 L5 85 L12 85 L12 38 Z" />
        <path d="M88 38 L88 85 L95 85 L95 38 Z" />
      </g>

      {/* PRIMARY: Pier caps */}
      <g strokeWidth="1">
        <path d="M3 35 L14 35 L14 40 L3 40 Z" />
        <path d="M86 35 L97 35 L97 40 L86 40 Z" />
        <path d="M4 37 L13 37" strokeWidth="0.5" />
        <path d="M87 37 L96 37" strokeWidth="0.5" />
      </g>

      {/* Wall texture suggestion */}
      <g strokeWidth="0.3" opacity="0.2">
        <path d="M15 50 L85 50" />
        <path d="M15 75 L85 75" />
      </g>
    </g>
  </svg>
)

/**
 * PINNACLE - Vertical ornamental termination on Gothic architecture
 * Reference: Gothic cathedrals (Reims, Cologne), perpendicular style
 * Features octagonal shaft with crockets and pointed spire with finial
 */
const PinnacleSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pinnacle-halo" intensity={1} />}
    <g filter={showHalo ? "url(#pinnacle-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Base buttress or tower support */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M28 88 L28 90 L72 90 L72 88" />
        <path d="M25 90 L75 90" />
        <path d="M25 92 L75 92" />
        <path d="M30 70 L30 92" />
        <path d="M70 70 L70 92" />
        <path d="M35 85 L65 85" />
      </g>

      {/* PRIMARY: Base platform */}
      <g strokeWidth="1.2">
        <path d="M30 90 L30 70 L70 70 L70 90" />
        <path d="M25 90 L75 90" />
      </g>

      {/* PRIMARY: Pinnacle body - octagonal taper */}
      <g strokeWidth="1.2">
        <path d="M35 70 L35 45 L40 40 L60 40 L65 45 L65 70" />
      </g>

      {/* PRIMARY: Vertical edges showing octagonal form */}
      <g strokeWidth="0.7">
        <path d="M40 40 L40 70" />
        <path d="M60 40 L60 70" />
        <path d="M37 42 L37 70" strokeWidth="0.4" opacity="0.6" />
        <path d="M63 42 L63 70" strokeWidth="0.4" opacity="0.6" />
      </g>

      {/* PRIMARY: Crockets (decorative buds on edges) */}
      <g strokeWidth="0.8">
        <path d="M35 55 Q32 52, 35 50 Q36 51, 35 53" />
        <path d="M35 45 Q32 42, 35 40 Q36 41, 35 43" />
        <path d="M65 55 Q68 52, 65 50 Q64 51, 65 53" />
        <path d="M65 45 Q68 42, 65 40 Q64 41, 65 43" />
      </g>

      {/* PRIMARY: Pyramidal spire */}
      <g strokeWidth="1.2">
        <path d="M40 40 L50 8 L60 40" />
      </g>

      {/* PRIMARY: Spire edges (showing facets) */}
      <g strokeWidth="0.5">
        <path d="M43 35 L50 8" opacity="0.5" />
        <path d="M57 35 L50 8" opacity="0.5" />
      </g>

      {/* PRIMARY: Crockets ascending spire */}
      <g strokeWidth="0.8">
        <path d="M44 30 Q41 28, 44 25 Q45 26, 44 28" />
        <path d="M47 20 Q44 18, 47 15 Q48 16, 47 18" />
        <path d="M56 30 Q59 28, 56 25 Q55 26, 56 28" />
        <path d="M53 20 Q56 18, 53 15 Q52 16, 53 18" />
      </g>

      {/* PRIMARY: Finial cross at apex */}
      <g strokeWidth="1">
        <path d="M50 8 L50 5" />
        <path d="M48 5 L52 5" />
        <path d="M50 3 L50 7" />
        <circle cx="50" cy="5" r="1.5" opacity="0.4" />
      </g>

      {/* PRIMARY: Gabled canopy openings */}
      <g strokeWidth="0.8">
        <path d="M38 50 L42 45 L46 50" />
        <path d="M40 47 L44 47" strokeWidth="0.5" />
        <path d="M54 50 L58 45 L62 50" />
        <path d="M56 47 L60 47" strokeWidth="0.5" />
      </g>

      {/* PRIMARY: Base molding details */}
      <g strokeWidth="0.7">
        <path d="M32 70 L68 70" />
        <path d="M33 73 L67 73" />
        <path d="M34 76 L66 76" strokeWidth="0.5" />
      </g>

      {/* Symmetry axis */}
      <path d="M50 5 L50 90" strokeWidth="0.3" opacity="0.2" strokeDasharray="1 2" />
    </g>
  </svg>
)

// Export mapping for all decorative elements
export const DECORATIVE_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'acroterion': AcroterionSVG,
  'baluster': BalusterSVG,
  'balustrade': BalustradeSVG,
  'bracket': BracketSVG,
  'cartouche': CartoucheSVG,
  'festoon': FestoonSVG,
  'finial': FinialSVG,
  'frieze': FriezeSVG,
  'gargoyle': GargoyleSVG,
  'grotesque': GrotesqueSVG,
  'medallion': MedallionSVG,
  'molding': MoldingSVG,
  'parapet': ParapetSVG,
  'pinnacle': PinnacleSVG,
}

export {
  AcroterionSVG,
  BalusterSVG,
  BalustradeSVG,
  BracketSVG,
  CartoucheSVG,
  FestoonSVG,
  FinialSVG,
  FriezeSVG,
  GargoyleSVG,
  GrotesqueSVG,
  MedallionSVG,
  MoldingSVG,
  ParapetSVG,
  PinnacleSVG,
}
