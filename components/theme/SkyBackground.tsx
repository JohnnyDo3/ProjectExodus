'use client'

import { useSkyTheme } from './SkyThemeProvider'

export function SkyBackground() {
  const { theme, currentPhase } = useSkyTheme()

  // Only show daytime sky gradient - night sky is handled by home page hero only
  const isNightTime = ['dusk', 'evening', 'night', 'midnight'].includes(currentPhase)

  // During night, let the CSS theme variables handle the background
  // The NightSkyConstellations is only used on the home page hero
  if (isNightTime) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-0 transition-all duration-[2000ms] ease-in-out pointer-events-none"
      style={{
        background: theme.colors.sky
      }}
    />
  )
}
