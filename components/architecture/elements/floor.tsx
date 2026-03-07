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

/**
 * ACCESSIBILITY RAMP - ADA-compliant wheelchair ramp with handrails
 * 3D PERSPECTIVE: Side view showing gentle slope and safety rails
 * Shows: Gradual incline, double handrails, non-slip surface, landing
 * Distinct: Long gentle slope (1:12 ratio), continuous handrails both sides
 */
const AccessibilityRampSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="ramp-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#ramp-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Building entrance and ground */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M85 25 L95 25 L95 75 L85 75" />
        <path d="M88 30 L92 30 L92 45 L88 45" />
        <path d="M0 75 L15 75" />
      </g>

      {/* PRIMARY - Ramp structure with 3D perspective */}
      <g strokeWidth="1.2">
        {/* Ramp surface - sloped plane */}
        <path d="M10 72 L85 35 L85 42 L10 78 Z" strokeWidth="1.8" />

        {/* Non-slip texture lines on ramp surface */}
        <path d="M20 70 L25 67" strokeWidth="0.5" opacity="0.4" />
        <path d="M35 63 L40 60" strokeWidth="0.5" opacity="0.4" />
        <path d="M50 56 L55 53" strokeWidth="0.5" opacity="0.4" />
        <path d="M65 49 L70 46" strokeWidth="0.5" opacity="0.4" />

        {/* Top landing platform */}
        <path d="M85 35 L95 35 L95 42 L85 42" strokeWidth="1.5" />

        {/* Bottom landing */}
        <path d="M5 72 L10 72 L10 78 L5 78 Z" strokeWidth="1.5" />

        {/* Upper handrail - left side */}
        <path d="M12 62 L87 25" strokeWidth="1.8" />
        {/* Handrail posts left */}
        <path d="M12 62 L12 70" strokeWidth="1.3" />
        <path d="M30 54 L30 62" strokeWidth="1.3" />
        <path d="M50 45 L50 53" strokeWidth="1.3" />
        <path d="M70 36 L70 44" strokeWidth="1.3" />
        <path d="M87 25 L87 35" strokeWidth="1.3" />

        {/* Lower handrail - left side (ADA requires two heights) */}
        <path d="M12 66 L87 29" strokeWidth="1.2" />

        {/* Upper handrail - right side */}
        <path d="M12 82 L87 45" strokeWidth="1.8" />
        {/* Handrail posts right */}
        <path d="M12 78 L12 86" strokeWidth="1.3" />
        <path d="M30 70 L30 78" strokeWidth="1.3" />
        <path d="M50 61 L50 69" strokeWidth="1.3" />
        <path d="M70 52 L70 60" strokeWidth="1.3" />
        <path d="M87 42 L87 50" strokeWidth="1.3" />

        {/* Lower handrail - right side */}
        <path d="M12 84 L87 47" strokeWidth="1.2" />

        {/* Edge protection / curb */}
        <path d="M10 72 L85 35" strokeWidth="0.8" />
        <path d="M10 78 L85 42" strokeWidth="0.8" />

        {/* Handrail end extensions (safety requirement) */}
        <path d="M87 25 L92 25" strokeWidth="1.5" />
        <path d="M87 45 L92 45" strokeWidth="1.5" />
        <path d="M5 62 L12 62" strokeWidth="1.5" />
        <path d="M5 82 L12 82" strokeWidth="1.5" />
      </g>
    </g>
  </svg>
)

/**
 * BALUSTER - Individual turned spindle in balustrade
 * 3D PERSPECTIVE: Three-quarter view showing turned profile
 * Shows: Vase-shaped turned wood/stone with decorative rings
 * Distinct: Vertical spindle with bulging middle, ornate turnings
 */
const BalusterSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="baluster-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#baluster-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Adjacent balusters and rail */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M15 10 L15 15 L85 15 L85 10" />
        <path d="M15 85 L85 85" />
        <path d="M20 15 Q22 45, 20 50 Q18 55, 20 85" />
        <path d="M80 15 Q78 45, 80 50 Q82 55, 80 85" />
      </g>

      {/* PRIMARY - Central baluster with 3D turned profile */}
      <g strokeWidth="1.2">
        {/* Top block (under rail) */}
        <path d="M42 12 L58 12 L58 18 L42 18 Z" strokeWidth="1.5" />
        <path d="M44 18 L56 18 L56 22 L44 22 Z" strokeWidth="1.3" />

        {/* Neck ring */}
        <ellipse cx="50" cy="24" rx="8" ry="2" strokeWidth="1.3" />

        {/* Upper taper */}
        <path d="M42 24 Q40 30, 42 36" strokeWidth="1.5" />
        <path d="M58 24 Q60 30, 58 36" strokeWidth="1.5" />

        {/* Upper ring detail */}
        <ellipse cx="50" cy="36" rx="10" ry="2.5" strokeWidth="1.2" />

        {/* Main vase/belly section - the distinctive bulge */}
        <path d="M40 36 Q32 50, 40 60" strokeWidth="1.8" />
        <path d="M60 36 Q68 50, 60 60" strokeWidth="1.8" />

        {/* Center bulge highlight */}
        <path d="M38 48 Q35 50, 38 52" strokeWidth="0.8" opacity="0.5" />

        {/* Middle ring */}
        <ellipse cx="50" cy="50" rx="14" ry="3" strokeWidth="1" opacity="0.6" />

        {/* Lower ring detail */}
        <ellipse cx="50" cy="60" rx="10" ry="2.5" strokeWidth="1.2" />

        {/* Lower taper */}
        <path d="M40 60 Q38 68, 42 76" strokeWidth="1.5" />
        <path d="M60 60 Q62 68, 58 76" strokeWidth="1.5" />

        {/* Base ring */}
        <ellipse cx="50" cy="76" rx="8" ry="2" strokeWidth="1.3" />

        {/* Bottom block (on rail/floor) */}
        <path d="M44 76 L56 76 L56 80 L44 80 Z" strokeWidth="1.3" />
        <path d="M42 80 L58 80 L58 88 L42 88 Z" strokeWidth="1.5" />

        {/* Shadow line on turning */}
        <path d="M55 40 L57 45 L55 55 L57 58" strokeWidth="0.6" opacity="0.4" />
      </g>
    </g>
  </svg>
)

/**
 * CANTILEVERED STAIR - Floating stairs projecting from wall
 * 3D PERSPECTIVE: Side view showing treads floating from wall
 * Shows: Treads embedded in wall with no visible support below
 * Distinct: Modern minimalist, dramatic floating effect
 */
const CantileveredStairSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="cantilever-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#cantilever-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT FAR: Room beyond wall and upper floor */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        {/* Upper floor level outline */}
        <path d="M5 5 L88 5" />
        {/* Floor level at bottom */}
        <path d="M5 95 L88 95" />
        {/* Room behind the wall */}
        <path d="M96 5 L100 5 L100 95 L96 95" />
        {/* Furniture in room beyond - table outline */}
        <path d="M97 40 L100 40 L100 55 L97 55" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
      </g>

      {/* CONTEXT NEAR: Wall thickness, floor lines, glass balustrade base */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Wall surface and thickness */}
        <path d="M90 5 L90 95" />
        <path d="M92 10 L92 90" />
        <path d="M95 5 L95 95" />
        {/* Floor plane at bottom */}
        <path d="M5 92 L88 92" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Upper landing/floor connection */}
        <path d="M5 8 L88 8" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Side wall at left edge */}
        <path d="M8 5 L8 95" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Window reveal in left wall */}
        <path d="M5 30 L8 30 L8 50 L5 50" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY - Cantilevered treads floating from wall */}
      <g strokeWidth="1.2">
        {/* Tread 1 - Bottom (closest, largest) */}
        <path d="M20 88 L88 88 L90 85 L90 82 L88 82 L22 82 Z" strokeWidth="1.8" />
        <path d="M20 88 L20 82 L22 82" strokeWidth="1.5" />
        {/* Tread thickness shadow */}
        <path d="M25 85 L85 85" strokeWidth="0.6" opacity="0.4" />

        {/* Tread 2 */}
        <path d="M25 74 L88 74 L90 71 L90 68 L88 68 L27 68 Z" strokeWidth="1.7" />
        <path d="M25 74 L25 68 L27 68" strokeWidth="1.4" />
        <path d="M30 71 L85 71" strokeWidth="0.6" opacity="0.4" />

        {/* Tread 3 */}
        <path d="M30 60 L88 60 L90 57 L90 54 L88 54 L32 54 Z" strokeWidth="1.6" />
        <path d="M30 60 L30 54 L32 54" strokeWidth="1.3" />
        <path d="M35 57 L85 57" strokeWidth="0.5" opacity="0.4" />

        {/* Tread 4 */}
        <path d="M35 46 L88 46 L90 43 L90 40 L88 40 L37 40 Z" strokeWidth="1.5" />
        <path d="M35 46 L35 40 L37 40" strokeWidth="1.2" />
        <path d="M40 43 L85 43" strokeWidth="0.5" opacity="0.4" />

        {/* Tread 5 */}
        <path d="M40 32 L88 32 L90 29 L90 26 L88 26 L42 26 Z" strokeWidth="1.4" />
        <path d="M40 32 L40 26 L42 26" strokeWidth="1.1" />

        {/* Tread 6 - Top (farthest, smallest) */}
        <path d="M45 18 L88 18 L90 15 L90 12 L88 12 L47 12 Z" strokeWidth="1.3" />
        <path d="M45 18 L45 12 L47 12" strokeWidth="1" />

        {/* Glass balustrade (minimal) */}
        <path d="M20 82 L20 10" strokeWidth={S.D.strokeWidth} strokeDasharray="4 2" opacity={S.D.opacity} />
        <path d="M20 10 L90 10" strokeWidth="1.5" />

        {/* Hidden steel insert suggestion in wall */}
        <path d="M88 85 L94 85" strokeWidth="0.5" opacity="0.3" />
        <path d="M88 71 L94 71" strokeWidth="0.5" opacity="0.3" />
        <path d="M88 57 L94 57" strokeWidth="0.5" opacity="0.3" />
      </g>
    </g>
  </svg>
)

/**
 * FLAGSTONE - Irregular flat stone paving
 * 3D PERSPECTIVE: Looking down at garden path with natural stones
 * Shows: Irregular polygon shapes fitted together, moss in gaps
 * Distinct: Organic shapes, varied sizes, natural random pattern
 */
const FlagstoneSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="flagstone-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#flagstone-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (far): Garden border plants */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        <path d="M5 20 Q10 15, 15 20 Q20 25, 15 30" />
        <path d="M85 15 Q90 10, 95 18" />
        <path d="M3 70 Q8 65, 10 72" />
        <path d="M90 75 Q95 70, 97 78" />
      </g>

      {/* PRIMARY - Flagstone pavers in 3D perspective */}
      <g strokeWidth="1.2">
        {/* Large irregular flagstones - each unique shape */}

        {/* Stone 1 - large pentagon */}
        <path d="M10 15 L30 12 L38 25 L32 40 L15 35 Z" strokeWidth="1.5" />
        <path d="M18 22 L28 28" strokeWidth="0.5" opacity="0.4" />

        {/* Stone 2 - irregular quad */}
        <path d="M32 12 L55 8 L58 22 L40 28 Z" strokeWidth="1.5" />
        <path d="M42 15 L52 18" strokeWidth="0.5" opacity="0.4" />

        {/* Stone 3 - hexagon-ish */}
        <path d="M57 10 L78 12 L85 28 L80 38 L60 35 L55 22 Z" strokeWidth="1.5" />
        <path d="M65 20 L75 25" strokeWidth="0.5" opacity="0.4" />

        {/* Stone 4 - large irregular */}
        <path d="M8 38 L28 42 L35 58 L25 70 L10 65 Z" strokeWidth="1.6" />
        <path d="M15 50 L25 55" strokeWidth="0.5" opacity="0.4" />

        {/* Stone 5 - center stone */}
        <path d="M32 42 L55 38 L62 52 L58 68 L38 72 L28 60 Z" strokeWidth="1.7" />
        <path d="M40 52 L52 55" strokeWidth="0.6" opacity="0.4" />

        {/* Stone 6 - right side */}
        <path d="M60 38 L82 35 L90 50 L88 65 L65 68 L58 55 Z" strokeWidth="1.5" />
        <path d="M70 48 L80 52" strokeWidth="0.5" opacity="0.4" />

        {/* Stone 7 - bottom left */}
        <path d="M5 68 L22 72 L28 88 L12 92 L3 82 Z" strokeWidth="1.5" />

        {/* Stone 8 - bottom center */}
        <path d="M25 74 L55 70 L60 85 L52 95 L30 92 Z" strokeWidth="1.6" />
        <path d="M35 80 L48 82" strokeWidth="0.5" opacity="0.4" />

        {/* Stone 9 - bottom right */}
        <path d="M58 70 L85 68 L92 82 L88 95 L62 90 Z" strokeWidth="1.5" />

        {/* Moss/plants in gaps */}
        <path d="M30 40 Q32 38, 34 40" strokeWidth="0.6" opacity="0.5" />
        <path d="M56 36 Q58 34, 60 36" strokeWidth="0.6" opacity="0.5" />
        <path d="M26 70 Q28 68, 30 70" strokeWidth="0.6" opacity="0.5" />
        <path d="M57 68 Q59 66, 61 68" strokeWidth="0.6" opacity="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * GRAND STAIRCASE - Monumental ceremonial staircase
 * 3D PERSPECTIVE: Looking up at sweeping double staircase
 * Shows: Wide treads, ornate balustrade, central landing, newel posts
 * Distinct: Opera house grandeur, sweeping curves, dramatic scale
 */
const GrandStaircaseSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="grand-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#grand-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Upper gallery and chandelier */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M20 5 L80 5 L80 15 L20 15 Z" />
        <path d="M50 5 L50 0" />
        <ellipse cx="50" cy="25" rx="8" ry="3" />
        <path d="M47 25 L47 28" />
        <path d="M53 25 L53 28" />
      </g>

      {/* PRIMARY - Grand sweeping double staircase */}
      <g strokeWidth="1.2">
        {/* Upper landing / gallery level */}
        <path d="M15 18 L85 18 L88 22 L12 22 Z" strokeWidth="1.8" />

        {/* Left stair flight - sweeping curve descending with stepped profile */}
        <path d="M12 22 Q8 32, 5 45 Q4 58, 5 70 L5 95 L35 95 L35 65" strokeWidth="1.5" />
        {/* Left treads - stepped profile connecting to stair curve */}
        <path d="M12 22 L12 28 L28 28 L28 22" strokeWidth="1" />
        <path d="M10 28 L10 35 L26 35 L26 28" strokeWidth="1" />
        <path d="M8 35 L8 42 L24 42 L24 35" strokeWidth="1" />
        <path d="M6 42 L6 50 L22 50 L22 42" strokeWidth="0.9" />
        <path d="M5 50 L5 58 L20 58 L20 50" strokeWidth="0.9" />
        <path d="M5 58 L5 66 L18 66 L18 58" strokeWidth="0.9" />
        <path d="M5 66 L5 74 L16 74 L16 66" strokeWidth="0.8" />

        {/* Right stair flight - sweeping curve descending with stepped profile */}
        <path d="M88 22 Q92 32, 95 45 Q96 58, 95 70 L95 95 L65 95 L65 65" strokeWidth="1.5" />
        {/* Right treads */}
        <path d="M88 22 L88 28 L72 28 L72 22" strokeWidth="1" />
        <path d="M90 28 L90 35 L74 35 L74 28" strokeWidth="1" />
        <path d="M92 35 L92 42 L76 42 L76 35" strokeWidth="1" />
        <path d="M94 42 L94 50 L78 50 L78 42" strokeWidth="0.9" />
        <path d="M95 50 L95 58 L80 58 L80 50" strokeWidth="0.9" />
        <path d="M95 58 L95 66 L82 66 L82 58" strokeWidth="0.9" />
        <path d="M95 66 L95 74 L84 74 L84 66" strokeWidth="0.8" />

        {/* Central landing platform */}
        <path d="M35 65 L65 65 L65 95 L35 95 Z" strokeWidth="1.6" />
        <path d="M40 75 L60 75 L60 90 L40 90 Z" strokeWidth="0.8" opacity="0.4" />

        {/* Sweeping balustrade rails */}
        <path d="M12 15 Q8 28, 5 42 Q4 55, 5 65" strokeWidth="1.8" />
        <path d="M35 65 L35 95" strokeWidth="1.5" />
        <path d="M88 15 Q92 28, 95 42 Q96 55, 95 65" strokeWidth="1.8" />
        <path d="M65 65 L65 95" strokeWidth="1.5" />

        {/* Newel posts */}
        <circle cx="12" cy="15" r="3" strokeWidth="1.5" />
        <circle cx="88" cy="15" r="3" strokeWidth="1.5" />
        <circle cx="35" cy="65" r="2.5" strokeWidth="1.3" />
        <circle cx="65" cy="65" r="2.5" strokeWidth="1.3" />

        {/* Balusters */}
        <path d="M10 22 Q7 30, 6 38" strokeWidth="0.7" />
        <path d="M8 30 Q6 38, 5 46" strokeWidth="0.7" />
        <path d="M90 22 Q93 30, 94 38" strokeWidth="0.7" />
        <path d="M92 30 Q94 38, 95 46" strokeWidth="0.7" />

        {/* DETAIL: Carpet runner */}
        <path d="M18 22 Q14 32, 12 48" strokeWidth={S.D.strokeWidthFine} strokeDasharray={S.E.dash} opacity={S.D.opacitySubtle} />
        <path d="M82 22 Q86 32, 88 48" strokeWidth={S.D.strokeWidthFine} strokeDasharray={S.E.dash} opacity={S.D.opacitySubtle} />
      </g>
    </g>
  </svg>
)

/**
 * HANDRAIL - Graspable rail along stairs or ramps
 * 3D PERSPECTIVE: Close-up profile view showing rail and brackets
 * Shows: Rounded profile, wall brackets, continuous rail
 * Distinct: Ergonomic grip shape, regular bracket spacing
 */
const HandrailSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="handrail-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#handrail-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT FAR: Stairwell and adjacent landing */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        {/* Stair flight suggestion below */}
        <path d="M5 95 L75 95" />
        <path d="M10 92 L70 92" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        {/* Upper landing beyond */}
        <path d="M5 5 L75 5" />
        {/* Opposite wall far side of stairwell */}
        <path d="M5 5 L5 95" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
      </g>

      {/* CONTEXT NEAR: Wall surface, stair treads, baseboard */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Wall surface */}
        <path d="M95 5 L95 95" />
        <path d="M92 10 L92 90" />
        {/* Wall thickness */}
        <path d="M97 5 L97 95" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Stair tread edges below the rail */}
        <path d="M10 20 L80 20" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M10 28 L80 28" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Baseboard along wall */}
        <path d="M92 92 L92 95 L95 95" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Light switch plate on wall */}
        <path d="M93 50 L95 50 L95 56 L93 56 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY - Handrail with brackets in perspective */}
      <g strokeWidth="1.2">
        {/* Main rail - rounded profile shown in 3D */}
        <path d="M5 40 L75 40" strokeWidth="3" />
        <path d="M5 44 L75 44" strokeWidth="2" />
        <path d="M5 40 Q3 42, 5 44" strokeWidth="1.5" />
        <path d="M75 40 Q77 42, 75 44" strokeWidth="1.5" />

        {/* Rail profile cross-section detail (showing it's rounded) */}
        <ellipse cx="10" cy="42" rx="2" ry="3" strokeWidth="1" opacity="0.6" />

        {/* Bracket 1 - closest */}
        <path d="M20 44 L20 55 L25 60 L30 60 L30 55" strokeWidth="1.8" />
        <path d="M25 60 L25 70" strokeWidth="1.5" />
        <path d="M22 70 L28 70 L28 75 L22 75 Z" strokeWidth="1.3" />
        <path d="M25 75 L25 90" strokeWidth="1.2" />
        {/* Wall plate */}
        <path d="M20 85 L30 85 L30 95 L20 95 Z" strokeWidth="1.5" />
        <circle cx="25" cy="90" r="1.5" strokeWidth="0.8" />

        {/* Bracket 2 - middle */}
        <path d="M45 44 L45 55 L50 60 L55 60 L55 55" strokeWidth="1.6" />
        <path d="M50 60 L50 70" strokeWidth="1.4" />
        <path d="M47 70 L53 70 L53 75 L47 75 Z" strokeWidth="1.2" />
        <path d="M50 75 L50 90" strokeWidth="1.1" />
        <path d="M45 85 L55 85 L55 95 L45 95 Z" strokeWidth="1.4" />
        <circle cx="50" cy="90" r="1.5" strokeWidth="0.8" />

        {/* Bracket 3 - farthest */}
        <path d="M70 44 L70 55 L73 58 L76 58 L76 55" strokeWidth="1.4" />
        <path d="M73 58 L73 68" strokeWidth="1.2" />
        <path d="M71 68 L75 68 L75 72 L71 72 Z" strokeWidth="1" />
        <path d="M73 72 L73 88" strokeWidth="1" />
        <path d="M69 85 L77 85 L77 95 L69 95 Z" strokeWidth="1.2" />

        {/* Returns at ends (safety feature) */}
        <path d="M5 40 L5 50 L8 55" strokeWidth="2" />
        <path d="M5 44 L5 52" strokeWidth="1.5" />

        {/* Grip texture indication */}
        <path d="M15 41 L15 43" strokeWidth="0.5" opacity="0.4" />
        <path d="M35 41 L35 43" strokeWidth="0.5" opacity="0.4" />
        <path d="M60 41 L60 43" strokeWidth="0.5" opacity="0.4" />
      </g>
    </g>
  </svg>
)

/**
 * HELICAL RAMP - Continuous spiral ramp (Guggenheim style)
 * 3D PERSPECTIVE: Looking up into spiraling ramp from below
 * Shows: Continuous ribbon spiraling upward, gallery space
 * Distinct: Smooth continuous spiral, no steps, dramatic void
 */
const HelicalRampSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="helical-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#helical-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (far): Skylight at top */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        <circle cx="50" cy="50" r="8" />
        <path d="M45 50 L55 50" />
        <path d="M50 45 L50 55" />
      </g>

      {/* PRIMARY - Helical ramp spiraling upward (Guggenheim-style plan view) */}
      <g strokeWidth="1.2">
        {/* Outer wall of spiral */}
        <circle cx="50" cy="50" r="45" strokeWidth="1.8" />

        {/* Inner edge of ramp (central void) */}
        <circle cx="50" cy="50" r="15" strokeWidth="1.5" />

        {/* Continuous spiral ramp - outer edge ascending clockwise */}
        {/* One continuous path spiraling from bottom entry to top */}
        <path d="M50 95 Q95 92, 95 50 Q95 8, 50 5 Q5 8, 5 50 Q5 88, 45 90"
              strokeWidth="2.2" />
        {/* Continue spiral inward (second revolution, slightly tighter) */}
        <path d="M45 90 Q82 85, 85 50 Q85 18, 50 15 Q18 18, 15 50 Q15 78, 42 80"
              strokeWidth="1.8" />
        {/* Third revolution approaching center */}
        <path d="M42 80 Q68 76, 72 50 Q72 28, 50 25 Q30 28, 28 50 Q28 68, 40 70"
              strokeWidth="1.4" opacity="0.8" />

        {/* Inner edge of ramp (parallel to outer, showing ramp width) */}
        <path d="M50 80 Q80 78, 80 50 Q80 22, 50 20 Q20 22, 20 50 Q20 75, 42 76"
              strokeWidth="1" opacity="0.6" />
        <path d="M42 76 Q62 72, 65 50 Q65 32, 50 30 Q35 32, 35 50 Q35 65, 42 66"
              strokeWidth="0.8" opacity="0.5" />

        {/* Entry point at ground level */}
        <path d="M50 95 L50 80" strokeWidth="1.5" opacity="0.7" />

        {/* Direction of ascent arrow */}
        <path d="M88 58 Q90 50, 88 42" strokeWidth="0.8" opacity="0.6" />
        <path d="M86 44 L88 42 L90 44" strokeWidth="0.7" opacity="0.6" />

        {/* People suggestion on ramp (scale) */}
        <path d="M75 70 L75 67 L76 65 L75 67 L74 65" strokeWidth="0.5" opacity="0.3" />
        <path d="M30 40 L30 37 L31 35 L30 37 L29 35" strokeWidth="0.5" opacity="0.3" />
      </g>
    </g>
  </svg>
)

/**
 * LANDING - Platform between stair flights
 * 3D PERSPECTIVE: Corner view of intermediate landing
 * Shows: Flat platform where stairs turn, balustrade continuing
 * Distinct: Horizontal rest area, often quarter or half turn
 */
const LandingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="landing-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#landing-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Walls at corner */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 5 L5 45" />
        <path d="M5 5 L45 5" />
        <path d="M8 10 L8 42" />
        <path d="M10 8 L42 8" />
      </g>

      {/* PRIMARY - Landing platform with stairs */}
      <g strokeWidth="1.2">
        {/* Landing platform surface */}
        <path d="M15 45 L55 45 L55 55 L45 55 L45 95 L15 95 Z" strokeWidth="1.8" />

        {/* Platform depth/thickness */}
        <path d="M15 45 L15 50 L55 50 L55 45" strokeWidth="1" opacity="0.6" />
        <path d="M45 55 L45 60 L45 95" strokeWidth="0.8" opacity="0.5" />

        {/* Upper flight coming down (from top) */}
        <path d="M60 15 L60 45 L55 45" strokeWidth="1.5" />
        <path d="M55 20 L70 20" strokeWidth="1.3" />
        <path d="M55 28 L70 28" strokeWidth="1.3" />
        <path d="M55 36 L70 36" strokeWidth="1.2" />
        <path d="M55 45 L70 45" strokeWidth="1.2" />

        {/* Lower flight going down (to bottom) */}
        <path d="M15 95 L15 55 L45 55" strokeWidth="1.5" />
        <path d="M20 60 L45 60" strokeWidth="1.2" />
        <path d="M20 68 L45 68" strokeWidth="1.2" />
        <path d="M20 76 L45 76" strokeWidth="1.2" />
        <path d="M20 84 L45 84" strokeWidth="1.1" />
        <path d="M20 92 L45 92" strokeWidth="1.1" />

        {/* Balustrade on landing */}
        <path d="M55 45 L55 12" strokeWidth="1.8" />
        <path d="M15 45 L15 95" strokeWidth="1.8" />

        {/* Corner newel post */}
        <circle cx="55" cy="45" r="3" strokeWidth="1.5" />
        <path d="M55 42 L55 38" strokeWidth="1.2" />
        <circle cx="55" cy="36" r="2" strokeWidth="1" />

        {/* Baluster suggestions */}
        <path d="M55 20 L55 18" strokeWidth="0.8" />
        <path d="M55 30 L55 28" strokeWidth="0.8" />
        <path d="M15 60 L13 60" strokeWidth="0.8" />
        <path d="M15 75 L13 75" strokeWidth="0.8" />
        <path d="M15 90 L13 90" strokeWidth="0.8" />

        {/* Floor pattern on landing */}
        <path d="M25 48 L45 48" strokeWidth="0.5" opacity="0.3" />
        <path d="M35 45 L35 55" strokeWidth="0.5" opacity="0.3" />
      </g>
    </g>
  </svg>
)

/**
 * MOSAIC FLOOR - Decorative inlaid tile/stone pattern
 * 3D PERSPECTIVE: Looking down at Roman-style mosaic
 * Shows: Small tesserae forming figurative/geometric design
 * Distinct: Intricate small pieces, often figurative, bordered
 */
const MosaicFloorSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="mosaic-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#mosaic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Room edges */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 5 L95 5" />
        <path d="M5 95 L95 95" />
        <path d="M5 5 L5 95" />
        <path d="M95 5 L95 95" />
      </g>

      {/* PRIMARY - Mosaic floor with central medallion */}
      <g strokeWidth="1">
        {/* Outer decorative border - Greek key pattern */}
        <path d="M10 10 L90 10 L90 90 L10 90 Z" strokeWidth="1.5" />
        <path d="M14 14 L86 14 L86 86 L14 86 Z" strokeWidth="1.2" />

        {/* Greek key border details */}
        <path d="M18 10 L18 14 L22 14 L22 10" strokeWidth="0.8" />
        <path d="M30 10 L30 14 L34 14 L34 10" strokeWidth="0.8" />
        <path d="M42 10 L42 14 L46 14 L46 10" strokeWidth="0.8" />
        <path d="M54 10 L54 14 L58 14 L58 10" strokeWidth="0.8" />
        <path d="M66 10 L66 14 L70 14 L70 10" strokeWidth="0.8" />
        <path d="M78 10 L78 14 L82 14 L82 10" strokeWidth="0.8" />

        {/* Inner field border */}
        <path d="M18 18 L82 18 L82 82 L18 82 Z" strokeWidth="1.3" />

        {/* Central medallion - circular with design */}
        <circle cx="50" cy="50" r="25" strokeWidth="1.8" />
        <circle cx="50" cy="50" r="22" strokeWidth="1" />
        <circle cx="50" cy="50" r="18" strokeWidth="1.2" />

        {/* Central figure - simplified dolphin (common Roman motif) */}
        <path d="M35 50 Q45 40, 55 45 Q65 50, 60 55 Q50 62, 40 55 Q35 52, 35 50" strokeWidth="1.5" />
        <path d="M38 48 L32 42 L35 50" strokeWidth="1.2" />
        <circle cx="55" cy="48" r="1.5" strokeWidth="0.8" />
        <path d="M52 52 L48 55" strokeWidth="0.6" opacity="0.5" />

        {/* Wave pattern around dolphin */}
        <path d="M30 45 Q35 42, 40 45" strokeWidth="0.8" />
        <path d="M60 55 Q65 52, 70 55" strokeWidth="0.8" />

        {/* Corner motifs */}
        <path d="M22 22 L30 22 L30 30 L22 30 Z" strokeWidth="1.1" />
        <path d="M26 22 L26 30" strokeWidth="0.6" />
        <path d="M22 26 L30 26" strokeWidth="0.6" />

        <path d="M70 22 L78 22 L78 30 L70 30 Z" strokeWidth="1.1" />
        <path d="M74 22 L74 30" strokeWidth="0.6" />

        <path d="M22 70 L30 70 L30 78 L22 78 Z" strokeWidth="1.1" />
        <path d="M26 70 L26 78" strokeWidth="0.6" />

        <path d="M70 70 L78 70 L78 78 L70 78 Z" strokeWidth="1.1" />

        {/* Tesserae texture suggestion */}
        <path d="M25 40 L27 40 L27 42 L25 42 Z" strokeWidth="0.5" />
        <path d="M73 58 L75 58 L75 60 L73 60 Z" strokeWidth="0.5" />
        <path d="M40 75 L42 75 L42 77 L40 77 Z" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * NEWEL POST - Main structural post at stair start/turn
 * 3D PERSPECTIVE: Three-quarter view of ornate newel
 * Shows: Substantial turned or carved post with cap/finial
 * Distinct: Larger than balusters, often very ornate, anchors rail
 */
const NewelPostSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="newel-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#newel-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Handrail meeting newel and floor */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M60 25 L95 25" />
        <path d="M60 28 L95 28" />
        <path d="M5 95 L95 95" />
        <path d="M65 30 L65 35 L70 40" />
      </g>

      {/* PRIMARY - Ornate newel post */}
      <g strokeWidth="1.2">
        {/* Finial/cap at top - acorn or ball shape */}
        <circle cx="40" cy="12" r="6" strokeWidth="1.5" />
        <circle cx="40" cy="12" r="3" strokeWidth="0.8" />
        <path d="M40 18 L40 22" strokeWidth="1.3" />

        {/* Neck molding under finial */}
        <ellipse cx="40" cy="24" rx="8" ry="2" strokeWidth="1.3" />
        <path d="M32 24 L32 28 L48 28 L48 24" strokeWidth="1.2" />

        {/* Upper cap block */}
        <path d="M30 28 L50 28 L52 32 L28 32 Z" strokeWidth="1.5" />
        <path d="M28 32 L28 38 L52 38 L52 32" strokeWidth="1.4" />

        {/* Main shaft - paneled section */}
        <path d="M32 38 L32 75 L48 75 L48 38" strokeWidth="1.8" />

        {/* Recessed panels on shaft */}
        <path d="M34 42 L34 55 L46 55 L46 42 Z" strokeWidth="1.1" />
        <path d="M36 44 L36 53 L44 53 L44 44 Z" strokeWidth="0.7" opacity="0.5" />

        <path d="M34 58 L34 72 L46 72 L46 58 Z" strokeWidth="1.1" />
        <path d="M36 60 L36 70 L44 70 L44 60 Z" strokeWidth="0.7" opacity="0.5" />

        {/* Middle molding ring */}
        <ellipse cx="40" cy="56" rx="10" ry="2" strokeWidth="1" opacity="0.7" />

        {/* Lower cap block */}
        <path d="M28 75 L52 75 L52 80 L28 80 Z" strokeWidth="1.5" />
        <path d="M26 80 L54 80 L54 85 L26 85 Z" strokeWidth="1.6" />

        {/* Base plinth */}
        <path d="M24 85 L56 85 L56 95 L24 95 Z" strokeWidth="1.8" />
        <path d="M26 87 L54 87" strokeWidth="0.8" opacity="0.5" />
        <path d="M26 92 L54 92" strokeWidth="0.8" opacity="0.5" />

        {/* Shadow on shaft */}
        <path d="M46 45 L47 50 L46 55" strokeWidth="0.6" opacity="0.4" />
        <path d="M46 62 L47 67 L46 72" strokeWidth="0.6" opacity="0.4" />

        {/* Handrail connection point */}
        <path d="M48 26 L60 26" strokeWidth="1.8" />
        <path d="M52 30 L58 30" strokeWidth="1.2" />
      </g>
    </g>
  </svg>
)

/**
 * OPUS SECTILE - Roman marble inlay technique
 * 3D PERSPECTIVE: Looking down at elaborate marble floor
 * Shows: Cut marble pieces forming geometric/figurative designs
 * Distinct: Large shaped pieces (vs small tesserae), precious stones
 */
const OpusSectileSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="opus-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#opus-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT FAR: Adjacent rooms and garden court */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        {/* Adjacent room to the left */}
        <path d="M0 10 L0 90" />
        {/* Furniture outline in adjacent room - bench */}
        <path d="M0 40 L3 40 L3 60 L0 60" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        {/* Adjacent room to the right */}
        <path d="M100 10 L100 90" />
        {/* Courtyard/garden beyond top wall */}
        <path d="M20 0 L80 0" />
        <path d="M35 0 L35 3" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        <path d="M65 0 L65 3" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
      </g>

      {/* CONTEXT NEAR: Room walls with thickness, columns, door openings */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Room walls - outer */}
        <path d="M5 5 L95 5 L95 95 L5 95 Z" />
        {/* Wall thickness - inner */}
        <path d="M3 3 L97 3 L97 97 L3 97 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Door opening in bottom wall */}
        <path d="M40 95 L40 97" />
        <path d="M60 95 L60 97" />
        {/* Door swing */}
        <path d="M40 97 Q50 88, 60 97" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Column bases at corners */}
        <circle cx="8" cy="8" r="2" strokeWidth={S.CN.strokeWidthFine} />
        <circle cx="92" cy="8" r="2" strokeWidth={S.CN.strokeWidthFine} />
        <circle cx="8" cy="92" r="2" strokeWidth={S.CN.strokeWidthFine} />
        <circle cx="92" cy="92" r="2" strokeWidth={S.CN.strokeWidthFine} />
        {/* Window reveal in left wall */}
        <path d="M5 30 L3 30 L3 45 L5 45" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Window reveal in right wall */}
        <path d="M95 55 L97 55 L97 70 L95 70" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY - Opus sectile marble inlay */}
      <g strokeWidth="1.2">
        {/* Outer border frame */}
        <path d="M10 10 L90 10 L90 90 L10 90 Z" strokeWidth="1.8" />
        <path d="M15 15 L85 15 L85 85 L15 85 Z" strokeWidth="1.2" />

        {/* Central medallion - large geometric star */}
        <circle cx="50" cy="50" r="28" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="24" strokeWidth="1" />

        {/* 8-pointed star in center */}
        <path d="M50 26 L54 42 L70 38 L58 50 L70 62 L54 58 L50 74 L46 58 L30 62 L42 50 L30 38 L46 42 Z" strokeWidth="1.6" />

        {/* Inner star details */}
        <path d="M50 34 L52 44 L62 42 L54 50 L62 58 L52 56 L50 66 L48 56 L38 58 L46 50 L38 42 L48 44 Z" strokeWidth="1" opacity="0.7" />

        {/* Central rosette */}
        <circle cx="50" cy="50" r="6" strokeWidth="1.3" />
        <circle cx="50" cy="50" r="3" strokeWidth="0.8" />

        {/* Corner panels - porphyry squares */}
        <path d="M18 18 L32 18 L32 32 L18 32 Z" strokeWidth="1.4" />
        <path d="M22 22 L28 22 L28 28 L22 28 Z" strokeWidth="0.8" opacity="0.6" />

        <path d="M68 18 L82 18 L82 32 L68 32 Z" strokeWidth="1.4" />
        <path d="M72 22 L78 22 L78 28 L72 28 Z" strokeWidth="0.8" opacity="0.6" />

        <path d="M18 68 L32 68 L32 82 L18 82 Z" strokeWidth="1.4" />
        <path d="M22 72 L28 72 L28 78 L22 78 Z" strokeWidth="0.8" opacity="0.6" />

        <path d="M68 68 L82 68 L82 82 L68 82 Z" strokeWidth="1.4" />
        <path d="M72 72 L78 72 L78 78 L72 78 Z" strokeWidth="0.8" opacity="0.6" />

        {/* Connecting triangular pieces */}
        <path d="M32 25 L50 22 L50 26 L32 25" strokeWidth="1" />
        <path d="M68 25 L50 22 L50 26 L68 25" strokeWidth="1" />
        <path d="M32 75 L50 78 L50 74 L32 75" strokeWidth="1" />
        <path d="M68 75 L50 78 L50 74 L68 75" strokeWidth="1" />

        {/* Marble veining suggestion */}
        <path d="M24 24 L27 26" strokeWidth="0.4" opacity="0.4" />
        <path d="M74 74 L77 76" strokeWidth="0.4" opacity="0.4" />
      </g>
    </g>
  </svg>
)

/**
 * PARQUET - Geometric wood flooring pattern
 * 3D PERSPECTIVE: Looking down at herringbone/Versailles pattern
 * Shows: Wood strips arranged in geometric pattern
 * Distinct: Wood grain, geometric arrangement, warm material
 */
const ParquetSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="parquet-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#parquet-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT FAR: Adjacent rooms beyond walls */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        {/* Room beyond top wall */}
        <path d="M10 0 L90 0" />
        {/* Room beyond left wall */}
        <path d="M0 10 L0 90" />
        {/* Hallway beyond right side */}
        <path d="M98 20 L98 80" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        {/* Garden/exterior below */}
        <path d="M15 100 L85 100" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
      </g>

      {/* CONTEXT NEAR: Room corner walls, door, baseboard, fireplace */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Room walls */}
        <path d="M5 5 L5 95" />
        <path d="M5 5 L95 5" />
        {/* Wall thickness */}
        <path d="M3 3 L3 97" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M3 3 L97 3" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Right wall */}
        <path d="M95 5 L95 95" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Bottom wall */}
        <path d="M5 95 L95 95" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Door opening in right wall */}
        <path d="M95 35 L97 35" strokeWidth={S.CN.strokeWidthFine} />
        <path d="M95 55 L97 55" strokeWidth={S.CN.strokeWidthFine} />
        {/* Door swing */}
        <path d="M95 35 Q88 42, 95 55" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Fireplace recess in top wall */}
        <path d="M40 5 L40 2 L60 2 L60 5" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY - Parquet de Versailles pattern */}
      <g strokeWidth="1">
        {/* Floor boundary */}
        <path d="M10 10 L90 10 L90 90 L10 90 Z" strokeWidth="1.5" />

        {/* Panel 1 - top left */}
        <path d="M12 12 L48 12 L48 48 L12 48 Z" strokeWidth="1.4" />
        <path d="M30 12 L30 48" strokeWidth="1" />
        <path d="M12 30 L48 30" strokeWidth="1" />
        {/* Inner diamond */}
        <path d="M30 15 L45 30 L30 45 L15 30 Z" strokeWidth="1.2" />
        <path d="M30 20 L40 30 L30 40 L20 30 Z" strokeWidth="0.8" opacity="0.6" />
        {/* Wood grain */}
        <path d="M18 18 L22 22" strokeWidth="0.4" opacity="0.4" />
        <path d="M38 38 L42 42" strokeWidth="0.4" opacity="0.4" />

        {/* Panel 2 - top right */}
        <path d="M52 12 L88 12 L88 48 L52 48 Z" strokeWidth="1.4" />
        <path d="M70 12 L70 48" strokeWidth="1" />
        <path d="M52 30 L88 30" strokeWidth="1" />
        <path d="M70 15 L85 30 L70 45 L55 30 Z" strokeWidth="1.2" />
        <path d="M70 20 L80 30 L70 40 L60 30 Z" strokeWidth="0.8" opacity="0.6" />

        {/* Panel 3 - bottom left */}
        <path d="M12 52 L48 52 L48 88 L12 88 Z" strokeWidth="1.4" />
        <path d="M30 52 L30 88" strokeWidth="1" />
        <path d="M12 70 L48 70" strokeWidth="1" />
        <path d="M30 55 L45 70 L30 85 L15 70 Z" strokeWidth="1.2" />
        <path d="M30 60 L40 70 L30 80 L20 70 Z" strokeWidth="0.8" opacity="0.6" />

        {/* Panel 4 - bottom right */}
        <path d="M52 52 L88 52 L88 88 L52 88 Z" strokeWidth="1.4" />
        <path d="M70 52 L70 88" strokeWidth="1" />
        <path d="M52 70 L88 70" strokeWidth="1" />
        <path d="M70 55 L85 70 L70 85 L55 70 Z" strokeWidth="1.2" />
        <path d="M70 60 L80 70 L70 80 L60 70 Z" strokeWidth="0.8" opacity="0.6" />

        {/* Border strip */}
        <path d="M10 10 L10 90" strokeWidth="2" />
        <path d="M10 10 L90 10" strokeWidth="2" />
      </g>
    </g>
  </svg>
)

/**
 * PERRON - External entrance platform with steps
 * 3D PERSPECTIVE: Looking at building entrance from outside
 * Shows: Raised platform at door with flanking steps
 * Distinct: Exterior, often with balustrade, formal entrance
 */
const PerronSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="perron-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#perron-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Building facade behind */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M20 5 L80 5 L80 45 L20 45 Z" />
        <path d="M35 10 L65 10 L65 42 L35 42 Z" />
        <path d="M40 15 L60 15 L60 40 L40 40 Z" />
        <path d="M25 8 L30 5 L30 15 L25 18 Z" />
        <path d="M70 8 L75 5 L75 15 L70 18 Z" />
      </g>

      {/* PRIMARY - Perron platform and steps */}
      <g strokeWidth="1.2">
        {/* Main platform top surface */}
        <path d="M15 45 L85 45 L90 50 L10 50 Z" strokeWidth="1.8" />

        {/* Platform front face */}
        <path d="M10 50 L10 58 L90 58 L90 50" strokeWidth="1.5" />

        {/* Central steps descending */}
        <path d="M30 58 L30 66 L70 66 L70 58" strokeWidth="1.5" />
        <path d="M30 66 L28 66 L28 74 L72 74 L72 66 L70 66" strokeWidth="1.4" />
        <path d="M28 74 L26 74 L26 82 L74 82 L74 74 L72 74" strokeWidth="1.3" />
        <path d="M26 82 L24 82 L24 90 L76 90 L76 82 L74 82" strokeWidth="1.2" />

        {/* Step treads */}
        <path d="M32 62 L68 62" strokeWidth="1" />
        <path d="M30 70 L70 70" strokeWidth="1" />
        <path d="M28 78 L72 78" strokeWidth="0.9" />
        <path d="M26 86 L74 86" strokeWidth="0.9" />

        {/* Ground level */}
        <path d="M5 90 L95 90" strokeWidth="1.8" />

        {/* Left balustrade/wall */}
        <path d="M10 45 L10 58 L28 58 L28 90" strokeWidth="1.5" />
        <path d="M15 48 L15 55" strokeWidth="1" />
        <path d="M20 48 L20 55" strokeWidth="1" />
        <path d="M25 48 L25 55" strokeWidth="1" />

        {/* Right balustrade/wall */}
        <path d="M90 45 L90 58 L72 58 L72 90" strokeWidth="1.5" />
        <path d="M85 48 L85 55" strokeWidth="1" />
        <path d="M80 48 L80 55" strokeWidth="1" />
        <path d="M75 48 L75 55" strokeWidth="1" />

        {/* Decorative urns on platform */}
        <path d="M12 42 L18 42 L17 45 L13 45 Z" strokeWidth="1" />
        <path d="M15 40 L15 42" strokeWidth="0.8" />
        <path d="M82 42 L88 42 L87 45 L83 45 Z" strokeWidth="1" />
        <path d="M85 40 L85 42" strokeWidth="0.8" />

        {/* Platform surface pattern */}
        <path d="M20 47 L80 47" strokeWidth="0.5" opacity="0.4" />
        <path d="M50 45 L50 50" strokeWidth="0.5" opacity="0.4" />
      </g>
    </g>
  </svg>
)

/**
 * RISER - Vertical face of a stair step
 * 3D PERSPECTIVE: Close-up section showing riser and tread
 * Shows: Vertical board between treads, nose overhang
 * Distinct: Vertical surface, often decorated, structural
 */
const RiserSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="riser-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#riser-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT FAR: Rooms above and below stair */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        {/* Upper floor level */}
        <path d="M15 5 L95 5" />
        {/* Ceiling of lower room */}
        <path d="M0 0 L5 0 L5 5" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        {/* Floor of lower room */}
        <path d="M0 98 L100 98" />
        {/* Furniture in upper room - chair outline */}
        <path d="M80 5 L85 5 L85 15 L80 15" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
      </g>

      {/* CONTEXT NEAR: Stair stringers, wall surface, handrail */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Left stringer wall */}
        <path d="M5 5 L5 95" />
        {/* Right stringer wall */}
        <path d="M95 25 L95 95" />
        {/* Wall thickness on left */}
        <path d="M3 5 L3 95" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Handrail profile along stair */}
        <path d="M0 15 L5 15" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M0 42 L5 42" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Baseboard at stringer base */}
        <path d="M5 93 L95 93" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Carpet runner edge suggestion */}
        <path d="M20 5 L20 18" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M80 25 L80 38" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY - Stair risers and treads in section */}
      <g strokeWidth="1.2">
        {/* Step 1 - Bottom (closest, most detail) */}
        {/* Riser face */}
        <path d="M10 70 L10 88 L90 88 L90 70" strokeWidth="2" />
        {/* Tread surface */}
        <path d="M8 70 L92 70 L92 65 L5 65 Z" strokeWidth="1.8" />
        {/* Tread nose (overhang) */}
        <path d="M5 65 L5 68 Q6 70, 8 70" strokeWidth="1.5" />
        <path d="M92 70 Q94 70, 95 68 L95 65" strokeWidth="1.5" />
        {/* Riser detail/molding */}
        <path d="M12 72 L88 72" strokeWidth="0.8" />
        <path d="M12 86 L88 86" strokeWidth="0.8" />
        {/* Decorative panel on riser */}
        <path d="M20 74 L80 74 L80 84 L20 84 Z" strokeWidth="1" />
        <path d="M25 76 L75 76 L75 82 L25 82 Z" strokeWidth="0.6" opacity="0.5" />

        {/* Step 2 - Middle */}
        <path d="M15 45 L15 63 L88 63 L88 45" strokeWidth="1.8" />
        <path d="M12 45 L90 45 L90 40 L10 40 Z" strokeWidth="1.6" />
        <path d="M10 40 L10 43 Q11 45, 12 45" strokeWidth="1.3" />
        <path d="M17 47 L85 47" strokeWidth="0.7" />
        <path d="M17 61 L85 61" strokeWidth="0.7" />
        <path d="M25 49 L75 49 L75 59 L25 59 Z" strokeWidth="0.9" />

        {/* Step 3 - Top (farthest) */}
        <path d="M20 22 L20 38 L85 38 L85 22" strokeWidth="1.5" />
        <path d="M18 22 L87 22 L87 18 L15 18 Z" strokeWidth="1.4" />
        <path d="M15 18 L15 20 Q16 22, 18 22" strokeWidth="1.2" />
        <path d="M22 24 L83 24" strokeWidth="0.6" />
        <path d="M30 26 L70 26 L70 34 L30 34 Z" strokeWidth="0.8" />

        {/* Stringer (diagonal support) visible */}
        <path d="M5 88 L5 65 L10 65 L15 40 L20 18 L20 5" strokeWidth="1.3" />
        <path d="M95 88 L95 65 L90 65 L88 40 L85 22 L85 10" strokeWidth="1.2" />

        {/* Labels/dimension hints */}
        <path d="M0 70 L5 70" strokeWidth="0.5" opacity="0.4" />
        <path d="M0 88 L5 88" strokeWidth="0.5" opacity="0.4" />
      </g>
    </g>
  </svg>
)

/**
 * SPIRAL STAIR - Helical staircase around central pole
 * 3D PERSPECTIVE: Looking up through spiral from below
 * Shows: Wedge-shaped treads around newel, continuous handrail
 * Distinct: Compact vertical circulation, dramatic spiral view
 */
const SpiralStairSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="spiral-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#spiral-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT FAR: Adjacent rooms and corridor beyond */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        {/* Hallway corridor to the right */}
        <path d="M98 30 L98 70" />
        <path d="M100 30 L100 70" />
        {/* Room outline upper-right */}
        <path d="M98 5 L98 28 L100 28 L100 5 Z" />
        {/* Room outline lower-right */}
        <path d="M98 72 L98 98 L100 98 L100 72 Z" />
        {/* Garden/exterior area to the left */}
        <path d="M0 20 Q2 15, 0 10" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        <path d="M0 80 Q2 75, 0 70" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
      </g>

      {/* CONTEXT NEAR: Surrounding walls, door opening, threshold */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <circle cx="50" cy="50" r="47" />
        {/* Wall thickness shown as double line */}
        <circle cx="50" cy="50" r="49" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Door opening in surrounding wall - entry to stair */}
        <path d="M50 97 L50 100" />
        <path d="M42 97 L42 100" />
        {/* Door swing arc */}
        <path d="M42 97 Q46 93, 50 97" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Threshold at door */}
        <path d="M42 97 L50 97" strokeWidth={S.CN.strokeWidthFine} />
        {/* Adjacent wall segments meeting the circular stair enclosure */}
        <path d="M3 50 L0 50" />
        <path d="M3 48 L0 48" />
      </g>

      {/* PRIMARY - Spiral stair plan view - consistent pie-slice wedge treads */}
      <g strokeWidth="1.2">
        {/* Central newel pole */}
        <circle cx="50" cy="50" r="5" strokeWidth="2" />
        <circle cx="50" cy="50" r="3" strokeWidth="1" />

        {/* Outer handrail circle */}
        <circle cx="50" cy="50" r="42" strokeWidth="1.8" />
        <circle cx="50" cy="50" r="40" strokeWidth="1" opacity="0.6" />

        {/* 12 wedge treads radiating from newel to outer wall, evenly spaced at 30° */}
        {/* Each tread is two radial lines from center to outer circle */}
        {/* Tread edges at 0°, 30°, 60°, 90°, 120°, 150°, 180°, 210°, 240°, 270°, 300°, 330° */}
        <path d="M55 50 L92 50" strokeWidth="1.5" />
        <path d="M53 45 L86 29" strokeWidth="1.5" />
        <path d="M50 45 L68 12" strokeWidth="1.5" />
        <path d="M47 45 L50 8" strokeWidth="1.4" />
        <path d="M45 47 L32 12" strokeWidth="1.4" />
        <path d="M45 50 L14 29" strokeWidth="1.4" />
        <path d="M45 52 L8 50" strokeWidth="1.3" />
        <path d="M47 55 L14 71" strokeWidth="1.3" />
        <path d="M50 55 L32 88" strokeWidth="1.3" />
        <path d="M53 55 L50 92" strokeWidth="1.2" />
        <path d="M55 53 L68 88" strokeWidth="1.2" />
        <path d="M55 50 L86 71" strokeWidth="1.2" />

        {/* Nosing arcs on select treads (curved front edge of each step) */}
        <path d="M92 50 Q90 42, 86 29" strokeWidth="0.8" opacity="0.6" />
        <path d="M68 12 Q58 10, 50 8" strokeWidth="0.8" opacity="0.6" />
        <path d="M14 29 Q10 38, 8 50" strokeWidth="0.8" opacity="0.6" />
        <path d="M32 88 Q42 92, 50 92" strokeWidth="0.8" opacity="0.6" />

        {/* DETAIL: Handrail spiral suggestion */}
        <path d="M50 8 Q78 10, 92 38 Q96 58, 86 78 Q70 94, 50 92" strokeWidth={S.P.strokeWidthLight} strokeDasharray={S.CN.dash} opacity={S.D.opacity} />

        {/* Direction of ascent arrow */}
        <path d="M82 58 Q84 52, 84 46" strokeWidth="0.8" opacity="0.5" />
        <path d="M82 48 L84 46 L86 48" strokeWidth="0.6" opacity="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * STRINGER - Diagonal beam supporting stair treads
 * 3D PERSPECTIVE: Cut-away showing stringer structure
 * Shows: Notched diagonal beam with treads resting in cuts
 * Distinct: Structural zigzag profile, supports entire stair
 */
const StringerSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="stringer-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#stringer-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT FAR: Adjacent rooms and ceiling */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        {/* Ceiling/upper floor */}
        <path d="M5 2 L95 2" />
        {/* Room to the right */}
        <path d="M98 50 L98 95 L95 95" />
        {/* Furniture outline in upper room */}
        <path d="M10 2 L25 2 L25 5" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
      </g>

      {/* CONTEXT NEAR: Wall, floor, parallel stringer, joist pockets */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Supporting wall */}
        <path d="M5 5 L5 95" />
        {/* Wall thickness */}
        <path d="M3 5 L3 95" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Floor level */}
        <path d="M5 95 L95 95" />
        {/* Floor thickness */}
        <path d="M5 97 L95 97" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Joist pockets in wall */}
        <path d="M3 28 L5 28 L5 32 L3 32" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        <path d="M3 56 L5 56 L5 60 L3 60" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Parallel stringer ghost (the other side of the stair) */}
        <path d="M15 20 L90 95" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY - Stringer beam with notches */}
      <g strokeWidth="1.2">
        {/* Main stringer diagonal - thick beam */}
        <path d="M10 15 L15 15 L90 90 L85 90 L10 20 Z" strokeWidth="2" />

        {/* Notch 1 - top */}
        <path d="M18 18 L18 28 L30 28 L30 32 L15 32 L15 22" strokeWidth="1.5" />
        {/* Tread in notch */}
        <path d="M15 28 L35 28 L35 24 L15 24 Z" strokeWidth="1.3" />

        {/* Notch 2 */}
        <path d="M32 32 L32 42 L44 42 L44 46 L29 46 L29 36" strokeWidth="1.5" />
        <path d="M29 42 L49 42 L49 38 L29 38 Z" strokeWidth="1.3" />

        {/* Notch 3 */}
        <path d="M46 46 L46 56 L58 56 L58 60 L43 60 L43 50" strokeWidth="1.5" />
        <path d="M43 56 L63 56 L63 52 L43 52 Z" strokeWidth="1.3" />

        {/* Notch 4 */}
        <path d="M60 60 L60 70 L72 70 L72 74 L57 74 L57 64" strokeWidth="1.5" />
        <path d="M57 70 L77 70 L77 66 L57 66 Z" strokeWidth="1.3" />

        {/* Notch 5 - bottom */}
        <path d="M74 74 L74 84 L86 84 L86 88 L71 88 L71 78" strokeWidth="1.5" />
        <path d="M71 84 L91 84 L91 80 L71 80 Z" strokeWidth="1.3" />

        {/* Riser positions indicated */}
        <path d="M30 28 L30 42" strokeWidth="1" opacity="0.6" />
        <path d="M44 42 L44 56" strokeWidth="1" opacity="0.6" />
        <path d="M58 56 L58 70" strokeWidth="1" opacity="0.6" />
        <path d="M72 70 L72 84" strokeWidth="1" opacity="0.6" />

        {/* Wood grain on stringer */}
        <path d="M25 22 L35 32" strokeWidth="0.4" opacity="0.4" />
        <path d="M50 47 L60 57" strokeWidth="0.4" opacity="0.4" />
        <path d="M70 67 L80 77" strokeWidth="0.4" opacity="0.4" />

        {/* Bolts/fasteners */}
        <circle cx="12" cy="18" r="1.5" strokeWidth="0.8" />
        <circle cx="87" cy="87" r="1.5" strokeWidth="0.8" />
      </g>
    </g>
  </svg>
)

/**
 * TATAMI - Japanese woven floor mat
 * 3D PERSPECTIVE: Room corner showing tatami arrangement
 * Shows: Rectangular mats with woven texture, border edges
 * Distinct: Modular arrangement, woven rush surface, cloth borders
 */
const TatamiSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="tatami-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#tatami-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Japanese room elements */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 5 L5 95" />
        <path d="M5 5 L95 5" />
        <path d="M8 10 L8 40" />
        <path d="M10 8 L40 8" />
        <path d="M60 8 L60 20 L75 20 L75 8" />
      </g>

      {/* PRIMARY - Tatami mat arrangement */}
      <g strokeWidth="1.2">
        {/* Room floor boundary */}
        <path d="M10 10 L90 10 L90 90 L10 90 Z" strokeWidth="1.5" />

        {/* Tatami 1 - horizontal top left */}
        <path d="M12 12 L55 12 L55 35 L12 35 Z" strokeWidth="1.4" />
        {/* Cloth border (heri) */}
        <path d="M12 23 L55 23" strokeWidth="1.8" />
        <path d="M12 24 L55 24" strokeWidth="0.6" />
        {/* Woven texture */}
        <path d="M15 15 L15 21" strokeWidth="0.4" opacity="0.4" />
        <path d="M20 15 L20 21" strokeWidth="0.4" opacity="0.4" />
        <path d="M25 15 L25 21" strokeWidth="0.4" opacity="0.4" />
        <path d="M30 15 L30 21" strokeWidth="0.4" opacity="0.4" />
        <path d="M35 15 L35 21" strokeWidth="0.4" opacity="0.4" />
        <path d="M40 15 L40 21" strokeWidth="0.4" opacity="0.4" />
        <path d="M45 15 L45 21" strokeWidth="0.4" opacity="0.4" />
        <path d="M50 15 L50 21" strokeWidth="0.4" opacity="0.4" />

        {/* Tatami 2 - vertical top right */}
        <path d="M57 12 L88 12 L88 55 L57 55 Z" strokeWidth="1.4" />
        <path d="M72 12 L72 55" strokeWidth="1.8" />
        <path d="M73 12 L73 55" strokeWidth="0.6" />
        <path d="M60 15 L68 15" strokeWidth="0.4" opacity="0.4" />
        <path d="M60 22 L68 22" strokeWidth="0.4" opacity="0.4" />
        <path d="M60 29 L68 29" strokeWidth="0.4" opacity="0.4" />
        <path d="M60 36 L68 36" strokeWidth="0.4" opacity="0.4" />
        <path d="M60 43 L68 43" strokeWidth="0.4" opacity="0.4" />
        <path d="M60 50 L68 50" strokeWidth="0.4" opacity="0.4" />

        {/* Tatami 3 - vertical left */}
        <path d="M12 37 L35 37 L35 88 L12 88 Z" strokeWidth="1.4" />
        <path d="M23 37 L23 88" strokeWidth="1.8" />
        <path d="M24 37 L24 88" strokeWidth="0.6" />
        <path d="M15 40 L21 40" strokeWidth="0.4" opacity="0.4" />
        <path d="M15 50 L21 50" strokeWidth="0.4" opacity="0.4" />
        <path d="M15 60 L21 60" strokeWidth="0.4" opacity="0.4" />
        <path d="M15 70 L21 70" strokeWidth="0.4" opacity="0.4" />
        <path d="M15 80 L21 80" strokeWidth="0.4" opacity="0.4" />

        {/* Tatami 4 - horizontal center */}
        <path d="M37 37 L55 37 L55 57 L37 57 Z" strokeWidth="1.4" />
        <path d="M37 47 L55 47" strokeWidth="1.6" />
        <path d="M40 40 L40 45" strokeWidth="0.4" opacity="0.4" />
        <path d="M47 40 L47 45" strokeWidth="0.4" opacity="0.4" />

        {/* Tatami 5 - horizontal bottom */}
        <path d="M37 59 L88 59 L88 88 L37 88 Z" strokeWidth="1.4" />
        <path d="M37 73 L88 73" strokeWidth="1.8" />
        <path d="M37 74 L88 74" strokeWidth="0.6" />
        <path d="M42 62 L42 70" strokeWidth="0.4" opacity="0.4" />
        <path d="M52 62 L52 70" strokeWidth="0.4" opacity="0.4" />
        <path d="M62 62 L62 70" strokeWidth="0.4" opacity="0.4" />
        <path d="M72 62 L72 70" strokeWidth="0.4" opacity="0.4" />
        <path d="M82 62 L82 70" strokeWidth="0.4" opacity="0.4" />
      </g>
    </g>
  </svg>
)

/**
 * TERRAZZO - Polished aggregate flooring
 * 3D PERSPECTIVE: Looking down at terrazzo with brass strips
 * Shows: Marble chips in cement, metal divider strips
 * Distinct: Random aggregate pattern, geometric dividers, polished
 */
const TerrazzoSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="terrazzo-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#terrazzo-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT FAR: Hallway and adjacent spaces */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        {/* Corridor beyond top wall */}
        <path d="M10 0 L90 0" />
        <path d="M10 2 L90 2" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
        {/* Adjacent room lower-left */}
        <path d="M0 60 L0 100 L4 100" />
        {/* Adjacent room lower-right */}
        <path d="M100 60 L100 100 L96 100" />
        {/* Furniture in corridor - bench outline */}
        <path d="M40 0 L60 0 L60 2 L40 2" strokeWidth={S.CF.strokeWidthFine} opacity={S.CF.opacitySubtle} />
      </g>

      {/* CONTEXT NEAR: Room walls, door, threshold, column */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Room walls */}
        <path d="M5 5 L95 5 L95 95 L5 95 Z" />
        {/* Wall thickness */}
        <path d="M3 3 L97 3 L97 97 L3 97 Z" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Door opening in top wall */}
        <path d="M35 5 L35 3" />
        <path d="M50 5 L50 3" />
        {/* Door swing arc */}
        <path d="M35 5 Q42 12, 50 5" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Threshold strip */}
        <path d="M35 5 L50 5" strokeWidth={S.CN.strokeWidthFine} />
        {/* Column base near entrance */}
        <circle cx="50" cy="8" r="2" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Baseboard along left wall */}
        <path d="M5 10 L7 10 L7 90 L5 90" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
        {/* Baseboard along right wall */}
        <path d="M95 10 L93 10 L93 90 L95 90" strokeWidth={S.CN.strokeWidthFine} opacity={S.CN.opacitySubtle} />
      </g>

      {/* PRIMARY - Terrazzo floor with brass dividers */}
      <g strokeWidth="1">
        {/* Floor boundary */}
        <path d="M10 10 L90 10 L90 90 L10 90 Z" strokeWidth="1.5" />

        {/* Brass divider strips - geometric pattern */}
        <path d="M10 50 L90 50" strokeWidth="2.5" />
        <path d="M50 10 L50 90" strokeWidth="2.5" />
        <path d="M30 10 L30 90" strokeWidth="1.8" />
        <path d="M70 10 L70 90" strokeWidth="1.8" />
        <path d="M10 30 L90 30" strokeWidth="1.8" />
        <path d="M10 70 L90 70" strokeWidth="1.8" />

        {/* Diagonal accent strip */}
        <path d="M10 10 L50 50" strokeWidth="2" />
        <path d="M90 10 L50 50" strokeWidth="2" />

        {/* Aggregate chips - various sizes and shapes */}
        {/* Top left quadrant */}
        <path d="M15 15 L18 17 L16 20 Z" strokeWidth="0.8" />
        <path d="M22 18 L25 16 L26 20 L23 21 Z" strokeWidth="0.8" />
        <path d="M14 24 L17 22 L18 26 Z" strokeWidth="0.8" />
        <path d="M24 24 L27 25 L25 28 Z" strokeWidth="0.8" />

        {/* Top right quadrant */}
        <path d="M55 15 L58 17 L56 20 Z" strokeWidth="0.8" />
        <path d="M62 18 L65 16 L66 20 L63 21 Z" strokeWidth="0.8" />
        <path d="M75 15 L78 17 L76 20 Z" strokeWidth="0.8" />
        <path d="M82 22 L85 20 L86 24 L83 25 Z" strokeWidth="0.8" />
        <path d="M58 24 L61 25 L59 28 Z" strokeWidth="0.8" />

        {/* Bottom left quadrant */}
        <path d="M15 55 L18 57 L16 60 Z" strokeWidth="0.8" />
        <path d="M22 58 L25 56 L26 60 L23 61 Z" strokeWidth="0.8" />
        <path d="M15 75 L18 77 L16 80 Z" strokeWidth="0.8" />
        <path d="M24 78 L27 76 L28 80 L25 81 Z" strokeWidth="0.8" />
        <path d="M14 84 L17 82 L18 86 Z" strokeWidth="0.8" />

        {/* Bottom right quadrant */}
        <path d="M55 55 L58 57 L56 60 Z" strokeWidth="0.8" />
        <path d="M72 58 L75 56 L76 60 L73 61 Z" strokeWidth="0.8" />
        <path d="M82 55 L85 57 L83 60 Z" strokeWidth="0.8" />
        <path d="M58 75 L61 77 L59 80 Z" strokeWidth="0.8" />
        <path d="M75 78 L78 76 L79 80 L76 81 Z" strokeWidth="0.8" />
        <path d="M84 82 L87 80 L88 84 L85 85 Z" strokeWidth="0.8" />

        {/* Polished surface gleam */}
        <path d="M20 20 L22 22" strokeWidth="0.5" opacity="0.3" />
        <path d="M65 35 L67 37" strokeWidth="0.5" opacity="0.3" />
        <path d="M40 75 L42 77" strokeWidth="0.5" opacity="0.3" />
      </g>
    </g>
  </svg>
)

/**
 * TREAD - Horizontal step surface
 * 3D PERSPECTIVE: Close-up of stair tread detail
 * Shows: Worn surface, nosing edge, anti-slip grooves
 * Distinct: Horizontal walking surface, often worn pattern
 */
const TreadSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="tread-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#tread-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Stair structure */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 35 L5 95" />
        <path d="M95 35 L95 95" />
        <path d="M5 95 L95 95" />
      </g>

      {/* PRIMARY - Stair treads in 3D perspective */}
      <g strokeWidth="1.2">
        {/* Tread 1 - Top (farthest, smallest) */}
        <path d="M20 15 L80 15 L85 22 L15 22 Z" strokeWidth="1.4" />
        <path d="M15 22 L15 28 L85 28 L85 22" strokeWidth="1.2" />
        {/* Nosing detail */}
        <path d="M13 22 L13 25 Q14 28, 15 28" strokeWidth="1" />
        <path d="M85 28 Q86 28, 87 25 L87 22" strokeWidth="1" />
        <path d="M22 18 L78 18" strokeWidth="0.6" opacity="0.5" />

        {/* Tread 2 */}
        <path d="M15 32 L85 32 L90 40 L10 40 Z" strokeWidth="1.6" />
        <path d="M10 40 L10 48 L90 48 L90 40" strokeWidth="1.4" />
        <path d="M8 40 L8 44 Q9 48, 10 48" strokeWidth="1.2" />
        <path d="M90 48 Q91 48, 92 44 L92 40" strokeWidth="1.2" />
        {/* Anti-slip grooves */}
        <path d="M18 35 L82 35" strokeWidth="0.8" />
        <path d="M16 37 L84 37" strokeWidth="0.6" />
        {/* Wear pattern in center */}
        <path d="M35 36 Q50 34, 65 36" strokeWidth="0.5" opacity="0.4" />

        {/* Tread 3 - Main focus (closest, largest, most detail) */}
        <path d="M8 55 L92 55 L97 65 L3 65 Z" strokeWidth="2" />
        <path d="M3 65 L3 78 L97 78 L97 65" strokeWidth="1.8" />
        {/* Nosing - prominent rounded edge */}
        <path d="M0 65 L0 70 Q2 78, 3 78" strokeWidth="1.5" />
        <path d="M97 78 Q98 78, 100 70 L100 65" strokeWidth="1.5" />

        {/* Anti-slip grooves on tread */}
        <path d="M12 58 L88 58" strokeWidth="1" />
        <path d="M10 60 L90 60" strokeWidth="0.8" />
        <path d="M8 62 L92 62" strokeWidth="0.6" />

        {/* Wear pattern - centuries of footsteps */}
        <path d="M25 60 Q50 56, 75 60" strokeWidth="1.2" />
        <path d="M30 62 Q50 58, 70 62" strokeWidth="0.8" opacity="0.6" />

        {/* Stone texture / material grain */}
        <path d="M15 68 L20 72" strokeWidth="0.4" opacity="0.4" />
        <path d="M45 70 L50 74" strokeWidth="0.4" opacity="0.4" />
        <path d="M75 68 L80 72" strokeWidth="0.4" opacity="0.4" />

        {/* Riser below */}
        <path d="M3 78 L3 95 L97 95 L97 78" strokeWidth="1.5" />
        <path d="M5 80 L95 80" strokeWidth="0.7" />
        <path d="M5 92 L95 92" strokeWidth="0.7" />
      </g>
    </g>
  </svg>
)

/**
 * WAFFLE SLAB - Concrete slab with grid of ribs
 * 3D PERSPECTIVE: Looking up at exposed waffle slab structure
 * Shows: Two-way ribbed concrete, coffered underside
 * Distinct: Grid pattern of recesses, modern brutalist aesthetic
 */
const WaffleSlabSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="waffle-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#waffle-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Support columns */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M10 90 L10 98" />
        <path d="M8 90 L12 90" />
        <path d="M90 90 L90 98" />
        <path d="M88 90 L92 90" />
      </g>

      {/* PRIMARY - Waffle slab from below */}
      <g strokeWidth="1.2">
        {/* Slab outline */}
        <path d="M5 10 L95 10 L95 90 L5 90 Z" strokeWidth="1.8" />

        {/* Main ribs - horizontal */}
        <path d="M5 25 L95 25" strokeWidth="2" />
        <path d="M5 42 L95 42" strokeWidth="2" />
        <path d="M5 58 L95 58" strokeWidth="2" />
        <path d="M5 75 L95 75" strokeWidth="2" />

        {/* Main ribs - vertical */}
        <path d="M22 10 L22 90" strokeWidth="2" />
        <path d="M40 10 L40 90" strokeWidth="2" />
        <path d="M58 10 L58 90" strokeWidth="2" />
        <path d="M76 10 L76 90" strokeWidth="2" />

        {/* Waffle cells (coffers) - recessed squares */}
        {/* Row 1 */}
        <path d="M8 13 L19 13 L19 22 L8 22 Z" strokeWidth="1" />
        <path d="M10 15 L17 15 L17 20 L10 20 Z" strokeWidth="0.6" opacity="0.5" />

        <path d="M25 13 L37 13 L37 22 L25 22 Z" strokeWidth="1" />
        <path d="M27 15 L35 15 L35 20 L27 20 Z" strokeWidth="0.6" opacity="0.5" />

        <path d="M43 13 L55 13 L55 22 L43 22 Z" strokeWidth="1" />
        <path d="M45 15 L53 15 L53 20 L45 20 Z" strokeWidth="0.6" opacity="0.5" />

        <path d="M61 13 L73 13 L73 22 L61 22 Z" strokeWidth="1" />
        <path d="M63 15 L71 15 L71 20 L63 20 Z" strokeWidth="0.6" opacity="0.5" />

        <path d="M79 13 L92 13 L92 22 L79 22 Z" strokeWidth="1" />

        {/* Row 2 */}
        <path d="M8 28 L19 28 L19 39 L8 39 Z" strokeWidth="1" />
        <path d="M25 28 L37 28 L37 39 L25 39 Z" strokeWidth="1" />
        <path d="M43 28 L55 28 L55 39 L43 39 Z" strokeWidth="1" />
        <path d="M45 30 L53 30 L53 37 L45 37 Z" strokeWidth="0.6" opacity="0.5" />
        <path d="M61 28 L73 28 L73 39 L61 39 Z" strokeWidth="1" />
        <path d="M79 28 L92 28 L92 39 L79 39 Z" strokeWidth="1" />

        {/* Row 3 */}
        <path d="M8 45 L19 45 L19 55 L8 55 Z" strokeWidth="1" />
        <path d="M25 45 L37 45 L37 55 L25 55 Z" strokeWidth="1" />
        <path d="M27 47 L35 47 L35 53 L27 53 Z" strokeWidth="0.6" opacity="0.5" />
        <path d="M43 45 L55 45 L55 55 L43 55 Z" strokeWidth="1" />
        <path d="M61 45 L73 45 L73 55 L61 55 Z" strokeWidth="1" />
        <path d="M79 45 L92 45 L92 55 L79 55 Z" strokeWidth="1" />
        <path d="M81 47 L90 47 L90 53 L81 53 Z" strokeWidth="0.6" opacity="0.5" />

        {/* Row 4 */}
        <path d="M8 61 L19 61 L19 72 L8 72 Z" strokeWidth="1" />
        <path d="M10 63 L17 63 L17 70 L10 70 Z" strokeWidth="0.6" opacity="0.5" />
        <path d="M25 61 L37 61 L37 72 L25 72 Z" strokeWidth="1" />
        <path d="M43 61 L55 61 L55 72 L43 72 Z" strokeWidth="1" />
        <path d="M61 61 L73 61 L73 72 L61 72 Z" strokeWidth="1" />
        <path d="M63 63 L71 63 L71 70 L63 70 Z" strokeWidth="0.6" opacity="0.5" />
        <path d="M79 61 L92 61 L92 72 L79 72 Z" strokeWidth="1" />

        {/* Row 5 */}
        <path d="M8 78 L19 78 L19 87 L8 87 Z" strokeWidth="1" />
        <path d="M25 78 L37 78 L37 87 L25 87 Z" strokeWidth="1" />
        <path d="M43 78 L55 78 L55 87 L43 87 Z" strokeWidth="1" />
        <path d="M61 78 L73 78 L73 87 L61 87 Z" strokeWidth="1" />
        <path d="M79 78 L92 78 L92 87 L79 87 Z" strokeWidth="1" />

        {/* Concrete texture */}
        <path d="M12 18 L14 16" strokeWidth="0.3" opacity="0.3" />
        <path d="M48 50 L50 48" strokeWidth="0.3" opacity="0.3" />
        <path d="M65 65 L67 67" strokeWidth="0.3" opacity="0.3" />
      </g>
    </g>
  </svg>
)

// Export mapping for all 20 floor elements
export const FLOOR_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'accessibility-ramp': AccessibilityRampSVG,
  'baluster': BalusterSVG,
  'cantilevered-stair': CantileveredStairSVG,
  'flagstone': FlagstoneSVG,
  'grand-staircase': GrandStaircaseSVG,
  'handrail': HandrailSVG,
  'helical-ramp': HelicalRampSVG,
  'landing': LandingSVG,
  'mosaic-floor': MosaicFloorSVG,
  'newel-post': NewelPostSVG,
  'opus-sectile': OpusSectileSVG,
  'parquet': ParquetSVG,
  'perron': PerronSVG,
  'riser': RiserSVG,
  'spiral-stair': SpiralStairSVG,
  'stringer': StringerSVG,
  'tatami': TatamiSVG,
  'terrazzo': TerrazzoSVG,
  'tread': TreadSVG,
  'waffle-slab': WaffleSlabSVG,
}

export {
  AccessibilityRampSVG,
  BalusterSVG,
  CantileveredStairSVG,
  FlagstoneSVG,
  GrandStaircaseSVG,
  HandrailSVG,
  HelicalRampSVG,
  LandingSVG,
  MosaicFloorSVG,
  NewelPostSVG,
  OpusSectileSVG,
  ParquetSVG,
  PerronSVG,
  RiserSVG,
  SpiralStairSVG,
  StringerSVG,
  TatamiSVG,
  TerrazzoSVG,
  TreadSVG,
  WaffleSlabSVG,
}
