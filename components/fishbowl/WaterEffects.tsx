'use client'

import { memo } from 'react'

interface WaterEffectsProps {
  width: number
  height: number
}

// Underwater light caustics and particle effects
export const WaterEffects = memo(({ width, height }: WaterEffectsProps) => {
  if (width === 0 || height === 0) return null

  return (
    <>
      {/* Floating particles (plankton) */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              left: `${(i * 7.3) % 100}%`,
              top: `${(i * 11.7) % 80 + 5}%`,
              background: `rgba(255, 255, 255, ${0.1 + (i % 4) * 0.05})`,
              animation: `particleDrift ${6 + (i % 5) * 2}s ease-in-out ${i * 0.8}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Surface ripple effect at top */}
      <div className="absolute top-0 left-0 right-0 h-8 z-[2] pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(100,200,255,0.15) 0%, transparent 100%)',
            animation: 'surfaceRipple 4s ease-in-out infinite',
          }}
        />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 80px rgba(0,0,0,0.4)',
        }}
      />
    </>
  )
})
WaterEffects.displayName = 'WaterEffects'
