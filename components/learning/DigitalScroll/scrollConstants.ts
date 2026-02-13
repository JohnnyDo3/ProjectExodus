// ============================================
// THE SACRED DIGITAL TEXTBOOK CONSTANTS
// "And the book was opened..." - Revelation 20:12
// ============================================

import {
  Sword,
  MessageCircle,
  Stethoscope,
  Lightbulb,
  HeartHandshake,
  Flower2,
  Scale,
  type LucideIcon
} from 'lucide-react'

// ============================================
// THE SEVEN GUARDIAN RIBBONS
// Each ribbon corresponds to a chapter (Learning Module)
// Colors match the Guardian Archetypes from the Volition system
// ============================================

export interface GuardianRibbon {
  id: string
  name: string
  title: string
  value: string
  icon: LucideIcon
  colors: {
    from: string
    to: string
    gradient: string
  }
  chapterIndex: number
}

export const GUARDIAN_RIBBONS: Record<string, GuardianRibbon> = {
  michael: {
    id: 'michael',
    name: 'MICHAEL',
    title: 'Guardian of Strength',
    value: 'STRENGTH',
    icon: Sword,
    colors: {
      from: '#dc2626',
      to: '#f97316',
      gradient: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
    },
    chapterIndex: 0,
  },
  gabriel: {
    id: 'gabriel',
    name: 'GABRIEL',
    title: 'Guardian of Revelation',
    value: 'REVELATION',
    icon: MessageCircle,
    colors: {
      from: '#0ea5e9',
      to: '#2563eb',
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
    },
    chapterIndex: 1,
  },
  raphael: {
    id: 'raphael',
    name: 'RAPHAEL',
    title: 'Guardian of Healing',
    value: 'HEALING',
    icon: Stethoscope,
    colors: {
      from: '#10b981',
      to: '#0d9488',
      gradient: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
    },
    chapterIndex: 2,
  },
  uriel: {
    id: 'uriel',
    name: 'URIEL',
    title: 'Guardian of Wisdom',
    value: 'WISDOM',
    icon: Lightbulb,
    colors: {
      from: '#f59e0b',
      to: '#eab308',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #eab308 100%)',
    },
    chapterIndex: 3,
  },
  camael: {
    id: 'camael',
    name: 'CAMAEL',
    title: 'Guardian of Love',
    value: 'LOVE',
    icon: HeartHandshake,
    colors: {
      from: '#ec4899',
      to: '#e11d48',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #e11d48 100%)',
    },
    chapterIndex: 4,
  },
  jophiel: {
    id: 'jophiel',
    name: 'JOPHIEL',
    title: 'Guardian of Beauty',
    value: 'BEAUTY',
    icon: Flower2,
    colors: {
      from: '#8b5cf6',
      to: '#9333ea',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #9333ea 100%)',
    },
    chapterIndex: 5,
  },
  zadkiel: {
    id: 'zadkiel',
    name: 'ZADKIEL',
    title: 'Guardian of Mercy',
    value: 'MERCY',
    icon: Scale,
    colors: {
      from: '#6366f1',
      to: '#1d4ed8',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #1d4ed8 100%)',
    },
    chapterIndex: 6,
  },
}

// Ordered array for rendering (legacy)
export const RIBBON_ORDER = [
  'michael',
  'gabriel',
  'raphael',
  'uriel',
  'camael',
  'jophiel',
  'zadkiel',
] as const

// ============================================
// LEARNING STAGE RIBBONS (New - replaces Guardian theming)
// Each ribbon represents a stage in the learning journey
// ============================================

export interface LearningStageRibbon {
  id: string
  name: string
  description: string
  icon: string
  colors: {
    from: string
    to: string
    gradient: string
  }
  chapterIndex: number
}

export const LEARNING_STAGE_RIBBONS: Record<string, LearningStageRibbon> = {
  foundation: {
    id: 'foundation',
    name: 'Foundation',
    description: 'Building core understanding',
    icon: '🌱',
    colors: {
      from: '#10b981',
      to: '#059669',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
    chapterIndex: 0,
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    description: 'Expanding knowledge',
    icon: '🌿',
    colors: {
      from: '#0ea5e9',
      to: '#0284c7',
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    },
    chapterIndex: 1,
  },
  connection: {
    id: 'connection',
    name: 'Connection',
    description: 'Linking concepts together',
    icon: '🔗',
    colors: {
      from: '#8b5cf6',
      to: '#7c3aed',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    },
    chapterIndex: 2,
  },
  application: {
    id: 'application',
    name: 'Application',
    description: 'Putting knowledge into practice',
    icon: '⚡',
    colors: {
      from: '#f59e0b',
      to: '#d97706',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    },
    chapterIndex: 3,
  },
  mastery: {
    id: 'mastery',
    name: 'Mastery',
    description: 'Deep expertise',
    icon: '🏆',
    colors: {
      from: '#ec4899',
      to: '#db2777',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    },
    chapterIndex: 4,
  },
  innovation: {
    id: 'innovation',
    name: 'Innovation',
    description: 'Creating new solutions',
    icon: '💡',
    colors: {
      from: '#6366f1',
      to: '#4f46e5',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    },
    chapterIndex: 5,
  },
  leadership: {
    id: 'leadership',
    name: 'Leadership',
    description: 'Teaching and guiding others',
    icon: '🌟',
    colors: {
      from: '#dc2626',
      to: '#b91c1c',
      gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    },
    chapterIndex: 6,
  },
}

// Stage order for new system
export const STAGE_ORDER = [
  'foundation',
  'growth',
  'connection',
  'application',
  'mastery',
  'innovation',
  'leadership',
] as const

// Helper to get stage ribbon for chapter
export function getStageForChapter(chapterIndex: number): LearningStageRibbon | null {
  const stageKey = STAGE_ORDER[chapterIndex]
  return stageKey ? LEARNING_STAGE_RIBBONS[stageKey] : null
}

// ============================================
// THE YIN-YANG RIBBON (Continue Reading)
// The 8th ribbon - represents continuity
// ============================================

export const YIN_YANG_RIBBON = {
  id: 'continue',
  name: 'CONTINUE',
  title: 'Continue Your Journey',
  colors: {
    light: '#ffffff',
    dark: '#000000',
    gradient: 'linear-gradient(180deg, #000000 0%, #ffffff 50%, #000000 100%)',
  },
}

// ============================================
// BOOK DIMENSIONS & LAYOUT
// ============================================

export const SCROLL_DIMENSIONS = {
  // Desktop two-page spread
  desktop: {
    width: '85vw',
    maxWidth: '1400px',
    height: '80vh',
    maxHeight: '900px',
    pageWidth: '50%',
    spineWidth: '40px',
    ribbonTop: '-60px',
    ribbonWidth: '24px',
    ribbonHeight: '80px',
  },
  // Tablet single page
  tablet: {
    width: '90vw',
    maxWidth: '768px',
    height: '85vh',
    maxHeight: '1000px',
    pageWidth: '100%',
    spineWidth: '0px',
    ribbonTop: '0px',
    ribbonWidth: '28px',
    ribbonHeight: '36px',
  },
  // Mobile single page
  mobile: {
    width: '100vw',
    maxWidth: '100%',
    height: '100vh',
    maxHeight: '100%',
    pageWidth: '100%',
    spineWidth: '0px',
    ribbonTop: '0px',
    ribbonWidth: '24px',
    ribbonHeight: '28px',
  },
}

// ============================================
// ANIMATION TIMINGS
// The Revelation Sequence
// ============================================

export const ANIMATION_TIMINGS = {
  // Act I: The Descent
  descent: {
    duration: 600,
    bounce: {
      count: 2,
      duration: 150,
    },
  },
  // Act II: The Pause
  pause: {
    duration: 400,
  },
  // Act III: The Opening
  opening: {
    duration: 800,
    coverRotation: 180,
  },
  // Act IV: The Seeking
  seeking: {
    basePageFlip: 300,
    acceleration: 0.85, // Each flip is 85% of previous
    minFlipTime: 100,
  },
  // Page flip
  pageFlip: {
    duration: 400,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  // Ribbon interactions
  ribbon: {
    hover: 300,
    click: 200,
    glow: 2000, // Pulse duration for active ribbon
  },
}

// ============================================
// THEME COLORS (Day/Night Sync)
// ============================================

export const SCROLL_THEME = {
  day: {
    paper: '#faf8f5',      // Warm cream
    text: '#2d2d2d',       // Dark charcoal
    shadow: 'rgba(0, 0, 0, 0.2)',
    spine: '#d4c9b8',
    pageEdge: '#e8e0d4',
    ribbonGlow: 'rgba(0, 0, 0, 0.1)',
  },
  night: {
    paper: '#2a2825',      // Warm dark
    text: '#e8e4df',       // Light cream
    shadow: 'rgba(0, 0, 0, 0.5)',
    spine: '#1a1816',
    pageEdge: '#3d3835',
    ribbonGlow: 'rgba(255, 255, 255, 0.2)',
  },
}

// CSS variables for theme integration
export const SCROLL_CSS_VARS = {
  paper: 'var(--book-paper, var(--card))',
  text: 'var(--book-text, var(--foreground))',
  shadow: 'var(--book-shadow, rgba(0, 0, 0, 0.2))',
  spine: 'var(--book-spine, var(--muted))',
  pageEdge: 'var(--book-page-edge, var(--border))',
}

// ============================================
// 3D PERSPECTIVE SETTINGS
// ============================================

export const PERSPECTIVE_CONFIG = {
  container: '2000px',
  pageFlip: {
    lift: '50px',    // Z-lift at peak of flip
    peak: '100px',   // Max Z at 90deg
    shadow: {
      initial: '2px 2px 10px rgba(0, 0, 0, 0.1)',
      peak: '10px 10px 30px rgba(0, 0, 0, 0.3)',
    },
  },
}

// ============================================
// WATERMARK EASTER EGGS
// Subtle archetype icons as page watermarks
// ============================================

export const WATERMARK_CONFIG = {
  opacity: 0.04,     // 4% opacity - barely visible
  size: '200px',
  position: 'bottom-right',
  rotation: -15,     // Slight rotation for organic feel
  blur: '0.5px',     // Slight blur for subtlety
}

// ============================================
// SOUND EFFECTS (Optional - Accessibility Toggle)
// ============================================

export const SOUND_CONFIG = {
  enabled: false,  // Default off for accessibility
  volume: 0.3,
  effects: {
    descent: '/sounds/book-land.mp3',
    open: '/sounds/book-open.mp3',
    pageFlip: '/sounds/page-turn.mp3',
    close: '/sounds/book-close.mp3',
  },
}

// ============================================
// ACCESSIBILITY
// ============================================

export const A11Y_CONFIG = {
  reducedMotion: {
    skipAnimations: true,
    instantTransitions: true,
  },
  keyboardNav: {
    nextPage: ['ArrowRight', 'ArrowDown', 'Space'],
    prevPage: ['ArrowLeft', 'ArrowUp'],
    closeScroll: ['Escape'],
    jumpToChapter: ['1', '2', '3', '4', '5', '6', '7'],
    continueReading: ['0', 'c'],
  },
  ariaLabels: {
    book: 'Digital Scroll',
    cover: 'Book Cover',
    spine: 'Book Spine',
    leftPage: 'Left page (verso)',
    rightPage: 'Right page (recto)',
    ribbon: (name: string) => `${name} chapter bookmark`,
    continueRibbon: 'Continue reading bookmark',
    pageNumber: (current: number, total: number) => `Page ${current} of ${total}`,
  },
}

// ============================================
// STORAGE KEYS
// ============================================

export const STORAGE_KEYS = {
  bookUnlocked: 'exodus_book_experience_unlocked',
  unlockedAt: 'exodus_book_unlocked_at',
  unlockedFromTopic: 'exodus_book_unlocked_topic',
  readingPositions: 'exodus_reading_positions',
  preferences: 'exodus_book_preferences',
}

// ============================================
// CORE TOPICS (Books)
// Maps to the learning system's core topics
// ============================================

export const CORE_TOPIC_ICONS: Record<string, string> = {
  'renewable-energy': '⚡',
  'water-systems': '💧',
  'sustainable-agriculture': '🌾',
  'green-building': '🏠',
  'waste-reduction': '♻️',
  'biodiversity': '🦋',
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getRibbonForChapter(chapterIndex: number): GuardianRibbon | null {
  const ribbonKey = RIBBON_ORDER[chapterIndex]
  return ribbonKey ? GUARDIAN_RIBBONS[ribbonKey] : null
}

export function getChapterTitle(chapterIndex: number): string {
  const ribbon = getRibbonForChapter(chapterIndex)
  return ribbon ? `Chapter ${chapterIndex + 1}: The Way of ${ribbon.value}` : `Chapter ${chapterIndex + 1}`
}

export function getDeviceType(): 'desktop' | 'tablet' | 'mobile' {
  if (typeof window === 'undefined') return 'desktop'
  const width = window.innerWidth
  if (width >= 1024) return 'desktop'
  if (width >= 768) return 'tablet'
  return 'mobile'
}

export function getDimensions() {
  const device = getDeviceType()
  return SCROLL_DIMENSIONS[device]
}
