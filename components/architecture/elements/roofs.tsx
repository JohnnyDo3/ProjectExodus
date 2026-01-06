'use client'

import React from 'react'

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
// ============================================================================
export const GableSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Building wall below */}
    <g opacity="0.4">
      <path d="M 15 95 L 15 55" strokeWidth="2" fill="none" />
      <path d="M 85 95 L 85 55" strokeWidth="2" fill="none" />
      <path d="M 15 55 L 85 55" strokeWidth="1.5" fill="none" />
    </g>

    {/* THE GABLE - triangular wall end */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Triangular gable shape */}
      <path d="M 15 55 L 50 15 L 85 55" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Rake/verge boards */}
      <path d="M 12 57 L 50 12 L 88 57" strokeWidth="2" fill="none" opacity="0.6" />

      {/* Horizontal courses/siding */}
      <path d="M 22 48 L 78 48" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 28 40 L 72 40" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 35 32 L 65 32" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 42 24 L 58 24" strokeWidth="0.8" fill="none" opacity="0.4" />
    </g>

    {/* Window in gable */}
    <g opacity="0.5">
      <circle cx="50" cy="38" r="6" strokeWidth="1.5" fill="none" />
      <path d="M 50 32 L 50 44" strokeWidth="0.8" fill="none" />
      <path d="M 44 38 L 56 38" strokeWidth="0.8" fill="none" />
    </g>

    {/* Finial at apex */}
    <path d="M 50 15 L 50 8" strokeWidth="2" fill="none" opacity="0.7" />
  </svg>
)

// ============================================================================
// HIP ROOF - Sloped on all four sides
// ============================================================================
export const HipRoofSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Building walls */}
    <g opacity="0.4">
      <path d="M 15 90 L 15 55" strokeWidth="2" fill="none" />
      <path d="M 85 90 L 85 55" strokeWidth="2" fill="none" />
      <path d="M 15 55 L 85 55" strokeWidth="1.5" fill="none" />
    </g>

    {/* HIP ROOF - sloped on all sides, no gable */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Ridge line (shorter than building) */}
      <path d="M 35 20 L 65 20" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Front slope */}
      <path d="M 15 55 L 35 20" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 85 55 L 65 20" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Hip edges (diagonal from corners to ridge ends) */}
      <path d="M 15 55 L 35 20" strokeWidth="2" fill="none" />
      <path d="M 85 55 L 65 20" strokeWidth="2" fill="none" />

      {/* Side slope lines */}
      <path d="M 35 20 L 15 55" strokeWidth="2" fill="none" />
      <path d="M 65 20 L 85 55" strokeWidth="2" fill="none" />

      {/* Eave line */}
      <path d="M 12 55 L 88 55" strokeWidth="2" fill="none" opacity="0.7" />

      {/* Roof surface texture */}
      <path d="M 50 55 L 50 35" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 25 55 L 38 28" strokeWidth="0.6" fill="none" opacity="0.3" />
      <path d="M 75 55 L 62 28" strokeWidth="0.6" fill="none" opacity="0.3" />
    </g>
  </svg>
)

// ============================================================================
// MANSARD - Four-sided with double slope on each side (French)
// ============================================================================
export const MansardSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Building below */}
    <g opacity="0.4">
      <path d="M 10 92 L 10 55" strokeWidth="2" fill="none" />
      <path d="M 90 92 L 90 55" strokeWidth="2" fill="none" />
    </g>

    {/* MANSARD ROOF - steep lower slope, shallow upper slope */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Steep lower slope (nearly vertical) */}
      <path d="M 10 55 L 18 25" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 90 55 L 82 25" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Shallow upper slope */}
      <path d="M 18 25 L 50 15 L 82 25" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Break line between slopes */}
      <path d="M 18 25 L 82 25" strokeWidth="2" fill="none" opacity="0.7" />

      {/* Dormer windows in lower slope (typical) */}
      <g opacity="0.6">
        <path d="M 30 45 L 30 32 L 38 28 L 46 32 L 46 45" strokeWidth="1.5" fill="none" />
        <path d="M 54 45 L 54 32 L 62 28 L 70 32 L 70 45" strokeWidth="1.5" fill="none" />
      </g>

      {/* Slate/tile pattern on steep slope */}
      <path d="M 12 50 L 84 50" strokeWidth="0.6" fill="none" opacity="0.3" />
      <path d="M 14 42 L 82 42" strokeWidth="0.6" fill="none" opacity="0.3" />
      <path d="M 16 34 L 80 34" strokeWidth="0.6" fill="none" opacity="0.3" />
    </g>

    {/* Eave with decorative bracket */}
    <path d="M 8 55 L 92 55" strokeWidth="2" fill="none" opacity="0.5" />
  </svg>
)

// ============================================================================
// BUTTRESS - Projecting support against a wall
// ============================================================================
export const ButtressSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Main wall */}
    <g opacity="0.4">
      <path d="M 60 92 L 60 15" strokeWidth="3" fill="none" />
      <path d="M 63 92 L 63 15" strokeWidth="1" fill="none" />
    </g>

    {/* Ground */}
    <path d="M 5 92 L 95 92" strokeWidth="1" fill="none" opacity="0.3" />

    {/* THE BUTTRESS - projecting masonry support */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Main buttress body - stepped/tapered */}
      <path d="M 15 92 L 15 25" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 60 92 L 15 92" strokeWidth="2.5" fill="none" />

      {/* Tapered/stepped profile */}
      <path d="M 15 25 L 25 22 L 60 22" strokeWidth="2" fill="none" />
      <path d="M 15 45 L 30 42" strokeWidth="2" fill="none" />
      <path d="M 30 92 L 30 42" strokeWidth="2" fill="none" />
      <path d="M 30 42 L 45 38" strokeWidth="1.5" fill="none" />
      <path d="M 45 92 L 45 38" strokeWidth="1.5" fill="none" />
      <path d="M 45 38 L 60 35" strokeWidth="1.2" fill="none" />

      {/* Weathering/coping on top */}
      <path d="M 12 25 L 28 20" strokeWidth="1.5" fill="none" />

      {/* Stone course lines */}
      <path d="M 15 60 L 50 60" strokeWidth="0.6" fill="none" opacity="0.4" />
      <path d="M 15 75 L 55 75" strokeWidth="0.6" fill="none" opacity="0.4" />
    </g>
  </svg>
)

// ============================================================================
// FLYING BUTTRESS - Exterior arched support, Gothic signature
// ============================================================================
export const FlyingButtressSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Main wall (clerestory) */}
    <g opacity="0.4">
      <path d="M 75 92 L 75 10" strokeWidth="3" fill="none" />
      <path d="M 78 92 L 78 10" strokeWidth="1" fill="none" />
      {/* Clerestory window */}
      <path d="M 77 40 Q 85 30, 77 20" strokeWidth="1" fill="none" opacity="0.5" />
    </g>

    {/* Outer pier */}
    <g opacity="0.5">
      <path d="M 15 92 L 15 35" strokeWidth="3" fill="none" />
      <path d="M 18 92 L 18 38" strokeWidth="1.5" fill="none" />
    </g>

    {/* Ground */}
    <path d="M 5 92 L 95 92" strokeWidth="1" fill="none" opacity="0.3" />

    {/* THE FLYING BUTTRESS - the "flying" arch */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Main flying arch (upper) */}
      <path d="M 18 35 Q 45 25, 75 25" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Lower arch (if double flyer) */}
      <path d="M 20 55 Q 45 48, 75 50" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Inner edge of flyers */}
      <path d="M 20 38 Q 45 30, 75 28" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M 22 58 Q 45 52, 75 53" strokeWidth="1.5" fill="none" opacity="0.6" />

      {/* Pinnacle on pier (weight for stability) */}
      <path d="M 15 35 L 15 18" strokeWidth="2" fill="none" />
      <path d="M 12 20 L 15 10 L 18 20" strokeWidth="1.5" fill="none" />
      <path d="M 15 10 L 15 5" strokeWidth="1.5" fill="none" />
    </g>

    {/* Aisle roof suggestion */}
    <path d="M 20 70 L 50 60 L 75 70" strokeWidth="1" fill="none" opacity="0.3" />
  </svg>
)

// ============================================================================
// CUPOLA - Small dome on a roof, often for light/ventilation
// ============================================================================
export const CupolaSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Main roof below */}
    <g opacity="0.4">
      <path d="M 5 75 L 50 55 L 95 75" strokeWidth="2" fill="none" />
      <path d="M 5 80 L 95 80" strokeWidth="1.5" fill="none" />
    </g>

    {/* THE CUPOLA - small dome structure on roof */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Base/drum of cupola */}
      <path d="M 32 55 L 32 42" strokeWidth="2" fill="none" />
      <path d="M 68 55 L 68 42" strokeWidth="2" fill="none" />
      <path d="M 32 42 L 68 42" strokeWidth="2" fill="none" />

      {/* Windows in drum */}
      <path d="M 38 50 L 38 44" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 50 50 L 50 44" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 62 50 L 62 44" strokeWidth="1" fill="none" opacity="0.6" />

      {/* Cupola dome */}
      <path d="M 32 42 Q 32 22, 50 18 Q 68 22, 68 42" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Inner dome line */}
      <path d="M 36 40 Q 36 26, 50 22 Q 64 26, 64 40" strokeWidth="1.5" fill="none" opacity="0.6" />

      {/* Ribs on dome */}
      <path d="M 50 18 L 50 40" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 40 24 L 38 40" strokeWidth="0.6" fill="none" opacity="0.3" />
      <path d="M 60 24 L 62 40" strokeWidth="0.6" fill="none" opacity="0.3" />
    </g>

    {/* Finial */}
    <g opacity="0.8">
      <path d="M 50 18 L 50 10" strokeWidth="2" fill="none" />
      <circle cx="50" cy="8" r="2.5" strokeWidth="1.5" fill="none" />
    </g>
  </svg>
)

// ============================================================================
// LANTERN - Windowed structure atop a dome for light
// ============================================================================
export const LanternSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Dome below */}
    <g opacity="0.4">
      <path d="M 10 85 Q 10 55, 50 50 Q 90 55, 90 85" strokeWidth="2" fill="none" />
      <path d="M 20 80 Q 20 58, 50 54 Q 80 58, 80 80" strokeWidth="1.5" fill="none" />
    </g>

    {/* THE LANTERN - windowed crown on dome */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Lantern base/ring */}
      <ellipse cx="50" cy="50" rx="18" ry="5" strokeWidth="2" fill="none" />

      {/* Lantern walls with windows */}
      <path d="M 32 50 L 32 28" strokeWidth="2" fill="none" />
      <path d="M 68 50 L 68 28" strokeWidth="2" fill="none" />

      {/* Windows (open bays) */}
      <path d="M 36 48 L 36 30 Q 43 26, 50 30 L 50 48" strokeWidth="1.5" fill="none" />
      <path d="M 50 48 L 50 30 Q 57 26, 64 30 L 64 48" strokeWidth="1.5" fill="none" />

      {/* Mullions */}
      <path d="M 40 46 L 40 32" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 46 46 L 46 30" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 54 46 L 54 30" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 60 46 L 60 32" strokeWidth="0.8" fill="none" opacity="0.6" />

      {/* Lantern dome/cap */}
      <path d="M 32 28 Q 32 15, 50 10 Q 68 15, 68 28" strokeWidth="2" fill="none" />
      <ellipse cx="50" cy="28" rx="18" ry="4" strokeWidth="1.5" fill="none" opacity="0.7" />
    </g>

    {/* Finial */}
    <path d="M 50 10 L 50 4" strokeWidth="2" fill="none" opacity="0.8" />
    <circle cx="50" cy="3" r="2" strokeWidth="1.5" fill="none" opacity="0.8" />
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
