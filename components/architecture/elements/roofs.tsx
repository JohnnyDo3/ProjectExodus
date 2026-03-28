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
// GABLE - 3/4 bird's-eye isometric view showing two sloping planes
// meeting at a ridge, with the triangular gable end wall visible
// ============================================================================
export const GableSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Building walls visible below roof in 3/4 view */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      {/* Front wall */}
      <path d="M 8 88 L 8 55" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 68 88 L 68 55" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 8 88 L 68 88" strokeWidth={S.D.strokeWidth} />
      {/* Right side wall (3/4 perspective) */}
      <path d="M 68 88 L 92 76" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 68 55 L 92 43" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 92 76 L 92 43" strokeWidth={S.P.strokeWidthLight} />
      {/* Gable end wall triangle (right side) */}
      <path d="M 92 43 L 80 28" strokeWidth={S.CN.strokeWidthFine} />
      <path d="M 68 55 L 80 28" strokeWidth={S.CN.strokeWidthFine} />
    </g>

    {/* PRIMARY: THE GABLE ROOF — 3/4 bird's-eye isometric */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Left (front-facing) roof slope — lighter fill, sun-facing */}
      <path d="M 5 58 L 38 18 L 77 30 L 65 58 Z" fill="currentColor" opacity={0.06} />
      {/* Right (side-facing) roof slope — darker, shadow side */}
      <path d="M 77 30 L 38 18 L 62 6 L 95 18 Z" fill="currentColor" opacity={0.11} />

      {/* Ridge line */}
      <path d="M 38 18 L 77 30" strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      {/* Alternate ridge: from front-left apex to back-right apex */}
      <path d="M 38 18 L 62 6" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} opacity={S.D.opacityStrong} />

      {/* Front slope edges */}
      <path d="M 5 58 L 38 18" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 65 58 L 77 30" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 5 58 L 65 58" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Right slope edges */}
      <path d="M 62 6 L 95 18" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 95 18 L 77 30" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Back edge (partially visible) */}
      <path d="M 62 6 L 5 58" strokeWidth={S.P.strokeWidthLight} opacity={S.D.opacitySubtle} strokeDasharray={S.CN.dash} />

      {/* DETAIL: Shingle rows on front slope */}
      <path d="M 10 54 L 66 54" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 15 48 L 68 50" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 20 42 L 70 45" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 25 36 L 72 40" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 30 30 L 74 35" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 35 24 L 76 32" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />

      {/* DETAIL: Shingle rows on right slope (darker side) */}
      <path d="M 65 8 L 93 16" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 68 11 L 92 19" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 71 14 L 90 21" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 74 17 L 88 23" strokeWidth={S.D.strokeWidthFine} opacity={S.CF.opacity} />

      {/* Ridge tiles highlight */}
      <path d="M 40 18 L 44 19" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 48 20 L 52 21" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 56 22 L 60 23" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 64 24 L 68 25" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 72 27 L 75 28" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
    </g>

    {/* Gable end triangle visible on right side */}
    <g opacity={S.D.opacity}>
      <path d="M 68 55 L 80 28 L 92 43" strokeWidth={S.P.strokeWidthLight} strokeLinejoin="round" />
      {/* Gable window */}
      <circle cx="80" cy="40" r="4" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 80 36 L 80 44" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 76 40 L 84 40" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
    </g>
  </svg>
)

// ============================================================================
// HIP ROOF - 3/4 bird's-eye. ALL four sides slope inward, NO vertical gable
// walls. Ridge shorter than building length. Trapezoidal front, triangular hips.
// ============================================================================
export const HipRoofSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Building walls in 3/4 perspective */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      {/* Front wall */}
      <path d="M 6 86 L 6 56" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 72 86 L 72 56" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 6 86 L 72 86" strokeWidth={S.D.strokeWidth} />
      {/* Right side wall */}
      <path d="M 72 86 L 94 74" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 72 56 L 94 44" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 94 74 L 94 44" strokeWidth={S.P.strokeWidthLight} />
    </g>

    {/* PRIMARY: THE HIP ROOF — all four sides slope, no gable walls */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Front slope (trapezoidal face) — lighter, sun-facing */}
      <path d="M 3 58 L 30 26 L 60 30 L 75 58 Z" fill="currentColor" opacity={0.06} />
      {/* Right slope (triangular hip face) — medium shadow */}
      <path d="M 75 58 L 60 30 L 97 42 Z" fill="currentColor" opacity={0.10} />
      {/* Top/back slope visible — darkest */}
      <path d="M 30 26 L 60 30 L 97 42 L 55 14 Z" fill="currentColor" opacity={0.12} />

      {/* Ridge line (shorter than building — key hip roof feature) */}
      <path d="M 30 26 L 60 30" strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />

      {/* Front slope: left hip edge */}
      <path d="M 3 58 L 30 26" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Front slope: right hip edge */}
      <path d="M 75 58 L 60 30" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Front eave */}
      <path d="M 3 58 L 75 58" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Right slope: front hip edge to right eave corner */}
      <path d="M 97 42 L 75 58" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Right hip: ridge to back-right eave */}
      <path d="M 60 30 L 97 42" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Back ridge extension to back-left hip point */}
      <path d="M 30 26 L 55 14" strokeWidth={S.P.strokeWidth} strokeLinecap={S.P.strokeLinecap} opacity={S.D.opacityStrong} />
      {/* Back-right hip edge */}
      <path d="M 55 14 L 97 42" strokeWidth={S.P.strokeWidth} strokeLinecap={S.P.strokeLinecap} opacity={S.D.opacityStrong} />
      {/* Back-left hip edge (partially hidden) */}
      <path d="M 55 14 L 22 44" strokeWidth={S.P.strokeWidthLight} opacity={S.D.opacitySubtle} strokeDasharray={S.CN.dash} />

      {/* DETAIL: Tile rows on front slope */}
      <path d="M 7 54 L 73 54" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 11 50 L 72 50" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 15 46 L 70 47" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 19 42 L 68 44" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 23 38 L 66 40" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 27 34 L 64 36" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 31 30 L 58 32" strokeWidth={S.E.strokeWidth} opacity={S.CF.opacity} />

      {/* DETAIL: Tile rows on right hip slope */}
      <path d="M 77 54 L 94 44" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 76 50 L 92 42" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 74 46 L 90 39" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 72 42 L 88 36" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 70 38 L 84 33" strokeWidth={S.D.strokeWidthFine} opacity={S.CF.opacity} />

      {/* Ridge tiles */}
      <path d="M 32 26 L 36 27" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 40 27 L 44 28" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 48 28 L 52 29" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 56 29 L 59 30" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
    </g>
  </svg>
)

// ============================================================================
// MANSARD - 3/4 bird's-eye. Double slope: steep near-vertical lower with
// dormers, shallow almost-flat upper. The break line is the defining feature.
// ============================================================================
export const MansardSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Building walls */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      {/* Front wall */}
      <path d="M 6 90 L 6 58" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 68 90 L 68 58" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 6 90 L 68 90" strokeWidth={S.D.strokeWidth} />
      {/* Right side wall (3/4 perspective) */}
      <path d="M 68 90 L 92 78" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 68 58 L 92 46" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 92 78 L 92 46" strokeWidth={S.P.strokeWidthLight} />
    </g>

    {/* PRIMARY: THE MANSARD ROOF — double slope, steep lower + flat upper */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* STEEP LOWER SLOPE fills — front face (lighter) */}
      <path d="M 4 60 L 14 34 L 62 38 L 70 60 Z" fill="currentColor" opacity={0.07} />
      {/* STEEP LOWER SLOPE — right face (darker shadow) */}
      <path d="M 70 60 L 62 38 L 88 26 L 94 46 Z" fill="currentColor" opacity={0.11} />

      {/* SHALLOW UPPER SLOPE fill — nearly flat top seen from above */}
      <path d="M 14 34 L 38 22 L 88 26 L 62 38 Z" fill="currentColor" opacity={0.09} />

      {/* Front eave line */}
      <path d="M 4 60 L 70 60" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Right eave */}
      <path d="M 70 60 L 94 46" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* BREAK LINE — the defining Mansard feature (front) */}
      <path d="M 14 34 L 62 38" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Break line (right side) */}
      <path d="M 62 38 L 88 26" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* STEEP LOWER SLOPE edges — front */}
      <path d="M 4 60 L 14 34" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 70 60 L 62 38" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* STEEP LOWER SLOPE edges — right */}
      <path d="M 94 46 L 88 26" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* SHALLOW UPPER SLOPE edges */}
      <path d="M 14 34 L 38 22" strokeWidth={S.P.strokeWidth} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 88 26 L 38 22" strokeWidth={S.P.strokeWidth} strokeLinecap={S.P.strokeLinecap} opacity={S.D.opacityStrong} />

      {/* Ridge line along top */}
      <path d="M 38 22 L 62 24" strokeWidth={S.P.strokeWidthLight} opacity={S.D.opacityStrong} strokeDasharray={S.CN.dash} />

      {/* DORMERS on front steep slope — with their own small roofs */}
      <g>
        {/* Dormer 1 */}
        <path d="M 20 50 L 20 40 L 26 37 L 32 40 L 32 50" strokeWidth={S.P.strokeWidth} />
        <path d="M 20 40 L 32 40" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        {/* Dormer 1 window */}
        <rect x="23" y="42" width="6" height="7" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M 26 42 L 26 49" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        {/* Dormer 1 shadow on roof */}
        <path d="M 32 50 L 34 48 L 34 40 L 32 40" fill="currentColor" opacity={0.08} stroke="none" />

        {/* Dormer 2 */}
        <path d="M 40 51 L 40 41 L 46 38 L 52 41 L 52 51" strokeWidth={S.P.strokeWidth} />
        <path d="M 40 41 L 52 41" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        {/* Dormer 2 window */}
        <rect x="43" y="43" width="6" height="7" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M 46 43 L 46 50" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        {/* Dormer 2 shadow */}
        <path d="M 52 51 L 54 49 L 54 41 L 52 41" fill="currentColor" opacity={0.08} stroke="none" />
      </g>

      {/* DETAIL: Slate texture rows on steep front slope */}
      <path d="M 6 57 L 69 57" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 8 53 L 67 54" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 10 49 L 65 51" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 12 45 L 63 48" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 13 41 L 61 44" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 14 37 L 60 41" strokeWidth={S.E.strokeWidth} opacity={S.CF.opacity} />

      {/* Slate rows on steep right slope */}
      <path d="M 72 57 L 93 44" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 70 53 L 92 40" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 68 48 L 91 36" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 66 43 L 90 32" strokeWidth={S.D.strokeWidthFine} opacity={S.CF.opacity} />
    </g>
  </svg>
)

// ============================================================================
// CUPOLA - Small domed/polygonal turret sitting ON TOP of a roof for
// ventilation/light. Shows the base roof for context.
// ============================================================================
export const CupolaSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Base roof the cupola sits on — 3/4 bird's-eye hip roof */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      {/* Front roof slope */}
      <path d="M 2 82 L 50 60 L 98 82" strokeWidth={S.P.strokeWidthLight} />
      {/* Back edge of roof visible */}
      <path d="M 50 60 L 75 48" strokeWidth={S.CN.strokeWidthFine} />
      <path d="M 98 82 L 75 48" strokeWidth={S.CN.strokeWidthFine} opacity={S.D.opacitySubtle} />
      {/* Left back edge */}
      <path d="M 2 82 L 25 48" strokeWidth={S.CN.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 25 48 L 75 48" strokeWidth={S.CN.strokeWidthFine} opacity={S.D.opacitySubtle} />
      {/* Roof surface fill */}
      <path d="M 2 82 L 50 60 L 98 82 L 75 48 L 25 48 Z" fill="currentColor" opacity={0.04} stroke="none" />
      {/* Ridge line */}
      <path d="M 25 48 L 50 60" strokeWidth={S.D.strokeWidth} />
      <path d="M 75 48 L 50 60" strokeWidth={S.D.strokeWidth} />
    </g>

    {/* PRIMARY: THE CUPOLA — small domed structure perched on ridge */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Octagonal base/drum sitting on the roof ridge */}
      {/* Front face of drum */}
      <path d="M 36 62 L 36 48 L 64 48 L 64 62" strokeWidth={S.P.strokeWidth} strokeLinecap={S.P.strokeLinecap} />
      {/* Right face of drum (3/4 view) */}
      <path d="M 64 62 L 72 56 L 72 42 L 64 48" strokeWidth={S.P.strokeWidth} strokeLinecap={S.P.strokeLinecap} />
      {/* Top of drum */}
      <path d="M 36 48 L 44 42 L 72 42 L 64 48" strokeWidth={S.P.strokeWidth} strokeLinecap={S.P.strokeLinecap} />
      {/* Base of drum sits on roof */}
      <path d="M 36 62 L 44 56 L 72 56" strokeWidth={S.P.strokeWidthLight} opacity={S.D.opacityStrong} />
      {/* Drum fill for depth */}
      <path d="M 64 62 L 72 56 L 72 42 L 64 48 Z" fill="currentColor" opacity={0.09} stroke="none" />

      {/* DETAIL: Louvered openings in drum (ventilation slats) */}
      <g opacity={S.D.opacity}>
        {/* Front face openings */}
        <path d="M 40 52 L 40 58" strokeWidth={S.D.strokeWidth} />
        <path d="M 44 52 L 44 58" strokeWidth={S.D.strokeWidth} />
        <path d="M 50 52 L 50 58" strokeWidth={S.D.strokeWidth} />
        <path d="M 56 52 L 56 58" strokeWidth={S.D.strokeWidth} />
        <path d="M 60 52 L 60 58" strokeWidth={S.D.strokeWidth} />
        {/* Right face openings */}
        <path d="M 66 50 L 66 55" strokeWidth={S.D.strokeWidthFine} />
        <path d="M 69 48 L 69 53" strokeWidth={S.D.strokeWidthFine} />
      </g>

      {/* Cupola dome (small, polygonal/rounded cap) */}
      <path d="M 36 48 Q 36 32, 50 26 Q 64 32, 64 48" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Right side of dome cap (3/4 view) */}
      <path d="M 64 48 Q 68 36, 58 28" strokeWidth={S.P.strokeWidth} strokeLinecap={S.P.strokeLinecap} opacity={S.D.opacityStrong} />
      {/* Dome shadow side fill */}
      <path d="M 64 48 Q 68 36, 58 28 Q 64 32, 64 48" fill="currentColor" opacity={0.08} stroke="none" />

      {/* Dome ribs */}
      <path d="M 50 26 L 50 46" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 42 32 L 40 46" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 58 32 L 60 46" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
    </g>

    {/* Finial at apex */}
    <g opacity={S.D.opacityStrong}>
      <path d="M 52 26 L 54 16" strokeWidth={S.P.strokeWidth} />
      <circle cx="54" cy="14" r="2.5" strokeWidth={S.P.strokeWidthLight} />
    </g>
  </svg>
)

// ============================================================================
// LANTERN - Windowed tower/turret on a roof with glazed panels for light.
// Distinguished from cupola by emphasized openness and glass panels.
// ============================================================================
export const LanternSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Dome below the lantern in 3/4 bird's-eye */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 6 92 Q 6 64, 50 56 Q 94 64, 94 92" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 16 88 Q 16 68, 50 60 Q 84 68, 84 88" strokeWidth={S.D.strokeWidth} />
      {/* Dome surface fill */}
      <path d="M 6 92 Q 6 64, 50 56 Q 94 64, 94 92 Z" fill="currentColor" opacity={0.04} stroke="none" />
      {/* Dome ribs */}
      <path d="M 50 56 L 50 92" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 30 62 L 24 92" strokeWidth={S.D.strokeWidthFine} opacity={S.CN.opacity} />
      <path d="M 70 62 L 76 92" strokeWidth={S.D.strokeWidthFine} opacity={S.CN.opacity} />
    </g>

    {/* PRIMARY: THE LANTERN — open, windowed crown structure */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Base ring sitting on dome — elliptical in perspective */}
      <ellipse cx="50" cy="56" rx="22" ry="6" strokeWidth={S.P.strokeWidth} />

      {/* Lantern walls — front face */}
      <path d="M 28 56 L 28 30" strokeWidth={S.P.strokeWidth} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 72 56 L 72 30" strokeWidth={S.P.strokeWidth} strokeLinecap={S.P.strokeLinecap} />
      {/* Right face wall (3/4 perspective) */}
      <path d="M 72 56 L 78 52" strokeWidth={S.P.strokeWidthLight} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 72 30 L 78 26" strokeWidth={S.P.strokeWidthLight} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 78 52 L 78 26" strokeWidth={S.P.strokeWidthLight} strokeLinecap={S.P.strokeLinecap} />
      {/* Right face shadow fill */}
      <path d="M 72 56 L 78 52 L 78 26 L 72 30 Z" fill="currentColor" opacity={0.08} stroke="none" />

      {/* GLAZED WINDOW BAYS — the defining open/light feature */}
      {/* Front bay 1 (arched) */}
      <path d="M 32 54 L 32 34 Q 40 28, 48 34 L 48 54" strokeWidth={S.P.strokeWidth} />
      {/* Front bay 2 (arched) */}
      <path d="M 52 54 L 52 34 Q 60 28, 68 34 L 68 54" strokeWidth={S.P.strokeWidth} />

      {/* EFFECTS: Light streaming through glazed panels */}
      <path d="M 34 52 L 34 36" strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate} strokeDasharray={S.E.dash} />
      <path d="M 38 50 L 38 34" strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate} strokeDasharray={S.E.dash} />
      <path d="M 42 50 L 42 32" strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate} strokeDasharray={S.E.dash} />
      <path d="M 46 50 L 46 34" strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate} strokeDasharray={S.E.dash} />
      <path d="M 54 52 L 54 36" strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate} strokeDasharray={S.E.dash} />
      <path d="M 58 50 L 58 34" strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate} strokeDasharray={S.E.dash} />
      <path d="M 62 50 L 62 32" strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate} strokeDasharray={S.E.dash} />
      <path d="M 66 50 L 66 34" strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate} strokeDasharray={S.E.dash} />

      {/* Glass panel fill (light passing through) */}
      <path d="M 32 54 L 32 34 Q 40 28, 48 34 L 48 54 Z" fill="currentColor" opacity={S.E.fillOpacity} stroke="none" />
      <path d="M 52 54 L 52 34 Q 60 28, 68 34 L 68 54 Z" fill="currentColor" opacity={S.E.fillOpacity} stroke="none" />

      {/* DETAIL: Mullions dividing windows */}
      <path d="M 40 52 L 40 30" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
      <path d="M 60 52 L 60 30" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
      {/* Horizontal transoms */}
      <path d="M 32 44 L 48 44" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 52 44 L 68 44" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

      {/* Lantern dome/cap — in 3/4 perspective */}
      <path d="M 28 30 Q 28 16, 50 10 Q 72 16, 72 30" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Right side of cap */}
      <path d="M 72 30 Q 78 20, 62 12" strokeWidth={S.P.strokeWidthLight} opacity={S.D.opacityStrong} />
      {/* Cap shadow fill */}
      <path d="M 72 30 Q 78 20, 62 12 Q 72 16, 72 30" fill="currentColor" opacity={0.08} stroke="none" />
      {/* Cornice ring at cap base */}
      <ellipse cx="50" cy="30" rx="22" ry="5" strokeWidth={S.P.strokeWidthLight} opacity={S.D.opacityStrong} />
    </g>

    {/* Finial */}
    <g opacity={S.D.opacityStrong}>
      <path d="M 52 10 L 54 4" strokeWidth={S.P.strokeWidth} />
      <circle cx="54" cy="3" r="2" strokeWidth={S.P.strokeWidthLight} />
    </g>
  </svg>
)

export const ROOF_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'gable': GableSVG,
  'hip-roof': HipRoofSVG,
  'mansard': MansardSVG,
  'cupola': CupolaSVG,
  'lantern': LanternSVG,
}
