'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun, Clock, Sunrise, ChevronDown } from 'lucide-react'
import { useTimeTheme, type ThemeMode } from '@/components/providers/TimeThemeProvider'

export function ThemeToggle() {
  const { mode, setMode, phase, isDay, twilightProgress } = useTimeTheme()
  const [mounted, setMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const modeConfig = {
    auto: {
      label: 'Auto Sync',
      description: 'Smooth transitions throughout the day',
    },
    morning: {
      label: 'Day Mode',
      description: 'Bright and vibrant, always',
    },
    night: {
      label: 'Night Mode',
      description: 'Dark and restful, always',
    },
  }

  const getModeIcon = (themeMode: ThemeMode, className?: string) => {
    const props = { className: className || 'w-5 h-5' }
    switch (themeMode) {
      case 'auto': return <Sunrise {...props} />
      case 'morning': return <Sun {...props} />
      case 'night': return <Moon {...props} />
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
          <div className="absolute right-0 sm:right-0 mt-2 w-[calc(100vw-2rem)] sm:w-72 max-w-72 bg-[var(--card)] rounded-xl shadow-theme-lg border-2 border-theme-primary overflow-hidden z-[200]">
            <div className="p-3 border-b-2 border-[var(--border)] bg-[var(--muted)]">
              <div className="flex items-center gap-2">
                {getCurrentIcon('w-5 h-5 text-theme-primary')}
                <div>
                  <h3 className="font-bold text-[var(--foreground)] text-sm uppercase tracking-wide">
                    Living Theme
                  </h3>
                  {mode === 'auto' && (
                    <p className="text-xs text-theme-muted mt-0.5">
                      Currently: {phase}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-2 space-y-1">
              {(Object.keys(modeConfig) as ThemeMode[]).map((themeMode) => {
                const config = modeConfig[themeMode]
                const isActive = mode === themeMode

                return (
                  <button
                    key={themeMode}
                    onClick={() => {
                      setMode(themeMode)
                      setDropdownOpen(false)
                    }}
                    className={`w-full flex items-start gap-3 px-3 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 border-2 border-theme-primary'
                        : 'hover:bg-[var(--muted)] border-2 border-transparent'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-[var(--primary)]/20' : 'bg-[var(--muted)]'}`}>
                      {getModeIcon(themeMode, `w-4 h-4 ${
                        isActive
                          ? 'text-theme-primary'
                          : 'text-theme-muted'
                      }`)}
                    </div>
                    <div className="flex-1 text-left">
                      <div
                        className={`font-bold text-sm ${
                          isActive
                            ? 'text-theme-primary'
                            : 'text-[var(--foreground)]'
                        }`}
                      >
                        {config.label}
                      </div>
                      <div className="text-xs text-theme-muted mt-0.5">
                        {config.description}
                      </div>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-theme-primary mt-2 animate-pulse" />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="p-3 border-t-2 border-[var(--border)] bg-[var(--muted)]">
              <div className="flex items-start gap-2">
                <Sunrise className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[var(--foreground)] leading-relaxed">
                  <span className="font-semibold">Auto Sync</span> creates smooth color transitions based on real sunrise/sunset times for your location.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
