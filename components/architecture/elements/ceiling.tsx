'use client'

import React from 'react'
import { MaterialPatterns } from './materialPatterns'

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
 * CEILING ROSE - Victorian ornamental medallion with chandelier
 * 3D PERSPECTIVE: Looking up at an angle from corner of room
 * Shows: Circular plaster rose with acanthus leaves, radiating petals
 * Foreshortening creates elliptical view with depth shadows
 */
const CeilingRoseSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="rose-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#rose-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - View from doorway looking up into parlor room */}
      <g strokeDasharray="3 2" opacity="0.25" strokeWidth="0.6">
        {/* DOORWAY FRAME at viewer's position (bottom of view) */}
        <path d="M0 100 L0 92 L100 92 L100 100" strokeWidth="0.8" />
        <path d="M5 100 L5 94 L95 94 L95 100" strokeWidth="0.5" opacity="0.6" />
        {/* Door frame header */}
        <path d="M0 92 L100 92" strokeWidth="0.9" />

        {/* Walls converging to vanishing point ~(50, 5) */}
        {/* Left wall rising from doorway to ceiling */}
        <path d="M0 92 L0 5" strokeWidth="0.7" />
        <path d="M5 94 L10 10" strokeWidth="0.5" opacity="0.5" />
        {/* Right wall rising from doorway to ceiling */}
        <path d="M100 92 L100 5" strokeWidth="0.7" />
        <path d="M95 94 L90 10" strokeWidth="0.5" opacity="0.5" />
        {/* Far wall (top of view) */}
        <path d="M0 5 L100 5" strokeWidth="0.6" />

        {/* Crown molding where walls meet ceiling (converging) */}
        <path d="M0 8 Q25 6, 50 5 Q75 6, 100 8" strokeWidth="0.5" />
        <path d="M5 80 L10 70" strokeWidth="0.4" opacity="0.4" />
        <path d="M95 80 L90 70" strokeWidth="0.4" opacity="0.4" />

        {/* Picture rail on near walls */}
        <path d="M0 85 L5 82" strokeWidth="0.3" opacity="0.4" />
        <path d="M100 85 L95 82" strokeWidth="0.3" opacity="0.4" />

        {/* Window on far wall letting in light */}
        <path d="M35 5 L35 12 L65 12 L65 5" strokeWidth="0.4" opacity="0.4" />
      </g>

      {/* PRIMARY - Ceiling rose in perspective (elliptical, tilted) */}
      <g strokeWidth="1.2">
        {/* Outer ring - perspective ellipse */}
        <ellipse cx="50" cy="45" rx="38" ry="28" strokeWidth="2" />

        {/* Second decorative ring */}
        <ellipse cx="50" cy="45" rx="30" ry="22" strokeWidth="1.5" />

        {/* Inner medallion ring */}
        <ellipse cx="50" cy="45" rx="20" ry="14" strokeWidth="1.3" />

        {/* Center rose for chandelier attachment */}
        <ellipse cx="50" cy="45" rx="8" ry="5" strokeWidth="1.8" />

        {/* Chandelier chain dropping down toward viewer */}
        <path d="M50 50 L50 75" strokeWidth="1" />
        <path d="M48 75 L52 75 L54 85 L46 85 Z" strokeWidth="0.8" />

        {/* Acanthus leaves radiating out (8 leaves, perspective adjusted) */}
        {/* Top leaves (farther, smaller) */}
        <path d="M50 23 Q45 28, 50 31 Q55 28, 50 23" strokeWidth="1" />
        <path d="M50 23 L50 17" strokeWidth="0.8" />

        {/* Side leaves (larger, closer) */}
        <path d="M18 42 Q22 45, 20 50 Q18 45, 18 42" strokeWidth="1.2" />
        <path d="M12 44 L18 42" strokeWidth="0.8" />
        <path d="M82 42 Q78 45, 80 50 Q82 45, 82 42" strokeWidth="1.2" />
        <path d="M88 44 L82 42" strokeWidth="0.8" />

        {/* Bottom leaves (closest, largest due to perspective) */}
        <path d="M50 67 Q42 62, 48 58 Q52 62, 50 67" strokeWidth="1.3" />
        <path d="M50 73 L50 67" strokeWidth="0.9" />

        {/* Diagonal leaves */}
        <path d="M25 28 Q30 32, 28 38" strokeWidth="1" />
        <path d="M75 28 Q70 32, 72 38" strokeWidth="1" />
        <path d="M28 60 Q34 58, 35 52" strokeWidth="1.1" />
        <path d="M72 60 Q66 58, 65 52" strokeWidth="1.1" />

        {/* Petal details between leaves */}
        <path d="M35 30 Q40 35, 38 40" strokeWidth="0.7" opacity="0.7" />
        <path d="M65 30 Q60 35, 62 40" strokeWidth="0.7" opacity="0.7" />
        <path d="M35 55 Q40 52, 42 48" strokeWidth="0.7" opacity="0.7" />
        <path d="M65 55 Q60 52, 58 48" strokeWidth="0.7" opacity="0.7" />

        {/* Relief depth shadows on far side */}
        <path d="M22 35 Q30 38, 35 32" strokeWidth="0.5" opacity="0.4" />
        <path d="M78 35 Q70 38, 65 32" strokeWidth="0.5" opacity="0.4" />
      </g>
    </g>
  </svg>
)

/**
 * COFFERED CEILING - Pantheon-style recessed panels
 * 3D PERSPECTIVE: Looking up at angle, one-point perspective to center
 * Shows: Deep recessed square coffers in grid, getting smaller toward vanishing point
 * Distinct: Geometric grid with shadowed recesses
 */
const CofferedCeilingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="coffer-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#coffer-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - View from end of grand hall looking up at Pantheon-style ceiling */}
      <g strokeDasharray="3 2" opacity="0.25" strokeWidth="0.6">
        {/* HALLWAY ENTRANCE at viewer's position (bottom of view) */}
        <path d="M-5 100 L-5 90 L105 90 L105 100" strokeWidth="0.7" />
        <path d="M0 100 L0 92 L100 92 L100 100" strokeWidth="0.5" opacity="0.6" />
        <path d="M-5 90 L105 90" strokeWidth="0.8" />

        {/* Walls converging to vanishing point ~(50, 0) */}
        {/* Left wall */}
        <path d="M-5 90 L-5 -5" strokeWidth="0.6" />
        <path d="M0 92 L5 5" strokeWidth="0.5" opacity="0.5" />
        {/* Right wall */}
        <path d="M105 90 L105 -5" strokeWidth="0.6" />
        <path d="M100 92 L95 5" strokeWidth="0.5" opacity="0.5" />
        {/* Far wall */}
        <path d="M-5 -5 L105 -5" strokeWidth="0.5" />

        {/* Cornice/entablature where walls meet ceiling */}
        <path d="M0 82 L5 72" strokeWidth="0.5" opacity="0.5" />
        <path d="M100 82 L95 72" strokeWidth="0.5" opacity="0.5" />
        <path d="M5 72 L25 60" strokeWidth="0.4" opacity="0.4" />
        <path d="M95 72 L75 60" strokeWidth="0.4" opacity="0.4" />

        {/* Column capitals at transition to ceiling */}
        <path d="M2 85 L8 85 L8 82 L2 82" strokeWidth="0.5" opacity="0.4" />
        <path d="M92 85 L98 85 L98 82 L92 82" strokeWidth="0.5" opacity="0.4" />
      </g>

      {/* PRIMARY - Coffered grid in perspective (converging to center) */}
      <g strokeWidth="1">
        {/* Outer frame of coffered area */}
        <path d="M5 85 L25 65 L75 65 L95 85" strokeWidth="1.5" />
        <path d="M25 65 L25 25 L75 25 L75 65" strokeWidth="1.5" />
        <path d="M5 85 L5 45 L25 25" strokeWidth="1.3" />
        <path d="M95 85 L95 45 L75 25" strokeWidth="1.3" />

        {/* TOP ROW coffers (far from viewer, smallest) */}
        {/* Coffer 1 */}
        <path d="M28 28 L28 38 L42 38 L42 28 Z" strokeWidth="1.2" />
        <path d="M30 30 L30 36 L40 36 L40 30 Z" strokeWidth="0.7" opacity="0.6" />
        {/* Coffer 2 */}
        <path d="M45 28 L45 38 L55 38 L55 28 Z" strokeWidth="1.2" />
        <path d="M47 30 L47 36 L53 36 L53 30 Z" strokeWidth="0.7" opacity="0.6" />
        {/* Coffer 3 */}
        <path d="M58 28 L58 38 L72 38 L72 28 Z" strokeWidth="1.2" />
        <path d="M60 30 L60 36 L70 36 L70 30 Z" strokeWidth="0.7" opacity="0.6" />

        {/* MIDDLE ROW coffers (medium) */}
        {/* Coffer 4 */}
        <path d="M26 42 L26 55 L43 55 L43 42 Z" strokeWidth="1.3" />
        <path d="M28 44 L28 53 L41 53 L41 44 Z" strokeWidth="0.8" opacity="0.6" />
        {/* Coffer 5 - center with rosette */}
        <path d="M46 42 L46 55 L54 55 L54 42 Z" strokeWidth="1.3" />
        <circle cx="50" cy="48" r="4" strokeWidth="0.9" />
        <circle cx="50" cy="48" r="2" strokeWidth="0.6" />
        {/* Coffer 6 */}
        <path d="M57 42 L57 55 L74 55 L74 42 Z" strokeWidth="1.3" />
        <path d="M59 44 L59 53 L72 53 L72 44 Z" strokeWidth="0.8" opacity="0.6" />

        {/* BOTTOM ROW coffers (closest, largest due to perspective) */}
        {/* Coffer 7 */}
        <path d="M12 62 L24 58 L24 75 L8 82 Z" strokeWidth="1.4" />
        <path d="M14 65 L22 62 L22 73 L12 78 Z" strokeWidth="0.8" opacity="0.6" />
        {/* Coffer 8 */}
        <path d="M27 58 L45 58 L45 75 L27 75 Z" strokeWidth="1.4" />
        <path d="M29 60 L43 60 L43 73 L29 73 Z" strokeWidth="0.8" opacity="0.6" />
        <circle cx="36" cy="66" r="3" strokeWidth="0.7" />
        {/* Coffer 9 */}
        <path d="M55 58 L73 58 L73 75 L55 75 Z" strokeWidth="1.4" />
        <path d="M57 60 L71 60 L71 73 L57 73 Z" strokeWidth="0.8" opacity="0.6" />
        <circle cx="64" cy="66" r="3" strokeWidth="0.7" />
        {/* Coffer 10 */}
        <path d="M76 58 L88 62 L92 82 L76 75 Z" strokeWidth="1.4" />
        <path d="M78 62 L86 65 L88 78 L78 73 Z" strokeWidth="0.8" opacity="0.6" />

        {/* Beam edges between coffers */}
        <path d="M43 28 L43 75" strokeWidth="0.9" />
        <path d="M57 28 L57 75" strokeWidth="0.9" />
        <path d="M25 40 L75 40" strokeWidth="0.9" />
        <path d="M25 57 L75 57" strokeWidth="0.9" />
      </g>
    </g>
  </svg>
)

/**
 * COVED CEILING - Curved transition between wall and ceiling
 * 3D PERSPECTIVE: Corner view showing curved cove profile
 * Shows: Smooth concave curve flowing into flat ceiling
 * Distinct: Elegant curves, often with decorative molding
 */
const CovedCeilingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="coved-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#coved-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - View from doorway into room with coved ceiling */}
      <g strokeDasharray="3 2" opacity="0.25" strokeWidth="0.6">
        {/* DOORWAY at viewer's position */}
        <path d="M-5 100 L-5 88 L105 88 L105 100" strokeWidth="0.7" />
        <path d="M0 100 L0 90 L100 90 L100 100" strokeWidth="0.5" opacity="0.6" />
        <path d="M-5 88 L105 88" strokeWidth="0.8" />

        {/* Left wall converging up and in */}
        <path d="M0 90 L0 55" strokeWidth="0.6" />
        <path d="M5 90 L5 58" strokeWidth="0.4" opacity="0.5" />
        {/* Wall detail */}
        <path d="M0 70 L5 70" strokeWidth="0.4" opacity="0.4" />
        <path d="M0 80 L5 80" strokeWidth="0.4" opacity="0.4" />

        {/* Right wall converging toward vanishing point */}
        <path d="M100 90 L100 45" strokeWidth="0.6" />
        <path d="M95 90 L95 48" strokeWidth="0.4" opacity="0.5" />

        {/* Far wall (top of view) */}
        <path d="M0 45 L100 42" strokeWidth="0.5" opacity="0.4" />

        {/* Chair rail on near walls */}
        <path d="M0 82 L5 82" strokeWidth="0.3" opacity="0.3" />
        <path d="M95 82 L100 82" strokeWidth="0.3" opacity="0.3" />
      </g>

      {/* PRIMARY - Coved ceiling curves in perspective */}
      <g strokeWidth="1.2">
        {/* Left wall cove profile (showing the curve) */}
        <path d="M0 55 Q0 35, 20 30 Q40 28, 55 30" strokeWidth="1.8" />

        {/* Right wall cove sweeping across */}
        <path d="M100 45 Q95 30, 75 25 Q55 22, 55 30" strokeWidth="1.5" />

        {/* Flat ceiling plane in center */}
        <path d="M55 30 L55 5 L95 8 L95 25" strokeWidth="1" opacity="0.6" />
        <path d="M20 30 L20 8 L55 5" strokeWidth="1" opacity="0.6" />

        {/* Cove molding detail on left (closest, largest) */}
        <path d="M0 52 Q2 38, 18 33" strokeWidth="1.3" />
        <path d="M0 48 Q5 35, 22 30" strokeWidth="0.9" opacity="0.7" />

        {/* Cove molding detail on right (receding) */}
        <path d="M95 42 Q90 32, 72 27" strokeWidth="1.1" />
        <path d="M98 38 Q92 30, 75 25" strokeWidth="0.8" opacity="0.7" />

        {/* Decorative bead molding along cove edge */}
        <path d="M5 50 Q15 42, 25 38 Q35 35, 45 33 Q55 32, 65 30 Q75 28, 85 30 Q92 32, 96 38" strokeWidth="0.7" strokeDasharray="2 1.5" />

        {/* Crown molding at wall-cove transition */}
        <path d="M0 55 L0 58" strokeWidth="2" />
        <path d="M0 58 Q10 52, 15 48" strokeWidth="1" />

        {/* Corner junction detail */}
        <path d="M0 55 Q8 48, 12 40 Q15 35, 20 30" strokeWidth="0.8" opacity="0.5" />

        {/* Ceiling surface texture lines */}
        <path d="M25 15 L60 12" strokeWidth="0.4" opacity="0.3" />
        <path d="M30 20 L65 17" strokeWidth="0.4" opacity="0.3" />

        {/* Light reflection on cove curve */}
        <path d="M8 42 Q18 38, 28 35" strokeWidth="0.5" opacity="0.4" />
      </g>
    </g>
  </svg>
)

/**
 * DROPPED CEILING - Modern suspended T-bar grid system
 * 3D PERSPECTIVE: Looking up from office floor, strong one-point perspective
 * Shows: Acoustic tiles, T-bar grid, light fixtures, air vents
 * Distinct: Industrial/commercial, regular grid pattern
 */
const DroppedCeilingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="drop-halo" intensity={0.75} />}
    <g filter={showHalo ? "url(#drop-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - View from office doorway looking up at suspended ceiling */}
      <g strokeDasharray="3 2" opacity="0.25" strokeWidth="0.6">
        {/* OFFICE DOORWAY at viewer's position */}
        <path d="M10 100 L10 92 L90 92 L90 100" strokeWidth="0.7" />
        <path d="M15 100 L15 94 L85 94 L85 100" strokeWidth="0.5" opacity="0.6" />
        <path d="M10 92 L90 92" strokeWidth="0.8" />

        {/* Walls converging toward vanishing point ~(50, 5) */}
        <path d="M10 92 L15 68 L20 50" strokeWidth="0.5" />
        <path d="M90 92 L85 68 L80 50" strokeWidth="0.5" />
        <path d="M0 100 L20 68" strokeWidth="0.4" opacity="0.4" />
        <path d="M100 100 L80 68" strokeWidth="0.4" opacity="0.4" />

        {/* Far wall */}
        <path d="M20 50 L80 50" strokeWidth="0.4" opacity="0.4" />

        {/* Exposed ceiling edge showing plenum above grid */}
        <path d="M15 70 L20 68" strokeWidth="0.3" opacity="0.3" />
        <path d="M85 70 L80 68" strokeWidth="0.3" opacity="0.3" />
      </g>

      {/* PRIMARY - Suspended grid in steep perspective */}
      <g strokeWidth="1">
        {/* Vanishing point near center top - main T-bar grid */}

        {/* Horizontal T-bars (curved for perspective) */}
        <path d="M5 75 Q50 60, 95 75" strokeWidth="1.5" />
        <path d="M12 55 Q50 42, 88 55" strokeWidth="1.4" />
        <path d="M20 38 Q50 28, 80 38" strokeWidth="1.3" />
        <path d="M30 24 Q50 18, 70 24" strokeWidth="1.2" />
        <path d="M42 14 Q50 11, 58 14" strokeWidth="1" />

        {/* Vertical T-bars converging to vanishing point */}
        <path d="M15 72 L42 14" strokeWidth="1.4" />
        <path d="M35 68 L46 14" strokeWidth="1.3" />
        <path d="M50 65 L50 12" strokeWidth="1.2" />
        <path d="M65 68 L54 14" strokeWidth="1.3" />
        <path d="M85 72 L58 14" strokeWidth="1.4" />

        {/* Acoustic tiles (shown as recessed panels) */}
        {/* Bottom row - largest tiles (closest) */}
        <path d="M18 73 L33 66 L45 68 L36 76 Z" strokeWidth="0.8" opacity="0.7" />
        <path d="M55 68 L67 66 L82 73 L64 76 Z" strokeWidth="0.8" opacity="0.7" />

        {/* Middle row tiles */}
        <path d="M22 54 L34 45 L48 48 L38 56 Z" strokeWidth="0.7" opacity="0.6" />
        <path d="M52 48 L66 45 L78 54 L62 56 Z" strokeWidth="0.7" opacity="0.6" />

        {/* Fluorescent light fixture (2x4 troffer) */}
        <path d="M38 42 L47 35 L53 35 L62 42 L62 52 L53 48 L47 48 L38 52 Z" strokeWidth="1.2" />
        <path d="M42 40 L48 36 L52 36 L58 40" strokeWidth="0.6" opacity="0.5" />
        <path d="M44 45 L56 45" strokeWidth="0.5" opacity="0.4" />

        {/* Air return grille (perforated) */}
        <path d="M22 35 L30 28 L42 30 L35 38 Z" strokeWidth="1" />
        <path d="M25 33 L28 30" strokeWidth="0.5" />
        <path d="M28 35 L31 32" strokeWidth="0.5" />
        <path d="M31 33 L34 30" strokeWidth="0.5" />
        <path d="M32 36 L35 33" strokeWidth="0.5" />

        {/* Sprinkler head */}
        <circle cx="72" cy="32" r="2" strokeWidth="0.8" />
        <path d="M72 30 L72 26" strokeWidth="0.6" />

        {/* One tile missing showing plenum space */}
        <path d="M68 50 L75 45 L85 48 L80 55 Z" strokeDasharray="2 2" strokeWidth="0.7" opacity="0.5" />
        {/* Ductwork visible above */}
        <path d="M70 48 L78 44" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.4" />
        <path d="M74 52 L74 46" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.4" />

        {/* Suspension wires (barely visible) */}
        <path d="M50 12 L50 5" strokeWidth="0.4" strokeDasharray="1 2" opacity="0.3" />
        <path d="M30 24 L28 15" strokeWidth="0.4" strokeDasharray="1 2" opacity="0.3" />
        <path d="M70 24 L72 15" strokeWidth="0.4" strokeDasharray="1 2" opacity="0.3" />
      </g>
    </g>
  </svg>
)

/**
 * EXPOSED BEAMS - Medieval great hall timber ceiling
 * 3D PERSPECTIVE: Looking up at dramatic angle, beams receding
 * Shows: Heavy timber joists, smaller cross beams, wood grain
 * Distinct: Rustic/historic, structural honesty, rhythmic pattern
 */
const ExposedBeamsSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <MaterialPatterns />
    {showHalo && <HaloFilter id="beam-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#beam-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - RICH ENVIRONMENTAL SETTING */}

      {/* Room corner - where two walls meet the ceiling */}
      <g strokeDasharray="2 1.5" opacity="0.2" strokeWidth="0.4">
        <path d="M0 100 L0 60" />
        <path d="M100 100 L100 60" />
        {/* Wall corner detail */}
        <path d="M0 60 L0 55 L100 55 L100 60" opacity="0.15" />
      </g>

      {/* Stone/plaster walls with detailed texture */}
      <g opacity="0.25" strokeWidth="0.3">
        {/* Left wall plaster texture */}
        <rect x="0" y="60" width="5" height="40" fill="url(#plaster-smooth)" opacity="0.2" stroke="none" />
        <path d="M2 72 L4 74" opacity="0.4" />
        <path d="M1 80 L3 82" opacity="0.4" />
        <path d="M2 88 L4 90" opacity="0.4" />
        {/* Plaster cracks on wall */}
        <path d="M3 68 Q3.5 75, 3 82" strokeDasharray="1 0.8" opacity="0.3" />

        {/* Right wall plaster texture */}
        <rect x="95" y="60" width="5" height="40" fill="url(#plaster-smooth)" opacity="0.2" stroke="none" />
        <path d="M96 78 L98 80" opacity="0.4" />
        <path d="M97 86 L99 88" opacity="0.4" />
        <path d="M96 94 L98 96" opacity="0.4" />
        {/* Wall trim/molding at corner */}
        <path d="M0 60 L5 60" strokeWidth="0.5" opacity="0.3" />
        <path d="M95 60 L100 60" strokeWidth="0.5" opacity="0.3" />
      </g>

      {/* Window opening hint on left wall */}
      <g strokeDasharray="3 2" opacity="0.18" strokeWidth="0.35">
        <path d="M0 75 L0 95 L4 95 L4 75" />
        <path d="M0 85 L4 85" />
        {/* Light coming through window */}
        <path d="M4 80 L8 78" strokeDasharray="1 1.5" opacity="0.25" />
        <path d="M4 88 L8 86" strokeDasharray="1 1.5" opacity="0.25" />
      </g>

      {/* Floor suggestion far below (perspective) */}
      <g strokeDasharray="4 3" opacity="0.15" strokeWidth="0.3">
        <path d="M5 100 L95 100" />
        <path d="M10 99 L90 99" opacity="0.5" />
      </g>

      {/* PERSPECTIVE GRID - Single vanishing point at (50, 2) */}
      <g opacity="0.08" strokeWidth="0.2" strokeDasharray="3 4">
        {/* Converging perspective lines from viewer to vanishing point */}
        <path d="M10 100 L50 2" />
        <path d="M30 100 L50 2" />
        <path d="M70 100 L50 2" />
        <path d="M90 100 L50 2" />
        {/* Horizontal depth lines */}
        <path d="M5 80 L95 80" opacity="0.6" />
        <path d="M15 40 L85 40" opacity="0.6" />
        <path d="M30 15 L70 15" opacity="0.6" />
      </g>

      {/* PRIMARY - Exposed timber structure with TRUE SINGLE-POINT PERSPECTIVE */}
      <g strokeWidth="1.2">
        {/* Main beam (wall plate) - CONVERGING toward vanishing point */}
        {/* Near edge (at viewer) */}
        <path d="M0 58 L100 58" strokeWidth="2.8" />
        <path d="M0 61 L100 61" strokeWidth="1.8" opacity="0.6" />
        <path d="M0 63 L100 63" strokeWidth="0.8" opacity="0.3" />
        {/* Far edges converging */}
        <path d="M10 5 L90 5" strokeWidth="1.2" opacity="0.4" />
        <path d="M20 3 L80 3" strokeWidth="0.6" opacity="0.25" />

        {/* Beam 1 - CONVERGING toward vanishing point (15, 58) → (32, 8) */}
        {/* Main beam center line */}
        <path d="M15 58 L32 8" strokeWidth="3.2" />
        {/* Right edge (showing depth) */}
        <path d="M18 58 L34 9" strokeWidth="1.6" opacity="0.5" />
        {/* Left edge (showing depth) */}
        <path d="M12 58 L30 9" strokeWidth="1.6" opacity="0.5" />
        {/* Wood grain texture - more detailed, transformed for perspective */}
        <path d="M13.5 48 Q14.5 50, 15.5 48" strokeWidth="0.4" opacity="0.35" />
        <path d="M15 35 Q16 37, 17 35" strokeWidth="0.4" opacity="0.35" />
        <path d="M20 20 Q21 22, 22 20" strokeWidth="0.35" opacity="0.3" />
        {/* Knot detail (foreshortened in distance) */}
        <ellipse cx="18" cy="28" rx="0.8" ry="1.2" strokeWidth="0.4" opacity="0.3" />
        {/* Shadow on underside */}
        <path d="M12 58 L30 9" strokeWidth="0.5" opacity="0.2" strokeDasharray="1 1" />

        {/* Beam 2 - CONVERGING toward vanishing point (35, 58) → (44, 5) */}
        {/* Main beam center line */}
        <path d="M35 58 L44 5" strokeWidth="3.8" />
        {/* Right edge (showing depth) */}
        <path d="M38 58 L46 6" strokeWidth="1.8" opacity="0.5" />
        {/* Left edge (showing depth) */}
        <path d="M32 58 L42 6" strokeWidth="1.8" opacity="0.5" />
        {/* Wood grain texture (perspective-adjusted) */}
        <path d="M33.5 48 Q34.5 50, 35.5 48" strokeWidth="0.45" opacity="0.35" />
        <path d="M36 32 Q37 34, 38 32" strokeWidth="0.45" opacity="0.35" />
        <path d="M40 18 Q41 20, 42 18" strokeWidth="0.4" opacity="0.3" />
        {/* Chamfered edge detail */}
        <path d="M38 58 L39 57" strokeWidth="0.6" opacity="0.4" />
        <path d="M45 7 L46 8" strokeWidth="0.5" opacity="0.35" />

        {/* Beam 3 - center - CONVERGING toward vanishing point (55, 58) → (52, 3) */}
        {/* Main beam center line (largest, closest to viewer) */}
        <path d="M55 58 L52 3" strokeWidth="4.5" />
        {/* Right edge (showing depth) */}
        <path d="M59 58 L54 4" strokeWidth="2" opacity="0.5" />
        {/* Left edge (showing depth) */}
        <path d="M51 58 L50 4" strokeWidth="2" opacity="0.5" />
        {/* Rich wood grain texture (perspective-adjusted) */}
        <path d="M52.5 48 Q53.5 50, 54.5 48" strokeWidth="0.5" opacity="0.4" />
        <path d="M53 35 Q54 37, 55 35" strokeWidth="0.5" opacity="0.4" />
        <path d="M52 22 Q52.5 24, 53 22" strokeWidth="0.45" opacity="0.35" />
        {/* Large knot with detail (foreshortened) */}
        <ellipse cx="54" cy="30" rx="1.3" ry="1.8" strokeWidth="0.5" opacity="0.35" />
        <circle cx="54" cy="30" r="0.7" strokeWidth="0.3" opacity="0.25" />
        {/* Wood split/crack */}
        <path d="M53 18 L53.2 20 L52.8 22" strokeWidth="0.3" opacity="0.3" strokeDasharray="1 0.5" />

        {/* Beam 4 - CONVERGING toward vanishing point (75, 58) → (56, 5) */}
        {/* Main beam center line */}
        <path d="M75 58 L56 5" strokeWidth="3.8" />
        {/* Right edge (showing depth) */}
        <path d="M78 58 L58 6" strokeWidth="1.8" opacity="0.5" />
        {/* Left edge (showing depth) */}
        <path d="M72 58 L54 6" strokeWidth="1.8" opacity="0.5" />
        {/* Wood grain (perspective-adjusted) */}
        <path d="M73.5 48 Q74.5 50, 75.5 48" strokeWidth="0.45" opacity="0.35" />
        <path d="M70 32 Q71 34, 72 32" strokeWidth="0.45" opacity="0.35" />
        <path d="M62 18 Q63 20, 64 18" strokeWidth="0.4" opacity="0.3" />

        {/* Beam 5 - CONVERGING toward vanishing point (92, 58) → (68, 8) */}
        {/* Main beam center line */}
        <path d="M92 58 L68 8" strokeWidth="3.2" />
        {/* Right edge (showing depth) */}
        <path d="M95 58 L70 9" strokeWidth="1.6" opacity="0.5" />
        {/* Left edge (showing depth) */}
        <path d="M89 58 L66 9" strokeWidth="1.6" opacity="0.5" />
        {/* Wood grain (perspective-adjusted) */}
        <path d="M90.5 48 Q91.5 50, 92.5 48" strokeWidth="0.4" opacity="0.35" />
        <path d="M85 35 Q86 37, 87 35" strokeWidth="0.4" opacity="0.35" />
        <path d="M72 20 Q73 22, 74 20" strokeWidth="0.35" opacity="0.3" />

        {/* Smaller purlins running perpendicular - PERSPECTIVE-CORRECTED */}
        {/* Upper purlin near vanishing point (connecting far ends of beams) */}
        <path d="M30 9 L42 6" strokeWidth="1.2" />
        <path d="M30 9.5 L42 6.5" strokeWidth="0.5" opacity="0.4" />
        <path d="M42 6 L52 4" strokeWidth="1.3" />
        <path d="M42 6.5 L52 4.5" strokeWidth="0.5" opacity="0.4" />
        <path d="M52 4 L58 6" strokeWidth="1.3" />
        <path d="M52 4.5 L58 6.5" strokeWidth="0.5" opacity="0.4" />
        <path d="M58 6 L70 9" strokeWidth="1.2" />
        <path d="M58 6.5 L70 9.5" strokeWidth="0.5" opacity="0.4" />

        {/* Lower purlin at mid-distance (connecting beams at mid-points) */}
        <path d="M24 32 L39 20" strokeWidth="1.4" />
        <path d="M24 32.5 L39 20.5" strokeWidth="0.6" opacity="0.4" />
        <path d="M39 20 L53 12" strokeWidth="1.5" />
        <path d="M39 20.5 L53 12.5" strokeWidth="0.6" opacity="0.4" />
        <path d="M53 12 L64 20" strokeWidth="1.5" />
        <path d="M53 12.5 L64 20.5" strokeWidth="0.6" opacity="0.4" />
        <path d="M64 20 L80 32" strokeWidth="1.4" />
        <path d="M64 20.5 L80 32.5" strokeWidth="0.6" opacity="0.4" />

        {/* ENHANCED ceiling boards between beams - PERSPECTIVE-CORRECTED */}
        <g opacity="0.3">
          {/* Board planks with wood grain - following perspective convergence */}
          {/* Between beam 1 and beam 2 */}
          <path d="M28 24 L38 16" strokeWidth="0.5" strokeDasharray="3 1" />
          <path d="M29 26 L39 18" strokeWidth="0.25" />
          <path d="M27 28 L37 20" strokeWidth="0.5" strokeDasharray="3 1" />

          {/* Between beam 2 and beam 3 */}
          <path d="M46 14 L53 10" strokeWidth="0.5" strokeDasharray="3 1" />
          <path d="M47 16 L53.5 12" strokeWidth="0.25" />

          {/* Between beam 3 and beam 4 */}
          <path d="M53 10 L60 14" strokeWidth="0.5" strokeDasharray="3 1" />
          <path d="M53.5 12 L61 16" strokeWidth="0.25" />

          {/* Between beam 4 and beam 5 */}
          <path d="M68 16 L78 24" strokeWidth="0.5" strokeDasharray="3 1" />
          <path d="M67 18 L77 26" strokeWidth="0.25" />
        </g>

        {/* Wooden pegs/joints - MORE DETAILED */}
        <circle cx="15" cy="58" r="1.5" strokeWidth="0.9" />
        <circle cx="15" cy="58" r="0.8" strokeWidth="0.4" opacity="0.5" />
        <circle cx="35" cy="58" r="1.8" strokeWidth="1" />
        <circle cx="35" cy="58" r="1" strokeWidth="0.4" opacity="0.5" />
        <circle cx="55" cy="58" r="2" strokeWidth="1.1" />
        <circle cx="55" cy="58" r="1.2" strokeWidth="0.5" opacity="0.5" />
        <circle cx="75" cy="58" r="1.8" strokeWidth="1" />
        <circle cx="75" cy="58" r="1" strokeWidth="0.4" opacity="0.5" />
        <circle cx="92" cy="58" r="1.5" strokeWidth="0.9" />
        <circle cx="92" cy="58" r="0.8" strokeWidth="0.4" opacity="0.5" />

        {/* Iron strapping detail on center beam - more refined metal look */}
        <path d="M52 25 L58 25" strokeWidth="1.2" />
        <path d="M52 26.5 L58 26.5" strokeWidth="0.7" opacity="0.6" />
        <path d="M52 28 L58 28" strokeWidth="0.4" opacity="0.3" />
        {/* Rivet details */}
        <circle cx="53" cy="25" r="0.5" strokeWidth="0.4" opacity="0.6" />
        <circle cx="57" cy="25" r="0.5" strokeWidth="0.4" opacity="0.6" />
        {/* Rust/weathering */}
        <path d="M54 26 L54.5 26.5" strokeWidth="0.2" opacity="0.3" />
        <path d="M56 27 L56.5 27.5" strokeWidth="0.2" opacity="0.3" />
      </g>

      {/* Light and shadow effects from window */}
      <g opacity="0.12" strokeWidth="0.2" strokeDasharray="2 3">
        {/* Light rays casting across ceiling */}
        <path d="M8 82 L12 28" />
        <path d="M8 86 L12 35" />
        {/* Shadow cast by nearest beam on ceiling */}
        <path d="M88 20 L88 58" opacity="0.15" strokeWidth="0.4" />
      </g>
    </g>
  </svg>
)

/**
 * MUQARNAS CEILING - Islamic honeycomb/stalactite vaulting
 * 3D PERSPECTIVE: Looking up into complex geometric cells
 * Shows: Cascading tiers of intricate geometric cells, 8-fold symmetry
 * Distinct: Fractal-like depth, dramatic shadows, mathematical precision
 */
const MuqarnasSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="muqarnas-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#muqarnas-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - View through pointed iwan arch into muqarnas dome chamber */}
      <g strokeDasharray="3 2" opacity="0.25" strokeWidth="0.6">
        {/* IWAN ENTRANCE ARCH at viewer's position */}
        <path d="M-5 100 L-5 85 Q50 70, 105 85 L105 100" strokeWidth="0.8" />
        <path d="M0 100 L0 87 Q50 74, 100 87 L100 100" strokeWidth="0.5" opacity="0.6" />

        {/* Walls of square chamber converging upward */}
        <path d="M0 87 L0 82" strokeWidth="0.7" />
        <path d="M100 87 L100 82" strokeWidth="0.7" />
        <path d="M5 90 L5 80" strokeWidth="0.5" opacity="0.5" />
        <path d="M95 90 L95 80" strokeWidth="0.5" opacity="0.5" />

        {/* Octagonal transition zone (squinches/pendentives) */}
        <path d="M5 82 L15 78 L30 80 L50 78 L70 80 L85 78 L95 82" strokeWidth="0.6" opacity="0.5" />

        {/* Tilework bands at transition */}
        <path d="M0 85 L100 85" strokeWidth="0.3" opacity="0.4" />
        <path d="M0 88 L100 88" strokeWidth="0.3" opacity="0.4" />
        {/* Geometric tile pattern between bands */}
        <path d="M10 85 L15 88 L20 85 L25 88 L30 85 L35 88 L40 85 L45 88 L50 85 L55 88 L60 85 L65 88 L70 85 L75 88 L80 85 L85 88 L90 85" strokeWidth="0.2" opacity="0.3" />

        {/* Column/pier corners at chamber entrance */}
        <path d="M0 100 L0 85 L5 85 L5 100" strokeWidth="0.5" opacity="0.4" />
        <path d="M95 100 L95 85 L100 85 L100 100" strokeWidth="0.5" opacity="0.4" />

        {/* Mosaic floor tile hint */}
        <path d="M20 95 L30 100 M50 95 L50 100 M70 95 L80 100" strokeWidth="0.3" opacity="0.25" />
      </g>

      {/* PRIMARY - Muqarnas honeycomb cells from below */}
      <g strokeWidth="1">
        {/* Central opening (oculus or lantern) */}
        <circle cx="50" cy="25" r="8" strokeWidth="1.8" />
        <circle cx="50" cy="25" r="5" strokeWidth="1" />

        {/* First tier of cells around center (8 cells) */}
        {/* Each cell is a pointed niche shape */}
        <path d="M42 25 L35 18 L30 25 L35 32 L42 25" strokeWidth="1.2" />
        <path d="M58 25 L65 18 L70 25 L65 32 L58 25" strokeWidth="1.2" />
        <path d="M50 17 L43 10 L50 5 L57 10 L50 17" strokeWidth="1.2" />
        <path d="M50 33 L43 40 L50 45 L57 40 L50 33" strokeWidth="1.2" />

        {/* Diagonal cells */}
        <path d="M42 17 L35 10 L42 5 L48 12 L42 17" strokeWidth="1.1" />
        <path d="M58 17 L65 10 L58 5 L52 12 L58 17" strokeWidth="1.1" />
        <path d="M42 33 L35 40 L42 45 L48 38 L42 33" strokeWidth="1.1" />
        <path d="M58 33 L65 40 L58 45 L52 38 L58 33" strokeWidth="1.1" />

        {/* Second tier - larger cells radiating out */}
        <path d="M25 25 L18 18 L10 22 L15 32 L25 25" strokeWidth="1.3" />
        <path d="M75 25 L82 18 L90 22 L85 32 L75 25" strokeWidth="1.3" />
        <path d="M50 50 L40 55 L50 62 L60 55 L50 50" strokeWidth="1.3" />

        {/* Third tier - corner stalactite projections */}
        <path d="M20 12 L12 8 L5 15 L12 20 L20 12" strokeWidth="1.1" />
        <path d="M80 12 L88 8 L95 15 L88 20 L80 12" strokeWidth="1.1" />
        <path d="M30 48 L22 52 L28 60 L35 55 L30 48" strokeWidth="1.2" />
        <path d="M70 48 L78 52 L72 60 L65 55 L70 48" strokeWidth="1.2" />

        {/* Bottom row - closest cells (largest) */}
        <path d="M15 55 L8 62 L5 75 L15 70 L22 60 L15 55" strokeWidth="1.4" />
        <path d="M85 55 L92 62 L95 75 L85 70 L78 60 L85 55" strokeWidth="1.4" />
        <path d="M40 62 L35 72 L45 78 L55 78 L65 72 L60 62 L50 68 L40 62" strokeWidth="1.5" />

        {/* Cell depth shadows */}
        <path d="M32 22 L28 25" strokeWidth="0.5" opacity="0.5" />
        <path d="M68 22 L72 25" strokeWidth="0.5" opacity="0.5" />
        <path d="M50 38 L50 42" strokeWidth="0.5" opacity="0.5" />

        {/* Inner cell articulation */}
        <path d="M36 20 L33 25 L36 30" strokeWidth="0.6" opacity="0.6" />
        <path d="M64 20 L67 25 L64 30" strokeWidth="0.6" opacity="0.6" />

        {/* Star pattern in center cell */}
        <path d="M47 25 L50 22 L53 25 L50 28 Z" strokeWidth="0.7" />

        {/* Transition zone to base arch */}
        <path d="M5 75 Q25 72, 40 75 Q50 77, 60 75 Q75 72, 95 75" strokeWidth="1" opacity="0.7" />
      </g>
    </g>
  </svg>
)

/**
 * TRAY CEILING - Stepped recessed Art Deco ceiling
 * 3D PERSPECTIVE: Looking up at concentric stepping inward
 * Shows: Multiple rectangular tiers, cove lighting channels
 * Distinct: Modern elegance, clean lines, illuminated edges
 */
const TrayCeilingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="tray-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#tray-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - View from double-door entrance into formal dining room looking up */}
      <g strokeDasharray="3 2" opacity="0.25" strokeWidth="0.6">
        {/* DOUBLE DOOR ENTRANCE at viewer's position */}
        <path d="M5 100 L5 88 L95 88 L95 100" strokeWidth="0.7" />
        <path d="M10 100 L10 90 L90 90 L90 100" strokeWidth="0.5" opacity="0.6" />
        <path d="M5 88 L95 88" strokeWidth="0.9" />
        {/* Door panel hints */}
        <path d="M48 90 L48 100 M52 90 L52 100" strokeWidth="0.4" opacity="0.3" />

        {/* Walls converging to vanishing point ~(50, 5) */}
        <path d="M5 88 L5 5" strokeWidth="0.6" />
        <path d="M10 90 L15 10" strokeWidth="0.5" opacity="0.5" />
        <path d="M95 88 L95 5" strokeWidth="0.6" />
        <path d="M90 90 L85 10" strokeWidth="0.5" opacity="0.5" />
        {/* Far wall */}
        <path d="M5 5 L95 5" strokeWidth="0.5" />

        {/* Crown molding at wall-ceiling junction (converging) */}
        <path d="M8 82 L95 82" strokeWidth="0.4" opacity="0.5" />
        <path d="M12 80 L88 80" strokeWidth="0.3" opacity="0.4" />

        {/* Wainscoting panels on near walls */}
        <path d="M5 90 L10 86 L10 90" strokeWidth="0.3" opacity="0.3" />
        <path d="M95 90 L90 86 L90 90" strokeWidth="0.3" opacity="0.3" />

        {/* Window on far wall (light source) */}
        <path d="M35 5 L35 15 L65 15 L65 5" strokeWidth="0.4" opacity="0.4" />
      </g>

      {/* PRIMARY - Stepped tray ceiling with perspective */}
      <g strokeWidth="1.2">
        {/* Outer frame - first tier (closest to walls, largest) */}
        <path d="M5 82 L5 72 L20 60 L80 60 L95 72 L95 82" strokeWidth="1.8" />
        <path d="M5 72 L95 72" strokeWidth="1.5" />

        {/* Cove lighting channel 1 (glowing edge) */}
        <path d="M8 70 L20 62 L80 62 L92 70" strokeWidth="0.6" strokeDasharray="4 2" opacity="0.5" />

        {/* Second tier step in */}
        <path d="M15 60 L15 52 L28 42 L72 42 L85 52 L85 60" strokeWidth="1.6" />
        <path d="M15 52 L85 52" strokeWidth="1.3" />

        {/* Cove lighting channel 2 */}
        <path d="M18 50 L28 44 L72 44 L82 50" strokeWidth="0.6" strokeDasharray="4 2" opacity="0.5" />

        {/* Third tier - innermost step */}
        <path d="M25 42 L25 35 L38 28 L62 28 L75 35 L75 42" strokeWidth="1.4" />
        <path d="M25 35 L75 35" strokeWidth="1.2" />

        {/* Cove lighting channel 3 */}
        <path d="M28 33 L38 30 L62 30 L72 33" strokeWidth="0.6" strokeDasharray="4 2" opacity="0.5" />

        {/* Central flat ceiling with medallion */}
        <path d="M35 28 L35 18 L65 18 L65 28" strokeWidth="1" />
        <path d="M35 18 L65 18" strokeWidth="1.3" />

        {/* Central decorative medallion */}
        <ellipse cx="50" cy="23" rx="10" ry="4" strokeWidth="1.3" />
        <ellipse cx="50" cy="23" rx="6" ry="2.5" strokeWidth="0.9" />

        {/* Chandelier or pendant */}
        <path d="M50 27 L50 45" strokeWidth="0.8" />
        <path d="M46 45 L54 45" strokeWidth="0.7" />
        <path d="M44 48 L56 48" strokeWidth="0.8" />
        <path d="M47 48 L47 55" strokeWidth="0.5" />
        <path d="M53 48 L53 55" strokeWidth="0.5" />
        <ellipse cx="50" cy="56" rx="5" ry="2" strokeWidth="0.7" />

        {/* Art Deco corner accents */}
        <path d="M8 75 L12 75 L12 68" strokeWidth="1" />
        <path d="M88 75 L92 75 L92 68" strokeWidth="1" />

        {/* Vertical step transitions (showing depth) */}
        <path d="M20 60 L15 60" strokeWidth="0.8" opacity="0.6" />
        <path d="M80 60 L85 60" strokeWidth="0.8" opacity="0.6" />
        <path d="M28 42 L25 42" strokeWidth="0.7" opacity="0.6" />
        <path d="M72 42 L75 42" strokeWidth="0.7" opacity="0.6" />

        {/* Subtle surface texture */}
        <path d="M40 23 L60 23" strokeWidth="0.3" opacity="0.3" />
      </g>
    </g>
  </svg>
)

/**
 * REFLECTED CEILING PLAN (RCP) - Technical architectural drawing
 * PLAN VIEW: Looking down at a mirror on the floor reflecting the ceiling
 * Shows: Lighting fixtures, HVAC diffusers, sprinklers, smoke detectors, ceiling grid
 * Distinct: Architectural documentation with standardized symbols
 */
const ReflectedCeilingPlanSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="rcp-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#rcp-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Room outline with wall thickness, door opening, and column grid */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.8">
        {/* Outer wall (thick wall representation) */}
        <rect x="7" y="7" width="86" height="86" />
        {/* Inner wall face */}
        <rect x="10" y="10" width="80" height="80" />

        {/* Door opening with swing arc (bottom wall) */}
        <line x1="35" y1="90" x2="35" y2="93" strokeWidth="0.6" />
        <line x1="50" y1="90" x2="50" y2="93" strokeWidth="0.6" />
        <path d="M 35 90 Q 35 80, 45 80" strokeWidth="0.4" opacity="0.5" strokeDasharray="1 2" />

        {/* Column grid reference markers */}
        <circle cx="7" cy="3" r="2.5" strokeWidth="0.5" opacity="0.5" />
        <text x="7" y="4" fontSize="2.5" textAnchor="middle" fill="currentColor" opacity="0.4" fontWeight="bold">A</text>
        <circle cx="93" cy="3" r="2.5" strokeWidth="0.5" opacity="0.5" />
        <text x="93" y="4" fontSize="2.5" textAnchor="middle" fill="currentColor" opacity="0.4" fontWeight="bold">B</text>
        <circle cx="3" cy="10" r="2.5" strokeWidth="0.5" opacity="0.5" />
        <text x="3" y="11" fontSize="2.5" textAnchor="middle" fill="currentColor" opacity="0.4" fontWeight="bold">1</text>
        <circle cx="3" cy="90" r="2.5" strokeWidth="0.5" opacity="0.5" />
        <text x="3" y="91" fontSize="2.5" textAnchor="middle" fill="currentColor" opacity="0.4" fontWeight="bold">2</text>

        {/* Ceiling height annotation */}
        <text x="88" y="97" fontSize="2" fill="currentColor" opacity="0.4">9&apos;-0&quot; AFF</text>
      </g>

      {/* PRIMARY - Ceiling grid (2'x2' acoustical tile) */}
      <g opacity="0.25" strokeWidth="0.4">
        {[20, 30, 40, 50, 60, 70, 80].map((pos, i) => (
          <React.Fragment key={`grid-${i}`}>
            <line x1={pos} y1="10" x2={pos} y2="90" />
            <line x1="10" y1={pos} x2="90" y2={pos} />
          </React.Fragment>
        ))}
      </g>

      {/* RECESSED LIGHTS - highlighted with halo */}
      <g strokeWidth="1.5">
        {/* 3x3 grid of recessed lights */}
        {[25, 50, 75].map((x, i) =>
          [25, 50, 75].map((y, j) => (
            <g key={`light-${i}-${j}`}>
              <circle cx={x} cy={y} r="3" />
              <line x1={x-2} y1={y-2} x2={x+2} y2={y+2} strokeWidth="1" />
              <line x1={x-2} y1={y+2} x2={x+2} y2={y-2} strokeWidth="1" />
            </g>
          ))
        )}
      </g>

      {/* HVAC LINEAR DIFFUSERS */}
      <g strokeWidth="1.2" opacity="0.8">
        {/* Left diffuser */}
        <rect x="16" y="47.5" width="6" height="5" rx="0.5" />
        <line x1="17" y1="49" x2="21" y2="49" strokeWidth="0.5" />
        <line x1="17" y1="51" x2="21" y2="51" strokeWidth="0.5" />

        {/* Right diffuser */}
        <rect x="78" y="47.5" width="6" height="5" rx="0.5" />
        <line x1="79" y1="49" x2="83" y2="49" strokeWidth="0.5" />
        <line x1="79" y1="51" x2="83" y2="51" strokeWidth="0.5" />
      </g>

      {/* RETURN AIR GRILLE (troffer style) */}
      <g strokeWidth="1" opacity="0.7">
        <rect x="48" y="44" width="4" height="12" rx="0.5" />
        {[46, 48, 50, 52, 54].map((y, i) => (
          <line key={`grille-${i}`} x1="48.5" y1={y} x2="51.5" y2={y} strokeWidth="0.3" />
        ))}
      </g>

      {/* SPRINKLER HEADS - with coverage radius */}
      <g strokeWidth="1.3">
        {[[25, 35], [75, 35], [25, 65], [75, 65]].map(([x, y], i) => (
          <g key={`sprinkler-${i}`}>
            <circle cx={x} cy={y} r="1.5" fill="none" />
            <circle cx={x} cy={y} r="0.5" fill="currentColor" />
            <line x1={x-2} y1={y} x2={x-3.5} y2={y} strokeWidth="0.8" />
            <line x1={x+2} y1={y} x2={x+3.5} y2={y} strokeWidth="0.8" />
            <line x1={x} y1={y-2} x2={x} y2={y-3.5} strokeWidth="0.8" />
            <line x1={x} y1={y+2} x2={x} y2={y+3.5} strokeWidth="0.8" />
            {/* Coverage radius */}
            <circle cx={x} cy={y} r="7.5" strokeWidth="0.3" strokeDasharray="1 1" opacity="0.25" />
          </g>
        ))}
      </g>

      {/* SMOKE DETECTORS */}
      <g strokeWidth="1.2" opacity="0.75">
        {[[50, 15], [50, 85]].map(([x, y], i) => (
          <g key={`smoke-${i}`}>
            <circle cx={x} cy={y} r="2" />
            <line x1={x-1.5} y1={y} x2={x+1.5} y2={y} strokeWidth="0.9" />
            <line x1={x} y1={y-1.5} x2={x} y2={y+1.5} strokeWidth="0.9" />
          </g>
        ))}
      </g>

      {/* ELECTRICAL CIRCUIT - connecting top row lights */}
      <g strokeWidth="0.7" strokeDasharray="2 1.5" opacity="0.4">
        <path d="M 25 25 Q 37.5 23, 50 25 Q 62.5 27, 75 25" />
        <line x1="50" y1="25" x2="50" y2="10" />
      </g>

      {/* SWITCH SYMBOL */}
      <g>
        <circle cx="50" cy="10" r="1.3" fill="currentColor" opacity="0.6" />
        <text x="50" y="7" fontSize="3" textAnchor="middle" fill="currentColor" opacity="0.7" fontWeight="bold">S</text>
      </g>

      {/* EXIT SIGN */}
      <g opacity="0.6">
        <rect x="44" y="87.5" width="12" height="3" strokeWidth="0.8" rx="0.5" />
        <text x="50" y="90" fontSize="2" textAnchor="middle" fill="currentColor" fontWeight="bold">EXIT</text>
      </g>

      {/* SPEAKER (PA system) */}
      <g strokeWidth="1" opacity="0.6">
        <circle cx="15" cy="15" r="1.8" />
        <circle cx="15" cy="15" r="1" />
        <circle cx="15" cy="15" r="0.4" fill="currentColor" />
      </g>

      {/* TITLE ANNOTATION */}
      <g opacity="0.5">
        <text x="11" y="96" fontSize="2.5" fill="currentColor">RCP</text>
      </g>
    </g>
  </svg>
)

// Export mapping for all ceiling elements - MATCHING DATA FILE IDS
export const CEILING_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'ceiling-rose': CeilingRoseSVG,
  'coffered-ceiling': CofferedCeilingSVG,
  'coved-ceiling': CovedCeilingSVG,
  'dropped-ceiling': DroppedCeilingSVG,
  'exposed-beams': ExposedBeamsSVG,
  'muqarnas': MuqarnasSVG,
  'tray-ceiling': TrayCeilingSVG,
  'reflected-ceiling-plan': ReflectedCeilingPlanSVG,
}

export {
  CeilingRoseSVG,
  CofferedCeilingSVG,
  CovedCeilingSVG,
  DroppedCeilingSVG,
  ExposedBeamsSVG,
  MuqarnasSVG,
  TrayCeilingSVG,
  ReflectedCeilingPlanSVG,
}
