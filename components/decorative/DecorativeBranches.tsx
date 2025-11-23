'use client'

import { useEffect, useState } from 'react'

interface Leaf {
  id: number
  x: number
  y: number
  corner: 'tl' | 'tr' | 'bl' | 'br'
  delay: number
  isAttached: boolean
}

export function DecorativeBranches() {
  const [leaves, setLeaves] = useState<Leaf[]>([])

  useEffect(() => {
    // 7 leaves total - some attached to branches, some falling
    const leafPositions: Leaf[] = [
      { id: 1, x: 8, y: 15, corner: 'tl', delay: 0, isAttached: true },
      { id: 2, x: 15, y: 10, corner: 'tl', delay: 2, isAttached: false },
      { id: 3, x: 85, y: 12, corner: 'tr', delay: 4, isAttached: true },
      { id: 4, x: 92, y: 18, corner: 'tr', delay: 1, isAttached: false },
      { id: 5, x: 12, y: 88, corner: 'bl', delay: 3, isAttached: true },
      { id: 6, x: 88, y: 85, corner: 'br', delay: 5, isAttached: false },
      { id: 7, x: 80, y: 92, corner: 'br', delay: 2.5, isAttached: true },
    ]
    setLeaves(leafPositions)
  }, [])

  // Golden ratio constant
  const phi = 1.618

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Top-left branch - golden ratio curve */}
          <g className="branch-group" opacity="0.15">
            {/* Main branch */}
            <path
              d={`M 0,0 Q ${10 / phi},${5 / phi} ${100 / (phi * phi)},${15 / phi}`}
              stroke="currentColor"
              strokeWidth="0.3"
              fill="none"
              className="text-[var(--foreground)] branch-main"
            />
            {/* Sub-branch 1 */}
            <path
              d={`M ${8 / phi},${4 / phi} Q ${12 / phi},${8 / phi} ${18 / phi},${12 / phi}`}
              stroke="currentColor"
              strokeWidth="0.18"
              fill="none"
              className="text-[var(--foreground)]"
            />
            {/* Sub-branch 2 */}
            <path
              d={`M ${15 / phi},${7 / phi} Q ${18 / phi},${10 / phi} ${22 / phi},${14 / phi}`}
              stroke="currentColor"
              strokeWidth="0.15"
              fill="none"
              className="text-[var(--foreground)]"
            />
          </g>

          {/* Top-right branch - golden ratio curve (mirrored) */}
          <g className="branch-group" opacity="0.15">
            {/* Main branch */}
            <path
              d={`M 100,0 Q ${100 - 10 / phi},${5 / phi} ${100 - 100 / (phi * phi)},${15 / phi}`}
              stroke="currentColor"
              strokeWidth="0.3"
              fill="none"
              className="text-[var(--foreground)] branch-main"
            />
            {/* Sub-branch 1 */}
            <path
              d={`M ${100 - 8 / phi},${4 / phi} Q ${100 - 12 / phi},${8 / phi} ${100 - 18 / phi},${12 / phi}`}
              stroke="currentColor"
              strokeWidth="0.18"
              fill="none"
              className="text-[var(--foreground)]"
            />
            {/* Sub-branch 2 */}
            <path
              d={`M ${100 - 15 / phi},${7 / phi} Q ${100 - 18 / phi},${10 / phi} ${100 - 22 / phi},${14 / phi}`}
              stroke="currentColor"
              strokeWidth="0.15"
              fill="none"
              className="text-[var(--foreground)]"
            />
          </g>

          {/* Bottom-left branch - golden ratio curve */}
          <g className="branch-group" opacity="0.15">
            {/* Main branch */}
            <path
              d={`M 0,100 Q ${10 / phi},${100 - 5 / phi} ${100 / (phi * phi)},${100 - 15 / phi}`}
              stroke="currentColor"
              strokeWidth="0.3"
              fill="none"
              className="text-[var(--foreground)] branch-main"
            />
            {/* Sub-branch 1 */}
            <path
              d={`M ${8 / phi},${100 - 4 / phi} Q ${12 / phi},${100 - 8 / phi} ${18 / phi},${100 - 12 / phi}`}
              stroke="currentColor"
              strokeWidth="0.18"
              fill="none"
              className="text-[var(--foreground)]"
            />
            {/* Sub-branch 2 */}
            <path
              d={`M ${15 / phi},${100 - 7 / phi} Q ${18 / phi},${100 - 10 / phi} ${22 / phi},${100 - 14 / phi}`}
              stroke="currentColor"
              strokeWidth="0.15"
              fill="none"
              className="text-[var(--foreground)]"
            />
          </g>

          {/* Bottom-right branch - golden ratio curve (mirrored) */}
          <g className="branch-group" opacity="0.15">
            {/* Main branch */}
            <path
              d={`M 100,100 Q ${100 - 10 / phi},${100 - 5 / phi} ${100 - 100 / (phi * phi)},${100 - 15 / phi}`}
              stroke="currentColor"
              strokeWidth="0.3"
              fill="none"
              className="text-[var(--foreground)] branch-main"
            />
            {/* Sub-branch 1 */}
            <path
              d={`M ${100 - 8 / phi},${100 - 4 / phi} Q ${100 - 12 / phi},${100 - 8 / phi} ${100 - 18 / phi},${100 - 12 / phi}`}
              stroke="currentColor"
              strokeWidth="0.18"
              fill="none"
              className="text-[var(--foreground)]"
            />
            {/* Sub-branch 2 */}
            <path
              d={`M ${100 - 15 / phi},${100 - 7 / phi} Q ${100 - 18 / phi},${100 - 10 / phi} ${100 - 22 / phi},${100 - 14 / phi}`}
              stroke="currentColor"
              strokeWidth="0.15"
              fill="none"
              className="text-[var(--foreground)]"
            />
          </g>

          {/* Leaves - simple shapes */}
          {leaves.map((leaf) => (
            <ellipse
              key={leaf.id}
              cx={leaf.x}
              cy={leaf.y}
              rx="0.4"
              ry="0.7"
              fill="currentColor"
              opacity="0.2"
              className={`text-[var(--foreground)] ${leaf.isAttached ? 'leaf-sway' : 'leaf-fall'}`}
              style={{
                // @ts-ignore - CSS custom properties
                '--leaf-delay': `${leaf.delay}s`,
              }}
            />
          ))}
        </svg>
      </div>

      <style jsx global>{`
        .branch-main {
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* Subtle branch sway animation */
        .branch-group {
          animation: branch-sway 8s ease-in-out infinite;
          transform-origin: center;
        }

        @keyframes branch-sway {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(0.5deg);
          }
        }

        /* Attached leaves sway gently */
        .leaf-sway {
          animation: leaf-gentle-sway 4s ease-in-out infinite;
          animation-delay: var(--leaf-delay);
          transform-origin: center;
        }

        @keyframes leaf-gentle-sway {
          0%, 100% {
            transform: rotate(-5deg) translateY(0px);
          }
          50% {
            transform: rotate(5deg) translateY(-1px);
          }
        }

        /* Falling leaves drift down slowly */
        .leaf-fall {
          animation: leaf-drift 15s ease-in-out infinite;
          animation-delay: var(--leaf-delay);
        }

        @keyframes leaf-drift {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(50vh) rotate(180deg);
            opacity: 0.15;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
