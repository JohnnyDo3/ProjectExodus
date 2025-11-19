'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage or system preference
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const initialTheme = stored || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg border-2 border-earth-200 bg-white hover:bg-sand-100 hover:border-earth-300 transition-colors"
        aria-label="Toggle theme"
      >
        <Sun className="w-5 h-5 text-earth-900" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border-2 border-earth-200 bg-white hover:bg-sand-100 hover:border-earth-300 dark:border-moss-500 dark:bg-earth-700 dark:hover:bg-earth-600 dark:hover:border-moss-400 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-earth-900" />
      ) : (
        <Sun className="w-5 h-5 text-moss-300" />
      )}
    </button>
  )
}
