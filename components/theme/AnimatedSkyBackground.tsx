'use client'

import { useEffect, useState, useMemo } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTimeTheme } from '@/components/providers/TimeThemeProvider'

interface AnimatedSkyBackgroundProps {
  className?: string
  showCelestialBody?: boolean // Show sun/moon
  showStars?: boolean // Show animated stars at night
  showAtmosphericGlow?: boolean // Show sun/moon glow effect
  intensity?: 'subtle' | 'normal' | 'vibrant' // How pronounced the effects are
}

/**
 * Animated Sky Background Component
 *
 * Creates a smooth, time-aware sky background that transitions naturally
 * throughout the day. Uses the smooth theme engine for continuous color
 * interpolation.
 *
 * Features:
 * - Animated sun/moon position based on real time
 * - Gradual star fade-in during twilight
 * - Atmospheric glow effects
 * - Smooth color transitions
 */
export function AnimatedSkyBackground({
  className = '',
  showCelestialBody = true,
  showStars = true,
  showAtmosphericGlow = true,
  intensity = 'normal',
}: AnimatedSkyBackgroundProps) {
  const { twilightProgress, sunAltitude, isDay, phase } = useTimeTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate celestial body position based on sun altitude
  // Maps altitude (-90 to 90) to position (bottom to top of container)
  const celestialPosition = useMemo(() => {
    // Clamp altitude and convert to percentage
    const clampedAltitude = Math.max(-30, Math.min(90, sunAltitude))
    // When altitude is 90, position should be ~20% from top
    // When altitude is -30, position should be below viewport
    const verticalPercent = ((clampedAltitude + 30) / 120) * 80 + 10

    // Horizontal position varies throughout the day
    // Morning = left, noon = center, evening = right
    const now = new Date()
    const hour = now.getHours() + now.getMinutes() / 60
    // Map 6am-6pm to 15%-85% horizontal
    const horizontalPercent = Math.min(85, Math.max(15, ((hour - 6) / 12) * 70 + 15))

    return {
      top: `${100 - verticalPercent}%`,
      left: `${horizontalPercent}%`,
    }
  }, [sunAltitude])

  // Generate random star positions (memoized to prevent re-renders)
  const starPositions = useMemo(() => {
    const stars: Array<{ x: number; y: number; size: number; delay: number; brightness: number }> = []
    for (let i = 0; i < 30; i++) {
      stars.push({
        x: Math.random() * 100,
        y: Math.random() * 60, // Only in upper 60% of sky
        size: Math.random() * 0.5 + 0.5, // 0.5px to 1px
        delay: Math.random() * 3, // Random animation delay
        brightness: Math.random() * 0.4 + 0.3, // 0.3 to 0.7 opacity
      })
    }
    return stars
  }, [])

  // Intensity multipliers
  const intensityMultiplier = intensity === 'subtle' ? 0.5 : intensity === 'vibrant' ? 1.5 : 1

  // Calculate gradient based on twilight progress
  const skyGradient = useMemo(() => {
    // Twilight progress: 0 = full day, 1 = full night
    if (twilightProgress < 0.2) {
      // Day: Blue sky with warm undertones
      return 'from-sky-100/30 via-amber-50/20 to-emerald-50/30'
    } else if (twilightProgress < 0.4) {
      // Golden hour: Warm oranges and pinks
      return 'from-amber-200/40 via-orange-100/30 to-rose-100/30'
    } else if (twilightProgress < 0.6) {
      // Dusk: Purple and orange mix
      return 'from-purple-300/30 via-orange-200/30 to-indigo-200/30'
    } else if (twilightProgress < 0.8) {
      // Evening: Deep purples
      return 'from-indigo-400/30 via-purple-300/30 to-slate-400/30'
    } else {
      // Night: Dark blues
      return 'from-slate-800/30 via-indigo-900/30 to-slate-900/30'
    }
  }, [twilightProgress])

  // Don't render anything until mounted to avoid hydration issues
  if (!mounted) {
    return <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} />
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Sky gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${skyGradient} transition-all duration-1000`}
        style={{ opacity: 0.6 * intensityMultiplier }}
      />

      {/* Atmospheric glow around celestial body */}
      {showAtmosphericGlow && (
        <div
          className="absolute transition-all duration-1000"
          style={{
            top: celestialPosition.top,
            left: celestialPosition.left,
            transform: 'translate(-50%, -50%)',
            width: isDay ? '200px' : '150px',
            height: isDay ? '200px' : '150px',
            background: isDay
              ? `radial-gradient(circle, rgba(253,224,71,${0.3 * intensityMultiplier}) 0%, transparent 70%)`
              : `radial-gradient(circle, rgba(148,163,184,${0.15 * intensityMultiplier}) 0%, transparent 70%)`,
            opacity: Math.abs(sunAltitude) < 20 ? 1 : Math.max(0, 1 - Math.abs(sunAltitude - 20) / 70),
          }}
        />
      )}

      {/* Sun/Moon icon */}
      {showCelestialBody && sunAltitude > -10 && (
        <div
          className="absolute transition-all duration-1000"
          style={{
            top: celestialPosition.top,
            left: celestialPosition.left,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {isDay ? (
            <Sun
              className="transition-all duration-1000"
              style={{
                width: `${(56 + sunAltitude * 0.2) * intensityMultiplier}px`,
                height: `${(56 + sunAltitude * 0.2) * intensityMultiplier}px`,
                color: twilightProgress < 0.3
                  ? `rgba(251,191,36,${0.5 * intensityMultiplier})` // Bright yellow during day
                  : `rgba(249,115,22,${0.6 * intensityMultiplier})`, // Orange during golden hour
              }}
            />
          ) : (
            <Moon
              className="transition-all duration-1000"
              style={{
                width: `${40 * intensityMultiplier}px`,
                height: `${40 * intensityMultiplier}px`,
                color: `rgba(203,213,225,${0.4 * intensityMultiplier})`,
              }}
            />
          )}
        </div>
      )}

      {/* Stars (visible during twilight and night) */}
      {showStars && twilightProgress > 0.4 && (
        <div className="absolute inset-0">
          {starPositions.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size * 2}px`,
                height: `${star.size * 2}px`,
                backgroundColor: 'white',
                opacity: Math.min(1, (twilightProgress - 0.4) * 2.5) * star.brightness * intensityMultiplier,
                animationDelay: `${star.delay}s`,
                animationDuration: '3s',
                transition: 'opacity 2000ms ease-in-out',
              }}
            />
          ))}
        </div>
      )}

      {/* Horizon glow during sunrise/sunset */}
      {twilightProgress > 0.2 && twilightProgress < 0.8 && (
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3 transition-all duration-1000"
          style={{
            background: twilightProgress < 0.5
              ? `linear-gradient(to top, rgba(251,146,60,${0.2 * intensityMultiplier}), transparent)`
              : `linear-gradient(to top, rgba(129,140,248,${0.15 * intensityMultiplier}), transparent)`,
          }}
        />
      )}
    </div>
  )
}

/**
 * Simplified day-only sky background
 * Shows warm, bright daytime atmosphere
 */
export function DaySkyBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`day-only absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/60 via-orange-50/40 to-emerald-100/50" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle,rgba(253,224,71,0.25)_0%,transparent_70%)]" />
      <Sun className="absolute top-6 right-8 w-14 h-14 text-amber-400/50" />
    </div>
  )
}

/**
 * Simplified night-only sky background
 * Shows cool, dark nighttime atmosphere with stars
 */
export function NightSkyBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`night-only absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-indigo-950/30 to-purple-950/40" />
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle,rgba(30,64,175,0.15)_0%,transparent_70%)]" />
      <Moon className="absolute top-6 right-8 w-10 h-10 text-blue-200/40" />
      {/* Stars */}
      <div className="absolute top-12 left-[15%] w-1 h-1 bg-white/50 rounded-full animate-pulse" />
      <div className="absolute top-20 left-[25%] w-0.5 h-0.5 bg-white/40 rounded-full" />
      <div className="absolute top-8 left-[40%] w-1 h-1 bg-white/35 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-16 left-[55%] w-0.5 h-0.5 bg-white/45 rounded-full" />
      <div className="absolute top-24 left-[70%] w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  )
}

/**
 * Combined day/night background that automatically switches
 * Uses CSS classes for visibility toggle with smooth fade
 */
export function AutoSkyBackground({ className = '' }: { className?: string }) {
  return (
    <>
      <DaySkyBackground className={className} />
      <NightSkyBackground className={className} />
    </>
  )
}

export default AnimatedSkyBackground
