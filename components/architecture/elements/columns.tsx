'use client'

import React from 'react'

// Shared Halo Filter for all column SVGs
const HaloFilter = () => (
  <defs>
    <filter id="col-halo" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="0 0 0 0 0.96
                0 0 0 0 0.62
                0 0 0 0 0.04
                0 0 0 0.8 0"
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

// ============================================================================
// DORIC COLUMN - Simplest Greek order, no base, 20 shallow flutes, plain capital
// ============================================================================
export const DoricColumnSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Ground line */}
    <path d="M 15 94 L 85 94" strokeWidth="1" fill="none" opacity="0.3" />

    {/* Column sits directly on stylobate - NO BASE (key Doric feature) */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* Stylobate platform */}
      <path d="M 25 94 L 75 94" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Shaft - stocky proportions (4-6x diameter) */}
      <path d="M 30 94 L 33 25" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 70 94 L 67 25" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* 20 shallow flutes with sharp arrises */}
      <path d="M 36 90 L 38 27" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 42 90 L 43 27" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 48 90 L 48 27" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 54 90 L 53 27" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 60 90 L 58 27" strokeWidth="0.8" fill="none" opacity="0.6" />

      {/* Subtle entasis curve */}
      <path d="M 31 60 Q 29 50 31 40" strokeWidth="0.4" fill="none" opacity="0.3" />
      <path d="M 69 60 Q 71 50 69 40" strokeWidth="0.4" fill="none" opacity="0.3" />
    </g>

    {/* Capital - simple echinus (cushion) + abacus (square slab) */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* Necking */}
      <path d="M 34 25 L 66 25" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Echinus - curved cushion shape */}
      <path d="M 30 22 Q 35 18, 50 17 Q 65 18, 70 22" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 32 20 L 68 20" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Abacus - plain square slab */}
      <path d="M 26 14 L 74 14" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 26 14 L 26 10" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 74 14 L 74 10" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 26 10 L 74 10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// ============================================================================
// IONIC COLUMN - Volute scrolls on capital, has base, 24 deeper flutes
// ============================================================================
export const IonicColumnSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Ground */}
    <path d="M 15 94 L 85 94" strokeWidth="1" fill="none" opacity="0.3" />

    {/* Base - Ionic has elaborate base (key difference from Doric) */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      <path d="M 22 94 L 78 94" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 25 91 L 75 91" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Torus moldings */}
      <path d="M 27 88 Q 50 86, 73 88" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 29 85 L 71 85" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M 30 82 Q 50 80, 70 82" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>

    {/* Shaft - more slender than Doric */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      <path d="M 32 82 L 35 28" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 68 82 L 65 28" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* 24 deeper flutes with flat fillets between */}
      <path d="M 38 78 L 40 30" strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M 44 78 L 45 30" strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M 50 78 L 50 30" strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M 56 78 L 55 30" strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M 62 78 L 60 30" strokeWidth="0.7" fill="none" opacity="0.5" />
    </g>

    {/* Capital - distinctive VOLUTE SCROLLS */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* Echinus with egg-and-dart */}
      <path d="M 33 26 L 67 26" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 35 23 Q 50 21, 65 23" strokeWidth="1" fill="none" opacity="0.6" />

      {/* Volute scrolls - THE defining Ionic feature */}
      <path d="M 30 20 Q 22 18, 18 14 Q 15 10, 18 7 Q 22 4, 28 6 Q 32 8, 32 12"
            strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 70 20 Q 78 18, 82 14 Q 85 10, 82 7 Q 78 4, 72 6 Q 68 8, 68 12"
            strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Inner spiral of volutes */}
      <path d="M 25 10 Q 23 12, 25 14" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 75 10 Q 77 12, 75 14" strokeWidth="1" fill="none" opacity="0.6" />

      {/* Abacus */}
      <path d="M 18 6 L 82 6" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// ============================================================================
// CORINTHIAN COLUMN - Ornate acanthus leaf capital, tallest proportions
// ============================================================================
export const CorinthianColumnSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Ground */}
    <path d="M 15 96 L 85 96" strokeWidth="1" fill="none" opacity="0.3" />

    {/* Elaborate base */}
    <g opacity="0.7">
      <path d="M 24 96 L 76 96" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 27 93 L 73 93" strokeWidth="1.2" fill="none" />
      <path d="M 29 90 Q 50 88, 71 90" strokeWidth="1.2" fill="none" />
      <path d="M 31 87 L 69 87" strokeWidth="1" fill="none" />
    </g>

    {/* Tall slender shaft */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      <path d="M 34 87 L 37 38" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 66 87 L 63 38" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Flutes */}
      <path d="M 40 83 L 42 40" strokeWidth="0.6" fill="none" opacity="0.5" />
      <path d="M 46 83 L 47 40" strokeWidth="0.6" fill="none" opacity="0.5" />
      <path d="M 52 83 L 52 40" strokeWidth="0.6" fill="none" opacity="0.5" />
      <path d="M 58 83 L 57 40" strokeWidth="0.6" fill="none" opacity="0.5" />
    </g>

    {/* Ornate ACANTHUS LEAF capital - THE defining feature */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* Lower row of acanthus leaves */}
      <path d="M 35 38 Q 30 32, 28 28 Q 26 24, 30 22" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 42 38 Q 38 33, 36 28" strokeWidth="1.2" fill="none" opacity="0.8" />
      <path d="M 50 38 Q 50 34, 50 30" strokeWidth="1.2" fill="none" opacity="0.8" />
      <path d="M 58 38 Q 62 33, 64 28" strokeWidth="1.2" fill="none" opacity="0.8" />
      <path d="M 65 38 Q 70 32, 72 28 Q 74 24, 70 22" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Upper row of smaller leaves */}
      <path d="M 38 28 Q 32 22, 30 16" strokeWidth="1.2" fill="none" />
      <path d="M 50 28 Q 50 22, 50 16" strokeWidth="1.2" fill="none" />
      <path d="M 62 28 Q 68 22, 70 16" strokeWidth="1.2" fill="none" />

      {/* Caulicoli (small scrolling stems) */}
      <path d="M 34 18 Q 28 14, 24 12 Q 22 10, 24 8" strokeWidth="1" fill="none" />
      <path d="M 66 18 Q 72 14, 76 12 Q 78 10, 76 8" strokeWidth="1" fill="none" />

      {/* Central flower/rosette at top */}
      <circle cx="50" cy="10" r="3" strokeWidth="1.5" fill="none" />
      <path d="M 50 7 L 50 5" strokeWidth="1" fill="none" />

      {/* Abacus with concave sides */}
      <path d="M 22 6 Q 36 8, 50 6 Q 64 8, 78 6" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// ============================================================================
// COMPOSITE COLUMN - Mix of Ionic volutes + Corinthian acanthus
// ============================================================================
export const CompositeColumnSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Ground */}
    <path d="M 15 96 L 85 96" strokeWidth="1" fill="none" opacity="0.3" />

    {/* Base */}
    <g opacity="0.6">
      <path d="M 24 96 L 76 96" strokeWidth="1.5" fill="none" />
      <path d="M 28 92 Q 50 90, 72 92" strokeWidth="1.2" fill="none" />
      <path d="M 30 88 L 70 88" strokeWidth="1" fill="none" />
    </g>

    {/* Shaft */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      <path d="M 33 88 L 36 36" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 67 88 L 64 36" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Flutes */}
      <path d="M 42 84 L 44 38" strokeWidth="0.6" fill="none" opacity="0.5" />
      <path d="M 50 84 L 50 38" strokeWidth="0.6" fill="none" opacity="0.5" />
      <path d="M 58 84 L 56 38" strokeWidth="0.6" fill="none" opacity="0.5" />
    </g>

    {/* COMPOSITE CAPITAL - combines Ionic + Corinthian */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* Lower acanthus leaves (from Corinthian) */}
      <path d="M 34 36 Q 28 30, 26 26" strokeWidth="1.3" fill="none" />
      <path d="M 42 36 Q 40 32, 38 28" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M 50 36 Q 50 32, 50 28" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M 58 36 Q 60 32, 62 28" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M 66 36 Q 72 30, 74 26" strokeWidth="1.3" fill="none" />

      {/* Ionic volutes at top (distinctive combination) */}
      <path d="M 30 22 Q 22 20, 18 16 Q 15 12, 18 9 Q 22 6, 28 8"
            strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 70 22 Q 78 20, 82 16 Q 85 12, 82 9 Q 78 6, 72 8"
            strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Egg-and-dart between leaves and volutes */}
      <path d="M 32 24 Q 41 22, 50 23 Q 59 22, 68 24" strokeWidth="1" fill="none" opacity="0.6" />

      {/* Abacus */}
      <path d="M 18 6 L 82 6" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// ============================================================================
// TUSCAN COLUMN - Simplest, smooth shaft (no flutes), Roman origin
// ============================================================================
export const TuscanColumnSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Ground */}
    <path d="M 15 94 L 85 94" strokeWidth="1" fill="none" opacity="0.3" />

    {/* Simple base (unlike Doric, Tuscan has a base) */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      <path d="M 22 94 L 78 94" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 26 90 L 74 90" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 28 86 L 72 86" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>

    {/* SMOOTH shaft - NO FLUTES (key Tuscan feature) */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      <path d="M 30 86 L 34 24" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 70 86 L 66 24" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Just subtle shading, no fluting */}
      <path d="M 35 80 L 38 28" strokeWidth="0.5" fill="none" opacity="0.2" />
      <path d="M 65 80 L 62 28" strokeWidth="0.5" fill="none" opacity="0.2" />
    </g>

    {/* Plain capital - very simple */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* Simple necking */}
      <path d="M 35 24 L 65 24" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Simple round molding */}
      <path d="M 30 20 Q 50 18, 70 20" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Plain square abacus */}
      <path d="M 26 16 L 74 16" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 26 16 L 26 10" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 74 16 L 74 10" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 26 10 L 74 10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// ============================================================================
// CARYATID - Female figure serving as column support
// ============================================================================
export const CaryatidSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Ground/base */}
    <path d="M 20 96 L 80 96" strokeWidth="1.5" fill="none" opacity="0.4" />
    <path d="M 25 93 L 75 93" strokeWidth="1.2" fill="none" opacity="0.3" />

    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* Feet on pedestal */}
      <path d="M 38 93 L 38 88" strokeWidth="2" fill="none" />
      <path d="M 62 93 L 62 88" strokeWidth="2" fill="none" />

      {/* Draped dress/chiton - forms column-like body */}
      <path d="M 38 88 L 35 55 Q 34 50, 36 45" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 62 88 L 65 55 Q 66 50, 64 45" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Dress folds (like fluting) */}
      <path d="M 42 86 L 40 52" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M 48 86 L 48 50" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M 54 86 L 54 50" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M 60 86 L 62 52" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* Waist/belt */}
      <path d="M 38 45 Q 50 42, 62 45" strokeWidth="1.5" fill="none" />

      {/* Torso */}
      <path d="M 40 45 L 42 32" strokeWidth="1.8" fill="none" />
      <path d="M 60 45 L 58 32" strokeWidth="1.8" fill="none" />

      {/* Arms at sides or raised to support */}
      <path d="M 42 38 Q 36 35, 32 30" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M 58 38 Q 64 35, 68 30" strokeWidth="1.5" fill="none" opacity="0.7" />

      {/* Neck */}
      <path d="M 46 32 L 46 26" strokeWidth="1.5" fill="none" />
      <path d="M 54 32 L 54 26" strokeWidth="1.5" fill="none" />

      {/* Head - oval shape */}
      <ellipse cx="50" cy="20" rx="8" ry="10" strokeWidth="2" fill="none" />

      {/* Hair/headdress */}
      <path d="M 42 18 Q 40 12, 42 8" strokeWidth="1.2" fill="none" />
      <path d="M 58 18 Q 60 12, 58 8" strokeWidth="1.2" fill="none" />
      <path d="M 44 10 Q 50 6, 56 10" strokeWidth="1" fill="none" />

      {/* Capital basket on head (kalathos) */}
      <path d="M 38 8 L 62 8" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 36 5 L 64 5" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// ============================================================================
// PILASTER - Flat column attached to wall, decorative
// ============================================================================
export const PilasterSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Wall background */}
    <rect x="10" y="5" width="80" height="90" strokeWidth="1" fill="none" opacity="0.2" />
    <path d="M 10 95 L 90 95" strokeWidth="1" fill="none" opacity="0.3" />

    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* Pilaster base projecting from wall */}
      <path d="M 30 95 L 70 95" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 32 91 L 68 91" strokeWidth="1.5" fill="none" />
      <path d="M 34 87 L 66 87" strokeWidth="1.2" fill="none" />

      {/* FLAT shaft against wall (key pilaster feature) */}
      <path d="M 35 87 L 35 22" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 65 87 L 65 22" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Shallow relief fluting on flat surface */}
      <path d="M 42 84 L 42 25" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 50 84 L 50 25" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 58 84 L 58 25" strokeWidth="0.8" fill="none" opacity="0.4" />

      {/* Capital */}
      <path d="M 33 22 L 67 22" strokeWidth="1.5" fill="none" />
      <path d="M 30 18 Q 50 16, 70 18" strokeWidth="1.5" fill="none" />

      {/* Volutes (Ionic style pilaster) */}
      <path d="M 28 15 Q 22 13, 20 10" strokeWidth="1.5" fill="none" />
      <path d="M 72 15 Q 78 13, 80 10" strokeWidth="1.5" fill="none" />

      {/* Abacus */}
      <path d="M 26 10 L 74 10" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 26 6 L 74 6" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Show wall connection */}
    <path d="M 35 50 L 10 50" strokeWidth="0.5" fill="none" opacity="0.2" strokeDasharray="2,2" />
    <path d="M 65 50 L 90 50" strokeWidth="0.5" fill="none" opacity="0.2" strokeDasharray="2,2" />
  </svg>
)

// ============================================================================
// ENTASIS - Subtle convex curve of column shaft (concept illustration)
// ============================================================================
export const EntasisSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Ground */}
    <path d="M 10 94 L 90 94" strokeWidth="1" fill="none" opacity="0.3" />

    {/* Base */}
    <path d="M 25 94 L 75 94" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M 28 90 L 72 90" strokeWidth="1" fill="none" opacity="0.4" />

    {/* Column with EXAGGERATED ENTASIS for illustration */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* Left edge showing the entasis curve */}
      <path d="M 32 90 Q 28 70, 26 50 Q 24 30, 30 15"
            strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Right edge showing the entasis curve */}
      <path d="M 68 90 Q 72 70, 74 50 Q 76 30, 70 15"
            strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Measurement/construction lines showing the curve */}
      <path d="M 24 50 L 76 50" strokeWidth="0.5" fill="none" opacity="0.4" strokeDasharray="3,2" />
      <path d="M 28 30 L 72 30" strokeWidth="0.5" fill="none" opacity="0.4" strokeDasharray="3,2" />
      <path d="M 30 70 L 70 70" strokeWidth="0.5" fill="none" opacity="0.4" strokeDasharray="3,2" />

      {/* Arrows indicating the bulge */}
      <path d="M 20 50 L 24 50" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 20 50 L 22 48" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 20 50 L 22 52" strokeWidth="0.8" fill="none" opacity="0.6" />

      <path d="M 80 50 L 76 50" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 80 50 L 78 48" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 80 50 L 78 52" strokeWidth="0.8" fill="none" opacity="0.6" />
    </g>

    {/* Simple capital */}
    <path d="M 28 15 L 72 15" strokeWidth="1.5" fill="none" opacity="0.6" />
    <path d="M 24 11 L 76 11" strokeWidth="1.5" fill="none" opacity="0.6" />
    <path d="M 22 7 L 78 7" strokeWidth="2" fill="none" opacity="0.6" />

    {/* Label area suggestion */}
    <text x="50" y="60" textAnchor="middle" fontSize="6" opacity="0.4" fill="currentColor">
      entasis
    </text>
  </svg>
)

// Export mapping for easy lookup
export const COLUMN_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'doric-column': DoricColumnSVG,
  'ionic-column': IonicColumnSVG,
  'corinthian-column': CorinthianColumnSVG,
  'composite-column': CompositeColumnSVG,
  'tuscan-column': TuscanColumnSVG,
  'caryatid': CaryatidSVG,
  'pilaster': PilasterSVG,
  'entasis': EntasisSVG,
}
