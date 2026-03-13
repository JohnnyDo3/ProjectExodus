'use client'

import { memo } from 'react'

// Smooth SVG fish that evolve based on stock score tiers - ALL GUPPY VARIANTS
// Tier 0: 0-9 (Guppy), Tier 1: 10-24 (Swift Guppy), Tier 2: 25-49 (Fancy Guppy),
// Tier 3: 50-99 (Delta Guppy), Tier 4: 100-199 (Veil Guppy), Tier 5: 200+ (Supreme Guppy)

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
    1: 'Swift Guppy',
    2: 'Fancy Guppy',
    3: 'Delta Guppy',
    4: 'Veil Guppy',
    5: 'Supreme Guppy',
  }
  return names[tier]
}

// Tier 0 - Guppy: small, rounded, cute (base guppy, unchanged)
const GuppyFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.65} viewBox="0 0 60 39">
    <defs>
      <radialGradient id={`gb-${id}`} cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`gf-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} />
      </linearGradient>
    </defs>
    {/* Tail */}
    <path d="M42 14 Q50 4 56 8 Q52 16 56 20 Q52 19.5 42 24 Z" fill={`url(#gf-${id})`} />
    {/* Body */}
    <ellipse cx="26" cy="19" rx="18" ry="12" fill={`url(#gb-${id})`} />
    {/* Belly highlight */}
    <ellipse cx="24" cy="23" rx="12" ry="5" fill="white" opacity="0.1" />
    {/* Dorsal fin */}
    <path d="M22 7 Q28 2 32 7 Q28 9 22 8 Z" fill={colors.fin} />
    {/* Pectoral fin */}
    <path d="M20 22 Q18 28 24 30 Q22 25 24 22 Z" fill={colors.fin} opacity="0.9" />
    {/* Eye */}
    <circle cx="15" cy="17" r="3.5" fill="white" />
    <circle cx="14.2" cy="16.5" r="2" fill={colors.eye} />
    <circle cx="13.5" cy="15.8" r="0.8" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M9 20 Q7 19.5 9 19" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.6" />
  </svg>
))
GuppyFish.displayName = 'GuppyFish'

// Tier 1 - Swift Guppy: slightly larger, longer pointed tail, subtle shimmer
const SwiftGuppy = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.65} viewBox="0 0 66 43">
    <defs>
      <radialGradient id={`sgb-${id}`} cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`sgf-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} />
      </linearGradient>
    </defs>
    {/* Tail - slightly longer and more pointed */}
    <path d="M46 15 Q55 3 62 8 Q57 17 62 24 Q56 22 46 27 Z" fill={`url(#sgf-${id})`} />
    {/* Body */}
    <ellipse cx="28" cy="21" rx="20" ry="13" fill={`url(#sgb-${id})`} />
    {/* Belly highlight */}
    <ellipse cx="26" cy="25" rx="13" ry="5.5" fill="white" opacity="0.1" />
    {/* Body shimmer line */}
    <path d="M14 18 Q28 16 42 18" stroke="white" strokeWidth="0.6" fill="none" opacity="0.15" />
    {/* Dorsal fin - slightly bigger */}
    <path d="M24 8 Q30 2 35 7 Q31 10 24 9 Z" fill={colors.fin} />
    {/* Pectoral fin */}
    <path d="M22 24 Q19 31 26 33 Q24 28 26 24 Z" fill={colors.fin} opacity="0.9" />
    {/* Anal fin - small */}
    <path d="M34 34 Q36 38 38 36 Q37 33 36 32 Z" fill={colors.fin} opacity="0.8" />
    {/* Eye */}
    <circle cx="16" cy="19" r="3.8" fill="white" />
    <circle cx="15.2" cy="18.3" r="2.2" fill={colors.eye} />
    <circle cx="14.4" cy="17.5" r="0.9" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M9 22 Q7 21.5 9 21" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.6" />
  </svg>
))
SwiftGuppy.displayName = 'SwiftGuppy'

// Tier 2 - Fancy Guppy: bigger, wider fan tail, prominent dorsal, scale hints
const FancyGuppy = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.65} viewBox="0 0 72 47">
    <defs>
      <radialGradient id={`fgb-${id}`} cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`fgf-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="50%" stopColor={colors.accent} stopOpacity="0.8" />
        <stop offset="100%" stopColor={colors.fin} />
      </linearGradient>
    </defs>
    {/* Tail - wider fan shape with gradient */}
    <path d="M48 14 Q56 2 64 6 Q60 16 64 24 Q62 28 64 34 Q56 30 48 32 Z" fill={`url(#fgf-${id})`} />
    {/* Tail rays */}
    <path d="M50 16 Q56 8 62 8" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.4" />
    <path d="M50 22 Q56 18 62 16" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.35" />
    <path d="M50 28 Q56 28 62 30" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.35" />
    {/* Body */}
    <ellipse cx="30" cy="23" rx="22" ry="14.5" fill={`url(#fgb-${id})`} />
    {/* Belly highlight */}
    <ellipse cx="28" cy="28" rx="14" ry="6" fill="white" opacity="0.1" />
    {/* Scale pattern hints */}
    <path d="M18 18 Q22 16 26 18" stroke="white" strokeWidth="0.4" fill="none" opacity="0.12" />
    <path d="M22 22 Q26 20 30 22" stroke="white" strokeWidth="0.4" fill="none" opacity="0.12" />
    <path d="M26 18 Q30 16 34 18" stroke="white" strokeWidth="0.4" fill="none" opacity="0.12" />
    <path d="M30 22 Q34 20 38 22" stroke="white" strokeWidth="0.4" fill="none" opacity="0.12" />
    <path d="M20 26 Q24 24 28 26" stroke="white" strokeWidth="0.4" fill="none" opacity="0.1" />
    {/* Dorsal fin - more prominent */}
    <path d="M24 9 Q30 1 37 4 Q36 9 30 11 Q26 11 24 10 Z" fill={colors.fin} />
    <path d="M26 9 Q30 3 34 5" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.4" />
    {/* Pectoral fin - slightly larger */}
    <path d="M22 27 Q18 35 26 38 Q25 32 27 27 Z" fill={colors.fin} opacity="0.9" />
    {/* Anal fin */}
    <path d="M36 37 Q38 42 42 40 Q40 37 40 35 Z" fill={colors.fin} opacity="0.85" />
    {/* Eye */}
    <circle cx="16" cy="20" r="4" fill="white" />
    <circle cx="15" cy="19.3" r="2.4" fill={colors.eye} />
    <circle cx="14.2" cy="18.5" r="1" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M9 24 Q7 23.5 9 23" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.6" />
  </svg>
))
FancyGuppy.displayName = 'FancyGuppy'

// Tier 3 - Delta Guppy: bigger, large triangular delta tail, flowing dorsal, two-tone body
const DeltaGuppy = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.65} viewBox="0 0 78 51">
    <defs>
      <radialGradient id={`dgb-${id}`} cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.7" />
      </radialGradient>
      <linearGradient id={`dgf-${id}`} x1="0" y1="0" x2="1" y2="0.5">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="40%" stopColor={colors.accent} stopOpacity="0.7" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id={`dgd-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.6" />
      </linearGradient>
    </defs>
    {/* Delta tail - large triangular spread */}
    <path d="M52 16 Q60 2 70 4 Q66 14 70 25 Q68 30 70 38 Q66 42 70 46 Q60 42 52 34 Z" fill={`url(#dgf-${id})`} />
    {/* Tail rays */}
    <path d="M54 18 Q60 8 68 6" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.4" />
    <path d="M54 22 Q60 14 68 12" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.35" />
    <path d="M54 26 Q62 24 68 22" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.3" />
    <path d="M54 30 Q62 30 68 32" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.3" />
    <path d="M54 34 Q60 38 68 42" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.35" />
    {/* Body - slightly deeper */}
    <ellipse cx="32" cy="25" rx="24" ry="16" fill={`url(#dgb-${id})`} />
    {/* Two-tone body gradient overlay */}
    <ellipse cx="32" cy="30" rx="18" ry="8" fill={colors.fin} opacity="0.08" />
    {/* Belly highlight */}
    <ellipse cx="30" cy="30" rx="15" ry="6.5" fill="white" opacity="0.1" />
    {/* Body shimmer */}
    <path d="M16 22 Q32 19 48 22" stroke="white" strokeWidth="0.7" fill="none" opacity="0.12" />
    <path d="M18 26 Q32 24 46 26" stroke="white" strokeWidth="0.5" fill="none" opacity="0.08" />
    {/* Dorsal fin - flowing with rays */}
    <path d="M26 9 Q32 0 40 2 Q42 5 40 9 Q36 11 30 11 Z" fill={`url(#dgd-${id})`} />
    <path d="M28 9 Q32 3 36 3" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.45" />
    <path d="M31 8 Q34 2 38 3" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.4" />
    {/* Pectoral fin */}
    <path d="M24 29 Q19 38 28 41 Q27 35 29 29 Z" fill={colors.fin} opacity="0.85" />
    {/* Anal fin */}
    <path d="M38 41 Q40 47 44 44 Q42 40 42 38 Z" fill={colors.fin} opacity="0.85" />
    {/* Eye - more detailed */}
    <circle cx="17" cy="22" r="4.5" fill="white" />
    <circle cx="17" cy="22" r="4.5" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.3" />
    <circle cx="16" cy="21.3" r="2.8" fill={colors.eye} />
    <circle cx="15.8" cy="21" r="1.8" fill="#111" />
    <circle cx="15" cy="20.2" r="1" fill="white" opacity="0.85" />
    <circle cx="17" cy="22.5" r="0.4" fill="white" opacity="0.4" />
    {/* Mouth */}
    <path d="M9 26 Q7 25.5 9 25" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.5" />
  </svg>
))
DeltaGuppy.displayName = 'DeltaGuppy'

// Tier 4 - Veil Guppy: tall aspect, long flowing veil tail and fins, shimmer effects
const VeilGuppy = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 84 63">
    <defs>
      <radialGradient id={`vgb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.95" />
      </radialGradient>
      <linearGradient id={`vgf-${id}`} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="50%" stopColor={colors.accent} stopOpacity="0.7" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.6" />
      </linearGradient>
      <linearGradient id={`vgd-${id}`} x1="0" y1="1" x2="0.5" y2="0">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.5" />
        <stop offset="100%" stopColor={colors.fin} />
      </linearGradient>
      <radialGradient id={`vgi-${id}`} cx="40%" cy="35%" r="50%">
        <stop offset="0%" stopColor="white" stopOpacity="0.12" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Veil tail - long, flowing downward */}
    <path d="M54 20 Q62 8 70 10 Q68 18 72 26 Q70 32 72 40 Q68 48 64 52 Q58 50 54 38 Z" fill={`url(#vgf-${id})`} opacity="0.9" />
    {/* Tail second layer */}
    <path d="M56 22 Q64 14 72 16 Q70 24 72 32 Q68 38 66 44 Q60 42 56 34 Z" fill={colors.accent} opacity="0.4" />
    {/* Tail rays */}
    <path d="M56 22 Q62 12 69 12" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.4" />
    <path d="M56 26 Q64 20 70 18" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.35" />
    <path d="M56 30 Q64 28 70 26" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.3" />
    <path d="M56 34 Q62 36 68 40" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.3" />
    <path d="M56 36 Q60 42 66 48" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.35" />
    {/* Body */}
    <ellipse cx="34" cy="28" rx="26" ry="17" fill={`url(#vgb-${id})`} />
    {/* Body shimmer effects */}
    <path d="M16 24 Q34 20 50 24" stroke="white" strokeWidth="0.8" fill="none" opacity="0.12" />
    <path d="M18 28 Q34 25 48 28" stroke="white" strokeWidth="0.5" fill="none" opacity="0.08" />
    <ellipse cx="30" cy="24" rx="10" ry="6" fill="white" opacity="0.06" />
    {/* Iridescence overlay */}
    <ellipse cx="34" cy="28" rx="24" ry="15" fill={`url(#vgi-${id})`} />
    {/* Belly highlight */}
    <ellipse cx="32" cy="33" rx="16" ry="7" fill="white" opacity="0.08" />
    {/* Tall flowing dorsal fin */}
    <path d="M26 11 Q30 1 36 0 Q40 1 42 4 Q42 9 38 12 Q34 13 28 12 Z" fill={`url(#vgd-${id})`} opacity="0.9" />
    <path d="M28 11 Q31 3 34 1" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.45" />
    <path d="M32 10 Q34 2 37 1" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.4" />
    <path d="M36 10 Q38 3 40 3" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.35" />
    {/* Elaborate pectoral fin */}
    <path d="M26 32 Q20 42 28 46 Q28 40 30 34 Z" fill={colors.fin} opacity="0.85" />
    <path d="M27 34 Q22 40 26 44" stroke={colors.accent} strokeWidth="0.3" fill="none" opacity="0.3" />
    {/* Ventral fin - flowing */}
    <path d="M30 45 Q28 52 34 56 Q36 54 36 48 Q34 45 32 44 Z" fill={`url(#vgd-${id})`} opacity="0.75" />
    {/* Anal fin */}
    <path d="M40 45 Q42 52 46 49 Q44 44 44 42 Z" fill={colors.fin} opacity="0.85" />
    {/* Eye - detailed with iris */}
    <circle cx="18" cy="25" r="5" fill="white" />
    <circle cx="18" cy="25" r="5" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.3" />
    <circle cx="17" cy="24.3" r="3.2" fill={colors.eye} />
    <circle cx="17" cy="24.3" r="2.4" stroke={colors.eye} strokeWidth="0.5" fill="none" opacity="0.5" />
    <circle cx="16.6" cy="23.8" r="1.8" fill="#111" />
    <circle cx="15.8" cy="23" r="1" fill="white" opacity="0.85" />
    <circle cx="18" cy="25.5" r="0.45" fill="white" opacity="0.4" />
    {/* Mouth */}
    <path d="M9 29 Q7 28.5 9 28" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.5" />
  </svg>
))
VeilGuppy.displayName = 'VeilGuppy'

// Tier 5 - Supreme Guppy: largest, magnificent flowing fins, crown jewel, sparkle effects
const SupremeGuppy = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.78} viewBox="0 0 92 72">
    <defs>
      <radialGradient id={`spb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="50%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.95" />
      </radialGradient>
      <linearGradient id={`spf1-${id}`} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="50%" stopColor={colors.accent} stopOpacity="0.85" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.7" />
      </linearGradient>
      <linearGradient id={`spf2-${id}`} x1="0" y1="1" x2="0.5" y2="0">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.7" />
      </linearGradient>
      <radialGradient id={`spi-${id}`} cx="40%" cy="35%" r="50%">
        <stop offset="0%" stopColor="white" stopOpacity="0.15" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`spg-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.2" />
        <stop offset="30%" stopColor="white" stopOpacity="0" />
        <stop offset="60%" stopColor="white" stopOpacity="0.15" />
        <stop offset="100%" stopColor="white" stopOpacity="0.05" />
      </linearGradient>
      <clipPath id={`spc-${id}`}>
        <ellipse cx="36" cy="32" rx="28" ry="19" />
      </clipPath>
    </defs>

    {/* Enormous flowing tail - multiple layers */}
    <path d="M58 22 Q66 6 78 8 Q74 16 78 28 Q76 36 78 44 Q74 52 78 60 Q66 54 58 42 Z" fill={`url(#spf1-${id})`} opacity="0.9" />
    <path d="M60 24 Q68 12 76 14 Q74 22 76 32 Q74 38 76 48 Q72 52 68 50 Q62 44 60 38 Z" fill={colors.accent} opacity="0.45" />
    <path d="M62 26 Q70 18 76 20 Q74 28 76 36 Q72 42 68 44 Q64 40 62 34 Z" fill={colors.fin} opacity="0.35" />
    {/* Tail fin rays */}
    <path d="M60 24 Q66 10 76 10" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.4" />
    <path d="M60 28 Q68 18 76 16" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.35" />
    <path d="M60 32 Q68 28 76 26" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.3" />
    <path d="M60 36 Q68 36 76 38" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.3" />
    <path d="M60 40 Q66 46 76 52" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.35" />
    <path d="M60 42 Q66 52 76 58" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.4" />

    {/* Grand dorsal fin with fin rays */}
    <path d="M28 13 Q32 2 38 0 Q42 0 46 2 Q48 6 46 12 Q42 14 34 14 Q30 14 28 13 Z" fill={`url(#spf1-${id})`} opacity="0.9" />
    <path d="M32 12 Q34 4 38 1" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.5" />
    <path d="M36 11 Q38 2 40 1" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.45" />
    <path d="M40 11 Q42 3 44 2" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.4" />
    <path d="M44 12 Q46 5 47 4" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.35" />
    {/* Dorsal fin edge detail */}
    <path d="M28 13 Q36 11 46 12" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.3" />

    {/* Flowing ventral fins */}
    <path d="M28 51 Q26 60 32 66 Q36 68 38 62 Q34 56 36 51 Z" fill={`url(#spf2-${id})`} opacity="0.8" />
    <path d="M34 53 Q32 62 38 68 Q42 70 42 64 Q40 58 40 53 Z" fill={colors.accent} opacity="0.5" />
    <path d="M40 52 Q38 60 42 64 Q44 62 44 56 Q42 53 40 52 Z" fill={colors.fin} opacity="0.4" />
    {/* Ventral fin rays */}
    <path d="M30 53 Q28 60 32 65" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.4" />
    <path d="M34 54 Q32 62 36 66" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.35" />

    {/* Body */}
    <ellipse cx="36" cy="32" rx="28" ry="19" fill={`url(#spb-${id})`} />
    {/* Body outline for definition */}
    <ellipse cx="36" cy="32" rx="28" ry="19" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.15" />

    {/* Body shimmer streaks */}
    <path d="M16 28 Q36 24 54 28" stroke="white" strokeWidth="0.8" fill="none" opacity="0.12" />
    <path d="M18 32 Q36 29 52 32" stroke="white" strokeWidth="0.6" fill="none" opacity="0.08" />
    <path d="M20 36 Q36 34 50 36" stroke="white" strokeWidth="0.5" fill="none" opacity="0.06" />
    {/* Iridescence overlay */}
    <ellipse cx="36" cy="32" rx="26" ry="17" fill={`url(#spi-${id})`} />
    {/* Sparkle/glow shimmer */}
    <rect x="8" y="13" width="56" height="38" fill={`url(#spg-${id})`} clipPath={`url(#spc-${id})`} />

    {/* Belly highlight */}
    <ellipse cx="34" cy="38" rx="18" ry="8" fill="white" opacity="0.07" />

    {/* Crown-like head scales detail */}
    <path d="M18 18 Q20 15 22 18" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.45" />
    <path d="M22 16 Q24 13 26 16" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.45" />
    <path d="M26 15 Q28 12 30 15" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.4" />
    <path d="M20 17 Q22 14.5 24 17" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.3" />

    {/* Elaborate pectoral fin */}
    <path d="M28 36 Q22 46 30 50 Q30 44 32 38 Z" fill={colors.fin} opacity="0.85" />
    <path d="M29 38 Q24 44 28 48" stroke={colors.accent} strokeWidth="0.3" fill="none" opacity="0.35" />
    <path d="M30 38 Q26 44 29 47" stroke={colors.accent} strokeWidth="0.25" fill="none" opacity="0.3" />

    {/* Anal fin */}
    <path d="M44 51 Q46 58 50 55 Q48 50 48 48 Z" fill={colors.fin} opacity="0.8" />

    {/* Eye - golden ring, detailed */}
    <circle cx="18" cy="28" r="5.5" fill="white" />
    <circle cx="18" cy="28" r="5.5" stroke="#FFD700" strokeWidth="0.8" fill="none" opacity="0.6" />
    <circle cx="18" cy="28" r="5.5" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.3" />
    <circle cx="17" cy="27.3" r="3.5" fill={colors.eye} />
    <circle cx="17" cy="27.3" r="2.6" stroke={colors.eye} strokeWidth="0.6" fill="none" opacity="0.5" />
    <circle cx="16.6" cy="26.8" r="2" fill="#111" />
    <circle cx="15.6" cy="25.8" r="1.1" fill="white" opacity="0.85" />
    <circle cx="18.2" cy="28.5" r="0.5" fill="white" opacity="0.4" />

    {/* Subtle sparkle effects */}
    <circle cx="24" cy="22" r="0.6" fill="white" opacity="0.4" />
    <circle cx="42" cy="26" r="0.5" fill="white" opacity="0.35" />
    <circle cx="48" cy="34" r="0.4" fill="white" opacity="0.3" />
    <circle cx="30" cy="40" r="0.5" fill="white" opacity="0.3" />

    {/* Mouth */}
    <path d="M9 33 Q7 32.5 9 32" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.5" />
    {/* Nostril */}
    <circle cx="12" cy="27" r="0.4" fill={colors.accent} opacity="0.25" />
  </svg>
))
SupremeGuppy.displayName = 'SupremeGuppy'

export type FishPattern = 'none' | 'scales' | 'fine-scales' | 'armored' | 'shimmer' | 'koi'

export type FishSpecies = 'guppy' | 'swift-guppy' | 'fancy-guppy' | 'delta-guppy' | 'veil-guppy' | 'supreme-guppy'

const SPECIES_TO_TIER: Record<FishSpecies, FishTier> = {
  'guppy': 0,
  'swift-guppy': 1,
  'fancy-guppy': 2,
  'delta-guppy': 3,
  'veil-guppy': 4,
  'supreme-guppy': 5,
}

// Body clip paths for each guppy variant — patterns are clipped to these shapes
// so they only appear on the fish body, not as a floating square
const BODY_CLIPS: Record<FishTier, string> = {
  0: 'M8 19 Q8 7 26 7 Q44 7 44 19 Q44 31 26 31 Q8 31 8 19 Z',                           // Guppy ellipse
  1: 'M8 21 Q8 8 28 8 Q48 8 48 21 Q48 34 28 34 Q8 34 8 21 Z',                            // Swift Guppy ellipse
  2: 'M8 23 Q8 8.5 30 8.5 Q52 8.5 52 23 Q52 37.5 30 37.5 Q8 37.5 8 23 Z',               // Fancy Guppy ellipse
  3: 'M8 25 Q8 9 32 9 Q56 9 56 25 Q56 41 32 41 Q8 41 8 25 Z',                            // Delta Guppy ellipse
  4: 'M8 28 Q8 11 34 11 Q60 11 60 28 Q60 45 34 45 Q8 45 8 28 Z',                         // Veil Guppy ellipse
  5: 'M8 32 Q8 13 36 13 Q64 13 64 32 Q64 51 36 51 Q8 51 8 32 Z',                         // Supreme Guppy ellipse
}

// Scale pattern generator — produces columns of overlapping arc shapes
// that tile horizontally across the fish body (head to tail)
const ScalePattern = memo(({ id, viewBox, scaleSize, opacity }: {
  id: string; viewBox: string; scaleSize: number; opacity: number
}) => {
  const [, , w, h] = viewBox.split(' ').map(Number)
  const cols = Math.ceil(w / (scaleSize * 0.7)) + 1
  const rows = Math.ceil(h / scaleSize) + 1

  return (
    <g opacity={opacity}>
      {Array.from({ length: cols }, (_, col) =>
        Array.from({ length: rows }, (_, row) => {
          const x = col * scaleSize * 0.7
          const y = row * scaleSize + (col % 2 ? scaleSize * 0.5 : 0)
          const r = scaleSize * 0.55
          return (
            <path
              key={`${col}-${row}`}
              d={`M${x},${y - r} A${r * 0.9},${r} 0 0,1 ${x},${y + r}`}
              stroke="white"
              strokeWidth={scaleSize * 0.08}
              fill="none"
            />
          )
        })
      )}
    </g>
  )
})
ScalePattern.displayName = 'ScalePattern'

// Pattern overlay component — renders scale-based patterns clipped to the fish body
const PatternOverlay = memo(({ pattern, id, viewBox, tier }: {
  pattern: FishPattern; id: string; viewBox: string; tier: FishTier
}) => {
  if (pattern === 'none') return null

  const [, , w, h] = viewBox.split(' ').map(Number)
  const clipId = `clip-${id}`

  const patternContent = (() => {
    switch (pattern) {
      case 'scales':
        // Classic fish scales — medium-sized overlapping arcs
        return <ScalePattern id={id} viewBox={viewBox} scaleSize={w * 0.08} opacity={0.3} />

      case 'fine-scales':
        // Smaller, denser scale pattern — more detailed look
        return <ScalePattern id={id} viewBox={viewBox} scaleSize={w * 0.05} opacity={0.22} />

      case 'armored':
        // Heavy armored plates — larger, bolder scales with fill
        return (
          <g opacity={0.2}>
            {(() => {
              const sz = w * 0.12
              const cols = Math.ceil(w / (sz * 0.7)) + 1
              const rows = Math.ceil(h / sz) + 1
              return Array.from({ length: cols }, (_, col) =>
                Array.from({ length: rows }, (_, row) => {
                  const x = col * sz * 0.7
                  const y = row * sz + (col % 2 ? sz * 0.5 : 0)
                  const r = sz * 0.55
                  return (
                    <path
                      key={`${col}-${row}`}
                      d={`M${x},${y - r} A${r * 0.85},${r} 0 0,1 ${x},${y + r}`}
                      stroke="white"
                      strokeWidth={sz * 0.12}
                      fill="white"
                      fillOpacity="0.06"
                    />
                  )
                })
              )
            })()}
          </g>
        )

      case 'shimmer':
        // Iridescent shimmer scales with subtle gradient fill
        return (
          <>
            <defs>
              <linearGradient id={`shimmer-${id}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0.15" />
                <stop offset="30%" stopColor="white" stopOpacity="0" />
                <stop offset="60%" stopColor="white" stopOpacity="0.12" />
                <stop offset="100%" stopColor="white" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <ScalePattern id={id} viewBox={viewBox} scaleSize={w * 0.07} opacity={0.25} />
            <rect x="0" y="0" width={w} height={h} fill={`url(#shimmer-${id})`} />
          </>
        )

      case 'koi':
        // Koi-style large irregular patches with scale texture underneath
        return (
          <>
            <defs>
              <radialGradient id={`koi1-${id}`} cx="0.3" cy="0.4" r="0.4">
                <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={`koi2-${id}`} cx="0.7" cy="0.6" r="0.35">
                <stop offset="0%" stopColor="white" stopOpacity="0.25" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ScalePattern id={id} viewBox={viewBox} scaleSize={w * 0.06} opacity={0.15} />
            <ellipse cx={w * 0.3} cy={h * 0.4} rx={w * 0.2} ry={h * 0.25} fill={`url(#koi1-${id})`} />
            <ellipse cx={w * 0.65} cy={h * 0.55} rx={w * 0.18} ry={h * 0.2} fill={`url(#koi2-${id})`} />
          </>
        )

      default:
        return null
    }
  })()

  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <path d={BODY_CLIPS[tier]} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {patternContent}
      </g>
    </>
  )
})
PatternOverlay.displayName = 'PatternOverlay'

export interface FishCustomization {
  species?: FishSpecies | null
  colors?: Partial<FishColors> | null
  pattern?: FishPattern | null
}

interface FishSVGProps {
  tier: FishTier
  size?: number
  customColors?: Partial<FishColors>
  customization?: FishCustomization | null
  id?: string
}

export const FishSVG = memo(({ tier, size = 48, customColors, customization, id }: FishSVGProps) => {
  // Determine which species to render: customization species override > tier default
  let renderTier = tier
  if (customization?.species) {
    renderTier = SPECIES_TO_TIER[customization.species]
  }

  // Merge colors: tier defaults < customColors prop < customization colors
  const colors = {
    ...TIER_COLORS[renderTier],
    ...customColors,
    ...(customization?.colors || {}),
  }
  const pattern = customization?.pattern || 'none'
  // Use a stable ID for gradient references to avoid collisions
  const gradientId = id || `fish-${tier}-${size}`

  // Viewbox dimensions per species for pattern overlay
  const viewBoxes: Record<FishTier, string> = {
    0: '0 0 60 39',
    1: '0 0 66 43',
    2: '0 0 72 47',
    3: '0 0 78 51',
    4: '0 0 84 63',
    5: '0 0 92 72',
  }

  const fishElement = (() => {
    switch (renderTier) {
      case 0: return <GuppyFish colors={colors} size={size} id={gradientId} />
      case 1: return <SwiftGuppy colors={colors} size={size} id={gradientId} />
      case 2: return <FancyGuppy colors={colors} size={size} id={gradientId} />
      case 3: return <DeltaGuppy colors={colors} size={size} id={gradientId} />
      case 4: return <VeilGuppy colors={colors} size={size} id={gradientId} />
      case 5: return <SupremeGuppy colors={colors} size={size} id={gradientId} />
    }
  })()

  if (pattern === 'none') return fishElement

  // Render pattern clipped to the fish body shape, overlaid on the fish
  const vb = viewBoxes[renderTier]
  const aspect = renderTier === 5 ? 0.78 : renderTier === 4 ? 0.75 : 0.65

  return (
    <div className="relative inline-block">
      {fishElement}
      <svg
        width={size}
        height={size * aspect}
        viewBox={vb}
        className="absolute inset-0 pointer-events-none"
      >
        <PatternOverlay pattern={pattern} id={gradientId} viewBox={vb} tier={renderTier} />
      </svg>
    </div>
  )
})
FishSVG.displayName = 'FishSVG'

export { TIER_COLORS, SPECIES_TO_TIER }
