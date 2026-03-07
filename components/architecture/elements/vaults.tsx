'use client'

import React from 'react'
import { S } from './svgStyleTokens'

const HaloFilter = () => (
  <defs>
    <filter id="vault-halo" x="-50%" y="-50%" width="200%" height="200%">
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
// BARREL VAULT - 3/4 interior perspective looking INTO the tunnel
// Reference: Roman basilicas, Romanesque naves - continuous semicircular tunnel
// PERSPECTIVE: Standing inside, looking up and into the receding tunnel
// ============================================================================
export const BarrelVaultSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (far): Vanishing point and far end of tunnel */}
    <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth} fill="none">
      {/* Far end wall (apse) */}
      <path d="M 38 42 L 38 58" />
      <path d="M 62 42 L 62 58" />
      <path d="M 38 58 L 62 58" />
      {/* Far end arch (smallest) */}
      <path d="M 38 42 Q 50 32, 62 42" />
    </g>

    {/* CONTEXT (near): Side walls receding in perspective */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth} fill="none">
      {/* Left wall — near bottom-left to far mid-left */}
      <path d="M 2 90 L 38 58" strokeWidth="1.2" />
      {/* Right wall — near bottom-right to far mid-right */}
      <path d="M 98 90 L 62 58" strokeWidth="1.2" />
      {/* Floor line receding */}
      <path d="M 2 90 L 98 90" strokeWidth="1" />
      <path d="M 2 90 L 38 58" strokeWidth="0.5" opacity="0.3" />
      <path d="M 98 90 L 62 58" strokeWidth="0.5" opacity="0.3" />
      {/* Impost/springing line on left wall */}
      <path d="M 2 48 L 38 42" strokeWidth="0.8" />
      {/* Impost/springing line on right wall */}
      <path d="M 98 48 L 62 42" strokeWidth="0.8" />
    </g>

    {/* Interior vault surface — subtle concave fill */}
    <path d="M 2 48 Q 50 4, 98 48 L 62 42 Q 50 32, 38 42 Z"
          fill="currentColor" opacity="0.06" stroke="none" />
    <path d="M 38 42 Q 50 32, 62 42 L 62 58 L 38 58 Z"
          fill="currentColor" opacity="0.1" stroke="none" />

    {/* PRIMARY: THE BARREL VAULT — semicircular tunnel in perspective */}
    <g filter={showHalo ? "url(#vault-halo)" : undefined}>
      {/* Near arch — front opening (largest, boldest) */}
      <path d="M 2 48 Q 2 4, 50 4 Q 98 4, 98 48"
            strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Receding arches — showing tunnel depth */}
      <path d="M 10 47 Q 10 12, 50 12 Q 90 12, 90 47"
            strokeWidth={S.P.strokeWidthBold} fill="none" opacity="0.7" />
      <path d="M 18 46 Q 18 18, 50 18 Q 82 18, 82 46"
            strokeWidth={S.P.strokeWidth} fill="none" opacity="0.5" />
      <path d="M 26 44 Q 26 24, 50 24 Q 74 24, 74 44"
            strokeWidth="1.2" fill="none" opacity="0.38" />
      <path d="M 32 43 Q 32 28, 50 28 Q 68 28, 68 43"
            strokeWidth="1.0" fill="none" opacity="0.28" />
      {/* Farthest visible arch */}
      <path d="M 38 42 Q 38 32, 50 32 Q 62 32, 62 42"
            strokeWidth="0.8" fill="none" opacity="0.2" />

      {/* DETAIL: Longitudinal masonry courses running along the tunnel */}
      {/* Crown line (top of tunnel) */}
      <path d="M 50 4 L 50 32" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      {/* Upper courses — left side */}
      <path d="M 20 14 Q 28 20, 38 34" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 10 26 Q 20 30, 38 38" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacitySubtle} />
      {/* Upper courses — right side */}
      <path d="M 80 14 Q 72 20, 62 34" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 90 26 Q 80 30, 62 38" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacitySubtle} />

      {/* DETAIL: Transverse joint lines on the vault surface (mortar courses) */}
      <path d="M 6 36 Q 50 8, 94 36" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 14 40 Q 50 15, 86 40" strokeWidth={S.D.strokeWidthFine} fill="none" opacity="0.25" />
    </g>

    {/* Springing line at base of arch */}
    <path d="M 2 48 L 98 48" strokeWidth={S.P.strokeWidthLight} fill="none" opacity="0.4" />
  </svg>
)

// ============================================================================
// GROIN VAULT - Worm's-eye view looking straight up at two barrel vaults
// crossing at right angles. The X-shaped groin is the key feature.
// Reference: Roman baths, Romanesque crypts
// ============================================================================
export const GroinVaultSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Square bay boundary — the four arches at the edges */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth} fill="none">
      {/* Four perimeter arches of the bay (seen from below) */}
      {/* Bottom arch */}
      <path d="M 5 95 Q 50 78, 95 95" strokeWidth="1.2" />
      {/* Top arch */}
      <path d="M 5 5 Q 50 22, 95 5" strokeWidth="0.8" />
      {/* Left arch */}
      <path d="M 5 5 Q 22 50, 5 95" strokeWidth="1.0" />
      {/* Right arch */}
      <path d="M 95 5 Q 78 50, 95 95" strokeWidth="1.0" />
      {/* Corner pier points */}
      <circle cx="5" cy="5" r="2" strokeWidth="0.8" />
      <circle cx="95" cy="5" r="2" strokeWidth="0.8" />
      <circle cx="5" cy="95" r="2" strokeWidth="1" />
      <circle cx="95" cy="95" r="2" strokeWidth="1" />
    </g>

    {/* Vault surface fills — four curved triangular webs/cells */}
    {/* Bottom-left web */}
    <path d="M 5 95 Q 22 50, 5 5 L 5 5 Q 50 22, 50 50 Q 50 78, 5 95 Z"
          fill="currentColor" opacity="0.07" stroke="none" />
    {/* Bottom-right web */}
    <path d="M 95 95 Q 78 50, 95 5 L 95 5 Q 50 22, 50 50 Q 50 78, 95 95 Z"
          fill="currentColor" opacity="0.09" stroke="none" />
    {/* Top-left web */}
    <path d="M 5 5 Q 50 22, 50 50 L 50 50 Q 22 50, 5 5 Z"
          fill="currentColor" opacity="0.06" stroke="none" />
    {/* Top-right web */}
    <path d="M 95 5 Q 50 22, 50 50 L 50 50 Q 78 50, 95 5 Z"
          fill="currentColor" opacity="0.08" stroke="none" />

    {/* PRIMARY: THE GROIN — bold X-shaped diagonal intersection edges */}
    <g filter={showHalo ? "url(#vault-halo)" : undefined}>
      {/* THE GROINS — the two bold diagonal ridges forming the X */}
      <path d="M 5 95 Q 30 68, 50 50 Q 70 32, 95 5"
            strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 95 95 Q 70 68, 50 50 Q 30 32, 5 5"
            strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Inner groin edge lines (showing rib thickness/depth) */}
      <path d="M 8 92 Q 32 66, 50 50 Q 68 34, 92 8"
            strokeWidth={S.P.strokeWidthLight} fill="none" opacity="0.5" />
      <path d="M 92 92 Q 68 66, 50 50 Q 32 34, 8 8"
            strokeWidth={S.P.strokeWidthLight} fill="none" opacity="0.5" />

      {/* Crown keystone where groins meet */}
      <circle cx="50" cy="50" r="3.5" strokeWidth={S.P.strokeWidthBold} fill="none" />
      <circle cx="50" cy="50" r="1.5" strokeWidth={S.P.strokeWidthLight} fill="none" opacity="0.6" />
    </g>

    {/* DETAIL: Surface lines on the four web cells showing curvature */}
    <g opacity={S.D.opacitySubtle} strokeWidth={S.D.strokeWidthFine} fill="none">
      {/* Bottom-left cell curvature */}
      <path d="M 10 70 Q 22 60, 30 50" />
      <path d="M 20 82 Q 30 70, 38 58" />
      {/* Bottom-right cell curvature */}
      <path d="M 90 70 Q 78 60, 70 50" />
      <path d="M 80 82 Q 70 70, 62 58" />
      {/* Top-left cell curvature */}
      <path d="M 10 30 Q 22 40, 30 50" />
      <path d="M 20 18 Q 30 30, 38 42" />
      {/* Top-right cell curvature */}
      <path d="M 90 30 Q 78 40, 70 50" />
      <path d="M 80 18 Q 70 30, 62 42" />
    </g>
  </svg>
)

// ============================================================================
// RIB VAULT - Worm's-eye view looking up. Prominent structural RIBS along
// the groins and ridges, with thin web panels between them.
// Reference: Gothic cathedrals (Notre-Dame, Chartres)
// ============================================================================
export const RibVaultSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Square bay boundary arches */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth} fill="none">
      {/* Perimeter arches — pointed Gothic arches */}
      <path d="M 5 95 Q 25 82, 50 78 Q 75 82, 95 95" strokeWidth="1.0" />
      <path d="M 5 5 Q 25 18, 50 22 Q 75 18, 95 5" strokeWidth="0.7" />
      <path d="M 5 5 Q 18 25, 22 50 Q 18 75, 5 95" strokeWidth="0.9" />
      <path d="M 95 5 Q 82 25, 78 50 Q 82 75, 95 95" strokeWidth="0.9" />
      {/* Corner springer corbels (column capitals) */}
      <circle cx="5" cy="95" r="3" strokeWidth="1" />
      <circle cx="95" cy="95" r="3" strokeWidth="1" />
      <circle cx="5" cy="5" r="2.5" strokeWidth="0.7" />
      <circle cx="95" cy="5" r="2.5" strokeWidth="0.7" />
    </g>

    {/* Web panel fills — thin membrane between ribs, lighter weight */}
    <path d="M 5 95 L 50 78 L 50 50 L 22 50 L 5 95 Z"
          fill="currentColor" opacity="0.06" stroke="none" />
    <path d="M 95 95 L 50 78 L 50 50 L 78 50 L 95 95 Z"
          fill="currentColor" opacity="0.08" stroke="none" />
    <path d="M 5 5 L 50 22 L 50 50 L 22 50 L 5 5 Z"
          fill="currentColor" opacity="0.06" stroke="none" />
    <path d="M 95 5 L 50 22 L 50 50 L 78 50 L 95 5 Z"
          fill="currentColor" opacity="0.07" stroke="none" />

    {/* PRIMARY: THE RIBS — thick structural arched ribs */}
    <g filter={showHalo ? "url(#vault-halo)" : undefined}>
      {/* DIAGONAL RIBS — the primary structural members (the X) */}
      <path d="M 5 95 Q 28 70, 50 50"
            strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 50 50 Q 72 30, 95 5"
            strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 95 95 Q 72 70, 50 50"
            strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 50 50 Q 28 30, 5 5"
            strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* TRANSVERSE RIBS — crossing the space side to side */}
      <path d="M 5 95 Q 18 75, 22 50 Q 18 25, 5 5"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} opacity="0.85" />
      <path d="M 95 95 Q 82 75, 78 50 Q 82 25, 95 5"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} opacity="0.85" />

      {/* RIDGE RIBS — longitudinal ribs connecting apex to perimeter midpoints */}
      <path d="M 50 78 L 50 50 L 50 22"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} opacity="0.85" />

      {/* Rib inner edges (showing rib molding profile/depth) */}
      <path d="M 8 92 Q 30 68, 50 50 Q 70 32, 92 8"
            strokeWidth={S.P.strokeWidthLight} fill="none" opacity="0.4" />
      <path d="M 92 92 Q 70 68, 50 50 Q 30 32, 8 8"
            strokeWidth={S.P.strokeWidthLight} fill="none" opacity="0.4" />

      {/* BOSS — decorative carved keystone at center where ribs meet */}
      <circle cx="50" cy="50" r="5" strokeWidth={S.P.strokeWidthBold} fill="none" />
      <circle cx="50" cy="50" r="3" strokeWidth={S.P.strokeWidth} fill="none" opacity="0.7" />
      <circle cx="50" cy="50" r="1.2" strokeWidth={S.P.strokeWidthLight} fill="none" opacity="0.5" />
    </g>

    {/* DETAIL: Web surface curvature lines — lighter than ribs */}
    <g opacity={S.D.opacitySubtle} strokeWidth={S.D.strokeWidthFine} fill="none">
      {/* Curvature lines in each web cell */}
      <path d="M 14 76 Q 28 64, 36 54" />
      <path d="M 24 86 Q 34 72, 42 60" />
      <path d="M 86 76 Q 72 64, 64 54" />
      <path d="M 76 86 Q 66 72, 58 60" />
      <path d="M 14 24 Q 28 36, 36 46" />
      <path d="M 24 14 Q 34 28, 42 40" />
      <path d="M 86 24 Q 72 36, 64 46" />
      <path d="M 76 14 Q 66 28, 58 40" />
    </g>
  </svg>
)

// ============================================================================
// FAN VAULT - Worm's-eye view. Fan-shaped rib patterns radiating from
// column tops like palm fronds. Multiple fans meeting at center.
// Reference: King's College Chapel, Gloucester Cathedral cloisters
// ============================================================================
export const FanVaultSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Bay edges — the rectangular boundary */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacitySubtle} strokeWidth={S.CN.strokeWidthFine} fill="none">
      <rect x="3" y="3" width="94" height="94" />
    </g>

    {/* Conoid surface fills — the trumpet-shaped fan surfaces */}
    {/* Bottom-left fan */}
    <path d="M 3 97 Q 3 55, 30 38 Q 42 32, 50 50 Q 32 60, 3 97 Z"
          fill="currentColor" opacity="0.07" stroke="none" />
    {/* Bottom-right fan */}
    <path d="M 97 97 Q 97 55, 70 38 Q 58 32, 50 50 Q 68 60, 97 97 Z"
          fill="currentColor" opacity="0.08" stroke="none" />
    {/* Top-left fan */}
    <path d="M 3 3 Q 3 45, 30 62 Q 42 68, 50 50 Q 32 40, 3 3 Z"
          fill="currentColor" opacity="0.06" stroke="none" />
    {/* Top-right fan */}
    <path d="M 97 3 Q 97 45, 70 62 Q 58 68, 50 50 Q 68 40, 97 3 Z"
          fill="currentColor" opacity="0.07" stroke="none" />

    {/* PRIMARY: FOUR FAN CONOIDS — radiating rib tracery from corners */}
    <g filter={showHalo ? "url(#vault-halo)" : undefined}>

      {/* ===== BOTTOM-LEFT FAN ===== */}
      <g>
        {/* Radiating ribs — fan spreading from corner */}
        <path d="M 3 97 Q 8 78, 16 64" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 3 97 Q 10 72, 22 56" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 3 97 Q 14 68, 28 50" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 3 97 Q 18 65, 34 46" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 3 97 Q 24 66, 40 44" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 3 97 Q 30 70, 46 48" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 3 97 Q 38 78, 48 56" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
        {/* Concentric lierne arcs connecting the ribs */}
        <path d="M 10 78 Q 16 72, 24 68 Q 32 66, 38 68" strokeWidth={S.D.strokeWidthBold} fill="none" opacity="0.6" />
        <path d="M 14 68 Q 22 60, 30 54 Q 38 50, 44 52" strokeWidth={S.D.strokeWidth} fill="none" opacity="0.5" />
        {/* Fine tracery between ribs */}
        <path d="M 8 84 Q 12 80, 18 76" strokeWidth={S.E.strokeWidth} fill="none" opacity={S.CN.opacity} />
        <path d="M 12 74 Q 18 68, 26 62" strokeWidth={S.E.strokeWidth} fill="none" opacity={S.CN.opacity} />
      </g>

      {/* ===== BOTTOM-RIGHT FAN ===== */}
      <g>
        <path d="M 97 97 Q 92 78, 84 64" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 97 97 Q 90 72, 78 56" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 97 97 Q 86 68, 72 50" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 97 97 Q 82 65, 66 46" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 97 97 Q 76 66, 60 44" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 97 97 Q 70 70, 54 48" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 97 97 Q 62 78, 52 56" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
        {/* Concentric lierne arcs */}
        <path d="M 90 78 Q 84 72, 76 68 Q 68 66, 62 68" strokeWidth={S.D.strokeWidthBold} fill="none" opacity="0.6" />
        <path d="M 86 68 Q 78 60, 70 54 Q 62 50, 56 52" strokeWidth={S.D.strokeWidth} fill="none" opacity="0.5" />
        {/* Fine tracery */}
        <path d="M 92 84 Q 88 80, 82 76" strokeWidth={S.E.strokeWidth} fill="none" opacity={S.CN.opacity} />
        <path d="M 88 74 Q 82 68, 74 62" strokeWidth={S.E.strokeWidth} fill="none" opacity={S.CN.opacity} />
      </g>

      {/* ===== TOP-LEFT FAN ===== */}
      <g opacity="0.9">
        <path d="M 3 3 Q 8 22, 16 36" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 3 3 Q 10 28, 22 44" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 3 3 Q 14 32, 28 50" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 3 3 Q 18 35, 34 54" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 3 3 Q 24 34, 40 56" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 3 3 Q 30 30, 46 52" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 3 3 Q 38 22, 48 44" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
        {/* Lierne arcs */}
        <path d="M 10 22 Q 16 28, 24 32 Q 32 34, 38 32" strokeWidth={S.D.strokeWidth} fill="none" opacity="0.5" />
        <path d="M 14 32 Q 22 40, 30 46 Q 38 50, 44 48" strokeWidth={S.D.strokeWidthFine} fill="none" opacity="0.4" />
      </g>

      {/* ===== TOP-RIGHT FAN ===== */}
      <g opacity="0.9">
        <path d="M 97 3 Q 92 22, 84 36" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 97 3 Q 90 28, 78 44" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 97 3 Q 86 32, 72 50" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 97 3 Q 82 35, 66 54" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 97 3 Q 76 34, 60 56" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 97 3 Q 70 30, 54 52" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
        <path d="M 97 3 Q 62 22, 52 44" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
        {/* Lierne arcs */}
        <path d="M 90 22 Q 84 28, 76 32 Q 68 34, 62 32" strokeWidth={S.D.strokeWidth} fill="none" opacity="0.5" />
        <path d="M 86 32 Q 78 40, 70 46 Q 62 50, 56 48" strokeWidth={S.D.strokeWidthFine} fill="none" opacity="0.4" />
      </g>

      {/* ===== CENTRAL SPANDREL & BOSS ===== */}
      <g>
        {/* Central flat spandrel where four fans meet */}
        <path d="M 46 44 L 54 44 L 56 50 L 54 56 L 46 56 L 44 50 Z"
              strokeWidth={S.P.strokeWidth} fill="none" opacity="0.7" />
        {/* Heavy decorative boss at center */}
        <circle cx="50" cy="50" r="6" strokeWidth={S.P.strokeWidthBold} fill="none" />
        <circle cx="50" cy="50" r="3.5" strokeWidth={S.P.strokeWidth} fill="none" opacity="0.7" />
        <circle cx="50" cy="50" r="1.5" strokeWidth={S.D.strokeWidthBold} fill="none" opacity="0.5" />
        {/* Rosette ornament radiating from boss */}
        <path d="M 50 44 L 50 42" strokeWidth={S.D.strokeWidthBold} fill="none" opacity="0.6" />
        <path d="M 50 56 L 50 58" strokeWidth={S.D.strokeWidthBold} fill="none" opacity="0.6" />
        <path d="M 44 50 L 42 50" strokeWidth={S.D.strokeWidthBold} fill="none" opacity="0.6" />
        <path d="M 56 50 L 58 50" strokeWidth={S.D.strokeWidthBold} fill="none" opacity="0.6" />
      </g>
    </g>

    {/* SPRINGER CORBELS at corners */}
    <g opacity="0.6">
      <circle cx="3" cy="97" r="3" strokeWidth={S.D.strokeWidthBold} fill="none" />
      <circle cx="97" cy="97" r="3" strokeWidth={S.D.strokeWidthBold} fill="none" />
      <circle cx="3" cy="3" r="2.5" strokeWidth={S.P.strokeWidthLight} fill="none" />
      <circle cx="97" cy="3" r="2.5" strokeWidth={S.P.strokeWidthLight} fill="none" />
    </g>
  </svg>
)

export const VAULT_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'barrel-vault': BarrelVaultSVG,
  'groin-vault': GroinVaultSVG,
  'rib-vault': RibVaultSVG,
  'fan-vault': FanVaultSVG,
}
