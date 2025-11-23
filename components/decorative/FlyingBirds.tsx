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
            {/* Simple, clean hawk/eagle silhouette */}
            <svg
              width={60 * bird.size}
              height={35 * bird.size}
              viewBox="0 0 60 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="bird-svg text-[var(--foreground)]"
            >
              {/* Body - simple streamlined shape */}
              <ellipse
                cx="28"
                cy="17"
                rx="4"
                ry="2.5"
                fill="currentColor"
                opacity="0.95"
              />

              {/* Head - front of bird */}
              <circle
                cx="24"
                cy="16"
                r="1.8"
                fill="currentColor"
                opacity="0.95"
              />

              {/* Beak pointing forward */}
              <path
                d="M 22.5,16 L 20,16"
                stroke="currentColor"
                strokeWidth="0.8"
                opacity="0.9"
              />

              {/* LEFT WING - Classic bird wing shape */}
              <g className="wing-left">
                <path
                  d="M 26,17 Q 20,12 14,13 Q 10,14 6,15 Q 4,15.5 2,16 Q 5,17 10,17 Q 18,17.5 26,18"
                  fill="currentColor"
                  opacity="0.88"
                />
                {/* Wing tip feathers */}
                <path
                  d="M 6,15 Q 3,14 1,14.5 L 0,15.5 Q 2,15.5 4,16"
                  fill="currentColor"
                  opacity="0.75"
                />
              </g>

              {/* RIGHT WING - Classic bird wing shape */}
              <g className="wing-right">
                <path
                  d="M 30,17 Q 36,12 42,13 Q 46,14 50,15 Q 52,15.5 54,16 Q 51,17 46,17 Q 38,17.5 30,18"
                  fill="currentColor"
                  opacity="0.88"
                />
                {/* Wing tip feathers */}
                <path
                  d="M 50,15 Q 53,14 55,14.5 L 56,15.5 Q 54,15.5 52,16"
                  fill="currentColor"
                  opacity="0.75"
                />
              </g>

              {/* TAIL - Pointing BACKWARD (to the right) */}
              <g className="tail-group">
                {/* Fan-shaped tail spreading backward */}
                <path
                  d="M 32,16 Q 36,14 40,15"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                  opacity="0.85"
                />
                <path
                  d="M 32,17 Q 37,17 42,17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.9"
                />
                <path
                  d="M 32,18 Q 36,20 40,19"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                  opacity="0.85"
                />
              </g>
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
            left: -120px;
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
            left: calc(100% + 120px);
            transform: translateY(0px) rotate(0deg) scale(var(--bird-size));
          }
        }

        /* Tail subtle spread */}
        .tail-group {
          animation: tail-spread 1.8s ease-in-out infinite;
          transform-origin: 32px 17px;
        }

        @keyframes tail-spread {
          0%, 100% {
            transform: scaleX(1);
          }
          50% {
            transform: scaleX(1.15);
          }
        }

        /* Wing flapping */}
        .wing-left, .wing-right {
          animation: wing-flap-soar var(--total-cycle) ease-in-out infinite;
          transform-origin: 28px 17px;
        }

        .wing-right {
          animation-delay: 0.08s;
        }

        @keyframes wing-flap-soar {
          /* Powerful flapping - compress wings vertically */
          0% {
            transform: scaleY(1) translateY(0px);
          }
          6% {
            transform: scaleY(0.2) translateY(-3px);
          }
          12% {
            transform: scaleY(1) translateY(0px);
          }
          18% {
            transform: scaleY(0.2) translateY(-3px);
          }
          24% {
            transform: scaleY(1) translateY(0px);
          }
          30% {
            transform: scaleY(0.2) translateY(-3px);
          }
          36% {
            transform: scaleY(1) translateY(0px);
          }

          /* Extended soaring - wings mostly level with slight adjustments */
          45% {
            transform: scaleY(0.95) translateY(-0.5px);
          }
          60% {
            transform: scaleY(0.92) translateY(-1px);
          }
          75% {
            transform: scaleY(0.94) translateY(-0.8px);
          }
          90% {
            transform: scaleY(0.96) translateY(-0.3px);
          }
          100% {
            transform: scaleY(1) translateY(0px);
          }
        }
      `}</style>
    </>
  )
}
