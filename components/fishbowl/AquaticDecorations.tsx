'use client'

import { memo, useMemo, type ReactNode } from 'react'

// Aquatic decorations for the fishbowl — split into background, midground, and
// foreground layers with z-axis depth perspective (top of sand = back of tank).
//
// Layer order (back to front / top to bottom):
//   1. SandyBottom (perspective slope: back of tank y≈96, front y≈280)
//   2. Background layer (tall plants rooted at back sand, baseY=180 — z-index 1)
//   3. Midground layer (structures sitting on back sand — z-index 12)
//   4. Fish swim here (z-index 10-20)
//   5. Foreground layer (small rocks, corals, short plants at front sand, baseY=300 — z-index 25)

// ─── Sandy Bottom ────────────────────────────────────────────────────

export const SandyBottom = memo(({ color = '#C4A862', lighter = '#D4B872', detail = '#B89B52' }: {
  color?: string
  lighter?: string
  detail?: string
}) => (
  <svg className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 320" shapeRendering="crispEdges">
    {/* Perspective sand bed — slopes from back of tank (y≈96) to front/glass (y=320) */}
    {/* Main sand body */}
    <polygon points="0,96 50,92 120,98 200,90 280,94 360,88 440,92 520,86 600,90 680,84 750,88 800,92 800,320 0,320" fill={color} />
    {/* Back surface highlight strip (top of sand = back wall of tank) */}
    <polygon points="0,96 50,92 120,98 200,90 280,94 360,88 440,92 520,86 600,90 680,84 750,88 800,92 800,106 750,102 680,98 600,104 520,100 440,106 360,102 280,108 200,104 120,112 50,106 0,110" fill={lighter} />
    {/* Depth shading — darker toward back (distance), lighter toward front */}
    <rect x="0" y="92" width="800" height="26" fill="#000" opacity="0.1" />
    <rect x="0" y="118" width="800" height="18" fill="#000" opacity="0.06" />
    <rect x="0" y="136" width="800" height="14" fill="#000" opacity="0.03" />
    {/* Mid-depth sand transition */}
    <rect x="0" y="200" width="800" height="3" fill={lighter} opacity="0.12" />
    {/* Front sand edge highlight (closest to viewer/glass) */}
    <polygon points="0,268 40,270 100,266 180,272 260,268 340,270 420,266 500,270 580,268 660,272 740,266 800,270 800,278 0,278" fill={lighter} opacity="0.35" />

    {/* === Grain detail with depth-scaled perspective === */}
    {/* Back grains — fine, sparse (further away) */}
    {[30, 80, 140, 200, 260, 320, 380, 440, 500, 560, 620, 680, 740].map((gx, i) => (
      <rect key={`bgr-${i}`} x={gx} y={106 + (i % 4) * 5} width="2" height="2" fill={detail} opacity={0.18 + (i % 3) * 0.04} />
    ))}
    {[55, 115, 175, 235, 295, 355, 415, 475, 535, 595, 655, 715].map((gx, i) => (
      <rect key={`bgr2-${i}`} x={gx} y={110 + (i % 5) * 4} width="1" height="1" fill={detail} opacity={0.14 + (i % 3) * 0.03} />
    ))}
    {/* Mid grains — medium detail */}
    {[18, 42, 68, 95, 118, 150, 178, 205, 232, 258, 285, 310, 340, 368, 395, 420, 448, 478, 505, 535, 560, 588, 615, 642, 670, 698, 725, 752, 775].map((gx, i) => (
      <rect key={`mgr-${i}`} x={gx} y={150 + (i % 6) * 10} width="3" height="3" fill={detail} opacity={0.22 + (i % 3) * 0.06} />
    ))}
    {[10, 35, 55, 82, 108, 135, 162, 190, 218, 245, 272, 298, 325, 355, 382, 410, 435, 462, 492, 518, 545, 572, 598, 628, 655, 682, 712, 738, 765, 790].map((gx, i) => (
      <rect key={`mgr2-${i}`} x={gx} y={160 + (i % 7) * 8} width="2" height="2" fill={detail} opacity={0.18 + (i % 4) * 0.05} />
    ))}
    {/* Front grains — larger, closer to viewer */}
    {[15, 45, 75, 110, 145, 180, 215, 250, 285, 320, 355, 390, 425, 460, 495, 530, 565, 600, 635, 670, 705, 740, 775].map((gx, i) => (
      <rect key={`fgr-${i}`} x={gx} y={240 + (i % 5) * 10} width="4" height="3" fill={detail} opacity={0.28 + (i % 3) * 0.07} />
    ))}
    {[25, 60, 100, 138, 170, 210, 248, 280, 315, 350, 388, 425, 460, 498, 535, 570, 608, 645, 680, 718, 755, 788].map((gx, i) => (
      <rect key={`fgr2-${i}`} x={gx} y={250 + (i % 4) * 12} width="3" height="3" fill={detail} opacity={0.24 + (i % 3) * 0.06} />
    ))}

    {/* === Pebble and shell highlights at varying depths === */}
    {/* Back pebbles (small — distance) */}
    <rect x="110" y="110" width="3" height="2" fill="#E8D5B0" opacity="0.25" rx="1" />
    <rect x="350" y="106" width="3" height="2" fill="#F0E0C0" opacity="0.22" rx="1" />
    <rect x="560" y="112" width="3" height="2" fill="#E8D5B0" opacity="0.25" rx="1" />
    <rect x="700" y="104" width="3" height="2" fill="#F0E0C0" opacity="0.22" rx="1" />
    {/* Mid pebbles */}
    <rect x="80" y="170" width="4" height="3" fill="#E8D5B0" opacity="0.32" rx="1" />
    <rect x="260" y="178" width="5" height="3" fill="#F0E0C0" opacity="0.28" rx="1" />
    <rect x="450" y="168" width="4" height="3" fill="#E8D5B0" opacity="0.32" rx="1" />
    <rect x="620" y="176" width="5" height="3" fill="#F0E0C0" opacity="0.28" rx="1" />
    <rect x="175" y="186" width="3" height="2" fill="#E8D5B0" opacity="0.26" rx="1" />
    <rect x="520" y="182" width="4" height="3" fill="#F0E0C0" opacity="0.26" rx="1" />
    {/* Front pebbles (larger — close to glass) */}
    <rect x="60" y="262" width="6" height="4" fill="#E8D5B0" opacity="0.42" rx="1" />
    <rect x="220" y="270" width="5" height="4" fill="#F0E0C0" opacity="0.38" rx="1" />
    <rect x="400" y="266" width="6" height="4" fill="#E8D5B0" opacity="0.42" rx="1" />
    <rect x="580" y="274" width="5" height="3" fill="#F0E0C0" opacity="0.38" rx="1" />
    <rect x="720" y="264" width="6" height="4" fill="#E8D5B0" opacity="0.42" rx="1" />
    <rect x="160" y="276" width="4" height="3" fill="#E8D5B0" opacity="0.35" rx="1" />
    <rect x="490" y="280" width="5" height="3" fill="#F0E0C0" opacity="0.32" rx="1" />
    <rect x="650" y="272" width="4" height="3" fill="#E8D5B0" opacity="0.35" rx="1" />

    {/* Sand ripple lines showing perspective depth */}
    <line x1="50" y1="132" x2="750" y2="132" stroke={lighter} strokeWidth="1" opacity="0.07" />
    <line x1="30" y1="180" x2="770" y2="180" stroke={lighter} strokeWidth="1" opacity="0.06" />
    <line x1="20" y1="235" x2="780" y2="235" stroke={lighter} strokeWidth="1.5" opacity="0.08" />
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

export const Kelp = memo(({ x, height = 60, variant = 'thin', color = '#2E7D32', delay = 0, baseY = 300 }: KelpProps) => {
  const lighter = '#4CAF50'
  const darker = '#1B5E20'

  return (
    <g style={{ animation: `kelpSway 4s ease-in-out ${delay}s infinite`, transformOrigin: `${x + 4}px ${baseY}px` }}>
      {variant === 'thin' && (
        <>
          {Array.from({ length: Math.floor(height / 6) }, (_, i) => (
            <g key={i}>
              <rect x={x + (i % 2 === 0 ? 0 : 2)} y={baseY -(i + 1) * 6} width="4" height="6" fill={i % 3 === 0 ? lighter : color} />
              {i % 2 === 0 && (
                <rect x={x + (i % 4 === 0 ? -3 : 6)} y={baseY -(i + 1) * 6 + 1} width="4" height="3" fill={lighter} opacity="0.7" />
              )}
            </g>
          ))}
        </>
      )}
      {variant === 'wide' && (
        <>
          {Array.from({ length: Math.floor(height / 6) }, (_, i) => (
            <g key={i}>
              <rect x={x + (i % 2 === 0 ? -1 : 1)} y={baseY -(i + 1) * 6} width="8" height="6" fill={i % 3 === 0 ? lighter : color} />
              {i % 3 === 0 && (
                <>
                  <rect x={x - 4 + (i % 2) * 2} y={baseY -(i + 1) * 6} width="4" height="4" fill={lighter} opacity="0.6" />
                  <rect x={x + 8 - (i % 2) * 2} y={baseY -(i + 1) * 6 + 1} width="4" height="4" fill={color} opacity="0.7" />
                </>
              )}
            </g>
          ))}
        </>
      )}
      {variant === 'bushy' && (
        <>
          {Array.from({ length: Math.floor(height / 5) }, (_, i) => {
            const spread = Math.min(i * 0.5, 4)
            return (
              <g key={i}>
                <rect x={x - spread + (i % 2)} y={baseY -(i + 1) * 5} width={6 + spread * 2} height="5" fill={i % 2 === 0 ? color : darker} />
                {i % 2 === 0 && (
                  <rect x={x + 1} y={baseY -(i + 1) * 5} width="3" height="3" fill={lighter} opacity="0.5" />
                )}
              </g>
            )
          })}
        </>
      )}
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

    {/* Aerator bubbles rising from arch crevices */}
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

    {/* Aerator bubbles from temple crevices */}
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

    {/* Aerator bubbles from hull breach */}
    <circle cx="68" cy="20" r="1.5" fill="rgba(255,255,255,0.3)" style={{ animation: 'bubbleRise 3s ease-in 0s infinite' }} />
    <circle cx="72" cy="18" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 3.5s ease-in 0.8s infinite' }} />
    <circle cx="70" cy="22" r="1.2" fill="rgba(255,255,255,0.25)" style={{ animation: 'bubbleRise 4s ease-in 1.5s infinite' }} />
    <circle cx="66" cy="19" r="0.8" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 4.5s ease-in 2.5s infinite' }} />
    <circle cx="69" cy="16" r="0.6" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5s ease-in 3.5s infinite' }} />
  </g>
))
SunkenSubmarine.displayName = 'SunkenSubmarine'

// ─── SHIPWRECK: Treasure & Anchor Cluster (enhanced) ─────────────────

const TreasureCluster = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Large anchor — detailed */}
    <rect x="40" y="-10" width="4" height="50" fill="#4B5563" />
    <circle cx="42" cy="-6" r="6" fill="none" stroke="#4B5563" strokeWidth="3" />
    <rect x="28" y="34" width="28" height="4" fill="#4B5563" />
    {/* Anchor flukes */}
    <path d="M28 34 L22 44 L32 40 Z" fill="#6B7280" />
    <path d="M56 34 L62 44 L52 40 Z" fill="#6B7280" />
    <rect x="38" y="-12" width="8" height="3" fill="#6B7280" />
    {/* Anchor rust */}
    <rect x="40" y="10" width="4" height="6" fill="#B45309" opacity="0.3" />
    <rect x="32" y="36" width="6" height="2" fill="#B45309" opacity="0.25" />
    <rect x="40" y="20" width="4" height="4" fill="#8B4513" opacity="0.2" />
    {/* Chain links connecting anchor to chest */}
    <rect x="28" y="28" width="3" height="3" fill="#4B5563" opacity="0.5" />
    <rect x="32" y="26" width="3" height="3" fill="#6B7280" opacity="0.4" />
    <rect x="24" y="30" width="3" height="3" fill="#4B5563" opacity="0.45" />
    {/* Rope coiled around anchor */}
    <rect x="36" y="16" width="12" height="2" fill="#A08060" opacity="0.6" />
    <rect x="34" y="20" width="14" height="2" fill="#C4A862" opacity="0.5" />
    <rect x="36" y="24" width="12" height="2" fill="#A08060" opacity="0.5" />
    <rect x="38" y="28" width="8" height="2" fill="#A08060" opacity="0.4" />

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

    {/* Scattered coins — more */}
    <circle cx="10" cy="46" r="1.5" fill="#FFD700" opacity="0.4" />
    <circle cx="22" cy="44" r="1" fill="#FFC107" opacity="0.3" />
    <circle cx="44" cy="44" r="1.5" fill="#FFD700" opacity="0.35" />
    <circle cx="16" cy="48" r="1" fill="#FFD700" opacity="0.3" />
    <circle cx="38" cy="46" r="1.2" fill="#FFC107" opacity="0.25" />
    <circle cx="56" cy="46" r="1" fill="#FFD700" opacity="0.3" />
    <circle cx="70" cy="46" r="1.2" fill="#FFD700" opacity="0.25" />
    <circle cx="30" cy="48" r="0.8" fill="#FFC107" opacity="0.2" />
  </g>
))
TreasureCluster.displayName = 'TreasureCluster'

// ─── SHIPWRECK: Sunken Galleon (shipwreck) ──────────────────────────

const SunkenShip = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Main hull — broken galleon on its side */}
    <rect x="0" y="30" width="130" height="35" fill="#5D4037" />
    <rect x="4" y="24" width="122" height="10" fill="#6D4C41" />
    <rect x="8" y="18" width="114" height="8" fill="#795548" />
    {/* Hull bottom (keel) */}
    <rect x="10" y="65" width="110" height="6" fill="#3E2723" />
    <rect x="20" y="68" width="90" height="4" fill="#4E342E" />

    {/* Stern section — captain's quarters */}
    <rect x="110" y="10" width="24" height="55" fill="#5D4037" />
    <rect x="112" y="6" width="20" height="8" fill="#6D4C41" />
    <rect x="114" y="2" width="16" height="6" fill="#795548" />
    {/* Stern windows (broken) */}
    <rect x="114" y="16" width="6" height="8" fill="#0A1628" opacity="0.8" />
    <rect x="124" y="16" width="6" height="8" fill="#0A1628" opacity="0.7" />
    <rect x="114" y="28" width="6" height="8" fill="#0A1628" opacity="0.6" />
    {/* Window frames */}
    <rect x="113" y="15" width="8" height="1" fill="#8D6E63" />
    <rect x="113" y="25" width="8" height="1" fill="#8D6E63" />
    <rect x="123" y="15" width="8" height="1" fill="#8D6E63" />
    {/* Stern railing */}
    <rect x="112" y="4" width="2" height="8" fill="#8D6E63" opacity="0.5" />
    <rect x="130" y="4" width="2" height="8" fill="#8D6E63" opacity="0.4" />
    <rect x="112" y="4" width="20" height="2" fill="#A1887F" opacity="0.4" />

    {/* Bow section — pointed */}
    <rect x="-10" y="36" width="14" height="20" fill="#6D4C41" />
    <rect x="-14" y="40" width="8" height="12" fill="#795548" />
    <rect x="-16" y="44" width="4" height="6" fill="#8D6E63" />

    {/* Hull breach / gaping hole */}
    <rect x="40" y="32" width="22" height="18" fill="#0A1628" opacity="0.8" />
    <rect x="42" y="30" width="18" height="4" fill="#4E342E" />
    <rect x="42" y="48" width="18" height="4" fill="#4E342E" />
    {/* Torn planks around breach */}
    <rect x="38" y="34" width="4" height="6" fill="#6D4C41" />
    <rect x="60" y="36" width="4" height="8" fill="#6D4C41" />
    <rect x="44" y="28" width="6" height="4" fill="#795548" />

    {/* Visible ribs/frames inside hull */}
    <rect x="44" y="34" width="2" height="14" fill="#8D6E63" opacity="0.5" />
    <rect x="50" y="34" width="2" height="14" fill="#8D6E63" opacity="0.4" />
    <rect x="56" y="34" width="2" height="14" fill="#8D6E63" opacity="0.5" />

    {/* Deck planks */}
    <rect x="10" y="28" width="100" height="2" fill="#8D6E63" opacity="0.4" />
    <rect x="8" y="30" width="102" height="1" fill="#4E342E" opacity="0.3" />

    {/* Railing remnants */}
    <rect x="15" y="16" width="2" height="10" fill="#795548" opacity="0.6" />
    <rect x="35" y="14" width="2" height="12" fill="#795548" opacity="0.5" />
    <rect x="70" y="16" width="2" height="10" fill="#795548" opacity="0.6" />
    <rect x="90" y="15" width="2" height="11" fill="#795548" opacity="0.5" />

    {/* Broken mast stump */}
    <rect x="56" y="-6" width="6" height="26" fill="#8D6E63" />
    <rect x="54" y="-10" width="4" height="6" fill="#A1887F" />
    <rect x="58" y="-12" width="3" height="4" fill="#8D6E63" />
    <rect x="56" y="-14" width="2" height="4" fill="#A1887F" opacity="0.7" />
    {/* Mast base ring */}
    <rect x="54" y="18" width="10" height="2" fill="#6D4C41" />

    {/* Second broken mast (shorter, further aft) */}
    <rect x="90" y="4" width="5" height="16" fill="#8D6E63" opacity="0.8" />
    <rect x="88" y="2" width="3" height="4" fill="#A1887F" opacity="0.6" />

    {/* Crow's nest debris fallen nearby */}
    <rect x="20" y="64" width="14" height="4" fill="#8D6E63" opacity="0.5" />
    <rect x="22" y="62" width="10" height="4" fill="#A1887F" opacity="0.4" />

    {/* Cannons poking from gun ports */}
    <rect x="24" y="40" width="12" height="3" fill="#37474F" />
    <rect x="22" y="39" width="4" height="5" fill="#455A64" />
    <rect x="76" y="42" width="12" height="3" fill="#37474F" />
    <rect x="74" y="41" width="4" height="5" fill="#455A64" />

    {/* Figurehead broken off, lying near bow */}
    <rect x="-20" y="60" width="12" height="8" fill="#D4A43A" opacity="0.5" />
    <rect x="-18" y="56" width="8" height="6" fill="#E8C468" opacity="0.4" />

    {/* Rust and decay */}
    <rect x="30" y="50" width="10" height="4" fill="#BF360C" opacity="0.25" />
    <rect x="80" y="34" width="8" height="6" fill="#E65100" opacity="0.2" />
    <rect x="100" y="44" width="12" height="4" fill="#BF360C" opacity="0.2" />
    <rect x="12" y="38" width="6" height="4" fill="#E65100" opacity="0.15" />
    <rect x="66" y="56" width="8" height="3" fill="#BF360C" opacity="0.15" />

    {/* Barnacles */}
    <rect x="0" y="58" width="4" height="3" fill="#9CA3AF" opacity="0.4" />
    <rect x="68" y="62" width="3" height="3" fill="#9CA3AF" opacity="0.35" />
    <rect x="120" y="52" width="3" height="3" fill="#9CA3AF" opacity="0.4" />
    <rect x="96" y="64" width="4" height="2" fill="#9CA3AF" opacity="0.3" />

    {/* Algae growth */}
    <rect x="54" y="14" width="8" height="3" fill="#2E7D32" opacity="0.4" />
    <rect x="8" y="60" width="10" height="2" fill="#388E3C" opacity="0.3" />
    <rect x="110" y="58" width="8" height="2" fill="#1B5E20" opacity="0.4" />
    <rect x="30" y="22" width="6" height="2" fill="#2E7D32" opacity="0.3" />

    {/* Coral growing on hull */}
    <rect x="88" y="56" width="8" height="6" fill="#E91E63" opacity="0.3" />
    <rect x="90" y="52" width="4" height="4" fill="#F48FB1" opacity="0.25" />

    {/* Chain draped over railing */}
    <rect x="14" y="14" width="22" height="2" fill="#4B5563" opacity="0.5" />
    <rect x="12" y="16" width="4" height="4" fill="#4B5563" opacity="0.4" />
    <rect x="34" y="16" width="4" height="6" fill="#4B5563" opacity="0.4" />

    {/* Scattered debris around base */}
    <rect x="-6" y="68" width="8" height="3" fill="#6D4C41" opacity="0.4" />
    <rect x="130" y="66" width="6" height="4" fill="#795548" opacity="0.3" />
    <rect x="70" y="70" width="10" height="2" fill="#5D4037" opacity="0.3" />

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

    {/* Gentle aerator bubbles from base crevice */}
    <circle cx="18" cy="42" r="1" fill="rgba(255,255,255,0.2)" style={{ animation: 'bubbleRise 5s ease-in 0s infinite' }} />
    <circle cx="20" cy="44" r="0.8" fill="rgba(255,255,255,0.15)" style={{ animation: 'bubbleRise 5.5s ease-in 2s infinite' }} />
  </g>
))
StoneCairn.displayName = 'StoneCairn'

// ─── MINIMAL: Bamboo Grove ───────────────────────────────────────────

const BambooGrove = memo(({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x}, ${y})`} style={{ animation: 'kelpSway 6s ease-in-out 0s infinite', transformOrigin: '20px 100%' }}>
    {/* Stalk 1 - tall */}
    <rect x="6" y="-10" width="4" height="70" fill="#558B2F" />
    <rect x="6" y="0" width="4" height="2" fill="#689F38" opacity="0.6" />
    <rect x="6" y="16" width="4" height="2" fill="#689F38" opacity="0.6" />
    <rect x="6" y="32" width="4" height="2" fill="#689F38" opacity="0.6" />
    <rect x="6" y="48" width="4" height="2" fill="#689F38" opacity="0.6" />
    {/* Leaves */}
    <ellipse cx="0" cy="-8" rx="8" ry="2.5" fill="#7CB342" opacity="0.7" />
    <ellipse cx="14" cy="-6" rx="7" ry="2" fill="#8BC34A" opacity="0.6" />

    {/* Stalk 2 - medium */}
    <rect x="16" y="4" width="4" height="56" fill="#689F38" />
    <rect x="16" y="12" width="4" height="2" fill="#7CB342" opacity="0.6" />
    <rect x="16" y="28" width="4" height="2" fill="#7CB342" opacity="0.6" />
    <rect x="16" y="44" width="4" height="2" fill="#7CB342" opacity="0.6" />
    {/* Leaves */}
    <ellipse cx="24" cy="6" rx="7" ry="2" fill="#8BC34A" opacity="0.65" />
    <ellipse cx="10" cy="8" rx="6" ry="2" fill="#7CB342" opacity="0.55" />

    {/* Stalk 3 - short */}
    <rect x="26" y="16" width="3" height="44" fill="#558B2F" />
    <rect x="26" y="24" width="3" height="2" fill="#689F38" opacity="0.6" />
    <rect x="26" y="40" width="3" height="2" fill="#689F38" opacity="0.6" />
    {/* Leaf */}
    <ellipse cx="34" cy="18" rx="6" ry="2" fill="#7CB342" opacity="0.6" />

    {/* Stalk 4 - background, thinner */}
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
//   background (z-1):  tall plants rooted at back sand surface (baseY=180)
//   midground  (z-12): structures sitting on back sand, moved UP/BACK from bottom
//   foreground (z-25): rocks, corals, tiny grass-like plants at front glass (baseY=300)
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
      { x: 15, height: 110, variant: 'bushy', color: '#2E7D32', delay: 0 },
      { x: 60, height: 95, variant: 'wide', color: '#388E3C', delay: 0.5 },
      { x: 110, height: 100, variant: 'bushy', color: '#1B5E20', delay: 1.2 },
      { x: 520, height: 105, variant: 'bushy', color: '#1B5E20', delay: 0.3 },
      { x: 580, height: 90, variant: 'wide', color: '#388E3C', delay: 0.9 },
      { x: 720, height: 100, variant: 'bushy', color: '#2E7D32', delay: 0.8 },
      { x: 770, height: 85, variant: 'wide', color: '#1B5E20', delay: 1.6 },
    ],
  },
  midground: {
    structures: [
      { type: 'coral-arch', x: 180, y: 30 },
      { type: 'sunken-temple', x: 500, y: 34 },
    ],
  },
  foreground: {
    rocks: [
      { x: 50, y: 252, variant: 'medium', color: '#78716C' },
      { x: 380, y: 256, variant: 'small', color: '#6B7280' },
      { x: 680, y: 252, variant: 'small', color: '#78716C' },
    ],
    corals: [
      { x: 130, y: 244, variant: 'branch', color: '#E91E63' },
      { x: 420, y: 248, variant: 'fan', color: '#FF5722' },
      { x: 650, y: 242, variant: 'brain', color: '#E91E63' },
    ],
    kelps: [
      { x: 40, height: 12, variant: 'thin', color: '#388E3C', delay: 0.2 },
      { x: 110, height: 10, variant: 'thin', color: '#2E7D32', delay: 0.8 },
      { x: 200, height: 14, variant: 'thin', color: '#388E3C', delay: 1.0 },
      { x: 300, height: 10, variant: 'thin', color: '#2E7D32', delay: 0.5 },
      { x: 460, height: 12, variant: 'thin', color: '#388E3C', delay: 1.5 },
      { x: 560, height: 10, variant: 'thin', color: '#2E7D32', delay: 0.3 },
      { x: 640, height: 14, variant: 'thin', color: '#388E3C', delay: 1.2 },
      { x: 750, height: 10, variant: 'thin', color: '#2E7D32', delay: 0.7 },
    ],
  },
}

const TROPICAL_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#D4A43A', lighter: '#E8C468', detail: '#B8862D' },
  background: {
    kelps: [
      { x: 20, height: 110, variant: 'bushy', color: '#00C853', delay: 0 },
      { x: 80, height: 95, variant: 'wide', color: '#00E676', delay: 0.6 },
      { x: 630, height: 100, variant: 'bushy', color: '#00C853', delay: 1.2 },
      { x: 700, height: 90, variant: 'wide', color: '#00E676', delay: 0.4 },
      { x: 760, height: 105, variant: 'bushy', color: '#00C853', delay: 0.9 },
    ],
  },
  midground: {
    structures: [
      { type: 'volcano', x: 160, y: 34 },
      { type: 'dragon-stone', x: 480, y: 30 },
    ],
  },
  foreground: {
    rocks: [
      { x: 80, y: 252, variant: 'small', color: '#A8A29E' },
      { x: 350, y: 256, variant: 'small', color: '#78716C' },
      { x: 600, y: 252, variant: 'medium', color: '#78716C' },
    ],
    corals: [
      { x: 120, y: 242, variant: 'branch', color: '#FF6D00' },
      { x: 310, y: 244, variant: 'fan', color: '#FF1744' },
      { x: 700, y: 248, variant: 'brain', color: '#FF6D00' },
    ],
    kelps: [
      { x: 50, height: 14, variant: 'thin', color: '#69F0AE', delay: 0.2 },
      { x: 180, height: 10, variant: 'thin', color: '#00E676', delay: 0.8 },
      { x: 260, height: 12, variant: 'thin', color: '#69F0AE', delay: 1.0 },
      { x: 400, height: 10, variant: 'thin', color: '#00E676', delay: 1.8 },
      { x: 520, height: 14, variant: 'thin', color: '#69F0AE', delay: 0.5 },
      { x: 650, height: 10, variant: 'thin', color: '#00E676', delay: 1.3 },
      { x: 770, height: 12, variant: 'thin', color: '#69F0AE', delay: 0.7 },
    ],
  },
}

const SHIPWRECK_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#8B7355', lighter: '#A08B6C', detail: '#6B5B45' },
  background: {
    kelps: [
      { x: 10, height: 85, variant: 'wide', color: '#2E7D32', delay: 0 },
      { x: 60, height: 70, variant: 'thin', color: '#1B5E20', delay: 0.8 },
      { x: 400, height: 80, variant: 'bushy', color: '#2E7D32', delay: 0.5 },
      { x: 460, height: 70, variant: 'wide', color: '#1B5E20', delay: 1.0 },
      { x: 720, height: 75, variant: 'bushy', color: '#2E7D32', delay: 1.5 },
      { x: 770, height: 65, variant: 'thin', color: '#1B5E20', delay: 0.3 },
    ],
  },
  midground: {
    structures: [
      { type: 'shipwreck', x: 40, y: 16 },
      { type: 'treasure', x: 640, y: 52 },
    ],
  },
  foreground: {
    rocks: [
      { x: 30, y: 248, variant: 'large', color: '#57534E' },
      { x: 380, y: 252, variant: 'medium', color: '#44403C' },
      { x: 680, y: 250, variant: 'medium', color: '#57534E' },
    ],
    corals: [
      { x: 440, y: 252, variant: 'brain', color: '#795548' },
    ],
    kelps: [
      { x: 70, height: 12, variant: 'thin', color: '#1B5E20', delay: 1 },
      { x: 200, height: 10, variant: 'thin', color: '#2E7D32', delay: 0.5 },
      { x: 340, height: 14, variant: 'thin', color: '#1B5E20', delay: 1.5 },
      { x: 520, height: 10, variant: 'thin', color: '#2E7D32', delay: 0.8 },
      { x: 620, height: 12, variant: 'thin', color: '#1B5E20', delay: 2 },
      { x: 750, height: 10, variant: 'thin', color: '#2E7D32', delay: 0.3 },
    ],
  },
}

const SAILBOAT_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#C4A862', lighter: '#D4B872', detail: '#B89B52' },
  background: {
    kelps: [
      { x: 15, height: 95, variant: 'bushy', color: '#2E7D32', delay: 0 },
      { x: 70, height: 85, variant: 'wide', color: '#388E3C', delay: 0.6 },
      { x: 600, height: 90, variant: 'bushy', color: '#388E3C', delay: 0.8 },
      { x: 660, height: 80, variant: 'wide', color: '#2E7D32', delay: 1.2 },
      { x: 730, height: 95, variant: 'bushy', color: '#1B5E20', delay: 1.5 },
      { x: 780, height: 75, variant: 'thin', color: '#388E3C', delay: 0.4 },
    ],
  },
  midground: {
    structures: [
      { type: 'sailboat', x: 300, y: 48 },
    ],
  },
  foreground: {
    rocks: [
      { x: 80, y: 252, variant: 'medium', color: '#78716C' },
      { x: 500, y: 256, variant: 'small', color: '#A8A29E' },
      { x: 680, y: 250, variant: 'medium', color: '#57534E' },
    ],
    corals: [
      { x: 180, y: 248, variant: 'branch', color: '#FF6D00' },
      { x: 550, y: 252, variant: 'fan', color: '#FF1744' },
    ],
    kelps: [
      { x: 30, height: 12, variant: 'thin', color: '#388E3C', delay: 0.6 },
      { x: 150, height: 10, variant: 'thin', color: '#2E7D32', delay: 0.2 },
      { x: 280, height: 14, variant: 'thin', color: '#388E3C', delay: 1.0 },
      { x: 420, height: 10, variant: 'thin', color: '#2E7D32', delay: 1.4 },
      { x: 580, height: 12, variant: 'thin', color: '#388E3C', delay: 0.8 },
      { x: 720, height: 10, variant: 'thin', color: '#2E7D32', delay: 0.4 },
    ],
  },
}

const SUBMARINE_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#5C5C5C', lighter: '#787878', detail: '#454545' },
  background: {
    kelps: [
      { x: 10, height: 80, variant: 'wide', color: '#1B5E20', delay: 0 },
      { x: 55, height: 70, variant: 'thin', color: '#2E7D32', delay: 0.7 },
      { x: 620, height: 85, variant: 'bushy', color: '#2E7D32', delay: 0.5 },
      { x: 690, height: 75, variant: 'wide', color: '#1B5E20', delay: 1.0 },
      { x: 750, height: 80, variant: 'bushy', color: '#2E7D32', delay: 1.5 },
    ],
  },
  midground: {
    structures: [
      { type: 'submarine', x: 260, y: 40 },
    ],
  },
  foreground: {
    rocks: [
      { x: 50, y: 250, variant: 'large', color: '#44403C' },
      { x: 420, y: 254, variant: 'medium', color: '#57534E' },
      { x: 700, y: 252, variant: 'medium', color: '#44403C' },
    ],
    corals: [
      { x: 160, y: 250, variant: 'brain', color: '#795548' },
    ],
    kelps: [
      { x: 100, height: 12, variant: 'thin', color: '#1B5E20', delay: 0.4 },
      { x: 240, height: 10, variant: 'thin', color: '#2E7D32', delay: 1 },
      { x: 350, height: 14, variant: 'thin', color: '#1B5E20', delay: 0.7 },
      { x: 480, height: 10, variant: 'thin', color: '#2E7D32', delay: 1.8 },
      { x: 580, height: 12, variant: 'thin', color: '#1B5E20', delay: 0.3 },
      { x: 680, height: 10, variant: 'thin', color: '#2E7D32', delay: 1.2 },
    ],
  },
}

const MINIMAL_LAYOUT: LayeredDecoConfig = {
  background: {
    kelps: [
      { x: 15, height: 105, variant: 'bushy', color: '#2E7D32', delay: 0 },
      { x: 70, height: 90, variant: 'wide', color: '#388E3C', delay: 0.6 },
      { x: 130, height: 95, variant: 'bushy', color: '#1B5E20', delay: 1.2 },
      { x: 540, height: 100, variant: 'bushy', color: '#1B5E20', delay: 1.5 },
      { x: 620, height: 85, variant: 'wide', color: '#2E7D32', delay: 0.4 },
      { x: 700, height: 95, variant: 'bushy', color: '#388E3C', delay: 0.9 },
      { x: 760, height: 80, variant: 'wide', color: '#2E7D32', delay: 2.0 },
    ],
  },
  midground: {
    structures: [
      { type: 'cairn', x: 250, y: 34 },
      { type: 'bamboo', x: 500, y: 30 },
    ],
  },
  foreground: {
    rocks: [
      { x: 170, y: 256, variant: 'small', color: '#78716C' },
      { x: 400, y: 252, variant: 'small', color: '#6B7280' },
    ],
    corals: [],
    kelps: [
      { x: 60, height: 12, variant: 'thin', color: '#388E3C', delay: 0.3 },
      { x: 200, height: 10, variant: 'thin', color: '#2E7D32', delay: 0.8 },
      { x: 300, height: 14, variant: 'thin', color: '#388E3C', delay: 1.2 },
      { x: 420, height: 10, variant: 'thin', color: '#2E7D32', delay: 0.5 },
      { x: 520, height: 12, variant: 'thin', color: '#388E3C', delay: 0.9 },
      { x: 650, height: 10, variant: 'thin', color: '#2E7D32', delay: 1.6 },
      { x: 760, height: 12, variant: 'thin', color: '#388E3C', delay: 0.2 },
    ],
  },
}

const CASTLE_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#6B6B6B', lighter: '#8A8A8A', detail: '#5A5A5A' },
  background: {
    kelps: [
      { x: 10, height: 85, variant: 'bushy', color: '#1B5E20', delay: 0 },
      { x: 60, height: 75, variant: 'wide', color: '#2E7D32', delay: 0.5 },
      { x: 650, height: 80, variant: 'bushy', color: '#2E7D32', delay: 0.8 },
      { x: 720, height: 70, variant: 'wide', color: '#1B5E20', delay: 1.2 },
      { x: 770, height: 80, variant: 'bushy', color: '#2E7D32', delay: 1.5 },
    ],
  },
  midground: {
    structures: [
      { type: 'castle', x: 200, y: 8 },
      { type: 'drawbridge', x: 560, y: 42 },
    ],
  },
  foreground: {
    rocks: [
      { x: 60, y: 250, variant: 'large', color: '#57534E' },
      { x: 420, y: 254, variant: 'medium', color: '#44403C' },
      { x: 700, y: 252, variant: 'medium', color: '#57534E' },
    ],
    corals: [
      { x: 140, y: 250, variant: 'brain', color: '#795548' },
    ],
    kelps: [
      { x: 80, height: 12, variant: 'thin', color: '#1B5E20', delay: 0.4 },
      { x: 250, height: 10, variant: 'thin', color: '#2E7D32', delay: 1.2 },
      { x: 380, height: 14, variant: 'thin', color: '#1B5E20', delay: 0.7 },
      { x: 530, height: 10, variant: 'thin', color: '#2E7D32', delay: 0.2 },
      { x: 660, height: 12, variant: 'thin', color: '#1B5E20', delay: 1.0 },
    ],
  },
}

const PYRAMID_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#C4A862', lighter: '#D4B872', detail: '#A08B52' },
  background: {
    kelps: [
      { x: 10, height: 80, variant: 'wide', color: '#2E7D32', delay: 0 },
      { x: 55, height: 70, variant: 'thin', color: '#388E3C', delay: 0.5 },
      { x: 670, height: 85, variant: 'bushy', color: '#388E3C', delay: 0.6 },
      { x: 730, height: 75, variant: 'wide', color: '#2E7D32', delay: 1.0 },
      { x: 780, height: 70, variant: 'thin', color: '#1B5E20', delay: 1.8 },
    ],
  },
  midground: {
    structures: [
      { type: 'pyramid', x: 80, y: 8 },
      { type: 'sphinx', x: 520, y: 40 },
    ],
  },
  foreground: {
    rocks: [
      { x: 40, y: 252, variant: 'medium', color: '#A08B6C' },
      { x: 380, y: 256, variant: 'small', color: '#B89B52' },
      { x: 660, y: 250, variant: 'large', color: '#8B7355' },
    ],
    corals: [
      { x: 450, y: 252, variant: 'fan', color: '#E91E63' },
    ],
    kelps: [
      { x: 70, height: 12, variant: 'thin', color: '#2E7D32', delay: 0.3 },
      { x: 200, height: 10, variant: 'thin', color: '#388E3C', delay: 1 },
      { x: 340, height: 14, variant: 'thin', color: '#2E7D32', delay: 0.7 },
      { x: 500, height: 10, variant: 'thin', color: '#388E3C', delay: 1.5 },
      { x: 620, height: 12, variant: 'thin', color: '#2E7D32', delay: 0.4 },
    ],
  },
}

const TEMPLE_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#8D8D8D', lighter: '#A8A8A8', detail: '#6B6B6B' },
  background: {
    kelps: [
      { x: 15, height: 95, variant: 'bushy', color: '#2E7D32', delay: 0 },
      { x: 70, height: 80, variant: 'wide', color: '#388E3C', delay: 0.6 },
      { x: 390, height: 85, variant: 'bushy', color: '#2E7D32', delay: 0.4 },
      { x: 450, height: 75, variant: 'wide', color: '#388E3C', delay: 1.0 },
      { x: 710, height: 90, variant: 'bushy', color: '#1B5E20', delay: 1.2 },
      { x: 770, height: 75, variant: 'wide', color: '#2E7D32', delay: 0.3 },
    ],
  },
  midground: {
    structures: [
      { type: 'torii', x: 120, y: 34 },
      { type: 'pagoda', x: 480, y: 24 },
    ],
  },
  foreground: {
    rocks: [
      { x: 60, y: 254, variant: 'small', color: '#78716C' },
      { x: 350, y: 250, variant: 'medium', color: '#6B7280' },
      { x: 680, y: 254, variant: 'small', color: '#78716C' },
    ],
    corals: [
      { x: 280, y: 248, variant: 'branch', color: '#E91E63' },
      { x: 620, y: 252, variant: 'fan', color: '#FF5722' },
    ],
    kelps: [
      { x: 40, height: 12, variant: 'thin', color: '#388E3C', delay: 0.2 },
      { x: 160, height: 10, variant: 'thin', color: '#2E7D32', delay: 0.8 },
      { x: 300, height: 14, variant: 'thin', color: '#388E3C', delay: 1.2 },
      { x: 480, height: 10, variant: 'thin', color: '#2E7D32', delay: 0.5 },
      { x: 600, height: 12, variant: 'thin', color: '#388E3C', delay: 0.9 },
      { x: 740, height: 10, variant: 'thin', color: '#2E7D32', delay: 1.5 },
    ],
  },
}

const ATLANTIS_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#1A5276', lighter: '#2471A3', detail: '#154360' },
  background: {
    kelps: [
      { x: 15, height: 90, variant: 'bushy', color: '#00695C', delay: 0 },
      { x: 65, height: 80, variant: 'wide', color: '#004D40', delay: 0.6 },
      { x: 640, height: 85, variant: 'bushy', color: '#004D40', delay: 0.5 },
      { x: 710, height: 75, variant: 'wide', color: '#00695C', delay: 1.0 },
      { x: 770, height: 85, variant: 'bushy', color: '#004D40', delay: 1.5 },
    ],
  },
  midground: {
    structures: [
      { type: 'atlantean-dome', x: 100, y: 8 },
      { type: 'atlantean-obelisk', x: 560, y: 20 },
    ],
  },
  foreground: {
    rocks: [
      { x: 50, y: 252, variant: 'medium', color: '#1F618D' },
      { x: 400, y: 256, variant: 'small', color: '#2471A3' },
      { x: 700, y: 250, variant: 'medium', color: '#1A5276' },
    ],
    corals: [
      { x: 300, y: 248, variant: 'fan', color: '#00BCD4' },
      { x: 650, y: 252, variant: 'brain', color: '#0097A7' },
    ],
    kelps: [
      { x: 40, height: 12, variant: 'thin', color: '#00897B', delay: 0.3 },
      { x: 180, height: 10, variant: 'thin', color: '#00695C', delay: 1 },
      { x: 320, height: 14, variant: 'thin', color: '#00897B', delay: 0.6 },
      { x: 480, height: 10, variant: 'thin', color: '#00695C', delay: 1.4 },
      { x: 600, height: 12, variant: 'thin', color: '#00897B', delay: 0.8 },
      { x: 750, height: 10, variant: 'thin', color: '#00695C', delay: 0.2 },
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
      {/* Ground shadow beneath structure */}
      <ellipse cx="40" cy="62" rx="42" ry="5" fill="#000" opacity="0.1" />
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
        {bg.kelps.map((k, i) => <Kelp key={`bg-kelp-${i}`} {...k} baseY={180} />)}
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
        {fg.kelps.map((k, i) => <Kelp key={`fg-kelp-${i}`} {...k} baseY={300} />)}
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
