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

interface SwimmingFishState {
  x: number
  y: number
  vx: number
  vy: number
  direction: 'left' | 'right'
  phase: number // animation phase
  entering: boolean
  exiting: boolean
  // Enhanced swimming state
  baseSpeed: number
  speedMultiplier: number // varies over time for natural speed changes
  speedPhase: number // phase for speed oscillation
  schoolingAngle: number // slight angle when near other fish
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
  allFishPositions?: React.MutableRefObject<Map<string, { x: number; y: number; vx: number; size: number }>>
}

const FISH_MARGIN = 120 // space for offscreen entry/exit
const MIN_SPEED = 0.25
const MAX_SPEED = 0.9
const SWIM_ZONE_TOP = 0.1  // top 10% off limits
const SWIM_ZONE_BOTTOM = 0.7 // bottom 30% is decoration zone

// Approximate structure zones (x ranges where structures sit, in viewBox 0-800 coords)
// Structures are rendered at scale(2), so a structure at x=200 occupies roughly x=200..360 in viewBox
// We'll define avoidance zones in percentage of container width
const STRUCTURE_ZONES = [
  { left: 0.15, right: 0.35, top: 0.55, bottom: 0.85 }, // left structure area
  { left: 0.55, right: 0.75, top: 0.55, bottom: 0.85 }, // right structure area
]

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a)
}

// Shared registry for fish positions (self-awareness)
const globalFishPositions = new Map<string, { x: number; y: number; vx: number; size: number }>()

export const SwimmingFish = memo(({ fish, containerWidth, containerHeight, onHover, onLeave, onClick, index, contained = false, allFishPositions }: SwimmingFishProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const stateRef = useRef<SwimmingFishState | null>(null)
  const animRef = useRef<number>(0)
  const [pos, setPos] = useState<{ x: number; y: number; direction: 'left' | 'right'; phase: number; vy: number }>({ x: 0, y: 0, direction: 'right', phase: 0, vy: 0 })
  const isHovered = useRef(false)

  const fishSize = 36 + fish.tier * 8 // bigger fish for higher tiers

  // Use the shared position registry
  const posRegistry = allFishPositions?.current || globalFishPositions

  // Initialize fish position
  useEffect(() => {
    if (containerWidth === 0 || containerHeight === 0) return

    const enterFromLeft = Math.random() > 0.5
    const y = randomBetween(
      containerHeight * SWIM_ZONE_TOP,
      containerHeight * SWIM_ZONE_BOTTOM
    )
    const baseSpeed = randomBetween(MIN_SPEED, MAX_SPEED)

    if (contained) {
      const padding = fishSize + 10
      stateRef.current = {
        x: randomBetween(padding, containerWidth - padding),
        y,
        vx: enterFromLeft ? baseSpeed : -baseSpeed,
        vy: randomBetween(-0.1, 0.1),
        direction: enterFromLeft ? 'right' : 'left',
        phase: Math.random() * Math.PI * 2,
        entering: false,
        exiting: false,
        baseSpeed,
        speedMultiplier: 1,
        speedPhase: Math.random() * Math.PI * 2,
        schoolingAngle: 0,
      }
    } else {
      stateRef.current = {
        x: enterFromLeft ? -FISH_MARGIN : containerWidth + FISH_MARGIN,
        y,
        vx: enterFromLeft ? baseSpeed : -baseSpeed,
        vy: randomBetween(-0.1, 0.1),
        direction: enterFromLeft ? 'right' : 'left',
        phase: Math.random() * Math.PI * 2,
        entering: true,
        exiting: false,
        baseSpeed,
        speedMultiplier: 1,
        speedPhase: Math.random() * Math.PI * 2,
        schoolingAngle: 0,
      }
    }

    setPos({ x: stateRef.current.x, y: stateRef.current.y, direction: stateRef.current.direction, phase: 0, vy: 0 })
  }, [containerWidth, containerHeight, index, contained, fishSize])

  // Animation loop with enhanced mechanics
  useEffect(() => {
    if (containerWidth === 0) return

    let lastTime = performance.now()

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 16, 3)
      lastTime = time

      const s = stateRef.current
      if (!s) {
        animRef.current = requestAnimationFrame(animate)
        return
      }

      // Don't move if hovered
      if (!isHovered.current) {
        // Update speed phase — creates natural speed variation over time
        s.speedPhase += 0.008 * dt
        s.speedMultiplier = 0.6 + 0.4 * Math.sin(s.speedPhase) + 0.15 * Math.sin(s.speedPhase * 2.3)
        // Clamp multiplier so fish never fully stop
        s.speedMultiplier = Math.max(0.3, Math.min(1.4, s.speedMultiplier))

        const currentSpeed = s.baseSpeed * s.speedMultiplier
        const speedSign = s.vx > 0 ? 1 : -1
        s.vx = speedSign * currentSpeed

        // Self-awareness: detect nearby fish and adjust course
        let avoidDx = 0
        let avoidDy = 0
        const awarenessRadius = fishSize * 3
        posRegistry.forEach((otherPos, otherId) => {
          if (otherId === fish.id) return
          const dx = s.x - otherPos.x
          const dy = s.y - otherPos.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < awarenessRadius && dist > 0) {
            // Repulsion force inversely proportional to distance
            const force = (awarenessRadius - dist) / awarenessRadius * 0.08
            avoidDx += (dx / dist) * force
            avoidDy += (dy / dist) * force
          }
        })

        // Apply avoidance gently
        s.vy += avoidDy * dt
        // Don't override horizontal direction from avoidance, just nudge vertically

        // Structure awareness — if heading into a structure zone, nudge upward
        const normX = s.x / containerWidth
        const normY = s.y / containerHeight
        for (const zone of STRUCTURE_ZONES) {
          if (normX > zone.left - 0.05 && normX < zone.right + 0.05 &&
              normY > zone.top - 0.05 && normY < zone.bottom) {
            // Fish is near or in a structure zone — nudge upward
            const penetration = Math.min(
              normX - zone.left, zone.right - normX,
              normY - zone.top
            )
            if (penetration > 0) {
              s.vy -= 0.04 * dt * Math.min(penetration * 20, 1)
            }
          }
        }

        s.x += s.vx * dt
        s.y += s.vy * dt
        s.phase += 0.05 * dt

        // Gentle vertical drift with sine wave
        s.y += Math.sin(s.phase) * 0.15 * dt

        // Bounce off vertical bounds
        const minY = containerHeight * SWIM_ZONE_TOP
        const maxY = containerHeight * SWIM_ZONE_BOTTOM
        if (s.y < minY) { s.y = minY; s.vy = Math.abs(s.vy) }
        if (s.y > maxY) { s.y = maxY; s.vy = -Math.abs(s.vy) }

        // Random vertical velocity changes
        if (Math.random() < 0.02) {
          s.vy += randomBetween(-0.06, 0.06)
          s.vy = Math.max(-0.35, Math.min(0.35, s.vy))
        }

        // Occasional base speed change for natural variation
        if (Math.random() < 0.005) {
          s.baseSpeed = randomBetween(MIN_SPEED, MAX_SPEED)
        }

        if (contained) {
          const padding = fishSize / 2 + 8
          if (s.x <= padding) {
            s.x = padding
            s.vx = randomBetween(MIN_SPEED, MAX_SPEED)
            s.direction = 'right'
            s.baseSpeed = Math.abs(s.vx)
          } else if (s.x >= containerWidth - padding) {
            s.x = containerWidth - padding
            s.vx = -randomBetween(MIN_SPEED, MAX_SPEED)
            s.direction = 'left'
            s.baseSpeed = Math.abs(s.vx)
          }
        } else {
          if (s.x < -FISH_MARGIN - 20) {
            s.x = containerWidth + FISH_MARGIN
            s.y = randomBetween(minY, maxY)
            s.vx = -randomBetween(MIN_SPEED, MAX_SPEED)
            s.direction = 'left'
            s.baseSpeed = Math.abs(s.vx)
            s.entering = true
          } else if (s.x > containerWidth + FISH_MARGIN + 20) {
            s.x = -FISH_MARGIN
            s.y = randomBetween(minY, maxY)
            s.vx = randomBetween(MIN_SPEED, MAX_SPEED)
            s.direction = 'right'
            s.baseSpeed = Math.abs(s.vx)
            s.entering = true
          }
        }

        s.direction = s.vx > 0 ? 'right' : 'left'

        // Update shared position registry for self-awareness
        posRegistry.set(fish.id, { x: s.x, y: s.y, vx: s.vx, size: fishSize })
      }

      setPos({ x: s.x, y: s.y, direction: s.direction, phase: s.phase, vy: s.vy })
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(animRef.current)
      posRegistry.delete(fish.id)
    }
  }, [containerWidth, containerHeight, fish.id, fishSize, posRegistry])

  const handleMouseEnter = useCallback(() => {
    isHovered.current = true
    if (ref.current) {
      onHover(fish, ref.current.getBoundingClientRect())
    }
  }, [fish, onHover])

  const handleMouseLeave = useCallback(() => {
    isHovered.current = false
    onLeave()
  }, [onLeave])

  const handleClick = useCallback(() => {
    if (ref.current) {
      onClick(fish, ref.current.getBoundingClientRect())
    }
  }, [fish, onClick])

  // Tail wag animation — faster wag when swimming faster
  const speedFactor = stateRef.current?.speedMultiplier ?? 1
  const wagAmount = Math.sin(pos.phase * 2) * (3 + speedFactor * 2)
  // Subtle bob for liveliness
  const bobAmount = Math.sin(pos.phase * 1.3) * 1.5
  // Pitch angle — head points in direction of vertical movement
  // Clamp to ±30 degrees for natural look; flip sign when facing left
  const pitchRaw = Math.atan2(pos.vy, Math.abs(stateRef.current?.vx ?? 1)) * (180 / Math.PI)
  const pitchDeg = Math.max(-30, Math.min(30, pitchRaw))
  const flipSign = pos.direction === 'right' ? -1 : 1

  return (
    <div
      ref={ref}
      className="absolute cursor-pointer"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y + bobAmount}px`,
        transform: `scaleX(${pos.direction === 'left' ? 1 : -1}) rotate(${pitchDeg * flipSign + wagAmount}deg)`,
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
