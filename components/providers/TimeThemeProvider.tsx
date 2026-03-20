'use client'

import { useEffect, useState, useCallback, useMemo, useRef, createContext, useContext } from 'react'
import { useSession } from 'next-auth/react'
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
        },
        () => {
          // Geolocation not available, use stored or default
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
        .catch(() => { /* Failed to load preference from database */ })
    }
  }, [status, session?.user])

  // Mode setter that persists to storage
  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode)
    savePreferences({ mode: newMode })

    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('theme-mode-change', { detail: { mode: newMode } }))
  }, [])

  // Track last phase to skip redundant state updates
  const lastPhaseRef = useRef<string>('')
  const lastClassRef = useRef<string>('')

  // Main theme update effect
  useEffect(() => {
    if (!mounted) return

    const themeClasses = ['day', 'night', 'sunrise', 'sunset', 'dusk', 'evening']
    const setThemeClass = (cls: string) => {
      if (cls === lastClassRef.current) return // Skip if unchanged
      lastClassRef.current = cls
      const el = document.documentElement
      themeClasses.forEach(c => el.classList.remove(c))
      el.classList.add(cls)
    }

    const updateTheme = () => {
      const now = new Date()

      // Handle fixed modes
      if (mode !== 'auto') {
        const { colors, phase: fixedPhase, className } = getFixedModeColors(mode as 'light' | 'dark')
        setThemeClass(className)
        applyThemeColors(colors)
        if (fixedPhase !== lastPhaseRef.current) {
          lastPhaseRef.current = fixedPhase
          setPhase(fixedPhase)
          const isLightMode = mode === 'light'
          setIsDay(isLightMode)
          setTwilightProgress(isLightMode ? 0 : 1)
          setSunAltitude(isLightMode ? 60 : -30)
        }
        return
      }

      // AUTO MODE - Smooth interpolation
      const { colors, phase: currentPhase } = getCurrentThemeColors(now, coords)
      applyThemeColors(colors)

      // Calculate sun position for UI elements
      const sunPos = getSunPosition(now, coords)
      const twilight = getTwilightProgress(now, coords)

      // Only trigger React re-renders when phase actually changes
      if (currentPhase !== lastPhaseRef.current) {
        lastPhaseRef.current = currentPhase
        setPhase(currentPhase)
        setIsDay(sunPos.isDay)
        setTwilightProgress(twilight)
        setSunAltitude(sunPos.sunAltitude)
      }

      // Set appropriate class for day-only/night-only CSS visibility
      if (twilight < 0.3) {
        setThemeClass('day')
      } else if (twilight > 0.7) {
        setThemeClass('night')
      } else if (twilight < 0.5) {
        setThemeClass('dusk')
      } else {
        setThemeClass('evening')
      }
    }

    // Update immediately
    updateTheme()

    // Update every 2 minutes — color changes are imperceptible at shorter intervals
    // CSS variables are updated directly on the DOM, so React doesn't re-render
    const interval = setInterval(updateTheme, 120000)

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

  // Memoize context value to prevent unnecessary re-renders of consumers
  const contextValue = useMemo<TimeThemeContextType>(() => ({
    mode,
    setMode,
    phase,
    isDay,
    twilightProgress,
    sunAltitude,
    coords,
  }), [mode, setMode, phase, isDay, twilightProgress, sunAltitude, coords])

  return (
    <TimeThemeContext.Provider value={contextValue}>
      {children}
    </TimeThemeContext.Provider>
  )
}

