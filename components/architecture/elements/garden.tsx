'use client'

import React from 'react'
import { S } from './svgStyleTokens'

const HaloFilter = () => (
  <defs>
    <filter id="garden-halo" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
      <feColorMatrix in="blur" type="matrix"
        values="0 0 0 0 0.96  0 0 0 0 0.62  0 0 0 0 0.04  0 0 0 0.8 0" result="glow" />
      <feMerge>
        <feMergeNode in="glow" /><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
)

interface SVGProps { showHalo?: boolean }

// ============================================================================
// ARBOR - 3/4 view of a rustic wooden garden archway with climbing roses.
// Shows the timber frame depth, cross-bracing visible through the passage,
// and rose canes with blooms cascading over the barrel-like canopy.
// Reference: Sissinghurst Castle Garden, Gertrude Jekyll rose arches
// ============================================================================
export const ArborSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Garden path extending beyond */}
    <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
      <path d="M 38 92 L 38 96 L 62 96 L 62 92" />
      <path d="M 42 94 L 58 94" />
    </g>

    {/* CONTEXT (near): Gravel path and surrounding borders */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <ellipse cx="12" cy="74" rx="9" ry="6" />
      <ellipse cx="88" cy="74" rx="9" ry="6" />
      <path d="M 5 90 L 95 90" strokeWidth="0.8" />
      <path d="M 35 92 L 65 92" />
    </g>

    {/* 3D shading — right post and arch depth shadow */}
    <path d="M 75 28 L 82 25 L 82 90 L 75 90 Z"
          fill="currentColor" opacity="0.1" stroke="none" />
    {/* 3D shading — arch canopy underside */}
    <path d="M 25 28 Q 50 10, 75 28 L 70 30 Q 50 15, 30 30 Z"
          fill="currentColor" opacity="0.07" stroke="none" />

    {/* PRIMARY: THE ARBOR — timber frame with roses */}
    <g filter={showHalo ? "url(#garden-halo)" : undefined}>
      {/* Left posts — front and side face */}
      <path d="M 20 28 L 20 90" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 25 28 L 25 90" strokeWidth={S.P.strokeWidth} />
      <path d="M 20 28 L 25 28" strokeWidth={S.P.strokeWidthLight} />

      {/* Right posts — front and side face */}
      <path d="M 75 28 L 75 90" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 80 28 L 80 90" strokeWidth={S.P.strokeWidth} />
      <path d="M 75 28 L 80 28" strokeWidth={S.P.strokeWidthLight} />

      {/* Main arch — front face */}
      <path d="M 20 28 Q 50 3, 80 28"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Arch — rear face showing depth */}
      <path d="M 25 28 Q 50 8, 75 28"
            strokeWidth={S.P.strokeWidth} />
      {/* Depth connecting front to rear arch */}
      <path d="M 28 24 Q 50 10, 72 24" strokeWidth={S.P.strokeWidthLight} opacity="0.6" />

      {/* Rose canes climbing left post */}
      <path d="M 22 80 Q 27 75, 24 70 Q 29 65, 26 60 Q 31 55, 28 50 Q 33 45, 30 40 Q 35 35, 32 30"
            strokeWidth={S.P.strokeWidthLight} />
      {/* Rose canes climbing right post */}
      <path d="M 78 80 Q 73 75, 76 70 Q 71 65, 74 60 Q 69 55, 72 50 Q 67 45, 70 40 Q 65 35, 68 30"
            strokeWidth={S.P.strokeWidthLight} />

      {/* Rose blooms — 3D spheres along arch */}
      <circle cx="35" cy="22" r="3.5" strokeWidth={S.P.strokeWidthLight} />
      <circle cx="42" cy="18" r="3" strokeWidth={S.P.strokeWidthLight} />
      <circle cx="50" cy="15" r="3.5" strokeWidth={S.P.strokeWidthLight} />
      <circle cx="58" cy="18" r="3" strokeWidth={S.P.strokeWidthLight} />
      <circle cx="65" cy="22" r="3.5" strokeWidth={S.P.strokeWidthLight} />

      {/* DETAIL: Foliage clusters */}
      <path d="M 34 25 Q 37 23, 36 27" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      <path d="M 56 20 Q 59 18, 58 22" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      <path d="M 26 52 Q 29 50, 28 54" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      <path d="M 74 52 Q 71 50, 72 54" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
    </g>
  </svg>
)

// ============================================================================
// BENCH - 3/4 view of a classical garden bench showing seat depth, armrests,
// backrest slats, and turned legs with cross-stretcher visible beneath.
// Reference: Versailles garden benches, Lutyens-style benches
// ============================================================================
export const BenchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (near): Formal parterre garden setting */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 5 92 L 95 92" />
      <ellipse cx="15" cy="80" rx="10" ry="7" />
      <ellipse cx="85" cy="80" rx="10" ry="7" />
    </g>

    {/* 3D shading — seat surface depth and back shadow */}
    <path d="M 18 62 L 82 62 L 86 65 L 22 65 Z"
          fill="currentColor" opacity="0.08" stroke="none" />
    {/* 3D shading — right side face */}
    <path d="M 78 35 L 84 38 L 84 90 L 78 90 Z"
          fill="currentColor" opacity="0.1" stroke="none" />

    {/* PRIMARY: THE BENCH — 3D form with visible depth */}
    <g filter={showHalo ? "url(#garden-halo)" : undefined}>
      {/* Back rest posts — front face */}
      <path d="M 22 35 L 22 65" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 78 35 L 78 65" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Decorative finials */}
      <circle cx="22" cy="32" r="3" strokeWidth={S.P.strokeWidthLight} />
      <circle cx="78" cy="32" r="3" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 22 29 L 22 25" strokeWidth={S.P.strokeWidth} />
      <path d="M 78 29 L 78 25" strokeWidth={S.P.strokeWidth} />

      {/* Top rail — curved with depth */}
      <path d="M 22 42 Q 50 38, 78 42" strokeWidth={S.P.strokeWidth} />
      <path d="M 22 45 Q 50 41, 78 45" strokeWidth={S.P.strokeWidthLight} opacity="0.6" />

      {/* Vertical slats */}
      <path d="M 30 45 L 30 62" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 38 44 L 38 62" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 46 43 L 46 62" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 54 43 L 54 62" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 62 44 L 62 62" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 70 45 L 70 62" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* Seat surface — front edge */}
      <path d="M 18 62 L 82 62" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Seat surface — back edge */}
      <path d="M 20 65 L 80 65" strokeWidth={S.P.strokeWidthLight} />
      {/* Seat depth sides */}
      <path d="M 18 62 L 20 65" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 82 62 L 80 65" strokeWidth={S.P.strokeWidthLight} />

      {/* Front legs with turnings */}
      <path d="M 25 65 L 25 90" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 75 65 L 75 90" strokeWidth={S.P.strokeWidthLight} />
      <circle cx="25" cy="75" r="2" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      <circle cx="75" cy="75" r="2" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

      {/* Back legs */}
      <path d="M 22 65 L 22 90" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 78 65 L 78 90" strokeWidth={S.P.strokeWidthLight} />

      {/* Cross stretcher — 3D visible */}
      <path d="M 25 82 L 75 82" strokeWidth={S.P.strokeWidthLight} />

      {/* Armrests — 3D with thickness */}
      <path d="M 20 55 Q 22 52, 25 55 L 25 62" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 80 55 Q 78 52, 75 55 L 75 62" strokeWidth={S.P.strokeWidthLight} />
    </g>
  </svg>
)

// ============================================================================
// FOLLY - 3/4 view of a Gothic Revival tower ruin in a romantic landscape.
// Shows wall thickness via crumbling section, battlements with depth, and
// a pointed arch window revealing interior darkness.
// Reference: Wimpole Estate Gothic Tower, Painshill Park
// ============================================================================
export const FollySVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Romantic landscape with distant trees */}
    <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
      <path d="M 5 88 Q 15 85, 25 88 Q 35 90, 45 88" />
      <ellipse cx="12" cy="78" rx="8" ry="6" />
      <ellipse cx="88" cy="80" rx="10" ry="7" />
    </g>

    {/* 3D shading — right tower wall face in shadow */}
    <path d="M 62 30 L 72 35 L 70 85 L 62 85 Z"
          fill="currentColor" opacity="0.12" stroke="none" />
    {/* 3D shading — interior darkness through window */}
    <path d="M 42 45 L 42 60 Q 50 55, 58 60 L 58 45 Q 50 40, 42 45 Z"
          fill="currentColor" opacity="0.1" stroke="none" />

    {/* PRIMARY: THE FOLLY — Gothic ruined tower */}
    <g filter={showHalo ? "url(#garden-halo)" : undefined}>
      {/* Main tower — front face */}
      <path d="M 30 85 L 28 35 L 38 30 L 62 30 L 72 35 L 70 85"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Tower side face — 3D depth */}
      <path d="M 62 30 L 72 35 L 70 85"
            strokeWidth={S.P.strokeWidth} />

      {/* Crenellations with depth */}
      <path d="M 26 35 L 26 30 L 32 30 L 32 35" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 36 35 L 36 28 L 42 28 L 42 35" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 46 35 L 46 27 L 54 27 L 54 35" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 58 35 L 58 28 L 64 28 L 64 35" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 68 35 L 68 30 L 74 30 L 74 35" strokeWidth={S.P.strokeWidthLight} />

      {/* Gothic pointed arch window */}
      <path d="M 42 45 L 42 60 Q 50 55, 58 60 L 58 45 Q 50 40, 42 45"
            strokeWidth={S.P.strokeWidthLight} />
      <path d="M 45 48 L 45 58 Q 50 54, 55 58 L 55 48"
            strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* Ruined section — crumbling wall showing thickness */}
      <path d="M 65 50 L 68 50 L 68 55 L 65 58" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 32 60 L 28 62 L 30 66" strokeWidth={S.P.strokeWidthLight} />

      {/* DETAIL: Stone masonry joints */}
      <path d="M 32 38 L 48 38" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
      <path d="M 54 38 L 68 38" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
      <path d="M 30 48 L 40 48" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
      <path d="M 60 48 L 70 48" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />

      {/* Ivy growing on tower */}
      <path d="M 70 75 Q 74 72, 72 68 Q 76 65, 74 62" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      <path d="M 28 58 Q 25 55, 27 52" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

      {/* Fallen stonework */}
      <path d="M 75 82 L 82 80 L 84 85 L 77 87 Z" strokeWidth={S.P.strokeWidthLight} />

      {/* Base platform with depth */}
      <path d="M 25 85 L 75 85 L 78 90 L 22 90 Z" strokeWidth={S.P.strokeWidthLight} />
    </g>
  </svg>
)

// ============================================================================
// FOUNTAIN - 3/4 view of a baroque multi-tiered water fountain showing
// cylindrical basin tiers with elliptical rims, cascading water, and
// ornamental sculpture at the top.
// Reference: Villa d'Este fountains, Boboli Gardens
// ============================================================================
export const FountainSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (near): Paved plaza surrounding */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <ellipse cx="50" cy="92" rx="42" ry="8" strokeWidth="0.8" />
      <path d="M 5 92 L 20 92" />
      <path d="M 80 92 L 95 92" />
    </g>

    {/* 3D shading — main basin far side */}
    <path d="M 50 68 Q 70 70, 78 74 Q 84 78, 80 82 L 68 80 Q 72 76, 68 72 Q 60 70, 50 70 Z"
          fill="currentColor" opacity="0.1" stroke="none" />
    {/* 3D shading — upper basin far side */}
    <path d="M 50 32 Q 58 34, 62 36 L 60 40 Q 56 38, 50 36 Z"
          fill="currentColor" opacity="0.08" stroke="none" />

    {/* PRIMARY: THE FOUNTAIN — tiered basins with water */}
    <g filter={showHalo ? "url(#garden-halo)" : undefined}>
      {/* Finial ornament */}
      <circle cx="50" cy="8" r="3" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 50 5 L 50 3" strokeWidth={S.D.strokeWidth} />

      {/* Central water jet */}
      <path d="M 50 11 L 50 28" strokeWidth={S.P.strokeWidthLight} />

      {/* Upper basin — elliptical rim showing 3D */}
      <ellipse cx="50" cy="32" rx="14" ry="5"
               strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Upper basin cylinder */}
      <path d="M 36 32 L 36 38 Q 50 44, 64 38 L 64 32"
            strokeWidth={S.P.strokeWidthLight} />

      {/* Pedestal between tiers */}
      <path d="M 46 38 L 46 48 L 54 48 L 54 38" strokeWidth={S.P.strokeWidthLight} />

      {/* Middle basin — larger */}
      <ellipse cx="50" cy="52" rx="22" ry="7"
               strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Middle basin cylinder */}
      <path d="M 28 52 L 28 60 Q 50 68, 72 60 L 72 52"
            strokeWidth={S.P.strokeWidth} />

      {/* Lower pedestal */}
      <path d="M 42 60 L 42 68 L 58 68 L 58 60" strokeWidth={S.P.strokeWidthLight} />

      {/* Main basin — largest */}
      <ellipse cx="50" cy="72" rx="32" ry="9"
               strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      {/* Main basin wall */}
      <path d="M 18 72 L 18 82 Q 50 92, 82 82 L 82 72"
            strokeWidth={S.P.strokeWidthBold} />

      {/* DETAIL: Ornamental rim */}
      <circle cx="35" cy="70" r="2" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <circle cx="50" cy="70" r="2" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <circle cx="65" cy="70" r="2" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
    </g>

    {/* EFFECTS: Cascading water */}
    <g strokeDasharray={S.E.dash} opacity={S.E.opacityModerate} strokeWidth={S.E.strokeWidth}>
      <path d="M 36 36 Q 32 42, 34 48" />
      <path d="M 64 36 Q 68 42, 66 48" />
      <path d="M 28 56 Q 24 62, 22 68" />
      <path d="M 72 56 Q 76 62, 78 68" />
    </g>
  </svg>
)

// ============================================================================
// GAZEBO - 3/4 view of a Victorian garden pavilion showing the octagonal
// plan with visible side columns, tiered bell-curved roof with finial,
// decorative ironwork railings, and entry steps.
// Reference: Central Park Ladies Pavilion, Kew Gardens
// ============================================================================
export const GazeboSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (near): Lawn and garden paths */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <ellipse cx="12" cy="86" rx="10" ry="5" />
      <ellipse cx="88" cy="86" rx="10" ry="5" />
      <path d="M 5 95 L 20 95 M 80 95 L 95 95" />
    </g>

    {/* 3D shading — right roof face in shadow */}
    <path d="M 50 6 Q 68 16, 78 35 L 86 62 L 78 60 L 72 38 Q 64 22, 50 12 Z"
          fill="currentColor" opacity="0.09" stroke="none" />
    {/* 3D shading — interior floor */}
    <path d="M 16 90 L 30 86 L 70 86 L 84 90 Z"
          fill="currentColor" opacity="0.06" stroke="none" />

    {/* PRIMARY: THE GAZEBO — octagonal pavilion with tiered roof */}
    <g filter={showHalo ? "url(#garden-halo)" : undefined}>
      {/* Upper roof tier — bell curve */}
      <path d="M 50 6 Q 35 18, 28 28 Q 24 33, 22 35"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 50 6 Q 65 18, 72 28 Q 76 33, 78 35"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 22 35 Q 50 31, 78 35" strokeWidth={S.P.strokeWidthLight} />

      {/* Lower roof tier */}
      <path d="M 22 35 Q 18 45, 16 55 Q 14 60, 14 62"
            strokeWidth={S.P.strokeWidth} />
      <path d="M 78 35 Q 82 45, 84 55 Q 86 60, 86 62"
            strokeWidth={S.P.strokeWidth} />
      <path d="M 14 62 Q 50 56, 86 62" strokeWidth={S.P.strokeWidthLight} />

      {/* Roof rafters — radial depth lines */}
      <path d="M 50 6 L 50 62" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
      <path d="M 50 6 L 22 35" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
      <path d="M 50 6 L 78 35" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />

      {/* Finial */}
      <circle cx="50" cy="6" r="3" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 50 3 L 50 0" strokeWidth={S.P.strokeWidthLight} />
      <circle cx="50" cy="0" r="1.5" strokeWidth={S.D.strokeWidth} />

      {/* Columns — visible in 3/4 view */}
      <path d="M 22 65 L 22 90" strokeWidth={S.P.strokeWidth} />
      <path d="M 36 63 L 36 90" strokeWidth={S.P.strokeWidth} />
      <path d="M 50 62 L 50 90" strokeWidth={S.P.strokeWidth} />
      <path d="M 64 63 L 64 90" strokeWidth={S.P.strokeWidth} />
      <path d="M 78 65 L 78 90" strokeWidth={S.P.strokeWidth} />
      <path d="M 86 66 L 86 90" strokeWidth={S.P.strokeWidthLight} opacity={S.D.opacityStrong} />

      {/* Column capitals */}
      <path d="M 20 65 L 24 65 L 24 67 L 20 67 Z" strokeWidth={S.D.strokeWidth} />
      <path d="M 48 62 L 52 62 L 52 64 L 48 64 Z" strokeWidth={S.D.strokeWidth} />
      <path d="M 76 65 L 80 65 L 80 67 L 76 67 Z" strokeWidth={S.D.strokeWidth} />

      {/* Decorative railings */}
      <path d="M 22 76 Q 36 74, 50 76 Q 64 74, 78 76" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 22 83 Q 36 81, 50 83 Q 64 81, 78 83" strokeWidth={S.P.strokeWidthLight} />

      {/* Floor platform — 3D */}
      <path d="M 16 90 L 30 86 L 70 86 L 84 90 L 88 93 L 12 93 Z"
            strokeWidth={S.P.strokeWidthLight} />

      {/* DETAIL: Entry steps */}
      <path d="M 44 93 L 44 98 L 56 98 L 56 93" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 46 95 L 54 95" strokeWidth={S.D.strokeWidthFine} />
    </g>
  </svg>
)

// ============================================================================
// GROTTO - 3/4 view into a romantic artificial cave showing the rocky
// facade depth, stalactites, shell decorations, and a water pool at the base.
// Reference: Stourhead grotto, Villa d'Este nymphaeum
// ============================================================================
export const GrottoSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (near): Rocky hillside */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 5 85 L 5 65 Q 8 55, 15 48" />
      <path d="M 95 85 L 95 65 Q 92 55, 85 48" />
      <path d="M 5 85 L 15 85 M 85 85 L 95 85" />
    </g>

    {/* 3D shading — cave interior darkness */}
    <path d="M 22 82 L 20 68 Q 25 58, 35 50 Q 45 44, 55 42 Q 65 43, 73 50 Q 80 58, 82 68 L 78 82 Z"
          fill="currentColor" opacity="0.12" stroke="none" />
    {/* 3D shading — right rock face shadow */}
    <path d="M 85 48 Q 92 60, 92 70 L 85 85 L 92 85 L 95 65 Q 92 55, 85 48 Z"
          fill="currentColor" opacity="0.08" stroke="none" />

    {/* PRIMARY: THE GROTTO — rocky cave with decorations */}
    <g filter={showHalo ? "url(#garden-halo)" : undefined}>
      {/* Outer rocky facade */}
      <path d="M 15 85 L 8 65 Q 10 50, 18 38 Q 30 25, 45 18 Q 55 15, 70 22 Q 82 32, 88 48 Q 92 60, 92 70 L 85 85"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Rock texture fissures */}
      <path d="M 12 58 L 18 62 L 16 66" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 28 32 L 34 36 L 32 42" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 68 28 L 74 35 L 72 40" strokeWidth={S.P.strokeWidthLight} />

      {/* Cave opening — organic shape */}
      <path d="M 22 82 L 20 68 Q 25 58, 35 50 Q 45 44, 55 42 Q 65 43, 73 50 Q 80 58, 82 68 L 78 82"
            strokeWidth={S.P.strokeWidth} />
      {/* Inner chamber depth */}
      <path d="M 30 78 L 28 70 Q 35 62, 45 58 Q 55 56, 65 60 Q 72 66, 74 72 L 70 78"
            strokeWidth={S.P.strokeWidthLight} opacity="0.6" />

      {/* Stalactites */}
      <path d="M 32 50 L 34 56 L 33 60" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 42 46 L 44 54 L 43 59" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 58 46 L 60 54 L 59 59" strokeWidth={S.P.strokeWidthLight} />

      {/* Shell decorations */}
      <circle cx="26" cy="66" r="3.5" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 24 66 L 28 66 M 26 64 L 26 68" strokeWidth={S.D.strokeWidth} />
      <circle cx="74" cy="66" r="3.5" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 72 66 L 76 66 M 74 64 L 74 68" strokeWidth={S.D.strokeWidth} />

      {/* Water pool — elliptical with 3D rim */}
      <ellipse cx="50" cy="78" rx="28" ry="8"
               strokeWidth={S.P.strokeWidthLight} />
      <ellipse cx="50" cy="80" rx="25" ry="6"
               strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
    </g>

    {/* EFFECTS: Water shimmer */}
    <g strokeDasharray={S.E.dash} opacity={S.E.opacity} strokeWidth={S.E.strokeWidth}>
      <path d="M 30 77 Q 40 80, 50 77 Q 60 74, 70 77" />
    </g>
  </svg>
)

// ============================================================================
// HA-HA - Cross-section showing the sunken fence with 3D depth. The retaining
// wall is shown in cutaway with visible stone coursing, ditch bottom, and
// sloping sides creating the uninterrupted sightline.
// Reference: Stowe landscape garden, Capability Brown estates
// ============================================================================
export const HaHaSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Parkland landscape */}
    <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
      <path d="M 5 45 Q 15 43, 25 45 Q 35 47, 45 45" />
      <ellipse cx="20" cy="38" rx="12" ry="8" />
      <ellipse cx="80" cy="25" rx="15" ry="10" />
      <path d="M 60 35 Q 70 33, 80 35 Q 90 37, 95 35" />
    </g>

    {/* 3D shading — ditch depth shadow */}
    <path d="M 55 56 L 55 85 L 58 90 L 75 90 L 78 85 L 78 82 L 72 88 L 60 88 L 57 82 L 57 56 Z"
          fill="currentColor" opacity="0.1" stroke="none" />
    {/* 3D shading — wall face shadow */}
    <path d="M 55 56 L 58 58 L 58 87 L 55 85 Z"
          fill="currentColor" opacity="0.08" stroke="none" />

    {/* PRIMARY: THE HA-HA — sunken fence in cross-section */}
    <g filter={showHalo ? "url(#garden-halo)" : undefined}>
      {/* Upper lawn level */}
      <path d="M 5 50 L 48 50"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Slope down to ditch */}
      <path d="M 48 50 Q 52 52, 55 56" strokeWidth={S.P.strokeWidth} />

      {/* Retaining wall — front face */}
      <path d="M 55 56 L 55 85"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Wall — side face showing depth */}
      <path d="M 55 56 L 58 58 L 58 87 L 55 85"
            strokeWidth={S.P.strokeWidthLight} />

      {/* Stone masonry blocks with 3D depth */}
      <path d="M 50 60 L 55 60 L 58 62 L 53 62 Z" strokeWidth={S.D.strokeWidth} />
      <path d="M 52 65 L 55 65 L 58 67 L 53 67 Z" strokeWidth={S.D.strokeWidth} />
      <path d="M 50 70 L 55 70 L 58 72 L 53 72 Z" strokeWidth={S.D.strokeWidth} />
      <path d="M 52 75 L 55 75 L 58 77 L 53 77 Z" strokeWidth={S.D.strokeWidth} />
      <path d="M 50 80 L 55 80 L 58 82 L 53 82 Z" strokeWidth={S.D.strokeWidth} />

      {/* Ditch bottom */}
      <path d="M 55 85 L 58 90 L 75 90 L 78 85" strokeWidth={S.P.strokeWidthLight} />

      {/* Far side slope */}
      <path d="M 78 85 Q 82 82, 88 80" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 88 80 L 95 80" strokeWidth={S.P.strokeWidthBold} />

      {/* DETAIL: Grass tufts */}
      <path d="M 52 53 Q 54 52, 56 54" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 80 83 Q 82 81, 84 82" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* Sight line */}
      <path d="M 5 48 L 95 78" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} strokeDasharray="2 2" />

      {/* Distant livestock */}
      <ellipse cx="85" cy="78" rx="4" ry="2" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
    </g>
  </svg>
)

// ============================================================================
// OBELISK - 3/4 view of an Egyptian-style tapering stone needle. Shows the
// pyramidion cap with shadow, shaft with hieroglyphic cartouches, and a
// multi-tiered base plinth with visible side faces.
// Reference: Borghese Gardens obelisks, Place de la Concorde
// ============================================================================
export const ObeliskSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (near): Formal parterre */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <ellipse cx="50" cy="95" rx="30" ry="5" />
      <ellipse cx="20" cy="88" rx="10" ry="4" />
      <ellipse cx="80" cy="88" rx="10" ry="4" />
    </g>

    {/* 3D shading — right face of shaft in shadow */}
    <path d="M 50 5 L 56 22 L 60 78 L 50 78 Z"
          fill="currentColor" opacity="0.1" stroke="none" />
    {/* 3D shading — right face of base */}
    <path d="M 61 84 L 65 86 L 65 91 L 61 89 Z"
          fill="currentColor" opacity="0.08" stroke="none" />

    {/* PRIMARY: THE OBELISK — tapering stone monument */}
    <g filter={showHalo ? "url(#garden-halo)" : undefined}>
      {/* Pyramidion */}
      <path d="M 50 5 L 44 22 L 56 22 Z"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Main shaft — front face */}
      <path d="M 44 22 L 40 78 L 60 78 L 56 22"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* DETAIL: Hieroglyphic cartouche */}
      <path d="M 46 28 L 54 28 L 54 35 L 46 35 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 47 30 L 53 30" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
      <path d="M 47 32 L 49 32 M 51 32 L 53 32" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

      {/* Hieroglyphic symbols */}
      <circle cx="50" cy="42" r="3" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 47 50 L 47 56 M 53 50 L 53 56" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* Ankh symbol */}
      <circle cx="50" cy="62" r="2" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 50 64 L 50 69" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 47 66 L 53 66" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* Base — first tier */}
      <path d="M 39 78 L 39 84 L 61 84 L 61 78"
            strokeWidth={S.P.strokeWidthLight} />
      {/* Base side face */}
      <path d="M 61 78 L 65 80 L 65 86 L 61 84"
            strokeWidth={S.P.strokeWidthLight} opacity="0.6" />

      {/* Base — second tier */}
      <path d="M 37 84 L 37 89 L 63 89 L 63 84"
            strokeWidth={S.P.strokeWidthLight} />
      <path d="M 63 84 L 67 86 L 67 91 L 63 89"
            strokeWidth={S.P.strokeWidthLight} opacity="0.6" />

      {/* Plinth */}
      <path d="M 34 89 L 34 95 L 66 95 L 66 89"
            strokeWidth={S.P.strokeWidth} />
    </g>
  </svg>
)

// ============================================================================
// PAGODA - 3/4 view of a Chinese garden tower with tiered upturned roofs.
// Shows the stacked tiers with visible side faces, hanging bells at eave
// tips, and lattice windows on the ground floor.
// Reference: Kew Gardens Great Pagoda, Chanteloup Pagoda
// ============================================================================
export const PagodaSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (near): Oriental garden */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 5 90 L 20 90 M 80 90 L 95 90" />
      <ellipse cx="15" cy="82" rx="10" ry="6" />
      <ellipse cx="85" cy="82" rx="10" ry="6" />
    </g>

    {/* 3D shading — right side wall shadow */}
    <path d="M 58 22 L 64 24 L 64 56 L 70 58 L 70 88 L 58 88 Z"
          fill="currentColor" opacity="0.1" stroke="none" />
    {/* 3D shading — top roof right side */}
    <path d="M 50 8 L 62 18 Q 65 20, 62 22 L 58 22 L 50 12 Z"
          fill="currentColor" opacity="0.07" stroke="none" />

    {/* PRIMARY: THE PAGODA — tiered tower */}
    <g filter={showHalo ? "url(#garden-halo)" : undefined}>
      {/* Top tier roof — front face */}
      <path d="M 50 8 L 38 18 Q 35 20, 38 22 L 62 22 Q 65 20, 62 18 Z"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 38 18 L 35 15" strokeWidth={S.D.strokeWidth} />
      <path d="M 62 18 L 65 15" strokeWidth={S.D.strokeWidth} />

      {/* Finial spire */}
      <path d="M 50 8 L 50 3" strokeWidth={S.P.strokeWidthLight} />
      <circle cx="50" cy="3" r="2" strokeWidth={S.D.strokeWidth} />

      {/* Top tier walls */}
      <path d="M 42 22 L 42 32 L 58 32 L 58 22"
            strokeWidth={S.P.strokeWidthLight} />
      {/* Side face */}
      <path d="M 58 22 L 64 24 L 64 34 L 58 32"
            strokeWidth={S.P.strokeWidthLight} opacity="0.6" />

      {/* Second tier roof with upturned eaves */}
      <path d="M 58 32 L 70 40 Q 74 42, 70 44 L 30 44 Q 26 42, 30 40 Z"
            strokeWidth={S.P.strokeWidthLight} />
      <path d="M 30 40 L 26 36 M 70 40 L 74 36" strokeWidth={S.P.strokeWidthLight} />

      {/* Bells */}
      <circle cx="32" cy="38" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      <circle cx="68" cy="38" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

      {/* Second tier walls */}
      <path d="M 36 44 L 36 56 L 64 56 L 64 44"
            strokeWidth={S.P.strokeWidthLight} />
      {/* Side face */}
      <path d="M 64 44 L 70 46 L 70 58 L 64 56"
            strokeWidth={S.P.strokeWidthLight} opacity="0.6" />

      {/* Moon gate windows */}
      <circle cx="44" cy="50" r="3" strokeWidth={S.D.strokeWidth} />
      <circle cx="56" cy="50" r="3" strokeWidth={S.D.strokeWidth} />

      {/* Third tier roof */}
      <path d="M 64 56 L 78 66 Q 82 68, 78 70 L 22 70 Q 18 68, 22 66 Z"
            strokeWidth={S.P.strokeWidth} />
      <path d="M 22 66 L 18 61 M 78 66 L 82 61" strokeWidth={S.P.strokeWidthLight} />

      {/* Ground floor walls */}
      <path d="M 30 70 L 30 88 L 70 88 L 70 70" strokeWidth={S.P.strokeWidthLight} />
      {/* Side face */}
      <path d="M 70 70 L 78 72 L 78 90 L 70 88"
            strokeWidth={S.P.strokeWidthLight} opacity="0.5" />

      {/* Entrance door */}
      <path d="M 44 78 L 44 88 L 56 88 L 56 78 Q 50 75, 44 78"
            strokeWidth={S.P.strokeWidthLight} />

      {/* Lattice windows */}
      <path d="M 34 76 L 40 76 L 40 82 L 34 82 Z" strokeWidth={S.D.strokeWidth} />
      <path d="M 37 76 L 37 82 M 34 79 L 40 79" strokeWidth={S.E.strokeWidth} />
      <path d="M 60 76 L 66 76 L 66 82 L 60 82 Z" strokeWidth={S.D.strokeWidth} />
      <path d="M 63 76 L 63 82 M 60 79 L 66 79" strokeWidth={S.E.strokeWidth} />

      {/* Base platform — 3D */}
      <path d="M 26 88 L 26 93 L 74 93 L 74 88"
            strokeWidth={S.P.strokeWidthLight} />
      <path d="M 74 88 L 80 90 L 80 95 L 74 93"
            strokeWidth={S.P.strokeWidthLight} opacity="0.5" />
    </g>
  </svg>
)

// ============================================================================
// PARTERRE - Slightly tilted aerial view of a French formal garden showing
// the broderie scrollwork pattern with 3D boxwood hedges (showing height),
// cruciform gravel paths, and accent topiary cones.
// Reference: Versailles Parterre du Midi, Vaux-le-Vicomte
// ============================================================================
export const ParterreSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (near): Surrounding terrace */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 5 5 L 5 95 M 95 5 L 95 95" />
      <path d="M 5 5 L 95 5" />
    </g>

    {/* 3D shading — ground plane */}
    <path d="M 10 10 L 90 10 L 90 90 L 10 90 Z"
          fill="currentColor" opacity="0.06" stroke="none" />

    {/* PRIMARY: THE PARTERRE — formal garden pattern */}
    <g filter={showHalo ? "url(#garden-halo)" : undefined}>
      {/* Outer border hedge */}
      <path d="M 10 10 L 90 10 L 90 90 L 10 90 Z"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Inner border */}
      <path d="M 15 15 L 85 15 L 85 85 L 15 85 Z"
            strokeWidth={S.P.strokeWidthLight} />

      {/* Central circular bed */}
      <circle cx="50" cy="50" r="18" strokeWidth={S.P.strokeWidthLight} />
      <circle cx="50" cy="50" r="12" strokeWidth={S.P.strokeWidthLight} />
      <circle cx="50" cy="50" r="6" strokeWidth={S.D.strokeWidth} />
      <circle cx="50" cy="50" r="3" strokeWidth={S.P.strokeWidthLight} />

      {/* Cruciform paths */}
      <path d="M 50 10 L 50 32" strokeWidth={S.P.strokeWidth} />
      <path d="M 50 68 L 50 90" strokeWidth={S.P.strokeWidth} />
      <path d="M 10 50 L 32 50" strokeWidth={S.P.strokeWidth} />
      <path d="M 68 50 L 90 50" strokeWidth={S.P.strokeWidth} />

      {/* Corner scrollwork — baroque broderie */}
      <path d="M 20 20 Q 18 25, 22 28 Q 26 26, 24 30 Q 28 32, 30 28 Q 32 24, 28 22 Q 26 18, 22 20 Q 20 24, 20 20"
            strokeWidth={S.P.strokeWidthLight} />
      <path d="M 80 20 Q 82 25, 78 28 Q 74 26, 76 30 Q 72 32, 70 28 Q 68 24, 72 22 Q 74 18, 78 20 Q 80 24, 80 20"
            strokeWidth={S.P.strokeWidthLight} />
      <path d="M 20 80 Q 18 75, 22 72 Q 26 74, 24 70 Q 28 68, 30 72 Q 32 76, 28 78 Q 26 82, 22 80 Q 20 76, 20 80"
            strokeWidth={S.P.strokeWidthLight} />
      <path d="M 80 80 Q 82 75, 78 72 Q 74 74, 76 70 Q 72 68, 70 72 Q 68 76, 72 78 Q 74 82, 78 80 Q 80 76, 80 80"
            strokeWidth={S.P.strokeWidthLight} />

      {/* Side panel arabesques */}
      <path d="M 50 15 Q 45 18, 48 22 Q 50 24, 52 22 Q 55 18, 50 15" strokeWidth={S.D.strokeWidth} />
      <path d="M 50 85 Q 45 82, 48 78 Q 50 76, 52 78 Q 55 82, 50 85" strokeWidth={S.D.strokeWidth} />
      <path d="M 15 50 Q 18 45, 22 48 Q 24 50, 22 52 Q 18 55, 15 50" strokeWidth={S.D.strokeWidth} />
      <path d="M 85 50 Q 82 45, 78 48 Q 76 50, 78 52 Q 82 55, 85 50" strokeWidth={S.D.strokeWidth} />

      {/* DETAIL: Topiary cones at cardinal points */}
      <circle cx="50" cy="25" r="2.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      <circle cx="50" cy="75" r="2.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      <circle cx="25" cy="50" r="2.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      <circle cx="75" cy="50" r="2.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
    </g>
  </svg>
)

// ============================================================================
// PERGOLA - Perspective view looking down a garden walkway with overhead
// timber beams and grape vines. Shows the receding posts, cross-beams with
// 3D depth, and dangling vine tendrils creating dappled shade.
// Reference: Italian villa pergolas, Sissinghurst lime walk
// ============================================================================
export const PergolaSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (near): Garden borders */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <ellipse cx="8" cy="72" rx="6" ry="10" />
      <ellipse cx="92" cy="72" rx="6" ry="10" />
      <path d="M 5 90 L 10 90 M 90 90 L 95 90" />
    </g>

    {/* 3D shading — overhead canopy shadow on ground */}
    <path d="M 15 28 L 85 28 L 88 33 L 88 90 L 12 90 L 12 33 Z"
          fill="currentColor" opacity="0.06" stroke="none" />
    {/* 3D shading — right beam faces */}
    <path d="M 85 28 L 88 30 L 88 90 L 85 90 Z"
          fill="currentColor" opacity="0.09" stroke="none" />

    {/* PRIMARY: THE PERGOLA — timber frame with vines */}
    <g filter={showHalo ? "url(#garden-halo)" : undefined}>
      {/* Vertical posts — front pair */}
      <path d="M 15 28 L 15 90" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 85 28 L 85 90" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Vertical posts — middle pair receding */}
      <path d="M 35 28 L 35 90" strokeWidth={S.P.strokeWidth} />
      <path d="M 65 28 L 65 90" strokeWidth={S.P.strokeWidth} />

      {/* Post caps */}
      <path d="M 13 28 L 17 28 L 17 30 L 13 30 Z" strokeWidth={S.D.strokeWidth} />
      <path d="M 83 28 L 87 28 L 87 30 L 83 30 Z" strokeWidth={S.D.strokeWidth} />

      {/* Main longitudinal beams — front and side showing depth */}
      <path d="M 10 28 L 90 28" strokeWidth={S.P.strokeWidthBold} />
      <path d="M 10 33 L 90 33" strokeWidth={S.P.strokeWidthBold} />
      {/* Beam depth connecting top to bottom */}
      <path d="M 10 28 L 10 33 M 90 28 L 90 33" strokeWidth={S.P.strokeWidthLight} />

      {/* Cross beams — showing depth with paired lines */}
      <path d="M 15 25 L 85 25" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 35 25 L 35 33" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 50 25 L 50 33" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 65 25 L 65 33" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

      {/* Grape vines — organic canes along beams */}
      <path d="M 18 30 Q 25 26, 32 30 Q 38 26, 45 30 Q 52 26, 58 30 Q 65 26, 72 30 Q 78 26, 82 30"
            strokeWidth={S.P.strokeWidthLight} />

      {/* Vine leaf clusters — 3D bunches */}
      <circle cx="28" cy="36" r="4" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <circle cx="50" cy="34" r="5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <circle cx="72" cy="36" r="4" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* Grape bunches hanging down */}
      <path d="M 30 40 L 30 46" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      <ellipse cx="30" cy="48" rx="2" ry="3" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      <path d="M 52 38 L 52 44" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      <ellipse cx="52" cy="46" rx="2" ry="3" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      <path d="M 70 40 L 70 46" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      <ellipse cx="70" cy="48" rx="2" ry="3" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

      {/* DETAIL: Ground paving */}
      <path d="M 50 90 L 50 33" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
    </g>

    {/* EFFECTS: Dappled light on ground */}
    <g opacity={S.E.fillOpacity} strokeWidth="0" fill="currentColor">
      <ellipse cx="30" cy="70" rx="4" ry="2" />
      <ellipse cx="55" cy="60" rx="3" ry="2" />
      <ellipse cx="70" cy="75" rx="4" ry="2" />
    </g>
  </svg>
)

// ============================================================================
// SUNDIAL - 3/4 view of a stone pedestal sundial showing the gnomon casting
// a shadow across the dial face, Roman numeral markings, and the column
// pedestal with visible side face and base moldings.
// Reference: English garden sundials, Hever Castle
// ============================================================================
export const SundialSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (near): Garden setting */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <ellipse cx="50" cy="92" rx="35" ry="6" />
      <path d="M 5 88 L 15 88 M 85 88 L 95 88" />
    </g>

    {/* 3D shading — pedestal right face */}
    <path d="M 58 52 L 64 55 L 64 80 L 58 78 Z"
          fill="currentColor" opacity="0.1" stroke="none" />
    {/* 3D shading — gnomon shadow on dial */}
    <path d="M 50 35 L 58 42 L 52 45 L 48 40 Z"
          fill="currentColor" opacity="0.08" stroke="none" />

    {/* PRIMARY: THE SUNDIAL — pedestal with dial plate */}
    <g filter={showHalo ? "url(#garden-halo)" : undefined}>
      {/* Dial plate — elliptical 3D disc */}
      <ellipse cx="50" cy="40" rx="20" ry="8"
               strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Dial plate thickness */}
      <path d="M 30 40 L 30 43 Q 50 52, 70 43 L 70 40"
            strokeWidth={S.P.strokeWidthLight} />

      {/* Gnomon — triangular blade */}
      <path d="M 50 40 L 50 22 L 55 40" strokeWidth={S.P.strokeWidth} />
      {/* Gnomon thickness */}
      <path d="M 50 22 L 52 24 L 55 40" strokeWidth={S.P.strokeWidthLight} opacity="0.6" />

      {/* Hour lines on dial face */}
      <path d="M 35 38 L 42 36" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
      <path d="M 50 34 L 50 32" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
      <path d="M 58 36 L 65 38" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
      <path d="M 35 42 L 38 44" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
      <path d="M 62 44 L 65 42" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

      {/* Column pedestal — front face */}
      <path d="M 42 43 L 42 78 L 58 78 L 58 43"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Column — side face */}
      <path d="M 58 43 L 64 46 L 64 80 L 58 78"
            strokeWidth={S.P.strokeWidthLight} opacity="0.6" />

      {/* Pedestal moldings */}
      <path d="M 40 52 L 60 52" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 40 72 L 60 72" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* Base plinth — 3D */}
      <path d="M 38 78 L 38 85 L 62 85 L 62 78"
            strokeWidth={S.P.strokeWidthLight} />
      <path d="M 62 78 L 68 80 L 68 87 L 62 85"
            strokeWidth={S.P.strokeWidthLight} opacity="0.5" />

      {/* Ground base */}
      <path d="M 34 85 L 34 88 L 66 88 L 66 85"
            strokeWidth={S.P.strokeWidthLight} />
    </g>
  </svg>
)

// ============================================================================
// TOPIARY - 3/4 view of a sculpted geometric topiary form (cone or sphere)
// in a terracotta pot. Shows the clipped foliage with 3D volume through
// shading, visible pot rim and side face, and garden context.
// Reference: Versailles orangery topiary, Italian Renaissance gardens
// ============================================================================
export const TopiarySVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (near): Garden path */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 5 92 L 95 92" />
      <ellipse cx="18" cy="86" rx="10" ry="5" />
      <ellipse cx="82" cy="86" rx="10" ry="5" />
    </g>

    {/* 3D shading — foliage sphere right side */}
    <path d="M 50 12 Q 68 18, 74 34 Q 78 46, 72 58 L 58 58 Q 64 46, 62 34 Q 58 22, 50 16 Z"
          fill="currentColor" opacity="0.1" stroke="none" />
    {/* 3D shading — pot right face */}
    <path d="M 60 66 L 66 68 L 62 86 L 56 84 Z"
          fill="currentColor" opacity="0.08" stroke="none" />

    {/* PRIMARY: THE TOPIARY — sculpted form in pot */}
    <g filter={showHalo ? "url(#garden-halo)" : undefined}>
      {/* Main foliage sphere — outer contour */}
      <path d="M 26 58 Q 22 46, 26 34 Q 32 18, 50 12 Q 68 18, 74 34 Q 78 46, 74 58"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />

      {/* Clipping guide lines showing spherical form */}
      <path d="M 30 46 Q 50 40, 70 46"
            strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 34 34 Q 50 28, 66 34"
            strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      {/* Vertical meridian */}
      <path d="M 50 12 Q 50 35, 50 58"
            strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

      {/* Trunk visible below foliage */}
      <path d="M 48 58 L 48 66 L 52 66 L 52 58"
            strokeWidth={S.P.strokeWidth} />

      {/* Pot — terracotta with 3D form */}
      {/* Pot rim ellipse */}
      <ellipse cx="50" cy="66" rx="14" ry="4"
               strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Pot body — front face */}
      <path d="M 36 66 L 40 86 L 60 86 L 64 66"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Pot base */}
      <ellipse cx="50" cy="86" rx="10" ry="3"
               strokeWidth={S.P.strokeWidthLight} />

      {/* DETAIL: Pot decorative band */}
      <path d="M 38 72 L 62 72" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 38 74 L 62 74" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

      {/* DETAIL: Leaf texture suggestions */}
      <path d="M 40 28 Q 44 26, 42 24" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 56 30 Q 60 28, 58 26" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 34 44 Q 38 42, 36 40" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
    </g>
  </svg>
)

// ============================================================================
// TRELLIS - 3/4 view of a garden lattice panel with climbing plants. Shows
// the diamond lattice pattern with visible panel thickness, frame posts,
// and flowering climbers weaving through the grid.
// Reference: Arts & Crafts garden trellises, Hidcote Manor
// ============================================================================
export const TrellisSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (near): Garden border */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 5 90 L 95 90" />
      <ellipse cx="8" cy="80" rx="6" ry="8" />
      <ellipse cx="92" cy="80" rx="6" ry="8" />
    </g>

    {/* 3D shading — panel thickness shadow */}
    <path d="M 80 12 L 85 15 L 85 90 L 80 90 Z"
          fill="currentColor" opacity="0.1" stroke="none" />

    {/* PRIMARY: THE TRELLIS — lattice panel with climbers */}
    <g filter={showHalo ? "url(#garden-halo)" : undefined}>
      {/* Frame — outer rectangle front face */}
      <path d="M 15 12 L 80 12 L 80 90 L 15 90 Z"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Frame — side face showing depth */}
      <path d="M 80 12 L 85 15 L 85 90 L 80 90"
            strokeWidth={S.P.strokeWidthLight} />
      {/* Frame top depth */}
      <path d="M 15 12 L 20 15 L 85 15"
            strokeWidth={S.P.strokeWidthLight} opacity="0.6" />

      {/* Post finials */}
      <circle cx="15" cy="9" r="3" strokeWidth={S.P.strokeWidthLight} />
      <circle cx="80" cy="9" r="3" strokeWidth={S.P.strokeWidthLight} />

      {/* Diamond lattice pattern */}
      <path d="M 20 20 L 35 50 L 20 80" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 35 20 L 50 50 L 35 80" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 50 20 L 65 50 L 50 80" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 65 20 L 75 50 L 65 80" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 35 20 L 20 50 L 35 80" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 50 20 L 35 50 L 50 80" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 65 20 L 50 50 L 65 80" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 75 20 L 65 50 L 75 80" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* Climbing plant — winding stems */}
      <path d="M 20 82 Q 28 74, 24 66 Q 32 58, 28 50 Q 36 42, 32 34 Q 40 26, 36 20"
            strokeWidth={S.P.strokeWidthLight} />
      <path d="M 60 82 Q 68 74, 64 66 Q 72 58, 68 50 Q 72 42, 70 34 Q 74 26, 72 20"
            strokeWidth={S.P.strokeWidthLight} />

      {/* Flower blooms */}
      <circle cx="30" cy="30" r="3" strokeWidth={S.P.strokeWidthLight} />
      <circle cx="26" cy="50" r="2.5" strokeWidth={S.P.strokeWidthLight} />
      <circle cx="34" cy="68" r="3" strokeWidth={S.P.strokeWidthLight} />
      <circle cx="66" cy="38" r="2.5" strokeWidth={S.P.strokeWidthLight} />
      <circle cx="70" cy="56" r="3" strokeWidth={S.P.strokeWidthLight} />
      <circle cx="64" cy="74" r="2.5" strokeWidth={S.P.strokeWidthLight} />

      {/* DETAIL: Leaf clusters */}
      <path d="M 28 42 Q 32 40, 30 38" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />
      <path d="M 66 48 Q 70 46, 68 44" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />
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
  'ha-ha': HaHaSVG,
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
