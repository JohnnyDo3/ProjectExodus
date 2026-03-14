'use client'

import { memo, useMemo, type ReactNode } from 'react'

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

// ─── Sandy Bottom ────────────────────────────────────────────────────

export const SandyBottom = memo(({ color = '#C4A862', lighter = '#D4B872', detail = '#B89B52' }: {
  color?: string
  lighter?: string
  detail?: string
}) => (
  <svg className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 320" shapeRendering="crispEdges">
    {/* Perspective sand bed — slopes from back of tank (y≈208) to front/glass (y=320) */}
    {/* Main sand body */}
    <polygon points="0,208 50,204 120,210 200,206 280,208 360,202 440,206 520,200 600,204 680,198 750,202 800,206 800,320 0,320" fill={color} />
    {/* Back surface highlight strip (top of sand = back wall of tank) */}
    <polygon points="0,208 50,204 120,210 200,206 280,208 360,202 440,206 520,200 600,204 680,198 750,202 800,206 800,218 750,214 680,210 600,216 520,212 440,218 360,214 280,220 200,216 120,224 50,218 0,222" fill={lighter} />
    {/* Depth shading — darker toward back (distance), lighter toward front */}
    <rect x="0" y="204" width="800" height="16" fill="#000" opacity="0.1" />
    <rect x="0" y="220" width="800" height="10" fill="#000" opacity="0.06" />
    {/* Mid-depth sand transition */}
    <rect x="0" y="260" width="800" height="3" fill={lighter} opacity="0.12" />
    {/* Front sand edge highlight (closest to viewer/glass) */}
    <polygon points="0,290 40,292 100,288 180,294 260,290 340,292 420,288 500,292 580,290 660,294 740,288 800,292 800,300 0,300" fill={lighter} opacity="0.35" />

    {/* === Grain detail with depth-scaled perspective === */}
    {/* Back grains — fine, sparse (further away) */}
    {[80, 200, 380, 500, 620, 740].map((gx, i) => (
      <rect key={`bgr-${i}`} x={gx} y={218 + (i % 4) * 4} width="2" height="2" fill={detail} opacity={0.18 + (i % 3) * 0.04} />
    ))}
    {/* Mid grains — medium detail */}
    {[42, 118, 205, 285, 368, 448, 535, 615, 698, 775].map((gx, i) => (
      <rect key={`mgr-${i}`} x={gx} y={245 + (i % 5) * 8} width="3" height="3" fill={detail} opacity={0.22 + (i % 3) * 0.06} />
    ))}
    {/* Front grains — larger, closer to viewer */}
    {[45, 145, 250, 355, 460, 565, 670, 775].map((gx, i) => (
      <rect key={`fgr-${i}`} x={gx} y={285 + (i % 4) * 6} width="4" height="3" fill={detail} opacity={0.28 + (i % 3) * 0.07} />
    ))}

    {/* === Pebble highlights === */}
    {/* Back pebbles */}
    <rect x="200" y="222" width="3" height="2" fill="#E8D5B0" opacity="0.25" rx="1" />
    <rect x="560" y="220" width="3" height="2" fill="#F0E0C0" opacity="0.22" rx="1" />
    {/* Mid pebbles */}
    <rect x="120" y="258" width="4" height="3" fill="#E8D5B0" opacity="0.32" rx="1" />
    <rect x="450" y="262" width="5" height="3" fill="#F0E0C0" opacity="0.28" rx="1" />
    <rect x="680" y="256" width="4" height="3" fill="#E8D5B0" opacity="0.30" rx="1" />
    {/* Front pebbles */}
    <rect x="100" y="296" width="6" height="4" fill="#E8D5B0" opacity="0.42" rx="1" />
    <rect x="400" y="300" width="5" height="4" fill="#F0E0C0" opacity="0.38" rx="1" />
    <rect x="650" y="298" width="6" height="4" fill="#E8D5B0" opacity="0.42" rx="1" />

    {/* Sand ripple lines showing perspective depth */}
    <line x1="50" y1="250" x2="750" y2="250" stroke={lighter} strokeWidth="1" opacity="0.07" />
    <line x1="30" y1="280" x2="770" y2="280" stroke={lighter} strokeWidth="1" opacity="0.06" />
  </svg>
))
SandyBottom.displayName = 'SandyBottom'

// ─── Basic Elements ──────────────────────────────────────────────────

interface RockProps { x: number; y: number; variant?: 'small' | 'medium' | 'large'; color?: string }

export const Rock = memo(({ x, y, variant = 'medium', color = '#6B7280' }: RockProps) => {
  const darker = color === '#6B7280' ? '#4B5563' : '#5A6370'
  const lighter = color === '#6B7280' ? '#9CA3AF' : '#8B939F'

  if (variant === 'small') {
    // ~25×18px bounding box (scaled up from 12×8)
    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect x="3" y="10" width="20" height="10" fill={color} />
        <rect x="6" y="5" width="14" height="7" fill={color} />
        <rect x="9" y="3" width="8" height="4" fill={lighter} />
        <rect x="7" y="10" width="5" height="5" fill={lighter} opacity="0.5" />
        <rect x="16" y="12" width="4" height="3" fill={darker} opacity="0.3" />
      </g>
    )
  }
  if (variant === 'large') {
    // ~70×42px bounding box (scaled up from 32×16)
    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect x="6" y="20" width="60" height="22" fill={color} />
        <rect x="10" y="12" width="52" height="14" fill={color} />
        <rect x="18" y="5" width="36" height="12" fill={lighter} />
        <rect x="14" y="14" width="12" height="10" fill={lighter} opacity="0.4" />
        <rect x="44" y="20" width="16" height="10" fill={darker} opacity="0.3" />
        <rect x="10" y="16" width="8" height="5" fill="#5D8A3C" opacity="0.6" />
        <rect x="50" y="10" width="10" height="5" fill="#5D8A3C" opacity="0.4" />
        {/* Extra detail at this size — crevice lines */}
        <rect x="22" y="18" width="1" height="8" fill={darker} opacity="0.15" />
        <rect x="38" y="14" width="1" height="10" fill={darker} opacity="0.12" />
      </g>
    )
  }
  // Medium: ~42×28px bounding box (scaled up from 20×12)
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="4" y="14" width="40" height="16" fill={color} />
      <rect x="8" y="8" width="32" height="12" fill={color} />
      <rect x="14" y="4" width="20" height="10" fill={lighter} />
      <rect x="12" y="12" width="8" height="8" fill={lighter} opacity="0.4" />
      <rect x="30" y="14" width="10" height="8" fill={darker} opacity="0.3" />
      {/* Moss patch */}
      <rect x="8" y="10" width="6" height="4" fill="#5D8A3C" opacity="0.45" />
    </g>
  )
})
Rock.displayName = 'Rock'

interface KelpProps { x: number; height?: number; variant?: 'thin' | 'wide' | 'bushy'; color?: string; delay?: number; baseY?: number }

// Aquatic plant component — three variants inspired by real aquarium plants:
//   thin:  Vallisneria (jungle val) — long ribbon-like grass blades
//   wide:  Amazon Sword / Java Fern — broad pointed leaf blades from a rosette
//   bushy: Rotala / Cabomba — dense feathery leaves along branching stems

export const Kelp = memo(({ x, height = 60, variant = 'thin', color = '#2E7D32', delay = 0, baseY = 300 }: KelpProps) => {
  const lighter = '#4CAF50'
  const darker = '#1B5E20'
  const topY = baseY - height

  return (
    <g style={{ animation: `kelpSway ${3.5 + (delay % 2)}s ease-in-out ${delay}s infinite`, transformOrigin: `${x}px ${baseY}px` }}>
      {variant === 'thin' && (() => {
        // Vallisneria — 3-5 long ribbon blades from a single root point
        const bladeCount = 3 + Math.floor((height % 20) / 10)
        return (
          <>
            {/* Root cluster at base */}
            <ellipse cx={x} cy={baseY} rx="3" ry="1.5" fill={darker} opacity="0.5" />
            {Array.from({ length: bladeCount }, (_, i) => {
              const spread = (i - (bladeCount - 1) / 2) * 3
              const bladeH = height * (0.7 + (i % 3) * 0.15)
              const midX = x + spread + Math.sin(i * 1.8) * 4
              const tipX = x + spread * 1.5 + Math.sin(i * 2.3) * 6
              const tipY = baseY - bladeH
              const midY = baseY - bladeH * 0.5
              const bladeColor = i % 2 === 0 ? color : lighter
              return (
                <g key={i}>
                  {/* Blade — curved ribbon path */}
                  <path
                    d={`M${x + spread - 1.5} ${baseY} Q${midX - 2} ${midY} ${tipX} ${tipY} L${tipX + 2} ${tipY + 2} Q${midX + 2} ${midY + 4} ${x + spread + 1.5} ${baseY}Z`}
                    fill={bladeColor}
                    opacity={0.85 - i * 0.05}
                  />
                  {/* Center vein */}
                  <path
                    d={`M${x + spread} ${baseY - 2} Q${midX} ${midY} ${tipX + 1} ${tipY + 1}`}
                    stroke={lighter}
                    strokeWidth="0.4"
                    fill="none"
                    opacity="0.3"
                  />
                </g>
              )
            })}
          </>
        )
      })()}
      {variant === 'wide' && (() => {
        // Amazon Sword — rosette of broad, pointed leaves
        const leafCount = 4 + Math.floor((height % 20) / 8)
        return (
          <>
            {/* Root/stem base */}
            <ellipse cx={x} cy={baseY} rx="4" ry="2" fill={darker} opacity="0.5" />
            <rect x={x - 1} y={baseY - 6} width="2" height="6" fill={darker} rx="1" />
            {Array.from({ length: leafCount }, (_, i) => {
              const angle = ((i / leafCount) * 1.4 - 0.7) // spread angle
              const leafH = height * (0.55 + (i % 3) * 0.2)
              const baseOffX = Math.sin(angle) * 3
              const tipX = x + Math.sin(angle) * leafH * 0.5
              const tipY = baseY - leafH
              const midY = baseY - leafH * 0.45
              const leafWidth = 5 + (i % 2) * 2
              const leafColor = i % 3 === 0 ? lighter : i % 3 === 1 ? color : darker
              return (
                <g key={i}>
                  {/* Broad leaf blade */}
                  <path
                    d={`M${x + baseOffX} ${baseY - 6} Q${x + baseOffX - leafWidth} ${midY} ${tipX} ${tipY} Q${x + baseOffX + leafWidth} ${midY} ${x + baseOffX} ${baseY - 6}Z`}
                    fill={leafColor}
                    opacity={0.8 - i * 0.03}
                  />
                  {/* Leaf midrib vein */}
                  <path
                    d={`M${x + baseOffX} ${baseY - 8} Q${x + baseOffX} ${midY} ${tipX} ${tipY}`}
                    stroke={lighter}
                    strokeWidth="0.5"
                    fill="none"
                    opacity="0.25"
                  />
                  {/* Side veins */}
                  {i % 2 === 0 && (
                    <>
                      <path d={`M${x + baseOffX} ${midY + 6} Q${x + baseOffX - 3} ${midY + 2} ${x + baseOffX - leafWidth * 0.6} ${midY + 4}`} stroke={lighter} strokeWidth="0.3" fill="none" opacity="0.15" />
                      <path d={`M${x + baseOffX} ${midY + 6} Q${x + baseOffX + 3} ${midY + 2} ${x + baseOffX + leafWidth * 0.6} ${midY + 4}`} stroke={lighter} strokeWidth="0.3" fill="none" opacity="0.15" />
                    </>
                  )}
                </g>
              )
            })}
          </>
        )
      })()}
      {variant === 'bushy' && (() => {
        // Rotala/Cabomba — multiple branching stems with small leaf clusters
        const stemCount = 2 + Math.floor((height % 15) / 8)
        return (
          <>
            {/* Root mass */}
            <ellipse cx={x} cy={baseY} rx="5" ry="2" fill={darker} opacity="0.45" />
            {Array.from({ length: stemCount }, (_, si) => {
              const stemSpread = (si - (stemCount - 1) / 2) * 5
              const stemH = height * (0.75 + (si % 3) * 0.12)
              const stemX = x + stemSpread
              const curveMag = Math.sin(si * 2.1) * 6
              const nodeCount = Math.floor(stemH / 8)
              return (
                <g key={si}>
                  {/* Stem — curved line */}
                  <path
                    d={`M${stemX} ${baseY} Q${stemX + curveMag} ${baseY - stemH * 0.5} ${stemX + curveMag * 0.5} ${baseY - stemH}`}
                    stroke={color}
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.7"
                  />
                  {/* Leaf clusters along stem */}
                  {Array.from({ length: nodeCount }, (_, ni) => {
                    const t = (ni + 1) / (nodeCount + 1)
                    const nx = stemX + curveMag * t * (1 - t) * 4
                    const ny = baseY - stemH * t
                    const leafSize = 2.5 + (ni % 3) * 0.8
                    const lColor = ni % 2 === 0 ? color : lighter
                    return (
                      <g key={ni}>
                        {/* Feathery leaf pair at each node */}
                        <ellipse cx={nx - leafSize} cy={ny - 1} rx={leafSize} ry={1.2} fill={lColor} opacity={0.7} transform={`rotate(-30 ${nx - leafSize} ${ny - 1})`} />
                        <ellipse cx={nx + leafSize} cy={ny - 1} rx={leafSize} ry={1.2} fill={lColor} opacity={0.7} transform={`rotate(30 ${nx + leafSize} ${ny - 1})`} />
                        {/* Upper smaller pair */}
                        {ni % 2 === 0 && (
                          <>
                            <ellipse cx={nx - leafSize * 0.6} cy={ny - 3} rx={leafSize * 0.7} ry={0.9} fill={lighter} opacity={0.5} transform={`rotate(-45 ${nx - leafSize * 0.6} ${ny - 3})`} />
                            <ellipse cx={nx + leafSize * 0.6} cy={ny - 3} rx={leafSize * 0.7} ry={0.9} fill={lighter} opacity={0.5} transform={`rotate(45 ${nx + leafSize * 0.6} ${ny - 3})`} />
                          </>
                        )}
                      </g>
                    )
                  })}
                  {/* Growing tip at top */}
                  <circle cx={stemX + curveMag * 0.5} cy={baseY - stemH} r="2" fill={lighter} opacity="0.5" />
                </g>
              )
            })}
          </>
        )
      })()}
    </g>
  )
})
Kelp.displayName = 'Kelp'

interface CoralProps { x: number; y: number; variant?: 'branch' | 'brain' | 'fan'; color?: string }

export const Coral = memo(({ x, y, variant = 'branch', color = '#E91E63' }: CoralProps) => {
  const lighter = '#F48FB1'
  const darker = color === '#E91E63' ? '#C2185B' : '#8B4A52'

  if (variant === 'branch') {
    // ~45×50px bounding box (scaled up from ~20×22)
    return (
      <g transform={`translate(${x}, ${y})`}>
        {/* Base */}
        <rect x="12" y="38" width="22" height="12" fill={color} />
        {/* Trunk */}
        <rect x="16" y="24" width="12" height="16" fill={color} />
        {/* Left branch */}
        <rect x="6" y="14" width="12" height="16" fill={color} />
        <rect x="3" y="6" width="10" height="10" fill={lighter} />
        <rect x="5" y="2" width="6" height="6" fill={lighter} opacity="0.8" />
        {/* Right branch */}
        <rect x="28" y="10" width="12" height="20" fill={color} />
        <rect x="30" y="2" width="10" height="10" fill={lighter} />
        <rect x="33" y="-2" width="6" height="6" fill={lighter} opacity="0.8" />
        {/* Middle highlight */}
        <rect x="18" y="16" width="8" height="8" fill={lighter} opacity="0.5" />
        {/* Polyp dots */}
        <rect x="7" y="10" width="3" height="3" fill={lighter} opacity="0.6" />
        <rect x="32" y="6" width="3" height="3" fill={lighter} opacity="0.6" />
        <rect x="20" y="28" width="3" height="3" fill={darker} opacity="0.3" />
      </g>
    )
  }
  if (variant === 'brain') {
    // ~50×40px bounding box (scaled up from ~24×16)
    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect x="6" y="20" width="42" height="20" fill={color} />
        <rect x="10" y="10" width="34" height="16" fill={color} />
        <rect x="16" y="4" width="22" height="10" fill={lighter} />
        {/* Brain meander ridges */}
        <rect x="16" y="14" width="22" height="2" fill={lighter} opacity="0.45" />
        <rect x="10" y="22" width="34" height="2" fill={lighter} opacity="0.4" />
        <rect x="14" y="30" width="26" height="2" fill={lighter} opacity="0.35" />
        <rect x="16" y="38" width="22" height="2" fill={lighter} opacity="0.3" />
        {/* Polyp highlights */}
        <rect x="12" y="16" width="3" height="3" fill={lighter} opacity="0.35" />
        <rect x="34" y="24" width="3" height="3" fill={lighter} opacity="0.3" />
      </g>
    )
  }
  // Fan variant: ~45×50px bounding box (scaled up from ~20×20)
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Stem */}
      <rect x="18" y="34" width="10" height="16" fill={color} />
      {/* Fan body */}
      <rect x="4" y="14" width="40" height="22" fill={color} opacity="0.8" />
      <rect x="8" y="6" width="32" height="14" fill={lighter} opacity="0.6" />
      <rect x="12" y="0" width="22" height="10" fill={lighter} opacity="0.4" />
      {/* Fan holes (transparent polyp cups) */}
      <rect x="14" y="20" width="4" height="4" fill="transparent" />
      <rect x="28" y="16" width="4" height="4" fill="transparent" />
      <rect x="20" y="10" width="4" height="4" fill="transparent" />
      {/* Edge detail */}
      <rect x="4" y="14" width="2" height="22" fill={darker} opacity="0.2" />
      <rect x="42" y="14" width="2" height="22" fill={darker} opacity="0.15" />
    </g>
  )
})
Coral.displayName = 'Coral'

export const BubbleStream = memo(({ x, count = 3 }: { x: number; count?: number }) => (
  <g>
    {Array.from({ length: count }, (_, i) => (
      <circle
        key={i} cx={x + (i % 2) * 4} cy={0} r={2 + (i % 2)}
        fill="rgba(255, 255, 255, 0.3)" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.5"
        style={{ animation: `bubbleRise ${3 + i * 0.7}s ease-in ${i * 1.2}s infinite` }}
      />
    ))}
  </g>
))
BubbleStream.displayName = 'BubbleStream'


// ═══════════════════════════════════════════════════════════════════════
// THEME STRUCTURES — Large, detailed centerpiece decorations
// Each theme has 2 staple structures. ~3x bigger than before with detail.
// ═══════════════════════════════════════════════════════════════════════

// ─── OCEAN: Coral Reef Arch ──────────────────────────────────────────

const CoralReefArch = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Left pillar — massive coral colony (brain + encrusting species) */}
    <rect x="0" y="24" width="22" height="36" fill="#B71C1C" />
    <rect x="2" y="18" width="20" height="10" fill="#C2185B" />
    <rect x="4" y="12" width="16" height="8" fill="#D81B60" />
    <rect x="6" y="8" width="14" height="6" fill="#E91E63" />
    <rect x="8" y="4" width="10" height="6" fill="#F06292" />
    {/* Left pillar: inner shadow depth */}
    <rect x="0" y="24" width="3" height="36" fill="#880E4F" opacity="0.3" />
    <rect x="19" y="24" width="3" height="36" fill="#880E4F" opacity="0.2" />
    {/* Left pillar texture: brain coral meander ridges */}
    <rect x="2" y="20" width="18" height="1" fill="#F48FB1" opacity="0.45" />
    <rect x="4" y="24" width="14" height="1" fill="#FCE4EC" opacity="0.3" />
    <rect x="2" y="28" width="18" height="1" fill="#F48FB1" opacity="0.4" />
    <rect x="4" y="32" width="14" height="1" fill="#FCE4EC" opacity="0.25" />
    <rect x="2" y="36" width="18" height="1" fill="#F48FB1" opacity="0.35" />
    <rect x="4" y="40" width="14" height="1" fill="#FCE4EC" opacity="0.2" />
    <rect x="2" y="44" width="18" height="1" fill="#F48FB1" opacity="0.3" />
    <rect x="6" y="48" width="10" height="1" fill="#F48FB1" opacity="0.25" />
    <rect x="4" y="52" width="14" height="1" fill="#FCE4EC" opacity="0.2" />
    {/* Left pillar: polyp dots */}
    <rect x="4" y="22" width="2" height="2" fill="#F8BBD0" opacity="0.5" />
    <rect x="10" y="26" width="2" height="2" fill="#F8BBD0" opacity="0.45" />
    <rect x="16" y="30" width="2" height="2" fill="#F8BBD0" opacity="0.4" />
    <rect x="6" y="34" width="2" height="2" fill="#F8BBD0" opacity="0.4" />
    <rect x="14" y="38" width="2" height="2" fill="#F8BBD0" opacity="0.35" />
    <rect x="8" y="42" width="2" height="2" fill="#F8BBD0" opacity="0.35" />
    <rect x="12" y="46" width="2" height="2" fill="#F8BBD0" opacity="0.3" />
    {/* Left pillar: encrusting sponge patches */}
    <rect x="0" y="30" width="4" height="4" fill="#FF6F00" opacity="0.35" />
    <rect x="1" y="31" width="2" height="2" fill="#FFB300" opacity="0.25" />
    <rect x="18" y="44" width="4" height="3" fill="#FF6F00" opacity="0.3" />
    {/* Left pillar: barnacles */}
    <rect x="0" y="38" width="3" height="3" fill="#9CA3AF" opacity="0.5" />
    <rect x="1" y="39" width="1" height="1" fill="#B0BEC5" opacity="0.4" />
    <rect x="18" y="50" width="3" height="3" fill="#9CA3AF" opacity="0.4" />
    <rect x="0" y="54" width="4" height="2" fill="#78909C" opacity="0.35" />
    {/* Left pillar: turf algae */}
    <rect x="2" y="56" width="6" height="2" fill="#2E7D32" opacity="0.5" />
    <rect x="0" y="58" width="3" height="2" fill="#388E3C" opacity="0.4" />
    {/* Left pillar: coralline algae (pink crust) */}
    <rect x="8" y="50" width="6" height="2" fill="#CE93D8" opacity="0.3" />
    <rect x="16" y="36" width="4" height="2" fill="#E1BEE7" opacity="0.25" />

    {/* Right pillar — staghorn + fire coral colony */}
    <rect x="70" y="20" width="24" height="40" fill="#E65100" />
    <rect x="72" y="14" width="20" height="10" fill="#FF5722" />
    <rect x="74" y="8" width="18" height="8" fill="#FF7043" />
    <rect x="76" y="4" width="14" height="6" fill="#FF8A65" />
    <rect x="78" y="0" width="10" height="6" fill="#FFAB91" />
    {/* Right pillar inner shading */}
    <rect x="70" y="20" width="3" height="40" fill="#BF360C" opacity="0.3" />
    <rect x="91" y="20" width="3" height="40" fill="#BF360C" opacity="0.2" />
    {/* Staghorn branch projections (pixel-block branching) */}
    <rect x="90" y="16" width="6" height="3" fill="#FF8A65" opacity="0.8" />
    <rect x="94" y="13" width="4" height="3" fill="#FFAB91" opacity="0.7" />
    <rect x="96" y="10" width="3" height="3" fill="#FFCCBC" opacity="0.6" />
    <rect x="92" y="8" width="4" height="3" fill="#FFAB91" opacity="0.5" />
    <rect x="90" y="24" width="6" height="2" fill="#FF7043" opacity="0.6" />
    <rect x="94" y="22" width="4" height="2" fill="#FF8A65" opacity="0.5" />
    {/* Branch tips — growing polyps */}
    <rect x="97" y="9" width="2" height="2" fill="#FFCCBC" opacity="0.7" />
    <rect x="95" y="7" width="2" height="2" fill="#FFE0B2" opacity="0.5" />
    {/* Fire coral warning stripes */}
    <rect x="72" y="24" width="2" height="4" fill="#FFD600" opacity="0.3" />
    <rect x="74" y="30" width="2" height="4" fill="#FFD600" opacity="0.25" />
    <rect x="72" y="38" width="2" height="4" fill="#FFD600" opacity="0.2" />
    {/* Right pillar: sea fan attached */}
    <rect x="66" y="22" width="6" height="10" fill="#AB47BC" opacity="0.5" />
    <rect x="64" y="18" width="4" height="8" fill="#CE93D8" opacity="0.4" />
    <rect x="62" y="22" width="3" height="4" fill="#E1BEE7" opacity="0.3" />
    {/* Sea fan veins */}
    <rect x="67" y="24" width="1" height="6" fill="#9C27B0" opacity="0.3" />
    <rect x="65" y="20" width="1" height="5" fill="#9C27B0" opacity="0.25" />
    {/* Right pillar: tube worm cluster */}
    <rect x="86" y="42" width="2" height="6" fill="#D50000" opacity="0.4" />
    <rect x="88" y="40" width="2" height="8" fill="#FF1744" opacity="0.35" />
    <rect x="90" y="44" width="2" height="5" fill="#D50000" opacity="0.3" />
    {/* Tube worm feathery tops */}
    <rect x="85" y="40" width="4" height="2" fill="#FF8A80" opacity="0.4" />
    <rect x="87" y="38" width="4" height="2" fill="#FFCDD2" opacity="0.3" />
    <rect x="89" y="42" width="4" height="2" fill="#FF8A80" opacity="0.35" />
    {/* Right barnacles */}
    <rect x="88" y="52" width="3" height="3" fill="#9CA3AF" opacity="0.4" />
    <rect x="74" y="54" width="4" height="2" fill="#78909C" opacity="0.35" />
    {/* Right algae */}
    <rect x="72" y="56" width="6" height="2" fill="#1B5E20" opacity="0.4" />

    {/* Arch bridge — connecting coral mass, varied species */}
    <rect x="10" y="4" width="72" height="10" fill="#C2185B" />
    <rect x="14" y="0" width="64" height="6" fill="#E91E63" />
    <rect x="20" y="-2" width="52" height="4" fill="#F06292" />
    <rect x="26" y="-4" width="40" height="3" fill="#F48FB1" opacity="0.7" />
    {/* Arch underside shadow */}
    <rect x="14" y="10" width="64" height="2" fill="#880E4F" opacity="0.25" />
    {/* Arch texture — varied coral ridges */}
    <rect x="18" y="6" width="56" height="1" fill="#AD1457" opacity="0.35" />
    <rect x="24" y="2" width="44" height="1" fill="#F8BBD0" opacity="0.3" />
    <rect x="20" y="-1" width="52" height="1" fill="#FCE4EC" opacity="0.2" />
    {/* Polyp detail on arch surface */}
    <rect x="22" y="4" width="2" height="2" fill="#F8BBD0" opacity="0.4" />
    <rect x="32" y="2" width="2" height="2" fill="#F8BBD0" opacity="0.35" />
    <rect x="44" y="4" width="2" height="2" fill="#F8BBD0" opacity="0.4" />
    <rect x="56" y="2" width="2" height="2" fill="#F8BBD0" opacity="0.35" />
    <rect x="66" y="4" width="2" height="2" fill="#F8BBD0" opacity="0.3" />
    {/* Hanging stalactite-like coral growths from arch */}
    <rect x="28" y="12" width="3" height="6" fill="#D81B60" opacity="0.6" />
    <rect x="29" y="18" width="2" height="3" fill="#E91E63" opacity="0.45" />
    <rect x="42" y="12" width="4" height="8" fill="#C2185B" opacity="0.55" />
    <rect x="43" y="20" width="2" height="4" fill="#D81B60" opacity="0.4" />
    <rect x="54" y="12" width="3" height="5" fill="#E91E63" opacity="0.5" />
    <rect x="64" y="12" width="2" height="4" fill="#C2185B" opacity="0.45" />
    <rect x="36" y="12" width="2" height="3" fill="#D81B60" opacity="0.4" />

    {/* Diverse coral colonies growing on top of arch */}
    {/* Yellow scroll coral */}
    <rect x="34" y="-6" width="8" height="4" fill="#FFD600" opacity="0.6" />
    <rect x="36" y="-10" width="6" height="4" fill="#FFEE58" opacity="0.5" />
    <rect x="38" y="-12" width="4" height="3" fill="#FFF59D" opacity="0.4" />
    <rect x="35" y="-5" width="2" height="2" fill="#FBC02D" opacity="0.4" />
    {/* Blue coral cluster */}
    <rect x="54" y="-4" width="6" height="3" fill="#0097A7" opacity="0.5" />
    <rect x="56" y="-7" width="4" height="3" fill="#00BCD4" opacity="0.45" />
    <rect x="57" y="-9" width="2" height="2" fill="#4DD0E1" opacity="0.35" />
    {/* Green star polyps patch */}
    <rect x="46" y="-3" width="4" height="2" fill="#4CAF50" opacity="0.4" />
    <rect x="44" y="-5" width="3" height="2" fill="#81C784" opacity="0.3" />

    {/* Anemone colony at left base — detailed tentacles */}
    <rect x="6" y="54" width="12" height="6" fill="#6A1B9A" opacity="0.6" />
    <rect x="8" y="52" width="8" height="3" fill="#8E24AA" opacity="0.5" />
    {/* Tentacle tops */}
    <rect x="6" y="50" width="2" height="3" fill="#CE93D8" opacity="0.5" />
    <rect x="10" y="48" width="2" height="4" fill="#E1BEE7" opacity="0.45" />
    <rect x="14" y="50" width="2" height="3" fill="#CE93D8" opacity="0.4" />
    <rect x="8" y="48" width="2" height="2" fill="#F3E5F5" opacity="0.35" />
    <rect x="12" y="49" width="2" height="2" fill="#F3E5F5" opacity="0.3" />
    <rect x="16" y="51" width="2" height="2" fill="#BA68C8" opacity="0.4" />
    {/* Clownfish hint (orange dot in anemone) */}
    <rect x="10" y="54" width="3" height="2" fill="#FF6D00" opacity="0.4" />
    <rect x="11" y="53" width="1" height="1" fill="#FFE0B2" opacity="0.35" />

    {/* Small sea urchin near left base */}
    <circle cx="24" cy="58" r="3" fill="#1A1A2E" opacity="0.5" />
    <rect x="22" y="54" width="1" height="3" fill="#37474F" opacity="0.3" />
    <rect x="25" y="54" width="1" height="3" fill="#37474F" opacity="0.3" />
    <rect x="21" y="56" width="1" height="2" fill="#37474F" opacity="0.25" />
    <rect x="27" y="56" width="1" height="2" fill="#37474F" opacity="0.25" />

    {/* Christmas tree worms (spiral dots on right pillar) */}
    <circle cx="80" cy="28" r="2" fill="#FFEB3B" opacity="0.5" />
    <circle cx="80" cy="28" r="1" fill="#FFF59D" opacity="0.4" />
    <circle cx="84" cy="36" r="2" fill="#2196F3" opacity="0.45" />
    <circle cx="84" cy="36" r="1" fill="#90CAF9" opacity="0.35" />

    {/* Bubbles — staggered from multiple crevices */}
    <circle cx="42" cy="-2" r="1.5" fill="rgba(255,255,255,0.3)" style={{ animation: 'bubbleRise 3.5s ease-in 0s infinite' }} />
    <circle cx="38" cy="2" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4s ease-in 1s infinite' }} />
    <circle cx="46" cy="-1" r="1.2" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 3s ease-in 2s infinite' }} />
    <circle cx="12" cy="48" r="0.8" fill="rgba(255,255,255,0.18)" style={{ animation: 'bubbleRise 4.5s ease-in 1.5s infinite' }} />
    <circle cx="86" cy="38" r="0.7" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5s ease-in 3s infinite' }} />
  </g>
))
CoralReefArch.displayName = 'CoralReefArch'

// ─── OCEAN: Sunken Ancient Temple ────────────────────────────────────

const SunkenTemple = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Base platform — weathered stone with sediment */}
    <rect x="-4" y="52" width="88" height="10" fill="#44403C" />
    <rect x="0" y="48" width="80" height="6" fill="#57534E" />
    <rect x="2" y="44" width="76" height="6" fill="#6B7280" />
    {/* Platform edge highlight */}
    <rect x="0" y="48" width="80" height="1" fill="#78909C" opacity="0.3" />
    <rect x="-4" y="52" width="88" height="1" fill="#57534E" opacity="0.25" />
    {/* Stone block lines on platform */}
    <rect x="0" y="50" width="80" height="1" fill="#4B5563" opacity="0.2" />
    <rect x="20" y="48" width="1" height="6" fill="#4B5563" opacity="0.15" />
    <rect x="40" y="48" width="1" height="6" fill="#4B5563" opacity="0.15" />
    <rect x="60" y="48" width="1" height="6" fill="#4B5563" opacity="0.15" />
    {/* Steps — worn and cracked */}
    <rect x="4" y="40" width="72" height="6" fill="#78716C" />
    <rect x="8" y="36" width="64" height="6" fill="#78716C" />
    <rect x="12" y="32" width="56" height="5" fill="#8D8680" />
    {/* Step edge highlights */}
    <rect x="4" y="40" width="72" height="1" fill="#9E9E9E" opacity="0.25" />
    <rect x="8" y="36" width="64" height="1" fill="#9E9E9E" opacity="0.2" />
    <rect x="12" y="32" width="56" height="1" fill="#A8A8A8" opacity="0.2" />
    {/* Cracked step */}
    <rect x="30" y="40" width="1" height="5" fill="#4B5563" opacity="0.3" />
    <rect x="31" y="42" width="1" height="3" fill="#4B5563" opacity="0.2" />

    {/* Left column — intact Doric style */}
    <rect x="10" y="4" width="8" height="30" fill="#9E9E9E" />
    {/* Column capital (top decoration) */}
    <rect x="7" y="0" width="14" height="5" fill="#BDBDBD" />
    <rect x="6" y="-2" width="16" height="3" fill="#CFD8DC" />
    {/* Column base */}
    <rect x="7" y="34" width="14" height="4" fill="#BDBDBD" />
    <rect x="6" y="38" width="16" height="2" fill="#CFD8DC" opacity="0.7" />
    {/* Column fluting (6 vertical channels) */}
    <rect x="11" y="5" width="1" height="29" fill="#BDBDBD" opacity="0.35" />
    <rect x="13" y="5" width="1" height="29" fill="#757575" opacity="0.2" />
    <rect x="15" y="5" width="1" height="29" fill="#BDBDBD" opacity="0.3" />
    <rect x="17" y="5" width="1" height="29" fill="#757575" opacity="0.15" />
    {/* Weathering cracks on left column */}
    <rect x="12" y="14" width="1" height="4" fill="#616161" opacity="0.3" />
    <rect x="13" y="16" width="1" height="2" fill="#616161" opacity="0.2" />

    {/* Center column — partially standing */}
    <rect x="36" y="16" width="7" height="22" fill="#9E9E9E" opacity="0.7" />
    <rect x="34" y="36" width="11" height="3" fill="#BDBDBD" opacity="0.6" />
    {/* Broken top */}
    <rect x="36" y="14" width="5" height="3" fill="#BDBDBD" opacity="0.5" />
    <rect x="38" y="12" width="3" height="3" fill="#CFD8DC" opacity="0.4" />
    {/* Center column fluting */}
    <rect x="38" y="17" width="1" height="19" fill="#BDBDBD" opacity="0.2" />
    <rect x="40" y="17" width="1" height="19" fill="#757575" opacity="0.15" />

    {/* Right column — broken at top, dramatic collapse */}
    <rect x="62" y="16" width="8" height="22" fill="#9E9E9E" />
    <rect x="60" y="34" width="12" height="4" fill="#BDBDBD" />
    <rect x="59" y="38" width="14" height="2" fill="#CFD8DC" opacity="0.7" />
    {/* Broken jagged top */}
    <rect x="62" y="14" width="6" height="3" fill="#9E9E9E" />
    <rect x="64" y="11" width="4" height="4" fill="#BDBDBD" />
    <rect x="66" y="9" width="2" height="3" fill="#CFD8DC" opacity="0.6" />
    {/* Column fluting */}
    <rect x="64" y="17" width="1" height="17" fill="#BDBDBD" opacity="0.3" />
    <rect x="67" y="17" width="1" height="17" fill="#757575" opacity="0.2" />

    {/* Lintel (architrave + frieze) — cracked and listing */}
    <rect x="6" y="-2" width="52" height="4" fill="#BDBDBD" />
    <rect x="4" y="-6" width="56" height="5" fill="#CFD8DC" />
    <rect x="6" y="-8" width="52" height="3" fill="#E0E0E0" />
    {/* Frieze decorative band */}
    <rect x="8" y="-6" width="48" height="1" fill="#90A4AE" opacity="0.3" />
    {/* Triglyphs on frieze */}
    <rect x="12" y="-8" width="3" height="3" fill="#B0BEC5" opacity="0.25" />
    <rect x="22" y="-8" width="3" height="3" fill="#B0BEC5" opacity="0.25" />
    <rect x="32" y="-8" width="3" height="3" fill="#B0BEC5" opacity="0.25" />
    <rect x="42" y="-8" width="3" height="3" fill="#B0BEC5" opacity="0.25" />
    {/* Major crack in lintel */}
    <rect x="30" y="-6" width="1" height="8" fill="#4B5563" opacity="0.5" />
    <rect x="31" y="-4" width="1" height="5" fill="#616161" opacity="0.4" />
    <rect x="29" y="-3" width="1" height="3" fill="#616161" opacity="0.3" />
    {/* Minor crack */}
    <rect x="48" y="-4" width="1" height="4" fill="#616161" opacity="0.3" />

    {/* Stone face carving (center back wall) — more detailed */}
    <rect x="26" y="18" width="28" height="18" fill="#6B7280" />
    <rect x="28" y="16" width="24" height="4" fill="#78909C" />
    {/* Face frame border */}
    <rect x="26" y="18" width="28" height="1" fill="#546E7A" opacity="0.3" />
    <rect x="26" y="35" width="28" height="1" fill="#546E7A" opacity="0.3" />
    <rect x="26" y="18" width="1" height="18" fill="#546E7A" opacity="0.25" />
    <rect x="53" y="18" width="1" height="18" fill="#546E7A" opacity="0.25" />
    {/* Eyes — deep-set with brow ridge */}
    <rect x="30" y="22" width="6" height="4" fill="#1A1A2E" opacity="0.75" />
    <rect x="44" y="22" width="6" height="4" fill="#1A1A2E" opacity="0.75" />
    {/* Brow ridge */}
    <rect x="29" y="20" width="8" height="2" fill="#546E7A" opacity="0.4" />
    <rect x="43" y="20" width="8" height="2" fill="#546E7A" opacity="0.4" />
    {/* Eye glints */}
    <rect x="31" y="23" width="2" height="1" fill="#37474F" opacity="0.5" />
    <rect x="45" y="23" width="2" height="1" fill="#37474F" opacity="0.5" />
    {/* Nose — eroded */}
    <rect x="38" y="26" width="4" height="4" fill="#78716C" />
    <rect x="39" y="25" width="2" height="2" fill="#8D8D8D" opacity="0.5" />
    {/* Missing nose chip */}
    <rect x="40" y="28" width="2" height="2" fill="#6B7280" opacity="0.4" />
    {/* Mouth — stern expression */}
    <rect x="34" y="32" width="12" height="2" fill="#4B5563" opacity="0.5" />
    <rect x="36" y="31" width="8" height="1" fill="#546E7A" opacity="0.3" />
    {/* Decorative glyphs flanking face */}
    <rect x="28" y="28" width="2" height="4" fill="#90A4AE" opacity="0.2" />
    <rect x="50" y="28" width="2" height="4" fill="#90A4AE" opacity="0.2" />
    <rect x="28" y="34" width="3" height="2" fill="#90A4AE" opacity="0.15" />
    <rect x="49" y="34" width="3" height="2" fill="#90A4AE" opacity="0.15" />

    {/* Algae and moss growth — extensive colonization */}
    <rect x="10" y="26" width="6" height="4" fill="#2E7D32" opacity="0.5" />
    <rect x="8" y="28" width="3" height="3" fill="#388E3C" opacity="0.4" />
    <rect x="0" y="54" width="10" height="3" fill="#388E3C" opacity="0.4" />
    <rect x="-4" y="56" width="6" height="2" fill="#4CAF50" opacity="0.3" />
    <rect x="64" y="28" width="6" height="3" fill="#1B5E20" opacity="0.5" />
    <rect x="68" y="26" width="4" height="3" fill="#2E7D32" opacity="0.4" />
    <rect x="38" y="44" width="12" height="2" fill="#2E7D32" opacity="0.3" />
    <rect x="52" y="42" width="6" height="2" fill="#388E3C" opacity="0.25" />
    {/* Moss draping down columns */}
    <rect x="10" y="30" width="3" height="6" fill="#2E7D32" opacity="0.3" />
    <rect x="66" y="30" width="3" height="5" fill="#1B5E20" opacity="0.3" />
    {/* Coralline algae */}
    <rect x="16" y="38" width="6" height="2" fill="#CE93D8" opacity="0.2" />
    <rect x="56" y="40" width="4" height="2" fill="#E1BEE7" opacity="0.18" />

    {/* Barnacles on stone — varied clusters */}
    <rect x="18" y="22" width="2" height="2" fill="#9CA3AF" opacity="0.4" />
    <rect x="20" y="24" width="2" height="2" fill="#B0BEC5" opacity="0.35" />
    <rect x="60" y="24" width="3" height="2" fill="#9CA3AF" opacity="0.35" />
    <rect x="4" y="48" width="3" height="3" fill="#78909C" opacity="0.3" />
    <rect x="74" y="48" width="3" height="3" fill="#78909C" opacity="0.3" />

    {/* Fallen rubble — scattered blocks */}
    <rect x="72" y="44" width="10" height="6" fill="#9E9E9E" opacity="0.6" />
    <rect x="74" y="40" width="6" height="6" fill="#BDBDBD" opacity="0.5" />
    <rect x="80" y="48" width="4" height="4" fill="#78716C" opacity="0.4" />
    <rect x="-6" y="52" width="8" height="4" fill="#9E9E9E" opacity="0.5" />
    <rect x="-8" y="56" width="4" height="3" fill="#BDBDBD" opacity="0.4" />
    {/* Column drum fragment on ground */}
    <rect x="76" y="50" width="6" height="3" fill="#CFD8DC" opacity="0.35" />
    <rect x="77" y="48" width="4" height="3" fill="#BDBDBD" opacity="0.3" />
    {/* Scattered stone chips */}
    <rect x="-2" y="58" width="3" height="2" fill="#78716C" opacity="0.3" />
    <rect x="82" y="54" width="3" height="2" fill="#6B7280" opacity="0.25" />

    {/* Small coral colony on base */}
    <rect x="70" y="52" width="4" height="3" fill="#E91E63" opacity="0.25" />
    <rect x="71" y="50" width="2" height="2" fill="#F48FB1" opacity="0.2" />

    {/* Starfish on step */}
    <rect x="20" y="38" width="3" height="3" fill="#FF5722" opacity="0.35" />
    <rect x="19" y="39" width="1" height="1" fill="#FF7043" opacity="0.3" />
    <rect x="23" y="39" width="1" height="1" fill="#FF7043" opacity="0.3" />
    <rect x="21" y="37" width="1" height="1" fill="#FF7043" opacity="0.3" />
    <rect x="21" y="41" width="1" height="1" fill="#FF7043" opacity="0.3" />

    {/* Bubbles from temple crevices */}
    <circle cx="40" cy="14" r="1.2" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 4s ease-in 0.5s infinite' }} />
    <circle cx="36" cy="16" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4.5s ease-in 2s infinite' }} />
    <circle cx="44" cy="12" r="0.8" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5s ease-in 3.5s infinite' }} />
  </g>
))
SunkenTemple.displayName = 'SunkenTemple'

// ─── TROPICAL: Volcano Formation ─────────────────────────────────────

const VolcanoFormation = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Base — wide basalt lava rock formation */}
    <rect x="-4" y="44" width="78" height="18" fill="#263238" />
    <rect x="0" y="40" width="70" height="6" fill="#37474F" />
    <rect x="4" y="32" width="62" height="10" fill="#455A64" />
    <rect x="10" y="24" width="50" height="10" fill="#546E7A" />
    <rect x="16" y="16" width="38" height="10" fill="#607D8B" />
    <rect x="22" y="8" width="26" height="10" fill="#78909C" />
    <rect x="26" y="2" width="18" height="8" fill="#90A4AE" />
    {/* Irregular rocky edges */}
    <rect x="-6" y="48" width="4" height="8" fill="#37474F" opacity="0.7" />
    <rect x="72" y="46" width="6" height="10" fill="#37474F" opacity="0.6" />
    <rect x="-2" y="40" width="4" height="6" fill="#455A64" opacity="0.5" />
    <rect x="68" y="36" width="4" height="6" fill="#455A64" opacity="0.5" />

    {/* Crater opening — deep vent with glow */}
    <rect x="28" y="-2" width="14" height="6" fill="#0A0A0A" />
    <rect x="30" y="-4" width="10" height="4" fill="#BF360C" opacity="0.7" />
    <rect x="32" y="-6" width="6" height="3" fill="#DD2C00" opacity="0.5" />
    {/* Crater rim detail */}
    <rect x="26" y="0" width="4" height="2" fill="#78909C" opacity="0.6" />
    <rect x="40" y="0" width="4" height="2" fill="#78909C" opacity="0.6" />
    <rect x="28" y="-2" width="2" height="2" fill="#607D8B" opacity="0.5" />
    <rect x="40" y="-2" width="2" height="2" fill="#607D8B" opacity="0.5" />
    {/* Heat shimmer glow above crater */}
    <rect x="30" y="-8" width="10" height="2" fill="#FF6D00" opacity="0.15" />
    <rect x="32" y="-10" width="6" height="2" fill="#FF6D00" opacity="0.1" />

    {/* Lava glow in deep fissure cracks — zigzag patterns */}
    <rect x="30" y="2" width="2" height="6" fill="#FF6D00" opacity="0.45" />
    <rect x="31" y="8" width="2" height="4" fill="#FF8F00" opacity="0.35" />
    <rect x="32" y="12" width="2" height="4" fill="#DD2C00" opacity="0.25" />
    <rect x="38" y="4" width="2" height="5" fill="#FF6D00" opacity="0.35" />
    <rect x="37" y="9" width="2" height="4" fill="#FF8F00" opacity="0.25" />
    <rect x="24" y="16" width="2" height="6" fill="#DD2C00" opacity="0.3" />
    <rect x="25" y="22" width="2" height="6" fill="#BF360C" opacity="0.2" />
    <rect x="44" y="18" width="2" height="5" fill="#DD2C00" opacity="0.25" />
    <rect x="45" y="23" width="2" height="6" fill="#BF360C" opacity="0.18" />
    {/* Secondary hairline cracks */}
    <rect x="18" y="28" width="1" height="8" fill="#DD2C00" opacity="0.15" />
    <rect x="52" y="30" width="1" height="6" fill="#DD2C00" opacity="0.12" />
    <rect x="36" y="26" width="1" height="10" fill="#BF360C" opacity="0.1" />

    {/* Rock texture — porous vesicular basalt (many small holes) */}
    <rect x="6" y="36" width="3" height="3" fill="#1A1A1A" opacity="0.5" />
    <rect x="12" y="34" width="2" height="2" fill="#1A1A1A" opacity="0.4" />
    <rect x="20" y="28" width="4" height="3" fill="#1A1A1A" opacity="0.45" />
    <rect x="28" y="26" width="2" height="2" fill="#1A1A1A" opacity="0.35" />
    <rect x="42" y="28" width="3" height="3" fill="#1A1A1A" opacity="0.4" />
    <rect x="50" y="30" width="2" height="2" fill="#1A1A1A" opacity="0.35" />
    <rect x="54" y="36" width="4" height="3" fill="#1A1A1A" opacity="0.45" />
    <rect x="60" y="40" width="3" height="3" fill="#1A1A1A" opacity="0.4" />
    <rect x="8" y="44" width="3" height="3" fill="#1A1A1A" opacity="0.35" />
    <rect x="14" y="48" width="4" height="3" fill="#1A1A1A" opacity="0.3" />
    <rect x="50" y="48" width="3" height="3" fill="#1A1A1A" opacity="0.3" />
    <rect x="38" y="42" width="2" height="2" fill="#1A1A1A" opacity="0.25" />
    {/* Rock surface highlights */}
    <rect x="16" y="18" width="3" height="1" fill="#90A4AE" opacity="0.2" />
    <rect x="46" y="20" width="4" height="1" fill="#90A4AE" opacity="0.18" />
    <rect x="8" y="34" width="4" height="1" fill="#78909C" opacity="0.15" />
    <rect x="56" y="38" width="5" height="1" fill="#78909C" opacity="0.15" />
    {/* Columnar basalt effect on lower walls */}
    <rect x="2" y="44" width="1" height="12" fill="#455A64" opacity="0.2" />
    <rect x="6" y="42" width="1" height="14" fill="#455A64" opacity="0.18" />
    <rect x="62" y="42" width="1" height="14" fill="#455A64" opacity="0.18" />
    <rect x="66" y="44" width="1" height="12" fill="#455A64" opacity="0.15" />

    {/* Thermophilic algae near vents — heat-loving orange/yellow colonies */}
    <rect x="30" y="10" width="4" height="2" fill="#FF8F00" opacity="0.35" />
    <rect x="36" y="12" width="3" height="2" fill="#FFA000" opacity="0.3" />
    <rect x="28" y="14" width="3" height="2" fill="#FFB300" opacity="0.25" />
    {/* Regular green algae on cooler surfaces */}
    <rect x="16" y="22" width="4" height="2" fill="#558B2F" opacity="0.4" />
    <rect x="48" y="24" width="6" height="2" fill="#558B2F" opacity="0.35" />
    <rect x="4" y="38" width="5" height="2" fill="#2E7D32" opacity="0.35" />
    <rect x="58" y="42" width="6" height="2" fill="#388E3C" opacity="0.3" />
    {/* Tube worms around vent */}
    <rect x="26" y="6" width="2" height="5" fill="#D50000" opacity="0.3" />
    <rect x="42" y="6" width="2" height="4" fill="#D50000" opacity="0.25" />
    <rect x="26" y="4" width="3" height="2" fill="#FF8A80" opacity="0.25" />
    <rect x="41" y="4" width="3" height="2" fill="#FF8A80" opacity="0.2" />

    {/* Mineral deposit staining — sulfur yellow */}
    <rect x="28" y="0" width="4" height="2" fill="#FDD835" opacity="0.2" />
    <rect x="38" y="0" width="4" height="2" fill="#FDD835" opacity="0.18" />

    {/* Barnacles on cooler areas */}
    <rect x="4" y="50" width="3" height="3" fill="#9CA3AF" opacity="0.35" />
    <rect x="62" y="52" width="3" height="3" fill="#9CA3AF" opacity="0.3" />

    {/* Bubble stream from crater — hydrothermal vent effect */}
    <circle cx="35" cy="-6" r="1.8" fill="rgba(255,255,255,0.35)" style={{ animation: 'bubbleRise 2.5s ease-in 0s infinite' }} />
    <circle cx="33" cy="-4" r="1.2" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 3s ease-in 0.6s infinite' }} />
    <circle cx="37" cy="-5" r="1.4" fill="rgba(255,255,255,0.3)" style={{ animation: 'bubbleRise 3.5s ease-in 1.2s infinite' }} />
    <circle cx="34" cy="-3" r="0.8" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4s ease-in 2s infinite' }} />
    <circle cx="36" cy="-2" r="0.6" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 4.5s ease-in 3s infinite' }} />
  </g>
))
VolcanoFormation.displayName = 'VolcanoFormation'

// ─── TROPICAL: Dragon Stone Archway ──────────────────────────────────

const DragonStoneArch = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Left pillar — Ohko dragon stone with dramatic pitted/cratered texture */}
    <rect x="0" y="16" width="20" height="44" fill="#795548" />
    <rect x="2" y="10" width="18" height="8" fill="#8D6E63" />
    <rect x="4" y="6" width="14" height="6" fill="#A1887F" />
    <rect x="6" y="2" width="10" height="6" fill="#BCAAA4" />
    {/* Left pillar: shadow depth on sides */}
    <rect x="0" y="16" width="2" height="44" fill="#5D4037" opacity="0.3" />
    <rect x="18" y="16" width="2" height="44" fill="#5D4037" opacity="0.2" />
    {/* Pitting texture — deep eroded cavities (dragon stone signature) */}
    <rect x="4" y="18" width="4" height="4" fill="#4E342E" opacity="0.55" />
    <rect x="5" y="19" width="2" height="2" fill="#3E2723" opacity="0.3" />
    <rect x="12" y="22" width="3" height="3" fill="#4E342E" opacity="0.45" />
    <rect x="2" y="28" width="4" height="5" fill="#5D4037" opacity="0.5" />
    <rect x="3" y="29" width="2" height="3" fill="#3E2723" opacity="0.3" />
    <rect x="10" y="32" width="5" height="3" fill="#4E342E" opacity="0.45" />
    <rect x="4" y="38" width="3" height="4" fill="#5D4037" opacity="0.5" />
    <rect x="14" y="40" width="4" height="3" fill="#4E342E" opacity="0.4" />
    <rect x="6" y="46" width="5" height="4" fill="#5D4037" opacity="0.4" />
    <rect x="7" y="47" width="3" height="2" fill="#3E2723" opacity="0.25" />
    <rect x="12" y="50" width="3" height="3" fill="#4E342E" opacity="0.35" />
    <rect x="8" y="14" width="3" height="3" fill="#4E342E" opacity="0.35" />
    {/* Ridge/vein textures (iron oxide staining) */}
    <rect x="0" y="24" width="18" height="1" fill="#BF360C" opacity="0.2" />
    <rect x="2" y="36" width="16" height="1" fill="#E65100" opacity="0.15" />
    <rect x="0" y="48" width="18" height="1" fill="#BF360C" opacity="0.12" />
    {/* Surface highlights */}
    <rect x="6" y="10" width="4" height="1" fill="#D7CCC8" opacity="0.3" />
    <rect x="8" y="24" width="3" height="1" fill="#BCAAA4" opacity="0.25" />

    {/* Right pillar — taller, more weathered */}
    <rect x="58" y="12" width="20" height="48" fill="#795548" />
    <rect x="60" y="6" width="16" height="8" fill="#8D6E63" />
    <rect x="62" y="2" width="14" height="6" fill="#A1887F" />
    <rect x="64" y="-2" width="10" height="6" fill="#BCAAA4" />
    {/* Right shadow depth */}
    <rect x="58" y="12" width="2" height="48" fill="#5D4037" opacity="0.3" />
    <rect x="76" y="12" width="2" height="48" fill="#5D4037" opacity="0.2" />
    {/* Right pitting — varied sizes and depths */}
    <rect x="62" y="16" width="5" height="4" fill="#4E342E" opacity="0.55" />
    <rect x="63" y="17" width="3" height="2" fill="#3E2723" opacity="0.3" />
    <rect x="70" y="22" width="4" height="5" fill="#5D4037" opacity="0.5" />
    <rect x="71" y="23" width="2" height="3" fill="#3E2723" opacity="0.3" />
    <rect x="60" y="30" width="3" height="4" fill="#4E342E" opacity="0.5" />
    <rect x="68" y="36" width="5" height="3" fill="#5D4037" opacity="0.45" />
    <rect x="62" y="42" width="4" height="4" fill="#4E342E" opacity="0.4" />
    <rect x="72" y="46" width="3" height="3" fill="#5D4037" opacity="0.4" />
    <rect x="64" y="52" width="5" height="3" fill="#4E342E" opacity="0.35" />
    <rect x="74" y="38" width="3" height="3" fill="#4E342E" opacity="0.3" />
    {/* Right iron oxide veins */}
    <rect x="60" y="20" width="16" height="1" fill="#BF360C" opacity="0.18" />
    <rect x="58" y="34" width="18" height="1" fill="#E65100" opacity="0.15" />
    <rect x="60" y="48" width="16" height="1" fill="#BF360C" opacity="0.12" />

    {/* Arch bridge — massive weathered stone span */}
    <rect x="8" y="0" width="62" height="8" fill="#8D6E63" />
    <rect x="12" y="-4" width="54" height="6" fill="#A1887F" />
    <rect x="18" y="-6" width="42" height="4" fill="#BCAAA4" />
    <rect x="24" y="-8" width="30" height="3" fill="#D7CCC8" opacity="0.6" />
    {/* Arch underside shadow */}
    <rect x="12" y="6" width="54" height="2" fill="#5D4037" opacity="0.25" />
    {/* Arch pitting */}
    <rect x="22" y="-2" width="4" height="3" fill="#5D4037" opacity="0.35" />
    <rect x="32" y="-4" width="3" height="2" fill="#4E342E" opacity="0.3" />
    <rect x="42" y="-2" width="5" height="3" fill="#5D4037" opacity="0.3" />
    <rect x="52" y="0" width="4" height="3" fill="#4E342E" opacity="0.3" />
    <rect x="36" y="2" width="3" height="2" fill="#5D4037" opacity="0.25" />
    <rect x="48" y="2" width="3" height="3" fill="#4E342E" opacity="0.25" />
    {/* Arch iron oxide veins */}
    <rect x="16" y="0" width="46" height="1" fill="#BF360C" opacity="0.15" />

    {/* Lush plants growing from crevices — varied species */}
    {/* Fern from left pillar crack */}
    <rect x="16" y="0" width="3" height="8" fill="#00C853" opacity="0.6" />
    <rect x="14" y="-4" width="4" height="4" fill="#69F0AE" opacity="0.5" />
    <rect x="13" y="-6" width="3" height="3" fill="#B9F6CA" opacity="0.4" />
    <rect x="18" y="-2" width="2" height="3" fill="#00E676" opacity="0.45" />
    {/* Right crevice growth */}
    <rect x="56" y="-2" width="3" height="6" fill="#00E676" opacity="0.55" />
    <rect x="54" y="-4" width="3" height="3" fill="#69F0AE" opacity="0.45" />
    <rect x="58" y="-4" width="2" height="2" fill="#B9F6CA" opacity="0.35" />
    {/* Creeping vine on arch top */}
    <rect x="28" y="-8" width="3" height="2" fill="#00C853" opacity="0.4" />
    <rect x="36" y="-7" width="4" height="2" fill="#00E676" opacity="0.35" />
    <rect x="44" y="-8" width="3" height="2" fill="#69F0AE" opacity="0.3" />

    {/* Java moss patches (soft green cushions) */}
    <rect x="0" y="54" width="8" height="3" fill="#2E7D32" opacity="0.45" />
    <rect x="2" y="52" width="4" height="2" fill="#4CAF50" opacity="0.35" />
    <rect x="70" y="54" width="8" height="3" fill="#2E7D32" opacity="0.4" />
    <rect x="72" y="52" width="4" height="2" fill="#388E3C" opacity="0.35" />
    <rect x="10" y="58" width="6" height="2" fill="#388E3C" opacity="0.3" />
    <rect x="60" y="58" width="8" height="2" fill="#2E7D32" opacity="0.3" />

    {/* Anubias plant attached to left pillar */}
    <rect x="-4" y="32" width="4" height="6" fill="#1B5E20" opacity="0.5" />
    <rect x="-6" y="28" width="4" height="6" fill="#2E7D32" opacity="0.4" />
    <rect x="-8" y="30" width="3" height="4" fill="#388E3C" opacity="0.35" />
    {/* Leaf shapes */}
    <rect x="-8" y="26" width="6" height="3" fill="#4CAF50" opacity="0.4" />
    <rect x="-6" y="24" width="4" height="2" fill="#81C784" opacity="0.3" />

    {/* Barnacle clusters */}
    <rect x="14" y="56" width="3" height="3" fill="#9CA3AF" opacity="0.35" />
    <rect x="62" y="56" width="3" height="3" fill="#9CA3AF" opacity="0.3" />
    <rect x="30" y="6" width="2" height="2" fill="#78909C" opacity="0.25" />

    {/* Small shrimp on stone (pixel detail) */}
    <rect x="38" y="4" width="3" height="1" fill="#FF8A65" opacity="0.35" />
    <rect x="37" y="3" width="1" height="1" fill="#FFAB91" opacity="0.3" />

    {/* Bubbles */}
    <circle cx="40" cy="-6" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4s ease-in 0.5s infinite' }} />
    <circle cx="15" cy="-4" r="0.8" fill="rgba(255,255,255,0.18)" style={{ animation: 'bubbleRise 5s ease-in 2s infinite' }} />
  </g>
))
DragonStoneArch.displayName = 'DragonStoneArch'

// ─── SHIPWRECK: Sunken Submarine (enhanced) ─────────────────────────

const SunkenSubmarine = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Shadow on seabed */}
    <ellipse cx="100" cy="104" rx="120" ry="10" fill="#000" opacity="0.12" />

    {/* Main hull — cylindrical pressure hull, slightly listed */}
    <rect x="20" y="32" width="160" height="56" fill="#37474F" />
    <rect x="12" y="40" width="16" height="40" fill="#455A64" />
    <rect x="172" y="40" width="24" height="40" fill="#455A64" />
    {/* Hull curvature — top arc */}
    <rect x="28" y="24" width="152" height="12" fill="#546E7A" />
    <rect x="40" y="16" width="128" height="12" fill="#607D8B" />
    <rect x="56" y="12" width="96" height="6" fill="#78909C" opacity="0.6" />
    {/* Hull bottom keel */}
    <rect x="28" y="84" width="152" height="8" fill="#263238" />
    <rect x="36" y="92" width="136" height="4" fill="#1A1A1A" opacity="0.3" />
    {/* Hull highlight strip (light reflection) */}
    <rect x="36" y="28" width="136" height="2" fill="#90A4AE" opacity="0.2" />

    {/* Hull panel lines — welded plate seams */}
    <rect x="28" y="40" width="144" height="2" fill="#2C3E50" opacity="0.3" />
    <rect x="28" y="56" width="96" height="2" fill="#2C3E50" opacity="0.25" />
    <rect x="28" y="72" width="144" height="2" fill="#2C3E50" opacity="0.2" />
    {/* Vertical seam lines */}
    <rect x="60" y="24" width="2" height="68" fill="#2C3E50" opacity="0.15" />
    <rect x="100" y="24" width="2" height="68" fill="#2C3E50" opacity="0.15" />
    <rect x="140" y="24" width="2" height="68" fill="#2C3E50" opacity="0.12" />

    {/* Rivets along hull — top and bottom rows */}
    {[32, 44, 56, 68, 80, 92, 104, 116, 144, 156, 168].map((rx, i) => (
      <circle key={`rivet-t-${i}`} cx={rx} cy={26} r="1.6" fill="#78909C" opacity="0.4" />
    ))}
    {[32, 44, 56, 68, 80, 92, 104, 116, 144, 156, 168].map((rx, i) => (
      <circle key={`rivet-b-${i}`} cx={rx} cy={86} r="1.6" fill="#546E7A" opacity="0.35" />
    ))}
    {/* Mid rivets at panel seam */}
    {[32, 48, 64, 80, 96, 112].map((rx, i) => (
      <circle key={`rivet-m-${i}`} cx={rx} cy={40} r="1.2" fill="#607D8B" opacity="0.3" />
    ))}

    {/* Torpedo tubes at bow — 4 tubes */}
    <rect x="180" y="44" width="20" height="6" fill="#455A64" />
    <rect x="180" y="54" width="20" height="6" fill="#455A64" />
    <rect x="180" y="64" width="20" height="6" fill="#455A64" />
    <circle cx="200" cy="47" r="3" fill="#1A1A1A" />
    <circle cx="200" cy="57" r="3" fill="#1A1A1A" />
    <circle cx="200" cy="67" r="3" fill="#1A1A1A" />
    {/* Torpedo tube rim highlights */}
    <circle cx="200" cy="47" r="3" fill="none" stroke="#546E7A" strokeWidth="1" opacity="0.4" />
    <circle cx="200" cy="57" r="3" fill="none" stroke="#546E7A" strokeWidth="1" opacity="0.35" />

    {/* Bow sonar dome */}
    <rect x="192" y="52" width="12" height="12" fill="#546E7A" opacity="0.5" />
    <rect x="196" y="48" width="8" height="20" fill="#455A64" opacity="0.4" />

    {/* Hydroplanes (diving fins) — with detail */}
    <rect x="8" y="36" width="16" height="4" fill="#607D8B" />
    <rect x="4" y="32" width="8" height="4" fill="#78909C" opacity="0.7" />
    <rect x="0" y="34" width="4" height="2" fill="#90A4AE" opacity="0.5" />
    <rect x="8" y="68" width="16" height="4" fill="#607D8B" />
    <rect x="4" y="72" width="8" height="4" fill="#78909C" opacity="0.7" />
    <rect x="0" y="70" width="4" height="2" fill="#90A4AE" opacity="0.5" />
    {/* Rudder fin at stern */}
    <rect x="8" y="48" width="4" height="16" fill="#546E7A" opacity="0.5" />

    {/* Conning tower (sail) — more detailed */}
    <rect x="72" y="0" width="48" height="28" fill="#455A64" />
    <rect x="76" y="-8" width="40" height="12" fill="#546E7A" />
    <rect x="80" y="-12" width="32" height="6" fill="#607D8B" />
    {/* Sail panel lines */}
    <rect x="76" y="8" width="40" height="2" fill="#37474F" opacity="0.3" />
    <rect x="76" y="16" width="40" height="2" fill="#37474F" opacity="0.25" />
    {/* Sail rivets */}
    {[80, 88, 96, 104, 112].map((rx, i) => (
      <circle key={`sr-${i}`} cx={rx} cy={-10} r="1" fill="#78909C" opacity="0.35" />
    ))}
    {/* Bridge windscreen / viewport */}
    <rect x="84" y="-6" width="24" height="4" fill="#0D2137" opacity="0.6" />
    <rect x="86" y="-6" width="20" height="2" fill="#1A5276" opacity="0.3" />

    {/* Periscope — bent and encrusted */}
    <rect x="92" y="-32" width="6" height="24" fill="#78909C" />
    <rect x="88" y="-36" width="12" height="6" fill="#90A4AE" />
    <rect x="96" y="-28" width="6" height="8" fill="#78909C" transform="rotate(12, 98, -24)" />
    {/* Periscope optics */}
    <rect x="88" y="-38" width="4" height="4" fill="#0D2137" opacity="0.6" />
    {/* Periscope barnacle */}
    <rect x="94" y="-20" width="4" height="4" fill="#9CA3AF" opacity="0.3" />
    {/* Radar mast */}
    <rect x="108" y="-20" width="4" height="20" fill="#78909C" />
    <rect x="104" y="-24" width="12" height="4" fill="#90A4AE" />
    {/* Radar dish */}
    <rect x="102" y="-28" width="16" height="4" fill="#B0BEC5" opacity="0.4" />
    {/* Snorkel mast */}
    <rect x="80" y="-16" width="4" height="16" fill="#607D8B" opacity="0.6" />
    <rect x="78" y="-20" width="8" height="4" fill="#78909C" opacity="0.5" />

    {/* Trailing kelp from conning tower — multiple strands */}
    <rect x="76" y="-8" width="6" height="20" fill="#2E7D32" opacity="0.35" style={{ animation: 'kelpSway 5s ease-in-out 0s infinite', transformOrigin: '78px -8px' }} />
    <rect x="112" y="-4" width="4" height="16" fill="#388E3C" opacity="0.3" style={{ animation: 'kelpSway 4s ease-in-out 1s infinite', transformOrigin: '114px -4px' }} />
    <rect x="84" y="-12" width="4" height="12" fill="#1B5E20" opacity="0.25" style={{ animation: 'kelpSway 4.5s ease-in-out 0.5s infinite', transformOrigin: '86px -12px' }} />

    {/* Hull breach (fish swim-through hole) — more dramatic */}
    <rect x="124" y="40" width="32" height="32" fill="#0A1628" opacity="0.85" />
    {/* Inner hull structure visible (ribs/frames) */}
    <rect x="126" y="40" width="2" height="32" fill="#455A64" opacity="0.4" />
    <rect x="134" y="40" width="2" height="32" fill="#455A64" opacity="0.35" />
    <rect x="142" y="40" width="2" height="32" fill="#455A64" opacity="0.3" />
    <rect x="150" y="40" width="2" height="32" fill="#455A64" opacity="0.3" />
    {/* Torn metal edges — jagged shards */}
    <rect x="120" y="40" width="6" height="10" fill="#546E7A" />
    <rect x="118" y="48" width="4" height="6" fill="#607D8B" opacity="0.7" />
    <rect x="154" y="48" width="6" height="10" fill="#546E7A" />
    <rect x="156" y="40" width="4" height="6" fill="#607D8B" opacity="0.6" />
    <rect x="128" y="36" width="10" height="6" fill="#455A64" />
    <rect x="144" y="34" width="8" height="6" fill="#546E7A" opacity="0.7" />
    <rect x="128" y="72" width="8" height="4" fill="#455A64" />
    <rect x="144" y="70" width="10" height="6" fill="#546E7A" opacity="0.6" />
    {/* Bent metal shards pointing inward */}
    <rect x="122" y="68" width="4" height="8" fill="#607D8B" opacity="0.5" />
    <rect x="152" y="44" width="4" height="8" fill="#607D8B" opacity="0.45" />
    <rect x="132" y="72" width="6" height="4" fill="#546E7A" opacity="0.4" />

    {/* Portholes — 3 with glass glint detail */}
    <circle cx="44" cy="56" r="9" fill="#0D2137" stroke="#607D8B" strokeWidth="4" />
    <circle cx="44" cy="56" r="5" fill="#1A5276" opacity="0.5" />
    <rect x="40" y="52" width="4" height="2" fill="#4FC3F7" opacity="0.3" />
    <circle cx="76" cy="56" r="9" fill="#0D2137" stroke="#607D8B" strokeWidth="4" />
    <circle cx="76" cy="56" r="5" fill="#1A5276" opacity="0.4" />
    <rect x="72" y="52" width="4" height="2" fill="#4FC3F7" opacity="0.25" />
    <circle cx="168" cy="56" r="9" fill="#0D2137" stroke="#607D8B" strokeWidth="4" />
    <circle cx="168" cy="56" r="5" fill="#1A5276" opacity="0.3" />

    {/* Hull number stencil remnant */}
    <rect x="176" y="28" width="4" height="8" fill="#B0BEC5" opacity="0.15" />
    <rect x="184" y="28" width="4" height="8" fill="#B0BEC5" opacity="0.12" />

    {/* Propeller at stern — multi-blade */}
    <rect x="0" y="44" width="16" height="6" fill="#78909C" />
    <circle cx="4" cy="50" r="16" fill="none" stroke="#607D8B" strokeWidth="1" opacity="0.3" />
    <rect x="-8" y="34" width="12" height="32" fill="#607D8B" opacity="0.6" />
    <rect x="-4" y="28" width="4" height="10" fill="#90A4AE" opacity="0.5" />
    <rect x="-4" y="62" width="4" height="10" fill="#90A4AE" opacity="0.5" />
    <rect x="-12" y="38" width="8" height="6" fill="#90A4AE" opacity="0.4" />
    <rect x="-12" y="56" width="8" height="6" fill="#90A4AE" opacity="0.4" />
    {/* Prop shaft */}
    <rect x="8" y="48" width="12" height="4" fill="#546E7A" opacity="0.4" />
    {/* Prop guard */}
    <rect x="-4" y="28" width="2" height="44" fill="#455A64" opacity="0.3" />

    {/* Rust and corrosion — extensive weathering */}
    <rect x="56" y="64" width="16" height="10" fill="#BF360C" opacity="0.3" />
    <rect x="60" y="68" width="8" height="4" fill="#E65100" opacity="0.2" />
    <rect x="96" y="24" width="16" height="8" fill="#E65100" opacity="0.25" />
    <rect x="100" y="28" width="8" height="4" fill="#FF6D00" opacity="0.15" />
    <rect x="32" y="76" width="24" height="8" fill="#BF360C" opacity="0.22" />
    <rect x="160" y="60" width="16" height="8" fill="#E65100" opacity="0.2" />
    <rect x="80" y="80" width="28" height="6" fill="#BF360C" opacity="0.18" />
    <rect x="136" y="24" width="20" height="6" fill="#E65100" opacity="0.15" />
    <rect x="40" y="36" width="16" height="8" fill="#8B4513" opacity="0.15" />
    {/* Rust streaks running down hull */}
    <rect x="60" y="72" width="4" height="16" fill="#BF360C" opacity="0.12" />
    <rect x="100" y="32" width="4" height="20" fill="#E65100" opacity="0.1" />
    <rect x="164" y="68" width="4" height="16" fill="#BF360C" opacity="0.1" />

    {/* Barnacles — extensive coverage on lower hull */}
    <rect x="36" y="84" width="8" height="6" fill="#9CA3AF" opacity="0.4" />
    <rect x="40" y="88" width="4" height="4" fill="#B0BEC5" opacity="0.3" />
    <rect x="68" y="88" width="6" height="6" fill="#9CA3AF" opacity="0.35" />
    <rect x="112" y="88" width="10" height="4" fill="#9CA3AF" opacity="0.35" />
    <rect x="168" y="76" width="8" height="6" fill="#9CA3AF" opacity="0.4" />
    <rect x="20" y="80" width="10" height="6" fill="#B0BEC5" opacity="0.3" />
    <rect x="88" y="88" width="8" height="4" fill="#9CA3AF" opacity="0.3" />
    <rect x="152" y="88" width="12" height="4" fill="#B0BEC5" opacity="0.3" />
    <rect x="180" y="68" width="8" height="6" fill="#9CA3AF" opacity="0.3" />

    {/* Anemone colony on hull */}
    <rect x="52" y="84" width="16" height="8" fill="#6A1B9A" opacity="0.5" />
    <rect x="48" y="76" width="8" height="8" fill="#CE93D8" opacity="0.4" />
    <rect x="66" y="80" width="6" height="8" fill="#BA68C8" opacity="0.4" />
    {/* Anemone tentacle tips */}
    <rect x="48" y="72" width="4" height="4" fill="#E1BEE7" opacity="0.35" />
    <rect x="56" y="74" width="4" height="4" fill="#F3E5F5" opacity="0.3" />
    <rect x="64" y="76" width="4" height="4" fill="#E1BEE7" opacity="0.3" />

    {/* Marine growth — algae, sponge, soft coral */}
    <rect x="72" y="12" width="12" height="6" fill="#2E7D32" opacity="0.4" />
    <rect x="28" y="32" width="8" height="6" fill="#388E3C" opacity="0.3" />
    <rect x="144" y="84" width="20" height="4" fill="#1B5E20" opacity="0.4" />
    <rect x="184" y="48" width="8" height="8" fill="#2E7D32" opacity="0.25" />
    <rect x="12" y="56" width="8" height="4" fill="#388E3C" opacity="0.2" />
    {/* Orange sponge */}
    <rect x="92" y="88" width="8" height="6" fill="#FF6F00" opacity="0.2" />
    <rect x="172" y="84" width="6" height="6" fill="#FFB300" opacity="0.15" />

    {/* Coral encrustation at base */}
    <rect x="28" y="88" width="16" height="8" fill="#E91E63" opacity="0.25" />
    <rect x="32" y="84" width="8" height="6" fill="#F48FB1" opacity="0.2" />
    <rect x="120" y="88" width="12" height="6" fill="#C2185B" opacity="0.2" />

    {/* Debris on seabed near sub */}
    <rect x="192" y="96" width="12" height="6" fill="#455A64" opacity="0.3" />
    <rect x="-16" y="96" width="8" height="6" fill="#546E7A" opacity="0.25" />

    {/* Bubbles from hull breach — active stream */}
    <circle cx="136" cy="36" r="3" fill="rgba(255,255,255,0.3)" style={{ animation: 'bubbleRise 3s ease-in 0s infinite' }} />
    <circle cx="144" cy="32" r="2" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 3.5s ease-in 0.8s infinite' }} />
    <circle cx="140" cy="40" r="2.4" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 4s ease-in 1.5s infinite' }} />
    <circle cx="132" cy="34" r="1.6" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4.5s ease-in 2.5s infinite' }} />
    <circle cx="148" cy="28" r="1.2" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5s ease-in 3.5s infinite' }} />
    <circle cx="96" cy="-12" r="1.4" fill="rgba(255,255,255,0.12)" style={{ animation: 'bubbleRise 5.5s ease-in 4s infinite' }} />
  </g>
))
SunkenSubmarine.displayName = 'SunkenSubmarine'

// ─── SHIPWRECK: Treasure Chest Cluster ───────────────────────────────

const TreasureCluster = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Large treasure chest — open, ornate pirate chest */}
    <rect x="0" y="28" width="34" height="18" fill="#5D3A2A" />
    <rect x="2" y="24" width="30" height="6" fill="#6B4C3A" />
    {/* Chest body texture — wood plank lines */}
    <rect x="2" y="30" width="30" height="1" fill="#4E2E1C" opacity="0.25" />
    <rect x="2" y="34" width="30" height="1" fill="#4E2E1C" opacity="0.2" />
    <rect x="2" y="38" width="30" height="1" fill="#4E2E1C" opacity="0.2" />
    <rect x="2" y="42" width="30" height="1" fill="#4E2E1C" opacity="0.15" />
    {/* Lid — open wide at angle */}
    <rect x="-4" y="16" width="34" height="10" fill="#7A5B48" />
    <rect x="-2" y="14" width="30" height="4" fill="#8B6C58" />
    <rect x="0" y="12" width="26" height="3" fill="#9C7D68" />
    {/* Lid wood grain */}
    <rect x="-2" y="18" width="30" height="1" fill="#6B4C3A" opacity="0.25" />
    <rect x="-2" y="22" width="30" height="1" fill="#6B4C3A" opacity="0.2" />
    {/* Lid hinge */}
    <rect x="28" y="24" width="4" height="3" fill="#78909C" opacity="0.5" />
    <rect x="29" y="22" width="2" height="2" fill="#90A4AE" opacity="0.4" />
    {/* Metal bands — ornate brass */}
    <rect x="0" y="32" width="34" height="2" fill="#D4A43A" opacity="0.65" />
    <rect x="0" y="40" width="34" height="2" fill="#D4A43A" opacity="0.55" />
    <rect x="-4" y="20" width="34" height="1" fill="#D4A43A" opacity="0.5" />
    {/* Corner reinforcements */}
    <rect x="0" y="28" width="3" height="4" fill="#B8862D" opacity="0.4" />
    <rect x="31" y="28" width="3" height="4" fill="#B8862D" opacity="0.35" />
    <rect x="0" y="42" width="3" height="4" fill="#B8862D" opacity="0.3" />
    <rect x="31" y="42" width="3" height="4" fill="#B8862D" opacity="0.3" />
    {/* Lock plate — ornate keyhole */}
    <rect x="12" y="28" width="8" height="6" fill="#D4A43A" />
    <rect x="13" y="29" width="6" height="4" fill="#B8862D" />
    <rect x="15" y="30" width="2" height="2" fill="#4E342E" opacity="0.7" />
    <rect x="14" y="32" width="4" height="1" fill="#4E342E" opacity="0.5" />

    {/* Gold and jewels spilling out — lavish overflow */}
    {/* Gold coin pile spilling right */}
    <circle cx="36" cy="42" r="3" fill="#FFD700" opacity="0.85" />
    <circle cx="40" cy="40" r="2.5" fill="#FFD700" opacity="0.75" />
    <circle cx="38" cy="38" r="2" fill="#FFC107" opacity="0.65" />
    <circle cx="42" cy="44" r="2" fill="#FFD700" opacity="0.6" />
    <circle cx="35" cy="38" r="1.5" fill="#FFB300" opacity="0.55" />
    {/* Gold spilling left */}
    <circle cx="-4" cy="44" r="2.5" fill="#FFD700" opacity="0.55" />
    <circle cx="-6" cy="42" r="1.5" fill="#FFC107" opacity="0.45" />
    {/* Gemstones — faceted jewels */}
    <rect x="32" y="34" width="3" height="3" fill="#D50000" opacity="0.6" /> {/* Ruby */}
    <rect x="33" y="35" width="1" height="1" fill="#FF8A80" opacity="0.4" />
    <rect x="26" y="24" width="3" height="3" fill="#1565C0" opacity="0.6" /> {/* Sapphire */}
    <rect x="27" y="25" width="1" height="1" fill="#64B5F6" opacity="0.4" />
    <rect x="6" y="24" width="3" height="3" fill="#2E7D32" opacity="0.55" /> {/* Emerald */}
    <rect x="7" y="25" width="1" height="1" fill="#81C784" opacity="0.35" />
    <rect x="20" y="22" width="2" height="2" fill="#6A1B9A" opacity="0.5" /> {/* Amethyst */}
    {/* Gold pile visible inside chest */}
    <rect x="4" y="22" width="10" height="4" fill="#FFD700" opacity="0.55" />
    <rect x="6" y="20" width="6" height="3" fill="#FFC107" opacity="0.45" />
    <rect x="14" y="20" width="8" height="4" fill="#FFB300" opacity="0.4" />
    <rect x="16" y="18" width="4" height="3" fill="#FFD700" opacity="0.35" />
    {/* Gold bar visible */}
    <rect x="10" y="24" width="8" height="2" fill="#FFD700" opacity="0.6" />
    <rect x="11" y="24" width="6" height="1" fill="#FFF59D" opacity="0.3" />

    {/* Crown — detailed royal crown */}
    <rect x="4" y="16" width="14" height="4" fill="#FFD700" opacity="0.7" />
    <rect x="5" y="14" width="3" height="3" fill="#FFD700" opacity="0.65" />
    <rect x="9" y="12" width="3" height="5" fill="#FFD700" opacity="0.65" />
    <rect x="13" y="14" width="3" height="3" fill="#FFD700" opacity="0.65" />
    <rect x="17" y="14" width="2" height="3" fill="#FFD700" opacity="0.6" />
    {/* Crown jewels */}
    <circle cx="10.5" cy="13" r="1.2" fill="#D50000" opacity="0.55" />
    <circle cx="6.5" cy="15" r="0.8" fill="#1565C0" opacity="0.45" />
    <circle cx="14.5" cy="15" r="0.8" fill="#2E7D32" opacity="0.45" />
    {/* Crown velvet lining */}
    <rect x="6" y="17" width="10" height="2" fill="#880E4F" opacity="0.3" />

    {/* Pearl necklace draped over chest edge — longer strand */}
    {[0, 3.5, 7, 10.5, 14, 17.5, 21, 24.5].map((px, i) => (
      <circle key={`pearl-${i}`} cx={-3 + px} cy={25 + Math.sin(i * 0.8) * 1.5} r="1.2" fill="#F5F5F5" opacity={0.55 - i * 0.03} />
    ))}
    {/* Pearl luster highlights */}
    {[0, 7, 14, 21].map((px, i) => (
      <circle key={`pearl-h-${i}`} cx={-2.5 + px} cy={24.5 + Math.sin(i * 0.8) * 1.5} r="0.4" fill="#FFFFFF" opacity={0.3} />
    ))}

    {/* Sword stuck in sand — detailed cutlass */}
    <rect x="60" y="14" width="2" height="32" fill="#9E9E9E" />
    <rect x="59" y="14" width="1" height="30" fill="#BDBDBD" opacity="0.3" />
    {/* Blade fuller (groove) */}
    <rect x="60.5" y="18" width="1" height="22" fill="#B0BEC5" opacity="0.25" />
    {/* Cross guard */}
    <rect x="55" y="12" width="12" height="3" fill="#B8862D" />
    <rect x="56" y="11" width="10" height="1" fill="#D4A43A" opacity="0.5" />
    {/* Grip — leather wrapped */}
    <rect x="59" y="6" width="4" height="8" fill="#5D4037" />
    <rect x="60" y="7" width="2" height="1" fill="#795548" opacity="0.4" />
    <rect x="60" y="9" width="2" height="1" fill="#795548" opacity="0.4" />
    <rect x="60" y="11" width="2" height="1" fill="#795548" opacity="0.4" />
    {/* Pommel */}
    <rect x="58" y="4" width="6" height="3" fill="#B8862D" />
    <rect x="59" y="3" width="4" height="2" fill="#D4A43A" opacity="0.5" />
    {/* Blade tip in sand */}
    <rect x="60" y="42" width="2" height="6" fill="#78909C" opacity="0.4" />

    {/* Small closed chest nearby — barnacle encrusted */}
    <rect x="64" y="36" width="18" height="10" fill="#4E2E1C" />
    <rect x="66" y="34" width="14" height="4" fill="#5D3A2A" />
    <rect x="64" y="40" width="18" height="1" fill="#B8862D" opacity="0.4" />
    <rect x="64" y="44" width="18" height="1" fill="#B8862D" opacity="0.35" />
    <rect x="71" y="36" width="4" height="2" fill="#D4A43A" opacity="0.3" />
    {/* Barnacles on small chest */}
    <rect x="78" y="38" width="3" height="3" fill="#9CA3AF" opacity="0.35" />
    <rect x="64" y="42" width="3" height="2" fill="#9CA3AF" opacity="0.3" />
    {/* Algae on small chest */}
    <rect x="66" y="44" width="4" height="2" fill="#2E7D32" opacity="0.3" />

    {/* Skeleton hand reaching from sand — more detailed */}
    <rect x="52" y="38" width="2" height="8" fill="#E0E0E0" opacity="0.4" />
    <rect x="50" y="36" width="2" height="4" fill="#EEEEEE" opacity="0.35" />
    <rect x="54" y="36" width="2" height="5" fill="#E0E0E0" opacity="0.35" />
    <rect x="48" y="34" width="2" height="4" fill="#EEEEEE" opacity="0.3" />
    <rect x="56" y="38" width="2" height="3" fill="#E0E0E0" opacity="0.25" />
    {/* Finger bones */}
    <rect x="48" y="33" width="1" height="2" fill="#F5F5F5" opacity="0.25" />
    <rect x="50" y="34" width="1" height="2" fill="#F5F5F5" opacity="0.25" />
    {/* Ring on finger */}
    <circle cx="51" cy="37" r="1" fill="#FFD700" opacity="0.35" />

    {/* Scattered coins — extensive field */}
    <circle cx="8" cy="48" r="1.5" fill="#FFD700" opacity="0.45" />
    <circle cx="20" cy="46" r="1.2" fill="#FFC107" opacity="0.35" />
    <circle cx="44" cy="44" r="1.5" fill="#FFD700" opacity="0.4" />
    <circle cx="14" cy="50" r="1" fill="#FFD700" opacity="0.3" />
    <circle cx="36" cy="48" r="1.2" fill="#FFC107" opacity="0.3" />
    <circle cx="56" cy="48" r="1" fill="#FFD700" opacity="0.35" />
    <circle cx="72" cy="48" r="1.2" fill="#FFD700" opacity="0.25" />
    <circle cx="28" cy="50" r="0.8" fill="#FFC107" opacity="0.2" />
    <circle cx="46" cy="50" r="1" fill="#FFD700" opacity="0.25" />
    <circle cx="62" cy="50" r="0.8" fill="#FFC107" opacity="0.2" />
    {/* Coin edge detail — some showing faces */}
    <circle cx="8" cy="48" r="1.5" fill="none" stroke="#B8862D" strokeWidth="0.3" opacity="0.3" />
    <circle cx="44" cy="44" r="1.5" fill="none" stroke="#B8862D" strokeWidth="0.3" opacity="0.25" />

    {/* Goblet — tipped over */}
    <rect x="42" y="38" width="4" height="6" fill="#D4A43A" opacity="0.5" />
    <rect x="40" y="36" width="8" height="2" fill="#FFD700" opacity="0.4" />
    <rect x="43" y="44" width="3" height="2" fill="#B8862D" opacity="0.35" />

    {/* Chain trailing in sand — heavy iron */}
    <path d="M34 46 Q38 44 42 46 Q46 48 50 46 Q54 44 58 46" stroke="#4B5563" strokeWidth="1.8" fill="none" opacity="0.35" />
    {/* Individual chain link details */}
    <circle cx="38" cy="45" r="1" fill="none" stroke="#546E7A" strokeWidth="0.5" opacity="0.25" />
    <circle cx="46" cy="47" r="1" fill="none" stroke="#546E7A" strokeWidth="0.5" opacity="0.2" />

    {/* Map scroll partially buried */}
    <rect x="-8" y="38" width="10" height="4" fill="#D7CCC8" opacity="0.35" />
    <rect x="-8" y="38" width="10" height="1" fill="#BCAAA4" opacity="0.25" />
    <rect x="-8" y="41" width="10" height="1" fill="#A1887F" opacity="0.2" />

    {/* Algae on chest */}
    <rect x="0" y="44" width="4" height="2" fill="#2E7D32" opacity="0.3" />
    <rect x="28" y="44" width="6" height="2" fill="#1B5E20" opacity="0.25" />

    {/* Bubbles from disturbed treasure */}
    <circle cx="16" cy="14" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4s ease-in 0.5s infinite' }} />
    <circle cx="62" cy="10" r="0.8" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5s ease-in 2s infinite' }} />
  </g>
))
TreasureCluster.displayName = 'TreasureCluster'

// ─── Standalone Anchor (for sailboat theme) ─────────────────────────

const SunkenAnchor = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Anchor shank (main vertical shaft) — forged iron, heavily weathered */}
    <rect x="17" y="-10" width="6" height="54" fill="#4B5563" rx="1" />
    <rect x="18" y="-10" width="4" height="54" fill="#546E7A" opacity="0.4" />
    {/* Shank edge highlights */}
    <rect x="17" y="-10" width="1" height="54" fill="#607D8B" opacity="0.2" />
    {/* Ring at top — heavy forged iron ring */}
    <circle cx="20" cy="-8" r="8" fill="none" stroke="#4B5563" strokeWidth="4" />
    <circle cx="20" cy="-8" r="8" fill="none" stroke="#607D8B" strokeWidth="1" opacity="0.25" />
    {/* Ring wear mark at top */}
    <rect x="18" y="-17" width="4" height="2" fill="#78909C" opacity="0.3" />
    {/* Stock (horizontal cross-bar at top) */}
    <rect x="4" y="-14" width="32" height="4" fill="#6B7280" rx="1" />
    <rect x="5" y="-14" width="30" height="1" fill="#78909C" opacity="0.3" />
    {/* Stock ball ends */}
    <rect x="2" y="-16" width="4" height="6" fill="#546E7A" rx="1" />
    <rect x="34" y="-16" width="4" height="6" fill="#546E7A" rx="1" />

    {/* Crown / arms (curved flukes) — detailed forging */}
    <path d="M8 38 Q5 32 10 26 Q14 24 18 28 L18 42 Q14 44 8 38Z" fill="#6B7280" />
    <path d="M32 38 Q35 32 30 26 Q26 24 22 28 L22 42 Q26 44 32 38Z" fill="#6B7280" />
    {/* Arm inner shading */}
    <path d="M10 36 Q8 32 12 28 Q14 26 18 30 L18 38 Q14 40 10 36Z" fill="#546E7A" opacity="0.3" />
    <path d="M30 36 Q32 32 28 28 Q26 26 22 30 L22 38 Q26 40 30 36Z" fill="#546E7A" opacity="0.3" />
    {/* Fluke tips (pointed spade-shaped) */}
    <path d="M8 38 L0 48 L6 46 L14 42 Z" fill="#546E7A" />
    <path d="M32 38 L40 48 L34 46 L26 42 Z" fill="#546E7A" />
    {/* Fluke edge highlights */}
    <path d="M2 46 L8 38" stroke="#78909C" strokeWidth="0.5" fill="none" opacity="0.3" />
    <path d="M38 46 L32 38" stroke="#78909C" strokeWidth="0.5" fill="none" opacity="0.3" />
    {/* Bill (pointed tip between flukes) */}
    <rect x="18" y="42" width="4" height="4" fill="#4B5563" />
    <rect x="19" y="46" width="2" height="2" fill="#546E7A" />

    {/* Rust patches — extensive corrosion */}
    <ellipse cx="20" cy="8" rx="4" ry="5" fill="#B45309" opacity="0.28" />
    <ellipse cx="20" cy="10" rx="2" ry="2" fill="#E65100" opacity="0.18" />
    <ellipse cx="12" cy="34" rx="3" ry="3" fill="#B45309" opacity="0.22" />
    <ellipse cx="28" cy="34" rx="3" ry="3" fill="#BF360C" opacity="0.2" />
    <ellipse cx="20" cy="24" rx="3" ry="4" fill="#8B4513" opacity="0.2" />
    {/* Rust streaks running down */}
    <rect x="19" y="12" width="2" height="8" fill="#B45309" opacity="0.12" />
    <rect x="21" y="28" width="1" height="6" fill="#BF360C" opacity="0.1" />
    {/* Flake corrosion on stock */}
    <rect x="8" y="-14" width="4" height="2" fill="#E65100" opacity="0.18" />
    <rect x="26" y="-13" width="6" height="2" fill="#B45309" opacity="0.15" />

    {/* Rope coiled around shank — weathered hemp */}
    <path d="M13 14 Q20 12 27 14" stroke="#8B7355" strokeWidth="2" fill="none" opacity="0.55" />
    <path d="M12 18 Q20 16 28 18" stroke="#A08060" strokeWidth="2" fill="none" opacity="0.45" />
    <path d="M13 22 Q20 20 27 22" stroke="#8B7355" strokeWidth="2" fill="none" opacity="0.4" />
    <path d="M14 26 Q20 24 26 26" stroke="#A08060" strokeWidth="1.5" fill="none" opacity="0.35" />
    {/* Frayed rope end dangling */}
    <path d="M13 14 Q10 16 8 20" stroke="#C4A862" strokeWidth="1" fill="none" opacity="0.3" />
    <path d="M27 14 Q30 18 28 22" stroke="#C4A862" strokeWidth="0.8" fill="none" opacity="0.25" />

    {/* Chain draped from ring — heavy links */}
    <path d="M14 -10 Q6 -6 2 2 Q0 10 2 18 Q4 24 2 30" stroke="#4B5563" strokeWidth="2.5" fill="none" opacity="0.45" />
    {/* Chain link detail */}
    <circle cx="8" cy="-4" r="1.5" fill="none" stroke="#546E7A" strokeWidth="0.5" opacity="0.3" />
    <circle cx="4" cy="4" r="1.5" fill="none" stroke="#546E7A" strokeWidth="0.5" opacity="0.25" />
    <circle cx="2" cy="14" r="1.5" fill="none" stroke="#546E7A" strokeWidth="0.5" opacity="0.2" />

    {/* Barnacle clusters — extensive coverage */}
    <circle cx="24" cy="30" r="2" fill="#9CA3AF" opacity="0.4" />
    <circle cx="25" cy="32" r="1.2" fill="#B0BEC5" opacity="0.3" />
    <circle cx="14" cy="16" r="1.5" fill="#9CA3AF" opacity="0.35" />
    <rect x="6" y="-12" width="3" height="3" fill="#78909C" opacity="0.3" />
    <rect x="4" y="40" width="3" height="2" fill="#9CA3AF" opacity="0.3" />
    <rect x="32" y="40" width="3" height="2" fill="#9CA3AF" opacity="0.25" />

    {/* Seaweed draped on anchor — multiple strands */}
    <path d="M26 26 Q32 22 30 14 Q28 10 30 6" stroke="#2E7D32" strokeWidth="1.2" fill="none" opacity="0.4" />
    <path d="M24 28 Q28 24 26 18" stroke="#388E3C" strokeWidth="1" fill="none" opacity="0.3" />
    <path d="M14 30 Q10 26 12 20" stroke="#1B5E20" strokeWidth="1" fill="none" opacity="0.3" />
    {/* Kelp leaf shapes on seaweed */}
    <rect x="30" y="8" width="4" height="2" fill="#4CAF50" opacity="0.3" />
    <rect x="28" y="16" width="3" height="2" fill="#388E3C" opacity="0.25" />

    {/* Starfish on anchor arm */}
    <rect x="8" y="30" width="3" height="3" fill="#FF5722" opacity="0.3" />
    <rect x="7" y="31" width="1" height="1" fill="#FF7043" opacity="0.25" />
    <rect x="11" y="31" width="1" height="1" fill="#FF7043" opacity="0.25" />

    {/* Sand mounding around base */}
    <rect x="0" y="48" width="40" height="3" fill="#C4A862" opacity="0.2" />

    {/* Bubbles */}
    <circle cx="20" cy="-16" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4s ease-in 1s infinite' }} />
    <circle cx="4" cy="24" r="0.8" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5s ease-in 3s infinite' }} />
  </g>
))
SunkenAnchor.displayName = 'SunkenAnchor'

// ─── SHIPWRECK: Sunken Pirate Galleon ────────────────────────────────

const SunkenShip = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Mirror the entire ship horizontally (bow faces right, stern faces left) */}
    <g transform="translate(120, 0) scale(-1, 1)">

    {/* ═══ SHADOW ON SEABED — wide rect at bottom ═══ */}
    <rect x="-20" y="70" width="170" height="6" fill="#000" opacity="0.12" />
    <rect x="-10" y="72" width="150" height="4" fill="#000" opacity="0.08" />

    {/* ═══ MAIN HULL — wooden galleon, slightly listed, built from pixel blocks ═══ */}
    {/* Hull top row */}
    <rect x="-6" y="24" width="8" height="4" fill="#795548" />
    <rect x="2" y="22" width="12" height="4" fill="#795548" />
    <rect x="14" y="20" width="16" height="4" fill="#795548" />
    <rect x="30" y="18" width="20" height="4" fill="#795548" />
    <rect x="50" y="18" width="20" height="4" fill="#795548" />
    <rect x="70" y="18" width="20" height="4" fill="#795548" />
    <rect x="90" y="20" width="16" height="4" fill="#795548" />
    <rect x="106" y="22" width="10" height="4" fill="#795548" />
    {/* Hull middle rows */}
    <rect x="-10" y="28" width="6" height="4" fill="#5D4037" />
    <rect x="-4" y="28" width="120" height="4" fill="#5D4037" />
    <rect x="116" y="28" width="10" height="4" fill="#5D4037" />
    <rect x="-12" y="32" width="4" height="4" fill="#5D4037" />
    <rect x="-8" y="32" width="126" height="4" fill="#5D4037" />
    <rect x="118" y="32" width="12" height="4" fill="#5D4037" />
    {/* Hull lower rows */}
    <rect x="-12" y="36" width="4" height="4" fill="#3E2723" />
    <rect x="-8" y="36" width="128" height="4" fill="#3E2723" />
    <rect x="120" y="36" width="12" height="4" fill="#3E2723" />
    <rect x="-10" y="40" width="4" height="4" fill="#3E2723" />
    <rect x="-6" y="40" width="128" height="4" fill="#3E2723" />
    <rect x="122" y="40" width="10" height="4" fill="#3E2723" />
    {/* Hull bottom rows */}
    <rect x="-8" y="44" width="6" height="4" fill="#3E2723" />
    <rect x="-2" y="44" width="124" height="4" fill="#3E2723" />
    <rect x="122" y="44" width="8" height="4" fill="#3E2723" />
    <rect x="-4" y="48" width="4" height="4" fill="#4E342E" />
    <rect x="0" y="48" width="118" height="4" fill="#4E342E" />
    <rect x="118" y="48" width="8" height="4" fill="#4E342E" />
    {/* Keel / bottom */}
    <rect x="2" y="52" width="114" height="4" fill="#3E2723" />
    <rect x="116" y="52" width="6" height="4" fill="#3E2723" />
    <rect x="8" y="56" width="106" height="3" fill="#3E2723" />
    {/* Hull top highlight pixels */}
    <rect x="4" y="22" width="4" height="2" fill="#8D6E63" opacity="0.5" />
    <rect x="20" y="20" width="4" height="2" fill="#8D6E63" opacity="0.45" />
    <rect x="40" y="18" width="4" height="2" fill="#8D6E63" opacity="0.5" />
    <rect x="60" y="18" width="4" height="2" fill="#8D6E63" opacity="0.45" />
    <rect x="80" y="18" width="4" height="2" fill="#8D6E63" opacity="0.5" />
    <rect x="96" y="20" width="4" height="2" fill="#8D6E63" opacity="0.45" />
    {/* Hull bottom shadow pixels */}
    <rect x="10" y="54" width="6" height="2" fill="#1A0E08" opacity="0.3" />
    <rect x="40" y="54" width="6" height="2" fill="#1A0E08" opacity="0.25" />
    <rect x="80" y="54" width="6" height="2" fill="#1A0E08" opacity="0.3" />
    {/* Hull planking texture — alternating shade rects */}
    <rect x="0" y="30" width="8" height="2" fill="#8D6E63" opacity="0.3" />
    <rect x="12" y="30" width="10" height="2" fill="#8D6E63" opacity="0.25" />
    <rect x="26" y="30" width="12" height="2" fill="#8D6E63" opacity="0.3" />
    <rect x="42" y="30" width="8" height="2" fill="#8D6E63" opacity="0.25" />
    <rect x="54" y="30" width="10" height="2" fill="#8D6E63" opacity="0.3" />
    <rect x="68" y="30" width="8" height="2" fill="#8D6E63" opacity="0.25" />
    <rect x="80" y="30" width="12" height="2" fill="#8D6E63" opacity="0.3" />
    <rect x="96" y="30" width="8" height="2" fill="#8D6E63" opacity="0.25" />
    <rect x="6" y="38" width="10" height="2" fill="#6D4C41" opacity="0.2" />
    <rect x="20" y="38" width="8" height="2" fill="#6D4C41" opacity="0.25" />
    <rect x="32" y="38" width="10" height="2" fill="#6D4C41" opacity="0.2" />
    <rect x="74" y="38" width="12" height="2" fill="#6D4C41" opacity="0.25" />
    <rect x="90" y="38" width="8" height="2" fill="#6D4C41" opacity="0.2" />
    <rect x="102" y="38" width="10" height="2" fill="#6D4C41" opacity="0.25" />
    {/* Copper sheathing pixels along bottom */}
    <rect x="10" y="52" width="6" height="2" fill="#8B4513" opacity="0.2" />
    <rect x="30" y="52" width="8" height="2" fill="#8B4513" opacity="0.18" />
    <rect x="60" y="52" width="6" height="2" fill="#8B4513" opacity="0.2" />
    <rect x="90" y="52" width="8" height="2" fill="#8B4513" opacity="0.18" />

    {/* ═══ GUN DECK STRIPE — gold band ═══ */}
    <rect x="-4" y="32" width="124" height="2" fill="#D4A43A" opacity="0.12" />

    {/* ═══ GUN PORTS — square dark openings with lids ═══ */}
    {[18, 38, 78, 98].map((gx, i) => (
      <g key={`gp-${i}`}>
        <rect x={gx - 3} y={33 - (gx < 60 ? 0 : 1)} width="6" height="6" fill="#1A0E08" opacity="0.75" />
        <rect x={gx - 3} y={33 - (gx < 60 ? 0 : 1)} width="6" height="2" fill="#6D4C41" opacity="0.5" />
      </g>
    ))}

    {/* ═══ CANNONS poking out of ports ═══ */}
    <rect x="9" y="35" width="8" height="3" fill="#455A64" />
    <rect x="9" y="35" width="2" height="1" fill="#607D8B" opacity="0.4" />
    <rect x="69" y="34" width="8" height="3" fill="#455A64" />
    <rect x="69" y="34" width="2" height="1" fill="#607D8B" opacity="0.4" />
    {/* Fallen cannon on seabed */}
    <rect x="30" y="66" width="12" height="3" fill="#546E7A" opacity="0.35" />
    <rect x="30" y="66" width="2" height="1" fill="#78909C" opacity="0.2" />

    {/* ═══ STERN — captain's quarters with gallery windows ═══ */}
    <rect x="114" y="8" width="4" height="4" fill="#8D6E63" />
    <rect x="118" y="4" width="4" height="4" fill="#8D6E63" />
    <rect x="122" y="2" width="6" height="4" fill="#8D6E63" />
    <rect x="128" y="0" width="6" height="4" fill="#8D6E63" />
    <rect x="134" y="2" width="6" height="4" fill="#8D6E63" />
    <rect x="114" y="12" width="28" height="4" fill="#795548" />
    <rect x="114" y="16" width="28" height="4" fill="#795548" />
    <rect x="116" y="20" width="26" height="4" fill="#6D4C41" />
    <rect x="116" y="24" width="26" height="4" fill="#6D4C41" />
    <rect x="114" y="28" width="28" height="4" fill="#5D4037" />
    <rect x="114" y="32" width="28" height="4" fill="#5D4037" />
    <rect x="114" y="36" width="28" height="4" fill="#4E342E" />
    <rect x="114" y="40" width="26" height="4" fill="#4E342E" />
    <rect x="114" y="44" width="24" height="4" fill="#4E342E" />
    <rect x="116" y="48" width="20" height="4" fill="#3E2723" />
    <rect x="118" y="52" width="16" height="4" fill="#3E2723" />
    {/* Stern highlight */}
    <rect x="120" y="4" width="4" height="2" fill="#A1887F" opacity="0.4" />
    <rect x="130" y="2" width="4" height="2" fill="#A1887F" opacity="0.35" />
    <rect x="116" y="12" width="4" height="2" fill="#A1887F" opacity="0.3" />
    {/* Stern gallery windows — upper */}
    <rect x="124" y="10" width="6" height="12" fill="#0A1628" opacity="0.8" />
    <rect x="124" y="10" width="6" height="2" fill="#A1887F" opacity="0.5" />
    <rect x="124" y="20" width="6" height="2" fill="#A1887F" opacity="0.4" />
    <rect x="124" y="10" width="2" height="12" fill="#A1887F" opacity="0.3" />
    <rect x="128" y="10" width="2" height="12" fill="#A1887F" opacity="0.3" />
    <rect x="132" y="12" width="6" height="10" fill="#0A1628" opacity="0.7" />
    <rect x="132" y="12" width="6" height="2" fill="#A1887F" opacity="0.45" />
    <rect x="132" y="20" width="6" height="2" fill="#A1887F" opacity="0.35" />
    <rect x="132" y="12" width="2" height="10" fill="#A1887F" opacity="0.25" />
    <rect x="136" y="12" width="2" height="10" fill="#A1887F" opacity="0.25" />
    {/* Lower stern window */}
    <rect x="126" y="28" width="6" height="10" fill="#0A1628" opacity="0.6" />
    <rect x="126" y="28" width="6" height="2" fill="#A1887F" opacity="0.4" />
    <rect x="126" y="36" width="6" height="2" fill="#A1887F" opacity="0.3" />
    <rect x="126" y="28" width="2" height="10" fill="#A1887F" opacity="0.25" />
    {/* Stern lantern bracket */}
    <rect x="136" y="-2" width="2" height="4" fill="#A1887F" opacity="0.4" />
    <rect x="138" y="-4" width="2" height="2" fill="#A1887F" opacity="0.35" />
    <rect x="137" y="-6" width="3" height="3" fill="#FF8F00" opacity="0.2" />
    {/* Stern gilded trim pixels */}
    <rect x="120" y="6" width="4" height="2" fill="#D4A43A" opacity="0.4" />
    <rect x="126" y="4" width="4" height="2" fill="#D4A43A" opacity="0.35" />
    <rect x="132" y="6" width="4" height="2" fill="#D4A43A" opacity="0.3" />
    <rect x="138" y="4" width="2" height="2" fill="#D4A43A" opacity="0.25" />
    <rect x="118" y="8" width="4" height="2" fill="#D4A43A" opacity="0.3" />
    <rect x="134" y="8" width="4" height="2" fill="#D4A43A" opacity="0.25" />
    <rect x="120" y="48" width="4" height="2" fill="#D4A43A" opacity="0.2" />
    <rect x="128" y="48" width="4" height="2" fill="#D4A43A" opacity="0.18" />
    {/* Stern name plaque */}
    <rect x="124" y="42" width="12" height="4" fill="#4E342E" opacity="0.5" />
    <rect x="125" y="43" width="10" height="2" fill="#D4A43A" opacity="0.15" />

    {/* ═══ BOW — stepped pixel prow ═══ */}
    <rect x="-6" y="26" width="6" height="4" fill="#6D4C41" />
    <rect x="-10" y="22" width="6" height="4" fill="#6D4C41" />
    <rect x="-14" y="18" width="6" height="4" fill="#6D4C41" />
    <rect x="-18" y="14" width="6" height="4" fill="#6D4C41" />
    <rect x="-20" y="10" width="6" height="4" fill="#795548" />
    <rect x="-18" y="8" width="4" height="4" fill="#795548" />
    {/* Bow highlight */}
    <rect x="-18" y="10" width="2" height="2" fill="#A1887F" opacity="0.4" />
    <rect x="-14" y="14" width="2" height="2" fill="#A1887F" opacity="0.35" />
    {/* Bow reinforcement bands */}
    <rect x="-16" y="16" width="8" height="2" fill="#4E342E" opacity="0.4" />
    <rect x="-12" y="22" width="8" height="2" fill="#4E342E" opacity="0.35" />
    {/* Bowsprit — angled forward spar (stepped diagonal rects) */}
    <rect x="-24" y="6" width="6" height="3" fill="#8D6E63" />
    <rect x="-30" y="2" width="6" height="3" fill="#8D6E63" />
    <rect x="-36" y="-2" width="6" height="3" fill="#8D6E63" />
    <rect x="-42" y="-6" width="6" height="3" fill="#A1887F" />
    <rect x="-48" y="-10" width="6" height="3" fill="#BCAAA4" opacity="0.6" />
    {/* Bowsprit highlight */}
    <rect x="-30" y="2" width="4" height="1" fill="#A1887F" opacity="0.4" />
    <rect x="-42" y="-6" width="4" height="1" fill="#BCAAA4" opacity="0.35" />
    {/* Bowsprit rigging (thin rects stepped diagonally) */}
    <rect x="-38" y="-2" width="2" height="3" fill="#A08060" opacity="0.3" />
    <rect x="-34" y="2" width="2" height="3" fill="#A08060" opacity="0.25" />
    <rect x="-28" y="6" width="2" height="3" fill="#A08060" opacity="0.25" />
    <rect x="-22" y="10" width="2" height="3" fill="#A08060" opacity="0.2" />
    {/* Figurehead — pixel block sea creature */}
    <rect x="-26" y="8" width="4" height="4" fill="#D4A43A" opacity="0.5" />
    <rect x="-28" y="6" width="4" height="4" fill="#D4A43A" opacity="0.45" />
    <rect x="-26" y="4" width="2" height="2" fill="#E8C468" opacity="0.4" />
    <rect x="-30" y="6" width="2" height="2" fill="#E8C468" opacity="0.35" />

    {/* ═══ HULL BREACH — dark hole built from pixel blocks ═══ */}
    <rect x="44" y="34" width="4" height="4" fill="#0A1628" opacity="0.8" />
    <rect x="48" y="32" width="4" height="4" fill="#0A1628" opacity="0.85" />
    <rect x="52" y="30" width="4" height="4" fill="#0A1628" opacity="0.85" />
    <rect x="56" y="30" width="4" height="4" fill="#0A1628" opacity="0.85" />
    <rect x="60" y="32" width="4" height="4" fill="#0A1628" opacity="0.85" />
    <rect x="64" y="34" width="4" height="4" fill="#0A1628" opacity="0.8" />
    <rect x="46" y="38" width="4" height="4" fill="#0A1628" opacity="0.85" />
    <rect x="50" y="36" width="4" height="4" fill="#0A1628" opacity="0.85" />
    <rect x="54" y="34" width="4" height="4" fill="#0A1628" opacity="0.85" />
    <rect x="58" y="34" width="4" height="4" fill="#0A1628" opacity="0.85" />
    <rect x="62" y="36" width="4" height="4" fill="#0A1628" opacity="0.85" />
    <rect x="44" y="42" width="4" height="4" fill="#0A1628" opacity="0.8" />
    <rect x="48" y="40" width="4" height="4" fill="#0A1628" opacity="0.85" />
    <rect x="52" y="38" width="8" height="4" fill="#0A1628" opacity="0.85" />
    <rect x="60" y="40" width="4" height="4" fill="#0A1628" opacity="0.85" />
    <rect x="64" y="42" width="4" height="4" fill="#0A1628" opacity="0.8" />
    <rect x="48" y="44" width="4" height="4" fill="#0A1628" opacity="0.75" />
    <rect x="52" y="42" width="8" height="4" fill="#0A1628" opacity="0.8" />
    <rect x="60" y="44" width="4" height="4" fill="#0A1628" opacity="0.75" />
    {/* Inner hull ribs visible through breach */}
    <rect x="48" y="34" width="2" height="14" fill="#A1887F" opacity="0.35" />
    <rect x="53" y="32" width="2" height="16" fill="#A1887F" opacity="0.3" />
    <rect x="58" y="32" width="2" height="16" fill="#A1887F" opacity="0.35" />
    <rect x="63" y="34" width="2" height="14" fill="#A1887F" opacity="0.3" />
    {/* Torn plank pixels framing breach */}
    <rect x="42" y="32" width="3" height="3" fill="#6D4C41" />
    <rect x="44" y="30" width="2" height="3" fill="#5D4037" />
    <rect x="67" y="32" width="3" height="3" fill="#6D4C41" />
    <rect x="68" y="30" width="2" height="3" fill="#5D4037" />
    <rect x="42" y="44" width="3" height="3" fill="#5D4037" />
    <rect x="67" y="44" width="3" height="3" fill="#5D4037" />
    <rect x="50" y="48" width="3" height="2" fill="#4E342E" />
    <rect x="60" y="48" width="3" height="2" fill="#4E342E" />

    {/* ═══ DECK visible above hull ═══ */}
    <rect x="0" y="18" width="20" height="3" fill="#6D4C41" opacity="0.6" />
    <rect x="20" y="16" width="20" height="3" fill="#6D4C41" opacity="0.6" />
    <rect x="40" y="16" width="20" height="3" fill="#6D4C41" opacity="0.6" />
    <rect x="60" y="16" width="20" height="3" fill="#6D4C41" opacity="0.6" />
    <rect x="80" y="16" width="16" height="3" fill="#6D4C41" opacity="0.6" />
    <rect x="96" y="18" width="16" height="3" fill="#6D4C41" opacity="0.6" />
    {/* Deck planking texture */}
    <rect x="4" y="18" width="6" height="1" fill="#8D6E63" opacity="0.3" />
    <rect x="14" y="17" width="8" height="1" fill="#8D6E63" opacity="0.25" />
    <rect x="28" y="16" width="6" height="1" fill="#8D6E63" opacity="0.3" />
    <rect x="44" y="16" width="8" height="1" fill="#8D6E63" opacity="0.25" />
    <rect x="62" y="16" width="6" height="1" fill="#8D6E63" opacity="0.3" />
    <rect x="82" y="16" width="8" height="1" fill="#8D6E63" opacity="0.25" />
    {/* Hatch on deck */}
    <rect x="38" y="15" width="8" height="4" fill="#3E2723" opacity="0.5" />
    <rect x="39" y="16" width="6" height="2" fill="#1A0E08" opacity="0.4" />
    {/* Capstan on deck (pixel block) */}
    <rect x="86" y="16" width="4" height="4" fill="#5D4037" opacity="0.4" />
    <rect x="87" y="17" width="2" height="2" fill="#795548" opacity="0.3" />

    {/* ═══ MAIN MAST — broken with jagged pixel splinter ═══ */}
    <rect x="58" y="-14" width="6" height="4" fill="#8D6E63" />
    <rect x="58" y="-10" width="6" height="4" fill="#8D6E63" />
    <rect x="58" y="-6" width="6" height="4" fill="#8D6E63" />
    <rect x="58" y="-2" width="6" height="4" fill="#795548" />
    <rect x="58" y="2" width="6" height="4" fill="#795548" />
    <rect x="58" y="6" width="6" height="4" fill="#795548" />
    <rect x="58" y="10" width="6" height="4" fill="#6D4C41" />
    <rect x="58" y="14" width="6" height="4" fill="#6D4C41" />
    <rect x="58" y="18" width="6" height="4" fill="#5D4037" />
    {/* Jagged break at top */}
    <rect x="59" y="-18" width="3" height="4" fill="#A1887F" />
    <rect x="62" y="-16" width="2" height="3" fill="#795548" />
    <rect x="58" y="-16" width="2" height="2" fill="#A1887F" opacity="0.6" />
    {/* Mast highlight */}
    <rect x="58" y="-12" width="2" height="4" fill="#A1887F" opacity="0.4" />
    <rect x="58" y="-4" width="2" height="4" fill="#A1887F" opacity="0.35" />
    <rect x="58" y="4" width="2" height="4" fill="#A1887F" opacity="0.3" />
    {/* Mast bands (iron hoops) */}
    <rect x="57" y="-4" width="8" height="2" fill="#4B5563" opacity="0.35" />
    <rect x="57" y="8" width="8" height="2" fill="#4B5563" opacity="0.3" />

    {/* ═══ CROW'S NEST REMNANT — pixel platform ═══ */}
    <rect x="52" y="-12" width="4" height="2" fill="#5D4037" />
    <rect x="56" y="-14" width="10" height="2" fill="#5D4037" />
    <rect x="66" y="-12" width="4" height="2" fill="#5D4037" />
    {/* Crow's nest side posts */}
    <rect x="53" y="-12" width="2" height="6" fill="#5D4037" opacity="0.5" />
    <rect x="67" y="-12" width="2" height="6" fill="#5D4037" opacity="0.5" />

    {/* ═══ TATTERED SAIL — pixel blocks billowing from mast ═══ */}
    <rect x="54" y="-10" width="4" height="4" fill="#D7CCC8" opacity="0.25" />
    <rect x="50" y="-8" width="4" height="4" fill="#D7CCC8" opacity="0.25" />
    <rect x="52" y="-6" width="4" height="4" fill="#EFEBE9" opacity="0.22" />
    <rect x="48" y="-4" width="4" height="4" fill="#D7CCC8" opacity="0.25" />
    <rect x="46" y="0" width="4" height="4" fill="#D7CCC8" opacity="0.22" />
    <rect x="50" y="2" width="4" height="4" fill="#EFEBE9" opacity="0.2" />
    <rect x="44" y="4" width="4" height="4" fill="#D7CCC8" opacity="0.2" />
    <rect x="48" y="6" width="4" height="4" fill="#D7CCC8" opacity="0.22" />
    <rect x="52" y="8" width="4" height="4" fill="#BCAAA4" opacity="0.2" />
    <rect x="46" y="10" width="4" height="4" fill="#D7CCC8" opacity="0.18" />
    <rect x="50" y="12" width="4" height="4" fill="#BCAAA4" opacity="0.18" />
    <rect x="54" y="14" width="4" height="4" fill="#D7CCC8" opacity="0.15" />
    {/* Sail holes (dark pixels) */}
    <rect x="50" y="2" width="2" height="2" fill="#0A1628" opacity="0.15" />
    <rect x="52" y="10" width="2" height="2" fill="#0A1628" opacity="0.1" />

    {/* ═══ RIGGING LINES — thin rects stepped diagonally ═══ */}
    {/* Port shroud (left) */}
    <rect x="56" y="-12" width="1" height="4" fill="#A08060" opacity="0.3" />
    <rect x="52" y="-8" width="1" height="4" fill="#A08060" opacity="0.28" />
    <rect x="48" y="-4" width="1" height="4" fill="#A08060" opacity="0.25" />
    <rect x="44" y="0" width="1" height="4" fill="#A08060" opacity="0.22" />
    <rect x="38" y="4" width="1" height="4" fill="#A08060" opacity="0.2" />
    <rect x="32" y="8" width="1" height="4" fill="#A08060" opacity="0.2" />
    <rect x="26" y="12" width="1" height="4" fill="#A08060" opacity="0.18" />
    {/* Starboard shroud (right) */}
    <rect x="65" y="-12" width="1" height="4" fill="#A08060" opacity="0.25" />
    <rect x="70" y="-8" width="1" height="4" fill="#A08060" opacity="0.22" />
    <rect x="76" y="-4" width="1" height="4" fill="#A08060" opacity="0.2" />
    <rect x="82" y="0" width="1" height="4" fill="#A08060" opacity="0.18" />
    <rect x="88" y="4" width="1" height="4" fill="#A08060" opacity="0.18" />
    <rect x="94" y="8" width="1" height="4" fill="#A08060" opacity="0.16" />
    {/* Inner shrouds */}
    <rect x="54" y="-2" width="1" height="4" fill="#A08060" opacity="0.2" />
    <rect x="48" y="4" width="1" height="4" fill="#A08060" opacity="0.18" />
    <rect x="42" y="10" width="1" height="4" fill="#A08060" opacity="0.16" />
    <rect x="68" y="-2" width="1" height="4" fill="#A08060" opacity="0.2" />
    <rect x="74" y="4" width="1" height="4" fill="#A08060" opacity="0.18" />
    <rect x="80" y="10" width="1" height="4" fill="#A08060" opacity="0.16" />
    {/* Dangling broken rope */}
    <rect x="63" y="-14" width="1" height="3" fill="#C4A862" opacity="0.25" />
    <rect x="64" y="-11" width="1" height="3" fill="#C4A862" opacity="0.22" />
    <rect x="63" y="-8" width="1" height="3" fill="#C4A862" opacity="0.2" />
    <rect x="64" y="-5" width="1" height="3" fill="#C4A862" opacity="0.18" />
    <rect x="65" y="-2" width="1" height="3" fill="#C4A862" opacity="0.16" />

    {/* ═══ MIZZEN MAST (shorter, aft) — snapped lower ═══ */}
    <rect x="96" y="2" width="4" height="4" fill="#8D6E63" opacity="0.8" />
    <rect x="96" y="6" width="4" height="4" fill="#8D6E63" opacity="0.8" />
    <rect x="96" y="10" width="4" height="4" fill="#795548" opacity="0.8" />
    <rect x="96" y="14" width="4" height="4" fill="#6D4C41" opacity="0.8" />
    {/* Jagged break */}
    <rect x="97" y="-1" width="2" height="3" fill="#A1887F" opacity="0.6" />
    <rect x="99" y="0" width="2" height="2" fill="#795548" opacity="0.5" />

    {/* ═══ FOREMAST STUB (forward) ═══ */}
    <rect x="22" y="10" width="4" height="4" fill="#795548" opacity="0.6" />
    <rect x="22" y="14" width="4" height="4" fill="#6D4C41" opacity="0.6" />
    {/* Jagged break */}
    <rect x="23" y="8" width="2" height="3" fill="#A1887F" opacity="0.4" />

    {/* ═══ RAILING POSTS — pixel blocks, some broken ═══ */}
    <rect x="8" y="14" width="2" height="8" fill="#795548" opacity="0.6" />
    <rect x="18" y="13" width="2" height="4" fill="#795548" opacity="0.4" />
    <rect x="30" y="12" width="2" height="8" fill="#795548" opacity="0.5" />
    <rect x="72" y="12" width="2" height="8" fill="#795548" opacity="0.5" />
    <rect x="84" y="14" width="2" height="6" fill="#795548" opacity="0.4" />
    {/* Railing rope (thin horizontal rects between posts) */}
    <rect x="10" y="15" width="8" height="1" fill="#A08060" opacity="0.25" />
    <rect x="32" y="13" width="40" height="1" fill="#A08060" opacity="0.25" />

    {/* ═══ CHAIN — stepped pixel blocks along hull ═══ */}
    <rect x="6" y="56" width="3" height="2" fill="#4B5563" opacity="0.35" />
    <rect x="10" y="58" width="3" height="2" fill="#4B5563" opacity="0.3" />
    <rect x="14" y="56" width="3" height="2" fill="#4B5563" opacity="0.35" />
    <rect x="18" y="58" width="3" height="2" fill="#4B5563" opacity="0.3" />
    <rect x="22" y="56" width="3" height="2" fill="#4B5563" opacity="0.35" />
    <rect x="26" y="58" width="3" height="2" fill="#4B5563" opacity="0.3" />
    <rect x="30" y="56" width="3" height="2" fill="#4B5563" opacity="0.35" />
    <rect x="34" y="58" width="3" height="2" fill="#4B5563" opacity="0.3" />
    <rect x="38" y="56" width="3" height="2" fill="#4B5563" opacity="0.35" />
    <rect x="42" y="58" width="3" height="2" fill="#4B5563" opacity="0.3" />
    <rect x="46" y="56" width="3" height="2" fill="#4B5563" opacity="0.35" />
    {/* Anchor chain from bow to seabed */}
    <rect x="-16" y="22" width="2" height="4" fill="#4B5563" opacity="0.3" />
    <rect x="-17" y="26" width="2" height="4" fill="#4B5563" opacity="0.28" />
    <rect x="-18" y="30" width="2" height="4" fill="#4B5563" opacity="0.26" />
    <rect x="-18" y="34" width="2" height="4" fill="#4B5563" opacity="0.26" />
    <rect x="-18" y="38" width="2" height="4" fill="#4B5563" opacity="0.25" />
    <rect x="-17" y="42" width="2" height="4" fill="#4B5563" opacity="0.25" />
    <rect x="-17" y="46" width="2" height="4" fill="#4B5563" opacity="0.24" />
    <rect x="-16" y="50" width="2" height="4" fill="#4B5563" opacity="0.24" />
    <rect x="-16" y="54" width="2" height="4" fill="#4B5563" opacity="0.24" />
    <rect x="-15" y="58" width="2" height="4" fill="#4B5563" opacity="0.23" />
    <rect x="-14" y="62" width="2" height="4" fill="#4B5563" opacity="0.23" />
    <rect x="-12" y="66" width="2" height="4" fill="#4B5563" opacity="0.22" />
    {/* Small anchor on seabed */}
    <rect x="-12" y="70" width="2" height="4" fill="#546E7A" opacity="0.3" />
    <rect x="-16" y="72" width="4" height="2" fill="#546E7A" opacity="0.3" />
    <rect x="-8" y="72" width="4" height="2" fill="#546E7A" opacity="0.3" />
    <rect x="-12" y="64" width="2" height="6" fill="#546E7A" opacity="0.25" />

    {/* ═══ RUST AND DECAY — layered weathering pixel patches ═══ */}
    <rect x="26" y="46" width="4" height="2" fill="#BF360C" opacity="0.18" />
    <rect x="28" y="44" width="4" height="2" fill="#BF360C" opacity="0.16" />
    <rect x="30" y="48" width="6" height="2" fill="#BF360C" opacity="0.14" />
    <rect x="24" y="48" width="4" height="2" fill="#E65100" opacity="0.12" />
    <rect x="82" y="32" width="4" height="2" fill="#E65100" opacity="0.14" />
    <rect x="84" y="34" width="6" height="2" fill="#E65100" opacity="0.12" />
    <rect x="86" y="30" width="4" height="2" fill="#FF6D00" opacity="0.1" />
    <rect x="104" y="44" width="6" height="2" fill="#BF360C" opacity="0.16" />
    <rect x="106" y="42" width="4" height="2" fill="#BF360C" opacity="0.14" />
    <rect x="108" y="46" width="4" height="2" fill="#8B4513" opacity="0.12" />
    <rect x="12" y="38" width="4" height="2" fill="#8B4513" opacity="0.12" />
    <rect x="10" y="40" width="4" height="2" fill="#BF360C" opacity="0.1" />
    <rect x="116" y="30" width="4" height="2" fill="#BF360C" opacity="0.1" />
    <rect x="118" y="32" width="2" height="4" fill="#E65100" opacity="0.08" />
    {/* Waterline staining pixels */}
    <rect x="0" y="26" width="6" height="2" fill="#5D4037" opacity="0.15" />
    <rect x="20" y="24" width="8" height="2" fill="#5D4037" opacity="0.12" />
    <rect x="50" y="22" width="8" height="2" fill="#5D4037" opacity="0.15" />
    <rect x="80" y="24" width="6" height="2" fill="#5D4037" opacity="0.12" />
    <rect x="100" y="26" width="6" height="2" fill="#5D4037" opacity="0.15" />

    {/* ═══ BARNACLE CLUSTERS — small rect groups ═══ */}
    <rect x="-2" y="54" width="3" height="3" fill="#9CA3AF" opacity="0.3" />
    <rect x="1" y="56" width="2" height="2" fill="#B0BEC5" opacity="0.25" />
    <rect x="-1" y="57" width="2" height="2" fill="#9CA3AF" opacity="0.2" />
    <rect x="66" y="60" width="3" height="3" fill="#9CA3AF" opacity="0.3" />
    <rect x="69" y="58" width="2" height="2" fill="#B0BEC5" opacity="0.2" />
    <rect x="68" y="62" width="2" height="2" fill="#9CA3AF" opacity="0.25" />
    <rect x="124" y="50" width="3" height="3" fill="#9CA3AF" opacity="0.3" />
    <rect x="127" y="52" width="2" height="2" fill="#B0BEC5" opacity="0.25" />
    <rect x="128" y="54" width="2" height="2" fill="#9CA3AF" opacity="0.2" />
    {/* Barnacle line along watermark */}
    {[10, 25, 40, 90, 105].map((bx, i) => (
      <rect key={`bn-${i}`} x={bx} y={52 + (i % 3) * 2} width={2 + (i % 2)} height={2} fill="#9CA3AF" opacity={0.2 + (i % 3) * 0.05} />
    ))}

    {/* ═══ MARINE GROWTH — algae pixel rects ═══ */}
    <rect x="58" y="14" width="3" height="2" fill="#2E7D32" opacity="0.3" />
    <rect x="61" y="13" width="2" height="2" fill="#388E3C" opacity="0.25" />
    <rect x="56" y="15" width="3" height="2" fill="#4CAF50" opacity="0.2" />
    <rect x="4" y="56" width="4" height="2" fill="#388E3C" opacity="0.25" />
    <rect x="2" y="58" width="3" height="2" fill="#2E7D32" opacity="0.2" />
    <rect x="7" y="57" width="2" height="2" fill="#4CAF50" opacity="0.18" />
    <rect x="114" y="52" width="3" height="2" fill="#1B5E20" opacity="0.3" />
    <rect x="117" y="54" width="2" height="2" fill="#2E7D32" opacity="0.25" />
    <rect x="112" y="54" width="3" height="2" fill="#388E3C" opacity="0.2" />
    {/* Sponge colonies (orange pixels) */}
    <rect x="98" y="54" width="3" height="3" fill="#FF6F00" opacity="0.15" />
    <rect x="101" y="55" width="2" height="2" fill="#FF8F00" opacity="0.12" />
    <rect x="12" y="60" width="3" height="2" fill="#FF8F00" opacity="0.12" />
    <rect x="15" y="62" width="2" height="2" fill="#FF6F00" opacity="0.1" />

    {/* ═══ CORAL AT BASE — pixel block clusters ═══ */}
    <rect x="86" y="54" width="4" height="3" fill="#E91E63" opacity="0.2" />
    <rect x="90" y="52" width="3" height="3" fill="#E91E63" opacity="0.18" />
    <rect x="88" y="50" width="3" height="2" fill="#F48FB1" opacity="0.18" />
    <rect x="92" y="54" width="2" height="2" fill="#F48FB1" opacity="0.15" />
    <rect x="84" y="56" width="3" height="2" fill="#E91E63" opacity="0.15" />
    {/* Fan coral on stern */}
    <rect x="134" y="44" width="3" height="3" fill="#6A1B9A" opacity="0.2" />
    <rect x="136" y="42" width="2" height="2" fill="#6A1B9A" opacity="0.18" />
    <rect x="133" y="46" width="2" height="2" fill="#6A1B9A" opacity="0.15" />

    {/* ═══ SCATTERED WRECKAGE ON SEABED ═══ */}
    <rect x="-10" y="68" width="8" height="3" fill="#6D4C41" opacity="0.25" />
    <rect x="-8" y="66" width="4" height="2" fill="#795548" opacity="0.2" />
    <rect x="130" y="66" width="8" height="3" fill="#795548" opacity="0.2" />
    <rect x="132" y="64" width="4" height="2" fill="#6D4C41" opacity="0.18" />
    <rect x="70" y="70" width="8" height="2" fill="#5D4037" opacity="0.2" />
    {/* Barrel on seabed (pixel block) */}
    <rect x="142" y="66" width="8" height="6" fill="#5D4037" opacity="0.3" />
    <rect x="143" y="67" width="6" height="4" fill="#6D4C41" opacity="0.25" />
    <rect x="142" y="68" width="8" height="1" fill="#4B5563" opacity="0.2" />
    <rect x="142" y="70" width="8" height="1" fill="#4B5563" opacity="0.18" />

    {/* ═══ BUBBLES — small animated pixel rects ═══ */}
    <rect x="53" y="29" width="3" height="3" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 3.5s ease-in 0s infinite' }} />
    <rect x="57" y="27" width="2" height="2" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4s ease-in 1.2s infinite' }} />
    <rect x="51" y="33" width="3" height="3" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4.5s ease-in 2s infinite' }} />
    <rect x="55" y="25" width="2" height="2" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5.5s ease-in 3.5s infinite' }} />
    </g>
  </g>
))
SunkenShip.displayName = 'SunkenShip'

// ─── SHIPWRECK: Sunken Sailboat ─────────────────────────────────────

const SunkenSailboat = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Shadow on seabed */}
    <ellipse cx="40" cy="56" rx="90" ry="7" fill="#000" opacity="0.1" />

    {/* Hull — small coastal sailing vessel, slightly listed to starboard */}
    <rect x="-32" y="9" width="144" height="36" fill="#5D4037" />
    <rect x="-25" y="2" width="130" height="11" fill="#6D4C41" />
    <rect x="-18" y="-5" width="115" height="11" fill="#795548" />
    <rect x="-10" y="-9" width="101" height="5" fill="#8D6E63" opacity="0.7" />
    {/* Hull bottom / keel — heavy timber */}
    <rect x="-21" y="45" width="122" height="7" fill="#3E2723" />
    <rect x="-7" y="49" width="94" height="7" fill="#2E1B0E" />
    {/* Hull planking detail — individual strakes */}
    <rect x="-28" y="13" width="137" height="2" fill="#795548" opacity="0.3" />
    <rect x="-25" y="20" width="130" height="2" fill="#8D6E63" opacity="0.25" />
    <rect x="-21" y="27" width="122" height="2" fill="#795548" opacity="0.25" />
    <rect x="-25" y="34" width="130" height="2" fill="#8D6E63" opacity="0.2" />
    <rect x="-21" y="42" width="122" height="2" fill="#795548" opacity="0.18" />
    {/* Caulking lines between planks */}
    <rect x="-18" y="16" width="115" height="1" fill="#3E2723" opacity="0.15" />
    <rect x="-18" y="31" width="115" height="1" fill="#3E2723" opacity="0.12" />

    {/* Bow — clinker-built pointed prow */}
    <rect x="-39" y="13" width="14" height="25" fill="#6D4C41" />
    <rect x="-46" y="20" width="11" height="14" fill="#795548" />
    <rect x="-50" y="24" width="7" height="7" fill="#8D6E63" opacity="0.6" />
    {/* Bow cutwater */}
    <rect x="-50" y="16" width="4" height="22" fill="#5D4037" opacity="0.5" />

    {/* Stern — transom with details */}
    <rect x="105" y="-2" width="18" height="50" fill="#5D4037" />
    <rect x="108" y="-5" width="14" height="7" fill="#6D4C41" />
    <rect x="112" y="-9" width="7" height="5" fill="#795548" opacity="0.7" />
    {/* Stern window */}
    <rect x="112" y="6" width="7" height="7" fill="#0A1628" opacity="0.5" />
    <rect x="112" y="6" width="7" height="2" fill="#8D6E63" opacity="0.3" />
    {/* Rudder — with pintles */}
    <rect x="119" y="16" width="7" height="36" fill="#4E342E" />
    <rect x="123" y="24" width="4" height="25" fill="#3E2723" />
    <rect x="116" y="20" width="4" height="4" fill="#78909C" opacity="0.4" />
    <rect x="116" y="34" width="4" height="4" fill="#78909C" opacity="0.35" />
    {/* Tiller (steering arm) */}
    <rect x="105" y="16" width="14" height="4" fill="#795548" opacity="0.5" />

    {/* Name plate on stern — faded */}
    <rect x="108" y="13" width="14" height="5" fill="#D4A43A" opacity="0.25" />
    <rect x="110" y="15" width="11" height="2" fill="#B8862D" opacity="0.15" />

    {/* Mast — snapped halfway, jagged break */}
    <rect x="26" y="-81" width="7" height="86" fill="#795548" />
    <rect x="28" y="-81" width="4" height="86" fill="#8D6E63" opacity="0.3" />
    {/* Jagged break at top */}
    <rect x="22" y="-88" width="5" height="9" fill="#A1887F" />
    <rect x="29" y="-86" width="4" height="7" fill="#8D6E63" opacity="0.7" />
    <rect x="28" y="-92" width="4" height="5" fill="#A1887F" opacity="0.5" />
    {/* Mast bands (iron hoops) */}
    <rect x="24" y="-45" width="11" height="2" fill="#4B5563" opacity="0.3" />
    <rect x="24" y="-23" width="11" height="2" fill="#4B5563" opacity="0.25" />
    {/* Mast base plate / step */}
    <rect x="18" y="2" width="22" height="4" fill="#5D4037" />
    <rect x="20" y="0" width="18" height="2" fill="#6D4C41" opacity="0.5" />

    {/* Tattered sail — more detailed fabric with folds */}
    <rect x="33" y="-77" width="36" height="50" fill="#D7CCC8" opacity="0.3" />
    <rect x="36" y="-73" width="29" height="43" fill="#EFEBE9" opacity="0.22" />
    {/* Sail seam lines */}
    <rect x="44" y="-73" width="1" height="43" fill="#BCAAA4" opacity="0.15" />
    <rect x="54" y="-73" width="1" height="43" fill="#BCAAA4" opacity="0.12" />
    {/* Sail tears — realistic holes */}
    <rect x="44" y="-63" width="13" height="9" fill="#0A1628" opacity="0.15" />
    <rect x="40" y="-48" width="9" height="7" fill="#0A1628" opacity="0.12" />
    <rect x="51" y="-41" width="7" height="5" fill="#0A1628" opacity="0.1" />
    {/* Tattered edges — hanging threads */}
    <rect x="65" y="-70" width="5" height="9" fill="#BCAAA4" opacity="0.2" />
    <rect x="62" y="-52" width="7" height="7" fill="#D7CCC8" opacity="0.18" />
    <rect x="69" y="-45" width="4" height="9" fill="#BCAAA4" opacity="0.15" />
    <rect x="65" y="-34" width="5" height="5" fill="#D7CCC8" opacity="0.12" />
    {/* Sail billowing edge */}
    <rect x="67" y="-63" width="4" height="14" fill="#EFEBE9" opacity="0.12" />

    {/* Boom (horizontal spar) — broken, dangling */}
    <rect x="29" y="-38" width="47" height="5" fill="#A1887F" />
    <rect x="72" y="-39" width="7" height="5" fill="#8D6E63" opacity="0.6" />
    {/* Broken boom end — splintered */}
    <rect x="76" y="-41" width="4" height="4" fill="#A1887F" opacity="0.4" />
    {/* Gaff (upper spar) remnant */}
    <rect x="29" y="-73" width="29" height="4" fill="#A1887F" opacity="0.5" />
    <rect x="54" y="-75" width="5" height="4" fill="#8D6E63" opacity="0.4" />

    {/* Standing rigging */}
    <rect x="29" y="-81" width="2" height="43" fill="#A08060" opacity="0.35" />
    <rect x="33" y="-77" width="2" height="40" fill="#C4A862" opacity="0.25" />
    {/* Shroud lines to hull sides */}
    <path d="M26 -77 Q8 -20 -7 -5" stroke="#A08060" strokeWidth="0.9" fill="none" opacity="0.2" />
    <path d="M33 -77 Q54 -20 72 -5" stroke="#A08060" strokeWidth="0.9" fill="none" opacity="0.2" />
    {/* Loose rope coil on deck */}
    <rect x="-14" y="2" width="14" height="4" fill="#A08060" opacity="0.35" />
    <rect x="-18" y="6" width="7" height="7" fill="#C4A862" opacity="0.25" />
    <rect x="-7" y="6" width="5" height="5" fill="#A08060" opacity="0.2" />

    {/* Small bow anchor — detailed */}
    <rect x="-43" y="2" width="4" height="25" fill="#4B5563" opacity="0.5" />
    <rect x="-50" y="24" width="18" height="4" fill="#4B5563" opacity="0.4" />
    <rect x="-54" y="24" width="4" height="7" fill="#546E7A" opacity="0.3" />
    <rect x="-33" y="24" width="4" height="7" fill="#546E7A" opacity="0.3" />

    {/* Lantern hanging from mast — corroded brass */}
    <rect x="18" y="-70" width="7" height="11" fill="#FF8F00" opacity="0.25" />
    <rect x="17" y="-73" width="11" height="4" fill="#4B5563" opacity="0.4" />
    <rect x="20" y="-63" width="4" height="5" fill="#4B5563" opacity="0.3" />
    {/* Lantern glass pane hint */}
    <rect x="20" y="-68" width="4" height="5" fill="#FFB300" opacity="0.15" />

    {/* Deck features */}
    {/* Cleat */}
    <rect x="4" y="-2" width="7" height="4" fill="#5D4037" opacity="0.4" />
    {/* Hatch */}
    <rect x="69" y="-2" width="14" height="7" fill="#4E342E" opacity="0.4" />
    <rect x="71" y="0" width="11" height="4" fill="#0A1628" opacity="0.3" />

    {/* Barnacle clusters — extensive */}
    <rect x="-32" y="34" width="7" height="7" fill="#9CA3AF" opacity="0.4" />
    <rect x="-28" y="38" width="4" height="4" fill="#B0BEC5" opacity="0.3" />
    <rect x="72" y="42" width="9" height="5" fill="#9CA3AF" opacity="0.35" />
    <rect x="105" y="31" width="7" height="7" fill="#9CA3AF" opacity="0.35" />
    <rect x="22" y="49" width="7" height="4" fill="#78909C" opacity="0.3" />

    {/* Marine growth — algae and sponge */}
    <rect x="0" y="-5" width="14" height="4" fill="#2E7D32" opacity="0.4" />
    <rect x="54" y="45" width="18" height="4" fill="#388E3C" opacity="0.3" />
    <rect x="26" y="-92" width="7" height="4" fill="#1B5E20" opacity="0.4" />
    <rect x="98" y="45" width="11" height="4" fill="#2E7D32" opacity="0.3" />
    {/* Orange sponge */}
    <rect x="-28" y="42" width="5" height="5" fill="#FF6F00" opacity="0.2" />

    {/* Seaweed growing through hull crack */}
    <rect x="51" y="-16" width="5" height="22" fill="#2E7D32" opacity="0.3" />
    <rect x="47" y="-23" width="9" height="11" fill="#4CAF50" opacity="0.25" />
    <rect x="45" y="-27" width="5" height="5" fill="#81C784" opacity="0.2" />

    {/* Small crab on hull — pixel detail */}
    <rect x="83" y="6" width="9" height="5" fill="#E65100" opacity="0.5" />
    <rect x="81" y="2" width="4" height="4" fill="#BF360C" opacity="0.4" />
    <rect x="92" y="2" width="4" height="4" fill="#BF360C" opacity="0.4" />
    {/* Crab eye dots */}
    <rect x="83" y="3" width="2" height="2" fill="#1A1A1A" opacity="0.3" />
    <rect x="89" y="3" width="2" height="2" fill="#1A1A1A" opacity="0.3" />

    {/* Life ring on deck */}
    <circle cx="90" cy="-2" r="5" fill="none" stroke="#E0E0E0" strokeWidth="2.7" opacity="0.25" />
    <rect x="87" y="-5" width="4" height="2" fill="#D50000" opacity="0.2" />
    <rect x="90" y="2" width="4" height="2" fill="#D50000" opacity="0.2" />

    {/* Coral at waterline */}
    <rect x="-14" y="42" width="7" height="5" fill="#E91E63" opacity="0.2" />

    {/* Bubbles */}
    <circle cx="40" cy="-12" r="1.8" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 4s ease-in 0.5s infinite' }} />
    <circle cx="33" cy="-9" r="1.4" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 5s ease-in 2s infinite' }} />
    <circle cx="54" cy="-23" r="1.1" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5.5s ease-in 3.5s infinite' }} />
  </g>
))
SunkenSailboat.displayName = 'SunkenSailboat'

// ─── MINIMAL: Stacked Stone Cairn ────────────────────────────────────

const StoneCairn = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* ═══ Bottom stone — large, weathered river cobble ═══ */}
    <rect x="0" y="42" width="36" height="14" fill="#78716C" />
    <rect x="2" y="40" width="32" height="4" fill="#8D8680" />
    {/* Bottom stone pixel texture — mineral grain pattern */}
    <rect x="4" y="43" width="2" height="2" fill="#9E9890" opacity="0.35" />
    <rect x="10" y="44" width="3" height="1" fill="#A8A098" opacity="0.3" />
    <rect x="18" y="42" width="2" height="2" fill="#6B6560" opacity="0.25" />
    <rect x="24" y="45" width="3" height="2" fill="#9E9890" opacity="0.3" />
    <rect x="30" y="43" width="2" height="1" fill="#A8A098" opacity="0.25" />
    <rect x="8" y="48" width="4" height="1" fill="#9E9E9E" opacity="0.25" />
    <rect x="16" y="50" width="6" height="1" fill="#9E9E9E" opacity="0.2" />
    <rect x="26" y="48" width="5" height="1" fill="#A8A098" opacity="0.22" />
    {/* Shadow underneath */}
    <rect x="4" y="54" width="28" height="2" fill="#57534E" opacity="0.3" />
    {/* Quartz vein */}
    <rect x="6" y="46" width="1" height="6" fill="#D4D0C8" opacity="0.2" />
    <rect x="7" y="48" width="1" height="3" fill="#E0DCD4" opacity="0.15" />
    {/* Lichen patch on bottom stone */}
    <rect x="0" y="44" width="3" height="3" fill="#B8A030" opacity="0.3" />
    <rect x="1" y="45" width="1" height="1" fill="#D4C050" opacity="0.25" />
    <rect x="32" y="46" width="4" height="3" fill="#90A020" opacity="0.25" />
    <rect x="33" y="47" width="2" height="1" fill="#A8B830" opacity="0.2" />
    {/* Water stain */}
    <rect x="14" y="42" width="2" height="10" fill="#5A5450" opacity="0.12" />

    {/* ═══ Second stone ═══ */}
    <rect x="6" y="30" width="24" height="12" fill="#8D8680" />
    <rect x="8" y="28" width="20" height="4" fill="#A09890" />
    {/* Pixel texture */}
    <rect x="8" y="31" width="2" height="2" fill="#9E9890" opacity="0.3" />
    <rect x="14" y="33" width="3" height="1" fill="#A8A098" opacity="0.25" />
    <rect x="22" y="32" width="2" height="2" fill="#7A7470" opacity="0.2" />
    <rect x="10" y="34" width="12" height="1" fill="#9E9E9E" opacity="0.22" />
    <rect x="18" y="36" width="6" height="1" fill="#A8A098" opacity="0.18" />
    {/* Shadow on stone below */}
    <rect x="6" y="42" width="24" height="1" fill="#5A5450" opacity="0.2" />
    {/* Crack detail */}
    <rect x="16" y="29" width="1" height="8" fill="#5A5450" opacity="0.15" />
    <rect x="17" y="33" width="1" height="4" fill="#5A5450" opacity="0.1" />
    {/* Lichen */}
    <rect x="26" y="34" width="3" height="3" fill="#A0B028" opacity="0.25" />

    {/* ═══ Third stone ═══ */}
    <rect x="10" y="20" width="16" height="10" fill="#9E9890" />
    <rect x="12" y="18" width="12" height="4" fill="#A8A098" />
    {/* Pixel grain */}
    <rect x="12" y="21" width="2" height="1" fill="#B0A898" opacity="0.3" />
    <rect x="18" y="22" width="3" height="2" fill="#8A8480" opacity="0.25" />
    <rect x="14" y="24" width="8" height="1" fill="#B0B0B0" opacity="0.18" />
    {/* Micro-crack */}
    <rect x="20" y="19" width="1" height="6" fill="#7A7470" opacity="0.15" />

    {/* ═══ Fourth stone — small ═══ */}
    <rect x="14" y="12" width="10" height="8" fill="#A8A098" />
    <rect x="15" y="10" width="8" height="4" fill="#B8B0A8" />
    {/* Texture */}
    <rect x="16" y="13" width="2" height="1" fill="#C0B8B0" opacity="0.3" />
    <rect x="20" y="15" width="2" height="1" fill="#908880" opacity="0.2" />
    {/* Shadow under */}
    <rect x="14" y="20" width="10" height="1" fill="#7A7470" opacity="0.15" />

    {/* ═══ Top stone — tiny, balanced ═══ */}
    <rect x="16" y="6" width="6" height="6" fill="#B8B0A8" />
    <rect x="17" y="4" width="4" height="4" fill="#C8C0B8" />
    {/* Highlight pixel */}
    <rect x="18" y="5" width="2" height="1" fill="#D8D0C8" opacity="0.4" />
    {/* Tiny lichen dot */}
    <rect x="20" y="8" width="2" height="2" fill="#C0A820" opacity="0.2" />

    {/* ═══ Moss colonies at base ═══ */}
    <rect x="0" y="54" width="5" height="2" fill="#2E7D32" opacity="0.35" />
    <rect x="1" y="53" width="3" height="2" fill="#4CAF50" opacity="0.25" />
    <rect x="2" y="52" width="2" height="1" fill="#66BB6A" opacity="0.2" />
    <rect x="30" y="52" width="6" height="3" fill="#388E3C" opacity="0.3" />
    <rect x="31" y="51" width="3" height="2" fill="#4CAF50" opacity="0.22" />
    <rect x="34" y="50" width="2" height="1" fill="#66BB6A" opacity="0.18" />
    {/* Moss between stones */}
    <rect x="8" y="40" width="4" height="2" fill="#2E7D32" opacity="0.2" />
    <rect x="20" y="28" width="3" height="2" fill="#1B5E20" opacity="0.18" />

    {/* ═══ Small shells at base ═══ */}
    <rect x="10" y="55" width="2" height="1" fill="#F5F0E8" opacity="0.35" />
    <rect x="11" y="54" width="1" height="1" fill="#E8E0D8" opacity="0.3" />
    <rect x="28" y="54" width="2" height="1" fill="#F0EBE0" opacity="0.3" />

    {/* ═══ Pebble debris around base ═══ */}
    <rect x="-2" y="56" width="3" height="2" fill="#8D8680" opacity="0.35" />
    <rect x="36" y="55" width="3" height="2" fill="#78716C" opacity="0.3" />
    <rect x="-4" y="54" width="2" height="2" fill="#9E9890" opacity="0.25" />
    <rect x="38" y="53" width="2" height="2" fill="#A09890" opacity="0.2" />

    {/* ═══ Bubbles from crevices ═══ */}
    <circle cx="18" cy="42" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 5s ease-in 0s infinite' }} />
    <circle cx="20" cy="44" r="0.8" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5.5s ease-in 2s infinite' }} />
    <circle cx="12" cy="30" r="0.6" fill="rgba(255,255,255,0.12)" style={{ animation: 'bubbleRise 6s ease-in 3.5s infinite' }} />
  </g>
))
StoneCairn.displayName = 'StoneCairn'

// ─── MINIMAL: Bamboo Grove ───────────────────────────────────────────

const BambooGrove = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* ═══ Stalk 1 — tall, mature culm ═══ */}
    <rect x="5" y="-12" width="5" height="72" fill="#558B2F" />
    {/* Inner highlight (light catching one side) */}
    <rect x="6" y="-12" width="2" height="72" fill="#689F38" opacity="0.3" />
    {/* Node rings (joints) — pixel-block detail */}
    <rect x="4" y="-2" width="7" height="3" fill="#689F38" opacity="0.7" />
    <rect x="5" y="-1" width="5" height="1" fill="#7CB342" opacity="0.5" />
    <rect x="4" y="14" width="7" height="3" fill="#689F38" opacity="0.65" />
    <rect x="5" y="15" width="5" height="1" fill="#7CB342" opacity="0.45" />
    <rect x="4" y="30" width="7" height="3" fill="#689F38" opacity="0.6" />
    <rect x="5" y="31" width="5" height="1" fill="#7CB342" opacity="0.4" />
    <rect x="4" y="46" width="7" height="3" fill="#689F38" opacity="0.55" />
    <rect x="5" y="47" width="5" height="1" fill="#7CB342" opacity="0.35" />
    {/* Internode shading (darker between nodes) */}
    <rect x="5" y="6" width="5" height="1" fill="#3E7B1F" opacity="0.15" />
    <rect x="5" y="22" width="5" height="1" fill="#3E7B1F" opacity="0.12" />
    <rect x="5" y="38" width="5" height="1" fill="#3E7B1F" opacity="0.1" />
    {/* Leaf clusters — multiple leaves per node */}
    <g style={{ animation: 'kelpSway 5s ease-in-out 0s infinite', transformOrigin: '8px -10px' }}>
      <ellipse cx="-1" cy="-10" rx="9" ry="2.5" fill="#7CB342" opacity="0.7" />
      <ellipse cx="-3" cy="-8" rx="7" ry="2" fill="#8BC34A" opacity="0.5" />
      {/* Leaf midrib */}
      <rect x="-8" y="-11" width="14" height="0.5" fill="#558B2F" opacity="0.3" />
    </g>
    <g style={{ animation: 'kelpSway 4.5s ease-in-out 0.6s infinite', transformOrigin: '8px -8px' }}>
      <ellipse cx="15" cy="-8" rx="8" ry="2" fill="#8BC34A" opacity="0.6" />
      <ellipse cx="17" cy="-6" rx="6" ry="1.8" fill="#9CCC65" opacity="0.4" />
      <rect x="9" y="-9" width="12" height="0.5" fill="#558B2F" opacity="0.25" />
    </g>
    {/* Node branch bud */}
    <rect x="10" y="14" width="2" height="1" fill="#7CB342" opacity="0.4" />
    <rect x="10" y="30" width="2" height="1" fill="#689F38" opacity="0.35" />

    {/* ═══ Stalk 2 — medium, slightly younger ═══ */}
    <rect x="15" y="2" width="5" height="58" fill="#689F38" />
    <rect x="16" y="2" width="2" height="58" fill="#7CB342" opacity="0.25" />
    {/* Nodes */}
    <rect x="14" y="10" width="7" height="3" fill="#7CB342" opacity="0.65" />
    <rect x="15" y="11" width="5" height="1" fill="#8BC34A" opacity="0.4" />
    <rect x="14" y="26" width="7" height="3" fill="#7CB342" opacity="0.6" />
    <rect x="15" y="27" width="5" height="1" fill="#8BC34A" opacity="0.35" />
    <rect x="14" y="42" width="7" height="3" fill="#7CB342" opacity="0.55" />
    <rect x="15" y="43" width="5" height="1" fill="#8BC34A" opacity="0.3" />
    {/* Leaves */}
    <g style={{ animation: 'kelpSway 5.5s ease-in-out 0.3s infinite', transformOrigin: '18px 4px' }}>
      <ellipse cx="25" cy="4" rx="8" ry="2" fill="#8BC34A" opacity="0.65" />
      <ellipse cx="27" cy="6" rx="6" ry="1.8" fill="#9CCC65" opacity="0.45" />
      <rect x="19" y="3" width="12" height="0.5" fill="#558B2F" opacity="0.25" />
    </g>
    <g style={{ animation: 'kelpSway 4s ease-in-out 0.9s infinite', transformOrigin: '18px 6px' }}>
      <ellipse cx="9" cy="6" rx="7" ry="2" fill="#7CB342" opacity="0.55" />
      <rect x="4" y="5" width="10" height="0.5" fill="#558B2F" opacity="0.2" />
    </g>
    {/* Branch at node */}
    <rect x="20" y="26" width="3" height="1" fill="#689F38" opacity="0.35" />
    <g style={{ animation: 'kelpSway 4.8s ease-in-out 1.2s infinite', transformOrigin: '20px 26px' }}>
      <ellipse cx="26" cy="24" rx="5" ry="1.5" fill="#8BC34A" opacity="0.45" />
    </g>

    {/* ═══ Stalk 3 — short, young shoot ═══ */}
    <rect x="26" y="14" width="4" height="46" fill="#558B2F" />
    <rect x="27" y="14" width="1.5" height="46" fill="#689F38" opacity="0.25" />
    {/* Nodes */}
    <rect x="25" y="22" width="6" height="2" fill="#689F38" opacity="0.6" />
    <rect x="25" y="38" width="6" height="2" fill="#689F38" opacity="0.55" />
    {/* Leaf */}
    <g style={{ animation: 'kelpSway 4.5s ease-in-out 0.5s infinite', transformOrigin: '28px 16px' }}>
      <ellipse cx="35" cy="16" rx="7" ry="2" fill="#7CB342" opacity="0.6" />
      <ellipse cx="37" cy="18" rx="5" ry="1.5" fill="#8BC34A" opacity="0.4" />
      <rect x="30" y="15" width="10" height="0.5" fill="#558B2F" opacity="0.2" />
    </g>

    {/* ═══ Stalk 4 & 5 — background, thinner ═══ */}
    <rect x="11" y="8" width="3" height="52" fill="#4CAF50" opacity="0.5" />
    <rect x="12" y="8" width="1" height="52" fill="#66BB6A" opacity="0.2" />
    <rect x="10" y="20" width="5" height="2" fill="#66BB6A" opacity="0.3" />
    <rect x="10" y="36" width="5" height="2" fill="#66BB6A" opacity="0.25" />

    <rect x="22" y="18" width="3" height="42" fill="#4CAF50" opacity="0.4" />
    <rect x="21" y="28" width="5" height="2" fill="#66BB6A" opacity="0.25" />
    <rect x="21" y="44" width="5" height="2" fill="#66BB6A" opacity="0.2" />

    {/* ═══ Root system at base ═══ */}
    <rect x="3" y="58" width="8" height="2" fill="#3E7B1F" opacity="0.35" />
    <rect x="2" y="56" width="3" height="3" fill="#558B2F" opacity="0.25" />
    <rect x="14" y="58" width="6" height="2" fill="#3E7B1F" opacity="0.3" />
    <rect x="25" y="58" width="5" height="2" fill="#3E7B1F" opacity="0.25" />

    {/* ═══ Fallen leaves on sand ═══ */}
    <ellipse cx="0" cy="59" rx="3" ry="0.8" fill="#8BC34A" opacity="0.25" transform="rotate(-15 0 59)" />
    <ellipse cx="34" cy="58" rx="2.5" ry="0.7" fill="#7CB342" opacity="0.2" transform="rotate(20 34 58)" />

    {/* ═══ Small fern understory ═══ */}
    <g style={{ animation: 'kelpSway 6s ease-in-out 1s infinite', transformOrigin: '0px 58px' }}>
      <ellipse cx="-3" cy="54" rx="4" ry="1.5" fill="#388E3C" opacity="0.35" transform="rotate(-25 -3 54)" />
      <ellipse cx="-1" cy="52" rx="3.5" ry="1.2" fill="#43A047" opacity="0.3" transform="rotate(-35 -1 52)" />
    </g>
    <g style={{ animation: 'kelpSway 5.5s ease-in-out 0.7s infinite', transformOrigin: '36px 58px' }}>
      <ellipse cx="38" cy="54" rx="3.5" ry="1.3" fill="#388E3C" opacity="0.3" transform="rotate(20 38 54)" />
    </g>

    {/* ═══ Algae on lower stalks ═══ */}
    <rect x="5" y="52" width="5" height="3" fill="#1B5E20" opacity="0.2" />
    <rect x="15" y="54" width="5" height="2" fill="#2E7D32" opacity="0.18" />
  </g>
))
BambooGrove.displayName = 'BambooGrove'

// ═══════════════════════════════════════════════════════════════════════
// NEW THEME STRUCTURES — Each serves as the focal point of its own theme
// ═══════════════════════════════════════════════════════════════════════

// ─── CASTLE THEME: Sunken Medieval Castle ────────────────────────────

const SunkenCastle = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Main keep — tall central donjon */}
    <rect x="28" y="-22" width="44" height="82" fill="#5E5E5E" />
    <rect x="30" y="-22" width="40" height="82" fill="#6B6B6B" />
    <rect x="28" y="-26" width="44" height="6" fill="#7A7A7A" />
    {/* Keep stone block pattern */}
    {[-18, -8, 2, 12, 22, 32, 42].map((sy, i) => (
      <g key={`keep-row-${i}`}>
        <rect x="30" y={sy} width="40" height="1" fill={i % 2 ? '#5A5A5A' : '#8A8A8A'} opacity={0.25 - i * 0.01} />
        <rect x={32 + (i % 3) * 12} y={sy - 4} width="1" height="8" fill="#5A5A5A" opacity={0.15} />
        <rect x={44 + (i % 2) * 10} y={sy - 4} width="1" height="8" fill="#5A5A5A" opacity={0.12} />
      </g>
    ))}
    {/* Battlements on main keep — crenellations */}
    <rect x="28" y="-32" width="8" height="8" fill="#7A7A7A" />
    <rect x="40" y="-32" width="8" height="8" fill="#7A7A7A" />
    <rect x="52" y="-32" width="8" height="8" fill="#7A7A7A" />
    <rect x="64" y="-32" width="8" height="8" fill="#7A7A7A" />
    {/* Merlon caps */}
    <rect x="28" y="-34" width="8" height="2" fill="#8A8A8A" opacity="0.4" />
    <rect x="40" y="-34" width="8" height="2" fill="#8A8A8A" opacity="0.4" />
    <rect x="52" y="-34" width="8" height="2" fill="#8A8A8A" opacity="0.4" />
    <rect x="64" y="-34" width="8" height="2" fill="#8A8A8A" opacity="0.4" />
    {/* Keep windows — arched Gothic style */}
    <rect x="38" y="-16" width="6" height="10" fill="#0A0A1E" opacity="0.8" />
    <rect x="38" y="-18" width="6" height="3" fill="#2A2A3E" opacity="0.6" />
    <rect x="40" y="-19" width="2" height="1" fill="#3A3A4E" opacity="0.4" />
    <rect x="50" y="-16" width="6" height="10" fill="#0A0A1E" opacity="0.8" />
    <rect x="50" y="-18" width="6" height="3" fill="#2A2A3E" opacity="0.6" />
    <rect x="52" y="-19" width="2" height="1" fill="#3A3A4E" opacity="0.4" />
    {/* Main entrance */}
    <rect x="42" y="4" width="14" height="18" fill="#0A0A1E" opacity="0.75" />
    <rect x="44" y="2" width="10" height="3" fill="#5A5A5A" />
    <rect x="46" y="0" width="6" height="2" fill="#6B6B6B" opacity="0.6" />
    {/* Keep banner bracket */}
    <rect x="60" y="-14" width="6" height="2" fill="#4B5563" opacity="0.3" />
    <rect x="64" y="-16" width="2" height="4" fill="#4B5563" opacity="0.25" />

    {/* Left tower — round drum tower */}
    <rect x="2" y="-8" width="28" height="68" fill="#555555" />
    <rect x="4" y="-8" width="24" height="68" fill="#5E5E5E" />
    <rect x="0" y="-12" width="32" height="6" fill="#6E6E6E" />
    {/* Left tower battlements */}
    <rect x="0" y="-18" width="6" height="8" fill="#6E6E6E" />
    <rect x="10" y="-18" width="6" height="8" fill="#6E6E6E" />
    <rect x="20" y="-18" width="6" height="8" fill="#6E6E6E" />
    <rect x="0" y="-20" width="6" height="2" fill="#7A7A7A" opacity="0.35" />
    <rect x="10" y="-20" width="6" height="2" fill="#7A7A7A" opacity="0.35" />
    <rect x="20" y="-20" width="6" height="2" fill="#7A7A7A" opacity="0.35" />
    {/* Left tower arrow slits */}
    <rect x="12" y="-2" width="3" height="8" fill="#0A0A1E" opacity="0.7" />
    <rect x="13" y="-4" width="1" height="2" fill="#1A1A2E" opacity="0.5" />
    <rect x="12" y="18" width="3" height="8" fill="#0A0A1E" opacity="0.6" />
    <rect x="13" y="16" width="1" height="2" fill="#1A1A2E" opacity="0.4" />
    <rect x="12" y="36" width="3" height="6" fill="#0A0A1E" opacity="0.5" />
    {/* Left tower stone texture */}
    <rect x="4" y="4" width="24" height="1" fill="#7A7A7A" opacity="0.2" />
    <rect x="4" y="14" width="24" height="1" fill="#505050" opacity="0.2" />
    <rect x="4" y="24" width="24" height="1" fill="#7A7A7A" opacity="0.18" />
    <rect x="4" y="34" width="24" height="1" fill="#505050" opacity="0.15" />

    {/* Right tower — tallest, partially collapsed */}
    <rect x="68" y="-14" width="26" height="74" fill="#555555" />
    <rect x="70" y="-14" width="22" height="74" fill="#5E5E5E" />
    <rect x="66" y="-18" width="30" height="6" fill="#6E6E6E" />
    {/* Right tower battlements (some broken/missing) */}
    <rect x="66" y="-24" width="6" height="8" fill="#6E6E6E" />
    <rect x="76" y="-24" width="6" height="8" fill="#6E6E6E" />
    {/* Broken merlon — jagged */}
    <rect x="86" y="-22" width="6" height="5" fill="#6E6E6E" opacity="0.5" />
    <rect x="88" y="-22" width="2" height="3" fill="#7A7A7A" opacity="0.35" />
    {/* Collapsed upper corner — dramatic rubble cascade */}
    <rect x="90" y="16" width="8" height="16" fill="#7A7A7A" opacity="0.45" />
    <rect x="92" y="32" width="6" height="10" fill="#6B6B6B" opacity="0.35" />
    <rect x="96" y="24" width="4" height="8" fill="#8A8A8A" opacity="0.3" />
    {/* Crack running down from collapse */}
    <rect x="90" y="-4" width="1" height="20" fill="#3A3A3A" opacity="0.4" />
    <rect x="91" y="4" width="1" height="12" fill="#3A3A3A" opacity="0.3" />
    {/* Right tower window */}
    <rect x="76" y="-6" width="5" height="8" fill="#0A0A1E" opacity="0.7" />
    <rect x="76" y="-8" width="5" height="3" fill="#2A2A3E" opacity="0.5" />
    <rect x="76" y="14" width="5" height="6" fill="#0A0A1E" opacity="0.6" />

    {/* Curtain wall connecting towers */}
    <rect x="-2" y="44" width="104" height="16" fill="#4E4E4E" />
    <rect x="0" y="38" width="100" height="8" fill="#5A5A5A" />
    <rect x="2" y="34" width="96" height="6" fill="#646464" />
    {/* Wall walk (rampart) */}
    <rect x="2" y="32" width="96" height="3" fill="#6E6E6E" opacity="0.5" />
    {/* Wall stone block texture */}
    <rect x="4" y="40" width="92" height="1" fill="#7A7A7A" opacity="0.2" />
    <rect x="2" y="48" width="96" height="1" fill="#7A7A7A" opacity="0.15" />
    {/* Wall arrow slits */}
    <rect x="16" y="38" width="2" height="5" fill="#0A0A1E" opacity="0.4" />
    <rect x="78" y="38" width="2" height="5" fill="#0A0A1E" opacity="0.4" />

    {/* Gate (portcullis) — main entrance */}
    <rect x="38" y="28" width="22" height="26" fill="#0A0A1E" opacity="0.85" />
    <rect x="40" y="26" width="18" height="4" fill="#4A4A4A" />
    <rect x="42" y="24" width="14" height="3" fill="#5A5A5A" opacity="0.7" />
    <rect x="46" y="22" width="6" height="2" fill="#6E6E6E" opacity="0.5" />
    {/* Portcullis iron grate */}
    <rect x="41" y="30" width="1" height="22" fill="#4A4A4A" opacity="0.55" />
    <rect x="45" y="30" width="1" height="22" fill="#4A4A4A" opacity="0.55" />
    <rect x="49" y="30" width="1" height="22" fill="#4A4A4A" opacity="0.55" />
    <rect x="53" y="30" width="1" height="22" fill="#4A4A4A" opacity="0.55" />
    <rect x="57" y="30" width="1" height="22" fill="#4A4A4A" opacity="0.55" />
    {/* Horizontal bars */}
    <rect x="40" y="36" width="18" height="1" fill="#4A4A4A" opacity="0.4" />
    <rect x="40" y="42" width="18" height="1" fill="#4A4A4A" opacity="0.35" />
    <rect x="40" y="48" width="18" height="1" fill="#4A4A4A" opacity="0.3" />

    {/* Moss and algae — extensive underwater colonization */}
    <rect x="4" y="36" width="10" height="3" fill="#2E7D32" opacity="0.4" />
    <rect x="2" y="38" width="4" height="2" fill="#4CAF50" opacity="0.3" />
    <rect x="72" y="40" width="12" height="3" fill="#388E3C" opacity="0.35" />
    <rect x="30" y="-20" width="8" height="3" fill="#1B5E20" opacity="0.4" />
    <rect x="80" y="-16" width="10" height="3" fill="#2E7D32" opacity="0.3" />
    <rect x="8" y="52" width="14" height="3" fill="#2E7D32" opacity="0.3" />
    <rect x="56" y="52" width="10" height="2" fill="#388E3C" opacity="0.25" />
    {/* Moss dripping down walls */}
    <rect x="6" y="38" width="3" height="8" fill="#1B5E20" opacity="0.25" />
    <rect x="84" y="40" width="3" height="6" fill="#2E7D32" opacity="0.2" />

    {/* Barnacle colonies */}
    <rect x="0" y="48" width="4" height="4" fill="#9CA3AF" opacity="0.4" />
    <rect x="2" y="50" width="2" height="2" fill="#B0BEC5" opacity="0.3" />
    <rect x="92" y="50" width="5" height="4" fill="#9CA3AF" opacity="0.35" />
    <rect x="34" y="46" width="4" height="3" fill="#78909C" opacity="0.3" />
    <rect x="62" y="48" width="3" height="3" fill="#9CA3AF" opacity="0.3" />

    {/* Coral growth on tower bases */}
    <rect x="-2" y="28" width="6" height="8" fill="#C2185B" opacity="0.3" />
    <rect x="0" y="26" width="3" height="3" fill="#F48FB1" opacity="0.2" />
    <rect x="94" y="8" width="5" height="6" fill="#FF5722" opacity="0.25" />
    <rect x="96" y="6" width="3" height="3" fill="#FF8A65" opacity="0.2" />

    {/* Fallen masonry / rubble field */}
    <rect x="-8" y="54" width="10" height="5" fill="#7A7A7A" opacity="0.5" />
    <rect x="-6" y="52" width="6" height="3" fill="#8A8A8A" opacity="0.4" />
    <rect x="100" y="46" width="8" height="8" fill="#6B6B6B" opacity="0.45" />
    <rect x="96" y="54" width="12" height="5" fill="#7A7A7A" opacity="0.4" />
    <rect x="104" y="50" width="4" height="4" fill="#8A8A8A" opacity="0.35" />
    {/* Scattered stones */}
    <rect x="-10" y="58" width="4" height="3" fill="#6B6B6B" opacity="0.3" />
    <rect x="108" y="54" width="3" height="3" fill="#7A7A7A" opacity="0.25" />

    {/* Flag pole stub on main keep */}
    <rect x="48" y="-38" width="2" height="8" fill="#4B5563" opacity="0.4" />
    <rect x="48" y="-40" width="6" height="3" fill="#546E7A" opacity="0.3" />

    {/* Torch bracket on wall */}
    <rect x="22" y="36" width="4" height="2" fill="#5D4037" opacity="0.3" />
    <rect x="24" y="32" width="2" height="4" fill="#5D4037" opacity="0.25" />

    {/* Bubbles from interior — through gate and windows */}
    <circle cx="48" cy="-32" r="1.5" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 4s ease-in 0s infinite' }} />
    <circle cx="78" cy="-22" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 5s ease-in 1.5s infinite' }} />
    <circle cx="14" cy="-16" r="1.2" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4.5s ease-in 3s infinite' }} />
    <circle cx="49" cy="26" r="0.8" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5.5s ease-in 4s infinite' }} />
  </g>
))
SunkenCastle.displayName = 'SunkenCastle'

// ─── CASTLE THEME: Castle Drawbridge Ruins ───────────────────────────

const CastleDrawbridge = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Left gate tower */}
    <rect x="-2" y="8" width="18" height="52" fill="#5E5E5E" />
    <rect x="0" y="8" width="14" height="52" fill="#6B6B6B" />
    <rect x="-4" y="4" width="22" height="6" fill="#7A7A7A" />
    {/* Left tower battlements */}
    <rect x="-4" y="-2" width="6" height="8" fill="#7A7A7A" />
    <rect x="6" y="-2" width="6" height="8" fill="#7A7A7A" />
    <rect x="-4" y="-4" width="6" height="2" fill="#8A8A8A" opacity="0.35" />
    <rect x="6" y="-4" width="6" height="2" fill="#8A8A8A" opacity="0.35" />
    {/* Left tower arrow slit */}
    <rect x="5" y="18" width="2" height="6" fill="#0A0A1E" opacity="0.6" />
    <rect x="5" y="32" width="2" height="6" fill="#0A0A1E" opacity="0.5" />
    {/* Stone texture */}
    <rect x="0" y="16" width="14" height="1" fill="#7A7A7A" opacity="0.2" />
    <rect x="0" y="28" width="14" height="1" fill="#5A5A5A" opacity="0.2" />
    <rect x="0" y="40" width="14" height="1" fill="#7A7A7A" opacity="0.18" />
    {/* Torch bracket with faded glow */}
    <rect x="12" y="14" width="6" height="2" fill="#5D4037" opacity="0.4" />
    <rect x="16" y="10" width="2" height="6" fill="#5D4037" opacity="0.35" />
    <rect x="15" y="8" width="4" height="3" fill="#FF8F00" opacity="0.2" />

    {/* Right gate tower */}
    <rect x="54" y="8" width="18" height="52" fill="#5E5E5E" />
    <rect x="56" y="8" width="14" height="52" fill="#6B6B6B" />
    <rect x="52" y="4" width="22" height="6" fill="#7A7A7A" />
    {/* Right tower battlements */}
    <rect x="58" y="-2" width="6" height="8" fill="#7A7A7A" />
    <rect x="68" y="-2" width="6" height="8" fill="#7A7A7A" />
    <rect x="58" y="-4" width="6" height="2" fill="#8A8A8A" opacity="0.35" />
    <rect x="68" y="-4" width="6" height="2" fill="#8A8A8A" opacity="0.35" />
    {/* Right tower arrow slit */}
    <rect x="63" y="18" width="2" height="6" fill="#0A0A1E" opacity="0.6" />
    {/* Right stone texture */}
    <rect x="56" y="16" width="14" height="1" fill="#7A7A7A" opacity="0.2" />
    <rect x="56" y="28" width="14" height="1" fill="#5A5A5A" opacity="0.2" />
    <rect x="56" y="40" width="14" height="1" fill="#7A7A7A" opacity="0.18" />

    {/* Gate arch between towers */}
    <rect x="12" y="4" width="46" height="6" fill="#5A5A5A" />
    <rect x="14" y="2" width="42" height="3" fill="#6B6B6B" opacity="0.6" />
    {/* Arch stones (voussoirs) */}
    <rect x="20" y="2" width="1" height="5" fill="#505050" opacity="0.2" />
    <rect x="30" y="2" width="1" height="5" fill="#505050" opacity="0.2" />
    <rect x="40" y="2" width="1" height="5" fill="#505050" opacity="0.2" />
    <rect x="50" y="2" width="1" height="5" fill="#505050" opacity="0.2" />

    {/* Fallen drawbridge — massive oak planks */}
    <rect x="8" y="34" width="54" height="8" fill="#4E342E" />
    <rect x="10" y="32" width="50" height="4" fill="#5D4037" />
    <rect x="12" y="30" width="46" height="3" fill="#6D4C41" opacity="0.8" />
    {/* Plank grain lines */}
    <rect x="16" y="32" width="1" height="8" fill="#3E2723" opacity="0.35" />
    <rect x="22" y="32" width="1" height="8" fill="#3E2723" opacity="0.35" />
    <rect x="28" y="32" width="1" height="8" fill="#3E2723" opacity="0.35" />
    <rect x="34" y="32" width="1" height="8" fill="#3E2723" opacity="0.35" />
    <rect x="40" y="32" width="1" height="8" fill="#3E2723" opacity="0.35" />
    <rect x="46" y="32" width="1" height="8" fill="#3E2723" opacity="0.35" />
    <rect x="52" y="32" width="1" height="8" fill="#3E2723" opacity="0.35" />
    {/* Iron studs on drawbridge */}
    <circle cx="19" cy="36" r="0.8" fill="#4B5563" opacity="0.35" />
    <circle cx="31" cy="36" r="0.8" fill="#4B5563" opacity="0.35" />
    <circle cx="43" cy="36" r="0.8" fill="#4B5563" opacity="0.35" />
    {/* Iron edge band */}
    <rect x="8" y="34" width="54" height="1" fill="#4B5563" opacity="0.3" />
    <rect x="8" y="41" width="54" height="1" fill="#4B5563" opacity="0.25" />

    {/* Chains — heavy forged links */}
    <rect x="10" y="24" width="4" height="8" fill="#607D8B" opacity="0.6" />
    <rect x="12" y="22" width="2" height="4" fill="#78909C" opacity="0.5" />
    <rect x="11" y="20" width="3" height="2" fill="#90A4AE" opacity="0.4" />
    <rect x="56" y="24" width="4" height="8" fill="#607D8B" opacity="0.55" />
    <rect x="58" y="22" width="2" height="4" fill="#78909C" opacity="0.45" />
    {/* Chain link detail */}
    <circle cx="12" cy="26" r="1.5" fill="none" stroke="#546E7A" strokeWidth="0.5" opacity="0.3" />
    <circle cx="58" cy="28" r="1.5" fill="none" stroke="#546E7A" strokeWidth="0.5" opacity="0.25" />

    {/* Moss and algae — heavy growth */}
    <rect x="-2" y="54" width="8" height="3" fill="#2E7D32" opacity="0.4" />
    <rect x="-4" y="56" width="4" height="2" fill="#388E3C" opacity="0.3" />
    <rect x="62" y="54" width="10" height="3" fill="#388E3C" opacity="0.35" />
    <rect x="22" y="40" width="6" height="2" fill="#1B5E20" opacity="0.3" />
    <rect x="42" y="40" width="4" height="2" fill="#2E7D32" opacity="0.25" />
    {/* Moss draping */}
    <rect x="0" y="48" width="3" height="6" fill="#1B5E20" opacity="0.2" />

    {/* Barnacles */}
    <rect x="0" y="50" width="4" height="4" fill="#9CA3AF" opacity="0.35" />
    <rect x="66" y="52" width="3" height="3" fill="#9CA3AF" opacity="0.3" />
    <rect x="30" y="42" width="3" height="2" fill="#78909C" opacity="0.25" />

    {/* Fallen stone blocks */}
    <rect x="-6" y="58" width="6" height="3" fill="#7A7A7A" opacity="0.35" />
    <rect x="72" y="56" width="4" height="4" fill="#6B6B6B" opacity="0.3" />

    {/* Coral at base */}
    <rect x="68" y="48" width="4" height="4" fill="#E91E63" opacity="0.2" />

    {/* Bubbles */}
    <circle cx="35" cy="28" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4s ease-in 1s infinite' }} />
    <circle cx="38" cy="26" r="0.7" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5s ease-in 2.5s infinite' }} />
  </g>
))
CastleDrawbridge.displayName = 'CastleDrawbridge'

// ─── PYRAMID THEME: Sunken Egyptian Pyramid ──────────────────────────

const SunkenPyramid = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Pyramid body — stepped mastaba layers with individual block feel */}
    <rect x="0" y="48" width="120" height="12" fill="#A67B0A" />
    <rect x="2" y="48" width="116" height="12" fill="#B8860B" />
    <rect x="8" y="38" width="104" height="12" fill="#C49A1A" />
    <rect x="16" y="28" width="88" height="12" fill="#D4A82A" />
    <rect x="24" y="18" width="72" height="12" fill="#D4B03A" />
    <rect x="32" y="8" width="56" height="12" fill="#DEB84A" />
    <rect x="40" y="0" width="40" height="10" fill="#E8C45A" />
    <rect x="48" y="-6" width="24" height="8" fill="#F0D070" />
    <rect x="54" y="-12" width="12" height="8" fill="#F8D880" />
    {/* Step shadows (each tier casts shadow on tier below) */}
    <rect x="0" y="48" width="120" height="2" fill="#8B7355" opacity="0.25" />
    <rect x="8" y="38" width="104" height="2" fill="#8B7355" opacity="0.22" />
    <rect x="16" y="28" width="88" height="2" fill="#8B7355" opacity="0.2" />
    <rect x="24" y="18" width="72" height="2" fill="#8B7355" opacity="0.18" />
    <rect x="32" y="8" width="56" height="2" fill="#8B7355" opacity="0.15" />
    <rect x="40" y="0" width="40" height="2" fill="#8B7355" opacity="0.12" />
    {/* Step edge highlights */}
    <rect x="8" y="38" width="104" height="1" fill="#E8C45A" opacity="0.2" />
    <rect x="16" y="28" width="88" height="1" fill="#E8C45A" opacity="0.18" />
    <rect x="24" y="18" width="72" height="1" fill="#E8C45A" opacity="0.15" />
    <rect x="32" y="8" width="56" height="1" fill="#E8C45A" opacity="0.12" />

    {/* Capstone (pyramidion) — golden */}
    <rect x="56" y="-16" width="8" height="6" fill="#FFD54F" />
    <rect x="57" y="-18" width="6" height="4" fill="#FFE082" />
    <rect x="58" y="-20" width="4" height="3" fill="#FFF59D" opacity="0.8" />
    {/* Sun gleam on capstone */}
    <rect x="59" y="-19" width="2" height="1" fill="#FFFFFF" opacity="0.3" />

    {/* Stone block grid — vertical mortar lines */}
    {[48, 38, 28, 18, 8, 0, -6].map((ty, i) => {
      const blockWidth = Math.max(6, 14 - i * 1.5)
      const startX = i * 8
      const rowWidth = 120 - i * 16
      const count = Math.max(2, Math.floor(rowWidth / blockWidth))
      return (
        <g key={`row-${i}`}>
          {Array.from({ length: count }, (_, j) => (
            <rect key={`block-${i}-${j}`} x={startX + j * (rowWidth / count)} y={ty + 3} width="1" height={i < 4 ? 8 : 6} fill="#8B7355" opacity={0.18 + i * 0.02} />
          ))}
        </g>
      )
    })}

    {/* Entrance — dramatic dark corridor */}
    <rect x="48" y="32" width="22" height="28" fill="#0A0A1E" opacity="0.9" />
    {/* Entrance lintel — massive stone beam */}
    <rect x="46" y="28" width="26" height="6" fill="#B8860B" />
    <rect x="48" y="26" width="22" height="3" fill="#C49A1A" />
    {/* Lintel hieroglyphs — Eye of Horus, ankh, scarab motifs */}
    <rect x="49" y="29" width="2" height="2" fill="#FFD54F" opacity="0.5" />
    <rect x="53" y="29" width="3" height="2" fill="#FFD54F" opacity="0.5" />
    <rect x="58" y="29" width="2" height="2" fill="#FFD54F" opacity="0.5" />
    <rect x="62" y="29" width="3" height="2" fill="#FFD54F" opacity="0.5" />
    <rect x="67" y="29" width="2" height="2" fill="#FFD54F" opacity="0.5" />
    {/* Entrance frame columns */}
    <rect x="48" y="32" width="3" height="26" fill="#C49A1A" opacity="0.5" />
    <rect x="67" y="32" width="3" height="26" fill="#C49A1A" opacity="0.5" />
    {/* Hieroglyph column on entrance pillars */}
    <rect x="49" y="36" width="1" height="3" fill="#FFD54F" opacity="0.3" />
    <rect x="49" y="42" width="1" height="3" fill="#FFD54F" opacity="0.25" />
    <rect x="49" y="48" width="1" height="3" fill="#FFD54F" opacity="0.2" />
    <rect x="68" y="36" width="1" height="3" fill="#FFD54F" opacity="0.3" />
    <rect x="68" y="42" width="1" height="3" fill="#FFD54F" opacity="0.25" />

    {/* Sand drift against base — windswept accumulation */}
    <rect x="-6" y="56" width="34" height="6" fill="#C4A862" opacity="0.5" />
    <rect x="-4" y="58" width="20" height="4" fill="#D4B872" opacity="0.35" />
    <rect x="94" y="56" width="30" height="5" fill="#C4A862" opacity="0.4" />
    <rect x="100" y="58" width="16" height="3" fill="#D4B872" opacity="0.3" />

    {/* Erosion and weathering — centuries of decay */}
    <rect x="18" y="42" width="8" height="5" fill="#A07820" opacity="0.35" />
    <rect x="20" y="44" width="4" height="2" fill="#8B7355" opacity="0.25" />
    <rect x="88" y="32" width="10" height="5" fill="#A07820" opacity="0.3" />
    <rect x="12" y="50" width="6" height="4" fill="#8B7355" opacity="0.35" />
    <rect x="100" y="42" width="6" height="4" fill="#A07820" opacity="0.25" />
    {/* Missing blocks — dark gaps */}
    <rect x="28" y="44" width="4" height="3" fill="#6B5B35" opacity="0.3" />
    <rect x="82" y="34" width="3" height="4" fill="#6B5B35" opacity="0.25" />

    {/* Algae growth — aquatic colonization */}
    <rect x="2" y="52" width="10" height="3" fill="#2E7D32" opacity="0.35" />
    <rect x="4" y="54" width="4" height="2" fill="#4CAF50" opacity="0.25" />
    <rect x="98" y="48" width="12" height="3" fill="#388E3C" opacity="0.3" />
    <rect x="44" y="54" width="8" height="2" fill="#1B5E20" opacity="0.3" />
    <rect x="72" y="52" width="6" height="2" fill="#2E7D32" opacity="0.25" />

    {/* Coral encrustation at base */}
    <rect x="108" y="44" width="10" height="8" fill="#E91E63" opacity="0.25" />
    <rect x="110" y="42" width="4" height="3" fill="#F48FB1" opacity="0.2" />
    <rect x="-4" y="48" width="8" height="6" fill="#FF5722" opacity="0.22" />
    <rect x="-2" y="46" width="4" height="3" fill="#FF8A65" opacity="0.18" />

    {/* Fallen stone block on sand */}
    <rect x="-8" y="54" width="8" height="5" fill="#C49A1A" opacity="0.35" />
    <rect x="118" y="52" width="6" height="4" fill="#B8860B" opacity="0.3" />

    {/* Barnacles */}
    <rect x="6" y="56" width="4" height="3" fill="#9CA3AF" opacity="0.3" />
    <rect x="110" y="52" width="3" height="3" fill="#9CA3AF" opacity="0.25" />

    {/* Bubbles from entrance — mysterious */}
    <circle cx="58" cy="26" r="1.5" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 4s ease-in 0s infinite' }} />
    <circle cx="62" cy="28" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 5s ease-in 2s infinite' }} />
    <circle cx="56" cy="30" r="0.8" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5.5s ease-in 3.5s infinite' }} />
  </g>
))
SunkenPyramid.displayName = 'SunkenPyramid'

// ─── PYRAMID THEME: Sphinx Statue ────────────────────────────────────

const SunkenSphinx = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Body — massive recumbent lion shape with layered depth */}
    <rect x="8" y="24" width="66" height="22" fill="#B8860B" />
    <rect x="10" y="24" width="62" height="20" fill="#C49A1A" />
    <rect x="8" y="18" width="66" height="8" fill="#D4A82A" />
    <rect x="12" y="14" width="58" height="6" fill="#D4B03A" />
    {/* Back haunches */}
    <rect x="52" y="10" width="22" height="8" fill="#C49A1A" opacity="0.65" />
    <rect x="56" y="8" width="14" height="4" fill="#D4A82A" opacity="0.5" />
    {/* Tail curling along back */}
    <rect x="68" y="12" width="8" height="3" fill="#C49A1A" opacity="0.4" />
    <rect x="74" y="10" width="4" height="3" fill="#D4A82A" opacity="0.3" />
    {/* Body stone block lines */}
    <rect x="12" y="22" width="58" height="1" fill="#A07820" opacity="0.2" />
    <rect x="10" y="30" width="62" height="1" fill="#A07820" opacity="0.18" />
    <rect x="10" y="38" width="62" height="1" fill="#A07820" opacity="0.15" />

    {/* Front paws — extended, with toes carved */}
    <rect x="-2" y="34" width="18" height="12" fill="#DEB84A" />
    <rect x="-6" y="38" width="10" height="8" fill="#D4A82A" />
    {/* Left paw toes */}
    <rect x="-6" y="44" width="3" height="2" fill="#C49A1A" opacity="0.5" />
    <rect x="-2" y="44" width="3" height="2" fill="#C49A1A" opacity="0.5" />
    <rect x="2" y="44" width="3" height="2" fill="#C49A1A" opacity="0.5" />
    {/* Right paw */}
    <rect x="58" y="34" width="18" height="12" fill="#DEB84A" />
    <rect x="70" y="38" width="10" height="8" fill="#D4A82A" />
    {/* Right paw toes */}
    <rect x="70" y="44" width="3" height="2" fill="#C49A1A" opacity="0.5" />
    <rect x="74" y="44" width="3" height="2" fill="#C49A1A" opacity="0.5" />
    <rect x="78" y="44" width="3" height="2" fill="#C49A1A" opacity="0.5" />

    {/* Head — human face, detailed pharaonic sculpture */}
    <rect x="-2" y="2" width="22" height="22" fill="#D4B03A" />
    <rect x="0" y="2" width="18" height="20" fill="#DEB84A" />
    <rect x="-4" y="-2" width="26" height="6" fill="#E8C45A" />
    {/* Headdress (nemes) — striped */}
    <rect x="-6" y="-6" width="30" height="6" fill="#1565C0" opacity="0.5" />
    <rect x="-4" y="-6" width="26" height="1" fill="#FFD54F" opacity="0.3" />
    <rect x="-4" y="-4" width="26" height="1" fill="#FFD54F" opacity="0.25" />
    {/* Nemes side flaps */}
    <rect x="-8" y="-4" width="4" height="20" fill="#1565C0" opacity="0.4" />
    <rect x="-8" y="0" width="4" height="1" fill="#FFD54F" opacity="0.2" />
    <rect x="-8" y="4" width="4" height="1" fill="#FFD54F" opacity="0.18" />
    <rect x="-8" y="8" width="4" height="1" fill="#FFD54F" opacity="0.15" />
    <rect x="22" y="-4" width="4" height="20" fill="#1565C0" opacity="0.4" />
    <rect x="22" y="0" width="4" height="1" fill="#FFD54F" opacity="0.2" />
    <rect x="22" y="4" width="4" height="1" fill="#FFD54F" opacity="0.18" />
    <rect x="22" y="8" width="4" height="1" fill="#FFD54F" opacity="0.15" />
    {/* Uraeus (cobra) on forehead */}
    <rect x="7" y="-8" width="4" height="4" fill="#FFD54F" opacity="0.5" />
    <rect x="8" y="-10" width="2" height="3" fill="#FFD54F" opacity="0.4" />

    {/* Eyes — deep-set with eyeliner */}
    <rect x="3" y="6" width="5" height="4" fill="#1A1A2E" opacity="0.75" />
    <rect x="11" y="6" width="5" height="4" fill="#1A1A2E" opacity="0.75" />
    {/* Eyeliner marks */}
    <rect x="2" y="8" width="1" height="1" fill="#1A1A2E" opacity="0.4" />
    <rect x="8" y="8" width="1" height="1" fill="#1A1A2E" opacity="0.4" />
    <rect x="16" y="8" width="1" height="1" fill="#1A1A2E" opacity="0.4" />
    {/* Nose — famously broken */}
    <rect x="8" y="12" width="3" height="3" fill="#C49A1A" />
    <rect x="9" y="11" width="2" height="1" fill="#D4A82A" opacity="0.4" />
    {/* Missing chunk of nose */}
    <rect x="10" y="13" width="2" height="2" fill="#B8860B" opacity="0.3" />
    {/* Mouth — serene expression */}
    <rect x="5" y="18" width="10" height="2" fill="#B8860B" opacity="0.5" />
    <rect x="6" y="17" width="8" height="1" fill="#D4A82A" opacity="0.3" />
    {/* Chin/beard bracket */}
    <rect x="7" y="20" width="4" height="4" fill="#C49A1A" opacity="0.4" />
    <rect x="8" y="24" width="2" height="2" fill="#B8860B" opacity="0.3" />

    {/* Weathering and erosion — centuries of sandblasting */}
    <rect x="28" y="20" width="10" height="5" fill="#A07820" opacity="0.3" />
    <rect x="30" y="22" width="6" height="2" fill="#8B7355" opacity="0.2" />
    <rect x="46" y="26" width="8" height="4" fill="#A07820" opacity="0.25" />
    <rect x="18" y="36" width="6" height="3" fill="#B8860B" opacity="0.2" />
    {/* Erosion channels */}
    <rect x="20" y="14" width="1" height="8" fill="#A07820" opacity="0.15" />
    <rect x="50" y="16" width="1" height="10" fill="#A07820" opacity="0.12" />

    {/* Sand buildup — partially buried */}
    <rect x="-10" y="42" width="24" height="6" fill="#C4A862" opacity="0.45" />
    <rect x="-8" y="44" width="16" height="4" fill="#D4B872" opacity="0.3" />
    <rect x="62" y="44" width="22" height="4" fill="#C4A862" opacity="0.4" />
    <rect x="66" y="46" width="14" height="3" fill="#D4B872" opacity="0.25" />

    {/* Algae colonization */}
    <rect x="18" y="38" width="8" height="3" fill="#2E7D32" opacity="0.3" />
    <rect x="20" y="36" width="4" height="2" fill="#4CAF50" opacity="0.2" />
    <rect x="52" y="30" width="6" height="3" fill="#388E3C" opacity="0.25" />
    <rect x="38" y="42" width="6" height="2" fill="#1B5E20" opacity="0.25" />

    {/* Barnacles */}
    <rect x="0" y="40" width="3" height="3" fill="#9CA3AF" opacity="0.3" />
    <rect x="72" y="40" width="3" height="3" fill="#9CA3AF" opacity="0.25" />

    {/* Small coral */}
    <rect x="74" y="36" width="4" height="4" fill="#E91E63" opacity="0.2" />

    {/* Bubbles */}
    <circle cx="10" cy="-6" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4.5s ease-in 0.5s infinite' }} />
    <circle cx="40" cy="12" r="0.8" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5.5s ease-in 3s infinite' }} />
  </g>
))
SunkenSphinx.displayName = 'SunkenSphinx'

// ─── TEMPLE THEME: Sunken Torii Gate ─────────────────────────────────

const SunkenTorii = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* ═══ Left pillar (hashira) — tapered vermillion lacquer ═══ */}
    <rect x="4" y="2" width="12" height="58" fill="#B71C1C" />
    <rect x="5" y="2" width="10" height="58" fill="#C62828" />
    {/* Lacquer depth shading */}
    <rect x="4" y="2" width="2" height="58" fill="#8B0000" opacity="0.2" />
    <rect x="14" y="2" width="2" height="58" fill="#D32F2F" opacity="0.15" />
    {/* Underwater tint on lower section */}
    <rect x="2" y="50" width="16" height="10" fill="#AD1457" opacity="0.3" />
    {/* Left base stone — detailed foundation */}
    <rect x="0" y="56" width="18" height="6" fill="#78716C" opacity="0.6" />
    <rect x="2" y="54" width="14" height="3" fill="#8D8680" opacity="0.5" />
    {/* Stone block mortar lines */}
    <rect x="0" y="58" width="18" height="1" fill="#57534E" opacity="0.15" />
    <rect x="6" y="56" width="1" height="6" fill="#57534E" opacity="0.1" />
    <rect x="12" y="56" width="1" height="6" fill="#57534E" opacity="0.1" />
    {/* Pillar cap (kamebara) */}
    <rect x="2" y="0" width="16" height="4" fill="#D32F2F" />
    <rect x="2" y="-1" width="16" height="2" fill="#E53935" opacity="0.4" />
    {/* Ring bands (kasugai) */}
    <rect x="2" y="14" width="16" height="2" fill="#D32F2F" opacity="0.5" />
    <rect x="3" y="14" width="14" height="1" fill="#E53935" opacity="0.3" />
    <rect x="2" y="28" width="16" height="2" fill="#D32F2F" opacity="0.45" />
    <rect x="3" y="28" width="14" height="1" fill="#E53935" opacity="0.25" />
    <rect x="2" y="42" width="16" height="2" fill="#D32F2F" opacity="0.4" />
    <rect x="3" y="42" width="14" height="1" fill="#E53935" opacity="0.2" />
    {/* Wood grain texture — pixel lines */}
    <rect x="6" y="4" width="1" height="52" fill="#8B0000" opacity="0.15" />
    <rect x="8" y="6" width="1" height="48" fill="#FF1744" opacity="0.08" />
    <rect x="10" y="4" width="1" height="50" fill="#8B0000" opacity="0.12" />
    <rect x="12" y="8" width="1" height="46" fill="#FF1744" opacity="0.06" />
    <rect x="14" y="6" width="1" height="48" fill="#8B0000" opacity="0.1" />
    {/* Lacquer peeling / wear patches */}
    <rect x="4" y="30" width="3" height="4" fill="#A1887F" opacity="0.22" />
    <rect x="5" y="31" width="1" height="2" fill="#8D7B6E" opacity="0.15" />
    <rect x="10" y="46" width="4" height="3" fill="#A1887F" opacity="0.18" />

    {/* ═══ Right pillar (mirror) ═══ */}
    <rect x="64" y="2" width="12" height="58" fill="#B71C1C" />
    <rect x="65" y="2" width="10" height="58" fill="#C62828" />
    <rect x="64" y="2" width="2" height="58" fill="#8B0000" opacity="0.2" />
    <rect x="74" y="2" width="2" height="58" fill="#D32F2F" opacity="0.15" />
    <rect x="62" y="50" width="16" height="10" fill="#AD1457" opacity="0.3" />
    <rect x="60" y="56" width="18" height="6" fill="#78716C" opacity="0.6" />
    <rect x="62" y="54" width="14" height="3" fill="#8D8680" opacity="0.5" />
    <rect x="60" y="58" width="18" height="1" fill="#57534E" opacity="0.15" />
    <rect x="66" y="56" width="1" height="6" fill="#57534E" opacity="0.1" />
    <rect x="72" y="56" width="1" height="6" fill="#57534E" opacity="0.1" />
    <rect x="62" y="0" width="16" height="4" fill="#D32F2F" />
    <rect x="62" y="-1" width="16" height="2" fill="#E53935" opacity="0.4" />
    <rect x="62" y="14" width="16" height="2" fill="#D32F2F" opacity="0.5" />
    <rect x="63" y="14" width="14" height="1" fill="#E53935" opacity="0.3" />
    <rect x="62" y="28" width="16" height="2" fill="#D32F2F" opacity="0.45" />
    <rect x="62" y="42" width="16" height="2" fill="#D32F2F" opacity="0.4" />
    <rect x="66" y="4" width="1" height="52" fill="#8B0000" opacity="0.15" />
    <rect x="68" y="6" width="1" height="48" fill="#FF1744" opacity="0.08" />
    <rect x="70" y="4" width="1" height="50" fill="#8B0000" opacity="0.12" />
    <rect x="72" y="6" width="1" height="48" fill="#FF1744" opacity="0.06" />
    <rect x="74" y="8" width="1" height="46" fill="#8B0000" opacity="0.1" />
    <rect x="72" y="24" width="3" height="4" fill="#A1887F" opacity="0.2" />
    <rect x="65" y="48" width="3" height="3" fill="#A1887F" opacity="0.15" />

    {/* ═══ Top beam (kasagi) — curved with detailed structure ═══ */}
    <rect x="-4" y="-8" width="88" height="6" fill="#C62828" />
    <rect x="-6" y="-10" width="92" height="4" fill="#D32F2F" />
    {/* Beam wood grain */}
    <rect x="-4" y="-7" width="88" height="1" fill="#8B0000" opacity="0.12" />
    <rect x="-4" y="-5" width="88" height="1" fill="#E53935" opacity="0.08" />
    <rect x="-6" y="-9" width="92" height="1" fill="#8B0000" opacity="0.1" />
    {/* Beam edge shadow underneath */}
    <rect x="-4" y="-2" width="88" height="1" fill="#6D0000" opacity="0.15" />
    {/* Curved tips (sorimashi) — upswept ends */}
    <rect x="-8" y="-12" width="4" height="4" fill="#C62828" />
    <rect x="-10" y="-14" width="4" height="3" fill="#B71C1C" />
    <rect x="-12" y="-16" width="3" height="2" fill="#AD1457" opacity="0.6" />
    <rect x="84" y="-12" width="4" height="4" fill="#C62828" />
    <rect x="86" y="-14" width="4" height="3" fill="#B71C1C" />
    <rect x="89" y="-16" width="3" height="2" fill="#AD1457" opacity="0.6" />

    {/* ═══ Lower beam (nuki) — connecting crossbar ═══ */}
    <rect x="0" y="6" width="80" height="4" fill="#D32F2F" />
    <rect x="2" y="4" width="76" height="3" fill="#E53935" opacity="0.6" />
    {/* Nuki wood grain */}
    <rect x="4" y="7" width="72" height="1" fill="#8B0000" opacity="0.1" />
    {/* Nuki wedge detail where it passes through pillars */}
    <rect x="16" y="5" width="3" height="4" fill="#B71C1C" opacity="0.4" />
    <rect x="61" y="5" width="3" height="4" fill="#B71C1C" opacity="0.4" />

    {/* ═══ Shimenawa (sacred rope) — hanging from nuki ═══ */}
    <path d="M24 10 Q30 14 36 11 Q42 14 48 11 Q54 14 58 10" stroke="#C4A862" strokeWidth="1.5" fill="none" opacity="0.35" />
    {/* Shide (zigzag paper strips) hanging from rope */}
    <rect x="30" y="12" width="2" height="4" fill="white" opacity="0.25" />
    <rect x="29" y="14" width="2" height="3" fill="white" opacity="0.2" />
    <rect x="42" y="11" width="2" height="4" fill="white" opacity="0.25" />
    <rect x="41" y="13" width="2" height="3" fill="white" opacity="0.2" />
    <rect x="52" y="12" width="2" height="4" fill="white" opacity="0.22" />
    <rect x="51" y="14" width="2" height="3" fill="white" opacity="0.18" />

    {/* ═══ Center tablet (gakuzuka) — enhanced ═══ */}
    <rect x="30" y="-4" width="20" height="10" fill="#FFD54F" opacity="0.5" />
    <rect x="32" y="-2" width="16" height="6" fill="#FFF59D" opacity="0.4" />
    {/* Tablet border */}
    <rect x="30" y="-4" width="20" height="1" fill="#B8860B" opacity="0.3" />
    <rect x="30" y="5" width="20" height="1" fill="#B8860B" opacity="0.25" />
    <rect x="30" y="-4" width="1" height="10" fill="#B8860B" opacity="0.2" />
    <rect x="49" y="-4" width="1" height="10" fill="#B8860B" opacity="0.18" />
    {/* Kanji-like characters (more detailed) */}
    <rect x="35" y="-2" width="1" height="5" fill="#B71C1C" opacity="0.5" />
    <rect x="37" y="-1" width="3" height="1" fill="#B71C1C" opacity="0.45" />
    <rect x="37" y="1" width="2" height="1" fill="#B71C1C" opacity="0.4" />
    <rect x="41" y="-2" width="1" height="5" fill="#B71C1C" opacity="0.5" />
    <rect x="42" y="-1" width="2" height="1" fill="#B71C1C" opacity="0.45" />
    <rect x="42" y="2" width="3" height="1" fill="#B71C1C" opacity="0.4" />

    {/* ═══ Marine growth — detailed algae and barnacles ═══ */}
    {/* Algae on pillars */}
    <rect x="4" y="52" width="8" height="3" fill="#2E7D32" opacity="0.4" />
    <rect x="5" y="51" width="4" height="2" fill="#4CAF50" opacity="0.25" />
    <rect x="66" y="54" width="8" height="2" fill="#388E3C" opacity="0.35" />
    <rect x="68" y="53" width="4" height="2" fill="#4CAF50" opacity="0.22" />
    {/* Algae on lower beam */}
    <rect x="20" y="8" width="4" height="2" fill="#1B5E20" opacity="0.3" />
    <rect x="56" y="6" width="4" height="2" fill="#2E7D32" opacity="0.25" />
    {/* Algae drip on pillars */}
    <rect x="4" y="48" width="2" height="4" fill="#1B5E20" opacity="0.2" />
    <rect x="74" y="46" width="2" height="4" fill="#1B5E20" opacity="0.18" />

    {/* ═══ Barnacle colonies ═══ */}
    <rect x="12" y="36" width="3" height="3" fill="#9CA3AF" opacity="0.35" />
    <rect x="13" y="37" width="1" height="1" fill="#B0BEC5" opacity="0.25" />
    <rect x="64" y="28" width="3" height="3" fill="#9CA3AF" opacity="0.3" />
    <rect x="65" y="29" width="1" height="1" fill="#B0BEC5" opacity="0.22" />
    {/* Base stone barnacles */}
    <rect x="0" y="60" width="4" height="2" fill="#78909C" opacity="0.25" />
    <rect x="74" y="58" width="4" height="2" fill="#78909C" opacity="0.22" />

    {/* ═══ Small coral growth ═══ */}
    <rect x="-2" y="54" width="4" height="4" fill="#E91E63" opacity="0.2" />
    <rect x="-1" y="53" width="2" height="2" fill="#F48FB1" opacity="0.15" />
    <rect x="76" y="52" width="4" height="4" fill="#FF5722" opacity="0.18" />
    <rect x="77" y="51" width="2" height="2" fill="#FF8A65" opacity="0.12" />

    {/* ═══ Bubbles ═══ */}
    <circle cx="40" cy="-12" r="1.2" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 4s ease-in 0s infinite' }} />
    <circle cx="36" cy="-8" r="0.8" fill="rgba(255,255,255,0.18)" style={{ animation: 'bubbleRise 5s ease-in 2s infinite' }} />
    <circle cx="44" cy="-6" r="0.6" fill="rgba(255,255,255,0.12)" style={{ animation: 'bubbleRise 5.5s ease-in 4s infinite' }} />
  </g>
))
SunkenTorii.displayName = 'SunkenTorii'

// ─── TEMPLE THEME: Stone Pagoda ──────────────────────────────────────

const StonePagoda = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* ═══ Base platform — stepped stone foundation ═══ */}
    <rect x="4" y="50" width="52" height="10" fill="#78716C" />
    <rect x="8" y="46" width="44" height="6" fill="#8D8D8D" />
    {/* Foundation stone block texture */}
    <rect x="6" y="52" width="48" height="1" fill="#6B6560" opacity="0.2" />
    <rect x="8" y="55" width="44" height="1" fill="#9E9890" opacity="0.15" />
    <rect x="18" y="50" width="1" height="8" fill="#6B6560" opacity="0.12" />
    <rect x="36" y="50" width="1" height="8" fill="#6B6560" opacity="0.1" />
    {/* Step shadow */}
    <rect x="8" y="46" width="44" height="1" fill="#57534E" opacity="0.2" />
    {/* Foundation corner stones */}
    <rect x="4" y="50" width="4" height="4" fill="#6B6560" opacity="0.25" />
    <rect x="52" y="50" width="4" height="4" fill="#6B6560" opacity="0.2" />

    {/* ═══ First tier (bottom, widest) ═══ */}
    <rect x="10" y="34" width="40" height="14" fill="#9E9E9E" />
    <rect x="6" y="32" width="48" height="4" fill="#BDBDBD" />
    {/* Wall stone texture — pixel blocks */}
    <rect x="12" y="36" width="8" height="1" fill="#B0B0B0" opacity="0.2" />
    <rect x="26" y="38" width="10" height="1" fill="#8A8A8A" opacity="0.18" />
    <rect x="38" y="36" width="8" height="1" fill="#B0B0B0" opacity="0.15" />
    <rect x="14" y="40" width="6" height="1" fill="#8A8A8A" opacity="0.15" />
    <rect x="30" y="42" width="8" height="1" fill="#B0B0B0" opacity="0.12" />
    {/* Pillar indentation details */}
    <rect x="12" y="34" width="2" height="12" fill="#8A8A8A" opacity="0.15" />
    <rect x="46" y="34" width="2" height="12" fill="#8A8A8A" opacity="0.12" />
    {/* Roof overhang with tile texture */}
    <rect x="2" y="30" width="56" height="3" fill="#78716C" />
    <rect x="0" y="28" width="60" height="3" fill="#6B7280" />
    {/* Roof tile pixel detail */}
    <rect x="4" y="29" width="4" height="1" fill="#57534E" opacity="0.2" />
    <rect x="12" y="29" width="4" height="1" fill="#57534E" opacity="0.18" />
    <rect x="20" y="29" width="4" height="1" fill="#57534E" opacity="0.2" />
    <rect x="28" y="29" width="4" height="1" fill="#57534E" opacity="0.18" />
    <rect x="36" y="29" width="4" height="1" fill="#57534E" opacity="0.2" />
    <rect x="44" y="29" width="4" height="1" fill="#57534E" opacity="0.18" />
    <rect x="52" y="29" width="4" height="1" fill="#57534E" opacity="0.15" />
    {/* Roof upturned corners */}
    <rect x="-2" y="27" width="3" height="3" fill="#57534E" />
    <rect x="-3" y="26" width="2" height="2" fill="#4B4845" opacity="0.7" />
    <rect x="59" y="27" width="3" height="3" fill="#57534E" />
    <rect x="61" y="26" width="2" height="2" fill="#4B4845" opacity="0.7" />
    {/* Drip edge */}
    <rect x="0" y="31" width="60" height="1" fill="#4B4845" opacity="0.15" />

    {/* ═══ Second tier ═══ */}
    <rect x="14" y="18" width="32" height="12" fill="#9E9E9E" />
    <rect x="10" y="16" width="40" height="3" fill="#BDBDBD" />
    {/* Wall texture */}
    <rect x="16" y="20" width="6" height="1" fill="#B0B0B0" opacity="0.18" />
    <rect x="28" y="22" width="8" height="1" fill="#8A8A8A" opacity="0.15" />
    <rect x="38" y="20" width="6" height="1" fill="#B0B0B0" opacity="0.12" />
    {/* Pillar details */}
    <rect x="16" y="18" width="2" height="10" fill="#8A8A8A" opacity="0.12" />
    <rect x="42" y="18" width="2" height="10" fill="#8A8A8A" opacity="0.1" />
    {/* Roof */}
    <rect x="6" y="14" width="48" height="3" fill="#78716C" />
    <rect x="4" y="12" width="52" height="3" fill="#6B7280" />
    {/* Roof tiles */}
    <rect x="8" y="13" width="4" height="1" fill="#57534E" opacity="0.18" />
    <rect x="16" y="13" width="4" height="1" fill="#57534E" opacity="0.2" />
    <rect x="24" y="13" width="4" height="1" fill="#57534E" opacity="0.18" />
    <rect x="32" y="13" width="4" height="1" fill="#57534E" opacity="0.2" />
    <rect x="40" y="13" width="4" height="1" fill="#57534E" opacity="0.18" />
    <rect x="48" y="13" width="4" height="1" fill="#57534E" opacity="0.15" />
    {/* Upturned corners */}
    <rect x="2" y="11" width="3" height="3" fill="#57534E" />
    <rect x="1" y="10" width="2" height="2" fill="#4B4845" opacity="0.7" />
    <rect x="55" y="11" width="3" height="3" fill="#57534E" />
    <rect x="57" y="10" width="2" height="2" fill="#4B4845" opacity="0.7" />

    {/* ═══ Third tier ═══ */}
    <rect x="18" y="4" width="24" height="10" fill="#9E9E9E" />
    <rect x="14" y="2" width="32" height="3" fill="#BDBDBD" />
    {/* Wall texture */}
    <rect x="20" y="6" width="4" height="1" fill="#B0B0B0" opacity="0.15" />
    <rect x="32" y="8" width="4" height="1" fill="#8A8A8A" opacity="0.12" />
    {/* Roof */}
    <rect x="10" y="0" width="40" height="3" fill="#78716C" />
    <rect x="8" y="-2" width="44" height="3" fill="#6B7280" />
    {/* Roof tiles */}
    <rect x="12" y="-1" width="4" height="1" fill="#57534E" opacity="0.18" />
    <rect x="20" y="-1" width="4" height="1" fill="#57534E" opacity="0.2" />
    <rect x="28" y="-1" width="4" height="1" fill="#57534E" opacity="0.18" />
    <rect x="36" y="-1" width="4" height="1" fill="#57534E" opacity="0.2" />
    <rect x="44" y="-1" width="4" height="1" fill="#57534E" opacity="0.15" />
    {/* Upturned corners */}
    <rect x="6" y="-3" width="3" height="3" fill="#57534E" />
    <rect x="5" y="-4" width="2" height="2" fill="#4B4845" opacity="0.7" />
    <rect x="51" y="-3" width="3" height="3" fill="#57534E" />
    <rect x="53" y="-4" width="2" height="2" fill="#4B4845" opacity="0.7" />

    {/* ═══ Spire / finial — ornate sorin ═══ */}
    <rect x="26" y="-10" width="8" height="10" fill="#BDBDBD" />
    <rect x="27" y="-10" width="6" height="10" fill="#C8C8C8" opacity="0.3" />
    <rect x="28" y="-16" width="4" height="8" fill="#9E9E9E" />
    <rect x="29" y="-20" width="2" height="6" fill="#78716C" />
    {/* Spire rings */}
    <rect x="26" y="-6" width="8" height="1" fill="#A8A8A8" opacity="0.3" />
    <rect x="27" y="-12" width="6" height="1" fill="#A8A8A8" opacity="0.25" />
    <rect x="28" y="-18" width="4" height="1" fill="#8A8A8A" opacity="0.2" />
    {/* Finial ball top */}
    <rect x="28.5" y="-22" width="3" height="3" fill="#6B7280" />
    <rect x="29" y="-23" width="2" height="1" fill="#9E9E9E" opacity="0.5" />

    {/* ═══ Window/door openings — detailed ═══ */}
    {/* Bottom door */}
    <rect x="24" y="38" width="10" height="10" fill="#1A1A2E" opacity="0.6" />
    <rect x="24" y="36" width="10" height="3" fill="#8A8A8A" opacity="0.3" />
    <rect x="26" y="35" width="6" height="2" fill="#9E9E9E" opacity="0.25" />
    {/* Door frame pixel blocks */}
    <rect x="24" y="38" width="1" height="8" fill="#7A7A7A" opacity="0.2" />
    <rect x="33" y="38" width="1" height="8" fill="#7A7A7A" opacity="0.18" />
    {/* Second tier window */}
    <rect x="26" y="22" width="8" height="6" fill="#1A1A2E" opacity="0.5" />
    <rect x="26" y="20" width="8" height="3" fill="#8A8A8A" opacity="0.25" />
    <rect x="28" y="19" width="4" height="2" fill="#9E9E9E" opacity="0.2" />
    {/* Faint interior glow */}
    <rect x="27" y="23" width="6" height="3" fill="#FFD54F" opacity="0.06" />
    {/* Third tier window */}
    <rect x="27" y="7" width="6" height="5" fill="#1A1A2E" opacity="0.4" />
    <rect x="28" y="6" width="4" height="2" fill="#8A8A8A" opacity="0.2" />

    {/* ═══ Hanging moss from roofs ═══ */}
    <rect x="0" y="31" width="2" height="3" fill="#2E7D32" opacity="0.25" />
    <rect x="58" y="31" width="2" height="2" fill="#388E3C" opacity="0.2" />
    <rect x="4" y="15" width="2" height="2" fill="#1B5E20" opacity="0.2" />
    <rect x="52" y="15" width="2" height="3" fill="#2E7D32" opacity="0.18" />

    {/* ═══ Moss and algae at base ═══ */}
    <rect x="4" y="54" width="6" height="3" fill="#2E7D32" opacity="0.4" />
    <rect x="5" y="53" width="4" height="2" fill="#4CAF50" opacity="0.25" />
    <rect x="44" y="52" width="10" height="3" fill="#388E3C" opacity="0.35" />
    <rect x="46" y="51" width="4" height="2" fill="#4CAF50" opacity="0.22" />

    {/* ═══ Barnacles on base ═══ */}
    <rect x="8" y="56" width="3" height="2" fill="#9CA3AF" opacity="0.25" />
    <rect x="48" y="55" width="4" height="2" fill="#9CA3AF" opacity="0.2" />

    {/* ═══ Stone weathering/erosion ═══ */}
    <rect x="10" y="44" width="4" height="2" fill="#78716C" opacity="0.2" />
    <rect x="42" y="36" width="3" height="2" fill="#78716C" opacity="0.18" />
    {/* Mineral stain */}
    <rect x="36" y="34" width="2" height="10" fill="#6B6560" opacity="0.1" />

    {/* ═══ Bubbles ═══ */}
    <circle cx="30" cy="-18" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4s ease-in 1s infinite' }} />
    <circle cx="26" cy="-8" r="0.7" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5s ease-in 3s infinite' }} />
  </g>
))
StonePagoda.displayName = 'StonePagoda'

// ─── ATLANTIS THEME: Atlantean Dome ──────────────────────────────────

const AtlanteanDome = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* ═══ Base platform — ornate Atlantean stonework ═══ */}
    <rect x="0" y="42" width="100" height="18" fill="#1A5276" />
    <rect x="4" y="36" width="92" height="8" fill="#1F618D" />
    <rect x="8" y="32" width="84" height="6" fill="#2471A3" />
    {/* Platform stone block grid */}
    <rect x="2" y="44" width="96" height="1" fill="#154360" opacity="0.18" />
    <rect x="2" y="48" width="96" height="1" fill="#154360" opacity="0.15" />
    <rect x="2" y="52" width="96" height="1" fill="#2980B9" opacity="0.1" />
    <rect x="16" y="42" width="1" height="14" fill="#154360" opacity="0.1" />
    <rect x="32" y="42" width="1" height="14" fill="#154360" opacity="0.1" />
    <rect x="50" y="42" width="1" height="14" fill="#154360" opacity="0.1" />
    <rect x="68" y="42" width="1" height="14" fill="#154360" opacity="0.1" />
    <rect x="84" y="42" width="1" height="14" fill="#154360" opacity="0.1" />
    {/* Decorative wave motif bands */}
    <rect x="6" y="40" width="88" height="2" fill="#5DADE2" opacity="0.3" />
    <rect x="8" y="40" width="2" height="1" fill="#85C1E9" opacity="0.25" />
    <rect x="16" y="40" width="2" height="1" fill="#85C1E9" opacity="0.25" />
    <rect x="24" y="40" width="2" height="1" fill="#85C1E9" opacity="0.25" />
    <rect x="32" y="40" width="2" height="1" fill="#85C1E9" opacity="0.25" />
    <rect x="10" y="34" width="80" height="1" fill="#85C1E9" opacity="0.25" />
    {/* Step corner blocks */}
    <rect x="0" y="42" width="4" height="4" fill="#154360" opacity="0.25" />
    <rect x="96" y="42" width="4" height="4" fill="#154360" opacity="0.2" />
    <rect x="4" y="36" width="4" height="2" fill="#154360" opacity="0.2" />
    <rect x="92" y="36" width="4" height="2" fill="#154360" opacity="0.18" />

    {/* ═══ Dome structure — layered with pixel block detail ═══ */}
    <rect x="16" y="16" width="68" height="18" fill="#2471A3" />
    <rect x="20" y="8" width="60" height="10" fill="#2E86C1" />
    <rect x="26" y="2" width="48" height="8" fill="#3498DB" />
    <rect x="32" y="-4" width="36" height="8" fill="#5DADE2" />
    <rect x="38" y="-8" width="24" height="6" fill="#85C1E9" />
    <rect x="44" y="-12" width="12" height="6" fill="#AED6F1" />
    <rect x="48" y="-14" width="4" height="4" fill="#D4E6F1" opacity="0.8" />
    {/* Dome surface tile texture */}
    <rect x="18" y="18" width="64" height="1" fill="#1A5276" opacity="0.15" />
    <rect x="22" y="22" width="56" height="1" fill="#1A5276" opacity="0.12" />
    <rect x="22" y="10" width="56" height="1" fill="#1A5276" opacity="0.12" />
    <rect x="28" y="4" width="44" height="1" fill="#1F618D" opacity="0.1" />
    {/* Dome highlight curve */}
    <rect x="34" y="-2" width="32" height="1" fill="#AED6F1" opacity="0.15" />
    <rect x="40" y="-6" width="20" height="1" fill="#D4E6F1" opacity="0.12" />
    {/* Dome panel lines (architectural segments) */}
    <rect x="34" y="2" width="1" height="28" fill="#1A5276" opacity="0.1" />
    <rect x="50" y="-4" width="1" height="34" fill="#1A5276" opacity="0.1" />
    <rect x="66" y="2" width="1" height="28" fill="#1A5276" opacity="0.1" />

    {/* ═══ Dome windows — glowing with interior light ═══ */}
    <rect x="30" y="10" width="8" height="10" fill="#00BCD4" opacity="0.5" />
    <rect x="32" y="8" width="4" height="3" fill="#4DD0E1" opacity="0.4" />
    {/* Window frame */}
    <rect x="30" y="10" width="8" height="1" fill="#1A5276" opacity="0.2" />
    <rect x="30" y="10" width="1" height="10" fill="#1A5276" opacity="0.15" />
    <rect x="37" y="10" width="1" height="10" fill="#1A5276" opacity="0.15" />
    {/* Interior glow */}
    <rect x="31" y="12" width="6" height="6" fill="#00E5FF" opacity="0.08" />

    <rect x="46" y="10" width="8" height="10" fill="#00BCD4" opacity="0.5" />
    <rect x="48" y="8" width="4" height="3" fill="#4DD0E1" opacity="0.4" />
    <rect x="46" y="10" width="8" height="1" fill="#1A5276" opacity="0.2" />
    <rect x="46" y="10" width="1" height="10" fill="#1A5276" opacity="0.15" />
    <rect x="53" y="10" width="1" height="10" fill="#1A5276" opacity="0.15" />
    <rect x="47" y="12" width="6" height="6" fill="#00E5FF" opacity="0.08" />

    <rect x="62" y="10" width="8" height="10" fill="#00BCD4" opacity="0.5" />
    <rect x="64" y="8" width="4" height="3" fill="#4DD0E1" opacity="0.4" />
    <rect x="62" y="10" width="8" height="1" fill="#1A5276" opacity="0.2" />
    <rect x="62" y="10" width="1" height="10" fill="#1A5276" opacity="0.15" />
    <rect x="69" y="10" width="1" height="10" fill="#1A5276" opacity="0.15" />
    <rect x="63" y="12" width="6" height="6" fill="#00E5FF" opacity="0.08" />

    {/* ═══ Central entrance — grand archway ═══ */}
    <rect x="38" y="26" width="24" height="16" fill="#0A1628" opacity="0.8" />
    <rect x="36" y="24" width="28" height="4" fill="#2471A3" />
    {/* Arch detail */}
    <rect x="40" y="22" width="20" height="3" fill="#5DADE2" opacity="0.4" />
    <rect x="42" y="20" width="16" height="3" fill="#85C1E9" opacity="0.25" />
    <rect x="46" y="19" width="8" height="2" fill="#AED6F1" opacity="0.2" />
    {/* Keystone */}
    <rect x="48" y="22" width="4" height="4" fill="#3498DB" opacity="0.5" />
    {/* Interior darkness gradient */}
    <rect x="40" y="28" width="20" height="4" fill="#050D18" opacity="0.3" />
    {/* Floor glow from inside */}
    <rect x="42" y="38" width="16" height="2" fill="#00BCD4" opacity="0.08" />

    {/* ═══ Ornate pillars flanking entrance ═══ */}
    <rect x="30" y="20" width="6" height="22" fill="#2E86C1" />
    <rect x="28" y="18" width="10" height="4" fill="#5DADE2" opacity="0.5" />
    {/* Pillar fluting (vertical grooves) */}
    <rect x="31" y="22" width="1" height="18" fill="#1A5276" opacity="0.15" />
    <rect x="34" y="22" width="1" height="18" fill="#1A5276" opacity="0.12" />
    {/* Pillar capital decoration */}
    <rect x="29" y="18" width="8" height="1" fill="#85C1E9" opacity="0.3" />

    <rect x="64" y="20" width="6" height="22" fill="#2E86C1" />
    <rect x="62" y="18" width="10" height="4" fill="#5DADE2" opacity="0.5" />
    <rect x="65" y="22" width="1" height="18" fill="#1A5276" opacity="0.15" />
    <rect x="68" y="22" width="1" height="18" fill="#1A5276" opacity="0.12" />
    <rect x="63" y="18" width="8" height="1" fill="#85C1E9" opacity="0.3" />

    {/* ═══ Trident symbol atop dome — detailed ═══ */}
    <rect x="49" y="-22" width="2" height="10" fill="#85C1E9" />
    {/* Trident prongs */}
    <rect x="46" y="-24" width="2" height="6" fill="#85C1E9" opacity="0.7" />
    <rect x="52" y="-24" width="2" height="6" fill="#85C1E9" opacity="0.7" />
    {/* Prong tips */}
    <rect x="48" y="-26" width="4" height="3" fill="#AED6F1" opacity="0.6" />
    <rect x="45" y="-26" width="2" height="2" fill="#AED6F1" opacity="0.5" />
    <rect x="53" y="-26" width="2" height="2" fill="#AED6F1" opacity="0.5" />
    <rect x="44" y="-28" width="2" height="2" fill="#D4E6F1" opacity="0.35" />
    <rect x="49" y="-28" width="2" height="2" fill="#D4E6F1" opacity="0.4" />
    <rect x="54" y="-28" width="2" height="2" fill="#D4E6F1" opacity="0.35" />
    {/* Trident shaft detail */}
    <rect x="49" y="-20" width="2" height="1" fill="#AED6F1" opacity="0.3" />

    {/* ═══ Bioluminescent glow accents — scattered ═══ */}
    <rect x="12" y="38" width="4" height="3" fill="#00E5FF" opacity="0.25" />
    <rect x="13" y="39" width="2" height="1" fill="#4DD0E1" opacity="0.2" />
    <rect x="84" y="38" width="4" height="3" fill="#00E5FF" opacity="0.25" />
    <rect x="85" y="39" width="2" height="1" fill="#4DD0E1" opacity="0.2" />
    <rect x="18" y="28" width="3" height="2" fill="#00E5FF" opacity="0.2" />
    <rect x="80" y="28" width="3" height="2" fill="#00E5FF" opacity="0.2" />
    {/* Glow on dome apex */}
    <rect x="48" y="-13" width="4" height="2" fill="#00E5FF" opacity="0.12" />
    {/* Scattered glow dots */}
    <rect x="22" y="20" width="2" height="2" fill="#00E5FF" opacity="0.1" />
    <rect x="76" y="22" width="2" height="2" fill="#00E5FF" opacity="0.1" />
    <rect x="40" y="-2" width="2" height="2" fill="#00E5FF" opacity="0.08" />

    {/* ═══ Coral, algae, barnacles ═══ */}
    <rect x="0" y="52" width="8" height="3" fill="#2E7D32" opacity="0.3" />
    <rect x="2" y="51" width="4" height="2" fill="#4CAF50" opacity="0.2" />
    <rect x="88" y="50" width="10" height="3" fill="#1B5E20" opacity="0.3" />
    <rect x="90" y="49" width="4" height="2" fill="#2E7D32" opacity="0.2" />
    {/* Coral cluster */}
    <rect x="98" y="44" width="6" height="5" fill="#E91E63" opacity="0.25" />
    <rect x="100" y="42" width="3" height="3" fill="#F48FB1" opacity="0.18" />
    <rect x="-2" y="48" width="5" height="4" fill="#FF5722" opacity="0.2" />
    <rect x="0" y="46" width="3" height="3" fill="#FF8A65" opacity="0.15" />
    {/* Barnacles */}
    <rect x="4" y="54" width="3" height="2" fill="#9CA3AF" opacity="0.25" />
    <rect x="92" y="52" width="4" height="2" fill="#9CA3AF" opacity="0.2" />

    {/* ═══ Bubbles ═══ */}
    <circle cx="50" cy="-24" r="1.5" fill="rgba(255,255,255,0.3)" style={{ animation: 'bubbleRise 3.5s ease-in 0s infinite' }} />
    <circle cx="46" cy="-14" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4.5s ease-in 1.5s infinite' }} />
    <circle cx="56" cy="-10" r="1.2" fill="rgba(255,255,255,0.22)" style={{ animation: 'bubbleRise 4s ease-in 3s infinite' }} />
    <circle cx="34" cy="8" r="0.7" fill="rgba(255,255,255,0.12)" style={{ animation: 'bubbleRise 5.5s ease-in 5s infinite' }} />
  </g>
))
AtlanteanDome.displayName = 'AtlanteanDome'

// ─── ATLANTIS THEME: Atlantean Obelisk ───────────────────────────────

const AtlanteanObelisk = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* ═══ Base — stepped ceremonial platform ═══ */}
    <rect x="0" y="46" width="40" height="14" fill="#1A5276" />
    <rect x="4" y="40" width="32" height="8" fill="#1F618D" />
    <rect x="8" y="36" width="24" height="6" fill="#2471A3" />
    {/* Platform stone block texture */}
    <rect x="2" y="48" width="36" height="1" fill="#154360" opacity="0.2" />
    <rect x="2" y="52" width="36" height="1" fill="#2980B9" opacity="0.12" />
    <rect x="10" y="46" width="1" height="8" fill="#154360" opacity="0.1" />
    <rect x="20" y="46" width="1" height="8" fill="#154360" opacity="0.1" />
    <rect x="30" y="46" width="1" height="8" fill="#154360" opacity="0.1" />
    {/* Platform decorative band — Atlantean wave motif */}
    <rect x="6" y="44" width="28" height="1" fill="#5DADE2" opacity="0.3" />
    <rect x="10" y="38" width="20" height="1" fill="#85C1E9" opacity="0.25" />
    {/* Step corner detail */}
    <rect x="0" y="46" width="2" height="2" fill="#154360" opacity="0.3" />
    <rect x="38" y="46" width="2" height="2" fill="#154360" opacity="0.25" />
    <rect x="4" y="40" width="2" height="2" fill="#154360" opacity="0.2" />
    <rect x="34" y="40" width="2" height="2" fill="#154360" opacity="0.18" />

    {/* ═══ Obelisk shaft — tall monolith with worn edges ═══ */}
    <rect x="12" y="-20" width="16" height="58" fill="#2E86C1" />
    {/* Shaft highlight (light side) */}
    <rect x="13" y="-20" width="4" height="58" fill="#3498DB" opacity="0.25" />
    {/* Shaft shadow (dark side) */}
    <rect x="24" y="-20" width="3" height="58" fill="#1A5276" opacity="0.2" />
    {/* Decorative cap ring */}
    <rect x="10" y="-16" width="20" height="4" fill="#3498DB" />
    <rect x="10" y="-17" width="20" height="1" fill="#5DADE2" opacity="0.4" />
    {/* Lower shaft ring */}
    <rect x="10" y="32" width="20" height="3" fill="#3498DB" opacity="0.4" />

    {/* ═══ Pyramidion (pointed capstone) — crystal-like ═══ */}
    <rect x="14" y="-28" width="12" height="10" fill="#5DADE2" />
    <rect x="16" y="-34" width="8" height="8" fill="#85C1E9" />
    <rect x="18" y="-38" width="4" height="6" fill="#AED6F1" />
    <rect x="19" y="-40" width="2" height="4" fill="#D4E6F1" opacity="0.8" />
    {/* Crystal facet highlights */}
    <rect x="15" y="-26" width="2" height="4" fill="#AED6F1" opacity="0.25" />
    <rect x="17" y="-32" width="2" height="3" fill="#D4E6F1" opacity="0.2" />
    {/* Capstone glow pulse */}
    <rect x="18" y="-39" width="4" height="2" fill="#00E5FF" opacity="0.15" />

    {/* ═══ Hieroglyphic carvings — extensive Atlantean script ═══ */}
    {/* Row 1: Eye and wave symbols */}
    <rect x="14" y="-10" width="4" height="4" fill="#00BCD4" opacity="0.4" />
    <rect x="15" y="-9" width="2" height="2" fill="#00E5FF" opacity="0.3" />
    <rect x="22" y="-10" width="4" height="4" fill="#00BCD4" opacity="0.4" />
    <rect x="23" y="-9" width="2" height="2" fill="#00E5FF" opacity="0.3" />
    {/* Divider line */}
    <rect x="14" y="-5" width="12" height="1" fill="#5DADE2" opacity="0.2" />

    {/* Row 2: Wave pattern band */}
    <rect x="14" y="0" width="2" height="2" fill="#00BCD4" opacity="0.3" />
    <rect x="18" y="-1" width="2" height="2" fill="#00BCD4" opacity="0.35" />
    <rect x="22" y="0" width="2" height="2" fill="#00BCD4" opacity="0.3" />
    <rect x="26" y="-1" width="2" height="2" fill="#00BCD4" opacity="0.25" />
    <rect x="16" y="0" width="8" height="1" fill="#00BCD4" opacity="0.2" />

    {/* Row 3: Trident symbols */}
    <rect x="14" y="8" width="4" height="4" fill="#00BCD4" opacity="0.35" />
    <rect x="16" y="6" width="1" height="2" fill="#00BCD4" opacity="0.25" />
    <rect x="22" y="8" width="4" height="4" fill="#00BCD4" opacity="0.35" />
    <rect x="24" y="6" width="1" height="2" fill="#00BCD4" opacity="0.25" />
    {/* Divider */}
    <rect x="14" y="13" width="12" height="1" fill="#5DADE2" opacity="0.18" />

    {/* Row 4: Circular medallion */}
    <rect x="16" y="18" width="8" height="2" fill="#00BCD4" opacity="0.3" />
    <rect x="18" y="16" width="4" height="6" fill="#00BCD4" opacity="0.25" />
    <rect x="19" y="18" width="2" height="2" fill="#00E5FF" opacity="0.2" />

    {/* Row 5: Lower glyphs */}
    <rect x="18" y="26" width="4" height="4" fill="#00BCD4" opacity="0.3" />
    <rect x="14" y="28" width="2" height="2" fill="#00BCD4" opacity="0.2" />
    <rect x="24" y="28" width="2" height="2" fill="#00BCD4" opacity="0.2" />

    {/* ═══ Glowing Eye of Atlantis — centerpiece ═══ */}
    <rect x="15" y="-8" width="10" height="4" fill="#004D40" opacity="0.4" />
    <rect x="16" y="-7" width="8" height="2" fill="#00E5FF" opacity="0.35" />
    <rect x="18" y="-8" width="4" height="4" fill="#00E5FF" opacity="0.25" />
    <rect x="19" y="-7" width="2" height="2" fill="#4DD0E1" opacity="0.4" />
    {/* Eye iris glow */}
    <rect x="19.5" y="-7" width="1" height="1" fill="white" opacity="0.3" />

    {/* ═══ Weathering and erosion ═══ */}
    <rect x="12" y="22" width="2" height="4" fill="#1A5276" opacity="0.2" />
    <rect x="26" y="10" width="2" height="6" fill="#1A5276" opacity="0.15" />
    {/* Missing chunk */}
    <rect x="26" y="-18" width="2" height="3" fill="#2471A3" opacity="0.3" />

    {/* ═══ Bioluminescent glow accents ═══ */}
    <rect x="10" y="34" width="2" height="2" fill="#00E5FF" opacity="0.2" />
    <rect x="28" y="34" width="2" height="2" fill="#00E5FF" opacity="0.18" />
    <rect x="6" y="42" width="2" height="2" fill="#00E5FF" opacity="0.15" />
    <rect x="32" y="42" width="2" height="2" fill="#00E5FF" opacity="0.12" />

    {/* ═══ Coral growth on base ═══ */}
    <rect x="0" y="54" width="6" height="3" fill="#2E7D32" opacity="0.35" />
    <rect x="1" y="53" width="4" height="2" fill="#4CAF50" opacity="0.22" />
    <rect x="32" y="52" width="6" height="3" fill="#388E3C" opacity="0.3" />
    <rect x="34" y="51" width="4" height="2" fill="#4CAF50" opacity="0.2" />
    {/* Coral cluster */}
    <rect x="36" y="44" width="6" height="5" fill="#E91E63" opacity="0.2" />
    <rect x="38" y="42" width="3" height="3" fill="#F48FB1" opacity="0.15" />
    {/* Algae on shaft */}
    <rect x="26" y="20" width="4" height="3" fill="#1B5E20" opacity="0.25" />
    <rect x="12" y="28" width="3" height="4" fill="#2E7D32" opacity="0.2" />

    {/* ═══ Barnacles ═══ */}
    <rect x="2" y="50" width="3" height="2" fill="#9CA3AF" opacity="0.25" />
    <rect x="36" y="48" width="3" height="2" fill="#9CA3AF" opacity="0.2" />

    {/* ═══ Bubbles ═══ */}
    <circle cx="20" cy="-38" r="1" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 4s ease-in 0.5s infinite' }} />
    <circle cx="18" cy="-30" r="0.7" fill="rgba(255,255,255,0.18)" style={{ animation: 'bubbleRise 5s ease-in 2.5s infinite' }} />
    <circle cx="22" cy="-24" r="0.8" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 4.5s ease-in 4s infinite' }} />
  </g>
))
AtlanteanObelisk.displayName = 'AtlanteanObelisk'


// ─── STAGNANT THEME: Deer Skull with Willow Vines ─────────────────────
// A haunting deer skull resting on the bottom with branching antlers.
// Tropical aquatic plants grow from the eye sockets and twist around the
// antlers like an underwater weeping willow. Built with pixel-block
// Minecraft technique for maximum detail.

const DeerSkullWillow = memo(({ x, y }: { x: number; y: number }) => (
  <g>
    {/* ═══ SIDE PROFILE DEER SKULL — lateral view, facing right ═══ */}
    {/* Dolichocephalic (long, narrow) skull shape — DOUBLED SIZE with extra detail */}

    {/* ═══ ANTLER — single visible antler from side profile, branching upward ═══ */}
    {/* Main beam — rises from pedicle on top of cranium, curves backward then up */}
    <rect x="56" y="36" width="6" height="6" fill="#D4C8A8" />
    <rect x="60" y="28" width="6" height="8" fill="#D4C8A8" />
    <rect x="64" y="20" width="6" height="8" fill="#D4C8A8" />
    <rect x="68" y="12" width="6" height="8" fill="#D4C8A8" />
    <rect x="72" y="4" width="6" height="8" fill="#B8A888" />
    <rect x="76" y="-4" width="6" height="8" fill="#B8A888" />
    <rect x="82" y="-10" width="4" height="6" fill="#A09480" />
    {/* Beam highlight pixels */}
    <rect x="62" y="24" width="4" height="4" fill="#E0D4B8" opacity="0.5" />
    <rect x="70" y="8" width="4" height="4" fill="#E0D4B8" opacity="0.4" />
    <rect x="78" y="-2" width="4" height="4" fill="#E0D4B8" opacity="0.35" />
    {/* Burr texture at antler base — rough bumpy blocks */}
    <rect x="56" y="38" width="2" height="2" fill="#C4B8A0" opacity="0.6" />
    <rect x="58" y="40" width="2" height="2" fill="#B8A888" opacity="0.5" />
    <rect x="60" y="37" width="2" height="2" fill="#A89C84" opacity="0.55" />
    <rect x="55" y="36" width="2" height="2" fill="#C4B8A0" opacity="0.5" />
    <rect x="57" y="42" width="3" height="2" fill="#B8A888" opacity="0.45" />
    <rect x="62" y="36" width="2" height="2" fill="#A89C84" opacity="0.4" />
    {/* Pearling along main beam — tiny highlight dots */}
    <rect x="63" y="26" width="2" height="2" fill="#F0E6D2" opacity="0.35" />
    <rect x="66" y="22" width="2" height="2" fill="#F0E6D2" opacity="0.3" />
    <rect x="69" y="16" width="2" height="2" fill="#F0E6D2" opacity="0.3" />
    <rect x="73" y="8" width="2" height="2" fill="#F0E6D2" opacity="0.25" />
    <rect x="77" y="0" width="2" height="2" fill="#F0E6D2" opacity="0.25" />
    <rect x="80" y="-6" width="2" height="2" fill="#F0E6D2" opacity="0.2" />

    {/* Brow tine — first fork near base, points forward/up */}
    <rect x="60" y="28" width="4" height="6" fill="#D4C8A8" />
    <rect x="56" y="20" width="4" height="8" fill="#D4C8A8" />
    <rect x="52" y="12" width="4" height="8" fill="#B8A888" />
    <rect x="48" y="4" width="4" height="8" fill="#B8A888" />
    <rect x="44" y="-2" width="4" height="6" fill="#A09480" />
    {/* Brow tine highlight */}
    <rect x="54" y="16" width="2" height="4" fill="#E0D4B8" opacity="0.4" />
    {/* Brow tine tip detail */}
    <rect x="44" y="-2" width="2" height="2" fill="#8B7D68" opacity="0.3" />
    <rect x="46" y="0" width="2" height="2" fill="#C4B8A0" opacity="0.3" />

    {/* Bez tine — second fork, branches forward */}
    <rect x="66" y="16" width="4" height="6" fill="#D4C8A8" />
    <rect x="60" y="8" width="6" height="8" fill="#D4C8A8" />
    <rect x="56" y="0" width="4" height="8" fill="#B8A888" />
    <rect x="52" y="-6" width="4" height="6" fill="#A09480" />
    {/* Bez tine tip */}
    <rect x="52" y="-6" width="2" height="2" fill="#8B7D68" opacity="0.3" />

    {/* Trez tine — third fork, upper branch */}
    <rect x="72" y="4" width="4" height="6" fill="#D4C8A8" />
    <rect x="68" y="-4" width="4" height="8" fill="#B8A888" />
    <rect x="64" y="-10" width="4" height="6" fill="#A09480" />
    <rect x="60" y="-14" width="4" height="4" fill="#A09480" />
    {/* Trez tine tip */}
    <rect x="60" y="-14" width="2" height="2" fill="#8B7D68" opacity="0.3" />

    {/* Crown tine — topmost points */}
    <rect x="80" y="-8" width="4" height="6" fill="#B8A888" />
    <rect x="84" y="-14" width="4" height="6" fill="#A09480" />
    <rect x="88" y="-18" width="4" height="4" fill="#A09480" />
    {/* Second crown point */}
    <rect x="76" y="-12" width="4" height="4" fill="#A09480" />
    {/* Crown tine tips */}
    <rect x="88" y="-18" width="2" height="2" fill="#8B7D68" opacity="0.3" />
    <rect x="76" y="-12" width="2" height="2" fill="#8B7D68" opacity="0.25" />

    {/* Antler texture — shadow blocks */}
    <rect x="64" y="24" width="4" height="4" fill="#A89C84" opacity="0.3" />
    <rect x="72" y="8" width="4" height="4" fill="#A89C84" opacity="0.25" />
    <rect x="80" y="-4" width="4" height="4" fill="#8B7D68" opacity="0.2" />
    {/* More antler texture — groove detail */}
    <rect x="66" y="18" width="2" height="4" fill="#8B7D68" opacity="0.15" />
    <rect x="74" y="2" width="2" height="4" fill="#8B7D68" opacity="0.15" />
    <rect x="70" y="14" width="2" height="2" fill="#A89C84" opacity="0.2" />

    {/* ═══ CRANIUM — rounded braincase, viewed from side ═══ */}
    {/* Cranium is roughly oval from the side, sits behind the eye */}
    <rect x="44" y="40" width="40" height="4" fill="#E8DCC8" />
    <rect x="40" y="44" width="48" height="4" fill="#E8DCC8" />
    <rect x="36" y="48" width="52" height="4" fill="#E8DCC8" />
    <rect x="36" y="52" width="52" height="4" fill="#E8DCC8" />
    <rect x="40" y="56" width="44" height="4" fill="#E8DCC8" />
    <rect x="44" y="60" width="36" height="4" fill="#E8DCC8" />
    {/* Cranium top highlight */}
    <rect x="52" y="40" width="4" height="4" fill="#F0E6D2" opacity="0.5" />
    <rect x="64" y="40" width="4" height="4" fill="#F0E6D2" opacity="0.45" />
    <rect x="48" y="44" width="4" height="4" fill="#F0E6D2" opacity="0.4" />
    <rect x="60" y="44" width="4" height="4" fill="#F0E6D2" opacity="0.4" />
    {/* Extra cranium highlights */}
    <rect x="56" y="42" width="4" height="2" fill="#F0E6D2" opacity="0.35" />
    <rect x="68" y="42" width="4" height="2" fill="#F0E6D2" opacity="0.3" />
    {/* Nuchal crest — pronounced ridge at back of skull */}
    <rect x="36" y="48" width="4" height="8" fill="#C4B8A0" opacity="0.5" />
    <rect x="38" y="46" width="4" height="4" fill="#C4B8A0" opacity="0.4" />
    {/* Suture lines — jagged cracks on cranium (deer skulls have very jagged sutures) */}
    <rect x="56" y="44" width="2" height="6" fill="#8B7D68" opacity="0.2" />
    <rect x="58" y="48" width="2" height="4" fill="#8B7D68" opacity="0.18" />
    <rect x="68" y="46" width="2" height="6" fill="#8B7D68" opacity="0.15" />
    <rect x="52" y="52" width="2" height="4" fill="#8B7D68" opacity="0.15" />
    {/* Additional suture lines for detail */}
    <rect x="62" y="44" width="2" height="4" fill="#8B7D68" opacity="0.17" />
    <rect x="64" y="47" width="2" height="3" fill="#8B7D68" opacity="0.14" />
    <rect x="50" y="46" width="2" height="4" fill="#8B7D68" opacity="0.16" />
    <rect x="48" y="49" width="2" height="3" fill="#8B7D68" opacity="0.13" />
    <rect x="72" y="48" width="2" height="4" fill="#8B7D68" opacity="0.14" />
    <rect x="74" y="50" width="2" height="3" fill="#8B7D68" opacity="0.12" />
    <rect x="58" y="52" width="2" height="4" fill="#8B7D68" opacity="0.13" />
    <rect x="46" y="44" width="2" height="3" fill="#8B7D68" opacity="0.15" />
    <rect x="66" y="52" width="2" height="4" fill="#8B7D68" opacity="0.12" />
    <rect x="54" y="56" width="2" height="3" fill="#8B7D68" opacity="0.11" />

    {/* ═══ ZYGOMATIC ARCH — thin bone bridge below eye (characteristic thin in deer) ═══ */}
    <rect x="60" y="64" width="28" height="4" fill="#E8DCC8" />
    <rect x="64" y="68" width="20" height="2" fill="#D4C8B0" />
    {/* Arch shadow */}
    <rect x="68" y="66" width="4" height="2" fill="#C4B8A0" opacity="0.3" />
    {/* Extra arch detail — thinner defined bone bridge */}
    <rect x="62" y="64" width="2" height="2" fill="#D4C8B0" opacity="0.5" />
    <rect x="86" y="64" width="2" height="2" fill="#D4C8B0" opacity="0.5" />
    <rect x="74" y="66" width="4" height="2" fill="#C4B8A0" opacity="0.25" />
    <rect x="80" y="66" width="4" height="2" fill="#C4B8A0" opacity="0.2" />
    <rect x="66" y="68" width="2" height="2" fill="#B8A888" opacity="0.2" />
    <rect x="82" y="68" width="2" height="2" fill="#B8A888" opacity="0.2" />

    {/* ═══ EYE SOCKET — large orbital from side view ═══ */}
    {/* Side-profile eye socket is roughly circular, positioned mid-skull */}
    <rect x="72" y="48" width="20" height="4" fill="#1A0E08" />
    <rect x="68" y="52" width="28" height="4" fill="#1A0E08" />
    <rect x="68" y="56" width="28" height="4" fill="#1A0E08" />
    <rect x="72" y="60" width="20" height="4" fill="#1A0E08" />
    {/* Socket rim — smooth edge (deer have smoother orbital rims than sheep) */}
    <rect x="70" y="46" width="4" height="4" fill="#3A2A1E" opacity="0.5" />
    <rect x="78" y="46" width="4" height="4" fill="#3A2A1E" opacity="0.5" />
    <rect x="86" y="46" width="4" height="4" fill="#3A2A1E" opacity="0.5" />
    <rect x="94" y="50" width="4" height="4" fill="#3A2A1E" opacity="0.5" />
    <rect x="94" y="58" width="4" height="4" fill="#3A2A1E" opacity="0.5" />
    <rect x="70" y="62" width="4" height="4" fill="#3A2A1E" opacity="0.5" />
    <rect x="86" y="62" width="4" height="4" fill="#3A2A1E" opacity="0.5" />
    <rect x="66" y="54" width="4" height="4" fill="#3A2A1E" opacity="0.45" />
    {/* Additional orbital rim detail */}
    <rect x="74" y="46" width="4" height="2" fill="#3A2A1E" opacity="0.4" />
    <rect x="82" y="46" width="4" height="2" fill="#3A2A1E" opacity="0.4" />
    <rect x="90" y="48" width="4" height="2" fill="#3A2A1E" opacity="0.35" />
    <rect x="96" y="54" width="2" height="4" fill="#3A2A1E" opacity="0.35" />
    <rect x="96" y="58" width="2" height="2" fill="#3A2A1E" opacity="0.3" />
    <rect x="66" y="58" width="2" height="4" fill="#3A2A1E" opacity="0.35" />
    <rect x="78" y="62" width="4" height="2" fill="#3A2A1E" opacity="0.35" />
    <rect x="90" y="62" width="4" height="2" fill="#3A2A1E" opacity="0.3" />
    {/* Socket depth */}
    <rect x="76" y="52" width="4" height="4" fill="#0E0708" opacity="0.7" />
    <rect x="80" y="56" width="4" height="4" fill="#0E0708" opacity="0.6" />
    <rect x="72" y="56" width="4" height="4" fill="#0E0708" opacity="0.6" />
    {/* Extra socket depth detail */}
    <rect x="78" y="54" width="4" height="4" fill="#0E0708" opacity="0.65" />
    <rect x="74" y="54" width="4" height="2" fill="#0E0708" opacity="0.5" />
    <rect x="82" y="54" width="4" height="2" fill="#0E0708" opacity="0.5" />

    {/* ═══ NASAL BONES & BRIDGE — long tapering snout (key deer feature) ═══ */}
    {/* Upper nasal — forms the long nose bridge */}
    <rect x="84" y="44" width="20" height="4" fill="#E8DCC8" />
    <rect x="92" y="48" width="20" height="4" fill="#E8DCC8" />
    <rect x="96" y="52" width="20" height="4" fill="#E8DCC8" />
    <rect x="100" y="56" width="20" height="4" fill="#E8DCC8" />
    <rect x="104" y="60" width="20" height="4" fill="#E8DCC8" />
    <rect x="108" y="64" width="20" height="4" fill="#E8DCC8" />
    <rect x="112" y="68" width="20" height="4" fill="#E8DCC8" />
    <rect x="116" y="72" width="16" height="4" fill="#E8DCC8" />
    {/* Nasal bridge highlight */}
    <rect x="100" y="52" width="4" height="4" fill="#F0E6D2" opacity="0.4" />
    <rect x="112" y="60" width="4" height="4" fill="#F0E6D2" opacity="0.35" />
    {/* Nasal bone edge — ridge detail */}
    <rect x="96" y="48" width="2" height="12" fill="#C4B8A0" opacity="0.3" />
    {/* Extra nasal bridge detail */}
    <rect x="106" y="56" width="4" height="2" fill="#F0E6D2" opacity="0.3" />
    <rect x="118" y="66" width="4" height="2" fill="#F0E6D2" opacity="0.25" />
    <rect x="98" y="50" width="2" height="4" fill="#C4B8A0" opacity="0.25" />

    {/* ═══ NASAL CAVITY — opening at tip of snout ═══ */}
    <rect x="128" y="68" width="8" height="6" fill="#1A0E08" rx="1" />
    <rect x="132" y="66" width="4" height="4" fill="#1A0E08" />
    {/* Nasal rim */}
    <rect x="126" y="66" width="4" height="4" fill="#3A2A1E" opacity="0.4" />
    <rect x="134" y="66" width="4" height="4" fill="#3A2A1E" opacity="0.4" />
    <rect x="128" y="74" width="4" height="2" fill="#3A2A1E" opacity="0.3" />
    {/* Extra nasal cavity detail */}
    <rect x="130" y="68" width="4" height="4" fill="#0E0708" opacity="0.5" />
    <rect x="128" y="70" width="2" height="2" fill="#0E0708" opacity="0.4" />
    <rect x="136" y="68" width="2" height="2" fill="#3A2A1E" opacity="0.3" />

    {/* ═══ MAXILLA & PREMAXILLA — upper jaw from side ═══ */}
    {/* Upper jaw extends forward under nose */}
    <rect x="88" y="68" width="24" height="4" fill="#E8DCC8" />
    <rect x="92" y="72" width="28" height="4" fill="#E8DCC8" />
    <rect x="96" y="76" width="28" height="4" fill="#E8DCC8" />
    <rect x="100" y="80" width="28" height="4" fill="#C4B8A0" />
    {/* Hard palate (deer lack upper incisors — unique feature) */}
    <rect x="120" y="80" width="12" height="4" fill="#D4C0A8" opacity="0.5" />
    {/* Diastema gap — space between front pad and cheek teeth */}
    <rect x="108" y="80" width="8" height="4" fill="#C4B8A0" opacity="0.3" />

    {/* ═══ LOWER JAW (mandible) — visible from side ═══ */}
    <rect x="48" y="64" width="16" height="4" fill="#E8DCC8" />
    <rect x="52" y="68" width="28" height="4" fill="#E8DCC8" />
    <rect x="60" y="72" width="32" height="4" fill="#E8DCC8" />
    <rect x="72" y="76" width="32" height="4" fill="#E8DCC8" />
    <rect x="84" y="80" width="28" height="4" fill="#E8DCC8" />
    <rect x="100" y="84" width="28" height="4" fill="#C4B8A0" />
    {/* Mandible ramus — ascending branch toward ear */}
    <rect x="44" y="60" width="8" height="8" fill="#D4C8B0" />
    <rect x="40" y="56" width="8" height="8" fill="#D4C8B0" />
    {/* Jaw joint (condyle) */}
    <rect x="40" y="56" width="6" height="4" fill="#C4B8A0" opacity="0.6" />
    {/* Coronoid process — upward projection on mandible ramus */}
    <rect x="46" y="58" width="4" height="4" fill="#D4C8B0" />
    <rect x="48" y="56" width="4" height="4" fill="#D4C8B0" />
    <rect x="50" y="54" width="4" height="4" fill="#C4B8A0" opacity="0.5" />
    <rect x="52" y="52" width="2" height="4" fill="#C4B8A0" opacity="0.4" />
    {/* Jaw shadow */}
    <rect x="68" y="76" width="4" height="4" fill="#C4B8A0" opacity="0.3" />
    <rect x="96" y="84" width="4" height="4" fill="#C4B8A0" opacity="0.3" />
    {/* Mandible underside shadow */}
    <rect x="56" y="72" width="4" height="2" fill="#B8A888" opacity="0.25" />
    <rect x="76" y="80" width="4" height="2" fill="#B8A888" opacity="0.25" />
    <rect x="112" y="86" width="4" height="2" fill="#B8A888" opacity="0.2" />

    {/* ═══ CHEEK TEETH — molar/premolar row visible from side ═══ */}
    {/* Deer have 6 cheek teeth per side (3 premolars + 3 molars) */}
    {/* Premolar 1 */}
    <rect x="76" y="84" width="4" height="4" fill="#F0E6D2" opacity="0.7" />
    <rect x="76" y="86" width="2" height="2" fill="#E8DCC8" opacity="0.5" />
    <rect x="78" y="84" width="2" height="2" fill="#D4C8B0" opacity="0.4" />
    {/* Premolar 2 */}
    <rect x="82" y="84" width="4" height="4" fill="#F0E6D2" opacity="0.65" />
    <rect x="82" y="86" width="2" height="2" fill="#E8DCC8" opacity="0.5" />
    <rect x="84" y="84" width="2" height="2" fill="#D4C8B0" opacity="0.35" />
    {/* Premolar 3 */}
    <rect x="88" y="84" width="4" height="4" fill="#F0E6D2" opacity="0.7" />
    <rect x="88" y="86" width="2" height="2" fill="#E8DCC8" opacity="0.5" />
    <rect x="90" y="84" width="2" height="2" fill="#D4C8B0" opacity="0.4" />
    {/* Molar 1 */}
    <rect x="94" y="84" width="4" height="4" fill="#F0E6D2" opacity="0.65" />
    <rect x="94" y="86" width="2" height="2" fill="#E8DCC8" opacity="0.45" />
    <rect x="96" y="84" width="2" height="2" fill="#D4C8B0" opacity="0.35" />
    {/* Molar 2 */}
    <rect x="100" y="84" width="4" height="4" fill="#F0E6D2" opacity="0.6" />
    <rect x="100" y="86" width="2" height="2" fill="#E8DCC8" opacity="0.4" />
    <rect x="102" y="84" width="2" height="2" fill="#D4C8B0" opacity="0.35" />
    {/* Molar 3 */}
    <rect x="106" y="84" width="4" height="4" fill="#F0E6D2" opacity="0.55" />
    <rect x="106" y="86" width="2" height="2" fill="#E8DCC8" opacity="0.4" />
    <rect x="108" y="84" width="2" height="2" fill="#D4C8B0" opacity="0.3" />

    {/* ═══ EAR BONE OPENING — auditory bulla near back of skull ═══ */}
    <rect x="40" y="52" width="6" height="6" fill="#2A1A10" opacity="0.5" />
    <rect x="38" y="50" width="4" height="4" fill="#3A2A1E" opacity="0.3" />
    {/* Extra ear detail */}
    <rect x="42" y="54" width="2" height="2" fill="#1A0E08" opacity="0.4" />

    {/* ═══ FORAMEN (nerve holes) — small dark blocks on snout and jaw ═══ */}
    <rect x="104" y="60" width="2" height="2" fill="#3A2A1E" opacity="0.35" />
    <rect x="114" y="66" width="2" height="2" fill="#3A2A1E" opacity="0.3" />
    <rect x="120" y="70" width="2" height="2" fill="#3A2A1E" opacity="0.3" />
    <rect x="90" y="74" width="2" height="2" fill="#3A2A1E" opacity="0.25" />
    <rect x="80" y="78" width="2" height="2" fill="#3A2A1E" opacity="0.25" />
    <rect x="110" y="82" width="2" height="2" fill="#3A2A1E" opacity="0.2" />
    <rect x="96" y="78" width="2" height="2" fill="#3A2A1E" opacity="0.25" />
    <rect x="124" y="74" width="2" height="2" fill="#3A2A1E" opacity="0.2" />

    {/* ═══ SKULL SHADOW BLOCKS — along underside edges ═══ */}
    <rect x="44" y="62" width="6" height="2" fill="#B8A888" opacity="0.3" />
    <rect x="52" y="70" width="4" height="2" fill="#B8A888" opacity="0.25" />
    <rect x="64" y="74" width="4" height="2" fill="#B8A888" opacity="0.25" />
    <rect x="86" y="82" width="4" height="2" fill="#B8A888" opacity="0.2" />
    <rect x="100" y="86" width="4" height="2" fill="#B8A888" opacity="0.2" />
    <rect x="120" y="84" width="4" height="2" fill="#B8A888" opacity="0.2" />
    <rect x="36" y="54" width="4" height="2" fill="#B8A888" opacity="0.3" />
    <rect x="130" y="74" width="4" height="2" fill="#B8A888" opacity="0.2" />

    {/* ═══ WILLOW VINE PLANTS — underwater weeping willow from skull ═══ */}

    {/* Eye socket vine cluster — main cascading strands */}
    <g style={{ transformOrigin: '80px 56px', animation: 'kelpSway 4s ease-in-out infinite' }}>
      <path d="M80 56 Q72 36 60 16 Q52 0 44 -16" stroke="#2E7D32" strokeWidth="1.6" fill="none" opacity="0.8" strokeLinecap="round" />
      <path d="M76 54 Q68 36 56 16 Q48 0 36 -12" stroke="#1B5E20" strokeWidth="1.3" fill="none" opacity="0.7" strokeLinecap="round" />
      <path d="M84 56 Q76 40 68 20 Q60 4 52 -8" stroke="#388E3C" strokeWidth="1" fill="none" opacity="0.6" strokeLinecap="round" />
      {/* Leaf pixel blocks */}
      <rect x="68" y="28" width="6" height="4" fill="#43A047" opacity="0.7" />
      <rect x="56" y="8" width="6" height="4" fill="#2E7D32" opacity="0.6" />
      <rect x="48" y="-8" width="4" height="4" fill="#00C853" opacity="0.55" />
      <rect x="40" y="-12" width="6" height="4" fill="#388E3C" opacity="0.5" />
      <rect x="60" y="20" width="4" height="6" fill="#00E676" opacity="0.45" />
    </g>

    {/* Antler tip vines — long cascading strands draping down */}
    <g style={{ transformOrigin: '86px -14px', animation: 'kelpSway 5s ease-in-out infinite 1s' }}>
      <path d="M86 -14 Q96 8 104 40 Q108 68 100 92 Q92 108 84 116" stroke="#2E7D32" strokeWidth="1.3" fill="none" opacity="0.7" strokeLinecap="round" />
      <path d="M88 -10 Q100 12 108 44 Q112 72 104 96 Q96 112 88 120" stroke="#1B5E20" strokeWidth="1.1" fill="none" opacity="0.6" strokeLinecap="round" />
      <path d="M84 -8 Q92 16 100 48 Q104 76 96 100" stroke="#388E3C" strokeWidth="0.9" fill="none" opacity="0.5" strokeLinecap="round" />
      <rect x="100" y="32" width="4" height="4" fill="#43A047" opacity="0.5" />
      <rect x="108" y="56" width="6" height="4" fill="#2E7D32" opacity="0.45" />
      <rect x="104" y="80" width="4" height="4" fill="#00C853" opacity="0.4" />
      <rect x="96" y="100" width="4" height="4" fill="#388E3C" opacity="0.4" />
    </g>

    {/* Crown tine vine */}
    <g style={{ transformOrigin: '88px -18px', animation: 'kelpSway 5.2s ease-in-out infinite 1.5s' }}>
      <path d="M88 -18 Q100 4 108 32 Q112 56 104 80 Q96 96 88 104" stroke="#2E7D32" strokeWidth="1.1" fill="none" opacity="0.6" strokeLinecap="round" />
      <path d="M90 -14 Q104 8 112 36 Q116 60 108 84" stroke="#43A047" strokeWidth="0.8" fill="none" opacity="0.5" strokeLinecap="round" />
      <rect x="104" y="20" width="4" height="4" fill="#00C853" opacity="0.4" />
      <rect x="112" y="44" width="4" height="4" fill="#388E3C" opacity="0.35" />
      <rect x="104" y="68" width="4" height="4" fill="#2E7D32" opacity="0.3" />
    </g>

    {/* Brow tine vine — twists around forward fork */}
    <g style={{ transformOrigin: '44px -2px', animation: 'kelpSway 4.2s ease-in-out infinite 0.3s' }}>
      <path d="M44 -2 Q36 20 28 48 Q24 72 32 96 Q40 108 48 112" stroke="#2E7D32" strokeWidth="1.1" fill="none" opacity="0.6" strokeLinecap="round" />
      <path d="M48 4 Q40 28 32 56 Q28 80 36 100" stroke="#43A047" strokeWidth="0.8" fill="none" opacity="0.5" strokeLinecap="round" />
      <rect x="32" y="36" width="4" height="4" fill="#00C853" opacity="0.4" />
      <rect x="28" y="64" width="4" height="4" fill="#388E3C" opacity="0.35" />
      <rect x="36" y="88" width="4" height="4" fill="#2E7D32" opacity="0.3" />
    </g>

    {/* Trez tine vine */}
    <g style={{ transformOrigin: '60px -14px', animation: 'kelpSway 4.8s ease-in-out infinite 1.8s' }}>
      <path d="M60 -14 Q52 8 44 36 Q40 60 48 84 Q56 100 64 108" stroke="#1B5E20" strokeWidth="1" fill="none" opacity="0.55" strokeLinecap="round" />
      <rect x="48" y="24" width="4" height="4" fill="#43A047" opacity="0.4" />
      <rect x="44" y="48" width="4" height="4" fill="#00C853" opacity="0.35" />
      <rect x="48" y="72" width="4" height="4" fill="#388E3C" opacity="0.3" />
    </g>

    {/* Nasal cavity vine — small growth from nose tip */}
    <g style={{ transformOrigin: '132px 72px', animation: 'kelpSway 3.5s ease-in-out infinite 0.2s' }}>
      <path d="M132 72 Q136 84 140 100 Q142 112 138 120" stroke="#1B5E20" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
      <path d="M128 74 Q124 88 120 104 Q118 112 122 120" stroke="#2E7D32" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
      <rect x="136" y="96" width="4" height="4" fill="#43A047" opacity="0.4" />
      <rect x="120" y="100" width="4" height="4" fill="#388E3C" opacity="0.35" />
    </g>

    {/* ═══ MOSS & ALGAE patches — pixel-block overgrowth ═══ */}
    <rect x="48" y="44" width="6" height="4" fill="#2E7D32" opacity="0.35" />
    <rect x="52" y="48" width="4" height="4" fill="#388E3C" opacity="0.3" />
    <rect x="72" y="44" width="6" height="4" fill="#2E7D32" opacity="0.3" />
    <rect x="108" y="64" width="4" height="4" fill="#388E3C" opacity="0.25" />
    <rect x="92" y="72" width="4" height="4" fill="#1B5E20" opacity="0.3" />
    <rect x="40" y="52" width="4" height="4" fill="#43A047" opacity="0.25" />
    <rect x="80" y="40" width="4" height="4" fill="#2E7D32" opacity="0.2" />
    {/* Extra moss patches */}
    <rect x="60" y="58" width="4" height="4" fill="#2E7D32" opacity="0.25" />
    <rect x="100" y="58" width="4" height="2" fill="#388E3C" opacity="0.2" />
    <rect x="44" y="48" width="4" height="2" fill="#1B5E20" opacity="0.25" />
    <rect x="116" y="70" width="4" height="4" fill="#2E7D32" opacity="0.2" />
    <rect x="86" y="68" width="4" height="2" fill="#43A047" opacity="0.2" />
    <rect x="68" y="62" width="4" height="4" fill="#1B5E20" opacity="0.2" />
    {/* Lichen spots */}
    <rect x="60" y="44" width="4" height="4" fill="#A5D6A7" opacity="0.2" />
    <rect x="100" y="56" width="4" height="4" fill="#A5D6A7" opacity="0.18" />
    <rect x="84" y="72" width="4" height="4" fill="#81C784" opacity="0.15" />
    {/* Extra lichen spots */}
    <rect x="54" y="52" width="4" height="2" fill="#A5D6A7" opacity="0.15" />
    <rect x="76" y="44" width="4" height="2" fill="#C8E6C9" opacity="0.15" />
    <rect x="112" y="62" width="4" height="2" fill="#A5D6A7" opacity="0.12" />
    <rect x="46" y="56" width="4" height="2" fill="#81C784" opacity="0.13" />
    <rect x="94" y="64" width="4" height="2" fill="#C8E6C9" opacity="0.12" />

    {/* ═══ Bone surface detail — weathering & texture ═══ */}
    <rect x="56" y="48" width="4" height="4" fill="#A89C84" opacity="0.2" />
    <rect x="64" y="52" width="4" height="4" fill="#A89C84" opacity="0.2" />
    <rect x="104" y="60" width="4" height="4" fill="#C4B8A0" opacity="0.15" />
    <rect x="88" y="76" width="4" height="4" fill="#C4B8A0" opacity="0.2" />
    <rect x="112" y="72" width="4" height="4" fill="#A89C84" opacity="0.15" />
    <rect x="76" y="80" width="4" height="4" fill="#A89C84" opacity="0.15" />
    {/* Extra weathering — pitting, discoloration, aging marks */}
    <rect x="50" y="44" width="2" height="2" fill="#8B7D68" opacity="0.15" />
    <rect x="70" y="50" width="2" height="2" fill="#8B7D68" opacity="0.12" />
    <rect x="82" y="46" width="2" height="2" fill="#A89C84" opacity="0.18" />
    <rect x="62" y="56" width="2" height="2" fill="#8B7D68" opacity="0.12" />
    <rect x="94" y="58" width="2" height="2" fill="#C4B8A0" opacity="0.15" />
    <rect x="106" y="66" width="2" height="2" fill="#8B7D68" opacity="0.12" />
    <rect x="118" y="72" width="2" height="2" fill="#A89C84" opacity="0.13" />
    <rect x="74" y="76" width="2" height="2" fill="#8B7D68" opacity="0.12" />
    <rect x="48" y="58" width="2" height="2" fill="#C4B8A0" opacity="0.15" />
    <rect x="84" y="80" width="2" height="2" fill="#A89C84" opacity="0.13" />
    <rect x="102" y="82" width="2" height="2" fill="#8B7D68" opacity="0.1" />
    <rect x="124" y="72" width="2" height="2" fill="#C4B8A0" opacity="0.12" />

    {/* ═══ Deep bone cracks — long fracture lines across skull ═══ */}
    <rect x="52" y="44" width="1" height="10" fill="#6B5D48" opacity="0.18" />
    <rect x="53" y="52" width="1" height="6" fill="#6B5D48" opacity="0.15" />
    <rect x="70" y="42" width="1" height="12" fill="#6B5D48" opacity="0.16" />
    <rect x="71" y="52" width="1" height="8" fill="#6B5D48" opacity="0.13" />
    <rect x="100" y="54" width="1" height="14" fill="#6B5D48" opacity="0.14" />
    <rect x="114" y="62" width="1" height="10" fill="#6B5D48" opacity="0.12" />
    <rect x="88" y="70" width="1" height="8" fill="#6B5D48" opacity="0.13" />
    {/* Crack branching */}
    <rect x="53" y="48" width="4" height="1" fill="#6B5D48" opacity="0.12" />
    <rect x="71" y="46" width="3" height="1" fill="#6B5D48" opacity="0.11" />
    <rect x="101" y="60" width="3" height="1" fill="#6B5D48" opacity="0.1" />

    {/* ═══ Antler groove detail — longitudinal ridges ═══ */}
    <rect x="62" y="22" width="1" height="8" fill="#A09480" opacity="0.25" />
    <rect x="64" y="14" width="1" height="8" fill="#A09480" opacity="0.22" />
    <rect x="70" y="6" width="1" height="8" fill="#A09480" opacity="0.2" />
    <rect x="74" y="-2" width="1" height="8" fill="#A09480" opacity="0.18" />
    <rect x="54" y="14" width="1" height="8" fill="#A09480" opacity="0.2" />
    <rect x="50" y="6" width="1" height="8" fill="#A09480" opacity="0.18" />

    {/* ═══ Barnacle clusters on skull ═══ */}
    <rect x="42" y="56" width="4" height="3" fill="#9CA3AF" opacity="0.3" />
    <rect x="44" y="58" width="2" height="2" fill="#B0BEC5" opacity="0.25" />
    <rect x="108" y="68" width="3" height="3" fill="#9CA3AF" opacity="0.25" />
    <rect x="78" y="82" width="4" height="3" fill="#9CA3AF" opacity="0.2" />
    <rect x="62" y="38" width="3" height="3" fill="#B0BEC5" opacity="0.2" />

    {/* ═══ Small coral growth on antler base ═══ */}
    <rect x="58" y="34" width="4" height="3" fill="#E91E63" opacity="0.2" />
    <rect x="56" y="32" width="3" height="3" fill="#F48FB1" opacity="0.15" />
    <rect x="84" y="-8" width="3" height="3" fill="#C2185B" opacity="0.15" />

    {/* ═══ Sand/debris at skull base ═══ */}
    <rect x="36" y="86" width="100" height="4" fill="#C4A862" opacity="0.15" />
    <rect x="40" y="88" width="20" height="3" fill="#D4B872" opacity="0.12" />
    <rect x="100" y="88" width="24" height="3" fill="#D4B872" opacity="0.1" />
    <rect x="70" y="90" width="16" height="2" fill="#B89B52" opacity="0.1" />
  </g>
))
DeerSkullWillow.displayName = 'DeerSkullWillow'


// ═══════════════════════════════════════════════════════════════════════
// THEMED LAYOUT CONFIGS
// Two-layer depth system with z-axis perspective (top = back of tank):
//   midground  (z-12): plants rooted at back sand (baseY=240) + structures (same SVG for correct layering)
//   foreground (z-25): rocks, corals, aquatic plants at front glass (baseY=305) — scaled ~2.5x for prominence
// ═══════════════════════════════════════════════════════════════════════

interface LayeredDecoConfig {
  sandColors?: { color: string; lighter: string; detail: string }
  background: {
    kelps: Array<{ x: number; height: number; variant: 'thin' | 'wide' | 'bushy'; color: string; delay: number }>
  }
  midground: {
    structures: Array<{ type: string; x: number; y: number; scale?: number }>
  }
  foreground: {
    rocks: Array<{ x: number; y: number; variant: 'small' | 'medium' | 'large'; color: string }>
    corals: Array<{ x: number; y: number; variant: 'branch' | 'brain' | 'fan'; color: string }>
    kelps: Array<{ x: number; height: number; variant: 'thin' | 'wide' | 'bushy'; color: string; delay: number }>
  }
}

const OCEAN_LAYOUT: LayeredDecoConfig = {
  background: {
    kelps: [
      // Left bushy cluster
      { x: 5, height: 175, variant: 'bushy', color: '#2E7D32', delay: 0 },
      { x: 18, height: 155, variant: 'bushy', color: '#1B5E20', delay: 0.3 },
      { x: 32, height: 165, variant: 'bushy', color: '#2E7D32', delay: 0.7 },
      { x: 45, height: 140, variant: 'bushy', color: '#1B5E20', delay: 0.2 },
      // Left-center wide cluster
      { x: 65, height: 160, variant: 'wide', color: '#388E3C', delay: 0.4 },
      { x: 80, height: 145, variant: 'wide', color: '#4CAF50', delay: 0.9 },
      { x: 95, height: 155, variant: 'wide', color: '#388E3C', delay: 0.6 },
      // Thin grass blades transition
      { x: 115, height: 170, variant: 'thin', color: '#43A047', delay: 1.1 },
      { x: 125, height: 150, variant: 'thin', color: '#2E7D32', delay: 0.5 },
      { x: 135, height: 160, variant: 'thin', color: '#43A047', delay: 0.8 },
      { x: 148, height: 140, variant: 'thin', color: '#4CAF50', delay: 1.3 },
      // Mid-left bushy patch
      { x: 370, height: 165, variant: 'bushy', color: '#1B5E20', delay: 0.3 },
      { x: 385, height: 150, variant: 'bushy', color: '#2E7D32', delay: 0.8 },
      { x: 400, height: 170, variant: 'bushy', color: '#1B5E20', delay: 0.5 },
      // Mid wide cluster
      { x: 420, height: 155, variant: 'wide', color: '#388E3C', delay: 0.4 },
      { x: 435, height: 140, variant: 'wide', color: '#4CAF50', delay: 1.0 },
      { x: 450, height: 150, variant: 'wide', color: '#388E3C', delay: 0.7 },
      // Mid thin grass
      { x: 470, height: 160, variant: 'thin', color: '#43A047', delay: 1.4 },
      { x: 480, height: 145, variant: 'thin', color: '#2E7D32', delay: 0.6 },
      // Right bushy cluster
      { x: 690, height: 175, variant: 'bushy', color: '#2E7D32', delay: 0.5 },
      { x: 705, height: 155, variant: 'bushy', color: '#1B5E20', delay: 1.0 },
      { x: 718, height: 165, variant: 'bushy', color: '#2E7D32', delay: 0.3 },
      // Right wide cluster
      { x: 738, height: 150, variant: 'wide', color: '#388E3C', delay: 0.8 },
      { x: 752, height: 140, variant: 'wide', color: '#4CAF50', delay: 1.2 },
      // Right thin grass
      { x: 770, height: 160, variant: 'thin', color: '#43A047', delay: 1.6 },
      { x: 782, height: 145, variant: 'thin', color: '#2E7D32', delay: 0.4 },
      { x: 793, height: 155, variant: 'thin', color: '#4CAF50', delay: 0.9 },
    ],
  },
  midground: {
    structures: [
      { type: 'coral-arch', x: 180, y: 126 },
      { type: 'sunken-temple', x: 500, y: 130 },
    ],
  },
  foreground: {
    rocks: [
      { x: 42, y: 254, variant: 'medium', color: '#78716C' },
      { x: 692, y: 272, variant: 'small', color: '#78716C' },
    ],
    corals: [
      { x: 73, y: 240, variant: 'branch', color: '#E91E63' },
      { x: 328, y: 258, variant: 'brain', color: '#AB47BC' },
      { x: 448, y: 242, variant: 'fan', color: '#FF5722' },
      { x: 740, y: 250, variant: 'branch', color: '#F06292' },
    ],
    kelps: [
      // Left cluster — thin Vallisneria group near glass edge
      { x: 8, height: 36, variant: 'thin', color: '#388E3C', delay: 0.2 },
      { x: 18, height: 30, variant: 'thin', color: '#4CAF50', delay: 0.7 },
      { x: 28, height: 34, variant: 'thin', color: '#388E3C', delay: 0.4 },
      // Left-center cluster — Amazon Sword rosettes
      { x: 95, height: 36, variant: 'wide', color: '#2E7D32', delay: 1.3 },
      { x: 108, height: 30, variant: 'wide', color: '#1B5E20', delay: 0.8 },
      // --- open swim lane ---
      // Center-left — thin grass accent
      { x: 270, height: 26, variant: 'thin', color: '#43A047', delay: 0.4 },
      { x: 280, height: 30, variant: 'thin', color: '#388E3C', delay: 1.0 },
      // --- open swim lane ---
      // Center-right — wide Amazon Swords
      { x: 530, height: 36, variant: 'wide', color: '#388E3C', delay: 0.9 },
      { x: 542, height: 30, variant: 'wide', color: '#2E7D32', delay: 0.3 },
      // Right cluster — thin Vallisneria carpet
      { x: 690, height: 36, variant: 'thin', color: '#2E7D32', delay: 1.1 },
      { x: 700, height: 30, variant: 'thin', color: '#43A047', delay: 0.7 },
      { x: 710, height: 34, variant: 'thin', color: '#1B5E20', delay: 1.6 },
    ],
  },
}

const TROPICAL_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#D4A43A', lighter: '#E8C468', detail: '#B8862D' },
  background: {
    kelps: [
      // Left bushy cluster
      { x: 5, height: 180, variant: 'bushy', color: '#00C853', delay: 0 },
      { x: 18, height: 160, variant: 'bushy', color: '#00BFA5', delay: 0.4 },
      { x: 32, height: 170, variant: 'bushy', color: '#00C853', delay: 0.8 },
      { x: 45, height: 145, variant: 'bushy', color: '#00BFA5', delay: 0.2 },
      // Left wide cluster
      { x: 65, height: 165, variant: 'wide', color: '#00E676', delay: 0.5 },
      { x: 78, height: 150, variant: 'wide', color: '#00E676', delay: 1.0 },
      { x: 92, height: 155, variant: 'wide', color: '#64DD17', delay: 0.7 },
      // Left thin grass
      { x: 110, height: 175, variant: 'thin', color: '#76FF03', delay: 0.9 },
      { x: 120, height: 155, variant: 'thin', color: '#64DD17', delay: 0.3 },
      { x: 130, height: 165, variant: 'thin', color: '#76FF03', delay: 1.2 },
      { x: 142, height: 145, variant: 'thin', color: '#00E676', delay: 0.6 },
      // Right bushy cluster
      { x: 650, height: 170, variant: 'bushy', color: '#00C853', delay: 0.4 },
      { x: 663, height: 155, variant: 'bushy', color: '#00BFA5', delay: 0.9 },
      { x: 676, height: 165, variant: 'bushy', color: '#00C853', delay: 0.2 },
      { x: 690, height: 145, variant: 'bushy', color: '#00BFA5', delay: 0.7 },
      // Right wide cluster
      { x: 710, height: 160, variant: 'wide', color: '#76FF03', delay: 0.8 },
      { x: 723, height: 145, variant: 'wide', color: '#00E676', delay: 1.3 },
      { x: 736, height: 155, variant: 'wide', color: '#64DD17', delay: 0.5 },
      // Right thin grass
      { x: 755, height: 170, variant: 'thin', color: '#76FF03', delay: 1.1 },
      { x: 767, height: 150, variant: 'thin', color: '#00E676', delay: 0.3 },
      { x: 778, height: 160, variant: 'thin', color: '#64DD17', delay: 0.6 },
      { x: 790, height: 145, variant: 'thin', color: '#00C853', delay: 1.5 },
    ],
  },
  midground: {
    structures: [
      { type: 'volcano', x: 160, y: 136 },
      { type: 'dragon-stone', x: 480, y: 126 },
    ],
  },
  foreground: {
    rocks: [
      { x: 88, y: 273, variant: 'small', color: '#A8A29E' },
      { x: 590, y: 253, variant: 'medium', color: '#78716C' },
    ],
    corals: [
      { x: 112, y: 240, variant: 'branch', color: '#FF6D00' },
      { x: 238, y: 258, variant: 'brain', color: '#FF4081' },
      { x: 302, y: 242, variant: 'fan', color: '#FF1744' },
      { x: 572, y: 249, variant: 'branch', color: '#FF9100' },
    ],
    kelps: [
      // Left cluster — bushy Rotala group
      { x: 8, height: 36, variant: 'bushy', color: '#69F0AE', delay: 0.2 },
      { x: 22, height: 30, variant: 'bushy', color: '#00E676', delay: 0.6 },
      // Left-mid — wide sword pair
      { x: 90, height: 30, variant: 'wide', color: '#00E676', delay: 1.3 },
      { x: 104, height: 36, variant: 'wide', color: '#76FF03', delay: 0.4 },
      // --- open swim lane ---
      // Center-left — thin Vallisneria trio
      { x: 250, height: 36, variant: 'thin', color: '#69F0AE', delay: 1.0 },
      { x: 260, height: 30, variant: 'thin', color: '#00E676', delay: 1.7 },
      { x: 270, height: 34, variant: 'thin', color: '#B9F6CA', delay: 0.8 },
      // --- open swim lane ---
      // Right-mid — wide swords near rock
      { x: 510, height: 36, variant: 'wide', color: '#69F0AE', delay: 0.5 },
      { x: 524, height: 30, variant: 'wide', color: '#76FF03', delay: 1.4 },
      // Right cluster — thin grass carpet
      { x: 700, height: 30, variant: 'thin', color: '#00E676', delay: 0.3 },
      { x: 710, height: 36, variant: 'thin', color: '#69F0AE', delay: 0.9 },
      { x: 720, height: 26, variant: 'thin', color: '#B9F6CA', delay: 1.6 },
    ],
  },
}

const SHIPWRECK_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#8B7355', lighter: '#A08B6C', detail: '#6B5B45' },
  background: {
    kelps: [
      // Far background plants — well away from ship, behind everything
      // Mid bushy cluster 2
      { x: 360, height: 160, variant: 'bushy', color: '#2E7D32', delay: 0.5 },
      { x: 373, height: 145, variant: 'bushy', color: '#1B5E20', delay: 1.0 },
      { x: 386, height: 155, variant: 'bushy', color: '#2E7D32', delay: 0.3 },
      // Mid wide cluster
      { x: 400, height: 150, variant: 'wide', color: '#33691E', delay: 1.1 },
      { x: 413, height: 140, variant: 'wide', color: '#558B2F', delay: 0.6 },
      // Thin near treasure
      { x: 430, height: 165, variant: 'thin', color: '#1B5E20', delay: 0.7 },
      { x: 440, height: 148, variant: 'thin', color: '#2E7D32', delay: 1.3 },
      // Right bushy cluster
      { x: 530, height: 170, variant: 'bushy', color: '#2E7D32', delay: 1.5 },
      { x: 543, height: 150, variant: 'bushy', color: '#33691E', delay: 0.4 },
      { x: 556, height: 160, variant: 'bushy', color: '#1B5E20', delay: 0.9 },
      // Right wide
      { x: 590, height: 155, variant: 'wide', color: '#558B2F', delay: 1.8 },
      { x: 603, height: 145, variant: 'wide', color: '#2E7D32', delay: 0.2 },
    ],
  },
  midground: {
    structures: [
      { type: 'shipwreck', x: 40, y: 112 },
      { type: 'treasure', x: 640, y: 146 },
    ],
  },
  foreground: {
    rocks: [
      { x: 24, y: 244, variant: 'large', color: '#57534E' },
      { x: 693, y: 266, variant: 'medium', color: '#57534E' },
    ],
    corals: [
      { x: 308, y: 243, variant: 'branch', color: '#6D4C41' },
      { x: 500, y: 260, variant: 'brain', color: '#795548' },
      { x: 760, y: 241, variant: 'fan', color: '#8D6E63' },
    ],
    kelps: [
      // Ship-adjacent plants — in front of ship, fish swim behind these
      // Left wide cluster (flanking ship)
      { x: 5, height: 40, variant: 'wide', color: '#2E7D32', delay: 0 },
      { x: 18, height: 36, variant: 'wide', color: '#33691E', delay: 0.5 },
      { x: 32, height: 38, variant: 'wide', color: '#2E7D32', delay: 0.2 },
      // Left bushy cluster (near ship bow)
      { x: 50, height: 42, variant: 'bushy', color: '#33691E', delay: 0.4 },
      { x: 63, height: 36, variant: 'bushy', color: '#1B5E20', delay: 0.9 },
      { x: 76, height: 40, variant: 'bushy', color: '#33691E', delay: 0.6 },
      // Near-wreck cluster — sparse thin grass (damaged area)
      { x: 155, height: 30, variant: 'thin', color: '#558B2F', delay: 0.9 },
      { x: 165, height: 34, variant: 'thin', color: '#2E7D32', delay: 0.5 },
      // Scattered thin near wreck stern
      { x: 210, height: 32, variant: 'thin', color: '#558B2F', delay: 0.9 },
      { x: 222, height: 28, variant: 'thin', color: '#2E7D32', delay: 0.3 },
      { x: 234, height: 34, variant: 'thin', color: '#558B2F', delay: 0.7 },
      // Mid bushy cluster
      { x: 270, height: 38, variant: 'bushy', color: '#1B5E20', delay: 0.3 },
      { x: 283, height: 34, variant: 'bushy', color: '#2E7D32', delay: 0.8 },
      // Mid-left — wide swords cluster
      { x: 310, height: 36, variant: 'wide', color: '#1B5E20', delay: 1.3 },
      { x: 324, height: 30, variant: 'wide', color: '#33691E', delay: 0.7 },
      // --- open swim lane ---
      // Center — thin grass patch
      { x: 455, height: 30, variant: 'thin', color: '#2E7D32', delay: 0.8 },
      { x: 465, height: 36, variant: 'thin', color: '#33691E', delay: 1.5 },
      { x: 475, height: 26, variant: 'thin', color: '#2E7D32', delay: 0.3 },
      // --- open swim lane ---
      // Right cluster — wide swords near treasure
      { x: 695, height: 30, variant: 'wide', color: '#558B2F', delay: 0.4 },
      { x: 708, height: 36, variant: 'wide', color: '#2E7D32', delay: 1.0 },
      // Far right edge — thin accent
      { x: 755, height: 30, variant: 'thin', color: '#2E7D32', delay: 0.3 },
    ],
  },
}

const SAILBOAT_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#C4A862', lighter: '#D4B872', detail: '#B89B52' },
  background: {
    kelps: [
      // Left bushy cluster
      { x: 5, height: 170, variant: 'bushy', color: '#2E7D32', delay: 0 },
      { x: 18, height: 155, variant: 'bushy', color: '#1B5E20', delay: 0.5 },
      { x: 32, height: 165, variant: 'bushy', color: '#2E7D32', delay: 0.2 },
      { x: 45, height: 140, variant: 'bushy', color: '#1B5E20', delay: 0.8 },
      // Left wide cluster
      { x: 65, height: 160, variant: 'wide', color: '#388E3C', delay: 0.4 },
      { x: 78, height: 145, variant: 'wide', color: '#4CAF50', delay: 1.0 },
      { x: 92, height: 150, variant: 'wide', color: '#388E3C', delay: 0.6 },
      // Left thin grass
      { x: 112, height: 165, variant: 'thin', color: '#43A047', delay: 0.8 },
      { x: 122, height: 148, variant: 'thin', color: '#2E7D32', delay: 1.3 },
      { x: 132, height: 155, variant: 'thin', color: '#4CAF50', delay: 0.3 },
      { x: 142, height: 140, variant: 'thin', color: '#43A047', delay: 1.5 },
      // Right bushy cluster
      { x: 610, height: 175, variant: 'bushy', color: '#2E7D32', delay: 0.3 },
      { x: 623, height: 155, variant: 'bushy', color: '#1B5E20', delay: 0.7 },
      { x: 636, height: 165, variant: 'bushy', color: '#2E7D32', delay: 1.1 },
      { x: 650, height: 145, variant: 'bushy', color: '#1B5E20', delay: 0.4 },
      // Right wide cluster
      { x: 670, height: 160, variant: 'wide', color: '#388E3C', delay: 0.9 },
      { x: 683, height: 148, variant: 'wide', color: '#4CAF50', delay: 0.2 },
      { x: 696, height: 155, variant: 'wide', color: '#388E3C', delay: 1.4 },
      // Right thin grass
      { x: 720, height: 165, variant: 'thin', color: '#43A047', delay: 0.7 },
      { x: 732, height: 150, variant: 'thin', color: '#2E7D32', delay: 1.0 },
      { x: 744, height: 155, variant: 'thin', color: '#4CAF50', delay: 0.5 },
      { x: 758, height: 140, variant: 'thin', color: '#43A047', delay: 1.7 },
      { x: 770, height: 150, variant: 'thin', color: '#2E7D32', delay: 0.3 },
    ],
  },
  midground: {
    structures: [
      { type: 'sailboat', x: 334, y: 174, scale: 1.8 },
      { type: 'anchor', x: 600, y: 140 },
    ],
  },
  foreground: {
    rocks: [
      { x: 72, y: 255, variant: 'medium', color: '#78716C' },
      { x: 695, y: 268, variant: 'medium', color: '#57534E' },
    ],
    corals: [
      { x: 192, y: 242, variant: 'branch', color: '#FF6D00' },
      { x: 700, y: 256, variant: 'fan', color: '#FF8A65' },
      { x: 575, y: 244, variant: 'brain', color: '#FFAB91' },
    ],
    kelps: [
      // Left edge — thin Vallisneria cluster
      { x: 8, height: 30, variant: 'thin', color: '#388E3C', delay: 0.2 },
      { x: 18, height: 36, variant: 'thin', color: '#4CAF50', delay: 0.6 },
      { x: 28, height: 26, variant: 'thin', color: '#388E3C', delay: 1.2 },
      // Left-center — wide Amazon Sword pair
      { x: 155, height: 36, variant: 'wide', color: '#2E7D32', delay: 0.4 },
      { x: 168, height: 30, variant: 'wide', color: '#43A047', delay: 1.0 },
      // --- open swim lane ---
      // Center — bushy Rotala accent
      { x: 375, height: 36, variant: 'bushy', color: '#43A047', delay: 1.6 },
      { x: 388, height: 30, variant: 'bushy', color: '#388E3C', delay: 0.8 },
      // --- open swim lane ---
      // Right — thin grass cluster
      { x: 645, height: 30, variant: 'thin', color: '#2E7D32', delay: 1.4 },
      { x: 655, height: 36, variant: 'thin', color: '#4CAF50', delay: 0.3 },
      { x: 665, height: 26, variant: 'thin', color: '#388E3C', delay: 0.9 },
    ],
  },
}

const SUBMARINE_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#5C5C5C', lighter: '#787878', detail: '#454545' },
  background: {
    kelps: [
      // Left wide cluster
      { x: 5, height: 165, variant: 'wide', color: '#1B5E20', delay: 0 },
      { x: 18, height: 148, variant: 'wide', color: '#1B5E20', delay: 0.5 },
      { x: 32, height: 155, variant: 'wide', color: '#2E7D32', delay: 0.2 },
      // Left bushy cluster
      { x: 50, height: 170, variant: 'bushy', color: '#2E7D32', delay: 0.4 },
      { x: 63, height: 150, variant: 'bushy', color: '#33691E', delay: 0.9 },
      { x: 76, height: 160, variant: 'bushy', color: '#2E7D32', delay: 0.6 },
      // Left thin grass
      { x: 95, height: 155, variant: 'thin', color: '#33691E', delay: 0.8 },
      { x: 105, height: 140, variant: 'thin', color: '#2E7D32', delay: 1.3 },
      { x: 115, height: 148, variant: 'thin', color: '#33691E', delay: 0.3 },
      // Right thin cluster
      { x: 600, height: 160, variant: 'thin', color: '#33691E', delay: 0.3 },
      { x: 610, height: 145, variant: 'thin', color: '#2E7D32', delay: 0.8 },
      { x: 622, height: 155, variant: 'thin', color: '#33691E', delay: 0.5 },
      // Right bushy cluster
      { x: 640, height: 170, variant: 'bushy', color: '#2E7D32', delay: 0.5 },
      { x: 653, height: 150, variant: 'bushy', color: '#33691E', delay: 1.0 },
      { x: 666, height: 162, variant: 'bushy', color: '#2E7D32', delay: 0.3 },
      { x: 680, height: 145, variant: 'bushy', color: '#33691E', delay: 0.7 },
      // Right wide cluster
      { x: 700, height: 160, variant: 'wide', color: '#1B5E20', delay: 1.0 },
      { x: 713, height: 148, variant: 'wide', color: '#2E7D32', delay: 0.4 },
      { x: 726, height: 155, variant: 'wide', color: '#1B5E20', delay: 1.5 },
      // Far right thin
      { x: 748, height: 165, variant: 'thin', color: '#2E7D32', delay: 0.9 },
      { x: 758, height: 148, variant: 'thin', color: '#33691E', delay: 0.2 },
    ],
  },
  midground: {
    structures: [
      { type: 'submarine', x: 221, y: 77, scale: 1.9 },
    ],
  },
  foreground: {
    rocks: [
      { x: 58, y: 244, variant: 'large', color: '#44403C' },
      { x: 688, y: 266, variant: 'medium', color: '#44403C' },
    ],
    corals: [
      { x: 152, y: 258, variant: 'brain', color: '#795548' },
      { x: 660, y: 241, variant: 'branch', color: '#6D4C41' },
      { x: 750, y: 255, variant: 'fan', color: '#8D6E63' },
    ],
    kelps: [
      // Left edge — thin grass pair (sparse, industrial feel)
      { x: 15, height: 30, variant: 'thin', color: '#2E7D32', delay: 0.3 },
      { x: 25, height: 26, variant: 'thin', color: '#33691E', delay: 0.7 },
      // Near brain coral — wide swords
      { x: 125, height: 36, variant: 'wide', color: '#1B5E20', delay: 1.0 },
      { x: 138, height: 30, variant: 'wide', color: '#2E7D32', delay: 1.4 },
      // --- open swim lane ---
      // Mid — sparse thin cluster
      { x: 370, height: 30, variant: 'thin', color: '#1B5E20', delay: 0.5 },
      { x: 380, height: 36, variant: 'thin', color: '#2E7D32', delay: 1.8 },
      { x: 390, height: 26, variant: 'thin', color: '#33691E', delay: 0.9 },
      // --- open swim lane ---
      // Right — wide pair near fan coral
      { x: 635, height: 30, variant: 'wide', color: '#2E7D32', delay: 0.2 },
      { x: 648, height: 36, variant: 'wide', color: '#1B5E20', delay: 1.2 },
      // Far right — thin accent
      { x: 760, height: 30, variant: 'thin', color: '#2E7D32', delay: 1.6 },
    ],
  },
}

const MINIMAL_LAYOUT: LayeredDecoConfig = {
  background: {
    kelps: [
      // Dense planted tank — lush background wall grouped by species
      // Bushy cluster 1
      { x: 5, height: 180, variant: 'bushy', color: '#2E7D32', delay: 0 },
      { x: 18, height: 160, variant: 'bushy', color: '#33691E', delay: 0.4 },
      { x: 32, height: 170, variant: 'bushy', color: '#2E7D32', delay: 0.8 },
      { x: 45, height: 150, variant: 'bushy', color: '#388E3C', delay: 0.2 },
      { x: 58, height: 165, variant: 'bushy', color: '#33691E', delay: 0.6 },
      // Wide cluster 1
      { x: 78, height: 165, variant: 'wide', color: '#388E3C', delay: 0.7 },
      { x: 92, height: 150, variant: 'wide', color: '#4CAF50', delay: 1.1 },
      { x: 105, height: 160, variant: 'wide', color: '#43A047', delay: 0.3 },
      { x: 118, height: 145, variant: 'wide', color: '#388E3C', delay: 0.9 },
      // Thin cluster 1
      { x: 138, height: 175, variant: 'thin', color: '#43A047', delay: 1.3 },
      { x: 148, height: 155, variant: 'thin', color: '#2E7D32', delay: 0.5 },
      { x: 158, height: 165, variant: 'thin', color: '#388E3C', delay: 1.0 },
      { x: 168, height: 148, variant: 'thin', color: '#4CAF50', delay: 0.2 },
      // Bushy cluster 2
      { x: 190, height: 170, variant: 'bushy', color: '#2E7D32', delay: 0.8 },
      { x: 203, height: 155, variant: 'bushy', color: '#33691E', delay: 0.3 },
      { x: 216, height: 162, variant: 'bushy', color: '#388E3C', delay: 1.2 },
      { x: 230, height: 148, variant: 'bushy', color: '#2E7D32', delay: 0.6 },
      // Wide cluster 2
      { x: 250, height: 165, variant: 'wide', color: '#4CAF50', delay: 1.5 },
      { x: 263, height: 150, variant: 'wide', color: '#43A047', delay: 0.4 },
      { x: 276, height: 158, variant: 'wide', color: '#388E3C', delay: 0.9 },
      // Thin cluster 2
      { x: 296, height: 170, variant: 'thin', color: '#33691E', delay: 0.6 },
      { x: 306, height: 152, variant: 'thin', color: '#2E7D32', delay: 1.1 },
      { x: 316, height: 162, variant: 'thin', color: '#43A047', delay: 0.3 },
      // Bushy cluster 3
      { x: 338, height: 175, variant: 'bushy', color: '#2E7D32', delay: 1.1 },
      { x: 351, height: 155, variant: 'bushy', color: '#33691E', delay: 0.5 },
      { x: 364, height: 165, variant: 'bushy', color: '#4CAF50', delay: 0.2 },
      // Wide cluster 3
      { x: 385, height: 160, variant: 'wide', color: '#43A047', delay: 0.4 },
      { x: 398, height: 148, variant: 'wide', color: '#388E3C', delay: 0.9 },
      { x: 411, height: 155, variant: 'wide', color: '#2E7D32', delay: 1.4 },
      // Thin cluster 3
      { x: 432, height: 168, variant: 'thin', color: '#388E3C', delay: 0.9 },
      { x: 442, height: 150, variant: 'thin', color: '#4CAF50', delay: 0.3 },
      { x: 452, height: 158, variant: 'thin', color: '#33691E', delay: 0.7 },
      // Bushy cluster 4
      { x: 472, height: 172, variant: 'bushy', color: '#388E3C', delay: 1.2 },
      { x: 485, height: 155, variant: 'bushy', color: '#2E7D32', delay: 0.5 },
      { x: 498, height: 165, variant: 'bushy', color: '#33691E', delay: 0.8 },
      // Wide cluster 4
      { x: 518, height: 160, variant: 'wide', color: '#43A047', delay: 0.5 },
      { x: 531, height: 145, variant: 'wide', color: '#4CAF50', delay: 1.0 },
      { x: 544, height: 155, variant: 'wide', color: '#388E3C', delay: 0.2 },
      // Thin cluster 4
      { x: 564, height: 175, variant: 'thin', color: '#2E7D32', delay: 1.0 },
      { x: 574, height: 155, variant: 'thin', color: '#43A047', delay: 0.4 },
      { x: 584, height: 165, variant: 'thin', color: '#33691E', delay: 0.8 },
      // Bushy cluster 5
      { x: 604, height: 168, variant: 'bushy', color: '#4CAF50', delay: 0.3 },
      { x: 617, height: 152, variant: 'bushy', color: '#2E7D32', delay: 0.8 },
      { x: 630, height: 160, variant: 'bushy', color: '#388E3C', delay: 1.3 },
      // Wide cluster 5
      { x: 650, height: 162, variant: 'wide', color: '#33691E', delay: 0.8 },
      { x: 663, height: 148, variant: 'wide', color: '#43A047', delay: 0.3 },
      { x: 676, height: 155, variant: 'wide', color: '#4CAF50', delay: 1.1 },
      // Thin cluster 5
      { x: 696, height: 170, variant: 'thin', color: '#388E3C', delay: 1.3 },
      { x: 706, height: 152, variant: 'thin', color: '#2E7D32', delay: 0.6 },
      { x: 716, height: 162, variant: 'thin', color: '#43A047', delay: 0.2 },
      // Final bushy cluster
      { x: 736, height: 165, variant: 'bushy', color: '#2E7D32', delay: 0.6 },
      { x: 749, height: 148, variant: 'bushy', color: '#33691E', delay: 1.1 },
      { x: 762, height: 158, variant: 'bushy', color: '#4CAF50', delay: 0.4 },
      // Final wide
      { x: 780, height: 155, variant: 'wide', color: '#388E3C', delay: 0.9 },
      { x: 793, height: 145, variant: 'wide', color: '#2E7D32', delay: 1.5 },
    ],
  },
  midground: {
    structures: [],
  },
  foreground: {
    rocks: [
      { x: 178, y: 274, variant: 'small', color: '#78716C' },
      { x: 392, y: 262, variant: 'small', color: '#6B7280' },
      { x: 612, y: 271, variant: 'small', color: '#78716C' },
    ],
    corals: [
      { x: 108, y: 243, variant: 'branch', color: '#81C784' },
      { x: 272, y: 254, variant: 'branch', color: '#81C784' },
      { x: 458, y: 240, variant: 'fan', color: '#A5D6A7' },
      { x: 642, y: 252, variant: 'fan', color: '#81C784' },
    ],
    kelps: [
      // Dense planted foreground — species clustered in Dutch aquascaping rows
      // Left bushy Rotala cluster
      { x: 8, height: 36, variant: 'bushy', color: '#4CAF50', delay: 0.3 },
      { x: 22, height: 40, variant: 'bushy', color: '#33691E', delay: 0.7 },
      { x: 36, height: 34, variant: 'bushy', color: '#2E7D32', delay: 1.2 },
      // Wide Amazon Sword row
      { x: 58, height: 36, variant: 'wide', color: '#43A047', delay: 0.5 },
      { x: 72, height: 30, variant: 'wide', color: '#2E7D32', delay: 0.9 },
      { x: 86, height: 34, variant: 'wide', color: '#388E3C', delay: 1.5 },
      // Thin Vallisneria row
      { x: 130, height: 40, variant: 'thin', color: '#388E3C', delay: 0.4 },
      { x: 140, height: 36, variant: 'thin', color: '#4CAF50', delay: 1.0 },
      { x: 150, height: 30, variant: 'thin', color: '#2E7D32', delay: 0.6 },
      { x: 160, height: 34, variant: 'thin', color: '#43A047', delay: 1.3 },
      // Mid bushy cluster
      { x: 215, height: 36, variant: 'bushy', color: '#33691E', delay: 0.2 },
      { x: 228, height: 40, variant: 'bushy', color: '#388E3C', delay: 0.8 },
      { x: 242, height: 34, variant: 'bushy', color: '#2E7D32', delay: 1.4 },
      // Mid wide swords
      { x: 295, height: 36, variant: 'wide', color: '#4CAF50', delay: 0.3 },
      { x: 308, height: 30, variant: 'wide', color: '#43A047', delay: 0.9 },
      // Center thin grass band
      { x: 360, height: 36, variant: 'thin', color: '#388E3C', delay: 0.5 },
      { x: 370, height: 40, variant: 'thin', color: '#2E7D32', delay: 1.1 },
      { x: 380, height: 30, variant: 'thin', color: '#4CAF50', delay: 0.2 },
      // Right-center bushy
      { x: 458, height: 36, variant: 'bushy', color: '#33691E', delay: 0.8 },
      { x: 472, height: 40, variant: 'bushy', color: '#43A047', delay: 0.6 },
      // Right wide cluster
      { x: 535, height: 36, variant: 'wide', color: '#388E3C', delay: 0.9 },
      { x: 548, height: 30, variant: 'wide', color: '#2E7D32', delay: 0.5 },
      { x: 562, height: 34, variant: 'wide', color: '#43A047', delay: 1.1 },
      // Right thin carpet
      { x: 620, height: 36, variant: 'thin', color: '#4CAF50', delay: 0.6 },
      { x: 630, height: 40, variant: 'thin', color: '#2E7D32', delay: 1.3 },
      { x: 640, height: 30, variant: 'thin', color: '#388E3C', delay: 0.2 },
      // Far right bushy
      { x: 735, height: 40, variant: 'bushy', color: '#2E7D32', delay: 0.8 },
      { x: 748, height: 36, variant: 'bushy', color: '#33691E', delay: 0.4 },
      { x: 762, height: 30, variant: 'bushy', color: '#388E3C', delay: 1.0 },
    ],
  },
}

const CASTLE_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#6B6B6B', lighter: '#8A8A8A', detail: '#5A5A5A' },
  background: {
    kelps: [
      // Left bushy cluster
      { x: 5, height: 170, variant: 'bushy', color: '#1B5E20', delay: 0 },
      { x: 18, height: 150, variant: 'bushy', color: '#2E7D32', delay: 0.5 },
      { x: 32, height: 162, variant: 'bushy', color: '#1B5E20', delay: 0.2 },
      { x: 45, height: 140, variant: 'bushy', color: '#33691E', delay: 0.8 },
      // Left wide cluster
      { x: 65, height: 155, variant: 'wide', color: '#2E7D32', delay: 0.4 },
      { x: 78, height: 142, variant: 'wide', color: '#1B5E20', delay: 1.0 },
      { x: 92, height: 150, variant: 'wide', color: '#2E7D32', delay: 0.6 },
      // Left thin cluster
      { x: 112, height: 160, variant: 'thin', color: '#33691E', delay: 0.9 },
      { x: 122, height: 145, variant: 'thin', color: '#2E7D32', delay: 1.3 },
      { x: 132, height: 152, variant: 'thin', color: '#33691E', delay: 0.3 },
      // Mid thin cluster
      { x: 370, height: 160, variant: 'thin', color: '#33691E', delay: 0.3 },
      { x: 380, height: 145, variant: 'thin', color: '#2E7D32', delay: 0.7 },
      { x: 392, height: 152, variant: 'thin', color: '#33691E', delay: 1.1 },
      // Mid bushy cluster
      { x: 430, height: 168, variant: 'bushy', color: '#2E7D32', delay: 0.8 },
      { x: 443, height: 150, variant: 'bushy', color: '#1B5E20', delay: 0.3 },
      { x: 456, height: 158, variant: 'bushy', color: '#33691E', delay: 1.2 },
      // Mid wide cluster
      { x: 500, height: 155, variant: 'wide', color: '#1B5E20', delay: 1.5 },
      { x: 513, height: 140, variant: 'wide', color: '#2E7D32', delay: 0.4 },
      { x: 526, height: 148, variant: 'wide', color: '#1B5E20', delay: 0.9 },
      // Right thin cluster
      { x: 740, height: 155, variant: 'thin', color: '#2E7D32', delay: 0.5 },
      { x: 750, height: 142, variant: 'thin', color: '#33691E', delay: 1.0 },
      { x: 762, height: 150, variant: 'thin', color: '#2E7D32', delay: 0.2 },
      // Right bushy cluster
      { x: 778, height: 165, variant: 'bushy', color: '#33691E', delay: 1.1 },
      { x: 791, height: 148, variant: 'bushy', color: '#1B5E20', delay: 0.6 },
    ],
  },
  midground: {
    structures: [
      { type: 'castle', x: 200, y: 132 },
      { type: 'drawbridge', x: 560, y: 148 },
    ],
  },
  foreground: {
    rocks: [
      { x: 52, y: 244, variant: 'large', color: '#57534E' },
      { x: 712, y: 267, variant: 'medium', color: '#57534E' },
    ],
    corals: [
      { x: 148, y: 258, variant: 'brain', color: '#795548' },
      { x: 490, y: 241, variant: 'branch', color: '#6D4C41' },
      { x: 720, y: 255, variant: 'fan', color: '#8D6E63' },
    ],
    kelps: [
      // Left — thin grass cluster near castle ruins
      { x: 15, height: 30, variant: 'thin', color: '#2E7D32', delay: 0.3 },
      { x: 25, height: 36, variant: 'thin', color: '#1B5E20', delay: 0.8 },
      { x: 35, height: 26, variant: 'thin', color: '#33691E', delay: 1.2 },
      // Near brain coral — wide Amazon Swords
      { x: 95, height: 36, variant: 'wide', color: '#33691E', delay: 0.5 },
      { x: 108, height: 30, variant: 'wide', color: '#2E7D32', delay: 1.6 },
      // --- open swim lane ---
      // Mid — thin accent pair
      { x: 370, height: 30, variant: 'thin', color: '#2E7D32', delay: 0.2 },
      { x: 380, height: 36, variant: 'thin', color: '#1B5E20', delay: 0.9 },
      // --- open swim lane ---
      // Right — wide pair near fan coral
      { x: 645, height: 36, variant: 'wide', color: '#2E7D32', delay: 1.4 },
      { x: 658, height: 30, variant: 'wide', color: '#33691E', delay: 0.7 },
      // Far right — thin grass
      { x: 755, height: 30, variant: 'thin', color: '#33691E', delay: 0.4 },
      { x: 765, height: 36, variant: 'thin', color: '#2E7D32', delay: 1.0 },
    ],
  },
}

const PYRAMID_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#C4A862', lighter: '#D4B872', detail: '#A08B52' },
  background: {
    kelps: [
      // Left wide cluster
      { x: 5, height: 165, variant: 'wide', color: '#2E7D32', delay: 0 },
      { x: 18, height: 148, variant: 'wide', color: '#558B2F', delay: 0.5 },
      { x: 32, height: 158, variant: 'wide', color: '#2E7D32', delay: 0.2 },
      // Left bushy cluster
      { x: 50, height: 170, variant: 'bushy', color: '#558B2F', delay: 0.5 },
      { x: 63, height: 152, variant: 'bushy', color: '#2E7D32', delay: 1.0 },
      { x: 76, height: 162, variant: 'bushy', color: '#388E3C', delay: 0.3 },
      // Left thin grass
      { x: 95, height: 155, variant: 'thin', color: '#388E3C', delay: 1.0 },
      { x: 105, height: 140, variant: 'thin', color: '#558B2F', delay: 0.4 },
      { x: 115, height: 148, variant: 'thin', color: '#2E7D32', delay: 0.8 },
      // Mid bushy cluster
      { x: 270, height: 168, variant: 'bushy', color: '#2E7D32', delay: 0.3 },
      { x: 283, height: 150, variant: 'bushy', color: '#558B2F', delay: 0.7 },
      { x: 296, height: 160, variant: 'bushy', color: '#388E3C', delay: 1.2 },
      // Mid wide cluster
      { x: 340, height: 155, variant: 'wide', color: '#558B2F', delay: 0.6 },
      { x: 353, height: 142, variant: 'wide', color: '#2E7D32', delay: 1.1 },
      { x: 366, height: 150, variant: 'wide', color: '#388E3C', delay: 0.4 },
      // Mid-right bushy
      { x: 470, height: 165, variant: 'bushy', color: '#388E3C', delay: 0.9 },
      { x: 483, height: 148, variant: 'bushy', color: '#2E7D32', delay: 0.3 },
      { x: 496, height: 158, variant: 'bushy', color: '#558B2F', delay: 1.4 },
      // Right thin cluster
      { x: 690, height: 170, variant: 'thin', color: '#558B2F', delay: 1.2 },
      { x: 700, height: 152, variant: 'thin', color: '#2E7D32', delay: 0.5 },
      { x: 712, height: 162, variant: 'thin', color: '#388E3C', delay: 0.9 },
      // Right bushy cluster
      { x: 728, height: 160, variant: 'bushy', color: '#1B5E20', delay: 0.8 },
      { x: 741, height: 145, variant: 'bushy', color: '#2E7D32', delay: 0.3 },
      // Right wide cluster
      { x: 758, height: 155, variant: 'wide', color: '#2E7D32', delay: 1.5 },
      { x: 771, height: 142, variant: 'wide', color: '#558B2F', delay: 0.6 },
      // Far right thin
      { x: 788, height: 160, variant: 'thin', color: '#388E3C', delay: 1.8 },
      { x: 798, height: 145, variant: 'thin', color: '#2E7D32', delay: 0.4 },
    ],
  },
  midground: {
    structures: [
      { type: 'pyramid', x: 80, y: 134 },
      { type: 'sphinx', x: 520, y: 152 },
    ],
  },
  foreground: {
    rocks: [
      { x: 48, y: 254, variant: 'medium', color: '#A08B6C' },
      { x: 648, y: 244, variant: 'large', color: '#8B7355' },
    ],
    corals: [
      { x: 380, y: 243, variant: 'branch', color: '#F06292' },
      { x: 442, y: 256, variant: 'fan', color: '#E91E63' },
      { x: 710, y: 246, variant: 'brain', color: '#EC407A' },
    ],
    kelps: [
      // Left — thin grass near rock (Egyptian papyrus feel)
      { x: 10, height: 36, variant: 'thin', color: '#388E3C', delay: 0.2 },
      { x: 20, height: 30, variant: 'thin', color: '#558B2F', delay: 0.7 },
      // Left-center — wide sword pair
      { x: 95, height: 36, variant: 'wide', color: '#558B2F', delay: 1.0 },
      { x: 108, height: 30, variant: 'wide', color: '#388E3C', delay: 0.4 },
      // --- open swim lane ---
      // Center cluster — thin grass trio
      { x: 330, height: 26, variant: 'thin', color: '#2E7D32', delay: 1.3 },
      { x: 340, height: 36, variant: 'thin', color: '#388E3C', delay: 1.5 },
      { x: 350, height: 30, variant: 'thin', color: '#558B2F', delay: 0.6 },
      // --- open swim lane ---
      // Right — wide swords near large rock
      { x: 705, height: 30, variant: 'wide', color: '#388E3C', delay: 0.9 },
      { x: 718, height: 36, variant: 'wide', color: '#558B2F', delay: 1.7 },
      // Far right — thin accent
      { x: 775, height: 30, variant: 'thin', color: '#388E3C', delay: 0.3 },
    ],
  },
}

const TEMPLE_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#8D8D8D', lighter: '#A8A8A8', detail: '#6B6B6B' },
  background: {
    kelps: [
      // Left bushy cluster
      { x: 5, height: 172, variant: 'bushy', color: '#2E7D32', delay: 0 },
      { x: 18, height: 155, variant: 'bushy', color: '#1B5E20', delay: 0.5 },
      { x: 32, height: 164, variant: 'bushy', color: '#2E7D32', delay: 0.2 },
      { x: 45, height: 142, variant: 'bushy', color: '#1B5E20', delay: 0.8 },
      // Left wide cluster
      { x: 63, height: 160, variant: 'wide', color: '#388E3C', delay: 0.4 },
      { x: 76, height: 145, variant: 'wide', color: '#2E7D32', delay: 0.9 },
      { x: 90, height: 152, variant: 'wide', color: '#388E3C', delay: 0.6 },
      // Left thin cluster
      { x: 108, height: 158, variant: 'thin', color: '#43A047', delay: 0.8 },
      { x: 118, height: 142, variant: 'thin', color: '#2E7D32', delay: 1.2 },
      { x: 128, height: 150, variant: 'thin', color: '#43A047', delay: 0.3 },
      // Right bushy cluster
      { x: 670, height: 175, variant: 'bushy', color: '#1B5E20', delay: 0.3 },
      { x: 683, height: 155, variant: 'bushy', color: '#2E7D32', delay: 0.7 },
      { x: 696, height: 165, variant: 'bushy', color: '#1B5E20', delay: 1.1 },
      { x: 710, height: 148, variant: 'bushy', color: '#2E7D32', delay: 0.4 },
      // Right wide cluster
      { x: 728, height: 160, variant: 'wide', color: '#388E3C', delay: 0.9 },
      { x: 741, height: 145, variant: 'wide', color: '#1B5E20', delay: 0.2 },
      { x: 754, height: 152, variant: 'wide', color: '#388E3C', delay: 1.5 },
      // Right thin cluster
      { x: 772, height: 168, variant: 'thin', color: '#43A047', delay: 0.5 },
      { x: 782, height: 150, variant: 'thin', color: '#2E7D32', delay: 1.0 },
      { x: 793, height: 158, variant: 'thin', color: '#43A047', delay: 0.3 },
    ],
  },
  midground: {
    structures: [
      { type: 'torii', x: 120, y: 130 },
      { type: 'pagoda', x: 480, y: 124 },
    ],
  },
  foreground: {
    rocks: [
      { x: 68, y: 274, variant: 'small', color: '#78716C' },
      { x: 342, y: 254, variant: 'medium', color: '#6B7280' },
    ],
    corals: [
      { x: 242, y: 243, variant: 'branch', color: '#E64A19' },
      { x: 380, y: 256, variant: 'brain', color: '#D84315' },
      { x: 700, y: 244, variant: 'fan', color: '#FF5722' },
    ],
    kelps: [
      // Left — thin grass cluster (zen garden feel)
      { x: 10, height: 30, variant: 'thin', color: '#2E7D32', delay: 0.2 },
      { x: 20, height: 36, variant: 'thin', color: '#43A047', delay: 0.6 },
      { x: 30, height: 26, variant: 'thin', color: '#388E3C', delay: 0.8 },
      // Near rock — wide Amazon Sword accent
      { x: 75, height: 36, variant: 'wide', color: '#388E3C', delay: 1.3 },
      { x: 88, height: 30, variant: 'wide', color: '#1B5E20', delay: 0.4 },
      // --- open swim lane ---
      // Center — bushy Rotala pair (asymmetric placement)
      { x: 375, height: 36, variant: 'bushy', color: '#2E7D32', delay: 0.5 },
      { x: 388, height: 30, variant: 'bushy', color: '#1B5E20', delay: 1.0 },
      // --- open swim lane ---
      // Right — thin grass trio near fan coral
      { x: 555, height: 36, variant: 'thin', color: '#388E3C', delay: 1.5 },
      { x: 565, height: 30, variant: 'thin', color: '#2E7D32', delay: 0.7 },
      // Far right — wide pair
      { x: 735, height: 36, variant: 'wide', color: '#43A047', delay: 1.8 },
      { x: 748, height: 30, variant: 'wide', color: '#2E7D32', delay: 0.3 },
    ],
  },
}

const ATLANTIS_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#1A5276', lighter: '#2471A3', detail: '#154360' },
  background: {
    kelps: [
      // Left bushy cluster
      { x: 5, height: 175, variant: 'bushy', color: '#00695C', delay: 0 },
      { x: 18, height: 155, variant: 'bushy', color: '#004D40', delay: 0.4 },
      { x: 32, height: 165, variant: 'bushy', color: '#00695C', delay: 0.8 },
      { x: 45, height: 142, variant: 'bushy', color: '#00897B', delay: 0.2 },
      // Left wide cluster
      { x: 63, height: 162, variant: 'wide', color: '#004D40', delay: 0.9 },
      { x: 76, height: 145, variant: 'wide', color: '#00695C', delay: 0.3 },
      { x: 90, height: 155, variant: 'wide', color: '#004D40', delay: 1.3 },
      // Left thin cluster
      { x: 108, height: 160, variant: 'thin', color: '#00897B', delay: 0.5 },
      { x: 118, height: 142, variant: 'thin', color: '#00695C', delay: 1.0 },
      { x: 128, height: 152, variant: 'thin', color: '#00897B', delay: 0.3 },
      // Mid wide cluster
      { x: 290, height: 155, variant: 'wide', color: '#004D40', delay: 0.6 },
      { x: 303, height: 140, variant: 'wide', color: '#00695C', delay: 1.1 },
      { x: 316, height: 148, variant: 'wide', color: '#004D40', delay: 0.4 },
      // Mid bushy cluster
      { x: 390, height: 168, variant: 'bushy', color: '#00897B', delay: 0.3 },
      { x: 403, height: 150, variant: 'bushy', color: '#00695C', delay: 0.8 },
      { x: 416, height: 160, variant: 'bushy', color: '#004D40', delay: 1.2 },
      // Mid thin cluster
      { x: 490, height: 158, variant: 'thin', color: '#004D40', delay: 0.7 },
      { x: 500, height: 142, variant: 'thin', color: '#00897B', delay: 0.2 },
      { x: 512, height: 150, variant: 'thin', color: '#00695C', delay: 0.9 },
      // Right wide cluster
      { x: 725, height: 165, variant: 'wide', color: '#00695C', delay: 0.8 },
      { x: 738, height: 148, variant: 'wide', color: '#004D40', delay: 0.3 },
      { x: 751, height: 155, variant: 'wide', color: '#00695C', delay: 1.1 },
      // Right bushy cluster
      { x: 768, height: 170, variant: 'bushy', color: '#004D40', delay: 0.5 },
      { x: 781, height: 152, variant: 'bushy', color: '#00695C', delay: 1.0 },
      { x: 794, height: 160, variant: 'bushy', color: '#00897B', delay: 0.4 },
    ],
  },
  midground: {
    structures: [
      { type: 'atlantean-dome', x: 100, y: 132 },
      { type: 'atlantean-obelisk', x: 560, y: 130 },
    ],
  },
  foreground: {
    rocks: [
      { x: 58, y: 254, variant: 'medium', color: '#1F618D' },
      { x: 688, y: 267, variant: 'medium', color: '#1A5276' },
    ],
    corals: [
      { x: 55, y: 243, variant: 'branch', color: '#26C6DA' },
      { x: 420, y: 252, variant: 'fan', color: '#00BCD4' },
      { x: 500, y: 260, variant: 'brain', color: '#0097A7' },
      { x: 700, y: 240, variant: 'branch', color: '#4DD0E1' },
    ],
    kelps: [
      // Left — thin teal grass cluster
      { x: 10, height: 30, variant: 'thin', color: '#00695C', delay: 0.2 },
      { x: 20, height: 36, variant: 'thin', color: '#004D40', delay: 0.6 },
      { x: 30, height: 26, variant: 'thin', color: '#00897B', delay: 1.0 },
      // Left-mid — wide swords
      { x: 75, height: 36, variant: 'wide', color: '#00897B', delay: 0.4 },
      { x: 88, height: 30, variant: 'wide', color: '#004D40', delay: 1.3 },
      // --- open swim lane ---
      // Center — bushy cluster
      { x: 335, height: 36, variant: 'bushy', color: '#00897B', delay: 0.8 },
      { x: 348, height: 30, variant: 'bushy', color: '#00695C', delay: 1.4 },
      { x: 362, height: 34, variant: 'bushy', color: '#004D40', delay: 0.5 },
      // --- open swim lane ---
      // Right-center — wide swords
      { x: 555, height: 30, variant: 'wide', color: '#00897B', delay: 1.7 },
      { x: 568, height: 36, variant: 'wide', color: '#00695C', delay: 0.2 },
      // Right — thin grass
      { x: 750, height: 36, variant: 'thin', color: '#00695C', delay: 0.9 },
      { x: 760, height: 30, variant: 'thin', color: '#004D40', delay: 1.5 },
      { x: 770, height: 26, variant: 'thin', color: '#00897B', delay: 0.4 },
    ],
  },
}

const STAGNANT_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#5C4A38', lighter: '#6B5A48', detail: '#4A3828' },
  background: {
    kelps: [
      // Dense, overgrown background — murky stagnant pool feel
      // Left heavy cluster
      { x: 5, height: 185, variant: 'bushy', color: '#1B5E20', delay: 0 },
      { x: 18, height: 168, variant: 'bushy', color: '#2E7D32', delay: 0.4 },
      { x: 32, height: 178, variant: 'bushy', color: '#1B5E20', delay: 0.8 },
      { x: 45, height: 155, variant: 'bushy', color: '#33691E', delay: 0.2 },
      { x: 58, height: 170, variant: 'bushy', color: '#2E7D32', delay: 0.6 },
      { x: 72, height: 162, variant: 'wide', color: '#33691E', delay: 1.0 },
      { x: 85, height: 148, variant: 'wide', color: '#1B5E20', delay: 0.3 },
      { x: 98, height: 158, variant: 'wide', color: '#2E7D32', delay: 0.7 },
      // Thin grass transition
      { x: 115, height: 172, variant: 'thin', color: '#33691E', delay: 1.2 },
      { x: 125, height: 155, variant: 'thin', color: '#1B5E20', delay: 0.5 },
      { x: 135, height: 165, variant: 'thin', color: '#2E7D32', delay: 0.9 },
      // Mid-left bushy
      { x: 160, height: 175, variant: 'bushy', color: '#1B5E20', delay: 0.3 },
      { x: 173, height: 158, variant: 'bushy', color: '#33691E', delay: 0.8 },
      { x: 186, height: 168, variant: 'bushy', color: '#2E7D32', delay: 0.5 },
      // Wide transition around structure
      { x: 210, height: 160, variant: 'wide', color: '#2E7D32', delay: 1.4 },
      { x: 223, height: 145, variant: 'wide', color: '#1B5E20', delay: 0.6 },
      // Right side of structure area
      { x: 480, height: 155, variant: 'wide', color: '#33691E', delay: 0.4 },
      { x: 493, height: 142, variant: 'wide', color: '#2E7D32', delay: 0.9 },
      { x: 506, height: 150, variant: 'wide', color: '#1B5E20', delay: 1.6 },
      // Mid-right bushy
      { x: 530, height: 172, variant: 'bushy', color: '#2E7D32', delay: 0.3 },
      { x: 543, height: 155, variant: 'bushy', color: '#1B5E20', delay: 0.8 },
      { x: 556, height: 165, variant: 'bushy', color: '#33691E', delay: 0.5 },
      { x: 570, height: 148, variant: 'bushy', color: '#2E7D32', delay: 1.1 },
      // Right thin cluster
      { x: 590, height: 170, variant: 'thin', color: '#33691E', delay: 0.7 },
      { x: 600, height: 152, variant: 'thin', color: '#1B5E20', delay: 0.2 },
      { x: 610, height: 162, variant: 'thin', color: '#2E7D32', delay: 1.0 },
      // Far right heavy cluster
      { x: 635, height: 180, variant: 'bushy', color: '#1B5E20', delay: 0.6 },
      { x: 648, height: 160, variant: 'bushy', color: '#2E7D32', delay: 1.3 },
      { x: 661, height: 172, variant: 'bushy', color: '#33691E', delay: 0.4 },
      { x: 675, height: 150, variant: 'bushy', color: '#1B5E20', delay: 0.9 },
      { x: 690, height: 165, variant: 'wide', color: '#2E7D32', delay: 0.5 },
      { x: 703, height: 148, variant: 'wide', color: '#33691E', delay: 1.1 },
      { x: 718, height: 158, variant: 'wide', color: '#1B5E20', delay: 0.3 },
      // Far right thin
      { x: 740, height: 175, variant: 'thin', color: '#33691E', delay: 0.8 },
      { x: 752, height: 155, variant: 'thin', color: '#2E7D32', delay: 0.2 },
      { x: 764, height: 165, variant: 'thin', color: '#1B5E20', delay: 1.5 },
      { x: 778, height: 148, variant: 'thin', color: '#2E7D32', delay: 0.6 },
      { x: 790, height: 158, variant: 'thin', color: '#33691E', delay: 1.0 },
    ],
  },
  midground: {
    structures: [
      { type: 'deer-skull', x: 200, y: 55, scale: 2.5 },
    ],
  },
  foreground: {
    rocks: [
      { x: 42, y: 244, variant: 'large', color: '#4A3828' },
      { x: 212, y: 273, variant: 'small', color: '#5C4A38' },
      { x: 572, y: 254, variant: 'medium', color: '#4A3828' },
      { x: 728, y: 246, variant: 'large', color: '#3A2A1E' },
    ],
    corals: [
      { x: 128, y: 258, variant: 'brain', color: '#6D4C41' },
      { x: 235, y: 241, variant: 'branch', color: '#5D4037' },
      { x: 600, y: 255, variant: 'fan', color: '#795548' },
      { x: 672, y: 246, variant: 'brain', color: '#4E342E' },
    ],
    kelps: [
      // Dense overgrown foreground — stagnant pool, plants everywhere
      // Left bushy Rotala mass
      { x: 5, height: 40, variant: 'bushy', color: '#1B5E20', delay: 0.3 },
      { x: 18, height: 36, variant: 'bushy', color: '#2E7D32', delay: 0.7 },
      { x: 32, height: 38, variant: 'bushy', color: '#1B5E20', delay: 1.2 },
      // Wide sword cluster
      { x: 55, height: 36, variant: 'wide', color: '#2E7D32', delay: 0.5 },
      { x: 68, height: 40, variant: 'wide', color: '#33691E', delay: 0.9 },
      { x: 82, height: 34, variant: 'wide', color: '#1B5E20', delay: 1.5 },
      // Thin overgrowth patch
      { x: 140, height: 36, variant: 'thin', color: '#33691E', delay: 0.4 },
      { x: 150, height: 40, variant: 'thin', color: '#1B5E20', delay: 1.0 },
      { x: 160, height: 30, variant: 'thin', color: '#2E7D32', delay: 0.6 },
      // Mid-left bushy
      { x: 230, height: 40, variant: 'bushy', color: '#1B5E20', delay: 1.3 },
      { x: 244, height: 36, variant: 'bushy', color: '#33691E', delay: 0.8 },
      // Center wide mass
      { x: 390, height: 40, variant: 'wide', color: '#2E7D32', delay: 1.0 },
      { x: 404, height: 36, variant: 'wide', color: '#1B5E20', delay: 0.6 },
      { x: 418, height: 38, variant: 'wide', color: '#33691E', delay: 1.4 },
      // Center-right thin
      { x: 455, height: 30, variant: 'thin', color: '#33691E', delay: 0.2 },
      { x: 465, height: 36, variant: 'thin', color: '#1B5E20', delay: 1.1 },
      // Right bushy cluster
      { x: 535, height: 40, variant: 'bushy', color: '#1B5E20', delay: 0.8 },
      { x: 548, height: 36, variant: 'bushy', color: '#2E7D32', delay: 0.3 },
      { x: 562, height: 38, variant: 'bushy', color: '#33691E', delay: 1.5 },
      // Right wide
      { x: 608, height: 36, variant: 'wide', color: '#2E7D32', delay: 0.5 },
      { x: 622, height: 40, variant: 'wide', color: '#1B5E20', delay: 1.2 },
      // Far right thin carpet
      { x: 760, height: 36, variant: 'thin', color: '#33691E', delay: 0.2 },
      { x: 770, height: 40, variant: 'thin', color: '#1B5E20', delay: 0.9 },
      { x: 780, height: 30, variant: 'thin', color: '#2E7D32', delay: 1.6 },
    ],
  },
}

const THEME_LAYOUTS: Record<string, LayeredDecoConfig> = {
  ocean: OCEAN_LAYOUT,
  tropical: TROPICAL_LAYOUT,
  shipwreck: SHIPWRECK_LAYOUT,
  sailboat: SAILBOAT_LAYOUT,
  submarine: SUBMARINE_LAYOUT,
  minimal: MINIMAL_LAYOUT,
  castle: CASTLE_LAYOUT,
  pyramid: PYRAMID_LAYOUT,
  temple: TEMPLE_LAYOUT,
  atlantis: ATLANTIS_LAYOUT,
  stagnant: STAGNANT_LAYOUT,
}

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
