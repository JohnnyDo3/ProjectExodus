// Design System Constants
// Earth-toned, natural, organic color palette

export const COLORS = {
  // Primary earth tones
  earth: {
    50: '#f6f5f3',
    100: '#e8e5df',
    200: '#d4cec3',
    300: '#b9ae9d',
    400: '#a08f79',
    500: '#8c7a62',
    600: '#786856',
    700: '#625547',
    800: '#52473d',
    900: '#473d35',
  },
  // Vibrant greens for growth/energy
  moss: {
    50: '#f3f8f3',
    100: '#e3f0e3',
    200: '#c7e1c9',
    300: '#9ccba0',
    400: '#6baf72',
    500: '#489450',
    600: '#36763d',
    700: '#2d5e32',
    800: '#274b2a',
    900: '#223e25',
  },
  // Accent terracotta
  terra: {
    50: '#fdf6f3',
    100: '#fae9e1',
    200: '#f4d1c2',
    300: '#ebb09a',
    400: '#df8567',
    500: '#d46643',
    600: '#c24f31',
    700: '#a13f27',
    800: '#853625',
    900: '#6e3023',
  },
  // Deep ocean blue for trust
  ocean: {
    50: '#f2f9f9',
    100: '#ddf0f0',
    200: '#bfe2e2',
    300: '#91cdcd',
    400: '#5db0b0',
    500: '#429393',
    600: '#357777',
    700: '#2e6161',
    800: '#295050',
    900: '#264444',
  },
  // Warm sand/cream for backgrounds
  sand: {
    50: '#fafaf9',
    100: '#f5f5f3',
    200: '#e9e8e4',
    300: '#dad8d1',
    400: '#c5c2b8',
    500: '#aaa69a',
    600: '#8e8a7f',
    700: '#74716a',
    800: '#615f5a',
    900: '#53504c',
  },
} as const

export const GRADIENTS = {
  earth: 'bg-gradient-to-br from-earth-400 via-moss-500 to-ocean-600',
  hero: 'bg-gradient-to-b from-sand-50 via-moss-50 to-ocean-50',
  card: 'bg-gradient-to-br from-white to-sand-50',
  accent: 'bg-gradient-to-r from-terra-500 to-terra-600',
} as const

export const TYPOGRAPHY = {
  fonts: {
    heading: 'var(--font-geist-sans)',
    body: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
  },
  sizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },
} as const

export const SPACING = {
  section: {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-24 md:py-32',
  },
  container: {
    sm: 'px-4 md:px-6',
    md: 'px-6 md:px-8',
    lg: 'px-8 md:px-12',
  },
} as const

export const ANIMATIONS = {
  transition: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  ease: {
    smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
} as const

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export const RADIUS = {
  none: '0',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
} as const
