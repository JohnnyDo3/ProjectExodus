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
// Reference: Classic house form, Greek temples - the iconic triangular end wall
// ============================================================================
export const GableSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Building walls and ground - dashed blueprint */}
    <g strokeDasharray="3 2" opacity="0.4">
      <path d="M 12 95 L 12 58" strokeWidth="1.2" fill="none" />
      <path d="M 88 95 L 88 58" strokeWidth="1.2" fill="none" />
      <path d="M 10 95 L 90 95" strokeWidth="0.8" fill="none" />
      {/* Wall below eave */}
      <path d="M 12 58 L 88 58" strokeWidth="1" fill="none" />
    </g>

    {/* CONTEXT: Roof slopes extending from gable - dashed */}
    <g strokeDasharray="3 2" opacity="0.3">
      <path d="M 50 12 L 92 58" strokeWidth="0.8" fill="none" />
      <path d="M 50 12 L 8 58" strokeWidth="0.8" fill="none" />
    </g>

    {/* PRIMARY: THE GABLE - triangular wall end */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Triangular gable shape - the wall filling the triangle */}
      <path d="M 12 58 L 50 14 L 88 58" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Rake/verge boards (trim along roof edge) */}
      <path d="M 9 60 L 50 10 L 91 60" strokeWidth="1.8" fill="none" opacity="0.7" />

      {/* Horizontal courses/siding on gable face */}
      <path d="M 20 50 L 80 50" strokeWidth="0.7" fill="none" opacity="0.4" />
      <path d="M 26 42 L 74 42" strokeWidth="0.7" fill="none" opacity="0.4" />
      <path d="M 32 34 L 68 34" strokeWidth="0.7" fill="none" opacity="0.4" />
      <path d="M 40 26 L 60 26" strokeWidth="0.6" fill="none" opacity="0.35" />
    </g>

    {/* Gable window (typical feature) */}
    <g opacity="0.55">
      <circle cx="50" cy="40" r="7" strokeWidth="1.3" fill="none" />
      <path d="M 50 33 L 50 47" strokeWidth="0.7" fill="none" />
      <path d="M 43 40 L 57 40" strokeWidth="0.7" fill="none" />
    </g>

    {/* Finial at apex */}
    <path d="M 50 14 L 50 6" strokeWidth="1.8" fill="none" opacity="0.7" />
  </svg>
)

// ============================================================================
// HIP ROOF - Sloped on all four sides, no gable ends
// Reference: Georgian houses, prairie style - slopes down to eaves on all sides
// ============================================================================
export const HipRoofSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Building walls - dashed blueprint */}
    <g strokeDasharray="3 2" opacity="0.4">
      <path d="M 12 92 L 12 58" strokeWidth="1.2" fill="none" />
      <path d="M 88 92 L 88 58" strokeWidth="1.2" fill="none" />
      <path d="M 12 58 L 88 58" strokeWidth="1" fill="none" />
      <path d="M 10 92 L 90 92" strokeWidth="0.8" fill="none" />
    </g>

    {/* PRIMARY: THE HIP ROOF - slopes on all sides, no gable */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Ridge line (shorter than building width) */}
      <path d="M 34 20 L 66 20" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Front slope - from eave to ridge */}
      <path d="M 12 58 L 34 20" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M 88 58 L 66 20" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Eave line */}
      <path d="M 10 58 L 90 58" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Hip edges (diagonal from corners to ridge ends) */}
      <path d="M 12 58 L 34 20" strokeWidth="1.8" fill="none" opacity="0.8" />
      <path d="M 88 58 L 66 20" strokeWidth="1.8" fill="none" opacity="0.8" />

      {/* Roof surface lines showing slope */}
      <path d="M 50 58 L 50 35" strokeWidth="0.7" fill="none" opacity="0.4" />
      <path d="M 24 58 L 38 30" strokeWidth="0.6" fill="none" opacity="0.35" />
      <path d="M 76 58 L 62 30" strokeWidth="0.6" fill="none" opacity="0.35" />
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

    {/* CONTEXT: Building walls - dashed blueprint */}
    <g strokeDasharray="3 2" opacity="0.4">
      <path d="M 8 93 L 8 58" strokeWidth="1.2" fill="none" />
      <path d="M 92 93 L 92 58" strokeWidth="1.2" fill="none" />
      <path d="M 8 93 L 92 93" strokeWidth="0.8" fill="none" />
    </g>

    {/* PRIMARY: THE MANSARD ROOF - steep lower slope, shallow upper */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* STEEP LOWER SLOPE (nearly vertical) - the defining feature */}
      <path d="M 8 58 L 18 26" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M 92 58 L 82 26" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* SHALLOW UPPER SLOPE (nearly flat) */}
      <path d="M 18 26 L 50 16 L 82 26" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Break line between slopes (key Mansard detail) */}
      <path d="M 18 26 L 82 26" strokeWidth="1.8" fill="none" opacity="0.7" />

      {/* Eave line */}
      <path d="M 6 58 L 94 58" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Dormers in steep lower slope (very typical) */}
      <g>
        <path d="M 28 48 L 28 34 L 36 30 L 44 34 L 44 48" strokeWidth="1.4" fill="none" opacity="0.65" />
        <path d="M 56 48 L 56 34 L 64 30 L 72 34 L 72 48" strokeWidth="1.4" fill="none" opacity="0.65" />
        {/* Dormer windows */}
        <path d="M 32 46 L 32 36" strokeWidth="0.6" fill="none" opacity="0.45" />
        <path d="M 40 46 L 40 36" strokeWidth="0.6" fill="none" opacity="0.45" />
        <path d="M 60 46 L 60 36" strokeWidth="0.6" fill="none" opacity="0.45" />
        <path d="M 68 46 L 68 36" strokeWidth="0.6" fill="none" opacity="0.45" />
      </g>

      {/* Slate/tile pattern on steep slope */}
      <path d="M 10 52 L 86 52" strokeWidth="0.5" fill="none" opacity="0.3" />
      <path d="M 12 44 L 84 44" strokeWidth="0.5" fill="none" opacity="0.3" />
      <path d="M 15 36 L 81 36" strokeWidth="0.5" fill="none" opacity="0.25" />
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

    {/* CONTEXT: Main wall being supported - dashed blueprint */}
    <g strokeDasharray="3 2" opacity="0.4">
      <path d="M 62 92 L 62 12" strokeWidth="1.8" fill="none" />
      <path d="M 66 92 L 66 12" strokeWidth="0.8" fill="none" />
      {/* Wall section above */}
      <path d="M 62 12 L 92 12" strokeWidth="0.8" fill="none" />
    </g>

    {/* Ground line */}
    <path d="M 5 92 L 95 92" strokeWidth="0.8" fill="none" opacity="0.4" strokeDasharray="4 2" />

    {/* PRIMARY: THE BUTTRESS - projecting masonry support */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Main buttress body */}
      <path d="M 14 92 L 14 24" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Base spread on ground */}
      <path d="M 14 92 L 62 92" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Stepped/tapered profile (buttress gets narrower going up) */}
      {/* First setback */}
      <path d="M 14 24 L 26 22 L 62 22" strokeWidth="1.8" fill="none" strokeLinejoin="round" />

      {/* Second step */}
      <path d="M 14 48 L 32 44" strokeWidth="1.6" fill="none" />
      <path d="M 32 92 L 32 44" strokeWidth="1.6" fill="none" />
      <path d="M 32 44 L 62 40" strokeWidth="1.4" fill="none" />

      {/* Third step */}
      <path d="M 32 68 L 46 64" strokeWidth="1.4" fill="none" />
      <path d="M 46 92 L 46 64" strokeWidth="1.3" fill="none" />
      <path d="M 46 64 L 62 60" strokeWidth="1.2" fill="none" />

      {/* Weathering/coping on top */}
      <path d="M 11 24 L 28 18" strokeWidth="1.4" fill="none" />

      {/* Stone course lines */}
      <path d="M 14 55 L 50 55" strokeWidth="0.5" fill="none" opacity="0.35" />
      <path d="M 14 72 L 55 72" strokeWidth="0.5" fill="none" opacity="0.35" />
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

    {/* CONTEXT: Main wall (clerestory) being supported - dashed blueprint */}
    <g strokeDasharray="3 2" opacity="0.4">
      <path d="M 78 92 L 78 8" strokeWidth="2" fill="none" />
      <path d="M 82 92 L 82 8" strokeWidth="0.8" fill="none" />
      {/* Clerestory window suggestion */}
      <path d="M 80 38 Q 88 28, 80 18" strokeWidth="0.7" fill="none" opacity="0.6" />
    </g>

    {/* CONTEXT: Outer pier base - dashed blueprint */}
    <g strokeDasharray="3 2" opacity="0.4">
      <path d="M 12 92 L 12 38" strokeWidth="1.8" fill="none" />
      <path d="M 16 92 L 16 40" strokeWidth="0.9" fill="none" />
    </g>

    {/* CONTEXT: Aisle roof below - dashed */}
    <path d="M 18 72 L 52 62 L 78 72" strokeWidth="0.8" fill="none" opacity="0.3" strokeDasharray="3 2" />

    {/* Ground */}
    <path d="M 5 92 L 95 92" strokeWidth="0.8" fill="none" opacity="0.4" strokeDasharray="4 2" />

    {/* PRIMARY: THE FLYING BUTTRESS - the "flying" arched struts */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* UPPER FLYER - main structural arch */}
      <path d="M 16 38 Q 46 26, 78 26" strokeWidth="2.8" fill="none" strokeLinecap="round" />

      {/* LOWER FLYER (double-tier flying buttress) */}
      <path d="M 18 56 Q 46 48, 78 52" strokeWidth="2.4" fill="none" strokeLinecap="round" />

      {/* Inner edges of flyers */}
      <path d="M 18 40 Q 46 30, 78 30" strokeWidth="1.3" fill="none" opacity="0.55" />
      <path d="M 20 58 Q 46 52, 78 54" strokeWidth="1.1" fill="none" opacity="0.5" />

      {/* PINNACLE on outer pier (adds weight for stability) */}
      <path d="M 12 38 L 12 18" strokeWidth="1.8" fill="none" />
      <path d="M 8 20 L 12 8 L 16 20" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
      <path d="M 12 8 L 12 3" strokeWidth="1.4" fill="none" />

      {/* Crockets on pinnacle */}
      <circle cx="9" cy="16" r="1.5" strokeWidth="0.7" fill="none" opacity="0.5" />
      <circle cx="15" cy="16" r="1.5" strokeWidth="0.7" fill="none" opacity="0.5" />
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

    {/* CONTEXT: Main roof below - dashed blueprint */}
    <g strokeDasharray="3 2" opacity="0.4">
      <path d="M 5 78 L 50 58 L 95 78" strokeWidth="1.2" fill="none" />
      <path d="M 5 82 L 95 82" strokeWidth="1" fill="none" />
      {/* Roof continuing behind cupola */}
      <path d="M 28 68 L 28 58" strokeWidth="0.6" fill="none" opacity="0.6" />
      <path d="M 72 68 L 72 58" strokeWidth="0.6" fill="none" opacity="0.6" />
    </g>

    {/* PRIMARY: THE CUPOLA - small dome structure on roof */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Base/drum of cupola sitting on roof */}
      <path d="M 30 58 L 30 44" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 70 58 L 70 44" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 30 44 L 70 44" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 30 58 L 70 58" strokeWidth="1.6" fill="none" opacity="0.7" />

      {/* Windows/openings in drum */}
      <path d="M 36 54 L 36 46" strokeWidth="0.9" fill="none" opacity="0.55" />
      <path d="M 50 54 L 50 46" strokeWidth="0.9" fill="none" opacity="0.55" />
      <path d="M 64 54 L 64 46" strokeWidth="0.9" fill="none" opacity="0.55" />

      {/* Cupola dome */}
      <path d="M 30 44 Q 30 24, 50 18 Q 70 24, 70 44" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Inner dome line */}
      <path d="M 34 42 Q 34 28, 50 22 Q 66 28, 66 42" strokeWidth="1.3" fill="none" opacity="0.55" />

      {/* Dome ribs */}
      <path d="M 50 18 L 50 42" strokeWidth="0.7" fill="none" opacity="0.4" />
      <path d="M 38 26 L 36 42" strokeWidth="0.5" fill="none" opacity="0.3" />
      <path d="M 62 26 L 64 42" strokeWidth="0.5" fill="none" opacity="0.3" />
    </g>

    {/* Finial at apex */}
    <g opacity="0.8">
      <path d="M 50 18 L 50 10" strokeWidth="1.8" fill="none" />
      <circle cx="50" cy="8" r="2.5" strokeWidth="1.3" fill="none" />
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

    {/* CONTEXT: Dome below lantern - dashed blueprint */}
    <g strokeDasharray="3 2" opacity="0.4">
      <path d="M 8 88 Q 8 58, 50 52 Q 92 58, 92 88" strokeWidth="1.2" fill="none" />
      <path d="M 18 84 Q 18 62, 50 56 Q 82 62, 82 84" strokeWidth="0.9" fill="none" />
      {/* Dome ribs */}
      <path d="M 50 52 L 50 88" strokeWidth="0.6" fill="none" opacity="0.5" />
      <path d="M 30 60 L 25 88" strokeWidth="0.5" fill="none" opacity="0.4" />
      <path d="M 70 60 L 75 88" strokeWidth="0.5" fill="none" opacity="0.4" />
    </g>

    {/* PRIMARY: THE LANTERN - windowed crown structure */}
    <g filter={showHalo ? "url(#roof-halo)" : undefined}>
      {/* Lantern base/ring on dome */}
      <ellipse cx="50" cy="52" rx="20" ry="5" strokeWidth="1.8" fill="none" />

      {/* Lantern walls with window bays */}
      <path d="M 30 52 L 30 28" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 70 52 L 70 28" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Window arches (open bays) */}
      <path d="M 34 50 L 34 32 Q 42 26, 50 32 L 50 50" strokeWidth="1.4" fill="none" />
      <path d="M 50 50 L 50 32 Q 58 26, 66 32 L 66 50" strokeWidth="1.4" fill="none" />

      {/* Mullions dividing windows */}
      <path d="M 38 48 L 38 34" strokeWidth="0.7" fill="none" opacity="0.55" />
      <path d="M 46 48 L 46 32" strokeWidth="0.7" fill="none" opacity="0.55" />
      <path d="M 54 48 L 54 32" strokeWidth="0.7" fill="none" opacity="0.55" />
      <path d="M 62 48 L 62 34" strokeWidth="0.7" fill="none" opacity="0.55" />

      {/* Lantern dome/cap */}
      <path d="M 30 28 Q 30 14, 50 10 Q 70 14, 70 28" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="28" rx="20" ry="4" strokeWidth="1.4" fill="none" opacity="0.65" />
    </g>

    {/* Finial */}
    <path d="M 50 10 L 50 4" strokeWidth="1.8" fill="none" opacity="0.8" />
    <circle cx="50" cy="3" r="2" strokeWidth="1.3" fill="none" opacity="0.8" />
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
