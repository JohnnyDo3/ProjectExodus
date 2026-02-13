import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  hexToHsl,
  hslToHex,
  interpolateColor,
  interpolateThemeColors,
  getSunTimes,
  getTwilightProgress,
  type ThemeColors,
} from '@/lib/smoothThemeEngine'

describe('Theme Engine - Color Utilities', () => {
  describe('hexToHsl', () => {
    it('converts pure red correctly', () => {
      const result = hexToHsl('#ff0000')
      expect(result.h).toBeCloseTo(0, 0)
      expect(result.s).toBeCloseTo(100, 0)
      expect(result.l).toBeCloseTo(50, 0)
    })

    it('converts pure green correctly', () => {
      const result = hexToHsl('#00ff00')
      expect(result.h).toBeCloseTo(120, 0)
      expect(result.s).toBeCloseTo(100, 0)
      expect(result.l).toBeCloseTo(50, 0)
    })

    it('converts pure blue correctly', () => {
      const result = hexToHsl('#0000ff')
      expect(result.h).toBeCloseTo(240, 0)
      expect(result.s).toBeCloseTo(100, 0)
      expect(result.l).toBeCloseTo(50, 0)
    })

    it('converts white correctly', () => {
      const result = hexToHsl('#ffffff')
      expect(result.s).toBe(0)
      expect(result.l).toBe(100)
    })

    it('converts black correctly', () => {
      const result = hexToHsl('#000000')
      expect(result.s).toBe(0)
      expect(result.l).toBe(0)
    })

    it('converts mid-gray correctly', () => {
      const result = hexToHsl('#808080')
      expect(result.s).toBe(0)
      expect(result.l).toBeCloseTo(50, 0)
    })

    it('handles hex without # prefix', () => {
      const result = hexToHsl('ff0000')
      expect(result.h).toBeCloseTo(0, 0)
    })
  })

  describe('hslToHex', () => {
    it('converts pure red correctly', () => {
      expect(hslToHex(0, 100, 50).toLowerCase()).toBe('#ff0000')
    })

    it('converts pure green correctly', () => {
      expect(hslToHex(120, 100, 50).toLowerCase()).toBe('#00ff00')
    })

    it('converts pure blue correctly', () => {
      expect(hslToHex(240, 100, 50).toLowerCase()).toBe('#0000ff')
    })

    it('converts white correctly', () => {
      expect(hslToHex(0, 0, 100).toLowerCase()).toBe('#ffffff')
    })

    it('converts black correctly', () => {
      expect(hslToHex(0, 0, 0).toLowerCase()).toBe('#000000')
    })

    it('converts mid-gray correctly', () => {
      const result = hslToHex(0, 0, 50).toLowerCase()
      // Should be close to #808080
      expect(result).toMatch(/^#[78][0-9a-f][78][0-9a-f][78][0-9a-f]$/)
    })
  })

  describe('hexToHsl and hslToHex roundtrip', () => {
    const testColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff', '#000000']

    testColors.forEach(color => {
      it(`roundtrips ${color} correctly`, () => {
        const hsl = hexToHsl(color)
        const result = hslToHex(hsl.h, hsl.s, hsl.l).toLowerCase()
        expect(result).toBe(color.toLowerCase())
      })
    })
  })

  describe('interpolateColor', () => {
    it('returns first color at t=0', () => {
      const result = interpolateColor('#ff0000', '#0000ff', 0)
      expect(result.toLowerCase()).toBe('#ff0000')
    })

    it('returns second color at t=1', () => {
      const result = interpolateColor('#ff0000', '#0000ff', 1)
      expect(result.toLowerCase()).toBe('#0000ff')
    })

    it('returns midpoint color at t=0.5', () => {
      // Red to blue at midpoint should be purple-ish (through magenta path)
      const result = interpolateColor('#ff0000', '#0000ff', 0.5)
      const hsl = hexToHsl(result)
      // Should be around 300 (magenta) or between red and blue
      expect(hsl.h).toBeGreaterThan(240)
      expect(hsl.h).toBeLessThan(360)
    })

    it('interpolates black to white as grayscale', () => {
      const result = interpolateColor('#000000', '#ffffff', 0.5)
      const hsl = hexToHsl(result)
      // Allow for small rounding errors in hex conversion (0 decimal places = within 0.5)
      expect(hsl.l).toBeCloseTo(50, 0)
    })

    it('takes shorter path around color wheel', () => {
      // Red (0) to blue (240) - should go through magenta (300+), not through green
      const result = interpolateColor('#ff0000', '#0000ff', 0.25)
      const hsl = hexToHsl(result)
      // Should be in magenta range, not yellow/green
      expect(hsl.h).toBeGreaterThan(300) // Magenta side
    })
  })

  describe('interpolateThemeColors', () => {
    const lightTheme: ThemeColors = {
      background: '#ffffff',
      foreground: '#000000',
      primary: '#0066cc',
      primaryForeground: '#ffffff',
      secondary: '#f0f0f0',
      secondaryForeground: '#333333',
      accent: '#ff6600',
      accentForeground: '#ffffff',
      muted: '#f5f5f5',
      mutedForeground: '#666666',
      card: '#ffffff',
      cardForeground: '#000000',
      border: '#e0e0e0',
    }

    const darkTheme: ThemeColors = {
      background: '#1a1a1a',
      foreground: '#ffffff',
      primary: '#3399ff',
      primaryForeground: '#000000',
      secondary: '#2a2a2a',
      secondaryForeground: '#cccccc',
      accent: '#ff9933',
      accentForeground: '#000000',
      muted: '#333333',
      mutedForeground: '#999999',
      card: '#252525',
      cardForeground: '#ffffff',
      border: '#404040',
    }

    it('returns first theme at t=0', () => {
      const result = interpolateThemeColors(lightTheme, darkTheme, 0)
      expect(result.background.toLowerCase()).toBe('#ffffff')
      expect(result.foreground.toLowerCase()).toBe('#000000')
    })

    it('returns second theme at t=1', () => {
      const result = interpolateThemeColors(lightTheme, darkTheme, 1)
      expect(result.background.toLowerCase()).toBe('#1a1a1a')
      expect(result.foreground.toLowerCase()).toBe('#ffffff')
    })

    it('interpolates all color properties', () => {
      const result = interpolateThemeColors(lightTheme, darkTheme, 0.5)

      // All properties should exist and be valid hex colors
      const colorKeys = Object.keys(lightTheme) as (keyof ThemeColors)[]
      colorKeys.forEach(key => {
        expect(result[key]).toMatch(/^#[0-9a-fA-F]{6}$/)
      })
    })

    it('produces intermediate lightness at t=0.5', () => {
      const result = interpolateThemeColors(lightTheme, darkTheme, 0.5)
      const bgHsl = hexToHsl(result.background)

      // Should be between white (100) and dark (close to 10)
      expect(bgHsl.l).toBeGreaterThan(20)
      expect(bgHsl.l).toBeLessThan(80)
    })
  })
})

describe('Theme Engine - Sun Calculations', () => {
  describe('getSunTimes', () => {
    it('returns valid sun times for New York', () => {
      const nyLat = 40.7128
      const nyLon = -74.006
      const date = new Date('2024-06-21T12:00:00Z') // Summer solstice

      const times = getSunTimes(nyLat, nyLon, date)

      expect(times.sunrise).toBeInstanceOf(Date)
      expect(times.sunset).toBeInstanceOf(Date)
      expect(times.solarNoon).toBeInstanceOf(Date)
      expect(times.dawn).toBeInstanceOf(Date)
      expect(times.dusk).toBeInstanceOf(Date)
    })

    it('sunrise is before sunset', () => {
      const times = getSunTimes(40.7128, -74.006, new Date('2024-06-21'))

      expect(times.sunrise.getTime()).toBeLessThan(times.sunset.getTime())
    })

    it('dawn is before sunrise', () => {
      const times = getSunTimes(40.7128, -74.006, new Date('2024-06-21'))

      expect(times.dawn.getTime()).toBeLessThan(times.sunrise.getTime())
    })

    it('dusk is after sunset', () => {
      const times = getSunTimes(40.7128, -74.006, new Date('2024-06-21'))

      expect(times.dusk.getTime()).toBeGreaterThan(times.sunset.getTime())
    })

    it('solar noon is between sunrise and sunset', () => {
      const times = getSunTimes(40.7128, -74.006, new Date('2024-06-21'))

      expect(times.solarNoon.getTime()).toBeGreaterThan(times.sunrise.getTime())
      expect(times.solarNoon.getTime()).toBeLessThan(times.sunset.getTime())
    })

    it('handles southern hemisphere (Sydney)', () => {
      const sydneyLat = -33.8688
      const sydneyLon = 151.2093
      const date = new Date('2024-06-21') // Winter in Australia

      const times = getSunTimes(sydneyLat, sydneyLon, date)

      expect(times.sunrise).toBeInstanceOf(Date)
      expect(times.sunset).toBeInstanceOf(Date)
      expect(times.sunrise.getTime()).toBeLessThan(times.sunset.getTime())
    })

    it('handles Arctic location in summer (long days)', () => {
      const arcticLat = 70.0
      const arcticLon = 25.0
      const date = new Date('2024-06-21') // Summer solstice

      const times = getSunTimes(arcticLat, arcticLon, date)

      // In Arctic summer, sun may not set - times may be NaN or very long day
      expect(times.sunrise).toBeInstanceOf(Date)
    })
  })

  describe('getTwilightProgress', () => {
    // getTwilightProgress takes (date, coords) not (date, sunTimes)
    // Without coords, it uses a simple sun altitude approximation based on hour

    it('returns 0 during full day (noon)', () => {
      // At noon (12:00), sun altitude is at maximum (~90°), should return 0
      const noon = new Date('2024-06-21T12:00:00')
      const progress = getTwilightProgress(noon)

      expect(progress).toBe(0)
    })

    it('returns 0 during mid-morning', () => {
      // At 9 AM, sun should be well above horizon
      const morning = new Date('2024-06-21T09:00:00')
      const progress = getTwilightProgress(morning)

      expect(progress).toBe(0)
    })

    it('returns 1 during deep night', () => {
      // At 2 AM, sun is well below horizon
      const midnight = new Date('2024-06-21T02:00:00')
      const progress = getTwilightProgress(midnight)

      expect(progress).toBe(1)
    })

    it('returns value between 0 and 1 during dawn transition', () => {
      // Around 5:30 AM should be transitioning
      const dawn = new Date('2024-06-21T05:30:00')
      const progress = getTwilightProgress(dawn)

      expect(progress).toBeGreaterThanOrEqual(0)
      expect(progress).toBeLessThanOrEqual(1)
    })

    it('returns value between 0 and 1 during dusk transition', () => {
      // Around 8:30 PM (20:30) should be transitioning
      const dusk = new Date('2024-06-21T20:30:00')
      const progress = getTwilightProgress(dusk)

      expect(progress).toBeGreaterThanOrEqual(0)
      expect(progress).toBeLessThanOrEqual(1)
    })

    it('returns higher progress at night than during day', () => {
      const noon = new Date('2024-06-21T12:00:00')
      const midnight = new Date('2024-06-21T00:00:00')

      const dayProgress = getTwilightProgress(noon)
      const nightProgress = getTwilightProgress(midnight)

      expect(nightProgress).toBeGreaterThan(dayProgress)
    })
  })
})
