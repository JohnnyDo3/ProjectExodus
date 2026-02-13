/**
 * Spaced Repetition System - Game-Based Intervals
 *
 * Modified SM-2 algorithm that uses game rounds instead of days.
 * Cards become due after a certain number of games, not after days pass.
 * This allows intensive learning sessions without waiting.
 */

export interface CardProgress {
  cardId: string
  easeFactor: number           // Difficulty multiplier (starts at 2.5)
  interval: number             // Games until next review
  repetitions: number          // Number of successful reviews in a row
  nextReviewAfterGame: number  // Card is due when totalGamesPlayed >= this
  lastReviewedAtGame: number   // Game count when last reviewed
  totalReviews: number         // Total number of reviews
  correctCount: number         // Number of correct answers
}

export interface ReviewResult {
  quality: 0 | 1 | 2 | 3 | 4 | 5
  // 0 - Complete blackout, no recall
  // 1 - Incorrect, but recognized answer
  // 2 - Incorrect, easy to recall after seeing answer
  // 3 - Correct with serious difficulty
  // 4 - Correct with hesitation
  // 5 - Perfect recall
}

const MIN_EASE_FACTOR = 1.3
const DEFAULT_EASE_FACTOR = 2.5

/**
 * Calculate the new card state after a review
 * @param card - Current card progress
 * @param result - Review quality result
 * @param currentGameCount - Current total games played (used for scheduling next review)
 */
export function processReview(
  card: CardProgress,
  result: ReviewResult,
  currentGameCount: number = 0
): CardProgress {
  const { quality } = result

  // If quality < 3, reset repetitions (failed recall)
  if (quality < 3) {
    return {
      ...card,
      repetitions: 0,
      interval: 1, // Review in 1 game
      nextReviewAfterGame: currentGameCount + 1,
      lastReviewedAtGame: currentGameCount,
      totalReviews: card.totalReviews + 1,
      // Decrease ease factor
      easeFactor: Math.max(
        MIN_EASE_FACTOR,
        card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
      ),
    }
  }

  // Successful recall - calculate new interval
  let newInterval: number
  const newRepetitions = card.repetitions + 1

  if (newRepetitions === 1) {
    newInterval = 1 // Review after 1 game
  } else if (newRepetitions === 2) {
    newInterval = 3 // Review after 3 games
  } else if (newRepetitions === 3) {
    newInterval = 6 // Review after 6 games
  } else {
    // After 3rd successful review, space out more
    newInterval = Math.round(card.interval * card.easeFactor)
  }

  // Cap interval at 50 games to keep cards cycling
  newInterval = Math.min(newInterval, 50)

  // Calculate new ease factor
  const newEaseFactor = Math.max(
    MIN_EASE_FACTOR,
    card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  )

  return {
    ...card,
    repetitions: newRepetitions,
    interval: newInterval,
    nextReviewAfterGame: currentGameCount + newInterval,
    lastReviewedAtGame: currentGameCount,
    totalReviews: card.totalReviews + 1,
    correctCount: card.correctCount + 1,
    easeFactor: newEaseFactor,
  }
}

/**
 * Create a new card progress entry
 */
export function createCardProgress(cardId: string): CardProgress {
  return {
    cardId,
    easeFactor: DEFAULT_EASE_FACTOR,
    interval: 0,
    repetitions: 0,
    nextReviewAfterGame: 0, // Due immediately
    lastReviewedAtGame: 0,
    totalReviews: 0,
    correctCount: 0,
  }
}

/**
 * Check if a card is due for review
 * @param card - Card to check
 * @param currentGameCount - Current total games played
 */
export function isDue(card: CardProgress, currentGameCount: number = 0): boolean {
  return currentGameCount >= card.nextReviewAfterGame
}

/**
 * Get cards that are due for review, sorted by priority
 * @param cards - All cards
 * @param currentGameCount - Current total games played
 */
export function getDueCards(cards: CardProgress[], currentGameCount: number = Infinity): CardProgress[] {
  return cards
    .filter(card => currentGameCount >= card.nextReviewAfterGame)
    .sort((a, b) => {
      // Priority: most overdue first, then by interval (shorter = newer = higher priority)
      const aOverdue = currentGameCount - a.nextReviewAfterGame
      const bOverdue = currentGameCount - b.nextReviewAfterGame
      if (aOverdue !== bOverdue) return bOverdue - aOverdue
      return a.interval - b.interval
    })
}

/**
 * Get upcoming cards (not yet due)
 * @param cards - All cards
 * @param currentGameCount - Current total games played
 * @param lookAhead - How many games ahead to look (default 10)
 */
export function getUpcomingCards(
  cards: CardProgress[],
  currentGameCount: number = 0,
  lookAhead: number = 10
): CardProgress[] {
  const futureLimit = currentGameCount + lookAhead
  return cards
    .filter(card => card.nextReviewAfterGame > currentGameCount && card.nextReviewAfterGame <= futureLimit)
    .sort((a, b) => a.nextReviewAfterGame - b.nextReviewAfterGame)
}

/**
 * Calculate mastery percentage for a set of cards
 */
export function calculateMastery(cards: CardProgress[]): number {
  if (cards.length === 0) return 0

  const masteredCards = cards.filter(card =>
    card.repetitions >= 3 && card.easeFactor >= 2.0
  )

  return Math.round((masteredCards.length / cards.length) * 100)
}

/**
 * Get study statistics
 * @param cards - All cards
 * @param currentGameCount - Current total games played (used to determine due cards)
 */
export function getStudyStats(cards: CardProgress[], currentGameCount: number = Infinity) {
  const dueCards = cards.filter(c => currentGameCount >= c.nextReviewAfterGame)
  const newCards = cards.filter(c => c.totalReviews === 0)
  const learningCards = cards.filter(c => c.totalReviews > 0 && c.repetitions < 3)
  const masteredCards = cards.filter(c => c.repetitions >= 3)

  const totalReviews = cards.reduce((sum, c) => sum + c.totalReviews, 0)
  const totalCorrect = cards.reduce((sum, c) => sum + c.correctCount, 0)
  const accuracy = totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0

  return {
    total: cards.length,
    due: dueCards.length,
    new: newCards.length,
    learning: learningCards.length,
    mastered: masteredCards.length,
    accuracy,
    mastery: calculateMastery(cards),
  }
}

/**
 * Convert flashcard game result to SM-2 quality
 */
export function gameResultToQuality(
  correct: boolean,
  timeMs: number,
  streak: number
): ReviewResult['quality'] {
  if (!correct) {
    return timeMs < 3000 ? 1 : 2 // Quick wrong = complete fail, slow wrong = partial recall
  }

  // Correct answers
  if (timeMs < 2000 && streak > 2) return 5 // Fast + streak = perfect
  if (timeMs < 3000) return 4 // Reasonably fast = good
  if (timeMs < 5000) return 3 // Slow but correct = difficult
  return 3 // Very slow = serious difficulty
}

// ============================================================================
// Legacy compatibility - for components that still use time-based nextReview
// ============================================================================

/** @deprecated Use nextReviewAfterGame instead */
export interface LegacyCardProgress {
  cardId: string
  easeFactor: number
  interval: number
  repetitions: number
  nextReview: number      // Unix timestamp (legacy)
  lastReview: number      // Unix timestamp (legacy)
  totalReviews: number
  correctCount: number
}

/**
 * Convert legacy card format to new format
 */
export function migrateLegacyCard(legacy: LegacyCardProgress): CardProgress {
  return {
    cardId: legacy.cardId,
    easeFactor: legacy.easeFactor,
    interval: legacy.interval,
    repetitions: legacy.repetitions,
    nextReviewAfterGame: 0, // Due immediately after migration
    lastReviewedAtGame: 0,
    totalReviews: legacy.totalReviews,
    correctCount: legacy.correctCount,
  }
}
