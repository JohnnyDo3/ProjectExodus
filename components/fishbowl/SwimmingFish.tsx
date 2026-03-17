'use client'

import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { FishSVG, getTierFromScore, getTierName, type FishTier, type FishCustomization } from './FishSpecies'

export interface FishData {
  id: string
  userId: string
  name: string
  stockScore: number
  image: string | null
  tier: FishTier
  customization?: FishCustomization | null
}

// ── Behavioral state machine ────────────────────────────────────────
type FishBehavior = 'cruise' | 'explore' | 'idle' | 'dart' | 'glide' | 'spiral'

interface BehaviorConfig {
  minDuration: number // frames at 60fps
  maxDuration: number
  speedFactor: number // multiplier on base speed
  turnRate: number // how fast the fish can change heading (radians/frame)
  tailFreq: number // tail undulation frequency multiplier
}

const BEHAVIORS: Record<FishBehavior, BehaviorConfig> = {
  cruise: { minDuration: 180, maxDuration: 420, speedFactor: 1.0, turnRate: 0.015, tailFreq: 1.0 },
  explore: { minDuration: 120, maxDuration: 300, speedFactor: 0.7, turnRate: 0.04, tailFreq: 0.8 },
  idle: { minDuration: 90, maxDuration: 240, speedFactor: 0.15, turnRate: 0.01, tailFreq: 0.3 },
  dart: { minDuration: 30, maxDuration: 70, speedFactor: 2.2, turnRate: 0.06, tailFreq: 2.0 },
  glide: { minDuration: 60, maxDuration: 180, speedFactor: 0.5, turnRate: 0.008, tailFreq: 0.4 },
  spiral: { minDuration: 200, maxDuration: 400, speedFactor: 0.8, turnRate: 0.06, tailFreq: 0.9 },
}

// Weighted transitions — each behavior has probabilities for what comes next
const BEHAVIOR_TRANSITIONS: Record<FishBehavior, { next: FishBehavior; weight: number }[]> = {
  cruise: [
    { next: 'cruise', weight: 35 },
    { next: 'explore', weight: 30 },
    { next: 'glide', weight: 20 },
    { next: 'idle', weight: 10 },
    { next: 'dart', weight: 5 },
  ],
  explore: [
    { next: 'cruise', weight: 40 },
    { next: 'explore', weight: 20 },
    { next: 'idle', weight: 20 },
    { next: 'glide', weight: 15 },
    { next: 'dart', weight: 5 },
  ],
  idle: [
    { next: 'cruise', weight: 40 },
    { next: 'explore', weight: 30 },
    { next: 'dart', weight: 15 },
    { next: 'glide', weight: 10 },
    { next: 'idle', weight: 5 },
  ],
  dart: [
    { next: 'glide', weight: 50 },
    { next: 'cruise', weight: 30 },
    { next: 'idle', weight: 15 },
    { next: 'explore', weight: 5 },
    { next: 'dart', weight: 0 },
  ],
  glide: [
    { next: 'cruise', weight: 45 },
    { next: 'explore', weight: 25 },
    { next: 'idle', weight: 15 },
    { next: 'glide', weight: 10 },
    { next: 'dart', weight: 5 },
  ],
  spiral: [
    { next: 'cruise', weight: 40 },
    { next: 'explore', weight: 25 },
    { next: 'glide', weight: 20 },
    { next: 'idle', weight: 10 },
    { next: 'dart', weight: 5 },
  ],
}

// ── Core fish state ─────────────────────────────────────────────────
interface SwimmingFishState {
  x: number
  y: number
  heading: number // radians — THE primary movement direction
  speed: number // current forward speed (px/frame)
  baseSpeed: number // natural cruising speed for this fish
  // Behavior FSM
  behavior: FishBehavior
  behaviorTimer: number // frames remaining in current behavior
  targetHeading: number // heading the fish is turning toward
  // Exploration waypoint
  waypointX: number
  waypointY: number
  // Visual animation
  tailPhase: number // undulation phase
  smoothPitch: number // interpolated pitch for rendering
  // Boids accumulators (computed each frame)
  boidsSteerX: number
  boidsSteerY: number
  // Depth preference — each fish has a preferred depth band
  preferredDepth: number // 0-1 normalized
  // Entry/exit state
  entering: boolean
  exiting: boolean
  direction: 'left' | 'right'
  phase: number
  // Spiral state (temple theme)
  spiralAngle: number
  spiralCenterX: number
  spiralCenterY: number
}

interface SwimmingFishProps {
  fish: FishData
  containerWidth: number
  containerHeight: number
  onHover: (fish: FishData, rect: DOMRect) => void
  onLeave: () => void
  onClick: (fish: FishData, rect: DOMRect) => void
  index: number
  contained?: boolean
  theme?: string
  allFishPositions?: React.MutableRefObject<Map<string, { x: number; y: number; vx: number; size: number }>>
}

// ── Constants ───────────────────────────────────────────────────────
const FISH_MARGIN = 120
const BASE_SPEED_MIN = 1.0
const BASE_SPEED_MAX = 2.4
const SWIM_ZONE_TOP = 0.08
const SWIM_ZONE_BOTTOM = 0.68

// Boids parameters (tuned for aquarium aesthetics, not pure simulation)
const BOIDS_SEPARATION_RANGE = 2.5 // fish-size multiplier
const BOIDS_ALIGNMENT_RANGE = 5.0
const BOIDS_COHESION_RANGE = 6.0
const BOIDS_SEPARATION_FORCE = 0.06
const BOIDS_ALIGNMENT_FORCE = 0.02
const BOIDS_COHESION_FORCE = 0.004

// Soft wall avoidance — fish start turning before hitting the edge
const WALL_TURN_MARGIN = 0.12 // fraction of container dimension
const WALL_TURN_FORCE = 0.05

// Theme-aware structure avoidance zones — normalized container fractions
// Each zone covers where a structure visually appears in the tank
// SVG viewBox is 800x320, structures rendered at scale 2, xMidYMax meet
type StructureZone = { left: number; right: number; top: number; bottom: number }
const THEME_STRUCTURE_ZONES: Record<string, StructureZone[]> = {
  ocean:     [{ left: 0.18, right: 0.40, top: 0.50, bottom: 0.85 }, { left: 0.58, right: 0.78, top: 0.50, bottom: 0.85 }],
  volcano:   [{ left: 0.15, right: 0.38, top: 0.52, bottom: 0.88 }, { left: 0.55, right: 0.75, top: 0.50, bottom: 0.85 }],
  shipwreck: [{ left: 0.0, right: 0.28, top: 0.45, bottom: 0.85 }, { left: 0.75, right: 0.95, top: 0.55, bottom: 0.88 }],
  sailboat:  [{ left: 0.35, right: 0.58, top: 0.55, bottom: 0.90 }, { left: 0.70, right: 0.82, top: 0.55, bottom: 0.85 }],
  submarine: [{ left: 0.28, right: 0.52, top: 0.55, bottom: 0.90 }],
  castle:    [],  // No avoidance — castle has open archways for fish to swim through
  pyramid:   [{ left: 0.05, right: 0.28, top: 0.52, bottom: 0.88 }, { left: 0.60, right: 0.80, top: 0.55, bottom: 0.88 }],
  temple:    [{ left: 0.10, right: 0.32, top: 0.50, bottom: 0.85 }, { left: 0.55, right: 0.75, top: 0.48, bottom: 0.85 }],
  atlantis:  [{ left: 0.08, right: 0.30, top: 0.50, bottom: 0.85 }, { left: 0.65, right: 0.85, top: 0.50, bottom: 0.85 }],
  minimal:   [],
  stagnant:  [{ left: 0.32, right: 0.55, top: 0.48, bottom: 0.85 }],
}
const DEFAULT_STRUCTURE_ZONES = THEME_STRUCTURE_ZONES.ocean

// ── Helpers ─────────────────────────────────────────────────────────
function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a)
}

function normalizeAngle(a: number): number {
  while (a > Math.PI) a -= Math.PI * 2
  while (a < -Math.PI) a += Math.PI * 2
  return a
}

function weightedRandom(options: { next: FishBehavior; weight: number }[]): FishBehavior {
  const total = options.reduce((s, o) => s + o.weight, 0)
  let r = Math.random() * total
  for (const o of options) {
    r -= o.weight
    if (r <= 0) return o.next
  }
  return options[0].next
}

function pickWaypoint(
  containerWidth: number,
  containerHeight: number,
  currentX: number,
  currentY: number,
  contained: boolean
): { x: number; y: number } {
  const minY = containerHeight * SWIM_ZONE_TOP
  const maxY = containerHeight * SWIM_ZONE_BOTTOM
  const padding = contained ? 40 : -FISH_MARGIN * 0.5

  // Pick a point reasonably far from current position to encourage forward movement
  let x: number, y: number
  let attempts = 0
  do {
    x = randomBetween(padding, containerWidth - padding)
    y = randomBetween(minY, maxY)
    attempts++
  } while (attempts < 5 && Math.abs(x - currentX) < containerWidth * 0.25)

  return { x, y }
}

// ── Shared position registry ────────────────────────────────────────
const globalFishPositions = new Map<string, { x: number; y: number; vx: number; size: number; heading: number; speed: number }>()

// ── Component ───────────────────────────────────────────────────────
export const SwimmingFish = memo(({ fish, containerWidth, containerHeight, onHover, onLeave, onClick, index, contained = false, theme, allFishPositions }: SwimmingFishProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const stateRef = useRef<SwimmingFishState | null>(null)
  const animRef = useRef<number>(0)
  const [pos, setPos] = useState<{
    x: number; y: number; direction: 'left' | 'right'; phase: number; vy: number;
    tailPhase: number; speed: number; behavior: FishBehavior; pitch: number
  }>({ x: 0, y: 0, direction: 'right', phase: 0, vy: 0, tailPhase: 0, speed: 0, behavior: 'cruise', pitch: 0 })
  const isHovered = useRef(false)

  const fishSize = 36 + fish.tier * 8

  // Use the shared position registry (extend it to include heading & speed)
  const posRegistry = allFishPositions?.current || globalFishPositions

  // ── Initialize ──────────────────────────────────────────────────
  useEffect(() => {
    if (containerWidth === 0 || containerHeight === 0) return

    const enterFromLeft = Math.random() > 0.5
    const heading = enterFromLeft ? 0 : Math.PI // 0 = right, PI = left
    const baseSpeed = randomBetween(BASE_SPEED_MIN, BASE_SPEED_MAX)
    const preferredDepth = randomBetween(0.2, 0.7)
    const startY = randomBetween(
      containerHeight * SWIM_ZONE_TOP,
      containerHeight * SWIM_ZONE_BOTTOM
    )

    const startX = contained
      ? randomBetween(fishSize + 10, containerWidth - fishSize - 10)
      : (enterFromLeft ? -FISH_MARGIN : containerWidth + FISH_MARGIN)

    const wp = pickWaypoint(containerWidth, containerHeight, startX, startY, contained)

    stateRef.current = {
      x: startX,
      y: startY,
      heading,
      speed: baseSpeed,
      baseSpeed,
      behavior: 'cruise',
      behaviorTimer: randomBetween(180, 360),
      targetHeading: Math.atan2(wp.y - startY, wp.x - startX),
      waypointX: wp.x,
      waypointY: wp.y,
      tailPhase: Math.random() * Math.PI * 2,
      smoothPitch: 0,
      boidsSteerX: 0,
      boidsSteerY: 0,
      preferredDepth,
      entering: !contained,
      exiting: false,
      direction: enterFromLeft ? 'right' : 'left',
      phase: Math.random() * Math.PI * 2,
      spiralAngle: 0,
      spiralCenterX: 0,
      spiralCenterY: 0,
    }

    setPos({
      x: startX, y: startY,
      direction: enterFromLeft ? 'right' : 'left',
      phase: 0, vy: 0, tailPhase: 0, speed: baseSpeed, behavior: 'cruise', pitch: 0,
    })
  }, [containerWidth, containerHeight, index, contained, fishSize])

  // ── Animation loop ──────────────────────────────────────────────
  useEffect(() => {
    if (containerWidth === 0) return

    let lastTime = performance.now()

    const animate = (time: number) => {
      const rawDt = (time - lastTime) / 16
      const dt = Math.min(rawDt, 3) // clamp to avoid jumps
      lastTime = time

      const s = stateRef.current
      if (!s) {
        animRef.current = requestAnimationFrame(animate)
        return
      }

      if (!isHovered.current) {
        const cfg = BEHAVIORS[s.behavior]

        // ─── 1. Behavior timer & transitions ──────────────────
        s.behaviorTimer -= dt
        if (s.behaviorTimer <= 0) {
          let nextBehavior = weightedRandom(BEHAVIOR_TRANSITIONS[s.behavior])
          s.behavior = nextBehavior
          const nextCfg = BEHAVIORS[nextBehavior]
          s.behaviorTimer = randomBetween(nextCfg.minDuration, nextCfg.maxDuration)

          // Temple theme: chance to spiral around pagoda
          if (theme === 'temple' && (nextBehavior === 'explore' || nextBehavior === 'cruise')) {
            // Pagoda zone (2nd structure) center in screen coords
            const pagodaZone = THEME_STRUCTURE_ZONES.temple?.[1]
            if (pagodaZone && Math.random() < 0.3) {
              const pcx = ((pagodaZone.left + pagodaZone.right) / 2) * containerWidth
              const pcy = ((pagodaZone.top + pagodaZone.bottom) / 2) * containerHeight
              const distToPagoda = Math.sqrt((s.x - pcx) ** 2 + (s.y - pcy) ** 2)
              if (distToPagoda < containerWidth * 0.35) {
                s.behavior = 'spiral'
                nextBehavior = 'spiral' as FishBehavior
                s.behaviorTimer = randomBetween(200, 400)
                s.spiralCenterX = pcx
                s.spiralCenterY = pcy
                s.spiralAngle = Math.atan2(s.y - pcy, s.x - pcx)
              }
            }
          }

          // Pick a new waypoint when changing behavior
          if (nextBehavior === 'explore' || nextBehavior === 'cruise') {
            const wp = pickWaypoint(containerWidth, containerHeight, s.x, s.y, contained)
            s.waypointX = wp.x
            s.waypointY = wp.y
            s.targetHeading = Math.atan2(wp.y - s.y, wp.x - s.x)
          }

          // Dart: pick a random nearby direction
          if (nextBehavior === 'dart') {
            s.targetHeading = s.heading + randomBetween(-0.8, 0.8)
          }
        }

        // ─── 2. Target speed ──────────────────────────────────
        // Natural speed oscillation layered on behavior speed
        const speedOsc = 0.85 + 0.15 * Math.sin(s.phase * 0.6) + 0.1 * Math.sin(s.phase * 1.7)
        const targetSpeed = s.baseSpeed * cfg.speedFactor * speedOsc
        // Smoothly approach target speed
        s.speed += (targetSpeed - s.speed) * 0.04 * dt
        s.speed = Math.max(0.1, s.speed)

        // ─── 3. Waypoint steering / spiral ─────────────────────
        if (s.behavior === 'spiral') {
          // Spiral around pagoda: orbit while rising
          const spiralRadius = 60 + Math.sin(s.spiralAngle * 0.5) * 15
          s.spiralAngle += 0.02 * dt // angular velocity
          // Gradually rise (move center upward)
          s.spiralCenterY -= 0.15 * dt
          const targetX = s.spiralCenterX + Math.cos(s.spiralAngle) * spiralRadius
          const targetY = s.spiralCenterY + Math.sin(s.spiralAngle) * spiralRadius
          s.targetHeading = Math.atan2(targetY - s.y, targetX - s.x)
          s.waypointX = targetX
          s.waypointY = targetY
        } else {
          const dxWP = s.waypointX - s.x
          const dyWP = s.waypointY - s.y
          const distToWP = Math.sqrt(dxWP * dxWP + dyWP * dyWP)

          if (distToWP < 50) {
            // Reached waypoint — pick a new one
            const wp = pickWaypoint(containerWidth, containerHeight, s.x, s.y, contained)
            s.waypointX = wp.x
            s.waypointY = wp.y
          }
          s.targetHeading = Math.atan2(s.waypointY - s.y, s.waypointX - s.x)
        }

        // ─── 4. Boids: separation, alignment, cohesion ────────
        let sepX = 0, sepY = 0, sepCount = 0
        let aliDx = 0, aliDy = 0, aliCount = 0
        let cohX = 0, cohY = 0, cohCount = 0

        const sepRange = fishSize * BOIDS_SEPARATION_RANGE
        const aliRange = fishSize * BOIDS_ALIGNMENT_RANGE
        const cohRange = fishSize * BOIDS_COHESION_RANGE

        posRegistry.forEach((other, otherId) => {
          if (otherId === fish.id) return
          const dx = s.x - other.x
          const dy = s.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          // Separation — steer away from too-close neighbors
          if (dist < sepRange && dist > 0) {
            const urgency = (sepRange - dist) / sepRange
            sepX += (dx / dist) * urgency
            sepY += (dy / dist) * urgency
            sepCount++
          }

          // Alignment — match heading of nearby fish
          if (dist < aliRange && dist > 0 && 'heading' in other) {
            aliDx += Math.cos((other as any).heading || 0)
            aliDy += Math.sin((other as any).heading || 0)
            aliCount++
          }

          // Cohesion — steer toward center of nearby group
          if (dist < cohRange) {
            cohX += other.x
            cohY += other.y
            cohCount++
          }
        })

        let steerX = 0, steerY = 0

        if (sepCount > 0) {
          steerX += (sepX / sepCount) * BOIDS_SEPARATION_FORCE
          steerY += (sepY / sepCount) * BOIDS_SEPARATION_FORCE
        }
        if (aliCount > 0) {
          const avgDx = aliDx / aliCount
          const avgDy = aliDy / aliCount
          const avgHeading = Math.atan2(avgDy, avgDx)
          const diff = normalizeAngle(avgHeading - s.heading)
          steerX += Math.cos(s.heading + diff) * BOIDS_ALIGNMENT_FORCE
          steerY += Math.sin(s.heading + diff) * BOIDS_ALIGNMENT_FORCE
        }
        if (cohCount > 0) {
          const centerX = cohX / cohCount
          const centerY = cohY / cohCount
          const toCenterX = centerX - s.x
          const toCenterY = centerY - s.y
          steerX += toCenterX * BOIDS_COHESION_FORCE
          steerY += toCenterY * BOIDS_COHESION_FORCE
        }

        // ─── 5. Soft wall avoidance ───────────────────────────
        const marginX = containerWidth * WALL_TURN_MARGIN
        const marginY = containerHeight * WALL_TURN_MARGIN
        const minY = containerHeight * SWIM_ZONE_TOP
        const maxY = containerHeight * SWIM_ZONE_BOTTOM

        if (contained) {
          // Left wall
          if (s.x < marginX) {
            const urgency = 1 - s.x / marginX
            steerX += WALL_TURN_FORCE * urgency * 3
          }
          // Right wall
          if (s.x > containerWidth - marginX) {
            const urgency = 1 - (containerWidth - s.x) / marginX
            steerX -= WALL_TURN_FORCE * urgency * 3
          }
        }
        // Top boundary
        if (s.y < minY + marginY) {
          const urgency = 1 - (s.y - minY) / marginY
          steerY += WALL_TURN_FORCE * Math.max(0, urgency) * 2
        }
        // Bottom boundary
        if (s.y > maxY - marginY) {
          const urgency = 1 - (maxY - s.y) / marginY
          steerY -= WALL_TURN_FORCE * Math.max(0, urgency) * 2
        }

        // Depth preference — gentle pull toward preferred depth
        const currentDepthNorm = (s.y - minY) / (maxY - minY)
        const depthError = s.preferredDepth - currentDepthNorm
        steerY += depthError * 0.003

        // ─── 6. Structure avoidance ───────────────────────────
        const normX = s.x / containerWidth
        const normY = s.y / containerHeight
        const structureZones = (theme ? THEME_STRUCTURE_ZONES[theme] : null) || DEFAULT_STRUCTURE_ZONES
        for (const zone of structureZones) {
          const inX = normX > zone.left - 0.08 && normX < zone.right + 0.08
          const inY = normY > zone.top - 0.08 && normY < zone.bottom + 0.02
          if (inX && inY) {
            // Push away from zone center
            const zoneCX = (zone.left + zone.right) / 2
            const zoneCY = (zone.top + zone.bottom) / 2
            const awayX = normX - zoneCX
            const awayY = normY - zoneCY
            const dist = Math.sqrt(awayX * awayX + awayY * awayY) || 0.01
            steerX += (awayX / dist) * 0.04
            steerY += (awayY / dist) * 0.04
          }
        }

        // ─── 7. Compute desired heading from all steering forces ─
        // Blend waypoint heading with boids/avoidance steering
        const desiredDx = Math.cos(s.targetHeading) * 0.5 + steerX
        const desiredDy = Math.sin(s.targetHeading) * 0.5 + steerY
        const desiredHeading = Math.atan2(desiredDy, desiredDx)

        // Smoothly turn toward desired heading (the core of realistic movement)
        let headingDiff = normalizeAngle(desiredHeading - s.heading)

        // Clamp turn rate based on behavior
        const maxTurn = cfg.turnRate * dt
        if (headingDiff > maxTurn) headingDiff = maxTurn
        else if (headingDiff < -maxTurn) headingDiff = -maxTurn

        s.heading += headingDiff
        s.heading = normalizeAngle(s.heading)

        // ─── 8. Move forward along heading ────────────────────
        const vx = Math.cos(s.heading) * s.speed * dt
        const vy = Math.sin(s.heading) * s.speed * dt
        s.x += vx
        s.y += vy

        // ─── 9. Hard boundary clamping (safety net) ───────────
        if (s.y < minY) { s.y = minY + 2; s.heading = Math.abs(s.heading) < Math.PI / 2 ? 0.3 : Math.PI - 0.3 }
        if (s.y > maxY) { s.y = maxY - 2; s.heading = Math.abs(s.heading) < Math.PI / 2 ? -0.3 : Math.PI + 0.3 }

        if (contained) {
          const pad = fishSize / 2 + 5
          if (s.x < pad) { s.x = pad + 2; s.heading = randomBetween(-0.4, 0.4) }
          if (s.x > containerWidth - pad) { s.x = containerWidth - pad - 2; s.heading = randomBetween(Math.PI - 0.4, Math.PI + 0.4) }
        } else {
          // Wrap around for non-contained tanks
          if (s.x < -FISH_MARGIN - 20) {
            s.x = containerWidth + FISH_MARGIN
            s.y = randomBetween(minY, maxY)
            s.heading = Math.PI + randomBetween(-0.3, 0.3) // heading left
            s.entering = true
          } else if (s.x > containerWidth + FISH_MARGIN + 20) {
            s.x = -FISH_MARGIN
            s.y = randomBetween(minY, maxY)
            s.heading = randomBetween(-0.3, 0.3) // heading right
            s.entering = true
          }
        }

        // ─── 10. Update animation phases ──────────────────────
        s.tailPhase += 0.12 * cfg.tailFreq * dt * (s.speed / s.baseSpeed)
        s.phase += 0.04 * dt

        // Direction for flipping the SVG
        s.direction = Math.abs(s.heading) < Math.PI / 2 ? 'right' : 'left'

        // Smooth pitch — based on vertical component of heading
        const rawPitch = Math.sin(s.heading) * (180 / Math.PI) * 0.4
        s.smoothPitch += (rawPitch - s.smoothPitch) * 0.06 * dt
        s.smoothPitch = Math.max(-15, Math.min(15, s.smoothPitch))

        // ─── 11. Update registry ──────────────────────────────
        posRegistry.set(fish.id, {
          x: s.x, y: s.y,
          vx: Math.cos(s.heading) * s.speed,
          size: fishSize,
          heading: s.heading,
          speed: s.speed,
        } as any)
      }

      setPos({
        x: s.x, y: s.y,
        direction: s.direction,
        phase: s.phase,
        vy: Math.sin(s.heading) * s.speed,
        tailPhase: s.tailPhase,
        speed: s.speed,
        behavior: s.behavior,
        pitch: s.smoothPitch,
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(animRef.current)
      posRegistry.delete(fish.id)
    }
  }, [containerWidth, containerHeight, fish.id, fishSize, posRegistry, contained])

  // ── Event handlers ──────────────────────────────────────────────
  const handleMouseEnter = useCallback(() => {
    isHovered.current = true
    if (ref.current) onHover(fish, ref.current.getBoundingClientRect())
  }, [fish, onHover])

  const handleMouseLeave = useCallback(() => {
    isHovered.current = false
    onLeave()
  }, [onLeave])

  const handleClick = useCallback(() => {
    if (ref.current) onClick(fish, ref.current.getBoundingClientRect())
  }, [fish, onClick])

  // ── Render ──────────────────────────────────────────────────────
  // Tail undulation — stronger when swimming faster, very subtle when idle
  const speedRatio = pos.speed / (stateRef.current?.baseSpeed || 1.5)
  const tailSwing = Math.sin(pos.tailPhase) * (1.2 + speedRatio * 1.5)
  // Gentle vertical bob (very subtle, doesn't dominate)
  const bobAmount = Math.sin(pos.phase * 0.4) * 0.5
  // Pitch from movement direction
  const pitchDeg = pos.pitch
  const flipSign = pos.direction === 'right' ? -1 : 1

  return (
    <div
      ref={ref}
      className="absolute cursor-pointer"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y + bobAmount}px`,
        transform: `scaleX(${pos.direction === 'left' ? 1 : -1}) rotate(${pitchDeg * flipSign + tailSwing * 0.3}deg)`,
        zIndex: 10 + Math.floor(pos.y / 10),
        filter: isHovered.current
          ? `brightness(1.3) drop-shadow(0 0 12px rgba(34,211,238,0.6)) drop-shadow(0 0 4px rgba(255,255,255,0.3))`
          : `drop-shadow(0 2px 4px rgba(0,0,0,0.2))`,
        transition: 'filter 0.3s ease',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <FishSVG tier={fish.tier} size={fishSize} customization={fish.customization} id={`swim-${fish.id}`} />
    </div>
  )
})
SwimmingFish.displayName = 'SwimmingFish'
