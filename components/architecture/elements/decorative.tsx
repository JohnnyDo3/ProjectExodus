'use client'

import React from 'react'
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
 * ACANTHUS - Mediterranean leaf motif (Corinthian capital detail)
 * 3D PERSPECTIVE: Three-quarter view of deeply carved leaf
 * Shows: Deeply lobed, curling acanthus leaves with veins and shadows
 * Distinct: Organic flowing curves, naturalistic foliage
 */
const AcanthusSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="acanthus-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#acanthus-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Corinthian capital and column shaft */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Abacus (top slab of capital) */}
        <path d="M2 8 L98 8" strokeWidth="1" />
        <path d="M5 12 L95 12" strokeWidth="0.8" />
        {/* Column shaft below */}
        <path d="M30 92 L30 100" />
        <path d="M70 92 L70 100" />
        <path d="M32 92 L32 100" opacity="0.2" />
        <path d="M68 92 L68 100" opacity="0.2" />
        {/* Capital bell (kalathos) outline */}
        <path d="M28 92 Q28 80, 35 72 Q42 65, 50 60" strokeWidth="0.5" />
        <path d="M72 92 Q72 80, 65 72 Q58 65, 50 60" strokeWidth="0.5" />
        {/* Neighboring leaf hint (left) */}
        <path d="M8 92 Q5 75, 12 65" strokeWidth="0.5" />
        {/* Neighboring leaf hint (right) */}
        <path d="M92 92 Q95 75, 88 65" strokeWidth="0.5" />
      </g>

      {/* PRIMARY - Acanthus leaf in 3D relief */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Central spine of leaf curving forward */}
        <path d="M50 92 Q48 70, 50 50 Q55 30, 50 15" strokeWidth={S.P.strokeWidthBold} />

        {/* Left side lobes (closer, larger) */}
        <path d="M50 85 Q30 82, 20 75 Q15 70, 18 65 Q25 68, 35 72 Q42 75, 48 78" strokeWidth={S.P.strokeWidth} />
        <path d="M48 70 Q28 65, 18 55 Q12 48, 16 42 Q24 48, 35 55 Q42 60, 48 65" strokeWidth={S.P.strokeWidth} />
        <path d="M50 55 Q32 50, 22 40 Q15 32, 20 26 Q30 35, 42 45 Q48 50, 50 52" strokeWidth={S.P.strokeWidth} />

        {/* Right side lobes (perspective receding) */}
        <path d="M52 85 Q68 80, 75 72 Q80 66, 77 62 Q72 66, 62 70 Q55 74, 52 78" strokeWidth={S.P.strokeWidth} />
        <path d="M52 68 Q68 62, 78 52 Q84 44, 80 38 Q72 45, 62 52 Q55 58, 52 62" strokeWidth={S.P.strokeWidthLight} />
        <path d="M52 52 Q65 46, 72 38 Q78 30, 74 25 Q66 32, 58 42 Q52 48, 52 50" strokeWidth={S.P.strokeWidthLight} />

        {/* Tip curling forward dramatically */}
        <path d="M50 15 Q45 10, 48 5 Q55 8, 52 15" strokeWidth={S.P.strokeWidth} />
        <path d="M48 12 Q50 8, 52 12" strokeWidth={S.D.strokeWidth} />

        {/* Secondary veins on lobes */}
        <path d="M25 70 L32 74" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M22 52 L30 58" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M24 38 L35 46" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M72 68 L65 72" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M76 50 L68 56" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Deep shadow carving lines */}
        <path d="M38 78 Q35 75, 38 72" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M40 62 Q36 58, 40 54" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M42 48 Q38 44, 42 40" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />

        {/* Leaf edge serrations */}
        <path d="M18 65 L20 62 L22 65" strokeWidth={S.D.strokeWidthFine} />
        <path d="M16 45 L18 42 L20 45" strokeWidth={S.D.strokeWidthFine} />
        <path d="M20 28 L22 25 L24 28" strokeWidth={S.D.strokeWidthFine} />
      </g>
    </g>
  </svg>
)

/**
 * ARABESQUE - Islamic geometric/floral interlacing pattern
 * 3D PERSPECTIVE: Looking at tilted decorative panel
 * Shows: Infinite interlacing vegetal scrolls with geometric precision
 * Distinct: No figural imagery, mathematical beauty, endless repetition
 */
const ArabesqueSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="arabesque-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#arabesque-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Mosque/palace wall with tile panel surround */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Wall surface extending off-page */}
        <path d="M-5 0 L105 0" />
        <path d="M-5 100 L105 100" />
        <path d="M-5 0 L-5 100" />
        <path d="M105 0 L105 100" />

        {/* Masonry mortar lines on wall */}
        <path d="M-5 15 L6 15" opacity="0.5" />
        <path d="M94 15 L105 15" opacity="0.5" />
        <path d="M-5 50 L6 50" opacity="0.5" />
        <path d="M94 50 L105 50" opacity="0.5" />
        <path d="M-5 85 L6 85" opacity="0.5" />
        <path d="M94 85 L105 85" opacity="0.5" />

        {/* Beveled frame with depth around the panel */}
        <path d="M6 6 L94 6 L94 94 L6 94 Z" strokeWidth="0.8" />
        <path d="M8 8 L92 8 L92 92 L8 92 Z" />

        {/* Adjacent panel hint on left */}
        <path d="M-12 8 L4 8 L4 92 L-12 92 Z" opacity="0.4" />
        {/* Adjacent panel hint on right */}
        <path d="M96 8 L112 8 L112 92 L96 92 Z" opacity="0.4" />

        {/* Calligraphic band above panels */}
        <path d="M-5 3 L105 3" strokeWidth="0.5" />
        <path d="M-5 6 L105 6" strokeWidth="0.5" />

        {/* Floor tiles below */}
        <path d="M-5 97 L105 97" strokeWidth="0.5" />
        <path d="M20 97 L20 105" strokeWidth="0.3" opacity="0.4" />
        <path d="M50 97 L50 105" strokeWidth="0.3" opacity="0.4" />
        <path d="M80 97 L80 105" strokeWidth="0.3" opacity="0.4" />
      </g>

      {/* PRIMARY - Arabesque interlacing in perspective */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Central 8-pointed star (rotated square + square) */}
        <path d="M50 20 L65 35 L80 20" strokeWidth={S.P.strokeWidth} />
        <path d="M80 20 L65 35 L80 50" strokeWidth={S.P.strokeWidth} />
        <path d="M80 50 L65 35 L80 80" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 80 L35 65 L20 80" strokeWidth={S.P.strokeWidth} />
        <path d="M20 80 L35 65 L20 50" strokeWidth={S.P.strokeWidth} />
        <path d="M20 50 L35 65 L20 20" strokeWidth={S.P.strokeWidthLight} />

        {/* Interlacing bands crossing over and under */}
        <path d="M20 20 Q35 35, 50 20 Q65 35, 80 20" strokeWidth={S.P.strokeWidth} />
        <path d="M20 80 Q35 65, 50 80 Q65 65, 80 80" strokeWidth={S.P.strokeWidth} />
        <path d="M20 20 Q35 35, 20 50 Q35 65, 20 80" strokeWidth={S.P.strokeWidth} />
        <path d="M80 20 Q65 35, 80 50 Q65 65, 80 80" strokeWidth={S.P.strokeWidth} />

        {/* Central medallion */}
        <circle cx="50" cy="50" r="12" strokeWidth={S.P.strokeWidth} />
        <circle cx="50" cy="50" r="8" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="50" cy="50" r="4" strokeWidth={S.D.strokeWidth} />

        {/* Connecting scrollwork from center */}
        <path d="M50 38 Q45 30, 50 20" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 38 Q55 30, 50 20" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 62 Q45 70, 50 80" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 62 Q55 70, 50 80" strokeWidth={S.P.strokeWidthLight} />
        <path d="M38 50 Q30 45, 20 50" strokeWidth={S.P.strokeWidthLight} />
        <path d="M62 50 Q70 45, 80 50" strokeWidth={S.P.strokeWidthLight} />

        {/* Vegetal scrolls in corners */}
        <path d="M15 15 Q25 20, 20 30 Q15 25, 15 15" strokeWidth={S.P.strokeWidthLight} />
        <path d="M85 15 Q75 20, 80 30 Q85 25, 85 15" strokeWidth={S.P.strokeWidthLight} />
        <path d="M15 85 Q25 80, 20 70 Q15 75, 15 85" strokeWidth={S.P.strokeWidthLight} />
        <path d="M85 85 Q75 80, 80 70 Q85 75, 85 85" strokeWidth={S.P.strokeWidthLight} />

        {/* Leaf forms branching from scrolls */}
        <path d="M25 25 Q30 22, 32 27 Q28 30, 25 25" strokeWidth={S.D.strokeWidth} />
        <path d="M75 25 Q70 22, 68 27 Q72 30, 75 25" strokeWidth={S.D.strokeWidth} />
        <path d="M25 75 Q30 78, 32 73 Q28 70, 25 75" strokeWidth={S.D.strokeWidth} />
        <path d="M75 75 Q70 78, 68 73 Q72 70, 75 75" strokeWidth={S.D.strokeWidth} />

        {/* Small geometric fills */}
        <path d="M35 35 L40 30 L45 35 L40 40 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M55 35 L60 30 L65 35 L60 40 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M35 65 L40 60 L45 65 L40 70 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M55 65 L60 60 L65 65 L60 70 Z" strokeWidth={S.D.strokeWidth} />
      </g>
    </g>
  </svg>
)

/**
 * BOSS - Projecting carved ornament at rib vault intersection
 * 3D PERSPECTIVE: Looking up at projecting carved boss
 * Shows: Circular carved projection with foliage/face, deep shadow
 * Distinct: Strongly projecting, often figural, marks rib junctions
 */
const BossSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="boss-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#boss-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Vault ribs meeting at boss */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M0 100 Q25 60, 50 50" />
        <path d="M100 100 Q75 60, 50 50" />
        <path d="M0 0 Q25 40, 50 50" />
        <path d="M100 0 Q75 40, 50 50" />
      </g>

      {/* PRIMARY - Boss projecting toward viewer */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Outer ring - shadow edge of projection */}
        <circle cx="50" cy="50" r="32" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="50" cy="50" r="28" strokeWidth={S.P.strokeWidth} />

        {/* Inner carved area - raised central medallion */}
        <circle cx="50" cy="50" r="22" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="50" cy="50" r="18" strokeWidth={S.P.strokeWidth} />

        {/* Central figural carving - Green Man face */}
        {/* Eyes */}
        <ellipse cx="42" cy="44" rx="4" ry="3" strokeWidth={S.P.strokeWidthLight} />
        <ellipse cx="58" cy="44" rx="4" ry="3" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="42" cy="44" r="1.5" strokeWidth={S.D.strokeWidth} />
        <circle cx="58" cy="44" r="1.5" strokeWidth={S.D.strokeWidth} />

        {/* Nose bridge */}
        <path d="M50 42 L50 52" strokeWidth={S.P.strokeWidthLight} />
        <path d="M48 52 Q50 55, 52 52" strokeWidth={S.P.strokeWidthLight} />

        {/* Mouth with foliage emerging */}
        <path d="M44 58 Q50 62, 56 58" strokeWidth={S.P.strokeWidthLight} />

        {/* Foliage sprouting from mouth and around face */}
        <path d="M50 60 Q45 68, 35 72" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 60 Q55 68, 65 72" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 60 L50 70" strokeWidth={S.D.strokeWidth} />

        {/* Leaf details on emerging foliage */}
        <path d="M40 68 Q38 65, 42 64" strokeWidth={S.D.strokeWidth} />
        <path d="M60 68 Q62 65, 58 64" strokeWidth={S.D.strokeWidth} />

        {/* Foliage forming hair/crown */}
        <path d="M35 42 Q32 35, 38 30 Q45 28, 50 32" strokeWidth={S.P.strokeWidthLight} />
        <path d="M65 42 Q68 35, 62 30 Q55 28, 50 32" strokeWidth={S.P.strokeWidthLight} />
        <path d="M42 35 Q45 30, 50 32 Q55 30, 58 35" strokeWidth={S.D.strokeWidth} />

        {/* Surrounding decorative ring with leaf motifs */}
        <path d="M22 50 Q25 45, 28 50 Q25 55, 22 50" strokeWidth={S.D.strokeWidth} />
        <path d="M78 50 Q75 45, 72 50 Q75 55, 78 50" strokeWidth={S.D.strokeWidth} />
        <path d="M50 22 Q45 25, 50 28 Q55 25, 50 22" strokeWidth={S.D.strokeWidth} />
        <path d="M50 78 Q45 75, 50 72 Q55 75, 50 78" strokeWidth={S.D.strokeWidth} />

        {/* Depth shadow on projection */}
        <path d="M82 50 Q78 65, 68 75" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M50 82 Q65 78, 75 68" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      </g>
    </g>
  </svg>
)

/**
 * CARTOUCHE - Decorative frame/tablet for inscriptions
 * 3D PERSPECTIVE: Ornate scrolled frame viewed at angle
 * Shows: Rolled scrollwork frame with central tablet area
 * Distinct: Baroque curves, often with heraldry or text
 */
const CartoucheSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="cartouche-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#cartouche-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Building facade with rusticated stonework */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Cornice line above */}
        <path d="M0 3 L100 3" strokeWidth="0.8" />
        <path d="M0 6 L100 6" strokeWidth="0.6" />
        {/* Rusticated stone courses (wall surface) */}
        <path d="M0 0 L100 0" />
        <path d="M0 100 L100 100" />
        <path d="M0 8 L8 8 M15 8 L30 8 M38 8 L55 8 M62 8 L78 8 M85 8 L100 8" strokeWidth="0.3" />
        <path d="M0 95 L12 95 M20 95 L40 95 M48 95 L68 95 M76 95 L100 95" strokeWidth="0.3" />
        {/* Window opening below */}
        <path d="M35 92 L35 100 M65 92 L65 100" strokeWidth="0.4" />
        <path d="M35 92 L65 92" strokeWidth="0.4" />
        {/* Pilaster hints on sides */}
        <path d="M5 0 L5 100" strokeWidth="0.4" />
        <path d="M95 0 L95 100" strokeWidth="0.4" />
      </g>

      {/* PRIMARY - Ornate cartouche frame in 3D */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Central tablet/shield shape */}
        <path d="M25 25 Q25 15, 50 15 Q75 15, 75 25 L75 65 Q75 80, 50 85 Q25 80, 25 65 Z" strokeWidth={S.P.strokeWidthBold} />
        <path d="M28 28 Q28 20, 50 20 Q72 20, 72 28 L72 62 Q72 75, 50 80 Q28 75, 28 62 Z" strokeWidth={S.P.strokeWidthLight} opacity={S.D.opacityStrong} />

        {/* Top scroll ornament */}
        <path d="M50 15 Q40 8, 30 12 Q22 18, 25 25" strokeWidth={S.P.strokeWidth} />
        <path d="M50 15 Q60 8, 70 12 Q78 18, 75 25" strokeWidth={S.P.strokeWidth} />
        <path d="M30 12 Q28 8, 35 5 Q42 3, 50 8" strokeWidth={S.P.strokeWidthLight} />
        <path d="M70 12 Q72 8, 65 5 Q58 3, 50 8" strokeWidth={S.P.strokeWidthLight} />

        {/* Curling volutes at top */}
        <path d="M28 18 Q22 15, 20 20 Q18 28, 22 25" strokeWidth={S.P.strokeWidthLight} />
        <path d="M72 18 Q78 15, 80 20 Q82 28, 78 25" strokeWidth={S.P.strokeWidthLight} />

        {/* Side scroll ornaments */}
        <path d="M25 40 Q15 42, 12 50 Q10 58, 18 55 Q22 52, 25 55" strokeWidth={S.P.strokeWidth} />
        <path d="M75 40 Q85 42, 88 50 Q90 58, 82 55 Q78 52, 75 55" strokeWidth={S.P.strokeWidth} />

        {/* Bottom scroll ornament */}
        <path d="M50 85 Q35 88, 30 82 Q28 75, 32 78" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 85 Q65 88, 70 82 Q72 75, 68 78" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 85 L50 92" strokeWidth={S.P.strokeWidth} />
        <path d="M45 92 Q50 98, 55 92" strokeWidth={S.P.strokeWidthLight} />

        {/* Leaf accents on scrollwork */}
        <path d="M18 48 Q14 45, 16 42 Q20 44, 18 48" strokeWidth={S.D.strokeWidth} />
        <path d="M82 48 Q86 45, 84 42 Q80 44, 82 48" strokeWidth={S.D.strokeWidth} />

        {/* Central inscription area (blank tablet) */}
        <path d="M35 35 L65 35 L65 60 L35 60 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Decorative lines suggesting text */}
        <path d="M40 42 L60 42" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M38 48 L62 48" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M40 54 L60 54" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Shadow depth on scroll edges */}
        <path d="M22 22 Q20 25, 22 28" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M15 52 Q12 55, 15 58" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      </g>
    </g>
  </svg>
)

/**
 * CORNICE - Projecting horizontal molding at wall/ceiling junction
 * 3D PERSPECTIVE: Looking up at projecting cornice profile
 * Shows: Multiple molding profiles stacked, deep shadows
 * Distinct: Classical proportions, crown molding, entablature top
 */
const CorniceSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="cornice-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#cornice-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Building wall with columns and roof above */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Roof/parapet above cornice - extending off-page */}
        <path d="M-10 28 L110 28" strokeWidth="0.5" />
        <path d="M-10 25 L110 25" strokeWidth="0.7" />

        {/* Wall surface below - extending off-page */}
        <path d="M-10 100 L-10 72" strokeWidth="0.6" />
        <path d="M110 100 L110 72" strokeWidth="0.6" />
        <path d="M-10 100 L110 100" strokeWidth="0.6" />

        {/* Masonry coursing on wall */}
        <path d="M-10 80 L110 80" strokeWidth="0.4" opacity="0.5" />
        <path d="M-10 88 L110 88" strokeWidth="0.4" opacity="0.5" />
        <path d="M-10 96 L110 96" strokeWidth="0.4" opacity="0.5" />

        {/* Column capital tops below architrave */}
        <path d="M5 72 L5 85" strokeWidth="0.7" opacity="0.6" />
        <path d="M12 72 L12 85" strokeWidth="0.7" opacity="0.6" />
        <path d="M5 75 L12 75" strokeWidth="0.4" opacity="0.4" />

        <path d="M45 72 L45 85" strokeWidth="0.7" opacity="0.6" />
        <path d="M55 72 L55 85" strokeWidth="0.7" opacity="0.6" />
        <path d="M45 75 L55 75" strokeWidth="0.4" opacity="0.4" />

        <path d="M88 72 L88 85" strokeWidth="0.7" opacity="0.6" />
        <path d="M95 72 L95 85" strokeWidth="0.7" opacity="0.6" />
        <path d="M88 75 L95 75" strokeWidth="0.4" opacity="0.4" />

        {/* Window hint between columns */}
        <path d="M20 78 L20 95 L38 95 L38 78 Z" strokeWidth="0.4" opacity="0.4" />
        <path d="M62 78 L62 95 L80 95 L80 78 Z" strokeWidth="0.4" opacity="0.4" />
      </g>

      {/* PRIMARY - Cornice profile in perspective */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Main corona (projecting cap) */}
        <path d="M0 35 L100 35" strokeWidth={S.P.strokeWidthBold} />
        <path d="M0 38 L100 38" strokeWidth={S.P.strokeWidthBold} />

        {/* Drip edge (soffit with shadow) */}
        <path d="M5 38 L5 42 L95 42 L95 38" strokeWidth={S.P.strokeWidth} />
        <path d="M8 40 L92 40" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Cyma recta (S-curve) molding */}
        <path d="M0 42 Q15 48, 0 55" strokeWidth={S.P.strokeWidth} />
        <path d="M100 42 Q85 48, 100 55" strokeWidth={S.P.strokeWidth} />
        <path d="M0 55 L100 55" strokeWidth={S.P.strokeWidthLight} />
        <path d="M10 42 Q25 48, 10 55" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M30 42 Q45 48, 30 55" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M50 42 Q65 48, 50 55" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M70 42 Q85 48, 70 55" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Dentil band */}
        <path d="M0 55 L100 55" strokeWidth={S.P.strokeWidthLight} />
        <path d="M0 62 L100 62" strokeWidth={S.P.strokeWidthLight} />
        {/* Individual dentils */}
        <path d="M8 55 L8 62" strokeWidth={S.P.strokeWidthLight} />
        <path d="M18 55 L18 62" strokeWidth={S.P.strokeWidthLight} />
        <path d="M28 55 L28 62" strokeWidth={S.P.strokeWidthLight} />
        <path d="M38 55 L38 62" strokeWidth={S.P.strokeWidthLight} />
        <path d="M48 55 L48 62" strokeWidth={S.P.strokeWidthLight} />
        <path d="M58 55 L58 62" strokeWidth={S.P.strokeWidthLight} />
        <path d="M68 55 L68 62" strokeWidth={S.P.strokeWidthLight} />
        <path d="M78 55 L78 62" strokeWidth={S.P.strokeWidthLight} />
        <path d="M88 55 L88 62" strokeWidth={S.P.strokeWidthLight} />
        <path d="M98 55 L98 62" strokeWidth={S.P.strokeWidthLight} />

        {/* Bed molding below dentils */}
        <path d="M0 65 L100 65" strokeWidth={S.P.strokeWidth} />
        <path d="M0 62 Q5 63.5, 0 65" strokeWidth={S.D.strokeWidth} />

        {/* Frieze band */}
        <path d="M0 68 L100 68" strokeWidth={S.D.strokeWidth} />

        {/* Architrave (bottom) */}
        <path d="M0 68 L0 72 L100 72 L100 68" strokeWidth={S.P.strokeWidth} />
        <path d="M0 72 L100 72" strokeWidth={S.P.strokeWidthBold} />

        {/* Shadow under projection */}
        <path d="M10 40 L90 40" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Ceiling plane above */}
        <path d="M0 30 L100 30" strokeWidth={S.D.strokeWidth} strokeDasharray="4 3" opacity={S.D.opacitySubtle} />
      </g>
    </g>
  </svg>
)

/**
 * DENTIL - Row of small rectangular blocks like teeth
 * 3D PERSPECTIVE: Close-up of dentil course with shadows
 * Shows: Evenly spaced rectangular blocks in rhythmic row
 * Distinct: Classical Roman detail, repetitive geometric
 */
const DentilSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="dentil-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#dentil-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Full entablature section showing where dentils sit */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Cornice/corona above */}
        <path d="M0 10 L100 10" strokeWidth="1.2" />
        <path d="M0 15 L100 15" strokeWidth="0.8" />
        {/* Cyma molding above dentils */}
        <path d="M0 22 Q10 18, 20 22 Q30 18, 40 22 Q50 18, 60 22 Q70 18, 80 22 Q90 18, 100 22" strokeWidth="0.5" />
        {/* Architrave/wall below */}
        <path d="M0 78 L100 78" strokeWidth="0.8" />
        <path d="M0 82 L100 82" strokeWidth="1" />
        {/* Column capitals below */}
        <path d="M10 82 L10 100" strokeWidth="0.5" />
        <path d="M25 82 L25 100" strokeWidth="0.5" />
        <path d="M50 82 L50 100" strokeWidth="0.5" />
        <path d="M75 82 L75 100" strokeWidth="0.5" />
        <path d="M90 82 L90 100" strokeWidth="0.5" />
      </g>

      {/* PRIMARY - Dentil blocks in 3D perspective */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Upper bed molding */}
        <path d="M0 30 L100 30" strokeWidth={S.P.strokeWidthBold} />
        <path d="M0 33 L100 33" strokeWidth={S.P.strokeWidthLight} />

        {/* Dentil blocks - perspective making closer ones larger */}
        {/* Block 1 (leftmost) */}
        <path d="M5 36 L5 58 L12 58 L12 36 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M6 38 L6 56 L11 56 L11 38 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Block 2 */}
        <path d="M18 36 L18 60 L27 60 L27 36 Z" strokeWidth={S.P.strokeWidthBold} />
        <path d="M19 38 L19 58 L26 58 L26 38 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Block 3 (center, closest - largest) */}
        <path d="M33 35 L33 62 L45 62 L45 35 Z" strokeWidth={S.P.strokeWidthBold} />
        <path d="M35 37 L35 60 L43 60 L43 37 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        {/* Front face detail */}
        <path d="M36 40 L42 40" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M36 50 L42 50" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Block 4 (center) */}
        <path d="M51 35 L51 62 L63 62 L63 35 Z" strokeWidth={S.P.strokeWidthBold} />
        <path d="M53 37 L53 60 L61 60 L61 37 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Block 5 */}
        <path d="M69 36 L69 60 L78 60 L78 36 Z" strokeWidth={S.P.strokeWidthBold} />
        <path d="M70 38 L70 58 L77 58 L77 38 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Block 6 (rightmost) */}
        <path d="M84 36 L84 58 L91 58 L91 36 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M85 38 L85 56 L90 56 L90 38 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Lower bed molding */}
        <path d="M0 65 L100 65" strokeWidth={S.P.strokeWidthLight} />
        <path d="M0 68 L100 68" strokeWidth={S.P.strokeWidthBold} />

        {/* Deep shadows between dentils */}
        <path d="M13 40 L17 40" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M13 50 L17 50" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M28 40 L32 40" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M46 40 L50 40" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M64 40 L68 40" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M79 40 L83 40" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Shadow under blocks */}
        <path d="M5 60 L12 60" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M33 64 L45 64" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M51 64 L63 64" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
      </g>
    </g>
  </svg>
)

/**
 * EGG AND DART - Alternating ovolo and arrowhead motifs
 * 3D PERSPECTIVE: Close-up showing egg shapes and dart points
 * Shows: Oval "eggs" alternating with pointed "darts"
 * Distinct: Classical Roman, often on ovolo moldings
 */
const EggAndDartSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="eggdart-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#eggdart-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Entablature on column capital showing where egg-and-dart sits */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Corona/cornice above */}
        <path d="M0 12 L100 12" strokeWidth="1" />
        <path d="M0 16 L100 16" strokeWidth="0.8" />
        {/* Frieze band below the egg-and-dart */}
        <path d="M0 82 L100 82" strokeWidth="0.8" />
        <path d="M0 88 L100 88" strokeWidth="0.6" />
        {/* Column capital tops below entablature */}
        <path d="M8 88 Q8 94, 15 96 L15 100" strokeWidth="0.5" />
        <path d="M35 88 L35 100" strokeWidth="0.5" />
        <path d="M65 88 L65 100" strokeWidth="0.5" />
        <path d="M92 88 Q92 94, 85 96 L85 100" strokeWidth="0.5" />
        {/* Echinus curve hint (where egg-and-dart pattern would sit on column) */}
        <path d="M15 96 Q25 92, 35 96" strokeWidth="0.4" />
        <path d="M65 96 Q75 92, 85 96" strokeWidth="0.4" />
      </g>

      {/* PRIMARY - Egg and dart pattern in 3D */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Upper curved ovolo molding surface */}
        <path d="M0 25 Q50 18, 100 25" strokeWidth={S.P.strokeWidth} />
        <path d="M0 28 L100 28" strokeWidth={S.P.strokeWidthLight} />

        {/* EGG 1 (left, smaller due to perspective) */}
        <ellipse cx="12" cy="48" rx="7" ry="12" strokeWidth={S.P.strokeWidth} />
        <path d="M12 36 L12 32" strokeWidth={S.D.strokeWidth} />
        <ellipse cx="12" cy="48" rx="4" ry="8" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* DART 1 */}
        <path d="M24 35 L27 50 L24 65 L21 50 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M24 40 L24 60" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* EGG 2 (center-left, larger) */}
        <ellipse cx="38" cy="48" rx="9" ry="15" strokeWidth={S.P.strokeWidthBold} />
        <path d="M38 33 L38 28" strokeWidth={S.D.strokeWidth} />
        <ellipse cx="38" cy="48" rx="5" ry="10" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        {/* Egg shell highlight */}
        <path d="M35 40 Q38 38, 41 40" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* DART 2 */}
        <path d="M52 33 L56 50 L52 67 L48 50 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M52 38 L52 62" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* EGG 3 (center, closest - largest) */}
        <ellipse cx="68" cy="48" rx="10" ry="16" strokeWidth={S.P.strokeWidthBold} />
        <path d="M68 32 L68 26" strokeWidth={S.P.strokeWidthLight} />
        <ellipse cx="68" cy="48" rx="6" ry="11" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        {/* Shell curve detail */}
        <path d="M64 38 Q68 35, 72 38" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* DART 3 */}
        <path d="M83 33 L87 50 L83 67 L79 50 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M83 38 L83 62" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* EGG 4 (right edge, smaller) */}
        <ellipse cx="96" cy="48" rx="6" ry="11" strokeWidth={S.P.strokeWidth} />

        {/* Lower molding edge */}
        <path d="M0 72 L100 72" strokeWidth={S.P.strokeWidthLight} />
        <path d="M0 75 Q50 82, 100 75" strokeWidth={S.P.strokeWidth} />

        {/* Shadow under eggs */}
        <path d="M5 62 Q12 65, 19 62" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M29 64 Q38 68, 47 64" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M58 65 Q68 70, 78 65" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
      </g>
    </g>
  </svg>
)

/**
 * FINIAL - Ornament at apex of gable, spire, or post
 * 3D PERSPECTIVE: Looking up at finial on pinnacle
 * Shows: Decorative terminating element, often floral or geometric
 * Distinct: Crowning element, vertical emphasis
 */
const FinialSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="finial-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#finial-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Gothic pinnacle and buttress structure below */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Gable/pediment */}
        <path d="M22 95 L50 80 L78 95" strokeWidth="0.8" />
        {/* Pinnacle shaft tapering */}
        <path d="M40 82 L40 100" strokeWidth="0.6" />
        <path d="M60 82 L60 100" strokeWidth="0.6" />
        {/* Crocket ornaments on gable edges */}
        <path d="M30 90 Q28 88, 30 86" strokeWidth="0.4" />
        <path d="M36 87 Q34 85, 36 83" strokeWidth="0.4" />
        <path d="M70 90 Q72 88, 70 86" strokeWidth="0.4" />
        <path d="M64 87 Q66 85, 64 83" strokeWidth="0.4" />
        {/* Buttress wall beneath */}
        <path d="M35 100 L35 95 L65 95 L65 100" strokeWidth="0.5" />
        {/* Adjacent pinnacle hint */}
        <path d="M5 70 L5 100" strokeWidth="0.4" />
        <path d="M95 70 L95 100" strokeWidth="0.4" />
        <path d="M2 70 L8 70" strokeWidth="0.4" />
        <path d="M92 70 L98 70" strokeWidth="0.4" />
      </g>

      {/* PRIMARY - Finial ornament in 3D */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Base mounting plate */}
        <ellipse cx="50" cy="78" rx="12" ry="4" strokeWidth={S.P.strokeWidth} />
        <path d="M38 78 L38 82 L62 82 L62 78" strokeWidth={S.P.strokeWidthLight} />

        {/* Lower bulb/vase form */}
        <path d="M42 78 Q42 72, 45 68 Q50 64, 55 68 Q58 72, 58 78" strokeWidth={S.P.strokeWidth} />
        <path d="M44 74 Q50 70, 56 74" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Neck transition */}
        <path d="M45 68 L45 62 Q50 60, 55 62 L55 68" strokeWidth={S.P.strokeWidth} />

        {/* Central body - ball/onion shape */}
        <path d="M40 58 Q40 48, 50 42 Q60 48, 60 58" strokeWidth={S.P.strokeWidthBold} />
        <path d="M45 62 Q42 60, 40 58" strokeWidth={S.P.strokeWidth} />
        <path d="M55 62 Q58 60, 60 58" strokeWidth={S.P.strokeWidth} />
        {/* Body highlight */}
        <path d="M45 52 Q50 48, 55 52" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Upper fleur-de-lis or leaf crown */}
        <path d="M50 42 L50 25" strokeWidth={S.P.strokeWidthBold} />
        {/* Central petal */}
        <path d="M48 28 Q50 18, 52 28" strokeWidth={S.P.strokeWidth} />
        <path d="M48 22 L50 12 L52 22" strokeWidth={S.P.strokeWidth} />

        {/* Side petals curving out */}
        <path d="M50 35 Q42 30, 38 35 Q35 42, 40 40" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 35 Q58 30, 62 35 Q65 42, 60 40" strokeWidth={S.P.strokeWidthLight} />

        {/* Small ball at apex */}
        <circle cx="50" cy="10" r="4" strokeWidth={S.P.strokeWidth} />
        <circle cx="50" cy="10" r="2" strokeWidth={S.D.strokeWidth} />

        {/* Decorative rings on neck */}
        <path d="M46 65 L54 65" strokeWidth={S.D.strokeWidth} />
        <path d="M47 63 L53 63" strokeWidth={S.D.strokeWidth} />

        {/* Shadow on body */}
        <path d="M55 55 Q58 52, 58 48" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      </g>
    </g>
  </svg>
)

/**
 * GARGOYLE - Carved spout projecting from roof gutter
 * 3D PERSPECTIVE: Looking up at projecting grotesque figure
 * Shows: Fantastic creature with open mouth for water drainage
 * Distinct: Functional (drainage) yet decorative, medieval
 */
const GargoyleSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="gargoyle-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#gargoyle-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Cathedral wall, parapet, and buttress */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Cathedral wall face behind gargoyle */}
        <path d="M78 -5 L78 100" strokeWidth="0.8" />
        <path d="M85 -5 L85 100" strokeWidth="0.7" />
        <path d="M92 -5 L92 100" strokeWidth="0.6" />

        {/* Stone coursing on wall */}
        <path d="M78 10 L100 10" strokeWidth="0.4" opacity="0.6" />
        <path d="M78 25 L100 25" strokeWidth="0.4" opacity="0.6" />
        <path d="M78 40 L100 40" strokeWidth="0.4" opacity="0.6" />
        <path d="M78 60 L100 60" strokeWidth="0.4" opacity="0.6" />
        <path d="M78 75 L100 75" strokeWidth="0.4" opacity="0.6" />
        <path d="M78 90 L100 90" strokeWidth="0.4" opacity="0.6" />

        {/* Parapet/cornice from which gargoyle projects */}
        <path d="M75 35 L100 35" strokeWidth="0.9" opacity="0.7" />
        <path d="M73 38 L100 38" strokeWidth="0.7" opacity="0.5" />

        {/* Gutter channel leading to gargoyle mounting point */}
        <path d="M100 36 L82 36 L82 42" strokeWidth="0.5" opacity="0.5" />

        {/* Buttress outline on right side */}
        <path d="M92 -5 L92 100" strokeWidth="0.9" opacity="0.5" />
        <path d="M100 -5 L100 100" strokeWidth="0.9" opacity="0.5" />
        <path d="M92 0 Q96 15, 100 30" strokeWidth="0.5" opacity="0.4" />

        {/* Roof slope above parapet */}
        <path d="M75 35 L65 20 L55 10" strokeWidth="0.5" opacity="0.4" />
      </g>

      {/* PRIMARY - Gargoyle projecting into space */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Body emerging from wall */}
        <path d="M82 40 Q70 38, 55 45 Q40 52, 30 48" strokeWidth={S.P.strokeWidthBold} />
        <path d="M82 55 Q70 58, 55 55 Q42 52, 35 58" strokeWidth={S.P.strokeWidthBold} />

        {/* Head - fierce dragon/demon face */}
        <path d="M30 48 Q22 42, 15 45 Q8 50, 12 58 Q18 65, 30 60" strokeWidth={S.P.strokeWidthBold} />

        {/* Open mouth (water spout) */}
        <path d="M12 52 L5 52 L5 56 L12 56" strokeWidth={S.P.strokeWidth} />
        <path d="M8 52 L8 56" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        {/* Tongue */}
        <path d="M10 54 Q6 55, 3 54" strokeWidth={S.D.strokeWidth} />

        {/* Eyes - bulging and menacing */}
        <circle cx="20" cy="48" r="4" strokeWidth={S.P.strokeWidth} />
        <circle cx="20" cy="48" r="2" strokeWidth={S.D.strokeWidth} />
        <circle cx="28" cy="45" r="3" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="28" cy="45" r="1.5" strokeWidth={S.D.strokeWidth} />

        {/* Horns/ears */}
        <path d="M22 42 Q18 35, 22 30 Q26 34, 24 40" strokeWidth={S.P.strokeWidthLight} />
        <path d="M32 40 Q35 32, 40 30 Q38 36, 34 42" strokeWidth={S.P.strokeWidthLight} />

        {/* Fangs/teeth */}
        <path d="M14 50 L16 48" strokeWidth={S.D.strokeWidth} />
        <path d="M14 58 L16 60" strokeWidth={S.D.strokeWidth} />

        {/* Wing or fin on back */}
        <path d="M45 42 Q50 35, 60 38 Q55 42, 50 45" strokeWidth={S.P.strokeWidth} />
        <path d="M48 38 L52 40" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Clawed feet gripping edge */}
        <path d="M35 58 Q30 65, 25 70 Q28 68, 32 65" strokeWidth={S.P.strokeWidthLight} />
        <path d="M25 70 L22 75" strokeWidth={S.D.strokeWidth} />
        <path d="M28 68 L26 73" strokeWidth={S.D.strokeWidth} />
        <path d="M31 66 L30 71" strokeWidth={S.D.strokeWidth} />

        {/* Tail curling */}
        <path d="M75 50 Q80 45, 82 50 Q84 55, 80 58" strokeWidth={S.P.strokeWidthLight} />

        {/* Scale/texture on body */}
        <path d="M55 48 Q58 50, 55 52" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M62 47 Q65 50, 62 53" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M70 48 Q73 50, 70 52" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Water stream suggestion */}
        <path d="M3 54 Q0 60, 5 70 Q10 80, 8 95" strokeWidth={S.D.strokeWidthFine} strokeDasharray="2 2" opacity={S.D.opacitySubtle} />
      </g>
    </g>
  </svg>
)

/**
 * GROTESQUE - Decorative carved figure (non-functional)
 * 3D PERSPECTIVE: Looking at wall-mounted fanciful creature
 * Shows: Hybrid creature or fantastical being, purely decorative
 * Distinct: Unlike gargoyle, no drainage function
 */
const GrotesqueSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="grotesque-halo" intensity={0.88} />}
    <g filter={showHalo ? "url(#grotesque-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Cathedral facade wall with string courses */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Wall surface extending off-page */}
        <path d="M-5 -5 L105 -5" />
        <path d="M-5 105 L105 105" />
        <path d="M-5 -5 L-5 105" />
        <path d="M105 -5 L105 105" />

        {/* Stone coursing on wall */}
        <path d="M-5 8 L8 8" opacity="0.5" />
        <path d="M92 8 L105 8" opacity="0.5" />
        <path d="M-5 25 L8 25" opacity="0.5" />
        <path d="M92 25 L105 25" opacity="0.5" />
        <path d="M-5 50 L8 50" opacity="0.5" />
        <path d="M92 50 L105 50" opacity="0.5" />
        <path d="M-5 75 L8 75" opacity="0.5" />
        <path d="M92 75 L105 75" opacity="0.5" />
        <path d="M-5 92 L8 92" opacity="0.5" />
        <path d="M92 92 L105 92" opacity="0.5" />

        {/* String course / corbel table above medallion */}
        <path d="M-5 5 L105 5" strokeWidth="0.8" opacity="0.6" />
        {/* String course below medallion */}
        <path d="M-5 95 L105 95" strokeWidth="0.8" opacity="0.6" />

        {/* Adjacent medallion hint on left */}
        <circle cx="-15" cy="50" r="18" opacity="0.3" />
        {/* Adjacent medallion hint on right */}
        <circle cx="115" cy="50" r="18" opacity="0.3" />

        {/* Molded frame around medallion (beveled) */}
        <path d="M8 8 L92 8 L92 92 L8 92 Z" strokeWidth="0.7" />
      </g>

      {/* PRIMARY - Grotesque hybrid figure */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Circular medallion frame */}
        <circle cx="50" cy="50" r="38" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="50" cy="50" r="35" strokeWidth={S.P.strokeWidthLight} />

        {/* Face - human-animal hybrid */}
        <ellipse cx="50" cy="45" rx="18" ry="22" strokeWidth={S.P.strokeWidth} />

        {/* Wild hair/mane */}
        <path d="M32 35 Q28 25, 35 20 Q42 18, 50 22" strokeWidth={S.P.strokeWidth} />
        <path d="M68 35 Q72 25, 65 20 Q58 18, 50 22" strokeWidth={S.P.strokeWidth} />
        <path d="M35 25 Q40 20, 45 22" strokeWidth={S.D.strokeWidth} />
        <path d="M55 22 Q60 20, 65 25" strokeWidth={S.D.strokeWidth} />
        <path d="M50 22 Q50 15, 55 18" strokeWidth={S.D.strokeWidth} />
        <path d="M50 22 Q50 15, 45 18" strokeWidth={S.D.strokeWidth} />

        {/* Large expressive eyes */}
        <ellipse cx="42" cy="40" rx="6" ry="5" strokeWidth={S.P.strokeWidthLight} />
        <ellipse cx="58" cy="40" rx="6" ry="5" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="42" cy="40" r="2.5" strokeWidth={S.D.strokeWidth} />
        <circle cx="58" cy="40" r="2.5" strokeWidth={S.D.strokeWidth} />

        {/* Pronounced eyebrows */}
        <path d="M35 34 Q42 30, 48 34" strokeWidth={S.P.strokeWidth} />
        <path d="M52 34 Q58 30, 65 34" strokeWidth={S.P.strokeWidth} />

        {/* Wide nose */}
        <path d="M50 42 L50 52" strokeWidth={S.P.strokeWidthLight} />
        <path d="M46 52 Q50 55, 54 52" strokeWidth={S.P.strokeWidthLight} />

        {/* Grimacing mouth with tongue */}
        <path d="M40 60 Q50 68, 60 60" strokeWidth={S.P.strokeWidth} />
        <path d="M43 62 Q50 66, 57 62" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M50 64 Q50 70, 50 72" strokeWidth={S.D.strokeWidth} />

        {/* Pointed ears */}
        <path d="M30 42 Q22 38, 25 28 Q28 32, 32 38" strokeWidth={S.P.strokeWidthLight} />
        <path d="M70 42 Q78 38, 75 28 Q72 32, 68 38" strokeWidth={S.P.strokeWidthLight} />

        {/* Foliage emerging from mouth/beard */}
        <path d="M42 68 Q35 75, 30 72 Q32 78, 38 76" strokeWidth={S.P.strokeWidthLight} />
        <path d="M58 68 Q65 75, 70 72 Q68 78, 62 76" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 72 Q50 80, 45 85" strokeWidth={S.D.strokeWidth} />
        <path d="M50 72 Q50 80, 55 85" strokeWidth={S.D.strokeWidth} />

        {/* Decorative swirls around */}
        <path d="M18 50 Q15 45, 18 40" strokeWidth={S.D.strokeWidth} />
        <path d="M82 50 Q85 45, 82 40" strokeWidth={S.D.strokeWidth} />
        <path d="M50 88 Q55 85, 60 88" strokeWidth={S.D.strokeWidth} />
      </g>
    </g>
  </svg>
)

/**
 * GUILLOCHE - Interlacing curved bands forming circular voids
 * 3D PERSPECTIVE: Braided/interlocking pattern with depth
 * Shows: Continuous interlocking curved bands, rope-like
 * Distinct: Celtic/Classical, infinite weaving pattern
 */
const GuillocheSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="guilloche-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#guilloche-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Doorframe surround with adjacent molding profiles */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Door frame jambs on left and right */}
        <path d="M-5 0 L-5 100" strokeWidth="0.8" opacity="0.5" />
        <path d="M105 0 L105 100" strokeWidth="0.8" opacity="0.5" />

        {/* Upper fillet molding */}
        <path d="M-5 22 L105 22" strokeWidth="0.5" opacity="0.5" />
        <path d="M-5 25 L105 25" strokeWidth="0.6" />

        {/* Astragal / bead-and-reel molding above guilloche */}
        <path d="M0 27 Q5 26, 10 27 Q15 28, 20 27 Q25 26, 30 27 Q35 28, 40 27 Q45 26, 50 27 Q55 28, 60 27 Q65 26, 70 27 Q75 28, 80 27 Q85 26, 90 27 Q95 28, 100 27" strokeWidth="0.5" opacity="0.5" />

        {/* Lower fillet and ovolo molding below guilloche */}
        <path d="M-5 75 L105 75" strokeWidth="0.6" />
        <path d="M-5 78 L105 78" strokeWidth="0.5" opacity="0.5" />
        <path d="M0 76 Q3 75, 6 76 Q9 77, 12 76 Q15 75, 18 76 Q21 77, 24 76 Q27 75, 30 76 Q33 77, 36 76 Q39 75, 42 76 Q45 77, 48 76 Q51 75, 54 76 Q57 77, 60 76 Q63 75, 66 76 Q69 77, 72 76 Q75 75, 78 76 Q81 77, 84 76 Q87 75, 90 76 Q93 77, 96 76 Q99 75, 100 76" strokeWidth="0.4" opacity="0.4" />

        {/* Wall surface / column drum behind */}
        <path d="M-5 0 L105 0" strokeWidth="0.5" opacity="0.4" />
        <path d="M-5 100 L105 100" strokeWidth="0.5" opacity="0.4" />
        <path d="M-5 10 L105 10" strokeWidth="0.3" opacity="0.3" />
        <path d="M-5 90 L105 90" strokeWidth="0.3" opacity="0.3" />
      </g>

      {/* PRIMARY - Guilloche interlacing pattern with over-under weave */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Upper border line */}
        <path d="M0 30 L100 30" strokeWidth={S.P.strokeWidth} />

        {/* Band A - segments with breaks at crossing points (goes OVER at 0°/180°, UNDER at 90°/270°) */}
        {/* A: start to first crossing (over) */}
        <path d="M0 50 Q6 40, 12 42" strokeWidth={S.P.strokeWidthBold} />
        {/* A: gap where B crosses over... then continues */}
        <path d="M14 44 Q18 50, 25 50" strokeWidth={S.P.strokeWidthBold} />
        {/* A: over B */}
        <path d="M25 50 Q32 50, 37 43" strokeWidth={S.P.strokeWidthBold} />
        {/* A: gap... */}
        <path d="M39 45 Q44 50, 50 50" strokeWidth={S.P.strokeWidthBold} />
        {/* A: over B */}
        <path d="M50 50 Q56 50, 62 43" strokeWidth={S.P.strokeWidthBold} />
        {/* A: gap... */}
        <path d="M64 45 Q68 50, 75 50" strokeWidth={S.P.strokeWidthBold} />
        {/* A: over B */}
        <path d="M75 50 Q82 50, 87 43" strokeWidth={S.P.strokeWidthBold} />
        {/* A: gap to end */}
        <path d="M89 45 Q94 50, 100 50" strokeWidth={S.P.strokeWidthBold} />

        {/* Band B - opposite phase, segments with opposite over-under */}
        {/* B: over A at first crossing */}
        <path d="M0 50 Q6 60, 12 58" strokeWidth={S.P.strokeWidthBold} />
        <path d="M12 58 Q18 50, 25 50" strokeWidth={S.P.strokeWidthBold} />
        {/* B: gap where A crosses over... */}
        <path d="M25 50 Q30 44, 36 42" strokeWidth={S.P.strokeWidthBold} />
        <path d="M40 42 Q44 50, 50 50" strokeWidth={S.P.strokeWidthBold} />
        {/* B: over A */}
        <path d="M50 50 Q56 58, 62 58" strokeWidth={S.P.strokeWidthBold} />
        <path d="M62 58 Q68 50, 75 50" strokeWidth={S.P.strokeWidthBold} />
        {/* B: gap */}
        <path d="M75 50 Q80 44, 86 42" strokeWidth={S.P.strokeWidthBold} />
        <path d="M90 42 Q95 50, 100 50" strokeWidth={S.P.strokeWidthBold} />

        {/* Inner interlacing bands (tighter weave with same over-under logic) */}
        <path d="M5 50 Q12 42, 19 46" strokeWidth={S.P.strokeWidth} />
        <path d="M21 48 Q25 50, 31 50" strokeWidth={S.P.strokeWidth} />
        <path d="M33 48 Q37 42, 44 46" strokeWidth={S.P.strokeWidth} />
        <path d="M46 48 Q50 50, 56 50" strokeWidth={S.P.strokeWidth} />
        <path d="M58 48 Q62 42, 69 46" strokeWidth={S.P.strokeWidth} />
        <path d="M71 48 Q75 50, 81 50" strokeWidth={S.P.strokeWidth} />
        <path d="M83 48 Q87 42, 94 46" strokeWidth={S.P.strokeWidth} />

        <path d="M0 52 Q7 58, 14 54" strokeWidth={S.P.strokeWidth} />
        <path d="M16 52 Q20 50, 25 50" strokeWidth={S.P.strokeWidth} />
        <path d="M29 52 Q33 58, 40 54" strokeWidth={S.P.strokeWidth} />
        <path d="M42 52 Q45 50, 50 50" strokeWidth={S.P.strokeWidth} />
        <path d="M54 52 Q58 58, 65 54" strokeWidth={S.P.strokeWidth} />
        <path d="M67 52 Q70 50, 75 50" strokeWidth={S.P.strokeWidth} />
        <path d="M79 52 Q83 58, 90 54" strokeWidth={S.P.strokeWidth} />

        {/* Circular voids created by interlacing */}
        <circle cx="25" cy="50" r="8" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        <circle cx="50" cy="50" r="10" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <circle cx="75" cy="50" r="8" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Central rosettes in voids */}
        <circle cx="25" cy="50" r="3" strokeWidth={S.D.strokeWidth} />
        <path d="M22 50 L28 50 M25 47 L25 53" strokeWidth={S.D.strokeWidthFine} />

        <circle cx="50" cy="50" r="4" strokeWidth={S.D.strokeWidth} />
        <path d="M46 50 L54 50 M50 46 L50 54" strokeWidth={S.D.strokeWidth} />
        <path d="M47 47 L53 53 M53 47 L47 53" strokeWidth={S.E.strokeWidth} />

        <circle cx="75" cy="50" r="3" strokeWidth={S.D.strokeWidth} />
        <path d="M72 50 L78 50 M75 47 L75 53" strokeWidth={S.D.strokeWidthFine} />

        {/* Lower border line */}
        <path d="M0 70 L100 70" strokeWidth={S.P.strokeWidth} />

        {/* Edge bands */}
        <path d="M0 35 L100 35" strokeWidth={S.D.strokeWidth} />
        <path d="M0 65 L100 65" strokeWidth={S.D.strokeWidth} />
      </g>
    </g>
  </svg>
)

/**
 * MUQARNAS - Islamic honeycomb/stalactite decorative vaulting
 * 3D PERSPECTIVE: Looking into cascading geometric cells
 * Shows: Tiered geometric niches creating 3D honeycomb
 * Distinct: Complex Islamic geometry, mathematical precision
 */
const DecorativeMuqarnasSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="muqarnas-dec-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#muqarnas-dec-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Islamic iwan (vaulted portal) with surrounding walls */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Outer rectangular frame (iwan facade) */}
        <path d="M3 3 L97 3 L97 97 L3 97 Z" strokeWidth="0.6" />
        {/* Inner pointed arch of iwan */}
        <path d="M10 95 L10 50 Q50 15, 90 50 L90 95" strokeWidth="0.8" />
        {/* Spandrel decoration hints (geometric tiles) */}
        <path d="M6 20 L10 20" strokeWidth="0.3" />
        <path d="M6 35 L10 35" strokeWidth="0.3" />
        <path d="M90 20 L94 20" strokeWidth="0.3" />
        <path d="M90 35 L94 35" strokeWidth="0.3" />
        {/* Calligraphic band around arch */}
        <path d="M12 48 Q50 18, 88 48" strokeWidth="0.4" />
        {/* Floor tiles below */}
        <path d="M10 95 L90 95" strokeWidth="0.5" />
        <path d="M30 95 L30 100" strokeWidth="0.3" />
        <path d="M50 95 L50 100" strokeWidth="0.3" />
        <path d="M70 95 L70 100" strokeWidth="0.3" />
      </g>

      {/* PRIMARY - Muqarnas concave niche cells (stalactite vaulting) */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Top tier - small pointed-arch niche cells with concave tops */}
        <path d="M45 25 Q50 20, 55 25 L55 33 L45 33 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M45 28 Q50 24, 55 28" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M33 28 Q38 23, 43 28 L43 38 L33 38 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M33 32 Q38 28, 43 32" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
        <path d="M57 28 Q62 23, 67 28 L67 38 L57 38 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M57 32 Q62 28, 67 32" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />

        {/* Second tier - medium concave niche cells */}
        <path d="M22 36 Q28 28, 34 36 L34 50 L22 50 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M22 40 Q28 34, 34 40" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M42 38 Q50 30, 58 38 L58 54 L42 54 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M42 43 Q50 36, 58 43" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M66 36 Q72 28, 78 36 L78 50 L66 50 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M66 40 Q72 34, 78 40" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Third tier - larger concave niche cells */}
        <path d="M10 50 Q18 40, 26 50 L26 70 L10 70 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M10 55 Q18 47, 26 55" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M28 52 Q38 42, 48 52 L48 74 L28 74 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M28 58 Q38 48, 48 58" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M52 52 Q62 42, 72 52 L72 74 L52 74 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M52 58 Q62 48, 72 58" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M74 50 Q82 40, 90 50 L90 70 L74 70 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M74 55 Q82 47, 90 55" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Connecting horizontal shelves between tiers */}
        <path d="M33 38 L43 38" strokeWidth={S.D.strokeWidth} />
        <path d="M57 38 L67 38" strokeWidth={S.D.strokeWidth} />
        <path d="M22 50 L34 50" strokeWidth={S.D.strokeWidth} />
        <path d="M42 54 L58 54" strokeWidth={S.D.strokeWidth} />
        <path d="M66 50 L78 50" strokeWidth={S.D.strokeWidth} />

        {/* Star patterns in cell centers */}
        <path d="M48 46 L50 44 L52 46 L50 48 Z" strokeWidth={S.D.strokeWidthFine} />
        <path d="M36 62 L38 60 L40 62 L38 64 Z" strokeWidth={S.D.strokeWidthFine} />
        <path d="M60 62 L62 60 L64 62 L62 64 Z" strokeWidth={S.D.strokeWidthFine} />

        {/* Base transition - scalloped edge where muqarnas meets wall */}
        <path d="M10 78 Q20 74, 28 78 Q38 74, 50 78 Q62 74, 72 78 Q80 74, 90 78" strokeWidth={S.P.strokeWidthLight} />
      </g>
    </g>
  </svg>
)

/**
 * ROSETTE - Circular flower-like ornament
 * 3D PERSPECTIVE: Looking at carved rosette with petal depth
 * Shows: Radiating petals from center, like stylized rose
 * Distinct: Symmetrical, often in coffers or as ceiling detail
 */
const RosetteSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="rosette-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#rosette-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Coffered ceiling with beam grid and adjacent coffers */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Beam grid structure dividing coffers */}
        <path d="M8 8 L92 8" strokeWidth="1" opacity="0.5" />
        <path d="M8 92 L92 92" strokeWidth="1" opacity="0.5" />
        <path d="M8 8 L8 92" strokeWidth="1" opacity="0.5" />
        <path d="M92 8 L92 92" strokeWidth="1" opacity="0.5" />

        {/* Recession/depth lines showing coffer is recessed */}
        <path d="M8 8 L15 15" strokeWidth="0.5" opacity="0.4" />
        <path d="M92 8 L85 15" strokeWidth="0.5" opacity="0.4" />
        <path d="M8 92 L15 85" strokeWidth="0.5" opacity="0.4" />
        <path d="M92 92 L85 85" strokeWidth="0.5" opacity="0.4" />

        {/* Inner coffer frame */}
        <path d="M15 15 L85 15 L85 85 L15 85 Z" />

        {/* Adjacent coffer hints extending beyond frame */}
        {/* Top neighbor */}
        <path d="M8 -5 L92 -5" strokeWidth="0.8" opacity="0.3" />
        <path d="M15 -5 L15 8" strokeWidth="0.4" opacity="0.3" />
        <path d="M50 -5 L50 8" strokeWidth="0.4" opacity="0.3" />
        <path d="M85 -5 L85 8" strokeWidth="0.4" opacity="0.3" />
        {/* Bottom neighbor */}
        <path d="M8 105 L92 105" strokeWidth="0.8" opacity="0.3" />
        <path d="M15 92 L15 105" strokeWidth="0.4" opacity="0.3" />
        <path d="M85 92 L85 105" strokeWidth="0.4" opacity="0.3" />
        {/* Left neighbor */}
        <path d="M-5 8 L8 8" strokeWidth="0.8" opacity="0.3" />
        <path d="M-5 50 L8 50" strokeWidth="0.4" opacity="0.3" />
        <path d="M-5 92 L8 92" strokeWidth="0.8" opacity="0.3" />
        {/* Right neighbor */}
        <path d="M92 8 L105 8" strokeWidth="0.8" opacity="0.3" />
        <path d="M92 50 L105 50" strokeWidth="0.4" opacity="0.3" />
        <path d="M92 92 L105 92" strokeWidth="0.8" opacity="0.3" />

        {/* Neighboring rosette hints */}
        <circle cx="-10" cy="50" r="6" opacity="0.2" />
        <circle cx="110" cy="50" r="6" opacity="0.2" />
        <circle cx="50" cy="-10" r="6" opacity="0.2" />
      </g>

      {/* PRIMARY - Rosette in 3D relief */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Outer petal ring (8 petals) */}
        <path d="M50 15 Q45 25, 50 32 Q55 25, 50 15" strokeWidth={S.P.strokeWidth} />
        <path d="M50 85 Q45 75, 50 68 Q55 75, 50 85" strokeWidth={S.P.strokeWidth} />
        <path d="M15 50 Q25 45, 32 50 Q25 55, 15 50" strokeWidth={S.P.strokeWidth} />
        <path d="M85 50 Q75 45, 68 50 Q75 55, 85 50" strokeWidth={S.P.strokeWidth} />

        {/* Diagonal petals */}
        <path d="M25 25 Q32 32, 38 38 Q32 38, 25 25" strokeWidth={S.P.strokeWidth} />
        <path d="M75 25 Q68 32, 62 38 Q68 38, 75 25" strokeWidth={S.P.strokeWidth} />
        <path d="M25 75 Q32 68, 38 62 Q32 62, 25 75" strokeWidth={S.P.strokeWidth} />
        <path d="M75 75 Q68 68, 62 62 Q68 62, 75 75" strokeWidth={S.P.strokeWidth} />

        {/* Middle petal ring (offset) */}
        <path d="M50 28 Q42 38, 50 42 Q58 38, 50 28" strokeWidth={S.P.strokeWidth} />
        <path d="M50 72 Q42 62, 50 58 Q58 62, 50 72" strokeWidth={S.P.strokeWidth} />
        <path d="M28 50 Q38 42, 42 50 Q38 58, 28 50" strokeWidth={S.P.strokeWidth} />
        <path d="M72 50 Q62 42, 58 50 Q62 58, 72 50" strokeWidth={S.P.strokeWidth} />

        {/* Inner petals */}
        <path d="M38 38 Q45 42, 50 50 Q42 45, 38 38" strokeWidth={S.P.strokeWidthLight} />
        <path d="M62 38 Q55 42, 50 50 Q58 45, 62 38" strokeWidth={S.P.strokeWidthLight} />
        <path d="M38 62 Q45 58, 50 50 Q42 55, 38 62" strokeWidth={S.P.strokeWidthLight} />
        <path d="M62 62 Q55 58, 50 50 Q58 55, 62 62" strokeWidth={S.P.strokeWidthLight} />

        {/* Central boss */}
        <circle cx="50" cy="50" r="10" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="50" cy="50" r="6" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="50" cy="50" r="3" strokeWidth={S.D.strokeWidth} />

        {/* Petal veins/ridges */}
        <path d="M50 20 L50 30" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M50 70 L50 80" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M20 50 L30 50" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M70 50 L80 50" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Shadow depth on petals */}
        <path d="M45 22 Q48 28, 48 32" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M22 45 Q28 48, 32 48" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M30 30 Q35 35, 36 40" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      </g>
    </g>
  </svg>
)

/**
 * VOLUTE - Spiral scroll (Ionic capital detail)
 * 3D PERSPECTIVE: Three-quarter view of coiling spiral
 * Shows: Tightly wound spiral scroll with depth
 * Distinct: Classical Greek/Roman, logarithmic spiral
 */
const VoluteSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="volute-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#volute-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ionic capital with abacus above and column shaft below */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        {/* Abacus (flat slab atop capital) */}
        <path d="M5 5 L95 5" strokeWidth="1" />
        <path d="M8 10 L92 10" strokeWidth="0.8" />
        {/* Entablature hint above */}
        <path d="M0 2 L100 2" strokeWidth="0.6" />
        {/* Echinus (egg-and-dart molding under abacus) */}
        <path d="M15 14 Q20 12, 25 14 Q30 12, 35 14 Q40 12, 45 14" strokeWidth="0.4" />
        <path d="M55 14 Q60 12, 65 14 Q70 12, 75 14 Q80 12, 85 14" strokeWidth="0.4" />
        {/* Column shaft below */}
        <path d="M30 88 L30 100" strokeWidth="0.8" />
        <path d="M70 88 L70 100" strokeWidth="0.8" />
        {/* Fluting on shaft */}
        <path d="M35 92 L35 100" strokeWidth="0.3" />
        <path d="M40 94 L40 100" strokeWidth="0.3" />
        <path d="M60 94 L60 100" strokeWidth="0.3" />
        <path d="M65 92 L65 100" strokeWidth="0.3" />
        {/* Opposite volute hint */}
        <path d="M90 50 Q92 35, 88 25" strokeWidth="0.4" />
      </g>

      {/* PRIMARY - Volute spiral in 3D */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Main spiral - outer to inner */}
        <path d="M85 50 Q85 20, 50 15 Q15 20, 15 50 Q15 75, 40 78 Q60 80, 65 60 Q70 45, 55 38 Q42 32, 38 45 Q35 55, 45 58 Q52 60, 55 52 Q57 46, 50 44 Q45 43, 44 48" strokeWidth={S.P.strokeWidthBold} />

        {/* Inner eye of volute */}
        <circle cx="48" cy="48" r="5" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="48" cy="48" r="2.5" strokeWidth={S.P.strokeWidthLight} />

        {/* Secondary spiral (inner edge showing thickness) */}
        <path d="M80 50 Q80 25, 50 20 Q22 24, 20 50 Q20 70, 38 74 Q55 76, 60 58 Q64 45, 52 40 Q44 36, 42 46" strokeWidth={S.P.strokeWidthLight} opacity={S.D.opacityStrong} />

        {/* Band thickness on outer curve */}
        <path d="M82 52 Q82 22, 50 18" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M18 50 Q18 72, 38 76" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Spiral ridge highlights */}
        <path d="M75 35 Q60 28, 45 30" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M30 65 Q45 70, 55 62" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Connection to echinus (cushion) below */}
        <path d="M15 75 Q15 82, 25 85" strokeWidth={S.P.strokeWidth} />
        <path d="M85 75 Q85 82, 75 85" strokeWidth={S.P.strokeWidth} />

        {/* Channel/canalis of volute */}
        <path d="M40 78 L40 85" strokeWidth={S.P.strokeWidthLight} />
        <path d="M60 78 L60 85" strokeWidth={S.P.strokeWidthLight} />

        {/* Bolster connecting volutes (partial view) */}
        <path d="M25 80 Q50 75, 75 80" strokeWidth={S.P.strokeWidth} />

        {/* Shadow in spiral depths */}
        <path d="M55 42 Q58 48, 54 52" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M35 55 Q32 50, 38 45" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      </g>
    </g>
  </svg>
)

// Export mapping for all decorative elements - MATCHING DATA FILE IDS
export const DECORATIVE_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'acanthus': AcanthusSVG,
  'arabesque': ArabesqueSVG,
  'boss': BossSVG,
  'cartouche': CartoucheSVG,
  'cornice': CorniceSVG,
  'dentil': DentilSVG,
  'egg-and-dart': EggAndDartSVG,
  'finial': FinialSVG,
  'gargoyle': GargoyleSVG,
  'grotesque': GrotesqueSVG,
  'guilloche': GuillocheSVG,
  'muqarnas': DecorativeMuqarnasSVG,
  'rosette': RosetteSVG,
  'volute': VoluteSVG,
}

export {
  AcanthusSVG,
  ArabesqueSVG,
  BossSVG,
  CartoucheSVG,
  CorniceSVG,
  DentilSVG,
  EggAndDartSVG,
  FinialSVG,
  GargoyleSVG,
  GrotesqueSVG,
  GuillocheSVG,
  DecorativeMuqarnasSVG,
  RosetteSVG,
  VoluteSVG,
}
