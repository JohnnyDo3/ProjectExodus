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
const GAME_COUNT_KEY = 'exodus_game_count'
const SYNC_DEBOUNCE_MS = 5000

interface LearningProgressState {
  cards: Record<string, CardProgress>
  gameCount: number
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
  gameCount: number

  // Actions
  resetProgress: (cardIds?: string[]) => void
  syncToServer: () => Promise<void>
}

/**
 * useLearningProgress - Manages spaced repetition progress with localStorage + server sync
 * Uses game-based intervals (cards become due after X games, not X days)
 */
export function useLearningProgress(moduleId: string): UseLearningProgressReturn {
  const { data: session } = useSession()
  const [state, setState] = useState<LearningProgressState>({
    cards: {},
    gameCount: 0,
    lastSynced: 0,
    version: 1,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [pendingSync, setPendingSync] = useState(false)

  const storageKey = `${STORAGE_KEY}_${moduleId}`
  const gameCountKey = `${GAME_COUNT_KEY}_${moduleId}`

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed = JSON.parse(stored) as LearningProgressState

        // Migrate old format cards if needed
        const migratedCards: Record<string, CardProgress> = {}
        Object.entries(parsed.cards).forEach(([id, card]: [string, any]) => {
          if ('nextReview' in card && !('nextReviewAfterGame' in card)) {
            // Legacy format - migrate
            migratedCards[id] = {
              cardId: card.cardId,
              easeFactor: card.easeFactor,
              interval: card.interval,
              repetitions: card.repetitions,
              nextReviewAfterGame: 0,
              lastReviewedAtGame: 0,
              totalReviews: card.totalReviews,
              correctCount: card.correctCount,
            }
          } else {
            migratedCards[id] = card as CardProgress
          }
        })

        setState({
          ...parsed,
          cards: migratedCards,
        })
      }

      // Load game count
      const storedGameCount = localStorage.getItem(gameCountKey)
      if (storedGameCount) {
        setState(prev => ({
          ...prev,
          gameCount: parseInt(storedGameCount, 10),
        }))
      }
    } catch (error) {
      console.error('[LearningProgress] Failed to load from localStorage:', error)
    }
    setIsLoading(false)
  }, [storageKey, gameCountKey])

  // Save to localStorage when state changes
  useEffect(() => {
    if (isLoading) return

    try {
      localStorage.setItem(storageKey, JSON.stringify(state))
      localStorage.setItem(gameCountKey, state.gameCount.toString())
    } catch (error) {
      console.error('[LearningProgress] Failed to save to localStorage:', error)
    }
  }, [state, storageKey, gameCountKey, isLoading])

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
      const updatedCard = processReview(currentCard, result, prev.gameCount)

      return {
        ...prev,
        cards: {
          ...prev.cards,
          [cardId]: updatedCard,
        },
        gameCount: prev.gameCount + 1, // Increment game count for each review
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
    return getDueCards(Object.values(state.cards), state.gameCount)
  }, [state.cards, state.gameCount])

  const getStatsForModule = useCallback(() => {
    return getStudyStats(Object.values(state.cards), state.gameCount)
  }, [state.cards, state.gameCount])

  const getAllProgress = useCallback((): CardProgress[] => {
    return Object.values(state.cards)
  }, [state.cards])

  const resetProgress = useCallback((cardIds?: string[]) => {
    setState(prev => {
      if (!cardIds) {
        return { cards: {}, gameCount: 0, lastSynced: 0, version: prev.version + 1 }
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
          gameCount: state.gameCount,
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
  }, [session, moduleId, state.cards, state.gameCount, state.version])

  return {
    getCardProgress,
    recordReview,
    recordGameResult,
    getDueCards: getDueCardsForModule,
    getStats: getStatsForModule,
    getAllProgress,
    isLoading,
    isSyncing,
    gameCount: state.gameCount,
    resetProgress,
    syncToServer,
  }
}
