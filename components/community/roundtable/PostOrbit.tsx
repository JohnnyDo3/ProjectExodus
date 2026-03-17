'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { TablePostCard } from './TablePostCard'

interface PostOrbitProps {
  posts: any[]
  onSelectPost: (post: any) => void
}

const MAX_VISIBLE = 12
const ORBIT_SPEED = (2 * Math.PI) / 60 // one revolution per 60 seconds

export function PostOrbit({ posts, onSelectPost }: PostOrbitProps) {
  const [rotationOffset, setRotationOffset] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (isPaused || prefersReducedMotion.current) return

    const animate = (timestamp: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = timestamp
      const delta = (timestamp - lastTimeRef.current) / 1000 // seconds
      lastTimeRef.current = timestamp
      setRotationOffset(prev => prev + ORBIT_SPEED * delta)
      rafRef.current = requestAnimationFrame(animate)
    }

    lastTimeRef.current = 0
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isPaused])

  const visiblePosts = posts.slice(0, MAX_VISIBLE)
  const n = visiblePosts.length

  const getPostPosition = useCallback((index: number) => {
    if (n === 0) return { x: 0, y: 0, scale: 1, opacity: 1, zIndex: 1 }

    const angle = (2 * Math.PI * index / n) + rotationOffset
    const radiusX = 42 // % of container width
    const radiusY = 38 // % of container height

    const x = 50 + radiusX * Math.cos(angle) // center + offset
    const y = 50 + radiusY * Math.sin(angle)

    // Posts at bottom (sin > 0) are "closer" to viewer - bigger and brighter
    const depth = Math.sin(angle)
    const scale = 0.75 + 0.3 * ((depth + 1) / 2) // 0.75 to 1.05
    const opacity = 0.5 + 0.5 * ((depth + 1) / 2) // 0.5 to 1.0
    const zIndex = Math.round(10 + 10 * depth)

    return { x, y, scale, opacity, zIndex }
  }, [n, rotationOffset])

  if (n === 0) return null

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {visiblePosts.map((post, i) => {
        const pos = getPostPosition(i)
        return (
          <TablePostCard
            key={post.id}
            post={post}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: `translate(-50%, -50%) scale(${pos.scale})`,
              opacity: pos.opacity,
              zIndex: pos.zIndex,
              transition: 'opacity 0.3s ease',
            }}
            onClick={() => onSelectPost(post)}
          />
        )
      })}
    </div>
  )
}
