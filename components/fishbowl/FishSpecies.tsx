'use client'

import { memo } from 'react'

// Smooth SVG fish that evolve based on stock score tiers
// Tier 0: 0-9 (Guppy), Tier 1: 10-24 (Tetra), Tier 2: 25-49 (Angelfish),
// Tier 3: 50-99 (Clownfish), Tier 4: 100-199 (Tang), Tier 5: 200+ (Betta)

export type FishTier = 0 | 1 | 2 | 3 | 4 | 5

export interface FishColors {
  body: string
  fin: string
  accent: string
  eye: string
}

const TIER_COLORS: Record<FishTier, FishColors> = {
  0: { body: '#7CB342', fin: '#558B2F', accent: '#9CCC65', eye: '#1B1B1B' },
  1: { body: '#E53935', fin: '#C62828', accent: '#FF7043', eye: '#1B1B1B' },
  2: { body: '#FFB300', fin: '#FF8F00', accent: '#FFD54F', eye: '#1B1B1B' },
  3: { body: '#FF7043', fin: '#F4511E', accent: '#FFFFFF', eye: '#1B1B1B' },
  4: { body: '#42A5F5', fin: '#1E88E5', accent: '#FFEE58', eye: '#1B1B1B' },
  5: { body: '#AB47BC', fin: '#7B1FA2', accent: '#CE93D8', eye: '#FFD700' },
}

export function getTierFromScore(score: number): FishTier {
  if (score >= 200) return 5
  if (score >= 100) return 4
  if (score >= 50) return 3
  if (score >= 25) return 2
  if (score >= 10) return 1
  return 0
}

export function getTierName(tier: FishTier): string {
  const names: Record<FishTier, string> = {
    0: 'Guppy',
    1: 'Tetra',
    2: 'Angelfish',
    3: 'Clownfish',
    4: 'Blue Tang',
    5: 'Royal Betta',
  }
  return names[tier]
}

// Guppy - small, rounded, cute
const GuppyFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.65} viewBox="0 0 60 39">
    <defs>
      <radialGradient id={`gb-${id}`} cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.6" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`gf-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Tail */}
    <path d="M42 14 Q50 4 56 8 Q52 16 56 20 Q52 19.5 42 24 Z" fill={`url(#gf-${id})`} opacity="0.85" />
    {/* Body */}
    <ellipse cx="26" cy="19" rx="18" ry="12" fill={`url(#gb-${id})`} />
    {/* Belly highlight */}
    <ellipse cx="24" cy="23" rx="12" ry="5" fill="white" opacity="0.1" />
    {/* Dorsal fin */}
    <path d="M22 7 Q28 2 32 7 Q28 9 22 8 Z" fill={colors.fin} opacity="0.75" />
    {/* Pectoral fin */}
    <path d="M20 22 Q18 28 24 30 Q22 25 24 22 Z" fill={colors.fin} opacity="0.5" />
    {/* Eye */}
    <circle cx="15" cy="17" r="3.5" fill="white" />
    <circle cx="14.2" cy="16.5" r="2" fill={colors.eye} />
    <circle cx="13.5" cy="15.8" r="0.8" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M9 20 Q7 19.5 9 19" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
GuppyFish.displayName = 'GuppyFish'

// Tetra - sleek, neon stripe
const TetraFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.55} viewBox="0 0 70 38">
    <defs>
      <linearGradient id={`tb-${id}`} x1="0" y1="0" x2="1" y2="0.3">
        <stop offset="0%" stopColor={colors.body} />
        <stop offset="50%" stopColor={colors.accent} stopOpacity="0.7" />
        <stop offset="100%" stopColor={colors.body} />
      </linearGradient>
      <linearGradient id={`tf-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.3" />
      </linearGradient>
    </defs>
    {/* Tail */}
    <path d="M52 12 Q60 3 66 7 Q62 16 66 25 Q62 20 52 26 Z" fill={`url(#tf-${id})`} opacity="0.8" />
    {/* Body - torpedo shape */}
    <path d="M10 19 Q10 8 28 6 Q46 4 52 19 Q46 34 28 32 Q10 30 10 19 Z" fill={`url(#tb-${id})`} />
    {/* Neon stripe */}
    <path d="M14 19 Q28 17 50 19" stroke={colors.accent} strokeWidth="2.5" fill="none" opacity="0.9" strokeLinecap="round" />
    {/* Belly shimmer */}
    <path d="M16 24 Q28 28 46 24" stroke="white" strokeWidth="1" fill="none" opacity="0.15" />
    {/* Dorsal fin */}
    <path d="M26 6 Q30 0 36 3 Q34 7 28 8 Z" fill={colors.fin} opacity="0.7" />
    {/* Anal fin */}
    <path d="M32 32 Q34 37 38 35 Q36 31 36 30 Z" fill={colors.fin} opacity="0.55" />
    {/* Pectoral fin */}
    <path d="M22 22 Q18 28 24 30 Q24 26 26 22 Z" fill={colors.fin} opacity="0.4" />
    {/* Eye */}
    <circle cx="16" cy="17" r="3.5" fill="white" />
    <circle cx="15" cy="16.5" r="2.2" fill={colors.eye} />
    <circle cx="14.3" cy="15.8" r="0.9" fill="white" opacity="0.8" />
  </svg>
))
TetraFish.displayName = 'TetraFish'

// Angelfish - tall, elegant diamond shape
const AngelfishFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 56 62">
    <defs>
      <radialGradient id={`ab-${id}`} cx="45%" cy="45%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.4" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`af-${id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.3" />
      </linearGradient>
    </defs>
    {/* Dorsal fin - flowing */}
    <path d="M20 10 Q22 2 28 0 Q30 4 30 10 Q26 8 20 12 Z" fill={`url(#af-${id})`} opacity="0.7" />
    {/* Ventral fin - flowing */}
    <path d="M20 50 Q22 58 28 62 Q30 56 30 50 Q26 52 20 48 Z" fill={`url(#af-${id})`} opacity="0.7" />
    {/* Tail */}
    <path d="M42 24 Q50 16 54 20 Q50 30 54 40 Q50 36 42 36 Z" fill={colors.fin} opacity="0.75" />
    {/* Body - diamond/disc */}
    <path d="M10 30 Q10 14 24 10 Q38 6 44 30 Q38 54 24 50 Q10 46 10 30 Z" fill={`url(#ab-${id})`} />
    {/* Vertical stripes */}
    <path d="M22 14 Q21 30 22 46" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.35" />
    <path d="M30 12 Q29 30 30 48" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.35" />
    <path d="M37 18 Q36 30 37 42" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.25" />
    {/* Body sheen */}
    <ellipse cx="26" cy="26" rx="8" ry="10" fill="white" opacity="0.08" />
    {/* Eye */}
    <circle cx="16" cy="28" r="4" fill="white" />
    <circle cx="15" cy="27.5" r="2.5" fill={colors.eye} />
    <circle cx="14.2" cy="26.8" r="1" fill="white" opacity="0.7" />
    {/* Pectoral fin */}
    <path d="M18 34 Q14 40 20 44 Q20 38 22 34 Z" fill={colors.fin} opacity="0.4" />
  </svg>
))
AngelfishFish.displayName = 'AngelfishFish'

// Clownfish - iconic orange with white bands
const ClownfishFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 76 46">
    <defs>
      <radialGradient id={`cb-${id}`} cx="35%" cy="45%" r="60%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.3" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`cf-${id}`} x1="0" y1="0" x2="1" y2="0.5">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.6" />
      </linearGradient>
    </defs>
    {/* Tail */}
    <path d="M58 14 Q66 6 72 10 Q68 22 72 34 Q66 30 58 30 Z" fill={`url(#cf-${id})`} opacity="0.85" />
    {/* Body - rounded */}
    <path d="M12 23 Q12 8 30 5 Q50 2 60 23 Q50 44 30 41 Q12 38 12 23 Z" fill={`url(#cb-${id})`} />
    {/* White bands with dark edges */}
    <path d="M24 6 Q22 23 24 40" stroke="#1B1B1B" strokeWidth="2" fill="none" opacity="0.2" />
    <path d="M24 6 Q22 23 24 40" stroke={colors.accent} strokeWidth="4" fill="none" opacity="0.85" />
    <path d="M38 4 Q36 23 38 42" stroke="#1B1B1B" strokeWidth="2" fill="none" opacity="0.2" />
    <path d="M38 4 Q36 23 38 42" stroke={colors.accent} strokeWidth="4" fill="none" opacity="0.85" />
    <path d="M52 10 Q50 23 52 36" stroke="#1B1B1B" strokeWidth="1.5" fill="none" opacity="0.15" />
    <path d="M52 10 Q50 23 52 36" stroke={colors.accent} strokeWidth="3" fill="none" opacity="0.75" />
    {/* Dorsal fin */}
    <path d="M28 5 Q34 -2 42 2 Q40 6 34 7 Z" fill={colors.fin} opacity="0.7" />
    <path d="M34 4 Q38 0 42 3" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.4" />
    {/* Pectoral fin */}
    <path d="M22 28 Q16 36 24 39 Q24 34 26 28 Z" fill={colors.fin} opacity="0.45" />
    {/* Anal fin */}
    <path d="M40 41 Q42 46 46 44 Q44 40 44 38 Z" fill={colors.fin} opacity="0.5" />
    {/* Eye */}
    <circle cx="17" cy="20" r="4.5" fill="white" />
    <circle cx="16" cy="19.5" r="2.8" fill={colors.eye} />
    <circle cx="15" cy="18.5" r="1.1" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M11 24 Q9 23 11 22" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.4" />
  </svg>
))
ClownfishFish.displayName = 'ClownfishFish'

// Blue Tang - sleek, regal, Dory-like
const TangFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 82 50">
    <defs>
      <linearGradient id={`tgb-${id}`} x1="0" y1="0.3" x2="1" y2="0.7">
        <stop offset="0%" stopColor={colors.body} />
        <stop offset="40%" stopColor="#2196F3" />
        <stop offset="100%" stopColor={colors.body} />
      </linearGradient>
      <linearGradient id={`tgf-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    {/* Tail */}
    <path d="M62 16 Q72 6 78 12 Q72 24 78 36 Q72 32 62 32 Z" fill={`url(#tgf-${id})`} opacity="0.85" />
    {/* Tail accent - yellow tips */}
    <path d="M72 8 Q76 10 78 12" stroke={colors.accent} strokeWidth="2" fill="none" opacity="0.7" />
    <path d="M72 40 Q76 38 78 36" stroke={colors.accent} strokeWidth="2" fill="none" opacity="0.7" />
    {/* Body - oval, elongated */}
    <path d="M12 25 Q12 8 32 4 Q54 0 64 25 Q54 50 32 46 Q12 42 12 25 Z" fill={`url(#tgb-${id})`} />
    {/* Dark palette marking */}
    <path d="M30 8 Q26 25 30 42 Q40 44 50 38 Q54 25 50 12 Q40 6 30 8 Z" fill="#0D47A1" opacity="0.3" />
    {/* Yellow accent stripe on tail area */}
    <path d="M54 14 Q56 25 54 36" stroke={colors.accent} strokeWidth="3.5" fill="none" opacity="0.8" strokeLinecap="round" />
    {/* Dorsal fin - long, flowing */}
    <path d="M24 4 Q30 -4 44 0 Q42 5 36 6 Q30 7 24 5 Z" fill={colors.fin} opacity="0.65" />
    {/* Anal fin */}
    <path d="M30 46 Q36 52 44 48 Q40 45 34 44 Z" fill={colors.fin} opacity="0.55" />
    {/* Pectoral fin */}
    <path d="M22 28 Q16 36 24 40 Q24 34 26 28 Z" fill={colors.fin} opacity="0.35" />
    {/* Body sheen */}
    <ellipse cx="30" cy="20" rx="10" ry="8" fill="white" opacity="0.08" />
    {/* Eye */}
    <circle cx="18" cy="22" r="5" fill="white" />
    <circle cx="17" cy="21.5" r="3" fill={colors.eye} />
    <circle cx="16" cy="20.5" r="1.2" fill="white" opacity="0.8" />
    {/* Eye ring - yellow */}
    <circle cx="18" cy="22" r="5" fill="none" stroke={colors.accent} strokeWidth="0.8" opacity="0.5" />
  </svg>
))
TangFish.displayName = 'TangFish'

// Royal Betta - magnificent flowing fins, the crown jewel
const BettaFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.95} viewBox="0 0 90 86">
    <defs>
      <radialGradient id={`bb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.5" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`bf1-${id}`} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor={colors.fin} stopOpacity="0.9" />
        <stop offset="50%" stopColor={colors.accent} stopOpacity="0.6" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id={`bf2-${id}`} x1="0" y1="1" x2="0.5" y2="0">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.7" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.15" />
      </linearGradient>
    </defs>
    {/* Elaborate dorsal fin - flowing, layered */}
    <path d="M26 18 Q30 6 38 2 Q42 0 44 4 Q40 10 38 18" fill={`url(#bf1-${id})`} opacity="0.6" />
    <path d="M30 16 Q34 4 40 2 Q46 2 46 8 Q42 12 38 16" fill={colors.accent} opacity="0.3" />
    <path d="M34 14 Q36 6 42 4 Q44 6 42 14" fill={colors.fin} opacity="0.2" />
    {/* Flowing tail - multi-layered cascade */}
    <path d="M54 28 Q62 16 70 14 Q74 12 76 18 Q72 26 76 38 Q74 42 70 40 Q62 38 54 42 Z" fill={`url(#bf1-${id})`} opacity="0.75" />
    <path d="M58 26 Q66 18 72 18 Q76 16 80 22 Q76 30 80 42 Q76 44 72 40 Q66 36 58 38 Z" fill={colors.accent} opacity="0.35" />
    <path d="M62 28 Q70 22 76 24 Q80 26 80 34 Q76 38 70 36 Q66 34 62 36 Z" fill={colors.fin} opacity="0.2" />
    {/* Body */}
    <path d="M16 35 Q16 18 30 14 Q46 10 56 35 Q46 56 30 52 Q16 48 16 35 Z" fill={`url(#bb-${id})`} />
    {/* Body shimmer streaks */}
    <path d="M24 22 Q26 35 24 46" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.2" />
    <path d="M32 18 Q34 35 32 50" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.15" />
    <path d="M40 20 Q42 35 40 48" stroke="white" strokeWidth="0.6" fill="none" opacity="0.1" />
    {/* Body sheen */}
    <ellipse cx="30" cy="30" rx="10" ry="8" fill="white" opacity="0.08" />
    {/* Elaborate ventral fins - flowing downward */}
    <path d="M24 52 Q22 64 28 72 Q32 74 34 68 Q30 60 32 52 Z" fill={`url(#bf2-${id})`} opacity="0.7" />
    <path d="M30 54 Q28 66 34 74 Q38 76 38 70 Q36 62 36 54 Z" fill={colors.accent} opacity="0.35" />
    <path d="M36 52 Q34 62 38 68 Q40 66 40 58 Q38 54 36 52 Z" fill={colors.fin} opacity="0.2" />
    {/* Pectoral fin */}
    <path d="M24 38 Q18 46 26 50 Q26 44 28 38 Z" fill={colors.fin} opacity="0.4" />
    {/* Eye - larger, golden, royal */}
    <circle cx="22" cy="32" r="5" fill="white" />
    <circle cx="21" cy="31.5" r="3.2" fill={colors.eye} />
    <circle cx="20" cy="30.5" r="1.3" fill="white" opacity="0.7" />
    {/* Eye ring glow */}
    <circle cx="22" cy="32" r="5.5" fill="none" stroke={colors.accent} strokeWidth="0.6" opacity="0.4" />
    {/* Mouth */}
    <path d="M14 37 Q12 36 14 35" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.4" />
    {/* Crown-like head scales */}
    <path d="M20 18 Q22 16 24 18" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.3" />
    <path d="M24 16 Q26 14 28 16" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.3" />
  </svg>
))
BettaFish.displayName = 'BettaFish'

interface FishSVGProps {
  tier: FishTier
  size?: number
  customColors?: Partial<FishColors>
  id?: string
}

export const FishSVG = memo(({ tier, size = 48, customColors, id }: FishSVGProps) => {
  const colors = { ...TIER_COLORS[tier], ...customColors }
  // Use a stable ID for gradient references to avoid collisions
  const gradientId = id || `fish-${tier}-${size}`

  switch (tier) {
    case 0: return <GuppyFish colors={colors} size={size} id={gradientId} />
    case 1: return <TetraFish colors={colors} size={size} id={gradientId} />
    case 2: return <AngelfishFish colors={colors} size={size} id={gradientId} />
    case 3: return <ClownfishFish colors={colors} size={size} id={gradientId} />
    case 4: return <TangFish colors={colors} size={size} id={gradientId} />
    case 5: return <BettaFish colors={colors} size={size} id={gradientId} />
  }
})
FishSVG.displayName = 'FishSVG'

export { TIER_COLORS }
