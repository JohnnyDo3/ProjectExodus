'use client'

import React from 'react'

interface RoundTableProps {
  children: React.ReactNode
  className?: string
}

/**
 * Bird's-eye conference table — a tall oval wood surface.
 * Spans the full height of its container, creating one continuous
 * table that crosses the fold. Children layer on top.
 */
export function RoundTable({ children, className = '' }: RoundTableProps) {
  return (
    <div className={`relative mx-auto ${className}`}>
      {/* The oval table surface */}
      <div
        className="relative w-full h-full"
        style={{
          borderRadius: '50% / 4%',
        }}
      >
        {/* Wood surface fill */}
        <div
          className="absolute inset-0"
          style={{
            borderRadius: '50% / 4%',
            background: `
              linear-gradient(180deg,
                #7A5C12 0%,
                #8B6914 8%,
                #A67C1A 20%,
                #8B6914 35%,
                #6B4F10 50%,
                #8B6914 65%,
                #A67C1A 80%,
                #8B6914 92%,
                #7A5C12 100%
              )
            `,
            border: '10px solid #2E1D06',
            boxShadow: `
              inset 0 0 80px rgba(0,0,0,0.3),
              inset 0 0 200px rgba(0,0,0,0.1),
              0 30px 80px rgba(0,0,0,0.5),
              0 10px 30px rgba(0,0,0,0.3)
            `,
          }}
        >
          {/* Wood grain — horizontal lines across the table */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
            viewBox="0 0 200 1000"
            preserveAspectRatio="none"
          >
            {/* Longitudinal grain lines */}
            {[...Array(30)].map((_, i) => (
              <line
                key={`g${i}`}
                x1={10 + (i * 6) + (i % 3) * 2}
                y1="0"
                x2={10 + (i * 6) + (i % 3) * 2 + (i % 5 - 2) * 3}
                y2="1000"
                stroke="#D4A54A"
                strokeWidth={0.3 + (i % 4) * 0.15}
                opacity={0.3 + (i % 3) * 0.1}
              />
            ))}
            {/* Cross-grain knots */}
            {[...Array(8)].map((_, i) => (
              <ellipse
                key={`k${i}`}
                cx={60 + (i % 3) * 40}
                cy={80 + i * 120}
                rx={8 + (i % 2) * 4}
                ry={3 + (i % 3)}
                fill="none"
                stroke="#D4A54A"
                strokeWidth="0.3"
                opacity={0.15}
              />
            ))}
          </svg>

          {/* Highlight/shine — top and center gleam */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: '50% / 4%',
              background: `
                linear-gradient(180deg,
                  rgba(212,165,74,0.1) 0%,
                  transparent 15%,
                  transparent 40%,
                  rgba(212,165,74,0.05) 50%,
                  transparent 60%,
                  transparent 85%,
                  rgba(212,165,74,0.1) 100%
                ),
                radial-gradient(ellipse at 50% 30%, rgba(212,165,74,0.08) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 70%, rgba(212,165,74,0.06) 0%, transparent 50%)
              `,
            }}
          />

          {/* Outer rim bevel */}
          <div
            className="absolute inset-[6px] pointer-events-none"
            style={{
              borderRadius: '50% / 4%',
              border: '1.5px solid rgba(139,105,20,0.12)',
              boxShadow: 'inset 0 3px 12px rgba(212,165,74,0.06)',
            }}
          />

          {/* Inner decorative runner line down the center */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '6%',
              bottom: '6%',
              left: '15%',
              right: '15%',
              borderRadius: '50% / 4%',
              border: '1px solid rgba(139,105,20,0.08)',
            }}
          />
        </div>
      </div>

      {/* Content layer — on top of the table */}
      <div className="absolute inset-0" style={{ borderRadius: '50% / 4%' }}>
        {children}
      </div>
    </div>
  )
}
