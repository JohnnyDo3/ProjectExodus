'use client'

import React from 'react'

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
// BARREL VAULT - Continuous semicircular arch, the simplest vault type
// Reference: Roman basilicas, Romanesque naves - tunnel-like ceiling
// ============================================================================
export const BarrelVaultSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Side walls and ground - dashed blueprint */}
    <g strokeDasharray="3 2" opacity="0.4">
      <path d="M 6 92 L 6 48" strokeWidth="1.2" fill="none" />
      <path d="M 94 92 L 94 48" strokeWidth="1.2" fill="none" />
      <path d="M 5 92 L 95 92" strokeWidth="0.8" fill="none" />
      {/* Wall thickness */}
      <path d="M 12 92 L 12 50" strokeWidth="0.6" fill="none" opacity="0.7" />
      <path d="M 88 92 L 88 50" strokeWidth="0.6" fill="none" opacity="0.7" />
    </g>

    {/* PRIMARY: THE BARREL VAULT - continuous tunnel shape */}
    <g filter={showHalo ? "url(#vault-halo)" : undefined}>
      {/* Front arch - extrados */}
      <path d="M 6 48 Q 6 10, 50 10 Q 94 10, 94 48" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Front arch - intrados */}
      <path d="M 12 50 Q 12 18, 50 18 Q 88 18, 88 50" strokeWidth="1.8" fill="none" opacity="0.75" />

      {/* Receding arches showing depth/perspective */}
      <path d="M 18 52 Q 18 24, 50 24 Q 82 24, 82 52" strokeWidth="1.4" fill="none" opacity="0.55" />
      <path d="M 24 55 Q 24 30, 50 30 Q 76 30, 76 55" strokeWidth="1.1" fill="none" opacity="0.4" />
      <path d="M 30 58 Q 30 36, 50 36 Q 70 36, 70 58" strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M 36 60 Q 36 42, 50 42 Q 64 42, 64 60" strokeWidth="0.6" fill="none" opacity="0.2" />

      {/* Longitudinal ribs showing vault length */}
      <path d="M 50 10 L 50 62" strokeWidth="0.9" fill="none" opacity="0.45" />
      <path d="M 30 18 L 30 60" strokeWidth="0.6" fill="none" opacity="0.3" />
      <path d="M 70 18 L 70 60" strokeWidth="0.6" fill="none" opacity="0.3" />
    </g>

    {/* Impost line at springing */}
    <path d="M 3 48 L 15 48" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M 85 48 L 97 48" strokeWidth="1.5" fill="none" opacity="0.5" />
  </svg>
)

// ============================================================================
// GROIN VAULT - Two barrel vaults intersecting at right angles
// Reference: Roman baths, Romanesque crypts - X-shaped intersection
// ============================================================================
export const GroinVaultSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Corner piers and ground - dashed blueprint */}
    <g strokeDasharray="3 2" opacity="0.4">
      <path d="M 8 92 L 8 58" strokeWidth="1.5" fill="none" />
      <path d="M 92 92 L 92 58" strokeWidth="1.5" fill="none" />
      <path d="M 8 92 L 92 92" strokeWidth="0.8" fill="none" />
      {/* Inner pier faces */}
      <path d="M 14 92 L 14 60" strokeWidth="0.8" fill="none" opacity="0.7" />
      <path d="M 86 92 L 86 60" strokeWidth="0.8" fill="none" opacity="0.7" />
    </g>

    {/* PRIMARY: THE GROIN VAULT - X-shaped intersection of two tunnels */}
    <g filter={showHalo ? "url(#vault-halo)" : undefined}>
      {/* Side arches (transverse) */}
      <path d="M 8 58 Q 29 42, 50 58" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 50 58 Q 71 42, 92 58" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* THE GROINS - diagonal intersecting ridges (key feature) */}
      <path d="M 8 58 Q 34 36, 50 14" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M 92 58 Q 66 36, 50 14" strokeWidth="2.8" fill="none" strokeLinecap="round" />

      {/* Inner groin lines */}
      <path d="M 14 55 Q 36 36, 50 20" strokeWidth="1.6" fill="none" opacity="0.6" />
      <path d="M 86 55 Q 64 36, 50 20" strokeWidth="1.6" fill="none" opacity="0.6" />

      {/* Web/surface between groins */}
      <path d="M 24 52 Q 38 44, 50 36" strokeWidth="0.7" fill="none" opacity="0.4" />
      <path d="M 76 52 Q 62 44, 50 36" strokeWidth="0.7" fill="none" opacity="0.4" />
    </g>

    {/* Crown point where groins meet */}
    <circle cx="50" cy="14" r="2.5" strokeWidth="1.5" fill="none" opacity="0.7" />
  </svg>
)

// ============================================================================
// RIB VAULT - Structural ribs with thin webbing, Gothic innovation
// Reference: Gothic cathedrals (Notre-Dame, Chartres) - skeleton of ribs
// ============================================================================
export const RibVaultSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Corner piers and responds - dashed blueprint */}
    <g strokeDasharray="3 2" opacity="0.4">
      <path d="M 8 92 L 8 58" strokeWidth="2" fill="none" />
      <path d="M 92 92 L 92 58" strokeWidth="2" fill="none" />
      <path d="M 50 92 L 50 78" strokeWidth="1.5" fill="none" />
      <path d="M 8 92 L 92 92" strokeWidth="0.8" fill="none" />
    </g>

    {/* PRIMARY: THE RIB VAULT - prominent structural stone ribs */}
    <g filter={showHalo ? "url(#vault-halo)" : undefined}>
      {/* DIAGONAL RIBS - the primary structural members */}
      <path d="M 8 58 Q 32 34, 50 12" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M 92 58 Q 68 34, 50 12" strokeWidth="3.2" fill="none" strokeLinecap="round" />

      {/* TRANSVERSE RIBS - crossing the space */}
      <path d="M 8 58 Q 29 44, 50 58" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M 50 58 Q 71 44, 92 58" strokeWidth="2.8" fill="none" strokeLinecap="round" />

      {/* RIDGE RIB (longitudinal) - optional in some Gothic */}
      <path d="M 50 12 L 50 58" strokeWidth="2.2" fill="none" opacity="0.8" />

      {/* Rib molding profiles (inner edge) */}
      <path d="M 12 55 Q 34 34, 48 16" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 88 55 Q 66 34, 52 16" strokeWidth="1" fill="none" opacity="0.5" />
    </g>

    {/* Webbing/infill - thin membrane between ribs (lighter) */}
    <g opacity="0.25">
      <path d="M 24 50 Q 38 40, 50 32" strokeWidth="0.7" fill="none" />
      <path d="M 76 50 Q 62 40, 50 32" strokeWidth="0.7" fill="none" />
      <path d="M 30 54 L 50 46 L 70 54" strokeWidth="0.5" fill="none" />
    </g>

    {/* Carved boss at apex (decorative keystone) */}
    <circle cx="50" cy="12" r="4.5" strokeWidth="2" fill="none" />
    <circle cx="50" cy="12" r="2.5" strokeWidth="1" fill="none" opacity="0.6" />
  </svg>
)

// ============================================================================
// FAN VAULT - Ribs spread like fan from springer, English Perpendicular
// Reference: King's College Chapel, Cambridge - masterpiece of fan vaulting
// ============================================================================
export const FanVaultSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Corner springer/corbel and walls - dashed blueprint */}
    <g strokeDasharray="3 2" opacity="0.4">
      <path d="M 6 92 L 6 62" strokeWidth="2" fill="none" />
      <path d="M 94 92 L 94 62" strokeWidth="2" fill="none" />
      <path d="M 6 92 L 94 92" strokeWidth="0.8" fill="none" />
    </g>

    {/* PRIMARY: THE FAN VAULT - ribs radiating like an open fan */}
    <g filter={showHalo ? "url(#vault-halo)" : undefined}>
      {/* LEFT FAN - ribs spreading from corner springer */}
      <path d="M 6 62 Q 14 58, 24 54" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 6 62 Q 18 50, 32 44" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 6 62 Q 22 42, 40 34" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 6 62 Q 28 36, 50 26" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M 6 62 Q 30 44, 50 40" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* RIGHT FAN - mirror image */}
      <path d="M 94 62 Q 86 58, 76 54" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 94 62 Q 82 50, 68 44" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 94 62 Q 78 42, 60 34" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 94 62 Q 72 36, 50 26" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M 94 62 Q 70 44, 50 40" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Conoid surface curves (the fan shape) */}
      <path d="M 14 60 Q 32 52, 50 48" strokeWidth="0.9" fill="none" opacity="0.5" />
      <path d="M 86 60 Q 68 52, 50 48" strokeWidth="0.9" fill="none" opacity="0.5" />

      {/* Decorative tracery panels between ribs */}
      <path d="M 18 56 Q 28 52, 36 50" strokeWidth="0.5" fill="none" opacity="0.35" />
      <path d="M 82 56 Q 72 52, 64 50" strokeWidth="0.5" fill="none" opacity="0.35" />
    </g>

    {/* Central spine/ridge where fans meet */}
    <path d="M 50 26 L 50 62" strokeWidth="1.4" fill="none" opacity="0.6" />

    {/* Pendant boss (hanging ornament) */}
    <circle cx="50" cy="26" r="3.5" strokeWidth="1.6" fill="none" />
    <path d="M 50 29.5 L 50 38" strokeWidth="1.4" fill="none" opacity="0.7" />
  </svg>
)

export const VAULT_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'barrel-vault': BarrelVaultSVG,
  'groin-vault': GroinVaultSVG,
  'rib-vault': RibVaultSVG,
  'fan-vault': FanVaultSVG,
}
