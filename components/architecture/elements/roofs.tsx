'use client'

import React from 'react'
import { S } from './svgStyleTokens'

const HaloFilter = () => (
  <defs>
    <filter id="roof-halo" x="-50%" y="-50%" width="200%" height="200%">
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
// GABLE - Triangular portion of wall between sloping roof edges
// Reference: Classic house form, Greek temples - the iconic triangular end wall
// ============================================================================
export const GableSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Building walls and ground */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 12 95 L 12 58" strokeWidth={S.P.strokeWidthLight} fill="none" />
      <path d="M 88 95 L 88 58" strokeWidth={S.P.strokeWidthLight} fill="none" />
      <path d="M 10 95 L 90 95" strokeWidth={S.D.strokeWidth} fill="none" />
      {/* Wall below eave */}
      <path d="M 12 58 L 88 58" strokeWidth={S.P.strokeWidthLight} fill="none" />
    </g>

    {/* CONTEXT (near): Roof slopes extending from gable - WITH SHINGLE TEXTURE */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacitySubtle}>
      <path d="M 50 12 L 92 58" strokeWidth={S.D.strokeWidth} fill="none" />
      <path d="M 50 12 L 8 58" strokeWidth={S.D.strokeWidth} fill="none" />
      {/* Wood shingle rows on left slope */}
      <path d="M 12 56 L 51 15" strokeWidth={S.E.strokeWidth} opacity={S.D.opacity} />
      <path d="M 15 52 L 52 18" strokeWidth={S.E.strokeWidth} opacity={S.D.opacity} />
      <path d="M 18 48 L 53 21" strokeWidth={S.E.strokeWidth} opacity={S.D.opacity} />
      <path d="M 22 44 L 54 24" strokeWidth={S.E.strokeWidth} opacity={S.D.opacity} />
      {/* Wood shingle rows on right slope */}
      <path d="M 88 56 L 49 15" strokeWidth={S.E.strokeWidth} opacity={S.D.opacity} />
      <path d="M 85 52 L 48 18" strokeWidth={S.E.strokeWidth} opacity={S.D.opacity} />
      <path d="M 82 48 L 47 21" strokeWidth={S.E.strokeWidth} opacity={S.D.opacity} />
      <path d="M 78 44 L 46 24" strokeWidth={S.E.strokeWidth} opacity={S.D.opacity} />
      {/* Individual shingle gaps/edges */}
      <path d="M 25 50 L 26 49" strokeWidth={S.D.strokeWidthFine} opacity={S.CN.opacity} />
      <path d="M 35 42 L 36 41" strokeWidth={S.D.strokeWidthFine} opacity={S.CN.opacity} />
      <path d="M 65 42 L 64 41" strokeWidth={S.D.strokeWidthFine} opacity={S.CN.opacity} />
      <path d="M 75 50 L 74 49" strokeWidth={S.D.strokeWidthFine} opacity={S.CN.opacity} />
    </g>

    {/* PRIMARY: THE GABLE - triangular wall end */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Triangular gable shape - the wall filling the triangle */}
      <path d="M 12 58 L 50 14 L 88 58" strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} strokeLinejoin="round" />

      {/* Rake/verge boards (trim along roof edge) */}
      <path d="M 9 60 L 50 10 L 91 60" strokeWidth={S.P.strokeWidth} fill="none" opacity={S.D.opacityStrong} />

      {/* DETAIL: Horizontal courses/siding on gable face */}
      <path d="M 20 50 L 80 50" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.CN.opacity} />
      <path d="M 26 42 L 74 42" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.CN.opacity} />
      <path d="M 32 34 L 68 34" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.CN.opacity} />
      <path d="M 40 26 L 60 26" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
    </g>

    {/* DETAIL: Gable window (typical feature) */}
    <g opacity={S.D.opacity}>
      <circle cx="50" cy="40" r="7" strokeWidth={S.P.strokeWidthLight} fill="none" />
      <path d="M 50 33 L 50 47" strokeWidth={S.D.strokeWidthFine} fill="none" />
      <path d="M 43 40 L 57 40" strokeWidth={S.D.strokeWidthFine} fill="none" />
    </g>

    {/* Finial at apex */}
    <path d="M 50 14 L 50 6" strokeWidth={S.P.strokeWidth} fill="none" opacity={S.D.opacityStrong} />
  </svg>
)

// ============================================================================
// HIP ROOF - Sloped on all four sides, no gable ends
// Reference: Georgian houses, prairie style - slopes down to eaves on all sides
// ============================================================================
export const HipRoofSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Building walls in 3/4 perspective */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      {/* Front wall */}
      <path d="M 8 92 L 8 60" strokeWidth={S.P.strokeWidthLight} fill="none" />
      <path d="M 78 92 L 78 60" strokeWidth={S.P.strokeWidthLight} fill="none" />
      <path d="M 8 60 L 78 60" strokeWidth={S.P.strokeWidthLight} fill="none" />
      <path d="M 8 92 L 78 92" strokeWidth={S.D.strokeWidth} fill="none" />
      {/* Visible right side wall (3/4 perspective) */}
      <path d="M 78 92 L 94 82" strokeWidth={S.P.strokeWidthLight} fill="none" />
      <path d="M 78 60 L 94 50" strokeWidth={S.P.strokeWidthLight} fill="none" />
      <path d="M 94 82 L 94 50" strokeWidth={S.P.strokeWidthLight} fill="none" />
    </g>

    {/* PRIMARY: THE HIP ROOF - 3/4 view showing slopes on all four sides */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Ridge line (shorter than building, centered) */}
      <path d="M 30 22 L 58 22" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Front slope - trapezoidal face */}
      <path d="M 6 60 L 30 22" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 80 60 L 58 22" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 6 60 L 80 60" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Right side slope - triangular hip face (visible in 3/4 view) */}
      <path d="M 80 60 L 96 50" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 58 22 L 74 14" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 96 50 L 74 14" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Back ridge to back-right corner (partially visible) */}
      <path d="M 74 14 L 46 14" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} opacity={S.D.opacity} />

      {/* Back-left hip edge (partially visible, dashed) */}
      <path d="M 46 14 L 22 52" strokeWidth={S.P.strokeWidthLight} fill="none" opacity={S.D.opacitySubtle} strokeDasharray={S.CN.dash} />

      {/* DETAIL: CLAY TILE TEXTURE - front slope */}
      <path d="M 10 56 L 77 56" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 14 52 L 76 52" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 18 48 L 74 48" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 22 44 L 72 44" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 26 40 L 70 40" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 30 36 L 66 36" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 34 32 L 62 32" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 38 28 L 58 28" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 43 24 L 55 24" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.CF.opacity} />

      {/* DETAIL: TILE TEXTURE - right side hip slope */}
      <path d="M 82 56 L 93 48" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 80 50 L 90 43" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 76 44 L 86 38" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 72 38 L 82 32" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 68 32 L 78 26" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.CF.opacity} />
      <path d="M 64 26 L 74 20" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.CF.opacity} />
    </g>
  </svg>
)

// ============================================================================
// MANSARD - Four-sided roof with double slope (steep lower, shallow upper)
// Reference: French Second Empire style - distinctive Paris roofscape
// ============================================================================
export const MansardSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Building walls */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 8 93 L 8 58" strokeWidth={S.P.strokeWidthLight} fill="none" />
      <path d="M 92 93 L 92 58" strokeWidth={S.P.strokeWidthLight} fill="none" />
      <path d="M 8 93 L 92 93" strokeWidth={S.D.strokeWidth} fill="none" />
    </g>

    {/* PRIMARY: THE MANSARD ROOF - steep lower slope, shallow upper */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* STEEP LOWER SLOPE (nearly vertical) - the defining feature */}
      <path d="M 8 58 L 18 26" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 92 58 L 82 26" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* SHALLOW UPPER SLOPE (nearly flat) */}
      <path d="M 18 26 L 50 16 L 82 26" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} strokeLinejoin="round" />

      {/* Break line between slopes (key Mansard detail) */}
      <path d="M 18 26 L 82 26" strokeWidth={S.P.strokeWidth} fill="none" opacity={S.D.opacityStrong} />

      {/* Eave line */}
      <path d="M 6 58 L 94 58" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Dormers in steep lower slope (very typical) */}
      <g>
        <path d="M 28 48 L 28 34 L 36 30 L 44 34 L 44 48" strokeWidth={S.P.strokeWidth} fill="none" opacity={S.D.opacityStrong} />
        <path d="M 56 48 L 56 34 L 64 30 L 72 34 L 72 48" strokeWidth={S.P.strokeWidth} fill="none" opacity={S.D.opacityStrong} />
        {/* DETAIL: Dormer windows */}
        <path d="M 32 46 L 32 36" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacity} />
        <path d="M 40 46 L 40 36" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacity} />
        <path d="M 60 46 L 60 36" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacity} />
        <path d="M 68 46 L 68 36" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacity} />
      </g>

      {/* DETAIL: FRENCH SLATE TEXTURE - Rows on steep lower slope */}
      <path d="M 9 56 L 91 56" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 10 52 L 90 52" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 11 48 L 89 48" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 12 44 L 88 44" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 13 40 L 87 40" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 14 36 L 86 36" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 15 32 L 85 32" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 16 28 L 84 28" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      {/* Slate on shallow upper slope */}
      <path d="M 22 24 L 78 24" strokeWidth={S.E.strokeWidth} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 28 21 L 72 21" strokeWidth={S.E.strokeWidth} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 34 19 L 66 19" strokeWidth={S.E.strokeWidth} fill="none" opacity={S.CF.opacity} />
      {/* Individual slate edges */}
      <path d="M 25 50 L 26 49" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 45 42 L 46 41" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 55 42 L 54 41" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 75 50 L 74 49" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 40 23 L 41 22" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 60 23 L 59 22" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
    </g>
  </svg>
)

// ============================================================================
// BUTTRESS - Projecting masonry support against a wall
// Reference: Romanesque/Gothic churches - exterior mass resisting thrust
// ============================================================================
export const ButtressSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Main wall being supported */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 62 92 L 62 12" strokeWidth={S.P.strokeWidth} fill="none" />
      <path d="M 66 92 L 66 12" strokeWidth={S.D.strokeWidth} fill="none" />
      {/* Wall section above */}
      <path d="M 62 12 L 92 12" strokeWidth={S.D.strokeWidth} fill="none" />
    </g>

    {/* Ground line */}
    <path d="M 5 92 L 95 92" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.CN.opacity} strokeDasharray={S.CF.dash} />

    {/* PRIMARY: THE BUTTRESS - projecting masonry support */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Main buttress body */}
      <path d="M 14 92 L 14 24" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Base spread on ground */}
      <path d="M 14 92 L 62 92" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Stepped/tapered profile (buttress gets narrower going up) */}
      {/* First setback */}
      <path d="M 14 24 L 26 22 L 62 22" strokeWidth={S.P.strokeWidth} fill="none" strokeLinejoin="round" />

      {/* Second step */}
      <path d="M 14 48 L 32 44" strokeWidth={S.P.strokeWidth} fill="none" />
      <path d="M 32 92 L 32 44" strokeWidth={S.P.strokeWidth} fill="none" />
      <path d="M 32 44 L 62 40" strokeWidth={S.P.strokeWidth} fill="none" />

      {/* Third step */}
      <path d="M 32 68 L 46 64" strokeWidth={S.P.strokeWidth} fill="none" />
      <path d="M 46 92 L 46 64" strokeWidth={S.P.strokeWidthLight} fill="none" />
      <path d="M 46 64 L 62 60" strokeWidth={S.P.strokeWidthLight} fill="none" />

      {/* Weathering/coping on top */}
      <path d="M 11 24 L 28 18" strokeWidth={S.P.strokeWidth} fill="none" />

      {/* DETAIL: Stone course lines */}
      <path d="M 14 55 L 50 55" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 14 72 L 55 72" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
    </g>
  </svg>
)

// ============================================================================
// FLYING BUTTRESS - Exterior arched support transmitting thrust to pier
// Reference: Gothic cathedrals (Notre-Dame, Chartres) - iconic flying arches
// ============================================================================
export const FlyingButtressSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Main wall (clerestory) being supported */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 78 92 L 78 8" strokeWidth={S.P.strokeWidthBold} fill="none" />
      <path d="M 82 92 L 82 8" strokeWidth={S.D.strokeWidth} fill="none" />
      {/* Clerestory window suggestion */}
      <path d="M 80 38 Q 88 28, 80 18" strokeWidth={S.CN.strokeWidth} fill="none" opacity={S.D.opacity} />
    </g>

    {/* CONTEXT (near): Outer pier base */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 12 92 L 12 38" strokeWidth={S.P.strokeWidth} fill="none" />
      <path d="M 16 92 L 16 40" strokeWidth={S.D.strokeWidth} fill="none" />
    </g>

    {/* CONTEXT (near): Aisle roof below */}
    <path d="M 18 72 L 52 62 L 78 72" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacitySubtle} strokeDasharray={S.CN.dash} />

    {/* Ground */}
    <path d="M 5 92 L 95 92" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.CN.opacity} strokeDasharray={S.CF.dash} />

    {/* PRIMARY: THE FLYING BUTTRESS - the "flying" arched struts */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* UPPER FLYER - main structural arch */}
      <path d="M 16 38 Q 46 26, 78 26" strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* LOWER FLYER (double-tier flying buttress) */}
      <path d="M 18 56 Q 46 48, 78 52" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Inner edges of flyers */}
      <path d="M 18 40 Q 46 30, 78 30" strokeWidth={S.P.strokeWidthLight} fill="none" opacity={S.D.opacity} />
      <path d="M 20 58 Q 46 52, 78 54" strokeWidth={S.P.strokeWidthLight} fill="none" opacity={S.D.opacity} />

      {/* PINNACLE on outer pier (adds weight for stability) */}
      <path d="M 12 38 L 12 18" strokeWidth={S.P.strokeWidth} fill="none" />
      <path d="M 8 20 L 12 8 L 16 20" strokeWidth={S.P.strokeWidth} fill="none" strokeLinejoin="round" />
      <path d="M 12 8 L 12 3" strokeWidth={S.P.strokeWidth} fill="none" />

      {/* DETAIL: Crockets on pinnacle */}
      <circle cx="9" cy="16" r="1.5" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacity} />
      <circle cx="15" cy="16" r="1.5" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacity} />
    </g>
  </svg>
)

// ============================================================================
// CUPOLA - Small dome or tower on a roof for light/ventilation
// Reference: Colonial American, Italian villas - crowning roof feature
// ============================================================================
export const CupolaSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Main roof below */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 5 78 L 50 58 L 95 78" strokeWidth={S.P.strokeWidthLight} fill="none" />
      <path d="M 5 82 L 95 82" strokeWidth={S.P.strokeWidthLight} fill="none" />
      {/* Roof continuing behind cupola */}
      <path d="M 28 68 L 28 58" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 72 68 L 72 58" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
    </g>

    {/* PRIMARY: THE CUPOLA - small dome structure on roof */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Base/drum of cupola sitting on roof */}
      <path d="M 30 58 L 30 44" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 70 58 L 70 44" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 30 44 L 70 44" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 30 58 L 70 58" strokeWidth={S.P.strokeWidth} fill="none" opacity={S.D.opacityStrong} />

      {/* DETAIL: Windows/openings in drum */}
      <path d="M 36 54 L 36 46" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 50 54 L 50 46" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 64 54 L 64 46" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />

      {/* Cupola dome */}
      <path d="M 30 44 Q 30 24, 50 18 Q 70 24, 70 44" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Inner dome line */}
      <path d="M 34 42 Q 34 28, 50 22 Q 66 28, 66 42" strokeWidth={S.P.strokeWidthLight} fill="none" opacity={S.D.opacity} />

      {/* DETAIL: Dome ribs */}
      <path d="M 50 18 L 50 42" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.CN.opacity} />
      <path d="M 38 26 L 36 42" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 62 26 L 64 42" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
    </g>

    {/* Finial at apex */}
    <g opacity={S.D.opacityStrong}>
      <path d="M 50 18 L 50 10" strokeWidth={S.P.strokeWidth} fill="none" />
      <circle cx="50" cy="8" r="2.5" strokeWidth={S.P.strokeWidthLight} fill="none" />
    </g>
  </svg>
)

// ============================================================================
// LANTERN - Windowed structure atop a dome admitting light
// Reference: Renaissance domes (Florence Cathedral) - crown of the dome
// ============================================================================
export const LanternSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Dome below lantern */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 8 88 Q 8 58, 50 52 Q 92 58, 92 88" strokeWidth={S.P.strokeWidthLight} fill="none" />
      <path d="M 18 84 Q 18 62, 50 56 Q 82 62, 82 84" strokeWidth={S.D.strokeWidth} fill="none" />
      {/* Dome ribs */}
      <path d="M 50 52 L 50 88" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 30 60 L 25 88" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.CN.opacity} />
      <path d="M 70 60 L 75 88" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.CN.opacity} />
    </g>

    {/* PRIMARY: THE LANTERN - windowed crown structure */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Lantern base/ring on dome */}
      <ellipse cx="50" cy="52" rx="20" ry="5" strokeWidth={S.P.strokeWidth} fill="none" />

      {/* Lantern walls with window bays */}
      <path d="M 30 52 L 30 28" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 70 52 L 70 28" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Window arches (open bays) */}
      <path d="M 34 50 L 34 32 Q 42 26, 50 32 L 50 50" strokeWidth={S.P.strokeWidth} fill="none" />
      <path d="M 50 50 L 50 32 Q 58 26, 66 32 L 66 50" strokeWidth={S.P.strokeWidth} fill="none" />

      {/* DETAIL: Mullions dividing windows */}
      <path d="M 38 48 L 38 34" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacity} />
      <path d="M 46 48 L 46 32" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacity} />
      <path d="M 54 48 L 54 32" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacity} />
      <path d="M 62 48 L 62 34" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacity} />

      {/* Lantern dome/cap */}
      <path d="M 30 28 Q 30 14, 50 10 Q 70 14, 70 28" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <ellipse cx="50" cy="28" rx="20" ry="4" strokeWidth={S.P.strokeWidth} fill="none" opacity={S.D.opacityStrong} />
    </g>

    {/* Finial */}
    <path d="M 50 10 L 50 4" strokeWidth={S.P.strokeWidth} fill="none" opacity={S.D.opacityStrong} />
    <circle cx="50" cy="3" r="2" strokeWidth={S.P.strokeWidthLight} fill="none" opacity={S.D.opacityStrong} />
  </svg>
)

export const ROOF_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'gable': GableSVG,
  'hip-roof': HipRoofSVG,
  'mansard': MansardSVG,
  'buttress': ButtressSVG,
  'flying-buttress': FlyingButtressSVG,
  'cupola': CupolaSVG,
  'lantern': LanternSVG,
}
