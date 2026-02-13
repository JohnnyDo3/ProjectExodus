'use client'

import React from 'react'
import { HaloFilter, SVGProps } from './shared'

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

/**
 * BALTIMORE TRUSS - Subdivided Pratt truss for long spans
 * Adds intermediate diagonals to reduce unsupported member lengths
 * Shows: Pratt pattern with subdivided panels
 * Used for: Railroad bridges, long-span applications (1850s+)
 */
export const BaltimoreTrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="baltimore-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#baltimore-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Support points */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 72 L95 72" />
      </g>

      {/* PRIMARY - Main chords */}
      <g strokeWidth="2.5">
        {/* Top chord */}
        <path d="M8 25 L92 25" />
        {/* Bottom chord */}
        <path d="M8 68 L92 68" />
      </g>

      {/* MAIN VERTICALS - Full-height posts */}
      <g strokeWidth="2">
        <path d="M8 25 L8 68" />
        <path d="M29 25 L29 68" />
        <path d="M50 25 L50 68" />
        <path d="M71 25 L71 68" />
        <path d="M92 25 L92 68" />
      </g>

      {/* MAIN DIAGONALS - Pratt-style (tension diagonals) */}
      <g strokeWidth="2">
        <path d="M8 68 L29 25" />
        <path d="M29 68 L50 25" />
        <path d="M71 25 L50 68" />
        <path d="M92 25 L71 68" />
      </g>

      {/* SUB-VERTICALS - Key Baltimore feature: intermediate posts */}
      <g strokeWidth="1.5" opacity="0.8">
        <path d="M18.5 25 L18.5 46.5" />
        <path d="M39.5 25 L39.5 46.5" />
        <path d="M60.5 25 L60.5 46.5" />
        <path d="M81.5 25 L81.5 46.5" />
      </g>

      {/* SUB-DIAGONALS - Subdivide the panels */}
      <g strokeWidth="1.5" opacity="0.8">
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
      <g strokeWidth="1" opacity="0.6">
        <path d="M8 46.5 L92 46.5" />
      </g>

      {/* Support symbols */}
      <g strokeWidth="1.5">
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
    <g filter={showHalo ? "url(#scissors-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Support points */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 88 L95 88" />
      </g>

      {/* PRIMARY - Roof rafters (top chords) */}
      <g strokeWidth="2.5">
        {/* Left rafter */}
        <path d="M10 75 L50 20" />
        {/* Right rafter */}
        <path d="M90 75 L50 20" />
      </g>

      {/* SCISSORS MEMBERS - Key feature: crossing diagonal chords */}
      <g strokeWidth="2.5">
        {/* Left scissors member (from left support to right rafter) */}
        <path d="M10 75 L70 35" />
        {/* Right scissors member (from right support to left rafter) */}
        <path d="M90 75 L30 35" />
      </g>

      {/* Intersection point emphasis */}
      <circle cx="50" cy="55" r="3" strokeWidth="1.5" fill="currentColor" opacity="0.3" />

      {/* King post from apex (optional in some scissors trusses) */}
      <g strokeWidth="1.5" opacity="0.7">
        <path d="M50 20 L50 55" />
      </g>

      {/* Collar tie hint (horizontal member) */}
      <g strokeWidth="1.5" opacity="0.6">
        <path d="M30 35 L70 35" />
      </g>

      {/* Vaulted ceiling indicator (the visible effect from below) */}
      <g strokeDasharray="4 2" opacity="0.3" strokeWidth="0.8">
        <path d="M15 72 L50 50 L85 72" />
        <text x="50" y="65" fontSize="4" textAnchor="middle" fill="currentColor">VAULT</text>
      </g>

      {/* Support symbols */}
      <g strokeWidth="1.5">
        <path d="M5 78 L15 78 L10 75 Z" />
        <path d="M85 78 L95 78 L90 75 Z" />
      </g>

      {/* Ridge connection */}
      <g strokeWidth="1">
        <circle cx="50" cy="20" r="2" fill="currentColor" opacity="0.5" />
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
    <g filter={showHalo ? "url(#gambrel-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Support/wall line */}
      <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
        <path d="M5 88 L95 88" />
      </g>

      {/* PRIMARY - Bottom chord (tie beam) */}
      <g strokeWidth="2.5">
        <path d="M10 80 L90 80" />
      </g>

      {/* GAMBREL RAFTERS - Key feature: two slopes per side */}
      <g strokeWidth="2.5">
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
      <g strokeWidth="2">
        <path d="M25 50 L75 50" />
      </g>

      {/* Vertical posts at knees */}
      <g strokeWidth="2">
        <path d="M25 50 L25 80" />
        <path d="M75 50 L75 80" />
      </g>

      {/* King post from ridge */}
      <g strokeWidth="2">
        <path d="M50 25 L50 50" />
      </g>

      {/* Optional diagonal bracing in upper section */}
      <g strokeWidth="1.5" opacity="0.6">
        <path d="M25 50 L50 35" />
        <path d="M75 50 L50 35" />
      </g>

      {/* Loft space indication (the usable area gained) */}
      <g strokeDasharray="3 2" opacity="0.25" strokeWidth="0.6">
        <rect x="28" y="52" width="44" height="25" />
        <text x="50" y="67" fontSize="5" textAnchor="middle" fill="currentColor">LOFT</text>
      </g>

      {/* Support symbols */}
      <g strokeWidth="1.5">
        <path d="M5 83 L15 83 L10 80 Z" />
        <path d="M85 83 L95 83 L90 80 Z" />
      </g>

      {/* Ridge cap */}
      <g strokeWidth="1">
        <circle cx="50" cy="25" r="2" fill="currentColor" opacity="0.5" />
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
