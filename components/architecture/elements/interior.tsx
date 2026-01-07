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

/**
 * ALCOVE - Recessed architectural niche within wall plane
 * Reference: Renaissance wall articulation, typically arched
 * Blueprint Convention: Wall = dashed context, alcove recess = solid primary
 */
const AlcoveSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="alcove-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#alcove-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Wall face */}
      <path d="M10 10 L10 90 L90 90 L90 10 Z" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />

      {/* PRIMARY: Alcove recess and architectural detail */}
      <g strokeWidth="1">
        {/* Alcove opening */}
        <path d="M25 25 L25 85 L75 85 L75 25 Q50 15, 25 25" />
        {/* Decorative arch */}
        <path d="M25 25 Q50 12, 75 25" strokeWidth="1.2" />
        {/* Depth of alcove */}
        <path d="M28 28 L28 82 L72 82 L72 28 Q50 20, 28 28" strokeWidth="0.8" />
        {/* Back wall of alcove */}
        <path d="M32 32 L32 78 L68 78 L68 32 Q50 25, 32 32" strokeWidth="0.6" opacity="0.6" />
        {/* Shelf in alcove */}
        <path d="M30 55 L70 55" />
        <path d="M32 56 L68 56" strokeWidth="0.5" />
        {/* Item on shelf suggestion */}
        <path d="M45 45 L45 55 L55 55 L55 45 Q50 42, 45 45" strokeWidth="0.6" opacity="0.5" />
        {/* Floor shadow */}
        <path d="M30 85 L70 85" strokeWidth="1.5" />
      </g>
    </g>
  </svg>
)

/**
 * CLOSET - Enclosed storage compartment with access doors
 * Reference: Residential storage planning, typical double-door configuration
 * Blueprint Convention: Adjacent room = dashed, closet enclosure = solid
 */
const ClosetSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="closet-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#closet-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Adjacent room wall */}
      <path d="M10 15 L90 15" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
      <path d="M10 15 L10 90" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
      <path d="M90 15 L90 90" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />

      {/* PRIMARY: Closet enclosure and doors */}
      <g strokeWidth="1">
        {/* Closet frame */}
        <path d="M20 15 L20 90 L80 90 L80 15" />
        {/* Double doors */}
        <path d="M22 18 L22 87 L49 87 L49 18 Z" />
        <path d="M51 18 L51 87 L78 87 L78 18 Z" />
        {/* Door panels */}
        <path d="M25 22 L25 42 L46 42 L46 22 Z" strokeWidth="0.6" />
        <path d="M25 46 L25 83 L46 83 L46 46 Z" strokeWidth="0.6" />
        <path d="M54 22 L54 42 L75 42 L75 22 Z" strokeWidth="0.6" />
        <path d="M54 46 L54 83 L75 83 L75 46 Z" strokeWidth="0.6" />
        {/* Door handles */}
        <path d="M44 52 L44 58" strokeWidth="1.5" />
        <path d="M56 52 L56 58" strokeWidth="1.5" />
        {/* Header/trim */}
        <path d="M18 15 L82 15 L82 18 L18 18 Z" strokeWidth="0.8" />
        {/* Floor threshold */}
        <path d="M20 90 L80 90" strokeWidth="1.5" />
      </g>
    </g>
  </svg>
)

/**
 * HALLWAY - Linear circulation corridor in perspective
 * Reference: Residential/institutional circulation planning
 * Blueprint Convention: Side rooms = dashed, corridor volume = solid
 */
const HallwaySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="hallway-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#hallway-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Doors to adjacent rooms */}
      <path d="M15 20 L15 80 L30 65 L30 35 Z" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
      <path d="M85 20 L85 80 L70 65 L70 35 Z" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />

      {/* PRIMARY: Hallway corridor in perspective */}
      <g strokeWidth="1">
        {/* Perspective hallway walls */}
        <path d="M10 10 L35 30 L35 70 L10 90" />
        <path d="M90 10 L65 30 L65 70 L90 90" />
        {/* Back wall */}
        <path d="M35 30 L65 30 L65 70 L35 70 Z" />
        {/* Floor */}
        <path d="M10 90 L90 90" strokeWidth="1.2" />
        <path d="M35 70 L65 70" />
        {/* Ceiling */}
        <path d="M10 10 L90 10" strokeWidth="1.2" />
        <path d="M35 30 L65 30" />
        {/* Floor pattern */}
        <path d="M25 90 L40 70" strokeDasharray="2 2" strokeWidth="0.6" opacity="0.5" />
        <path d="M50 90 L50 70" strokeDasharray="2 2" strokeWidth="0.6" opacity="0.5" />
        <path d="M75 90 L60 70" strokeDasharray="2 2" strokeWidth="0.6" opacity="0.5" />
        {/* Light fixture */}
        <path d="M50 25 L50 35" strokeWidth="0.8" />
        <ellipse cx="50" cy="37" rx="5" ry="2" strokeWidth="0.8" />
        {/* Baseboard */}
        <path d="M10 88 L35 68" strokeWidth="0.6" />
        <path d="M90 88 L65 68" strokeWidth="0.6" />
      </g>
    </g>
  </svg>
)

/**
 * LOBBY - Entrance reception hall with public amenities
 * Reference: Commercial/institutional entry planning
 * Blueprint Convention: Building shell = dashed, lobby interior = solid
 */
const LobbySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="lobby-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#lobby-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Building perimeter walls */}
      <path d="M10 15 L10 85" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
      <path d="M90 15 L90 85" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
      <path d="M10 85 L35 85" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
      <path d="M65 85 L90 85" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />

      {/* PRIMARY: Lobby space and furnishings */}
      <g strokeWidth="1">
        {/* Ceiling line */}
        <path d="M10 15 L90 15" strokeWidth="1.2" />
        {/* Entrance doors */}
        <path d="M35 85 L35 60 Q50 55, 65 60 L65 85" />
        <path d="M50 60 L50 85" />
        {/* Reception desk */}
        <path d="M60 40 L85 40 L85 55 L60 55 Z" />
        <path d="M62 42 L83 42 L83 53 L62 53 Z" strokeWidth="0.5" />
        {/* Seating area */}
        <path d="M15 45 L35 45 L35 55 L15 55 Z" strokeWidth="0.8" />
        <path d="M15 60 L35 60 L35 70 L15 70 Z" strokeWidth="0.8" />
        {/* Central feature - chandelier */}
        <path d="M45 25 L55 25" strokeWidth="0.8" />
        <path d="M42 28 L58 28" strokeWidth="0.8" />
        <path d="M44 28 L44 35" strokeWidth="0.6" />
        <path d="M50 25 L50 38" strokeWidth="0.8" />
        <path d="M56 28 L56 35" strokeWidth="0.6" />
        {/* Floor pattern - circular */}
        <circle cx="50" cy="60" r="15" strokeDasharray="3 3" strokeWidth="0.6" opacity="0.4" />
        {/* Columns */}
        <circle cx="25" cy="35" r="3" strokeWidth="1.2" />
        <circle cx="75" cy="35" r="3" strokeWidth="1.2" />
      </g>
    </g>
  </svg>
)

/**
 * MEZZANINE - Intermediate partial floor within double-height space
 * Reference: Industrial/retail loft planning, balcony overlook
 * Blueprint Convention: Outer walls = dashed, mezzanine structure = solid
 */
const MezzanineSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="mezzanine-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#mezzanine-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Main building envelope */}
      <path d="M10 10 L10 90 L90 90 L90 10" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
      {/* Double-height space indication */}
      <path d="M65 10 L65 40" strokeWidth="0.6" strokeDasharray="3 2" opacity="0.4" />

      {/* PRIMARY: Mezzanine platform and structure */}
      <g strokeWidth="1">
        {/* Mezzanine platform */}
        <path d="M10 45 L65 45 L65 50 L10 50" strokeWidth="1.5" />
        {/* Support columns */}
        <path d="M25 50 L25 90" strokeWidth="1.8" />
        <path d="M45 50 L45 90" strokeWidth="1.8" />
        <path d="M65 50 L65 90" strokeWidth="1.8" />
        {/* Railing on mezzanine */}
        <path d="M10 40 L65 40" />
        <path d="M65 40 L65 50" />
        {/* Balusters */}
        {[18, 30, 42, 54].map((x, i) => (
          <path key={i} d={`M${x} 40 L${x} 45`} strokeWidth="0.8" />
        ))}
        {/* Stairs up to mezzanine */}
        <path d="M70 90 L70 78 L80 78 L80 66 L90 66 L90 50" />
        <path d="M72 90 L72 80 L82 80 L82 68 L90 68" strokeWidth="0.5" />
        {/* Floor below */}
        <path d="M10 90 L90 90" strokeWidth="1.2" />
        {/* Ceiling */}
        <path d="M10 10 L90 10" strokeWidth="1.2" />
      </g>
    </g>
  </svg>
)

/**
 * NICHE - Decorative wall recess with arched conch, classical detail
 * Reference: Renaissance/Neoclassical wall articulation for statuary
 * Blueprint Convention: Wall plane = dashed, niche cavity = solid
 */
const NicheSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="niche-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#niche-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Wall surface */}
      <path d="M15 10 L15 90 L85 90 L85 10" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />

      {/* PRIMARY: Niche recess and decorative elements */}
      <g strokeWidth="1">
        {/* Decorative molding around niche */}
        <path d="M28 18 L28 82 L72 82 L72 18 Q50 6, 28 18" strokeWidth="1.5" />
        {/* Niche frame */}
        <path d="M30 20 L30 80 L70 80 L70 20 Q50 10, 30 20" />
        {/* Niche depth */}
        <path d="M33 23 L33 77 L67 77 L67 23 Q50 15, 33 23" strokeWidth="0.7" />
        {/* Shell-shaped conch (top) */}
        <path d="M35 28 Q50 18, 65 28" />
        <path d="M38 30 Q50 22, 62 30" strokeWidth="0.8" />
        {/* Radiating lines in conch */}
        <path d="M50 20 L50 35" strokeWidth="0.5" />
        <path d="M42 22 L45 35" strokeWidth="0.5" />
        <path d="M58 22 L55 35" strokeWidth="0.5" />
        {/* Pedestal/bracket */}
        <path d="M38 68 L62 68 L65 75 L35 75 Z" />
        <path d="M40 75 L60 75 L62 80 L38 80 Z" />
        {/* Statue/object in niche */}
        <path d="M45 45 Q50 40, 55 45 L55 68 L45 68 Z" strokeWidth="0.6" opacity="0.5" />
        <circle cx="50" cy="42" r="5" strokeWidth="0.6" opacity="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * PANTRY - Food storage room with shelving on both walls
 * Reference: Residential service/utility planning, butler's pantry
 * Blueprint Convention: Adjacent spaces = dashed, pantry enclosure = solid
 */
const PantrySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pantry-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#pantry-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Adjacent room/hallway */}
      <path d="M45 85 L45 90 L55 90 L55 85" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
      <path d="M10 15 L90 15" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />

      {/* PRIMARY: Pantry room and storage */}
      <g strokeWidth="1">
        {/* Room outline */}
        <path d="M15 15 L15 85 L85 85 L85 15 Z" />
        {/* Shelving - left wall */}
        <path d="M18 20 L18 80" strokeWidth="1.2" />
        <path d="M18 25 L35 25" />
        <path d="M18 40 L35 40" />
        <path d="M18 55 L35 55" />
        <path d="M18 70 L35 70" />
        {/* Shelving - right wall */}
        <path d="M82 20 L82 80" strokeWidth="1.2" />
        <path d="M65 25 L82 25" />
        <path d="M65 40 L82 40" />
        <path d="M65 55 L82 55" />
        <path d="M65 70 L82 70" />
        {/* Items on shelves */}
        <path d="M22 22 L22 25 L28 25 L28 22 Z" strokeWidth="0.6" opacity="0.5" />
        <path d="M20 35 L20 40 L24 40 L24 35 Z" strokeWidth="0.6" opacity="0.5" />
        <circle cx="30" cy="38" r="3" strokeWidth="0.6" opacity="0.5" />
        <path d="M70 22 L70 25 L76 25 L76 22 Z" strokeWidth="0.6" opacity="0.5" />
        <path d="M68 50 L68 55 L74 55 L74 50 Z" strokeWidth="0.6" opacity="0.5" />
        {/* Center counter/island */}
        <path d="M40 45 L60 45 L60 65 L40 65 Z" />
        <path d="M42 47 L58 47 L58 63 L42 63 Z" strokeWidth="0.5" />
        {/* Door opening */}
        <path d="M45 85 L45 75 L55 75 L55 85" />
        {/* Light fixture */}
        <circle cx="50" cy="25" r="5" strokeWidth="0.8" />
      </g>
    </g>
  </svg>
)

/**
 * VESTIBULE - Entry transition chamber between exterior and interior
 * Reference: Residential/institutional airlock planning, thermal buffer
 * Blueprint Convention: Building walls = dashed, vestibule zone = solid
 */
const VestibuleSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="vestibule-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#vestibule-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Building exterior/interior walls beyond */}
      <path d="M20 10 L80 10" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
      <path d="M20 90 L35 90" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
      <path d="M65 90 L80 90" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />

      {/* PRIMARY: Vestibule enclosure and features */}
      <g strokeWidth="1">
        {/* Vestibule walls */}
        <path d="M20 20 L20 80 L80 80 L80 20 Z" />
        {/* Exterior door (bottom) */}
        <path d="M35 80 L35 60 Q50 55, 65 60 L65 80" />
        <path d="M50 60 L50 80" />
        {/* Interior door (top) */}
        <path d="M35 20 L35 40 Q50 45, 65 40 L65 20" />
        <path d="M50 20 L50 40" />
        {/* Side benches/seating */}
        <path d="M22 45 L32 45 L32 55 L22 55 Z" strokeWidth="0.8" />
        <path d="M68 45 L78 45 L78 55 L68 55 Z" strokeWidth="0.8" />
        {/* Coat hooks */}
        <circle cx="25" cy="35" r="1.5" strokeWidth="0.8" />
        <circle cx="30" cy="35" r="1.5" strokeWidth="0.8" />
        <circle cx="70" cy="35" r="1.5" strokeWidth="0.8" />
        <circle cx="75" cy="35" r="1.5" strokeWidth="0.8" />
        {/* Floor mat */}
        <path d="M38 65 L62 65 L62 75 L38 75 Z" strokeDasharray="2 2" strokeWidth="0.6" opacity="0.5" />
        {/* Decorative tile pattern */}
        <path d="M40 50 L60 50 L60 58 L40 58 Z" strokeWidth="0.6" opacity="0.4" />
        {/* Light fixture */}
        <path d="M48 48 L52 48" strokeWidth="0.8" />
        <ellipse cx="50" cy="50" rx="4" ry="2" strokeWidth="0.8" />
      </g>
    </g>
  </svg>
)

/**
 * GALLERY - Long exhibition hall in perspective, art display
 * Reference: Museum/institutional planning, linear display sequence
 * Blueprint Convention: Building structure = dashed, gallery volume = solid
 */
const GallerySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="gallery-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#gallery-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Adjacent spaces and skylight */}
      <path d="M40 20 L60 20 L58 25 L42 25 Z" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />

      {/* PRIMARY: Gallery space and display elements */}
      <g strokeWidth="1">
        {/* Long room in perspective */}
        <path d="M5 20 L30 35 L30 65 L5 80" />
        <path d="M95 20 L70 35 L70 65 L95 80" />
        <path d="M30 35 L70 35" />
        <path d="M30 65 L70 65" />
        <path d="M5 20 L95 20" strokeWidth="1.2" />
        <path d="M5 80 L95 80" strokeWidth="1.2" />
        {/* Paintings on walls */}
        <path d="M10 30 L10 55 L25 50 L25 38 Z" strokeWidth="0.8" />
        <path d="M85 30 L85 55 L75 50 L75 38 Z" strokeWidth="0.8" />
        {/* Frames on back wall */}
        <path d="M35 40 L35 55 L48 55 L48 40 Z" strokeWidth="0.8" />
        <path d="M52 40 L52 55 L65 55 L65 40 Z" strokeWidth="0.8" />
        {/* Sculpture pedestals */}
        <path d="M15 70 L15 80 L22 80 L22 70 Z" />
        <path d="M80 70 L80 80 L87 80 L87 70 Z" />
        {/* Sculptures */}
        <path d="M18 65 Q20 60, 18.5 65" strokeWidth="0.6" opacity="0.6" />
        <path d="M83 65 Q85 60, 83.5 65" strokeWidth="0.6" opacity="0.6" />
        {/* Floor pattern */}
        <path d="M20 80 L35 65" strokeDasharray="2 2" strokeWidth="0.6" opacity="0.4" />
        <path d="M50 80 L50 65" strokeDasharray="2 2" strokeWidth="0.6" opacity="0.4" />
        <path d="M80 80 L65 65" strokeDasharray="2 2" strokeWidth="0.6" opacity="0.4" />
      </g>
    </g>
  </svg>
)

// Export mapping for all interior elements
export const INTERIOR_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'alcove': AlcoveSVG,
  'closet': ClosetSVG,
  'hallway': HallwaySVG,
  'lobby': LobbySVG,
  'mezzanine': MezzanineSVG,
  'niche': NicheSVG,
  'pantry': PantrySVG,
  'vestibule': VestibuleSVG,
  'gallery': GallerySVG,
}

export {
  AlcoveSVG,
  ClosetSVG,
  HallwaySVG,
  LobbySVG,
  MezzanineSVG,
  NicheSVG,
  PantrySVG,
  VestibuleSVG,
  GallerySVG,
}
