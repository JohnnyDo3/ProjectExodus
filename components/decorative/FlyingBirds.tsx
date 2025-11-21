'use client'

import { useEffect, useState } from 'react'

interface Bird {
  id: number
  x: number
  y: number
  speed: number
  delay: number
}

export function FlyingBirds() {
  const [birds, setBirds] = useState<Bird[]>([])

  useEffect(() => {
    // Initialize 5 birds at different positions
    const initialBirds: Bird[] = [
      { id: 1, x: -100, y: 15, speed: 50, delay: 0 },
      { id: 2, x: -100, y: 25, speed: 40, delay: 2 },
      { id: 3, x: -100, y: 35, speed: 45, delay: 4 },
      { id: 4, x: -100, y: 20, speed: 55, delay: 6 },
      { id: 5, x: -100, y: 30, speed: 48, delay: 8 },
    ]
    setBirds(initialBirds)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {birds.map((bird) => (
        <div
          key={bird.id}
          className="absolute opacity-30 dark:opacity-20"
          style={{
            top: `${bird.y}%`,
            animation: `fly ${bird.speed}s linear ${bird.delay}s infinite`,
            animationFillMode: 'both',
          }}
        >
          <svg
            width="24"
            height="16"
            viewBox="0 0 24 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[var(--foreground)]"
          >
            {/* Bird silhouette in flight */}
            <path
              d="M 12,8 Q 8,4 4,6 L 2,8 Q 4,7 8,8 Q 10,9 12,8 Z"
              fill="currentColor"
            />
            <path
              d="M 12,8 Q 16,4 20,6 L 22,8 Q 20,7 16,8 Q 14,9 12,8 Z"
              fill="currentColor"
            />
            <ellipse cx="12" cy="8" rx="2" ry="2.5" fill="currentColor" />
          </svg>
        </div>
      ))}

      <style jsx>{`
        @keyframes fly {
          0% {
            left: -100px;
            transform: translateY(0px);
          }
          25% {
            transform: translateY(-10px);
          }
          50% {
            transform: translateY(0px);
          }
          75% {
            transform: translateY(10px);
          }
          100% {
            left: calc(100% + 100px);
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  )
}
