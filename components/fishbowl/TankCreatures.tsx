'use client'

import { memo, useEffect, useState, useRef, useCallback } from 'react'

// ─── Clown Pleco (Bottom Feeder) ────────────────────────────────────
// Two plecos that stay near the bottom, always near each other (mates for life)

const ClownPlecoSVG = memo(({ id, facingRight, size = 40 }: { id: string; facingRight: boolean; size?: number }) => {
  const scaleX = facingRight ? -1 : 1
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" fill="none">
      <defs>
        <radialGradient id={`pleco-body-${id}`} cx="0.4" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#5C4A3A" />
          <stop offset="100%" stopColor="#2E1F14" />
        </radialGradient>
        <linearGradient id={`pleco-stripe-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D4A54A" />
          <stop offset="100%" stopColor="#B8862D" />
        </linearGradient>
      </defs>
      <g transform={`translate(40, 20) scale(${scaleX}, 1) translate(-40, -20)`}>
        {/* Body - flat elongated bottom feeder shape */}
        <ellipse cx="38" cy="22" rx="28" ry="10" fill={`url(#pleco-body-${id})`} />
        {/* Flat belly */}
        <ellipse cx="38" cy="27" rx="24" ry="5" fill="#3A2A1E" opacity="0.6" />
        {/* Clown stripes - golden/orange bands */}
        <path d="M18 16 Q20 12 24 14 L24 28 Q20 30 18 26 Z" fill={`url(#pleco-stripe-${id})`} opacity="0.8" />
        <path d="M30 13 Q33 10 36 12 L36 30 Q33 32 30 29 Z" fill={`url(#pleco-stripe-${id})`} opacity="0.7" />
        <path d="M42 12 Q45 10 48 13 L48 29 Q45 31 42 28 Z" fill={`url(#pleco-stripe-${id})`} opacity="0.8" />
        <path d="M54 14 Q56 12 58 15 L58 27 Q56 29 54 26 Z" fill={`url(#pleco-stripe-${id})`} opacity="0.7" />
        {/* Head - broad flat snout */}
        <ellipse cx="14" cy="22" rx="10" ry="8" fill="#3E2E20" />
        <ellipse cx="12" cy="24" rx="8" ry="5" fill="#4A3828" />
        {/* Sucker mouth (bottom feeder!) */}
        <ellipse cx="8" cy="25" rx="4" ry="3" fill="#2A1A10" stroke="#5C4A3A" strokeWidth="0.5" />
        <ellipse cx="8" cy="25" rx="2.5" ry="1.8" fill="#1A0E08" />
        {/* Eyes - small, set high on head */}
        <circle cx="16" cy="17" r="2.5" fill="#1A0E08" />
        <circle cx="16" cy="16.5" r="1.2" fill="#4A3020" />
        <circle cx="16.5" cy="16" r="0.5" fill="#D4A54A" />
        {/* Dorsal fin - tall sail-like */}
        <path d="M28 14 Q32 4 38 6 Q42 8 44 14" fill="#3E2E20" opacity="0.9" />
        <path d="M30 12 Q34 6 38 7" stroke="#D4A54A" strokeWidth="0.8" fill="none" opacity="0.5" />
        {/* Pectoral fins - wide, flat */}
        <path d="M22 26 Q16 34 12 32 Q14 28 20 26" fill="#3E2E20" opacity="0.7" />
        <path d="M32 26 Q28 34 24 32 Q26 28 30 26" fill="#3E2E20" opacity="0.7" />
        {/* Tail fin - fan shaped */}
        <path d="M62 18 Q72 10 74 16 Q76 22 74 26 Q72 32 62 24" fill="#3E2E20" opacity="0.85" />
        <path d="M64 18 Q70 14 72 20" stroke="#D4A54A" strokeWidth="0.6" fill="none" opacity="0.5" />
        <path d="M64 24 Q70 28 72 22" stroke="#D4A54A" strokeWidth="0.6" fill="none" opacity="0.5" />
        {/* Armor plates texture */}
        <path d="M20 18 L24 17 L28 18" stroke="#5C4A3A" strokeWidth="0.4" fill="none" opacity="0.4" />
        <path d="M34 17 L38 16 L42 17" stroke="#5C4A3A" strokeWidth="0.4" fill="none" opacity="0.4" />
        <path d="M46 18 L50 17 L54 18" stroke="#5C4A3A" strokeWidth="0.4" fill="none" opacity="0.4" />
      </g>
    </svg>
  )
})
ClownPlecoSVG.displayName = 'ClownPlecoSVG'

// ─── Pleco Social Behavior ──────────────────────────────────────────
// Mates for life: plecos alternate between wandering apart and journeying
// together along the bottom of the tank.
//   'apart'      — wander independently for 1, 4, 7, or 10 minutes
//   'converging' — swim toward each other (~15 seconds)
//   'together'   — travel side-by-side for half the apart duration

type PlecoPhase = 'apart' | 'converging' | 'together'
const PLECO_MEETING_INTERVALS_MS = [1, 4, 7, 10].map(m => m * 60 * 1000)

export const PlecoPair = memo(({ containerWidth }: { containerWidth: number }) => {
  const [phase, setPhase] = useState<PlecoPhase>('together')
  const phaseTimersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  // Pleco 1 position (leader when together)
  const [p1, setP1] = useState({ x: containerWidth * 0.3, facingRight: true })
  // Pleco 2 position (mate)
  const [p2, setP2] = useState({ x: containerWidth * 0.35, facingRight: true })

  // Refs for movement
  const p1Ref = useRef({ x: containerWidth * 0.3, targetX: containerWidth * 0.5, speed: 0.4 })
  const p2Ref = useRef({ x: containerWidth * 0.35, targetX: containerWidth * 0.6, speed: 0.35 })

  // ─── Social cycle ───────────────────────────────────────
  const startCycle = useCallback(() => {
    phaseTimersRef.current.forEach(t => clearTimeout(t))
    phaseTimersRef.current = []

    // Pick random apart duration
    const apartMs = PLECO_MEETING_INTERVALS_MS[Math.floor(Math.random() * PLECO_MEETING_INTERVALS_MS.length)]

    // Start apart: give each pleco a random target on opposite sides
    setPhase('apart')
    p1Ref.current.targetX = containerWidth * (0.05 + Math.random() * 0.35) // left half
    p2Ref.current.targetX = containerWidth * (0.55 + Math.random() * 0.35) // right half

    // After apart time → converge
    const t1 = setTimeout(() => {
      setPhase('converging')
      // Meet in the middle-ish
      const meetX = containerWidth * (0.25 + Math.random() * 0.45)
      p1Ref.current.targetX = meetX
      p2Ref.current.targetX = meetX + 35

      // After convergence → together
      const t2 = setTimeout(() => {
        setPhase('together')

        // Together for half the apart time, then restart
        const t3 = setTimeout(() => {
          startCycle()
        }, apartMs / 2)
        phaseTimersRef.current.push(t3)
      }, 15000) // 15 seconds to converge
      phaseTimersRef.current.push(t2)
    }, apartMs)
    phaseTimersRef.current.push(t1)
  }, [containerWidth])

  useEffect(() => {
    if (containerWidth === 0) return
    // Start with a short together period before first cycle
    const initialTimer = setTimeout(() => startCycle(), 8000)
    return () => {
      clearTimeout(initialTimer)
      phaseTimersRef.current.forEach(t => clearTimeout(t))
    }
  }, [containerWidth, startCycle])

  // ─── Movement loop ──────────────────────────────────────
  useEffect(() => {
    if (containerWidth === 0) return

    const interval = setInterval(() => {
      const currentPhase = phase

      // Update pleco 1
      const s1 = p1Ref.current
      if (currentPhase === 'together') {
        // Slow wandering (original sine-based movement)
        s1.x += Math.sin(Date.now() * 0.0003) * 0.6
        // Gently drift across the tank
        s1.targetX = containerWidth * 0.15 + Math.sin(Date.now() * 0.00015) * (containerWidth * 0.35)
        const dx1 = s1.targetX - s1.x
        if (Math.abs(dx1) > 2) s1.x += Math.sign(dx1) * 0.3
      } else {
        // Move toward target
        const dx1 = s1.targetX - s1.x
        if (Math.abs(dx1) > 3) {
          s1.x += Math.sign(dx1) * s1.speed * (currentPhase === 'converging' ? 1.5 : 1)
        } else if (currentPhase === 'apart') {
          // Pick new random target on their side
          s1.targetX = containerWidth * (0.05 + Math.random() * 0.40)
        }
      }
      s1.x = Math.max(10, Math.min(containerWidth - 50, s1.x))

      // Update pleco 2
      const s2 = p2Ref.current
      if (currentPhase === 'together') {
        // Follow pleco 1 closely
        const followX = s1.x + (s1.x > s2.x ? -35 : 35)
        const dx2 = followX - s2.x
        s2.x += dx2 * 0.05
      } else {
        const dx2 = s2.targetX - s2.x
        if (Math.abs(dx2) > 3) {
          s2.x += Math.sign(dx2) * s2.speed * (currentPhase === 'converging' ? 1.5 : 1)
        } else if (currentPhase === 'apart') {
          s2.targetX = containerWidth * (0.55 + Math.random() * 0.35)
        }
      }
      s2.x = Math.max(10, Math.min(containerWidth - 50, s2.x))

      // Determine facing direction
      const p1Right = currentPhase === 'together'
        ? Math.sin(Date.now() * 0.00015) > 0
        : s1.targetX > s1.x
      const p2Right = currentPhase === 'together'
        ? p1Right
        : s2.targetX > s2.x

      setP1({ x: s1.x, facingRight: p1Right })
      setP2({ x: s2.x, facingRight: p2Right })
    }, 100)

    return () => clearInterval(interval)
  }, [containerWidth, phase])

  // Only show hearts when together or converging (close enough)
  const showHearts = phase === 'together' || (phase === 'converging' && Math.abs(p1.x - p2.x) < 80)

  return (
    <div className="absolute bottom-[18px] left-0 w-full z-20 pointer-events-none" style={{ height: '40px' }}>
      {/* Pleco 1 */}
      <div
        className="absolute"
        style={{
          left: `${p1.x}px`,
          bottom: '0px',
          transition: 'left 0.15s linear',
        }}
      >
        <ClownPlecoSVG id="pleco-1" facingRight={p1.facingRight} size={38} />
      </div>
      {/* Pleco 2 (mate) */}
      <div
        className="absolute"
        style={{
          left: `${p2.x}px`,
          bottom: '2px',
          transition: 'left 0.15s linear',
        }}
      >
        <ClownPlecoSVG id="pleco-2" facingRight={p2.facingRight} size={34} />
      </div>
      {/* Hearts when reunited */}
      {showHearts && <PlecoHearts x1={p1.x} x2={p2.x} />}
    </div>
  )
})
PlecoPair.displayName = 'PlecoPair'

const PlecoHearts = memo(({ x1, x2 }: { x1: number; x2: number }) => {
  const [showHeart, setShowHeart] = useState(false)
  const midX = (x1 + x2) / 2

  useEffect(() => {
    const show = () => {
      setShowHeart(true)
      setTimeout(() => setShowHeart(false), 2000)
    }

    const interval = setInterval(show, 6000 + Math.random() * 4000)
    const initialTimeout = setTimeout(show, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(initialTimeout)
    }
  }, [])

  if (!showHeart) return null

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${midX + 10}px`,
        bottom: '28px',
        animation: 'heartFloat 2s ease-out forwards',
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#FF6B8A" opacity="0.8">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  )
})
PlecoHearts.displayName = 'PlecoHearts'


// ─── Glass Snail System ────────────────────────────────────────────
// Snails that crawl on the glass with belly facing the viewer.
// They wander independently, cleaning algae that builds up on the glass.

interface SnailColor {
  shell: string
  shellLight: string
  shellDark: string
  body: string
}

// 6 color variants for up to 6 snails (3 personal, 6 community)
const SNAIL_COLOR_LIST: SnailColor[] = [
  { shell: '#E8789A', shellLight: '#F5A0B8', shellDark: '#C45678', body: '#F0C8D4' },  // pink
  { shell: '#5B8EC9', shellLight: '#85B0E0', shellDark: '#3A6CA0', body: '#B8D4F0' },  // blue
  { shell: '#D4A43A', shellLight: '#E8C468', shellDark: '#B8862D', body: '#F0DCA8' },  // gold
  { shell: '#9B6BB5', shellLight: '#BB92D0', shellDark: '#7A4E96', body: '#D8C4E8' },  // lavender
  { shell: '#5BAF6E', shellLight: '#82CC92', shellDark: '#3E8A4F', body: '#B8E0C0' },  // jade
  { shell: '#E07850', shellLight: '#F0A080', shellDark: '#C05830', body: '#F0D0B8' },  // coral
]

// ─── Belly-Facing Snail SVG ─────────────────────────────────────────
// Viewed from below through the glass. Belly/foot is closest to viewer,
// shell sits on back (behind body), antlers extend from head.
// Default orientation: head points RIGHT.

const SnailSVG = memo(({ id, color, facingRight = true, size = 22 }: {
  id: string
  color: SnailColor
  facingRight: boolean
  size?: number
}) => {
  const scaleX = facingRight ? 1 : -1
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 64 44" fill="none">
      <defs>
        <radialGradient id={`ss-${id}`} cx="0.4" cy="0.35" r="0.55">
          <stop offset="0%" stopColor={color.shellLight} />
          <stop offset="55%" stopColor={color.shell} />
          <stop offset="100%" stopColor={color.shellDark} />
        </radialGradient>
        <radialGradient id={`sf-${id}`} cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%" stopColor={color.body} />
          <stop offset="100%" stopColor={color.body} stopOpacity="0.65" />
        </radialGradient>
      </defs>
      <g transform={`translate(32, 22) scale(${scaleX}, 1) translate(-32, -22)`}>
        {/* === SHELL (back layer, furthest from viewer) === */}
        <ellipse cx="22" cy="16" rx="14" ry="12" fill={`url(#ss-${id})`} />
        {/* Shell spiral grooves */}
        <path
          d="M22 16 Q16 10 22 5 Q30 2 35 9 Q38 16 32 22 Q26 27 20 22"
          stroke={color.shellDark} strokeWidth="0.9" fill="none" opacity="0.45"
        />
        <path
          d="M22 16 Q19 12 22 9 Q27 7 30 12 Q32 16 28 20"
          stroke={color.shellDark} strokeWidth="0.7" fill="none" opacity="0.3"
        />
        {/* Shell center dot (apex) */}
        <circle cx="22" cy="16" r="1.5" fill={color.shellDark} opacity="0.3" />
        {/* Shell highlight/shine */}
        <ellipse cx="17" cy="11" rx="4.5" ry="3.5" fill="white" opacity="0.18" />

        {/* === BODY/FOOT (belly pressed against glass, closest to viewer) === */}
        <ellipse cx="32" cy="24" rx="22" ry="9" fill={`url(#sf-${id})`} opacity="0.88" />
        {/* Belly muscle ripple texture (muscular foot) */}
        <path d="M14 21 Q32 19 50 21" stroke="white" strokeWidth="0.4" opacity="0.14" />
        <path d="M12 24 Q32 22 52 24" stroke="white" strokeWidth="0.5" opacity="0.11" />
        <path d="M14 27 Q32 25 50 27" stroke="white" strokeWidth="0.4" opacity="0.14" />
        {/* Belly edge (foot sole rim) */}
        <ellipse cx="32" cy="24" rx="22" ry="9" fill="none" stroke={color.body} strokeWidth="0.5" opacity="0.25" />

        {/* === HEAD (extending from body toward direction of travel) === */}
        <ellipse cx="50" cy="24" rx="7" ry="6" fill={color.body} opacity="0.92" />

        {/* === UPPER ANTLERS (long tentacles with eyes — the "horns") === */}
        <path d="M53 20 Q57 13 60 7" stroke={color.body} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.9" />
        <path d="M55 19 Q59 12 63 5" stroke={color.body} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.9" />
        {/* Eye bulbs at tips of upper antlers */}
        <circle cx="60" cy="7" r="2" fill="#1A1A2E" />
        <circle cx="60.5" cy="6.2" r="0.8" fill="white" opacity="0.85" />
        <circle cx="63" cy="5" r="2" fill="#1A1A2E" />
        <circle cx="63.5" cy="4.2" r="0.8" fill="white" opacity="0.85" />

        {/* === LOWER ANTLERS (shorter sensory feelers) === */}
        <path d="M54 27 Q58 31 60 35" stroke={color.body} strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.8" />
        <path d="M55 29 Q58 33 59 38" stroke={color.body} strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.8" />
        {/* Tiny feeler tips */}
        <circle cx="60" cy="35" r="1" fill={color.body} opacity="0.6" />
        <circle cx="59" cy="38" r="1" fill={color.body} opacity="0.6" />

        {/* === GLASS REFLECTION (subtle shine on belly) === */}
        <ellipse cx="30" cy="22" rx="13" ry="5" fill="white" opacity="0.06" />

        {/* === SLIME TRAIL behind === */}
        <ellipse cx="8" cy="25" rx="5" ry="1.5" fill={color.body} opacity="0.12" />
        <ellipse cx="3" cy="25" rx="3" ry="1" fill={color.body} opacity="0.07" />
      </g>
    </svg>
  )
})
SnailSVG.displayName = 'SnailSVG'


// ─── Snail Movement ─────────────────────────────────────────────────
// Snails wander independently across the front glass, cleaning algae.
// Movement constraints:
//   Front glass (center):  bottom 90% → y >= 0.10
//   Near side walls:       bottom 77% → y >= 0.23

interface SnailPos {
  x: number
  y: number
  targetX: number
  targetY: number
  facingRight: boolean
  wobblePhase: number
  speed: number
  pauseUntil: number
}

function getMinY(xRatio: number): number {
  if (xRatio < 0.12 || xRatio > 0.88) return 0.23
  return 0.10
}

function pickRandomTarget(containerWidth: number, containerHeight: number): { x: number; y: number } {
  const x = 15 + Math.random() * (containerWidth - 30)
  const xRatio = x / containerWidth
  const minY = getMinY(xRatio) * containerHeight
  const maxY = containerHeight * 0.93
  const y = minY + Math.random() * (maxY - minY)
  return { x, y }
}


// ─── Snail Group Component ──────────────────────────────────────────
// Manages all snails in a tank. Each snail wanders independently.
// count=3 for personal tank, count=6 for community bowl.

export const SnailGroup = memo(({ count, containerWidth, containerHeight }: {
  count: number
  containerWidth: number
  containerHeight: number
}) => {
  const snailsRef = useRef<SnailPos[]>([])
  const [positions, setPositions] = useState<{ x: number; y: number; facingRight: boolean }[]>([])


  // Initialize snail data
  useEffect(() => {
    if (containerWidth === 0 || containerHeight === 0) return
    snailsRef.current = Array.from({ length: count }, (_, i) => {
      const startX = (containerWidth * (i + 1)) / (count + 1)
      const startY = containerHeight * (0.15 + Math.random() * 0.70)
      const target = pickRandomTarget(containerWidth, containerHeight)
      return {
        x: startX,
        y: startY,
        targetX: target.x,
        targetY: target.y,
        facingRight: target.x > startX,
        wobblePhase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.15,
        pauseUntil: 0,
      }
    })
    setPositions(snailsRef.current.map(s => ({ x: s.x, y: s.y, facingRight: s.facingRight })))
  }, [count, containerWidth, containerHeight])

  // ─── Movement loop (10fps, CSS smooths visual) ───────────
  useEffect(() => {
    if (containerWidth === 0 || containerHeight === 0) return
    if (snailsRef.current.length === 0) return

    const interval = setInterval(() => {
      const now = Date.now()

      snailsRef.current.forEach((snail) => {
        if (now < snail.pauseUntil) return

        const dx = snail.targetX - snail.x
        const dy = snail.targetY - snail.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist > 3) {
          // Move toward target with slight organic wobble
          snail.wobblePhase += 0.15
          const wobbleAmt = Math.sin(snail.wobblePhase) * 0.3
          const perpX = -dy / dist
          const perpY = dx / dist

          snail.x += (dx / dist) * snail.speed + perpX * wobbleAmt
          snail.y += (dy / dist) * snail.speed + perpY * wobbleAmt
          snail.facingRight = dx > 0
        } else {
          // Reached target — maybe pause, then pick new target
          if (Math.random() < 0.3) {
            snail.pauseUntil = now + 2000 + Math.random() * 5000
          }
          const newTarget = pickRandomTarget(containerWidth, containerHeight)
          snail.targetX = newTarget.x
          snail.targetY = newTarget.y
        }

        // Enforce bounds
        const xRatio = snail.x / containerWidth
        const minY = getMinY(xRatio) * containerHeight
        snail.x = Math.max(10, Math.min(containerWidth - 10, snail.x))
        snail.y = Math.max(minY, Math.min(containerHeight * 0.93, snail.y))
      })

      setPositions(snailsRef.current.map(s => ({
        x: s.x,
        y: s.y,
        facingRight: s.facingRight,
      })))
    }, 100)

    return () => clearInterval(interval)
  }, [containerWidth, containerHeight, count])

  // ─── Render ───────────────────────────────────────────────
  if (containerWidth === 0 || containerHeight === 0) return null

  return (
    <>
      {positions.map((pos, i) => (
        <div
          key={`snail-${i}`}
          className="absolute z-20 pointer-events-none"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.15s linear, top 0.15s linear',
            opacity: 0.88,
            filter: 'drop-shadow(0 0 3px rgba(100,200,255,0.12))',
          }}
        >
          <SnailSVG
            id={`snail-${i}`}
            color={SNAIL_COLOR_LIST[i % SNAIL_COLOR_LIST.length]}
            facingRight={pos.facingRight}
            size={22}
          />
          {/* Slime trail dot */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: '7px',
              height: '4px',
              background: `radial-gradient(ellipse, ${SNAIL_COLOR_LIST[i % SNAIL_COLOR_LIST.length].body}25 0%, transparent 70%)`,
              left: pos.facingRight ? '0%' : '85%',
              top: '55%',
            }}
          />
        </div>
      ))}
    </>
  )
})
SnailGroup.displayName = 'SnailGroup'

// Backward-compatible export (old name)
export const SnailTrio = SnailGroup
