'use client'

import { memo, useMemo, type ReactNode } from 'react'

// Aquatic decorations for the fishbowl — split into background, midground, and
// foreground layers with z-axis depth perspective (top of sand = back of tank).
// Sand covers bottom ~35% of tank (y≈208→320).
//
// Layer order (back to front / top to bottom):
//   1. SandyBottom (perspective slope: back of tank y≈208, front y≈300)
//   2. Background layer (plants rooted at back sand, baseY=240 — z-index 1)
//   3. Midground layer (structures sitting on back sand — z-index 12)
//   4. Fish swim here (z-index 10-20)
//   5. Foreground layer (small rocks, corals, short plants at front sand, baseY=305 — z-index 25)

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
    {/* Left pillar — layered coral mass */}
    <rect x="0" y="24" width="20" height="36" fill="#C2185B" />
    <rect x="2" y="18" width="18" height="10" fill="#D81B60" />
    <rect x="4" y="12" width="14" height="8" fill="#E91E63" />
    <rect x="6" y="8" width="12" height="6" fill="#F06292" />
    {/* Left pillar texture: brain coral ridges */}
    <rect x="2" y="22" width="16" height="1" fill="#F48FB1" opacity="0.4" />
    <rect x="4" y="28" width="14" height="1" fill="#F48FB1" opacity="0.35" />
    <rect x="2" y="34" width="16" height="1" fill="#F48FB1" opacity="0.3" />
    <rect x="4" y="40" width="14" height="1" fill="#F48FB1" opacity="0.3" />
    <rect x="6" y="46" width="10" height="1" fill="#F48FB1" opacity="0.25" />
    {/* Left pillar: barnacles and detail */}
    <rect x="0" y="36" width="3" height="3" fill="#9CA3AF" opacity="0.5" />
    <rect x="16" y="42" width="3" height="2" fill="#9CA3AF" opacity="0.4" />
    <rect x="2" y="50" width="4" height="2" fill="#2E7D32" opacity="0.5" />

    {/* Right pillar — different coral species */}
    <rect x="70" y="20" width="22" height="40" fill="#FF5722" />
    <rect x="72" y="14" width="18" height="10" fill="#FF7043" />
    <rect x="74" y="8" width="16" height="8" fill="#FF8A65" />
    <rect x="76" y="4" width="12" height="6" fill="#FFAB91" />
    {/* Right pillar texture: staghorn branches */}
    <rect x="88" y="16" width="8" height="3" fill="#FF8A65" opacity="0.8" />
    <rect x="92" y="12" width="6" height="3" fill="#FFAB91" opacity="0.7" />
    <rect x="90" y="8" width="4" height="3" fill="#FFCCBC" opacity="0.6" />
    <rect x="70" y="22" width="4" height="6" fill="#BF360C" opacity="0.3" />
    {/* Right pillar: sea fans attached */}
    <rect x="66" y="24" width="6" height="8" fill="#AB47BC" opacity="0.5" />
    <rect x="64" y="20" width="4" height="6" fill="#CE93D8" opacity="0.4" />
    {/* Right pillar: barnacles */}
    <rect x="86" y="38" width="3" height="3" fill="#9CA3AF" opacity="0.4" />
    <rect x="72" y="50" width="4" height="2" fill="#2E7D32" opacity="0.4" />

    {/* Arch bridge — connecting coral top */}
    <rect x="10" y="4" width="72" height="8" fill="#E91E63" />
    <rect x="16" y="0" width="60" height="6" fill="#F06292" />
    <rect x="22" y="-2" width="48" height="4" fill="#F48FB1" opacity="0.8" />
    {/* Arch texture */}
    <rect x="20" y="6" width="52" height="1" fill="#AD1457" opacity="0.3" />
    <rect x="26" y="2" width="40" height="1" fill="#F48FB1" opacity="0.3" />
    {/* Hanging bits from arch */}
    <rect x="30" y="10" width="3" height="4" fill="#E91E63" opacity="0.6" />
    <rect x="50" y="10" width="3" height="6" fill="#F06292" opacity="0.5" />
    <rect x="62" y="10" width="2" height="3" fill="#E91E63" opacity="0.5" />

    {/* Small coral growing on arch */}
    <rect x="36" y="-4" width="6" height="4" fill="#FFD600" opacity="0.6" />
    <rect x="38" y="-8" width="4" height="4" fill="#FFEE58" opacity="0.5" />
    <rect x="56" y="-3" width="4" height="3" fill="#00BCD4" opacity="0.5" />

    {/* Anemone at base */}
    <rect x="8" y="56" width="8" height="4" fill="#7B1FA2" opacity="0.6" />
    <rect x="6" y="52" width="4" height="4" fill="#CE93D8" opacity="0.5" />
    <rect x="14" y="54" width="4" height="4" fill="#BA68C8" opacity="0.5" />

    {/* Occasional bubbles rising from arch crevices */}
    <circle cx="42" cy="0" r="1.5" fill="rgba(255,255,255,0.3)" style={{ animation: 'bubbleRise 3.5s ease-in 0s infinite' }} />
    <circle cx="38" cy="2" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4s ease-in 1s infinite' }} />
    <circle cx="46" cy="-1" r="1.2" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 3s ease-in 2s infinite' }} />
  </g>
))
CoralReefArch.displayName = 'CoralReefArch'

// ─── OCEAN: Sunken Ancient Temple ────────────────────────────────────

const SunkenTemple = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Base platform — mossy stone */}
    <rect x="0" y="48" width="80" height="12" fill="#57534E" />
    <rect x="2" y="44" width="76" height="6" fill="#6B7280" />
    <rect x="0" y="48" width="80" height="1" fill="#78909C" opacity="0.3" />
    {/* Steps */}
    <rect x="4" y="40" width="72" height="6" fill="#78716C" />
    <rect x="8" y="36" width="64" height="6" fill="#78716C" />

    {/* Left column — intact */}
    <rect x="10" y="4" width="8" height="34" fill="#9E9E9E" />
    <rect x="8" y="0" width="12" height="6" fill="#BDBDBD" />
    <rect x="8" y="34" width="12" height="4" fill="#BDBDBD" />
    {/* Column fluting (vertical lines) */}
    <rect x="12" y="6" width="1" height="28" fill="#BDBDBD" opacity="0.3" />
    <rect x="15" y="6" width="1" height="28" fill="#757575" opacity="0.2" />

    {/* Right column — broken at top */}
    <rect x="62" y="14" width="8" height="24" fill="#9E9E9E" />
    <rect x="60" y="34" width="12" height="4" fill="#BDBDBD" />
    {/* Broken top */}
    <rect x="62" y="12" width="6" height="4" fill="#9E9E9E" />
    <rect x="64" y="10" width="4" height="4" fill="#BDBDBD" />
    {/* Column fluting */}
    <rect x="64" y="16" width="1" height="18" fill="#BDBDBD" opacity="0.3" />
    <rect x="67" y="16" width="1" height="18" fill="#757575" opacity="0.2" />

    {/* Lintel (top beam) — cracked */}
    <rect x="8" y="0" width="48" height="4" fill="#BDBDBD" />
    <rect x="6" y="-2" width="52" height="4" fill="#E0E0E0" />
    {/* Crack in lintel */}
    <rect x="32" y="-2" width="1" height="6" fill="#616161" opacity="0.5" />
    <rect x="33" y="0" width="1" height="3" fill="#616161" opacity="0.4" />

    {/* Stone face carving (center) */}
    <rect x="28" y="20" width="24" height="16" fill="#78716C" />
    <rect x="30" y="18" width="20" height="4" fill="#8D8D8D" />
    {/* Eyes */}
    <rect x="32" y="24" width="4" height="3" fill="#1A1A2E" opacity="0.7" />
    <rect x="42" y="24" width="4" height="3" fill="#1A1A2E" opacity="0.7" />
    {/* Nose */}
    <rect x="38" y="28" width="3" height="3" fill="#6B7280" />
    {/* Mouth */}
    <rect x="34" y="32" width="10" height="2" fill="#4B5563" opacity="0.5" />

    {/* Algae and moss growth */}
    <rect x="10" y="28" width="6" height="3" fill="#2E7D32" opacity="0.5" />
    <rect x="0" y="52" width="8" height="3" fill="#388E3C" opacity="0.4" />
    <rect x="64" y="30" width="6" height="2" fill="#1B5E20" opacity="0.5" />
    <rect x="40" y="44" width="10" height="2" fill="#2E7D32" opacity="0.3" />
    {/* Barnacles on stone */}
    <rect x="18" y="22" width="2" height="2" fill="#9CA3AF" opacity="0.4" />
    <rect x="60" y="26" width="3" height="2" fill="#9CA3AF" opacity="0.3" />

    {/* Fallen rubble */}
    <rect x="72" y="46" width="10" height="6" fill="#9E9E9E" opacity="0.6" />
    <rect x="74" y="42" width="6" height="6" fill="#BDBDBD" opacity="0.5" />
    <rect x="-4" y="50" width="8" height="4" fill="#9E9E9E" opacity="0.5" />

    {/* Occasional bubbles from temple crevices */}
    <circle cx="40" cy="16" r="1.2" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 4s ease-in 0.5s infinite' }} />
    <circle cx="38" cy="18" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4.5s ease-in 2s infinite' }} />
  </g>
))
SunkenTemple.displayName = 'SunkenTemple'

// ─── TROPICAL: Volcano Formation ─────────────────────────────────────

const VolcanoFormation = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Base — wide lava rock */}
    <rect x="0" y="40" width="70" height="20" fill="#37474F" />
    <rect x="4" y="32" width="62" height="12" fill="#455A64" />
    <rect x="10" y="24" width="50" height="12" fill="#546E7A" />
    <rect x="16" y="16" width="38" height="12" fill="#607D8B" />
    <rect x="22" y="8" width="26" height="12" fill="#78909C" />
    <rect x="26" y="2" width="18" height="10" fill="#90A4AE" />

    {/* Crater opening */}
    <rect x="28" y="0" width="14" height="4" fill="#1A1A1A" />
    <rect x="30" y="-2" width="10" height="4" fill="#BF360C" opacity="0.6" />

    {/* Lava glow in cracks */}
    <rect x="30" y="2" width="2" height="8" fill="#FF6D00" opacity="0.4" />
    <rect x="38" y="4" width="2" height="6" fill="#FF6D00" opacity="0.3" />
    <rect x="24" y="18" width="2" height="10" fill="#DD2C00" opacity="0.25" />
    <rect x="44" y="20" width="2" height="8" fill="#DD2C00" opacity="0.2" />

    {/* Rock texture — porous lava rock */}
    <rect x="8" y="36" width="3" height="3" fill="#263238" opacity="0.5" />
    <rect x="20" y="28" width="4" height="3" fill="#263238" opacity="0.4" />
    <rect x="42" y="30" width="3" height="4" fill="#263238" opacity="0.4" />
    <rect x="54" y="38" width="4" height="3" fill="#263238" opacity="0.5" />
    <rect x="14" y="44" width="4" height="3" fill="#263238" opacity="0.3" />
    <rect x="50" y="46" width="3" height="3" fill="#263238" opacity="0.3" />

    {/* Warm moss near vents */}
    <rect x="32" y="10" width="6" height="2" fill="#FF8F00" opacity="0.3" />
    <rect x="18" y="22" width="4" height="2" fill="#558B2F" opacity="0.4" />
    <rect x="48" y="24" width="6" height="2" fill="#558B2F" opacity="0.3" />

    {/* Bubble stream from crater */}
    <circle cx="35" cy="-4" r="1.5" fill="rgba(255,255,255,0.3)" style={{ animation: 'bubbleRise 3s ease-in 0s infinite' }} />
    <circle cx="33" cy="-2" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4s ease-in 0.8s infinite' }} />
    <circle cx="37" cy="-3" r="1.2" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 3.5s ease-in 1.5s infinite' }} />
  </g>
))
VolcanoFormation.displayName = 'VolcanoFormation'

// ─── TROPICAL: Dragon Stone Archway ──────────────────────────────────

const DragonStoneArch = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Left pillar — dragon stone with pitted texture */}
    <rect x="0" y="16" width="18" height="44" fill="#8D6E63" />
    <rect x="2" y="10" width="16" height="8" fill="#A1887F" />
    <rect x="4" y="6" width="12" height="6" fill="#BCAAA4" />
    {/* Pitting texture (dragon stone signature) */}
    <rect x="4" y="20" width="3" height="3" fill="#5D4037" opacity="0.5" />
    <rect x="10" y="26" width="4" height="2" fill="#5D4037" opacity="0.4" />
    <rect x="2" y="34" width="3" height="4" fill="#5D4037" opacity="0.5" />
    <rect x="12" y="38" width="3" height="3" fill="#5D4037" opacity="0.4" />
    <rect x="6" y="46" width="4" height="3" fill="#5D4037" opacity="0.3" />
    <rect x="8" y="16" width="2" height="3" fill="#4E342E" opacity="0.3" />

    {/* Right pillar */}
    <rect x="58" y="14" width="18" height="46" fill="#8D6E63" />
    <rect x="60" y="8" width="14" height="8" fill="#A1887F" />
    <rect x="62" y="4" width="12" height="6" fill="#BCAAA4" />
    {/* Right pitting */}
    <rect x="62" y="18" width="4" height="3" fill="#5D4037" opacity="0.5" />
    <rect x="68" y="28" width="3" height="4" fill="#5D4037" opacity="0.4" />
    <rect x="60" y="36" width="3" height="3" fill="#5D4037" opacity="0.5" />
    <rect x="70" y="42" width="4" height="3" fill="#5D4037" opacity="0.4" />
    <rect x="64" y="50" width="3" height="2" fill="#5D4037" opacity="0.3" />

    {/* Arch bridge */}
    <rect x="8" y="2" width="62" height="6" fill="#A1887F" />
    <rect x="14" y="-2" width="50" height="6" fill="#BCAAA4" />
    <rect x="20" y="-4" width="38" height="4" fill="#D7CCC8" opacity="0.7" />
    {/* Arch pitting */}
    <rect x="24" y="0" width="3" height="2" fill="#5D4037" opacity="0.3" />
    <rect x="40" y="-2" width="4" height="2" fill="#5D4037" opacity="0.3" />
    <rect x="52" y="0" width="3" height="3" fill="#5D4037" opacity="0.25" />

    {/* Plants growing from crevices */}
    <rect x="16" y="2" width="3" height="6" fill="#00C853" opacity="0.6" />
    <rect x="15" y="-2" width="4" height="4" fill="#69F0AE" opacity="0.5" />
    <rect x="56" y="0" width="3" height="5" fill="#00E676" opacity="0.5" />
    {/* Moss patches */}
    <rect x="0" y="52" width="6" height="2" fill="#2E7D32" opacity="0.4" />
    <rect x="68" y="54" width="6" height="2" fill="#2E7D32" opacity="0.4" />
  </g>
))
DragonStoneArch.displayName = 'DragonStoneArch'

// ─── SHIPWRECK: Sunken Submarine (enhanced) ─────────────────────────

const SunkenSubmarine = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Main hull — tilted slightly */}
    <rect x="10" y="16" width="80" height="28" fill="#37474F" />
    <rect x="6" y="20" width="8" height="20" fill="#455A64" />
    <rect x="86" y="20" width="10" height="20" fill="#455A64" />
    {/* Hull top curve */}
    <rect x="14" y="12" width="76" height="6" fill="#546E7A" />
    <rect x="20" y="8" width="64" height="6" fill="#607D8B" />
    {/* Hull bottom */}
    <rect x="14" y="42" width="76" height="4" fill="#263238" />

    {/* Hull panel lines */}
    <rect x="14" y="24" width="48" height="1" fill="#2C3E50" opacity="0.3" />
    <rect x="14" y="32" width="48" height="1" fill="#2C3E50" opacity="0.25" />
    {/* Rivets along hull */}
    {[18, 26, 34, 42, 50, 58, 74, 82].map((rx, i) => (
      <circle key={`rivet-t-${i}`} cx={rx} cy={13} r="0.8" fill="#78909C" opacity="0.4" />
    ))}
    {[18, 26, 34, 42, 50, 58, 74, 82].map((rx, i) => (
      <circle key={`rivet-b-${i}`} cx={rx} cy={43} r="0.8" fill="#546E7A" opacity="0.35" />
    ))}

    {/* Torpedo tubes at bow */}
    <rect x="88" y="24" width="10" height="3" fill="#455A64" />
    <rect x="88" y="30" width="10" height="3" fill="#455A64" />
    <circle cx="98" cy="25.5" r="1.5" fill="#263238" />
    <circle cx="98" cy="31.5" r="1.5" fill="#263238" />

    {/* Hydroplanes (fins) */}
    <rect x="4" y="18" width="6" height="2" fill="#607D8B" />
    <rect x="2" y="16" width="4" height="2" fill="#78909C" opacity="0.7" />
    <rect x="4" y="34" width="6" height="2" fill="#607D8B" />
    <rect x="2" y="36" width="4" height="2" fill="#78909C" opacity="0.7" />

    {/* Conning tower (sail) */}
    <rect x="38" y="0" width="20" height="12" fill="#546E7A" />
    <rect x="40" y="-4" width="16" height="6" fill="#607D8B" />
    {/* Periscope — bent */}
    <rect x="46" y="-14" width="3" height="12" fill="#78909C" />
    <rect x="44" y="-16" width="6" height="3" fill="#90A4AE" />
    <rect x="48" y="-12" width="3" height="4" fill="#78909C" transform="rotate(15, 49, -10)" />
    {/* Radar mast */}
    <rect x="52" y="-8" width="2" height="8" fill="#78909C" />
    <rect x="50" y="-10" width="6" height="2" fill="#90A4AE" />

    {/* Trailing kelp from conning tower */}
    <rect x="40" y="-4" width="3" height="8" fill="#2E7D32" opacity="0.35" style={{ animation: 'kelpSway 5s ease-in-out 0s infinite', transformOrigin: '41px -4px' }} />
    <rect x="54" y="-2" width="2" height="6" fill="#388E3C" opacity="0.3" style={{ animation: 'kelpSway 4s ease-in-out 1s infinite', transformOrigin: '55px -2px' }} />

    {/* Hull breach (fish swim-through hole) */}
    <rect x="62" y="22" width="14" height="14" fill="#0A1628" opacity="0.8" />
    <rect x="64" y="20" width="10" height="2" fill="#263238" />
    <rect x="64" y="36" width="10" height="2" fill="#263238" />
    {/* Torn metal around breach */}
    <rect x="60" y="22" width="3" height="4" fill="#455A64" />
    <rect x="75" y="26" width="3" height="4" fill="#455A64" />
    <rect x="66" y="18" width="4" height="3" fill="#546E7A" />
    {/* Bent metal shards */}
    <rect x="61" y="34" width="2" height="3" fill="#546E7A" opacity="0.6" />
    <rect x="74" y="22" width="2" height="3" fill="#546E7A" opacity="0.5" />

    {/* Portholes — 3 now */}
    <circle cx="26" cy="28" r="4" fill="#0D2137" stroke="#78909C" strokeWidth="1.5" />
    <circle cx="26" cy="28" r="2" fill="#1A5276" opacity="0.5" />
    <circle cx="42" cy="28" r="4" fill="#0D2137" stroke="#78909C" strokeWidth="1.5" />
    <circle cx="42" cy="28" r="2" fill="#1A5276" opacity="0.4" />
    <circle cx="82" cy="28" r="4" fill="#0D2137" stroke="#78909C" strokeWidth="1.5" />
    <circle cx="82" cy="28" r="2" fill="#1A5276" opacity="0.3" />

    {/* Propeller at stern */}
    <rect x="0" y="22" width="8" height="3" fill="#78909C" />
    <rect x="-4" y="18" width="6" height="14" fill="#607D8B" opacity="0.7" />
    <rect x="-2" y="16" width="2" height="4" fill="#90A4AE" opacity="0.6" />
    <rect x="-2" y="30" width="2" height="4" fill="#90A4AE" opacity="0.6" />
    {/* Extra prop blades */}
    <rect x="-6" y="20" width="4" height="2" fill="#90A4AE" opacity="0.4" />
    <rect x="-6" y="28" width="4" height="2" fill="#90A4AE" opacity="0.4" />

    {/* Rust patches — more extensive */}
    <rect x="30" y="32" width="8" height="4" fill="#BF360C" opacity="0.3" />
    <rect x="50" y="14" width="6" height="4" fill="#E65100" opacity="0.25" />
    <rect x="18" y="38" width="10" height="3" fill="#BF360C" opacity="0.2" />
    <rect x="80" y="30" width="6" height="4" fill="#E65100" opacity="0.2" />
    <rect x="40" y="40" width="12" height="3" fill="#BF360C" opacity="0.15" />
    <rect x="70" y="14" width="8" height="3" fill="#E65100" opacity="0.15" />
    <rect x="22" y="20" width="6" height="4" fill="#8B4513" opacity="0.15" />

    {/* Barnacles — more clusters */}
    <rect x="20" y="42" width="3" height="3" fill="#9CA3AF" opacity="0.4" />
    <rect x="56" y="44" width="4" height="2" fill="#9CA3AF" opacity="0.35" />
    <rect x="84" y="38" width="3" height="3" fill="#9CA3AF" opacity="0.4" />
    <rect x="10" y="40" width="4" height="3" fill="#B0BEC5" opacity="0.3" />
    <rect x="44" y="44" width="3" height="2" fill="#9CA3AF" opacity="0.3" />
    <rect x="76" y="44" width="5" height="2" fill="#B0BEC5" opacity="0.3" />

    {/* Anemones growing on hull */}
    <rect x="28" y="42" width="6" height="4" fill="#7B1FA2" opacity="0.5" />
    <rect x="26" y="38" width="3" height="4" fill="#CE93D8" opacity="0.4" />
    <rect x="33" y="40" width="3" height="4" fill="#BA68C8" opacity="0.4" />

    {/* Algae growth — more */}
    <rect x="38" y="8" width="6" height="3" fill="#2E7D32" opacity="0.4" />
    <rect x="14" y="18" width="4" height="2" fill="#388E3C" opacity="0.3" />
    <rect x="72" y="42" width="8" height="2" fill="#1B5E20" opacity="0.4" />
    <rect x="90" y="24" width="4" height="3" fill="#2E7D32" opacity="0.25" />
    <rect x="8" y="28" width="3" height="2" fill="#388E3C" opacity="0.2" />

    {/* Coral encrustation at base */}
    <rect x="14" y="44" width="8" height="4" fill="#E91E63" opacity="0.25" />
    <rect x="16" y="42" width="4" height="3" fill="#F48FB1" opacity="0.2" />

    {/* Occasional bubbles from hull breach */}
    <circle cx="68" cy="20" r="1.5" fill="rgba(255,255,255,0.3)" style={{ animation: 'bubbleRise 3s ease-in 0s infinite' }} />
    <circle cx="72" cy="18" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 3.5s ease-in 0.8s infinite' }} />
    <circle cx="70" cy="22" r="1.2" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 4s ease-in 1.5s infinite' }} />
    <circle cx="66" cy="19" r="0.8" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4.5s ease-in 2.5s infinite' }} />
    <circle cx="69" cy="16" r="0.6" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5s ease-in 3.5s infinite' }} />
  </g>
))
SunkenSubmarine.displayName = 'SunkenSubmarine'

// ─── SHIPWRECK: Treasure Chest Cluster ───────────────────────────────

const TreasureCluster = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Large treasure chest — open */}
    <rect x="0" y="28" width="32" height="16" fill="#6B4C3A" />
    <rect x="2" y="24" width="28" height="6" fill="#7A5B48" />
    {/* Lid — open at angle */}
    <rect x="-2" y="18" width="30" height="8" fill="#8B6C58" />
    <rect x="0" y="16" width="26" height="4" fill="#9C7D68" />
    {/* Metal bands */}
    <rect x="0" y="32" width="32" height="2" fill="#D4A43A" opacity="0.6" />
    <rect x="0" y="38" width="32" height="2" fill="#D4A43A" opacity="0.5" />
    <rect x="-2" y="20" width="30" height="1" fill="#D4A43A" opacity="0.5" />
    {/* Lock */}
    <rect x="12" y="28" width="6" height="4" fill="#D4A43A" />
    <rect x="13" y="29" width="4" height="2" fill="#B8862D" />
    {/* Chest wood grain */}
    <rect x="2" y="34" width="28" height="1" fill="#5D3A2A" opacity="0.2" />
    <rect x="2" y="36" width="28" height="1" fill="#5D3A2A" opacity="0.15" />

    {/* Gold and jewels spilling */}
    <circle cx="34" cy="42" r="3" fill="#FFD700" opacity="0.85" />
    <circle cx="38" cy="40" r="2" fill="#FFD700" opacity="0.7" />
    <circle cx="36" cy="38" r="2.5" fill="#FFC107" opacity="0.6" />
    <circle cx="-4" cy="44" r="2" fill="#FFD700" opacity="0.5" />
    <circle cx="32" cy="36" r="1.5" fill="#E91E63" opacity="0.6" /> {/* Ruby */}
    <circle cx="28" cy="26" r="1.5" fill="#2196F3" opacity="0.6" /> {/* Sapphire */}
    <circle cx="8" cy="26" r="1" fill="#4CAF50" opacity="0.5" /> {/* Emerald */}
    <rect x="4" y="24" width="8" height="3" fill="#FFD700" opacity="0.5" /> {/* Gold pile inside */}
    <rect x="14" y="22" width="6" height="4" fill="#FFC107" opacity="0.4" />

    {/* Crown / tiara among treasure */}
    <rect x="6" y="20" width="10" height="3" fill="#FFD700" opacity="0.7" />
    <rect x="7" y="18" width="2" height="3" fill="#FFD700" opacity="0.6" />
    <rect x="11" y="17" width="2" height="4" fill="#FFD700" opacity="0.6" />
    <rect x="15" y="18" width="2" height="3" fill="#FFD700" opacity="0.6" />
    <circle cx="12" cy="18" r="1" fill="#E91E63" opacity="0.5" /> {/* Crown jewel */}

    {/* Pearl necklace draped over chest edge */}
    {[0, 4, 8, 12, 16, 20].map((px, i) => (
      <circle key={`pearl-${i}`} cx={-2 + px} cy={26 + (i % 2)} r="1" fill="#F5F5F5" opacity="0.5" />
    ))}

    {/* Sword stuck in sand */}
    <rect x="60" y="16" width="2" height="30" fill="#9E9E9E" />
    <rect x="56" y="14" width="10" height="3" fill="#BDBDBD" />
    <rect x="60" y="10" width="2" height="6" fill="#795548" />
    <rect x="59" y="8" width="4" height="3" fill="#A1887F" />
    <rect x="60" y="40" width="2" height="6" fill="#78909C" opacity="0.5" />

    {/* Small closed chest nearby */}
    <rect x="64" y="38" width="16" height="8" fill="#5D3A2A" />
    <rect x="66" y="36" width="12" height="4" fill="#6B4C3A" />
    <rect x="64" y="42" width="16" height="1" fill="#D4A43A" opacity="0.4" />
    <rect x="70" y="38" width="4" height="2" fill="#D4A43A" opacity="0.3" />

    {/* Skeleton hand reaching from sand */}
    <rect x="52" y="40" width="2" height="6" fill="#E0E0E0" opacity="0.4" />
    <rect x="50" y="38" width="2" height="3" fill="#EEEEEE" opacity="0.35" />
    <rect x="54" y="38" width="2" height="4" fill="#E0E0E0" opacity="0.3" />
    <rect x="48" y="36" width="2" height="3" fill="#EEEEEE" opacity="0.3" />

    {/* Scattered coins */}
    <circle cx="10" cy="46" r="1.5" fill="#FFD700" opacity="0.4" />
    <circle cx="22" cy="44" r="1" fill="#FFC107" opacity="0.3" />
    <circle cx="44" cy="44" r="1.5" fill="#FFD700" opacity="0.35" />
    <circle cx="16" cy="48" r="1" fill="#FFD700" opacity="0.3" />
    <circle cx="38" cy="46" r="1.2" fill="#FFC107" opacity="0.25" />
    <circle cx="56" cy="46" r="1" fill="#FFD700" opacity="0.3" />
    <circle cx="70" cy="46" r="1.2" fill="#FFD700" opacity="0.25" />
    <circle cx="30" cy="48" r="0.8" fill="#FFC107" opacity="0.2" />

    {/* Chain trailing in the sand */}
    <path d="M34 44 Q40 42 46 44 Q50 46 54 44" stroke="#4B5563" strokeWidth="1.5" fill="none" opacity="0.35" />
  </g>
))
TreasureCluster.displayName = 'TreasureCluster'

// ─── Standalone Anchor (for sailboat theme) ─────────────────────────

const SunkenAnchor = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Anchor shank (vertical bar) */}
    <rect x="18" y="-10" width="4" height="54" fill="#4B5563" rx="1" />
    {/* Ring at top */}
    <circle cx="20" cy="-6" r="7" fill="none" stroke="#4B5563" strokeWidth="3.5" />
    {/* Stock (horizontal bar at top) */}
    <rect x="6" y="-12" width="28" height="3.5" fill="#6B7280" rx="1" />
    {/* Crown / arms (curved flukes) */}
    <path d="M8 38 Q6 32 10 28 Q14 26 18 30 L18 40 Q14 42 8 38Z" fill="#6B7280" />
    <path d="M32 38 Q34 32 30 28 Q26 26 22 30 L22 40 Q26 42 32 38Z" fill="#6B7280" />
    {/* Fluke tips (pointed) */}
    <path d="M8 38 L2 46 L12 42 Z" fill="#546E7A" />
    <path d="M32 38 L38 46 L28 42 Z" fill="#546E7A" />
    {/* Rust patches */}
    <ellipse cx="20" cy="10" rx="3" ry="4" fill="#B45309" opacity="0.25" />
    <ellipse cx="12" cy="36" rx="3" ry="2" fill="#B45309" opacity="0.2" />
    <ellipse cx="20" cy="24" rx="2" ry="3" fill="#8B4513" opacity="0.18" />
    {/* Rope coiled around shank */}
    <path d="M14 16 Q20 14 26 16" stroke="#A08060" strokeWidth="1.5" fill="none" opacity="0.55" />
    <path d="M13 20 Q20 18 27 20" stroke="#C4A862" strokeWidth="1.5" fill="none" opacity="0.45" />
    <path d="M14 24 Q20 22 26 24" stroke="#A08060" strokeWidth="1.5" fill="none" opacity="0.4" />
    {/* Chain draped from ring */}
    <path d="M14 -8 Q8 -4 4 2 Q2 8 4 14" stroke="#4B5563" strokeWidth="2" fill="none" opacity="0.45" />
    {/* Barnacles */}
    <circle cx="24" cy="32" r="1.5" fill="#9CA3AF" opacity="0.35" />
    <circle cx="16" cy="18" r="1" fill="#9CA3AF" opacity="0.3" />
    {/* Seaweed on anchor */}
    <path d="M26 28 Q30 24 28 18" stroke="#2E7D32" strokeWidth="1" fill="none" opacity="0.35" />
  </g>
))
SunkenAnchor.displayName = 'SunkenAnchor'

// ─── SHIPWRECK: Sunken Pirate Galleon ────────────────────────────────

const SunkenShip = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    <defs>
      <linearGradient id="hull-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#795548" />
        <stop offset="50%" stopColor="#5D4037" />
        <stop offset="100%" stopColor="#3E2723" />
      </linearGradient>
      <linearGradient id="stern-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8D6E63" />
        <stop offset="100%" stopColor="#5D4037" />
      </linearGradient>
    </defs>

    {/* Main hull — curved galleon shape, slightly tilted */}
    <path d="M-14 46 Q-18 38 -12 30 Q0 20 20 18 L110 16 Q128 18 134 28 Q138 36 132 50 Q128 58 120 62 L10 64 Q-8 62 -14 46Z" fill="url(#hull-grad)" />
    {/* Keel line */}
    <path d="M-8 60 Q10 68 65 70 Q120 68 132 58" stroke="#3E2723" strokeWidth="3" fill="none" />
    {/* Hull planking lines (curved) */}
    <path d="M-10 36 Q30 32 70 30 Q110 32 130 36" stroke="#8D6E63" strokeWidth="0.8" fill="none" opacity="0.4" />
    <path d="M-12 44 Q30 40 70 38 Q110 40 130 44" stroke="#8D6E63" strokeWidth="0.8" fill="none" opacity="0.35" />
    <path d="M-10 52 Q30 48 70 46 Q110 48 128 52" stroke="#8D6E63" strokeWidth="0.8" fill="none" opacity="0.3" />

    {/* Gun ports (dark holes along hull) */}
    <ellipse cx="20" cy="40" rx="4" ry="3" fill="#1A0E08" opacity="0.7" />
    <ellipse cx="40" cy="38" rx="4" ry="3" fill="#1A0E08" opacity="0.7" />
    <ellipse cx="60" cy="37" rx="4" ry="3" fill="#1A0E08" opacity="0.7" />
    <ellipse cx="80" cy="38" rx="4" ry="3" fill="#1A0E08" opacity="0.7" />
    <ellipse cx="100" cy="40" rx="4" ry="3" fill="#1A0E08" opacity="0.7" />
    {/* Cannons poking out */}
    <path d="M16 40 L10 40" stroke="#455A64" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M56 37 L50 38" stroke="#455A64" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M96 40 L90 40" stroke="#455A64" strokeWidth="2.5" strokeLinecap="round" />

    {/* Stern — ornate captain's quarters */}
    <path d="M110 16 Q118 8 130 4 Q138 2 140 8 L142 56 Q140 62 132 64 L120 62 Q114 58 110 48Z" fill="url(#stern-grad)" />
    {/* Stern gallery windows */}
    <ellipse cx="128" cy="18" rx="4" ry="5" fill="#0A1628" opacity="0.8" />
    <ellipse cx="128" cy="18" rx="4" ry="5" fill="none" stroke="#A1887F" strokeWidth="0.8" />
    <ellipse cx="136" cy="20" rx="3" ry="4" fill="#0A1628" opacity="0.7" />
    <ellipse cx="136" cy="20" rx="3" ry="4" fill="none" stroke="#A1887F" strokeWidth="0.7" />
    <ellipse cx="128" cy="32" rx="4" ry="5" fill="#0A1628" opacity="0.6" />
    <ellipse cx="128" cy="32" rx="4" ry="5" fill="none" stroke="#A1887F" strokeWidth="0.7" />
    {/* Stern decorative scrollwork */}
    <path d="M122 6 Q126 2 132 4" stroke="#D4A43A" strokeWidth="0.8" fill="none" opacity="0.5" />
    <path d="M120 10 Q128 6 136 8" stroke="#D4A43A" strokeWidth="0.6" fill="none" opacity="0.4" />
    {/* Stern railing / taffrail */}
    <path d="M118 4 Q130 0 140 4" stroke="#A1887F" strokeWidth="1.5" fill="none" opacity="0.6" />

    {/* Bow — sharp curved prow */}
    <path d="M-12 30 Q-20 26 -24 20 Q-26 14 -22 10 Q-18 6 -14 8 Q-8 12 -4 18 Q0 22 4 24" fill="#6D4C41" />
    {/* Bowsprit (angled forward spar) */}
    <path d="M-22 12 L-40 -4" stroke="#8D6E63" strokeWidth="3" strokeLinecap="round" />
    <path d="M-40 -4 L-44 -6" stroke="#A1887F" strokeWidth="2" strokeLinecap="round" />
    {/* Figurehead beneath bowsprit */}
    <path d="M-26 16 Q-30 12 -28 8 Q-26 6 -24 8 L-22 14" fill="#D4A43A" opacity="0.6" />
    <circle cx="-27" cy="9" r="2" fill="#E8C468" opacity="0.5" />

    {/* Hull breach — gaping dark hole */}
    <ellipse cx="52" cy="42" rx="14" ry="10" fill="#0A1628" opacity="0.85" />
    {/* Torn planks around breach */}
    <path d="M40 36 Q42 32 46 34" stroke="#6D4C41" strokeWidth="2" fill="none" />
    <path d="M64 38 Q66 34 68 36" stroke="#6D4C41" strokeWidth="2" fill="none" />
    <path d="M44 50 Q48 54 52 52" stroke="#5D4037" strokeWidth="1.5" fill="none" />
    {/* Visible ribs inside breach */}
    <path d="M46 36 L48 50" stroke="#A1887F" strokeWidth="1" opacity="0.5" />
    <path d="M52 34 L53 52" stroke="#A1887F" strokeWidth="1" opacity="0.4" />
    <path d="M58 35 L57 51" stroke="#A1887F" strokeWidth="1" opacity="0.5" />

    {/* Main mast — broken, jagged top */}
    <rect x="58" y="-12" width="5" height="32" fill="#8D6E63" rx="1" />
    <path d="M58 -12 L60 -18 L63 -12" fill="#A1887F" /> {/* jagged break */}
    {/* Crow's nest remnant */}
    <path d="M54 -8 Q60 -10 66 -8" stroke="#6D4C41" strokeWidth="2" fill="none" />
    {/* Mast rigging lines */}
    <path d="M60 -14 Q40 4 20 18" stroke="#A08060" strokeWidth="0.6" fill="none" opacity="0.35" />
    <path d="M60 -14 Q80 4 100 16" stroke="#A08060" strokeWidth="0.6" fill="none" opacity="0.3" />

    {/* Mizzen mast (shorter, aft) */}
    <rect x="96" y="2" width="4" height="16" fill="#8D6E63" opacity="0.8" rx="1" />
    <path d="M96 2 L98 -2 L100 2" fill="#A1887F" opacity="0.7" />

    {/* Tattered sail hanging from main mast */}
    <path d="M63 -8 Q74 -4 78 6 Q76 14 68 18 L63 16Z" fill="#D7CCC8" opacity="0.3" />
    <path d="M65 -6 Q72 -2 74 4 Q72 10 68 14" stroke="#BCAAA4" strokeWidth="0.5" fill="none" opacity="0.3" />

    {/* Deck line */}
    <path d="M-4 22 Q30 18 70 16 Q110 18 122 22" stroke="#6D4C41" strokeWidth="1.5" fill="none" opacity="0.5" />

    {/* Railing posts (some broken, some standing) */}
    <rect x="10" y="14" width="1.5" height="8" fill="#795548" opacity="0.6" rx="0.5" />
    <rect x="30" y="12" width="1.5" height="10" fill="#795548" opacity="0.5" rx="0.5" />
    <rect x="72" y="12" width="1.5" height="8" fill="#795548" opacity="0.5" rx="0.5" />
    {/* Railing rope between posts */}
    <path d="M10 16 Q20 14 30 14 Q50 12 72 14" stroke="#A08060" strokeWidth="0.7" fill="none" opacity="0.3" />

    {/* Chain draped along hull */}
    <path d="M8 56 Q20 58 30 56 Q40 54 48 56" stroke="#4B5563" strokeWidth="1.5" fill="none" opacity="0.4" />

    {/* Rust and decay patches */}
    <ellipse cx="35" cy="50" rx="6" ry="3" fill="#BF360C" opacity="0.2" />
    <ellipse cx="85" cy="36" rx="5" ry="4" fill="#E65100" opacity="0.15" />
    <ellipse cx="106" cy="48" rx="7" ry="3" fill="#BF360C" opacity="0.18" />

    {/* Barnacles */}
    <circle cx="2" cy="56" r="2" fill="#9CA3AF" opacity="0.35" />
    <circle cx="70" cy="62" r="1.5" fill="#9CA3AF" opacity="0.3" />
    <circle cx="126" cy="54" r="2" fill="#9CA3AF" opacity="0.35" />

    {/* Algae growth on wood */}
    <ellipse cx="58" cy="14" rx="5" ry="2" fill="#2E7D32" opacity="0.35" />
    <ellipse cx="8" cy="58" rx="6" ry="1.5" fill="#388E3C" opacity="0.25" />
    <ellipse cx="116" cy="56" rx="5" ry="1.5" fill="#1B5E20" opacity="0.35" />

    {/* Coral growing on hull */}
    <ellipse cx="92" cy="56" rx="5" ry="4" fill="#E91E63" opacity="0.25" />
    <ellipse cx="94" cy="52" rx="3" ry="2" fill="#F48FB1" opacity="0.2" />

    {/* Scattered wreckage on seabed */}
    <path d="M-8 66 Q-4 64 0 66 Q4 68 -2 70" fill="#6D4C41" opacity="0.3" />
    <path d="M130 64 Q134 62 138 64" fill="#795548" opacity="0.25" />
    <ellipse cx="72" cy="70" rx="6" ry="1.5" fill="#5D4037" opacity="0.25" />

    {/* Bubbles from interior */}
    <circle cx="50" cy="30" r="1.5" fill="rgba(255,255,255,0.3)" style={{ animation: 'bubbleRise 3.5s ease-in 0s infinite' }} />
    <circle cx="54" cy="28" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4s ease-in 1.2s infinite' }} />
    <circle cx="48" cy="32" r="1.2" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 4.5s ease-in 2s infinite' }} />
  </g>
))
SunkenShip.displayName = 'SunkenShip'

// ─── SHIPWRECK: Sunken Sailboat ─────────────────────────────────────

const SunkenSailboat = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Hull — small boat tilted */}
    <rect x="0" y="30" width="80" height="20" fill="#6D4C41" />
    <rect x="4" y="26" width="72" height="6" fill="#795548" />
    <rect x="8" y="22" width="64" height="6" fill="#8D6E63" />
    {/* Hull bottom / keel */}
    <rect x="6" y="50" width="68" height="4" fill="#4E342E" />
    <rect x="14" y="52" width="52" height="3" fill="#3E2723" />

    {/* Bow — pointed */}
    <rect x="-4" y="34" width="8" height="12" fill="#795548" />
    <rect x="-8" y="38" width="6" height="6" fill="#8D6E63" />

    {/* Stern */}
    <rect x="76" y="26" width="8" height="24" fill="#6D4C41" />
    <rect x="78" y="22" width="6" height="6" fill="#795548" />
    {/* Rudder */}
    <rect x="82" y="36" width="3" height="16" fill="#5D4037" />
    <rect x="84" y="40" width="2" height="10" fill="#4E342E" />

    {/* Name plate on stern */}
    <rect x="77" y="34" width="6" height="3" fill="#D4A43A" opacity="0.3" />

    {/* Mast — snapped halfway up */}
    <rect x="32" y="-20" width="4" height="48" fill="#8D6E63" />
    <rect x="30" y="-24" width="3" height="6" fill="#A1887F" />
    {/* Jagged snap point */}
    <rect x="34" y="-22" width="2" height="4" fill="#8D6E63" opacity="0.7" />
    {/* Mast base plate */}
    <rect x="30" y="26" width="8" height="2" fill="#6D4C41" />

    {/* Tattered sail remnants */}
    <rect x="36" y="-16" width="18" height="24" fill="#D7CCC8" opacity="0.35" />
    <rect x="38" y="-14" width="14" height="20" fill="#EFEBE9" opacity="0.25" />
    {/* Sail tears (transparent gaps) */}
    <rect x="42" y="-8" width="6" height="4" fill="#0A1628" opacity="0.15" />
    <rect x="40" y="0" width="4" height="3" fill="#0A1628" opacity="0.1" />
    {/* Sail edges (tattered) */}
    <rect x="52" y="-12" width="3" height="4" fill="#BCAAA4" opacity="0.2" />
    <rect x="50" y="-2" width="4" height="3" fill="#D7CCC8" opacity="0.2" />
    <rect x="54" y="2" width="2" height="4" fill="#BCAAA4" opacity="0.15" />

    {/* Boom (horizontal spar) — broken */}
    <rect x="34" y="6" width="24" height="3" fill="#A1887F" />
    <rect x="56" y="4" width="3" height="3" fill="#8D6E63" opacity="0.6" />

    {/* Rigging ropes */}
    <rect x="34" y="-18" width="1" height="22" fill="#A08060" opacity="0.4" />
    <rect x="36" y="-16" width="1" height="20" fill="#C4A862" opacity="0.3" />
    {/* Loose rope on deck */}
    <rect x="12" y="28" width="16" height="1" fill="#A08060" opacity="0.4" />
    <rect x="10" y="30" width="4" height="4" fill="#C4A862" opacity="0.3" />

    {/* Small bow anchor */}
    <rect x="-6" y="28" width="2" height="12" fill="#4B5563" opacity="0.5" />
    <rect x="-10" y="38" width="10" height="2" fill="#4B5563" opacity="0.4" />

    {/* Lantern hanging from mast */}
    <rect x="28" y="-14" width="4" height="5" fill="#FF8F00" opacity="0.3" />
    <rect x="27" y="-15" width="6" height="2" fill="#4B5563" opacity="0.4" />
    <rect x="29" y="-10" width="2" height="2" fill="#4B5563" opacity="0.3" />

    {/* Hull planking detail */}
    <rect x="4" y="34" width="72" height="1" fill="#8D6E63" opacity="0.3" />
    <rect x="6" y="40" width="68" height="1" fill="#8D6E63" opacity="0.25" />
    <rect x="8" y="46" width="64" height="1" fill="#8D6E63" opacity="0.2" />

    {/* Barnacles */}
    <rect x="0" y="44" width="3" height="3" fill="#9CA3AF" opacity="0.4" />
    <rect x="60" y="48" width="4" height="2" fill="#9CA3AF" opacity="0.35" />
    <rect x="76" y="44" width="3" height="3" fill="#9CA3AF" opacity="0.3" />

    {/* Algae growth */}
    <rect x="20" y="22" width="6" height="2" fill="#2E7D32" opacity="0.4" />
    <rect x="50" y="50" width="8" height="2" fill="#388E3C" opacity="0.3" />
    <rect x="32" y="-24" width="4" height="2" fill="#1B5E20" opacity="0.4" />

    {/* Seaweed growing through hull cracks */}
    <rect x="46" y="18" width="3" height="10" fill="#2E7D32" opacity="0.3" />
    <rect x="44" y="14" width="4" height="6" fill="#4CAF50" opacity="0.25" />

    {/* Small crab on hull */}
    <rect x="64" y="28" width="4" height="2" fill="#E65100" opacity="0.5" />
    <rect x="62" y="26" width="2" height="2" fill="#BF360C" opacity="0.4" />
    <rect x="68" y="26" width="2" height="2" fill="#BF360C" opacity="0.4" />

    {/* Bubbles */}
    <circle cx="40" cy="20" r="1" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 4s ease-in 0.5s infinite' }} />
    <circle cx="36" cy="22" r="0.8" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 5s ease-in 2s infinite' }} />
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
    {/* Main keep — tall central tower */}
    <rect x="30" y="-20" width="40" height="80" fill="#6B6B6B" />
    <rect x="28" y="-24" width="44" height="8" fill="#7A7A7A" />
    {/* Battlements on main keep */}
    <rect x="28" y="-30" width="8" height="8" fill="#7A7A7A" />
    <rect x="40" y="-30" width="8" height="8" fill="#7A7A7A" />
    <rect x="52" y="-30" width="8" height="8" fill="#7A7A7A" />
    <rect x="64" y="-30" width="8" height="8" fill="#7A7A7A" />
    {/* Keep windows */}
    <rect x="38" y="-14" width="6" height="8" fill="#1A1A2E" opacity="0.8" />
    <rect x="38" y="-16" width="6" height="3" fill="#2A2A3E" opacity="0.6" />
    <rect x="50" y="-14" width="6" height="8" fill="#1A1A2E" opacity="0.8" />
    <rect x="50" y="-16" width="6" height="3" fill="#2A2A3E" opacity="0.6" />
    <rect x="44" y="6" width="10" height="14" fill="#1A1A2E" opacity="0.7" />
    {/* Keep stone texture */}
    <rect x="32" y="-10" width="36" height="1" fill="#8A8A8A" opacity="0.3" />
    <rect x="32" y="0" width="36" height="1" fill="#5A5A5A" opacity="0.3" />
    <rect x="32" y="10" width="36" height="1" fill="#8A8A8A" opacity="0.25" />
    <rect x="32" y="20" width="36" height="1" fill="#5A5A5A" opacity="0.25" />
    <rect x="32" y="30" width="36" height="1" fill="#8A8A8A" opacity="0.2" />
    <rect x="32" y="40" width="36" height="1" fill="#5A5A5A" opacity="0.2" />

    {/* Left tower — shorter, round-style */}
    <rect x="4" y="-6" width="28" height="66" fill="#5E5E5E" />
    <rect x="2" y="-10" width="32" height="6" fill="#6E6E6E" />
    {/* Left tower battlements */}
    <rect x="2" y="-16" width="6" height="8" fill="#6E6E6E" />
    <rect x="12" y="-16" width="6" height="8" fill="#6E6E6E" />
    <rect x="22" y="-16" width="6" height="8" fill="#6E6E6E" />
    {/* Left tower windows */}
    <rect x="12" y="0" width="5" height="6" fill="#1A1A2E" opacity="0.7" />
    <rect x="12" y="-2" width="5" height="3" fill="#2A2A3E" opacity="0.5" />
    <rect x="12" y="20" width="5" height="6" fill="#1A1A2E" opacity="0.6" />

    {/* Right tower — tallest, partially collapsed */}
    <rect x="68" y="-12" width="26" height="72" fill="#5E5E5E" />
    <rect x="66" y="-16" width="30" height="6" fill="#6E6E6E" />
    {/* Right tower battlements (some broken) */}
    <rect x="66" y="-22" width="6" height="8" fill="#6E6E6E" />
    <rect x="76" y="-22" width="6" height="8" fill="#6E6E6E" />
    <rect x="86" y="-20" width="6" height="6" fill="#6E6E6E" opacity="0.6" />
    {/* Collapsed corner */}
    <rect x="88" y="20" width="8" height="14" fill="#7A7A7A" opacity="0.5" />
    <rect x="90" y="34" width="6" height="8" fill="#6B6B6B" opacity="0.4" />
    {/* Right tower window */}
    <rect x="76" y="-4" width="5" height="6" fill="#1A1A2E" opacity="0.7" />
    <rect x="76" y="-6" width="5" height="3" fill="#2A2A3E" opacity="0.5" />

    {/* Castle wall connecting towers at base */}
    <rect x="0" y="46" width="100" height="14" fill="#5A5A5A" />
    <rect x="2" y="40" width="96" height="8" fill="#686868" />
    {/* Wall gate (portcullis) */}
    <rect x="40" y="30" width="18" height="22" fill="#1A1A2E" opacity="0.8" />
    <rect x="42" y="28" width="14" height="4" fill="#4A4A4A" />
    {/* Portcullis bars */}
    <rect x="43" y="32" width="1" height="18" fill="#4A4A4A" opacity="0.5" />
    <rect x="47" y="32" width="1" height="18" fill="#4A4A4A" opacity="0.5" />
    <rect x="51" y="32" width="1" height="18" fill="#4A4A4A" opacity="0.5" />
    <rect x="55" y="32" width="1" height="18" fill="#4A4A4A" opacity="0.5" />

    {/* Moss and algae on walls */}
    <rect x="6" y="38" width="8" height="3" fill="#2E7D32" opacity="0.4" />
    <rect x="70" y="42" width="10" height="2" fill="#388E3C" opacity="0.35" />
    <rect x="30" y="-18" width="6" height="3" fill="#1B5E20" opacity="0.4" />
    <rect x="80" y="-14" width="8" height="2" fill="#2E7D32" opacity="0.3" />
    <rect x="10" y="52" width="12" height="2" fill="#2E7D32" opacity="0.3" />

    {/* Barnacles */}
    <rect x="2" y="48" width="3" height="3" fill="#9CA3AF" opacity="0.4" />
    <rect x="90" y="50" width="4" height="3" fill="#9CA3AF" opacity="0.35" />
    <rect x="36" y="46" width="3" height="2" fill="#9CA3AF" opacity="0.3" />

    {/* Coral growth on tower */}
    <rect x="0" y="30" width="5" height="6" fill="#C2185B" opacity="0.3" />
    <rect x="92" y="10" width="4" height="5" fill="#FF5722" opacity="0.3" />

    {/* Fallen stones / rubble */}
    <rect x="-6" y="54" width="8" height="4" fill="#7A7A7A" opacity="0.5" />
    <rect x="98" y="48" width="6" height="6" fill="#6B6B6B" opacity="0.5" />
    <rect x="94" y="54" width="10" height="4" fill="#7A7A7A" opacity="0.4" />

    {/* Bubbles from interior */}
    <circle cx="48" cy="-28" r="1.5" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 4s ease-in 0s infinite' }} />
    <circle cx="78" cy="-20" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 5s ease-in 1.5s infinite' }} />
    <circle cx="14" cy="-14" r="1.2" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4.5s ease-in 3s infinite' }} />
  </g>
))
SunkenCastle.displayName = 'SunkenCastle'

// ─── CASTLE THEME: Castle Drawbridge Ruins ───────────────────────────

const CastleDrawbridge = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Left gate pillar */}
    <rect x="0" y="10" width="14" height="50" fill="#6B6B6B" />
    <rect x="-2" y="6" width="18" height="6" fill="#7A7A7A" />
    <rect x="-2" y="0" width="6" height="8" fill="#7A7A7A" />
    <rect x="10" y="0" width="6" height="8" fill="#7A7A7A" />
    {/* Torch bracket */}
    <rect x="12" y="16" width="4" height="2" fill="#5D4037" />
    <rect x="14" y="12" width="2" height="4" fill="#5D4037" />
    <rect x="13" y="10" width="4" height="3" fill="#FF8F00" opacity="0.4" />

    {/* Right gate pillar */}
    <rect x="56" y="10" width="14" height="50" fill="#6B6B6B" />
    <rect x="54" y="6" width="18" height="6" fill="#7A7A7A" />
    <rect x="54" y="0" width="6" height="8" fill="#7A7A7A" />
    <rect x="66" y="0" width="6" height="8" fill="#7A7A7A" />

    {/* Fallen drawbridge (wooden planks at angle) */}
    <rect x="10" y="36" width="52" height="6" fill="#5D4037" />
    <rect x="12" y="34" width="48" height="4" fill="#795548" />
    <rect x="14" y="32" width="44" height="3" fill="#8D6E63" opacity="0.8" />
    {/* Plank lines */}
    <rect x="18" y="34" width="1" height="6" fill="#4E342E" opacity="0.4" />
    <rect x="26" y="34" width="1" height="6" fill="#4E342E" opacity="0.4" />
    <rect x="34" y="34" width="1" height="6" fill="#4E342E" opacity="0.4" />
    <rect x="42" y="34" width="1" height="6" fill="#4E342E" opacity="0.4" />
    <rect x="50" y="34" width="1" height="6" fill="#4E342E" opacity="0.4" />
    {/* Chain links */}
    <rect x="12" y="28" width="3" height="6" fill="#78909C" opacity="0.6" />
    <rect x="14" y="26" width="2" height="3" fill="#90A4AE" opacity="0.5" />
    <rect x="56" y="28" width="3" height="6" fill="#78909C" opacity="0.6" />

    {/* Moss */}
    <rect x="0" y="54" width="6" height="2" fill="#2E7D32" opacity="0.4" />
    <rect x="60" y="56" width="8" height="2" fill="#388E3C" opacity="0.35" />
    <rect x="24" y="40" width="4" height="2" fill="#1B5E20" opacity="0.3" />

    {/* Bubbles */}
    <circle cx="35" cy="30" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4s ease-in 1s infinite' }} />
  </g>
))
CastleDrawbridge.displayName = 'CastleDrawbridge'

// ─── PYRAMID THEME: Sunken Egyptian Pyramid ──────────────────────────

const SunkenPyramid = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Pyramid body — stepped layers */}
    <rect x="0" y="48" width="120" height="12" fill="#B8860B" />
    <rect x="8" y="38" width="104" height="12" fill="#C49A1A" />
    <rect x="16" y="28" width="88" height="12" fill="#D4A82A" />
    <rect x="24" y="18" width="72" height="12" fill="#D4B03A" />
    <rect x="32" y="8" width="56" height="12" fill="#DEB84A" />
    <rect x="40" y="0" width="40" height="10" fill="#E8C45A" />
    <rect x="48" y="-6" width="24" height="8" fill="#F0D070" />
    <rect x="54" y="-12" width="12" height="8" fill="#F8D880" />
    {/* Capstone */}
    <rect x="56" y="-16" width="8" height="6" fill="#FFE082" />
    <rect x="58" y="-18" width="4" height="4" fill="#FFF59D" opacity="0.8" />

    {/* Stone block lines */}
    {[48, 38, 28, 18, 8, 0].map((ty, i) => (
      <g key={`row-${i}`}>
        {Array.from({ length: 8 - i }, (_, j) => (
          <rect key={`block-${i}-${j}`} x={i * 8 + j * (120 - i * 16) / (8 - i)} y={ty + 4} width="1" height={i < 3 ? 8 : 6} fill="#8B7355" opacity={0.2 + i * 0.02} />
        ))}
      </g>
    ))}

    {/* Entrance — dark doorway */}
    <rect x="50" y="34" width="18" height="24" fill="#1A1A2E" opacity="0.85" />
    <rect x="48" y="30" width="22" height="6" fill="#B8860B" />
    {/* Entrance lintel with hieroglyphic detail */}
    <rect x="50" y="31" width="3" height="3" fill="#FFD54F" opacity="0.5" />
    <rect x="55" y="31" width="3" height="3" fill="#FFD54F" opacity="0.5" />
    <rect x="60" y="31" width="3" height="3" fill="#FFD54F" opacity="0.5" />
    <rect x="65" y="31" width="3" height="3" fill="#FFD54F" opacity="0.5" />

    {/* Sand drift against base */}
    <rect x="-4" y="56" width="30" height="6" fill="#C4A862" opacity="0.5" />
    <rect x="96" y="56" width="28" height="4" fill="#C4A862" opacity="0.4" />

    {/* Erosion and weathering */}
    <rect x="20" y="42" width="6" height="4" fill="#A07820" opacity="0.4" />
    <rect x="90" y="34" width="8" height="4" fill="#A07820" opacity="0.3" />
    <rect x="14" y="50" width="4" height="3" fill="#8B7355" opacity="0.4" />

    {/* Algae growth */}
    <rect x="4" y="52" width="8" height="2" fill="#2E7D32" opacity="0.3" />
    <rect x="100" y="48" width="10" height="2" fill="#388E3C" opacity="0.25" />
    <rect x="46" y="52" width="6" height="2" fill="#1B5E20" opacity="0.3" />

    {/* Coral encrustation at base */}
    <rect x="110" y="46" width="8" height="6" fill="#E91E63" opacity="0.3" />
    <rect x="-4" y="48" width="6" height="5" fill="#FF5722" opacity="0.25" />

    {/* Bubbles from entrance */}
    <circle cx="58" cy="28" r="1.5" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 4s ease-in 0s infinite' }} />
    <circle cx="62" cy="30" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 5s ease-in 2s infinite' }} />
  </g>
))
SunkenPyramid.displayName = 'SunkenPyramid'

// ─── PYRAMID THEME: Sphinx Statue ────────────────────────────────────

const SunkenSphinx = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Body — recumbent lion shape */}
    <rect x="10" y="24" width="60" height="20" fill="#C49A1A" />
    <rect x="8" y="20" width="64" height="8" fill="#D4A82A" />
    <rect x="14" y="16" width="56" height="6" fill="#D4B03A" />
    {/* Back slope */}
    <rect x="50" y="12" width="20" height="6" fill="#C49A1A" opacity="0.6" />

    {/* Front paws — extended */}
    <rect x="0" y="34" width="16" height="10" fill="#DEB84A" />
    <rect x="-4" y="38" width="8" height="6" fill="#D4A82A" />
    <rect x="60" y="34" width="14" height="10" fill="#DEB84A" />
    <rect x="68" y="38" width="8" height="6" fill="#D4A82A" />

    {/* Head — human face */}
    <rect x="0" y="4" width="20" height="20" fill="#D4B03A" />
    <rect x="-2" y="0" width="24" height="6" fill="#E8C45A" />
    {/* Headdress (nemes) */}
    <rect x="-4" y="-4" width="28" height="6" fill="#1565C0" opacity="0.5" />
    <rect x="-6" y="-2" width="4" height="18" fill="#1565C0" opacity="0.4" />
    <rect x="22" y="-2" width="4" height="18" fill="#1565C0" opacity="0.4" />
    {/* Eyes */}
    <rect x="4" y="8" width="4" height="3" fill="#1A1A2E" opacity="0.7" />
    <rect x="12" y="8" width="4" height="3" fill="#1A1A2E" opacity="0.7" />
    {/* Nose (partially broken) */}
    <rect x="8" y="12" width="4" height="4" fill="#C49A1A" />
    {/* Mouth */}
    <rect x="6" y="18" width="8" height="2" fill="#B8860B" opacity="0.5" />

    {/* Weathering and erosion */}
    <rect x="30" y="22" width="8" height="4" fill="#B8860B" opacity="0.3" />
    <rect x="48" y="26" width="6" height="3" fill="#A07820" opacity="0.3" />

    {/* Sand buildup */}
    <rect x="-8" y="40" width="20" height="6" fill="#C4A862" opacity="0.4" />
    <rect x="60" y="42" width="18" height="4" fill="#C4A862" opacity="0.35" />

    {/* Algae */}
    <rect x="20" y="38" width="6" height="2" fill="#2E7D32" opacity="0.3" />
    <rect x="54" y="30" width="4" height="2" fill="#388E3C" opacity="0.25" />

    {/* Bubbles */}
    <circle cx="10" cy="0" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4.5s ease-in 0.5s infinite' }} />
  </g>
))
SunkenSphinx.displayName = 'SunkenSphinx'

// ─── TEMPLE THEME: Sunken Torii Gate ─────────────────────────────────

const SunkenTorii = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Left pillar */}
    <rect x="4" y="4" width="10" height="56" fill="#B71C1C" />
    <rect x="2" y="0" width="14" height="6" fill="#C62828" />
    {/* Pillar ring detail */}
    <rect x="2" y="14" width="14" height="2" fill="#D32F2F" opacity="0.5" />
    <rect x="2" y="44" width="14" height="2" fill="#D32F2F" opacity="0.5" />

    {/* Right pillar */}
    <rect x="66" y="4" width="10" height="56" fill="#B71C1C" />
    <rect x="64" y="0" width="14" height="6" fill="#C62828" />
    <rect x="64" y="14" width="14" height="2" fill="#D32F2F" opacity="0.5" />
    <rect x="64" y="44" width="14" height="2" fill="#D32F2F" opacity="0.5" />

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
// Three-layer depth system with z-axis perspective (top = back of tank):
//   background (z-1):  plants rooted at back sand surface (baseY=240)
//   midground  (z-12): structures sitting on back sand
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
      { type: 'coral-arch', x: 180, y: 102 },
      { type: 'sunken-temple', x: 500, y: 106 },
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
      { type: 'volcano', x: 160, y: 114 },
      { type: 'dragon-stone', x: 480, y: 102 },
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
      { type: 'shipwreck', x: 40, y: 88 },
      { type: 'treasure', x: 640, y: 124 },
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
      { type: 'sailboat', x: 300, y: 120 },
      { type: 'anchor', x: 600, y: 118 },
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
      { type: 'submarine', x: 260, y: 134 },
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
      { type: 'castle', x: 200, y: 108 },
      { type: 'drawbridge', x: 560, y: 126 },
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
      { type: 'pyramid', x: 80, y: 112 },
      { type: 'sphinx', x: 520, y: 132 },
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
      { type: 'torii', x: 120, y: 106 },
      { type: 'pagoda', x: 480, y: 100 },
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
      { type: 'atlantean-dome', x: 100, y: 108 },
      { type: 'atlantean-obelisk', x: 560, y: 106 },
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

// ─── Background decoration layer (behind fish) ──────────────────────

export const DecorationBackground = memo(({ width, theme = 'ocean' }: { width: number; theme?: string }) => {
  const layout = THEME_LAYOUTS[theme] || THEME_LAYOUTS.ocean
  const sandColors = layout.sandColors || { color: '#C4A862', lighter: '#D4B872', detail: '#B89B52' }
  const bg = useMemo(() => layout.background, [layout])

  return (
    <div className="absolute bottom-0 left-0 w-full z-[1]" style={{ height: '400px' }}>
      <SandyBottom color={sandColors.color} lighter={sandColors.lighter} detail={sandColors.detail} />
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 800 320"
        preserveAspectRatio="xMidYMax meet"
        shapeRendering="crispEdges"
      >
        {bg.kelps.map((k, i) => <Kelp key={`bg-kelp-${i}`} {...k} baseY={240} />)}
      </svg>
    </div>
  )
})
DecorationBackground.displayName = 'DecorationBackground'

// ─── Midground decoration layer (structures between bg & fg) ─────────

export const DecorationMidground = memo(({ width, theme = 'ocean' }: { width: number; theme?: string }) => {
  const layout = THEME_LAYOUTS[theme] || THEME_LAYOUTS.ocean
  const mg = useMemo(() => layout.midground, [layout])

  return (
    <div className="absolute bottom-0 left-0 w-full z-[12]" style={{ height: '400px', pointerEvents: 'none' }}>
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 800 320"
        preserveAspectRatio="xMidYMax meet"
        shapeRendering="crispEdges"
      >
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
