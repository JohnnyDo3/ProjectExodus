'use client'

import { useEffect, useState } from 'react'

interface Bird {
  id: number
  x: number
  y: number
  speed: number
  delay: number
  size: number
  amplitude: number // How much it bobs up and down
  frequency: number // How fast it bobs
  curve: number // Path curvature
}

export function FlyingBirds() {
  const [birds, setBirds] = useState<Bird[]>([])

  useEffect(() => {
    // Initialize 8 birds with varied characteristics for natural flight
    const initialBirds: Bird[] = [
      { id: 1, x: -100, y: 12, speed: 35, delay: 0, size: 1.0, amplitude: 25, frequency: 1.2, curve: 0.3 },
      { id: 2, x: -100, y: 22, speed: 28, delay: 3, size: 0.85, amplitude: 30, frequency: 1.5, curve: 0.4 },
      { id: 3, x: -100, y: 38, speed: 32, delay: 7, size: 0.95, amplitude: 20, frequency: 1.0, curve: 0.25 },
      { id: 4, x: -100, y: 18, speed: 40, delay: 11, size: 1.1, amplitude: 35, frequency: 1.3, curve: 0.35 },
      { id: 5, x: -100, y: 28, speed: 30, delay: 15, size: 0.9, amplitude: 28, frequency: 1.4, curve: 0.3 },
      { id: 6, x: -100, y: 8, speed: 38, delay: 19, size: 1.05, amplitude: 22, frequency: 1.1, curve: 0.28 },
      { id: 7, x: -100, y: 33, speed: 34, delay: 23, size: 0.88, amplitude: 32, frequency: 1.6, curve: 0.42 },
      { id: 8, x: -100, y: 16, speed: 36, delay: 27, size: 0.98, amplitude: 26, frequency: 1.25, curve: 0.32 },
    ]
    setBirds(initialBirds)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {birds.map((bird) => (
        <div
          key={bird.id}
          className="absolute opacity-25 dark:opacity-15"
          style={{
            top: `${bird.y}%`,
            animation: `fly-${bird.id} ${bird.speed}s cubic-bezier(0.4, 0, 0.6, 1) ${bird.delay}s infinite`,
            animationFillMode: 'both',
            willChange: 'transform, left',
          }}
        >
          <svg
            width={24 * bird.size}
            height={16 * bird.size}
            viewBox="0 0 24 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[var(--foreground)]"
            style={{
              animation: `flap ${0.3 / bird.frequency}s ease-in-out infinite`,
              transformOrigin: 'center center',
            }}
          >
            {/* Bird body */}
            <ellipse cx="12" cy="8" rx="2.5" ry="3" fill="currentColor" opacity="0.9" />

            {/* Left wing - animated */}
            <path
              d="M 12,8 Q 8,3 4,5 L 2,7 Q 4,6 8,8 Q 10,9 12,8 Z"
              fill="currentColor"
              opacity="0.8"
              className="wing-left"
            />

            {/* Right wing - animated */}
            <path
              d="M 12,8 Q 16,3 20,5 L 22,7 Q 20,6 16,8 Q 14,9 12,8 Z"
              fill="currentColor"
              opacity="0.8"
              className="wing-right"
            />

            {/* Head */}
            <circle cx="12" cy="6" r="1.2" fill="currentColor" opacity="0.95" />
          </svg>
        </div>
      ))}

      <style jsx>{`
        ${birds.map((bird) => `
          @keyframes fly-${bird.id} {
            0% {
              left: -120px;
              transform: translateY(0px) rotate(0deg);
            }
            15% {
              transform: translateY(${-bird.amplitude * 0.4}px) rotate(-2deg);
            }
            30% {
              transform: translateY(${-bird.amplitude * 0.7}px) rotate(-3deg);
            }
            45% {
              transform: translateY(${-bird.amplitude * 0.3}px) rotate(-1deg);
            }
            60% {
              transform: translateY(${bird.amplitude * 0.5}px) rotate(2deg);
            }
            75% {
              transform: translateY(${bird.amplitude * 0.8}px) rotate(3deg);
            }
            90% {
              transform: translateY(${bird.amplitude * 0.2}px) rotate(1deg);
            }
            100% {
              left: calc(100% + 120px);
              transform: translateY(0px) rotate(0deg);
            }
          }
        `).join('\n')}

        @keyframes flap {
          0%, 100% {
            transform: scaleY(1) scaleX(1);
          }
          50% {
            transform: scaleY(0.7) scaleX(1.1);
          }
        }

        .wing-left, .wing-right {
          animation: wing-beat 0.3s ease-in-out infinite;
          transform-origin: 12px 8px;
        }

        @keyframes wing-beat {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.6);
          }
        }
      `}</style>
    </div>
  )
}
