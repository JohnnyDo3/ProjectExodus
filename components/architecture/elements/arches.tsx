'use client'

import React from 'react'
import { MaterialPatterns } from './materialPatterns'

// Shared Halo Filter
const HaloFilter = () => (
  <defs>
    <filter id="arch-halo" x="-50%" y="-50%" width="200%" height="200%">
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
// ROUND ARCH - Classic semicircular Roman/Romanesque arch
// Reference: Roman aqueducts, Colosseum - perfect semicircle, radiating voussoirs
// ============================================================================
export const RoundArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <MaterialPatterns />
    <HaloFilter />

    {/* CONTEXT: Ground line and wall continuation - stone floor */}
    <g opacity="0.25" strokeWidth="0.35">
      <rect x="5" y="92" width="90" height="8" fill="url(#stone-smooth)" opacity="0.15" stroke="none" />
      <path d="M 5 94 L 95 94" strokeDasharray="4 2" />
    </g>

    {/* CONTEXT: Supporting piers/jambs - solid stone with texture */}
    <g opacity="0.3">
      {/* Left pier with stone texture */}
      <rect x="15" y="48" width="5" height="46" fill="url(#stone-smooth)" opacity="0.2" stroke="none" />
      <path d="M 15 94 L 15 48" strokeWidth="1.8" fill="none" />
      <path d="M 20 94 L 20 48" strokeWidth="1.2" fill="none" opacity="0.6" />
      {/* Right pier with stone texture */}
      <rect x="80" y="48" width="5" height="46" fill="url(#stone-smooth)" opacity="0.2" stroke="none" />
      <path d="M 85 94 L 85 48" strokeWidth="1.8" fill="none" />
      <path d="M 80 94 L 80 48" strokeWidth="1.2" fill="none" opacity="0.6" />
    </g>

    {/* PRIMARY: THE ROUND ARCH - STONE MATERIAL with detailed voussoirs */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Stone material texture on arch */}
      <path d="M 17 48 Q 17 12, 50 12 Q 83 12, 83 48" fill="url(#stone-smooth)" opacity="0.25" stroke="none" />

      {/* Extrados - outer curve of arch - BOLD */}
      <path d="M 15 48 Q 15 8, 50 8 Q 85 8, 85 48"
            strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Intrados - inner curve of arch */}
      <path d="M 20 48 Q 20 16, 50 16 Q 80 16, 80 48"
            strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Depth shadow on inner arch */}
      <path d="M 21 48 Q 21 17, 50 17 Q 79 17, 79 48"
            strokeWidth="0.6" fill="none" opacity="0.2" />

      {/* Voussoir lines radiating from center - ENHANCED with depth */}
      <path d="M 22 42 L 26 34" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M 22.5 42 L 26.5 34" strokeWidth="0.4" fill="none" opacity="0.3" />
      <path d="M 28 32 L 34 24" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M 28.5 32 L 34.5 24" strokeWidth="0.4" fill="none" opacity="0.3" />
      <path d="M 38 22 L 44 14" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M 38.5 22 L 44.5 14" strokeWidth="0.4" fill="none" opacity="0.3" />
      <path d="M 56 14 L 62 22" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M 56.5 14 L 62.5 22" strokeWidth="0.4" fill="none" opacity="0.3" />
      <path d="M 66 24 L 72 32" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M 66.5 24 L 72.5 32" strokeWidth="0.4" fill="none" opacity="0.3" />
      <path d="M 74 34 L 78 42" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M 74.5 34 L 78.5 42" strokeWidth="0.4" fill="none" opacity="0.3" />

      {/* THE KEYSTONE at crown - central wedge stone with DETAIL */}
      <path d="M 44 10 L 46 8 L 54 8 L 56 10" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <path d="M 46 14 L 46 9" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 54 14 L 54 9" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 48 9 L 52 9" strokeWidth="0.5" fill="none" opacity="0.5" />

      {/* Impost blocks where arch springs from piers */}
      <path d="M 12 48 L 23 48" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 77 48 L 88 48" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 14 46 L 21 46" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 79 46 L 86 46" strokeWidth="1" fill="none" opacity="0.6" />
    </g>
  </svg>
)

// ============================================================================
// POINTED ARCH - Gothic arch with two curves meeting at a point (lancet form)
// Reference: Notre-Dame, Chartres - vertical emphasis, dramatic height
// ============================================================================
export const PointedArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Ground and supporting piers - dashed */}
    <path d="M 5 94 L 95 94" strokeWidth="0.8" fill="none" opacity="0.4" strokeDasharray="4 2" />
    <g opacity="0.4" strokeDasharray="3 2">
      <path d="M 18 94 L 18 52" strokeWidth="1.5" fill="none" />
      <path d="M 24 94 L 24 52" strokeWidth="1" fill="none" />
      <path d="M 82 94 L 82 52" strokeWidth="1.5" fill="none" />
      <path d="M 76 94 L 76 52" strokeWidth="1" fill="none" />
    </g>

    {/* PRIMARY: THE POINTED ARCH - two arcs meeting at apex */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Left curve rising to point - extrados */}
      <path d="M 18 52 Q 22 28, 50 6" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* Right curve rising to point - extrados */}
      <path d="M 82 52 Q 78 28, 50 6" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Intrados curves */}
      <path d="M 24 52 Q 28 30, 50 12" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 76 52 Q 72 30, 50 12" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Voussoirs following pointed curve */}
      <path d="M 26 46 L 30 38" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 34 34 L 40 26" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 60 26 L 66 34" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 70 38 L 74 46" strokeWidth="0.8" fill="none" opacity="0.6" />

      {/* Pointed keystone at apex */}
      <path d="M 44 14 L 50 5 L 56 14" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 46 10 L 50 6 L 54 10" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* Impost moldings */}
      <path d="M 14 52 L 27 52" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 73 52 L 86 52" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// ============================================================================
// HORSESHOE ARCH - Extends past semicircle before springing (Moorish/Islamic)
// Reference: Great Mosque of Córdoba - distinctive inward curve at base
// ============================================================================
export const HorseshoeArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Ground and piers - dashed */}
    <path d="M 5 94 L 95 94" strokeWidth="0.8" fill="none" opacity="0.4" strokeDasharray="4 2" />
    {/* Piers are set INWARD because the arch extends past vertical */}
    <g opacity="0.4" strokeDasharray="3 2">
      <path d="M 25 94 L 25 58" strokeWidth="1.5" fill="none" />
      <path d="M 30 94 L 30 58" strokeWidth="1" fill="none" />
      <path d="M 75 94 L 75 58" strokeWidth="1.5" fill="none" />
      <path d="M 70 94 L 70 58" strokeWidth="1" fill="none" />
    </g>

    {/* PRIMARY: THE HORSESHOE ARCH - curves PAST vertical before springing */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Key feature: arch extends INWARD past the piers before curving up */}
      {/* Extrados */}
      <path d="M 25 58 Q 16 58, 14 48 Q 10 32, 20 18 Q 32 6, 50 6 Q 68 6, 80 18 Q 90 32, 86 48 Q 84 58, 75 58"
            strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Intrados */}
      <path d="M 30 55 Q 22 55, 20 46 Q 16 34, 26 22 Q 36 12, 50 12 Q 64 12, 74 22 Q 84 34, 80 46 Q 78 55, 70 55"
            strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Alternating voussoirs (typical of Moorish style - red/white pattern) */}
      <path d="M 21 52 L 24 44" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 25 40 L 30 32" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 34 26 L 42 18" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 58 18 L 66 26" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 70 32 L 75 40" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 76 44 L 79 52" strokeWidth="1" fill="none" opacity="0.6" />

      {/* Keystone */}
      <path d="M 45 8 L 50 5 L 55 8" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M 46 10 L 54 10" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Impost/capital decoration */}
      <path d="M 20 58 L 33 58" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 67 58 L 80 58" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// ============================================================================
// OGEE ARCH - S-curves (concave then convex) meeting at a point (Late Gothic)
// Reference: English Decorated Gothic, Indian Islamic - flowing S-curves with finial
// ============================================================================
export const OgeeArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Ground and piers - dashed */}
    <path d="M 5 94 L 95 94" strokeWidth="0.8" fill="none" opacity="0.4" strokeDasharray="4 2" />
    <g opacity="0.4" strokeDasharray="3 2">
      <path d="M 18 94 L 18 58" strokeWidth="1.5" fill="none" />
      <path d="M 82 94 L 82 58" strokeWidth="1.5" fill="none" />
    </g>

    {/* PRIMARY: THE OGEE ARCH - S-curve (concave out, then convex to point) */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Left ogee: concave curve outward, then convex curve to point */}
      <path d="M 18 58 Q 10 48, 16 38 Q 24 26, 50 6"
            strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* Right ogee: mirror */}
      <path d="M 82 58 Q 90 48, 84 38 Q 76 26, 50 6"
            strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Inner ogee curves */}
      <path d="M 24 58 Q 17 50, 22 40 Q 30 28, 50 12"
            strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M 76 58 Q 83 50, 78 40 Q 70 28, 50 12"
            strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* Finial at apex (common on ogee arches) */}
      <path d="M 50 6 L 50 2" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="2" r="2" strokeWidth="1.2" fill="none" />

      {/* Crockets along the curve (Gothic decoration) */}
      <circle cx="18" cy="44" r="2" strokeWidth="0.8" fill="none" opacity="0.5" />
      <circle cx="30" cy="28" r="2" strokeWidth="0.8" fill="none" opacity="0.5" />
      <circle cx="70" cy="28" r="2" strokeWidth="0.8" fill="none" opacity="0.5" />
      <circle cx="82" cy="44" r="2" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* Imposts */}
      <path d="M 14 58 L 27 58" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 73 58 L 86 58" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// ============================================================================
// TREFOIL ARCH - Three overlapping arcs/lobes (Gothic decorative)
// Reference: Gothic tracery windows, cathedral portals - three-leaf clover shape
// ============================================================================
export const TrefoilArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Ground and outer frame - dashed */}
    <path d="M 5 94 L 95 94" strokeWidth="0.8" fill="none" opacity="0.4" strokeDasharray="4 2" />
    {/* Outer containing arch - context */}
    <path d="M 18 58 Q 8 32, 24 14 Q 38 2, 50 2 Q 62 2, 76 14 Q 92 32, 82 58"
          strokeWidth="1" fill="none" opacity="0.35" strokeDasharray="3 2" />
    <g opacity="0.4" strokeDasharray="3 2">
      <path d="M 18 94 L 18 58" strokeWidth="1.2" fill="none" />
      <path d="M 82 94 L 82 58" strokeWidth="1.2" fill="none" />
    </g>

    {/* PRIMARY: THE TREFOIL - Three lobes/foils */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Left lobe */}
      <path d="M 18 58 Q 12 48, 18 38 Q 24 28, 36 32 Q 42 36, 40 44"
            strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Right lobe */}
      <path d="M 82 58 Q 88 48, 82 38 Q 76 28, 64 32 Q 58 36, 60 44"
            strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Center/bottom lobe connecting left and right */}
      <path d="M 40 44 Q 36 52, 44 58 Q 50 62, 56 58 Q 64 52, 60 44"
            strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Top lobe arching up */}
      <path d="M 36 36 Q 38 20, 50 14 Q 62 20, 64 36"
            strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Cusps where lobes meet - decorative points */}
      <path d="M 38 42 L 40 38 L 42 42" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M 58 42 L 60 38 L 62 42" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M 48 54 L 50 50 L 52 54" strokeWidth="1" fill="none" opacity="0.7" />

      {/* Finial at top */}
      <path d="M 50 14 L 50 8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 47 8 L 50 4 L 53 8" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
    </g>
  </svg>
)

// ============================================================================
// TUDOR ARCH - Flattened pointed arch with 4 centers (English late Gothic)
// Reference: Hampton Court Palace - wide, shallow point, very English
// ============================================================================
export const TudorArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Ground and piers - dashed */}
    <path d="M 5 94 L 95 94" strokeWidth="0.8" fill="none" opacity="0.4" strokeDasharray="4 2" />
    <g opacity="0.4" strokeDasharray="3 2">
      <path d="M 10 94 L 10 48" strokeWidth="1.5" fill="none" />
      <path d="M 16 94 L 16 48" strokeWidth="1" fill="none" />
      <path d="M 90 94 L 90 48" strokeWidth="1.5" fill="none" />
      <path d="M 84 94 L 84 48" strokeWidth="1" fill="none" />
    </g>

    {/* CONTEXT: Spandrel decoration (Tudor rose motif) - dashed */}
    <circle cx="24" cy="32" r="5" strokeWidth="0.6" fill="none" opacity="0.3" strokeDasharray="2 2" />
    <circle cx="76" cy="32" r="5" strokeWidth="0.6" fill="none" opacity="0.3" strokeDasharray="2 2" />

    {/* PRIMARY: THE TUDOR ARCH - wide, 4-centered flattened pointed arch */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Lower curves (large radius, nearly horizontal) - extrados */}
      <path d="M 10 48 Q 20 44, 36 40" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M 90 48 Q 80 44, 64 40" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Upper curves (small radius, meeting at shallow point) - extrados */}
      <path d="M 36 40 Q 44 32, 50 30" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M 64 40 Q 56 32, 50 30" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Intrados */}
      <path d="M 16 48 Q 24 45, 38 42" strokeWidth="1.6" fill="none" />
      <path d="M 84 48 Q 76 45, 62 42" strokeWidth="1.6" fill="none" />
      <path d="M 38 42 Q 45 36, 50 34" strokeWidth="1.6" fill="none" />
      <path d="M 62 42 Q 55 36, 50 34" strokeWidth="1.6" fill="none" />

      {/* Voussoirs */}
      <path d="M 20 47 L 24 42" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 40 41 L 44 36" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 56 36 L 60 41" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 76 42 L 80 47" strokeWidth="0.8" fill="none" opacity="0.6" />

      {/* Shallow pointed keystone */}
      <path d="M 46 32 L 50 28 L 54 32" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <path d="M 47 34 L 53 34" strokeWidth="1" fill="none" opacity="0.6" />

      {/* Imposts with Tudor molding */}
      <path d="M 6 48 L 19 48" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 81 48 L 94 48" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// ============================================================================
// KEYSTONE - Central wedge-shaped stone at arch apex locking voussoirs together
// Reference: Any proper arch - the critical stone that transfers load to sides
// ============================================================================
export const KeystoneSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Partial arch showing position - dashed */}
    <g opacity="0.4" strokeDasharray="3 2">
      {/* Left side of arch */}
      <path d="M 8 88 Q 8 52, 30 30" strokeWidth="1.2" fill="none" />
      <path d="M 16 88 Q 16 56, 36 36" strokeWidth="1" fill="none" />

      {/* Right side of arch */}
      <path d="M 92 88 Q 92 52, 70 30" strokeWidth="1.2" fill="none" />
      <path d="M 84 88 Q 84 56, 64 36" strokeWidth="1" fill="none" />

      {/* Adjacent voussoirs */}
      <path d="M 30 30 L 36 36 L 40 26 L 34 22 Z" strokeWidth="0.8" fill="none" />
      <path d="M 70 30 L 64 36 L 60 26 L 66 22 Z" strokeWidth="0.8" fill="none" />

      {/* Pier suggestions */}
      <path d="M 8 88 L 8 95" strokeWidth="1" fill="none" />
      <path d="M 92 88 L 92 95" strokeWidth="1" fill="none" />
    </g>

    {/* Ground */}
    <path d="M 5 95 L 95 95" strokeWidth="0.8" fill="none" opacity="0.4" strokeDasharray="4 2" />

    {/* PRIMARY: THE KEYSTONE - central wedge-shaped stone */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Keystone shape - wider at top (extrados), narrower at bottom (intrados) */}
      <path d="M 40 26 L 44 10 L 56 10 L 60 26 L 54 38 L 46 38 Z"
            strokeWidth="2" fill="none" strokeLinejoin="round" />

      {/* Decorative carving on keystone face (common embellishment) */}
      <path d="M 48 14 L 50 11 L 52 14" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      <path d="M 46 21 L 50 17 L 54 21" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M 47 28 L 50 25 L 53 28" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* Joint lines showing wedge action */}
      <path d="M 40 26 L 46 38" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 60 26 L 54 38" strokeWidth="1" fill="none" opacity="0.6" />
    </g>

    {/* Force arrows showing compression into keystone - illustrative dashed */}
    <g opacity="0.45" strokeDasharray="2 1">
      <path d="M 28 46 L 44 34" strokeWidth="0.8" fill="none" />
      <path d="M 44 34 L 42 36" strokeWidth="0.6" fill="none" />
      <path d="M 44 34 L 46 37" strokeWidth="0.6" fill="none" />

      <path d="M 72 46 L 56 34" strokeWidth="0.8" fill="none" />
      <path d="M 56 34 L 54 37" strokeWidth="0.6" fill="none" />
      <path d="M 56 34 L 58 36" strokeWidth="0.6" fill="none" />
    </g>
  </svg>
)

// ============================================================================
// VOUSSOIR - Wedge-shaped stones/bricks forming an arch ring
// Reference: Any masonry arch - the individual wedge-shaped units
// ============================================================================
export const VoussoirSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Ground and piers - dashed */}
    <path d="M 5 92 L 95 92" strokeWidth="0.8" fill="none" opacity="0.4" strokeDasharray="4 2" />
    <g opacity="0.35" strokeDasharray="3 2">
      <path d="M 10 92 L 10 78" strokeWidth="1.2" fill="none" />
      <path d="M 90 92 L 90 78" strokeWidth="1.2" fill="none" />
    </g>

    {/* PRIMARY: Multiple VOUSSOIRS forming arch - each wedge is solid */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Left springer voussoir (first stone off pier) */}
      <path d="M 10 78 L 14 64 L 24 60 L 26 72 Z"
            strokeWidth="1.8" fill="none" strokeLinejoin="round" />

      {/* Second voussoir */}
      <path d="M 14 64 L 22 52 L 32 50 L 28 62 Z"
            strokeWidth="1.6" fill="none" strokeLinejoin="round" />

      {/* Third voussoir */}
      <path d="M 22 52 L 32 42 L 42 42 L 36 52 Z"
            strokeWidth="1.6" fill="none" strokeLinejoin="round" />

      {/* Fourth voussoir (approaching keystone) */}
      <path d="M 32 42 L 42 34 L 48 36 L 42 44 Z"
            strokeWidth="1.6" fill="none" strokeLinejoin="round" />

      {/* KEYSTONE at center - emphasized */}
      <path d="M 42 34 L 47 28 L 53 28 L 58 34 L 52 38 L 48 38 Z"
            strokeWidth="2" fill="none" strokeLinejoin="round" />

      {/* Mirror voussoirs on right side */}
      <path d="M 52 36 L 58 34 L 68 42 L 58 44 Z"
            strokeWidth="1.6" fill="none" strokeLinejoin="round" />

      <path d="M 64 42 L 68 42 L 78 52 L 68 52 Z"
            strokeWidth="1.6" fill="none" strokeLinejoin="round" />

      <path d="M 72 62 L 78 52 L 86 64 L 78 64 Z"
            strokeWidth="1.6" fill="none" strokeLinejoin="round" />

      <path d="M 74 72 L 76 60 L 86 64 L 90 78 Z"
            strokeWidth="1.8" fill="none" strokeLinejoin="round" />
    </g>

    {/* Joint lines within voussoirs - subtle detail */}
    <g opacity="0.3">
      <path d="M 14 64 L 26 72" strokeWidth="0.5" fill="none" />
      <path d="M 22 52 L 28 62" strokeWidth="0.5" fill="none" />
      <path d="M 32 42 L 36 52" strokeWidth="0.5" fill="none" />
      <path d="M 68 42 L 64 52" strokeWidth="0.5" fill="none" />
      <path d="M 78 52 L 72 62" strokeWidth="0.5" fill="none" />
      <path d="M 86 64 L 74 72" strokeWidth="0.5" fill="none" />
    </g>
  </svg>
)

// Export mapping for easy lookup
export const ARCH_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'round-arch': RoundArchSVG,
  'pointed-arch': PointedArchSVG,
  'horseshoe-arch': HorseshoeArchSVG,
  'ogee-arch': OgeeArchSVG,
  'trefoil-arch': TrefoilArchSVG,
  'tudor-arch': TudorArchSVG,
  'keystone': KeystoneSVG,
  'voussoir': VoussoirSVG,
}
