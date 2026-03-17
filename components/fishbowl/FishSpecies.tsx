'use client'

import { memo } from 'react'

// Smooth SVG fish that evolve based on stock score tiers
// Tier 0: 0-9 (Guppy), Tier 1: 10-24 (Tetra), Tier 2: 25-49 (Angelfish),
// Tier 3: 50-99 (Clownfish), Tier 4: 100-199 (Blue Tang), Tier 5: 200+ (Royal Betta)
// Each tier unlocks the species. SVG shapes (guppy variants + alternates) are selectable skins.

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

// ─── ALTERNATE SPECIES PER TIER ─────────────────────────────────────

// Tier 0 alt — Endler's Livebearer: tiny, compact, brilliantly colorful micro-fish
const EndlerFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 50 35">
    <defs>
      <radialGradient id={`eb-${id}`} cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`ef-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} />
      </linearGradient>
    </defs>
    {/* Forked tail */}
    <path d="M36 12 Q42 6 46 8 Q43 13 46 16 Q43 15 36 18 Z" fill={`url(#ef-${id})`} />
    <path d="M36 22 Q42 26 46 24 Q43 20 36 18 Z" fill={`url(#ef-${id})`} opacity="0.9" />
    {/* Body — compact, deep-bodied */}
    <ellipse cx="22" cy="17" rx="16" ry="11" fill={`url(#eb-${id})`} />
    {/* Endler color splash — distinctive mid-body patch */}
    <ellipse cx="24" cy="16" rx="6" ry="5" fill={colors.accent} opacity="0.4" />
    <ellipse cx="18" cy="18" rx="4" ry="3" fill={colors.fin} opacity="0.25" />
    {/* Belly */}
    <ellipse cx="20" cy="21" rx="10" ry="4" fill="white" opacity="0.1" />
    {/* Dorsal fin — small, colorful */}
    <path d="M20 6 Q24 2 27 6 Q24 8 20 7 Z" fill={colors.fin} />
    {/* Pectoral fin */}
    <path d="M16 20 Q14 24 18 26 Q17 22 19 20 Z" fill={colors.fin} opacity="0.8" />
    {/* Eye — proportionally large */}
    <circle cx="11" cy="15" r="3.5" fill="white" />
    <circle cx="10.5" cy="14.5" r="2" fill={colors.eye} />
    <circle cx="10" cy="14" r="0.8" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M7 18 Q5.5 17.5 7 17" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
    {/* Gonopodium hint (male endler feature) */}
    <path d="M28 24 L30 27" stroke={colors.body} strokeWidth="0.6" opacity="0.3" />
  </svg>
))
EndlerFish.displayName = 'EndlerFish'

// Tier 1 alt — Neon Tetra: streamlined torpedo with iconic iridescent stripe
const NeonTetra = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.61} viewBox="0 0 62 38">
    <defs>
      <radialGradient id={`ntb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.6" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`nts-${id}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.fin} />
      </linearGradient>
      <linearGradient id={`ntf-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} stopOpacity="0.5" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.2" />
      </linearGradient>
    </defs>
    {/* Forked tail */}
    <path d="M46 12 Q52 6 58 7 Q54 14 58 18 Q54 17 46 20 Z" fill={colors.fin} opacity="0.7" />
    <path d="M46 24 Q52 28 58 27 Q54 22 46 20 Z" fill={colors.fin} opacity="0.6" />
    {/* Body — sleek torpedo shape */}
    <ellipse cx="28" cy="19" rx="20" ry="11" fill={`url(#ntb-${id})`} />
    {/* Signature neon stripe — bright iridescent band from eye to adipose */}
    <path d="M12 16 Q28 14 44 16" stroke={`url(#nts-${id})`} strokeWidth="4" fill="none" opacity="0.85" strokeLinecap="round" />
    {/* Stripe glow */}
    <path d="M12 16 Q28 14 44 16" stroke={colors.accent} strokeWidth="6" fill="none" opacity="0.15" strokeLinecap="round" />
    {/* Lower body red section (neon tetra signature) */}
    <path d="M30 22 Q38 20 46 22 Q44 26 38 28 Q32 26 30 22 Z" fill={colors.fin} opacity="0.5" />
    {/* Belly highlight */}
    <ellipse cx="26" cy="23" rx="12" ry="4" fill="white" opacity="0.1" />
    {/* Adipose fin — small, translucent */}
    <path d="M40 12 Q42 10 44 12 Q42 13 40 12 Z" fill={colors.fin} opacity="0.4" />
    {/* Dorsal fin — small triangular */}
    <path d="M24 8 Q28 3 31 8 Q28 10 24 9 Z" fill={`url(#ntf-${id})`} />
    {/* Anal fin */}
    <path d="M30 28 Q33 32 36 30 Q34 28 32 27 Z" fill={`url(#ntf-${id})`} />
    {/* Pectoral fin */}
    <path d="M18 22 Q16 26 20 28 Q19 24 20 22 Z" fill={colors.fin} opacity="0.5" />
    {/* Eye — large, tetra-style */}
    <circle cx="13" cy="17" r="3.8" fill="white" />
    <circle cx="12.5" cy="16.5" r="2.2" fill={colors.eye} />
    <circle cx="12" cy="16" r="0.8" fill="white" opacity="0.8" />
    {/* Blue iris ring */}
    <circle cx="13" cy="17" r="3" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.3" />
    {/* Mouth */}
    <path d="M9 20 Q7 19.5 9 19" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
))
NeonTetra.displayName = 'NeonTetra'

// Tier 2 alt — Betta: round body with dramatic flowing veil fins
const BettaFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.74} viewBox="0 0 76 56">
    <defs>
      <radialGradient id={`bb-${id}`} cx="35%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`bf-${id}`} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="50%" stopColor={colors.accent} stopOpacity="0.6" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.4" />
      </linearGradient>
      <linearGradient id={`bd-${id}`} x1="0" y1="1" x2="0.5" y2="0">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.4" />
        <stop offset="100%" stopColor={colors.fin} />
      </linearGradient>
    </defs>
    {/* Massive flowing veil tail */}
    <path d="M46 16 Q54 4 64 6 Q62 14 66 20 Q64 26 66 34 Q62 40 60 44 Q54 42 46 34 Z" fill={`url(#bf-${id})`} opacity="0.8" />
    <path d="M48 18 Q56 10 64 12 Q62 18 64 26 Q60 34 58 38 Q52 36 48 30 Z" fill={colors.accent} opacity="0.3" />
    {/* Tail fin rays */}
    <path d="M48 18 Q54 8 62 8" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.3" />
    <path d="M48 24 Q56 18 64 16" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.25" />
    <path d="M48 30 Q56 32 62 38" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.25" />
    {/* Grand dorsal fin — tall sail flowing backward */}
    <path d="M22 8 Q26 0 32 0 Q36 2 38 6 Q38 10 34 12 Q28 12 22 10 Z" fill={`url(#bd-${id})`} opacity="0.85" />
    <path d="M24 8 Q28 2 32 1" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.35" />
    <path d="M28 8 Q30 2 34 2" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.3" />
    {/* Flowing anal fin — large, trailing */}
    <path d="M28 42 Q26 50 32 54 Q38 54 40 48 Q38 44 36 42 Z" fill={`url(#bf-${id})`} opacity="0.75" />
    <path d="M30 44 Q28 50 32 52" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.3" />
    {/* Body — deep round shape */}
    <ellipse cx="28" cy="24" rx="20" ry="15" fill={`url(#bb-${id})`} />
    {/* Body shimmer */}
    <path d="M14 20 Q28 17 42 20" stroke="white" strokeWidth="0.7" fill="none" opacity="0.1" />
    {/* Belly */}
    <ellipse cx="26" cy="30" rx="12" ry="5" fill="white" opacity="0.08" />
    {/* Pectoral fin — delicate, flowing */}
    <path d="M20 28 Q16 36 22 40 Q22 34 24 28 Z" fill={colors.fin} opacity="0.7" />
    {/* Ventral fins — long trailing threads (betta signature) */}
    <path d="M24 38 Q22 46 20 52" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M28 38 Q26 46 25 50" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
    {/* Eye */}
    <circle cx="14" cy="21" r="4" fill="white" />
    <circle cx="13.5" cy="20.5" r="2.4" fill={colors.eye} />
    <circle cx="13" cy="20" r="1" fill="white" opacity="0.8" />
    {/* Gill plate */}
    <path d="M18 18 Q16 24 18 30" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.2" />
    {/* Mouth — slightly upturned (betta feature) */}
    <path d="M9 22 Q7 21 9 20" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.5" />
  </svg>
))
BettaFish.displayName = 'BettaFish'

// Tier 3 alt — Angelfish: tall diamond body, long trailing ventral fins
const AngelfishFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size} viewBox="0 0 70 70">
    <defs>
      <radialGradient id={`ab-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.6" />
      </radialGradient>
      <linearGradient id={`af-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Tail — small forked */}
    <path d="M52 28 Q58 22 62 24 Q58 30 62 36 Q58 34 52 38 Z" fill={`url(#af-${id})`} opacity="0.8" />
    {/* Tall dorsal fin — high triangular sail */}
    <path d="M22 16 Q26 2 34 0 Q36 2 38 8 Q36 14 30 18 Z" fill={`url(#af-${id})`} opacity="0.85" />
    <path d="M24 14 Q28 4 34 1" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.35" />
    <path d="M28 14 Q30 4 34 2" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.3" />
    {/* Tall anal fin — mirrors dorsal */}
    <path d="M22 50 Q26 64 34 66 Q36 64 38 58 Q36 52 30 48 Z" fill={`url(#af-${id})`} opacity="0.8" />
    <path d="M24 52 Q28 62 34 65" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.3" />
    {/* Body — diamond/disc shape, laterally compressed */}
    <path d="M10 32 Q10 18 28 14 Q46 14 50 28 Q50 32 50 38 Q46 52 28 52 Q10 48 10 32 Z" fill={`url(#ab-${id})`} />
    {/* Vertical angelfish stripes */}
    <path d="M22 16 Q20 28 20 34 Q20 40 22 50" stroke={colors.fin} strokeWidth="2.5" fill="none" opacity="0.25" strokeLinecap="round" />
    <path d="M32 14 Q30 28 30 34 Q30 40 32 52" stroke={colors.fin} strokeWidth="2" fill="none" opacity="0.2" strokeLinecap="round" />
    <path d="M42 18 Q40 28 40 34 Q40 40 42 48" stroke={colors.fin} strokeWidth="1.5" fill="none" opacity="0.15" strokeLinecap="round" />
    {/* Body shimmer */}
    <path d="M16 28 Q30 24 44 28" stroke="white" strokeWidth="0.7" fill="none" opacity="0.1" />
    {/* Belly highlight */}
    <ellipse cx="28" cy="38" rx="12" ry="5" fill="white" opacity="0.08" />
    {/* Long trailing ventral fins — angelfish signature */}
    <path d="M22 44 Q18 56 16 64" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M26 44 Q22 56 21 62" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />
    {/* Pectoral fin */}
    <path d="M18 34 Q14 40 18 44 Q18 40 20 36 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye — large, prominent */}
    <circle cx="16" cy="30" r="4.5" fill="white" />
    <circle cx="16" cy="30" r="4.5" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.3" />
    <circle cx="15.5" cy="29.5" r="2.8" fill={colors.eye} />
    <circle cx="15" cy="29" r="1" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M10 34 Q8 33.5 10 33" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
AngelfishFish.displayName = 'AngelfishFish'

// ─── THIRD SKINS PER TIER ─────────────────────────────────────

// Tier 0 third — Molly: plump, rounded, friendly beginner fish
const MollyFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 56 39">
    <defs>
      <radialGradient id={`mob-${id}`} cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`mof-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} />
      </linearGradient>
    </defs>
    {/* Rounded tail */}
    <path d="M40 12 Q46 6 50 10 Q48 16 50 22 Q46 26 40 24 Z" fill={`url(#mof-${id})`} />
    {/* Body — plump, round */}
    <ellipse cx="24" cy="19" rx="18" ry="14" fill={`url(#mob-${id})`} />
    {/* Belly highlight */}
    <ellipse cx="22" cy="24" rx="12" ry="6" fill="white" opacity="0.1" />
    {/* Dorsal fin — tall rounded sail */}
    <path d="M18 5 Q24 0 30 3 Q30 7 26 9 Q22 9 18 7 Z" fill={colors.fin} />
    {/* Pectoral fin */}
    <path d="M18 22 Q14 28 20 30 Q19 26 20 22 Z" fill={colors.fin} opacity="0.8" />
    {/* Anal fin */}
    <path d="M28 33 Q30 37 34 35 Q32 32 32 30 Z" fill={colors.fin} opacity="0.8" />
    {/* Eye — large, friendly */}
    <circle cx="13" cy="16" r="4" fill="white" />
    <circle cx="12.5" cy="15.5" r="2.2" fill={colors.eye} />
    <circle cx="12" cy="15" r="0.9" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M7 20 Q5 19.5 7 19" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
    {/* Gravid spot hint */}
    <circle cx="32" cy="22" r="2" fill={colors.fin} opacity="0.15" />
  </svg>
))
MollyFish.displayName = 'MollyFish'

// ─── TETRA VARIATIONS (Tier 1) ─────────────────────────────────────

// Tier 1 — Ember Tetra: warmer, rounder body, no neon stripe, larger dorsal
const EmberTetra = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.65} viewBox="0 0 58 38">
    <defs>
      <radialGradient id={`emtb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.7" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`emtf-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} stopOpacity="0.6" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.3" />
      </linearGradient>
    </defs>
    {/* Forked tail */}
    <path d="M42 12 Q48 6 52 8 Q49 14 52 18 Q49 17 42 20 Z" fill={colors.fin} opacity="0.7" />
    <path d="M42 24 Q48 28 52 26 Q49 22 42 20 Z" fill={colors.fin} opacity="0.6" />
    {/* Body — rounder, deeper than neon tetra */}
    <ellipse cx="26" cy="19" rx="19" ry="13" fill={`url(#emtb-${id})`} />
    {/* Warm body glow — no neon stripe, just warm tones */}
    <ellipse cx="26" cy="18" rx="12" ry="6" fill={colors.accent} opacity="0.2" />
    {/* Belly highlight */}
    <ellipse cx="24" cy="24" rx="12" ry="4.5" fill="white" opacity="0.1" />
    {/* Dorsal fin — larger, more prominent than neon tetra */}
    <path d="M20 6 Q26 0 32 4 Q30 8 24 10 Q20 9 20 7 Z" fill={`url(#emtf-${id})`} />
    <path d="M22 6 Q26 1 30 4" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.4" />
    {/* Adipose fin */}
    <path d="M36 10 Q38 8 40 10 Q38 11 36 10 Z" fill={colors.fin} opacity="0.4" />
    {/* Anal fin */}
    <path d="M26 28 Q29 33 32 30 Q30 28 28 27 Z" fill={`url(#emtf-${id})`} />
    {/* Pectoral fin */}
    <path d="M16 22 Q14 26 18 28 Q17 24 18 22 Z" fill={colors.fin} opacity="0.5" />
    {/* Eye */}
    <circle cx="12" cy="17" r="3.8" fill="white" />
    <circle cx="11.5" cy="16.5" r="2.2" fill={colors.eye} />
    <circle cx="11" cy="16" r="0.8" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M8 20 Q6 19.5 8 19" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
))
EmberTetra.displayName = 'EmberTetra'

// Tier 1 — Diamond Tetra: diamond-shaped reflective scales, larger body, iridescent shimmer
const DiamondTetra = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.65} viewBox="0 0 66 43">
    <defs>
      <radialGradient id={`dtb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.6" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`dtf-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} stopOpacity="0.5" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.2" />
      </linearGradient>
      <radialGradient id={`dti-${id}`} cx="40%" cy="35%" r="50%">
        <stop offset="0%" stopColor="white" stopOpacity="0.15" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Forked tail */}
    <path d="M50 14 Q56 8 60 10 Q57 16 60 20 Q57 19 50 22 Z" fill={colors.fin} opacity="0.7" />
    <path d="M50 28 Q56 32 60 30 Q57 26 50 22 Z" fill={colors.fin} opacity="0.6" />
    {/* Body — slightly larger, deeper than neon tetra */}
    <ellipse cx="30" cy="21" rx="22" ry="14" fill={`url(#dtb-${id})`} />
    {/* Diamond-shaped reflective scale pattern */}
    <path d="M16 16 L20 14 L24 16 L20 18 Z" fill="white" opacity="0.12" />
    <path d="M22 14 L26 12 L30 14 L26 16 Z" fill="white" opacity="0.1" />
    <path d="M28 16 L32 14 L36 16 L32 18 Z" fill="white" opacity="0.12" />
    <path d="M34 14 L38 12 L42 14 L38 16 Z" fill="white" opacity="0.1" />
    <path d="M20 20 L24 18 L28 20 L24 22 Z" fill="white" opacity="0.1" />
    <path d="M26 22 L30 20 L34 22 L30 24 Z" fill="white" opacity="0.08" />
    <path d="M32 20 L36 18 L40 20 L36 22 Z" fill="white" opacity="0.1" />
    {/* Iridescent shimmer overlay */}
    <ellipse cx="30" cy="21" rx="20" ry="12" fill={`url(#dti-${id})`} />
    {/* Belly highlight */}
    <ellipse cx="28" cy="26" rx="14" ry="5" fill="white" opacity="0.1" />
    {/* Dorsal fin — medium */}
    <path d="M24 7 Q30 2 34 7 Q31 10 24 9 Z" fill={`url(#dtf-${id})`} />
    {/* Anal fin — elongated */}
    <path d="M28 32 Q32 38 36 35 Q34 32 32 30 Z" fill={`url(#dtf-${id})`} />
    {/* Adipose fin */}
    <path d="M42 12 Q44 10 46 12 Q44 13 42 12 Z" fill={colors.fin} opacity="0.4" />
    {/* Pectoral fin */}
    <path d="M20 24 Q17 29 21 31 Q20 27 22 24 Z" fill={colors.fin} opacity="0.5" />
    {/* Eye */}
    <circle cx="14" cy="19" r="4" fill="white" />
    <circle cx="13.5" cy="18.5" r="2.4" fill={colors.eye} />
    <circle cx="13" cy="18" r="0.9" fill="white" opacity="0.8" />
    {/* Sparkle effects */}
    <circle cx="24" cy="16" r="0.5" fill="white" opacity="0.4" />
    <circle cx="34" cy="18" r="0.4" fill="white" opacity="0.35" />
    {/* Mouth */}
    <path d="M9 22 Q7 21.5 9 21" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
))
DiamondTetra.displayName = 'DiamondTetra'

// Tier 1 — Rummy-Nose Tetra: elongated nose with red marking, slimmer body
const RummyTetra = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.58} viewBox="0 0 66 38">
    <defs>
      <radialGradient id={`rtb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.5" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`rts-${id}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.3" />
      </linearGradient>
    </defs>
    {/* Striped forked tail — rummy-nose signature */}
    <path d="M50 12 Q56 6 60 8 Q57 14 60 18 Q57 17 50 20 Z" fill={colors.fin} opacity="0.7" />
    <path d="M50 24 Q56 28 60 26 Q57 22 50 20 Z" fill={colors.fin} opacity="0.6" />
    {/* Tail stripes */}
    <path d="M52 13 Q55 10 58 10" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.5" />
    <path d="M52 17 Q56 16 58 14" stroke="white" strokeWidth="0.8" fill="none" opacity="0.3" />
    <path d="M52 21 Q55 20 58 18" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.4" />
    {/* Body — slimmer, more elongated */}
    <ellipse cx="30" cy="19" rx="22" ry="10" fill={`url(#rtb-${id})`} />
    {/* Red nose marking — rummy-nose signature */}
    <path d="M8 19 Q6 15 10 13 Q14 12 16 15 Q16 19 16 23 Q14 26 10 25 Q6 23 8 19 Z" fill={colors.fin} opacity="0.5" />
    {/* Body shimmer */}
    <path d="M14 16 Q30 14 46 16" stroke="white" strokeWidth="0.6" fill="none" opacity="0.12" />
    {/* Belly highlight */}
    <ellipse cx="28" cy="22" rx="14" ry="4" fill="white" opacity="0.1" />
    {/* Dorsal fin — small */}
    <path d="M26 9 Q30 5 33 9 Q30 11 26 10 Z" fill={colors.fin} opacity="0.5" />
    {/* Adipose fin */}
    <path d="M42 12 Q44 10 46 12 Q44 13 42 12 Z" fill={colors.fin} opacity="0.35" />
    {/* Anal fin */}
    <path d="M30 27 Q33 31 36 29 Q34 27 32 26 Z" fill={colors.fin} opacity="0.5" />
    {/* Pectoral fin */}
    <path d="M18 22 Q16 26 20 27 Q19 23 20 21 Z" fill={colors.fin} opacity="0.5" />
    {/* Eye */}
    <circle cx="12" cy="17" r="3.5" fill="white" />
    <circle cx="11.5" cy="16.5" r="2" fill={colors.eye} />
    <circle cx="11" cy="16" r="0.8" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M8 20 Q6 19.5 8 19" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
))
RummyTetra.displayName = 'RummyTetra'

// Tier 1 — Serpae Tetra: deeper body, larger black-spotted dorsal fin, squarish body
const SerpaeTetra = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.68} viewBox="0 0 60 41">
    <defs>
      <radialGradient id={`stb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.6" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
    </defs>
    {/* Forked tail */}
    <path d="M44 13 Q50 7 54 9 Q51 15 54 19 Q51 18 44 21 Z" fill={colors.fin} opacity="0.75" />
    <path d="M44 27 Q50 31 54 29 Q51 25 44 21 Z" fill={colors.fin} opacity="0.65" />
    {/* Body — deeper, more squarish than neon tetra */}
    <path d="M8 20 Q8 8 22 7 Q36 6 44 12 Q48 16 48 20 Q48 26 44 30 Q36 36 22 35 Q8 34 8 20 Z" fill={`url(#stb-${id})`} />
    {/* Shoulder spot — serpae signature */}
    <circle cx="18" cy="18" r="3" fill={colors.eye} opacity="0.4" />
    <circle cx="18" cy="18" r="2" fill={colors.eye} opacity="0.6" />
    {/* Body shimmer */}
    <path d="M14 17 Q28 14 42 17" stroke="white" strokeWidth="0.6" fill="none" opacity="0.12" />
    {/* Belly highlight */}
    <ellipse cx="26" cy="26" rx="12" ry="4.5" fill="white" opacity="0.1" />
    {/* Dorsal fin — larger with dark spot */}
    <path d="M20 7 Q26 0 32 3 Q32 8 28 10 Q22 10 20 8 Z" fill={colors.fin} opacity="0.85" />
    <circle cx="26" cy="5" r="2" fill={colors.eye} opacity="0.4" />
    {/* Anal fin — larger, squared */}
    <path d="M24 32 Q28 38 34 36 Q32 32 30 30 Z" fill={colors.fin} opacity="0.7" />
    {/* Pectoral fin */}
    <path d="M16 23 Q13 28 17 30 Q16 26 18 23 Z" fill={colors.fin} opacity="0.5" />
    {/* Eye */}
    <circle cx="13" cy="18" r="3.8" fill="white" />
    <circle cx="12.5" cy="17.5" r="2.2" fill={colors.eye} />
    <circle cx="12" cy="17" r="0.8" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M8 21 Q6 20.5 8 20" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
))
SerpaeTetra.displayName = 'SerpaeTetra'

// Tier 1 — Glowlight Tetra: slimmer, single horizontal glow stripe (thinner than neon)
const GlowlightTetra = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.59} viewBox="0 0 62 37">
    <defs>
      <radialGradient id={`glb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.4" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
    </defs>
    {/* Forked tail */}
    <path d="M46 11 Q52 5 56 7 Q53 13 56 17 Q53 16 46 19 Z" fill={colors.fin} opacity="0.65" />
    <path d="M46 25 Q52 29 56 27 Q53 23 46 19 Z" fill={colors.fin} opacity="0.55" />
    {/* Body — slimmer than neon tetra */}
    <ellipse cx="28" cy="18" rx="20" ry="10" fill={`url(#glb-${id})`} />
    {/* Single thin glowing stripe — glowlight signature */}
    <path d="M12 17 Q28 15 44 17" stroke={colors.accent} strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round" />
    {/* Stripe glow effect */}
    <path d="M12 17 Q28 15 44 17" stroke={colors.accent} strokeWidth="4" fill="none" opacity="0.15" strokeLinecap="round" />
    {/* Belly highlight */}
    <ellipse cx="26" cy="22" rx="12" ry="3.5" fill="white" opacity="0.1" />
    {/* Dorsal fin — small, delicate */}
    <path d="M24 8 Q28 4 31 8 Q28 10 24 9 Z" fill={colors.fin} opacity="0.5" />
    {/* Adipose fin */}
    <path d="M40 11 Q42 9 44 11 Q42 12 40 11 Z" fill={colors.fin} opacity="0.35" />
    {/* Anal fin */}
    <path d="M28 26 Q31 30 34 28 Q32 26 30 25 Z" fill={colors.fin} opacity="0.5" />
    {/* Pectoral fin */}
    <path d="M18 21 Q16 25 20 26 Q19 22 20 20 Z" fill={colors.fin} opacity="0.45" />
    {/* Eye */}
    <circle cx="13" cy="16" r="3.5" fill="white" />
    <circle cx="12.5" cy="15.5" r="2" fill={colors.eye} />
    <circle cx="12" cy="15" r="0.8" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M9 19 Q7 18.5 9 18" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
))
GlowlightTetra.displayName = 'GlowlightTetra'

// ─── ANGELFISH VARIATIONS (Tier 2) ─────────────────────────────────────

// Tier 2 — Marble Angelfish: irregular blotch pattern instead of stripes
const MarbleAngelfish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size} viewBox="0 0 70 70">
    <defs>
      <radialGradient id={`mab-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.6" />
      </radialGradient>
      <linearGradient id={`maf-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Tail */}
    <path d="M52 28 Q58 22 62 24 Q58 30 62 36 Q58 34 52 38 Z" fill={`url(#maf-${id})`} opacity="0.8" />
    {/* Tall dorsal fin */}
    <path d="M22 16 Q26 2 34 0 Q36 2 38 8 Q36 14 30 18 Z" fill={`url(#maf-${id})`} opacity="0.85" />
    {/* Tall anal fin */}
    <path d="M22 50 Q26 64 34 66 Q36 64 38 58 Q36 52 30 48 Z" fill={`url(#maf-${id})`} opacity="0.8" />
    {/* Body — diamond/disc shape */}
    <path d="M10 32 Q10 18 28 14 Q46 14 50 28 Q50 32 50 38 Q46 52 28 52 Q10 48 10 32 Z" fill={`url(#mab-${id})`} />
    {/* Marble blotch pattern — irregular patches instead of stripes */}
    <path d="M18 22 Q22 18 28 20 Q30 26 24 28 Q18 28 18 22 Z" fill={colors.fin} opacity="0.3" />
    <path d="M32 18 Q40 16 42 22 Q44 30 38 32 Q32 30 32 24 Z" fill={colors.fin} opacity="0.25" />
    <path d="M20 34 Q26 30 30 34 Q28 40 22 42 Q18 40 20 34 Z" fill={colors.fin} opacity="0.2" />
    <path d="M36 36 Q42 32 46 36 Q44 42 40 44 Q36 42 36 36 Z" fill={colors.fin} opacity="0.22" />
    <ellipse cx="26" cy="24" rx="5" ry="4" fill={colors.fin} opacity="0.15" />
    {/* Body shimmer */}
    <path d="M16 28 Q30 24 44 28" stroke="white" strokeWidth="0.7" fill="none" opacity="0.1" />
    {/* Belly highlight */}
    <ellipse cx="28" cy="38" rx="12" ry="5" fill="white" opacity="0.08" />
    {/* Long trailing ventral fins */}
    <path d="M22 44 Q18 56 16 64" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M26 44 Q22 56 21 62" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />
    {/* Pectoral fin */}
    <path d="M18 34 Q14 40 18 44 Q18 40 20 36 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye */}
    <circle cx="16" cy="30" r="4.5" fill="white" />
    <circle cx="15.5" cy="29.5" r="2.8" fill={colors.eye} />
    <circle cx="15" cy="29" r="1" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M10 34 Q8 33.5 10 33" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
MarbleAngelfish.displayName = 'MarbleAngelfish'

// Tier 2 — Koi Angelfish: no stripes, patch pattern like koi
const KoiAngelfish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size} viewBox="0 0 70 70">
    <defs>
      <radialGradient id={`kab-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.6" />
      </radialGradient>
      <linearGradient id={`kaf-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.5" />
      </linearGradient>
      <radialGradient id={`kap1-${id}`} cx="0.3" cy="0.4" r="0.35">
        <stop offset="0%" stopColor={colors.fin} stopOpacity="0.45" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`kap2-${id}`} cx="0.7" cy="0.5" r="0.3">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.4" />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Tail */}
    <path d="M52 28 Q58 22 62 24 Q58 30 62 36 Q58 34 52 38 Z" fill={`url(#kaf-${id})`} opacity="0.8" />
    {/* Tall dorsal fin */}
    <path d="M22 16 Q26 2 34 0 Q36 2 38 8 Q36 14 30 18 Z" fill={`url(#kaf-${id})`} opacity="0.85" />
    {/* Tall anal fin */}
    <path d="M22 50 Q26 64 34 66 Q36 64 38 58 Q36 52 30 48 Z" fill={`url(#kaf-${id})`} opacity="0.8" />
    {/* Body */}
    <path d="M10 32 Q10 18 28 14 Q46 14 50 28 Q50 32 50 38 Q46 52 28 52 Q10 48 10 32 Z" fill={`url(#kab-${id})`} />
    {/* Koi-like color patches */}
    <ellipse cx="24" cy="26" rx="8" ry="7" fill={`url(#kap1-${id})`} />
    <ellipse cx="38" cy="32" rx="7" ry="8" fill={`url(#kap2-${id})`} />
    <ellipse cx="30" cy="40" rx="6" ry="5" fill={`url(#kap1-${id})`} />
    {/* Body shimmer */}
    <path d="M16 28 Q30 24 44 28" stroke="white" strokeWidth="0.7" fill="none" opacity="0.1" />
    {/* Belly highlight */}
    <ellipse cx="28" cy="38" rx="12" ry="5" fill="white" opacity="0.08" />
    {/* Long trailing ventral fins */}
    <path d="M22 44 Q18 56 16 64" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M26 44 Q22 56 21 62" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />
    {/* Pectoral fin */}
    <path d="M18 34 Q14 40 18 44 Q18 40 20 36 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye */}
    <circle cx="16" cy="30" r="4.5" fill="white" />
    <circle cx="15.5" cy="29.5" r="2.8" fill={colors.eye} />
    <circle cx="15" cy="29" r="1" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M10 34 Q8 33.5 10 33" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
KoiAngelfish.displayName = 'KoiAngelfish'

// Tier 2 — Platinum Angelfish: no stripes, clean body, slightly wider
const PlatinumAngelfish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size} viewBox="0 0 74 70">
    <defs>
      <radialGradient id={`pab-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.95" />
      </radialGradient>
      <linearGradient id={`paf-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.5" />
      </linearGradient>
      <radialGradient id={`pai-${id}`} cx="40%" cy="35%" r="50%">
        <stop offset="0%" stopColor="white" stopOpacity="0.12" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Tail */}
    <path d="M56 28 Q62 22 66 24 Q62 30 66 36 Q62 34 56 38 Z" fill={`url(#paf-${id})`} opacity="0.8" />
    {/* Tall dorsal fin */}
    <path d="M24 16 Q28 2 36 0 Q38 2 40 8 Q38 14 32 18 Z" fill={`url(#paf-${id})`} opacity="0.85" />
    {/* Tall anal fin */}
    <path d="M24 50 Q28 64 36 66 Q38 64 40 58 Q38 52 32 48 Z" fill={`url(#paf-${id})`} opacity="0.8" />
    {/* Body — clean, slightly wider, no stripes */}
    <path d="M10 32 Q10 18 30 14 Q50 14 54 28 Q54 32 54 38 Q50 52 30 52 Q10 48 10 32 Z" fill={`url(#pab-${id})`} />
    {/* Clean iridescent sheen */}
    <ellipse cx="30" cy="32" rx="20" ry="16" fill={`url(#pai-${id})`} />
    {/* Subtle body shimmer */}
    <path d="M16 28 Q32 24 48 28" stroke="white" strokeWidth="0.8" fill="none" opacity="0.12" />
    <path d="M18 32 Q32 30 46 32" stroke="white" strokeWidth="0.5" fill="none" opacity="0.08" />
    {/* Belly highlight */}
    <ellipse cx="30" cy="38" rx="14" ry="5" fill="white" opacity="0.08" />
    {/* Long trailing ventral fins */}
    <path d="M24 44 Q20 56 18 64" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M28 44 Q24 56 23 62" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />
    {/* Pectoral fin */}
    <path d="M20 34 Q16 40 20 44 Q20 40 22 36 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye */}
    <circle cx="18" cy="30" r="4.5" fill="white" />
    <circle cx="17.5" cy="29.5" r="2.8" fill={colors.eye} />
    <circle cx="17" cy="29" r="1" fill="white" opacity="0.8" />
    {/* Sparkle */}
    <circle cx="30" cy="24" r="0.5" fill="white" opacity="0.35" />
    <circle cx="42" cy="30" r="0.4" fill="white" opacity="0.3" />
    {/* Mouth */}
    <path d="M10 34 Q8 33.5 10 33" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
PlatinumAngelfish.displayName = 'PlatinumAngelfish'

// Tier 2 — Zebra Angelfish: more stripes (5 instead of 3), thinner body
const ZebraAngelfish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size} viewBox="0 0 68 70">
    <defs>
      <radialGradient id={`zab-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.6" />
      </radialGradient>
      <linearGradient id={`zaf-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Tail */}
    <path d="M50 28 Q56 22 60 24 Q56 30 60 36 Q56 34 50 38 Z" fill={`url(#zaf-${id})`} opacity="0.8" />
    {/* Tall dorsal fin */}
    <path d="M20 16 Q24 2 32 0 Q34 2 36 8 Q34 14 28 18 Z" fill={`url(#zaf-${id})`} opacity="0.85" />
    {/* Tall anal fin */}
    <path d="M20 50 Q24 64 32 66 Q34 64 36 58 Q34 52 28 48 Z" fill={`url(#zaf-${id})`} opacity="0.8" />
    {/* Body — slightly thinner diamond */}
    <path d="M10 32 Q10 20 26 16 Q44 16 48 28 Q48 32 48 38 Q44 50 26 50 Q10 46 10 32 Z" fill={`url(#zab-${id})`} />
    {/* 5 vertical stripes — zebra angelfish signature */}
    <path d="M16 18 Q14 28 14 34 Q14 40 16 48" stroke={colors.fin} strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round" />
    <path d="M22 16 Q20 28 20 34 Q20 40 22 50" stroke={colors.fin} strokeWidth="1.8" fill="none" opacity="0.25" strokeLinecap="round" />
    <path d="M28 16 Q26 28 26 34 Q26 40 28 50" stroke={colors.fin} strokeWidth="1.8" fill="none" opacity="0.25" strokeLinecap="round" />
    <path d="M34 16 Q32 28 32 34 Q32 40 34 50" stroke={colors.fin} strokeWidth="1.6" fill="none" opacity="0.2" strokeLinecap="round" />
    <path d="M40 18 Q38 28 38 34 Q38 40 40 48" stroke={colors.fin} strokeWidth="1.4" fill="none" opacity="0.18" strokeLinecap="round" />
    {/* Body shimmer */}
    <path d="M14 28 Q28 24 42 28" stroke="white" strokeWidth="0.7" fill="none" opacity="0.1" />
    {/* Belly highlight */}
    <ellipse cx="26" cy="38" rx="10" ry="4" fill="white" opacity="0.08" />
    {/* Long trailing ventral fins */}
    <path d="M20 44 Q16 56 14 64" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M24 44 Q20 56 19 62" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />
    {/* Pectoral fin */}
    <path d="M16 34 Q12 40 16 44 Q16 40 18 36 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye */}
    <circle cx="14" cy="30" r="4.5" fill="white" />
    <circle cx="13.5" cy="29.5" r="2.8" fill={colors.eye} />
    <circle cx="13" cy="29" r="1" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M10 34 Q8 33.5 10 33" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
ZebraAngelfish.displayName = 'ZebraAngelfish'

// Tier 2 — Veil Angelfish: extra-long trailing ventral fins and taller dorsal
const VeilAngelfish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 70 77">
    <defs>
      <radialGradient id={`vab-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.6" />
      </radialGradient>
      <linearGradient id={`vaf-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Tail */}
    <path d="M52 32 Q58 26 62 28 Q58 34 62 40 Q58 38 52 42 Z" fill={`url(#vaf-${id})`} opacity="0.8" />
    {/* Extra-tall dorsal fin — veil angelfish signature */}
    <path d="M22 18 Q24 4 30 0 Q34 0 36 4 Q38 10 36 18 Q32 20 26 20 Z" fill={`url(#vaf-${id})`} opacity="0.85" />
    <path d="M26 16 Q28 6 30 2" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.35" />
    <path d="M30 14 Q32 4 34 2" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.3" />
    {/* Tall anal fin */}
    <path d="M22 52 Q26 64 34 68 Q36 66 38 60 Q36 54 30 50 Z" fill={`url(#vaf-${id})`} opacity="0.8" />
    {/* Body */}
    <path d="M10 35 Q10 22 28 18 Q46 18 50 32 Q50 36 50 42 Q46 54 28 54 Q10 50 10 35 Z" fill={`url(#vab-${id})`} />
    {/* Standard angelfish stripes */}
    <path d="M22 20 Q20 32 20 38 Q20 44 22 52" stroke={colors.fin} strokeWidth="2.5" fill="none" opacity="0.25" strokeLinecap="round" />
    <path d="M32 18 Q30 32 30 38 Q30 44 32 54" stroke={colors.fin} strokeWidth="2" fill="none" opacity="0.2" strokeLinecap="round" />
    <path d="M42 22 Q40 32 40 38 Q40 44 42 50" stroke={colors.fin} strokeWidth="1.5" fill="none" opacity="0.15" strokeLinecap="round" />
    {/* Body shimmer */}
    <path d="M16 32 Q30 28 44 32" stroke="white" strokeWidth="0.7" fill="none" opacity="0.1" />
    {/* Belly highlight */}
    <ellipse cx="28" cy="42" rx="12" ry="5" fill="white" opacity="0.08" />
    {/* Extra-long trailing ventral fins — veil signature */}
    <path d="M22 48 Q16 60 12 72" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.65" strokeLinecap="round" />
    <path d="M26 48 Q20 60 17 70" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.55" strokeLinecap="round" />
    <path d="M30 48 Q24 58 22 66" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.45" strokeLinecap="round" />
    {/* Pectoral fin */}
    <path d="M18 38 Q14 44 18 48 Q18 44 20 40 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye */}
    <circle cx="16" cy="33" r="4.5" fill="white" />
    <circle cx="16" cy="33" r="4.5" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.3" />
    <circle cx="15.5" cy="32.5" r="2.8" fill={colors.eye} />
    <circle cx="15" cy="32" r="1" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M10 37 Q8 36.5 10 36" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
VeilAngelfish.displayName = 'VeilAngelfish'

// Tier 3 third — Clownfish: oval with white bar stripes and dark outlines
const ClownfishFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 70 49">
    <defs>
      <radialGradient id={`cfb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.95" />
      </radialGradient>
      <linearGradient id={`cff-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    {/* Rounded tail */}
    <path d="M52 16 Q58 10 62 14 Q60 20 62 26 Q60 32 62 36 Q58 34 52 30 Z" fill={`url(#cff-${id})`} opacity="0.85" />
    {/* Dorsal fin — spiny, continuous ridge */}
    <path d="M16 8 Q22 2 32 2 Q40 3 48 8 Q44 11 34 11 Q24 10 16 10 Z" fill={colors.fin} opacity="0.9" />
    {/* Dorsal spines */}
    <path d="M18 8 Q20 3 22 4" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.4" />
    <path d="M26 6 Q28 2 30 3" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.4" />
    <path d="M34 6 Q36 2 38 3" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.35" />
    <path d="M42 8 Q44 4 46 6" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.3" />
    {/* Anal fin */}
    <path d="M24 41 Q30 46 38 46 Q42 44 44 41 Q38 40 30 40 Z" fill={colors.fin} opacity="0.8" />
    {/* Body — oval, slightly deep */}
    <ellipse cx="30" cy="24" rx="24" ry="16" fill={`url(#cfb-${id})`} />
    {/* White bar stripes — clownfish signature (3 bars with dark outlines) */}
    <path d="M16 10 Q14 24 16 38" stroke={colors.eye} strokeWidth="1.2" fill="none" opacity="0.15" />
    <path d="M16 10 Q14 24 16 38" stroke={colors.accent} strokeWidth="4" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M16 10 Q14 24 16 38" stroke={colors.eye} strokeWidth="1.2" fill="none" opacity="0.15" />
    <path d="M32 8 Q30 24 32 40" stroke={colors.eye} strokeWidth="1" fill="none" opacity="0.12" />
    <path d="M32 8 Q30 24 32 40" stroke={colors.accent} strokeWidth="3.5" fill="none" opacity="0.55" strokeLinecap="round" />
    <path d="M46 14 Q44 24 46 34" stroke={colors.eye} strokeWidth="0.8" fill="none" opacity="0.1" />
    <path d="M46 14 Q44 24 46 34" stroke={colors.accent} strokeWidth="2.5" fill="none" opacity="0.45" strokeLinecap="round" />
    {/* Body shimmer */}
    <path d="M12 20 Q30 17 48 20" stroke="white" strokeWidth="0.6" fill="none" opacity="0.1" />
    {/* Belly highlight */}
    <ellipse cx="28" cy="30" rx="14" ry="5.5" fill="white" opacity="0.08" />
    {/* Pectoral fin — rounded */}
    <path d="M20 28 Q16 34 20 38 Q20 34 22 30 Z" fill={colors.fin} opacity="0.7" />
    {/* Eye — large, dark band through it */}
    <circle cx="12" cy="22" r="4.2" fill="white" />
    <circle cx="11.5" cy="21.5" r="2.6" fill={colors.eye} />
    <circle cx="11" cy="21" r="1" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M7 26 Q5 25.5 7 25" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
ClownfishFish.displayName = 'ClownfishFish'

// Tier 4 third — Tang: disc body, scalpel near tail, vibrant reef fish
const TangFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.82} viewBox="0 0 82 67">
    <defs>
      <radialGradient id={`tgb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="50%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.95" />
      </radialGradient>
      <linearGradient id={`tgf-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.5" />
      </linearGradient>
      <radialGradient id={`tgi-${id}`} cx="40%" cy="35%" r="50%">
        <stop offset="0%" stopColor="white" stopOpacity="0.1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Crescent tail */}
    <path d="M62 24 Q68 16 74 18 Q72 26 76 34 Q72 42 74 48 Q68 46 62 40 Z" fill={`url(#tgf-${id})`} opacity="0.8" />
    {/* Tail scalpel marking — tang signature */}
    <ellipse cx="64" cy="32" rx="2" ry="3" fill={colors.accent} opacity="0.6" />
    {/* Tall dorsal fin — continuous, flag-like */}
    <path d="M18 8 Q26 0 36 0 Q46 2 54 8 Q50 12 40 12 Q28 10 18 10 Z" fill={`url(#tgf-${id})`} opacity="0.8" />
    <path d="M22 8 Q30 2 40 2" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.3" />
    <path d="M36 6 Q42 2 48 4" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.25" />
    {/* Tall anal fin — mirrors dorsal */}
    <path d="M18 58 Q26 66 36 66 Q46 64 54 58 Q50 54 40 54 Q28 56 18 56 Z" fill={`url(#tgf-${id})`} opacity="0.75" />
    {/* Body — oval disc */}
    <ellipse cx="36" cy="34" rx="28" ry="22" fill={`url(#tgb-${id})`} />
    {/* Body color zone — darker rear section */}
    <path d="M40 14 Q56 14 60 24 Q62 34 60 44 Q56 54 40 54 Q48 44 48 34 Q48 24 40 14 Z" fill={colors.fin} opacity="0.1" />
    {/* Iridescence */}
    <ellipse cx="36" cy="34" rx="26" ry="20" fill={`url(#tgi-${id})`} />
    {/* Body shimmer */}
    <path d="M14 28 Q36 24 54 28" stroke="white" strokeWidth="0.7" fill="none" opacity="0.1" />
    <path d="M16 34 Q36 32 52 34" stroke="white" strokeWidth="0.5" fill="none" opacity="0.07" />
    {/* Belly highlight */}
    <ellipse cx="34" cy="42" rx="16" ry="6" fill="white" opacity="0.06" />
    {/* Pectoral fin */}
    <path d="M22 38 Q18 44 22 48 Q22 44 24 40 Z" fill={colors.fin} opacity="0.6" />
    {/* Ventral fin — modest */}
    <path d="M28 54 Q26 60 28 64" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" />
    {/* Eye — medium with color ring */}
    <circle cx="16" cy="30" r="5" fill="white" />
    <circle cx="16" cy="30" r="5" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.3" />
    <circle cx="15.5" cy="29.5" r="3" fill={colors.eye} />
    <circle cx="15" cy="29" r="1.8" fill="#111" />
    <circle cx="14.2" cy="28.2" r="1" fill="white" opacity="0.85" />
    {/* Snout — tang's small pointed mouth */}
    <path d="M8 34 Q4 33 6 32 Q4 33 8 34" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.5" />
  </svg>
))
TangFish.displayName = 'TangFish'


// ─── CLOWNFISH VARIATIONS (Tier 3) ─────────────────────────────────────

// Tier 3 — Tomato Clownfish: single bar only, rounder body
const TomatoClownfish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.74} viewBox="0 0 68 50">
    <defs>
      <radialGradient id={`tcb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.95" />
      </radialGradient>
      <linearGradient id={`tcf-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    {/* Rounded tail */}
    <path d="M50 16 Q56 10 60 14 Q58 20 60 26 Q58 32 60 36 Q56 34 50 30 Z" fill={`url(#tcf-${id})`} opacity="0.85" />
    {/* Dorsal fin — spiny ridge */}
    <path d="M14 8 Q20 2 30 2 Q38 3 46 8 Q42 11 32 11 Q22 10 14 10 Z" fill={colors.fin} opacity="0.9" />
    {/* Anal fin */}
    <path d="M22 42 Q28 47 36 47 Q40 45 42 42 Q36 41 28 41 Z" fill={colors.fin} opacity="0.8" />
    {/* Body — rounder, deeper than standard clownfish */}
    <ellipse cx="28" cy="25" rx="22" ry="18" fill={`url(#tcb-${id})`} />
    {/* Single white bar — tomato clownfish signature (only 1 bar behind head) */}
    <path d="M16 10 Q14 25 16 40" stroke={colors.eye} strokeWidth="1.2" fill="none" opacity="0.15" />
    <path d="M16 10 Q14 25 16 40" stroke={colors.accent} strokeWidth="4.5" fill="none" opacity="0.65" strokeLinecap="round" />
    {/* Body shimmer */}
    <path d="M12 20 Q28 17 46 20" stroke="white" strokeWidth="0.6" fill="none" opacity="0.1" />
    {/* Belly highlight */}
    <ellipse cx="26" cy="32" rx="14" ry="6" fill="white" opacity="0.08" />
    {/* Pectoral fin */}
    <path d="M18 29 Q14 35 18 39 Q18 35 20 31 Z" fill={colors.fin} opacity="0.7" />
    {/* Eye */}
    <circle cx="12" cy="22" r="4.2" fill="white" />
    <circle cx="11.5" cy="21.5" r="2.6" fill={colors.eye} />
    <circle cx="11" cy="21" r="1" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M7 27 Q5 26.5 7 26" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
TomatoClownfish.displayName = 'TomatoClownfish'

// Tier 3 — Maroon Clownfish: thinner bars, deeper body, spiky dorsal
const MaroonClownfish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.76} viewBox="0 0 72 55">
    <defs>
      <radialGradient id={`mcb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.95" />
      </radialGradient>
      <linearGradient id={`mcf-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    {/* Rounded tail */}
    <path d="M54 18 Q60 12 64 16 Q62 22 64 28 Q62 34 64 38 Q60 36 54 32 Z" fill={`url(#mcf-${id})`} opacity="0.85" />
    {/* Spiky dorsal fin — maroon clownfish signature */}
    <path d="M16 8 Q20 1 26 2 Q28 0 30 2 Q34 1 38 3 Q42 2 46 4 Q48 6 50 10 Q46 12 36 12 Q24 11 16 10 Z" fill={colors.fin} opacity="0.9" />
    {/* Dorsal spines */}
    <path d="M20 8 Q22 2 24 2" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
    <path d="M28 6 Q30 1 32 2" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
    <path d="M36 6 Q38 2 40 3" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.45" />
    <path d="M44 7 Q46 3 48 5" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.4" />
    {/* Anal fin */}
    <path d="M24 45 Q30 51 38 51 Q42 49 46 45 Q40 44 32 44 Z" fill={colors.fin} opacity="0.8" />
    {/* Body — deeper */}
    <ellipse cx="32" cy="28" rx="24" ry="18" fill={`url(#mcb-${id})`} />
    {/* Thin white bar stripes — 3 bars but thinner */}
    <path d="M18 12 Q16 28 18 44" stroke={colors.accent} strokeWidth="2.5" fill="none" opacity="0.55" strokeLinecap="round" />
    <path d="M34 10 Q32 28 34 46" stroke={colors.accent} strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
    <path d="M48 16 Q46 28 48 40" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
    {/* Body shimmer */}
    <path d="M14 24 Q32 20 50 24" stroke="white" strokeWidth="0.6" fill="none" opacity="0.1" />
    {/* Belly highlight */}
    <ellipse cx="30" cy="35" rx="14" ry="5.5" fill="white" opacity="0.08" />
    {/* Pectoral fin */}
    <path d="M20 32 Q16 38 20 42 Q20 38 22 34 Z" fill={colors.fin} opacity="0.7" />
    {/* Eye */}
    <circle cx="14" cy="25" r="4.2" fill="white" />
    <circle cx="13.5" cy="24.5" r="2.6" fill={colors.eye} />
    <circle cx="13" cy="24" r="1" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M9 30 Q7 29.5 9 29" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
MaroonClownfish.displayName = 'MaroonClownfish'

// Tier 3 — Saddleback Clownfish: saddle-shaped bars, elongated body
const SaddlebackClownfish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.66} viewBox="0 0 76 50">
    <defs>
      <radialGradient id={`sbb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.95" />
      </radialGradient>
      <linearGradient id={`sbf-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    {/* Rounded tail */}
    <path d="M58 16 Q64 10 68 14 Q66 20 68 26 Q66 32 68 36 Q64 34 58 30 Z" fill={`url(#sbf-${id})`} opacity="0.85" />
    {/* Dorsal fin */}
    <path d="M18 8 Q26 2 36 2 Q44 3 52 8 Q48 11 38 11 Q26 10 18 10 Z" fill={colors.fin} opacity="0.9" />
    {/* Anal fin */}
    <path d="M26 42 Q32 47 40 47 Q44 45 48 42 Q42 41 34 41 Z" fill={colors.fin} opacity="0.8" />
    {/* Body — more elongated */}
    <ellipse cx="34" cy="25" rx="26" ry="16" fill={`url(#sbb-${id})`} />
    {/* Head bar */}
    <path d="M18 10 Q16 25 18 40" stroke={colors.accent} strokeWidth="4" fill="none" opacity="0.6" strokeLinecap="round" />
    {/* Saddle-shaped bar — doesn't reach belly (saddleback signature) */}
    <path d="M36 8 Q34 16 34 20" stroke={colors.accent} strokeWidth="4" fill="none" opacity="0.5" strokeLinecap="round" />
    {/* Third partial bar */}
    <path d="M50 12 Q48 20 48 24" stroke={colors.accent} strokeWidth="2.5" fill="none" opacity="0.4" strokeLinecap="round" />
    {/* Body shimmer */}
    <path d="M14 22 Q34 18 54 22" stroke="white" strokeWidth="0.6" fill="none" opacity="0.1" />
    {/* Belly highlight */}
    <ellipse cx="32" cy="32" rx="16" ry="5.5" fill="white" opacity="0.08" />
    {/* Pectoral fin */}
    <path d="M22 29 Q18 35 22 39 Q22 35 24 31 Z" fill={colors.fin} opacity="0.7" />
    {/* Eye */}
    <circle cx="14" cy="23" r="4.2" fill="white" />
    <circle cx="13.5" cy="22.5" r="2.6" fill={colors.eye} />
    <circle cx="13" cy="22" r="1" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M9 27 Q7 26.5 9 26" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
SaddlebackClownfish.displayName = 'SaddlebackClownfish'

// Tier 3 — Cinnamon Clownfish: single bar, dark body marking
const CinnamonClownfish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 70 49">
    <defs>
      <radialGradient id={`ccb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.95" />
      </radialGradient>
      <linearGradient id={`ccf-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    {/* Rounded tail */}
    <path d="M52 16 Q58 10 62 14 Q60 20 62 26 Q60 32 62 36 Q58 34 52 30 Z" fill={`url(#ccf-${id})`} opacity="0.85" />
    {/* Dorsal fin */}
    <path d="M16 8 Q22 2 32 2 Q40 3 48 8 Q44 11 34 11 Q24 10 16 10 Z" fill={colors.fin} opacity="0.9" />
    {/* Anal fin */}
    <path d="M24 41 Q30 46 38 46 Q42 44 44 41 Q38 40 30 40 Z" fill={colors.fin} opacity="0.8" />
    {/* Body */}
    <ellipse cx="30" cy="24" rx="24" ry="16" fill={`url(#ccb-${id})`} />
    {/* Dark body marking — cinnamon signature (darker rear body) */}
    <path d="M30 10 Q46 10 50 18 Q52 24 50 32 Q46 40 30 40 Q38 32 38 24 Q38 16 30 10 Z" fill={colors.fin} opacity="0.2" />
    {/* Single white bar — cinnamon clownfish signature */}
    <path d="M16 10 Q14 24 16 38" stroke={colors.accent} strokeWidth="4.5" fill="none" opacity="0.6" strokeLinecap="round" />
    {/* Body shimmer */}
    <path d="M12 20 Q30 17 48 20" stroke="white" strokeWidth="0.6" fill="none" opacity="0.1" />
    {/* Belly highlight */}
    <ellipse cx="28" cy="30" rx="14" ry="5.5" fill="white" opacity="0.08" />
    {/* Pectoral fin */}
    <path d="M20 28 Q16 34 20 38 Q20 34 22 30 Z" fill={colors.fin} opacity="0.7" />
    {/* Eye */}
    <circle cx="12" cy="22" r="4.2" fill="white" />
    <circle cx="11.5" cy="21.5" r="2.6" fill={colors.eye} />
    <circle cx="11" cy="21" r="1" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M7 26 Q5 25.5 7 25" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
CinnamonClownfish.displayName = 'CinnamonClownfish'

// Tier 3 — Snowflake Clownfish: irregular wavy bars
const SnowflakeClownfish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 70 49">
    <defs>
      <radialGradient id={`sfb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.95" />
      </radialGradient>
      <linearGradient id={`sff-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    {/* Rounded tail */}
    <path d="M52 16 Q58 10 62 14 Q60 20 62 26 Q60 32 62 36 Q58 34 52 30 Z" fill={`url(#sff-${id})`} opacity="0.85" />
    {/* Dorsal fin */}
    <path d="M16 8 Q22 2 32 2 Q40 3 48 8 Q44 11 34 11 Q24 10 16 10 Z" fill={colors.fin} opacity="0.9" />
    {/* Anal fin */}
    <path d="M24 41 Q30 46 38 46 Q42 44 44 41 Q38 40 30 40 Z" fill={colors.fin} opacity="0.8" />
    {/* Body */}
    <ellipse cx="30" cy="24" rx="24" ry="16" fill={`url(#sfb-${id})`} />
    {/* Irregular wavy white bars — snowflake signature */}
    <path d="M14 12 Q12 18 16 22 Q12 26 14 32 Q16 36 14 40" stroke={colors.accent} strokeWidth="4" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M30 10 Q28 16 32 20 Q28 24 30 30 Q32 34 30 38" stroke={colors.accent} strokeWidth="3.5" fill="none" opacity="0.5" strokeLinecap="round" />
    <path d="M44 14 Q42 18 46 22 Q42 26 44 30 Q46 34 44 36" stroke={colors.accent} strokeWidth="2.5" fill="none" opacity="0.4" strokeLinecap="round" />
    {/* Body shimmer */}
    <path d="M12 20 Q30 17 48 20" stroke="white" strokeWidth="0.6" fill="none" opacity="0.1" />
    {/* Belly highlight */}
    <ellipse cx="28" cy="30" rx="14" ry="5.5" fill="white" opacity="0.08" />
    {/* Pectoral fin */}
    <path d="M20 28 Q16 34 20 38 Q20 34 22 30 Z" fill={colors.fin} opacity="0.7" />
    {/* Eye */}
    <circle cx="12" cy="22" r="4.2" fill="white" />
    <circle cx="11.5" cy="21.5" r="2.6" fill={colors.eye} />
    <circle cx="11" cy="21" r="1" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M7 26 Q5 25.5 7 25" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
SnowflakeClownfish.displayName = 'SnowflakeClownfish'

// ─── TANG VARIATIONS (Tier 4) ─────────────────────────────────────

// Tier 4 — Yellow Tang: smaller, rounder body, larger dorsal
const YellowTang = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.85} viewBox="0 0 76 65">
    <defs>
      <radialGradient id={`ytb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="50%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.95" />
      </radialGradient>
      <linearGradient id={`ytf-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Crescent tail */}
    <path d="M58 24 Q64 16 68 18 Q66 26 70 32 Q66 38 68 44 Q64 42 58 38 Z" fill={`url(#ytf-${id})`} opacity="0.8" />
    {/* Tail scalpel marking */}
    <ellipse cx="60" cy="31" rx="2" ry="3" fill={colors.accent} opacity="0.6" />
    {/* Extra-tall dorsal fin — yellow tang signature */}
    <path d="M14 6 Q22 0 30 0 Q40 2 48 6 Q50 10 48 14 Q42 14 32 12 Q22 10 14 10 Z" fill={`url(#ytf-${id})`} opacity="0.85" />
    <path d="M18 8 Q26 2 34 2" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.3" />
    {/* Tall anal fin */}
    <path d="M14 56 Q22 64 30 64 Q40 62 48 56 Q44 52 34 52 Q22 54 14 54 Z" fill={`url(#ytf-${id})`} opacity="0.8" />
    {/* Body — rounder, smaller disc */}
    <ellipse cx="32" cy="32" rx="24" ry="22" fill={`url(#ytb-${id})`} />
    {/* Body shimmer */}
    <path d="M14 28 Q32 24 50 28" stroke="white" strokeWidth="0.7" fill="none" opacity="0.1" />
    {/* Belly highlight */}
    <ellipse cx="30" cy="40" rx="14" ry="5" fill="white" opacity="0.06" />
    {/* Pectoral fin */}
    <path d="M18 36 Q14 42 18 46 Q18 42 20 38 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye */}
    <circle cx="14" cy="28" r="4.5" fill="white" />
    <circle cx="13.5" cy="27.5" r="2.8" fill={colors.eye} />
    <circle cx="13" cy="27" r="1" fill="white" opacity="0.85" />
    {/* Snout */}
    <path d="M8 32 Q4 31 6 30 Q4 31 8 32" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.5" />
  </svg>
))
YellowTang.displayName = 'YellowTang'

// Tier 4 — Powder Blue Tang: slightly more oval, two-tone body zone
const PowderTang = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.82} viewBox="0 0 82 67">
    <defs>
      <radialGradient id={`ptb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="50%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.95" />
      </radialGradient>
      <linearGradient id={`ptf-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Crescent tail */}
    <path d="M62 24 Q68 16 74 18 Q72 26 76 34 Q72 42 74 48 Q68 46 62 40 Z" fill={`url(#ptf-${id})`} opacity="0.8" />
    {/* Tail scalpel marking */}
    <ellipse cx="64" cy="32" rx="2" ry="3" fill={colors.accent} opacity="0.6" />
    {/* Dorsal fin */}
    <path d="M18 8 Q26 0 36 0 Q46 2 54 8 Q50 12 40 12 Q28 10 18 10 Z" fill={`url(#ptf-${id})`} opacity="0.8" />
    {/* Anal fin */}
    <path d="M18 58 Q26 66 36 66 Q46 64 54 58 Q50 54 40 54 Q28 56 18 56 Z" fill={`url(#ptf-${id})`} opacity="0.75" />
    {/* Body — slightly more oval */}
    <ellipse cx="36" cy="34" rx="28" ry="22" fill={`url(#ptb-${id})`} />
    {/* Two-tone body zone — powder tang signature (darker face/chest area) */}
    <path d="M10 24 Q8 34 10 44 Q14 50 20 50 Q20 40 20 34 Q20 28 20 20 Q14 18 10 24 Z" fill={colors.fin} opacity="0.2" />
    {/* Body shimmer */}
    <path d="M14 28 Q36 24 54 28" stroke="white" strokeWidth="0.7" fill="none" opacity="0.1" />
    {/* Belly highlight */}
    <ellipse cx="34" cy="42" rx="16" ry="6" fill="white" opacity="0.06" />
    {/* Pectoral fin */}
    <path d="M22 38 Q18 44 22 48 Q22 44 24 40 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye */}
    <circle cx="16" cy="30" r="5" fill="white" />
    <circle cx="15.5" cy="29.5" r="3" fill={colors.eye} />
    <circle cx="15" cy="29" r="1" fill="white" opacity="0.85" />
    {/* Snout */}
    <path d="M8 34 Q4 33 6 32 Q4 33 8 34" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.5" />
  </svg>
))
PowderTang.displayName = 'PowderTang'

// Tier 4 — Achilles Tang: more teardrop-shaped, prominent tail spot
const AchillesTang = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.82} viewBox="0 0 82 67">
    <defs>
      <radialGradient id={`atb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="50%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.95" />
      </radialGradient>
      <linearGradient id={`atf-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Crescent tail */}
    <path d="M62 24 Q68 16 74 18 Q72 26 76 34 Q72 42 74 48 Q68 46 62 40 Z" fill={`url(#atf-${id})`} opacity="0.8" />
    {/* Prominent tail spot — Achilles tang signature */}
    <ellipse cx="62" cy="32" rx="4" ry="5" fill={colors.accent} opacity="0.7" />
    <ellipse cx="62" cy="32" rx="2.5" ry="3.5" fill={colors.accent} opacity="0.5" />
    {/* Dorsal fin */}
    <path d="M18 8 Q26 0 36 0 Q46 2 54 8 Q50 12 40 12 Q28 10 18 10 Z" fill={`url(#atf-${id})`} opacity="0.8" />
    {/* Anal fin */}
    <path d="M18 58 Q26 66 36 66 Q46 64 54 58 Q50 54 40 54 Q28 56 18 56 Z" fill={`url(#atf-${id})`} opacity="0.75" />
    {/* Body — teardrop shape, narrower toward tail */}
    <path d="M8 34 Q8 14 30 10 Q48 10 58 18 Q64 24 64 34 Q64 44 58 50 Q48 58 30 58 Q8 54 8 34 Z" fill={`url(#atb-${id})`} />
    {/* Body shimmer */}
    <path d="M14 28 Q36 24 54 28" stroke="white" strokeWidth="0.7" fill="none" opacity="0.1" />
    {/* Belly highlight */}
    <ellipse cx="34" cy="42" rx="16" ry="6" fill="white" opacity="0.06" />
    {/* Pectoral fin */}
    <path d="M22 38 Q18 44 22 48 Q22 44 24 40 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye */}
    <circle cx="16" cy="30" r="5" fill="white" />
    <circle cx="15.5" cy="29.5" r="3" fill={colors.eye} />
    <circle cx="15" cy="29" r="1" fill="white" opacity="0.85" />
    {/* Snout */}
    <path d="M8 36 Q4 35 6 34 Q4 35 8 36" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.5" />
  </svg>
))
AchillesTang.displayName = 'AchillesTang'

// Tier 4 — Naso Tang: elongated snout/forehead bump, longer caudal streamers
const NasoTang = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.82} viewBox="0 0 86 70">
    <defs>
      <radialGradient id={`ntgb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="50%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.95" />
      </radialGradient>
      <linearGradient id={`ntgf-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Crescent tail with long streamers — naso tang signature */}
    <path d="M66 26 Q72 18 78 20 Q76 28 80 36 Q76 44 78 50 Q72 48 66 42 Z" fill={`url(#ntgf-${id})`} opacity="0.8" />
    {/* Caudal streamers */}
    <path d="M74 20 Q78 16 82 14" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M74 50 Q78 54 82 56" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
    {/* Tail scalpel */}
    <ellipse cx="68" cy="34" rx="2" ry="3" fill={colors.accent} opacity="0.6" />
    {/* Dorsal fin */}
    <path d="M20 10 Q28 2 38 2 Q48 4 56 10 Q52 14 42 14 Q30 12 20 12 Z" fill={`url(#ntgf-${id})`} opacity="0.8" />
    {/* Anal fin */}
    <path d="M20 60 Q28 68 38 68 Q48 66 56 60 Q52 56 42 56 Q30 58 20 58 Z" fill={`url(#ntgf-${id})`} opacity="0.75" />
    {/* Body */}
    <ellipse cx="38" cy="36" rx="28" ry="22" fill={`url(#ntgb-${id})`} />
    {/* Forehead bump / elongated snout — naso tang signature */}
    <path d="M10 30 Q6 28 4 30 Q2 32 4 36 Q6 38 10 36 Z" fill={colors.body} />
    <path d="M10 28 Q6 24 4 28 Q6 26 10 28 Z" fill={colors.fin} opacity="0.4" />
    {/* Body shimmer */}
    <path d="M16 30 Q38 26 58 30" stroke="white" strokeWidth="0.7" fill="none" opacity="0.1" />
    {/* Belly highlight */}
    <ellipse cx="36" cy="44" rx="16" ry="6" fill="white" opacity="0.06" />
    {/* Pectoral fin */}
    <path d="M24 40 Q20 46 24 50 Q24 46 26 42 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye */}
    <circle cx="18" cy="32" r="5" fill="white" />
    <circle cx="17.5" cy="31.5" r="3" fill={colors.eye} />
    <circle cx="17" cy="31" r="1" fill="white" opacity="0.85" />
    {/* Mouth */}
    <path d="M8 36 Q5 35.5 8 35" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.5" />
  </svg>
))
NasoTang.displayName = 'NasoTang'

// Tier 4 — Sailfin Tang: extra-tall dorsal and anal fins
const SailfinTang = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.95} viewBox="0 0 82 78">
    <defs>
      <radialGradient id={`sftb-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="50%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.95" />
      </radialGradient>
      <linearGradient id={`sftf-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Crescent tail */}
    <path d="M62 30 Q68 22 74 24 Q72 32 76 40 Q72 48 74 54 Q68 52 62 46 Z" fill={`url(#sftf-${id})`} opacity="0.8" />
    {/* Tail scalpel */}
    <ellipse cx="64" cy="38" rx="2" ry="3" fill={colors.accent} opacity="0.6" />
    {/* Extra-tall dorsal fin — sailfin signature */}
    <path d="M14 6 Q22 0 34 0 Q44 0 52 4 Q56 8 54 14 Q48 16 38 16 Q26 14 18 12 Q14 10 14 6 Z" fill={`url(#sftf-${id})`} opacity="0.85" />
    <path d="M18 8 Q28 2 38 2" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.3" />
    <path d="M34 6 Q42 2 48 4" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.25" />
    {/* Extra-tall anal fin — sailfin signature */}
    <path d="M14 70 Q22 78 34 78 Q44 76 52 70 Q56 66 54 62 Q48 60 38 60 Q26 62 18 64 Q14 66 14 70 Z" fill={`url(#sftf-${id})`} opacity="0.8" />
    {/* Body — oval disc */}
    <ellipse cx="36" cy="40" rx="28" ry="22" fill={`url(#sftb-${id})`} />
    {/* Faint vertical body lines */}
    <path d="M22 20 Q20 34 20 40 Q20 46 22 58" stroke={colors.fin} strokeWidth="1" fill="none" opacity="0.1" />
    <path d="M32 18 Q30 34 30 40 Q30 46 32 60" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.08" />
    <path d="M42 18 Q40 34 40 40 Q40 46 42 60" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.08" />
    {/* Body shimmer */}
    <path d="M14 34 Q36 30 54 34" stroke="white" strokeWidth="0.7" fill="none" opacity="0.1" />
    {/* Belly highlight */}
    <ellipse cx="34" cy="48" rx="16" ry="6" fill="white" opacity="0.06" />
    {/* Pectoral fin */}
    <path d="M22 44 Q18 50 22 54 Q22 50 24 46 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye */}
    <circle cx="16" cy="36" r="5" fill="white" />
    <circle cx="15.5" cy="35.5" r="3" fill={colors.eye} />
    <circle cx="15" cy="35" r="1" fill="white" opacity="0.85" />
    {/* Snout */}
    <path d="M8 40 Q4 39 6 38 Q4 39 8 40" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.5" />
  </svg>
))
SailfinTang.displayName = 'SailfinTang'

// ─── BETTA VARIATIONS (Tier 5) ─────────────────────────────────────

// Tier 5 — Crown Betta: spiky crown-shaped tail with separated rays
const CrownBetta = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.74} viewBox="0 0 80 59">
    <defs>
      <radialGradient id={`crb-${id}`} cx="35%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`crf-${id}`} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="50%" stopColor={colors.accent} stopOpacity="0.6" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.4" />
      </linearGradient>
    </defs>
    {/* Crown-shaped spiky tail — separated rays (crown betta signature) */}
    <path d="M48 16 Q56 6 60 4" stroke={`url(#crf-${id})`} strokeWidth="2.5" fill="none" opacity="0.75" strokeLinecap="round" />
    <path d="M48 20 Q58 12 64 8" stroke={`url(#crf-${id})`} strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round" />
    <path d="M48 24 Q58 20 66 16" stroke={`url(#crf-${id})`} strokeWidth="2" fill="none" opacity="0.65" strokeLinecap="round" />
    <path d="M48 28 Q58 28 68 26" stroke={`url(#crf-${id})`} strokeWidth="1.8" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M48 32 Q58 36 66 40" stroke={`url(#crf-${id})`} strokeWidth="2" fill="none" opacity="0.65" strokeLinecap="round" />
    <path d="M48 36 Q56 42 62 48" stroke={`url(#crf-${id})`} strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round" />
    <path d="M48 38 Q54 46 58 52" stroke={`url(#crf-${id})`} strokeWidth="2.5" fill="none" opacity="0.75" strokeLinecap="round" />
    {/* Webbing between rays */}
    <path d="M48 16 Q54 18 48 24" fill={colors.accent} opacity="0.15" />
    <path d="M48 24 Q56 26 48 32" fill={colors.accent} opacity="0.12" />
    <path d="M48 32 Q54 36 48 38" fill={colors.accent} opacity="0.15" />
    {/* Dorsal fin — spiky too */}
    <path d="M22 8 Q26 0 32 0 Q36 2 38 6 Q38 10 34 12 Q28 12 22 10 Z" fill={colors.fin} opacity="0.85" />
    {/* Spiky anal fin */}
    <path d="M28 44 Q26 52 32 56 Q38 56 40 50 Q38 46 36 44 Z" fill={colors.fin} opacity="0.75" />
    {/* Body */}
    <ellipse cx="28" cy="26" rx="20" ry="15" fill={`url(#crb-${id})`} />
    {/* Body shimmer */}
    <path d="M14 22 Q28 19 42 22" stroke="white" strokeWidth="0.7" fill="none" opacity="0.1" />
    {/* Belly */}
    <ellipse cx="26" cy="32" rx="12" ry="5" fill="white" opacity="0.08" />
    {/* Pectoral fin */}
    <path d="M20 30 Q16 38 22 42 Q22 36 24 30 Z" fill={colors.fin} opacity="0.7" />
    {/* Ventral fins */}
    <path d="M24 40 Q22 48 20 54" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M28 40 Q26 48 25 52" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
    {/* Eye */}
    <circle cx="14" cy="23" r="4" fill="white" />
    <circle cx="13.5" cy="22.5" r="2.4" fill={colors.eye} />
    <circle cx="13" cy="22" r="1" fill="white" opacity="0.8" />
    {/* Gill plate */}
    <path d="M18 20 Q16 26 18 32" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.2" />
    {/* Mouth */}
    <path d="M9 24 Q7 23 9 22" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.5" />
  </svg>
))
CrownBetta.displayName = 'CrownBetta'

// Tier 5 — Halfmoon Betta: massive 180-degree spread tail
const HalfmoonBetta = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 84 67">
    <defs>
      <radialGradient id={`hmb-${id}`} cx="35%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`hmf-${id}`} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="50%" stopColor={colors.accent} stopOpacity="0.6" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.4" />
      </linearGradient>
    </defs>
    {/* Massive 180-degree halfmoon tail — signature */}
    <path d="M48 18 Q56 2 68 2 Q74 4 76 10 Q78 18 76 28 Q76 38 74 46 Q72 52 68 56 Q60 60 54 56 Q50 50 48 40 Z" fill={`url(#hmf-${id})`} opacity="0.8" />
    <path d="M50 20 Q60 8 70 6 Q74 10 76 18 Q76 28 74 38 Q72 46 68 52 Q62 54 56 50 Q52 44 50 36 Z" fill={colors.accent} opacity="0.3" />
    {/* Tail fin rays */}
    <path d="M50 20 Q58 6 68 4" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.3" />
    <path d="M50 26 Q62 14 74 12" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.25" />
    <path d="M50 32 Q64 28 76 26" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.2" />
    <path d="M50 38 Q64 40 74 44" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.25" />
    <path d="M50 42 Q60 52 68 54" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.3" />
    {/* Dorsal fin */}
    <path d="M22 10 Q26 2 32 2 Q36 4 38 8 Q38 12 34 14 Q28 14 22 12 Z" fill={colors.fin} opacity="0.85" />
    {/* Anal fin — large */}
    <path d="M28 48 Q26 56 32 60 Q38 60 40 54 Q38 50 36 48 Z" fill={`url(#hmf-${id})`} opacity="0.75" />
    {/* Body */}
    <ellipse cx="28" cy="28" rx="20" ry="15" fill={`url(#hmb-${id})`} />
    {/* Body shimmer */}
    <path d="M14 24 Q28 21 42 24" stroke="white" strokeWidth="0.7" fill="none" opacity="0.1" />
    {/* Belly */}
    <ellipse cx="26" cy="34" rx="12" ry="5" fill="white" opacity="0.08" />
    {/* Pectoral fin */}
    <path d="M20 32 Q16 40 22 44 Q22 38 24 32 Z" fill={colors.fin} opacity="0.7" />
    {/* Ventral fins */}
    <path d="M24 42 Q22 50 20 58" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M28 42 Q26 50 25 56" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
    {/* Eye */}
    <circle cx="14" cy="25" r="4" fill="white" />
    <circle cx="13.5" cy="24.5" r="2.4" fill={colors.eye} />
    <circle cx="13" cy="24" r="1" fill="white" opacity="0.8" />
    {/* Gill plate */}
    <path d="M18 22 Q16 28 18 34" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.2" />
    {/* Mouth */}
    <path d="M9 26 Q7 25 9 24" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.5" />
  </svg>
))
HalfmoonBetta.displayName = 'HalfmoonBetta'

// Tier 5 — Plakat Betta: short compact fins, more muscular body
const PlacatBetta = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.68} viewBox="0 0 68 46">
    <defs>
      <radialGradient id={`plb-${id}`} cx="35%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`plf-${id}`} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Short compact tail — plakat signature */}
    <path d="M46 14 Q52 8 58 10 Q56 16 58 22 Q56 28 58 32 Q52 30 46 26 Z" fill={`url(#plf-${id})`} opacity="0.85" />
    {/* Dorsal fin — shorter, thicker */}
    <path d="M22 6 Q26 1 32 1 Q36 3 38 6 Q36 10 30 11 Q24 10 22 8 Z" fill={colors.fin} opacity="0.85" />
    {/* Short anal fin */}
    <path d="M28 36 Q26 42 32 44 Q36 42 36 38 Q34 36 32 36 Z" fill={colors.fin} opacity="0.75" />
    {/* Body — more muscular, thicker */}
    <ellipse cx="28" cy="22" rx="22" ry="15" fill={`url(#plb-${id})`} />
    {/* Body shimmer */}
    <path d="M12 18 Q28 15 44 18" stroke="white" strokeWidth="0.8" fill="none" opacity="0.12" />
    {/* Belly */}
    <ellipse cx="26" cy="28" rx="14" ry="5" fill="white" opacity="0.08" />
    {/* Pectoral fin — short */}
    <path d="M20 26 Q16 32 20 36 Q20 32 22 28 Z" fill={colors.fin} opacity="0.7" />
    {/* Short ventral fins — plakat feature */}
    <path d="M24 36 Q22 40 21 44" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />
    <path d="M28 36 Q26 40 26 42" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" />
    {/* Eye */}
    <circle cx="14" cy="19" r="4" fill="white" />
    <circle cx="13.5" cy="18.5" r="2.4" fill={colors.eye} />
    <circle cx="13" cy="18" r="1" fill="white" opacity="0.8" />
    {/* Gill plate */}
    <path d="M18 16 Q16 22 18 28" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.2" />
    {/* Mouth */}
    <path d="M7 20 Q5 19 7 18" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.5" />
  </svg>
))
PlacatBetta.displayName = 'PlacatBetta'

// Tier 5 — Galaxy Betta: same shape as base but with scattered dot pattern overlay
const GalaxyBetta = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.74} viewBox="0 0 76 56">
    <defs>
      <radialGradient id={`gxb-${id}`} cx="35%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`gxf-${id}`} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="50%" stopColor={colors.accent} stopOpacity="0.6" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.4" />
      </linearGradient>
    </defs>
    {/* Flowing veil tail (same as base betta) */}
    <path d="M46 16 Q54 4 64 6 Q62 14 66 20 Q64 26 66 34 Q62 40 60 44 Q54 42 46 34 Z" fill={`url(#gxf-${id})`} opacity="0.8" />
    <path d="M48 18 Q56 10 64 12 Q62 18 64 26 Q60 34 58 38 Q52 36 48 30 Z" fill={colors.accent} opacity="0.3" />
    {/* Dorsal fin */}
    <path d="M22 8 Q26 0 32 0 Q36 2 38 6 Q38 10 34 12 Q28 12 22 10 Z" fill={colors.fin} opacity="0.85" />
    {/* Anal fin */}
    <path d="M28 42 Q26 50 32 54 Q38 54 40 48 Q38 44 36 42 Z" fill={`url(#gxf-${id})`} opacity="0.75" />
    {/* Body */}
    <ellipse cx="28" cy="24" rx="20" ry="15" fill={`url(#gxb-${id})`} />
    {/* Galaxy dot pattern — scattered iridescent dots (galaxy betta signature) */}
    <circle cx="16" cy="18" r="0.8" fill="white" opacity="0.5" />
    <circle cx="22" cy="14" r="0.6" fill="white" opacity="0.45" />
    <circle cx="28" cy="16" r="0.7" fill="white" opacity="0.5" />
    <circle cx="34" cy="18" r="0.5" fill="white" opacity="0.4" />
    <circle cx="20" cy="22" r="0.6" fill="white" opacity="0.45" />
    <circle cx="26" cy="20" r="0.8" fill="white" opacity="0.5" />
    <circle cx="32" cy="22" r="0.6" fill="white" opacity="0.4" />
    <circle cx="38" cy="20" r="0.5" fill="white" opacity="0.35" />
    <circle cx="18" cy="26" r="0.7" fill="white" opacity="0.45" />
    <circle cx="24" cy="28" r="0.5" fill="white" opacity="0.4" />
    <circle cx="30" cy="26" r="0.7" fill="white" opacity="0.45" />
    <circle cx="36" cy="28" r="0.6" fill="white" opacity="0.35" />
    <circle cx="22" cy="32" r="0.5" fill="white" opacity="0.35" />
    <circle cx="28" cy="30" r="0.6" fill="white" opacity="0.4" />
    <circle cx="34" cy="32" r="0.5" fill="white" opacity="0.3" />
    {/* Dots on tail */}
    <circle cx="50" cy="20" r="0.5" fill="white" opacity="0.35" />
    <circle cx="56" cy="24" r="0.4" fill="white" opacity="0.3" />
    <circle cx="52" cy="30" r="0.5" fill="white" opacity="0.3" />
    {/* Body shimmer */}
    <path d="M14 20 Q28 17 42 20" stroke="white" strokeWidth="0.7" fill="none" opacity="0.1" />
    {/* Belly */}
    <ellipse cx="26" cy="30" rx="12" ry="5" fill="white" opacity="0.08" />
    {/* Pectoral fin */}
    <path d="M20 28 Q16 36 22 40 Q22 34 24 28 Z" fill={colors.fin} opacity="0.7" />
    {/* Ventral fins */}
    <path d="M24 38 Q22 46 20 52" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M28 38 Q26 46 25 50" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
    {/* Eye */}
    <circle cx="14" cy="21" r="4" fill="white" />
    <circle cx="13.5" cy="20.5" r="2.4" fill={colors.eye} />
    <circle cx="13" cy="20" r="1" fill="white" opacity="0.8" />
    {/* Gill plate */}
    <path d="M18 18 Q16 24 18 30" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.2" />
    {/* Mouth */}
    <path d="M9 22 Q7 21 9 20" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.5" />
  </svg>
))
GalaxyBetta.displayName = 'GalaxyBetta'

// Tier 5 — Dragon Betta: heavy thick-looking body, armored scale appearance
const DragonBetta = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.74} viewBox="0 0 78 58">
    <defs>
      <radialGradient id={`drb-${id}`} cx="35%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`drf-${id}`} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="50%" stopColor={colors.accent} stopOpacity="0.6" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.4" />
      </linearGradient>
    </defs>
    {/* Flowing tail */}
    <path d="M48 16 Q56 4 66 6 Q64 14 68 22 Q66 28 68 36 Q64 42 62 46 Q56 44 48 36 Z" fill={`url(#drf-${id})`} opacity="0.8" />
    {/* Dorsal fin */}
    <path d="M22 8 Q26 0 34 0 Q38 2 40 6 Q40 10 36 12 Q30 12 22 10 Z" fill={colors.fin} opacity="0.85" />
    {/* Anal fin — large */}
    <path d="M30 44 Q28 52 34 56 Q40 56 42 50 Q40 46 38 44 Z" fill={`url(#drf-${id})`} opacity="0.75" />
    {/* Body — thicker, heavier */}
    <ellipse cx="30" cy="26" rx="22" ry="17" fill={`url(#drb-${id})`} />
    {/* Armored dragon scale pattern — dragon betta signature */}
    <path d="M12 18 Q18 16 24 18 Q22 22 16 22 Q12 20 12 18 Z" fill="white" opacity="0.12" />
    <path d="M22 16 Q28 14 34 16 Q32 20 26 20 Q22 18 22 16 Z" fill="white" opacity="0.1" />
    <path d="M32 16 Q38 14 44 16 Q42 20 36 20 Q32 18 32 16 Z" fill="white" opacity="0.1" />
    <path d="M14 22 Q20 20 26 22 Q24 26 18 26 Q14 24 14 22 Z" fill="white" opacity="0.1" />
    <path d="M24 20 Q30 18 36 20 Q34 24 28 24 Q24 22 24 20 Z" fill="white" opacity="0.08" />
    <path d="M34 20 Q40 18 46 20 Q44 24 38 24 Q34 22 34 20 Z" fill="white" opacity="0.08" />
    <path d="M16 26 Q22 24 28 26 Q26 30 20 30 Q16 28 16 26 Z" fill="white" opacity="0.08" />
    <path d="M26 24 Q32 22 38 24 Q36 28 30 28 Q26 26 26 24 Z" fill="white" opacity="0.07" />
    <path d="M36 24 Q42 22 48 24 Q46 28 40 28 Q36 26 36 24 Z" fill="white" opacity="0.07" />
    {/* Body shimmer */}
    <path d="M14 22 Q30 18 46 22" stroke="white" strokeWidth="0.8" fill="none" opacity="0.1" />
    {/* Belly */}
    <ellipse cx="28" cy="34" rx="14" ry="5.5" fill="white" opacity="0.08" />
    {/* Pectoral fin */}
    <path d="M20 30 Q16 38 22 42 Q22 36 24 30 Z" fill={colors.fin} opacity="0.7" />
    {/* Ventral fins */}
    <path d="M26 40 Q24 48 22 54" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M30 40 Q28 48 27 52" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
    {/* Eye */}
    <circle cx="14" cy="23" r="4" fill="white" />
    <circle cx="13.5" cy="22.5" r="2.4" fill={colors.eye} />
    <circle cx="13" cy="22" r="1" fill="white" opacity="0.8" />
    {/* Gill plate — more prominent */}
    <path d="M18 20 Q16 26 18 32" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.25" />
    {/* Mouth */}
    <path d="M9 24 Q7 23 9 22" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.5" />
  </svg>
))
DragonBetta.displayName = 'DragonBetta'

// ─── FOURTH SKINS PER TIER (new species) ─────────────────────────────────────

// Tier 0 fourth — Platy: compact rounded body with fan tail
const PlatyFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 54 38">
    <defs>
      <radialGradient id={`ply-b-${id}`} cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`ply-f-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} />
      </linearGradient>
    </defs>
    {/* Fan tail */}
    <path d="M38 10 Q44 4 50 8 Q47 15 50 22 Q44 26 38 24 Z" fill={`url(#ply-f-${id})`} />
    {/* Tail rays */}
    <path d="M40 12 Q45 6 48 8" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.4" />
    <path d="M40 18 Q46 18 48 20" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.35" />
    {/* Body — compact, rounded */}
    <ellipse cx="22" cy="18" rx="18" ry="13" fill={`url(#ply-b-${id})`} />
    {/* Belly highlight */}
    <ellipse cx="20" cy="22" rx="11" ry="5" fill="white" opacity="0.1" />
    {/* Dorsal fin — rounded */}
    <path d="M16 5 Q22 1 27 5 Q24 8 16 7 Z" fill={colors.fin} />
    {/* Pectoral fin */}
    <path d="M16 21 Q13 27 19 29 Q17 24 19 21 Z" fill={colors.fin} opacity="0.8" />
    {/* Anal fin */}
    <path d="M26 31 Q28 35 31 33 Q30 30 29 29 Z" fill={colors.fin} opacity="0.8" />
    {/* Eye */}
    <circle cx="11" cy="15" r="3.5" fill="white" />
    <circle cx="10.4" cy="14.5" r="2" fill={colors.eye} />
    <circle cx="9.8" cy="13.9" r="0.8" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M6 18 Q4 17.5 6 17" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
))
PlatyFish.displayName = "PlatyFish"

// Tier 0 fifth — Danio: sleek torpedo body with horizontal stripes
const DanioFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.59} viewBox="0 0 58 34">
    <defs>
      <radialGradient id={`dan-b-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.6" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
    </defs>
    {/* Forked tail */}
    <path d="M44 9 Q50 4 54 6 Q51 11 54 14 Q51 13 44 16 Z" fill={colors.fin} opacity="0.8" />
    <path d="M44 20 Q50 24 54 22 Q51 18 44 16 Z" fill={colors.fin} opacity="0.7" />
    {/* Body — sleek torpedo */}
    <path d="M6 17 Q6 8 18 7 Q34 6 44 12 Q48 15 48 17 Q48 19 44 22 Q34 28 18 27 Q6 26 6 17 Z" fill={`url(#dan-b-${id})`} />
    {/* Horizontal stripes — danio signature */}
    <path d="M10 14 Q28 13 42 14" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M10 17 Q28 16 42 17" stroke={colors.fin} strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
    <path d="M10 20 Q28 19 42 20" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.4" strokeLinecap="round" />
    {/* Belly highlight */}
    <ellipse cx="24" cy="22" rx="12" ry="4" fill="white" opacity="0.1" />
    {/* Dorsal fin */}
    <path d="M22 7 Q26 3 30 6 Q27 8 22 8 Z" fill={colors.fin} opacity="0.8" />
    {/* Anal fin */}
    <path d="M28 26 Q31 30 34 28 Q32 25 31 24 Z" fill={colors.fin} opacity="0.7" />
    {/* Pectoral fin */}
    <path d="M16 20 Q14 25 18 26 Q17 22 18 20 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye */}
    <circle cx="11" cy="15" r="3.2" fill="white" />
    <circle cx="10.5" cy="14.5" r="1.8" fill={colors.eye} />
    <circle cx="10" cy="14" r="0.7" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M6 18 Q4.5 17.5 6 17" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
))
DanioFish.displayName = "DanioFish"

// Tier 0 sixth — Minnow: slim, small, basic fish shape
const MinnowFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.62} viewBox="0 0 52 32">
    <defs>
      <radialGradient id={`min-b-${id}`} cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.7" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
    </defs>
    {/* Simple forked tail */}
    <path d="M40 9 Q46 5 50 7 Q47 11 50 14 Q47 13 40 16 Z" fill={colors.fin} opacity="0.8" />
    <path d="M40 20 Q46 23 50 21 Q47 17 40 16 Z" fill={colors.fin} opacity="0.7" />
    {/* Body — slim, simple */}
    <path d="M5 16 Q5 8 16 7 Q30 6 40 11 Q44 13 44 16 Q44 19 40 21 Q30 26 16 25 Q5 24 5 16 Z" fill={`url(#min-b-${id})`} />
    {/* Lateral line */}
    <path d="M10 15 Q26 14 38 15" stroke="white" strokeWidth="0.6" fill="none" opacity="0.2" />
    {/* Belly highlight */}
    <ellipse cx="22" cy="20" rx="10" ry="3.5" fill="white" opacity="0.1" />
    {/* Small dorsal fin */}
    <path d="M20 7 Q24 3 27 6 Q24 8 20 7 Z" fill={colors.fin} opacity="0.75" />
    {/* Small anal fin */}
    <path d="M26 24 Q28 28 31 26 Q29 23 28 22 Z" fill={colors.fin} opacity="0.7" />
    {/* Pectoral fin */}
    <path d="M14 18 Q12 22 16 23 Q15 20 16 18 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye */}
    <circle cx="10" cy="14" r="3" fill="white" />
    <circle cx="9.5" cy="13.5" r="1.7" fill={colors.eye} />
    <circle cx="9" cy="13" r="0.7" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M5 17 Q3.5 16.5 5 16" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
))
MinnowFish.displayName = "MinnowFish"

// ─── NEW TIER SPECIES WITH UNIQUE BODY DESIGNS ──────────────────────────────

// Tier 0 — Rasbora: small schooling fish with pronounced lateral stripe, torpedo shape
const RasboraFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.58} viewBox="0 0 52 30">
    <defs>
      <radialGradient id={`ras-b-${id}`} cx="38%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.7" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
    </defs>
    {/* Forked tail */}
    <path d="M38 8 Q44 3 48 6 Q45 10 48 14 Q45 13 38 15 Z" fill={colors.fin} opacity="0.85" />
    <path d="M38 18 Q44 22 48 20 Q45 16 38 15 Z" fill={colors.fin} opacity="0.75" />
    {/* Body — slim torpedo */}
    <path d="M5 15 Q5 7 14 6 Q28 5 38 10 Q42 13 42 15 Q42 17 38 20 Q28 25 14 24 Q5 23 5 15 Z" fill={`url(#ras-b-${id})`} />
    {/* Bold lateral stripe — rasbora signature */}
    <path d="M10 14 Q24 13.5 36 14.5" stroke={colors.fin} strokeWidth="2.2" fill="none" opacity="0.7" strokeLinecap="round" />
    {/* Thin accent stripe above */}
    <path d="M12 12 Q24 11.5 34 12.5" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.35" strokeLinecap="round" />
    {/* Belly highlight */}
    <ellipse cx="20" cy="19" rx="10" ry="3.5" fill="white" opacity="0.1" />
    {/* Dorsal fin */}
    <path d="M20 6 Q24 2 27 5 Q24 7 20 7 Z" fill={colors.fin} opacity="0.8" />
    {/* Anal fin */}
    <path d="M26 23 Q28 27 31 25 Q29 22 28 21 Z" fill={colors.fin} opacity="0.7" />
    {/* Pectoral fin */}
    <path d="M14 17 Q12 22 16 23 Q15 19 16 17 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye */}
    <circle cx="9" cy="13" r="3" fill="white" />
    <circle cx="8.5" cy="12.5" r="1.7" fill={colors.eye} />
    <circle cx="8" cy="12" r="0.7" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M5 15.5 Q3.5 15 5 14.5" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
))
RasboraFish.displayName = "RasboraFish"

// Tier 1 — Corydoras: armored catfish with flat belly, barbels, rounded head
const CorydorasFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.72} viewBox="0 0 58 42">
    <defs>
      <radialGradient id={`cor-b-${id}`} cx="45%" cy="35%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.6" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`cor-a-${id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.6" />
      </linearGradient>
    </defs>
    {/* Tail — rounded, small */}
    <path d="M42 16 Q48 12 52 15 Q50 20 52 26 Q48 28 42 24 Z" fill={colors.fin} opacity="0.8" />
    {/* Body — flat-bottomed, deep, armored look */}
    <path d="M8 20 Q8 10 16 8 Q28 6 40 12 Q44 16 44 20 Q44 28 40 30 Q28 34 16 33 Q8 32 8 28 Z" fill={`url(#cor-b-${id})`} />
    {/* Flat belly */}
    <path d="M12 30 Q24 34 38 30" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.3" />
    {/* Armored plate lines — cory signature */}
    <path d="M14 14 Q28 12 38 16" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.25" />
    <path d="M12 18 Q26 16 40 18" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.2" />
    <path d="M12 22 Q26 20 40 22" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.2" />
    <path d="M14 26 Q26 24 38 26" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.15" />
    {/* Belly highlight */}
    <ellipse cx="24" cy="28" rx="12" ry="4" fill="white" opacity="0.08" />
    {/* Tall dorsal spine — cory signature */}
    <path d="M22 8 Q24 1 28 3 Q28 7 26 9 Z" fill={colors.fin} opacity="0.9" />
    <path d="M24 7 Q25 2 27 4" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.4" />
    {/* Adipose fin (small) */}
    <path d="M34 10 Q36 7 38 10 Q36 11 34 11 Z" fill={colors.fin} opacity="0.6" />
    {/* Pectoral fin — horizontal, wide (cory spreads these) */}
    <path d="M16 24 Q10 32 20 36 Q18 30 20 24 Z" fill={colors.fin} opacity="0.7" />
    {/* Anal fin */}
    <path d="M30 32 Q32 37 35 34 Q34 31 33 30 Z" fill={colors.fin} opacity="0.7" />
    {/* Barbels — catfish whiskers! */}
    <path d="M8 22 Q3 24 1 28" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.6" />
    <path d="M8 24 Q4 26 2 30" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
    <circle cx="1" cy="28" r="0.6" fill={colors.fin} opacity="0.5" />
    <circle cx="2" cy="30" r="0.5" fill={colors.fin} opacity="0.4" />
    {/* Eye — smaller, higher up */}
    <circle cx="12" cy="16" r="2.8" fill="white" />
    <circle cx="11.5" cy="15.5" r="1.6" fill={colors.eye} />
    <circle cx="11" cy="15" r="0.6" fill="white" opacity="0.8" />
    {/* Mouth — downward facing */}
    <path d="M8 24 Q6 23 8 22" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
))
CorydorasFish.displayName = "CorydorasFish"

// Tier 2 — Discus: nearly perfectly circular disc-shaped body
const DiscusFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 1.0} viewBox="0 0 65 65">
    <defs>
      <radialGradient id={`disc-b-${id}`} cx="45%" cy="45%" r="50%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.8" />
        <stop offset="40%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.6" />
      </radialGradient>
      <linearGradient id={`disc-f-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.7" />
      </linearGradient>
      <radialGradient id={`disc-s-${id}`} cx="35%" cy="35%" r="45%">
        <stop offset="0%" stopColor="white" stopOpacity="0.1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Small tail */}
    <path d="M50 26 Q56 22 58 26 Q56 32 58 38 Q54 36 50 36 Z" fill={colors.fin} opacity="0.8" />
    {/* Body — perfect circle! Discus signature */}
    <circle cx="30" cy="32" r="24" fill={`url(#disc-b-${id})`} />
    {/* Vertical bar pattern — discus signature */}
    <path d="M18 16 Q18 32 20 48" stroke={colors.fin} strokeWidth="1.2" fill="none" opacity="0.15" />
    <path d="M24 12 Q24 32 25 52" stroke={colors.fin} strokeWidth="1" fill="none" opacity="0.12" />
    <path d="M30 10 Q30 32 30 54" stroke={colors.fin} strokeWidth="1" fill="none" opacity="0.12" />
    <path d="M36 12 Q36 32 35 52" stroke={colors.fin} strokeWidth="1" fill="none" opacity="0.12" />
    <path d="M42 16 Q42 32 40 48" stroke={colors.fin} strokeWidth="1.2" fill="none" opacity="0.15" />
    {/* Shimmer overlay */}
    <circle cx="30" cy="32" r="22" fill={`url(#disc-s-${id})`} />
    {/* Eye stripe — horizontal through eye */}
    <path d="M6 30 Q14 28 20 30" stroke={colors.fin} strokeWidth="2.5" fill="none" opacity="0.5" />
    {/* Tall dorsal fin — extends along entire top */}
    <path d="M16 10 Q20 4 30 2 Q40 4 44 10" stroke={colors.fin} strokeWidth="0.6" fill={`url(#disc-f-${id})`} opacity="0.7" />
    {/* Tall anal fin — extends along entire bottom */}
    <path d="M16 54 Q20 60 30 62 Q40 60 44 54" stroke={colors.fin} strokeWidth="0.6" fill={`url(#disc-f-${id})`} opacity="0.7" />
    {/* Small pectoral fin */}
    <path d="M18 36 Q14 42 20 44 Q19 40 20 36 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye — red/orange is classic discus */}
    <circle cx="14" cy="30" r="4" fill="white" />
    <circle cx="13.5" cy="29.5" r="2.5" fill={colors.eye} />
    <circle cx="13" cy="29" r="1.5" fill="#111" />
    <circle cx="12.2" cy="28.2" r="0.8" fill="white" opacity="0.8" />
    {/* Mouth — small */}
    <path d="M7 33 Q5 32.5 7 32" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
DiscusFish.displayName = "DiscusFish"

// Tier 3 — Butterflyfish: tall compressed body, long pointed snout, eyespot
const ButterflyfishFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.85} viewBox="0 0 68 58">
    <defs>
      <radialGradient id={`bf-b-${id}`} cx="45%" cy="45%" r="50%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.8" />
        <stop offset="50%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.5" />
      </radialGradient>
      <linearGradient id={`bf-f-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} />
      </linearGradient>
    </defs>
    {/* Tail */}
    <path d="M52 22 Q58 18 62 22 Q60 28 62 34 Q58 36 52 32 Z" fill={colors.fin} opacity="0.8" />
    {/* Body — tall, laterally compressed disc */}
    <ellipse cx="34" cy="29" rx="20" ry="22" fill={`url(#bf-b-${id})`} />
    {/* Diagonal stripe pattern — butterflyfish signature */}
    <path d="M22 14 Q34 22 46 14" stroke={colors.fin} strokeWidth="1.8" fill="none" opacity="0.3" />
    <path d="M20 20 Q34 28 48 20" stroke={colors.fin} strokeWidth="1.5" fill="none" opacity="0.25" />
    <path d="M20 26 Q34 34 48 26" stroke={colors.fin} strokeWidth="1.5" fill="none" opacity="0.25" />
    <path d="M22 32 Q34 40 46 32" stroke={colors.fin} strokeWidth="1.8" fill="none" opacity="0.3" />
    {/* Long pointed snout — butterflyfish signature */}
    <path d="M14 27 Q8 26 4 25 Q8 24 14 24" fill={colors.body} stroke={colors.fin} strokeWidth="0.5" opacity="0.8" />
    {/* Eyespot on rear body — butterflyfish signature */}
    <circle cx="44" cy="20" r="4" fill={colors.fin} opacity="0.5" />
    <circle cx="44" cy="20" r="2.5" fill="#111" opacity="0.6" />
    <circle cx="44" cy="20" r="1.2" fill="white" opacity="0.3" />
    {/* Dorsal fin — pointed */}
    <path d="M26 8 Q32 2 40 4 Q42 7 40 10 Q34 9 26 9 Z" fill={`url(#bf-f-${id})`} opacity="0.85" />
    {/* Anal fin — pointed */}
    <path d="M26 50 Q32 56 40 54 Q42 51 40 48 Q34 49 26 49 Z" fill={`url(#bf-f-${id})`} opacity="0.85" />
    {/* Pectoral fin */}
    <path d="M22 32 Q18 38 24 40 Q23 36 24 32 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye — with dark stripe through it */}
    <path d="M16 18 Q16 26 16 34" stroke={colors.fin} strokeWidth="3" fill="none" opacity="0.6" />
    <circle cx="16" cy="26" r="3.5" fill="white" />
    <circle cx="15.5" cy="25.5" r="2.2" fill={colors.eye} />
    <circle cx="15" cy="25" r="1.2" fill="#111" />
    <circle cx="14.5" cy="24.5" r="0.6" fill="white" opacity="0.8" />
    {/* Mouth at end of snout */}
    <path d="M4 25.5 Q2.5 25 4 24.5" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
))
ButterflyfishFish.displayName = "ButterflyfishFish"

// Tier 4 — Moorish Idol: iconic tall body with extremely long trailing dorsal filament
const MoorishIdolFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 1.06} viewBox="0 0 80 85">
    <defs>
      <radialGradient id={`mi-b-${id}`} cx="45%" cy="50%" r="50%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.8" />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.5" />
      </radialGradient>
      <linearGradient id={`mi-f-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.6" />
      </linearGradient>
    </defs>
    {/* Tail */}
    <path d="M58 36 Q64 32 68 36 Q66 42 68 48 Q64 50 58 46 Z" fill={colors.fin} opacity="0.85" />
    {/* Body — tall, compressed, triangular profile */}
    <path d="M20 40 Q14 28 20 16 Q28 8 40 10 Q52 14 56 28 Q58 40 56 52 Q52 66 40 70 Q28 72 20 64 Q14 52 20 40 Z" fill={`url(#mi-b-${id})`} />
    {/* Bold vertical bands — moorish idol signature */}
    <path d="M28 14 Q26 40 28 66" stroke={colors.fin} strokeWidth="5" fill="none" opacity="0.5" />
    <path d="M42 12 Q44 40 42 68" stroke={colors.fin} strokeWidth="5" fill="none" opacity="0.5" />
    {/* White band between dark bands */}
    <path d="M34 12 Q34 40 34 68" stroke="white" strokeWidth="3" fill="none" opacity="0.15" />
    {/* Extremely long trailing dorsal filament — THE signature feature! */}
    <path d="M30 10 Q28 4 24 2 Q18 0 10 2 Q6 4 4 6" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.8" />
    <path d="M30 10 Q26 4 20 2 Q14 1 8 3" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.4" />
    {/* Dorsal fin base */}
    <path d="M28 10 Q34 6 42 10" fill={`url(#mi-f-${id})`} opacity="0.8" />
    {/* Pointed snout — moorish idol has elongated snout */}
    <path d="M18 38 Q12 36 8 35 Q12 34 18 33" fill={colors.body} stroke={colors.fin} strokeWidth="0.5" opacity="0.8" />
    {/* Anal fin — pointed */}
    <path d="M30 70 Q34 78 42 76 Q44 72 42 68 Q36 70 30 70 Z" fill={`url(#mi-f-${id})`} opacity="0.8" />
    {/* Pectoral fin */}
    <path d="M24 44 Q20 50 26 52 Q25 48 26 44 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye */}
    <circle cx="20" cy="36" r="3.5" fill="white" />
    <circle cx="19.5" cy="35.5" r="2.2" fill={colors.eye} />
    <circle cx="19" cy="35" r="1.2" fill="#111" />
    <circle cx="18.5" cy="34.5" r="0.6" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M8 35.5 Q6 35 8 34.5" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
))
MoorishIdolFish.displayName = "MoorishIdolFish"

// Tier 5 — Mandarin Dragonet: psychedelic, wide flat head, fan pelvic fins
const MandarinFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.69} viewBox="0 0 72 50">
    <defs>
      <radialGradient id={`man-b-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.9" />
        <stop offset="50%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.7" />
      </radialGradient>
      <linearGradient id={`man-f-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="50%" stopColor={colors.accent} stopOpacity="0.7" />
        <stop offset="100%" stopColor={colors.fin} />
      </linearGradient>
      <radialGradient id={`man-s-${id}`} cx="35%" cy="35%" r="40%">
        <stop offset="0%" stopColor="white" stopOpacity="0.1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Rounded tail */}
    <path d="M54 16 Q60 12 64 16 Q62 22 64 28 Q60 30 56 28 Q55 22 54 20 Z" fill={`url(#man-f-${id})`} opacity="0.85" />
    {/* Body — rounded, wider head tapering to tail */}
    <path d="M8 24 Q6 14 14 10 Q24 6 36 8 Q48 10 54 16 Q58 22 54 28 Q48 34 36 36 Q24 38 14 34 Q6 30 8 24 Z" fill={`url(#man-b-${id})`} />
    {/* Psychedelic swirl patterns — mandarin signature */}
    <path d="M16 16 Q22 12 28 16 Q34 20 28 24 Q22 20 16 24" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.35" />
    <path d="M30 14 Q36 10 42 14 Q48 18 42 22 Q36 18 30 22" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.3" />
    <path d="M20 22 Q26 18 32 22 Q38 26 32 30 Q26 26 20 30" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.25" />
    {/* Shimmer */}
    <ellipse cx="28" cy="22" rx="18" ry="10" fill={`url(#man-s-${id})`} />
    {/* First dorsal fin — tall spike (mandarin signature) */}
    <path d="M22 8 Q24 1 28 2 Q28 6 26 8 Z" fill={colors.fin} opacity="0.9" />
    {/* Second dorsal fin — longer, lower */}
    <path d="M32 8 Q38 3 46 6 Q44 9 36 10 Q32 10 32 8 Z" fill={`url(#man-f-${id})`} opacity="0.8" />
    {/* Large fan pelvic fins — mandarin signature */}
    <path d="M18 30 Q12 38 18 42 Q22 44 24 40 Q20 36 22 30 Z" fill={`url(#man-f-${id})`} opacity="0.75" />
    <path d="M24 32 Q20 40 26 44 Q30 44 30 40 Q28 36 28 32 Z" fill={colors.accent} opacity="0.5" />
    {/* Anal fin */}
    <path d="M36 34 Q38 40 42 38 Q40 35 40 33 Z" fill={colors.fin} opacity="0.7" />
    {/* Pectoral fin — wide, fan-like */}
    <path d="M16 24 Q10 30 16 34 Q16 30 18 26 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye — large, prominent */}
    <circle cx="12" cy="20" r="4" fill="white" />
    <circle cx="11.5" cy="19.5" r="2.5" fill={colors.eye} />
    <circle cx="11" cy="19" r="1.5" fill="#111" />
    <circle cx="10.5" cy="18.5" r="0.8" fill="white" opacity="0.8" />
    {/* Mouth — small, downward */}
    <path d="M8 26 Q6 25.5 8 25" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
))
MandarinFish.displayName = "MandarinFish"

// ─── STANDALONE DELUXE SPECIES ──────────────────────────────────────────────
// These are premium unlocks with radically unique body shapes

// Seahorse — vertical body, curled tail, horse-like head, segmented armor
const SeahorseFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 1.75} viewBox="0 0 40 70">
    <defs>
      <linearGradient id={`sh-b-${id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.8" />
        <stop offset="50%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.7" />
      </linearGradient>
      <linearGradient id={`sh-f-${id}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.6" />
      </linearGradient>
    </defs>
    {/* Crown/coronet — seahorse signature */}
    <path d="M16 6 Q14 2 18 1 Q22 2 20 6" fill={colors.fin} opacity="0.8" />
    {/* Head — horse-like, facing left */}
    <path d="M8 16 Q4 14 4 10 Q6 6 14 6 Q20 6 22 10 Q22 16 18 18 Z" fill={`url(#sh-b-${id})`} />
    {/* Snout — long, tubular */}
    <path d="M4 12 Q0 11.5 -2 11 Q0 10.5 4 10" fill={colors.body} stroke={colors.fin} strokeWidth="0.4" opacity="0.9" />
    {/* Body — vertical, S-curved, segmented */}
    <path d="M14 18 Q22 20 24 28 Q24 36 20 42 Q16 48 18 54 Q20 58 16 62" fill={`url(#sh-b-${id})`} stroke={colors.fin} strokeWidth="0.3" opacity="0.9" />
    {/* Segment rings — seahorse signature */}
    <path d="M14 20 Q20 19 22 22" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.3" />
    <path d="M16 24 Q22 23 24 26" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.3" />
    <path d="M18 28 Q24 27 24 30" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.3" />
    <path d="M18 32 Q24 31 24 34" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.25" />
    <path d="M18 36 Q22 35 22 38" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.25" />
    <path d="M16 40 Q20 39 20 42" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.2" />
    <path d="M16 44 Q20 43 20 46" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.2" />
    <path d="M18 48 Q20 47 20 50" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.2" />
    {/* Curled prehensile tail — seahorse signature */}
    <path d="M16 62 Q12 66 14 68 Q18 68 20 64 Q22 60 20 58" stroke={colors.body} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
    <path d="M16 62 Q12 66 14 68 Q18 68 20 64 Q22 60 20 58" stroke={colors.fin} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />
    {/* Dorsal fin — tiny, on back */}
    <path d="M22 28 Q28 26 28 30 Q28 34 22 32 Z" fill={`url(#sh-f-${id})`} opacity="0.7" />
    {/* Dorsal fin rays */}
    <path d="M23 28 Q27 27 27 29" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.4" />
    <path d="M23 30 Q27 30 27 32" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.4" />
    {/* Pectoral fin — small, behind head */}
    <path d="M20 18 Q24 16 26 20 Q24 20 20 20 Z" fill={colors.fin} opacity="0.6" />
    {/* Belly pouch hint */}
    <ellipse cx="18" cy="36" rx="3" ry="6" fill="white" opacity="0.06" />
    {/* Eye */}
    <circle cx="10" cy="10" r="2.8" fill="white" />
    <circle cx="9.5" cy="9.5" r="1.6" fill={colors.eye} />
    <circle cx="9" cy="9" r="0.7" fill="white" opacity="0.8" />
    {/* Mouth at end of snout */}
    <circle cx="-1" cy="11" r="0.4" fill={colors.fin} opacity="0.5" />
  </svg>
))
SeahorseFish.displayName = "SeahorseFish"

// Shrimp — curved C-shaped body, walking legs, long antennae, fan tail
const ShrimpFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.62} viewBox="0 0 65 40">
    <defs>
      <linearGradient id={`shr-b-${id}`} x1="0" y1="0" x2="1" y2="0.5">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.7" />
        <stop offset="50%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id={`shr-s-${id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} />
      </linearGradient>
    </defs>
    {/* Long antennae — shrimp signature */}
    <path d="M10 14 Q4 10 0 6" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.6" />
    <path d="M10 12 Q6 6 2 2" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.5" />
    <circle cx="0" cy="6" r="0.5" fill={colors.accent} opacity="0.5" />
    <circle cx="2" cy="2" r="0.4" fill={colors.accent} opacity="0.4" />
    {/* Rostrum (pointed head spike) */}
    <path d="M10 14 Q4 13 2 12" stroke={colors.fin} strokeWidth="1" fill="none" opacity="0.7" />
    {/* Body — curved, segmented C-shape */}
    <path d="M10 14 Q16 8 26 8 Q36 8 42 12 Q48 18 52 24 Q54 28 52 30 Z" fill={`url(#shr-b-${id})`} />
    {/* Carapace (head section) — larger, rounded */}
    <path d="M10 14 Q8 10 12 8 Q18 6 24 8 Q16 8 10 14 Z" fill={colors.body} opacity="0.4" />
    {/* Body segments — shrimp signature */}
    <path d="M26 8 Q26 16 26 20" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.25" />
    <path d="M30 8 Q31 16 32 22" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.25" />
    <path d="M34 9 Q36 17 38 24" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.25" />
    <path d="M38 10 Q40 18 44 26" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.25" />
    <path d="M42 12 Q44 20 48 28" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.2" />
    <path d="M46 16 Q48 22 50 28" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.2" />
    {/* Fan tail — uropod */}
    <path d="M52 28 Q56 24 60 26 Q58 30 60 34 Q56 36 52 32 Z" fill={colors.fin} opacity="0.7" />
    <path d="M52 30 Q56 28 58 30" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.4" />
    <path d="M52 32 Q56 34 58 32" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.4" />
    {/* Walking legs — swimmerets */}
    <path d="M18 16 Q16 22 14 26" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.4" />
    <path d="M22 16 Q20 22 18 28" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.4" />
    <path d="M26 16 Q26 24 24 30" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.35" />
    <path d="M30 16 Q32 24 30 30" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.35" />
    <path d="M34 18 Q36 26 34 32" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.3" />
    <path d="M38 20 Q40 28 38 34" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.3" />
    {/* Belly highlight */}
    <path d="M14 14 Q30 12 46 20" stroke="white" strokeWidth="0.8" fill="none" opacity="0.1" />
    {/* Eye — on stalk */}
    <circle cx="12" cy="10" r="2.2" fill="white" />
    <circle cx="11.7" cy="9.7" r="1.3" fill={colors.eye} />
    <circle cx="11.3" cy="9.3" r="0.5" fill="white" opacity="0.8" />
  </svg>
))
ShrimpFish.displayName = "ShrimpFish"

// Pufferfish — almost perfectly round inflated body, tiny fins, spiky hints
const PufferfishFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.92} viewBox="0 0 60 55">
    <defs>
      <radialGradient id={`puf-b-${id}`} cx="45%" cy="45%" r="50%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.8" />
        <stop offset="40%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.5" />
      </radialGradient>
      <radialGradient id={`puf-s-${id}`} cx="35%" cy="30%" r="40%">
        <stop offset="0%" stopColor="white" stopOpacity="0.12" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Tiny tail */}
    <path d="M48 22 Q52 19 54 22 Q53 27 54 32 Q52 34 48 30 Z" fill={colors.fin} opacity="0.7" />
    {/* Body — big round inflated sphere! Pufferfish signature */}
    <ellipse cx="28" cy="27" rx="22" ry="22" fill={`url(#puf-b-${id})`} />
    {/* Speckle pattern — pufferfish signature */}
    <circle cx="18" cy="18" r="1" fill={colors.fin} opacity="0.2" />
    <circle cx="24" cy="14" r="0.8" fill={colors.fin} opacity="0.2" />
    <circle cx="32" cy="16" r="1" fill={colors.fin} opacity="0.2" />
    <circle cx="38" cy="20" r="0.9" fill={colors.fin} opacity="0.2" />
    <circle cx="40" cy="28" r="1" fill={colors.fin} opacity="0.2" />
    <circle cx="38" cy="36" r="0.8" fill={colors.fin} opacity="0.2" />
    <circle cx="32" cy="40" r="1" fill={colors.fin} opacity="0.2" />
    <circle cx="24" cy="42" r="0.9" fill={colors.fin} opacity="0.2" />
    <circle cx="16" cy="38" r="0.8" fill={colors.fin} opacity="0.2" />
    <circle cx="14" cy="28" r="1" fill={colors.fin} opacity="0.2" />
    <circle cx="20" cy="32" r="0.7" fill={colors.fin} opacity="0.15" />
    <circle cx="30" cy="30" r="0.8" fill={colors.fin} opacity="0.15" />
    <circle cx="28" cy="22" r="0.7" fill={colors.fin} opacity="0.15" />
    {/* Shimmer */}
    <ellipse cx="24" cy="24" rx="14" ry="14" fill={`url(#puf-s-${id})`} />
    {/* White belly */}
    <ellipse cx="26" cy="36" rx="14" ry="10" fill="white" opacity="0.08" />
    {/* Tiny dorsal fin */}
    <path d="M30 6 Q34 3 36 6 Q34 8 30 8 Z" fill={colors.fin} opacity="0.7" />
    {/* Tiny pectoral fin — puffers paddle with these */}
    <path d="M14 28 Q10 32 14 34 Q14 32 16 30 Z" fill={colors.fin} opacity="0.6" />
    {/* Tiny anal fin */}
    <path d="M30 48 Q34 50 36 48 Q34 46 32 46 Z" fill={colors.fin} opacity="0.6" />
    {/* Big expressive eyes — pufferfish signature */}
    <circle cx="14" cy="22" r="5" fill="white" />
    <circle cx="14" cy="22" r="5" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.3" />
    <circle cx="13" cy="21" r="3.2" fill={colors.eye} />
    <circle cx="12.5" cy="20.5" r="2" fill="#111" />
    <circle cx="11.8" cy="19.8" r="1" fill="white" opacity="0.85" />
    <circle cx="14.5" cy="22.5" r="0.5" fill="white" opacity="0.4" />
    {/* Beak mouth — pufferfish signature */}
    <path d="M8 28 Q6 27.5 6 27 Q6 26.5 8 26" stroke={colors.fin} strokeWidth="1" fill={colors.body} opacity="0.7" />
  </svg>
))
PufferfishFish.displayName = "PufferfishFish"

// Jellyfish — bell/dome body, trailing tentacles
const JellyfishFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 50 75">
    <defs>
      <radialGradient id={`jf-b-${id}`} cx="50%" cy="35%" r="50%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.6" />
        <stop offset="50%" stopColor={colors.body} stopOpacity="0.5" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.3" />
      </radialGradient>
      <radialGradient id={`jf-s-${id}`} cx="40%" cy="30%" r="40%">
        <stop offset="0%" stopColor="white" stopOpacity="0.2" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Bell/dome body — jellyfish signature */}
    <path d="M5 28 Q5 6 25 4 Q45 6 45 28 Q45 32 40 32 Q35 30 30 32 Q25 34 20 32 Q15 30 10 32 Q5 32 5 28 Z" fill={`url(#jf-b-${id})`} />
    {/* Bell inner structure */}
    <path d="M10 26 Q10 10 25 8 Q40 10 40 26" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.2" />
    {/* Shimmer on bell */}
    <ellipse cx="22" cy="16" rx="10" ry="8" fill={`url(#jf-s-${id})`} />
    {/* Radial lines inside bell */}
    <path d="M25 8 Q25 18 25 28" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.15" />
    <path d="M18 10 Q17 18 16 28" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.12" />
    <path d="M32 10 Q33 18 34 28" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.12" />
    {/* Oral arms — thick, wavy inner tentacles */}
    <path d="M18 32 Q16 40 20 48 Q18 52 20 58 Q18 62 20 66" stroke={colors.body} strokeWidth="1.8" fill="none" opacity="0.4" strokeLinecap="round" />
    <path d="M25 34 Q23 42 26 50 Q24 54 26 60 Q24 64 26 70" stroke={colors.body} strokeWidth="1.8" fill="none" opacity="0.4" strokeLinecap="round" />
    <path d="M32 32 Q34 40 30 48 Q32 52 30 58 Q32 62 30 66" stroke={colors.body} strokeWidth="1.8" fill="none" opacity="0.4" strokeLinecap="round" />
    {/* Trailing tentacles — thin, long, flowing */}
    <path d="M12 32 Q8 40 12 48 Q8 56 12 64 Q8 70 10 74" stroke={colors.accent} strokeWidth="0.7" fill="none" opacity="0.35" />
    <path d="M15 32 Q13 42 16 52 Q13 60 15 68 Q12 72 14 75" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.3" />
    <path d="M35 32 Q37 42 34 52 Q37 60 35 68 Q38 72 36 75" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.3" />
    <path d="M38 32 Q42 40 38 48 Q42 56 38 64 Q42 70 40 74" stroke={colors.accent} strokeWidth="0.7" fill="none" opacity="0.35" />
    {/* Bioluminescent dots */}
    <circle cx="20" cy="16" r="0.8" fill="white" opacity="0.4" />
    <circle cx="30" cy="14" r="0.6" fill="white" opacity="0.35" />
    <circle cx="25" cy="22" r="0.7" fill="white" opacity="0.35" />
    <circle cx="16" cy="20" r="0.5" fill="white" opacity="0.3" />
    <circle cx="34" cy="22" r="0.5" fill="white" opacity="0.3" />
  </svg>
))
JellyfishFish.displayName = "JellyfishFish"

// Stingray — flat diamond/kite body, long whip tail
const StingrayFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.67} viewBox="0 0 75 50">
    <defs>
      <radialGradient id={`ray-b-${id}`} cx="35%" cy="45%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.6" />
        <stop offset="50%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.7" />
      </radialGradient>
      <radialGradient id={`ray-s-${id}`} cx="30%" cy="35%" r="40%">
        <stop offset="0%" stopColor="white" stopOpacity="0.1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Body — flat diamond/kite shape. Stingray signature */}
    <path d="M8 25 Q4 20 8 10 Q14 4 22 2 Q28 4 32 10 Q32 20 32 25 Q32 30 32 40 Q28 46 22 48 Q14 46 8 40 Q4 30 8 25 Z" fill={`url(#ray-b-${id})`} />
    {/* Wing tips — extending to sides */}
    <path d="M8 10 Q2 6 0 8 Q4 14 8 18" fill={colors.body} opacity="0.6" />
    <path d="M8 40 Q2 44 0 42 Q4 36 8 32" fill={colors.body} opacity="0.6" />
    <path d="M32 10 Q38 4 40 8 Q36 14 32 18" fill={colors.body} opacity="0.6" />
    <path d="M32 40 Q38 44 40 42 Q36 36 32 32" fill={colors.body} opacity="0.6" />
    {/* Long whip tail — stingray signature */}
    <path d="M30 25 Q40 25 50 24 Q58 23 64 22 Q70 21 74 20" stroke={colors.fin} strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
    <path d="M30 25 Q40 25 50 24 Q58 23 64 22 Q70 21 74 20" stroke={colors.body} strokeWidth="0.6" fill="none" opacity="0.3" strokeLinecap="round" />
    {/* Barb on tail */}
    <path d="M56 22 L58 20 L60 23 Z" fill={colors.fin} opacity="0.5" />
    {/* Surface texture — spots */}
    <circle cx="16" cy="18" r="1.2" fill={colors.fin} opacity="0.15" />
    <circle cx="22" cy="14" r="1" fill={colors.fin} opacity="0.15" />
    <circle cx="26" cy="20" r="1.1" fill={colors.fin} opacity="0.15" />
    <circle cx="14" cy="30" r="1" fill={colors.fin} opacity="0.15" />
    <circle cx="22" cy="34" r="1.2" fill={colors.fin} opacity="0.15" />
    <circle cx="28" cy="28" r="0.9" fill={colors.fin} opacity="0.12" />
    {/* Shimmer */}
    <ellipse cx="20" cy="22" rx="10" ry="12" fill={`url(#ray-s-${id})`} />
    {/* White belly hint */}
    <ellipse cx="20" cy="28" rx="8" ry="6" fill="white" opacity="0.06" />
    {/* Eyes — on top of head */}
    <circle cx="14" cy="12" r="2.2" fill="white" />
    <circle cx="13.6" cy="11.6" r="1.3" fill={colors.eye} />
    <circle cx="13.2" cy="11.2" r="0.5" fill="white" opacity="0.8" />
    <circle cx="26" cy="12" r="2.2" fill="white" />
    <circle cx="25.6" cy="11.6" r="1.3" fill={colors.eye} />
    <circle cx="25.2" cy="11.2" r="0.5" fill="white" opacity="0.8" />
    {/* Mouth — underside, small */}
    <path d="M18 28 Q20 29 22 28" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.3" />
  </svg>
))
StingrayFish.displayName = "StingrayFish"

// Axolotl — salamander with external feathery gills, wide head, stubby legs
const AxolotlFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.64} viewBox="0 0 70 45">
    <defs>
      <radialGradient id={`axo-b-${id}`} cx="35%" cy="45%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.7" />
        <stop offset="50%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.9" />
      </radialGradient>
      <linearGradient id={`axo-g-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} />
      </linearGradient>
    </defs>
    {/* Tail — long, flat, paddle-like with fin edge */}
    <path d="M48 20 Q56 18 62 16 Q66 15 68 16 Q66 20 68 24 Q66 26 62 24 Q56 22 48 24 Z" fill={colors.body} opacity="0.8" />
    <path d="M52 18 Q58 15 64 16" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.3" />
    <path d="M52 24 Q58 26 64 24" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.3" />
    {/* Tail fin crest */}
    <path d="M56 16 Q60 12 64 14 Q62 16 56 18" fill={colors.fin} opacity="0.4" />
    <path d="M56 24 Q60 28 64 26 Q62 24 56 22" fill={colors.fin} opacity="0.4" />
    {/* Body — elongated, pudgy */}
    <path d="M10 20 Q8 14 14 10 Q22 8 34 10 Q44 12 48 18 Q50 22 48 26 Q44 30 34 32 Q22 34 14 32 Q8 28 10 22 Z" fill={`url(#axo-b-${id})`} />
    {/* Belly */}
    <ellipse cx="28" cy="28" rx="14" ry="5" fill="white" opacity="0.08" />
    {/* External gills — LEFT side (3 feathery branches) — AXOLOTL SIGNATURE */}
    <path d="M14 10 Q8 4 4 2" stroke={`url(#axo-g-${id})`} strokeWidth="1.5" fill="none" opacity="0.8" />
    <path d="M5 3 Q3 2 2 0" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.5" />
    <path d="M6 4 Q4 5 3 4" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.4" />
    <path d="M16 10 Q12 2 10 0" stroke={`url(#axo-g-${id})`} strokeWidth="1.3" fill="none" opacity="0.75" />
    <path d="M11 1 Q9 0 8 -1" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.4" />
    <path d="M12 2 Q10 3 9 2" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.4" />
    <path d="M18 10 Q16 4 16 0" stroke={`url(#axo-g-${id})`} strokeWidth="1.2" fill="none" opacity="0.7" />
    <path d="M16 1 Q15 -1 14 -1" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.4" />
    {/* External gills — RIGHT side (visible behind head) */}
    <path d="M14 32 Q8 38 4 40" stroke={`url(#axo-g-${id})`} strokeWidth="1.5" fill="none" opacity="0.7" />
    <path d="M5 39 Q3 40 2 42" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.4" />
    <path d="M16 32 Q12 40 10 42" stroke={`url(#axo-g-${id})`} strokeWidth="1.3" fill="none" opacity="0.65" />
    <path d="M18 32 Q16 38 16 42" stroke={`url(#axo-g-${id})`} strokeWidth="1.2" fill="none" opacity="0.6" />
    {/* Front legs — stubby, cute */}
    <path d="M18 28 Q14 34 12 36" stroke={colors.body} strokeWidth="2.5" fill="none" opacity="0.7" strokeLinecap="round" />
    <circle cx="12" cy="36" r="1.5" fill={colors.body} opacity="0.6" />
    <path d="M24 30 Q20 36 18 38" stroke={colors.body} strokeWidth="2.5" fill="none" opacity="0.7" strokeLinecap="round" />
    <circle cx="18" cy="38" r="1.5" fill={colors.body} opacity="0.6" />
    {/* Back legs */}
    <path d="M36 30 Q34 36 32 38" stroke={colors.body} strokeWidth="2.2" fill="none" opacity="0.6" strokeLinecap="round" />
    <circle cx="32" cy="38" r="1.3" fill={colors.body} opacity="0.5" />
    <path d="M42 28 Q40 34 38 36" stroke={colors.body} strokeWidth="2.2" fill="none" opacity="0.6" strokeLinecap="round" />
    <circle cx="38" cy="36" r="1.3" fill={colors.body} opacity="0.5" />
    {/* Dorsal ridge */}
    <path d="M24 10 Q30 6 40 10" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.2" />
    {/* Spots on body */}
    <circle cx="22" cy="18" r="1.2" fill={colors.fin} opacity="0.15" />
    <circle cx="30" cy="16" r="1" fill={colors.fin} opacity="0.15" />
    <circle cx="38" cy="18" r="1.1" fill={colors.fin} opacity="0.15" />
    <circle cx="26" cy="24" r="0.9" fill={colors.fin} opacity="0.12" />
    {/* Smiley face — axolotl signature :) */}
    <circle cx="10" cy="18" r="2.5" fill="white" />
    <circle cx="9.6" cy="17.6" r="1.4" fill={colors.eye} />
    <circle cx="9.2" cy="17.2" r="0.6" fill="white" opacity="0.8" />
    {/* Wide smile */}
    <path d="M8 22 Q10 24 14 22" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.4" />
  </svg>
))
AxolotlFish.displayName = "AxolotlFish"

// Nautilus — spiral shell, tentacles
const NautilusFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.97} viewBox="0 0 60 58">
    <defs>
      <radialGradient id={`nau-b-${id}`} cx="55%" cy="45%" r="50%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.7" />
        <stop offset="50%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.6" />
      </radialGradient>
      <linearGradient id={`nau-s-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Shell — spiral shape. Nautilus signature */}
    <circle cx="36" cy="28" r="22" fill={`url(#nau-b-${id})`} />
    {/* Shell spiral lines — logarithmic spiral pattern */}
    <path d="M36 6 Q52 8 54 28 Q52 48 36 50 Q20 48 18 28 Q20 14 36 12 Q46 14 48 28 Q46 42 36 44 Q26 42 24 28 Q26 18 36 16 Q42 18 44 28 Q42 36 36 38 Q30 36 28 28 Q30 22 36 20 Q40 22 40 28 Q40 32 36 34" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.3" />
    {/* Shell chamber divisions — nautilus signature */}
    <path d="M36 6 Q36 12 36 16" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.25" />
    <path d="M54 28 Q48 28 44 28" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.25" />
    <path d="M36 50 Q36 44 36 38" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.25" />
    <path d="M18 28 Q24 28 28 28" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.25" />
    {/* Shell rim highlight */}
    <path d="M14 28 Q14 8 36 6 Q56 8 58 28 Q56 48 36 50 Q14 48 14 28 Z" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.2" />
    {/* Shell shimmer */}
    <ellipse cx="40" cy="20" rx="8" ry="6" fill="white" opacity="0.08" />
    {/* Tentacles — extending from shell opening */}
    <path d="M16 22 Q10 18 6 14 Q4 12 2 14" stroke={colors.body} strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M16 26 Q8 22 4 20 Q2 18 0 20" stroke={colors.body} strokeWidth="1" fill="none" opacity="0.55" strokeLinecap="round" />
    <path d="M16 30 Q8 30 4 28 Q2 26 0 28" stroke={colors.body} strokeWidth="1" fill="none" opacity="0.55" strokeLinecap="round" />
    <path d="M16 34 Q10 36 6 40 Q4 42 2 40" stroke={colors.body} strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M16 38 Q12 42 8 44 Q6 46 4 44" stroke={colors.body} strokeWidth="0.8" fill="none" opacity="0.45" strokeLinecap="round" />
    {/* Hood (tissue covering shell opening) */}
    <path d="M16 18 Q14 24 14 28 Q14 32 16 38" fill={colors.body} stroke={colors.fin} strokeWidth="0.4" opacity="0.6" />
    {/* Eye */}
    <circle cx="16" cy="24" r="2.5" fill="white" />
    <circle cx="15.6" cy="23.6" r="1.5" fill={colors.eye} />
    <circle cx="15.2" cy="23.2" r="0.6" fill="white" opacity="0.8" />
  </svg>
))
NautilusFish.displayName = "NautilusFish"

// Lionfish — dramatic fan pectoral fins, ornate dorsal spines, striped body
const LionfishFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.81} viewBox="0 0 80 65">
    <defs>
      <radialGradient id={`lion-b-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.8" />
        <stop offset="50%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.6" />
      </radialGradient>
      <linearGradient id={`lion-f-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="50%" stopColor={colors.accent} stopOpacity="0.6" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id={`lion-s-${id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.fin} />
      </linearGradient>
    </defs>
    {/* Dramatic dorsal spines — LONG, separate rays. Lionfish signature */}
    <path d="M20 22 Q20 8 18 2" stroke={`url(#lion-s-${id})`} strokeWidth="1.2" fill="none" opacity="0.8" />
    <path d="M24 20 Q24 6 22 0" stroke={`url(#lion-s-${id})`} strokeWidth="1.1" fill="none" opacity="0.75" />
    <path d="M28 18 Q30 4 30 -1" stroke={`url(#lion-s-${id})`} strokeWidth="1.1" fill="none" opacity="0.75" />
    <path d="M32 18 Q36 6 38 0" stroke={`url(#lion-s-${id})`} strokeWidth="1" fill="none" opacity="0.7" />
    <path d="M36 18 Q40 8 44 2" stroke={`url(#lion-s-${id})`} strokeWidth="1" fill="none" opacity="0.7" />
    <path d="M40 20 Q44 10 48 4" stroke={`url(#lion-s-${id})`} strokeWidth="0.9" fill="none" opacity="0.65" />
    <path d="M44 20 Q48 12 52 6" stroke={`url(#lion-s-${id})`} strokeWidth="0.9" fill="none" opacity="0.65" />
    {/* Membrane between dorsal spines (thin) */}
    <path d="M18 4 Q22 8 22 2 Q26 6 30 0 Q34 6 38 2 Q40 6 44 4 Q46 8 48 6 Q50 10 52 8" stroke={colors.accent} strokeWidth="0.4" fill={colors.accent} fillOpacity="0.08" opacity="0.4" />
    {/* Tail */}
    <path d="M56 28 Q62 24 66 28 Q64 34 66 40 Q62 42 58 38 Z" fill={colors.fin} opacity="0.7" />
    {/* Tail rays */}
    <path d="M58 28 Q64 26 66 28" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.4" />
    <path d="M58 34 Q64 34 66 36" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.4" />
    <path d="M58 38 Q64 40 66 40" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.4" />
    {/* Body — stocky, slightly deep */}
    <ellipse cx="36" cy="32" rx="22" ry="16" fill={`url(#lion-b-${id})`} />
    {/* Bold vertical stripes — lionfish signature */}
    <path d="M20 18 Q20 32 22 46" stroke={colors.fin} strokeWidth="2.5" fill="none" opacity="0.35" />
    <path d="M28 16 Q28 32 28 48" stroke={colors.fin} strokeWidth="2" fill="none" opacity="0.3" />
    <path d="M36 16 Q36 32 36 48" stroke={colors.fin} strokeWidth="2" fill="none" opacity="0.3" />
    <path d="M44 18 Q44 32 44 46" stroke={colors.fin} strokeWidth="2.5" fill="none" opacity="0.35" />
    <path d="M52 22 Q52 32 50 42" stroke={colors.fin} strokeWidth="2" fill="none" opacity="0.3" />
    {/* Fan pectoral fins — HUGE, dramatic spread. Lionfish signature */}
    <path d="M22 34 Q14 40 6 50 Q4 52 6 54" stroke={`url(#lion-f-${id})`} strokeWidth="1.2" fill="none" opacity="0.7" />
    <path d="M22 34 Q16 42 10 52 Q8 56 10 58" stroke={`url(#lion-f-${id})`} strokeWidth="1.1" fill="none" opacity="0.65" />
    <path d="M24 36 Q20 44 16 54 Q14 58 16 60" stroke={`url(#lion-f-${id})`} strokeWidth="1" fill="none" opacity="0.6" />
    <path d="M26 36 Q24 46 22 56 Q22 60 24 62" stroke={`url(#lion-f-${id})`} strokeWidth="1" fill="none" opacity="0.6" />
    <path d="M28 38 Q28 48 28 58 Q28 62 30 64" stroke={`url(#lion-f-${id})`} strokeWidth="0.9" fill="none" opacity="0.55" />
    {/* Membrane between pectoral fin rays */}
    <path d="M6 52 Q10 54 10 52 Q14 56 16 54 Q20 58 22 56 Q24 60 28 58 Q28 62 30 60" stroke={colors.accent} strokeWidth="0.4" fill={colors.accent} fillOpacity="0.06" opacity="0.3" />
    {/* Anal fin spines */}
    <path d="M38 48 Q40 54 42 56" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.5" />
    <path d="M42 46 Q44 52 46 54" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.5" />
    <path d="M46 44 Q48 50 50 52" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.5" />
    {/* Eye stripe */}
    <path d="M16 24 Q16 32 16 40" stroke={colors.fin} strokeWidth="2.5" fill="none" opacity="0.5" />
    {/* Eye — detailed */}
    <circle cx="16" cy="30" r="4" fill="white" />
    <circle cx="16" cy="30" r="4" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.3" />
    <circle cx="15.5" cy="29.5" r="2.5" fill={colors.eye} />
    <circle cx="15" cy="29" r="1.5" fill="#111" />
    <circle cx="14.5" cy="28.5" r="0.8" fill="white" opacity="0.85" />
    <circle cx="16.5" cy="30.5" r="0.4" fill="white" opacity="0.4" />
    {/* Mouth */}
    <path d="M14 36 Q12 35.5 14 35" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.5" />
    {/* Supraorbital tentacle (above eye) — lionfish signature */}
    <path d="M16 26 Q14 20 12 16" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.5" />
    <circle cx="12" cy="16" r="0.6" fill={colors.accent} opacity="0.5" />
  </svg>
))
LionfishFish.displayName = "LionfishFish"


// ─── SPECIES COLOR VARIANTS ─────────────────────────────────────
// Each alternate species has 6 unique color variants (matching guppy's 6 tier colors).
// All variants within a species unlock together when the tier is reached.

export interface SpeciesColorVariant {
  name: string
  colors: FishColors
}

const SPECIES_COLOR_VARIANTS: Record<string, SpeciesColorVariant[]> = {
  // ── Endler's Livebearer (Tier 0) — Wild, neon micro-fish vibes ──
  'endler': [
    { name: 'Wild Type',    colors: { body: '#7CB342', fin: '#33691E', accent: '#FF6D00', eye: '#1B1B1B' } },
    { name: 'Flame',        colors: { body: '#FF5722', fin: '#BF360C', accent: '#FFAB00', eye: '#1B1B1B' } },
    { name: 'Cobra',        colors: { body: '#827717', fin: '#33691E', accent: '#FFD600', eye: '#1B1B1B' } },
    { name: 'Peacock',      colors: { body: '#00ACC1', fin: '#006064', accent: '#EEFF41', eye: '#1B1B1B' } },
    { name: 'Tiger',        colors: { body: '#F57C00', fin: '#3E2723', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Neon',         colors: { body: '#00E676', fin: '#00897B', accent: '#76FF03', eye: '#1B1B1B' } },
  ],
  // ── Neon Tetra (Tier 1) — Iridescent stripe legends ──
  'neon-tetra': [
    { name: 'Classic',      colors: { body: '#1565C0', fin: '#E53935', accent: '#64B5F6', eye: '#1B1B1B' } },
    { name: 'Cardinal',     colors: { body: '#0D47A1', fin: '#B71C1C', accent: '#42A5F5', eye: '#1B1B1B' } },
    { name: 'Green Neon',   colors: { body: '#2E7D32', fin: '#1B5E20', accent: '#69F0AE', eye: '#1B1B1B' } },
    { name: 'Black Neon',   colors: { body: '#37474F', fin: '#263238', accent: '#B388FF', eye: '#E0E0E0' } },
    { name: 'Diamond',      colors: { body: '#90A4AE', fin: '#546E7A', accent: '#E1F5FE', eye: '#1B1B1B' } },
    { name: 'Ember',        colors: { body: '#E65100', fin: '#BF360C', accent: '#FFD180', eye: '#1B1B1B' } },
  ],
  // ── Betta (Tier 5) — Dramatic flowing royalty ──
  'betta': [
    { name: 'Royal Blue',   colors: { body: '#1565C0', fin: '#0D47A1', accent: '#82B1FF', eye: '#1B1B1B' } },
    { name: 'Koi',          colors: { body: '#FFFFFF', fin: '#D32F2F', accent: '#FFB300', eye: '#1B1B1B' } },
    { name: 'Rose Gold',    colors: { body: '#F48FB1', fin: '#AD1457', accent: '#FCE4EC', eye: '#880E4F' } },
    { name: 'Galaxy',       colors: { body: '#1A237E', fin: '#311B92', accent: '#B388FF', eye: '#E040FB' } },
    { name: 'Copper',       colors: { body: '#D84315', fin: '#8D6E63', accent: '#FFCC80', eye: '#FFD700' } },
    { name: 'Mustard Gas',  colors: { body: '#1976D2', fin: '#F9A825', accent: '#4FC3F7', eye: '#1B1B1B' } },
  ],
  // ── Angelfish (Tier 2) — Elegant striped aristocrats ──
  'angelfish': [
    { name: 'Marble',       colors: { body: '#ECEFF1', fin: '#37474F', accent: '#90A4AE', eye: '#1B1B1B' } },
    { name: 'Gold Pearl',   colors: { body: '#FFD54F', fin: '#FF8F00', accent: '#FFF8E1', eye: '#795548' } },
    { name: 'Koi Angel',    colors: { body: '#FFFFFF', fin: '#FF5722', accent: '#FF9800', eye: '#1B1B1B' } },
    { name: 'Platinum',     colors: { body: '#CFD8DC', fin: '#B0BEC5', accent: '#ECEFF1', eye: '#455A64' } },
    { name: 'Smokey',       colors: { body: '#455A64', fin: '#263238', accent: '#78909C', eye: '#E0E0E0' } },
    { name: 'Sunset Blush', colors: { body: '#FF8A80', fin: '#F4511E', accent: '#FFCCBC', eye: '#4E342E' } },
  ],
  // ── Molly (Tier 0) — Friendly plump beginner fish ──
  'molly': [
    { name: 'Black',        colors: { body: '#263238', fin: '#1B1B1B', accent: '#455A64', eye: '#E0E0E0' } },
    { name: 'Dalmatian',    colors: { body: '#ECEFF1', fin: '#37474F', accent: '#CFD8DC', eye: '#1B1B1B' } },
    { name: 'Gold Dust',    colors: { body: '#F9A825', fin: '#F57F17', accent: '#FFF176', eye: '#1B1B1B' } },
    { name: 'Creamsicle',   colors: { body: '#FF8A65', fin: '#FF5722', accent: '#FFE0B2', eye: '#1B1B1B' } },
    { name: 'Silver',       colors: { body: '#B0BEC5', fin: '#78909C', accent: '#ECEFF1', eye: '#1B1B1B' } },
    { name: 'Balloon',      colors: { body: '#EF5350', fin: '#C62828', accent: '#FFCDD2', eye: '#1B1B1B' } },
  ],
  // ── Ember Tetra (Tier 1) — Warm, fiery schooling fish ──
  'ember-tetra': [
    { name: 'Classic',      colors: { body: '#E65100', fin: '#BF360C', accent: '#FFAB40', eye: '#1B1B1B' } },
    { name: 'Flame',        colors: { body: '#D32F2F', fin: '#B71C1C', accent: '#FF8A80', eye: '#1B1B1B' } },
    { name: 'Sunset',       colors: { body: '#FF8F00', fin: '#E65100', accent: '#FFD180', eye: '#1B1B1B' } },
    { name: 'Ruby',         colors: { body: '#C62828', fin: '#8E0000', accent: '#EF5350', eye: '#1B1B1B' } },
    { name: 'Copper',       colors: { body: '#BF360C', fin: '#8D6E63', accent: '#FFAB91', eye: '#1B1B1B' } },
    { name: 'Amber',        colors: { body: '#FF6F00', fin: '#E65100', accent: '#FFE082', eye: '#1B1B1B' } },
  ],
  // ── Diamond Tetra (Tier 1) — Iridescent, reflective schooling fish ──
  'diamond-tetra': [
    { name: 'Silver',       colors: { body: '#90A4AE', fin: '#546E7A', accent: '#E1F5FE', eye: '#1B1B1B' } },
    { name: 'Platinum',     colors: { body: '#CFD8DC', fin: '#B0BEC5', accent: '#FFFFFF', eye: '#455A64' } },
    { name: 'Gold',         colors: { body: '#F9A825', fin: '#F57F17', accent: '#FFF176', eye: '#1B1B1B' } },
    { name: 'Rose',         colors: { body: '#F48FB1', fin: '#AD1457', accent: '#FCE4EC', eye: '#1B1B1B' } },
    { name: 'Opal',         colors: { body: '#80DEEA', fin: '#00ACC1', accent: '#E0F7FA', eye: '#1B1B1B' } },
    { name: 'Amethyst',     colors: { body: '#CE93D8', fin: '#8E24AA', accent: '#F3E5F5', eye: '#1B1B1B' } },
  ],
  // ── Rummy-Nose Tetra (Tier 1) — Red-nosed beauty ──
  'rummy-tetra': [
    { name: 'Classic',      colors: { body: '#B0BEC5', fin: '#D32F2F', accent: '#ECEFF1', eye: '#1B1B1B' } },
    { name: 'Brilliant',    colors: { body: '#90A4AE', fin: '#C62828', accent: '#CFD8DC', eye: '#1B1B1B' } },
    { name: 'Green',        colors: { body: '#66BB6A', fin: '#C62828', accent: '#C8E6C9', eye: '#1B1B1B' } },
    { name: 'Gold',         colors: { body: '#FFD54F', fin: '#D32F2F', accent: '#FFF9C4', eye: '#1B1B1B' } },
    { name: 'Wild',         colors: { body: '#8D6E63', fin: '#B71C1C', accent: '#D7CCC8', eye: '#1B1B1B' } },
    { name: 'Neon',         colors: { body: '#42A5F5', fin: '#EF5350', accent: '#90CAF9', eye: '#1B1B1B' } },
  ],
  // ── Serpae Tetra (Tier 1) — Deep-bodied flame tetra ──
  'serpae-tetra': [
    { name: 'Classic',      colors: { body: '#E53935', fin: '#B71C1C', accent: '#FF8A80', eye: '#1B1B1B' } },
    { name: 'Long Fin',     colors: { body: '#D32F2F', fin: '#C62828', accent: '#FFCDD2', eye: '#1B1B1B' } },
    { name: 'Gold',         colors: { body: '#FF8F00', fin: '#E65100', accent: '#FFE082', eye: '#1B1B1B' } },
    { name: 'Black Phantom', colors: { body: '#37474F', fin: '#1B1B1B', accent: '#78909C', eye: '#E0E0E0' } },
    { name: 'Callistus',    colors: { body: '#FF5722', fin: '#BF360C', accent: '#FFAB91', eye: '#1B1B1B' } },
    { name: 'Ember',        colors: { body: '#FF6F00', fin: '#E65100', accent: '#FFD180', eye: '#1B1B1B' } },
  ],
  // ── Glowlight Tetra (Tier 1) — Subtle glow stripe ──
  'glowlight-tetra': [
    { name: 'Classic',      colors: { body: '#8D6E63', fin: '#5D4037', accent: '#FF8A65', eye: '#1B1B1B' } },
    { name: 'Neon',         colors: { body: '#546E7A', fin: '#37474F', accent: '#00E5FF', eye: '#1B1B1B' } },
    { name: 'Gold',         colors: { body: '#A1887F', fin: '#6D4C41', accent: '#FFD600', eye: '#1B1B1B' } },
    { name: 'Rose',         colors: { body: '#8D6E63', fin: '#4E342E', accent: '#F48FB1', eye: '#1B1B1B' } },
    { name: 'Platinum',     colors: { body: '#B0BEC5', fin: '#78909C', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Emerald',      colors: { body: '#5D4037', fin: '#3E2723', accent: '#69F0AE', eye: '#1B1B1B' } },
  ],
  // ── Marble Angelfish (Tier 2) — Marbled pattern angelfish ──
  'marble-angelfish': [
    { name: 'Classic',      colors: { body: '#ECEFF1', fin: '#37474F', accent: '#90A4AE', eye: '#1B1B1B' } },
    { name: 'Gold Marble',  colors: { body: '#FFD54F', fin: '#4E342E', accent: '#FFF8E1', eye: '#795548' } },
    { name: 'Silver',       colors: { body: '#CFD8DC', fin: '#263238', accent: '#ECEFF1', eye: '#455A64' } },
    { name: 'Blue',         colors: { body: '#90CAF9', fin: '#1565C0', accent: '#E3F2FD', eye: '#1B1B1B' } },
    { name: 'Chocolate',    colors: { body: '#6D4C41', fin: '#3E2723', accent: '#A1887F', eye: '#FFD700' } },
    { name: 'Sunset',       colors: { body: '#FF8A65', fin: '#BF360C', accent: '#FFCCBC', eye: '#4E342E' } },
  ],
  // ── Koi Angelfish (Tier 2) — Koi-patterned angelfish ──
  'koi-angelfish': [
    { name: 'Classic',      colors: { body: '#FFFFFF', fin: '#FF5722', accent: '#FF9800', eye: '#1B1B1B' } },
    { name: 'Red Cap',      colors: { body: '#ECEFF1', fin: '#D32F2F', accent: '#FFCDD2', eye: '#1B1B1B' } },
    { name: 'Gold',         colors: { body: '#FFF8E1', fin: '#FF8F00', accent: '#FFD54F', eye: '#795548' } },
    { name: 'Blushing',     colors: { body: '#FFFFFF', fin: '#F48FB1', accent: '#FCE4EC', eye: '#EC407A' } },
    { name: 'Tancho',       colors: { body: '#ECEFF1', fin: '#C62828', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Calico',       colors: { body: '#FFFFFF', fin: '#FF6F00', accent: '#263238', eye: '#1B1B1B' } },
  ],
  // ── Platinum Angelfish (Tier 2) — Clean, shimmering angelfish ──
  'platinum-angelfish': [
    { name: 'Classic',      colors: { body: '#CFD8DC', fin: '#B0BEC5', accent: '#ECEFF1', eye: '#455A64' } },
    { name: 'Pearl',        colors: { body: '#EFEBE9', fin: '#D7CCC8', accent: '#FFFFFF', eye: '#795548' } },
    { name: 'Ghost',        colors: { body: '#ECEFF1', fin: '#B0BEC5', accent: '#FFFFFF', eye: '#B0BEC5' } },
    { name: 'Blue Diamond', colors: { body: '#BBDEFB', fin: '#64B5F6', accent: '#E3F2FD', eye: '#1565C0' } },
    { name: 'Snow',         colors: { body: '#FFFFFF', fin: '#ECEFF1', accent: '#FFFFFF', eye: '#78909C' } },
    { name: 'Champagne',    colors: { body: '#FFE0B2', fin: '#FFCC80', accent: '#FFF8E1', eye: '#795548' } },
  ],
  // ── Zebra Angelfish (Tier 2) — Extra-striped angelfish ──
  'zebra-angelfish': [
    { name: 'Classic',      colors: { body: '#B0BEC5', fin: '#263238', accent: '#ECEFF1', eye: '#1B1B1B' } },
    { name: 'Blue Zebra',   colors: { body: '#90CAF9', fin: '#0D47A1', accent: '#E3F2FD', eye: '#1B1B1B' } },
    { name: 'Gold Zebra',   colors: { body: '#FFD54F', fin: '#5D4037', accent: '#FFF8E1', eye: '#795548' } },
    { name: 'Ghost Zebra',  colors: { body: '#ECEFF1', fin: '#455A64', accent: '#FFFFFF', eye: '#78909C' } },
    { name: 'Red Zebra',    colors: { body: '#FFCDD2', fin: '#B71C1C', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Obsidian',     colors: { body: '#37474F', fin: '#1B1B1B', accent: '#78909C', eye: '#E0E0E0' } },
  ],
  // ── Veil Angelfish (Tier 2) — Extra-long-finned angelfish ──
  'veil-angelfish': [
    { name: 'Silver',       colors: { body: '#B0BEC5', fin: '#78909C', accent: '#ECEFF1', eye: '#1B1B1B' } },
    { name: 'Gold',         colors: { body: '#FFD54F', fin: '#FF8F00', accent: '#FFF8E1', eye: '#795548' } },
    { name: 'Blue',         colors: { body: '#64B5F6', fin: '#1565C0', accent: '#BBDEFB', eye: '#1B1B1B' } },
    { name: 'Black Lace',   colors: { body: '#37474F', fin: '#1B1B1B', accent: '#546E7A', eye: '#E0E0E0' } },
    { name: 'Albino',       colors: { body: '#FFECB3', fin: '#FFD54F', accent: '#FFFFFF', eye: '#EF5350' } },
    { name: 'Pearlscale',   colors: { body: '#EFEBE9', fin: '#BCAAA4', accent: '#FFFFFF', eye: '#795548' } },
  ],
  // ── Clownfish (Tier 3) — Iconic reef dwellers ──
  'clownfish': [
    { name: 'Ocellaris',    colors: { body: '#FF6D00', fin: '#E65100', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Tomato',       colors: { body: '#D32F2F', fin: '#B71C1C', accent: '#FFCDD2', eye: '#1B1B1B' } },
    { name: 'Maroon',       colors: { body: '#6D1B20', fin: '#4E342E', accent: '#FFD54F', eye: '#FFD700' } },
    { name: 'Black Ice',    colors: { body: '#263238', fin: '#1B1B1B', accent: '#ECEFF1', eye: '#E0E0E0' } },
    { name: 'Platinum',     colors: { body: '#ECEFF1', fin: '#CFD8DC', accent: '#FFFFFF', eye: '#455A64' } },
    { name: 'Mocha',        colors: { body: '#795548', fin: '#4E342E', accent: '#FFE0B2', eye: '#FFD700' } },
  ],
  // ── Tang (Tier 4) — Vibrant reef surgeonfish ──
  'tang': [
    { name: 'Regal Blue',   colors: { body: '#1565C0', fin: '#0D47A1', accent: '#FFEE58', eye: '#1B1B1B' } },
    { name: 'Yellow',       colors: { body: '#FFD600', fin: '#F9A825', accent: '#FFF9C4', eye: '#1B1B1B' } },
    { name: 'Purple',       colors: { body: '#7B1FA2', fin: '#4A148C', accent: '#E040FB', eye: '#FFD700' } },
    { name: 'Achilles',     colors: { body: '#263238', fin: '#1B1B1B', accent: '#FF5722', eye: '#FF9800' } },
    { name: 'Powder Blue',  colors: { body: '#4FC3F7', fin: '#0288D1', accent: '#E1F5FE', eye: '#1B1B1B' } },
    { name: 'Naso',         colors: { body: '#546E7A', fin: '#FF6F00', accent: '#B0BEC5', eye: '#FFD700' } },
  ],
  // ── Tomato Clownfish (Tier 3) — Larger, deeper red clownfish ──
  'tomato-clownfish': [
    { name: 'Classic',      colors: { body: '#C62828', fin: '#B71C1C', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Fire',         colors: { body: '#D32F2F', fin: '#E65100', accent: '#FFCDD2', eye: '#1B1B1B' } },
    { name: 'Dark',         colors: { body: '#8E0000', fin: '#5D0000', accent: '#FFCDD2', eye: '#FFD700' } },
    { name: 'Sunset',       colors: { body: '#FF5722', fin: '#BF360C', accent: '#FFF8E1', eye: '#1B1B1B' } },
    { name: 'Black',        colors: { body: '#37474F', fin: '#1B1B1B', accent: '#ECEFF1', eye: '#E0E0E0' } },
    { name: 'Tangerine',    colors: { body: '#FF6D00', fin: '#E65100', accent: '#FFFFFF', eye: '#1B1B1B' } },
  ],
  // ── Maroon Clownfish (Tier 3) — Stocky, gold-striped clownfish ──
  'maroon-clownfish': [
    { name: 'Classic',      colors: { body: '#6D1B20', fin: '#4E342E', accent: '#FFD54F', eye: '#FFD700' } },
    { name: 'Gold Stripe',  colors: { body: '#5D0000', fin: '#3E2723', accent: '#FFD600', eye: '#FFD700' } },
    { name: 'White Stripe', colors: { body: '#8E0000', fin: '#5D0000', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Lightning',    colors: { body: '#4E342E', fin: '#3E2723', accent: '#FFE082', eye: '#FFD700' } },
    { name: 'Sumatra',      colors: { body: '#BF360C', fin: '#8D6E63', accent: '#FFD54F', eye: '#1B1B1B' } },
    { name: 'Onyx',         colors: { body: '#263238', fin: '#1B1B1B', accent: '#FFD600', eye: '#FFD700' } },
  ],
  // ── Saddleback Clownfish (Tier 3) — Elongated body with saddle marking ──
  'saddleback-clownfish': [
    { name: 'Classic',      colors: { body: '#E65100', fin: '#BF360C', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Wide Band',    colors: { body: '#FF6D00', fin: '#E65100', accent: '#ECEFF1', eye: '#1B1B1B' } },
    { name: 'Chocolate',    colors: { body: '#5D4037', fin: '#3E2723', accent: '#FFFFFF', eye: '#FFD700' } },
    { name: 'Melanistic',   colors: { body: '#37474F', fin: '#1B1B1B', accent: '#B0BEC5', eye: '#E0E0E0' } },
    { name: 'Flame',        colors: { body: '#FF5722', fin: '#D32F2F', accent: '#FFF8E1', eye: '#1B1B1B' } },
    { name: 'Peach',        colors: { body: '#FFAB91', fin: '#FF7043', accent: '#FFFFFF', eye: '#4E342E' } },
  ],
  // ── Cinnamon Clownfish (Tier 3) — Warm brown-orange clownfish ──
  'cinnamon-clownfish': [
    { name: 'Classic',      colors: { body: '#BF360C', fin: '#8D6E63', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Dark',         colors: { body: '#4E342E', fin: '#3E2723', accent: '#ECEFF1', eye: '#FFD700' } },
    { name: 'Red',          colors: { body: '#D32F2F', fin: '#8D6E63', accent: '#FFCDD2', eye: '#1B1B1B' } },
    { name: 'Dusky',        colors: { body: '#5D4037', fin: '#4E342E', accent: '#D7CCC8', eye: '#FFD700' } },
    { name: 'Amber',        colors: { body: '#FF8F00', fin: '#E65100', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Cocoa',        colors: { body: '#6D4C41', fin: '#3E2723', accent: '#FFE0B2', eye: '#FFD700' } },
  ],
  // ── Snowflake Clownfish (Tier 3) — Irregular white patterned clownfish ──
  'snowflake-clownfish': [
    { name: 'Classic',      colors: { body: '#FF6D00', fin: '#E65100', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Blizzard',     colors: { body: '#ECEFF1', fin: '#B0BEC5', accent: '#FFFFFF', eye: '#455A64' } },
    { name: 'Frostbite',    colors: { body: '#263238', fin: '#1B1B1B', accent: '#FFFFFF', eye: '#E0E0E0' } },
    { name: 'Sunset',       colors: { body: '#FF5722', fin: '#BF360C', accent: '#FFF8E1', eye: '#1B1B1B' } },
    { name: 'Premium',      colors: { body: '#FF8F00', fin: '#FF6D00', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Mocha Storm',  colors: { body: '#795548', fin: '#4E342E', accent: '#FFFFFF', eye: '#FFD700' } },
  ],
  // ── Yellow Tang (Tier 4) — Bright yellow reef surgeonfish ──
  'yellow-tang': [
    { name: 'Classic',      colors: { body: '#FFD600', fin: '#F9A825', accent: '#FFF9C4', eye: '#1B1B1B' } },
    { name: 'Lemon',        colors: { body: '#FFF176', fin: '#FFEE58', accent: '#FFFDE7', eye: '#1B1B1B' } },
    { name: 'Gold',         colors: { body: '#FF8F00', fin: '#E65100', accent: '#FFE082', eye: '#1B1B1B' } },
    { name: 'Blonde',       colors: { body: '#FFE0B2', fin: '#FFCC80', accent: '#FFF8E1', eye: '#795548' } },
    { name: 'Citrus',       colors: { body: '#AEEA00', fin: '#9E9D24', accent: '#F4FF81', eye: '#1B1B1B' } },
    { name: 'Albino',       colors: { body: '#FFFFFF', fin: '#ECEFF1', accent: '#FFF9C4', eye: '#EF5350' } },
  ],
  // ── Powder Tang (Tier 4) — Powder blue surgeonfish ──
  'powder-tang': [
    { name: 'Classic',      colors: { body: '#4FC3F7', fin: '#0288D1', accent: '#E1F5FE', eye: '#1B1B1B' } },
    { name: 'Deep Blue',    colors: { body: '#1565C0', fin: '#0D47A1', accent: '#BBDEFB', eye: '#FFD700' } },
    { name: 'Sky',          colors: { body: '#81D4FA', fin: '#29B6F6', accent: '#E1F5FE', eye: '#1B1B1B' } },
    { name: 'Violet',       colors: { body: '#7E57C2', fin: '#4527A0', accent: '#D1C4E9', eye: '#FFD700' } },
    { name: 'Ice',          colors: { body: '#B3E5FC', fin: '#4FC3F7', accent: '#E1F5FE', eye: '#0288D1' } },
    { name: 'Teal',         colors: { body: '#00897B', fin: '#004D40', accent: '#80CBC4', eye: '#FFD700' } },
  ],
  // ── Achilles Tang (Tier 4) — Dark body with orange accent ──
  'achilles-tang': [
    { name: 'Classic',      colors: { body: '#263238', fin: '#1B1B1B', accent: '#FF5722', eye: '#FF9800' } },
    { name: 'Midnight',     colors: { body: '#1B1B1B', fin: '#0D1642', accent: '#FF6D00', eye: '#FFD700' } },
    { name: 'Crimson',      colors: { body: '#37474F', fin: '#263238', accent: '#C62828', eye: '#EF5350' } },
    { name: 'Ember',        colors: { body: '#263238', fin: '#1B1B1B', accent: '#FF8F00', eye: '#FFD600' } },
    { name: 'Ghost',        colors: { body: '#455A64', fin: '#37474F', accent: '#78909C', eye: '#B0BEC5' } },
    { name: 'Inferno',      colors: { body: '#1B1B1B', fin: '#0D0D0D', accent: '#D32F2F', eye: '#FF5722' } },
  ],
  // ── Naso Tang (Tier 4) — Unicorn tang with protruding nose ──
  'naso-tang': [
    { name: 'Classic',      colors: { body: '#546E7A', fin: '#FF6F00', accent: '#B0BEC5', eye: '#FFD700' } },
    { name: 'Blue',         colors: { body: '#37474F', fin: '#1565C0', accent: '#90A4AE', eye: '#FFD700' } },
    { name: 'Blonde',       colors: { body: '#8D6E63', fin: '#FF8F00', accent: '#D7CCC8', eye: '#FFD700' } },
    { name: 'Elegant',      colors: { body: '#78909C', fin: '#FFD600', accent: '#CFD8DC', eye: '#1B1B1B' } },
    { name: 'Storm',        colors: { body: '#263238', fin: '#FF5722', accent: '#546E7A', eye: '#FF9800' } },
    { name: 'Lipstick',     colors: { body: '#607D8B', fin: '#D32F2F', accent: '#B0BEC5', eye: '#FFD700' } },
  ],
  // ── Sailfin Tang (Tier 4) — Large-finned decorative tang ──
  'sailfin-tang': [
    { name: 'Classic',      colors: { body: '#5D4037', fin: '#FFD600', accent: '#8D6E63', eye: '#FFD700' } },
    { name: 'Desjardin',    colors: { body: '#455A64', fin: '#4FC3F7', accent: '#78909C', eye: '#FFD700' } },
    { name: 'Pacific',      colors: { body: '#37474F', fin: '#AEEA00', accent: '#607D8B', eye: '#1B1B1B' } },
    { name: 'Red Sea',      colors: { body: '#5D4037', fin: '#FF8F00', accent: '#A1887F', eye: '#FFD700' } },
    { name: 'Albino',       colors: { body: '#ECEFF1', fin: '#FFD54F', accent: '#FFFFFF', eye: '#EF5350' } },
    { name: 'Midnight',     colors: { body: '#1B1B1B', fin: '#FFD600', accent: '#37474F', eye: '#FFD700' } },
  ],
  // ── Crown Betta (Tier 5) — Spiky-rayed fins like a crown ──
  'crown-betta': [
    { name: 'Royal Blue',   colors: { body: '#1565C0', fin: '#0D47A1', accent: '#82B1FF', eye: '#FFD700' } },
    { name: 'Crimson',      colors: { body: '#C62828', fin: '#8E0000', accent: '#FF8A80', eye: '#1B1B1B' } },
    { name: 'Mustard Gas',  colors: { body: '#1565C0', fin: '#FFD600', accent: '#82B1FF', eye: '#FFD700' } },
    { name: 'Cambodia',     colors: { body: '#FFECB3', fin: '#C62828', accent: '#FFF8E1', eye: '#1B1B1B' } },
    { name: 'Black Orchid', colors: { body: '#1B1B1B', fin: '#311B92', accent: '#7C4DFF', eye: '#B388FF' } },
    { name: 'Butterfly',    colors: { body: '#1565C0', fin: '#ECEFF1', accent: '#90CAF9', eye: '#FFD700' } },
  ],
  // ── Halfmoon Betta (Tier 5) — 180-degree tail spread ──
  'halfmoon-betta': [
    { name: 'Classic',      colors: { body: '#D32F2F', fin: '#C62828', accent: '#FF8A80', eye: '#1B1B1B' } },
    { name: 'Turquoise',    colors: { body: '#00897B', fin: '#004D40', accent: '#80CBC4', eye: '#FFD700' } },
    { name: 'Lavender',     colors: { body: '#9575CD', fin: '#5E35B1', accent: '#D1C4E9', eye: '#FFD700' } },
    { name: 'Copper',       colors: { body: '#BF360C', fin: '#8D6E63', accent: '#FFAB91', eye: '#FFD700' } },
    { name: 'Dumbo',        colors: { body: '#EC407A', fin: '#AD1457', accent: '#F8BBD0', eye: '#1B1B1B' } },
    { name: 'White Opal',   colors: { body: '#ECEFF1', fin: '#B0BEC5', accent: '#FFFFFF', eye: '#78909C' } },
  ],
  // ── Plakat Betta (Tier 5) — Short-finned, muscular fighter ──
  'plakat-betta': [
    { name: 'Classic',      colors: { body: '#1565C0', fin: '#0D47A1', accent: '#82B1FF', eye: '#FFD700' } },
    { name: 'Koi',          colors: { body: '#FFFFFF', fin: '#D32F2F', accent: '#FF9800', eye: '#1B1B1B' } },
    { name: 'Samurai',      colors: { body: '#263238', fin: '#C62828', accent: '#546E7A', eye: '#FFD700' } },
    { name: 'Alien',        colors: { body: '#004D40', fin: '#00897B', accent: '#80CBC4', eye: '#00E5FF' } },
    { name: 'Giant',        colors: { body: '#1565C0', fin: '#D32F2F', accent: '#90CAF9', eye: '#FFD700' } },
    { name: 'Wild',         colors: { body: '#5D4037', fin: '#4E342E', accent: '#8D6E63', eye: '#FFD700' } },
  ],
  // ── Galaxy Betta (Tier 5) — Iridescent, star-speckled betta ──
  'galaxy-betta': [
    { name: 'Classic',      colors: { body: '#1A237E', fin: '#0D47A1', accent: '#FFFFFF', eye: '#FFD700' } },
    { name: 'Nebula',       colors: { body: '#4A148C', fin: '#6A1B9A', accent: '#E1BEE7', eye: '#FFD700' } },
    { name: 'Supernova',    colors: { body: '#B71C1C', fin: '#880E4F', accent: '#FFD600', eye: '#FFD700' } },
    { name: 'Aurora',       colors: { body: '#004D40', fin: '#00695C', accent: '#69F0AE', eye: '#FFD700' } },
    { name: 'Cosmic Blue',  colors: { body: '#0D47A1', fin: '#1A237E', accent: '#82B1FF', eye: '#FFD700' } },
    { name: 'Stardust',     colors: { body: '#37474F', fin: '#263238', accent: '#CFD8DC', eye: '#80DEEA' } },
  ],
  // ── Dragon Betta (Tier 5) — Thick metallic scaling ──
  'dragon-betta': [
    { name: 'Red Dragon',   colors: { body: '#C62828', fin: '#8E0000', accent: '#ECEFF1', eye: '#FFD700' } },
    { name: 'Blue Dragon',  colors: { body: '#1565C0', fin: '#0D47A1', accent: '#CFD8DC', eye: '#FFD700' } },
    { name: 'Gold Dragon',  colors: { body: '#FF8F00', fin: '#E65100', accent: '#FFF8E1', eye: '#1B1B1B' } },
    { name: 'Black Dragon', colors: { body: '#263238', fin: '#1B1B1B', accent: '#B0BEC5', eye: '#FFD700' } },
    { name: 'Copper',       colors: { body: '#BF360C', fin: '#5D4037', accent: '#FFE0B2', eye: '#FFD700' } },
    { name: 'Platinum',     colors: { body: '#CFD8DC', fin: '#B0BEC5', accent: '#FFFFFF', eye: '#455A64' } },
  ],
  // ── Platy (Tier 0) — Compact, friendly beginner fish ──
  'platy': [
    { name: 'Sunset',       colors: { body: '#FF7043', fin: '#E64A19', accent: '#FFAB91', eye: '#1B1B1B' } },
    { name: 'Tuxedo',       colors: { body: '#263238', fin: '#1B1B1B', accent: '#FF8A65', eye: '#E0E0E0' } },
    { name: 'Gold',         colors: { body: '#FFD600', fin: '#F9A825', accent: '#FFF176', eye: '#1B1B1B' } },
    { name: 'Cobalt',       colors: { body: '#1E88E5', fin: '#0D47A1', accent: '#90CAF9', eye: '#1B1B1B' } },
    { name: 'Coral',        colors: { body: '#EF5350', fin: '#C62828', accent: '#FFCDD2', eye: '#1B1B1B' } },
    { name: 'Pineapple',    colors: { body: '#FFB300', fin: '#4E342E', accent: '#FFF59D', eye: '#1B1B1B' } },
  ],
  // ── Danio (Tier 0) — Sleek striped nano fish ──
  'danio': [
    { name: 'Zebra',        colors: { body: '#5C6BC0', fin: '#3949AB', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Leopard',      colors: { body: '#7986CB', fin: '#3949AB', accent: '#FFEB3B', eye: '#1B1B1B' } },
    { name: 'Pearl',        colors: { body: '#B0BEC5', fin: '#78909C', accent: '#E0F7FA', eye: '#1B1B1B' } },
    { name: 'Glo Blue',     colors: { body: '#00E5FF', fin: '#006064', accent: '#E0FFFF', eye: '#1B1B1B' } },
    { name: 'Glo Pink',     colors: { body: '#FF4081', fin: '#C51162', accent: '#FCE4EC', eye: '#1B1B1B' } },
    { name: 'Gold',         colors: { body: '#FFA726', fin: '#E65100', accent: '#FFF9C4', eye: '#1B1B1B' } },
  ],
  // ── Minnow (Tier 0) — Simple freshwater fish ──
  'minnow': [
    { name: 'Silver',       colors: { body: '#B0BEC5', fin: '#78909C', accent: '#ECEFF1', eye: '#1B1B1B' } },
    { name: 'Rosy Red',     colors: { body: '#FF8A65', fin: '#E64A19', accent: '#FFCCBC', eye: '#1B1B1B' } },
    { name: 'Fathead',      colors: { body: '#8D6E63', fin: '#4E342E', accent: '#D7CCC8', eye: '#1B1B1B' } },
    { name: 'Creek',        colors: { body: '#66BB6A', fin: '#388E3C', accent: '#C8E6C9', eye: '#1B1B1B' } },
    { name: 'White',        colors: { body: '#F5F5F5', fin: '#BDBDBD', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Bronze',       colors: { body: '#A1887F', fin: '#5D4037', accent: '#D7CCC8', eye: '#1B1B1B' } },
  ],
  // ── Rasbora (Tier 0) — Tiny schooling torpedo ──
  'rasbora': [
    { name: 'Harlequin',    colors: { body: '#FF7043', fin: '#BF360C', accent: '#1B1B1B', eye: '#1B1B1B' } },
    { name: 'Chili',         colors: { body: '#D32F2F', fin: '#B71C1C', accent: '#FF8A80', eye: '#1B1B1B' } },
    { name: 'Galaxy',        colors: { body: '#1A237E', fin: '#0D47A1', accent: '#FFD54F', eye: '#E0E0E0' } },
    { name: 'Emerald',       colors: { body: '#2E7D32', fin: '#1B5E20', accent: '#A5D6A7', eye: '#1B1B1B' } },
    { name: 'Platinum',      colors: { body: '#CFD8DC', fin: '#78909C', accent: '#ECEFF1', eye: '#455A64' } },
    { name: 'Neon',           colors: { body: '#00E676', fin: '#00897B', accent: '#76FF03', eye: '#1B1B1B' } },
  ],
  // ── Corydoras (Tier 1) — Armored catfish ──
  'corydoras': [
    { name: 'Peppered',      colors: { body: '#8D6E63', fin: '#5D4037', accent: '#D7CCC8', eye: '#1B1B1B' } },
    { name: 'Albino',         colors: { body: '#FFECB3', fin: '#FFD54F', accent: '#FFFFFF', eye: '#EF5350' } },
    { name: 'Panda',          colors: { body: '#EFEBE9', fin: '#263238', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Bronze',         colors: { body: '#A1887F', fin: '#6D4C41', accent: '#BCAAA4', eye: '#1B1B1B' } },
    { name: 'Sterbai',        colors: { body: '#37474F', fin: '#FF8F00', accent: '#78909C', eye: '#FFD700' } },
    { name: 'Julii',          colors: { body: '#B0BEC5', fin: '#455A64', accent: '#ECEFF1', eye: '#1B1B1B' } },
  ],
  // ── Discus (Tier 2) — Disc-shaped king of aquaria ──
  'discus': [
    { name: 'Red Turquoise', colors: { body: '#00ACC1', fin: '#D32F2F', accent: '#80DEEA', eye: '#D32F2F' } },
    { name: 'Pigeon Blood',  colors: { body: '#FFCC80', fin: '#D32F2F', accent: '#FFF8E1', eye: '#D32F2F' } },
    { name: 'Cobalt Blue',   colors: { body: '#1565C0', fin: '#0D47A1', accent: '#42A5F5', eye: '#FFD700' } },
    { name: 'Leopard',        colors: { body: '#FFB300', fin: '#D32F2F', accent: '#FFF176', eye: '#D32F2F' } },
    { name: 'Snow White',    colors: { body: '#FFFFFF', fin: '#ECEFF1', accent: '#FFFFFF', eye: '#D32F2F' } },
    { name: 'Green',          colors: { body: '#2E7D32', fin: '#1B5E20', accent: '#69F0AE', eye: '#FFD700' } },
  ],
  // ── Butterflyfish (Tier 3) — Tall body with eyespot ──
  'butterflyfish': [
    { name: 'Copperband',    colors: { body: '#FFFFFF', fin: '#FF8F00', accent: '#FFE0B2', eye: '#1B1B1B' } },
    { name: 'Racoon',         colors: { body: '#FFD54F', fin: '#263238', accent: '#FFF8E1', eye: '#1B1B1B' } },
    { name: 'Longnose',       colors: { body: '#FFD600', fin: '#1B1B1B', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Bannerfish',     colors: { body: '#FFFFFF', fin: '#263238', accent: '#FFD54F', eye: '#1B1B1B' } },
    { name: 'Threadfin',      colors: { body: '#ECEFF1', fin: '#FFD54F', accent: '#FFFFFF', eye: '#263238' } },
    { name: 'Sunset',         colors: { body: '#FF8A65', fin: '#263238', accent: '#FFCCBC', eye: '#1B1B1B' } },
  ],
  // ── Moorish Idol (Tier 4) — Iconic reef fish with dorsal streamer ──
  'moorish-idol': [
    { name: 'Classic',        colors: { body: '#FFD600', fin: '#263238', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Midnight',       colors: { body: '#263238', fin: '#1B1B1B', accent: '#FFD600', eye: '#FFD700' } },
    { name: 'Pearl',           colors: { body: '#ECEFF1', fin: '#455A64', accent: '#FFFFFF', eye: '#455A64' } },
    { name: 'Coral',           colors: { body: '#FF7043', fin: '#263238', accent: '#FFCCBC', eye: '#1B1B1B' } },
    { name: 'Ocean',           colors: { body: '#42A5F5', fin: '#0D47A1', accent: '#FFFFFF', eye: '#FFD700' } },
    { name: 'Royal',           colors: { body: '#7B1FA2', fin: '#4A148C', accent: '#FFD600', eye: '#FFD700' } },
  ],
  // ── Mandarin Dragonet (Tier 5) — Psychedelic dragonet ──
  'mandarin': [
    { name: 'Classic',        colors: { body: '#FF6D00', fin: '#1565C0', accent: '#00E676', eye: '#1B1B1B' } },
    { name: 'Spotted',        colors: { body: '#FF8F00', fin: '#00897B', accent: '#FFD600', eye: '#1B1B1B' } },
    { name: 'Red',             colors: { body: '#D32F2F', fin: '#B71C1C', accent: '#FF8A80', eye: '#FFD700' } },
    { name: 'Psychedelic',    colors: { body: '#E040FB', fin: '#AA00FF', accent: '#76FF03', eye: '#FFD700' } },
    { name: 'Green',           colors: { body: '#00C853', fin: '#00897B', accent: '#FF6D00', eye: '#1B1B1B' } },
    { name: 'Nebula',          colors: { body: '#311B92', fin: '#1A237E', accent: '#E040FB', eye: '#E040FB' } },
  ],
  // ── Seahorse (Standalone Deluxe) — Upright swimmer ──
  'seahorse': [
    { name: 'Pygmy',           colors: { body: '#FF7043', fin: '#E64A19', accent: '#FFAB91', eye: '#1B1B1B' } },
    { name: 'Lined',           colors: { body: '#FFD54F', fin: '#4E342E', accent: '#FFF8E1', eye: '#1B1B1B' } },
    { name: 'Thorny',          colors: { body: '#8D6E63', fin: '#3E2723', accent: '#D7CCC8', eye: '#FFD700' } },
    { name: 'Pacific',         colors: { body: '#42A5F5', fin: '#0D47A1', accent: '#90CAF9', eye: '#1B1B1B' } },
    { name: 'Weedy',           colors: { body: '#66BB6A', fin: '#2E7D32', accent: '#A5D6A7', eye: '#1B1B1B' } },
    { name: 'Ghost',           colors: { body: '#ECEFF1', fin: '#B0BEC5', accent: '#FFFFFF', eye: '#78909C' } },
  ],
  // ── Shrimp (Standalone Deluxe) — Crustacean king ──
  'shrimp': [
    { name: 'Cherry',          colors: { body: '#D32F2F', fin: '#B71C1C', accent: '#FFCDD2', eye: '#1B1B1B' } },
    { name: 'Crystal Red',    colors: { body: '#FFFFFF', fin: '#D32F2F', accent: '#FFCDD2', eye: '#1B1B1B' } },
    { name: 'Blue Dream',     colors: { body: '#1565C0', fin: '#0D47A1', accent: '#90CAF9', eye: '#1B1B1B' } },
    { name: 'Amano',           colors: { body: '#CFD8DC', fin: '#78909C', accent: '#ECEFF1', eye: '#455A64' } },
    { name: 'Golden Bee',     colors: { body: '#FFD600', fin: '#F9A825', accent: '#FFF9C4', eye: '#1B1B1B' } },
    { name: 'Black Rose',     colors: { body: '#263238', fin: '#1B1B1B', accent: '#455A64', eye: '#E0E0E0' } },
  ],
  // ── Pufferfish (Standalone Deluxe) — Inflatable wonder ──
  'pufferfish': [
    { name: 'Spotted',         colors: { body: '#FFD54F', fin: '#4E342E', accent: '#FFF8E1', eye: '#1B1B1B' } },
    { name: 'Porcupine',      colors: { body: '#A1887F', fin: '#5D4037', accent: '#D7CCC8', eye: '#FFD700' } },
    { name: 'Fahaka',          colors: { body: '#8D6E63', fin: '#3E2723', accent: '#FFD600', eye: '#FFD700' } },
    { name: 'Amazon',          colors: { body: '#66BB6A', fin: '#2E7D32', accent: '#C8E6C9', eye: '#1B1B1B' } },
    { name: 'Dwarf',           colors: { body: '#FFB300', fin: '#E65100', accent: '#FFF176', eye: '#1B1B1B' } },
    { name: 'Mbu',              colors: { body: '#37474F', fin: '#263238', accent: '#FFD54F', eye: '#FFD700' } },
  ],
  // ── Jellyfish (Standalone Deluxe) — Ethereal drifter ──
  'jellyfish': [
    { name: 'Moon',             colors: { body: '#B0BEC5', fin: '#78909C', accent: '#ECEFF1', eye: '#78909C' } },
    { name: 'Crystal',          colors: { body: '#80DEEA', fin: '#00ACC1', accent: '#E0F7FA', eye: '#006064' } },
    { name: 'Blue Fire',       colors: { body: '#1565C0', fin: '#0D47A1', accent: '#E040FB', eye: '#E040FB' } },
    { name: 'Pink',             colors: { body: '#F48FB1', fin: '#EC407A', accent: '#FCE4EC', eye: '#AD1457' } },
    { name: 'Aurora',           colors: { body: '#00E676', fin: '#00897B', accent: '#E040FB', eye: '#76FF03' } },
    { name: 'Deep Sea',        colors: { body: '#311B92', fin: '#1A237E', accent: '#B388FF', eye: '#E040FB' } },
  ],
  // ── Stingray (Standalone Deluxe) — Flat ocean glider ──
  'stingray': [
    { name: 'Blue Spotted',   colors: { body: '#78909C', fin: '#546E7A', accent: '#42A5F5', eye: '#1B1B1B' } },
    { name: 'Manta',           colors: { body: '#263238', fin: '#1B1B1B', accent: '#ECEFF1', eye: '#E0E0E0' } },
    { name: 'Southern',        colors: { body: '#A1887F', fin: '#6D4C41', accent: '#D7CCC8', eye: '#1B1B1B' } },
    { name: 'Electric',        colors: { body: '#6D4C41', fin: '#3E2723', accent: '#FFD600', eye: '#FFD700' } },
    { name: 'Marble',          colors: { body: '#ECEFF1', fin: '#78909C', accent: '#CFD8DC', eye: '#455A64' } },
    { name: 'Cownose',        colors: { body: '#FF8A65', fin: '#BF360C', accent: '#FFCCBC', eye: '#1B1B1B' } },
  ],
  // ── Axolotl (Standalone Deluxe) — Smiling salamander ──
  'axolotl': [
    { name: 'Leucistic',      colors: { body: '#FFECB3', fin: '#FF7043', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Wild',             colors: { body: '#4E342E', fin: '#3E2723', accent: '#795548', eye: '#FFD700' } },
    { name: 'Golden',          colors: { body: '#FFD600', fin: '#FF8F00', accent: '#FFF176', eye: '#1B1B1B' } },
    { name: 'Melanoid',       colors: { body: '#1B1B1B', fin: '#263238', accent: '#37474F', eye: '#E0E0E0' } },
    { name: 'GFP',              colors: { body: '#76FF03', fin: '#00E676', accent: '#CCFF90', eye: '#1B1B1B' } },
    { name: 'Copper',          colors: { body: '#D84315', fin: '#8D6E63', accent: '#FFCC80', eye: '#FFD700' } },
  ],
  // ── Nautilus (Standalone Deluxe) — Living fossil ──
  'nautilus': [
    { name: 'Chambered',      colors: { body: '#FFCC80', fin: '#5D4037', accent: '#FFF8E1', eye: '#1B1B1B' } },
    { name: 'Emperor',         colors: { body: '#6D4C41', fin: '#3E2723', accent: '#FFD54F', eye: '#FFD700' } },
    { name: 'Palau',            colors: { body: '#FF8A65', fin: '#BF360C', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Deep Sea',        colors: { body: '#1A237E', fin: '#0D47A1', accent: '#B388FF', eye: '#E040FB' } },
    { name: 'Fossil',           colors: { body: '#8D6E63', fin: '#4E342E', accent: '#A1887F', eye: '#FFD700' } },
    { name: 'Pearl',            colors: { body: '#EFEBE9', fin: '#BCAAA4', accent: '#FFFFFF', eye: '#795548' } },
  ],
  // ── Lionfish (Standalone Deluxe) — Ultimate premium ──
  'lionfish': [
    { name: 'Red',              colors: { body: '#D32F2F', fin: '#B71C1C', accent: '#FFCDD2', eye: '#FFD700' } },
    { name: 'Volitan',          colors: { body: '#8D6E63', fin: '#3E2723', accent: '#D7CCC8', eye: '#FFD700' } },
    { name: 'Zebra',            colors: { body: '#ECEFF1', fin: '#263238', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Fuzzy Dwarf',    colors: { body: '#FF7043', fin: '#4E342E', accent: '#FFAB91', eye: '#FFD700' } },
    { name: 'Antennata',       colors: { body: '#795548', fin: '#263238', accent: '#FFCC80', eye: '#FFD700' } },
    { name: 'Clearfin',        colors: { body: '#B0BEC5', fin: '#37474F', accent: '#ECEFF1', eye: '#FFD700' } },
  ],
  // ── Guppy variants share the tier color progression ──
  'guppy':         [
    { name: 'Meadow',    colors: { body: '#7CB342', fin: '#558B2F', accent: '#9CCC65', eye: '#1B1B1B' } },
    { name: 'Blaze',     colors: { body: '#E53935', fin: '#C62828', accent: '#FF7043', eye: '#1B1B1B' } },
    { name: 'Gilded',    colors: { body: '#FFB300', fin: '#FF8F00', accent: '#FFD54F', eye: '#1B1B1B' } },
    { name: 'Ember',     colors: { body: '#FF7043', fin: '#F4511E', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Sapphire',  colors: { body: '#42A5F5', fin: '#1E88E5', accent: '#FFEE58', eye: '#1B1B1B' } },
    { name: 'Amethyst',  colors: { body: '#AB47BC', fin: '#7B1FA2', accent: '#CE93D8', eye: '#FFD700' } },
  ],
  'swift-guppy':   [
    { name: 'Meadow',    colors: { body: '#7CB342', fin: '#558B2F', accent: '#9CCC65', eye: '#1B1B1B' } },
    { name: 'Blaze',     colors: { body: '#E53935', fin: '#C62828', accent: '#FF7043', eye: '#1B1B1B' } },
    { name: 'Gilded',    colors: { body: '#FFB300', fin: '#FF8F00', accent: '#FFD54F', eye: '#1B1B1B' } },
    { name: 'Ember',     colors: { body: '#FF7043', fin: '#F4511E', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Sapphire',  colors: { body: '#42A5F5', fin: '#1E88E5', accent: '#FFEE58', eye: '#1B1B1B' } },
    { name: 'Amethyst',  colors: { body: '#AB47BC', fin: '#7B1FA2', accent: '#CE93D8', eye: '#FFD700' } },
  ],
  'fancy-guppy':   [
    { name: 'Meadow',    colors: { body: '#7CB342', fin: '#558B2F', accent: '#9CCC65', eye: '#1B1B1B' } },
    { name: 'Blaze',     colors: { body: '#E53935', fin: '#C62828', accent: '#FF7043', eye: '#1B1B1B' } },
    { name: 'Gilded',    colors: { body: '#FFB300', fin: '#FF8F00', accent: '#FFD54F', eye: '#1B1B1B' } },
    { name: 'Ember',     colors: { body: '#FF7043', fin: '#F4511E', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Sapphire',  colors: { body: '#42A5F5', fin: '#1E88E5', accent: '#FFEE58', eye: '#1B1B1B' } },
    { name: 'Amethyst',  colors: { body: '#AB47BC', fin: '#7B1FA2', accent: '#CE93D8', eye: '#FFD700' } },
  ],
  'delta-guppy':   [
    { name: 'Meadow',    colors: { body: '#7CB342', fin: '#558B2F', accent: '#9CCC65', eye: '#1B1B1B' } },
    { name: 'Blaze',     colors: { body: '#E53935', fin: '#C62828', accent: '#FF7043', eye: '#1B1B1B' } },
    { name: 'Gilded',    colors: { body: '#FFB300', fin: '#FF8F00', accent: '#FFD54F', eye: '#1B1B1B' } },
    { name: 'Ember',     colors: { body: '#FF7043', fin: '#F4511E', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Sapphire',  colors: { body: '#42A5F5', fin: '#1E88E5', accent: '#FFEE58', eye: '#1B1B1B' } },
    { name: 'Amethyst',  colors: { body: '#AB47BC', fin: '#7B1FA2', accent: '#CE93D8', eye: '#FFD700' } },
  ],
  'veil-guppy':    [
    { name: 'Meadow',    colors: { body: '#7CB342', fin: '#558B2F', accent: '#9CCC65', eye: '#1B1B1B' } },
    { name: 'Blaze',     colors: { body: '#E53935', fin: '#C62828', accent: '#FF7043', eye: '#1B1B1B' } },
    { name: 'Gilded',    colors: { body: '#FFB300', fin: '#FF8F00', accent: '#FFD54F', eye: '#1B1B1B' } },
    { name: 'Ember',     colors: { body: '#FF7043', fin: '#F4511E', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Sapphire',  colors: { body: '#42A5F5', fin: '#1E88E5', accent: '#FFEE58', eye: '#1B1B1B' } },
    { name: 'Amethyst',  colors: { body: '#AB47BC', fin: '#7B1FA2', accent: '#CE93D8', eye: '#FFD700' } },
  ],
  'supreme-guppy': [
    { name: 'Meadow',    colors: { body: '#7CB342', fin: '#558B2F', accent: '#9CCC65', eye: '#1B1B1B' } },
    { name: 'Blaze',     colors: { body: '#E53935', fin: '#C62828', accent: '#FF7043', eye: '#1B1B1B' } },
    { name: 'Gilded',    colors: { body: '#FFB300', fin: '#FF8F00', accent: '#FFD54F', eye: '#1B1B1B' } },
    { name: 'Ember',     colors: { body: '#FF7043', fin: '#F4511E', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Sapphire',  colors: { body: '#42A5F5', fin: '#1E88E5', accent: '#FFEE58', eye: '#1B1B1B' } },
    { name: 'Amethyst',  colors: { body: '#AB47BC', fin: '#7B1FA2', accent: '#CE93D8', eye: '#FFD700' } },
  ],
}

export type FishPattern = 'none' | 'scales' | 'fine-scales' | 'armored' | 'shimmer' | 'koi'

export type FishSpecies =
  | 'guppy' | 'swift-guppy' | 'fancy-guppy' | 'delta-guppy' | 'veil-guppy' | 'supreme-guppy'
  | 'endler' | 'molly' | 'platy' | 'danio' | 'minnow' | 'rasbora'
  | 'neon-tetra' | 'ember-tetra' | 'diamond-tetra' | 'rummy-tetra' | 'serpae-tetra' | 'glowlight-tetra' | 'corydoras'
  | 'angelfish' | 'marble-angelfish' | 'koi-angelfish' | 'platinum-angelfish' | 'zebra-angelfish' | 'veil-angelfish' | 'discus'
  | 'clownfish' | 'tomato-clownfish' | 'maroon-clownfish' | 'saddleback-clownfish' | 'cinnamon-clownfish' | 'snowflake-clownfish' | 'butterflyfish'
  | 'tang' | 'yellow-tang' | 'powder-tang' | 'achilles-tang' | 'naso-tang' | 'sailfin-tang' | 'moorish-idol'
  | 'betta' | 'crown-betta' | 'halfmoon-betta' | 'plakat-betta' | 'galaxy-betta' | 'dragon-betta' | 'mandarin'
  | 'seahorse' | 'shrimp' | 'pufferfish' | 'jellyfish' | 'stingray' | 'axolotl' | 'nautilus' | 'lionfish'

// Guppy variants all unlock at tier 0 but retain their visual appearance
// Use GUPPY_VISUAL_TIER for rendering the correct SVG shape
const GUPPY_VISUAL_TIER: Record<string, FishTier> = {
  'guppy': 0,
  'swift-guppy': 1,
  'fancy-guppy': 2,
  'delta-guppy': 3,
  'veil-guppy': 4,
  'supreme-guppy': 5,
}

const SPECIES_TO_TIER: Record<FishSpecies, FishTier> = {
  'guppy': 0, 'swift-guppy': 0, 'fancy-guppy': 0, 'delta-guppy': 0, 'veil-guppy': 0, 'supreme-guppy': 0,
  'endler': 0, 'molly': 0, 'platy': 0, 'danio': 0, 'minnow': 0, 'rasbora': 0,
  'neon-tetra': 1, 'ember-tetra': 1, 'diamond-tetra': 1, 'rummy-tetra': 1, 'serpae-tetra': 1, 'glowlight-tetra': 1, 'corydoras': 1,
  'angelfish': 2, 'marble-angelfish': 2, 'koi-angelfish': 2, 'platinum-angelfish': 2, 'zebra-angelfish': 2, 'veil-angelfish': 2, 'discus': 2,
  'clownfish': 3, 'tomato-clownfish': 3, 'maroon-clownfish': 3, 'saddleback-clownfish': 3, 'cinnamon-clownfish': 3, 'snowflake-clownfish': 3, 'butterflyfish': 3,
  'tang': 4, 'yellow-tang': 4, 'powder-tang': 4, 'achilles-tang': 4, 'naso-tang': 4, 'sailfin-tang': 4, 'moorish-idol': 4,
  'betta': 5, 'crown-betta': 5, 'halfmoon-betta': 5, 'plakat-betta': 5, 'galaxy-betta': 5, 'dragon-betta': 5, 'mandarin': 5,
  // Standalone deluxe — mapped to tiers for rendering, but unlock via custom scores
  'shrimp': 2, 'seahorse': 3, 'pufferfish': 4, 'jellyfish': 5, 'stingray': 5, 'axolotl': 5, 'nautilus': 5, 'lionfish': 5,
}

// Body clip paths per species — patterns are clipped to these shapes
const BODY_CLIPS: Record<string, string> = {
  // Guppy variants (tier-based keys for backward compat)
  0: 'M8 19 Q8 7 26 7 Q44 7 44 19 Q44 31 26 31 Q8 31 8 19 Z',
  1: 'M8 21 Q8 8 28 8 Q48 8 48 21 Q48 34 28 34 Q8 34 8 21 Z',
  2: 'M8 23 Q8 8.5 30 8.5 Q52 8.5 52 23 Q52 37.5 30 37.5 Q8 37.5 8 23 Z',
  3: 'M8 25 Q8 9 32 9 Q56 9 56 25 Q56 41 32 41 Q8 41 8 25 Z',
  4: 'M8 28 Q8 11 34 11 Q60 11 60 28 Q60 45 34 45 Q8 45 8 28 Z',
  5: 'M8 32 Q8 13 36 13 Q64 13 64 32 Q64 51 36 51 Q8 51 8 32 Z',
  // Tier 0 alternate species
  'endler': 'M6 17 Q6 6 22 6 Q38 6 38 17 Q38 28 22 28 Q6 28 6 17 Z',
  'molly': 'M6 19 Q6 5 24 5 Q42 5 42 19 Q42 33 24 33 Q6 33 6 19 Z',
  'platy': 'M5 18 Q5 5 22 5 Q40 5 40 18 Q40 31 22 31 Q5 31 5 18 Z',
  'danio': 'M5 17 Q5 7 18 6 Q36 5 44 12 Q48 15 44 22 Q36 29 18 28 Q5 27 5 17 Z',
  'minnow': 'M4 16 Q4 8 16 7 Q30 6 40 11 Q44 14 40 20 Q30 25 16 24 Q4 23 4 16 Z',
  // Tier 1 — Tetra variations (all use neon-tetra clip)
  'neon-tetra': 'M8 19 Q8 8 28 8 Q48 8 48 19 Q48 30 28 30 Q8 30 8 19 Z',
  'ember-tetra': 'M8 19 Q8 6 26 6 Q44 6 44 19 Q44 32 26 32 Q8 32 8 19 Z',
  'diamond-tetra': 'M8 21 Q8 7 30 7 Q52 7 52 21 Q52 35 30 35 Q8 35 8 21 Z',
  'rummy-tetra': 'M8 19 Q8 9 30 9 Q52 9 52 19 Q52 29 30 29 Q8 29 8 19 Z',
  'serpae-tetra': 'M8 20 Q8 7 26 7 Q48 7 48 20 Q48 35 26 35 Q8 35 8 20 Z',
  'glowlight-tetra': 'M8 18 Q8 8 28 8 Q48 8 48 18 Q48 28 28 28 Q8 28 8 18 Z',
  // Tier 2 — Angelfish variations (all use angelfish clip)
  'angelfish': 'M10 32 Q10 14 28 14 Q50 14 50 32 Q50 52 28 52 Q10 52 10 32 Z',
  'marble-angelfish': 'M10 32 Q10 14 28 14 Q50 14 50 32 Q50 52 28 52 Q10 52 10 32 Z',
  'koi-angelfish': 'M10 32 Q10 14 28 14 Q50 14 50 32 Q50 52 28 52 Q10 52 10 32 Z',
  'platinum-angelfish': 'M10 32 Q10 14 30 14 Q54 14 54 32 Q54 52 30 52 Q10 52 10 32 Z',
  'zebra-angelfish': 'M10 32 Q10 16 26 16 Q48 16 48 32 Q48 50 26 50 Q10 50 10 32 Z',
  'veil-angelfish': 'M10 35 Q10 18 28 18 Q50 18 50 35 Q50 54 28 54 Q10 54 10 35 Z',
  // Tier 3 — Clownfish variations (all use clownfish clip)
  'clownfish': 'M6 24 Q6 8 30 8 Q54 8 54 24 Q54 40 30 40 Q6 40 6 24 Z',
  'tomato-clownfish': 'M6 25 Q6 7 28 7 Q50 7 50 25 Q50 43 28 43 Q6 43 6 25 Z',
  'maroon-clownfish': 'M8 28 Q8 10 32 10 Q56 10 56 28 Q56 46 32 46 Q8 46 8 28 Z',
  'saddleback-clownfish': 'M8 25 Q8 9 34 9 Q60 9 60 25 Q60 41 34 41 Q8 41 8 25 Z',
  'cinnamon-clownfish': 'M6 24 Q6 8 30 8 Q54 8 54 24 Q54 40 30 40 Q6 40 6 24 Z',
  'snowflake-clownfish': 'M6 24 Q6 8 30 8 Q54 8 54 24 Q54 40 30 40 Q6 40 6 24 Z',
  // Tier 4 — Tang variations (all use tang clip)
  'tang': 'M8 34 Q8 12 36 12 Q64 12 64 34 Q64 56 36 56 Q8 56 8 34 Z',
  'yellow-tang': 'M8 32 Q8 10 32 10 Q58 10 58 32 Q58 54 32 54 Q8 54 8 32 Z',
  'powder-tang': 'M8 34 Q8 12 36 12 Q64 12 64 34 Q64 56 36 56 Q8 56 8 34 Z',
  'achilles-tang': 'M8 34 Q8 14 30 10 Q58 10 64 24 Q64 44 58 50 Q30 58 8 54 Q8 44 8 34 Z',
  'naso-tang': 'M8 36 Q8 14 38 14 Q66 14 66 36 Q66 58 38 58 Q8 58 8 36 Z',
  'sailfin-tang': 'M8 40 Q8 18 36 18 Q64 18 64 40 Q64 62 36 62 Q8 62 8 40 Z',
  // Tier 5 — Betta variations (all use betta clip)
  'betta': 'M8 24 Q8 9 28 9 Q48 9 48 24 Q48 39 28 39 Q8 39 8 24 Z',
  'crown-betta': 'M8 26 Q8 11 28 11 Q48 11 48 26 Q48 41 28 41 Q8 41 8 26 Z',
  'halfmoon-betta': 'M8 28 Q8 13 28 13 Q48 13 48 28 Q48 43 28 43 Q8 43 8 28 Z',
  'plakat-betta': 'M6 22 Q6 7 28 7 Q50 7 50 22 Q50 37 28 37 Q6 37 6 22 Z',
  'galaxy-betta': 'M8 24 Q8 9 28 9 Q48 9 48 24 Q48 39 28 39 Q8 39 8 24 Z',
  'dragon-betta': 'M8 26 Q8 9 30 9 Q52 9 52 26 Q52 43 30 43 Q8 43 8 26 Z',
  // New tier species
  'rasbora': 'M4 15 Q4 7 14 6 Q28 5 38 10 Q42 14 38 20 Q28 25 14 24 Q4 23 4 15 Z',
  'corydoras': 'M6 20 Q6 10 16 8 Q28 6 40 12 Q44 18 40 28 Q28 32 16 32 Q6 30 6 20 Z',
  'discus': 'M6 32 Q6 8 30 8 Q54 8 54 32 Q54 56 30 56 Q6 56 6 32 Z',
  'butterflyfish': 'M6 29 Q6 10 34 10 Q54 10 54 29 Q54 48 34 48 Q6 48 6 29 Z',
  'moorish-idol': 'M12 40 Q12 16 38 16 Q58 16 58 40 Q58 64 38 64 Q12 64 12 40 Z',
  'mandarin': 'M6 24 Q6 10 24 8 Q42 6 54 16 Q58 22 54 28 Q42 36 24 36 Q6 34 6 24 Z',
  // Standalone deluxe species
  'seahorse': 'M8 20 Q8 8 18 6 Q26 6 26 20 Q26 40 18 50 Q8 50 8 40 Z',
  'shrimp': 'M8 14 Q8 6 24 6 Q40 6 52 14 Q56 22 52 30 Q40 34 24 34 Q8 30 8 22 Z',
  'pufferfish': 'M6 27 Q6 5 28 5 Q50 5 50 27 Q50 49 28 49 Q6 49 6 27 Z',
  'jellyfish': 'M5 18 Q5 6 25 4 Q45 6 45 18 Q45 28 25 30 Q5 28 5 18 Z',
  'stingray': 'M4 25 Q4 6 22 2 Q36 6 40 25 Q36 44 22 48 Q4 44 4 25 Z',
  'axolotl': 'M8 20 Q8 10 14 10 Q34 8 48 16 Q50 22 48 28 Q34 34 14 34 Q8 30 8 20 Z',
  'nautilus': 'M14 28 Q14 6 36 6 Q58 6 58 28 Q58 50 36 50 Q14 50 14 28 Z',
  'lionfish': 'M14 32 Q14 16 36 16 Q58 16 58 32 Q58 48 36 48 Q14 48 14 32 Z',
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
const PatternOverlay = memo(({ pattern, id, viewBox, tier, clipKey }: {
  pattern: FishPattern; id: string; viewBox: string; tier: FishTier; clipKey?: string
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
          <path d={BODY_CLIPS[clipKey || tier] || BODY_CLIPS[tier]} />
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

// Viewbox dimensions per species
const SPECIES_VIEWBOXES: Record<string, string> = {
  // Guppy variants (tier keys)
  0: '0 0 60 39',
  1: '0 0 66 43',
  2: '0 0 72 47',
  3: '0 0 78 51',
  4: '0 0 84 63',
  5: '0 0 92 72',
  // Tier 0
  'endler': '0 0 50 35',
  'molly': '0 0 56 39',
  'platy': '0 0 54 38',
  'danio': '0 0 58 34',
  'minnow': '0 0 52 32',
  // Tier 1 — Tetra variations
  'neon-tetra': '0 0 62 38',
  'ember-tetra': '0 0 58 38',
  'diamond-tetra': '0 0 66 43',
  'rummy-tetra': '0 0 66 38',
  'serpae-tetra': '0 0 60 41',
  'glowlight-tetra': '0 0 62 37',
  // Tier 2 — Angelfish variations
  'angelfish': '0 0 70 70',
  'marble-angelfish': '0 0 70 70',
  'koi-angelfish': '0 0 70 70',
  'platinum-angelfish': '0 0 74 70',
  'zebra-angelfish': '0 0 68 70',
  'veil-angelfish': '0 0 70 77',
  // Tier 3 — Clownfish variations
  'clownfish': '0 0 70 49',
  'tomato-clownfish': '0 0 68 50',
  'maroon-clownfish': '0 0 72 55',
  'saddleback-clownfish': '0 0 76 50',
  'cinnamon-clownfish': '0 0 70 49',
  'snowflake-clownfish': '0 0 70 49',
  // Tier 4 — Tang variations
  'tang': '0 0 82 67',
  'yellow-tang': '0 0 76 65',
  'powder-tang': '0 0 82 67',
  'achilles-tang': '0 0 82 67',
  'naso-tang': '0 0 86 70',
  'sailfin-tang': '0 0 82 78',
  // Tier 5 — Betta variations
  'betta': '0 0 76 56',
  'crown-betta': '0 0 80 59',
  'halfmoon-betta': '0 0 84 67',
  'plakat-betta': '0 0 68 46',
  'galaxy-betta': '0 0 76 56',
  'dragon-betta': '0 0 78 58',
  // New tier species
  'rasbora': '0 0 52 30',
  'corydoras': '0 0 58 42',
  'discus': '0 0 65 65',
  'butterflyfish': '0 0 68 58',
  'moorish-idol': '0 0 80 85',
  'mandarin': '0 0 72 50',
  // Standalone deluxe species
  'seahorse': '0 0 40 70',
  'shrimp': '0 0 65 40',
  'pufferfish': '0 0 60 55',
  'jellyfish': '0 0 50 75',
  'stingray': '0 0 75 50',
  'axolotl': '0 0 70 45',
  'nautilus': '0 0 60 58',
  'lionfish': '0 0 80 65',
}

// Aspect ratios per species
const SPECIES_ASPECTS: Record<string, number> = {
  0: 0.65, 1: 0.65, 2: 0.65, 3: 0.65, 4: 0.75, 5: 0.78,
  'endler': 0.7, 'molly': 0.7, 'platy': 0.7, 'danio': 0.59, 'minnow': 0.62,
  'neon-tetra': 0.61, 'ember-tetra': 0.65, 'diamond-tetra': 0.65, 'rummy-tetra': 0.58, 'serpae-tetra': 0.68, 'glowlight-tetra': 0.59,
  'angelfish': 1.0, 'marble-angelfish': 1.0, 'koi-angelfish': 1.0, 'platinum-angelfish': 0.95, 'zebra-angelfish': 1.03, 'veil-angelfish': 1.1,
  'clownfish': 0.7, 'tomato-clownfish': 0.74, 'maroon-clownfish': 0.76, 'saddleback-clownfish': 0.66, 'cinnamon-clownfish': 0.7, 'snowflake-clownfish': 0.7,
  'tang': 0.82, 'yellow-tang': 0.85, 'powder-tang': 0.82, 'achilles-tang': 0.82, 'naso-tang': 0.82, 'sailfin-tang': 0.95,
  'betta': 0.74, 'crown-betta': 0.74, 'halfmoon-betta': 0.8, 'plakat-betta': 0.68, 'galaxy-betta': 0.74, 'dragon-betta': 0.74,
  // New tier species
  'rasbora': 0.58, 'corydoras': 0.72, 'discus': 1.0, 'butterflyfish': 0.85, 'moorish-idol': 1.06, 'mandarin': 0.69,
  // Standalone deluxe species
  'seahorse': 1.75, 'shrimp': 0.62, 'pufferfish': 0.92, 'jellyfish': 1.5, 'stingray': 0.67, 'axolotl': 0.64, 'nautilus': 0.97, 'lionfish': 0.81,
}

export const FishSVG = memo(({ tier, size = 48, customColors, customization, id }: FishSVGProps) => {
  // Determine which species to render: customization species override > tier default
  const species = customization?.species || null
  let renderTier = tier
  if (species) {
    // For guppy variants, use visual tier (preserves SVG shape) not unlock tier
    const isGuppyVariant = species in GUPPY_VISUAL_TIER
    renderTier = isGuppyVariant ? GUPPY_VISUAL_TIER[species] : SPECIES_TO_TIER[species]
  }

  // Merge colors: tier defaults < customColors prop < customization colors
  const colors = {
    ...TIER_COLORS[renderTier],
    ...customColors,
    ...(customization?.colors || {}),
  }
  const pattern = customization?.pattern || 'none'
  const gradientId = id || `fish-${tier}-${size}`

  // Check if this is an alternate (non-guppy) species
  const isAlternateSpecies = species && !species.includes('guppy')
  const speciesKey = isAlternateSpecies ? species : String(renderTier)

  const fishElement = (() => {
    // Alternate species rendering
    if (isAlternateSpecies) {
      switch (species) {
        // Tier 0 — Base species
        case 'endler': return <EndlerFish colors={colors} size={size} id={gradientId} />
        case 'molly': return <MollyFish colors={colors} size={size} id={gradientId} />
        case 'platy': return <PlatyFish colors={colors} size={size} id={gradientId} />
        case 'danio': return <DanioFish colors={colors} size={size} id={gradientId} />
        case 'minnow': return <MinnowFish colors={colors} size={size} id={gradientId} />
        // Tier 1 — Tetra variations (all render as NeonTetra base)
        case 'neon-tetra': return <NeonTetra colors={colors} size={size} id={gradientId} />
        case 'ember-tetra': return <EmberTetra colors={colors} size={size} id={gradientId} />
        case 'diamond-tetra': return <DiamondTetra colors={colors} size={size} id={gradientId} />
        case 'rummy-tetra': return <RummyTetra colors={colors} size={size} id={gradientId} />
        case 'serpae-tetra': return <SerpaeTetra colors={colors} size={size} id={gradientId} />
        case 'glowlight-tetra': return <GlowlightTetra colors={colors} size={size} id={gradientId} />
        // Tier 2 — Angelfish variations
        case 'angelfish': return <AngelfishFish colors={colors} size={size} id={gradientId} />
        case 'marble-angelfish': return <MarbleAngelfish colors={colors} size={size} id={gradientId} />
        case 'koi-angelfish': return <KoiAngelfish colors={colors} size={size} id={gradientId} />
        case 'platinum-angelfish': return <PlatinumAngelfish colors={colors} size={size} id={gradientId} />
        case 'zebra-angelfish': return <ZebraAngelfish colors={colors} size={size} id={gradientId} />
        case 'veil-angelfish': return <VeilAngelfish colors={colors} size={size} id={gradientId} />
        // Tier 3 — Clownfish variations
        case 'clownfish': return <ClownfishFish colors={colors} size={size} id={gradientId} />
        case 'tomato-clownfish': return <TomatoClownfish colors={colors} size={size} id={gradientId} />
        case 'maroon-clownfish': return <MaroonClownfish colors={colors} size={size} id={gradientId} />
        case 'saddleback-clownfish': return <SaddlebackClownfish colors={colors} size={size} id={gradientId} />
        case 'cinnamon-clownfish': return <CinnamonClownfish colors={colors} size={size} id={gradientId} />
        case 'snowflake-clownfish': return <SnowflakeClownfish colors={colors} size={size} id={gradientId} />
        // Tier 4 — Tang variations
        case 'tang': return <TangFish colors={colors} size={size} id={gradientId} />
        case 'yellow-tang': return <YellowTang colors={colors} size={size} id={gradientId} />
        case 'powder-tang': return <PowderTang colors={colors} size={size} id={gradientId} />
        case 'achilles-tang': return <AchillesTang colors={colors} size={size} id={gradientId} />
        case 'naso-tang': return <NasoTang colors={colors} size={size} id={gradientId} />
        case 'sailfin-tang': return <SailfinTang colors={colors} size={size} id={gradientId} />
        // Tier 5 — Betta variations
        case 'betta': return <BettaFish colors={colors} size={size} id={gradientId} />
        case 'crown-betta': return <CrownBetta colors={colors} size={size} id={gradientId} />
        case 'halfmoon-betta': return <HalfmoonBetta colors={colors} size={size} id={gradientId} />
        case 'plakat-betta': return <PlacatBetta colors={colors} size={size} id={gradientId} />
        case 'galaxy-betta': return <GalaxyBetta colors={colors} size={size} id={gradientId} />
        case 'dragon-betta': return <DragonBetta colors={colors} size={size} id={gradientId} />
        // New tier species
        case 'rasbora': return <RasboraFish colors={colors} size={size} id={gradientId} />
        case 'corydoras': return <CorydorasFish colors={colors} size={size} id={gradientId} />
        case 'discus': return <DiscusFish colors={colors} size={size} id={gradientId} />
        case 'butterflyfish': return <ButterflyfishFish colors={colors} size={size} id={gradientId} />
        case 'moorish-idol': return <MoorishIdolFish colors={colors} size={size} id={gradientId} />
        case 'mandarin': return <MandarinFish colors={colors} size={size} id={gradientId} />
        // Standalone deluxe species
        case 'seahorse': return <SeahorseFish colors={colors} size={size} id={gradientId} />
        case 'shrimp': return <ShrimpFish colors={colors} size={size} id={gradientId} />
        case 'pufferfish': return <PufferfishFish colors={colors} size={size} id={gradientId} />
        case 'jellyfish': return <JellyfishFish colors={colors} size={size} id={gradientId} />
        case 'stingray': return <StingrayFish colors={colors} size={size} id={gradientId} />
        case 'axolotl': return <AxolotlFish colors={colors} size={size} id={gradientId} />
        case 'nautilus': return <NautilusFish colors={colors} size={size} id={gradientId} />
        case 'lionfish': return <LionfishFish colors={colors} size={size} id={gradientId} />
      }
    }
    // Default guppy variants
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
  const vb = SPECIES_VIEWBOXES[speciesKey] || SPECIES_VIEWBOXES[String(renderTier)]
  const aspect = SPECIES_ASPECTS[speciesKey] || SPECIES_ASPECTS[String(renderTier)] || 0.65
  const clipKey = isAlternateSpecies ? species : renderTier

  return (
    <div className="relative inline-block">
      {fishElement}
      <svg
        width={size}
        height={size * aspect}
        viewBox={vb}
        className="absolute inset-0 pointer-events-none"
      >
        <PatternOverlay pattern={pattern} id={gradientId} viewBox={vb} tier={renderTier} clipKey={String(clipKey)} />
      </svg>
    </div>
  )
})
FishSVG.displayName = 'FishSVG'

export { TIER_COLORS, SPECIES_TO_TIER, SPECIES_COLOR_VARIANTS, GUPPY_VISUAL_TIER }
