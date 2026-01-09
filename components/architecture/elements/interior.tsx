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
 * ALCOVE - Moroccan riad alcove with intricate plasterwork
 * Reference: Riad Farnatchi, Marrakech - intimate seating niches
 * Shows: Horseshoe arch, zellige tiles, carved stucco, low seating
 * Unique view: Looking INTO the alcove from the courtyard
 */
const AlcoveSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="alcove-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#alcove-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Riad courtyard walls */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        <path d="M5 15 L5 95 L95 95 L95 15" />
        {/* Courtyard fountain hint */}
        <circle cx="50" cy="88" r="5" />
        {/* Adjacent arch */}
        <path d="M85 15 Q92 25, 85 35 L85 60" />
      </g>

      {/* PRIMARY - Moroccan alcove with horseshoe arch */}
      <g strokeWidth="1.2">
        {/* Horseshoe arch frame (wider than semicircle) */}
        <path d="M20 70 L20 30 Q20 10, 50 10 Q80 10, 80 30 L80 70" strokeWidth="1.8" />
        {/* Inner arch line */}
        <path d="M25 68 L25 32 Q25 15, 50 15 Q75 15, 75 32 L75 68" strokeWidth="1.2" />
        {/* Keystone at apex */}
        <path d="M46 12 L50 8 L54 12 L54 18 L46 18 Z" strokeWidth="1" />

        {/* Carved stucco arabesque band */}
        <path d="M22 25 Q30 22, 38 25 Q46 28, 50 25 Q54 22, 62 25 Q70 28, 78 25" strokeWidth="0.8" />

        {/* Alcove depth - recessed back wall */}
        <path d="M28 70 L28 35 Q28 20, 50 20 Q72 20, 72 35 L72 70" strokeWidth="0.8" opacity="0.6" />

        {/* Zellige tile dado at bottom */}
        <path d="M25 70 L75 70" strokeWidth="1.5" />
        <path d="M25 55 L75 55" strokeWidth="0.8" />
        {/* Geometric tile pattern */}
        <path d="M30 58 L35 62 L30 66 L25 62 Z" strokeWidth="0.6" />
        <path d="M45 58 L50 62 L45 66 L40 62 Z" strokeWidth="0.6" />
        <path d="M60 58 L65 62 L60 66 L55 62 Z" strokeWidth="0.6" />

        {/* Low seating platform (sedari) */}
        <path d="M30 75 L70 75 L70 82 L30 82 Z" strokeWidth="1.3" />
        <path d="M32 77 L68 77" strokeWidth="0.6" />
        {/* Cushions on seating */}
        <path d="M35 72 L45 72 L45 75 L35 75" strokeWidth="0.8" opacity="0.5" />
        <path d="M55 72 L65 72 L65 75 L55 75" strokeWidth="0.8" opacity="0.5" />

        {/* Lantern hanging in alcove */}
        <path d="M50 20 L50 28" strokeWidth="0.7" />
        <path d="M46 28 L54 28 L52 38 L48 38 Z" strokeWidth="0.9" />
        {/* Lantern pierced pattern */}
        <path d="M49 32 L51 32" strokeWidth="0.4" />
        <path d="M50 30 L50 34" strokeWidth="0.4" />

        {/* Floor tiles */}
        <path d="M20 85 L80 85 L80 95 L20 95 Z" strokeWidth="0.8" />
        <path d="M35 85 L35 95" strokeWidth="0.5" />
        <path d="M50 85 L50 95" strokeWidth="0.5" />
        <path d="M65 85 L65 95" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * CLOSET - Georgian gentleman's dressing room with fitted wardrobes
 * Reference: Georgian townhouse dressing rooms, Petworth House
 * Shows: Floor-to-ceiling mahogany wardrobes, drawers, mirror
 * Unique view: Corner of luxurious dressing room
 */
const ClosetSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="closet-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#closet-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Adjacent bedroom */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Door to bedroom */}
        <path d="M85 30 L85 80" />
        <path d="M88 30 L88 80" />
        {/* Bedroom furniture hint */}
        <path d="M90 60 L98 60 L98 75 L90 75" />
      </g>

      {/* PRIMARY - Georgian fitted wardrobes */}
      <g strokeWidth="1">
        {/* Room corner */}
        <path d="M5 10 L5 95 L85 95" strokeWidth="1.5" />

        {/* Left wall - tall wardrobe */}
        <path d="M8 12 L8 90 L35 90 L35 12 Z" strokeWidth="1.3" />
        {/* Crown molding */}
        <path d="M6 12 L37 12 L37 15 L6 15 Z" strokeWidth="1" />
        <path d="M7 15 L7 18 L36 18 L36 15" strokeWidth="0.6" />
        {/* Double doors */}
        <path d="M10 20 L10 87 L22 87 L22 20 Z" strokeWidth="1" />
        <path d="M23 20 L23 87 L33 87 L33 20 Z" strokeWidth="1" />
        {/* Panel details on doors */}
        <path d="M12 25 L12 55 L20 55 L20 25 Z" strokeWidth="0.7" />
        <path d="M12 60 L12 82 L20 82 L20 60 Z" strokeWidth="0.7" />
        <path d="M25 25 L25 55 L31 55 L31 25 Z" strokeWidth="0.7" />
        <path d="M25 60 L25 82 L31 82 L31 60 Z" strokeWidth="0.7" />
        {/* Handles */}
        <path d="M19 52 L19 58" strokeWidth="1.2" />
        <path d="M25 52 L25 58" strokeWidth="1.2" />

        {/* Back wall - chest of drawers with mirror */}
        <path d="M40 50 L78 50 L78 90 L40 90 Z" strokeWidth="1.2" />
        {/* Drawer fronts */}
        <path d="M42 55 L76 55 L76 65 L42 65 Z" strokeWidth="0.9" />
        <path d="M42 68 L76 68 L76 78 L42 78 Z" strokeWidth="0.9" />
        <path d="M42 81 L76 81 L76 88 L42 88 Z" strokeWidth="0.9" />
        {/* Drawer handles */}
        <path d="M55 60 L63 60" strokeWidth="0.8" />
        <path d="M55 73 L63 73" strokeWidth="0.8" />
        <path d="M55 84 L63 84" strokeWidth="0.8" />

        {/* Oval mirror above */}
        <ellipse cx="59" cy="32" rx="15" ry="18" strokeWidth="1.3" />
        <ellipse cx="59" cy="32" rx="12" ry="15" strokeWidth="0.8" />
        {/* Mirror frame decoration */}
        <path d="M59 14 L56 17 L59 20 L62 17 Z" strokeWidth="0.6" />

        {/* Crown molding along ceiling */}
        <path d="M5 10 L85 10" strokeWidth="1.5" />
        <path d="M5 13 L85 13" strokeWidth="0.6" />

        {/* Base molding */}
        <path d="M5 92 L85 92 L85 95 L5 95" strokeWidth="0.9" />

        {/* Herringbone floor */}
        <path d="M10 93 L15 90 L20 93" strokeWidth="0.5" opacity="0.4" />
        <path d="M30 93 L35 90 L40 93" strokeWidth="0.5" opacity="0.4" />
        <path d="M50 93 L55 90 L60 93" strokeWidth="0.5" opacity="0.4" />
      </g>
    </g>
  </svg>
)

/**
 * HALLWAY - Palace enfilade corridor in perspective
 * Reference: Palace of Versailles enfilade, Hermitage Museum
 * Shows: Doors aligned through sequence of rooms, gilded frames
 * Unique view: Standing in corridor looking through aligned doorways
 */
const HallwaySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="hallway-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#hallway-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Rooms glimpsed through doors */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Furniture in adjacent room left */}
        <path d="M8 50 L12 50 L12 70 L8 70" />
        {/* Chandelier in distant room */}
        <circle cx="50" cy="45" r="3" />
        <path d="M50 42 L50 38" />
      </g>

      {/* PRIMARY - Enfilade corridor perspective */}
      <g strokeWidth="1.2">
        {/* Vanishing point corridor */}
        <path d="M5 10 L35 30 L35 70 L5 90" strokeWidth="1.5" />
        <path d="M95 10 L65 30 L65 70 L95 90" strokeWidth="1.5" />

        {/* First doorframe (closest) */}
        <path d="M10 15 L10 85" strokeWidth="2" />
        <path d="M90 15 L90 85" strokeWidth="2" />
        {/* Door architrave */}
        <path d="M8 12 L92 12" strokeWidth="1.8" />
        <path d="M8 15 L92 15" strokeWidth="1" />

        {/* Second doorframe */}
        <path d="M25 25 L25 75" strokeWidth="1.8" />
        <path d="M75 25 L75 75" strokeWidth="1.8" />
        <path d="M23 23 L77 23" strokeWidth="1.5" />

        {/* Third doorframe (middle distance) */}
        <path d="M35 32 L35 68" strokeWidth="1.5" />
        <path d="M65 32 L65 68" strokeWidth="1.5" />
        <path d="M34 31 L66 31" strokeWidth="1.3" />

        {/* Fourth doorframe (far) */}
        <path d="M42 38 L42 62" strokeWidth="1.2" />
        <path d="M58 38 L58 62" strokeWidth="1.2" />
        <path d="M41 37 L59 37" strokeWidth="1" />

        {/* Final vanishing point door */}
        <path d="M47 42 L47 58 L53 58 L53 42 Z" strokeWidth="0.9" />

        {/* Ceiling with cove molding */}
        <path d="M5 10 L95 10" strokeWidth="1.8" />
        <path d="M8 13 L92 13" strokeWidth="0.7" />

        {/* Floor */}
        <path d="M5 90 L95 90" strokeWidth="1.8" />

        {/* Parquet floor lines converging */}
        <path d="M50 90 L50 70" strokeWidth="0.6" opacity="0.5" />
        <path d="M30 90 L40 70" strokeWidth="0.5" opacity="0.4" />
        <path d="M70 90 L60 70" strokeWidth="0.5" opacity="0.4" />

        {/* Wall paintings/mirrors between doors */}
        <path d="M13 35 L13 55 L22 55 L22 35 Z" strokeWidth="0.9" />
        <path d="M78 35 L78 55 L87 55 L87 35 Z" strokeWidth="0.9" />
        {/* Gilt frame detail */}
        <path d="M14 36 L14 54 L21 54 L21 36 Z" strokeWidth="0.5" />

        {/* Sconces on walls */}
        <path d="M18 28 L18 32" strokeWidth="0.8" />
        <path d="M82 28 L82 32" strokeWidth="0.8" />
        <path d="M16 32 L20 32 L18 35 Z" strokeWidth="0.6" />
        <path d="M80 32 L84 32 L82 35 Z" strokeWidth="0.6" />

        {/* Console table */}
        <path d="M15 72 L22 72 L22 78 L15 78" strokeWidth="0.8" />
        <path d="M17 78 L17 85" strokeWidth="0.7" />
        <path d="M20 78 L20 85" strokeWidth="0.7" />
      </g>
    </g>
  </svg>
)

/**
 * LOBBY - Art Deco hotel lobby with geometric details
 * Reference: Claridge's London, Empire State Building lobby
 * Shows: Geometric ceiling, elevator doors, reception desk
 * Unique view: Grand entrance looking toward elevators
 */
const LobbySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="lobby-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#lobby-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Street entrance behind viewer */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Revolving door hint */}
        <circle cx="50" cy="92" r="5" />
        {/* Side windows */}
        <path d="M10 60 L10 85" />
        <path d="M90 60 L90 85" />
      </g>

      {/* PRIMARY - Art Deco hotel lobby */}
      <g strokeWidth="1.2">
        {/* Geometric coffered ceiling */}
        <path d="M5 10 L95 10" strokeWidth="1.8" />
        <path d="M10 10 L30 25 L70 25 L90 10" strokeWidth="1" />
        {/* Ceiling coffers */}
        <path d="M20 10 L20 20" strokeWidth="0.7" />
        <path d="M40 10 L40 25" strokeWidth="0.7" />
        <path d="M60 10 L60 25" strokeWidth="0.7" />
        <path d="M80 10 L80 20" strokeWidth="0.7" />
        {/* Art Deco sunburst detail */}
        <path d="M50 15 L50 22" strokeWidth="0.6" />
        <path d="M45 17 L50 12 L55 17" strokeWidth="0.6" />

        {/* Elevator bank (back wall focal point) */}
        <path d="M25 30 L75 30 L75 75 L25 75 Z" strokeWidth="1.5" />
        {/* Three elevator doors */}
        <path d="M28 35 L28 72 L42 72 L42 35 Z" strokeWidth="1.2" />
        <path d="M43 35 L43 72 L57 72 L57 35 Z" strokeWidth="1.2" />
        <path d="M58 35 L58 72 L72 72 L72 35 Z" strokeWidth="1.2" />
        {/* Elevator door details */}
        <path d="M35 35 L35 72" strokeWidth="0.8" />
        <path d="M50 35 L50 72" strokeWidth="0.8" />
        <path d="M65 35 L65 72" strokeWidth="0.8" />
        {/* Art Deco geometric panel on doors */}
        <path d="M30 50 L32 45 L38 45 L40 50 L38 55 L32 55 Z" strokeWidth="0.7" />
        <path d="M45 50 L47 45 L53 45 L55 50 L53 55 L47 55 Z" strokeWidth="0.7" />
        <path d="M60 50 L62 45 L68 45 L70 50 L68 55 L62 55 Z" strokeWidth="0.7" />
        {/* Floor indicator above */}
        <path d="M47 32 L53 32 L50 28 Z" strokeWidth="0.8" />

        {/* Reception desk (curved Art Deco) */}
        <path d="M8 55 Q15 50, 22 55 L22 80 L8 80 Z" strokeWidth="1.3" />
        <path d="M10 58 Q15 54, 20 58" strokeWidth="0.7" />
        {/* Desk lamp */}
        <path d="M15 52 L15 55" strokeWidth="0.6" />
        <path d="M13 52 L17 52 L15 48 Z" strokeWidth="0.5" />

        {/* Seating area */}
        <path d="M78 55 L92 55 L92 70 L78 70 Z" strokeWidth="1" />
        <path d="M80 57 L90 57 L90 68 L80 68 Z" strokeWidth="0.6" />

        {/* Floor with geometric pattern */}
        <path d="M5 85 L95 85 L95 95 L5 95 Z" strokeWidth="1.5" />
        {/* Terrazzo with brass strips */}
        <path d="M30 85 L30 95" strokeWidth="1" />
        <path d="M50 85 L50 95" strokeWidth="1" />
        <path d="M70 85 L70 95" strokeWidth="1" />
        {/* Geometric inlay */}
        <path d="M50 85 L40 95" strokeWidth="0.6" opacity="0.5" />
        <path d="M50 85 L60 95" strokeWidth="0.6" opacity="0.5" />

        {/* Columns with Art Deco capitals */}
        <path d="M20 25 L20 85" strokeWidth="2" />
        <path d="M80 25 L80 85" strokeWidth="2" />
        {/* Fluted columns */}
        <path d="M18 30 L18 82" strokeWidth="0.5" opacity="0.4" />
        <path d="M22 30 L22 82" strokeWidth="0.5" opacity="0.4" />
        <path d="M78 30 L78 82" strokeWidth="0.5" opacity="0.4" />
        <path d="M82 30 L82 82" strokeWidth="0.5" opacity="0.4" />
      </g>
    </g>
  </svg>
)

/**
 * MEZZANINE - Industrial loft with steel mezzanine
 * Reference: SoHo cast iron lofts, Tribeca conversions
 * Shows: Open metal staircase, steel railings, exposed brick
 * Unique view: Looking up at mezzanine from ground floor
 */
const MezzanineSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="mezzanine-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#mezzanine-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Industrial loft space */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Exposed brick wall texture */}
        <path d="M5 20 L8 20" />
        <path d="M5 25 L10 25" />
        <path d="M5 30 L8 30" />
        {/* Large industrial window */}
        <path d="M75 15 L95 15 L95 55 L75 55 Z" />
        <path d="M85 15 L85 55" />
        <path d="M75 35 L95 35" />
      </g>

      {/* PRIMARY - Steel mezzanine structure */}
      <g strokeWidth="1.2">
        {/* Mezzanine platform with steel beam edge */}
        <path d="M5 45 L70 45" strokeWidth="2.5" />
        <path d="M5 48 L70 48" strokeWidth="1" />
        {/* Platform deck boards */}
        <path d="M5 42 L70 42 L70 45 L5 45 Z" strokeWidth="1" />

        {/* Steel I-beam support columns */}
        <path d="M20 48 L20 95" strokeWidth="2.2" />
        <path d="M18 50 L22 50 L22 93 L18 93" strokeWidth="0.6" />
        <path d="M50 48 L50 95" strokeWidth="2.2" />
        <path d="M48 50 L52 50 L52 93 L48 93" strokeWidth="0.6" />

        {/* Steel pipe railing */}
        <path d="M5 38 L70 38" strokeWidth="1.5" />
        <path d="M70 38 L70 48" strokeWidth="1.5" />
        {/* Railing posts */}
        <path d="M15 38 L15 45" strokeWidth="1" />
        <path d="M30 38 L30 45" strokeWidth="1" />
        <path d="M45 38 L45 45" strokeWidth="1" />
        <path d="M60 38 L60 45" strokeWidth="1" />
        {/* Middle rail */}
        <path d="M5 42 L70 42" strokeWidth="0.8" />

        {/* Open tread steel staircase */}
        <path d="M70 45 L70 95 L85 95 L85 45" strokeWidth="1.5" />
        {/* Stair treads (open risers) */}
        <path d="M70 50 L85 50" strokeWidth="1.2" />
        <path d="M70 58 L85 58" strokeWidth="1.2" />
        <path d="M70 66 L85 66" strokeWidth="1.2" />
        <path d="M70 74 L85 74" strokeWidth="1.2" />
        <path d="M70 82 L85 82" strokeWidth="1.2" />
        <path d="M70 90 L85 90" strokeWidth="1.2" />
        {/* Stair stringers */}
        <path d="M72 45 L72 95" strokeWidth="0.8" />
        <path d="M83 45 L83 95" strokeWidth="0.8" />
        {/* Handrail */}
        <path d="M88 45 L88 95" strokeWidth="1.3" />
        <path d="M88 52 L85 52" strokeWidth="0.7" />
        <path d="M88 68 L85 68" strokeWidth="0.7" />
        <path d="M88 84 L85 84" strokeWidth="0.7" />

        {/* Ceiling with exposed joists */}
        <path d="M5 10 L95 10" strokeWidth="1.8" />
        <path d="M5 10 L5 15" strokeWidth="1.2" />
        <path d="M25 10 L25 15" strokeWidth="1.2" />
        <path d="M45 10 L45 15" strokeWidth="1.2" />
        <path d="M65 10 L65 15" strokeWidth="1.2" />

        {/* Ground floor - concrete */}
        <path d="M5 95 L95 95" strokeWidth="1.8" />

        {/* Pendant industrial lights */}
        <path d="M35 15 L35 25" strokeWidth="0.8" />
        <path d="M30 25 L40 25 L38 32 L32 32 Z" strokeWidth="0.9" />

        {/* Office furniture on mezzanine (plan view) */}
        <path d="M10 30 L25 30 L25 38 L10 38 Z" strokeWidth="0.7" opacity="0.5" />
        <path d="M40 30 L55 30 L55 38 L40 38 Z" strokeWidth="0.7" opacity="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * NICHE - Renaissance palazzo wall niche with classical statue
 * Reference: Vatican Museums, Uffizi Gallery statue niches
 * Shows: Shell-headed niche, classical sculpture, pedestal
 * Unique view: Elevation of ornate museum niche
 */
const NicheSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="niche-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#niche-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Gallery wall with adjacent niches */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Wall extends beyond */}
        <path d="M5 10 L5 95 L95 95 L95 10" />
        {/* Adjacent niche hints */}
        <path d="M8 25 Q8 15, 15 25 L15 70" />
        <path d="M85 25 Q92 15, 92 25 L92 70" />
        {/* Wainscoting below */}
        <path d="M5 80 L95 80" />
      </g>

      {/* PRIMARY - Renaissance niche with statue */}
      <g strokeWidth="1.2">
        {/* Outer molded frame */}
        <path d="M22 15 L22 78 L78 78 L78 15 Q50 5, 22 15" strokeWidth="1.8" />
        {/* Inner niche opening */}
        <path d="M28 20 L28 75 L72 75 L72 20 Q50 12, 28 20" strokeWidth="1.5" />

        {/* Shell-headed conch (scallop) */}
        <path d="M30 22 Q50 15, 70 22" strokeWidth="1.3" />
        <path d="M32 25 Q50 18, 68 25" strokeWidth="0.9" />
        {/* Radiating shell ribs */}
        <path d="M50 16 L50 30" strokeWidth="0.7" />
        <path d="M40 18 L42 30" strokeWidth="0.6" />
        <path d="M60 18 L58 30" strokeWidth="0.6" />
        <path d="M34 22 L38 30" strokeWidth="0.5" />
        <path d="M66 22 L62 30" strokeWidth="0.5" />

        {/* Back of niche (recessed) */}
        <path d="M32 30 L32 72 L68 72 L68 30" strokeWidth="0.8" opacity="0.5" />

        {/* Classical statue */}
        {/* Head */}
        <ellipse cx="50" cy="38" rx="5" ry="6" strokeWidth="1" />
        {/* Neck and shoulders */}
        <path d="M45 43 L42 48 L58 48 L55 43" strokeWidth="0.9" />
        {/* Torso - contrapposto pose */}
        <path d="M42 48 L40 65 L60 65 L58 48" strokeWidth="1" />
        {/* Drapery folds */}
        <path d="M44 52 Q48 55, 44 60" strokeWidth="0.6" />
        <path d="M56 52 Q52 55, 56 60" strokeWidth="0.6" />
        {/* Arms */}
        <path d="M42 50 L35 58" strokeWidth="0.8" />
        <path d="M58 50 L62 55 L60 62" strokeWidth="0.8" />

        {/* Pedestal */}
        <path d="M38 65 L62 65 L64 68 L36 68 Z" strokeWidth="1" />
        <path d="M35 68 L65 68 L66 72 L34 72 Z" strokeWidth="1.2" />
        <path d="M34 72 L66 72 L66 75 L34 75 Z" strokeWidth="1" />

        {/* Decorative console brackets */}
        <path d="M24 70 Q22 72, 24 75 L28 75 L28 70" strokeWidth="0.9" />
        <path d="M76 70 Q78 72, 76 75 L72 75 L72 70" strokeWidth="0.9" />

        {/* Keystone at arch apex */}
        <path d="M47 8 L50 5 L53 8 L53 14 L47 14 Z" strokeWidth="0.9" />

        {/* Floor with marble pattern */}
        <path d="M20 85 L80 85 L80 90 L20 90 Z" strokeWidth="0.8" />
        <path d="M35 85 L35 90" strokeWidth="0.5" />
        <path d="M50 85 L50 90" strokeWidth="0.5" />
        <path d="M65 85 L65 90" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * PANTRY - English country house butler's pantry
 * Reference: Downton Abbey, Highclere Castle service areas
 * Shows: Silver storage, plate racks, work counter, butler's sink
 * Unique view: Interior of working butler's pantry
 */
const PantrySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pantry-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#pantry-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Door to dining room */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Service door (green baize door) */}
        <path d="M40 88 L40 95 L60 95 L60 88" />
        <path d="M42 90 L58 90 L58 93 L42 93" />
      </g>

      {/* PRIMARY - Butler's pantry interior */}
      <g strokeWidth="1">
        {/* Room walls */}
        <path d="M10 10 L10 88 L90 88 L90 10 Z" strokeWidth="1.5" />

        {/* Left wall - glass-fronted silver cabinet */}
        <path d="M12 15 L12 75 L35 75 L35 15 Z" strokeWidth="1.3" />
        {/* Cabinet doors with glass panes */}
        <path d="M14 18 L14 55 L33 55 L33 18 Z" strokeWidth="1" />
        <path d="M23 18 L23 55" strokeWidth="0.7" />
        <path d="M14 35 L33 35" strokeWidth="0.7" />
        {/* Silver pieces visible */}
        <path d="M17 25 L17 32" strokeWidth="0.6" opacity="0.5" />
        <path d="M20 22 L20 32" strokeWidth="0.6" opacity="0.5" />
        <path d="M26 25 L26 32" strokeWidth="0.6" opacity="0.5" />
        {/* Lower cabinet (solid doors) */}
        <path d="M14 58 L14 72 L33 72 L33 58 Z" strokeWidth="0.9" />
        <path d="M23 58 L23 72" strokeWidth="0.6" />
        <path d="M18 65 L18 67" strokeWidth="0.8" />
        <path d="M28 65 L28 67" strokeWidth="0.8" />

        {/* Right wall - plate rack and shelving */}
        <path d="M65 15 L65 45 L88 45 L88 15 Z" strokeWidth="1.2" />
        {/* Plate grooves */}
        <path d="M67 20 L86 20" strokeWidth="0.8" />
        <path d="M67 28 L86 28" strokeWidth="0.8" />
        <path d="M67 36 L86 36" strokeWidth="0.8" />
        {/* Plates (shown edge-on) */}
        <path d="M70 20 L70 28" strokeWidth="0.5" opacity="0.4" />
        <path d="M75 20 L75 28" strokeWidth="0.5" opacity="0.4" />
        <path d="M80 20 L80 28" strokeWidth="0.5" opacity="0.4" />

        {/* Work counter with butler's sink */}
        <path d="M65 50 L88 50 L88 75 L65 75 Z" strokeWidth="1.2" />
        {/* Sink basin */}
        <path d="M70 55 L70 70 L83 70 L83 55 Z" strokeWidth="1" />
        <path d="M72 57 L72 68 L81 68 L81 57 Z" strokeWidth="0.6" />
        {/* Taps */}
        <path d="M74 52 L74 55" strokeWidth="0.8" />
        <path d="M79 52 L79 55" strokeWidth="0.8" />

        {/* Central work island */}
        <path d="M40 40 L60 40 L60 65 L40 65 Z" strokeWidth="1.3" />
        <path d="M42 42 L58 42 L58 63 L42 63 Z" strokeWidth="0.6" />
        {/* Drawers */}
        <path d="M42 50 L58 50" strokeWidth="0.7" />
        <path d="M48 44 L52 44" strokeWidth="0.6" />
        <path d="M48 56 L52 56" strokeWidth="0.6" />

        {/* Ceiling with pendant light */}
        <path d="M10 10 L90 10" strokeWidth="1.5" />
        <path d="M50 10 L50 18" strokeWidth="0.8" />
        <ellipse cx="50" cy="22" rx="5" ry="3" strokeWidth="0.9" />

        {/* Tiled floor */}
        <path d="M10 85 L90 85" strokeWidth="0.8" />
        <path d="M25 85 L25 88" strokeWidth="0.5" />
        <path d="M50 85 L50 88" strokeWidth="0.5" />
        <path d="M75 85 L75 88" strokeWidth="0.5" />

        {/* Call bell board */}
        <path d="M12 78 L30 78 L30 84 L12 84 Z" strokeWidth="0.8" />
        <circle cx="16" cy="81" r="1.5" strokeWidth="0.5" />
        <circle cx="21" cy="81" r="1.5" strokeWidth="0.5" />
        <circle cx="26" cy="81" r="1.5" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * VESTIBULE - Grand European apartment building vestibule
 * Reference: Haussmann Paris buildings, Vienna Ringstrasse
 * Shows: Marble walls, etched glass doors, mailboxes, concierge window
 * Unique view: Entering from street through first set of doors
 */
const VestibuleSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="vestibule-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#vestibule-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Street and courtyard */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Street pavement behind */}
        <path d="M5 92 L95 92" />
        {/* Inner courtyard glimpsed ahead */}
        <path d="M42 20 L42 25 L58 25 L58 20" />
        <path d="M50 22 L50 15" />
      </g>

      {/* PRIMARY - Haussmann vestibule */}
      <g strokeWidth="1.2">
        {/* Outer door frame (from street) */}
        <path d="M20 85 L20 15 L80 15 L80 85" strokeWidth="1.8" />
        {/* Transom above */}
        <path d="M20 15 L20 10 L80 10 L80 15" strokeWidth="1.5" />
        <path d="M30 10 L30 15" strokeWidth="0.7" />
        <path d="M50 10 L50 15" strokeWidth="0.7" />
        <path d="M70 10 L70 15" strokeWidth="0.7" />

        {/* Inner glass doors to courtyard */}
        <path d="M30 20 L30 55 L70 55 L70 20" strokeWidth="1.5" />
        {/* Double doors */}
        <path d="M32 22 L32 52 L48 52 L48 22 Z" strokeWidth="1" />
        <path d="M52 22 L52 52 L68 52 L68 22 Z" strokeWidth="1" />
        <path d="M50 22 L50 52" strokeWidth="1.3" />
        {/* Etched glass pattern */}
        <path d="M36 30 Q40 25, 44 30" strokeWidth="0.6" />
        <path d="M56 30 Q60 25, 64 30" strokeWidth="0.6" />
        {/* Push plates */}
        <path d="M46 38 L46 42" strokeWidth="0.8" />
        <path d="M54 38 L54 42" strokeWidth="0.8" />

        {/* Left wall - concierge loge window */}
        <path d="M22 35 L22 65 L28 65 L28 35 Z" strokeWidth="1.2" />
        <path d="M23 37 L23 63 L27 63 L27 37 Z" strokeWidth="0.7" />
        {/* Concierge silhouette */}
        <circle cx="25" cy="48" r="3" strokeWidth="0.5" opacity="0.4" />

        {/* Right wall - brass mailboxes */}
        <path d="M72 35 L72 65 L78 65 L78 35 Z" strokeWidth="1.2" />
        {/* Individual mailbox slots */}
        <path d="M73 38 L77 38 L77 42 L73 42 Z" strokeWidth="0.7" />
        <path d="M73 44 L77 44 L77 48 L73 48 Z" strokeWidth="0.7" />
        <path d="M73 50 L77 50 L77 54 L73 54 Z" strokeWidth="0.7" />
        <path d="M73 56 L77 56 L77 60 L73 60 Z" strokeWidth="0.7" />
        {/* Name plates */}
        <path d="M74 40 L76 40" strokeWidth="0.4" />
        <path d="M74 46 L76 46" strokeWidth="0.4" />
        <path d="M74 52 L76 52" strokeWidth="0.4" />
        <path d="M74 58 L76 58" strokeWidth="0.4" />

        {/* Marble wainscoting */}
        <path d="M20 70 L80 70" strokeWidth="1" />
        <path d="M22 72 L78 72 L78 85 L22 85 Z" strokeWidth="0.8" />
        {/* Marble veining */}
        <path d="M30 75 Q35 78, 40 75" strokeWidth="0.4" opacity="0.4" />
        <path d="M55 78 Q60 75, 65 78" strokeWidth="0.4" opacity="0.4" />

        {/* Floor - encaustic tiles */}
        <path d="M20 85 L80 85 L80 95 L20 95 Z" strokeWidth="1" />
        {/* Geometric tile pattern */}
        <path d="M35 90 L50 85 L65 90 L50 95 Z" strokeWidth="0.7" />
        <path d="M42 88 L50 90 L58 88" strokeWidth="0.5" />

        {/* Ceiling molding */}
        <path d="M20 10 L80 10" strokeWidth="1.5" />
        <path d="M22 12 L78 12" strokeWidth="0.6" />

        {/* Wall sconces */}
        <path d="M25 28 L25 32" strokeWidth="0.7" />
        <path d="M23 32 L27 32 L25 35 Z" strokeWidth="0.5" />
        <path d="M75 28 L75 32" strokeWidth="0.7" />
        <path d="M73 32 L77 32 L75 35 Z" strokeWidth="0.5" />

        {/* Stair glimpse through door */}
        <path d="M45 20 L45 18 L55 18 L55 20" strokeWidth="0.6" opacity="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * GALLERY - Museum sculpture gallery with skylights
 * Reference: Louvre, British Museum, Metropolitan Museum
 * Shows: Top-lit space, sculpture on pedestals, bench
 * Unique view: Standing in gallery looking at classical sculptures
 */
const GallerySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="gallery-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#gallery-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Adjacent galleries */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Doorways to other galleries */}
        <path d="M8 30 L8 70" />
        <path d="M92 30 L92 70" />
        {/* Paintings glimpsed */}
        <path d="M4 40 L4 55" />
        <path d="M96 45 L96 60" />
      </g>

      {/* PRIMARY - Museum sculpture gallery */}
      <g strokeWidth="1.2">
        {/* Coffered skylight ceiling */}
        <path d="M15 10 L85 10 L88 18 L12 18 Z" strokeWidth="1.5" />
        {/* Skylight glass panes */}
        <path d="M20 12 L80 12 L82 16 L18 16 Z" strokeWidth="0.8" />
        <path d="M35 12 L35 16" strokeWidth="0.6" />
        <path d="M50 12 L50 16" strokeWidth="0.6" />
        <path d="M65 12 L65 16" strokeWidth="0.6" />
        {/* Light rays */}
        <path d="M35 16 L35 30" strokeDasharray="2 2" opacity="0.3" strokeWidth="0.5" />
        <path d="M50 16 L50 30" strokeDasharray="2 2" opacity="0.3" strokeWidth="0.5" />
        <path d="M65 16 L65 30" strokeDasharray="2 2" opacity="0.3" strokeWidth="0.5" />

        {/* Gallery walls */}
        <path d="M10 18 L10 85 L90 85 L90 18" strokeWidth="1.5" />

        {/* Central sculpture - Venus/classical figure */}
        <path d="M45 75 L55 75 L55 78 L45 78 Z" strokeWidth="1.2" />
        <path d="M43 78 L57 78 L58 82 L42 82 Z" strokeWidth="1" />
        {/* Figure */}
        <ellipse cx="50" cy="55" rx="4" ry="5" strokeWidth="0.9" />
        <path d="M46 59 L44 70 L56 70 L54 59" strokeWidth="0.9" />
        <path d="M47 62 Q50 65, 53 62" strokeWidth="0.5" />
        <path d="M44 61 L38 65" strokeWidth="0.7" />
        <path d="M56 61 L60 58 L58 65" strokeWidth="0.7" />

        {/* Left pedestal with bust */}
        <path d="M18 70 L28 70 L29 75 L17 75 Z" strokeWidth="1" />
        <path d="M16 75 L30 75 L30 82 L16 82 Z" strokeWidth="1" />
        {/* Bust */}
        <ellipse cx="23" cy="62" rx="4" ry="5" strokeWidth="0.9" />
        <path d="M20 66 L19 70 L27 70 L26 66" strokeWidth="0.7" />

        {/* Right pedestal with torso */}
        <path d="M72 70 L82 70 L83 75 L71 75 Z" strokeWidth="1" />
        <path d="M70 75 L84 75 L84 82 L70 82 Z" strokeWidth="1" />
        {/* Torso fragment */}
        <path d="M74 55 L72 68 L82 68 L80 55 Q77 52, 74 55" strokeWidth="0.9" />
        <path d="M76 58 Q77 62, 78 58" strokeWidth="0.5" />

        {/* Wall paintings */}
        <path d="M15 28 L15 50 L35 50 L35 28 Z" strokeWidth="0.9" />
        <path d="M17 30 L17 48 L33 48 L33 30 Z" strokeWidth="0.5" />
        <path d="M65 28 L65 50 L85 50 L85 28 Z" strokeWidth="0.9" />
        <path d="M67 30 L67 48 L83 48 L83 30 Z" strokeWidth="0.5" />

        {/* Gallery bench */}
        <path d="M38 88 L62 88 L62 92 L38 92 Z" strokeWidth="1.2" />
        <path d="M40 92 L40 95" strokeWidth="0.8" />
        <path d="M50 92 L50 95" strokeWidth="0.8" />
        <path d="M60 92 L60 95" strokeWidth="0.8" />

        {/* Parquet floor */}
        <path d="M10 85 L90 85" strokeWidth="1.5" />
        <path d="M25 85 L25 95" strokeWidth="0.6" opacity="0.4" />
        <path d="M50 85 L50 95" strokeWidth="0.6" opacity="0.4" />
        <path d="M75 85 L75 95" strokeWidth="0.6" opacity="0.4" />

        {/* Information placard */}
        <path d="M46 84 L54 84 L54 85 L46 85" strokeWidth="0.5" />
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
