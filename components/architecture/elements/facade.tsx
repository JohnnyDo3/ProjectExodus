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

// 1. Awning - Retractable fabric canopy projection
// Architectural reference: Commercial building weather protection, originated in 19th century storefronts
const AwningSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="awning-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#awning-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Parisian Haussmann café building — mansard roof, wrought-iron balcony, zinc roofline */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Mansard roof with zinc panels and dormer window */}
        <path d="M12 8 L15 2 L85 2 L88 8 Z" />
        <path d="M42 3 L42 7 L58 7 L58 3" />
        <path d="M50 3 Q50 5, 50 7" />
        {/* Chimney pots */}
        <path d="M22 2 L22 -2 L26 -2 L26 2" />
        <path d="M74 2 L74 -2 L78 -2 L78 2" />
        {/* Upper floor stone facade with tall windows */}
        <path d="M15 8 L15 25 L85 25 L85 8" />
        <path d="M22 10 L22 22 L36 22 L36 10" />
        <path d="M64 10 L64 22 L78 22 L78 10" />
        {/* Wrought-iron continuous balcony railing with scroll brackets */}
        <path d="M15 25 L85 25" />
        <path d="M15 23 L85 23" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M20 23 Q18 21, 20 19" />
        <path d="M40 23 Q38 21, 40 19" />
        <path d="M60 23 Q58 21, 60 19" />
        <path d="M80 23 Q78 21, 80 19" />
        {/* Cafe level — lower wall with wainscoting */}
        <path d="M15 45 L15 90 L85 90 L85 45" />
        <path d="M15 80 L85 80" />
        {/* Cobblestone street suggestion */}
        <path d="M5 92 Q15 94, 25 92 Q35 94, 45 92 Q55 94, 65 92 Q75 94, 85 92 Q95 94, 100 92" />
        {/* Bistro table and chair on sidewalk */}
        <circle cx="8" cy="86" r="3" />
        <path d="M8 89 L8 92" />
        <path d="M2 85 L2 92" />
      </g>

      {/* PRIMARY: Haussmann café awning — retractable striped canopy with ornate ironwork */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Wrought-iron wall-mounted bracket bar with decorative scrollwork */}
        <path d="M15 25 L85 25" strokeWidth={S.P.strokeWidthBold} />
        <path d="M15 24 Q18 22, 21 24" strokeWidth={S.P.strokeWidthLight} />
        <path d="M79 24 Q82 22, 85 24" strokeWidth={S.P.strokeWidthLight} />

        {/* Fabric canopy — curved projection with alternating stripe texture */}
        <path d="M15 25 Q15 38, 12 48 Q30 58, 50 52 Q70 58, 88 48 Q85 38, 85 25" strokeWidth={S.P.strokeWidthBold} />
        {/* Stripe pattern on fabric — alternating bands */}
        <path d="M20 27 Q20 38, 18 46" strokeWidth={S.D.strokeWidthFine} opacity="0.5" />
        <path d="M30 26 Q30 40, 25 50" strokeWidth={S.D.strokeWidthFine} opacity="0.5" />
        <path d="M40 26 Q40 42, 38 52" strokeWidth={S.D.strokeWidthFine} opacity="0.5" />
        <path d="M50 26 Q50 42, 50 52" strokeWidth={S.D.strokeWidthFine} opacity="0.5" />
        <path d="M60 26 Q60 42, 62 52" strokeWidth={S.D.strokeWidthFine} opacity="0.5" />
        <path d="M70 26 Q70 40, 75 50" strokeWidth={S.D.strokeWidthFine} opacity="0.5" />
        <path d="M80 27 Q80 38, 82 46" strokeWidth={S.D.strokeWidthFine} opacity="0.5" />

        {/* Articulated iron support arms — curved French style */}
        <path d="M15 25 Q10 35, 12 48" strokeWidth={S.P.strokeWidthBold} />
        <path d="M85 25 Q90 35, 88 48" strokeWidth={S.P.strokeWidthBold} />
        {/* Intermediate folding arms */}
        <path d="M30 25 L25 30 L22 44" strokeWidth={S.P.strokeWidth} />
        <path d="M50 25 L50 32 L50 52" strokeWidth={S.P.strokeWidth} />
        <path d="M70 25 L75 30 L78 44" strokeWidth={S.P.strokeWidth} />

        {/* Scalloped valance with pointed lambroquin trim */}
        <path d="M12 48 Q17 54, 22 48 Q27 54, 32 48 Q37 54, 42 48 Q47 54, 50 52 Q53 54, 58 48 Q63 54, 68 48 Q73 54, 78 48 Q83 54, 88 48" strokeWidth={S.P.strokeWidth} />
        {/* Fringe detail along valance edge */}
        <path d="M14 50 L14 53 M18 52 L18 55 M22 50 L22 53 M26 52 L26 55" strokeWidth={S.D.strokeWidthFine} opacity="0.5" />
        <path d="M34 50 L34 53 M38 52 L38 55 M42 50 L42 53 M46 52 L46 55" strokeWidth={S.D.strokeWidthFine} opacity="0.5" />
        <path d="M56 50 L56 53 M60 52 L60 55 M64 50 L64 53 M68 52 L68 55" strokeWidth={S.D.strokeWidthFine} opacity="0.5" />
        <path d="M74 50 L74 53 M78 52 L78 55 M82 50 L82 53 M86 52 L86 55" strokeWidth={S.D.strokeWidthFine} opacity="0.5" />

        {/* Iron scroll bracket supports at wall — ornate Parisian wrought-iron */}
        <path d="M15 25 Q12 28, 10 35 Q8 30, 10 25" strokeWidth={S.P.strokeWidth} />
        <path d="M85 25 Q88 28, 90 35 Q92 30, 90 25" strokeWidth={S.P.strokeWidth} />

        {/* Cord and pulley retraction mechanism visible at wall */}
        <path d="M17 26 L17 22" strokeWidth={S.P.strokeWidthLight} opacity="0.6" />
        <circle cx="17" cy="22" r="1" strokeWidth={S.P.strokeWidthLight} opacity="0.6" />
        <path d="M83 26 L83 22" strokeWidth={S.P.strokeWidthLight} opacity="0.6" />
        <circle cx="83" cy="22" r="1" strokeWidth={S.P.strokeWidthLight} opacity="0.6" />
      </g>
    </g>
  </svg>
)

// 2. Bay Window - Projecting multi-faceted window structure
// Architectural reference: Victorian and Edwardian domestic architecture, provides expanded interior space
const BayWindowSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="bay-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#bay-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Victorian Painted Lady row house — steep gable, fish-scale shingles, ornate bargeboard */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Steep gable roof with decorative ridge finial */}
        <path d="M5 15 L50 -2 L95 15" />
        <path d="M50 -2 L50 -6" />
        <path d="M48 -6 L52 -6 L50 -9 Z" />
        {/* Fish-scale shingle pattern in gable */}
        <path d="M25 8 Q30 5, 35 8 Q40 5, 45 8 Q50 5, 55 8 Q60 5, 65 8 Q70 5, 75 8" />
        <path d="M30 11 Q35 8, 40 11 Q45 8, 50 11 Q55 8, 60 11 Q65 8, 70 11" />
        {/* Ornate bargeboard (gingerbread trim) */}
        <path d="M8 15 Q15 10, 20 15" />
        <path d="M80 15 Q85 10, 92 15" />
        {/* Clapboard siding on flanking walls */}
        <path d="M5 15 L5 90 L28 90 L28 15" />
        <path d="M72 15 L72 90 L95 90 L95 15" />
        {[25, 35, 45, 55, 65, 75].map((y, i) => (
          <g key={i}>
            <path d={`M5 ${y} L28 ${y}`} strokeWidth={S.CN.strokeWidthFine} />
            <path d={`M72 ${y} L95 ${y}`} strokeWidth={S.CN.strokeWidthFine} />
          </g>
        ))}
        {/* Decorative window with hood mold — left */}
        <path d="M10 25 L10 40 L23 40 L23 25 Z" />
        <path d="M8 25 L25 25" />
        {/* Decorative window — right */}
        <path d="M77 25 L77 40 L90 40 L90 25 Z" />
        <path d="M75 25 L92 25" />
        {/* Neighboring house silhouette hint */}
        <path d="M-2 20 L-2 92" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M98 18 L98 92" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Foundation and sidewalk */}
        <path d="M3 90 L97 90" />
        <path d="M0 94 L100 94" />
      </g>

      {/* PRIMARY: Victorian Painted Lady angled bay window with ornamental woodwork */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Bay roof — steep mini hip with fish-scale shingle texture */}
        <path d="M25 15 L30 8 L50 3 L70 8 L75 15 Z" strokeWidth={S.P.strokeWidthBold} />
        {/* Fish-scale shingle pattern on bay roof */}
        <path d="M33 12 Q36 10, 39 12 Q42 10, 45 12 Q48 10, 51 12 Q54 10, 57 12 Q60 10, 63 12 Q66 10, 69 12" strokeWidth={S.D.strokeWidthFine} opacity="0.6" />
        <path d="M35 14 Q38 12, 41 14 Q44 12, 47 14 Q50 12, 53 14 Q56 12, 59 14 Q62 12, 65 14" strokeWidth={S.D.strokeWidthFine} opacity="0.5" />
        {/* Decorative ridge finial */}
        <path d="M50 3 L50 0" strokeWidth={S.P.strokeWidth} />
        <path d="M49 0 L51 0 L50 -2 Z" strokeWidth={S.P.strokeWidthLight} />

        {/* Main angular projection — three-faceted */}
        <path d="M30 15 L30 80 L40 85 L50 87 L60 85 L70 80 L70 15" strokeWidth={S.P.strokeWidthBold} />

        {/* Front central window — tall double-hung sash with arch top */}
        <path d="M42 18 Q50 14, 58 18 L58 75 L42 75 Z" strokeWidth={S.P.strokeWidth} />
        {/* Sash division */}
        <path d="M42 45 L58 45" strokeWidth={S.P.strokeWidth} />
        {/* Vertical muntin */}
        <path d="M50 18 L50 75" strokeWidth={S.P.strokeWidth} />
        {/* Upper sash — 2-over-2 pattern */}
        <path d="M42 30 L58 30" strokeWidth={S.P.strokeWidthLight} />

        {/* Left angled window — matching proportions */}
        <path d="M32 18 L32 75 L40 78 L40 18 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M36 18 L36 76" strokeWidth={S.P.strokeWidthLight} />
        <path d="M32 45 L40 47" strokeWidth={S.P.strokeWidth} />
        <path d="M32 30 L40 31" strokeWidth={S.P.strokeWidthLight} />

        {/* Right angled window */}
        <path d="M60 18 L60 78 L68 75 L68 18 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M64 18 L64 76" strokeWidth={S.P.strokeWidthLight} />
        <path d="M60 47 L68 45" strokeWidth={S.P.strokeWidth} />
        <path d="M60 31 L68 30" strokeWidth={S.P.strokeWidthLight} />

        {/* Ornamental spandrel panels between windows and bay corners */}
        <path d="M30 18 L32 18 L32 22 L30 22 Z" strokeWidth={S.D.strokeWidthFine} opacity="0.6" />
        <path d="M68 18 L70 18 L70 22 L68 22 Z" strokeWidth={S.D.strokeWidthFine} opacity="0.6" />

        {/* Projecting sill with decorative bracket corbels */}
        <path d="M28 80 L40 87 L50 90 L60 87 L72 80" strokeWidth={S.P.strokeWidthBold} />
        {/* Turned spindle brackets — Victorian gingerbread */}
        <path d="M32 80 Q33 83, 35 85 Q33 87, 36 88" strokeWidth={S.P.strokeWidth} />
        <path d="M38 82 Q39 85, 40 87" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 82 L50 90" strokeWidth={S.P.strokeWidthLight} />
        <path d="M60 87 Q61 85, 62 82" strokeWidth={S.P.strokeWidthLight} />
        <path d="M68 80 Q67 83, 65 85 Q67 87, 64 88" strokeWidth={S.P.strokeWidth} />

        {/* Sunburst panel in gable peak above bay */}
        <path d="M42 16 Q50 10, 58 16" strokeWidth={S.D.strokeWidthFine} opacity="0.7" />
        <path d="M50 11 L48 15 M50 11 L52 15 M50 11 L46 14 M50 11 L54 14" strokeWidth={S.D.strokeWidthFine} opacity="0.5" />

        {/* Decorative turned newel post finials at bay corners */}
        <circle cx="30" cy="15" r="1.5" strokeWidth="0.6" />
        <circle cx="70" cy="15" r="1.5" strokeWidth="0.6" />
      </g>
    </g>
  </svg>
)

// 3. Canopy - Permanent roof projection over entrance
// Architectural reference: Modern commercial and institutional buildings, typically supported by columns
const CanopySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="canopy-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#canopy-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Mid-century modern hotel — glass curtain wall, flagpoles, terrazzo entry */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Flat roof parapet with thin coping */}
        <path d="M10 18 L90 18 L90 20 L10 20 Z" />
        {/* Glass curtain wall grid — horizontal spandrel bands and vertical mullions */}
        <path d="M10 20 L10 90 L90 90 L90 20" />
        {[28, 36, 44, 52, 60, 68, 76, 84].map((y, i) => (
          <path key={`h${i}`} d={`M10 ${y} L90 ${y}`} strokeWidth="0.3" />
        ))}
        {[22, 34, 46, 58, 70, 82].map((x, i) => (
          <path key={`v${i}`} d={`M${x} 20 L${x} 90`} strokeWidth="0.3" />
        ))}
        {/* Flagpoles flanking entrance */}
        <path d="M5 10 L5 90" strokeWidth="0.5" />
        <path d="M3 10 L5 12 L7 10 Z" />
        <path d="M95 10 L95 90" strokeWidth="0.5" />
        <path d="M93 10 L95 12 L97 10 Z" />
        {/* Driveway approach with curb */}
        <path d="M0 92 L100 92" />
        <path d="M25 92 Q50 96, 75 92" strokeWidth="0.4" />
        {/* Planter box */}
        <path d="M3 82 L3 90 L9 90 L9 82 Z" />
        <path d="M4 80 Q6 76, 8 80" />
      </g>

      {/* PRIMARY: Mid-century modern canopy — flat concrete slab with thin-edge profile */}
      <g strokeWidth="0.8">
        {/* Cantilevered concrete roof slab — thin edge profile, clean modernist */}
        <path d="M10 33 L90 33 L92 36 L8 36 Z" strokeWidth="1.2" />
        {/* Drip edge detail — characteristic thin shadow line */}
        <path d="M8 36 L92 36" strokeWidth="1.5" />
        {/* Soffit — smooth concrete underside with recessed lighting channels */}
        <path d="M12 36 L12 38 L88 38 L88 36" strokeWidth="0.4" opacity="0.5" />
        {/* Recessed downlights in soffit */}
        <circle cx="30" cy="37" r="1.5" strokeWidth="0.4" opacity="0.5" />
        <circle cx="50" cy="37" r="1.5" strokeWidth="0.4" opacity="0.5" />
        <circle cx="70" cy="37" r="1.5" strokeWidth="0.4" opacity="0.5" />

        {/* Slender steel I-beam columns — minimalist square section */}
        <path d="M22 38 L22 88" strokeWidth="2" />
        <path d="M78 38 L78 88" strokeWidth="2" />
        {/* Column flange detail */}
        <path d="M20 38 L24 38" strokeWidth="0.8" />
        <path d="M76 38 L80 38" strokeWidth="0.8" />
        <path d="M20 88 L24 88" strokeWidth="0.8" />
        <path d="M76 88 L80 88" strokeWidth="0.8" />

        {/* Tension rod cross-bracing — diagonal structural expression */}
        <path d="M22 38 L78 58" strokeWidth="0.4" opacity="0.4" />
        <path d="M78 38 L22 58" strokeWidth="0.4" opacity="0.4" />

        {/* Glass storefront wall set back from canopy edge */}
        <path d="M30 42 L30 88 L70 88 L70 42 Z" strokeWidth="0.9" />
        {/* Full-height glass panels with minimal aluminum frames */}
        <path d="M38 42 L38 88" strokeWidth="0.6" />
        <path d="M50 42 L50 88" strokeWidth="0.6" />
        <path d="M62 42 L62 88" strokeWidth="0.6" />
        {/* Transom bar */}
        <path d="M30 52 L70 52" strokeWidth="0.6" />

        {/* Flush entry door — frameless glass pivot */}
        <path d="M44 52 L44 88 L56 88 L56 52 Z" strokeWidth="1" />
        {/* Minimal pull handle — vertical bar */}
        <path d="M53 62 L53 78" strokeWidth="1.5" />

        {/* Address numbers on fascia */}
        <path d="M45 34 L48 34 M52 34 L55 34" strokeWidth="0.5" opacity="0.6" />

        {/* Terrazzo entry platform */}
        <path d="M8 88 L92 88 L94 92 L6 92 Z" strokeWidth="0.8" />
      </g>
    </g>
  </svg>
)

// 4. Cornice - Projecting horizontal crown molding
// Architectural reference: Classical architecture crown element, defines building roofline with decorative profile
const CorniceSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="cornice-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#cornice-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Beaux-Arts apartment — mansard roof with dormers, oeil-de-boeuf, rusticated base */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Mansard roof slope with slate pattern above cornice */}
        <path d="M12 30 L12 42 L88 42 L88 30 Q50 22, 12 30" />
        <path d="M20 33 L20 40" strokeWidth="0.3" />
        <path d="M35 31 L35 40" strokeWidth="0.3" />
        <path d="M65 31 L65 40" strokeWidth="0.3" />
        <path d="M80 33 L80 40" strokeWidth="0.3" />
        {/* Dormer windows in mansard */}
        <path d="M28 32 L28 40 L38 40 L38 32 Q33 28, 28 32" />
        <path d="M62 32 L62 40 L72 40 L72 32 Q67 28, 62 32" />
        {/* Oeil-de-boeuf (oval attic window) */}
        <ellipse cx="50" cy="35" rx="5" ry="3.5" />
        {/* Building wall below with tall windows and pediment headers */}
        <path d="M15 60 L15 97 L85 97 L85 60" />
        {/* Windows with triangular pediments */}
        <path d="M22 66 L22 88 L38 88 L38 66 Z" />
        <path d="M20 66 L30 62 L40 66" />
        <path d="M62 66 L62 88 L78 88 L78 66 Z" />
        <path d="M60 66 L70 62 L80 66" />
        {/* Rusticated stone base course */}
        <path d="M15 88 L85 88" />
        <path d="M15 92 L85 92" />
        <path d="M25 88 L25 92" strokeWidth="0.4" />
        <path d="M40 88 L40 92" strokeWidth="0.4" />
        <path d="M60 88 L60 92" strokeWidth="0.4" />
        <path d="M75 88 L75 92" strokeWidth="0.4" />
      </g>

      {/* PRIMARY: Beaux-Arts cornice — heavy projecting crown with modillions, egg-and-dart, and dentils */}
      <g strokeWidth="0.8">
        {/* Cyma recta crown molding — S-curve profile at top */}
        <path d="M8 40 Q30 36, 50 40 Q70 44, 92 40" strokeWidth="1" />
        <path d="M8 42 L92 42" strokeWidth="0.7" />

        {/* Corona — main projecting slab with deep shadow */}
        <path d="M6 42 L94 42 L96 48 L4 48 Z" strokeWidth="1.3" />
        {/* Drip edge (larmier) — water-shedding profile */}
        <path d="M4 48 L96 48" strokeWidth="1.5" />

        {/* Soffit with coffered panels */}
        <path d="M8 48 L8 50 L92 50 L92 48" strokeWidth="0.5" opacity="0.5" />
        <path d="M20 48 L20 50 M40 48 L40 50 M60 48 L60 50 M80 48 L80 50" strokeWidth="0.3" opacity="0.4" />

        {/* Modillions — ornate scroll brackets supporting corona */}
        {[14, 26, 38, 50, 62, 74, 86].map((x, i) => (
          <g key={i}>
            <path d={`M${x-3} 48 L${x-3} 52 Q${x-5} 55, ${x-3} 58 L${x+3} 58 Q${x+5} 55, ${x+3} 52 L${x+3} 48`} strokeWidth="0.8" />
            {/* Scroll volute on modillion face */}
            <path d={`M${x-2} 52 Q${x} 54, ${x+2} 52`} strokeWidth="0.4" opacity="0.5" />
          </g>
        ))}

        {/* Dentil course — tightly spaced rectangular blocks */}
        {[10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 74, 78, 82, 86, 90].map((x, i) => (
          <path key={`d${i}`} d={`M${x-1} 58 L${x-1} 62 L${x+1} 62 L${x+1} 58 Z`} strokeWidth="0.5" />
        ))}
        {/* Dentil band backing */}
        <path d="M8 58 L92 58" strokeWidth="0.6" />
        <path d="M8 62 L92 62" strokeWidth="0.6" />

        {/* Egg-and-dart molding beneath dentils */}
        {[15, 25, 35, 45, 55, 65, 75, 85].map((x, i) => (
          <g key={`e${i}`}>
            <ellipse cx={x} cy={64} rx={2.5} ry={1.5} strokeWidth="0.5" />
            <path d={`M${x+4} 63 L${x+5} 65 L${x+4} 65 Z`} strokeWidth="0.4" opacity="0.6" />
          </g>
        ))}

        {/* Frieze band — smooth or with garland swag relief */}
        <path d="M10 66 L90 66 L90 76 L10 76 Z" strokeWidth="1" />
        {/* Carved garland swags */}
        <path d="M15 69 Q28 74, 40 69 Q52 74, 65 69 Q78 74, 85 69" strokeWidth="0.6" opacity="0.5" />
        {/* Ribbon ties at swag peaks */}
        <path d="M15 69 L15 67 M40 69 L40 67 M65 69 L65 67 M85 69 L85 67" strokeWidth="0.4" opacity="0.4" />

        {/* Architrave — three-fasciae classical subdivision */}
        <path d="M12 76 L88 76 L88 80 L12 80 Z" strokeWidth="0.9" />
        <path d="M12 80 L88 80 L88 83 L12 83 Z" strokeWidth="0.8" />
        <path d="M12 83 L88 83 L88 85 L12 85 Z" strokeWidth="0.7" />
      </g>
    </g>
  </svg>
)

// 5. Entablature - Classical three-part horizontal superstructure
// Architectural reference: Greek and Roman temple architecture - cornice, frieze, and architrave over columns
const EntablatureSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="entablature-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#entablature-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Greek Doric temple — fluted column shafts, stepped crepidoma, landscape */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Full fluted column shafts descending from architrave */}
        <path d="M15 72 L15 88" strokeWidth="1.4" />
        <path d="M13 74 L13 88" strokeWidth="0.3" />
        <path d="M17 74 L17 88" strokeWidth="0.3" />
        <path d="M50 72 L50 88" strokeWidth="1.4" />
        <path d="M48 74 L48 88" strokeWidth="0.3" />
        <path d="M52 74 L52 88" strokeWidth="0.3" />
        <path d="M85 72 L85 88" strokeWidth="1.4" />
        <path d="M83 74 L83 88" strokeWidth="0.3" />
        <path d="M87 74 L87 88" strokeWidth="0.3" />
        {/* Doric capitals — abacus and echinus */}
        <path d="M11 72 L19 72 L19 75 L11 75 Z" />
        <path d="M46 72 L54 72 L54 75 L46 75 Z" />
        <path d="M81 72 L89 72 L89 75 L81 75 Z" />
        {/* Three-stepped crepidoma platform */}
        <path d="M8 88 L92 88" strokeWidth="0.8" />
        <path d="M5 92 L95 92" strokeWidth="0.8" />
        <path d="M2 96 L98 96" strokeWidth="0.9" />
        {/* Landscape — olive tree silhouette and rocky ground */}
        <path d="M-2 96 Q3 92, 0 88 Q-2 84, 2 82 Q5 80, 3 78 Q0 76, 4 74" strokeWidth="0.4" opacity="0.25" />
        <path d="M96 96 Q98 90, 100 86 Q102 82, 98 80" strokeWidth="0.4" opacity="0.25" />
      </g>

      {/* PRIMARY: Greek Doric entablature — triglyphs, metopes with sculptural relief, mutules */}
      <g strokeWidth="0.8">
        {/* CORNICE — with forward projection and hawk's beak molding */}
        <path d="M3 12 Q50 8, 97 12" strokeWidth="0.9" />
        <path d="M2 14 L98 14 L100 20 L0 20 Z" strokeWidth="1.3" />
        {/* Corona slab */}
        <path d="M0 20 L100 20 L100 26 L0 26 Z" strokeWidth="1.2" />
        {/* Mutules with guttae — flat blocks projecting from soffit (Doric only) */}
        {[12, 28, 44, 60, 76, 90].map((x, i) => (
          <g key={`m${i}`}>
            <path d={`M${x-4} 20 L${x-4} 24 L${x+4} 24 L${x+4} 20 Z`} strokeWidth="0.7" opacity="0.7" />
            {/* Guttae (6 small pegs under each mutule) */}
            <circle cx={x-3} cy={25} r={0.6} strokeWidth="0.4" />
            <circle cx={x-1} cy={25} r={0.6} strokeWidth="0.4" />
            <circle cx={x+1} cy={25} r={0.6} strokeWidth="0.4" />
            <circle cx={x+3} cy={25} r={0.6} strokeWidth="0.4" />
          </g>
        ))}

        {/* FRIEZE — alternating triglyphs and metopes */}
        <path d="M5 28 L95 28 L95 52 L5 52 Z" strokeWidth="1.1" />

        {/* Triglyphs — vertical grooved tablets with chamfered edges */}
        {[12, 28, 44, 60, 76, 90].map((x, i) => (
          <g key={`t${i}`}>
            <path d={`M${x-5} 29 L${x-5} 50 L${x+5} 50 L${x+5} 29 Z`} strokeWidth="1" />
            {/* Three vertical glyphs (channels) */}
            <path d={`M${x-3} 30 L${x-3} 49`} strokeWidth="0.8" />
            <path d={`M${x} 30 L${x} 49`} strokeWidth="0.8" />
            <path d={`M${x+3} 30 L${x+3} 49`} strokeWidth="0.8" />
            {/* Half-glyphs at edges */}
            <path d={`M${x-5} 30 L${x-5} 49`} strokeWidth="0.5" opacity="0.6" />
            <path d={`M${x+5} 30 L${x+5} 49`} strokeWidth="0.5" opacity="0.6" />
          </g>
        ))}

        {/* Metopes — sculpted relief panels between triglyphs */}
        {/* Metope 1: Bull skull (bucranium) */}
        <path d="M19 35 Q20 33, 22 35 Q24 33, 25 35 L24 42 L20 42 Z" strokeWidth="0.6" opacity="0.6" />
        {/* Metope 2: Circular shield/patera */}
        <circle cx={36} cy={40} r={4} strokeWidth="0.6" opacity="0.5" />
        <circle cx={36} cy={40} r={2} strokeWidth="0.4" opacity="0.4" />
        {/* Metope 3: Rosette */}
        <path d="M52 38 Q50 36, 52 34 Q54 36, 56 34 Q54 36, 56 38 Q54 36, 56 40 Q54 38, 52 40 Q50 38, 48 40 Q50 38, 48 38 Q50 36, 52 38" strokeWidth="0.4" opacity="0.5" />
        {/* Metope 4: Tripod */}
        <path d="M68 34 L66 44 M68 34 L70 44 M64 44 L72 44 M68 34 L68 32" strokeWidth="0.5" opacity="0.5" />
        {/* Metope 5: Wreath */}
        <circle cx={83} cy={40} r={4} strokeWidth="0.5" opacity="0.5" />
        <path d="M81 38 Q83 36, 85 38 M81 42 Q83 44, 85 42" strokeWidth="0.3" opacity="0.4" />

        {/* Regula blocks with guttae — small blocks under taenia above each triglyph */}
        <path d="M5 52 L95 52" strokeWidth="1.2" />
        {[12, 28, 44, 60, 76, 90].map((x, i) => (
          <g key={`r${i}`}>
            <path d={`M${x-4} 52 L${x-4} 54 L${x+4} 54 L${x+4} 52 Z`} strokeWidth="0.5" />
            <circle cx={x-2} cy={55} r={0.5} strokeWidth="0.3" />
            <circle cx={x} cy={55} r={0.5} strokeWidth="0.3" />
            <circle cx={x+2} cy={55} r={0.5} strokeWidth="0.3" />
          </g>
        ))}

        {/* ARCHITRAVE — plain beam (Doric has no fasciae, unlike Ionic) */}
        <path d="M8 56 L92 56 L92 68 L8 68 Z" strokeWidth="1" />
        {/* Subtle horizontal line suggesting stone joints */}
        <path d="M10 62 L90 62" strokeWidth="0.3" opacity="0.4" />

        {/* Taenia — thin band at top of architrave */}
        <path d="M8 56 L92 56" strokeWidth="1.4" />

        {/* Architrave to column junction */}
        <path d="M8 68 L92 68" strokeWidth="1.5" />
      </g>
    </g>
  </svg>
)

// 6. Facade - Principal front elevation of building
// Architectural reference: Complete building front face, typically most ornate and formally designed elevation
const FacadeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="facade-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#facade-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (far): Georgian streetscape — neighboring townhouses, iron lamp, street tree */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        {/* Left neighboring building — slightly taller, different proportions */}
        <path d="M-5 10 L-5 92 L8 92 L8 10 Z" />
        <path d="M-3 20 L-3 35 L6 35 L6 20 Z" strokeWidth="0.3" />
        <path d="M-3 45 L-3 60 L6 60 L6 45 Z" strokeWidth="0.3" />
        <path d="M-5 10 L1 6 L8 10" />
        {/* Right neighboring building — shorter */}
        <path d="M92 22 L92 92 L105 92 L105 22 Z" />
        <path d="M94 30 L94 45 L103 45 L103 30 Z" strokeWidth="0.3" />
        <path d="M94 55 L94 70 L103 70 L103 55 Z" strokeWidth="0.3" />
        {/* Cast-iron lamp post */}
        <path d="M-2 60 L-2 92" strokeWidth="0.5" />
        <path d="M-4 60 L-2 56 L0 60" />
        <path d="M-4 92 L0 92" />
        {/* Street tree */}
        <path d="M96 92 L96 70" strokeWidth="0.5" />
        <path d="M96 70 Q90 60, 96 55 Q102 50, 96 45 Q90 40, 96 38" strokeWidth="0.4" />
        {/* Sidewalk and curb */}
        <path d="M-5 92 L105 92" strokeWidth="0.8" />
        <path d="M-5 95 L105 95" strokeWidth="0.5" />
        {/* Iron area railing in front of basement */}
        <path d="M10 90 L10 95" strokeWidth="0.4" />
        <path d="M90 90 L90 95" strokeWidth="0.4" />
      </g>

      {/* PRIMARY: Georgian townhouse facade — symmetrical 5-bay, sash windows, classical doorcase */}
      <g strokeWidth="0.8">
        {/* Main building envelope */}
        <path d="M10 12 L10 90 L90 90 L90 12 Z" strokeWidth="1.3" />

        {/* Hipped roof with parapet wall */}
        <path d="M8 12 L92 12" strokeWidth="1.5" />
        <path d="M10 8 L90 8 L90 12 L10 12 Z" strokeWidth="0.9" />
        {/* Coping stones on parapet */}
        <path d="M8 8 L92 8" strokeWidth="1" />

        {/* Main cornice — projecting with modillions */}
        <path d="M6 12 L94 12 L94 16 L6 16 Z" strokeWidth="1.1" />
        {[15, 25, 35, 45, 55, 65, 75, 85].map((x, i) => (
          <path key={`fm${i}`} d={`M${x-1} 12 L${x-1} 14 L${x+1} 14 L${x+1} 12`} strokeWidth="0.5" />
        ))}

        {/* Second floor — 5 tall sash windows (6-over-6 panes) */}
        {[18, 32, 46, 60, 74].map((x, i) => (
          <g key={`w2${i}`}>
            <path d={`M${x} 20 L${x} 38 L${x+12} 38 L${x+12} 20 Z`} strokeWidth="0.9" />
            {/* Vertical muntin */}
            <path d={`M${x+6} 20 L${x+6} 38`} strokeWidth="0.5" />
            {/* Sash meeting rail */}
            <path d={`M${x} 29 L${x+12} 29`} strokeWidth="0.6" />
            {/* Horizontal muntins — upper sash */}
            <path d={`M${x} 24 L${x+12} 24`} strokeWidth="0.35" opacity="0.5" />
            {/* Horizontal muntins — lower sash */}
            <path d={`M${x} 33 L${x+12} 33`} strokeWidth="0.35" opacity="0.5" />
            {/* Stone lintel */}
            <path d={`M${x-1} 19 L${x+13} 19 L${x+13} 20 L${x-1} 20 Z`} strokeWidth="0.5" />
            {/* Stone sill */}
            <path d={`M${x-1} 38 L${x+13} 38 L${x+13} 39 L${x-1} 39 Z`} strokeWidth="0.5" />
          </g>
        ))}

        {/* String course between floors */}
        <path d="M10 42 L90 42" strokeWidth="1.1" />

        {/* First floor — 4 sash windows flanking central door */}
        {[18, 32, 60, 74].map((x, i) => (
          <g key={`w1${i}`}>
            <path d={`M${x} 48 L${x} 72 L${x+12} 72 L${x+12} 48 Z`} strokeWidth="0.9" />
            <path d={`M${x+6} 48 L${x+6} 72`} strokeWidth="0.5" />
            <path d={`M${x} 60 L${x+12} 60`} strokeWidth="0.6" />
            <path d={`M${x} 54 L${x+12} 54`} strokeWidth="0.35" opacity="0.5" />
            <path d={`M${x} 66 L${x+12} 66`} strokeWidth="0.35" opacity="0.5" />
            {/* Lintel and sill */}
            <path d={`M${x-1} 47 L${x+13} 47 L${x+13} 48 L${x-1} 48 Z`} strokeWidth="0.5" />
            <path d={`M${x-1} 72 L${x+13} 72 L${x+13} 73 L${x-1} 73 Z`} strokeWidth="0.5" />
          </g>
        ))}

        {/* Classical doorcase with fanlight */}
        {/* Fanlight — semi-elliptical with radiating bars */}
        <path d="M44 48 Q50 42, 56 48 L56 52 L44 52 Z" strokeWidth="1" />
        <path d="M50 43 L50 52" strokeWidth="0.5" />
        <path d="M50 43 L46 50" strokeWidth="0.4" />
        <path d="M50 43 L54 50" strokeWidth="0.4" />
        {/* Door frame with pilasters */}
        <path d="M42 48 L42 88 L58 88 L58 48" strokeWidth="1.2" />
        {/* Pilasters */}
        <path d="M42 48 L44 48 L44 88 L42 88 Z" strokeWidth="0.6" />
        <path d="M56 48 L58 48 L58 88 L56 88 Z" strokeWidth="0.6" />
        {/* Six-panel door */}
        <path d="M45 52 L45 88 L55 88 L55 52 Z" strokeWidth="0.9" />
        <path d="M50 52 L50 88" strokeWidth="0.7" />
        {/* Door panels */}
        <path d="M46 54 L46 60 L49 60 L49 54 Z" strokeWidth="0.4" />
        <path d="M51 54 L51 60 L54 60 L54 54 Z" strokeWidth="0.4" />
        <path d="M46 64 L46 74 L49 74 L49 64 Z" strokeWidth="0.4" />
        <path d="M51 64 L51 74 L54 74 L54 64 Z" strokeWidth="0.4" />
        <path d="M46 78 L46 86 L49 86 L49 78 Z" strokeWidth="0.4" />
        <path d="M51 78 L51 86 L54 86 L54 78 Z" strokeWidth="0.4" />
        {/* Door knocker */}
        <circle cx="53" cy="69" r="1.5" strokeWidth="0.7" />
        {/* Pediment over door */}
        <path d="M40 48 L50 42 L60 48 Z" strokeWidth="1" />

        {/* Corner quoins — alternating large/small stone blocks */}
        {[18, 30, 42, 54, 66, 78].map((y, i) => (
          <g key={`q${i}`}>
            <path d={`M10 ${y} L${i % 2 === 0 ? 15 : 14} ${y} L${i % 2 === 0 ? 15 : 14} ${y+6} L10 ${y+6} Z`} opacity="0.5" strokeWidth="0.6" />
            <path d={`M${i % 2 === 0 ? 86 : 85} ${y} L90 ${y} L90 ${y+6} L${i % 2 === 0 ? 86 : 85} ${y+6} Z`} opacity="0.5" strokeWidth="0.6" />
          </g>
        ))}

        {/* Plinth/water table */}
        <path d="M10 84 L90 84" strokeWidth="0.7" opacity="0.6" />
        <path d="M10 90 L90 90" strokeWidth="1.5" />
        {/* Steps to door */}
        <path d="M40 88 L40 92 L60 92 L60 88" strokeWidth="0.7" />
        <path d="M42 90 L58 90" strokeWidth="0.4" />
      </g>
    </g>
  </svg>
)

// 7. Loggia - Covered exterior corridor with colonnade
// Architectural reference: Italian Renaissance architecture, open-air gallery with arched openings
const LoggiaSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="loggia-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#loggia-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Italian Renaissance palazzo — rusticated ground, piano nobile, rooftop balustrade */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Rooftop balustrade with finial urns */}
        <path d="M5 3 L95 3" />
        <path d="M5 7 L95 7" />
        {[15, 30, 45, 60, 75, 85].map((x, i) => (
          <path key={i} d={`M${x} 3 Q${x-1} 5, ${x} 7`} strokeWidth="0.4" />
        ))}
        {/* Corner finial urns */}
        <path d="M8 3 L8 0 Q10 -2, 12 0 L12 3" />
        <path d="M88 3 L88 0 Q90 -2, 92 0 L92 3" />
        {/* Heavy cornice */}
        <path d="M3 7 L97 7 L97 10 L3 10 Z" />
        {/* Piano nobile — upper floor with pedimented windows */}
        <path d="M5 10 L5 25 L95 25 L95 10" />
        <path d="M15 13 L15 22 L30 22 L30 13 Z" />
        <path d="M13 13 L22 9 L32 13" />
        <path d="M40 13 L40 22 L55 22 L55 13 Z" />
        <path d="M38 13 L47 9 L57 13" />
        <path d="M65 13 L65 22 L80 22 L80 13 Z" />
        <path d="M63 13 L72 9 L82 13" />
        {/* String course between floors */}
        <path d="M5 25 L95 25" strokeWidth="0.8" />
        {/* Courtyard pavement — herringbone hint */}
        <path d="M5 92 L95 92" />
        <path d="M20 92 L22 96 L24 92 L26 96 L28 92" strokeWidth="0.3" />
        <path d="M60 92 L62 96 L64 92 L66 96 L68 92" strokeWidth="0.3" />
      </g>

      {/* PRIMARY: Renaissance palazzo loggia — round arches on Corinthian columns with coffered vault */}
      <g strokeWidth="0.8">
        {/* Heavy entablature with projecting cornice */}
        <path d="M2 22 L98 22 L98 26 L2 26 Z" strokeWidth="1.2" />
        <path d="M0 20 L100 20 L100 22 L0 22 Z" strokeWidth="1.4" />
        {/* Dentil molding on cornice */}
        {[8, 14, 20, 26, 32, 38, 44, 50, 56, 62, 68, 74, 80, 86, 92].map((x, i) => (
          <path key={`ld${i}`} d={`M${x-1} 22 L${x-1} 24 L${x+1} 24 L${x+1} 22`} strokeWidth="0.4" />
        ))}

        {/* Three round arches — proper semicircular with voussoirs */}
        {/* Left arch */}
        <path d="M8 28 Q25 10, 42 28" strokeWidth="1.4" />
        <path d="M8 28 L8 85" strokeWidth="1" />
        <path d="M42 28 L42 85" strokeWidth="1" />
        {/* Voussoir stones radiating in arch */}
        <path d="M25 12 L25 18" strokeWidth="0.5" />
        <path d="M18 16 L19 22" strokeWidth="0.4" />
        <path d="M32 16 L31 22" strokeWidth="0.4" />
        {/* Keystone — carved and projecting */}
        <path d="M23 11 L23 19 L27 19 L27 11 Z" strokeWidth="0.7" />

        {/* Center arch */}
        <path d="M42 28 Q58 10, 75 28" strokeWidth="1.4" />
        <path d="M58 12 L58 18" strokeWidth="0.5" />
        <path d="M51 16 L52 22" strokeWidth="0.4" />
        <path d="M65 16 L64 22" strokeWidth="0.4" />
        <path d="M56 11 L56 19 L60 19 L60 11 Z" strokeWidth="0.7" />

        {/* Right arch */}
        <path d="M75 28 Q92 10, 92 28" strokeWidth="1.4" />
        <path d="M83 14 L83 20" strokeWidth="0.5" />
        <path d="M80 16 L81 22" strokeWidth="0.4" />
        <path d="M87 18 L86 23" strokeWidth="0.4" />
        <path d="M82 13 L82 21 L85 21 L85 13 Z" strokeWidth="0.7" />

        {/* Corinthian columns — with fluted shafts and acanthus capitals */}
        {[8, 42, 75, 92].map((x, i) => (
          <g key={`lc${i}`}>
            {/* Column shaft */}
            <path d={`M${x-3} 28 L${x-3} 85`} strokeWidth="1.2" />
            <path d={`M${x+3} 28 L${x+3} 85`} strokeWidth="1.2" />
            {/* Fluting lines */}
            <path d={`M${x-1} 32 L${x-1} 82`} strokeWidth="0.3" opacity="0.4" />
            <path d={`M${x+1} 32 L${x+1} 82`} strokeWidth="0.3" opacity="0.4" />
            {/* Entasis — slight swelling at 1/3 height */}
            <path d={`M${x-3.5} 48 Q${x-4} 55, ${x-3.5} 62`} strokeWidth="0.3" opacity="0.3" />
            <path d={`M${x+3.5} 48 Q${x+4} 55, ${x+3.5} 62`} strokeWidth="0.3" opacity="0.3" />

            {/* Corinthian capital — acanthus leaves and volutes */}
            <path d={`M${x-5} 28 L${x+5} 28`} strokeWidth="1" />
            <path d={`M${x-5} 28 L${x-6} 32 L${x+6} 32 L${x+5} 28`} strokeWidth="0.8" />
            <path d={`M${x-4} 29 Q${x-2} 27, ${x} 29 Q${x+2} 27, ${x+4} 29`} strokeWidth="0.4" opacity="0.6" />

            {/* Attic base — torus, scotia, torus */}
            <path d={`M${x-5} 85 L${x+5} 85 L${x+5} 87 L${x-5} 87 Z`} strokeWidth="0.7" />
            <path d={`M${x-4} 87 L${x+4} 87 L${x+4} 89 L${x-4} 89 Z`} strokeWidth="0.6" />
            <path d={`M${x-5} 89 L${x+5} 89 L${x+6} 92 L${x-6} 92 Z`} strokeWidth="0.8" />
          </g>
        ))}

        {/* Impost blocks at arch springs */}
        {[8, 42, 75, 92].map((x, i) => (
          <path key={`li${i}`} d={`M${x-5} 26 L${x+5} 26 L${x+5} 28 L${x-5} 28 Z`} strokeWidth="0.6" />
        ))}

        {/* Stone balustrade in first bay — turned balusters */}
        <path d="M12 72 L38 72" strokeWidth="0.9" />
        <path d="M12 82 L38 82" strokeWidth="0.9" />
        {[16, 21, 26, 31, 36].map((x, i) => (
          <g key={`lb${i}`}>
            <path d={`M${x} 72 Q${x-1} 77, ${x} 82`} strokeWidth="0.6" />
            <path d={`M${x} 72 Q${x+1} 77, ${x} 82`} strokeWidth="0.6" />
          </g>
        ))}

        {/* Coffered vault pattern visible inside arches */}
        <path d="M15 22 Q25 15, 35 22" strokeWidth="0.3" opacity="0.3" />
        <path d="M48 22 Q58 15, 68 22" strokeWidth="0.3" opacity="0.3" />
      </g>
    </g>
  </svg>
)

// 8. Marquee - Projecting canopy over theater/commercial entrance
// Architectural reference: 20th century cinema and theater architecture, typically illuminated with signage
const MarqueeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="marquee-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#marquee-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): 1920s Art Deco cinema — vertical tower, sunburst, zigzag ornament, ticket booth */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Tall vertical tower/pylon rising above roofline */}
        <path d="M42 -5 L42 15 L58 15 L58 -5 Z" />
        <path d="M44 -3 L44 12 L56 12 L56 -3 Z" strokeWidth="0.4" />
        {/* Sunburst/fan motif in tower */}
        <path d="M50 2 L46 8" strokeWidth="0.3" />
        <path d="M50 2 L50 9" strokeWidth="0.3" />
        <path d="M50 2 L54 8" strokeWidth="0.3" />
        <path d="M50 2 L44 6" strokeWidth="0.3" />
        <path d="M50 2 L56 6" strokeWidth="0.3" />
        {/* Main facade wall with stepped parapet */}
        <path d="M20 15 L20 90 L80 90 L80 15" />
        <path d="M15 18 L20 18 L20 15 L42 15" />
        <path d="M58 15 L80 15 L80 18 L85 18" />
        {/* Zigzag Deco chevron band */}
        <path d="M22 20 L26 17 L30 20 L34 17 L38 20 L42 17" strokeWidth="0.4" />
        <path d="M58 17 L62 20 L66 17 L70 20 L74 17 L78 20" strokeWidth="0.4" />
        {/* Decorative vertical pilasters with stepped capitals */}
        <path d="M20 15 L20 90" strokeWidth="0.8" />
        <path d="M80 15 L80 90" strokeWidth="0.8" />
        <path d="M22 15 L22 90" strokeWidth="0.3" />
        <path d="M78 15 L78 90" strokeWidth="0.3" />
        {/* Ticket booth */}
        <path d="M12 72 L12 88 L18 88 L18 72 Z" />
        <path d="M13 76 L17 76 L17 82 L13 82 Z" />
        <circle cx="15" cy="79" r="1.5" />
        {/* Sidewalk */}
        <path d="M5 90 L95 90" />
        <path d="M5 93 L95 93" strokeWidth="0.4" />
      </g>

      {/* PRIMARY: Art Deco cinema marquee — stepped massing, chevrons, neon, blade sign */}
      <g strokeWidth="0.8">
        {/* Vertical blade/tower sign — dominant Art Deco element rising above roofline */}
        <path d="M43 10 L43 40 L57 40 L57 10 Z" strokeWidth="1.3" />
        {/* Stepped/setback crown on blade sign */}
        <path d="M45 10 L45 6 L55 6 L55 10" strokeWidth="1" />
        <path d="M47 6 L47 3 L53 3 L53 6" strokeWidth="0.8" />
        {/* Neon border on blade sign */}
        <path d="M44 12 L44 38 L56 38 L56 12 Z" strokeWidth="0.5" opacity="0.6" />
        {/* Vertical lettering lines */}
        <path d="M48 14 L48 36" strokeWidth="0.6" opacity="0.5" />
        <path d="M50 14 L50 36" strokeWidth="0.6" opacity="0.5" />
        <path d="M52 14 L52 36" strokeWidth="0.6" opacity="0.5" />

        {/* Main canopy — deep projecting marquee with stepped fascia */}
        <path d="M12 40 L88 40 L90 46 L10 46 Z" strokeWidth="1.3" />
        {/* Stepped fascia layers — characteristic Art Deco setback profile */}
        <path d="M10 46 L10 50 L90 50 L90 46" strokeWidth="1.2" />
        <path d="M13 50 L13 53 L87 53 L87 50" strokeWidth="1" />
        <path d="M16 53 L16 55 L84 55 L84 53" strokeWidth="0.9" />

        {/* Chase light bulbs along marquee edges */}
        {[18, 24, 30, 36, 42, 50, 58, 64, 70, 76, 82].map((x, i) => (
          <circle key={`b1${i}`} cx={x} cy="48" r="1.5" strokeWidth="0.6" />
        ))}
        {/* Second row of bulbs */}
        {[20, 28, 36, 44, 52, 60, 68, 76, 84].map((x, i) => (
          <circle key={`b2${i}`} cx={x} cy="52" r="1" strokeWidth="0.5" opacity="0.7" />
        ))}

        {/* NOW SHOWING panel — illuminated letter board */}
        <path d="M20 42 L42 42 L42 45 L20 45 Z" strokeWidth="0.7" opacity="0.6" />
        <path d="M58 42 L80 42 L80 45 L58 45 Z" strokeWidth="0.7" opacity="0.6" />

        {/* Chevron/zigzag ornamental band — characteristic Art Deco motif */}
        <path d="M16 55 L20 57 L24 55 L28 57 L32 55 L36 57 L40 55 L44 57 L48 55 L52 57 L56 55 L60 57 L64 55 L68 57 L72 55 L76 57 L80 55 L84 57" strokeWidth="0.7" />

        {/* Sunburst/fan motif above entry */}
        <path d="M50 60 L42 68 M50 60 L46 70 M50 60 L50 72 M50 60 L54 70 M50 60 L58 68" strokeWidth="0.5" opacity="0.6" />
        <path d="M50 60 L40 66 M50 60 L60 66" strokeWidth="0.4" opacity="0.4" />

        {/* Fluted pilasters flanking entrance */}
        <path d="M30 55 L30 88 L34 88 L34 55 Z" strokeWidth="0.9" />
        <path d="M31 57 L31 86 M32 57 L32 86 M33 57 L33 86" strokeWidth="0.3" opacity="0.4" />
        <path d="M66 55 L66 88 L70 88 L70 55 Z" strokeWidth="0.9" />
        <path d="M67 57 L67 86 M68 57 L68 86 M69 57 L69 86" strokeWidth="0.3" opacity="0.4" />

        {/* Double entry doors with Art Deco glazing pattern */}
        <path d="M36 60 L36 88 L64 88 L64 60 Z" strokeWidth="1.1" />
        <path d="M50 60 L50 88" strokeWidth="1" />
        {/* Geometric glazing — speed lines/stepped pattern */}
        <path d="M38 64 L48 64 L48 72 L38 72 Z" strokeWidth="0.7" />
        <path d="M40 66 L46 66 L46 70 L40 70 Z" strokeWidth="0.4" />
        <path d="M52 64 L62 64 L62 72 L52 72 Z" strokeWidth="0.7" />
        <path d="M54 66 L60 66 L60 70 L54 70 Z" strokeWidth="0.4" />
        {/* Push bars */}
        <path d="M42 78 L48 78" strokeWidth="1.5" />
        <path d="M52 78 L58 78" strokeWidth="1.5" />

        {/* Neon vertical accent strips — speed lines */}
        <path d="M10 46 L10 55" strokeWidth="2.5" opacity="0.6" />
        <path d="M90 46 L90 55" strokeWidth="2.5" opacity="0.6" />

        {/* Terrazzo entry step */}
        <path d="M30 88 L70 88 L72 92 L28 92 Z" strokeWidth="0.8" />
      </g>
    </g>
  </svg>
)

// 9. Portico - Columned porch forming entrance
// Architectural reference: Classical Greek and Roman temple fronts, monumental entrance feature
const PorticoSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="portico-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#portico-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Neoclassical courthouse — central dome, symmetrical wings, grand approach */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Central dome rising behind pediment */}
        <path d="M35 5 Q50 -10, 65 5" />
        <path d="M37 5 Q50 -8, 63 5" strokeWidth="0.3" />
        {/* Dome lantern/cupola */}
        <path d="M47 -5 L47 -8 L53 -8 L53 -5" />
        <path d="M50 -8 L50 -11" />
        {/* Drum with small windows */}
        <path d="M40 2 L40 5 L60 5 L60 2 Q50 -2, 40 2" />
        {/* Main building body behind portico */}
        <path d="M25 20 L25 90 L75 90 L75 20" />
        {/* Symmetrical wing — left */}
        <path d="M-5 25 L-5 92 L25 92 L25 25 Z" />
        <path d="M0 35 L0 55 L12 55 L12 35 Z" strokeWidth="0.3" />
        <path d="M0 65 L0 85 L12 85 L12 65 Z" strokeWidth="0.3" />
        {/* Symmetrical wing — right */}
        <path d="M75 25 L75 92 L105 92 L105 25 Z" />
        <path d="M88 35 L88 55 L100 55 L100 35 Z" strokeWidth="0.3" />
        <path d="M88 65 L88 85 L100 85 L100 65 Z" strokeWidth="0.3" />
        {/* Grand approach — formal path */}
        <path d="M40 96 L35 100" strokeWidth="0.3" />
        <path d="M60 96 L65 100" strokeWidth="0.3" />
        {/* Lawn/landscape */}
        <path d="M-5 96 L105 96" strokeWidth="0.4" />
      </g>

      {/* PRIMARY: Neoclassical hexastyle portico — 6 Ionic columns, sculpted pediment, deep porch */}
      <g strokeWidth="0.8">
        {/* Triangular pediment with raking cornice */}
        <path d="M5 25 L50 5 L95 25 Z" strokeWidth="1.5" />
        {/* Inner tympanum field */}
        <path d="M12 25 L50 10 L88 25" strokeWidth="0.6" opacity="0.6" />
        {/* Sculptural relief in tympanum — central figure with flanking recumbent figures */}
        <path d="M50 14 L50 22" strokeWidth="0.6" opacity="0.5" />
        <path d="M48 16 L52 16" strokeWidth="0.5" opacity="0.5" />
        <path d="M38 22 Q40 18, 44 20" strokeWidth="0.4" opacity="0.4" />
        <path d="M62 22 Q60 18, 56 20" strokeWidth="0.4" opacity="0.4" />
        {/* Reclining river god figures at pediment corners */}
        <path d="M18 24 Q22 20, 28 23" strokeWidth="0.4" opacity="0.35" />
        <path d="M82 24 Q78 20, 72 23" strokeWidth="0.4" opacity="0.35" />
        {/* Acroteria — corner and apex ornaments */}
        <path d="M50 5 L50 2" strokeWidth="0.7" />
        <path d="M49 2 L51 2 L50 0 Z" strokeWidth="0.5" />
        <path d="M6 25 L4 23" strokeWidth="0.5" />
        <path d="M94 25 L96 23" strokeWidth="0.5" />

        {/* Cornice/geison — projecting with mutules */}
        <path d="M3 25 L97 25" strokeWidth="2" />
        {/* Raking cornice molding */}
        <path d="M5 25 L50 6" strokeWidth="0.5" opacity="0.5" />
        <path d="M95 25 L50 6" strokeWidth="0.5" opacity="0.5" />

        {/* Entablature — frieze and architrave */}
        <path d="M5 27 L95 27 L95 32 L5 32 Z" strokeWidth="1" />
        {/* Frieze — continuous band with relief inscription suggestion */}
        <path d="M10 28 L90 28" strokeWidth="0.4" opacity="0.5" />
        <path d="M10 31 L90 31" strokeWidth="0.4" opacity="0.5" />
        {/* Architrave */}
        <path d="M5 32 L95 32 L95 36 L5 36 Z" strokeWidth="0.9" />

        {/* Six Ionic columns — hexastyle arrangement */}
        {[12, 28, 42, 58, 72, 88].map((x, i) => (
          <g key={`pc${i}`}>
            {/* Column shaft with slight entasis */}
            <path d={`M${x-3} 36 L${x-3.5} 55 L${x-3} 82`} strokeWidth="1.3" />
            <path d={`M${x+3} 36 L${x+3.5} 55 L${x+3} 82`} strokeWidth="1.3" />
            {/* Fluting */}
            <path d={`M${x-1} 38 L${x-1} 80`} strokeWidth="0.3" opacity="0.35" />
            <path d={`M${x+1} 38 L${x+1} 80`} strokeWidth="0.3" opacity="0.35" />

            {/* Ionic capital — abacus, echinus, and volute scrolls */}
            <path d={`M${x-5} 36 L${x+5} 36`} strokeWidth="1.1" />
            {/* Volute scrolls */}
            <path d={`M${x-5} 38 Q${x-7} 36, ${x-7} 38 Q${x-7} 40, ${x-5} 39`} strokeWidth="0.6" />
            <path d={`M${x+5} 38 Q${x+7} 36, ${x+7} 38 Q${x+7} 40, ${x+5} 39`} strokeWidth="0.6" />
            {/* Echinus (egg-and-dart band) */}
            <path d={`M${x-4} 37 Q${x-2} 38, ${x} 37 Q${x+2} 38, ${x+4} 37`} strokeWidth="0.4" opacity="0.5" />

            {/* Attic base — torus, scotia, torus, plinth */}
            <path d={`M${x-4} 82 L${x+4} 82 L${x+5} 84 L${x-5} 84 Z`} strokeWidth="0.8" />
            <path d={`M${x-4} 84 L${x+4} 84 L${x+4} 85 L${x-4} 85 Z`} strokeWidth="0.5" />
            <path d={`M${x-5} 85 L${x+5} 85 L${x+6} 87 L${x-6} 87 Z`} strokeWidth="0.8" />
          </g>
        ))}

        {/* Three-stepped crepidoma/stylobate */}
        <path d="M2 87 L98 87" strokeWidth="1.3" />
        <path d="M0 91 L100 91" strokeWidth="1.2" />
        <path d="M-2 95 L102 95" strokeWidth="1.4" />
        {/* Step risers */}
        <path d="M2 87 L2 91 M98 87 L98 91" strokeWidth="0.5" />
        <path d="M0 91 L0 95 M100 91 L100 95" strokeWidth="0.5" />

        {/* Cella wall and door behind columns */}
        <path d="M20 36 L20 85 L80 85 L80 36" strokeWidth="0.5" opacity="0.4" />
        <path d="M42 42 L42 85 L58 85 L58 42 Q50 38, 42 42" opacity="0.5" strokeWidth="0.7" />
        <path d="M50 42 L50 85" opacity="0.4" strokeWidth="0.4" />
      </g>
    </g>
  </svg>
)

// 10. Storefront - Commercial ground floor facade system
// Architectural reference: 19th-20th century commercial architecture, maximizes display window area
const StorefrontSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="storefront-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#storefront-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): SoHo cast-iron building — ornate upper facade, fire escape, decorative brackets */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Ornate pressed-metal cornice at roofline */}
        <path d="M8 5 L92 5 L94 8 L6 8 Z" />
        <path d="M6 8 L94 8 L94 10 L6 10 Z" />
        {/* Decorative bracket pairs under cornice */}
        <path d="M15 10 Q13 13, 15 15" strokeWidth="0.4" />
        <path d="M25 10 Q23 13, 25 15" strokeWidth="0.4" />
        <path d="M75 10 Q73 13, 75 15" strokeWidth="0.4" />
        <path d="M85 10 Q83 13, 85 15" strokeWidth="0.4" />
        {/* Cast-iron upper facade with arched windows */}
        <path d="M10 10 L10 30 L90 30 L90 10" />
        {/* Arched window bays with Corinthian pilasters */}
        <path d="M15 13 L15 27 L32 27 L32 13 Q23 8, 15 13" />
        <path d="M38 13 L38 27 L55 27 L55 13 Q47 8, 38 13" />
        <path d="M62 13 L62 27 L78 27 L78 13 Q70 8, 62 13" />
        {/* Pilaster columns between bays */}
        <path d="M10 10 L10 30" strokeWidth="0.8" />
        <path d="M35 10 L35 30" strokeWidth="0.8" />
        <path d="M58 10 L58 30" strokeWidth="0.8" />
        <path d="M85 10 L85 30" strokeWidth="0.8" />
        <path d="M90 10 L90 30" strokeWidth="0.8" />
        {/* Fire escape — zigzag ladder and platform */}
        <path d="M82 14 L88 14 L88 18 L82 18 Z" strokeWidth="0.4" />
        <path d="M85 18 L85 24" strokeWidth="0.3" />
        <path d="M83 19 L87 21" strokeWidth="0.3" />
        <path d="M87 19 L83 21" strokeWidth="0.3" />
        {/* Sidewalk with tree pit */}
        <path d="M5 92 L95 92" />
        <path d="M2 92 L2 72" strokeWidth="0.4" />
        <path d="M2 72 Q-1 65, 2 60 Q5 55, 2 50" strokeWidth="0.4" opacity="0.25" />
      </g>

      {/* PRIMARY: SoHo cast-iron storefront — modular iron columns, arched transoms, wide plate glass */}
      <g strokeWidth="0.8">
        {/* Ornate cast-iron signboard cornice — pressed metal with scrolled brackets */}
        <path d="M8 28 L92 28 L92 32 L8 32 Z" strokeWidth="1.2" />
        <path d="M6 26 L94 26 L94 28 L6 28 Z" strokeWidth="1" />
        {/* Scrolled bracket supports under cornice */}
        <path d="M15 32 Q13 35, 15 38" strokeWidth="0.7" />
        <path d="M35 32 Q33 35, 35 38" strokeWidth="0.7" />
        <path d="M65 32 Q63 35, 65 38" strokeWidth="0.7" />
        <path d="M85 32 Q83 35, 85 38" strokeWidth="0.7" />
        {/* Signboard panel — painted store name */}
        <path d="M15 29 L85 29 L85 31 L15 31 Z" strokeWidth="0.5" opacity="0.6" />

        {/* Slender cast-iron Corinthian pilasters dividing bays */}
        {[10, 35, 50, 65, 90].map((x, i) => (
          <g key={`sp${i}`}>
            <path d={`M${x-1.5} 32 L${x-1.5} 88`} strokeWidth="1.2" />
            <path d={`M${x+1.5} 32 L${x+1.5} 88`} strokeWidth="1.2" />
            {/* Cast column fluting */}
            <path d={`M${x} 36 L${x} 85`} strokeWidth="0.3" opacity="0.4" />
            {/* Composite capital */}
            <path d={`M${x-3} 32 L${x+3} 32 L${x+3} 35 L${x-3} 35 Z`} strokeWidth="0.6" />
            <path d={`M${x-2} 33 Q${x} 31, ${x+2} 33`} strokeWidth="0.3" opacity="0.5" />
            {/* Base */}
            <path d={`M${x-2} 86 L${x+2} 86 L${x+2} 88 L${x-2} 88 Z`} strokeWidth="0.5" />
          </g>
        ))}

        {/* Large plate-glass display windows — unusually wide for the era */}
        {/* Left bay */}
        <path d="M12 38 L12 82 L33 82 L33 38 Z" strokeWidth="1" />
        {/* Segmental arch transom */}
        <path d="M12 38 Q22 32, 33 38" strokeWidth="0.9" />
        <path d="M22 34 L22 38" strokeWidth="0.4" />
        {/* Display glass */}
        <path d="M14 42 L14 80 L31 80 L31 42 Z" strokeWidth="0.5" />

        {/* Right bay */}
        <path d="M37 38 L37 82 L48 82 L48 38 Z" strokeWidth="1" />
        <path d="M37 38 Q42 34, 48 38" strokeWidth="0.9" />

        {/* Center entry — recessed with tiled floor */}
        <path d="M52 38 L52 88 L63 88 L63 38 Z" strokeWidth="1" />
        <path d="M52 38 Q57 34, 63 38" strokeWidth="0.9" />
        {/* Entry door */}
        <path d="M54 48 L54 88 L61 88 L61 48 Z" strokeWidth="0.9" />
        <path d="M57 48 L57 88" strokeWidth="0.6" />
        <circle cx="59" cy="70" r="1.5" strokeWidth="0.6" />
        {/* Tiled entry floor */}
        <path d="M52 86 L63 86" strokeWidth="0.3" opacity="0.4" />
        <path d="M52 84 L63 84" strokeWidth="0.3" opacity="0.4" />

        {/* Right display bay */}
        <path d="M67 38 L67 82 L88 82 L88 38 Z" strokeWidth="1" />
        <path d="M67 38 Q77 32, 88 38" strokeWidth="0.9" />
        <path d="M77 34 L77 38" strokeWidth="0.4" />
        <path d="M69 42 L69 80 L86 80 L86 42 Z" strokeWidth="0.5" />

        {/* Cast-iron bulkhead/kickplates — paneled */}
        <path d="M12 82 L33 82 L33 88 L12 88 Z" strokeWidth="0.9" />
        <path d="M14 83 L14 87 L22 87 L22 83 Z" strokeWidth="0.4" opacity="0.5" />
        <path d="M24 83 L24 87 L31 87 L31 83 Z" strokeWidth="0.4" opacity="0.5" />
        <path d="M67 82 L88 82 L88 88 L67 88 Z" strokeWidth="0.9" />
        <path d="M69 83 L69 87 L77 87 L77 83 Z" strokeWidth="0.4" opacity="0.5" />
        <path d="M79 83 L79 87 L86 87 L86 83 Z" strokeWidth="0.4" opacity="0.5" />

        {/* Sidewalk/threshold */}
        <path d="M5 88 L95 88" strokeWidth="1.5" />

        {/* Display merchandise silhouettes */}
        <path d="M18 70 L22 64 L26 70 Z" opacity="0.4" strokeWidth="0.5" />
        <path d="M72 68 L76 62 L80 68 Z" opacity="0.4" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

// 11. Veranda - Roofed open gallery along building exterior
// Architectural reference: Colonial and vernacular architecture, provides shaded outdoor living space
const VerandaSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="veranda-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#veranda-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Southern antebellum plantation — hip roof, dormers, shutters, live oak */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Hip roof with wide overhang */}
        <path d="M20 8 L50 0 L80 8 L95 15 L5 15 Z" />
        {/* Central dormer with arched window */}
        <path d="M44 5 L44 12 L56 12 L56 5 Q50 1, 44 5" />
        <path d="M48 6 L48 11 L52 11 L52 6" strokeWidth="0.3" />
        {/* Chimney */}
        <path d="M78 2 L78 -3 L82 -3 L82 2" />
        {/* Main house wall — double-height with tall windows */}
        <path d="M25 15 L25 90 L75 90 L75 15" />
        {/* Upper windows with louvered shutters */}
        <path d="M30 20 L30 38 L43 38 L43 20 Z" />
        <path d="M27 20 L30 20 L30 38 L27 38 Z" strokeWidth="0.3" />
        <path d="M43 20 L46 20 L46 38 L43 38 Z" strokeWidth="0.3" />
        <path d="M28 24 L29 24" strokeWidth="0.2" />
        <path d="M28 28 L29 28" strokeWidth="0.2" />
        <path d="M28 32 L29 32" strokeWidth="0.2" />
        <path d="M57 20 L57 38 L70 38 L70 20 Z" />
        <path d="M54 20 L57 20 L57 38 L54 38 Z" strokeWidth="0.3" />
        <path d="M70 20 L73 20 L73 38 L70 38 Z" strokeWidth="0.3" />
        {/* Lower windows */}
        <path d="M30 50 L30 68 L43 68 L43 50 Z" />
        <path d="M57 50 L57 68 L70 68 L70 50 Z" />
        {/* Live oak tree silhouette to the side */}
        <path d="M-5 92 L-5 55" strokeWidth="0.5" opacity="0.25" />
        <path d="M-5 55 Q-15 40, -5 35 Q5 30, -2 25 Q-10 20, 0 18 Q10 15, 5 20 Q15 25, 10 30" strokeWidth="0.5" opacity="0.2" />
        {/* Hanging moss suggestion */}
        <path d="M0 30 L-2 38" strokeWidth="0.2" opacity="0.15" />
        <path d="M5 28 L3 36" strokeWidth="0.2" opacity="0.15" />
        {/* Ground/lawn */}
        <path d="M-10 92 L110 92" />
      </g>

      {/* PRIMARY: Southern antebellum gallery — tall classical columns, wrap-around, ceiling fans */}
      <g strokeWidth="0.8">
        {/* Hipped gallery roof with wide overhang */}
        <path d="M2 22 L50 12 L98 22 L98 30 L2 30 Z" strokeWidth="1.2" />
        {/* Roof depth/soffit */}
        <path d="M2 30 L98 30" strokeWidth="1.4" />
        {/* Exposed rafter tails at eave */}
        {[8, 18, 28, 38, 48, 58, 68, 78, 88].map((x, i) => (
          <path key={`vr${i}`} d={`M${x} 26 L${x} 30`} strokeWidth="0.5" opacity="0.5" />
        ))}

        {/* Six tall classical columns — full-height Doric order */}
        {[8, 24, 40, 60, 76, 92].map((x, i) => (
          <g key={`vc${i}`}>
            {/* Column shaft — tapered with entasis */}
            <path d={`M${x-2.5} 30 L${x-2} 55 L${x-2.5} 82`} strokeWidth="1.5" />
            <path d={`M${x+2.5} 30 L${x+2} 55 L${x+2.5} 82`} strokeWidth="1.5" />
            {/* Fluting suggestion */}
            <path d={`M${x} 33 L${x} 80`} strokeWidth="0.3" opacity="0.3" />
            {/* Simple Doric capital — echinus and abacus */}
            <path d={`M${x-4} 30 L${x+4} 30`} strokeWidth="1" />
            <path d={`M${x-3.5} 31 Q${x} 33, ${x+3.5} 31`} strokeWidth="0.5" opacity="0.5" />
            {/* Column base */}
            <path d={`M${x-3} 82 L${x+3} 82 L${x+4} 84 L${x-4} 84 Z`} strokeWidth="0.8" />
          </g>
        ))}

        {/* Upper gallery railing — classical balustrade between columns */}
        <path d="M8 64 L92 64" strokeWidth="1" />
        <path d="M8 80 L92 80" strokeWidth="1" />
        {/* Turned wooden balusters */}
        {[12, 16, 20, 28, 32, 36, 44, 48, 52, 56, 64, 68, 72, 80, 84, 88].map((x, i) => (
          <g key={`vb${i}`}>
            <path d={`M${x} 64 L${x} 66`} strokeWidth="0.8" />
            <path d={`M${x} 66 Q${x-0.8} 72, ${x} 78`} strokeWidth="0.6" />
            <path d={`M${x} 78 L${x} 80`} strokeWidth="0.8" />
          </g>
        ))}

        {/* Gallery floor — wide plank decking */}
        <path d="M2 84 L98 84" strokeWidth="1.5" />
        {/* Plank lines */}
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x, i) => (
          <path key={`vp${i}`} d={`M${x} 82 L${x} 84`} strokeWidth="0.3" opacity="0.4" />
        ))}

        {/* Ceiling fan suggestion between columns */}
        <path d="M32 30 L28 32 M32 30 L36 32 M32 30 L32 33" strokeWidth="0.4" opacity="0.4" />
        <circle cx="32" cy="30" r="1" strokeWidth="0.4" opacity="0.4" />
        <path d="M68 30 L64 32 M68 30 L72 32 M68 30 L68 33" strokeWidth="0.4" opacity="0.4" />
        <circle cx="68" cy="30" r="1" strokeWidth="0.4" opacity="0.4" />

        {/* Central entry — double doors with sidelights and fanlight transom */}
        {/* Fanlight transom above door */}
        <path d="M38 42 Q50 35, 62 42 L62 48 L38 48 Z" strokeWidth="0.9" />
        <path d="M50 37 L50 48" strokeWidth="0.4" />
        <path d="M50 37 L42 46" strokeWidth="0.3" />
        <path d="M50 37 L58 46" strokeWidth="0.3" />
        {/* Door frame */}
        <path d="M38 42 L38 84 L62 84 L62 42" strokeWidth="1" />
        {/* Double doors */}
        <path d="M40 48 L40 82 L50 82 L50 48 Z" strokeWidth="0.8" />
        <path d="M50 48 L50 82 L60 82 L60 48 Z" strokeWidth="0.8" />
        {/* Door panels */}
        <path d="M42 52 L42 62 L48 62 L48 52 Z" strokeWidth="0.4" />
        <path d="M42 66 L42 80 L48 80 L48 66 Z" strokeWidth="0.4" />
        <path d="M52 52 L52 62 L58 62 L58 52 Z" strokeWidth="0.4" />
        <path d="M52 66 L52 80 L58 80 L58 66 Z" strokeWidth="0.4" />
        {/* Door hardware */}
        <circle cx="48" cy="68" r="1.2" strokeWidth="0.6" />
        <circle cx="52" cy="68" r="1.2" strokeWidth="0.6" />
        {/* Sidelights */}
        <path d="M34 48 L34 82 L38 82 L38 48 Z" strokeWidth="0.7" />
        <path d="M62 48 L62 82 L66 82 L66 48 Z" strokeWidth="0.7" />
        <path d="M34 60 L38 60 M34 72 L38 72" strokeWidth="0.4" />
        <path d="M62 60 L66 60 M62 72 L66 72" strokeWidth="0.4" />

        {/* Grand entry steps — full width, stone treads */}
        <path d="M2 84 L98 84 L100 88 L0 88 Z" strokeWidth="0.9" />
        <path d="M0 88 L100 88 L102 92 L-2 92 Z" strokeWidth="0.8" />
        <path d="M-2 92 L102 92 L104 96 L-4 96 Z" strokeWidth="0.7" />
      </g>
    </g>
  </svg>
)

// Export mapping for all facade elements
export const FACADE_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'awning': AwningSVG,
  'bay-window': BayWindowSVG,
  'canopy': CanopySVG,
  'cornice': CorniceSVG,
  'entablature': EntablatureSVG,
  'facade': FacadeSVG,
  'loggia': LoggiaSVG,
  'marquee': MarqueeSVG,
  'portico': PorticoSVG,
  'storefront': StorefrontSVG,
  'veranda': VerandaSVG,
}

export {
  AwningSVG,
  BayWindowSVG,
  CanopySVG,
  CorniceSVG,
  EntablatureSVG,
  FacadeSVG,
  LoggiaSVG,
  MarqueeSVG,
  PorticoSVG,
  StorefrontSVG,
  VerandaSVG,
}
