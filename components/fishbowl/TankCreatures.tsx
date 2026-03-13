'use client'

import { memo, useEffect, useState, useRef, useCallback, useMemo } from 'react'

// ─── Clown Pleco (Bottom Feeder) ────────────────────────────────────
// Two plecos that stay near the bottom, always near each other (mates for life)

const ClownPlecoSVG = memo(({ id, facingRight, size = 40 }: { id: string; facingRight: boolean; size?: number }) => {
  const scaleX = facingRight ? -1 : 1
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 160 80" fill="none">
      <g transform={`translate(80, 40) scale(${scaleX}, 1) translate(-80, -40)`}>

        {/* === CAUDAL FIN — smooth fan shape === */}
        <path d="M128 30 Q140 18 150 12 Q152 16 148 24 Q146 28 144 32 L128 34 Z" fill="#2E1E12" />
        <path d="M128 50 Q140 62 150 68 Q152 64 148 56 Q146 52 144 48 L128 46 Z" fill="#2E1E12" />
        <path d="M128 34 L144 32 Q146 36 146 40 Q146 44 144 48 L128 46 Z" fill="#3D2B1A" />
        {/* Caudal fin rays */}
        <line x1="130" y1="32" x2="146" y2="20" stroke="#1A0F08" strokeWidth="0.6" opacity="0.4" />
        <line x1="130" y1="36" x2="148" y2="28" stroke="#1A0F08" strokeWidth="0.5" opacity="0.3" />
        <line x1="130" y1="44" x2="148" y2="52" stroke="#1A0F08" strokeWidth="0.5" opacity="0.3" />
        <line x1="130" y1="48" x2="146" y2="60" stroke="#1A0F08" strokeWidth="0.6" opacity="0.4" />
        {/* Caudal fin gold stripes */}
        <path d="M132 30 Q138 24 142 20" stroke="#D49228" strokeWidth="2.5" fill="none" opacity="0.4" />
        <path d="M132 38 Q138 38 144 38" stroke="#E8A832" strokeWidth="2" fill="none" opacity="0.35" />
        <path d="M132 50 Q138 56 142 60" stroke="#D49228" strokeWidth="2.5" fill="none" opacity="0.4" />

        {/* === DORSAL FIN — tall triangular sail === */}
        <path d="M48 24 Q50 8 56 4 Q62 6 68 14 Q74 18 80 24 Z" fill="#2E1E12" />
        <path d="M52 22 Q54 12 56 6 Q60 10 66 16 Q72 20 76 24 Z" fill="#3D2B1A" opacity="0.6" />
        {/* Dorsal fin rays */}
        <line x1="54" y1="22" x2="56" y2="6" stroke="#1A0F08" strokeWidth="0.5" opacity="0.35" />
        <line x1="60" y1="22" x2="58" y2="8" stroke="#1A0F08" strokeWidth="0.5" opacity="0.3" />
        <line x1="66" y1="24" x2="62" y2="10" stroke="#1A0F08" strokeWidth="0.5" opacity="0.25" />
        <line x1="72" y1="24" x2="66" y2="14" stroke="#1A0F08" strokeWidth="0.5" opacity="0.2" />
        {/* Dorsal fin gold accent */}
        <path d="M54 18 Q56 10 58 6" stroke="#D49228" strokeWidth="1.5" fill="none" opacity="0.4" />

        {/* === PECTORAL FINS — spread wide like wings === */}
        <path d="M30 52 Q22 60 14 68 Q18 70 24 66 Q30 62 34 56 Z" fill="#2E1E12" />
        <path d="M32 54 Q26 60 18 66" stroke="#3D2B1A" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M36 52 Q30 58 22 64 Q26 66 32 62 Q36 58 38 54 Z" fill="#3D2B1A" opacity="0.5" />
        {/* Pectoral fin spine */}
        <line x1="30" y1="52" x2="16" y2="68" stroke="#4A3828" strokeWidth="1" opacity="0.4" />

        {/* === PELVIC FIN === */}
        <path d="M58 58 Q52 66 48 72 Q54 70 60 64 Q62 60 60 58 Z" fill="#2E1E12" />
        <line x1="58" y1="58" x2="50" y2="70" stroke="#3D2B1A" strokeWidth="0.6" opacity="0.4" />

        {/* === ANAL FIN === */}
        <path d="M90 58 Q86 66 82 70 Q88 68 92 64 Q94 60 92 58 Z" fill="#2E1E12" />
        <line x1="90" y1="58" x2="84" y2="68" stroke="#3D2B1A" strokeWidth="0.6" opacity="0.4" />

        {/* === ADIPOSE FIN — small fleshy bump === */}
        <path d="M104 26 Q108 20 112 24 Q110 26 106 26 Z" fill="#3D2B1A" />

        {/* === MAIN BODY — smooth elongated torpedo shape === */}
        <path d="M16 32 Q10 36 8 40 Q10 44 16 48 Q24 56 40 60 Q60 64 80 60 Q100 56 116 48 Q124 44 128 40 Q124 36 116 32 Q100 24 80 22 Q60 20 40 24 Q24 28 16 32 Z" fill="#3D2B1A" />

        {/* Body shading — darker underside */}
        <path d="M20 44 Q30 54 50 58 Q70 62 90 58 Q110 54 124 44 Q122 48 110 54 Q90 60 70 62 Q50 60 30 54 Q20 48 20 44 Z" fill="#2A1C10" opacity="0.6" />

        {/* Body highlight — lighter top */}
        <path d="M30 30 Q50 24 80 22 Q100 24 116 32 Q100 26 80 24 Q60 24 40 28 Q32 30 30 30 Z" fill="#4A3828" opacity="0.3" />

        {/* Belly — lighter underside */}
        <path d="M24 52 Q40 60 60 62 Q80 62 100 58 Q112 52 120 46 Q112 54 100 60 Q80 64 60 64 Q40 62 24 52 Z" fill="#4A3622" opacity="0.5" />

        {/* === SCUTE PLATES — armored scale rows === */}
        {/* Upper scute line */}
        <path d="M30 28 Q60 22 90 26 Q110 30 124 36" stroke="#4A3828" strokeWidth="0.8" fill="none" opacity="0.3" />
        {/* Mid scute line */}
        <path d="M18 38 Q50 32 80 34 Q110 36 126 40" stroke="#4A3828" strokeWidth="0.8" fill="none" opacity="0.25" />
        {/* Lower scute line */}
        <path d="M22 48 Q50 44 80 46 Q110 48 124 44" stroke="#4A3828" strokeWidth="0.7" fill="none" opacity="0.2" />
        {/* Vertical scute divisions */}
        {[34, 44, 54, 64, 74, 84, 94, 104, 114].map((sx, i) => (
          <line key={`scute-${i}`} x1={sx} y1={24 + i * 0.5} x2={sx} y2={56 - i * 0.8} stroke="#4A3828" strokeWidth="0.5" opacity={0.15 - i * 0.01} />
        ))}

        {/* === CLOWN STRIPES — 5 organic curved bands of bright orange-gold === */}
        {/* Stripe 1 — behind head, widest */}
        <path d="M30 26 Q28 36 28 40 Q28 44 30 54" stroke="#E8A832" strokeWidth="5" fill="none" opacity="0.8" strokeLinecap="round" />
        <path d="M30 26 Q28 36 28 40 Q28 44 30 54" stroke="#D49228" strokeWidth="3" fill="none" opacity="0.4" strokeLinecap="round" />

        {/* Stripe 2 — mid-anterior */}
        <path d="M46 24 Q44 34 44 40 Q44 46 46 56" stroke="#E8A832" strokeWidth="4.5" fill="none" opacity="0.75" strokeLinecap="round" />
        <path d="M46 24 Q44 34 44 40 Q44 46 46 56" stroke="#D49228" strokeWidth="2.5" fill="none" opacity="0.35" strokeLinecap="round" />

        {/* Stripe 3 — mid body */}
        <path d="M66 22 Q64 32 64 40 Q64 48 66 58" stroke="#E8A832" strokeWidth="5" fill="none" opacity="0.8" strokeLinecap="round" />
        <path d="M66 22 Q64 32 64 40 Q64 48 66 58" stroke="#C07E20" strokeWidth="3" fill="none" opacity="0.3" strokeLinecap="round" />

        {/* Stripe 4 — posterior, thinner */}
        <path d="M86 24 Q84 34 84 40 Q84 46 86 56" stroke="#D49228" strokeWidth="4" fill="none" opacity="0.7" strokeLinecap="round" />
        <path d="M86 24 Q84 34 84 40 Q84 46 86 56" stroke="#E8A832" strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round" />

        {/* Stripe 5 — near tail, narrowest */}
        <path d="M104 28 Q102 36 102 40 Q102 44 104 52" stroke="#D49228" strokeWidth="3.5" fill="none" opacity="0.65" strokeLinecap="round" />
        <path d="M104 28 Q102 36 102 40 Q102 44 104 52" stroke="#C07E20" strokeWidth="1.5" fill="none" opacity="0.25" strokeLinecap="round" />

        {/* === HEAD — broader, darker front section === */}
        <path d="M8 36 Q6 38 6 40 Q6 42 8 44 Q10 48 16 50 Q20 52 26 52 Q28 48 28 40 Q28 32 26 28 Q20 28 16 30 Q10 32 8 36 Z" fill="#32220E" />
        {/* Head contour shading */}
        <path d="M10 36 Q14 30 22 28 Q26 28 28 32" stroke="#3A2816" strokeWidth="1" fill="none" opacity="0.5" />
        {/* Interorbital ridge */}
        <path d="M22 26 Q26 24 30 24" stroke="#4A3828" strokeWidth="1.2" fill="none" opacity="0.4" />

        {/* === SUCKER MOUTH — rounded disc on underside === */}
        <ellipse cx="14" cy="52" rx="10" ry="6" fill="#2A1A10" />
        <ellipse cx="14" cy="52" rx="7" ry="4" fill="#1A0E06" />
        {/* Lip folds */}
        <path d="M6 50 Q14 48 22 50" stroke="#3A2A18" strokeWidth="0.8" fill="none" opacity="0.4" />
        <path d="M6 54 Q14 56 22 54" stroke="#3A2A18" strokeWidth="0.8" fill="none" opacity="0.4" />
        {/* Inner mouth texture */}
        <ellipse cx="14" cy="52" rx="4" ry="2.5" fill="#1A0E06" opacity="0.7" />
        {/* Maxillary barbels */}
        <path d="M22 50 Q28 54 32 58" stroke="#4A3828" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" />
        <path d="M22 52 Q26 56 30 60" stroke="#4A3828" strokeWidth="0.8" fill="none" opacity="0.3" strokeLinecap="round" />

        {/* === EYE — detailed with omega-iris and golden ring === */}
        {/* Eye socket shadow */}
        <circle cx="24" cy="30" r="5" fill="#1A0E08" opacity="0.5" />
        {/* Eye globe */}
        <circle cx="24" cy="30" r="4" fill="#0E0808" />
        {/* Iris ring — golden-brown */}
        <circle cx="24" cy="30" r="3.5" fill="none" stroke="#6B5030" strokeWidth="1.5" />
        {/* Inner iris warm tone */}
        <circle cx="24" cy="30" r="2.5" fill="#4A3020" />
        {/* Omega iris flap — characteristic pleco feature */}
        <path d="M21 28 Q24 26 27 28" fill="#6B5030" />
        {/* Pupil */}
        <circle cx="24" cy="30" r="1.8" fill="#0E0808" />
        {/* Eye shine */}
        <circle cx="25.5" cy="28.5" r="1" fill="white" opacity="0.7" />
        <circle cx="23" cy="31.5" r="0.6" fill="white" opacity="0.25" />

        {/* === CAUDAL PEDUNCLE — narrow section before tail === */}
        <path d="M116 34 Q122 36 128 38 Q128 42 122 44 Q116 46 116 34 Z" fill="#2A1C10" opacity="0.5" />

        {/* === ODONTODE TEXTURE — tiny thorn-like projections on body === */}
        {[38, 50, 62, 74, 86, 98, 110].map((ox, i) => (
          <g key={`odontode-${i}`} opacity={0.2 - i * 0.01}>
            <circle cx={ox} cy={30 + i * 0.5} r="0.6" fill="#5C4A3A" />
            <circle cx={ox + 3} cy={44 - i * 0.3} r="0.5" fill="#5C4A3A" />
            <circle cx={ox - 2} cy={37} r="0.4" fill="#5C4A3A" />
          </g>
        ))}

        {/* === BODY HIGHLIGHTS — subtle light reflections on armored surface === */}
        <path d="M32 26 Q50 22 70 22 Q90 24 106 28" stroke="white" strokeWidth="1.2" fill="none" opacity="0.06" />
        <path d="M36 28 Q55 24 75 24 Q95 26 110 30" stroke="white" strokeWidth="0.8" fill="none" opacity="0.04" />

        {/* === LATERAL LINE — subtle sensory line along body === */}
        <path d="M26 38 Q50 34 80 36 Q110 38 126 40" stroke="#4A3828" strokeWidth="0.6" fill="none" opacity="0.2" strokeDasharray="3 2" />
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
