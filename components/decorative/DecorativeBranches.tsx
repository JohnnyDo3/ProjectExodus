'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface Leaf {
  id: number
  x: number
  y: number
  delay: number
  isAttached: boolean
}

export function DecorativeBranches() {
  const pathname = usePathname()
  const isHeroPage = pathname === '/'
  const [leaves, setLeaves] = useState<Leaf[]>([])

  useEffect(() => {
    // 7 leaves - some attached, some falling
    const leafPositions: Leaf[] = [
      { id: 1, x: 12, y: 8, delay: 0, isAttached: true },
      { id: 2, x: 18, y: 6, delay: 2, isAttached: false },
      { id: 3, x: 82, y: 7, delay: 4, isAttached: true },
      { id: 4, x: 90, y: 10, delay: 1, isAttached: false },
      { id: 5, x: 14, y: 92, delay: 3, isAttached: true },
      { id: 6, x: 85, y: 90, delay: 5, isAttached: false },
      { id: 7, x: 78, y: 94, delay: 2.5, isAttached: true },
    ]
    setLeaves(leafPositions)
  }, [])

  // Don't render on hero page
  if (isHeroPage) {
    return null
  }

  const phi = 1.618

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Top-left branch system */}
          <g className="branch-group" opacity="0.4">
            {/* Main branch - thicker */}
            <path
              d={`M 0,0 Q ${10 / phi},${5 / phi} ${100 / (phi * phi)},${15 / phi}`}
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              strokeLinecap="round"
              className="text-[var(--foreground)]"
            />
            {/* Sub-branch 1 */}
            <path
              d={`M ${8 / phi},${4 / phi} Q ${14 / phi},${10 / phi} ${20 / phi},${14 / phi}`}
              stroke="currentColor"
              strokeWidth="0.3"
              fill="none"
              strokeLinecap="round"
              className="text-[var(--foreground)]"
            />
            {/* Sub-branch 2 */}
            <path
              d={`M ${16 / phi},${8 / phi} Q ${20 / phi},${11 / phi} ${25 / phi},${16 / phi}`}
              stroke="currentColor"
              strokeWidth="0.25"
              fill="none"
              strokeLinecap="round"
              className="text-[var(--foreground)]"
            />
          </g>

          {/* Top-right branch system */}
          <g className="branch-group" opacity="0.4">
            {/* Main branch */}
            <path
              d={`M 100,0 Q ${100 - 10 / phi},${5 / phi} ${100 - 100 / (phi * phi)},${15 / phi}`}
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              strokeLinecap="round"
              className="text-[var(--foreground)]"
            />
            {/* Sub-branch 1 */}
            <path
              d={`M ${100 - 8 / phi},${4 / phi} Q ${100 - 14 / phi},${10 / phi} ${100 - 20 / phi},${14 / phi}`}
              stroke="currentColor"
              strokeWidth="0.3"
              fill="none"
              strokeLinecap="round"
              className="text-[var(--foreground)]"
            />
            {/* Sub-branch 2 */}
            <path
              d={`M ${100 - 16 / phi},${8 / phi} Q ${100 - 20 / phi},${11 / phi} ${100 - 25 / phi},${16 / phi}`}
              stroke="currentColor"
              strokeWidth="0.25"
              fill="none"
              strokeLinecap="round"
              className="text-[var(--foreground)]"
            />
          </g>

          {/* Bottom-left branch system */}
          <g className="branch-group" opacity="0.4">
            {/* Main branch */}
            <path
              d={`M 0,100 Q ${10 / phi},${100 - 5 / phi} ${100 / (phi * phi)},${100 - 15 / phi}`}
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              strokeLinecap="round"
              className="text-[var(--foreground)]"
            />
            {/* Sub-branch 1 */}
            <path
              d={`M ${8 / phi},${100 - 4 / phi} Q ${14 / phi},${100 - 10 / phi} ${20 / phi},${100 - 14 / phi}`}
              stroke="currentColor"
              strokeWidth="0.3"
              fill="none"
              strokeLinecap="round"
              className="text-[var(--foreground)]"
            />
            {/* Sub-branch 2 */}
            <path
              d={`M ${16 / phi},${100 - 8 / phi} Q ${20 / phi},${100 - 11 / phi} ${25 / phi},${100 - 16 / phi}`}
              stroke="currentColor"
              strokeWidth="0.25"
              fill="none"
              strokeLinecap="round"
              className="text-[var(--foreground)]"
            />
          </g>

          {/* Bottom-right branch system */}
          <g className="branch-group" opacity="0.4">
            {/* Main branch */}
            <path
              d={`M 100,100 Q ${100 - 10 / phi},${100 - 5 / phi} ${100 - 100 / (phi * phi)},${100 - 15 / phi}`}
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              strokeLinecap="round"
              className="text-[var(--foreground)]"
            />
            {/* Sub-branch 1 */}
            <path
              d={`M ${100 - 8 / phi},${100 - 4 / phi} Q ${100 - 14 / phi},${100 - 10 / phi} ${100 - 20 / phi},${100 - 14 / phi}`}
              stroke="currentColor"
              strokeWidth="0.3"
              fill="none"
              strokeLinecap="round"
              className="text-[var(--foreground)]"
            />
            {/* Sub-branch 2 */}
            <path
              d={`M ${100 - 16 / phi},${100 - 8 / phi} Q ${100 - 20 / phi},${100 - 11 / phi} ${100 - 25 / phi},${100 - 16 / phi}`}
              stroke="currentColor"
              strokeWidth="0.25"
              fill="none"
              strokeLinecap="round"
              className="text-[var(--foreground)]"
            />
          </g>

          {/* Leaves - BIGGER and MORE VISIBLE */}
          {leaves.map((leaf) => (
            <g key={leaf.id}>
              {/* Leaf shape - teardrop/almond */}
              <ellipse
                cx={leaf.x}
                cy={leaf.y}
                rx="0.8"
                ry="1.4"
                fill="currentColor"
                opacity="0.45"
                className={`text-[var(--foreground)] ${leaf.isAttached ? 'leaf-sway' : 'leaf-fall'}`}
                style={{
                  // @ts-ignore
                  '--leaf-delay': `${leaf.delay}s`,
                  '--leaf-x': leaf.x,
                  '--leaf-y': leaf.y,
                }}
              />
              {/* Leaf vein/detail */}
              <line
                x1={leaf.x}
                y1={leaf.y - 1.2}
                x2={leaf.x}
                y2={leaf.y + 1.2}
                stroke="currentColor"
                strokeWidth="0.08"
                opacity="0.3"
                className={`${leaf.isAttached ? 'leaf-sway' : 'leaf-fall'}`}
                style={{
                  // @ts-ignore
                  '--leaf-delay': `${leaf.delay}s`,
                  '--leaf-x': leaf.x,
                  '--leaf-y': leaf.y,
                }}
              />
            </g>
          ))}
        </svg>
      </div>

      <style jsx global>{`
        /* Subtle branch sway */
        .branch-group {
          animation: branch-sway 10s ease-in-out infinite;
          transform-origin: center;
        }

        @keyframes branch-sway {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(0.8deg);
          }
        }

        /* Attached leaves sway */
        .leaf-sway {
          animation: leaf-gentle-sway 5s ease-in-out infinite;
          animation-delay: var(--leaf-delay);
          transform-origin: var(--leaf-x) var(--leaf-y);
        }

        @keyframes leaf-gentle-sway {
          0%, 100% {
            transform: rotate(-8deg) translateY(0px);
          }
          50% {
            transform: rotate(8deg) translateY(-0.5px);
          }
        }

        /* Falling leaves - slow drift */}
        .leaf-fall {
          animation: leaf-drift 20s ease-in-out infinite;
          animation-delay: var(--leaf-delay);
          transform-origin: var(--leaf-x) var(--leaf-y);
        }

        @keyframes leaf-drift {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.45;
          }
          25% {
            transform: translateY(25vh) rotate(90deg) translateX(2vw);
            opacity: 0.35;
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(-2vw);
            opacity: 0.25;
          }
          75% {
            transform: translateY(75vh) rotate(270deg) translateX(2vw);
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
