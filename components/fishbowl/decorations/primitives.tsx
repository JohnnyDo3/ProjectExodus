'use client'

import { memo } from 'react'

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
    const midTone = color === '#6B7280' ? '#5C6370' : '#637080'
    const midLight = color === '#6B7280' ? '#8894A0' : '#7D8A96'
    return (
      <g transform={`translate(${x}, ${y})`}>
        {/* Dark base shadow */}
        <rect x="1" y="18" width="24" height="4" fill={darker} opacity="0.35" />
        {/* Main body */}
        <rect x="3" y="10" width="20" height="10" fill={color} />
        <rect x="6" y="5" width="14" height="7" fill={color} />
        {/* Mid-tone shading layers for gradient depth */}
        <rect x="4" y="12" width="8" height="6" fill={midLight} opacity="0.35" />
        <rect x="14" y="10" width="8" height="5" fill={midTone} opacity="0.4" />
        {/* Top highlight */}
        <rect x="9" y="3" width="8" height="4" fill={lighter} />
        <rect x="7" y="10" width="5" height="5" fill={lighter} opacity="0.5" />
        {/* Shadow side */}
        <rect x="16" y="12" width="4" height="3" fill={darker} opacity="0.3" />
        {/* Darker crevice line */}
        <rect x="13" y="8" width="1" height="7" fill={darker} opacity="0.2" />
        {/* Mineral sparkle pixel */}
        <rect x="10" y="5" width="2" height="2" fill="#D4D0C8" opacity="0.3" />
      </g>
    )
  }
  if (variant === 'large') {
    // ~70×42px bounding box (scaled up from 32×16)
    const midTone = color === '#6B7280' ? '#5C6370' : '#637080'
    const midLight = color === '#6B7280' ? '#8894A0' : '#7D8A96'
    return (
      <g transform={`translate(${x}, ${y})`}>
        {/* Main body */}
        <rect x="6" y="20" width="60" height="22" fill={color} />
        <rect x="10" y="12" width="52" height="14" fill={color} />
        {/* Intermediate color gradient layers */}
        <rect x="12" y="14" width="20" height="10" fill={midLight} opacity="0.4" />
        <rect x="34" y="16" width="18" height="8" fill={midTone} opacity="0.35" />
        <rect x="8" y="28" width="24" height="8" fill={midLight} opacity="0.25" />
        {/* Top highlight */}
        <rect x="18" y="5" width="36" height="12" fill={lighter} />
        <rect x="14" y="14" width="12" height="10" fill={lighter} opacity="0.4" />
        {/* Right side shadow gradient */}
        <rect x="44" y="20" width="16" height="10" fill={darker} opacity="0.3" />
        <rect x="56" y="18" width="8" height="18" fill={darker} opacity="0.2" />
        <rect x="62" y="22" width="4" height="14" fill={darker} opacity="0.15" />
        {/* Moss patches in different greens */}
        <rect x="10" y="16" width="8" height="5" fill="#1B5E20" opacity="0.55" />
        <rect x="12" y="18" width="4" height="3" fill="#388E3C" opacity="0.5" />
        <rect x="50" y="10" width="10" height="5" fill="#388E3C" opacity="0.4" />
        <rect x="52" y="12" width="5" height="3" fill="#66BB6A" opacity="0.35" />
        <rect x="28" y="30" width="6" height="4" fill="#1B5E20" opacity="0.4" />
        <rect x="30" y="31" width="3" height="2" fill="#66BB6A" opacity="0.3" />
        {/* Crevice/crack lines */}
        <rect x="22" y="18" width="1" height="8" fill={darker} opacity="0.2" />
        <rect x="38" y="14" width="1" height="10" fill={darker} opacity="0.18" />
        <rect x="30" y="20" width="1" height="12" fill={darker} opacity="0.15" />
        <rect x="48" y="22" width="1" height="8" fill={darker} opacity="0.12" />
        <rect x="16" y="26" width="1" height="6" fill={darker} opacity="0.14" />
        {/* Mineral vein pixels (quartz) */}
        <rect x="24" y="8" width="2" height="2" fill="#D4D0C8" opacity="0.25" />
        <rect x="40" y="12" width="2" height="1" fill="#D4D0C8" opacity="0.2" />
        <rect x="18" y="22" width="1" height="3" fill="#D4D0C8" opacity="0.18" />
        <rect x="52" y="26" width="2" height="2" fill="#D4D0C8" opacity="0.15" />
        {/* Small pebble debris near base */}
        <rect x="2" y="40" width="4" height="3" fill={midTone} opacity="0.5" />
        <rect x="64" y="38" width="3" height="3" fill={midTone} opacity="0.45" />
        <rect x="68" y="40" width="2" height="2" fill={color} opacity="0.4" />
        <rect x="0" y="41" width="2" height="2" fill={darker} opacity="0.35" />
      </g>
    )
  }
  // Medium: ~42×28px bounding box (scaled up from 20×12)
  const midToneM = color === '#6B7280' ? '#5C6370' : '#637080'
  const midLightM = color === '#6B7280' ? '#8894A0' : '#7D8A96'
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Dark base shadow */}
      <rect x="3" y="29" width="42" height="4" fill={darker} opacity="0.3" />
      {/* Main body */}
      <rect x="4" y="14" width="40" height="16" fill={color} />
      <rect x="8" y="8" width="32" height="12" fill={color} />
      {/* Intermediate shade rects for color depth */}
      <rect x="6" y="16" width="14" height="8" fill={midLightM} opacity="0.35" />
      <rect x="22" y="14" width="12" height="6" fill={midToneM} opacity="0.3" />
      <rect x="10" y="22" width="18" height="5" fill={midLightM} opacity="0.2" />
      {/* Top highlight */}
      <rect x="14" y="4" width="20" height="10" fill={lighter} />
      <rect x="12" y="12" width="8" height="8" fill={lighter} opacity="0.4" />
      {/* Subtle highlight on top-left */}
      <rect x="14" y="4" width="8" height="4" fill="#B0BAC4" opacity="0.3" />
      <rect x="10" y="8" width="6" height="3" fill={lighter} opacity="0.25" />
      {/* Right side shadow */}
      <rect x="30" y="14" width="10" height="8" fill={darker} opacity="0.3" />
      <rect x="36" y="12" width="6" height="12" fill={darker} opacity="0.2" />
      {/* Crack/crevice pixels */}
      <rect x="20" y="10" width="1" height="10" fill={darker} opacity="0.2" />
      <rect x="32" y="16" width="1" height="8" fill={darker} opacity="0.15" />
      <rect x="14" y="18" width="1" height="6" fill={darker} opacity="0.12" />
      {/* Moss patch #1 */}
      <rect x="8" y="10" width="6" height="4" fill="#5D8A3C" opacity="0.45" />
      <rect x="9" y="11" width="3" height="2" fill="#66BB6A" opacity="0.35" />
      {/* Moss patch #2 — different green */}
      <rect x="34" y="8" width="5" height="3" fill="#388E3C" opacity="0.4" />
      <rect x="35" y="9" width="3" height="2" fill="#1B5E20" opacity="0.35" />
      {/* Mineral grain detail pixels */}
      <rect x="18" y="6" width="2" height="2" fill="#D4D0C8" opacity="0.22" />
      <rect x="28" y="18" width="1" height="2" fill="#D4D0C8" opacity="0.18" />
      <rect x="40" y="22" width="2" height="1" fill="#D4D0C8" opacity="0.15" />
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

  // Intermediate shade between color and lighter
  const midCoral = color === '#E91E63' ? '#F06292' : '#C47080'

  if (variant === 'branch') {
    // ~45×50px bounding box (scaled up from ~20×22)
    return (
      <g transform={`translate(${x}, ${y})`}>
        {/* Base */}
        <rect x="12" y="38" width="22" height="12" fill={color} />
        {/* Base encrustation detail (barnacle dots) */}
        <rect x="14" y="40" width="2" height="2" fill={darker} opacity="0.3" />
        <rect x="20" y="42" width="2" height="2" fill={darker} opacity="0.25" />
        <rect x="28" y="40" width="2" height="2" fill={darker} opacity="0.2" />
        <rect x="16" y="46" width="3" height="2" fill={darker} opacity="0.22" />
        {/* Trunk */}
        <rect x="16" y="24" width="12" height="16" fill={color} />
        {/* Trunk texture ridges (horizontal 1px lines) */}
        <rect x="16" y="26" width="12" height="1" fill={darker} opacity="0.15" />
        <rect x="16" y="30" width="12" height="1" fill={darker} opacity="0.12" />
        <rect x="16" y="34" width="12" height="1" fill={darker} opacity="0.1" />
        {/* Trunk intermediate color depth */}
        <rect x="18" y="26" width="8" height="10" fill={midCoral} opacity="0.3" />
        {/* Left branch */}
        <rect x="6" y="14" width="12" height="16" fill={color} />
        <rect x="8" y="16" width="8" height="8" fill={midCoral} opacity="0.3" />
        <rect x="3" y="6" width="10" height="10" fill={lighter} />
        <rect x="5" y="2" width="6" height="6" fill={lighter} opacity="0.8" />
        {/* Left branch growth tip */}
        <rect x="6" y="0" width="4" height="3" fill={lighter} opacity="0.45" />
        {/* Right branch */}
        <rect x="28" y="10" width="12" height="20" fill={color} />
        <rect x="30" y="12" width="8" height="12" fill={midCoral} opacity="0.25" />
        <rect x="30" y="2" width="10" height="10" fill={lighter} />
        <rect x="33" y="-2" width="6" height="6" fill={lighter} opacity="0.8" />
        {/* Right branch growth tip */}
        <rect x="34" y="-4" width="4" height="3" fill={lighter} opacity="0.4" />
        {/* Middle highlight */}
        <rect x="18" y="16" width="8" height="8" fill={lighter} opacity="0.5" />
        {/* Polyp dots — original */}
        <rect x="7" y="10" width="3" height="3" fill={lighter} opacity="0.6" />
        <rect x="32" y="6" width="3" height="3" fill={lighter} opacity="0.6" />
        <rect x="20" y="28" width="3" height="3" fill={darker} opacity="0.3" />
        {/* Additional polyp dots */}
        <rect x="10" y="20" width="2" height="2" fill={lighter} opacity="0.5" />
        <rect x="36" y="16" width="2" height="2" fill={lighter} opacity="0.5" />
        <rect x="14" y="26" width="2" height="2" fill={lighter} opacity="0.45" />
      </g>
    )
  }
  if (variant === 'brain') {
    // ~50×40px bounding box (scaled up from ~24×16)
    return (
      <g transform={`translate(${x}, ${y})`}>
        {/* Main body */}
        <rect x="6" y="20" width="42" height="20" fill={color} />
        <rect x="10" y="10" width="34" height="16" fill={color} />
        <rect x="16" y="4" width="22" height="10" fill={lighter} />
        {/* Side shadow rects for 3D depth */}
        <rect x="6" y="20" width="6" height="18" fill={darker} opacity="0.2" />
        <rect x="42" y="20" width="6" height="18" fill={darker} opacity="0.15" />
        <rect x="8" y="28" width="4" height="10" fill={darker} opacity="0.12" />
        {/* Surface highlights on top */}
        <rect x="18" y="4" width="10" height="4" fill="#F8BBD0" opacity="0.3" />
        <rect x="22" y="6" width="6" height="3" fill="#FCE4EC" opacity="0.2" />
        {/* Brain meander ridges — original */}
        <rect x="16" y="14" width="22" height="2" fill={lighter} opacity="0.45" />
        <rect x="10" y="22" width="34" height="2" fill={lighter} opacity="0.4" />
        <rect x="14" y="30" width="26" height="2" fill={lighter} opacity="0.35" />
        <rect x="16" y="38" width="22" height="2" fill={lighter} opacity="0.3" />
        {/* Additional meander ridges */}
        <rect x="12" y="18" width="30" height="2" fill={lighter} opacity="0.35" />
        <rect x="18" y="26" width="18" height="2" fill={lighter} opacity="0.32" />
        <rect x="12" y="34" width="28" height="2" fill={lighter} opacity="0.28" />
        {/* Valley shadow pixels between ridges */}
        <rect x="16" y="16" width="22" height="1" fill={darker} opacity="0.18" />
        <rect x="10" y="24" width="34" height="1" fill={darker} opacity="0.15" />
        <rect x="12" y="20" width="30" height="1" fill={darker} opacity="0.14" />
        <rect x="14" y="32" width="26" height="1" fill={darker} opacity="0.12" />
        <rect x="18" y="28" width="18" height="1" fill={darker} opacity="0.13" />
        {/* Polyp cup detail pixels */}
        <rect x="20" y="12" width="2" height="2" fill={midCoral} opacity="0.3" />
        <rect x="30" y="20" width="2" height="2" fill={midCoral} opacity="0.28" />
        <rect x="16" y="28" width="2" height="2" fill={midCoral} opacity="0.25" />
        <rect x="36" y="32" width="2" height="2" fill={midCoral} opacity="0.22" />
        <rect x="24" y="36" width="2" height="2" fill={midCoral} opacity="0.2" />
        {/* Polyp highlights — original */}
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
      {/* Base attachment detail rects */}
      <rect x="16" y="46" width="14" height="4" fill={darker} opacity="0.3" />
      <rect x="20" y="48" width="6" height="3" fill={darker} opacity="0.2" />
      {/* Fan body */}
      <rect x="4" y="14" width="40" height="22" fill={color} opacity="0.8" />
      {/* Color depth intermediate rects */}
      <rect x="8" y="16" width="16" height="14" fill={midCoral} opacity="0.25" />
      <rect x="26" y="16" width="14" height="14" fill={midCoral} opacity="0.2" />
      <rect x="8" y="6" width="32" height="14" fill={lighter} opacity="0.6" />
      <rect x="12" y="0" width="22" height="10" fill={lighter} opacity="0.4" />
      {/* Growth edge detail (lighter pixels at top edge) */}
      <rect x="14" y="0" width="18" height="2" fill="#FCE4EC" opacity="0.35" />
      <rect x="10" y="2" width="4" height="2" fill="#F8BBD0" opacity="0.3" />
      <rect x="32" y="2" width="4" height="2" fill="#F8BBD0" opacity="0.25" />
      {/* Vein/branch pattern lines (1px dark lines radiating from stem) */}
      <rect x="22" y="14" width="1" height="20" fill={darker} opacity="0.15" />
      <rect x="16" y="16" width="1" height="16" fill={darker} opacity="0.12" />
      <rect x="30" y="16" width="1" height="16" fill={darker} opacity="0.12" />
      <rect x="10" y="20" width="1" height="10" fill={darker} opacity="0.1" />
      <rect x="36" y="20" width="1" height="10" fill={darker} opacity="0.1" />
      {/* Fan holes (transparent polyp cups) — original */}
      <rect x="14" y="20" width="4" height="4" fill="transparent" />
      <rect x="28" y="16" width="4" height="4" fill="transparent" />
      <rect x="20" y="10" width="4" height="4" fill="transparent" />
      {/* Additional polyp cup holes */}
      <rect x="8" y="24" width="3" height="3" fill="transparent" />
      <rect x="34" y="22" width="3" height="3" fill="transparent" />
      <rect x="24" y="18" width="3" height="3" fill="transparent" />
      <rect x="18" y="26" width="3" height="3" fill="transparent" />
      {/* Edge detail */}
      <rect x="4" y="14" width="2" height="22" fill={darker} opacity="0.2" />
      <rect x="42" y="14" width="2" height="22" fill={darker} opacity="0.15" />
    </g>
  )
})
Coral.displayName = 'Coral'

export const BubbleStream = memo(({ x, count = 5 }: { x: number; count?: number }) => (
  <g>
    {Array.from({ length: count }, (_, i) => {
      const bubbleOpacity = 0.15 + (i % 3) * 0.1
      const bx = x + (i % 3) * 4 - 2
      const br = 1.5 + (i % 3) * 0.8
      return (
        <g key={i}>
          <circle
            cx={bx} cy={0} r={br}
            fill={`rgba(255, 255, 255, ${bubbleOpacity})`} stroke={`rgba(255, 255, 255, ${bubbleOpacity + 0.2})`} strokeWidth="0.5"
            style={{ animation: `bubbleRise ${3 + i * 0.6}s ease-in ${i * 0.9}s infinite` }}
          />
          {/* Tiny highlight pixel on each bubble */}
          <rect
            x={bx - br * 0.3} y={-br * 0.4} width={Math.max(1, br * 0.4)} height={Math.max(1, br * 0.4)}
            fill="white" opacity={0.15 + (i % 2) * 0.08}
            style={{ animation: `bubbleRise ${3 + i * 0.6}s ease-in ${i * 0.9}s infinite` }}
          />
        </g>
      )
    })}
  </g>
))
BubbleStream.displayName = 'BubbleStream'
