'use client'

import { useSkyTheme } from './SkyThemeProvider'
import { NightSkyConstellations } from './NightSkyConstellations'

export function SkyBackground() {
  const { theme, currentPhase } = useSkyTheme()

  const isNightTime = ['dusk', 'evening', 'night', 'midnight'].includes(currentPhase)

  return (
    <>
      {/* Sky Gradient Background */}
      {!isNightTime && (
        <div
          className="fixed inset-0 z-0 transition-all duration-[2000ms] ease-in-out pointer-events-none"
          style={{
            background: theme.colors.sky
          }}
        />
      )}

      {/* Night Sky with Constellations - fixed position for all pages */}
      {isNightTime && (
        <div className="fixed inset-0 z-0">
          <NightSkyConstellations />
        </div>
      )}

      {/* Content overlay to ensure content is above background */}
      <div className="relative z-10">
        {/* This div ensures all page content renders above the sky background */}
      </div>
    </>
  )
}
