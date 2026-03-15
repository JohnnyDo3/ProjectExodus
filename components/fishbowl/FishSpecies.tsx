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

// Tier 4 alt — Discus: nearly circular disc body with intricate patterns
const DiscusFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.9} viewBox="0 0 80 72">
    <defs>
      <radialGradient id={`db-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="50%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.9" />
      </radialGradient>
      <linearGradient id={`df-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.5" />
      </linearGradient>
      <radialGradient id={`di-${id}`} cx="40%" cy="35%" r="50%">
        <stop offset="0%" stopColor="white" stopOpacity="0.1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Small tail */}
    <path d="M60 28 Q66 22 70 24 Q68 30 72 36 Q68 38 70 42 Q66 40 60 40 Z" fill={`url(#df-${id})`} opacity="0.7" />
    {/* Dorsal fin — long continuous ridge */}
    <path d="M20 10 Q30 2 42 2 Q50 4 56 10 Q52 14 44 14 Q32 12 20 12 Z" fill={`url(#df-${id})`} opacity="0.7" />
    <path d="M24 10 Q34 4 44 4" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.3" />
    {/* Anal fin — long continuous */}
    <path d="M20 58 Q30 66 42 66 Q50 64 56 58 Q52 54 44 54 Q32 56 20 56 Z" fill={`url(#df-${id})`} opacity="0.65" />
    {/* Body — nearly circular disc */}
    <ellipse cx="36" cy="34" rx="26" ry="24" fill={`url(#db-${id})`} />
    {/* Discus pattern — sinuous wavy lines radiating from eye */}
    <path d="M18 26 Q28 22 42 24 Q54 26 60 30" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.2" strokeLinecap="round" />
    <path d="M16 32 Q28 28 42 30 Q54 32 62 34" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.18" strokeLinecap="round" />
    <path d="M16 38 Q28 36 42 36 Q54 38 62 38" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.15" strokeLinecap="round" />
    <path d="M18 44 Q28 42 42 42 Q54 44 60 44" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.12" strokeLinecap="round" />
    {/* Vertical accent bars */}
    <path d="M24 14 Q22 26 22 34 Q22 42 24 54" stroke={colors.fin} strokeWidth="1.5" fill="none" opacity="0.12" />
    <path d="M34 11 Q32 26 32 34 Q32 42 34 57" stroke={colors.fin} strokeWidth="1.2" fill="none" opacity="0.1" />
    <path d="M44 12 Q42 26 42 34 Q42 42 44 56" stroke={colors.fin} strokeWidth="1" fill="none" opacity="0.08" />
    {/* Iridescence */}
    <ellipse cx="36" cy="34" rx="24" ry="22" fill={`url(#di-${id})`} />
    {/* Belly highlight */}
    <ellipse cx="34" cy="42" rx="14" ry="6" fill="white" opacity="0.06" />
    {/* Pectoral fin */}
    <path d="M22 38 Q18 44 22 48 Q22 44 24 40 Z" fill={colors.fin} opacity="0.6" />
    {/* Ventral fins — modest */}
    <path d="M28 56 Q26 62 28 66" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
    <path d="M32 56 Q30 62 32 64" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.4" strokeLinecap="round" />
    {/* Red eye — discus signature */}
    <circle cx="18" cy="32" r="5" fill="white" />
    <circle cx="18" cy="32" r="5" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.3" />
    <circle cx="17.5" cy="31.5" r="3.2" fill={colors.eye} />
    <circle cx="17.5" cy="31.5" r="2.2" fill="#B71C1C" opacity="0.6" />
    <circle cx="17" cy="31" r="1.6" fill="#111" />
    <circle cx="16.2" cy="30.2" r="0.9" fill="white" opacity="0.8" />
    {/* Mouth — small, protruding */}
    <path d="M10 36 Q8 35.5 10 35" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
DiscusFish.displayName = 'DiscusFish'

// Tier 5 alt — Arowana: long, powerful, dragon-like body with upturned jaw
const ArowanaFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.52} viewBox="0 0 100 52">
    <defs>
      <radialGradient id={`arb-${id}`} cx="35%" cy="40%" r="60%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.9" />
      </radialGradient>
      <linearGradient id={`arf-${id}`} x1="0" y1="0" x2="1" y2="0.5">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.6" />
      </linearGradient>
      <linearGradient id={`arsc-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.12" />
        <stop offset="50%" stopColor="white" stopOpacity="0" />
        <stop offset="100%" stopColor="white" stopOpacity="0.08" />
      </linearGradient>
    </defs>
    {/* Large rounded tail — arowana style */}
    <path d="M78 14 Q86 8 92 10 Q90 18 94 26 Q90 34 92 40 Q86 38 78 34 Z" fill={`url(#arf-${id})`} opacity="0.85" />
    {/* Tail rays */}
    <path d="M80 16 Q86 10 90 12" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.35" />
    <path d="M80 24 Q88 24 92 26" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.3" />
    <path d="M80 32 Q86 36 90 38" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.35" />
    {/* Dorsal fin — long low continuous ridge along rear half */}
    <path d="M50 10 Q58 4 68 4 Q76 6 80 10 Q74 12 62 12 Q54 12 50 12 Z" fill={`url(#arf-${id})`} opacity="0.7" />
    {/* Anal fin — long, mirrors dorsal */}
    <path d="M50 40 Q58 46 68 46 Q76 44 80 40 Q74 38 62 38 Q54 38 50 38 Z" fill={`url(#arf-${id})`} opacity="0.65" />
    {/* Body — elongated, powerful, slightly arched */}
    <path d="M8 20 Q4 24 6 26 Q8 30 14 34 Q26 40 46 42 Q66 42 78 36 Q84 32 84 26 Q84 20 78 16 Q66 10 46 10 Q26 10 14 16 Q8 18 8 20 Z" fill={`url(#arb-${id})`} />
    {/* Large metallic scales — arowana signature */}
    <path d="M18 18 Q30 14 46 14 Q62 14 76 18" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.15" />
    <path d="M14 24 Q30 20 46 20 Q64 20 80 24" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.12" />
    <path d="M14 30 Q30 28 46 28 Q64 28 80 30" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.12" />
    <path d="M18 36 Q30 34 46 34 Q62 34 76 36" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.1" />
    {/* Scale detail — individual large scales */}
    {[20, 30, 40, 50, 60, 70].map(sx => (
      <g key={sx}>
        <path d={`M${sx} 18 Q${sx + 4} 24 ${sx} 30`} stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.08" />
        <path d={`M${sx + 5} 16 Q${sx + 9} 22 ${sx + 5} 28`} stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.06" />
      </g>
    ))}
    {/* Shimmer overlay */}
    <path d="M16 18 Q40 14 70 16 Q82 18 84 22" stroke="white" strokeWidth="1" fill="none" opacity="0.1" />
    {/* Belly highlight */}
    <ellipse cx="44" cy="34" rx="20" ry="5" fill="white" opacity="0.06" />
    {/* Pectoral fin — large paddle */}
    <path d="M18 30 Q12 38 18 42 Q18 38 20 34 Z" fill={colors.fin} opacity="0.7" />
    {/* Head — flat top, upturned jaw (arowana signature) */}
    <path d="M4 22 Q2 24 4 26 Q6 28 10 28 Q10 22 8 20 Q6 20 4 22 Z" fill={colors.body} />
    {/* Upturned jaw line */}
    <path d="M4 22 Q2 20 4 18 Q6 16 10 18" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.4" />
    {/* Barbels — arowana's chin whiskers */}
    <path d="M6 28 Q4 32 2 36" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
    <path d="M8 28 Q7 32 6 34" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.4" strokeLinecap="round" />
    {/* Eye — large with golden ring */}
    <circle cx="12" cy="22" r="4.5" fill="white" />
    <circle cx="12" cy="22" r="4.5" stroke="#FFD700" strokeWidth="0.7" fill="none" opacity="0.5" />
    <circle cx="11.5" cy="21.5" r="2.8" fill={colors.eye} />
    <circle cx="11" cy="21" r="1.8" fill="#111" />
    <circle cx="10.2" cy="20.2" r="1" fill="white" opacity="0.85" />
    {/* Crown scales — bony head plates */}
    <path d="M10 16 Q12 14 14 16" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.3" />
    <path d="M14 14 Q16 12 18 14" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.25" />
    {/* Sparkle effects */}
    <circle cx="28" cy="18" r="0.5" fill="white" opacity="0.35" />
    <circle cx="50" cy="20" r="0.4" fill="white" opacity="0.3" />
    <circle cx="68" cy="22" r="0.4" fill="white" opacity="0.25" />
  </svg>
))
ArowanaFish.displayName = 'ArowanaFish'

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
  // ── Betta (Tier 2) — Dramatic flowing royalty ──
  'betta': [
    { name: 'Royal Blue',   colors: { body: '#1565C0', fin: '#0D47A1', accent: '#82B1FF', eye: '#1B1B1B' } },
    { name: 'Koi',          colors: { body: '#FFFFFF', fin: '#D32F2F', accent: '#FFB300', eye: '#1B1B1B' } },
    { name: 'Rose Gold',    colors: { body: '#F48FB1', fin: '#AD1457', accent: '#FCE4EC', eye: '#880E4F' } },
    { name: 'Galaxy',       colors: { body: '#1A237E', fin: '#311B92', accent: '#B388FF', eye: '#E040FB' } },
    { name: 'Copper',       colors: { body: '#D84315', fin: '#8D6E63', accent: '#FFCC80', eye: '#FFD700' } },
    { name: 'Mustard Gas',  colors: { body: '#1976D2', fin: '#F9A825', accent: '#4FC3F7', eye: '#1B1B1B' } },
  ],
  // ── Angelfish (Tier 3) — Elegant striped aristocrats ──
  'angelfish': [
    { name: 'Marble',       colors: { body: '#ECEFF1', fin: '#37474F', accent: '#90A4AE', eye: '#1B1B1B' } },
    { name: 'Gold Pearl',   colors: { body: '#FFD54F', fin: '#FF8F00', accent: '#FFF8E1', eye: '#795548' } },
    { name: 'Koi Angel',    colors: { body: '#FFFFFF', fin: '#FF5722', accent: '#FF9800', eye: '#1B1B1B' } },
    { name: 'Platinum',     colors: { body: '#CFD8DC', fin: '#B0BEC5', accent: '#ECEFF1', eye: '#455A64' } },
    { name: 'Smokey',       colors: { body: '#455A64', fin: '#263238', accent: '#78909C', eye: '#E0E0E0' } },
    { name: 'Sunset Blush', colors: { body: '#FF8A80', fin: '#F4511E', accent: '#FFCCBC', eye: '#4E342E' } },
  ],
  // ── Discus (Tier 4) — Ornate living mandalas ──
  'discus': [
    { name: 'Turquoise',    colors: { body: '#00897B', fin: '#004D40', accent: '#80CBC4', eye: '#1B1B1B' } },
    { name: 'Pigeon Blood', colors: { body: '#EF5350', fin: '#C62828', accent: '#FFCDD2', eye: '#FFD700' } },
    { name: 'Blue Diamond', colors: { body: '#1E88E5', fin: '#0D47A1', accent: '#BBDEFB', eye: '#1B1B1B' } },
    { name: 'Snakeskin',    colors: { body: '#8D6E63', fin: '#4E342E', accent: '#FFCC80', eye: '#FFD700' } },
    { name: 'Red Melon',    colors: { body: '#FF7043', fin: '#D84315', accent: '#FFCCBC', eye: '#1B1B1B' } },
    { name: 'Leopard',      colors: { body: '#FFA726', fin: '#795548', accent: '#FFE0B2', eye: '#3E2723' } },
  ],
  // ── Arowana (Tier 5) — Dragon fish apex legends ──
  'arowana': [
    { name: 'Golden',       colors: { body: '#F9A825', fin: '#F57F17', accent: '#FFF176', eye: '#FFD700' } },
    { name: 'Blood Red',    colors: { body: '#C62828', fin: '#8E2424', accent: '#EF5350', eye: '#FFD700' } },
    { name: 'Platinum',     colors: { body: '#CFD8DC', fin: '#90A4AE', accent: '#ECEFF1', eye: '#B0BEC5' } },
    { name: 'Jardini',      colors: { body: '#6D4C41', fin: '#3E2723', accent: '#FF8A65', eye: '#FFD700' } },
    { name: 'Midnight',     colors: { body: '#1A237E', fin: '#0D1642', accent: '#5C6BC0', eye: '#FFD700' } },
    { name: 'Chili Red',    colors: { body: '#E53935', fin: '#B71C1C', accent: '#FF8A80', eye: '#FFD700' } },
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
  | 'endler' | 'neon-tetra' | 'betta' | 'angelfish' | 'discus' | 'arowana'

const SPECIES_TO_TIER: Record<FishSpecies, FishTier> = {
  'guppy': 0,
  'swift-guppy': 1,
  'fancy-guppy': 2,
  'delta-guppy': 3,
  'veil-guppy': 4,
  'supreme-guppy': 5,
  'endler': 0,
  'neon-tetra': 1,
  'betta': 2,
  'angelfish': 3,
  'discus': 4,
  'arowana': 5,
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
  // Alternate species
  'endler': 'M6 17 Q6 6 22 6 Q38 6 38 17 Q38 28 22 28 Q6 28 6 17 Z',
  'neon-tetra': 'M8 19 Q8 8 28 8 Q48 8 48 19 Q48 30 28 30 Q8 30 8 19 Z',
  'betta': 'M8 24 Q8 9 28 9 Q48 9 48 24 Q48 39 28 39 Q8 39 8 24 Z',
  'angelfish': 'M10 32 Q10 14 28 14 Q50 14 50 32 Q50 52 28 52 Q10 52 10 32 Z',
  'discus': 'M10 34 Q10 10 36 10 Q62 10 62 34 Q62 58 36 58 Q10 58 10 34 Z',
  'arowana': 'M6 24 Q6 10 44 10 Q84 10 84 24 Q84 40 44 40 Q6 40 6 24 Z',
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
  // Alternate species
  'endler': '0 0 50 35',
  'neon-tetra': '0 0 62 38',
  'betta': '0 0 76 56',
  'angelfish': '0 0 70 70',
  'discus': '0 0 80 72',
  'arowana': '0 0 100 52',
}

// Aspect ratios per species
const SPECIES_ASPECTS: Record<string, number> = {
  0: 0.65, 1: 0.65, 2: 0.65, 3: 0.65, 4: 0.75, 5: 0.78,
  'endler': 0.7, 'neon-tetra': 0.61, 'betta': 0.74,
  'angelfish': 1.0, 'discus': 0.9, 'arowana': 0.52,
}

export const FishSVG = memo(({ tier, size = 48, customColors, customization, id }: FishSVGProps) => {
  // Determine which species to render: customization species override > tier default
  const species = customization?.species || null
  let renderTier = tier
  if (species) {
    renderTier = SPECIES_TO_TIER[species]
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
        case 'endler': return <EndlerFish colors={colors} size={size} id={gradientId} />
        case 'neon-tetra': return <NeonTetra colors={colors} size={size} id={gradientId} />
        case 'betta': return <BettaFish colors={colors} size={size} id={gradientId} />
        case 'angelfish': return <AngelfishFish colors={colors} size={size} id={gradientId} />
        case 'discus': return <DiscusFish colors={colors} size={size} id={gradientId} />
        case 'arowana': return <ArowanaFish colors={colors} size={size} id={gradientId} />
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

export { TIER_COLORS, SPECIES_TO_TIER, SPECIES_COLOR_VARIANTS }
