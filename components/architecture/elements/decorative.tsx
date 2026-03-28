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
 * ACANTHUS - Deeply-lobed botanical leaf motif (Corinthian capital detail)
 * 3D PERSPECTIVE: Three-quarter view of deeply carved leaf curling forward
 * Shows: Multiple deeply-lobed leaves with veins, curling tips, strong shadow carving
 * Distinct: Organic flowing curves, naturalistic foliage with deep relief
 */
const AcanthusSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="acanthus-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#acanthus-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Corinthian capital bell */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M2 8 L98 8" strokeWidth="1" />
        <path d="M5 12 L95 12" strokeWidth="0.8" />
        <path d="M30 92 L30 100" />
        <path d="M70 92 L70 100" />
        <path d="M28 92 Q28 80, 35 72 Q42 65, 50 60" strokeWidth="0.5" />
        <path d="M72 92 Q72 80, 65 72 Q58 65, 50 60" strokeWidth="0.5" />
      </g>

      {/* PRIMARY - Acanthus leaf in deep 3D relief */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Central spine curving forward with thickness */}
        <path d="M50 92 Q48 70, 50 50 Q55 30, 50 15" strokeWidth={S.P.strokeWidthBold} />
        <path d="M52 90 Q50 68, 52 48 Q56 28, 52 16" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* LEFT SIDE LOBES - deeply lobed with serrated edges */}
        {/* Bottom lobe - largest, curling forward */}
        <path d="M50 85 Q30 80, 18 72 Q12 66, 15 60 Q18 64, 28 68 Q38 72, 48 78" strokeWidth={S.P.strokeWidth} />
        {/* Lobe serrations */}
        <path d="M22 74 L19 71 L23 69" strokeWidth={S.D.strokeWidth} />
        <path d="M16 66 L13 63 L17 62" strokeWidth={S.D.strokeWidth} />
        {/* Deep carved shadow between lobes */}
        <rect x="36" y="74" width="8" height="6" rx="2" fill="currentColor" opacity="0.06" stroke="none" />

        {/* Middle lobe */}
        <path d="M48 68 Q26 62, 14 50 Q8 42, 12 36 Q20 42, 32 50 Q42 58, 48 62" strokeWidth={S.P.strokeWidth} />
        <path d="M18 54 L15 51 L19 49" strokeWidth={S.D.strokeWidth} />
        <path d="M12 42 L10 39 L14 38" strokeWidth={S.D.strokeWidth} />
        <rect x="36" y="58" width="8" height="5" rx="2" fill="currentColor" opacity="0.06" stroke="none" />

        {/* Top lobe */}
        <path d="M50 52 Q30 46, 18 35 Q12 28, 16 22 Q26 30, 38 40 Q46 46, 50 50" strokeWidth={S.P.strokeWidth} />
        <path d="M22 38 L19 35 L23 33" strokeWidth={S.D.strokeWidth} />

        {/* RIGHT SIDE LOBES - perspective receding, thinner strokes */}
        <path d="M52 84 Q68 78, 78 68 Q84 62, 80 56 Q74 62, 64 66 Q56 72, 52 76" strokeWidth={S.P.strokeWidthLight} />
        <path d="M52 66 Q70 58, 82 46 Q88 38, 84 32 Q76 40, 64 50 Q56 56, 52 60" strokeWidth={S.P.strokeWidthLight} />
        <path d="M52 50 Q66 44, 76 34 Q82 26, 78 20 Q70 28, 60 38 Q54 44, 52 48" strokeWidth={S.P.strokeWidthLight} />

        {/* Tip curling dramatically forward */}
        <path d="M50 15 Q44 8, 47 3 Q54 6, 52 14" strokeWidth={S.P.strokeWidth} />
        <path d="M48 10 Q50 6, 52 10" strokeWidth={S.D.strokeWidth} />

        {/* Secondary veins radiating from spine */}
        <path d="M48 80 L28 72" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M48 64 L22 52" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M50 48 L26 34" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M52 78 L72 66" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M52 62 L76 46" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Depth shadow fills between lobes */}
        <path d="M38 76 Q35 73, 38 70" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M40 60 Q36 56, 40 52" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
        <path d="M42 44 Q38 40, 42 36" strokeWidth={S.D.strokeWidth} opacity={S.D.opacityStrong} />
      </g>
    </g>
  </svg>
)

/**
 * ARABESQUE - Islamic geometric/floral interlacing pattern
 * Shows: Infinite interlacing vegetal scrolls with geometric precision
 * Distinct: Mathematical beauty, star-and-polygon geometry, endless repetition
 */
const ArabesqueSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="arabesque-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#arabesque-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Tile panel surround */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M6 6 L94 6 L94 94 L6 94 Z" strokeWidth="0.8" />
        <path d="M8 8 L92 8 L92 92 L8 92 Z" />
      </g>

      {/* PRIMARY - 8-pointed star arabesque with interlacing */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Central 8-pointed star formed by two rotated squares */}
        <path d="M50 15 L72 28 L85 50 L72 72 L50 85 L28 72 L15 50 L28 28 Z" strokeWidth={S.P.strokeWidthBold} />
        <path d="M50 22 L67 33 L78 50 L67 67 L50 78 L33 67 L22 50 L33 33 Z" strokeWidth={S.P.strokeWidth} />

        {/* Inner star detail */}
        <path d="M50 28 L61 37 L72 50 L61 63 L50 72 L39 63 L28 50 L39 37 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Central medallion */}
        <circle cx="50" cy="50" r="10" strokeWidth={S.P.strokeWidth} />
        <circle cx="50" cy="50" r="6" strokeWidth={S.D.strokeWidth} />
        {/* 8-fold rosette inside */}
        <path d="M50 44 L53 47 L50 50 L47 47 Z" strokeWidth={S.D.strokeWidthFine} />
        <path d="M56 50 L53 53 L50 50 L53 47 Z" strokeWidth={S.D.strokeWidthFine} />
        <path d="M50 56 L47 53 L50 50 L53 53 Z" strokeWidth={S.D.strokeWidthFine} />
        <path d="M44 50 L47 47 L50 50 L47 53 Z" strokeWidth={S.D.strokeWidthFine} />

        {/* Interlacing bands weaving over/under at star points */}
        {/* Top */}
        <path d="M50 15 Q42 20, 38 15 Q42 10, 50 8" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 15 Q58 20, 62 15 Q58 10, 50 8" strokeWidth={S.P.strokeWidthLight} />
        {/* Bottom */}
        <path d="M50 85 Q42 80, 38 85 Q42 90, 50 92" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 85 Q58 80, 62 85 Q58 90, 50 92" strokeWidth={S.P.strokeWidthLight} />
        {/* Left */}
        <path d="M15 50 Q20 42, 15 38 Q10 42, 8 50" strokeWidth={S.P.strokeWidthLight} />
        <path d="M15 50 Q20 58, 15 62 Q10 58, 8 50" strokeWidth={S.P.strokeWidthLight} />
        {/* Right */}
        <path d="M85 50 Q80 42, 85 38 Q90 42, 92 50" strokeWidth={S.P.strokeWidthLight} />
        <path d="M85 50 Q80 58, 85 62 Q90 58, 92 50" strokeWidth={S.P.strokeWidthLight} />

        {/* Corner vegetal scrollwork */}
        <path d="M12 12 Q22 18, 18 28 Q14 22, 12 12" strokeWidth={S.P.strokeWidthLight} />
        <path d="M88 12 Q78 18, 82 28 Q86 22, 88 12" strokeWidth={S.P.strokeWidthLight} />
        <path d="M12 88 Q22 82, 18 72 Q14 78, 12 88" strokeWidth={S.P.strokeWidthLight} />
        <path d="M88 88 Q78 82, 82 72 Q86 78, 88 88" strokeWidth={S.P.strokeWidthLight} />

        {/* Leaf forms branching from scrolls */}
        <path d="M20 20 Q24 17, 26 22 Q22 25, 20 20" strokeWidth={S.D.strokeWidth} />
        <path d="M80 20 Q76 17, 74 22 Q78 25, 80 20" strokeWidth={S.D.strokeWidth} />
        <path d="M20 80 Q24 83, 26 78 Q22 75, 20 80" strokeWidth={S.D.strokeWidth} />
        <path d="M80 80 Q76 83, 74 78 Q78 75, 80 80" strokeWidth={S.D.strokeWidth} />

        {/* Small geometric fills between star and frame */}
        <path d="M30 18 L35 14 L40 18 L35 22 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M60 18 L65 14 L70 18 L65 22 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M30 82 L35 78 L40 82 L35 86 Z" strokeWidth={S.D.strokeWidth} />
        <path d="M60 82 L65 78 L70 82 L65 86 Z" strokeWidth={S.D.strokeWidth} />

        {/* Depth shadow on interlacing */}
        <rect x="46" y="14" width="8" height="3" rx="1" fill="currentColor" opacity="0.05" stroke="none" />
        <rect x="14" y="46" width="3" height="8" rx="1" fill="currentColor" opacity="0.05" stroke="none" />
      </g>
    </g>
  </svg>
)

/**
 * BOSS - Projecting carved ornament at rib vault intersection
 * 3D PERSPECTIVE: Looking up at projecting boss with deep shadow
 * Shows: Circular carved projection with Green Man face, deep relief
 * Distinct: Strongly projecting from vault, marks rib junctions
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
        {/* Shadow ring around projection */}
        <circle cx="50" cy="50" r="34" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="50" cy="50" r="30" fill="currentColor" opacity="0.04" stroke="currentColor" strokeWidth={S.D.strokeWidthFine} />

        {/* Carved ring with leaf relief */}
        <circle cx="50" cy="50" r="26" strokeWidth={S.P.strokeWidth} />
        <circle cx="50" cy="50" r="22" strokeWidth={S.P.strokeWidthLight} />

        {/* Green Man face - eyes */}
        <ellipse cx="42" cy="44" rx="4.5" ry="3.5" strokeWidth={S.P.strokeWidthLight} />
        <ellipse cx="58" cy="44" rx="4.5" ry="3.5" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="42" cy="44" r="1.8" strokeWidth={S.D.strokeWidth} />
        <circle cx="58" cy="44" r="1.8" strokeWidth={S.D.strokeWidth} />

        {/* Brow ridge */}
        <path d="M36 40 Q42 36, 48 40" strokeWidth={S.P.strokeWidthLight} />
        <path d="M52 40 Q58 36, 64 40" strokeWidth={S.P.strokeWidthLight} />

        {/* Nose */}
        <path d="M50 42 L48 52 Q50 54, 52 52 L50 42" strokeWidth={S.P.strokeWidthLight} />

        {/* Mouth with foliage emerging */}
        <path d="M44 58 Q50 62, 56 58" strokeWidth={S.P.strokeWidthLight} />
        <path d="M46 60 Q50 64, 54 60" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Foliage sprouting from mouth */}
        <path d="M50 62 Q44 70, 34 74" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 62 Q56 70, 66 74" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 62 L50 72" strokeWidth={S.D.strokeWidth} />
        <path d="M40 70 Q38 67, 42 66" strokeWidth={S.D.strokeWidth} />
        <path d="M60 70 Q62 67, 58 66" strokeWidth={S.D.strokeWidth} />

        {/* Crown foliage */}
        <path d="M35 42 Q30 34, 36 28 Q44 26, 50 30" strokeWidth={S.P.strokeWidthLight} />
        <path d="M65 42 Q70 34, 64 28 Q56 26, 50 30" strokeWidth={S.P.strokeWidthLight} />

        {/* Leaf motifs on surrounding ring */}
        <path d="M22 50 Q25 45, 28 50 Q25 55, 22 50" strokeWidth={S.D.strokeWidth} />
        <path d="M78 50 Q75 45, 72 50 Q75 55, 78 50" strokeWidth={S.D.strokeWidth} />
        <path d="M50 22 Q45 25, 50 28 Q55 25, 50 22" strokeWidth={S.D.strokeWidth} />
        <path d="M50 78 Q45 75, 50 72 Q55 75, 50 78" strokeWidth={S.D.strokeWidth} />

        {/* 3D projection shadow */}
        <path d="M78 58 Q74 68, 66 76" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M58 78 Q68 74, 76 66" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      </g>
    </g>
  </svg>
)

/**
 * CARTOUCHE - Scrolled decorative frame/shield for inscriptions
 * 3D PERSPECTIVE: Baroque scrollwork frame with deep relief
 * Shows: Rolled scrollwork frame with curling volutes, central tablet
 * Distinct: Baroque curves, heraldic quality, dramatic scrollwork
 */
const CartoucheSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="cartouche-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#cartouche-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Building facade */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M0 3 L100 3" strokeWidth="0.8" />
        <path d="M0 6 L100 6" strokeWidth="0.6" />
        <path d="M5 0 L5 100" strokeWidth="0.4" />
        <path d="M95 0 L95 100" strokeWidth="0.4" />
      </g>

      {/* PRIMARY - Ornate cartouche frame in 3D */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Central shield/tablet shape */}
        <path d="M25 25 Q25 14, 50 12 Q75 14, 75 25 L75 65 Q75 80, 50 85 Q25 80, 25 65 Z" strokeWidth={S.P.strokeWidthBold} />
        {/* Inner relief line */}
        <path d="M28 28 Q28 20, 50 18 Q72 20, 72 28 L72 62 Q72 75, 50 80 Q28 75, 28 62 Z" strokeWidth={S.P.strokeWidthLight} opacity={S.D.opacityStrong} />
        {/* Shadow fill for depth */}
        <path d="M30 30 Q30 22, 50 20 Q70 22, 70 30 L70 60 Q70 72, 50 77 Q30 72, 30 60 Z" fill="currentColor" opacity="0.04" stroke="none" />

        {/* Top scrollwork - curling volutes */}
        <path d="M50 12 Q38 5, 28 10 Q20 16, 25 25" strokeWidth={S.P.strokeWidth} />
        <path d="M50 12 Q62 5, 72 10 Q80 16, 75 25" strokeWidth={S.P.strokeWidth} />
        {/* Volute spirals */}
        <path d="M28 14 Q22 10, 18 16 Q16 24, 20 22 Q24 20, 26 18" strokeWidth={S.P.strokeWidthLight} />
        <path d="M72 14 Q78 10, 82 16 Q84 24, 80 22 Q76 20, 74 18" strokeWidth={S.P.strokeWidthLight} />

        {/* Side scroll ornaments with curl */}
        <path d="M25 40 Q14 42, 10 50 Q8 60, 16 56 Q22 52, 25 55" strokeWidth={S.P.strokeWidth} />
        <path d="M75 40 Q86 42, 90 50 Q92 60, 84 56 Q78 52, 75 55" strokeWidth={S.P.strokeWidth} />
        {/* Side volute spirals */}
        <path d="M12 54 Q8 52, 10 48 Q14 46, 16 50" strokeWidth={S.D.strokeWidth} />
        <path d="M88 54 Q92 52, 90 48 Q86 46, 84 50" strokeWidth={S.D.strokeWidth} />

        {/* Bottom scroll and pendant */}
        <path d="M50 85 Q34 88, 28 80 Q26 74, 30 76" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 85 Q66 88, 72 80 Q74 74, 70 76" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 85 L50 94" strokeWidth={S.P.strokeWidth} />
        <path d="M45 94 Q50 100, 55 94" strokeWidth={S.P.strokeWidthLight} />

        {/* Leaf accents on scrollwork */}
        <path d="M16 46 Q12 43, 14 40 Q18 42, 16 46" strokeWidth={S.D.strokeWidth} />
        <path d="M84 46 Q88 43, 86 40 Q82 42, 84 46" strokeWidth={S.D.strokeWidth} />

        {/* Central inscription area */}
        <path d="M35 35 L65 35 L65 60 L35 60 Z" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M40 42 L60 42" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M38 48 L62 48" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <path d="M40 54 L60 54" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      </g>
    </g>
  </svg>
)

/**
 * CORNICE - Projecting horizontal molding at wall/ceiling junction
 * 3D PERSPECTIVE: 3/4 view looking up at projecting cornice profile
 * Shows: Multiple stacked molding profiles, deep shadows beneath corona
 * Distinct: Classical proportions, strong horizontal projection
 */
const CorniceSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="cornice-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#cornice-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Wall below and roof above */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M-10 25 L110 25" strokeWidth="0.7" />
        <path d="M-10 80 L110 80" strokeWidth="0.4" opacity="0.5" />
        <path d="M-10 88 L110 88" strokeWidth="0.4" opacity="0.5" />
        <path d="M5 72 L12 72 L12 85" strokeWidth="0.5" opacity="0.6" />
        <path d="M88 72 L95 72 L95 85" strokeWidth="0.5" opacity="0.6" />
      </g>

      {/* PRIMARY - Cornice profile showing 3D projection */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Corona / drip edge - the big projecting cap */}
        <path d="M0 32 L100 32" strokeWidth={S.P.strokeWidthBold} />
        <path d="M0 35 L100 35" strokeWidth={S.P.strokeWidthBold} />
        {/* Soffit (underside) showing depth */}
        <path d="M5 35 L5 40 L95 40 L95 35" strokeWidth={S.P.strokeWidth} />
        {/* Deep shadow under corona */}
        <rect x="5" y="36" width="90" height="4" fill="currentColor" opacity="0.08" stroke="none" />

        {/* Cyma recta S-curve molding */}
        <path d="M0 40 L100 40" strokeWidth={S.P.strokeWidthLight} />
        {/* S-curve profile repeated */}
        <path d="M0 40 Q8 46, 0 52" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M20 40 Q28 46, 20 52" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M40 40 Q48 46, 40 52" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M60 40 Q68 46, 60 52" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M80 40 Q88 46, 80 52" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M0 52 L100 52" strokeWidth={S.P.strokeWidthLight} />

        {/* Dentil band */}
        <path d="M0 55 L100 55" strokeWidth={S.P.strokeWidthLight} />
        <path d="M0 64 L100 64" strokeWidth={S.P.strokeWidthLight} />
        {/* Individual dentil blocks with shadow */}
        {[6, 16, 26, 36, 46, 56, 66, 76, 86, 96].map((x, i) => (
          <g key={i}>
            <path d={`M${x} 55 L${x} 64 L${x + 6} 64 L${x + 6} 55 Z`} strokeWidth={S.P.strokeWidthLight} />
            <rect x={x + 1} y={56} width={4} height={7} fill="currentColor" opacity="0.04" stroke="none" />
          </g>
        ))}

        {/* Bed molding */}
        <path d="M0 67 L100 67" strokeWidth={S.P.strokeWidth} />

        {/* Architrave (bottom) */}
        <path d="M0 67 L0 72 L100 72 L100 67" strokeWidth={S.P.strokeWidth} />
        <path d="M0 72 L100 72" strokeWidth={S.P.strokeWidthBold} />
      </g>
    </g>
  </svg>
)

/**
 * DENTIL - Row of small rectangular blocks like teeth
 * Shows: Evenly spaced rectangular tooth-like blocks in rhythmic row
 * Distinct: Classical Roman detail, repetitive geometric, strong rhythm
 */
const DentilSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="dentil-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#dentil-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Entablature */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M0 10 L100 10" strokeWidth="1.2" />
        <path d="M0 15 L100 15" strokeWidth="0.8" />
        <path d="M0 78 L100 78" strokeWidth="0.8" />
        <path d="M0 82 L100 82" strokeWidth="1" />
      </g>

      {/* PRIMARY - 3/4 perspective dentil row with visible top and front faces */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Upper bed molding */}
        <path d="M0 25 L100 25" strokeWidth={S.P.strokeWidthBold} />
        <path d="M0 28 L100 28" strokeWidth={S.P.strokeWidthLight} />

        {/* Dentil blocks - showing front face and top face in 3/4 */}
        {[4, 16, 28, 40, 52, 64, 76, 88].map((x, i) => (
          <g key={i}>
            {/* Front face */}
            <path d={`M${x} 32 L${x} 60 L${x + 10} 60 L${x + 10} 32 Z`} strokeWidth={S.P.strokeWidth} />
            {/* Top face (3D) */}
            <path d={`M${x} 32 L${x + 2} 28 L${x + 12} 28 L${x + 10} 32`} strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
            {/* Right side face (3D) */}
            <path d={`M${x + 10} 32 L${x + 12} 28 L${x + 12} 56 L${x + 10} 60`} strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
            {/* Shadow fill on front face */}
            <rect x={x + 1} y={34} width={8} height={24} fill="currentColor" opacity="0.04" stroke="none" />
          </g>
        ))}

        {/* Deep shadows between dentils */}
        {[14, 26, 38, 50, 62, 74, 86].map((x, i) => (
          <rect key={i} x={x} y={32} width={2} height={28} fill="currentColor" opacity="0.1" stroke="none" />
        ))}

        {/* Lower bed molding */}
        <path d="M0 65 L100 65" strokeWidth={S.P.strokeWidthLight} />
        <path d="M0 68 L100 68" strokeWidth={S.P.strokeWidthBold} />
      </g>
    </g>
  </svg>
)

/**
 * EGG AND DART - Alternating oval eggs and pointed dart/arrow shapes
 * Shows: Ovolo molding with alternating egg (oval) and dart (arrow) motifs
 * Distinct: Classical Roman, rhythmic alternation of rounded and pointed forms
 */
const EggAndDartSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="eggdart-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#eggdart-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Entablature */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M0 12 L100 12" strokeWidth="1" />
        <path d="M0 16 L100 16" strokeWidth="0.8" />
        <path d="M0 82 L100 82" strokeWidth="0.8" />
        <path d="M0 88 L100 88" strokeWidth="0.6" />
      </g>

      {/* PRIMARY - Egg and dart with 3D relief */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Curved ovolo molding surface */}
        <path d="M0 24 Q50 18, 100 24" strokeWidth={S.P.strokeWidth} />
        <path d="M0 27 L100 27" strokeWidth={S.P.strokeWidthLight} />

        {/* EGG 1 */}
        <ellipse cx="14" cy="48" rx="8" ry="14" strokeWidth={S.P.strokeWidth} />
        <ellipse cx="14" cy="48" rx="4.5" ry="9" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M14 34 L14 30" strokeWidth={S.D.strokeWidth} />
        {/* Shell highlight */}
        <path d="M10 40 Q14 37, 18 40" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        {/* Egg shadow */}
        <ellipse cx="15" cy="50" rx="5" ry="10" fill="currentColor" opacity="0.04" stroke="none" />

        {/* DART 1 */}
        <path d="M28 32 L31 50 L28 68 L25 50 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M28 38 L28 62" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* EGG 2 (center-left, larger) */}
        <ellipse cx="42" cy="48" rx="9" ry="16" strokeWidth={S.P.strokeWidthBold} />
        <ellipse cx="42" cy="48" rx="5" ry="10" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        <path d="M42 32 L42 27" strokeWidth={S.D.strokeWidth} />
        <path d="M38 40 Q42 37, 46 40" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
        <ellipse cx="43" cy="50" rx="6" ry="11" fill="currentColor" opacity="0.04" stroke="none" />

        {/* DART 2 */}
        <path d="M56 32 L60 50 L56 68 L52 50 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M56 36 L56 64" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* EGG 3 (center-right, largest) */}
        <ellipse cx="72" cy="48" rx="10" ry="17" strokeWidth={S.P.strokeWidthBold} />
        <ellipse cx="72" cy="48" rx="6" ry="11" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M72 31 L72 25" strokeWidth={S.P.strokeWidthLight} />
        <path d="M68 38 Q72 34, 76 38" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        <ellipse cx="73" cy="50" rx="7" ry="12" fill="currentColor" opacity="0.04" stroke="none" />

        {/* DART 3 */}
        <path d="M87 32 L91 50 L87 68 L83 50 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M87 36 L87 64" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Lower molding edge */}
        <path d="M0 72 L100 72" strokeWidth={S.P.strokeWidthLight} />
        <path d="M0 76 Q50 82, 100 76" strokeWidth={S.P.strokeWidth} />
      </g>
    </g>
  </svg>
)

/**
 * FINIAL - Ornament at apex of gable, spire, or post
 * 3D PERSPECTIVE: Looking up at finial crowning element
 * Shows: Fleur-de-lis or bulb form with ball at apex, decorative rings
 * Distinct: Crowning vertical element, upward emphasis
 */
const FinialSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="finial-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#finial-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Gothic pinnacle below */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M22 95 L50 80 L78 95" strokeWidth="0.8" />
        <path d="M40 82 L40 100" strokeWidth="0.6" />
        <path d="M60 82 L60 100" strokeWidth="0.6" />
        <path d="M30 90 Q28 88, 30 86" strokeWidth="0.4" />
        <path d="M70 90 Q72 88, 70 86" strokeWidth="0.4" />
      </g>

      {/* PRIMARY - Finial in 3D with shadow */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Base mounting plate - elliptical for 3/4 */}
        <ellipse cx="50" cy="78" rx="14" ry="5" strokeWidth={S.P.strokeWidth} />
        <path d="M36 78 L36 82 L64 82 L64 78" strokeWidth={S.P.strokeWidthLight} />

        {/* Lower vase form */}
        <path d="M42 78 Q40 72, 44 66 Q50 62, 56 66 Q60 72, 58 78" strokeWidth={S.P.strokeWidth} />
        {/* Shadow on vase */}
        <path d="M54 74 Q58 70, 56 66" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Neck with decorative rings */}
        <path d="M44 66 L44 60 Q50 58, 56 60 L56 66" strokeWidth={S.P.strokeWidth} />
        <path d="M45 64 L55 64" strokeWidth={S.D.strokeWidth} />
        <path d="M46 62 L54 62" strokeWidth={S.D.strokeWidth} />

        {/* Central body - onion/ball shape */}
        <path d="M38 56 Q38 44, 50 38 Q62 44, 62 56" strokeWidth={S.P.strokeWidthBold} />
        <path d="M44 60 Q40 58, 38 56" strokeWidth={S.P.strokeWidth} />
        <path d="M56 60 Q60 58, 62 56" strokeWidth={S.P.strokeWidth} />
        {/* Highlight curve */}
        <path d="M44 48 Q50 44, 56 48" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        {/* Shadow fill */}
        <ellipse cx="52" cy="50" rx="8" ry="10" fill="currentColor" opacity="0.04" stroke="none" />

        {/* Fleur-de-lis crown */}
        <path d="M50 38 L50 22" strokeWidth={S.P.strokeWidthBold} />
        {/* Central petal */}
        <path d="M47 24 Q50 14, 53 24" strokeWidth={S.P.strokeWidth} />
        {/* Side petals */}
        <path d="M50 32 Q40 26, 36 32 Q33 40, 38 38" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 32 Q60 26, 64 32 Q67 40, 62 38" strokeWidth={S.P.strokeWidthLight} />

        {/* Apex ball */}
        <circle cx="50" cy="10" r="5" strokeWidth={S.P.strokeWidth} />
        <circle cx="50" cy="10" r="2.5" strokeWidth={S.D.strokeWidth} />
        {/* Ball highlight */}
        <path d="M47 8 Q50 6, 53 8" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />
      </g>
    </g>
  </svg>
)

/**
 * GARGOYLE - Grotesque water spout projecting from wall
 * 3D PERSPECTIVE: Looking up at projecting dragon/demon figure
 * Shows: Fantastic creature with open mouth for drainage, strong 3D projection
 * Distinct: Functional drainage + decorative, projects dramatically from wall
 */
const GargoyleSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="gargoyle-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#gargoyle-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Cathedral wall and parapet */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M78 -5 L78 100" strokeWidth="0.8" />
        <path d="M85 -5 L85 100" strokeWidth="0.7" />
        <path d="M78 10 L100 10" strokeWidth="0.4" opacity="0.6" />
        <path d="M78 35 L100 35" strokeWidth="0.9" opacity="0.7" />
        <path d="M73 38 L100 38" strokeWidth="0.7" opacity="0.5" />
        <path d="M78 60 L100 60" strokeWidth="0.4" opacity="0.6" />
        <path d="M78 90 L100 90" strokeWidth="0.4" opacity="0.6" />
      </g>

      {/* PRIMARY - Gargoyle projecting outward in 3D */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Mounting block where body meets wall */}
        <path d="M78 35 L78 58 L72 58 L72 38" strokeWidth={S.P.strokeWidth} />
        <rect x="72" y="38" width="6" height="20" fill="currentColor" opacity="0.06" stroke="none" />

        {/* Body emerging from wall - muscular and textured */}
        <path d="M72 40 Q60 36, 45 42 Q32 48, 25 45" strokeWidth={S.P.strokeWidthBold} />
        <path d="M72 55 Q62 58, 48 54 Q36 50, 28 56" strokeWidth={S.P.strokeWidthBold} />
        {/* Body underside shadow */}
        <path d="M70 52 Q58 56, 45 52 Q34 48, 30 54" fill="currentColor" opacity="0.06" stroke="none" />

        {/* Head - fierce dragon/demon face */}
        <path d="M25 45 Q18 38, 12 42 Q5 48, 10 56 Q16 62, 28 56" strokeWidth={S.P.strokeWidthBold} />

        {/* Open mouth (water spout) - deep recess */}
        <path d="M10 48 L3 48 L3 54 L10 54" strokeWidth={S.P.strokeWidth} />
        <rect x="3" y="48" width="7" height="6" fill="currentColor" opacity="0.1" stroke="none" />
        {/* Tongue */}
        <path d="M8 51 Q4 52, 1 51" strokeWidth={S.D.strokeWidth} />

        {/* Eyes - bulging */}
        <circle cx="18" cy="44" r="4" strokeWidth={S.P.strokeWidth} />
        <circle cx="18" cy="44" r="2" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth={S.D.strokeWidth} />
        <circle cx="26" cy="42" r="3" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="26" cy="42" r="1.5" strokeWidth={S.D.strokeWidth} />

        {/* Horns */}
        <path d="M20 38 Q16 30, 20 24 Q24 30, 22 36" strokeWidth={S.P.strokeWidthLight} />
        <path d="M30 38 Q34 28, 38 24 Q36 32, 32 38" strokeWidth={S.P.strokeWidthLight} />

        {/* Fangs */}
        <path d="M12 46 L14 44" strokeWidth={S.D.strokeWidth} />
        <path d="M12 56 L14 58" strokeWidth={S.D.strokeWidth} />

        {/* Wing/fin on back */}
        <path d="M42 38 Q48 30, 58 34 Q52 38, 46 42" strokeWidth={S.P.strokeWidth} />
        <path d="M46 34 L50 36" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Clawed feet gripping ledge */}
        <path d="M32 56 Q28 64, 22 68" strokeWidth={S.P.strokeWidthLight} />
        <path d="M22 68 L19 72" strokeWidth={S.D.strokeWidth} />
        <path d="M24 66 L22 70" strokeWidth={S.D.strokeWidth} />
        <path d="M27 64 L26 68" strokeWidth={S.D.strokeWidth} />

        {/* Scale texture */}
        <path d="M50 46 Q53 48, 50 50" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M58 44 Q61 46, 58 48" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M65 45 Q68 47, 65 49" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Water stream effect */}
        <path d="M1 52 Q-2 60, 2 72 Q6 84, 4 96" strokeWidth={S.E.strokeWidth} strokeDasharray={S.E.dash} opacity={S.E.opacityModerate} />
      </g>
    </g>
  </svg>
)

/**
 * GROTESQUE - Decorative carved hybrid figure (non-functional, no drainage)
 * Shows: Hybrid creature or fantastical face in circular medallion
 * Distinct: Wall-mounted, purely decorative (unlike gargoyle), often in medallion
 */
const GrotesqueSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="grotesque-halo" intensity={0.88} />}
    <g filter={showHalo ? "url(#grotesque-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Cathedral facade wall */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M-5 5 L105 5" strokeWidth="0.8" opacity="0.6" />
        <path d="M-5 95 L105 95" strokeWidth="0.8" opacity="0.6" />
        <path d="M-5 8 L8 8" opacity="0.5" />
        <path d="M92 8 L105 8" opacity="0.5" />
        <circle cx="-15" cy="50" r="18" opacity="0.3" />
        <circle cx="115" cy="50" r="18" opacity="0.3" />
      </g>

      {/* PRIMARY - Grotesque in circular medallion */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Circular medallion frame with depth */}
        <circle cx="50" cy="50" r="40" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="50" cy="50" r="37" strokeWidth={S.P.strokeWidthLight} />
        {/* Inner shadow ring */}
        <circle cx="50" cy="50" r="35" fill="currentColor" opacity="0.04" stroke="none" />

        {/* Face - human-animal hybrid */}
        <ellipse cx="50" cy="45" rx="20" ry="24" strokeWidth={S.P.strokeWidth} />

        {/* Wild mane/hair */}
        <path d="M30 35 Q26 22, 34 16 Q42 14, 50 18" strokeWidth={S.P.strokeWidth} />
        <path d="M70 35 Q74 22, 66 16 Q58 14, 50 18" strokeWidth={S.P.strokeWidth} />
        <path d="M36 22 Q40 17, 45 20" strokeWidth={S.D.strokeWidth} />
        <path d="M55 20 Q60 17, 64 22" strokeWidth={S.D.strokeWidth} />
        <path d="M50 18 Q48 12, 52 14" strokeWidth={S.D.strokeWidth} />

        {/* Large expressive eyes */}
        <ellipse cx="41" cy="38" rx="6.5" ry="5.5" strokeWidth={S.P.strokeWidthLight} />
        <ellipse cx="59" cy="38" rx="6.5" ry="5.5" strokeWidth={S.P.strokeWidthLight} />
        <circle cx="41" cy="38" r="3" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth={S.D.strokeWidth} />
        <circle cx="59" cy="38" r="3" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth={S.D.strokeWidth} />

        {/* Heavy brows */}
        <path d="M34 32 Q41 28, 48 32" strokeWidth={S.P.strokeWidth} />
        <path d="M52 32 Q59 28, 66 32" strokeWidth={S.P.strokeWidth} />

        {/* Wide nose */}
        <path d="M50 40 L48 50 Q50 53, 52 50 L50 40" strokeWidth={S.P.strokeWidthLight} />

        {/* Grimacing mouth with tongue sticking out */}
        <path d="M38 58 Q50 66, 62 58" strokeWidth={S.P.strokeWidth} />
        <path d="M42 60 Q50 64, 58 60" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M50 62 Q50 68, 50 72" strokeWidth={S.D.strokeWidth} />

        {/* Pointed ears */}
        <path d="M28 40 Q20 34, 23 24 Q26 30, 30 36" strokeWidth={S.P.strokeWidthLight} />
        <path d="M72 40 Q80 34, 77 24 Q74 30, 70 36" strokeWidth={S.P.strokeWidthLight} />

        {/* Foliage from mouth/beard */}
        <path d="M42 66 Q34 74, 28 70 Q30 76, 36 74" strokeWidth={S.P.strokeWidthLight} />
        <path d="M58 66 Q66 74, 72 70 Q70 76, 64 74" strokeWidth={S.P.strokeWidthLight} />
        <path d="M50 70 Q48 78, 44 84" strokeWidth={S.D.strokeWidth} />
        <path d="M50 70 Q52 78, 56 84" strokeWidth={S.D.strokeWidth} />
      </g>
    </g>
  </svg>
)

/**
 * GUILLOCHE - Interlacing curved bands forming circular voids
 * Shows: Continuous interlocking braided pattern with over-under weave
 * Distinct: Celtic/Classical, rope-like infinite weaving, circular voids
 */
const GuillocheSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="guilloche-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#guilloche-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Doorframe surround */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M-5 22 L105 22" strokeWidth="0.5" opacity="0.5" />
        <path d="M-5 25 L105 25" strokeWidth="0.6" />
        <path d="M-5 75 L105 75" strokeWidth="0.6" />
        <path d="M-5 78 L105 78" strokeWidth="0.5" opacity="0.5" />
      </g>

      {/* PRIMARY - Guilloche interlacing with depth */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Upper border */}
        <path d="M0 30 L100 30" strokeWidth={S.P.strokeWidth} />
        <path d="M0 35 L100 35" strokeWidth={S.D.strokeWidth} />

        {/* Band A - sinusoidal wave going OVER at peaks */}
        <path d="M0 50 Q12.5 30, 25 50 Q37.5 70, 50 50 Q62.5 30, 75 50 Q87.5 70, 100 50" strokeWidth={S.P.strokeWidthBold} />

        {/* Band B - opposite phase, going OVER at its peaks */}
        <path d="M0 50 Q12.5 70, 25 50 Q37.5 30, 50 50 Q62.5 70, 75 50 Q87.5 30, 100 50" strokeWidth={S.P.strokeWidthBold} />

        {/* Inner bands for double-strand effect */}
        <path d="M2 50 Q14 34, 25 50 Q36 66, 50 50 Q64 34, 75 50 Q86 66, 98 50" strokeWidth={S.P.strokeWidth} />
        <path d="M2 50 Q14 66, 25 50 Q36 34, 50 50 Q64 66, 75 50 Q86 34, 98 50" strokeWidth={S.P.strokeWidth} />

        {/* Over-under crossing shadows (where bands overlap) */}
        {[12, 37, 62, 87].map((x, i) => (
          <rect key={i} x={x - 2} y={46} width={4} height={8} rx="1" fill="currentColor" opacity="0.07" stroke="none" />
        ))}

        {/* Circular voids created by interlacing */}
        <circle cx="25" cy="50" r="9" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />
        <circle cx="50" cy="50" r="11" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <circle cx="75" cy="50" r="9" strokeWidth={S.D.strokeWidth} opacity={S.D.opacitySubtle} />

        {/* Central rosettes in voids */}
        <circle cx="25" cy="50" r="3.5" strokeWidth={S.D.strokeWidth} />
        <path d="M22 50 L28 50 M25 47 L25 53" strokeWidth={S.D.strokeWidthFine} />

        <circle cx="50" cy="50" r="4.5" strokeWidth={S.D.strokeWidth} />
        <path d="M46 50 L54 50 M50 46 L50 54" strokeWidth={S.D.strokeWidth} />
        <path d="M47 47 L53 53 M53 47 L47 53" strokeWidth={S.E.strokeWidth} />

        <circle cx="75" cy="50" r="3.5" strokeWidth={S.D.strokeWidth} />
        <path d="M72 50 L78 50 M75 47 L75 53" strokeWidth={S.D.strokeWidthFine} />

        {/* Lower border */}
        <path d="M0 65 L100 65" strokeWidth={S.D.strokeWidth} />
        <path d="M0 70 L100 70" strokeWidth={S.P.strokeWidth} />
      </g>
    </g>
  </svg>
)

/**
 * MUQARNAS - Islamic honeycomb/stalactite decorative vaulting
 * 3D PERSPECTIVE: Looking up into cascading geometric cells
 * Shows: Tiered geometric niches creating 3D honeycomb vault
 * Distinct: Complex Islamic geometry, stalactite-like projecting cells
 */
const DecorativeMuqarnasSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="muqarnas-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#muqarnas-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Arch/niche surround */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 95 L5 10 Q50 -5, 95 10 L95 95" />
        <path d="M0 95 L100 95" />
      </g>

      {/* PRIMARY - Muqarnas stalactite vaulting from below at angle */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Top tier - smallest cells (apex) */}
        <path d="M40 10 L50 8 L60 10 L55 18 L45 18 Z" strokeWidth={S.P.strokeWidth} />
        <rect x="44" y="10" width="12" height="7" fill="currentColor" opacity="0.08" stroke="none" />

        {/* Second tier - medium cells */}
        <path d="M30 18 L40 15 L45 18 L42 28 L33 28 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M55 18 L60 15 L70 18 L67 28 L58 28 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M45 18 L55 18 L52 28 L48 28 Z" strokeWidth={S.P.strokeWidthLight} />
        <rect x="32" y="20" width="10" height="6" fill="currentColor" opacity="0.07" stroke="none" />
        <rect x="57" y="20" width="10" height="6" fill="currentColor" opacity="0.07" stroke="none" />

        {/* Third tier - larger cells */}
        <path d="M18 28 L30 25 L33 28 L30 40 L22 40 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M33 28 L42 28 L40 40 L34 40 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M42 28 L48 28 L47 40 L43 40 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M52 28 L58 28 L57 40 L53 40 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M58 28 L67 28 L66 40 L60 40 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M67 28 L70 25 L82 28 L78 40 L70 40 Z" strokeWidth={S.P.strokeWidth} />
        {/* Shadow fills */}
        <rect x="20" y="30" width="10" height="8" fill="currentColor" opacity="0.06" stroke="none" />
        <rect x="70" y="30" width="8" height="8" fill="currentColor" opacity="0.06" stroke="none" />

        {/* Fourth tier - large cells */}
        <path d="M10 40 L18 36 L22 40 L20 55 L14 55 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M22 40 L34 40 L32 55 L24 55 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M40 40 L53 40 L51 55 L42 55 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M57 40 L66 40 L64 55 L58 55 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M70 40 L78 40 L76 55 L72 55 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M78 40 L82 36 L90 40 L86 55 L80 55 Z" strokeWidth={S.P.strokeWidth} />
        <rect x="12" y="42" width="8" height="10" fill="currentColor" opacity="0.06" stroke="none" />
        <rect x="80" y="42" width="6" height="10" fill="currentColor" opacity="0.06" stroke="none" />

        {/* Fifth tier - largest cells at bottom */}
        <path d="M5 55 L10 50 L14 55 L12 72 L8 72 Z" strokeWidth={S.P.strokeWidth} />
        <path d="M14 55 L24 55 L22 72 L16 72 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M32 55 L42 55 L40 72 L34 72 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M51 55 L58 55 L56 72 L52 72 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M64 55 L72 55 L70 72 L66 72 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M80 55 L86 55 L84 72 L82 72 Z" strokeWidth={S.P.strokeWidthLight} />
        <path d="M86 55 L90 50 L95 55 L92 72 L88 72 Z" strokeWidth={S.P.strokeWidth} />

        {/* Bottom edge transition */}
        <path d="M5 72 L95 72" strokeWidth={S.P.strokeWidth} />
        <path d="M8 72 L8 80 L16 80 L16 72" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M22 72 L22 80 L34 80 L34 72" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M40 72 L40 80 L52 80 L52 72" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M56 72 L56 80 L66 80 L66 72" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M70 72 L70 80 L82 80 L82 72" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        <path d="M88 72 L88 80 L92 80 L92 72" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
      </g>
    </g>
  </svg>
)

/**
 * ROSETTE - Circular flower-like ornament
 * Shows: Radiating petals from center, circular symmetry
 * Distinct: Flower form, strong radial symmetry, decorative boss
 */
const RosetteSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="rosette-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#rosette-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Coffered panel surround */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 5 L95 5 L95 95 L5 95 Z" strokeWidth="0.8" />
        <path d="M8 8 L92 8 L92 92 L8 92 Z" strokeWidth="0.5" />
      </g>

      {/* PRIMARY - Rosette with 3D petal relief */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Outer ring */}
        <circle cx="50" cy="50" r="38" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="50" cy="50" r="35" strokeWidth={S.P.strokeWidthLight} />

        {/* 8 radiating petals with depth */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const rad2 = ((angle + 22) * Math.PI) / 180
          const rad3 = ((angle - 22) * Math.PI) / 180
          const x1 = 50 + 14 * Math.cos(rad)
          const y1 = 50 + 14 * Math.sin(rad)
          const x2 = 50 + 32 * Math.cos(rad)
          const y2 = 50 + 32 * Math.sin(rad)
          const cx1 = 50 + 24 * Math.cos(rad2)
          const cy1 = 50 + 24 * Math.sin(rad2)
          const cx2 = 50 + 24 * Math.cos(rad3)
          const cy2 = 50 + 24 * Math.sin(rad3)
          return (
            <g key={i}>
              {/* Petal outline */}
              <path d={`M${x1.toFixed(1)} ${y1.toFixed(1)} Q${cx1.toFixed(1)} ${cy1.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)} Q${cx2.toFixed(1)} ${cy2.toFixed(1)}, ${x1.toFixed(1)} ${y1.toFixed(1)}`} strokeWidth={S.P.strokeWidth} />
              {/* Center vein */}
              <path d={`M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`} strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
            </g>
          )
        })}

        {/* Central boss - raised center */}
        <circle cx="50" cy="50" r="12" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="50" cy="50" r="8" strokeWidth={S.P.strokeWidth} />
        <circle cx="50" cy="50" r="4" strokeWidth={S.D.strokeWidth} />
        {/* Boss shadow for projection */}
        <circle cx="52" cy="52" r="10" fill="currentColor" opacity="0.05" stroke="none" />

        {/* Small petals between main petals */}
        {[22, 67, 112, 157, 202, 247, 292, 337].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x = 50 + 28 * Math.cos(rad)
          const y = 50 + 28 * Math.sin(rad)
          return <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="3" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />
        })}
      </g>
    </g>
  </svg>
)

/**
 * VOLUTE - Spiral scroll ornament (Ionic capital)
 * Shows: Tight mathematical spiral with eye at center
 * Distinct: Ionic order signature, logarithmic spiral, eye at center
 */
const VoluteSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="volute-halo" intensity={0.88} />}
    <g filter={showHalo ? "url(#volute-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap={S.P.strokeLinecap}>
      {/* CONTEXT (near): Ionic capital and column shaft */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M30 80 L30 100" />
        <path d="M70 80 L70 100" />
        <path d="M25 78 L75 78" strokeWidth="0.5" />
        <path d="M0 10 L100 10" strokeWidth="0.7" />
        <path d="M0 14 L100 14" strokeWidth="0.5" />
      </g>

      {/* PRIMARY - Volute spiral in 3D relief */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Abacus block (top of capital) */}
        <path d="M10 15 L90 15 L90 22 L10 22 Z" strokeWidth={S.P.strokeWidth} />

        {/* Echinus (egg-and-dart) between volutes */}
        <path d="M35 22 L65 22 L65 30 L35 30 Z" strokeWidth={S.P.strokeWidthLight} />
        <ellipse cx="42" cy="26" rx="3" ry="4" strokeWidth={S.D.strokeWidth} />
        <ellipse cx="50" cy="26" rx="3" ry="4" strokeWidth={S.D.strokeWidth} />
        <ellipse cx="58" cy="26" rx="3" ry="4" strokeWidth={S.D.strokeWidth} />

        {/* LEFT VOLUTE - tight spiral */}
        {/* Outermost spiral */}
        <path d="M35 22 Q10 22, 10 45 Q10 68, 35 68 Q55 68, 55 50 Q55 35, 40 35 Q28 35, 28 45 Q28 55, 38 55 Q46 55, 46 48 Q46 42, 40 42 Q35 42, 35 46 Q35 50, 38 50" strokeWidth={S.P.strokeWidthBold} />
        {/* Eye of the spiral */}
        <circle cx="38" cy="47" r="4" strokeWidth={S.P.strokeWidth} />
        <circle cx="38" cy="47" r="2" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth={S.D.strokeWidth} />
        {/* Shadow on spiral for depth */}
        <path d="M12 50 Q12 65, 35 66" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* RIGHT VOLUTE - mirror */}
        <path d="M65 22 Q90 22, 90 45 Q90 68, 65 68 Q45 68, 45 50 Q45 35, 60 35 Q72 35, 72 45 Q72 55, 62 55 Q54 55, 54 48 Q54 42, 60 42 Q65 42, 65 46 Q65 50, 62 50" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="62" cy="47" r="4" strokeWidth={S.P.strokeWidth} />
        <circle cx="62" cy="47" r="2" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth={S.D.strokeWidth} />
        <path d="M88 50 Q88 65, 65 66" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle} />

        {/* Connecting band between volutes */}
        <path d="M35 68 Q50 75, 65 68" strokeWidth={S.P.strokeWidth} />
        <path d="M35 72 Q50 78, 65 72" strokeWidth={S.D.strokeWidth} opacity={S.D.opacity} />

        {/* Column neck fluting hint */}
        <path d="M35 72 L35 78" strokeWidth={S.D.strokeWidth} />
        <path d="M45 74 L45 78" strokeWidth={S.D.strokeWidth} />
        <path d="M55 74 L55 78" strokeWidth={S.D.strokeWidth} />
        <path d="M65 72 L65 78" strokeWidth={S.D.strokeWidth} />
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
