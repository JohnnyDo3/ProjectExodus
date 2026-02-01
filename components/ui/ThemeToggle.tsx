'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Moon, Sun, Clock, Sunrise, Sunset, CloudMoon, ChevronDown } from 'lucide-react'
import { useTimeTheme, type ThemeMode } from '@/components/providers/TimeThemeProvider'

export function ThemeToggle() {
  const { data: session } = useSession()
  const { mode, setMode, phase, isDay, twilightProgress } = useTimeTheme()
  const [mounted, setMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Enhanced mode setter that saves to database for logged-in users
  const handleModeChange = async (newMode: ThemeMode) => {
    // Update local state immediately
    setMode(newMode)
    setDropdownOpen(false)

    // Save to database if user is logged in
    if (session?.user) {
      try {
        await fetch('/api/users/theme', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ themePreference: newMode }),
        })
        console.log('[Theme] Saved preference to database:', newMode)
      } catch (error) {
        console.error('[Theme] Failed to save preference to database:', error)
      }
    }
  }

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg border-2 border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] transition-all"
        aria-label="Theme selector"
      >
        <Clock className="w-5 h-5 text-[var(--foreground)]" />
      </button>
    )
  }

  const modeConfig: Record<ThemeMode, { label: string; description: string }> = {
    auto: {
      label: 'Auto (Follows Sun)',
      description: 'Changes with real sunrise and sunset',
    },
    light: {
      label: 'Light (Always Day)',
      description: 'Bright and sunny, all the time',
    },
    dark: {
      label: 'Dark (Always Night)',
      description: 'Dark and starry, all the time',
    },
    sunrise: {
      label: 'Sunrise',
      description: 'Warm morning golden hour',
    },
    sunset: {
      label: 'Sunset',
      description: 'Beautiful evening colors',
    },
    dusk: {
      label: 'Dusk',
      description: 'Peaceful twilight mood',
    },
  }

  const getModeIcon = (themeMode: ThemeMode, className?: string) => {
    const props = { className: className || 'w-5 h-5' }
    switch (themeMode) {
      case 'auto': return <Clock {...props} />
      case 'light': return <Sun {...props} />
      case 'dark': return <Moon {...props} />
      case 'sunrise': return <Sunrise {...props} />
      case 'sunset': return <Sunset {...props} />
      case 'dusk': return <CloudMoon {...props} />
      default: return <Clock {...props} />
    }
  }

  // Get dynamic icon based on current state when in auto mode
  const getCurrentIcon = (className?: string) => {
    if (mode !== 'auto') {
      return getModeIcon(mode, className)
    }

    // In auto mode, show sun/moon based on twilight progress
    const props = { className: className || 'w-5 h-5' }
    if (twilightProgress < 0.3) {
      return <Sun {...props} />
    } else if (twilightProgress > 0.7) {
      return <Moon {...props} />
    } else {
      return <Sunrise {...props} /> // Twilight
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-1.5 p-2 rounded-lg border-2 border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] hover:border-theme-primary transition-all"
        aria-label={`Theme: ${modeConfig[mode].label}`}
      >
        {getCurrentIcon('w-5 h-5 text-theme-primary')}
        <ChevronDown className={`w-3 h-3 text-theme-muted transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {dropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-[199]"
            onClick={() => setDropdownOpen(false)}
          />
          <div className="absolute right-0 mt-2 bg-[var(--card)] rounded-xl shadow-theme-lg border-2 border-theme-primary z-[200]" style={{ width: '340px', minWidth: '340px' }}>
            <div className="p-4 border-b-2 border-[var(--border)] bg-[var(--muted)] rounded-t-xl">
              <div className="flex items-center gap-3">
                {getCurrentIcon('w-6 h-6 text-theme-primary')}
                <div>
                  <h3 className="font-bold text-[var(--foreground)] text-base">
                    Living Theme
                  </h3>
                  {mode === 'auto' && (
                    <p className="text-sm text-theme-muted mt-0.5">
                      Currently: {phase}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-3 space-y-2">
              {(Object.keys(modeConfig) as ThemeMode[]).map((themeMode) => {
                const config = modeConfig[themeMode]
                const isActive = mode === themeMode

                return (
                  <button
                    key={themeMode}
                    onClick={() => handleModeChange(themeMode)}
                    className={`w-full flex items-start gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 border-2 border-theme-primary'
                        : 'hover:bg-[var(--muted)] border-2 border-transparent'
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg ${isActive ? 'bg-[var(--primary)]/20' : 'bg-[var(--muted)]'}`}>
                      {getModeIcon(themeMode, `w-5 h-5 ${
                        isActive
                          ? 'text-theme-primary'
                          : 'text-theme-muted'
                      }`)}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div
                        className={`font-bold text-sm ${
                          isActive
                            ? 'text-theme-primary'
                            : 'text-[var(--foreground)]'
                        }`}
                      >
                        {config.label}
                      </div>
                      <div className="text-xs text-theme-muted mt-1">
                        {config.description}
                      </div>
                    </div>
                    {isActive && (
                      <div className="w-2.5 h-2.5 rounded-full bg-theme-primary mt-2 animate-pulse flex-shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="p-4 border-t-2 border-[var(--border)] bg-[var(--muted)] rounded-b-xl">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  <span className="font-semibold">Pick your favorite!</span> Auto follows the real sun, or choose any theme you like.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
