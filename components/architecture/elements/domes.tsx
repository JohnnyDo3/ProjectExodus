'use client'

import React from 'react'

const HaloFilter = () => (
  <defs>
    <filter id="dome-halo" x="-50%" y="-50%" width="200%" height="200%">
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
// DOME - Hemispherical roof structure
// ============================================================================
export const DomeSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Base/drum */}
    <g opacity="0.5">
      <path d="M 10 75 L 90 75" strokeWidth="2" fill="none" />
      <path d="M 12 82 L 88 82" strokeWidth="1.5" fill="none" />
      <path d="M 15 88 L 85 88" strokeWidth="1.5" fill="none" />
    </g>

    {/* Main dome - hemispherical */}
    <g filter={showHalo ? "url(#dome-halo)" : undefined}>
      <path d="M 10 75 Q 10 25, 50 15 Q 90 25, 90 75" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Inner dome line */}
      <path d="M 18 72 Q 18 32, 50 22 Q 82 32, 82 72" strokeWidth="2" fill="none" opacity="0.7" />

      {/* Ribs radiating from apex */}
      <path d="M 50 15 L 50 72" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 50 18 Q 30 25, 20 60" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 50 18 Q 70 25, 80 60" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 50 18 Q 25 30, 14 72" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 50 18 Q 75 30, 86 72" strokeWidth="0.8" fill="none" opacity="0.4" />

      {/* Horizontal bands */}
      <path d="M 20 55 Q 50 50, 80 55" strokeWidth="0.7" fill="none" opacity="0.4" />
      <path d="M 28 40 Q 50 35, 72 40" strokeWidth="0.7" fill="none" opacity="0.4" />
    </g>

    {/* Lantern at top */}
    <g opacity="0.7">
      <path d="M 45 15 L 45 8" strokeWidth="1.5" fill="none" />
      <path d="M 55 15 L 55 8" strokeWidth="1.5" fill="none" />
      <path d="M 42 8 L 58 8" strokeWidth="1.5" fill="none" />
      <path d="M 50 8 L 50 4" strokeWidth="1.5" fill="none" />
    </g>
  </svg>
)

// ============================================================================
// OCULUS - Circular opening at dome apex
// ============================================================================
export const OculusSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Partial dome showing from inside looking up */}
    <g opacity="0.4">
      <ellipse cx="50" cy="55" rx="42" ry="25" strokeWidth="2" fill="none" />
      <ellipse cx="50" cy="55" rx="38" ry="22" strokeWidth="1.5" fill="none" />
    </g>

    {/* Coffering pattern radiating to oculus */}
    <g opacity="0.3">
      <path d="M 50 30 L 20 65" strokeWidth="0.8" fill="none" />
      <path d="M 50 30 L 35 68" strokeWidth="0.8" fill="none" />
      <path d="M 50 30 L 65 68" strokeWidth="0.8" fill="none" />
      <path d="M 50 30 L 80 65" strokeWidth="0.8" fill="none" />
    </g>

    {/* THE OCULUS - circular opening */}
    <g filter={showHalo ? "url(#dome-halo)" : undefined}>
      {/* Main oculus circle */}
      <circle cx="50" cy="35" r="18" strokeWidth="3" fill="none" />

      {/* Inner rim */}
      <circle cx="50" cy="35" r="15" strokeWidth="2" fill="none" opacity="0.7" />

      {/* Decorative ring pattern */}
      <circle cx="50" cy="35" r="12" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Light rays from oculus */}
      <path d="M 50 53 L 50 75" strokeWidth="0.5" fill="none" opacity="0.3" />
      <path d="M 38 50 L 25 70" strokeWidth="0.5" fill="none" opacity="0.3" />
      <path d="M 62 50 L 75 70" strokeWidth="0.5" fill="none" opacity="0.3" />
    </g>

    {/* Sky visible through oculus */}
    <circle cx="50" cy="35" r="10" strokeWidth="0.5" fill="none" opacity="0.3" strokeDasharray="2,2" />
  </svg>
)

// ============================================================================
// ONION DOME - Bulbous dome, common in Russian/Eastern architecture
// ============================================================================
export const OnionDomeSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Drum base */}
    <g opacity="0.5">
      <path d="M 30 88 L 70 88" strokeWidth="2" fill="none" />
      <path d="M 32 82 L 68 82" strokeWidth="1.5" fill="none" />
      <path d="M 34 76 L 66 76" strokeWidth="1.5" fill="none" />
    </g>

    {/* ONION DOME - distinctive bulbous shape */}
    <g filter={showHalo ? "url(#dome-halo)" : undefined}>
      {/* The bulge - wider than the base, then narrowing dramatically */}
      <path d="M 34 76 Q 20 65, 18 50 Q 16 35, 35 25 Q 45 20, 50 10 Q 55 20, 65 25 Q 84 35, 82 50 Q 80 65, 66 76"
            strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Inner contour */}
      <path d="M 38 73 Q 26 63, 24 50 Q 22 38, 38 28 Q 47 23, 50 16 Q 53 23, 62 28 Q 78 38, 76 50 Q 74 63, 62 73"
            strokeWidth="2" fill="none" opacity="0.6" />

      {/* Vertical ribs */}
      <path d="M 50 10 L 50 73" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 32 32 Q 35 55, 42 72" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 68 32 Q 65 55, 58 72" strokeWidth="0.8" fill="none" opacity="0.4" />
    </g>

    {/* Cross finial at top (typical of Orthodox) */}
    <g opacity="0.8">
      <path d="M 50 10 L 50 3" strokeWidth="2" fill="none" />
      <path d="M 46 6 L 54 6" strokeWidth="1.5" fill="none" />
      <path d="M 47 4 L 53 4" strokeWidth="1" fill="none" />
    </g>
  </svg>
)

// ============================================================================
// PENDENTIVE - Triangular curved surface transitioning square to circular
// ============================================================================
export const PendentiveSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Square base structure (corner view) */}
    <g opacity="0.4">
      <path d="M 10 85 L 50 85" strokeWidth="2" fill="none" />
      <path d="M 50 85 L 90 85" strokeWidth="2" fill="none" />
      <path d="M 10 85 L 10 55" strokeWidth="2" fill="none" />
      <path d="M 90 85 L 90 55" strokeWidth="2" fill="none" />
    </g>

    {/* Arches on sides */}
    <g opacity="0.5">
      <path d="M 10 55 Q 30 40, 50 55" strokeWidth="1.5" fill="none" />
      <path d="M 50 55 Q 70 40, 90 55" strokeWidth="1.5" fill="none" />
    </g>

    {/* THE PENDENTIVE - curved triangular transition */}
    <g filter={showHalo ? "url(#dome-halo)" : undefined}>
      {/* Corner pendentive - spherical triangle */}
      <path d="M 10 55 Q 15 45, 25 38 Q 35 30, 50 25"
            strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 90 55 Q 85 45, 75 38 Q 65 30, 50 25"
            strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Curved surface lines showing spherical nature */}
      <path d="M 18 50 Q 28 42, 40 35" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 82 50 Q 72 42, 60 35" strokeWidth="1" fill="none" opacity="0.6" />

      {/* Interior curves */}
      <path d="M 25 48 Q 35 40, 50 32" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M 75 48 Q 65 40, 50 32" strokeWidth="0.8" fill="none" opacity="0.5" />
    </g>

    {/* Circular base of dome above */}
    <ellipse cx="50" cy="25" rx="35" ry="10" strokeWidth="2" fill="none" opacity="0.6" />

    {/* Dome suggestion above */}
    <path d="M 15 25 Q 15 8, 50 5 Q 85 8, 85 25" strokeWidth="1.5" fill="none" opacity="0.4" />
  </svg>
)

// ============================================================================
// SQUINCH - Arch/corbeling across corner, alternative to pendentive
// ============================================================================
export const SquinchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Corner walls meeting at 90 degrees */}
    <g opacity="0.5">
      <path d="M 15 90 L 15 35" strokeWidth="2.5" fill="none" />
      <path d="M 15 90 L 85 90" strokeWidth="1.5" fill="none" />
      <path d="M 85 90 L 85 60" strokeWidth="2" fill="none" />
    </g>

    {/* THE SQUINCH - arch across the corner */}
    <g filter={showHalo ? "url(#dome-halo)" : undefined}>
      {/* Main squinch arch spanning the corner */}
      <path d="M 15 35 Q 50 20, 85 35" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Inner arch */}
      <path d="M 20 40 Q 50 28, 80 40" strokeWidth="2" fill="none" opacity="0.7" />

      {/* Corbeled layers (stepped construction) */}
      <path d="M 18 45 Q 50 35, 82 45" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M 16 52 Q 50 42, 84 52" strokeWidth="1.2" fill="none" opacity="0.5" />
      <path d="M 15 58 Q 50 50, 85 58" strokeWidth="1" fill="none" opacity="0.4" />

      {/* Niche/shell form (common squinch decoration) */}
      <path d="M 35 38 Q 50 32, 65 38" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 40 42 L 50 35 L 60 42" strokeWidth="0.8" fill="none" opacity="0.4" />
    </g>

    {/* Octagonal drum above (showing transition) */}
    <path d="M 15 35 L 28 30" strokeWidth="1.5" fill="none" opacity="0.4" />
    <path d="M 85 35 L 72 30" strokeWidth="1.5" fill="none" opacity="0.4" />
    <path d="M 28 30 L 50 25 L 72 30" strokeWidth="1.5" fill="none" opacity="0.4" />
  </svg>
)

export const DOME_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'dome': DomeSVG,
  'oculus': OculusSVG,
  'onion-dome': OnionDomeSVG,
  'pendentive': PendentiveSVG,
  'squinch': SquinchSVG,
}
