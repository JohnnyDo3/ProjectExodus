'use client'

import { memo, useEffect, useState, useRef, useCallback, useMemo } from 'react'

// ─── Baby Crab (Bottom Dweller) ─────────────────────────────────────
// Tiny crabs that scuttle sideways along the bottom, hiding near structures

const BabyCrabSVG = memo(({ id, facingRight, size = 32 }: { id: string; facingRight: boolean; size?: number }) => {
  const scaleX = facingRight ? 1 : -1
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 80 60" fill="none">
      <defs>
        {/* Carapace gradient — warm reddish-brown shell */}
        <radialGradient id={`cb-${id}`} cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#D4654A" />
          <stop offset="40%" stopColor="#B8432E" />
          <stop offset="80%" stopColor="#8B2E1A" />
          <stop offset="100%" stopColor="#6B1E10" />
        </radialGradient>
        {/* Shell highlight — wet sheen */}
        <radialGradient id={`ch-${id}`} cx="35%" cy="30%" r="40%">
          <stop offset="0%" stopColor="white" stopOpacity="0.25" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        {/* Claw gradient */}
        <linearGradient id={`cc-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4654A" />
          <stop offset="100%" stopColor="#A03820" />
        </linearGradient>
        {/* Leg gradient */}
        <linearGradient id={`cl-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C4553A" />
          <stop offset="100%" stopColor="#984030" />
        </linearGradient>
      </defs>
      <g transform={`translate(40, 30) scale(${scaleX}, 1) translate(-40, -30)`}>

        {/* === WALKING LEGS (4 pairs, behind body) === */}
        {/* Back legs — pair 4 (rearmost) */}
        <path d="M22 32 Q16 40 10 46 Q8 48 6 46" stroke={`url(#cl-${id})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M58 32 Q64 40 70 46 Q72 48 74 46" stroke={`url(#cl-${id})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Pair 3 */}
        <path d="M26 34 Q20 42 14 50 Q12 52 10 50" stroke={`url(#cl-${id})`} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M54 34 Q60 42 66 50 Q68 52 70 50" stroke={`url(#cl-${id})`} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* Pair 2 */}
        <path d="M30 33 Q24 44 18 52 Q16 54 14 52" stroke={`url(#cl-${id})`} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M50 33 Q56 44 62 52 Q64 54 66 52" stroke={`url(#cl-${id})`} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Front legs — pair 1 */}
        <path d="M34 30 Q28 42 22 50 Q20 52 18 50" stroke={`url(#cl-${id})`} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M46 30 Q52 42 58 50 Q60 52 62 50" stroke={`url(#cl-${id})`} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Leg joint dots */}
        <circle cx="16" cy="42" r="0.8" fill="#A04030" opacity="0.4" />
        <circle cx="64" cy="42" r="0.8" fill="#A04030" opacity="0.4" />
        <circle cx="20" cy="44" r="0.8" fill="#A04030" opacity="0.4" />
        <circle cx="60" cy="44" r="0.8" fill="#A04030" opacity="0.4" />

        {/* === CLAWS (chelipeds) — small, cute baby claws === */}
        {/* Left claw arm */}
        <path d="M28 24 Q20 18 14 14 Q10 12 8 14" stroke={`url(#cc-${id})`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Left claw pincer */}
        <path d="M10 11 Q6 8 4 10 Q3 12 6 14 Q8 15 10 14" fill={`url(#cc-${id})`} />
        <path d="M10 14 Q8 17 6 18 Q4 17 5 15" fill="#C4553A" />
        {/* Right claw arm */}
        <path d="M52 24 Q60 18 66 14 Q70 12 72 14" stroke={`url(#cc-${id})`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Right claw pincer */}
        <path d="M70 11 Q74 8 76 10 Q77 12 74 14 Q72 15 70 14" fill={`url(#cc-${id})`} />
        <path d="M70 14 Q72 17 74 18 Q76 17 75 15" fill="#C4553A" />
        {/* Claw highlights */}
        <path d="M7 10 Q8 9 9 11" stroke="white" strokeWidth="0.4" fill="none" opacity="0.25" />
        <path d="M73 10 Q74 9 75 11" stroke="white" strokeWidth="0.4" fill="none" opacity="0.25" />

        {/* === CARAPACE (main shell body — wide oval) === */}
        <ellipse cx="40" cy="26" rx="18" ry="12" fill={`url(#cb-${id})`} />

        {/* Shell texture — granular bumps */}
        <circle cx="32" cy="22" r="1.2" fill="#9B2A18" opacity="0.3" />
        <circle cx="36" cy="20" r="1" fill="#9B2A18" opacity="0.25" />
        <circle cx="44" cy="20" r="1" fill="#9B2A18" opacity="0.25" />
        <circle cx="48" cy="22" r="1.2" fill="#9B2A18" opacity="0.3" />
        <circle cx="40" cy="18" r="0.8" fill="#9B2A18" opacity="0.2" />
        <circle cx="34" cy="28" r="0.9" fill="#9B2A18" opacity="0.2" />
        <circle cx="46" cy="28" r="0.9" fill="#9B2A18" opacity="0.2" />

        {/* Carapace segments — gastric grooves */}
        <path d="M30 18 Q34 22 40 24" stroke="#7B1E10" strokeWidth="0.6" fill="none" opacity="0.25" />
        <path d="M50 18 Q46 22 40 24" stroke="#7B1E10" strokeWidth="0.6" fill="none" opacity="0.25" />
        <path d="M40 16 Q40 20 40 24" stroke="#7B1E10" strokeWidth="0.4" fill="none" opacity="0.2" />
        {/* Branchial groove (side lines) */}
        <path d="M26 24 Q30 28 36 30" stroke="#7B1E10" strokeWidth="0.5" fill="none" opacity="0.2" />
        <path d="M54 24 Q50 28 44 30" stroke="#7B1E10" strokeWidth="0.5" fill="none" opacity="0.2" />

        {/* Shell wet highlight */}
        <ellipse cx="36" cy="22" rx="8" ry="5" fill={`url(#ch-${id})`} />

        {/* Carapace rim */}
        <ellipse cx="40" cy="26" rx="18" ry="12" fill="none" stroke="#6B1E10" strokeWidth="0.8" opacity="0.3" />

        {/* === ROSTRUM (front point of shell between eyes) === */}
        <path d="M36 15 Q40 10 44 15" fill="#A03820" />
        <path d="M37 15 Q40 11 43 15" stroke="#7B1E10" strokeWidth="0.4" fill="none" opacity="0.3" />

        {/* === EYES — on short stalks, beady and dark === */}
        {/* Left eye stalk */}
        <path d="M34 16 Q30 10 28 8" stroke="#B8432E" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="28" cy="8" r="2.5" fill="#1A1A28" />
        <circle cx="28" cy="8" r="1.8" fill="#0E0E18" />
        <circle cx="28.8" cy="7.2" r="0.8" fill="white" opacity="0.7" />
        <circle cx="27.5" cy="8.8" r="0.3" fill="white" opacity="0.3" />
        {/* Right eye stalk */}
        <path d="M46 16 Q50 10 52 8" stroke="#B8432E" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="52" cy="8" r="2.5" fill="#1A1A28" />
        <circle cx="52" cy="8" r="1.8" fill="#0E0E18" />
        <circle cx="52.8" cy="7.2" r="0.8" fill="white" opacity="0.7" />
        <circle cx="51.5" cy="8.8" r="0.3" fill="white" opacity="0.3" />

        {/* === MOUTH PARTS — small mandibles/maxillipeds === */}
        <path d="M38 32 Q36 34 35 36" stroke="#984030" strokeWidth="0.8" fill="none" opacity="0.4" />
        <path d="M42 32 Q44 34 45 36" stroke="#984030" strokeWidth="0.8" fill="none" opacity="0.4" />
        <ellipse cx="40" cy="33" rx="3" ry="1.5" fill="#8B2E1A" opacity="0.3" />

        {/* === SURFACE DETAILS === */}
        {/* Dorsal spine bumps */}
        <circle cx="40" cy="16" r="0.6" fill="#D4654A" opacity="0.4" />
        <circle cx="36" cy="17" r="0.5" fill="#D4654A" opacity="0.35" />
        <circle cx="44" cy="17" r="0.5" fill="#D4654A" opacity="0.35" />
        {/* Wet sheen edges */}
        <path d="M28 20 Q34 16 40 15 Q46 16 52 20" stroke="white" strokeWidth="0.5" fill="none" opacity="0.12" />
      </g>
    </svg>
  )
})
BabyCrabSVG.displayName = 'BabyCrabSVG'

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
  // Phase timers
  phaseTicks: number
  // Scuttle wobble
  wobblePhase: number
  // Forage animation
  foragePhase: number
}

function createCrabMotion(startX: number, startY: number): CrabMotion {
  return {
    x: startX, y: startY,
    phase: 'scuttle',
    targetX: startX + (Math.random() - 0.5) * 200,
    targetY: startY,
    speed: 0.6 + Math.random() * 0.4,
    facingRight: Math.random() > 0.5,
    phaseTicks: 30 + Math.floor(Math.random() * 40),
    wobblePhase: Math.random() * Math.PI * 2,
    foragePhase: 0,
  }
}

function tickCrab(c: CrabMotion, cw: number, ch: number): void {
  const bottomBound = ch - 12
  const bottomZone = ch * 0.7  // crabs stay in bottom 30%

  switch (c.phase) {
    case 'scuttle': {
      // Sideways crab walk — primary X movement, slight Y wobble
      c.wobblePhase += 0.2
      const dx = c.targetX - c.x
      const moveDir = dx > 0 ? 1 : -1
      c.facingRight = moveDir > 0

      // Crabs move mostly sideways with a characteristic bobbing gait
      const scuttleSpeed = c.speed * (0.8 + Math.sin(c.wobblePhase * 2) * 0.2)
      c.x += moveDir * scuttleSpeed
      c.y += Math.sin(c.wobblePhase) * 0.3  // slight vertical bob

      c.phaseTicks--
      if (Math.abs(dx) < 5 || c.phaseTicks <= 0) {
        // Reached target or timed out — decide next action
        const roll = Math.random()
        if (roll < 0.35) {
          c.phase = 'pause'
          c.phaseTicks = 15 + Math.floor(Math.random() * 30) // 1.5–4.5 seconds
        } else if (roll < 0.65) {
          c.phase = 'forage'
          c.phaseTicks = 30 + Math.floor(Math.random() * 50) // 3–8 seconds
          c.foragePhase = 0
        } else if (roll < 0.8) {
          // Pick new scuttle target
          c.targetX = Math.max(15, Math.min(cw - 40, c.x + (Math.random() - 0.5) * 250))
          c.targetY = Math.max(bottomZone, Math.min(bottomBound, c.y + (Math.random() - 0.5) * 30))
          c.phaseTicks = 20 + Math.floor(Math.random() * 40)
        } else {
          c.phase = 'hide'
          c.phaseTicks = 40 + Math.floor(Math.random() * 80) // 4–12 seconds
        }
      }
      break
    }

    case 'pause': {
      // Sitting still — slight antenna twitch via tiny position jitter
      c.wobblePhase += 0.1
      c.x += Math.sin(c.wobblePhase * 3) * 0.05
      c.phaseTicks--
      if (c.phaseTicks <= 0) {
        // After pause, either scuttle or dart
        if (Math.random() < 0.15) {
          c.phase = 'dart'
          c.targetX = Math.max(15, Math.min(cw - 40, c.x + (Math.random() > 0.5 ? 1 : -1) * (80 + Math.random() * 120)))
          c.phaseTicks = 8 + Math.floor(Math.random() * 6)
        } else {
          c.phase = 'scuttle'
          c.targetX = Math.max(15, Math.min(cw - 40, c.x + (Math.random() - 0.5) * 200))
          c.phaseTicks = 20 + Math.floor(Math.random() * 40)
        }
      }
      break
    }

    case 'forage': {
      // Picking at substrate — small forward/back movements with claw action
      c.foragePhase += 0.18
      c.x += Math.sin(c.foragePhase) * 0.3
      c.y += Math.sin(c.foragePhase * 0.6) * 0.15

      c.phaseTicks--
      if (c.phaseTicks <= 0) {
        c.phase = 'scuttle'
        c.targetX = Math.max(15, Math.min(cw - 40, c.x + (Math.random() - 0.5) * 180))
        c.phaseTicks = 25 + Math.floor(Math.random() * 35)
      }
      break
    }

    case 'dart': {
      // Quick sideways dash — startled crab behavior
      const dx = c.targetX - c.x
      const moveDir = dx > 0 ? 1 : -1
      c.facingRight = moveDir > 0
      c.x += moveDir * c.speed * 3.5  // much faster than scuttle

      c.phaseTicks--
      if (Math.abs(dx) < 8 || c.phaseTicks <= 0) {
        c.phase = 'pause'
        c.phaseTicks = 10 + Math.floor(Math.random() * 20)
      }
      break
    }

    case 'hide': {
      // Tucked in, barely moving — just tiny shifts
      c.wobblePhase += 0.05
      c.x += Math.sin(c.wobblePhase) * 0.02

      c.phaseTicks--
      if (c.phaseTicks <= 0) {
        c.phase = 'scuttle'
        c.targetX = Math.max(15, Math.min(cw - 40, c.x + (Math.random() - 0.5) * 200))
        c.phaseTicks = 20 + Math.floor(Math.random() * 40)
      }
      break
    }
  }

  // Clamp to tank bounds — crabs stay on the bottom
  c.x = Math.max(10, Math.min(cw - 40, c.x))
  c.y = Math.max(bottomZone, Math.min(bottomBound, c.y))
}

// Crab count: 3 for personal tank (contained), 4 for community
const CRAB_SIZES = [26, 22, 28, 24]

export const CrabGroup = memo(({ containerWidth, containerHeight, contained = false }: {
  containerWidth: number
  containerHeight: number
  contained?: boolean
}) => {
  const count = contained ? 3 : 4
  const crabsRef = useRef<CrabMotion[]>([])
  const [positions, setPositions] = useState<{ x: number; y: number; facingRight: boolean }[]>([])

  // Initialize crabs spread across the bottom
  useEffect(() => {
    if (containerWidth === 0 || containerHeight === 0) return

    crabsRef.current = Array.from({ length: count }, (_, i) => {
      const spreadX = (i + 0.5) / count
      const startX = containerWidth * (0.1 + spreadX * 0.8)
      const startY = containerHeight * (0.78 + Math.random() * 0.15)
      return createCrabMotion(startX, startY)
    })

    setPositions(crabsRef.current.map(c => ({ x: c.x, y: c.y, facingRight: c.facingRight })))
  }, [containerWidth, containerHeight, count])

  // Movement loop — 10 fps, CSS transitions smooth the visual
  useEffect(() => {
    if (containerWidth === 0 || containerHeight === 0) return
    if (crabsRef.current.length === 0) return

    const interval = setInterval(() => {
      crabsRef.current.forEach(crab => {
        tickCrab(crab, containerWidth, containerHeight)
      })
      setPositions(crabsRef.current.map(c => ({
        x: c.x, y: c.y, facingRight: c.facingRight,
      })))
    }, 100)

    return () => clearInterval(interval)
  }, [containerWidth, containerHeight])

  if (containerWidth === 0 || containerHeight === 0) return null

  return (
    <div className="absolute inset-0 z-[22] pointer-events-none">
      {positions.map((pos, i) => (
        <div
          key={`crab-${i}`}
          className="absolute"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transition: 'left 0.15s linear, top 0.15s linear',
          }}
        >
          <BabyCrabSVG id={`crab-${i}`} facingRight={pos.facingRight} size={CRAB_SIZES[i % CRAB_SIZES.length]} />
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

// 6 color variants — enhanced with more depth for pixel detail
const SNAIL_COLOR_LIST: SnailColor[] = [
  { shell: '#E8789A', shellLight: '#F5A0B8', shellDark: '#C45678', body: '#F0C8D4', bodyDark: '#D4A0B0', bodyHighlight: '#FDE8EF' },  // pink
  { shell: '#5B8EC9', shellLight: '#85B0E0', shellDark: '#3A6CA0', body: '#B8D4F0', bodyDark: '#8AAED0', bodyHighlight: '#D8ECFF' },  // blue
  { shell: '#D4A43A', shellLight: '#E8C468', shellDark: '#B8862D', body: '#F0DCA8', bodyDark: '#D4C080', bodyHighlight: '#FFF0CC' },  // gold
  { shell: '#9B6BB5', shellLight: '#BB92D0', shellDark: '#7A4E96', body: '#D8C4E8', bodyDark: '#B8A0CC', bodyHighlight: '#F0E4FF' },  // lavender
  { shell: '#5BAF6E', shellLight: '#82CC92', shellDark: '#3E8A4F', body: '#B8E0C0', bodyDark: '#90C4A0', bodyHighlight: '#D8F4E0' },  // jade
  { shell: '#E07850', shellLight: '#F0A080', shellDark: '#C05830', body: '#F0D0B8', bodyDark: '#D4B098', bodyHighlight: '#FFF0E4' },  // coral
]

// ─── Ultra-Detailed Belly-Facing Snail SVG ──────────────────────────
// Minecraft pixel-block technique: every element built from small rect/circle
// "pixels" for maximum fidelity. Viewed from below through glass.
// Shell on back, belly/foot pressed against glass, antlers from head.
// Default orientation: head points RIGHT.

const SnailSVG = memo(({ id, color, facingRight = true, size = 22 }: {
  id: string
  color: SnailColor
  facingRight: boolean
  size?: number
}) => {
  const scaleX = facingRight ? 1 : -1
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 80 56" fill="none">
      <defs>
        <radialGradient id={`ss-${id}`} cx="0.38" cy="0.32" r="0.58">
          <stop offset="0%" stopColor={color.shellLight} />
          <stop offset="40%" stopColor={color.shell} />
          <stop offset="85%" stopColor={color.shellDark} />
          <stop offset="100%" stopColor={color.shellDark} stopOpacity="0.8" />
        </radialGradient>
        <radialGradient id={`sf-${id}`} cx="0.45" cy="0.4" r="0.65">
          <stop offset="0%" stopColor={color.bodyHighlight} />
          <stop offset="50%" stopColor={color.body} />
          <stop offset="100%" stopColor={color.bodyDark} />
        </radialGradient>
        <radialGradient id={`se-${id}`} cx="0.35" cy="0.35" r="0.5">
          <stop offset="0%" stopColor="#2A2A3E" />
          <stop offset="100%" stopColor="#0E0E1A" />
        </radialGradient>
        {/* Mucus/slime shine */}
        <linearGradient id={`sm-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.15" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g transform={`translate(40, 28) scale(${scaleX}, 1) translate(-40, -28)`}>

        {/* === SHELL (back layer — built pixel-by-pixel for Minecraft detail) === */}
        {/* Shell base — concentric pixel rings for spiral effect */}
        <ellipse cx="26" cy="18" rx="17" ry="15" fill={`url(#ss-${id})`} />

        {/* Shell pixel-block texture — outer ring */}
        <rect x="10" y="14" width="2" height="2" fill={color.shellDark} opacity="0.45" />
        <rect x="12" y="10" width="2" height="2" fill={color.shellDark} opacity="0.4" />
        <rect x="16" y="6" width="2" height="2" fill={color.shell} opacity="0.5" />
        <rect x="20" y="4" width="2" height="2" fill={color.shellLight} opacity="0.55" />
        <rect x="24" y="3" width="2" height="2" fill={color.shellLight} opacity="0.6" />
        <rect x="28" y="4" width="2" height="2" fill={color.shell} opacity="0.5" />
        <rect x="32" y="6" width="2" height="2" fill={color.shell} opacity="0.45" />
        <rect x="36" y="10" width="2" height="2" fill={color.shellDark} opacity="0.4" />
        <rect x="38" y="14" width="2" height="2" fill={color.shellDark} opacity="0.35" />
        <rect x="40" y="18" width="2" height="2" fill={color.shellDark} opacity="0.3" />
        <rect x="38" y="22" width="2" height="2" fill={color.shellDark} opacity="0.35" />
        <rect x="36" y="26" width="2" height="2" fill={color.shellDark} opacity="0.4" />
        <rect x="32" y="28" width="2" height="2" fill={color.shell} opacity="0.35" />
        <rect x="28" y="30" width="2" height="2" fill={color.shell} opacity="0.3" />
        <rect x="22" y="30" width="2" height="2" fill={color.shellDark} opacity="0.35" />
        <rect x="16" y="28" width="2" height="2" fill={color.shellDark} opacity="0.4" />
        <rect x="12" y="24" width="2" height="2" fill={color.shellDark} opacity="0.45" />
        <rect x="10" y="20" width="2" height="2" fill={color.shellDark} opacity="0.45" />

        {/* Shell spiral groove — outermost whorl (pixel path) */}
        <path d="M26 18 Q18 10 26 5 Q36 2 42 11 Q46 18 38 26 Q30 32 22 26"
          stroke={color.shellDark} strokeWidth="1.2" fill="none" opacity="0.5" />
        {/* Middle whorl */}
        <path d="M26 18 Q22 13 26 9 Q32 7 36 13 Q38 18 34 22 Q30 25 26 22"
          stroke={color.shellDark} strokeWidth="0.9" fill="none" opacity="0.4" />
        {/* Inner whorl */}
        <path d="M26 18 Q24 15 26 13 Q29 12 31 15 Q32 18 30 20 Q28 21 26 20"
          stroke={color.shellDark} strokeWidth="0.7" fill="none" opacity="0.35" />
        {/* Apex center with growth rings */}
        <circle cx="26" cy="18" r="2.8" fill={color.shellDark} opacity="0.5" />
        <circle cx="26" cy="18" r="1.8" fill={color.shell} opacity="0.4" />
        <circle cx="26" cy="18" r="0.8" fill={color.shellLight} opacity="0.5" />

        {/* Shell rim — raised lip visible from below */}
        <ellipse cx="26" cy="18" rx="17" ry="15" fill="none" stroke={color.shellDark} strokeWidth="1.5" opacity="0.4" />
        {/* Outer rim highlight (light catching edge) */}
        <path d="M12 12 Q18 4 26 3 Q34 4 40 12" stroke="white" strokeWidth="0.6" fill="none" opacity="0.18" />

        {/* Shell surface pixel highlights (nacre shimmer) */}
        <rect x="18" y="8" width="3" height="2" fill="white" opacity="0.18" />
        <rect x="14" y="12" width="2" height="3" fill="white" opacity="0.15" />
        <rect x="20" y="6" width="2" height="2" fill="white" opacity="0.2" />
        <rect x="30" y="8" width="2" height="2" fill={color.shellLight} opacity="0.25" />
        {/* Shell growth line details */}
        <rect x="16" y="16" width="1" height="1" fill={color.shellLight} opacity="0.2" />
        <rect x="34" y="14" width="1" height="1" fill={color.shellLight} opacity="0.18" />
        <rect x="20" y="24" width="1" height="1" fill={color.shellLight} opacity="0.15" />

        {/* === BODY/FOOT (belly pressed against glass — closest to viewer) === */}
        <ellipse cx="40" cy="30" rx="26" ry="11" fill={`url(#sf-${id})`} />

        {/* Pedal wave muscle ripples — pixel-block textured */}
        <rect x="18" y="25" width="42" height="1" fill="white" opacity="0.12" />
        <rect x="16" y="28" width="46" height="1" fill="white" opacity="0.10" />
        <rect x="18" y="31" width="42" height="1" fill="white" opacity="0.12" />
        <rect x="16" y="34" width="46" height="1" fill="white" opacity="0.08" />
        {/* Pedal wave crests — animated-looking texture blocks */}
        <rect x="22" y="26" width="3" height="1" fill="white" opacity="0.15" />
        <rect x="32" y="26" width="3" height="1" fill="white" opacity="0.13" />
        <rect x="42" y="26" width="3" height="1" fill="white" opacity="0.11" />
        <rect x="52" y="26" width="3" height="1" fill="white" opacity="0.09" />
        <rect x="26" y="29" width="3" height="1" fill="white" opacity="0.12" />
        <rect x="36" y="29" width="3" height="1" fill="white" opacity="0.10" />
        <rect x="46" y="29" width="3" height="1" fill="white" opacity="0.08" />
        <rect x="20" y="32" width="3" height="1" fill="white" opacity="0.14" />
        <rect x="30" y="32" width="3" height="1" fill="white" opacity="0.12" />
        <rect x="40" y="32" width="3" height="1" fill="white" opacity="0.10" />
        <rect x="50" y="32" width="3" height="1" fill="white" opacity="0.08" />

        {/* Belly muscular midline */}
        <path d="M18 30 Q40 28 60 30" stroke={color.bodyDark} strokeWidth="0.4" opacity="0.15" />
        {/* Foot sole rim */}
        <ellipse cx="40" cy="30" rx="26" ry="11" fill="none" stroke={color.bodyDark} strokeWidth="0.8" opacity="0.3" />

        {/* Mucus film on glass (subtle wet shine) */}
        <ellipse cx="38" cy="28" rx="18" ry="7" fill={`url(#sm-${id})`} />

        {/* === HEAD (extending forward) === */}
        <ellipse cx="62" cy="30" rx="8" ry="7" fill={color.body} />
        {/* Head detail — pixel texture for fleshy appearance */}
        <rect x="58" y="27" width="2" height="2" fill={color.bodyHighlight} opacity="0.2" />
        <rect x="62" y="26" width="2" height="2" fill={color.bodyHighlight} opacity="0.15" />
        <rect x="60" y="32" width="2" height="2" fill={color.bodyDark} opacity="0.15" />
        {/* Mouth area (radula — scraping organ) */}
        <ellipse cx="68" cy="31" rx="2" ry="1.5" fill={color.bodyDark} opacity="0.3" />
        <rect x="67" y="31" width="2" height="1" fill={color.bodyDark} opacity="0.2" />

        {/* === UPPER TENTACLES (ommatophores — eye stalks) === */}
        {/* Left eye stalk */}
        <path d="M65 25 Q69 16 73 8" stroke={color.body} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Right eye stalk */}
        <path d="M67 24 Q72 14 76 6" stroke={color.body} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Eye stalk pixel detail (segmented look) */}
        <rect x="68" y="16" width="1" height="1" fill={color.bodyHighlight} opacity="0.2" />
        <rect x="71" y="12" width="1" height="1" fill={color.bodyHighlight} opacity="0.18" />
        <rect x="73" y="8" width="1" height="1" fill={color.bodyHighlight} opacity="0.15" />

        {/* Eye bulbs — detailed with cornea, iris, pupil */}
        {/* Left eye */}
        <circle cx="73" cy="8" r="3" fill={`url(#se-${id})`} />
        <circle cx="73" cy="8" r="2.2" fill="#1E1E32" />
        <circle cx="73" cy="7.5" r="1.4" fill="#2A2A40" />
        <circle cx="73.5" cy="7" r="0.8" fill="white" opacity="0.85" />
        <circle cx="72" cy="8.5" r="0.4" fill="white" opacity="0.4" />
        {/* Right eye */}
        <circle cx="76" cy="6" r="3" fill={`url(#se-${id})`} />
        <circle cx="76" cy="6" r="2.2" fill="#1E1E32" />
        <circle cx="76" cy="5.5" r="1.4" fill="#2A2A40" />
        <circle cx="76.5" cy="5" r="0.8" fill="white" opacity="0.85" />
        <circle cx="75" cy="6.5" r="0.4" fill="white" opacity="0.4" />

        {/* === LOWER TENTACLES (sensory feelers — shorter) === */}
        <path d="M66 34 Q70 40 73 46" stroke={color.body} strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M68 36 Q71 42 72 49" stroke={color.body} strokeWidth="1.4" strokeLinecap="round" fill="none" />
        {/* Feeler tip nubs */}
        <circle cx="73" cy="46" r="1.4" fill={color.body} />
        <circle cx="72" cy="49" r="1.4" fill={color.body} />
        {/* Feeler pixel detail */}
        <rect x="69" y="40" width="1" height="1" fill={color.bodyHighlight} opacity="0.15" />
        <rect x="71" y="44" width="1" height="1" fill={color.bodyHighlight} opacity="0.12" />

        {/* === MANTLE EDGE (where body meets shell) === */}
        <path d="M18 24 Q26 20 36 22 Q42 24 44 26" stroke={color.bodyDark} strokeWidth="0.6" fill="none" opacity="0.2" />
        {/* Mantle breathing pore (pneumostome) */}
        <ellipse cx="42" cy="22" rx="1.5" ry="1" fill={color.bodyDark} opacity="0.25" />

        {/* === GLASS INTERACTION — wet contact patch === */}
        <ellipse cx="38" cy="28" rx="16" ry="6" fill="white" opacity="0.05" />
        {/* Moisture ring around foot */}
        <ellipse cx="40" cy="30" rx="28" ry="12" fill="none" stroke="white" strokeWidth="0.3" opacity="0.06" />

        {/* === SLIME TRAIL behind (more detailed) === */}
        <ellipse cx="8" cy="31" rx="6" ry="2" fill={color.body} opacity="0.12" />
        <ellipse cx="3" cy="31" rx="3.5" ry="1.3" fill={color.body} opacity="0.07" />
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
              size={24}
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
