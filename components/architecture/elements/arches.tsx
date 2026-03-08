'use client'

import React from 'react'
import { S } from './svgStyleTokens'

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
// ROUND ARCH - Perfect semicircular Roman arch, 3/4 perspective showing barrel depth
// ============================================================================
export const RoundArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Adjacent arcade receding in perspective */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      <path d="M -15 62 Q -15 38, 5 38 Q 15 38, 15 62" />
      <path d="M 95 62 Q 100 40, 110 40" />
    </g>

    {/* CONTEXT (far): Floor paving */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      <path d="M -10 94 L 110 94" />
      <path d="M -10 98 L 110 98" opacity="0.5" />
    </g>

    {/* CONTEXT (near): Wall mass behind arch */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      {/* Wall above arch */}
      <path d="M -5 -5 L -5 110" />
      <path d="M 95 -5 L 95 110" />
      <path d="M -5 15 L 95 15" opacity="0.5" />
      {/* Masonry courses */}
      <path d="M -5 25 L 12 25" strokeWidth="0.4" opacity="0.5" />
      <path d="M 78 25 L 95 25" strokeWidth="0.4" opacity="0.5" />
    </g>

    {/* CONTEXT (near): Piers extending off-page */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      <path d="M 12 -5 L 12 110" strokeWidth="1.2" />
      <path d="M 18 -5 L 18 110" opacity="0.7" />
      <path d="M 78 -5 L 78 110" strokeWidth="1.2" />
      <path d="M 72 -5 L 72 110" opacity="0.7" />
    </g>

    {/* Wall mass fill behind arch */}
    <path d="M 12 15 L 78 15 L 78 62 L 12 62 Z" fill="currentColor" opacity="0.04" stroke="none" />

    {/* PRIMARY: THE ROUND ARCH - 3/4 perspective with barrel depth */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>

      {/* DEPTH: Soffit (underside) of arch visible in 3/4 - the barrel receding */}
      <path d="M 18 62 Q 18 30, 45 22 Q 72 30, 72 62
               L 78 58 Q 78 26, 48 18 Q 18 26, 18 58 Z"
            fill="currentColor" opacity="0.1" stroke="none" />

      {/* DEPTH: Far side of arch (back edge visible in 3/4) */}
      <path d="M 18 58 Q 18 26, 48 18 Q 78 26, 78 58"
            strokeWidth={S.P.strokeWidthLight} opacity="0.4" strokeDasharray="2 2" />

      {/* Front face extrados - perfect SEMICIRCLE */}
      <path d="M 12 62 Q 12 20, 45 12 Q 78 20, 78 62"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />

      {/* Front face intrados */}
      <path d="M 18 62 Q 18 28, 45 20 Q 72 28, 72 62"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* DEPTH: Voussoir side faces visible in 3/4 (near side shows thickness) */}
      {/* Left springer voussoir depth */}
      <path d="M 14 56 L 20 52" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="14,56 12,62 18,62 20,56" fill="currentColor" opacity="0.06" stroke="none" />
      {/* Second voussoir */}
      <path d="M 16 46 L 22 42" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="16,46 14,52 20,48 22,42" fill="currentColor" opacity="0.06" stroke="none" />
      {/* Third voussoir */}
      <path d="M 22 36 L 28 32" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="22,36 18,42 24,38 28,32" fill="currentColor" opacity="0.06" stroke="none" />
      {/* Fourth voussoir */}
      <path d="M 32 26 L 38 22" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      {/* Right side voussoirs */}
      <path d="M 58 22 L 64 26" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 64 32 L 70 36" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 70 42 L 74 46" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 72 52 L 76 56" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />

      {/* Voussoir depth lines on soffit (receding perspective) */}
      <path d="M 14 56 L 20 52" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 22 42 L 28 38" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 34 28 L 40 24" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 56 24 L 62 28" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 68 38 L 74 42" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

      {/* KEYSTONE at crown - projecting forward, 3D wedge */}
      {/* Front trapezoidal face */}
      <path d="M 40 14 L 43 12 L 47 12 L 50 14 L 48 20 L 42 20 Z"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinejoin="round" />
      {/* Keystone top depth face (3/4 view) */}
      <polygon points="43,12 47,12 53,8 49,8" fill="currentColor" opacity="0.1" stroke="none" />
      <path d="M 43 12 L 49 8 M 47 12 L 53 8 M 49 8 L 53 8"
            strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacityStrong} />
      {/* Keystone side depth */}
      <polygon points="47,12 50,14 56,10 53,8" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 47 12 L 53 8 M 50 14 L 56 10"
            strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* Impost blocks where arch springs from piers */}
      <path d="M 8 62 L 22 62" strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 68 62 L 82 62" strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      {/* Impost depth (3/4) */}
      <path d="M 22 62 L 28 58" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 8 62 L 14 58" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="8,62 22,62 28,58 14,58" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 68 62 L 74 58" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 82 62 L 88 58" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="68,62 82,62 88,58 74,58" fill="currentColor" opacity="0.06" stroke="none" />
      {/* Impost molding line */}
      <path d="M 10 60 L 20 60" strokeWidth="1" opacity="0.5" />
      <path d="M 70 60 L 80 60" strokeWidth="1" opacity="0.5" />
    </g>

    {/* EFFECTS: Light through the opening */}
    <g opacity={S.E.opacity} strokeDasharray={S.E.dash} strokeWidth={S.E.strokeWidth}>
      <path d="M 30 70 L 35 62" />
      <path d="M 55 70 L 60 62" />
    </g>
  </svg>
)

// ============================================================================
// POINTED ARCH - Gothic arch, two curves meeting at a sharp POINT at the top
// ============================================================================
export const PointedArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Adjacent pointed arches in nave arcade */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      <path d="M -15 62 Q -10 40, 0 30 Q 10 40, 5 62" />
      <path d="M 95 62 Q 100 42, 105 35" />
    </g>

    {/* CONTEXT (far): Floor */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      <path d="M -10 94 L 110 94" />
      <path d="M -10 98 L 110 98" opacity="0.5" />
    </g>

    {/* CONTEXT (near): Cathedral walls */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      <path d="M -5 -5 L -5 110" />
      <path d="M 95 -5 L 95 110" />
      <path d="M -5 10 L 95 10" opacity="0.5" />
      <path d="M -5 25 L 12 25" strokeWidth="0.4" opacity="0.5" />
      <path d="M 78 25 L 95 25" strokeWidth="0.4" opacity="0.5" />
    </g>

    {/* CONTEXT (near): Piers */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      <path d="M 14 -5 L 14 110" strokeWidth="1.2" />
      <path d="M 20 -5 L 20 110" opacity="0.7" />
      <path d="M 76 -5 L 76 110" strokeWidth="1.2" />
      <path d="M 70 -5 L 70 110" opacity="0.7" />
    </g>

    {/* Wall mass fill */}
    <path d="M 14 10 L 76 10 L 76 62 L 14 62 Z" fill="currentColor" opacity="0.04" stroke="none" />

    {/* PRIMARY: THE POINTED ARCH - two arcs meeting at a sharp point */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>

      {/* DEPTH: Soffit (underside) receding in 3/4 */}
      <path d="M 20 62 Q 24 36, 45 12 L 50 8
               L 55 12 Q 66 36, 70 62
               L 76 58 Q 72 32, 52 8
               L 48 4 L 44 8 Q 24 32, 20 58 Z"
            fill="currentColor" opacity="0.1" stroke="none" />

      {/* Far edge of arch (back, visible in 3/4) */}
      <path d="M 20 58 Q 24 32, 48 8" strokeWidth={S.P.strokeWidthLight} opacity="0.35" strokeDasharray="2 2" />
      <path d="M 76 58 Q 72 32, 52 8" strokeWidth={S.P.strokeWidthLight} opacity="0.35" strokeDasharray="2 2" />

      {/* Front extrados - LEFT arc rising to POINT */}
      <path d="M 14 62 Q 18 30, 45 8 L 50 4"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      {/* Front extrados - RIGHT arc rising to POINT */}
      <path d="M 76 62 Q 72 30, 55 8 L 50 4"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />

      {/* Front intrados */}
      <path d="M 20 62 Q 24 36, 45 12 L 50 8"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 70 62 Q 66 36, 55 12 L 50 8"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Voussoir joints with depth faces visible */}
      {/* Left side voussoirs */}
      <path d="M 16 54 L 22 50" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="16,54 14,60 20,56 22,50" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 20 42 L 26 38" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="20,42 18,48 24,44 26,38" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 28 30 L 34 26" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 38 20 L 44 16" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      {/* Right side voussoirs */}
      <path d="M 56 16 L 62 20" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 62 26 L 68 30" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 68 38 L 74 42" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="68,38 66,44 72,48 74,42" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 72 50 L 76 54" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />

      {/* Pointed KEYSTONE at apex - the defining sharp point */}
      <path d="M 44 10 L 50 2 L 56 10"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinejoin="round" strokeLinecap={S.P.strokeLinecap} />
      {/* Keystone depth face (3/4 view) */}
      <polygon points="50,2 56,10 62,6 56,-2" fill="currentColor" opacity="0.1" stroke="none" />
      <path d="M 50 2 L 56 -2 M 56 10 L 62 6" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      {/* Keystone side edges */}
      <path d="M 46 12 L 50 4 L 54 12" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacitySubtle} />

      {/* Impost blocks */}
      <path d="M 10 62 L 24 62" strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 66 62 L 80 62" strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      {/* Impost depth */}
      <polygon points="10,62 24,62 30,58 16,58" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 24 62 L 30 58" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 10 62 L 16 58" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="66,62 80,62 86,58 72,58" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 80 62 L 86 58" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      {/* Impost molding */}
      <path d="M 12 60 L 22 60" strokeWidth="1" opacity="0.5" />
      <path d="M 68 60 L 78 60" strokeWidth="1" opacity="0.5" />
    </g>

    {/* EFFECTS: Light rays */}
    <g opacity={S.E.opacity} strokeDasharray={S.E.dash} strokeWidth={S.E.strokeWidth}>
      <path d="M 35 70 L 40 55" />
      <path d="M 60 70 L 55 55" />
    </g>
  </svg>
)

// ============================================================================
// HORSESHOE ARCH - Extends PAST semicircle, narrowing below widest point (Moorish)
// ============================================================================
export const HorseshoeArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Cordoba colonnade receding */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      <path d="M -10 65 Q -14 60, -12 50 Q -8 40, 0 40 Q 5 40, 8 50 Q 10 60, 6 65" />
      <path d="M 94 65 Q 98 58, 100 50" />
    </g>

    {/* CONTEXT (far): Floor */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      <path d="M -10 94 L 110 94" />
      <path d="M -10 98 L 110 98" opacity="0.5" />
    </g>

    {/* CONTEXT (near): Mosque walls */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      <path d="M -5 -5 L -5 110" />
      <path d="M 95 -5 L 95 110" />
      <path d="M -5 12 L 95 12" opacity="0.5" />
    </g>

    {/* CONTEXT (near): Columns */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      <path d="M 20 -5 L 20 110" strokeWidth="1.2" />
      <path d="M 26 -5 L 26 110" opacity="0.7" />
      <path d="M 70 -5 L 70 110" strokeWidth="1.2" />
      <path d="M 64 -5 L 64 110" opacity="0.7" />
    </g>

    {/* Wall mass */}
    <path d="M 20 12 L 70 12 L 70 65 L 20 65 Z" fill="currentColor" opacity="0.04" stroke="none" />

    {/* PRIMARY: THE HORSESHOE ARCH - curves past springing, narrowing below widest point */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>

      {/* DEPTH: Soffit showing horseshoe depth receding in 3/4 */}
      {/* The horseshoe shape: arch is WIDER than the piers, then curves INWARD below */}
      <path d="M 24 65 Q 14 62, 12 50 Q 10 34, 22 20 Q 34 10, 45 10
               Q 56 10, 68 20 Q 80 34, 78 50 Q 76 62, 66 65
               L 72 61 Q 82 58, 84 46 Q 86 30, 74 16
               Q 62 6, 51 6 Q 40 6, 28 16 Q 16 30, 18 46 Q 20 58, 30 61 Z"
            fill="currentColor" opacity="0.1" stroke="none" />

      {/* Far edge (back of arch visible in 3/4) */}
      <path d="M 30 61 Q 22 58, 18 46 Q 16 30, 28 16 Q 40 6, 51 6 Q 62 6, 74 16 Q 86 30, 84 46 Q 82 58, 72 61"
            strokeWidth={S.P.strokeWidthLight} opacity="0.35" strokeDasharray="2 2" />

      {/* Front extrados - HORSESHOE: note how it curves INWARD past springing at y=55 */}
      <path d="M 24 65 Q 14 62, 12 50 Q 10 34, 22 20 Q 34 10, 45 10 Q 56 10, 68 20 Q 80 34, 78 50 Q 76 62, 66 65"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />

      {/* Front intrados - also horseshoe shaped */}
      <path d="M 28 63 Q 20 60, 18 50 Q 16 36, 26 24 Q 36 14, 45 14 Q 54 14, 64 24 Q 74 36, 72 50 Q 70 60, 62 63"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* VISUAL KEY: Dashed lines showing the pier edges (x=24,66) to make horseshoe narrowing obvious */}
      <path d="M 24 65 L 24 55" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} strokeDasharray="1 2" />
      <path d="M 66 65 L 66 55" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} strokeDasharray="1 2" />

      {/* Voussoir joints with 3D depth faces */}
      <path d="M 16 56 L 22 52" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="16,56 15,62 21,58 22,52" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 14 44 L 20 40" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="14,44 14,50 20,46 20,40" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 18 32 L 24 28" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 28 22 L 34 18" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 40 14 L 46 10" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      {/* Right voussoirs */}
      <path d="M 54 10 L 60 14" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 62 18 L 68 22" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 72 28 L 76 32" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 76 40 L 80 44" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 74 52 L 78 56" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />

      {/* Alternating voussoir color bands (Cordoba striped pattern) */}
      <polygon points="14,44 18,32 24,28 20,40" fill="currentColor" opacity="0.06" stroke="none" />
      <polygon points="28,22 40,14 46,10 34,18" fill="currentColor" opacity="0.06" stroke="none" />
      <polygon points="60,14 68,22 72,28 54,10" fill="currentColor" opacity="0.06" stroke="none" />
      <polygon points="76,40 80,44 78,56 72,48" fill="currentColor" opacity="0.06" stroke="none" />

      {/* Keystone */}
      <path d="M 42 12 L 45 8 L 55 8 L 48 12"
            strokeWidth={S.P.strokeWidthBold} strokeLinejoin="round" />
      {/* Keystone depth */}
      <polygon points="45,8 55,8 61,4 51,4" fill="currentColor" opacity="0.1" stroke="none" />
      <path d="M 45 8 L 51 4 M 55 8 L 61 4" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* Impost blocks */}
      <path d="M 18 65 L 32 65" strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 58 65 L 72 65" strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      {/* Impost depth */}
      <polygon points="18,65 32,65 38,61 24,61" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 32 65 L 38 61" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 18 65 L 24 61" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="58,65 72,65 78,61 64,61" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 72 65 L 78 61" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      {/* Impost molding */}
      <path d="M 20 63 L 30 63" strokeWidth="1" opacity="0.5" />
      <path d="M 60 63 L 70 63" strokeWidth="1" opacity="0.5" />
    </g>
  </svg>
)

// ============================================================================
// OGEE ARCH - S-CURVE: concave at bottom, convex at top, meeting at a point
// ============================================================================
export const OgeeArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Adjacent ogee arches */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      <path d="M -10 62 Q -16 52, -12 42 Q -6 30, 5 22" />
      <path d="M 95 22 Q 106 30, 112 42" />
    </g>

    {/* CONTEXT (far): Floor */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      <path d="M -10 94 L 110 94" />
      <path d="M -10 98 L 110 98" opacity="0.5" />
    </g>

    {/* CONTEXT (near): Palace walls */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      <path d="M -5 -5 L -5 110" />
      <path d="M 95 -5 L 95 110" />
      <path d="M -5 10 L 95 10" opacity="0.5" />
    </g>

    {/* CONTEXT (near): Piers */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      <path d="M 14 -5 L 14 110" strokeWidth="1.2" />
      <path d="M 20 -5 L 20 110" opacity="0.7" />
      <path d="M 76 -5 L 76 110" strokeWidth="1.2" />
      <path d="M 70 -5 L 70 110" opacity="0.7" />
    </g>

    {/* Wall mass */}
    <path d="M 14 10 L 76 10 L 76 62 L 14 62 Z" fill="currentColor" opacity="0.04" stroke="none" />

    {/* PRIMARY: THE OGEE ARCH - S-curve (concave then convex) meeting at point */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>

      {/* DEPTH: Soffit showing ogee depth in 3/4 */}
      <path d="M 20 62 Q 12 52, 18 40 Q 28 26, 45 10
               L 55 10 Q 62 26, 72 40 Q 78 52, 70 62
               L 76 58 Q 84 48, 78 36 Q 68 22, 51 6
               L 49 6 Q 22 22, 16 36 Q 10 48, 20 58 Z"
            fill="currentColor" opacity="0.1" stroke="none" />

      {/* Far edge of arch (back in 3/4 view) */}
      <path d="M 20 58 Q 12 48, 18 36 Q 28 22, 49 6"
            strokeWidth={S.P.strokeWidthLight} opacity="0.35" strokeDasharray="2 2" />
      <path d="M 76 58 Q 84 48, 78 36 Q 68 22, 51 6"
            strokeWidth={S.P.strokeWidthLight} opacity="0.35" strokeDasharray="2 2" />

      {/* Front extrados - LEFT S-CURVE: concave out at bottom, convex in at top */}
      <path d="M 14 62 Q 6 50, 12 38 Q 22 24, 45 8 L 50 4"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      {/* Front extrados - RIGHT S-CURVE mirror */}
      <path d="M 76 62 Q 84 50, 78 38 Q 68 24, 55 8 L 50 4"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />

      {/* Front intrados - inner S-curves */}
      <path d="M 20 62 Q 14 52, 18 42 Q 26 28, 45 14 L 50 10"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 70 62 Q 76 52, 72 42 Q 64 28, 55 14 L 50 10"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Voussoir joints following the S-curve, with depth */}
      <path d="M 10 52 L 16 48" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="10,52 8,58 14,54 16,48" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 14 42 L 20 38" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="14,42 12,48 18,44 20,38" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 22 32 L 28 28" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 34 22 L 40 18" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      {/* Right side */}
      <path d="M 56 18 L 62 22" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 68 28 L 72 32" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 74 38 L 80 42" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="74,38 72,44 78,48 80,42" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 78 48 L 82 52" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />

      {/* Finial at apex */}
      <path d="M 50 4 L 50 -1" strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      <circle cx="50" cy="-2" r="2" strokeWidth={S.P.strokeWidth} />

      {/* Keystone at point */}
      <path d="M 44 10 L 50 2 L 56 10"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinejoin="round" />
      {/* Keystone depth */}
      <polygon points="50,2 56,10 62,6 56,-2" fill="currentColor" opacity="0.1" stroke="none" />
      <path d="M 56 10 L 62 6" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* Crockets along the S-curve (carved lotus buds) */}
      <circle cx="10" cy="44" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <circle cx="26" cy="26" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <circle cx="64" cy="26" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <circle cx="80" cy="44" r="1.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* Impost blocks */}
      <path d="M 10 62 L 24 62" strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 66 62 L 80 62" strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      <polygon points="10,62 24,62 30,58 16,58" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 24 62 L 30 58" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 10 62 L 16 58" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="66,62 80,62 86,58 72,58" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 80 62 L 86 58" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 12 60 L 22 60" strokeWidth="1" opacity="0.5" />
      <path d="M 68 60 L 78 60" strokeWidth="1" opacity="0.5" />
    </g>
  </svg>
)

// ============================================================================
// TREFOIL ARCH - THREE-LOBED clover shape with cusps between lobes
// ============================================================================
export const TrefoilArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Adjacent trefoil arches in cloister */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      <path d="M -15 62 Q -20 48, -10 38 Q 0 32, 5 38" />
      <path d="M 95 38 Q 100 32, 110 38 Q 120 48, 115 62" />
      {/* Floor */}
      <path d="M -10 94 L 110 94" />
      <path d="M -10 98 L 110 98" opacity="0.5" />
      {/* Garden beyond */}
      <path d="M 30 72 Q 40 68, 50 72 Q 60 68, 70 72" opacity={S.CF.opacitySubtle} />
    </g>

    {/* CONTEXT (near): Cloister walls and piers */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      <path d="M -5 -5 L -5 110" />
      <path d="M 95 -5 L 95 110" />
      <path d="M -5 8 L 95 8" opacity="0.5" />
      {/* Containing pointed arch above trefoil */}
      <path d="M 14 62 Q 8 36, 24 18 Q 38 6, 50 6 Q 62 6, 76 18 Q 92 36, 86 62"
            strokeWidth="0.8" opacity="0.6" />
      {/* Piers */}
      <path d="M 14 -5 L 14 110" strokeWidth="1.2" />
      <path d="M 20 -5 L 20 110" opacity="0.7" />
      <path d="M 80 -5 L 80 110" strokeWidth="1.2" />
      <path d="M 74 -5 L 74 110" opacity="0.7" />
      {/* Wall coursing */}
      <path d="M -5 25 L 10 25" strokeWidth="0.4" opacity="0.5" />
      <path d="M 85 25 L 95 25" strokeWidth="0.4" opacity="0.5" />
    </g>

    {/* Wall mass */}
    <path d="M 14 8 L 80 8 L 80 62 L 14 62 Z" fill="currentColor" opacity="0.04" stroke="none" />

    {/* PRIMARY: THE TREFOIL - Three lobes (left, crown, right) with cusps */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>

      {/* DEPTH: Soffit of trefoil receding in 3/4 */}
      {/* Left lobe soffit */}
      <path d="M 20 62 Q 10 52, 14 40 Q 18 30, 30 28 Q 38 28, 40 36
               L 46 32 Q 44 24, 34 22 Q 20 24, 16 36 Q 12 48, 26 58 Z"
            fill="currentColor" opacity="0.08" stroke="none" />
      {/* Crown lobe soffit */}
      <path d="M 40 36 Q 40 20, 50 14 Q 60 20, 60 36
               L 66 32 Q 66 16, 56 10 Q 46 10, 46 16 Q 44 22, 46 32 Z"
            fill="currentColor" opacity="0.08" stroke="none" />
      {/* Right lobe soffit */}
      <path d="M 60 36 Q 62 28, 70 28 Q 82 30, 86 40 Q 90 52, 80 62
               L 74 58 Q 82 50, 80 40 Q 78 32, 66 30 Q 58 30, 56 36 Z"
            fill="currentColor" opacity="0.08" stroke="none" />

      {/* Far edge of lobes (back in 3/4) */}
      <path d="M 26 58 Q 16 48, 20 36 Q 24 26, 34 24 Q 42 24, 46 32"
            strokeWidth={S.P.strokeWidthLight} opacity="0.3" strokeDasharray="2 2" />
      <path d="M 46 32 Q 46 18, 54 12 Q 62 18, 66 32"
            strokeWidth={S.P.strokeWidthLight} opacity="0.3" strokeDasharray="2 2" />
      <path d="M 66 32 Q 68 24, 76 24 Q 86 26, 86 40 Q 86 50, 74 58"
            strokeWidth={S.P.strokeWidthLight} opacity="0.3" strokeDasharray="2 2" />

      {/* LEFT LOBE - front face */}
      <path d="M 14 62 Q 4 50, 8 38 Q 12 26, 26 24 Q 36 24, 40 34"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Left lobe intrados */}
      <path d="M 20 60 Q 12 50, 15 40 Q 18 30, 30 28 Q 38 28, 40 36"
            strokeWidth={S.D.strokeWidthBold} opacity="0.6" />

      {/* CROWN LOBE - front face */}
      <path d="M 40 34 Q 40 16, 50 10 Q 60 16, 60 34"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Crown lobe intrados */}
      <path d="M 40 36 Q 40 20, 50 14 Q 60 20, 60 36"
            strokeWidth={S.D.strokeWidthBold} opacity="0.6" />

      {/* RIGHT LOBE - front face */}
      <path d="M 60 34 Q 64 24, 74 24 Q 88 26, 92 38 Q 96 50, 86 62"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Right lobe intrados */}
      <path d="M 60 36 Q 62 28, 70 28 Q 82 30, 85 40 Q 88 50, 80 60"
            strokeWidth={S.D.strokeWidthBold} opacity="0.6" />

      {/* CUSPS - pointed transitions between lobes (key trefoil feature) */}
      {/* Left cusp (between left lobe and crown lobe) */}
      <path d="M 38 38 L 40 30 L 42 38"
            strokeWidth={S.P.strokeWidthBold} strokeLinejoin="round" />
      {/* Cusp depth face */}
      <polygon points="40,30 42,38 48,34 46,26" fill="currentColor" opacity="0.08" stroke="none" />
      <path d="M 40 30 L 46 26" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* Right cusp (between crown lobe and right lobe) */}
      <path d="M 58 38 L 60 30 L 62 38"
            strokeWidth={S.P.strokeWidthBold} strokeLinejoin="round" />
      {/* Cusp depth face */}
      <polygon points="60,30 62,38 68,34 66,26" fill="currentColor" opacity="0.08" stroke="none" />
      <path d="M 60 30 L 66 26" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* Finial at top */}
      <path d="M 50 10 L 50 4" strokeWidth={S.P.strokeWidth} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 47 4 L 50 0 L 53 4" strokeWidth={S.D.strokeWidthBold} strokeLinejoin="round" />

      {/* Impost blocks */}
      <path d="M 10 62 L 24 62" strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 76 62 L 90 62" strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      <polygon points="10,62 24,62 30,58 16,58" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 24 62 L 30 58" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 10 62 L 16 58" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="76,62 90,62 96,58 82,58" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 90 62 L 96 58" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 12 60 L 22 60" strokeWidth="1" opacity="0.5" />
      <path d="M 78 60 L 88 60" strokeWidth="1" opacity="0.5" />
    </g>
  </svg>
)

// ============================================================================
// TUDOR ARCH - Very FLAT/DEPRESSED pointed arch, wide and low (4-center)
// ============================================================================
export const TudorArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Adjacent Tudor arches */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      <path d="M -20 52 Q -10 48, 0 46 Q 5 42, 8 40" />
      <path d="M 92 40 Q 95 42, 100 46 Q 110 48, 120 52" />
      {/* Floor */}
      <path d="M -10 94 L 110 94" />
      <path d="M -10 98 L 110 98" opacity="0.5" />
    </g>

    {/* CONTEXT (near): Hampton Court wall and spandrel */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      <path d="M -5 -5 L -5 110" />
      <path d="M 95 -5 L 95 110" />
      <path d="M -5 20 L 95 20" opacity="0.6" />
      {/* Hood mold above arch */}
      <path d="M 4 50 Q 20 42, 38 40 Q 44 34, 50 32 Q 56 34, 62 40 Q 80 42, 96 50"
            opacity="0.5" />
      {/* Stone coursing */}
      <path d="M -5 30 L 6 30" strokeWidth="0.4" opacity="0.5" />
      <path d="M 88 30 L 95 30" strokeWidth="0.4" opacity="0.5" />
      {/* Tudor rose spandrel ornament */}
      <circle cx="22" cy="34" r="4" strokeWidth="0.5" opacity="0.6" />
      <circle cx="78" cy="34" r="4" strokeWidth="0.5" opacity="0.6" />
    </g>

    {/* CONTEXT (near): Piers */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      <path d="M 6 -5 L 6 110" strokeWidth="1.2" />
      <path d="M 12 -5 L 12 110" opacity="0.7" />
      <path d="M 88 -5 L 88 110" strokeWidth="1.2" />
      <path d="M 82 -5 L 82 110" opacity="0.7" />
    </g>

    {/* Wall mass */}
    <path d="M 6 20 L 88 20 L 88 52 L 6 52 Z" fill="currentColor" opacity="0.04" stroke="none" />

    {/* PRIMARY: THE TUDOR ARCH - FLAT, wide, barely pointed */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>

      {/* DEPTH: Soffit showing the wide, flat arch receding in 3/4 */}
      <path d="M 12 52 Q 22 48, 38 44 Q 44 38, 50 36
               Q 56 38, 62 44 Q 78 48, 82 52
               L 88 48 Q 78 44, 64 40 Q 58 34, 52 32
               Q 46 34, 40 40 Q 22 44, 18 48 Z"
            fill="currentColor" opacity="0.1" stroke="none" />

      {/* Far edge (back) */}
      <path d="M 18 48 Q 28 44, 42 40 Q 48 34, 52 32"
            strokeWidth={S.P.strokeWidthLight} opacity="0.35" strokeDasharray="2 2" />
      <path d="M 88 48 Q 78 44, 64 40 Q 58 34, 52 32"
            strokeWidth={S.P.strokeWidthLight} opacity="0.35" strokeDasharray="2 2" />

      {/* Front extrados - FLAT lower curves (large radius, nearly horizontal) */}
      <path d="M 6 52 Q 18 48, 36 44"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 88 52 Q 76 48, 64 44"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      {/* Upper curves (small radius) meeting at very shallow point */}
      <path d="M 36 44 Q 44 36, 50 34"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 64 44 Q 56 36, 50 34"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />

      {/* Front intrados */}
      <path d="M 12 52 Q 22 49, 38 46"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 82 52 Q 72 49, 62 46"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 38 46 Q 44 40, 50 38"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 62 46 Q 56 40, 50 38"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Voussoir joints with depth */}
      <path d="M 16 51 L 22 47" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="16,51 10,52 16,48 22,47" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 28 49 L 34 45" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 40 44 L 46 40" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      {/* Right */}
      <path d="M 54 40 L 60 44" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 66 45 L 72 49" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 76 47 L 82 51" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="76,47 82,48 84,52 78,51" fill="currentColor" opacity="0.06" stroke="none" />

      {/* Shallow pointed keystone - barely a point, very flat */}
      <path d="M 46 38 L 50 32 L 54 38"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinejoin="round" />
      {/* Keystone depth */}
      <polygon points="50,32 54,38 60,34 56,28" fill="currentColor" opacity="0.1" stroke="none" />
      <path d="M 50 32 L 56 28 M 54 38 L 60 34" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* Impost blocks */}
      <path d="M 2 52 L 16 52" strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      <path d="M 78 52 L 92 52" strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      <polygon points="2,52 16,52 22,48 8,48" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 16 52 L 22 48" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 2 52 L 8 48" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <polygon points="78,52 92,52 98,48 84,48" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 92 52 L 98 48" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 4 50 L 14 50" strokeWidth="1" opacity="0.5" />
      <path d="M 80 50 L 90 50" strokeWidth="1" opacity="0.5" />
    </g>
  </svg>
)

// ============================================================================
// KEYSTONE - The central 3D wedge stone at arch crown, shown in context
// ============================================================================
export const KeystoneSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Distant arcade and floor */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      <path d="M -20 88 Q -20 55, 0 35" />
      <path d="M 120 88 Q 120 55, 100 35" />
      <path d="M -10 98 L 110 98" />
    </g>

    {/* CONTEXT (near): Full arch structure surrounding keystone */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      {/* Arch curves */}
      <path d="M 8 88 Q 8 48, 35 28" strokeWidth="1" />
      <path d="M 16 88 Q 16 52, 40 34" strokeWidth="0.8" />
      <path d="M 92 88 Q 92 48, 65 28" strokeWidth="1" />
      <path d="M 84 88 Q 84 52, 60 34" strokeWidth="0.8" />
      {/* Piers */}
      <path d="M 8 -5 L 8 105" strokeWidth="1" />
      <path d="M 16 -5 L 16 105" strokeWidth="0.7" />
      <path d="M 92 -5 L 92 105" strokeWidth="1" />
      <path d="M 84 -5 L 84 105" strokeWidth="0.7" />
      {/* Wall above */}
      <path d="M 0 5 L 100 5" strokeWidth="0.7" />
      <path d="M 0 5 L 0 98" strokeWidth="0.5" />
      <path d="M 100 5 L 100 98" strokeWidth="0.5" />
      {/* Adjacent voussoirs as context */}
      <path d="M 28 38 L 34 30 L 42 28 L 38 36 Z" strokeWidth="0.7" />
      <path d="M 62 28 L 66 30 L 72 38 L 62 36 Z" strokeWidth="0.7" />
      {/* Further voussoirs */}
      <path d="M 18 52 L 26 42 L 32 40 L 26 50 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      <path d="M 68 40 L 74 42 L 82 52 L 74 50 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      {/* Impost */}
      <path d="M 4 88 L 20 88" strokeWidth="0.6" />
      <path d="M 80 88 L 96 88" strokeWidth="0.6" />
    </g>

    {/* PRIMARY: THE KEYSTONE - 3D wedge shown from 3/4 perspective */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>

      {/* FRONT FACE: trapezoidal — wider at extrados (top), narrower at intrados (bottom) */}
      <path d="M 38 26 L 42 10 L 58 10 L 62 26 L 56 38 L 44 38 Z"
            strokeWidth={S.P.strokeWidthBold} strokeLinejoin="round" />

      {/* TOP DEPTH FACE (extrados face receding in 3/4 perspective) */}
      <polygon points="42,10 58,10 66,6 50,6" fill="currentColor" opacity="0.1" stroke="none" />
      <path d="M 42 10 L 50 6" strokeWidth={S.P.strokeWidthBold} strokeLinejoin="round" />
      <path d="M 58 10 L 66 6" strokeWidth={S.P.strokeWidthBold} strokeLinejoin="round" />
      <path d="M 50 6 L 66 6" strokeWidth={S.P.strokeWidthBold} strokeLinejoin="round" />

      {/* RIGHT SIDE DEPTH FACE (visible side of the wedge in 3/4) */}
      <polygon points="58,10 62,26 56,38 70,34 70,22 66,6" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 58 10 L 66 6" strokeWidth={S.P.strokeWidth} />
      <path d="M 62 26 L 70 22" strokeWidth={S.P.strokeWidth} />
      <path d="M 56 38 L 64 34" strokeWidth={S.P.strokeWidth} />
      <path d="M 66 6 L 70 22 L 64 34" strokeWidth={S.P.strokeWidth} />

      {/* DETAIL: Decorative carving on front face */}
      <path d="M 48 14 L 50 11 L 52 14" strokeWidth={S.D.strokeWidthBold} strokeLinejoin="round" />
      <path d="M 46 21 L 50 17 L 54 21" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      <path d="M 47 28 L 50 25 L 53 28" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* DETAIL: Mortar joint lines on front face */}
      <path d="M 38 26 L 44 38" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 62 26 L 56 38" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* Shadow under projecting keystone */}
      <path d="M 44 38 L 56 38" strokeWidth="1.5" opacity="0.12" />
    </g>

    {/* EFFECTS: Force arrows showing compression */}
    <g opacity={S.E.opacityModerate} strokeDasharray={S.E.dash} strokeWidth={S.E.strokeWidth}>
      <path d="M 26 48 L 42 34" strokeWidth="0.8" />
      <path d="M 42 34 L 40 37" strokeWidth="0.6" />
      <path d="M 42 34 L 44 37" strokeWidth="0.6" />
      <path d="M 74 48 L 58 34" strokeWidth="0.8" />
      <path d="M 58 34 L 56 37" strokeWidth="0.6" />
      <path d="M 58 34 L 60 37" strokeWidth="0.6" />
    </g>
  </svg>
)

// ============================================================================
// VOUSSOIR - A single 3D wedge-shaped stone from the arch ring, in context
// ============================================================================
export const VoussoirSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Floor and adjacent arch hints */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      <path d="M -10 92 L 110 92" />
      <path d="M -10 96 L 110 96" opacity="0.5" />
      <path d="M -25 80 Q -15 45, 5 30" />
      <path d="M 95 30 Q 115 45, 125 80" />
    </g>

    {/* CONTEXT (near): Arch structure and neighbors */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      {/* Full arch showing the ring of voussoirs */}
      <path d="M 8 80 Q 8 48, 30 28 Q 42 18, 50 16 Q 58 18, 70 28 Q 92 48, 92 80" strokeWidth="1" />
      <path d="M 16 80 Q 16 52, 36 34 Q 44 26, 50 24 Q 56 26, 64 34 Q 84 52, 84 80" strokeWidth="0.8" />
      {/* Piers */}
      <path d="M 8 -5 L 8 100" strokeWidth="1" />
      <path d="M 16 -5 L 16 100" strokeWidth="0.7" />
      <path d="M 92 -5 L 92 100" strokeWidth="1" />
      <path d="M 84 -5 L 84 100" strokeWidth="0.7" />
      {/* Wall */}
      <path d="M -5 5 L 105 5" strokeWidth="0.6" />
      {/* Impost */}
      <path d="M 4 80 L 20 80" strokeWidth="0.6" />
      <path d="M 80 80 L 96 80" strokeWidth="0.6" />
      {/* Ghost voussoir joints around the whole arch */}
      <path d="M 12 72 L 20 62" strokeWidth="0.5" opacity="0.4" />
      <path d="M 20 58 L 30 48" strokeWidth="0.5" opacity="0.4" />
      <path d="M 32 42 L 42 34" strokeWidth="0.5" opacity="0.4" />
      <path d="M 46 26 L 54 26" strokeWidth="0.5" opacity="0.4" />
      <path d="M 58 34 L 68 42" strokeWidth="0.5" opacity="0.4" />
      <path d="M 70 48 L 80 58" strokeWidth="0.5" opacity="0.4" />
      <path d="M 80 62 L 88 72" strokeWidth="0.5" opacity="0.4" />
    </g>

    {/* PRIMARY: THE HIGHLIGHTED VOUSSOIR — a single wedge stone shown 3D from 3/4 */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>

      {/* The voussoir we are highlighting: one on the left side of the arch */}
      {/* FRONT FACE: trapezoidal — wider at extrados, narrower at intrados */}
      <path d="M 20 58 L 12 72 L 20 68 L 30 48 Z"
            strokeWidth={S.P.strokeWidthBold} strokeLinejoin="round" />

      {/* EXTRADOS FACE (outer curve face, receding in 3/4 depth) */}
      <polygon points="20,58 30,48 38,44 28,54" fill="currentColor" opacity="0.06" stroke="none" />
      <path d="M 20 58 L 28 54" strokeWidth={S.P.strokeWidth} />
      <path d="M 30 48 L 38 44" strokeWidth={S.P.strokeWidth} />
      <path d="M 28 54 L 38 44" strokeWidth={S.P.strokeWidth} />

      {/* INTRADOS FACE (inner curve face, receding in 3/4 depth) */}
      <polygon points="12,72 20,68 28,64 20,68" fill="currentColor" opacity="0.08" stroke="none" />
      <path d="M 12 72 L 20 68" strokeWidth={S.P.strokeWidth} />
      <path d="M 20 68 L 28 64" strokeWidth={S.P.strokeWidth} />

      {/* SIDE DEPTH FACE (the visible thickness of the wedge in 3/4) */}
      <polygon points="30,48 20,68 28,64 38,44" fill="currentColor" opacity="0.1" stroke="none" />
      <path d="M 30 48 L 38 44" strokeWidth={S.P.strokeWidth} />
      <path d="M 20 68 L 28 64" strokeWidth={S.P.strokeWidth} />
      <path d="M 38 44 L 28 64" strokeWidth={S.P.strokeWidth} />

      {/* DETAIL: Surface tooling marks on front face */}
      <path d="M 22 60 L 24 56" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 18 66 L 20 62" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 26 52 L 28 50" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

      {/* NEIGHBORING VOUSSOIRS to show context (semi-bold) */}
      {/* Upper neighbor */}
      <path d="M 30 48 L 32 42 L 42 34 L 38 40 Z"
            strokeWidth={S.P.strokeWidth} opacity="0.7" strokeLinejoin="round" />
      {/* Upper neighbor depth face */}
      <polygon points="30,48 38,44 46,40 38,40 42,34 50,30" fill="currentColor" opacity="0.04" stroke="none" />
      <path d="M 42 34 L 50 30" strokeWidth={S.D.strokeWidth} opacity="0.4" />
      <path d="M 38 40 L 46 36" strokeWidth={S.D.strokeWidth} opacity="0.4" />

      {/* Lower neighbor */}
      <path d="M 12 72 L 8 80 L 16 78 L 20 68 Z"
            strokeWidth={S.P.strokeWidth} opacity="0.7" strokeLinejoin="round" />
      {/* Lower neighbor depth */}
      <polygon points="12,72 20,68 28,64 20,68" fill="currentColor" opacity="0.04" stroke="none" />
      <path d="M 16 78 L 24 74" strokeWidth={S.D.strokeWidth} opacity="0.4" />
    </g>

    {/* DETAIL: Joint mortar lines between voussoirs */}
    <g opacity={S.D.opacitySubtle}>
      <path d="M 30 48 L 20 68" strokeWidth={S.D.strokeWidthFine} />
      <path d="M 12 72 L 20 68" strokeWidth={S.D.strokeWidthFine} />
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
