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
            <svg
              width={70 * bird.size}
              height={45 * bird.size}
              viewBox="0 0 70 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="bird-svg text-[var(--foreground)]"
            >
              {/* HAWK/EAGLE BODY - Angular and powerful */}
              <g className="bird-body-group">
                {/* Chest - broad and muscular */}
                <path
                  d="M 30,22 L 28,18 L 32,16 L 36,18 L 34,22 Z"
                  fill="currentColor"
                  opacity="0.95"
                  className="bird-chest"
                />
                {/* Belly */}
                <ellipse
                  cx="32"
                  cy="24"
                  rx="3"
                  ry="4"
                  fill="currentColor"
                  opacity="0.9"
                />
                {/* Head and neck */}
                <ellipse
                  cx="29"
                  cy="18"
                  rx="2.5"
                  ry="3"
                  fill="currentColor"
                  opacity="0.95"
                />
                {/* Hooked beak - raptor */}
                <path
                  d="M 27,18 Q 25,17 24,18 L 25,19 Q 26,18.5 27,18.5 Z"
                  fill="currentColor"
                  opacity="0.98"
                />
              </g>

              {/* FAN-SHAPED TAIL - eagle style, dramatic spread */}
              <g className="tail-group">
                {/* Center tail feather */}
                <path
                  d="M 37,22 Q 42,20 46,22 Q 44,23 37,23 Z"
                  fill="currentColor"
                  opacity="0.85"
                />
                {/* Upper tail feathers */}
                <path
                  d="M 37,20 Q 41,18 45,19 Q 43,20.5 37,21 Z"
                  fill="currentColor"
                  opacity="0.8"
                />
                <path
                  d="M 37,18 Q 40,16 44,17 Q 42,18.5 37,19 Z"
                  fill="currentColor"
                  opacity="0.75"
                />
                {/* Lower tail feathers */}
                <path
                  d="M 37,24 Q 41,26 45,25 Q 43,23.5 37,23 Z"
                  fill="currentColor"
                  opacity="0.8"
                />
                <path
                  d="M 37,26 Q 40,28 44,27 Q 42,25.5 37,25 Z"
                  fill="currentColor"
                  opacity="0.75"
                />
              </g>

              {/* LEFT WING - Broad raptor wing with defined feathers */}
              <g className="wing-left">
                {/* Wing shoulder */}
                <path
                  d="M 30,20 L 24,18 L 22,20 L 28,22 Z"
                  fill="currentColor"
                  opacity="0.9"
                />
                {/* Primary feathers - long and separated */}
                <path
                  d="M 22,20 Q 16,16 10,17 L 8,19 Q 12,19 18,21 L 22,22 Z"
                  fill="currentColor"
                  opacity="0.85"
                />
                <path
                  d="M 10,17 Q 6,14 3,15 L 2,17 Q 5,17 8,19 Z"
                  fill="currentColor"
                  opacity="0.75"
                />
                <path
                  d="M 6,14 Q 3,12 1,13 L 0.5,15 Q 2,14.5 5,16 Z"
                  fill="currentColor"
                  opacity="0.7"
                />
                {/* Secondary feathers */}
                <path
                  d="M 18,21 Q 14,19 11,20 L 10,22 Q 13,22 17,23 Z"
                  fill="currentColor"
                  opacity="0.82"
                />
              </g>

              {/* RIGHT WING - Broad raptor wing with defined feathers */}
              <g className="wing-right">
                {/* Wing shoulder */}
                <path
                  d="M 34,20 L 40,18 L 42,20 L 36,22 Z"
                  fill="currentColor"
                  opacity="0.9"
                />
                {/* Primary feathers - long and separated */}
                <path
                  d="M 42,20 Q 48,16 54,17 L 56,19 Q 52,19 46,21 L 42,22 Z"
                  fill="currentColor"
                  opacity="0.85"
                />
                <path
                  d="M 54,17 Q 58,14 61,15 L 62,17 Q 59,17 56,19 Z"
                  fill="currentColor"
                  opacity="0.75"
                />
                <path
                  d="M 58,14 Q 61,12 63,13 L 63.5,15 Q 62,14.5 59,16 Z"
                  fill="currentColor"
                  opacity="0.7"
                />
                {/* Secondary feathers */}
                <path
                  d="M 46,21 Q 50,19 53,20 L 54,22 Q 51,22 47,23 Z"
                  fill="currentColor"
                  opacity="0.82"
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
            left: -150px;
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
            left: calc(100% + 150px);
            transform: translateY(0px) rotate(0deg) scale(var(--bird-size));
          }
        }

        /* Body subtle movement */
        .bird-body-group {
          animation: body-shift 0.5s ease-in-out infinite;
          transform-origin: 32px 22px;
        }

        @keyframes body-shift {
          0%, 100% {
            transform: scaleY(1) scaleX(1);
          }
          50% {
            transform: scaleY(0.96) scaleX(1.03);
          }
        }

        /* Tail fanning - dramatic spread */}
        .tail-group {
          animation: tail-fan 1.6s ease-in-out infinite;
          transform-origin: 37px 22px;
        }

        @keyframes tail-fan {
          0%, 100% {
            transform: scaleX(1) scaleY(1);
          }
          50% {
            transform: scaleX(1.25) scaleY(1.15);
          }
        }

        /* Wing flapping - powerful and dramatic */
        .wing-left, .wing-right {
          animation: wing-flap-soar var(--total-cycle) ease-in-out infinite;
          transform-origin: 32px 20px;
        }

        .wing-right {
          animation-delay: 0.08s;
        }

        @keyframes wing-flap-soar {
          /* Powerful flapping */
          0% {
            transform: rotateX(0deg) scaleY(1);
          }
          6% {
            transform: rotateX(70deg) scaleY(0.2);
          }
          12% {
            transform: rotateX(0deg) scaleY(1);
          }
          18% {
            transform: rotateX(70deg) scaleY(0.2);
          }
          24% {
            transform: rotateX(0deg) scaleY(1);
          }
          30% {
            transform: rotateX(70deg) scaleY(0.2);
          }
          36% {
            transform: rotateX(0deg) scaleY(1);
          }

          /* Extended soaring */
          40% {
            transform: rotateX(-5deg) scaleY(0.98);
          }
          55% {
            transform: rotateX(-12deg) scaleY(0.94);
          }
          70% {
            transform: rotateX(-8deg) scaleY(0.96);
          }
          85% {
            transform: rotateX(-10deg) scaleY(0.95);
          }
          95% {
            transform: rotateX(-3deg) scaleY(0.98);
          }
          100% {
            transform: rotateX(0deg) scaleY(1);
          }
        }
      `}</style>
    </>
  )
}
