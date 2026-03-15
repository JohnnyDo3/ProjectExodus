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

// Tier 1 third — Harlequin Rasbora: sleek with signature triangle marking
const RasboraFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.62} viewBox="0 0 64 40">
    <defs>
      <radialGradient id={`rab-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.5" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`raf-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} stopOpacity="0.6" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.3" />
      </linearGradient>
    </defs>
    {/* Forked tail */}
    <path d="M48 13 Q54 7 58 9 Q55 15 58 20 Q55 18 48 22 Z" fill={colors.fin} opacity="0.7" />
    <path d="M48 26 Q54 30 58 28 Q55 24 48 22 Z" fill={colors.fin} opacity="0.6" />
    {/* Body — sleek, diamond-shaped */}
    <path d="M8 20 Q8 10 20 8 Q36 6 48 12 Q52 16 52 20 Q52 24 48 28 Q36 34 20 32 Q8 30 8 20 Z" fill={`url(#rab-${id})`} />
    {/* Harlequin triangle — signature dark wedge on rear body */}
    <path d="M30 14 L44 18 L44 22 L30 28 Z" fill={colors.fin} opacity="0.4" />
    {/* Body shimmer */}
    <path d="M14 17 Q30 14 46 17" stroke="white" strokeWidth="0.6" fill="none" opacity="0.12" />
    {/* Belly highlight */}
    <ellipse cx="26" cy="24" rx="12" ry="4" fill="white" opacity="0.1" />
    {/* Dorsal fin — small triangular */}
    <path d="M22 8 Q26 3 30 7 Q27 9 22 9 Z" fill={`url(#raf-${id})`} />
    {/* Anal fin */}
    <path d="M30 30 Q32 35 36 32 Q34 30 33 28 Z" fill={`url(#raf-${id})`} />
    {/* Pectoral fin */}
    <path d="M18 22 Q15 27 19 29 Q18 25 20 22 Z" fill={colors.fin} opacity="0.5" />
    {/* Eye — large */}
    <circle cx="14" cy="18" r="3.8" fill="white" />
    <circle cx="13.5" cy="17.5" r="2.2" fill={colors.eye} />
    <circle cx="13" cy="17" r="0.9" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M9 21 Q7 20.5 9 20" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
))
RasboraFish.displayName = 'RasboraFish'

// Tier 2 third — Dwarf Gourami: oval body, thread-like ventral fins, labyrinth fish
const GouramiFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.72} viewBox="0 0 72 52">
    <defs>
      <radialGradient id={`grb-${id}`} cx="38%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.5" />
      </radialGradient>
      <linearGradient id={`grf-${id}`} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Rounded tail */}
    <path d="M52 18 Q58 12 62 16 Q60 22 62 28 Q60 34 62 38 Q58 36 52 32 Z" fill={`url(#grf-${id})`} opacity="0.8" />
    {/* Body — deep oval, laterally compressed */}
    <ellipse cx="30" cy="26" rx="24" ry="17" fill={`url(#grb-${id})`} />
    {/* Diagonal stripe pattern — gourami signature */}
    <path d="M14 20 Q22 18 30 22" stroke={colors.fin} strokeWidth="1.5" fill="none" opacity="0.2" />
    <path d="M16 26 Q24 24 34 26" stroke={colors.fin} strokeWidth="1.2" fill="none" opacity="0.18" />
    <path d="M18 32 Q26 30 38 32" stroke={colors.fin} strokeWidth="1" fill="none" opacity="0.15" />
    <path d="M20 38 Q28 36 40 38" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.12" />
    {/* Belly highlight */}
    <ellipse cx="28" cy="32" rx="14" ry="6" fill="white" opacity="0.08" />
    {/* Dorsal fin — long low ridge */}
    <path d="M20 9 Q28 3 38 3 Q44 5 48 9 Q42 12 32 12 Q24 12 20 11 Z" fill={`url(#grf-${id})`} opacity="0.75" />
    <path d="M24 9 Q32 4 40 5" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.3" />
    {/* Anal fin — long, flowing */}
    <path d="M22 43 Q28 48 38 48 Q44 46 48 43 Q42 42 32 42 Q24 42 22 42 Z" fill={`url(#grf-${id})`} opacity="0.7" />
    {/* Pectoral fin */}
    <path d="M20 30 Q16 36 20 40 Q20 36 22 32 Z" fill={colors.fin} opacity="0.6" />
    {/* Thread-like ventral fins — gourami signature */}
    <path d="M24 40 Q20 48 18 52" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.6" strokeLinecap="round" />
    <path d="M28 40 Q24 46 23 50" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.5" strokeLinecap="round" />
    {/* Eye */}
    <circle cx="14" cy="23" r="4" fill="white" />
    <circle cx="13.5" cy="22.5" r="2.4" fill={colors.eye} />
    <circle cx="13" cy="22" r="1" fill="white" opacity="0.8" />
    {/* Red eye ring — gourami feature */}
    <circle cx="14" cy="23" r="3.2" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.3" />
    {/* Mouth — slightly upturned */}
    <path d="M7 26 Q5 25 7 24" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
GouramiFish.displayName = 'GouramiFish'

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

// Tier 5 third — Koi: large, majestic ornamental fish with flowing fins and patch patterns
const KoiFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 96 58">
    <defs>
      <radialGradient id={`kob-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="50%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.95" />
      </radialGradient>
      <linearGradient id={`kof-${id}`} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="50%" stopColor={colors.accent} stopOpacity="0.7" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.6" />
      </linearGradient>
      <radialGradient id={`kop1-${id}`} cx="0.3" cy="0.4" r="0.3">
        <stop offset="0%" stopColor={colors.fin} stopOpacity="0.4" />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`kop2-${id}`} cx="0.6" cy="0.5" r="0.25">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.35" />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`koi-${id}`} cx="40%" cy="35%" r="50%">
        <stop offset="0%" stopColor="white" stopOpacity="0.12" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Large flowing tail — split fan */}
    <path d="M72 18 Q80 8 88 10 Q84 18 88 26 Q86 30 88 36 Q84 42 88 48 Q80 46 72 38 Z" fill={`url(#kof-${id})`} opacity="0.85" />
    <path d="M74 20 Q82 14 86 16 Q84 22 86 30 Q84 36 86 42 Q82 40 74 34 Z" fill={colors.accent} opacity="0.35" />
    {/* Tail fin rays */}
    <path d="M74 20 Q80 12 86 12" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.35" />
    <path d="M74 28 Q82 26 86 28" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.3" />
    <path d="M74 36 Q80 42 86 46" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.35" />
    {/* Dorsal fin — low, elegant */}
    <path d="M24 8 Q34 2 46 2 Q56 4 62 8 Q56 10 44 10 Q32 10 24 10 Z" fill={`url(#kof-${id})`} opacity="0.7" />
    <path d="M28 8 Q38 3 48 4" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.3" />
    {/* Anal fin */}
    <path d="M38 48 Q44 54 52 52 Q50 48 50 46 Z" fill={colors.fin} opacity="0.75" />
    {/* Body — elongated, powerful */}
    <path d="M8 24 Q4 28 6 30 Q10 36 20 42 Q36 48 52 48 Q68 46 76 38 Q80 34 80 28 Q80 22 76 18 Q68 12 52 10 Q36 10 20 14 Q10 18 8 24 Z" fill={`url(#kob-${id})`} />
    {/* Koi patches — distinctive color patches */}
    <ellipse cx="28" cy="24" rx="10" ry="8" fill={`url(#kop1-${id})`} />
    <ellipse cx="50" cy="30" rx="12" ry="9" fill={`url(#kop2-${id})`} />
    <ellipse cx="38" cy="36" rx="8" ry="6" fill={`url(#kop1-${id})`} />
    {/* Large metallic scales */}
    <path d="M18 18 Q36 14 56 16 Q70 18 76 22" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.12" />
    <path d="M14 26 Q36 22 56 24 Q72 26 78 28" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.1" />
    <path d="M14 34 Q36 32 56 32 Q72 34 78 34" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.1" />
    <path d="M18 40 Q36 38 56 38 Q68 40 74 40" stroke={colors.accent} strokeWidth="0.35" fill="none" opacity="0.08" />
    {/* Scale detail */}
    {[22, 32, 42, 52, 62].map(sx => (
      <path key={sx} d={`M${sx} 18 Q${sx + 3} 26 ${sx} 34`} stroke={colors.accent} strokeWidth="0.35" fill="none" opacity="0.06" />
    ))}
    {/* Iridescence */}
    <ellipse cx="44" cy="28" rx="26" ry="14" fill={`url(#koi-${id})`} />
    {/* Shimmer */}
    <path d="M16 20 Q40 16 68 20" stroke="white" strokeWidth="0.8" fill="none" opacity="0.1" />
    {/* Belly highlight */}
    <ellipse cx="42" cy="38" rx="18" ry="6" fill="white" opacity="0.06" />
    {/* Pectoral fin — large, flowing */}
    <path d="M20 32 Q14 40 20 44 Q20 40 22 36 Z" fill={colors.fin} opacity="0.75" />
    <path d="M21 34 Q16 40 20 43" stroke={colors.accent} strokeWidth="0.3" fill="none" opacity="0.3" />
    {/* Barbels — koi signature whiskers */}
    <path d="M6 28 Q2 30 0 34" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.45" strokeLinecap="round" />
    <path d="M8 30 Q5 32 4 34" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.35" strokeLinecap="round" />
    {/* Eye */}
    <circle cx="14" cy="24" r="4.5" fill="white" />
    <circle cx="14" cy="24" r="4.5" stroke="#FFD700" strokeWidth="0.6" fill="none" opacity="0.4" />
    <circle cx="13.5" cy="23.5" r="2.8" fill={colors.eye} />
    <circle cx="13" cy="23" r="1.8" fill="#111" />
    <circle cx="12.2" cy="22.2" r="1" fill="white" opacity="0.85" />
    {/* Head plates */}
    <path d="M12 16 Q14 14 16 16" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.25" />
    <path d="M16 14 Q18 12 20 14" stroke={colors.accent} strokeWidth="0.45" fill="none" opacity="0.2" />
    {/* Sparkle effects */}
    <circle cx="30" cy="18" r="0.5" fill="white" opacity="0.35" />
    <circle cx="54" cy="22" r="0.4" fill="white" opacity="0.3" />
    <circle cx="66" cy="28" r="0.4" fill="white" opacity="0.25" />
    {/* Mouth */}
    <path d="M6 26 Q3 25 6 24" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.4" />
  </svg>
))
KoiFish.displayName = 'KoiFish'

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

// Tier 1 fourth — Cardinal Tetra: like neon tetra but with full red lower body
const CardinalTetra = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.59} viewBox="0 0 64 38">
    <defs>
      <radialGradient id={`ct-b-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.5" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`ct-s-${id}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.accent} />
      </linearGradient>
    </defs>
    {/* Forked tail */}
    <path d="M48 10 Q54 5 58 7 Q55 13 58 18 Q55 17 48 20 Z" fill={colors.fin} opacity="0.7" />
    <path d="M48 26 Q54 30 58 28 Q55 23 48 20 Z" fill={colors.fin} opacity="0.6" />
    {/* Body */}
    <ellipse cx="28" cy="19" rx="22" ry="12" fill={`url(#ct-b-${id})`} />
    {/* Blue iridescent stripe — upper half */}
    <path d="M12 14 Q28 12 44 14" stroke={colors.accent} strokeWidth="4" fill="none" opacity="0.8" strokeLinecap="round" />
    {/* Full red lower body — cardinal tetra signature */}
    <path d="M10 20 Q28 18 46 20 Q42 28 28 30 Q14 28 10 20 Z" fill={colors.fin} opacity="0.55" />
    {/* Belly highlight */}
    <ellipse cx="26" cy="25" rx="12" ry="4" fill="white" opacity="0.08" />
    {/* Small dorsal fin */}
    <path d="M24 7 Q28 3 32 7 Q29 9 24 8 Z" fill={colors.fin} opacity="0.6" />
    {/* Adipose fin */}
    <path d="M40 11 Q42 9 44 11 Q42 12 40 11 Z" fill={colors.fin} opacity="0.4" />
    {/* Anal fin */}
    <path d="M30 28 Q33 33 36 31 Q34 28 32 27 Z" fill={colors.fin} opacity="0.6" />
    {/* Pectoral fin */}
    <path d="M18 22 Q16 26 20 28 Q19 24 20 22 Z" fill={colors.fin} opacity="0.5" />
    {/* Eye */}
    <circle cx="13" cy="17" r="3.8" fill="white" />
    <circle cx="12.5" cy="16.5" r="2.2" fill={colors.eye} />
    <circle cx="12" cy="16" r="0.8" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M8 20 Q6.5 19.5 8 19" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
))
CardinalTetra.displayName = "CardinalTetra"

// Tier 1 fifth — White Cloud: sleek with colorful stripe
const WhiteCloud = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 60 36">
    <defs>
      <radialGradient id={`wc-b-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.4" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
    </defs>
    {/* Forked tail — small, delicate */}
    <path d="M46 11 Q52 6 56 8 Q53 13 56 17 Q53 16 46 18 Z" fill={colors.fin} opacity="0.8" />
    <path d="M46 24 Q52 28 56 26 Q53 21 46 18 Z" fill={colors.fin} opacity="0.7" />
    {/* Body — sleek */}
    <path d="M6 18 Q6 9 16 7 Q30 6 46 12 Q50 15 50 18 Q50 21 46 24 Q30 30 16 29 Q6 27 6 18 Z" fill={`url(#wc-b-${id})`} />
    {/* Lateral iridescent stripe */}
    <path d="M10 16 Q28 14 44 16" stroke={colors.accent} strokeWidth="2.5" fill="none" opacity="0.75" strokeLinecap="round" />
    {/* White belly area */}
    <path d="M8 20 Q26 18 44 20 Q40 26 26 28 Q12 26 8 20 Z" fill="white" opacity="0.12" />
    {/* Dorsal fin */}
    <path d="M22 7 Q26 3 30 6 Q27 8 22 7 Z" fill={colors.fin} opacity="0.8" />
    {/* Anal fin */}
    <path d="M28 27 Q31 32 34 30 Q32 27 30 26 Z" fill={colors.fin} opacity="0.7" />
    {/* Pectoral fin */}
    <path d="M16 21 Q14 25 18 27 Q17 23 18 21 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye — large for body size */}
    <circle cx="11" cy="15" r="3.5" fill="white" />
    <circle cx="10.5" cy="14.5" r="2" fill={colors.eye} />
    <circle cx="10" cy="14" r="0.8" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M6 19 Q4.5 18.5 6 18" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
))
WhiteCloud.displayName = "WhiteCloud"

// Tier 1 sixth — Killifish: elongated with colorful spotted pattern
const KillifishFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.65} viewBox="0 0 62 40">
    <defs>
      <radialGradient id={`kf-b-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.5" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
    </defs>
    {/* Rounded tail */}
    <path d="M46 12 Q52 7 56 10 Q54 16 56 22 Q54 28 56 32 Q52 30 46 26 Z" fill={colors.fin} opacity="0.8" />
    {/* Tail rays */}
    <path d="M48 14 Q52 9 54 10" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.4" />
    <path d="M48 22 Q53 22 54 24" stroke={colors.fin} strokeWidth="0.3" fill="none" opacity="0.35" />
    {/* Body — elongated */}
    <path d="M6 20 Q6 10 18 8 Q32 7 46 14 Q50 17 50 20 Q50 23 46 26 Q32 33 18 32 Q6 30 6 20 Z" fill={`url(#kf-b-${id})`} />
    {/* Spot pattern — killifish signature */}
    <circle cx="20" cy="17" r="2" fill={colors.accent} opacity="0.4" />
    <circle cx="28" cy="15" r="1.8" fill={colors.accent} opacity="0.35" />
    <circle cx="36" cy="16" r="1.5" fill={colors.accent} opacity="0.3" />
    <circle cx="24" cy="23" r="1.8" fill={colors.fin} opacity="0.3" />
    <circle cx="32" cy="22" r="1.5" fill={colors.fin} opacity="0.25" />
    <circle cx="40" cy="20" r="1.2" fill={colors.accent} opacity="0.2" />
    {/* Belly highlight */}
    <ellipse cx="26" cy="25" rx="12" ry="4" fill="white" opacity="0.1" />
    {/* Dorsal fin — set far back */}
    <path d="M34 8 Q38 4 42 7 Q40 10 34 9 Z" fill={colors.fin} opacity="0.8" />
    {/* Anal fin — set far back */}
    <path d="M34 30 Q37 35 40 33 Q38 30 37 28 Z" fill={colors.fin} opacity="0.75" />
    {/* Pectoral fin */}
    <path d="M16 23 Q14 28 18 30 Q17 25 18 23 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye — large */}
    <circle cx="11" cy="18" r="3.8" fill="white" />
    <circle cx="10.5" cy="17.5" r="2.2" fill={colors.eye} />
    <circle cx="10" cy="17" r="0.9" fill="white" opacity="0.8" />
    {/* Upturned mouth hint */}
    <path d="M6 21 Q4.5 20 6 19" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
))
KillifishFish.displayName = "KillifishFish"

// Tier 2 fourth — Swordtail: elongated body with sword-like lower tail extension
const SwordtailFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.59} viewBox="0 0 78 46">
    <defs>
      <radialGradient id={`st-b-${id}`} cx="38%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
      <linearGradient id={`st-f-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    {/* Upper tail lobe */}
    <path d="M56 14 Q62 8 68 10 Q65 16 68 20 Q62 18 56 20 Z" fill={`url(#st-f-${id})`} opacity="0.85" />
    {/* Sword — extended lower tail (swordtail signature) */}
    <path d="M56 22 Q60 23 72 28 Q70 30 68 30 Q62 28 56 24 Z" fill={`url(#st-f-${id})`} opacity="0.9" />
    {/* Sword edge highlight */}
    <path d="M58 23 Q66 26 70 29" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.4" />
    {/* Body — elongated, streamlined */}
    <ellipse cx="30" cy="20" rx="26" ry="13" fill={`url(#st-b-${id})`} />
    {/* Body stripe */}
    <path d="M10 18 Q30 16 50 18" stroke={colors.accent} strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round" />
    {/* Belly highlight */}
    <ellipse cx="28" cy="25" rx="16" ry="5" fill="white" opacity="0.1" />
    {/* Dorsal fin — tall */}
    <path d="M24 7 Q30 1 36 4 Q35 9 28 11 Q24 10 24 8 Z" fill={colors.fin} opacity="0.85" />
    {/* Pectoral fin */}
    <path d="M20 23 Q17 30 22 33 Q21 27 23 23 Z" fill={colors.fin} opacity="0.75" />
    {/* Anal fin */}
    <path d="M38 33 Q40 38 44 36 Q42 32 42 30 Z" fill={colors.fin} opacity="0.8" />
    {/* Eye */}
    <circle cx="13" cy="18" r="4" fill="white" />
    <circle cx="12.5" cy="17.5" r="2.4" fill={colors.eye} />
    <circle cx="12" cy="17" r="1" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M7 21 Q5 20.5 7 20" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
SwordtailFish.displayName = "SwordtailFish"

// Tier 2 fifth — Ram Cichlid: round body with prominent dorsal spines and dark spot
const RamCichlid = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.74} viewBox="0 0 68 50">
    <defs>
      <radialGradient id={`rc-b-${id}`} cx="38%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.9" />
      </radialGradient>
      <linearGradient id={`rc-f-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Tail */}
    <path d="M50 18 Q56 12 60 14 Q58 20 60 26 Q58 32 60 36 Q56 34 50 30 Z" fill={`url(#rc-f-${id})`} opacity="0.8" />
    {/* Dorsal fin with prominent spines — ram signature */}
    <path d="M18 8 Q22 1 28 2 Q30 0 32 2 Q34 4 38 6 Q44 7 48 10 Q44 12 36 12 Q24 11 18 10 Z" fill={colors.fin} opacity="0.85" />
    {/* Dorsal spines */}
    <path d="M22 8 Q24 2 26 2" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.6" />
    <path d="M28 7 Q30 1 32 2" stroke={colors.fin} strokeWidth="0.9" fill="none" opacity="0.7" />
    <path d="M34 7 Q35 3 37 5" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
    <path d="M40 8 Q42 5 44 6" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.4" />
    {/* Anal fin */}
    <path d="M22 40 Q28 46 36 46 Q40 44 44 40 Q38 39 30 39 Q24 39 22 39 Z" fill={`url(#rc-f-${id})`} opacity="0.7" />
    {/* Body — round */}
    <ellipse cx="30" cy="26" rx="22" ry="16" fill={`url(#rc-b-${id})`} />
    {/* Characteristic black spot */}
    <circle cx="26" cy="24" r="4" fill="#1B1B1B" opacity="0.4" />
    <circle cx="26" cy="24" r="2.5" fill="#1B1B1B" opacity="0.6" />
    {/* Body color stripe */}
    <path d="M12 22 Q30 19 48 22" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
    {/* Belly highlight */}
    <ellipse cx="28" cy="32" rx="12" ry="5" fill="white" opacity="0.08" />
    {/* Pectoral fin */}
    <path d="M18 30 Q14 36 18 40 Q18 36 20 32 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye — has blue ring */}
    <circle cx="14" cy="23" r="4" fill="white" />
    <circle cx="14" cy="23" r="4" stroke={colors.accent} strokeWidth="0.7" fill="none" opacity="0.5" />
    <circle cx="13.5" cy="22.5" r="2.4" fill={colors.eye} />
    <circle cx="13" cy="22" r="1" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M8 27 Q6 26.5 8 26" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
RamCichlid.displayName = "RamCichlid"

// Tier 2 sixth — Pleco: flat bottom-feeder with armored plates and sucker mouth
const PlecoFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.59} viewBox="0 0 74 44">
    <defs>
      <radialGradient id={`pl-b-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.4" />
        <stop offset="100%" stopColor={colors.body} />
      </radialGradient>
    </defs>
    {/* Broad rounded tail */}
    <path d="M56 14 Q62 8 68 10 Q66 16 68 22 Q66 28 68 32 Q62 30 56 26 Z" fill={colors.fin} opacity="0.8" />
    {/* Tall dorsal fin */}
    <path d="M22 6 Q28 1 36 2 Q40 4 44 6 Q38 10 30 10 Q24 10 22 8 Z" fill={colors.fin} opacity="0.8" />
    <path d="M26 7 Q30 2 34 3" stroke={colors.fin} strokeWidth="0.4" fill="none" opacity="0.4" />
    {/* Body — broad, flattened from below */}
    <path d="M6 18 Q6 10 18 8 Q34 7 56 14 Q60 17 60 20 Q60 23 56 26 Q34 33 18 32 Q6 30 6 18 Z" fill={`url(#pl-b-${id})`} />
    {/* Armored plates — pleco signature */}
    <path d="M12 14 Q20 12 28 14" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.35" />
    <path d="M12 18 Q22 16 32 18" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.3" />
    <path d="M12 22 Q24 20 36 22" stroke={colors.accent} strokeWidth="0.7" fill="none" opacity="0.25" />
    <path d="M28 14 Q36 12 44 14" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.3" />
    <path d="M32 18 Q40 16 50 18" stroke={colors.accent} strokeWidth="0.7" fill="none" opacity="0.25" />
    {/* Pectoral fin — broad, fan-like */}
    <path d="M14 22 Q10 30 16 34 Q16 28 18 24 Z" fill={colors.fin} opacity="0.7" />
    <path d="M18 22 Q15 29 18 32" stroke={colors.accent} strokeWidth="0.3" fill="none" opacity="0.3" />
    {/* Sucker mouth — pleco signature (circular) */}
    <circle cx="8" cy="22" r="4" fill={colors.fin} opacity="0.5" />
    <circle cx="8" cy="22" r="3" fill={colors.body} opacity="0.6" />
    <circle cx="8" cy="22" r="1.5" fill={colors.fin} opacity="0.4" />
    {/* Eye — small, on top of head */}
    <circle cx="12" cy="13" r="2.5" fill="white" />
    <circle cx="11.5" cy="12.5" r="1.4" fill={colors.eye} />
    <circle cx="11" cy="12" r="0.6" fill="white" opacity="0.8" />
    {/* Belly flat bottom */}
    <path d="M10 28 Q30 30 52 26" stroke="white" strokeWidth="0.5" fill="none" opacity="0.12" />
  </svg>
))
PlecoFish.displayName = "PlecoFish"

// Tier 3 fourth — Mandarin: round body with psychedelic swirl patterns
const MandarinFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.71} viewBox="0 0 68 48">
    <defs>
      <radialGradient id={`mdf-b-${id}`} cx="38%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.9" />
      </radialGradient>
      <linearGradient id={`mdf-f-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.6" />
      </linearGradient>
    </defs>
    {/* Rounded tail */}
    <path d="M50 16 Q56 10 62 13 Q60 19 62 26 Q60 32 62 36 Q56 34 50 28 Z" fill={`url(#mdf-f-${id})`} opacity="0.8" />
    {/* Tall ornate dorsal fin */}
    <path d="M16 8 Q20 2 26 2 Q30 3 34 7 Q40 6 44 8 Q42 12 34 12 Q22 11 16 10 Z" fill={colors.fin} opacity="0.85" />
    <path d="M20 8 Q24 3 28 3" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.4" />
    {/* Anal fin */}
    <path d="M20 40 Q26 46 34 46 Q38 44 42 40 Q36 39 28 39 Q22 39 20 39 Z" fill={`url(#mdf-f-${id})`} opacity="0.7" />
    {/* Body — round */}
    <ellipse cx="28" cy="26" rx="22" ry="16" fill={`url(#mdf-b-${id})`} />
    {/* Psychedelic swirl patterns — mandarin signature */}
    <path d="M14 22 Q20 16 28 20 Q36 16 44 22" stroke={colors.accent} strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round" />
    <path d="M12 28 Q18 22 26 26 Q34 22 44 28" stroke={colors.fin} strokeWidth="1.5" fill="none" opacity="0.35" strokeLinecap="round" />
    <path d="M16 34 Q22 28 30 32 Q38 28 46 34" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
    <circle cx="22" cy="24" r="3" fill={colors.accent} opacity="0.2" />
    <circle cx="32" cy="22" r="2.5" fill={colors.fin} opacity="0.2" />
    <circle cx="38" cy="28" r="2" fill={colors.accent} opacity="0.15" />
    {/* Belly highlight */}
    <ellipse cx="26" cy="32" rx="12" ry="5" fill="white" opacity="0.08" />
    {/* Pectoral fin */}
    <path d="M16 30 Q12 37 16 40 Q16 36 18 32 Z" fill={colors.fin} opacity="0.65" />
    {/* Eye */}
    <circle cx="13" cy="23" r="4.2" fill="white" />
    <circle cx="12.5" cy="22.5" r="2.6" fill={colors.eye} />
    <circle cx="12" cy="22" r="1" fill="white" opacity="0.8" />
    {/* Mouth — small, round */}
    <path d="M7 27 Q5 26.5 7 26" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
))
MandarinFish.displayName = "MandarinFish"

// Tier 3 fifth — Wrasse: elongated with thick lips and bright coloring
const WrasseFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.61} viewBox="0 0 76 46">
    <defs>
      <radialGradient id={`wr-b-${id}`} cx="38%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.fin} stopOpacity="0.5" />
      </radialGradient>
      <linearGradient id={`wr-f-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    {/* Lunate tail */}
    <path d="M58 14 Q64 8 70 10 Q68 16 72 22 Q68 28 70 34 Q64 32 58 26 Z" fill={`url(#wr-f-${id})`} opacity="0.8" />
    {/* Long dorsal fin */}
    <path d="M16 8 Q22 3 32 3 Q42 4 50 8 Q46 11 36 11 Q24 10 16 10 Z" fill={colors.fin} opacity="0.8" />
    <path d="M20 8 Q30 4 38 5" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.3" />
    {/* Anal fin */}
    <path d="M20 38 Q26 44 34 44 Q40 42 44 38 Q38 37 30 37 Q24 37 20 37 Z" fill={`url(#wr-f-${id})`} opacity="0.7" />
    {/* Body — elongated, robust */}
    <ellipse cx="32" cy="24" rx="26" ry="15" fill={`url(#wr-b-${id})`} />
    {/* Body color stripe */}
    <path d="M10 20 Q32 17 54 20" stroke={colors.accent} strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round" />
    <path d="M10 26 Q32 24 54 26" stroke={colors.fin} strokeWidth="1.2" fill="none" opacity="0.2" strokeLinecap="round" />
    {/* Belly highlight */}
    <ellipse cx="30" cy="30" rx="16" ry="5.5" fill="white" opacity="0.08" />
    {/* Pectoral fin — paddle */}
    <path d="M18 27 Q14 34 18 38 Q18 34 20 29 Z" fill={colors.fin} opacity="0.65" />
    {/* Thick lips — wrasse signature */}
    <path d="M8 26 Q6 25 4 26 Q6 27 8 27 Z" fill={colors.fin} opacity="0.7" />
    <path d="M8 22 Q6 21 4 22 Q6 23 8 23 Z" fill={colors.accent} opacity="0.6" />
    {/* Eye — large */}
    <circle cx="14" cy="21" r="4.2" fill="white" />
    <circle cx="13.5" cy="20.5" r="2.6" fill={colors.eye} />
    <circle cx="13" cy="20" r="1" fill="white" opacity="0.8" />
    {/* Mouth line */}
    <path d="M8 24 Q5 23.5 8 23" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.5" />
  </svg>
))
WrasseFish.displayName = "WrasseFish"

// Tier 3 sixth — Butterflyfish: disc-shaped with eye spot and banded pattern
const ButterflyfishFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.92} viewBox="0 0 72 66">
    <defs>
      <radialGradient id={`bf2-b-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.9" />
      </radialGradient>
      <linearGradient id={`bf2-f-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Small tail */}
    <path d="M56 26 Q62 20 66 22 Q64 28 66 34 Q64 40 66 44 Q62 42 56 38 Z" fill={`url(#bf2-f-${id})`} opacity="0.75" />
    {/* Tall dorsal fin */}
    <path d="M14 10 Q20 2 28 2 Q36 4 44 10 Q40 14 30 14 Q20 12 14 12 Z" fill={`url(#bf2-f-${id})`} opacity="0.8" />
    <path d="M18 10 Q24 4 30 4" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.3" />
    {/* Anal fin */}
    <path d="M14 54 Q20 62 28 62 Q36 60 44 54 Q40 52 30 52 Q20 52 14 52 Z" fill={`url(#bf2-f-${id})`} opacity="0.75" />
    {/* Body — disc shaped */}
    <ellipse cx="30" cy="33" rx="24" ry="21" fill={`url(#bf2-b-${id})`} />
    {/* Vertical dark bands — butterflyfish signature */}
    <path d="M16 12 Q14 24 14 33 Q14 42 16 52" stroke={colors.fin} strokeWidth="4" fill="none" opacity="0.3" strokeLinecap="round" />
    <path d="M28 10 Q26 22 26 33 Q26 44 28 54" stroke={colors.fin} strokeWidth="2.5" fill="none" opacity="0.2" strokeLinecap="round" />
    {/* Eye stripe band — dark bar through eye */}
    <path d="M10 18 Q9 26 10 36" stroke={colors.fin} strokeWidth="5" fill="none" opacity="0.35" strokeLinecap="round" />
    {/* False eye spot on rear — butterflyfish signature */}
    <circle cx="48" cy="20" r="5" fill={colors.fin} opacity="0.5" />
    <circle cx="48" cy="20" r="3" fill={colors.body} opacity="0.6" />
    <circle cx="48" cy="20" r="1.5" fill={colors.fin} opacity="0.5" />
    <circle cx="48" cy="20" r="5" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.3" />
    {/* Belly highlight */}
    <ellipse cx="28" cy="42" rx="14" ry="5.5" fill="white" opacity="0.07" />
    {/* Pectoral fin */}
    <path d="M18 36 Q14 42 18 46 Q18 42 20 38 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye */}
    <circle cx="13" cy="29" r="4.5" fill="white" />
    <circle cx="12.5" cy="28.5" r="2.8" fill={colors.eye} />
    <circle cx="12" cy="28" r="1" fill="white" opacity="0.8" />
    {/* Snout — protruding */}
    <path d="M8 33 Q5 32.5 8 32" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.5" />
  </svg>
))
ButterflyfishFish.displayName = "ButterflyfishFish"

// Tier 4 fourth — Moorish Idol: tall disc body with extremely long dorsal banner
const MoorishIdol = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 1.03} viewBox="0 0 78 80">
    <defs>
      <radialGradient id={`mi-b-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.9" />
      </radialGradient>
      <linearGradient id={`mi-f-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.4" />
      </linearGradient>
    </defs>
    {/* Extremely long trailing dorsal banner — moorish idol signature */}
    <path d="M26 44 Q28 30 30 18 Q32 10 34 2 Q36 2 38 4 Q36 14 34 24 Q32 36 32 44 Z" fill={colors.fin} opacity="0.85" />
    <path d="M30 20 Q32 12 34 4" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.4" />
    {/* Small tail */}
    <path d="M58 34 Q64 28 68 30 Q66 36 68 42 Q66 48 68 52 Q64 50 58 46 Z" fill={`url(#mi-f-${id})`} opacity="0.75" />
    {/* Dorsal fin base */}
    <path d="M22 30 Q28 26 36 26 Q42 28 48 30 Q44 34 36 34 Q26 32 22 32 Z" fill={colors.fin} opacity="0.8" />
    {/* Anal fin */}
    <path d="M22 60 Q28 68 36 68 Q44 66 48 60 Q44 58 36 58 Q28 58 22 58 Z" fill={`url(#mi-f-${id})`} opacity="0.75" />
    {/* Body — tall disc */}
    <ellipse cx="36" cy="48" rx="24" ry="20" fill={`url(#mi-b-${id})`} />
    {/* Characteristic thick vertical bands (black/white/yellow) */}
    <path d="M22 30 Q20 40 20 48 Q20 56 22 62" stroke={colors.fin} strokeWidth="7" fill="none" opacity="0.35" strokeLinecap="round" />
    <path d="M38 28 Q36 40 36 48 Q36 56 38 66" stroke={colors.eye} strokeWidth="5" fill="none" opacity="0.2" strokeLinecap="round" />
    <path d="M52 34 Q50 42 50 48 Q50 54 52 62" stroke={colors.accent} strokeWidth="4" fill="none" opacity="0.3" strokeLinecap="round" />
    {/* Yellow snout area */}
    <path d="M8 44 Q10 38 14 38 Q18 38 18 44 Q18 50 14 52 Q10 52 8 46 Z" fill={colors.accent} opacity="0.6" />
    {/* Belly highlight */}
    <ellipse cx="34" cy="56" rx="14" ry="5" fill="white" opacity="0.07" />
    {/* Pectoral fin */}
    <path d="M20 50 Q16 56 20 60 Q20 56 22 52 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye — large */}
    <circle cx="16" cy="42" r="5" fill="white" />
    <circle cx="15.5" cy="41.5" r="3" fill={colors.eye} />
    <circle cx="15" cy="41" r="1.2" fill="white" opacity="0.8" />
    {/* Protruding snout */}
    <path d="M8 46 Q5 45.5 8 45" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.5" />
  </svg>
))
MoorishIdol.displayName = "MoorishIdol"

// Tier 4 fifth — Lionfish: round body with elaborate fan-like pectoral fins and spines
const LionfishFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.79} viewBox="0 0 86 68">
    <defs>
      <radialGradient id={`lf-b-${id}`} cx="40%" cy="38%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.9" />
      </radialGradient>
    </defs>
    {/* Venomous dorsal spines — lionfish signature */}
    <path d="M22 26 L20 6" stroke={colors.fin} strokeWidth="1.2" fill="none" opacity="0.7" />
    <path d="M26 22 L24 4" stroke={colors.fin} strokeWidth="1" fill="none" opacity="0.65" />
    <path d="M30 18 L28 2" stroke={colors.fin} strokeWidth="1.2" fill="none" opacity="0.7" />
    <path d="M34 16 L32 2" stroke={colors.fin} strokeWidth="1" fill="none" opacity="0.65" />
    <path d="M38 16 L38 2" stroke={colors.fin} strokeWidth="0.9" fill="none" opacity="0.6" />
    <path d="M42 18 L44 4" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.55" />
    <path d="M46 20 L50 6" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.5" />
    {/* Small tail */}
    <path d="M60 28 Q66 22 72 24 Q70 30 72 36 Q70 42 72 46 Q66 44 60 40 Z" fill={colors.fin} opacity="0.75" />
    {/* Elaborate fan pectoral fins — lionfish signature */}
    <path d="M16 36 Q8 30 4 36 Q8 40 14 44 Q16 38 18 36 Z" fill={colors.fin} opacity="0.55" />
    <path d="M16 36 Q6 34 2 40 Q6 46 12 48 Q14 42 18 36 Z" fill={colors.fin} opacity="0.45" />
    <path d="M16 36 Q8 42 6 50 Q12 54 18 52 Q16 44 18 38 Z" fill={colors.fin} opacity="0.4" />
    {/* Fan fin rays */}
    <path d="M17 37 Q8 32 4 36" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.35" />
    <path d="M17 40 Q8 40 6 46" stroke={colors.accent} strokeWidth="0.35" fill="none" opacity="0.3" />
    <path d="M17 43 Q10 48 8 52" stroke={colors.accent} strokeWidth="0.3" fill="none" opacity="0.25" />
    {/* Body — round */}
    <ellipse cx="38" cy="40" rx="24" ry="18" fill={`url(#lf-b-${id})`} />
    {/* Vertical stripes — lionfish bands */}
    <path d="M24 24 Q22 34 22 40 Q22 46 24 54" stroke={colors.fin} strokeWidth="3" fill="none" opacity="0.25" strokeLinecap="round" />
    <path d="M34 22 Q32 34 32 40 Q32 46 34 56" stroke={colors.fin} strokeWidth="2.5" fill="none" opacity="0.2" strokeLinecap="round" />
    <path d="M44 22 Q42 34 42 40 Q42 46 44 56" stroke={colors.fin} strokeWidth="2" fill="none" opacity="0.15" strokeLinecap="round" />
    <path d="M52 24 Q50 34 50 40 Q50 46 52 54" stroke={colors.fin} strokeWidth="1.5" fill="none" opacity="0.12" strokeLinecap="round" />
    {/* Belly highlight */}
    <ellipse cx="36" cy="48" rx="14" ry="5" fill="white" opacity="0.07" />
    {/* Anal fin */}
    <path d="M28 56 Q34 64 40 62 Q38 56 38 54 Z" fill={colors.fin} opacity="0.7" />
    {/* Eye — large, prominent */}
    <circle cx="22" cy="36" r="5" fill="white" />
    <circle cx="21.5" cy="35.5" r="3" fill={colors.eye} />
    <circle cx="21" cy="35" r="1.2" fill="white" opacity="0.8" />
    {/* Mouth */}
    <path d="M12 42 Q10 41.5 12 41" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.5" />
  </svg>
))
LionfishFish.displayName = "LionfishFish"

// Tier 4 sixth — Seahorse: vertical body, curled tail, horse-like head
const SeahorseFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 1.54} viewBox="0 0 52 80">
    <defs>
      <radialGradient id={`sh-b-${id}`} cx="50%" cy="30%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.9" />
      </radialGradient>
    </defs>
    {/* Curled tail — seahorse signature */}
    <path d="M20 60 Q26 62 30 68 Q32 74 28 76 Q24 78 20 74 Q16 70 18 64 Q20 60 22 58 Z" fill={`url(#sh-b-${id})`} opacity="0.9" />
    {/* Body segments — bony rings */}
    <path d="M16 20 Q14 28 14 36 Q14 46 16 56 Q24 58 30 54 Q32 44 32 36 Q32 28 30 22 Q24 18 16 20 Z" fill={`url(#sh-b-${id})`} />
    {/* Segment rings */}
    <path d="M14 30 Q22 28 32 30" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.3" />
    <path d="M14 36 Q22 34 32 36" stroke={colors.accent} strokeWidth="0.7" fill="none" opacity="0.28" />
    <path d="M14 42 Q22 40 32 42" stroke={colors.accent} strokeWidth="0.7" fill="none" opacity="0.25" />
    <path d="M14 48 Q22 46 32 48" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.22" />
    <path d="M15 54 Q22 52 30 54" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.2" />
    {/* Neck curve */}
    <path d="M16 20 Q14 16 16 12 Q20 8 24 8 Q28 8 30 12 Q32 16 30 22 Z" fill={`url(#sh-b-${id})`} />
    {/* Head — horse-like snout */}
    <path d="M18 8 Q16 4 20 2 Q26 1 30 4 Q32 6 30 10 Q28 8 24 8 Q20 8 18 8 Z" fill={colors.body} />
    {/* Snout — elongated */}
    <path d="M22 2 Q26 0 30 2 Q28 4 24 4 Z" fill={colors.fin} opacity="0.8" />
    {/* Dorsal fin — small, rapid flutter */}
    <path d="M22 22 Q30 18 36 20 Q34 24 28 24 Q24 24 22 23 Z" fill={colors.fin} opacity="0.75" />
    {/* Pectoral fin — small */}
    <path d="M14 24 Q10 28 12 32 Q14 30 16 26 Z" fill={colors.fin} opacity="0.6" />
    {/* Coronet — crown on head */}
    <path d="M20 2 L18 -1 M22 1 L21 -2 M26 1 L26 -2 M30 2 L32 -1" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.5" />
    {/* Eye */}
    <circle cx="20" cy="7" r="3.5" fill="white" />
    <circle cx="19.5" cy="6.5" r="2" fill={colors.eye} />
    <circle cx="19" cy="6" r="0.8" fill="white" opacity="0.8" />
  </svg>
))
SeahorseFish.displayName = "SeahorseFish"

// Tier 5 fourth — Dragonet: elongated with large sail-like dorsal fin, psychedelic colors
const DragonetFish = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.64} viewBox="0 0 88 56">
    <defs>
      <radialGradient id={`dg-b-${id}`} cx="38%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.9" />
      </radialGradient>
      <linearGradient id={`dg-f-${id}`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={colors.fin} />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.6" />
      </linearGradient>
    </defs>
    {/* Elongated tail */}
    <path d="M68 20 Q76 14 82 16 Q80 22 82 28 Q80 34 82 38 Q76 36 68 32 Z" fill={`url(#dg-f-${id})`} opacity="0.8" />
    {/* Huge sail-like first dorsal fin — dragonet signature */}
    <path d="M16 24 Q20 10 26 6 Q30 4 34 8 Q32 14 30 20 Q24 22 16 24 Z" fill={`url(#dg-f-${id})`} opacity="0.85" />
    <path d="M20 22 Q22 12 26 7" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.5" />
    <path d="M24 20 Q26 10 30 6" stroke={colors.fin} strokeWidth="0.5" fill="none" opacity="0.45" />
    {/* Second dorsal fin */}
    <path d="M32 20 Q36 14 44 14 Q52 15 56 18 Q50 22 40 22 Q34 22 32 21 Z" fill={colors.fin} opacity="0.7" />
    <path d="M36 20 Q40 15 46 15" stroke={colors.fin} strokeWidth="0.35" fill="none" opacity="0.35" />
    {/* Anal fin */}
    <path d="M32 42 Q38 50 46 50 Q52 48 56 42 Q50 41 42 41 Q36 41 32 41 Z" fill={`url(#dg-f-${id})`} opacity="0.7" />
    {/* Body — elongated, flattened */}
    <path d="M6 30 Q6 20 18 18 Q36 16 68 22 Q72 25 72 28 Q72 31 68 34 Q36 42 18 40 Q6 38 6 30 Z" fill={`url(#dg-b-${id})`} />
    {/* Psychedelic pattern — dragonet signature */}
    <path d="M14 24 Q28 20 44 22" stroke={colors.accent} strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round" />
    <path d="M12 30 Q28 27 46 30" stroke={colors.fin} strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
    <path d="M14 36 Q28 34 44 36" stroke={colors.accent} strokeWidth="1.2" fill="none" opacity="0.25" strokeLinecap="round" />
    <circle cx="24" cy="28" r="2.5" fill={colors.accent} opacity="0.25" />
    <circle cx="36" cy="26" r="2" fill={colors.fin} opacity="0.2" />
    <circle cx="48" cy="28" r="1.8" fill={colors.accent} opacity="0.18" />
    {/* Belly highlight */}
    <ellipse cx="38" cy="36" rx="16" ry="4.5" fill="white" opacity="0.07" />
    {/* Pectoral fin — large */}
    <path d="M16 32 Q10 40 14 44 Q14 40 18 34 Z" fill={colors.fin} opacity="0.65" />
    {/* Eye — large, forward-facing */}
    <circle cx="12" cy="26" r="4.5" fill="white" />
    <circle cx="11.5" cy="25.5" r="2.8" fill={colors.eye} />
    <circle cx="11" cy="25" r="1.1" fill="white" opacity="0.8" />
    {/* Mouth — large, upturned */}
    <path d="M6 31 Q4 30 6 29" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.5" />
  </svg>
))
DragonetFish.displayName = "DragonetFish"

// Tier 5 fifth — Mantis Shrimp: elongated crustacean with large front appendages
const MantisShrimp = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.51} viewBox="0 0 94 48">
    <defs>
      <radialGradient id={`ms-b-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.9" />
      </radialGradient>
    </defs>
    {/* Segmented tail fan */}
    <path d="M72 18 Q76 12 80 14 Q82 18 80 22 Q82 24 80 28 Q76 26 72 24 Z" fill={colors.fin} opacity="0.8" />
    <path d="M76 16 Q80 14 82 16" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.4" />
    <path d="M74 22 Q80 22 82 24" stroke={colors.accent} strokeWidth="0.4" fill="none" opacity="0.35" />
    <path d="M76 20 Q82 22 84 24 Q86 28 82 30 Q76 28 72 24 Z" fill={colors.fin} opacity="0.6" />
    <path d="M76 18 Q82 16 86 20 Q86 26 82 28 Q76 26 72 22 Z" fill={colors.accent} opacity="0.4" />
    {/* Segmented body */}
    <path d="M6 24 Q6 16 16 14 Q32 12 72 18 Q76 20 76 24 Q76 28 72 30 Q32 36 16 34 Q6 32 6 24 Z" fill={`url(#ms-b-${id})`} />
    {/* Body segments */}
    <path d="M20 14 Q20 24 20 34" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.25" />
    <path d="M30 13 Q30 24 30 35" stroke={colors.accent} strokeWidth="0.7" fill="none" opacity="0.22" />
    <path d="M40 12 Q40 24 40 36" stroke={colors.accent} strokeWidth="0.7" fill="none" opacity="0.2" />
    <path d="M50 13 Q50 24 50 35" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.18" />
    <path d="M60 14 Q60 24 60 34" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.16" />
    {/* Swimmerets — small legs */}
    <path d="M22 34 L22 40" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.5" />
    <path d="M30 35 L30 42" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.5" />
    <path d="M38 36 L38 42" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.45" />
    <path d="M46 35 L46 41" stroke={colors.fin} strokeWidth="0.7" fill="none" opacity="0.4" />
    <path d="M54 34 L54 40" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.35" />
    <path d="M62 33 L62 38" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.3" />
    {/* Large raptorial appendages — mantis shrimp signature */}
    <path d="M10 20 Q4 14 2 18 Q4 22 8 22 Z" fill={colors.fin} opacity="0.7" />
    <path d="M10 24 Q4 30 2 28 Q4 24 8 24 Z" fill={colors.fin} opacity="0.65" />
    {/* Appendage joints */}
    <circle cx="8" cy="20" r="1.5" fill={colors.accent} opacity="0.5" />
    <circle cx="8" cy="26" r="1.5" fill={colors.accent} opacity="0.5" />
    {/* Antennae */}
    <path d="M10 18 Q6 10 2 6" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.5" strokeLinecap="round" />
    <path d="M10 20 Q8 12 6 8" stroke={colors.fin} strokeWidth="0.6" fill="none" opacity="0.4" strokeLinecap="round" />
    {/* Eye — compound stalked eye */}
    <path d="M10 20 Q8 16 10 14 Q12 14 14 16" stroke={colors.fin} strokeWidth="0.8" fill="none" opacity="0.5" />
    <circle cx="12" cy="16" r="3.5" fill="white" />
    <circle cx="12" cy="16" r="3.5" stroke={colors.accent} strokeWidth="0.5" fill="none" opacity="0.4" />
    <circle cx="11.5" cy="15.5" r="2" fill={colors.eye} />
    <circle cx="11" cy="15" r="0.8" fill="white" opacity="0.8" />
    {/* Rainbow iridescence */}
    <path d="M18 16 Q36 14 56 16" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
    <path d="M16 22 Q36 20 60 22" stroke={colors.fin} strokeWidth="1" fill="none" opacity="0.25" strokeLinecap="round" />
  </svg>
))
MantisShrimp.displayName = "MantisShrimp"

// Tier 5 sixth — Leafy Seadragon: elaborate leaf-like appendages all over body
const LeafySeadragon = memo(({ colors, size, id }: { colors: FishColors; size: number; id: string }) => (
  <svg width={size} height={size * 0.79} viewBox="0 0 96 76">
    <defs>
      <radialGradient id={`ls-b-${id}`} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="60%" stopColor={colors.body} />
        <stop offset="100%" stopColor={colors.body} stopOpacity="0.9" />
      </radialGradient>
      <linearGradient id={`ls-l-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={colors.fin} stopOpacity="0.8" />
        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.4" />
      </linearGradient>
    </defs>
    {/* Leaf appendages — distributed all over */}
    {/* Upper leaf sprouts */}
    <path d="M24 26 Q20 18 16 14 Q18 12 22 14 Q26 18 26 24 Z" fill={`url(#ls-l-${id})`} opacity="0.75" />
    <path d="M32 22 Q30 12 28 6 Q32 4 34 8 Q36 14 34 22 Z" fill={`url(#ls-l-${id})`} opacity="0.7" />
    <path d="M42 20 Q42 10 44 4 Q48 4 48 10 Q48 16 46 20 Z" fill={`url(#ls-l-${id})`} opacity="0.72" />
    <path d="M52 22 Q54 12 58 8 Q62 10 60 16 Q58 20 54 22 Z" fill={`url(#ls-l-${id})`} opacity="0.68" />
    {/* Lower leaf sprouts */}
    <path d="M26 42 Q22 50 18 54 Q16 52 18 46 Q22 42 26 44 Z" fill={`url(#ls-l-${id})`} opacity="0.7" />
    <path d="M36 46 Q34 56 32 62 Q28 62 30 56 Q32 50 36 48 Z" fill={`url(#ls-l-${id})`} opacity="0.68" />
    <path d="M46 44 Q48 54 46 62 Q42 64 42 56 Q42 50 46 46 Z" fill={`url(#ls-l-${id})`} opacity="0.7" />
    <path d="M56 42 Q60 50 60 58 Q56 60 54 54 Q54 48 56 44 Z" fill={`url(#ls-l-${id})`} opacity="0.65" />
    {/* Side appendages */}
    <path d="M30 32 Q22 28 16 24 Q16 20 20 22 Q28 26 32 32 Z" fill={`url(#ls-l-${id})`} opacity="0.65" />
    <path d="M62 34 Q70 28 76 26 Q78 30 74 32 Q68 34 64 36 Z" fill={`url(#ls-l-${id})`} opacity="0.6" />
    {/* Tail appendages */}
    <path d="M68 38 Q76 32 82 30 Q84 34 80 36 Q74 38 70 40 Z" fill={`url(#ls-l-${id})`} opacity="0.6" />
    <path d="M70 42 Q80 42 86 44 Q86 48 82 48 Q74 46 70 44 Z" fill={`url(#ls-l-${id})`} opacity="0.55" />
    {/* Main elongated body */}
    <path d="M6 36 Q6 26 16 24 Q32 22 62 30 Q70 34 74 38 Q70 44 62 48 Q32 58 16 52 Q6 48 6 36 Z" fill={`url(#ls-b-${id})`} />
    {/* Body segments */}
    <path d="M20 24 Q18 36 18 44 Q18 50 20 52" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.2" />
    <path d="M30 22 Q28 36 28 44 Q28 50 30 54" stroke={colors.accent} strokeWidth="0.7" fill="none" opacity="0.18" />
    <path d="M40 22 Q38 36 38 44 Q38 50 40 56" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.16" />
    <path d="M50 24 Q48 36 48 44 Q48 50 50 54" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.15" />
    {/* Head and snout */}
    <path d="M6 36 Q4 32 6 28 Q10 24 14 26 Q14 30 14 36 Q14 42 14 46 Q10 48 6 44 Q4 40 6 36 Z" fill={colors.body} />
    {/* Long snout */}
    <path d="M4 34 Q0 32 0 36 Q0 40 4 38" fill={colors.fin} opacity="0.8" />
    {/* Dorsal fin — hidden among appendages */}
    <path d="M28 24 Q34 18 42 18 Q50 20 56 24 Q50 26 40 26 Q32 25 28 25 Z" fill={colors.fin} opacity="0.6" />
    {/* Eye */}
    <circle cx="10" cy="33" r="4" fill="white" />
    <circle cx="9.5" cy="32.5" r="2.4" fill={colors.eye} />
    <circle cx="9" cy="32" r="1" fill="white" opacity="0.8" />
    {/* Sparkles — iridescent quality */}
    <circle cx="28" cy="30" r="0.6" fill="white" opacity="0.4" />
    <circle cx="44" cy="28" r="0.5" fill="white" opacity="0.35" />
    <circle cx="58" cy="34" r="0.5" fill="white" opacity="0.3" />
  </svg>
))
LeafySeadragon.displayName = "LeafySeadragon"

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
  // ── Molly (Tier 0) — Friendly plump beginner fish ──
  'molly': [
    { name: 'Black',        colors: { body: '#263238', fin: '#1B1B1B', accent: '#455A64', eye: '#E0E0E0' } },
    { name: 'Dalmatian',    colors: { body: '#ECEFF1', fin: '#37474F', accent: '#CFD8DC', eye: '#1B1B1B' } },
    { name: 'Gold Dust',    colors: { body: '#F9A825', fin: '#F57F17', accent: '#FFF176', eye: '#1B1B1B' } },
    { name: 'Creamsicle',   colors: { body: '#FF8A65', fin: '#FF5722', accent: '#FFE0B2', eye: '#1B1B1B' } },
    { name: 'Silver',       colors: { body: '#B0BEC5', fin: '#78909C', accent: '#ECEFF1', eye: '#1B1B1B' } },
    { name: 'Balloon',      colors: { body: '#EF5350', fin: '#C62828', accent: '#FFCDD2', eye: '#1B1B1B' } },
  ],
  // ── Rasbora (Tier 1) — Sleek schooling fish ──
  'rasbora': [
    { name: 'Harlequin',    colors: { body: '#FF8F00', fin: '#4E342E', accent: '#FFE082', eye: '#1B1B1B' } },
    { name: 'Chili',        colors: { body: '#D32F2F', fin: '#B71C1C', accent: '#FF8A80', eye: '#1B1B1B' } },
    { name: 'Galaxy',       colors: { body: '#1A237E', fin: '#0D1642', accent: '#FFD54F', eye: '#FFC107' } },
    { name: 'Emerald',      colors: { body: '#2E7D32', fin: '#1B5E20', accent: '#A5D6A7', eye: '#1B1B1B' } },
    { name: 'Copper',       colors: { body: '#BF360C', fin: '#8D6E63', accent: '#FFAB91', eye: '#1B1B1B' } },
    { name: 'Brilliant',    colors: { body: '#00BCD4', fin: '#00838F', accent: '#80DEEA', eye: '#1B1B1B' } },
  ],
  // ── Gourami (Tier 2) — Labyrinth fish elegance ──
  'gourami': [
    { name: 'Powder Blue',  colors: { body: '#42A5F5', fin: '#1565C0', accent: '#90CAF9', eye: '#1B1B1B' } },
    { name: 'Flame',        colors: { body: '#FF5722', fin: '#D84315', accent: '#FFAB91', eye: '#1B1B1B' } },
    { name: 'Honey',        colors: { body: '#FFB300', fin: '#FF8F00', accent: '#FFE082', eye: '#4E342E' } },
    { name: 'Moonlight',    colors: { body: '#B0BEC5', fin: '#78909C', accent: '#E0F7FA', eye: '#E040FB' } },
    { name: 'Pearl',        colors: { body: '#BCAAA4', fin: '#795548', accent: '#EFEBE9', eye: '#1B1B1B' } },
    { name: 'Neon',         colors: { body: '#00E5FF', fin: '#0097A7', accent: '#18FFFF', eye: '#1B1B1B' } },
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
  // ── Koi (Tier 5) — Legendary ornamental fish ──
  'koi': [
    { name: 'Kohaku',       colors: { body: '#FFFFFF', fin: '#E0E0E0', accent: '#D32F2F', eye: '#1B1B1B' } },
    { name: 'Showa',        colors: { body: '#1B1B1B', fin: '#263238', accent: '#D32F2F', eye: '#FFD700' } },
    { name: 'Tancho',       colors: { body: '#FFFFFF', fin: '#CFD8DC', accent: '#C62828', eye: '#1B1B1B' } },
    { name: 'Ogon',         colors: { body: '#FFD54F', fin: '#F9A825', accent: '#FFF8E1', eye: '#FF6F00' } },
    { name: 'Asagi',        colors: { body: '#1565C0', fin: '#0D47A1', accent: '#EF5350', eye: '#FFD700' } },
    { name: 'Butterfly',    colors: { body: '#ECEFF1', fin: '#37474F', accent: '#FF8F00', eye: '#1B1B1B' } },
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
  // ── Cardinal Tetra (Tier 1) — Vivid full-red iridescent schooling fish ──
  'cardinal-tetra': [
    { name: 'Classic',      colors: { body: '#1565C0', fin: '#C62828', accent: '#64B5F6', eye: '#1B1B1B' } },
    { name: 'Deep Blue',    colors: { body: '#0D47A1', fin: '#B71C1C', accent: '#42A5F5', eye: '#1B1B1B' } },
    { name: 'Neon',         colors: { body: '#1E88E5', fin: '#D32F2F', accent: '#00E5FF', eye: '#1B1B1B' } },
    { name: 'Midnight',     colors: { body: '#1A237E', fin: '#880E4F', accent: '#7C4DFF', eye: '#E0E0E0' } },
    { name: 'Violet',       colors: { body: '#6A1B9A', fin: '#AD1457', accent: '#CE93D8', eye: '#1B1B1B' } },
    { name: 'Ember',        colors: { body: '#0288D1', fin: '#BF360C', accent: '#80DEEA', eye: '#1B1B1B' } },
  ],
  // ── White Cloud (Tier 1) — Delicate, colorful mountain minnow ──
  'white-cloud': [
    { name: 'Classic',      colors: { body: '#5C8A3C', fin: '#D32F2F', accent: '#A5D6A7', eye: '#1B1B1B' } },
    { name: 'Gold',         colors: { body: '#FFA726', fin: '#F44336', accent: '#FFF9C4', eye: '#1B1B1B' } },
    { name: 'Meteor',       colors: { body: '#FF7043', fin: '#C62828', accent: '#FFCCBC', eye: '#1B1B1B' } },
    { name: 'Sky',          colors: { body: '#42A5F5', fin: '#1565C0', accent: '#E1F5FE', eye: '#1B1B1B' } },
    { name: 'Rose',         colors: { body: '#EC407A', fin: '#AD1457', accent: '#FCE4EC', eye: '#1B1B1B' } },
    { name: 'Albino',       colors: { body: '#FFECB3', fin: '#FFB300', accent: '#FFFFFF', eye: '#EF5350' } },
  ],
  // ── Killifish (Tier 1) — Colorful, spotted surface fish ──
  'killifish': [
    { name: 'Notho',        colors: { body: '#1565C0', fin: '#D32F2F', accent: '#FFD600', eye: '#1B1B1B' } },
    { name: 'Gardneri',     colors: { body: '#2E7D32', fin: '#F57F17', accent: '#A5D6A7', eye: '#FFD700' } },
    { name: 'Clown',        colors: { body: '#FF8F00', fin: '#4E342E', accent: '#FFEB3B', eye: '#1B1B1B' } },
    { name: 'American',     colors: { body: '#546E7A', fin: '#FF6F00', accent: '#B0BEC5', eye: '#FFD700' } },
    { name: 'Peacock',      colors: { body: '#00897B', fin: '#BF360C', accent: '#80CBC4', eye: '#FFD700' } },
    { name: 'Lyretail',     colors: { body: '#7B1FA2', fin: '#F57F17', accent: '#CE93D8', eye: '#1B1B1B' } },
  ],
  // ── Swordtail (Tier 2) — Classic livebearer with elongated lower tail ──
  'swordtail': [
    { name: 'Red',          colors: { body: '#D32F2F', fin: '#B71C1C', accent: '#FF8A80', eye: '#1B1B1B' } },
    { name: 'Green',        colors: { body: '#388E3C', fin: '#1B5E20', accent: '#A5D6A7', eye: '#1B1B1B' } },
    { name: 'Pineapple',    colors: { body: '#FFB300', fin: '#4E342E', accent: '#FFF59D', eye: '#1B1B1B' } },
    { name: 'Tuxedo',       colors: { body: '#263238', fin: '#B71C1C', accent: '#B0BEC5', eye: '#E0E0E0' } },
    { name: 'Neon Blue',    colors: { body: '#1E88E5', fin: '#0D47A1', accent: '#00E5FF', eye: '#1B1B1B' } },
    { name: 'Sunset',       colors: { body: '#FF7043', fin: '#E64A19', accent: '#FFD54F', eye: '#1B1B1B' } },
  ],
  // ── Ram Cichlid (Tier 2) — Jewel of the aquarium ──
  'ram-cichlid': [
    { name: 'German Blue',  colors: { body: '#1565C0', fin: '#F9A825', accent: '#82B1FF', eye: '#FFD700' } },
    { name: 'Electric Blue', colors: { body: '#00B0FF', fin: '#0288D1', accent: '#B3E5FC', eye: '#FFD700' } },
    { name: 'Gold',         colors: { body: '#FFD600', fin: '#FF6F00', accent: '#FFF9C4', eye: '#1B1B1B' } },
    { name: 'Balloon',      colors: { body: '#EF5350', fin: '#B71C1C', accent: '#FFCDD2', eye: '#FFD700' } },
    { name: 'Longfin',      colors: { body: '#5E35B1', fin: '#1A237E', accent: '#B39DDB', eye: '#FFD700' } },
    { name: 'Wild',         colors: { body: '#8D6E63', fin: '#4E342E', accent: '#FFEB3B', eye: '#FFD700' } },
  ],
  // ── Pleco (Tier 2) — Armored algae eater ──
  'pleco': [
    { name: 'Common',       colors: { body: '#5D4037', fin: '#3E2723', accent: '#A1887F', eye: '#1B1B1B' } },
    { name: 'Gold Nugget',  colors: { body: '#263238', fin: '#1B1B1B', accent: '#FFD600', eye: '#FFD700' } },
    { name: 'Zebra L46',    colors: { body: '#1B1B1B', fin: '#1B1B1B', accent: '#FFFFFF', eye: '#E0E0E0' } },
    { name: 'Clown L104',   colors: { body: '#FF8F00', fin: '#4E342E', accent: '#FFEB3B', eye: '#1B1B1B' } },
    { name: 'Bristlenose',  colors: { body: '#455A64', fin: '#263238', accent: '#78909C', eye: '#1B1B1B' } },
    { name: 'Royal',        colors: { body: '#1B1B1B', fin: '#0D1642', accent: '#3F51B5', eye: '#64B5F6' } },
  ],
  // ── Mandarin (Tier 3) — Most colorful fish in the sea ──
  'mandarin': [
    { name: 'Classic',      colors: { body: '#E65100', fin: '#1565C0', accent: '#00E676', eye: '#1B1B1B' } },
    { name: 'Psychedelic',  colors: { body: '#6A1B9A', fin: '#00695C', accent: '#FF6D00', eye: '#1B1B1B' } },
    { name: 'Neon',         colors: { body: '#00B0FF', fin: '#FF6D00', accent: '#AEEA00', eye: '#1B1B1B' } },
    { name: 'Deep Sea',     colors: { body: '#1A237E', fin: '#004D40', accent: '#00E5FF', eye: '#FFD700' } },
    { name: 'Fire',         colors: { body: '#D32F2F', fin: '#E65100', accent: '#FFD600', eye: '#1B1B1B' } },
    { name: 'Mystic',       colors: { body: '#7B1FA2', fin: '#1565C0', accent: '#FF4081', eye: '#FFD700' } },
  ],
  // ── Wrasse (Tier 3) — Bold reef cleaners with thick lips ──
  'wrasse': [
    { name: 'Bird',         colors: { body: '#1565C0', fin: '#F57F17', accent: '#82B1FF', eye: '#FFD700' } },
    { name: 'Six Line',     colors: { body: '#FF6F00', fin: '#1565C0', accent: '#FFEB3B', eye: '#1B1B1B' } },
    { name: 'Fairy',        colors: { body: '#7B1FA2', fin: '#FF6F00', accent: '#CE93D8', eye: '#FFD700' } },
    { name: 'Cleaner',      colors: { body: '#1B1B1B', fin: '#1565C0', accent: '#F5F5F5', eye: '#1B1B1B' } },
    { name: 'Lunare',       colors: { body: '#1B5E20', fin: '#F9A825', accent: '#A5D6A7', eye: '#FFD700' } },
    { name: 'Dragon',       colors: { body: '#D32F2F', fin: '#1B5E20', accent: '#FFD600', eye: '#1B1B1B' } },
  ],
  // ── Butterflyfish (Tier 3) — Disc-shaped reef fish with eye spots ──
  'butterflyfish': [
    { name: 'Copperband',   colors: { body: '#FFFFFF', fin: '#FF8F00', accent: '#FFECB3', eye: '#1B1B1B' } },
    { name: 'Raccoon',      colors: { body: '#FFD600', fin: '#263238', accent: '#FFEE58', eye: '#1B1B1B' } },
    { name: 'Threadfin',    colors: { body: '#FFF8E1', fin: '#FF8F00', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Saddleback',   colors: { body: '#FFFFFF', fin: '#1B1B1B', accent: '#FF8F00', eye: '#1B1B1B' } },
    { name: 'Longnose',     colors: { body: '#FFD600', fin: '#1B1B1B', accent: '#FFFFFF', eye: '#1B1B1B' } },
    { name: 'Teardrop',     colors: { body: '#FFE082', fin: '#4E342E', accent: '#FFFFFF', eye: '#1B1B1B' } },
  ],
  // ── Moorish Idol (Tier 4) — Iconic banner fish ──
  'moorish-idol': [
    { name: 'Classic',      colors: { body: '#FFFFFF', fin: '#1B1B1B', accent: '#FFD600', eye: '#1B1B1B' } },
    { name: 'Deep',         colors: { body: '#E3F2FD', fin: '#0D47A1', accent: '#FFB300', eye: '#1B1B1B' } },
    { name: 'Golden',       colors: { body: '#FFF8E1', fin: '#FF8F00', accent: '#FFD600', eye: '#FF6F00' } },
    { name: 'Noir',         colors: { body: '#37474F', fin: '#1B1B1B', accent: '#FFEE58', eye: '#FFEE58' } },
    { name: 'Coral',        colors: { body: '#FBE9E7', fin: '#BF360C', accent: '#FFAB91', eye: '#1B1B1B' } },
    { name: 'Ocean',        colors: { body: '#E1F5FE', fin: '#01579B', accent: '#80D8FF', eye: '#1B1B1B' } },
  ],
  // ── Lionfish (Tier 4) — Venomous beauty of the reef ──
  'lionfish': [
    { name: 'Red',          colors: { body: '#B71C1C', fin: '#3E2723', accent: '#FFCDD2', eye: '#FFD700' } },
    { name: 'Volitans',     colors: { body: '#4E342E', fin: '#1B1B1B', accent: '#D7CCC8', eye: '#FFD700' } },
    { name: 'Antennata',    colors: { body: '#5D4037', fin: '#263238', accent: '#FFEB3B', eye: '#FFD700' } },
    { name: 'Fuzzy',        colors: { body: '#7B1FA2', fin: '#1A237E', accent: '#CE93D8', eye: '#FFD700' } },
    { name: 'Scorpion',     colors: { body: '#FF6F00', fin: '#4E342E', accent: '#FFCC80', eye: '#1B1B1B' } },
    { name: 'Miles',        colors: { body: '#BF360C', fin: '#4E342E', accent: '#FFAB91', eye: '#FFD700' } },
  ],
  // ── Seahorse (Tier 4) — Majestic vertical dancers ──
  'seahorse': [
    { name: 'Yellow',       colors: { body: '#FFD600', fin: '#F9A825', accent: '#FFF176', eye: '#1B1B1B' } },
    { name: 'Spotted',      colors: { body: '#FF8A65', fin: '#BF360C', accent: '#FFCCBC', eye: '#1B1B1B' } },
    { name: 'Leafy',        colors: { body: '#388E3C', fin: '#1B5E20', accent: '#A5D6A7', eye: '#1B1B1B' } },
    { name: 'Pygmy',        colors: { body: '#F48FB1', fin: '#AD1457', accent: '#FCE4EC', eye: '#1B1B1B' } },
    { name: 'Purple',       colors: { body: '#7B1FA2', fin: '#4A148C', accent: '#CE93D8', eye: '#FFD700' } },
    { name: 'Silver',       colors: { body: '#B0BEC5', fin: '#546E7A', accent: '#ECEFF1', eye: '#1B1B1B' } },
  ],
  // ── Dragonet (Tier 5) — Ultimate psychedelic reef fish ──
  'dragonet': [
    { name: 'Mandarin',     colors: { body: '#E65100', fin: '#1565C0', accent: '#00E676', eye: '#1B1B1B' } },
    { name: 'Picturesque',  colors: { body: '#1565C0', fin: '#E65100', accent: '#AEEA00', eye: '#1B1B1B' } },
    { name: 'Psychedelic',  colors: { body: '#6A1B9A', fin: '#00695C', accent: '#FF6D00', eye: '#1B1B1B' } },
    { name: 'Red',          colors: { body: '#D32F2F', fin: '#1B1B1B', accent: '#FFD600', eye: '#FFD700' } },
    { name: 'Starry',       colors: { body: '#0D47A1', fin: '#1B5E20', accent: '#FFFFFF', eye: '#FFD700' } },
    { name: 'Neon',         colors: { body: '#00BFA5', fin: '#FF6D00', accent: '#AEEA00', eye: '#1B1B1B' } },
  ],
  // ── Mantis Shrimp (Tier 5) — Most colorful crustacean, apex predator ──
  'mantis-shrimp': [
    { name: 'Peacock',      colors: { body: '#00897B', fin: '#D32F2F', accent: '#AEEA00', eye: '#FFD700' } },
    { name: 'Rainbow',      colors: { body: '#6A1B9A', fin: '#E65100', accent: '#00E5FF', eye: '#FFD700' } },
    { name: 'Scarlet',      colors: { body: '#C62828', fin: '#263238', accent: '#FFCDD2', eye: '#FFD700' } },
    { name: 'Ocean',        colors: { body: '#0277BD', fin: '#01579B', accent: '#80D8FF', eye: '#FFD700' } },
    { name: 'Emerald',      colors: { body: '#2E7D32', fin: '#1B5E20', accent: '#B9F6CA', eye: '#FFD700' } },
    { name: 'Royal',        colors: { body: '#4527A0', fin: '#1A237E', accent: '#B388FF', eye: '#FFD700' } },
  ],
  // ── Leafy Seadragon (Tier 5) — Living work of art ──
  'leafy-seadragon': [
    { name: 'Golden',       colors: { body: '#FFD600', fin: '#F57F17', accent: '#FFF59D', eye: '#1B1B1B' } },
    { name: 'Red',          colors: { body: '#C62828', fin: '#B71C1C', accent: '#FFCDD2', eye: '#1B1B1B' } },
    { name: 'Weedy',        colors: { body: '#FFB300', fin: '#388E3C', accent: '#FFF176', eye: '#1B1B1B' } },
    { name: 'Blue',         colors: { body: '#1565C0', fin: '#0D47A1', accent: '#82B1FF', eye: '#FFD700' } },
    { name: 'Phantom',      colors: { body: '#37474F', fin: '#1B1B1B', accent: '#78909C', eye: '#80DEEA' } },
    { name: 'Bioluminous',  colors: { body: '#00897B', fin: '#004D40', accent: '#00E5FF', eye: '#E0F7FA' } },
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
  | 'molly' | 'rasbora' | 'gourami' | 'clownfish' | 'tang' | 'koi'
  | 'platy' | 'danio' | 'minnow'
  | 'cardinal-tetra' | 'white-cloud' | 'killifish'
  | 'swordtail' | 'ram-cichlid' | 'pleco'
  | 'mandarin' | 'wrasse' | 'butterflyfish'
  | 'moorish-idol' | 'lionfish' | 'seahorse'
  | 'dragonet' | 'mantis-shrimp' | 'leafy-seadragon'

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
  'molly': 0,
  'rasbora': 1,
  'gourami': 2,
  'clownfish': 3,
  'tang': 4,
  'koi': 5,
  'platy': 0, 'danio': 0, 'minnow': 0,
  'cardinal-tetra': 1, 'white-cloud': 1, 'killifish': 1,
  'swordtail': 2, 'ram-cichlid': 2, 'pleco': 2,
  'mandarin': 3, 'wrasse': 3, 'butterflyfish': 3,
  'moorish-idol': 4, 'lionfish': 4, 'seahorse': 4,
  'dragonet': 5, 'mantis-shrimp': 5, 'leafy-seadragon': 5,
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
  // Third skins
  'molly': 'M6 19 Q6 5 24 5 Q42 5 42 19 Q42 33 24 33 Q6 33 6 19 Z',
  'rasbora': 'M8 20 Q8 8 28 8 Q48 8 48 20 Q48 32 28 32 Q8 32 8 20 Z',
  'gourami': 'M6 26 Q6 9 30 9 Q54 9 54 26 Q54 43 30 43 Q6 43 6 26 Z',
  'clownfish': 'M6 24 Q6 8 30 8 Q54 8 54 24 Q54 40 30 40 Q6 40 6 24 Z',
  'tang': 'M8 34 Q8 12 36 12 Q64 12 64 34 Q64 56 36 56 Q8 56 8 34 Z',
  'koi': 'M6 28 Q6 10 44 10 Q80 10 80 28 Q80 48 44 48 Q6 48 6 28 Z',
  // Fourth skins
  'platy': 'M5 18 Q5 5 22 5 Q40 5 40 18 Q40 31 22 31 Q5 31 5 18 Z',
  'danio': 'M5 17 Q5 7 18 6 Q36 5 44 12 Q48 15 44 22 Q36 29 18 28 Q5 27 5 17 Z',
  'minnow': 'M4 16 Q4 8 16 7 Q30 6 40 11 Q44 14 40 20 Q30 25 16 24 Q4 23 4 16 Z',
  'cardinal-tetra': 'M7 19 Q7 8 28 8 Q48 8 48 19 Q48 30 28 30 Q7 30 7 19 Z',
  'white-cloud': 'M5 18 Q5 8 16 7 Q30 6 46 12 Q50 15 50 18 Q50 21 46 24 Q30 30 16 29 Q5 27 5 18 Z',
  'killifish': 'M5 20 Q5 10 18 8 Q32 7 46 14 Q50 17 50 20 Q50 23 46 26 Q32 33 18 32 Q5 30 5 20 Z',
  'swordtail': 'M7 20 Q7 7 30 7 Q54 7 56 20 Q56 33 30 33 Q7 33 7 20 Z',
  'ram-cichlid': 'M8 26 Q8 10 30 10 Q52 10 54 26 Q54 42 30 42 Q8 42 8 26 Z',
  'pleco': 'M5 20 Q5 10 18 8 Q34 7 56 14 Q60 17 60 20 Q60 23 56 26 Q34 33 18 32 Q5 30 5 20 Z',
  'mandarin': 'M8 26 Q8 10 28 10 Q50 10 52 26 Q52 42 28 42 Q8 42 8 26 Z',
  'wrasse': 'M8 24 Q8 9 32 9 Q58 9 60 24 Q60 39 32 39 Q8 39 8 24 Z',
  'butterflyfish': 'M9 33 Q9 12 30 12 Q52 12 54 33 Q54 54 30 54 Q9 54 9 33 Z',
  'moorish-idol': 'M12 48 Q12 28 36 28 Q60 28 62 48 Q62 68 36 68 Q12 68 12 48 Z',
  'lionfish': 'M14 40 Q14 22 38 22 Q62 22 64 40 Q64 58 38 58 Q14 58 14 40 Z',
  'seahorse': 'M14 36 Q14 14 24 14 Q34 14 34 36 Q34 56 24 56 Q14 56 14 36 Z',
  'dragonet': 'M5 28 Q5 18 18 16 Q36 14 68 22 Q72 25 72 28 Q72 31 68 34 Q36 42 18 40 Q5 38 5 28 Z',
  'mantis-shrimp': 'M5 24 Q5 14 16 12 Q32 10 72 18 Q76 20 76 24 Q76 28 72 30 Q32 36 16 34 Q5 32 5 24 Z',
  'leafy-seadragon': 'M5 36 Q5 24 16 22 Q32 20 62 28 Q70 32 74 36 Q70 42 62 46 Q32 56 16 52 Q5 48 5 36 Z',
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
  // Third skins
  'molly': '0 0 56 39',
  'rasbora': '0 0 64 40',
  'gourami': '0 0 72 52',
  'clownfish': '0 0 70 49',
  'tang': '0 0 82 67',
  'koi': '0 0 96 58',
  // Fourth skins
  'platy': '0 0 54 38',
  'danio': '0 0 58 34',
  'minnow': '0 0 52 32',
  'cardinal-tetra': '0 0 64 38',
  'white-cloud': '0 0 60 36',
  'killifish': '0 0 62 40',
  'swordtail': '0 0 78 46',
  'ram-cichlid': '0 0 68 50',
  'pleco': '0 0 74 44',
  'mandarin': '0 0 68 48',
  'wrasse': '0 0 76 46',
  'butterflyfish': '0 0 72 66',
  'moorish-idol': '0 0 78 80',
  'lionfish': '0 0 86 68',
  'seahorse': '0 0 52 80',
  'dragonet': '0 0 88 56',
  'mantis-shrimp': '0 0 94 48',
  'leafy-seadragon': '0 0 96 76',
}

// Aspect ratios per species
const SPECIES_ASPECTS: Record<string, number> = {
  0: 0.65, 1: 0.65, 2: 0.65, 3: 0.65, 4: 0.75, 5: 0.78,
  'endler': 0.7, 'neon-tetra': 0.61, 'betta': 0.74,
  'angelfish': 1.0, 'discus': 0.9, 'arowana': 0.52,
  'molly': 0.7, 'rasbora': 0.62, 'gourami': 0.72,
  'clownfish': 0.7, 'tang': 0.82, 'koi': 0.6,
  'platy': 0.7, 'danio': 0.59, 'minnow': 0.62,
  'cardinal-tetra': 0.59, 'white-cloud': 0.6, 'killifish': 0.65,
  'swordtail': 0.59, 'ram-cichlid': 0.74, 'pleco': 0.59,
  'mandarin': 0.71, 'wrasse': 0.61, 'butterflyfish': 0.92,
  'moorish-idol': 1.03, 'lionfish': 0.79, 'seahorse': 1.54,
  'dragonet': 0.64, 'mantis-shrimp': 0.51, 'leafy-seadragon': 0.79,
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
        case 'molly': return <MollyFish colors={colors} size={size} id={gradientId} />
        case 'rasbora': return <RasboraFish colors={colors} size={size} id={gradientId} />
        case 'gourami': return <GouramiFish colors={colors} size={size} id={gradientId} />
        case 'clownfish': return <ClownfishFish colors={colors} size={size} id={gradientId} />
        case 'tang': return <TangFish colors={colors} size={size} id={gradientId} />
        case 'koi': return <KoiFish colors={colors} size={size} id={gradientId} />
        case 'platy': return <PlatyFish colors={colors} size={size} id={gradientId} />
        case 'danio': return <DanioFish colors={colors} size={size} id={gradientId} />
        case 'minnow': return <MinnowFish colors={colors} size={size} id={gradientId} />
        case 'cardinal-tetra': return <CardinalTetra colors={colors} size={size} id={gradientId} />
        case 'white-cloud': return <WhiteCloud colors={colors} size={size} id={gradientId} />
        case 'killifish': return <KillifishFish colors={colors} size={size} id={gradientId} />
        case 'swordtail': return <SwordtailFish colors={colors} size={size} id={gradientId} />
        case 'ram-cichlid': return <RamCichlid colors={colors} size={size} id={gradientId} />
        case 'pleco': return <PlecoFish colors={colors} size={size} id={gradientId} />
        case 'mandarin': return <MandarinFish colors={colors} size={size} id={gradientId} />
        case 'wrasse': return <WrasseFish colors={colors} size={size} id={gradientId} />
        case 'butterflyfish': return <ButterflyfishFish colors={colors} size={size} id={gradientId} />
        case 'moorish-idol': return <MoorishIdol colors={colors} size={size} id={gradientId} />
        case 'lionfish': return <LionfishFish colors={colors} size={size} id={gradientId} />
        case 'seahorse': return <SeahorseFish colors={colors} size={size} id={gradientId} />
        case 'dragonet': return <DragonetFish colors={colors} size={size} id={gradientId} />
        case 'mantis-shrimp': return <MantisShrimp colors={colors} size={size} id={gradientId} />
        case 'leafy-seadragon': return <LeafySeadragon colors={colors} size={size} id={gradientId} />
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
