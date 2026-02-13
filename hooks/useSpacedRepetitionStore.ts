'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  type CardProgress,
  createCardProgress,
  processReview,
  type ReviewResult,
} from '@/lib/spacedRepetition'

const STORAGE_KEY = 'srs-card-progress'
const GAME_COUNT_KEY = 'srs-game-count'
const HISTORY_KEY = 'srs-study-history'

interface StudySession {
  date: string
  cardsReviewed: number
  correctCount: number
}

interface UseSpacedRepetitionStoreReturn {
  cards: CardProgress[]
  gameCount: number
  getCardProgress: (cardId: string) => CardProgress
  recordReview: (cardId: string, result: ReviewResult) => void
  incrementGameCount: () => void
  studyHistory: StudySession[]
  isLoaded: boolean
}

export function useSpacedRepetitionStore(): UseSpacedRepetitionStoreReturn {
  const [cards, setCards] = useState<CardProgress[]>([])
  const [gameCount, setGameCount] = useState(0)
  const [studyHistory, setStudyHistory] = useState<StudySession[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const storedCards = localStorage.getItem(STORAGE_KEY)
      if (storedCards) {
        const parsed = JSON.parse(storedCards)
        // Handle migration from old format
        const migratedCards = parsed.map((card: any) => {
          if ('nextReview' in card && !('nextReviewAfterGame' in card)) {
            // Legacy format - migrate
            return {
              cardId: card.cardId,
              easeFactor: card.easeFactor,
              interval: card.interval,
              repetitions: card.repetitions,
              nextReviewAfterGame: 0, // Due immediately
              lastReviewedAtGame: 0,
              totalReviews: card.totalReviews,
              correctCount: card.correctCount,
            }
          }
          return card
        })
        setCards(migratedCards)
      }

      const storedGameCount = localStorage.getItem(GAME_COUNT_KEY)
      if (storedGameCount) {
        setGameCount(parseInt(storedGameCount, 10))
      }

      const storedHistory = localStorage.getItem(HISTORY_KEY)
      if (storedHistory) {
        setStudyHistory(JSON.parse(storedHistory))
      }
    } catch (e) {
      console.error('Failed to load spaced repetition data:', e)
    }

    setIsLoaded(true)
  }, [])

  // Save cards to localStorage whenever they change
  useEffect(() => {
    if (!isLoaded) return
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
    } catch (e) {
      console.error('Failed to save card progress:', e)
    }
  }, [cards, isLoaded])

  // Save game count to localStorage
  useEffect(() => {
    if (!isLoaded) return
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(GAME_COUNT_KEY, gameCount.toString())
    } catch (e) {
      console.error('Failed to save game count:', e)
    }
  }, [gameCount, isLoaded])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (!isLoaded) return
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(studyHistory))
    } catch (e) {
      console.error('Failed to save study history:', e)
    }
  }, [studyHistory, isLoaded])

  // Get or create card progress
  const getCardProgress = useCallback((cardId: string): CardProgress => {
    const existing = cards.find(c => c.cardId === cardId)
    if (existing) return existing

    const newCard = createCardProgress(cardId)
    setCards(prev => [...prev, newCard])
    return newCard
  }, [cards])

  // Record a review (called for each answer)
  const recordReview = useCallback((cardId: string, result: ReviewResult) => {
    setCards(prev => {
      const cardIndex = prev.findIndex(c => c.cardId === cardId)
      const card = cardIndex >= 0 ? prev[cardIndex] : createCardProgress(cardId)
      const updatedCard = processReview(card, result, gameCount)

      if (cardIndex >= 0) {
        const newCards = [...prev]
        newCards[cardIndex] = updatedCard
        return newCards
      } else {
        return [...prev, updatedCard]
      }
    })

    // Update study history
    const today = new Date().toISOString().split('T')[0]
    const isCorrect = result.quality >= 3

    setStudyHistory(prev => {
      const todayIndex = prev.findIndex(s => s.date === today)

      if (todayIndex >= 0) {
        const updated = [...prev]
        updated[todayIndex] = {
          ...updated[todayIndex],
          cardsReviewed: updated[todayIndex].cardsReviewed + 1,
          correctCount: updated[todayIndex].correctCount + (isCorrect ? 1 : 0),
        }
        return updated
      } else {
        return [...prev, {
          date: today,
          cardsReviewed: 1,
          correctCount: isCorrect ? 1 : 0,
        }]
      }
    })

    // Increment game count for each answer (so reviews space out during a session)
    setGameCount(prev => prev + 1)
  }, [gameCount])

  // Increment game count manually (e.g., at end of a game round)
  const incrementGameCount = useCallback(() => {
    setGameCount(prev => prev + 1)
  }, [])

  return {
    cards,
    gameCount,
    getCardProgress,
    recordReview,
    incrementGameCount,
    studyHistory,
    isLoaded,
  }
}
