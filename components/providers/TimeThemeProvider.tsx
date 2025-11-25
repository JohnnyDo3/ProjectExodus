'use client'

import { useEffect, useState } from 'react'
import * as SunCalc from 'suncalc'

export type ThemeMode = 'auto' | 'morning' | 'night'
export type TimeTheme = 'dawn' | 'sunrise' | 'morning' | 'day' | 'afternoon' | 'dusk' | 'sunset' | 'evening' | 'night' | 'midnight'

interface GeolocationCoords {
  latitude: number
  longitude: number
}

export function TimeThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [coords, setCoords] = useState<GeolocationCoords | null>(null)

  useEffect(() => {
    setMounted(true)

    // First, check if we have stored coordinates
    const stored = localStorage.getItem('user_coords')
    const storedTimestamp = localStorage.getItem('user_coords_timestamp')

    if (stored && storedTimestamp) {
      const age = Date.now() - parseInt(storedTimestamp)
      const ONE_WEEK = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

      // If coordinates are less than 1 week old, use them
      if (age < ONE_WEEK) {
        try {
          setCoords(JSON.parse(stored))
          console.log('Using cached location (age: ' + Math.round(age / (1000 * 60 * 60)) + ' hours)')
          return // Don't request location permission if we have recent coords
        } catch (e) {
          console.error('Failed to parse stored coordinates')
        }
      }
    }

    // Only request location if we don't have recent stored coords
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          setCoords(newCoords)
          // Store coordinates and timestamp in localStorage
          localStorage.setItem('user_coords', JSON.stringify(newCoords))
          localStorage.setItem('user_coords_timestamp', Date.now().toString())
          console.log('Location acquired and cached')
        },
        (error) => {
          console.log('Geolocation not available, using fallback times')
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0, // Don't use cached position from browser
        }
      )
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const updateTheme = () => {
      const mode = (localStorage.getItem('theme_mode') as ThemeMode) || 'auto'

      if (mode === 'morning') {
        document.documentElement.className = 'day'
        return
      }

      if (mode === 'night') {
        document.documentElement.className = 'night'
        return
      }

      // Auto mode - calculate based on time
      const theme = calculateTimeTheme(coords)
      document.documentElement.className = theme
    }

    // Update immediately
    updateTheme()

    // Update every minute to catch theme transitions
    const interval = setInterval(updateTheme, 60000)

    // Listen for manual theme mode changes from ThemeToggle
    const handleModeChange = () => {
      updateTheme()
    }
    window.addEventListener('theme-mode-change', handleModeChange)

    return () => {
      clearInterval(interval)
      window.removeEventListener('theme-mode-change', handleModeChange)
    }
  }, [mounted, coords])

  return <>{children}</>
}

/**
 * Calculate the appropriate theme based on current time and location
 * Uses 8 granular time phases for natural transitions
 */
function calculateTimeTheme(coords: GeolocationCoords | null): TimeTheme {
  const now = new Date()
  const hour = now.getHours()

  if (coords) {
    // Calculate actual sunrise/sunset times for user's location
    const times = SunCalc.getTimes(now, coords.latitude, coords.longitude)
    const sunrise = times.sunrise.getHours()
    const sunset = times.sunset.getHours()

    // Map to 8 granular phases based on sunrise/sunset
    if (hour >= 5 && hour < sunrise - 1) return 'dawn'
    if (hour >= sunrise - 1 && hour < sunrise + 2) return 'sunrise'
    if (hour >= sunrise + 2 && hour < 10) return 'morning'
    if (hour >= 10 && hour < 15) return 'day'
    if (hour >= 15 && hour < sunset - 2) return 'afternoon'
    if (hour >= sunset - 2 && hour < sunset) return 'dusk'
    if (hour >= sunset && hour < sunset + 2) return 'sunset'
    if (hour >= sunset + 2 && hour < 22) return 'evening'
    if (hour >= 22 || hour < 2) return 'night'
    return 'midnight'
  } else {
    // Fallback: Use fixed times based on local timezone (8 phases)
    if (hour >= 5 && hour < 7) return 'dawn'
    if (hour >= 7 && hour < 10) return 'sunrise'
    if (hour === 10) return 'morning'
    if (hour >= 11 && hour < 15) return 'day'
    if (hour >= 15 && hour < 18) return 'afternoon'
    if (hour >= 18 && hour < 19) return 'dusk'
    if (hour >= 19 && hour < 21) return 'sunset'
    if (hour >= 21 && hour < 22) return 'evening'
    if (hour >= 22 || hour < 2) return 'night'
    return 'midnight'
  }
}

/**
 * Get human-readable description of current time period
 */
export function getTimeDescription(coords: GeolocationCoords | null): string {
  const theme = calculateTimeTheme(coords)

  const descriptions: Record<TimeTheme, string> = {
    dawn: '🌄 Early dawn awakens',
    sunrise: '🌅 Dawn is breaking',
    morning: '🌤️ Morning has arrived',
    day: '☀️ It\'s a beautiful day',
    afternoon: '🌞 Warm afternoon light',
    dusk: '🌆 Dusk settles in',
    sunset: '🌇 Golden hour approaches',
    evening: '🌃 Evening descends',
    night: '🌙 Night has fallen',
    midnight: '🌌 Deep night silence',
  }

  return descriptions[theme]
}
