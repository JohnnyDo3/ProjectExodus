'use client'

import { memo } from 'react'

// Pixel-art style SVG fish that evolve based on stock score tiers
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

// Pixel-art Guppy - small, simple
const GuppyFish = memo(({ colors, size }: { colors: FishColors; size: number }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 32 20" shapeRendering="crispEdges">
    {/* Body */}
    <rect x="8" y="6" width="4" height="2" fill={colors.body} />
    <rect x="6" y="8" width="8" height="4" fill={colors.body} />
    <rect x="8" y="12" width="4" height="2" fill={colors.body} />
    {/* Tail */}
    <rect x="14" y="6" width="2" height="2" fill={colors.fin} />
    <rect x="14" y="12" width="2" height="2" fill={colors.fin} />
    <rect x="16" y="4" width="2" height="4" fill={colors.fin} />
    <rect x="16" y="12" width="2" height="4" fill={colors.fin} />
    <rect x="18" y="2" width="2" height="4" fill={colors.fin} />
    <rect x="18" y="14" width="2" height="4" fill={colors.fin} />
    {/* Eye */}
    <rect x="7" y="8" width="2" height="2" fill="white" />
    <rect x="7" y="8" width="1" height="1" fill={colors.eye} />
    {/* Fin accent */}
    <rect x="9" y="14" width="3" height="1" fill={colors.accent} opacity="0.7" />
  </svg>
))
GuppyFish.displayName = 'GuppyFish'

// Pixel-art Tetra - slightly larger, more color
const TetraFish = memo(({ colors, size }: { colors: FishColors; size: number }) => (
  <svg width={size} height={size * 0.65} viewBox="0 0 36 24" shapeRendering="crispEdges">
    {/* Body */}
    <rect x="8" y="8" width="2" height="2" fill={colors.body} />
    <rect x="6" y="10" width="12" height="4" fill={colors.body} />
    <rect x="8" y="8" width="8" height="2" fill={colors.body} />
    <rect x="8" y="14" width="8" height="2" fill={colors.body} />
    {/* Stripe */}
    <rect x="8" y="11" width="10" height="2" fill={colors.accent} opacity="0.8" />
    {/* Tail */}
    <rect x="18" y="8" width="2" height="2" fill={colors.fin} />
    <rect x="18" y="14" width="2" height="2" fill={colors.fin} />
    <rect x="20" y="6" width="2" height="4" fill={colors.fin} />
    <rect x="20" y="14" width="2" height="4" fill={colors.fin} />
    <rect x="22" y="4" width="2" height="4" fill={colors.fin} />
    <rect x="22" y="16" width="2" height="4" fill={colors.fin} />
    {/* Eye */}
    <rect x="7" y="10" width="2" height="2" fill="white" />
    <rect x="7" y="10" width="1" height="1" fill={colors.eye} />
    {/* Dorsal fin */}
    <rect x="10" y="6" width="4" height="2" fill={colors.fin} opacity="0.8" />
    {/* Bottom fin */}
    <rect x="11" y="16" width="3" height="2" fill={colors.fin} opacity="0.6" />
  </svg>
))
TetraFish.displayName = 'TetraFish'

// Pixel-art Angelfish - tall, elegant
const AngelfishFish = memo(({ colors, size }: { colors: FishColors; size: number }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 32 40" shapeRendering="crispEdges">
    {/* Dorsal fin - tall */}
    <rect x="12" y="2" width="2" height="2" fill={colors.fin} />
    <rect x="11" y="4" width="4" height="2" fill={colors.fin} />
    <rect x="10" y="6" width="6" height="2" fill={colors.fin} />
    {/* Body */}
    <rect x="8" y="8" width="10" height="2" fill={colors.body} />
    <rect x="6" y="10" width="14" height="2" fill={colors.body} />
    <rect x="4" y="12" width="16" height="4" fill={colors.body} />
    <rect x="6" y="16" width="14" height="2" fill={colors.body} />
    <rect x="8" y="18" width="10" height="2" fill={colors.body} />
    {/* Stripes */}
    <rect x="10" y="10" width="2" height="10" fill={colors.accent} opacity="0.5" />
    <rect x="14" y="10" width="2" height="10" fill={colors.accent} opacity="0.5" />
    {/* Bottom fin - tall */}
    <rect x="10" y="20" width="6" height="2" fill={colors.fin} />
    <rect x="11" y="22" width="4" height="2" fill={colors.fin} />
    <rect x="12" y="24" width="2" height="2" fill={colors.fin} />
    {/* Tail */}
    <rect x="20" y="10" width="2" height="2" fill={colors.fin} />
    <rect x="20" y="16" width="2" height="2" fill={colors.fin} />
    <rect x="22" y="8" width="2" height="4" fill={colors.fin} />
    <rect x="22" y="16" width="2" height="4" fill={colors.fin} />
    <rect x="24" y="6" width="2" height="4" fill={colors.fin} />
    <rect x="24" y="18" width="2" height="4" fill={colors.fin} />
    {/* Eye */}
    <rect x="6" y="12" width="3" height="3" fill="white" />
    <rect x="7" y="13" width="2" height="2" fill={colors.eye} />
    <rect x="7" y="13" width="1" height="1" fill="white" opacity="0.6" />
  </svg>
))
AngelfishFish.displayName = 'AngelfishFish'

// Pixel-art Clownfish - iconic stripes
const ClownfishFish = memo(({ colors, size }: { colors: FishColors; size: number }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 40 28" shapeRendering="crispEdges">
    {/* Body */}
    <rect x="8" y="8" width="4" height="2" fill={colors.body} />
    <rect x="6" y="10" width="20" height="8" fill={colors.body} />
    <rect x="8" y="18" width="4" height="2" fill={colors.body} />
    <rect x="8" y="8" width="14" height="2" fill={colors.body} />
    <rect x="8" y="18" width="14" height="2" fill={colors.body} />
    {/* White stripes */}
    <rect x="10" y="8" width="2" height="12" fill={colors.accent} />
    <rect x="16" y="8" width="2" height="12" fill={colors.accent} />
    <rect x="22" y="10" width="2" height="8" fill={colors.accent} />
    {/* Black outlines on stripes */}
    <rect x="9" y="8" width="1" height="12" fill="#1B1B1B" opacity="0.3" />
    <rect x="12" y="8" width="1" height="12" fill="#1B1B1B" opacity="0.3" />
    <rect x="15" y="8" width="1" height="12" fill="#1B1B1B" opacity="0.3" />
    <rect x="18" y="8" width="1" height="12" fill="#1B1B1B" opacity="0.3" />
    {/* Tail */}
    <rect x="26" y="8" width="2" height="4" fill={colors.fin} />
    <rect x="26" y="16" width="2" height="4" fill={colors.fin} />
    <rect x="28" y="6" width="2" height="4" fill={colors.fin} />
    <rect x="28" y="18" width="2" height="4" fill={colors.fin} />
    <rect x="30" y="4" width="2" height="4" fill={colors.fin} />
    <rect x="30" y="20" width="2" height="4" fill={colors.fin} />
    {/* Eye */}
    <rect x="7" y="11" width="3" height="3" fill="white" />
    <rect x="7" y="11" width="2" height="2" fill={colors.eye} />
    <rect x="7" y="11" width="1" height="1" fill="white" opacity="0.5" />
    {/* Dorsal fin */}
    <rect x="12" y="6" width="6" height="2" fill={colors.fin} opacity="0.8" />
    <rect x="14" y="4" width="3" height="2" fill={colors.fin} opacity="0.6" />
    {/* Pectoral fin */}
    <rect x="12" y="20" width="4" height="2" fill={colors.fin} opacity="0.7" />
  </svg>
))
ClownfishFish.displayName = 'ClownfishFish'

// Pixel-art Blue Tang - sleek, blue
const TangFish = memo(({ colors, size }: { colors: FishColors; size: number }) => (
  <svg width={size} height={size * 0.65} viewBox="0 0 44 28" shapeRendering="crispEdges">
    {/* Body - elongated oval */}
    <rect x="8" y="10" width="2" height="2" fill={colors.body} />
    <rect x="6" y="12" width="24" height="4" fill={colors.body} />
    <rect x="8" y="10" width="18" height="2" fill={colors.body} />
    <rect x="8" y="16" width="18" height="2" fill={colors.body} />
    <rect x="10" y="8" width="12" height="2" fill={colors.body} />
    <rect x="10" y="18" width="12" height="2" fill={colors.body} />
    {/* Yellow accent */}
    <rect x="22" y="12" width="6" height="4" fill={colors.accent} />
    <rect x="24" y="10" width="4" height="2" fill={colors.accent} />
    <rect x="24" y="16" width="4" height="2" fill={colors.accent} />
    {/* Dark marking - characteristic shape */}
    <rect x="14" y="10" width="8" height="1" fill="#1A237E" opacity="0.6" />
    <rect x="20" y="11" width="2" height="6" fill="#1A237E" opacity="0.4" />
    <rect x="14" y="17" width="8" height="1" fill="#1A237E" opacity="0.6" />
    {/* Tail */}
    <rect x="30" y="10" width="2" height="3" fill={colors.fin} />
    <rect x="30" y="15" width="2" height="3" fill={colors.fin} />
    <rect x="32" y="8" width="2" height="4" fill={colors.fin} />
    <rect x="32" y="16" width="2" height="4" fill={colors.fin} />
    <rect x="34" y="6" width="2" height="4" fill={colors.accent} />
    <rect x="34" y="18" width="2" height="4" fill={colors.accent} />
    {/* Eye */}
    <rect x="8" y="12" width="3" height="3" fill="white" />
    <rect x="8" y="12" width="2" height="2" fill={colors.eye} />
    <rect x="8" y="12" width="1" height="1" fill="white" opacity="0.5" />
    {/* Dorsal fin */}
    <rect x="12" y="6" width="8" height="2" fill={colors.fin} />
    <rect x="14" y="4" width="4" height="2" fill={colors.fin} opacity="0.7" />
    {/* Ventral fin */}
    <rect x="14" y="20" width="6" height="2" fill={colors.fin} opacity="0.7" />
  </svg>
))
TangFish.displayName = 'TangFish'

// Pixel-art Royal Betta - elaborate flowing fins
const BettaFish = memo(({ colors, size }: { colors: FishColors; size: number }) => (
  <svg width={size} height={size * 0.9} viewBox="0 0 48 44" shapeRendering="crispEdges">
    {/* Elaborate dorsal fin */}
    <rect x="14" y="2" width="2" height="2" fill={colors.accent} opacity="0.5" />
    <rect x="12" y="4" width="6" height="2" fill={colors.accent} opacity="0.6" />
    <rect x="10" y="6" width="10" height="2" fill={colors.fin} opacity="0.7" />
    <rect x="10" y="8" width="12" height="2" fill={colors.fin} opacity="0.8" />
    {/* Body */}
    <rect x="8" y="10" width="16" height="2" fill={colors.body} />
    <rect x="6" y="12" width="20" height="6" fill={colors.body} />
    <rect x="8" y="18" width="16" height="2" fill={colors.body} />
    {/* Body shimmer */}
    <rect x="10" y="13" width="2" height="4" fill={colors.accent} opacity="0.3" />
    <rect x="14" y="12" width="2" height="6" fill={colors.accent} opacity="0.2" />
    <rect x="18" y="13" width="2" height="4" fill={colors.accent} opacity="0.3" />
    {/* Flowing tail - elaborate */}
    <rect x="26" y="10" width="2" height="2" fill={colors.fin} />
    <rect x="26" y="16" width="2" height="2" fill={colors.fin} />
    <rect x="28" y="8" width="2" height="4" fill={colors.fin} />
    <rect x="28" y="16" width="2" height="4" fill={colors.fin} />
    <rect x="30" y="6" width="2" height="4" fill={colors.accent} opacity="0.8" />
    <rect x="30" y="18" width="2" height="4" fill={colors.accent} opacity="0.8" />
    <rect x="32" y="4" width="2" height="4" fill={colors.accent} opacity="0.6" />
    <rect x="32" y="20" width="2" height="4" fill={colors.accent} opacity="0.6" />
    <rect x="34" y="2" width="2" height="6" fill={colors.accent} opacity="0.4" />
    <rect x="34" y="22" width="2" height="6" fill={colors.accent} opacity="0.4" />
    <rect x="36" y="4" width="2" height="4" fill={colors.fin} opacity="0.3" />
    <rect x="36" y="22" width="2" height="4" fill={colors.fin} opacity="0.3" />
    {/* Elaborate ventral fins */}
    <rect x="10" y="20" width="8" height="2" fill={colors.fin} opacity="0.8" />
    <rect x="12" y="22" width="8" height="2" fill={colors.accent} opacity="0.7" />
    <rect x="14" y="24" width="8" height="2" fill={colors.accent} opacity="0.5" />
    <rect x="16" y="26" width="6" height="2" fill={colors.accent} opacity="0.4" />
    <rect x="18" y="28" width="4" height="2" fill={colors.fin} opacity="0.3" />
    {/* Eye - larger, golden for betta */}
    <rect x="7" y="13" width="4" height="4" fill="white" />
    <rect x="8" y="14" width="2" height="2" fill={colors.eye} />
    <rect x="8" y="14" width="1" height="1" fill="white" opacity="0.6" />
    {/* Mouth */}
    <rect x="5" y="15" width="2" height="1" fill={colors.body} />
  </svg>
))
BettaFish.displayName = 'BettaFish'

interface FishSVGProps {
  tier: FishTier
  size?: number
  customColors?: Partial<FishColors>
}

export const FishSVG = memo(({ tier, size = 48, customColors }: FishSVGProps) => {
  const colors = { ...TIER_COLORS[tier], ...customColors }

  switch (tier) {
    case 0: return <GuppyFish colors={colors} size={size} />
    case 1: return <TetraFish colors={colors} size={size} />
    case 2: return <AngelfishFish colors={colors} size={size} />
    case 3: return <ClownfishFish colors={colors} size={size} />
    case 4: return <TangFish colors={colors} size={size} />
    case 5: return <BettaFish colors={colors} size={size} />
  }
})
FishSVG.displayName = 'FishSVG'

export { TIER_COLORS }
