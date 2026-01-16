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
 * ACCESSIBILITY RAMP - ADA-compliant wheelchair ramp with handrails
 * 3D PERSPECTIVE: Side view showing gentle slope and safety rails
 * Shows: Gradual incline, double handrails, non-slip surface, landing
 * Distinct: Long gentle slope (1:12 ratio), continuous handrails both sides
 */
const AccessibilityRampSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="ramp-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#ramp-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Building entrance and ground */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.7">
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
      {/* CONTEXT - Adjacent balusters and rail */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.7">
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
      {/* CONTEXT - Wall surface */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.7">
        <path d="M90 5 L90 95" />
        <path d="M92 10 L92 90" />
        <path d="M95 5 L95 95" />
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
        <path d="M20 82 L20 10" strokeWidth="0.8" strokeDasharray="4 2" opacity="0.5" />
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
      {/* CONTEXT - Garden border plants */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.7">
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
      {/* CONTEXT - Upper gallery and chandelier */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.7">
        <path d="M20 5 L80 5 L80 15 L20 15 Z" />
        <path d="M50 5 L50 0" />
        <ellipse cx="50" cy="25" rx="8" ry="3" />
        <path d="M47 25 L47 28" />
        <path d="M53 25 L53 28" />
      </g>

      {/* PRIMARY - Grand sweeping staircase */}
      <g strokeWidth="1.2">
        {/* Upper landing / gallery level */}
        <path d="M15 18 L85 18 L88 22 L12 22 Z" strokeWidth="1.8" />

        {/* Left stair flight descending */}
        <path d="M12 22 L12 35 L5 45 L5 95 L35 95 L35 65" strokeWidth="1.5" />
        {/* Left treads */}
        <path d="M12 28 L30 28" strokeWidth="1.2" />
        <path d="M10 35 L28 35" strokeWidth="1.2" />
        <path d="M8 42 L26 42" strokeWidth="1.2" />
        <path d="M6 50 L24 50" strokeWidth="1.1" />
        <path d="M5 58 L22 58" strokeWidth="1.1" />
        <path d="M5 66 L20 66" strokeWidth="1" />
        <path d="M5 74 L18 74" strokeWidth="1" />
        <path d="M5 82 L35 82" strokeWidth="1" />

        {/* Right stair flight descending */}
        <path d="M88 22 L88 35 L95 45 L95 95 L65 95 L65 65" strokeWidth="1.5" />
        {/* Right treads */}
        <path d="M70 28 L88 28" strokeWidth="1.2" />
        <path d="M72 35 L90 35" strokeWidth="1.2" />
        <path d="M74 42 L92 42" strokeWidth="1.2" />
        <path d="M76 50 L94 50" strokeWidth="1.1" />
        <path d="M78 58 L95 58" strokeWidth="1.1" />
        <path d="M80 66 L95 66" strokeWidth="1" />
        <path d="M82 74 L95 74" strokeWidth="1" />
        <path d="M65 82 L95 82" strokeWidth="1" />

        {/* Central landing platform */}
        <path d="M35 65 L65 65 L65 95 L35 95 Z" strokeWidth="1.6" />
        <path d="M40 75 L60 75 L60 90 L40 90 Z" strokeWidth="0.8" opacity="0.4" />

        {/* Left balustrade rail */}
        <path d="M12 15 L5 40 L5 60" strokeWidth="1.8" />
        <path d="M35 60 L35 95" strokeWidth="1.5" />

        {/* Right balustrade rail */}
        <path d="M88 15 L95 40 L95 60" strokeWidth="1.8" />
        <path d="M65 60 L65 95" strokeWidth="1.5" />

        {/* Newel posts */}
        <circle cx="12" cy="15" r="3" strokeWidth="1.5" />
        <circle cx="88" cy="15" r="3" strokeWidth="1.5" />
        <circle cx="35" cy="65" r="2.5" strokeWidth="1.3" />
        <circle cx="65" cy="65" r="2.5" strokeWidth="1.3" />

        {/* Balusters suggestion */}
        <path d="M10 20 L7 35" strokeWidth="0.7" />
        <path d="M8 25 L6 40" strokeWidth="0.7" />
        <path d="M90 20 L93 35" strokeWidth="0.7" />
        <path d="M92 25 L94 40" strokeWidth="0.7" />

        {/* Carpet runner */}
        <path d="M18 22 L18 35 L12 48" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.4" />
        <path d="M82 22 L82 35 L88 48" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.4" />
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
      {/* CONTEXT - Wall surface */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.7">
        <path d="M95 5 L95 95" />
        <path d="M92 10 L92 90" />
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
      {/* CONTEXT - Skylight at top */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.7">
        <circle cx="50" cy="50" r="8" />
        <path d="M45 50 L55 50" />
        <path d="M50 45 L50 55" />
      </g>

      {/* PRIMARY - Helical ramp spiraling upward */}
      <g strokeWidth="1.2">
        {/* Outer wall of spiral */}
        <circle cx="50" cy="50" r="45" strokeWidth="1.8" />

        {/* Inner edge of ramp (central void) */}
        <circle cx="50" cy="50" r="15" strokeWidth="1.5" />

        {/* Spiral ramp levels - showing the continuous rise */}
        {/* Level 1 - bottom (closest, widest stroke) */}
        <path d="M50 95 Q95 95, 95 50 Q95 20, 70 10" strokeWidth="2" />
        <path d="M50 80 Q80 80, 80 50 Q80 30, 65 20" strokeWidth="1.2" opacity="0.7" />

        {/* Level 2 */}
        <path d="M70 10 Q30 5, 10 40 Q5 70, 30 85" strokeWidth="1.8" />
        <path d="M65 20 Q35 15, 20 40 Q15 60, 35 72" strokeWidth="1.1" opacity="0.7" />

        {/* Level 3 */}
        <path d="M30 85 Q60 95, 85 70 Q95 45, 75 25" strokeWidth="1.6" />
        <path d="M35 72 Q55 80, 72 62 Q82 45, 68 32" strokeWidth="1" opacity="0.7" />

        {/* Level 4 */}
        <path d="M75 25 Q50 10, 25 30 Q10 50, 25 70" strokeWidth="1.4" />
        <path d="M68 32 Q50 20, 35 35 Q22 50, 35 62" strokeWidth="0.9" opacity="0.7" />

        {/* Level 5 - top (farthest, thinnest) */}
        <path d="M25 70 Q45 85, 70 65 Q85 50, 70 35" strokeWidth="1.2" />
        <path d="M35 62 Q48 72, 62 58 Q72 48, 62 40" strokeWidth="0.8" opacity="0.6" />

        {/* Ramp edge shadow lines */}
        <path d="M92 60 Q90 75, 75 85" strokeWidth="0.6" opacity="0.4" />
        <path d="M15 35 Q20 20, 40 12" strokeWidth="0.6" opacity="0.4" />

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
      {/* CONTEXT - Walls at corner */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.7">
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
      {/* CONTEXT - Room edges */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.7">
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
      {/* CONTEXT - Handrail meeting newel and floor */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.7">
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

// Export mapping for floor elements - Part 1-2 (elements 1-10)
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
}
