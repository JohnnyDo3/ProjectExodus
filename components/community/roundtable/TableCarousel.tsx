'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { TablePostCard } from './TablePostCard'

interface TableCarouselProps {
  posts: any[]
  onPostClick: (post: any) => void
}

/**
 * Perimeter carousel — post cards orbit the outer container (the space
 * around the smaller centered table). Path is a rounded rectangle
 * tracing the container edges. Cards move clockwise continuously.
 */

// Given progress 0–1, return {x, y} on a rounded-rect perimeter
function getPointOnRect(
  progress: number,
  width: number,
  height: number,
): { x: number; y: number } {
  const p = ((progress % 1) + 1) % 1

  // Margin from container edge so cards don't clip
  const mx = 20
  const my = 20
  const cornerR = 32

  const l = mx
  const r = width - mx
  const t = my
  const b = height - my
  const w = r - l
  const h = b - t
  const cr = Math.min(cornerR, w / 4, h / 4)

  // Segment lengths
  const topLen = w - cr * 2
  const rightLen = h - cr * 2
  const bottomLen = w - cr * 2
  const leftLen = h - cr * 2
  const crLen = (Math.PI * cr) / 2 // quarter circle arc
  const totalLen = topLen + crLen + rightLen + crLen + bottomLen + crLen + leftLen + crLen

  let dist = p * totalLen

  // 1) Top edge — left to right
  if (dist < topLen) {
    const frac = dist / topLen
    return { x: l + cr + frac * topLen, y: t }
  }
  dist -= topLen

  // 2) Top-right corner
  if (dist < crLen) {
    const frac = dist / crLen
    const angle = -Math.PI / 2 + frac * (Math.PI / 2)
    return {
      x: r - cr + cr * Math.cos(angle),
      y: t + cr + cr * Math.sin(angle),
    }
  }
  dist -= crLen

  // 3) Right edge — top to bottom
  if (dist < rightLen) {
    const frac = dist / rightLen
    return { x: r, y: t + cr + frac * rightLen }
  }
  dist -= rightLen

  // 4) Bottom-right corner
  if (dist < crLen) {
    const frac = dist / crLen
    const angle = 0 + frac * (Math.PI / 2)
    return {
      x: r - cr + cr * Math.cos(angle),
      y: b - cr + cr * Math.sin(angle),
    }
  }
  dist -= crLen

  // 5) Bottom edge — right to left
  if (dist < bottomLen) {
    const frac = dist / bottomLen
    return { x: r - cr - frac * bottomLen, y: b }
  }
  dist -= bottomLen

  // 6) Bottom-left corner
  if (dist < crLen) {
    const frac = dist / crLen
    const angle = Math.PI / 2 + frac * (Math.PI / 2)
    return {
      x: l + cr + cr * Math.cos(angle),
      y: b - cr + cr * Math.sin(angle),
    }
  }
  dist -= crLen

  // 7) Left edge — bottom to top
  if (dist < leftLen) {
    const frac = dist / leftLen
    return { x: l, y: b - cr - frac * leftLen }
  }
  dist -= leftLen

  // 8) Top-left corner
  const frac = Math.min(dist / crLen, 1)
  const angle = Math.PI + frac * (Math.PI / 2)
  return {
    x: l + cr + cr * Math.cos(angle),
    y: t + cr + cr * Math.sin(angle),
  }
}

// Card dimensions
const CARD_W = 220
const CARD_H = 130

export function TableCarousel({ posts, onPostClick }: TableCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const pausedRef = useRef(false)
  const animRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([])
  const [dims, setDims] = useState({ w: 0, h: 0 })

  const cardCount = posts.length
  // Full orbit in ~45 seconds regardless of card count
  const speed = 1 / 45

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
      const dt = (time - lastTimeRef.current) / 1000
      lastTimeRef.current = time

      if (!pausedRef.current) {
        progressRef.current = (progressRef.current + speed * dt) % 1
      }

      const spacing = 1 / cardCount
      const newPositions = []
      for (let i = 0; i < cardCount; i++) {
        const p = (progressRef.current + i * spacing) % 1
        newPositions.push(getPointOnRect(p, dims.w, dims.h))
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
      className="absolute inset-0 pointer-events-none"
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
              willChange: 'transform',
              transform: `translate3d(0,0,0)`,
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
