'use client'

import React from 'react'

// Reusable HaloFilter for golden glow effect
const HaloFilter = ({ id, intensity = 1 }: { id: string; intensity?: number }) => (
  <defs>
    <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation={3 * intensity} result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values={`1 0 0 0 0.3
                0 0.8 0 0 0.2
                0 0 0.2 0 0
                0 0 0 ${0.6 * intensity} 0`}
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
// 1. ARCHITRAVE
// Classical decorative molded frame surrounding a door opening
// Reference: Greek Revival, Georgian, and Federal period architecture
// ============================================================================
const ArchitraveSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="architrave-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#architrave-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Wall structure */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 8 L5 92 L95 92 L95 8 Z" />
        <path d="M8 12 L8 88 L92 88 L92 12" />
        <path d="M10 40 L14 40 M86 40 L90 40" />
        <path d="M10 60 L14 60 M86 60 L90 60" />
      </g>

      {/* PRIMARY: Architrave frame with moldings */}
      <g strokeWidth="0.8">
        {/* Outer architrave frame */}
        <path d="M15 10 L15 90 L85 90 L85 10" />
        {/* Middle molding layer */}
        <path d="M18 13 L18 87 L82 87 L82 13" />
        {/* Inner molding layer */}
        <path d="M22 16 L22 84 L78 84 L78 16" />
        {/* Door opening */}
        <path d="M28 22 L28 84 L72 84 L72 22" />
        {/* Architrave profile details - decorative moldings */}
        <path d="M15 10 Q50 5, 85 10" />
        <path d="M18 13 Q50 9, 82 13" />
        {/* Plinth blocks at base */}
        <path d="M15 82 L15 90 L28 90 L28 82" />
        <path d="M72 82 L72 90 L85 90 L85 82" />
        {/* Molding detail lines */}
        <path d="M16.5 15 L16.5 85" strokeWidth="0.4" />
        <path d="M20 18 L20 82" strokeWidth="0.4" />
        <path d="M83.5 15 L83.5 85" strokeWidth="0.4" />
        <path d="M80 18 L80 82" strokeWidth="0.4" />
        {/* Head piece decoration */}
        <path d="M25 18 L35 14 L65 14 L75 18" />
        {/* Corner rosettes */}
        <circle cx="22" cy="18" r="3" />
        <circle cx="78" cy="18" r="3" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 2. DOOR KNOCKER
// Decorative mechanical striking device for announcing visitors
// Reference: Victorian lion head, Georgian ring, and colonial knockers
// ============================================================================
const DoorKnockerSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="knocker-halo" intensity={1} />}
    <g filter={showHalo ? "url(#knocker-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Door panel and wall */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M10 8 L10 92 L90 92 L90 8 Z" />
        <path d="M20 10 L20 90 L80 90 L80 10 Z" />
        <path d="M25 35 L25 65 L35 65 L35 35" />
      </g>

      {/* PRIMARY: Lion head knocker assembly */}
      <g strokeWidth="0.8">
        {/* Backplate - decorative lion head style */}
        <ellipse cx="50" cy="40" rx="18" ry="20" />
        {/* Lion mane suggestion */}
        <path d="M32 35 Q28 30, 32 25 Q38 20, 50 18 Q62 20, 68 25 Q72 30, 68 35" />
        <path d="M35 28 Q40 22, 50 20 Q60 22, 65 28" />
        {/* Lion face features */}
        <circle cx="43" cy="35" r="3" />
        <circle cx="57" cy="35" r="3" />
        <path d="M50 40 L48 45 L52 45 Z" />
        <path d="M44 50 Q50 55, 56 50" />
        {/* Ring holder (from lion's mouth) */}
        <ellipse cx="50" cy="52" rx="4" ry="3" />
        {/* The knocker ring */}
        <ellipse cx="50" cy="70" rx="12" ry="14" strokeWidth="2.5" />
        <ellipse cx="50" cy="70" rx="8" ry="10" strokeWidth="0.5" />
        {/* Ring connection detail */}
        <path d="M46 55 L46 58 L54 58 L54 55" />
        {/* Strike plate */}
        <ellipse cx="50" cy="85" rx="8" ry="3" />
        {/* Mounting screws */}
        <circle cx="35" cy="40" r="1.5" />
        <circle cx="65" cy="40" r="1.5" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 3. DUTCH DOOR
// Horizontally divided door allowing independent upper/lower operation
// Reference: Colonial American, farmhouse, and stable architecture
// ============================================================================
const DutchDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="dutch-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#dutch-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Wall frame and floor */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 5 L5 95 L95 95 L95 5" />
        <path d="M8 8 L8 92 L17 92 L17 8" />
        <path d="M83 8 L83 92 L92 92 L92 8" />
        <path d="M5 90 L95 90 L95 95 L5 95 Z" />
      </g>

      {/* PRIMARY: Dutch door with split sections */}
      <g strokeWidth="0.8">
        {/* Door frame */}
        <path d="M18 8 L18 92 L82 92 L82 8 Z" />
        {/* Upper half (open, angled) */}
        <path d="M20 10 L20 48 L50 52 L80 48 L80 10 Z" />
        {/* Upper half - angled perspective showing it's open */}
        <path d="M20 48 L10 45 L10 8 L20 10" />
        {/* Upper half panels */}
        <path d="M25 15 L25 25 L45 25 L45 15 Z" />
        <path d="M55 15 L55 25 L75 25 L75 15 Z" />
        <path d="M25 30 L25 43 L45 45 L45 30 Z" />
        <path d="M55 30 L55 43 L75 45 L75 30 Z" />
        {/* Horizontal split rail (emphasized) */}
        <path d="M18 48 L82 48" strokeWidth="2" />
        <path d="M18 52 L82 52" strokeWidth="2" />
        {/* Shelf on lower door */}
        <path d="M20 48 L80 48 L82 52 L18 52 Z" opacity="0.3" />
        {/* Lower half (closed) */}
        <path d="M20 54 L20 90 L80 90 L80 54 Z" />
        {/* Lower half panels */}
        <path d="M25 58 L25 72 L45 72 L45 58 Z" />
        <path d="M55 58 L55 72 L75 72 L75 58 Z" />
        <path d="M25 76 L25 86 L45 86 L45 76 Z" />
        <path d="M55 76 L55 86 L75 86 L75 76 Z" />
        {/* Hinges */}
        <circle cx="20" cy="20" r="2" />
        <circle cx="20" cy="40" r="2" />
        <circle cx="20" cy="65" r="2" />
        <circle cx="20" cy="82" r="2" />
        {/* Handle on lower */}
        <path d="M72 72 L76 72 L76 68" strokeWidth="1.2" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 4. LINTEL
// Horizontal structural beam spanning above door opening
// Reference: Stone masonry, brick, and timber construction methods
// ============================================================================
const LintelSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="lintel-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#lintel-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Wall masonry and structure */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Wall masonry above */}
        <path d="M5 10 L95 10 L95 30 L5 30 Z" />
        <path d="M5 20 L95 20" />
        <path d="M25 10 L25 20" />
        <path d="M50 10 L50 20" />
        <path d="M75 10 L75 20" />
        <path d="M12 20 L12 30" />
        <path d="M38 20 L38 30" />
        <path d="M62 20 L62 30" />
        <path d="M88 20 L88 30" />
        {/* Wall on sides */}
        <path d="M5 30 L5 92 L18 92 L18 30" />
        <path d="M82 30 L82 92 L95 92 L95 30" />
        {/* Masonry pattern on sides */}
        <path d="M5 50 L18 50" />
        <path d="M5 70 L18 70" />
        <path d="M82 50 L95 50" />
        <path d="M82 70 L95 70" />
        {/* Door opening */}
        <path d="M28 42 L28 92 L72 92 L72 42" />
      </g>

      {/* PRIMARY: The lintel beam and jambs */}
      <g strokeWidth="0.8">
        {/* THE LINTEL (emphasized stone beam) */}
        <path d="M12 30 L88 30 L88 42 L12 42 Z" strokeWidth="1.5" />
        {/* Lintel stone texture */}
        <path d="M15 34 L20 38" opacity="0.4" />
        <path d="M45 33 L50 37" opacity="0.4" />
        <path d="M70 35 L75 39" opacity="0.4" />
        {/* Door jambs */}
        <path d="M18 42 L18 92 L28 92 L28 42" />
        <path d="M72 42 L72 92 L82 92 L82 42" />
        {/* Load distribution lines above lintel */}
        <path d="M30 30 L50 25 L70 30" strokeDasharray="2,2" opacity="0.5" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 5. PANELED DOOR
// Door with raised or recessed decorative panels
// Reference: Six-panel Colonial, Georgian, and Victorian designs
// ============================================================================
const PaneledDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="paneled-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#paneled-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Wall frame and floor */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M8 5 L8 95 L92 95 L92 5" />
        <path d="M12 8 L12 92 L19 92 L19 8" />
        <path d="M81 8 L81 92 L88 92 L88 8" />
        <path d="M19 88 L81 88 L81 95 L19 95 Z" />
      </g>

      {/* PRIMARY: Paneled door with decorative panels */}
      <g strokeWidth="0.8">
        {/* Door frame */}
        <path d="M20 8 L20 92 L80 92 L80 8 Z" />
        {/* Inner door */}
        <path d="M23 11 L23 89 L77 89 L77 11 Z" />
        {/* Top panels row */}
        <path d="M28 16 L28 30 L48 30 L48 16 Z" />
        <path d="M52 16 L52 30 L72 30 L72 16 Z" />
        {/* Upper panel detail - raised effect */}
        <path d="M30 18 L30 28 L46 28 L46 18" strokeWidth="0.5" />
        <path d="M54 18 L54 28 L70 28 L70 18" strokeWidth="0.5" />
        {/* Middle panels row */}
        <path d="M28 35 L28 55 L48 55 L48 35 Z" />
        <path d="M52 35 L52 55 L72 55 L72 35 Z" />
        <path d="M30 37 L30 53 L46 53 L46 37" strokeWidth="0.5" />
        <path d="M54 37 L54 53 L70 53 L70 37" strokeWidth="0.5" />
        {/* Bottom panels row (taller) */}
        <path d="M28 60 L28 84 L48 84 L48 60 Z" />
        <path d="M52 60 L52 84 L72 84 L72 60 Z" />
        <path d="M30 62 L30 82 L46 82 L46 62" strokeWidth="0.5" />
        <path d="M54 62 L54 82 L70 82 L70 62" strokeWidth="0.5" />
        {/* Stiles and rails */}
        <path d="M50 11 L50 89" strokeWidth="1" />
        <path d="M23 32 L77 32" strokeWidth="0.6" />
        <path d="M23 57 L77 57" strokeWidth="0.6" />
        {/* Door handle */}
        <ellipse cx="70" cy="50" rx="2" ry="3" />
        <path d="M68 47 L68 53" />
        {/* Hinges */}
        <path d="M23 25 L20 25 L20 20 L23 20" />
        <path d="M23 75 L20 75 L20 70 L23 70" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 6. PEDIMENT DOOR
// Door with classical triangular or curved decorative top
// Reference: Greek Revival, Palladian, and Federal architecture
// ============================================================================
const PedimentDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pediment-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#pediment-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Wall and foundation */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 5 L5 95 L95 95 L95 5" />
        <path d="M8 35 L8 92 L14 92 L14 35" />
        <path d="M86 35 L86 92 L92 92 L92 35" />
        <path d="M8 88 L92 88 L92 95 L8 95 Z" />
      </g>

      {/* PRIMARY: Pediment and entrance */}
      <g strokeWidth="0.8">
        {/* Triangular pediment */}
        <path d="M15 30 L50 8 L85 30 Z" />
        <path d="M20 28 L50 12 L80 28" />
        {/* Tympanum (inner triangle) decoration */}
        <circle cx="50" cy="22" r="5" />
        <path d="M45 22 L50 17 L55 22 L50 27 Z" opacity="0.5" />
        {/* Cornice line */}
        <path d="M12 30 L88 30" strokeWidth="1.5" />
        <path d="M10 33 L90 33" strokeWidth="0.5" />
        {/* Pilasters */}
        <path d="M15 33 L15 92 L25 92 L25 33" />
        <path d="M75 33 L75 92 L85 92 L85 33" />
        {/* Pilaster fluting */}
        <path d="M18 35 L18 90" strokeWidth="0.4" />
        <path d="M20 35 L20 90" strokeWidth="0.4" />
        <path d="M22 35 L22 90" strokeWidth="0.4" />
        <path d="M78 35 L78 90" strokeWidth="0.4" />
        <path d="M80 35 L80 90" strokeWidth="0.4" />
        <path d="M82 35 L82 90" strokeWidth="0.4" />
        {/* Capitals */}
        <path d="M13 33 L13 37 L27 37 L27 33" />
        <path d="M73 33 L73 37 L87 37 L87 33" />
        {/* Door frame */}
        <path d="M28 38 L28 90 L72 90 L72 38 Z" />
        {/* Door panels */}
        <path d="M32 42 L32 62 L48 62 L48 42 Z" />
        <path d="M52 42 L52 62 L68 62 L68 42 Z" />
        <path d="M32 66 L32 86 L48 86 L48 66 Z" />
        <path d="M52 66 L52 86 L68 86 L68 66 Z" />
        {/* Door knob */}
        <circle cx="65" cy="65" r="2" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 7. POCKET DOOR
// Door that slides horizontally into wall cavity
// Reference: Victorian, Edwardian, and modern space-saving designs
// ============================================================================
const PocketDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pocket-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#pocket-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Wall sections and cavity */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Wall sections */}
        <path d="M5 15 L5 85 L35 85 L35 15" />
        <path d="M65 15 L65 85 L95 85 L95 15" />
        {/* Wall pocket cavity (shown with dashed lines) */}
        <path d="M8 20 L8 80 L32 80 L32 20" />
        {/* Floor */}
        <path d="M5 82 L95 82 L95 88 L5 88 Z" />
      </g>

      {/* PRIMARY: Sliding door and track system */}
      <g strokeWidth="0.8">
        {/* Door opening */}
        <path d="M35 15 L35 85 L65 85 L65 15" />
        {/* The sliding door (partially recessed) */}
        <path d="M20 18 L20 82 L55 82 L55 18 Z" />
        {/* Door panels */}
        <path d="M24 22 L24 48 L36 48 L36 22 Z" />
        <path d="M40 22 L40 48 L51 48 L51 22 Z" />
        <path d="M24 52 L24 78 L36 78 L36 52 Z" />
        <path d="M40 52 L40 78 L51 78 L51 52 Z" />
        {/* Track at top */}
        <path d="M8 15 L65 15" strokeWidth="1.5" />
        <path d="M8 12 L65 12" strokeWidth="0.5" />
        {/* Roller mechanism */}
        <circle cx="25" cy="15" r="2" />
        <circle cx="50" cy="15" r="2" />
        {/* Recessed pull handle */}
        <path d="M52 45 L54 45 L54 55 L52 55" />
        <path d="M52.5 47 L52.5 53" strokeWidth="1.5" />
        {/* Floor track */}
        <path d="M8 85 L65 85" strokeWidth="1" />
        {/* Arrow showing sliding direction */}
        <path d="M70 50 L80 50 M77 47 L80 50 L77 53" strokeDasharray="2,2" opacity="0.5" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 8. PORTAL
// Grand monumental entrance with arched opening
// Reference: Romanesque, Gothic, and Renaissance monumental doorways
// ============================================================================
const PortalSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="portal-halo" intensity={1.1} />}
    <g filter={showHalo ? "url(#portal-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Building facade */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M2 5 L2 95 L98 95 L98 5" />
        <path d="M2 20 L7 20 M93 20 L98 20" />
        <path d="M2 50 L7 50 M93 50 L98 50" />
        <path d="M2 70 L7 70 M93 70 L98 70" />
        <path d="M2 90 L98 90 L98 95 L2 95 Z" />
      </g>

      {/* PRIMARY: Portal archway and door */}
      <g strokeWidth="0.8">
        {/* Outer archway */}
        <path d="M8 92 L8 35 Q50 2, 92 35 L92 92" />
        {/* Middle arch ring */}
        <path d="M15 92 L15 38 Q50 10, 85 38 L85 92" />
        {/* Inner arch ring */}
        <path d="M22 92 L22 42 Q50 18, 78 42 L78 92" />
        {/* Archivolts (decorative bands) */}
        <path d="M11 40 Q50 6, 89 40" strokeWidth="0.5" />
        <path d="M18 42 Q50 14, 82 42" strokeWidth="0.5" />
        {/* Jamb columns */}
        <path d="M8 40 L8 92 L15 92 L15 40" />
        <path d="M85 40 L85 92 L92 92 L92 40" />
        {/* Column details */}
        <path d="M10 45 L10 88" strokeWidth="0.4" />
        <path d="M12 45 L12 88" strokeWidth="0.4" />
        <path d="M88 45 L88 88" strokeWidth="0.4" />
        <path d="M90 45 L90 88" strokeWidth="0.4" />
        {/* Tympanum */}
        <path d="M25 50 Q50 25, 75 50" />
        {/* Door within portal */}
        <path d="M30 50 L30 90 L70 90 L70 50 Z" />
        {/* Door panels */}
        <path d="M33 54 L33 70 L48 70 L48 54 Z" />
        <path d="M52 54 L52 70 L67 70 L67 54 Z" />
        <path d="M33 74 L33 86 L48 86 L48 74 Z" />
        <path d="M52 74 L52 86 L67 86 L67 74 Z" />
        {/* Keystone */}
        <path d="M46 12 L50 6 L54 12 L52 18 L48 18 Z" />
        {/* Capitals */}
        <path d="M8 38 L15 38 L17 42 L6 42 Z" />
        <path d="M85 38 L92 38 L94 42 L83 42 Z" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 9. REVOLVING DOOR
// Rotating cylindrical door with multiple wing panels
// Reference: Commercial building entrances, Art Deco lobbies
// ============================================================================
const RevolvingDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="revolving-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#revolving-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Building entrance walls */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Entrance wall - left */}
        <path d="M5 30 L5 70 L15 70 L15 30 Z" />
        <path d="M2 25 L2 75 L5 75 L5 25" />
        {/* Exit wall - right */}
        <path d="M85 30 L85 70 L95 70 L95 30 Z" />
        <path d="M95 25 L95 75 L98 75 L98 25" />
        {/* Floor pattern */}
        <ellipse cx="50" cy="88" rx="38" ry="5" />
      </g>

      {/* PRIMARY: Revolving door mechanism */}
      <g strokeWidth="0.8">
        {/* Circular enclosure */}
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="33" strokeWidth="0.5" />
        {/* Entrance opening - left */}
        <path d="M10 35 L15 35 L15 65 L10 65" />
        {/* Exit opening - right */}
        <path d="M85 35 L90 35 L90 65 L85 65" />
        {/* Central pivot */}
        <circle cx="50" cy="50" r="5" />
        <circle cx="50" cy="50" r="3" strokeWidth="0.5" />
        {/* Four door wings (rotated 45 degrees for movement indication) */}
        <path d="M50 50 L75 25" strokeWidth="1.2" />
        <path d="M50 50 L75 75" strokeWidth="1.2" />
        <path d="M50 50 L25 75" strokeWidth="1.2" />
        <path d="M50 50 L25 25" strokeWidth="1.2" />
        {/* Glass panels on wings */}
        <path d="M52 48 L70 30 L73 33 L55 51" opacity="0.5" />
        <path d="M52 52 L70 70 L73 67 L55 49" opacity="0.5" />
        <path d="M48 52 L30 70 L27 67 L45 49" opacity="0.5" />
        <path d="M48 48 L30 30 L27 33 L45 51" opacity="0.5" />
        {/* Speed control ring */}
        <circle cx="50" cy="50" r="8" strokeDasharray="2,2" opacity="0.4" />
        {/* Rotation arrow */}
        <path d="M60 15 Q75 20, 78 35" strokeDasharray="2,2" />
        <path d="M76 30 L78 35 L73 35" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 10. TRANSOM DOOR
// Door with horizontal window panel above for light and ventilation
// Reference: Victorian, Edwardian, and commercial architecture
// ============================================================================
const TransomDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="transom-door-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#transom-door-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Wall frame */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M8 5 L8 95 L92 95 L92 5" />
        <path d="M10 8 L10 92 L17 92 L17 8" />
        <path d="M83 8 L83 92 L90 92 L90 8" />
        <path d="M10 88 L90 88 L90 95 L10 95 Z" />
      </g>

      {/* PRIMARY: Transom and door assembly */}
      <g strokeWidth="0.8">
        {/* Overall frame */}
        <path d="M18 8 L18 92 L82 92 L82 8 Z" />
        {/* Transom bar (dividing window from door) */}
        <path d="M18 30 L82 30" strokeWidth="2" />
        <path d="M18 28 L82 28" strokeWidth="0.5" />
        <path d="M18 32 L82 32" strokeWidth="0.5" />
        {/* Transom window */}
        <path d="M22 12 L22 26 L78 26 L78 12 Z" />
        {/* Fanlight pattern in transom */}
        <path d="M50 26 L50 12" />
        <path d="M50 26 L30 12" />
        <path d="M50 26 L70 12" />
        <path d="M50 26 L22 18" />
        <path d="M50 26 L78 18" />
        {/* Decorative semicircle suggestion */}
        <path d="M25 26 Q50 5, 75 26" strokeDasharray="2,2" opacity="0.4" />
        {/* Door below transom */}
        <path d="M22 35 L22 88 L78 88 L78 35 Z" />
        {/* Door panels */}
        <path d="M27 40 L27 58 L48 58 L48 40 Z" />
        <path d="M52 40 L52 58 L73 58 L73 40 Z" />
        <path d="M27 63 L27 83 L48 83 L48 63 Z" />
        <path d="M52 63 L52 83 L73 83 L73 63 Z" />
        {/* Panel details */}
        <path d="M29 42 L29 56 L46 56 L46 42" strokeWidth="0.4" />
        <path d="M54 42 L54 56 L71 56 L71 42" strokeWidth="0.4" />
        <path d="M29 65 L29 81 L46 81 L46 65" strokeWidth="0.4" />
        <path d="M54 65 L54 81 L71 81 L71 65" strokeWidth="0.4" />
        {/* Door hardware */}
        <circle cx="70" cy="62" r="2" />
        <path d="M72 60 L74 58" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 11. TYMPANUM
// Decorative semicircular or triangular area above door in arch
// Reference: Romanesque, Gothic cathedral portals
// ============================================================================
const TympanumSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="tympanum-halo" intensity={1} />}
    <g filter={showHalo ? "url(#tympanum-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Church/cathedral facade */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M2 5 L2 95 L98 95 L98 5" />
        <path d="M5 10 L5 90 L9 90 L9 10" />
        <path d="M91 10 L91 90 L95 90 L95 10" />
        <path d="M5 88 L95 88 L95 95 L5 95 Z" />
      </g>

      {/* PRIMARY: Tympanum and portal */}
      <g strokeWidth="0.8">
        {/* Pointed arch frame (Gothic style) */}
        <path d="M10 90 L10 45 Q50 5, 90 45 L90 90" />
        {/* Inner arch */}
        <path d="M15 88 L15 48 Q50 12, 85 48 L85 88" />
        {/* Tympanum area (the decorative panel) */}
        <path d="M20 50 Q50 18, 80 50 L80 50 L20 50" />
        {/* Sculptural relief in tympanum - Christ in Majesty */}
        <ellipse cx="50" cy="38" rx="12" ry="15" />
        <circle cx="50" cy="32" r="5" />
        <path d="M50 37 L50 48" />
        <path d="M42 42 L58 42" />
        {/* Mandorla around figure */}
        <ellipse cx="50" cy="38" rx="15" ry="18" strokeDasharray="2,2" opacity="0.5" />
        {/* Lintel below tympanum */}
        <path d="M15 50 L85 50" strokeWidth="1.5" />
        <path d="M15 53 L85 53" strokeWidth="0.5" />
        {/* Door below */}
        <path d="M25 55 L25 88 L75 88 L75 55 Z" />
        {/* Double doors */}
        <path d="M50 55 L50 88" />
        {/* Door panels - left */}
        <path d="M28 58 L28 70 L47 70 L47 58 Z" />
        <path d="M28 74 L28 85 L47 85 L47 74 Z" />
        {/* Door panels - right */}
        <path d="M53 58 L53 70 L72 70 L72 58 Z" />
        <path d="M53 74 L53 85 L72 85 L72 74 Z" />
        {/* Archivolts */}
        <path d="M12 47 Q50 8, 88 47" strokeWidth="0.5" />
        {/* Side figures suggestion */}
        <path d="M22 42 L22 48" />
        <path d="M78 42 L78 48" />
      </g>
    </g>
  </svg>
)

// Export mapping for all door elements
export const DOOR_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'architrave': ArchitraveSVG,
  'door-knocker': DoorKnockerSVG,
  'dutch-door': DutchDoorSVG,
  'lintel': LintelSVG,
  'paneled-door': PaneledDoorSVG,
  'pediment-door': PedimentDoorSVG,
  'pocket-door': PocketDoorSVG,
  'portal': PortalSVG,
  'revolving-door': RevolvingDoorSVG,
  'transom-door': TransomDoorSVG,
  'tympanum': TympanumSVG,
}

export {
  ArchitraveSVG,
  DoorKnockerSVG,
  DutchDoorSVG,
  LintelSVG,
  PaneledDoorSVG,
  PedimentDoorSVG,
  PocketDoorSVG,
  PortalSVG,
  RevolvingDoorSVG,
  TransomDoorSVG,
  TympanumSVG,
}
