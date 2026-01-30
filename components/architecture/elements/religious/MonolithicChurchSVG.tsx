'use client'

import React from 'react'

const HaloFilter = () => (
  <defs>
    <filter id="monolithic-halo" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
      <feColorMatrix in="blur" type="matrix"
        values="0.9 0 0 0 0.5  0 0.9 0 0 0.2  0 0 0.9 0 0.1  0 0 0 0.8 0" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* Stone texture pattern */}
    <pattern id="rock-texture" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
      <rect width="12" height="12" fill="currentColor" opacity="0.03"/>
      <circle cx="3" cy="3" r="0.5" fill="currentColor" opacity="0.1"/>
      <circle cx="8" cy="7" r="0.4" fill="currentColor" opacity="0.08"/>
      <path d="M 1 8 Q 4 6, 6 9" stroke="currentColor" strokeWidth="0.3" opacity="0.06" fill="none"/>
    </pattern>

    {/* Excavation/removed rock texture */}
    <pattern id="excavated-texture" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
      <path d="M 0 0 L 8 8 M 8 0 L 0 8" stroke="currentColor" strokeWidth="0.2" opacity="0.15"/>
    </pattern>
  </defs>
)

interface SVGProps {
  showHalo?: boolean
  viewType?: 'section' | 'aerial' | 'process'
}

// ============================================================================
// MONOLITHIC CHURCH - Carved from single piece of living rock
// Reference: Lalibela, Ethiopia (12th-13th century, Zagwe Dynasty)
// Biete Ghiorgis (Church of St. George) - Greek cross plan
// ============================================================================

export const MonolithicChurchSVG = ({ showHalo = false, viewType = 'section' }: SVGProps) => {
  if (viewType === 'aerial') {
    return <MonolithicAerialView showHalo={showHalo} />
  } else if (viewType === 'process') {
    return <MonolithicProcessView showHalo={showHalo} />
  }
  return <MonolithicSectionView showHalo={showHalo} />
}

// SECTION VIEW - Shows top-down excavation revealing church
const MonolithicSectionView = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Original ground level and surrounding rock */}
    <g opacity="0.3">
      {/* Original rock surface before excavation */}
      <line x1="0" y1="20" x2="100" y2="20" strokeWidth="0.8" strokeDasharray="4 2"/>
      <text x="2" y="18" fontSize="2.5" opacity="0.7" fill="currentColor">ORIGINAL SURFACE</text>

      {/* Parent rock mass */}
      <rect x="0" y="20" width="15" height="75" fill="currentColor" opacity="0.08"/>
      <rect x="85" y="20" width="15" height="75" fill="currentColor" opacity="0.08"/>
      <rect x="0" y="20" width="15" height="75" fill="url(#rock-texture)"/>
      <rect x="85" y="20" width="15" height="75" fill="url(#rock-texture)"/>
    </g>

    {/* PRIMARY: EXCAVATION TRENCH - The void carved around church */}
    <g opacity="0.85">
      {/* Left trench wall */}
      <path d="M 15 20 L 15 95 L 20 95" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      {/* Right trench wall */}
      <path d="M 85 20 L 85 95 L 80 95" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      {/* Trench floor */}
      <line x1="20" y1="95" x2="80" y2="95" stroke="currentColor" strokeWidth="0.8"/>

      {/* Excavated area shading */}
      <rect x="15" y="20" width="70" height="75" fill="currentColor" opacity="0.05"/>
      <rect x="15" y="20" width="70" height="75" fill="url(#excavated-texture)"/>

      {/* Trench depth markers */}
      <g opacity="0.4" strokeDasharray="1 1">
        <line x1="12" y1="40" x2="18" y2="40" strokeWidth="0.4"/>
        <line x1="12" y1="60" x2="18" y2="60" strokeWidth="0.4"/>
        <line x1="12" y1="80" x2="18" y2="80" strokeWidth="0.4"/>
        <text x="8" y="61" fontSize="2" transform="rotate(-90 8 61)">12m DEEP</text>
      </g>
    </g>

    {/* THE MONOLITHIC CHURCH - Single continuous rock mass */}
    <g filter={showHalo ? "url(#monolithic-halo)" : undefined}>
      {/* TRIPLE-STEPPED PLATFORM (base) */}
      <g opacity="0.75">
        {/* Bottom step */}
        <rect x="28" y="88" width="44" height="4" fill="currentColor" stroke="currentColor"
              strokeWidth="0.8" rx="0.3" opacity="0.6"/>
        <rect x="28" y="88" width="44" height="4" fill="url(#rock-texture)"/>

        {/* Middle step */}
        <rect x="32" y="84" width="36" height="4" fill="currentColor" stroke="currentColor"
              strokeWidth="0.8" rx="0.3" opacity="0.7"/>
        <rect x="32" y="84" width="36" height="4" fill="url(#rock-texture)"/>

        {/* Top step */}
        <rect x="36" y="80" width="28" height="4" fill="currentColor" stroke="currentColor"
              strokeWidth="0.8" rx="0.3" opacity="0.8"/>
        <rect x="36" y="80" width="28" height="4" fill="url(#rock-texture)"/>
      </g>

      {/* CHURCH BODY - Greek cross form */}
      <g>
        {/* Main vertical section */}
        <rect x="40" y="45" width="20" height="35" fill="currentColor" stroke="currentColor"
              strokeWidth="1.5" rx="0.5" opacity="0.85"/>
        <rect x="40" y="45" width="20" height="35" fill="url(#rock-texture)"/>

        {/* Horizontal arms of cross (left) */}
        <rect x="30" y="55" width="10" height="15" fill="currentColor" stroke="currentColor"
              strokeWidth="1.2" rx="0.3" opacity="0.8"/>
        <rect x="30" y="55" width="10" height="15" fill="url(#rock-texture)"/>

        {/* Horizontal arms of cross (right) */}
        <rect x="60" y="55" width="10" height="15" fill="currentColor" stroke="currentColor"
              strokeWidth="1.2" rx="0.3" opacity="0.8"/>
        <rect x="60" y="55" width="10" height="15" fill="url(#rock-texture)"/>

        {/* Roof - Greek cross top */}
        <rect x="44" y="40" width="12" height="5" fill="currentColor" stroke="currentColor"
              strokeWidth="1.2" rx="0.4" opacity="0.9"/>
        <rect x="44" y="40" width="12" height="5" fill="url(#rock-texture)"/>

        {/* Cross carved on roof */}
        <g opacity="0.6" strokeWidth="0.8">
          <line x1="50" y1="41" x2="50" y2="44" stroke="currentColor"/>
          <line x1="48" y1="42.5" x2="52" y2="42.5" stroke="currentColor"/>
        </g>
      </g>

      {/* CARVED FACADE DETAILS - Simulating constructed architecture */}
      <g opacity="0.5" strokeWidth="0.4">
        {/* Window openings */}
        <rect x="43" y="52" width="3" height="5" fill="none" stroke="currentColor" rx="0.5"/>
        <rect x="54" y="52" width="3" height="5" fill="none" stroke="currentColor" rx="0.5"/>

        {/* Door */}
        <rect x="46.5" y="72" width="7" height="8" fill="none" stroke="currentColor" rx="0.3" strokeWidth="0.6"/>

        {/* Decorative horizontal bands (carved detail) */}
        <line x1="40" y1="50" x2="60" y2="50" stroke="currentColor" strokeWidth="0.3"/>
        <line x1="40" y1="65" x2="60" y2="65" stroke="currentColor" strokeWidth="0.3"/>
      </g>
    </g>

    {/* ANNOTATION: Continuous rock connection */}
    <g opacity="0.6">
      {/* Dashed lines showing rock continuity */}
      <path d="M 45 45 Q 35 30, 15 25" stroke="currentColor" strokeWidth="0.8"
            strokeDasharray="2 2" fill="none" markerEnd="url(#arrow-rock)"/>
      <path d="M 55 45 Q 65 30, 85 25" stroke="currentColor" strokeWidth="0.8"
            strokeDasharray="2 2" fill="none" markerEnd="url(#arrow-rock)"/>

      <text x="15" y="13" fontSize="2.5" opacity="0.7">SAME CONTINUOUS ROCK</text>

      <defs>
        <marker id="arrow-rock" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="currentColor" />
        </marker>
      </defs>
    </g>

    {/* Label */}
    <text x="50" y="98" textAnchor="middle" fontSize="3" opacity="0.5" fill="currentColor" fontWeight="600">
      SUBTRACTIVE ARCHITECTURE
    </text>
  </svg>
)

// AERIAL VIEW - Looking down at Greek cross plan
const MonolithicAerialView = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Excavation pit perimeter - trapezoidal */}
    <g strokeDasharray="3 2" opacity="0.35">
      {/* Outer excavation trench boundary */}
      <rect x="10" y="10" width="80" height="80" fill="currentColor" opacity="0.05" rx="1"/>
      <rect x="10" y="10" width="80" height="80" fill="url(#excavated-texture)" rx="1"/>
      <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="1.2"
            fill="none" rx="1"/>

      <text x="12" y="15" fontSize="2.5" opacity="0.7">EXCAVATION PIT: 25m × 25m</text>
    </g>

    {/* THE CHURCH - Greek cross plan (Biete Ghiorgis) */}
    <g filter={showHalo ? "url(#monolithic-halo)" : undefined}>
      {/* TRIPLE-STEPPED PLATFORM - concentric squares */}
      <g opacity="0.6">
        {/* Outer step */}
        <rect x="22" y="22" width="56" height="56" fill="currentColor" stroke="currentColor"
              strokeWidth="0.8" rx="0.5" opacity="0.5"/>
        <rect x="22" y="22" width="56" height="56" fill="url(#rock-texture)"/>

        {/* Middle step */}
        <rect x="28" y="28" width="44" height="44" fill="currentColor" stroke="currentColor"
              strokeWidth="0.9" rx="0.5" opacity="0.6"/>
        <rect x="28" y="28" width="44" height="44" fill="url(#rock-texture)"/>

        {/* Inner step */}
        <rect x="34" y="34" width="32" height="32" fill="currentColor" stroke="currentColor"
              strokeWidth="1" rx="0.5" opacity="0.7"/>
        <rect x="34" y="34" width="32" height="32" fill="url(#rock-texture)"/>
      </g>

      {/* GREEK CROSS - perfectly symmetrical */}
      <g>
        {/* Center square */}
        <rect x="44" y="44" width="12" height="12" fill="currentColor" stroke="currentColor"
              strokeWidth="1.8" rx="0.4" opacity="0.95"/>
        <rect x="44" y="44" width="12" height="12" fill="url(#rock-texture)"/>

        {/* North arm */}
        <rect x="47" y="36" width="6" height="8" fill="currentColor" stroke="currentColor"
              strokeWidth="1.5" rx="0.3" opacity="0.9"/>
        <rect x="47" y="36" width="6" height="8" fill="url(#rock-texture)"/>

        {/* South arm */}
        <rect x="47" y="56" width="6" height="8" fill="currentColor" stroke="currentColor"
              strokeWidth="1.5" rx="0.3" opacity="0.9"/>
        <rect x="47" y="56" width="6" height="8" fill="url(#rock-texture)"/>

        {/* West arm */}
        <rect x="36" y="47" width="8" height="6" fill="currentColor" stroke="currentColor"
              strokeWidth="1.5" rx="0.3" opacity="0.9"/>
        <rect x="36" y="47" width="8" height="6" fill="url(#rock-texture)"/>

        {/* East arm */}
        <rect x="56" y="47" width="8" height="6" fill="currentColor" stroke="currentColor"
              strokeWidth="1.5" rx="0.3" opacity="0.9"/>
        <rect x="56" y="47" width="8" height="6" fill="url(#rock-texture)"/>

        {/* THREE GREEK CROSSES carved on roof (iconic detail) */}
        <g opacity="0.7" strokeWidth="0.8">
          {/* Center cross */}
          <line x1="50" y1="46" x2="50" y2="54" stroke="currentColor"/>
          <line x1="46" y1="50" x2="54" y2="50" stroke="currentColor"/>

          {/* Left cross */}
          <line x1="40" y1="47" x2="40" y2="53" stroke="currentColor" strokeWidth="0.6"/>
          <line x1="37" y1="50" x2="43" y2="50" stroke="currentColor" strokeWidth="0.6"/>

          {/* Right cross */}
          <line x1="60" y1="47" x2="60" y2="53" stroke="currentColor" strokeWidth="0.6"/>
          <line x1="57" y1="50" x2="63" y2="50" stroke="currentColor" strokeWidth="0.6"/>
        </g>

        {/* Interior columns indicated */}
        <g opacity="0.4">
          <circle cx="47" cy="47" r="0.8" fill="currentColor"/>
          <circle cx="53" cy="47" r="0.8" fill="currentColor"/>
          <circle cx="47" cy="53" r="0.8" fill="currentColor"/>
          <circle cx="53" cy="53" r="0.8" fill="currentColor"/>
        </g>
      </g>
    </g>

    {/* ANNOTATION: Perfect symmetry indicators */}
    <g opacity="0.5" strokeDasharray="1 1">
      {/* Center lines */}
      <line x1="50" y1="20" x2="50" y2="80" strokeWidth="0.5" stroke="currentColor"/>
      <line x1="20" y1="50" x2="80" y2="50" strokeWidth="0.5" stroke="currentColor"/>

      {/* Dimension markers */}
      <text x="51" y="34" fontSize="2" opacity="0.7">EQUILATERAL CROSS</text>
    </g>

    {/* Label */}
    <text x="50" y="96" textAnchor="middle" fontSize="3" opacity="0.5" fill="currentColor" fontWeight="600">
      BIETE GHIORGIS - PLAN VIEW
    </text>
  </svg>
)

// PROCESS VIEW - Shows top-down carving sequence
const MonolithicProcessView = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    <text x="50" y="8" textAnchor="middle" fontSize="3.5" fill="currentColor" opacity="0.7" fontWeight="700">
      EXCAVATION SEQUENCE
    </text>

    {/* STEP 1: Trace perimeter on rock surface */}
    <g>
      <rect x="5" y="15" width="20" height="20" fill="currentColor" opacity="0.1" rx="0.5"/>
      <rect x="5" y="15" width="20" height="20" fill="url(#rock-texture)" rx="0.5"/>

      {/* Outline being traced */}
      <rect x="10" y="20" width="10" height="10" fill="none" stroke="currentColor"
            strokeWidth="0.8" strokeDasharray="2 1" opacity="0.8"/>

      <text x="15" y="13" textAnchor="middle" fontSize="2" fontWeight="600">STEP 1</text>
      <text x="15" y="38" textAnchor="middle" fontSize="1.8" opacity="0.7">Trace outline</text>
    </g>

    {/* STEP 2: Dig trenches around perimeter */}
    <g>
      <rect x="30" y="15" width="20" height="20" fill="currentColor" opacity="0.1" rx="0.5"/>

      {/* Trenches carved */}
      <rect x="30" y="15" width="3" height="20" fill="url(#excavated-texture)" opacity="0.6"/>
      <rect x="47" y="15" width="3" height="20" fill="url(#excavated-texture)" opacity="0.6"/>

      {/* Rock mass in center */}
      <rect x="36" y="20" width="8" height="10" fill="currentColor" stroke="currentColor"
            strokeWidth="1" opacity="0.85"/>
      <rect x="36" y="20" width="8" height="10" fill="url(#rock-texture)"/>

      <text x="40" y="13" textAnchor="middle" fontSize="2" fontWeight="600">STEP 2</text>
      <text x="40" y="38" textAnchor="middle" fontSize="1.8" opacity="0.7">Isolate mass</text>
    </g>

    {/* STEP 3: Shape exterior */}
    <g>
      <rect x="55" y="15" width="20" height="20" fill="currentColor" opacity="0.05" rx="0.5"/>
      <rect x="55" y="15" width="20" height="20" fill="url(#excavated-texture)"/>

      {/* Church form emerging */}
      <g>
        <rect x="61" y="19" width="8" height="12" fill="currentColor" stroke="currentColor"
              strokeWidth="1.2" opacity="0.9"/>
        <rect x="61" y="19" width="8" height="12" fill="url(#rock-texture)"/>

        {/* Carved details */}
        <rect x="63" y="22" width="1.5" height="2.5" fill="none" stroke="currentColor" strokeWidth="0.3"/>
        <rect x="65.5" y="22" width="1.5" height="2.5" fill="none" stroke="currentColor" strokeWidth="0.3"/>
      </g>

      <text x="65" y="13" textAnchor="middle" fontSize="2" fontWeight="600">STEP 3</text>
      <text x="65" y="38" textAnchor="middle" fontSize="1.8" opacity="0.7">Carve exterior</text>
    </g>

    {/* STEP 4: Hollow interior */}
    <g>
      <rect x="80" y="15" width="20" height="20" fill="currentColor" opacity="0.05" rx="0.5"/>
      <rect x="80" y="15" width="20" height="20" fill="url(#excavated-texture)"/>

      {/* Church with hollow interior */}
      <g>
        <rect x="86" y="19" width="8" height="12" fill="currentColor" stroke="currentColor"
              strokeWidth="1.2" opacity="0.9"/>
        <rect x="86" y="19" width="8" height="12" fill="url(#rock-texture)"/>

        {/* Hollow interior shown */}
        <rect x="87.5" y="21" width="5" height="8" fill="none" stroke="currentColor"
              strokeWidth="0.8" opacity="0.6" strokeDasharray="1 1"/>

        {/* Windows */}
        <rect x="88" y="22" width="1.5" height="2.5" fill="currentColor" strokeWidth="0.3" opacity="0.3"/>
        <rect x="90.5" y="22" width="1.5" height="2.5" fill="currentColor" strokeWidth="0.3" opacity="0.3"/>

        {/* Columns inside */}
        <circle cx="88.5" cy="26" r="0.4" fill="currentColor" opacity="0.5"/>
        <circle cx="91.5" cy="26" r="0.4" fill="currentColor" opacity="0.5"/>
      </g>

      <text x="90" y="13" textAnchor="middle" fontSize="2" fontWeight="600">STEP 4</text>
      <text x="90" y="38" textAnchor="middle" fontSize="1.8" opacity="0.7">Hollow interior</text>
    </g>

    {/* FINAL RESULT - Large church in cross-section */}
    <g transform="translate(0, 45)">
      {/* Ground level */}
      <line x1="10" y1="10" x2="90" y2="10" stroke="currentColor" strokeWidth="0.6"
            strokeDasharray="3 2" opacity="0.4"/>
      <text x="50" y="8" textAnchor="middle" fontSize="2" opacity="0.6">ORIGINAL SURFACE</text>

      {/* Excavation pit */}
      <rect x="15" y="10" width="70" height="40" fill="currentColor" opacity="0.05"/>
      <rect x="15" y="10" width="70" height="40" fill="url(#excavated-texture)"/>
      <path d="M 15 10 L 15 50 L 20 50" stroke="currentColor" strokeWidth="1" fill="none"/>
      <path d="M 85 10 L 85 50 L 80 50" stroke="currentColor" strokeWidth="1" fill="none"/>

      {/* Final church */}
      <g filter={showHalo ? "url(#monolithic-halo)" : undefined}>
        {/* Platform */}
        <rect x="35" y="43" width="30" height="3" fill="currentColor" stroke="currentColor"
              strokeWidth="0.8" opacity="0.7"/>
        <rect x="35" y="43" width="30" height="3" fill="url(#rock-texture)"/>

        {/* Church body - Greek cross */}
        <rect x="43" y="20" width="14" height="23" fill="currentColor" stroke="currentColor"
              strokeWidth="1.5" opacity="0.9"/>
        <rect x="43" y="20" width="14" height="23" fill="url(#rock-texture)"/>

        {/* Cross arms */}
        <rect x="38" y="27" width="5" height="9" fill="currentColor" stroke="currentColor"
              strokeWidth="1" opacity="0.85"/>
        <rect x="38" y="27" width="5" height="9" fill="url(#rock-texture)"/>

        <rect x="57" y="27" width="5" height="9" fill="currentColor" stroke="currentColor"
              strokeWidth="1" opacity="0.85"/>
        <rect x="57" y="27" width="5" height="9" fill="url(#rock-texture)"/>

        {/* Roof cross */}
        <g opacity="0.6" strokeWidth="0.6">
          <line x1="50" y1="21" x2="50" y2="24" stroke="currentColor"/>
          <line x1="48.5" y1="22.5" x2="51.5" y2="22.5" stroke="currentColor"/>
        </g>

        {/* Windows and door */}
        <g opacity="0.4">
          <rect x="45.5" y="28" width="2" height="3" fill="none" stroke="currentColor" strokeWidth="0.4"/>
          <rect x="52.5" y="28" width="2" height="3" fill="none" stroke="currentColor" strokeWidth="0.4"/>
          <rect x="47.5" y="38" width="5" height="5" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        </g>
      </g>

      {/* Label */}
      <text x="50" y="48" textAnchor="middle" fontSize="2.5" fill="currentColor" opacity="0.8" fontWeight="600">
        NO MORTAR • NO SEAMS • SINGLE ROCK
      </text>
    </g>
  </svg>
)

// Export all views
export const MonolithicSectionSVG = MonolithicSectionView
export const MonolithicAerialSVG = MonolithicAerialView
export const MonolithicProcessSVG = MonolithicProcessView
