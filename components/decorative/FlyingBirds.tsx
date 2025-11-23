'use client'

import { useEffect, useState } from 'react'

interface Bird {
  id: number
  y: number
  speed: number
  delay: number
  size: number
  amplitude: number
  flapCycleDuration: number
  glideDuration: number
}

export function FlyingBirds() {
  const [birds, setBirds] = useState<Bird[]>([])

  useEffect(() => {
    // Initialize 8 birds with varied characteristics for natural flight
    const initialBirds: Bird[] = [
      { id: 1, y: 12, speed: 38, delay: 0, size: 1.0, amplitude: 50, flapCycleDuration: 2.0, glideDuration: 3.5 },
      { id: 2, y: 22, speed: 32, delay: 3, size: 0.9, amplitude: 55, flapCycleDuration: 1.8, glideDuration: 3.8 },
      { id: 3, y: 38, speed: 35, delay: 7, size: 1.05, amplitude: 45, flapCycleDuration: 2.2, glideDuration: 3.2 },
      { id: 4, y: 18, speed: 42, delay: 11, size: 1.15, amplitude: 60, flapCycleDuration: 2.1, glideDuration: 3.6 },
      { id: 5, y: 28, speed: 34, delay: 15, size: 0.95, amplitude: 52, flapCycleDuration: 1.9, glideDuration: 3.4 },
      { id: 6, y: 8, speed: 40, delay: 19, size: 1.1, amplitude: 48, flapCycleDuration: 2.0, glideDuration: 3.7 },
      { id: 7, y: 33, speed: 36, delay: 23, size: 0.85, amplitude: 58, flapCycleDuration: 1.85, glideDuration: 3.3 },
      { id: 8, y: 16, speed: 39, delay: 27, size: 1.0, amplitude: 50, flapCycleDuration: 2.05, glideDuration: 3.5 },
    ]
    setBirds(initialBirds)
  }, [])

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {birds.map((bird) => (
          <div
            key={bird.id}
            className="bird-container absolute opacity-35 dark:opacity-25"
            style={{
              top: `${bird.y}%`,
              // @ts-ignore - CSS custom properties
              '--bird-speed': `${bird.speed}s`,
              '--bird-delay': `${bird.delay}s`,
              '--bird-amplitude': `${bird.amplitude}px`,
              '--bird-size': bird.size,
              '--flap-cycle': `${bird.flapCycleDuration}s`,
              '--glide-duration': `${bird.glideDuration}s`,
              '--total-cycle': `${bird.flapCycleDuration + bird.glideDuration}s`,
            }}
          >
            {/* Simple classic bird silhouette - compact W shape */}
            <svg
              width={30 * bird.size}
              height={16 * bird.size}
              viewBox="0 0 30 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="bird-svg"
            >
              {/* Compact soaring bird shape */}
              <path
                className="bird-wings"
                d="M 2,10 Q 6,7 10,8 L 15,8 L 20,8 Q 24,7 28,10"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
              />
              {/* Small body in center */}
              <ellipse
                cx="15"
                cy="8"
                rx="1.5"
                ry="1"
                fill="currentColor"
                opacity="0.95"
              />
            </svg>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .bird-container {
          animation: fly var(--bird-speed) cubic-bezier(0.35, 0, 0.65, 1) var(--bird-delay) infinite;
          animation-fill-mode: both;
          will-change: transform, left;
        }

        @keyframes fly {
          0% {
            left: -100px;
            transform: translateY(0px) rotate(0deg) scale(var(--bird-size));
          }
          /* Flapping upward */
          8% {
            transform: translateY(calc(var(--bird-amplitude) * -0.5)) rotate(-5deg) scale(var(--bird-size));
          }
          16% {
            transform: translateY(calc(var(--bird-amplitude) * -0.9)) rotate(-7deg) scale(var(--bird-size));
          }
          24% {
            transform: translateY(calc(var(--bird-amplitude) * -1.15)) rotate(-6deg) scale(var(--bird-size));
          }
          32% {
            transform: translateY(calc(var(--bird-amplitude) * -1.3)) rotate(-4deg) scale(var(--bird-size));
          }
          /* Swooping glide down */
          45% {
            transform: translateY(calc(var(--bird-amplitude) * -0.8)) rotate(0deg) scale(var(--bird-size));
          }
          60% {
            transform: translateY(calc(var(--bird-amplitude) * -0.2)) rotate(4deg) scale(var(--bird-size));
          }
          75% {
            transform: translateY(calc(var(--bird-amplitude) * 0.4)) rotate(5deg) scale(var(--bird-size));
          }
          90% {
            transform: translateY(calc(var(--bird-amplitude) * 0.2)) rotate(2deg) scale(var(--bird-size));
          }
          100% {
            left: calc(100% + 100px);
            transform: translateY(0px) rotate(0deg) scale(var(--bird-size));
          }
        }

        /* Wing flapping - simple scale animation */
        .bird-wings {
          animation: wing-beat var(--total-cycle) ease-in-out infinite;
          transform-origin: 15px 8px;
          transform-box: fill-box;
        }

        @keyframes wing-beat {
          /* Flapping phase - wings compress vertically */
          0% {
            transform: scaleY(1);
          }
          6% {
            transform: scaleY(0.5);
          }
          12% {
            transform: scaleY(1);
          }
          18% {
            transform: scaleY(0.5);
          }
          24% {
            transform: scaleY(1);
          }
          30% {
            transform: scaleY(0.5);
          }
          36% {
            transform: scaleY(1);
          }
          /* Gliding - minimal movement */
          45%, 100% {
            transform: scaleY(0.95);
          }
        }
      `}</style>
    </>
  )
}
