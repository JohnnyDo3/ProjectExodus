'use client'

import { useEffect, useState } from 'react'
import * as SunCalc from 'suncalc'

export type ThemeMode = 'auto' | 'morning' | 'night'
export type TimeTheme = 'sunrise' | 'day' | 'sunset' | 'night'

interface GeolocationCoords {
  latitude: number
  longitude: number
}

export function TimeThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [coords, setCoords] = useState<GeolocationCoords | null>(null)

  useEffect(() => {
    setMounted(true)

    // Try to get user's location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          // Store coordinates in localStorage for future use
          localStorage.setItem(
            'user_coords',
            JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          )
        },
        (error) => {
          console.log('Geolocation not available, using fallback times')
          // Try to use previously stored coords
          const stored = localStorage.getItem('user_coords')
          if (stored) {
            try {
              setCoords(JSON.parse(stored))
            } catch (e) {
              console.error('Failed to parse stored coordinates')
            }
          }
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 86400000, // 24 hours
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
 */
function calculateTimeTheme(coords: GeolocationCoords | null): TimeTheme {
  const now = new Date()

  if (coords) {
    // Calculate actual sunrise/sunset times for user's location
    const times = SunCalc.getTimes(now, coords.latitude, coords.longitude)

    const sunrise = times.sunrise.getTime()
    const sunset = times.sunset.getTime()
    const currentTime = now.getTime()

    // Define theme periods (with 1 hour buffer around sunrise/sunset)
    const hourInMs = 60 * 60 * 1000
    const sunriseStart = sunrise - hourInMs
    const sunriseEnd = sunrise + hourInMs
    const sunsetStart = sunset - hourInMs
    const sunsetEnd = sunset + hourInMs

    // Determine current theme period
    if (currentTime >= sunriseStart && currentTime <= sunriseEnd) {
      return 'sunrise'
    } else if (currentTime > sunriseEnd && currentTime < sunsetStart) {
      return 'day'
    } else if (currentTime >= sunsetStart && currentTime <= sunsetEnd) {
      return 'sunset'
    } else {
      return 'night'
    }
  } else {
    // Fallback: Use fixed times based on local timezone
    const hour = now.getHours()

    if (hour >= 5 && hour < 8) {
      return 'sunrise'
    } else if (hour >= 8 && hour < 18) {
      return 'day'
    } else if (hour >= 18 && hour < 21) {
      return 'sunset'
    } else {
      return 'night'
    }
  }
}

/**
 * Get human-readable description of current time period
 */
export function getTimeDescription(coords: GeolocationCoords | null): string {
  const theme = calculateTimeTheme(coords)

  const descriptions: Record<TimeTheme, string> = {
    sunrise: '🌅 Dawn is breaking',
    day: '☀️ It\'s a beautiful day',
    sunset: '🌇 Golden hour approaches',
    night: '🌙 Night has fallen',
  }

  return descriptions[theme]
}
