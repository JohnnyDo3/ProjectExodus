'use client'

import React from 'react'
import { S } from './svgStyleTokens'

const HaloFilter = () => (
  <defs>
    <filter id="urban-halo" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
      <feColorMatrix in="blur" type="matrix"
        values="0 0 0 0 0.96  0 0 0 0 0.62  0 0 0 0 0.04  0 0 0 0.8 0" result="glow" />
      <feMerge>
        <feMergeNode in="glow" /><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
)

interface SVGProps { showHalo?: boolean }

// ============================================================================
// ARCADE - 3/4 view of a covered commercial passage with arched glass roof.
// Perspective looking into the gallery showing depth, shop fronts on both
// sides, and the vaulted glass ceiling receding overhead.
// Reference: Galleria Vittorio Emanuele II (Milan), Burlington Arcade (London)
// ============================================================================
export const ArcadeSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Distant street beyond the arcade exit */}
    <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
      <path d="M 42 38 L 42 44 L 58 44 L 58 38" />
      <path d="M 44 40 L 56 40" />
    </g>

    {/* CONTEXT (near): Flanking building walls visible outside the arcade */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 2 18 L 2 92" strokeWidth="1.2" />
      <path d="M 98 18 L 98 92" strokeWidth="1.2" />
      <path d="M 2 92 L 98 92" strokeWidth="0.8" />
      <path d="M 2 18 L 30 28 M 98 18 L 70 28" strokeWidth="0.6" opacity={S.CN.opacitySubtle} />
    </g>

    {/* 3D shading — right wall depth shadow */}
    <path d="M 70 28 L 98 18 L 98 92 L 70 82 Z"
          fill="currentColor" opacity="0.1" stroke="none" />
    {/* 3D shading — floor receding into depth */}
    <path d="M 2 92 L 30 82 L 70 82 L 98 92 Z"
          fill="currentColor" opacity="0.06" stroke="none" />

    {/* PRIMARY: THE ARCADE — vaulted passage with shop fronts */}
    <g filter={showHalo ? "url(#urban-halo)" : undefined}>
      {/* Left wall perspective */}
      <path d="M 2 18 L 30 28 L 30 82 L 2 92"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Right wall perspective */}
      <path d="M 98 18 L 70 28 L 70 82 L 98 92"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Vaulted glass ceiling arch — front face */}
      <path d="M 2 18 Q 50 2, 98 18"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      {/* Vault receding into depth */}
      <path d="M 30 28 Q 50 18, 70 28"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Intermediate vault ribs receding */}
      <path d="M 10 22 Q 50 8, 90 22" strokeWidth={S.P.strokeWidthLight} opacity="0.7" />
      <path d="M 20 25 Q 50 14, 80 25" strokeWidth={S.P.strokeWidthLight} opacity="0.5" />

      {/* Left shop fronts (3D boxes receding) */}
      <path d="M 4 35 L 28 40 L 28 72 L 4 78 Z" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 4 55 L 28 58" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      {/* Right shop fronts */}
      <path d="M 96 35 L 72 40 L 72 72 L 96 78 Z" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 96 55 L 72 58" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* DETAIL: Glass roof ribbing along vault */}
      <path d="M 2 18 L 30 28" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 98 18 L 70 28" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 50 5 L 50 22" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

      {/* DETAIL: Floor paving in perspective */}
      <path d="M 50 92 L 50 82" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
      <path d="M 30 82 L 70 82" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 20 87 L 80 87" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
    </g>
  </svg>
)

// ============================================================================
// BOULEVARD - 3/4 aerial view of a tree-lined grand avenue with center median.
// Shows the receding roadway, rows of trees with canopy volume, and flanking
// building frontages on both sides with 3D depth.
// Reference: Champs-Élysées (Paris), La Rambla (Barcelona)
// ============================================================================
export const BoulevardSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Distant buildings on the horizon */}
    <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
      <path d="M 30 28 L 30 22 L 42 22 L 42 26" />
      <path d="M 58 26 L 58 20 L 70 20 L 70 28" />
      <path d="M 46 24 L 54 24" />
    </g>

    {/* CONTEXT (near): Flanking building facades with 3D depth */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      {/* Left buildings — front face */}
      <path d="M 2 32 L 2 90 L 18 90 L 18 38" strokeWidth="1" />
      {/* Left buildings — side face receding */}
      <path d="M 18 38 L 28 34" strokeWidth="0.6" opacity={S.CN.opacitySubtle} />
      {/* Right buildings — front face */}
      <path d="M 82 38 L 82 90 L 98 90 L 98 32" strokeWidth="1" />
      {/* Right buildings — side face receding */}
      <path d="M 82 38 L 72 34" strokeWidth="0.6" opacity={S.CN.opacitySubtle} />
    </g>

    {/* 3D shading — roadway surface shadow */}
    <path d="M 22 90 L 42 32 L 58 32 L 78 90 Z"
          fill="currentColor" opacity="0.06" stroke="none" />
    {/* 3D shading — right sidewalk darker */}
    <path d="M 78 90 L 58 32 L 72 34 L 82 38 L 82 90 Z"
          fill="currentColor" opacity="0.09" stroke="none" />

    {/* PRIMARY: THE BOULEVARD — road, median, tree canopies */}
    <g filter={showHalo ? "url(#urban-halo)" : undefined}>
      {/* Left curb */}
      <path d="M 22 90 L 42 32"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Right curb */}
      <path d="M 78 90 L 58 32"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Center median strip */}
      <path d="M 46 90 L 48 32" strokeWidth={S.P.strokeWidth} />
      <path d="M 54 90 L 52 32" strokeWidth={S.P.strokeWidth} />

      {/* Left sidewalk inner edge */}
      <path d="M 18 90 L 38 34" strokeWidth={S.P.strokeWidthLight} opacity="0.6" />
      {/* Right sidewalk inner edge */}
      <path d="M 82 90 L 62 34" strokeWidth={S.P.strokeWidthLight} opacity="0.6" />

      {/* Tree canopies — left row (3D spherical volumes) */}
      <circle cx="26" cy="68" r="7" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 26 75 L 26 82" strokeWidth={S.P.strokeWidth} />
      <circle cx="32" cy="52" r="5.5" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 32 57 L 32 64" strokeWidth={S.P.strokeWidthLight} />
      <circle cx="36" cy="40" r="4" strokeWidth={S.P.strokeWidthLight} opacity="0.7" />

      {/* Tree canopies — right row */}
      <circle cx="74" cy="68" r="7" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 74 75 L 74 82" strokeWidth={S.P.strokeWidth} />
      <circle cx="68" cy="52" r="5.5" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 68 57 L 68 64" strokeWidth={S.P.strokeWidthLight} />
      <circle cx="64" cy="40" r="4" strokeWidth={S.P.strokeWidthLight} opacity="0.7" />

      {/* DETAIL: Tree canopy shading (3D volume) */}
      <path d="M 26 62 Q 32 64, 33 68 Q 32 72, 26 74"
            strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 74 62 Q 68 64, 67 68 Q 68 72, 74 74"
            strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

      {/* DETAIL: Median plantings */}
      <path d="M 48 50 L 52 50" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 48 65 L 52 65" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 47 80 L 53 80" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
    </g>
  </svg>
)

// ============================================================================
// BRIDGE - 3/4 view of a stone arch bridge spanning a river, showing the
// barrel vault underside, abutment depth, balustrade, and water below.
// Reference: Ponte Vecchio (Florence), Rialto Bridge (Venice)
// ============================================================================
export const BridgeSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Distant riverbanks and landscape */}
    <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
      <path d="M 2 48 L 12 44 L 22 48" />
      <path d="M 78 48 L 88 44 L 98 48" />
      <path d="M 2 56 L 98 56" />
    </g>

    {/* CONTEXT (near): Riverbanks and water surface */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      {/* Near bank — left abutment ground */}
      <path d="M 2 70 L 18 70 L 18 88 L 2 92" strokeWidth="1" />
      {/* Far bank — right abutment ground */}
      <path d="M 82 70 L 98 70 L 98 92 L 82 88" strokeWidth="1" />
      {/* Water level */}
      <path d="M 18 82 Q 35 80, 50 82 Q 65 84, 82 82" strokeWidth="0.6" opacity={S.CN.opacitySubtle} />
      <path d="M 20 86 Q 40 84, 60 86 Q 75 88, 80 86" strokeWidth="0.5" opacity={S.CN.opacitySubtle} />
    </g>

    {/* 3D shading — barrel vault underside (the dark arch soffit) */}
    <path d="M 18 70 Q 50 50, 82 70 L 82 74 Q 50 56, 18 74 Z"
          fill="currentColor" opacity="0.12" stroke="none" />
    {/* 3D shading — far side of the bridge deck */}
    <path d="M 8 48 L 18 44 L 82 44 L 92 48 L 92 52 L 82 48 L 18 48 L 8 52 Z"
          fill="currentColor" opacity="0.08" stroke="none" />

    {/* PRIMARY: THE BRIDGE — arch, deck, balustrade, abutments */}
    <g filter={showHalo ? "url(#urban-halo)" : undefined}>
      {/* Main arch — front face */}
      <path d="M 18 70 Q 50 42, 82 70"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      {/* Inner arch ring — showing barrel vault depth */}
      <path d="M 20 72 Q 50 48, 80 72"
            strokeWidth={S.P.strokeWidthBold} opacity="0.6" />
      {/* Far arch edge (receding) */}
      <path d="M 18 66 Q 50 38, 82 66"
            strokeWidth={S.P.strokeWidthLight} opacity="0.4" />

      {/* Bridge deck — near edge */}
      <path d="M 8 52 L 92 52"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Bridge deck — far edge */}
      <path d="M 8 48 L 92 48"
            strokeWidth={S.P.strokeWidthLight} opacity="0.6" />
      {/* Deck thickness sides */}
      <path d="M 8 48 L 8 52" strokeWidth={S.P.strokeWidth} />
      <path d="M 92 48 L 92 52" strokeWidth={S.P.strokeWidth} />

      {/* Balustrade — near side */}
      <path d="M 10 46 L 90 46" strokeWidth={S.P.strokeWidth} />
      <path d="M 10 52 L 10 46" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 90 52 L 90 46" strokeWidth={S.P.strokeWidthLight} />
      {/* Balustrade posts */}
      {[18, 28, 38, 50, 62, 72, 82].map((x, i) => (
        <path key={i} d={`M ${x} 46 L ${x} 52`} strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      ))}

      {/* Left abutment — 3D block */}
      <path d="M 2 52 L 18 52 L 18 88 L 2 92 Z"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Right abutment — 3D block */}
      <path d="M 82 52 L 98 52 L 98 92 L 82 88 Z"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Keystone at arch crown */}
      <path d="M 47 44 L 50 40 L 53 44 Z" strokeWidth={S.P.strokeWidth} />

      {/* DETAIL: Voussoir lines on arch face */}
      <path d="M 28 64 L 30 60" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 38 56 L 40 52" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 60 52 L 62 56" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 70 60 L 72 64" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
    </g>

    {/* EFFECTS: Water reflections beneath arch */}
    <g strokeDasharray={S.E.dash} opacity={S.E.opacity} strokeWidth={S.E.strokeWidth}>
      <path d="M 30 78 Q 50 74, 70 78" />
      <path d="M 35 82 Q 50 80, 65 82" />
    </g>
  </svg>
)

// ============================================================================
// FOUNTAIN - 3/4 view of a multi-tiered ornamental fountain. Shows the
// cylindrical basin tiers in perspective with cascading water and a central
// spout. Each tier has visible 3D volume with elliptical rims.
// Reference: Trevi Fountain (Rome), Bethesda Fountain (NYC)
// ============================================================================
export const FountainSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Surrounding plaza pavement */}
    <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
      <path d="M 4 94 L 96 94" />
      <path d="M 10 90 L 90 90" />
      <path d="M 20 86 Q 50 84, 80 86" />
    </g>

    {/* CONTEXT (near): Plaza ground plane with radial paving */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <ellipse cx="50" cy="86" rx="42" ry="10" strokeWidth="0.8" />
      <path d="M 20 86 L 50 78 L 80 86" strokeWidth="0.5" opacity={S.CN.opacitySubtle} />
      <path d="M 50 96 L 50 86" strokeWidth="0.5" opacity={S.CN.opacitySubtle} />
    </g>

    {/* 3D shading — base basin far side */}
    <path d="M 50 76 Q 72 78, 82 82 Q 88 86, 82 90 L 70 88 Q 76 84, 72 80 Q 64 78, 50 78 Z"
          fill="currentColor" opacity="0.1" stroke="none" />
    {/* 3D shading — middle tier far side */}
    <path d="M 50 52 Q 62 54, 68 58 L 66 62 Q 60 58, 50 56 Z"
          fill="currentColor" opacity="0.08" stroke="none" />

    {/* PRIMARY: THE FOUNTAIN — tiered basins with water */}
    <g filter={showHalo ? "url(#urban-halo)" : undefined}>
      {/* Base basin — large bottom tier */}
      <ellipse cx="50" cy="82" rx="34" ry="9"
               strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      {/* Basin wall cylinder */}
      <path d="M 16 82 L 16 88 Q 50 96, 84 88 L 84 82"
            strokeWidth={S.P.strokeWidthBold} />
      {/* Inner water surface */}
      <ellipse cx="50" cy="80" rx="30" ry="7"
               strokeWidth={S.P.strokeWidthLight} opacity="0.5" />

      {/* Middle tier */}
      <ellipse cx="50" cy="58" rx="18" ry="5"
               strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Middle tier cylinder */}
      <path d="M 32 58 L 32 68 Q 50 74, 68 68 L 68 58"
            strokeWidth={S.P.strokeWidth} />

      {/* Top tier */}
      <ellipse cx="50" cy="40" rx="10" ry="3"
               strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Top tier cylinder */}
      <path d="M 40 40 L 40 48 Q 50 52, 60 48 L 60 40"
            strokeWidth={S.P.strokeWidthLight} />

      {/* Central spout column */}
      <path d="M 48 40 L 48 18" strokeWidth={S.P.strokeWidth} />
      <path d="M 52 40 L 52 18" strokeWidth={S.P.strokeWidth} />
      {/* Spout finial */}
      <path d="M 46 18 L 50 12 L 54 18 Z" strokeWidth={S.P.strokeWidthLight} />
    </g>

    {/* EFFECTS: Water jets and cascading streams */}
    <g strokeDasharray={S.E.dash} opacity={S.E.opacityModerate} strokeWidth={S.E.strokeWidth}>
      <path d="M 50 12 Q 56 8, 62 18 Q 64 28, 58 38" />
      <path d="M 50 12 Q 44 8, 38 18 Q 36 28, 42 38" />
      <path d="M 50 12 Q 50 6, 50 16" />
      <path d="M 60 48 Q 66 54, 68 62" />
      <path d="M 40 48 Q 34 54, 32 62" />
      <path d="M 68 68 Q 76 74, 80 80" />
      <path d="M 32 68 Q 24 74, 20 80" />
    </g>
  </svg>
)

// ============================================================================
// KIOSK - 3/4 view of a freestanding domed retail pavilion. Shows the
// octagonal form with visible side faces, domed roof with finial, and
// open counter window. Small scale, street-level structure.
// Reference: Paris Metro kiosks, Morris columns, news stands
// ============================================================================
export const KioskSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Distant street elements */}
    <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
      <path d="M 2 88 L 98 88" />
      <path d="M 2 82 L 10 82 M 90 82 L 98 82" />
    </g>

    {/* CONTEXT (near): Pavement and adjacent street furniture */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      <path d="M 12 88 L 88 88" strokeWidth="0.8" />
      <path d="M 8 84 L 14 84 M 86 84 L 92 84" strokeWidth="0.5" opacity={S.CN.opacitySubtle} />
      {/* Ground shadow ellipse */}
      <ellipse cx="52" cy="88" rx="28" ry="4" strokeWidth="0.5" opacity={S.CN.opacitySubtle} />
    </g>

    {/* 3D shading — right side face in shadow */}
    <path d="M 68 36 L 78 40 L 78 78 L 68 82 Z"
          fill="currentColor" opacity="0.11" stroke="none" />
    {/* 3D shading — dome far side */}
    <path d="M 50 10 Q 62 14, 72 22 Q 80 30, 78 40 L 68 36 Q 72 28, 64 22 Q 56 16, 50 14 Z"
          fill="currentColor" opacity="0.08" stroke="none" />

    {/* PRIMARY: THE KIOSK — domed octagonal pavilion */}
    <g filter={showHalo ? "url(#urban-halo)" : undefined}>
      {/* Dome roof — front profile */}
      <path d="M 22 36 Q 22 16, 50 10 Q 78 16, 78 36"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      {/* Dome inner contour */}
      <path d="M 26 36 Q 26 20, 50 14 Q 74 20, 74 36"
            strokeWidth={S.P.strokeWidthLight} opacity="0.4" />

      {/* Finial at top */}
      <path d="M 50 10 L 50 4" strokeWidth={S.P.strokeWidthBold} />
      <circle cx="50" cy="3" r="1.8" strokeWidth={S.P.strokeWidthLight} />

      {/* Main body — front face */}
      <path d="M 22 36 L 22 78 L 40 82 L 60 82 L 68 78 L 68 36"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Side face — visible right panel (3D depth) */}
      <path d="M 68 36 L 78 40 L 78 78 L 68 82"
            strokeWidth={S.P.strokeWidth} strokeLinecap={S.P.strokeLinecap} />
      {/* Roof overhang connecting front to side */}
      <path d="M 78 40 Q 78 18, 50 10" strokeWidth={S.P.strokeWidthLight} opacity="0.5" />

      {/* Counter opening on front face */}
      <path d="M 28 46 L 28 72 L 64 72 L 64 46"
            strokeWidth={S.P.strokeWidth} />
      {/* Counter shelf */}
      <path d="M 26 72 L 66 72" strokeWidth={S.P.strokeWidthBold} />
      {/* Awning/canopy above counter */}
      <path d="M 26 46 L 66 46" strokeWidth={S.P.strokeWidth} />

      {/* Base plinth */}
      <path d="M 18 78 L 40 84 L 62 84 L 82 78"
            strokeWidth={S.P.strokeWidthBold} />
      <path d="M 18 78 L 18 82 L 40 88 L 62 88 L 82 82 L 82 78"
            strokeWidth={S.P.strokeWidthLight} />

      {/* DETAIL: Interior shelves visible through counter */}
      <path d="M 32 54 L 60 54" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 32 62 L 60 62" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

      {/* DETAIL: Dome meridian lines */}
      <path d="M 50 10 L 50 36" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 50 10 Q 36 18, 30 36" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 50 10 Q 64 18, 70 36" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
    </g>
  </svg>
)

// ============================================================================
// PLAZA - 3/4 aerial view of an open urban square with a central monument,
// paving pattern in perspective, surrounding building facades, and trees.
// Shows the ground plane receding with 3D depth.
// Reference: Piazza del Campo (Siena), Times Square (NYC)
// ============================================================================
export const PlazaSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Distant building skyline */}
    <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
      <path d="M 10 18 L 10 12 L 24 12 L 24 18" />
      <path d="M 40 18 L 40 8 L 60 8 L 60 18" />
      <path d="M 76 18 L 76 14 L 90 14 L 90 18" />
    </g>

    {/* CONTEXT (near): Surrounding building facades — 3D block forms */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      {/* Back row of buildings */}
      <path d="M 6 18 L 94 18" strokeWidth="1" />
      <path d="M 6 18 L 6 32 L 18 36" strokeWidth="0.8" />
      <path d="M 94 18 L 94 32 L 82 36" strokeWidth="0.8" />
      {/* Side facades with depth */}
      <path d="M 6 32 L 18 36 L 18 82 L 6 88" strokeWidth="0.8" opacity={S.CN.opacitySubtle} />
      <path d="M 94 32 L 82 36 L 82 82 L 94 88" strokeWidth="0.8" opacity={S.CN.opacitySubtle} />
    </g>

    {/* 3D shading — plaza ground plane */}
    <path d="M 18 36 L 82 36 L 94 88 L 6 88 Z"
          fill="currentColor" opacity="0.06" stroke="none" />
    {/* 3D shading — monument shadow on ground */}
    <path d="M 52 62 L 68 78 L 58 78 L 48 68 Z"
          fill="currentColor" opacity="0.08" stroke="none" />

    {/* PRIMARY: THE PLAZA — ground plane, monument, and furnishings */}
    <g filter={showHalo ? "url(#urban-halo)" : undefined}>
      {/* Plaza boundary — perspective trapezoid */}
      <path d="M 18 36 L 82 36 L 94 88 L 6 88 Z"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Paving grid in perspective */}
      <path d="M 30 36 L 22 88" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
      <path d="M 50 36 L 50 88" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
      <path d="M 70 36 L 78 88" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
      <path d="M 18 50 L 82 50" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 14 62 L 86 62" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 10 76 L 90 76" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

      {/* Central monument — 3D pedestal + column */}
      {/* Pedestal base */}
      <path d="M 42 68 L 42 76 L 58 76 L 58 68 Z"
            strokeWidth={S.P.strokeWidthBold} />
      {/* Pedestal side face */}
      <path d="M 58 68 L 62 70 L 62 78 L 58 76"
            strokeWidth={S.P.strokeWidthLight} opacity="0.6" />
      {/* Column */}
      <path d="M 46 52 L 46 68 L 54 68 L 54 52"
            strokeWidth={S.P.strokeWidth} />
      {/* Column side face */}
      <path d="M 54 52 L 58 54 L 58 68"
            strokeWidth={S.P.strokeWidthLight} opacity="0.5" />
      {/* Statue/finial */}
      <path d="M 48 48 Q 50 42, 52 48 L 52 52 L 48 52 Z"
            strokeWidth={S.P.strokeWidthLight} />
      <circle cx="50" cy="42" r="2" strokeWidth={S.P.strokeWidthLight} />

      {/* Corner trees — 3D canopy spheres */}
      <circle cx="24" cy="42" r="5" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 24 47 L 24 54" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <circle cx="76" cy="42" r="5" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 76 47 L 76 54" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* Benches — small 3D boxes */}
      <path d="M 26 72 L 36 72 L 38 74 L 28 74 Z"
            strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 62 72 L 72 72 L 74 74 L 64 74 Z"
            strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
    </g>
  </svg>
)

// ============================================================================
// PROMENADE - 3/4 view of an elevated waterfront walkway. Shows the deck
// extending in perspective with balustrade, lamp posts, and an overlook
// above water or landscape below.
// Reference: Brooklyn Heights Promenade, Nice Promenade des Anglais
// ============================================================================
export const PromenadeSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Distant sea/horizon and sky */}
    <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
      <path d="M 2 30 L 98 30" />
      <path d="M 2 36 Q 30 34, 50 36 Q 70 38, 98 36" />
      <path d="M 10 24 L 18 20 L 26 24" />
    </g>

    {/* CONTEXT (near): Supporting wall/cliff below the promenade */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      {/* Retaining wall face */}
      <path d="M 4 58 L 4 92 L 96 92 L 96 58" strokeWidth="1" />
      {/* Stone coursing on wall */}
      <path d="M 4 70 L 96 70" strokeWidth="0.5" opacity={S.CN.opacitySubtle} />
      <path d="M 4 80 L 96 80" strokeWidth="0.5" opacity={S.CN.opacitySubtle} />
    </g>

    {/* 3D shading — deck underside overhang shadow */}
    <path d="M 2 56 L 98 56 L 98 62 L 2 62 Z"
          fill="currentColor" opacity="0.1" stroke="none" />
    {/* 3D shading — retaining wall far side */}
    <path d="M 96 58 L 96 92 L 92 90 L 92 60 Z"
          fill="currentColor" opacity="0.07" stroke="none" />

    {/* PRIMARY: THE PROMENADE — elevated walkway with balustrade */}
    <g filter={showHalo ? "url(#urban-halo)" : undefined}>
      {/* Deck surface — top */}
      <path d="M 2 50 L 98 50"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Deck front edge (thickness) */}
      <path d="M 2 50 L 2 56 L 98 56 L 98 50"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Deck receding in perspective — far edge */}
      <path d="M 2 42 L 98 42"
            strokeWidth={S.P.strokeWidthLight} opacity="0.5" />
      {/* Deck depth connecting near to far */}
      <path d="M 2 42 L 2 50" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 98 42 L 98 50" strokeWidth={S.P.strokeWidthLight} />

      {/* Balustrade — near side (rail + posts) */}
      <path d="M 2 44 L 98 44" strokeWidth={S.P.strokeWidth} />
      <path d="M 2 50 L 98 50" strokeWidth={S.P.strokeWidthLight} opacity="0.5" />
      {/* Balustrade posts */}
      {[8, 18, 28, 38, 50, 62, 72, 82, 92].map((x, i) => (
        <path key={i} d={`M ${x} 44 L ${x} 50`} strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      ))}

      {/* Lamp posts — 3D with visible base */}
      <path d="M 20 36 L 20 44" strokeWidth={S.P.strokeWidthBold} />
      <ellipse cx="20" cy="34" rx="3.5" ry="2" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 18 44 L 22 44 L 22 46 L 18 46 Z" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

      <path d="M 60 36 L 60 44" strokeWidth={S.P.strokeWidthBold} />
      <ellipse cx="60" cy="34" rx="3.5" ry="2" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 58 44 L 62 44 L 62 46 L 58 46 Z" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

      {/* Benches — small 3D forms */}
      <path d="M 34 46 L 46 46 L 46 50 L 34 50 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 74 46 L 86 46 L 86 50 L 74 50 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* DETAIL: Deck paving */}
      <path d="M 30 42 L 30 50" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 50 42 L 50 50" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 70 42 L 70 50" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
    </g>
  </svg>
)

// ============================================================================
// SQUARE - 3/4 view of a formal public square enclosed by uniform building
// facades with arcades. Shows the enclosed space in perspective with a
// central monument, cruciform paths, and formal gardens in quadrants.
// Reference: Trafalgar Square (London), Place des Vosges (Paris)
// ============================================================================
export const SquareSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Rooflines above enclosing buildings */}
    <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
      <path d="M 6 12 L 94 12" />
      <path d="M 12 8 L 20 4 L 28 8" />
      <path d="M 44 8 L 50 2 L 56 8" />
      <path d="M 72 8 L 80 4 L 88 8" />
    </g>

    {/* CONTEXT (near): Building facades enclosing the square */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      {/* Back facade */}
      <path d="M 6 14 L 94 14 L 94 26 L 6 26 Z" strokeWidth="1" />
      {/* Back facade arcade arches */}
      <path d="M 16 26 Q 22 20, 28 26" strokeWidth="0.6" />
      <path d="M 36 26 Q 42 20, 48 26" strokeWidth="0.6" />
      <path d="M 52 26 Q 58 20, 64 26" strokeWidth="0.6" />
      <path d="M 72 26 Q 78 20, 84 26" strokeWidth="0.6" />
      {/* Left facade receding */}
      <path d="M 6 26 L 6 86" strokeWidth="1.2" />
      <path d="M 12 26 L 12 86" strokeWidth="0.6" opacity={S.CN.opacitySubtle} />
      {/* Right facade receding */}
      <path d="M 94 26 L 94 86" strokeWidth="1.2" />
      <path d="M 88 26 L 88 86" strokeWidth="0.6" opacity={S.CN.opacitySubtle} />
      {/* Bottom facade */}
      <path d="M 6 86 L 94 86" strokeWidth="1" />
    </g>

    {/* 3D shading — ground plane of the square */}
    <path d="M 12 26 L 88 26 L 94 86 L 6 86 Z"
          fill="currentColor" opacity="0.06" stroke="none" />
    {/* 3D shading — right facade shadow */}
    <path d="M 88 26 L 94 26 L 94 86 L 88 86 Z"
          fill="currentColor" opacity="0.09" stroke="none" />

    {/* PRIMARY: THE SQUARE — formal enclosed urban space */}
    <g filter={showHalo ? "url(#urban-halo)" : undefined}>
      {/* Ground plane outline */}
      <path d="M 12 26 L 88 26 L 88 86 L 12 86 Z"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Cruciform paths */}
      <path d="M 50 26 L 50 86" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 12 56 L 88 56" strokeWidth={S.P.strokeWidthLight} />

      {/* Central monument — 3D pedestal with column */}
      <path d="M 44 50 L 44 62 L 56 62 L 56 50 Z"
            strokeWidth={S.P.strokeWidthBold} />
      {/* Pedestal side face */}
      <path d="M 56 50 L 60 52 L 60 64 L 56 62"
            strokeWidth={S.P.strokeWidthLight} opacity="0.6" />
      {/* Monument column */}
      <path d="M 50 50 L 50 36" strokeWidth={S.P.strokeWidthBold} />
      <path d="M 47 38 L 53 38" strokeWidth={S.P.strokeWidth} />
      <circle cx="50" cy="34" r="2.5" strokeWidth={S.P.strokeWidthLight} />

      {/* Garden beds in quadrants — bounded rectangles */}
      <path d="M 18 32 L 44 32 L 44 50 L 18 50 Z"
            strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 56 32 L 82 32 L 82 50 L 56 50 Z"
            strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 18 62 L 44 62 L 44 80 L 18 80 Z"
            strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 56 62 L 82 62 L 82 80 L 56 80 Z"
            strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* DETAIL: Trees in garden quadrants */}
      <circle cx="31" cy="41" r="4" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <circle cx="69" cy="41" r="4" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <circle cx="31" cy="71" r="4" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <circle cx="69" cy="71" r="4" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
    </g>
  </svg>
)

// ============================================================================
// STREET - 3/4 view looking down a city street corridor. Shows building
// walls converging in perspective, visible side facades with windows,
// sidewalks, street furniture, and a center road with lane markings.
// Reference: Typical city street section with buildings
// ============================================================================
export const StreetSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Vanishing point buildings */}
    <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
      <path d="M 44 28 L 44 22 L 56 22 L 56 28" />
      <path d="M 48 24 L 52 24" />
    </g>

    {/* CONTEXT (near): Building rooflines and cornices */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      {/* Left building top */}
      <path d="M 2 12 L 2 92 L 20 92" strokeWidth="1.2" />
      <path d="M 2 12 L 36 26" strokeWidth="0.8" />
      {/* Right building top */}
      <path d="M 98 12 L 98 92 L 80 92" strokeWidth="1.2" />
      <path d="M 98 12 L 64 26" strokeWidth="0.8" />
    </g>

    {/* 3D shading — right building wall in shadow */}
    <path d="M 64 26 L 98 12 L 98 92 L 80 92 L 80 88 L 64 88 Z"
          fill="currentColor" opacity="0.1" stroke="none" />
    {/* 3D shading — road surface */}
    <path d="M 20 92 L 36 26 L 64 26 L 80 92 Z"
          fill="currentColor" opacity="0.06" stroke="none" />

    {/* PRIMARY: THE STREET — perspective corridor with depth */}
    <g filter={showHalo ? "url(#urban-halo)" : undefined}>
      {/* Left building wall — near face */}
      <path d="M 2 12 L 36 26 L 36 88 L 20 92 L 2 92"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Right building wall — near face */}
      <path d="M 98 12 L 64 26 L 64 88 L 80 92 L 98 92"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />

      {/* Left sidewalk edge */}
      <path d="M 20 92 L 36 26"
            strokeWidth={S.P.strokeWidth} />
      {/* Right sidewalk edge */}
      <path d="M 80 92 L 64 26"
            strokeWidth={S.P.strokeWidth} />

      {/* Road curbs */}
      <path d="M 26 92 L 40 30" strokeWidth={S.P.strokeWidthLight} opacity="0.7" />
      <path d="M 74 92 L 60 30" strokeWidth={S.P.strokeWidthLight} opacity="0.7" />

      {/* Center lane dashes */}
      <path d="M 50 92 L 50 28" strokeDasharray="5 5" strokeWidth={S.P.strokeWidthLight} />

      {/* Left building windows (3D recessed) */}
      <path d="M 6 24 L 6 42 L 30 42 L 30 32 Z"
            strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 6 48 L 6 66 L 30 58 L 30 46 Z"
            strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 6 72 L 6 88 L 22 86 L 30 66 Z"
            strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />

      {/* Right building windows */}
      <path d="M 94 24 L 94 42 L 70 42 L 70 32 Z"
            strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      <path d="M 94 48 L 94 66 L 70 58 L 70 46 Z"
            strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

      {/* Street lamps — 3D with shadow */}
      <path d="M 32 58 L 32 68" strokeWidth={S.P.strokeWidthBold} />
      <ellipse cx="32" cy="56" rx="3" ry="1.5" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 68 58 L 68 68" strokeWidth={S.P.strokeWidthBold} />
      <ellipse cx="68" cy="56" rx="3" ry="1.5" strokeWidth={S.P.strokeWidthLight} />

      {/* DETAIL: Crosswalk stripes in perspective */}
      <path d="M 30 86 L 70 86" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 30 88 L 70 88" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
      <path d="M 28 90 L 72 90" strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity} />
    </g>
  </svg>
)

// ============================================================================
// WATERFRONT - 3/4 view of a harbor quay with promenade. Shows the dock
// edge as a thick 3D wall, bollards on the quay, buildings behind with
// visible side faces, and water with a moored vessel.
// Reference: Sydney Harbor, San Francisco Embarcadero
// ============================================================================
export const WaterfrontSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
    <HaloFilter />

    {/* CONTEXT (far): Distant water horizon and far shore */}
    <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
      <path d="M 2 62 Q 30 58, 50 62 Q 70 66, 98 62" />
      <path d="M 2 56 L 98 56" />
      <path d="M 60 52 L 68 48 L 76 52" />
    </g>

    {/* CONTEXT (near): Buildings behind the quay */}
    <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
      {/* Building 1 — 3D block */}
      <path d="M 8 18 L 8 40 L 28 40 L 28 22" strokeWidth="0.8" />
      <path d="M 28 22 L 34 20 L 34 38 L 28 40" strokeWidth="0.5" opacity={S.CN.opacitySubtle} />
      {/* Building 2 — taller */}
      <path d="M 38 12 L 38 40 L 56 40 L 56 16" strokeWidth="0.8" />
      <path d="M 56 16 L 62 14 L 62 38 L 56 40" strokeWidth="0.5" opacity={S.CN.opacitySubtle} />
      {/* Building 3 */}
      <path d="M 66 20 L 66 40 L 86 40 L 86 24" strokeWidth="0.8" />
      <path d="M 86 24 L 92 22 L 92 38 L 86 40" strokeWidth="0.5" opacity={S.CN.opacitySubtle} />
    </g>

    {/* 3D shading — quay wall face dropping into water */}
    <path d="M 2 52 L 98 52 L 98 58 L 2 58 Z"
          fill="currentColor" opacity="0.12" stroke="none" />
    {/* 3D shading — promenade deck shadow */}
    <path d="M 2 42 L 98 42 L 98 48 L 2 48 Z"
          fill="currentColor" opacity="0.06" stroke="none" />

    {/* PRIMARY: THE WATERFRONT — quay edge and promenade */}
    <g filter={showHalo ? "url(#urban-halo)" : undefined}>
      {/* Quay wall — thick 3D edge (the massive harbor wall) */}
      <path d="M 2 48 L 98 48"
            strokeWidth={S.P.strokeWidthHeavy} strokeLinecap={S.P.strokeLinecap} />
      {/* Quay wall face */}
      <path d="M 2 48 L 2 56 L 98 56 L 98 48"
            strokeWidth={S.P.strokeWidthBold} />
      {/* Water line at wall base */}
      <path d="M 2 56 L 98 56" strokeWidth={S.P.strokeWidthLight} opacity="0.6" />

      {/* Promenade deck surface */}
      <path d="M 2 42 L 98 42"
            strokeWidth={S.P.strokeWidthBold} strokeLinecap={S.P.strokeLinecap} />
      {/* Deck depth */}
      <path d="M 2 42 L 2 48 M 98 42 L 98 48"
            strokeWidth={S.P.strokeWidthLight} />

      {/* Bollards — 3D cylinders on quay edge */}
      {[14, 34, 54, 74].map((x, i) => (
        <g key={i}>
          <path d={`M ${x} 44 L ${x} 48`} strokeWidth={S.P.strokeWidthBold} />
          <ellipse cx={x} cy="43" rx="2.5" ry="1.5" strokeWidth={S.P.strokeWidthLight} />
        </g>
      ))}

      {/* Lamp posts — 3D vertical elements */}
      <path d="M 24 34 L 24 42" strokeWidth={S.P.strokeWidthBold} />
      <ellipse cx="24" cy="32" rx="3" ry="1.8" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 64 34 L 64 42" strokeWidth={S.P.strokeWidthBold} />
      <ellipse cx="64" cy="32" rx="3" ry="1.8" strokeWidth={S.P.strokeWidthLight} />

      {/* DETAIL: Quay wall stone coursing */}
      <path d="M 2 52 L 98 52" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 20 48 L 20 56" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 44 48 L 44 56" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      <path d="M 68 48 L 68 56" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
    </g>

    {/* Moored vessel — 3D hull form */}
    <g strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacityStrong}>
      <path d="M 72 68 Q 78 62, 88 66 Q 92 70, 88 74 L 74 74 Q 68 72, 72 68" />
      <path d="M 80 66 L 80 58" strokeWidth={S.P.strokeWidthLight} />
      <path d="M 80 58 L 86 62" strokeWidth={S.D.strokeWidthFine} />
      {/* Hull shadow */}
      <path d="M 76 74 Q 82 76, 88 74 L 86 76 Q 80 78, 74 76 Z"
            fill="currentColor" opacity="0.08" stroke="none" />
    </g>

    {/* EFFECTS: Water ripples */}
    <g strokeDasharray={S.E.dash} opacity={S.E.opacity} strokeWidth={S.E.strokeWidth}>
      <path d="M 4 64 Q 20 62, 40 64 Q 56 66, 70 64" />
      <path d="M 10 72 Q 30 70, 50 72 Q 66 74, 80 72" />
      <path d="M 6 80 Q 25 78, 45 80 Q 60 82, 90 80" />
    </g>
  </svg>
)

// Export mapping for all urban elements
export const URBAN_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'arcade': ArcadeSVG,
  'boulevard': BoulevardSVG,
  'bridge': BridgeSVG,
  'fountain': FountainSVG,
  'kiosk': KioskSVG,
  'plaza': PlazaSVG,
  'promenade': PromenadeSVG,
  'square': SquareSVG,
  'street': StreetSVG,
  'waterfront': WaterfrontSVG,
}

