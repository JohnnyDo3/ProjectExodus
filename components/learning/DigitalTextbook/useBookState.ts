// ============================================
// BOOK STATE MANAGEMENT HOOK
// Tracks reading position, progress, and unlock state
// ============================================

import { useState, useEffect, useCallback } from 'react'
import { STORAGE_KEYS } from './bookConstants'

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

export interface BookUnlockState {
  isUnlocked: boolean
  unlockedAt: string | null
  unlockedFromTopic: string | null
}

export interface BookPreferences {
  soundEnabled: boolean
  reducedMotion: boolean
  autoAdvance: boolean
}

export interface BookState {
  // Unlock state (permanent once unlocked)
  unlockState: BookUnlockState

  // Reading positions (per topic)
  readingPositions: Record<string, ReadingPosition>

  // Progress tracking (per topic)
  topicProgress: Record<string, TopicProgress>

  // User preferences
  preferences: BookPreferences

  // Current session state
  currentTopic: string | null
  currentPosition: ReadingPosition | null
  isBookOpen: boolean
  isAnimating: boolean
}

// ============================================
// INITIAL STATE
// ============================================

const DEFAULT_POSITION: ReadingPosition = {
  chapter: 0,
  verse: 0,
  page: 0,
  lastRead: new Date().toISOString(),
}

const DEFAULT_PREFERENCES: BookPreferences = {
  soundEnabled: false,
  reducedMotion: false,
  autoAdvance: false,
}

const INITIAL_STATE: BookState = {
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
  isBookOpen: false,
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

export function useBookState() {
  const [state, setState] = useState<BookState>(INITIAL_STATE)
  const [isHydrated, setIsHydrated] = useState(false)

  // ============================================
  // HYDRATION - Load from storage on mount
  // ============================================

  useEffect(() => {
    const unlockState: BookUnlockState = {
      isUnlocked: getFromStorage(STORAGE_KEYS.bookUnlocked, false),
      unlockedAt: getFromStorage(STORAGE_KEYS.unlockedAt, null),
      unlockedFromTopic: getFromStorage(STORAGE_KEYS.unlockedFromTopic, null),
    }

    const readingPositions = getFromStorage<Record<string, ReadingPosition>>(
      STORAGE_KEYS.readingPositions,
      {}
    )

    const preferences = getFromStorage<BookPreferences>(
      STORAGE_KEYS.preferences,
      DEFAULT_PREFERENCES
    )

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    setState(prev => ({
      ...prev,
      unlockState,
      readingPositions,
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

  const unlockBook = useCallback((fromTopic: string) => {
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

  const openBook = useCallback((topic: string) => {
    const position = state.readingPositions[topic] || { ...DEFAULT_POSITION }

    setState(prev => ({
      ...prev,
      currentTopic: topic,
      currentPosition: position,
      isBookOpen: true,
      isAnimating: true,
    }))
  }, [state.readingPositions])

  // ============================================
  // CLOSE THE BOOK
  // ============================================

  const closeBook = useCallback(() => {
    // Save current position before closing
    if (state.currentTopic && state.currentPosition) {
      const updatedPositions = {
        ...state.readingPositions,
        [state.currentTopic]: {
          ...state.currentPosition,
          lastRead: new Date().toISOString(),
        },
      }
      setToStorage(STORAGE_KEYS.readingPositions, updatedPositions)
    }

    setState(prev => ({
      ...prev,
      isBookOpen: false,
      isAnimating: true,
    }))
  }, [state.currentTopic, state.currentPosition, state.readingPositions])

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
    goToPosition({
      page: (state.currentPosition?.page ?? 0) + 1,
    })
  }, [state.currentPosition, goToPosition])

  const prevPage = useCallback(() => {
    goToPosition({
      page: Math.max(0, (state.currentPosition?.page ?? 0) - 1),
    })
  }, [state.currentPosition, goToPosition])

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
    return state.readingPositions[topic] || { ...DEFAULT_POSITION }
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

      return {
        ...prev,
        topicProgress: {
          ...prev.topicProgress,
          [prev.currentTopic]: {
            ...currentProgress,
            completedVerses: updatedVerses,
          },
        },
      }
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

      return {
        ...prev,
        topicProgress: {
          ...prev.topicProgress,
          [prev.currentTopic]: {
            ...currentProgress,
            completedChapters: updatedChapters,
          },
        },
      }
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

  const updatePreferences = useCallback((updates: Partial<BookPreferences>) => {
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
    unlockBook,

    // Book open/close
    openBook,
    closeBook,

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

export type UseBookStateReturn = ReturnType<typeof useBookState>
