'use client'

import React from 'react'

interface RoundTableProps {
  children: React.ReactNode
}

export function RoundTable({ children }: RoundTableProps) {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Wood table surface - tall oval that extends as you scroll */}
      <div className="relative rounded-[50%/120px] overflow-hidden min-h-[600px]"
        style={{
          background: `
            radial-gradient(ellipse 130% 100% at 50% 50%,
              #8B6914 0%,
              #6B4F10 20%,
              #5C3D0E 45%,
              #4A2F0C 70%,
              #3A2508 100%
            )
          `,
          border: '10px solid #3A2508',
          boxShadow: `
            inset 0 0 40px rgba(0,0,0,0.4),
            inset 0 6px 20px rgba(139,105,20,0.2),
            0 30px 80px rgba(0,0,0,0.5),
            0 10px 30px rgba(0,0,0,0.3)
          `,
        }}
      >
        {/* Wood grain SVG overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.1] pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 400 600"
        >
          {[...Array(15)].map((_, i) => (
            <ellipse
              key={i}
              cx="200"
              cy="300"
              rx={60 + i * 12}
              ry={40 + i * 20}
              fill="none"
              stroke="#D4A54A"
              strokeWidth="0.5"
              opacity={0.25 + (i % 3) * 0.1}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <line
              key={`g${i}`}
              x1={40 + i * 35}
              y1="0"
              x2={50 + i * 33}
              y2="600"
              stroke="#D4A54A"
              strokeWidth="0.3"
              opacity={0.12}
            />
          ))}
        </svg>

        {/* Rim highlight */}
        <div
          className="absolute inset-0 rounded-[50%/120px] pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(212,165,74,0.12) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.15) 100%)',
          }}
        />

        {/* Inner darker ring */}
        <div
          className="absolute pointer-events-none rounded-[50%/80px]"
          style={{
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid rgba(139,105,20,0.12)',
            background: 'radial-gradient(ellipse at center, rgba(58,37,8,0.15) 0%, transparent 60%)',
          }}
        />

        {/* Content on the table */}
        <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-12">
          {children}
        </div>
      </div>
    </div>
  )
}
