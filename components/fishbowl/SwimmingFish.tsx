'use client'

import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { FishSVG, getTierFromScore, getTierName, type FishTier } from './FishSpecies'

export interface FishData {
  id: string
  userId: string
  name: string
  stockScore: number
  image: string | null
  tier: FishTier
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
}

interface SwimmingFishProps {
  fish: FishData
  containerWidth: number
  containerHeight: number
  onHover: (fish: FishData, rect: DOMRect) => void
  onLeave: () => void
  onClick: (fish: FishData, rect: DOMRect) => void
  index: number
}

const FISH_MARGIN = 120 // space for offscreen entry/exit
const MIN_SPEED = 0.3
const MAX_SPEED = 0.8
const SWIM_ZONE_TOP = 0.1  // top 10% off limits
const SWIM_ZONE_BOTTOM = 0.7 // bottom 30% is decoration zone

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a)
}

export const SwimmingFish = memo(({ fish, containerWidth, containerHeight, onHover, onLeave, onClick, index }: SwimmingFishProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const stateRef = useRef<SwimmingFishState | null>(null)
  const animRef = useRef<number>(0)
  const [pos, setPos] = useState<{ x: number; y: number; direction: 'left' | 'right'; phase: number }>({ x: 0, y: 0, direction: 'right', phase: 0 })
  const isHovered = useRef(false)

  const fishSize = 36 + fish.tier * 8 // bigger fish for higher tiers

  // Initialize fish position - enter from a random side
  useEffect(() => {
    if (containerWidth === 0 || containerHeight === 0) return

    const enterFromLeft = Math.random() > 0.5
    const y = randomBetween(
      containerHeight * SWIM_ZONE_TOP,
      containerHeight * SWIM_ZONE_BOTTOM
    )
    const speed = randomBetween(MIN_SPEED, MAX_SPEED)

    stateRef.current = {
      x: enterFromLeft ? -FISH_MARGIN : containerWidth + FISH_MARGIN,
      y,
      vx: enterFromLeft ? speed : -speed,
      vy: randomBetween(-0.1, 0.1),
      direction: enterFromLeft ? 'right' : 'left',
      phase: Math.random() * Math.PI * 2,
      entering: true,
      exiting: false,
    }

    setPos({ x: stateRef.current.x, y: stateRef.current.y, direction: stateRef.current.direction, phase: 0 })
  }, [containerWidth, containerHeight, index])

  // Animation loop
  useEffect(() => {
    if (containerWidth === 0) return

    let lastTime = performance.now()

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 16, 3) // normalize to ~60fps, cap at 3x
      lastTime = time

      const s = stateRef.current
      if (!s) {
        animRef.current = requestAnimationFrame(animate)
        return
      }

      // Don't move if hovered
      if (!isHovered.current) {
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

        // Small random velocity changes
        if (Math.random() < 0.02) {
          s.vy += randomBetween(-0.05, 0.05)
          s.vy = Math.max(-0.3, Math.min(0.3, s.vy))
        }

        // When fish exits one side, re-enter from opposite side
        if (s.x < -FISH_MARGIN - 20) {
          s.x = containerWidth + FISH_MARGIN
          s.y = randomBetween(minY, maxY)
          s.vx = -randomBetween(MIN_SPEED, MAX_SPEED)
          s.direction = 'left'
          s.entering = true
        } else if (s.x > containerWidth + FISH_MARGIN + 20) {
          s.x = -FISH_MARGIN
          s.y = randomBetween(minY, maxY)
          s.vx = randomBetween(MIN_SPEED, MAX_SPEED)
          s.direction = 'right'
          s.entering = true
        }

        s.direction = s.vx > 0 ? 'right' : 'left'
      }

      setPos({ x: s.x, y: s.y, direction: s.direction, phase: s.phase })
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [containerWidth, containerHeight])

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

  // Tail wag animation via CSS
  const wagAmount = Math.sin(pos.phase * 2) * 3

  return (
    <div
      ref={ref}
      className="absolute cursor-pointer transition-transform duration-100"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: `scaleX(${pos.direction === 'left' ? 1 : -1}) rotate(${wagAmount}deg)`,
        zIndex: 10 + Math.floor(pos.y / 10),
        filter: isHovered.current ? 'brightness(1.2) drop-shadow(0 0 8px rgba(255,255,255,0.5))' : 'none',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <FishSVG tier={fish.tier} size={fishSize} />
    </div>
  )
})
SwimmingFish.displayName = 'SwimmingFish'
