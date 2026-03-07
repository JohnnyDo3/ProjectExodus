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

// 1. Casement Window - side-hinged window that opens outward
// Reference: Tudor and Georgian architecture, common in European residential design
const CasementSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="casement-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#casement-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* EFFECTS: Light streaming through - Morning sunlight pouring into room */}
      <g opacity={S.E.opacity} strokeWidth={S.E.strokeWidth} strokeDasharray={S.E.dash}>
        {/* Dramatic light beams from open left casement */}
        <path d="M 24 30 L 8 45" stroke="currentColor" />
        <path d="M 30 35 L 10 55" stroke="currentColor" />
        <path d="M 35 40 L 12 65" stroke="currentColor" />
        <path d="M 38 50 L 14 75" stroke="currentColor" />
        <path d="M 35 60 L 12 82" stroke="currentColor" />
        <path d="M 30 70 L 10 88" stroke="currentColor" />
        {/* Dust motes dancing in the sunbeams */}
        <circle cx="18" cy="55" r="0.4" fill="currentColor" opacity="0.6" />
        <circle cx="15" cy="68" r="0.3" fill="currentColor" opacity="0.5" />
        <circle cx="12" cy="78" r="0.35" fill="currentColor" opacity="0.4" />
        <circle cx="20" cy="62" r="0.25" fill="currentColor" opacity="0.5" />
        {/* Glass reflection - subtle warping */}
        <path d="M 58 25 Q 60 30, 62 35" strokeWidth="0.3" opacity="0.15" />
        <path d="M 67 28 Q 69 35, 71 42" strokeWidth="0.3" opacity="0.15" />
      </g>

      {/* CONTEXT (near): Surrounding wall with lintel, sill, and reveal depth */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Wall surface flanking window */}
        <path d="M5 10 L5 90 L18 90 L18 10 Z" />
        <path d="M82 10 L82 90 L95 90 L95 10 Z" />
        {/* Stone lintel above window */}
        <path d="M5 10 L95 10" strokeWidth="1" />
        <path d="M3 7 L97 7" strokeWidth="0.6" />
        {/* Stone sill below window */}
        <path d="M5 90 L95 90" strokeWidth="1" />
        <path d="M8 93 L92 93" strokeWidth="0.6" />
        {/* Drip edge on sill */}
        <path d="M10 93 Q50 95, 90 93" strokeWidth="0.4" />
        {/* Wall continues above/below (full structure) */}
        <path d="M0 0 L100 0" strokeWidth="0.5" opacity="0.3" />
        <path d="M0 100 L100 100" strokeWidth="0.5" opacity="0.3" />
        <path d="M0 0 L0 100" strokeWidth="0.4" opacity="0.3" />
        <path d="M100 0 L100 100" strokeWidth="0.4" opacity="0.3" />
      </g>

      {/* PRIMARY: Casement window frame and sashes */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Outer frame */}
        <path d="M22 15 L22 85 M78 15 L78 85" />
        <path d="M20 15 Q50 13, 80 15" />
        <path d="M20 85 Q50 87, 80 85" />
        {/* Center mullion */}
        <path d="M49.5 15 L50.5 85" />
        {/* Left casement - slightly open */}
        <path d="M24 18 L24 82 L47 80 L47 20 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M35 48 L40 50 L35 52" />
        {/* Right casement */}
        <path d="M53 18 L53 82 L76 82 L76 18 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M60 48 L65 50 L60 52" />
        {/* Glass panes - left */}
        <path d="M27 22 L27 48 L44 47 L44 22 Z" />
        <path d="M27 52 L27 78 L44 77 L44 52 Z" />
        {/* Glass panes - right */}
        <path d="M56 22 L56 48 L73 48 L73 22 Z" />
        <path d="M56 52 L56 78 L73 78 L73 52 Z" />
        {/* Hinges */}
        <circle cx="24" cy="30" r="1.5" />
        <circle cx="24" cy="70" r="1.5" />
        <circle cx="76" cy="30" r="1.5" />
        <circle cx="76" cy="70" r="1.5" />
      </g>
    </g>
  </svg>
)

// 2. Clerestory Window - high windows above eye level
// Reference: Ancient Egyptian temples, Gothic cathedrals, modern passive solar design
const ClerestorySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="clerestory-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#clerestory-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT: COMPLETE CHURCH NAVE - field sketch extending off-page */}

      {/* CONTEXT (far): CEILING VAULT - Extending upward beyond frame */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        {/* Ribbed vaulting continuing up */}
        <path d="M -5 20 Q 25 -5, 50 -8 Q 75 -5, 105 20" fill="none" opacity="0.6" />
        {/* Vault ribs */}
        <path d="M 10 15 Q 30 0, 50 -3" fill="none" />
        <path d="M 50 -3 Q 70 0, 90 15" fill="none" />
        <path d="M 25 10 Q 38 -2, 50 -5" fill="none" opacity="0.7" />
        <path d="M 50 -5 Q 62 -2, 75 10" fill="none" opacity="0.7" />
      </g>

      {/* CONTEXT (far): TRIFORIUM ARCADE - Mid-level gallery extending horizontally */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        {/* Triforium arches extending off-page left */}
        <path d="M -10 58 Q -10 54, -5 52 Q 0 54, 0 58" fill="none" />
        <path d="M 0 58 Q 0 54, 5 52 Q 10 54, 10 58" fill="none" />

        {/* Triforium arches visible in frame */}
        <path d="M 10 58 Q 10 54, 15 52 Q 20 54, 20 58" fill="none" />
        <path d="M 20 58 Q 20 54, 25 52 Q 30 54, 30 58" fill="none" opacity="0.8" />
        <path d="M 35 58 Q 35 54, 40 52 Q 45 54, 45 58" fill="none" opacity="0.7" />
        <path d="M 55 58 Q 55 54, 60 52 Q 65 54, 65 58" fill="none" opacity="0.7" />
        <path d="M 70 58 Q 70 54, 75 52 Q 80 54, 80 58" fill="none" opacity="0.8" />
        <path d="M 80 58 Q 80 54, 85 52 Q 90 54, 90 58" fill="none" />

        {/* Continuing off-page right */}
        <path d="M 90 58 Q 90 54, 95 52 Q 100 54, 100 58" fill="none" />
        <path d="M 100 58 Q 100 54, 105 52 Q 110 54, 110 58" fill="none" />
      </g>

      {/* CONTEXT (near): NAVE ARCADE - Lower level colonnade extending beyond */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Arcade arches extending off-page left */}
        <path d="M -15 85 Q -15 68, 0 68 Q 15 68, 15 85" fill="none" />
        <path d="M -8 85 Q -8 70, 5 70 Q 18 70, 18 85" fill="none" opacity="0.7" />

        {/* Nave arcade in frame */}
        <path d="M 15 85 Q 15 68, 30 68 Q 45 68, 45 85" fill="none" />
        <path d="M 20 85 Q 20 70, 32 70 Q 44 70, 44 85" fill="none" opacity="0.7" />
        <path d="M 55 85 Q 55 68, 70 68 Q 85 68, 85 85" fill="none" />
        <path d="M 56 85 Q 56 70, 68 70 Q 80 70, 80 85" fill="none" opacity="0.7" />

        {/* Continuing off-page right */}
        <path d="M 85 85 Q 85 68, 100 68 Q 115 68, 115 85" fill="none" />
        <path d="M 82 85 Q 82 70, 95 70 Q 108 70, 108 85" fill="none" opacity="0.7" />
      </g>

      {/* CONTEXT (near): NAVE WALLS - Complete walls extending vertically */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Left nave wall extending off-page */}
        <path d="M -5 -10 L -5 110" fill="none" />
        <path d="M 0 -10 L 0 110" fill="none" opacity="0.8" />
        <path d="M 5 -10 L 5 110" fill="none" opacity="0.6" />

        {/* Right nave wall */}
        <path d="M 95 -10 L 95 110" fill="none" opacity="0.6" />
        <path d="M 100 -10 L 100 110" fill="none" opacity="0.8" />
        <path d="M 105 -10 L 105 110" fill="none" />

        {/* Stone courses */}
        <path d="M -5 35 L 10 35" strokeWidth="0.4" opacity="0.5" />
        <path d="M 90 35 L 105 35" strokeWidth="0.4" opacity="0.5" />
      </g>

      {/* CONTEXT (far): NAVE FLOOR - Extending down beyond frame */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        {/* Floor paving extending off-page */}
        <path d="M -10 95 L 110 95" strokeDasharray="5 3" />
        <path d="M -10 98 L 110 98" strokeDasharray="4 2" opacity="0.7" />
        <path d="M -10 102 L 110 102" strokeDasharray="3 2" opacity="0.5" />
        {/* Vertical joints */}
        <path d="M 20 94 L 20 110" strokeDasharray="2 1.5" opacity="0.5" />
        <path d="M 50 94 L 50 110" strokeDasharray="2 1.5" opacity="0.5" />
        <path d="M 80 94 L 80 110" strokeDasharray="2 1.5" opacity="0.5" />
      </g>

      {/* EFFECTS: DRAMATIC LIGHT STREAMING - High afternoon sun flooding the sanctuary */}
      <g opacity={S.E.opacityModerate} strokeWidth={S.E.strokeWidth} strokeDasharray={S.E.dash}>
        {/* Powerful light shafts from each window casting down */}
        <path d="M 20 32 L 15 70" stroke="currentColor" />
        <path d="M 24 30 L 20 72" stroke="currentColor" />
        <path d="M 28 32 L 25 75" stroke="currentColor" />
        <path d="M 40 30 L 35 70" stroke="currentColor" />
        <path d="M 44 28 L 40 73" stroke="currentColor" />
        <path d="M 48 30 L 45 76" stroke="currentColor" />
        <path d="M 60 30 L 55 70" stroke="currentColor" />
        <path d="M 64 28 L 60 74" stroke="currentColor" />
        <path d="M 68 30 L 65 77" stroke="currentColor" />
        <path d="M 80 32 L 75 70" stroke="currentColor" />
        <path d="M 84 30 L 80 73" stroke="currentColor" />
        <path d="M 86 32 L 83 76" stroke="currentColor" />
        {/* Cathedral dust motes floating in the sacred light */}
        <circle cx="22" cy="55" r="0.5" fill="currentColor" opacity="0.6" />
        <circle cx="30" cy="62" r="0.4" fill="currentColor" opacity="0.5" />
        <circle cx="18" cy="68" r="0.35" fill="currentColor" opacity="0.5" />
        <circle cx="43" cy="58" r="0.45" fill="currentColor" opacity="0.6" />
        <circle cx="48" cy="65" r="0.3" fill="currentColor" opacity="0.4" />
        <circle cx="63" cy="60" r="0.4" fill="currentColor" opacity="0.55" />
        <circle cx="70" cy="67" r="0.35" fill="currentColor" opacity="0.5" />
        <circle cx="82" cy="63" r="0.45" fill="currentColor" opacity="0.6" />
      </g>

      {/* PRIMARY: THE CLERESTORY WINDOWS - BOLD FIELD SKETCH LINES */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* BOLD Clerestory level wall */}
        <path d="M10 20 L10 55 L90 55 L90 20" strokeWidth={S.P.strokeWidthHeavy} />

        {/* BOLD Row of clerestory windows - high windows flooding nave with light */}
        <path d="M15 25 L15 50 L30 50 L30 25 Z" strokeWidth={S.P.strokeWidthHeavy} />
        <path d="M35 25 L35 50 L50 50 L50 25 Z" strokeWidth={S.P.strokeWidthHeavy} />
        <path d="M55 25 L55 50 L70 50 L70 25 Z" strokeWidth={S.P.strokeWidthHeavy} />
        <path d="M75 25 L75 50 L88 50 L88 25 Z" strokeWidth={S.P.strokeWidthHeavy} />

        {/* Window mullions */}
        <path d="M22.5 25 L22.5 50" strokeWidth={S.P.strokeWidth} />
        <path d="M42.5 25 L42.5 50" strokeWidth={S.P.strokeWidth} />
        <path d="M62.5 25 L62.5 50" strokeWidth={S.P.strokeWidth} />
        <path d="M81.5 25 L81.5 50" strokeWidth={S.P.strokeWidth} />

        {/* Window sills - stone thickness */}
        <path d="M15 50 L15 52 L30 52 L30 50" strokeWidth={S.P.strokeWidthBold} />
        <path d="M35 50 L35 52 L50 52 L50 50" strokeWidth={S.P.strokeWidthBold} />
        <path d="M55 50 L55 52 L70 52 L70 50" strokeWidth={S.P.strokeWidthBold} />
        <path d="M75 50 L75 52 L88 52 L88 50" strokeWidth={S.P.strokeWidthBold} />
      </g>
    </g>
  </svg>
)

// 3. Dormer Window - window projecting from sloped roof
// Reference: French mansard roofs, Colonial American architecture, Victorian homes
const DormerSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="dormer-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#dormer-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Main roof and building structure */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Main roof slope */}
        <path d="M5 85 L50 35 L95 85 Z" />
        {/* Roof tiles indication */}
        <path d="M15 75 Q50 68, 85 75" strokeDasharray="3,3" />
        <path d="M22 80 Q50 74, 78 80" strokeDasharray="3,3" />
      </g>

      {/* PRIMARY: Dormer structure and window */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Dormer walls */}
        <path d="M30 70 L30 45 L50 30 L70 45 L70 70" strokeWidth={S.P.strokeWidthLight} />
        {/* Dormer roof */}
        <path d="M28 45 L50 28 L72 45" strokeWidth={S.P.strokeWidthLight} />
        <path d="M26 47 L50 26 L74 47" />
        {/* Window in dormer */}
        <path d="M35 48 L35 68 L65 68 L65 48 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Window panes */}
        <path d="M50 48 L50 68" />
        <path d="M35 58 L65 58" />
        {/* DETAIL: Window details */}
        <path d="M38 51 L38 55 L47 55 L47 51 Z" />
        <path d="M53 51 L53 55 L62 55 L62 51 Z" />
        <path d="M38 61 L38 65 L47 65 L47 61 Z" />
        <path d="M53 61 L53 65 L62 65 L62 61 Z" />
        {/* Side walls */}
        <path d="M30 70 L22 78" />
        <path d="M70 70 L78 78" />
      </g>
    </g>
  </svg>
)

// 4. Lunette - semicircular or crescent window
// Reference: Roman thermae, Renaissance palaces, Baroque architecture
const LunetteSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="lunette-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#lunette-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Surrounding wall */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Wall below window */}
        <path d="M5 65 L5 95 L95 95 L95 65" />
        <path d="M10 70 L10 90 L35 90 L35 70 Z" />
        <path d="M65 70 L65 90 L90 90 L90 70 Z" />
        {/* Wall sides */}
        <path d="M5 20 L5 65" />
        <path d="M95 20 L95 65" />
      </g>

      {/* PRIMARY: Lunette window */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Semicircular frame */}
        <path d="M15 65 Q15 25, 50 20 Q85 25, 85 65" strokeWidth={S.P.strokeWidthLight} />
        <path d="M15 65 L85 65" strokeWidth={S.P.strokeWidthLight} />
        {/* Inner frame */}
        <path d="M20 63 Q20 32, 50 27 Q80 32, 80 63" />
        {/* Radiating mullions (fan pattern) */}
        <path d="M50 65 L50 27" />
        <path d="M50 65 L28 35" />
        <path d="M50 65 L72 35" />
        <path d="M50 65 L20 50" />
        <path d="M50 65 L80 50" />
        {/* DETAIL: Decorative keystone */}
        <path d="M45 25 L50 18 L55 25" strokeWidth={S.P.strokeWidthLight} />
        <path d="M47 22 L50 19 L53 22" />
      </g>
    </g>
  </svg>
)

// 5. Mullion - vertical bar dividing window panes
// Reference: Medieval Gothic windows, Tudor architecture, contemporary curtain walls
const MullionSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="mullion-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#mullion-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Surrounding wall */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 10 L5 90 L12 90 L12 10 Z" />
        <path d="M88 10 L88 90 L95 90 L95 10 Z" />
        <path d="M5 10 L95 10" />
        <path d="M5 90 L95 90" />
        {/* Glass panes (context) */}
        <path d="M18 18 L18 47 L35 47 L35 18 Z" opacity="0.3" />
        <path d="M41 18 L41 47 L58 47 L58 18 Z" opacity="0.3" />
        <path d="M64 18 L64 47 L82 47 L82 18 Z" opacity="0.3" />
        <path d="M18 53 L18 82 L35 82 L35 53 Z" opacity="0.3" />
        <path d="M41 53 L41 82 L58 82 L58 53 Z" opacity="0.3" />
        <path d="M64 53 L64 82 L82 82 L82 53 Z" opacity="0.3" />
      </g>

      {/* PRIMARY: Mullions and window frame */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Large window frame */}
        <path d="M15 15 L15 85 L85 85 L85 15 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Vertical mullions (emphasized) */}
        <path d="M38 15 L38 85" strokeWidth={S.P.strokeWidthBold} />
        <path d="M61 15 L61 85" strokeWidth={S.P.strokeWidthBold} />
        {/* DETAIL: Mullion detail - profile view */}
        <path d="M36 15 L36 85" strokeWidth={S.D.strokeWidthFine} />
        <path d="M40 15 L40 85" strokeWidth={S.D.strokeWidthFine} />
        <path d="M59 15 L59 85" strokeWidth={S.D.strokeWidthFine} />
        <path d="M63 15 L63 85" strokeWidth={S.D.strokeWidthFine} />
        {/* Horizontal transom */}
        <path d="M15 50 L85 50" strokeWidth={S.P.strokeWidthLight} />
        {/* Cross-section detail */}
        <path d="M92 40 L92 60" strokeWidth={S.P.strokeWidthBold} />
        <path d="M90 42 L94 42 L94 58 L90 58 Z" strokeWidth={S.P.strokeWidthLight} />
      </g>
    </g>
  </svg>
)

// 6. Oriel Window - bay window projecting from wall
// Reference: Medieval English manor houses, Tudor architecture, Victorian townhouses
const OrielWindowSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="oriel-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#oriel-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Building wall and supports */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Wall face */}
        <path d="M5 10 L5 95 L25 95 L25 10 Z" />
        <path d="M75 10 L75 95 L95 95 L95 10 Z" />
        {/* Upper wall */}
        <path d="M25 10 L25 20 L75 20 L75 10" />
        {/* Corbel support */}
        <path d="M35 82 Q42 88, 50 90 Q58 88, 65 82" />
        <path d="M40 84 L40 88 L50 92 L60 88 L60 84 Z" />
        {/* Floor below */}
        <path d="M5 95 L95 95" />
      </g>

      {/* PRIMARY: Oriel window structure */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Oriel projection - 3D effect */}
        <path d="M25 25 L25 75 L35 80 L50 82 L65 80 L75 75 L75 25 L65 20 L50 18 L35 20 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Front face of oriel */}
        <path d="M40 22 L40 78 L60 78 L60 22 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Side panels */}
        <path d="M25 25 L35 20 L35 80 L25 75 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M75 25 L65 20 L65 80 L75 75 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Window panes - front */}
        <path d="M43 25 L43 50 L57 50 L57 25 Z" />
        <path d="M43 53 L43 75 L57 75 L57 53 Z" />
        <path d="M50 25 L50 75" />
        {/* Window panes - sides */}
        <path d="M28 28 L28 72 L33 75 L33 23 Z" />
        <path d="M72 28 L72 72 L67 75 L67 23 Z" />
      </g>
    </g>
  </svg>
)

// 7. Palladian Window - tripartite window with arched center
// Reference: Andrea Palladio's Renaissance villas, Georgian and Federal architecture
const PalladianWindowSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="palladian-halo" intensity={1} />}
    <g filter={showHalo ? "url(#palladian-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* EFFECTS: ELEGANT LIGHT - Villa interior bathed in balanced natural light */}
      <g opacity={S.E.opacity} strokeWidth={S.E.strokeWidth} strokeDasharray={S.E.dash}>
        {/* Dramatic light from arched center section */}
        <path d="M 45 25 L 35 75" stroke="currentColor" />
        <path d="M 50 20 L 42 78" stroke="currentColor" />
        <path d="M 55 25 L 48 76" stroke="currentColor" />
        <path d="M 50 35 L 45 82" stroke="currentColor" />
        {/* Softer light from side sections */}
        <path d="M 20 48 L 8 82" stroke="currentColor" opacity="0.4" />
        <path d="M 25 52 L 12 85" stroke="currentColor" opacity="0.4" />
        <path d="M 75 48 L 62 82" stroke="currentColor" opacity="0.4" />
        <path d="M 80 52 L 68 85" stroke="currentColor" opacity="0.4" />
        {/* Dust motes in the Renaissance light */}
        <circle cx="48" cy="55" r="0.4" fill="currentColor" opacity="0.6" />
        <circle cx="42" cy="65" r="0.35" fill="currentColor" opacity="0.5" />
        <circle cx="38" cy="72" r="0.3" fill="currentColor" opacity="0.55" />
        <circle cx="18" cy="70" r="0.3" fill="currentColor" opacity="0.45" />
        <circle cx="65" cy="70" r="0.3" fill="currentColor" opacity="0.45" />
        {/* Light pools on marble floor */}
        <ellipse cx="42" cy="82" rx="10" ry="3" fill="currentColor" opacity="0.08" stroke="none" />
        <ellipse cx="15" cy="85" rx="6" ry="2" fill="currentColor" opacity="0.06" stroke="none" />
        <ellipse cx="65" cy="85" rx="6" ry="2" fill="currentColor" opacity="0.06" stroke="none" />
      </g>

      {/* CONTEXT (near): Surrounding wall */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Wall sections */}
        <path d="M5 10 L5 90 L10 90 L10 35" />
        <path d="M90 35 L90 90 L95 90 L95 10" />
        <path d="M5 10 L95 10" />
        {/* Floor/ground */}
        <path d="M5 90 L95 90" />
        {/* Wall above arch */}
        <path d="M10 10 L10 15 Q50 8, 90 15 L90 10" />
      </g>

      {/* PRIMARY: Palladian window */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Left rectangular section */}
        <path d="M12 40 L12 83 L32 83 L32 40 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M15 43 L15 80 L29 80 L29 43 Z" />
        <path d="M22 43 L22 80" />
        {/* Center arched section (taller) */}
        <path d="M34 85 L34 35 Q50 15, 66 35 L66 85" strokeWidth={S.P.strokeWidthLight} />
        <path d="M37 82 L37 38 Q50 20, 63 38 L63 82" />
        {/* Arch keystone */}
        <path d="M47 20 L50 15 L53 20" strokeWidth={S.P.strokeWidthLight} />
        {/* Center window divisions */}
        <path d="M50 22 L50 82" />
        <path d="M37 55 L63 55" />
        {/* Right rectangular section */}
        <path d="M68 40 L68 83 L88 83 L88 40 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M71 43 L71 80 L85 80 L85 43 Z" />
        <path d="M78 43 L78 80" />
        {/* Pilasters between sections */}
        <path d="M32 38 L32 85" strokeWidth={S.P.strokeWidth} />
        <path d="M34 38 L34 85" strokeWidth={S.D.strokeWidthFine} />
        <path d="M66 38 L66 85" strokeWidth={S.D.strokeWidthFine} />
        <path d="M68 38 L68 85" strokeWidth={S.P.strokeWidth} />
        {/* Impost blocks */}
        <path d="M32 38 L36 38 L36 42 L32 42 Z" />
        <path d="M64 38 L68 38 L68 42 L64 42 Z" />
      </g>
    </g>
  </svg>
)

// 8. Rose Window - circular ornamental window
// Reference: Gothic cathedrals (Notre-Dame, Chartres), Romanesque churches
const RoseWindowSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="rose-halo" intensity={1.1} />}
    <g filter={showHalo ? "url(#rose-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT: COMPLETE GOTHIC CATHEDRAL WEST FACADE - field sketch off-page */}

      {/* CONTEXT (far): TWIN TOWERS: Extending upward beyond frame (Notre-Dame style) */}
      <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
        {/* Left tower rising off-page */}
        <path d="M -5 110 L -5 -10" fill="none" />
        <path d="M 8 110 L 8 -10" fill="none" opacity="0.7" />
        {/* Gothic pinnacles at top */}
        <path d="M -5 -8 L 1.5 -15 L 8 -8" strokeWidth="0.5" opacity="0.6" />

        {/* Right tower rising off-page */}
        <path d="M 92 110 L 92 -10" fill="none" opacity="0.7" />
        <path d="M 105 110 L 105 -10" fill="none" />
        {/* Gothic pinnacles */}
        <path d="M 92 -8 L 98.5 -15 L 105 -8" strokeWidth="0.5" opacity="0.6" />
      </g>

      {/* CONTEXT (far): GABLE: Gothic pointed arch above rose window */}
      <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
        {/* Pointed gable extending upward */}
        <path d="M 10 8 L 50 -10 L 90 8" fill="none" />
        <path d="M 12 10 L 50 -7 L 88 10" fill="none" opacity="0.7" />
        {/* Gothic tracery in gable */}
        <path d="M 40 5 Q 45 0, 50 -2 Q 55 0, 60 5" strokeWidth="0.4" opacity="0.6" />
      </g>

      {/* CONTEXT (far): FLYING BUTTRESSES: Extending from both sides */}
      <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
        {/* Left flying buttress */}
        <path d="M -10 40 Q -5 45, 5 48" fill="none" />
        <path d="M -10 60 Q -5 63, 5 65" fill="none" opacity="0.8" />

        {/* Right flying buttress */}
        <path d="M 110 40 Q 105 45, 95 48" fill="none" />
        <path d="M 110 60 Q 105 63, 95 65" fill="none" opacity="0.8" />
      </g>

      {/* CONTEXT (far): PORTAL ARCHES: Grand entrance portals below extending down */}
      <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
        {/* Left portal arch */}
        <path d="M 8 88 Q 5 92, 8 96 Q 12 102, 20 105" fill="none" />
        <path d="M 12 90 Q 10 94, 12 98" strokeWidth="0.5" opacity="0.7" />

        {/* Center portal (grand) */}
        <path d="M 30 88 Q 25 95, 30 100 Q 40 108, 50 110" fill="none" />
        <path d="M 70 88 Q 75 95, 70 100 Q 60 108, 50 110" fill="none" />

        {/* Right portal */}
        <path d="M 92 88 Q 95 92, 92 96 Q 88 102, 80 105" fill="none" />
        <path d="M 88 90 Q 90 94, 88 98" strokeWidth="0.5" opacity="0.7" />
      </g>

      {/* CONTEXT (near): FACADE WALLS: Complete west facade extending beyond */}
      <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
        {/* Left facade wall */}
        <path d="M -5 -10 L -5 110" fill="none" />
        <path d="M 10 -10 L 10 110" fill="none" opacity="0.8" />
        {/* Stone courses */}
        <path d="M -5 20 L 10 20" strokeWidth="0.4" opacity="0.5" />
        <path d="M -5 70 L 10 70" strokeWidth="0.4" opacity="0.5" />

        {/* Right facade wall */}
        <path d="M 90 -10 L 90 110" fill="none" opacity="0.8" />
        <path d="M 105 -10 L 105 110" fill="none" />
        {/* Stone courses */}
        <path d="M 90 20 L 105 20" strokeWidth="0.4" opacity="0.5" />
        <path d="M 90 70 L 105 70" strokeWidth="0.4" opacity="0.5" />
      </g>

      {/* CONTEXT (far): LANCET WINDOWS: Tall Gothic windows flanking rose */}
      <g opacity={S.CF.opacity} strokeDasharray={S.CF.dash} strokeWidth={S.CF.strokeWidth}>
        {/* Left lancet pair */}
        <path d="M 12 65 Q 14 75, 16 85" fill="none" />
        <path d="M 18 65 Q 20 75, 22 85" fill="none" opacity="0.7" />

        {/* Right lancet pair */}
        <path d="M 88 65 Q 86 75, 84 85" fill="none" />
        <path d="M 82 65 Q 80 75, 78 85" fill="none" opacity="0.7" />
      </g>

      {/* EFFECTS: MAGNIFICENT COLORED LIGHT - Afternoon sun streaming through stained glass */}
      <g opacity={S.E.opacity} strokeWidth={S.E.strokeWidth}>
        {/* Radiating colored light beams matching the 12-petal pattern */}
        <path d="M 50 50 L 50 92" stroke="currentColor" strokeDasharray="2 3" opacity="0.5" />
        <path d="M 50 50 L 68 88" stroke="currentColor" strokeDasharray="2 3" opacity="0.45" />
        <path d="M 50 50 L 82 82" stroke="currentColor" strokeDasharray="2 3" opacity="0.4" />
        <path d="M 50 50 L 88 68" stroke="currentColor" strokeDasharray="2 3" opacity="0.45" />
        <path d="M 50 50 L 92 50" stroke="currentColor" strokeDasharray="2 3" opacity="0.5" />
        <path d="M 50 50 L 88 32" stroke="currentColor" strokeDasharray="2 3" opacity="0.45" />
        <path d="M 50 50 L 82 18" stroke="currentColor" strokeDasharray="2 3" opacity="0.4" />
        <path d="M 50 50 L 68 12" stroke="currentColor" strokeDasharray="2 3" opacity="0.45" />
        {/* Dust motes swirling in the colorful light */}
        <circle cx="55" cy="65" r="0.4" fill="currentColor" opacity="0.6" />
        <circle cx="45" cy="68" r="0.35" fill="currentColor" opacity="0.5" />
        <circle cx="60" cy="72" r="0.3" fill="currentColor" opacity="0.55" />
        <circle cx="40" cy="70" r="0.35" fill="currentColor" opacity="0.5" />
        <circle cx="52" cy="75" r="0.4" fill="currentColor" opacity="0.6" />
      </g>

      {/* CONTEXT (near): STONE MASONRY: Sculpted surround */}
      <g opacity={S.CN.opacity} strokeDasharray={S.CN.dash} strokeWidth={S.CN.strokeWidth}>
        {/* Carved stone frame around rose */}
        <circle cx="50" cy="50" r="42" strokeWidth="0.6" opacity="0.6" />
        <circle cx="50" cy="50" r="44" strokeWidth="0.5" opacity="0.4" />
        {/* Gothic quatrefoil decorations around frame */}
        <circle cx="50" cy="6" r="2" strokeWidth="0.4" opacity="0.5" />
        <circle cx="94" cy="50" r="2" strokeWidth="0.4" opacity="0.5" />
        <circle cx="50" cy="94" r="2" strokeWidth="0.4" opacity="0.5" />
        <circle cx="6" cy="50" r="2" strokeWidth="0.4" opacity="0.5" />
      </g>

      {/* PRIMARY: THE ROSE WINDOW - BOLD FIELD SKETCH LINES */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* BOLD Outer circles - stone tracery frame */}
        <circle cx="50" cy="50" r="38" strokeWidth={S.P.strokeWidthHeavy} />
        <circle cx="50" cy="50" r="35" strokeWidth={S.P.strokeWidthBold} />

        {/* BOLD Inner hub circles */}
        <circle cx="50" cy="50" r="10" strokeWidth="2.8" />
        <circle cx="50" cy="50" r="7" strokeWidth={S.P.strokeWidthBold} />

        {/* BOLD Radiating mullions - 12 divisions (Gothic tracery) */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x1 = 50 + 10 * Math.cos(rad)
          const y1 = 50 + 10 * Math.sin(rad)
          const x2 = 50 + 33 * Math.cos(rad)
          const y2 = 50 + 33 * Math.sin(rad)
          return <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} strokeWidth={S.P.strokeWidthBold} />
        })}

        {/* BOLD Petal shapes - trefoils and quatrefoils */}
        {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const cx = 50 + 22 * Math.cos(rad)
          const cy = 50 + 22 * Math.sin(rad)
          return <circle key={i} cx={cx} cy={cy} r="6" opacity={S.D.opacityStrong} strokeWidth={S.P.strokeWidthBold} />
        })}

        {/* Trefoil centers - delicate detail */}
        {[15, 75, 135, 195, 255, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const cx = 50 + 22 * Math.cos(rad)
          const cy = 50 + 22 * Math.sin(rad)
          return <circle key={i} cx={cx} cy={cy} r="2" strokeWidth={S.P.strokeWidth} />
        })}
      </g>
    </g>
  </svg>
)

// 9. Sash Window - vertically sliding window
// Reference: Georgian townhouses, Victorian architecture, American Colonial homes
const SashWindowSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="sash-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#sash-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Surrounding wall */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 8 L5 92 L17 92 L17 8 Z" />
        <path d="M83 8 L83 92 L95 92 L95 8 Z" />
        <path d="M5 8 L95 8" />
        <path d="M5 92 L95 92" />
        {/* Sash weights indication (on sides) */}
        <path d="M18 30 L18 50" strokeDasharray="2,2" />
        <path d="M82 30 L82 50" strokeDasharray="2,2" />
      </g>

      {/* PRIMARY: Sash window */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Outer frame */}
        <path d="M20 12 L20 88 L80 88 L80 12 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Upper sash (lowered to show it slides) */}
        <path d="M23 15 L23 52 L77 52 L77 15 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M23 52 L23 55 L77 55 L77 52" strokeWidth={S.P.strokeWidthLight} />
        {/* Lower sash (raised) */}
        <path d="M23 48 L23 85 L77 85 L77 48 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M23 48 L23 45 L77 45 L77 48" strokeWidth={S.P.strokeWidthLight} />
        {/* Upper sash panes (6 over 6 style) */}
        <path d="M23 32 L77 32" />
        <path d="M40 15 L40 52" />
        <path d="M60 15 L60 52" />
        {/* Lower sash panes */}
        <path d="M23 66 L77 66" />
        <path d="M40 48 L40 85" />
        <path d="M60 48 L60 85" />
        {/* Meeting rail detail */}
        <path d="M21 48 L79 48" strokeWidth={S.P.strokeWidthBold} />
        {/* Sash lift */}
        <path d="M45 72 L55 72" strokeWidth={S.P.strokeWidthLight} />
        <path d="M48 71 L48 73" />
        <path d="M52 71 L52 73" />
      </g>
    </g>
  </svg>
)

// 10. Shutter - hinged cover for windows
// Reference: Mediterranean architecture, Colonial American, Caribbean vernacular
const ShutterSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="shutter-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#shutter-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT (near): Building wall and window opening */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Wall */}
        <path d="M5 10 L5 90 L28 90 L28 10 Z" />
        <path d="M72 10 L72 90 L95 90 L95 10 Z" />
        <path d="M5 10 L95 10" />
        <path d="M5 90 L95 90" />
        {/* Window glass */}
        <path d="M33 18 L33 82 L67 82 L67 18 Z" opacity="0.3" />
        <path d="M50 18 L50 82" opacity="0.2" />
        <path d="M33 50 L67 50" opacity="0.2" />
      </g>

      {/* PRIMARY: Shutters */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Window frame */}
        <path d="M30 15 L30 85 L70 85 L70 15 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Left shutter (open) */}
        <path d="M8 18 L8 82 L28 82 L28 18 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Left shutter louvers */}
        {[25, 32, 39, 46, 53, 60, 67, 74].map((y, i) => (
          <path key={`left-${i}`} d={`M10 ${y} L26 ${y + 3}`} strokeWidth={S.D.strokeWidth} />
        ))}
        {/* Right shutter (partially closed) */}
        <path d="M72 18 L72 82 L92 82 L92 18 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Right shutter louvers */}
        {[25, 32, 39, 46, 53, 60, 67, 74].map((y, i) => (
          <path key={`right-${i}`} d={`M74 ${y} L90 ${y + 3}`} strokeWidth={S.D.strokeWidth} />
        ))}
        {/* Hinges */}
        <circle cx="28" cy="30" r="2" />
        <circle cx="28" cy="70" r="2" />
        <circle cx="72" cy="30" r="2" />
        <circle cx="72" cy="70" r="2" />
        {/* Shutter dogs/holdbacks */}
        <path d="M5 50 L8 48 L8 52 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M95 50 L92 48 L92 52 Z" strokeWidth={S.P.strokeWidthLight} />
      </g>
    </g>
  </svg>
)

// 11. Stained Glass - decorative colored glass
// Reference: Gothic cathedrals, Art Nouveau, Tiffany Studios, Arts & Crafts movement
const StainedGlassSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="stained-halo" intensity={1.1} />}
    <g filter={showHalo ? "url(#stained-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* EFFECTS: Colored light - Morning sun transformed by stained glass */}
      <g opacity={S.E.opacity} strokeWidth={S.E.strokeWidth} strokeDasharray={S.E.dash}>
        {/* Upper section light beams (blues from upper panels) */}
        <path d="M 25 30 L 8 65" stroke="currentColor" opacity={S.E.opacityModerate} />
        <path d="M 35 25 L 15 70" stroke="currentColor" opacity={S.E.opacityModerate} />
        <path d="M 45 20 L 22 75" stroke="currentColor" opacity={S.E.opacityModerate} />
        <path d="M 55 20 L 30 80" stroke="currentColor" opacity={S.E.opacityModerate} />
        <path d="M 65 25 L 38 82" stroke="currentColor" opacity={S.E.opacityModerate} />
        <path d="M 75 30 L 48 85" stroke="currentColor" opacity={S.E.opacityModerate} />
        {/* Middle section light beams (reds/golds from central motif) */}
        <path d="M 35 50 L 10 88" stroke="currentColor" opacity={S.E.opacityModerate} />
        <path d="M 50 48 L 25 92" stroke="currentColor" opacity={S.E.opacityModerate} />
        <path d="M 65 50 L 40 94" stroke="currentColor" opacity={S.E.opacityModerate} />
        {/* Lower section light beams (greens from lower panels) */}
        <path d="M 30 75 L 15 95" stroke="currentColor" opacity={S.E.opacityModerate} />
        <path d="M 50 75 L 32 96" stroke="currentColor" opacity={S.E.opacityModerate} />
        <path d="M 70 75 L 48 95" stroke="currentColor" opacity={S.E.opacityModerate} />
        {/* Colored light pools on chapel floor - layered colors */}
        <ellipse cx="25" cy="85" rx="15" ry="5" fill="currentColor" opacity={S.E.fillOpacity} stroke="none" />
        <ellipse cx="35" cy="88" rx="12" ry="4" fill="currentColor" opacity={S.E.fillOpacity} stroke="none" />
        <ellipse cx="28" cy="90" rx="18" ry="6" fill="currentColor" opacity={S.E.fillOpacity} stroke="none" />
        {/* Sacred dust motes in colored beams */}
        <circle cx="30" cy="55" r="0.4" fill="currentColor" opacity={S.E.fillOpacityStrong} />
        <circle cx="45" cy="62" r="0.35" fill="currentColor" opacity={S.E.fillOpacityStrong} />
        <circle cx="55" cy="58" r="0.4" fill="currentColor" opacity={S.E.fillOpacityStrong} />
        <circle cx="38" cy="70" r="0.35" fill="currentColor" opacity={S.E.fillOpacityStrong} />
        <circle cx="50" cy="68" r="0.4" fill="currentColor" opacity={S.E.fillOpacityStrong} />
        <circle cx="25" cy="80" r="0.35" fill="currentColor" opacity={S.E.fillOpacityStrong} />
        <circle cx="42" cy="78" r="0.4" fill="currentColor" opacity={S.E.fillOpacityStrong} />
        {/* Lead came shadows cast on floor */}
        <path d="M 20 86 L 22 92" strokeWidth={S.E.strokeWidth} opacity={S.E.opacity} />
        <path d="M 28 84 L 31 94" strokeWidth={S.E.strokeWidth} opacity={S.E.opacity} />
        <path d="M 35 85 L 38 95" strokeWidth={S.E.strokeWidth} opacity={S.E.opacity} />
      </g>

      {/* CONTEXT (near): Chapel wall sections */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Wall sections */}
        <path d="M5 30 L5 95 L12 95 L12 40" />
        <path d="M88 40 L88 95 L95 95 L95 30" />
        {/* Wall above arch */}
        <path d="M12 5 Q50 0, 88 5" />
      </g>

      {/* CONTEXT (far): Chapel floor */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        <path d="M5 95 L95 95" />
      </g>

      {/* PRIMARY: Stained glass window */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Gothic pointed arch frame */}
        <path d="M15 90 L15 40 Q50 5, 85 40 L85 90 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Border detail */}
        <path d="M18 88 L18 42 Q50 10, 82 42 L82 88" strokeWidth={S.D.strokeWidth} />
        {/* Lead came lines - horizontal */}
        <path d="M15 70 L85 70" strokeWidth={S.P.strokeWidthLight} />
        <path d="M15 50 Q50 45, 85 50" strokeWidth={S.P.strokeWidthLight} />
        <path d="M25 30 Q50 20, 75 30" strokeWidth={S.P.strokeWidthLight} />
        {/* Lead came lines - vertical */}
        <path d="M35 90 L35 55 Q40 35, 50 25" strokeWidth={S.P.strokeWidthLight} />
        <path d="M65 90 L65 55 Q60 35, 50 25" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 90 L50 25" strokeWidth={S.P.strokeWidthLight} />
        {/* Decorative central motif */}
        <circle cx="50" cy="60" r="8" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 52 L50 40" strokeWidth={S.D.strokeWidth} />
        <path d="M42 60 L35 60" strokeWidth={S.D.strokeWidth} />
        <path d="M58 60 L65 60" strokeWidth={S.D.strokeWidth} />
        <path d="M50 68 L50 75" strokeWidth={S.D.strokeWidth} />
        {/* Glass piece textures */}
        <path d="M20 75 L30 80" opacity={S.D.opacity} strokeWidth={S.D.strokeWidth} />
        <path d="M70 75 L80 80" opacity={S.D.opacity} strokeWidth={S.D.strokeWidth} />
        <path d="M40 35 L45 38" opacity={S.D.opacity} strokeWidth={S.D.strokeWidth} />
        <path d="M55 35 L60 38" opacity={S.D.opacity} strokeWidth={S.D.strokeWidth} />
      </g>
    </g>
  </svg>
)

// 12. Tracery - ornamental stone/wood patterns in windows
// Reference: Gothic architecture (Decorated and Perpendicular styles), French cathedrals
const TracerySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="tracery-halo" intensity={1} />}
    <g filter={showHalo ? "url(#tracery-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT: Cathedral nave wall with buttresses and light effects */}
      <g strokeWidth="0.8" strokeDasharray="3 2" opacity="0.35">
        {/* Thick nave walls extending off-page */}
        <path d="M-5 -5 L-5 105" strokeWidth="0.6" />
        <path d="M0 -5 L0 105" strokeWidth="0.7" />
        <path d="M5 20 L5 95 L10 95 L10 35" />
        <path d="M90 35 L90 95 L95 95 L95 20" />
        <path d="M100 -5 L100 105" strokeWidth="0.7" />
        <path d="M105 -5 L105 105" strokeWidth="0.6" />

        {/* Stone coursing on wall */}
        <path d="M-5 25 L5 25" strokeWidth="0.4" opacity="0.5" />
        <path d="M95 25 L105 25" strokeWidth="0.4" opacity="0.5" />
        <path d="M-5 55 L5 55" strokeWidth="0.4" opacity="0.5" />
        <path d="M95 55 L105 55" strokeWidth="0.4" opacity="0.5" />
        <path d="M-5 80 L5 80" strokeWidth="0.4" opacity="0.5" />
        <path d="M95 80 L105 80" strokeWidth="0.4" opacity="0.5" />

        {/* Buttress hints on exterior */}
        <path d="M-8 -5 L-8 105" strokeWidth="0.5" opacity="0.4" />
        <path d="M108 -5 L108 105" strokeWidth="0.5" opacity="0.4" />

        {/* Wall above arch / vault spring */}
        <path d="M5 5 Q50 -5, 95 5" strokeWidth="0.6" />
        <path d="M0 2 Q50 -8, 100 2" strokeWidth="0.5" opacity="0.5" />

        {/* Floor paving */}
        <path d="M-5 95 L105 95" />
        <path d="M-5 98 L105 98" strokeWidth="0.5" opacity="0.5" />
        <path d="M25 95 L25 102" strokeWidth="0.3" opacity="0.3" />
        <path d="M50 95 L50 102" strokeWidth="0.3" opacity="0.3" />
        <path d="M75 95 L75 102" strokeWidth="0.3" opacity="0.3" />
      </g>

      {/* CONTEXT: Light streaming through tracery */}
      <g opacity="0.15" strokeWidth="0.6">
        <path d="M35 50 L25 80" />
        <path d="M50 35 L40 75" />
        <path d="M65 50 L55 80" />
        <path d="M50 22 L42 65" />
        <path d="M25 50 L18 78" />
        <path d="M75 50 L68 78" />
        {/* Dust motes in light */}
        <circle cx="35" cy="70" r="0.6" opacity="0.3" />
        <circle cx="52" cy="60" r="0.5" opacity="0.25" />
        <circle cx="45" cy="75" r="0.4" opacity="0.2" />
        <circle cx="60" cy="68" r="0.5" opacity="0.3" />
      </g>

      {/* PRIMARY: Tracery window */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Pointed arch frame */}
        <path d="M12 90 L12 35 Q50 0, 88 35 L88 90" strokeWidth={S.P.strokeWidthLight} />
        {/* Main mullions */}
        <path d="M35 90 L35 45" strokeWidth={S.P.strokeWidthLight} />
        <path d="M65 90 L65 45" strokeWidth={S.P.strokeWidthLight} />
        {/* Tracery head - intersecting arches */}
        <path d="M35 45 Q50 25, 65 45" strokeWidth={S.P.strokeWidthLight} />
        <path d="M12 35 Q35 50, 35 45" strokeWidth={S.P.strokeWidthLight} />
        <path d="M88 35 Q65 50, 65 45" strokeWidth={S.P.strokeWidthLight} />
        {/* Cusped trefoils */}
        <circle cx="50" cy="35" r="10" strokeWidth={S.D.strokeWidth} />
        <path d="M45 28 Q50 35, 55 28" strokeWidth={S.D.strokeWidth} />
        <path d="M55 28 Q50 22, 45 28" strokeWidth={S.D.strokeWidth} />
        {/* Side trefoils */}
        <circle cx="25" cy="45" r="7" strokeWidth={S.D.strokeWidth} />
        <circle cx="75" cy="45" r="7" strokeWidth={S.D.strokeWidth} />
        {/* Quatrefoil at top */}
        <path d="M50 12 Q55 17, 50 22 Q45 17, 50 12" strokeWidth={S.D.strokeWidth} />
        <path d="M45 17 Q50 12, 55 17 Q50 22, 45 17" strokeWidth={S.D.strokeWidth} />
        {/* Lower lancets */}
        <path d="M15 88 L15 50 L32 50 L32 88 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M38 88 L38 50 L62 50 L62 88 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M68 88 L68 50 L85 50 L85 88 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Small cusp details */}
        <path d="M23 55 Q23.5 52, 24 55" />
        <path d="M50 55 Q50.5 52, 51 55" />
        <path d="M76 55 Q76.5 52, 77 55" />
      </g>
    </g>
  </svg>
)

// 13. Transom Window - horizontal bar across window top
// Reference: Victorian shopfronts, Arts & Crafts bungalows, Colonial Revival architecture
const TransomWindowSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="transom-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#transom-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>

      {/* CONTEXT: Surrounding wall */}
      <g strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4">
        <path d="M5 10 L5 90 L12 90 L12 10 Z" />
        <path d="M88 10 L88 90 L95 90 L95 10 Z" />
        <path d="M5 10 L95 10" />
        <path d="M5 90 L95 90" />
        {/* Glass pane reflections (context) */}
        <path d="M22 22 L32 28" opacity="0.2" />
        <path d="M52 22 L62 28" opacity="0.2" />
        <path d="M22 45 L32 55" opacity="0.2" />
        <path d="M54 65 L64 75" opacity="0.2" />
      </g>

      {/* PRIMARY: Transom window */}
      <g strokeWidth={S.D.strokeWidth}>
        {/* Overall frame */}
        <path d="M15 15 L15 85 L85 85 L85 15 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Transom bar (emphasized) */}
        <path d="M15 35 L85 35" strokeWidth={S.P.strokeWidthBold} />
        <path d="M15 33 L85 33" strokeWidth={S.D.strokeWidth} />
        <path d="M15 37 L85 37" strokeWidth={S.D.strokeWidth} />
        {/* Transom window above */}
        <path d="M18 18 L18 32 L82 32 L82 18 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Transom light divisions */}
        <path d="M35 18 L35 32" />
        <path d="M50 18 L50 32" />
        <path d="M65 18 L65 32" />
        {/* Main window below transom */}
        <path d="M18 40 L18 82 L82 82 L82 40 Z" strokeWidth={S.P.strokeWidthLight} />
        {/* Main window divisions */}
        <path d="M50 40 L50 82" />
        <path d="M18 60 L82 60" />
        {/* Transom profile view */}
        <path d="M90 33 L95 33 L95 37 L90 37 Z" strokeWidth={S.P.strokeWidth} />
      </g>
    </g>
  </svg>
)

// Export mapping for all window elements
export const WINDOW_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'casement': CasementSVG,
  'clerestory': ClerestorySVG,
  'dormer': DormerSVG,
  'lunette': LunetteSVG,
  'mullion': MullionSVG,
  'oriel-window': OrielWindowSVG,
  'palladian-window': PalladianWindowSVG,
  'rose-window': RoseWindowSVG,
  'sash-window': SashWindowSVG,
  'shutter': ShutterSVG,
  'stained-glass': StainedGlassSVG,
  'tracery': TracerySVG,
  'transom': TransomWindowSVG,
}

export {
  CasementSVG,
  ClerestorySVG,
  DormerSVG,
  LunetteSVG,
  MullionSVG,
  OrielWindowSVG,
  PalladianWindowSVG,
  RoseWindowSVG,
  SashWindowSVG,
  ShutterSVG,
  StainedGlassSVG,
  TracerySVG,
  TransomWindowSVG,
}
