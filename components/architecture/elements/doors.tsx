'use client'

import React from 'react'
import { S } from './svgStyleTokens'

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
// Romanesque church portal with multiple receding archivolts and sculpted tympanum
// Reference: Moissac Abbey (France), Vézelay Basilica, Autun Cathedral portal
// ============================================================================
const ArchedDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="arched-halo" intensity={1} />}
    <g filter={showHalo ? "url(#arched-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Massive Romanesque church facade with twin towers hint */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Tower masses flanking portal */}
        <path d="M-8 -5 L-8 98 L6 98 L6 -5 Z" />
        <path d="M94 -5 L94 98 L108 98 L108 -5 Z" />
        {/* Tower window slits */}
        <path d="M-2 15 L-2 25" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M100 15 L100 25" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-2 40 L-2 50" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M100 40 L100 50" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Rose window above portal — radiating spokes */}
        <circle cx="50" cy="-3" r="14" />
        <circle cx="50" cy="-3" r="10" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M50 -17 L50 11 M36 -3 L64 -3" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M40 -13 L60 7 M60 -13 L40 7" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Blind arcade above portal (Romanesque wall decoration) */}
        <path d="M10 -5 Q20 -10 30 -5" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M70 -5 Q80 -10 90 -5" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Ascending stone steps — wide ceremonial */}
        <path d="M0 95 L100 95" />
        <path d="M3 92 L97 92" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M6 89 L94 89" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY: Deep Romanesque portal with 4 receding archivolt orders */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Outermost arch (1st order) — heavy stone */}
        <path d="M6 89 L6 38 Q50 2, 94 38 L94 89" strokeWidth={S.P.strokeWidthBold} />
        {/* 2nd archivolt order */}
        <path d="M13 87 L13 40 Q50 9, 87 40 L87 87" strokeWidth={S.P.strokeWidth} />
        {/* 3rd archivolt order */}
        <path d="M20 85 L20 42 Q50 16, 80 42 L80 85" strokeWidth={S.P.strokeWidthLight} />
        {/* 4th archivolt (innermost) */}
        <path d="M27 83 L27 44 Q50 22, 73 44 L73 83" strokeWidth={S.D.strokeWidth} />

        {/* Carved ornament bands on archivolts — zigzag (chevron) Romanesque motif */}
        <path d="M10 50 L12 47 L14 50 L16 47 L18 50" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />
        <path d="M82 50 L84 47 L86 50 L88 47 L90 50" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />
        {/* Billet mold pattern on 2nd order */}
        <path d="M15 55 L16 55 M17 55 L18 55 M19 55 L20 55" strokeWidth={S.P.strokeWidthLight} opacity={S.D.opacity} />
        <path d="M80 55 L81 55 M82 55 L83 55 M84 55 L85 55" strokeWidth={S.P.strokeWidthLight} opacity={S.D.opacity} />

        {/* Voussoir stones radiating in arch */}
        <path d="M50 18 L50 25" strokeWidth={S.D.strokeWidth} />
        <path d="M42 20 L43 27" strokeWidth={S.D.strokeWidthFine} />
        <path d="M58 20 L57 27" strokeWidth={S.D.strokeWidthFine} />
        <path d="M35 25 L37 32" strokeWidth={S.D.strokeWidthFine} />
        <path d="M65 25 L63 32" strokeWidth={S.D.strokeWidthFine} />

        {/* Keystone — trapezoidal */}
        <path d="M47 17 L47 26 L53 26 L53 17 Z" strokeWidth={S.D.strokeWidth} />

        {/* TYMPANUM — carved scene above lintel (Christ in Majesty) */}
        <path d="M29 46 L73 46" strokeWidth={S.P.strokeWidthLight} />
        {/* Mandorla (almond shape around central figure) */}
        <ellipse cx="51" cy="36" rx="10" ry="9" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        {/* Central figure suggestion */}
        <path d="M51 30 L51 42" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M46 35 L56 35" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        {/* Surrounding carved figures */}
        <path d="M33 38 L33 45 M38 36 L38 45 M64 36 L64 45 M69 38 L69 45" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* TRUMEAU — central pillar dividing doorway */}
        <path d="M48 46 L48 83 L52 83 L52 46" strokeWidth={S.P.strokeWidthLight} />
        {/* Trumeau carved figure */}
        <path d="M50 52 L50 78" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <circle cx="50" cy="50" r="2" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Jamb columns — colonettes (slender columns in reveals) */}
        <path d="M27 46 L27 83 L31 83 L31 46" strokeWidth={S.D.strokeWidth} />
        <path d="M69 46 L69 83 L73 83 L73 46" strokeWidth={S.D.strokeWidth} />
        {/* Jamb column capitals — carved leaf pattern */}
        <path d="M25 44 L33 44 L33 46 L25 46" strokeWidth={S.D.strokeWidth} />
        <path d="M67 44 L75 44 L75 46 L67 46" strokeWidth={S.D.strokeWidth} />
        <path d="M27 44 L29 42 L31 44" strokeWidth={S.E.strokeWidth} opacity={S.D.opacity} />
        <path d="M69 44 L71 42 L73 44" strokeWidth={S.E.strokeWidth} opacity={S.D.opacity} />

        {/* Double doors — heavy oak with iron */}
        <path d="M33 48 L33 83 L47 83 L47 48 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M53 48 L53 83 L67 83 L67 48 Z" strokeWidth={S.D.strokeWidth} />

        {/* Iron strap hinges — decorative Romanesque with fleur-de-lis ends */}
        <path d="M27 56 L44 56" strokeWidth={S.P.strokeWidthBold} />
        <path d="M28 56 L35 53 M28 56 L35 59" strokeWidth={S.D.strokeWidth} />
        <path d="M27 70 L44 70" strokeWidth={S.P.strokeWidthBold} />
        <path d="M28 70 L35 67 M28 70 L35 73" strokeWidth={S.D.strokeWidth} />
        <path d="M73 56 L56 56" strokeWidth={S.P.strokeWidthBold} />
        <path d="M72 56 L65 53 M72 56 L65 59" strokeWidth={S.D.strokeWidth} />
        <path d="M73 70 L56 70" strokeWidth={S.P.strokeWidthBold} />

        {/* Iron ring pull handles */}
        <circle cx="44" cy="63" r="3.5" strokeWidth={S.P.strokeWidth} />
        <path d="M44 59 L44 58" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="56" cy="63" r="3.5" strokeWidth={S.P.strokeWidth} />
        <path d="M56 59 L56 58" strokeWidth={S.P.strokeWidthLight} />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 2. BIFOLD DOOR
// Modern exterior patio bifold with aluminum-framed glass panels in concertina fold
// Reference: Origin Bifolds, Schuco ASS 70 FD, contemporary open-plan living
// ============================================================================
const BifoldDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="bifold-halo" intensity={0.75} />}
    <g filter={showHalo ? "url(#bifold-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Modern open-plan room opening to patio/garden */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Flat modern roof/soffit with clean edge */}
        <path d="M-5 6 L105 6" />
        {/* Recessed ceiling with downlights */}
        <circle cx="15" cy="3" r="1" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <circle cx="85" cy="3" r="1" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Interior: polished concrete floor */}
        <path d="M-5 92 L105 92" strokeWidth={S.CN.strokeWidthFine} />
        {/* Floor control joints */}
        <path d="M-5 94 L20 94 M80 94 L105 94" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Planter box on deck */}
        <path d="M30 90 L42 90 L42 93 L30 93 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* CONTEXT (far): Garden and deck beyond opening */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        {/* Timber deck beyond opening */}
        <path d="M25 93 L75 93" />
        <path d="M25 95 L75 95 M25 97 L75 97 M25 99 L75 99" strokeWidth={S.CF.strokeWidthFine} />

        {/* Garden beyond — tree silhouette */}
        <path d="M60 70 Q65 50 70 55 Q75 45 80 60 Q85 50 82 70" />
        <path d="M72 70 L72 85" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
      </g>

      {/* PRIMARY: 5-panel bifold partly open in concertina fold */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Aluminum head track */}
        <path d="M5 8 L95 8" strokeWidth={S.P.strokeWidthBold} />
        <path d="M5 10 L95 10" strokeWidth={S.D.strokeWidthFine} />

        {/* Bottom sill/threshold — flush */}
        <path d="M5 90 L95 90" strokeWidth={S.P.strokeWidth} />
        <path d="M5 92 L95 92" strokeWidth={S.D.strokeWidthFine} />

        {/* Panel 1 (far left, flat against wall — closed position) */}
        <path d="M5 10 L5 90 L22 90 L22 10 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Glass pane */}
        <path d="M7 13 L7 87 L20 87 L20 13 Z" strokeWidth={S.D.strokeWidthFine} />
        {/* Horizontal transom bar */}
        <path d="M7 35 L20 35" strokeWidth={S.D.strokeWidth} />

        {/* Panel 2 (folding — shown at angle, V-shape with panel 3) */}
        <path d="M22 10 L22 90 L35 88 L38 12 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M24 14 L24 86 L33 85 L36 15 Z" strokeWidth={S.D.strokeWidthFine} />
        <path d="M24 35 L35 35" strokeWidth={S.D.strokeWidth} />

        {/* Panel 3 (folding back — creates V with panel 2) */}
        <path d="M38 12 L35 88 L50 90 L50 10 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M40 15 L37 85 L48 87 L48 13 Z" strokeWidth={S.D.strokeWidthFine} />
        <path d="M39 35 L48 35" strokeWidth={S.D.strokeWidth} />

        {/* Hinge connection between panel 2 and 3 (the fold point) */}
        <path d="M37 12 L36 88" strokeWidth={S.P.strokeWidth} />
        <circle cx="37" cy="12" r="1.5" strokeWidth={S.D.strokeWidth} />
        <circle cx="36" cy="88" r="1.5" strokeWidth={S.D.strokeWidth} />

        {/* Panel 4 (mostly open — swung wide) */}
        <path d="M50 10 L50 90 L68 88 L65 12 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M52 13 L52 87 L66 86 L63 15 Z" strokeWidth={S.D.strokeWidthFine} />
        <path d="M52 35 L64 35" strokeWidth={S.D.strokeWidth} />

        {/* Panel 5 (traffic door — swung fully open perpendicular) */}
        <path d="M68 12 L65 88 L78 85 L80 15 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M70 16 L67 84 L76 82 L78 18 Z" strokeWidth={S.D.strokeWidthFine} />
        <path d="M69 35 L77 35" strokeWidth={S.D.strokeWidth} />

        {/* Hinge between panels 4 and 5 */}
        <path d="M66 12 L66 88" strokeWidth={S.P.strokeWidth} />
        <circle cx="66" cy="12" r="1.5" strokeWidth={S.D.strokeWidth} />
        <circle cx="66" cy="88" r="1.5" strokeWidth={S.D.strokeWidth} />

        {/* Fixed hinge at panel 1 junction */}
        <circle cx="22" cy="10" r="1.5" strokeWidth={S.D.strokeWidth} />
        <circle cx="22" cy="90" r="1.5" strokeWidth={S.D.strokeWidth} />

        {/* Top guide rollers on track */}
        <circle cx="8" cy="9" r="1" strokeWidth={S.D.strokeWidth} />
        <circle cx="37" cy="9" r="1" strokeWidth={S.D.strokeWidth} />
        <circle cx="66" cy="9" r="1" strokeWidth={S.D.strokeWidth} />

        {/* D-handle on traffic door (panel 5) */}
        <path d="M73 48 L76 48 L76 56 L73 56" strokeWidth={S.P.strokeWidthLight} />

        {/* Open space beyond (garden visible through gap) */}
        <path d="M82 30 L95 30" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} strokeDasharray="2 2" />
        <path d="M85 50 L95 50" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} strokeDasharray="2 2" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 3. DUTCH DOOR
// Colonial farmhouse split door — top half open for air, bottom keeps animals out
// Reference: Colonial Williamsburg, Pennsylvania Dutch barns, New Amsterdam houses
// ============================================================================
const DutchDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="dutch-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#dutch-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Dutch Colonial farmhouse with gambrel roof and kitchen garden */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Distinctive GAMBREL ROOF — double slope on each side */}
        <path d="M-5 8 L20 -5 L50 -12 L80 -5 L105 8" />
        <path d="M-5 8 L20 2 L50 -2 L80 2 L105 8" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Eave overhang with exposed rafter tails */}
        <path d="M-8 10 L108 10" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M5 8 L5 10 M20 6 L20 10 M80 6 L80 10 M95 8 L95 10" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Clapboard siding — weathered horizontal boards */}
        <path d="M-5 18 L12 18 M88 18 L105 18" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-5 26 L12 26 M88 26 L105 26" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-5 34 L12 34 M88 34 L105 34" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-5 55 L12 55 M88 55 L105 55" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-5 70 L12 70 M88 70 L105 70" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Small 6-over-6 sash window on left */}
        <path d="M-3 30 L7 30 L7 50 L-3 50 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M2 30 L2 50 M-3 40 L7 40" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Brick chimney on right */}
        <path d="M96 -8 L96 5 L102 5 L102 -8 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Brick foundation visible at base */}
        <path d="M-5 85 L12 85 M88 85 L105 85" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M-3 85 L-3 98 M1 85 L1 98 M5 85 L5 98 M9 85 L9 98" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M91 85 L91 98 M95 85 L95 98 M99 85 L99 98 M103 85 L103 98" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Flagstone path to door */}
        <path d="M35 95 Q40 93 45 95 Q50 97 55 95 Q60 93 65 95" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Picket fence hint on right */}
        <path d="M92 80 L92 90 M95 80 L95 90 M98 80 L98 90" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M90 83 L100 83" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Cat sitting on step */}
        <path d="M78 88 Q80 84 82 86 Q84 82 83 88" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY: Dutch door with top half swung open */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Door frame with wide colonial casing */}
        <path d="M14 10 L14 92 L86 92 L86 10 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M12 8 L12 92 L88 92 L88 8 Z" strokeWidth={S.D.strokeWidth} />
        {/* Head casing / lintel */}
        <path d="M12 8 L88 8 L88 12 L12 12 Z" strokeWidth={S.D.strokeWidth} />

        {/* ===== UPPER HALF — SWUNG OPEN (perspective view) ===== */}
        {/* Top half swung outward showing 3D depth */}
        <path d="M16 14 L16 48 L50 54 L78 48 L78 14 Z" strokeWidth={S.D.strokeWidth} />
        {/* Side edge of door visible (thickness ~3 inches) */}
        <path d="M16 48 L8 46 L8 12 L16 14" strokeWidth={S.D.strokeWidth} />
        <path d="M8 12 L78 14" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M8 46 L50 54" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

        {/* Nine-lite window in upper half (3x3 panes) */}
        <path d="M24 18 L24 42 L70 44 L70 18 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M39 18 L39 43 M54 18 L54 43" strokeWidth={S.D.strokeWidthFine} />
        <path d="M24 26 L70 27 M24 34 L70 36" strokeWidth={S.D.strokeWidthFine} />

        {/* ===== HORIZONTAL SPLIT — the key feature ===== */}
        <path d="M14 50 L86 50" strokeWidth={S.P.strokeWidthHeavy} />
        {/* Shelf ledge formed at split */}
        <path d="M16 50 L84 50 L86 54 L14 54" strokeWidth={S.D.strokeWidth} />
        <path d="M14 54 L86 54" strokeWidth={S.D.strokeWidth} />

        {/* ===== LOWER HALF — CLOSED ===== */}
        <path d="M16 54 L16 90 L84 90 L84 54 Z" strokeWidth={S.P.strokeWidthLight} />

        {/* Two raised panels on lower half */}
        <path d="M22 58 L22 86 L48 86 L48 58 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M24 60 L24 84 L46 84 L46 60 Z" strokeWidth={S.D.strokeWidthFine} />
        <path d="M52 58 L52 86 L78 86 L78 58 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M54 60 L54 84 L76 84 L76 60 Z" strokeWidth={S.D.strokeWidthFine} />

        {/* Raised panel shadow on lower panels */}
        <path d="M24 60 L46 60 L46 84" opacity="0.2" strokeWidth={S.P.strokeWidthLight} />
        <path d="M54 60 L76 60 L76 84" opacity="0.2" strokeWidth={S.P.strokeWidthLight} />

        {/* Heavy iron strap hinges — both halves on left side */}
        <path d="M14 24 L8 24" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="10" cy="24" r="2" strokeWidth={S.P.strokeWidthLight} />
        <path d="M14 40 L8 42" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="10" cy="41" r="2" strokeWidth={S.P.strokeWidthLight} />
        <path d="M14 64 L16 64 L30 64" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="14" cy="64" r="2" strokeWidth={S.P.strokeWidthLight} />
        <path d="M14 82 L16 82 L30 82" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="14" cy="82" r="2" strokeWidth={S.P.strokeWidthLight} />

        {/* Sliding bolt latch connecting the two halves */}
        <path d="M76 48 L76 56" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="76" cy="52" r="2.5" strokeWidth={S.D.strokeWidth} />
        {/* Thumb latch on lower half */}
        <path d="M78 70 L82 70 L82 74 L78 74 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M80 70 L80 67" strokeWidth={S.D.strokeWidth} />

        {/* Threshold — worn stone */}
        <path d="M14 90 L86 90 L88 93 L12 93 Z" strokeWidth={S.D.strokeWidth} />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 4. FRENCH DOORS
// Tall double doors with authentic divided lites and arched transom above
// Reference: Haussmann Paris apartments, New Orleans Garden District, Marvin doors
// ============================================================================
const FrenchDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="french-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#french-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Haussmann-style Parisian interior — herringbone floor, ornate ceiling */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Ornate ceiling with cove molding and medallion */}
        <path d="M-5 2 L105 2" />
        <path d="M-5 4 L105 4" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-3 2 Q0 5 3 2" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M97 2 Q100 5 103 2" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Ceiling rose hint above */}
        <circle cx="50" cy="-5" r="6" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Tall flanking walls with chair rail and picture frame */}
        <path d="M-5 2 L-5 98" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M105 2 L105 98" strokeWidth={S.CN.strokeWidthFine} />
        {/* Chair rail */}
        <path d="M-5 55 L10 55" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M90 55 L105 55" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Picture frame on left wall */}
        <path d="M-3 20 L7 20 L7 45 L-3 45 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Herringbone parquet floor */}
        <path d="M-5 92 L105 92" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M10 92 L14 95 L10 98 M18 92 L22 95 L18 98 M26 92 L30 95 L26 98" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M70 92 L74 95 L70 98 M78 92 L82 95 L78 98 M86 92 L90 95 L86 98" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Iron Juliet balcony railing beyond doors */}
        <path d="M15 90 L85 90 L85 95 L15 95" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Ornamental ironwork scrolls */}
        <path d="M25 90 Q25 93 30 93 Q35 93 35 90" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M45 90 Q45 93 50 93 Q55 93 55 90" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M65 90 Q65 93 70 93 Q75 93 75 90" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* CONTEXT (far): Paris rooftop view beyond balcony */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        <path d="M30 98 L35 96 L40 98 L45 95 L50 98" />
      </g>

      {/* PRIMARY: French doors with arched transom and divided lites */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Arched transom window above doors */}
        <path d="M12 5 Q50 -8 88 5 L88 18 L12 18 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Transom glazing bars — radiating fan pattern */}
        <path d="M50 -4 L50 18" strokeWidth={S.D.strokeWidth} />
        <path d="M50 -4 L28 18" strokeWidth={S.D.strokeWidthFine} />
        <path d="M50 -4 L72 18" strokeWidth={S.D.strokeWidthFine} />
        <path d="M50 -4 L18 12" strokeWidth={S.E.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M50 -4 L82 12" strokeWidth={S.E.strokeWidth} opacity={S.D.opacityStrong} />
        {/* Horizontal transom bar */}
        <path d="M16 10 L84 10" strokeWidth={S.D.strokeWidthFine} />

        {/* Main door frame */}
        <path d="M12 18 L12 90 L88 90 L88 18 Z" strokeWidth={S.P.strokeWidth} />

        {/* Left door — 10-lite (5 rows x 2 columns) */}
        <path d="M14 20 L14 88 L49 88 L49 20 Z" strokeWidth={S.D.strokeWidth} />
        {/* Vertical muntin */}
        <path d="M31 22 L31 76" strokeWidth={S.D.strokeWidth} />
        {/* Horizontal muntins */}
        <path d="M16 32 L47 32" strokeWidth={S.D.strokeWidth} />
        <path d="M16 43 L47 43" strokeWidth={S.D.strokeWidth} />
        <path d="M16 54 L47 54" strokeWidth={S.D.strokeWidth} />
        <path d="M16 65 L47 65" strokeWidth={S.D.strokeWidth} />
        <path d="M16 76 L47 76" strokeWidth={S.D.strokeWidth} />
        {/* Bottom rail (solid, no glass) */}
        <path d="M16 80 L47 80 L47 86 L16 86 Z" strokeWidth={S.D.strokeWidthFine} />

        {/* Right door — 10-lite (5 rows x 2 columns) */}
        <path d="M51 20 L51 88 L86 88 L86 20 Z" strokeWidth={S.D.strokeWidth} />
        {/* Vertical muntin */}
        <path d="M69 22 L69 76" strokeWidth={S.D.strokeWidth} />
        {/* Horizontal muntins */}
        <path d="M53 32 L84 32" strokeWidth={S.D.strokeWidth} />
        <path d="M53 43 L84 43" strokeWidth={S.D.strokeWidth} />
        <path d="M53 54 L84 54" strokeWidth={S.D.strokeWidth} />
        <path d="M53 65 L84 65" strokeWidth={S.D.strokeWidth} />
        <path d="M53 76 L84 76" strokeWidth={S.D.strokeWidth} />
        {/* Bottom rail */}
        <path d="M53 80 L84 80 L84 86 L53 86 Z" strokeWidth={S.D.strokeWidthFine} />

        {/* Center astragal molding (meeting stile) */}
        <path d="M49 20 L49 88" strokeWidth={S.P.strokeWidthBold} />
        <path d="M51 20 L51 88" strokeWidth={S.P.strokeWidthBold} />

        {/* Cremone bolt hardware — tall lever mechanism */}
        <path d="M46 48 L46 56" strokeWidth={S.P.strokeWidth} />
        <path d="M44 52 L48 52" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="46" cy="52" r="1.5" strokeWidth={S.D.strokeWidth} />
        {/* Matching on right */}
        <path d="M54 48 L54 56" strokeWidth={S.P.strokeWidth} />
        <path d="M52 52 L56 52" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="54" cy="52" r="1.5" strokeWidth={S.D.strokeWidth} />

        {/* Hinges — butt hinges recessed in frame */}
        <path d="M12 28 L14 28 L14 32 L12 32" strokeWidth={S.D.strokeWidth} />
        <path d="M12 55 L14 55 L14 59 L12 59" strokeWidth={S.D.strokeWidth} />
        <path d="M12 78 L14 78 L14 82 L12 82" strokeWidth={S.D.strokeWidth} />
        <path d="M86 28 L88 28 L88 32 L86 32" strokeWidth={S.D.strokeWidth} />
        <path d="M86 55 L88 55 L88 59 L86 59" strokeWidth={S.D.strokeWidth} />
        <path d="M86 78 L88 78 L88 82 L86 82" strokeWidth={S.D.strokeWidth} />

        {/* Threshold — brass weather strip */}
        <path d="M12 88 L88 88 L88 90 L12 90 Z" strokeWidth={S.D.strokeWidth} />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 5. PANEL DOOR
// Classic six-panel Georgian door with full classical doorcase surround
// Reference: Merrion Square Dublin, Bath Royal Crescent, Federal-style Boston
// ============================================================================
const PanelDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="panel-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#panel-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Georgian brick townhouse facade with full classical doorcase */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Brick facade — Flemish bond pattern */}
        <path d="M-5 -5 L105 -5 L105 100 L-5 100 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Brick courses — alternating headers and stretchers */}
        <path d="M-5 0 L2 0 M4 0 L8 0" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M92 0 L96 0 M98 0 L105 0" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-5 5 L6 5 M92 5 L105 5" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-5 20 L4 20 M96 20 L105 20" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-5 40 L4 40 M96 40 L105 40" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-5 60 L4 60 M96 60 L105 60" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-5 78 L4 78 M96 78 L105 78" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Sash window on left (12-over-12 panes) */}
        <path d="M-4 20 L5 20 L5 55 L-4 55 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M0 20 L0 55 M-4 37 L5 37" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Window stone sill */}
        <path d="M-5 55 L6 55 L6 57 L-5 57 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Sash window on right */}
        <path d="M95 20 L104 20 L104 55 L95 55 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M100 20 L100 55 M95 37 L104 37" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M94 55 L105 55 L105 57 L94 57 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Stone plinth/water table at base */}
        <path d="M-5 88 L105 88" strokeWidth={S.CN.strokeWidthFine} />

        {/* Iron area railings — basement light well */}
        <path d="M-5 88 L-5 98 L3 98 L3 88" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-3 88 L-3 98 M0 88 L0 98" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M97 88 L97 98 L105 98 L105 88" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M99 88 L99 98 M102 88 L102 98" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Stone steps with York stone treads */}
        <path d="M22 90 L78 90 L80 93 L20 93 Z" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M20 93 L80 93 L82 96 L18 96 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M18 96 L82 96 L84 99 L16 99 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY: Full Georgian doorcase with fanlight, pilasters, and 6-panel door */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* BROKEN PEDIMENT above doorcase */}
        <path d="M6 3 L42 3 L42 0 L6 0 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M58 3 L94 3 L94 0 L58 0 Z" strokeWidth={S.D.strokeWidth} />
        {/* Pediment scroll ends */}
        <path d="M42 1 Q46 -2 48 2" strokeWidth={S.D.strokeWidth} />
        <path d="M58 1 Q54 -2 52 2" strokeWidth={S.D.strokeWidth} />
        {/* Urn in pediment center */}
        <path d="M48 0 L48 -3 Q50 -5 52 -3 L52 0" strokeWidth={S.D.strokeWidthFine} />

        {/* PILASTERS (fluted) flanking doorway */}
        <path d="M6 3 L6 88 L12 88 L12 3 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M8 5 L8 86 M10 5 L10 86" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M88 3 L88 88 L94 88 L94 3 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M90 5 L90 86 M92 5 L92 86" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
        {/* Pilaster capitals — Ionic volutes */}
        <path d="M4 3 L14 3 L13 6 L5 6 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M86 3 L96 3 L95 6 L87 6 Z" strokeWidth={S.D.strokeWidth} />
        {/* Pilaster bases */}
        <path d="M5 86 L13 86 L13 88 L5 88 Z" strokeWidth={S.D.strokeWidthFine} />
        <path d="M87 86 L95 86 L95 88 L87 88 Z" strokeWidth={S.D.strokeWidthFine} />

        {/* FANLIGHT — semi-elliptical with radiating glazing bars */}
        <path d="M14 8 Q50 -8 86 8 L86 18 L14 18 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Radiating bars — spider-web pattern */}
        <path d="M50 -2 L50 18" strokeWidth={S.D.strokeWidth} />
        <path d="M50 -2 L24 15" strokeWidth={S.D.strokeWidthFine} />
        <path d="M50 -2 L76 15" strokeWidth={S.D.strokeWidthFine} />
        <path d="M50 -2 L35 8" strokeWidth={S.E.strokeWidth} />
        <path d="M50 -2 L65 8" strokeWidth={S.E.strokeWidth} />
        <path d="M50 -2 L18 10" strokeWidth={S.E.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M50 -2 L82 10" strokeWidth={S.E.strokeWidth} opacity={S.D.opacityStrong} />
        {/* Concentric arc within fanlight */}
        <path d="M22 12 Q50 2 78 12" strokeWidth={S.E.strokeWidth} />

        {/* DOOR FRAME (architrave with crossette) */}
        <path d="M14 18 L14 88 L86 88 L86 18" strokeWidth={S.P.strokeWidth} />

        {/* THE SIX-PANEL DOOR — proper Georgian proportions */}
        {/* Stiles (vertical frame members) */}
        <path d="M18 20 L18 86" strokeWidth={S.P.strokeWidthLight} />
        <path d="M82 20 L82 86" strokeWidth={S.P.strokeWidthLight} />
        {/* Top rail */}
        <path d="M18 20 L82 20" strokeWidth={S.P.strokeWidthLight} />
        {/* Lock rail */}
        <path d="M18 50 L82 50" strokeWidth={S.P.strokeWidthLight} />
        {/* Bottom rail */}
        <path d="M18 86 L82 86" strokeWidth={S.P.strokeWidthLight} />
        {/* Intermediate rails */}
        <path d="M18 32 L82 32" strokeWidth={S.D.strokeWidth} />
        <path d="M18 56 L82 56" strokeWidth={S.D.strokeWidth} />

        {/* TOP PANELS (smallest — 2 small rectangles) */}
        <path d="M22 23 L22 29 L48 29 L48 23 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M24 24 L24 28 L46 28 L46 24 Z" strokeWidth={S.E.strokeWidth} />
        <path d="M52 23 L52 29 L78 29 L78 23 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M54 24 L54 28 L76 28 L76 24 Z" strokeWidth={S.E.strokeWidth} />

        {/* MIDDLE PANELS (medium) */}
        <path d="M22 35 L22 47 L48 47 L48 35 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M24 37 L24 45 L46 45 L46 37 Z" strokeWidth={S.E.strokeWidth} />
        <path d="M52 35 L52 47 L78 47 L78 35 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M54 37 L54 45 L76 45 L76 37 Z" strokeWidth={S.E.strokeWidth} />

        {/* BOTTOM PANELS (largest) */}
        <path d="M22 59 L22 83 L48 83 L48 59 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M24 61 L24 81 L46 81 L46 61 Z" strokeWidth={S.E.strokeWidth} />
        <path d="M52 59 L52 83 L78 83 L78 59 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M54 61 L54 81 L76 81 L76 61 Z" strokeWidth={S.E.strokeWidth} />

        {/* Raised panel shadow (top-left corner darker) */}
        <path d="M24 24 L46 24 L46 28" opacity={S.D.opacitySubtle} strokeWidth={S.P.strokeWidthLight} />
        <path d="M54 24 L76 24 L76 28" opacity={S.D.opacitySubtle} strokeWidth={S.P.strokeWidthLight} />
        <path d="M24 37 L46 37 L46 45" opacity={S.D.opacitySubtle} strokeWidth={S.P.strokeWidthLight} />
        <path d="M54 37 L76 37 L76 45" opacity={S.D.opacitySubtle} strokeWidth={S.P.strokeWidthLight} />
        <path d="M24 61 L46 61 L46 81" opacity={S.D.opacitySubtle} strokeWidth={S.P.strokeWidthLight} />
        <path d="M54 61 L76 61 L76 81" opacity={S.D.opacitySubtle} strokeWidth={S.P.strokeWidthLight} />

        {/* BRASS DOOR FURNITURE */}
        {/* Lion-head knocker */}
        <circle cx="50" cy="38" r="4" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="50" cy="38" r="2.5" strokeWidth={S.D.strokeWidthFine} />
        <path d="M50 42 L50 45" strokeWidth={S.P.strokeWidthLight} />

        {/* Brass knob with rosette backplate */}
        <circle cx="74" cy="52" r="3.5" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="74" cy="52" r="5.5" strokeWidth={S.E.strokeWidth} />

        {/* Keyhole escutcheon */}
        <path d="M74 58 Q72 60 74 62 Q76 60 74 58" strokeWidth={S.D.strokeWidth} />
        <path d="M74 61 L74 64" strokeWidth={S.D.strokeWidth} />

        {/* Letter box / mail slot */}
        <path d="M38 50 L62 50 L62 53 L38 53 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M40 51 L60 51 L60 52 L40 52 Z" strokeWidth={S.E.strokeWidth} />

        {/* Butt hinges */}
        <path d="M14 26 L18 26 L18 30 L14 30" strokeWidth={S.D.strokeWidth} />
        <path d="M14 48 L18 48 L18 52 L14 52" strokeWidth={S.D.strokeWidth} />
        <path d="M14 76 L18 76 L18 80 L14 80" strokeWidth={S.D.strokeWidth} />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 6. PIVOT DOOR
// Oversized modern pivot entry — 10ft tall, offset axis, frameless appearance
// Reference: Persepolis Gate of All Nations, FritsJurgens pivot system, Tadao Ando
// ============================================================================
const PivotDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pivot-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#pivot-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Minimalist modern residence — Cor-ten steel, water feature, desert landscape */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Cantilevered concrete roof slab — extends beyond walls */}
        <path d="M-10 5 L110 5" strokeWidth={S.CN.strokeWidth} />
        <path d="M-10 7 L110 7" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Cor-ten steel accent wall on left — textured rust */}
        <path d="M-5 7 L8 7 L8 92 L-5 92 Z" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M-3 15 L6 15 M-3 30 L6 30 M-3 50 L6 50 M-3 70 L6 70" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Smooth stucco wall on right */}
        <path d="M92 7 L105 7 L105 92 L92 92 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Stepping stones across water to entry */}
        <path d="M40 92 L40 94 L48 94 L48 92 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M52 92 L52 94 L60 94 L60 92 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* CONTEXT (far): Reflecting pool, water feature, and desert landscape beyond */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        {/* Reflecting pool / water feature */}
        <path d="M-5 94 L105 94 L105 100 L-5 100 Z" />
        {/* Water surface ripple lines */}
        <path d="M10 96 Q30 95 50 96 Q70 97 90 96" strokeWidth={S.CF.strokeWidthFine} />
        <path d="M15 98 Q35 97 55 98 Q75 99 95 98" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />

        {/* Desert landscape hint — agave/yucca silhouette on right */}
        <path d="M98 85 L96 78 M98 85 L100 76 M98 85 L95 82 M98 85 L101 80" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
      </g>

      {/* PRIMARY: Massive pivot door — oversized, partially open */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Opening in wall — clean frameless slot */}
        <path d="M10 7 L10 92" strokeWidth={S.P.strokeWidth} />
        <path d="M90 7 L90 92" strokeWidth={S.P.strokeWidth} />

        {/* Flush floor channel (hidden pivot mechanism below) */}
        <path d="M10 90 L90 90" strokeWidth={S.P.strokeWidthLight} />
        <path d="M10 92 L90 92" strokeWidth={S.D.strokeWidthFine} />

        {/* Flush ceiling slot */}
        <path d="M10 7 L90 7" strokeWidth={S.P.strokeWidthLight} />
        <path d="M10 9 L90 9" strokeWidth={S.D.strokeWidthFine} />

        {/* THE DOOR — massive slab, shown at ~40° open angle */}
        {/* Door is pivoting on offset axis (1/3 from left edge) */}
        {/* Part of door swings IN (left section, small) */}
        <path d="M28 9 L18 14 L18 86 L28 90 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Part of door swings OUT (right section, large) */}
        <path d="M28 9 L72 22 L72 78 L28 90 Z" strokeWidth={S.P.strokeWidthLight} />

        {/* Door thickness — 4-inch slab visible at leading edge */}
        <path d="M72 22 L74 23 L74 77 L72 78" strokeWidth={S.P.strokeWidthLight} />

        {/* Material: blackened steel with horizontal scored lines */}
        <path d="M30 15 L68 25" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M30 25 L70 33" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M29 35 L71 42" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M29 50 L71 55" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M29 65 L71 68" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M29 75 L70 76" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M29 85 L70 80" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* OFFSET PIVOT POINT — 1/3 from left */}
        {/* Top pivot hardware */}
        <circle cx="28" cy="9" r="3" strokeWidth={S.P.strokeWidth} />
        <circle cx="28" cy="9" r="1.2" strokeWidth={S.P.strokeWidthLight} />
        {/* Bottom pivot hardware */}
        <circle cx="28" cy="90" r="3" strokeWidth={S.P.strokeWidth} />
        <circle cx="28" cy="90" r="1.2" strokeWidth={S.P.strokeWidthLight} />

        {/* Pivot axis — dashed vertical line */}
        <path d="M28 12 L28 87" strokeDasharray="4 3" opacity={S.D.opacitySubtle} strokeWidth={S.E.strokeWidth} />

        {/* Door swing arc — shows rotation path */}
        <path d="M72 50 Q82 42 88 50" strokeDasharray="2 2" opacity={S.D.opacitySubtle} strokeWidth={S.E.strokeWidth} />
        <path d="M18 50 Q12 46 10 50" strokeDasharray="2 2" opacity={S.D.opacitySubtle} strokeWidth={S.E.strokeWidth} />

        {/* Flush pull handle — long vertical recess */}
        <path d="M65 38 L67 39 L67 61 L65 62" strokeWidth={S.P.strokeWidth} />
        <path d="M66 41 L66 59" strokeWidth={S.D.strokeWidth} />

        {/* Shadow cast by door on floor */}
        <path d="M28 90 L72 78 L74 79 L74 92 L28 92 Z" opacity="0.12" fill="currentColor" strokeWidth="0" />

        {/* Light gap at pivot edge — the characteristic reveal */}
        <path d="M28 9 L28 90" strokeWidth={S.E.strokeWidth} opacity={S.D.opacity} />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 7. POCKET DOOR
// Victorian double parlor pocket doors — cutaway showing wall cavity mechanism
// Reference: 1880s brownstones, Herter Brothers interiors, Carnegie Hill mansions
// ============================================================================
const PocketDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pocket-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#pocket-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Victorian brownstone parlor — cutaway showing wall construction */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* High ceiling with deep crown molding and picture rail */}
        <path d="M-5 3 L105 3" />
        <path d="M-5 5 L105 5" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M-5 8 L105 8" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Ceiling medallion fragment */}
        <path d="M40 -2 Q50 -5 60 -2" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* CUTAWAY VIEW: Wall split in cross-section showing pocket cavity */}
        {/* Outer plaster wall face (front parlor side) */}
        <path d="M-5 8 L-5 93 L18 93 L18 8" strokeWidth={S.CN.strokeWidthFine} />
        {/* Inner plaster wall face (back parlor side) */}
        <path d="M82 8 L82 93 L105 93 L105 8" strokeWidth={S.CN.strokeWidthFine} />

        {/* Wall cavity — exposed lath and plaster in cutaway */}
        <path d="M2 12 L2 90 L8 90 L8 12 Z" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M92 12 L92 90 L98 90 L98 12 Z" strokeWidth={S.CN.strokeWidthFine} />
        {/* Wall studs visible in pocket cavity */}
        <path d="M4 12 L4 90 M6 12 L6 90" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M94 12 L94 90 M96 12 L96 90" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Wainscoting on flanking walls (front parlor) */}
        <path d="M-3 60 L15 60" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M85 60 L103 60" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Wainscot panels */}
        <path d="M0 63 L0 88 L6 88 L6 63 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M8 63 L8 88 L14 88 L14 63 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M86 63 L86 88 L92 88 L92 63 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M94 63 L94 88 L100 88 L100 63 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Ornate plaster ceiling rosette in front parlor */}
        <circle cx="10" cy="0" r="4" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Parquet floor with decorative border */}
        <path d="M-5 90 L105 90" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M-5 93 L105 93" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Floor border pattern */}
        <path d="M-3 90 L0 93 L3 90 L6 93 L9 90 L12 93 L15 90" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M85 90 L88 93 L91 90 L94 93 L97 90 L100 93 L103 90" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Gas lamp sconce on left wall */}
        <path d="M-2 35 L2 35 L2 40 Q0 42 -2 40 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M0 33 L0 35" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY: Double pocket doors — one receding into each side */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Overhead track housing spanning full width */}
        <path d="M5 10 L95 10 L95 15 L5 15 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Track rail visible */}
        <path d="M7 12 L93 12" strokeWidth={S.D.strokeWidth} />

        {/* Opening frame — the doorway itself */}
        <path d="M20 10 L20 90" strokeWidth={S.P.strokeWidthLight} />
        <path d="M80 10 L80 90" strokeWidth={S.P.strokeWidthLight} />

        {/* LEFT DOOR — 3/4 recessed into left pocket */}
        <path d="M10 16 L10 88 L42 88 L42 16 Z" strokeWidth={S.P.strokeWidthLight} />

        {/* Victorian Eastlake panel design — geometric precision */}
        {/* Top panel with incised geometric carving */}
        <path d="M14 20 L14 32 L38 32 L38 20 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M16 22 L16 30 L36 30 L36 22 Z" strokeWidth={S.E.strokeWidth} />
        {/* Incised line pattern (Eastlake aesthetic) */}
        <path d="M20 24 L20 28 M24 24 L24 28 M28 24 L28 28 M32 24 L32 28" strokeWidth={S.E.strokeWidth} opacity={S.D.opacity} />

        {/* Middle panels (pair) */}
        <path d="M14 36 L14 56 L24 56 L24 36 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M16 38 L16 54 L22 54 L22 38 Z" strokeWidth={S.E.strokeWidth} />
        <path d="M28 36 L28 56 L38 56 L38 36 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M30 38 L30 54 L36 54 L36 38 Z" strokeWidth={S.E.strokeWidth} />

        {/* Bottom panel */}
        <path d="M14 60 L14 84 L38 84 L38 60 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M16 62 L16 82 L36 82 L36 62 Z" strokeWidth={S.E.strokeWidth} />

        {/* RIGHT DOOR — 1/4 recessed (mostly visible) */}
        <path d="M58 16 L58 88 L90 88 L90 16 Z" strokeWidth={S.P.strokeWidthLight} />

        {/* Matching Victorian panels */}
        <path d="M62 20 L62 32 L86 32 L86 20 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M64 22 L64 30 L84 30 L84 22 Z" strokeWidth={S.E.strokeWidth} />
        <path d="M68 24 L68 28 M72 24 L72 28 M76 24 L76 28 M80 24 L80 28" strokeWidth={S.E.strokeWidth} opacity={S.D.opacity} />

        <path d="M62 36 L62 56 L72 56 L72 36 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M64 38 L64 54 L70 54 L70 38 Z" strokeWidth={S.E.strokeWidth} />
        <path d="M76 36 L76 56 L86 56 L86 36 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M78 38 L78 54 L84 54 L84 38 Z" strokeWidth={S.E.strokeWidth} />

        <path d="M62 60 L62 84 L86 84 L86 60 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M64 62 L64 82 L84 82 L84 62 Z" strokeWidth={S.E.strokeWidth} />

        {/* Recessed cup pulls (Victorian mortise style) */}
        {/* Left door pull */}
        <path d="M38 48 L42 48 L42 52 L38 52 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M39 49 L41 49 Q41 51 39 51" strokeWidth={S.P.strokeWidthLight} />
        {/* Right door pull */}
        <path d="M58 48 L54 48 L54 52 L58 52 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M57 49 L55 49 Q55 51 57 51" strokeWidth={S.P.strokeWidthLight} />

        {/* Mortise lock between doors */}
        <path d="M42 44 L42 56 L58 56 L58 44 Z" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <circle cx="50" cy="50" r="2" strokeWidth={S.D.strokeWidth} />
        <path d="M50 52 L50 54" strokeWidth={S.D.strokeWidth} />

        {/* Roller hangers visible at track */}
        <circle cx="18" cy="12" r="1.5" strokeWidth={S.D.strokeWidth} />
        <circle cx="35" cy="12" r="1.5" strokeWidth={S.D.strokeWidth} />
        <circle cx="65" cy="12" r="1.5" strokeWidth={S.D.strokeWidth} />
        <circle cx="82" cy="12" r="1.5" strokeWidth={S.D.strokeWidth} />
        {/* Hanger rods */}
        <path d="M18 14 L18 16 M35 14 L35 16 M65 14 L65 16 M82 14 L82 16" strokeWidth={S.D.strokeWidthFine} />

        {/* Floor guide */}
        <path d="M20 88 L80 88 L80 90 L20 90 Z" strokeWidth={S.D.strokeWidth} />

        {/* Movement arrows */}
        <path d="M30 5 L15 5 M18 3 L15 5 L18 7" strokeDasharray="2 2" opacity={S.D.opacitySubtle} strokeWidth={S.D.strokeWidthFine} />
        <path d="M70 5 L85 5 M82 3 L85 5 L82 7" strokeDasharray="2 2" opacity={S.D.opacitySubtle} strokeWidth={S.D.strokeWidthFine} />
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
    <g filter={showHalo ? "url(#revolving-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Grand Art Deco hotel lobby — Chrysler Building-era opulence */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Coffered ceiling with Art Deco geometric pattern */}
        <path d="M0 3 L100 3" />
        <path d="M5 6 L95 6" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Sunburst ceiling motif */}
        <path d="M50 0 L45 6 M50 0 L55 6 M50 0 L40 5 M50 0 L60 5" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M50 0 L35 4 M50 0 L65 4" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Marble-clad walls with Art Deco zigzag inlay */}
        <path d="M-5 6 L-5 95 L10 95 L10 6" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M90 6 L90 95 L105 95 L105 6" strokeWidth={S.CN.strokeWidthFine} />
        {/* Zigzag Deco inlay pattern */}
        <path d="M-3 20 L0 15 L3 20 L6 15 L9 20" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M91 20 L94 15 L97 20 L100 15 L103 20" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Brass elevator doors on left wall */}
        <path d="M-3 35 L8 35 L8 80 L-3 80 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M3 35 L3 80" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Elevator dial above */}
        <path d="M0 32 Q3 29 6 32" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Terrazzo floor with brass Art Deco compass star */}
        <path d="M-5 92 L105 92" strokeWidth={S.CN.strokeWidthFine} />
        {/* Star/compass pattern in terrazzo */}
        <path d="M50 85 L45 92 M50 85 L55 92 M50 85 L50 92" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M50 85 L40 90 M50 85 L60 90 M50 85 L35 88 M50 85 L65 88" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <circle cx="50" cy="85" r="2" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Brass-framed glass canopy over entrance */}
        <path d="M8 10 L92 10 L95 14 L5 14 Z" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M20 10 L20 14 M40 10 L40 14 M60 10 L60 14 M80 10 L80 14" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY: Revolving door mechanism */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Circular brass enclosure */}
        <circle cx="50" cy="50" r="38" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="50" cy="50" r="36" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="50" cy="50" r="34" strokeWidth={S.D.strokeWidthFine} />

        {/* Entrance curve - left */}
        <path d="M12 35 L15 35 Q15 50, 15 65 L12 65" strokeWidth={S.P.strokeWidthLight} />

        {/* Exit curve - right */}
        <path d="M85 35 L88 35 Q88 50, 88 65 L85 65" strokeWidth={S.P.strokeWidthLight} />

        {/* Central pivot mechanism */}
        <circle cx="50" cy="50" r="6" strokeWidth={S.P.strokeWidth} />
        <circle cx="50" cy="50" r="4" strokeWidth={S.D.strokeWidth} />
        <circle cx="50" cy="50" r="2" strokeWidth={S.D.strokeWidthFine} />

        {/* Four glass door wings (at diagonal) */}
        {/* NE wing */}
        <path d="M50 50 L78 22" strokeWidth={S.P.strokeWidthBold} />
        <path d="M52 48 L75 25 L77 27 L54 50" opacity={S.D.opacitySubtle} />

        {/* SE wing */}
        <path d="M50 50 L78 78" strokeWidth={S.P.strokeWidthBold} />
        <path d="M52 52 L75 75 L77 73 L54 50" opacity={S.D.opacitySubtle} />

        {/* SW wing */}
        <path d="M50 50 L22 78" strokeWidth={S.P.strokeWidthBold} />
        <path d="M48 52 L25 75 L23 73 L46 50" opacity={S.D.opacitySubtle} />

        {/* NW wing */}
        <path d="M50 50 L22 22" strokeWidth={S.P.strokeWidthBold} />
        <path d="M48 48 L25 25 L23 27 L46 50" opacity={S.D.opacitySubtle} />

        {/* Glass panels with Art Deco etching pattern */}
        {/* NE panel etching */}
        <path d="M60 40 L65 35 M62 38 L67 33" strokeWidth={S.E.strokeWidth} opacity={S.D.opacityStrong} />
        {/* SE panel etching */}
        <path d="M60 60 L65 65 M62 62 L67 67" strokeWidth={S.E.strokeWidth} opacity={S.D.opacityStrong} />
        {/* SW panel etching */}
        <path d="M40 60 L35 65 M38 62 L33 67" strokeWidth={S.E.strokeWidth} opacity={S.D.opacityStrong} />
        {/* NW panel etching */}
        <path d="M40 40 L35 35 M38 38 L33 33" strokeWidth={S.E.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Push bars on each wing */}
        <path d="M62 42 L72 32" strokeWidth={S.P.strokeWidthBold} opacity={S.D.opacityStrong} />
        <path d="M58 62 L68 72" strokeWidth={S.P.strokeWidthBold} opacity={S.D.opacityStrong} />
        <path d="M38 58 L28 68" strokeWidth={S.P.strokeWidthBold} opacity={S.D.opacityStrong} />
        <path d="M42 38 L32 28" strokeWidth={S.P.strokeWidthBold} opacity={S.D.opacityStrong} />

        {/* Speed governor ring */}
        <circle cx="50" cy="50" r="10" strokeDasharray="2,2" opacity={S.D.opacitySubtle} />

        {/* Rotation direction arrow (clockwise) */}
        <path d="M70 20 Q80 25, 82 35" strokeDasharray="2,2" opacity={S.D.opacityStrong} />
        <path d="M80 32 L82 35 L79 36" />

        {/* Brass frame details */}
        <path d="M50 12 L50 8 M50 88 L50 92" strokeWidth={S.P.strokeWidthLight} />
        <path d="M12 50 L8 50 M88 50 L92 50" strokeWidth={S.P.strokeWidthLight} />

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
    <g filter={showHalo ? "url(#sliding-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Traditional Japanese washitsu (tatami room) — Katsura Imperial Villa */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Exposed timber ceiling (saobuchi-tenjo) — parallel battens */}
        <path d="M-5 2 L105 2" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M-5 4 L105 4" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Ceiling battens running perpendicular */}
        <path d="M15 2 L15 4 M30 2 L30 4 M45 2 L45 4 M60 2 L60 4 M75 2 L75 4 M90 2 L90 4" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Thick square timber posts (hashira) — hand-planed cypress */}
        <path d="M5 2 L5 96 L10 96 L10 2 Z" />
        <path d="M90 2 L90 96 L95 96 L95 2 Z" />
        {/* Post chamfer detail */}
        <path d="M10 2 L10 96" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M90 2 L90 96" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Nageshi beam (horizontal timber connecting posts) */}
        <path d="M5 6 L95 6" />
        <path d="M5 8 L95 8" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Tokonoma alcove on left (recessed display niche) */}
        <path d="M-3 10 L5 10 L5 85 L-3 85 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Hanging scroll in tokonoma */}
        <path d="M0 15 L0 50" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-1 15 L1 15" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Ikebana arrangement */}
        <path d="M0 75 L-2 68 M0 75 L2 66 M0 75 L0 70" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Tatami mats — precise module layout with border strips */}
        <path d="M10 87 L90 87" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M10 96 L90 96" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M50 87 L50 96" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Tatami border (heri) */}
        <path d="M10 88 L50 88 M50 88 L90 88" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M10 91 L50 91 M50 91 L90 91" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Garden view beyond — pine tree silhouette and stepping stones */}
        <path d="M70 92 L68 85 Q72 78 76 82 Q80 76 78 85 L76 92" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M71 92 L71 96" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Moss-covered stepping stones */}
        <ellipse cx="65" cy="95" rx="3" ry="1" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <ellipse cx="60" cy="98" rx="2.5" ry="0.8" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY: Shoji sliding screen doors */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Upper track (kamoi) */}
        <path d="M10 10 L90 10 L90 15 L10 15 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M12 12 L88 12" strokeWidth={S.E.strokeWidth} />

        {/* Lower track (shikii) */}
        <path d="M10 85 L90 85 L90 88 L10 88 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M12 86 L88 86" strokeWidth={S.E.strokeWidth} />

        {/* Left shoji panel (closed position) */}
        <path d="M12 15 L12 85 L48 85 L48 15 Z" strokeWidth={S.P.strokeWidthLight} />

        {/* Right shoji panel (slightly open) */}
        <path d="M52 15 L52 85 L88 85 L88 15 Z" strokeWidth={S.P.strokeWidthLight} />

        {/* Kumiko lattice pattern - LEFT PANEL */}
        {/* Vertical muntins */}
        <path d="M20 17 L20 83" strokeWidth={S.D.strokeWidth} />
        <path d="M28 17 L28 83" strokeWidth={S.D.strokeWidth} />
        <path d="M36 17 L36 83" strokeWidth={S.D.strokeWidth} />
        <path d="M44 17 L44 83" strokeWidth={S.D.strokeWidth} />

        {/* Horizontal muntins */}
        <path d="M12 25 L48 25" strokeWidth={S.D.strokeWidth} />
        <path d="M12 35 L48 35" strokeWidth={S.D.strokeWidth} />
        <path d="M12 45 L48 45" strokeWidth={S.D.strokeWidth} />
        <path d="M12 55 L48 55" strokeWidth={S.D.strokeWidth} />
        <path d="M12 65 L48 65" strokeWidth={S.D.strokeWidth} />
        <path d="M12 75 L48 75" strokeWidth={S.D.strokeWidth} />

        {/* Kumiko lattice pattern - RIGHT PANEL */}
        {/* Vertical muntins */}
        <path d="M60 17 L60 83" strokeWidth={S.D.strokeWidth} />
        <path d="M68 17 L68 83" strokeWidth={S.D.strokeWidth} />
        <path d="M76 17 L76 83" strokeWidth={S.D.strokeWidth} />
        <path d="M84 17 L84 83" strokeWidth={S.D.strokeWidth} />

        {/* Horizontal muntins */}
        <path d="M52 25 L88 25" strokeWidth={S.D.strokeWidth} />
        <path d="M52 35 L88 35" strokeWidth={S.D.strokeWidth} />
        <path d="M52 45 L88 45" strokeWidth={S.D.strokeWidth} />
        <path d="M52 55 L88 55" strokeWidth={S.D.strokeWidth} />
        <path d="M52 65 L88 65" strokeWidth={S.D.strokeWidth} />
        <path d="M52 75 L88 75" strokeWidth={S.D.strokeWidth} />

        {/* Outer frame (stiles and rails) - LEFT */}
        <path d="M14 17 L14 83 M46 17 L46 83" strokeWidth={S.P.strokeWidthLight} />
        <path d="M14 17 L46 17 M14 83 L46 83" strokeWidth={S.P.strokeWidthLight} />

        {/* Outer frame - RIGHT */}
        <path d="M54 17 L54 83 M86 17 L86 83" strokeWidth={S.P.strokeWidthLight} />
        <path d="M54 17 L86 17 M54 83 L86 83" strokeWidth={S.P.strokeWidthLight} />

        {/* Paper (washi) texture suggestion */}
        <path d="M16 20 L18 22 M32 42 L34 44 M40 68 L42 70" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M64 28 L66 30 M72 52 L74 54 M80 72 L82 74" strokeWidth={S.E.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Recessed finger pulls (hikite) */}
        <circle cx="44" cy="50" r="3" strokeWidth={S.D.strokeWidth} />
        <path d="M42 50 L46 50" strokeWidth={S.E.strokeWidth} />

        <circle cx="56" cy="50" r="3" strokeWidth={S.D.strokeWidth} />
        <path d="M54 50 L58 50" strokeWidth={S.E.strokeWidth} />

        {/* Track grooves */}
        <path d="M25 10 L25 15 M40 10 L40 15 M65 10 L65 15 M80 10 L80 15" strokeWidth={S.E.strokeWidth} opacity={S.D.opacity} />

        {/* Movement indicator */}
        <path d="M95 50 L85 50 M88 48 L85 50 L88 52" strokeDasharray="2,2" opacity={S.D.opacity} />
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
    <g filter={showHalo ? "url(#stable-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): English equestrian stable block — brick and timber, courtyard */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Slate roof with decorative ridge tiles and clock tower hint */}
        <path d="M-8 3 L50 -8 L108 3" />
        <path d="M-5 3 L105 3" strokeWidth={S.CN.strokeWidthFine} />
        {/* Clock tower / cupola centered above */}
        <path d="M45 -8 L45 -14 L55 -14 L55 -8" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M43 -14 L50 -18 L57 -14" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Weather vane */}
        <path d="M50 -18 L50 -22 M48 -20 L52 -20" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* English bond brick walls */}
        <path d="M-5 3 L-5 95" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M105 3 L105 95" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Brick courses — English bond (alternating headers/stretchers) */}
        <path d="M-5 10 L5 10 M95 10 L105 10" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-5 15 L3 15 M97 15 L105 15" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-5 20 L5 20 M95 20 L105 20" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-5 40 L5 40 M95 40 L105 40" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-5 60 L5 60 M95 60 L105 60" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-5 78 L5 78 M95 78 L105 78" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Hay loft door above (pitch opening with hoist beam) */}
        <path d="M35 -2 L35 5 L65 5 L65 -2 Z" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M40 0 L60 0" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Hoist beam projecting out */}
        <path d="M50 -2 L50 -5 L55 -5" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Adjacent stall — closed, with horse head visible */}
        <path d="M-8 8 L-8 88 L2 88 L2 8 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-8 45 L2 45" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Horse silhouette peeking over adjacent stall door */}
        <path d="M-5 30 Q-3 25 -1 28 L-1 40" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <circle cx="-2" cy="32" r="0.8" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Tack room door on right (closed, with nameplate) */}
        <path d="M98 8 L98 88 L108 88 L108 8 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M100 35 L106 35 L106 38 L100 38 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Cobblestone stable yard with drainage channel */}
        <path d="M-5 90 L105 90" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M10 92 Q15 93 20 92 Q25 91 30 92 Q35 93 40 92" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M60 92 Q65 91 70 92 Q75 93 80 92 Q85 91 90 92" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Central drainage gutter */}
        <path d="M45 90 L45 100 M55 90 L55 100" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Mounting block near door */}
        <path d="M90 85 L90 90 L95 90 L95 85 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M92 82 L92 85 L93 85 L93 82 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Hanging flower basket on bracket */}
        <path d="M96 12 L100 12 L100 18 Q98 22 96 18 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY: Stable door with horse visible */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Door frame */}
        <path d="M12 8 L12 90 L88 90 L88 8 Z" strokeWidth={S.P.strokeWidthLight} />

        {/* UPPER HALF - OPEN (showing horse) */}
        <path d="M14 10 L14 48 L86 48 L86 10 Z" strokeWidth={S.P.strokeWidthLight} />

        {/* Upper door swung outward - side view */}
        <path d="M5 15 L14 10 L14 48 L5 52 Z" />
        <path d="M5 15 L5 52" strokeWidth={S.P.strokeWidthLight} />

        {/* Vertical planks on upper door */}
        <path d="M7 17 L7 50 M9 16 L9 51 M11 15 L11 50" strokeWidth={S.E.strokeWidth} />

        {/* Horse head visible in opening */}
        {/* Horse head shape */}
        <path d="M35 20 Q30 18, 28 22 L28 32 Q30 38, 38 40 Q45 38, 50 35 L52 28 Q52 22, 48 18 Q42 16, 35 20" />

        {/* Horse features */}
        <circle cx="42" cy="28" r="2" />
        <path d="M38 35 Q40 37, 42 35" />
        {/* Mane */}
        <path d="M35 20 L32 18 L30 22" strokeWidth={S.D.strokeWidthFine} />
        <path d="M38 18 L36 16 L35 20" strokeWidth={S.D.strokeWidthFine} />
        {/* Ears */}
        <path d="M38 18 L36 14 L40 18" strokeWidth={S.D.strokeWidthFine} />
        <path d="M44 18 L46 14 L42 18" strokeWidth={S.D.strokeWidthFine} />
        {/* Bridle */}
        <path d="M28 28 L35 28 Q40 28, 42 32" strokeWidth={S.D.strokeWidthFine} />

        {/* Horizontal split rail (emphasized) */}
        <path d="M12 48 L88 48" strokeWidth={S.P.strokeWidthHeavy} />
        <path d="M12 50 L88 50" strokeWidth={S.D.strokeWidthFine} />

        {/* Ledge on lower door */}
        <path d="M14 48 L86 48 L88 52 L12 52 Z" opacity={S.D.opacitySubtle} />

        {/* LOWER HALF - CLOSED */}
        <path d="M14 52 L14 88 L86 88 L86 52 Z" strokeWidth={S.P.strokeWidthLight} />

        {/* Vertical planks on lower door */}
        <path d="M22 54 L22 86" strokeWidth={S.D.strokeWidthFine} />
        <path d="M30 54 L30 86" strokeWidth={S.D.strokeWidthFine} />
        <path d="M38 54 L38 86" strokeWidth={S.D.strokeWidthFine} />
        <path d="M46 54 L46 86" strokeWidth={S.D.strokeWidthFine} />
        <path d="M54 54 L54 86" strokeWidth={S.D.strokeWidthFine} />
        <path d="M62 54 L62 86" strokeWidth={S.D.strokeWidthFine} />
        <path d="M70 54 L70 86" strokeWidth={S.D.strokeWidthFine} />
        <path d="M78 54 L78 86" strokeWidth={S.D.strokeWidthFine} />

        {/* Diagonal bracing on lower door */}
        <path d="M18 56 L82 82 M82 56 L18 82" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Iron strap hinges - upper door */}
        <path d="M14 18 L5 18" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="8" cy="18" r="1.5" />
        <path d="M14 40 L5 42" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="8" cy="41" r="1.5" />

        {/* Iron strap hinges - lower door */}
        <circle cx="14" cy="60" r="2" strokeWidth={S.P.strokeWidth} />
        <path d="M16 60 L30 60" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="14" cy="78" r="2" strokeWidth={S.P.strokeWidth} />
        <path d="M16 78 L30 78" strokeWidth={S.P.strokeWidthBold} />

        {/* Handle on lower door */}
        <path d="M78 70 L82 70 L82 68 L78 68" strokeWidth={S.P.strokeWidth} />

        {/* Latch hook for upper door */}
        <circle cx="80" cy="25" r="2" />
        <path d="M82 25 L86 25" strokeWidth={S.P.strokeWidthLight} />

        {/* Bolt slide on lower door */}
        <path d="M75 56 L82 56" strokeWidth={S.P.strokeWidthLight} />
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
    <g filter={showHalo ? "url(#trapdoor-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Medieval castle guardroom floor — oubliette access in stone keep */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Massive stone floor — irregular flagstones with worn grooves */}
        <path d="M-5 -5 L105 -5 L105 105 L-5 105 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Flagstone joints — irregular, not grid */}
        <path d="M-5 18 L28 20 M42 18 L70 22 M80 18 L105 20" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-5 48 L20 50 M32 48 L60 52 M72 48 L105 50" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-5 78 L35 76 M48 78 L85 76 M92 78 L105 76" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M18 -5 L20 22 M55 -5 L52 18 M85 -5 L82 20" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M12 22 L15 50 M68 20 L72 48 M90 22 L88 50" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M25 50 L28 78 M62 52 L60 78 M82 50 L85 78" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Groin vault ceiling — intersecting ribs */}
        <path d="M-5 -8 Q50 -22 105 -8" />
        <path d="M-5 -8 L105 -8" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Cross ribs of groin vault */}
        <path d="M-5 -8 L105 -8" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M0 -5 L50 -18 L100 -5" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Castle wall — 8-foot thick masonry with splay window */}
        <path d="M-5 -5 L8 5 L8 105" />
        <path d="M105 -5 L92 5 L92 105" />
        {/* Arrow slit / splay window on left wall */}
        <path d="M0 25 L8 20 L8 40 L0 35 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M3 28 L3 32" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Iron torch cressets on walls (not sconces — standing iron baskets) */}
        <path d="M5 50 L8 48 L8 55 L5 53" strokeWidth={S.CN.strokeWidthFine} />
        {/* Flame suggestion */}
        <path d="M7 46 L6 44 L8 42 L7 46" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M95 50 L92 48 L92 55 L95 53" strokeWidth={S.CN.strokeWidthFine} />

        {/* Guard's bench against wall */}
        <path d="M92 80 L105 80 L105 85 L92 85 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Iron shackle bolted to wall */}
        <circle cx="96" cy="35" r="2" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M96 37 L96 42" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Worn stone step/platform near trapdoor */}
        <path d="M-5 90 L15 90 L15 95 L-5 95 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M85 90 L105 90 L105 95 L85 95 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY: Trapdoor with iron reinforcement */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Stone frame around trapdoor opening */}
        <path d="M25 25 L25 75 L75 75 L75 25 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M27 27 L27 73 L73 73 L73 27 Z" strokeWidth={S.D.strokeWidthFine} />

        {/* The trapdoor itself (partially open at angle) */}
        {/* Door shown lifted on hinges */}
        <path d="M30 30 L30 70 L50 50 L70 30 Z" strokeWidth={S.P.strokeWidthLight} />

        {/* Heavy wooden planks */}
        <path d="M32 32 L32 68 L48 50 L68 32 Z" />
        <path d="M35 34 L35 66 M38 36 L38 64 M41 38 L41 62" strokeWidth={S.D.strokeWidthFine} />
        <path d="M44 40 L44 60 M47 42 L47 58" strokeWidth={S.D.strokeWidthFine} />

        {/* Iron reinforcement straps */}
        {/* Horizontal straps */}
        <path d="M30 40 L50 35 L68 40" strokeWidth={S.P.strokeWidthBold} />
        <path d="M30 50 L70 50" strokeWidth={S.P.strokeWidthBold} />
        <path d="M32 60 L50 57 L68 60" strokeWidth={S.P.strokeWidthBold} />

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
        <path d="M25 35 L30 35 L32 37" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="28" cy="35" r="2" />
        <path d="M25 65 L30 65 L32 63" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="28" cy="65" r="2" />

        {/* Hinge pins */}
        <circle cx="25" cy="35" r="1.5" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="25" cy="65" r="1.5" strokeWidth={S.P.strokeWidthLight} />

        {/* Iron ring handle */}
        <circle cx="60" cy="55" r="6" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="60" cy="55" r="4" strokeWidth={S.D.strokeWidthFine} />
        <path d="M60 49 L60 47" strokeWidth={S.P.strokeWidth} />

        {/* Lock mechanism */}
        <path d="M65 44 L70 44 L70 48 L65 48 Z" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="67" cy="46" r="1.5" />
        <path d="M67 47 L67 50" strokeWidth={S.D.strokeWidth} />

        {/* Opening below showing ladder descending */}
        <path d="M50 50 L70 70 L70 75 L50 75" />

        {/* Ladder rungs visible in opening */}
        <path d="M55 70 L55 75 M65 70 L65 75" strokeWidth={S.P.strokeWidthLight} />
        <path d="M55 72 L65 72" strokeWidth={S.D.strokeWidth} />
        <path d="M55 74 L65 74" strokeWidth={S.D.strokeWidth} />

        {/* Shadow in opening */}
        <path d="M52 52 L68 68 L68 73 L52 73 Z" opacity="0.2" strokeWidth="0" fill="currentColor" />

        {/* Stone wear marks around edge */}
        <path d="M28 28 L32 32 M72 28 L68 32" strokeWidth={S.E.strokeWidth} opacity={S.D.opacity} />
        <path d="M28 72 L32 68 M72 72 L68 68" strokeWidth={S.E.strokeWidth} opacity={S.D.opacity} />

        {/* Support chain (when open) */}
        <path d="M70 30 L75 25 L75 20" strokeDasharray="2,1" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="75" cy="20" r="2" />

        {/* Metal corner reinforcements */}
        <path d="M30 30 L35 30 L30 35" strokeWidth={S.P.strokeWidthLight} />
        <path d="M30 70 L35 70 L30 65" strokeWidth={S.P.strokeWidthLight} />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 12. TYMPANUM
// Carved semicircular tympanum above a Romanesque/Gothic portal
// Reference: Moissac Abbey Last Judgment, Vézelay tympanum, Autun Cathedral
// ============================================================================
const TympanumSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="tympanum-halo" intensity={1} />}
    <g filter={showHalo ? "url(#tympanum-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Arch frame (archivolts), door opening below, trumeau */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Outermost archivolt — heavy semicircular frame */}
        <path d="M5 58 L5 30 Q50 -10 95 30 L95 58" />
        {/* 2nd archivolt order */}
        <path d="M10 58 L10 32 Q50 -4 90 32 L90 58" strokeWidth={S.CN.strokeWidthFine} />
        {/* 3rd archivolt order */}
        <path d="M15 58 L15 34 Q50 2 85 34 L85 58" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Door opening below tympanum */}
        <path d="M22 65 L22 98 L78 98 L78 65" />
        {/* Door leaves */}
        <path d="M22 65 L22 98 L49 98 L49 65 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M51 65 L51 98 L78 98 L78 65 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Trumeau — central pillar below tympanum */}
        <path d="M47 62 L47 98 L53 98 L53 62" />
        {/* Trumeau carved figure (stylised prophet) */}
        <path d="M50 68 L50 92" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <circle cx="50" cy="66" r="2" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Jamb columns (colonettes in splayed reveals) */}
        <path d="M15 58 L15 98" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M85 58 L85 98" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Jamb capitals */}
        <path d="M13 56 L17 56 L17 58 L13 58" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M83 56 L87 56 L87 58 L83 58" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Ground / threshold stone */}
        <path d="M5 98 L95 98" />
        <path d="M5 100 L95 100" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY: Tympanum — semicircular carved relief field */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Tympanum semicircular boundary */}
        <path d="M20 60 L20 36 Q50 6 80 36 L80 60 Z" strokeWidth={S.P.strokeWidthBold} />

        {/* Lintel — horizontal stone beam separating tympanum from doors */}
        <path d="M20 60 L80 60" strokeWidth={S.P.strokeWidthBold} />
        <path d="M20 62 L80 62" strokeWidth={S.P.strokeWidthLight} />

        {/* Mandorla — almond-shaped glory frame around Christ */}
        <ellipse cx="50" cy="38" rx="12" ry="16" strokeWidth={S.P.strokeWidth} />

        {/* Christ in Majesty — simplified seated figure */}
        {/* Head with cruciform halo */}
        <circle cx="50" cy="28" r="3.5" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 24 L50 26 M47 28 L53 28" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />
        {/* Body — seated torso */}
        <path d="M50 31 L50 46" strokeWidth={S.P.strokeWidthLight} />
        {/* Arms outstretched (blessing gesture) */}
        <path d="M42 35 L50 33 L58 35" strokeWidth={S.P.strokeWidthLight} />
        {/* Hands */}
        <path d="M42 35 L41 33" strokeWidth={S.D.strokeWidthFine} />
        <path d="M58 35 L59 33" strokeWidth={S.D.strokeWidthFine} />
        {/* Knees/lap — seated on throne */}
        <path d="M44 46 L50 44 L56 46" strokeWidth={S.D.strokeWidthFine} />
        {/* Feet */}
        <path d="M46 50 L54 50" strokeWidth={S.D.strokeWidthFine} />
        {/* Throne sides */}
        <path d="M43 30 L41 50" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />
        <path d="M57 30 L59 50" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />

        {/* Flanking apostle figures — left group (3 seated forms) */}
        {/* Apostle 1 — far left */}
        <path d="M26 48 L26 58" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="26" cy="46" r="2" strokeWidth={S.D.strokeWidth} />
        <path d="M24 50 L28 50" strokeWidth={S.D.strokeWidthFine} />
        {/* Apostle 2 — left-center */}
        <path d="M32 44 L32 58" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="32" cy="42" r="2" strokeWidth={S.D.strokeWidth} />
        <path d="M30 46 L34 46" strokeWidth={S.D.strokeWidthFine} />
        {/* Apostle 3 — left of mandorla */}
        <path d="M37 40 L37 56" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="37" cy="38" r="2" strokeWidth={S.D.strokeWidth} />
        <path d="M35 42 L39 42" strokeWidth={S.D.strokeWidthFine} />

        {/* Flanking apostle figures — right group (3 seated forms) */}
        {/* Apostle 4 — right of mandorla */}
        <path d="M63 40 L63 56" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="63" cy="38" r="2" strokeWidth={S.D.strokeWidth} />
        <path d="M61 42 L65 42" strokeWidth={S.D.strokeWidthFine} />
        {/* Apostle 5 — right-center */}
        <path d="M68 44 L68 58" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="68" cy="42" r="2" strokeWidth={S.D.strokeWidth} />
        <path d="M66 46 L70 46" strokeWidth={S.D.strokeWidthFine} />
        {/* Apostle 6 — far right */}
        <path d="M74 48 L74 58" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="74" cy="46" r="2" strokeWidth={S.D.strokeWidth} />
        <path d="M72 50 L76 50" strokeWidth={S.D.strokeWidthFine} />

        {/* Decorative border — bead motif along inner edge of tympanum */}
        <path d="M22 56 L24 54 L26 56 L28 54 L30 56 L32 54 L34 56 L36 54 L38 56 L40 54 L42 56" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />
        <path d="M58 56 L60 54 L62 56 L64 54 L66 56 L68 54 L70 56 L72 54 L74 56 L76 54 L78 56" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />
      </g>

      {/* DETAIL: Carved figure outlines, drapery folds, mandorla detail, lintel register */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity}>
        {/* Drapery fold lines on Christ figure */}
        <path d="M48 34 L47 44 M52 34 L53 44" />
        <path d="M46 40 L48 42 M54 40 L52 42" />
        {/* Book held on lap */}
        <path d="M47 42 L53 42 L53 46 L47 46 Z" strokeWidth={S.D.strokeWidthFine} />

        {/* Mandorla inner border — double line */}
        <ellipse cx="50" cy="38" rx="10" ry="14" opacity={S.D.opacitySubtle} />

        {/* Lintel — register divider with carved rosettes */}
        <circle cx="30" cy="61" r="1" opacity={S.D.opacitySubtle} />
        <circle cx="40" cy="61" r="1" opacity={S.D.opacitySubtle} />
        <circle cx="50" cy="61" r="1" opacity={S.D.opacitySubtle} />
        <circle cx="60" cy="61" r="1" opacity={S.D.opacitySubtle} />
        <circle cx="70" cy="61" r="1" opacity={S.D.opacitySubtle} />

        {/* Apostle drapery folds — simple verticals */}
        <path d="M25 49 L25 57 M27 49 L27 57" opacity={S.D.opacitySubtle} />
        <path d="M31 45 L31 57 M33 45 L33 57" opacity={S.D.opacitySubtle} />
        <path d="M36 41 L36 55 M38 41 L38 55" opacity={S.D.opacitySubtle} />
        <path d="M62 41 L62 55 M64 41 L64 55" opacity={S.D.opacitySubtle} />
        <path d="M67 45 L67 57 M69 45 L69 57" opacity={S.D.opacitySubtle} />
        <path d="M73 49 L73 57 M75 49 L75 57" opacity={S.D.opacitySubtle} />

        {/* Archivolt voussoir divisions */}
        <path d="M50 8 L50 14" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M40 12 L41 18" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M60 12 L59 18" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M30 20 L32 26" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M70 20 L68 26" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 13. PEDIMENT DOOR
// Classical door with triangular pediment — Georgian townhouse / Palladian entry
// Reference: Georgian townhouse doors, Palladian entries, Greek temple doorways
// ============================================================================
const PedimentDoorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pediment-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#pediment-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (far): Upper story windows above */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        {/* Upper story window — left */}
        <path d="M20 -8 L20 2 L35 2 L35 -8 Z" />
        <path d="M27 -8 L27 2" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        {/* Upper story window — right */}
        <path d="M65 -8 L65 2 L80 2 L80 -8 Z" />
        <path d="M72 -8 L72 2" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        {/* Stone sill course */}
        <path d="M5 3 L95 3" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
      </g>

      {/* CONTEXT (near): Brick/stone wall flanking, street pavement, steps */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Brick wall surface — coursing lines */}
        <path d="M5 5 L95 5" />
        <path d="M5 5 L5 88" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M95 5 L95 88" strokeWidth={S.CN.strokeWidthFine} />
        {/* Brick course lines */}
        <path d="M5 12 L20 12 M80 12 L95 12" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M5 19 L18 19 M82 19 L95 19" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M5 40 L20 40 M80 40 L95 40" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M5 55 L18 55 M82 55 L95 55" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M5 70 L20 70 M80 70 L95 70" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Vertical brick joints (staggered) */}
        <path d="M10 12 L10 19 M15 5 L15 12 M85 12 L85 19 M90 5 L90 12" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Steps up to door — 3 stone steps */}
        <path d="M18 88 L82 88" />
        <path d="M15 91 L85 91" />
        <path d="M12 94 L88 94" />
        {/* Step risers */}
        <path d="M18 88 L18 91 M82 88 L82 91" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M15 91 L15 94 M85 91 L85 94" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Street-level pavement */}
        <path d="M0 97 L100 97" />
        <path d="M0 100 L100 100" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Paving joints */}
        <path d="M20 97 L20 100 M40 97 L40 100 M60 97 L60 100 M80 97 L80 100" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY: Classical pediment door — Georgian six-panel door */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Triangular pediment — two raking cornices meeting at apex */}
        <path d="M20 20 L50 8 L80 20" strokeWidth={S.P.strokeWidthBold} />
        {/* Pediment bottom cornice (horizontal) */}
        <path d="M18 20 L82 20" strokeWidth={S.P.strokeWidthBold} />
        {/* Pediment raking cornice — return mouldings */}
        <path d="M20 22 L50 10 L80 22" strokeWidth={S.D.strokeWidth} />

        {/* Entablature / frieze band below pediment */}
        <path d="M20 22 L80 22" strokeWidth={S.P.strokeWidth} />
        <path d="M20 26 L80 26" strokeWidth={S.P.strokeWidth} />
        {/* Frieze surface */}
        <path d="M20 24 L80 24" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />

        {/* Pilasters — fluted classical columns flanking door */}
        {/* Left pilaster */}
        <path d="M22 26 L22 86 L28 86 L28 26 Z" strokeWidth={S.P.strokeWidth} />
        {/* Right pilaster */}
        <path d="M72 26 L72 86 L78 86 L78 26 Z" strokeWidth={S.P.strokeWidth} />
        {/* Pilaster capitals — simplified Ionic volutes */}
        <path d="M21 24 L29 24 L29 26 L21 26" strokeWidth={S.D.strokeWidth} />
        <path d="M71 24 L79 24 L79 26 L71 26" strokeWidth={S.D.strokeWidth} />
        {/* Pilaster bases */}
        <path d="M21 86 L29 86 L29 88 L21 88" strokeWidth={S.D.strokeWidth} />
        <path d="M71 86 L79 86 L79 88 L71 88" strokeWidth={S.D.strokeWidth} />

        {/* Classical door frame */}
        <path d="M30 28 L30 86 L70 86 L70 28 Z" strokeWidth={S.P.strokeWidthBold} />

        {/* Six-panel door — 3 rows of 2 panels */}
        {/* Door stiles and rails */}
        <path d="M32 30 L32 84 L68 84 L68 30 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Center stile */}
        <path d="M50 30 L50 84" strokeWidth={S.P.strokeWidthLight} />
        {/* Top rail */}
        <path d="M32 42 L68 42" strokeWidth={S.P.strokeWidthLight} />
        {/* Lock rail */}
        <path d="M32 56 L68 56" strokeWidth={S.P.strokeWidthLight} />

        {/* Top panels (short) */}
        <path d="M34 32 L34 40 L48 40 L48 32 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M52 32 L52 40 L66 40 L66 32 Z" strokeWidth={S.D.strokeWidth} />
        {/* Middle panels (medium) */}
        <path d="M34 44 L34 54 L48 54 L48 44 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M52 44 L52 54 L66 54 L66 44 Z" strokeWidth={S.D.strokeWidth} />
        {/* Bottom panels (tall) */}
        <path d="M34 58 L34 82 L48 82 L48 58 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M52 58 L52 82 L66 82 L66 58 Z" strokeWidth={S.D.strokeWidth} />

        {/* Door handle / knob */}
        <circle cx="52" cy="57" r="1.5" strokeWidth={S.P.strokeWidthLight} />
        {/* Keyhole escutcheon */}
        <path d="M51 60 L53 60 L53 63 L51 63 Z" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="52" cy="61" r="0.5" strokeWidth={S.D.strokeWidthFine} />

        {/* Letter slot */}
        <path d="M45 72 L55 72" strokeWidth={S.P.strokeWidthLight} />
      </g>

      {/* DETAIL: Panel moldings, pediment tympanum, acroterion, pilaster fluting, fanlight */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity}>
        {/* Panel molding profiles — inner raised panel lines */}
        <path d="M36 34 L36 38 L46 38 L46 34 Z" opacity={S.D.opacitySubtle} />
        <path d="M54 34 L54 38 L64 38 L64 34 Z" opacity={S.D.opacitySubtle} />
        <path d="M36 46 L36 52 L46 52 L46 46 Z" opacity={S.D.opacitySubtle} />
        <path d="M54 46 L54 52 L64 52 L64 46 Z" opacity={S.D.opacitySubtle} />
        <path d="M36 60 L36 80 L46 80 L46 60 Z" opacity={S.D.opacitySubtle} />
        <path d="M54 60 L54 80 L64 80 L64 60 Z" opacity={S.D.opacitySubtle} />

        {/* Pediment tympanum — decorative field inside triangle */}
        {/* Oval patera / rosette at center */}
        <ellipse cx="50" cy="16" rx="4" ry="3" opacity={S.D.opacityStrong} />
        <circle cx="50" cy="16" r="1.5" opacity={S.D.opacitySubtle} />
        {/* Swag decoration flanking */}
        <path d="M34 18 Q38 16 42 18" opacity={S.D.opacitySubtle} />
        <path d="M58 18 Q62 16 66 18" opacity={S.D.opacitySubtle} />

        {/* Acroterion at apex */}
        <path d="M48 8 L50 4 L52 8" opacity={S.D.opacityStrong} />
        <path d="M49 5 L50 3 L51 5" opacity={S.D.opacitySubtle} />

        {/* Pilaster fluting — vertical grooves */}
        {/* Left pilaster flutes */}
        <path d="M24 28 L24 84" opacity={S.D.opacitySubtle} />
        <path d="M25 28 L25 84" opacity={S.D.opacitySubtle} />
        <path d="M26 28 L26 84" opacity={S.D.opacitySubtle} />
        {/* Right pilaster flutes */}
        <path d="M74 28 L74 84" opacity={S.D.opacitySubtle} />
        <path d="M75 28 L75 84" opacity={S.D.opacitySubtle} />
        <path d="M76 28 L76 84" opacity={S.D.opacitySubtle} />

        {/* Fanlight / transom below entablature */}
        <path d="M30 28 L70 28" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M32 28 L50 30 L68 28" opacity={S.D.opacitySubtle} />
        {/* Fanlight glazing bars — radiating spokes */}
        <path d="M50 28 L50 30" opacity={S.D.opacitySubtle} />
        <path d="M40 28 L44 30" opacity={S.D.opacitySubtle} />
        <path d="M60 28 L56 30" opacity={S.D.opacitySubtle} />
        <path d="M35 28 L40 30" opacity={S.D.opacitySubtle} />
        <path d="M65 28 L60 30" opacity={S.D.opacitySubtle} />

        {/* Ionic volute scrolls on capitals */}
        <path d="M21 25 Q22 23 24 25" opacity={S.D.opacitySubtle} />
        <path d="M26 25 Q28 23 29 25" opacity={S.D.opacitySubtle} />
        <path d="M71 25 Q72 23 74 25" opacity={S.D.opacitySubtle} />
        <path d="M76 25 Q78 23 79 25" opacity={S.D.opacitySubtle} />

        {/* Door knocker — lion's head ring */}
        <circle cx="48" cy="50" r="2" opacity={S.D.opacityStrong} />
        <circle cx="48" cy="52" r="1" opacity={S.D.opacitySubtle} />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 14. ARCHITRAVE
// Classical door architrave — full door frame surround with layered molding profiles
// Reference: Greek/Roman/Renaissance door surrounds, Palladian interiors
// ============================================================================
const ArchitraveSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="architrave-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#architrave-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Stone wall on either side, floor paving, ceiling cornice */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Plastered wall surface left */}
        <path d="M-5 5 L-5 95 L18 95 L18 5 Z" />
        {/* Plastered wall surface right */}
        <path d="M82 5 L82 95 L105 95 L105 5 Z" />
        {/* Wall texture — faint ashlar joints */}
        <path d="M-3 25 L16 25" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M-3 45 L16 45" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M84 25 L103 25" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M84 45 L103 45" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Floor paving — stone flags */}
        <path d="M-5 95 L105 95" />
        <path d="M-5 98 L105 98" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M20 95 L20 100" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M50 95 L50 100" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M80 95 L80 100" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Ceiling/cornice line above */}
        <path d="M-5 5 L105 5" />
        <path d="M-5 3 L105 3" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY: The architrave frame — vertical jambs and horizontal lintel with molding profiles */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Outer architrave profile — left jamb */}
        <path d="M18 10 L18 92" strokeWidth={S.P.strokeWidthBold} />
        {/* Second fascia band — left jamb */}
        <path d="M21 12 L21 92" strokeWidth={S.P.strokeWidth} />
        {/* Third fascia (innermost) — left jamb */}
        <path d="M24 14 L24 92" strokeWidth={S.P.strokeWidthLight} />
        {/* Inner edge of left jamb reveal */}
        <path d="M27 16 L27 92" strokeWidth={S.P.strokeWidthLight} />

        {/* Outer architrave profile — right jamb */}
        <path d="M82 10 L82 92" strokeWidth={S.P.strokeWidthBold} />
        {/* Second fascia band — right jamb */}
        <path d="M79 12 L79 92" strokeWidth={S.P.strokeWidth} />
        {/* Third fascia (innermost) — right jamb */}
        <path d="M76 14 L76 92" strokeWidth={S.P.strokeWidthLight} />
        {/* Inner edge of right jamb reveal */}
        <path d="M73 16 L73 92" strokeWidth={S.P.strokeWidthLight} />

        {/* Horizontal lintel architrave — outer band */}
        <path d="M18 10 L82 10" strokeWidth={S.P.strokeWidthBold} />
        {/* Second fascia band — horizontal */}
        <path d="M21 12 L79 12" strokeWidth={S.P.strokeWidth} />
        {/* Third fascia — horizontal */}
        <path d="M24 14 L76 14" strokeWidth={S.P.strokeWidthLight} />
        {/* Inner soffit line */}
        <path d="M27 16 L73 16" strokeWidth={S.P.strokeWidthLight} />

        {/* Corner blocks (paterae) — top left */}
        <path d="M15 7 L28 7 L28 19 L15 19 Z" strokeWidth={S.P.strokeWidth} />
        {/* Rosette in top-left corner block */}
        <circle cx="21.5" cy="13" r="4" strokeWidth={S.D.strokeWidth} />
        <circle cx="21.5" cy="13" r="1.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />
        {/* Rosette petals */}
        <path d="M21.5 9 L21.5 10.5 M21.5 15.5 L21.5 17 M17.5 13 L19 13 M24 13 L25.5 13" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M18.7 10.2 L19.8 11.3 M23.2 14.7 L24.3 15.8 M18.7 15.8 L19.8 14.7 M23.2 11.3 L24.3 10.2" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Corner block (patera) — top right */}
        <path d="M72 7 L85 7 L85 19 L72 19 Z" strokeWidth={S.P.strokeWidth} />
        {/* Rosette in top-right corner block */}
        <circle cx="78.5" cy="13" r="4" strokeWidth={S.D.strokeWidth} />
        <circle cx="78.5" cy="13" r="1.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />
        {/* Rosette petals */}
        <path d="M78.5 9 L78.5 10.5 M78.5 15.5 L78.5 17 M74.5 13 L76 13 M81 13 L82.5 13" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M75.7 10.2 L76.8 11.3 M80.2 14.7 L81.3 15.8 M75.7 15.8 L76.8 14.7 M80.2 11.3 L81.3 10.2" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Threshold / sill at base */}
        <path d="M18 92 L82 92" strokeWidth={S.P.strokeWidthBold} />
        <path d="M18 94 L82 94" strokeWidth={S.D.strokeWidth} />
      </g>

      {/* DETAIL: Molding profiles, bead-and-reel, astragal, stone joints */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity}>
        {/* Cyma recta profile curve — left jamb (between 1st and 2nd fascia) */}
        <path d="M19 20 Q19.5 21 20 20 Q19.5 19 19 20" />
        <path d="M19 35 Q19.5 36 20 35 Q19.5 34 19 35" />
        <path d="M19 50 Q19.5 51 20 50 Q19.5 49 19 50" />
        <path d="M19 65 Q19.5 66 20 65 Q19.5 64 19 65" />
        <path d="M19 80 Q19.5 81 20 80 Q19.5 79 19 80" />

        {/* Cyma recta profile curve — right jamb */}
        <path d="M81 20 Q80.5 21 80 20 Q80.5 19 81 20" />
        <path d="M81 35 Q80.5 36 80 35 Q80.5 34 81 35" />
        <path d="M81 50 Q80.5 51 80 50 Q80.5 49 81 50" />
        <path d="M81 65 Q80.5 66 80 65 Q80.5 64 81 65" />
        <path d="M81 80 Q80.5 81 80 80 Q80.5 79 81 80" />

        {/* Bead-and-reel ornament — horizontal lintel (between 2nd and 3rd fascia) */}
        <path d="M30 13 L31 13 M33 13 L34 13 M36 13 L37 13 M39 13 L40 13 M42 13 L43 13 M45 13 L46 13 M48 13 L49 13 M51 13 L52 13 M54 13 L55 13 M57 13 L58 13 M60 13 L61 13 M63 13 L64 13 M66 13 L67 13 M69 13 L70 13" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />
        <circle cx="32" cy="13" r="0.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />
        <circle cx="38" cy="13" r="0.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />
        <circle cx="44" cy="13" r="0.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />
        <circle cx="50" cy="13" r="0.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />
        <circle cx="56" cy="13" r="0.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />
        <circle cx="62" cy="13" r="0.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />
        <circle cx="68" cy="13" r="0.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacityStrong} />

        {/* Astragal bead — left jamb (between 2nd and 3rd fascia) */}
        <circle cx="22.5" cy="25" r="0.5" />
        <circle cx="22.5" cy="30" r="0.5" />
        <circle cx="22.5" cy="40" r="0.5" />
        <circle cx="22.5" cy="55" r="0.5" />
        <circle cx="22.5" cy="70" r="0.5" />
        <circle cx="22.5" cy="85" r="0.5" />

        {/* Astragal bead — right jamb */}
        <circle cx="77.5" cy="25" r="0.5" />
        <circle cx="77.5" cy="30" r="0.5" />
        <circle cx="77.5" cy="40" r="0.5" />
        <circle cx="77.5" cy="55" r="0.5" />
        <circle cx="77.5" cy="70" r="0.5" />
        <circle cx="77.5" cy="85" r="0.5" />

        {/* Stone joint lines on architrave blocks */}
        <path d="M35 10 L35 16" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M50 10 L50 16" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M65 10 L65 16" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      </g>

      {/* EFFECTS: Light shadow in the door opening */}
      <g strokeDasharray={S.E.dash} opacity={S.E.opacity} strokeWidth={S.E.strokeWidth}>
        <path d="M30 20 L30 90" />
        <path d="M70 20 L70 90" />
        <path d="M40 18 L40 90" />
        <path d="M60 18 L60 90" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 13. LINTEL
// Structural lintel — massive horizontal stone/timber beam spanning a doorway
// Reference: Mycenaean Lion Gate, Egyptian temple lintels, megalithic construction
// ============================================================================
const LintelSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="lintel-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#lintel-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (far): Additional wall continuing above */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        {/* Upper masonry courses continuing above the wall */}
        <path d="M-5 -5 L105 -5" />
        <path d="M-5 0 L105 0" />
        <path d="M-5 5 L105 5" />
        {/* Vertical joints in upper wall */}
        <path d="M20 -5 L20 5" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        <path d="M50 -5 L50 5" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        <path d="M80 -5 L80 5" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
      </g>

      {/* CONTEXT (near): Massive masonry walls on both sides, ground/threshold */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Left wall — coursed stone blocks */}
        <path d="M-5 8 L25 8 L25 95 L-5 95 Z" />
        {/* Left wall horizontal courses */}
        <path d="M-5 18 L25 18" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M-5 28 L25 28" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M-5 40 L25 40" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M-5 52 L25 52" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M-5 64 L25 64" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M-5 76 L25 76" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M-5 88 L25 88" strokeWidth={S.CN.strokeWidthFine} />
        {/* Left wall vertical joints (staggered) */}
        <path d="M5 8 L5 18 M15 18 L15 28 M8 28 L8 40 M18 40 L18 52 M5 52 L5 64 M15 64 L15 76 M8 76 L8 88" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Right wall — coursed stone blocks */}
        <path d="M75 8 L105 8 L105 95 L75 95 Z" />
        {/* Right wall horizontal courses */}
        <path d="M75 18 L105 18" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M75 28 L105 28" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M75 40 L105 40" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M75 52 L105 52" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M75 64 L105 64" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M75 76 L105 76" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M75 88 L105 88" strokeWidth={S.CN.strokeWidthFine} />
        {/* Right wall vertical joints (staggered) */}
        <path d="M85 8 L85 18 M95 18 L95 28 M88 28 L88 40 M82 40 L82 52 M95 52 L95 64 M85 64 L85 76 M92 76 L92 88" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Ground / threshold below */}
        <path d="M-5 95 L105 95" />
        <path d="M-5 98 L105 98" strokeWidth={S.CN.strokeWidthFine} />
        {/* Worn stone threshold in opening */}
        <path d="M25 95 L75 95" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY: The lintel — massive horizontal stone beam spanning the opening */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Lintel top edge */}
        <path d="M20 18 L80 18" strokeWidth={S.P.strokeWidthBold} />
        {/* Lintel bottom edge — slight camber (upward bow) in center for structural expression */}
        <path d="M20 32 Q50 30 80 32" strokeWidth={S.P.strokeWidthBold} />
        {/* Lintel left end */}
        <path d="M20 18 L20 32" strokeWidth={S.P.strokeWidthBold} />
        {/* Lintel right end */}
        <path d="M80 18 L80 32" strokeWidth={S.P.strokeWidthBold} />

        {/* Bearing areas — where lintel sits on jamb walls */}
        {/* Left bearing (lintel extends into left wall) */}
        <path d="M20 18 L25 18 L25 32 L20 32" strokeWidth={S.P.strokeWidth} />
        {/* Right bearing (lintel extends into right wall) */}
        <path d="M75 18 L80 18 L80 32 L75 32" strokeWidth={S.P.strokeWidth} />
        {/* Bearing seat lines — where stone meets stone */}
        <path d="M25 18 L25 32" strokeWidth={S.P.strokeWidth} />
        <path d="M75 18 L75 32" strokeWidth={S.P.strokeWidth} />

        {/* Wall jamb edges defining the opening */}
        <path d="M25 32 L25 95" strokeWidth={S.P.strokeWidthBold} />
        <path d="M75 32 L75 95" strokeWidth={S.P.strokeWidthBold} />

        {/* Inner face of opening — reveals the void */}
        <path d="M25 32 L75 32" strokeWidth={S.P.strokeWidthLight} />

        {/* Slight deflection crack suggestion in center (structural honesty) */}
        <path d="M49 30 L50 32 L51 30" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      </g>

      {/* DETAIL: Stone jointing in lintel, grain/texture, bearing details */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity}>
        {/* Lintel stone joints — massive block divisions */}
        <path d="M38 18 L38 32" strokeWidth={S.D.strokeWidth} />
        <path d="M55 18 L55 32" strokeWidth={S.D.strokeWidth} />
        <path d="M68 18 L68 32" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M32 18 L32 32" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Stone grain / weathering lines running through lintel */}
        <path d="M22 22 L35 23 L48 22 L60 23 L78 22" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M22 27 L40 28 L55 27 L70 28 L78 27" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Bearing stress marks — fine cracks at bearing points */}
        <path d="M24 32 L26 34" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M76 32 L74 34" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Tooling marks on lintel face */}
        <path d="M30 20 L31 20 M34 25 L35 25 M42 21 L43 21 M46 26 L47 26 M58 20 L59 20 M62 25 L63 25 M70 21 L71 21 M74 26 L75 26" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Course line at wall top where lintel rests */}
        <path d="M-5 8 L20 8" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M80 8 L105 8" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      </g>

      {/* EFFECTS: Shadow within the opening void */}
      <g strokeDasharray={S.E.dash} opacity={S.E.opacity} strokeWidth={S.E.strokeWidth}>
        <path d="M28 35 L28 92" />
        <path d="M35 33 L35 92" />
        <path d="M50 32 L50 92" />
        <path d="M65 33 L65 92" />
        <path d="M72 35 L72 92" />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 16. DOOR KNOCKER
// Close-up of a decorative lion-head door knocker on a paneled door face
// Reference: Medieval sanctuary knockers, Georgian lion head knockers, Durham Cathedral
// ============================================================================
const DoorKnockerSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="knocker-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#knocker-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Paneled door face with studs */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Door edge stiles */}
        <path d="M5 -5 L5 105" />
        <path d="M95 -5 L95 105" />
        {/* Top rail */}
        <path d="M5 2 L95 2" />
        {/* Bottom rail */}
        <path d="M5 98 L95 98" />
        {/* Middle rail */}
        <path d="M5 50 L20 50 M80 50 L95 50" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Upper raised panel borders */}
        <path d="M12 8 L12 44 L42 44 L42 8 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M58 8 L58 44 L88 44 L88 8 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Lower raised panel borders */}
        <path d="M12 56 L12 92 L42 92 L42 56 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M58 56 L58 92 L88 92 L88 56 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Decorative nail studs along stiles */}
        <circle cx="8" cy="15" r="0.8" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <circle cx="8" cy="35" r="0.8" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <circle cx="8" cy="65" r="0.8" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <circle cx="8" cy="85" r="0.8" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <circle cx="92" cy="15" r="0.8" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <circle cx="92" cy="35" r="0.8" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <circle cx="92" cy="65" r="0.8" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <circle cx="92" cy="85" r="0.8" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Wood grain suggestion on panels */}
        <path d="M20 12 L20 40" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M66 12 L66 40" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M20 60 L20 88" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M66 60 L66 88" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY: Lion-head knocker with ring and escutcheon */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Decorative backplate / escutcheon — round medallion */}
        <circle cx="50" cy="46" r="26" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="50" cy="46" r="24" strokeWidth={S.P.strokeWidthLight} />

        {/* Bead border on escutcheon */}
        <circle cx="50" cy="20.5" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="55.5" cy="21" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="61" cy="22.5" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="65.5" cy="25" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="69.5" cy="28.5" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="72.5" cy="33" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="74" cy="38" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="75" cy="43.5" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="74.5" cy="49" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="73" cy="54" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="70.5" cy="58.5" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="67" cy="62.5" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="62" cy="65.5" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="56.5" cy="67.5" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="50" cy="68.5" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="44.5" cy="21" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="39" cy="22.5" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="34.5" cy="25" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="30.5" cy="28.5" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="27.5" cy="33" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="26" cy="38" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="25" cy="43.5" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="25.5" cy="49" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="27" cy="54" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="29.5" cy="58.5" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="33" cy="62.5" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="38" cy="65.5" r="1" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="43.5" cy="67.5" r="1" strokeWidth={S.D.strokeWidthFine} />

        {/* Lion face — simplified geometric */}
        {/* Head outline */}
        <circle cx="50" cy="42" r="12" strokeWidth={S.P.strokeWidth} />

        {/* Mane — outer radiating mass */}
        <path d="M50 26 Q56 28 60 30 Q65 28 68 32 Q70 36 68 40 Q72 43 70 48 Q72 52 68 55 Q65 58 60 57 Q56 60 50 60 Q44 60 40 57 Q35 58 32 55 Q28 52 30 48 Q28 43 32 40 Q30 36 32 32 Q35 28 40 30 Q44 28 50 26 Z" strokeWidth={S.P.strokeWidthBold} />

        {/* Eyes — almond-shaped, fierce */}
        <path d="M42 39 Q44 37 47 39 Q44 41 42 39 Z" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="44.5" cy="39" r="1" strokeWidth={S.D.strokeWidth} />
        <path d="M53 39 Q56 37 58 39 Q56 41 53 39 Z" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="55.5" cy="39" r="1" strokeWidth={S.D.strokeWidth} />

        {/* Brow ridges */}
        <path d="M41 36 L47 35" strokeWidth={S.P.strokeWidthLight} />
        <path d="M53 35 L59 36" strokeWidth={S.P.strokeWidthLight} />

        {/* Nose — broad, triangular */}
        <path d="M48 41 L50 44 L52 41" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="48" cy="42" r="0.8" strokeWidth={S.D.strokeWidthFine} />
        <circle cx="52" cy="42" r="0.8" strokeWidth={S.D.strokeWidthFine} />

        {/* Mouth — open, gripping the ring */}
        <path d="M44 47 Q47 49 50 50 Q53 49 56 47" strokeWidth={S.P.strokeWidth} />
        <path d="M45 47 Q47 45 50 46 Q53 45 55 47" strokeWidth={S.D.strokeWidth} />

        {/* Cheek tufts */}
        <path d="M38 44 L40 46" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M62 44 L60 46" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

        {/* Ring hanging from lion's mouth */}
        <path d="M47 50 Q47 52 48 53" strokeWidth={S.P.strokeWidth} />
        <path d="M53 50 Q53 52 52 53" strokeWidth={S.P.strokeWidth} />
        <circle cx="50" cy="68" r="15" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="50" cy="68" r="12.5" strokeWidth={S.P.strokeWidthLight} />

        {/* Mounting bolts — top and bottom of escutcheon */}
        <circle cx="50" cy="23" r="2" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="50" cy="23" r="0.8" strokeWidth={S.D.strokeWidthFine} />

        {/* DETAIL: Mane detail lines radiating from face */}
        <path d="M50 26 L50 22" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M56 28 L58 24" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M44 28 L42 24" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M62 30 L66 27" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M38 30 L34 27" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M68 36 L72 34" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M32 36 L28 34" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M70 44 L74 44" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M30 44 L26 44" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M68 52 L72 55" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M32 52 L28 55" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

        {/* Texture lines on ring */}
        <path d="M35 68 L37.5 68" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M62.5 68 L65 68" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M50 83 L50 80.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M40 78 L42 76.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M60 78 L58 76.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M38 58 L40 59.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M62 58 L60 59.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
      </g>
    </g>
  </svg>
)

// ============================================================================
// 17. TRANSOM
// Federal-style semicircular fanlight transom window above a doorway
// Reference: Federal-style fanlights, Georgian semicircular transoms, Adam style
// ============================================================================
const TransomSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="transom-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#transom-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (far): Brick wall pattern above and around */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        {/* Brick courses above arch */}
        <path d="M-5 18 L15 18 M20 18 L40 18 M45 18 L65 18 M70 18 L90 18 M95 18 L105 18" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        <path d="M-5 14 L10 14 M15 14 L35 14 M40 14 L60 14 M65 14 L85 14 M90 14 L105 14" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        <path d="M-5 10 L20 10 M25 10 L45 10 M50 10 L70 10 M75 10 L95 10 M100 10 L105 10" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        <path d="M-5 6 L12 6 M17 6 L37 6 M42 6 L62 6 M67 6 L87 6 M92 6 L105 6" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        <path d="M-5 2 L25 2 M30 2 L50 2 M55 2 L75 2 M80 2 L105 2" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        {/* Vertical brick joints (staggered) */}
        <path d="M15 18 L15 14 M40 18 L40 14 M65 18 L65 14 M90 18 L90 14" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        <path d="M10 14 L10 10 M35 14 L35 10 M60 14 L60 10 M85 14 L85 10" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        <path d="M20 10 L20 6 M45 10 L45 6 M70 10 L70 6 M95 10 L95 6" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />

        {/* Brick on sides beside frame */}
        <path d="M-5 30 L8 30 M92 30 L105 30" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        <path d="M-5 34 L8 34 M92 34 L105 34" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        <path d="M-5 38 L8 38 M92 38 L105 38" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        <path d="M-5 42 L8 42 M92 42 L105 42" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        <path d="M-5 46 L8 46 M92 46 L105 46" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        <path d="M-5 50 L8 50 M92 50 L105 50" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
      </g>

      {/* CONTEXT (near): Door frame below — top of the door */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Door frame jambs */}
        <path d="M12 60 L12 105" />
        <path d="M88 60 L88 105" />
        {/* Door stiles */}
        <path d="M15 62 L15 105" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M85 62 L85 105" strokeWidth={S.CN.strokeWidthFine} />

        {/* Door top rail */}
        <path d="M15 62 L85 62" strokeWidth={S.CN.strokeWidthFine} />

        {/* Upper door panels (partially visible) */}
        <path d="M20 65 L20 85 L48 85 L48 65 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M52 65 L52 85 L80 85 L80 65 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Door knob suggestion */}
        <circle cx="80" cy="80" r="1.5" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Lower door panels (partially visible) */}
        <path d="M20 88 L20 102 L48 102 L48 88 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M52 88 L52 102 L80 102 L80 88 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />

        {/* Wall surface flanking frame */}
        <path d="M-5 60 L10 60 M90 60 L105 60" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY: Semicircular fanlight transom window */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Horizontal transom bar separating fanlight from door */}
        <path d="M10 60 L90 60" strokeWidth={S.P.strokeWidthBold} />
        <path d="M10 58 L90 58" strokeWidth={S.P.strokeWidthLight} />

        {/* Outer arch frame — semicircular */}
        <path d="M10 60 Q10 20 50 20 Q90 20 90 60" strokeWidth={S.P.strokeWidthBold} />
        {/* Inner arch frame */}
        <path d="M14 58 Q14 24 50 24 Q86 24 86 58" strokeWidth={S.P.strokeWidth} />

        {/* Decorative keystone at arch apex */}
        <path d="M46 20 L46 16 L50 14 L54 16 L54 20" strokeWidth={S.P.strokeWidthBold} />
        <path d="M47 24 L47 20 L53 20 L53 24" strokeWidth={S.P.strokeWidthLight} />
        {/* Keystone face detail */}
        <path d="M48 17 L50 16 L52 17" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

        {/* Radiating glazing bars (muntins) — fan pattern from center bottom */}
        {/* Center vertical */}
        <path d="M50 58 L50 24" strokeWidth={S.P.strokeWidth} />
        {/* Fan bars radiating outward — left side */}
        <path d="M50 58 L30 28" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 58 L20 38" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 58 L14 50" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 58 L40 25" strokeWidth={S.P.strokeWidthLight} />
        {/* Fan bars radiating outward — right side */}
        <path d="M50 58 L70 28" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 58 L80 38" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 58 L86 50" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 58 L60 25" strokeWidth={S.P.strokeWidthLight} />

        {/* Curved horizontal glazing bars (concentric arcs) */}
        <path d="M22 48 Q36 36 50 34 Q64 36 78 48" strokeWidth={S.P.strokeWidthLight} />
        <path d="M16 54 Q33 42 50 40 Q67 42 84 54" strokeWidth={S.D.strokeWidth} />

        {/* Springer blocks at arch base — left */}
        <path d="M10 60 L10 54 L14 54 L14 58" strokeWidth={S.P.strokeWidth} />
        {/* Springer blocks at arch base — right */}
        <path d="M90 60 L90 54 L86 54 L86 58" strokeWidth={S.P.strokeWidth} />

        {/* Frame jamb capitals (small molding at spring point) */}
        <path d="M8 54 L16 54" strokeWidth={S.P.strokeWidthLight} />
        <path d="M84 54 L92 54" strokeWidth={S.P.strokeWidthLight} />

        {/* DETAIL: Leading lines between glazing bars */}
        <path d="M14 56 L14 58" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M86 56 L86 58" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

        {/* Sill profile — molding below transom bar */}
        <path d="M8 60 L8 62 L92 62 L92 60" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M10 61 L90 61" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

        {/* Glass pane details — subtle fill to suggest glazing */}
        <path d="M50 34 Q44 36 38 42" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M50 34 Q56 36 62 42" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Individual pane leading — small details at intersections */}
        <circle cx="50" cy="34" r="0.8" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <circle cx="40" cy="25" r="0.6" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <circle cx="60" cy="25" r="0.6" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <circle cx="30" cy="28" r="0.6" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <circle cx="70" cy="28" r="0.6" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Arch extrados molding */}
        <path d="M8 60 Q8 18 50 18 Q92 18 92 60" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

        {/* Light effect through glass */}
        <path d="M35 40 L40 36" strokeDasharray={S.E.dash} strokeWidth={S.E.strokeWidth} opacity={S.E.opacity} />
        <path d="M60 36 L65 40" strokeDasharray={S.E.dash} strokeWidth={S.E.strokeWidth} opacity={S.E.opacity} />
        <path d="M48 28 L52 28" strokeDasharray={S.E.dash} strokeWidth={S.E.strokeWidth} opacity={S.E.opacity} />
      </g>
    </g>
  </svg>
)

// Export mapping for all door elements
// Keys match data element IDs from data/architecture/elements/doors/
export const DOOR_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  // Data element ID mappings (match id: field in data files)
  'architrave': ArchitraveSVG,
  'door-knocker': DoorKnockerSVG,
  'dutch-door': DutchDoorSVG,
  'lintel': LintelSVG,
  'paneled-door': PanelDoorSVG,
  'pediment-door': PedimentDoorSVG,
  'pocket-door': PocketDoorSVG,
  'portal': ArchedDoorSVG,
  'revolving-door': RevolvingDoorSVG,
  'transom': TransomSVG,
  'tympanum': TympanumSVG,
  // Additional SVGs (not in data but available for direct use)
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
  ArchitraveSVG,
  BifoldDoorSVG,
  DoorKnockerSVG,
  DutchDoorSVG,
  FrenchDoorSVG,
  LintelSVG,
  PanelDoorSVG,
  PedimentDoorSVG,
  PivotDoorSVG,
  PocketDoorSVG,
  RevolvingDoorSVG,
  SlidingDoorSVG,
  StableDoorSVG,
  TrapdoorSVG,
  TransomSVG,
  TympanumSVG,
}
