'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Moon, Sun, Clock, ChevronDown } from 'lucide-react'
import { useTimeTheme, type ThemeMode } from '@/components/providers/TimeThemeProvider'

export function ThemeToggle() {
  const { data: session } = useSession()
  const { mode, setMode, phase, twilightProgress } = useTimeTheme()
  const [mounted, setMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Enhanced mode setter that saves to database for logged-in users
  const handleModeChange = async (newMode: ThemeMode) => {
    setMode(newMode)
    setDropdownOpen(false)

    if (session?.user) {
      try {
        await fetch('/api/users/theme', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ themePreference: newMode }),
        })
      } catch {
        // silently handle save error
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
      label: 'Auto Sync',
      description: 'Follows real sunrise & sunset at your location',
    },
    light: {
      label: 'Day',
      description: 'Always bright and sunny',
    },
    dark: {
      label: 'Night',
      description: 'Always dark and starry',
    },
  }

  const getModeIcon = (themeMode: ThemeMode, className?: string) => {
    const props = { className: className || 'w-5 h-5' }
    switch (themeMode) {
      case 'auto': return <Clock {...props} />
      case 'light': return <Sun {...props} />
      case 'dark': return <Moon {...props} />
      default: return <Clock {...props} />
    }
  }

  // Get dynamic icon based on current state when in auto mode
  const getCurrentIcon = (className?: string) => {
    if (mode !== 'auto') {
      return getModeIcon(mode, className)
    }

    const props = { className: className || 'w-5 h-5' }
    if (twilightProgress < 0.3) {
      return <Sun {...props} />
    } else if (twilightProgress > 0.7) {
      return <Moon {...props} />
    } else {
      return <Clock {...props} />
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
          <div className="absolute right-0 mt-2 bg-[var(--card)] rounded-xl shadow-theme-lg border-2 border-theme-primary z-[200]" style={{ width: '280px', minWidth: '280px' }}>
            <div className="p-3 border-b-2 border-[var(--border)] bg-[var(--muted)] rounded-t-xl">
              <div className="flex items-center gap-3">
                {getCurrentIcon('w-5 h-5 text-theme-primary')}
                <div>
                  <h3 className="font-bold text-[var(--foreground)] text-sm">Theme</h3>
                  {mode === 'auto' && (
                    <p className="text-xs text-theme-muted">Currently: {phase}</p>
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
                    onClick={() => handleModeChange(themeMode)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 border-2 border-theme-primary'
                        : 'hover:bg-[var(--muted)] border-2 border-transparent'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-[var(--primary)]/20' : 'bg-[var(--muted)]'}`}>
                      {getModeIcon(themeMode, `w-4 h-4 ${isActive ? 'text-theme-primary' : 'text-theme-muted'}`)}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className={`font-bold text-sm ${isActive ? 'text-theme-primary' : 'text-[var(--foreground)]'}`}>
                        {config.label}
                      </div>
                      <div className="text-xs text-theme-muted">
                        {config.description}
                      </div>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-theme-primary animate-pulse flex-shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
