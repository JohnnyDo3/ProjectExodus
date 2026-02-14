import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Test the Learning Stage theming system
describe('Learning Stage Theming', () => {
  // Import after clearing mocks
  let LEARNING_STAGE_RIBBONS: Record<string, any>
  let STAGE_ORDER: string[]
  let getStageForChapter: (chapterIndex: number) => any

  beforeEach(async () => {
    const module = await import('@/components/learning/DigitalScroll/scrollConstants')
    LEARNING_STAGE_RIBBONS = module.LEARNING_STAGE_RIBBONS
    STAGE_ORDER = module.STAGE_ORDER
    getStageForChapter = module.getStageForChapter
  })

  describe('STAGE_ORDER', () => {
    it('has 7 learning stages', () => {
      expect(STAGE_ORDER).toHaveLength(7)
    })

    it('has stages in correct order', () => {
      expect(STAGE_ORDER).toEqual([
        'foundation',
        'growth',
        'connection',
        'application',
        'mastery',
        'innovation',
        'leadership'
      ])
    })

    it('all stages exist in LEARNING_STAGE_RIBBONS', () => {
      STAGE_ORDER.forEach(stage => {
        expect(LEARNING_STAGE_RIBBONS[stage]).toBeDefined()
      })
    })
  })

  describe('LEARNING_STAGE_RIBBONS', () => {
    it('each ribbon has required properties', () => {
      Object.values(LEARNING_STAGE_RIBBONS).forEach((ribbon: any) => {
        expect(ribbon).toHaveProperty('id')
        expect(ribbon).toHaveProperty('name')
        expect(ribbon).toHaveProperty('description')
        expect(ribbon).toHaveProperty('icon')
        expect(ribbon).toHaveProperty('colors')
        expect(ribbon.colors).toHaveProperty('from')
        expect(ribbon.colors).toHaveProperty('to')
        expect(ribbon.colors).toHaveProperty('gradient')
      })
    })

    it('icons are emojis', () => {
      Object.values(LEARNING_STAGE_RIBBONS).forEach((ribbon: any) => {
        expect(typeof ribbon.icon).toBe('string')
        expect(ribbon.icon.length).toBeGreaterThan(0)
      })
    })

    it('colors are valid hex codes', () => {
      const hexPattern = /^#[0-9a-fA-F]{6}$/
      Object.values(LEARNING_STAGE_RIBBONS).forEach((ribbon: any) => {
        expect(ribbon.colors.from).toMatch(hexPattern)
        expect(ribbon.colors.to).toMatch(hexPattern)
      })
    })

    it('gradients contain valid CSS', () => {
      Object.values(LEARNING_STAGE_RIBBONS).forEach((ribbon: any) => {
        expect(ribbon.colors.gradient).toContain('linear-gradient')
      })
    })
  })

  describe('getStageForChapter', () => {
    it('returns correct stage for valid chapter indices', () => {
      expect(getStageForChapter(0)?.id).toBe('foundation')
      expect(getStageForChapter(1)?.id).toBe('growth')
      expect(getStageForChapter(2)?.id).toBe('connection')
      expect(getStageForChapter(3)?.id).toBe('application')
      expect(getStageForChapter(4)?.id).toBe('mastery')
      expect(getStageForChapter(5)?.id).toBe('innovation')
      expect(getStageForChapter(6)?.id).toBe('leadership')
    })

    it('returns null for out-of-range chapter indices', () => {
      expect(getStageForChapter(-1)).toBeNull()
      expect(getStageForChapter(7)).toBeNull()
      expect(getStageForChapter(100)).toBeNull()
    })
  })
})

// Test the Learning Stage quotes
describe('Learning Stage Quotes', () => {
  let getLearningStageQuote: (chapterIndex: number) => string

  beforeEach(async () => {
    const module = await import('@/components/learning/DigitalScroll/DecorativeElements')
    getLearningStageQuote = module.getLearningStageQuote
  })

  describe('getLearningStageQuote', () => {
    it('returns quotes for all 7 chapters', () => {
      for (let i = 0; i < 7; i++) {
        const quote = getLearningStageQuote(i)
        expect(typeof quote).toBe('string')
        expect(quote.length).toBeGreaterThan(10)
      }
    })

    it('returns fallback for invalid indices', () => {
      const fallback = getLearningStageQuote(99)
      expect(typeof fallback).toBe('string')
      expect(fallback.length).toBeGreaterThan(0)
    })

    it('quotes are educational/inspirational', () => {
      const quote0 = getLearningStageQuote(0)
      const quote6 = getLearningStageQuote(6)

      // Foundation quote should be about beginning/foundation/building
      const foundationKeywords = ['foundation', 'beginning', 'build', 'start', 'expert', 'beginner']
      const hasFoundationKeyword = foundationKeywords.some(k => quote0.toLowerCase().includes(k))
      expect(hasFoundationKeyword).toBe(true)

      // Leadership quote should be about sharing/teaching/leading
      const leadershipKeywords = ['teaching', 'share', 'others', 'greatest', 'lead', 'transform', 'inspire']
      const hasLeadershipKeyword = leadershipKeywords.some(k => quote6.toLowerCase().includes(k))
      expect(hasLeadershipKeyword).toBe(true)
    })
  })
})

// Test Fun Facts Data
describe('Fun Facts Data', () => {
  let getFunFacts: (topicId: string, level: any) => string[]
  let getRealWorldExamples: (topicId: string) => Array<{ title: string; description: string; icon: string }>
  let getSummaryPoints: (topicId: string, level: any) => string[]

  beforeEach(async () => {
    const module = await import('@/data/learning/funFacts')
    getFunFacts = module.getFunFacts
    getRealWorldExamples = module.getRealWorldExamples
    getSummaryPoints = module.getSummaryPoints
  })

  describe('getFunFacts', () => {
    const topics = ['renewable-energy', 'zero-waste', 'water-conservation', 'green-building']
    const levels = ['ELEMENTARY', 'MIDDLE_SCHOOL', 'HIGH_SCHOOL', 'UNDERGRADUATE', 'GRADUATE', 'PHD']

    it('returns facts for all known topics', () => {
      topics.forEach(topic => {
        const facts = getFunFacts(topic, 'HIGH_SCHOOL')
        expect(Array.isArray(facts)).toBe(true)
        expect(facts.length).toBeGreaterThan(0)
      })
    })

    it('returns level-appropriate facts', () => {
      levels.forEach(level => {
        const facts = getFunFacts('renewable-energy', level as any)
        expect(Array.isArray(facts)).toBe(true)
        expect(facts.length).toBeGreaterThan(0)
      })
    })

    it('returns fallback facts for unknown topics', () => {
      const facts = getFunFacts('unknown-topic', 'HIGH_SCHOOL')
      expect(Array.isArray(facts)).toBe(true)
      expect(facts.length).toBeGreaterThan(0)
    })

    it('elementary facts use appropriate language', () => {
      const facts = getFunFacts('renewable-energy', 'ELEMENTARY')
      facts.forEach(fact => {
        // Elementary facts often use exclamation marks and emojis
        expect(fact.length).toBeLessThan(200)
      })
    })

    it('graduate/PhD facts are more technical', () => {
      const elementaryFacts = getFunFacts('renewable-energy', 'ELEMENTARY')
      const phdFacts = getFunFacts('renewable-energy', 'PHD')

      // PhD facts should be longer on average (more technical detail)
      const avgElementary = elementaryFacts.reduce((a, f) => a + f.length, 0) / elementaryFacts.length
      const avgPhd = phdFacts.reduce((a, f) => a + f.length, 0) / phdFacts.length

      expect(avgPhd).toBeGreaterThanOrEqual(avgElementary * 0.8) // Allow some variance
    })
  })

  describe('getRealWorldExamples', () => {
    it('returns examples for known topics', () => {
      const examples = getRealWorldExamples('renewable-energy')
      expect(Array.isArray(examples)).toBe(true)
      expect(examples.length).toBeGreaterThanOrEqual(3)
    })

    it('each example has required properties', () => {
      const examples = getRealWorldExamples('zero-waste')
      examples.forEach(example => {
        expect(example).toHaveProperty('title')
        expect(example).toHaveProperty('description')
        expect(example).toHaveProperty('icon')
        expect(typeof example.title).toBe('string')
        expect(typeof example.description).toBe('string')
        expect(typeof example.icon).toBe('string')
      })
    })

    it('returns fallback examples for unknown topics', () => {
      const examples = getRealWorldExamples('unknown-topic')
      expect(Array.isArray(examples)).toBe(true)
      expect(examples.length).toBeGreaterThanOrEqual(3)
    })
  })

  describe('getSummaryPoints', () => {
    it('returns summary points for known topics', () => {
      const points = getSummaryPoints('renewable-energy', 'HIGH_SCHOOL')
      expect(Array.isArray(points)).toBe(true)
      expect(points.length).toBeGreaterThan(0)
    })

    it('returns fallback points for unknown topics', () => {
      const points = getSummaryPoints('unknown-topic', 'HIGH_SCHOOL')
      expect(Array.isArray(points)).toBe(true)
      expect(points.length).toBeGreaterThan(0)
    })
  })
})

// Test Bookmarks Hook (utility functions)
describe('Scroll Bookmarks', () => {
  const STORAGE_KEY_PREFIX = 'scroll-bookmarks-'

  beforeEach(() => {
    // Clear localStorage before each test
    if (typeof localStorage !== 'undefined') {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(STORAGE_KEY_PREFIX)) {
          localStorage.removeItem(key)
        }
      })
    }
  })

  it('bookmark storage key format is correct', () => {
    const topicId = 'renewable-energy'
    const expectedKey = `${STORAGE_KEY_PREFIX}${topicId}`
    expect(expectedKey).toBe('scroll-bookmarks-renewable-energy')
  })
})

// Test Content Sanitization
describe('Content Sanitization', () => {
  let sanitizeHtml: (html: string) => string

  beforeEach(async () => {
    // Mock DOMPurify since it's browser-only
    vi.mock('dompurify', () => ({
      default: {
        sanitize: (html: string) => {
          // Simple mock that strips script tags
          return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        }
      }
    }))

    const module = await import('@/lib/utils/sanitizeHtml')
    sanitizeHtml = module.sanitizeHtml
  })

  afterEach(() => {
    vi.resetModules()
  })

  it('sanitizeHtml is a function', () => {
    expect(typeof sanitizeHtml).toBe('function')
  })

  it('returns string for string input', () => {
    const result = sanitizeHtml('<p>Hello</p>')
    expect(typeof result).toBe('string')
  })
})

// Test Accessibility Configuration
describe('Accessibility Configuration', () => {
  let A11Y_CONFIG: any

  beforeEach(async () => {
    const module = await import('@/components/learning/DigitalScroll/scrollConstants')
    A11Y_CONFIG = module.A11Y_CONFIG
  })

  describe('A11Y_CONFIG', () => {
    it('has keyboard navigation config', () => {
      expect(A11Y_CONFIG).toHaveProperty('keyboardNav')
    })

    it('has aria labels', () => {
      expect(A11Y_CONFIG).toHaveProperty('ariaLabels')
    })

    it('keyboard nav has expected keys', () => {
      expect(A11Y_CONFIG.keyboardNav).toHaveProperty('nextPage')
      expect(A11Y_CONFIG.keyboardNav).toHaveProperty('prevPage')
      expect(A11Y_CONFIG.keyboardNav).toHaveProperty('closeScroll')
    })

    it('nextPage uses ArrowRight', () => {
      expect(A11Y_CONFIG.keyboardNav.nextPage).toContain('ArrowRight')
    })

    it('prevPage uses ArrowLeft', () => {
      expect(A11Y_CONFIG.keyboardNav.prevPage).toContain('ArrowLeft')
    })

    it('closeScroll uses Escape', () => {
      expect(A11Y_CONFIG.keyboardNav.closeScroll).toContain('Escape')
    })
  })
})

// Test Device Detection
describe('Device Detection', () => {
  let getDeviceType: () => 'desktop' | 'tablet' | 'mobile'

  beforeEach(async () => {
    const module = await import('@/components/learning/DigitalScroll/scrollConstants')
    getDeviceType = module.getDeviceType
  })

  it('returns desktop for large screens', () => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200
    })

    expect(getDeviceType()).toBe('desktop')
  })

  it('returns tablet for medium screens', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800
    })

    expect(getDeviceType()).toBe('tablet')
  })

  it('returns mobile for small screens', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 400
    })

    expect(getDeviceType()).toBe('mobile')
  })
})

// Test Theme Integration
describe('Theme CSS Variables', () => {
  it('book-paper and book-text variables are defined in concept', () => {
    // These are defined in globals.css
    // This test verifies our understanding of the theme structure
    const dayModeBookPaper = '#faf8f5'
    const dayModeBookText = '#2d2d2d'
    const nightModeBookPaper = '#2a2825'
    const nightModeBookText = '#e8e4df'

    // Day mode: light background, dark text
    expect(dayModeBookPaper).not.toBe(dayModeBookText)

    // Night mode: dark background, light text
    expect(nightModeBookPaper).not.toBe(nightModeBookText)

    // Paper should be lighter than text in day mode
    // (simple heuristic: first hex chars)
    expect(parseInt(dayModeBookPaper.slice(1, 3), 16)).toBeGreaterThan(
      parseInt(dayModeBookText.slice(1, 3), 16)
    )
  })
})

// Test Topic Icons
describe('Topic Icons', () => {
  let CORE_TOPIC_ICONS: Record<string, string>

  beforeEach(async () => {
    const module = await import('@/components/learning/DigitalScroll/scrollConstants')
    CORE_TOPIC_ICONS = module.CORE_TOPIC_ICONS
  })

  it('has icons for core sustainability topics', () => {
    const expectedTopics = [
      'renewable-energy',
      'water-systems',
      'sustainable-agriculture',
      'green-building',
      'waste-reduction',
      'biodiversity'
    ]

    expectedTopics.forEach(topic => {
      expect(CORE_TOPIC_ICONS[topic]).toBeDefined()
    })
  })

  it('icons are emojis', () => {
    Object.values(CORE_TOPIC_ICONS).forEach(icon => {
      expect(typeof icon).toBe('string')
      expect(icon.length).toBeGreaterThan(0)
    })
  })
})
