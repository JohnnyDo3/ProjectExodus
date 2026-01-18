'use client'

import React from 'react'

/**
 * Material Patterns Library for Architectural Elements
 *
 * Provides SVG pattern definitions for realistic material rendering:
 * - Wood grain (for timber framing, beams, rafters, joists)
 * - Stone textures (for columns, arches, rustication, ashlar)
 * - Brick patterns (for walls, chimneys, coursing)
 * - Metal finishes (for railings, gates, ironwork)
 * - Plaster/stucco (for decorative elements, ceilings)
 *
 * Usage: Include <MaterialPatterns /> in SVG defs, then reference via fill="url(#pattern-id)"
 */

export const MaterialPatterns: React.FC = () => (
  <defs>
    {/* ========== WOOD GRAIN PATTERNS ========== */}

    {/* Fine wood grain for detailed timber elements */}
    <pattern id="wood-grain-fine" x="0" y="0" width="20" height="40" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.15">
        <path d="M0 5 Q5 8, 10 5 T20 5" strokeWidth="0.3" />
        <path d="M0 12 Q6 10, 12 12 T20 12" strokeWidth="0.25" />
        <path d="M0 18 Q4 20, 8 18 T20 18" strokeWidth="0.3" />
        <path d="M0 25 Q7 23, 14 25 T20 25" strokeWidth="0.25" />
        <path d="M0 32 Q5 35, 10 32 T20 32" strokeWidth="0.3" />
        {/* Knots */}
        <circle cx="8" cy="15" r="1.5" strokeWidth="0.4" opacity="0.3" />
      </g>
    </pattern>

    {/* Bold wood grain for heavy timber beams */}
    <pattern id="wood-grain-bold" x="0" y="0" width="25" height="50" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.2">
        <path d="M0 8 Q8 5, 16 8 T25 8" strokeWidth="0.5" />
        <path d="M0 18 Q10 15, 20 18 T25 18" strokeWidth="0.6" />
        <path d="M0 28 Q6 31, 12 28 T25 28" strokeWidth="0.5" />
        <path d="M0 38 Q12 35, 24 38" strokeWidth="0.6" />
        {/* Larger knot */}
        <ellipse cx="12" cy="23" rx="2.5" ry="3" strokeWidth="0.5" opacity="0.4" />
      </g>
    </pattern>

    {/* Weathered wood for outdoor/old structures */}
    <pattern id="wood-weathered" x="0" y="0" width="30" height="60" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.18">
        <path d="M0 10 Q10 7, 20 10 T30 10" strokeWidth="0.4" strokeDasharray="3 1" />
        <path d="M0 22 Q8 25, 16 22 T30 22" strokeWidth="0.5" />
        <path d="M0 35 Q12 32, 24 35" strokeWidth="0.45" strokeDasharray="2 1.5" />
        <path d="M0 48 Q15 45, 30 48" strokeWidth="0.4" />
        {/* Cracks and splits */}
        <path d="M5 5 L5 15" strokeWidth="0.3" opacity="0.5" />
        <path d="M22 28 L22 40" strokeWidth="0.3" opacity="0.5" />
      </g>
    </pattern>

    {/* ========== STONE TEXTURES ========== */}

    {/* Smooth cut stone (ashlar) */}
    <pattern id="stone-smooth" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.12">
        {/* Subtle natural variation */}
        <path d="M5 8 L12 10" strokeWidth="0.3" />
        <path d="M20 15 L28 14" strokeWidth="0.25" />
        <path d="M8 25 L15 27" strokeWidth="0.3" />
        <path d="M25 30 L33 32" strokeWidth="0.25" />
        {/* Chisel marks */}
        <path d="M10 5 L12 5" strokeWidth="0.2" opacity="0.6" />
        <path d="M30 18 L32 18" strokeWidth="0.2" opacity="0.6" />
      </g>
    </pattern>

    {/* Rough stone (rusticated/rubble) */}
    <pattern id="stone-rough" x="0" y="0" width="35" height="35" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.18">
        {/* Irregular surface texture */}
        <path d="M3 5 L8 7 L6 10" strokeWidth="0.4" />
        <path d="M15 8 L20 10 L18 13" strokeWidth="0.4" />
        <path d="M25 12 L30 14" strokeWidth="0.35" />
        <path d="M5 18 L10 20 L8 23" strokeWidth="0.4" />
        <path d="M20 22 L25 24" strokeWidth="0.35" />
        <path d="M10 28 L15 30 L13 33" strokeWidth="0.4" />
        {/* Pitting and natural irregularities */}
        <circle cx="12" cy="15" r="0.8" strokeWidth="0.3" />
        <circle cx="28" cy="8" r="0.6" strokeWidth="0.3" />
        <circle cx="8" cy="32" r="0.7" strokeWidth="0.3" />
      </g>
    </pattern>

    {/* Weathered stone */}
    <pattern id="stone-weathered" x="0" y="0" width="45" height="45" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.15">
        {/* Erosion patterns */}
        <path d="M5 10 Q10 8, 15 10" strokeWidth="0.35" strokeDasharray="2 1" />
        <path d="M20 15 Q25 13, 30 15" strokeWidth="0.4" />
        <path d="M8 25 Q15 23, 22 25" strokeWidth="0.35" strokeDasharray="1.5 1" />
        <path d="M25 32 Q32 30, 39 32" strokeWidth="0.4" />
        {/* Lichen/moss growth */}
        <circle cx="12" cy="18" r="1.5" strokeWidth="0.25" opacity="0.4" strokeDasharray="1 0.5" />
        <circle cx="35" cy="28" r="1.2" strokeWidth="0.25" opacity="0.4" strokeDasharray="1 0.5" />
      </g>
    </pattern>

    {/* ========== BRICK PATTERNS ========== */}

    {/* Standard running bond brick */}
    <pattern id="brick-running" x="0" y="0" width="60" height="30" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.2">
        {/* Horizontal mortar joints */}
        <path d="M0 15 L60 15" strokeWidth="0.8" />
        <path d="M0 30 L60 30" strokeWidth="0.8" />
        {/* Vertical joints (staggered) */}
        <path d="M30 0 L30 15" strokeWidth="0.8" />
        <path d="M0 15 L0 30" strokeWidth="0.8" />
        <path d="M60 15 L60 30" strokeWidth="0.8" />
        {/* Brick texture */}
        <path d="M5 7 L10 8" strokeWidth="0.25" opacity="0.5" />
        <path d="M20 9 L25 8" strokeWidth="0.25" opacity="0.5" />
        <path d="M8 22 L13 23" strokeWidth="0.25" opacity="0.5" />
        <path d="M38 23 L43 22" strokeWidth="0.25" opacity="0.5" />
      </g>
    </pattern>

    {/* Flemish bond brick */}
    <pattern id="brick-flemish" x="0" y="0" width="70" height="35" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.2">
        {/* Complex pattern mixing headers and stretchers */}
        <path d="M0 17.5 L70 17.5" strokeWidth="0.8" />
        <path d="M0 35 L70 35" strokeWidth="0.8" />
        {/* Headers (short ends) */}
        <path d="M15 0 L15 17.5" strokeWidth="0.8" />
        <path d="M45 0 L45 17.5" strokeWidth="0.8" />
        {/* Stretchers */}
        <path d="M30 17.5 L30 35" strokeWidth="0.8" />
        <path d="M60 17.5 L60 35" strokeWidth="0.8" />
      </g>
    </pattern>

    {/* Old/weathered brick */}
    <pattern id="brick-weathered" x="0" y="0" width="65" height="32" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.18">
        {/* Irregular mortar joints */}
        <path d="M0 16 Q10 15, 20 16 T65 16" strokeWidth="0.9" strokeDasharray="3 1" />
        <path d="M0 32 Q15 31, 30 32 T65 32" strokeWidth="0.9" strokeDasharray="3 1" />
        {/* Worn brick faces */}
        <path d="M8 8 L13 9" strokeWidth="0.3" opacity="0.6" />
        <path d="M25 10 L30 9" strokeWidth="0.3" opacity="0.6" />
        <path d="M40 7 L45 8" strokeWidth="0.3" opacity="0.6" />
        {/* Spalling/damage */}
        <circle cx="20" cy="24" r="1" strokeWidth="0.3" opacity="0.5" />
        <circle cx="50" cy="25" r="0.8" strokeWidth="0.3" opacity="0.5" />
      </g>
    </pattern>

    {/* ========== METAL FINISHES ========== */}

    {/* Wrought iron texture */}
    <pattern id="metal-wrought" x="0" y="0" width="15" height="30" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.12">
        {/* Hammered texture */}
        <path d="M3 5 L5 7" strokeWidth="0.25" />
        <path d="M8 3 L10 5" strokeWidth="0.25" />
        <path d="M4 12 L6 14" strokeWidth="0.25" />
        <path d="M10 11 L12 13" strokeWidth="0.25" />
        <path d="M2 20 L4 22" strokeWidth="0.25" />
        <path d="M9 19 L11 21" strokeWidth="0.25" />
        <path d="M5 27 L7 29" strokeWidth="0.25" />
      </g>
    </pattern>

    {/* Cast iron texture */}
    <pattern id="metal-cast" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.1">
        {/* Mold marks and surface texture */}
        <path d="M5 0 L5 25" strokeWidth="0.2" opacity="0.6" />
        <path d="M15 0 L15 25" strokeWidth="0.2" opacity="0.6" />
        {/* Casting bubbles */}
        <circle cx="8" cy="8" r="0.6" strokeWidth="0.2" />
        <circle cx="18" cy="14" r="0.5" strokeWidth="0.2" />
        <circle cx="10" cy="20" r="0.7" strokeWidth="0.2" />
      </g>
    </pattern>

    {/* Steel/modern metal */}
    <pattern id="metal-steel" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.08">
        {/* Clean industrial texture */}
        <path d="M0 10 L40 10" strokeWidth="0.15" />
        <path d="M0 20 L40 20" strokeWidth="0.15" />
        <path d="M0 30 L40 30" strokeWidth="0.15" />
        {/* Welding marks */}
        <path d="M15 5 L18 7" strokeWidth="0.2" opacity="0.7" />
        <path d="M28 25 L31 27" strokeWidth="0.2" opacity="0.7" />
      </g>
    </pattern>

    {/* Weathered/rusted metal */}
    <pattern id="metal-rusted" x="0" y="0" width="35" height="35" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.16">
        {/* Corrosion patterns */}
        <path d="M5 8 Q10 6, 15 8" strokeWidth="0.3" strokeDasharray="2 1" />
        <path d="M18 15 Q24 13, 30 15" strokeWidth="0.35" strokeDasharray="1.5 1" />
        <path d="M8 22 Q15 20, 22 22" strokeWidth="0.3" strokeDasharray="2 1" />
        {/* Rust pitting */}
        <circle cx="12" cy="12" r="0.8" strokeWidth="0.25" opacity="0.6" />
        <circle cx="25" cy="9" r="0.6" strokeWidth="0.25" opacity="0.6" />
        <circle cx="15" cy="28" r="0.7" strokeWidth="0.25" opacity="0.6" />
        <circle cx="28" cy="25" r="0.9" strokeWidth="0.25" opacity="0.6" />
      </g>
    </pattern>

    {/* ========== PLASTER/STUCCO TEXTURES ========== */}

    {/* Smooth plaster */}
    <pattern id="plaster-smooth" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.08">
        {/* Very subtle texture */}
        <path d="M10 15 L15 17" strokeWidth="0.2" />
        <path d="M30 20 L35 22" strokeWidth="0.2" />
        <path d="M15 35 L20 37" strokeWidth="0.2" />
        <path d="M35 40 L40 42" strokeWidth="0.2" />
      </g>
    </pattern>

    {/* Textured stucco */}
    <pattern id="plaster-textured" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.14">
        {/* Trowel marks and texture */}
        <path d="M3 5 L8 7 L6 10" strokeWidth="0.3" />
        <path d="M15 4 L20 6 L18 9" strokeWidth="0.3" />
        <path d="M25 8 L28 10" strokeWidth="0.25" />
        <path d="M5 15 L10 17 L8 20" strokeWidth="0.3" />
        <path d="M18 14 L23 16" strokeWidth="0.25" />
        <path d="M8 23 L13 25 L11 28" strokeWidth="0.3" />
        <path d="M22 22 L27 24" strokeWidth="0.25" />
      </g>
    </pattern>

    {/* Weathered/cracked plaster */}
    <pattern id="plaster-weathered" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.15">
        {/* Cracks */}
        <path d="M5 10 Q8 15, 5 20" strokeWidth="0.25" strokeDasharray="3 1.5" />
        <path d="M20 5 Q22 12, 25 18" strokeWidth="0.3" strokeDasharray="2 1" />
        <path d="M30 15 Q32 22, 30 28" strokeWidth="0.25" strokeDasharray="3 1.5" />
        {/* Fallen pieces */}
        <path d="M12 25 L15 28" strokeWidth="0.35" />
        <path d="M28 32 L32 35" strokeWidth="0.35" />
      </g>
    </pattern>

    {/* ========== MARBLE/POLISHED STONE ========== */}

    {/* Marble veining */}
    <pattern id="marble-veined" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.12">
        {/* Organic veining patterns */}
        <path d="M5 10 Q20 15, 35 10 T60 15" strokeWidth="0.4" />
        <path d="M0 25 Q15 28, 30 25 T55 28" strokeWidth="0.35" />
        <path d="M8 40 Q25 43, 42 40 T60 43" strokeWidth="0.4" />
        {/* Secondary veins */}
        <path d="M15 8 Q18 12, 20 8" strokeWidth="0.2" opacity="0.6" />
        <path d="M35 23 Q38 27, 40 23" strokeWidth="0.2" opacity="0.6" />
        <path d="M25 38 Q28 42, 30 38" strokeWidth="0.2" opacity="0.6" />
      </g>
    </pattern>

    {/* Polished granite */}
    <pattern id="granite-polished" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.1">
        {/* Mineral crystals */}
        <circle cx="4" cy="5" r="0.5" strokeWidth="0.2" />
        <circle cx="12" cy="3" r="0.4" strokeWidth="0.2" />
        <circle cx="15" cy="9" r="0.6" strokeWidth="0.2" />
        <circle cx="6" cy="13" r="0.5" strokeWidth="0.2" />
        <circle cx="16" cy="16" r="0.4" strokeWidth="0.2" />
        <circle cx="8" cy="18" r="0.5" strokeWidth="0.2" />
      </g>
    </pattern>

    {/* ========== CONCRETE/MODERN MATERIALS ========== */}

    {/* Smooth concrete */}
    <pattern id="concrete-smooth" x="0" y="0" width="55" height="55" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.1">
        {/* Form marks */}
        <path d="M0 15 L55 15" strokeWidth="0.2" />
        <path d="M0 35 L55 35" strokeWidth="0.2" />
        {/* Subtle aggregate */}
        <circle cx="12" cy="8" r="0.4" strokeWidth="0.15" />
        <circle cx="32" cy="11" r="0.5" strokeWidth="0.15" />
        <circle cx="18" cy="25" r="0.4" strokeWidth="0.15" />
        <circle cx="42" cy="28" r="0.5" strokeWidth="0.15" />
        <circle cx="25" cy="45" r="0.4" strokeWidth="0.15" />
      </g>
    </pattern>

    {/* Board-formed concrete */}
    <pattern id="concrete-board-formed" x="0" y="0" width="45" height="90" patternUnits="userSpaceOnUse">
      <g stroke="currentColor" fill="none" opacity="0.15">
        {/* Horizontal board joints */}
        <path d="M0 45 L45 45" strokeWidth="0.4" />
        <path d="M0 90 L45 90" strokeWidth="0.4" />
        {/* Wood grain impression */}
        <path d="M5 10 Q15 8, 25 10 T45 10" strokeWidth="0.2" opacity="0.5" />
        <path d="M0 22 Q10 20, 20 22 T45 22" strokeWidth="0.2" opacity="0.5" />
        <path d="M8 35 Q18 33, 28 35 T45 35" strokeWidth="0.2" opacity="0.5" />
        {/* Formwork impressions */}
        <path d="M5 55 Q15 53, 25 55 T45 55" strokeWidth="0.2" opacity="0.5" />
        <path d="M0 70 Q10 68, 20 70 T45 70" strokeWidth="0.2" opacity="0.5" />
        <path d="M8 82 Q18 80, 28 82 T45 82" strokeWidth="0.2" opacity="0.5" />
      </g>
    </pattern>
  </defs>
)

/**
 * Helper function to add material pattern to an element
 * Returns the pattern ID based on material type and finish
 */
export function getMaterialPattern(material: MaterialType, finish: MaterialFinish = 'standard'): string {
  const patterns: Record<MaterialType, Record<MaterialFinish, string>> = {
    wood: {
      standard: 'wood-grain-fine',
      bold: 'wood-grain-bold',
      weathered: 'wood-weathered',
    },
    stone: {
      standard: 'stone-smooth',
      bold: 'stone-rough',
      weathered: 'stone-weathered',
    },
    brick: {
      standard: 'brick-running',
      bold: 'brick-flemish',
      weathered: 'brick-weathered',
    },
    metal: {
      standard: 'metal-wrought',
      bold: 'metal-cast',
      weathered: 'metal-rusted',
    },
    plaster: {
      standard: 'plaster-smooth',
      bold: 'plaster-textured',
      weathered: 'plaster-weathered',
    },
    marble: {
      standard: 'marble-veined',
      bold: 'marble-veined',
      weathered: 'marble-veined',
    },
    granite: {
      standard: 'granite-polished',
      bold: 'granite-polished',
      weathered: 'granite-polished',
    },
    concrete: {
      standard: 'concrete-smooth',
      bold: 'concrete-board-formed',
      weathered: 'concrete-smooth',
    },
    steel: {
      standard: 'metal-steel',
      bold: 'metal-steel',
      weathered: 'metal-rusted',
    },
  }

  return patterns[material]?.[finish] || 'none'
}

export type MaterialType =
  | 'wood'
  | 'stone'
  | 'brick'
  | 'metal'
  | 'plaster'
  | 'marble'
  | 'granite'
  | 'concrete'
  | 'steel'

export type MaterialFinish = 'standard' | 'bold' | 'weathered'
