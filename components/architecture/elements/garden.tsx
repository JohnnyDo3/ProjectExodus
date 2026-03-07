'use client'

import React from 'react'
import { S } from './svgStyleTokens'

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
 * ARBOR - Garden Archway with Climbing Roses
 * Rustic wooden arch supporting trained Rosa 'New Dawn' climbers
 * Reference: Sissinghurst Castle Garden white garden arbor, Gertrude Jekyll rose arches
 * View: Front elevation showing rose-covered arch over gravel path
 */
const ArborSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="arbor-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#arbor-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT (near): Gravel path and surrounding borders */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 90 L95 90 L95 95 L5 95 Z" />
        <ellipse cx="12" cy="72" rx="9" ry="6" />
        <ellipse cx="88" cy="72" rx="9" ry="6" />
        <path d="M15 88 Q25 86, 35 88" />
        <path d="M65 88 Q75 86, 85 88" />
        <path d="M38 92 L62 92" />
      </g>

      {/* PRIMARY: Arbor structure with climbing roses */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Left posts (rustic wood) */}
        <path d="M20 28 L20 90" strokeWidth={S.P.strokeWidth} />
        <path d="M25 28 L25 90" strokeWidth={S.P.strokeWidth} />
        <path d="M20 28 L25 28" strokeWidth={S.P.strokeWidthLight} />

        {/* Right posts */}
        <path d="M75 28 L75 90" strokeWidth={S.P.strokeWidth} />
        <path d="M80 28 L80 90" strokeWidth={S.P.strokeWidth} />
        <path d="M75 28 L80 28" strokeWidth={S.P.strokeWidthLight} />

        {/* Main arched overhead beams */}
        <path d="M20 28 Q50 3, 80 28" strokeWidth={S.P.strokeWidth} />
        <path d="M25 28 Q50 8, 75 28" strokeWidth={S.P.strokeWidth} />

        {/* Cross bracing on arch */}
        <path d="M28 24 Q50 10, 72 24" strokeWidth={S.P.strokeWidthLight} />
        <path d="M32 20 L42 15" strokeWidth={S.D.strokeWidth} />
        <path d="M68 20 L58 15" strokeWidth={S.D.strokeWidth} />
        <path d="M50 8 L50 15" strokeWidth={S.D.strokeWidth} />

        {/* Rose canes climbing left post */}
        <path d="M22 80 Q27 75, 24 70 Q29 65, 26 60 Q31 55, 28 50 Q33 45, 30 40 Q35 35, 32 30" strokeWidth={S.P.strokeWidthLight} />
        <path d="M23 65 Q18 62, 20 58" strokeWidth={S.D.strokeWidth} />
        <path d="M24 48 Q19 45, 21 41" strokeWidth={S.D.strokeWidth} />

        {/* Rose canes climbing right post */}
        <path d="M78 80 Q73 75, 76 70 Q71 65, 74 60 Q69 55, 72 50 Q67 45, 70 40 Q65 35, 68 30" strokeWidth={S.P.strokeWidthLight} />
        <path d="M77 65 Q82 62, 80 58" strokeWidth={S.D.strokeWidth} />
        <path d="M76 48 Q81 45, 79 41" strokeWidth={S.D.strokeWidth} />

        {/* Rose blooms cascading over arch */}
        <circle cx="35" cy="22" r="3.5" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="42" cy="18" r="3" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="50" cy="15" r="3.5" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="58" cy="18" r="3" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="65" cy="22" r="3.5" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="38" cy="28" r="2.5" strokeWidth={S.D.strokeWidth} />
        <circle cx="62" cy="28" r="2.5" strokeWidth={S.D.strokeWidth} />
        <circle cx="28" cy="45" r="2.5" strokeWidth={S.D.strokeWidth} />
        <circle cx="72" cy="45" r="2.5" strokeWidth={S.D.strokeWidth} />

        {/* Rose foliage clusters */}
        <path d="M34 25 Q37 23, 36 27" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M56 20 Q59 18, 58 22" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M26 52 Q29 50, 28 54" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M74 52 Q71 50, 72 54" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      </g>
    </g>
  </svg>
)

/**
 * BENCH - Formal Garden Seat in Parterre Setting
 * Classical wooden garden bench facing ornamental planting
 * Reference: Versailles garden benches, Lutyens-style benches at Hestercombe
 * View: Front view with bench positioned in formal boxwood parterre
 */
const BenchSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="bench-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#bench-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Formal parterre garden setting */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 92 L95 92 L95 95 L5 95 Z" />
        <path d="M8 88 Q15 86, 22 88" />
        <path d="M78 88 Q85 86, 92 88" />
        <ellipse cx="15" cy="78" rx="10" ry="7" />
        <ellipse cx="85" cy="78" rx="10" ry="7" />
        <path d="M35 85 L40 85 L40 90 L35 90 Z" />
        <path d="M60 85 L65 85 L65 90 L60 90 Z" />
      </g>

      {/* PRIMARY: Classical garden bench */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Back rest posts (turned finials) */}
        <path d="M22 35 L22 65" strokeWidth={S.P.strokeWidth} />
        <path d="M78 35 L78 65" strokeWidth={S.P.strokeWidth} />

        {/* Decorative finials */}
        <circle cx="22" cy="32" r="3" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="78" cy="32" r="3" strokeWidth={S.P.strokeWidthLight} />
        <path d="M22 29 L22 25" strokeWidth={S.P.strokeWidth} />
        <path d="M78 29 L78 25" strokeWidth={S.P.strokeWidth} />

        {/* Top rail of back */}
        <path d="M22 42 Q50 38, 78 42" strokeWidth={S.P.strokeWidth} />
        <path d="M22 45 Q50 41, 78 45" strokeWidth={S.P.strokeWidthLight} />

        {/* Vertical slats in back rest */}
        <path d="M30 45 L30 62" strokeWidth={S.D.strokeWidth} />
        <path d="M38 44 L38 62" strokeWidth={S.D.strokeWidth} />
        <path d="M46 43 L46 62" strokeWidth={S.D.strokeWidth} />
        <path d="M54 43 L54 62" strokeWidth={S.D.strokeWidth} />
        <path d="M62 44 L62 62" strokeWidth={S.D.strokeWidth} />
        <path d="M70 45 L70 62" strokeWidth={S.D.strokeWidth} />

        {/* Seat surface with planks */}
        <path d="M20 62 L80 62 L82 65 L18 65 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M25 63 L75 63" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M25 64 L75 64" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

        {/* Seat support brackets */}
        <path d="M22 62 L25 68 L22 68" strokeWidth={S.D.strokeWidth} />
        <path d="M78 62 L75 68 L78 68" strokeWidth={S.D.strokeWidth} />
        <path d="M40 65 L42 68 L40 68" strokeWidth={S.D.strokeWidth} />
        <path d="M60 65 L58 68 L60 68" strokeWidth={S.D.strokeWidth} />

        {/* Front legs with decorative turnings */}
        <path d="M25 68 L25 90" strokeWidth={S.P.strokeWidthLight} />
        <path d="M75 68 L75 90" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="25" cy="75" r="2" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <circle cx="75" cy="75" r="2" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Back legs */}
        <path d="M22 65 L22 90" strokeWidth={S.P.strokeWidthLight} />
        <path d="M78 65 L78 90" strokeWidth={S.P.strokeWidthLight} />

        {/* Cross stretcher */}
        <path d="M25 82 L75 82" strokeWidth={S.P.strokeWidthLight} />
        <path d="M35 80 L35 84" strokeWidth={S.D.strokeWidth} />
        <path d="M50 80 L50 84" strokeWidth={S.D.strokeWidth} />
        <path d="M65 80 L65 84" strokeWidth={S.D.strokeWidth} />

        {/* Armrests */}
        <path d="M20 55 Q22 52, 25 55 L25 62" strokeWidth={S.P.strokeWidthLight} />
        <path d="M80 55 Q78 52, 75 55 L75 62" strokeWidth={S.P.strokeWidthLight} />
      </g>
    </g>
  </svg>
)

/**
 * FOLLY - Gothic Revival Tower in Romantic Landscape
 * Ornamental ruined tower creating picturesque vista
 * Reference: Wimpole Estate Gothic Tower, Painshill Park ruined abbey
 * View: Three-quarter view showing castellated tower in landscape
 */
const FollySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="folly-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#folly-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (far): Romantic landscape with distant trees */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        <path d="M5 88 Q15 85, 25 88 Q35 90, 45 88" />
        <path d="M75 88 Q85 86, 95 88" />
        <ellipse cx="12" cy="75" rx="8" ry="6" />
        <ellipse cx="88" cy="78" rx="10" ry="7" />
        <path d="M5 90 L95 90" />
        <path d="M8 70 Q12 68, 15 70" />
      </g>

      {/* PRIMARY: Gothic folly tower */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Main tower body - tapered */}
        <path d="M30 85 L28 35 L38 30 L62 30 L72 35 L70 85" strokeWidth={S.P.strokeWidth} />
        <path d="M38 30 L38 85" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M62 30 L62 85" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Crenellations (battlements) */}
        <path d="M26 35 L26 30 L32 30 L32 35" strokeWidth={S.P.strokeWidthLight} />
        <path d="M36 35 L36 28 L42 28 L42 35" strokeWidth={S.P.strokeWidthLight} />
        <path d="M46 35 L46 27 L54 27 L54 35" strokeWidth={S.P.strokeWidthLight} />
        <path d="M58 35 L58 28 L64 28 L64 35" strokeWidth={S.P.strokeWidthLight} />
        <path d="M68 35 L68 30 L74 30 L74 35" strokeWidth={S.P.strokeWidthLight} />

        {/* Gothic pointed arch window */}
        <path d="M42 45 L42 60 Q50 55, 58 60 L58 45 Q50 40, 42 45" strokeWidth={S.P.strokeWidthLight} />
        <path d="M45 48 L45 58 Q50 54, 55 58 L55 48" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Ruined section - missing stonework */}
        <path d="M65 50 L68 50 L68 55 L65 58" strokeWidth={S.P.strokeWidthLight} />
        <path d="M32 60 L28 62 L30 66" strokeWidth={S.P.strokeWidthLight} />

        {/* Stone masonry joints */}
        <path d="M32 38 L48 38" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M54 38 L68 38" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M30 48 L40 48" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M60 48 L70 48" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M32 70 L42 70" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M58 70 L68 70" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Ivy and vegetation growing on tower */}
        <path d="M70 75 Q74 72, 72 68 Q76 65, 74 62" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M28 58 Q25 55, 27 52 Q24 49, 26 46" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M68 45 Q70 42, 72 44" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Fallen stonework at base */}
        <path d="M75 82 L82 80 L84 85 L77 87 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M20 84 L24 83 L26 86 L22 87 Z" strokeWidth={S.P.strokeWidthLight} />

        {/* Base platform */}
        <path d="M25 85 L75 85 L78 90 L22 90 Z" strokeWidth={S.P.strokeWidthLight} />
      </g>
    </g>
  </svg>
)

/**
 * FOUNTAIN - Baroque Water Feature in Garden Square
 * Multi-tiered stone fountain with sculpted basin
 * Reference: Villa d'Este fountains, Boboli Gardens Neptune fountain
 * View: Front elevation showing tiered fountain with water basins
 */
const FountainSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="fountain-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#fountain-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Paved plaza and surrounding garden */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 92 L20 92" />
        <path d="M80 92 L95 92" />
        <path d="M10 88 Q20 86, 30 88" />
        <path d="M70 88 Q80 86, 90 88" />
        <ellipse cx="15" cy="80" rx="8" ry="5" />
        <ellipse cx="85" cy="80" rx="8" ry="5" />
        <circle cx="50" cy="95" r="45" strokeWidth="0.5" />
      </g>

      {/* PRIMARY: Baroque fountain structure */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Central water jet */}
        <path d="M50 10 L50 28" strokeWidth={S.P.strokeWidthLight} />
        <path d="M48 15 Q50 12, 52 15" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M48 20 Q50 18, 52 20" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M47 25 Q50 23, 53 25" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Finial ornament */}
        <circle cx="50" cy="8" r="3" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 5 L50 3" strokeWidth={S.D.strokeWidth} />

        {/* Upper basin - scalloped rim */}
        <path d="M38 28 Q35 30, 38 32 Q41 30, 38 28" strokeWidth={S.P.strokeWidthLight} />
        <path d="M42 28 Q40 30, 42 32 Q44 30, 42 28" strokeWidth={S.P.strokeWidthLight} />
        <path d="M46 28 Q44 30, 46 32 Q48 30, 46 28" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 28 Q48 30, 50 32 Q52 30, 50 28" strokeWidth={S.P.strokeWidthLight} />
        <path d="M54 28 Q52 30, 54 32 Q56 30, 54 28" strokeWidth={S.P.strokeWidthLight} />
        <path d="M58 28 Q56 30, 58 32 Q60 30, 58 28" strokeWidth={S.P.strokeWidthLight} />
        <path d="M62 28 Q60 30, 62 32 Q64 30, 62 28" strokeWidth={S.P.strokeWidthLight} />

        {/* Upper basin bowl */}
        <ellipse cx="50" cy="32" rx="14" ry="6" strokeWidth={S.P.strokeWidthLight} />
        <ellipse cx="50" cy="35" rx="12" ry="5" strokeWidth={S.D.strokeWidth} />
        <path d="M40 34 Q50 37, 60 34" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

        {/* Water overflow from upper basin */}
        <path d="M38 34 Q35 38, 36 42" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M62 34 Q65 38, 64 42" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Pedestal between tiers */}
        <path d="M46 35 L46 45 L54 45 L54 35" strokeWidth={S.P.strokeWidthLight} />
        <path d="M48 40 L52 40" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Middle basin - larger, scalloped */}
        <path d="M30 45 Q28 47, 30 49 L70 49 Q72 47, 70 45" strokeWidth={S.P.strokeWidthLight} />
        <ellipse cx="50" cy="49" rx="22" ry="8" strokeWidth={S.P.strokeWidthLight} />
        <ellipse cx="50" cy="52" rx="20" ry="7" strokeWidth={S.D.strokeWidth} />
        <path d="M32 50 Q50 54, 68 50" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

        {/* Decorative shell motifs on middle basin */}
        <path d="M35 48 Q38 46, 41 48" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M59 48 Q62 46, 65 48" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Water spouts */}
        <path d="M32 50 Q28 54, 30 58" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M68 50 Q72 54, 70 58" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Lower pedestal */}
        <path d="M42 52 L42 65 L58 65 L58 52" strokeWidth={S.P.strokeWidthLight} />
        <path d="M44 58 L56 58" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Main basin - largest */}
        <path d="M20 65 L80 65" strokeWidth={S.P.strokeWidth} />
        <ellipse cx="50" cy="68" rx="32" ry="10" strokeWidth={S.P.strokeWidth} />
        <ellipse cx="50" cy="72" rx="30" ry="9" strokeWidth={S.P.strokeWidthLight} />
        <path d="M22 70 Q50 76, 78 70" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Ornamental rim decoration */}
        <circle cx="35" cy="66" r="2" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <circle cx="50" cy="66" r="2" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <circle cx="65" cy="66" r="2" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Base plinth */}
        <path d="M15 78 L85 78 L88 85 L12 85 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M17 81 L83 81" strokeWidth={S.D.strokeWidthFine} />

        {/* Ground pool */}
        <path d="M10 85 L90 85 L92 90 L8 90 Z" strokeWidth={S.P.strokeWidthLight} />
        <ellipse cx="50" cy="88" rx="40" ry="5" strokeWidth={S.D.strokeWidth} />
      </g>
    </g>
  </svg>
)

/**
 * GAZEBO - Victorian Garden Pavilion with Decorative Ironwork
 * Ornate octagonal shelter with filigree details
 * Reference: Central Park Ladies Pavilion, Kew Gardens pagoda influence
 * View: Three-quarter view showing Victorian ironwork and tiered roof
 */
const GazeboSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="gazebo-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#gazebo-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Lawn and garden paths */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 95 L20 95" />
        <path d="M80 95 L95 95" />
        <ellipse cx="12" cy="85" rx="10" ry="5" />
        <ellipse cx="88" cy="85" rx="10" ry="5" />
        <path d="M35 98 Q50 96, 65 98" />
        <path d="M20 90 Q30 88, 40 90" />
        <path d="M60 90 Q70 88, 80 90" />
      </g>

      {/* PRIMARY: Victorian gazebo - 3/4 view showing conical roof */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Upper conical roof tier (bell-shaped curve) */}
        <path d="M50 6 Q35 18, 28 28 Q24 33, 22 35" strokeWidth={S.P.strokeWidth} />
        <path d="M50 6 Q65 18, 72 28 Q76 33, 78 35" strokeWidth={S.P.strokeWidth} />
        {/* Eave overhang - curved bell shape */}
        <path d="M22 35 Q30 33, 50 35 Q70 33, 78 35" strokeWidth={S.P.strokeWidthLight} />

        {/* Lower conical roof tier (larger bell curve) */}
        <path d="M22 35 Q18 45, 16 55 Q14 60, 14 62" strokeWidth={S.P.strokeWidth} />
        <path d="M78 35 Q82 45, 84 55 Q86 60, 86 62" strokeWidth={S.P.strokeWidth} />
        {/* Lower eave overhang */}
        <path d="M14 62 Q30 58, 50 62 Q70 58, 86 62" strokeWidth={S.P.strokeWidthLight} />

        {/* Roof structural lines - radial rafters */}
        <path d="M50 6 L50 62" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M50 6 L22 35" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M50 6 L78 35" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M50 35 L14 62" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M50 35 L86 62" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Decorative finial - Victorian crown */}
        <circle cx="50" cy="6" r="3" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 3 L50 0" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="50" cy="0" r="1.5" strokeWidth={S.D.strokeWidth} />

        {/* Six visible columns (3/4 view of octagonal plan) */}
        <path d="M22 65 L22 90" strokeWidth={S.P.strokeWidth} />
        <path d="M36 63 L36 90" strokeWidth={S.P.strokeWidth} />
        <path d="M50 62 L50 90" strokeWidth={S.P.strokeWidth} />
        <path d="M64 63 L64 90" strokeWidth={S.P.strokeWidth} />
        <path d="M78 65 L78 90" strokeWidth={S.P.strokeWidth} />
        <path d="M86 66 L86 90" strokeWidth={S.P.strokeWidthLight} opacity={S.D.opacityStrong} />

        {/* Column capitals with Victorian bracket detail */}
        <path d="M20 65 L24 65 L24 67 L20 67 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M34 63 L38 63 L38 65 L34 65 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M48 62 L52 62 L52 64 L48 64 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M62 63 L66 63 L66 65 L62 65 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M76 65 L80 65 L80 67 L76 67 Z" strokeWidth={S.D.strokeWidth} />

        {/* Decorative ironwork railings with scrolls */}
        <path d="M22 76 Q29 74, 36 76 Q43 74, 50 76" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 76 Q57 74, 64 76 Q71 74, 78 76" strokeWidth={S.P.strokeWidthLight} />
        <path d="M22 83 Q29 81, 36 83 Q43 81, 50 83" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 83 Q57 81, 64 83 Q71 81, 78 83" strokeWidth={S.P.strokeWidthLight} />

        {/* Ornate balusters with filigree */}
        <path d="M29 76 L29 83" strokeWidth={S.D.strokeWidth} />
        <circle cx="29" cy="79.5" r="1.5" strokeWidth={S.D.strokeWidth} />
        <path d="M43 76 L43 83" strokeWidth={S.D.strokeWidth} />
        <circle cx="43" cy="79.5" r="1.5" strokeWidth={S.D.strokeWidth} />
        <path d="M57 76 L57 83" strokeWidth={S.D.strokeWidth} />
        <circle cx="57" cy="79.5" r="1.5" strokeWidth={S.D.strokeWidth} />
        <path d="M71 76 L71 83" strokeWidth={S.D.strokeWidth} />
        <circle cx="71" cy="79.5" r="1.5" strokeWidth={S.D.strokeWidth} />

        {/* Floor platform - octagonal in 3/4 perspective */}
        <path d="M16 90 L30 86 L70 86 L84 90 L88 93 L12 93 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M22 88 L78 88" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Entry steps with decorative side rails */}
        <path d="M44 93 L44 98 L56 98 L56 93" strokeWidth={S.P.strokeWidthLight} />
        <path d="M46 95 L54 95" strokeWidth={S.D.strokeWidthFine} />
        <path d="M43 93 L40 98" strokeWidth={S.D.strokeWidth} />
        <path d="M57 93 L60 98" strokeWidth={S.D.strokeWidth} />

        {/* Decorative roof brackets between columns */}
        <path d="M26 65 Q30 62, 33 65" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M67 65 Q70 62, 74 65" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      </g>
    </g>
  </svg>
)

/**
 * GROTTO - Romantic Artificial Cave with Shell Decorations
 * Rustic rocky chamber with water feature and shell work
 * Reference: Stourhead grotto, Villa d'Este nymphaeum, Painswick Rococo Garden
 * View: Front view into cave opening showing interior chamber
 */
const GrottoSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="grotto-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#grotto-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Rocky hillside and surrounding landscape */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 85 L5 65 Q8 55, 15 48" />
        <path d="M95 85 L95 65 Q92 55, 85 48" />
        <path d="M5 85 L15 85" />
        <path d="M85 85 L95 85" />
        <ellipse cx="10" cy="88" rx="8" ry="4" />
        <ellipse cx="90" cy="88" rx="8" ry="4" />
        <path d="M8 72 Q12 70, 15 72" />
        <path d="M85 72 Q88 70, 92 72" />
      </g>

      {/* PRIMARY: Grotto structure */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Outer rocky facade - irregular natural stone */}
        <path d="M15 85 L8 65 Q10 50, 18 38 Q30 25, 45 18 Q55 15, 70 22 Q82 32, 88 48 Q92 60, 92 70 L85 85" strokeWidth={S.P.strokeWidth} />

        {/* Rock texture and fissures */}
        <path d="M12 58 L18 62 L16 66 L20 68" strokeWidth={S.P.strokeWidthLight} />
        <path d="M28 32 L34 36 L32 42 L36 45" strokeWidth={S.P.strokeWidthLight} />
        <path d="M68 28 L74 35 L72 40 L76 44" strokeWidth={S.P.strokeWidthLight} />
        <path d="M86 58 L82 64 L84 68 L80 72" strokeWidth={S.P.strokeWidthLight} />

        {/* Cave opening - organic irregular shape */}
        <path d="M22 82 L20 68 Q25 58, 35 50 Q45 44, 55 42 Q65 43, 73 50 Q80 58, 82 68 L78 82" strokeWidth={S.P.strokeWidth} />

        {/* Inner chamber depth */}
        <path d="M30 78 L28 70 Q35 62, 45 58 Q55 56, 65 60 Q72 66, 74 72 L70 78" strokeWidth={S.P.strokeWidthLight} />

        {/* Stalactites hanging from ceiling */}
        <path d="M32 50 L34 56 L33 60" strokeWidth={S.P.strokeWidthLight} />
        <path d="M42 46 L44 54 L43 59" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 44 L52 53 L51 58" strokeWidth={S.P.strokeWidthLight} />
        <path d="M58 46 L60 54 L59 59" strokeWidth={S.P.strokeWidthLight} />
        <path d="M68 50 L70 56 L69 60" strokeWidth={S.P.strokeWidthLight} />

        {/* Shell and mineral decorations - baroque grotesque style */}
        <circle cx="26" cy="66" r="3.5" strokeWidth={S.P.strokeWidthLight} />
        <path d="M24 66 L28 66" strokeWidth={S.D.strokeWidth} />
        <path d="M26 64 L26 68" strokeWidth={S.D.strokeWidth} />

        <circle cx="74" cy="66" r="3.5" strokeWidth={S.P.strokeWidthLight} />
        <path d="M72 66 L76 66" strokeWidth={S.D.strokeWidth} />
        <path d="M74 64 L74 68" strokeWidth={S.D.strokeWidth} />

        {/* Additional shell motifs */}
        <path d="M38 62 Q42 60, 40 58" strokeWidth={S.D.strokeWidth} />
        <path d="M36 62 Q40 64, 42 62" strokeWidth={S.D.strokeWidth} />
        <path d="M62 62 Q58 60, 60 58" strokeWidth={S.D.strokeWidth} />
        <path d="M64 62 Q60 64, 58 62" strokeWidth={S.D.strokeWidth} />

        {/* Water pool at base with reflections */}
        <ellipse cx="50" cy="78" rx="28" ry="8" strokeWidth={S.P.strokeWidthLight} />
        <ellipse cx="50" cy="80" rx="25" ry="6" strokeWidth={S.D.strokeWidth} />
        <path d="M30 77 Q40 80, 50 77 Q60 74, 70 77" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M35 78 Q45 79, 55 78 Q60 77, 65 78" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

        {/* Rock moss and ferns */}
        <path d="M24 75 Q22 72, 24 70" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M76 75 Q78 72, 76 70" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M18 52 Q16 48, 18 45" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Ground line */}
        <path d="M5 85 L95 85" strokeWidth={S.P.strokeWidthLight} />
      </g>
    </g>
  </svg>
)

/**
 * HA-HA - Sunken Fence Creating Uninterrupted View
 * Recessed wall boundary invisible from house, revealing landscape
 * Reference: Stowe landscape garden, Capability Brown estates, Blenheim Palace
 * View: Cross-section showing sunken ditch and retaining wall
 */
const HaHaSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="haha-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#haha-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (far): Parkland landscape and distant view */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        <path d="M5 45 Q15 43, 25 45 Q35 47, 45 45" />
        <ellipse cx="20" cy="38" rx="12" ry="8" />
        <ellipse cx="80" cy="25" rx="15" ry="10" />
        <path d="M60 35 Q70 33, 80 35 Q90 37, 95 35" />
        <path d="M5 50 L40 50" />
        <path d="M70 92 Q80 90, 90 92" />
      </g>

      {/* PRIMARY: Ha-ha sunken fence */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Upper lawn level (garden side) */}
        <path d="M5 50 L48 50" strokeWidth={S.P.strokeWidthLight} />

        {/* Gentle slope down to ditch */}
        <path d="M48 50 Q52 52, 55 56" strokeWidth={S.P.strokeWidthLight} />

        {/* Retaining wall - stone construction */}
        <path d="M55 56 L55 85" strokeWidth={S.P.strokeWidth} />

        {/* Stone masonry pattern in wall */}
        <path d="M50 60 L55 60 L58 62 L53 62 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M52 65 L55 65 L58 67 L53 67 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M50 70 L55 70 L58 72 L53 72 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M52 75 L55 75 L58 77 L53 77 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M50 80 L55 80 L58 82 L53 82 Z" strokeWidth={S.D.strokeWidth} />

        {/* Wall facing detail */}
        <path d="M55 62 L55 67" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M55 72 L55 77" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Ditch bottom */}
        <path d="M55 85 L58 90 L75 90 L78 85" strokeWidth={S.P.strokeWidthLight} />
        <path d="M60 88 Q67 89, 73 88" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

        {/* Far side slope up to pasture */}
        <path d="M78 85 Q82 82, 88 80" strokeWidth={S.P.strokeWidthLight} />

        {/* Upper pasture level (park side) */}
        <path d="M88 80 L95 80" strokeWidth={S.P.strokeWidthLight} />

        {/* Grass on slopes */}
        <path d="M52 53 Q54 52, 56 54" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M80 83 Q82 81, 84 82" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M86 81 Q88 79, 90 80" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Drainage detail in ditch */}
        <path d="M62 89 L65 89" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M68 89 L71 89" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

        {/* Cattle or sheep in distant pasture */}
        <ellipse cx="85" cy="78" rx="4" ry="2" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M83 78 L83 76" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />
        <path d="M87 78 L87 76" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />

        {/* Sight line showing unbroken view */}
        <path d="M5 48 L95 78" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} strokeDasharray="2 2" />
      </g>
    </g>
  </svg>
)

/**
 * OBELISK - Egyptian Monument in Formal Parterre
 * Tapering stone needle as garden focal point
 * Reference: Borghese Gardens obelisks, Stowe garden monuments, Place de la Concorde
 * View: Front elevation in formal boxwood parterre setting
 */
const ObeliskSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="obelisk-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#obelisk-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Formal parterre with gravel paths */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M15 95 L25 95" />
        <path d="M75 95 L85 95" />
        <ellipse cx="20" cy="88" rx="10" ry="4" />
        <ellipse cx="80" cy="88" rx="10" ry="4" />
        <path d="M35 92 Q40 90, 45 92" />
        <path d="M55 92 Q60 90, 65 92" />
        <path d="M10 85 L15 80 L15 85 Z" />
        <path d="M90 85 L85 80 L85 85 Z" />
      </g>

      {/* PRIMARY: Obelisk monument */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Pyramidion (gilded capstone) */}
        <path d="M50 5 L44 22 L56 22 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M50 5 L50 22" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M47 14 L53 14" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Main shaft - tapered monolith */}
        <path d="M44 22 L40 78 L60 78 L56 22" strokeWidth={S.P.strokeWidth} />

        {/* Center line showing monolithic nature */}
        <path d="M50 22 L50 78" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Hieroglyphic cartouches and inscriptions */}
        <path d="M46 28 L54 28 L54 35 L46 35 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M47 30 L53 30" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M47 32 L49 32" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M51 32 L53 32" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

        {/* Hieroglyphic symbols */}
        <circle cx="50" cy="42" r="3" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M47 50 L47 56" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M53 50 L53 56" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M50 53 L50 54" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Ankh symbol */}
        <circle cx="50" cy="62" r="2" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M50 64 L50 69" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M47 66 L53 66" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Base section with banding */}
        <path d="M39 78 L39 84 L61 84 L61 78" strokeWidth={S.P.strokeWidthLight} />
        <path d="M41 81 L59 81" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Second base tier */}
        <path d="M37 84 L37 89 L63 89 L63 84" strokeWidth={S.P.strokeWidthLight} />
        <path d="M39 86.5 L61 86.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Plinth foundation with corner volutes */}
        <path d="M34 89 L34 95 L66 95 L66 89" strokeWidth={S.P.strokeWidth} />
        <path d="M36 92 L64 92" strokeWidth={S.D.strokeWidth} />

        {/* Corner ornaments */}
        <circle cx="38" cy="90" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <circle cx="62" cy="90" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Paved circle around obelisk */}
        <ellipse cx="50" cy="95" rx="30" ry="6" strokeWidth={S.P.strokeWidthLight} />
        <path d="M25 93 Q50 96, 75 93" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Parterre hedge corners */}
        <path d="M20 90 L20 95" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M80 90 L80 95" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      </g>
    </g>
  </svg>
)

/**
 * PAGODA - Chinese Garden Tower with Tiered Roofs
 * Multi-story Oriental garden structure with upturned eaves
 * Reference: Kew Gardens Great Pagoda, Chanteloup Pagoda, Chinese tea houses
 * View: Front view showing characteristic tiered rooflines
 */
const PagodaSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pagoda-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#pagoda-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Oriental garden with water and rocks */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 90 L20 90" />
        <path d="M80 90 L95 90" />
        <ellipse cx="15" cy="82" rx="10" ry="6" />
        <ellipse cx="85" cy="82" rx="10" ry="6" />
        <path d="M10 78 Q15 76, 20 78" />
        <path d="M80 78 Q85 76, 90 78" />
        <path d="M25 88 Q35 86, 45 88" />
      </g>

      {/* PRIMARY: Chinese pagoda structure */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Top tier roof - smallest */}
        <path d="M50 8 L38 18 Q35 20, 38 22 L62 22 Q65 20, 62 18 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M38 18 L35 15" strokeWidth={S.D.strokeWidth} />
        <path d="M62 18 L65 15" strokeWidth={S.D.strokeWidth} />

        {/* Roof ornament - finial spire */}
        <path d="M50 8 L50 3" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="50" cy="3" r="2" strokeWidth={S.D.strokeWidth} />
        <path d="M48 10 L52 10" strokeWidth={S.D.strokeWidth} />

        {/* Top tier walls */}
        <path d="M42 22 L42 32 L58 32 L58 22" strokeWidth={S.P.strokeWidthLight} />
        <path d="M45 27 L55 27" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Second tier roof with upturned eaves */}
        <path d="M58 32 L70 40 Q74 42, 70 44 L30 44 Q26 42, 30 40 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M30 40 L26 36" strokeWidth={S.P.strokeWidthLight} />
        <path d="M70 40 L74 36" strokeWidth={S.P.strokeWidthLight} />

        {/* Decorative roof bells */}
        <circle cx="32" cy="38" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <circle cx="68" cy="38" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Second tier walls */}
        <path d="M36 44 L36 56 L64 56 L64 44" strokeWidth={S.P.strokeWidthLight} />
        <path d="M40 50 L60 50" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Window openings - moon gate style */}
        <circle cx="44" cy="50" r="3" strokeWidth={S.D.strokeWidth} />
        <circle cx="56" cy="50" r="3" strokeWidth={S.D.strokeWidth} />

        {/* Third tier roof - largest */}
        <path d="M64 56 L78 66 Q82 68, 78 70 L22 70 Q18 68, 22 66 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M22 66 L18 61" strokeWidth={S.P.strokeWidthLight} />
        <path d="M78 66 L82 61" strokeWidth={S.P.strokeWidthLight} />

        {/* Roof decoration and bells */}
        <circle cx="26" cy="64" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <circle cx="50" cy="64" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <circle cx="74" cy="64" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Ground floor walls */}
        <path d="M30 70 L30 88 L70 88 L70 70" strokeWidth={S.P.strokeWidthLight} />

        {/* Entrance door - traditional Chinese */}
        <path d="M44 78 L44 88 L56 88 L56 78 Q50 75, 44 78" strokeWidth={S.P.strokeWidthLight} />
        <path d="M46 80 L54 80" strokeWidth={S.D.strokeWidthFine} />
        <path d="M50 78 L50 88" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="48" cy="83" r="1" strokeWidth={S.D.strokeWidthFine} />

        {/* Lattice windows on ground floor */}
        <path d="M34 76 L40 76 L40 82 L34 82 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M34 79 L40 79" strokeWidth={S.E.strokeWidth} />
        <path d="M37 76 L37 82" strokeWidth={S.E.strokeWidth} />

        <path d="M60 76 L66 76 L66 82 L60 82 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M60 79 L66 79" strokeWidth={S.E.strokeWidth} />
        <path d="M63 76 L63 82" strokeWidth={S.E.strokeWidth} />

        {/* Stone platform base */}
        <path d="M26 88 L26 93 L74 93 L74 88" strokeWidth={S.P.strokeWidthLight} />
        <path d="M28 90.5 L72 90.5" strokeWidth={S.D.strokeWidthFine} />

        {/* Entry steps */}
        <path d="M42 93 L42 95 L58 95 L58 93" strokeWidth={S.P.strokeWidthLight} />
      </g>
    </g>
  </svg>
)

/**
 * PARTERRE - French Formal Garden Pattern
 * Geometric broderie design with boxwood hedges and colored gravels
 * Reference: Versailles Parterre du Midi, Vaux-le-Vicomte, Het Loo
 * View: Aerial/plan view showing intricate scrollwork pattern
 */
const ParterreSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="parterre-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#parterre-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Surrounding terrace and viewing paths */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 5 L5 95" />
        <path d="M95 5 L95 95" />
        <path d="M5 5 L95 5" />
        <path d="M5 95 L10 95" />
        <path d="M90 95 L95 95" />
        <ellipse cx="3" cy="50" rx="2" ry="10" />
        <ellipse cx="97" cy="50" rx="2" ry="10" />
        <circle cx="50" cy="3" r="2" strokeWidth="0.5" />
      </g>

      {/* PRIMARY: Parterre broderie pattern */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Outer border hedge */}
        <path d="M10 10 L90 10 L90 90 L10 90 Z" strokeWidth={S.P.strokeWidth} />

        {/* Inner border */}
        <path d="M15 15 L85 15 L85 85 L15 85 Z" strokeWidth={S.P.strokeWidthLight} />

        {/* Central circular bed with radiating paths */}
        <circle cx="50" cy="50" r="18" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="50" cy="50" r="12" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="50" cy="50" r="6" strokeWidth={S.D.strokeWidth} />

        {/* Central topiary or fountain */}
        <circle cx="50" cy="50" r="3" strokeWidth={S.P.strokeWidthLight} />

        {/* Corner scrollwork - baroque broderie style */}
        <path d="M20 20 Q18 25, 22 28 Q26 26, 24 30 Q28 32, 30 28 Q32 24, 28 22 Q26 18, 22 20 Q20 24, 20 20" strokeWidth={S.P.strokeWidthLight} />
        <path d="M80 20 Q82 25, 78 28 Q74 26, 76 30 Q72 32, 70 28 Q68 24, 72 22 Q74 18, 78 20 Q80 24, 80 20" strokeWidth={S.P.strokeWidthLight} />
        <path d="M20 80 Q18 75, 22 72 Q26 74, 24 70 Q28 68, 30 72 Q32 76, 28 78 Q26 82, 22 80 Q20 76, 20 80" strokeWidth={S.P.strokeWidthLight} />
        <path d="M80 80 Q82 75, 78 72 Q74 74, 76 70 Q72 68, 70 72 Q68 76, 72 78 Q74 82, 78 80 Q80 76, 80 80" strokeWidth={S.P.strokeWidthLight} />

        {/* Fleur-de-lis motifs in scrollwork */}
        <path d="M25 25 L25 22 Q25 20, 23 20" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M25 22 Q25 20, 27 20" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Side panel arabesques */}
        <path d="M50 15 Q45 18, 48 22 Q50 24, 52 22 Q55 18, 50 15" strokeWidth={S.D.strokeWidth} />
        <path d="M50 85 Q45 82, 48 78 Q50 76, 52 78 Q55 82, 50 85" strokeWidth={S.D.strokeWidth} />
        <path d="M15 50 Q18 45, 22 48 Q24 50, 22 52 Q18 55, 15 50" strokeWidth={S.D.strokeWidth} />
        <path d="M85 50 Q82 45, 78 48 Q76 50, 78 52 Q82 55, 85 50" strokeWidth={S.D.strokeWidth} />

        {/* Main paths - gravel in cruciform */}
        <path d="M50 10 L50 32" strokeWidth={S.P.strokeWidth} />
        <path d="M50 68 L50 90" strokeWidth={S.P.strokeWidth} />
        <path d="M10 50 L32 50" strokeWidth={S.P.strokeWidth} />
        <path d="M68 50 L90 50" strokeWidth={S.P.strokeWidth} />

        {/* Intermediate beds with C-scrolls */}
        <path d="M35 30 Q30 28, 32 24 Q36 22, 38 26 Q36 30, 35 30" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M65 30 Q70 28, 68 24 Q64 22, 62 26 Q64 30, 65 30" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M35 70 Q30 72, 32 76 Q36 78, 38 74 Q36 70, 35 70" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M65 70 Q70 72, 68 76 Q64 78, 62 74 Q64 70, 65 70" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Accent topiary cones at cardinal points */}
        <circle cx="50" cy="25" r="2.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <circle cx="50" cy="75" r="2.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <circle cx="25" cy="50" r="2.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <circle cx="75" cy="50" r="2.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Colored gravel textures (suggested) */}
        <path d="M22 35 Q26 33, 30 35" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M70 35 Q74 33, 78 35" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M35 55 Q40 53, 45 55" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
      </g>
    </g>
  </svg>
)

/**
 * PERGOLA - Garden Walkway with Grape Vines
 * Post and beam structure supporting Vitis vinifera
 * Reference: Italian villa pergolas, Sissinghurst lime walk, Arts & Crafts gardens
 * View: Perspective down pergola passage showing overhead vine canopy
 */
const PergolaSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pergola-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#pergola-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Garden borders and planting beds */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 90 L10 90" />
        <path d="M90 90 L95 90" />
        <ellipse cx="8" cy="72" rx="6" ry="10" />
        <ellipse cx="92" cy="72" rx="6" ry="10" />
        <path d="M12 88 Q20 86, 28 88" />
        <path d="M72 88 Q80 86, 88 88" />
        <path d="M30 92 L35 88 L75 88 L80 92" />
      </g>

      {/* PRIMARY: Pergola with grape vines */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Vertical posts - rustic timber */}
        <path d="M15 28 L15 90" strokeWidth={S.P.strokeWidth} />
        <path d="M35 28 L35 90" strokeWidth={S.P.strokeWidth} />
        <path d="M65 28 L65 90" strokeWidth={S.P.strokeWidth} />
        <path d="M85 28 L85 90" strokeWidth={S.P.strokeWidth} />

        {/* Post caps/finials */}
        <path d="M13 28 L17 28 L17 30 L13 30 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M33 28 L37 28 L37 30 L33 30 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M63 28 L67 28 L67 30 L63 30 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M83 28 L87 28 L87 30 L83 30 Z" strokeWidth={S.D.strokeWidth} />

        {/* Main longitudinal beams */}
        <path d="M10 28 L90 28" strokeWidth={S.P.strokeWidthBold} />
        <path d="M10 33 L90 33" strokeWidth={S.P.strokeWidthBold} />

        {/* Cross rafters creating overhead grid */}
        {[16, 23, 30, 37, 44, 51, 58, 65, 72, 79, 86].map((x, i) => (
          <path key={i} d={`M${x} 24 L${x} 38`} strokeWidth={S.P.strokeWidthLight} />
        ))}

        {/* Grape vine trunks climbing posts */}
        <path d="M15 90 Q18 85, 16 80 Q19 75, 17 70 Q20 65, 18 60 Q21 55, 19 50 Q22 45, 20 40 Q23 35, 21 30" strokeWidth={S.P.strokeWidthLight} />
        <path d="M35 90 Q32 85, 34 80 Q31 75, 33 70 Q30 65, 32 60 Q29 55, 31 50 Q28 45, 30 40 Q27 35, 29 30" strokeWidth={S.P.strokeWidthLight} />
        <path d="M65 90 Q68 85, 66 80 Q69 75, 67 70 Q70 65, 68 60 Q71 55, 69 50 Q72 45, 70 40 Q73 35, 71 30" strokeWidth={S.P.strokeWidthLight} />
        <path d="M85 90 Q82 85, 84 80 Q81 75, 83 70 Q80 65, 82 60 Q79 55, 81 50 Q78 45, 80 40 Q77 35, 79 30" strokeWidth={S.P.strokeWidthLight} />

        {/* Grape vines spreading over rafters */}
        <path d="M20 30 Q25 28, 28 32 Q32 30, 35 34" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M40 32 Q45 29, 48 33 Q52 31, 56 35" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M60 34 Q65 31, 68 35 Q72 33, 76 36" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Grape leaf clusters */}
        <path d="M24 35 Q27 33, 26 37" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M32 33 Q35 31, 34 35" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M46 34 Q49 32, 48 36" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M54 36 Q57 34, 56 38" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M70 37 Q73 35, 72 39" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Hanging grape bunches */}
        <ellipse cx="28" cy="38" rx="2" ry="3.5" strokeWidth={S.D.strokeWidth} />
        <circle cx="27" cy="37" r="1" strokeWidth={S.D.strokeWidth} />
        <circle cx="29" cy="37" r="1" strokeWidth={S.D.strokeWidth} />
        <circle cx="28" cy="39" r="1" strokeWidth={S.D.strokeWidth} />

        <ellipse cx="50" cy="40" rx="2" ry="3.5" strokeWidth={S.D.strokeWidth} />
        <circle cx="49" cy="39" r="1" strokeWidth={S.D.strokeWidth} />
        <circle cx="51" cy="39" r="1" strokeWidth={S.D.strokeWidth} />
        <circle cx="50" cy="41" r="1" strokeWidth={S.D.strokeWidth} />

        <ellipse cx="72" cy="41" rx="2" ry="3.5" strokeWidth={S.D.strokeWidth} />
        <circle cx="71" cy="40" r="1" strokeWidth={S.D.strokeWidth} />
        <circle cx="73" cy="40" r="1" strokeWidth={S.D.strokeWidth} />
        <circle cx="72" cy="42" r="1" strokeWidth={S.D.strokeWidth} />

        {/* Vine tendrils */}
        <path d="M38 36 Q40 34, 42 36" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M62 38 Q64 36, 66 38" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Ground path */}
        <path d="M10 90 L90 90" strokeWidth={S.P.strokeWidthLight} />
      </g>
    </g>
  </svg>
)

/**
 * SUNDIAL - Garden Timepiece on Pedestal in Herb Garden
 * Horizontal dial with gnomon in culinary planting
 * Reference: Hampton Court sundials, monastery garden horologes, Arts & Crafts designs
 * View: Three-quarter view showing dial plate and herb borders
 */
const SundialSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="sundial-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#sundial-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Herb garden quadrants and paths */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M18 95 L28 95" />
        <path d="M72 95 L82 95" />
        <path d="M12 90 Q20 88, 28 90" />
        <path d="M72 90 Q80 88, 88 90" />
        <ellipse cx="20" cy="83" rx="9" ry="5" />
        <ellipse cx="80" cy="83" rx="9" ry="5" />
        <path d="M15 85 L18 82 L22 85" />
        <path d="M78 85 L82 82 L85 85" />
      </g>

      {/* PRIMARY: Sundial on pedestal */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Base plinth with decorative molding */}
        <path d="M30 90 L70 90 L72 95 L28 95 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M32 92.5 L68 92.5" strokeWidth={S.D.strokeWidthFine} />

        {/* Lower pedestal section */}
        <path d="M34 90 L34 78 L66 78 L66 90" strokeWidth={S.P.strokeWidthLight} />
        <path d="M36 84 L64 84" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Middle baluster section */}
        <path d="M38 78 L38 68 Q50 63, 62 68 L62 78" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="50" cy="73" r="4" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Upper capital */}
        <path d="M36 68 L36 63 L64 63 L64 68" strokeWidth={S.P.strokeWidthLight} />
        <path d="M38 65.5 L62 65.5" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Abacus (top of pedestal) */}
        <path d="M34 63 L34 58 L66 58 L66 63" strokeWidth={S.P.strokeWidthLight} />

        {/* Dial plate (in perspective) - bronze or stone */}
        <ellipse cx="50" cy="48" rx="26" ry="12" strokeWidth={S.P.strokeWidth} />
        <ellipse cx="50" cy="48" rx="23" ry="10" strokeWidth={S.D.strokeWidth} />

        {/* Hour lines radiating from center (12 hours) */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x1 = 50 + 9 * Math.cos(rad)
          const y1 = 48 + 4 * Math.sin(rad)
          const x2 = 50 + 21 * Math.cos(rad)
          const y2 = 48 + 9.5 * Math.sin(rad)
          return <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} strokeWidth={S.D.strokeWidth} />
        })}

        {/* Gnomon (style casting shadow) - triangular */}
        <path d="M50 48 L50 28" strokeWidth={S.P.strokeWidth} />
        <path d="M50 48 L56 33 L50 28" strokeWidth={S.P.strokeWidthLight} />
        <path d="M48 38 L52 38" strokeWidth={S.D.strokeWidth} />

        {/* Shadow indication (diagonal) */}
        <path d="M50 48 L68 52 L71 53" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Roman numeral positions (indicated by dots) */}
        <circle cx="73" cy="48" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <circle cx="68" cy="54" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <circle cx="50" cy="56" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <circle cx="32" cy="54" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <circle cx="27" cy="48" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <circle cx="32" cy="42" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <circle cx="50" cy="40" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <circle cx="68" cy="42" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Motto inscription on rim */}
        <path d="M40 46 L44 46" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M46 46 L50 46" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M52 46 L56 46" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Compass rose decoration at edge */}
        <path d="M50 56 L50 58" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M48 57 L52 57" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Herb plantings around base */}
        <path d="M26 82 Q28 80, 30 82" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M70 82 Q72 80, 74 82" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      </g>
    </g>
  </svg>
)

/**
 * TOPIARY - Formal Shaped Hedges in Tiered Forms
 * Sculpted Buxus sempervirens in geometric shapes
 * Reference: Levens Hall topiary, Versailles orangerie, Dutch formal gardens
 * View: Front view showing multi-tiered topiary specimens
 */
const TopiarySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="topiary-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#topiary-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Formal garden terrace and gravel */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M18 95 L26 95" />
        <path d="M74 95 L82 95" />
        <ellipse cx="15" cy="88" rx="10" ry="4" />
        <ellipse cx="85" cy="88" rx="10" ry="4" />
        <path d="M10 86 Q15 84, 20 86" />
        <path d="M80 86 Q85 84, 90 86" />
        <path d="M28 92 L35 92" />
        <path d="M65 92 L72 92" />
      </g>

      {/* PRIMARY: Topiary sculpture - three-tier cone */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Ornamental Versailles planter box */}
        <path d="M34 84 L30 95 L70 95 L66 84" strokeWidth={S.P.strokeWidthLight} />
        <path d="M32 84 L68 84 L69 88 L31 88 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M33 86 L67 86" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Decorative panel on planter */}
        <path d="M40 86 L40 92 L45 92 L45 86 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M55 86 L55 92 L60 92 L60 86 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Main trunk/stems */}
        <path d="M48 84 L48 68" strokeWidth={S.P.strokeWidth} />
        <path d="M52 84 L52 68" strokeWidth={S.P.strokeWidth} />

        {/* Bottom tier - largest sphere */}
        <circle cx="50" cy="60" r="16" strokeWidth={S.P.strokeWidth} />
        <path d="M37 54 Q42 51, 48 54 Q54 52, 60 55" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M38 60 Q44 58, 50 60 Q56 58, 62 60" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M40 66 Q46 64, 52 66 Q57 64, 62 66" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Foliage texture on bottom tier */}
        <path d="M42 58 Q44 56, 46 58" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M54 58 Q56 56, 58 58" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M38 63 Q40 61, 42 63" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M58 63 Q60 61, 62 63" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Connecting stem to middle tier */}
        <path d="M50 44 L50 50" strokeWidth={S.P.strokeWidthLight} />

        {/* Middle tier - medium sphere */}
        <circle cx="50" cy="36" r="12" strokeWidth={S.P.strokeWidth} />
        <path d="M41 32 Q45 29, 50 32 Q55 30, 59 33" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M42 36 Q46 34, 50 36 Q54 34, 58 36" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M44 40 Q48 38, 52 40 Q54 39, 56 40" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Foliage texture on middle tier */}
        <path d="M44 34 Q46 32, 48 34" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M52 34 Q54 32, 56 34" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Connecting stem to top tier */}
        <path d="M50 24 L50 28" strokeWidth={S.D.strokeWidth} />

        {/* Top tier - smallest sphere */}
        <circle cx="50" cy="17" r="8" strokeWidth={S.P.strokeWidth} />
        <path d="M45 14 Q47.5 12, 50 14 Q52.5 12, 55 15" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M45 17 Q47.5 16, 50 17 Q52.5 16, 55 17" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M46 20 Q48 19, 50 20 Q52 19, 54 20" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Foliage texture on top tier */}
        <path d="M47 15 Q48.5 13.5, 50 15" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M50 15 Q51.5 13.5, 53 15" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Finial point at apex */}
        <path d="M50 9 L50 6" strokeWidth={S.D.strokeWidth} />
        <circle cx="50" cy="6" r="1.5" strokeWidth={S.D.strokeWidth} />

        {/* Ground reference */}
        <path d="M20 95 L80 95" strokeWidth={S.P.strokeWidthLight} />
      </g>
    </g>
  </svg>
)

/**
 * TRELLIS - Wall-Mounted Lattice with Climbing Roses
 * Diamond-pattern framework supporting Rosa 'Zéphirine Drouhin'
 * Reference: Mottisfont Abbey rose garden, Sissinghurst rose walls
 * View: Front elevation showing trellis against brick wall with climbers
 */
const TrellisSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="trellis-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#trellis-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Brick wall and garden border */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 10 L5 90" />
        <path d="M95 10 L95 90" />
        <path d="M5 50 L10 50" />
        <path d="M90 50 L95 50" />
        <ellipse cx="8" cy="92" rx="8" ry="3" />
        <ellipse cx="92" cy="92" rx="8" ry="3" />
        <path d="M12 88 Q22 86, 32 88" />
        <path d="M68 88 Q78 86, 88 88" />
        <path d="M8 30 L12 30 L12 35 L8 35 Z" />
        <path d="M8 60 L12 60 L12 65 L8 65 Z" />
        <path d="M88 30 L92 30 L92 35 L88 35 Z" />
      </g>

      {/* PRIMARY: Trellis lattice structure */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Outer frame - mounted to wall */}
        <path d="M15 8 L15 90" strokeWidth={S.P.strokeWidth} />
        <path d="M85 8 L85 90" strokeWidth={S.P.strokeWidth} />
        <path d="M15 8 L85 8" strokeWidth={S.P.strokeWidth} />
        <path d="M15 90 L85 90" strokeWidth={S.P.strokeWidth} />

        {/* Diamond lattice pattern - diagonal slats */}
        <path d="M15 28 L40 8 L65 28 L85 8" strokeWidth={S.D.strokeWidth} />
        <path d="M15 48 L40 28 L65 48 L85 28" strokeWidth={S.D.strokeWidth} />
        <path d="M15 68 L40 48 L65 68 L85 48" strokeWidth={S.D.strokeWidth} />
        <path d="M15 88 L40 68 L65 88 L85 68" strokeWidth={S.D.strokeWidth} />

        <path d="M15 8 L35 28 L60 8 L85 28" strokeWidth={S.D.strokeWidth} />
        <path d="M15 28 L35 48 L60 28 L85 48" strokeWidth={S.D.strokeWidth} />
        <path d="M15 48 L35 68 L60 48 L85 68" strokeWidth={S.D.strokeWidth} />
        <path d="M15 68 L35 88 L60 68 L85 88" strokeWidth={S.D.strokeWidth} />

        {/* Wall mounting brackets */}
        <path d="M15 20 L12 20" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M15 50 L12 50" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M15 80 L12 80" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M85 20 L88 20" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M85 50 L88 50" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M85 80 L88 80" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Climbing rose - main canes */}
        <path d="M18 88 Q22 82, 20 76 Q24 70, 22 64 Q28 58, 26 52 Q32 46, 30 40 Q36 34, 34 28 Q40 22, 38 16" strokeWidth={S.P.strokeWidthLight} />
        <path d="M82 88 Q78 82, 80 76 Q76 70, 78 64 Q72 58, 74 52 Q68 46, 70 40 Q64 34, 66 28 Q60 22, 62 16" strokeWidth={S.P.strokeWidthLight} />

        {/* Secondary climbing canes */}
        <path d="M35 84 Q40 78, 38 72 Q44 66, 42 60 Q48 54, 46 48 Q52 42, 50 36" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M65 84 Q60 78, 62 72 Q56 66, 58 60 Q52 54, 54 48 Q48 42, 50 36" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Rose blooms - clustered */}
        <circle cx="26" cy="70" r="3.5" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="32" cy="58" r="3" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="38" cy="46" r="3.5" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="42" cy="64" r="3" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="50" cy="40" r="3.5" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="58" cy="64" r="3" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="62" cy="46" r="3.5" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="68" cy="58" r="3" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="74" cy="70" r="3.5" strokeWidth={S.P.strokeWidthLight} />

        {/* Rose buds (smaller) */}
        <circle cx="24" cy="62" r="2" strokeWidth={S.D.strokeWidth} />
        <circle cx="36" cy="52" r="2" strokeWidth={S.D.strokeWidth} />
        <circle cx="48" cy="56" r="2" strokeWidth={S.D.strokeWidth} />
        <circle cx="52" cy="48" r="2" strokeWidth={S.D.strokeWidth} />
        <circle cx="64" cy="52" r="2" strokeWidth={S.D.strokeWidth} />
        <circle cx="76" cy="62" r="2" strokeWidth={S.D.strokeWidth} />

        {/* Foliage clusters */}
        <path d="M28 66 Q30 64, 32 66" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M40 54 Q42 52, 44 54" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M50 44 Q52 42, 54 44" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M60 54 Q62 52, 64 54" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M72 66 Q74 64, 76 66" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Leaves on stems */}
        <path d="M22 74 Q20 72, 22 70" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M30 62 Q28 60, 30 58" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M70 62 Q72 60, 70 58" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M78 74 Q80 72, 78 70" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Ground planting bed */}
        <path d="M10 90 L90 90 L92 95 L8 95 Z" strokeWidth={S.P.strokeWidthLight} />
      </g>
    </g>
  </svg>
)

// Export mapping for all garden elements
export const GARDEN_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'arbor': ArborSVG,
  'bench': BenchSVG,
  'folly': FollySVG,
  'fountain': FountainSVG,
  'gazebo': GazeboSVG,
  'grotto': GrottoSVG,
  'haha': HaHaSVG,
  'obelisk': ObeliskSVG,
  'pagoda': PagodaSVG,
  'parterre': ParterreSVG,
  'pergola': PergolaSVG,
  'sundial': SundialSVG,
  'topiary': TopiarySVG,
  'trellis': TrellisSVG,
}

export {
  ArborSVG,
  BenchSVG,
  FollySVG,
  FountainSVG,
  GazeboSVG,
  GrottoSVG,
  HaHaSVG,
  ObeliskSVG,
  PagodaSVG,
  ParterreSVG,
  PergolaSVG,
  SundialSVG,
  TopiarySVG,
  TrellisSVG,
}
