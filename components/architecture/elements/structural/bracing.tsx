'use client'

import React from 'react'
import { HaloFilter, SVGProps } from './shared'

// =============================================================================
// BRACING TYPES - Lateral Force Resisting Systems
// =============================================================================

/**
 * DIAGONAL BRACING - Single diagonal member
 * The simplest and oldest form of bracing
 * Shows: One diagonal connecting opposite corners of a frame
 * Historical: Used since ancient timber framing, still common today
 */
export const DiagonalBracingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="diagonal-brace-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#diagonal-brace-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground line */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 92 L95 92" />
        <path d="M0 95 L100 95" />
      </g>

      {/* PRIMARY - Structural frame */}
      <g strokeWidth="2">
        {/* Columns */}
        <path d="M20 15 L20 88" />
        <path d="M80 15 L80 88" />
        {/* Beams */}
        <path d="M15 15 L85 15" />
        <path d="M15 88 L85 88" />
      </g>

      {/* THE DIAGONAL BRACE - Key feature */}
      <g strokeWidth="3">
        <path d="M20 88 L80 15" className="text-blue-600 dark:text-blue-400" stroke="currentColor" />
      </g>

      {/* Connection plates (gussets) */}
      <g strokeWidth="1" opacity="0.7">
        <circle cx="20" cy="88" r="4" />
        <circle cx="80" cy="15" r="4" />
      </g>

      {/* Column base plates */}
      <g strokeWidth="1.5">
        <path d="M12 88 L28 88 L28 92 L12 92 Z" />
        <path d="M72 88 L88 88 L88 92 L72 92 Z" />
      </g>

      {/* Force arrows showing lateral resistance */}
      <g strokeWidth="1" opacity="0.5">
        <path d="M5 50 L15 50" />
        <path d="M15 50 L12 47" />
        <path d="M15 50 L12 53" />
      </g>
    </g>
  </svg>
)

/**
 * X-BRACING (Cross Bracing) - Two diagonals crossing
 * Most common bracing type - resists forces in both directions
 * Shows: X pattern formed by two crossing diagonals
 * Used in: Steel frames, bridges, towers, earthquake zones
 */
export const XBracingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="x-brace-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#x-brace-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground line */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 92 L95 92" />
      </g>

      {/* PRIMARY - Structural frame */}
      <g strokeWidth="2">
        {/* Columns */}
        <path d="M20 15 L20 88" />
        <path d="M80 15 L80 88" />
        {/* Beams */}
        <path d="M15 15 L85 15" />
        <path d="M15 88 L85 88" />
      </g>

      {/* THE X-BRACES - Key feature: two crossing diagonals */}
      <g strokeWidth="2.5">
        <path d="M20 88 L80 15" />
        <path d="M20 15 L80 88" />
      </g>

      {/* Center connection plate */}
      <g strokeWidth="1.2">
        <circle cx="50" cy="51.5" r="5" />
      </g>

      {/* Corner gusset plates */}
      <g strokeWidth="1" opacity="0.7">
        <path d="M16 12 L24 12 L24 20 L16 20 Z" />
        <path d="M76 12 L84 12 L84 20 L76 20 Z" />
        <path d="M16 84 L24 84 L24 92 L16 92 Z" />
        <path d="M76 84 L84 84 L84 92 L76 92 Z" />
      </g>

      {/* Bidirectional force arrows */}
      <g strokeWidth="1" opacity="0.5">
        <path d="M5 50 L12 50" />
        <path d="M12 50 L9 47 M12 50 L9 53" />
        <path d="M95 50 L88 50" />
        <path d="M88 50 L91 47 M88 50 L91 53" />
      </g>
    </g>
  </svg>
)

/**
 * K-BRACING - Diagonals meet at column mid-height
 * Creates K shape, allows openings for doors/windows
 * Shows: Two diagonals meeting at center of one column
 * Caution: Can cause column failure in earthquakes (less common now)
 */
export const KBracingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="k-brace-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#k-brace-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground line */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 92 L95 92" />
      </g>

      {/* PRIMARY - Structural frame */}
      <g strokeWidth="2">
        {/* Columns */}
        <path d="M20 15 L20 88" />
        <path d="M80 15 L80 88" />
        {/* Beams */}
        <path d="M15 15 L85 15" />
        <path d="M15 88 L85 88" />
      </g>

      {/* THE K-BRACES - Key feature: diagonals meet at column mid-height */}
      <g strokeWidth="2.5">
        {/* Upper diagonal from top-right to mid-left */}
        <path d="M80 15 L20 51.5" />
        {/* Lower diagonal from bottom-right to mid-left */}
        <path d="M80 88 L20 51.5" />
      </g>

      {/* Mid-column connection plate - where K forms */}
      <g strokeWidth="1.2">
        <circle cx="20" cy="51.5" r="5" />
      </g>

      {/* Corner gusset plates */}
      <g strokeWidth="1" opacity="0.7">
        <path d="M76 12 L84 12 L84 20 L76 20 Z" />
        <path d="M76 84 L84 84 L84 92 L76 92 Z" />
      </g>

      {/* Opening indication (door/window possible) */}
      <g strokeDasharray="2 2" opacity="0.4" strokeWidth="0.8">
        <rect x="35" y="55" width="30" height="28" />
      </g>
    </g>
  </svg>
)

/**
 * CHEVRON BRACING (V-Bracing) - Inverted V meeting at beam
 * V-shape with apex at beam centerline
 * Shows: Two diagonals forming inverted V, meeting under beam
 * Used in: Modern seismic design, concentrates force at beam
 */
export const ChevronBracingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="chevron-brace-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#chevron-brace-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground line */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 92 L95 92" />
      </g>

      {/* PRIMARY - Structural frame */}
      <g strokeWidth="2">
        {/* Columns */}
        <path d="M20 15 L20 88" />
        <path d="M80 15 L80 88" />
        {/* Beams */}
        <path d="M15 15 L85 15" />
        <path d="M15 88 L85 88" />
      </g>

      {/* THE CHEVRON (Inverted V) - Key feature: apex at top beam */}
      <g strokeWidth="2.5">
        {/* Left diagonal from bottom-left to top-center */}
        <path d="M20 88 L50 15" />
        {/* Right diagonal from bottom-right to top-center */}
        <path d="M80 88 L50 15" />
      </g>

      {/* Apex connection at beam */}
      <g strokeWidth="1.2">
        <circle cx="50" cy="15" r="4" />
      </g>

      {/* Base gusset plates */}
      <g strokeWidth="1" opacity="0.7">
        <path d="M16 84 L24 84 L24 92 L16 92 Z" />
        <path d="M76 84 L84 84 L84 92 L76 92 Z" />
      </g>

      {/* Force distribution arrows */}
      <g strokeWidth="0.8" opacity="0.5">
        <path d="M50 20 L50 30" />
        <path d="M50 30 L47 27 M50 30 L53 27" />
      </g>
    </g>
  </svg>
)

/**
 * INVERTED CHEVRON (V-Bracing) - V meeting at beam from above
 * Regular V-shape with apex at lower beam
 * Shows: Two diagonals forming V, meeting at bottom beam
 * Alternative to chevron, different force distribution
 */
export const InvertedChevronBracingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="inv-chevron-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#inv-chevron-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground line */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 92 L95 92" />
      </g>

      {/* PRIMARY - Structural frame */}
      <g strokeWidth="2">
        {/* Columns */}
        <path d="M20 15 L20 88" />
        <path d="M80 15 L80 88" />
        {/* Beams */}
        <path d="M15 15 L85 15" />
        <path d="M15 88 L85 88" />
      </g>

      {/* THE INVERTED CHEVRON (V) - Key feature: apex at bottom beam */}
      <g strokeWidth="2.5">
        {/* Left diagonal from top-left to bottom-center */}
        <path d="M20 15 L50 88" />
        {/* Right diagonal from top-right to bottom-center */}
        <path d="M80 15 L50 88" />
      </g>

      {/* Apex connection at lower beam */}
      <g strokeWidth="1.2">
        <circle cx="50" cy="88" r="4" />
      </g>

      {/* Top gusset plates */}
      <g strokeWidth="1" opacity="0.7">
        <path d="M16 12 L24 12 L24 20 L16 20 Z" />
        <path d="M76 12 L84 12 L84 20 L76 20 Z" />
      </g>
    </g>
  </svg>
)

/**
 * KNEE BRACING - Small diagonal at corner joints
 * Traditional timber framing technique
 * Shows: Short diagonals triangulating corners only
 * Historical: Medieval barns, still used in timber frames
 */
export const KneeBracingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="knee-brace-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#knee-brace-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground line */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 92 L95 92" />
      </g>

      {/* PRIMARY - Timber frame (slightly thicker for wood appearance) */}
      <g strokeWidth="3">
        {/* Columns (posts) */}
        <path d="M20 15 L20 88" />
        <path d="M80 15 L80 88" />
        {/* Beam (girt) */}
        <path d="M15 15 L85 15" />
      </g>

      {/* THE KNEE BRACES - Key feature: short corner diagonals */}
      <g strokeWidth="2.5">
        {/* Top-left knee brace */}
        <path d="M20 35 L40 15" />
        {/* Top-right knee brace */}
        <path d="M80 35 L60 15" />
      </g>

      {/* Wooden peg connections (traditional joinery) */}
      <g strokeWidth="0.8" opacity="0.6">
        <circle cx="20" cy="35" r="2" />
        <circle cx="40" cy="15" r="2" />
        <circle cx="80" cy="35" r="2" />
        <circle cx="60" cy="15" r="2" />
      </g>

      {/* Stone foundation suggestion */}
      <g strokeWidth="1.5" opacity="0.5">
        <path d="M15 88 L25 88 L25 92 L15 92" />
        <path d="M75 88 L85 88 L85 92 L75 92" />
      </g>

      {/* Wood grain texture hints */}
      <g strokeWidth="0.4" opacity="0.3">
        <path d="M18 25 L18 75" />
        <path d="M22 30 L22 80" />
        <path d="M78 25 L78 75" />
        <path d="M82 30 L82 80" />
      </g>
    </g>
  </svg>
)

/**
 * ECCENTRIC BRACING (EBF) - Offset connection for ductility
 * Brace connects to beam AWAY from column, creating "link beam"
 * The link beam is the key feature - it yields and absorbs seismic energy
 * "e" represents the eccentricity (offset distance from column)
 */
export const EccentricBracingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="eccentric-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#eccentric-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground line with foundation hatching */}
      <g strokeWidth="0.8" opacity="0.4">
        <path d="M10 90 L90 90" />
        <path d="M15 90 L12 95" />
        <path d="M25 90 L22 95" />
        <path d="M35 90 L32 95" />
        <path d="M65 90 L62 95" />
        <path d="M75 90 L72 95" />
        <path d="M85 90 L82 95" />
      </g>

      {/* PRIMARY - Structural frame columns */}
      <g strokeWidth="2.5">
        <path d="M22 20 L22 88" />
        <path d="M78 20 L78 88" />
        {/* Top beam segments (outside the link) */}
        <path d="M18 20 L36 20" />
        <path d="M64 20 L82 20" />
        {/* Bottom beam */}
        <path d="M18 88 L82 88" />
      </g>

      {/* ═══ THE LINK BEAM ═══ */}
      {/* This is the KEY feature - the section that yields during earthquakes */}
      {/* Thicker stroke + glow effect to make it prominent */}
      <g strokeWidth="6" opacity="0.85">
        <path d="M36 20 L64 20" />
      </g>
      {/* Glow/highlight around link beam */}
      <g strokeWidth="10" opacity="0.12">
        <path d="M36 20 L64 20" />
      </g>

      {/* ECCENTRIC BRACES - They connect to the LINK, not to columns */}
      <g strokeWidth="2.5">
        <path d="M22 88 L36 20" />
        <path d="M78 88 L64 20" />
      </g>

      {/* Connection nodes at brace-to-link joints */}
      <g strokeWidth="1.5">
        <circle cx="36" cy="20" r="4" fill="currentColor" fillOpacity="0.35" />
        <circle cx="64" cy="20" r="4" fill="currentColor" fillOpacity="0.35" />
        <circle cx="22" cy="88" r="3" fill="currentColor" fillOpacity="0.2" />
        <circle cx="78" cy="88" r="3" fill="currentColor" fillOpacity="0.2" />
      </g>

      {/* ═══ ECCENTRICITY DIMENSION LINES ═══ */}
      {/* These show the offset "e" - the defining feature */}
      <g strokeWidth="0.8" opacity="0.65" strokeDasharray="2 1.5">
        {/* Left eccentricity */}
        <path d="M22 13 L36 13" />
        <path d="M22 13 L24.5 11 M22 13 L24.5 15" strokeDasharray="none" />
        <path d="M36 13 L33.5 11 M36 13 L33.5 15" strokeDasharray="none" />
        {/* Right eccentricity */}
        <path d="M64 13 L78 13" />
        <path d="M64 13 L66.5 11 M64 13 L66.5 15" strokeDasharray="none" />
        <path d="M78 13 L75.5 11 M78 13 L75.5 15" strokeDasharray="none" />
      </g>
      {/* "e" labels showing eccentricity */}
      <text x="29" y="10" fontSize="6" textAnchor="middle" fill="currentColor" opacity="0.75" fontStyle="italic">e</text>
      <text x="71" y="10" fontSize="6" textAnchor="middle" fill="currentColor" opacity="0.75" fontStyle="italic">e</text>

      {/* ═══ LINK BEAM LABEL ═══ */}
      <g opacity="0.85">
        <text x="50" y="34" fontSize="6" textAnchor="middle" fill="currentColor" fontWeight="bold">LINK</text>
        <path d="M50 29 L50 23" strokeWidth="1.2" />
        <path d="M50 23 L47.5 26 M50 23 L52.5 26" strokeWidth="1.2" />
      </g>

      {/* Energy dissipation waves under the link */}
      <g strokeWidth="1" opacity="0.45">
        <path d="M42 26 Q44.5 28.5, 42 31 Q39.5 33.5, 42 36" />
        <path d="M50 26 Q52.5 28.5, 50 31 Q47.5 33.5, 50 36" />
        <path d="M58 26 Q60.5 28.5, 58 31 Q55.5 33.5, 58 36" />
      </g>

      {/* Lateral force arrow (seismic load) */}
      <g strokeWidth="1.5" opacity="0.55">
        <path d="M4 52 L14 52" />
        <path d="M14 52 L10.5 49 M14 52 L10.5 55" />
        <text x="9" y="60" fontSize="5" textAnchor="middle" fill="currentColor" fontWeight="bold">F</text>
      </g>
    </g>
  </svg>
)

/**
 * MOMENT FRAME (Unbraced) - No diagonal members
 * Relies entirely on rigid beam-column connections
 * Shows: Rectangular frame with reinforced/rigid corners
 * Advantage: Completely open floor plan, no obstructions
 */
export const MomentFrameSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="moment-frame-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#moment-frame-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground line */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 92 L95 92" />
      </g>

      {/* PRIMARY - Structural frame (heavier members for moment resistance) */}
      <g strokeWidth="3">
        {/* Columns - thicker to resist bending */}
        <path d="M20 15 L20 88" />
        <path d="M80 15 L80 88" />
        {/* Beams - thicker for moment capacity */}
        <path d="M15 15 L85 15" />
        <path d="M15 88 L85 88" />
      </g>

      {/* RIGID CONNECTIONS - Key feature: moment-resisting joints */}
      <g strokeWidth="2" opacity="0.8">
        {/* Top-left rigid connection (haunched/reinforced) */}
        <path d="M20 15 L20 25 L30 15" />
        <path d="M22 17 L22 23 L28 17" strokeWidth="1" />

        {/* Top-right rigid connection */}
        <path d="M80 15 L80 25 L70 15" />
        <path d="M78 17 L78 23 L72 17" strokeWidth="1" />

        {/* Bottom-left rigid connection */}
        <path d="M20 88 L20 78 L30 88" />
        <path d="M22 86 L22 80 L28 86" strokeWidth="1" />

        {/* Bottom-right rigid connection */}
        <path d="M80 88 L80 78 L70 88" />
        <path d="M78 86 L78 80 L72 86" strokeWidth="1" />
      </g>

      {/* NO BRACES - Intentionally empty center */}
      {/* Open floor plan indication */}
      <g strokeDasharray="4 2" opacity="0.25" strokeWidth="0.6">
        <rect x="30" y="30" width="40" height="45" />
        <text x="50" y="55" fontSize="5" textAnchor="middle" fill="currentColor">OPEN</text>
      </g>

      {/* Base plates with moment capacity */}
      <g strokeWidth="1.5">
        <path d="M10 88 L30 88 L30 92 L10 92 Z" />
        <path d="M70 88 L90 88 L90 92 L70 92 Z" />
        {/* Anchor bolts */}
        <circle cx="15" cy="90" r="1.5" />
        <circle cx="25" cy="90" r="1.5" />
        <circle cx="75" cy="90" r="1.5" />
        <circle cx="85" cy="90" r="1.5" />
      </g>

      {/* Moment diagram hint */}
      <g strokeWidth="0.6" opacity="0.4">
        <path d="M20 40 Q15 51.5, 20 63" />
        <path d="M80 40 Q85 51.5, 80 63" />
      </g>
    </g>
  </svg>
)

/**
 * ZIPPER BRACING - Chevron braces with vertical "zipper" columns
 * Modern system that prevents soft-story collapse after brace buckling
 * Shows: Multi-story frame with chevron braces connected by vertical zippers
 * Key feature: Zipper columns redistribute forces when one brace buckles
 */
export const ZipperBracingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="zipper-bracing-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#zipper-bracing-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground line */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 95 L95 95" />
      </g>

      {/* PRIMARY - Multi-story frame */}
      <g strokeWidth="2">
        {/* Columns */}
        <path d="M15 5 L15 92" />
        <path d="M85 5 L85 92" />
        {/* Floor beams */}
        <path d="M15 5 L85 5" />
        <path d="M15 32 L85 32" />
        <path d="M15 62 L85 62" />
        <path d="M15 92 L85 92" />
      </g>

      {/* CHEVRON BRACES - Each floor */}
      <g strokeWidth="2">
        {/* Top floor chevrons */}
        <path d="M15 5 L50 22" />
        <path d="M85 5 L50 22" />
        {/* Middle floor chevrons */}
        <path d="M15 32 L50 49" />
        <path d="M85 32 L50 49" />
        {/* Bottom floor chevrons */}
        <path d="M15 62 L50 79" />
        <path d="M85 62 L50 79" />
      </g>

      {/* ZIPPER COLUMNS - Key feature: vertical members at brace intersections */}
      <g strokeWidth="2.5">
        {/* Zipper from top to mid brace point */}
        <path d="M50 22 L50 32" />
        {/* Zipper from mid to lower brace point */}
        <path d="M50 49 L50 62" />
        {/* Zipper from lower to bottom brace point */}
        <path d="M50 79 L50 92" />
      </g>

      {/* Connection nodes at zipper points */}
      <g strokeWidth="1">
        <circle cx="50" cy="22" r="2.5" fill="currentColor" opacity="0.4" />
        <circle cx="50" cy="49" r="2.5" fill="currentColor" opacity="0.4" />
        <circle cx="50" cy="79" r="2.5" fill="currentColor" opacity="0.4" />
      </g>

      {/* Force redistribution arrows (showing zipper action) */}
      <g strokeWidth="0.8" opacity="0.5">
        <path d="M50 25 L50 29" />
        <path d="M50 29 L48 27 M50 29 L52 27" />
        <path d="M50 52 L50 59" />
        <path d="M50 59 L48 57 M50 59 L52 57" />
      </g>
    </g>
  </svg>
)

/**
 * BUCKLING-RESTRAINED BRACE (BRB) - High-performance seismic bracing
 * Steel core inside concrete-filled tube prevents buckling
 * Shows: Cross-section view of BRB and frame installation
 * Key feature: Core yields symmetrically in tension AND compression
 */
export const BucklingRestrainedBraceSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="brb-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#brb-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Frame outline */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 92 L95 92" />
      </g>

      {/* PRIMARY - Structural frame */}
      <g strokeWidth="2">
        {/* Columns */}
        <path d="M15 10 L15 88" />
        <path d="M85 10 L85 88" />
        {/* Beams */}
        <path d="M10 10 L90 10" />
        <path d="M10 88 L90 88" />
      </g>

      {/* BRB BRACE - Key feature: encased core shown as layered element */}
      <g strokeWidth="2.5">
        {/* Outer casing (restraining tube) */}
        <path d="M20 18 L80 80" />
        {/* Parallel line to show casing thickness */}
        <path d="M22 16 L82 78" strokeWidth="1.5" opacity="0.6" />
        <path d="M18 20 L78 82" strokeWidth="1.5" opacity="0.6" />
      </g>

      {/* Detail callout - Cross section of BRB */}
      <g transform="translate(68, 20)">
        {/* Cross section circle */}
        <circle cx="0" cy="0" r="12" strokeWidth="1.5" />
        {/* Outer steel tube */}
        <circle cx="0" cy="0" r="10" strokeWidth="1" opacity="0.7" />
        {/* Concrete/mortar infill */}
        <circle cx="0" cy="0" r="7" strokeWidth="0.8" opacity="0.5" />
        {/* Steel core (unbonded) */}
        <rect x="-3" y="-6" width="6" height="12" strokeWidth="1.5" />
        {/* Gap/debonding layer indicator */}
        <path d="M-4 -4 L-4 4" strokeWidth="0.5" opacity="0.4" strokeDasharray="1 1" />
        <path d="M4 -4 L4 4" strokeWidth="0.5" opacity="0.4" strokeDasharray="1 1" />
      </g>

      {/* Callout line */}
      <g strokeWidth="0.6" opacity="0.5">
        <path d="M50 49 L60 28" />
      </g>

      {/* Connection gussets */}
      <g strokeWidth="1.5">
        {/* Top gusset */}
        <path d="M15 10 L15 25 L30 10 Z" />
        {/* Bottom gusset */}
        <path d="M85 88 L85 73 L70 88 Z" />
      </g>

      {/* Hysteretic behavior hint - symmetric yielding */}
      <g strokeWidth="0.8" opacity="0.4" transform="translate(12, 55)">
        <path d="M0 10 L5 5 L10 10 L5 15 Z" />
        <path d="M2 7 L8 13" />
        <path d="M2 13 L8 7" />
        <text x="5" y="22" fontSize="4" textAnchor="middle" fill="currentColor">YIELD</text>
      </g>
    </g>
  </svg>
)

// =============================================================================
// BRACING TYPES EXPORT MAP
// =============================================================================

export const BRACING_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'diagonal-bracing': DiagonalBracingSVG,
  'x-bracing': XBracingSVG,
  'k-bracing': KBracingSVG,
  'chevron-bracing': ChevronBracingSVG,
  'inverted-chevron-bracing': InvertedChevronBracingSVG,
  'knee-bracing': KneeBracingSVG,
  'eccentric-bracing': EccentricBracingSVG,
  'moment-frame': MomentFrameSVG,
  'zipper-bracing': ZipperBracingSVG,
  'buckling-restrained-brace': BucklingRestrainedBraceSVG,
}
