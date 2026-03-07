'use client'

import React from 'react'
import { MaterialPatterns } from './materialPatterns'
import { S } from './svgStyleTokens'

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
// Reference: Pantheon, St. Peter's Basilica - the quintessential dome form
// ============================================================================
export const DomeSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <MaterialPatterns />
    <HaloFilter />

    {/* CONTEXT (near): Drum/base with stone/concrete construction */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      {/* Base walls with stone texture */}
      <rect x="8" y="78" width="4" height="14" fill="url(#stone-smooth)" opacity="0.2" stroke="none" />
      <rect x="88" y="78" width="4" height="14" fill="url(#stone-smooth)" opacity="0.2" stroke="none" />
      <path d="M 8 78 L 8 92" strokeWidth="1.2" fill="none" />
      <path d="M 92 78 L 92 92" strokeWidth="1.2" fill="none" />
      <rect x="5" y="92" width="90" height="8" fill="url(#stone-smooth)" opacity="0.15" stroke="none" />
      <path d="M 5 92 L 95 92" strokeWidth="1" fill="none" />
    </g>

    {/* CONTEXT (near): Drum with windows - solid with openings */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacitySubtle} strokeWidth={S.CN.strokeWidth}>
      {/* Drum cylinder with stone/concrete texture */}
      <rect x="10" y="78" width="80" height="8" fill="url(#concrete-smooth)" opacity="0.2" stroke="none" />
      <path d="M 10 78 L 90 78" strokeWidth="1.3" fill="none" />
      <path d="M 12 85 L 88 85" strokeWidth="1" fill="none" />
      {/* Drum window openings (dark recesses) */}
      <path d="M 25 85 L 25 78" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 40 85 L 40 78" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 60 85 L 60 78" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 75 85 L 75 78" strokeWidth="1.2" fill="none" opacity="0.7" />
    </g>

    {/* PRIMARY: THE DOME - MASONRY/CONCRETE hemispherical shell */}
    <g filter={showHalo ? "url(#dome-halo)" : undefined}>
      {/* Dome shell material (concrete with subtle texture) */}
      <path d="M 14 76 Q 14 30, 50 18 Q 86 30, 86 76" fill="url(#concrete-smooth)" opacity="0.22" stroke="none" />

      {/* Extrados (outer surface) - BOLD */}
      <path d="M 10 78 Q 10 28, 50 15 Q 90 28, 90 78" strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Intrados (inner surface) - showing thickness */}
      <path d="M 18 75 Q 18 34, 50 22 Q 82 34, 82 75" strokeWidth={S.P.strokeWidthBold} fill="none" opacity="0.7" />

      {/* Shell thickness shadow */}
      <path d="M 19 75 Q 19 35, 50 23 Q 81 35, 81 75" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />

      {/* DETAIL: Meridian ribs radiating from apex */}
      <path d="M 50 15 L 50 75" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      <path d="M 50 16 L 50 75" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 50 18 Q 28 28, 15 65" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 50 19 Q 28.5 29, 15.5 65" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 50 18 Q 72 28, 85 65" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 50 19 Q 72.5 29, 85.5 65" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 50 18 Q 35 30, 22 68" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 50 18 Q 65 30, 78 68" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacitySubtle} />

      {/* DETAIL: Parallel rings/courses */}
      <path d="M 20 58 Q 50 52, 80 58" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacity} />
      <path d="M 28 42 Q 50 36, 72 42" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacity} />
      <path d="M 38 28 Q 50 24, 62 28" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />

      {/* Oculus ring at apex (optional) */}
      <circle cx="50" cy="16" r="4" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
    </g>

    {/* Lantern at top */}
    <g opacity={S.D.opacityStrong}>
      <path d="M 46 16 L 46 8" strokeWidth={S.D.strokeWidthBold} fill="none" />
      <path d="M 54 16 L 54 8" strokeWidth={S.D.strokeWidthBold} fill="none" />
      <path d="M 44 8 L 56 8" strokeWidth={S.D.strokeWidthBold} fill="none" />
      <path d="M 50 8 L 50 4" strokeWidth={S.D.strokeWidthBold} fill="none" />
    </g>
  </svg>
)

// ============================================================================
// OCULUS - Circular opening at dome apex for light
// Reference: Pantheon oculus - 27 foot diameter open eye to the sky
// ============================================================================
export const OculusSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Surrounding dome surface (view from below) */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <ellipse cx="50" cy="58" rx="44" ry="26" strokeWidth="1.2" fill="none" />
      <ellipse cx="50" cy="58" rx="40" ry="23" strokeWidth="0.9" fill="none" />
    </g>

    {/* CONTEXT (near): Coffering pattern radiating to oculus */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacitySubtle} strokeWidth={S.CN.strokeWidthFine}>
      <path d="M 50 32 L 18 70" fill="none" />
      <path d="M 50 32 L 32 72" fill="none" />
      <path d="M 50 32 L 68 72" fill="none" />
      <path d="M 50 32 L 82 70" fill="none" />
      {/* Concentric coffer rings */}
      <ellipse cx="50" cy="52" rx="32" ry="18" fill="none" />
      <ellipse cx="50" cy="46" rx="22" ry="12" fill="none" />
    </g>

    {/* PRIMARY: THE OCULUS - circular opening */}
    <g filter={showHalo ? "url(#dome-halo)" : undefined}>
      {/* Main oculus ring - thick bronze-like frame */}
      <circle cx="50" cy="35" r="18" strokeWidth={S.P.strokeWidthHeavy} fill="none" />

      {/* Inner rim step */}
      <circle cx="50" cy="35" r="15" strokeWidth={S.P.strokeWidthBold} fill="none" opacity="0.7" />

      {/* Innermost edge - the actual opening */}
      <circle cx="50" cy="35" r="12" strokeWidth={S.P.strokeWidthLight} fill="none" opacity="0.6" />

      {/* DETAIL: Decorative ring molding */}
      <circle cx="50" cy="35" r="16.5" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacity} />
    </g>

    {/* EFFECTS: Light rays from oculus */}
    <g opacity={S.E.opacity} strokeDasharray={S.E.dash} strokeWidth={S.E.strokeWidth}>
      <path d="M 50 53 L 50 78" fill="none" />
      <path d="M 36 50 L 20 75" fill="none" />
      <path d="M 64 50 L 80 75" fill="none" />
    </g>
  </svg>
)

// ============================================================================
// ONION DOME - Bulbous dome, characteristic of Russian/Eastern Orthodox
// Reference: St. Basil's Cathedral - colorful bulbous domes with points
// ============================================================================
export const OnionDomeSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Drum base and supporting structure */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 28 92 L 72 92" fill="none" />
      <path d="M 30 85 L 70 85" fill="none" />
      <path d="M 32 78 L 68 78" fill="none" />
      {/* Drum walls */}
      <path d="M 32 92 L 32 78" fill="none" />
      <path d="M 68 92 L 68 78" fill="none" />
    </g>

    {/* PRIMARY: THE ONION DOME - distinctive bulbous shape */}
    <g filter={showHalo ? "url(#dome-halo)" : undefined}>
      {/* The characteristic bulge - wider than base, then dramatically narrowing */}
      <path d="M 32 78 Q 16 68, 15 52 Q 14 38, 34 26 Q 44 20, 50 10 Q 56 20, 66 26 Q 86 38, 85 52 Q 84 68, 68 78"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Inner contour */}
      <path d="M 36 75 Q 22 66, 21 52 Q 20 40, 38 30 Q 46 24, 50 16 Q 54 24, 62 30 Q 80 40, 79 52 Q 78 66, 64 75"
            strokeWidth={S.P.strokeWidth} fill="none" opacity="0.6" />

      {/* DETAIL: Vertical ribs typical of onion domes */}
      <path d="M 50 10 L 50 75" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 30 32 Q 34 52, 40 74" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 70 32 Q 66 52, 60 74" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 24 45 Q 30 58, 36 74" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 76 45 Q 70 58, 64 74" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
    </g>

    {/* Orthodox cross finial at apex */}
    <g opacity="0.8">
      <path d="M 50 10 L 50 2" strokeWidth={S.P.strokeWidthBold} fill="none" />
      <path d="M 46 5 L 54 5" strokeWidth={S.P.strokeWidth} fill="none" />
      <path d="M 47 3 L 53 3" strokeWidth={S.P.strokeWidthLight} fill="none" />
    </g>
  </svg>
)

// ============================================================================
// PENDENTIVE - Spherical triangle transitioning square plan to circular dome
// Reference: Hagia Sophia - masterful use of pendentives for dome support
// ============================================================================
export const PendentiveSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Square base structure below */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 8 88 L 50 88" strokeWidth="1.2" fill="none" />
      <path d="M 50 88 L 92 88" strokeWidth="1.2" fill="none" />
      <path d="M 8 88 L 8 58" strokeWidth="1.2" fill="none" />
      <path d="M 92 88 L 92 58" strokeWidth="1.2" fill="none" />
    </g>

    {/* CONTEXT (near): Supporting arches on sides */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacitySubtle} strokeWidth={S.CN.strokeWidth}>
      <path d="M 8 58 Q 29 42, 50 58" strokeWidth="1" fill="none" />
      <path d="M 50 58 Q 71 42, 92 58" strokeWidth="1" fill="none" />
    </g>

    {/* CONTEXT (near): Dome above */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacitySubtle} strokeWidth={S.CN.strokeWidth}>
      <path d="M 15 25 Q 15 8, 50 5 Q 85 8, 85 25" strokeWidth="1" fill="none" />
      <ellipse cx="50" cy="25" rx="35" ry="8" strokeWidth="0.8" fill="none" />
    </g>

    {/* PRIMARY: THE PENDENTIVE - curved spherical triangle */}
    <g filter={showHalo ? "url(#dome-halo)" : undefined}>
      {/* Left pendentive - spherical triangle from corner to dome ring */}
      <path d="M 8 58 Q 14 48, 24 40 Q 36 32, 50 26"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Right pendentive */}
      <path d="M 92 58 Q 86 48, 76 40 Q 64 32, 50 26"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Curved surface lines showing spherical form */}
      <path d="M 12 54 Q 22 46, 36 38 Q 44 34, 50 30" strokeWidth={S.P.strokeWidthLight} fill="none" opacity={S.D.opacity} />
      <path d="M 88 54 Q 78 46, 64 38 Q 56 34, 50 30" strokeWidth={S.P.strokeWidthLight} fill="none" opacity={S.D.opacity} />

      {/* Interior curves defining the transition */}
      <path d="M 16 50 Q 28 42, 44 34" strokeWidth={S.D.strokeWidth} fill="none" opacity="0.45" />
      <path d="M 84 50 Q 72 42, 56 34" strokeWidth={S.D.strokeWidth} fill="none" opacity="0.45" />

      {/* Circular drum base where pendentives meet */}
      <ellipse cx="50" cy="26" rx="36" ry="9" strokeWidth={S.P.strokeWidth} fill="none" />
    </g>
  </svg>
)

// ============================================================================
// SQUINCH - Arch/corbeling across corner, alternative to pendentive
// Reference: Islamic architecture - transitioning square to octagonal/circular
// ============================================================================
export const SquinchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Corner walls meeting at 90 degrees */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 12 92 L 12 38" strokeWidth="1.5" fill="none" />
      <path d="M 12 92 L 88 92" strokeWidth="1" fill="none" />
      <path d="M 88 92 L 88 62" strokeWidth="1.2" fill="none" />
    </g>

    {/* CONTEXT (near): Octagonal drum above */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacitySubtle} strokeWidth={S.CN.strokeWidthFine}>
      <path d="M 12 38 L 28 32" fill="none" />
      <path d="M 88 38 L 72 32" fill="none" />
      <path d="M 28 32 L 50 26 L 72 32" fill="none" />
    </g>

    {/* PRIMARY: THE SQUINCH - arch spanning the corner */}
    <g filter={showHalo ? "url(#dome-halo)" : undefined}>
      {/* Main squinch arch - THE key structural element */}
      <path d="M 12 38 Q 50 20, 88 38" strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Inner arch */}
      <path d="M 18 42 Q 50 26, 82 42" strokeWidth={S.P.strokeWidth} fill="none" opacity={S.D.opacityStrong} />

      {/* Corbeled layers showing stepped construction */}
      <path d="M 15 48 Q 50 34, 85 48" strokeWidth="1.4" fill="none" opacity="0.6" />
      <path d="M 14 54 Q 50 42, 86 54" strokeWidth="1.1" fill="none" opacity="0.5" />
      <path d="M 13 60 Q 50 50, 87 60" strokeWidth="0.9" fill="none" opacity="0.4" />

      {/* DETAIL: Niche/shell form in squinch (common decoration) */}
      <path d="M 35 40 Q 50 32, 65 40" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 40 44 L 50 36 L 60 44" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
    </g>
  </svg>
)

export const DOME_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'dome': DomeSVG,
  'oculus': OculusSVG,
  'onion-dome': OnionDomeSVG,
  'pendentive': PendentiveSVG,
  'squinch': SquinchSVG,
}
