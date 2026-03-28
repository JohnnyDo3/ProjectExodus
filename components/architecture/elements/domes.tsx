'use client'

import React from 'react'
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
// DOME - 3/4 exterior view of a hemispherical dome on a cylindrical drum.
// Meridian (longitude) and parallel (latitude) lines create the 3D grid.
// Reference: St. Peter's Basilica, Florence Cathedral
// ============================================================================
export const DomeSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (far): Distant rooflines */}
    <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth} fill="none">
      <path d="M 2 92 L 14 86 L 26 92" />
      <path d="M 74 92 L 86 85 L 98 92" />
    </g>

    {/* CONTEXT (near): Drum — cylindrical base supporting the dome */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth} fill="none">
      {/* Drum walls */}
      <path d="M 14 60 L 14 82" strokeWidth="1.2" />
      <path d="M 86 60 L 86 82" strokeWidth="1.2" />
      {/* Drum base ellipse */}
      <ellipse cx="50" cy="82" rx="36" ry="8" strokeWidth="1" />
      {/* Drum top ellipse (springing line) */}
      <ellipse cx="50" cy="60" rx="36" ry="7" strokeWidth="1" />
      {/* Drum windows */}
      <path d="M 28 66 Q 28 62, 32 62 Q 36 62, 36 66" strokeWidth="0.6" opacity="0.5" />
      <path d="M 42 65 Q 42 61, 46 61 Q 50 61, 50 65" strokeWidth="0.6" opacity="0.5" />
      <path d="M 56 65 Q 56 61, 60 61 Q 64 61, 64 65" strokeWidth="0.6" opacity="0.5" />
      <path d="M 70 66 Q 70 62, 74 62 Q 78 62, 78 66" strokeWidth="0.6" opacity="0.5" />
      {/* Base structure */}
      <path d="M 5 92 L 95 92" strokeWidth="0.8" />
    </g>

    {/* 3D shading — far side of dome darker */}
    <path d="M 50 16 Q 72 22, 82 38 Q 88 48, 86 60 L 66 60 Q 72 48, 72 36 Q 68 24, 50 18 Z"
          fill="currentColor" opacity="0.1" stroke="none" />
    {/* Near side lighter shadow */}
    <path d="M 50 16 Q 28 22, 18 38 Q 14 48, 14 60 L 34 60 Q 28 48, 28 36 Q 32 24, 50 18 Z"
          fill="currentColor" opacity="0.06" stroke="none" />

    {/* PRIMARY: THE DOME — hemispherical shell */}
    <g filter={showHalo ? "url(#dome-halo)" : undefined}>
      {/* Main dome profile — outer contour */}
      <path d="M 14 60 Q 14 24, 50 14 Q 86 24, 86 60"
            strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* DETAIL: Meridian lines (longitude — from apex to base) */}
      {/* Center meridian */}
      <path d="M 50 14 L 50 60" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      {/* Left meridians */}
      <path d="M 50 14 Q 36 20, 24 38 Q 18 48, 16 60"
            strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 50 14 Q 42 18, 34 30 Q 28 42, 26 60"
            strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacitySubtle} />
      {/* Right meridians */}
      <path d="M 50 14 Q 64 20, 76 38 Q 82 48, 84 60"
            strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 50 14 Q 58 18, 66 30 Q 72 42, 74 60"
            strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacitySubtle} />
      {/* Far-side meridians (visible curving around) */}
      <path d="M 50 14 Q 44 16, 40 22 Q 36 30, 38 60"
            strokeWidth={S.D.strokeWidthFine} fill="none" opacity="0.2" />
      <path d="M 50 14 Q 56 16, 60 22 Q 64 30, 62 60"
            strokeWidth={S.D.strokeWidthFine} fill="none" opacity="0.2" />

      {/* DETAIL: Parallel lines (latitude — horizontal rings) */}
      <path d="M 20 52 Q 50 46, 80 52"
            strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacity} />
      <path d="M 24 44 Q 50 38, 76 44"
            strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacity} />
      <path d="M 30 34 Q 50 29, 70 34"
            strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 38 26 Q 50 22, 62 26"
            strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
    </g>

    {/* Lantern at top */}
    <g opacity={S.D.opacityStrong}>
      <path d="M 46 14 L 46 8" strokeWidth={S.D.strokeWidthBold} fill="none" />
      <path d="M 54 14 L 54 8" strokeWidth={S.D.strokeWidthBold} fill="none" />
      <path d="M 44 8 L 56 8" strokeWidth={S.D.strokeWidthBold} fill="none" />
      <path d="M 50 8 L 50 3" strokeWidth={S.D.strokeWidthBold} fill="none" />
      {/* Lantern ball */}
      <circle cx="50" cy="3" r="1.5" strokeWidth={S.D.strokeWidth} fill="none" />
    </g>
  </svg>
)

// ============================================================================
// OCULUS - Interior view looking straight up into a coffered dome with
// a circular opening (oculus) at the apex. Light streams through.
// Reference: Pantheon, Rome — the 27-foot open eye to the sky
// ============================================================================
export const OculusSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Drum walls and cornice below the dome (seen from below) */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth} fill="none">
      {/* Outer drum ring */}
      <ellipse cx="50" cy="54" rx="46" ry="40" strokeWidth="1.2" />
      {/* Inner cornice ring */}
      <ellipse cx="50" cy="54" rx="43" ry="37" strokeWidth="0.8" opacity={S.CN.opacitySubtle} />
      {/* Pilaster hints around drum */}
      <path d="M 6 60 L 4 88" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      <path d="M 18 40 L 10 20" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      <path d="M 82 40 L 90 20" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      <path d="M 94 60 L 96 88" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
    </g>

    {/* Dome interior surface fill — concave from below */}
    <ellipse cx="50" cy="54" rx="42" ry="36"
             fill="currentColor" opacity="0.06" stroke="none" />

    {/* CONTEXT (near): Coffering pattern — concentric rings of recessed panels */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacitySubtle} strokeWidth={S.CN.strokeWidthFine} fill="none">
      {/* Radial coffer ribs (meridians from oculus outward) */}
      <path d="M 50 22 L 12 56" />
      <path d="M 50 22 L 22 26" />
      <path d="M 50 22 L 26 70" />
      <path d="M 50 22 L 38 84" />
      <path d="M 50 22 L 62 84" />
      <path d="M 50 22 L 74 70" />
      <path d="M 50 22 L 78 26" />
      <path d="M 50 22 L 88 56" />
      {/* Additional radials for density */}
      <path d="M 50 22 L 16 38" />
      <path d="M 50 22 L 18 72" />
      <path d="M 50 22 L 50 90" />
      <path d="M 50 22 L 82 72" />
      <path d="M 50 22 L 84 38" />

      {/* Concentric coffer rings (parallels) */}
      <ellipse cx="50" cy="46" rx="24" ry="20" />
      <ellipse cx="50" cy="50" rx="32" ry="27" />
      <ellipse cx="50" cy="52" rx="38" ry="32" />
    </g>

    {/* Light cone from oculus — subtle fill */}
    <ellipse cx="50" cy="40" rx="12" ry="10"
             fill="currentColor" opacity="0.04" stroke="none" />

    {/* PRIMARY: THE OCULUS — the circular opening at the apex */}
    <g filter={showHalo ? "url(#dome-halo)" : undefined}>
      {/* Outer ring — thick bronze-like frame */}
      <ellipse cx="50" cy="28" rx="16" ry="12" strokeWidth={S.P.strokeWidthHeavy} fill="none" />
      {/* Inner rim step */}
      <ellipse cx="50" cy="28" rx="13" ry="10" strokeWidth={S.P.strokeWidthBold} fill="none" opacity="0.7" />
      {/* Innermost edge — the actual opening to sky */}
      <ellipse cx="50" cy="28" rx="10" ry="8" strokeWidth={S.P.strokeWidthLight} fill="none" opacity="0.6" />
      {/* Decorative ring molding */}
      <ellipse cx="50" cy="28" rx="14.5" ry="11" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacity} />
    </g>

    {/* EFFECTS: Light rays streaming from oculus */}
    <g opacity={S.E.opacity} strokeDasharray={S.E.dash} strokeWidth={S.E.strokeWidth} fill="none">
      <path d="M 42 38 L 30 72" />
      <path d="M 50 40 L 50 82" />
      <path d="M 58 38 L 70 72" />
      <path d="M 46 39 L 38 68" />
      <path d="M 54 39 L 62 68" />
    </g>
  </svg>
)

// ============================================================================
// ONION DOME - 3/4 exterior view. Bulges outward beyond drum diameter,
// then tapers dramatically to a point. Much taller than a regular dome.
// Reference: St. Basil's Cathedral, Russian/Eastern Orthodox churches
// ============================================================================
export const OnionDomeSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Drum base */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth} fill="none">
      {/* Drum cylinder */}
      <path d="M 34 82 L 34 92" strokeWidth="1.2" />
      <path d="M 66 82 L 66 92" strokeWidth="1.2" />
      <ellipse cx="50" cy="92" rx="16" ry="4" strokeWidth="0.8" />
      <ellipse cx="50" cy="82" rx="16" ry="3.5" strokeWidth="0.8" />
      {/* Drum arcade/windows */}
      <path d="M 38 84 Q 38 80, 42 80 Q 46 80, 46 84" strokeWidth="0.5" opacity="0.5" />
      <path d="M 54 84 Q 54 80, 58 80 Q 62 80, 62 84" strokeWidth="0.5" opacity="0.5" />
    </g>

    {/* 3D shading — far side of onion dome */}
    <path d="M 50 8 Q 58 20, 70 28 Q 84 38, 82 54 Q 80 66, 66 78 L 58 78 Q 72 66, 74 54 Q 76 40, 64 30 Q 54 22, 50 12 Z"
          fill="currentColor" opacity="0.1" stroke="none" />
    {/* Near side lighter */}
    <path d="M 50 8 Q 42 20, 30 28 Q 16 38, 18 54 Q 20 66, 34 78 L 42 78 Q 28 66, 26 54 Q 24 40, 36 30 Q 46 22, 50 12 Z"
          fill="currentColor" opacity="0.06" stroke="none" />

    {/* PRIMARY: THE ONION DOME — distinctive bulbous shape */}
    <g filter={showHalo ? "url(#dome-halo)" : undefined}>
      {/* Main onion profile — bulges BEYOND drum width, then tapers to point */}
      <path d="M 34 82 Q 14 70, 16 52 Q 18 36, 36 26 Q 44 20, 50 8 Q 56 20, 64 26 Q 82 36, 84 52 Q 86 70, 66 82"
            strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Inner contour showing shell thickness */}
      <path d="M 36 80 Q 20 68, 22 52 Q 24 38, 40 30 Q 46 24, 50 14 Q 54 24, 60 30 Q 76 38, 78 52 Q 80 68, 64 80"
            strokeWidth={S.P.strokeWidthLight} fill="none" opacity="0.5" />

      {/* DETAIL: Vertical ribs (meridians) typical of onion domes */}
      {/* Center rib */}
      <path d="M 50 8 L 50 82" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      {/* Left ribs */}
      <path d="M 50 8 Q 40 22, 30 34 Q 20 46, 22 58 Q 24 68, 36 80"
            strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 50 8 Q 44 20, 38 28 Q 28 40, 28 54 Q 28 66, 38 80"
            strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      {/* Right ribs */}
      <path d="M 50 8 Q 60 22, 70 34 Q 80 46, 78 58 Q 76 68, 64 80"
            strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 50 8 Q 56 20, 62 28 Q 72 40, 72 54 Q 72 66, 62 80"
            strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />

      {/* DETAIL: Horizontal parallel rings */}
      <path d="M 20 52 Q 50 44, 80 52" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 26 40 Q 50 32, 74 40" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 22 64 Q 50 56, 78 64" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
    </g>

    {/* Orthodox cross finial at apex */}
    <g opacity="0.8">
      <path d="M 50 8 L 50 1" strokeWidth={S.P.strokeWidthBold} fill="none" />
      <path d="M 46 4 L 54 4" strokeWidth={S.P.strokeWidth} fill="none" />
      <path d="M 47 2 L 53 2" strokeWidth={S.P.strokeWidthLight} fill="none" />
    </g>
  </svg>
)

// ============================================================================
// PENDENTIVE - Interior 3/4 view. Spherical triangles in the corners that
// transition from a square base to a circular dome ring above.
// Reference: Hagia Sophia — masterful pendentive construction
// ============================================================================
export const PendentiveSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Square base structure — the four walls/arches below */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth} fill="none">
      {/* Two visible walls of the square bay (3/4 view) */}
      {/* Left wall */}
      <path d="M 4 86 L 4 42" strokeWidth="1.2" />
      {/* Right wall receding */}
      <path d="M 96 86 L 96 50" strokeWidth="1.2" />
      {/* Floor */}
      <path d="M 4 86 L 96 86" strokeWidth="1" />
      {/* Back wall receding */}
      <path d="M 4 42 L 50 38" strokeWidth="0.8" opacity="0.3" />
      <path d="M 96 50 L 50 38" strokeWidth="0.8" opacity="0.3" />

      {/* Front arch (left to right, nearest to viewer) */}
      <path d="M 4 52 Q 50 28, 96 52" strokeWidth="1.2" />
      {/* Left side arch (receding into depth) */}
      <path d="M 4 52 Q 28 34, 50 38" strokeWidth="0.8" opacity="0.4" />
      {/* Right side arch (receding into depth) */}
      <path d="M 96 52 Q 72 34, 50 38" strokeWidth="0.8" opacity="0.4" />
    </g>

    {/* CONTEXT (near): Dome ring above pendentives */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacitySubtle} strokeWidth={S.CN.strokeWidth} fill="none">
      {/* Circular dome base ring */}
      <ellipse cx="50" cy="28" rx="36" ry="10" strokeWidth="0.9" />
      {/* Dome hint above */}
      <path d="M 18 24 Q 18 10, 50 6 Q 82 10, 82 24" strokeWidth="0.7" opacity="0.25" />
    </g>

    {/* Pendentive surface fills — curved spherical triangles */}
    {/* Left pendentive */}
    <path d="M 4 52 Q 14 44, 24 36 Q 30 30, 20 24 L 14 28 Z"
          fill="currentColor" opacity="0.09" stroke="none" />
    {/* Right pendentive */}
    <path d="M 96 52 Q 86 44, 76 36 Q 70 30, 80 24 L 86 28 Z"
          fill="currentColor" opacity="0.11" stroke="none" />
    {/* Back-left pendentive (partially visible) */}
    <path d="M 4 52 Q 16 40, 28 34 Q 34 30, 28 24 L 18 26 Z"
          fill="currentColor" opacity="0.07" stroke="none" />
    {/* Back-right pendentive (partially visible) */}
    <path d="M 96 52 Q 84 40, 72 34 Q 66 30, 72 24 L 82 26 Z"
          fill="currentColor" opacity="0.08" stroke="none" />

    {/* PRIMARY: THE PENDENTIVES — curved spherical triangles */}
    <g filter={showHalo ? "url(#dome-halo)" : undefined}>
      {/* LEFT PENDENTIVE — the prominent spherical triangle */}
      {/* Outer edge curving from arch apex down to pier */}
      <path d="M 4 52 Q 10 44, 16 36 Q 18 30, 16 24"
            strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />
      {/* Surface curvature lines */}
      <path d="M 6 48 Q 12 42, 18 34 Q 20 28, 18 24"
            strokeWidth={S.P.strokeWidthLight} fill="none" opacity="0.5" />
      <path d="M 8 44 Q 14 38, 20 32 Q 20 28, 20 26"
            strokeWidth={S.D.strokeWidth} fill="none" opacity="0.4" />

      {/* RIGHT PENDENTIVE */}
      <path d="M 96 52 Q 90 44, 84 36 Q 82 30, 84 24"
            strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 94 48 Q 88 42, 82 34 Q 80 28, 82 24"
            strokeWidth={S.P.strokeWidthLight} fill="none" opacity="0.5" />
      <path d="M 92 44 Q 86 38, 80 32 Q 80 28, 80 26"
            strokeWidth={S.D.strokeWidth} fill="none" opacity="0.4" />

      {/* BACK-LEFT PENDENTIVE (partially visible, curving away) */}
      <path d="M 4 52 Q 16 38, 28 32 Q 30 28, 26 24"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} opacity="0.6" />

      {/* BACK-RIGHT PENDENTIVE (partially visible) */}
      <path d="M 96 52 Q 84 38, 72 32 Q 70 28, 74 24"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} opacity="0.6" />

      {/* Circular ring where pendentives meet dome base */}
      <ellipse cx="50" cy="26" rx="35" ry="9" strokeWidth={S.P.strokeWidthBold} fill="none" />
    </g>

    {/* DETAIL: Mosaic/decoration hints on pendentive surfaces */}
    <g opacity={S.D.opacitySubtle} strokeWidth={S.D.strokeWidthFine} fill="none">
      <path d="M 8 46 Q 12 40, 16 34" />
      <path d="M 92 46 Q 88 40, 84 34" />
    </g>
  </svg>
)

// ============================================================================
// SQUINCH - Interior 3/4 view of a corner. A small arch or corbelled
// structure bridging the corner of a square room to support an octagonal
// or circular dome above. Angular/arched, NOT smoothly curved like a pendentive.
// Reference: Islamic architecture, Romanesque churches
// ============================================================================
export const SquinchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Corner walls meeting at 90 degrees */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth} fill="none">
      {/* Left wall (facing viewer) */}
      <path d="M 8 92 L 8 32" strokeWidth="1.5" />
      {/* Right wall (receding at angle) */}
      <path d="M 8 92 L 92 92" strokeWidth="1" />
      <path d="M 92 92 L 92 44" strokeWidth="1.2" />
      {/* Wall corner junction at top */}
      <path d="M 8 32 L 8 32" strokeWidth="1.5" />
      {/* Wall thickness on left */}
      <path d="M 14 88 L 14 36" strokeWidth="0.6" opacity="0.5" />
      {/* Wall thickness on right */}
      <path d="M 88 88 L 88 48" strokeWidth="0.6" opacity="0.5" />
    </g>

    {/* CONTEXT (near): Octagonal drum transition above squinch */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacitySubtle} strokeWidth={S.CN.strokeWidthFine} fill="none">
      {/* Octagonal drum wall above */}
      <path d="M 8 32 L 30 24 L 70 24 L 92 32" />
      {/* Dome hint above */}
      <path d="M 30 24 Q 50 14, 70 24" strokeWidth="0.5" opacity="0.2" />
    </g>

    {/* Squinch surface fill — the concave niche */}
    <path d="M 8 44 Q 50 22, 92 44 L 88 48 Q 50 28, 14 48 Z"
          fill="currentColor" opacity="0.08" stroke="none" />
    {/* Shadow below squinch */}
    <path d="M 14 48 Q 50 30, 88 48 L 88 56 Q 50 40, 14 56 Z"
          fill="currentColor" opacity="0.06" stroke="none" />

    {/* PRIMARY: THE SQUINCH — arch spanning the corner */}
    <g filter={showHalo ? "url(#dome-halo)" : undefined}>
      {/* Main squinch arch — THE key structural element bridging the corner */}
      <path d="M 8 44 Q 50 18, 92 44"
            strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Inner arch ring (showing arch depth/thickness) */}
      <path d="M 14 48 Q 50 26, 88 48"
            strokeWidth={S.P.strokeWidthBold} fill="none" opacity={S.D.opacityStrong} />

      {/* Corbeled/stepped layers below — showing the stepped construction */}
      <path d="M 16 54 Q 50 34, 86 54"
            strokeWidth="1.4" fill="none" opacity="0.6" />
      <path d="M 18 60 Q 50 42, 84 60"
            strokeWidth="1.1" fill="none" opacity="0.5" />
      <path d="M 20 66 Q 50 50, 82 66"
            strokeWidth="0.9" fill="none" opacity="0.4" />
      <path d="M 22 72 Q 50 58, 80 72"
            strokeWidth="0.7" fill="none" opacity="0.3" />

      {/* Niche/shell decoration inside the squinch */}
      <path d="M 30 48 Q 50 32, 70 48"
            strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      <path d="M 38 50 L 50 38 L 62 50"
            strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacitySubtle} />
      {/* Radiating lines inside niche (muqarnas-like) */}
      <path d="M 50 32 L 42 50" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 50 32 L 50 52" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 50 32 L 58 50" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
    </g>

    {/* Springing points where squinch meets walls */}
    <g opacity="0.6">
      <circle cx="8" cy="44" r="2" strokeWidth={S.D.strokeWidthBold} fill="none" />
      <circle cx="92" cy="44" r="2" strokeWidth={S.D.strokeWidthBold} fill="none" />
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
