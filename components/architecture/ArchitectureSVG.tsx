'use client'

import React from 'react'
import { getElementSVG } from './elements'

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

// Column SVG - Ionic Order with classical proportions (9:1 ratio)
const ColumnSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Base/Plinth - Attic base with torus and scotia moldings */}
    <g opacity="0.6">
      <path d="M 22 95 L 78 95" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
      <path d="M 25 92 L 75 92" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
      <ellipse cx="50" cy="89" rx="14" ry="2" strokeWidth="1.8" fill="none" strokeDasharray="3 2" />
      <path d="M 29 87 L 71 87" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
      <ellipse cx="50" cy="84" rx="12" ry="2" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
    </g>

    {/* Column Shaft - HIGHLIGHTED with entasis (subtle bulge) */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Main shaft outline with entasis curve */}
      <path d="M 33 84 Q 32 60, 33.5 40 Q 34 20, 35 15" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 67 84 Q 68 60, 66.5 40 Q 66 20, 65 15" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* 24 flutes with fillets (Ionic characteristic) */}
      <path d="M 38 82 Q 38.5 60, 39 40 Q 39.5 20, 40 15" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M 43 82 Q 43.5 60, 44 40 Q 44.5 20, 45 15" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M 47.5 82 Q 48 60, 48.5 40 Q 49 20, 49.5 15" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M 52.5 82 Q 52 60, 51.5 40 Q 51 20, 50.5 15" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M 57 82 Q 56.5 60, 56 40 Q 55.5 20, 55 15" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M 62 82 Q 61.5 60, 61 40 Q 60.5 20, 60 15" strokeWidth="1" fill="none" opacity="0.7" />

      {/* Entasis bulge indication */}
      <path d="M 33.5 55 Q 32 50, 33.5 45" strokeWidth="0.6" fill="none" opacity="0.5" />
      <path d="M 66.5 55 Q 68 50, 66.5 45" strokeWidth="0.6" fill="none" opacity="0.5" />
    </g>

    {/* Capital - HIGHLIGHTED Ionic with volutes and egg-and-dart */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Abacus (top square block) */}
      <path d="M 19 5 L 81 5" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 20 7 L 80 7" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Volutes (refined spiral scrolls) */}
      <path d="M 25 18 Q 18 16, 18 11 Q 18 7, 22 7 Q 25 7, 26 10 Q 27 13, 25 13" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 75 18 Q 82 16, 82 11 Q 82 7, 78 7 Q 75 7, 74 10 Q 73 13, 75 13" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Volute centers (eye of scroll) */}
      <circle cx="25" cy="11" r="1.5" strokeWidth="1" fill="none" opacity="0.8" />
      <circle cx="75" cy="11" r="1.5" strokeWidth="1" fill="none" opacity="0.8" />

      {/* Echinus with egg-and-dart molding */}
      <path d="M 28 15 L 72 15" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Egg-and-dart pattern suggestion */}
      <ellipse cx="35" cy="15" rx="2" ry="2.5" strokeWidth="0.8" fill="none" opacity="0.6" />
      <ellipse cx="43" cy="15" rx="2" ry="2.5" strokeWidth="0.8" fill="none" opacity="0.6" />
      <ellipse cx="50" cy="15" rx="2" ry="2.5" strokeWidth="0.8" fill="none" opacity="0.6" />
      <ellipse cx="57" cy="15" rx="2" ry="2.5" strokeWidth="0.8" fill="none" opacity="0.6" />
      <ellipse cx="65" cy="15" rx="2" ry="2.5" strokeWidth="0.8" fill="none" opacity="0.6" />

      {/* Necking band */}
      <path d="M 30 18 L 70 18" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M 31 19.5 L 69 19.5" strokeWidth="0.8" fill="none" opacity="0.5" />
    </g>
  </svg>
)

// Arch SVG - Perfect Roman semicircular arch with radiating voussoirs
const ArchSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Piers/supports with impost blocks - context */}
    <g opacity="0.6">
      <path d="M 12 95 L 12 44" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
      <path d="M 20 95 L 20 44" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
      <path d="M 80 95 L 80 44" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
      <path d="M 88 95 L 88 44" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" />

      {/* Impost blocks */}
      <path d="M 10 44 L 22 44" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
      <path d="M 78 44 L 90 44" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
    </g>

    {/* Ground line */}
    <path d="M 5 95 L 95 95" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" opacity="0.6" />

    {/* Perfect semicircular arch - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Outer arch ring - perfect semicircle centered at 50,44 with radius 38 */}
      <path d="M 12 44 A 38 38 0 0 1 88 44" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Inner arch ring - radius 32 */}
      <path d="M 18 44 A 32 32 0 0 1 82 44" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Voussoirs - radiating from center point (50,44) */}
      <path d="M 24 40 L 20 22" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M 31 34 L 28 16" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M 38 28 L 36 10" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M 69 34 L 72 16" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M 62 28 L 64 10" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M 76 40 L 80 22" strokeWidth="1.5" fill="none" opacity="0.8" />

      {/* Horizontal voussoir joints (parallel to curve) */}
      <path d="M 26 36 A 30 30 0 0 1 74 36" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M 32 28 A 24 24 0 0 1 68 28" strokeWidth="0.8" fill="none" opacity="0.5" />
    </g>

    {/* Keystone - EXTRA HIGHLIGHTED (trapezoidal wedge shape) */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Keystone outline - wider at top, narrower at bottom */}
      <path d="M 45 12 L 43 6 L 57 6 L 55 12 Z" strokeWidth="2.5" fill="none" strokeLinejoin="round" />

      {/* Keystone detail lines */}
      <path d="M 46 10 L 54 10" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 45.5 8 L 54.5 8" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* Center indicator */}
      <circle cx="50" cy="9" r="1" strokeWidth="0.8" fill="none" opacity="0.7" />
    </g>

    {/* Extrados (outer curve emphasis) */}
    <g opacity="0.4">
      <path d="M 10 45 A 40 40 0 0 1 90 45" strokeWidth="1" fill="none" strokeDasharray="2 2" />
    </g>
  </svg>
)

// Dome SVG - with highlighted drum and ribs (inspired by Bramante's Renaissance dome design)
const DomeSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Base structure - context */}
    <g opacity="0.6">
      <path d="M 10 70 L 10 88" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
      <path d="M 90 70 L 90 88" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
      <path d="M 10 88 L 90 88" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
    </g>

    {/* Main dome curve - HIGHLIGHTED (double-shell Renaissance dome) */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Outer dome shell - Bramante's ideal hemispherical form */}
      <path d="M 10 70 Q 10 22, 50 12 Q 90 22, 90 70" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Inner dome structure - double shell */}
      <path d="M 18 68 Q 18 30, 50 22 Q 82 30, 82 68" strokeWidth="1.5" fill="none" opacity="0.6" />

      {/* 8 visible ribs radiating from center (Bramante's geometric emphasis) */}
      <path d="M 50 12 L 50 70" strokeWidth="2" fill="none" opacity="0.8" />
      <path d="M 20 30 Q 35 45, 40 70" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M 80 30 Q 65 45, 60 70" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M 30 40 Q 40 52, 44 70" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M 70 40 Q 60 52, 56 70" strokeWidth="1.2" fill="none" opacity="0.6" />

      {/* Horizontal rings - structural rings inspired by Brunelleschi */}
      <path d="M 20 50 Q 50 35, 80 50" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 26 58 Q 50 45, 74 58" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 32 64 Q 50 54, 68 64" strokeWidth="0.6" fill="none" opacity="0.3" />
    </g>

    {/* Lantern - HIGHLIGHTED (classical proportions) */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Lantern base */}
      <ellipse cx="50" cy="12" rx="11" ry="3.5" strokeWidth="2" fill="none" />

      {/* Lantern columns */}
      <path d="M 40 12 L 40 4" strokeWidth="1.8" fill="none" />
      <path d="M 60 12 L 60 4" strokeWidth="1.8" fill="none" />
      <path d="M 45 12 L 45 4" strokeWidth="1.3" fill="none" opacity="0.7" />
      <path d="M 55 12 L 55 4" strokeWidth="1.3" fill="none" opacity="0.7" />

      {/* Lantern dome top */}
      <path d="M 39 4 Q 50 0, 61 4" strokeWidth="1.8" fill="none" />

      {/* Cross finial - Renaissance symbol */}
      <path d="M 50 0 L 50 -6" strokeWidth="1.5" fill="none" />
      <path d="M 46 -3 L 54 -3" strokeWidth="1.5" fill="none" />
      <circle cx="50" cy="-0.5" r="1.5" strokeWidth="1" fill="none" opacity="0.6" />
    </g>

    {/* Drum with windows - context (Renaissance drum with classical rhythm) */}
    <g opacity="0.6">
      {/* Drum cornice */}
      <path d="M 10 70 L 90 70" strokeWidth="1.5" fill="none" />

      {/* Arched windows in drum - classical spacing */}
      <path d="M 16 73 L 16 84 M 24 73 L 24 84" strokeWidth="1.2" fill="none" />
      <path d="M 16 73 Q 20 69, 24 73" strokeWidth="1.2" fill="none" />

      <path d="M 33 73 L 33 84 M 41 73 L 41 84" strokeWidth="1.2" fill="none" />
      <path d="M 33 73 Q 37 69, 41 73" strokeWidth="1.2" fill="none" />

      <path d="M 59 73 L 59 84 M 67 73 L 67 84" strokeWidth="1.2" fill="none" />
      <path d="M 59 73 Q 63 69, 67 73" strokeWidth="1.2" fill="none" />

      <path d="M 76 73 L 76 84 M 84 73 L 84 84" strokeWidth="1.2" fill="none" />
      <path d="M 76 73 Q 80 69, 84 73" strokeWidth="1.2" fill="none" />
    </g>
  </svg>
)

// Window SVG - Gothic rose window with geometric tracery
const WindowSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Outer stone frame - context */}
    <g opacity="0.6">
      <path d="M 18 92 L 18 28" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
      <path d="M 82 92 L 82 28" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
      <path d="M 18 28 A 32 32 0 0 1 82 28" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
      <path d="M 18 92 L 82 92" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
    </g>

    {/* Rose window tracery - HIGHLIGHTED (geometric precision) */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Outer circles - concentric rings */}
      <circle cx="50" cy="38" r="20" strokeWidth="2.5" fill="none" />
      <circle cx="50" cy="38" r="14" strokeWidth="2" fill="none" />
      <circle cx="50" cy="38" r="8" strokeWidth="1.8" fill="none" />
      <circle cx="50" cy="38" r="3" strokeWidth="1.5" fill="none" />

      {/* Main radial spokes (8-fold symmetry) */}
      <path d="M 50 18 L 50 35" strokeWidth="1.8" fill="none" />
      <path d="M 50 41 L 50 58" strokeWidth="1.8" fill="none" />
      <path d="M 30 38 L 42 38" strokeWidth="1.8" fill="none" />
      <path d="M 58 38 L 70 38" strokeWidth="1.8" fill="none" />

      {/* Diagonal spokes */}
      <path d="M 36 24 L 44 32" strokeWidth="1.5" fill="none" />
      <path d="M 56 44 L 64 52" strokeWidth="1.5" fill="none" />
      <path d="M 64 24 L 56 32" strokeWidth="1.5" fill="none" />
      <path d="M 44 44 L 36 52" strokeWidth="1.5" fill="none" />

      {/* Trefoils in outer ring (Gothic detail) */}
      <path d="M 50 24 Q 48 22, 50 20 Q 52 22, 50 24" strokeWidth="1.2" fill="none" opacity="0.8" />
      <path d="M 50 52 Q 48 54, 50 56 Q 52 54, 50 52" strokeWidth="1.2" fill="none" opacity="0.8" />
      <path d="M 36 38 Q 34 36, 32 38 Q 34 40, 36 38" strokeWidth="1.2" fill="none" opacity="0.8" />
      <path d="M 64 38 Q 66 36, 68 38 Q 66 40, 64 38" strokeWidth="1.2" fill="none" opacity="0.8" />

      {/* Quatrefoil lobes between spokes */}
      <circle cx="50" cy="52" r="3.5" strokeWidth="1" fill="none" opacity="0.7" />
      <circle cx="50" cy="24" r="3.5" strokeWidth="1" fill="none" opacity="0.7" />
      <circle cx="36" cy="38" r="3.5" strokeWidth="1" fill="none" opacity="0.7" />
      <circle cx="64" cy="38" r="3.5" strokeWidth="1" fill="none" opacity="0.7" />

      {/* Diagonal quatrefoils */}
      <circle cx="40" cy="28" r="2.5" strokeWidth="0.8" fill="none" opacity="0.6" />
      <circle cx="60" cy="28" r="2.5" strokeWidth="0.8" fill="none" opacity="0.6" />
      <circle cx="40" cy="48" r="2.5" strokeWidth="0.8" fill="none" opacity="0.6" />
      <circle cx="60" cy="48" r="2.5" strokeWidth="0.8" fill="none" opacity="0.6" />
    </g>

    {/* Lower lancet windows - context */}
    <g opacity="0.6">
      <path d="M 18 62 L 82 62" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />

      {/* Pointed arch lancets */}
      <path d="M 24 92 L 24 66 L 32 62 L 40 66 L 40 92" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
      <path d="M 46 92 L 46 66 L 50 63 L 54 66 L 54 92" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
      <path d="M 60 92 L 60 66 L 68 62 L 76 66 L 76 92" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />

      {/* Mullions */}
      <path d="M 32 66 L 32 92" strokeWidth="1" fill="none" strokeDasharray="3 2" opacity="0.6" />
      <path d="M 68 66 L 68 92" strokeWidth="1" fill="none" strokeDasharray="3 2" opacity="0.6" />
    </g>
  </svg>
)

// Roof SVG - Classical gable roof with proper pitch and eaves
const RoofSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Building facade - context */}
    <g opacity="0.6">
      <path d="M 10 64 L 10 92" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
      <path d="M 90 64 L 90 92" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
      <path d="M 10 92 L 90 92" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 2" />

      {/* Windows */}
      <rect x="18" y="72" width="12" height="16" strokeWidth="1" fill="none" rx="1" strokeDasharray="3 2" />
      <rect x="70" y="72" width="12" height="16" strokeWidth="1" fill="none" rx="1" strokeDasharray="3 2" />

      {/* Door */}
      <path d="M 42 92 L 42 74 A 8 8 0 0 1 58 74 L 58 92" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
    </g>

    {/* Main roof structure - HIGHLIGHTED (Classical 45° pitch gable) */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Main roof planes */}
      <path d="M 5 64 L 50 10 L 95 64" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Ridge beam (peak) */}
      <path d="M 50 10 L 50 6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="4" r="2" strokeWidth="1.5" fill="none" />

      {/* Roof planes detail */}
      <path d="M 10 60 L 50 14 L 90 60" strokeWidth="2" fill="none" opacity="0.7" />

      {/* Rafter lines (structural members) */}
      <path d="M 50 10 L 15 62" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M 50 10 L 85 62" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M 50 10 L 25 62" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 50 10 L 75 62" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Shingle courses (horizontal rows) */}
      <path d="M 18 56 L 50 20 L 82 56" strokeWidth="1.2" fill="none" opacity="0.5" />
      <path d="M 24 52 L 50 26 L 76 52" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M 30 48 L 50 32 L 70 48" strokeWidth="0.8" fill="none" opacity="0.35" />
      <path d="M 36 44 L 50 36 L 64 44" strokeWidth="0.6" fill="none" opacity="0.3" />

      {/* Individual shingle texture (left side) */}
      <path d="M 22 58 L 28 52" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 28 54 L 34 48" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 34 50 L 40 44" strokeWidth="0.8" fill="none" opacity="0.4" />

      {/* Individual shingle texture (right side) */}
      <path d="M 78 58 L 72 52" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 72 54 L 66 48" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 66 50 L 60 44" strokeWidth="0.8" fill="none" opacity="0.4" />

      {/* Eaves (overhanging edge) - PROMINENT */}
      <path d="M 3 64 L 97 64" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Eave brackets/corbels */}
      <path d="M 15 64 Q 15 67, 18 68" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M 35 64 Q 35 67, 38 68" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M 65 64 Q 65 67, 62 68" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M 85 64 Q 85 67, 82 68" strokeWidth="1.2" fill="none" opacity="0.6" />
    </g>

    {/* Chimney - context */}
    <g opacity="0.6">
      <path d="M 66 42 L 66 18 L 76 18 L 76 48" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
      <path d="M 64 18 L 78 18" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 2" />

      {/* Chimney cap */}
      <path d="M 62 18 L 80 18" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" />

      {/* Brick courses */}
      <path d="M 66 25 L 76 25 M 66 32 L 76 32 M 66 39 L 76 39" strokeWidth="0.8" fill="none" strokeDasharray="3 2" opacity="0.7" />
    </g>
  </svg>
)

// Vault SVG - Ribbed Gothic vault with geometric precision
const VaultSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Base/walls with corbels - context */}
    <g opacity="0.4">
      <path d="M 0 90 L 100 90" strokeWidth="2.5" fill="none" />
      <path d="M 8 90 L 8 80" strokeWidth="2" fill="none" />
      <path d="M 92 90 L 92 80" strokeWidth="2" fill="none" />

      {/* Corbels at spring points */}
      <path d="M 8 80 Q 12 78, 14 82" strokeWidth="1.5" fill="none" />
      <path d="M 92 80 Q 88 78, 86 82" strokeWidth="1.5" fill="none" />
    </g>

    {/* Main vault curves - HIGHLIGHTED (pointed Gothic arches) */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Outer vault curve - pointed arch profile */}
      <path d="M 8 82 Q 25 15, 50 10 Q 75 15, 92 82" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Inner vault surface */}
      <path d="M 15 80 Q 30 25, 50 20 Q 70 25, 85 80" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Rib vault system - EXTRA HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Longitudinal ridge rib (along crown) */}
      <path d="M 50 10 L 50 88" strokeWidth="2.8" fill="none" strokeLinecap="round" />

      {/* Transverse ribs (side to side) */}
      <path d="M 8 82 Q 30 45, 50 40 Q 70 45, 92 82" strokeWidth="2.3" fill="none" opacity="0.95" />
      <path d="M 12 78 Q 32 50, 50 46 Q 68 50, 88 78" strokeWidth="1.8" fill="none" opacity="0.9" />

      {/* Diagonal ribs (tierceron ribs) */}
      <path d="M 8 82 Q 35 30, 50 18" strokeWidth="2" fill="none" opacity="0.85" />
      <path d="M 92 82 Q 65 30, 50 18" strokeWidth="2" fill="none" opacity="0.85" />

      {/* Wall ribs (connecting to corners) */}
      <path d="M 8 82 Q 20 55, 28 40" strokeWidth="1.6" fill="none" opacity="0.8" />
      <path d="M 92 82 Q 80 55, 72 40" strokeWidth="1.6" fill="none" opacity="0.8" />

      {/* Decorative bosses at rib intersections */}
      <circle cx="50" cy="40" r="3.5" strokeWidth="1.8" fill="none" />
      <circle cx="50" cy="60" r="2.8" strokeWidth="1.5" fill="none" opacity="0.9" />
      <circle cx="38" cy="68" r="2" strokeWidth="1.2" fill="none" opacity="0.8" />
      <circle cx="62" cy="68" r="2" strokeWidth="1.2" fill="none" opacity="0.8" />

      {/* Boss detail (foliate carving suggestion) */}
      <path d="M 48 40 L 50 38 L 52 40" strokeWidth="0.8" fill="none" opacity="0.7" />
      <path d="M 50 42 L 48 40 M 50 42 L 52 40" strokeWidth="0.8" fill="none" opacity="0.7" />
    </g>

    {/* Webbing/severy texture - context (stone infill between ribs) */}
    <g opacity="0.3">
      <path d="M 20 70 Q 40 50, 48 42" strokeWidth="0.8" fill="none" />
      <path d="M 28 75 Q 44 58, 50 52" strokeWidth="0.8" fill="none" />
      <path d="M 52 52 Q 56 58, 72 75" strokeWidth="0.8" fill="none" />
      <path d="M 52 42 Q 60 50, 80 70" strokeWidth="0.8" fill="none" />
    </g>

    {/* Vault cell divisions (quadripartite pattern) */}
    <g opacity="0.25">
      <path d="M 8 82 Q 30 50, 50 46" strokeWidth="0.6" fill="none" strokeDasharray="2 2" />
      <path d="M 50 46 Q 70 50, 92 82" strokeWidth="0.6" fill="none" strokeDasharray="2 2" />
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

// Door SVG - Classical door with pediment and paneled design
const DoorSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Door frame/architrave - context */}
    <g opacity="0.5">
      <path d="M 20 95 L 20 24" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 80 95 L 80 24" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Entablature */}
      <path d="M 20 24 L 80 24" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 20 26 L 80 26" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>

    {/* Pediment - HIGHLIGHTED (Classical triangular form) */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Pediment triangle */}
      <path d="M 16 24 L 50 4 L 84 24" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 14 24 L 86 24" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Tympanum decoration (classical relief) */}
      <circle cx="50" cy="16" r="5" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M 45 16 Q 50 12, 55 16" strokeWidth="1" fill="none" opacity="0.6" />

      {/* Pediment raking cornice detail */}
      <path d="M 18 22 L 50 6 L 82 22" strokeWidth="1.5" fill="none" opacity="0.7" />
    </g>

    {/* Six-panel door - HIGHLIGHTED (Georgian/Federal style) */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Upper panels (smaller) */}
      <rect x="27" y="30" width="18" height="22" strokeWidth="2" fill="none" rx="1" />
      <rect x="55" y="30" width="18" height="22" strokeWidth="2" fill="none" rx="1" />

      {/* Middle panels */}
      <rect x="27" y="55" width="18" height="18" strokeWidth="2" fill="none" rx="1" />
      <rect x="55" y="55" width="18" height="18" strokeWidth="2" fill="none" rx="1" />

      {/* Lower panels (tallest) */}
      <rect x="27" y="76" width="18" height="16" strokeWidth="2" fill="none" rx="1" />
      <rect x="55" y="76" width="18" height="16" strokeWidth="2" fill="none" rx="1" />

      {/* Raised panel detail (inset) */}
      <rect x="30" y="33" width="12" height="16" strokeWidth="1" fill="none" opacity="0.6" rx="0.5" />
      <rect x="58" y="33" width="12" height="16" strokeWidth="1" fill="none" opacity="0.6" rx="0.5" />
      <rect x="30" y="58" width="12" height="12" strokeWidth="1" fill="none" opacity="0.6" rx="0.5" />
      <rect x="58" y="58" width="12" height="12" strokeWidth="1" fill="none" opacity="0.6" rx="0.5" />

      {/* Lock rail (horizontal member) */}
      <path d="M 27 74 L 73 74" strokeWidth="1.5" fill="none" opacity="0.5" />
    </g>

    {/* Transom window - context (semicircular fanlight) */}
    <g opacity="0.5">
      {/* Fanlight arch */}
      <path d="M 26 28 A 24 12 0 0 1 74 28" strokeWidth="1.5" fill="none" />

      {/* Fanlight muntins (radiating bars) */}
      <path d="M 50 28 L 50 18" strokeWidth="0.8" fill="none" />
      <path d="M 38 27 L 35 19" strokeWidth="0.8" fill="none" />
      <path d="M 62 27 L 65 19" strokeWidth="0.8" fill="none" />
      <path d="M 30 26 L 24 20" strokeWidth="0.8" fill="none" />
      <path d="M 70 26 L 76 20" strokeWidth="0.8" fill="none" />
    </g>

    {/* Door hardware */}
    <g>
      {/* Doorknob and backplate */}
      <ellipse cx="68" cy="64" rx="4" ry="3" strokeWidth="1.5" fill="none" />
      <circle cx="68" cy="64" r="2" strokeWidth="1.2" fill="none" />

      {/* Keyhole */}
      <circle cx="68" cy="70" r="1.5" strokeWidth="1" fill="none" />
    </g>

    {/* Threshold/doorsill - context */}
    <g opacity="0.5">
      <path d="M 16 95 L 84 95" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 18 92 L 82 92" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// Decorative/Ornament SVG - Renaissance rosette with acanthus leaves
const DecorativeSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Central rosette - HIGHLIGHTED (Renaissance geometric precision) */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Outer circle */}
      <circle cx="50" cy="50" r="24" strokeWidth="2.5" fill="none" />
      <circle cx="50" cy="50" r="18" strokeWidth="2" fill="none" />
      <circle cx="50" cy="50" r="12" strokeWidth="1.8" fill="none" />
      <circle cx="50" cy="50" r="6" strokeWidth="1.5" fill="none" />
      <circle cx="50" cy="50" r="2" strokeWidth="1.2" fill="none" />

      {/* 8 petal divisions (octagonal symmetry) */}
      <path d="M 50 26 Q 46 38, 50 50" strokeWidth="1.5" fill="none" />
      <path d="M 50 26 Q 54 38, 50 50" strokeWidth="1.5" fill="none" />

      <path d="M 74 50 Q 62 46, 50 50" strokeWidth="1.5" fill="none" />
      <path d="M 74 50 Q 62 54, 50 50" strokeWidth="1.5" fill="none" />

      <path d="M 50 74 Q 54 62, 50 50" strokeWidth="1.5" fill="none" />
      <path d="M 50 74 Q 46 62, 50 50" strokeWidth="1.5" fill="none" />

      <path d="M 26 50 Q 38 54, 50 50" strokeWidth="1.5" fill="none" />
      <path d="M 26 50 Q 38 46, 50 50" strokeWidth="1.5" fill="none" />

      {/* Diagonal petals */}
      <path d="M 33 33 Q 40 40, 50 50" strokeWidth="1.2" fill="none" />
      <path d="M 33 33 Q 42 38, 50 50" strokeWidth="1.2" fill="none" />

      <path d="M 67 33 Q 60 40, 50 50" strokeWidth="1.2" fill="none" />
      <path d="M 67 33 Q 58 38, 50 50" strokeWidth="1.2" fill="none" />

      <path d="M 67 67 Q 60 60, 50 50" strokeWidth="1.2" fill="none" />
      <path d="M 67 67 Q 58 62, 50 50" strokeWidth="1.2" fill="none" />

      <path d="M 33 67 Q 40 60, 50 50" strokeWidth="1.2" fill="none" />
      <path d="M 33 67 Q 42 62, 50 50" strokeWidth="1.2" fill="none" />

      {/* Small circles at petal tips */}
      <circle cx="50" cy="32" r="2" strokeWidth="1" fill="none" opacity="0.8" />
      <circle cx="68" cy="50" r="2" strokeWidth="1" fill="none" opacity="0.8" />
      <circle cx="50" cy="68" r="2" strokeWidth="1" fill="none" opacity="0.8" />
      <circle cx="32" cy="50" r="2" strokeWidth="1" fill="none" opacity="0.8" />
    </g>

    {/* Acanthus leaves - context (Classical foliage ornament) */}
    <g opacity="0.6">
      {/* North leaf */}
      <path d="M 50 24 Q 44 14, 48 4" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 50 24 Q 56 14, 52 4" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 46 12 Q 44 10, 46 8" strokeWidth="1" fill="none" />
      <path d="M 54 12 Q 56 10, 54 8" strokeWidth="1" fill="none" />

      {/* East leaf */}
      <path d="M 76 50 Q 86 44, 96 48" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 76 50 Q 86 56, 96 52" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 88 46 Q 90 44, 92 46" strokeWidth="1" fill="none" />
      <path d="M 88 54 Q 90 56, 92 54" strokeWidth="1" fill="none" />

      {/* South leaf */}
      <path d="M 50 76 Q 44 86, 48 96" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 50 76 Q 56 86, 52 96" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 46 88 Q 44 90, 46 92" strokeWidth="1" fill="none" />
      <path d="M 54 88 Q 56 90, 54 92" strokeWidth="1" fill="none" />

      {/* West leaf */}
      <path d="M 24 50 Q 14 44, 4 48" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 24 50 Q 14 56, 4 52" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 12 46 Q 10 44, 8 46" strokeWidth="1" fill="none" />
      <path d="M 12 54 Q 10 56, 8 54" strokeWidth="1" fill="none" />
    </g>

    {/* Volute scrolls at corners - context (Renaissance flourish) */}
    <g opacity="0.4">
      {/* NW volute */}
      <path d="M 28 28 Q 18 18, 10 14 Q 6 12, 4 16" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* NE volute */}
      <path d="M 72 28 Q 82 18, 90 14 Q 94 12, 96 16" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* SW volute */}
      <path d="M 28 72 Q 18 82, 10 86 Q 6 88, 4 84" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* SE volute */}
      <path d="M 72 72 Q 82 82, 90 86 Q 94 88, 96 84" strokeWidth="1.5" fill="none" strokeLinecap="round" />
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

// Facade SVG - Renaissance palace facade (Medici/Rucellai Palace tripartite with cornice)
const FacadeSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Main building walls - context */}
    <g opacity="0.4">
      <path d="M 8 92 L 8 12" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 92 92 L 92 12" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Heavy cornice - HIGHLIGHTED (Medici Palace signature element) */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Projecting cornice with dentils */}
      <path d="M 4 12 L 96 12" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M 6 15 L 94 15" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 7 17 L 93 17" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Dentil pattern */}
      <path d="M 12 13.5 L 14 13.5 M 16 13.5 L 18 13.5 M 20 13.5 L 22 13.5 M 24 13.5 L 26 13.5 M 28 13.5 L 30 13.5" strokeWidth="1.5" fill="none" />
      <path d="M 70 13.5 L 72 13.5 M 74 13.5 L 76 13.5 M 78 13.5 L 80 13.5 M 82 13.5 L 84 13.5 M 86 13.5 L 88 13.5" strokeWidth="1.5" fill="none" />
    </g>

    {/* Tripartite horizontal divisions - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* String course between floors */}
      <path d="M 8 42 L 92 42" strokeWidth="2.5" fill="none" />
      <path d="M 8 66 L 92 66" strokeWidth="2.5" fill="none" />
    </g>

    {/* Pilasters (Rucellai Palace style) - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Engaged pilasters on facade */}
      <path d="M 18 17 L 18 92" strokeWidth="2" fill="none" opacity="0.9" />
      <path d="M 38 17 L 38 92" strokeWidth="2" fill="none" opacity="0.9" />
      <path d="M 62 17 L 62 92" strokeWidth="2" fill="none" opacity="0.9" />
      <path d="M 82 17 L 82 92" strokeWidth="2" fill="none" opacity="0.9" />

      {/* Pilaster capitals at each floor */}
      <path d="M 15 19 L 21 19" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M 35 19 L 41 19" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M 59 19 L 65 19" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M 79 19 L 85 19" strokeWidth="1.5" fill="none" opacity="0.8" />
    </g>

    {/* Windows with classical proportions - context */}
    <g opacity="0.5">
      {/* Piano nobile windows (tallest, second floor) */}
      <rect x="24" y="45" width="9" height="17" strokeWidth="1.2" fill="none" rx="0.5" />
      <rect x="45" y="45" width="9" height="17" strokeWidth="1.2" fill="none" rx="0.5" />
      <rect x="67" y="45" width="9" height="17" strokeWidth="1.2" fill="none" rx="0.5" />

      {/* Third floor windows (smaller) */}
      <rect x="24" y="22" width="9" height="15" strokeWidth="1" fill="none" rx="0.5" />
      <rect x="45" y="22" width="9" height="15" strokeWidth="1" fill="none" rx="0.5" />
      <rect x="67" y="22" width="9" height="15" strokeWidth="1" fill="none" rx="0.5" />

      {/* Ground floor windows (smallest) */}
      <rect x="24" y="70" width="9" height="13" strokeWidth="1" fill="none" rx="0.5" />
      <rect x="67" y="70" width="9" height="13" strokeWidth="1" fill="none" rx="0.5" />
    </g>

    {/* Rusticated ground floor portal - context */}
    <g opacity="0.5">
      {/* Arched entrance */}
      <path d="M 44 92 L 44 74 A 6 6 0 0 1 56 74 L 56 92" strokeWidth="1.5" fill="none" />

      {/* Rustication blocks around door */}
      <path d="M 42 80 L 44 80 M 56 80 L 58 80" strokeWidth="1.5" fill="none" />
      <path d="M 42 75 L 44 75 M 56 75 L 58 75" strokeWidth="1.5" fill="none" />
    </g>

    {/* Ground line */}
    <path d="M 5 92 L 95 92" strokeWidth="1.5" fill="none" opacity="0.4" />
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

// Ceiling SVG - Coffered ceiling (Palladian/Renaissance geometric perfection)
const CeilingSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Outer cornice frame - context */}
    <g opacity="0.4">
      <rect x="5" y="5" width="90" height="90" strokeWidth="2.5" fill="none" />
      <rect x="8" y="8" width="84" height="84" strokeWidth="2" fill="none" />
    </g>

    {/* Coffered grid - HIGHLIGHTED (perfect geometric divisions) */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Primary grid lines - 3x3 division (Palladian proportions) */}
      <path d="M 8 35 L 92 35" strokeWidth="2.5" fill="none" />
      <path d="M 8 65 L 92 65" strokeWidth="2.5" fill="none" />
      <path d="M 35 8 L 35 92" strokeWidth="2.5" fill="none" />
      <path d="M 65 8 L 65 92" strokeWidth="2.5" fill="none" />

      {/* Secondary frame lines */}
      <path d="M 8 32 L 92 32" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M 8 68 L 92 68" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M 32 8 L 32 92" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M 68 8 L 68 92" strokeWidth="1.5" fill="none" opacity="0.8" />

      {/* Corner coffers with octagonal recesses */}
      <rect x="12" y="12" width="18" height="18" strokeWidth="2" fill="none" />
      <rect x="70" y="12" width="18" height="18" strokeWidth="2" fill="none" />
      <rect x="12" y="70" width="18" height="18" strokeWidth="2" fill="none" />
      <rect x="70" y="70" width="18" height="18" strokeWidth="2" fill="none" />

      {/* Side coffers */}
      <rect x="39" y="12" width="22" height="18" strokeWidth="2" fill="none" />
      <rect x="12" y="39" width="18" height="22" strokeWidth="2" fill="none" />
      <rect x="70" y="39" width="18" height="22" strokeWidth="2" fill="none" />
      <rect x="39" y="70" width="22" height="18" strokeWidth="2" fill="none" />

      {/* Inner coffer depths (recessed panels) */}
      <rect x="15" y="15" width="12" height="12" strokeWidth="1.2" fill="none" opacity="0.7" />
      <rect x="73" y="15" width="12" height="12" strokeWidth="1.2" fill="none" opacity="0.7" />
      <rect x="15" y="73" width="12" height="12" strokeWidth="1.2" fill="none" opacity="0.7" />
      <rect x="73" y="73" width="12" height="12" strokeWidth="1.2" fill="none" opacity="0.7" />

      {/* Coffer rosettes (small decorations in each panel) */}
      <circle cx="21" cy="21" r="2.5" strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="79" cy="21" r="2.5" strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="21" cy="79" r="2.5" strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="79" cy="79" r="2.5" strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="50" cy="21" r="2.5" strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="21" cy="50" r="2.5" strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="79" cy="50" r="2.5" strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="50" cy="79" r="2.5" strokeWidth="1" fill="none" opacity="0.6" />
    </g>

    {/* Central coffer with elaborate rosette - EXTRA HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Central panel frame */}
      <rect x="39" y="39" width="22" height="22" strokeWidth="2.5" fill="none" />
      <rect x="42" y="42" width="16" height="16" strokeWidth="2" fill="none" />

      {/* Central rosette (Palladian geometric ornament) */}
      <circle cx="50" cy="50" r="14" strokeWidth="2.5" fill="none" />
      <circle cx="50" cy="50" r="10" strokeWidth="2" fill="none" />
      <circle cx="50" cy="50" r="6" strokeWidth="1.8" fill="none" />
      <circle cx="50" cy="50" r="2.5" strokeWidth="1.5" fill="none" />

      {/* Rosette radial pattern (8-fold symmetry) */}
      <path d="M 50 36 L 50 44" strokeWidth="1.5" fill="none" />
      <path d="M 50 56 L 50 64" strokeWidth="1.5" fill="none" />
      <path d="M 36 50 L 44 50" strokeWidth="1.5" fill="none" />
      <path d="M 56 50 L 64 50" strokeWidth="1.5" fill="none" />

      {/* Diagonal spokes */}
      <path d="M 41 41 L 45 45" strokeWidth="1.2" fill="none" />
      <path d="M 59 41 L 55 45" strokeWidth="1.2" fill="none" />
      <path d="M 41 59 L 45 55" strokeWidth="1.2" fill="none" />
      <path d="M 59 59 L 55 55" strokeWidth="1.2" fill="none" />

      {/* Petal details */}
      <circle cx="50" cy="40" r="2" strokeWidth="0.8" fill="none" opacity="0.7" />
      <circle cx="60" cy="50" r="2" strokeWidth="0.8" fill="none" opacity="0.7" />
      <circle cx="50" cy="60" r="2" strokeWidth="0.8" fill="none" opacity="0.7" />
      <circle cx="40" cy="50" r="2" strokeWidth="0.8" fill="none" opacity="0.7" />
    </g>

    {/* Egg-and-dart border detail - context */}
    <g opacity="0.3">
      <ellipse cx="15" cy="8" rx="2" ry="1.5" strokeWidth="0.8" fill="none" />
      <ellipse cx="25" cy="8" rx="2" ry="1.5" strokeWidth="0.8" fill="none" />
      <ellipse cx="50" cy="8" rx="2" ry="1.5" strokeWidth="0.8" fill="none" />
      <ellipse cx="75" cy="8" rx="2" ry="1.5" strokeWidth="0.8" fill="none" />
      <ellipse cx="85" cy="8" rx="2" ry="1.5" strokeWidth="0.8" fill="none" />
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

// Urban SVG - Classical arcade (Renaissance piazza with perfect rhythm)
const UrbanSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Arcade columns - HIGHLIGHTED (classical spacing) */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      <path d="M 8 92 L 8 42" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 32 92 L 32 42" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 56 92 L 56 42" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 80 92 L 80 42" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Column bases */}
      <path d="M 6 92 L 10 92" strokeWidth="2" fill="none" opacity="0.8" />
      <path d="M 30 92 L 34 92" strokeWidth="2" fill="none" opacity="0.8" />
      <path d="M 54 92 L 58 92" strokeWidth="2" fill="none" opacity="0.8" />
      <path d="M 78 92 L 82 92" strokeWidth="2" fill="none" opacity="0.8" />

      {/* Column capitals (Tuscan/Doric order) */}
      <path d="M 5 42 L 11 42" strokeWidth="2" fill="none" />
      <path d="M 29 42 L 35 42" strokeWidth="2" fill="none" />
      <path d="M 53 42 L 59 42" strokeWidth="2" fill="none" />
      <path d="M 77 42 L 83 42" strokeWidth="2" fill="none" />

      {/* Echinus molding */}
      <path d="M 6 44 L 10 44" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M 30 44 L 34 44" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M 54 44 L 58 44" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M 78 44 L 82 44" strokeWidth="1.5" fill="none" opacity="0.7" />
    </g>

    {/* Perfect semicircular arches - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Arch openings with mathematical precision */}
      <path d="M 8 42 A 12 12 0 0 1 32 42" strokeWidth="2.5" fill="none" />
      <path d="M 32 42 A 12 12 0 0 1 56 42" strokeWidth="2.5" fill="none" />
      <path d="M 56 42 A 12 12 0 0 1 80 42" strokeWidth="2.5" fill="none" />

      {/* Inner arch rings */}
      <path d="M 10 42 A 10 10 0 0 1 30 42" strokeWidth="1.8" fill="none" opacity="0.8" />
      <path d="M 34 42 A 10 10 0 0 1 54 42" strokeWidth="1.8" fill="none" opacity="0.8" />
      <path d="M 58 42 A 10 10 0 0 1 78 42" strokeWidth="1.8" fill="none" opacity="0.8" />

      {/* Keystones */}
      <path d="M 19 30 L 18 26 L 22 26 L 21 30" strokeWidth="1.5" fill="none" opacity="0.9" />
      <path d="M 43 30 L 42 26 L 46 26 L 45 30" strokeWidth="1.5" fill="none" opacity="0.9" />
      <path d="M 67 30 L 66 26 L 70 26 L 69 30" strokeWidth="1.5" fill="none" opacity="0.9" />
    </g>

    {/* Entablature - HIGHLIGHTED (classical three-part division) */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Cornice */}
      <path d="M 0 38 L 100 38" strokeWidth="2.5" fill="none" />

      {/* Frieze */}
      <path d="M 0 40 L 100 40" strokeWidth="2" fill="none" />

      {/* Architrave */}
      <path d="M 0 42 L 100 42" strokeWidth="2" fill="none" />

      {/* Cornice dentils */}
      <path d="M 6 38.5 L 8 38.5 M 10 38.5 L 12 38.5 M 14 38.5 L 16 38.5 M 18 38.5 L 20 38.5" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 24 38.5 L 26 38.5 M 28 38.5 L 30 38.5 M 34 38.5 L 36 38.5 M 38 38.5 L 40 38.5" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 48 38.5 L 50 38.5 M 52 38.5 L 54 38.5 M 58 38.5 L 60 38.5 M 62 38.5 L 64 38.5" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 72 38.5 L 74 38.5 M 76 38.5 L 78 38.5 M 82 38.5 L 84 38.5 M 86 38.5 L 88 38.5" strokeWidth="1.2" fill="none" opacity="0.7" />
    </g>

    {/* Upper floor palazzo facades - context */}
    <g opacity="0.4">
      <rect x="10" y="6" width="18" height="28" strokeWidth="1.5" fill="none" />
      <rect x="60" y="6" width="18" height="28" strokeWidth="1.5" fill="none" />

      {/* Piano nobile windows */}
      <rect x="13" y="12" width="6" height="10" strokeWidth="1" fill="none" rx="0.5" />
      <rect x="20" y="12" width="6" height="10" strokeWidth="1" fill="none" rx="0.5" />
      <rect x="63" y="12" width="6" height="10" strokeWidth="1" fill="none" rx="0.5" />
      <rect x="70" y="12" width="6" height="10" strokeWidth="1" fill="none" rx="0.5" />
    </g>

    {/* Piazza paving - context (geometric pattern) */}
    <g opacity="0.35">
      <path d="M 0 92 L 100 92" strokeWidth="2" fill="none" />

      {/* Paving stones */}
      <path d="M 12 94 L 24 94 M 28 94 L 40 94 M 44 94 L 56 94 M 60 94 L 72 94 M 76 94 L 88 94" strokeWidth="1" fill="none" />
      <path d="M 10 96 L 20 96 M 30 96 L 40 96 M 50 96 L 60 96 M 70 96 L 80 96 M 85 96 L 92 96" strokeWidth="0.8" fill="none" />
    </g>
  </svg>
)

// Modern SVG - Modernist building (Le Corbusier's Five Points)
const ModernSVG = ({ showHalo = false }: { showHalo?: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Pilotis (columns lifting building) - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Cylindrical pilotis */}
      <ellipse cx="18" cy="92" rx="3" ry="2" strokeWidth="2" fill="none" />
      <path d="M 15 92 L 15 64" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M 21 92 L 21 64" strokeWidth="3.5" fill="none" strokeLinecap="round" />

      <ellipse cx="50" cy="92" rx="3" ry="2" strokeWidth="2" fill="none" />
      <path d="M 47 92 L 47 64" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M 53 92 L 53 64" strokeWidth="3.5" fill="none" strokeLinecap="round" />

      <ellipse cx="82" cy="92" rx="3" ry="2" strokeWidth="2" fill="none" />
      <path d="M 79 92 L 79 64" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M 85 92 L 85 64" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </g>

    {/* Floor slab (free plan enabled by pilotis) - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Main floor plate */}
      <path d="M 2 64 L 98 64" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 4 61 L 96 61" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Slab edge detail */}
      <path d="M 5 63 L 95 63" strokeWidth="1.5" fill="none" opacity="0.7" />
    </g>

    {/* Upper structure - context */}
    <g opacity="0.5">
      {/* Clean cubic volumes */}
      <rect x="8" y="22" width="84" height="39" strokeWidth="2.5" fill="none" />
    </g>

    {/* Ribbon windows (horizontal strip windows) - HIGHLIGHTED */}
    <g filter={showHalo ? "url(#halo-glow)" : undefined}>
      {/* Upper ribbon window */}
      <path d="M 8 32 L 92 32" strokeWidth="2" fill="none" />
      <path d="M 8 38 L 92 38" strokeWidth="2" fill="none" />

      {/* Middle ribbon window */}
      <path d="M 8 46 L 92 46" strokeWidth="2" fill="none" />
      <path d="M 8 52 L 92 52" strokeWidth="2" fill="none" />

      {/* Thin vertical mullions (minimal structure) */}
      <path d="M 22 32 L 22 38" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 38 32 L 38 38" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 54 32 L 54 38" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 70 32 L 70 38" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 86 32 L 86 38" strokeWidth="1.2" fill="none" opacity="0.7" />

      <path d="M 22 46 L 22 52" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 38 46 L 38 52" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 54 46 L 54 52" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 70 46 L 70 52" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 86 46 L 86 52" strokeWidth="1.2" fill="none" opacity="0.7" />
    </g>

    {/* Roof garden - context (accessible flat roof) */}
    <g opacity="0.4">
      {/* Flat roof line */}
      <path d="M 8 22 L 92 22" strokeWidth="2" fill="none" />

      {/* Parapet */}
      <path d="M 10 22 L 10 18 L 20 18" strokeWidth="1.5" fill="none" />
      <path d="M 80 18 L 90 18 L 90 22" strokeWidth="1.5" fill="none" />

      {/* Roof garden plantings */}
      <path d="M 18 20 Q 22 15, 26 20" strokeWidth="1.2" fill="none" />
      <path d="M 32 19 Q 38 13, 44 19" strokeWidth="1.2" fill="none" />
      <path d="M 56 19 Q 62 13, 68 19" strokeWidth="1.2" fill="none" />
      <path d="M 74 20 Q 78 16, 82 20" strokeWidth="1.2" fill="none" />

      {/* Tree/vegetation */}
      <circle cx="50" cy="16" r="3" strokeWidth="1" fill="none" />
      <path d="M 50 19 L 50 22" strokeWidth="1" fill="none" />
    </g>

    {/* Free facade (non-load-bearing curtain wall) */}
    <g opacity="0.35">
      {/* Facade grid showing structural independence */}
      <path d="M 8 22 L 8 61" strokeWidth="1" fill="none" strokeDasharray="2 2" />
      <path d="M 92 22 L 92 61" strokeWidth="1" fill="none" strokeDasharray="2 2" />
    </g>

    {/* Ground plane */}
    <g opacity="0.3">
      <path d="M 0 92 L 100 92" strokeWidth="2" fill="none" />

      {/* Landscape integration */}
      <path d="M 5 95 Q 12 93, 20 95" strokeWidth="1" fill="none" />
      <path d="M 30 96 Q 35 94, 40 96" strokeWidth="1" fill="none" />
      <path d="M 60 96 Q 65 94, 70 96" strokeWidth="1" fill="none" />
      <path d="M 80 95 Q 88 93, 95 95" strokeWidth="1" fill="none" />
    </g>
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
    // First, check for element-specific SVG
    if (elementId) {
      const ElementSVG = getElementSVG(elementId)
      if (ElementSVG) {
        return <ElementSVG showHalo={showHalo} />
      }
    }

    // Fall back to category-based SVG
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
