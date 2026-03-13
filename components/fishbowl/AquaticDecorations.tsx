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
    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect x="2" y="4" width="8" height="4" fill={color} />
        <rect x="4" y="2" width="4" height="2" fill={lighter} />
        <rect x="3" y="4" width="2" height="2" fill={lighter} opacity="0.5" />
      </g>
    )
  }
  if (variant === 'large') {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect x="4" y="8" width="24" height="8" fill={color} />
        <rect x="6" y="4" width="20" height="6" fill={color} />
        <rect x="10" y="2" width="12" height="4" fill={lighter} />
        <rect x="8" y="6" width="4" height="4" fill={lighter} opacity="0.4" />
        <rect x="18" y="8" width="6" height="4" fill={darker} opacity="0.3" />
        <rect x="6" y="6" width="3" height="2" fill="#5D8A3C" opacity="0.6" />
        <rect x="20" y="4" width="4" height="2" fill="#5D8A3C" opacity="0.4" />
      </g>
    )
  }
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="2" y="6" width="16" height="6" fill={color} />
      <rect x="4" y="4" width="12" height="4" fill={color} />
      <rect x="6" y="2" width="8" height="4" fill={lighter} />
      <rect x="5" y="5" width="3" height="3" fill={lighter} opacity="0.4" />
      <rect x="12" y="6" width="4" height="3" fill={darker} opacity="0.3" />
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

  if (variant === 'branch') {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect x="6" y="16" width="8" height="4" fill={color} />
        <rect x="8" y="10" width="4" height="6" fill={color} />
        <rect x="4" y="6" width="4" height="6" fill={color} />
        <rect x="12" y="4" width="4" height="8" fill={color} />
        <rect x="2" y="2" width="4" height="4" fill={lighter} />
        <rect x="14" y="0" width="4" height="4" fill={lighter} />
        <rect x="8" y="6" width="4" height="4" fill={lighter} opacity="0.5" />
        <rect x="3" y="0" width="2" height="2" fill={lighter} opacity="0.7" />
        <rect x="15" y="-2" width="2" height="2" fill={lighter} opacity="0.7" />
      </g>
    )
  }
  if (variant === 'brain') {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect x="4" y="8" width="16" height="8" fill={color} />
        <rect x="6" y="4" width="12" height="6" fill={color} />
        <rect x="8" y="2" width="8" height="4" fill={lighter} />
        <rect x="8" y="6" width="8" height="1" fill={lighter} opacity="0.4" />
        <rect x="6" y="10" width="12" height="1" fill={lighter} opacity="0.4" />
        <rect x="8" y="14" width="8" height="1" fill={lighter} opacity="0.3" />
      </g>
    )
  }
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="8" y="14" width="4" height="6" fill={color} />
      <rect x="2" y="6" width="16" height="8" fill={color} opacity="0.8" />
      <rect x="4" y="2" width="12" height="6" fill={lighter} opacity="0.6" />
      <rect x="6" y="0" width="8" height="4" fill={lighter} opacity="0.4" />
      <rect x="6" y="8" width="2" height="2" fill="transparent" />
      <rect x="12" y="6" width="2" height="2" fill="transparent" />
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
    <ellipse cx="50" cy="52" rx="60" ry="5" fill="#000" opacity="0.12" />

    {/* Main hull — cylindrical pressure hull, slightly listed */}
    <rect x="10" y="16" width="80" height="28" fill="#37474F" />
    <rect x="6" y="20" width="8" height="20" fill="#455A64" />
    <rect x="86" y="20" width="12" height="20" fill="#455A64" />
    {/* Hull curvature — top arc */}
    <rect x="14" y="12" width="76" height="6" fill="#546E7A" />
    <rect x="20" y="8" width="64" height="6" fill="#607D8B" />
    <rect x="28" y="6" width="48" height="3" fill="#78909C" opacity="0.6" />
    {/* Hull bottom keel */}
    <rect x="14" y="42" width="76" height="4" fill="#263238" />
    <rect x="18" y="46" width="68" height="2" fill="#1A1A1A" opacity="0.3" />
    {/* Hull highlight strip (light reflection) */}
    <rect x="18" y="14" width="68" height="1" fill="#90A4AE" opacity="0.2" />

    {/* Hull panel lines — welded plate seams */}
    <rect x="14" y="20" width="72" height="1" fill="#2C3E50" opacity="0.3" />
    <rect x="14" y="28" width="48" height="1" fill="#2C3E50" opacity="0.25" />
    <rect x="14" y="36" width="72" height="1" fill="#2C3E50" opacity="0.2" />
    {/* Vertical seam lines */}
    <rect x="30" y="12" width="1" height="34" fill="#2C3E50" opacity="0.15" />
    <rect x="50" y="12" width="1" height="34" fill="#2C3E50" opacity="0.15" />
    <rect x="70" y="12" width="1" height="34" fill="#2C3E50" opacity="0.12" />

    {/* Rivets along hull — top and bottom rows */}
    {[16, 22, 28, 34, 40, 46, 52, 58, 72, 78, 84].map((rx, i) => (
      <circle key={`rivet-t-${i}`} cx={rx} cy={13} r="0.8" fill="#78909C" opacity="0.4" />
    ))}
    {[16, 22, 28, 34, 40, 46, 52, 58, 72, 78, 84].map((rx, i) => (
      <circle key={`rivet-b-${i}`} cx={rx} cy={43} r="0.8" fill="#546E7A" opacity="0.35" />
    ))}
    {/* Mid rivets at panel seam */}
    {[16, 24, 32, 40, 48, 56].map((rx, i) => (
      <circle key={`rivet-m-${i}`} cx={rx} cy={20} r="0.6" fill="#607D8B" opacity="0.3" />
    ))}

    {/* Torpedo tubes at bow — 4 tubes */}
    <rect x="90" y="22" width="10" height="3" fill="#455A64" />
    <rect x="90" y="27" width="10" height="3" fill="#455A64" />
    <rect x="90" y="32" width="10" height="3" fill="#455A64" />
    <circle cx="100" cy="23.5" r="1.5" fill="#1A1A1A" />
    <circle cx="100" cy="28.5" r="1.5" fill="#1A1A1A" />
    <circle cx="100" cy="33.5" r="1.5" fill="#1A1A1A" />
    {/* Torpedo tube rim highlights */}
    <circle cx="100" cy="23.5" r="1.5" fill="none" stroke="#546E7A" strokeWidth="0.5" opacity="0.4" />
    <circle cx="100" cy="28.5" r="1.5" fill="none" stroke="#546E7A" strokeWidth="0.5" opacity="0.35" />

    {/* Bow sonar dome */}
    <rect x="96" y="26" width="6" height="6" fill="#546E7A" opacity="0.5" />
    <rect x="98" y="24" width="4" height="10" fill="#455A64" opacity="0.4" />

    {/* Hydroplanes (diving fins) — with detail */}
    <rect x="4" y="18" width="8" height="2" fill="#607D8B" />
    <rect x="2" y="16" width="4" height="2" fill="#78909C" opacity="0.7" />
    <rect x="0" y="17" width="2" height="1" fill="#90A4AE" opacity="0.5" />
    <rect x="4" y="34" width="8" height="2" fill="#607D8B" />
    <rect x="2" y="36" width="4" height="2" fill="#78909C" opacity="0.7" />
    <rect x="0" y="35" width="2" height="1" fill="#90A4AE" opacity="0.5" />
    {/* Rudder fin at stern */}
    <rect x="4" y="24" width="2" height="8" fill="#546E7A" opacity="0.5" />

    {/* Conning tower (sail) — more detailed */}
    <rect x="36" y="0" width="24" height="14" fill="#455A64" />
    <rect x="38" y="-4" width="20" height="6" fill="#546E7A" />
    <rect x="40" y="-6" width="16" height="3" fill="#607D8B" />
    {/* Sail panel lines */}
    <rect x="38" y="4" width="20" height="1" fill="#37474F" opacity="0.3" />
    <rect x="38" y="8" width="20" height="1" fill="#37474F" opacity="0.25" />
    {/* Sail rivets */}
    {[40, 44, 48, 52, 56].map((rx, i) => (
      <circle key={`sr-${i}`} cx={rx} cy={-5} r="0.5" fill="#78909C" opacity="0.35" />
    ))}
    {/* Bridge windscreen / viewport */}
    <rect x="42" y="-3" width="12" height="2" fill="#0D2137" opacity="0.6" />
    <rect x="43" y="-3" width="10" height="1" fill="#1A5276" opacity="0.3" />

    {/* Periscope — bent and encrusted */}
    <rect x="46" y="-16" width="3" height="12" fill="#78909C" />
    <rect x="44" y="-18" width="6" height="3" fill="#90A4AE" />
    <rect x="48" y="-14" width="3" height="4" fill="#78909C" transform="rotate(12, 49, -12)" />
    {/* Periscope optics */}
    <rect x="44" y="-19" width="2" height="2" fill="#0D2137" opacity="0.6" />
    {/* Periscope barnacle */}
    <rect x="47" y="-10" width="2" height="2" fill="#9CA3AF" opacity="0.3" />
    {/* Radar mast */}
    <rect x="54" y="-10" width="2" height="10" fill="#78909C" />
    <rect x="52" y="-12" width="6" height="2" fill="#90A4AE" />
    {/* Radar dish */}
    <rect x="51" y="-14" width="8" height="2" fill="#B0BEC5" opacity="0.4" />
    {/* Snorkel mast */}
    <rect x="40" y="-8" width="2" height="8" fill="#607D8B" opacity="0.6" />
    <rect x="39" y="-10" width="4" height="2" fill="#78909C" opacity="0.5" />

    {/* Trailing kelp from conning tower — multiple strands */}
    <rect x="38" y="-4" width="3" height="10" fill="#2E7D32" opacity="0.35" style={{ animation: 'kelpSway 5s ease-in-out 0s infinite', transformOrigin: '39px -4px' }} />
    <rect x="56" y="-2" width="2" height="8" fill="#388E3C" opacity="0.3" style={{ animation: 'kelpSway 4s ease-in-out 1s infinite', transformOrigin: '57px -2px' }} />
    <rect x="42" y="-6" width="2" height="6" fill="#1B5E20" opacity="0.25" style={{ animation: 'kelpSway 4.5s ease-in-out 0.5s infinite', transformOrigin: '43px -6px' }} />

    {/* Hull breach (fish swim-through hole) — more dramatic */}
    <rect x="62" y="20" width="16" height="16" fill="#0A1628" opacity="0.85" />
    {/* Inner hull structure visible (ribs/frames) */}
    <rect x="63" y="20" width="1" height="16" fill="#455A64" opacity="0.4" />
    <rect x="67" y="20" width="1" height="16" fill="#455A64" opacity="0.35" />
    <rect x="71" y="20" width="1" height="16" fill="#455A64" opacity="0.3" />
    <rect x="75" y="20" width="1" height="16" fill="#455A64" opacity="0.3" />
    {/* Torn metal edges — jagged shards */}
    <rect x="60" y="20" width="3" height="5" fill="#546E7A" />
    <rect x="59" y="24" width="2" height="3" fill="#607D8B" opacity="0.7" />
    <rect x="77" y="24" width="3" height="5" fill="#546E7A" />
    <rect x="78" y="20" width="2" height="3" fill="#607D8B" opacity="0.6" />
    <rect x="64" y="18" width="5" height="3" fill="#455A64" />
    <rect x="72" y="17" width="4" height="3" fill="#546E7A" opacity="0.7" />
    <rect x="64" y="36" width="4" height="2" fill="#455A64" />
    <rect x="72" y="35" width="5" height="3" fill="#546E7A" opacity="0.6" />
    {/* Bent metal shards pointing inward */}
    <rect x="61" y="34" width="2" height="4" fill="#607D8B" opacity="0.5" />
    <rect x="76" y="22" width="2" height="4" fill="#607D8B" opacity="0.45" />
    <rect x="66" y="36" width="3" height="2" fill="#546E7A" opacity="0.4" />

    {/* Portholes — 3 with glass glint detail */}
    <circle cx="22" cy="28" r="4.5" fill="#0D2137" stroke="#607D8B" strokeWidth="2" />
    <circle cx="22" cy="28" r="2.5" fill="#1A5276" opacity="0.5" />
    <rect x="20" y="26" width="2" height="1" fill="#4FC3F7" opacity="0.3" />
    <circle cx="38" cy="28" r="4.5" fill="#0D2137" stroke="#607D8B" strokeWidth="2" />
    <circle cx="38" cy="28" r="2.5" fill="#1A5276" opacity="0.4" />
    <rect x="36" y="26" width="2" height="1" fill="#4FC3F7" opacity="0.25" />
    <circle cx="84" cy="28" r="4.5" fill="#0D2137" stroke="#607D8B" strokeWidth="2" />
    <circle cx="84" cy="28" r="2.5" fill="#1A5276" opacity="0.3" />

    {/* Hull number stencil remnant */}
    <rect x="88" y="14" width="2" height="4" fill="#B0BEC5" opacity="0.15" />
    <rect x="92" y="14" width="2" height="4" fill="#B0BEC5" opacity="0.12" />

    {/* Propeller at stern — multi-blade */}
    <rect x="0" y="22" width="8" height="3" fill="#78909C" />
    <circle cx="2" cy="25" r="8" fill="none" stroke="#607D8B" strokeWidth="0.5" opacity="0.3" />
    <rect x="-4" y="17" width="6" height="16" fill="#607D8B" opacity="0.6" />
    <rect x="-2" y="14" width="2" height="5" fill="#90A4AE" opacity="0.5" />
    <rect x="-2" y="31" width="2" height="5" fill="#90A4AE" opacity="0.5" />
    <rect x="-6" y="19" width="4" height="3" fill="#90A4AE" opacity="0.4" />
    <rect x="-6" y="28" width="4" height="3" fill="#90A4AE" opacity="0.4" />
    {/* Prop shaft */}
    <rect x="4" y="24" width="6" height="2" fill="#546E7A" opacity="0.4" />
    {/* Prop guard */}
    <rect x="-2" y="14" width="1" height="22" fill="#455A64" opacity="0.3" />

    {/* Rust and corrosion — extensive weathering */}
    <rect x="28" y="32" width="8" height="5" fill="#BF360C" opacity="0.3" />
    <rect x="30" y="34" width="4" height="2" fill="#E65100" opacity="0.2" />
    <rect x="48" y="12" width="8" height="4" fill="#E65100" opacity="0.25" />
    <rect x="50" y="14" width="4" height="2" fill="#FF6D00" opacity="0.15" />
    <rect x="16" y="38" width="12" height="4" fill="#BF360C" opacity="0.22" />
    <rect x="80" y="30" width="8" height="4" fill="#E65100" opacity="0.2" />
    <rect x="40" y="40" width="14" height="3" fill="#BF360C" opacity="0.18" />
    <rect x="68" y="12" width="10" height="3" fill="#E65100" opacity="0.15" />
    <rect x="20" y="18" width="8" height="4" fill="#8B4513" opacity="0.15" />
    {/* Rust streaks running down hull */}
    <rect x="30" y="36" width="2" height="8" fill="#BF360C" opacity="0.12" />
    <rect x="50" y="16" width="2" height="10" fill="#E65100" opacity="0.1" />
    <rect x="82" y="34" width="2" height="8" fill="#BF360C" opacity="0.1" />

    {/* Barnacles — extensive coverage on lower hull */}
    <rect x="18" y="42" width="4" height="3" fill="#9CA3AF" opacity="0.4" />
    <rect x="20" y="44" width="2" height="2" fill="#B0BEC5" opacity="0.3" />
    <rect x="34" y="44" width="3" height="3" fill="#9CA3AF" opacity="0.35" />
    <rect x="56" y="44" width="5" height="2" fill="#9CA3AF" opacity="0.35" />
    <rect x="84" y="38" width="4" height="3" fill="#9CA3AF" opacity="0.4" />
    <rect x="10" y="40" width="5" height="3" fill="#B0BEC5" opacity="0.3" />
    <rect x="44" y="44" width="4" height="2" fill="#9CA3AF" opacity="0.3" />
    <rect x="76" y="44" width="6" height="2" fill="#B0BEC5" opacity="0.3" />
    <rect x="90" y="34" width="4" height="3" fill="#9CA3AF" opacity="0.3" />

    {/* Anemone colony on hull */}
    <rect x="26" y="42" width="8" height="4" fill="#6A1B9A" opacity="0.5" />
    <rect x="24" y="38" width="4" height="4" fill="#CE93D8" opacity="0.4" />
    <rect x="33" y="40" width="3" height="4" fill="#BA68C8" opacity="0.4" />
    {/* Anemone tentacle tips */}
    <rect x="24" y="36" width="2" height="2" fill="#E1BEE7" opacity="0.35" />
    <rect x="28" y="37" width="2" height="2" fill="#F3E5F5" opacity="0.3" />
    <rect x="32" y="38" width="2" height="2" fill="#E1BEE7" opacity="0.3" />

    {/* Marine growth — algae, sponge, soft coral */}
    <rect x="36" y="6" width="6" height="3" fill="#2E7D32" opacity="0.4" />
    <rect x="14" y="16" width="4" height="3" fill="#388E3C" opacity="0.3" />
    <rect x="72" y="42" width="10" height="2" fill="#1B5E20" opacity="0.4" />
    <rect x="92" y="24" width="4" height="4" fill="#2E7D32" opacity="0.25" />
    <rect x="6" y="28" width="4" height="2" fill="#388E3C" opacity="0.2" />
    {/* Orange sponge */}
    <rect x="46" y="44" width="4" height="3" fill="#FF6F00" opacity="0.2" />
    <rect x="86" y="42" width="3" height="3" fill="#FFB300" opacity="0.15" />

    {/* Coral encrustation at base */}
    <rect x="14" y="44" width="8" height="4" fill="#E91E63" opacity="0.25" />
    <rect x="16" y="42" width="4" height="3" fill="#F48FB1" opacity="0.2" />
    <rect x="60" y="44" width="6" height="3" fill="#C2185B" opacity="0.2" />

    {/* Debris on seabed near sub */}
    <rect x="96" y="48" width="6" height="3" fill="#455A64" opacity="0.3" />
    <rect x="-8" y="48" width="4" height="3" fill="#546E7A" opacity="0.25" />

    {/* Bubbles from hull breach — active stream */}
    <circle cx="68" cy="18" r="1.5" fill="rgba(255,255,255,0.3)" style={{ animation: 'bubbleRise 3s ease-in 0s infinite' }} />
    <circle cx="72" cy="16" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 3.5s ease-in 0.8s infinite' }} />
    <circle cx="70" cy="20" r="1.2" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 4s ease-in 1.5s infinite' }} />
    <circle cx="66" cy="17" r="0.8" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4.5s ease-in 2.5s infinite' }} />
    <circle cx="74" cy="14" r="0.6" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5s ease-in 3.5s infinite' }} />
    <circle cx="48" cy="-6" r="0.7" fill="rgba(255,255,255,0.12)" style={{ animation: 'bubbleRise 5.5s ease-in 4s infinite' }} />
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
    <rect x="4" cy="40" width="3" height="2" fill="#9CA3AF" opacity="0.3" x="4" y="40" />
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
    <defs>
      <linearGradient id="hull-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#795548" />
        <stop offset="40%" stopColor="#5D4037" />
        <stop offset="100%" stopColor="#3E2723" />
      </linearGradient>
      <linearGradient id="stern-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8D6E63" />
        <stop offset="100%" stopColor="#5D4037" />
      </linearGradient>
      <linearGradient id="deck-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6D4C41" />
        <stop offset="100%" stopColor="#4E342E" />
      </linearGradient>
    </defs>

    {/* Shadow on sand beneath the hull */}
    <ellipse cx="60" cy="72" rx="80" ry="6" fill="#000" opacity="0.15" />

    {/* Main hull — curved galleon shape, slightly listed to port */}
    <path d="M-14 46 Q-18 38 -12 30 Q0 20 20 18 L110 16 Q128 18 134 28 Q138 36 132 50 Q128 58 120 62 L10 64 Q-8 62 -14 46Z" fill="url(#hull-grad)" />
    {/* Hull underside / keel */}
    <path d="M-8 60 Q10 68 65 70 Q120 68 132 58" stroke="#3E2723" strokeWidth="3" fill="none" />
    {/* Copper bottom sheathing (anti-fouling) */}
    <path d="M-6 56 Q30 62 65 64 Q100 62 126 54" fill="#5D4037" opacity="0.3" />
    <path d="M0 58 Q30 64 65 66 Q100 64 120 56" stroke="#8B4513" strokeWidth="0.5" fill="none" opacity="0.25" />

    {/* Hull planking lines (curved, following hull shape) */}
    <path d="M-10 32 Q30 28 70 26 Q110 28 130 32" stroke="#8D6E63" strokeWidth="0.7" fill="none" opacity="0.4" />
    <path d="M-12 38 Q30 34 70 32 Q110 34 130 38" stroke="#8D6E63" strokeWidth="0.7" fill="none" opacity="0.35" />
    <path d="M-12 44 Q30 40 70 38 Q110 40 130 44" stroke="#8D6E63" strokeWidth="0.7" fill="none" opacity="0.3" />
    <path d="M-10 50 Q30 46 70 44 Q110 46 128 50" stroke="#8D6E63" strokeWidth="0.7" fill="none" opacity="0.25" />

    {/* Gun deck stripe (painted band along hull) */}
    <path d="M-6 34 Q30 30 70 28 Q110 30 130 34 L130 38 Q110 34 70 32 Q30 34 -6 38Z" fill="#D4A43A" opacity="0.12" />

    {/* Gun ports — square with hinged lids */}
    {[18, 38, 78, 98].map((gx, i) => (
      <g key={`gp-${i}`}>
        <rect x={gx - 3.5} y={34 - (gx < 60 ? 0 : 1)} width="7" height="6" fill="#1A0E08" opacity="0.75" rx="0.5" />
        <rect x={gx - 4} y={34 - (gx < 60 ? 0 : 1)} width="8" height="1" fill="#6D4C41" opacity="0.5" />
      </g>
    ))}
    {/* Cannons poking out of select ports */}
    <path d="M15 37 L9 37" stroke="#455A64" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M75 36 L69 36" stroke="#455A64" strokeWidth="2.5" strokeLinecap="round" />
    {/* Fallen cannon on seabed */}
    <path d="M30 68 L42 67" stroke="#546E7A" strokeWidth="3" strokeLinecap="round" opacity="0.35" />

    {/* Stern — ornate captain's quarters with gallery */}
    <path d="M110 16 Q118 8 130 4 Q138 2 140 8 L142 56 Q140 62 132 64 L120 62 Q114 58 110 48Z" fill="url(#stern-grad)" />
    {/* Stern window gallery — arched windows */}
    <path d="M125 12 Q128 10 131 12 L131 24 Q128 26 125 24Z" fill="#0A1628" opacity="0.8" />
    <path d="M125 12 Q128 10 131 12 L131 24 Q128 26 125 24Z" fill="none" stroke="#A1887F" strokeWidth="0.7" />
    <path d="M133 14 Q135.5 12 138 14 L138 23 Q135.5 25 133 23Z" fill="#0A1628" opacity="0.7" />
    <path d="M133 14 Q135.5 12 138 14 L138 23 Q135.5 25 133 23Z" fill="none" stroke="#A1887F" strokeWidth="0.6" />
    {/* Lower stern windows */}
    <path d="M126 30 Q128.5 28 131 30 L131 40 Q128.5 42 126 40Z" fill="#0A1628" opacity="0.6" />
    <path d="M126 30 Q128.5 28 131 30 L131 40 Q128.5 42 126 40Z" fill="none" stroke="#A1887F" strokeWidth="0.6" />
    {/* Stern lantern bracket */}
    <path d="M136 2 L138 -2 L140 2" stroke="#A1887F" strokeWidth="1" fill="none" opacity="0.4" />
    <rect x="137" y="-4" width="3" height="3" fill="#FF8F00" opacity="0.2" rx="0.5" />
    {/* Stern decorative scrollwork — gilded trim */}
    <path d="M120 6 Q126 2 132 4 Q136 6 140 4" stroke="#D4A43A" strokeWidth="0.8" fill="none" opacity="0.4" />
    <path d="M118 10 Q126 6 134 8 Q138 10 142 8" stroke="#D4A43A" strokeWidth="0.6" fill="none" opacity="0.3" />
    <path d="M120 50 Q130 54 140 50" stroke="#D4A43A" strokeWidth="0.5" fill="none" opacity="0.2" />
    {/* Stern name plaque (worn) */}
    <rect x="124" y="44" width="12" height="4" fill="#4E342E" opacity="0.5" rx="0.5" />
    <rect x="125" y="45" width="10" height="2" fill="#D4A43A" opacity="0.15" rx="0.3" />

    {/* Bow — sharp curved prow with figurehead */}
    <path d="M-12 30 Q-20 26 -24 20 Q-26 14 -22 10 Q-18 6 -14 8 Q-8 12 -4 18 Q0 22 4 24" fill="#6D4C41" />
    {/* Bow reinforcement bands */}
    <path d="M-18 14 Q-14 10 -10 14" stroke="#4E342E" strokeWidth="1" fill="none" opacity="0.4" />
    <path d="M-16 20 Q-10 16 -6 20" stroke="#4E342E" strokeWidth="1" fill="none" opacity="0.35" />
    {/* Bowsprit (angled forward spar) */}
    <path d="M-22 12 L-40 -4" stroke="#8D6E63" strokeWidth="3" strokeLinecap="round" />
    <path d="M-40 -4 L-46 -8" stroke="#A1887F" strokeWidth="2" strokeLinecap="round" />
    {/* Jib boom beyond bowsprit */}
    <path d="M-46 -8 L-52 -12" stroke="#BCAAA4" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    {/* Bowsprit rigging (stays) */}
    <path d="M-40 -4 Q-30 8 -14 18" stroke="#A08060" strokeWidth="0.5" fill="none" opacity="0.3" />
    {/* Figurehead — carved sea creature */}
    <path d="M-28 16 Q-32 12 -30 7 Q-28 4 -25 6 Q-23 8 -24 12 L-22 14" fill="#D4A43A" opacity="0.5" />
    <circle cx="-28" cy="8" r="1.5" fill="#E8C468" opacity="0.4" />
    <path d="M-30 7 Q-32 5 -30 3" stroke="#E8C468" strokeWidth="0.6" fill="none" opacity="0.35" />

    {/* Hull breach — gaping dark hole with depth */}
    <ellipse cx="56" cy="42" rx="14" ry="10" fill="#0A1628" opacity="0.85" />
    {/* Inner hull structure visible through breach */}
    <path d="M48 36 L49 50" stroke="#A1887F" strokeWidth="0.8" opacity="0.4" />
    <path d="M52 34 L53 52" stroke="#A1887F" strokeWidth="0.8" opacity="0.35" />
    <path d="M56 33 L56 52" stroke="#A1887F" strokeWidth="0.8" opacity="0.4" />
    <path d="M60 34 L59 51" stroke="#A1887F" strokeWidth="0.8" opacity="0.35" />
    <path d="M64 36 L63 50" stroke="#A1887F" strokeWidth="0.8" opacity="0.3" />
    {/* Torn planks framing the breach */}
    <path d="M44 35 Q46 30 49 33" stroke="#6D4C41" strokeWidth="1.8" fill="none" />
    <path d="M42 42 Q40 38 44 36" stroke="#5D4037" strokeWidth="1.5" fill="none" />
    <path d="M68 36 Q70 32 72 35" stroke="#6D4C41" strokeWidth="1.8" fill="none" />
    <path d="M68 48 Q72 52 70 46" stroke="#5D4037" strokeWidth="1.5" fill="none" />
    <path d="M50 50 Q54 54 58 52" stroke="#4E342E" strokeWidth="1.2" fill="none" />

    {/* Deck visible above hull */}
    <path d="M-4 22 Q30 18 70 16 Q110 18 122 22 L118 24 Q80 20 70 18 Q30 20 0 24Z" fill="url(#deck-grad)" opacity="0.6" />
    {/* Deck planking */}
    <path d="M0 20 Q30 17 70 16 Q110 17 118 20" stroke="#8D6E63" strokeWidth="0.4" fill="none" opacity="0.3" />
    {/* Hatch on deck */}
    <rect x="38" y="17" width="8" height="4" fill="#3E2723" opacity="0.5" rx="0.5" />
    <rect x="39" y="18" width="6" height="2" fill="#1A0E08" opacity="0.4" />
    {/* Capstan on deck */}
    <circle cx="88" cy="18" r="2.5" fill="#5D4037" opacity="0.4" />
    <circle cx="88" cy="18" r="1" fill="#795548" opacity="0.3" />

    {/* Main mast — broken with jagged splinter */}
    <rect x="58" y="-14" width="5" height="34" fill="#8D6E63" rx="1" />
    <path d="M58 -14 L59.5 -20 L61 -14" fill="#A1887F" />
    <path d="M61 -14 L62 -17 L63 -14" fill="#795548" />
    {/* Mast bands (iron hoops) */}
    <rect x="57" y="-4" width="7" height="1.2" fill="#4B5563" opacity="0.35" rx="0.3" />
    <rect x="57" y="8" width="7" height="1.2" fill="#4B5563" opacity="0.3" rx="0.3" />
    {/* Crow's nest remnant */}
    <path d="M53 -10 Q60 -13 67 -10" stroke="#5D4037" strokeWidth="2" fill="none" />
    <path d="M54 -10 L54 -6" stroke="#5D4037" strokeWidth="1" opacity="0.5" />
    <path d="M66 -10 L66 -6" stroke="#5D4037" strokeWidth="1" opacity="0.5" />
    {/* Rigging lines (stays & shrouds) */}
    <path d="M60 -16 Q42 0 22 18" stroke="#A08060" strokeWidth="0.5" fill="none" opacity="0.3" />
    <path d="M60 -16 Q78 0 98 16" stroke="#A08060" strokeWidth="0.5" fill="none" opacity="0.25" />
    <path d="M60 -4 Q46 6 32 16" stroke="#A08060" strokeWidth="0.4" fill="none" opacity="0.2" />
    <path d="M60 -4 Q74 6 86 16" stroke="#A08060" strokeWidth="0.4" fill="none" opacity="0.2" />
    {/* Dangling broken rope */}
    <path d="M62 -16 Q66 -12 64 -6 Q62 0 66 4" stroke="#C4A862" strokeWidth="0.6" fill="none" opacity="0.25" />

    {/* Mizzen mast (shorter, aft) — snapped lower */}
    <rect x="96" y="0" width="4" height="18" fill="#8D6E63" opacity="0.8" rx="1" />
    <path d="M96 0 L97.5 -3 L99 0" fill="#A1887F" opacity="0.6" />
    <path d="M99 0 L100 -2 L100 0" fill="#795548" opacity="0.5" />

    {/* Foremast stub (forward) */}
    <rect x="22" y="10" width="3.5" height="10" fill="#795548" opacity="0.6" rx="0.5" />
    <path d="M22 10 L23 7 L25.5 10" fill="#A1887F" opacity="0.4" />

    {/* Tattered sail hanging from main mast — billowing with current */}
    <path d="M63 -10 Q76 -6 80 4 Q78 12 72 18 Q68 20 63 16Z" fill="#D7CCC8" opacity="0.25" />
    <path d="M64 -8 Q74 -4 76 2 Q74 10 70 16" stroke="#BCAAA4" strokeWidth="0.4" fill="none" opacity="0.25" />
    {/* Sail holes (worn through) */}
    <ellipse cx="72" cy="4" rx="2" ry="1.5" fill="#0A1628" opacity="0.15" />
    <ellipse cx="68" cy="10" rx="1.5" ry="1" fill="#0A1628" opacity="0.1" />

    {/* Railing posts — mixture of intact and broken */}
    <rect x="8" y="14" width="1.5" height="8" fill="#795548" opacity="0.6" rx="0.5" />
    <rect x="18" y="13" width="1.5" height="4" fill="#795548" opacity="0.4" rx="0.5" />
    <rect x="30" y="12" width="1.5" height="10" fill="#795548" opacity="0.5" rx="0.5" />
    <rect x="72" y="12" width="1.5" height="8" fill="#795548" opacity="0.5" rx="0.5" />
    <rect x="84" y="14" width="1.5" height="6" fill="#795548" opacity="0.4" rx="0.5" />
    {/* Railing rope sagging between posts */}
    <path d="M8 16 Q14 15 18 15" stroke="#A08060" strokeWidth="0.6" fill="none" opacity="0.25" />
    <path d="M30 14 Q50 13 72 14" stroke="#A08060" strokeWidth="0.6" fill="none" opacity="0.25" />

    {/* Chain draped along hull — heavier detail */}
    <path d="M6 58 Q14 60 22 58 Q30 56 38 58 Q46 60 52 58" stroke="#4B5563" strokeWidth="1.5" fill="none" opacity="0.35" />
    {/* Anchor chain from bow descending to seabed */}
    <path d="M-16 22 Q-20 40 -18 62 Q-16 70 -10 72" stroke="#4B5563" strokeWidth="1.2" fill="none" opacity="0.3" />
    {/* Small anchor on seabed */}
    <path d="M-12 72 L-8 68 L-4 72 M-8 68 L-8 62" stroke="#546E7A" strokeWidth="1.5" fill="none" opacity="0.3" />

    {/* Rust and decay — layered weathering */}
    <ellipse cx="30" cy="48" rx="7" ry="3" fill="#BF360C" opacity="0.18" />
    <ellipse cx="85" cy="34" rx="5" ry="3" fill="#E65100" opacity="0.14" />
    <ellipse cx="108" cy="46" rx="6" ry="3" fill="#BF360C" opacity="0.16" />
    <ellipse cx="14" cy="40" rx="4" ry="2" fill="#8B4513" opacity="0.12" />
    <ellipse cx="118" cy="32" rx="3" ry="4" fill="#BF360C" opacity="0.1" />
    {/* Waterline staining */}
    <path d="M-8 28 Q30 24 70 22 Q110 24 130 28" stroke="#5D4037" strokeWidth="1.5" fill="none" opacity="0.15" />

    {/* Barnacle clusters — varied sizes */}
    <circle cx="0" cy="56" r="2.5" fill="#9CA3AF" opacity="0.3" />
    <circle cx="3" cy="58" r="1.5" fill="#B0BEC5" opacity="0.25" />
    <circle cx="68" cy="62" r="2" fill="#9CA3AF" opacity="0.3" />
    <circle cx="72" cy="60" r="1.2" fill="#B0BEC5" opacity="0.2" />
    <circle cx="126" cy="52" r="2" fill="#9CA3AF" opacity="0.3" />
    <circle cx="130" cy="55" r="1.5" fill="#B0BEC5" opacity="0.25" />
    {/* Barnacle line along watermark */}
    {[10, 25, 40, 90, 105].map((bx, i) => (
      <circle key={`bn-${i}`} cx={bx} cy={54 + (i % 3)} r={0.8 + (i % 2) * 0.4} fill="#9CA3AF" opacity={0.2 + (i % 3) * 0.05} />
    ))}

    {/* Marine growth — algae, sponges, and moss */}
    <ellipse cx="60" cy="14" rx="5" ry="2" fill="#2E7D32" opacity="0.3" />
    <ellipse cx="6" cy="58" rx="5" ry="1.5" fill="#388E3C" opacity="0.25" />
    <ellipse cx="116" cy="54" rx="4" ry="1.5" fill="#1B5E20" opacity="0.3" />
    {/* Sponge colonies */}
    <ellipse cx="100" cy="56" rx="4" ry="3" fill="#FF6F00" opacity="0.15" />
    <ellipse cx="14" cy="62" rx="3" ry="2" fill="#FF8F00" opacity="0.12" />

    {/* Coral growing on hull */}
    <ellipse cx="90" cy="56" rx="6" ry="4" fill="#E91E63" opacity="0.2" />
    <ellipse cx="92" cy="52" rx="3" ry="2" fill="#F48FB1" opacity="0.18" />
    <ellipse cx="86" cy="58" rx="2" ry="1.5" fill="#EC407A" opacity="0.15" />
    {/* Small fan coral on stern */}
    <path d="M134 46 Q136 40 140 42 Q138 46 134 46Z" fill="#AB47BC" opacity="0.2" />

    {/* Scattered wreckage on seabed */}
    <path d="M-10 68 Q-6 66 -2 68 Q2 70 -4 72" fill="#6D4C41" opacity="0.25" />
    <path d="M130 66 Q136 64 140 66 Q136 68 130 68" fill="#795548" opacity="0.2" />
    <ellipse cx="72" cy="72" rx="6" ry="1.5" fill="#5D4037" opacity="0.2" />
    {/* Barrel on seabed */}
    <ellipse cx="146" cy="68" rx="4" ry="3" fill="#5D4037" opacity="0.3" />
    <path d="M142 68 L150 68" stroke="#6D4C41" strokeWidth="0.5" fill="none" opacity="0.3" />
    <ellipse cx="146" cy="68" rx="4" ry="3" fill="none" stroke="#4B5563" strokeWidth="0.5" opacity="0.2" />

    {/* Bubbles from interior — staggered timing */}
    <circle cx="54" cy="30" r="1.5" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 3.5s ease-in 0s infinite' }} />
    <circle cx="58" cy="28" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4s ease-in 1.2s infinite' }} />
    <circle cx="52" cy="34" r="1.2" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4.5s ease-in 2s infinite' }} />
    <circle cx="56" cy="26" r="0.7" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5.5s ease-in 3.5s infinite' }} />
  </g>
))
SunkenShip.displayName = 'SunkenShip'

// ─── SHIPWRECK: Sunken Sailboat ─────────────────────────────────────

const SunkenSailboat = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Shadow on seabed */}
    <ellipse cx="40" cy="56" rx="50" ry="4" fill="#000" opacity="0.1" />

    {/* Hull — small coastal sailing vessel, slightly listed to starboard */}
    <rect x="0" y="30" width="80" height="20" fill="#5D4037" />
    <rect x="4" y="26" width="72" height="6" fill="#6D4C41" />
    <rect x="8" y="22" width="64" height="6" fill="#795548" />
    <rect x="12" y="20" width="56" height="3" fill="#8D6E63" opacity="0.7" />
    {/* Hull bottom / keel — heavy timber */}
    <rect x="6" y="50" width="68" height="4" fill="#3E2723" />
    <rect x="14" y="52" width="52" height="4" fill="#2E1B0E" />
    {/* Hull planking detail — individual strakes */}
    <rect x="2" y="32" width="76" height="1" fill="#795548" opacity="0.3" />
    <rect x="4" y="36" width="72" height="1" fill="#8D6E63" opacity="0.25" />
    <rect x="6" y="40" width="68" height="1" fill="#795548" opacity="0.25" />
    <rect x="4" y="44" width="72" height="1" fill="#8D6E63" opacity="0.2" />
    <rect x="6" y="48" width="68" height="1" fill="#795548" opacity="0.18" />
    {/* Caulking lines between planks */}
    <rect x="8" y="34" width="64" height="0.5" fill="#3E2723" opacity="0.15" />
    <rect x="8" y="42" width="64" height="0.5" fill="#3E2723" opacity="0.12" />

    {/* Bow — clinker-built pointed prow */}
    <rect x="-4" y="32" width="8" height="14" fill="#6D4C41" />
    <rect x="-8" y="36" width="6" height="8" fill="#795548" />
    <rect x="-10" y="38" width="4" height="4" fill="#8D6E63" opacity="0.6" />
    {/* Bow cutwater */}
    <rect x="-10" y="34" width="2" height="12" fill="#5D4037" opacity="0.5" />

    {/* Stern — transom with details */}
    <rect x="76" y="24" width="10" height="28" fill="#5D4037" />
    <rect x="78" y="22" width="8" height="4" fill="#6D4C41" />
    <rect x="80" y="20" width="4" height="3" fill="#795548" opacity="0.7" />
    {/* Stern window */}
    <rect x="80" y="28" width="4" height="4" fill="#0A1628" opacity="0.5" />
    <rect x="80" y="28" width="4" height="1" fill="#8D6E63" opacity="0.3" />
    {/* Rudder — with pintles */}
    <rect x="84" y="34" width="4" height="20" fill="#4E342E" />
    <rect x="86" y="38" width="2" height="14" fill="#3E2723" />
    <rect x="82" y="36" width="2" height="2" fill="#78909C" opacity="0.4" />
    <rect x="82" y="44" width="2" height="2" fill="#78909C" opacity="0.35" />
    {/* Tiller (steering arm) */}
    <rect x="76" y="34" width="8" height="2" fill="#795548" opacity="0.5" />

    {/* Name plate on stern — faded */}
    <rect x="78" y="32" width="8" height="3" fill="#D4A43A" opacity="0.25" />
    <rect x="79" y="33" width="6" height="1" fill="#B8862D" opacity="0.15" />

    {/* Mast — snapped halfway, jagged break */}
    <rect x="32" y="-20" width="4" height="48" fill="#795548" />
    <rect x="33" y="-20" width="2" height="48" fill="#8D6E63" opacity="0.3" />
    {/* Jagged break at top */}
    <rect x="30" y="-24" width="3" height="5" fill="#A1887F" />
    <rect x="34" y="-23" width="2" height="4" fill="#8D6E63" opacity="0.7" />
    <rect x="33" y="-26" width="2" height="3" fill="#A1887F" opacity="0.5" />
    {/* Mast bands (iron hoops) */}
    <rect x="31" y="0" width="6" height="1" fill="#4B5563" opacity="0.3" />
    <rect x="31" y="12" width="6" height="1" fill="#4B5563" opacity="0.25" />
    {/* Mast base plate / step */}
    <rect x="28" y="26" width="12" height="2" fill="#5D4037" />
    <rect x="29" y="25" width="10" height="1" fill="#6D4C41" opacity="0.5" />

    {/* Tattered sail — more detailed fabric with folds */}
    <rect x="36" y="-18" width="20" height="28" fill="#D7CCC8" opacity="0.3" />
    <rect x="38" y="-16" width="16" height="24" fill="#EFEBE9" opacity="0.22" />
    {/* Sail seam lines */}
    <rect x="42" y="-16" width="0.5" height="24" fill="#BCAAA4" opacity="0.15" />
    <rect x="48" y="-16" width="0.5" height="24" fill="#BCAAA4" opacity="0.12" />
    {/* Sail tears — realistic holes */}
    <rect x="42" y="-10" width="7" height="5" fill="#0A1628" opacity="0.15" />
    <rect x="40" y="-2" width="5" height="4" fill="#0A1628" opacity="0.12" />
    <rect x="46" y="2" width="4" height="3" fill="#0A1628" opacity="0.1" />
    {/* Tattered edges — hanging threads */}
    <rect x="54" y="-14" width="3" height="5" fill="#BCAAA4" opacity="0.2" />
    <rect x="52" y="-4" width="4" height="4" fill="#D7CCC8" opacity="0.18" />
    <rect x="56" y="0" width="2" height="5" fill="#BCAAA4" opacity="0.15" />
    <rect x="54" y="6" width="3" height="3" fill="#D7CCC8" opacity="0.12" />
    {/* Sail billowing edge */}
    <rect x="55" y="-10" width="2" height="8" fill="#EFEBE9" opacity="0.12" />

    {/* Boom (horizontal spar) — broken, dangling */}
    <rect x="34" y="4" width="26" height="3" fill="#A1887F" />
    <rect x="58" y="3" width="4" height="3" fill="#8D6E63" opacity="0.6" />
    {/* Broken boom end — splintered */}
    <rect x="60" y="2" width="2" height="2" fill="#A1887F" opacity="0.4" />
    {/* Gaff (upper spar) remnant */}
    <rect x="34" y="-16" width="16" height="2" fill="#A1887F" opacity="0.5" />
    <rect x="48" y="-17" width="3" height="2" fill="#8D6E63" opacity="0.4" />

    {/* Standing rigging */}
    <rect x="34" y="-20" width="1" height="24" fill="#A08060" opacity="0.35" />
    <rect x="36" y="-18" width="1" height="22" fill="#C4A862" opacity="0.25" />
    {/* Shroud lines to hull sides */}
    <path d="M32 -18 Q22 2 14 22" stroke="#A08060" strokeWidth="0.5" fill="none" opacity="0.2" />
    <path d="M36 -18 Q48 2 58 22" stroke="#A08060" strokeWidth="0.5" fill="none" opacity="0.2" />
    {/* Loose rope coil on deck */}
    <rect x="10" y="26" width="8" height="2" fill="#A08060" opacity="0.35" />
    <rect x="8" y="28" width="4" height="4" fill="#C4A862" opacity="0.25" />
    <rect x="14" y="28" width="3" height="3" fill="#A08060" opacity="0.2" />

    {/* Small bow anchor — detailed */}
    <rect x="-6" y="26" width="2" height="14" fill="#4B5563" opacity="0.5" />
    <rect x="-10" y="38" width="10" height="2" fill="#4B5563" opacity="0.4" />
    <rect x="-12" y="38" width="2" height="4" fill="#546E7A" opacity="0.3" />
    <rect x="2" y="38" width="2" height="4" fill="#546E7A" opacity="0.3" />

    {/* Lantern hanging from mast — corroded brass */}
    <rect x="28" y="-14" width="4" height="6" fill="#FF8F00" opacity="0.25" />
    <rect x="27" y="-16" width="6" height="2" fill="#4B5563" opacity="0.4" />
    <rect x="29" y="-10" width="2" height="3" fill="#4B5563" opacity="0.3" />
    {/* Lantern glass pane hint */}
    <rect x="29" y="-13" width="2" height="3" fill="#FFB300" opacity="0.15" />

    {/* Deck features */}
    {/* Cleat */}
    <rect x="20" y="24" width="4" height="2" fill="#5D4037" opacity="0.4" />
    {/* Hatch */}
    <rect x="56" y="24" width="8" height="4" fill="#4E342E" opacity="0.4" />
    <rect x="57" y="25" width="6" height="2" fill="#0A1628" opacity="0.3" />

    {/* Barnacle clusters — extensive */}
    <rect x="0" y="44" width="4" height="4" fill="#9CA3AF" opacity="0.4" />
    <rect x="2" y="46" width="2" height="2" fill="#B0BEC5" opacity="0.3" />
    <rect x="58" y="48" width="5" height="3" fill="#9CA3AF" opacity="0.35" />
    <rect x="76" y="42" width="4" height="4" fill="#9CA3AF" opacity="0.35" />
    <rect x="30" y="52" width="4" height="2" fill="#78909C" opacity="0.3" />

    {/* Marine growth — algae and sponge */}
    <rect x="18" y="22" width="8" height="2" fill="#2E7D32" opacity="0.4" />
    <rect x="48" y="50" width="10" height="2" fill="#388E3C" opacity="0.3" />
    <rect x="32" y="-26" width="4" height="2" fill="#1B5E20" opacity="0.4" />
    <rect x="72" y="50" width="6" height="2" fill="#2E7D32" opacity="0.3" />
    {/* Orange sponge */}
    <rect x="2" y="48" width="3" height="3" fill="#FF6F00" opacity="0.2" />

    {/* Seaweed growing through hull crack */}
    <rect x="46" y="16" width="3" height="12" fill="#2E7D32" opacity="0.3" />
    <rect x="44" y="12" width="5" height="6" fill="#4CAF50" opacity="0.25" />
    <rect x="43" y="10" width="3" height="3" fill="#81C784" opacity="0.2" />

    {/* Small crab on hull — pixel detail */}
    <rect x="64" y="28" width="5" height="3" fill="#E65100" opacity="0.5" />
    <rect x="63" y="26" width="2" height="2" fill="#BF360C" opacity="0.4" />
    <rect x="69" y="26" width="2" height="2" fill="#BF360C" opacity="0.4" />
    {/* Crab eye dots */}
    <rect x="64" y="27" width="1" height="1" fill="#1A1A1A" opacity="0.3" />
    <rect x="67" y="27" width="1" height="1" fill="#1A1A1A" opacity="0.3" />

    {/* Life ring on deck */}
    <circle cx="68" cy="24" r="3" fill="none" stroke="#E0E0E0" strokeWidth="1.5" opacity="0.25" />
    <rect x="66" y="22" width="2" height="1" fill="#D50000" opacity="0.2" />
    <rect x="68" y="26" width="2" height="1" fill="#D50000" opacity="0.2" />

    {/* Coral at waterline */}
    <rect x="10" y="48" width="4" height="3" fill="#E91E63" opacity="0.2" />

    {/* Bubbles */}
    <circle cx="40" cy="18" r="1" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 4s ease-in 0.5s infinite' }} />
    <circle cx="36" cy="20" r="0.8" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 5s ease-in 2s infinite' }} />
    <circle cx="48" cy="12" r="0.6" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5.5s ease-in 3.5s infinite' }} />
  </g>
))
SunkenSailboat.displayName = 'SunkenSailboat'

// ─── MINIMAL: Stacked Stone Cairn ────────────────────────────────────

const StoneCairn = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Bottom stone — large, rounded */}
    <rect x="0" y="42" width="36" height="14" fill="#78716C" rx="2" />
    <rect x="2" y="40" width="32" height="4" fill="#8D8680" />
    <rect x="4" y="54" width="28" height="2" fill="#57534E" opacity="0.3" />
    {/* Stone texture */}
    <rect x="6" y="46" width="8" height="1" fill="#9E9E9E" opacity="0.3" />
    <rect x="20" y="48" width="10" height="1" fill="#9E9E9E" opacity="0.25" />

    {/* Second stone */}
    <rect x="6" y="30" width="24" height="12" fill="#8D8680" rx="2" />
    <rect x="8" y="28" width="20" height="4" fill="#A09890" />
    <rect x="10" y="34" width="12" height="1" fill="#9E9E9E" opacity="0.25" />

    {/* Third stone */}
    <rect x="10" y="20" width="16" height="10" fill="#9E9890" rx="2" />
    <rect x="12" y="18" width="12" height="4" fill="#A8A098" />
    <rect x="14" y="24" width="8" height="1" fill="#B0B0B0" opacity="0.2" />

    {/* Fourth stone — small */}
    <rect x="14" y="12" width="10" height="8" fill="#A8A098" rx="1" />
    <rect x="15" y="10" width="8" height="4" fill="#B8B0A8" />

    {/* Top stone — tiny, balanced */}
    <rect x="16" y="6" width="6" height="6" fill="#B8B0A8" rx="1" />
    <rect x="17" y="4" width="4" height="4" fill="#C8C0B8" />

    {/* Subtle moss at base */}
    <rect x="0" y="54" width="4" height="2" fill="#2E7D32" opacity="0.3" />
    <rect x="30" y="52" width="6" height="2" fill="#388E3C" opacity="0.25" />

    {/* Gentle bubbles from base crevice */}
    <circle cx="18" cy="42" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 5s ease-in 0s infinite' }} />
    <circle cx="20" cy="44" r="0.8" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5.5s ease-in 2s infinite' }} />
  </g>
))
StoneCairn.displayName = 'StoneCairn'

// ─── MINIMAL: Bamboo Grove ───────────────────────────────────────────

const BambooGrove = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Stalk 1 - tall (rigid) */}
    <rect x="6" y="-10" width="4" height="70" fill="#558B2F" />
    <rect x="6" y="0" width="4" height="2" fill="#689F38" opacity="0.6" />
    <rect x="6" y="16" width="4" height="2" fill="#689F38" opacity="0.6" />
    <rect x="6" y="32" width="4" height="2" fill="#689F38" opacity="0.6" />
    <rect x="6" y="48" width="4" height="2" fill="#689F38" opacity="0.6" />
    {/* Leaves — sway from stalk attachment */}
    <g style={{ animation: 'kelpSway 5s ease-in-out 0s infinite', transformOrigin: '8px -8px' }}>
      <ellipse cx="0" cy="-8" rx="8" ry="2.5" fill="#7CB342" opacity="0.7" />
    </g>
    <g style={{ animation: 'kelpSway 4.5s ease-in-out 0.6s infinite', transformOrigin: '8px -6px' }}>
      <ellipse cx="14" cy="-6" rx="7" ry="2" fill="#8BC34A" opacity="0.6" />
    </g>

    {/* Stalk 2 - medium (rigid) */}
    <rect x="16" y="4" width="4" height="56" fill="#689F38" />
    <rect x="16" y="12" width="4" height="2" fill="#7CB342" opacity="0.6" />
    <rect x="16" y="28" width="4" height="2" fill="#7CB342" opacity="0.6" />
    <rect x="16" y="44" width="4" height="2" fill="#7CB342" opacity="0.6" />
    {/* Leaves — sway from stalk attachment */}
    <g style={{ animation: 'kelpSway 5.5s ease-in-out 0.3s infinite', transformOrigin: '18px 6px' }}>
      <ellipse cx="24" cy="6" rx="7" ry="2" fill="#8BC34A" opacity="0.65" />
    </g>
    <g style={{ animation: 'kelpSway 4s ease-in-out 0.9s infinite', transformOrigin: '18px 8px' }}>
      <ellipse cx="10" cy="8" rx="6" ry="2" fill="#7CB342" opacity="0.55" />
    </g>

    {/* Stalk 3 - short (rigid) */}
    <rect x="26" y="16" width="3" height="44" fill="#558B2F" />
    <rect x="26" y="24" width="3" height="2" fill="#689F38" opacity="0.6" />
    <rect x="26" y="40" width="3" height="2" fill="#689F38" opacity="0.6" />
    {/* Leaf — sway from stalk attachment */}
    <g style={{ animation: 'kelpSway 4.5s ease-in-out 0.5s infinite', transformOrigin: '27px 18px' }}>
      <ellipse cx="34" cy="18" rx="6" ry="2" fill="#7CB342" opacity="0.6" />
    </g>

    {/* Stalk 4 - background, thinner (rigid) */}
    <rect x="12" y="10" width="3" height="50" fill="#4CAF50" opacity="0.5" />
    <rect x="22" y="20" width="3" height="40" fill="#4CAF50" opacity="0.4" />
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
    {[−18, −8, 2, 12, 22, 32, 42].map((sy, i) => (
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
    {/* Left pillar (hashira) — tapered vermillion lacquer */}
    <rect x="4" y="2" width="12" height="58" fill="#B71C1C" />
    <rect x="5" y="2" width="10" height="58" fill="#C62828" />
    <rect x="2" y="50" width="16" height="10" fill="#AD1457" opacity="0.3" />
    {/* Left base stone */}
    <rect x="0" y="56" width="18" height="6" fill="#78716C" opacity="0.6" />
    <rect x="2" y="54" width="14" height="3" fill="#8D8680" opacity="0.5" />
    <rect x="2" y="0" width="16" height="4" fill="#D32F2F" />
    {/* Left ring bands */}
    <rect x="2" y="14" width="16" height="2" fill="#D32F2F" opacity="0.45" />
    <rect x="2" y="42" width="16" height="2" fill="#D32F2F" opacity="0.4" />
    {/* Left grain texture */}
    <rect x="6" y="8" width="1" height="48" fill="#8B0000" opacity="0.15" />
    <rect x="10" y="6" width="1" height="50" fill="#FF1744" opacity="0.1" />
    <rect x="14" y="8" width="1" height="46" fill="#8B0000" opacity="0.12" />
    {/* Left lacquer wear */}
    <rect x="4" y="30" width="3" height="4" fill="#A1887F" opacity="0.2" />

    {/* Right pillar */}
    <rect x="64" y="2" width="12" height="58" fill="#B71C1C" />
    <rect x="65" y="2" width="10" height="58" fill="#C62828" />
    <rect x="62" y="50" width="16" height="10" fill="#AD1457" opacity="0.3" />
    <rect x="60" y="56" width="18" height="6" fill="#78716C" opacity="0.6" />
    <rect x="62" y="54" width="14" height="3" fill="#8D8680" opacity="0.5" />
    <rect x="62" y="0" width="16" height="4" fill="#D32F2F" />
    <rect x="62" y="14" width="16" height="2" fill="#D32F2F" opacity="0.45" />
    <rect x="62" y="42" width="16" height="2" fill="#D32F2F" opacity="0.4" />
    <rect x="66" y="6" width="1" height="50" fill="#8B0000" opacity="0.15" />
    <rect x="70" y="8" width="1" height="48" fill="#FF1744" opacity="0.1" />
    <rect x="72" y="24" width="3" height="4" fill="#A1887F" opacity="0.18" />

    {/* Top beam (kasagi) — curved ends */}
    <rect x="-4" y="-8" width="88" height="6" fill="#C62828" />
    <rect x="-6" y="-10" width="92" height="4" fill="#D32F2F" />
    <rect x="-8" y="-12" width="4" height="4" fill="#C62828" />
    <rect x="84" y="-12" width="4" height="4" fill="#C62828" />
    {/* Curved tips */}
    <rect x="-10" y="-14" width="4" height="3" fill="#B71C1C" />
    <rect x="86" y="-14" width="4" height="3" fill="#B71C1C" />

    {/* Lower beam (nuki) */}
    <rect x="0" y="6" width="80" height="4" fill="#D32F2F" />
    <rect x="2" y="4" width="76" height="3" fill="#E53935" opacity="0.6" />

    {/* Center tablet (gakuzuka) */}
    <rect x="30" y="-4" width="20" height="10" fill="#FFD54F" opacity="0.5" />
    <rect x="32" y="-2" width="16" height="6" fill="#FFF59D" opacity="0.4" />
    {/* Kanji-like detail */}
    <rect x="36" y="-1" width="2" height="4" fill="#B71C1C" opacity="0.5" />
    <rect x="40" y="-1" width="2" height="4" fill="#B71C1C" opacity="0.5" />
    <rect x="35" y="1" width="8" height="1" fill="#B71C1C" opacity="0.4" />

    {/* Algae and barnacles */}
    <rect x="4" y="52" width="8" height="3" fill="#2E7D32" opacity="0.4" />
    <rect x="66" y="54" width="8" height="2" fill="#388E3C" opacity="0.35" />
    <rect x="20" y="8" width="4" height="2" fill="#1B5E20" opacity="0.3" />
    <rect x="56" y="6" width="3" height="2" fill="#9CA3AF" opacity="0.3" />

    {/* Barnacles on pillars */}
    <rect x="12" y="36" width="3" height="3" fill="#9CA3AF" opacity="0.35" />
    <rect x="64" y="28" width="3" height="2" fill="#9CA3AF" opacity="0.3" />

    {/* Bubbles */}
    <circle cx="40" cy="-12" r="1.2" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 4s ease-in 0s infinite' }} />
    <circle cx="36" cy="-8" r="0.8" fill="rgba(255,255,255,0.18)" style={{ animation: 'bubbleRise 5s ease-in 2s infinite' }} />
  </g>
))
SunkenTorii.displayName = 'SunkenTorii'

// ─── TEMPLE THEME: Stone Pagoda ──────────────────────────────────────

const StonePagoda = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Base platform */}
    <rect x="4" y="50" width="52" height="10" fill="#78716C" />
    <rect x="8" y="46" width="44" height="6" fill="#8D8D8D" />

    {/* First tier (bottom, widest) */}
    <rect x="10" y="34" width="40" height="14" fill="#9E9E9E" />
    <rect x="6" y="32" width="48" height="4" fill="#BDBDBD" />
    {/* Roof overhang */}
    <rect x="2" y="30" width="56" height="3" fill="#78716C" />
    <rect x="0" y="28" width="60" height="3" fill="#6B7280" />
    <rect x="-2" y="27" width="3" height="3" fill="#57534E" />
    <rect x="59" y="27" width="3" height="3" fill="#57534E" />

    {/* Second tier */}
    <rect x="14" y="18" width="32" height="12" fill="#9E9E9E" />
    <rect x="10" y="16" width="40" height="3" fill="#BDBDBD" />
    {/* Roof */}
    <rect x="6" y="14" width="48" height="3" fill="#78716C" />
    <rect x="4" y="12" width="52" height="3" fill="#6B7280" />
    <rect x="2" y="11" width="3" height="3" fill="#57534E" />
    <rect x="55" y="11" width="3" height="3" fill="#57534E" />

    {/* Third tier */}
    <rect x="18" y="4" width="24" height="10" fill="#9E9E9E" />
    <rect x="14" y="2" width="32" height="3" fill="#BDBDBD" />
    {/* Roof */}
    <rect x="10" y="0" width="40" height="3" fill="#78716C" />
    <rect x="8" y="-2" width="44" height="3" fill="#6B7280" />
    <rect x="6" y="-3" width="3" height="3" fill="#57534E" />
    <rect x="51" y="-3" width="3" height="3" fill="#57534E" />

    {/* Spire / finial */}
    <rect x="26" y="-10" width="8" height="10" fill="#BDBDBD" />
    <rect x="28" y="-16" width="4" height="8" fill="#9E9E9E" />
    <rect x="29" y="-20" width="2" height="6" fill="#78716C" />

    {/* Window/door openings */}
    <rect x="24" y="38" width="8" height="8" fill="#1A1A2E" opacity="0.6" />
    <rect x="26" y="22" width="6" height="6" fill="#1A1A2E" opacity="0.5" />
    <rect x="27" y="7" width="5" height="5" fill="#1A1A2E" opacity="0.4" />

    {/* Moss and algae */}
    <rect x="4" y="54" width="6" height="2" fill="#2E7D32" opacity="0.4" />
    <rect x="44" y="52" width="8" height="2" fill="#388E3C" opacity="0.35" />
    <rect x="0" y="28" width="4" height="2" fill="#1B5E20" opacity="0.3" />

    {/* Bubbles */}
    <circle cx="30" cy="-18" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4s ease-in 1s infinite' }} />
  </g>
))
StonePagoda.displayName = 'StonePagoda'

// ─── ATLANTIS THEME: Atlantean Dome ──────────────────────────────────

const AtlanteanDome = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Base platform — ornate stonework */}
    <rect x="0" y="42" width="100" height="18" fill="#1A5276" />
    <rect x="4" y="36" width="92" height="8" fill="#1F618D" />
    <rect x="8" y="32" width="84" height="6" fill="#2471A3" />
    {/* Platform decorative band */}
    <rect x="6" y="40" width="88" height="2" fill="#5DADE2" opacity="0.3" />
    <rect x="10" y="34" width="80" height="1" fill="#85C1E9" opacity="0.25" />

    {/* Dome structure */}
    <rect x="16" y="16" width="68" height="18" fill="#2471A3" />
    <rect x="20" y="8" width="60" height="10" fill="#2E86C1" />
    <rect x="26" y="2" width="48" height="8" fill="#3498DB" />
    <rect x="32" y="-4" width="36" height="8" fill="#5DADE2" />
    <rect x="38" y="-8" width="24" height="6" fill="#85C1E9" />
    <rect x="44" y="-12" width="12" height="6" fill="#AED6F1" />
    <rect x="48" y="-14" width="4" height="4" fill="#D4E6F1" opacity="0.8" />

    {/* Dome windows — glowing */}
    <rect x="30" y="10" width="8" height="10" fill="#00BCD4" opacity="0.5" />
    <rect x="32" y="8" width="4" height="3" fill="#4DD0E1" opacity="0.4" />
    <rect x="46" y="10" width="8" height="10" fill="#00BCD4" opacity="0.5" />
    <rect x="48" y="8" width="4" height="3" fill="#4DD0E1" opacity="0.4" />
    <rect x="62" y="10" width="8" height="10" fill="#00BCD4" opacity="0.5" />
    <rect x="64" y="8" width="4" height="3" fill="#4DD0E1" opacity="0.4" />

    {/* Central entrance */}
    <rect x="38" y="26" width="24" height="16" fill="#0A1628" opacity="0.8" />
    <rect x="36" y="24" width="28" height="4" fill="#2471A3" />
    {/* Entrance arch detail */}
    <rect x="40" y="22" width="20" height="3" fill="#5DADE2" opacity="0.4" />

    {/* Pillars flanking entrance */}
    <rect x="30" y="20" width="6" height="22" fill="#2E86C1" />
    <rect x="28" y="18" width="10" height="4" fill="#5DADE2" opacity="0.5" />
    <rect x="64" y="20" width="6" height="22" fill="#2E86C1" />
    <rect x="62" y="18" width="10" height="4" fill="#5DADE2" opacity="0.5" />

    {/* Decorative trident symbol atop dome */}
    <rect x="49" y="-22" width="2" height="10" fill="#85C1E9" />
    <rect x="46" y="-24" width="2" height="6" fill="#85C1E9" opacity="0.7" />
    <rect x="52" y="-24" width="2" height="6" fill="#85C1E9" opacity="0.7" />
    <rect x="48" y="-26" width="4" height="3" fill="#AED6F1" opacity="0.6" />
    <rect x="45" y="-26" width="2" height="2" fill="#AED6F1" opacity="0.5" />
    <rect x="53" y="-26" width="2" height="2" fill="#AED6F1" opacity="0.5" />

    {/* Bioluminescent glow accents */}
    <rect x="12" y="38" width="4" height="3" fill="#00E5FF" opacity="0.25" />
    <rect x="84" y="38" width="4" height="3" fill="#00E5FF" opacity="0.25" />
    <rect x="18" y="28" width="3" height="2" fill="#00E5FF" opacity="0.2" />
    <rect x="80" y="28" width="3" height="2" fill="#00E5FF" opacity="0.2" />

    {/* Coral and algae */}
    <rect x="0" y="52" width="8" height="3" fill="#2E7D32" opacity="0.3" />
    <rect x="88" y="50" width="10" height="3" fill="#1B5E20" opacity="0.3" />
    <rect x="98" y="44" width="6" height="5" fill="#E91E63" opacity="0.25" />

    {/* Bubbles */}
    <circle cx="50" cy="-24" r="1.5" fill="rgba(255,255,255,0.3)" style={{ animation: 'bubbleRise 3.5s ease-in 0s infinite' }} />
    <circle cx="46" cy="-14" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4.5s ease-in 1.5s infinite' }} />
    <circle cx="56" cy="-10" r="1.2" fill="rgba(255,255,255,0.22)" style={{ animation: 'bubbleRise 4s ease-in 3s infinite' }} />
  </g>
))
AtlanteanDome.displayName = 'AtlanteanDome'

// ─── ATLANTIS THEME: Atlantean Obelisk ───────────────────────────────

const AtlanteanObelisk = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Base — stepped platform */}
    <rect x="0" y="46" width="40" height="14" fill="#1A5276" />
    <rect x="4" y="40" width="32" height="8" fill="#1F618D" />
    <rect x="8" y="36" width="24" height="6" fill="#2471A3" />

    {/* Obelisk shaft — tall and narrow */}
    <rect x="12" y="-20" width="16" height="58" fill="#2E86C1" />
    <rect x="10" y="-16" width="20" height="4" fill="#3498DB" />
    {/* Pyramidion (pointed top) */}
    <rect x="14" y="-28" width="12" height="10" fill="#5DADE2" />
    <rect x="16" y="-34" width="8" height="8" fill="#85C1E9" />
    <rect x="18" y="-38" width="4" height="6" fill="#AED6F1" />
    <rect x="19" y="-40" width="2" height="4" fill="#D4E6F1" opacity="0.8" />

    {/* Hieroglyphic-style carvings */}
    <rect x="14" y="-10" width="4" height="4" fill="#00BCD4" opacity="0.4" />
    <rect x="22" y="-10" width="4" height="4" fill="#00BCD4" opacity="0.4" />
    <rect x="16" y="0" width="8" height="2" fill="#00BCD4" opacity="0.3" />
    <rect x="14" y="8" width="4" height="4" fill="#00BCD4" opacity="0.35" />
    <rect x="22" y="8" width="4" height="4" fill="#00BCD4" opacity="0.35" />
    <rect x="16" y="18" width="8" height="2" fill="#00BCD4" opacity="0.3" />
    <rect x="18" y="26" width="4" height="4" fill="#00BCD4" opacity="0.3" />

    {/* Glowing eye symbol */}
    <rect x="16" y="-6" width="8" height="2" fill="#00E5FF" opacity="0.3" />
    <rect x="18" y="-8" width="4" height="2" fill="#00E5FF" opacity="0.4" />

    {/* Coral and algae */}
    <rect x="0" y="54" width="6" height="3" fill="#2E7D32" opacity="0.35" />
    <rect x="32" y="52" width="6" height="2" fill="#388E3C" opacity="0.3" />
    <rect x="26" y="20" width="4" height="3" fill="#1B5E20" opacity="0.25" />

    {/* Bubbles */}
    <circle cx="20" cy="-38" r="1" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 4s ease-in 0.5s infinite' }} />
  </g>
))
AtlanteanObelisk.displayName = 'AtlanteanObelisk'


// ═══════════════════════════════════════════════════════════════════════
// THEMED LAYOUT CONFIGS
// Two-layer depth system with z-axis perspective (top = back of tank):
//   midground  (z-12): plants rooted at back sand (baseY=240) + structures (same SVG for correct layering)
//   foreground (z-25): rocks, corals, tiny grass-like plants at front glass (baseY=305)
// ═══════════════════════════════════════════════════════════════════════

interface LayeredDecoConfig {
  sandColors?: { color: string; lighter: string; detail: string }
  background: {
    kelps: Array<{ x: number; height: number; variant: 'thin' | 'wide' | 'bushy'; color: string; delay: number }>
  }
  midground: {
    structures: Array<{ type: string; x: number; y: number }>
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
      { x: 50, y: 278, variant: 'medium', color: '#78716C' },
      { x: 680, y: 280, variant: 'small', color: '#78716C' },
    ],
    corals: [
      { x: 80, y: 274, variant: 'branch', color: '#E91E63' },
      { x: 320, y: 278, variant: 'brain', color: '#AB47BC' },
      { x: 440, y: 276, variant: 'fan', color: '#FF5722' },
      { x: 650, y: 274, variant: 'branch', color: '#F06292' },
    ],
    kelps: [
      { x: 10, height: 12, variant: 'thin', color: '#388E3C', delay: 0.2 },
      { x: 40, height: 10, variant: 'thin', color: '#4CAF50', delay: 0.7 },
      { x: 100, height: 14, variant: 'wide', color: '#2E7D32', delay: 1.3 },
      { x: 200, height: 12, variant: 'thin', color: '#388E3C', delay: 1.0 },
      { x: 280, height: 10, variant: 'thin', color: '#43A047', delay: 0.4 },
      { x: 350, height: 14, variant: 'wide', color: '#1B5E20', delay: 1.8 },
      { x: 460, height: 10, variant: 'thin', color: '#2E7D32', delay: 1.5 },
      { x: 540, height: 12, variant: 'thin', color: '#4CAF50', delay: 0.9 },
      { x: 620, height: 10, variant: 'wide', color: '#388E3C', delay: 0.3 },
      { x: 690, height: 14, variant: 'thin', color: '#2E7D32', delay: 1.1 },
      { x: 750, height: 10, variant: 'thin', color: '#43A047', delay: 0.7 },
      { x: 780, height: 12, variant: 'thin', color: '#1B5E20', delay: 1.6 },
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
      { x: 80, y: 280, variant: 'small', color: '#A8A29E' },
      { x: 600, y: 278, variant: 'medium', color: '#78716C' },
    ],
    corals: [
      { x: 120, y: 274, variant: 'branch', color: '#FF6D00' },
      { x: 230, y: 278, variant: 'brain', color: '#FF4081' },
      { x: 310, y: 276, variant: 'fan', color: '#FF1744' },
      { x: 560, y: 274, variant: 'branch', color: '#FF9100' },
    ],
    kelps: [
      { x: 10, height: 14, variant: 'thin', color: '#69F0AE', delay: 0.2 },
      { x: 50, height: 12, variant: 'wide', color: '#00E676', delay: 0.6 },
      { x: 100, height: 10, variant: 'thin', color: '#B9F6CA', delay: 1.3 },
      { x: 180, height: 14, variant: 'thin', color: '#69F0AE', delay: 0.4 },
      { x: 260, height: 10, variant: 'wide', color: '#76FF03', delay: 1.0 },
      { x: 340, height: 12, variant: 'thin', color: '#00E676', delay: 1.7 },
      { x: 420, height: 10, variant: 'thin', color: '#B9F6CA', delay: 0.8 },
      { x: 520, height: 14, variant: 'wide', color: '#69F0AE', delay: 0.5 },
      { x: 610, height: 10, variant: 'thin', color: '#76FF03', delay: 1.4 },
      { x: 700, height: 12, variant: 'thin', color: '#00E676', delay: 0.3 },
      { x: 750, height: 10, variant: 'wide', color: '#69F0AE', delay: 0.9 },
      { x: 780, height: 14, variant: 'thin', color: '#B9F6CA', delay: 1.6 },
    ],
  },
}

const SHIPWRECK_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#8B7355', lighter: '#A08B6C', detail: '#6B5B45' },
  background: {
    kelps: [
      // Left wide cluster
      { x: 5, height: 165, variant: 'wide', color: '#2E7D32', delay: 0 },
      { x: 18, height: 145, variant: 'wide', color: '#33691E', delay: 0.5 },
      { x: 32, height: 155, variant: 'wide', color: '#2E7D32', delay: 0.2 },
      // Left bushy cluster
      { x: 50, height: 170, variant: 'bushy', color: '#33691E', delay: 0.4 },
      { x: 63, height: 150, variant: 'bushy', color: '#1B5E20', delay: 0.9 },
      { x: 76, height: 160, variant: 'bushy', color: '#33691E', delay: 0.6 },
      // Scattered thin near wreck
      { x: 210, height: 155, variant: 'thin', color: '#558B2F', delay: 0.9 },
      { x: 222, height: 140, variant: 'thin', color: '#2E7D32', delay: 0.3 },
      { x: 234, height: 150, variant: 'thin', color: '#558B2F', delay: 0.7 },
      // Mid bushy cluster
      { x: 270, height: 165, variant: 'bushy', color: '#1B5E20', delay: 0.3 },
      { x: 283, height: 150, variant: 'bushy', color: '#2E7D32', delay: 0.8 },
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
      { x: 30, y: 276, variant: 'large', color: '#57534E' },
      { x: 680, y: 278, variant: 'medium', color: '#57534E' },
    ],
    corals: [
      { x: 300, y: 278, variant: 'branch', color: '#6D4C41' },
      { x: 440, y: 280, variant: 'brain', color: '#795548' },
      { x: 580, y: 276, variant: 'fan', color: '#8D6E63' },
    ],
    kelps: [
      { x: 80, height: 12, variant: 'thin', color: '#2E7D32', delay: 0.2 },
      { x: 160, height: 10, variant: 'wide', color: '#33691E', delay: 0.9 },
      { x: 200, height: 14, variant: 'thin', color: '#558B2F', delay: 0.5 },
      { x: 320, height: 10, variant: 'thin', color: '#2E7D32', delay: 1.3 },
      { x: 460, height: 12, variant: 'wide', color: '#1B5E20', delay: 0.7 },
      { x: 520, height: 10, variant: 'thin', color: '#33691E', delay: 0.8 },
      { x: 620, height: 14, variant: 'thin', color: '#2E7D32', delay: 1.5 },
      { x: 700, height: 10, variant: 'wide', color: '#558B2F', delay: 0.4 },
      { x: 750, height: 12, variant: 'thin', color: '#2E7D32', delay: 0.3 },
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
      { type: 'sailboat', x: 300, y: 142 },
      { type: 'anchor', x: 600, y: 140 },
    ],
  },
  foreground: {
    rocks: [
      { x: 80, y: 278, variant: 'medium', color: '#78716C' },
      { x: 680, y: 276, variant: 'medium', color: '#57534E' },
    ],
    corals: [
      { x: 180, y: 276, variant: 'branch', color: '#FF6D00' },
      { x: 420, y: 278, variant: 'fan', color: '#FF8A65' },
      { x: 560, y: 274, variant: 'brain', color: '#FFAB91' },
    ],
    kelps: [
      { x: 10, height: 12, variant: 'thin', color: '#388E3C', delay: 0.2 },
      { x: 30, height: 10, variant: 'wide', color: '#43A047', delay: 0.6 },
      { x: 160, height: 14, variant: 'thin', color: '#4CAF50', delay: 1.2 },
      { x: 230, height: 10, variant: 'thin', color: '#388E3C', delay: 0.4 },
      { x: 280, height: 12, variant: 'wide', color: '#2E7D32', delay: 1.0 },
      { x: 380, height: 10, variant: 'thin', color: '#43A047', delay: 1.6 },
      { x: 500, height: 14, variant: 'thin', color: '#388E3C', delay: 0.8 },
      { x: 580, height: 10, variant: 'wide', color: '#4CAF50', delay: 0.3 },
      { x: 650, height: 12, variant: 'thin', color: '#2E7D32', delay: 1.4 },
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
      { type: 'submarine', x: 260, y: 154 },
    ],
  },
  foreground: {
    rocks: [
      { x: 50, y: 276, variant: 'large', color: '#44403C' },
      { x: 700, y: 278, variant: 'medium', color: '#44403C' },
    ],
    corals: [
      { x: 160, y: 278, variant: 'brain', color: '#795548' },
      { x: 500, y: 276, variant: 'branch', color: '#6D4C41' },
      { x: 620, y: 280, variant: 'fan', color: '#8D6E63' },
    ],
    kelps: [
      { x: 20, height: 12, variant: 'thin', color: '#2E7D32', delay: 0.3 },
      { x: 130, height: 10, variant: 'wide', color: '#1B5E20', delay: 0.7 },
      { x: 200, height: 14, variant: 'thin', color: '#33691E', delay: 1.0 },
      { x: 240, height: 10, variant: 'thin', color: '#2E7D32', delay: 1.4 },
      { x: 380, height: 12, variant: 'wide', color: '#1B5E20', delay: 0.5 },
      { x: 480, height: 10, variant: 'thin', color: '#2E7D32', delay: 1.8 },
      { x: 560, height: 14, variant: 'thin', color: '#33691E', delay: 0.9 },
      { x: 640, height: 10, variant: 'wide', color: '#2E7D32', delay: 0.2 },
      { x: 680, height: 12, variant: 'thin', color: '#1B5E20', delay: 1.2 },
      { x: 760, height: 10, variant: 'thin', color: '#2E7D32', delay: 1.6 },
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
      { x: 170, y: 282, variant: 'small', color: '#78716C' },
      { x: 400, y: 280, variant: 'small', color: '#6B7280' },
      { x: 600, y: 281, variant: 'small', color: '#78716C' },
    ],
    corals: [
      { x: 100, y: 278, variant: 'branch', color: '#81C784' },
      { x: 280, y: 278, variant: 'branch', color: '#81C784' },
      { x: 450, y: 276, variant: 'fan', color: '#A5D6A7' },
      { x: 650, y: 277, variant: 'fan', color: '#81C784' },
    ],
    kelps: [
      // Dense foreground fringe
      { x: 10, height: 14, variant: 'thin', color: '#388E3C', delay: 0.3 },
      { x: 40, height: 12, variant: 'wide', color: '#43A047', delay: 0.7 },
      { x: 70, height: 16, variant: 'bushy', color: '#4CAF50', delay: 1.2 },
      { x: 100, height: 12, variant: 'thin', color: '#388E3C', delay: 0.5 },
      { x: 140, height: 14, variant: 'wide', color: '#2E7D32', delay: 0.9 },
      { x: 180, height: 10, variant: 'thin', color: '#43A047', delay: 1.5 },
      { x: 220, height: 14, variant: 'bushy', color: '#33691E', delay: 0.4 },
      { x: 260, height: 12, variant: 'wide', color: '#388E3C', delay: 1.0 },
      { x: 300, height: 16, variant: 'thin', color: '#4CAF50', delay: 0.6 },
      { x: 340, height: 12, variant: 'bushy', color: '#2E7D32', delay: 1.3 },
      { x: 380, height: 14, variant: 'wide', color: '#43A047', delay: 0.2 },
      { x: 420, height: 10, variant: 'thin', color: '#388E3C', delay: 0.8 },
      { x: 460, height: 14, variant: 'bushy', color: '#33691E', delay: 1.4 },
      { x: 500, height: 12, variant: 'wide', color: '#4CAF50', delay: 0.3 },
      { x: 540, height: 16, variant: 'thin', color: '#2E7D32', delay: 0.9 },
      { x: 580, height: 12, variant: 'wide', color: '#388E3C', delay: 0.5 },
      { x: 620, height: 14, variant: 'bushy', color: '#43A047', delay: 1.1 },
      { x: 660, height: 10, variant: 'thin', color: '#4CAF50', delay: 0.6 },
      { x: 700, height: 14, variant: 'wide', color: '#33691E', delay: 1.3 },
      { x: 740, height: 16, variant: 'bushy', color: '#2E7D32', delay: 0.2 },
      { x: 780, height: 12, variant: 'thin', color: '#388E3C', delay: 0.8 },
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
      { x: 60, y: 276, variant: 'large', color: '#57534E' },
      { x: 700, y: 278, variant: 'medium', color: '#57534E' },
    ],
    corals: [
      { x: 140, y: 278, variant: 'brain', color: '#795548' },
      { x: 420, y: 276, variant: 'branch', color: '#6D4C41' },
      { x: 600, y: 280, variant: 'fan', color: '#8D6E63' },
    ],
    kelps: [
      { x: 20, height: 12, variant: 'thin', color: '#2E7D32', delay: 0.3 },
      { x: 100, height: 10, variant: 'wide', color: '#33691E', delay: 0.8 },
      { x: 180, height: 14, variant: 'thin', color: '#1B5E20', delay: 1.2 },
      { x: 250, height: 10, variant: 'thin', color: '#2E7D32', delay: 0.5 },
      { x: 380, height: 12, variant: 'wide', color: '#33691E', delay: 1.6 },
      { x: 470, height: 10, variant: 'thin', color: '#2E7D32', delay: 0.2 },
      { x: 530, height: 14, variant: 'thin', color: '#1B5E20', delay: 0.9 },
      { x: 650, height: 10, variant: 'wide', color: '#2E7D32', delay: 1.4 },
      { x: 760, height: 12, variant: 'thin', color: '#33691E', delay: 0.7 },
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
      { x: 40, y: 278, variant: 'medium', color: '#A08B6C' },
      { x: 660, y: 276, variant: 'large', color: '#8B7355' },
    ],
    corals: [
      { x: 300, y: 278, variant: 'branch', color: '#F06292' },
      { x: 450, y: 280, variant: 'fan', color: '#E91E63' },
      { x: 580, y: 276, variant: 'brain', color: '#EC407A' },
    ],
    kelps: [
      { x: 15, height: 12, variant: 'thin', color: '#388E3C', delay: 0.2 },
      { x: 100, height: 10, variant: 'wide', color: '#558B2F', delay: 0.7 },
      { x: 200, height: 14, variant: 'thin', color: '#388E3C', delay: 1.0 },
      { x: 340, height: 10, variant: 'thin', color: '#2E7D32', delay: 0.4 },
      { x: 420, height: 12, variant: 'wide', color: '#558B2F', delay: 1.3 },
      { x: 500, height: 10, variant: 'thin', color: '#388E3C', delay: 1.5 },
      { x: 600, height: 14, variant: 'thin', color: '#2E7D32', delay: 0.6 },
      { x: 710, height: 10, variant: 'wide', color: '#388E3C', delay: 0.9 },
      { x: 780, height: 12, variant: 'thin', color: '#558B2F', delay: 1.7 },
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
      { x: 60, y: 280, variant: 'small', color: '#78716C' },
      { x: 350, y: 278, variant: 'medium', color: '#6B7280' },
    ],
    corals: [
      { x: 250, y: 278, variant: 'branch', color: '#E64A19' },
      { x: 440, y: 276, variant: 'brain', color: '#D84315' },
      { x: 620, y: 280, variant: 'fan', color: '#FF5722' },
    ],
    kelps: [
      { x: 15, height: 12, variant: 'thin', color: '#2E7D32', delay: 0.2 },
      { x: 80, height: 10, variant: 'wide', color: '#388E3C', delay: 0.6 },
      { x: 160, height: 14, variant: 'thin', color: '#43A047', delay: 0.8 },
      { x: 280, height: 10, variant: 'thin', color: '#2E7D32', delay: 1.3 },
      { x: 380, height: 12, variant: 'wide', color: '#1B5E20', delay: 0.4 },
      { x: 480, height: 10, variant: 'thin', color: '#2E7D32', delay: 0.5 },
      { x: 560, height: 14, variant: 'thin', color: '#388E3C', delay: 1.0 },
      { x: 650, height: 10, variant: 'wide', color: '#43A047', delay: 1.5 },
      { x: 740, height: 12, variant: 'thin', color: '#2E7D32', delay: 0.7 },
      { x: 780, height: 10, variant: 'thin', color: '#1B5E20', delay: 1.8 },
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
      { x: 50, y: 278, variant: 'medium', color: '#1F618D' },
      { x: 700, y: 276, variant: 'medium', color: '#1A5276' },
    ],
    corals: [
      { x: 200, y: 278, variant: 'branch', color: '#26C6DA' },
      { x: 300, y: 276, variant: 'fan', color: '#00BCD4' },
      { x: 450, y: 280, variant: 'brain', color: '#0097A7' },
      { x: 620, y: 274, variant: 'branch', color: '#4DD0E1' },
    ],
    kelps: [
      { x: 15, height: 12, variant: 'thin', color: '#00695C', delay: 0.2 },
      { x: 80, height: 10, variant: 'wide', color: '#00897B', delay: 0.6 },
      { x: 140, height: 14, variant: 'thin', color: '#004D40', delay: 1.0 },
      { x: 240, height: 10, variant: 'thin', color: '#00695C', delay: 0.4 },
      { x: 340, height: 12, variant: 'wide', color: '#00897B', delay: 1.3 },
      { x: 420, height: 10, variant: 'thin', color: '#004D40', delay: 0.8 },
      { x: 480, height: 14, variant: 'thin', color: '#00695C', delay: 1.4 },
      { x: 560, height: 10, variant: 'wide', color: '#00897B', delay: 0.5 },
      { x: 660, height: 12, variant: 'thin', color: '#004D40', delay: 1.7 },
      { x: 750, height: 10, variant: 'thin', color: '#00695C', delay: 0.2 },
      { x: 790, height: 14, variant: 'wide', color: '#00897B', delay: 0.9 },
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
}

// ─── Structure renderer ──────────────────────────────────────────────

function renderStructure(s: { type: string; x: number; y: number }) {
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
    default: return null
  }

  return (
    <g key={`${s.type}-${s.x}`} transform={`translate(${s.x}, ${s.y}) scale(2)`}>
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
        {fg.kelps.map((k, i) => <Kelp key={`fg-kelp-${i}`} {...k} baseY={305} />)}
        {fg.rocks.map((r, i) => <Rock key={`fg-rock-${i}`} {...r} />)}
        {fg.corals.map((c, i) => <Coral key={`fg-coral-${i}`} {...c} />)}
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
