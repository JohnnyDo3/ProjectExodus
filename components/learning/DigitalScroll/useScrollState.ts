// ============================================
// BOOK STATE MANAGEMENT HOOK
// Tracks reading position, progress, and unlock state
// ============================================

import { useState, useEffect, useCallback } from 'react'
import { STORAGE_KEYS } from './scrollConstants'

// ============================================
// TYPES
// ============================================

export interface ReadingPosition {
  chapter: number      // Learning Module index (0-6)
  verse: number        // Lesson index within chapter
  page: number         // Page index within lesson
  lastRead: string     // ISO timestamp
}

export interface TopicProgress {
  completedVerses: string[]     // e.g., ["1.1", "1.2", "2.1"]
  completedChapters: number[]   // e.g., [0, 1]
  overallProgress: number       // Percentage 0-100
}

export interface ScrollUnlockState {
  isUnlocked: boolean
  unlockedAt: string | null
  unlockedFromTopic: string | null
}

export interface ScrollPreferences {
  soundEnabled: boolean
  reducedMotion: boolean
  autoAdvance: boolean
}

export interface ScrollState {
  // Unlock state (permanent once unlocked)
  unlockState: ScrollUnlockState

  // Reading positions (per topic)
  readingPositions: Record<string, ReadingPosition>

  // Progress tracking (per topic)
  topicProgress: Record<string, TopicProgress>

  // User preferences
  preferences: ScrollPreferences

  // Current session state
  currentTopic: string | null
  currentPosition: ReadingPosition | null
  isScrollOpen: boolean
  isAnimating: boolean
}

// ============================================
// INITIAL STATE
// ============================================

function createDefaultPosition(): ReadingPosition {
  return {
    chapter: 0,
    verse: 0,
    page: 0,
    lastRead: new Date().toISOString(),
  }
}

const DEFAULT_PREFERENCES: ScrollPreferences = {
  soundEnabled: false,
  reducedMotion: false,
  autoAdvance: false,
}

const INITIAL_STATE: ScrollState = {
  unlockState: {
    isUnlocked: false,
    unlockedAt: null,
    unlockedFromTopic: null,
  },
  readingPositions: {},
  topicProgress: {},
  preferences: DEFAULT_PREFERENCES,
  currentTopic: null,
  currentPosition: null,
  isScrollOpen: false,
  isAnimating: false,
}

// ============================================
// STORAGE HELPERS
// ============================================

function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch {
    return defaultValue
  }
}

function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('Failed to save to storage:', e)
  }
}

// ============================================
// THE HOOK
// ============================================

export function useScrollState() {
  const [state, setState] = useState<ScrollState>(INITIAL_STATE)
  const [isHydrated, setIsHydrated] = useState(false)

  // ============================================
  // HYDRATION - Load from storage on mount
  // ============================================

  useEffect(() => {
    const unlockState: ScrollUnlockState = {
      isUnlocked: getFromStorage(STORAGE_KEYS.bookUnlocked, false),
      unlockedAt: getFromStorage(STORAGE_KEYS.unlockedAt, null),
      unlockedFromTopic: getFromStorage(STORAGE_KEYS.unlockedFromTopic, null),
    }

    const readingPositions = getFromStorage<Record<string, ReadingPosition>>(
      STORAGE_KEYS.readingPositions,
      {}
    )

    const topicProgress = getFromStorage<Record<string, TopicProgress>>(
      'exodus_book_topic_progress',
      {}
    )

    const preferences = getFromStorage<ScrollPreferences>(
      STORAGE_KEYS.preferences,
      DEFAULT_PREFERENCES
    )

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    setState(prev => ({
      ...prev,
      unlockState,
      readingPositions,
      topicProgress,
      preferences: {
        ...preferences,
        reducedMotion: prefersReducedMotion || preferences.reducedMotion,
      },
    }))

    setIsHydrated(true)
  }, [])

  // ============================================
  // UNLOCK THE BOOK EXPERIENCE
  // Once unlocked, stays unlocked forever
  // ============================================

  const unlockScroll = useCallback((fromTopic: string) => {
    const now = new Date().toISOString()

    setToStorage(STORAGE_KEYS.bookUnlocked, true)
    setToStorage(STORAGE_KEYS.unlockedAt, now)
    setToStorage(STORAGE_KEYS.unlockedFromTopic, fromTopic)

    setState(prev => ({
      ...prev,
      unlockState: {
        isUnlocked: true,
        unlockedAt: now,
        unlockedFromTopic: fromTopic,
      },
    }))

    return true
  }, [])

  // ============================================
  // OPEN THE BOOK
  // ============================================

  const openScroll = useCallback((topic: string) => {
    setState(prev => {
      const position = prev.readingPositions[topic] || createDefaultPosition()
      return {
        ...prev,
        currentTopic: topic,
        currentPosition: position,
        isScrollOpen: true,
        isAnimating: true,
      }
    })
  }, [])

  // ============================================
  // CLOSE THE BOOK
  // ============================================

  const closeScroll = useCallback(() => {
    setState(prev => {
      // Save current position before closing — use prev to avoid stale closures
      if (prev.currentTopic && prev.currentPosition) {
        const updatedPositions = {
          ...prev.readingPositions,
          [prev.currentTopic]: {
            ...prev.currentPosition,
            lastRead: new Date().toISOString(),
          },
        }
        setToStorage(STORAGE_KEYS.readingPositions, updatedPositions)
      }

      return {
        ...prev,
        isScrollOpen: false,
        isAnimating: true,
      }
    })
  }, [])

  // ============================================
  // NAVIGATION
  // ============================================

  const goToPosition = useCallback((position: Partial<ReadingPosition>) => {
    setState(prev => {
      if (!prev.currentTopic) return prev

      const newPosition: ReadingPosition = {
        chapter: position.chapter ?? prev.currentPosition?.chapter ?? 0,
        verse: position.verse ?? prev.currentPosition?.verse ?? 0,
        page: position.page ?? prev.currentPosition?.page ?? 0,
        lastRead: new Date().toISOString(),
      }

      // Persist to storage
      const updatedPositions = {
        ...prev.readingPositions,
        [prev.currentTopic]: newPosition,
      }
      setToStorage(STORAGE_KEYS.readingPositions, updatedPositions)

      return {
        ...prev,
        currentPosition: newPosition,
        readingPositions: updatedPositions,
      }
    })
  }, [])

  const nextPage = useCallback(() => {
    setState(prev => {
      if (!prev.currentTopic) return prev
      const currentPage = prev.currentPosition?.page ?? 0
      const newPosition: ReadingPosition = {
        chapter: prev.currentPosition?.chapter ?? 0,
        verse: prev.currentPosition?.verse ?? 0,
        page: currentPage + 1,
        lastRead: new Date().toISOString(),
      }
      const updatedPositions = { ...prev.readingPositions, [prev.currentTopic]: newPosition }
      setToStorage(STORAGE_KEYS.readingPositions, updatedPositions)
      return { ...prev, currentPosition: newPosition, readingPositions: updatedPositions }
    })
  }, [])

  const prevPage = useCallback(() => {
    setState(prev => {
      if (!prev.currentTopic) return prev
      const currentPage = prev.currentPosition?.page ?? 0
      if (currentPage <= 0) return prev
      const newPosition: ReadingPosition = {
        chapter: prev.currentPosition?.chapter ?? 0,
        verse: prev.currentPosition?.verse ?? 0,
        page: currentPage - 1,
        lastRead: new Date().toISOString(),
      }
      const updatedPositions = { ...prev.readingPositions, [prev.currentTopic]: newPosition }
      setToStorage(STORAGE_KEYS.readingPositions, updatedPositions)
      return { ...prev, currentPosition: newPosition, readingPositions: updatedPositions }
    })
  }, [])

  const goToChapter = useCallback((chapterIndex: number) => {
    goToPosition({
      chapter: chapterIndex,
      verse: 0,
      page: 0,
    })
  }, [goToPosition])

  const goToVerse = useCallback((verseIndex: number) => {
    goToPosition({
      verse: verseIndex,
      page: 0,
    })
  }, [goToPosition])

  // ============================================
  // CONTINUE READING (Yin-Yang Ribbon)
  // ============================================

  const getContinuePosition = useCallback((topic: string): ReadingPosition => {
    return state.readingPositions[topic] || createDefaultPosition()
  }, [state.readingPositions])

  const continueReading = useCallback(() => {
    if (!state.currentTopic) return
    const position = getContinuePosition(state.currentTopic)
    goToPosition(position)
  }, [state.currentTopic, getContinuePosition, goToPosition])

  // ============================================
  // PROGRESS TRACKING
  // ============================================

  const markVerseComplete = useCallback((verse: string) => {
    setState(prev => {
      if (!prev.currentTopic) return prev

      const currentProgress = prev.topicProgress[prev.currentTopic] || {
        completedVerses: [],
        completedChapters: [],
        overallProgress: 0,
      }

      if (currentProgress.completedVerses.includes(verse)) {
        return prev // Already completed
      }

      const updatedVerses = [...currentProgress.completedVerses, verse]
      const newTopicProgress = {
        ...prev.topicProgress,
        [prev.currentTopic]: {
          ...currentProgress,
          completedVerses: updatedVerses,
        },
      }

      // Persist to localStorage
      setToStorage('exodus_book_topic_progress', newTopicProgress)

      return { ...prev, topicProgress: newTopicProgress }
    })
  }, [])

  const markChapterComplete = useCallback((chapterIndex: number) => {
    setState(prev => {
      if (!prev.currentTopic) return prev

      const currentProgress = prev.topicProgress[prev.currentTopic] || {
        completedVerses: [],
        completedChapters: [],
        overallProgress: 0,
      }

      if (currentProgress.completedChapters.includes(chapterIndex)) {
        return prev // Already completed
      }

      const updatedChapters = [...currentProgress.completedChapters, chapterIndex]
      const newTopicProgress = {
        ...prev.topicProgress,
        [prev.currentTopic]: {
          ...currentProgress,
          completedChapters: updatedChapters,
        },
      }

      // Persist to localStorage
      setToStorage('exodus_book_topic_progress', newTopicProgress)

      return { ...prev, topicProgress: newTopicProgress }
    })
  }, [])

  // ============================================
  // ANIMATION STATE
  // ============================================

  const setAnimating = useCallback((isAnimating: boolean) => {
    setState(prev => ({ ...prev, isAnimating }))
  }, [])

  // ============================================
  // PREFERENCES
  // ============================================

  const updatePreferences = useCallback((updates: Partial<ScrollPreferences>) => {
    setState(prev => {
      const newPreferences = { ...prev.preferences, ...updates }
      setToStorage(STORAGE_KEYS.preferences, newPreferences)
      return { ...prev, preferences: newPreferences }
    })
  }, [])

  // ============================================
  // RETURN
  // ============================================

  return {
    // State
    ...state,
    isHydrated,

    // Unlock
    unlockScroll,

    // Book open/close
    openScroll,
    closeScroll,

    // Navigation
    goToPosition,
    nextPage,
    prevPage,
    goToChapter,
    goToVerse,

    // Continue reading
    getContinuePosition,
    continueReading,

    // Progress
    markVerseComplete,
    markChapterComplete,

    // Animation
    setAnimating,

    // Preferences
    updatePreferences,
  }
}

export type UseScrollStateReturn = ReturnType<typeof useScrollState>
