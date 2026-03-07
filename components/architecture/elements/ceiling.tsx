'use client'

import React from 'react'
import { MaterialPatterns } from './materialPatterns'
import { S } from './svgStyleTokens'

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
      {/* CONTEXT (near): View from doorway looking up into parlor room */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
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

      {/* PRIMARY: Ceiling rose in perspective (elliptical, tilted) */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Outer ring - perspective ellipse */}
        <ellipse cx="50" cy="45" rx="38" ry="28" strokeWidth={S.P.strokeWidthBold} />

        {/* Second decorative ring */}
        <ellipse cx="50" cy="45" rx="30" ry="22" strokeWidth={S.P.strokeWidth} />

        {/* Inner medallion ring */}
        <ellipse cx="50" cy="45" rx="20" ry="14" strokeWidth={S.P.strokeWidth} />

        {/* Center rose for chandelier attachment */}
        <ellipse cx="50" cy="45" rx="8" ry="5" strokeWidth={S.P.strokeWidthBold} />

        {/* Chandelier chain dropping down toward viewer */}
        <path d="M50 50 L50 75" strokeWidth={S.P.strokeWidthLight} />
        <path d="M48 75 L52 75 L54 85 L46 85 Z" strokeWidth={S.D.strokeWidth} />

        {/* Acanthus leaves radiating out (8 leaves, perspective adjusted) */}
        {/* Top leaves (farther, smaller) */}
        <path d="M50 23 Q45 28, 50 31 Q55 28, 50 23" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 23 L50 17" strokeWidth={S.D.strokeWidth} />

        {/* Side leaves (larger, closer) */}
        <path d="M18 42 Q22 45, 20 50 Q18 45, 18 42" strokeWidth={S.P.strokeWidthLight} />
        <path d="M12 44 L18 42" strokeWidth={S.D.strokeWidth} />
        <path d="M82 42 Q78 45, 80 50 Q82 45, 82 42" strokeWidth={S.P.strokeWidthLight} />
        <path d="M88 44 L82 42" strokeWidth={S.D.strokeWidth} />

        {/* Bottom leaves (closest, largest due to perspective) */}
        <path d="M50 67 Q42 62, 48 58 Q52 62, 50 67" strokeWidth={S.P.strokeWidth} />
        <path d="M50 73 L50 67" strokeWidth={S.D.strokeWidth} />

        {/* Diagonal leaves */}
        <path d="M25 28 Q30 32, 28 38" strokeWidth={S.P.strokeWidthLight} />
        <path d="M75 28 Q70 32, 72 38" strokeWidth={S.P.strokeWidthLight} />
        <path d="M28 60 Q34 58, 35 52" strokeWidth={S.P.strokeWidthLight} />
        <path d="M72 60 Q66 58, 65 52" strokeWidth={S.P.strokeWidthLight} />

        {/* DETAIL: Petal details between leaves */}
        <path d="M35 30 Q40 35, 38 40" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M65 30 Q60 35, 62 40" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M35 55 Q40 52, 42 48" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M65 55 Q60 52, 58 48" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* DETAIL: Relief depth shadows on far side */}
        <path d="M22 35 Q30 38, 35 32" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M78 35 Q70 38, 65 32" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
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
      {/* CONTEXT (near): View from end of grand hall looking up at Pantheon-style ceiling */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
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

      {/* PRIMARY: Coffered grid in perspective (converging to center) */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Outer frame of coffered area */}
        <path d="M5 85 L25 65 L75 65 L95 85" strokeWidth={S.P.strokeWidth} />
        <path d="M25 65 L25 25 L75 25 L75 65" strokeWidth={S.P.strokeWidth} />
        <path d="M5 85 L5 45 L25 25" strokeWidth={S.P.strokeWidth} />
        <path d="M95 85 L95 45 L75 25" strokeWidth={S.P.strokeWidth} />

        {/* TOP ROW coffers (far from viewer, smallest) */}
        {/* Coffer 1 */}
        <path d="M28 28 L28 38 L42 38 L42 28 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M30 30 L30 36 L40 36 L40 30 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        {/* Coffer 2 */}
        <path d="M45 28 L45 38 L55 38 L55 28 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M47 30 L47 36 L53 36 L53 30 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        {/* Coffer 3 */}
        <path d="M58 28 L58 38 L72 38 L72 28 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M60 30 L60 36 L70 36 L70 30 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* MIDDLE ROW coffers (medium) */}
        {/* Coffer 4 */}
        <path d="M26 42 L26 55 L43 55 L43 42 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M28 44 L28 53 L41 53 L41 44 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        {/* Coffer 5 - center with rosette */}
        <path d="M46 42 L46 55 L54 55 L54 42 Z" strokeWidth={S.P.strokeWidth} />
        <circle cx="50" cy="48" r="4" strokeWidth={S.D.strokeWidth} />
        <circle cx="50" cy="48" r="2" strokeWidth={S.D.strokeWidthFine} />
        {/* Coffer 6 */}
        <path d="M57 42 L57 55 L74 55 L74 42 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M59 44 L59 53 L72 53 L72 44 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* BOTTOM ROW coffers (closest, largest due to perspective) */}
        {/* Coffer 7 */}
        <path d="M12 62 L24 58 L24 75 L8 82 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M14 65 L22 62 L22 73 L12 78 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        {/* Coffer 8 */}
        <path d="M27 58 L45 58 L45 75 L27 75 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M29 60 L43 60 L43 73 L29 73 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <circle cx="36" cy="66" r="3" strokeWidth={S.D.strokeWidth} />
        {/* Coffer 9 */}
        <path d="M55 58 L73 58 L73 75 L55 75 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M57 60 L71 60 L71 73 L57 73 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <circle cx="64" cy="66" r="3" strokeWidth={S.D.strokeWidth} />
        {/* Coffer 10 */}
        <path d="M76 58 L88 62 L92 82 L76 75 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M78 62 L86 65 L88 78 L78 73 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* DETAIL: Beam edges between coffers */}
        <path d="M43 28 L43 75" strokeWidth={S.D.strokeWidth} />
        <path d="M57 28 L57 75" strokeWidth={S.D.strokeWidth} />
        <path d="M25 40 L75 40" strokeWidth={S.D.strokeWidth} />
        <path d="M25 57 L75 57" strokeWidth={S.D.strokeWidth} />
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
      {/* CONTEXT (near): View from doorway into room with coved ceiling */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
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

      {/* PRIMARY: Coved ceiling curves in perspective */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Left wall cove profile (showing the curve) */}
        <path d="M0 55 Q0 35, 20 30 Q40 28, 55 30" strokeWidth={S.P.strokeWidthBold} />

        {/* Right wall cove sweeping across */}
        <path d="M100 45 Q95 30, 75 25 Q55 22, 55 30" strokeWidth={S.P.strokeWidth} />

        {/* Flat ceiling plane in center */}
        <path d="M55 30 L55 5 L95 8 L95 25" strokeWidth={S.P.strokeWidthLight} opacity="0.6" />
        <path d="M20 30 L20 8 L55 5" strokeWidth={S.P.strokeWidthLight} opacity="0.6" />

        {/* Cove molding detail on left (closest, largest) */}
        <path d="M0 52 Q2 38, 18 33" strokeWidth={S.P.strokeWidth} />
        <path d="M0 48 Q5 35, 22 30" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Cove molding detail on right (receding) */}
        <path d="M95 42 Q90 32, 72 27" strokeWidth={S.P.strokeWidthLight} />
        <path d="M98 38 Q92 30, 75 25" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* DETAIL: Decorative bead molding along cove edge */}
        <path d="M5 50 Q15 42, 25 38 Q35 35, 45 33 Q55 32, 65 30 Q75 28, 85 30 Q92 32, 96 38" strokeWidth={S.D.strokeWidth} strokeDasharray="2 1.5" />

        {/* Crown molding at wall-cove transition */}
        <path d="M0 55 L0 58" strokeWidth={S.P.strokeWidthBold} />
        <path d="M0 58 Q10 52, 15 48" strokeWidth={S.P.strokeWidthLight} />

        {/* DETAIL: Corner junction detail */}
        <path d="M0 55 Q8 48, 12 40 Q15 35, 20 30" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* DETAIL: Ceiling surface texture lines */}
        <path d="M25 15 L60 12" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M30 20 L65 17" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* EFFECTS: Light reflection on cove curve */}
        <path d="M8 42 Q18 38, 28 35" strokeWidth={S.E.strokeWidth} opacity={S.E.opacityModerate} />
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
      {/* CONTEXT (near): View from office doorway looking up at suspended ceiling */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
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

      {/* PRIMARY: Suspended grid in steep perspective */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Vanishing point near center top - main T-bar grid */}

        {/* Horizontal T-bars (curved for perspective) */}
        <path d="M5 75 Q50 60, 95 75" strokeWidth={S.P.strokeWidth} />
        <path d="M12 55 Q50 42, 88 55" strokeWidth={S.P.strokeWidth} />
        <path d="M20 38 Q50 28, 80 38" strokeWidth={S.P.strokeWidth} />
        <path d="M30 24 Q50 18, 70 24" strokeWidth={S.P.strokeWidthLight} />
        <path d="M42 14 Q50 11, 58 14" strokeWidth={S.P.strokeWidthLight} />

        {/* Vertical T-bars converging to vanishing point */}
        <path d="M15 72 L42 14" strokeWidth={S.P.strokeWidth} />
        <path d="M35 68 L46 14" strokeWidth={S.P.strokeWidth} />
        <path d="M50 65 L50 12" strokeWidth={S.P.strokeWidthLight} />
        <path d="M65 68 L54 14" strokeWidth={S.P.strokeWidth} />
        <path d="M85 72 L58 14" strokeWidth={S.P.strokeWidth} />

        {/* DETAIL: Acoustic tiles (shown as recessed panels) */}
        {/* Bottom row - largest tiles (closest) */}
        <path d="M18 73 L33 66 L45 68 L36 76 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M55 68 L67 66 L82 73 L64 76 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Middle row tiles */}
        <path d="M22 54 L34 45 L48 48 L38 56 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M52 48 L66 45 L78 54 L62 56 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Fluorescent light fixture (2x4 troffer) */}
        <path d="M38 42 L47 35 L53 35 L62 42 L62 52 L53 48 L47 48 L38 52 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M42 40 L48 36 L52 36 L58 40" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M44 45 L56 45" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Air return grille (perforated) */}
        <path d="M22 35 L30 28 L42 30 L35 38 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M25 33 L28 30" strokeWidth={S.D.strokeWidthFine} />
        <path d="M28 35 L31 32" strokeWidth={S.D.strokeWidthFine} />
        <path d="M31 33 L34 30" strokeWidth={S.D.strokeWidthFine} />
        <path d="M32 36 L35 33" strokeWidth={S.D.strokeWidthFine} />

        {/* Sprinkler head */}
        <circle cx="72" cy="32" r="2" strokeWidth={S.D.strokeWidth} />
        <path d="M72 30 L72 26" strokeWidth={S.D.strokeWidthFine} />

        {/* One tile missing showing plenum space */}
        <path d="M68 50 L75 45 L85 48 L80 55 Z" strokeDasharray={S.CN.dash} strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        {/* Ductwork visible above */}
        <path d="M70 48 L78 44" strokeWidth={S.D.strokeWidthFine} strokeDasharray="1 1" opacity={S.D.opacitySubtle} />
        <path d="M74 52 L74 46" strokeWidth={S.D.strokeWidthFine} strokeDasharray="1 1" opacity={S.D.opacitySubtle} />

        {/* EFFECTS: Suspension wires (barely visible) */}
        <path d="M50 12 L50 5" strokeWidth={S.E.strokeWidth} strokeDasharray={S.E.dash} opacity={S.E.opacity} />
        <path d="M30 24 L28 15" strokeWidth={S.E.strokeWidth} strokeDasharray={S.E.dash} opacity={S.E.opacity} />
        <path d="M70 24 L72 15" strokeWidth={S.E.strokeWidth} strokeDasharray={S.E.dash} opacity={S.E.opacity} />
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
      {/* CONTEXT (near): RICH ENVIRONMENTAL SETTING */}

      {/* CONTEXT (near): Room corner - where two walls meet the ceiling */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M0 100 L0 60" />
        <path d="M100 100 L100 60" />
        {/* Wall corner detail */}
        <path d="M0 60 L0 55 L100 55 L100 60" opacity="0.15" />
      </g>

      {/* CONTEXT (near): Stone/plaster walls with detailed texture */}
      <g opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidthFine}>
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

      {/* CONTEXT (near): Window opening hint on left wall */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacitySubtle} strokeWidth={S.CN.strokeWidthFine}>
        <path d="M0 75 L0 95 L4 95 L4 75" />
        <path d="M0 85 L4 85" />
        {/* Light coming through window */}
        <path d="M4 80 L8 78" strokeDasharray="1 1.5" opacity="0.25" />
        <path d="M4 88 L8 86" strokeDasharray="1 1.5" opacity="0.25" />
      </g>

      {/* CONTEXT (far): Floor suggestion far below (perspective) */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        <path d="M5 100 L95 100" />
        <path d="M10 99 L90 99" opacity="0.5" />
      </g>

      {/* EFFECTS: PERSPECTIVE GRID - Single vanishing point at (50, 2) */}
      <g opacity={S.E.fillOpacity} strokeWidth="0.2" strokeDasharray={S.E.dash}>
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

      {/* PRIMARY: Exposed timber structure with TRUE SINGLE-POINT PERSPECTIVE */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Main beam (wall plate) - CONVERGING toward vanishing point */}
        {/* Near edge (at viewer) */}
        <path d="M0 58 L100 58" strokeWidth={S.P.strokeWidthHeavy} />
        <path d="M0 61 L100 61" strokeWidth={S.P.strokeWidthBold} opacity={S.D.opacity} />
        <path d="M0 63 L100 63" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        {/* Far edges converging */}
        <path d="M10 5 L90 5" strokeWidth={S.P.strokeWidthLight} opacity={S.D.opacitySubtle} />
        <path d="M20 3 L80 3" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Beam 1 - CONVERGING toward vanishing point (15, 58) → (32, 8) */}
        {/* Main beam center line */}
        <path d="M15 58 L32 8" strokeWidth={S.P.strokeWidthHeavy} />
        {/* Right edge (showing depth) */}
        <path d="M18 58 L34 9" strokeWidth={S.P.strokeWidthBold} opacity={S.D.opacity} />
        {/* Left edge (showing depth) */}
        <path d="M12 58 L30 9" strokeWidth={S.P.strokeWidthBold} opacity={S.D.opacity} />
        {/* DETAIL: Wood grain texture - more detailed, transformed for perspective */}
        <path d="M13.5 48 Q14.5 50, 15.5 48" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M15 35 Q16 37, 17 35" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M20 20 Q21 22, 22 20" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        {/* DETAIL: Knot detail (foreshortened in distance) */}
        <ellipse cx="18" cy="28" rx="0.8" ry="1.2" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        {/* EFFECTS: Shadow on underside */}
        <path d="M12 58 L30 9" strokeWidth={S.E.strokeWidth} opacity={S.E.opacity} strokeDasharray="1 1" />

        {/* Beam 2 - CONVERGING toward vanishing point (35, 58) → (44, 5) */}
        {/* Main beam center line */}
        <path d="M35 58 L44 5" strokeWidth={S.P.strokeWidthHeavy} />
        {/* Right edge (showing depth) */}
        <path d="M38 58 L46 6" strokeWidth={S.P.strokeWidthBold} opacity={S.D.opacity} />
        {/* Left edge (showing depth) */}
        <path d="M32 58 L42 6" strokeWidth={S.P.strokeWidthBold} opacity={S.D.opacity} />
        {/* DETAIL: Wood grain texture (perspective-adjusted) */}
        <path d="M33.5 48 Q34.5 50, 35.5 48" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M36 32 Q37 34, 38 32" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M40 18 Q41 20, 42 18" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        {/* DETAIL: Chamfered edge detail */}
        <path d="M38 58 L39 57" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M45 7 L46 8" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Beam 3 - center - CONVERGING toward vanishing point (55, 58) → (52, 3) */}
        {/* Main beam center line (largest, closest to viewer) */}
        <path d="M55 58 L52 3" strokeWidth={S.P.strokeWidthHeavy} />
        {/* Right edge (showing depth) */}
        <path d="M59 58 L54 4" strokeWidth={S.P.strokeWidthBold} opacity={S.D.opacity} />
        {/* Left edge (showing depth) */}
        <path d="M51 58 L50 4" strokeWidth={S.P.strokeWidthBold} opacity={S.D.opacity} />
        {/* DETAIL: Rich wood grain texture (perspective-adjusted) */}
        <path d="M52.5 48 Q53.5 50, 54.5 48" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M53 35 Q54 37, 55 35" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M52 22 Q52.5 24, 53 22" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        {/* DETAIL: Large knot with detail (foreshortened) */}
        <ellipse cx="54" cy="30" rx="1.3" ry="1.8" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <circle cx="54" cy="30" r="0.7" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        {/* DETAIL: Wood split/crack */}
        <path d="M53 18 L53.2 20 L52.8 22" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} strokeDasharray="1 0.5" />

        {/* Beam 4 - CONVERGING toward vanishing point (75, 58) → (56, 5) */}
        {/* Main beam center line */}
        <path d="M75 58 L56 5" strokeWidth={S.P.strokeWidthHeavy} />
        {/* Right edge (showing depth) */}
        <path d="M78 58 L58 6" strokeWidth={S.P.strokeWidthBold} opacity={S.D.opacity} />
        {/* Left edge (showing depth) */}
        <path d="M72 58 L54 6" strokeWidth={S.P.strokeWidthBold} opacity={S.D.opacity} />
        {/* DETAIL: Wood grain (perspective-adjusted) */}
        <path d="M73.5 48 Q74.5 50, 75.5 48" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M70 32 Q71 34, 72 32" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M62 18 Q63 20, 64 18" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Beam 5 - CONVERGING toward vanishing point (92, 58) → (68, 8) */}
        {/* Main beam center line */}
        <path d="M92 58 L68 8" strokeWidth={S.P.strokeWidthHeavy} />
        {/* Right edge (showing depth) */}
        <path d="M95 58 L70 9" strokeWidth={S.P.strokeWidthBold} opacity={S.D.opacity} />
        {/* Left edge (showing depth) */}
        <path d="M89 58 L66 9" strokeWidth={S.P.strokeWidthBold} opacity={S.D.opacity} />
        {/* DETAIL: Wood grain (perspective-adjusted) */}
        <path d="M90.5 48 Q91.5 50, 92.5 48" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M85 35 Q86 37, 87 35" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M72 20 Q73 22, 74 20" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Smaller purlins running perpendicular - PERSPECTIVE-CORRECTED */}
        {/* Upper purlin near vanishing point (connecting far ends of beams) */}
        <path d="M30 9 L42 6" strokeWidth={S.P.strokeWidthLight} />
        <path d="M30 9.5 L42 6.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M42 6 L52 4" strokeWidth={S.P.strokeWidth} />
        <path d="M42 6.5 L52 4.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M52 4 L58 6" strokeWidth={S.P.strokeWidth} />
        <path d="M52 4.5 L58 6.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M58 6 L70 9" strokeWidth={S.P.strokeWidthLight} />
        <path d="M58 6.5 L70 9.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Lower purlin at mid-distance (connecting beams at mid-points) */}
        <path d="M24 32 L39 20" strokeWidth={S.P.strokeWidth} />
        <path d="M24 32.5 L39 20.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M39 20 L53 12" strokeWidth={S.P.strokeWidth} />
        <path d="M39 20.5 L53 12.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M53 12 L64 20" strokeWidth={S.P.strokeWidth} />
        <path d="M53 12.5 L64 20.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M64 20 L80 32" strokeWidth={S.P.strokeWidth} />
        <path d="M64 20.5 L80 32.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* DETAIL: ENHANCED ceiling boards between beams - PERSPECTIVE-CORRECTED */}
        <g opacity={S.D.opacitySubtle}>
          {/* Board planks with wood grain - following perspective convergence */}
          {/* Between beam 1 and beam 2 */}
          <path d="M28 24 L38 16" strokeWidth={S.D.strokeWidthFine} strokeDasharray="3 1" />
          <path d="M29 26 L39 18" strokeWidth={S.D.strokeWidthFine} />
          <path d="M27 28 L37 20" strokeWidth={S.D.strokeWidthFine} strokeDasharray="3 1" />

          {/* Between beam 2 and beam 3 */}
          <path d="M46 14 L53 10" strokeWidth={S.D.strokeWidthFine} strokeDasharray="3 1" />
          <path d="M47 16 L53.5 12" strokeWidth={S.D.strokeWidthFine} />

          {/* Between beam 3 and beam 4 */}
          <path d="M53 10 L60 14" strokeWidth={S.D.strokeWidthFine} strokeDasharray="3 1" />
          <path d="M53.5 12 L61 16" strokeWidth={S.D.strokeWidthFine} />

          {/* Between beam 4 and beam 5 */}
          <path d="M68 16 L78 24" strokeWidth={S.D.strokeWidthFine} strokeDasharray="3 1" />
          <path d="M67 18 L77 26" strokeWidth={S.D.strokeWidthFine} />
        </g>

        {/* DETAIL: Wooden pegs/joints - MORE DETAILED */}
        <circle cx="15" cy="58" r="1.5" strokeWidth={S.D.strokeWidth} />
        <circle cx="15" cy="58" r="0.8" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <circle cx="35" cy="58" r="1.8" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="35" cy="58" r="1" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <circle cx="55" cy="58" r="2" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="55" cy="58" r="1.2" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <circle cx="75" cy="58" r="1.8" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="75" cy="58" r="1" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <circle cx="92" cy="58" r="1.5" strokeWidth={S.D.strokeWidth} />
        <circle cx="92" cy="58" r="0.8" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

        {/* DETAIL: Iron strapping detail on center beam - more refined metal look */}
        <path d="M52 25 L58 25" strokeWidth={S.P.strokeWidthLight} />
        <path d="M52 26.5 L58 26.5" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M52 28 L58 28" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        {/* Rivet details */}
        <circle cx="53" cy="25" r="0.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <circle cx="57" cy="25" r="0.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        {/* Rust/weathering */}
        <path d="M54 26 L54.5 26.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M56 27 L56.5 27.5" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      </g>

      {/* EFFECTS: Light and shadow effects from window */}
      <g opacity={S.E.opacity} strokeWidth={S.E.strokeWidth} strokeDasharray={S.E.dash}>
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
      {/* CONTEXT (near): View through pointed iwan arch into muqarnas dome chamber */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
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

      {/* PRIMARY: Muqarnas concave honeycomb cells from below */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Central opening (oculus or lantern) */}
        <circle cx="50" cy="25" r="8" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="50" cy="25" r="5" strokeWidth={S.P.strokeWidthLight} />

        {/* First tier - 8 concave niche cells around center with pointed-arch tops */}
        {/* Cardinal cells */}
        <path d="M30 20 Q35 15, 42 20 L42 30 Q35 35, 30 30 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M30 23 Q35 19, 42 23" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M58 20 Q65 15, 70 20 L70 30 Q65 35, 58 30 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M58 23 Q65 19, 70 23" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M45 5 Q50 0, 55 5 L55 17 Q50 22, 45 17 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M45 8 Q50 4, 55 8" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M45 33 Q50 28, 55 33 L55 45 Q50 50, 45 45 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M45 36 Q50 32, 55 36" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

        {/* Diagonal cells */}
        <path d="M33 8 Q38 4, 43 8 L43 16 Q38 20, 33 16 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M57 8 Q62 4, 67 8 L67 16 Q62 20, 57 16 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M33 34 Q38 30, 43 34 L43 42 Q38 46, 33 42 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M57 34 Q62 30, 67 34 L67 42 Q62 46, 57 42 Z" strokeWidth={S.P.strokeWidthLight} />

        {/* Second tier - larger concave cells radiating out */}
        <path d="M10 16 Q18 10, 26 16 L26 30 Q18 36, 10 30 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M10 20 Q18 15, 26 20" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M74 16 Q82 10, 90 16 L90 30 Q82 36, 74 30 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M74 20 Q82 15, 90 20" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M38 48 Q50 42, 62 48 L62 60 Q50 66, 38 60 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M38 52 Q50 47, 62 52" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

        {/* Third tier - corner cells (largest, closest to viewer) */}
        <path d="M5 40 Q15 32, 25 40 L25 58 Q15 64, 5 58 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M5 45 Q15 38, 25 45" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M75 40 Q85 32, 95 40 L95 58 Q85 64, 75 58 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M75 45 Q85 38, 95 45" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M30 60 Q50 52, 70 60 L70 76 Q50 82, 30 76 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M30 65 Q50 58, 70 65" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Horizontal shelf lines between tiers */}
        <path d="M26 20 L30 20" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M70 20 L74 20" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M25 40 L30 42" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M70 42 L75 40" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Star pattern in center */}
        <path d="M47 25 L50 22 L53 25 L50 28 Z" strokeWidth={S.D.strokeWidth} />

        {/* Transition zone to base arch */}
        <path d="M5 75 Q25 70, 40 75 Q50 78, 60 75 Q75 70, 95 75" strokeWidth={S.P.strokeWidthLight} opacity={S.D.opacityStrong} />
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
      {/* CONTEXT (near): View from double-door entrance into formal dining room looking up */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
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

      {/* PRIMARY: Stepped tray ceiling with perspective */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Outer frame - first tier (closest to walls, largest) */}
        <path d="M5 82 L5 72 L20 60 L80 60 L95 72 L95 82" strokeWidth={S.P.strokeWidthBold} />
        <path d="M5 72 L95 72" strokeWidth={S.P.strokeWidth} />

        {/* EFFECTS: Cove lighting channel 1 (glowing edge) */}
        <path d="M8 70 L20 62 L80 62 L92 70" strokeWidth={S.E.strokeWidth} strokeDasharray="4 2" opacity={S.E.opacityModerate} />

        {/* Second tier step in */}
        <path d="M15 60 L15 52 L28 42 L72 42 L85 52 L85 60" strokeWidth={S.P.strokeWidth} />
        <path d="M15 52 L85 52" strokeWidth={S.P.strokeWidth} />

        {/* EFFECTS: Cove lighting channel 2 */}
        <path d="M18 50 L28 44 L72 44 L82 50" strokeWidth={S.E.strokeWidth} strokeDasharray="4 2" opacity={S.E.opacityModerate} />

        {/* Third tier - innermost step */}
        <path d="M25 42 L25 35 L38 28 L62 28 L75 35 L75 42" strokeWidth={S.P.strokeWidth} />
        <path d="M25 35 L75 35" strokeWidth={S.P.strokeWidthLight} />

        {/* EFFECTS: Cove lighting channel 3 */}
        <path d="M28 33 L38 30 L62 30 L72 33" strokeWidth={S.E.strokeWidth} strokeDasharray="4 2" opacity={S.E.opacityModerate} />

        {/* Central flat ceiling with medallion */}
        <path d="M35 28 L35 18 L65 18 L65 28" strokeWidth={S.P.strokeWidthLight} />
        <path d="M35 18 L65 18" strokeWidth={S.P.strokeWidth} />

        {/* Central decorative medallion */}
        <ellipse cx="50" cy="23" rx="10" ry="4" strokeWidth={S.P.strokeWidth} />
        <ellipse cx="50" cy="23" rx="6" ry="2.5" strokeWidth={S.D.strokeWidth} />

        {/* Chandelier or pendant */}
        <path d="M50 27 L50 45" strokeWidth={S.D.strokeWidth} />
        <path d="M46 45 L54 45" strokeWidth={S.D.strokeWidth} />
        <path d="M44 48 L56 48" strokeWidth={S.D.strokeWidth} />
        <path d="M47 48 L47 55" strokeWidth={S.D.strokeWidthFine} />
        <path d="M53 48 L53 55" strokeWidth={S.D.strokeWidthFine} />
        <ellipse cx="50" cy="56" rx="5" ry="2" strokeWidth={S.D.strokeWidth} />

        {/* Art Deco corner accents */}
        <path d="M8 75 L12 75 L12 68" strokeWidth={S.P.strokeWidthLight} />
        <path d="M88 75 L92 75 L92 68" strokeWidth={S.P.strokeWidthLight} />

        {/* Vertical step transitions (showing depth) */}
        <path d="M20 60 L15 60" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M80 60 L85 60" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M28 42 L25 42" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M72 42 L75 42" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* DETAIL: Subtle surface texture */}
        <path d="M40 23 L60 23" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
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
      {/* CONTEXT (near): Room outline with wall thickness, door opening, and column grid */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
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

      {/* PRIMARY: Ceiling grid (2'x2' acoustical tile) */}
      <g opacity={S.D.opacitySubtle} strokeWidth={S.D.strokeWidthFine}>
        {[20, 30, 40, 50, 60, 70, 80].map((pos, i) => (
          <React.Fragment key={`grid-${i}`}>
            <line x1={pos} y1="10" x2={pos} y2="90" />
            <line x1="10" y1={pos} x2="90" y2={pos} />
          </React.Fragment>
        ))}
      </g>

      {/* PRIMARY: RECESSED LIGHTS - highlighted with halo */}
      <g strokeWidth={S.P.strokeWidth}>
        {/* 3x3 grid of recessed lights */}
        {[25, 50, 75].map((x, i) =>
          [25, 50, 75].map((y, j) => (
            <g key={`light-${i}-${j}`}>
              <circle cx={x} cy={y} r="3" />
              <line x1={x-2} y1={y-2} x2={x+2} y2={y+2} strokeWidth={S.P.strokeWidthLight} />
              <line x1={x-2} y1={y+2} x2={x+2} y2={y-2} strokeWidth={S.P.strokeWidthLight} />
            </g>
          ))
        )}
      </g>

      {/* PRIMARY: HVAC LINEAR DIFFUSERS */}
      <g strokeWidth={S.P.strokeWidthLight} opacity={S.P.opacity}>
        {/* Left diffuser */}
        <rect x="16" y="47.5" width="6" height="5" rx="0.5" />
        <line x1="17" y1="49" x2="21" y2="49" strokeWidth={S.D.strokeWidthFine} />
        <line x1="17" y1="51" x2="21" y2="51" strokeWidth={S.D.strokeWidthFine} />

        {/* Right diffuser */}
        <rect x="78" y="47.5" width="6" height="5" rx="0.5" />
        <line x1="79" y1="49" x2="83" y2="49" strokeWidth={S.D.strokeWidthFine} />
        <line x1="79" y1="51" x2="83" y2="51" strokeWidth={S.D.strokeWidthFine} />
      </g>

      {/* PRIMARY: RETURN AIR GRILLE (troffer style) */}
      <g strokeWidth={S.P.strokeWidthLight} opacity={S.D.opacityStrong}>
        <rect x="48" y="44" width="4" height="12" rx="0.5" />
        {[46, 48, 50, 52, 54].map((y, i) => (
          <line key={`grille-${i}`} x1="48.5" y1={y} x2="51.5" y2={y} strokeWidth={S.D.strokeWidthFine} />
        ))}
      </g>

      {/* PRIMARY: SPRINKLER HEADS - with coverage radius */}
      <g strokeWidth={S.P.strokeWidth}>
        {[[25, 35], [75, 35], [25, 65], [75, 65]].map(([x, y], i) => (
          <g key={`sprinkler-${i}`}>
            <circle cx={x} cy={y} r="1.5" fill="none" />
            <circle cx={x} cy={y} r="0.5" fill="currentColor" />
            <line x1={x-2} y1={y} x2={x-3.5} y2={y} strokeWidth={S.D.strokeWidth} />
            <line x1={x+2} y1={y} x2={x+3.5} y2={y} strokeWidth={S.D.strokeWidth} />
            <line x1={x} y1={y-2} x2={x} y2={y-3.5} strokeWidth={S.D.strokeWidth} />
            <line x1={x} y1={y+2} x2={x} y2={y+3.5} strokeWidth={S.D.strokeWidth} />
            {/* Coverage radius */}
            <circle cx={x} cy={y} r="7.5" strokeWidth={S.D.strokeWidthFine} strokeDasharray="1 1" opacity={S.D.opacitySubtle} />
          </g>
        ))}
      </g>

      {/* PRIMARY: SMOKE DETECTORS */}
      <g strokeWidth={S.P.strokeWidthLight} opacity={S.D.opacityStrong}>
        {[[50, 15], [50, 85]].map(([x, y], i) => (
          <g key={`smoke-${i}`}>
            <circle cx={x} cy={y} r="2" />
            <line x1={x-1.5} y1={y} x2={x+1.5} y2={y} strokeWidth={S.D.strokeWidth} />
            <line x1={x} y1={y-1.5} x2={x} y2={y+1.5} strokeWidth={S.D.strokeWidth} />
          </g>
        ))}
      </g>

      {/* DETAIL: ELECTRICAL CIRCUIT - connecting top row lights */}
      <g strokeWidth={S.D.strokeWidth} strokeDasharray="2 1.5" opacity={S.D.opacitySubtle}>
        <path d="M 25 25 Q 37.5 23, 50 25 Q 62.5 27, 75 25" />
        <line x1="50" y1="25" x2="50" y2="10" />
      </g>

      {/* DETAIL: SWITCH SYMBOL */}
      <g>
        <circle cx="50" cy="10" r="1.3" fill="currentColor" opacity={S.D.opacityStrong} />
        <text x="50" y="7" fontSize="3" textAnchor="middle" fill="currentColor" opacity={S.D.opacityStrong} fontWeight="bold">S</text>
      </g>

      {/* DETAIL: EXIT SIGN */}
      <g opacity={S.D.opacity}>
        <rect x="44" y="87.5" width="12" height="3" strokeWidth={S.D.strokeWidth} rx="0.5" />
        <text x="50" y="90" fontSize="2" textAnchor="middle" fill="currentColor" fontWeight="bold">EXIT</text>
      </g>

      {/* DETAIL: SPEAKER (PA system) */}
      <g strokeWidth={S.P.strokeWidthLight} opacity={S.D.opacity}>
        <circle cx="15" cy="15" r="1.8" />
        <circle cx="15" cy="15" r="1" />
        <circle cx="15" cy="15" r="0.4" fill="currentColor" />
      </g>

      {/* TITLE ANNOTATION */}
      <g opacity={S.D.opacity}>
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
  'muqarnas-ceiling': MuqarnasSVG,
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
