'use client'

import { useEffect, useState } from 'react'

interface Bird {
  id: number
  y: number
  speed: number
  delay: number
  size: number
  amplitude: number
  flapSpeed: number
}

export function FlyingBirds() {
  const [birds, setBirds] = useState<Bird[]>([])

  useEffect(() => {
    // Initialize 8 birds with varied characteristics for natural flight
    const initialBirds: Bird[] = [
      { id: 1, y: 12, speed: 35, delay: 0, size: 1.0, amplitude: 30, flapSpeed: 0.25 },
      { id: 2, y: 22, speed: 28, delay: 3, size: 0.85, amplitude: 35, flapSpeed: 0.2 },
      { id: 3, y: 38, speed: 32, delay: 7, size: 0.95, amplitude: 25, flapSpeed: 0.3 },
      { id: 4, y: 18, speed: 40, delay: 11, size: 1.1, amplitude: 40, flapSpeed: 0.22 },
      { id: 5, y: 28, speed: 30, delay: 15, size: 0.9, amplitude: 32, flapSpeed: 0.28 },
      { id: 6, y: 8, speed: 38, delay: 19, size: 1.05, amplitude: 28, flapSpeed: 0.26 },
      { id: 7, y: 33, speed: 34, delay: 23, size: 0.88, amplitude: 38, flapSpeed: 0.19 },
      { id: 8, y: 16, speed: 36, delay: 27, size: 0.98, amplitude: 30, flapSpeed: 0.24 },
    ]
    setBirds(initialBirds)
  }, [])

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {birds.map((bird) => (
          <div
            key={bird.id}
            className="bird-container absolute opacity-30 dark:opacity-20"
            style={{
              top: `${bird.y}%`,
              // @ts-ignore - CSS custom properties
              '--bird-speed': `${bird.speed}s`,
              '--bird-delay': `${bird.delay}s`,
              '--bird-amplitude': `${bird.amplitude}px`,
              '--bird-size': bird.size,
              '--flap-speed': `${bird.flapSpeed}s`,
            }}
          >
            <svg
              width={24 * bird.size}
              height={16 * bird.size}
              viewBox="0 0 24 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="bird-svg text-[var(--foreground)]"
            >
              {/* Bird body */}
              <ellipse cx="12" cy="8" rx="2.5" ry="3" fill="currentColor" opacity="0.9" />

              {/* Left wing */}
              <path
                d="M 12,8 Q 8,3 4,5 L 2,7 Q 4,6 8,8 Q 10,9 12,8 Z"
                fill="currentColor"
                opacity="0.85"
                className="wing-left"
              />

              {/* Right wing */}
              <path
                d="M 12,8 Q 16,3 20,5 L 22,7 Q 20,6 16,8 Q 14,9 12,8 Z"
                fill="currentColor"
                opacity="0.85"
                className="wing-right"
              />

              {/* Head */}
              <circle cx="12" cy="6" r="1.2" fill="currentColor" opacity="0.95" />
            </svg>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .bird-container {
          animation: fly var(--bird-speed) cubic-bezier(0.4, 0, 0.6, 1) var(--bird-delay) infinite;
          animation-fill-mode: both;
          will-change: transform, left;
        }

        @keyframes fly {
          0% {
            left: -120px;
            transform: translateY(0px) rotate(0deg) scale(var(--bird-size));
          }
          10% {
            transform: translateY(calc(var(--bird-amplitude) * -0.3)) rotate(-3deg) scale(var(--bird-size));
          }
          20% {
            transform: translateY(calc(var(--bird-amplitude) * -0.7)) rotate(-5deg) scale(var(--bird-size));
          }
          30% {
            transform: translateY(calc(var(--bird-amplitude) * -1)) rotate(-4deg) scale(var(--bird-size));
          }
          40% {
            transform: translateY(calc(var(--bird-amplitude) * -0.6)) rotate(-2deg) scale(var(--bird-size));
          }
          50% {
            transform: translateY(0px) rotate(0deg) scale(var(--bird-size));
          }
          60% {
            transform: translateY(calc(var(--bird-amplitude) * 0.6)) rotate(3deg) scale(var(--bird-size));
          }
          70% {
            transform: translateY(calc(var(--bird-amplitude) * 1)) rotate(5deg) scale(var(--bird-size));
          }
          80% {
            transform: translateY(calc(var(--bird-amplitude) * 0.7)) rotate(4deg) scale(var(--bird-size));
          }
          90% {
            transform: translateY(calc(var(--bird-amplitude) * 0.3)) rotate(2deg) scale(var(--bird-size));
          }
          100% {
            left: calc(100% + 120px);
            transform: translateY(0px) rotate(0deg) scale(var(--bird-size));
          }
        }

        .bird-svg {
          animation: body-bob var(--flap-speed) ease-in-out infinite;
          transform-origin: center center;
        }

        @keyframes body-bob {
          0%, 100% {
            transform: scaleY(1) scaleX(1);
          }
          50% {
            transform: scaleY(0.85) scaleX(1.08);
          }
        }

        .wing-left, .wing-right {
          animation: wing-beat var(--flap-speed) ease-in-out infinite;
          transform-origin: 12px 8px;
        }

        .wing-left {
          animation-delay: calc(var(--flap-speed) * -0.1);
        }

        .wing-right {
          animation-delay: calc(var(--flap-speed) * 0.1);
        }

        @keyframes wing-beat {
          0%, 100% {
            transform: scaleY(1) translateY(0px);
          }
          25% {
            transform: scaleY(0.4) translateY(-1px);
          }
          50% {
            transform: scaleY(0.2) translateY(-1.5px);
          }
          75% {
            transform: scaleY(0.4) translateY(-1px);
          }
        }
      `}</style>
    </>
  )
}
