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

describe('Spaced Repetition System (Game-Based)', () => {
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

    it('sets nextReviewAfterGame to 0 (due immediately)', () => {
      const card = createCardProgress('test-card')

      expect(card.nextReviewAfterGame).toBe(0)
      expect(card.lastReviewedAtGame).toBe(0)
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

      const result = processReview(card, { quality: 2 }, 5)

      expect(result.repetitions).toBe(0)
      expect(result.interval).toBe(1)
      expect(result.nextReviewAfterGame).toBe(6) // current game (5) + 1
    })

    it('increments repetitions on successful recall (quality >= 3)', () => {
      const result = processReview(card, { quality: 4 }, 0)

      expect(result.repetitions).toBe(1)
      expect(result.correctCount).toBe(1)
    })

    it('sets interval to 1 game on first successful review', () => {
      const result = processReview(card, { quality: 4 }, 10)

      expect(result.interval).toBe(1)
      expect(result.nextReviewAfterGame).toBe(11) // game 10 + 1
    })

    it('sets interval to 3 games on second successful review', () => {
      card.repetitions = 1
      card.interval = 1

      const result = processReview(card, { quality: 4 }, 15)

      expect(result.interval).toBe(3)
      expect(result.nextReviewAfterGame).toBe(18) // game 15 + 3
    })

    it('sets interval to 6 games on third successful review', () => {
      card.repetitions = 2
      card.interval = 3

      const result = processReview(card, { quality: 4 }, 20)

      expect(result.interval).toBe(6)
      expect(result.nextReviewAfterGame).toBe(26) // game 20 + 6
    })

    it('multiplies interval by ease factor on subsequent reviews', () => {
      card.repetitions = 3
      card.interval = 6
      card.easeFactor = 2.5

      const result = processReview(card, { quality: 4 }, 30)

      expect(result.interval).toBe(15) // 6 * 2.5 = 15
      expect(result.nextReviewAfterGame).toBe(45) // game 30 + 15
    })

    it('caps interval at 50 games', () => {
      card.repetitions = 5
      card.interval = 40
      card.easeFactor = 2.5

      const result = processReview(card, { quality: 5 }, 100)

      expect(result.interval).toBe(50) // Capped
      expect(result.nextReviewAfterGame).toBe(150) // game 100 + 50
    })

    it('decreases ease factor on difficult answers', () => {
      const result = processReview(card, { quality: 3 }, 0)

      expect(result.easeFactor).toBeLessThan(2.5)
    })

    it('increases ease factor on easy answers', () => {
      const result = processReview(card, { quality: 5 }, 0)

      expect(result.easeFactor).toBeGreaterThan(2.5)
    })

    it('never decreases ease factor below 1.3', () => {
      card.easeFactor = 1.3

      const result = processReview(card, { quality: 0 }, 0)

      expect(result.easeFactor).toBeGreaterThanOrEqual(1.3)
    })

    it('updates lastReviewedAtGame', () => {
      const result = processReview(card, { quality: 4 }, 42)

      expect(result.lastReviewedAtGame).toBe(42)
    })

    it('increments totalReviews', () => {
      const result = processReview(card, { quality: 4 }, 0)

      expect(result.totalReviews).toBe(1)
    })
  })

  describe('isDue', () => {
    it('returns true when current game >= nextReviewAfterGame', () => {
      const card = createCardProgress('test')
      card.nextReviewAfterGame = 10

      expect(isDue(card, 10)).toBe(true)
      expect(isDue(card, 15)).toBe(true)
    })

    it('returns false when current game < nextReviewAfterGame', () => {
      const card = createCardProgress('test')
      card.nextReviewAfterGame = 10

      expect(isDue(card, 5)).toBe(false)
      expect(isDue(card, 9)).toBe(false)
    })

    it('returns true for new cards (due immediately)', () => {
      const card = createCardProgress('test')

      expect(isDue(card, 0)).toBe(true)
    })
  })

  describe('getDueCards', () => {
    it('returns only cards that are due at current game count', () => {
      const cards: CardProgress[] = [
        { ...createCardProgress('due-1'), nextReviewAfterGame: 5 },
        { ...createCardProgress('not-due'), nextReviewAfterGame: 20 },
        { ...createCardProgress('due-2'), nextReviewAfterGame: 8 },
      ]

      const dueCards = getDueCards(cards, 10)

      expect(dueCards).toHaveLength(2)
      expect(dueCards.map(c => c.cardId)).toContain('due-1')
      expect(dueCards.map(c => c.cardId)).toContain('due-2')
    })

    it('sorts by most overdue first', () => {
      const cards: CardProgress[] = [
        { ...createCardProgress('less-overdue'), nextReviewAfterGame: 8 },
        { ...createCardProgress('more-overdue'), nextReviewAfterGame: 3 },
      ]

      const dueCards = getDueCards(cards, 10)

      expect(dueCards[0].cardId).toBe('more-overdue')
    })
  })

  describe('getUpcomingCards', () => {
    it('returns cards due within the lookAhead games', () => {
      const cards: CardProgress[] = [
        { ...createCardProgress('due-now'), nextReviewAfterGame: 5 }, // Due
        { ...createCardProgress('soon'), nextReviewAfterGame: 12 },
        { ...createCardProgress('later'), nextReviewAfterGame: 18 },
        { ...createCardProgress('far'), nextReviewAfterGame: 50 },
      ]

      const upcoming = getUpcomingCards(cards, 10, 10) // Look ahead 10 games

      expect(upcoming).toHaveLength(2) // soon (12) and later (18)
      expect(upcoming.map(c => c.cardId)).toContain('soon')
      expect(upcoming.map(c => c.cardId)).toContain('later')
    })

    it('excludes already due cards', () => {
      const cards: CardProgress[] = [
        { ...createCardProgress('due'), nextReviewAfterGame: 5 },
        { ...createCardProgress('upcoming'), nextReviewAfterGame: 15 },
      ]

      const upcoming = getUpcomingCards(cards, 10, 10)

      expect(upcoming).toHaveLength(1)
      expect(upcoming[0].cardId).toBe('upcoming')
    })

    it('sorts by soonest first', () => {
      const cards: CardProgress[] = [
        { ...createCardProgress('later'), nextReviewAfterGame: 18 },
        { ...createCardProgress('sooner'), nextReviewAfterGame: 12 },
      ]

      const upcoming = getUpcomingCards(cards, 10, 10)

      expect(upcoming[0].cardId).toBe('sooner')
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
      const cards: CardProgress[] = [
        { ...createCardProgress('new'), totalReviews: 0, repetitions: 0, nextReviewAfterGame: 0 },
        { ...createCardProgress('learning'), totalReviews: 2, repetitions: 1, correctCount: 1, nextReviewAfterGame: 5 },
        { ...createCardProgress('mastered'), totalReviews: 10, repetitions: 5, correctCount: 9, nextReviewAfterGame: 100 },
      ]

      const stats = getStudyStats(cards, 10) // Current game is 10

      expect(stats.total).toBe(3)
      expect(stats.new).toBe(1)
      expect(stats.learning).toBe(1)
      expect(stats.mastered).toBe(1)
      expect(stats.due).toBe(2) // new (0) and learning (5) are due at game 10
    })

    it('calculates accuracy correctly', () => {
      const cards: CardProgress[] = [
        { ...createCardProgress('card-1'), totalReviews: 10, correctCount: 8 },
        { ...createCardProgress('card-2'), totalReviews: 10, correctCount: 6 },
      ]

      const stats = getStudyStats(cards, 0)

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
