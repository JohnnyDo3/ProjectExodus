'use client'

import React from 'react'
import { MaterialPatterns } from './materialPatterns'

// Shared Halo Filter for all column SVGs
const HaloFilter = () => (
  <defs>
    <filter id="col-halo" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="0 0 0 0 0.96
                0 0 0 0 0.62
                0 0 0 0 0.04
                0 0 0 0.8 0"
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

// ============================================================================
// DORIC COLUMN - Simplest Greek order, no base, 20 shallow flutes, plain capital
// Reference: Parthenon columns - stocky proportions (1:4-6), no base, simple capital
// ============================================================================
export const DoricColumnSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <MaterialPatterns />
    <HaloFilter />

    {/* CONTEXT: Ground line - refined dashed */}
    <path d="M 10 94 L 90 94" strokeWidth="0.7" fill="none" opacity="0.35" strokeDasharray="4 2" />
    <path d="M 15 96 L 85 96" strokeWidth="0.4" fill="none" opacity="0.2" strokeDasharray="2 1" />

    {/* CONTEXT: Entablature above - refined ghost */}
    <path d="M 20 8 L 80 8" strokeWidth="0.7" fill="none" opacity="0.25" strokeDasharray="3 2" />
    <path d="M 22 5 L 78 5" strokeWidth="0.5" fill="none" opacity="0.2" strokeDasharray="3 2" />

    {/* PRIMARY: THE DORIC COLUMN - STONE MATERIALITY */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* Stylobate platform - stone base with refined edges */}
      <path d="M 25 94 L 75 94" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 27 91 L 73 91" strokeWidth="1.1" fill="none" opacity="0.6" />
      <path d="M 26 93 L 74 93" strokeWidth="0.5" fill="none" opacity="0.3" />

      {/* Column shaft - NO BASE (key Doric feature) - stocky stone proportions */}
      <path d="M 30 91 Q 29 60, 32 25" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M 70 91 Q 71 60, 68 25" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Stone material texture on shaft */}
      <rect x="30" y="25" width="40" height="66" fill="url(#stone-smooth)" opacity="0.3" stroke="none" />

      {/* 20 shallow flutes with sharp arrises - crisp stone carving */}
      <path d="M 36 88 Q 37 55, 38 27" strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M 43 88 Q 43 55, 44 27" strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M 50 88 Q 50 55, 50 27" strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M 57 88 Q 57 55, 56 27" strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M 64 88 Q 63 55, 62 27" strokeWidth="0.7" fill="none" opacity="0.5" />

      {/* Shadow in deeper flutes */}
      <path d="M 36.5 88 Q 37 55, 37.5 27" strokeWidth="0.3" fill="none" opacity="0.25" />
      <path d="M 50.5 88 Q 50.5 55, 50.5 27" strokeWidth="0.3" fill="none" opacity="0.25" />
      <path d="M 63.5 88 Q 63 55, 62.5 27" strokeWidth="0.3" fill="none" opacity="0.25" />

      {/* Subtle entasis (slight convex curve) - refined */}
      <path d="M 31 65 Q 28 50, 31 35" strokeWidth="0.5" fill="none" opacity="0.25" />
      <path d="M 69 65 Q 72 50, 69 35" strokeWidth="0.5" fill="none" opacity="0.25" />

      {/* Chisel marks on stone */}
      <path d="M 33 52 L 35 53" strokeWidth="0.25" fill="none" opacity="0.2" />
      <path d="M 65 48 L 67 49" strokeWidth="0.25" fill="none" opacity="0.2" />

      {/* Necking rings below capital - carved bands */}
      <path d="M 33 25 L 67 25" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M 34 23 L 66 23" strokeWidth="0.9" fill="none" opacity="0.6" />
      <path d="M 33.5 24 L 66.5 24" strokeWidth="0.4" fill="none" opacity="0.3" />

      {/* Echinus - curved cushion shape with stone depth */}
      <path d="M 30 21 Q 38 17, 50 16 Q 62 17, 70 21" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 32 19 Q 40 16, 50 15.5 Q 60 16, 68 19" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 31 20 Q 39 16.5, 50 15.8 Q 61 16.5, 69 20" strokeWidth="0.4" fill="none" opacity="0.25" />
      {/* Shadow under echinus */}
      <path d="M 32 21.5 Q 40 20, 50 19.5 Q 60 20, 68 21.5" strokeWidth="0.5" fill="none" opacity="0.2" />

      {/* Abacus - plain square slab on top with refined stone edges */}
      <path d="M 26 14 L 74 14" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M 26 14 L 26 9" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 74 14 L 74 9" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 26 9 L 74 9" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* Stone thickness/depth */}
      <path d="M 26 13 L 74 13" strokeWidth="0.6" fill="none" opacity="0.3" />
      <path d="M 26 10 L 74 10" strokeWidth="0.6" fill="none" opacity="0.3" />

      {/* Weathering on abacus top */}
      <path d="M 35 11 L 38 11.5" strokeWidth="0.25" fill="none" opacity="0.2" />
      <path d="M 62 10.5 L 65 11" strokeWidth="0.25" fill="none" opacity="0.2" />
    </g>
  </svg>
)

// ============================================================================
// IONIC COLUMN - Volute scrolls on capital, has base, 24 deeper flutes
// Reference: Erechtheion columns - elegant proportions (1:9), ornate base, scroll volutes
// ============================================================================
export const IonicColumnSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <MaterialPatterns />
    <HaloFilter />

    {/* CONTEXT: Ground and entablature - refined dashed */}
    <path d="M 10 94 L 90 94" strokeWidth="0.7" fill="none" opacity="0.35" strokeDasharray="4 2" />
    <path d="M 14 5 L 86 5" strokeWidth="0.5" fill="none" opacity="0.25" strokeDasharray="3 2" />

    {/* PRIMARY: THE IONIC COLUMN */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* Elaborate Attic base (key Ionic feature - unlike Doric) */}
      <path d="M 22 94 L 78 94" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 25 91 L 75 91" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Upper torus */}
      <path d="M 27 88 Q 40 85, 50 85 Q 60 85, 73 88" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* Scotia (concave molding) */}
      <path d="M 29 85 Q 40 87, 50 87 Q 60 87, 71 85" strokeWidth="0.8" fill="none" opacity="0.5" />
      {/* Lower torus */}
      <path d="M 28 82 Q 40 79, 50 79 Q 60 79, 72 82" strokeWidth="1.4" fill="none" strokeLinecap="round" />

      {/* Slender shaft - more elegant than Doric - STONE MATERIAL */}
      <path d="M 32 79 Q 31 50, 35 26" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 68 79 Q 69 50, 65 26" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Stone material texture */}
      <rect x="32" y="26" width="36" height="53" fill="url(#stone-smooth)" opacity="0.25" stroke="none" />

      {/* 24 deeper flutes with flat fillets - refined stone carving */}
      <path d="M 38 76 Q 39 50, 40 28" strokeWidth="0.6" fill="none" opacity="0.5" />
      <path d="M 44 76 Q 44 50, 45 28" strokeWidth="0.6" fill="none" opacity="0.5" />
      <path d="M 50 76 Q 50 50, 50 28" strokeWidth="0.6" fill="none" opacity="0.5" />
      <path d="M 56 76 Q 56 50, 55 28" strokeWidth="0.6" fill="none" opacity="0.5" />
      <path d="M 62 76 Q 61 50, 60 28" strokeWidth="0.6" fill="none" opacity="0.5" />
      {/* Flute depth shadows */}
      <path d="M 38.3 76 Q 39 50, 39.7 28" strokeWidth="0.25" fill="none" opacity="0.2" />
      <path d="M 50.3 76 Q 50.3 50, 50.3 28" strokeWidth="0.25" fill="none" opacity="0.2" />

      {/* Necking with egg-and-dart molding */}
      <path d="M 36 26 L 64 26" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 38 24 Q 44 22, 50 22 Q 56 22, 62 24" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* THE VOLUTE SCROLLS - defining Ionic feature */}
      {/* Left volute - spiral scroll */}
      <path d="M 34 22 Q 28 20, 22 16 Q 16 12, 18 8 Q 20 4, 26 5 Q 30 6, 32 10 Q 33 13, 30 15"
            strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Inner spiral detail */}
      <path d="M 28 11 Q 25 10, 25 8 Q 25 6, 28 7" strokeWidth="0.9" fill="none" opacity="0.6" />

      {/* Right volute - spiral scroll */}
      <path d="M 66 22 Q 72 20, 78 16 Q 84 12, 82 8 Q 80 4, 74 5 Q 70 6, 68 10 Q 67 13, 70 15"
            strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Inner spiral detail */}
      <path d="M 72 11 Q 75 10, 75 8 Q 75 6, 72 7" strokeWidth="0.9" fill="none" opacity="0.6" />

      {/* Bolster connecting volutes */}
      <path d="M 32 18 Q 50 20, 68 18" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Thin abacus */}
      <path d="M 18 6 L 82 6" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// ============================================================================
// CORINTHIAN COLUMN - Ornate acanthus leaf capital, tallest proportions
// Reference: Temple of Olympian Zeus - most ornate order, acanthus leaves, small volutes
// ============================================================================
export const CorinthianColumnSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <MaterialPatterns />
    <HaloFilter />

    {/* CONTEXT: Ground and entablature - refined */}
    <path d="M 10 96 L 90 96" strokeWidth="0.7" fill="none" opacity="0.35" strokeDasharray="4 2" />
    <path d="M 18 4 L 82 4" strokeWidth="0.5" fill="none" opacity="0.25" strokeDasharray="3 2" />

    {/* PRIMARY: THE CORINTHIAN COLUMN - FINEST STONE */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* Elaborate base similar to Ionic */}
      <path d="M 24 96 L 76 96" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <path d="M 27 93 L 73 93" strokeWidth="1.1" fill="none" />
      <path d="M 29 90 Q 45 87, 50 87 Q 55 87, 71 90" strokeWidth="1.3" fill="none" />
      <path d="M 31 87 L 69 87" strokeWidth="0.9" fill="none" opacity="0.6" />

      {/* Tall slender shaft - tallest of all orders - MARBLE QUALITY */}
      <path d="M 34 87 Q 33 55, 37 36" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 66 87 Q 67 55, 63 36" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Fine marble texture */}
      <rect x="34" y="36" width="32" height="51" fill="url(#marble-veined)" opacity="0.2" stroke="none" />

      {/* Elegant fluting - precise stone carving */}
      <path d="M 40 84 Q 41 55, 42 38" strokeWidth="0.6" fill="none" opacity="0.45" />
      <path d="M 47 84 Q 47 55, 48 38" strokeWidth="0.6" fill="none" opacity="0.45" />
      <path d="M 53 84 Q 53 55, 52 38" strokeWidth="0.6" fill="none" opacity="0.45" />
      <path d="M 60 84 Q 59 55, 58 38" strokeWidth="0.6" fill="none" opacity="0.45" />
      {/* Flute shadows */}
      <path d="M 40.3 84 Q 41 55, 41.7 38" strokeWidth="0.25" fill="none" opacity="0.2" />
      <path d="M 53.3 84 Q 53.3 55, 52.7 38" strokeWidth="0.25" fill="none" opacity="0.2" />

      {/* ORNATE ACANTHUS CAPITAL - THE defining Corinthian feature */}
      {/* Lower row of acanthus leaves (8 around column) */}
      <path d="M 35 36 Q 28 30, 26 24 Q 24 20, 28 18" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M 39 36 Q 34 31, 32 26 Q 30 22, 33 20" strokeWidth="1" fill="none" opacity="0.8" />
      <path d="M 44 36 Q 42 32, 40 28 Q 38 24, 41 22" strokeWidth="1" fill="none" opacity="0.8" />
      <path d="M 50 36 Q 50 32, 50 28" strokeWidth="1" fill="none" opacity="0.8" />
      <path d="M 56 36 Q 58 32, 60 28 Q 62 24, 59 22" strokeWidth="1" fill="none" opacity="0.8" />
      <path d="M 61 36 Q 66 31, 68 26 Q 70 22, 67 20" strokeWidth="1" fill="none" opacity="0.8" />
      <path d="M 65 36 Q 72 30, 74 24 Q 76 20, 72 18" strokeWidth="1.3" fill="none" strokeLinecap="round" />

      {/* Upper row of smaller acanthus leaves */}
      <path d="M 37 26 Q 30 20, 28 14 Q 27 11, 30 10" strokeWidth="1.1" fill="none" />
      <path d="M 50 26 Q 50 20, 50 14" strokeWidth="1.1" fill="none" />
      <path d="M 63 26 Q 70 20, 72 14 Q 73 11, 70 10" strokeWidth="1.1" fill="none" />

      {/* Caulicoli - small scrolling stems emerging from leaves */}
      <path d="M 32 16 Q 26 12, 22 10 Q 20 8, 22 6" strokeWidth="0.9" fill="none" />
      <path d="M 68 16 Q 74 12, 78 10 Q 80 8, 78 6" strokeWidth="0.9" fill="none" />

      {/* Small volutes at corners (unlike Ionic, these are decorative) */}
      <path d="M 25 9 Q 23 7, 24 5" strokeWidth="0.8" fill="none" opacity="0.7" />
      <path d="M 75 9 Q 77 7, 76 5" strokeWidth="0.8" fill="none" opacity="0.7" />

      {/* Central flower/rosette at top (typical Corinthian feature) */}
      <circle cx="50" cy="9" r="3" strokeWidth="1.2" fill="none" />
      <path d="M 50 6 L 50 5" strokeWidth="0.8" fill="none" />
      <path d="M 47 8 L 46 7" strokeWidth="0.6" fill="none" opacity="0.6" />
      <path d="M 53 8 L 54 7" strokeWidth="0.6" fill="none" opacity="0.6" />

      {/* Abacus with concave sides */}
      <path d="M 20 5 Q 35 7, 50 5 Q 65 7, 80 5" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// ============================================================================
// COMPOSITE COLUMN - Roman innovation combining Ionic volutes + Corinthian acanthus
// Reference: Arch of Titus - Roman grandeur combining Greek elements
// ============================================================================
export const CompositeColumnSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Ground and entablature - dashed */}
    <path d="M 10 96 L 90 96" strokeWidth="0.8" fill="none" opacity="0.4" strokeDasharray="4 2" />
    <path d="M 14 4 L 86 4" strokeWidth="0.6" fill="none" opacity="0.3" strokeDasharray="3 2" />

    {/* PRIMARY: THE COMPOSITE COLUMN */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* Elaborate base */}
      <path d="M 24 96 L 76 96" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 28 92 Q 50 89, 72 92" strokeWidth="1.1" fill="none" />
      <path d="M 30 88 L 70 88" strokeWidth="0.9" fill="none" opacity="0.7" />

      {/* Shaft */}
      <path d="M 33 88 Q 32 55, 36 34" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M 67 88 Q 68 55, 64 34" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* Flutes */}
      <path d="M 42 84 Q 42 55, 43 36" strokeWidth="0.5" fill="none" opacity="0.4" />
      <path d="M 50 84 Q 50 55, 50 36" strokeWidth="0.5" fill="none" opacity="0.4" />
      <path d="M 58 84 Q 58 55, 57 36" strokeWidth="0.5" fill="none" opacity="0.4" />

      {/* COMPOSITE CAPITAL - combines Ionic + Corinthian */}
      {/* Lower acanthus leaves (from Corinthian) */}
      <path d="M 34 34 Q 26 28, 24 22" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 40 34 Q 36 29, 34 24" strokeWidth="0.9" fill="none" opacity="0.7" />
      <path d="M 50 34 Q 50 29, 50 24" strokeWidth="0.9" fill="none" opacity="0.7" />
      <path d="M 60 34 Q 64 29, 66 24" strokeWidth="0.9" fill="none" opacity="0.7" />
      <path d="M 66 34 Q 74 28, 76 22" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Egg-and-dart molding between leaves and volutes */}
      <path d="M 30 20 Q 42 18, 50 18 Q 58 18, 70 20" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* Large Ionic volutes at top (key composite feature - larger than Corinthian) */}
      <path d="M 28 18 Q 20 16, 16 12 Q 13 8, 16 5 Q 20 2, 26 4 Q 30 6, 30 10"
            strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M 72 18 Q 80 16, 84 12 Q 87 8, 84 5 Q 80 2, 74 4 Q 70 6, 70 10"
            strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* Inner spiral details */}
      <path d="M 23 7 Q 21 6, 21 4" strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M 77 7 Q 79 6, 79 4" strokeWidth="0.7" fill="none" opacity="0.5" />

      {/* Abacus */}
      <path d="M 16 5 L 84 5" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// ============================================================================
// TUSCAN COLUMN - Simplest Roman order, smooth shaft (no flutes), plain capital
// Reference: Roman vernacular architecture - practical, unadorned, sturdy
// ============================================================================
export const TuscanColumnSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Ground and entablature - dashed */}
    <path d="M 10 94 L 90 94" strokeWidth="0.8" fill="none" opacity="0.4" strokeDasharray="4 2" />
    <path d="M 22 8 L 78 8" strokeWidth="0.6" fill="none" opacity="0.3" strokeDasharray="3 2" />

    {/* PRIMARY: THE TUSCAN COLUMN */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* Simple base (unlike Doric, Tuscan has a base, but very plain) */}
      <path d="M 22 94 L 78 94" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 26 90 L 74 90" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M 28 86 L 72 86" strokeWidth="1.3" fill="none" strokeLinecap="round" />

      {/* SMOOTH shaft - NO FLUTES (key Tuscan feature) */}
      <path d="M 30 86 Q 29 55, 34 22" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M 70 86 Q 71 55, 66 22" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Just subtle shading lines to show roundness, no actual fluting */}
      <path d="M 36 82 Q 38 55, 40 26" strokeWidth="0.4" fill="none" opacity="0.2" />
      <path d="M 64 82 Q 62 55, 60 26" strokeWidth="0.4" fill="none" opacity="0.2" />

      {/* Simple necking */}
      <path d="M 35 22 L 65 22" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Plain round molding - very simple */}
      <path d="M 30 18 Q 40 15, 50 15 Q 60 15, 70 18" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* Plain square abacus - undecorated */}
      <path d="M 26 14 L 74 14" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 26 14 L 26 9" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M 74 14 L 74 9" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M 26 9 L 74 9" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// ============================================================================
// CARYATID - Female sculptural figure serving as architectural column support
// Reference: Erechtheion Porch of Maidens - draped female figures as columns
// ============================================================================
export const CaryatidSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Ground platform and entablature - dashed */}
    <path d="M 15 96 L 85 96" strokeWidth="0.8" fill="none" opacity="0.4" strokeDasharray="4 2" />
    <path d="M 25 93 L 75 93" strokeWidth="0.6" fill="none" opacity="0.3" strokeDasharray="3 2" />
    <path d="M 32 5 L 68 5" strokeWidth="0.6" fill="none" opacity="0.3" strokeDasharray="3 2" />

    {/* PRIMARY: THE CARYATID FIGURE */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* Pedestal base */}
      <path d="M 35 93 L 65 93" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 37 90 L 63 90" strokeWidth="1.2" fill="none" />

      {/* Feet on pedestal */}
      <path d="M 40 90 L 40 86" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 60 90 L 60 86" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Draped peplos/chiton - forms column-like body */}
      <path d="M 40 86 Q 37 70, 36 55 Q 35 48, 38 42" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M 60 86 Q 63 70, 64 55 Q 65 48, 62 42" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* Dress folds (like column fluting) */}
      <path d="M 44 84 Q 43 68, 42 50" strokeWidth="0.6" fill="none" opacity="0.45" />
      <path d="M 50 84 Q 50 68, 50 48" strokeWidth="0.6" fill="none" opacity="0.45" />
      <path d="M 56 84 Q 57 68, 58 50" strokeWidth="0.6" fill="none" opacity="0.45" />

      {/* Waist/belt (zone) */}
      <path d="M 38 42 Q 45 40, 50 40 Q 55 40, 62 42" strokeWidth="1.2" fill="none" />

      {/* Torso */}
      <path d="M 40 42 Q 42 36, 44 30" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M 60 42 Q 58 36, 56 30" strokeWidth="1.4" fill="none" strokeLinecap="round" />

      {/* Arms - slightly visible at sides */}
      <path d="M 42 36 Q 36 34, 32 30" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 58 36 Q 64 34, 68 30" strokeWidth="1" fill="none" opacity="0.6" />

      {/* Neck */}
      <path d="M 46 30 L 46 25" strokeWidth="1.2" fill="none" />
      <path d="M 54 30 L 54 25" strokeWidth="1.2" fill="none" />

      {/* Head - elegant oval */}
      <ellipse cx="50" cy="19" rx="7" ry="9" strokeWidth="1.6" fill="none" />

      {/* Face suggestion */}
      <path d="M 48 17 L 49 18" strokeWidth="0.5" fill="none" opacity="0.4" />
      <path d="M 51 17 L 52 18" strokeWidth="0.5" fill="none" opacity="0.4" />
      <path d="M 48 21 Q 50 22, 52 21" strokeWidth="0.5" fill="none" opacity="0.4" />

      {/* Elaborate hair/headdress */}
      <path d="M 43 17 Q 40 12, 43 9" strokeWidth="1" fill="none" />
      <path d="M 57 17 Q 60 12, 57 9" strokeWidth="1" fill="none" />
      <path d="M 45 10 Q 50 7, 55 10" strokeWidth="0.8" fill="none" />

      {/* Kalathos (basket capital) on head */}
      <path d="M 40 8 L 60 8" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 38 6 L 62 6" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// ============================================================================
// PILASTER - Flat, shallow pier attached to wall, column-like appearance
// Reference: Renaissance facades - decorative wall treatment, not structural
// ============================================================================
export const PilasterSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Wall behind pilaster - dashed ghost lines */}
    <path d="M 8 5 L 8 95" strokeWidth="0.7" fill="none" opacity="0.3" strokeDasharray="4 2" />
    <path d="M 92 5 L 92 95" strokeWidth="0.7" fill="none" opacity="0.3" strokeDasharray="4 2" />
    <path d="M 8 5 L 92 5" strokeWidth="0.6" fill="none" opacity="0.25" strokeDasharray="3 2" />
    <path d="M 8 95 L 92 95" strokeWidth="0.6" fill="none" opacity="0.25" strokeDasharray="3 2" />

    {/* Wall surface texture - very light dashed */}
    <path d="M 15 20 L 85 20" strokeWidth="0.4" fill="none" opacity="0.15" strokeDasharray="2 4" />
    <path d="M 15 40 L 28 40" strokeWidth="0.4" fill="none" opacity="0.15" strokeDasharray="2 4" />
    <path d="M 72 40 L 85 40" strokeWidth="0.4" fill="none" opacity="0.15" strokeDasharray="2 4" />
    <path d="M 15 60 L 28 60" strokeWidth="0.4" fill="none" opacity="0.15" strokeDasharray="2 4" />
    <path d="M 72 60 L 85 60" strokeWidth="0.4" fill="none" opacity="0.15" strokeDasharray="2 4" />
    <path d="M 15 80 L 85 80" strokeWidth="0.4" fill="none" opacity="0.15" strokeDasharray="2 4" />

    {/* PRIMARY: THE PILASTER */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* Pilaster base projecting from wall */}
      <path d="M 30 95 L 70 95" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 32 91 L 68 91" strokeWidth="1.3" fill="none" />
      <path d="M 34 87 L 66 87" strokeWidth="1.1" fill="none" />

      {/* FLAT shaft against wall (key pilaster feature) */}
      <path d="M 35 87 L 35 20" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 65 87 L 65 20" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Shallow relief fluting on flat surface */}
      <path d="M 42 84 L 42 23" strokeWidth="0.6" fill="none" opacity="0.4" />
      <path d="M 50 84 L 50 23" strokeWidth="0.6" fill="none" opacity="0.4" />
      <path d="M 58 84 L 58 23" strokeWidth="0.6" fill="none" opacity="0.4" />

      {/* Capital - Ionic style pilaster */}
      <path d="M 33 20 L 67 20" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 30 16 Q 45 14, 50 14 Q 55 14, 70 16" strokeWidth="1.2" fill="none" />

      {/* Small volutes */}
      <path d="M 28 14 Q 22 12, 20 9" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 72 14 Q 78 12, 80 9" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Abacus */}
      <path d="M 26 9 L 74 9" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 26 6 L 74 6" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// ============================================================================
// ENTASIS - Subtle convex curve in column shaft for optical correction
// Reference: Greek temples - counteracts optical illusion of concavity
// ============================================================================
export const EntasisSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Construction/measurement lines - dashed */}
    <path d="M 10 94 L 90 94" strokeWidth="0.8" fill="none" opacity="0.4" strokeDasharray="4 2" />
    <path d="M 22 7 L 78 7" strokeWidth="0.6" fill="none" opacity="0.3" strokeDasharray="3 2" />

    {/* Horizontal measurement lines showing entasis bulge - dashed */}
    <path d="M 22 30 L 78 30" strokeWidth="0.5" fill="none" opacity="0.35" strokeDasharray="3 2" />
    <path d="M 20 50 L 80 50" strokeWidth="0.5" fill="none" opacity="0.35" strokeDasharray="3 2" />
    <path d="M 22 70 L 78 70" strokeWidth="0.5" fill="none" opacity="0.35" strokeDasharray="3 2" />

    {/* Theoretical straight line for comparison - dashed */}
    <path d="M 32 90 L 36 15" strokeWidth="0.6" fill="none" opacity="0.25" strokeDasharray="2 2" />
    <path d="M 68 90 L 64 15" strokeWidth="0.6" fill="none" opacity="0.25" strokeDasharray="2 2" />

    {/* PRIMARY: Column showing ENTASIS curve */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* Base */}
      <path d="M 25 94 L 75 94" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 28 90 L 72 90" strokeWidth="1" fill="none" opacity="0.7" />

      {/* Left edge showing the entasis curve - THE KEY FEATURE */}
      {/* Curve is subtle: widest at about 1/3 height, then tapers to top */}
      <path d="M 30 90 Q 26 70, 24 50 Q 23 35, 28 20 L 32 15"
            strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Right edge showing the entasis curve */}
      <path d="M 70 90 Q 74 70, 76 50 Q 77 35, 72 20 L 68 15"
            strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Capital */}
      <path d="M 30 15 L 70 15" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M 26 11 L 74 11" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 24 8 L 76 8" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </g>

    {/* Arrows showing maximum bulge point - illustrative */}
    <g opacity="0.5">
      <path d="M 16 50 L 23 50" strokeWidth="0.8" fill="none" />
      <path d="M 16 50 L 18 48" strokeWidth="0.6" fill="none" />
      <path d="M 16 50 L 18 52" strokeWidth="0.6" fill="none" />

      <path d="M 84 50 L 77 50" strokeWidth="0.8" fill="none" />
      <path d="M 84 50 L 82 48" strokeWidth="0.6" fill="none" />
      <path d="M 84 50 L 82 52" strokeWidth="0.6" fill="none" />
    </g>
  </svg>
)

// Export mapping for easy lookup
export const COLUMN_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'doric-column': DoricColumnSVG,
  'ionic-column': IonicColumnSVG,
  'corinthian-column': CorinthianColumnSVG,
  'composite-column': CompositeColumnSVG,
  'tuscan-column': TuscanColumnSVG,
  'caryatid': CaryatidSVG,
  'pilaster': PilasterSVG,
  'entasis': EntasisSVG,
}
