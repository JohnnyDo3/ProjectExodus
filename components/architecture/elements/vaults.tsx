'use client'

import React from 'react'

const HaloFilter = () => (
  <defs>
    <filter id="vault-halo" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
      <feColorMatrix in="blur" type="matrix"
        values="0 0 0 0 0.96  0 0 0 0 0.62  0 0 0 0 0.04  0 0 0 0.8 0" result="glow" />
      <feMerge>
        <feMergeNode in="glow" /><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
)

interface SVGProps { showHalo?: boolean }

// ============================================================================
// BARREL VAULT - Continuous semicircular arch, the simplest vault type
// Reference: Roman basilicas, Romanesque naves - tunnel-like ceiling
// ============================================================================
export const BarrelVaultSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Side walls and ground - dashed blueprint */}
    <g strokeDasharray="3 2" opacity="0.4">
      <path d="M 6 92 L 6 48" strokeWidth="1.2" fill="none" />
      <path d="M 94 92 L 94 48" strokeWidth="1.2" fill="none" />
      <path d="M 5 92 L 95 92" strokeWidth="0.8" fill="none" />
      {/* Wall thickness */}
      <path d="M 12 92 L 12 50" strokeWidth="0.6" fill="none" opacity="0.7" />
      <path d="M 88 92 L 88 50" strokeWidth="0.6" fill="none" opacity="0.7" />
    </g>

    {/* PRIMARY: THE BARREL VAULT - continuous tunnel shape */}
    <g filter={showHalo ? "url(#vault-halo)" : undefined}>
      {/* Front arch - extrados */}
      <path d="M 6 48 Q 6 10, 50 10 Q 94 10, 94 48" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Front arch - intrados */}
      <path d="M 12 50 Q 12 18, 50 18 Q 88 18, 88 50" strokeWidth="1.8" fill="none" opacity="0.75" />

      {/* Receding arches showing depth/perspective */}
      <path d="M 18 52 Q 18 24, 50 24 Q 82 24, 82 52" strokeWidth="1.4" fill="none" opacity="0.55" />
      <path d="M 24 55 Q 24 30, 50 30 Q 76 30, 76 55" strokeWidth="1.1" fill="none" opacity="0.4" />
      <path d="M 30 58 Q 30 36, 50 36 Q 70 36, 70 58" strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M 36 60 Q 36 42, 50 42 Q 64 42, 64 60" strokeWidth="0.6" fill="none" opacity="0.2" />

      {/* Longitudinal ribs showing vault length */}
      <path d="M 50 10 L 50 62" strokeWidth="0.9" fill="none" opacity="0.45" />
      <path d="M 30 18 L 30 60" strokeWidth="0.6" fill="none" opacity="0.3" />
      <path d="M 70 18 L 70 60" strokeWidth="0.6" fill="none" opacity="0.3" />
    </g>

    {/* Impost line at springing */}
    <path d="M 3 48 L 15 48" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M 85 48 L 97 48" strokeWidth="1.5" fill="none" opacity="0.5" />
  </svg>
)

// ============================================================================
// GROIN VAULT - Two barrel vaults intersecting at right angles
// Reference: Roman baths, Romanesque crypts - X-shaped intersection
// ============================================================================
export const GroinVaultSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Corner piers and ground - dashed blueprint */}
    <g strokeDasharray="3 2" opacity="0.4">
      <path d="M 8 92 L 8 58" strokeWidth="1.5" fill="none" />
      <path d="M 92 92 L 92 58" strokeWidth="1.5" fill="none" />
      <path d="M 8 92 L 92 92" strokeWidth="0.8" fill="none" />
      {/* Inner pier faces */}
      <path d="M 14 92 L 14 60" strokeWidth="0.8" fill="none" opacity="0.7" />
      <path d="M 86 92 L 86 60" strokeWidth="0.8" fill="none" opacity="0.7" />
    </g>

    {/* PRIMARY: THE GROIN VAULT - X-shaped intersection of two tunnels */}
    <g filter={showHalo ? "url(#vault-halo)" : undefined}>
      {/* Side arches (transverse) */}
      <path d="M 8 58 Q 29 42, 50 58" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 50 58 Q 71 42, 92 58" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* THE GROINS - diagonal intersecting ridges (key feature) */}
      <path d="M 8 58 Q 34 36, 50 14" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M 92 58 Q 66 36, 50 14" strokeWidth="2.8" fill="none" strokeLinecap="round" />

      {/* Inner groin lines */}
      <path d="M 14 55 Q 36 36, 50 20" strokeWidth="1.6" fill="none" opacity="0.6" />
      <path d="M 86 55 Q 64 36, 50 20" strokeWidth="1.6" fill="none" opacity="0.6" />

      {/* Web/surface between groins */}
      <path d="M 24 52 Q 38 44, 50 36" strokeWidth="0.7" fill="none" opacity="0.4" />
      <path d="M 76 52 Q 62 44, 50 36" strokeWidth="0.7" fill="none" opacity="0.4" />
    </g>

    {/* Crown point where groins meet */}
    <circle cx="50" cy="14" r="2.5" strokeWidth="1.5" fill="none" opacity="0.7" />
  </svg>
)

// ============================================================================
// RIB VAULT - Structural ribs with thin webbing, Gothic innovation
// Reference: Gothic cathedrals (Notre-Dame, Chartres) - skeleton of ribs
// ============================================================================
export const RibVaultSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Corner piers and responds - dashed blueprint */}
    <g strokeDasharray="3 2" opacity="0.4">
      <path d="M 8 92 L 8 58" strokeWidth="2" fill="none" />
      <path d="M 92 92 L 92 58" strokeWidth="2" fill="none" />
      <path d="M 50 92 L 50 78" strokeWidth="1.5" fill="none" />
      <path d="M 8 92 L 92 92" strokeWidth="0.8" fill="none" />
    </g>

    {/* PRIMARY: THE RIB VAULT - prominent structural stone ribs */}
    <g filter={showHalo ? "url(#vault-halo)" : undefined}>
      {/* DIAGONAL RIBS - the primary structural members */}
      <path d="M 8 58 Q 32 34, 50 12" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M 92 58 Q 68 34, 50 12" strokeWidth="3.2" fill="none" strokeLinecap="round" />

      {/* TRANSVERSE RIBS - crossing the space */}
      <path d="M 8 58 Q 29 44, 50 58" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M 50 58 Q 71 44, 92 58" strokeWidth="2.8" fill="none" strokeLinecap="round" />

      {/* RIDGE RIB (longitudinal) - optional in some Gothic */}
      <path d="M 50 12 L 50 58" strokeWidth="2.2" fill="none" opacity="0.8" />

      {/* Rib molding profiles (inner edge) */}
      <path d="M 12 55 Q 34 34, 48 16" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 88 55 Q 66 34, 52 16" strokeWidth="1" fill="none" opacity="0.5" />
    </g>

    {/* Webbing/infill - thin membrane between ribs (lighter) */}
    <g opacity="0.25">
      <path d="M 24 50 Q 38 40, 50 32" strokeWidth="0.7" fill="none" />
      <path d="M 76 50 Q 62 40, 50 32" strokeWidth="0.7" fill="none" />
      <path d="M 30 54 L 50 46 L 70 54" strokeWidth="0.5" fill="none" />
    </g>

    {/* Carved boss at apex (decorative keystone) */}
    <circle cx="50" cy="12" r="4.5" strokeWidth="2" fill="none" />
    <circle cx="50" cy="12" r="2.5" strokeWidth="1" fill="none" opacity="0.6" />
  </svg>
)

// ============================================================================
// FAN VAULT - Ribs spread like fan from springer, English Perpendicular
// Reference: King's College Chapel, Gloucester Cathedral cloisters
// PERSPECTIVE: Looking up from directly below, viewer on floor
// ============================================================================
export const FanVaultSVG = ({ showHalo = false }: SVGProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current">
    <HaloFilter />

    {/* CONTEXT: Bay edges and walls far above - dashed reference */}
    <g strokeDasharray="3 2" opacity="0.3" strokeWidth="0.6">
      {/* Bay outline (rectangular quadrangular bay) */}
      <rect x="5" y="5" width="90" height="90" fill="none" />
      {/* Wall corners hint */}
      <path d="M 5 5 L 2 2" />
      <path d="M 95 5 L 98 2" />
      <path d="M 5 95 L 2 98" />
      <path d="M 95 95 L 98 98" />
    </g>

    {/* PRIMARY: FOUR FAN CONOIDS - viewed from directly below */}
    <g filter={showHalo ? "url(#vault-halo)" : undefined}>

      {/* BOTTOM-LEFT CORNER FAN (closest to viewer - largest) */}
      <g opacity="1">
        {/* Main radiating ribs (equal curvature, equal spacing) */}
        <path d="M 5 95 Q 18 82, 28 72" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M 5 95 Q 15 78, 22 64" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 5 95 Q 12 72, 18 56" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 5 95 Q 10 66, 16 50" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 5 95 Q 9 60, 15 44" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 5 95 Q 18 62, 28 50" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 5 95 Q 22 68, 35 56" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 5 95 Q 28 75, 42 64" strokeWidth="2.2" fill="none" strokeLinecap="round" />

        {/* Lierne ribs (horizontal connecting ribs) */}
        <path d="M 18 82 Q 19 77, 22 72" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M 15 72 Q 17 66, 20 60" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M 13 62 Q 16 56, 19 50" strokeWidth="0.8" fill="none" opacity="0.6" />

        {/* Tracery decoration within panels */}
        <path d="M 12 76 Q 15 74, 18 74" strokeWidth="0.4" fill="none" opacity="0.4" />
        <path d="M 11 68 Q 13 66, 16 66" strokeWidth="0.4" fill="none" opacity="0.4" />
        <path d="M 10 60 Q 12 58, 14 58" strokeWidth="0.4" fill="none" opacity="0.4" />
      </g>

      {/* BOTTOM-RIGHT CORNER FAN (closest to viewer - largest) */}
      <g opacity="1">
        {/* Main radiating ribs */}
        <path d="M 95 95 Q 82 82, 72 72" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M 95 95 Q 85 78, 78 64" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 95 95 Q 88 72, 82 56" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 95 95 Q 90 66, 84 50" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 95 95 Q 91 60, 85 44" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 95 95 Q 82 62, 72 50" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 95 95 Q 78 68, 65 56" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 95 95 Q 72 75, 58 64" strokeWidth="2.2" fill="none" strokeLinecap="round" />

        {/* Lierne ribs */}
        <path d="M 82 82 Q 81 77, 78 72" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M 85 72 Q 83 66, 80 60" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M 87 62 Q 84 56, 81 50" strokeWidth="0.8" fill="none" opacity="0.6" />

        {/* Tracery decoration */}
        <path d="M 88 76 Q 85 74, 82 74" strokeWidth="0.4" fill="none" opacity="0.4" />
        <path d="M 89 68 Q 87 66, 84 66" strokeWidth="0.4" fill="none" opacity="0.4" />
        <path d="M 90 60 Q 88 58, 86 58" strokeWidth="0.4" fill="none" opacity="0.4" />
      </g>

      {/* TOP-LEFT CORNER FAN (farther away - smaller) */}
      <g opacity="0.9">
        {/* Main radiating ribs */}
        <path d="M 5 5 Q 18 18, 28 28" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M 5 5 Q 15 22, 22 36" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M 5 5 Q 12 28, 18 44" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M 5 5 Q 10 34, 16 50" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M 5 5 Q 18 38, 28 50" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M 5 5 Q 22 32, 35 44" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M 5 5 Q 28 25, 42 36" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* Lierne ribs */}
        <path d="M 18 18 Q 19 23, 22 28" strokeWidth="0.7" fill="none" opacity="0.6" />
        <path d="M 15 28 Q 17 34, 20 40" strokeWidth="0.7" fill="none" opacity="0.6" />

        {/* Tracery */}
        <path d="M 12 24 Q 15 26, 18 26" strokeWidth="0.3" fill="none" opacity="0.4" />
        <path d="M 11 32 Q 13 34, 16 34" strokeWidth="0.3" fill="none" opacity="0.4" />
      </g>

      {/* TOP-RIGHT CORNER FAN (farther away - smaller) */}
      <g opacity="0.9">
        {/* Main radiating ribs */}
        <path d="M 95 5 Q 82 18, 72 28" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M 95 5 Q 85 22, 78 36" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M 95 5 Q 88 28, 82 44" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M 95 5 Q 90 34, 84 50" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M 95 5 Q 82 38, 72 50" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M 95 5 Q 78 32, 65 44" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M 95 5 Q 72 25, 58 36" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* Lierne ribs */}
        <path d="M 82 18 Q 81 23, 78 28" strokeWidth="0.7" fill="none" opacity="0.6" />
        <path d="M 85 28 Q 83 34, 80 40" strokeWidth="0.7" fill="none" opacity="0.6" />

        {/* Tracery */}
        <path d="M 88 24 Q 85 26, 82 26" strokeWidth="0.3" fill="none" opacity="0.4" />
        <path d="M 89 32 Q 87 34, 84 34" strokeWidth="0.3" fill="none" opacity="0.4" />
      </g>

      {/* CENTRAL FLAT SPANDREL (where four fans meet in center) */}
      <g opacity="0.85">
        {/* Spandrel outline (diamond/square shape) */}
        <path d="M 50 35 L 65 50 L 50 65 L 35 50 Z" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* Central boss/medallion */}
        <circle cx="50" cy="50" r="8" strokeWidth="1.6" fill="none" />
        <circle cx="50" cy="50" r="5" strokeWidth="1.2" fill="none" />
        <circle cx="50" cy="50" r="2.5" strokeWidth="0.8" fill="none" />

        {/* Decorative rosette pattern */}
        <path d="M 50 42 L 50 45" strokeWidth="1" opacity="0.6" />
        <path d="M 50 55 L 50 58" strokeWidth="1" opacity="0.6" />
        <path d="M 42 50 L 45 50" strokeWidth="1" opacity="0.6" />
        <path d="M 55 50 L 58 50" strokeWidth="1" opacity="0.6" />
        <path d="M 44 44 L 46 46" strokeWidth="0.8" opacity="0.5" />
        <path d="M 56 56 L 54 54" strokeWidth="0.8" opacity="0.5" />
        <path d="M 44 56 L 46 54" strokeWidth="0.8" opacity="0.5" />
        <path d="M 56 44 L 54 46" strokeWidth="0.8" opacity="0.5" />
      </g>

      {/* Conoid surface boundaries (trumpet shapes) */}
      <g opacity="0.4" strokeWidth="0.6">
        <path d="M 28 72 Q 35 64, 42 64 Q 46 58, 50 54" fill="none" />
        <path d="M 72 72 Q 65 64, 58 64 Q 54 58, 50 54" fill="none" />
        <path d="M 28 28 Q 35 36, 42 36 Q 46 42, 50 46" fill="none" />
        <path d="M 72 28 Q 65 36, 58 36 Q 54 42, 50 46" fill="none" />
      </g>
    </g>

    {/* SPRINGER CORBELS at corners (where fans originate) */}
    <g opacity="0.6">
      <circle cx="5" cy="95" r="3" strokeWidth="1.2" fill="none" />
      <circle cx="95" cy="95" r="3" strokeWidth="1.2" fill="none" />
      <circle cx="5" cy="5" r="2.5" strokeWidth="1" fill="none" />
      <circle cx="95" cy="5" r="2.5" strokeWidth="1" fill="none" />
    </g>
  </svg>
)

export const VAULT_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'barrel-vault': BarrelVaultSVG,
  'groin-vault': GroinVaultSVG,
  'rib-vault': RibVaultSVG,
  'fan-vault': FanVaultSVG,
}
