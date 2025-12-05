'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type SkyPhase = 'dawn' | 'morning' | 'day' | 'afternoon' | 'dusk' | 'evening' | 'night' | 'midnight'

interface SkyTheme {
  phase: SkyPhase
  colors: {
    primary: string
    secondary: string
    background: string
    sky: string
  }
}

interface SkyThemeContextType {
  currentPhase: SkyPhase
  theme: SkyTheme
  setPhase: (phase: SkyPhase) => void
}

const SkyThemeContext = createContext<SkyThemeContextType | undefined>(undefined)

const skyThemes: Record<SkyPhase, SkyTheme> = {
  dawn: {
    phase: 'dawn',
    colors: {
      primary: '#FF6B9D', // Pink
      secondary: '#FFA07A', // Coral
      background: '#FFF5E6',
      sky: 'linear-gradient(to bottom, #FF6B9D 0%, #FFA07A 25%, #FFB6C1 50%, #FFDAB9 100%)'
    }
  },
  morning: {
    phase: 'morning',
    colors: {
      primary: '#87CEEB', // Sky blue
      secondary: '#FFD700', // Gold
      background: '#F0F8FF',
      sky: 'linear-gradient(to bottom, #4A90E2 0%, #87CEEB 30%, #B0E0E6 70%, #E0F6FF 100%)'
    }
  },
  day: {
    phase: 'day',
    colors: {
      primary: '#1E90FF', // Dodger blue
      secondary: '#FFA500', // Orange
      background: '#FFFFFF',
      sky: 'linear-gradient(to bottom, #0077BE 0%, #1E90FF 20%, #87CEEB 60%, #B0E0E6 100%)'
    }
  },
  afternoon: {
    phase: 'afternoon',
    colors: {
      primary: '#FF8C00', // Dark orange
      secondary: '#FFD700', // Gold
      background: '#FFF8DC',
      sky: 'linear-gradient(to bottom, #4A90E2 0%, #87CEEB 30%, #FFD700 70%, #FFA500 100%)'
    }
  },
  dusk: {
    phase: 'dusk',
    colors: {
      primary: '#FF4500', // Orange red
      secondary: '#9370DB', // Medium purple
      background: '#2F1B3C',
      sky: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 20%, #5D3A9B 40%, #FF6347 70%, #FFA07A 100%)'
    }
  },
  evening: {
    phase: 'evening',
    colors: {
      primary: '#4B0082', // Indigo
      secondary: '#9370DB', // Medium purple
      background: '#1A1A2E',
      sky: 'linear-gradient(to bottom, #0f0f1e 0%, #1a1a2e 30%, #2E1A47 60%, #4B0082 100%)'
    }
  },
  night: {
    phase: 'night',
    colors: {
      primary: '#191970', // Midnight blue
      secondary: '#4169E1', // Royal blue
      background: '#0A0A0F',
      sky: 'linear-gradient(to bottom, #000000 0%, #0A0A0F 20%, #191970 50%, #1C1C3C 100%)'
    }
  },
  midnight: {
    phase: 'midnight',
    colors: {
      primary: '#000080', // Navy
      secondary: '#483D8B', // Dark slate blue
      background: '#000000',
      sky: 'linear-gradient(to bottom, #000000 0%, #0A0A14 40%, #191970 80%, #000033 100%)'
    }
  }
}

function getPhaseFromTime(hour: number): SkyPhase {
  if (hour >= 5 && hour < 7) return 'dawn'
  if (hour >= 7 && hour < 10) return 'morning'
  if (hour >= 10 && hour < 15) return 'day'
  if (hour >= 15 && hour < 18) return 'afternoon'
  if (hour >= 18 && hour < 20) return 'dusk'
  if (hour >= 20 && hour < 22) return 'evening'
  if (hour >= 22 || hour < 2) return 'night'
  return 'midnight'
}

export function SkyThemeProvider({ children }: { children: ReactNode }) {
  const [currentPhase, setCurrentPhase] = useState<SkyPhase>('day')
  const [theme, setTheme] = useState<SkyTheme>(skyThemes.day)
  const [manualMode, setManualMode] = useState<'auto' | 'morning' | 'night' | null>(null)

  // Listen for TimeThemeProvider mode changes
  useEffect(() => {
    // Check localStorage for initial mode
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('project_exodus_theme_prefs')
        if (stored) {
          const prefs = JSON.parse(stored)
          const mode = prefs.mode as 'auto' | 'morning' | 'night'

          if (mode === 'morning') {
            setManualMode('morning')
            setCurrentPhase('day')
            setTheme(skyThemes.day)
          } else if (mode === 'night') {
            setManualMode('night')
            setCurrentPhase('midnight')
            setTheme(skyThemes.midnight)
          } else {
            setManualMode(null)
          }
        }
      } catch (error) {
        console.error('[SkyTheme] Failed to load initial mode from localStorage:', error)
      }
    }

    // Listen for theme-mode-change events from TimeThemeProvider
    const handleModeChange = (event: CustomEvent<{ mode: 'auto' | 'morning' | 'night' }>) => {
      const { mode } = event.detail

      if (mode === 'morning') {
        setManualMode('morning')
        setCurrentPhase('day')
        setTheme(skyThemes.day)
      } else if (mode === 'night') {
        setManualMode('night')
        setCurrentPhase('midnight')
        setTheme(skyThemes.midnight)
      } else if (mode === 'auto') {
        setManualMode(null)
        // When returning to auto, immediately update to current time-based phase
        const now = new Date()
        const hour = now.getHours()
        const phase = getPhaseFromTime(hour)
        setCurrentPhase(phase)
        setTheme(skyThemes[phase])
      }
    }

    window.addEventListener('theme-mode-change', handleModeChange as EventListener)

    return () => {
      window.removeEventListener('theme-mode-change', handleModeChange as EventListener)
    }
  }, [])

  // Time-based phase calculation (only runs when in auto mode)
  useEffect(() => {
    // Skip time-based updates when in manual mode
    if (manualMode !== null) {
      return
    }

    // Set initial phase based on current time
    const now = new Date()
    const hour = now.getHours()
    const phase = getPhaseFromTime(hour)
    setCurrentPhase(phase)
    setTheme(skyThemes[phase])

    // Update every minute to check if phase should change
    const interval = setInterval(() => {
      const now = new Date()
      const hour = now.getHours()
      const newPhase = getPhaseFromTime(hour)
      if (newPhase !== currentPhase) {
        setCurrentPhase(newPhase)
        setTheme(skyThemes[newPhase])
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [currentPhase, manualMode])

  // Apply theme colors to CSS variables
  useEffect(() => {
    const root = document.documentElement

    // Apply sky background if it's a gradient string
    if (theme.colors.sky.startsWith('linear-gradient')) {
      root.style.setProperty('--sky-gradient', theme.colors.sky)
    }

    // Smooth transition between themes
    root.style.transition = 'all 2s ease-in-out'
  }, [theme])

  const setPhase = (phase: SkyPhase) => {
    setCurrentPhase(phase)
    setTheme(skyThemes[phase])
  }

  return (
    <SkyThemeContext.Provider value={{ currentPhase, theme, setPhase }}>
      {children}
    </SkyThemeContext.Provider>
  )
}

export function useSkyTheme() {
  const context = useContext(SkyThemeContext)
  if (!context) {
    throw new Error('useSkyTheme must be used within SkyThemeProvider')
  }
  return context
}
