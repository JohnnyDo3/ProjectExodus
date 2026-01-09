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
// 1. ARCHED DOOR
// Romanesque church entrance with rounded stone arch and heavy wooden doors
// Reference: San Clemente Basilica (Rome), Durham Cathedral (England)
// ============================================================================
const ArchedDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="arched-halo" intensity={1} />}
    <g filter={showHalo ? "url(#arched-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Stone wall and pavement */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Wall masonry pattern */}
        <path d="M2 5 L2 95 L98 95 L98 5" />
        <path d="M5 15 L95 15 M5 25 L95 25" />
        <path d="M15 5 L15 15 M40 5 L40 15 M65 5 L65 15 M90 5 L90 15" />
        <path d="M25 15 L25 25 M50 15 L50 25 M75 15 L75 25" />
        {/* Side wall stones */}
        <path d="M5 35 L10 35 M90 35 L95 35" />
        <path d="M5 55 L10 55 M90 55 L95 55" />
        <path d="M5 75 L10 75 M90 75 L95 75" />
        {/* Stone pavement */}
        <path d="M10 88 L90 88 L90 95 L10 95 Z" />
        <path d="M30 88 L30 95 M50 88 L50 95 M70 88 L70 95" />
      </g>

      {/* PRIMARY: Romanesque arched doorway */}
      <g strokeWidth="0.8">
        {/* Outer arch - massive stone */}
        <path d="M8 90 L8 40 Q50 8, 92 40 L92 90" strokeWidth="1.5" />
        {/* Middle arch ring */}
        <path d="M14 88 L14 42 Q50 15, 86 42 L86 88" strokeWidth="1.2" />
        {/* Inner arch - voussoirs visible */}
        <path d="M20 86 L20 45 Q50 22, 80 45 L80 86" />

        {/* Voussoir stones in arch */}
        <path d="M50 22 L50 28" />
        <path d="M42 24 L44 30" />
        <path d="M58 24 L56 30" />
        <path d="M34 28 L37 34" />
        <path d="M66 28 L63 34" />
        <path d="M27 35 L31 40" />
        <path d="M73 35 L69 40" />

        {/* Keystone at apex */}
        <path d="M47 20 L47 28 L53 28 L53 20 Z" />

        {/* Columns/Jambs */}
        <path d="M20 45 L20 90 L28 90 L28 45" />
        <path d="M72 45 L72 90 L80 90 L80 45" />

        {/* Column capitals */}
        <path d="M18 45 L18 48 L30 48 L30 45" />
        <path d="M70 45 L70 48 L82 48 L82 45" />

        {/* Column bases */}
        <path d="M18 86 L30 86 L30 90 L18 90" />
        <path d="M70 86 L82 86 L82 90 L70 90" />

        {/* Heavy wooden double doors */}
        <path d="M32 50 L32 88 L48 88 L48 50 Z" strokeWidth="1" />
        <path d="M52 50 L52 88 L68 88 L68 50 Z" strokeWidth="1" />

        {/* Vertical planks on doors */}
        <path d="M36 52 L36 86 M40 52 L40 86 M44 52 L44 86" strokeWidth="0.4" />
        <path d="M56 52 L56 86 M60 52 L60 86 M64 52 L64 86" strokeWidth="0.4" />

        {/* Iron strap hinges */}
        <path d="M28 58 L45 58" strokeWidth="1.5" />
        <path d="M28 72 L45 72" strokeWidth="1.5" />
        <path d="M72 58 L55 58" strokeWidth="1.5" />
        <path d="M72 72 L55 72" strokeWidth="1.5" />

        {/* Iron ring handles */}
        <circle cx="45" cy="65" r="3" strokeWidth="1.2" />
        <circle cx="55" cy="65" r="3" strokeWidth="1.2" />

        {/* Tympanum suggestion */}
        <path d="M30 45 Q50 30, 70 45" strokeDasharray="2,2" opacity="0.5" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 2. BIFOLD DOOR
// Modern interior closet with folding mechanism, showing panels hinged together
// Reference: Contemporary residential closets, California Closets designs
// ============================================================================
const BifoldDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="bifold-halo" intensity={0.75} />}
    <g filter={showHalo ? "url(#bifold-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Closet interior and walls */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Room walls */}
        <path d="M5 10 L5 95 L95 95 L95 10" />
        {/* Closet opening frame */}
        <path d="M12 15 L12 88 L88 88 L88 15" />
        {/* Interior shelving visible */}
        <path d="M15 25 L25 25 M75 25 L85 25" />
        <path d="M15 40 L25 40 M75 40 L85 40" />
        <path d="M15 55 L25 55 M75 55 L85 55" />
        {/* Floor */}
        <path d="M12 85 L88 85 L88 92 L12 92 Z" />
        <path d="M30 85 L30 92 M50 85 L50 92 M70 85 L70 92" />
      </g>

      {/* PRIMARY: Bifold door panels (partially folded open) */}
      <g strokeWidth="0.8">
        {/* Track at top */}
        <path d="M12 15 L88 15" strokeWidth="1.5" />
        <path d="M12 17 L88 17" strokeWidth="0.4" />

        {/* Left bifold set - folded open */}
        {/* Outer left panel (angled) */}
        <path d="M12 18 L12 85 L28 85 L32 18 Z" />
        <path d="M15 22 L15 81 L25 81 L29 22 Z" strokeWidth="0.5" />

        {/* Inner left panel (angled more) */}
        <path d="M32 18 L28 85 L42 85 L50 18 Z" />
        <path d="M35 22 L32 81 L39 81 L47 22 Z" strokeWidth="0.5" />

        {/* Right bifold set - folded open (mirrored) */}
        {/* Inner right panel */}
        <path d="M68 18 L72 85 L58 85 L50 18 Z" />
        <path d="M65 22 L68 81 L61 81 L53 22 Z" strokeWidth="0.5" />

        {/* Outer right panel */}
        <path d="M88 18 L88 85 L72 85 L68 18 Z" />
        <path d="M85 22 L85 81 L75 81 L71 22 Z" strokeWidth="0.5" />

        {/* Louvered slats on panels */}
        <path d="M17 30 L27 30 M17 38 L27 38 M17 46 L27 46 M17 54 L27 54" strokeWidth="0.3" />
        <path d="M37 30 L45 30 M35 38 L43 38 M33 46 L41 46 M31 54 L39 54" strokeWidth="0.3" />
        <path d="M55 30 L63 30 M57 38 L65 38 M59 46 L67 46 M61 54 L69 54" strokeWidth="0.3" />
        <path d="M73 30 L83 30 M73 38 L83 38 M73 46 L83 46 M73 54 L83 54" strokeWidth="0.3" />

        {/* Pivot hinges - left set */}
        <circle cx="28" cy="18" r="2" />
        <circle cx="28" cy="85" r="2" />

        {/* Pivot hinges - right set */}
        <circle cx="72" cy="18" r="2" />
        <circle cx="72" cy="85" r="2" />

        {/* Track rollers */}
        <circle cx="15" cy="15" r="1.5" />
        <circle cx="50" cy="15" r="1.5" />
        <circle cx="85" cy="15" r="1.5" />

        {/* Pull handles */}
        <path d="M40 50 L43 50 L43 58 L40 58" strokeWidth="1" />
        <path d="M57 50 L60 50 L60 58 L57 58" strokeWidth="1" />

        {/* Center fold lines */}
        <path d="M28 18 L28 85" strokeWidth="1.2" />
        <path d="M72 18 L72 85" strokeWidth="1.2" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 3. DUTCH DOOR
// Traditional farmhouse split door allowing top to open independently
// Reference: Colonial Williamsburg, Pennsylvania Dutch farmhouses
// ============================================================================
const DutchDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="dutch-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#dutch-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Farmhouse wall and stable yard */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Clapboard siding */}
        <path d="M2 5 L2 95 L98 95 L98 5" />
        <path d="M5 15 L10 15 M90 15 L95 15" />
        <path d="M5 22 L10 22 M90 22 L95 22" />
        <path d="M5 29 L10 29 M90 29 L95 29" />
        <path d="M5 36 L10 36 M90 36 L95 36" />
        <path d="M5 43 L10 43 M90 43 L95 43" />
        <path d="M5 57 L10 57 M90 57 L95 57" />
        <path d="M5 70 L10 70 M90 70 L95 70" />
        {/* Door frame trim */}
        <path d="M10 8 L10 92 L15 92 L15 8" />
        <path d="M85 8 L85 92 L90 92 L90 8" />
        {/* Stone threshold */}
        <path d="M10 88 L90 88 L90 95 L10 95 Z" />
      </g>

      {/* PRIMARY: Dutch door with top half open */}
      <g strokeWidth="0.8">
        {/* Door frame */}
        <path d="M16 10 L16 90 L84 90 L84 10 Z" strokeWidth="1" />

        {/* Upper half - OPEN (swung outward, shown at angle) */}
        <path d="M18 12 L18 48 L45 52 L72 48 L72 12 Z" />
        {/* Upper half side view showing depth */}
        <path d="M18 48 L10 46 L10 10 L18 12" />
        <path d="M10 10 L72 12 M10 46 L45 52" strokeWidth="0.5" />

        {/* Cross-brace on upper half */}
        <path d="M24 18 L66 42 M66 18 L24 42" strokeWidth="0.5" />

        {/* Window in upper half */}
        <path d="M30 20 L30 36 L60 38 L60 22 Z" />
        <path d="M45 20 L45 38 M30 28 L60 30" strokeWidth="0.4" />

        {/* Horizontal split (emphasized) */}
        <path d="M16 50 L84 50" strokeWidth="2.5" />
        <path d="M16 48 L84 48" strokeWidth="0.5" />
        <path d="M16 52 L84 52" strokeWidth="0.5" />

        {/* Shelf ledge on split */}
        <path d="M18 50 L82 50 L84 54 L16 54 Z" opacity="0.3" />

        {/* Lower half - CLOSED */}
        <path d="M18 54 L18 88 L82 88 L82 54 Z" />

        {/* Vertical planks on lower half */}
        <path d="M26 56 L26 86 M34 56 L34 86 M42 56 L42 86" strokeWidth="0.4" />
        <path d="M58 56 L58 86 M66 56 L66 86 M74 56 L74 86" strokeWidth="0.4" />

        {/* Cross-brace on lower half */}
        <path d="M22 60 L78 82 M78 60 L22 82" strokeWidth="0.5" />

        {/* Hinges on both halves */}
        <circle cx="18" cy="22" r="2.5" />
        <circle cx="18" cy="40" r="2.5" />
        <circle cx="18" cy="62" r="2.5" />
        <circle cx="18" cy="80" r="2.5" />

        {/* Hinge plates */}
        <path d="M16 20 L20 20 L20 24 L16 24" strokeWidth="0.4" />
        <path d="M16 38 L20 38 L20 42 L16 42" strokeWidth="0.4" />
        <path d="M16 60 L20 60 L20 64 L16 64" strokeWidth="0.4" />
        <path d="M16 78 L20 78 L20 82 L16 82" strokeWidth="0.4" />

        {/* Handle on lower half */}
        <path d="M74 70 L78 70 L78 74 L74 74" strokeWidth="1.2" />

        {/* Latch mechanism at split */}
        <path d="M75 48 L75 54" strokeWidth="1.5" />
        <circle cx="75" cy="51" r="2" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 4. FRENCH DOORS
// Elegant double doors with multiple glass panes opening to garden
// Reference: Versailles, Georgian townhouses, New Orleans architecture
// ============================================================================
const FrenchDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="french-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#french-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Garden terrace and balustrade */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Interior wall */}
        <path d="M5 5 L5 90 L95 90 L95 5" />
        {/* Wall paneling */}
        <path d="M8 20 L12 20 M88 20 L92 20" />
        <path d="M8 40 L12 40 M88 40 L92 40" />
        <path d="M8 60 L12 60 M88 60 L92 60" />
        {/* Stone terrace beyond */}
        <path d="M5 85 L95 85 L95 95 L5 95 Z" />
        <path d="M5 90 L95 90" />
        <path d="M20 85 L20 95 M40 85 L40 95 M60 85 L60 95 M80 85 L80 95" />
        {/* Garden balustrade suggestion */}
        <path d="M2 70 L8 70 M92 70 L98 70" />
        <circle cx="5" cy="70" r="1.5" />
        <circle cx="95" cy="70" r="1.5" />
      </g>

      {/* PRIMARY: French doors with glass panes */}
      <g strokeWidth="0.8">
        {/* Overall frame */}
        <path d="M15 8 L15 88 L85 88 L85 8 Z" strokeWidth="1.2" />

        {/* Left door */}
        <path d="M17 10 L17 86 L49 86 L49 10 Z" />
        {/* Right door */}
        <path d="M51 10 L51 86 L83 86 L83 10 Z" />

        {/* Center mullion */}
        <path d="M49 10 L49 86" strokeWidth="1.5" />
        <path d="M51 10 L51 86" strokeWidth="1.5" />

        {/* Glass panes - LEFT DOOR */}
        {/* Row 1 */}
        <path d="M21 14 L21 26 L45 26 L45 14 Z" />
        <path d="M33 14 L33 26" strokeWidth="0.5" />
        {/* Row 2 */}
        <path d="M21 30 L21 42 L45 42 L45 30 Z" />
        <path d="M33 30 L33 42" strokeWidth="0.5" />
        {/* Row 3 */}
        <path d="M21 46 L21 58 L45 58 L45 46 Z" />
        <path d="M33 46 L33 58" strokeWidth="0.5" />
        {/* Row 4 */}
        <path d="M21 62 L21 74 L45 74 L45 62 Z" />
        <path d="M33 62 L33 74" strokeWidth="0.5" />
        {/* Bottom panel */}
        <path d="M21 78 L21 82 L45 82 L45 78 Z" />

        {/* Glass panes - RIGHT DOOR */}
        {/* Row 1 */}
        <path d="M55 14 L55 26 L79 26 L79 14 Z" />
        <path d="M67 14 L67 26" strokeWidth="0.5" />
        {/* Row 2 */}
        <path d="M55 30 L55 42 L79 42 L79 30 Z" />
        <path d="M67 30 L67 42" strokeWidth="0.5" />
        {/* Row 3 */}
        <path d="M55 46 L55 58 L79 58 L79 46 Z" />
        <path d="M67 46 L67 58" strokeWidth="0.5" />
        {/* Row 4 */}
        <path d="M55 62 L55 74 L79 74 L79 62 Z" />
        <path d="M67 62 L67 74" strokeWidth="0.5" />
        {/* Bottom panel */}
        <path d="M55 78 L55 82 L79 82 L79 78 Z" />

        {/* Horizontal muntins */}
        <path d="M17 26 L49 26 M51 26 L83 26" strokeWidth="0.5" />
        <path d="M17 42 L49 42 M51 42 L83 42" strokeWidth="0.5" />
        <path d="M17 58 L49 58 M51 58 L83 58" strokeWidth="0.5" />
        <path d="M17 74 L49 74 M51 74 L83 74" strokeWidth="0.5" />

        {/* Hinges */}
        <circle cx="17" cy="20" r="2" />
        <circle cx="17" cy="50" r="2" />
        <circle cx="17" cy="78" r="2" />
        <circle cx="83" cy="20" r="2" />
        <circle cx="83" cy="50" r="2" />
        <circle cx="83" cy="78" r="2" />

        {/* Brass handles with backplates */}
        <ellipse cx="45" cy="50" rx="2" ry="4" />
        <path d="M43 48 L43 52 L47 52 L47 48 Z" strokeWidth="0.4" />
        <ellipse cx="55" cy="50" rx="2" ry="4" />
        <path d="M53 48 L53 52 L57 52 L57 48 Z" strokeWidth="0.4" />

        {/* Astragal molding at center */}
        <path d="M50 10 L50 86" strokeWidth="2" opacity="0.3" />

        {/* Threshold */}
        <path d="M15 86 L85 86 L85 88 L15 88 Z" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 5. PANEL DOOR
// Classic six-panel Georgian townhouse entrance door
// Reference: Georgian Dublin, London townhouses, Federal style Boston
// ============================================================================
const PanelDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="panel-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#panel-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Brick townhouse facade */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Brick pattern */}
        <path d="M2 5 L2 95 L98 95 L98 5" />
        <path d="M5 12 L95 12 M5 19 L95 19 M5 26 L95 26" />
        <path d="M15 5 L15 12 M35 5 L35 12 M55 5 L55 12 M75 5 L75 12 M92 5 L92 12" />
        <path d="M8 12 L8 19 M25 12 L25 19 M45 12 L45 19 M65 12 L65 19 M85 12 L85 19" />
        <path d="M15 19 L15 26 M35 19 L35 26 M55 19 L55 26 M75 19 L75 26 M92 19 L92 26" />
        {/* Side walls */}
        <path d="M5 35 L10 35 M90 35 L95 35" />
        <path d="M5 55 L10 55 M90 55 L95 55" />
        <path d="M5 75 L10 75 M90 75 L95 75" />
        {/* Stone steps */}
        <path d="M8 88 L92 88 L92 92 L8 92 Z" />
        <path d="M12 92 L88 92 L88 95 L12 95 Z" />
      </g>

      {/* PRIMARY: Georgian panel door */}
      <g strokeWidth="0.8">
        {/* Door frame with architrave */}
        <path d="M12 8 L12 90 L88 90 L88 8 Z" strokeWidth="1.2" />
        <path d="M14 10 L14 88 L86 88 L86 10 Z" strokeWidth="0.5" />

        {/* Door stiles (vertical) */}
        <path d="M18 12 L18 86 M82 12 L82 86" strokeWidth="1" />
        {/* Center stile */}
        <path d="M50 12 L50 86" strokeWidth="1" />

        {/* Door rails (horizontal) */}
        <path d="M18 12 L82 12 M18 86 L82 86" strokeWidth="1" />
        <path d="M18 30 L82 30 M18 54 L82 54" strokeWidth="0.8" />

        {/* TOP PANELS (small) */}
        {/* Top left panel */}
        <path d="M22 16 L22 26 L46 26 L46 16 Z" />
        <path d="M24 18 L24 24 L44 24 L44 18 Z" strokeWidth="0.5" />
        {/* Top right panel */}
        <path d="M54 16 L54 26 L78 26 L78 16 Z" />
        <path d="M56 18 L56 24 L76 24 L76 18 Z" strokeWidth="0.5" />

        {/* MIDDLE PANELS (medium) */}
        {/* Middle left panel */}
        <path d="M22 34 L22 50 L46 50 L46 34 Z" />
        <path d="M24 36 L24 48 L44 48 L44 36 Z" strokeWidth="0.5" />
        {/* Middle right panel */}
        <path d="M54 34 L54 50 L78 50 L78 34 Z" />
        <path d="M56 36 L56 48 L76 48 L76 36 Z" strokeWidth="0.5" />

        {/* BOTTOM PANELS (large) */}
        {/* Bottom left panel */}
        <path d="M22 58 L22 82 L46 82 L46 58 Z" />
        <path d="M24 60 L24 80 L44 80 L44 60 Z" strokeWidth="0.5" />
        {/* Bottom right panel */}
        <path d="M54 58 L54 82 L78 82 L78 58 Z" />
        <path d="M56 60 L56 80 L76 80 L76 60 Z" strokeWidth="0.5" />

        {/* Raised panel shadows */}
        <path d="M24 18 L44 18 L44 24" opacity="0.2" strokeWidth="1" />
        <path d="M56 18 L76 18 L76 24" opacity="0.2" strokeWidth="1" />
        <path d="M24 36 L44 36 L44 48" opacity="0.2" strokeWidth="1" />
        <path d="M56 36 L76 36 L76 48" opacity="0.2" strokeWidth="1" />
        <path d="M24 60 L44 60 L44 80" opacity="0.2" strokeWidth="1" />
        <path d="M56 60 L76 60 L76 80" opacity="0.2" strokeWidth="1" />

        {/* Brass door furniture */}
        {/* Knob with rosette */}
        <circle cx="75" cy="54" r="3" strokeWidth="1.2" />
        <circle cx="75" cy="54" r="5" strokeWidth="0.4" />

        {/* Keyhole escutcheon */}
        <circle cx="75" cy="60" r="2.5" strokeWidth="0.8" />
        <path d="M75 61 L75 64" strokeWidth="1" />

        {/* Letter slot */}
        <path d="M40 50 L60 50 L60 54 L40 54 Z" />
        <path d="M42 51 L58 51 L58 53 L42 53 Z" strokeWidth="0.4" />

        {/* Hinges */}
        <path d="M18 22 L14 22 L14 26 L18 26" strokeWidth="1" />
        <path d="M18 48 L14 48 L14 52 L18 52" strokeWidth="1" />
        <path d="M18 74 L14 74 L14 78 L18 78" strokeWidth="1" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 6. PIVOT DOOR
// Modern architectural statement with offset pivot and minimal frame
// Reference: Contemporary museums, high-end residential (Pivot Door Company)
// ============================================================================
const PivotDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pivot-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#pivot-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Modern minimalist entrance */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Concrete wall panels */}
        <path d="M2 5 L2 95 L98 95 L98 5" />
        <path d="M5 5 L5 92 L10 92 L10 5" />
        <path d="M90 5 L90 92 L95 92 L95 5" />
        {/* Panel seams */}
        <path d="M2 35 L10 35 M90 35 L98 35" />
        <path d="M2 65 L10 65 M90 65 L98 65" />
        {/* Polished floor */}
        <path d="M2 88 L98 88 L98 95 L2 95 Z" />
        <path d="M2 90 L98 90" />
      </g>

      {/* PRIMARY: Pivot door (shown at angle) */}
      <g strokeWidth="0.8">
        {/* Floor track/channel */}
        <path d="M15 88 L85 88 L85 92 L15 92 Z" strokeWidth="1" />
        <path d="M25 88 L25 92" strokeWidth="0.4" />

        {/* Ceiling track/header */}
        <path d="M15 8 L85 8 L85 12 L15 12 Z" strokeWidth="1" />
        <path d="M25 8 L25 12" strokeWidth="0.4" />

        {/* The door - shown rotated/pivoting (offset pivot point) */}
        {/* Door in motion - perspective view */}
        <path d="M25 12 L25 88 L75 82 L75 18 Z" strokeWidth="1.5" />

        {/* Door thickness visible at edge */}
        <path d="M25 12 L22 12 L22 88 L25 88" strokeWidth="1" />

        {/* Vertical grain/seams on door */}
        <path d="M35 14 L35 86" strokeWidth="0.4" opacity="0.6" />
        <path d="M45 15 L45 85" strokeWidth="0.4" opacity="0.6" />
        <path d="M55 16 L55 84" strokeWidth="0.4" opacity="0.6" />
        <path d="M65 17 L65 83" strokeWidth="0.4" opacity="0.6" />

        {/* Pivot mechanism at offset (not centered) */}
        {/* Top pivot - 20% from edge */}
        <circle cx="25" cy="10" r="3" strokeWidth="1.5" />
        <circle cx="25" cy="10" r="1.5" strokeWidth="0.8" />
        <path d="M23 8 L27 8 L27 12 L23 12 Z" strokeWidth="0.4" />

        {/* Bottom pivot */}
        <circle cx="25" cy="90" r="3" strokeWidth="1.5" />
        <circle cx="25" cy="90" r="1.5" strokeWidth="0.8" />
        <path d="M23 88 L27 88 L27 92 L23 92 Z" strokeWidth="0.4" />

        {/* Pivot axis line */}
        <path d="M25 12 L25 88" strokeWidth="0.3" strokeDasharray="4,2" opacity="0.5" />

        {/* Recessed handle - modern pull */}
        <path d="M68 45 L72 45 L72 55 L68 55 Z" />
        <path d="M69 47 L69 53" strokeWidth="2" />

        {/* Door swing radius indicator */}
        <path d="M25 50 Q50 30, 75 50" strokeDasharray="3,3" opacity="0.3" strokeWidth="0.5" />

        {/* Shadow cast by door */}
        <path d="M75 18 L80 22 L80 86 L75 82" opacity="0.15" strokeWidth="0" fill="currentColor" />

        {/* Minimal threshold */}
        <path d="M15 88 L85 88" strokeWidth="2" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 7. POCKET DOOR
// Victorian parlor door sliding into wall cavity
// Reference: Victorian brownstones, Edwardian homes, Carnegie Hill residences
// ============================================================================
const PocketDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pocket-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#pocket-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Victorian parlor walls and pocket */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Wall with wainscoting - left side */}
        <path d="M2 10 L2 95 L28 95 L28 10" />
        <path d="M5 60 L25 60" />
        <path d="M8 30 L8 60 M14 30 L14 60 M20 30 L20 60" strokeWidth="0.4" />
        {/* Wall - right side */}
        <path d="M62 10 L62 95 L98 95 L98 10" />
        <path d="M65 30 L95 30 M65 50 L95 50 M65 70 L95 70" />
        {/* Pocket cavity (hollow wall) */}
        <path d="M5 15 L5 90 L28 90 L28 15" />
        <path d="M8 20 L25 20 M8 85 L25 85" />
        {/* Floor */}
        <path d="M2 88 L98 88 L98 95 L2 95 Z" />
        <path d="M15 88 L15 95 M45 88 L45 95 M75 88 L75 95" />
      </g>

      {/* PRIMARY: Pocket door sliding into wall */}
      <g strokeWidth="0.8">
        {/* Opening frame */}
        <path d="M28 10 L28 92 L62 92 L62 10" strokeWidth="1" />

        {/* Track housing at top */}
        <path d="M5 10 L62 10 L62 15 L5 15 Z" strokeWidth="1.2" />
        <path d="M7 12 L60 12" strokeWidth="0.4" />

        {/* The door - partially recessed into pocket */}
        <path d="M15 17 L15 88 L52 88 L52 17 Z" strokeWidth="1.2" />

        {/* Victorian panel design */}
        {/* Top decorative panel */}
        <path d="M19 21 L19 35 L48 35 L48 21 Z" />
        <path d="M21 23 L21 33 L46 33 L46 23 Z" strokeWidth="0.5" />
        <path d="M27 26 L27 30 M33 26 L33 30 M40 26 L40 30" strokeWidth="0.4" />

        {/* Middle panel */}
        <path d="M19 39 L19 58 L48 58 L48 39 Z" />
        <path d="M21 41 L21 56 L46 56 L46 41 Z" strokeWidth="0.5" />

        {/* Bottom panel */}
        <path d="M19 62 L19 84 L48 84 L48 62 Z" />
        <path d="M21 64 L21 82 L46 82 L46 64 Z" strokeWidth="0.5" />

        {/* Raised panel details */}
        <path d="M23 43 L23 54 L44 54 L44 43" strokeWidth="0.4" opacity="0.6" />
        <path d="M23 66 L23 80 L44 80 L44 66" strokeWidth="0.4" opacity="0.6" />

        {/* Recessed pull handle (cup pull) */}
        <path d="M48 48 L52 48 L52 52 L48 52 Z" />
        <path d="M49 49 L51 49 Q51 51, 49 51" strokeWidth="1.2" />

        {/* Rollers/hangers visible at top */}
        <circle cx="22" cy="13" r="1.5" />
        <circle cx="45" cy="13" r="1.5" />
        <path d="M22 15 L22 17 M45 15 L45 17" strokeWidth="0.5" />

        {/* Track rail */}
        <path d="M7 13 L60 13" strokeWidth="1" />

        {/* Floor guide channel */}
        <path d="M10 88 L55 88 L55 90 L10 90 Z" />
        <path d="M32 88 L32 90" strokeWidth="0.4" />

        {/* Movement arrow showing slide direction */}
        <path d="M35 4 L20 4 M23 2 L20 4 L23 6" strokeDasharray="2,2" opacity="0.5" />

        {/* Decorative molding on door frame */}
        <path d="M28 10 L30 12 L30 90 L28 92" strokeWidth="0.4" />
        <path d="M62 10 L60 12 L60 90 L62 92" strokeWidth="0.4" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 8. REVOLVING DOOR
// Art Deco hotel lobby entrance with brass and glass
// Reference: Waldorf Astoria, Chrysler Building lobby, Radio City Music Hall
// ============================================================================
const RevolvingDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="revolving-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#revolving-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Art Deco lobby walls and floor */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Entrance wall - left */}
        <path d="M2 25 L2 75 L12 75 L12 25 Z" />
        <path d="M5 30 L5 70 L9 70 L9 30" />
        {/* Exit wall - right */}
        <path d="M88 25 L88 75 L98 75 L98 25 Z" />
        <path d="M91 30 L91 70 L95 70 L95 30" />
        {/* Marble floor pattern */}
        <ellipse cx="50" cy="90" rx="42" ry="5" />
        <path d="M10 90 L90 90" />
        {/* Art Deco sunburst on floor */}
        <path d="M50 85 L45 90 M50 85 L50 90 M50 85 L55 90" />
        {/* Ceiling detail */}
        <path d="M15 20 L85 20 L85 25 L15 25 Z" />
      </g>

      {/* PRIMARY: Revolving door mechanism */}
      <g strokeWidth="0.8">
        {/* Circular brass enclosure */}
        <circle cx="50" cy="50" r="38" strokeWidth="2" />
        <circle cx="50" cy="50" r="36" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="34" strokeWidth="0.5" />

        {/* Entrance curve - left */}
        <path d="M12 35 L15 35 Q15 50, 15 65 L12 65" strokeWidth="1.2" />

        {/* Exit curve - right */}
        <path d="M85 35 L88 35 Q88 50, 88 65 L85 65" strokeWidth="1.2" />

        {/* Central pivot mechanism */}
        <circle cx="50" cy="50" r="6" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="4" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="2" strokeWidth="0.5" />

        {/* Four glass door wings (at diagonal) */}
        {/* NE wing */}
        <path d="M50 50 L78 22" strokeWidth="2" />
        <path d="M52 48 L75 25 L77 27 L54 50" opacity="0.4" />

        {/* SE wing */}
        <path d="M50 50 L78 78" strokeWidth="2" />
        <path d="M52 52 L75 75 L77 73 L54 50" opacity="0.4" />

        {/* SW wing */}
        <path d="M50 50 L22 78" strokeWidth="2" />
        <path d="M48 52 L25 75 L23 73 L46 50" opacity="0.4" />

        {/* NW wing */}
        <path d="M50 50 L22 22" strokeWidth="2" />
        <path d="M48 48 L25 25 L23 27 L46 50" opacity="0.4" />

        {/* Glass panels with Art Deco etching pattern */}
        {/* NE panel etching */}
        <path d="M60 40 L65 35 M62 38 L67 33" strokeWidth="0.3" opacity="0.6" />
        {/* SE panel etching */}
        <path d="M60 60 L65 65 M62 62 L67 67" strokeWidth="0.3" opacity="0.6" />
        {/* SW panel etching */}
        <path d="M40 60 L35 65 M38 62 L33 67" strokeWidth="0.3" opacity="0.6" />
        {/* NW panel etching */}
        <path d="M40 40 L35 35 M38 38 L33 33" strokeWidth="0.3" opacity="0.6" />

        {/* Push bars on each wing */}
        <path d="M62 42 L72 32" strokeWidth="2.5" opacity="0.7" />
        <path d="M58 62 L68 72" strokeWidth="2.5" opacity="0.7" />
        <path d="M38 58 L28 68" strokeWidth="2.5" opacity="0.7" />
        <path d="M42 38 L32 28" strokeWidth="2.5" opacity="0.7" />

        {/* Speed governor ring */}
        <circle cx="50" cy="50" r="10" strokeDasharray="2,2" opacity="0.4" />

        {/* Rotation direction arrow (clockwise) */}
        <path d="M70 20 Q80 25, 82 35" strokeDasharray="2,2" opacity="0.6" />
        <path d="M80 32 L82 35 L79 36" />

        {/* Brass frame details */}
        <path d="M50 12 L50 8 M50 88 L50 92" strokeWidth="1.2" />
        <path d="M12 50 L8 50 M88 50 L92 50" strokeWidth="1.2" />

        {/* Art Deco decorative elements on enclosure */}
        <path d="M50 14 L48 18 L52 18 Z" />
        <path d="M50 86 L48 82 L52 82 Z" />
        <path d="M14 50 L18 48 L18 52 Z" />
        <path d="M86 50 L82 48 L82 52 Z" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 9. SLIDING DOOR
// Japanese shoji screen with translucent paper panels and tatami room
// Reference: Traditional Japanese architecture, Katsura Imperial Villa, machiya
// ============================================================================
const SlidingDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="sliding-halo" intensity={0.75} />}
    <g filter={showHalo ? "url(#sliding-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Japanese interior with tatami */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Room wall structure */}
        <path d="M2 8 L2 92 L98 92 L98 8" />
        {/* Wall posts (hashira) */}
        <path d="M8 10 L8 90 M92 10 L92 90" />
        {/* Tatami mat edges on floor */}
        <path d="M10 85 L48 85 M52 85 L90 85" />
        <path d="M10 88 L90 88 L90 95 L10 95 Z" />
        <path d="M30 85 L30 95 M50 85 L50 95 M70 85 L70 95" />
        {/* Adjacent shoji visible in background */}
        <path d="M5 15 L8 15 M92 15 L95 15" />
        <path d="M5 35 L8 35 M92 35 L95 35" />
        <path d="M5 55 L8 55 M92 55 L95 55" />
      </g>

      {/* PRIMARY: Shoji sliding screen doors */}
      <g strokeWidth="0.8">
        {/* Upper track (kamoi) */}
        <path d="M10 10 L90 10 L90 15 L10 15 Z" strokeWidth="1.2" />
        <path d="M12 12 L88 12" strokeWidth="0.4" />

        {/* Lower track (shikii) */}
        <path d="M10 85 L90 85 L90 88 L10 88 Z" strokeWidth="1.2" />
        <path d="M12 86 L88 86" strokeWidth="0.4" />

        {/* Left shoji panel (closed position) */}
        <path d="M12 15 L12 85 L48 85 L48 15 Z" strokeWidth="1" />

        {/* Right shoji panel (slightly open) */}
        <path d="M52 15 L52 85 L88 85 L88 15 Z" strokeWidth="1" />

        {/* Kumiko lattice pattern - LEFT PANEL */}
        {/* Vertical muntins */}
        <path d="M20 17 L20 83" strokeWidth="0.6" />
        <path d="M28 17 L28 83" strokeWidth="0.6" />
        <path d="M36 17 L36 83" strokeWidth="0.6" />
        <path d="M44 17 L44 83" strokeWidth="0.6" />

        {/* Horizontal muntins */}
        <path d="M12 25 L48 25" strokeWidth="0.6" />
        <path d="M12 35 L48 35" strokeWidth="0.6" />
        <path d="M12 45 L48 45" strokeWidth="0.6" />
        <path d="M12 55 L48 55" strokeWidth="0.6" />
        <path d="M12 65 L48 65" strokeWidth="0.6" />
        <path d="M12 75 L48 75" strokeWidth="0.6" />

        {/* Kumiko lattice pattern - RIGHT PANEL */}
        {/* Vertical muntins */}
        <path d="M60 17 L60 83" strokeWidth="0.6" />
        <path d="M68 17 L68 83" strokeWidth="0.6" />
        <path d="M76 17 L76 83" strokeWidth="0.6" />
        <path d="M84 17 L84 83" strokeWidth="0.6" />

        {/* Horizontal muntins */}
        <path d="M52 25 L88 25" strokeWidth="0.6" />
        <path d="M52 35 L88 35" strokeWidth="0.6" />
        <path d="M52 45 L88 45" strokeWidth="0.6" />
        <path d="M52 55 L88 55" strokeWidth="0.6" />
        <path d="M52 65 L88 65" strokeWidth="0.6" />
        <path d="M52 75 L88 75" strokeWidth="0.6" />

        {/* Outer frame (stiles and rails) - LEFT */}
        <path d="M14 17 L14 83 M46 17 L46 83" strokeWidth="1" />
        <path d="M14 17 L46 17 M14 83 L46 83" strokeWidth="1" />

        {/* Outer frame - RIGHT */}
        <path d="M54 17 L54 83 M86 17 L86 83" strokeWidth="1" />
        <path d="M54 17 L86 17 M54 83 L86 83" strokeWidth="1" />

        {/* Paper (washi) texture suggestion */}
        <path d="M16 20 L18 22 M32 42 L34 44 M40 68 L42 70" strokeWidth="0.3" opacity="0.3" />
        <path d="M64 28 L66 30 M72 52 L74 54 M80 72 L82 74" strokeWidth="0.3" opacity="0.3" />

        {/* Recessed finger pulls (hikite) */}
        <circle cx="44" cy="50" r="3" strokeWidth="0.8" />
        <path d="M42 50 L46 50" strokeWidth="0.4" />

        <circle cx="56" cy="50" r="3" strokeWidth="0.8" />
        <path d="M54 50 L58 50" strokeWidth="0.4" />

        {/* Track grooves */}
        <path d="M25 10 L25 15 M40 10 L40 15 M65 10 L65 15 M80 10 L80 15" strokeWidth="0.3" opacity="0.5" />

        {/* Movement indicator */}
        <path d="M95 50 L85 50 M88 48 L85 50 L88 52" strokeDasharray="2,2" opacity="0.5" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 10. STABLE DOOR
// English country stable with horse visible over lower door
// Reference: English countryside, equestrian estates, Cotswolds stables
// ============================================================================
const StableDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="stable-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#stable-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Stable building and straw */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Brick stable wall */}
        <path d="M2 5 L2 95 L98 95 L98 5" />
        <path d="M5 15 L95 15 M5 25 L95 25 M5 35 L95 35" />
        <path d="M15 5 L15 15 M35 5 L35 15 M55 5 L55 15 M75 5 L75 15 M92 5 L92 15" />
        <path d="M8 15 L8 25 M25 15 L25 25 M45 15 L45 25 M65 15 L65 25 M85 15 L85 25" />
        {/* Side walls */}
        <path d="M5 45 L10 45 M90 45 L95 45" />
        <path d="M5 65 L10 65 M90 65 L95 65" />
        {/* Cobblestone threshold */}
        <path d="M10 88 L90 88 L90 95 L10 95 Z" />
        <path d="M15 90 L18 92 M22 89 L25 91 M28 90 L31 92" />
        <path d="M72 90 L75 92 M78 89 L81 91 M85 90 L88 92" />
        {/* Hay/straw on floor inside */}
        <path d="M15 80 L20 82 M18 78 L23 80" />
        <path d="M75 80 L80 82 M78 78 L83 80" />
      </g>

      {/* PRIMARY: Stable door with horse visible */}
      <g strokeWidth="0.8">
        {/* Door frame */}
        <path d="M12 8 L12 90 L88 90 L88 8 Z" strokeWidth="1.2" />

        {/* UPPER HALF - OPEN (showing horse) */}
        <path d="M14 10 L14 48 L86 48 L86 10 Z" strokeWidth="1" />

        {/* Upper door swung outward - side view */}
        <path d="M5 15 L14 10 L14 48 L5 52 Z" />
        <path d="M5 15 L5 52" strokeWidth="1.2" />

        {/* Vertical planks on upper door */}
        <path d="M7 17 L7 50 M9 16 L9 51 M11 15 L11 50" strokeWidth="0.4" />

        {/* Horse head visible in opening */}
        {/* Horse head shape */}
        <path d="M35 20 Q30 18, 28 22 L28 32 Q30 38, 38 40 Q45 38, 50 35 L52 28 Q52 22, 48 18 Q42 16, 35 20" />

        {/* Horse features */}
        <circle cx="42" cy="28" r="2" />
        <path d="M38 35 Q40 37, 42 35" />
        {/* Mane */}
        <path d="M35 20 L32 18 L30 22" strokeWidth="0.5" />
        <path d="M38 18 L36 16 L35 20" strokeWidth="0.5" />
        {/* Ears */}
        <path d="M38 18 L36 14 L40 18" strokeWidth="0.5" />
        <path d="M44 18 L46 14 L42 18" strokeWidth="0.5" />
        {/* Bridle */}
        <path d="M28 28 L35 28 Q40 28, 42 32" strokeWidth="0.5" />

        {/* Horizontal split rail (emphasized) */}
        <path d="M12 48 L88 48" strokeWidth="3" />
        <path d="M12 50 L88 50" strokeWidth="0.5" />

        {/* Ledge on lower door */}
        <path d="M14 48 L86 48 L88 52 L12 52 Z" opacity="0.3" />

        {/* LOWER HALF - CLOSED */}
        <path d="M14 52 L14 88 L86 88 L86 52 Z" strokeWidth="1.2" />

        {/* Vertical planks on lower door */}
        <path d="M22 54 L22 86" strokeWidth="0.5" />
        <path d="M30 54 L30 86" strokeWidth="0.5" />
        <path d="M38 54 L38 86" strokeWidth="0.5" />
        <path d="M46 54 L46 86" strokeWidth="0.5" />
        <path d="M54 54 L54 86" strokeWidth="0.5" />
        <path d="M62 54 L62 86" strokeWidth="0.5" />
        <path d="M70 54 L70 86" strokeWidth="0.5" />
        <path d="M78 54 L78 86" strokeWidth="0.5" />

        {/* Diagonal bracing on lower door */}
        <path d="M18 56 L82 82 M82 56 L18 82" strokeWidth="0.6" opacity="0.6" />

        {/* Iron strap hinges - upper door */}
        <path d="M14 18 L5 18" strokeWidth="2" />
        <circle cx="8" cy="18" r="1.5" />
        <path d="M14 40 L5 42" strokeWidth="2" />
        <circle cx="8" cy="41" r="1.5" />

        {/* Iron strap hinges - lower door */}
        <circle cx="14" cy="60" r="2" strokeWidth="1.5" />
        <path d="M16 60 L30 60" strokeWidth="2" />
        <circle cx="14" cy="78" r="2" strokeWidth="1.5" />
        <path d="M16 78 L30 78" strokeWidth="2" />

        {/* Handle on lower door */}
        <path d="M78 70 L82 70 L82 68 L78 68" strokeWidth="1.5" />

        {/* Latch hook for upper door */}
        <circle cx="80" cy="25" r="2" />
        <path d="M82 25 L86 25" strokeWidth="1" />

        {/* Bolt slide on lower door */}
        <path d="M75 56 L82 56" strokeWidth="1.2" />
        <circle cx="78" cy="56" r="1.5" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 11. TRAPDOOR
// Medieval castle floor hatch with iron reinforcement and stone surroundings
// Reference: European castles, dungeons, Tower of London, Château de Pierrefonds
// ============================================================================
const TrapdoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="trapdoor-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#trapdoor-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Stone castle floor and walls */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        {/* Stone floor flagstones */}
        <path d="M2 2 L2 98 L98 98 L98 2 Z" />
        <path d="M2 25 L35 25 M40 25 L98 25" />
        <path d="M2 55 L60 55 M65 55 L98 55" />
        <path d="M2 78 L45 78 M50 78 L98 78" />
        <path d="M35 2 L35 25 M60 2 L60 25" />
        <path d="M15 25 L15 55 M75 25 L75 55" />
        <path d="M30 55 L30 78 M85 55 L85 78" />
        <path d="M20 78 L20 98 M70 78 L70 98" />
        {/* Stone texture marks */}
        <path d="M8 10 L12 14 M50 8 L54 12 M82 15 L86 19" />
        <path d="M10 62 L14 66 M55 68 L59 72 M88 62 L92 66" />
        {/* Wall edge visible */}
        <path d="M2 2 L8 8 L92 8 L98 2" />
      </g>

      {/* PRIMARY: Trapdoor with iron reinforcement */}
      <g strokeWidth="0.8">
        {/* Stone frame around trapdoor opening */}
        <path d="M25 25 L25 75 L75 75 L75 25 Z" strokeWidth="1.5" />
        <path d="M27 27 L27 73 L73 73 L73 27 Z" strokeWidth="0.5" />

        {/* The trapdoor itself (partially open at angle) */}
        {/* Door shown lifted on hinges */}
        <path d="M30 30 L30 70 L50 50 L70 30 Z" strokeWidth="1.2" />

        {/* Heavy wooden planks */}
        <path d="M32 32 L32 68 L48 50 L68 32 Z" />
        <path d="M35 34 L35 66 M38 36 L38 64 M41 38 L41 62" strokeWidth="0.5" />
        <path d="M44 40 L44 60 M47 42 L47 58" strokeWidth="0.5" />

        {/* Iron reinforcement straps */}
        {/* Horizontal straps */}
        <path d="M30 40 L50 35 L68 40" strokeWidth="2" />
        <path d="M30 50 L70 50" strokeWidth="2" />
        <path d="M32 60 L50 57 L68 60" strokeWidth="2" />

        {/* Iron rivets on straps */}
        <circle cx="33" cy="40" r="1" />
        <circle cx="40" cy="39" r="1" />
        <circle cx="47" cy="38" r="1" />
        <circle cx="54" cy="39" r="1" />
        <circle cx="61" cy="40" r="1" />

        <circle cx="35" cy="50" r="1" />
        <circle cx="43" cy="50" r="1" />
        <circle cx="50" cy="50" r="1" />
        <circle cx="57" cy="50" r="1" />
        <circle cx="65" cy="50" r="1" />

        {/* Iron hinges at left edge */}
        <path d="M25 35 L30 35 L32 37" strokeWidth="2.5" />
        <circle cx="28" cy="35" r="2" />
        <path d="M25 65 L30 65 L32 63" strokeWidth="2.5" />
        <circle cx="28" cy="65" r="2" />

        {/* Hinge pins */}
        <circle cx="25" cy="35" r="1.5" strokeWidth="1.2" />
        <circle cx="25" cy="65" r="1.5" strokeWidth="1.2" />

        {/* Iron ring handle */}
        <circle cx="60" cy="55" r="6" strokeWidth="2" />
        <circle cx="60" cy="55" r="4" strokeWidth="0.5" />
        <path d="M60 49 L60 47" strokeWidth="1.5" />

        {/* Lock mechanism */}
        <path d="M65 44 L70 44 L70 48 L65 48 Z" strokeWidth="1" />
        <circle cx="67" cy="46" r="1.5" />
        <path d="M67 47 L67 50" strokeWidth="0.8" />

        {/* Opening below showing ladder descending */}
        <path d="M50 50 L70 70 L70 75 L50 75" />

        {/* Ladder rungs visible in opening */}
        <path d="M55 70 L55 75 M65 70 L65 75" strokeWidth="1" />
        <path d="M55 72 L65 72" strokeWidth="0.8" />
        <path d="M55 74 L65 74" strokeWidth="0.8" />

        {/* Shadow in opening */}
        <path d="M52 52 L68 68 L68 73 L52 73 Z" opacity="0.2" strokeWidth="0" fill="currentColor" />

        {/* Stone wear marks around edge */}
        <path d="M28 28 L32 32 M72 28 L68 32" strokeWidth="0.4" opacity="0.5" />
        <path d="M28 72 L32 68 M72 72 L68 68" strokeWidth="0.4" opacity="0.5" />

        {/* Support chain (when open) */}
        <path d="M70 30 L75 25 L75 20" strokeDasharray="2,1" strokeWidth="1.2" />
        <circle cx="75" cy="20" r="2" />

        {/* Metal corner reinforcements */}
        <path d="M30 30 L35 30 L30 35" strokeWidth="1.2" />
        <path d="M30 70 L35 70 L30 65" strokeWidth="1.2" />
      </g>
    </g>
  </svg>
)

// Export mapping for all door elements
export const DOOR_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'arched': ArchedDoorSVG,
  'bifold': BifoldDoorSVG,
  'dutch': DutchDoorSVG,
  'french': FrenchDoorSVG,
  'panel': PanelDoorSVG,
  'pivot': PivotDoorSVG,
  'pocket': PocketDoorSVG,
  'revolving': RevolvingDoorSVG,
  'sliding': SlidingDoorSVG,
  'stable': StableDoorSVG,
  'trapdoor': TrapdoorSVG,
}

export {
  ArchedDoorSVG,
  BifoldDoorSVG,
  DutchDoorSVG,
  FrenchDoorSVG,
  PanelDoorSVG,
  PivotDoorSVG,
  PocketDoorSVG,
  RevolvingDoorSVG,
  SlidingDoorSVG,
  StableDoorSVG,
  TrapdoorSVG,
}
