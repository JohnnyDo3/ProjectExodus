'use client'

import React from 'react'

interface RoundTableProps {
  children: React.ReactNode
  /** Diameter of the table in px. Defaults to responsive sizing via CSS */
  className?: string
}

/**
 * Bird's-eye-view round table.
 * A single, uniform circular wood surface.
 * Children (centerpiece, orbiting posts) are layered on top.
 */
export function RoundTable({ children, className = '' }: RoundTableProps) {
  return (
    <div className={`relative mx-auto ${className}`}>
      {/* The circular table surface */}
      <div
        className="relative w-full rounded-full overflow-hidden"
        style={{
          paddingBottom: '100%', // 1:1 aspect ratio = perfect circle
        }}
      >
        {/* Wood surface fill */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(circle at 45% 42%,
                #A67C1A 0%,
                #8B6914 15%,
                #6B4F10 35%,
                #5C3D0E 55%,
                #4A2F0C 75%,
                #3A2508 100%
              )
            `,
            border: '12px solid #2E1D06',
            boxShadow: `
              inset 0 0 60px rgba(0,0,0,0.35),
              inset 0 0 120px rgba(0,0,0,0.15),
              0 40px 100px rgba(0,0,0,0.6),
              0 15px 40px rgba(0,0,0,0.4)
            `,
          }}
        >
          {/* Wood grain rings */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
            viewBox="0 0 500 500"
          >
            {[...Array(18)].map((_, i) => (
              <circle
                key={i}
                cx="245"
                cy="240"
                r={30 + i * 13}
                fill="none"
                stroke="#D4A54A"
                strokeWidth={0.4 + (i % 3) * 0.2}
                opacity={0.2 + (i % 4) * 0.08}
              />
            ))}
            {/* Radial grain streaks */}
            {[...Array(16)].map((_, i) => {
              const angle = (i / 16) * Math.PI * 2
              const x1 = 250 + 40 * Math.cos(angle)
              const y1 = 250 + 40 * Math.sin(angle)
              const x2 = 250 + 230 * Math.cos(angle)
              const y2 = 250 + 230 * Math.sin(angle)
              return (
                <line
                  key={`r${i}`}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#D4A54A"
                  strokeWidth="0.3"
                  opacity={0.08 + (i % 3) * 0.04}
                />
              )
            })}
          </svg>

          {/* Highlight/shine on top edge */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 40% 35%, rgba(212,165,74,0.12) 0%, transparent 40%),
                radial-gradient(circle at 60% 65%, rgba(0,0,0,0.15) 0%, transparent 40%)
              `,
            }}
          />

          {/* Outer rim bevel */}
          <div
            className="absolute inset-[8px] rounded-full pointer-events-none"
            style={{
              border: '2px solid rgba(139,105,20,0.15)',
              boxShadow: 'inset 0 2px 8px rgba(212,165,74,0.08)',
            }}
          />

          {/* Inner decorative ring */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              top: '12%',
              left: '12%',
              right: '12%',
              bottom: '12%',
              border: '1.5px solid rgba(139,105,20,0.1)',
            }}
          />
        </div>
      </div>

      {/* Content layer — sits on top of the table, centered */}
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  )
}
