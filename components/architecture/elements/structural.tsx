'use client'

import React from 'react'

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
 * Shows: Diagonal with offset, highlighted link beam section
 * Modern seismic design: Link yields and absorbs energy
 */
export const EccentricBracingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="eccentric-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#eccentric-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ground line */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 92 L95 92" />
      </g>

      {/* PRIMARY - Structural frame */}
      <g strokeWidth="2">
        {/* Columns */}
        <path d="M20 15 L20 88" />
        <path d="M80 15 L80 88" />
        {/* Top beam */}
        <path d="M15 15 L85 15" />
        {/* Bottom beam */}
        <path d="M15 88 L85 88" />
      </g>

      {/* THE LINK BEAM - Key feature: highlighted section that yields */}
      <g strokeWidth="4" opacity="0.6">
        <path d="M35 15 L50 15" className="text-amber-500" stroke="currentColor" />
      </g>

      {/* ECCENTRIC BRACES - Note offset from column */}
      <g strokeWidth="2.5">
        {/* Left brace: from bottom-left to OFFSET point on top beam */}
        <path d="M20 88 L35 15" />
        {/* Right brace: from bottom-right to OFFSET point on top beam */}
        <path d="M80 88 L50 15" />
      </g>

      {/* Connection points */}
      <g strokeWidth="1.2">
        <circle cx="35" cy="15" r="3" />
        <circle cx="50" cy="15" r="3" />
      </g>

      {/* Link beam label indicator */}
      <g strokeWidth="0.8" opacity="0.5">
        <path d="M42.5 8 L42.5 12" />
        <path d="M38 5 L47 5" />
        <text x="42.5" y="4" fontSize="4" textAnchor="middle" fill="currentColor" opacity="0.6">link</text>
      </g>

      {/* Energy dissipation symbol */}
      <g strokeWidth="0.6" opacity="0.4">
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
}

// =============================================================================
// TRUSS TYPES - Triangulated Structural Systems
// =============================================================================

/**
 * KING POST TRUSS - Simplest truss with single central post
 * Medieval origin, still used in residential construction
 * Shows: Triangle with single vertical post from apex to tie beam
 * The central post is in TENSION (pulling up on the tie beam)
 */
export const KingPostTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="king-post-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#king-post-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Support points */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M10 75 L10 85" />
        <path d="M90 75 L90 85" />
        <path d="M5 85 L95 85" />
      </g>

      {/* PRIMARY - Truss outline */}
      <g strokeWidth="2.5">
        {/* Bottom chord (tie beam) */}
        <path d="M10 70 L90 70" />
        {/* Left rafter */}
        <path d="M10 70 L50 25" />
        {/* Right rafter */}
        <path d="M90 70 L50 25" />
      </g>

      {/* THE KING POST - Key feature: single central vertical */}
      <g strokeWidth="3">
        <path d="M50 25 L50 70" />
      </g>

      {/* Struts (compression members from post to rafters) */}
      <g strokeWidth="2">
        <path d="M50 45 L30 57" />
        <path d="M50 45 L70 57" />
      </g>

      {/* Joint connections */}
      <g strokeWidth="1" opacity="0.7">
        <circle cx="50" cy="25" r="3" />
        <circle cx="50" cy="70" r="3" />
        <circle cx="50" cy="45" r="2" />
        <circle cx="10" cy="70" r="3" />
        <circle cx="90" cy="70" r="3" />
      </g>

      {/* Support triangles */}
      <g strokeWidth="1.5">
        <path d="M5 75 L15 75 L10 70 Z" />
        <path d="M85 75 L95 75 L90 70 Z" />
      </g>

      {/* Tension indicator on king post */}
      <g strokeWidth="0.6" opacity="0.4">
        <path d="M47 35 L47 60" strokeDasharray="2 1" />
        <path d="M53 35 L53 60" strokeDasharray="2 1" />
      </g>
    </g>
  </svg>
)

/**
 * QUEEN POST TRUSS - Two vertical posts for wider spans
 * Medieval origin, allows for wider openings than King Post
 * Shows: Two vertical posts with horizontal straining beam between
 * Posts are in TENSION, straining beam in COMPRESSION
 */
export const QueenPostTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="queen-post-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#queen-post-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Support points */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M10 75 L10 85" />
        <path d="M90 75 L90 85" />
        <path d="M5 85 L95 85" />
      </g>

      {/* PRIMARY - Truss outline */}
      <g strokeWidth="2.5">
        {/* Bottom chord (tie beam) */}
        <path d="M10 70 L90 70" />
        {/* Left rafter */}
        <path d="M10 70 L50 25" />
        {/* Right rafter */}
        <path d="M90 70 L50 25" />
      </g>

      {/* THE QUEEN POSTS - Key feature: two vertical posts */}
      <g strokeWidth="2.5">
        <path d="M32 70 L32 42" />
        <path d="M68 70 L68 42" />
      </g>

      {/* Straining beam between queen posts */}
      <g strokeWidth="2">
        <path d="M32 42 L68 42" />
      </g>

      {/* Struts from straining beam to apex */}
      <g strokeWidth="1.8">
        <path d="M32 42 L50 25" />
        <path d="M68 42 L50 25" />
      </g>

      {/* Joint connections */}
      <g strokeWidth="1" opacity="0.7">
        <circle cx="50" cy="25" r="3" />
        <circle cx="32" cy="70" r="2.5" />
        <circle cx="68" cy="70" r="2.5" />
        <circle cx="32" cy="42" r="2.5" />
        <circle cx="68" cy="42" r="2.5" />
        <circle cx="10" cy="70" r="3" />
        <circle cx="90" cy="70" r="3" />
      </g>

      {/* Support triangles */}
      <g strokeWidth="1.5">
        <path d="M5 75 L15 75 L10 70 Z" />
        <path d="M85 75 L95 75 L90 70 Z" />
      </g>
    </g>
  </svg>
)

/**
 * PRATT TRUSS (1844) - Diagonals slope toward center
 * Designed by Thomas and Caleb Pratt
 * Shows: Verticals + diagonals pointing inward (V pattern each panel)
 * Diagonals in TENSION (efficient for steel), verticals in COMPRESSION
 */
export const PrattTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pratt-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#pratt-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Support points */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 72 L95 72" />
      </g>

      {/* PRIMARY - Top and bottom chords */}
      <g strokeWidth="2.5">
        {/* Top chord */}
        <path d="M10 30 L90 30" />
        {/* Bottom chord */}
        <path d="M10 65 L90 65" />
      </g>

      {/* Vertical members (compression) */}
      <g strokeWidth="2">
        <path d="M10 30 L10 65" />
        <path d="M30 30 L30 65" />
        <path d="M50 30 L50 65" />
        <path d="M70 30 L70 65" />
        <path d="M90 30 L90 65" />
      </g>

      {/* PRATT DIAGONALS - Key feature: slope toward center (tension) */}
      <g strokeWidth="2">
        {/* Left side - diagonals point right/down toward center */}
        <path d="M10 30 L30 65" />
        <path d="M30 30 L50 65" />
        {/* Right side - diagonals point left/down toward center */}
        <path d="M90 30 L70 65" />
        <path d="M70 30 L50 65" />
      </g>

      {/* Joint plates */}
      <g strokeWidth="0.8" opacity="0.6">
        <circle cx="10" cy="30" r="2.5" />
        <circle cx="30" cy="30" r="2.5" />
        <circle cx="50" cy="30" r="2.5" />
        <circle cx="70" cy="30" r="2.5" />
        <circle cx="90" cy="30" r="2.5" />
        <circle cx="10" cy="65" r="2.5" />
        <circle cx="30" cy="65" r="2.5" />
        <circle cx="50" cy="65" r="2.5" />
        <circle cx="70" cy="65" r="2.5" />
        <circle cx="90" cy="65" r="2.5" />
      </g>

      {/* Support symbols */}
      <g strokeWidth="1.5">
        {/* Pin support left */}
        <path d="M5 68 L15 68 L10 65 Z" />
        {/* Roller support right */}
        <circle cx="90" cy="68" r="2" />
        <path d="M85 70 L95 70" />
      </g>

      {/* Tension arrows on diagonals */}
      <g strokeWidth="0.5" opacity="0.4">
        <path d="M18 42 L22 52" />
        <path d="M22 52 L20 49 M22 52 L25 50" />
      </g>
    </g>
  </svg>
)

/**
 * HOWE TRUSS (1840) - Diagonals slope away from center
 * Designed by William Howe, originally for timber
 * Shows: Verticals + diagonals pointing outward (A pattern each panel)
 * Diagonals in COMPRESSION, verticals in TENSION (good for wood)
 */
export const HoweTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="howe-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#howe-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Support points */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 72 L95 72" />
      </g>

      {/* PRIMARY - Top and bottom chords */}
      <g strokeWidth="2.5">
        {/* Top chord */}
        <path d="M10 30 L90 30" />
        {/* Bottom chord */}
        <path d="M10 65 L90 65" />
      </g>

      {/* Vertical members (tension in Howe) */}
      <g strokeWidth="2">
        <path d="M10 30 L10 65" />
        <path d="M30 30 L30 65" />
        <path d="M50 30 L50 65" />
        <path d="M70 30 L70 65" />
        <path d="M90 30 L90 65" />
      </g>

      {/* HOWE DIAGONALS - Key feature: slope away from center (compression) */}
      <g strokeWidth="2">
        {/* Left side - diagonals point left/down away from center */}
        <path d="M30 30 L10 65" />
        <path d="M50 30 L30 65" />
        {/* Right side - diagonals point right/down away from center */}
        <path d="M70 30 L90 65" />
        <path d="M50 30 L70 65" />
      </g>

      {/* Joint plates */}
      <g strokeWidth="0.8" opacity="0.6">
        <circle cx="10" cy="30" r="2.5" />
        <circle cx="30" cy="30" r="2.5" />
        <circle cx="50" cy="30" r="2.5" />
        <circle cx="70" cy="30" r="2.5" />
        <circle cx="90" cy="30" r="2.5" />
        <circle cx="10" cy="65" r="2.5" />
        <circle cx="30" cy="65" r="2.5" />
        <circle cx="50" cy="65" r="2.5" />
        <circle cx="70" cy="65" r="2.5" />
        <circle cx="90" cy="65" r="2.5" />
      </g>

      {/* Support symbols */}
      <g strokeWidth="1.5">
        <path d="M5 68 L15 68 L10 65 Z" />
        <circle cx="90" cy="68" r="2" />
        <path d="M85 70 L95 70" />
      </g>

      {/* Compression arrows on diagonals */}
      <g strokeWidth="0.5" opacity="0.4">
        <path d="M22 42 L18 52" />
        <path d="M18 52 L20 49 M18 52 L15 50" />
      </g>
    </g>
  </svg>
)

/**
 * WARREN TRUSS (1848) - Equilateral triangles, no verticals
 * Designed by James Warren and Willoughby Monzani
 * Shows: Zigzag pattern of diagonals only, no vertical members
 * Alternating tension and compression in diagonals
 */
export const WarrenTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="warren-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#warren-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Support points */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 72 L95 72" />
      </g>

      {/* PRIMARY - Top and bottom chords */}
      <g strokeWidth="2.5">
        {/* Top chord */}
        <path d="M10 30 L90 30" />
        {/* Bottom chord */}
        <path d="M10 65 L90 65" />
      </g>

      {/* WARREN DIAGONALS - Key feature: NO VERTICALS, just zigzag */}
      <g strokeWidth="2.2">
        {/* Zigzag pattern creating equilateral triangles */}
        <path d="M10 65 L25 30" />
        <path d="M25 30 L40 65" />
        <path d="M40 65 L55 30" />
        <path d="M55 30 L70 65" />
        <path d="M70 65 L85 30" />
        <path d="M85 30 L90 47" />
        <path d="M10 47 L10 65" />
      </g>

      {/* End verticals only */}
      <g strokeWidth="2">
        <path d="M10 30 L10 65" />
        <path d="M90 30 L90 65" />
      </g>

      {/* Joint connections */}
      <g strokeWidth="0.8" opacity="0.6">
        <circle cx="10" cy="30" r="2.5" />
        <circle cx="25" cy="30" r="2.5" />
        <circle cx="55" cy="30" r="2.5" />
        <circle cx="85" cy="30" r="2.5" />
        <circle cx="90" cy="30" r="2.5" />
        <circle cx="10" cy="65" r="2.5" />
        <circle cx="40" cy="65" r="2.5" />
        <circle cx="70" cy="65" r="2.5" />
        <circle cx="90" cy="65" r="2.5" />
      </g>

      {/* Support symbols */}
      <g strokeWidth="1.5">
        <path d="M5 68 L15 68 L10 65 Z" />
        <circle cx="90" cy="68" r="2" />
        <path d="M85 70 L95 70" />
      </g>
    </g>
  </svg>
)

/**
 * FINK TRUSS (1854) - W-pattern web members
 * Designed by Albert Fink for railway bridges
 * Shows: W or M pattern of diagonals, efficient for long spans
 * Common in residential roof trusses today
 */
export const FinkTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="fink-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#fink-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Support points */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 80 L95 80" />
      </g>

      {/* PRIMARY - Pitched roof shape */}
      <g strokeWidth="2.5">
        {/* Bottom chord */}
        <path d="M10 70 L90 70" />
        {/* Left rafter */}
        <path d="M10 70 L50 25" />
        {/* Right rafter */}
        <path d="M90 70 L50 25" />
      </g>

      {/* FINK WEB PATTERN - Key feature: W-shaped subdivisions */}
      <g strokeWidth="2">
        {/* Left side W pattern */}
        <path d="M50 25 L25 70" />
        <path d="M25 70 L37.5 47" />
        <path d="M37.5 47 L17.5 70" />

        {/* Right side W pattern (mirrored) */}
        <path d="M50 25 L75 70" />
        <path d="M75 70 L62.5 47" />
        <path d="M62.5 47 L82.5 70" />
      </g>

      {/* Joint connections */}
      <g strokeWidth="0.8" opacity="0.6">
        <circle cx="50" cy="25" r="3" />
        <circle cx="10" cy="70" r="2.5" />
        <circle cx="25" cy="70" r="2" />
        <circle cx="37.5" cy="47" r="2" />
        <circle cx="62.5" cy="47" r="2" />
        <circle cx="75" cy="70" r="2" />
        <circle cx="90" cy="70" r="2.5" />
      </g>

      {/* Support symbols */}
      <g strokeWidth="1.5">
        <path d="M5 73 L15 73 L10 70 Z" />
        <circle cx="90" cy="73" r="2" />
        <path d="M85 75 L95 75" />
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
    <g filter={showHalo ? "url(#bowstring-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Support points */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 77 L95 77" />
      </g>

      {/* PRIMARY - Curved top chord (the "bow") */}
      <g strokeWidth="2.5">
        <path d="M10 65 Q50 15, 90 65" />
      </g>

      {/* Bottom chord (the "string" - in tension) */}
      <g strokeWidth="2.5">
        <path d="M10 65 L90 65" />
      </g>

      {/* Vertical web members */}
      <g strokeWidth="1.8">
        <path d="M25 65 L25 42" />
        <path d="M40 65 L40 28" />
        <path d="M50 65 L50 22" />
        <path d="M60 65 L60 28" />
        <path d="M75 65 L75 42" />
      </g>

      {/* Diagonal web members */}
      <g strokeWidth="1.5">
        <path d="M10 65 L25 42" />
        <path d="M25 42 L40 65" />
        <path d="M40 28 L50 65" />
        <path d="M50 22 L60 65" />
        <path d="M60 28 L75 65" />
        <path d="M75 42 L90 65" />
      </g>

      {/* Joint connections */}
      <g strokeWidth="0.8" opacity="0.6">
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
      <g strokeWidth="1.5">
        <path d="M5 70 L15 70 L10 65 Z" />
        <circle cx="90" cy="70" r="2" />
        <path d="M85 72 L95 72" />
      </g>

      {/* Tension indicator on bottom chord */}
      <g strokeWidth="0.5" opacity="0.4">
        <path d="M30 68 L70 68" strokeDasharray="3 2" />
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
    <g filter={showHalo ? "url(#vierendeel-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Support points */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 72 L95 72" />
      </g>

      {/* PRIMARY - Top and bottom chords (heavier for moment resistance) */}
      <g strokeWidth="3">
        {/* Top chord */}
        <path d="M10 30 L90 30" />
        {/* Bottom chord */}
        <path d="M10 65 L90 65" />
      </g>

      {/* VERTICAL MEMBERS ONLY - Key feature: no diagonals */}
      <g strokeWidth="2.5">
        <path d="M10 30 L10 65" />
        <path d="M30 30 L30 65" />
        <path d="M50 30 L50 65" />
        <path d="M70 30 L70 65" />
        <path d="M90 30 L90 65" />
      </g>

      {/* RIGID CORNER CONNECTIONS - Key feature: moment resisting joints */}
      <g strokeWidth="1.5" opacity="0.7">
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
      <g strokeDasharray="2 2" opacity="0.25" strokeWidth="0.5">
        <rect x="12" y="32" width="16" height="31" />
        <rect x="32" y="32" width="16" height="31" />
        <rect x="52" y="32" width="16" height="31" />
        <rect x="72" y="32" width="16" height="31" />
      </g>

      {/* Support symbols */}
      <g strokeWidth="1.5">
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
    <g filter={showHalo ? "url(#lattice-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Support points */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 72 L95 72" />
      </g>

      {/* PRIMARY - Top and bottom chords */}
      <g strokeWidth="2.5">
        {/* Top chord */}
        <path d="M8 30 L92 30" />
        {/* Bottom chord */}
        <path d="M8 65 L92 65" />
      </g>

      {/* LATTICE PATTERN - Key feature: dense overlapping diagonals */}
      <g strokeWidth="1.5">
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
      <g strokeWidth="2">
        <path d="M8 30 L8 65" />
        <path d="M92 30 L92 65" />
      </g>

      {/* Wooden peg connections (characteristic of Town lattice) */}
      <g strokeWidth="0.8" opacity="0.5">
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
      <g strokeWidth="1.5">
        <path d="M3 68 L13 68 L8 65 Z" />
        <circle cx="92" cy="68" r="2" />
        <path d="M87 70 L97 70" />
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
