'use client'

import { memo, useEffect, useState, useRef, useCallback, useMemo } from 'react'

// ─── Mated Crab Pair (Bottom Dweller) ───────────────────────────────
// Two crabs that scuttle along the bottom — mates for life.
// Variant 0 = slightly larger/deeper color, variant 1 = slightly smaller/warmer hue.

interface CrabColors {
  carapace: string
  carapaceMid: string
  carapaceDark: string
  carapaceDeep: string
  clawBase: string
  clawTip: string
  legTop: string
  legBottom: string
  accent: string
  bumpDark: string
  grooveDark: string
}

const CRAB_MATE_COLORS: CrabColors[] = [
  // Mate A — deep mahogany-rust (slightly larger)
  {
    carapace: '#C85A42', carapaceMid: '#A8382A', carapaceDark: '#7A2818',
    carapaceDeep: '#5C1A0E', clawBase: '#C85A42', clawTip: '#8E3020',
    legTop: '#B04A36', legBottom: '#884028', accent: '#D4654A',
    bumpDark: '#8A2818', grooveDark: '#6A1C0E',
  },
  // Mate B — warm terracotta-amber (slightly smaller)
  {
    carapace: '#D87C52', carapaceMid: '#C06038', carapaceDark: '#944828',
    carapaceDeep: '#6E3418', clawBase: '#D87C52', clawTip: '#A05030',
    legTop: '#C46A44', legBottom: '#9A5838', accent: '#E89060',
    bumpDark: '#9A4828', grooveDark: '#7A3818',
  },
]

const CrabSVG = memo(({
  id, facingRight, size = 48, variant = 0,
  walkPhase = 0, bodyTilt = 0, bounceY = 0, clawRaise = 0,
}: {
  id: string
  facingRight: boolean
  size?: number
  variant?: number
  walkPhase?: number
  bodyTilt?: number
  bounceY?: number
  clawRaise?: number
}) => {
  const scaleX = facingRight ? 1 : -1
  const c = CRAB_MATE_COLORS[variant % 2]
  // Per-leg step cycle — horizontal swing + vertical lift.
  // Legs lift only during the forward half of the swing (sin > 0), giving
  // a natural arching gait instead of flat side-to-side sliding.
  const step = (pair: number, swing: number, lift: number) => {
    const phase = walkPhase + pair * Math.PI * 0.5
    const s = Math.sin(phase)
    return { x: s * swing, y: Math.max(0, s) * -lift }
  }
  const l0 = step(0, 5, 2.4)
  const l1 = step(1, 5, 2.2)
  const l2 = step(2, 5, 2.2)
  const l3 = step(3, 5, 2.4)
  const cr = clawRaise
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 80 60" fill="none">
      <defs>
        {/* Carapace gradient — rich shell coloring */}
        <radialGradient id={`cb-${id}`} cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor={c.carapace} />
          <stop offset="35%" stopColor={c.carapaceMid} />
          <stop offset="75%" stopColor={c.carapaceDark} />
          <stop offset="100%" stopColor={c.carapaceDeep} />
        </radialGradient>
        {/* Shell highlight — wet sheen */}
        <radialGradient id={`ch-${id}`} cx="35%" cy="30%" r="40%">
          <stop offset="0%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        {/* Claw gradient */}
        <linearGradient id={`cc-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c.clawBase} />
          <stop offset="100%" stopColor={c.clawTip} />
        </linearGradient>
        {/* Leg gradient */}
        <linearGradient id={`cl-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.legTop} />
          <stop offset="100%" stopColor={c.legBottom} />
        </linearGradient>
        {/* Belly/underside gradient */}
        <radialGradient id={`cu-${id}`} cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor={c.carapace} stopOpacity="0.15" />
          <stop offset="100%" stopColor={c.carapaceDark} stopOpacity="0.08" />
        </radialGradient>
      </defs>
      {/* Outer transform: flip for direction + body rock (tilt) + gait bounce (Y) */}
      <g transform={`translate(40, ${30 + bounceY}) rotate(${bodyTilt}) scale(${scaleX}, 1) translate(-40, -30)`}>

        {/* === WALKING LEGS (4 pairs, per-leg swing + arching lift gait) === */}
        {/* Back legs — pair 4 (rearmost) */}
        <path d={`M22 32 Q${16 + l3.x} ${40 + l3.y * 0.5} ${10 + l3.x} ${46 + l3.y} Q${8 + l3.x} ${48 + l3.y} ${6 + l3.x} ${46 + l3.y}`} stroke={`url(#cl-${id})`} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d={`M58 32 Q${64 - l3.x} ${40 + l3.y * 0.5} ${70 - l3.x} ${46 + l3.y} Q${72 - l3.x} ${48 + l3.y} ${74 - l3.x} ${46 + l3.y}`} stroke={`url(#cl-${id})`} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {/* Pair 3 */}
        <path d={`M26 34 Q${20 + l2.x} ${42 + l2.y * 0.5} ${14 + l2.x} ${50 + l2.y} Q${12 + l2.x} ${52 + l2.y} ${10 + l2.x} ${50 + l2.y}`} stroke={`url(#cl-${id})`} strokeWidth="2.0" fill="none" strokeLinecap="round" />
        <path d={`M54 34 Q${60 - l2.x} ${42 + l2.y * 0.5} ${66 - l2.x} ${50 + l2.y} Q${68 - l2.x} ${52 + l2.y} ${70 - l2.x} ${50 + l2.y}`} stroke={`url(#cl-${id})`} strokeWidth="2.0" fill="none" strokeLinecap="round" />
        {/* Pair 2 */}
        <path d={`M30 33 Q${24 + l1.x} ${44 + l1.y * 0.5} ${18 + l1.x} ${52 + l1.y} Q${16 + l1.x} ${54 + l1.y} ${14 + l1.x} ${52 + l1.y}`} stroke={`url(#cl-${id})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d={`M50 33 Q${56 - l1.x} ${44 + l1.y * 0.5} ${62 - l1.x} ${52 + l1.y} Q${64 - l1.x} ${54 + l1.y} ${66 - l1.x} ${52 + l1.y}`} stroke={`url(#cl-${id})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Front legs — pair 1 */}
        <path d={`M34 30 Q${28 + l0.x} ${42 + l0.y * 0.5} ${22 + l0.x} ${50 + l0.y} Q${20 + l0.x} ${52 + l0.y} ${18 + l0.x} ${50 + l0.y}`} stroke={`url(#cl-${id})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d={`M46 30 Q${52 - l0.x} ${42 + l0.y * 0.5} ${58 - l0.x} ${50 + l0.y} Q${60 - l0.x} ${52 + l0.y} ${62 - l0.x} ${50 + l0.y}`} stroke={`url(#cl-${id})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Leg joint dots */}
        <circle cx={16 + l3.x * 0.5} cy={42 + l3.y * 0.5} r="1.0" fill={c.legBottom} opacity="0.5" />
        <circle cx={64 - l3.x * 0.5} cy={42 + l3.y * 0.5} r="1.0" fill={c.legBottom} opacity="0.5" />
        <circle cx={20 + l2.x * 0.5} cy={44 + l2.y * 0.5} r="1.0" fill={c.legBottom} opacity="0.5" />
        <circle cx={60 - l2.x * 0.5} cy={44 + l2.y * 0.5} r="1.0" fill={c.legBottom} opacity="0.5" />

        {/* === CLAWS (chelipeds) — held up at 90 degrees, defensive posture === */}
        {/* Left claw arm — angled upward (cr = per-tick claw raise/lower) */}
        <path d={`M28 22 Q22 ${14 - cr} 18 ${6 - cr} Q16 ${2 - cr} 14 ${4 - cr}`} stroke={`url(#cc-${id})`} strokeWidth="3.0" fill="none" strokeLinecap="round" />
        {/* Left claw pincer — open, pointing up */}
        <path d={`M16 ${2 - cr} Q10 ${-4 - cr} 8 ${-1 - cr} Q7 ${3 - cr} 10 ${5 - cr} Q13 ${6 - cr} 15 ${4 - cr}`} fill={`url(#cc-${id})`} />
        <path d={`M15 ${4 - cr} Q12 ${8 - cr} 10 ${9 - cr} Q8 ${8 - cr} 9 ${5 - cr}`} fill={c.clawTip} />
        {/* Left claw serration */}
        <path d={`M10 ${1 - cr} L9 ${0 - cr} M11 ${2 - cr} L10 ${1 - cr}`} stroke={c.carapaceDeep} strokeWidth="0.3" fill="none" opacity="0.35" />
        {/* Right claw arm — angled upward */}
        <path d={`M52 22 Q58 ${14 - cr} 62 ${6 - cr} Q64 ${2 - cr} 66 ${4 - cr}`} stroke={`url(#cc-${id})`} strokeWidth="3.0" fill="none" strokeLinecap="round" />
        {/* Right claw pincer — open, pointing up */}
        <path d={`M64 ${2 - cr} Q70 ${-4 - cr} 72 ${-1 - cr} Q73 ${3 - cr} 70 ${5 - cr} Q67 ${6 - cr} 65 ${4 - cr}`} fill={`url(#cc-${id})`} />
        <path d={`M65 ${4 - cr} Q68 ${8 - cr} 70 ${9 - cr} Q72 ${8 - cr} 71 ${5 - cr}`} fill={c.clawTip} />
        {/* Right claw serration */}
        <path d={`M70 ${1 - cr} L71 ${0 - cr} M69 ${2 - cr} L70 ${1 - cr}`} stroke={c.carapaceDeep} strokeWidth="0.3" fill="none" opacity="0.35" />
        {/* Claw highlights — wet gleam */}
        <path d={`M10 ${-2 - cr} Q11.5 ${-3 - cr} 13 ${-1 - cr}`} stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
        <path d={`M69 ${-2 - cr} Q70.5 ${-3 - cr} 72 ${-1 - cr}`} stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />

        {/* === CARAPACE (main shell body — wide oval) === */}
        <ellipse cx="40" cy="26" rx="18" ry="12" fill={`url(#cb-${id})`} />

        {/* Shell texture — more defined granular bumps */}
        <circle cx="32" cy="22" r="1.4" fill={c.bumpDark} opacity="0.3" />
        <circle cx="36" cy="20" r="1.1" fill={c.bumpDark} opacity="0.25" />
        <circle cx="44" cy="20" r="1.1" fill={c.bumpDark} opacity="0.25" />
        <circle cx="48" cy="22" r="1.4" fill={c.bumpDark} opacity="0.3" />
        <circle cx="40" cy="18" r="0.9" fill={c.bumpDark} opacity="0.22" />
        <circle cx="34" cy="28" r="1.0" fill={c.bumpDark} opacity="0.2" />
        <circle cx="46" cy="28" r="1.0" fill={c.bumpDark} opacity="0.2" />
        {/* Additional texture detail */}
        <circle cx="38" cy="22" r="0.7" fill={c.bumpDark} opacity="0.18" />
        <circle cx="42" cy="22" r="0.7" fill={c.bumpDark} opacity="0.18" />
        <circle cx="30" cy="25" r="0.8" fill={c.bumpDark} opacity="0.15" />
        <circle cx="50" cy="25" r="0.8" fill={c.bumpDark} opacity="0.15" />

        {/* Carapace segments — gastric grooves */}
        <path d="M30 18 Q34 22 40 24" stroke={c.grooveDark} strokeWidth="0.7" fill="none" opacity="0.28" />
        <path d="M50 18 Q46 22 40 24" stroke={c.grooveDark} strokeWidth="0.7" fill="none" opacity="0.28" />
        <path d="M40 16 Q40 20 40 24" stroke={c.grooveDark} strokeWidth="0.5" fill="none" opacity="0.22" />
        {/* Branchial groove (side lines) */}
        <path d="M26 24 Q30 28 36 30" stroke={c.grooveDark} strokeWidth="0.6" fill="none" opacity="0.22" />
        <path d="M54 24 Q50 28 44 30" stroke={c.grooveDark} strokeWidth="0.6" fill="none" opacity="0.22" />
        {/* Hepatic region patterns */}
        <path d="M28 20 Q32 24 36 26" stroke={c.grooveDark} strokeWidth="0.35" fill="none" opacity="0.15" />
        <path d="M52 20 Q48 24 44 26" stroke={c.grooveDark} strokeWidth="0.35" fill="none" opacity="0.15" />

        {/* Shell wet highlight — broader sheen */}
        <ellipse cx="36" cy="22" rx="9" ry="5.5" fill={`url(#ch-${id})`} />

        {/* Carapace rim */}
        <ellipse cx="40" cy="26" rx="18" ry="12" fill="none" stroke={c.carapaceDeep} strokeWidth="0.9" opacity="0.35" />

        {/* === ROSTRUM (front point of shell between eyes) === */}
        <path d="M35 15 Q40 9 45 15" fill={c.clawTip} />
        <path d="M36.5 15 Q40 10.5 43.5 15" stroke={c.grooveDark} strokeWidth="0.5" fill="none" opacity="0.3" />
        {/* Rostral spine detail */}
        <path d="M40 10 L40 9" stroke={c.carapaceDark} strokeWidth="0.4" opacity="0.3" />

        {/* === EYES — on short stalks, expressive === */}
        {/* Left eye stalk */}
        <path d="M34 16 Q30 10 28 7" stroke={c.carapaceMid} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <circle cx="28" cy="7" r="2.8" fill="#1A1A28" />
        <circle cx="28" cy="7" r="2.0" fill="#0E0E18" />
        <circle cx="29" cy="6" r="1.0" fill="white" opacity="0.75" />
        <circle cx="27.5" cy="8" r="0.4" fill="white" opacity="0.35" />
        {/* Right eye stalk */}
        <path d="M46 16 Q50 10 52 7" stroke={c.carapaceMid} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <circle cx="52" cy="7" r="2.8" fill="#1A1A28" />
        <circle cx="52" cy="7" r="2.0" fill="#0E0E18" />
        <circle cx="53" cy="6" r="1.0" fill="white" opacity="0.75" />
        <circle cx="51.5" cy="8" r="0.4" fill="white" opacity="0.35" />

        {/* === ANTENNULES — short sensory feelers between eyes === */}
        <path d="M37 14 Q35 10 34 7" stroke={c.accent} strokeWidth="0.6" fill="none" opacity="0.35" strokeLinecap="round" />
        <path d="M43 14 Q45 10 46 7" stroke={c.accent} strokeWidth="0.6" fill="none" opacity="0.35" strokeLinecap="round" />

        {/* === MOUTH PARTS — mandibles/maxillipeds === */}
        <path d="M38 32 Q36 34 35 36" stroke={c.legBottom} strokeWidth="1.0" fill="none" opacity="0.4" />
        <path d="M42 32 Q44 34 45 36" stroke={c.legBottom} strokeWidth="1.0" fill="none" opacity="0.4" />
        <ellipse cx="40" cy="33" rx="3.5" ry="1.8" fill={c.carapaceDark} opacity="0.3" />
        {/* Third maxilliped detail */}
        <path d="M37 33 Q36 35 36 37" stroke={c.legBottom} strokeWidth="0.5" fill="none" opacity="0.2" />
        <path d="M43 33 Q44 35 44 37" stroke={c.legBottom} strokeWidth="0.5" fill="none" opacity="0.2" />

        {/* === SURFACE DETAILS === */}
        {/* Dorsal spine bumps */}
        <circle cx="40" cy="16" r="0.7" fill={c.accent} opacity="0.4" />
        <circle cx="36" cy="17" r="0.6" fill={c.accent} opacity="0.35" />
        <circle cx="44" cy="17" r="0.6" fill={c.accent} opacity="0.35" />
        {/* Wet sheen edges */}
        <path d="M28 20 Q34 16 40 15 Q46 16 52 20" stroke="white" strokeWidth="0.6" fill="none" opacity="0.14" />
        {/* Subtle belly shadow */}
        <ellipse cx="40" cy="34" rx="14" ry="4" fill={`url(#cu-${id})`} />
      </g>
    </svg>
  )
})
CrabSVG.displayName = 'CrabSVG'

// ─── Baby Crab Movement System ──────────────────────────────────────
// Crabs scuttle sideways along the bottom, pause to pick at food,
// occasionally dart sideways quickly when startled. They hang out
// near structures and in substrate areas.

// Convert SVG viewBox coords (800×320, xMidYMax meet) to container pixels
function svgToPixel(
  svgX: number, svgY: number, cw: number, ch: number,
): { x: number; y: number } {
  const containerAspect = cw / ch
  const svgAspect = 800 / 320
  let scale: number, ox: number, oy: number
  if (containerAspect > svgAspect) {
    scale = ch / 320; ox = (cw - 800 * scale) / 2; oy = 0
  } else {
    scale = cw / 800; ox = 0; oy = ch - 320 * scale
  }
  return { x: ox + svgX * scale, y: oy + svgY * scale }
}

// Crab behavior phases:
//   scuttle — sideways movement along the bottom (signature crab walk)
//   pause — stopped, antennae twitching, checking surroundings
//   forage — picking at substrate/algae with tiny claws
//   dart — quick sideways dash (startled or relocating)
//   hide — tucked near a structure, mostly still

type CrabPhase = 'scuttle' | 'pause' | 'forage' | 'dart' | 'hide'

interface CrabMotion {
  x: number; y: number
  phase: CrabPhase
  targetX: number; targetY: number
  speed: number
  facingRight: boolean
  // Phase timer — now measured in seconds (was ticks)
  phaseTime: number
  // Scuttle wobble (gait phase)
  wobblePhase: number
  // Forage animation
  foragePhase: number
  // Presentation: body rock + vertical bounce, smoothed via rAF
  bodyTilt: number
  bounceY: number
  clawRaise: number
}

function createCrabMotion(startX: number, startY: number): CrabMotion {
  return {
    x: startX, y: startY,
    phase: 'scuttle',
    targetX: startX + (Math.random() - 0.5) * 200,
    targetY: startY,
    speed: 22 + Math.random() * 14, // pixels per second (scuttle)
    facingRight: Math.random() > 0.5,
    phaseTime: 3 + Math.random() * 4,
    wobblePhase: Math.random() * Math.PI * 2,
    foragePhase: 0,
    bodyTilt: 0,
    bounceY: 0,
    clawRaise: 0,
  }
}

// Smoothly ease a value toward a target — used for gait tilt/bounce so the
// body rocks without popping when phases change.
function damp(current: number, target: number, rate: number, dt: number): number {
  const t = 1 - Math.exp(-rate * dt)
  return current + (target - current) * t
}

function tickCrab(c: CrabMotion, cw: number, ch: number, dt: number): void {
  const bottomBound = ch - 12
  const bottomZone = ch * 0.7  // crabs stay in bottom 30%

  // Target values the body interpolates toward each frame (gait presentation)
  let tiltTarget = 0
  let bounceTarget = 0
  let clawTarget = 0

  switch (c.phase) {
    case 'scuttle': {
      // Sideways crab walk — primary X movement, arching gait
      // Gait frequency scales with walking speed (~3 Hz step cycle at base speed)
      const gaitFreq = 6 + c.speed * 0.12
      c.wobblePhase += gaitFreq * dt
      const dx = c.targetX - c.x
      const moveDir = dx > 0 ? 1 : -1
      c.facingRight = moveDir > 0

      const scuttleSpeed = c.speed * (0.85 + Math.sin(c.wobblePhase * 2) * 0.15)
      c.x += moveDir * scuttleSpeed * dt
      // slight organic vertical drift (half a pixel over a step cycle)
      c.y += Math.sin(c.wobblePhase * 0.5) * 0.02

      // Body rocks side-to-side with the gait, bounces up/down per step
      tiltTarget = Math.sin(c.wobblePhase) * 2.2 * moveDir
      bounceTarget = -Math.abs(Math.sin(c.wobblePhase * 2)) * 0.9

      c.phaseTime -= dt
      if (Math.abs(dx) < 5 || c.phaseTime <= 0) {
        const roll = Math.random()
        if (roll < 0.35) {
          c.phase = 'pause'
          c.phaseTime = 1.5 + Math.random() * 3
        } else if (roll < 0.65) {
          c.phase = 'forage'
          c.phaseTime = 3 + Math.random() * 5
          c.foragePhase = 0
        } else if (roll < 0.8) {
          c.targetX = Math.max(15, Math.min(cw - 40, c.x + (Math.random() - 0.5) * 250))
          c.targetY = Math.max(bottomZone, Math.min(bottomBound, c.y + (Math.random() - 0.5) * 30))
          c.phaseTime = 2 + Math.random() * 4
        } else {
          c.phase = 'hide'
          c.phaseTime = 4 + Math.random() * 8
        }
      }
      break
    }

    case 'pause': {
      // Sitting still — antennae/claw twitch, tiny sway
      c.wobblePhase += 2.5 * dt
      tiltTarget = Math.sin(c.wobblePhase * 1.2) * 0.8
      bounceTarget = 0
      clawTarget = Math.sin(c.wobblePhase * 0.7) * 0.3
      c.phaseTime -= dt
      if (c.phaseTime <= 0) {
        if (Math.random() < 0.15) {
          c.phase = 'dart'
          c.targetX = Math.max(15, Math.min(cw - 40, c.x + (Math.random() > 0.5 ? 1 : -1) * (80 + Math.random() * 120)))
          c.phaseTime = 0.5 + Math.random() * 0.4
        } else {
          c.phase = 'scuttle'
          c.targetX = Math.max(15, Math.min(cw - 40, c.x + (Math.random() - 0.5) * 200))
          c.phaseTime = 2 + Math.random() * 4
        }
      }
      break
    }

    case 'forage': {
      // Picking at substrate — subtle body shift + claw pumping
      c.foragePhase += 4 * dt
      c.x += Math.sin(c.foragePhase) * 0.08
      c.y += Math.sin(c.foragePhase * 0.6) * 0.04
      tiltTarget = Math.sin(c.foragePhase * 0.5) * 1.4
      bounceTarget = Math.sin(c.foragePhase) * 0.4
      // Claws rhythmically dip down as if picking at the sand
      clawTarget = 1.5 + Math.sin(c.foragePhase * 1.2) * 1.2

      c.phaseTime -= dt
      if (c.phaseTime <= 0) {
        c.phase = 'scuttle'
        c.targetX = Math.max(15, Math.min(cw - 40, c.x + (Math.random() - 0.5) * 180))
        c.phaseTime = 2.5 + Math.random() * 3.5
      }
      break
    }

    case 'dart': {
      // Quick sideways dash — startled crab, fast gait
      c.wobblePhase += 20 * dt
      const dx = c.targetX - c.x
      const moveDir = dx > 0 ? 1 : -1
      c.facingRight = moveDir > 0
      c.x += moveDir * c.speed * 3.8 * dt
      tiltTarget = Math.sin(c.wobblePhase) * 4 * moveDir
      bounceTarget = -Math.abs(Math.sin(c.wobblePhase * 2)) * 1.4
      // Claws tuck down while darting
      clawTarget = -1.2

      c.phaseTime -= dt
      if (Math.abs(dx) < 8 || c.phaseTime <= 0) {
        c.phase = 'pause'
        c.phaseTime = 1 + Math.random() * 2
      }
      break
    }

    case 'hide': {
      // Tucked in, barely moving
      c.wobblePhase += 0.5 * dt
      c.x += Math.sin(c.wobblePhase) * 0.008
      tiltTarget = 0
      bounceTarget = 0.3
      clawTarget = -0.6
      c.phaseTime -= dt
      if (c.phaseTime <= 0) {
        c.phase = 'scuttle'
        c.targetX = Math.max(15, Math.min(cw - 40, c.x + (Math.random() - 0.5) * 200))
        c.phaseTime = 2 + Math.random() * 4
      }
      break
    }
  }

  // Damp presentation values toward their targets for smooth transitions
  c.bodyTilt = damp(c.bodyTilt, tiltTarget, 10, dt)
  c.bounceY = damp(c.bounceY, bounceTarget, 14, dt)
  c.clawRaise = damp(c.clawRaise, clawTarget, 6, dt)

  // Clamp to tank bounds — crabs stay on the bottom
  c.x = Math.max(10, Math.min(cw - 40, c.x))
  c.y = Math.max(bottomZone, Math.min(bottomBound, c.y))
}

// Always 2 crabs per tank — mated pair (mates for life)
// Mate A is slightly larger, Mate B slightly smaller
const CRAB_MATE_SIZES = [48, 42]

interface CrabRenderState {
  x: number
  y: number
  facingRight: boolean
  walkPhase: number
  bodyTilt: number
  bounceY: number
  clawRaise: number
}

export const CrabGroup = memo(({ containerWidth, containerHeight, contained = false }: {
  containerWidth: number
  containerHeight: number
  contained?: boolean
}) => {
  const count = 2 // always a mated pair
  const crabsRef = useRef<CrabMotion[]>([])
  const [positions, setPositions] = useState<CrabRenderState[]>([])

  // Initialize the mated pair — start near each other
  useEffect(() => {
    if (containerWidth === 0 || containerHeight === 0) return

    const centerX = containerWidth * 0.5
    const bottomY = containerHeight * (0.80 + Math.random() * 0.10)

    crabsRef.current = Array.from({ length: count }, (_, i) => {
      const offsetX = (i === 0 ? -1 : 1) * (30 + Math.random() * 20)
      const startX = Math.max(25, Math.min(containerWidth - 50, centerX + offsetX))
      const startY = bottomY + (Math.random() - 0.5) * 10
      return createCrabMotion(startX, startY)
    })

    setPositions(crabsRef.current.map(c => ({
      x: c.x, y: c.y, facingRight: c.facingRight,
      walkPhase: c.wobblePhase, bodyTilt: c.bodyTilt,
      bounceY: c.bounceY, clawRaise: c.clawRaise,
    })))
  }, [containerWidth, containerHeight, count])

  // Smooth 60 fps rAF loop — delta-time integration so gait + movement stay
  // framerate-independent. React re-renders per frame but the two memo'd
  // CrabSVGs are cheap and the outer wrapper uses GPU-composited transforms.
  useEffect(() => {
    if (containerWidth === 0 || containerHeight === 0) return
    if (crabsRef.current.length < 2) return

    let raf = 0
    let last = performance.now()

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000) // cap to 50 ms (tab blur)
      last = now

      crabsRef.current.forEach(crab => tickCrab(crab, containerWidth, containerHeight, dt))

      // Mate bond: if crabs drift too far apart (>40% of tank width),
      // one of them redirects toward the partner.
      const [a, b] = crabsRef.current
      const mateDist = Math.abs(a.x - b.x)
      const maxDist = containerWidth * 0.40
      if (mateDist > maxDist) {
        for (const [self, partner] of [[a, b], [b, a]] as [CrabMotion, CrabMotion][]) {
          if (self.phase === 'scuttle' || self.phase === 'pause') {
            self.phase = 'scuttle'
            self.targetX = partner.x + (Math.random() - 0.5) * 40
            self.phaseTime = 2 + Math.random() * 2
            break
          }
        }
      }

      setPositions(crabsRef.current.map(c => ({
        x: c.x, y: c.y, facingRight: c.facingRight,
        walkPhase: c.wobblePhase, bodyTilt: c.bodyTilt,
        bounceY: c.bounceY, clawRaise: c.clawRaise,
      })))

      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [containerWidth, containerHeight])

  if (containerWidth === 0 || containerHeight === 0) return null

  return (
    <div className="absolute inset-0 z-[22] pointer-events-none">
      {positions.map((pos, i) => (
        <div
          key={`crab-${i}`}
          className="absolute left-0 top-0"
          style={{
            // GPU-composited transform — smoother than animating left/top
            transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
            willChange: 'transform',
          }}
        >
          <CrabSVG
            id={`crab-${i}`}
            facingRight={pos.facingRight}
            size={CRAB_MATE_SIZES[i]}
            variant={i}
            walkPhase={pos.walkPhase}
            bodyTilt={pos.bodyTilt}
            bounceY={pos.bounceY}
            clawRaise={pos.clawRaise}
          />
        </div>
      ))}
    </div>
  )
})
CrabGroup.displayName = 'CrabGroup'

// Backward-compatible export
export const PlecoPair = CrabGroup


// ─── Glass Snail System ────────────────────────────────────────────
// Snails that crawl on the glass with belly facing the viewer.
// Each snail follows a distinct Zamboni-style cleaning pattern,
// systematically covering the glass surface like ice resurfacers.

interface SnailColor {
  shell: string
  shellLight: string
  shellDark: string
  body: string
  bodyDark: string
  bodyHighlight: string
}

// 6 color variants — refined with richer depth and nacre-like iridescence
const SNAIL_COLOR_LIST: SnailColor[] = [
  { shell: '#D96B8A', shellLight: '#F2A0B8', shellDark: '#A84868', body: '#F2D0DA', bodyDark: '#D4A0B4', bodyHighlight: '#FDE8EF' },  // rose
  { shell: '#4E82B8', shellLight: '#7AACD8', shellDark: '#305C8A', body: '#C0D8F0', bodyDark: '#8EB4D8', bodyHighlight: '#E0F0FF' },  // ocean
  { shell: '#C89830', shellLight: '#E4C060', shellDark: '#A67820', body: '#F0DCA8', bodyDark: '#D4C080', bodyHighlight: '#FFF4D4' },  // amber
  { shell: '#8E60AA', shellLight: '#B088C8', shellDark: '#6A408A', body: '#D8C8E8', bodyDark: '#B8A0D0', bodyHighlight: '#F4E8FF' },  // amethyst
  { shell: '#4EA060', shellLight: '#78C488', shellDark: '#347848', body: '#B8E0C4', bodyDark: '#8CC4A0', bodyHighlight: '#DCF6E4' },  // jade
  { shell: '#D06840', shellLight: '#E89870', shellDark: '#A84828', body: '#F0D0B8', bodyDark: '#D4B098', bodyHighlight: '#FFF0E4' },  // coral
]

// ─── Ultra-Detailed Belly-Facing Snail SVG ──────────────────────────
// Minecraft pixel-block technique: every element built from small rect/circle
// "pixels" for maximum fidelity. Viewed from below through glass.
// Shell on back, belly/foot pressed against glass, antlers from head.
// Default orientation: head points RIGHT.

const SnailSVG = memo(({ id, color, facingRight = true, size = 26 }: {
  id: string
  color: SnailColor
  facingRight: boolean
  size?: number
}) => {
  const scaleX = facingRight ? 1 : -1
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 80 56" fill="none">
      <defs>
        <radialGradient id={`ss-${id}`} cx="0.36" cy="0.30" r="0.60">
          <stop offset="0%" stopColor={color.shellLight} />
          <stop offset="30%" stopColor={color.shellLight} stopOpacity="0.9" />
          <stop offset="55%" stopColor={color.shell} />
          <stop offset="85%" stopColor={color.shellDark} />
          <stop offset="100%" stopColor={color.shellDark} stopOpacity="0.75" />
        </radialGradient>
        <radialGradient id={`sf-${id}`} cx="0.45" cy="0.38" r="0.65">
          <stop offset="0%" stopColor={color.bodyHighlight} />
          <stop offset="40%" stopColor={color.body} />
          <stop offset="100%" stopColor={color.bodyDark} />
        </radialGradient>
        <radialGradient id={`se-${id}`} cx="0.35" cy="0.35" r="0.5">
          <stop offset="0%" stopColor="#2A2A3E" />
          <stop offset="100%" stopColor="#0E0E1A" />
        </radialGradient>
        {/* Nacre iridescence shimmer */}
        <linearGradient id={`sn-${id}`} x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0%" stopColor={color.shellLight} stopOpacity="0.15" />
          <stop offset="30%" stopColor="white" stopOpacity="0.08" />
          <stop offset="50%" stopColor={color.shellLight} stopOpacity="0.12" />
          <stop offset="80%" stopColor="white" stopOpacity="0.06" />
          <stop offset="100%" stopColor={color.shell} stopOpacity="0.1" />
        </linearGradient>
        {/* Mucus/slime shine */}
        <linearGradient id={`sm-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.18" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        {/* Body translucency overlay */}
        <radialGradient id={`st-${id}`} cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="white" stopOpacity="0.06" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform={`translate(40, 28) scale(${scaleX}, 1) translate(-40, -28)`}>

        {/* === SHELL (back layer — refined spiral with nacre depth) === */}
        {/* Shell base — smooth gradient foundation */}
        <ellipse cx="26" cy="18" rx="17" ry="15" fill={`url(#ss-${id})`} />

        {/* Shell pixel-block texture — outer ring with varied opacity for depth */}
        <rect x="10" y="14" width="2" height="2" fill={color.shellDark} opacity="0.40" />
        <rect x="12" y="10" width="2" height="2" fill={color.shellDark} opacity="0.35" />
        <rect x="16" y="6" width="2" height="2" fill={color.shell} opacity="0.45" />
        <rect x="20" y="4" width="2" height="2" fill={color.shellLight} opacity="0.50" />
        <rect x="24" y="3" width="2" height="2" fill={color.shellLight} opacity="0.55" />
        <rect x="28" y="4" width="2" height="2" fill={color.shell} opacity="0.45" />
        <rect x="32" y="6" width="2" height="2" fill={color.shell} opacity="0.40" />
        <rect x="36" y="10" width="2" height="2" fill={color.shellDark} opacity="0.35" />
        <rect x="38" y="14" width="2" height="2" fill={color.shellDark} opacity="0.30" />
        <rect x="40" y="18" width="2" height="2" fill={color.shellDark} opacity="0.25" />
        <rect x="38" y="22" width="2" height="2" fill={color.shellDark} opacity="0.30" />
        <rect x="36" y="26" width="2" height="2" fill={color.shellDark} opacity="0.35" />
        <rect x="32" y="28" width="2" height="2" fill={color.shell} opacity="0.30" />
        <rect x="28" y="30" width="2" height="2" fill={color.shell} opacity="0.25" />
        <rect x="22" y="30" width="2" height="2" fill={color.shellDark} opacity="0.30" />
        <rect x="16" y="28" width="2" height="2" fill={color.shellDark} opacity="0.35" />
        <rect x="12" y="24" width="2" height="2" fill={color.shellDark} opacity="0.40" />
        <rect x="10" y="20" width="2" height="2" fill={color.shellDark} opacity="0.40" />

        {/* Shell spiral groove — outermost whorl */}
        <path d="M26 18 Q18 10 26 5 Q36 2 42 11 Q46 18 38 26 Q30 32 22 26"
          stroke={color.shellDark} strokeWidth="1.0" fill="none" opacity="0.45" />
        {/* Middle whorl */}
        <path d="M26 18 Q22 13 26 9 Q32 7 36 13 Q38 18 34 22 Q30 25 26 22"
          stroke={color.shellDark} strokeWidth="0.8" fill="none" opacity="0.38" />
        {/* Inner whorl */}
        <path d="M26 18 Q24 15 26 13 Q29 12 31 15 Q32 18 30 20 Q28 21 26 20"
          stroke={color.shellDark} strokeWidth="0.6" fill="none" opacity="0.32" />
        {/* Growth ring arcs — fine detail between whorls */}
        <path d="M16 8 Q20 6 24 5" stroke={color.shellDark} strokeWidth="0.3" fill="none" opacity="0.20" />
        <path d="M12 14 Q16 10 20 8" stroke={color.shellDark} strokeWidth="0.3" fill="none" opacity="0.18" />
        <path d="M34 8 Q38 12 40 16" stroke={color.shellDark} strokeWidth="0.3" fill="none" opacity="0.18" />
        <path d="M14 22 Q16 26 20 28" stroke={color.shellDark} strokeWidth="0.3" fill="none" opacity="0.15" />
        <path d="M36 24 Q34 28 30 30" stroke={color.shellDark} strokeWidth="0.3" fill="none" opacity="0.15" />

        {/* Apex center with refined growth rings */}
        <circle cx="26" cy="18" r="3.0" fill={color.shellDark} opacity="0.45" />
        <circle cx="26" cy="18" r="2.0" fill={color.shell} opacity="0.35" />
        <circle cx="26" cy="18" r="1.0" fill={color.shellLight} opacity="0.45" />
        <circle cx="25.5" cy="17.5" r="0.4" fill="white" opacity="0.25" />

        {/* Shell rim — raised lip visible from below */}
        <ellipse cx="26" cy="18" rx="17" ry="15" fill="none" stroke={color.shellDark} strokeWidth="1.3" opacity="0.38" />
        {/* Outer rim highlight (light catching edge) */}
        <path d="M12 12 Q18 4 26 3 Q34 4 40 12" stroke="white" strokeWidth="0.7" fill="none" opacity="0.20" />
        {/* Lower rim subtle glow */}
        <path d="M12 24 Q18 32 26 33 Q34 32 40 24" stroke={color.shellLight} strokeWidth="0.4" fill="none" opacity="0.10" />

        {/* Nacre iridescence overlay — pearly shimmer across shell */}
        <ellipse cx="24" cy="16" rx="12" ry="10" fill={`url(#sn-${id})`} />

        {/* Shell surface pixel highlights (nacre shimmer) — refined placement */}
        <rect x="18" y="8" width="3" height="2" fill="white" opacity="0.20" />
        <rect x="14" y="12" width="2" height="3" fill="white" opacity="0.16" />
        <rect x="20" y="5" width="2" height="2" fill="white" opacity="0.22" />
        <rect x="30" y="8" width="2" height="2" fill={color.shellLight} opacity="0.22" />
        {/* Additional nacre sparkle points */}
        <circle cx="18" cy="10" r="0.5" fill="white" opacity="0.25" />
        <circle cx="32" cy="12" r="0.5" fill="white" opacity="0.20" />
        <circle cx="22" cy="22" r="0.4" fill="white" opacity="0.15" />
        <circle cx="34" cy="20" r="0.4" fill="white" opacity="0.12" />
        {/* Shell growth line details */}
        <rect x="16" y="16" width="1" height="1" fill={color.shellLight} opacity="0.18" />
        <rect x="34" y="14" width="1" height="1" fill={color.shellLight} opacity="0.16" />
        <rect x="20" y="24" width="1" height="1" fill={color.shellLight} opacity="0.14" />

        {/* === BODY/FOOT (belly pressed against glass) === */}
        <ellipse cx="40" cy="30" rx="26" ry="11" fill={`url(#sf-${id})`} />

        {/* Translucent body overlay — snails have semi-transparent flesh */}
        <ellipse cx="40" cy="29" rx="22" ry="8" fill={`url(#st-${id})`} />

        {/* Pedal wave muscle ripples — refined spacing */}
        <rect x="18" y="25" width="42" height="1" fill="white" opacity="0.10" />
        <rect x="16" y="28" width="46" height="1" fill="white" opacity="0.08" />
        <rect x="18" y="31" width="42" height="1" fill="white" opacity="0.10" />
        <rect x="16" y="34" width="46" height="1" fill="white" opacity="0.07" />
        {/* Pedal wave crests — staggered blocks for movement illusion */}
        <rect x="22" y="26" width="3" height="1" fill="white" opacity="0.13" />
        <rect x="32" y="26" width="3" height="1" fill="white" opacity="0.11" />
        <rect x="42" y="26" width="3" height="1" fill="white" opacity="0.09" />
        <rect x="52" y="26" width="3" height="1" fill="white" opacity="0.07" />
        <rect x="26" y="29" width="3" height="1" fill="white" opacity="0.10" />
        <rect x="36" y="29" width="3" height="1" fill="white" opacity="0.08" />
        <rect x="46" y="29" width="3" height="1" fill="white" opacity="0.06" />
        <rect x="20" y="32" width="3" height="1" fill="white" opacity="0.12" />
        <rect x="30" y="32" width="3" height="1" fill="white" opacity="0.10" />
        <rect x="40" y="32" width="3" height="1" fill="white" opacity="0.08" />
        <rect x="50" y="32" width="3" height="1" fill="white" opacity="0.06" />

        {/* Belly muscular midline — more organic curve */}
        <path d="M18 30 Q30 27.5 44 28.5 Q54 29.5 60 30" stroke={color.bodyDark} strokeWidth="0.4" opacity="0.12" />
        {/* Secondary lateral muscle lines */}
        <path d="M20 27 Q35 25.5 55 27" stroke={color.bodyDark} strokeWidth="0.25" opacity="0.08" />
        <path d="M20 33 Q35 34 55 33" stroke={color.bodyDark} strokeWidth="0.25" opacity="0.08" />
        {/* Foot sole rim */}
        <ellipse cx="40" cy="30" rx="26" ry="11" fill="none" stroke={color.bodyDark} strokeWidth="0.7" opacity="0.25" />

        {/* Mucus film on glass (subtle wet shine) */}
        <ellipse cx="38" cy="28" rx="18" ry="7" fill={`url(#sm-${id})`} />

        {/* === HEAD (extending forward — refined shape) === */}
        <ellipse cx="62" cy="30" rx="8" ry="7" fill={color.body} />
        {/* Head smooth gradient overlay */}
        <ellipse cx="61" cy="29" rx="5" ry="4" fill={color.bodyHighlight} opacity="0.12" />
        {/* Head detail — pixel texture for fleshy appearance */}
        <rect x="58" y="27" width="2" height="2" fill={color.bodyHighlight} opacity="0.18" />
        <rect x="62" y="26" width="2" height="2" fill={color.bodyHighlight} opacity="0.14" />
        <rect x="60" y="32" width="2" height="2" fill={color.bodyDark} opacity="0.12" />
        {/* Mouth area (radula — scraping organ, more defined) */}
        <ellipse cx="68" cy="31" rx="2.2" ry="1.6" fill={color.bodyDark} opacity="0.28" />
        <rect x="67" y="31" width="2" height="1" fill={color.bodyDark} opacity="0.18" />
        {/* Radula texture detail */}
        <path d="M67 31 L69 31" stroke={color.bodyDark} strokeWidth="0.3" opacity="0.15" />

        {/* === UPPER TENTACLES (ommatophores — eye stalks, refined) === */}
        {/* Left eye stalk — tapered */}
        <path d="M65 25 Q69 16 73 8" stroke={color.body} strokeWidth="2.0" strokeLinecap="round" fill="none" />
        <path d="M65 25 Q69 16 73 8" stroke={color.bodyHighlight} strokeWidth="0.6" strokeLinecap="round" fill="none" opacity="0.15" />
        {/* Right eye stalk — tapered */}
        <path d="M67 24 Q72 14 76 6" stroke={color.body} strokeWidth="2.0" strokeLinecap="round" fill="none" />
        <path d="M67 24 Q72 14 76 6" stroke={color.bodyHighlight} strokeWidth="0.6" strokeLinecap="round" fill="none" opacity="0.15" />
        {/* Eye stalk subtle segment ridges */}
        <rect x="68" y="16" width="1" height="1" fill={color.bodyHighlight} opacity="0.18" />
        <rect x="71" y="12" width="1" height="1" fill={color.bodyHighlight} opacity="0.15" />
        <rect x="73" y="8" width="1" height="1" fill={color.bodyHighlight} opacity="0.12" />

        {/* Eye bulbs — refined with deeper detail */}
        {/* Left eye — outer ring, iris layers, corneal highlight */}
        <circle cx="73" cy="8" r="3.2" fill="#1A1A2A" />
        <circle cx="73" cy="8" r="2.8" fill={`url(#se-${id})`} />
        <circle cx="73" cy="8" r="2.0" fill="#1A1A30" />
        <circle cx="73" cy="7.5" r="1.3" fill="#222238" />
        <circle cx="73.6" cy="7" r="0.9" fill="white" opacity="0.85" />
        <circle cx="72" cy="8.5" r="0.35" fill="white" opacity="0.4" />
        {/* Right eye */}
        <circle cx="76" cy="6" r="3.2" fill="#1A1A2A" />
        <circle cx="76" cy="6" r="2.8" fill={`url(#se-${id})`} />
        <circle cx="76" cy="6" r="2.0" fill="#1A1A30" />
        <circle cx="76" cy="5.5" r="1.3" fill="#222238" />
        <circle cx="76.6" cy="5" r="0.9" fill="white" opacity="0.85" />
        <circle cx="75" cy="6.5" r="0.35" fill="white" opacity="0.4" />

        {/* === LOWER TENTACLES (sensory feelers — refined taper) === */}
        <path d="M66 34 Q70 40 73 46" stroke={color.body} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M66 34 Q70 40 73 46" stroke={color.bodyHighlight} strokeWidth="0.4" strokeLinecap="round" fill="none" opacity="0.12" />
        <path d="M68 36 Q71 42 72 49" stroke={color.body} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M68 36 Q71 42 72 49" stroke={color.bodyHighlight} strokeWidth="0.4" strokeLinecap="round" fill="none" opacity="0.12" />
        {/* Feeler tip nubs — slightly larger */}
        <circle cx="73" cy="46" r="1.5" fill={color.body} />
        <circle cx="72" cy="49" r="1.5" fill={color.body} />
        <circle cx="73.3" cy="45.7" r="0.4" fill={color.bodyHighlight} opacity="0.2" />
        <circle cx="72.3" cy="48.7" r="0.4" fill={color.bodyHighlight} opacity="0.2" />

        {/* === MANTLE EDGE (where body meets shell — smoother transition) === */}
        <path d="M18 24 Q26 20 36 22 Q42 24 44 26" stroke={color.bodyDark} strokeWidth="0.5" fill="none" opacity="0.18" />
        {/* Mantle collar detail — subtle folds */}
        <path d="M22 23 Q28 21 34 22" stroke={color.bodyDark} strokeWidth="0.3" fill="none" opacity="0.10" />
        {/* Mantle breathing pore (pneumostome) — more defined */}
        <ellipse cx="42" cy="22" rx="1.8" ry="1.2" fill={color.bodyDark} opacity="0.22" />
        <ellipse cx="42" cy="22" rx="0.8" ry="0.5" fill={color.bodyDark} opacity="0.12" />

        {/* === GLASS INTERACTION — refined wet contact === */}
        <ellipse cx="38" cy="28" rx="16" ry="6" fill="white" opacity="0.04" />
        {/* Moisture ring around foot */}
        <ellipse cx="40" cy="30" rx="28" ry="12" fill="none" stroke="white" strokeWidth="0.3" opacity="0.05" />

        {/* === SLIME TRAIL (refined, more translucent) === */}
        <ellipse cx="8" cy="31" rx="6" ry="2" fill={color.body} opacity="0.10" />
        <ellipse cx="3" cy="31" rx="3.5" ry="1.3" fill={color.body} opacity="0.06" />
        <ellipse cx="-2" cy="31" rx="2.5" ry="1.0" fill={color.body} opacity="0.03" />
        <rect x="5" y="30" width="4" height="1" fill="white" opacity="0.04" />
        <rect x="1" y="30" width="2" height="1" fill="white" opacity="0.03" />
      </g>
    </svg>
  )
})
SnailSVG.displayName = 'SnailSVG'


// ─── Zamboni Cleaning Patterns ──────────────────────────────────────
// Each snail follows a distinct systematic route across the glass,
// like an ice resurfacer (Zamboni) cleaning an ice rink.
// The patterns ensure full glass coverage with visually distinct motion.
//
// Pattern types:
//   0: Horizontal L→R sweeps, moving down each pass (classic Zamboni)
//   1: Horizontal R→L sweeps, moving up each pass (reverse Zamboni)
//   2: Diagonal ↘ sweeps (top-left to bottom-right raster)
//   3: Vertical top→bottom sweeps, moving right each pass (community only)
//   4: Diagonal ↗ sweeps (bottom-left to top-right) (community only)
//   5: Spiral from outside edges inward (community only)

type ZamboniPattern = 'horiz-lr' | 'horiz-rl' | 'diag-down' | 'vert-tb' | 'diag-up' | 'spiral'

const PATTERN_ORDER: ZamboniPattern[] = [
  'horiz-lr', 'horiz-rl', 'diag-down', 'vert-tb', 'diag-up', 'spiral',
]

interface ZamboniState {
  x: number
  y: number
  pattern: ZamboniPattern
  // Waypoint navigation
  waypoints: { x: number; y: number }[]
  waypointIdx: number
  // Movement smoothing
  heading: number         // visual heading in radians
  speed: number           // base movement speed
  pedalPhase: number      // pedal wave phase for speed modulation
  pauseUntil: number      // rest stop timestamp
  grazingUntil: number    // slow grazing timestamp
  passCount: number       // how many full passes completed
}

// Generate waypoints for each Zamboni pattern
function generateWaypoints(
  pattern: ZamboniPattern,
  w: number,
  h: number,
  margin: number,
  topMargin: number,
): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = []
  const left = margin
  const right = w - margin
  const top = topMargin
  const bot = h * 0.93
  const rowH = (bot - top) / 8    // 8 rows for horizontal passes
  const colW = (right - left) / 8  // 8 columns for vertical passes

  switch (pattern) {
    case 'horiz-lr': {
      // Left-to-right, each row stepping downward
      for (let row = 0; row <= 8; row++) {
        const y = top + row * rowH
        if (row % 2 === 0) {
          pts.push({ x: left, y }, { x: right, y })
        } else {
          pts.push({ x: right, y }, { x: left, y })
        }
      }
      break
    }
    case 'horiz-rl': {
      // Right-to-left, each row stepping upward
      for (let row = 8; row >= 0; row--) {
        const y = top + row * rowH
        if (row % 2 === 0) {
          pts.push({ x: right, y }, { x: left, y })
        } else {
          pts.push({ x: left, y }, { x: right, y })
        }
      }
      break
    }
    case 'diag-down': {
      // Diagonal sweeps ↘ — zigzag from top-left corner
      const steps = 10
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        if (i % 2 === 0) {
          pts.push({ x: left + t * (right - left) * 0.3, y: top })
          pts.push({ x: right, y: top + t * (bot - top) * 0.7 + (bot - top) * 0.3 })
        } else {
          pts.push({ x: right - t * (right - left) * 0.3, y: bot })
          pts.push({ x: left, y: bot - t * (bot - top) * 0.7 - (bot - top) * 0.1 })
        }
      }
      break
    }
    case 'vert-tb': {
      // Top-to-bottom vertical passes, stepping right
      for (let col = 0; col <= 8; col++) {
        const x = left + col * colW
        if (col % 2 === 0) {
          pts.push({ x, y: top }, { x, y: bot })
        } else {
          pts.push({ x, y: bot }, { x, y: top })
        }
      }
      break
    }
    case 'diag-up': {
      // Diagonal sweeps ↗ — zigzag from bottom-left
      const steps2 = 10
      for (let i = 0; i <= steps2; i++) {
        const t = i / steps2
        if (i % 2 === 0) {
          pts.push({ x: left, y: bot - t * (bot - top) * 0.3 })
          pts.push({ x: left + t * (right - left) * 0.7 + (right - left) * 0.3, y: top })
        } else {
          pts.push({ x: right, y: top + t * (bot - top) * 0.3 })
          pts.push({ x: right - t * (right - left) * 0.7 - (right - left) * 0.1, y: bot })
        }
      }
      break
    }
    case 'spiral': {
      // Spiral inward from edges
      const layers = 4
      for (let layer = 0; layer < layers; layer++) {
        const inset = layer * ((right - left) / (layers * 2.2))
        const l = left + inset
        const r2 = right - inset
        const t2 = top + inset * 0.7
        const b2 = bot - inset * 0.5
        // Trace rectangle edges: top → right → bottom → left
        pts.push({ x: l, y: t2 })
        pts.push({ x: r2, y: t2 })
        pts.push({ x: r2, y: b2 })
        pts.push({ x: l, y: b2 })
      }
      // End at center
      pts.push({ x: (left + right) / 2, y: (top + bot) / 2 })
      break
    }
  }
  return pts
}


// ─── Snail Group Component ──────────────────────────────────────────
// Each snail follows a distinct Zamboni cleaning pattern.
// count=3 for personal tank, count=6 for community bowl.

export const SnailGroup = memo(({ count, containerWidth, containerHeight }: {
  count: number
  containerWidth: number
  containerHeight: number
}) => {
  const snailsRef = useRef<ZamboniState[]>([])
  const [positions, setPositions] = useState<{ x: number; y: number; heading: number }[]>([])

  // Initialize snails with their assigned Zamboni patterns
  useEffect(() => {
    if (containerWidth === 0 || containerHeight === 0) return

    const MARGIN = 14
    const TOP_MARGIN = containerHeight * 0.10

    // Stagger snails across distinct quadrants so they start spread out
    const quadrantX = [0.12, 0.88, 0.12, 0.88, 0.50, 0.50]
    const quadrantY = [0.22, 0.22, 0.72, 0.72, 0.22, 0.72]

    snailsRef.current = Array.from({ length: count }, (_, i) => {
      const pattern = PATTERN_ORDER[i % PATTERN_ORDER.length]
      const waypoints = generateWaypoints(pattern, containerWidth, containerHeight, MARGIN, TOP_MARGIN)

      // Place each snail in a different quadrant with slight randomness
      const qx = quadrantX[i % quadrantX.length] + (Math.random() - 0.5) * 0.12
      const qy = quadrantY[i % quadrantY.length] + (Math.random() - 0.5) * 0.08
      const startX = Math.max(MARGIN, Math.min(containerWidth - MARGIN,
        containerWidth * qx))
      const startY = Math.max(TOP_MARGIN, Math.min(containerHeight * 0.93,
        TOP_MARGIN + (containerHeight * 0.83 - TOP_MARGIN) * qy))

      // Find nearest waypoint to the staggered start position
      let nearestIdx = 0
      let nearestDist = Infinity
      waypoints.forEach((wp, idx) => {
        const d = (wp.x - startX) ** 2 + (wp.y - startY) ** 2
        if (d < nearestDist) { nearestDist = d; nearestIdx = idx }
      })

      return {
        x: startX,
        y: startY,
        pattern,
        waypoints,
        waypointIdx: nearestIdx,
        heading: Math.random() * Math.PI * 2,
        speed: 0.25 + (i % 3) * 0.04, // slight speed variation
        pedalPhase: i * 1.3,
        pauseUntil: 0,
        grazingUntil: 0,
        passCount: 0,
      }
    })

    setPositions(snailsRef.current.map(s => ({ x: s.x, y: s.y, heading: s.heading })))
  }, [count, containerWidth, containerHeight])

  // ─── Zamboni movement loop (10fps, CSS smooths visual) ─────
  useEffect(() => {
    if (containerWidth === 0 || containerHeight === 0) return
    if (snailsRef.current.length === 0) return

    const MARGIN = 14
    const TOP_MARGIN = containerHeight * 0.10

    const interval = setInterval(() => {
      const now = Date.now()

      snailsRef.current.forEach((snail) => {
        // ── Rest/grazing pause ──
        if (now < snail.pauseUntil) return
        const isGrazing = now < snail.grazingUntil
        const grazeFactor = isGrazing ? 0.25 : 1.0

        // ── Pedal wave speed modulation ──
        snail.pedalPhase += 0.06
        const pedalWave = 0.7 + 0.3 * Math.sin(snail.pedalPhase)
        const currentSpeed = snail.speed * pedalWave * grazeFactor

        // ── Navigate toward current waypoint ──
        const target = snail.waypoints[snail.waypointIdx]
        const dx = target.x - snail.x
        const dy = target.y - snail.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 3) {
          // Reached waypoint — advance to next
          snail.waypointIdx = (snail.waypointIdx + 1) % snail.waypoints.length

          // When completing a full circuit, regenerate waypoints (slight variation)
          if (snail.waypointIdx === 0) {
            snail.passCount++
            snail.waypoints = generateWaypoints(
              snail.pattern, containerWidth, containerHeight, MARGIN, TOP_MARGIN,
            )
          }

          // Random chance to pause at waypoint (rest stop or grazing)
          const roll = Math.random()
          if (roll < 0.08) {
            snail.grazingUntil = now + 3000 + Math.random() * 6000
          } else if (roll < 0.18) {
            snail.pauseUntil = now + 1500 + Math.random() * 3000
            return
          }
        }

        // ── Smooth heading toward target ──
        const targetHeading = Math.atan2(dy, dx)
        let headingDiff = targetHeading - snail.heading
        // Normalize to [-π, π]
        while (headingDiff > Math.PI) headingDiff -= Math.PI * 2
        while (headingDiff < -Math.PI) headingDiff += Math.PI * 2
        // Smooth turn (snails can't snap-turn)
        snail.heading += headingDiff * 0.08

        // ── Move forward ──
        const vx = Math.cos(snail.heading) * currentSpeed
        const vy = Math.sin(snail.heading) * currentSpeed
        snail.x += vx
        snail.y += vy

        // ── Clamp to tank bounds ──
        snail.x = Math.max(MARGIN, Math.min(containerWidth - MARGIN, snail.x))
        snail.y = Math.max(TOP_MARGIN, Math.min(containerHeight * 0.93, snail.y))

        // Normalize heading
        snail.heading = ((snail.heading % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
      })

      setPositions(snailsRef.current.map(s => ({
        x: s.x,
        y: s.y,
        heading: s.heading,
      })))
    }, 100)

    return () => clearInterval(interval)
  }, [containerWidth, containerHeight, count])

  // ─── Render ───────────────────────────────────────────────
  if (containerWidth === 0 || containerHeight === 0) return null

  return (
    <>
      {positions.map((pos, i) => {
        const facingRight = Math.cos(pos.heading) > 0
        // Tilt the snail along its heading for organic feel
        const tiltDeg = Math.sin(pos.heading) * 15

        return (
          <div
            key={`snail-${i}`}
            className="absolute z-[23] pointer-events-none"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: `translate(-50%, -50%) rotate(${tiltDeg}deg)`,
              transition: 'left 0.15s linear, top 0.15s linear, transform 0.15s linear',
              opacity: 1,
              filter: 'drop-shadow(0 0 3px rgba(100,200,255,0.12))',
            }}
          >
            <SnailSVG
              id={`snail-${i}`}
              color={SNAIL_COLOR_LIST[i % SNAIL_COLOR_LIST.length]}
              facingRight={facingRight}
              size={28}
            />
            {/* Slime trail dot */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: '8px',
                height: '5px',
                background: `radial-gradient(ellipse, ${SNAIL_COLOR_LIST[i % SNAIL_COLOR_LIST.length].body}30 0%, transparent 70%)`,
                left: facingRight ? '-2%' : '82%',
                top: '52%',
              }}
            />
          </div>
        )
      })}
    </>
  )
})
SnailGroup.displayName = 'SnailGroup'

// Backward-compatible export (old name)
export const SnailTrio = SnailGroup
