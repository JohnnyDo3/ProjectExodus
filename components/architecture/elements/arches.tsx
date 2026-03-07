'use client'

import React from 'react'
import { MaterialPatterns } from './materialPatterns'
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
// ROUND ARCH - Classic semicircular Roman/Romanesque arch
// Reference: Roman aqueducts, Colosseum - perfect semicircle, radiating voussoirs
// ============================================================================
export const RoundArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <MaterialPatterns />
    <HaloFilter />

    {/* CONTEXT (near): COMPLETE ROMAN AQUEDUCT/BASILICA - field sketch off-page */}

    {/* CONTEXT (near): CEILING/SKY: Roman coffered ceiling or open sky */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      {/* Coffers or sky indication extending beyond */}
      <path d="M -10 0 L 110 0" fill="none" opacity="0.6" />
      <path d="M -10 10 L 110 10" fill="none" />
    </g>

    {/* CONTEXT (near): MASSIVE ROMAN WALLS: Extending up and down beyond frame */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      {/* Left Roman wall - massive masonry */}
      <path d="M -5 -10 L -5 110" fill="none" />
      <path d="M 0 -10 L 0 110" fill="none" opacity="0.7" />
      <path d="M 5 -10 L 5 110" fill="none" opacity="0.5" />
      {/* Right Roman wall */}
      <path d="M 95 -10 L 95 110" fill="none" />
      <path d="M 100 -10 L 100 110" fill="none" opacity="0.7" />
      <path d="M 105 -10 L 105 110" fill="none" opacity="0.5" />
      {/* Roman stone courses */}
      <path d="M -5 30 L 10 30" strokeWidth="0.4" opacity="0.5" />
      <path d="M 90 30 L 105 30" strokeWidth="0.4" opacity="0.5" />
      <path d="M -5 70 L 10 70" strokeWidth="0.4" opacity="0.5" />
      <path d="M 90 70 L 105 70" strokeWidth="0.4" opacity="0.5" />
    </g>

    {/* CONTEXT (far): ADJACENT ARCADE: Roman arches continuing into distance */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      {/* Next arch to left (perspective) */}
      <path d="M -20 60 Q -20 32, 0 32 Q 20 32, 20 60" fill="none" />
      <path d="M -10 60 Q -10 35, 5 35 Q 20 35, 20 60" fill="none" opacity="0.7" />
      {/* Next arch to right */}
      <path d="M 80 60 Q 80 35, 95 35 Q 110 35, 110 60" fill="none" opacity="0.7" />
      <path d="M 80 60 Q 80 32, 100 32 Q 120 32, 120 60" fill="none" />
    </g>

    {/* CONTEXT (far): ROMAN FLOOR: Paved stone extending far beyond */}
    <g opacity={S.CF.opacity}>
      <rect x="-10" y="90" width="120" height="20" fill="url(#stone-smooth)" opacity="0.15" stroke="none" />
      {/* Floor extending off-page */}
      <path d="M -10 94 L 110 94" strokeWidth="0.8" fill="none" opacity="0.5" strokeDasharray="5 3" />
      <path d="M -10 100 L 110 100" strokeWidth="0.6" fill="none" opacity="0.4" strokeDasharray="4 2" />
      {/* Roman paving stones */}
      <path d="M 0 92 L 0 105" strokeWidth="0.3" opacity="0.3" />
      <path d="M 25 92 L 25 105" strokeWidth="0.3" opacity="0.3" />
      <path d="M 50 92 L 50 105" strokeWidth="0.3" opacity="0.3" />
      <path d="M 75 92 L 75 105" strokeWidth="0.3" opacity="0.3" />
      <path d="M 100 92 L 100 105" strokeWidth="0.3" opacity="0.3" />
    </g>

    {/* CONTEXT (near): MASSIVE PIERS: Roman piers extending up off-page */}
    <g opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      {/* Left pier - continues up beyond frame */}
      <rect x="15" y="-10" width="5" height="120" fill="url(#stone-smooth)" opacity="0.2" stroke="none" />
      <path d="M 15 -10 L 15 110" strokeWidth="1.8" fill="none" strokeDasharray="5 2" />
      <path d="M 18 -10 L 18 110" strokeWidth="1.2" fill="none" strokeDasharray="5 2" opacity="0.7" />
      <path d="M 20 -10 L 20 110" strokeWidth="1" fill="none" strokeDasharray="5 2" opacity="0.6" />
      {/* Right pier - continues up beyond frame */}
      <rect x="80" y="-10" width="5" height="120" fill="url(#stone-smooth)" opacity="0.2" stroke="none" />
      <path d="M 85 -10 L 85 110" strokeWidth="1.8" fill="none" strokeDasharray="5 2" />
      <path d="M 82 -10 L 82 110" strokeWidth="1.2" fill="none" strokeDasharray="5 2" opacity="0.7" />
      <path d="M 80 -10 L 80 110" strokeWidth="1" fill="none" strokeDasharray="5 2" opacity="0.6" />
    </g>

    {/* PRIMARY: THE ROUND ARCH - BOLD ROMAN ENGINEERING */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Stone material texture on arch */}
      <path d="M 17 48 Q 17 12, 50 12 Q 83 12, 83 48" fill="url(#stone-smooth)" opacity="0.25" stroke="none" />

      {/* BOLD Extrados - perfect Roman semicircle (field sketch confidence) */}
      <path d="M 15 48 Q 15 8, 50 8 Q 85 8, 85 48"
            strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* BOLD Intrados - inner curve */}
      <path d="M 20 48 Q 20 16, 50 16 Q 80 16, 80 48"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Depth shadow on inner arch */}
      <path d="M 21 48 Q 21 17, 50 17 Q 79 17, 79 48"
            strokeWidth="0.6" fill="none" opacity="0.2" />

      {/* DETAIL: Voussoir lines radiating from center - ENHANCED with depth */}
      <path d="M 22 42 L 26 34" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      <path d="M 22.5 42 L 26.5 34" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 28 32 L 34 24" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      <path d="M 28.5 32 L 34.5 24" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 38 22 L 44 14" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      <path d="M 38.5 22 L 44.5 14" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 56 14 L 62 22" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      <path d="M 56.5 14 L 62.5 22" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 66 24 L 72 32" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      <path d="M 66.5 24 L 72.5 32" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 74 34 L 78 42" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      <path d="M 74.5 34 L 78.5 42" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />

      {/* BOLD KEYSTONE at crown - central wedge stone */}
      <path d="M 44 10 L 46 8 L 54 8 L 56 10" strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinejoin="round" />
      <path d="M 46 14 L 46 9" strokeWidth={S.P.strokeWidth} fill="none" opacity={S.D.opacityStrong} />
      <path d="M 54 14 L 54 9" strokeWidth={S.P.strokeWidth} fill="none" opacity={S.D.opacityStrong} />
      <path d="M 48 9 L 52 9" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />

      {/* BOLD Impost blocks where arch springs from piers */}
      <path d="M 12 48 L 23 48" strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 77 48 L 88 48" strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 14 46 L 21 46" strokeWidth="1.4" fill="none" opacity="0.6" />
      <path d="M 79 46 L 86 46" strokeWidth="1.4" fill="none" opacity="0.6" />
    </g>
  </svg>
)

// ============================================================================
// POINTED ARCH - Gothic arch with two curves meeting at a point (lancet form)
// Reference: Notre-Dame, Chartres - vertical emphasis, dramatic height
// ============================================================================
export const PointedArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <MaterialPatterns />
    <HaloFilter />

    {/* CONTEXT (near): COMPLETE GOTHIC CATHEDRAL NAVE - field sketch extending off-page */}

    {/* CONTEXT (near): CEILING: Gothic ribbed vaulting extending beyond frame */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      {/* Vault ribs continuing upward off-page */}
      <path d="M -5 50 Q 20 -10, 50 -15" fill="none" />
      <path d="M 105 50 Q 80 -10, 50 -15" fill="none" />
      {/* Transverse arch ribs */}
      <path d="M 15 10 Q 50 -5, 85 10" fill="none" />
      <path d="M 10 5 Q 50 -8, 90 5" fill="none" />
    </g>

    {/* CONTEXT (near): NAVE WALLS: Complete cathedral walls extending beyond frame */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      {/* Left nave wall off-page top and bottom */}
      <path d="M -5 -10 L -5 110" fill="none" />
      <path d="M 0 -10 L 0 110" fill="none" opacity="0.7" />
      {/* Right nave wall off-page */}
      <path d="M 100 -10 L 100 110" fill="none" />
      <path d="M 105 -10 L 105 110" fill="none" opacity="0.7" />
      {/* Stone courses */}
      <path d="M -5 25 L 5 25" strokeWidth="0.4" opacity="0.5" />
      <path d="M 95 25 L 105 25" strokeWidth="0.4" opacity="0.5" />
      <path d="M -5 65 L 5 65" strokeWidth="0.4" opacity="0.5" />
      <path d="M 95 65 L 105 65" strokeWidth="0.4" opacity="0.5" />
    </g>

    {/* CONTEXT (far): ADJACENT BAY ARCHES: Cathedral colonnade continuing into distance */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      {/* Next bay to left (perspective) */}
      <path d="M -15 60 Q -10 42, 0 28 Q 10 42, 5 60" fill="none" />
      {/* Next bay to right */}
      <path d="M 95 60 Q 90 42, 100 28 Q 110 42, 115 60" fill="none" />
    </g>

    {/* EFFECTS: Sacred light from clerestory windows high above */}
    <g opacity={S.E.opacity} strokeDasharray={S.E.dash} strokeWidth={S.E.strokeWidth}>
      {/* Light rays streaming from off-page windows */}
      <path d="M -10 5 L 25 45" stroke="currentColor" />
      <path d="M 5 0 L 32 45" stroke="currentColor" />
      <path d="M 20 -5 L 40 45" stroke="currentColor" />
      <path d="M 80 -5 L 60 45" stroke="currentColor" />
      <path d="M 95 0 L 68 45" stroke="currentColor" />
      <path d="M 110 5 L 75 45" stroke="currentColor" />
      {/* Dust motes floating in sacred light */}
      <circle cx="22" cy="35" r="0.3" fill="currentColor" opacity="0.5" />
      <circle cx="38" cy="40" r="0.25" fill="currentColor" opacity="0.4" />
      <circle cx="62" cy="40" r="0.25" fill="currentColor" opacity="0.4" />
      <circle cx="78" cy="35" r="0.3" fill="currentColor" opacity="0.5" />
    </g>

    {/* CONTEXT (far): Cathedral pavement extending far beyond */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      <rect x="-10" y="90" width="120" height="20" fill="url(#stone-smooth)" opacity="0.15" stroke="none" />
      {/* Floor extending off-page left/right */}
      <path d="M -10 94 L 110 94" strokeWidth="0.8" fill="none" opacity="0.5" strokeDasharray="5 3" />
      <path d="M -10 100 L 110 100" strokeWidth="0.6" fill="none" opacity="0.4" strokeDasharray="4 2" />
      {/* Worn pilgrimage path - centuries of footsteps */}
      <path d="M 30 92 Q 50 93, 70 92" strokeWidth="0.3" opacity="0.3" fill="none" />
      <path d="M 32 95 Q 50 96, 68 95" strokeWidth="0.3" opacity="0.3" fill="none" />
      <path d="M 35 98 Q 50 99, 65 98" strokeWidth="0.3" opacity="0.3" fill="none" />
    </g>

    {/* CONTEXT (near): COMPOUND PIERS: Clustered columns extending off-page */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      {/* Left pier - continues up beyond frame */}
      <rect x="16" y="-10" width="10" height="120" fill="url(#stone-smooth)" opacity="0.2" stroke="none" />
      <path d="M 18 -10 L 18 110" strokeWidth="1.5" fill="none" strokeDasharray="5 2" />
      <path d="M 21 -10 L 21 110" strokeWidth="1" fill="none" strokeDasharray="5 2" opacity="0.7" />
      <path d="M 24 -10 L 24 110" strokeWidth="1" fill="none" strokeDasharray="5 2" opacity="0.7" />
      {/* Right pier - continues up beyond frame */}
      <rect x="74" y="-10" width="10" height="120" fill="url(#stone-smooth)" opacity="0.2" stroke="none" />
      <path d="M 82 -10 L 82 110" strokeWidth="1.5" fill="none" strokeDasharray="5 2" />
      <path d="M 79 -10 L 79 110" strokeWidth="1" fill="none" strokeDasharray="5 2" opacity="0.7" />
      <path d="M 76 -10 L 76 110" strokeWidth="1" fill="none" strokeDasharray="5 2" opacity="0.7" />
    </g>

    {/* PRIMARY: THE POINTED ARCH - BOLD FIELD SKETCH LINES */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Limestone material fill for arch mass */}
      <path d="M 18 52 Q 22 28, 50 6 Q 78 28, 82 52" fill="url(#stone-smooth)" opacity="0.25" stroke="none" />

      {/* BOLD LEFT CURVE rising to point - extrados (field sketch confidence) */}
      <path d="M 18 52 Q 22 28, 50 6" strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />
      {/* BOLD RIGHT CURVE rising to point - extrados */}
      <path d="M 82 52 Q 78 28, 50 6" strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* BOLD Intrados curves */}
      <path d="M 24 52 Q 28 30, 50 12" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 76 52 Q 72 30, 50 12" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Depth shadow in arch */}
      <path d="M 25 52 Q 29 31, 50 13" strokeWidth="0.6" fill="none" opacity="0.2" />
      <path d="M 75 52 Q 71 31, 50 13" strokeWidth="0.6" fill="none" opacity="0.2" />

      {/* DETAIL: Voussoirs following pointed curve - ENHANCED with depth */}
      <path d="M 26 46 L 30 38" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      <path d="M 26.5 46 L 30.5 38" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 34 34 L 40 26" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      <path d="M 34.5 34 L 40.5 26" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 44 20 L 49 10" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      <path d="M 44.5 20 L 49.5 10" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 51 10 L 56 20" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      <path d="M 51.5 10 L 56.5 20" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 60 26 L 66 34" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      <path d="M 60.5 26 L 66.5 34" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 70 38 L 74 46" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      <path d="M 70.5 38 L 74.5 46" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />

      {/* DETAIL: Medieval chisel marks on limestone */}
      <path d="M 28 42 L 30 43" strokeWidth="0.25" fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 38 30 L 40 31" strokeWidth="0.25" fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 60 31 L 62 30" strokeWidth="0.25" fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 70 43 L 72 42" strokeWidth="0.25" fill="none" opacity={S.D.opacitySubtle} />

      {/* BOLD Pointed keystone at apex */}
      <path d="M 44 14 L 50 5 L 56 14" strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} strokeLinejoin="round" />
      <path d="M 46 10 L 50 6 L 54 10" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      {/* Keystone edges */}
      <path d="M 46 12 L 50 7 L 54 12" strokeWidth="0.6" fill="none" opacity={S.D.opacitySubtle} />

      {/* BOLD Impost moldings with Gothic detail */}
      <path d="M 14 52 L 27 52" strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 15 50 L 26 50" strokeWidth="1.4" fill="none" opacity="0.6" />
      <path d="M 73 52 L 86 52" strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 74 50 L 85 50" strokeWidth="1.4" fill="none" opacity="0.6" />

      {/* Soot darkening from centuries of candles (weathering) */}
      <path d="M 25 48 Q 30 35, 45 18" strokeWidth="0.4" fill="none" opacity="0.15" />
      <path d="M 75 48 Q 70 35, 55 18" strokeWidth="0.4" fill="none" opacity="0.15" />
    </g>
  </svg>
)

// ============================================================================
// HORSESHOE ARCH - Extends past semicircle before springing (Moorish/Islamic)
// Reference: Great Mosque of Córdoba - distinctive inward curve at base
// ============================================================================
export const HorseshoeArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <MaterialPatterns />
    <HaloFilter />

    {/* CONTEXT: COMPLETE CÓRDOBA MOSQUE PRAYER HALL - field sketch off-page */}

    {/* CONTEXT (near): CEILING: Wooden coffered ceiling extending beyond */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      {/* Ceiling beams continuing off-page */}
      <path d="M -10 0 L 110 0" fill="none" opacity="0.6" />
      <path d="M -10 8 L 110 8" fill="none" />
      <path d="M -10 16 L 110 16" fill="none" opacity="0.6" />
    </g>

    {/* CONTEXT (near): MOSQUE WALLS: Complete hypostyle hall walls */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      {/* Left wall extending off-page */}
      <path d="M -5 -10 L -5 110" fill="none" />
      <path d="M 0 -10 L 0 110" fill="none" opacity="0.7" />
      {/* Right wall off-page */}
      <path d="M 100 -10 L 100 110" fill="none" />
      <path d="M 105 -10 L 105 110" fill="none" opacity="0.7" />
    </g>

    {/* CONTEXT (far): FAMOUS CÓRDOBA COLONNADE: Rows of striped arches extending beyond */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      {/* Arcade continues left - multiple bays visible */}
      <path d="M -20 58 Q -25 52, -22 45 Q -18 38, -12 45 Q -10 52, -15 58" fill="none" />
      <path d="M -5 58 Q -10 52, -8 45 Q -4 38, 2 45 Q 4 52, 0 58" fill="none" />
      {/* Stripes on left arches */}
      <rect x="-18" y="45" width="4" height="3" opacity="0.4" fill="currentColor" stroke="none" />
      <rect x="-3" y="45" width="4" height="3" opacity="0.4" fill="currentColor" stroke="none" />
      {/* Arcade continues right */}
      <path d="M 100 58 Q 95 52, 98 45 Q 102 38, 108 45 Q 110 52, 105 58" fill="none" />
      <path d="M 115 58 Q 110 52, 113 45 Q 117 38, 123 45 Q 125 52, 120 58" fill="none" />
      {/* Stripes on right arches */}
      <rect x="100" y="45" width="4" height="3" opacity="0.4" fill="currentColor" stroke="none" />
      <rect x="115" y="45" width="4" height="3" opacity="0.4" fill="currentColor" stroke="none" />
    </g>

    {/* CONTEXT (far): FLOOR: Marble & tile pavement extending far beyond */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      <rect x="-10" y="90" width="120" height="20" fill="url(#stone-smooth)" opacity="0.15" stroke="none" />
      {/* Floor extending off-page */}
      <path d="M -10 94 L 110 94" strokeWidth="0.8" fill="none" opacity="0.5" strokeDasharray="5 3" />
      <path d="M -10 100 L 110 100" strokeWidth="0.6" fill="none" opacity="0.4" strokeDasharray="4 2" />
      {/* Islamic geometric tile pattern across floor */}
      <path d="M 0 92 L 5 92 L 5 96 L 0 96 Z" strokeWidth="0.2" opacity="0.3" fill="none" />
      <path d="M 20 92 L 25 92 L 25 96 L 20 96 Z" strokeWidth="0.2" opacity="0.3" fill="none" />
      <path d="M 40 92 L 45 92 L 45 96 L 40 96 Z" strokeWidth="0.2" opacity="0.3" fill="none" />
      <path d="M 60 92 L 65 92 L 65 96 L 60 96 Z" strokeWidth="0.2" opacity="0.3" fill="none" />
      <path d="M 80 92 L 85 92 L 85 96 L 80 96 Z" strokeWidth="0.2" opacity="0.3" fill="none" />
      <path d="M 100 92 L 105 92 L 105 96 L 100 96 Z" strokeWidth="0.2" opacity="0.3" fill="none" />
    </g>

    {/* CONTEXT (near): BRICK COLUMNS: Supporting colonnade extending up off-page */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      {/* Left column - continues up beyond frame */}
      <rect x="23" y="-10" width="9" height="120" fill="url(#brick-rough)" opacity="0.2" stroke="none" />
      <path d="M 25 -10 L 25 110" strokeWidth="1.5" fill="none" strokeDasharray="5 2" />
      <path d="M 28 -10 L 28 110" strokeWidth="1" fill="none" strokeDasharray="5 2" opacity="0.7" />
      <path d="M 30 -10 L 30 110" strokeWidth="1" fill="none" strokeDasharray="5 2" opacity="0.7" />
      {/* Right column - continues up beyond frame */}
      <rect x="68" y="-10" width="9" height="120" fill="url(#brick-rough)" opacity="0.2" stroke="none" />
      <path d="M 75 -10 L 75 110" strokeWidth="1.5" fill="none" strokeDasharray="5 2" />
      <path d="M 72 -10 L 72 110" strokeWidth="1" fill="none" strokeDasharray="5 2" opacity="0.7" />
      <path d="M 70 -10 L 70 110" strokeWidth="1" fill="none" strokeDasharray="5 2" opacity="0.7" />
    </g>

    {/* PRIMARY: THE HORSESHOE ARCH - BOLD FIELD SKETCH */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Brick material fill for arch mass */}
      <path d="M 25 58 Q 16 58, 14 48 Q 10 32, 20 18 Q 32 6, 50 6 Q 68 6, 80 18 Q 90 32, 86 48 Q 84 58, 75 58"
            fill="url(#brick-rough)" opacity="0.22" stroke="none" />

      {/* BOLD horseshoe curve - arch extends INWARD past piers (field sketch confidence) */}
      {/* Extrados */}
      <path d="M 25 58 Q 16 58, 14 48 Q 10 32, 20 18 Q 32 6, 50 6 Q 68 6, 80 18 Q 90 32, 86 48 Q 84 58, 75 58"
            strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* BOLD Intrados */}
      <path d="M 30 55 Q 22 55, 20 46 Q 16 34, 26 22 Q 36 12, 50 12 Q 64 12, 74 22 Q 84 34, 80 46 Q 78 55, 70 55"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Depth shadow */}
      <path d="M 31 55 Q 23 55, 21 46 Q 17 35, 27 23 Q 37 13, 50 13 Q 63 13, 73 23 Q 83 35, 79 46 Q 77 55, 69 55"
            strokeWidth="0.6" fill="none" opacity="0.2" />

      {/* DETAIL: FAMOUS CÓRDOBA STRIPED VOUSSOIRS - alternating red/white brick pattern */}
      {/* Enhanced with depth */}
      <path d="M 21 52 L 24 44" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      <path d="M 21.5 52 L 24.5 44" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      {/* Red brick voussoir (darker) */}
      <path d="M 25 40 L 30 32" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacityStrong} />
      <path d="M 25.5 40 L 30.5 32" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      {/* White stone voussoir (lighter) */}
      <path d="M 34 26 L 42 18" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      <path d="M 34.5 26 L 42.5 18" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      {/* Red brick (center) */}
      <path d="M 46 14 L 50 8" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacityStrong} />
      <path d="M 46.5 14 L 50.5 8" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      {/* White stone */}
      <path d="M 54 8 L 58 14" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      <path d="M 54.5 8 L 58.5 14" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      {/* Red brick */}
      <path d="M 58 18 L 66 26" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacityStrong} />
      <path d="M 58.5 18 L 66.5 26" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      {/* White stone */}
      <path d="M 70 32 L 75 40" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacity} />
      <path d="M 70.5 32 L 75.5 40" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      {/* Red brick */}
      <path d="M 76 44 L 79 52" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacityStrong} />
      <path d="M 76.5 44 L 79.5 52" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />

      {/* BOLD Keystone with Islamic geometric detail */}
      <path d="M 45 8 L 50 5 L 55 8" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinejoin="round" />
      <path d="M 46 10 L 54 10" strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />
      {/* DETAIL: Geometric star pattern on keystone */}
      <path d="M 48 7 L 50 5.5 L 52 7" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />

      {/* BOLD Impost/capital with Moorish calligraphic decoration */}
      <path d="M 20 58 L 33 58" strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 21 56 L 32 56" strokeWidth="1.4" fill="none" opacity="0.6" />
      {/* DETAIL: Stylized calligraphic curves */}
      <path d="M 23 57 Q 25 56.5, 27 57" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 67 58 L 80 58" strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 68 56 L 79 56" strokeWidth="1.4" fill="none" opacity="0.6" />
      <path d="M 73 57 Q 75 56.5, 77 57" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
    </g>
  </svg>
)

// ============================================================================
// OGEE ARCH - S-curves (concave then convex) meeting at a point (Late Gothic)
// Reference: English Decorated Gothic, Indian Islamic - flowing S-curves with finial
// ============================================================================
export const OgeeArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <MaterialPatterns />
    <HaloFilter />

    {/* CONTEXT: COMPLETE MUGHAL PALACE IWAN - field sketch off-page */}

    {/* CONTEXT (near): CEILING: Persian muqarnas vaulting extending beyond */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      {/* Honeycomb muqarnas extending off-page */}
      <path d="M -10 0 L 110 0" fill="none" opacity="0.6" />
      <path d="M 0 8 Q 25 5, 50 8 Q 75 5, 100 8" fill="none" />
      <path d="M 10 15 Q 35 12, 50 15 Q 65 12, 90 15" fill="none" opacity="0.7" />
    </g>

    {/* CONTEXT (near): PALACE WALLS: Complete iwan walls with tile work */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      {/* Left wall extending off-page */}
      <path d="M -5 -10 L -5 110" fill="none" />
      <path d="M 0 -10 L 0 110" fill="none" opacity="0.7" />
      {/* Right wall off-page */}
      <path d="M 100 -10 L 100 110" fill="none" />
      <path d="M 105 -10 L 105 110" fill="none" opacity="0.7" />
      {/* Tile work bands */}
      <path d="M -5 35 L 5 35" strokeWidth="0.4" opacity="0.5" />
      <path d="M 95 35 L 105 35" strokeWidth="0.4" opacity="0.5" />
    </g>

    {/* CONTEXT (far): JALI SCREENS: Geometric perforated screens extending across */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      {/* Left jali screen patterns */}
      <circle cx="-5" cy="25" r="3" fill="none" />
      <circle cx="5" cy="15" r="3" fill="none" />
      <circle cx="15" cy="25" r="3" fill="none" />
      {/* Star connections */}
      <path d="M -5 25 L 5 15" />
      <path d="M 5 15 L 15 25" />
      {/* Right jali screens */}
      <circle cx="85" cy="25" r="3" fill="none" />
      <circle cx="95" cy="15" r="3" fill="none" />
      <circle cx="105" cy="25" r="3" fill="none" />
      <path d="M 85 25 L 95 15" />
      <path d="M 95 15 L 105 25" />
    </g>

    {/* CONTEXT (far): ADJACENT OGEE ARCHES: Palace arcade continuing */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      {/* Next arch to left (perspective) */}
      <path d="M -15 65 Q -22 55, -18 45 Q -12 32, 5 18" fill="none" />
      {/* Next arch to right */}
      <path d="M 115 65 Q 122 55, 118 45 Q 112 32, 95 18" fill="none" />
    </g>

    {/* CONTEXT (far): FLOOR: Marble & tile pavement with Persian carpet */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      <rect x="-10" y="90" width="120" height="20" fill="url(#stone-smooth)" opacity="0.15" stroke="none" />
      {/* Floor extending off-page */}
      <path d="M -10 94 L 110 94" strokeWidth="0.8" fill="none" opacity="0.5" strokeDasharray="5 3" />
      <path d="M -10 100 L 110 100" strokeWidth="0.6" fill="none" opacity="0.4" strokeDasharray="4 2" />
      {/* Persian carpet border patterns */}
      <path d="M 0 92 L 5 94 L 0 96" strokeWidth="0.2" opacity="0.3" fill="none" />
      <path d="M 25 92 L 30 94 L 25 96" strokeWidth="0.2" opacity="0.3" fill="none" />
      <path d="M 50 92 L 55 94 L 50 96" strokeWidth="0.2" opacity="0.3" fill="none" />
      <path d="M 75 92 L 80 94 L 75 96" strokeWidth="0.2" opacity="0.3" fill="none" />
      <path d="M 100 92 L 95 94 L 100 96" strokeWidth="0.2" opacity="0.3" fill="none" />
    </g>

    {/* CONTEXT (near): CARVED PIERS: Sandstone piers extending up off-page */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      {/* Left pier - continues up beyond frame */}
      <rect x="16" y="-10" width="8" height="120" fill="url(#stone-smooth)" opacity="0.2" stroke="none" />
      <path d="M 18 -10 L 18 110" strokeWidth="1.5" fill="none" strokeDasharray="5 2" />
      <path d="M 22 -10 L 22 110" strokeWidth="1" fill="none" strokeDasharray="5 2" opacity="0.7" />
      {/* Right pier - continues up beyond frame */}
      <rect x="76" y="-10" width="8" height="120" fill="url(#stone-smooth)" opacity="0.2" stroke="none" />
      <path d="M 82 -10 L 82 110" strokeWidth="1.5" fill="none" strokeDasharray="5 2" />
      <path d="M 78 -10 L 78 110" strokeWidth="1" fill="none" strokeDasharray="5 2" opacity="0.7" />
    </g>

    {/* PRIMARY: THE OGEE ARCH - BOLD MUGHAL ELEGANCE */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Sandstone material fill for arch mass */}
      <path d="M 18 58 Q 10 48, 16 38 Q 24 26, 50 6 Q 76 26, 84 38 Q 90 48, 82 58"
            fill="url(#stone-smooth)" opacity="0.25" stroke="none" />

      {/* BOLD Left ogee: flowing S-curve (field sketch confidence) */}
      <path d="M 18 58 Q 10 48, 16 38 Q 24 26, 50 6"
            strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />
      {/* BOLD Right ogee: mirror S-curve */}
      <path d="M 82 58 Q 90 48, 84 38 Q 76 26, 50 6"
            strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* BOLD Inner ogee curves */}
      <path d="M 24 58 Q 17 50, 22 40 Q 30 28, 50 12"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 76 58 Q 83 50, 78 40 Q 70 28, 50 12"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Depth shadow */}
      <path d="M 25 58 Q 18 50, 23 40 Q 31 29, 50 13"
            strokeWidth="0.6" fill="none" opacity="0.2" />
      <path d="M 75 58 Q 82 50, 77 40 Q 69 29, 50 13"
            strokeWidth="0.6" fill="none" opacity="0.2" />

      {/* DETAIL: PERSIAN/MUGHAL CARVED FLORAL PATTERNS on arch surface */}
      {/* Flowing arabesques and lotus motifs */}
      <path d="M 20 52 Q 22 50, 24 52" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 28 44 Q 30 42, 32 44" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 38 34 Q 40 32, 42 34" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      {/* Lotus petal detail */}
      <path d="M 45 22 Q 47 20, 49 22" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 51 22 Q 53 20, 55 22" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      {/* Right side arabesques */}
      <path d="M 58 34 Q 60 32, 62 34" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 68 44 Q 70 42, 72 44" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 76 52 Q 78 50, 80 52" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />

      {/* BOLD Finial at apex with Islamic geometric detail */}
      <path d="M 50 6 L 50 2" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <circle cx="50" cy="2" r="2" strokeWidth={S.P.strokeWidthBold} fill="none" />
      {/* DETAIL: Star finial ornament */}
      <path d="M 48 2 L 50 0.5 L 52 2" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacity} />
      <path d="M 48 2 L 50 3.5 L 52 2" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacity} />

      {/* DETAIL: Crockets along curve - enhanced as carved lotus buds */}
      <circle cx="18" cy="44" r="2" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 17 44 L 19 44" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <circle cx="30" cy="28" r="2" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 29 28 L 31 28" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <circle cx="70" cy="28" r="2" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 69 28 L 71 28" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <circle cx="82" cy="44" r="2" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 81 44 L 83 44" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />

      {/* BOLD Imposts with inlaid geometric patterns */}
      <path d="M 14 58 L 27 58" strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 15 56 L 26 56" strokeWidth="1.4" fill="none" opacity="0.6" />
      {/* DETAIL: Geometric inlay pattern */}
      <path d="M 17 57 L 19 57 L 19 59 L 17 59 Z" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 21 57 L 23 57 L 23 59 L 21 59 Z" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 73 58 L 86 58" strokeWidth={S.P.strokeWidthHeavy} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 74 56 L 85 56" strokeWidth="1.4" fill="none" opacity="0.6" />
      <path d="M 77 57 L 79 57 L 79 59 L 77 59 Z" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
      <path d="M 81 57 L 83 57 L 83 59 L 81 59 Z" strokeWidth={S.D.strokeWidthFine} fill="none" opacity={S.D.opacitySubtle} />
    </g>
  </svg>
)

// ============================================================================
// TREFOIL ARCH - Three overlapping arcs/lobes (Gothic decorative)
// Reference: Gothic tracery windows, cathedral portals - three-leaf clover shape
// ============================================================================
export const TrefoilArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Gothic cloister arcade - walls, ceiling, piers */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      {/* Cloister walls extending off-page */}
      <path d="M -10 -5 L -10 100" fill="none" />
      <path d="M -5 -5 L -5 100" fill="none" />
      <path d="M 105 -5 L 105 100" fill="none" />
      <path d="M 110 -5 L 110 100" fill="none" />

      {/* Stone coursing on walls */}
      <path d="M -10 20 L 8 20" strokeWidth="0.4" fill="none" opacity="0.5" />
      <path d="M 92 20 L 110 20" strokeWidth="0.4" fill="none" opacity="0.5" />
      <path d="M -10 50 L 8 50" strokeWidth="0.4" fill="none" opacity="0.5" />
      <path d="M 92 50 L 110 50" strokeWidth="0.4" fill="none" opacity="0.5" />
      <path d="M -10 75 L 8 75" strokeWidth="0.4" fill="none" opacity="0.5" />
      <path d="M 92 75 L 110 75" strokeWidth="0.4" fill="none" opacity="0.5" />

      {/* Ceiling/vault above */}
      <path d="M -10 -2 L 110 -2" strokeWidth="0.6" fill="none" />

      {/* Outer containing arch with voussoir lines */}
      <path d="M 18 58 Q 8 32, 24 14 Q 38 2, 50 2 Q 62 2, 76 14 Q 92 32, 82 58"
            strokeWidth="1" fill="none" opacity="0.8" />
      {/* Voussoir lines on outer arch */}
      <path d="M 22 42 L 28 32" strokeWidth="0.4" fill="none" opacity="0.5" />
      <path d="M 72 32 L 78 42" strokeWidth="0.4" fill="none" opacity="0.5" />
      <path d="M 48 4 L 52 4" strokeWidth="0.5" fill="none" opacity="0.5" />

      {/* Piers with depth */}
      <path d="M 14 94 L 14 58" strokeWidth="1" fill="none" />
      <path d="M 18 94 L 18 58" strokeWidth="1.2" fill="none" opacity="0.8" />
      <path d="M 82 94 L 82 58" strokeWidth="1.2" fill="none" opacity="0.8" />
      <path d="M 86 94 L 86 58" strokeWidth="1" fill="none" />
    </g>

    {/* CONTEXT (far): Floor paving and adjacent arch hints */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      {/* Floor paving */}
      <path d="M -10 94 L 110 94" strokeWidth="0.8" fill="none" />
      <path d="M -10 97 L 110 97" strokeWidth="0.5" fill="none" opacity="0.5" />
      <path d="M 20 94 L 20 100" strokeWidth="0.3" fill="none" opacity="0.4" />
      <path d="M 50 94 L 50 100" strokeWidth="0.3" fill="none" opacity="0.4" />
      <path d="M 80 94 L 80 100" strokeWidth="0.3" fill="none" opacity="0.4" />

      {/* Adjacent arch hint on left */}
      <path d="M -20 58 Q -28 32, -12 14 Q -2 2, 5 2" strokeWidth="0.6" fill="none" opacity="0.4" />
      {/* Adjacent arch hint on right */}
      <path d="M 120 58 Q 128 32, 112 14 Q 102 2, 95 2" strokeWidth="0.6" fill="none" opacity="0.4" />
    </g>

    {/* PRIMARY: THE TREFOIL - Three lobes (left, right, crown) like a 3-leaf clover */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Left lobe - bulges outward to the left from the pier */}
      <path d="M 18 58 Q 8 48, 12 36 Q 16 24, 30 24 Q 40 24, 42 34"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Right lobe - bulges outward to the right from the pier */}
      <path d="M 82 58 Q 92 48, 88 36 Q 84 24, 70 24 Q 60 24, 58 34"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Crown lobe - arches upward between left and right lobes */}
      <path d="M 42 34 Q 42 16, 50 10 Q 58 16, 58 34"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* DETAIL: Cusps where the three lobes meet - pointed projections */}
      {/* Left cusp (between left lobe and crown lobe) */}
      <path d="M 40 36 L 42 30 L 44 36" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacityStrong} />
      {/* Right cusp (between crown lobe and right lobe) */}
      <path d="M 56 36 L 58 30 L 60 36" strokeWidth={S.D.strokeWidthBold} fill="none" opacity={S.D.opacityStrong} />

      {/* Inner trefoil outline for depth/thickness */}
      <path d="M 22 56 Q 14 48, 17 38 Q 20 28, 32 28 Q 40 28, 42 36"
            strokeWidth={S.D.strokeWidthBold} fill="none" opacity="0.6" />
      <path d="M 78 56 Q 86 48, 83 38 Q 80 28, 68 28 Q 60 28, 58 36"
            strokeWidth={S.D.strokeWidthBold} fill="none" opacity="0.6" />
      <path d="M 42 36 Q 42 20, 50 14 Q 58 20, 58 36"
            strokeWidth={S.D.strokeWidthBold} fill="none" opacity="0.6" />

      {/* Finial at top */}
      <path d="M 50 10 L 50 4" strokeWidth={S.P.strokeWidth} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 47 4 L 50 0 L 53 4" strokeWidth={S.D.strokeWidthBold} fill="none" strokeLinejoin="round" />
    </g>
  </svg>
)

// ============================================================================
// TUDOR ARCH - Flattened pointed arch with 4 centers (English late Gothic)
// Reference: Hampton Court Palace - wide, shallow point, very English
// ============================================================================
export const TudorArchSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Hampton Court arcade wall with hood mold */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      {/* Walls extending off-page */}
      <path d="M -10 -5 L -10 100" fill="none" />
      <path d="M 0 -5 L 0 100" fill="none" />
      <path d="M 100 -5 L 100 100" fill="none" />
      <path d="M 110 -5 L 110 100" fill="none" />

      {/* Wall face / spandrel rectangle enclosing the arch */}
      <path d="M -10 20 L 110 20" fill="none" opacity="0.6" />
      <path d="M -10 94 L 110 94" strokeWidth="0.8" fill="none" />

      {/* Stone coursing on wall face */}
      <path d="M -10 25 L 5 25" strokeWidth="0.4" fill="none" opacity="0.5" />
      <path d="M 95 25 L 110 25" strokeWidth="0.4" fill="none" opacity="0.5" />
      <path d="M -10 35 L 5 35" strokeWidth="0.4" fill="none" opacity="0.5" />
      <path d="M 95 35 L 110 35" strokeWidth="0.4" fill="none" opacity="0.5" />
      <path d="M -10 60 L 5 60" strokeWidth="0.4" fill="none" opacity="0.5" />
      <path d="M 95 60 L 110 60" strokeWidth="0.4" fill="none" opacity="0.5" />
      <path d="M -10 80 L 5 80" strokeWidth="0.4" fill="none" opacity="0.5" />
      <path d="M 95 80 L 110 80" strokeWidth="0.4" fill="none" opacity="0.5" />

      {/* Hood mold / drip molding above the arch */}
      <path d="M 6 46 Q 20 38, 36 36 Q 44 28, 50 26 Q 56 28, 64 36 Q 80 38, 94 46"
            fill="none" opacity="0.6" />

      {/* Piers extending full height with depth */}
      <path d="M 7 -5 L 7 94" strokeWidth="1.2" fill="none" />
      <path d="M 10 -5 L 10 94" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M 16 -5 L 16 94" strokeWidth="1" fill="none" />
      <path d="M 84 -5 L 84 94" strokeWidth="1" fill="none" />
      <path d="M 90 -5 L 90 94" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M 93 -5 L 93 94" strokeWidth="1.2" fill="none" />

      {/* Spandrel Tudor rose motifs with petal detail */}
      <circle cx="24" cy="32" r="5" strokeWidth="0.6" fill="none" opacity="0.7" />
      <path d="M 24 28 L 24 27 M 20 32 L 19 32 M 28 32 L 29 32 M 24 36 L 24 37" strokeWidth="0.4" fill="none" opacity="0.5" />
      <circle cx="76" cy="32" r="5" strokeWidth="0.6" fill="none" opacity="0.7" />
      <path d="M 76 28 L 76 27 M 72 32 L 71 32 M 80 32 L 81 32 M 76 36 L 76 37" strokeWidth="0.4" fill="none" opacity="0.5" />
    </g>

    {/* CONTEXT (far): Floor paving and adjacent Tudor arch hints */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      {/* Floor paving */}
      <path d="M -10 97 L 110 97" strokeWidth="0.5" fill="none" opacity="0.5" />
      <path d="M 25 94 L 25 100" strokeWidth="0.3" fill="none" opacity="0.4" />
      <path d="M 50 94 L 50 100" strokeWidth="0.3" fill="none" opacity="0.4" />
      <path d="M 75 94 L 75 100" strokeWidth="0.3" fill="none" opacity="0.4" />

      {/* Adjacent Tudor arch hints */}
      <path d="M -30 48 Q -20 44, -14 40 Q -6 32, 0 30" strokeWidth="0.5" fill="none" opacity="0.4" />
      <path d="M 100 30 Q 106 32, 114 40 Q 120 44, 130 48" strokeWidth="0.5" fill="none" opacity="0.4" />
    </g>

    {/* PRIMARY: THE TUDOR ARCH - wide, 4-centered flattened pointed arch */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Lower curves (large radius, nearly horizontal) - extrados */}
      <path d="M 10 48 Q 20 44, 36 40" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 90 48 Q 80 44, 64 40" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Upper curves (small radius, meeting at shallow point) - extrados */}
      <path d="M 36 40 Q 44 32, 50 30" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 64 40 Q 56 32, 50 30" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />

      {/* Intrados */}
      <path d="M 16 48 Q 24 45, 38 42" strokeWidth={S.P.strokeWidth} fill="none" />
      <path d="M 84 48 Q 76 45, 62 42" strokeWidth={S.P.strokeWidth} fill="none" />
      <path d="M 38 42 Q 45 36, 50 34" strokeWidth={S.P.strokeWidth} fill="none" />
      <path d="M 62 42 Q 55 36, 50 34" strokeWidth={S.P.strokeWidth} fill="none" />

      {/* DETAIL: Voussoirs */}
      <path d="M 20 47 L 24 42" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 40 41 L 44 36" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 56 36 L 60 41" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />
      <path d="M 76 42 L 80 47" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />

      {/* Shallow pointed keystone */}
      <path d="M 46 32 L 50 28 L 54 32" strokeWidth={S.P.strokeWidth} fill="none" strokeLinejoin="round" />
      <path d="M 47 34 L 53 34" strokeWidth={S.P.strokeWidthLight} fill="none" opacity={S.D.opacity} />

      {/* Imposts with Tudor molding */}
      <path d="M 6 48 L 19 48" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
      <path d="M 81 48 L 94 48" strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinecap={S.P.strokeLinecap} />
    </g>
  </svg>
)

// ============================================================================
// KEYSTONE - Central wedge-shaped stone at arch apex locking voussoirs together
// Reference: Any proper arch - the critical stone that transfers load to sides
// ============================================================================
export const KeystoneSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Complete arch structure — piers, wall, and adjacent masonry */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth} fill="none">
      {/* Full arch showing where keystone sits at crown */}
      <path d="M 8 88 Q 8 52, 30 30" strokeWidth="1.2" />
      <path d="M 16 88 Q 16 56, 36 36" strokeWidth="1" />
      <path d="M 92 88 Q 92 52, 70 30" strokeWidth="1.2" />
      <path d="M 84 88 Q 84 56, 64 36" strokeWidth="1" />

      {/* Adjacent voussoirs flanking keystone */}
      <path d="M 30 30 L 36 36 L 40 26 L 34 22 Z" strokeWidth="0.8" />
      <path d="M 70 30 L 64 36 L 60 26 L 66 22 Z" strokeWidth="0.8" />

      {/* Full piers/columns supporting the arch */}
      <path d="M 8 88 L 8 98" strokeWidth="1.2" />
      <path d="M 16 88 L 16 98" strokeWidth="0.8" />
      <path d="M 92 88 L 92 98" strokeWidth="1.2" />
      <path d="M 84 88 L 84 98" strokeWidth="0.8" />

      {/* Wall/spandrel above arch */}
      <path d="M 0 5 L 100 5" strokeWidth="0.8" />
      <path d="M 0 5 L 0 98" strokeWidth="0.6" />
      <path d="M 100 5 L 100 98" strokeWidth="0.6" />

      {/* Ground pavement */}
      <path d="M 0 98 L 100 98" strokeWidth="0.8" />

      {/* Impost moldings at spring points */}
      <path d="M 4 88 L 20 88" strokeWidth="0.6" />
      <path d="M 80 88 L 96 88" strokeWidth="0.6" />
    </g>

    {/* PRIMARY: THE KEYSTONE - central wedge-shaped stone */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Keystone shape - wider at top (extrados), narrower at bottom (intrados) */}
      <path d="M 40 26 L 44 10 L 56 10 L 60 26 L 54 38 L 46 38 Z"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinejoin="round" />

      {/* DETAIL: Decorative carving on keystone face (common embellishment) */}
      <path d="M 48 14 L 50 11 L 52 14" strokeWidth={S.D.strokeWidthBold} fill="none" strokeLinejoin="round" />
      <path d="M 46 21 L 50 17 L 54 21" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacityStrong} />
      <path d="M 47 28 L 50 25 L 53 28" strokeWidth={S.D.strokeWidth} fill="none" opacity={S.D.opacity} />

      {/* DETAIL: Joint lines showing wedge action */}
      <path d="M 40 26 L 46 38" strokeWidth={S.P.strokeWidthLight} fill="none" opacity={S.D.opacity} />
      <path d="M 60 26 L 54 38" strokeWidth={S.P.strokeWidthLight} fill="none" opacity={S.D.opacity} />
    </g>

    {/* EFFECTS: Force arrows showing compression into keystone - illustrative dashed */}
    <g opacity={S.E.opacityModerate} strokeDasharray={S.E.dash} strokeWidth={S.E.strokeWidth}>
      <path d="M 28 46 L 44 34" strokeWidth="0.8" fill="none" />
      <path d="M 44 34 L 42 36" strokeWidth="0.6" fill="none" />
      <path d="M 44 34 L 46 37" strokeWidth="0.6" fill="none" />

      <path d="M 72 46 L 56 34" strokeWidth="0.8" fill="none" />
      <path d="M 56 34 L 54 37" strokeWidth="0.6" fill="none" />
      <path d="M 56 34 L 58 36" strokeWidth="0.6" fill="none" />
    </g>
  </svg>
)

// ============================================================================
// VOUSSOIR - Wedge-shaped stones/bricks forming an arch ring
// Reference: Any masonry arch - the individual wedge-shaped units
// ============================================================================
export const VoussoirSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT (near): Wall, piers, and spandrel structure */}
    <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
      {/* Wall face / spandrel rectangle above and around the arch */}
      <path d="M -10 5 L 110 5" fill="none" />
      <path d="M -10 5 L -10 100" fill="none" />
      <path d="M 110 5 L 110 100" fill="none" />

      {/* Stone coursing on wall/spandrel */}
      <path d="M -10 15 L 30 15" strokeWidth="0.4" fill="none" opacity="0.5" />
      <path d="M 70 15 L 110 15" strokeWidth="0.4" fill="none" opacity="0.5" />
      <path d="M -10 25 L 20 25" strokeWidth="0.4" fill="none" opacity="0.5" />
      <path d="M 80 25 L 110 25" strokeWidth="0.4" fill="none" opacity="0.5" />

      {/* Full-height piers with depth */}
      <path d="M 6 -5 L 6 100" strokeWidth="1" fill="none" />
      <path d="M 10 -5 L 10 100" strokeWidth="1.4" fill="none" opacity="0.7" />
      <path d="M 15 -5 L 15 100" strokeWidth="0.8" fill="none" />
      <path d="M 85 -5 L 85 100" strokeWidth="0.8" fill="none" />
      <path d="M 90 -5 L 90 100" strokeWidth="1.4" fill="none" opacity="0.7" />
      <path d="M 94 -5 L 94 100" strokeWidth="1" fill="none" />

      {/* Impost moldings at spring line */}
      <path d="M 4 78 L 18 78" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 82 78 L 96 78" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 5 80 L 17 80" strokeWidth="0.5" fill="none" opacity="0.4" />
      <path d="M 83 80 L 95 80" strokeWidth="0.5" fill="none" opacity="0.4" />

      {/* Centering/formwork line (construction context) */}
      <path d="M 10 78 Q 50 20, 90 78" strokeWidth="0.4" fill="none" opacity="0.3" strokeDasharray="1 3" />
    </g>

    {/* CONTEXT (far): Floor paving and adjacent arch hints */}
    <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
      {/* Floor paving */}
      <path d="M -10 92 L 110 92" strokeWidth="0.8" fill="none" />
      <path d="M -10 95 L 110 95" strokeWidth="0.5" fill="none" opacity="0.5" />
      <path d="M -10 98 L 110 98" strokeWidth="0.4" fill="none" opacity="0.3" />
      <path d="M 30 92 L 30 100" strokeWidth="0.3" fill="none" opacity="0.4" />
      <path d="M 50 92 L 50 100" strokeWidth="0.3" fill="none" opacity="0.4" />
      <path d="M 70 92 L 70 100" strokeWidth="0.3" fill="none" opacity="0.4" />

      {/* Adjacent arch hint on left */}
      <path d="M -30 78 Q -20 40, 0 28" strokeWidth="0.5" fill="none" opacity="0.4" />
      {/* Adjacent arch hint on right */}
      <path d="M 100 28 Q 120 40, 130 78" strokeWidth="0.5" fill="none" opacity="0.4" />
    </g>

    {/* PRIMARY: Multiple VOUSSOIRS forming arch - each wedge is solid */}
    <g filter={showHalo ? "url(#arch-halo)" : undefined}>
      {/* Left springer voussoir (first stone off pier) */}
      <path d="M 10 78 L 14 64 L 24 60 L 26 72 Z"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinejoin="round" />

      {/* Second voussoir */}
      <path d="M 14 64 L 22 52 L 32 50 L 28 62 Z"
            strokeWidth={S.P.strokeWidth} fill="none" strokeLinejoin="round" />

      {/* Third voussoir */}
      <path d="M 22 52 L 32 42 L 42 42 L 36 52 Z"
            strokeWidth={S.P.strokeWidth} fill="none" strokeLinejoin="round" />

      {/* Fourth voussoir (approaching keystone) */}
      <path d="M 32 42 L 42 34 L 48 36 L 42 44 Z"
            strokeWidth={S.P.strokeWidth} fill="none" strokeLinejoin="round" />

      {/* KEYSTONE at center - emphasized */}
      <path d="M 42 34 L 47 28 L 53 28 L 58 34 L 52 38 L 48 38 Z"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinejoin="round" />

      {/* Mirror voussoirs on right side */}
      <path d="M 52 36 L 58 34 L 68 42 L 58 44 Z"
            strokeWidth={S.P.strokeWidth} fill="none" strokeLinejoin="round" />

      <path d="M 64 42 L 68 42 L 78 52 L 68 52 Z"
            strokeWidth={S.P.strokeWidth} fill="none" strokeLinejoin="round" />

      <path d="M 72 62 L 78 52 L 86 64 L 78 64 Z"
            strokeWidth={S.P.strokeWidth} fill="none" strokeLinejoin="round" />

      <path d="M 74 72 L 76 60 L 86 64 L 90 78 Z"
            strokeWidth={S.P.strokeWidthBold} fill="none" strokeLinejoin="round" />
    </g>

    {/* DETAIL: Joint lines within voussoirs - subtle detail */}
    <g opacity={S.D.opacitySubtle}>
      <path d="M 14 64 L 26 72" strokeWidth={S.D.strokeWidthFine} fill="none" />
      <path d="M 22 52 L 28 62" strokeWidth={S.D.strokeWidthFine} fill="none" />
      <path d="M 32 42 L 36 52" strokeWidth={S.D.strokeWidthFine} fill="none" />
      <path d="M 68 42 L 64 52" strokeWidth={S.D.strokeWidthFine} fill="none" />
      <path d="M 78 52 L 72 62" strokeWidth={S.D.strokeWidthFine} fill="none" />
      <path d="M 86 64 L 74 72" strokeWidth={S.D.strokeWidthFine} fill="none" />
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
