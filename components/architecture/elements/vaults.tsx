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
// BARREL VAULT - Continuous semicircular arch, simplest vault type
// ============================================================================
export const BarrelVaultSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Side walls */}
    <g opacity="0.4">
      <path d="M 8 90 L 8 45" strokeWidth="2" fill="none" />
      <path d="M 92 90 L 92 45" strokeWidth="2" fill="none" />
      <path d="M 5 90 L 95 90" strokeWidth="1" fill="none" />
    </g>

    {/* BARREL VAULT - continuous tunnel shape */}
    <g filter={showHalo ? "url(#vault-halo)" : undefined}>
      {/* Front arch */}
      <path d="M 8 45 Q 8 12, 50 12 Q 92 12, 92 45" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Receding arches showing depth */}
      <path d="M 15 48 Q 15 18, 50 18 Q 85 18, 85 48" strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M 22 52 Q 22 25, 50 25 Q 78 25, 78 52" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M 28 55 Q 28 32, 50 32 Q 72 32, 72 55" strokeWidth="1" fill="none" opacity="0.35" />
      <path d="M 34 58 Q 34 38, 50 38 Q 66 38, 66 58" strokeWidth="0.8" fill="none" opacity="0.25" />

      {/* Longitudinal ribs */}
      <path d="M 50 12 L 50 60" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M 30 20 L 30 58" strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M 70 20 L 70 58" strokeWidth="0.8" fill="none" opacity="0.3" />
    </g>

    {/* Impost line */}
    <path d="M 5 45 L 15 45" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M 85 45 L 95 45" strokeWidth="1.5" fill="none" opacity="0.5" />
  </svg>
)

// ============================================================================
// GROIN VAULT - Two barrel vaults intersecting at right angles
// ============================================================================
export const GroinVaultSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Corner piers */}
    <g opacity="0.4">
      <path d="M 10 90 L 10 55" strokeWidth="2.5" fill="none" />
      <path d="M 90 90 L 90 55" strokeWidth="2.5" fill="none" />
      <path d="M 10 90 L 90 90" strokeWidth="1" fill="none" />
    </g>

    {/* GROIN VAULT - X-shaped intersection */}
    <g filter={showHalo ? "url(#vault-halo)" : undefined}>
      {/* Four arched edges */}
      <path d="M 10 55 Q 30 40, 50 55" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 50 55 Q 70 40, 90 55" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Groins - the diagonal intersecting edges (key feature) */}
      <path d="M 10 55 Q 35 35, 50 15" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 90 55 Q 65 35, 50 15" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Inner groins */}
      <path d="M 18 52 Q 38 35, 50 20" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M 82 52 Q 62 35, 50 20" strokeWidth="2" fill="none" opacity="0.6" />

      {/* Surface panels */}
      <path d="M 25 50 Q 40 42, 50 35" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 75 50 Q 60 42, 50 35" strokeWidth="0.8" fill="none" opacity="0.4" />
    </g>

    {/* Crown point */}
    <circle cx="50" cy="15" r="2" strokeWidth="1.5" fill="none" opacity="0.7" />
  </svg>
)

// ============================================================================
// RIB VAULT - Structural ribs with infill panels, Gothic innovation
// ============================================================================
export const RibVaultSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Corner piers/responds */}
    <g opacity="0.4">
      <path d="M 10 90 L 10 55" strokeWidth="3" fill="none" />
      <path d="M 90 90 L 90 55" strokeWidth="3" fill="none" />
      <path d="M 50 90 L 50 75" strokeWidth="2" fill="none" />
    </g>

    {/* RIB VAULT - prominent structural ribs */}
    <g filter={showHalo ? "url(#vault-halo)" : undefined}>
      {/* Diagonal ribs - the primary structural elements */}
      <path d="M 10 55 Q 32 32, 50 12" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M 90 55 Q 68 32, 50 12" strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* Transverse ribs */}
      <path d="M 10 55 Q 30 42, 50 55" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 50 55 Q 70 42, 90 55" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Ridge rib (longitudinal) */}
      <path d="M 50 12 L 50 55" strokeWidth="2.5" fill="none" opacity="0.8" />

      {/* Rib profiles (showing molding) */}
      <path d="M 12 53 Q 33 31, 48 14" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 88 53 Q 67 31, 52 14" strokeWidth="1" fill="none" opacity="0.5" />
    </g>

    {/* Webbing/infill (lighter, between ribs) */}
    <g opacity="0.25">
      <path d="M 25 48 Q 38 38, 50 30" strokeWidth="0.8" fill="none" />
      <path d="M 75 48 Q 62 38, 50 30" strokeWidth="0.8" fill="none" />
      <path d="M 30 52 L 50 45 L 70 52" strokeWidth="0.6" fill="none" />
    </g>

    {/* Boss at apex */}
    <circle cx="50" cy="12" r="4" strokeWidth="2" fill="none" />
    <circle cx="50" cy="12" r="2" strokeWidth="1" fill="none" opacity="0.6" />
  </svg>
)

// ============================================================================
// FAN VAULT - Ribs spread like fan from springer, English Perpendicular
// ============================================================================
export const FanVaultSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Corner springers */}
    <g opacity="0.5">
      <path d="M 8 90 L 8 60" strokeWidth="3" fill="none" />
      <path d="M 92 90 L 92 60" strokeWidth="3" fill="none" />
    </g>

    {/* FAN VAULT - ribs radiating like a fan from corners */}
    <g filter={showHalo ? "url(#vault-halo)" : undefined}>
      {/* Left fan - ribs spreading from corner */}
      <path d="M 8 60 Q 15 55, 25 52" strokeWidth="2" fill="none" />
      <path d="M 8 60 Q 18 48, 32 42" strokeWidth="2" fill="none" />
      <path d="M 8 60 Q 22 40, 40 32" strokeWidth="2" fill="none" />
      <path d="M 8 60 Q 28 35, 50 25" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 8 60 Q 30 42, 50 38" strokeWidth="2" fill="none" />

      {/* Right fan - mirror */}
      <path d="M 92 60 Q 85 55, 75 52" strokeWidth="2" fill="none" />
      <path d="M 92 60 Q 82 48, 68 42" strokeWidth="2" fill="none" />
      <path d="M 92 60 Q 78 40, 60 32" strokeWidth="2" fill="none" />
      <path d="M 92 60 Q 72 35, 50 25" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 92 60 Q 70 42, 50 38" strokeWidth="2" fill="none" />

      {/* Conoid surface curves */}
      <path d="M 15 58 Q 32 50, 50 45" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 85 58 Q 68 50, 50 45" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Decorative tracery panels between ribs */}
      <path d="M 20 55 Q 28 52, 35 50" strokeWidth="0.6" fill="none" opacity="0.4" />
      <path d="M 80 55 Q 72 52, 65 50" strokeWidth="0.6" fill="none" opacity="0.4" />
    </g>

    {/* Central spine/ridge */}
    <path d="M 50 25 L 50 60" strokeWidth="1.5" fill="none" opacity="0.6" />

    {/* Pendant boss */}
    <circle cx="50" cy="25" r="3" strokeWidth="1.5" fill="none" />
    <path d="M 50 28 L 50 35" strokeWidth="1.5" fill="none" opacity="0.7" />
  </svg>
)

export const VAULT_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'barrel-vault': BarrelVaultSVG,
  'groin-vault': GroinVaultSVG,
  'rib-vault': RibVaultSVG,
  'fan-vault': FanVaultSVG,
}
