'use client'

import React from 'react'

const HaloFilter = () => (
  <defs>
    <filter id="herringbone-halo" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
      <feColorMatrix in="blur" type="matrix"
        values="1 0 0 0 0.6  0 1 0 0 0.3  0 0 1 0 0.05  0 0 0 0.8 0" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* Brick texture pattern */}
    <pattern id="brick-texture" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
      <rect width="8" height="8" fill="currentColor" opacity="0.05"/>
      <path d="M 0 2 L 8 2 M 0 6 L 8 6" stroke="currentColor" strokeWidth="0.3" opacity="0.15"/>
    </pattern>
  </defs>
)

interface SVGProps {
  showHalo?: boolean
  viewType?: 'section' | 'perspective' | 'detail'
}

// ============================================================================
// HERRINGBONE BRICK PATTERN - Revolutionary self-supporting construction
// Reference: Florence Cathedral Dome (Brunelleschi, 1420-1436)
// The "spina di pesce" (fish spine) pattern that enabled the world's largest dome
// ============================================================================

export const HerringboneBrickPatternSVG = ({ showHalo = false, viewType = 'section' }: SVGProps) => {
  if (viewType === 'perspective') {
    return <HerringbonePerspectiveView showHalo={showHalo} />
  } else if (viewType === 'detail') {
    return <HerringboneDetailView showHalo={showHalo} />
  }
  return <HerringboneSectionView showHalo={showHalo} />
}

// SECTION VIEW - Shows the zigzag pattern that looks like fish bones
const HerringboneSectionView = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Dome curvature outline - dashed blueprint */}
    <g strokeDasharray="4 3" opacity="0.35">
      {/* Dome inner surface curve */}
      <path d="M 10 90 Q 10 30, 50 10 Q 90 30, 90 90" strokeWidth="1.2" fill="none" />
      {/* Dome outer surface curve */}
      <path d="M 5 92 Q 5 25, 50 5 Q 95 25, 95 92" strokeWidth="0.8" fill="none" />

      {/* Vertical rib references */}
      <line x1="20" y1="85" x2="20" y2="40" strokeWidth="0.6" opacity="0.5"/>
      <line x1="80" y1="85" x2="80" y2="40" strokeWidth="0.6" opacity="0.5"/>
    </g>

    {/* PRIMARY: THE HERRINGBONE PATTERN - zigzag fish spine arrangement */}
    <g filter={showHalo ? "url(#herringbone-halo)" : undefined}>
      {/* LEFT SIDE - Vertical and diagonal bricks */}

      {/* Vertical brick course 1 (bottom) */}
      <g opacity="0.9">
        <rect x="18" y="76" width="4" height="12" fill="currentColor" stroke="currentColor"
              strokeWidth="0.8" rx="0.3" opacity="0.7"/>
        <rect x="18" y="76" width="4" height="12" fill="url(#brick-texture)"/>
      </g>

      {/* Diagonal bricks between verticals - THE KEY INNOVATION */}
      <g>
        <rect x="23" y="72" width="3" height="10" fill="currentColor" stroke="currentColor"
              strokeWidth="0.8" rx="0.3" opacity="0.85"
              transform="rotate(-35 24.5 77)"/>
        <rect x="23" y="72" width="3" height="10" fill="url(#brick-texture)"
              transform="rotate(-35 24.5 77)"/>
      </g>

      {/* Vertical brick course 2 */}
      <g opacity="0.9">
        <rect x="28" y="66" width="4" height="12" fill="currentColor" stroke="currentColor"
              strokeWidth="0.8" rx="0.3" opacity="0.7"/>
        <rect x="28" y="66" width="4" height="12" fill="url(#brick-texture)"/>
      </g>

      {/* Diagonal bricks */}
      <g>
        <rect x="33" y="62" width="3" height="10" fill="currentColor" stroke="currentColor"
              strokeWidth="0.8" rx="0.3" opacity="0.85"
              transform="rotate(-35 34.5 67)"/>
        <rect x="33" y="62" width="3" height="10" fill="url(#brick-texture)"
              transform="rotate(-35 34.5 67)"/>
      </g>

      {/* Vertical brick course 3 (center apex area) */}
      <g opacity="0.9">
        <rect x="38" y="56" width="4" height="10" fill="currentColor" stroke="currentColor"
              strokeWidth="0.8" rx="0.3" opacity="0.7"/>
        <rect x="38" y="56" width="4" height="10" fill="url(#brick-texture)"/>
      </g>

      {/* Center diagonal - peak of zigzag */}
      <g>
        <rect x="43" y="52" width="3" height="9" fill="currentColor" stroke="currentColor"
              strokeWidth="0.8" rx="0.3" opacity="0.85"
              transform="rotate(-35 44.5 56.5)"/>
        <rect x="43" y="52" width="3" height="9" fill="url(#brick-texture)"
              transform="rotate(-35 44.5 56.5)"/>
      </g>

      {/* CENTER - Apex vertical brick */}
      <g opacity="0.95">
        <rect x="48" y="48" width="4" height="9" fill="currentColor" stroke="currentColor"
              strokeWidth="1" rx="0.3" opacity="0.75"/>
        <rect x="48" y="48" width="4" height="9" fill="url(#brick-texture)"/>
      </g>

      {/* RIGHT SIDE - Mirror pattern (opposite angle) */}

      {/* Diagonal bricks on right - notice opposite angle */}
      <g>
        <rect x="54" y="52" width="3" height="9" fill="currentColor" stroke="currentColor"
              strokeWidth="0.8" rx="0.3" opacity="0.85"
              transform="rotate(35 55.5 56.5)"/>
        <rect x="54" y="52" width="3" height="9" fill="url(#brick-texture)"
              transform="rotate(35 55.5 56.5)"/>
      </g>

      {/* Vertical brick course (right) */}
      <g opacity="0.9">
        <rect x="58" y="56" width="4" height="10" fill="currentColor" stroke="currentColor"
              strokeWidth="0.8" rx="0.3" opacity="0.7"/>
        <rect x="58" y="56" width="4" height="10" fill="url(#brick-texture)"/>
      </g>

      {/* Diagonal bricks */}
      <g>
        <rect x="64" y="62" width="3" height="10" fill="currentColor" stroke="currentColor"
              strokeWidth="0.8" rx="0.3" opacity="0.85"
              transform="rotate(35 65.5 67)"/>
        <rect x="64" y="62" width="3" height="10" fill="url(#brick-texture)"
              transform="rotate(35 65.5 67)"/>
      </g>

      {/* Vertical brick course */}
      <g opacity="0.9">
        <rect x="68" y="66" width="4" height="12" fill="currentColor" stroke="currentColor"
              strokeWidth="0.8" rx="0.3" opacity="0.7"/>
        <rect x="68" y="66" width="4" height="12" fill="url(#brick-texture)"/>
      </g>

      {/* Diagonal bricks */}
      <g>
        <rect x="73" y="72" width="3" height="10" fill="currentColor" stroke="currentColor"
              strokeWidth="0.8" rx="0.3" opacity="0.85"
              transform="rotate(35 74.5 77)"/>
        <rect x="73" y="72" width="3" height="10" fill="url(#brick-texture)"
              transform="rotate(35 74.5 77)"/>
      </g>

      {/* Vertical brick course (bottom right) */}
      <g opacity="0.9">
        <rect x="78" y="76" width="4" height="12" fill="currentColor" stroke="currentColor"
              strokeWidth="0.8" rx="0.3" opacity="0.7"/>
        <rect x="78" y="76" width="4" height="12" fill="url(#brick-texture)"/>
      </g>
    </g>

    {/* ANNOTATION: Force arrows showing load transfer */}
    <g opacity="0.6" strokeWidth="1.2" fill="none">
      {/* Left diagonal force */}
      <path d="M 24 74 L 28 70" stroke="currentColor" markerEnd="url(#arrowhead)" opacity="0.5"/>
      {/* Right diagonal force */}
      <path d="M 76 74 L 72 70" stroke="currentColor" markerEnd="url(#arrowhead)" opacity="0.5"/>

      {/* Arrowhead marker */}
      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="currentColor" />
        </marker>
      </defs>
    </g>

    {/* Label: "Fish Spine" pattern */}
    <text x="50" y="96" textAnchor="middle" fontSize="3" opacity="0.5" fill="currentColor" fontWeight="600">
      SPINA DI PESCE
    </text>
  </svg>
)

// PERSPECTIVE VIEW - Shows 3D arrangement on dome surface
const HerringbonePerspectiveView = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Dome surface with perspective */}
    <g strokeDasharray="3 2" opacity="0.3">
      {/* Dome meridian ribs */}
      <path d="M 30 95 Q 35 50, 40 15" strokeWidth="0.8" fill="none" />
      <path d="M 50 95 Q 50 50, 50 10" strokeWidth="1" fill="none" />
      <path d="M 70 95 Q 65 50, 60 15" strokeWidth="0.8" fill="none" />

      {/* Horizontal rings */}
      <ellipse cx="50" cy="75" rx="30" ry="8" strokeWidth="0.6" fill="none"/>
      <ellipse cx="50" cy="55" rx="24" ry="6" strokeWidth="0.6" fill="none"/>
      <ellipse cx="50" cy="35" rx="16" ry="4" strokeWidth="0.6" fill="none"/>
    </g>

    {/* PRIMARY: Herringbone spiral around dome */}
    <g filter={showHalo ? "url(#herringbone-halo)" : undefined}>
      {/* Lower ring - larger bricks */}
      <g opacity="0.85">
        {/* Vertical bricks around circumference */}
        <rect x="28" y="70" width="3" height="9" fill="currentColor" stroke="currentColor" strokeWidth="0.6" rx="0.2"/>
        <rect x="38" y="71" width="3" height="9" fill="currentColor" stroke="currentColor" strokeWidth="0.6" rx="0.2"/>
        <rect x="48" y="72" width="3" height="9" fill="currentColor" stroke="currentColor" strokeWidth="0.6" rx="0.2"/>
        <rect x="58" y="71" width="3" height="9" fill="currentColor" stroke="currentColor" strokeWidth="0.6" rx="0.2"/>
        <rect x="68" y="70" width="3" height="9" fill="currentColor" stroke="currentColor" strokeWidth="0.6" rx="0.2"/>

        {/* Diagonal bricks between */}
        <rect x="33" y="68" width="2.5" height="7" fill="currentColor" stroke="currentColor"
              strokeWidth="0.5" rx="0.2" opacity="0.9" transform="rotate(-25 34.25 71.5)"/>
        <rect x="43" y="69" width="2.5" height="7" fill="currentColor" stroke="currentColor"
              strokeWidth="0.5" rx="0.2" opacity="0.9" transform="rotate(25 44.25 72.5)"/>
        <rect x="53" y="69" width="2.5" height="7" fill="currentColor" stroke="currentColor"
              strokeWidth="0.5" rx="0.2" opacity="0.9" transform="rotate(-25 54.25 72.5)"/>
        <rect x="63" y="68" width="2.5" height="7" fill="currentColor" stroke="currentColor"
              strokeWidth="0.5" rx="0.2" opacity="0.9" transform="rotate(25 64.25 71.5)"/>
      </g>

      {/* Middle ring - medium bricks */}
      <g opacity="0.75">
        <rect x="32" y="51" width="2.5" height="7" fill="currentColor" stroke="currentColor" strokeWidth="0.6" rx="0.2"/>
        <rect x="42" y="52" width="2.5" height="7" fill="currentColor" stroke="currentColor" strokeWidth="0.6" rx="0.2"/>
        <rect x="52" y="52" width="2.5" height="7" fill="currentColor" stroke="currentColor" strokeWidth="0.6" rx="0.2"/>
        <rect x="62" y="51" width="2.5" height="7" fill="currentColor" stroke="currentColor" strokeWidth="0.6" rx="0.2"/>

        {/* Diagonal bricks */}
        <rect x="37" y="49" width="2" height="6" fill="currentColor" stroke="currentColor"
              strokeWidth="0.5" rx="0.2" opacity="0.9" transform="rotate(-25 38 52)"/>
        <rect x="47" y="50" width="2" height="6" fill="currentColor" stroke="currentColor"
              strokeWidth="0.5" rx="0.2" opacity="0.9" transform="rotate(25 48 53)"/>
        <rect x="57" y="49" width="2" height="6" fill="currentColor" stroke="currentColor"
              strokeWidth="0.5" rx="0.2" opacity="0.9" transform="rotate(-25 58 52)"/>
      </g>

      {/* Upper ring - smaller bricks */}
      <g opacity="0.65">
        <rect x="38" y="32" width="2" height="5" fill="currentColor" stroke="currentColor" strokeWidth="0.5" rx="0.2"/>
        <rect x="46" y="33" width="2" height="5" fill="currentColor" stroke="currentColor" strokeWidth="0.5" rx="0.2"/>
        <rect x="54" y="32" width="2" height="5" fill="currentColor" stroke="currentColor" strokeWidth="0.5" rx="0.2"/>

        {/* Tiny diagonal bricks */}
        <rect x="42" y="31" width="1.5" height="4" fill="currentColor" stroke="currentColor"
              strokeWidth="0.4" rx="0.2" opacity="0.85" transform="rotate(-20 42.75 33)"/>
        <rect x="50" y="31" width="1.5" height="4" fill="currentColor" stroke="currentColor"
              strokeWidth="0.4" rx="0.2" opacity="0.85" transform="rotate(20 50.75 33)"/>
      </g>
    </g>

    {/* Label */}
    <text x="50" y="96" textAnchor="middle" fontSize="3" opacity="0.5" fill="currentColor" fontWeight="600">
      SPIRAL CONSTRUCTION
    </text>
  </svg>
)

// DETAIL VIEW - Close-up of interlocking mechanism
const HerringboneDetailView = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* Grid reference */}
    <g strokeDasharray="2 2" opacity="0.2">
      <line x1="0" y1="50" x2="100" y2="50" strokeWidth="0.4"/>
      <line x1="50" y1="0" x2="50" y2="100" strokeWidth="0.4"/>
    </g>

    {/* PRIMARY: Detailed interlocking bricks */}
    <g filter={showHalo ? "url(#herringbone-halo)" : undefined}>
      {/* Bottom vertical brick */}
      <g>
        <rect x="20" y="60" width="12" height="30" fill="currentColor" stroke="currentColor"
              strokeWidth="1.5" rx="0.5" opacity="0.7"/>
        <rect x="20" y="60" width="12" height="30" fill="url(#brick-texture)"/>
        {/* Brick detail lines */}
        <line x1="22" y1="75" x2="30" y2="75" stroke="currentColor" strokeWidth="0.3" opacity="0.3"/>
      </g>

      {/* Left diagonal brick - KEY ELEMENT */}
      <g>
        <rect x="28" y="48" width="10" height="26" fill="currentColor" stroke="currentColor"
              strokeWidth="1.8" rx="0.5" opacity="0.95"
              transform="rotate(-40 33 61)"/>
        <rect x="28" y="48" width="10" height="26" fill="url(#brick-texture)"
              transform="rotate(-40 33 61)"/>

        {/* Emphasis glow on diagonal */}
        <rect x="28" y="48" width="10" height="26" fill="none" stroke="currentColor"
              strokeWidth="0.5" rx="0.5" opacity="0.4"
              transform="rotate(-40 33 61)"/>
      </g>

      {/* Center vertical brick */}
      <g>
        <rect x="40" y="35" width="12" height="30" fill="currentColor" stroke="currentColor"
              strokeWidth="1.5" rx="0.5" opacity="0.7"/>
        <rect x="40" y="35" width="12" height="30" fill="url(#brick-texture)"/>
        <line x1="42" y1="50" x2="50" y2="50" stroke="currentColor" strokeWidth="0.3" opacity="0.3"/>
      </g>

      {/* Right diagonal brick */}
      <g>
        <rect x="62" y="48" width="10" height="26" fill="currentColor" stroke="currentColor"
              strokeWidth="1.8" rx="0.5" opacity="0.95"
              transform="rotate(40 67 61)"/>
        <rect x="62" y="48" width="10" height="26" fill="url(#brick-texture)"
              transform="rotate(40 67 61)"/>

        {/* Emphasis glow */}
        <rect x="62" y="48" width="10" height="26" fill="none" stroke="currentColor"
              strokeWidth="0.5" rx="0.5" opacity="0.4"
              transform="rotate(40 67 61)"/>
      </g>

      {/* Top vertical brick */}
      <g>
        <rect x="68" y="60" width="12" height="30" fill="currentColor" stroke="currentColor"
              strokeWidth="1.5" rx="0.5" opacity="0.7"/>
        <rect x="68" y="60" width="12" height="30" fill="url(#brick-texture)"/>
        <line x1="70" y1="75" x2="78" y2="75" stroke="currentColor" strokeWidth="0.3" opacity="0.3"/>
      </g>
    </g>

    {/* ANNOTATION: Force transfer arrows */}
    <g opacity="0.7">
      {/* Vertical load on center brick */}
      <path d="M 46 30 L 46 38" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrowhead-detail)"/>
      <text x="48" y="28" fontSize="3" fill="currentColor" opacity="0.6">WEIGHT</text>

      {/* Diagonal force transfer */}
      <path d="M 35 58 L 42 52" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#arrowhead-detail)" strokeDasharray="2 1"/>
      <path d="M 65 58 L 58 52" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#arrowhead-detail)" strokeDasharray="2 1"/>

      <text x="15" y="55" fontSize="2.5" fill="currentColor" opacity="0.6">TRANSFER</text>
      <text x="72" y="55" fontSize="2.5" fill="currentColor" opacity="0.6">TO RIBS</text>

      {/* Arrowhead */}
      <defs>
        <marker id="arrowhead-detail" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="currentColor" />
        </marker>
      </defs>
    </g>

    {/* Label */}
    <text x="50" y="96" textAnchor="middle" fontSize="3" opacity="0.5" fill="currentColor" fontWeight="600">
      INTERLOCKING MECHANISM
    </text>
  </svg>
)

// Export all views
export const HerringboneSectionSVG = HerringboneSectionView
export const HerringbonePerspectiveSVG = HerringbonePerspectiveView
export const HerringboneDetailSVG = HerringboneDetailView
