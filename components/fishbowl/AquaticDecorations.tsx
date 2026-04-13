'use client'

import { memo, useMemo, type ReactNode } from 'react'
import { SandyBottom, Rock, Kelp, Coral } from './decorations/primitives'
import {
  CoralReefArch,
  SunkenTemple,
  VolcanoFormation,
  DragonStoneArch,
  SunkenSubmarine,
  TreasureCluster,
  SunkenAnchor,
  SunkenShip,
  SunkenSailboat,
  SunkenLog,
  LargeRockFormation,
  StoneCairn,
  BambooGrove,
  SunkenCastle,
  CastleDrawbridge,
  SunkenPyramid,
  SunkenSphinx,
  SunkenTorii,
  StonePagoda,
  AtlanteanDome,
  AtlanteanObelisk,
  DeerSkullWillow,
} from './decorations/structures'
import { THEME_LAYOUTS } from './decorations/themes'

// Aquatic decorations for the fishbowl — split into background, midground, and
// foreground layers with z-axis depth perspective (top of sand = back of tank).
// Sand covers bottom ~35% of tank (y≈208→320).
//
// Layer order (back to front / top to bottom):
//   1. SandyBottom (perspective slope: back of tank y≈208, front y≈300) — z-index 1
//   2. Midground layer (background plants + structures in one SVG — z-index 12)
//      Plants painted first (behind structures), structures painted second (in front)
//   3. Fish swim here (z-index 10-20)
//   4. Foreground layer (small rocks, corals, short plants at front sand, baseY=305 — z-index 25)
//
// Implementation note: heavy SVG component definitions live under ./decorations/*
// so this orchestrator stays small and the bundler can split/HMR the big chunks.

// Re-export primitives + structures for any external consumers
export { SandyBottom, Rock, Kelp, Coral, BubbleStream } from './decorations/primitives'

// ─── Structure renderer ──────────────────────────────────────────────

function renderStructure(s: { type: string; x: number; y: number; scale?: number }) {
  const structureScale = s.scale ?? 2
  let inner: ReactNode
  switch (s.type) {
    case 'coral-arch': inner = <CoralReefArch x={0} y={0} />; break
    case 'sunken-temple': inner = <SunkenTemple x={0} y={0} />; break
    case 'volcano': inner = <VolcanoFormation x={0} y={0} />; break
    case 'dragon-stone': inner = <DragonStoneArch x={0} y={0} />; break
    case 'submarine': inner = <SunkenSubmarine x={0} y={0} />; break
    case 'treasure': inner = <TreasureCluster x={0} y={0} />; break
    case 'shipwreck': inner = <SunkenShip x={0} y={0} />; break
    case 'sailboat': inner = <SunkenSailboat x={0} y={0} />; break
    case 'anchor': inner = <SunkenAnchor x={0} y={0} />; break
    case 'cairn': inner = <StoneCairn x={0} y={0} />; break
    case 'bamboo': inner = <BambooGrove x={0} y={0} />; break
    case 'castle': inner = <SunkenCastle x={0} y={0} />; break
    case 'drawbridge': inner = <CastleDrawbridge x={0} y={0} />; break
    case 'pyramid': inner = <SunkenPyramid x={0} y={0} />; break
    case 'sphinx': inner = <SunkenSphinx x={0} y={0} />; break
    case 'torii': inner = <SunkenTorii x={0} y={0} />; break
    case 'pagoda': inner = <StonePagoda x={0} y={0} />; break
    case 'atlantean-dome': inner = <AtlanteanDome x={0} y={0} />; break
    case 'atlantean-obelisk': inner = <AtlanteanObelisk x={0} y={0} />; break
    case 'deer-skull': inner = <DeerSkullWillow x={0} y={0} />; break
    case 'driftwood': inner = <SunkenLog x={0} y={0} />; break
    case 'rock-formation': inner = <LargeRockFormation x={0} y={0} />; break
    default: return null
  }

  return (
    <g key={`${s.type}-${s.x}`} transform={`translate(${s.x}, ${s.y}) scale(${structureScale})`}>
      {inner}
      {/* Scattered pebbles and sand disturbance at base */}
      <rect x="-8" y="58" width="4" height="3" fill="#78716C" opacity="0.3" />
      <rect x="-4" y="62" width="3" height="2" fill="#6B7280" opacity="0.25" />
      <rect x="-12" y="60" width="3" height="2" fill="#9CA3AF" opacity="0.2" />
      <circle cx="-6" cy="64" r="1.5" fill="#9CA3AF" opacity="0.18" />
      <circle cx="88" cy="63" r="1.2" fill="#78716C" opacity="0.2" />
      <rect x="82" y="60" width="3" height="2" fill="#6B7280" opacity="0.22" />
      <rect x="86" y="58" width="4" height="3" fill="#9CA3AF" opacity="0.18" />
      {/* Small sand mound/disturbance around base */}
      <rect x="-6" y="56" width="8" height="2" fill="#C4A862" opacity="0.15" />
      <rect x="80" y="56" width="10" height="2" fill="#C4A862" opacity="0.12" />
    </g>
  )
}

// ─── Background decoration layer (sand substrate only) ──────────────

export const DecorationBackground = memo(({ width, theme = 'ocean' }: { width: number; theme?: string }) => {
  const layout = THEME_LAYOUTS[theme] || THEME_LAYOUTS.ocean
  const sandColors = layout.sandColors || { color: '#C4A862', lighter: '#D4B872', detail: '#B89B52' }

  return (
    <div className="absolute bottom-0 left-0 w-full z-[1]" style={{ height: '400px' }}>
      <SandyBottom color={sandColors.color} lighter={sandColors.lighter} detail={sandColors.detail} />
    </div>
  )
})
DecorationBackground.displayName = 'DecorationBackground'

// ─── Midground decoration layer (background plants + structures) ─────
// Plants and structures share one SVG so paint order handles layering
// correctly: plants paint first (behind), structures paint second (in front).

export const DecorationMidground = memo(({ width, theme = 'ocean' }: { width: number; theme?: string }) => {
  const layout = THEME_LAYOUTS[theme] || THEME_LAYOUTS.ocean
  const bg = useMemo(() => layout.background, [layout])
  const mg = useMemo(() => layout.midground, [layout])

  return (
    <div className="absolute bottom-0 left-0 w-full z-[12]" style={{ height: '400px', pointerEvents: 'none' }}>
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 800 320"
        preserveAspectRatio="xMidYMax meet"
        shapeRendering="crispEdges"
      >
        {/* Background plants painted first — behind structures */}
        {bg.kelps.map((k, i) => <Kelp key={`bg-kelp-${i}`} {...k} baseY={240} />)}
        {/* Structures painted second — in front of plants */}
        {mg.structures.map(s => renderStructure(s))}
      </svg>
    </div>
  )
})
DecorationMidground.displayName = 'DecorationMidground'

// ─── Foreground decoration layer (in front of fish) ──────────────────

export const DecorationForeground = memo(({ width, theme = 'ocean' }: { width: number; theme?: string }) => {
  const layout = THEME_LAYOUTS[theme] || THEME_LAYOUTS.ocean
  const fg = useMemo(() => layout.foreground, [layout])

  return (
    <div className="absolute bottom-0 left-0 w-full z-[25]" style={{ height: '400px', pointerEvents: 'none' }}>
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 800 320"
        preserveAspectRatio="xMidYMax meet"
        shapeRendering="crispEdges"
      >
        {fg.rocks.map((r, i) => <Rock key={`fg-rock-${i}`} {...r} />)}
        {fg.corals.map((c, i) => <Coral key={`fg-coral-${i}`} {...c} />)}
        {fg.kelps.map((k, i) => <Kelp key={`fg-kelp-${i}`} {...k} baseY={305} />)}
      </svg>
    </div>
  )
})
DecorationForeground.displayName = 'DecorationForeground'

// ─── Legacy single-layer export (backward compat) ────────────────────
export const DecorationLayer = memo(({ width, theme = 'ocean' }: { width: number; theme?: string }) => (
  <>
    <DecorationBackground width={width} theme={theme} />
    <DecorationMidground width={width} theme={theme} />
    <DecorationForeground width={width} theme={theme} />
  </>
))
DecorationLayer.displayName = 'DecorationLayer'
