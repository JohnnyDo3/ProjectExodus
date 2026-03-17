'use client'

import { useEffect, useState, useCallback, createContext, useContext } from 'react'
import { useSession } from 'next-auth/react'
import * as SunCalc from 'suncalc'
import {
  getCurrentThemeColors,
  applyThemeColors,
  clearThemeColors,
  savePreferences,
  loadPreferences,
  getSunPosition,
  getTwilightProgress,
  getFixedModeColors,
  type ThemeColors,
  type UserPreferences,
} from '@/lib/smoothThemeEngine'

export type ThemeMode = 'auto' | 'light' | 'dark'
export type TimeTheme = 'dawn' | 'sunrise' | 'morning' | 'day' | 'afternoon' | 'dusk' | 'sunset' | 'evening' | 'night' | 'midnight'

interface GeolocationCoords {
  latitude: number
  longitude: number
}

interface TimeThemeContextType {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  phase: string
  isDay: boolean
  twilightProgress: number // 0 = full day, 1 = full night
  sunAltitude: number // degrees above/below horizon
  coords: GeolocationCoords | null
}

const TimeThemeContext = createContext<TimeThemeContextType | undefined>(undefined)

export function useTimeTheme() {
  const context = useContext(TimeThemeContext)
  if (!context) {
    return {
      mode: 'auto' as ThemeMode,
      setMode: () => {},
      phase: 'day',
      isDay: true,
      twilightProgress: 0,
      sunAltitude: 45,
      coords: null,
    }
  }
  return context
}

export function TimeThemeProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)
  const [coords, setCoords] = useState<GeolocationCoords | null>(null)
  const [mode, setModeState] = useState<ThemeMode>('auto')
  const [phase, setPhase] = useState('day')
  const [isDay, setIsDay] = useState(true)
  const [twilightProgress, setTwilightProgress] = useState(0)
  const [sunAltitude, setSunAltitude] = useState(45)

  // Load stored preferences on mount
  useEffect(() => {
    setMounted(true)

    const prefs = loadPreferences()
    setModeState(prefs.mode)

    // Use stored coordinates if available
    if (prefs.latitude !== null && prefs.longitude !== null) {
      setCoords({ latitude: prefs.latitude, longitude: prefs.longitude })
      console.log('[Theme] Using stored location:', prefs.latitude.toFixed(2), prefs.longitude.toFixed(2))
    }

    // Request fresh geolocation (will update storage if successful)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          setCoords(newCoords)

          // Save indefinitely
          savePreferences({
            latitude: newCoords.latitude,
            longitude: newCoords.longitude,
          })
          console.log('[Theme] Location updated and saved permanently')
        },
        (error) => {
          console.log('[Theme] Geolocation not available, using stored or default')
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000, // Accept cached position up to 5 minutes old
        }
      )
    }
  }, [])

  // Load theme preference from database when user logs in
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      fetch('/api/users/theme')
        .then(res => res.json())
        .then(data => {
          if (data.themePreference) {
            // Migrate old modes to simplified set
            let pref: ThemeMode = data.themePreference
            if (pref !== 'auto' && pref !== 'light' && pref !== 'dark') pref = 'auto'
            if (pref !== mode) {
              setModeState(pref)
              savePreferences({ mode: pref })
            }
          }
        })
        .catch(err => console.error('[Theme] Failed to load preference from database:', err))
    }
  }, [status, session?.user])

  // Mode setter that persists to storage
  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode)
    savePreferences({ mode: newMode })

    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('theme-mode-change', { detail: { mode: newMode } }))
  }, [])

  // Main theme update effect
  useEffect(() => {
    if (!mounted) return

    const updateTheme = () => {
      const now = new Date()

      // Handle fixed modes
      if (mode !== 'auto') {
        const { colors, phase: fixedPhase, className } = getFixedModeColors(mode as 'light' | 'dark')
        document.documentElement.className = className
        applyThemeColors(colors)
        setPhase(fixedPhase)

        // Set appropriate values for fixed modes
        const isLightMode = mode === 'light'
        setIsDay(isLightMode)
        setTwilightProgress(isLightMode ? 0 : 1)
        setSunAltitude(isLightMode ? 60 : -30)
        return
      }

      // AUTO MODE - Smooth interpolation
      const { colors, phase: currentPhase } = getCurrentThemeColors(now, coords)
      applyThemeColors(colors)

      // Calculate sun position for UI elements
      const sunPos = getSunPosition(now, coords)
      const twilight = getTwilightProgress(now, coords)

      setPhase(currentPhase)
      setIsDay(sunPos.isDay)
      setTwilightProgress(twilight)
      setSunAltitude(sunPos.sunAltitude)

      // Set appropriate class for day-only/night-only CSS visibility
      // Use a smooth threshold with hysteresis
      if (twilight < 0.3) {
        document.documentElement.className = 'day'
      } else if (twilight > 0.7) {
        document.documentElement.className = 'night'
      } else if (twilight < 0.5) {
        document.documentElement.className = 'dusk'
      } else {
        document.documentElement.className = 'evening'
      }
    }

    // Update immediately
    updateTheme()

    // Update every 30 seconds for smooth transitions
    // This is frequent enough to appear continuous but efficient on resources
    const interval = setInterval(updateTheme, 30000)

    // Listen for manual theme mode changes
    const handleModeChange = (e: CustomEvent<{ mode: ThemeMode }>) => {
      // Mode is already set via setMode, just trigger update
      updateTheme()
    }

    window.addEventListener('theme-mode-change', handleModeChange as EventListener)

    return () => {
      clearInterval(interval)
      window.removeEventListener('theme-mode-change', handleModeChange as EventListener)
    }
  }, [mounted, coords, mode])

  // Context value
  const contextValue: TimeThemeContextType = {
    mode,
    setMode,
    phase,
    isDay,
    twilightProgress,
    sunAltitude,
    coords,
  }

  return (
    <TimeThemeContext.Provider value={contextValue}>
      {children}
    </TimeThemeContext.Provider>
  )
}

/**
 * Calculate the appropriate theme based on current time and location
 * Uses 8 granular time phases for natural transitions
 * @deprecated Use smooth interpolation via useTimeTheme() instead
 */
function calculateTimeTheme(coords: GeolocationCoords | null): TimeTheme {
  const now = new Date()
  const hour = now.getHours()

  if (coords) {
    // Calculate actual sunrise/sunset times for user's location
    const times = SunCalc.getTimes(now, coords.latitude, coords.longitude)
    const sunriseHour = times.sunrise.getHours()
    const sunsetHour = times.sunset.getHours()

    // Map to 8 granular phases based on sunrise/sunset
    // Dawn: 1 hour before sunrise (but not earlier than 5am)
    const dawnEnd = Math.max(5, sunriseHour - 1)
    if (hour >= 5 && hour < dawnEnd) return 'dawn'

    // Sunrise: Always include actual sunrise hour, then extend period
    if (hour === sunriseHour) return 'sunrise'
    const sunriseEnd = Math.min(10, sunriseHour + 2)
    if (hour >= dawnEnd && hour < sunriseEnd) return 'sunrise'

    // Morning: After sunrise period until 10am (only if there's a gap)
    if (sunriseEnd < 10 && hour >= sunriseEnd && hour < 10) return 'morning'

    // Day: 10am to 3pm
    if (hour >= 10 && hour < 15) return 'day'

    // Afternoon: 3pm until 2 hours before sunset
    const duskStart = Math.max(15, sunsetHour - 2)
    if (hour >= 15 && hour < duskStart) return 'afternoon'

    // Dusk: 2 hours before sunset
    if (hour >= duskStart && hour < sunsetHour) return 'dusk'

    // Sunset: Always include actual sunset hour, then extend period
    if (hour === sunsetHour) return 'sunset'
    const sunsetEnd = Math.min(22, sunsetHour + 2)
    if (hour > sunsetHour && hour < sunsetEnd) return 'sunset'

    // Evening: After sunset period until 10pm (only if there's a gap)
    if (sunsetEnd < 22 && hour >= sunsetEnd && hour < 22) return 'evening'

    // Night: 10pm to 2am
    if (hour >= 22 || hour < 2) return 'night'

    // Midnight: 2am to 5am
    return 'midnight'
  } else {
    // Fallback: Use fixed times based on local timezone (8 phases)
    if (hour >= 5 && hour < 7) return 'dawn'
    if (hour >= 7 && hour < 10) return 'sunrise'
    if (hour >= 10 && hour < 11) return 'morning'
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
