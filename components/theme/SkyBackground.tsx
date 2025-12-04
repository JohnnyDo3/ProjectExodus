'use client'

import { useMemo } from 'react'
import { useSkyTheme } from './SkyThemeProvider'
import { useTimeTheme } from '@/components/providers/TimeThemeProvider'

// Generate static star positions for performance
const generateStars = (count: number) => {
  const stars: Array<{ x: number; y: number; size: number; delay: number; brightness: number }> = []
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * 100,
      y: Math.random() * 70, // Upper 70% of sky
      size: Math.random() < 0.8 ? 1 : 2, // Most stars are small
      delay: Math.random() * 4,
      brightness: 0.4 + Math.random() * 0.6,
    })
  }
  return stars
}

// Pre-generate stars once
const STARS = generateStars(80)

export function SkyBackground() {
  const { theme } = useSkyTheme()
  const { twilightProgress } = useTimeTheme()

  // Calculate star visibility - stars start appearing at twilightProgress > 0.35
  // Full visibility at twilightProgress > 0.7
  const starOpacity = useMemo(() => {
    if (twilightProgress < 0.35) return 0
    if (twilightProgress > 0.7) return 1
    return (twilightProgress - 0.35) / 0.35
  }, [twilightProgress])

  // Night sky gradient opacity - blends with main sky gradient
  const nightSkyOpacity = useMemo(() => {
    if (twilightProgress < 0.4) return 0
    if (twilightProgress > 0.8) return 1
    return (twilightProgress - 0.4) / 0.4
  }, [twilightProgress])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Main sky gradient - always visible, transitions via theme */}
      <div
        className="absolute inset-0 transition-all duration-[2000ms] ease-in-out"
        style={{
          background: theme.colors.sky,
          opacity: 1 - nightSkyOpacity * 0.3, // Slightly dim during night
        }}
      />

      {/* Night sky overlay - fades in during dusk/evening */}
      <div
        className="absolute inset-0 transition-opacity duration-[3000ms] ease-in-out"
        style={{
          background: 'linear-gradient(to bottom, #000005 0%, #0a0a1a 30%, #101028 60%, #1a1a35 100%)',
          opacity: nightSkyOpacity,
        }}
      />

      {/* Integrated stars - fade in with twilight */}
      {starOpacity > 0 && (
        <div
          className="absolute inset-0 transition-opacity duration-[2000ms]"
          style={{ opacity: starOpacity }}
        >
          {STARS.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: 'white',
                opacity: star.brightness,
                animationDelay: `${star.delay}s`,
                animationDuration: '3s',
                boxShadow: star.size > 1 ? '0 0 3px rgba(255,255,255,0.5)' : 'none',
              }}
            />
          ))}
        </div>
      )}

      {/* Subtle Milky Way glow during deep night */}
      {twilightProgress > 0.7 && (
        <div
          className="absolute inset-0 transition-opacity duration-[4000ms]"
          style={{
            background: `radial-gradient(ellipse 80% 40% at 60% 45%, rgba(100,100,150,${0.08 * (twilightProgress - 0.7) / 0.3}) 0%, transparent 70%)`,
          }}
        />
      )}
    </div>
  )
}
