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
      { id: 1, y: 12, speed: 38, delay: 0, size: 1.0, amplitude: 45, flapCycleDuration: 2.0, glideDuration: 3.5 },
      { id: 2, y: 22, speed: 32, delay: 3, size: 0.85, amplitude: 52, flapCycleDuration: 1.8, glideDuration: 3.8 },
      { id: 3, y: 38, speed: 35, delay: 7, size: 0.95, amplitude: 40, flapCycleDuration: 2.2, glideDuration: 3.2 },
      { id: 4, y: 18, speed: 42, delay: 11, size: 1.1, amplitude: 58, flapCycleDuration: 2.1, glideDuration: 3.6 },
      { id: 5, y: 28, speed: 34, delay: 15, size: 0.9, amplitude: 48, flapCycleDuration: 1.9, glideDuration: 3.4 },
      { id: 6, y: 8, speed: 40, delay: 19, size: 1.05, amplitude: 42, flapCycleDuration: 2.0, glideDuration: 3.7 },
      { id: 7, y: 33, speed: 36, delay: 23, size: 0.88, amplitude: 55, flapCycleDuration: 1.85, glideDuration: 3.3 },
      { id: 8, y: 16, speed: 39, delay: 27, size: 0.98, amplitude: 46, flapCycleDuration: 2.05, glideDuration: 3.5 },
    ]
    setBirds(initialBirds)
  }, [])

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {birds.map((bird) => (
          <div
            key={bird.id}
            className="bird-container absolute opacity-25 dark:opacity-18"
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
              width={44 * bird.size}
              height={32 * bird.size}
              viewBox="0 0 44 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="bird-svg text-[var(--foreground)]"
            >
              {/* Powerful hawk/eagle body - streamlined and muscular */}
              <ellipse
                cx="22"
                cy="16"
                rx="4.5"
                ry="6"
                fill="currentColor"
                opacity="0.9"
                className="bird-body"
              />

              {/* Fan-shaped tail - eagle style */}
              <g className="tail-group">
                <path
                  d="M 26.5,16 Q 30,14 32,15 Q 30,16 26.5,16 Z"
                  fill="currentColor"
                  opacity="0.75"
                  className="tail-feather"
                />
                <path
                  d="M 26.5,16 Q 31,15.5 33,16 Q 31,16.5 26.5,16 Z"
                  fill="currentColor"
                  opacity="0.78"
                  className="tail-feather"
                />
                <path
                  d="M 26.5,16 Q 30,18 32,17 Q 30,16 26.5,16 Z"
                  fill="currentColor"
                  opacity="0.75"
                  className="tail-feather"
                />
              </g>

              {/* Left wing - broad raptor wing */}
              <g className="wing-left">
                {/* Primary flight feathers */}
                <path
                  d="M 22,16 Q 16,10 10,11 Q 8,12 6,14 Q 10,13 16,15 Q 20,16.5 22,16 Z"
                  fill="currentColor"
                  opacity="0.85"
                />
                {/* Wing tip */}
                <path
                  d="M 10,11 Q 6,8 4,9 L 3,11 Q 5,10 8,12 Z"
                  fill="currentColor"
                  opacity="0.7"
                />
                {/* Secondary feathers */}
                <path
                  d="M 13,12 Q 10,9 7,10 L 6,12 Q 8,11 11,13 Z"
                  fill="currentColor"
                  opacity="0.75"
                />
              </g>

              {/* Right wing - broad raptor wing */}
              <g className="wing-right">
                {/* Primary flight feathers */}
                <path
                  d="M 22,16 Q 28,10 34,11 Q 36,12 38,14 Q 34,13 28,15 Q 24,16.5 22,16 Z"
                  fill="currentColor"
                  opacity="0.85"
                />
                {/* Wing tip */}
                <path
                  d="M 34,11 Q 38,8 40,9 L 41,11 Q 39,10 36,12 Z"
                  fill="currentColor"
                  opacity="0.7"
                />
                {/* Secondary feathers */}
                <path
                  d="M 31,12 Q 34,9 37,10 L 38,12 Q 36,11 33,13 Z"
                  fill="currentColor"
                  opacity="0.75"
                />
              </g>

              {/* Head - hooked beak raptor */}
              <ellipse cx="19" cy="14" rx="2.2" ry="2.5" fill="currentColor" opacity="0.92" />
              <path
                d="M 17,14 Q 15.5,13.5 15,14 L 15.5,14.5 Q 16,14 17,14 Z"
                fill="currentColor"
                opacity="0.88"
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
            left: -120px;
            transform: translateY(0px) rotate(0deg) scale(var(--bird-size));
          }
          8% {
            transform: translateY(calc(var(--bird-amplitude) * -0.4)) rotate(-4deg) scale(var(--bird-size));
          }
          16% {
            transform: translateY(calc(var(--bird-amplitude) * -0.8)) rotate(-6deg) scale(var(--bird-size));
          }
          24% {
            transform: translateY(calc(var(--bird-amplitude) * -1.1)) rotate(-5deg) scale(var(--bird-size));
          }
          32% {
            transform: translateY(calc(var(--bird-amplitude) * -1.2)) rotate(-3deg) scale(var(--bird-size));
          }
          /* Swooping glide down */
          40% {
            transform: translateY(calc(var(--bird-amplitude) * -0.9)) rotate(0deg) scale(var(--bird-size));
          }
          50% {
            transform: translateY(calc(var(--bird-amplitude) * -0.4)) rotate(3deg) scale(var(--bird-size));
          }
          60% {
            transform: translateY(0px) rotate(4deg) scale(var(--bird-size));
          }
          70% {
            transform: translateY(calc(var(--bird-amplitude) * 0.3)) rotate(3deg) scale(var(--bird-size));
          }
          80% {
            transform: translateY(calc(var(--bird-amplitude) * 0.5)) rotate(2deg) scale(var(--bird-size));
          }
          90% {
            transform: translateY(calc(var(--bird-amplitude) * 0.3)) rotate(1deg) scale(var(--bird-size));
          }
          100% {
            left: calc(100% + 120px);
            transform: translateY(0px) rotate(0deg) scale(var(--bird-size));
          }
        }

        /* Subtle body compression during powerful flight */
        .bird-body {
          animation: body-compress 0.45s ease-in-out infinite;
          transform-origin: center center;
        }

        @keyframes body-compress {
          0%, 100% {
            transform: scaleY(1) scaleX(1);
          }
          50% {
            transform: scaleY(0.94) scaleX(1.04);
          }
        }

        /* Tail fanning */
        .tail-group {
          animation: tail-fan 1.4s ease-in-out infinite;
          transform-origin: 26.5px 16px;
        }

        @keyframes tail-fan {
          0%, 100% {
            transform: scaleX(1);
          }
          50% {
            transform: scaleX(1.15);
          }
        }

        /* Flap/Glide cycle - longer glide for soaring */
        .wing-left, .wing-right {
          animation: wing-flap-soar var(--total-cycle) ease-in-out infinite;
          transform-origin: 22px 16px;
        }

        .wing-right {
          animation-delay: 0.06s;
        }

        @keyframes wing-flap-soar {
          /* Powerful flapping phase */
          0% {
            transform: rotateX(0deg) scaleY(1) translateY(0px);
          }
          7% {
            transform: rotateX(65deg) scaleY(0.25) translateY(-2.5px);
          }
          14% {
            transform: rotateX(0deg) scaleY(1) translateY(0px);
          }
          21% {
            transform: rotateX(65deg) scaleY(0.25) translateY(-2.5px);
          }
          28% {
            transform: rotateX(0deg) scaleY(1) translateY(0px);
          }
          35% {
            transform: rotateX(60deg) scaleY(0.3) translateY(-2px);
          }

          /* Transition to soar */
          40% {
            transform: rotateX(0deg) scaleY(1) translateY(0px);
          }

          /* Extended soaring/gliding phase */
          45% {
            transform: rotateX(0deg) scaleY(1) translateY(0px);
          }
          55% {
            transform: rotateX(-8deg) scaleY(0.96) translateY(0px);
          }
          65% {
            transform: rotateX(-3deg) scaleY(0.98) translateY(0px);
          }
          75% {
            transform: rotateX(-10deg) scaleY(0.94) translateY(0px);
          }
          85% {
            transform: rotateX(-5deg) scaleY(0.97) translateY(0px);
          }
          95% {
            transform: rotateX(0deg) scaleY(1) translateY(0px);
          }

          100% {
            transform: rotateX(0deg) scaleY(1) translateY(0px);
          }
        }
      `}</style>
    </>
  )
}
