'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import {
  CardProgress,
  ReviewResult,
  processReview,
  createCardProgress,
  getDueCards,
  getStudyStats,
  gameResultToQuality,
} from '@/lib/spacedRepetition'

const STORAGE_KEY = 'exodus_learning_progress'
const SYNC_DEBOUNCE_MS = 5000

interface LearningProgressState {
  cards: Record<string, CardProgress>
  lastSynced: number
  version: number
}

interface UseLearningProgressReturn {
  // Card operations
  getCardProgress: (cardId: string) => CardProgress
  recordReview: (cardId: string, result: ReviewResult) => void
  recordGameResult: (cardId: string, correct: boolean, timeMs: number, streak: number) => void

  // Queries
  getDueCards: () => CardProgress[]
  getStats: () => ReturnType<typeof getStudyStats>
  getAllProgress: () => CardProgress[]

  // State
  isLoading: boolean
  isSyncing: boolean

  // Actions
  resetProgress: (cardIds?: string[]) => void
  syncToServer: () => Promise<void>
}

/**
 * useLearningProgress - Manages spaced repetition progress with localStorage + server sync
 */
export function useLearningProgress(moduleId: string): UseLearningProgressReturn {
  const { data: session } = useSession()
  const [state, setState] = useState<LearningProgressState>({
    cards: {},
    lastSynced: 0,
    version: 1,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [pendingSync, setPendingSync] = useState(false)

  const storageKey = `${STORAGE_KEY}_${moduleId}`

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed = JSON.parse(stored) as LearningProgressState
        setState(parsed)
      }
    } catch (error) {
      console.error('[LearningProgress] Failed to load from localStorage:', error)
    }
    setIsLoading(false)
  }, [storageKey])

  // Save to localStorage when state changes
  useEffect(() => {
    if (isLoading) return

    try {
      localStorage.setItem(storageKey, JSON.stringify(state))
    } catch (error) {
      console.error('[LearningProgress] Failed to save to localStorage:', error)
    }
  }, [state, storageKey, isLoading])

  // Debounced sync to server when user is logged in
  useEffect(() => {
    if (!session?.user || !pendingSync) return

    const timeout = setTimeout(() => {
      syncToServer()
      setPendingSync(false)
    }, SYNC_DEBOUNCE_MS)

    return () => clearTimeout(timeout)
  }, [pendingSync, session])

  const getCardProgress = useCallback((cardId: string): CardProgress => {
    return state.cards[cardId] || createCardProgress(cardId)
  }, [state.cards])

  const recordReview = useCallback((cardId: string, result: ReviewResult) => {
    setState(prev => {
      const currentCard = prev.cards[cardId] || createCardProgress(cardId)
      const updatedCard = processReview(currentCard, result)

      return {
        ...prev,
        cards: {
          ...prev.cards,
          [cardId]: updatedCard,
        },
        version: prev.version + 1,
      }
    })
    setPendingSync(true)
  }, [])

  const recordGameResult = useCallback((
    cardId: string,
    correct: boolean,
    timeMs: number,
    streak: number
  ) => {
    const quality = gameResultToQuality(correct, timeMs, streak)
    recordReview(cardId, { quality })
  }, [recordReview])

  const getDueCardsForModule = useCallback((): CardProgress[] => {
    return getDueCards(Object.values(state.cards))
  }, [state.cards])

  const getStatsForModule = useCallback(() => {
    return getStudyStats(Object.values(state.cards))
  }, [state.cards])

  const getAllProgress = useCallback((): CardProgress[] => {
    return Object.values(state.cards)
  }, [state.cards])

  const resetProgress = useCallback((cardIds?: string[]) => {
    setState(prev => {
      if (!cardIds) {
        return { cards: {}, lastSynced: 0, version: prev.version + 1 }
      }

      const newCards = { ...prev.cards }
      cardIds.forEach(id => delete newCards[id])

      return {
        ...prev,
        cards: newCards,
        version: prev.version + 1,
      }
    })
    setPendingSync(true)
  }, [])

  const syncToServer = useCallback(async () => {
    if (!session?.user) return

    setIsSyncing(true)
    try {
      const response = await fetch('/api/learn/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId,
          cards: state.cards,
          version: state.version,
        }),
      })

      if (response.ok) {
        setState(prev => ({ ...prev, lastSynced: Date.now() }))
      }
    } catch (error) {
      console.error('[LearningProgress] Failed to sync to server:', error)
    } finally {
      setIsSyncing(false)
    }
  }, [session, moduleId, state.cards, state.version])

  return {
    getCardProgress,
    recordReview,
    recordGameResult,
    getDueCards: getDueCardsForModule,
    getStats: getStatsForModule,
    getAllProgress,
    isLoading,
    isSyncing,
    resetProgress,
    syncToServer,
  }
}
