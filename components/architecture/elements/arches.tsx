'use client'

import React from 'react'

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
// ============================================================================
export const RoundArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Ground line */}
    <path d="M 5 94 L 95 94" strokeWidth="1" fill="none" opacity="0.3" />

    {/* Supporting piers/jambs */}
    <g opacity="0.5">
      <path d="M 15 94 L 15 45" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 85 94 L 85 45" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 12 45 L 18 45" strokeWidth="2" fill="none" />
      <path d="M 82 45 L 88 45" strokeWidth="2" fill="none" />
    </g>

    {/* ROUND ARCH - perfect semicircle */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Main arch curve - semicircular */}
      <path d="M 15 45 Q 15 10, 50 10 Q 85 10, 85 45"
            strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Inner arch line (intrados) */}
      <path d="M 20 45 Q 20 18, 50 18 Q 80 18, 80 45"
            strokeWidth="2" fill="none" opacity="0.7" />

      {/* Voussoir lines radiating from center */}
      <path d="M 22 38 L 26 30" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 30 28 L 35 22" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 42 18 L 45 12" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 55 12 L 58 18" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 65 22 L 70 28" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 74 30 L 78 38" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Keystone at top */}
      <path d="M 45 10 L 55 10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 46 12 L 46 8" strokeWidth="1.5" fill="none" />
      <path d="M 54 12 L 54 8" strokeWidth="1.5" fill="none" />
    </g>

    {/* Impost blocks */}
    <path d="M 10 45 L 22 45" strokeWidth="2" fill="none" opacity="0.6" />
    <path d="M 78 45 L 90 45" strokeWidth="2" fill="none" opacity="0.6" />
  </svg>
)

// ============================================================================
// POINTED ARCH - Gothic arch with two curves meeting at a point
// ============================================================================
export const PointedArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Ground */}
    <path d="M 5 94 L 95 94" strokeWidth="1" fill="none" opacity="0.3" />

    {/* Piers */}
    <g opacity="0.5">
      <path d="M 18 94 L 18 50" strokeWidth="3" fill="none" />
      <path d="M 82 94 L 82 50" strokeWidth="3" fill="none" />
    </g>

    {/* POINTED ARCH - two arcs meeting at apex */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Left curve rising to point */}
      <path d="M 18 50 Q 25 25, 50 8" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Right curve rising to point */}
      <path d="M 82 50 Q 75 25, 50 8" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Inner arch */}
      <path d="M 24 50 Q 30 28, 50 14" strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M 76 50 Q 70 28, 50 14" strokeWidth="2" fill="none" opacity="0.7" />

      {/* Voussoirs */}
      <path d="M 26 42 L 30 35" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 35 30 L 40 24" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 60 24 L 65 30" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 70 35 L 74 42" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Pointed keystone */}
      <path d="M 46 12 L 50 6 L 54 12" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Impost moldings */}
    <path d="M 14 50 L 24 50" strokeWidth="2" fill="none" opacity="0.6" />
    <path d="M 76 50 L 86 50" strokeWidth="2" fill="none" opacity="0.6" />
  </svg>
)

// ============================================================================
// HORSESHOE ARCH - Extends past semicircle, Moorish/Islamic
// ============================================================================
export const HorseshoeArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Ground */}
    <path d="M 5 94 L 95 94" strokeWidth="1" fill="none" opacity="0.3" />

    {/* Piers - set INWARD because arch extends past vertical */}
    <g opacity="0.5">
      <path d="M 25 94 L 25 55" strokeWidth="3" fill="none" />
      <path d="M 75 94 L 75 55" strokeWidth="3" fill="none" />
    </g>

    {/* HORSESHOE ARCH - curves PAST vertical before springing */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Key feature: arch extends inward before curving up */}
      <path d="M 25 55 Q 18 55, 15 45 Q 12 30, 20 18 Q 30 8, 50 8 Q 70 8, 80 18 Q 88 30, 85 45 Q 82 55, 75 55"
            strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Inner horseshoe */}
      <path d="M 28 52 Q 22 52, 20 44 Q 17 32, 24 22 Q 32 14, 50 14 Q 68 14, 76 22 Q 83 32, 80 44 Q 78 52, 72 52"
            strokeWidth="2" fill="none" opacity="0.7" />

      {/* Decorative alternating voussoirs (typical of Moorish) */}
      <path d="M 22 48 L 24 40" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M 26 36 L 30 28" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M 36 22 L 42 16" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M 58 16 L 64 22" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M 70 28 L 74 36" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M 76 40 L 78 48" strokeWidth="1.5" fill="none" opacity="0.6" />

      {/* Keystone */}
      <path d="M 46 8 L 54 8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>

    {/* Capital/impost decoration */}
    <path d="M 20 55 L 30 55" strokeWidth="2" fill="none" opacity="0.5" />
    <path d="M 70 55 L 80 55" strokeWidth="2" fill="none" opacity="0.5" />
  </svg>
)

// ============================================================================
// OGEE ARCH - S-curves meeting at a point, Late Gothic
// ============================================================================
export const OgeeArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Ground */}
    <path d="M 5 94 L 95 94" strokeWidth="1" fill="none" opacity="0.3" />

    {/* Piers */}
    <g opacity="0.5">
      <path d="M 18 94 L 18 55" strokeWidth="3" fill="none" />
      <path d="M 82 94 L 82 55" strokeWidth="3" fill="none" />
    </g>

    {/* OGEE ARCH - S-curve (concave then convex) on each side */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Left ogee: concave curve out, then convex curve to point */}
      <path d="M 18 55 Q 12 45, 18 35 Q 25 25, 50 8"
            strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Right ogee: mirror image */}
      <path d="M 82 55 Q 88 45, 82 35 Q 75 25, 50 8"
            strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Inner ogee curves */}
      <path d="M 24 55 Q 19 47, 24 38 Q 30 28, 50 14"
            strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M 76 55 Q 81 47, 76 38 Q 70 28, 50 14"
            strokeWidth="2" fill="none" opacity="0.7" />

      {/* Finial at apex (common on ogee arches) */}
      <path d="M 50 8 L 50 4" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="3" r="2" strokeWidth="1.5" fill="none" />

      {/* Crockets along the curve (Gothic decoration) */}
      <circle cx="22" cy="40" r="2" strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="32" cy="26" r="2" strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="68" cy="26" r="2" strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="78" cy="40" r="2" strokeWidth="1" fill="none" opacity="0.5" />
    </g>

    {/* Imposts */}
    <path d="M 14 55 L 24 55" strokeWidth="2" fill="none" opacity="0.6" />
    <path d="M 76 55 L 86 55" strokeWidth="2" fill="none" opacity="0.6" />
  </svg>
)

// ============================================================================
// TREFOIL ARCH - Three overlapping arcs, Gothic decorative
// ============================================================================
export const TrefoilArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Ground */}
    <path d="M 5 94 L 95 94" strokeWidth="1" fill="none" opacity="0.3" />

    {/* Piers */}
    <g opacity="0.5">
      <path d="M 20 94 L 20 55" strokeWidth="3" fill="none" />
      <path d="M 80 94 L 80 55" strokeWidth="3" fill="none" />
    </g>

    {/* TREFOIL - Three lobes/foils */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Left lobe */}
      <path d="M 20 55 Q 15 45, 20 35 Q 25 25, 35 30 Q 40 35, 38 42"
            strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Right lobe */}
      <path d="M 80 55 Q 85 45, 80 35 Q 75 25, 65 30 Q 60 35, 62 42"
            strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Center/top lobe */}
      <path d="M 38 42 Q 35 50, 42 55 Q 50 60, 58 55 Q 65 50, 62 42"
            strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Top lobe arching up */}
      <path d="M 38 35 Q 40 20, 50 15 Q 60 20, 62 35"
            strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Cusps where lobes meet */}
      <circle cx="38" cy="40" r="1.5" strokeWidth="1" fill="currentColor" opacity="0.5" />
      <circle cx="62" cy="40" r="1.5" strokeWidth="1" fill="currentColor" opacity="0.5" />
      <circle cx="50" cy="52" r="1.5" strokeWidth="1" fill="currentColor" opacity="0.5" />

      {/* Finial */}
      <path d="M 50 15 L 50 8" strokeWidth="2" fill="none" />
      <path d="M 47 8 L 50 4 L 53 8" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    </g>

    {/* Frame around trefoil */}
    <path d="M 20 55 Q 10 30, 25 15 Q 40 5, 50 5 Q 60 5, 75 15 Q 90 30, 80 55"
          strokeWidth="1.5" fill="none" opacity="0.4" />
  </svg>
)

// ============================================================================
// TUDOR ARCH - Flattened pointed arch, English late Gothic
// ============================================================================
export const TudorArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Ground */}
    <path d="M 5 94 L 95 94" strokeWidth="1" fill="none" opacity="0.3" />

    {/* Piers */}
    <g opacity="0.5">
      <path d="M 12 94 L 12 45" strokeWidth="3" fill="none" />
      <path d="M 88 94 L 88 45" strokeWidth="3" fill="none" />
    </g>

    {/* TUDOR ARCH - wide, flattened pointed arch (4-centered) */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Lower curves (large radius, nearly horizontal) */}
      <path d="M 12 45 Q 20 42, 35 38" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 88 45 Q 80 42, 65 38" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Upper curves (small radius, meeting at shallow point) */}
      <path d="M 35 38 Q 42 30, 50 28" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 65 38 Q 58 30, 50 28" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Inner arch */}
      <path d="M 18 45 Q 25 42, 38 39" strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M 82 45 Q 75 42, 62 39" strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M 38 39 Q 44 33, 50 32" strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M 62 39 Q 56 33, 50 32" strokeWidth="2" fill="none" opacity="0.7" />

      {/* Voussoirs */}
      <path d="M 22 44 L 25 40" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 40 39 L 43 34" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 57 34 L 60 39" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 75 40 L 78 44" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Shallow pointed keystone */}
      <path d="M 47 30 L 50 26 L 53 30" strokeWidth="2" fill="none" strokeLinejoin="round" />
    </g>

    {/* Spandrel decoration (Tudor rose motif suggestion) */}
    <circle cx="25" cy="30" r="4" strokeWidth="1" fill="none" opacity="0.3" />
    <circle cx="75" cy="30" r="4" strokeWidth="1" fill="none" opacity="0.3" />

    {/* Imposts with Tudor molding */}
    <path d="M 8 45 L 18 45" strokeWidth="2" fill="none" opacity="0.6" />
    <path d="M 82 45 L 92 45" strokeWidth="2" fill="none" opacity="0.6" />
  </svg>
)

// ============================================================================
// KEYSTONE - Central wedge-shaped stone at arch apex
// ============================================================================
export const KeystoneSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Partial arch to show context */}
    <g opacity="0.4">
      {/* Left side of arch */}
      <path d="M 10 85 Q 10 50, 30 30" strokeWidth="2" fill="none" />
      <path d="M 18 85 Q 18 55, 35 35" strokeWidth="1.5" fill="none" />

      {/* Right side of arch */}
      <path d="M 90 85 Q 90 50, 70 30" strokeWidth="2" fill="none" />
      <path d="M 82 85 Q 82 55, 65 35" strokeWidth="1.5" fill="none" />

      {/* Adjacent voussoirs */}
      <path d="M 30 30 L 35 35 L 38 25 L 32 22 Z" strokeWidth="1" fill="none" />
      <path d="M 70 30 L 65 35 L 62 25 L 68 22 Z" strokeWidth="1" fill="none" />
    </g>

    {/* THE KEYSTONE - central wedge-shaped stone */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Keystone shape - wider at top, narrower at bottom (wedge) */}
      <path d="M 38 25 L 42 10 L 58 10 L 62 25 L 55 35 L 45 35 Z"
            strokeWidth="2.5" fill="none" strokeLinejoin="round" />

      {/* Decorative carving on keystone face */}
      <path d="M 48 15 L 50 12 L 52 15" strokeWidth="1.5" fill="none" />
      <path d="M 46 22 L 50 18 L 54 22" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 47 28 L 50 25 L 53 28" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Joints showing wedge action */}
      <path d="M 38 25 L 45 35" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 62 25 L 55 35" strokeWidth="1" fill="none" opacity="0.6" />
    </g>

    {/* Force arrows showing compression */}
    <g opacity="0.5">
      <path d="M 30 45 L 42 35" strokeWidth="1" fill="none" />
      <path d="M 42 35 L 40 38" strokeWidth="0.8" fill="none" />
      <path d="M 42 35 L 44 38" strokeWidth="0.8" fill="none" />

      <path d="M 70 45 L 58 35" strokeWidth="1" fill="none" />
      <path d="M 58 35 L 56 38" strokeWidth="0.8" fill="none" />
      <path d="M 58 35 L 60 38" strokeWidth="0.8" fill="none" />
    </g>

    {/* Label */}
    <text x="50" y="55" textAnchor="middle" fontSize="5" opacity="0.4" fill="currentColor">
      keystone
    </text>
  </svg>
)

// ============================================================================
// VOUSSOIR - Wedge-shaped stones forming an arch
// ============================================================================
export const VoussoirSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Show multiple voussoirs in arch formation */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Left springer voussoir */}
      <path d="M 12 75 L 15 60 L 25 55 L 28 68 Z"
            strokeWidth="2" fill="none" strokeLinejoin="round" />

      {/* Second voussoir */}
      <path d="M 15 60 L 22 48 L 32 46 L 28 58 Z"
            strokeWidth="2" fill="none" strokeLinejoin="round" opacity="0.85" />

      {/* Third voussoir */}
      <path d="M 22 48 L 32 38 L 42 38 L 35 48 Z"
            strokeWidth="2" fill="none" strokeLinejoin="round" opacity="0.75" />

      {/* Fourth voussoir (near keystone) */}
      <path d="M 32 38 L 42 30 L 48 32 L 42 40 Z"
            strokeWidth="2" fill="none" strokeLinejoin="round" opacity="0.65" />

      {/* KEYSTONE (center) - slightly emphasized */}
      <path d="M 42 30 L 48 24 L 52 24 L 58 30 L 52 34 L 48 34 Z"
            strokeWidth="2.5" fill="none" strokeLinejoin="round" />

      {/* Mirror voussoirs on right */}
      <path d="M 52 32 L 58 30 L 68 38 L 58 40 Z"
            strokeWidth="2" fill="none" strokeLinejoin="round" opacity="0.65" />

      <path d="M 65 38 L 68 38 L 78 48 L 68 48 Z"
            strokeWidth="2" fill="none" strokeLinejoin="round" opacity="0.75" />

      <path d="M 72 55 L 78 48 L 85 60 L 78 60 Z"
            strokeWidth="2" fill="none" strokeLinejoin="round" opacity="0.85" />

      <path d="M 72 68 L 75 55 L 85 60 L 88 75 Z"
            strokeWidth="2" fill="none" strokeLinejoin="round" />
    </g>

    {/* Pier suggestions */}
    <path d="M 12 75 L 12 90" strokeWidth="2.5" fill="none" opacity="0.4" />
    <path d="M 88 75 L 88 90" strokeWidth="2.5" fill="none" opacity="0.4" />

    {/* Ground */}
    <path d="M 5 90 L 95 90" strokeWidth="1" fill="none" opacity="0.3" />

    {/* Label for one voussoir */}
    <path d="M 35 55 L 30 65" strokeWidth="0.5" fill="none" opacity="0.4" />
    <text x="22" y="70" fontSize="4" opacity="0.4" fill="currentColor">voussoir</text>
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
