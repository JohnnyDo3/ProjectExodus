'use client'

import React from 'react'

const HaloFilter = () => (
  <defs>
    <filter id="chain-halo" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
      <feColorMatrix in="blur" type="matrix"
        values="0.95 0 0 0 0.7  0 0.95 0 0 0.4  0 0 0.95 0 0.1  0 0 0 0.9 0" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* Metal chain link texture */}
    <pattern id="chain-texture" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
      <rect width="6" height="6" fill="currentColor" opacity="0.1"/>
      <circle cx="3" cy="3" r="1" fill="currentColor" opacity="0.2"/>
    </pattern>

    {/* Stone texture */}
    <pattern id="stone-texture" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
      <rect width="10" height="10" fill="currentColor" opacity="0.05"/>
      <path d="M 2 2 L 8 2 L 8 8 L 2 8 Z" stroke="currentColor" strokeWidth="0.2" opacity="0.1" fill="none"/>
    </pattern>
  </defs>
)

interface SVGProps {
  showHalo?: boolean
  viewType?: 'section' | 'plan' | 'detail'
}

// ============================================================================
// STONE AND CHAIN HOOPS - Tension rings resisting dome spreading
// Reference: Florence Cathedral Dome (Brunelleschi, 1420-1436)
// Revolutionary use of iron reinforcement anticipating modern tension rings
// ============================================================================

export const StoneAndChainHoopsSVG = ({ showHalo = false, viewType = 'section' }: SVGProps) => {
  if (viewType === 'plan') {
    return <ChainHoopsPlanView showHalo={showHalo} />
  } else if (viewType === 'detail') {
    return <ChainHoopsDetailView showHalo={showHalo} />
  }
  return <ChainHoopsSectionView showHalo={showHalo} />
}

// SECTION VIEW - Shows hoops embedded in dome structure
const ChainHoopsSectionView = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Dome profile and outward thrust forces */}
    <g strokeDasharray="3 2" opacity="0.35">
      {/* Inner dome surface */}
      <path d="M 15 85 Q 15 30, 50 10 Q 85 30, 85 85" strokeWidth="1" fill="none"/>
      {/* Outer dome surface */}
      <path d="M 10 88 Q 10 25, 50 5 Q 90 25, 90 88" strokeWidth="0.8" fill="none"/>

      {/* Vertical ribs */}
      <line x1="20" y1="82" x2="23" y2="35" strokeWidth="0.6" opacity="0.5"/>
      <line x1="80" y1="82" x2="77" y2="35" strokeWidth="0.6" opacity="0.5"/>

      {/* Ground reference */}
      <line x1="0" y1="90" x2="100" y2="90" strokeWidth="0.6"/>
    </g>

    {/* OUTWARD THRUST FORCES - arrows showing spreading pressure */}
    <g opacity="0.5">
      {/* Left thrust */}
      <path d="M 25 65 L 10 70" stroke="currentColor" strokeWidth="1.5"
            markerEnd="url(#thrust-arrow)" strokeDasharray="2 1"/>
      <text x="5" y="73" fontSize="2.5" opacity="0.8">OUTWARD</text>
      <text x="5" y="76" fontSize="2.5" opacity="0.8">THRUST</text>

      {/* Right thrust */}
      <path d="M 75 65 L 90 70" stroke="currentColor" strokeWidth="1.5"
            markerEnd="url(#thrust-arrow)" strokeDasharray="2 1"/>

      <defs>
        <marker id="thrust-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="currentColor" />
        </marker>
      </defs>
    </g>

    {/* PRIMARY: HORIZONTAL CHAIN HOOPS - tension rings */}
    <g filter={showHalo ? "url(#chain-halo)" : undefined}>
      {/* HOOP 1 - Bottom (lowest in dome) */}
      <g opacity="0.95">
        {/* Stone hoop backing */}
        <ellipse cx="50" cy="75" rx="32" ry="6" fill="currentColor" opacity="0.3"/>
        <ellipse cx="50" cy="75" rx="32" ry="6" fill="url(#stone-texture)"/>
        <ellipse cx="50" cy="75" rx="32" ry="6" fill="none" stroke="currentColor" strokeWidth="1.2"/>

        {/* Iron chain embedded */}
        <ellipse cx="50" cy="75" rx="30" ry="5" fill="none" stroke="currentColor"
                 strokeWidth="2.5" opacity="0.9"/>
        <ellipse cx="50" cy="75" rx="30" ry="5" fill="url(#chain-texture)"/>

        {/* Chain emphasis */}
        <ellipse cx="50" cy="75" rx="30" ry="5" fill="none" stroke="currentColor"
                 strokeWidth="0.5" opacity="0.6"/>
      </g>

      {/* HOOP 2 */}
      <g opacity="0.9">
        <ellipse cx="50" cy="60" rx="28" ry="5.5" fill="currentColor" opacity="0.25"/>
        <ellipse cx="50" cy="60" rx="28" ry="5.5" fill="url(#stone-texture)"/>
        <ellipse cx="50" cy="60" rx="28" ry="5.5" fill="none" stroke="currentColor" strokeWidth="1"/>

        {/* Iron chain */}
        <ellipse cx="50" cy="60" rx="26" ry="4.5" fill="none" stroke="currentColor"
                 strokeWidth="2.3" opacity="0.85"/>
        <ellipse cx="50" cy="60" rx="26" ry="4.5" fill="url(#chain-texture)"/>
      </g>

      {/* HOOP 3 */}
      <g opacity="0.85">
        <ellipse cx="50" cy="48" rx="24" ry="5" fill="currentColor" opacity="0.2"/>
        <ellipse cx="50" cy="48" rx="24" ry="5" fill="url(#stone-texture)"/>
        <ellipse cx="50" cy="48" rx="24" ry="5" fill="none" stroke="currentColor" strokeWidth="0.9"/>

        {/* Iron chain */}
        <ellipse cx="50" cy="48" rx="22" ry="4" fill="none" stroke="currentColor"
                 strokeWidth="2.1" opacity="0.8"/>
        <ellipse cx="50" cy="48" rx="22" ry="4" fill="url(#chain-texture)"/>
      </g>

      {/* HOOP 4 - Upper */}
      <g opacity="0.8">
        <ellipse cx="50" cy="35" rx="18" ry="4" fill="currentColor" opacity="0.18"/>
        <ellipse cx="50" cy="35" rx="18" ry="4" fill="url(#stone-texture)"/>
        <ellipse cx="50" cy="35" rx="18" ry="4" fill="none" stroke="currentColor" strokeWidth="0.8"/>

        {/* Iron chain */}
        <ellipse cx="50" cy="35" rx="16" ry="3.2" fill="none" stroke="currentColor"
                 strokeWidth="1.9" opacity="0.75"/>
        <ellipse cx="50" cy="35" rx="16" ry="3.2" fill="url(#chain-texture)"/>
      </g>

      {/* HOOP 5 - WOODEN CHAIN (unique innovation!) */}
      <g opacity="0.75">
        <ellipse cx="50" cy="23" rx="12" ry="3" fill="currentColor" opacity="0.15"/>
        <ellipse cx="50" cy="23" rx="12" ry="3" fill="none" stroke="currentColor"
                 strokeWidth="0.7" strokeDasharray="3 1"/>

        {/* Wooden chain - different visual treatment */}
        <ellipse cx="50" cy="23" rx="10" ry="2.5" fill="none" stroke="currentColor"
                 strokeWidth="1.7" opacity="0.7" strokeDasharray="1.5 0.5"/>
        <text x="50" y="21" textAnchor="middle" fontSize="1.8" opacity="0.6">WOOD</text>
      </g>
    </g>

    {/* ANNOTATION: Tension forces in hoops */}
    <g opacity="0.6">
      {/* Inward tension arrows on hoop */}
      <path d="M 80 75 L 75 75" stroke="currentColor" strokeWidth="1.2"
            markerEnd="url(#tension-arrow)" strokeDasharray="1 1"/>
      <path d="M 20 75 L 25 75" stroke="currentColor" strokeWidth="1.2"
            markerEnd="url(#tension-arrow)" strokeDasharray="1 1"/>

      <text x="85" y="76" fontSize="2.5" opacity="0.8">TENSION</text>
      <text x="85" y="79" fontSize="2.5" opacity="0.8">RESISTS</text>
      <text x="85" y="82" fontSize="2.5" opacity="0.8">SPREADING</text>

      <defs>
        <marker id="tension-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="currentColor" />
        </marker>
      </defs>
    </g>

    {/* Label */}
    <text x="50" y="96" textAnchor="middle" fontSize="3" opacity="0.5" fill="currentColor" fontWeight="600">
      HIDDEN REINFORCEMENT SYSTEM
    </text>
  </svg>
)

// PLAN VIEW - Looking down at circular tension rings
const ChainHoopsPlanView = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Octagonal dome plan */}
    <g strokeDasharray="4 3" opacity="0.3">
      {/* Octagonal outer wall */}
      <path d="M 50 10 L 75 18 L 90 35 L 90 65 L 75 82 L 50 90 L 25 82 L 10 65 L 10 35 L 25 18 Z"
            stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.05"/>

      {/* Eight vertical ribs at corners */}
      <g opacity="0.5" strokeWidth="0.6">
        <line x1="50" y1="10" x2="50" y2="18"/>
        <line x1="75" y1="18" x2="72" y2="23"/>
        <line x1="90" y1="35" x2="84" y2="38"/>
        <line x1="90" y1="65" x2="84" y2="62"/>
        <line x1="75" y1="82" x2="72" y2="77"/>
        <line x1="50" y1="90" x2="50" y2="82"/>
        <line x1="25" y1="82" x2="28" y2="77"/>
        <line x1="10" y1="65" x2="16" y2="62"/>
        <line x1="10" y1="35" x2="16" y2="38"/>
        <line x1="25" y1="18" x2="28" y2="23"/>
      </g>
    </g>

    {/* PRIMARY: CONCENTRIC CHAIN HOOPS */}
    <g filter={showHalo ? "url(#chain-halo)" : undefined}>
      {/* HOOP 1 - Outermost */}
      <g opacity="0.95">
        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor"
                strokeWidth="4" opacity="0.3"/>
        <circle cx="50" cy="50" r="38" fill="url(#chain-texture)"/>
        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor"
                strokeWidth="1.5" opacity="0.9"/>

        {/* Chain link details */}
        <g opacity="0.7">
          <circle cx="50" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="88" cy="50" r="1.5" fill="currentColor"/>
          <circle cx="50" cy="88" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="50" r="1.5" fill="currentColor"/>
        </g>
      </g>

      {/* HOOP 2 */}
      <g opacity="0.9">
        <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor"
                strokeWidth="3.5" opacity="0.25"/>
        <circle cx="50" cy="50" r="32" fill="url(#chain-texture)"/>
        <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor"
                strokeWidth="1.3" opacity="0.85"/>

        <g opacity="0.6">
          <circle cx="50" cy="18" r="1.3" fill="currentColor"/>
          <circle cx="82" cy="50" r="1.3" fill="currentColor"/>
          <circle cx="50" cy="82" r="1.3" fill="currentColor"/>
          <circle cx="18" cy="50" r="1.3" fill="currentColor"/>
        </g>
      </g>

      {/* HOOP 3 */}
      <g opacity="0.85">
        <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor"
                strokeWidth="3" opacity="0.2"/>
        <circle cx="50" cy="50" r="26" fill="url(#chain-texture)"/>
        <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor"
                strokeWidth="1.1" opacity="0.8"/>

        <g opacity="0.5">
          <circle cx="50" cy="24" r="1.1" fill="currentColor"/>
          <circle cx="76" cy="50" r="1.1" fill="currentColor"/>
          <circle cx="50" cy="76" r="1.1" fill="currentColor"/>
          <circle cx="24" cy="50" r="1.1" fill="currentColor"/>
        </g>
      </g>

      {/* HOOP 4 */}
      <g opacity="0.75">
        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor"
                strokeWidth="2.5" opacity="0.18"/>
        <circle cx="50" cy="50" r="20" fill="url(#chain-texture)"/>
        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor"
                strokeWidth="0.9" opacity="0.75"/>

        <g opacity="0.4">
          <circle cx="50" cy="30" r="0.9" fill="currentColor"/>
          <circle cx="70" cy="50" r="0.9" fill="currentColor"/>
          <circle cx="50" cy="70" r="0.9" fill="currentColor"/>
          <circle cx="30" cy="50" r="0.9" fill="currentColor"/>
        </g>
      </g>

      {/* HOOP 5 - Wooden (innermost) */}
      <g opacity="0.65">
        <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor"
                strokeWidth="2" opacity="0.15" strokeDasharray="3 1"/>
        <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor"
                strokeWidth="0.8" opacity="0.7" strokeDasharray="1.5 0.5"/>

        <text x="50" y="51" textAnchor="middle" fontSize="2.5" opacity="0.7" fontWeight="600">WOOD</text>
      </g>
    </g>

    {/* ANNOTATION: Circumferential tension */}
    <g opacity="0.6">
      {/* Curved tension arrows around hoop */}
      <path d="M 88 45 A 38 38 0 0 1 88 55" fill="none" stroke="currentColor"
            strokeWidth="1.2" markerEnd="url(#circle-arrow)"/>
      <path d="M 12 55 A 38 38 0 0 1 12 45" fill="none" stroke="currentColor"
            strokeWidth="1.2" markerEnd="url(#circle-arrow)"/>

      <text x="94" y="51" fontSize="2.5" opacity="0.8">CIRCULAR</text>
      <text x="94" y="54" fontSize="2.5" opacity="0.8">TENSION</text>

      <defs>
        <marker id="circle-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="currentColor" />
        </marker>
      </defs>
    </g>

    {/* Label */}
    <text x="50" y="96" textAnchor="middle" fontSize="3" opacity="0.5" fill="currentColor" fontWeight="600">
      FIVE HORIZONTAL HOOPS
    </text>
  </svg>
)

// DETAIL VIEW - Close-up of chain construction and embedding
const ChainHoopsDetailView = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    <text x="50" y="10" textAnchor="middle" fontSize="4" fill="currentColor" opacity="0.8" fontWeight="700">
      CHAIN CONSTRUCTION DETAIL
    </text>

    {/* CONTEXT: Masonry wall section */}
    <g opacity="0.4">
      {/* Brick courses */}
      <rect x="10" y="20" width="80" height="8" fill="currentColor" opacity="0.1"/>
      <rect x="10" y="20" width="80" height="8" fill="url(#stone-texture)"/>
      <line x1="10" y1="24" x2="90" y2="24" strokeWidth="0.4" stroke="currentColor"/>

      <rect x="10" y="72" width="80" height="8" fill="currentColor" opacity="0.1"/>
      <rect x="10" y="72" width="80" height="8" fill="url(#stone-texture)"/>
      <line x1="10" y1="76" x2="90" y2="76" strokeWidth="0.4" stroke="currentColor"/>

      {/* Vertical joints */}
      <g strokeDasharray="1 1" strokeWidth="0.3">
        <line x1="30" y1="20" x2="30" y2="28" stroke="currentColor"/>
        <line x1="50" y1="20" x2="50" y2="28" stroke="currentColor"/>
        <line x1="70" y1="20" x2="70" y2="28" stroke="currentColor"/>

        <line x1="30" y1="72" x2="30" y2="80" stroke="currentColor"/>
        <line x1="50" y1="72" x2="50" y2="80" stroke="currentColor"/>
        <line x1="70" y1="72" x2="70" y2="80" stroke="currentColor"/>
      </g>
    </g>

    {/* PRIMARY: CHAIN EMBEDDED IN MASONRY */}
    <g filter={showHalo ? "url(#chain-halo)" : undefined}>
      {/* Stone channel */}
      <rect x="15" y="35" width="70" height="30" fill="currentColor" opacity="0.15" rx="1"/>
      <rect x="15" y="35" width="70" height="30" fill="url(#stone-texture)"/>
      <rect x="15" y="35" width="70" height="30" fill="none" stroke="currentColor"
            strokeWidth="1.5" rx="1"/>

      {/* Iron chain links - realistic interlocking */}
      <g opacity="0.95">
        {/* Link 1 */}
        <ellipse cx="22" cy="50" rx="5" ry="8" fill="currentColor" stroke="currentColor"
                 strokeWidth="2.5" opacity="0.7"/>
        <ellipse cx="22" cy="50" rx="3.5" ry="6.5" fill="none" stroke="currentColor" strokeWidth="1"/>

        {/* Link 2 - rotated, interlocking */}
        <ellipse cx="30" cy="50" rx="8" ry="5" fill="currentColor" stroke="currentColor"
                 strokeWidth="2.5" opacity="0.75"/>
        <ellipse cx="30" cy="50" rx="6.5" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1"/>

        {/* Link 3 */}
        <ellipse cx="40" cy="50" rx="5" ry="8" fill="currentColor" stroke="currentColor"
                 strokeWidth="2.5" opacity="0.7"/>
        <ellipse cx="40" cy="50" rx="3.5" ry="6.5" fill="none" stroke="currentColor" strokeWidth="1"/>

        {/* Link 4 - rotated */}
        <ellipse cx="50" cy="50" rx="8" ry="5" fill="currentColor" stroke="currentColor"
                 strokeWidth="2.5" opacity="0.75"/>
        <ellipse cx="50" cy="50" rx="6.5" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1"/>

        {/* Link 5 */}
        <ellipse cx="60" cy="50" rx="5" ry="8" fill="currentColor" stroke="currentColor"
                 strokeWidth="2.5" opacity="0.7"/>
        <ellipse cx="60" cy="50" rx="3.5" ry="6.5" fill="none" stroke="currentColor" strokeWidth="1"/>

        {/* Link 6 - rotated */}
        <ellipse cx="70" cy="50" rx="8" ry="5" fill="currentColor" stroke="currentColor"
                 strokeWidth="2.5" opacity="0.75"/>
        <ellipse cx="70" cy="50" rx="6.5" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1"/>

        {/* Link 7 */}
        <ellipse cx="78" cy="50" rx="5" ry="8" fill="currentColor" stroke="currentColor"
                 strokeWidth="2.5" opacity="0.7"/>
        <ellipse cx="78" cy="50" rx="3.5" ry="6.5" fill="none" stroke="currentColor" strokeWidth="1"/>

        {/* Chain texture overlay */}
        <rect x="15" y="42" width="70" height="16" fill="url(#chain-texture)"/>
      </g>
    </g>

    {/* ANNOTATION: Forces */}
    <g opacity="0.7">
      {/* Tension arrows pulling outward on chain */}
      <path d="M 14 50 L 5 50" stroke="currentColor" strokeWidth="1.8"
            markerEnd="url(#detail-arrow)" strokeDasharray="2 1"/>
      <path d="M 86 50 L 95 50" stroke="currentColor" strokeWidth="1.8"
            markerEnd="url(#detail-arrow)" strokeDasharray="2 1"/>

      <text x="2" y="45" fontSize="2.5" opacity="0.8">←TENSION</text>
      <text x="86" y="45" fontSize="2.5" opacity="0.8">TENSION→</text>

      {/* Compression in stone */}
      <path d="M 50 32 L 50 26" stroke="currentColor" strokeWidth="1.5"
            markerEnd="url(#detail-arrow)" strokeDasharray="1 1"/>
      <path d="M 50 68 L 50 74" stroke="currentColor" strokeWidth="1.5"
            markerEnd="url(#detail-arrow)" strokeDasharray="1 1"/>

      <text x="53" y="30" fontSize="2.5" opacity="0.7">COMPRESSION</text>

      <defs>
        <marker id="detail-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="currentColor" />
        </marker>
      </defs>
    </g>

    {/* Innovation note */}
    <g opacity="0.6">
      <text x="50" y="88" textAnchor="middle" fontSize="2.5" fontWeight="600">
        FIRST MAJOR USE OF IRON REINFORCEMENT
      </text>
      <text x="50" y="92" textAnchor="middle" fontSize="2.2">
        Anticipates modern tension-ring principle
      </text>
      <text x="50" y="96" textAnchor="middle" fontSize="2.2">
        (pre-dates reinforced concrete by 400+ years!)
      </text>
    </g>
  </svg>
)

// Export all views
export const ChainHoopsSectionSVG = ChainHoopsSectionView
export const ChainHoopsPlanSVG = ChainHoopsPlanView
export const ChainHoopsDetailSVG = ChainHoopsDetailView
