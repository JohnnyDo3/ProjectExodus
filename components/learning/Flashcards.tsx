'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RotateCcw, ChevronLeft, ChevronRight, Shuffle, CheckCircle2,
  XCircle, Lightbulb, BookOpen, Zap, Trophy, RefreshCw,
  GraduationCap, Star, Layers
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { LearningLevel } from '@/types/learning'
import { Founder } from './FounderCard'

// Flashcard types
export interface Flashcard {
  id: string
  front: string // Question or term
  back: string // Answer or definition
  category: 'term' | 'concept' | 'pioneer' | 'fact' | 'principle'
  difficulty: 'easy' | 'medium' | 'hard'
  hint?: string
  relatedPioneer?: Founder
}

export interface FlashcardDeck {
  id: string
  title: string
  description: string
  classroomId?: string
  lessonId?: string
  cards: Flashcard[]
  level: LearningLevel
}

// Study session state
interface StudySession {
  currentIndex: number
  knownCards: Set<string>
  unknownCards: Set<string>
  reviewCards: string[] // Cards to review again
  isComplete: boolean
}

// Individual Flashcard Component with flip animation
function FlashcardItem({
  card,
  isFlipped,
  onFlip,
  showHint,
  onToggleHint
}: {
  card: Flashcard
  isFlipped: boolean
  onFlip: () => void
  showHint: boolean
  onToggleHint: () => void
}) {
  const categoryColors = {
    term: 'bg-blue-500',
    concept: 'bg-purple-500',
    pioneer: 'bg-amber-500',
    fact: 'bg-green-500',
    principle: 'bg-rose-500'
  }

  const categoryIcons = {
    term: BookOpen,
    concept: Lightbulb,
    pioneer: GraduationCap,
    fact: Zap,
    principle: Star
  }

  const CategoryIcon = categoryIcons[card.category]

  return (
    <div className="perspective-1000 w-full max-w-lg mx-auto">
      <motion.div
        className="relative w-full aspect-[3/2] cursor-pointer preserve-3d"
        onClick={onFlip}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl border-4 border-[var(--primary)] bg-gradient-to-br from-[var(--card)] to-[color-mix(in_srgb,var(--primary)_5%,var(--card))] shadow-xl p-6 flex flex-col"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Category badge */}
          <div className="flex items-center justify-between mb-4">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-xs font-bold ${categoryColors[card.category]}`}>
              <CategoryIcon className="w-3 h-3" />
              {card.category.charAt(0).toUpperCase() + card.category.slice(1)}
            </div>
            <div className={`px-2 py-0.5 rounded text-xs font-bold ${
              card.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              card.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {card.difficulty}
            </div>
          </div>

          {/* Question */}
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xl md:text-2xl font-bold text-[var(--foreground)] text-center leading-relaxed">
              {card.front}
            </p>
          </div>

          {/* Hint section */}
          {card.hint && (
            <div className="mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleHint()
                }}
                className="text-sm text-theme-primary font-bold flex items-center gap-1 hover:underline"
              >
                <Lightbulb className="w-4 h-4" />
                {showHint ? 'Hide hint' : 'Show hint'}
              </button>
              {showHint && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-sm text-theme-muted mt-2 p-2 rounded-lg bg-[var(--muted)]"
                >
                  {card.hint}
                </motion.p>
              )}
            </div>
          )}

          {/* Tap instruction */}
          <p className="text-xs text-theme-muted text-center mt-4">
            Tap to reveal answer
          </p>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl border-4 border-[var(--accent)] bg-gradient-to-br from-[var(--card)] to-[color-mix(in_srgb,var(--accent)_10%,var(--card))] shadow-xl p-6 flex flex-col"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Answer label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="px-3 py-1 rounded-full bg-[var(--accent)] text-white text-xs font-bold">
              ANSWER
            </div>
          </div>

          {/* Answer */}
          <div className="flex-1 flex items-center justify-center">
            <p className="text-lg md:text-xl text-[var(--foreground)] text-center leading-relaxed">
              {card.back}
            </p>
          </div>

          {/* Pioneer info if related */}
          {card.relatedPioneer && (
            <div className="mt-4 p-3 rounded-lg bg-[var(--muted)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-bold">
                {card.relatedPioneer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-bold text-sm text-[var(--foreground)]">{card.relatedPioneer.name}</p>
                <p className="text-xs text-theme-muted">{card.relatedPioneer.title}</p>
              </div>
            </div>
          )}

          {/* Tap instruction */}
          <p className="text-xs text-theme-muted text-center mt-4">
            Tap to flip back
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// Main Flashcard Deck Component
interface FlashcardDeckProps {
  deck: FlashcardDeck
  onComplete?: (session: { known: number; unknown: number; total: number }) => void
  onClose?: () => void
}

export function FlashcardStudy({ deck, onComplete, onClose }: FlashcardDeckProps) {
  const [session, setSession] = useState<StudySession>({
    currentIndex: 0,
    knownCards: new Set(),
    unknownCards: new Set(),
    reviewCards: [],
    isComplete: false
  })
  const [isFlipped, setIsFlipped] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)

  // Shuffle cards if requested
  const studyCards = useMemo(() => {
    if (isShuffled) {
      return [...deck.cards].sort(() => Math.random() - 0.5)
    }
    return deck.cards
  }, [deck.cards, isShuffled])

  const currentCard = studyCards[session.currentIndex]
  const progress = ((session.knownCards.size + session.unknownCards.size) / studyCards.length) * 100

  const handleFlip = useCallback(() => {
    setIsFlipped(!isFlipped)
  }, [isFlipped])

  const handleKnown = useCallback(() => {
    setSession(prev => {
      const newKnown = new Set(prev.knownCards)
      newKnown.add(currentCard.id)

      const nextIndex = prev.currentIndex + 1
      const isComplete = nextIndex >= studyCards.length && prev.reviewCards.length === 0

      if (isComplete && onComplete) {
        onComplete({
          known: newKnown.size,
          unknown: prev.unknownCards.size,
          total: studyCards.length
        })
      }

      return {
        ...prev,
        knownCards: newKnown,
        currentIndex: nextIndex >= studyCards.length ? 0 : nextIndex,
        isComplete
      }
    })
    setIsFlipped(false)
    setShowHint(false)
  }, [currentCard, studyCards.length, onComplete])

  const handleUnknown = useCallback(() => {
    setSession(prev => {
      const newUnknown = new Set(prev.unknownCards)
      newUnknown.add(currentCard.id)
      const newReview = [...prev.reviewCards, currentCard.id]

      const nextIndex = prev.currentIndex + 1
      const isComplete = nextIndex >= studyCards.length && newReview.length === 0

      return {
        ...prev,
        unknownCards: newUnknown,
        reviewCards: newReview,
        currentIndex: nextIndex >= studyCards.length ? 0 : nextIndex,
        isComplete
      }
    })
    setIsFlipped(false)
    setShowHint(false)
  }, [currentCard, studyCards.length])

  const handlePrevious = useCallback(() => {
    if (session.currentIndex > 0) {
      setSession(prev => ({ ...prev, currentIndex: prev.currentIndex - 1 }))
      setIsFlipped(false)
      setShowHint(false)
    }
  }, [session.currentIndex])

  const handleNext = useCallback(() => {
    if (session.currentIndex < studyCards.length - 1) {
      setSession(prev => ({ ...prev, currentIndex: prev.currentIndex + 1 }))
      setIsFlipped(false)
      setShowHint(false)
    }
  }, [session.currentIndex, studyCards.length])

  const handleShuffle = useCallback(() => {
    setIsShuffled(prev => !prev)
    setSession(prev => ({ ...prev, currentIndex: 0 }))
    setIsFlipped(false)
  }, [])

  const handleRestart = useCallback(() => {
    setSession({
      currentIndex: 0,
      knownCards: new Set(),
      unknownCards: new Set(),
      reviewCards: [],
      isComplete: false
    })
    setIsFlipped(false)
    setShowHint(false)
  }, [])

  // Complete screen
  if (session.isComplete) {
    const knownPercent = Math.round((session.knownCards.size / studyCards.length) * 100)

    return (
      <Card className="border-4 border-[var(--accent)] overflow-hidden">
        <div className="h-3 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]" />
        <CardContent className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
          </motion.div>

          <h2 className="text-3xl font-black text-[var(--foreground)] mb-2">
            Study Session Complete!
          </h2>

          <div className="flex items-center justify-center gap-8 my-6">
            <div className="text-center">
              <div className="text-4xl font-black text-green-500">{session.knownCards.size}</div>
              <div className="text-sm text-theme-muted font-bold">Known</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-red-500">{session.unknownCards.size}</div>
              <div className="text-sm text-theme-muted font-bold">Need Review</div>
            </div>
          </div>

          <div className="w-full h-4 bg-[var(--muted)] rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-400"
              style={{ width: `${knownPercent}%` }}
            />
          </div>

          <p className="text-lg text-theme-muted mb-6">
            You knew <span className="font-bold text-green-500">{knownPercent}%</span> of the cards
          </p>

          <div className="flex gap-3 justify-center">
            {session.unknownCards.size > 0 && (
              <Button onClick={() => {
                // Study only unknown cards
                setSession({
                  currentIndex: 0,
                  knownCards: new Set(),
                  unknownCards: new Set(),
                  reviewCards: [],
                  isComplete: false
                })
              }} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Review Missed Cards
              </Button>
            )}
            <Button onClick={handleRestart}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Study All Again
            </Button>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="mt-6 text-sm text-theme-muted hover:text-[var(--foreground)]"
            >
              Return to lesson
            </button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-[var(--foreground)] flex items-center gap-2">
            <Layers className="w-5 h-5 text-theme-primary" />
            {deck.title}
          </h2>
          <p className="text-sm text-theme-muted">{deck.description}</p>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        )}
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-theme-muted">
            Card {session.currentIndex + 1} of {studyCards.length}
          </span>
          <div className="flex items-center gap-4">
            <span className="text-green-500 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              {session.knownCards.size}
            </span>
            <span className="text-red-500 font-bold flex items-center gap-1">
              <XCircle className="w-4 h-4" />
              {session.unknownCards.size}
            </span>
          </div>
        </div>
        <div className="w-full h-2 bg-[var(--muted)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        <Button variant="ghost" size="sm" onClick={handleShuffle}>
          <Shuffle className={`w-4 h-4 ${isShuffled ? 'text-theme-primary' : ''}`} />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleRestart}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Flashcard */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCard.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          <FlashcardItem
            card={currentCard}
            isFlipped={isFlipped}
            onFlip={handleFlip}
            showHint={showHint}
            onToggleHint={() => setShowHint(!showHint)}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation and response buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={session.currentIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        {isFlipped ? (
          <div className="flex gap-3">
            <Button
              onClick={handleUnknown}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Still Learning
            </Button>
            <Button
              onClick={handleKnown}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Got It!
            </Button>
          </div>
        ) : (
          <p className="text-sm text-theme-muted">Flip to see answer</p>
        )}

        <Button
          variant="outline"
          onClick={handleNext}
          disabled={session.currentIndex === studyCards.length - 1}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}

// Generator function to create flashcards from lesson content
export function generateFlashcardsFromContent(
  lessonId: string,
  lessonTitle: string,
  content: string,
  level: LearningLevel,
  pioneers?: Founder[]
): Flashcard[] {
  const flashcards: Flashcard[] = []
  let cardIndex = 0

  // Helper to create a flashcard
  const createCard = (
    front: string,
    back: string,
    category: Flashcard['category'],
    difficulty: Flashcard['difficulty'],
    hint?: string,
    relatedPioneer?: Founder
  ): Flashcard => ({
    id: `${lessonId}-card-${cardIndex++}`,
    front,
    back,
    category,
    difficulty,
    hint,
    relatedPioneer
  })

  // Extract key terms (words in <strong> or <b> tags)
  const strongTerms = content.match(/<(?:strong|b)>([^<]+)<\/(?:strong|b)>/gi) || []
  strongTerms.forEach(match => {
    const term = match.replace(/<\/?(?:strong|b)>/gi, '').trim()
    if (term.length > 3 && term.length < 100) {
      // Try to find context around the term
      const termIndex = content.indexOf(match)
      const surroundingText = content.slice(Math.max(0, termIndex - 200), termIndex + match.length + 200)
      const sentences = surroundingText.replace(/<[^>]*>/g, '').split(/[.!?]/)
      const relevantSentence = sentences.find(s => s.includes(term))?.trim()

      if (relevantSentence && relevantSentence.length > term.length + 10) {
        flashcards.push(createCard(
          `What is "${term}"?`,
          relevantSentence,
          'term',
          level === 'ELEMENTARY' || level === 'MIDDLE_SCHOOL' ? 'easy' : 'medium'
        ))
      }
    }
  })

  // Extract definitions (patterns like "X is...", "X are...", "X means...")
  const definitionPatterns = [
    /([A-Z][a-zA-Z\s]+)\s+(?:is|are|means?|refers? to)\s+([^.]+\.)/g,
    /(?:called|known as|termed)\s+([a-zA-Z\s]+)[,\s]+(?:which|that)\s+([^.]+\.)/gi
  ]

  const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ')

  definitionPatterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(textContent)) !== null) {
      const term = match[1].trim()
      const definition = match[0].trim()
      if (term.length > 3 && term.length < 50 && definition.length > 20) {
        flashcards.push(createCard(
          `Define: ${term}`,
          definition,
          'concept',
          'medium'
        ))
      }
    }
  })

  // Create pioneer cards
  if (pioneers && pioneers.length > 0) {
    pioneers.forEach(pioneer => {
      // Name and title card
      flashcards.push(createCard(
        `Who is known as the "${pioneer.title}"?`,
        pioneer.name,
        'pioneer',
        'easy',
        pioneer.shortBio?.slice(0, 50) + '...',
        pioneer
      ))

      // Quote card (if available)
      if (pioneer.quote) {
        flashcards.push(createCard(
          `Who said: "${pioneer.quote}"?`,
          `${pioneer.name} - ${pioneer.title}`,
          'pioneer',
          'medium',
          undefined,
          pioneer
        ))
      }

      // Contribution card
      if (pioneer.contributions && pioneer.contributions.length > 0) {
        flashcards.push(createCard(
          `What is ${pioneer.name} best known for?`,
          pioneer.contributions[0],
          'pioneer',
          'medium',
          pioneer.title,
          pioneer
        ))
      }
    })
  }

  // Extract facts (sentences with numbers or percentages)
  const factPattern = /[^.]*\d+(?:%|percent|million|billion|thousand|years?)[^.]*\./gi
  const facts = textContent.match(factPattern) || []
  facts.slice(0, 5).forEach(fact => {
    const cleanFact = fact.trim()
    if (cleanFact.length > 20 && cleanFact.length < 200) {
      // Create a fill-in-the-blank style question
      const numberMatch = cleanFact.match(/\d+(?:%|percent|million|billion|thousand|years?)?/)
      if (numberMatch) {
        const question = cleanFact.replace(numberMatch[0], '______')
        flashcards.push(createCard(
          `Fill in the blank: ${question}`,
          numberMatch[0],
          'fact',
          'hard'
        ))
      }
    }
  })

  // Extract principles (patterns like "The X principle", "Rule of X")
  const principlePatterns = [
    /(?:the\s+)?([A-Z][a-z]+(?:\s+[A-Z]?[a-z]+)*)\s+(?:principle|rule|law|method|technique|approach)/gi,
    /(?:principle|rule|law)\s+of\s+([A-Z][a-z]+(?:\s+[a-z]+)*)/gi
  ]

  principlePatterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(textContent)) !== null) {
      const principle = match[0].trim()
      // Find the explanation after the principle mention
      const afterMatch = textContent.slice(match.index + match[0].length, match.index + match[0].length + 200)
      const explanation = afterMatch.split('.')[0]?.trim()

      if (principle.length > 5 && explanation && explanation.length > 20) {
        flashcards.push(createCard(
          `What is the ${principle}?`,
          explanation + '.',
          'principle',
          'hard'
        ))
      }
    }
  })

  // Limit and deduplicate
  const uniqueCards = flashcards.reduce((acc, card) => {
    const key = card.front.toLowerCase()
    if (!acc.some(c => c.front.toLowerCase() === key)) {
      acc.push(card)
    }
    return acc
  }, [] as Flashcard[])

  // Return up to 20 cards, balanced by category
  return uniqueCards.slice(0, 20)
}

// Quick flashcard preview button component
export function FlashcardButton({
  cardCount,
  onClick
}: {
  cardCount: number
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
    >
      <Layers className="w-5 h-5" />
      Study Flashcards
      <span className="px-2 py-0.5 rounded-full bg-white/20 text-sm">
        {cardCount}
      </span>
    </button>
  )
}
