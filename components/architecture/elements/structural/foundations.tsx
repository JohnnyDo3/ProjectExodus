'use client'

import React from 'react'
import { HaloFilter, SVGProps } from './shared'

// =============================================================================
// FOUNDATION TYPES - Structural Support Systems
// =============================================================================

/**
 * SPREAD FOOTING (Isolated Footing) - Single column pad
 * The most basic foundation type for individual columns
 * Shows: Column sitting on flared concrete pad in soil
 * Used for: Light to moderate loads, good soil conditions
 */
export const SpreadFootingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="spread-footing-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#spread-footing-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground level line */}
      <g strokeWidth="1.5">
        <path d="M5 45 L95 45" />
      </g>

      {/* Soil pattern below ground */}
      <g strokeWidth="0.5" opacity="0.3">
        <path d="M10 55 L15 55" />
        <path d="M25 60 L30 60" />
        <path d="M45 52 L50 52" />
        <path d="M60 58 L65 58" />
        <path d="M75 54 L80 54" />
        <path d="M20 70 L25 70" />
        <path d="M50 72 L55 72" />
        <path d="M70 68 L75 68" />
      </g>

      {/* THE SPREAD FOOTING - Key feature: flared pad distributing load */}
      <g strokeWidth="2">
        {/* Footing pad */}
        <path d="M25 70 L75 70 L75 80 L25 80 Z" />
        {/* Pedestal/column base transition */}
        <path d="M40 55 L60 55 L60 70 L40 70 Z" />
      </g>

      {/* Column above */}
      <g strokeWidth="2.5">
        <path d="M42 10 L58 10 L58 55 L42 55 Z" />
      </g>

      {/* Reinforcement indication */}
      <g strokeWidth="0.8" opacity="0.5">
        <path d="M28 75 L72 75" strokeDasharray="3 2" />
        <path d="M30 72 L30 78" />
        <path d="M40 72 L40 78" />
        <path d="M50 72 L50 78" />
        <path d="M60 72 L60 78" />
        <path d="M70 72 L70 78" />
      </g>

      {/* Load arrow */}
      <g strokeWidth="1" opacity="0.6">
        <path d="M50 5 L50 15" />
        <path d="M50 15 L47 12" />
        <path d="M50 15 L53 12" />
      </g>

      {/* Pressure distribution arrows */}
      <g strokeWidth="0.6" opacity="0.4">
        <path d="M30 82 L30 88" />
        <path d="M40 82 L40 90" />
        <path d="M50 82 L50 92" />
        <path d="M60 82 L60 90" />
        <path d="M70 82 L70 88" />
      </g>
    </g>
  </svg>
)

/**
 * STRIP FOOTING (Continuous Footing) - Linear under walls
 * Foundation running continuously under load-bearing walls
 * Shows: Wall sitting on continuous rectangular footing
 * Used for: Residential, load-bearing masonry walls
 */
export const StripFootingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="strip-footing-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#strip-footing-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground level */}
      <g strokeWidth="1.5">
        <path d="M5 50 L95 50" />
      </g>

      {/* Soil pattern */}
      <g strokeWidth="0.5" opacity="0.3">
        <path d="M10 58 L15 58" />
        <path d="M30 62 L35 62" />
        <path d="M55 56 L60 56" />
        <path d="M75 60 L80 60" />
        <path d="M20 72 L25 72" />
        <path d="M65 70 L70 70" />
      </g>

      {/* THE STRIP FOOTING - Key feature: continuous linear foundation */}
      <g strokeWidth="2">
        {/* Continuous footing (shown in perspective) */}
        <path d="M10 68 L90 68 L90 78 L10 78 Z" />
        {/* 3D depth indication */}
        <path d="M10 68 L5 63 L85 63 L90 68" />
        <path d="M85 63 L85 73 L90 78" />
      </g>

      {/* Wall above */}
      <g strokeWidth="2">
        <path d="M22 50 L78 50 L78 68 L22 68 Z" />
        {/* 3D depth of wall */}
        <path d="M22 50 L17 45 L73 45 L78 50" />
        <path d="M73 45 L73 63 L78 68" />
      </g>

      {/* Wall construction lines (brick/block courses) */}
      <g strokeWidth="0.5" opacity="0.4">
        <path d="M22 56 L78 56" />
        <path d="M22 62 L78 62" />
        <path d="M35 50 L35 68" />
        <path d="M50 50 L50 68" />
        <path d="M65 50 L65 68" />
      </g>

      {/* Reinforcement in footing */}
      <g strokeWidth="0.6" opacity="0.5" strokeDasharray="2 2">
        <path d="M15 73 L85 73" />
      </g>

      {/* Load distribution */}
      <g strokeWidth="0.5" opacity="0.4">
        <path d="M25 80 L25 85" />
        <path d="M50 80 L50 88" />
        <path d="M75 80 L75 85" />
      </g>
    </g>
  </svg>
)

/**
 * COMBINED FOOTING - Single footing under multiple columns
 * Used when columns are close together or at property line
 * Shows: Two columns on one elongated footing
 * Prevents overlapping individual footings
 */
export const CombinedFootingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="combined-footing-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#combined-footing-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground level */}
      <g strokeWidth="1.5">
        <path d="M5 50 L95 50" />
      </g>

      {/* Soil pattern */}
      <g strokeWidth="0.5" opacity="0.3">
        <path d="M15 58 L20 58" />
        <path d="M40 62 L45 62" />
        <path d="M70 56 L75 56" />
        <path d="M25 75 L30 75" />
        <path d="M60 72 L65 72" />
      </g>

      {/* THE COMBINED FOOTING - Key feature: one pad, multiple columns */}
      <g strokeWidth="2">
        {/* Single elongated footing */}
        <path d="M12 70 L88 70 L88 82 L12 82 Z" />
      </g>

      {/* Two columns */}
      <g strokeWidth="2.5">
        {/* Left column */}
        <path d="M22 10 L38 10 L38 50 L22 50 Z" />
        <path d="M22 50 L22 70 L38 70 L38 50" strokeWidth="2" />

        {/* Right column */}
        <path d="M62 10 L78 10 L78 50 L62 50 Z" />
        <path d="M62 50 L62 70 L78 70 L78 50" strokeWidth="2" />
      </g>

      {/* Reinforcement grid */}
      <g strokeWidth="0.6" opacity="0.5" strokeDasharray="2 2">
        <path d="M16 76 L84 76" />
        <path d="M30 72 L30 80" />
        <path d="M50 72 L50 80" />
        <path d="M70 72 L70 80" />
      </g>

      {/* Load arrows */}
      <g strokeWidth="1" opacity="0.6">
        <path d="M30 5 L30 12" />
        <path d="M30 12 L27 9 M30 12 L33 9" />
        <path d="M70 5 L70 12" />
        <path d="M70 12 L67 9 M70 12 L73 9" />
      </g>

      {/* Center of gravity indicator */}
      <g strokeWidth="0.8" opacity="0.4">
        <path d="M50 70 L50 85" strokeDasharray="3 2" />
        <circle cx="50" cy="76" r="2" />
      </g>
    </g>
  </svg>
)

/**
 * MAT FOUNDATION (Raft Foundation) - Full building slab
 * Entire building sits on one thick reinforced slab
 * Shows: Building footprint as single thick slab
 * Used for: Weak soils, heavy loads, high water table
 */
export const MatFoundationSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="mat-foundation-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#mat-foundation-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground level */}
      <g strokeWidth="1.5">
        <path d="M5 55 L95 55" />
      </g>

      {/* Soil pattern */}
      <g strokeWidth="0.5" opacity="0.3">
        <path d="M10 65 L15 65" />
        <path d="M30 70 L35 70" />
        <path d="M55 68 L60 68" />
        <path d="M80 72 L85 72" />
        <path d="M20 80 L25 80" />
        <path d="M65 78 L70 78" />
      </g>

      {/* THE MAT FOUNDATION - Key feature: full coverage thick slab */}
      <g strokeWidth="2.5">
        {/* Thick mat slab */}
        <path d="M8 60 L92 60 L92 75 L8 75 Z" />
      </g>

      {/* Multiple columns on mat */}
      <g strokeWidth="2">
        {/* Column 1 */}
        <path d="M15 30 L25 30 L25 60 L15 60 Z" />
        {/* Column 2 */}
        <path d="M35 30 L45 30 L45 60 L35 60 Z" />
        {/* Column 3 */}
        <path d="M55 30 L65 30 L65 60 L55 60 Z" />
        {/* Column 4 */}
        <path d="M75 30 L85 30 L85 60 L75 60 Z" />
      </g>

      {/* Building superstructure suggestion */}
      <g strokeWidth="1.5" opacity="0.5">
        <path d="M12 30 L88 30" />
        <path d="M12 15 L88 15" />
        <path d="M12 15 L12 30" />
        <path d="M88 15 L88 30" />
      </g>

      {/* Reinforcement grid in mat */}
      <g strokeWidth="0.5" opacity="0.4" strokeDasharray="2 2">
        <path d="M12 65 L88 65" />
        <path d="M12 70 L88 70" />
        <path d="M20 62 L20 73" />
        <path d="M40 62 L40 73" />
        <path d="M60 62 L60 73" />
        <path d="M80 62 L80 73" />
      </g>

      {/* Uniform pressure distribution */}
      <g strokeWidth="0.5" opacity="0.35">
        <path d="M15 77 L15 82" />
        <path d="M30 77 L30 82" />
        <path d="M45 77 L45 82" />
        <path d="M60 77 L60 82" />
        <path d="M75 77 L75 82" />
        <path d="M90 77 L90 82" />
      </g>
    </g>
  </svg>
)

/**
 * DRIVEN PILE Foundation - Deep foundation hammered into ground
 * Piles driven by impact hammer, displaces soil
 * Shows: Pile cap with deep driven piles penetrating soil layers
 * Used for: Deep bearing capacity, poor surface soils
 */
export const DrivenPileSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="driven-pile-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#driven-pile-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground level */}
      <g strokeWidth="1.5">
        <path d="M5 30 L95 30" />
      </g>

      {/* Soil layers */}
      <g strokeWidth="0.8" opacity="0.3">
        {/* Soft soil layer */}
        <path d="M5 45 L95 45" strokeDasharray="5 3" />
        {/* Medium layer */}
        <path d="M5 65 L95 65" strokeDasharray="5 3" />
        {/* Bearing layer (denser pattern) */}
        <path d="M5 85 L95 85" />
        <g opacity="0.5">
          <path d="M10 88 L15 88" />
          <path d="M25 90 L30 90" />
          <path d="M45 88 L50 88" />
          <path d="M65 90 L70 90" />
          <path d="M85 88 L90 88" />
        </g>
      </g>

      {/* Pile cap */}
      <g strokeWidth="2">
        <path d="M20 28 L80 28 L80 38 L20 38 Z" />
      </g>

      {/* Column above */}
      <g strokeWidth="2.5">
        <path d="M42 8 L58 8 L58 28 L42 28 Z" />
      </g>

      {/* THE DRIVEN PILES - Key feature: pointed tips, driven deep */}
      <g strokeWidth="2.5">
        {/* Left pile */}
        <path d="M28 38 L28 82 L32 88 L36 82 L36 38" />
        {/* Middle pile */}
        <path d="M46 38 L46 82 L50 88 L54 82 L54 38" />
        {/* Right pile */}
        <path d="M64 38 L64 82 L68 88 L72 82 L72 38" />
      </g>

      {/* Driving direction indicators */}
      <g strokeWidth="0.6" opacity="0.4">
        <path d="M32 50 L32 60" />
        <path d="M32 60 L30 57 M32 60 L34 57" />
        <path d="M50 50 L50 60" />
        <path d="M50 60 L48 57 M50 60 L52 57" />
        <path d="M68 50 L68 60" />
        <path d="M68 60 L66 57 M68 60 L70 57" />
      </g>

      {/* Soil displacement indication */}
      <g strokeWidth="0.5" opacity="0.3">
        <path d="M24 50 Q20 55, 24 60" />
        <path d="M40 55 Q44 60, 40 65" />
        <path d="M76 50 Q80 55, 76 60" />
      </g>
    </g>
  </svg>
)

/**
 * BORED PILE (Drilled Shaft) - Deep foundation excavated in place
 * Hole drilled, then filled with concrete and reinforcement
 * Shows: Cylindrical pile with reinforcement cage
 * Used for: Large loads, where vibration must be minimized
 */
export const BoredPileSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="bored-pile-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#bored-pile-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground level */}
      <g strokeWidth="1.5">
        <path d="M5 25 L95 25" />
      </g>

      {/* Soil layers */}
      <g strokeWidth="0.8" opacity="0.3">
        <path d="M5 40 L35 40 M65 40 L95 40" strokeDasharray="5 3" />
        <path d="M5 60 L35 60 M65 60 L95 60" strokeDasharray="5 3" />
        <path d="M5 80 L35 80 M65 80 L95 80" />
      </g>

      {/* Pile cap */}
      <g strokeWidth="2">
        <path d="M30 22 L70 22 L70 32 L30 32 Z" />
      </g>

      {/* Column */}
      <g strokeWidth="2.5">
        <path d="M42 5 L58 5 L58 22 L42 22 Z" />
      </g>

      {/* THE BORED PILE - Key feature: cylindrical, cast in place */}
      <g strokeWidth="2">
        {/* Pile shaft (cylindrical - shown with parallel sides) */}
        <path d="M38 32 L38 88" />
        <path d="M62 32 L62 88" />
        {/* Bottom of pile (flat or slightly belled) */}
        <path d="M38 88 Q50 92, 62 88" />
      </g>

      {/* Reinforcement cage inside */}
      <g strokeWidth="0.8" opacity="0.6" strokeDasharray="3 2">
        {/* Vertical rebar */}
        <path d="M42 35 L42 85" />
        <path d="M50 35 L50 85" />
        <path d="M58 35 L58 85" />
        {/* Horizontal ties */}
        <path d="M40 45 L60 45" />
        <path d="M40 60 L60 60" />
        <path d="M40 75 L60 75" />
      </g>

      {/* Drilling indication */}
      <g strokeWidth="0.5" opacity="0.4">
        <path d="M50 35 L50 42" />
        <path d="M47 42 L53 42" />
        <path d="M48 44 L52 44" />
      </g>

      {/* Concrete pour indication */}
      <g strokeWidth="0.6" opacity="0.35">
        <circle cx="45" cy="55" r="1.5" />
        <circle cx="55" cy="50" r="1" />
        <circle cx="48" cy="70" r="1.2" />
        <circle cx="54" cy="65" r="1" />
      </g>
    </g>
  </svg>
)

/**
 * CAISSON FOUNDATION (Pier Foundation) - Large diameter deep shaft
 * Large enough for workers to enter and excavate
 * Shows: Wide cylindrical shaft, often with bell bottom
 * Used for: Bridge piers, very heavy loads, deep bearing
 */
export const CaissonFoundationSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="caisson-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#caisson-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground/water level */}
      <g strokeWidth="1.5">
        <path d="M5 20 L95 20" />
      </g>

      {/* Water indication (if underwater caisson) */}
      <g strokeWidth="0.4" opacity="0.2">
        <path d="M8 22 Q12 24, 16 22 Q20 20, 24 22" />
        <path d="M76 22 Q80 24, 84 22 Q88 20, 92 22" />
      </g>

      {/* Soil/rock layers */}
      <g strokeWidth="0.8" opacity="0.3">
        <path d="M5 45 L25 45 M75 45 L95 45" strokeDasharray="4 2" />
        <path d="M5 70 L25 70 M75 70 L95 70" />
        {/* Rock layer indication */}
        <path d="M8 75 L12 78 L16 75 L20 78" />
        <path d="M80 75 L84 78 L88 75 L92 78" />
      </g>

      {/* THE CAISSON - Key feature: large diameter, belled bottom */}
      <g strokeWidth="2.5">
        {/* Main shaft */}
        <path d="M30 18 L30 72" />
        <path d="M70 18 L70 72" />
        {/* Bell (enlarged bottom) */}
        <path d="M30 72 Q30 80, 22 85 Q50 95, 78 85 Q70 80, 70 72" />
      </g>

      {/* Cap/pier above */}
      <g strokeWidth="2">
        <path d="M25 8 L75 8 L75 18 L25 18 Z" />
      </g>

      {/* Internal working chamber indication */}
      <g strokeWidth="0.8" opacity="0.4">
        <path d="M35 30 L65 30" strokeDasharray="3 2" />
        <path d="M35 50 L65 50" strokeDasharray="3 2" />
        {/* Cutting edge at bottom */}
        <path d="M28 85 L35 78 L50 82 L65 78 L72 85" strokeWidth="1.2" />
      </g>

      {/* Access shaft indication */}
      <g strokeWidth="1" opacity="0.5">
        <path d="M45 8 L45 30" />
        <path d="M55 8 L55 30" />
      </g>

      {/* Load arrows */}
      <g strokeWidth="0.8" opacity="0.5">
        <path d="M50 3 L50 10" />
        <path d="M50 10 L47 7 M50 10 L53 7" />
      </g>
    </g>
  </svg>
)

/**
 * FLOATING FOUNDATION (Compensated Foundation)
 * Weight of excavated soil = weight of building
 * Shows: Deep basement where excavation compensates building weight
 * Used for: Very soft soils, minimizes settlement
 */
export const FloatingFoundationSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="floating-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#floating-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground level */}
      <g strokeWidth="1.5">
        <path d="M5 40 L20 40 M80 40 L95 40" />
      </g>

      {/* Soil around excavation */}
      <g strokeWidth="0.5" opacity="0.3">
        <path d="M8 50 L15 50" />
        <path d="M85 55 L92 55" />
        <path d="M10 65 L17 65" />
        <path d="M83 70 L90 70" />
      </g>

      {/* THE FLOATING FOUNDATION - Key feature: deep box in soil */}
      <g strokeWidth="2">
        {/* Deep basement box */}
        <path d="M22 40 L22 85 L78 85 L78 40" />
        {/* Mat at bottom */}
        <path d="M22 85 L78 85 L78 92 L22 92 Z" strokeWidth="2.5" />
      </g>

      {/* Building above ground */}
      <g strokeWidth="2">
        <path d="M22 40 L78 40 L78 15 L22 15 Z" />
        {/* Floor lines */}
        <path d="M22 27 L78 27" strokeWidth="1" opacity="0.5" />
      </g>

      {/* Basement levels */}
      <g strokeWidth="1" opacity="0.5">
        <path d="M22 55 L78 55" />
        <path d="M22 70 L78 70" />
      </g>

      {/* Weight balance indication - excavated vs building */}
      <g strokeWidth="0.8" opacity="0.4">
        {/* Excavated soil weight (upward) */}
        <path d="M12 60 L12 50" />
        <path d="M12 50 L10 53 M12 50 L14 53" />
        <path d="M88 60 L88 50" />
        <path d="M88 50 L86 53 M88 50 L90 53" />

        {/* Building weight (downward) */}
        <path d="M50 10 L50 18" />
        <path d="M50 18 L47 15 M50 18 L53 15" />
      </g>

      {/* Balance symbol */}
      <g strokeWidth="0.6" opacity="0.5">
        <path d="M5 88 L5 93" />
        <path d="M3 93 L7 93" />
        <text x="5" y="98" fontSize="4" textAnchor="middle" fill="currentColor" opacity="0.5">≈</text>
      </g>

      {/* Soil displacement arrows showing no net change */}
      <g strokeWidth="0.5" opacity="0.3">
        <path d="M20 75 Q15 75, 15 80" />
        <path d="M80 75 Q85 75, 85 80" />
      </g>
    </g>
  </svg>
)

/**
 * RUBBLE TRENCH FOUNDATION - Stone-filled drainage trench
 * Historical technique, revived in sustainable building
 * Shows: Trench filled with gravel/rubble, wall above
 * Used for: Eco-building, good drainage, frost protection
 */
export const RubbleTrenchSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="rubble-trench-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#rubble-trench-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground level */}
      <g strokeWidth="1.5">
        <path d="M5 45 L30 45 M70 45 L95 45" />
      </g>

      {/* Soil on sides */}
      <g strokeWidth="0.5" opacity="0.3">
        <path d="M8 55 L15 55" />
        <path d="M10 65 L18 65" />
        <path d="M82 55 L90 55" />
        <path d="M85 65 L92 65" />
      </g>

      {/* Trench outline */}
      <g strokeWidth="1.5">
        <path d="M30 45 L30 85 L70 85 L70 45" />
      </g>

      {/* THE RUBBLE FILL - Key feature: stone/gravel in trench */}
      <g strokeWidth="0.8" opacity="0.7">
        {/* Rubble stones (irregular shapes) */}
        <ellipse cx="38" cy="78" rx="5" ry="3" />
        <ellipse cx="50" cy="80" rx="6" ry="4" />
        <ellipse cx="62" cy="77" rx="5" ry="3" />
        <ellipse cx="42" cy="70" rx="4" ry="3" />
        <ellipse cx="55" cy="72" rx="5" ry="3" />
        <ellipse cx="35" cy="62" rx="3" ry="2" />
        <ellipse cx="48" cy="65" rx="5" ry="3" />
        <ellipse cx="60" cy="63" rx="4" ry="2.5" />
        <ellipse cx="40" cy="55" rx="4" ry="2.5" />
        <ellipse cx="52" cy="57" rx="4" ry="3" />
        <ellipse cx="64" cy="55" rx="3" ry="2" />
      </g>

      {/* Grade beam on top */}
      <g strokeWidth="2">
        <path d="M28 42 L72 42 L72 50 L28 50 Z" />
      </g>

      {/* Wall above */}
      <g strokeWidth="2">
        <path d="M35 15 L65 15 L65 42 L35 42 Z" />
      </g>

      {/* Wall texture (natural materials) */}
      <g strokeWidth="0.5" opacity="0.4">
        <path d="M35 25 L65 25" />
        <path d="M35 35 L65 35" />
        <path d="M45 15 L45 42" />
        <path d="M55 15 L55 42" />
      </g>

      {/* Drainage pipe at bottom */}
      <g strokeWidth="1" opacity="0.6">
        <ellipse cx="50" cy="88" rx="8" ry="3" />
        <path d="M42 88 L42 85" strokeDasharray="2 1" />
        <path d="M58 88 L58 85" strokeDasharray="2 1" />
      </g>

      {/* Water drainage arrows */}
      <g strokeWidth="0.5" opacity="0.4">
        <path d="M35 52 L35 58" />
        <path d="M35 58 L33 55 M35 58 L37 55" />
        <path d="M65 52 L65 58" />
        <path d="M65 58 L63 55 M65 58 L67 55" />
        <path d="M50 82 L50 86" />
      </g>
    </g>
  </svg>
)

/**
 * HELICAL PILE (Screw Pile) - Steel shaft with helical plates
 * Screwed into ground, minimal disturbance
 * Shows: Shaft with spiral helix plates, rotation indication
 * Used for: Residential, retrofitting, difficult soils, quick install
 */
export const HelicalPileSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="helical-pile-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#helical-pile-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground level */}
      <g strokeWidth="1.5">
        <path d="M5 30 L40 30 M60 30 L95 30" />
      </g>

      {/* Soil layers */}
      <g strokeWidth="0.5" opacity="0.3">
        <path d="M10 45 L35 45 M65 45 L90 45" />
        <path d="M10 60 L35 60 M65 60 L90 60" />
        <path d="M10 75 L35 75 M65 75 L90 75" />
      </g>

      {/* Structure above */}
      <g strokeWidth="2">
        <path d="M40 10 L60 10 L60 30 L40 30 Z" />
      </g>

      {/* Cap/bracket */}
      <g strokeWidth="2">
        <path d="M42 25 L58 25 L58 32 L42 32 Z" />
      </g>

      {/* STEEL SHAFT - Central element */}
      <g strokeWidth="2.5">
        <path d="M50 32 L50 90" />
      </g>

      {/* HELICAL PLATES - Key feature: spiral blades */}
      <g strokeWidth="2">
        {/* Top helix */}
        <ellipse cx="50" cy="45" rx="15" ry="5" />
        {/* Middle helix */}
        <ellipse cx="50" cy="62" rx="18" ry="6" />
        {/* Bottom helix (largest) */}
        <ellipse cx="50" cy="80" rx="20" ry="7" />
      </g>

      {/* Helix pitch indicators (3D spiral suggestion) */}
      <g strokeWidth="1" opacity="0.5">
        <path d="M35 45 L50 42" />
        <path d="M32 62 L50 58" />
        <path d="M30 80 L50 75" />
      </g>

      {/* Rotation direction indicator */}
      <g strokeWidth="1.2" opacity="0.6">
        <path d="M70 15 Q80 10, 85 20" />
        <path d="M85 20 L82 17 M85 20 L88 17" />
        <text x="78" y="8" fontSize="4" fill="currentColor">ROTATE</text>
      </g>

      {/* Pilot point at tip */}
      <g strokeWidth="1.5">
        <path d="M50 90 L47 95 L50 98 L53 95 Z" />
      </g>

      {/* Bearing capacity zones */}
      <g strokeWidth="0.6" opacity="0.3" strokeDasharray="2 2">
        <ellipse cx="50" cy="80" rx="25" ry="9" />
      </g>
    </g>
  </svg>
)

/**
 * MICROPILE - Small-diameter drilled and grouted pile
 * High capacity in constrained spaces
 * Shows: Narrow steel core in grout, threaded connections
 * Used for: Underpinning, retrofits, limited access, high loads in small footprint
 */
export const MicropileSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="micropile-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#micropile-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground level and existing structure */}
      <g strokeWidth="1.5">
        <path d="M5 35 L35 35 M65 35 L95 35" />
      </g>

      {/* Existing footing being underpinned */}
      <g strokeWidth="2" opacity="0.7">
        <path d="M30 25 L70 25 L70 38 L30 38 Z" />
        <text x="50" y="33" fontSize="4" textAnchor="middle" fill="currentColor" opacity="0.5">EXISTING</text>
      </g>

      {/* Soil layers */}
      <g strokeWidth="0.5" opacity="0.3">
        <path d="M10 50 L35 50 M65 50 L90 50" />
        <path d="M10 65 L35 65 M65 65 L90 65" />
        <path d="M10 80 L35 80 M65 80 L90 80" />
      </g>

      {/* Bearing stratum at bottom */}
      <g strokeWidth="0.8" opacity="0.4">
        <path d="M5 90 L95 90" />
        <text x="85" y="88" fontSize="3" fill="currentColor">ROCK</text>
      </g>

      {/* GROUT COLUMN - Outer casing */}
      <g strokeWidth="1.5" opacity="0.6">
        <path d="M45 38 L45 92" />
        <path d="M55 38 L55 92" />
      </g>

      {/* STEEL CORE - Key feature: high-strength bar */}
      <g strokeWidth="2.5">
        <path d="M50 28 L50 95" />
      </g>

      {/* Thread/coupler indication */}
      <g strokeWidth="0.8" opacity="0.7">
        <path d="M48 50 L52 50" />
        <path d="M48 52 L52 52" />
        <path d="M48 54 L52 54" />
        <path d="M48 70 L52 70" />
        <path d="M48 72 L52 72" />
        <path d="M48 74 L52 74" />
      </g>

      {/* Grout texture */}
      <g strokeWidth="0.5" opacity="0.3">
        <path d="M46 45 L54 45" />
        <path d="M46 60 L54 60" />
        <path d="M46 85 L54 85" />
      </g>

      {/* Bond zone (enlarged grout in bearing stratum) */}
      <g strokeWidth="1.5">
        <path d="M42 85 Q40 88, 42 92 L50 95 L58 92 Q60 88, 58 85" />
      </g>

      {/* Drill rig hint (small scale indication) */}
      <g strokeWidth="0.8" opacity="0.4">
        <path d="M50 15 L50 25" />
        <path d="M45 15 L55 15 L55 18 L45 18 Z" />
        <path d="M48 12 L48 15" />
        <path d="M52 12 L52 15" />
      </g>

      {/* Diameter indication */}
      <g strokeWidth="0.6" opacity="0.5">
        <path d="M38 55 L45 55" />
        <path d="M55 55 L62 55" />
        <path d="M38 55 L40 53 M38 55 L40 57" />
        <path d="M62 55 L60 53 M62 55 L60 57" />
        <text x="50" y="60" fontSize="3" textAnchor="middle" fill="currentColor">150-300mm</text>
      </g>
    </g>
  </svg>
)

// =============================================================================
// FOUNDATION TYPES EXPORT
// =============================================================================

export const FOUNDATION_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'spread-footing': SpreadFootingSVG,
  'strip-footing': StripFootingSVG,
  'combined-footing': CombinedFootingSVG,
  'mat-foundation': MatFoundationSVG,
  'driven-pile': DrivenPileSVG,
  'bored-pile': BoredPileSVG,
  'caisson-foundation': CaissonFoundationSVG,
  'floating-foundation': FloatingFoundationSVG,
  'rubble-trench': RubbleTrenchSVG,
  'helical-pile': HelicalPileSVG,
  'micropile': MicropileSVG,
}
