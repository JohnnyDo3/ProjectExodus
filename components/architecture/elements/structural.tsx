'use client'

import React from 'react'
import { S } from './svgStyleTokens'

// =============================================================================
// STRUCTURAL ENGINEERING SVG COMPONENTS
// Educational diagrams for bracing, trusses, foundations, and load types
// =============================================================================

// Reusable HaloFilter for golden glow effect (matching other architecture SVGs)
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
    <g filter={showHalo ? "url(#diagonal-brace-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground line */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 92 L95 92" />
        <path d="M0 95 L100 95" />
      </g>

      {/* PRIMARY - Structural frame */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Columns */}
        <path d="M20 15 L20 88" />
        <path d="M80 15 L80 88" />
        {/* Beams */}
        <path d="M15 15 L85 15" />
        <path d="M15 88 L85 88" />
      </g>

      {/* THE DIAGONAL BRACE - Key feature */}
      <g strokeWidth={S.P.strokeWidthHeavy}>
        <path d="M20 88 L80 15" className="text-blue-600 dark:text-blue-400" stroke="currentColor" />
      </g>

      {/* Connection plates (gussets) */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong}>
        <circle cx="20" cy="88" r="4" />
        <circle cx="80" cy="15" r="4" />
      </g>

      {/* Column base plates */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M12 88 L28 88 L28 92 L12 92 Z" />
        <path d="M72 88 L88 88 L88 92 L72 92 Z" />
      </g>

      {/* Force arrows showing lateral resistance */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
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
    <g filter={showHalo ? "url(#x-brace-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground line */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 92 L95 92" />
      </g>

      {/* PRIMARY - Structural frame */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Columns */}
        <path d="M20 15 L20 88" />
        <path d="M80 15 L80 88" />
        {/* Beams */}
        <path d="M15 15 L85 15" />
        <path d="M15 88 L85 88" />
      </g>

      {/* THE X-BRACES - Key feature: two crossing diagonals */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M20 88 L80 15" />
        <path d="M20 15 L80 88" />
      </g>

      {/* Center connection plate */}
      <g strokeWidth={S.D.strokeWidthBold}>
        <circle cx="50" cy="51.5" r="5" />
      </g>

      {/* Corner gusset plates */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M16 12 L24 12 L24 20 L16 20 Z" />
        <path d="M76 12 L84 12 L84 20 L76 20 Z" />
        <path d="M16 84 L24 84 L24 92 L16 92 Z" />
        <path d="M76 84 L84 84 L84 92 L76 92 Z" />
      </g>

      {/* Bidirectional force arrows */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
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
    <g filter={showHalo ? "url(#k-brace-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground line */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 92 L95 92" />
      </g>

      {/* PRIMARY - Structural frame */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Columns */}
        <path d="M20 15 L20 88" />
        <path d="M80 15 L80 88" />
        {/* Beams */}
        <path d="M15 15 L85 15" />
        <path d="M15 88 L85 88" />
      </g>

      {/* THE K-BRACES - Key feature: diagonals meet at column mid-height */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Upper diagonal from top-right to mid-left */}
        <path d="M80 15 L20 51.5" />
        {/* Lower diagonal from bottom-right to mid-left */}
        <path d="M80 88 L20 51.5" />
      </g>

      {/* Mid-column connection plate - where K forms */}
      <g strokeWidth={S.D.strokeWidthBold}>
        <circle cx="20" cy="51.5" r="5" />
      </g>

      {/* Corner gusset plates */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M76 12 L84 12 L84 20 L76 20 Z" />
        <path d="M76 84 L84 84 L84 92 L76 92 Z" />
      </g>

      {/* Opening indication (door/window possible) */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.D.strokeWidth}>
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
    <g filter={showHalo ? "url(#chevron-brace-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground line */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 92 L95 92" />
      </g>

      {/* PRIMARY - Structural frame */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Columns */}
        <path d="M20 15 L20 88" />
        <path d="M80 15 L80 88" />
        {/* Beams */}
        <path d="M15 15 L85 15" />
        <path d="M15 88 L85 88" />
      </g>

      {/* THE CHEVRON (Inverted V) - Key feature: apex at top beam */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Left diagonal from bottom-left to top-center */}
        <path d="M20 88 L50 15" />
        {/* Right diagonal from bottom-right to top-center */}
        <path d="M80 88 L50 15" />
      </g>

      {/* Apex connection at beam */}
      <g strokeWidth={S.D.strokeWidthBold}>
        <circle cx="50" cy="15" r="4" />
      </g>

      {/* Base gusset plates */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M16 84 L24 84 L24 92 L16 92 Z" />
        <path d="M76 84 L84 84 L84 92 L76 92 Z" />
      </g>

      {/* Force distribution arrows */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
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
    <g filter={showHalo ? "url(#inv-chevron-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground line */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 92 L95 92" />
      </g>

      {/* PRIMARY - Structural frame */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Columns */}
        <path d="M20 15 L20 88" />
        <path d="M80 15 L80 88" />
        {/* Beams */}
        <path d="M15 15 L85 15" />
        <path d="M15 88 L85 88" />
      </g>

      {/* THE INVERTED CHEVRON (V) - Key feature: apex at bottom beam */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Left diagonal from top-left to bottom-center */}
        <path d="M20 15 L50 88" />
        {/* Right diagonal from top-right to bottom-center */}
        <path d="M80 15 L50 88" />
      </g>

      {/* Apex connection at lower beam */}
      <g strokeWidth={S.D.strokeWidthBold}>
        <circle cx="50" cy="88" r="4" />
      </g>

      {/* Top gusset plates */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong}>
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
    <g filter={showHalo ? "url(#knee-brace-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground line */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 92 L95 92" />
      </g>

      {/* PRIMARY - Timber frame (slightly thicker for wood appearance) */}
      <g strokeWidth={S.P.strokeWidthHeavy}>
        {/* Columns (posts) */}
        <path d="M20 15 L20 88" />
        <path d="M80 15 L80 88" />
        {/* Beam (girt) */}
        <path d="M15 15 L85 15" />
      </g>

      {/* THE KNEE BRACES - Key feature: short corner diagonals */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Top-left knee brace */}
        <path d="M20 35 L40 15" />
        {/* Top-right knee brace */}
        <path d="M80 35 L60 15" />
      </g>

      {/* Wooden peg connections (traditional joinery) */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <circle cx="20" cy="35" r="2" />
        <circle cx="40" cy="15" r="2" />
        <circle cx="80" cy="35" r="2" />
        <circle cx="60" cy="15" r="2" />
      </g>

      {/* Stone foundation suggestion */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
        <path d="M15 88 L25 88 L25 92 L15 92" />
        <path d="M75 88 L85 88 L85 92 L75 92" />
      </g>

      {/* Wood grain texture hints */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacity}>
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
 * Shows: Diagonal with offset, highlighted link beam section
 * Modern seismic design: Link yields and absorbs energy
 */
export const EccentricBracingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="eccentric-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#eccentric-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground line */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 92 L95 92" />
      </g>

      {/* PRIMARY - Structural frame */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Columns */}
        <path d="M20 15 L20 88" />
        <path d="M80 15 L80 88" />
        {/* Top beam */}
        <path d="M15 15 L85 15" />
        {/* Bottom beam */}
        <path d="M15 88 L85 88" />
      </g>

      {/* THE LINK BEAM - Key feature: highlighted section that yields */}
      <g strokeWidth={S.P.strokeWidthHeavy} opacity={S.D.opacity}>
        <path d="M35 15 L50 15" className="text-amber-500" stroke="currentColor" />
      </g>

      {/* ECCENTRIC BRACES - Note offset from column */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Left brace: from bottom-left to OFFSET point on top beam */}
        <path d="M20 88 L35 15" />
        {/* Right brace: from bottom-right to OFFSET point on top beam */}
        <path d="M80 88 L50 15" />
      </g>

      {/* Connection points */}
      <g strokeWidth={S.D.strokeWidthBold}>
        <circle cx="35" cy="15" r="3" />
        <circle cx="50" cy="15" r="3" />
      </g>

      {/* Link beam label indicator */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M42.5 8 L42.5 12" />
        <path d="M38 5 L47 5" />
        <text x="42.5" y="4" fontSize="4" textAnchor="middle" fill="currentColor" opacity={S.D.opacity}>link</text>
      </g>

      {/* Energy dissipation symbol */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate}>
        <path d="M40 20 Q42 22, 40 24 Q38 26, 40 28" />
        <path d="M45 20 Q47 22, 45 24 Q43 26, 45 28" />
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
    <g filter={showHalo ? "url(#moment-frame-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground line */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 92 L95 92" />
      </g>

      {/* PRIMARY - Structural frame (heavier members for moment resistance) */}
      <g strokeWidth={S.P.strokeWidthHeavy}>
        {/* Columns - thicker to resist bending */}
        <path d="M20 15 L20 88" />
        <path d="M80 15 L80 88" />
        {/* Beams - thicker for moment capacity */}
        <path d="M15 15 L85 15" />
        <path d="M15 88 L85 88" />
      </g>

      {/* RIGID CONNECTIONS - Key feature: moment-resisting joints */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        {/* Top-left rigid connection (haunched/reinforced) */}
        <path d="M20 15 L20 25 L30 15" />
        <path d="M22 17 L22 23 L28 17" strokeWidth={S.D.strokeWidth} />

        {/* Top-right rigid connection */}
        <path d="M80 15 L80 25 L70 15" />
        <path d="M78 17 L78 23 L72 17" strokeWidth={S.D.strokeWidth} />

        {/* Bottom-left rigid connection */}
        <path d="M20 88 L20 78 L30 88" />
        <path d="M22 86 L22 80 L28 86" strokeWidth={S.D.strokeWidth} />

        {/* Bottom-right rigid connection */}
        <path d="M80 88 L80 78 L70 88" />
        <path d="M78 86 L78 80 L72 86" strokeWidth={S.D.strokeWidth} />
      </g>

      {/* NO BRACES - Intentionally empty center */}
      {/* Open floor plan indication */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        <rect x="30" y="30" width="40" height="45" />
        <text x="50" y="55" fontSize="5" textAnchor="middle" fill="currentColor">OPEN</text>
      </g>

      {/* Base plates with moment capacity */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M10 88 L30 88 L30 92 L10 92 Z" />
        <path d="M70 88 L90 88 L90 92 L70 92 Z" />
        {/* Anchor bolts */}
        <circle cx="15" cy="90" r="1.5" />
        <circle cx="25" cy="90" r="1.5" />
        <circle cx="75" cy="90" r="1.5" />
        <circle cx="85" cy="90" r="1.5" />
      </g>

      {/* Moment diagram hint */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate}>
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
    <g filter={showHalo ? "url(#zipper-bracing-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground line */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 95 L95 95" />
      </g>

      {/* PRIMARY - Multi-story frame */}
      <g strokeWidth={S.P.strokeWidth}>
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
      <g strokeWidth={S.P.strokeWidth}>
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
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Zipper from top to mid brace point */}
        <path d="M50 22 L50 32" />
        {/* Zipper from mid to lower brace point */}
        <path d="M50 49 L50 62" />
        {/* Zipper from lower to bottom brace point */}
        <path d="M50 79 L50 92" />
      </g>

      {/* Connection nodes at zipper points */}
      <g strokeWidth={S.D.strokeWidth}>
        <circle cx="50" cy="22" r="2.5" fill="currentColor" opacity={S.D.opacitySubtle} />
        <circle cx="50" cy="49" r="2.5" fill="currentColor" opacity={S.D.opacitySubtle} />
        <circle cx="50" cy="79" r="2.5" fill="currentColor" opacity={S.D.opacitySubtle} />
      </g>

      {/* Force redistribution arrows (showing zipper action) */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
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
    <g filter={showHalo ? "url(#brb-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Frame outline */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 92 L95 92" />
      </g>

      {/* PRIMARY - Structural frame */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Columns */}
        <path d="M15 10 L15 88" />
        <path d="M85 10 L85 88" />
        {/* Beams */}
        <path d="M10 10 L90 10" />
        <path d="M10 88 L90 88" />
      </g>

      {/* BRB BRACE - Key feature: encased core shown as layered element */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Outer casing (restraining tube) */}
        <path d="M20 18 L80 80" />
        {/* Parallel line to show casing thickness */}
        <path d="M22 16 L82 78" strokeWidth={S.P.strokeWidth} opacity={S.D.opacity} />
        <path d="M18 20 L78 82" strokeWidth={S.P.strokeWidth} opacity={S.D.opacity} />
      </g>

      {/* Detail callout - Cross section of BRB */}
      <g transform="translate(68, 20)">
        {/* Cross section circle */}
        <circle cx="0" cy="0" r="12" strokeWidth={S.P.strokeWidth} />
        {/* Outer steel tube */}
        <circle cx="0" cy="0" r="10" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        {/* Concrete/mortar infill */}
        <circle cx="0" cy="0" r="7" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        {/* Steel core (unbonded) */}
        <rect x="-3" y="-6" width="6" height="12" strokeWidth={S.P.strokeWidth} />
        {/* Gap/debonding layer indicator */}
        <path d="M-4 -4 L-4 4" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} strokeDasharray={S.E.dash} />
        <path d="M4 -4 L4 4" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} strokeDasharray={S.E.dash} />
      </g>

      {/* Callout line */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate}>
        <path d="M50 49 L60 28" />
      </g>

      {/* Connection gussets */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Top gusset */}
        <path d="M15 10 L15 25 L30 10 Z" />
        {/* Bottom gusset */}
        <path d="M85 88 L85 73 L70 88 Z" />
      </g>

      {/* Hysteretic behavior hint - symmetric yielding */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} transform="translate(12, 55)">
        <path d="M0 10 L5 5 L10 10 L5 15 Z" />
        <path d="M2 7 L8 13" />
        <path d="M2 13 L8 7" />
        <text x="5" y="22" fontSize="4" textAnchor="middle" fill="currentColor">YIELD</text>
      </g>
    </g>
  </svg>
)

// =============================================================================
// BRACING TYPES EXPORT
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

// =============================================================================
// TRUSS TYPES - Triangulated Structural Systems
// =============================================================================

/**
 * KING POST TRUSS - Simplest truss with ONE central vertical post
 * 3/4 isometric view showing depth. Triangle profile with single king post.
 * The central post is in TENSION (pulling up on the tie beam).
 */
export const KingPostTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="king-post-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#king-post-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground / support line */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M3 82 L75 82" />
        <path d="M75 82 L97 74" />
      </g>

      {/* FAR-SIDE TRUSS (back face, faded for depth) */}
      <g opacity={0.25} strokeWidth={S.P.strokeWidthLight}>
        {/* Back bottom chord */}
        <path d="M22 68 L92 68" />
        {/* Back left rafter */}
        <path d="M22 68 L57 28" />
        {/* Back right rafter */}
        <path d="M92 68 L57 28" />
        {/* Back king post */}
        <path d="M57 28 L57 68" />
        {/* Back struts */}
        <path d="M57 45 L39 56" />
        <path d="M57 45 L75 56" />
      </g>

      {/* FAR-SIDE shadow fill for depth */}
      <path d="M22 68 L57 28 L92 68 Z" fill="currentColor" opacity={S.E.fillOpacity} />

      {/* CROSS MEMBERS connecting near and far faces */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        {/* Bottom chord cross ties */}
        <path d="M8 72 L22 68" />
        <path d="M80 72 L92 68" />
        {/* Ridge cross tie */}
        <path d="M45 32 L57 28" />
        {/* Mid-post cross tie */}
        <path d="M45 49 L57 45" />
      </g>

      {/* NEAR-SIDE TRUSS (front face, full opacity) */}
      {/* Bottom chord (tie beam) - compression, thicker */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M8 72 L80 72" />
      </g>
      {/* Left rafter */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M8 72 L45 32" />
      </g>
      {/* Right rafter */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M80 72 L45 32" />
      </g>

      {/* THE KING POST - single central vertical (TENSION - thinner) */}
      <g strokeWidth={S.P.strokeWidthHeavy}>
        <path d="M45 32 L45 72" />
      </g>

      {/* Struts from king post to rafters (COMPRESSION - thicker) */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M45 49 L27 60" />
        <path d="M45 49 L63 60" />
      </g>

      {/* Gusset plates at joints (small filled triangles) */}
      <g fill="currentColor" opacity={S.D.opacityStrong} strokeWidth={S.D.strokeWidthFine}>
        {/* Ridge gusset */}
        <path d="M42 32 L48 32 L45 28 Z" />
        {/* Bottom-left gusset */}
        <path d="M5 72 L11 72 L8 69 Z" />
        {/* Bottom-right gusset */}
        <path d="M77 72 L83 72 L80 69 Z" />
        {/* King post base gusset */}
        <path d="M42 72 L48 72 L45 69 Z" />
        {/* Mid-post gusset */}
        <circle cx="45" cy="49" r="2" />
      </g>

      {/* Support triangles */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M3 76 L13 76 L8 72 Z" />
        <path d="M75 76 L85 76 L80 72 Z" />
      </g>

      {/* Tension indicators on king post */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate}>
        <path d="M42 40 L42 62" strokeDasharray={S.E.dash} />
        <path d="M48 40 L48 62" strokeDasharray={S.E.dash} />
      </g>
    </g>
  </svg>
)

/**
 * QUEEN POST TRUSS - TWO vertical posts creating a flat top section
 * 3/4 isometric view. Wider span than King Post with straining beam.
 * Posts in TENSION, straining beam in COMPRESSION.
 */
export const QueenPostTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="queen-post-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#queen-post-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground line */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M3 82 L75 82" />
        <path d="M75 82 L97 74" />
      </g>

      {/* FAR-SIDE TRUSS (back face) */}
      <g opacity={0.25} strokeWidth={S.P.strokeWidthLight}>
        <path d="M22 68 L92 68" />
        <path d="M22 68 L57 28" />
        <path d="M92 68 L57 28" />
        {/* Back queen posts */}
        <path d="M40 68 L40 42" />
        <path d="M74 68 L74 42" />
        {/* Back straining beam */}
        <path d="M40 42 L74 42" />
        <path d="M40 42 L57 28" />
        <path d="M74 42 L57 28" />
      </g>

      {/* Shadow fill */}
      <path d="M22 68 L57 28 L92 68 Z" fill="currentColor" opacity={S.E.fillOpacity} />

      {/* CROSS MEMBERS (depth connectors) */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M8 72 L22 68" />
        <path d="M80 72 L92 68" />
        <path d="M45 32 L57 28" />
        {/* Queen post cross ties */}
        <path d="M28 72 L40 68" />
        <path d="M28 46 L40 42" />
        <path d="M62 72 L74 68" />
        <path d="M62 46 L74 42" />
      </g>

      {/* NEAR-SIDE TRUSS (front face) */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Bottom chord */}
        <path d="M8 72 L80 72" />
        {/* Left rafter */}
        <path d="M8 72 L45 32" />
        {/* Right rafter */}
        <path d="M80 72 L45 32" />
      </g>

      {/* THE TWO QUEEN POSTS - prominent vertical members (TENSION) */}
      <g strokeWidth={S.P.strokeWidthHeavy}>
        <path d="M28 72 L28 46" />
        <path d="M62 72 L62 46" />
      </g>

      {/* Straining beam between queen posts (COMPRESSION - thick) */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M28 46 L62 46" />
      </g>

      {/* Struts from straining beam to apex */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M28 46 L45 32" />
        <path d="M62 46 L45 32" />
      </g>

      {/* Gusset plates */}
      <g fill="currentColor" opacity={S.D.opacityStrong} strokeWidth={S.D.strokeWidthFine}>
        <path d="M42 32 L48 32 L45 28 Z" />
        <circle cx="28" cy="46" r="2" />
        <circle cx="62" cy="46" r="2" />
        <circle cx="28" cy="72" r="2" />
        <circle cx="62" cy="72" r="2" />
        <path d="M5 72 L11 72 L8 69 Z" />
        <path d="M77 72 L83 72 L80 69 Z" />
      </g>

      {/* Support triangles */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M3 76 L13 76 L8 72 Z" />
        <path d="M75 76 L85 76 L80 72 Z" />
      </g>

      {/* Tension indicators on queen posts */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate}>
        <path d="M25 52 L25 66" strokeDasharray={S.E.dash} />
        <path d="M31 52 L31 66" strokeDasharray={S.E.dash} />
        <path d="M59 52 L59 66" strokeDasharray={S.E.dash} />
        <path d="M65 52 L65 66" strokeDasharray={S.E.dash} />
      </g>
    </g>
  </svg>
)

/**
 * PRATT TRUSS (1844) - Diagonals slope TOWARD center (V-shapes pointing down)
 * 3/4 isometric view. N-patterns with diagonals in TENSION, verticals in COMPRESSION.
 * The diagonal direction is key: they point inward/downward.
 */
export const PrattTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pratt-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#pratt-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground line */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M3 78 L70 78" />
        <path d="M70 78 L97 70" />
      </g>

      {/* FAR-SIDE TRUSS (back face) */}
      <g opacity={0.2} strokeWidth={S.P.strokeWidthLight}>
        {/* Back top chord */}
        <path d="M18 32 L92 32" />
        {/* Back bottom chord */}
        <path d="M18 68 L92 68" />
        {/* Back verticals */}
        <path d="M18 32 L18 68" />
        <path d="M36.5 32 L36.5 68" />
        <path d="M55 32 L55 68" />
        <path d="M73.5 32 L73.5 68" />
        <path d="M92 32 L92 68" />
        {/* Back Pratt diagonals (toward center) */}
        <path d="M18 32 L36.5 68" />
        <path d="M36.5 32 L55 68" />
        <path d="M92 32 L73.5 68" />
        <path d="M73.5 32 L55 68" />
      </g>

      {/* Shadow fill on far side */}
      <rect x="18" y="32" width="74" height="36" fill="currentColor" opacity={S.E.fillOpacity} />

      {/* CROSS MEMBERS connecting near and far faces */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        {/* Top chord cross ties */}
        <path d="M5 36 L18 32" />
        <path d="M24 36 L36.5 32" />
        <path d="M43 36 L55 32" />
        <path d="M62 36 L73.5 32" />
        <path d="M81 36 L92 32" />
        {/* Bottom chord cross ties */}
        <path d="M5 72 L18 68" />
        <path d="M24 72 L36.5 68" />
        <path d="M43 72 L55 68" />
        <path d="M62 72 L73.5 68" />
        <path d="M81 72 L92 68" />
      </g>

      {/* NEAR-SIDE: Top and bottom chords */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M5 36 L81 36" />
        <path d="M5 72 L81 72" />
      </g>

      {/* Vertical members (COMPRESSION - thicker) */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M5 36 L5 72" />
        <path d="M24 36 L24 72" />
        <path d="M43 36 L43 72" />
        <path d="M62 36 L62 72" />
        <path d="M81 36 L81 72" />
      </g>

      {/* PRATT DIAGONALS - slope TOWARD center (TENSION - thinner) */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Left half: diagonals go from top-left to bottom-right */}
        <path d="M5 36 L24 72" />
        <path d="M24 36 L43 72" />
        {/* Right half: diagonals go from top-right to bottom-left */}
        <path d="M81 36 L62 72" />
        <path d="M62 36 L43 72" />
      </g>

      {/* Gusset plates at joints */}
      <g fill="currentColor" opacity={S.D.opacity} strokeWidth={S.D.strokeWidthFine}>
        <circle cx="5" cy="36" r="2" />
        <circle cx="24" cy="36" r="2" />
        <circle cx="43" cy="36" r="2" />
        <circle cx="62" cy="36" r="2" />
        <circle cx="81" cy="36" r="2" />
        <circle cx="5" cy="72" r="2" />
        <circle cx="24" cy="72" r="2" />
        <circle cx="43" cy="72" r="2" />
        <circle cx="62" cy="72" r="2" />
        <circle cx="81" cy="72" r="2" />
      </g>

      {/* Support symbols */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M0 75 L10 75 L5 72 Z" />
        <circle cx="81" cy="75" r="2" />
        <path d="M76 77 L86 77" />
      </g>

      {/* Tension arrow indicators on diagonals */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        {/* Arrow on left diagonal showing tension direction */}
        <path d="M13 50 L17 58" />
        <path d="M17 58 L15 55 M17 58 L19.5 56" />
        {/* Arrow on right diagonal */}
        <path d="M73 50 L69 58" />
        <path d="M69 58 L71 55 M69 58 L66.5 56" />
      </g>
    </g>
  </svg>
)

/**
 * HOWE TRUSS (1840) - Diagonals slope AWAY from center (opposite of Pratt)
 * 3/4 isometric view. N-patterns mirrored: diagonals in COMPRESSION, verticals in TENSION.
 * Key distinction from Pratt: V-shapes point UP, diagonals go outward.
 */
export const HoweTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="howe-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#howe-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground line */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M3 78 L70 78" />
        <path d="M70 78 L97 70" />
      </g>

      {/* FAR-SIDE TRUSS (back face) */}
      <g opacity={0.2} strokeWidth={S.P.strokeWidthLight}>
        <path d="M18 32 L92 32" />
        <path d="M18 68 L92 68" />
        <path d="M18 32 L18 68" />
        <path d="M36.5 32 L36.5 68" />
        <path d="M55 32 L55 68" />
        <path d="M73.5 32 L73.5 68" />
        <path d="M92 32 L92 68" />
        {/* Back Howe diagonals (AWAY from center - opposite of Pratt) */}
        <path d="M36.5 32 L18 68" />
        <path d="M55 32 L36.5 68" />
        <path d="M55 32 L73.5 68" />
        <path d="M73.5 32 L92 68" />
      </g>

      {/* Shadow fill */}
      <rect x="18" y="32" width="74" height="36" fill="currentColor" opacity={S.E.fillOpacity} />

      {/* CROSS MEMBERS connecting near and far faces */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M5 36 L18 32" />
        <path d="M24 36 L36.5 32" />
        <path d="M43 36 L55 32" />
        <path d="M62 36 L73.5 32" />
        <path d="M81 36 L92 32" />
        <path d="M5 72 L18 68" />
        <path d="M24 72 L36.5 68" />
        <path d="M43 72 L55 68" />
        <path d="M62 72 L73.5 68" />
        <path d="M81 72 L92 68" />
      </g>

      {/* NEAR-SIDE: Top and bottom chords */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M5 36 L81 36" />
        <path d="M5 72 L81 72" />
      </g>

      {/* Vertical members (TENSION in Howe - thinner) */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M5 36 L5 72" />
        <path d="M24 36 L24 72" />
        <path d="M43 36 L43 72" />
        <path d="M62 36 L62 72" />
        <path d="M81 36 L81 72" />
      </g>

      {/* HOWE DIAGONALS - slope AWAY from center (COMPRESSION - thicker) */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Left half: diagonals go from top-right to bottom-left (outward) */}
        <path d="M24 36 L5 72" />
        <path d="M43 36 L24 72" />
        {/* Right half: diagonals go from top-left to bottom-right (outward) */}
        <path d="M43 36 L62 72" />
        <path d="M62 36 L81 72" />
      </g>

      {/* Gusset plates at joints */}
      <g fill="currentColor" opacity={S.D.opacity} strokeWidth={S.D.strokeWidthFine}>
        <circle cx="5" cy="36" r="2" />
        <circle cx="24" cy="36" r="2" />
        <circle cx="43" cy="36" r="2" />
        <circle cx="62" cy="36" r="2" />
        <circle cx="81" cy="36" r="2" />
        <circle cx="5" cy="72" r="2" />
        <circle cx="24" cy="72" r="2" />
        <circle cx="43" cy="72" r="2" />
        <circle cx="62" cy="72" r="2" />
        <circle cx="81" cy="72" r="2" />
      </g>

      {/* Support symbols */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M0 75 L10 75 L5 72 Z" />
        <circle cx="81" cy="75" r="2" />
        <path d="M76 77 L86 77" />
      </g>

      {/* Compression arrow indicators on diagonals (inward arrows) */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        {/* Arrow showing compression direction on left diagonal */}
        <path d="M17 49 L12 58" />
        <path d="M17 49 L14.5 51 M17 49 L17 52.5" />
        {/* Arrow on right diagonal */}
        <path d="M69 49 L74 58" />
        <path d="M69 49 L71.5 51 M69 49 L69 52.5" />
      </g>

      {/* Tension indicators on verticals */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate}>
        <path d="M22 44 L22 64" strokeDasharray={S.E.dash} />
        <path d="M26 44 L26 64" strokeDasharray={S.E.dash} />
        <path d="M60 44 L60 64" strokeDasharray={S.E.dash} />
        <path d="M64 44 L64 64" strokeDasharray={S.E.dash} />
      </g>
    </g>
  </svg>
)

/**
 * WARREN TRUSS (1848) - NO verticals, only zigzag W-pattern diagonals
 * 3/4 isometric view. Equilateral triangles only. Distinctly different from Pratt/Howe.
 * Alternating tension and compression in diagonals.
 */
export const WarrenTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="warren-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#warren-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground line */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M3 78 L70 78" />
        <path d="M70 78 L97 70" />
      </g>

      {/* FAR-SIDE TRUSS (back face) */}
      <g opacity={0.2} strokeWidth={S.P.strokeWidthLight}>
        <path d="M18 32 L92 32" />
        <path d="M18 68 L92 68" />
        {/* Back zigzag - NO verticals */}
        <path d="M18 68 L33 32 L48 68 L63 32 L78 68 L92 32" />
        {/* End verticals only */}
        <path d="M18 32 L18 68" />
        <path d="M92 32 L92 68" />
      </g>

      {/* Shadow fill */}
      <rect x="18" y="32" width="74" height="36" fill="currentColor" opacity={S.E.fillOpacity} />

      {/* CROSS MEMBERS connecting near and far faces */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        {/* Top chord cross ties (at zigzag peaks) */}
        <path d="M5 36 L18 32" />
        <path d="M81 36 L92 32" />
        <path d="M21 36 L33 32" />
        <path d="M51 36 L63 32" />
        {/* Bottom chord cross ties (at zigzag valleys) */}
        <path d="M5 72 L18 68" />
        <path d="M81 72 L92 68" />
        <path d="M36 72 L48 68" />
        <path d="M66 72 L78 68" />
      </g>

      {/* NEAR-SIDE: Top and bottom chords */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M5 36 L81 36" />
        <path d="M5 72 L81 72" />
      </g>

      {/* WARREN ZIGZAG - Key feature: NO VERTICALS, only diagonals */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M5 72 L21 36" />
        <path d="M21 36 L36 72" />
        <path d="M36 72 L51 36" />
        <path d="M51 36 L66 72" />
        <path d="M66 72 L81 36" />
      </g>

      {/* End verticals only (structural necessity, not pattern) */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M5 36 L5 72" />
        <path d="M81 36 L81 72" />
      </g>

      {/* Gusset plates at zigzag joints */}
      <g fill="currentColor" opacity={S.D.opacity} strokeWidth={S.D.strokeWidthFine}>
        {/* Top chord joints */}
        <path d="M18 36 L24 36 L21 33 Z" />
        <path d="M48 36 L54 36 L51 33 Z" />
        <path d="M78 36 L84 36 L81 33 Z" />
        {/* Bottom chord joints */}
        <path d="M2 72 L8 72 L5 69 Z" />
        <path d="M33 72 L39 72 L36 69 Z" />
        <path d="M63 72 L69 72 L66 69 Z" />
      </g>

      {/* Support symbols */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M0 75 L10 75 L5 72 Z" />
        <circle cx="81" cy="75" r="2" />
        <path d="M76 77 L86 77" />
      </g>
    </g>
  </svg>
)

/**
 * FINK TRUSS (1854) - W-shaped web pattern with subdivided panels
 * 3/4 isometric view. Pitched roof with double-V diagonals meeting at bottom chord.
 * More complex web than Warren - diagonals create W/M shapes.
 */
export const FinkTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="fink-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#fink-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground line */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M3 84 L72 84" />
        <path d="M72 84 L97 76" />
      </g>

      {/* FAR-SIDE TRUSS (back face) */}
      <g opacity={0.2} strokeWidth={S.P.strokeWidthLight}>
        <path d="M22 74 L90 74" />
        <path d="M22 74 L56 28" />
        <path d="M90 74 L56 28" />
        {/* Back W-pattern */}
        <path d="M56 28 L36 74" />
        <path d="M36 74 L46 50" />
        <path d="M46 50 L28 74" />
        <path d="M56 28 L76 74" />
        <path d="M76 74 L66 50" />
        <path d="M66 50 L84 74" />
      </g>

      {/* Shadow fill */}
      <path d="M22 74 L56 28 L90 74 Z" fill="currentColor" opacity={S.E.fillOpacity} />

      {/* CROSS MEMBERS (depth ties) */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M8 78 L22 74" />
        <path d="M78 78 L90 74" />
        <path d="M44 32 L56 28" />
        <path d="M35 51 L46 50" />
        <path d="M55 51 L66 50" />
      </g>

      {/* NEAR-SIDE: Pitched roof outline */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Bottom chord */}
        <path d="M8 78 L78 78" />
        {/* Left rafter */}
        <path d="M8 78 L44 32" />
        {/* Right rafter */}
        <path d="M78 78 L44 32" />
      </g>

      {/* FINK W-PATTERN - Key feature: double-V subdivisions */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Left side W: apex->mid-bottom, mid-bottom->rafter, rafter->far-bottom */}
        <path d="M44 32 L22 78" />
        <path d="M22 78 L35 51" />
        <path d="M35 51 L15 78" />

        {/* Right side W (mirrored) */}
        <path d="M44 32 L66 78" />
        <path d="M66 78 L55 51" />
        <path d="M55 51 L72 78" />
      </g>

      {/* Gusset plates */}
      <g fill="currentColor" opacity={S.D.opacity} strokeWidth={S.D.strokeWidthFine}>
        <path d="M41 32 L47 32 L44 28 Z" />
        <circle cx="8" cy="78" r="2" />
        <circle cx="78" cy="78" r="2" />
        <circle cx="22" cy="78" r="1.5" />
        <circle cx="35" cy="51" r="1.5" />
        <circle cx="55" cy="51" r="1.5" />
        <circle cx="66" cy="78" r="1.5" />
        <circle cx="15" cy="78" r="1.5" />
        <circle cx="72" cy="78" r="1.5" />
      </g>

      {/* Support symbols */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M3 81 L13 81 L8 78 Z" />
        <circle cx="78" cy="81" r="2" />
        <path d="M73 83 L83 83" />
      </g>
    </g>
  </svg>
)

/**
 * BOWSTRING TRUSS - Curved top chord like an archer's bow
 * Efficient compression arch with tension tie
 * Shows: Arched top chord, straight bottom chord, web members
 * Used for: Long-span roofs, arenas, historic train sheds
 */
export const BowstringTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="bowstring-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#bowstring-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Support points */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 77 L95 77" />
      </g>

      {/* PRIMARY - Curved top chord (the "bow") */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M10 65 Q50 15, 90 65" />
      </g>

      {/* Bottom chord (the "string" - in tension) */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M10 65 L90 65" />
      </g>

      {/* Vertical web members */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M25 65 L25 42" />
        <path d="M40 65 L40 28" />
        <path d="M50 65 L50 22" />
        <path d="M60 65 L60 28" />
        <path d="M75 65 L75 42" />
      </g>

      {/* Diagonal web members */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M10 65 L25 42" />
        <path d="M25 42 L40 65" />
        <path d="M40 28 L50 65" />
        <path d="M50 22 L60 65" />
        <path d="M60 28 L75 65" />
        <path d="M75 42 L90 65" />
      </g>

      {/* Joint connections */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <circle cx="10" cy="65" r="2.5" />
        <circle cx="25" cy="65" r="2" />
        <circle cx="40" cy="65" r="2" />
        <circle cx="50" cy="65" r="2" />
        <circle cx="60" cy="65" r="2" />
        <circle cx="75" cy="65" r="2" />
        <circle cx="90" cy="65" r="2.5" />
        <circle cx="50" cy="22" r="2" />
      </g>

      {/* Support symbols */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M5 70 L15 70 L10 65 Z" />
        <circle cx="90" cy="70" r="2" />
        <path d="M85 72 L95 72" />
      </g>

      {/* Tension indicator on bottom chord */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        <path d="M30 68 L70 68" strokeDasharray={S.CN.dash} />
      </g>
    </g>
  </svg>
)

/**
 * VIERENDEEL TRUSS (1896) - Rectangular openings, no diagonals
 * Invented by Arthur Vierendeel, Belgian engineer
 * Shows: Ladder-like structure with rigid moment connections
 * Used when diagonal-free openings needed (bridges, buildings)
 */
export const VierendeelTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="vierendeel-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#vierendeel-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Support points */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 72 L95 72" />
      </g>

      {/* PRIMARY - Top and bottom chords (heavier for moment resistance) */}
      <g strokeWidth={S.P.strokeWidthHeavy}>
        {/* Top chord */}
        <path d="M10 30 L90 30" />
        {/* Bottom chord */}
        <path d="M10 65 L90 65" />
      </g>

      {/* VERTICAL MEMBERS ONLY - Key feature: no diagonals */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M10 30 L10 65" />
        <path d="M30 30 L30 65" />
        <path d="M50 30 L50 65" />
        <path d="M70 30 L70 65" />
        <path d="M90 30 L90 65" />
      </g>

      {/* RIGID CORNER CONNECTIONS - Key feature: moment resisting joints */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        {/* Top corners - haunches */}
        <path d="M10 30 L10 36 L16 30" />
        <path d="M30 30 L30 36 L36 30 M30 30 L30 36 L24 30" />
        <path d="M50 30 L50 36 L56 30 M50 30 L50 36 L44 30" />
        <path d="M70 30 L70 36 L76 30 M70 30 L70 36 L64 30" />
        <path d="M90 30 L90 36 L84 30" />

        {/* Bottom corners - haunches */}
        <path d="M10 65 L10 59 L16 65" />
        <path d="M30 65 L30 59 L36 65 M30 65 L30 59 L24 65" />
        <path d="M50 65 L50 59 L56 65 M50 65 L50 59 L44 65" />
        <path d="M70 65 L70 59 L76 65 M70 65 L70 59 L64 65" />
        <path d="M90 65 L90 59 L84 65" />
      </g>

      {/* Rectangular openings indication */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidthFine}>
        <rect x="12" y="32" width="16" height="31" />
        <rect x="32" y="32" width="16" height="31" />
        <rect x="52" y="32" width="16" height="31" />
        <rect x="72" y="32" width="16" height="31" />
      </g>

      {/* Support symbols */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M5 68 L15 68 L10 65 Z" />
        <circle cx="90" cy="68" r="2" />
        <path d="M85 70 L95 70" />
      </g>
    </g>
  </svg>
)

/**
 * LATTICE TRUSS (Town 1820) - Dense diagonal mesh pattern
 * Invented by Ithiel Town, originally timber with wooden pegs
 * Shows: Multiple overlapping diagonals forming lattice
 * Historical: Many 19th century covered bridges
 */
export const LatticeTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="lattice-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#lattice-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Support points */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 72 L95 72" />
      </g>

      {/* PRIMARY - Top and bottom chords */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Top chord */}
        <path d="M8 30 L92 30" />
        {/* Bottom chord */}
        <path d="M8 65 L92 65" />
      </g>

      {/* LATTICE PATTERN - Key feature: dense overlapping diagonals */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Diagonals going one direction (/) */}
        <path d="M8 65 L22 30" />
        <path d="M18 65 L32 30" />
        <path d="M28 65 L42 30" />
        <path d="M38 65 L52 30" />
        <path d="M48 65 L62 30" />
        <path d="M58 65 L72 30" />
        <path d="M68 65 L82 30" />
        <path d="M78 65 L92 30" />

        {/* Diagonals going other direction (\) */}
        <path d="M8 30 L22 65" />
        <path d="M18 30 L32 65" />
        <path d="M28 30 L42 65" />
        <path d="M38 30 L52 65" />
        <path d="M48 30 L62 65" />
        <path d="M58 30 L72 65" />
        <path d="M68 30 L82 65" />
        <path d="M78 30 L92 65" />
      </g>

      {/* End verticals */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M8 30 L8 65" />
        <path d="M92 30 L92 65" />
      </g>

      {/* Wooden peg connections (characteristic of Town lattice) */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        {/* Intersection points */}
        <circle cx="15" cy="47.5" r="1.5" />
        <circle cx="25" cy="47.5" r="1.5" />
        <circle cx="35" cy="47.5" r="1.5" />
        <circle cx="45" cy="47.5" r="1.5" />
        <circle cx="55" cy="47.5" r="1.5" />
        <circle cx="65" cy="47.5" r="1.5" />
        <circle cx="75" cy="47.5" r="1.5" />
        <circle cx="85" cy="47.5" r="1.5" />
      </g>

      {/* Support symbols */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M3 68 L13 68 L8 65 Z" />
        <circle cx="92" cy="68" r="2" />
        <path d="M87 70 L97 70" />
      </g>
    </g>
  </svg>
)

/**
 * BALTIMORE TRUSS - Subdivided Pratt truss for long spans
 * Adds intermediate diagonals to reduce unsupported member lengths
 * Shows: Pratt pattern with subdivided panels
 * Used for: Railroad bridges, long-span applications (1850s+)
 */
export const BaltimoreTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="baltimore-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#baltimore-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Support points */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 72 L95 72" />
      </g>

      {/* PRIMARY - Main chords */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Top chord */}
        <path d="M8 25 L92 25" />
        {/* Bottom chord */}
        <path d="M8 68 L92 68" />
      </g>

      {/* MAIN VERTICALS - Full-height posts */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M8 25 L8 68" />
        <path d="M29 25 L29 68" />
        <path d="M50 25 L50 68" />
        <path d="M71 25 L71 68" />
        <path d="M92 25 L92 68" />
      </g>

      {/* MAIN DIAGONALS - Pratt-style (tension diagonals) */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M8 68 L29 25" />
        <path d="M29 68 L50 25" />
        <path d="M71 25 L50 68" />
        <path d="M92 25 L71 68" />
      </g>

      {/* SUB-VERTICALS - Key Baltimore feature: intermediate posts */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M18.5 25 L18.5 46.5" />
        <path d="M39.5 25 L39.5 46.5" />
        <path d="M60.5 25 L60.5 46.5" />
        <path d="M81.5 25 L81.5 46.5" />
      </g>

      {/* SUB-DIAGONALS - Subdivide the panels */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M8 46.5 L18.5 25" />
        <path d="M18.5 46.5 L29 25" />
        <path d="M29 46.5 L39.5 25" />
        <path d="M39.5 46.5 L50 25" />
        <path d="M60.5 25 L50 46.5" />
        <path d="M71 25 L60.5 46.5" />
        <path d="M81.5 25 L71 46.5" />
        <path d="M92 25 L81.5 46.5" />
      </g>

      {/* Sub-strut (horizontal at mid-height) */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M8 46.5 L92 46.5" />
      </g>

      {/* Support symbols */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M3 71 L13 71 L8 68 Z" />
        <circle cx="92" cy="71" r="2" />
        <path d="M87 73 L97 73" />
      </g>
    </g>
  </svg>
)

/**
 * SCISSORS TRUSS - Two crossing diagonal members
 * Creates vaulted/cathedral ceiling appearance from below
 * Shows: Triangular profile with crossing bottom chords
 * Used for: Churches, great halls, open-ceiling residential
 */
export const ScissorsTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="scissors-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#scissors-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Support points */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 88 L95 88" />
      </g>

      {/* PRIMARY - Roof rafters (top chords) */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Left rafter */}
        <path d="M10 75 L50 20" />
        {/* Right rafter */}
        <path d="M90 75 L50 20" />
      </g>

      {/* SCISSORS MEMBERS - Key feature: crossing diagonal chords */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Left scissors member (from left support to right rafter) */}
        <path d="M10 75 L70 35" />
        {/* Right scissors member (from right support to left rafter) */}
        <path d="M90 75 L30 35" />
      </g>

      {/* Intersection point emphasis */}
      <circle cx="50" cy="55" r="3" strokeWidth={S.P.strokeWidth} fill="currentColor" opacity={S.E.opacityModerate} />

      {/* King post from apex (optional in some scissors trusses) */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M50 20 L50 55" />
      </g>

      {/* Collar tie hint (horizontal member) */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
        <path d="M30 35 L70 35" />
      </g>

      {/* Vaulted ceiling indicator (the visible effect from below) */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M15 72 L50 50 L85 72" />
        <text x="50" y="65" fontSize="4" textAnchor="middle" fill="currentColor">VAULT</text>
      </g>

      {/* Support symbols */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M5 78 L15 78 L10 75 Z" />
        <path d="M85 78 L95 78 L90 75 Z" />
      </g>

      {/* Ridge connection */}
      <g strokeWidth={S.D.strokeWidth}>
        <circle cx="50" cy="20" r="2" fill="currentColor" opacity={S.D.opacity} />
      </g>
    </g>
  </svg>
)

/**
 * GAMBREL TRUSS - Barn-roof double-slope design
 * Two different slopes per side maximize attic/loft space
 * Shows: Characteristic barn roof profile
 * Used for: Barns, Dutch Colonial houses, agricultural buildings
 */
export const GambrelTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="gambrel-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#gambrel-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Support/wall line */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 88 L95 88" />
      </g>

      {/* PRIMARY - Bottom chord (tie beam) */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M10 80 L90 80" />
      </g>

      {/* GAMBREL RAFTERS - Key feature: two slopes per side */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Left side - steep lower slope */}
        <path d="M10 80 L25 50" />
        {/* Left side - shallow upper slope */}
        <path d="M25 50 L50 25" />
        {/* Right side - shallow upper slope */}
        <path d="M50 25 L75 50" />
        {/* Right side - steep lower slope */}
        <path d="M75 50 L90 80" />
      </g>

      {/* Collar beam at knee point */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M25 50 L75 50" />
      </g>

      {/* Vertical posts at knees */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M25 50 L25 80" />
        <path d="M75 50 L75 80" />
      </g>

      {/* King post from ridge */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M50 25 L50 50" />
      </g>

      {/* Optional diagonal bracing in upper section */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
        <path d="M25 50 L50 35" />
        <path d="M75 50 L50 35" />
      </g>

      {/* Loft space indication (the usable area gained) */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        <rect x="28" y="52" width="44" height="25" />
        <text x="50" y="67" fontSize="5" textAnchor="middle" fill="currentColor">LOFT</text>
      </g>

      {/* Support symbols */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M5 83 L15 83 L10 80 Z" />
        <path d="M85 83 L95 83 L90 80 Z" />
      </g>

      {/* Ridge cap */}
      <g strokeWidth={S.D.strokeWidth}>
        <circle cx="50" cy="25" r="2" fill="currentColor" opacity={S.D.opacity} />
      </g>
    </g>
  </svg>
)

// =============================================================================
// TRUSS TYPES EXPORT
// =============================================================================

export const TRUSS_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'king-post-truss': KingPostTrussSVG,
  'queen-post-truss': QueenPostTrussSVG,
  'pratt-truss': PrattTrussSVG,
  'howe-truss': HoweTrussSVG,
  'warren-truss': WarrenTrussSVG,
  'fink-truss': FinkTrussSVG,
  'bowstring-truss': BowstringTrussSVG,
  'vierendeel-truss': VierendeelTrussSVG,
  'lattice-truss': LatticeTrussSVG,
  'baltimore-truss': BaltimoreTrussSVG,
  'scissors-truss': ScissorsTrussSVG,
  'gambrel-truss': GambrelTrussSVG,
}

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
    <g filter={showHalo ? "url(#spread-footing-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground level line */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 45 L95 45" />
      </g>

      {/* Soil pattern below ground */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
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
      <g strokeWidth={S.P.strokeWidth}>
        {/* Footing pad */}
        <path d="M25 70 L75 70 L75 80 L25 80 Z" />
        {/* Pedestal/column base transition */}
        <path d="M40 55 L60 55 L60 70 L40 70 Z" />
      </g>

      {/* Column above */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M42 10 L58 10 L58 55 L42 55 Z" />
      </g>

      {/* Reinforcement indication */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M28 75 L72 75" strokeDasharray={S.CN.dash} />
        <path d="M30 72 L30 78" />
        <path d="M40 72 L40 78" />
        <path d="M50 72 L50 78" />
        <path d="M60 72 L60 78" />
        <path d="M70 72 L70 78" />
      </g>

      {/* Load arrow */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M50 5 L50 15" />
        <path d="M50 15 L47 12" />
        <path d="M50 15 L53 12" />
      </g>

      {/* Pressure distribution arrows */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate}>
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
    <g filter={showHalo ? "url(#strip-footing-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground level */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 50 L95 50" />
      </g>

      {/* Soil pattern */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        <path d="M10 58 L15 58" />
        <path d="M30 62 L35 62" />
        <path d="M55 56 L60 56" />
        <path d="M75 60 L80 60" />
        <path d="M20 72 L25 72" />
        <path d="M65 70 L70 70" />
      </g>

      {/* THE STRIP FOOTING - Key feature: continuous linear foundation */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Continuous footing (shown in perspective) */}
        <path d="M10 68 L90 68 L90 78 L10 78 Z" />
        {/* 3D depth indication */}
        <path d="M10 68 L5 63 L85 63 L90 68" />
        <path d="M85 63 L85 73 L90 78" />
      </g>

      {/* Wall above */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M22 50 L78 50 L78 68 L22 68 Z" />
        {/* 3D depth of wall */}
        <path d="M22 50 L17 45 L73 45 L78 50" />
        <path d="M73 45 L73 63 L78 68" />
      </g>

      {/* Wall construction lines (brick/block courses) */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        <path d="M22 56 L78 56" />
        <path d="M22 62 L78 62" />
        <path d="M35 50 L35 68" />
        <path d="M50 50 L50 68" />
        <path d="M65 50 L65 68" />
      </g>

      {/* Reinforcement in footing */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.D.opacity} strokeDasharray={S.E.dash}>
        <path d="M15 73 L85 73" />
      </g>

      {/* Load distribution */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
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
    <g filter={showHalo ? "url(#combined-footing-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground level */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 50 L95 50" />
      </g>

      {/* Soil pattern */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        <path d="M15 58 L20 58" />
        <path d="M40 62 L45 62" />
        <path d="M70 56 L75 56" />
        <path d="M25 75 L30 75" />
        <path d="M60 72 L65 72" />
      </g>

      {/* THE COMBINED FOOTING - Key feature: one pad, multiple columns */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Single elongated footing */}
        <path d="M12 70 L88 70 L88 82 L12 82 Z" />
      </g>

      {/* Two columns */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Left column */}
        <path d="M22 10 L38 10 L38 50 L22 50 Z" />
        <path d="M22 50 L22 70 L38 70 L38 50" strokeWidth={S.P.strokeWidth} />

        {/* Right column */}
        <path d="M62 10 L78 10 L78 50 L62 50 Z" />
        <path d="M62 50 L62 70 L78 70 L78 50" strokeWidth={S.P.strokeWidth} />
      </g>

      {/* Reinforcement grid */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.D.opacity} strokeDasharray={S.E.dash}>
        <path d="M16 76 L84 76" />
        <path d="M30 72 L30 80" />
        <path d="M50 72 L50 80" />
        <path d="M70 72 L70 80" />
      </g>

      {/* Load arrows */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M30 5 L30 12" />
        <path d="M30 12 L27 9 M30 12 L33 9" />
        <path d="M70 5 L70 12" />
        <path d="M70 12 L67 9 M70 12 L73 9" />
      </g>

      {/* Center of gravity indicator */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M50 70 L50 85" strokeDasharray={S.CN.dash} />
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
    <g filter={showHalo ? "url(#mat-foundation-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground level */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 55 L95 55" />
      </g>

      {/* Soil pattern */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        <path d="M10 65 L15 65" />
        <path d="M30 70 L35 70" />
        <path d="M55 68 L60 68" />
        <path d="M80 72 L85 72" />
        <path d="M20 80 L25 80" />
        <path d="M65 78 L70 78" />
      </g>

      {/* THE MAT FOUNDATION - Key feature: full coverage thick slab */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Thick mat slab */}
        <path d="M8 60 L92 60 L92 75 L8 75 Z" />
      </g>

      {/* Multiple columns on mat */}
      <g strokeWidth={S.P.strokeWidth}>
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
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
        <path d="M12 30 L88 30" />
        <path d="M12 15 L88 15" />
        <path d="M12 15 L12 30" />
        <path d="M88 15 L88 30" />
      </g>

      {/* Reinforcement grid in mat */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} strokeDasharray={S.E.dash}>
        <path d="M12 65 L88 65" />
        <path d="M12 70 L88 70" />
        <path d="M20 62 L20 73" />
        <path d="M40 62 L40 73" />
        <path d="M60 62 L60 73" />
        <path d="M80 62 L80 73" />
      </g>

      {/* Uniform pressure distribution */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
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
    <g filter={showHalo ? "url(#driven-pile-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground level */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 30 L95 30" />
      </g>

      {/* Soil layers */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        {/* Soft soil layer */}
        <path d="M5 45 L95 45" strokeDasharray={S.CF.dash} />
        {/* Medium layer */}
        <path d="M5 65 L95 65" strokeDasharray={S.CF.dash} />
        {/* Bearing layer (denser pattern) */}
        <path d="M5 85 L95 85" />
        <g opacity={S.D.opacity}>
          <path d="M10 88 L15 88" />
          <path d="M25 90 L30 90" />
          <path d="M45 88 L50 88" />
          <path d="M65 90 L70 90" />
          <path d="M85 88 L90 88" />
        </g>
      </g>

      {/* Pile cap */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M20 28 L80 28 L80 38 L20 38 Z" />
      </g>

      {/* Column above */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M42 8 L58 8 L58 28 L42 28 Z" />
      </g>

      {/* THE DRIVEN PILES - Key feature: pointed tips, driven deep */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Left pile */}
        <path d="M28 38 L28 82 L32 88 L36 82 L36 38" />
        {/* Middle pile */}
        <path d="M46 38 L46 82 L50 88 L54 82 L54 38" />
        {/* Right pile */}
        <path d="M64 38 L64 82 L68 88 L72 82 L72 38" />
      </g>

      {/* Driving direction indicators */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate}>
        <path d="M32 50 L32 60" />
        <path d="M32 60 L30 57 M32 60 L34 57" />
        <path d="M50 50 L50 60" />
        <path d="M50 60 L48 57 M50 60 L52 57" />
        <path d="M68 50 L68 60" />
        <path d="M68 60 L66 57 M68 60 L70 57" />
      </g>

      {/* Soil displacement indication */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
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
    <g filter={showHalo ? "url(#bored-pile-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground level */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 25 L95 25" />
      </g>

      {/* Soil layers */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M5 40 L35 40 M65 40 L95 40" strokeDasharray={S.CF.dash} />
        <path d="M5 60 L35 60 M65 60 L95 60" strokeDasharray={S.CF.dash} />
        <path d="M5 80 L35 80 M65 80 L95 80" />
      </g>

      {/* Pile cap */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M30 22 L70 22 L70 32 L30 32 Z" />
      </g>

      {/* Column */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M42 5 L58 5 L58 22 L42 22 Z" />
      </g>

      {/* THE BORED PILE - Key feature: cylindrical, cast in place */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Pile shaft (cylindrical - shown with parallel sides) */}
        <path d="M38 32 L38 88" />
        <path d="M62 32 L62 88" />
        {/* Bottom of pile (flat or slightly belled) */}
        <path d="M38 88 Q50 92, 62 88" />
      </g>

      {/* Reinforcement cage inside */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} strokeDasharray={S.CN.dash}>
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
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        <path d="M50 35 L50 42" />
        <path d="M47 42 L53 42" />
        <path d="M48 44 L52 44" />
      </g>

      {/* Concrete pour indication */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate}>
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
    <g filter={showHalo ? "url(#caisson-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground/water level */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 20 L95 20" />
      </g>

      {/* Water indication (if underwater caisson) */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacity}>
        <path d="M8 22 Q12 24, 16 22 Q20 20, 24 22" />
        <path d="M76 22 Q80 24, 84 22 Q88 20, 92 22" />
      </g>

      {/* Soil/rock layers */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M5 45 L25 45 M75 45 L95 45" strokeDasharray={S.CF.dash} />
        <path d="M5 70 L25 70 M75 70 L95 70" />
        {/* Rock layer indication */}
        <path d="M8 75 L12 78 L16 75 L20 78" />
        <path d="M80 75 L84 78 L88 75 L92 78" />
      </g>

      {/* THE CAISSON - Key feature: large diameter, belled bottom */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Main shaft */}
        <path d="M30 18 L30 72" />
        <path d="M70 18 L70 72" />
        {/* Bell (enlarged bottom) */}
        <path d="M30 72 Q30 80, 22 85 Q50 95, 78 85 Q70 80, 70 72" />
      </g>

      {/* Cap/pier above */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M25 8 L75 8 L75 18 L25 18 Z" />
      </g>

      {/* Internal working chamber indication */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M35 30 L65 30" strokeDasharray={S.CN.dash} />
        <path d="M35 50 L65 50" strokeDasharray={S.CN.dash} />
        {/* Cutting edge at bottom */}
        <path d="M28 85 L35 78 L50 82 L65 78 L72 85" strokeWidth={S.D.strokeWidthBold} />
      </g>

      {/* Access shaft indication */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M45 8 L45 30" />
        <path d="M55 8 L55 30" />
      </g>

      {/* Load arrows */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
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
    <g filter={showHalo ? "url(#floating-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground level */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 40 L20 40 M80 40 L95 40" />
      </g>

      {/* Soil around excavation */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        <path d="M8 50 L15 50" />
        <path d="M85 55 L92 55" />
        <path d="M10 65 L17 65" />
        <path d="M83 70 L90 70" />
      </g>

      {/* THE FLOATING FOUNDATION - Key feature: deep box in soil */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Deep basement box */}
        <path d="M22 40 L22 85 L78 85 L78 40" />
        {/* Mat at bottom */}
        <path d="M22 85 L78 85 L78 92 L22 92 Z" strokeWidth={S.P.strokeWidthBold} />
      </g>

      {/* Building above ground */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M22 40 L78 40 L78 15 L22 15 Z" />
        {/* Floor lines */}
        <path d="M22 27 L78 27" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      </g>

      {/* Basement levels */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M22 55 L78 55" />
        <path d="M22 70 L78 70" />
      </g>

      {/* Weight balance indication - excavated vs building */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
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
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate}>
        <path d="M5 88 L5 93" />
        <path d="M3 93 L7 93" />
        <text x="5" y="98" fontSize="4" textAnchor="middle" fill="currentColor" opacity={S.D.opacity}>≈</text>
      </g>

      {/* Soil displacement arrows showing no net change */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
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
    <g filter={showHalo ? "url(#rubble-trench-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground level */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 45 L30 45 M70 45 L95 45" />
      </g>

      {/* Soil on sides */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        <path d="M8 55 L15 55" />
        <path d="M10 65 L18 65" />
        <path d="M82 55 L90 55" />
        <path d="M85 65 L92 65" />
      </g>

      {/* Trench outline */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M30 45 L30 85 L70 85 L70 45" />
      </g>

      {/* THE RUBBLE FILL - Key feature: stone/gravel in trench */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong}>
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
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M28 42 L72 42 L72 50 L28 50 Z" />
      </g>

      {/* Wall above */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M35 15 L65 15 L65 42 L35 42 Z" />
      </g>

      {/* Wall texture (natural materials) */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        <path d="M35 25 L65 25" />
        <path d="M35 35 L65 35" />
        <path d="M45 15 L45 42" />
        <path d="M55 15 L55 42" />
      </g>

      {/* Drainage pipe at bottom */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <ellipse cx="50" cy="88" rx="8" ry="3" />
        <path d="M42 88 L42 85" strokeDasharray={S.E.dash} />
        <path d="M58 88 L58 85" strokeDasharray={S.E.dash} />
      </g>

      {/* Water drainage arrows */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
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
    <g filter={showHalo ? "url(#helical-pile-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground level */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 30 L40 30 M60 30 L95 30" />
      </g>

      {/* Soil layers */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        <path d="M10 45 L35 45 M65 45 L90 45" />
        <path d="M10 60 L35 60 M65 60 L90 60" />
        <path d="M10 75 L35 75 M65 75 L90 75" />
      </g>

      {/* Structure above */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M40 10 L60 10 L60 30 L40 30 Z" />
      </g>

      {/* Cap/bracket */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M42 25 L58 25 L58 32 L42 32 Z" />
      </g>

      {/* STEEL SHAFT - Central element */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M50 32 L50 90" />
      </g>

      {/* HELICAL PLATES - Key feature: spiral blades */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Top helix */}
        <ellipse cx="50" cy="45" rx="15" ry="5" />
        {/* Middle helix */}
        <ellipse cx="50" cy="62" rx="18" ry="6" />
        {/* Bottom helix (largest) */}
        <ellipse cx="50" cy="80" rx="20" ry="7" />
      </g>

      {/* Helix pitch indicators (3D spiral suggestion) */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M35 45 L50 42" />
        <path d="M32 62 L50 58" />
        <path d="M30 80 L50 75" />
      </g>

      {/* Rotation direction indicator */}
      <g strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity}>
        <path d="M70 15 Q80 10, 85 20" />
        <path d="M85 20 L82 17 M85 20 L88 17" />
        <text x="78" y="8" fontSize="4" fill="currentColor">ROTATE</text>
      </g>

      {/* Pilot point at tip */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M50 90 L47 95 L50 98 L53 95 Z" />
      </g>

      {/* Bearing capacity zones */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate} strokeDasharray={S.E.dash}>
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
    <g filter={showHalo ? "url(#micropile-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ground level and existing structure */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 35 L35 35 M65 35 L95 35" />
      </g>

      {/* Existing footing being underpinned */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M30 25 L70 25 L70 38 L30 38 Z" />
        <text x="50" y="33" fontSize="4" textAnchor="middle" fill="currentColor" opacity={S.D.opacity}>EXISTING</text>
      </g>

      {/* Soil layers */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        <path d="M10 50 L35 50 M65 50 L90 50" />
        <path d="M10 65 L35 65 M65 65 L90 65" />
        <path d="M10 80 L35 80 M65 80 L90 80" />
      </g>

      {/* Bearing stratum at bottom */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M5 90 L95 90" />
        <text x="85" y="88" fontSize="3" fill="currentColor">ROCK</text>
      </g>

      {/* GROUT COLUMN - Outer casing */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
        <path d="M45 38 L45 92" />
        <path d="M55 38 L55 92" />
      </g>

      {/* STEEL CORE - Key feature: high-strength bar */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M50 28 L50 95" />
      </g>

      {/* Thread/coupler indication */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M48 50 L52 50" />
        <path d="M48 52 L52 52" />
        <path d="M48 54 L52 54" />
        <path d="M48 70 L52 70" />
        <path d="M48 72 L52 72" />
        <path d="M48 74 L52 74" />
      </g>

      {/* Grout texture */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        <path d="M46 45 L54 45" />
        <path d="M46 60 L54 60" />
        <path d="M46 85 L54 85" />
      </g>

      {/* Bond zone (enlarged grout in bearing stratum) */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M42 85 Q40 88, 42 92 L50 95 L58 92 Q60 88, 58 85" />
      </g>

      {/* Drill rig hint (small scale indication) */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M50 15 L50 25" />
        <path d="M45 15 L55 15 L55 18 L45 18 Z" />
        <path d="M48 12 L48 15" />
        <path d="M52 12 L52 15" />
      </g>

      {/* Diameter indication */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate}>
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
    <g filter={showHalo ? "url(#dead-load-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Building structure */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Foundation */}
        <path d="M15 88 L85 88 L85 95 L15 95 Z" />
        {/* Columns */}
        <path d="M20 35 L20 88" />
        <path d="M50 35 L50 88" />
        <path d="M80 35 L80 88" />
        {/* Beams/floors */}
        <path d="M15 35 L85 35" strokeWidth={S.P.strokeWidthHeavy} />
        <path d="M15 60 L85 60" strokeWidth={S.P.strokeWidthBold} />
        {/* Roof */}
        <path d="M10 35 L50 12 L90 35" strokeWidth={S.P.strokeWidthBold} />
      </g>

      {/* DEAD LOAD ARROWS - Key feature: downward from structure itself */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
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
      <g strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity}>
        <circle cx="8" cy="50" r="5" />
        <path d="M5 50 L11 50" />
        <path d="M8 47 L8 53" />
      </g>

      {/* Label area */}
      <g opacity={S.D.opacitySubtle}>
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
    <g filter={showHalo ? "url(#live-load-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Building floor */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M10 70 L90 70" />
        <path d="M10 70 L10 95" />
        <path d="M90 70 L90 95" />
        <path d="M10 95 L90 95" />
      </g>

      {/* LIVE LOAD ITEMS - Key feature: movable/variable */}
      {/* Person 1 */}
      <g strokeWidth={S.P.strokeWidth}>
        <circle cx="25" cy="52" r="5" />
        <path d="M25 57 L25 68" />
        <path d="M25 60 L20 65" />
        <path d="M25 60 L30 65" />
        <path d="M25 68 L22 75" />
        <path d="M25 68 L28 75" />
      </g>

      {/* Person 2 */}
      <g strokeWidth={S.P.strokeWidth}>
        <circle cx="45" cy="52" r="5" />
        <path d="M45 57 L45 68" />
        <path d="M45 60 L40 65" />
        <path d="M45 60 L50 65" />
        <path d="M45 68 L42 75" />
        <path d="M45 68 L48 75" />
      </g>

      {/* Furniture - desk */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M60 62 L80 62 L80 68 L60 68 Z" />
        <path d="M62 68 L62 75" />
        <path d="M78 68 L78 75" />
      </g>

      {/* Box/equipment */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M82 58 L92 58 L92 68 L82 68 Z" />
      </g>

      {/* LIVE LOAD ARROWS - Variable weight */}
      <g strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacityStrong}>
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
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M5 35 Q10 32, 15 35 Q20 38, 25 35" />
      </g>

      {/* Label */}
      <g opacity={S.D.opacitySubtle}>
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
    <g filter={showHalo ? "url(#wind-load-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Building */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M35 25 L65 25 L65 85 L35 85 Z" />
        {/* Roof */}
        <path d="M30 25 L50 10 L70 25" />
        {/* Windows */}
        <path d="M40 35 L48 35 L48 45 L40 45 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M52 35 L60 35 L60 45 L52 45 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M40 55 L48 55 L48 65 L40 65 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M52 55 L60 55 L60 65 L52 65 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      </g>

      {/* Ground */}
      <g strokeWidth={S.D.strokeWidth}>
        <path d="M20 85 L80 85" />
      </g>

      {/* WIND PRESSURE - Key feature: horizontal arrows windward side */}
      <g strokeWidth={S.P.strokeWidth}>
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
      <g strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacityStrong}>
        <path d="M68 35 L85 35" />
        <path d="M68 35 L72 32 M68 35 L72 38" />
        <path d="M68 50 L85 50" />
        <path d="M68 50 L72 47 M68 50 L72 53" />
        <path d="M68 65 L85 65" />
        <path d="M68 65 L72 62 M68 65 L72 68" />
      </g>

      {/* Roof uplift */}
      <g strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacityStrong}>
        <path d="M45 12 L45 5" />
        <path d="M45 5 L43 8 M45 5 L47 8" />
        <path d="M55 12 L55 5" />
        <path d="M55 5 L53 8 M55 5 L57 8" />
      </g>

      {/* Wind lines */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M2 30 Q6 28, 10 30 Q14 32, 18 30" />
        <path d="M2 55 Q6 53, 10 55 Q14 57, 18 55" />
        <path d="M2 75 Q6 73, 10 75 Q14 77, 18 75" />
      </g>

      {/* Pressure distribution (triangular) */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate}>
        <path d="M30 25 L20 55 L30 85" strokeDasharray={S.E.dash} />
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
    <g filter={showHalo ? "url(#seismic-load-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Ground line with cracks */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M5 80 L95 80" />
        {/* Ground cracks */}
        <path d="M30 80 L32 85 L28 90" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M70 80 L68 87 L72 92" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      </g>

      {/* Building - slightly tilted to show sway */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Main structure (shifted at top to show deflection) */}
        <path d="M38 15 L62 15 L60 78 L40 78 Z" />
        {/* Foundation (stays put) */}
        <path d="M35 78 L65 78 L65 85 L35 85 Z" />
        {/* Floor lines showing deformation */}
        <path d="M39 35 L61 35" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M39.5 55 L60.5 55" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      </g>

      {/* SEISMIC WAVES - Key feature: ground motion */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M5 90 Q15 85, 25 90 Q35 95, 45 90 Q55 85, 65 90 Q75 95, 85 90 Q95 85, 100 90" />
      </g>

      {/* Inertial force arrows (opposite to ground motion) */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
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
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M50 15 Q55 45, 50 78" strokeDasharray={S.CN.dash} />
      </g>

      {/* Ground acceleration arrow */}
      <g strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity}>
        <path d="M75 75 L85 75" />
        <path d="M85 75 L82 72 M85 75 L82 78" />
        <path d="M70 75 L65 75" />
        <path d="M65 75 L68 72 M65 75 L68 78" />
      </g>

      {/* Seismic wave symbol */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
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
    <g filter={showHalo ? "url(#snow-load-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Building */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M20 50 L80 50 L80 90 L20 90 Z" />
        {/* Roof structure */}
        <path d="M15 50 L50 20 L85 50" strokeWidth={S.P.strokeWidthBold} />
      </g>

      {/* Ground */}
      <path d="M10 90 L90 90" strokeWidth={S.D.strokeWidth} />

      {/* SNOW ACCUMULATION - Key feature: wavy snow layer on roof */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Snow layer - irregular top surface */}
        <path d="M15 50 L15 45 Q25 42, 32 45 Q40 43, 50 18 Q60 43, 68 45 Q75 42, 85 45 L85 50 L50 20 Z" />
        {/* Snow drift detail */}
        <path d="M18 47 Q22 44, 26 47" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M70 47 Q74 44, 78 47" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      </g>

      {/* Snow load arrows */}
      <g strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacityStrong}>
        <path d="M30 30 L30 40" />
        <path d="M30 40 L28 37 M30 40 L32 37" />
        <path d="M50 12 L50 22" />
        <path d="M50 22 L48 19 M50 22 L52 19" />
        <path d="M70 30 L70 40" />
        <path d="M70 40 L68 37 M70 40 L72 37" />
      </g>

      {/* Snowflakes */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        {/* Snowflake 1 */}
        <path d="M25 8 L25 14 M22 11 L28 11 M23 9 L27 13 M27 9 L23 13" />
        {/* Snowflake 2 */}
        <path d="M60 5 L60 11 M57 8 L63 8 M58 6 L62 10 M62 6 L58 10" />
        {/* Snowflake 3 */}
        <path d="M80 12 L80 18 M77 15 L83 15 M78 13 L82 17 M82 13 L78 17" />
      </g>

      {/* Falling snow dots */}
      <g opacity={S.E.opacityModerate}>
        <circle cx="40" cy="10" r="1" fill="currentColor" />
        <circle cx="55" cy="8" r="0.8" fill="currentColor" />
        <circle cx="72" cy="6" r="1" fill="currentColor" />
        <circle cx="35" cy="4" r="0.8" fill="currentColor" />
      </g>

      {/* Unbalanced load indication (drift) */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate}>
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
    <g filter={showHalo ? "url(#rain-load-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Building with flat roof */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M15 35 L85 35 L85 90 L15 90 Z" />
        {/* Flat roof/parapet */}
        <path d="M10 30 L90 30 L90 35 L10 35 Z" />
      </g>

      {/* PONDING WATER - Key feature: water accumulation */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Water surface (showing deflection) */}
        <path d="M15 32 Q35 38, 50 40 Q65 38, 85 32" />
        {/* Water depth at center */}
        <path d="M40 32 L40 38" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M50 32 L50 40" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M60 32 L60 38" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
      </g>

      {/* Water ripples */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate}>
        <ellipse cx="50" cy="36" rx="15" ry="2" />
        <ellipse cx="50" cy="38" rx="10" ry="1.5" />
      </g>

      {/* Blocked drain */}
      <g strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacityStrong}>
        <circle cx="75" cy="35" r="3" />
        <path d="M73 33 L77 37" />
        <path d="M77 33 L73 37" />
      </g>

      {/* Rain arrows */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M25 10 L25 25" />
        <path d="M25 25 L23 22 M25 25 L27 22" />
        <path d="M50 5 L50 20" />
        <path d="M50 20 L48 17 M50 20 L52 17" />
        <path d="M75 10 L75 25" />
        <path d="M75 25 L73 22 M75 25 L77 22" />
      </g>

      {/* Rain drops */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M30 8 L30 12" />
        <path d="M40 3 L40 8" />
        <path d="M60 6 L60 11" />
        <path d="M70 2 L70 7" />
        <path d="M85 5 L85 10" />
      </g>

      {/* Deflection arrows showing progressive failure */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M50 42 L50 50" />
        <path d="M50 50 L48 47 M50 50 L52 47" />
      </g>

      {/* Ground */}
      <path d="M10 90 L90 90" strokeWidth={S.D.strokeWidth} />
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
    <g filter={showHalo ? "url(#impact-load-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Bridge/structure */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Bridge deck */}
        <path d="M5 55 L95 55 L95 62 L5 62 Z" />
        {/* Support columns */}
        <path d="M15 62 L15 90" strokeWidth={S.P.strokeWidthHeavy} />
        <path d="M85 62 L85 90" strokeWidth={S.P.strokeWidthHeavy} />
        {/* Truss underneath */}
        <path d="M15 62 L50 75 L85 62" strokeWidth={S.P.strokeWidth} opacity={S.D.opacity} />
      </g>

      {/* Ground */}
      <path d="M5 90 L95 90" strokeWidth={S.D.strokeWidth} />

      {/* MOVING VEHICLE - Key feature: dynamic load */}
      <g strokeWidth={S.P.strokeWidth}>
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
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
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
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M28 46 L33 46" />
        <path d="M25 50 L33 50" />
        <path d="M28 54 L33 54" />
      </g>

      {/* Impact starburst */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M42 55 L38 58" />
        <path d="M42 55 L40 60" />
        <path d="M55 55 L58 58" />
        <path d="M55 55 L57 60" />
      </g>

      {/* Vibration waves in structure */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate}>
        <path d="M50 65 Q55 68, 50 71 Q45 74, 50 77" />
      </g>

      {/* Direction arrow */}
      <g strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity}>
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
    <g filter={showHalo ? "url(#thermal-load-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Building structure */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M10 30 L90 30 L90 75 L10 75 Z" />
        {/* Expansion joint in middle */}
        <path d="M49 30 L49 75" strokeDasharray={S.CF.dash} />
        <path d="M51 30 L51 75" strokeDasharray={S.CF.dash} />
      </g>

      {/* Ground */}
      <path d="M5 75 L95 75" strokeWidth={S.D.strokeWidth} />

      {/* THERMAL EXPANSION ARROWS - Key feature: bidirectional */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        {/* Left section expanding right */}
        <path d="M35 52 L45 52" />
        <path d="M45 52 L42 49 M45 52 L42 55" />
        {/* Right section expanding left */}
        <path d="M65 52 L55 52" />
        <path d="M55 52 L58 49 M55 52 L58 55" />
      </g>

      {/* Sun (heat source) */}
      <g strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity}>
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
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M15 35 L85 35" />
        <path d="M15 40 L85 40" />
        <path d="M15 45 L85 45" />
        {/* Gradient shading indication */}
        <path d="M70 33 L85 33 L85 50 L70 50" strokeDasharray={S.E.dash} />
      </g>

      {/* Thermometer */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M15 10 L15 25" />
        <circle cx="15" cy="8" r="3" />
        <path d="M13 12 L17 12" strokeWidth={S.D.strokeWidthFine} />
        <path d="M13 16 L17 16" strokeWidth={S.D.strokeWidthFine} />
        <path d="M13 20 L17 20" strokeWidth={S.D.strokeWidthFine} />
        {/* Mercury level */}
        <path d="M15 25 L15 15" strokeWidth={S.P.strokeWidth} opacity={S.D.opacity} />
      </g>

      {/* Expansion joint detail */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M47 40 L47 65" />
        <path d="M53 40 L53 65" />
        <path d="M47 45 Q50 47, 53 45" />
        <path d="M47 55 Q50 57, 53 55" />
      </g>

      {/* Cold side indicator */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M20 85 L20 90" />
        <path d="M18 87 L22 87" />
        <text x="20" y="96" fontSize="4" textAnchor="middle" fill="currentColor">cold</text>
      </g>

      {/* Hot side indicator */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
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
    <g filter={showHalo ? "url(#hydrostatic-load-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Ground level */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M5 25 L35 25" />
        <path d="M65 25 L95 25" />
      </g>

      {/* Basement wall/structure */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Wall */}
        <path d="M35 25 L35 85 L65 85 L65 25" />
        {/* Floor slab */}
        <path d="M30 85 L70 85 L70 92 L30 92 Z" />
        {/* Above ground structure */}
        <path d="M35 25 L35 12 L65 12 L65 25" />
        <path d="M30 12 L70 12" />
      </g>

      {/* Water level indicator (left side) */}
      <g strokeWidth={S.D.strokeWidth}>
        <path d="M8 30 L30 30" strokeDasharray={S.CN.dash} />
        <text x="5" y="33" fontSize="4" fill="currentColor" opacity={S.D.opacity}>WL</text>
      </g>

      {/* WATER/SOIL with pressure */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate}>
        {/* Water indication */}
        <path d="M10 35 Q14 33, 18 35 Q22 37, 26 35" />
        <path d="M10 50 Q14 48, 18 50 Q22 52, 26 50" />
        <path d="M10 65 Q14 63, 18 65 Q22 67, 26 65" />
        <path d="M10 80 Q14 78, 18 80 Q22 82, 26 80" />
      </g>

      {/* HYDROSTATIC PRESSURE ARROWS - Key feature: triangular distribution */}
      <g strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacityStrong}>
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
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M30 30 L10 85 L30 85 Z" strokeDasharray={S.CN.dash} />
      </g>

      {/* Uplift pressure on floor */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M42 95 L42 88" />
        <path d="M42 88 L40 91 M42 88 L44 91" />
        <path d="M50 95 L50 88" />
        <path d="M50 88 L48 91 M50 88 L52 91" />
        <path d="M58 95 L58 88" />
        <path d="M58 88 L56 91 M58 88 L60 91" />
      </g>

      {/* Depth indicator */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
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
    <g filter={showHalo ? "url(#earth-pressure-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Ground level */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M5 20 L40 20" />
        <path d="M55 20 L95 20" />
      </g>

      {/* RETAINING WALL - Central element */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M40 15 L55 15 L55 90 L40 90 Z" />
      </g>

      {/* Wall reinforcement hints */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M42 25 L53 25" />
        <path d="M42 40 L53 40" />
        <path d="M42 55 L53 55" />
        <path d="M42 70 L53 70" />
        <path d="M42 85 L53 85" />
      </g>

      {/* SOIL MASS (retained side - left) */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        {/* Soil texture */}
        <path d="M10 30 L15 30 M20 28 L25 28 M30 32 L35 32" />
        <path d="M8 45 L13 45 M18 43 L23 43 M28 47 L33 47" />
        <path d="M10 60 L15 60 M20 58 L25 58 M30 62 L35 62" />
        <path d="M8 75 L13 75 M18 73 L23 73 M28 77 L33 77" />
        <path d="M10 88 L15 88 M20 86 L25 86 M30 90 L35 90" />
      </g>

      {/* ACTIVE EARTH PRESSURE ARROWS - Key feature */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
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
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M38 20 L16 90 L38 90 Z" strokeDasharray={S.CN.dash} />
      </g>

      {/* PASSIVE PRESSURE (toe resistance - front of wall) */}
      <g strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity}>
        <path d="M60 82 L57 82" />
        <path d="M57 82 L59 80 M57 82 L59 84" />
        <path d="M65 88 L57 88" />
        <path d="M57 88 L59 86 M57 88 L59 90" />
      </g>

      {/* Wall heel and toe indication */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M32 90 L40 90 L40 95 L32 95 Z" />
        <path d="M55 90 L63 90 L63 95 L55 95 Z" />
      </g>

      {/* Labels */}
      <g opacity={S.D.opacitySubtle}>
        <text x="20" y="15" fontSize="4" fill="currentColor">ACTIVE</text>
        <text x="62" y="80" fontSize="3" fill="currentColor">PASSIVE</text>
      </g>

      {/* Slip plane indication */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.E.opacityModerate} strokeDasharray={S.CF.dash}>
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
    <g filter={showHalo ? "url(#buoyancy-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Ground/water surface */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M5 25 L20 25 M80 25 L95 25" />
      </g>

      {/* Water level wavy line */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M5 25 Q15 22, 25 25 Q35 28, 45 25 Q55 22, 65 25 Q75 28, 85 25 Q92 23, 95 25" />
      </g>

      {/* SUBMERGED STRUCTURE (basement/tank/caisson) */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M25 20 L75 20 L75 80 L25 80 Z" />
      </g>

      {/* Structure interior divisions */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M25 40 L75 40" />
        <path d="M25 60 L75 60" />
        <path d="M50 20 L50 80" />
      </g>

      {/* WATER surrounding structure */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
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
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
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
      <g strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity}>
        <path d="M15 50 L23 50" />
        <path d="M23 50 L20 48 M23 50 L20 52" />
        <path d="M85 50 L77 50" />
        <path d="M77 50 L80 48 M77 50 L80 52" />
      </g>

      {/* Weight arrow (gravity counteracting buoyancy) */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
        <path d="M50 10 L50 18" />
        <path d="M50 18 L48 15 M50 18 L52 15" />
        <text x="55" y="15" fontSize="4" fill="currentColor">W</text>
      </g>

      {/* Net buoyancy equation hint */}
      <g opacity={S.D.opacitySubtle}>
        <text x="50" y="98" fontSize="4" textAnchor="middle" fill="currentColor">Fb = ρ × V × g</text>
      </g>

      {/* Displaced volume indication */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.E.opacityModerate} strokeDasharray={S.E.dash}>
        <path d="M25 25 L25 80 L75 80 L75 25" />
      </g>

      {/* Water table marker */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
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
    <g filter={showHalo ? "url(#dead-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Weight/mass symbol - solid block with down arrow */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Solid block representing mass */}
        <path d="M25 30 L75 30 L75 60 L25 60 Z" />
        <path d="M30 35 L70 35" strokeWidth={S.P.strokeWidth} opacity={S.D.opacity} />
        <path d="M30 42 L70 42" strokeWidth={S.P.strokeWidth} opacity={S.D.opacity} />
        <path d="M30 49 L70 49" strokeWidth={S.P.strokeWidth} opacity={S.D.opacity} />
        <path d="M30 56 L70 56" strokeWidth={S.P.strokeWidth} opacity={S.D.opacity} />
      </g>

      {/* Downward arrow - gravity */}
      <g strokeWidth={S.P.strokeWidthHeavy}>
        <path d="M50 65 L50 90" />
        <path d="M40 80 L50 90 L60 80" />
      </g>

      {/* "G" for gravity indicator */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
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
    <g filter={showHalo ? "url(#live-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Person 1 - center */}
      <g strokeWidth={S.P.strokeWidth}>
        <circle cx="50" cy="25" r="8" />
        <path d="M50 33 L50 55" strokeWidth={S.P.strokeWidthBold} />
        <path d="M50 40 L35 50" />
        <path d="M50 40 L65 50" />
        <path d="M50 55 L38 75" />
        <path d="M50 55 L62 75" />
      </g>

      {/* Person 2 - left (smaller, background) */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
        <circle cx="22" cy="45" r="5" />
        <path d="M22 50 L22 65" />
        <path d="M22 54 L15 60" />
        <path d="M22 54 L29 60" />
        <path d="M22 65 L17 78" />
        <path d="M22 65 L27 78" />
      </g>

      {/* Person 3 - right (smaller, background) */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
        <circle cx="78" cy="45" r="5" />
        <path d="M78 50 L78 65" />
        <path d="M78 54 L71 60" />
        <path d="M78 54 L85 60" />
        <path d="M78 65 L73 78" />
        <path d="M78 65 L83 78" />
      </g>

      {/* Floor line */}
      <path d="M10 85 L90 85" strokeWidth={S.P.strokeWidth} />

      {/* Variable indicator */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
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
    <g filter={showHalo ? "url(#wind-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Wind flow lines */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M10 30 Q30 25, 50 30 Q70 35, 80 30" />
        <path d="M80 30 L75 25" />
        <path d="M80 30 L75 35" />
      </g>

      <g strokeWidth={S.P.strokeWidth}>
        <path d="M5 50 Q25 45, 50 50 Q75 55, 90 50" />
        <path d="M90 50 L85 45" />
        <path d="M90 50 L85 55" />
      </g>

      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M10 70 Q30 65, 50 70 Q70 75, 80 70" />
        <path d="M80 70 L75 65" />
        <path d="M80 70 L75 75" />
      </g>

      {/* Swirl accent */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
        <path d="M85 35 Q95 40, 90 50 Q85 55, 90 60" />
      </g>

      {/* Small particles */}
      <g opacity={S.D.opacitySubtle}>
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
    <g filter={showHalo ? "url(#seismic-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Seismograph wave pattern */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M10 50 L25 50 L30 20 L35 80 L40 30 L45 70 L50 40 L55 60 L60 45 L65 55 L70 50 L90 50" />
      </g>

      {/* Ground crack symbol */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M30 85 L35 75 L40 85 L45 72 L50 88" />
        <path d="M55 85 L60 78 L65 85" />
      </g>

      {/* Radiating waves from epicenter */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacitySubtle}>
        <circle cx="40" cy="50" r="15" />
        <circle cx="40" cy="50" r="25" />
        <circle cx="40" cy="50" r="35" />
      </g>

      {/* Epicenter dot */}
      <circle cx="40" cy="50" r="3" fill="currentColor" opacity={S.D.opacity} />
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
    <g filter={showHalo ? "url(#snow-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Main snowflake */}
      <g strokeWidth={S.P.strokeWidthBold}>
        {/* Vertical arm */}
        <path d="M50 15 L50 85" />
        {/* Horizontal arm */}
        <path d="M15 50 L85 50" />
        {/* Diagonal arms */}
        <path d="M25 25 L75 75" />
        <path d="M75 25 L25 75" />
      </g>

      {/* Branch details */}
      <g strokeWidth={S.P.strokeWidth}>
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
      <circle cx="50" cy="50" r="5" strokeWidth={S.P.strokeWidth} />
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
    <g filter={showHalo ? "url(#rain-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Cloud */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M25 40 Q25 25, 40 25 Q45 15, 60 20 Q80 20, 80 40 Q90 40, 85 55 L20 55 Q10 55, 15 40 Q15 40, 25 40" />
      </g>

      {/* Rain drops */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M30 62 L30 75 Q30 80, 30 75" />
        <path d="M30 75 Q28 78, 30 80 Q32 78, 30 75" fill="currentColor" opacity={S.E.opacityModerate} />

        <path d="M50 62 L50 80 Q50 85, 50 80" />
        <path d="M50 80 Q48 83, 50 85 Q52 83, 50 80" fill="currentColor" opacity={S.E.opacityModerate} />

        <path d="M70 62 L70 72 Q70 77, 70 72" />
        <path d="M70 72 Q68 75, 70 77 Q72 75, 70 72" fill="currentColor" opacity={S.E.opacityModerate} />
      </g>

      {/* Water pooling */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
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
    <g filter={showHalo ? "url(#impact-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Impact starburst */}
      <g strokeWidth={S.P.strokeWidthBold}>
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
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
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
      <circle cx="50" cy="50" r="8" strokeWidth={S.P.strokeWidthBold} />
      <circle cx="50" cy="50" r="4" fill="currentColor" opacity={S.D.opacity} />

      {/* Motion arrow */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
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
    <g filter={showHalo ? "url(#thermal-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Thermometer */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Bulb */}
        <circle cx="50" cy="75" r="12" />
        {/* Stem */}
        <path d="M44 75 L44 25 Q44 20, 50 20 Q56 20, 56 25 L56 75" />
        {/* Mercury */}
        <path d="M47 70 L47 35" strokeWidth={S.P.strokeWidthHeavy} opacity={S.D.opacity} />
        <circle cx="50" cy="75" r="8" fill="currentColor" opacity={S.E.opacityModerate} />
        {/* Scale marks */}
        <path d="M58 35 L62 35" strokeWidth={S.P.strokeWidth} />
        <path d="M58 45 L62 45" strokeWidth={S.P.strokeWidth} />
        <path d="M58 55 L62 55" strokeWidth={S.P.strokeWidth} />
        <path d="M58 65 L62 65" strokeWidth={S.P.strokeWidth} />
      </g>

      {/* Expansion arrows */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        {/* Left arrow */}
        <path d="M25 50 L10 50" />
        <path d="M10 50 L15 45 M10 50 L15 55" />
        {/* Right arrow */}
        <path d="M75 50 L90 50" />
        <path d="M90 50 L85 45 M90 50 L85 55" />
      </g>

      {/* Hot/cold indicators */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
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
    <g filter={showHalo ? "url(#hydro-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Container/wall */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M70 20 L70 85 L30 85" />
      </g>

      {/* Water surface */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M30 30 Q40 27, 50 30 Q60 33, 70 30" />
      </g>

      {/* Water fill indication */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M32 40 Q42 37, 52 40 Q62 43, 68 40" />
        <path d="M32 50 Q42 47, 52 50 Q62 53, 68 50" />
        <path d="M32 60 Q42 57, 52 60 Q62 63, 68 60" />
        <path d="M32 70 Q42 67, 52 70 Q62 73, 68 70" />
        <path d="M32 80 Q42 77, 52 80 Q62 83, 68 80" />
      </g>

      {/* Pressure triangle */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M25 30 L10 85 L25 85 Z" strokeDasharray={S.CF.dash} />
      </g>

      {/* Pressure arrows */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
        <path d="M15 45 L28 45" />
        <path d="M28 45 L25 42 M28 45 L25 48" />
        <path d="M12 65 L28 65" />
        <path d="M28 65 L25 62 M28 65 L25 68" />
        <path d="M10 82 L28 82" />
        <path d="M28 82 L25 79 M28 82 L25 85" />
      </g>

      {/* Depth indicator */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
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
    <g filter={showHalo ? "url(#earth-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Retaining wall */}
      <g strokeWidth={S.P.strokeWidthHeavy}>
        <path d="M55 15 L55 90" />
        <path d="M50 15 L60 15" />
        <path d="M50 90 L65 90 L65 95 L45 95 Z" />
      </g>

      {/* Soil mass indication */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M10 25 L50 25" />
        <path d="M10 40 L50 40" />
        <path d="M10 55 L50 55" />
        <path d="M10 70 L50 70" />
        <path d="M10 85 L50 85" />
      </g>

      {/* Triangular earth pressure */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M50 20 L15 90 L50 90 Z" opacity={S.E.opacityModerate} />
      </g>

      {/* Pressure arrows */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M35 35 L50 35" />
        <path d="M50 35 L45 32 M50 35 L45 38" />
        <path d="M25 60 L50 60" />
        <path d="M50 60 L45 57 M50 60 L45 63" />
        <path d="M18 82 L50 82" />
        <path d="M50 82 L45 79 M50 82 L45 85" />
      </g>

      {/* Ka symbol */}
      <g opacity={S.D.opacity}>
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
    <g filter={showHalo ? "url(#buoyancy-symbolic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Submerged box */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M25 35 L75 35 L75 70 L25 70 Z" />
      </g>

      {/* Water surface wavy line */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
        <path d="M10 25 Q20 22, 30 25 Q40 28, 50 25 Q60 22, 70 25 Q80 28, 90 25" />
      </g>

      {/* Water indication around object */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M12 40 Q16 38, 20 40" />
        <path d="M12 55 Q16 53, 20 55" />
        <path d="M80 40 Q84 38, 88 40" />
        <path d="M80 55 Q84 53, 88 55" />
      </g>

      {/* BUOYANCY ARROWS - Upward */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M35 90 L35 75" />
        <path d="M35 75 L30 82 M35 75 L40 82" />
        <path d="M50 90 L50 75" />
        <path d="M50 75 L45 82 M50 75 L55 82" />
        <path d="M65 90 L65 75" />
        <path d="M65 75 L60 82 M65 75 L70 82" />
      </g>

      {/* Fb label */}
      <g opacity={S.D.opacity}>
        <text x="50" y="55" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="bold">Fb</text>
      </g>

      {/* Upward indication */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
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
    <g filter={showHalo ? "url(#dead-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Column under compression */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Original column outline (dashed) */}
        <path d="M35 20 L65 20 L65 80 L35 80 Z" strokeDasharray={S.CF.dash} opacity={S.D.opacitySubtle} />
        {/* Compressed column (slightly shorter/wider at base) */}
        <path d="M34 22 L66 22 L67 78 L33 78 Z" strokeWidth={S.P.strokeWidthBold} />
      </g>

      {/* Compression stress arrows */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M50 8 L50 18" />
        <path d="M50 18 L47 14 M50 18 L53 14" />
        <path d="M50 92 L50 82" />
        <path d="M50 82 L47 86 M50 82 L53 86" />
      </g>

      {/* Internal stress pattern */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M40 30 L40 70" />
        <path d="M50 28 L50 72" />
        <path d="M60 30 L60 70" />
      </g>

      {/* Shortening indicator */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M75 20 L75 78" strokeDasharray={S.E.dash} />
        <path d="M72 20 L78 20" />
        <path d="M72 22 L78 22" />
        <text x="82" y="50" fontSize="5" fill="currentColor">Δ</text>
      </g>

      {/* Foundation */}
      <path d="M25 80 L75 80 L75 88 L25 88 Z" strokeWidth={S.P.strokeWidth} />
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
    <g filter={showHalo ? "url(#live-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Supports */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M15 50 L15 85" />
        <path d="M85 50 L85 85" />
        <path d="M10 85 L90 85" />
      </g>

      {/* Original beam position (dashed) */}
      <path d="M15 50 L85 50" strokeWidth={S.P.strokeWidth} strokeDasharray={S.CF.dash} opacity={S.D.opacitySubtle} />

      {/* Deflected beam */}
      <path d="M15 50 Q50 65, 85 50" strokeWidth={S.P.strokeWidthHeavy} />

      {/* Load on beam */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M50 35 L50 52" />
        <path d="M50 52 L47 48 M50 52 L53 48" />
        <rect x="40" y="20" width="20" height="15" strokeWidth={S.P.strokeWidth} />
      </g>

      {/* Deflection indicator */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M50 50 L50 62" strokeDasharray={S.E.dash} />
        <path d="M47 50 L53 50" />
        <path d="M47 62 L53 62" />
        <text x="56" y="58" fontSize="5" fill="currentColor">δ</text>
      </g>

      {/* Stress pattern in beam */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate}>
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
    <g filter={showHalo ? "url(#wind-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Original building position (dashed) */}
      <path d="M35 15 L35 85 L65 85 L65 15 Z" strokeWidth={S.P.strokeWidth} strokeDasharray={S.CF.dash} opacity={S.E.opacityModerate} />

      {/* Deflected building */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M40 15 L35 85 L65 85 L70 15 Z" />
        {/* Floor lines showing drift */}
        <path d="M36 55 L66 55" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M38 35 L68 35" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      </g>

      {/* Wind arrows */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
        <path d="M10 30 L35 30" />
        <path d="M35 30 L30 27 M35 30 L30 33" />
        <path d="M10 50 L35 50" />
        <path d="M35 50 L30 47 M35 50 L30 53" />
        <path d="M10 70 L35 70" />
        <path d="M35 70 L30 67 M35 70 L30 73" />
      </g>

      {/* Drift indicator */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M50 10 L50 15" strokeDasharray={S.E.dash} />
        <path d="M50 10 L55 10" />
        <path d="M55 10 L55 15" strokeDasharray={S.E.dash} />
        <text x="52" y="8" fontSize="5" fill="currentColor">Δ</text>
      </g>

      {/* Foundation (fixed) */}
      <path d="M30 85 L70 85 L70 92 L30 92 Z" strokeWidth={S.P.strokeWidth} />

      {/* Ground */}
      <path d="M20 92 L80 92" strokeWidth={S.P.strokeWidth} />
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
    <g filter={showHalo ? "url(#seismic-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Original position (dashed) */}
      <path d="M40 10 L40 75 L60 75 L60 10 Z" strokeWidth={S.D.strokeWidth} strokeDasharray={S.CN.dash} opacity={S.E.opacityModerate} />

      {/* Deformed building showing inter-story drift */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Each floor shifts differently */}
        <path d="M50 10 L38 30 L65 30" />
        <path d="M38 30 L42 50 L62 50" />
        <path d="M42 50 L40 75 L60 75 L58 50" />
        <path d="M62 50 L60 30" />
        <path d="M65 30 L58 10" />
        <path d="M50 10 L58 10" />
      </g>

      {/* Ground motion arrows */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M25 82 L35 82" />
        <path d="M35 82 L32 79 M35 82 L32 85" />
        <path d="M75 82 L65 82" />
        <path d="M65 82 L68 79 M65 82 L68 85" />
      </g>

      {/* Seismic waves at base */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M15 90 Q25 85, 35 90 Q45 95, 55 90 Q65 85, 75 90 Q85 95, 90 90" />
      </g>

      {/* Inter-story drift markers */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M70 10 L70 30" strokeDasharray={S.E.dash} />
        <path d="M70 30 L70 50" strokeDasharray={S.E.dash} />
        <text x="73" y="20" fontSize="4" fill="currentColor">drift</text>
      </g>

      {/* Foundation */}
      <path d="M35 75 L65 75 L65 82 L35 82 Z" strokeWidth={S.P.strokeWidth} />
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
    <g filter={showHalo ? "url(#snow-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Supports */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M20 55 L20 85" />
        <path d="M80 55 L80 85" />
      </g>

      {/* Original roof (dashed) */}
      <path d="M15 55 L50 25 L85 55" strokeWidth={S.P.strokeWidth} strokeDasharray={S.CF.dash} opacity={S.E.opacityModerate} />

      {/* Deflected roof */}
      <path d="M15 55 Q35 45, 50 35 Q65 45, 85 55" strokeWidth={S.P.strokeWidthBold} />

      {/* Snow on roof */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
        <path d="M18 53 Q35 40, 50 32 Q65 40, 82 53" />
        {/* Snow texture */}
        <path d="M25 48 Q30 46, 35 48" strokeWidth={S.D.strokeWidth} />
        <path d="M60 48 Q65 46, 70 48" strokeWidth={S.D.strokeWidth} />
      </g>

      {/* Weight arrows */}
      <g strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity}>
        <path d="M35 22 L35 38" />
        <path d="M35 38 L33 35 M35 38 L37 35" />
        <path d="M50 15 L50 30" />
        <path d="M50 30 L48 27 M50 30 L52 27" />
        <path d="M65 22 L65 38" />
        <path d="M65 38 L63 35 M65 38 L67 35" />
      </g>

      {/* Deflection indicator at ridge */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M50 25 L50 35" strokeDasharray={S.E.dash} />
        <path d="M47 25 L53 25" />
        <path d="M47 35 L53 35" />
        <text x="54" y="32" fontSize="5" fill="currentColor">δ</text>
      </g>

      {/* Ground */}
      <path d="M10 85 L90 85" strokeWidth={S.P.strokeWidth} />
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
    <g filter={showHalo ? "url(#rain-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Building walls */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M15 30 L15 85" />
        <path d="M85 30 L85 85" />
      </g>

      {/* Original roof (flat, dashed) */}
      <path d="M15 30 L85 30" strokeWidth={S.P.strokeWidth} strokeDasharray={S.CF.dash} opacity={S.E.opacityModerate} />

      {/* Deflected roof with ponding */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M15 30 Q50 50, 85 30" />
      </g>

      {/* Water surface */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
        <path d="M20 32 Q50 45, 80 32" />
        {/* Water fill */}
        <path d="M25 33 Q50 42, 75 33" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M30 34 Q50 40, 70 34" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
      </g>

      {/* Blocked drain symbol */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        <circle cx="75" cy="35" r="4" />
        <path d="M72 32 L78 38" />
        <path d="M78 32 L72 38" />
      </g>

      {/* Progressive failure arrows */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M50 35 L50 45" />
        <path d="M50 45 L48 42 M50 45 L52 42" />
        <path d="M50 50 L50 60" strokeDasharray={S.E.dash} />
        <path d="M50 60 L48 57 M50 60 L52 57" />
      </g>

      {/* Warning indicator */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
        <path d="M45 70 L50 60 L55 70 Z" />
        <path d="M50 64 L50 67" strokeWidth={S.P.strokeWidth} />
        <circle cx="50" cy="68.5" r="0.8" fill="currentColor" />
      </g>

      {/* Ground */}
      <path d="M10 85 L90 85" strokeWidth={S.P.strokeWidth} />
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
    <g filter={showHalo ? "url(#impact-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Beam/structure */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M10 50 L90 50 L90 60 L10 60 Z" />
        {/* Supports */}
        <path d="M15 60 L15 85" />
        <path d="M85 60 L85 85" />
      </g>

      {/* Impact point with local deformation */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M45 50 Q50 55, 55 50" />
      </g>

      {/* Impacting object */}
      <g strokeWidth={S.P.strokeWidth}>
        <circle cx="50" cy="35" r="8" />
        <path d="M50 28 L50 20" />
        <path d="M50 20 L47 25 M50 20 L53 25" />
      </g>

      {/* Stress waves radiating from impact */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M50 55 Q40 58, 30 55" strokeDasharray={S.E.dash} />
        <path d="M50 55 Q60 58, 70 55" strokeDasharray={S.E.dash} />
        <path d="M50 55 Q35 60, 20 55" strokeDasharray={S.E.dash} opacity={S.E.opacityModerate} />
        <path d="M50 55 Q65 60, 80 55" strokeDasharray={S.E.dash} opacity={S.E.opacityModerate} />
      </g>

      {/* Impact starburst */}
      <g strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity}>
        <path d="M45 48 L42 42" />
        <path d="M50 47 L50 40" />
        <path d="M55 48 L58 42" />
      </g>

      {/* Vibration indication */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M25 62 Q27 65, 25 68" />
        <path d="M75 62 Q77 65, 75 68" />
      </g>

      {/* Ground */}
      <path d="M5 85 L95 85" strokeWidth={S.P.strokeWidth} />
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
    <g filter={showHalo ? "url(#thermal-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Structure - two sections with expansion joint */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* Left section */}
        <path d="M10 30 L45 30 L45 75 L10 75 Z" />
        {/* Right section */}
        <path d="M55 30 L90 30 L90 75 L55 75 Z" />
      </g>

      {/* Expansion joint gap - COLD state (wider) */}
      <g strokeWidth={S.P.strokeWidth} strokeDasharray={S.CN.dash} opacity={S.D.opacitySubtle}>
        <path d="M46 30 L46 75" />
        <path d="M54 30 L54 75" />
      </g>

      {/* Expansion joint gap - HOT state (narrower) */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M47 32 L47 73" />
        <path d="M53 32 L53 73" />
      </g>

      {/* Expansion arrows */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        {/* Left section expanding right */}
        <path d="M35 52 L44 52" />
        <path d="M44 52 L41 49 M44 52 L41 55" />
        {/* Right section expanding left */}
        <path d="M65 52 L56 52" />
        <path d="M56 52 L59 49 M56 52 L59 55" />
      </g>

      {/* Temperature indicators */}
      <g strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity}>
        {/* Sun (hot) */}
        <circle cx="80" cy="15" r="6" />
        <path d="M80 5 L80 8" />
        <path d="M80 22 L80 25" />
        <path d="M70 15 L73 15" />
        <path d="M87 15 L90 15" />

        {/* Cold indicator */}
        <path d="M15 15 L15 22 M12 18 L18 18" strokeWidth={S.P.strokeWidth} />
      </g>

      {/* Gap measurement */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M47 80 L53 80" />
        <path d="M47 78 L47 82" />
        <path d="M53 78 L53 82" />
        <text x="50" y="88" fontSize="5" textAnchor="middle" fill="currentColor">gap</text>
      </g>

      {/* Foundation */}
      <path d="M5 75 L95 75" strokeWidth={S.P.strokeWidth} />
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
    <g filter={showHalo ? "url(#hydro-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Original wall position (dashed) */}
      <path d="M50 15 L50 85" strokeWidth={S.P.strokeWidth} strokeDasharray={S.CF.dash} opacity={S.E.opacityModerate} />

      {/* Deflected wall (curved) */}
      <g strokeWidth={S.P.strokeWidthHeavy}>
        <path d="M50 15 Q58 50, 50 85" />
      </g>

      {/* Water on left side */}
      <g strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate}>
        <path d="M10 25 Q20 22, 30 25 Q40 28, 50 25" />
        <path d="M10 40 Q20 37, 30 40 Q40 43, 52 40" />
        <path d="M10 55 Q20 52, 30 55 Q40 58, 54 55" />
        <path d="M10 70 Q20 67, 30 70 Q40 73, 55 70" />
      </g>

      {/* Pressure distribution arrows */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M20 30 L48 30" />
        <path d="M48 30 L44 27 M48 30 L44 33" />
        <path d="M15 50 L52 50" />
        <path d="M52 50 L48 47 M52 50 L48 53" />
        <path d="M10 70 L54 70" />
        <path d="M54 70 L50 67 M54 70 L50 73" />
      </g>

      {/* Deflection indicator */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M50 50 L56 50" strokeDasharray={S.E.dash} />
        <path d="M50 48 L50 52" />
        <path d="M56 48 L56 52" />
        <text x="58" y="52" fontSize="5" fill="currentColor">δ</text>
      </g>

      {/* Moment diagram hint */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M65 15 Q70 50, 65 85" strokeDasharray={S.CN.dash} />
      </g>

      {/* Base restraint */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M45 85 L55 85 L55 92 L45 92 Z" />
        <path d="M40 92 L60 92" />
      </g>

      {/* Water level indicator */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
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
    <g filter={showHalo ? "url(#earth-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Original wall position (dashed) */}
      <path d="M50 10 L50 85" strokeWidth={S.P.strokeWidth} strokeDasharray={S.CF.dash} opacity={S.E.opacityModerate} />

      {/* Deflected/rotated wall */}
      <g strokeWidth={S.P.strokeWidthHeavy}>
        <path d="M50 85 L58 10" />
      </g>

      {/* Soil on active side */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        <path d="M10 20 L48 20" />
        <path d="M10 40 L52 40" />
        <path d="M10 60 L55 60" />
        <path d="M10 80 L50 80" />
      </g>

      {/* Active pressure arrows */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M30 25 L52 25" />
        <path d="M52 25 L48 22 M52 25 L48 28" />
        <path d="M20 50 L54 50" />
        <path d="M54 50 L50 47 M54 50 L50 53" />
        <path d="M15 75 L52 75" />
        <path d="M52 75 L48 72 M52 75 L48 78" />
      </g>

      {/* Wall rotation indicator */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M50 10 L58 10" strokeDasharray={S.E.dash} />
        <path d="M50 8 L50 12" />
        <path d="M58 8 L58 12" />
        <text x="54" y="7" fontSize="4" fill="currentColor">δ</text>
      </g>

      {/* Rotation angle arc */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M50 75 Q54 72, 55 68" />
        <text x="56" y="74" fontSize="4" fill="currentColor">θ</text>
      </g>

      {/* Base/heel */}
      <g strokeWidth={S.P.strokeWidth}>
        <path d="M35 85 L65 85 L65 92 L35 92 Z" />
        <path d="M30 92 L70 92" />
      </g>

      {/* Passive resistance (toe) */}
      <g strokeWidth={S.D.strokeWidthBold} opacity={S.D.opacity}>
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
    <g filter={showHalo ? "url(#buoyancy-effect-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* Original position (dashed) */}
      <path d="M25 50 L75 50 L75 85 L25 85 Z" strokeWidth={S.P.strokeWidth} strokeDasharray={S.CF.dash} opacity={S.E.opacityModerate} />

      {/* Lifted structure */}
      <g strokeWidth={S.P.strokeWidthBold}>
        <path d="M25 40 L75 40 L75 75 L25 75 Z" />
      </g>

      {/* Water surface */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
        <path d="M5 30 Q15 27, 25 30 Q35 33, 45 30 Q55 27, 65 30 Q75 33, 85 30 Q92 28, 95 30" />
      </g>

      {/* Water around structure */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        <path d="M8 45 Q12 43, 18 45" />
        <path d="M8 60 Q12 58, 18 60" />
        <path d="M82 45 Q86 43, 92 45" />
        <path d="M82 60 Q86 58, 92 60" />
      </g>

      {/* Uplift arrows */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacityStrong}>
        <path d="M35 90 L35 78" />
        <path d="M35 78 L32 82 M35 78 L38 82" />
        <path d="M50 90 L50 78" />
        <path d="M50 78 L47 82 M50 78 L53 82" />
        <path d="M65 90 L65 78" />
        <path d="M65 78 L62 82 M65 78 L68 82" />
      </g>

      {/* Uplift displacement indicator */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M80 50 L80 40" strokeDasharray={S.E.dash} />
        <path d="M78 50 L82 50" />
        <path d="M78 40 L82 40" />
        <text x="84" y="47" fontSize="5" fill="currentColor">Δ</text>
      </g>

      {/* Weight arrow (gravity) */}
      <g strokeWidth={S.P.strokeWidth} opacity={S.D.opacity}>
        <path d="M50 25 L50 38" />
        <path d="M50 38 L47 34 M50 38 L53 34" />
        <text x="55" y="30" fontSize="4" fill="currentColor">W</text>
      </g>

      {/* Net force indication */}
      <g opacity={S.D.opacitySubtle}>
        <text x="50" y="58" fontSize="5" textAnchor="middle" fill="currentColor">Fb &gt; W</text>
      </g>

      {/* Original base position line */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle}>
        <path d="M20 85 L80 85" strokeDasharray={S.CN.dash} />
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

// =============================================================================
// COMBINED STRUCTURAL ELEMENTS EXPORT
// =============================================================================

export const STRUCTURAL_ELEMENTS = {
  ...BRACING_ELEMENTS,
  ...TRUSS_ELEMENTS,
  ...FOUNDATION_ELEMENTS,
  ...LOAD_ELEMENTS,
}
