import { describe, it, expect, beforeEach } from 'vitest'
import {
  processReview,
  createCardProgress,
  isDue,
  getDueCards,
  getUpcomingCards,
  calculateMastery,
  getStudyStats,
  gameResultToQuality,
  type CardProgress,
} from '@/lib/spacedRepetition'

describe('Spaced Repetition System', () => {
  describe('createCardProgress', () => {
    it('creates a new card with default values', () => {
      const card = createCardProgress('test-card')

      expect(card.cardId).toBe('test-card')
      expect(card.easeFactor).toBe(2.5)
      expect(card.interval).toBe(0)
      expect(card.repetitions).toBe(0)
      expect(card.totalReviews).toBe(0)
      expect(card.correctCount).toBe(0)
    })

    it('sets nextReview to current time', () => {
      const before = Date.now()
      const card = createCardProgress('test-card')
      const after = Date.now()

      expect(card.nextReview).toBeGreaterThanOrEqual(before)
      expect(card.nextReview).toBeLessThanOrEqual(after)
    })
  })

  describe('processReview', () => {
    let card: CardProgress

    beforeEach(() => {
      card = createCardProgress('test-card')
    })

    it('resets repetitions on quality < 3 (failed recall)', () => {
      card.repetitions = 3
      card.interval = 10

      const result = processReview(card, { quality: 2 })

      expect(result.repetitions).toBe(0)
      expect(result.interval).toBe(1)
    })

    it('increments repetitions on successful recall (quality >= 3)', () => {
      const result = processReview(card, { quality: 4 })

      expect(result.repetitions).toBe(1)
      expect(result.correctCount).toBe(1)
    })

    it('sets interval to 1 on first successful review', () => {
      const result = processReview(card, { quality: 4 })

      expect(result.interval).toBe(1)
    })

    it('sets interval to 6 on second successful review', () => {
      card.repetitions = 1
      card.interval = 1

      const result = processReview(card, { quality: 4 })

      expect(result.interval).toBe(6)
    })

    it('multiplies interval by ease factor on subsequent reviews', () => {
      card.repetitions = 2
      card.interval = 6
      card.easeFactor = 2.5

      const result = processReview(card, { quality: 4 })

      expect(result.interval).toBe(15) // 6 * 2.5 = 15
    })

    it('decreases ease factor on difficult answers', () => {
      const result = processReview(card, { quality: 3 })

      expect(result.easeFactor).toBeLessThan(2.5)
    })

    it('increases ease factor on easy answers', () => {
      const result = processReview(card, { quality: 5 })

      expect(result.easeFactor).toBeGreaterThan(2.5)
    })

    it('never decreases ease factor below 1.3', () => {
      card.easeFactor = 1.3

      const result = processReview(card, { quality: 0 })

      expect(result.easeFactor).toBeGreaterThanOrEqual(1.3)
    })

    it('updates nextReview timestamp', () => {
      const before = Date.now()
      const result = processReview(card, { quality: 4 })

      expect(result.nextReview).toBeGreaterThan(before)
      expect(result.lastReview).toBeGreaterThanOrEqual(before)
    })

    it('increments totalReviews', () => {
      const result = processReview(card, { quality: 4 })

      expect(result.totalReviews).toBe(1)
    })
  })

  describe('isDue', () => {
    it('returns true for cards due now', () => {
      const card = createCardProgress('test')
      card.nextReview = Date.now() - 1000

      expect(isDue(card)).toBe(true)
    })

    it('returns false for cards due in the future', () => {
      const card = createCardProgress('test')
      card.nextReview = Date.now() + 86400000 // Tomorrow

      expect(isDue(card)).toBe(false)
    })
  })

  describe('getDueCards', () => {
    it('returns only cards that are due', () => {
      const now = Date.now()
      const cards: CardProgress[] = [
        { ...createCardProgress('due-1'), nextReview: now - 1000 },
        { ...createCardProgress('not-due'), nextReview: now + 86400000 },
        { ...createCardProgress('due-2'), nextReview: now - 2000 },
      ]

      const dueCards = getDueCards(cards)

      expect(dueCards).toHaveLength(2)
      expect(dueCards.map(c => c.cardId)).toContain('due-1')
      expect(dueCards.map(c => c.cardId)).toContain('due-2')
    })

    it('sorts by overdue time (most overdue first)', () => {
      const now = Date.now()
      const cards: CardProgress[] = [
        { ...createCardProgress('less-overdue'), nextReview: now - 1000 },
        { ...createCardProgress('more-overdue'), nextReview: now - 10000 },
      ]

      const dueCards = getDueCards(cards)

      expect(dueCards[0].cardId).toBe('more-overdue')
    })
  })

  describe('getUpcomingCards', () => {
    it('returns cards due within the specified days', () => {
      const now = Date.now()
      const dayMs = 24 * 60 * 60 * 1000
      const cards: CardProgress[] = [
        { ...createCardProgress('today'), nextReview: now - 1000 }, // Due
        { ...createCardProgress('tomorrow'), nextReview: now + dayMs },
        { ...createCardProgress('next-week'), nextReview: now + 7 * dayMs },
        { ...createCardProgress('far-future'), nextReview: now + 30 * dayMs },
      ]

      const upcoming = getUpcomingCards(cards, 7)

      expect(upcoming).toHaveLength(2) // tomorrow and next-week
      expect(upcoming.map(c => c.cardId)).toContain('tomorrow')
      expect(upcoming.map(c => c.cardId)).toContain('next-week')
    })
  })

  describe('calculateMastery', () => {
    it('returns 0 for empty array', () => {
      expect(calculateMastery([])).toBe(0)
    })

    it('calculates percentage of mastered cards', () => {
      const cards: CardProgress[] = [
        { ...createCardProgress('mastered'), repetitions: 3, easeFactor: 2.5 },
        { ...createCardProgress('learning'), repetitions: 1, easeFactor: 2.5 },
        { ...createCardProgress('mastered-2'), repetitions: 5, easeFactor: 2.0 },
        { ...createCardProgress('struggling'), repetitions: 3, easeFactor: 1.5 },
      ]

      const mastery = calculateMastery(cards)

      expect(mastery).toBe(50) // 2 out of 4 cards are mastered
    })
  })

  describe('getStudyStats', () => {
    it('returns correct stats for card set', () => {
      const now = Date.now()
      const cards: CardProgress[] = [
        { ...createCardProgress('new'), totalReviews: 0, repetitions: 0, nextReview: now },
        { ...createCardProgress('learning'), totalReviews: 2, repetitions: 1, correctCount: 1, nextReview: now - 1000 },
        { ...createCardProgress('mastered'), totalReviews: 10, repetitions: 5, correctCount: 9, nextReview: now + 86400000 },
      ]

      const stats = getStudyStats(cards)

      expect(stats.total).toBe(3)
      expect(stats.new).toBe(1)
      expect(stats.learning).toBe(1)
      expect(stats.mastered).toBe(1)
      expect(stats.due).toBe(2) // new and learning are due
    })

    it('calculates accuracy correctly', () => {
      const cards: CardProgress[] = [
        { ...createCardProgress('card-1'), totalReviews: 10, correctCount: 8 },
        { ...createCardProgress('card-2'), totalReviews: 10, correctCount: 6 },
      ]

      const stats = getStudyStats(cards)

      expect(stats.accuracy).toBe(70) // 14/20 = 70%
    })
  })

  describe('gameResultToQuality', () => {
    it('returns 1-2 for incorrect answers', () => {
      expect(gameResultToQuality(false, 2000, 0)).toBe(1) // Quick wrong
      expect(gameResultToQuality(false, 4000, 0)).toBe(2) // Slow wrong
    })

    it('returns 5 for fast correct with streak', () => {
      expect(gameResultToQuality(true, 1500, 3)).toBe(5)
    })

    it('returns 4 for reasonably fast correct', () => {
      expect(gameResultToQuality(true, 2500, 0)).toBe(4)
    })

    it('returns 3 for slow but correct', () => {
      expect(gameResultToQuality(true, 4000, 0)).toBe(3)
    })
  })
})
