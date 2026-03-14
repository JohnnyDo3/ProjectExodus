'use client'

import { memo, useEffect, useState, useRef, useCallback, useMemo } from 'react'

// ─── Clown Pleco (Bottom Feeder) ────────────────────────────────────
// Two plecos that stay near the bottom, always near each other (mates for life)

const ClownPlecoSVG = memo(({ id, facingRight, size = 40 }: { id: string; facingRight: boolean; size?: number }) => {
  const scaleX = facingRight ? -1 : 1
  return (
    <svg width={size} height={size * 0.45} viewBox="0 0 130 58" fill="none">
      <defs>
        {/* Body gradient — rich chocolate brown with warm undertones */}
        <radialGradient id={`pb-${id}`} cx="30%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#6B4226" />
          <stop offset="50%" stopColor="#4A2E18" />
          <stop offset="100%" stopColor="#2E1A0C" />
        </radialGradient>
        {/* Belly gradient — lighter underside */}
        <linearGradient id={`pbl-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="40%" stopColor="#5C3D22" stopOpacity="0" />
          <stop offset="100%" stopColor="#8B6B4A" stopOpacity="0.3" />
        </linearGradient>
        {/* Fin gradient — translucent brown with amber tint */}
        <linearGradient id={`pf-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4A3018" />
          <stop offset="100%" stopColor="#3A2210" stopOpacity="0.8" />
        </linearGradient>
        {/* Amber band gradient for clown markings */}
        <linearGradient id={`pcb-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0B840" />
          <stop offset="50%" stopColor="#E89830" />
          <stop offset="100%" stopColor="#D08020" />
        </linearGradient>
      </defs>
      <g transform={`translate(65, 29) scale(${scaleX}, 1) translate(-65, -29)`}>

        {/* === CAUDAL (TAIL) FIN — wide fan shape, semi-transparent === */}
        <path d="M104 18 Q112 10 120 8 Q118 16 120 24 Q118 32 120 40 Q112 38 104 34 Z" fill={`url(#pf-${id})`} opacity="0.85" />
        {/* Tail fin rays */}
        <path d="M106 20 Q112 14 118 10" stroke="#5C3D1E" strokeWidth="0.7" fill="none" opacity="0.3" />
        <path d="M106 26 Q114 26 118 24" stroke="#5C3D1E" strokeWidth="0.6" fill="none" opacity="0.25" />
        <path d="M106 32 Q112 36 118 38" stroke="#5C3D1E" strokeWidth="0.7" fill="none" opacity="0.3" />
        {/* Tail amber bands */}
        <path d="M108 14 Q112 12 118 10" stroke="#E8A832" strokeWidth="2" fill="none" opacity="0.45" strokeLinecap="round" />
        <path d="M108 38 Q112 40 118 42" stroke="#E8A832" strokeWidth="2" fill="none" opacity="0.45" strokeLinecap="round" />

        {/* === DORSAL FIN — low triangular crest with spiny rays === */}
        <path d="M42 16 Q44 6 50 4 Q54 5 58 10 Q60 14 60 18 Z" fill={`url(#pf-${id})`} opacity="0.8" />
        {/* Dorsal spines */}
        <path d="M44 14 Q46 8 50 5" stroke="#6B4C28" strokeWidth="0.8" fill="none" opacity="0.4" />
        <path d="M48 12 Q50 6 52 5" stroke="#6B4C28" strokeWidth="0.6" fill="none" opacity="0.35" />
        {/* Dorsal amber marking */}
        <path d="M46 12 Q48 6 51 5" stroke="#D49228" strokeWidth="1.5" fill="none" opacity="0.35" strokeLinecap="round" />

        {/* === PECTORAL FINS — broad paddles, spread flat like wings === */}
        <path d="M22 38 Q14 44 8 50 Q12 50 18 46 Q24 42 26 38 Z" fill={`url(#pf-${id})`} opacity="0.7" />
        {/* Pectoral leading spine */}
        <path d="M22 38 L10 49" stroke="#5C3D1E" strokeWidth="0.9" fill="none" opacity="0.35" />
        {/* Pectoral fin rays */}
        <path d="M22 39 Q16 44 12 48" stroke="#4A3018" strokeWidth="0.5" fill="none" opacity="0.2" />

        {/* === PELVIC FINS — small, tucked under === */}
        <path d="M38 42 Q34 48 32 52 Q36 50 40 46 Z" fill="#3A2210" opacity="0.6" />
        <path d="M60 42 Q58 48 56 50 Q60 48 62 44 Z" fill="#3A2210" opacity="0.6" />

        {/* === ADIPOSE FIN — small fleshy tab === */}
        <path d="M82 17 Q84 14 87 16 Q85 18 82 17 Z" fill="#4A3018" opacity="0.7" />

        {/* === MAIN BODY — distinctly flat, wide torpedo shape === */}
        <path d="M10 24 Q4 28 3 30 Q4 32 8 36 Q16 42 32 44 Q52 46 74 42 Q90 38 102 32 Q104 30 102 26 Q90 20 74 16 Q52 14 32 16 Q16 18 10 24 Z" fill={`url(#pb-${id})`} />

        {/* Body belly gradient overlay */}
        <path d="M10 24 Q4 28 3 30 Q4 32 8 36 Q16 42 32 44 Q52 46 74 42 Q90 38 102 32 Q104 30 102 26 Q90 20 74 16 Q52 14 32 16 Q16 18 10 24 Z" fill={`url(#pbl-${id})`} />

        {/* === SCUTE ARMOR — rows of bony lateral plates === */}
        {/* Upper lateral line */}
        <path d="M22 20 Q42 16 62 17 Q82 19 98 24" stroke="#5C4028" strokeWidth="0.5" fill="none" opacity="0.2" strokeDasharray="3 2" />
        {/* Mid lateral line */}
        <path d="M12 30 Q42 26 72 28 Q92 30 104 32" stroke="#5C4028" strokeWidth="0.5" fill="none" opacity="0.18" strokeDasharray="3 2" />
        {/* Lower lateral line */}
        <path d="M14 38 Q42 36 72 38 Q88 39 100 36" stroke="#5C4028" strokeWidth="0.4" fill="none" opacity="0.15" strokeDasharray="2.5 2" />

        {/* === CLOWN PATTERN — bold orange-amber irregular bands (L-number signature) === */}

        {/* Band 1 — behind head, thick irregular */}
        <path d="M28 18 Q25 24 24 30 Q25 36 28 42" stroke={`url(#pcb-${id})`} strokeWidth="7" fill="none" opacity="0.65" strokeLinecap="round" />
        <path d="M28 19 Q26 24 25 30 Q26 36 28 41" stroke="#FFD860" strokeWidth="2" fill="none" opacity="0.2" strokeLinecap="round" />

        {/* Band 2 — anterior body, wavy */}
        <path d="M42 16 Q39 22 38 28 Q39 34 41 40 Q42 44 43 46" stroke={`url(#pcb-${id})`} strokeWidth="6" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M42 17 Q40 22 39 28 Q40 34 42 42" stroke="#FFD860" strokeWidth="1.8" fill="none" opacity="0.18" strokeLinecap="round" />

        {/* Band 3 — mid body, widest and most prominent */}
        <path d="M58 15 Q55 22 54 29 Q55 36 57 42 Q58 45 59 46" stroke={`url(#pcb-${id})`} strokeWidth="7.5" fill="none" opacity="0.7" strokeLinecap="round" />
        <path d="M58 16 Q56 22 55 29 Q56 36 58 44" stroke="#FFD860" strokeWidth="2.2" fill="none" opacity="0.22" strokeLinecap="round" />

        {/* Band 4 — posterior, narrower */}
        <path d="M74 18 Q71 24 70 30 Q71 36 74 42" stroke={`url(#pcb-${id})`} strokeWidth="5" fill="none" opacity="0.55" strokeLinecap="round" />

        {/* Band 5 — near tail, thin accent */}
        <path d="M88 22 Q86 26 86 30 Q86 34 88 38" stroke="#D49228" strokeWidth="3.5" fill="none" opacity="0.45" strokeLinecap="round" />

        {/* Band 6 — caudal peduncle, subtle */}
        <path d="M96 24 Q95 28 95 30 Q95 32 96 36" stroke="#D49228" strokeWidth="2.5" fill="none" opacity="0.35" strokeLinecap="round" />

        {/* === HEAD — broad flat shovel shape, darker === */}
        <path d="M3 26 Q2 28 2 30 Q2 32 3 34 Q6 38 12 40 Q18 40 22 38 Q24 34 24 30 Q24 26 22 22 Q18 20 12 20 Q6 22 3 26 Z" fill="#221208" />
        {/* Interorbital ridge */}
        <path d="M8 22 Q14 19 20 22" stroke="#3A2816" strokeWidth="0.8" fill="none" opacity="0.4" />
        {/* Cheek plate texture */}
        <path d="M6 32 Q10 30 14 32" stroke="#3A2816" strokeWidth="0.5" fill="none" opacity="0.25" />

        {/* === SUCKER MOUTH — round disc with rasping teeth ridges === */}
        <ellipse cx="12" cy="40" rx="7" ry="4" fill="#180C04" />
        <ellipse cx="12" cy="40" rx="4.5" ry="2.5" fill="#100804" />
        {/* Lip folds */}
        <path d="M6 38 Q12 36 18 38" stroke="#2E1A0C" strokeWidth="0.6" fill="none" opacity="0.4" />
        <path d="M6 42 Q12 44 18 42" stroke="#2E1A0C" strokeWidth="0.6" fill="none" opacity="0.4" />
        {/* Inner mouth ring */}
        <ellipse cx="12" cy="40" rx="3" ry="1.6" stroke="#3A2210" strokeWidth="0.4" fill="none" opacity="0.3" />
        {/* Barbels — short sensory whiskers */}
        <path d="M17 39 Q22 42 25 46" stroke="#4A3420" strokeWidth="0.7" fill="none" opacity="0.3" strokeLinecap="round" />
        <path d="M17 41 Q21 44 23 48" stroke="#4A3420" strokeWidth="0.5" fill="none" opacity="0.2" strokeLinecap="round" />

        {/* === EYE — small, high-set with omega-shaped iris === */}
        <circle cx="17" cy="24" r="3.5" fill="#0A0604" />
        <circle cx="17" cy="24" r="2.8" stroke="#8B6B3A" strokeWidth="1.2" fill="none" />
        {/* Omega iris — characteristic pleco eye */}
        <path d="M14.5 22.8 Q17 21.5 19.5 22.8" fill="#8B6B3A" />
        <circle cx="17" cy="24" r="1.8" fill="#2A1A0A" />
        <circle cx="17" cy="24" r="1.2" fill="#0A0604" />
        {/* Eye shine */}
        <circle cx="18.2" cy="22.8" r="0.9" fill="white" opacity="0.65" />
        <circle cx="16" cy="25" r="0.35" fill="white" opacity="0.2" />

        {/* === BODY SURFACE DETAILS === */}
        {/* Wet highlight along dorsal ridge */}
        <path d="M26 18 Q46 14 66 16 Q84 18 98 24" stroke="white" strokeWidth="0.8" fill="none" opacity="0.1" />
        {/* Secondary shimmer */}
        <path d="M30 20 Q50 16 70 18 Q86 20 96 26" stroke="white" strokeWidth="0.5" fill="none" opacity="0.06" />
        {/* Subtle texture dots — granular skin feel */}
        <circle cx="34" cy="24" r="0.5" fill="#6B4C28" opacity="0.15" />
        <circle cx="48" cy="22" r="0.5" fill="#6B4C28" opacity="0.12" />
        <circle cx="64" cy="20" r="0.5" fill="#6B4C28" opacity="0.12" />
        <circle cx="78" cy="24" r="0.5" fill="#6B4C28" opacity="0.1" />
        <circle cx="36" cy="36" r="0.5" fill="#6B4C28" opacity="0.12" />
        <circle cx="52" cy="38" r="0.5" fill="#6B4C28" opacity="0.1" />
        <circle cx="68" cy="36" r="0.5" fill="#6B4C28" opacity="0.1" />
      </g>
    </svg>
  )
})
ClownPlecoSVG.displayName = 'ClownPlecoSVG'

// ─── Structure-Based Pleco Movement ─────────────────────────────────
// Plecos navigate to tank structures, circle around them, latch on,
// and clean — like a woodpecker methodically working a tree trunk,
// but underwater. A clown pleco feeding on structure surfaces.

interface FeedingZone {
  cx: number; cy: number
  spots: Array<{ x: number; y: number }>
}

function createFeedingZone(sx: number, sy: number): FeedingZone {
  const cx = sx + 80, cy = sy + 60
  const spots: Array<{ x: number; y: number }> = []
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2
    const r = i % 2 === 0 ? 32 : 48
    spots.push({
      x: cx + Math.cos(angle) * r * 1.4,
      y: cy + Math.sin(angle) * r * 0.95,
    })
  }
  return { cx, cy, spots }
}

const THEME_FEEDING_ZONES: Record<string, FeedingZone[]> = {
  ocean:     [createFeedingZone(180, 126), createFeedingZone(500, 130)],
  tropical:  [createFeedingZone(160, 136), createFeedingZone(480, 126)],
  shipwreck: [createFeedingZone(40, 112),  createFeedingZone(640, 146)],
  sailboat:  [createFeedingZone(300, 142), createFeedingZone(600, 140)],
  submarine: [createFeedingZone(260, 154)],
  minimal:   [],
  castle:    [createFeedingZone(200, 132), createFeedingZone(560, 148)],
  pyramid:   [createFeedingZone(80, 134),  createFeedingZone(520, 152)],
  temple:    [createFeedingZone(120, 130), createFeedingZone(480, 124)],
  atlantis:  [createFeedingZone(100, 132), createFeedingZone(560, 130)],
  stagnant:  [createFeedingZone(300, 120)],
}

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

// Clown pleco phases:
//   transit — slow scooting along the bottom toward a structure (short bursts + pauses)
//   approach — cautiously nearing the structure, hugging surfaces
//   latch — quick dart to a specific feeding spot on the structure
//   rasp — sucker-mouth scraping: slow side-to-side rocking, mostly stationary
//   rest — completely still, latched to surface (plecos spend most time resting)
//   hop — short scoot to nearby spot on same structure

type PlecoPhase = 'transit' | 'approach' | 'latch' | 'rasp' | 'rest' | 'hop'

interface PlecoMotion {
  x: number; y: number
  phase: PlecoPhase
  targetX: number; targetY: number
  zoneIdx: number
  raspTicks: number
  restTicks: number
  spotsLeft: number
  speed: number
  facingRight: boolean
  // Scoot-and-pause behavior for transit
  scootTicks: number      // ticks remaining in current scoot burst
  pauseTicks: number      // ticks remaining in current pause
  // Approach behavior
  approachSpot: number    // which spot we're approaching from
  // Rasping animation state
  raspPhase: number       // oscillation phase for side-to-side rocking
}

function createPlecoMotion(
  zoneIdx: number, startX: number, startY: number,
): PlecoMotion {
  return {
    x: startX, y: startY,
    phase: 'transit',
    targetX: 0, targetY: 0,
    zoneIdx,
    raspTicks: 0,
    restTicks: 0,
    spotsLeft: 4 + Math.floor(Math.random() * 5),
    speed: 0.5 + Math.random() * 0.3,
    facingRight: true,
    scootTicks: 0,
    pauseTicks: 0,
    approachSpot: 0,
    raspPhase: 0,
  }
}

function tickPleco(
  p: PlecoMotion, zones: FeedingZone[], cw: number, ch: number,
): void {
  if (zones.length === 0) return
  const zone = zones[p.zoneIdx]
  const bottomBound = ch - 15  // plecos stay near the bottom

  switch (p.phase) {
    case 'transit': {
      // Scoot-and-pause: short bursts of movement with rest pauses between
      // Like a real pleco scooting along the bottom substrate

      // Handle pause between scoots
      if (p.pauseTicks > 0) {
        p.pauseTicks--
        // Completely still during pause — sucker holding position
        break
      }

      const center = svgToPixel(zone.cx, zone.cy, cw, ch)
      const dx = center.x - p.x
      const dy = center.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 30) {
        // Close enough to structure — start approaching cautiously
        p.phase = 'approach'
        p.approachSpot = Math.floor(Math.random() * zone.spots.length)
        const spot = zone.spots[p.approachSpot]
        const pos = svgToPixel(spot.x, spot.y, cw, ch)
        p.targetX = pos.x
        p.targetY = pos.y
        break
      }

      // Start a new scoot burst if needed
      if (p.scootTicks <= 0) {
        p.scootTicks = 6 + Math.floor(Math.random() * 10) // 0.6–1.6 seconds of movement
      }

      // Move in a scoot burst — bottom-hugging, slightly irregular
      const angle = Math.atan2(dy, dx)
      // Plecos hug the bottom — bias Y toward bottom of tank
      const bottomBias = (p.y < bottomBound - 30) ? 0.15 : 0
      const moveSpeed = p.speed * (0.8 + Math.random() * 0.4) // slight speed variation
      p.x += Math.cos(angle) * moveSpeed
      p.y += Math.sin(angle) * moveSpeed + bottomBias
      p.facingRight = dx > 0

      p.scootTicks--
      if (p.scootTicks <= 0) {
        // Pause between scoots — 0.5 to 2.5 seconds of complete stillness
        p.pauseTicks = 5 + Math.floor(Math.random() * 20)
      }
      break
    }

    case 'approach': {
      // Cautiously approach the structure — slow, deliberate, hugging surfaces
      const dx = p.targetX - p.x
      const dy = p.targetY - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 6) {
        // Reached the spot — latch on
        p.phase = 'rasp'
        p.raspTicks = 60 + Math.floor(Math.random() * 100) // 6–16 seconds of rasping
        p.raspPhase = 0
        break
      }

      // Slow, deliberate movement toward spot
      const angle = Math.atan2(dy, dx)
      const approachSpeed = p.speed * 0.6
      p.x += Math.cos(angle) * approachSpeed
      p.y += Math.sin(angle) * approachSpeed
      p.facingRight = dx > 0
      break
    }

    case 'latch': {
      // Quick short dart to a nearby spot on the structure
      const dx = p.targetX - p.x
      const dy = p.targetY - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 4) {
        // Decide: rasp or rest (plecos alternate between eating and resting)
        if (Math.random() < 0.35) {
          // Rest — just sit still, latched to surface
          p.phase = 'rest'
          p.restTicks = 30 + Math.floor(Math.random() * 80) // 3–11 seconds
        } else {
          // Rasp — start feeding
          p.phase = 'rasp'
          p.raspTicks = 50 + Math.floor(Math.random() * 80) // 5–13 seconds
          p.raspPhase = 0
        }
        break
      }

      const angle = Math.atan2(dy, dx)
      // Short quick scoot to new position
      p.x += Math.cos(angle) * p.speed * 1.2
      p.y += Math.sin(angle) * p.speed * 1.2
      p.facingRight = dx > 0
      break
    }

    case 'rasp': {
      // Sucker-mouth rasping: slow side-to-side rocking motion
      // Like watching a real pleco work its way across driftwood
      p.raspPhase += 0.15
      // Very small, rhythmic rocking — not random vibration
      p.x += Math.sin(p.raspPhase) * 0.4
      p.y += Math.sin(p.raspPhase * 0.7) * 0.15

      p.raspTicks--
      if (p.raspTicks <= 0) {
        p.spotsLeft--

        if (p.spotsLeft > 0) {
          // Sometimes rest between feeding spots
          if (Math.random() < 0.4) {
            p.phase = 'rest'
            p.restTicks = 20 + Math.floor(Math.random() * 50) // 2–7 seconds
          } else {
            // Hop to another nearby spot
            p.phase = 'latch'
            const spot = zone.spots[Math.floor(Math.random() * zone.spots.length)]
            const pos = svgToPixel(spot.x, spot.y, cw, ch)
            p.targetX = pos.x
            p.targetY = pos.y
          }
        } else {
          // All spots done — rest before moving to next structure
          p.phase = 'rest'
          p.restTicks = 40 + Math.floor(Math.random() * 60) // 4–10 seconds rest before transit
        }
      }
      break
    }

    case 'rest': {
      // Completely stationary — sucker mouth holding position
      // This is how plecos spend most of their time
      p.restTicks--
      if (p.restTicks <= 0) {
        if (p.spotsLeft > 0) {
          // Still have spots to clean on this structure — hop to next
          p.phase = 'latch'
          const spot = zone.spots[Math.floor(Math.random() * zone.spots.length)]
          const pos = svgToPixel(spot.x, spot.y, cw, ch)
          p.targetX = pos.x
          p.targetY = pos.y
        } else {
          // Done with this structure — move to a different one
          let newIdx = p.zoneIdx
          if (zones.length > 1) {
            while (newIdx === p.zoneIdx) {
              newIdx = Math.floor(Math.random() * zones.length)
            }
          }
          p.zoneIdx = newIdx
          p.spotsLeft = 4 + Math.floor(Math.random() * 5)
          p.phase = 'transit'
          p.scootTicks = 0
          p.pauseTicks = 0
          p.facingRight = svgToPixel(zones[newIdx].cx, zones[newIdx].cy, cw, ch).x > p.x
        }
      }
      break
    }

    case 'hop': {
      // Short scoot to nearby position — very quick movement
      const dx = p.targetX - p.x
      const dy = p.targetY - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 4) {
        p.phase = 'rasp'
        p.raspTicks = 40 + Math.floor(Math.random() * 60)
        p.raspPhase = 0
        break
      }

      const angle = Math.atan2(dy, dx)
      p.x += Math.cos(angle) * p.speed * 1.4
      p.y += Math.sin(angle) * p.speed * 1.4
      p.facingRight = dx > 0
      break
    }
  }

  // Clamp to tank bounds — plecos stay near the bottom
  p.x = Math.max(10, Math.min(cw - 50, p.x))
  p.y = Math.max(ch * 0.45, Math.min(bottomBound, p.y))
}

export const PlecoPair = memo(({ containerWidth, containerHeight, theme = 'ocean' }: {
  containerWidth: number
  containerHeight: number
  theme?: string
}) => {
  const zones = useMemo(
    () => THEME_FEEDING_ZONES[theme] || THEME_FEEDING_ZONES.ocean,
    [theme],
  )

  const [p1Pos, setP1Pos] = useState({ x: 0, y: 0, facingRight: true })
  const [p2Pos, setP2Pos] = useState({ x: 0, y: 0, facingRight: true })

  const p1Ref = useRef<PlecoMotion | null>(null)
  const p2Ref = useRef<PlecoMotion | null>(null)

  // Initialize plecos (once, when dimensions are available)
  useEffect(() => {
    if (containerWidth === 0 || containerHeight === 0 || zones.length === 0) return
    if (!p1Ref.current) {
      p1Ref.current = createPlecoMotion(0, containerWidth * 0.25, containerHeight * 0.8)
    }
    if (!p2Ref.current) {
      const idx2 = zones.length > 1 ? 1 : 0
      p2Ref.current = createPlecoMotion(idx2, containerWidth * 0.7, containerHeight * 0.85)
      p2Ref.current.speed *= 0.9
    }
  }, [containerWidth, containerHeight, zones])

  // Movement loop — 10 fps, CSS transitions smooth the visual
  useEffect(() => {
    if (containerWidth === 0 || containerHeight === 0 || zones.length === 0) return

    const interval = setInterval(() => {
      if (p1Ref.current) {
        tickPleco(p1Ref.current, zones, containerWidth, containerHeight)
        setP1Pos({ x: p1Ref.current.x, y: p1Ref.current.y, facingRight: p1Ref.current.facingRight })
      }
      if (p2Ref.current) {
        tickPleco(p2Ref.current, zones, containerWidth, containerHeight)
        setP2Pos({ x: p2Ref.current.x, y: p2Ref.current.y, facingRight: p2Ref.current.facingRight })
      }
    }, 100)

    return () => clearInterval(interval)
  }, [containerWidth, containerHeight, zones])

  // Don't render if no structures to feed on
  if (zones.length === 0) return null

  const showHearts = Math.abs(p1Pos.x - p2Pos.x) < 60 && Math.abs(p1Pos.y - p2Pos.y) < 40

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* Pleco 1 */}
      <div
        className="absolute"
        style={{
          left: `${p1Pos.x}px`,
          top: `${p1Pos.y}px`,
          transition: 'left 0.15s linear, top 0.15s linear',
        }}
      >
        <ClownPlecoSVG id="pleco-1" facingRight={p1Pos.facingRight} size={72} />
      </div>
      {/* Pleco 2 (mate) */}
      <div
        className="absolute"
        style={{
          left: `${p2Pos.x}px`,
          top: `${p2Pos.y}px`,
          transition: 'left 0.15s linear, top 0.15s linear',
        }}
      >
        <ClownPlecoSVG id="pleco-2" facingRight={p2Pos.facingRight} size={64} />
      </div>
      {/* Hearts when mates meet at the same structure */}
      {showHearts && <PlecoHearts x1={p1Pos.x} x2={p2Pos.x} y1={p1Pos.y} y2={p2Pos.y} />}
    </div>
  )
})
PlecoPair.displayName = 'PlecoPair'

const PlecoHearts = memo(({ x1, x2, y1, y2 }: { x1: number; x2: number; y1: number; y2: number }) => {
  const [showHeart, setShowHeart] = useState(false)
  const midX = (x1 + x2) / 2
  const midY = (y1 + y2) / 2

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
        top: `${midY - 20}px`,
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
            className="absolute z-20 pointer-events-none"
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
