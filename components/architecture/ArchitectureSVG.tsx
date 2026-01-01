'use client'

import React from 'react'

interface ArchitectureSVGProps {
  category: string
  elementId?: string
  className?: string
  size?: number
  showHalo?: boolean
}

// Halo glow filter definition - reusable across all SVGs
const HaloFilter = ({ id = 'halo-glow' }: { id?: string }) => (
  <defs>
    <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
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
    <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="0 0 0 0 0.96
                0 0 0 0 0.62
                0 0 0 0 0.04
                0 0 0 0.5 0"
        result="glow"
      />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
)

// Column SVG - with highlighted capital and shaft
const ColumnSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Base/Plinth - context */}
    <path d="M 22 95 L 78 95" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
    <path d="M 25 91 L 75 91" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
    <path d="M 27 87 L 73 87" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />

    {/* Column Shaft - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 32 87 L 35 28" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 68 87 L 65 28" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Fluting details */}
      <path d="M 38 82 L 40 30" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M 44 82 L 45 30" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M 50 82 L 50 30" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M 56 82 L 55 30" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M 62 82 L 60 30" strokeWidth="1" fill="none" opacity="0.7" />

      {/* Entasis curve suggestion */}
      <path d="M 33 60 Q 31 50 33 40" strokeWidth="0.5" fill="none" opacity="0.4" />
      <path d="M 67 60 Q 69 50 67 40" strokeWidth="0.5" fill="none" opacity="0.4" />
    </g>

    {/* Capital - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 30 28 L 70 28" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 28 24 L 72 24" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Volutes (Ionic style) */}
      <path d="M 25 20 Q 18 17, 20 11 Q 23 5, 30 9" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 75 20 Q 82 17, 80 11 Q 77 5, 70 9" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Echinus and abacus */}
      <path d="M 22 9 L 78 9" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 20 5 L 80 5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// Arch SVG - with highlighted keystone and voussoirs
const ArchSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Piers/supports - context */}
    <g opacity="0.5">
      <path d="M 12 95 L 12 42" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 24 95 L 24 42" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 76 95 L 76 42" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 88 95 L 88 42" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Ground line */}
    <path d="M 5 95 L 95 95" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4" />

    {/* Arch curve - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 24 42 Q 24 10, 50 10 Q 76 10, 76 42" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 12 42 Q 12 5, 50 5 Q 88 5, 88 42" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Voussoirs (arch stones) */}
      <path d="M 28 38 L 22 26" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M 36 28 L 32 16" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M 64 28 L 68 16" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M 72 38 L 78 26" strokeWidth="1.5" fill="none" opacity="0.8" />
    </g>

    {/* Keystone - EXTRA HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 44 14 L 44 5 L 56 5 L 56 14" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 46 10 L 50 7 L 54 10" strokeWidth="1" fill="none" opacity="0.7" />
    </g>
  </svg>
)

// Dome SVG - with highlighted drum and ribs
const DomeSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Base structure - context */}
    <g opacity="0.5">
      <path d="M 8 72 L 8 90" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 92 72 L 92 90" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 8 90 L 92 90" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Main dome curve - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 8 72 Q 8 20, 50 15 Q 92 20, 92 72" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Inner dome structure */}
      <path d="M 18 68 Q 18 28, 50 23 Q 82 28, 82 68" strokeWidth="1.5" fill="none" opacity="0.6" />

      {/* Ribbing */}
      <path d="M 50 15 L 50 72" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M 28 26 Q 32 48, 33 72" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 72 26 Q 68 48, 67 72" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Coffering suggestion */}
      <path d="M 22 50 Q 50 38, 78 50" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 30 35 Q 50 28, 70 35" strokeWidth="0.8" fill="none" opacity="0.4" />
    </g>

    {/* Lantern/Oculus - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <ellipse cx="50" cy="15" rx="10" ry="4" strokeWidth="2" fill="none" />
      <path d="M 40 15 L 40 7" strokeWidth="1.5" fill="none" />
      <path d="M 60 15 L 60 7" strokeWidth="1.5" fill="none" />
      <path d="M 40 7 Q 50 2, 60 7" strokeWidth="1.5" fill="none" />
      {/* Finial */}
      <circle cx="50" cy="3" r="2" strokeWidth="1" fill="none" />
    </g>

    {/* Drum with windows - context */}
    <g opacity="0.6">
      <rect x="18" y="74" width="10" height="13" strokeWidth="1" fill="none" rx="1" />
      <rect x="33" y="74" width="10" height="13" strokeWidth="1" fill="none" rx="1" />
      <rect x="57" y="74" width="10" height="13" strokeWidth="1" fill="none" rx="1" />
      <rect x="72" y="74" width="10" height="13" strokeWidth="1" fill="none" rx="1" />
    </g>
  </svg>
)

// Window SVG - with highlighted tracery
const WindowSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Outer frame - context */}
    <g opacity="0.5">
      <path d="M 18 92 L 18 28" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 82 92 L 82 28" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 18 28 Q 18 10, 50 10 Q 82 10, 82 28" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 18 92 L 82 92" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Rose window tracery - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <circle cx="50" cy="38" r="18" strokeWidth="2" fill="none" />
      <circle cx="50" cy="38" r="10" strokeWidth="1.5" fill="none" />
      <circle cx="50" cy="38" r="4" strokeWidth="1" fill="none" />

      {/* Tracery spokes */}
      <path d="M 50 20 L 50 28" strokeWidth="1.5" fill="none" />
      <path d="M 50 48 L 50 56" strokeWidth="1.5" fill="none" />
      <path d="M 32 38 L 40 38" strokeWidth="1.5" fill="none" />
      <path d="M 60 38 L 68 38" strokeWidth="1.5" fill="none" />
      <path d="M 37 25 L 43 31" strokeWidth="1.2" fill="none" />
      <path d="M 57 45 L 63 51" strokeWidth="1.2" fill="none" />
      <path d="M 63 25 L 57 31" strokeWidth="1.2" fill="none" />
      <path d="M 43 45 L 37 51" strokeWidth="1.2" fill="none" />

      {/* Quatrefoil details */}
      <circle cx="50" cy="28" r="3" strokeWidth="0.8" fill="none" opacity="0.7" />
      <circle cx="50" cy="48" r="3" strokeWidth="0.8" fill="none" opacity="0.7" />
      <circle cx="40" cy="38" r="3" strokeWidth="0.8" fill="none" opacity="0.7" />
      <circle cx="60" cy="38" r="3" strokeWidth="0.8" fill="none" opacity="0.7" />
    </g>

    {/* Lower panels - context */}
    <g opacity="0.5">
      <path d="M 18 60 L 82 60" strokeWidth="1.5" fill="none" />
      <path d="M 50 60 L 50 92" strokeWidth="1.5" fill="none" />
      <path d="M 34 60 L 34 92" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 66 60 L 66 92" strokeWidth="1" fill="none" opacity="0.6" />
    </g>
  </svg>
)

// Roof SVG - with highlighted gable and eaves
const RoofSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Building facade - context */}
    <g opacity="0.5">
      <path d="M 10 62 L 10 92" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 90 62 L 90 92" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 10 92 L 90 92" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="22" y="70" width="14" height="18" strokeWidth="1" fill="none" rx="1" />
      <rect x="64" y="70" width="14" height="18" strokeWidth="1" fill="none" rx="1" />
      <path d="M 42 92 L 42 72 Q 50 67, 58 72 L 58 92" strokeWidth="1.5" fill="none" />
    </g>

    {/* Main roof - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 5 62 L 50 12 L 95 62" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Ridge line */}
      <path d="M 50 12 L 50 5" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Roof texture/shingles */}
      <path d="M 12 58 L 50 18 L 88 58" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M 18 54 L 50 22 L 82 54" strokeWidth="1" fill="none" opacity="0.4" />

      {/* Shingle lines */}
      <path d="M 20 55 L 30 45" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M 32 58 L 42 48" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M 58 48 L 68 58" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M 70 45 L 80 55" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* Eaves */}
      <path d="M 5 62 L 95 62" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Chimney - context */}
    <g opacity="0.6">
      <path d="M 68 38 L 68 22 L 78 22 L 78 45" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 66 22 L 80 22" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// Vault SVG - with highlighted ribs
const VaultSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Base/walls - context */}
    <g opacity="0.4">
      <path d="M 0 88 L 100 88" strokeWidth="2" fill="none" />
      <path d="M 5 88 L 5 75" strokeWidth="1.5" fill="none" />
      <path d="M 95 88 L 95 75" strokeWidth="1.5" fill="none" />
    </g>

    {/* Main vault curves - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 5 85 Q 5 28, 50 22 Q 95 28, 95 85" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 15 82 Q 15 38, 50 32 Q 85 38, 85 82" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Rib vault lines - EXTRA HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Central rib */}
      <path d="M 50 22 L 50 85" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Cross ribs */}
      <path d="M 5 85 Q 50 45, 95 85" strokeWidth="2" fill="none" opacity="0.9" />
      <path d="M 15 82 Q 50 50, 85 82" strokeWidth="1.5" fill="none" opacity="0.8" />

      {/* Diagonal ribs */}
      <path d="M 5 85 Q 50 35, 95 85" strokeWidth="1.5" fill="none" opacity="0.7" />

      {/* Rib intersections - bosses */}
      <circle cx="50" cy="55" r="3" strokeWidth="1.5" fill="none" />
    </g>

    {/* Webbing texture - context */}
    <g opacity="0.3">
      <path d="M 25 72 Q 50 48, 75 72" strokeWidth="0.8" fill="none" />
      <path d="M 35 62 Q 50 45, 65 62" strokeWidth="0.8" fill="none" />
    </g>
  </svg>
)

// Religious/Church SVG - with highlighted rose window and spire
const ReligiousSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Main tower walls - context */}
    <g opacity="0.5">
      <path d="M 32 92 L 32 48" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 68 92 L 68 48" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Steeple - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 32 48 L 50 15 L 68 48" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Cross at top */}
      <path d="M 50 15 L 50 5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 44 10 L 56 10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>

    {/* Rose window - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <circle cx="50" cy="60" r="10" strokeWidth="2" fill="none" />
      <circle cx="50" cy="60" r="5" strokeWidth="1" fill="none" />
      <path d="M 50 50 L 50 55" strokeWidth="1" fill="none" />
      <path d="M 50 65 L 50 70" strokeWidth="1" fill="none" />
      <path d="M 40 60 L 45 60" strokeWidth="1" fill="none" />
      <path d="M 55 60 L 60 60" strokeWidth="1" fill="none" />
    </g>

    {/* Door - context */}
    <g opacity="0.5">
      <path d="M 40 92 L 40 75 Q 50 70, 60 75 L 60 92" strokeWidth="1.5" fill="none" />
    </g>

    {/* Side wings - context */}
    <g opacity="0.4">
      <path d="M 12 92 L 12 62 L 32 62" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 88 92 L 88 62 L 68 62" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 12 62 L 22 52 L 32 62" strokeWidth="1.5" fill="none" />
      <path d="M 68 62 L 78 52 L 88 62" strokeWidth="1.5" fill="none" />
    </g>

    {/* Ground */}
    <path d="M 5 92 L 95 92" strokeWidth="1.5" fill="none" opacity="0.4" />
  </svg>
)

// Fortification/Castle SVG - with highlighted battlements
const FortificationSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Main walls - context */}
    <g opacity="0.5">
      <path d="M 8 92 L 8 42" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 92 92 L 92 42" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Battlements/Crenellations - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 8 42 L 8 35 L 16 35 L 16 42 L 24 42 L 24 35 L 32 35 L 32 42" strokeWidth="2" fill="none" />
      <path d="M 68 42 L 68 35 L 76 35 L 76 42 L 84 42 L 84 35 L 92 35 L 92 42" strokeWidth="2" fill="none" />
    </g>

    {/* Central tower - context */}
    <g opacity="0.6">
      <path d="M 36 92 L 36 25" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 64 92 L 64 25" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Tower battlements - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 36 25 L 36 18 L 44 18 L 44 25 L 50 25 L 50 18 L 56 18 L 56 25 L 64 25 L 64 18" strokeWidth="2" fill="none" />
    </g>

    {/* Arrow slits - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow-soft)" : undefined}>
      <path d="M 48 38 L 52 38 M 50 34 L 50 42" strokeWidth="1.5" fill="none" />
      <path d="M 48 55 L 52 55 M 50 51 L 50 59" strokeWidth="1.5" fill="none" />
    </g>

    {/* Gate with portcullis - context */}
    <g opacity="0.5">
      <path d="M 42 92 L 42 68 Q 50 60, 58 68 L 58 92" strokeWidth="1.5" fill="none" />
      <path d="M 44 68 L 44 90" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 50 62 L 50 90" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 56 68 L 56 90" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 42 75 L 58 75" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 42 82 L 58 82" strokeWidth="0.8" fill="none" opacity="0.6" />
    </g>

    {/* Ground */}
    <path d="M 0 92 L 100 92" strokeWidth="1.5" fill="none" opacity="0.4" />
  </svg>
)

// Door SVG - with highlighted pediment and panels
const DoorSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Door frame - context */}
    <g opacity="0.5">
      <path d="M 22 95 L 22 22" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 78 95 L 78 22" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 22 22 L 78 22" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Pediment - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 18 22 L 50 5 L 82 22" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 18 22 L 82 22" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Tympanum decoration */}
      <circle cx="50" cy="15" r="4" strokeWidth="1" fill="none" opacity="0.7" />
    </g>

    {/* Door panels - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <rect x="28" y="58" width="17" height="28" strokeWidth="1.5" fill="none" rx="1" />
      <rect x="55" y="58" width="17" height="28" strokeWidth="1.5" fill="none" rx="1" />
      <rect x="28" y="28" width="17" height="24" strokeWidth="1.5" fill="none" rx="1" />
      <rect x="55" y="28" width="17" height="24" strokeWidth="1.5" fill="none" rx="1" />

      {/* Panel details */}
      <rect x="31" y="61" width="11" height="22" strokeWidth="0.8" fill="none" opacity="0.5" rx="1" />
      <rect x="58" y="61" width="11" height="22" strokeWidth="0.8" fill="none" opacity="0.5" rx="1" />
    </g>

    {/* Transom window - context */}
    <g opacity="0.5">
      <path d="M 28 25 L 72 25" strokeWidth="1" fill="none" />
    </g>

    {/* Door handle */}
    <circle cx="70" cy="65" r="2.5" strokeWidth="1.5" fill="none" />

    {/* Threshold */}
    <path d="M 18 95 L 82 95" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
  </svg>
)

// Decorative/Ornament SVG - with highlighted central rosette
const DecorativeSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Central rosette - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <circle cx="50" cy="50" r="22" strokeWidth="2" fill="none" />
      <circle cx="50" cy="50" r="14" strokeWidth="1.5" fill="none" />
      <circle cx="50" cy="50" r="6" strokeWidth="1" fill="none" />

      {/* Inner petal details */}
      <path d="M 50 36 Q 44 43, 50 50" strokeWidth="1" fill="none" />
      <path d="M 50 36 Q 56 43, 50 50" strokeWidth="1" fill="none" />
      <path d="M 64 50 Q 57 44, 50 50" strokeWidth="1" fill="none" />
      <path d="M 64 50 Q 57 56, 50 50" strokeWidth="1" fill="none" />
      <path d="M 50 64 Q 56 57, 50 50" strokeWidth="1" fill="none" />
      <path d="M 50 64 Q 44 57, 50 50" strokeWidth="1" fill="none" />
      <path d="M 36 50 Q 43 56, 50 50" strokeWidth="1" fill="none" />
      <path d="M 36 50 Q 43 44, 50 50" strokeWidth="1" fill="none" />
    </g>

    {/* Acanthus leaves - context */}
    <g opacity="0.6">
      <path d="M 50 28 Q 44 18, 50 8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 50 28 Q 56 18, 50 8" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      <path d="M 72 50 Q 82 44, 92 50" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 72 50 Q 82 56, 92 50" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      <path d="M 50 72 Q 44 82, 50 92" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 50 72 Q 56 82, 50 92" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      <path d="M 28 50 Q 18 44, 8 50" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 28 50 Q 18 56, 8 50" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>

    {/* Diagonal flourishes - context */}
    <g opacity="0.4">
      <path d="M 35 35 Q 24 24, 12 12" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 65 35 Q 76 24, 88 12" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 35 65 Q 24 76, 12 88" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 65 65 Q 76 76, 88 88" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// Interior/Fireplace SVG - with highlighted mantel
const InteriorSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Fireplace surround - context */}
    <g opacity="0.5">
      <path d="M 18 92 L 18 48" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 82 92 L 82 48" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Mantel shelf - HIGHLIGHTED with halo */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 12 48 L 88 48" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 15 44 L 85 44" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Mantel detail */}
      <path d="M 18 48 L 18 44" strokeWidth="1.5" fill="none" />
      <path d="M 82 48 L 82 44" strokeWidth="1.5" fill="none" />

      {/* Decorative corbels */}
      <path d="M 18 48 Q 12 52, 18 58" strokeWidth="1.5" fill="none" />
      <path d="M 82 48 Q 88 52, 82 58" strokeWidth="1.5" fill="none" />
    </g>

    {/* Firebox opening - context */}
    <g opacity="0.6">
      <path d="M 28 92 L 28 58 Q 50 50, 72 58 L 72 92" strokeWidth="2" fill="none" />
    </g>

    {/* Fire suggestion - context */}
    <g opacity="0.4">
      <path d="M 38 88 Q 44 76, 50 82 Q 56 72, 62 88" strokeWidth="1.5" fill="none" />
      <path d="M 44 85 Q 50 78, 56 85" strokeWidth="1" fill="none" />
    </g>

    {/* Mirror/artwork above - context */}
    <g opacity="0.5">
      <rect x="28" y="15" width="44" height="24" strokeWidth="1.5" fill="none" rx="1" />
      <rect x="32" y="19" width="36" height="16" strokeWidth="1" fill="none" rx="1" />
    </g>

    {/* Candlesticks on mantel */}
    <g opacity="0.5">
      <path d="M 24 44 L 24 36" strokeWidth="1" fill="none" />
      <ellipse cx="24" cy="35" rx="2.5" ry="1.5" strokeWidth="0.8" fill="none" />
      <path d="M 76 44 L 76 36" strokeWidth="1" fill="none" />
      <ellipse cx="76" cy="35" rx="2.5" ry="1.5" strokeWidth="0.8" fill="none" />
    </g>

    {/* Floor */}
    <path d="M 8 92 L 92 92" strokeWidth="1.5" fill="none" opacity="0.4" />
  </svg>
)

// Facade SVG - with highlighted portico
const FacadeSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Main building - context */}
    <g opacity="0.4">
      <path d="M 8 92 L 8 28" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 92 92 L 92 28" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Pediment - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 8 28 L 50 8 L 92 28" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 5 28 L 95 28" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Tympanum */}
      <circle cx="50" cy="20" r="5" strokeWidth="1" fill="none" opacity="0.6" />
    </g>

    {/* Columns/Portico - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 24 88 L 24 38" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 40 88 L 40 38" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 60 88 L 60 38" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 76 88 L 76 38" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Column capitals */}
      <path d="M 20 38 L 28 38" strokeWidth="1.5" fill="none" />
      <path d="M 36 38 L 44 38" strokeWidth="1.5" fill="none" />
      <path d="M 56 38 L 64 38" strokeWidth="1.5" fill="none" />
      <path d="M 72 38 L 80 38" strokeWidth="1.5" fill="none" />
    </g>

    {/* Windows - context */}
    <g opacity="0.5">
      <rect x="28" y="48" width="10" height="16" strokeWidth="1" fill="none" rx="1" />
      <rect x="62" y="48" width="10" height="16" strokeWidth="1" fill="none" rx="1" />
    </g>

    {/* Central door - context */}
    <g opacity="0.5">
      <path d="M 42 92 L 42 72 Q 50 67, 58 72 L 58 92" strokeWidth="1.5" fill="none" />
    </g>

    {/* Steps - context */}
    <g opacity="0.4">
      <path d="M 34 92 L 66 92" strokeWidth="1" fill="none" />
      <path d="M 32 95 L 68 95" strokeWidth="1" fill="none" />
    </g>
  </svg>
)

// Floor/Stairs SVG - with highlighted balustrade
const FloorSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Stair treads - context */}
    <g opacity="0.5">
      <path d="M 18 88 L 38 88 L 38 72 L 58 72 L 58 56 L 78 56 L 78 40" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Handrail and balusters - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Handrail */}
      <path d="M 16 82 L 36 82 L 36 66 L 56 66 L 56 50 L 76 50 L 76 34" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Balusters */}
      <path d="M 24 88 L 24 82" strokeWidth="1.5" fill="none" />
      <path d="M 30 88 L 30 82" strokeWidth="1.5" fill="none" />
      <path d="M 44 72 L 44 66" strokeWidth="1.5" fill="none" />
      <path d="M 50 72 L 50 66" strokeWidth="1.5" fill="none" />
      <path d="M 64 56 L 64 50" strokeWidth="1.5" fill="none" />
      <path d="M 70 56 L 70 50" strokeWidth="1.5" fill="none" />
    </g>

    {/* Newel posts - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <circle cx="38" cy="72" r="3" strokeWidth="2" fill="none" />
      <circle cx="58" cy="56" r="3" strokeWidth="2" fill="none" />
      <circle cx="78" cy="40" r="3" strokeWidth="2" fill="none" />

      {/* Finial */}
      <path d="M 78 40 L 78 28" strokeWidth="2" fill="none" />
      <circle cx="78" cy="24" r="4" strokeWidth="1.5" fill="none" />
    </g>

    {/* Floor pattern - context */}
    <g opacity="0.3">
      <path d="M 5 95 L 95 95" strokeWidth="1" fill="none" />
      <path d="M 8 92 L 18 92" strokeWidth="0.8" fill="none" />
    </g>
  </svg>
)

// Ceiling SVG - with highlighted coffering
const CeilingSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Outer frame - context */}
    <g opacity="0.4">
      <rect x="8" y="8" width="84" height="84" strokeWidth="2" fill="none" />
    </g>

    {/* Coffered grid - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Main grid lines */}
      <path d="M 8 38 L 92 38" strokeWidth="2" fill="none" />
      <path d="M 8 62 L 92 62" strokeWidth="2" fill="none" />
      <path d="M 38 8 L 38 92" strokeWidth="2" fill="none" />
      <path d="M 62 8 L 62 92" strokeWidth="2" fill="none" />

      {/* Coffer recesses */}
      <rect x="12" y="12" width="22" height="22" strokeWidth="1" fill="none" />
      <rect x="66" y="12" width="22" height="22" strokeWidth="1" fill="none" />
      <rect x="12" y="66" width="22" height="22" strokeWidth="1" fill="none" />
      <rect x="66" y="66" width="22" height="22" strokeWidth="1" fill="none" />

      {/* Inner coffer details */}
      <rect x="16" y="16" width="14" height="14" strokeWidth="0.8" fill="none" opacity="0.6" />
      <rect x="70" y="16" width="14" height="14" strokeWidth="0.8" fill="none" opacity="0.6" />
      <rect x="16" y="70" width="14" height="14" strokeWidth="0.8" fill="none" opacity="0.6" />
      <rect x="70" y="70" width="14" height="14" strokeWidth="0.8" fill="none" opacity="0.6" />
    </g>

    {/* Central rosette - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <circle cx="50" cy="50" r="12" strokeWidth="2" fill="none" />
      <circle cx="50" cy="50" r="6" strokeWidth="1.5" fill="none" />
      <circle cx="50" cy="50" r="2" strokeWidth="1" fill="none" />

      {/* Rosette spokes */}
      <path d="M 50 38 L 50 44" strokeWidth="1" fill="none" />
      <path d="M 50 56 L 50 62" strokeWidth="1" fill="none" />
      <path d="M 38 50 L 44 50" strokeWidth="1" fill="none" />
      <path d="M 56 50 L 62 50" strokeWidth="1" fill="none" />
    </g>
  </svg>
)

// Wall SVG - with highlighted wainscoting
const WallSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Wall surface - context */}
    <g opacity="0.4">
      <rect x="8" y="12" width="84" height="80" strokeWidth="2" fill="none" />
    </g>

    {/* Crown molding - context */}
    <g opacity="0.5">
      <path d="M 5 12 L 95 12" strokeWidth="2" fill="none" />
      <path d="M 8 16 L 92 16" strokeWidth="1" fill="none" />
    </g>

    {/* Chair rail - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 8 55 L 92 55" strokeWidth="2.5" fill="none" />
      <path d="M 8 52 L 92 52" strokeWidth="1.5" fill="none" />
      <path d="M 8 58 L 92 58" strokeWidth="1.5" fill="none" />
    </g>

    {/* Wainscoting panels - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <rect x="12" y="64" width="22" height="22" strokeWidth="1.5" fill="none" rx="1" />
      <rect x="39" y="64" width="22" height="22" strokeWidth="1.5" fill="none" rx="1" />
      <rect x="66" y="64" width="22" height="22" strokeWidth="1.5" fill="none" rx="1" />

      {/* Panel inner detail */}
      <rect x="15" y="67" width="16" height="16" strokeWidth="0.8" fill="none" opacity="0.6" rx="1" />
      <rect x="42" y="67" width="16" height="16" strokeWidth="0.8" fill="none" opacity="0.6" rx="1" />
      <rect x="69" y="67" width="16" height="16" strokeWidth="0.8" fill="none" opacity="0.6" rx="1" />
    </g>

    {/* Baseboard - context */}
    <g opacity="0.5">
      <path d="M 8 90 L 92 90" strokeWidth="1.5" fill="none" />
    </g>

    {/* Niche/alcove - context */}
    <g opacity="0.4">
      <path d="M 38 25 L 38 48 Q 50 52, 62 48 L 62 25" strokeWidth="1.5" fill="none" />
      <path d="M 38 25 Q 50 20, 62 25" strokeWidth="1.5" fill="none" />
    </g>
  </svg>
)

// Garden SVG - with highlighted pergola
const GardenSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Posts - context */}
    <g opacity="0.5">
      <path d="M 15 88 L 15 42" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 85 88 L 85 42" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Pergola beams - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Main beams */}
      <path d="M 10 42 L 90 42" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 10 36 L 90 36" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Cross rafters */}
      <path d="M 25 36 L 25 26" strokeWidth="1.5" fill="none" />
      <path d="M 40 36 L 40 26" strokeWidth="1.5" fill="none" />
      <path d="M 55 36 L 55 26" strokeWidth="1.5" fill="none" />
      <path d="M 70 36 L 70 26" strokeWidth="1.5" fill="none" />

      {/* Top cross beam */}
      <path d="M 20 26 L 80 26" strokeWidth="1.5" fill="none" />
    </g>

    {/* Vines - context */}
    <g opacity="0.4">
      <path d="M 20 36 Q 26 30, 32 36 Q 38 28, 44 36" strokeWidth="1" fill="none" />
      <path d="M 56 36 Q 62 28, 68 36 Q 74 30, 80 36" strokeWidth="1" fill="none" />
    </g>

    {/* Ground/path - context */}
    <g opacity="0.4">
      <path d="M 5 88 L 95 88" strokeWidth="1.5" fill="none" />
      <ellipse cx="35" cy="92" rx="10" ry="3" strokeWidth="0.8" fill="none" />
      <ellipse cx="60" cy="94" rx="8" ry="2.5" strokeWidth="0.8" fill="none" />
    </g>

    {/* Fountain - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow-soft)" : undefined}>
      <ellipse cx="50" cy="72" rx="16" ry="6" strokeWidth="1.5" fill="none" />
      <path d="M 50 72 L 50 56" strokeWidth="1.5" fill="none" />
      <ellipse cx="50" cy="56" rx="6" ry="2" strokeWidth="1" fill="none" />
      <path d="M 50 54 L 50 50" strokeWidth="1" fill="none" />

      {/* Water spray */}
      <path d="M 50 50 Q 44 44, 40 50" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 50 50 Q 56 44, 60 50" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 50 50 Q 50 42, 50 50" strokeWidth="0.8" fill="none" opacity="0.6" />
    </g>
  </svg>
)

// Urban SVG - with highlighted arcade
const UrbanSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Arcade columns - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 5 92 L 5 38" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 35 92 L 35 38" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 65 92 L 65 38" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 95 92 L 95 38" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Arches - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 5 38 Q 5 15, 20 15 Q 35 15, 35 38" strokeWidth="2" fill="none" />
      <path d="M 35 38 Q 35 15, 50 15 Q 65 15, 65 38" strokeWidth="2" fill="none" />
      <path d="M 65 38 Q 65 15, 80 15 Q 95 15, 95 38" strokeWidth="2" fill="none" />
    </g>

    {/* Entablature - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 0 38 L 100 38" strokeWidth="2" fill="none" />
      <path d="M 0 34 L 100 34" strokeWidth="1.5" fill="none" />
    </g>

    {/* Buildings above - context */}
    <g opacity="0.4">
      <rect x="8" y="5" width="24" height="27" strokeWidth="1" fill="none" />
      <rect x="68" y="5" width="24" height="27" strokeWidth="1" fill="none" />

      {/* Windows */}
      <rect x="12" y="10" width="7" height="9" strokeWidth="0.8" fill="none" />
      <rect x="22" y="10" width="7" height="9" strokeWidth="0.8" fill="none" />
      <rect x="72" y="10" width="7" height="9" strokeWidth="0.8" fill="none" />
      <rect x="82" y="10" width="7" height="9" strokeWidth="0.8" fill="none" />
    </g>

    {/* Ground/plaza - context */}
    <g opacity="0.4">
      <path d="M 0 92 L 100 92" strokeWidth="1.5" fill="none" />
      <path d="M 10 95 L 30 95" strokeWidth="0.8" fill="none" />
      <path d="M 40 96 L 60 96" strokeWidth="0.8" fill="none" />
      <path d="M 70 95 L 90 95" strokeWidth="0.8" fill="none" />
    </g>
  </svg>
)

// Modern SVG - with highlighted pilotis and ribbon windows
const ModernSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Pilotis - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 15 92 L 15 62" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 50 92 L 50 62" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 85 92 L 85 62" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>

    {/* Main floor plate - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 5 62 L 95 62" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 5 58 L 95 58" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Upper structure - context */}
    <g opacity="0.5">
      <rect x="5" y="25" width="90" height="33" strokeWidth="2" fill="none" />
    </g>

    {/* Ribbon windows - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 5 35 L 95 35" strokeWidth="1.5" fill="none" />
      <path d="M 5 50 L 95 50" strokeWidth="1.5" fill="none" />

      {/* Window divisions */}
      <path d="M 20 35 L 20 50" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 40 35 L 40 50" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 60 35 L 60 50" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 80 35 L 80 50" strokeWidth="1" fill="none" opacity="0.6" />
    </g>

    {/* Roof garden - context */}
    <g opacity="0.4">
      <path d="M 5 25 L 95 25" strokeWidth="1.5" fill="none" />
      <path d="M 15 22 Q 20 17, 25 22" strokeWidth="1" fill="none" />
      <path d="M 35 20 Q 42 14, 48 20" strokeWidth="1" fill="none" />
      <path d="M 55 22 Q 62 16, 68 22" strokeWidth="1" fill="none" />
      <path d="M 75 20 Q 82 15, 88 20" strokeWidth="1" fill="none" />
    </g>

    {/* Ground */}
    <path d="M 0 92 L 100 92" strokeWidth="1.5" fill="none" opacity="0.4" />
  </svg>
)

// Default/Generic Architecture SVG
const DefaultSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Simple building - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 18 92 L 18 38" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 82 92 L 82 38" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 18 38 L 50 15 L 82 38" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Door */}
    <path d="M 40 92 L 40 68 Q 50 62, 60 68 L 60 92" strokeWidth="1.5" fill="none" opacity="0.6" />

    {/* Windows */}
    <g opacity="0.5">
      <rect x="25" y="52" width="12" height="14" strokeWidth="1" fill="none" rx="1" />
      <rect x="63" y="52" width="12" height="14" strokeWidth="1" fill="none" rx="1" />
    </g>

    {/* Ground */}
    <path d="M 8 92 L 92 92" strokeWidth="1.5" fill="none" opacity="0.4" />
  </svg>
)

// Main component
export function ArchitectureSVG({ category, elementId, className = '', size, showHalo = false }: ArchitectureSVGProps) {
  const svgClass = `text-[var(--foreground)] ${className}`

  const getSVGComponent = () => {
    const cat = category?.toUpperCase() || ''

    switch (cat) {
      case 'COLUMN':
      case 'COLUMNS':
        return <ColumnSVG showHalo={showHalo} />
      case 'ARCH':
      case 'ARCHES':
        return <ArchSVG showHalo={showHalo} />
      case 'DOME':
      case 'DOMES':
        return <DomeSVG showHalo={showHalo} />
      case 'WINDOW':
      case 'WINDOWS':
        return <WindowSVG showHalo={showHalo} />
      case 'ROOF':
      case 'ROOFS':
        return <RoofSVG showHalo={showHalo} />
      case 'VAULT':
      case 'VAULTS':
        return <VaultSVG showHalo={showHalo} />
      case 'RELIGIOUS':
        return <ReligiousSVG showHalo={showHalo} />
      case 'FORTIFICATION':
      case 'FORTIFICATIONS':
        return <FortificationSVG showHalo={showHalo} />
      case 'DOOR':
      case 'DOORS':
        return <DoorSVG showHalo={showHalo} />
      case 'DECORATIVE':
        return <DecorativeSVG showHalo={showHalo} />
      case 'FACADE':
        return <FacadeSVG showHalo={showHalo} />
      case 'FLOOR':
        return <FloorSVG showHalo={showHalo} />
      case 'CEILING':
        return <CeilingSVG showHalo={showHalo} />
      case 'WALL':
        return <WallSVG showHalo={showHalo} />
      case 'GARDEN':
        return <GardenSVG showHalo={showHalo} />
      case 'INTERIOR':
        return <InteriorSVG showHalo={showHalo} />
      case 'URBAN':
        return <UrbanSVG showHalo={showHalo} />
      case 'SPECIALIZED':
      case 'MODERN':
      case 'MODERNIST':
      case 'CONTEMPORARY':
      case 'HIGH-TECH':
      case 'BRUTALIST':
        return <ModernSVG showHalo={showHalo} />
      case 'STRUCTURAL':
        return <ColumnSVG showHalo={showHalo} />
      default:
        return <DefaultSVG showHalo={showHalo} />
    }
  }

  return (
    <div className={svgClass} style={size ? { width: size, height: size } : undefined}>
      {getSVGComponent()}
    </div>
  )
}

export default ArchitectureSVG
