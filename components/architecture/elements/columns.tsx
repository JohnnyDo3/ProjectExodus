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

    {/* CONTEXT: COMPLETE GREEK TEMPLE PERISTYLE - field sketch extending off-page */}

    {/* CEILING: Temple roof structure extending beyond frame */}
    <g opacity="0.2" strokeDasharray="2 3" strokeWidth="0.5">
      {/* Roof beams/rafters visible from below */}
      <path d="M -10 -5 L 110 -5" fill="none" opacity="0.6" />
      <path d="M 0 2 L 100 2" fill="none" />
      <path d="M 10 5 L 90 5" fill="none" opacity="0.7" />
    </g>

    {/* COMPLETE ENTABLATURE: Extending horizontally beyond frame */}
    <g opacity="0.22" strokeWidth="0.6" strokeDasharray="3 2">
      {/* Cornice extending off-page left and right */}
      <path d="M -10 3 L 110 3" strokeWidth="0.7" fill="none" />
      <path d="M -8 4.5 L 108 4.5" strokeWidth="0.5" opacity="0.7" />
      {/* Triglyphs and metopes in frieze (Doric feature) */}
      <rect x="15" y="5.5" width="3" height="2" opacity="0.4" fill="currentColor" stroke="none" />
      <rect x="35" y="5.5" width="3" height="2" opacity="0.4" fill="currentColor" stroke="none" />
      <rect x="62" y="5.5" width="3" height="2" opacity="0.4" fill="currentColor" stroke="none" />
      <rect x="82" y="5.5" width="3" height="2" opacity="0.4" fill="currentColor" stroke="none" />
      {/* Architrave */}
      <path d="M -5 8 L 105 8" strokeDasharray="4 2" opacity="0.8" />
      <path d="M 0 10 L 100 10" strokeDasharray="3 2" opacity="0.6" />
    </g>

    {/* TEMPLE COLONNADE: Doric columns extending in BOTH directions (perspective) */}
    <g opacity="0.18" strokeDasharray="2 2" strokeWidth="0.6">
      {/* Columns receding to left */}
      <path d="M -15 94 Q -16 60, -12 25" fill="none" />
      <path d="M -8 94 Q -9 60, -6 25" fill="none" opacity="0.7" />
      {/* Simple echinus capitals on left columns */}
      <path d="M -14 22 Q -10 20, -7 22" strokeWidth="0.5" opacity="0.6" />

      {/* Next column to left (closer) */}
      <path d="M 5 94 Q 4 60, 6 25" fill="none" />
      <path d="M 8 94 Q 9 60, 7 25" fill="none" opacity="0.7" />
      <path d="M 4 22 Q 6.5 20, 9 22" strokeWidth="0.5" opacity="0.6" />

      {/* Columns receding to right */}
      <path d="M 92 94 Q 91 60, 94 25" fill="none" opacity="0.7" />
      <path d="M 95 94 Q 96 60, 93 25" fill="none" />
      <path d="M 91 22 Q 93.5 20, 96 22" strokeWidth="0.5" opacity="0.6" />

      {/* Further right column */}
      <path d="M 108 94 Q 109 60, 106 25" fill="none" opacity="0.7" />
      <path d="M 115 94 Q 116 60, 112 25" fill="none" />
      <path d="M 107 22 Q 109 20, 113 22" strokeWidth="0.5" opacity="0.6" />
    </g>

    {/* STYLOBATE PLATFORM: Three-stepped crepidoma extending off-page horizontally */}
    <g opacity="0.25" strokeDasharray="3 2" strokeWidth="0.7">
      {/* Top step (stylobate) - extends beyond frame */}
      <path d="M -10 94 L 110 94" fill="none" />
      <path d="M -8 95 L 108 95" strokeWidth="0.5" opacity="0.7" />
      {/* Second step */}
      <path d="M -10 97 L 110 97" strokeWidth="0.6" opacity="0.8" />
      {/* Third step (base) */}
      <path d="M -10 99 L 110 99" strokeWidth="0.6" opacity="0.6" />
      {/* Stone joints in platform */}
      <path d="M -5 93 L -5 100" strokeDasharray="2 1" strokeWidth="0.4" opacity="0.5" />
      <path d="M 20 93 L 20 100" strokeDasharray="2 1" strokeWidth="0.4" opacity="0.5" />
      <path d="M 50 93 L 50 100" strokeDasharray="2 1" strokeWidth="0.4" opacity="0.5" />
      <path d="M 80 93 L 80 100" strokeDasharray="2 1" strokeWidth="0.4" opacity="0.5" />
      <path d="M 105 93 L 105 100" strokeDasharray="2 1" strokeWidth="0.4" opacity="0.5" />
    </g>

    {/* MARBLE FLOOR: White Pentelic marble extending beyond */}
    <g opacity="0.2" strokeWidth="0.3">
      <rect x="-10" y="92" width="120" height="18" fill="url(#marble-veined)" opacity="0.15" stroke="none" />
      {/* Floor paving joints extending off-page */}
      <path d="M -10 96 L 110 96" strokeDasharray="5 3" />
      <path d="M -10 101 L 110 101" strokeDasharray="4 2" opacity="0.6" />
      <path d="M 30 93 L 30 110" strokeDasharray="2 1.5" opacity="0.5" />
      <path d="M 70 93 L 70 110" strokeDasharray="2 1.5" opacity="0.5" />
    </g>

    {/* CELLA WALL: Temple sanctuary wall behind colonnade */}
    <g opacity="0.15" strokeWidth="0.4" strokeDasharray="3 2.5">
      {/* Wall extending vertically beyond frame */}
      <rect x="15" y="-5" width="70" height="120" fill="url(#stone-smooth)" opacity="0.08" stroke="none" />
      <path d="M 20 -5 L 20 110" />
      <path d="M 80 -5 L 80 110" />
      {/* Stone courses */}
      <path d="M 20 20 L 80 20" strokeWidth="0.3" opacity="0.5" />
      <path d="M 20 45 L 80 45" strokeWidth="0.3" opacity="0.5" />
      <path d="M 20 70 L 80 70" strokeWidth="0.3" opacity="0.5" />
    </g>

    {/* SHADOW cast by column on marble floor */}
    <g opacity="0.1" strokeWidth="0.25" strokeDasharray="1 1">
      <path d="M 72 94 Q 75 96, 78 98" />
      <path d="M 73 96 Q 76 98, 79 100" />
    </g>

    {/* PRIMARY: THE DORIC COLUMN - BOLD FIELD SKETCH LINES */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* BOLD Stylobate platform under this column */}
      <path d="M 22 94 L 78 94" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 24 91 L 76 91" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M 23 93 L 77 93" strokeWidth="1" fill="none" opacity="0.3" />

      {/* BOLD Column shaft edges - NO BASE (key Doric feature) */}
      {/* Left edge */}
      <path d="M 26 91 Q 28 60, 36 25" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Right edge */}
      <path d="M 74 91 Q 72 60, 64 25" strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* Stone material texture on shaft */}
      <path d="M 28 85 Q 30 70, 38 50 Q 40 35, 38 27" strokeWidth="0.3" opacity="0.2" fill="none" />
      <path d="M 72 85 Q 70 70, 62 50 Q 60 35, 62 27" strokeWidth="0.3" opacity="0.2" fill="none" />

      {/* 20 shallow flutes (Doric characteristic) */}
      <path d="M 32 88 Q 34 55, 40 27" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M 38 88 Q 40 55, 44 27" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M 44 88 Q 46 55, 48 27" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M 50 88 Q 50 55, 50 27" strokeWidth="0.9" fill="none" opacity="0.5" />
      <path d="M 56 88 Q 54 55, 52 27" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M 62 88 Q 60 55, 56 27" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M 68 88 Q 66 55, 60 27" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* Flute depth shadows */}
      <path d="M 32.5 88 Q 34.5 55, 40.5 27" strokeWidth="0.4" fill="none" opacity="0.25" />
      <path d="M 50.5 88 Q 50.5 55, 50.5 27" strokeWidth="0.4" fill="none" opacity="0.25" />
      <path d="M 67.5 88 Q 65.5 55, 59.5 27" strokeWidth="0.4" fill="none" opacity="0.25" />

      {/* Subtle entasis (convex curve) */}
      <path d="M 28 65 Q 27 50, 32 35" strokeWidth="0.6" fill="none" opacity="0.25" />
      <path d="M 72 65 Q 73 50, 68 35" strokeWidth="0.6" fill="none" opacity="0.25" />

      {/* Chisel marks on stone */}
      <path d="M 30 52 L 32 53" strokeWidth="0.3" fill="none" opacity="0.2" />
      <path d="M 68 48 L 70 49" strokeWidth="0.3" fill="none" opacity="0.2" />

      {/* BOLD Necking rings below capital */}
      <path d="M 37 25 L 63 25" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M 38 23.5 L 62 23.5" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M 37.5 24 L 62.5 24" strokeWidth="0.8" fill="none" opacity="0.3" />

      {/* BOLD Echinus - curved cushion capital (defining Doric feature) */}
      <path d="M 35 21 Q 42 18, 50 17.5 Q 58 18, 65 21" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M 36 19.5 Q 43 17.5, 50 17 Q 57 17.5, 64 19.5" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M 35.5 20 Q 42.5 17.8, 50 17.3 Q 57.5 17.8, 64.5 20" strokeWidth="0.8" fill="none" opacity="0.25" />
      {/* Shadow under echinus */}
      <path d="M 36 21.5 Q 43 20.5, 50 20 Q 57 20.5, 64 21.5" strokeWidth="0.6" fill="none" opacity="0.2" />

      {/* BOLD Abacus - square slab (plain Doric style) */}
      <path d="M 33 14 L 67 14" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M 33 14 L 33 10" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 67 14 L 67 10" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 33 10 L 67 10" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      {/* Stone thickness */}
      <path d="M 33 13.2 L 67 13.2" strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M 33 10.8 L 67 10.8" strokeWidth="0.8" fill="none" opacity="0.3" />

      {/* Weathering on abacus */}
      <path d="M 40 11.5 L 43 12" strokeWidth="0.3" fill="none" opacity="0.2" />
      <path d="M 57 11.5 L 60 12" strokeWidth="0.3" fill="none" opacity="0.2" />
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

    {/* CONTEXT: COMPLETE ERECHTHEION ON THE ACROPOLIS - field sketch off-page */}

    {/* CEILING: Refined coffered ceiling extending beyond */}
    <g opacity="0.2" strokeDasharray="2 3" strokeWidth="0.4">
      {/* Delicate coffers receding */}
      <path d="M -10 -2 L 110 -2" fill="none" opacity="0.6" />
      <rect x="10" y="2" width="15" height="2" opacity="0.3" fill="none" stroke="currentColor" strokeWidth="0.4" />
      <rect x="35" y="2" width="15" height="2" opacity="0.3" fill="none" stroke="currentColor" strokeWidth="0.4" />
      <rect x="60" y="2" width="15" height="2" opacity="0.3" fill="none" stroke="currentColor" strokeWidth="0.4" />
    </g>

    {/* COMPLETE ENTABLATURE: Ionic refinement with dentils extending off-page */}
    <g opacity="0.22" strokeWidth="0.5" strokeDasharray="3 2">
      {/* Cornice extending horizontally */}
      <path d="M -10 3 L 110 3" strokeWidth="0.6" fill="none" />
      {/* DENTILS - tooth-like blocks (signature Ionic feature) extending off-page */}
      <path d="M -10 6 L 110 6" strokeDasharray="1.5 1" strokeWidth="0.7" />
      <rect x="-8" y="5.5" width="1.2" height="1" opacity="0.4" fill="currentColor" stroke="none" />
      <rect x="5" y="5.5" width="1.2" height="1" opacity="0.4" fill="currentColor" stroke="none" />
      <rect x="18" y="5.5" width="1.2" height="1" opacity="0.4" fill="currentColor" stroke="none" />
      <rect x="31" y="5.5" width="1.2" height="1" opacity="0.4" fill="currentColor" stroke="none" />
      <rect x="44" y="5.5" width="1.2" height="1" opacity="0.4" fill="currentColor" stroke="none" />
      <rect x="57" y="5.5" width="1.2" height="1" opacity="0.4" fill="currentColor" stroke="none" />
      <rect x="70" y="5.5" width="1.2" height="1" opacity="0.4" fill="currentColor" stroke="none" />
      <rect x="83" y="5.5" width="1.2" height="1" opacity="0.4" fill="currentColor" stroke="none" />
      <rect x="96" y="5.5" width="1.2" height="1" opacity="0.4" fill="currentColor" stroke="none" />
      {/* Architrave */}
      <path d="M -5 8 L 105 8" strokeDasharray="4 2" opacity="0.8" />
      <path d="M 0 10 L 100 10" strokeDasharray="3 2" opacity="0.6" />
    </g>

    {/* ELEGANT COLONNADE: Ionic columns with volutes extending in BOTH directions */}
    <g opacity="0.18" strokeDasharray="2 2" strokeWidth="0.6">
      {/* Columns to left with visible volutes */}
      <path d="M -12 94 Q -13 60, -10 26" fill="none" />
      <path d="M -6 94 Q -7 60, -5 26" fill="none" opacity="0.7" />
      {/* Volute scrolls on left columns */}
      <circle cx="-8" cy="18" r="2.5" fill="none" opacity="0.5" />
      <path d="M -10 16 Q -12 14, -11 12" strokeWidth="0.5" opacity="0.6" />

      {/* Next column to left (closer) */}
      <path d="M 8 94 Q 7 60, 9 26" fill="none" />
      <path d="M 11 94 Q 12 60, 10 26" fill="none" opacity="0.7" />
      <circle cx="9" cy="18" r="2.5" fill="none" opacity="0.5" />
      <path d="M 7 16 Q 5 14, 6 12" strokeWidth="0.5" opacity="0.6" />

      {/* Columns to right */}
      <path d="M 89 94 Q 88 60, 91 26" fill="none" opacity="0.7" />
      <path d="M 92 94 Q 93 60, 90 26" fill="none" />
      <circle cx="91" cy="18" r="2.5" fill="none" opacity="0.5" />
      <path d="M 93 16 Q 95 14, 94 12" strokeWidth="0.5" opacity="0.6" />

      {/* Further right */}
      <path d="M 106 94 Q 107 60, 105 26" fill="none" opacity="0.7" />
      <path d="M 112 94 Q 113 60, 110 26" fill="none" />
      <circle cx="108" cy="18" r="2.5" fill="none" opacity="0.5" />
      <path d="M 110 16 Q 112 14, 111 12" strokeWidth="0.5" opacity="0.6" />
    </g>

    {/* STYLOBATE: Refined platform extending off-page */}
    <g opacity="0.25" strokeDasharray="3 2" strokeWidth="0.6">
      <path d="M -10 94 L 110 94" fill="none" />
      <path d="M -10 96 L 110 96" strokeWidth="0.5" opacity="0.8" />
      <path d="M -10 98 L 110 98" strokeWidth="0.5" opacity="0.6" />
      {/* Marble joints */}
      <path d="M 0 93 L 0 100" strokeDasharray="2 1" strokeWidth="0.4" opacity="0.5" />
      <path d="M 25 93 L 25 100" strokeDasharray="2 1" strokeWidth="0.4" opacity="0.5" />
      <path d="M 50 93 L 50 100" strokeDasharray="2 1" strokeWidth="0.4" opacity="0.5" />
      <path d="M 75 93 L 75 100" strokeDasharray="2 1" strokeWidth="0.4" opacity="0.5" />
      <path d="M 100 93 L 100 100" strokeDasharray="2 1" strokeWidth="0.4" opacity="0.5" />
    </g>

    {/* WHITE PENTELIC MARBLE FLOOR: Acropolis platform extending beyond */}
    <g opacity="0.2" strokeWidth="0.3">
      <rect x="-10" y="92" width="120" height="18" fill="url(#marble-veined)" opacity="0.18" stroke="none" />
      {/* Refined marble paving extending off-page */}
      <path d="M -10 94 L 110 94" strokeDasharray="5 3" />
      <path d="M -10 96 L 110 96" strokeDasharray="3 2" opacity="0.6" />
      <path d="M -10 101 L 110 101" strokeDasharray="4 2" opacity="0.5" />
      <path d="M 35 93 L 35 110" strokeDasharray="2 1.5" opacity="0.5" />
      <path d="M 65 93 L 65 110" strokeDasharray="2 1.5" opacity="0.5" />
    </g>

    {/* CELLA WALL: Temple sanctuary behind with marble */}
    <g opacity="0.15" strokeWidth="0.4" strokeDasharray="3 2.5">
      <rect x="15" y="-5" width="70" height="120" fill="url(#marble-veined)" opacity="0.08" stroke="none" />
      {/* Walls extending vertically beyond frame */}
      <path d="M 20 -5 L 20 110" />
      <path d="M 80 -5 L 80 110" />
      {/* Refined stone courses */}
      <path d="M 20 25 L 80 25" strokeWidth="0.3" opacity="0.5" />
      <path d="M 20 50 L 80 50" strokeWidth="0.3" opacity="0.5" />
      <path d="M 20 75 L 80 75" strokeWidth="0.3" opacity="0.5" />
    </g>

    {/* SHADOW on pristine marble */}
    <g opacity="0.1" strokeWidth="0.25" strokeDasharray="1 1">
      <path d="M 70 94 Q 73 96, 76 98" />
      <path d="M 71 96 Q 74 98, 77 100" />
    </g>

    {/* PRIMARY: THE IONIC COLUMN - BOLD FIELD SKETCH LINES */}
    <g filter={showHalo ? "url(#col-halo)" : undefined}>
      {/* BOLD Elaborate Attic base (key Ionic feature - has base unlike Doric) */}
      <path d="M 22 94 L 78 94" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 25 91 L 75 91" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* Upper torus molding */}
      <path d="M 27 88 Q 40 85, 50 85 Q 60 85, 73 88" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      {/* Scotia (concave molding) */}
      <path d="M 29 85 Q 40 87, 50 87 Q 60 87, 71 85" strokeWidth="1.5" fill="none" opacity="0.5" />
      {/* Lower torus */}
      <path d="M 28 82 Q 40 79, 50 79 Q 60 79, 72 82" strokeWidth="2.8" fill="none" strokeLinecap="round" />

      {/* BOLD Slender shaft - elegant Ionic proportions (1:9) - WHITE PENTELIC MARBLE */}
      <path d="M 32 79 Q 31 50, 35 26" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M 68 79 Q 69 50, 65 26" strokeWidth="3.2" fill="none" strokeLinecap="round" />

      {/* Pentelic marble veining (from Mt. Pentelicus for Erechtheion) */}
      <rect x="32" y="26" width="36" height="53" fill="url(#marble-veined)" opacity="0.22" stroke="none" />
      {/* Marble veins through shaft */}
      <path d="M 35 75 Q 37 60, 38 45 Q 36 32, 37 28" strokeWidth="0.3" opacity="0.15" fill="none" />
      <path d="M 63 72 Q 61 55, 62 40 Q 64 30, 63 27" strokeWidth="0.3" opacity="0.15" fill="none" />

      {/* 24 deeper flutes with flat fillets (Ionic vs Doric's 20 shallow) */}
      <path d="M 38 76 Q 39 50, 40 28" strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M 44 76 Q 44 50, 45 28" strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M 50 76 Q 50 50, 50 28" strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M 56 76 Q 56 50, 55 28" strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M 62 76 Q 61 50, 60 28" strokeWidth="0.7" fill="none" opacity="0.5" />
      {/* Flute shadows */}
      <path d="M 38.3 76 Q 39 50, 39.7 28" strokeWidth="0.35" fill="none" opacity="0.2" />
      <path d="M 50.3 76 Q 50.3 50, 50.3 28" strokeWidth="0.35" fill="none" opacity="0.2" />

      {/* BOLD Necking with egg-and-dart molding */}
      <path d="M 36 26 L 64 26" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M 38 24 Q 44 22, 50 22 Q 56 22, 62 24" strokeWidth="1.5" fill="none" opacity="0.5" />

      {/* BOLD VOLUTE SCROLLS - THE defining Ionic feature */}
      {/* Left volute - elegant spiral scroll */}
      <path d="M 34 22 Q 28 20, 22 16 Q 16 12, 18 8 Q 20 4, 26 5 Q 30 6, 32 10 Q 33 13, 30 15"
            strokeWidth="3.2" fill="none" strokeLinecap="round" />
      {/* Inner spiral detail */}
      <path d="M 28 11 Q 25 10, 25 8 Q 25 6, 28 7" strokeWidth="1.8" fill="none" opacity="0.6" />
      {/* Eye of volute */}
      <circle cx="26" cy="8" r="1" strokeWidth="0.6" fill="none" opacity="0.4" />

      {/* Right volute - mirror spiral */}
      <path d="M 66 22 Q 72 20, 78 16 Q 84 12, 82 8 Q 80 4, 74 5 Q 70 6, 68 10 Q 67 13, 70 15"
            strokeWidth="3.2" fill="none" strokeLinecap="round" />
      {/* Inner spiral detail */}
      <path d="M 72 11 Q 75 10, 75 8 Q 75 6, 72 7" strokeWidth="1.8" fill="none" opacity="0.6" />
      {/* Eye of volute */}
      <circle cx="74" cy="8" r="1" strokeWidth="0.6" fill="none" opacity="0.4" />

      {/* Bolster connecting volutes */}
      <path d="M 32 18 Q 50 20, 68 18" strokeWidth="2" fill="none" opacity="0.5" />

      {/* BOLD Thin abacus (thinner than Doric) */}
      <path d="M 18 6 L 82 6" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 18 4 L 82 4" strokeWidth="2" fill="none" opacity="0.5" />
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

    {/* CONTEXT: Temple colonnade with entablature and stylobate */}
    <g opacity="0.3" strokeDasharray="4 2" fill="none">
      {/* Entablature above */}
      <path d="M 0 2 L 100 2" strokeWidth="1" />
      <path d="M 5 4 L 95 4" strokeWidth="0.7" />
      {/* Frieze with relief hint */}
      <path d="M 8 6 L 92 6" strokeWidth="0.5" />
      {/* Stylobate / ground platform */}
      <path d="M 0 96 L 100 96" strokeWidth="0.8" />
      <path d="M 2 98 L 98 98" strokeWidth="0.6" />
      <path d="M 4 100 L 96 100" strokeWidth="0.5" />
      {/* Adjacent column shafts (colonnade receding) */}
      <path d="M 5 92 Q 4 55, 8 20" strokeWidth="0.5" />
      <path d="M 12 92 Q 11 55, 14 20" strokeWidth="0.5" />
      <path d="M 88 92 Q 89 55, 86 20" strokeWidth="0.5" />
      <path d="M 95 92 Q 96 55, 92 20" strokeWidth="0.5" />
    </g>

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

    {/* CONTEXT: Roman triumphal arch arcade */}
    <g opacity="0.3" strokeDasharray="4 2" fill="none">
      {/* Arch springing from capital */}
      <path d="M 0 4 L 100 4" strokeWidth="0.8" />
      <path d="M 5 8 Q 50 -5, 95 8" strokeWidth="0.6" />
      {/* Pier/wall behind column */}
      <path d="M 10 96 L 10 8" strokeWidth="0.5" />
      <path d="M 90 96 L 90 8" strokeWidth="0.5" />
      {/* Pavement */}
      <path d="M 0 96 L 100 96" strokeWidth="0.8" />
      <path d="M 0 99 L 100 99" strokeWidth="0.5" />
      {/* Adjacent column hint */}
      <path d="M 2 92 Q 2 55, 5 20" strokeWidth="0.4" />
      <path d="M 98 92 Q 98 55, 95 20" strokeWidth="0.4" />
    </g>

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

    {/* CONTEXT: Roman farmhouse portico */}
    <g opacity="0.3" strokeDasharray="4 2" fill="none">
      {/* Entablature (plain, no ornament — Tuscan simplicity) */}
      <path d="M 0 4 L 100 4" strokeWidth="1" />
      <path d="M 2 8 L 98 8" strokeWidth="0.6" />
      {/* Ground level */}
      <path d="M 0 94 L 100 94" strokeWidth="0.8" />
      <path d="M 0 97 L 100 97" strokeWidth="0.5" />
      {/* Wall behind portico */}
      <path d="M 0 8 L 0 94" strokeWidth="0.5" />
      <path d="M 100 8 L 100 94" strokeWidth="0.5" />
      {/* Door opening in wall */}
      <path d="M 40 94 L 40 55 L 60 55 L 60 94" strokeWidth="0.4" />
      {/* Adjacent column */}
      <path d="M 4 90 Q 3 55, 6 18" strokeWidth="0.4" />
      <path d="M 96 90 Q 97 55, 94 18" strokeWidth="0.4" />
    </g>

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

    {/* CONTEXT: Erechtheion Porch of the Maidens */}
    <g opacity="0.3" strokeDasharray="4 2" fill="none">
      {/* Entablature above all caryatids */}
      <path d="M 0 3 L 100 3" strokeWidth="1" />
      <path d="M 2 5 L 98 5" strokeWidth="0.7" />
      {/* Stepped platform */}
      <path d="M 5 96 L 95 96" strokeWidth="0.8" />
      <path d="M 8 93 L 92 93" strokeWidth="0.6" />
      <path d="M 3 99 L 97 99" strokeWidth="0.5" />
      {/* Neighboring caryatid figure hints (left and right) */}
      <path d="M 8 90 Q 6 60, 10 30" strokeWidth="0.5" />
      <path d="M 16 90 Q 14 60, 16 30" strokeWidth="0.5" />
      <path d="M 12 18 Q 14 12, 12 8" strokeWidth="0.4" />
      <path d="M 84 90 Q 86 60, 84 30" strokeWidth="0.5" />
      <path d="M 92 90 Q 94 60, 92 30" strokeWidth="0.5" />
      <path d="M 88 18 Q 86 12, 88 8" strokeWidth="0.4" />
      {/* Temple cella wall behind */}
      <path d="M 100 5 L 100 96" strokeWidth="0.4" />
    </g>

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

    {/* CONTEXT: Renaissance facade wall - extends off-page */}
    <g opacity="0.3" strokeDasharray="3 2">
      {/* Wall boundary extending beyond frame */}
      <path d="M -5 2 L 105 2" strokeWidth="0.7" fill="none" />
      <path d="M -5 98 L 105 98" strokeWidth="0.7" fill="none" />
      <path d="M -5 2 L -5 98" strokeWidth="0.7" fill="none" />
      <path d="M 105 2 L 105 98" strokeWidth="0.7" fill="none" />

      {/* Cornice/entablature above */}
      <path d="M -5 3 L 105 3" strokeWidth="0.8" fill="none" />
      <path d="M -5 5 L 105 5" strokeWidth="0.5" fill="none" />

      {/* Stone coursing on wall surface */}
      <path d="M -5 20 L 28 20" strokeWidth="0.4" fill="none" opacity="0.6" />
      <path d="M 72 20 L 105 20" strokeWidth="0.4" fill="none" opacity="0.6" />
      <path d="M -5 40 L 28 40" strokeWidth="0.4" fill="none" opacity="0.6" />
      <path d="M 72 40 L 105 40" strokeWidth="0.4" fill="none" opacity="0.6" />
      <path d="M -5 60 L 28 60" strokeWidth="0.4" fill="none" opacity="0.6" />
      <path d="M 72 60 L 105 60" strokeWidth="0.4" fill="none" opacity="0.6" />
      <path d="M -5 80 L 28 80" strokeWidth="0.4" fill="none" opacity="0.6" />
      <path d="M 72 80 L 105 80" strokeWidth="0.4" fill="none" opacity="0.6" />

      {/* Adjacent pilaster hints on left and right */}
      <path d="M -2 95 L -2 8" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 5 95 L 5 8" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 95 95 L 95 8" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 102 95 L 102 8" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Window opening between pilasters on left side */}
      <path d="M -8 35 L -8 70 L 2 70 L 2 35 Z" strokeWidth="0.5" fill="none" opacity="0.5" />
      {/* Window opening between pilasters on right side */}
      <path d="M 98 35 L 98 70 L 108 70 L 108 35 Z" strokeWidth="0.5" fill="none" opacity="0.5" />

      {/* Floor/base course */}
      <path d="M -5 95 L 105 95" strokeWidth="0.6" fill="none" />
      <path d="M -5 97 L 105 97" strokeWidth="0.5" fill="none" opacity="0.5" />

      {/* Pilaster projection shadow (right side) */}
      <path d="M 66 20 L 68 20 L 68 87 L 66 87" strokeWidth="0.4" fill="none" opacity="0.4" />
    </g>

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

    {/* CONTEXT: Greek temple colonnade - architectural setting */}
    <g opacity="0.25" strokeDasharray="3 2">
      {/* Entablature above - extending off-page */}
      <path d="M -10 4 L 110 4" strokeWidth="0.8" fill="none" />
      <path d="M -10 7 L 110 7" strokeWidth="0.6" fill="none" />

      {/* Neighboring columns (left) showing entasis for comparison */}
      <path d="M -4 90 Q -7 70, -8 50 Q -9 35, -6 20 L -3 15" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 10 90 Q 7 70, 6 50 Q 5 35, 8 20 L 11 15" strokeWidth="0.8" fill="none" opacity="0.6" />
      {/* Neighboring columns (right) */}
      <path d="M 90 90 Q 93 70, 94 50 Q 95 35, 92 20 L 89 15" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M 104 90 Q 107 70, 108 50 Q 109 35, 106 20 L 103 15" strokeWidth="0.8" fill="none" opacity="0.6" />

      {/* Neighbor capitals */}
      <path d="M -6 15 L 13 15" strokeWidth="0.5" fill="none" opacity="0.5" />
      <path d="M -8 11 L 15 11" strokeWidth="0.5" fill="none" opacity="0.5" />
      <path d="M 87 15 L 106 15" strokeWidth="0.5" fill="none" opacity="0.5" />
      <path d="M 85 11 L 108 11" strokeWidth="0.5" fill="none" opacity="0.5" />

      {/* Stylobate steps */}
      <path d="M -10 94 L 110 94" strokeWidth="0.7" fill="none" />
      <path d="M -10 97 L 110 97" strokeWidth="0.5" fill="none" opacity="0.6" />
      <path d="M -10 100 L 110 100" strokeWidth="0.5" fill="none" opacity="0.4" />

      {/* Floor/marble paving beyond stylobate */}
      <path d="M 20 100 L 20 105" strokeWidth="0.3" fill="none" opacity="0.3" />
      <path d="M 50 100 L 50 105" strokeWidth="0.3" fill="none" opacity="0.3" />
      <path d="M 80 100 L 80 105" strokeWidth="0.3" fill="none" opacity="0.3" />
    </g>

    {/* ANALYTICAL: Measurement/comparison lines (educational overlay) */}
    {/* Horizontal measurement lines showing entasis bulge */}
    <path d="M 22 30 L 78 30" strokeWidth="0.5" fill="none" opacity="0.35" strokeDasharray="3 2" />
    <path d="M 20 50 L 80 50" strokeWidth="0.5" fill="none" opacity="0.35" strokeDasharray="3 2" />
    <path d="M 22 70 L 78 70" strokeWidth="0.5" fill="none" opacity="0.35" strokeDasharray="3 2" />

    {/* Theoretical straight line for comparison */}
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
