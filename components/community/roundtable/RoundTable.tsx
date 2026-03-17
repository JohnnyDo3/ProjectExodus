'use client'

import React from 'react'

interface RoundTableProps {
  revealProgress: number
  children: React.ReactNode
}

export function RoundTable({ revealProgress, children }: RoundTableProps) {
  // Interpolate values based on scroll progress
  const translateY = 60 * (1 - revealProgress) // 60vh → 0
  const rotateX = 65 - 10 * revealProgress // 65deg → 55deg
  const contentOpacity = Math.max(0, (revealProgress - 0.4) / 0.6) // fade in after 40%

  return (
    <div className="relative flex items-center justify-center py-20 overflow-hidden">
      {/* Perspective container */}
      <div
        className="relative"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 30%',
        }}
      >
        {/* Table element */}
        <div
          className="relative mx-auto"
          style={{
            width: 'min(80vw, 900px)',
            aspectRatio: '1.6 / 1',
            borderRadius: '50%',
            transform: `translateY(${translateY}vh) rotateX(${rotateX}deg)`,
            willChange: 'transform',
            transition: 'none',
          }}
        >
          {/* Wood table surface */}
          <div
            className="absolute inset-0 rounded-[50%] overflow-hidden"
            style={{
              background: `
                radial-gradient(ellipse 120% 120% at 50% 40%,
                  #8B6914 0%,
                  #6B4F10 25%,
                  #5C3D0E 50%,
                  #4A2F0C 75%,
                  #3A2508 100%
                )
              `,
              border: '8px solid #3A2508',
              boxShadow: `
                inset 0 -4px 20px rgba(0,0,0,0.4),
                inset 0 4px 12px rgba(139,105,20,0.3),
                0 20px 60px rgba(0,0,0,0.6),
                0 8px 24px rgba(0,0,0,0.4)
              `,
            }}
          >
            {/* Wood grain lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.12]"
              viewBox="0 0 400 250"
              preserveAspectRatio="none"
            >
              {[...Array(12)].map((_, i) => (
                <ellipse
                  key={i}
                  cx="200"
                  cy="125"
                  rx={80 + i * 14}
                  ry={50 + i * 9}
                  fill="none"
                  stroke="#D4A54A"
                  strokeWidth="0.5"
                  opacity={0.3 + (i % 3) * 0.15}
                />
              ))}
              {/* Subtle grain streaks */}
              {[...Array(8)].map((_, i) => (
                <line
                  key={`g${i}`}
                  x1={50 + i * 40}
                  y1="0"
                  x2={60 + i * 38}
                  y2="250"
                  stroke="#D4A54A"
                  strokeWidth="0.3"
                  opacity={0.15}
                />
              ))}
            </svg>

            {/* Table rim highlight */}
            <div
              className="absolute inset-0 rounded-[50%]"
              style={{
                background: 'linear-gradient(180deg, rgba(212,165,74,0.15) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.2) 100%)',
              }}
            />

            {/* Table center darker circle (inner area) */}
            <div
              className="absolute rounded-[50%]"
              style={{
                top: '15%',
                left: '15%',
                right: '15%',
                bottom: '15%',
                background: 'radial-gradient(ellipse at center, rgba(58,37,8,0.3) 0%, transparent 70%)',
                border: '1px solid rgba(139,105,20,0.15)',
              }}
            />
          </div>

          {/* Content layer (posts, centerpiece) - counter-rotate to face viewer */}
          <div
            className="absolute inset-0"
            style={{
              opacity: contentOpacity,
              transform: `rotateX(${-rotateX}deg)`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
