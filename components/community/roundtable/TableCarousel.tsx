'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { TablePostCard } from './TablePostCard'

interface TableCarouselProps {
  posts: any[]
  onPostClick: (post: any) => void
}

/**
 * Perimeter carousel — post cards orbit around the table edge.
 * Path: across the arch top → down the right side → across the bottom → up the left side.
 * Continuous loop, pauses on hover.
 */

// Given progress 0–1 around the perimeter, return { x, y } in percent of container
// The path traces: top-arch → right-side → bottom-right corner → bottom → bottom-left corner → left-side
function getPointOnPerimeter(
  progress: number,
  width: number,
  height: number,
): { x: number; y: number } {
  const p = ((progress % 1) + 1) % 1 // normalize to 0–1

  // Table shape constants (matching RoundTable.tsx)
  const archHeight = 80 // px — the dome height
  const cornerR = 24 // px — bottom corner radius

  // Inset so cards ride on the table surface, not the outer rim
  const inset = 50

  // Working dimensions (inset from edges)
  const l = inset // left
  const r = width - inset // right
  const t = inset // top baseline (arch curves above this)
  const b = height - inset // bottom
  const cx = width / 2 // center x

  // Arch: half-ellipse from left to right over the top
  const archRx = (r - l) / 2 // horizontal radius
  const archRy = Math.min(archHeight - 10, archRx * 0.15) // vertical radius, proportional

  // Segment lengths (approximate)
  // Arch (half ellipse perimeter ≈ π * sqrt((a²+b²)/2))
  const archLen = Math.PI * Math.sqrt((archRx * archRx + archRy * archRy) / 2)
  const rightLen = b - t - cornerR
  const crLen = (Math.PI * cornerR) / 2 // quarter circle
  const bottomLen = r - l - cornerR * 2
  const leftLen = b - t - cornerR
  const totalLen = archLen + rightLen + crLen + bottomLen + crLen + leftLen

  let dist = p * totalLen

  // 1) Top arch — left to right
  if (dist < archLen) {
    const frac = dist / archLen
    const angle = Math.PI * (1 - frac) // π → 0
    return {
      x: cx + archRx * Math.cos(angle),
      y: t - archRy * Math.sin(angle) + archRy, // dome curves up from baseline
    }
  }
  dist -= archLen

  // 2) Right side — top to bottom
  if (dist < rightLen) {
    const frac = dist / rightLen
    return { x: r, y: t + frac * rightLen }
  }
  dist -= rightLen

  // 3) Bottom-right corner
  if (dist < crLen) {
    const frac = dist / crLen
    const angle = -Math.PI / 2 + frac * (Math.PI / 2) // -90° → 0°
    return {
      x: r - cornerR + cornerR * Math.cos(angle),
      y: b - cornerR + cornerR * Math.sin(angle) + cornerR,
    }
  }
  dist -= crLen

  // 4) Bottom — right to left
  if (dist < bottomLen) {
    const frac = dist / bottomLen
    return { x: r - cornerR - frac * bottomLen, y: b }
  }
  dist -= bottomLen

  // 5) Bottom-left corner
  if (dist < crLen) {
    const frac = dist / crLen
    const angle = 0 + frac * (Math.PI / 2) // 0° → 90°
    return {
      x: l + cornerR - cornerR * Math.cos(angle),
      y: b - cornerR + cornerR * Math.sin(Math.PI / 2 - angle) + cornerR,
    }
  }
  dist -= crLen

  // 6) Left side — bottom to top
  const frac = Math.min(dist / leftLen, 1)
  return { x: l, y: b - frac * leftLen }
}

// Card dimensions
const CARD_W = 220
const CARD_H = 140

export function TableCarousel({ posts, onPostClick }: TableCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const pausedRef = useRef(false)
  const animRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([])
  const [dims, setDims] = useState({ w: 0, h: 0 })

  const cardCount = posts.length
  // Speed: full orbit in ~60 seconds
  const speed = cardCount > 0 ? 1 / (Math.max(cardCount, 8) * 8) : 0 // progress per second

  const updateDims = useCallback(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setDims({ w: rect.width, h: rect.height })
  }, [])

  useEffect(() => {
    updateDims()
    window.addEventListener('resize', updateDims)
    return () => window.removeEventListener('resize', updateDims)
  }, [updateDims])

  useEffect(() => {
    if (cardCount === 0 || dims.w === 0 || dims.h === 0) return

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time
      const dt = (time - lastTimeRef.current) / 1000 // seconds
      lastTimeRef.current = time

      if (!pausedRef.current) {
        progressRef.current = (progressRef.current + speed * dt) % 1
      }

      // Distribute cards evenly around the perimeter
      const spacing = 1 / cardCount
      const newPositions = []
      for (let i = 0; i < cardCount; i++) {
        const p = (progressRef.current + i * spacing) % 1
        newPositions.push(getPointOnPerimeter(p, dims.w, dims.h))
      }
      setPositions(newPositions)
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [cardCount, dims.w, dims.h, speed])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ borderRadius: '50% 50% 24px 24px / 80px 80px 24px 24px' }}
    >
      {posts.map((post, i) => {
        const pos = positions[i]
        if (!pos) return null

        return (
          <div
            key={post.id}
            className="absolute pointer-events-auto"
            style={{
              width: CARD_W,
              height: CARD_H,
              left: pos.x - CARD_W / 2,
              top: pos.y - CARD_H / 2,
              transition: 'none',
              willChange: 'left, top',
            }}
            onMouseEnter={() => { pausedRef.current = true }}
            onMouseLeave={() => { pausedRef.current = false }}
          >
            <TablePostCard
              post={post}
              onClick={() => onPostClick(post)}
            />
          </div>
        )
      })}
    </div>
  )
}
