'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun, Sunrise, Sunset, Clock } from 'lucide-react'
import type { ThemeMode } from '@/components/providers/TimeThemeProvider'

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('auto')
  const [mounted, setMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = (localStorage.getItem('theme_mode') as ThemeMode) || 'auto'
    setMode(stored)
  }, [])

  const handleModeChange = (newMode: ThemeMode) => {
    setMode(newMode)
    localStorage.setItem('theme_mode', newMode)
    setDropdownOpen(false)

    // Update theme immediately
    if (newMode === 'morning') {
      document.documentElement.className = 'day'
    } else if (newMode === 'night') {
      document.documentElement.className = 'night'
    }

    // Dispatch custom event to notify TimeThemeProvider
    window.dispatchEvent(new CustomEvent('theme-mode-change', { detail: { mode: newMode } }))
  }

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg border-2 border-earth-200 bg-white hover:bg-sand-100 hover:border-earth-300 transition-colors"
        aria-label="Theme selector"
      >
        <Clock className="w-5 h-5 text-earth-900" />
      </button>
    )
  }

  const modeConfig = {
    auto: {
      icon: Clock,
      label: 'Auto',
      description: 'Syncs with your local time',
    },
    morning: {
      icon: Sun,
      label: 'Morning',
      description: 'Always bright and vibrant',
    },
    night: {
      icon: Moon,
      label: 'Night',
      description: 'Always dark and restful',
    },
  }

  const CurrentIcon = modeConfig[mode].icon

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="p-2 rounded-lg border-2 border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] hover:border-theme-primary transition-all"
        aria-label={`Theme: ${modeConfig[mode].label}`}
      >
        <CurrentIcon className="w-5 h-5 text-theme-primary" />
      </button>

      {dropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setDropdownOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-[var(--card)] rounded-xl shadow-theme-lg border-2 border-theme-primary overflow-hidden z-50">
            <div className="p-3 border-b-2 border-[var(--border)]">
              <h3 className="font-bold text-[var(--foreground)] text-sm uppercase tracking-wide">
                Living Theme
              </h3>
              <p className="text-xs text-theme-muted mt-1">
                Choose how the site breathes
              </p>
            </div>

            <div className="p-2 space-y-2">
              {(Object.keys(modeConfig) as ThemeMode[]).map((themeMode) => {
                const config = modeConfig[themeMode]
                const Icon = config.icon
                const isActive = mode === themeMode

                return (
                  <button
                    key={themeMode}
                    onClick={() => handleModeChange(themeMode)}
                    className={`w-full flex items-start gap-3 px-3 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-[var(--muted)] border-2 border-theme-primary'
                        : 'hover:bg-[var(--muted)] border-2 border-transparent'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 mt-0.5 ${
                        isActive
                          ? 'text-theme-primary'
                          : 'text-theme-muted'
                      }`}
                    />
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
                      <div className="w-2 h-2 rounded-full bg-theme-primary mt-2" />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="p-3 border-t-2 border-[var(--border)] bg-[var(--muted)]">
              <div className="flex items-start gap-2">
                <Sunrise className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[var(--foreground)] leading-relaxed">
                  <span className="font-semibold">Auto mode</span> adapts to your location's real
                  sunrise and sunset times for a truly natural experience.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
