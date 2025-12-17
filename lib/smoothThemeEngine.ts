/**
 * Smooth Theme Engine for Project Exodus
 *
 * Creates continuous, gradual color transitions throughout the day,
 * mimicking natural sun cycles for an immersive "outdoor" experience.
 *
 * Features:
 * - Continuous color interpolation (not discrete phase jumps)
 * - HSL color space blending for natural transitions
 * - Real sunrise/sunset data via suncalc
 * - Persistent storage of all preferences (indefinite)
 * - 24-keyframe color system for smooth gradients
 */

import * as SunCalc from 'suncalc'

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface ThemeColors {
  background: string
  foreground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  accent: string
  accentForeground: string
  muted: string
  mutedForeground: string
  card: string
  cardForeground: string
  border: string
}

export interface TimeKeyframe {
  hour: number // 0-24 (can be decimal for precise timing)
  colors: ThemeColors
  label: string
}

export interface UserPreferences {
  mode: 'auto' | 'morning' | 'night'
  latitude: number | null
  longitude: number | null
  lastUpdated: number // timestamp
}

export interface SunTimes {
  sunrise: Date
  sunset: Date
  solarNoon: Date
  dawn: Date
  dusk: Date
  nauticalDawn: Date
  nauticalDusk: Date
}

// ============================================
// COLOR UTILITIES
// ============================================

/**
 * Convert hex color to HSL values
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  // Remove # if present
  hex = hex.replace(/^#/, '')

  // Parse hex to RGB
  const r = parseInt(hex.slice(0, 2), 16) / 255
  const g = parseInt(hex.slice(2, 4), 16) / 255
  const b = parseInt(hex.slice(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

/**
 * Convert HSL values to hex color
 */
export function hslToHex(h: number, s: number, l: number): string {
  h = h / 360
  s = s / 100
  l = l / 100

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * Interpolate between two colors in HSL space
 * This produces more natural color transitions than RGB
 */
export function interpolateColor(color1: string, color2: string, t: number): string {
  const hsl1 = hexToHsl(color1)
  const hsl2 = hexToHsl(color2)

  // Handle hue interpolation (wrap around 360)
  let h1 = hsl1.h
  let h2 = hsl2.h

  // Take the shorter path around the color wheel
  if (Math.abs(h2 - h1) > 180) {
    if (h1 < h2) {
      h1 += 360
    } else {
      h2 += 360
    }
  }

  const h = ((1 - t) * h1 + t * h2) % 360
  const s = (1 - t) * hsl1.s + t * hsl2.s
  const l = (1 - t) * hsl1.l + t * hsl2.l

  return hslToHex(h, s, l)
}

/**
 * Interpolate between two ThemeColors objects
 */
export function interpolateThemeColors(
  colors1: ThemeColors,
  colors2: ThemeColors,
  t: number
): ThemeColors {
  return {
    background: interpolateColor(colors1.background, colors2.background, t),
    foreground: interpolateColor(colors1.foreground, colors2.foreground, t),
    primary: interpolateColor(colors1.primary, colors2.primary, t),
    primaryForeground: interpolateColor(colors1.primaryForeground, colors2.primaryForeground, t),
    secondary: interpolateColor(colors1.secondary, colors2.secondary, t),
    secondaryForeground: interpolateColor(colors1.secondaryForeground, colors2.secondaryForeground, t),
    accent: interpolateColor(colors1.accent, colors2.accent, t),
    accentForeground: interpolateColor(colors1.accentForeground, colors2.accentForeground, t),
    muted: interpolateColor(colors1.muted, colors2.muted, t),
    mutedForeground: interpolateColor(colors1.mutedForeground, colors2.mutedForeground, t),
    card: interpolateColor(colors1.card, colors2.card, t),
    cardForeground: interpolateColor(colors1.cardForeground, colors2.cardForeground, t),
    border: interpolateColor(colors1.border, colors2.border, t),
  }
}

// ============================================
// 24-HOUR COLOR KEYFRAMES
// ============================================

// Base color values (reused across keyframes)
const EARTH_600 = '#786856'
const EARTH_700 = '#625547'
const EARTH_800 = '#52473d'
const EARTH_900 = '#473d35'
const SAND_100 = '#f5f5f3'
const SAND_200 = '#e9e8e4'
const SAND_300 = '#dad8d1'
const SAND_400 = '#c5c2b8'
const SAND_50 = '#fafaf9'
const MOSS_400 = '#6baf72'
const MOSS_600 = '#36763d'
const TERRA_400 = '#df8567'
const TERRA_500 = '#d46643'
const TERRA_600 = '#c24f31'
const OCEAN_400 = '#5db0b0'
const OCEAN_500 = '#429393'

// Galaxy night colors
const GALAXY_BLACK = '#020208'
const GALAXY_DEEP = '#0a0a18'
const GALAXY_MUTED = '#1a1a2e'
const GALAXY_BORDER = '#2a2a4a'
const STAR_BLUE = '#6eb5ff'
const NEBULA_PURPLE = '#d4a0ff'
const AURORA_CYAN = '#7fdbca'
const STARLIGHT = '#f0f0ff'
const STARLIGHT_MUTED = '#8888aa'

// Foreground colors for buttons/badges
const WHITE = '#ffffff'
const DARK_FG = '#1a1a1a'

/**
 * 24 keyframes for smooth day-long color transitions
 * These represent key moments in the day cycle
 */
export const TIME_KEYFRAMES: TimeKeyframe[] = [
  // DEEP NIGHT (12am - 3am)
  {
    hour: 0,
    label: 'Midnight',
    colors: {
      background: GALAXY_BLACK,
      foreground: STARLIGHT,
      primary: STAR_BLUE,
      primaryForeground: DARK_FG,
      secondary: NEBULA_PURPLE,
      secondaryForeground: DARK_FG,
      accent: AURORA_CYAN,
      accentForeground: DARK_FG,
      muted: GALAXY_MUTED,
      mutedForeground: STARLIGHT_MUTED,
      card: GALAXY_DEEP,
      cardForeground: STARLIGHT,
      border: GALAXY_BORDER,
    }
  },
  {
    hour: 2,
    label: 'Deep Night',
    colors: {
      background: GALAXY_BLACK,
      foreground: STARLIGHT,
      primary: STAR_BLUE,
      primaryForeground: DARK_FG,
      secondary: NEBULA_PURPLE,
      secondaryForeground: DARK_FG,
      accent: AURORA_CYAN,
      accentForeground: DARK_FG,
      muted: GALAXY_MUTED,
      mutedForeground: STARLIGHT_MUTED,
      card: GALAXY_DEEP,
      cardForeground: STARLIGHT,
      border: GALAXY_BORDER,
    }
  },
  // PRE-DAWN (3am - 5am)
  {
    hour: 3.5,
    label: 'Pre-Dawn',
    colors: {
      background: '#2a2520',
      foreground: '#d4cfc9',
      primary: '#6a7a70',
      primaryForeground: WHITE,
      secondary: '#9b6a5a',
      secondaryForeground: WHITE,
      accent: '#6a8a8a',
      accentForeground: WHITE,
      muted: '#3a3530',
      mutedForeground: '#a5a095',
      card: '#322d28',
      cardForeground: '#d4cfc9',
      border: '#4a4540',
    }
  },
  // DAWN (5am - 6am)
  {
    hour: 5,
    label: 'Early Dawn',
    colors: {
      background: '#4a3a3a',
      foreground: '#e5d5d0',
      primary: '#c47080',
      primaryForeground: WHITE,
      secondary: '#d08070',
      secondaryForeground: WHITE,
      accent: '#7090a0',
      accentForeground: WHITE,
      muted: '#5a4a4a',
      mutedForeground: '#b0a5a0',
      card: '#524545',
      cardForeground: '#e5d5d0',
      border: '#6a5a5a',
    }
  },
  {
    hour: 5.5,
    label: 'Dawn Breaking',
    colors: {
      background: '#f5e0e0',
      foreground: EARTH_800,
      primary: '#e07090',
      primaryForeground: WHITE,
      secondary: '#e09080',
      secondaryForeground: WHITE,
      accent: '#80a0b0',
      accentForeground: WHITE,
      muted: '#ead0d0',
      mutedForeground: EARTH_600,
      card: '#fff0f0',
      cardForeground: EARTH_800,
      border: '#e0c0c0',
    }
  },
  // SUNRISE (6am - 7am)
  {
    hour: 6,
    label: 'Sunrise',
    colors: {
      background: '#fff5f0',
      foreground: EARTH_800,
      primary: '#ff8ba7',
      primaryForeground: WHITE,
      secondary: '#ffb4a2',
      secondaryForeground: WHITE,
      accent: '#87b8c7',
      accentForeground: WHITE,
      muted: '#ffe8dd',
      mutedForeground: EARTH_600,
      card: '#fffaf7',
      cardForeground: EARTH_800,
      border: '#ffd4c4',
    }
  },
  {
    hour: 7,
    label: 'Golden Hour Morning',
    colors: {
      background: '#fff8f0',
      foreground: EARTH_800,
      primary: '#e8a05d',
      primaryForeground: WHITE,
      secondary: '#e89b8f',
      secondaryForeground: WHITE,
      accent: '#7eb8b8',
      accentForeground: WHITE,
      muted: '#f9e8d9',
      mutedForeground: EARTH_600,
      card: '#fffbf5',
      cardForeground: EARTH_800,
      border: '#f4d9c4',
    }
  },
  // MORNING (8am - 10am)
  {
    hour: 8,
    label: 'Early Morning',
    colors: {
      background: '#faf9f5',
      foreground: EARTH_800,
      primary: '#d09050',
      primaryForeground: WHITE,
      secondary: '#d08878',
      secondaryForeground: WHITE,
      accent: '#70a8a8',
      accentForeground: WHITE,
      muted: '#f0e8d8',
      mutedForeground: EARTH_600,
      card: '#fefcf8',
      cardForeground: EARTH_800,
      border: '#e8d8c0',
    }
  },
  {
    hour: 9,
    label: 'Mid Morning',
    colors: {
      background: '#f8f8f4',
      foreground: EARTH_900,
      primary: '#608858',
      primaryForeground: WHITE,
      secondary: TERRA_500,
      secondaryForeground: WHITE,
      accent: OCEAN_500,
      accentForeground: WHITE,
      muted: '#ece8e0',
      mutedForeground: EARTH_600,
      card: '#fcfcfa',
      cardForeground: EARTH_900,
      border: '#dcd8d0',
    }
  },
  // DAY (10am - 3pm)
  {
    hour: 10,
    label: 'Late Morning',
    colors: {
      background: SAND_50,
      foreground: EARTH_900,
      primary: MOSS_600,
      primaryForeground: WHITE,
      secondary: TERRA_500,
      secondaryForeground: WHITE,
      accent: OCEAN_500,
      accentForeground: WHITE,
      muted: SAND_200,
      mutedForeground: EARTH_600,
      card: '#ffffff',
      cardForeground: EARTH_900,
      border: SAND_300,
    }
  },
  {
    hour: 12,
    label: 'Midday',
    colors: {
      background: SAND_50,
      foreground: EARTH_900,
      primary: MOSS_600,
      primaryForeground: WHITE,
      secondary: TERRA_500,
      secondaryForeground: WHITE,
      accent: OCEAN_500,
      accentForeground: WHITE,
      muted: SAND_200,
      mutedForeground: EARTH_600,
      card: '#ffffff',
      cardForeground: EARTH_900,
      border: SAND_300,
    }
  },
  {
    hour: 14,
    label: 'Early Afternoon',
    colors: {
      background: SAND_50,
      foreground: EARTH_900,
      primary: MOSS_600,
      primaryForeground: WHITE,
      secondary: TERRA_500,
      secondaryForeground: WHITE,
      accent: OCEAN_500,
      accentForeground: WHITE,
      muted: SAND_200,
      mutedForeground: EARTH_600,
      card: '#ffffff',
      cardForeground: EARTH_900,
      border: SAND_300,
    }
  },
  // AFTERNOON (3pm - 5pm)
  {
    hour: 15,
    label: 'Afternoon',
    colors: {
      background: '#fff9e6',
      foreground: EARTH_900,
      primary: '#e89550',
      primaryForeground: WHITE,
      secondary: '#d88855',
      secondaryForeground: WHITE,
      accent: '#8fa89f',
      accentForeground: WHITE,
      muted: '#f4ebcd',
      mutedForeground: EARTH_700,
      card: '#fffcf0',
      cardForeground: EARTH_900,
      border: '#ead4b0',
    }
  },
  {
    hour: 16.5,
    label: 'Late Afternoon',
    colors: {
      background: '#fff5dc',
      foreground: EARTH_900,
      primary: '#e08040',
      primaryForeground: WHITE,
      secondary: '#d07545',
      secondaryForeground: WHITE,
      accent: '#9a9a8a',
      accentForeground: WHITE,
      muted: '#f0e0b8',
      mutedForeground: EARTH_700,
      card: '#fff8e8',
      cardForeground: EARTH_900,
      border: '#e0c898',
    }
  },
  // PRE-DUSK (5pm - 6pm)
  {
    hour: 17.5,
    label: 'Pre-Dusk',
    colors: {
      background: '#f8ede0',
      foreground: EARTH_900,
      primary: '#d87048',
      primaryForeground: WHITE,
      secondary: '#c86548',
      secondaryForeground: WHITE,
      accent: '#8a7a6a',
      accentForeground: WHITE,
      muted: '#e8d8c0',
      mutedForeground: EARTH_700,
      card: '#fcf5ec',
      cardForeground: EARTH_900,
      border: '#d8c0a8',
    }
  },
  // DUSK (6pm - 7pm)
  {
    hour: 18,
    label: 'Early Dusk',
    colors: {
      background: '#f5ebe0',
      foreground: EARTH_900,
      primary: '#d67050',
      primaryForeground: WHITE,
      secondary: '#c45f40',
      secondaryForeground: WHITE,
      accent: '#8b7565',
      accentForeground: WHITE,
      muted: '#e8d5c4',
      mutedForeground: EARTH_700,
      card: '#faf3ea',
      cardForeground: EARTH_900,
      border: '#d9c3ad',
    }
  },
  {
    hour: 19,
    label: 'Golden Hour Evening',
    colors: {
      background: '#f0e5d8',
      foreground: EARTH_900,
      primary: '#d06545',
      primaryForeground: WHITE,
      secondary: '#b85838',
      secondaryForeground: WHITE,
      accent: '#806858',
      accentForeground: WHITE,
      muted: '#e0d0c0',
      mutedForeground: EARTH_700,
      card: '#f5ede4',
      cardForeground: EARTH_900,
      border: '#d0b8a0',
    }
  },
  // SUNSET (7pm - 8pm)
  {
    hour: 19.5,
    label: 'Sunset',
    colors: {
      background: '#ebe0d8',
      foreground: EARTH_900,
      primary: TERRA_600,
      primaryForeground: WHITE,
      secondary: '#9b6f8f',
      secondaryForeground: WHITE,
      accent: '#7a6a5f',
      accentForeground: WHITE,
      muted: '#ddd0c4',
      mutedForeground: EARTH_700,
      card: '#f0e8e0',
      cardForeground: EARTH_900,
      border: '#cfc0ad',
    }
  },
  {
    hour: 20,
    label: 'Late Sunset',
    colors: {
      background: '#e0d5d0',
      foreground: EARTH_900,
      primary: '#b05848',
      primaryForeground: WHITE,
      secondary: '#8a6080',
      secondaryForeground: WHITE,
      accent: '#6a5a50',
      accentForeground: WHITE,
      muted: '#d0c0b8',
      mutedForeground: EARTH_700,
      card: '#e8dcd5',
      cardForeground: EARTH_900,
      border: '#c0b0a0',
    }
  },
  // EVENING (8pm - 9pm) - Critical transition zone - improved contrast
  {
    hour: 20.5,
    label: 'Early Evening',
    colors: {
      background: '#4a4038',
      foreground: '#e8e0d8',
      primary: '#c87058',
      primaryForeground: WHITE,
      secondary: '#a07080',
      secondaryForeground: WHITE,
      accent: '#7a9090',
      accentForeground: WHITE,
      muted: '#3a3530',
      mutedForeground: '#b0a898',
      card: '#423830',
      cardForeground: '#e8e0d8',
      border: '#5a5048',
    }
  },
  {
    hour: 21,
    label: 'Evening',
    colors: {
      background: '#2a2520',
      foreground: '#e0d8d0',
      primary: '#7a9a6a',
      primaryForeground: WHITE,
      secondary: '#b07060',
      secondaryForeground: WHITE,
      accent: '#6a9090',
      accentForeground: WHITE,
      muted: '#3a3530',
      mutedForeground: '#a8a098',
      card: '#322d28',
      cardForeground: '#e0d8d0',
      border: '#4a4540',
    }
  },
  // NIGHT (9pm - 12am)
  {
    hour: 22,
    label: 'Night',
    colors: {
      background: GALAXY_BLACK,
      foreground: STARLIGHT,
      primary: STAR_BLUE,
      primaryForeground: DARK_FG,
      secondary: NEBULA_PURPLE,
      secondaryForeground: DARK_FG,
      accent: AURORA_CYAN,
      accentForeground: DARK_FG,
      muted: GALAXY_MUTED,
      mutedForeground: STARLIGHT_MUTED,
      card: GALAXY_DEEP,
      cardForeground: STARLIGHT,
      border: GALAXY_BORDER,
    }
  },
  {
    hour: 23,
    label: 'Late Night',
    colors: {
      background: GALAXY_BLACK,
      foreground: STARLIGHT,
      primary: STAR_BLUE,
      primaryForeground: DARK_FG,
      secondary: NEBULA_PURPLE,
      secondaryForeground: DARK_FG,
      accent: AURORA_CYAN,
      accentForeground: DARK_FG,
      muted: GALAXY_MUTED,
      mutedForeground: STARLIGHT_MUTED,
      card: GALAXY_DEEP,
      cardForeground: STARLIGHT,
      border: GALAXY_BORDER,
    }
  },
]

// ============================================
// SUN CALCULATIONS
// ============================================

/**
 * Get sun times for a given location and date
 */
export function getSunTimes(lat: number, lon: number, date: Date = new Date()): SunTimes {
  const times = SunCalc.getTimes(date, lat, lon)
  return {
    sunrise: times.sunrise,
    sunset: times.sunset,
    solarNoon: times.solarNoon,
    dawn: times.dawn,
    dusk: times.dusk,
    nauticalDawn: times.nauticalDawn,
    nauticalDusk: times.nauticalDusk,
  }
}

/**
 * Adjust keyframe hours based on actual sunrise/sunset
 * This shifts the morning/evening colors to match real sun position
 */
export function adjustKeyframesForLocation(
  keyframes: TimeKeyframe[],
  sunTimes: SunTimes
): TimeKeyframe[] {
  const sunriseHour = sunTimes.sunrise.getHours() + sunTimes.sunrise.getMinutes() / 60
  const sunsetHour = sunTimes.sunset.getHours() + sunTimes.sunset.getMinutes() / 60

  // Default sunrise/sunset assumptions (for the base keyframes)
  const defaultSunrise = 6.5
  const defaultSunset = 19.5

  // Calculate offsets
  const morningOffset = sunriseHour - defaultSunrise
  const eveningOffset = sunsetHour - defaultSunset

  return keyframes.map(kf => {
    let adjustedHour = kf.hour

    // Adjust morning keyframes (before noon)
    if (kf.hour >= 4 && kf.hour < 12) {
      // Gradually apply the offset
      const t = (kf.hour - 4) / 8 // 0 at 4am, 1 at noon
      adjustedHour = kf.hour + morningOffset * (1 - t)
    }
    // Adjust evening keyframes (after noon)
    else if (kf.hour >= 16 && kf.hour < 24) {
      // Gradually apply the offset
      const t = (kf.hour - 16) / 8 // 0 at 4pm, 1 at midnight
      adjustedHour = kf.hour + eveningOffset * (1 - t)
    }

    return { ...kf, hour: Math.max(0, Math.min(24, adjustedHour)) }
  })
}

// ============================================
// INTERPOLATION ENGINE
// ============================================

/**
 * Get the current interpolated theme colors
 */
export function getCurrentThemeColors(
  date: Date = new Date(),
  coords: { latitude: number; longitude: number } | null = null
): { colors: ThemeColors; phase: string; progress: number } {
  // Get current hour as decimal (e.g., 14.5 = 2:30pm)
  const currentHour = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600

  // Adjust keyframes if we have location data
  let keyframes = TIME_KEYFRAMES
  if (coords) {
    const sunTimes = getSunTimes(coords.latitude, coords.longitude, date)
    keyframes = adjustKeyframesForLocation(TIME_KEYFRAMES, sunTimes)
  }

  // Find the two keyframes we're between
  let prevKeyframe = keyframes[keyframes.length - 1]
  let nextKeyframe = keyframes[0]

  for (let i = 0; i < keyframes.length; i++) {
    if (keyframes[i].hour <= currentHour) {
      prevKeyframe = keyframes[i]
      nextKeyframe = keyframes[(i + 1) % keyframes.length]
    }
  }

  // Handle wrap-around at midnight
  let prevHour = prevKeyframe.hour
  let nextHour = nextKeyframe.hour

  if (nextHour < prevHour) {
    // Crossing midnight
    if (currentHour >= prevHour) {
      nextHour += 24
    } else {
      prevHour -= 24
    }
  }

  // Calculate interpolation factor (0 to 1)
  const hourRange = nextHour - prevHour
  const hourProgress = currentHour - prevHour
  const t = hourRange > 0 ? Math.max(0, Math.min(1, hourProgress / hourRange)) : 0

  // Smooth easing for more natural transitions
  const easedT = t * t * (3 - 2 * t) // Smoothstep easing

  // Interpolate colors
  const colors = interpolateThemeColors(prevKeyframe.colors, nextKeyframe.colors, easedT)

  return {
    colors,
    phase: prevKeyframe.label,
    progress: t,
  }
}

/**
 * Apply theme colors to CSS variables on the document
 */
export function applyThemeColors(colors: ThemeColors): void {
  const root = document.documentElement

  root.style.setProperty('--background', colors.background)
  root.style.setProperty('--foreground', colors.foreground)
  root.style.setProperty('--primary', colors.primary)
  root.style.setProperty('--primary-foreground', colors.primaryForeground)
  root.style.setProperty('--secondary', colors.secondary)
  root.style.setProperty('--secondary-foreground', colors.secondaryForeground)
  root.style.setProperty('--accent', colors.accent)
  root.style.setProperty('--accent-foreground', colors.accentForeground)
  root.style.setProperty('--muted', colors.muted)
  root.style.setProperty('--muted-foreground', colors.mutedForeground)
  root.style.setProperty('--card', colors.card)
  root.style.setProperty('--card-foreground', colors.cardForeground)
  root.style.setProperty('--border', colors.border)
}

/**
 * Clear applied theme colors (return to CSS class-based themes)
 */
export function clearThemeColors(): void {
  const root = document.documentElement

  root.style.removeProperty('--background')
  root.style.removeProperty('--foreground')
  root.style.removeProperty('--primary')
  root.style.removeProperty('--primary-foreground')
  root.style.removeProperty('--secondary')
  root.style.removeProperty('--secondary-foreground')
  root.style.removeProperty('--accent')
  root.style.removeProperty('--accent-foreground')
  root.style.removeProperty('--muted')
  root.style.removeProperty('--muted-foreground')
  root.style.removeProperty('--card')
  root.style.removeProperty('--card-foreground')
  root.style.removeProperty('--border')
}

// ============================================
// PERSISTENT STORAGE
// ============================================

const STORAGE_KEY = 'project_exodus_theme_prefs'

/**
 * Save user preferences to localStorage (persists indefinitely)
 */
export function savePreferences(prefs: Partial<UserPreferences>): void {
  const existing = loadPreferences()
  const updated: UserPreferences = {
    ...existing,
    ...prefs,
    lastUpdated: Date.now(),
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (e) {
    console.error('Failed to save theme preferences:', e)
  }
}

/**
 * Load user preferences from localStorage
 */
export function loadPreferences(): UserPreferences {
  const defaults: UserPreferences = {
    mode: 'auto',
    latitude: null,
    longitude: null,
    lastUpdated: 0,
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return { ...defaults, ...parsed }
    }
  } catch (e) {
    console.error('Failed to load theme preferences:', e)
  }

  return defaults
}

/**
 * Get current sun position (0 = midnight, 0.5 = noon, 1 = midnight)
 * Useful for animating sun/moon position in hero sections
 */
export function getSunPosition(
  date: Date = new Date(),
  coords: { latitude: number; longitude: number } | null = null
): { dayProgress: number; isDay: boolean; sunAltitude: number } {
  const hour = date.getHours() + date.getMinutes() / 60
  const dayProgress = hour / 24

  let sunAltitude = 0
  let isDay = hour >= 6 && hour < 20

  if (coords) {
    const sunPosition = SunCalc.getPosition(date, coords.latitude, coords.longitude)
    sunAltitude = sunPosition.altitude * (180 / Math.PI) // Convert to degrees
    isDay = sunAltitude > 0
  } else {
    // Simple approximation without location
    // Sun is highest at noon, lowest at midnight
    sunAltitude = Math.sin((hour - 6) * Math.PI / 12) * 90
  }

  return { dayProgress, isDay, sunAltitude }
}

/**
 * Get twilight progress (0 = full day, 1 = full night)
 * Useful for fading stars and other night elements
 */
export function getTwilightProgress(
  date: Date = new Date(),
  coords: { latitude: number; longitude: number } | null = null
): number {
  const { sunAltitude } = getSunPosition(date, coords)

  // Civil twilight: sun is 0° to -6° below horizon
  // Nautical twilight: -6° to -12°
  // Astronomical twilight: -12° to -18°

  if (sunAltitude > 6) return 0 // Full day
  if (sunAltitude < -12) return 1 // Full night

  // Interpolate through twilight
  return (6 - sunAltitude) / 18
}
