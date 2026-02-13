/**
 * Spaced Repetition System using SM-2 Algorithm
 *
 * Based on the SuperMemo SM-2 algorithm by Piotr Wozniak
 * https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
 */

export interface CardProgress {
  cardId: string
  easeFactor: number      // Difficulty multiplier (starts at 2.5)
  interval: number        // Days until next review
  repetitions: number     // Number of successful reviews
  nextReview: number      // Unix timestamp for next review
  lastReview: number      // Unix timestamp of last review
  totalReviews: number    // Total number of reviews
  correctCount: number    // Number of correct answers
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
 */
export function processReview(
  card: CardProgress,
  result: ReviewResult
): CardProgress {
  const { quality } = result
  const now = Date.now()

  // If quality < 3, reset repetitions (failed recall)
  if (quality < 3) {
    return {
      ...card,
      repetitions: 0,
      interval: 1,
      nextReview: now + 24 * 60 * 60 * 1000, // Review tomorrow
      lastReview: now,
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
    newInterval = 1
  } else if (newRepetitions === 2) {
    newInterval = 6
  } else {
    newInterval = Math.round(card.interval * card.easeFactor)
  }

  // Calculate new ease factor
  const newEaseFactor = Math.max(
    MIN_EASE_FACTOR,
    card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  )

  return {
    ...card,
    repetitions: newRepetitions,
    interval: newInterval,
    nextReview: now + newInterval * 24 * 60 * 60 * 1000,
    lastReview: now,
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
    nextReview: Date.now(),
    lastReview: 0,
    totalReviews: 0,
    correctCount: 0,
  }
}

/**
 * Check if a card is due for review
 */
export function isDue(card: CardProgress): boolean {
  return Date.now() >= card.nextReview
}

/**
 * Get cards that are due for review, sorted by priority
 */
export function getDueCards(cards: CardProgress[]): CardProgress[] {
  const now = Date.now()
  return cards
    .filter(card => card.nextReview <= now)
    .sort((a, b) => {
      // Priority: overdue cards first, then by interval (shorter = newer = higher priority)
      const aOverdue = now - a.nextReview
      const bOverdue = now - b.nextReview
      if (aOverdue !== bOverdue) return bOverdue - aOverdue
      return a.interval - b.interval
    })
}

/**
 * Get upcoming cards (not yet due)
 */
export function getUpcomingCards(cards: CardProgress[], days = 7): CardProgress[] {
  const now = Date.now()
  const futureLimit = now + days * 24 * 60 * 60 * 1000
  return cards
    .filter(card => card.nextReview > now && card.nextReview <= futureLimit)
    .sort((a, b) => a.nextReview - b.nextReview)
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
 */
export function getStudyStats(cards: CardProgress[]) {
  const now = Date.now()
  const dueCards = cards.filter(c => c.nextReview <= now)
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
