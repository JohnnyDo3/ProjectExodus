'use client'

import React from 'react'
import { HaloFilter, SVGProps } from './shared'

// =============================================================================
// LOAD TYPES - Forces Acting on Structures
// =============================================================================

/**
 * DEAD LOAD - Permanent weight of structure itself
 * Self-weight of beams, columns, slabs, finishes
 * Shows: Building with downward arrows from structural elements
 * Characteristic: Constant, predictable, calculable
 */
export const DeadLoadSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="dead-load-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#dead-load-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Building structure */}
      <g strokeWidth="2">
        {/* Foundation */}
        <path d="M15 88 L85 88 L85 95 L15 95 Z" />
        {/* Columns */}
        <path d="M20 35 L20 88" />
        <path d="M50 35 L50 88" />
        <path d="M80 35 L80 88" />
        {/* Beams/floors */}
        <path d="M15 35 L85 35" strokeWidth="3" />
        <path d="M15 60 L85 60" strokeWidth="2.5" />
        {/* Roof */}
        <path d="M10 35 L50 12 L90 35" strokeWidth="2.5" />
      </g>

      {/* DEAD LOAD ARROWS - Key feature: downward from structure itself */}
      <g strokeWidth="1.5" opacity="0.8">
        {/* Roof weight */}
        <path d="M30 22 L30 30" />
        <path d="M30 30 L28 27 M30 30 L32 27" />
        <path d="M50 15 L50 23" />
        <path d="M50 23 L48 20 M50 23 L52 20" />
        <path d="M70 22 L70 30" />
        <path d="M70 30 L68 27 M70 30 L72 27" />

        {/* Floor weight */}
        <path d="M30 38 L30 46" />
        <path d="M30 46 L28 43 M30 46 L32 43" />
        <path d="M50 38 L50 46" />
        <path d="M50 46 L48 43 M50 46 L52 43" />
        <path d="M70 38 L70 46" />
        <path d="M70 46 L68 43 M70 46 L72 43" />

        {/* Second floor weight */}
        <path d="M30 63 L30 71" />
        <path d="M30 71 L28 68 M30 71 L32 68" />
        <path d="M50 63 L50 71" />
        <path d="M50 71 L48 68 M50 71 L52 68" />
        <path d="M70 63 L70 71" />
        <path d="M70 71 L68 68 M70 71 L72 68" />
      </g>

      {/* Weight symbol */}
      <g strokeWidth="1.2" opacity="0.6">
        <circle cx="8" cy="50" r="5" />
        <path d="M5 50 L11 50" />
        <path d="M8 47 L8 53" />
      </g>

      {/* Label area */}
      <g opacity="0.4">
        <text x="50" y="8" fontSize="5" textAnchor="middle" fill="currentColor">PERMANENT</text>
      </g>
    </g>
  </svg>
)

/**
 * LIVE LOAD - Occupants, furniture, movable items
 * Variable loads from building use
 * Shows: People, furniture with downward arrows
 * Characteristic: Variable, code-specified minimums
 */
export const LiveLoadSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="live-load-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#live-load-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Building floor */}
      <g strokeWidth="2">
        <path d="M10 70 L90 70" />
        <path d="M10 70 L10 95" />
        <path d="M90 70 L90 95" />
        <path d="M10 95 L90 95" />
      </g>

      {/* LIVE LOAD ITEMS - Key feature: movable/variable */}
      {/* Person 1 */}
      <g strokeWidth="1.5">
        <circle cx="25" cy="52" r="5" />
        <path d="M25 57 L25 68" />
        <path d="M25 60 L20 65" />
        <path d="M25 60 L30 65" />
        <path d="M25 68 L22 75" />
        <path d="M25 68 L28 75" />
      </g>

      {/* Person 2 */}
      <g strokeWidth="1.5">
        <circle cx="45" cy="52" r="5" />
        <path d="M45 57 L45 68" />
        <path d="M45 60 L40 65" />
        <path d="M45 60 L50 65" />
        <path d="M45 68 L42 75" />
        <path d="M45 68 L48 75" />
      </g>

      {/* Furniture - desk */}
      <g strokeWidth="1.5">
        <path d="M60 62 L80 62 L80 68 L60 68 Z" />
        <path d="M62 68 L62 75" />
        <path d="M78 68 L78 75" />
      </g>

      {/* Box/equipment */}
      <g strokeWidth="1.5">
        <path d="M82 58 L92 58 L92 68 L82 68 Z" />
      </g>

      {/* LIVE LOAD ARROWS - Variable weight */}
      <g strokeWidth="1.2" opacity="0.7">
        <path d="M25 42 L25 48" />
        <path d="M25 48 L23 45 M25 48 L27 45" />
        <path d="M45 42 L45 48" />
        <path d="M45 48 L43 45 M45 48 L47 45" />
        <path d="M70 52 L70 60" />
        <path d="M70 60 L68 57 M70 60 L72 57" />
        <path d="M87 48 L87 56" />
        <path d="M87 56 L85 53 M87 56 L89 53" />
      </g>

      {/* Variable indicator (wavy) */}
      <g strokeWidth="0.8" opacity="0.5">
        <path d="M5 35 Q10 32, 15 35 Q20 38, 25 35" />
      </g>

      {/* Label */}
      <g opacity="0.4">
        <text x="50" y="8" fontSize="5" textAnchor="middle" fill="currentColor">VARIABLE</text>
      </g>
    </g>
  </svg>
)

/**
 * WIND LOAD - Lateral pressure from wind
 * Horizontal forces on building faces
 * Shows: Building with horizontal pressure arrows, suction on leeward
 * Characteristic: Lateral, can cause uplift on roofs
 */
export const WindLoadSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="wind-load-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#wind-load-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Building */}
      <g strokeWidth="2">
        <path d="M35 25 L65 25 L65 85 L35 85 Z" />
        {/* Roof */}
        <path d="M30 25 L50 10 L70 25" />
        {/* Windows */}
        <path d="M40 35 L48 35 L48 45 L40 45 Z" strokeWidth="1" opacity="0.5" />
        <path d="M52 35 L60 35 L60 45 L52 45 Z" strokeWidth="1" opacity="0.5" />
        <path d="M40 55 L48 55 L48 65 L40 65 Z" strokeWidth="1" opacity="0.5" />
        <path d="M52 55 L60 55 L60 65 L52 65 Z" strokeWidth="1" opacity="0.5" />
      </g>

      {/* Ground */}
      <g strokeWidth="1">
        <path d="M20 85 L80 85" />
      </g>

      {/* WIND PRESSURE - Key feature: horizontal arrows windward side */}
      <g strokeWidth="1.5">
        {/* Windward pressure (left side) - pushing */}
        <path d="M8 35 L32 35" />
        <path d="M32 35 L28 32 M32 35 L28 38" />
        <path d="M8 50 L32 50" />
        <path d="M32 50 L28 47 M32 50 L28 53" />
        <path d="M8 65 L32 65" />
        <path d="M32 65 L28 62 M32 65 L28 68" />
        <path d="M8 80 L32 80" />
        <path d="M32 80 L28 77 M32 80 L28 83" />
      </g>

      {/* Leeward suction (right side) - pulling */}
      <g strokeWidth="1.2" opacity="0.7">
        <path d="M68 35 L85 35" />
        <path d="M68 35 L72 32 M68 35 L72 38" />
        <path d="M68 50 L85 50" />
        <path d="M68 50 L72 47 M68 50 L72 53" />
        <path d="M68 65 L85 65" />
        <path d="M68 65 L72 62 M68 65 L72 68" />
      </g>

      {/* Roof uplift */}
      <g strokeWidth="1.2" opacity="0.7">
        <path d="M45 12 L45 5" />
        <path d="M45 5 L43 8 M45 5 L47 8" />
        <path d="M55 12 L55 5" />
        <path d="M55 5 L53 8 M55 5 L57 8" />
      </g>

      {/* Wind lines */}
      <g strokeWidth="0.8" opacity="0.4">
        <path d="M2 30 Q6 28, 10 30 Q14 32, 18 30" />
        <path d="M2 55 Q6 53, 10 55 Q14 57, 18 55" />
        <path d="M2 75 Q6 73, 10 75 Q14 77, 18 75" />
      </g>

      {/* Pressure distribution (triangular) */}
      <g strokeWidth="0.6" opacity="0.3">
        <path d="M30 25 L20 55 L30 85" strokeDasharray="2 2" />
      </g>
    </g>
  </svg>
)

/**
 * SEISMIC LOAD - Earthquake ground motion forces
 * Inertial forces from ground acceleration
 * Shows: Building swaying, ground motion waves
 * Characteristic: Dynamic, lateral, base shear
 */
export const SeismicLoadSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="seismic-load-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#seismic-load-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Ground line with cracks */}
      <g strokeWidth="1.5">
        <path d="M5 80 L95 80" />
        {/* Ground cracks */}
        <path d="M30 80 L32 85 L28 90" strokeWidth="1" opacity="0.5" />
        <path d="M70 80 L68 87 L72 92" strokeWidth="1" opacity="0.5" />
      </g>

      {/* Building - slightly tilted to show sway */}
      <g strokeWidth="2">
        {/* Main structure (shifted at top to show deflection) */}
        <path d="M38 15 L62 15 L60 78 L40 78 Z" />
        {/* Foundation (stays put) */}
        <path d="M35 78 L65 78 L65 85 L35 85 Z" />
        {/* Floor lines showing deformation */}
        <path d="M39 35 L61 35" strokeWidth="1" opacity="0.5" />
        <path d="M39.5 55 L60.5 55" strokeWidth="1" opacity="0.5" />
      </g>

      {/* SEISMIC WAVES - Key feature: ground motion */}
      <g strokeWidth="1.5">
        <path d="M5 90 Q15 85, 25 90 Q35 95, 45 90 Q55 85, 65 90 Q75 95, 85 90 Q95 85, 100 90" />
      </g>

      {/* Inertial force arrows (opposite to ground motion) */}
      <g strokeWidth="1.5" opacity="0.8">
        {/* Base shear */}
        <path d="M30 78 L40 78" />
        <path d="M30 78 L33 75 M30 78 L33 81" />
        {/* Story forces */}
        <path d="M25 55 L38 55" />
        <path d="M25 55 L28 52 M25 55 L28 58" />
        <path d="M20 35 L37 35" />
        <path d="M20 35 L23 32 M20 35 L23 38" />
        <path d="M15 15 L36 15" />
        <path d="M15 15 L18 12 M15 15 L18 18" />
      </g>

      {/* Building sway indicator */}
      <g strokeWidth="0.8" opacity="0.4">
        <path d="M50 15 Q55 45, 50 78" strokeDasharray="3 2" />
      </g>

      {/* Ground acceleration arrow */}
      <g strokeWidth="1.2" opacity="0.6">
        <path d="M75 75 L85 75" />
        <path d="M85 75 L82 72 M85 75 L82 78" />
        <path d="M70 75 L65 75" />
        <path d="M65 75 L68 72 M65 75 L68 78" />
      </g>

      {/* Seismic wave symbol */}
      <g strokeWidth="1" opacity="0.5">
        <path d="M8 95 L12 92 L16 98 L20 92 L24 98" />
      </g>
    </g>
  </svg>
)

/**
 * SNOW LOAD - Weight from snow accumulation on roof
 * Varies by climate, roof shape, exposure
 * Shows: Roof with snow accumulation, weight arrows
 * Characteristic: Seasonal, affected by drifting
 */
export const SnowLoadSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="snow-load-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#snow-load-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Building */}
      <g strokeWidth="2">
        <path d="M20 50 L80 50 L80 90 L20 90 Z" />
        {/* Roof structure */}
        <path d="M15 50 L50 20 L85 50" strokeWidth="2.5" />
      </g>

      {/* Ground */}
      <path d="M10 90 L90 90" strokeWidth="1" />

      {/* SNOW ACCUMULATION - Key feature: wavy snow layer on roof */}
      <g strokeWidth="1.5">
        {/* Snow layer - irregular top surface */}
        <path d="M15 50 L15 45 Q25 42, 32 45 Q40 43, 50 18 Q60 43, 68 45 Q75 42, 85 45 L85 50 L50 20 Z" />
        {/* Snow drift detail */}
        <path d="M18 47 Q22 44, 26 47" strokeWidth="0.8" opacity="0.5" />
        <path d="M70 47 Q74 44, 78 47" strokeWidth="0.8" opacity="0.5" />
      </g>

      {/* Snow load arrows */}
      <g strokeWidth="1.2" opacity="0.7">
        <path d="M30 30 L30 40" />
        <path d="M30 40 L28 37 M30 40 L32 37" />
        <path d="M50 12 L50 22" />
        <path d="M50 22 L48 19 M50 22 L52 19" />
        <path d="M70 30 L70 40" />
        <path d="M70 40 L68 37 M70 40 L72 37" />
      </g>

      {/* Snowflakes */}
      <g strokeWidth="0.8" opacity="0.5">
        {/* Snowflake 1 */}
        <path d="M25 8 L25 14 M22 11 L28 11 M23 9 L27 13 M27 9 L23 13" />
        {/* Snowflake 2 */}
        <path d="M60 5 L60 11 M57 8 L63 8 M58 6 L62 10 M62 6 L58 10" />
        {/* Snowflake 3 */}
        <path d="M80 12 L80 18 M77 15 L83 15 M78 13 L82 17 M82 13 L78 17" />
      </g>

      {/* Falling snow dots */}
      <g opacity="0.3">
        <circle cx="40" cy="10" r="1" fill="currentColor" />
        <circle cx="55" cy="8" r="0.8" fill="currentColor" />
        <circle cx="72" cy="6" r="1" fill="currentColor" />
        <circle cx="35" cy="4" r="0.8" fill="currentColor" />
      </g>

      {/* Unbalanced load indication (drift) */}
      <g strokeWidth="0.6" opacity="0.4">
        <path d="M75 48 L82 45 L82 50" />
      </g>
    </g>
  </svg>
)

/**
 * RAIN LOAD - Ponding water on flat roofs
 * Blocked drains can cause progressive collapse
 * Shows: Flat roof with pooling water, drain blocked
 * Characteristic: Flat roofs, progressive failure risk
 */
export const RainLoadSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="rain-load-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#rain-load-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Building with flat roof */}
      <g strokeWidth="2">
        <path d="M15 35 L85 35 L85 90 L15 90 Z" />
        {/* Flat roof/parapet */}
        <path d="M10 30 L90 30 L90 35 L10 35 Z" />
      </g>

      {/* PONDING WATER - Key feature: water accumulation */}
      <g strokeWidth="1.5">
        {/* Water surface (showing deflection) */}
        <path d="M15 32 Q35 38, 50 40 Q65 38, 85 32" />
        {/* Water depth at center */}
        <path d="M40 32 L40 38" strokeWidth="0.8" opacity="0.4" />
        <path d="M50 32 L50 40" strokeWidth="0.8" opacity="0.4" />
        <path d="M60 32 L60 38" strokeWidth="0.8" opacity="0.4" />
      </g>

      {/* Water ripples */}
      <g strokeWidth="0.6" opacity="0.4">
        <ellipse cx="50" cy="36" rx="15" ry="2" />
        <ellipse cx="50" cy="38" rx="10" ry="1.5" />
      </g>

      {/* Blocked drain */}
      <g strokeWidth="1.2" opacity="0.7">
        <circle cx="75" cy="35" r="3" />
        <path d="M73 33 L77 37" />
        <path d="M77 33 L73 37" />
      </g>

      {/* Rain arrows */}
      <g strokeWidth="1" opacity="0.6">
        <path d="M25 10 L25 25" />
        <path d="M25 25 L23 22 M25 25 L27 22" />
        <path d="M50 5 L50 20" />
        <path d="M50 20 L48 17 M50 20 L52 17" />
        <path d="M75 10 L75 25" />
        <path d="M75 25 L73 22 M75 25 L77 22" />
      </g>

      {/* Rain drops */}
      <g strokeWidth="0.8" opacity="0.4">
        <path d="M30 8 L30 12" />
        <path d="M40 3 L40 8" />
        <path d="M60 6 L60 11" />
        <path d="M70 2 L70 7" />
        <path d="M85 5 L85 10" />
      </g>

      {/* Deflection arrows showing progressive failure */}
      <g strokeWidth="0.8" opacity="0.5">
        <path d="M50 42 L50 50" />
        <path d="M50 50 L48 47 M50 50 L52 47" />
      </g>

      {/* Ground */}
      <path d="M10 90 L90 90" strokeWidth="1" />
    </g>
  </svg>
)

/**
 * IMPACT LOAD (Dynamic Load) - Moving/collision forces
 * Vehicles, cranes, machinery, footfall vibration
 * Shows: Vehicle/crane impact, with dynamic amplification
 * Characteristic: Time-varying, requires dynamic analysis
 */
export const ImpactLoadSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="impact-load-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#impact-load-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Bridge/structure */}
      <g strokeWidth="2">
        {/* Bridge deck */}
        <path d="M5 55 L95 55 L95 62 L5 62 Z" />
        {/* Support columns */}
        <path d="M15 62 L15 90" strokeWidth="3" />
        <path d="M85 62 L85 90" strokeWidth="3" />
        {/* Truss underneath */}
        <path d="M15 62 L50 75 L85 62" strokeWidth="1.5" opacity="0.5" />
      </g>

      {/* Ground */}
      <path d="M5 90 L95 90" strokeWidth="1" />

      {/* MOVING VEHICLE - Key feature: dynamic load */}
      <g strokeWidth="1.5">
        {/* Truck body */}
        <path d="M35 40 L60 40 L60 52 L35 52 Z" />
        {/* Cab */}
        <path d="M60 44 L70 44 L70 52 L60 52 Z" />
        {/* Wheels */}
        <circle cx="42" cy="52" r="4" />
        <circle cx="55" cy="52" r="4" />
        <circle cx="67" cy="52" r="4" />
      </g>

      {/* IMPACT ARROWS - Dynamic amplification */}
      <g strokeWidth="1.5" opacity="0.8">
        <path d="M42 35 L42 28" />
        <path d="M42 28 L40 31 M42 28 L44 31" />
        <path d="M55 35 L55 28" />
        <path d="M55 28 L53 31 M55 28 L57 31" />
        <path d="M42 56 L42 62" />
        <path d="M42 62 L40 59 M42 62 L44 59" />
        <path d="M55 56 L55 62" />
        <path d="M55 62 L53 59 M55 62 L57 59" />
      </g>

      {/* Motion lines */}
      <g strokeWidth="0.8" opacity="0.4">
        <path d="M28 46 L33 46" />
        <path d="M25 50 L33 50" />
        <path d="M28 54 L33 54" />
      </g>

      {/* Impact starburst */}
      <g strokeWidth="1" opacity="0.6">
        <path d="M42 55 L38 58" />
        <path d="M42 55 L40 60" />
        <path d="M55 55 L58 58" />
        <path d="M55 55 L57 60" />
      </g>

      {/* Vibration waves in structure */}
      <g strokeWidth="0.6" opacity="0.4">
        <path d="M50 65 Q55 68, 50 71 Q45 74, 50 77" />
      </g>

      {/* Direction arrow */}
      <g strokeWidth="1.2" opacity="0.6">
        <path d="M72 46 L82 46" />
        <path d="M82 46 L79 43 M82 46 L79 49" />
      </g>
    </g>
  </svg>
)

/**
 * THERMAL LOAD - Expansion/contraction from temperature
 * Causes stress without external force
 * Shows: Structure with expansion joints, temperature gradient
 * Characteristic: Causes internal stress, needs expansion joints
 */
export const ThermalLoadSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="thermal-load-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#thermal-load-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Building structure */}
      <g strokeWidth="2">
        <path d="M10 30 L90 30 L90 75 L10 75 Z" />
        {/* Expansion joint in middle */}
        <path d="M49 30 L49 75" strokeDasharray="4 2" />
        <path d="M51 30 L51 75" strokeDasharray="4 2" />
      </g>

      {/* Ground */}
      <path d="M5 75 L95 75" strokeWidth="1" />

      {/* THERMAL EXPANSION ARROWS - Key feature: bidirectional */}
      <g strokeWidth="1.5" opacity="0.8">
        {/* Left section expanding right */}
        <path d="M35 52 L45 52" />
        <path d="M45 52 L42 49 M45 52 L42 55" />
        {/* Right section expanding left */}
        <path d="M65 52 L55 52" />
        <path d="M55 52 L58 49 M55 52 L58 55" />
      </g>

      {/* Sun (heat source) */}
      <g strokeWidth="1.2" opacity="0.6">
        <circle cx="80" cy="15" r="8" />
        {/* Sun rays */}
        <path d="M80 3 L80 7" />
        <path d="M80 23 L80 27" />
        <path d="M68 15 L72 15" />
        <path d="M88 15 L92 15" />
        <path d="M72 7 L75 10" />
        <path d="M85 20 L88 23" />
        <path d="M72 23 L75 20" />
        <path d="M85 10 L88 7" />
      </g>

      {/* Temperature gradient on structure */}
      <g strokeWidth="0.8" opacity="0.4">
        <path d="M15 35 L85 35" />
        <path d="M15 40 L85 40" />
        <path d="M15 45 L85 45" />
        {/* Gradient shading indication */}
        <path d="M70 33 L85 33 L85 50 L70 50" strokeDasharray="1 1" />
      </g>

      {/* Thermometer */}
      <g strokeWidth="1" opacity="0.7">
        <path d="M15 10 L15 25" />
        <circle cx="15" cy="8" r="3" />
        <path d="M13 12 L17 12" strokeWidth="0.5" />
        <path d="M13 16 L17 16" strokeWidth="0.5" />
        <path d="M13 20 L17 20" strokeWidth="0.5" />
        {/* Mercury level */}
        <path d="M15 25 L15 15" strokeWidth="2" opacity="0.5" />
      </g>

      {/* Expansion joint detail */}
      <g strokeWidth="0.8" opacity="0.5">
        <path d="M47 40 L47 65" />
        <path d="M53 40 L53 65" />
        <path d="M47 45 Q50 47, 53 45" />
        <path d="M47 55 Q50 57, 53 55" />
      </g>

      {/* Cold side indicator */}
      <g strokeWidth="0.8" opacity="0.4">
        <path d="M20 85 L20 90" />
        <path d="M18 87 L22 87" />
        <text x="20" y="96" fontSize="4" textAnchor="middle" fill="currentColor">cold</text>
      </g>

      {/* Hot side indicator */}
      <g strokeWidth="0.8" opacity="0.4">
        <text x="80" y="96" fontSize="4" textAnchor="middle" fill="currentColor">hot</text>
      </g>
    </g>
  </svg>
)

/**
 * HYDROSTATIC LOAD - Water pressure on submerged elements
 * Triangular pressure distribution increases with depth
 * Shows: Basement wall with water pressure diagram
 * Characteristic: Increases linearly with depth
 */
export const HydrostaticLoadSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="hydrostatic-load-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#hydrostatic-load-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Ground level */}
      <g strokeWidth="1.5">
        <path d="M5 25 L35 25" />
        <path d="M65 25 L95 25" />
      </g>

      {/* Basement wall/structure */}
      <g strokeWidth="2">
        {/* Wall */}
        <path d="M35 25 L35 85 L65 85 L65 25" />
        {/* Floor slab */}
        <path d="M30 85 L70 85 L70 92 L30 92 Z" />
        {/* Above ground structure */}
        <path d="M35 25 L35 12 L65 12 L65 25" />
        <path d="M30 12 L70 12" />
      </g>

      {/* Water level indicator (left side) */}
      <g strokeWidth="1">
        <path d="M8 30 L30 30" strokeDasharray="3 2" />
        <text x="5" y="33" fontSize="4" fill="currentColor" opacity="0.6">WL</text>
      </g>

      {/* WATER/SOIL with pressure */}
      <g strokeWidth="0.6" opacity="0.3">
        {/* Water indication */}
        <path d="M10 35 Q14 33, 18 35 Q22 37, 26 35" />
        <path d="M10 50 Q14 48, 18 50 Q22 52, 26 50" />
        <path d="M10 65 Q14 63, 18 65 Q22 67, 26 65" />
        <path d="M10 80 Q14 78, 18 80 Q22 82, 26 80" />
      </g>

      {/* HYDROSTATIC PRESSURE ARROWS - Key feature: triangular distribution */}
      <g strokeWidth="1.2" opacity="0.8">
        {/* Pressure arrows increasing with depth */}
        <path d="M28 35 L33 35" />
        <path d="M33 35 L31 33 M33 35 L31 37" />

        <path d="M24 45 L33 45" />
        <path d="M33 45 L31 43 M33 45 L31 47" />

        <path d="M20 55 L33 55" />
        <path d="M33 55 L31 53 M33 55 L31 57" />

        <path d="M16 65 L33 65" />
        <path d="M33 65 L31 63 M33 65 L31 67" />

        <path d="M12 75 L33 75" />
        <path d="M33 75 L31 73 M33 75 L31 77" />

        <path d="M10 85 L33 85" />
        <path d="M33 85 L31 83 M33 85 L31 87" />
      </g>

      {/* Triangular pressure diagram */}
      <g strokeWidth="1" opacity="0.5">
        <path d="M30 30 L10 85 L30 85 Z" strokeDasharray="3 2" />
      </g>

      {/* Uplift pressure on floor */}
      <g strokeWidth="1" opacity="0.6">
        <path d="M42 95 L42 88" />
        <path d="M42 88 L40 91 M42 88 L44 91" />
        <path d="M50 95 L50 88" />
        <path d="M50 88 L48 91 M50 88 L52 91" />
        <path d="M58 95 L58 88" />
        <path d="M58 88 L56 91 M58 88 L60 91" />
      </g>

      {/* Depth indicator */}
      <g strokeWidth="0.8" opacity="0.5">
        <path d="M5 30 L5 85" />
        <path d="M3 30 L7 30" />
        <path d="M3 85 L7 85" />
        <text x="4" y="60" fontSize="4" fill="currentColor" transform="rotate(-90, 4, 60)">depth</text>
      </g>
    </g>
  </svg>
)

/**
 * EARTH PRESSURE - Lateral soil pressure on retaining structures
 * Active, passive, and at-rest pressure conditions
 * Shows: Retaining wall with triangular soil pressure distribution
 * Characteristic: Lateral, varies with soil type and wall movement
 */
export const EarthPressureLoadSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="earth-pressure-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#earth-pressure-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Ground level */}
      <g strokeWidth="1.5">
        <path d="M5 20 L40 20" />
        <path d="M55 20 L95 20" />
      </g>

      {/* RETAINING WALL - Central element */}
      <g strokeWidth="2.5">
        <path d="M40 15 L55 15 L55 90 L40 90 Z" />
      </g>

      {/* Wall reinforcement hints */}
      <g strokeWidth="1" opacity="0.5">
        <path d="M42 25 L53 25" />
        <path d="M42 40 L53 40" />
        <path d="M42 55 L53 55" />
        <path d="M42 70 L53 70" />
        <path d="M42 85 L53 85" />
      </g>

      {/* SOIL MASS (retained side - left) */}
      <g strokeWidth="0.5" opacity="0.3">
        {/* Soil texture */}
        <path d="M10 30 L15 30 M20 28 L25 28 M30 32 L35 32" />
        <path d="M8 45 L13 45 M18 43 L23 43 M28 47 L33 47" />
        <path d="M10 60 L15 60 M20 58 L25 58 M30 62 L35 62" />
        <path d="M8 75 L13 75 M18 73 L23 73 M28 77 L33 77" />
        <path d="M10 88 L15 88 M20 86 L25 86 M30 90 L35 90" />
      </g>

      {/* ACTIVE EARTH PRESSURE ARROWS - Key feature */}
      <g strokeWidth="1.5" opacity="0.8">
        {/* Arrows increasing with depth (triangular distribution) */}
        <path d="M32 30 L38 30" />
        <path d="M38 30 L36 28 M38 30 L36 32" />

        <path d="M28 45 L38 45" />
        <path d="M38 45 L36 43 M38 45 L36 47" />

        <path d="M24 60 L38 60" />
        <path d="M38 60 L36 58 M38 60 L36 62" />

        <path d="M20 75 L38 75" />
        <path d="M38 75 L36 73 M38 75 L36 77" />

        <path d="M16 88 L38 88" />
        <path d="M38 88 L36 86 M38 88 L36 90" />
      </g>

      {/* Pressure diagram (triangular shape) */}
      <g strokeWidth="1" opacity="0.5">
        <path d="M38 20 L16 90 L38 90 Z" strokeDasharray="3 2" />
      </g>

      {/* PASSIVE PRESSURE (toe resistance - front of wall) */}
      <g strokeWidth="1.2" opacity="0.6">
        <path d="M60 82 L57 82" />
        <path d="M57 82 L59 80 M57 82 L59 84" />
        <path d="M65 88 L57 88" />
        <path d="M57 88 L59 86 M57 88 L59 90" />
      </g>

      {/* Wall heel and toe indication */}
      <g strokeWidth="1.5" opacity="0.7">
        <path d="M32 90 L40 90 L40 95 L32 95 Z" />
        <path d="M55 90 L63 90 L63 95 L55 95 Z" />
      </g>

      {/* Labels */}
      <g opacity="0.4">
        <text x="20" y="15" fontSize="4" fill="currentColor">ACTIVE</text>
        <text x="62" y="80" fontSize="3" fill="currentColor">PASSIVE</text>
      </g>

      {/* Slip plane indication */}
      <g strokeWidth="0.8" opacity="0.3" strokeDasharray="4 2">
        <path d="M5 90 L40 45" />
      </g>
    </g>
  </svg>
)

/**
 * BUOYANCY/UPLIFT - Upward force from displaced water
 * Acts on submerged or floating structures
 * Shows: Submerged structure with upward pressure arrows
 * Characteristic: Equal to weight of displaced fluid (Archimedes)
 */
export const BuoyancyLoadSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="buoyancy-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#buoyancy-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Ground/water surface */}
      <g strokeWidth="1.5">
        <path d="M5 25 L20 25 M80 25 L95 25" />
      </g>

      {/* Water level wavy line */}
      <g strokeWidth="1" opacity="0.6">
        <path d="M5 25 Q15 22, 25 25 Q35 28, 45 25 Q55 22, 65 25 Q75 28, 85 25 Q92 23, 95 25" />
      </g>

      {/* SUBMERGED STRUCTURE (basement/tank/caisson) */}
      <g strokeWidth="2.5">
        <path d="M25 20 L75 20 L75 80 L25 80 Z" />
      </g>

      {/* Structure interior divisions */}
      <g strokeWidth="1" opacity="0.4">
        <path d="M25 40 L75 40" />
        <path d="M25 60 L75 60" />
        <path d="M50 20 L50 80" />
      </g>

      {/* WATER surrounding structure */}
      <g strokeWidth="0.5" opacity="0.3">
        {/* Left side water */}
        <path d="M8 35 Q12 33, 16 35" />
        <path d="M8 50 Q12 48, 16 50" />
        <path d="M8 65 Q12 63, 16 65" />
        <path d="M8 78 Q12 76, 16 78" />
        {/* Right side water */}
        <path d="M82 35 Q86 33, 90 35" />
        <path d="M82 50 Q86 48, 90 50" />
        <path d="M82 65 Q86 63, 90 65" />
        <path d="M82 78 Q86 76, 90 78" />
      </g>

      {/* BUOYANCY ARROWS - Key feature: upward pressure */}
      <g strokeWidth="2" opacity="0.8">
        {/* Bottom uplift arrows (uniform) */}
        <path d="M32 92 L32 82" />
        <path d="M32 82 L29 86 M32 82 L35 86" />

        <path d="M44 92 L44 82" />
        <path d="M44 82 L41 86 M44 82 L47 86" />

        <path d="M56 92 L56 82" />
        <path d="M56 82 L53 86 M56 82 L59 86" />

        <path d="M68 92 L68 82" />
        <path d="M68 82 L65 86 M68 82 L71 86" />
      </g>

      {/* Side pressure (horizontal inward) */}
      <g strokeWidth="1.2" opacity="0.5">
        <path d="M15 50 L23 50" />
        <path d="M23 50 L20 48 M23 50 L20 52" />
        <path d="M85 50 L77 50" />
        <path d="M77 50 L80 48 M77 50 L80 52" />
      </g>

      {/* Weight arrow (gravity counteracting buoyancy) */}
      <g strokeWidth="1.5" opacity="0.6">
        <path d="M50 10 L50 18" />
        <path d="M50 18 L48 15 M50 18 L52 15" />
        <text x="55" y="15" fontSize="4" fill="currentColor">W</text>
      </g>

      {/* Net buoyancy equation hint */}
      <g opacity="0.4">
        <text x="50" y="98" fontSize="4" textAnchor="middle" fill="currentColor">Fb = ρ × V × g</text>
      </g>

      {/* Displaced volume indication */}
      <g strokeWidth="0.8" opacity="0.3" strokeDasharray="2 2">
        <path d="M25 25 L25 80 L75 80 L75 25" />
      </g>

      {/* Water table marker */}
      <g strokeWidth="0.8" opacity="0.5">
        <path d="M5 25 L5 30" />
        <text x="3" y="35" fontSize="3" fill="currentColor">WT</text>
      </g>
    </g>
  </svg>
)

// =============================================================================
// LOAD TYPES - MULTI-VIEW: SYMBOLIC ICONS
// Simple, recognizable icons for each load type
// =============================================================================

/**
 * DEAD LOAD - Symbolic View
 * Simple weight/mass icon representing permanent gravity load
 */
export const DeadLoadSymbolicSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="dead-symbolic-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#dead-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Weight/mass symbol - solid block with down arrow */}
      <g strokeWidth="2.5">
        {/* Solid block representing mass */}
        <path d="M25 30 L75 30 L75 60 L25 60 Z" />
        <path d="M30 35 L70 35" strokeWidth="1.5" opacity="0.5" />
        <path d="M30 42 L70 42" strokeWidth="1.5" opacity="0.5" />
        <path d="M30 49 L70 49" strokeWidth="1.5" opacity="0.5" />
        <path d="M30 56 L70 56" strokeWidth="1.5" opacity="0.5" />
      </g>

      {/* Downward arrow - gravity */}
      <g strokeWidth="3">
        <path d="M50 65 L50 90" />
        <path d="M40 80 L50 90 L60 80" />
      </g>

      {/* "G" for gravity indicator */}
      <g strokeWidth="1.5" opacity="0.6">
        <text x="50" y="25" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="bold">G</text>
      </g>
    </g>
  </svg>
)

/**
 * LIVE LOAD - Symbolic View
 * People icons representing occupancy load
 */
export const LiveLoadSymbolicSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="live-symbolic-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#live-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Person 1 - center */}
      <g strokeWidth="2">
        <circle cx="50" cy="25" r="8" />
        <path d="M50 33 L50 55" strokeWidth="2.5" />
        <path d="M50 40 L35 50" />
        <path d="M50 40 L65 50" />
        <path d="M50 55 L38 75" />
        <path d="M50 55 L62 75" />
      </g>

      {/* Person 2 - left (smaller, background) */}
      <g strokeWidth="1.5" opacity="0.5">
        <circle cx="22" cy="45" r="5" />
        <path d="M22 50 L22 65" />
        <path d="M22 54 L15 60" />
        <path d="M22 54 L29 60" />
        <path d="M22 65 L17 78" />
        <path d="M22 65 L27 78" />
      </g>

      {/* Person 3 - right (smaller, background) */}
      <g strokeWidth="1.5" opacity="0.5">
        <circle cx="78" cy="45" r="5" />
        <path d="M78 50 L78 65" />
        <path d="M78 54 L71 60" />
        <path d="M78 54 L85 60" />
        <path d="M78 65 L73 78" />
        <path d="M78 65 L83 78" />
      </g>

      {/* Floor line */}
      <path d="M10 85 L90 85" strokeWidth="2" />

      {/* Variable indicator */}
      <g strokeWidth="1" opacity="0.4">
        <path d="M15 92 Q25 88, 35 92 Q45 96, 55 92 Q65 88, 75 92 Q85 96, 90 92" />
      </g>
    </g>
  </svg>
)

/**
 * WIND LOAD - Symbolic View
 * Wind/air flow lines
 */
export const WindLoadSymbolicSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="wind-symbolic-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#wind-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Wind flow lines */}
      <g strokeWidth="2.5">
        <path d="M10 30 Q30 25, 50 30 Q70 35, 80 30" />
        <path d="M80 30 L75 25" />
        <path d="M80 30 L75 35" />
      </g>

      <g strokeWidth="2">
        <path d="M5 50 Q25 45, 50 50 Q75 55, 90 50" />
        <path d="M90 50 L85 45" />
        <path d="M90 50 L85 55" />
      </g>

      <g strokeWidth="2.5">
        <path d="M10 70 Q30 65, 50 70 Q70 75, 80 70" />
        <path d="M80 70 L75 65" />
        <path d="M80 70 L75 75" />
      </g>

      {/* Swirl accent */}
      <g strokeWidth="1.5" opacity="0.6">
        <path d="M85 35 Q95 40, 90 50 Q85 55, 90 60" />
      </g>

      {/* Small particles */}
      <g opacity="0.4">
        <circle cx="20" cy="40" r="1.5" fill="currentColor" />
        <circle cx="40" cy="60" r="1" fill="currentColor" />
        <circle cx="60" cy="38" r="1.2" fill="currentColor" />
        <circle cx="75" cy="55" r="1" fill="currentColor" />
      </g>
    </g>
  </svg>
)

/**
 * SEISMIC LOAD - Symbolic View
 * Earthquake/seismic wave symbol
 */
export const SeismicLoadSymbolicSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="seismic-symbolic-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#seismic-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Seismograph wave pattern */}
      <g strokeWidth="2.5">
        <path d="M10 50 L25 50 L30 20 L35 80 L40 30 L45 70 L50 40 L55 60 L60 45 L65 55 L70 50 L90 50" />
      </g>

      {/* Ground crack symbol */}
      <g strokeWidth="2" opacity="0.7">
        <path d="M30 85 L35 75 L40 85 L45 72 L50 88" />
        <path d="M55 85 L60 78 L65 85" />
      </g>

      {/* Radiating waves from epicenter */}
      <g strokeWidth="1.5" opacity="0.4">
        <circle cx="40" cy="50" r="15" />
        <circle cx="40" cy="50" r="25" />
        <circle cx="40" cy="50" r="35" />
      </g>

      {/* Epicenter dot */}
      <circle cx="40" cy="50" r="3" fill="currentColor" opacity="0.6" />
    </g>
  </svg>
)

/**
 * SNOW LOAD - Symbolic View
 * Snowflake icon
 */
export const SnowLoadSymbolicSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="snow-symbolic-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#snow-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Main snowflake */}
      <g strokeWidth="2.5">
        {/* Vertical arm */}
        <path d="M50 15 L50 85" />
        {/* Horizontal arm */}
        <path d="M15 50 L85 50" />
        {/* Diagonal arms */}
        <path d="M25 25 L75 75" />
        <path d="M75 25 L25 75" />
      </g>

      {/* Branch details */}
      <g strokeWidth="2">
        {/* Top branches */}
        <path d="M50 25 L42 33 M50 25 L58 33" />
        {/* Bottom branches */}
        <path d="M50 75 L42 67 M50 75 L58 67" />
        {/* Left branches */}
        <path d="M25 50 L33 42 M25 50 L33 58" />
        {/* Right branches */}
        <path d="M75 50 L67 42 M75 50 L67 58" />
        {/* Diagonal branches */}
        <path d="M35 35 L30 42 M35 35 L42 30" />
        <path d="M65 35 L70 42 M65 35 L58 30" />
        <path d="M35 65 L30 58 M35 65 L42 70" />
        <path d="M65 65 L70 58 M65 65 L58 70" />
      </g>

      {/* Center crystal */}
      <circle cx="50" cy="50" r="5" strokeWidth="2" />
    </g>
  </svg>
)

/**
 * RAIN LOAD - Symbolic View
 * Rain drops icon
 */
export const RainLoadSymbolicSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="rain-symbolic-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#rain-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Cloud */}
      <g strokeWidth="2">
        <path d="M25 40 Q25 25, 40 25 Q45 15, 60 20 Q80 20, 80 40 Q90 40, 85 55 L20 55 Q10 55, 15 40 Q15 40, 25 40" />
      </g>

      {/* Rain drops */}
      <g strokeWidth="2.5">
        <path d="M30 62 L30 75 Q30 80, 30 75" />
        <path d="M30 75 Q28 78, 30 80 Q32 78, 30 75" fill="currentColor" opacity="0.3" />

        <path d="M50 62 L50 80 Q50 85, 50 80" />
        <path d="M50 80 Q48 83, 50 85 Q52 83, 50 80" fill="currentColor" opacity="0.3" />

        <path d="M70 62 L70 72 Q70 77, 70 72" />
        <path d="M70 72 Q68 75, 70 77 Q72 75, 70 72" fill="currentColor" opacity="0.3" />
      </g>

      {/* Water pooling */}
      <g strokeWidth="1.5" opacity="0.5">
        <ellipse cx="50" cy="92" rx="30" ry="4" />
      </g>
    </g>
  </svg>
)

/**
 * IMPACT LOAD - Symbolic View
 * Impact/collision starburst
 */
export const ImpactLoadSymbolicSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="impact-symbolic-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#impact-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Impact starburst */}
      <g strokeWidth="2.5">
        {/* Main spikes */}
        <path d="M50 50 L50 15" />
        <path d="M50 50 L50 85" />
        <path d="M50 50 L15 50" />
        <path d="M50 50 L85 50" />
        <path d="M50 50 L25 25" />
        <path d="M50 50 L75 25" />
        <path d="M50 50 L25 75" />
        <path d="M50 50 L75 75" />
      </g>

      {/* Secondary spikes */}
      <g strokeWidth="2" opacity="0.7">
        <path d="M50 50 L35 20" />
        <path d="M50 50 L65 20" />
        <path d="M50 50 L20 35" />
        <path d="M50 50 L80 35" />
        <path d="M50 50 L20 65" />
        <path d="M50 50 L80 65" />
        <path d="M50 50 L35 80" />
        <path d="M50 50 L65 80" />
      </g>

      {/* Center burst */}
      <circle cx="50" cy="50" r="8" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.5" />

      {/* Motion arrow */}
      <g strokeWidth="2" opacity="0.6">
        <path d="M10 20 L30 40" />
        <path d="M30 40 L25 32 M30 40 L22 38" />
      </g>
    </g>
  </svg>
)

/**
 * THERMAL LOAD - Symbolic View
 * Thermometer with expansion arrows
 */
export const ThermalLoadSymbolicSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="thermal-symbolic-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#thermal-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Thermometer */}
      <g strokeWidth="2">
        {/* Bulb */}
        <circle cx="50" cy="75" r="12" />
        {/* Stem */}
        <path d="M44 75 L44 25 Q44 20, 50 20 Q56 20, 56 25 L56 75" />
        {/* Mercury */}
        <path d="M47 70 L47 35" strokeWidth="4" opacity="0.5" />
        <circle cx="50" cy="75" r="8" fill="currentColor" opacity="0.3" />
        {/* Scale marks */}
        <path d="M58 35 L62 35" strokeWidth="1.5" />
        <path d="M58 45 L62 45" strokeWidth="1.5" />
        <path d="M58 55 L62 55" strokeWidth="1.5" />
        <path d="M58 65 L62 65" strokeWidth="1.5" />
      </g>

      {/* Expansion arrows */}
      <g strokeWidth="2" opacity="0.7">
        {/* Left arrow */}
        <path d="M25 50 L10 50" />
        <path d="M10 50 L15 45 M10 50 L15 55" />
        {/* Right arrow */}
        <path d="M75 50 L90 50" />
        <path d="M90 50 L85 45 M90 50 L85 55" />
      </g>

      {/* Hot/cold indicators */}
      <g strokeWidth="1" opacity="0.5">
        <text x="85" y="30" fontSize="8" fill="currentColor">+</text>
        <text x="10" y="30" fontSize="8" fill="currentColor">−</text>
      </g>
    </g>
  </svg>
)

/**
 * HYDROSTATIC LOAD - Symbolic View
 * Water level with pressure triangle
 */
export const HydrostaticLoadSymbolicSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="hydro-symbolic-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#hydro-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Container/wall */}
      <g strokeWidth="2.5">
        <path d="M70 20 L70 85 L30 85" />
      </g>

      {/* Water surface */}
      <g strokeWidth="2">
        <path d="M30 30 Q40 27, 50 30 Q60 33, 70 30" />
      </g>

      {/* Water fill indication */}
      <g strokeWidth="0.8" opacity="0.3">
        <path d="M32 40 Q42 37, 52 40 Q62 43, 68 40" />
        <path d="M32 50 Q42 47, 52 50 Q62 53, 68 50" />
        <path d="M32 60 Q42 57, 52 60 Q62 63, 68 60" />
        <path d="M32 70 Q42 67, 52 70 Q62 73, 68 70" />
        <path d="M32 80 Q42 77, 52 80 Q62 83, 68 80" />
      </g>

      {/* Pressure triangle */}
      <g strokeWidth="2" opacity="0.7">
        <path d="M25 30 L10 85 L25 85 Z" strokeDasharray="4 2" />
      </g>

      {/* Pressure arrows */}
      <g strokeWidth="1.5" opacity="0.6">
        <path d="M15 45 L28 45" />
        <path d="M28 45 L25 42 M28 45 L25 48" />
        <path d="M12 65 L28 65" />
        <path d="M28 65 L25 62 M28 65 L25 68" />
        <path d="M10 82 L28 82" />
        <path d="M28 82 L25 79 M28 82 L25 85" />
      </g>

      {/* Depth indicator */}
      <g strokeWidth="1.5" opacity="0.5">
        <path d="M75 30 L75 85" />
        <path d="M73 30 L77 30" />
        <path d="M73 85 L77 85" />
        <text x="80" y="60" fontSize="6" fill="currentColor">h</text>
      </g>
    </g>
  </svg>
)

/**
 * EARTH PRESSURE - Symbolic View
 * Retaining wall with soil pressure symbol
 */
export const EarthPressureSymbolicSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="earth-symbolic-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#earth-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Retaining wall */}
      <g strokeWidth="3">
        <path d="M55 15 L55 90" />
        <path d="M50 15 L60 15" />
        <path d="M50 90 L65 90 L65 95 L45 95 Z" />
      </g>

      {/* Soil mass indication */}
      <g strokeWidth="1" opacity="0.4">
        <path d="M10 25 L50 25" />
        <path d="M10 40 L50 40" />
        <path d="M10 55 L50 55" />
        <path d="M10 70 L50 70" />
        <path d="M10 85 L50 85" />
      </g>

      {/* Triangular earth pressure */}
      <g strokeWidth="2">
        <path d="M50 20 L15 90 L50 90 Z" opacity="0.3" />
      </g>

      {/* Pressure arrows */}
      <g strokeWidth="2" opacity="0.8">
        <path d="M35 35 L50 35" />
        <path d="M50 35 L45 32 M50 35 L45 38" />
        <path d="M25 60 L50 60" />
        <path d="M50 60 L45 57 M50 60 L45 63" />
        <path d="M18 82 L50 82" />
        <path d="M50 82 L45 79 M50 82 L45 85" />
      </g>

      {/* Ka symbol */}
      <g opacity="0.6">
        <text x="30" y="50" fontSize="10" fill="currentColor" fontWeight="bold">Ka</text>
      </g>
    </g>
  </svg>
)

/**
 * BUOYANCY - Symbolic View
 * Upward arrows from water displacement
 */
export const BuoyancySymbolicSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="buoyancy-symbolic-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#buoyancy-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Submerged box */}
      <g strokeWidth="2.5">
        <path d="M25 35 L75 35 L75 70 L25 70 Z" />
      </g>

      {/* Water surface wavy line */}
      <g strokeWidth="1.5" opacity="0.6">
        <path d="M10 25 Q20 22, 30 25 Q40 28, 50 25 Q60 22, 70 25 Q80 28, 90 25" />
      </g>

      {/* Water indication around object */}
      <g strokeWidth="0.8" opacity="0.3">
        <path d="M12 40 Q16 38, 20 40" />
        <path d="M12 55 Q16 53, 20 55" />
        <path d="M80 40 Q84 38, 88 40" />
        <path d="M80 55 Q84 53, 88 55" />
      </g>

      {/* BUOYANCY ARROWS - Upward */}
      <g strokeWidth="2.5">
        <path d="M35 90 L35 75" />
        <path d="M35 75 L30 82 M35 75 L40 82" />
        <path d="M50 90 L50 75" />
        <path d="M50 75 L45 82 M50 75 L55 82" />
        <path d="M65 90 L65 75" />
        <path d="M65 75 L60 82 M65 75 L70 82" />
      </g>

      {/* Fb label */}
      <g opacity="0.6">
        <text x="50" y="55" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="bold">Fb</text>
      </g>

      {/* Upward indication */}
      <g strokeWidth="1.5" opacity="0.5">
        <text x="50" y="10" fontSize="6" textAnchor="middle" fill="currentColor">↑</text>
      </g>
    </g>
  </svg>
)

// =============================================================================
// LOAD TYPES - MULTI-VIEW: EFFECT DIAGRAMS
// Showing structural response/deformation
// =============================================================================

/**
 * DEAD LOAD - Effect View
 * Structure under constant compression
 */
export const DeadLoadEffectSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="dead-effect-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#dead-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Column under compression */}
      <g strokeWidth="2">
        {/* Original column outline (dashed) */}
        <path d="M35 20 L65 20 L65 80 L35 80 Z" strokeDasharray="4 2" opacity="0.4" />
        {/* Compressed column (slightly shorter/wider at base) */}
        <path d="M34 22 L66 22 L67 78 L33 78 Z" strokeWidth="2.5" />
      </g>

      {/* Compression stress arrows */}
      <g strokeWidth="1.5" opacity="0.7">
        <path d="M50 8 L50 18" />
        <path d="M50 18 L47 14 M50 18 L53 14" />
        <path d="M50 92 L50 82" />
        <path d="M50 82 L47 86 M50 82 L53 86" />
      </g>

      {/* Internal stress pattern */}
      <g strokeWidth="0.8" opacity="0.4">
        <path d="M40 30 L40 70" />
        <path d="M50 28 L50 72" />
        <path d="M60 30 L60 70" />
      </g>

      {/* Shortening indicator */}
      <g strokeWidth="1" opacity="0.5">
        <path d="M75 20 L75 78" strokeDasharray="2 2" />
        <path d="M72 20 L78 20" />
        <path d="M72 22 L78 22" />
        <text x="82" y="50" fontSize="5" fill="currentColor">Δ</text>
      </g>

      {/* Foundation */}
      <path d="M25 80 L75 80 L75 88 L25 88 Z" strokeWidth="2" />
    </g>
  </svg>
)

/**
 * LIVE LOAD - Effect View
 * Floor deflection under occupancy
 */
export const LiveLoadEffectSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="live-effect-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#live-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Supports */}
      <g strokeWidth="2">
        <path d="M15 50 L15 85" />
        <path d="M85 50 L85 85" />
        <path d="M10 85 L90 85" />
      </g>

      {/* Original beam position (dashed) */}
      <path d="M15 50 L85 50" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.4" />

      {/* Deflected beam */}
      <path d="M15 50 Q50 65, 85 50" strokeWidth="3" />

      {/* Load on beam */}
      <g strokeWidth="1.5">
        <path d="M50 35 L50 52" />
        <path d="M50 52 L47 48 M50 52 L53 48" />
        <rect x="40" y="20" width="20" height="15" strokeWidth="1.5" />
      </g>

      {/* Deflection indicator */}
      <g strokeWidth="1" opacity="0.6">
        <path d="M50 50 L50 62" strokeDasharray="2 2" />
        <path d="M47 50 L53 50" />
        <path d="M47 62 L53 62" />
        <text x="56" y="58" fontSize="5" fill="currentColor">δ</text>
      </g>

      {/* Stress pattern in beam */}
      <g strokeWidth="0.6" opacity="0.4">
        {/* Tension at bottom */}
        <path d="M25 58 L35 58" />
        <path d="M45 60 L55 60" />
        <path d="M65 58 L75 58" />
      </g>
    </g>
  </svg>
)

/**
 * WIND LOAD - Effect View
 * Building sway/lateral deflection
 */
export const WindLoadEffectSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="wind-effect-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#wind-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Original building position (dashed) */}
      <path d="M35 15 L35 85 L65 85 L65 15 Z" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.3" />

      {/* Deflected building */}
      <g strokeWidth="2">
        <path d="M40 15 L35 85 L65 85 L70 15 Z" />
        {/* Floor lines showing drift */}
        <path d="M36 55 L66 55" strokeWidth="1" opacity="0.5" />
        <path d="M38 35 L68 35" strokeWidth="1" opacity="0.5" />
      </g>

      {/* Wind arrows */}
      <g strokeWidth="1.5" opacity="0.6">
        <path d="M10 30 L35 30" />
        <path d="M35 30 L30 27 M35 30 L30 33" />
        <path d="M10 50 L35 50" />
        <path d="M35 50 L30 47 M35 50 L30 53" />
        <path d="M10 70 L35 70" />
        <path d="M35 70 L30 67 M35 70 L30 73" />
      </g>

      {/* Drift indicator */}
      <g strokeWidth="1" opacity="0.6">
        <path d="M50 10 L50 15" strokeDasharray="2 2" />
        <path d="M50 10 L55 10" />
        <path d="M55 10 L55 15" strokeDasharray="2 2" />
        <text x="52" y="8" fontSize="5" fill="currentColor">Δ</text>
      </g>

      {/* Foundation (fixed) */}
      <path d="M30 85 L70 85 L70 92 L30 92 Z" strokeWidth="2" />

      {/* Ground */}
      <path d="M20 92 L80 92" strokeWidth="1.5" />
    </g>
  </svg>
)

/**
 * SEISMIC LOAD - Effect View
 * Building lateral movement, inter-story drift
 */
export const SeismicLoadEffectSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="seismic-effect-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#seismic-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Original position (dashed) */}
      <path d="M40 10 L40 75 L60 75 L60 10 Z" strokeWidth="1" strokeDasharray="3 2" opacity="0.3" />

      {/* Deformed building showing inter-story drift */}
      <g strokeWidth="2">
        {/* Each floor shifts differently */}
        <path d="M50 10 L38 30 L65 30" />
        <path d="M38 30 L42 50 L62 50" />
        <path d="M42 50 L40 75 L60 75 L58 50" />
        <path d="M62 50 L60 30" />
        <path d="M65 30 L58 10" />
        <path d="M50 10 L58 10" />
      </g>

      {/* Ground motion arrows */}
      <g strokeWidth="1.5" opacity="0.7">
        <path d="M25 82 L35 82" />
        <path d="M35 82 L32 79 M35 82 L32 85" />
        <path d="M75 82 L65 82" />
        <path d="M65 82 L68 79 M65 82 L68 85" />
      </g>

      {/* Seismic waves at base */}
      <g strokeWidth="1.5">
        <path d="M15 90 Q25 85, 35 90 Q45 95, 55 90 Q65 85, 75 90 Q85 95, 90 90" />
      </g>

      {/* Inter-story drift markers */}
      <g strokeWidth="0.8" opacity="0.5">
        <path d="M70 10 L70 30" strokeDasharray="2 1" />
        <path d="M70 30 L70 50" strokeDasharray="2 1" />
        <text x="73" y="20" fontSize="4" fill="currentColor">drift</text>
      </g>

      {/* Foundation */}
      <path d="M35 75 L65 75 L65 82 L35 82 Z" strokeWidth="2" />
    </g>
  </svg>
)

/**
 * SNOW LOAD - Effect View
 * Roof deflection under snow weight
 */
export const SnowLoadEffectSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="snow-effect-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#snow-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Supports */}
      <g strokeWidth="2">
        <path d="M20 55 L20 85" />
        <path d="M80 55 L80 85" />
      </g>

      {/* Original roof (dashed) */}
      <path d="M15 55 L50 25 L85 55" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.3" />

      {/* Deflected roof */}
      <path d="M15 55 Q35 45, 50 35 Q65 45, 85 55" strokeWidth="2.5" />

      {/* Snow on roof */}
      <g strokeWidth="1.5" opacity="0.6">
        <path d="M18 53 Q35 40, 50 32 Q65 40, 82 53" />
        {/* Snow texture */}
        <path d="M25 48 Q30 46, 35 48" strokeWidth="0.8" />
        <path d="M60 48 Q65 46, 70 48" strokeWidth="0.8" />
      </g>

      {/* Weight arrows */}
      <g strokeWidth="1.2" opacity="0.5">
        <path d="M35 22 L35 38" />
        <path d="M35 38 L33 35 M35 38 L37 35" />
        <path d="M50 15 L50 30" />
        <path d="M50 30 L48 27 M50 30 L52 27" />
        <path d="M65 22 L65 38" />
        <path d="M65 38 L63 35 M65 38 L67 35" />
      </g>

      {/* Deflection indicator at ridge */}
      <g strokeWidth="1" opacity="0.6">
        <path d="M50 25 L50 35" strokeDasharray="2 2" />
        <path d="M47 25 L53 25" />
        <path d="M47 35 L53 35" />
        <text x="54" y="32" fontSize="5" fill="currentColor">δ</text>
      </g>

      {/* Ground */}
      <path d="M10 85 L90 85" strokeWidth="1.5" />
    </g>
  </svg>
)

/**
 * RAIN LOAD - Effect View
 * Progressive ponding deflection
 */
export const RainLoadEffectSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="rain-effect-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#rain-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Building walls */}
      <g strokeWidth="2">
        <path d="M15 30 L15 85" />
        <path d="M85 30 L85 85" />
      </g>

      {/* Original roof (flat, dashed) */}
      <path d="M15 30 L85 30" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.3" />

      {/* Deflected roof with ponding */}
      <g strokeWidth="2">
        <path d="M15 30 Q50 50, 85 30" />
      </g>

      {/* Water surface */}
      <g strokeWidth="1.5" opacity="0.6">
        <path d="M20 32 Q50 45, 80 32" />
        {/* Water fill */}
        <path d="M25 33 Q50 42, 75 33" strokeWidth="0.8" opacity="0.4" />
        <path d="M30 34 Q50 40, 70 34" strokeWidth="0.8" opacity="0.4" />
      </g>

      {/* Blocked drain symbol */}
      <g strokeWidth="1.5" opacity="0.7">
        <circle cx="75" cy="35" r="4" />
        <path d="M72 32 L78 38" />
        <path d="M78 32 L72 38" />
      </g>

      {/* Progressive failure arrows */}
      <g strokeWidth="1" opacity="0.5">
        <path d="M50 35 L50 45" />
        <path d="M50 45 L48 42 M50 45 L52 42" />
        <path d="M50 50 L50 60" strokeDasharray="2 2" />
        <path d="M50 60 L48 57 M50 60 L52 57" />
      </g>

      {/* Warning indicator */}
      <g strokeWidth="1.5" opacity="0.6">
        <path d="M45 70 L50 60 L55 70 Z" />
        <path d="M50 64 L50 67" strokeWidth="2" />
        <circle cx="50" cy="68.5" r="0.8" fill="currentColor" />
      </g>

      {/* Ground */}
      <path d="M10 85 L90 85" strokeWidth="1.5" />
    </g>
  </svg>
)

/**
 * IMPACT LOAD - Effect View
 * Local damage and stress waves
 */
export const ImpactLoadEffectSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="impact-effect-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#impact-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Beam/structure */}
      <g strokeWidth="2">
        <path d="M10 50 L90 50 L90 60 L10 60 Z" />
        {/* Supports */}
        <path d="M15 60 L15 85" />
        <path d="M85 60 L85 85" />
      </g>

      {/* Impact point with local deformation */}
      <g strokeWidth="2">
        <path d="M45 50 Q50 55, 55 50" />
      </g>

      {/* Impacting object */}
      <g strokeWidth="1.5">
        <circle cx="50" cy="35" r="8" />
        <path d="M50 28 L50 20" />
        <path d="M50 20 L47 25 M50 20 L53 25" />
      </g>

      {/* Stress waves radiating from impact */}
      <g strokeWidth="1" opacity="0.5">
        <path d="M50 55 Q40 58, 30 55" strokeDasharray="2 2" />
        <path d="M50 55 Q60 58, 70 55" strokeDasharray="2 2" />
        <path d="M50 55 Q35 60, 20 55" strokeDasharray="2 2" opacity="0.3" />
        <path d="M50 55 Q65 60, 80 55" strokeDasharray="2 2" opacity="0.3" />
      </g>

      {/* Impact starburst */}
      <g strokeWidth="1.2" opacity="0.6">
        <path d="M45 48 L42 42" />
        <path d="M50 47 L50 40" />
        <path d="M55 48 L58 42" />
      </g>

      {/* Vibration indication */}
      <g strokeWidth="0.8" opacity="0.4">
        <path d="M25 62 Q27 65, 25 68" />
        <path d="M75 62 Q77 65, 75 68" />
      </g>

      {/* Ground */}
      <path d="M5 85 L95 85" strokeWidth="1.5" />
    </g>
  </svg>
)

/**
 * THERMAL LOAD - Effect View
 * Expansion joint movement
 */
export const ThermalLoadEffectSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="thermal-effect-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#thermal-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Structure - two sections with expansion joint */}
      <g strokeWidth="2">
        {/* Left section */}
        <path d="M10 30 L45 30 L45 75 L10 75 Z" />
        {/* Right section */}
        <path d="M55 30 L90 30 L90 75 L55 75 Z" />
      </g>

      {/* Expansion joint gap - COLD state (wider) */}
      <g strokeWidth="1.5" strokeDasharray="3 2" opacity="0.4">
        <path d="M46 30 L46 75" />
        <path d="M54 30 L54 75" />
      </g>

      {/* Expansion joint gap - HOT state (narrower) */}
      <g strokeWidth="2" opacity="0.8">
        <path d="M47 32 L47 73" />
        <path d="M53 32 L53 73" />
      </g>

      {/* Expansion arrows */}
      <g strokeWidth="1.5" opacity="0.7">
        {/* Left section expanding right */}
        <path d="M35 52 L44 52" />
        <path d="M44 52 L41 49 M44 52 L41 55" />
        {/* Right section expanding left */}
        <path d="M65 52 L56 52" />
        <path d="M56 52 L59 49 M56 52 L59 55" />
      </g>

      {/* Temperature indicators */}
      <g strokeWidth="1.2" opacity="0.5">
        {/* Sun (hot) */}
        <circle cx="80" cy="15" r="6" />
        <path d="M80 5 L80 8" />
        <path d="M80 22 L80 25" />
        <path d="M70 15 L73 15" />
        <path d="M87 15 L90 15" />

        {/* Cold indicator */}
        <path d="M15 15 L15 22 M12 18 L18 18" strokeWidth="1.5" />
      </g>

      {/* Gap measurement */}
      <g strokeWidth="0.8" opacity="0.5">
        <path d="M47 80 L53 80" />
        <path d="M47 78 L47 82" />
        <path d="M53 78 L53 82" />
        <text x="50" y="88" fontSize="5" textAnchor="middle" fill="currentColor">gap</text>
      </g>

      {/* Foundation */}
      <path d="M5 75 L95 75" strokeWidth="1.5" />
    </g>
  </svg>
)

/**
 * HYDROSTATIC LOAD - Effect View
 * Wall bending under water pressure
 */
export const HydrostaticLoadEffectSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="hydro-effect-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#hydro-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Original wall position (dashed) */}
      <path d="M50 15 L50 85" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.3" />

      {/* Deflected wall (curved) */}
      <g strokeWidth="3">
        <path d="M50 15 Q58 50, 50 85" />
      </g>

      {/* Water on left side */}
      <g strokeWidth="0.6" opacity="0.3">
        <path d="M10 25 Q20 22, 30 25 Q40 28, 50 25" />
        <path d="M10 40 Q20 37, 30 40 Q40 43, 52 40" />
        <path d="M10 55 Q20 52, 30 55 Q40 58, 54 55" />
        <path d="M10 70 Q20 67, 30 70 Q40 73, 55 70" />
      </g>

      {/* Pressure distribution arrows */}
      <g strokeWidth="1.5" opacity="0.7">
        <path d="M20 30 L48 30" />
        <path d="M48 30 L44 27 M48 30 L44 33" />
        <path d="M15 50 L52 50" />
        <path d="M52 50 L48 47 M52 50 L48 53" />
        <path d="M10 70 L54 70" />
        <path d="M54 70 L50 67 M54 70 L50 73" />
      </g>

      {/* Deflection indicator */}
      <g strokeWidth="1" opacity="0.6">
        <path d="M50 50 L56 50" strokeDasharray="2 2" />
        <path d="M50 48 L50 52" />
        <path d="M56 48 L56 52" />
        <text x="58" y="52" fontSize="5" fill="currentColor">δ</text>
      </g>

      {/* Moment diagram hint */}
      <g strokeWidth="0.8" opacity="0.4">
        <path d="M65 15 Q70 50, 65 85" strokeDasharray="3 2" />
      </g>

      {/* Base restraint */}
      <g strokeWidth="2">
        <path d="M45 85 L55 85 L55 92 L45 92 Z" />
        <path d="M40 92 L60 92" />
      </g>

      {/* Water level indicator */}
      <g strokeWidth="1" opacity="0.5">
        <path d="M5 20 L15 20" />
        <text x="8" y="18" fontSize="4" fill="currentColor">WL</text>
      </g>
    </g>
  </svg>
)

/**
 * EARTH PRESSURE - Effect View
 * Wall deflection and rotation under soil pressure
 */
export const EarthPressureEffectSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="earth-effect-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#earth-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Original wall position (dashed) */}
      <path d="M50 10 L50 85" strokeWidth="2" strokeDasharray="4 2" opacity="0.3" />

      {/* Deflected/rotated wall */}
      <g strokeWidth="3">
        <path d="M50 85 L58 10" />
      </g>

      {/* Soil on active side */}
      <g strokeWidth="0.5" opacity="0.3">
        <path d="M10 20 L48 20" />
        <path d="M10 40 L52 40" />
        <path d="M10 60 L55 60" />
        <path d="M10 80 L50 80" />
      </g>

      {/* Active pressure arrows */}
      <g strokeWidth="1.5" opacity="0.7">
        <path d="M30 25 L52 25" />
        <path d="M52 25 L48 22 M52 25 L48 28" />
        <path d="M20 50 L54 50" />
        <path d="M54 50 L50 47 M54 50 L50 53" />
        <path d="M15 75 L52 75" />
        <path d="M52 75 L48 72 M52 75 L48 78" />
      </g>

      {/* Wall rotation indicator */}
      <g strokeWidth="1" opacity="0.6">
        <path d="M50 10 L58 10" strokeDasharray="2 2" />
        <path d="M50 8 L50 12" />
        <path d="M58 8 L58 12" />
        <text x="54" y="7" fontSize="4" fill="currentColor">δ</text>
      </g>

      {/* Rotation angle arc */}
      <g strokeWidth="0.8" opacity="0.5">
        <path d="M50 75 Q54 72, 55 68" />
        <text x="56" y="74" fontSize="4" fill="currentColor">θ</text>
      </g>

      {/* Base/heel */}
      <g strokeWidth="2">
        <path d="M35 85 L65 85 L65 92 L35 92 Z" />
        <path d="M30 92 L70 92" />
      </g>

      {/* Passive resistance (toe) */}
      <g strokeWidth="1.2" opacity="0.5">
        <path d="M75 82 L62 82" />
        <path d="M62 82 L66 79 M62 82 L66 85" />
      </g>
    </g>
  </svg>
)

/**
 * BUOYANCY - Effect View
 * Structure lifted by hydrostatic uplift
 */
export const BuoyancyEffectSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="buoyancy-effect-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#buoyancy-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Original position (dashed) */}
      <path d="M25 50 L75 50 L75 85 L25 85 Z" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.3" />

      {/* Lifted structure */}
      <g strokeWidth="2.5">
        <path d="M25 40 L75 40 L75 75 L25 75 Z" />
      </g>

      {/* Water surface */}
      <g strokeWidth="1.5" opacity="0.6">
        <path d="M5 30 Q15 27, 25 30 Q35 33, 45 30 Q55 27, 65 30 Q75 33, 85 30 Q92 28, 95 30" />
      </g>

      {/* Water around structure */}
      <g strokeWidth="0.5" opacity="0.3">
        <path d="M8 45 Q12 43, 18 45" />
        <path d="M8 60 Q12 58, 18 60" />
        <path d="M82 45 Q86 43, 92 45" />
        <path d="M82 60 Q86 58, 92 60" />
      </g>

      {/* Uplift arrows */}
      <g strokeWidth="2" opacity="0.8">
        <path d="M35 90 L35 78" />
        <path d="M35 78 L32 82 M35 78 L38 82" />
        <path d="M50 90 L50 78" />
        <path d="M50 78 L47 82 M50 78 L53 82" />
        <path d="M65 90 L65 78" />
        <path d="M65 78 L62 82 M65 78 L68 82" />
      </g>

      {/* Uplift displacement indicator */}
      <g strokeWidth="1" opacity="0.6">
        <path d="M80 50 L80 40" strokeDasharray="2 2" />
        <path d="M78 50 L82 50" />
        <path d="M78 40 L82 40" />
        <text x="84" y="47" fontSize="5" fill="currentColor">Δ</text>
      </g>

      {/* Weight arrow (gravity) */}
      <g strokeWidth="1.5" opacity="0.5">
        <path d="M50 25 L50 38" />
        <path d="M50 38 L47 34 M50 38 L53 34" />
        <text x="55" y="30" fontSize="4" fill="currentColor">W</text>
      </g>

      {/* Net force indication */}
      <g opacity="0.4">
        <text x="50" y="58" fontSize="5" textAnchor="middle" fill="currentColor">Fb &gt; W</text>
      </g>

      {/* Original base position line */}
      <g strokeWidth="0.8" opacity="0.4">
        <path d="M20 85 L80 85" strokeDasharray="3 2" />
      </g>
    </g>
  </svg>
)

// =============================================================================
// LOAD TYPES EXPORT
// =============================================================================

export const LOAD_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'dead-load': DeadLoadSVG,
  'live-load': LiveLoadSVG,
  'wind-load': WindLoadSVG,
  'seismic-load': SeismicLoadSVG,
  'snow-load': SnowLoadSVG,
  'rain-load': RainLoadSVG,
  'impact-load': ImpactLoadSVG,
  'thermal-load': ThermalLoadSVG,
  'hydrostatic-load': HydrostaticLoadSVG,
  'earth-pressure': EarthPressureLoadSVG,
  'buoyancy-load': BuoyancyLoadSVG,
}

// Load type multi-view components
export const LOAD_SYMBOLIC_VIEWS: Record<string, React.FC<SVGProps>> = {
  'dead-load': DeadLoadSymbolicSVG,
  'live-load': LiveLoadSymbolicSVG,
  'wind-load': WindLoadSymbolicSVG,
  'seismic-load': SeismicLoadSymbolicSVG,
  'snow-load': SnowLoadSymbolicSVG,
  'rain-load': RainLoadSymbolicSVG,
  'impact-load': ImpactLoadSymbolicSVG,
  'thermal-load': ThermalLoadSymbolicSVG,
  'hydrostatic-load': HydrostaticLoadSymbolicSVG,
  'earth-pressure': EarthPressureSymbolicSVG,
  'buoyancy-load': BuoyancySymbolicSVG,
}

export const LOAD_EFFECT_VIEWS: Record<string, React.FC<SVGProps>> = {
  'dead-load': DeadLoadEffectSVG,
  'live-load': LiveLoadEffectSVG,
  'wind-load': WindLoadEffectSVG,
  'seismic-load': SeismicLoadEffectSVG,
  'snow-load': SnowLoadEffectSVG,
  'rain-load': RainLoadEffectSVG,
  'impact-load': ImpactLoadEffectSVG,
  'thermal-load': ThermalLoadEffectSVG,
  'hydrostatic-load': HydrostaticLoadEffectSVG,
  'earth-pressure': EarthPressureEffectSVG,
  'buoyancy-load': BuoyancyEffectSVG,
}
