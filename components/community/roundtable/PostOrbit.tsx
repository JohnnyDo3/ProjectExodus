'use client'

import { useState, useEffect } from 'react'
import { TablePostCard } from './TablePostCard'

interface PostOrbitProps {
  posts: any[]
  onSelectPost: (post: any) => void
}

const MAX_VISIBLE = 12

// Inject keyframes once
const KEYFRAMES_ID = 'roundtable-orbit-keyframes'
function ensureKeyframes() {
  if (typeof document === 'undefined') return
  if (document.getElementById(KEYFRAMES_ID)) return
  const style = document.createElement('style')
  style.id = KEYFRAMES_ID
  style.textContent = `
    @keyframes roundtable-orbit {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes roundtable-counter-orbit {
      from { transform: translate(-50%, -50%) rotate(0deg); }
      to { transform: translate(-50%, -50%) rotate(-360deg); }
    }
  `
  document.head.appendChild(style)
}

/**
 * Posts orbit the outer edge of the round table.
 * The entire ring rotates slowly via CSS animation.
 * Each card counter-rotates to stay upright. Hover pauses.
 */
export function PostOrbit({ posts, onSelectPost }: PostOrbitProps) {
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    ensureKeyframes()
  }, [])

  const visiblePosts = posts.slice(0, MAX_VISIBLE)
  const n = visiblePosts.length
  if (n === 0) return null

  const orbitRadius = 38 // % of container from center

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Rotating ring — the entire div rotates, carrying all cards */}
      <div
        className="absolute inset-0"
        style={{
          animation: 'roundtable-orbit 90s linear infinite',
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {visiblePosts.map((post, i) => {
          const angle = (2 * Math.PI * i) / n
          const x = 50 + orbitRadius * Math.cos(angle)
          const y = 50 + orbitRadius * Math.sin(angle)

          return (
            <div
              key={post.id}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                // Counter-rotate to stay upright
                animation: 'roundtable-counter-orbit 90s linear infinite',
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            >
              <TablePostCard
                post={post}
                onClick={() => onSelectPost(post)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
