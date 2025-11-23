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
      { id: 1, y: 12, speed: 35, delay: 0, size: 1.0, amplitude: 30, flapCycleDuration: 2.5, glideDuration: 1.8 },
      { id: 2, y: 22, speed: 28, delay: 3, size: 0.85, amplitude: 35, flapCycleDuration: 2.2, glideDuration: 2.0 },
      { id: 3, y: 38, speed: 32, delay: 7, size: 0.95, amplitude: 25, flapCycleDuration: 2.8, glideDuration: 1.5 },
      { id: 4, y: 18, speed: 40, delay: 11, size: 1.1, amplitude: 40, flapCycleDuration: 2.6, glideDuration: 1.7 },
      { id: 5, y: 28, speed: 30, delay: 15, size: 0.9, amplitude: 32, flapCycleDuration: 2.4, glideDuration: 1.9 },
      { id: 6, y: 8, speed: 38, delay: 19, size: 1.05, amplitude: 28, flapCycleDuration: 2.7, glideDuration: 1.6 },
      { id: 7, y: 33, speed: 34, delay: 23, size: 0.88, amplitude: 38, flapCycleDuration: 2.3, glideDuration: 2.1 },
      { id: 8, y: 16, speed: 36, delay: 27, size: 0.98, amplitude: 30, flapCycleDuration: 2.5, glideDuration: 1.8 },
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
              '--flap-cycle': `${bird.flapCycleDuration}s`,
              '--glide-duration': `${bird.glideDuration}s`,
              '--total-cycle': `${bird.flapCycleDuration + bird.glideDuration}s`,
            }}
          >
            <svg
              width={40 * bird.size}
              height={28 * bird.size}
              viewBox="0 0 40 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="bird-svg text-[var(--foreground)]"
            >
              {/* Bird body - elongated teardrop shape */}
              <ellipse
                cx="20"
                cy="14"
                rx="4"
                ry="5.5"
                fill="currentColor"
                opacity="0.95"
                className="bird-body"
              />

              {/* Tail feathers */}
              <path
                d="M 24,14 Q 28,12 30,13 Q 28,14 24,14 Z"
                fill="currentColor"
                opacity="0.8"
                className="tail-top"
              />
              <path
                d="M 24,14 Q 28,16 30,15 Q 28,14 24,14 Z"
                fill="currentColor"
                opacity="0.8"
                className="tail-bottom"
              />

              {/* Left wing - detailed with segments */}
              <g className="wing-left">
                {/* Wing base */}
                <path
                  d="M 20,14 Q 14,8 8,9 Q 6,10 4,12 Q 8,11 14,13 Q 18,14.5 20,14 Z"
                  fill="currentColor"
                  opacity="0.88"
                />
                {/* Wing tip feathers */}
                <path
                  d="M 8,9 Q 4,6 2,7 L 1,9 Q 3,8 6,10 Z"
                  fill="currentColor"
                  opacity="0.75"
                />
                {/* Mid feathers */}
                <path
                  d="M 11,10 Q 8,7 5,8 L 4,10 Q 6,9 9,11 Z"
                  fill="currentColor"
                  opacity="0.80"
                />
              </g>

              {/* Right wing - detailed with segments */}
              <g className="wing-right">
                {/* Wing base */}
                <path
                  d="M 20,14 Q 26,8 32,9 Q 34,10 36,12 Q 32,11 26,13 Q 22,14.5 20,14 Z"
                  fill="currentColor"
                  opacity="0.88"
                />
                {/* Wing tip feathers */}
                <path
                  d="M 32,9 Q 36,6 38,7 L 39,9 Q 37,8 34,10 Z"
                  fill="currentColor"
                  opacity="0.75"
                />
                {/* Mid feathers */}
                <path
                  d="M 29,10 Q 32,7 35,8 L 36,10 Q 34,9 31,11 Z"
                  fill="currentColor"
                  opacity="0.80"
                />
              </g>

              {/* Head and beak */}
              <ellipse cx="18" cy="12" rx="2" ry="2.2" fill="currentColor" opacity="0.98" />
              <path
                d="M 16,12 L 14,11.5 L 14,12.5 Z"
                fill="currentColor"
                opacity="0.9"
              />
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

        /* Body subtle bobbing during flight */
        .bird-body {
          animation: body-bob 0.4s ease-in-out infinite;
          transform-origin: center center;
        }

        @keyframes body-bob {
          0%, 100% {
            transform: scaleY(1) scaleX(1);
          }
          50% {
            transform: scaleY(0.92) scaleX(1.05);
          }
        }

        /* Tail movement */
        .tail-top, .tail-bottom {
          animation: tail-sway 1.2s ease-in-out infinite;
          transform-origin: 24px 14px;
        }

        .tail-bottom {
          animation-delay: 0.1s;
        }

        @keyframes tail-sway {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-3deg);
          }
        }

        /* Flap/Glide cycle for wings */
        .wing-left, .wing-right {
          animation:
            wing-flap-glide var(--total-cycle) ease-in-out infinite;
          transform-origin: 20px 14px;
        }

        .wing-right {
          animation-delay: 0.05s;
        }

        @keyframes wing-flap-glide {
          /* Flapping phase - multiple beats */
          0% {
            transform: rotateX(0deg) scaleY(1) translateY(0px);
          }
          5% {
            transform: rotateX(60deg) scaleY(0.3) translateY(-2px);
          }
          10% {
            transform: rotateX(0deg) scaleY(1) translateY(0px);
          }
          15% {
            transform: rotateX(60deg) scaleY(0.3) translateY(-2px);
          }
          20% {
            transform: rotateX(0deg) scaleY(1) translateY(0px);
          }
          25% {
            transform: rotateX(60deg) scaleY(0.3) translateY(-2px);
          }
          30% {
            transform: rotateX(0deg) scaleY(1) translateY(0px);
          }
          35% {
            transform: rotateX(60deg) scaleY(0.3) translateY(-2px);
          }
          40% {
            transform: rotateX(0deg) scaleY(1) translateY(0px);
          }

          /* Transition to glide */
          45% {
            transform: rotateX(0deg) scaleY(1) translateY(0px);
          }

          /* Gliding phase - wings extended */
          50% {
            transform: rotateX(0deg) scaleY(1) translateY(0px);
          }
          60% {
            transform: rotateX(-5deg) scaleY(0.98) translateY(0px);
          }
          70% {
            transform: rotateX(0deg) scaleY(1) translateY(0px);
          }
          80% {
            transform: rotateX(-5deg) scaleY(0.98) translateY(0px);
          }
          90% {
            transform: rotateX(0deg) scaleY(1) translateY(0px);
          }

          /* Back to flapping */
          100% {
            transform: rotateX(0deg) scaleY(1) translateY(0px);
          }
        }
      `}</style>
    </>
  )
}
