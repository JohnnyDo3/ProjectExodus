'use client'

// ============================================
// SACRED BOOK LEARNING GAMES
// Interactive educational activities for blank pages
// Matching, Flashcards, Crossword, Word Scramble
// ============================================

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { Check, X, RotateCcw, Lightbulb, ChevronLeft, ChevronRight, Shuffle } from 'lucide-react'
import type { LearningLevel } from '@/types/learning'

// ============================================
// TYPES
// ============================================

interface GameItem {
  id: string
  term: string
  definition: string
  hint?: string
}

interface CrosswordClue {
  id: string
  answer: string
  clue: string
  row: number
  col: number
  direction: 'across' | 'down'
}

interface BookGameProps {
  items: GameItem[]
  topicColor?: string
  level: LearningLevel
  onComplete?: (score: number) => void
  className?: string
}

// ============================================
// DIFFICULTY SETTINGS BY LEVEL
// ============================================

const DIFFICULTY_BY_LEVEL: Record<LearningLevel, {
  matchingPairs: number
  flashcardCount: number
  wordLength: { min: number; max: number }
  showHints: boolean
  timeLimit?: number
}> = {
  ELEMENTARY: {
    matchingPairs: 4,
    flashcardCount: 5,
    wordLength: { min: 3, max: 6 },
    showHints: true,
    timeLimit: undefined,
  },
  MIDDLE_SCHOOL: {
    matchingPairs: 5,
    flashcardCount: 6,
    wordLength: { min: 4, max: 8 },
    showHints: true,
    timeLimit: undefined,
  },
  HIGH_SCHOOL: {
    matchingPairs: 6,
    flashcardCount: 8,
    wordLength: { min: 5, max: 10 },
    showHints: false,
    timeLimit: undefined,
  },
  UNDERGRADUATE: {
    matchingPairs: 7,
    flashcardCount: 10,
    wordLength: { min: 6, max: 12 },
    showHints: false,
    timeLimit: 60,
  },
  GRADUATE: {
    matchingPairs: 8,
    flashcardCount: 12,
    wordLength: { min: 7, max: 14 },
    showHints: false,
    timeLimit: 45,
  },
  PHD: {
    matchingPairs: 10,
    flashcardCount: 15,
    wordLength: { min: 8, max: 16 },
    showHints: false,
    timeLimit: 30,
  },
}

// ============================================
// MATCHING GAME
// ============================================

export function MatchingGame({
  items,
  topicColor = 'var(--primary)',
  level,
  onComplete,
  className,
}: BookGameProps) {
  const settings = DIFFICULTY_BY_LEVEL[level]
  const gameItems = useMemo(() =>
    items.slice(0, settings.matchingPairs),
    [items, settings.matchingPairs]
  )

  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<string[]>([])
  const [wrongPair, setWrongPair] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)

  // Shuffle definitions separately
  const shuffledDefinitions = useMemo(() => {
    const defs = [...gameItems].map(item => ({
      id: item.id,
      definition: item.definition,
    }))
    for (let i = defs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [defs[i], defs[j]] = [defs[j], defs[i]]
    }
    return defs
  }, [gameItems])

  const handleTermClick = (termId: string) => {
    if (matchedPairs.includes(termId)) return
    setSelectedTerm(termId)
    setWrongPair(null)
  }

  const handleDefinitionClick = (defId: string) => {
    if (!selectedTerm || matchedPairs.includes(defId)) return

    setAttempts(prev => prev + 1)

    if (selectedTerm === defId) {
      // Correct match
      setMatchedPairs(prev => [...prev, defId])
      setSelectedTerm(null)

      if (matchedPairs.length + 1 === gameItems.length) {
        const score = Math.max(0, 100 - (attempts * 5))
        onComplete?.(score)
      }
    } else {
      // Wrong match
      setWrongPair(defId)
      setTimeout(() => {
        setWrongPair(null)
        setSelectedTerm(null)
      }, 800)
    }
  }

  const resetGame = () => {
    setSelectedTerm(null)
    setMatchedPairs([])
    setWrongPair(null)
    setAttempts(0)
  }

  const isComplete = matchedPairs.length === gameItems.length

  return (
    <div className={cn('w-full h-full flex flex-col', className)}>
      {/* Header */}
      <div className="text-center pb-2 shrink-0">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-lg">🎯</span>
          <h3 className="text-sm font-serif font-bold text-[var(--foreground)]">
            Match the Terms
          </h3>
        </div>
        <p className="text-[10px] text-[var(--muted-foreground)]">
          {matchedPairs.length}/{gameItems.length} matched • {attempts} attempts
        </p>
      </div>

      {/* Game area */}
      <div className="flex-1 grid grid-cols-2 gap-2 p-2 min-h-0 overflow-auto">
        {/* Terms column */}
        <div className="space-y-1.5">
          <div className="text-[9px] text-center text-[var(--muted-foreground)] uppercase tracking-wider mb-1">
            Terms
          </div>
          {gameItems.map((item) => (
            <motion.button
              key={`term-${item.id}`}
              onClick={() => handleTermClick(item.id)}
              disabled={matchedPairs.includes(item.id)}
              className={cn(
                'w-full p-2 rounded text-[10px] font-medium text-left transition-all',
                'border',
                matchedPairs.includes(item.id) && 'opacity-50 bg-green-500/10 border-green-500/30',
                selectedTerm === item.id && !matchedPairs.includes(item.id) && 'ring-2 ring-offset-1',
                !matchedPairs.includes(item.id) && selectedTerm !== item.id && 'hover:bg-[var(--muted)] border-[var(--border)]'
              )}
              style={{
                borderColor: selectedTerm === item.id ? topicColor : undefined,
                '--tw-ring-color': topicColor,
              } as React.CSSProperties}
              whileTap={{ scale: 0.98 }}
            >
              {item.term}
            </motion.button>
          ))}
        </div>

        {/* Definitions column */}
        <div className="space-y-1.5">
          <div className="text-[9px] text-center text-[var(--muted-foreground)] uppercase tracking-wider mb-1">
            Definitions
          </div>
          {shuffledDefinitions.map((def) => (
            <motion.button
              key={`def-${def.id}`}
              onClick={() => handleDefinitionClick(def.id)}
              disabled={matchedPairs.includes(def.id) || !selectedTerm}
              className={cn(
                'w-full p-2 rounded text-[10px] text-left transition-all',
                'border',
                matchedPairs.includes(def.id) && 'opacity-50 bg-green-500/10 border-green-500/30',
                wrongPair === def.id && 'bg-red-500/20 border-red-500/50 animate-shake',
                !matchedPairs.includes(def.id) && wrongPair !== def.id && 'hover:bg-[var(--muted)] border-[var(--border)]',
                !selectedTerm && !matchedPairs.includes(def.id) && 'opacity-60'
              )}
              whileTap={{ scale: 0.98 }}
            >
              {def.definition}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 pt-2 flex items-center justify-between px-2">
        {settings.showHints && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-[10px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center gap-1"
          >
            <Lightbulb className="w-3 h-3" />
            Hint
          </button>
        )}
        <button
          onClick={resetGame}
          className="text-[10px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Completion overlay */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            className="absolute inset-0 bg-[var(--background)]/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <motion.div
                className="text-4xl mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
              >
                🎉
              </motion.div>
              <p className="text-sm font-bold text-[var(--foreground)]">Complete!</p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {attempts} attempts
              </p>
              <button
                onClick={resetGame}
                className="mt-2 text-xs px-3 py-1 rounded bg-[var(--primary)] text-[var(--primary-foreground)]"
              >
                Play Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// FLASHCARDS
// ============================================

export function BookFlashcards({
  items,
  topicColor = 'var(--primary)',
  level,
  onComplete,
  className,
}: BookGameProps) {
  const settings = DIFFICULTY_BY_LEVEL[level]
  const cards = useMemo(() =>
    items.slice(0, settings.flashcardCount),
    [items, settings.flashcardCount]
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownCards, setKnownCards] = useState<string[]>([])
  const [studyAgain, setStudyAgain] = useState<string[]>([])

  const currentCard = cards[currentIndex]
  const progress = ((knownCards.length + studyAgain.length) / cards.length) * 100

  const handleFlip = () => setIsFlipped(!isFlipped)

  const handleKnown = () => {
    if (currentCard && !knownCards.includes(currentCard.id)) {
      setKnownCards(prev => [...prev, currentCard.id])
    }
    nextCard()
  }

  const handleStudyAgain = () => {
    if (currentCard && !studyAgain.includes(currentCard.id)) {
      setStudyAgain(prev => [...prev, currentCard.id])
    }
    nextCard()
  }

  const nextCard = () => {
    setIsFlipped(false)
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(prev => prev + 1)
      } else {
        // Complete
        const score = Math.round((knownCards.length / cards.length) * 100)
        onComplete?.(score)
      }
    }, 200)
  }

  const prevCard = () => {
    if (currentIndex > 0) {
      setIsFlipped(false)
      setTimeout(() => setCurrentIndex(prev => prev - 1), 200)
    }
  }

  const resetCards = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setKnownCards([])
    setStudyAgain([])
  }

  const isComplete = currentIndex >= cards.length - 1 &&
    (knownCards.length + studyAgain.length) >= cards.length

  return (
    <div className={cn('w-full h-full flex flex-col', className)}>
      {/* Header */}
      <div className="text-center pb-2 shrink-0">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-lg">📚</span>
          <h3 className="text-sm font-serif font-bold text-[var(--foreground)]">
            Flashcards
          </h3>
        </div>
        <p className="text-[10px] text-[var(--muted-foreground)]">
          Card {currentIndex + 1} of {cards.length}
        </p>
        {/* Progress bar */}
        <div className="w-full h-1 bg-[var(--muted)] rounded-full mt-1 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: topicColor }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center p-2 min-h-0">
        <motion.div
          className="w-full max-w-[200px] aspect-[3/4] cursor-pointer perspective-1000"
          onClick={handleFlip}
        >
          <motion.div
            className="relative w-full h-full"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Front */}
            <div
              className={cn(
                'absolute inset-0 rounded-lg border-2 p-3',
                'flex flex-col items-center justify-center text-center',
                'bg-[var(--card)] backface-hidden'
              )}
              style={{
                borderColor: topicColor,
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                Term
              </div>
              <div className="text-sm font-bold text-[var(--foreground)]">
                {currentCard?.term}
              </div>
              <div className="mt-auto text-[9px] text-[var(--muted-foreground)]">
                Tap to flip
              </div>
            </div>

            {/* Back */}
            <div
              className={cn(
                'absolute inset-0 rounded-lg border-2 p-3',
                'flex flex-col items-center justify-center text-center',
                'bg-[var(--muted)]'
              )}
              style={{
                borderColor: topicColor,
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                Definition
              </div>
              <div className="text-xs text-[var(--foreground)] leading-relaxed">
                {currentCard?.definition}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="shrink-0 pt-2 px-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <button
            onClick={prevCard}
            disabled={currentIndex === 0}
            className="p-1.5 rounded-full bg-[var(--muted)] disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleStudyAgain}
            className="px-3 py-1.5 rounded text-[10px] font-medium bg-orange-500/20 text-orange-600 hover:bg-orange-500/30"
          >
            Study Again
          </button>

          <button
            onClick={handleKnown}
            className="px-3 py-1.5 rounded text-[10px] font-medium bg-green-500/20 text-green-600 hover:bg-green-500/30"
          >
            Got It!
          </button>

          <button
            onClick={() => {
              setIsFlipped(false)
              setTimeout(() => {
                if (currentIndex < cards.length - 1) {
                  setCurrentIndex(prev => prev + 1)
                }
              }, 200)
            }}
            disabled={currentIndex >= cards.length - 1}
            className="p-1.5 rounded-full bg-[var(--muted)] disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-4 text-[9px] text-[var(--muted-foreground)]">
          <span className="text-green-600">✓ {knownCards.length} known</span>
          <span className="text-orange-600">↻ {studyAgain.length} review</span>
        </div>
      </div>

      {/* Completion */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            className="absolute inset-0 bg-[var(--background)]/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">🧠</div>
              <p className="text-sm font-bold">Session Complete!</p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {knownCards.length}/{cards.length} mastered
              </p>
              <button
                onClick={resetCards}
                className="mt-2 text-xs px-3 py-1 rounded bg-[var(--primary)] text-[var(--primary-foreground)]"
              >
                Study Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// WORD SCRAMBLE
// ============================================

export function WordScramble({
  items,
  topicColor = 'var(--primary)',
  level,
  onComplete,
  className,
}: BookGameProps) {
  const settings = DIFFICULTY_BY_LEVEL[level]

  // Filter items by word length for level
  const eligibleItems = useMemo(() =>
    items.filter(item => {
      const len = item.term.replace(/\s/g, '').length
      return len >= settings.wordLength.min && len <= settings.wordLength.max
    }).slice(0, 5),
    [items, settings.wordLength]
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [scrambledWord, setScrambledWord] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)

  const currentItem = eligibleItems[currentIndex]

  // Scramble the word
  useEffect(() => {
    if (currentItem) {
      const word = currentItem.term.toUpperCase()
      const letters = word.split('')
      for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]]
      }
      // Make sure it's actually scrambled
      if (letters.join('') === word) {
        letters.reverse()
      }
      setScrambledWord(letters.join(''))
      setUserInput('')
      setIsCorrect(null)
      setShowHint(false)
    }
  }, [currentItem])

  const checkAnswer = () => {
    if (!currentItem) return

    const isRight = userInput.trim().toUpperCase() === currentItem.term.toUpperCase()
    setIsCorrect(isRight)

    if (isRight) {
      setScore(prev => prev + 1)
      setTimeout(() => {
        if (currentIndex < eligibleItems.length - 1) {
          setCurrentIndex(prev => prev + 1)
        } else {
          onComplete?.(Math.round((score + 1) / eligibleItems.length * 100))
        }
      }, 1000)
    }
  }

  const skipWord = () => {
    if (currentIndex < eligibleItems.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const resetGame = () => {
    setCurrentIndex(0)
    setScore(0)
    setUserInput('')
    setIsCorrect(null)
  }

  const isComplete = currentIndex >= eligibleItems.length - 1 && isCorrect === true

  if (eligibleItems.length === 0) {
    return (
      <div className={cn('w-full h-full flex items-center justify-center', className)}>
        <p className="text-sm text-[var(--muted-foreground)]">No words available</p>
      </div>
    )
  }

  return (
    <div className={cn('w-full h-full flex flex-col', className)}>
      {/* Header */}
      <div className="text-center pb-2 shrink-0">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-lg">🔤</span>
          <h3 className="text-sm font-serif font-bold text-[var(--foreground)]">
            Word Scramble
          </h3>
        </div>
        <p className="text-[10px] text-[var(--muted-foreground)]">
          {currentIndex + 1}/{eligibleItems.length} • Score: {score}
        </p>
      </div>

      {/* Game area */}
      <div className="flex-1 flex flex-col items-center justify-center p-3">
        {/* Hint/Definition */}
        <div className="text-center mb-4">
          <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1">
            Hint
          </p>
          <p className="text-xs text-[var(--foreground)] max-w-[180px]">
            {showHint || settings.showHints
              ? currentItem?.definition
              : 'Click to reveal hint'}
          </p>
          {!settings.showHints && !showHint && (
            <button
              onClick={() => setShowHint(true)}
              className="text-[9px] text-[var(--primary)] mt-1"
            >
              Show hint (-10pts)
            </button>
          )}
        </div>

        {/* Scrambled letters */}
        <div className="flex flex-wrap justify-center gap-1 mb-4">
          {scrambledWord.split('').map((letter, i) => (
            <motion.div
              key={i}
              className="w-7 h-7 rounded bg-[var(--muted)] flex items-center justify-center text-sm font-bold"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {letter}
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="w-full max-w-[200px]">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
            placeholder="Type your answer..."
            className={cn(
              'w-full px-3 py-2 rounded border text-sm text-center',
              'bg-[var(--background)] focus:outline-none focus:ring-2',
              isCorrect === true && 'border-green-500 bg-green-500/10',
              isCorrect === false && 'border-red-500 bg-red-500/10',
              isCorrect === null && 'border-[var(--border)]'
            )}
            style={{ '--tw-ring-color': topicColor } as React.CSSProperties}
            disabled={isCorrect === true}
          />
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {isCorrect !== null && (
            <motion.div
              className={cn(
                'mt-2 text-xs font-medium',
                isCorrect ? 'text-green-600' : 'text-red-600'
              )}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isCorrect ? '✓ Correct!' : `✗ Try again`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="shrink-0 pt-2 px-2 flex justify-center gap-2">
        <button
          onClick={checkAnswer}
          disabled={!userInput.trim() || isCorrect === true}
          className="px-4 py-1.5 rounded text-[10px] font-medium bg-[var(--primary)] text-[var(--primary-foreground)] disabled:opacity-50"
        >
          Check
        </button>
        <button
          onClick={skipWord}
          disabled={currentIndex >= eligibleItems.length - 1}
          className="px-3 py-1.5 rounded text-[10px] font-medium bg-[var(--muted)] text-[var(--foreground)]"
        >
          Skip
        </button>
      </div>

      {/* Completion */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            className="absolute inset-0 bg-[var(--background)]/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-sm font-bold">All Done!</p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {score}/{eligibleItems.length} correct
              </p>
              <button
                onClick={resetGame}
                className="mt-2 text-xs px-3 py-1 rounded bg-[var(--primary)] text-[var(--primary-foreground)]"
              >
                Play Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// FILL IN THE BLANK
// ============================================

export function FillInBlank({
  items,
  topicColor = 'var(--primary)',
  level,
  onComplete,
  className,
}: BookGameProps) {
  const settings = DIFFICULTY_BY_LEVEL[level]
  const questions = useMemo(() => items.slice(0, 5), [items])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const currentQuestion = questions[currentIndex]

  // Create blank sentence
  const blankSentence = useMemo(() => {
    if (!currentQuestion) return ''
    const term = currentQuestion.term
    const def = currentQuestion.definition
    // Replace the term with blanks in the definition if it appears
    const regex = new RegExp(term, 'gi')
    if (regex.test(def)) {
      return def.replace(regex, '_'.repeat(term.length))
    }
    // Otherwise create a simple "X is ___" format
    return `${term}: ${'_'.repeat(Math.min(def.length, 20))}...`
  }, [currentQuestion])

  const checkAnswer = () => {
    if (!currentQuestion) return

    // Check if answer contains key words from definition
    const answer = userInput.trim().toLowerCase()
    const defWords = currentQuestion.definition.toLowerCase().split(' ')
    const keyWords = defWords.filter(w => w.length > 4)
    const matches = keyWords.filter(w => answer.includes(w))

    const isRight = matches.length >= Math.min(2, keyWords.length) ||
      answer === currentQuestion.term.toLowerCase()

    setIsCorrect(isRight)
    if (isRight) {
      setScore(prev => prev + 1)
    }
  }

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setUserInput('')
      setIsCorrect(null)
      setShowAnswer(false)
    } else {
      onComplete?.(Math.round(score / questions.length * 100))
    }
  }

  const isComplete = currentIndex >= questions.length - 1 && isCorrect !== null

  return (
    <div className={cn('w-full h-full flex flex-col', className)}>
      {/* Header */}
      <div className="text-center pb-2 shrink-0">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-lg">✏️</span>
          <h3 className="text-sm font-serif font-bold text-[var(--foreground)]">
            Fill in the Blank
          </h3>
        </div>
        <p className="text-[10px] text-[var(--muted-foreground)]">
          {currentIndex + 1}/{questions.length} • Score: {score}
        </p>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center p-3">
        <div className="text-center mb-4">
          <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
            Complete the definition
          </p>
          <p className="text-sm text-[var(--foreground)] font-medium mb-1">
            {currentQuestion?.term}
          </p>
          <p className="text-xs text-[var(--muted-foreground)] italic max-w-[200px]">
            {blankSentence}
          </p>
        </div>

        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your answer..."
          className={cn(
            'w-full max-w-[200px] h-20 px-3 py-2 rounded border text-xs resize-none',
            'bg-[var(--background)] focus:outline-none focus:ring-2',
            isCorrect === true && 'border-green-500 bg-green-500/10',
            isCorrect === false && 'border-red-500 bg-red-500/10',
            isCorrect === null && 'border-[var(--border)]'
          )}
          style={{ '--tw-ring-color': topicColor } as React.CSSProperties}
          disabled={isCorrect !== null}
        />

        {/* Feedback */}
        {isCorrect !== null && (
          <div className="mt-2 text-center">
            <p className={cn(
              'text-xs font-medium',
              isCorrect ? 'text-green-600' : 'text-red-600'
            )}>
              {isCorrect ? '✓ Great answer!' : '✗ Not quite'}
            </p>
            {!isCorrect && (
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="text-[9px] text-[var(--primary)] mt-1"
              >
                {showAnswer ? 'Hide answer' : 'Show answer'}
              </button>
            )}
            {showAnswer && (
              <p className="text-[10px] text-[var(--muted-foreground)] mt-1 max-w-[180px]">
                {currentQuestion?.definition}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="shrink-0 pt-2 px-2 flex justify-center gap-2">
        {isCorrect === null ? (
          <button
            onClick={checkAnswer}
            disabled={!userInput.trim()}
            className="px-4 py-1.5 rounded text-[10px] font-medium bg-[var(--primary)] text-[var(--primary-foreground)] disabled:opacity-50"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-4 py-1.5 rounded text-[10px] font-medium bg-[var(--primary)] text-[var(--primary-foreground)]"
          >
            {currentIndex < questions.length - 1 ? 'Next' : 'Finish'}
          </button>
        )}
      </div>
    </div>
  )
}

// ============================================
// GAME SELECTOR
// Randomly selects a game type for variety
// ============================================

type GameType = 'matching' | 'flashcards' | 'scramble' | 'fill-blank'

interface GameSelectorProps {
  items: GameItem[]
  topicColor?: string
  level: LearningLevel
  onComplete?: (score: number) => void
  className?: string
  defaultGame?: GameType
}

export function BookGameSelector({
  items,
  topicColor,
  level,
  onComplete,
  className,
  defaultGame,
}: GameSelectorProps) {
  const [selectedGame, setSelectedGame] = useState<GameType | null>(defaultGame || null)

  const games: { type: GameType; icon: string; label: string }[] = [
    { type: 'matching', icon: '🎯', label: 'Match' },
    { type: 'flashcards', icon: '📚', label: 'Cards' },
    { type: 'scramble', icon: '🔤', label: 'Scramble' },
    { type: 'fill-blank', icon: '✏️', label: 'Fill In' },
  ]

  if (!selectedGame) {
    return (
      <div className={cn('w-full h-full flex flex-col items-center justify-center p-4', className)}>
        <h3 className="text-sm font-serif font-bold text-[var(--foreground)] mb-1">
          Choose an Activity
        </h3>
        <p className="text-[10px] text-[var(--muted-foreground)] mb-4">
          Test your knowledge!
        </p>
        <div className="grid grid-cols-2 gap-2">
          {games.map((game) => (
            <button
              key={game.type}
              onClick={() => setSelectedGame(game.type)}
              className={cn(
                'p-3 rounded-lg border border-[var(--border)]',
                'hover:bg-[var(--muted)] transition-colors',
                'flex flex-col items-center gap-1'
              )}
            >
              <span className="text-2xl">{game.icon}</span>
              <span className="text-[10px] font-medium">{game.label}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const GameComponent = {
    matching: MatchingGame,
    flashcards: BookFlashcards,
    scramble: WordScramble,
    'fill-blank': FillInBlank,
  }[selectedGame]

  return (
    <div className={cn('w-full h-full relative', className)}>
      <button
        onClick={() => setSelectedGame(null)}
        className="absolute top-1 left-1 z-10 text-[9px] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
      >
        ← Back
      </button>
      <GameComponent
        items={items}
        topicColor={topicColor}
        level={level}
        onComplete={onComplete}
      />
    </div>
  )
}

// ============================================
// GRADED QUIZ
// 5-question assessment with percentage scoring
// ============================================

interface GradedQuizProps {
  items: GameItem[]
  topicColor?: string
  level: LearningLevel
  chapterIndex: number
  onComplete?: (score: number, total: number) => void
  className?: string
}

interface QuizQuestion {
  id: string
  question: string
  correctAnswer: string
  options: string[]
  type: 'definition' | 'term'
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function GradedQuiz({
  items,
  topicColor = 'var(--primary)',
  level,
  chapterIndex,
  onComplete,
  className,
}: GradedQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<{ correct: boolean; questionId: string }[]>([])
  const [quizComplete, setQuizComplete] = useState(false)

  // Generate 5 quiz questions from the items
  const questions = useMemo((): QuizQuestion[] => {
    if (items.length < 5) return []

    // Shuffle and take 5 items
    const selectedItems = shuffleArray(items).slice(0, 5)

    return selectedItems.map((item, idx) => {
      // Alternate between asking for definition and asking for term
      const askForDefinition = idx % 2 === 0

      // Generate wrong options from other items
      const otherItems = items.filter(i => i.id !== item.id)
      const wrongOptions = shuffleArray(otherItems)
        .slice(0, 3)
        .map(i => askForDefinition ? i.definition : i.term)

      const correctAnswer = askForDefinition ? item.definition : item.term
      const options = shuffleArray([correctAnswer, ...wrongOptions])

      return {
        id: item.id,
        question: askForDefinition
          ? `What is the definition of "${item.term}"?`
          : `Which term matches: "${item.definition.length > 80 ? item.definition.slice(0, 80) + '...' : item.definition}"`,
        correctAnswer,
        options,
        type: askForDefinition ? 'definition' : 'term',
      }
    })
  }, [items])

  const handleAnswer = useCallback((answer: string) => {
    if (showResult) return
    setSelectedAnswer(answer)
    setShowResult(true)

    const isCorrect = answer === questions[currentQuestion].correctAnswer
    setAnswers(prev => [...prev, { correct: isCorrect, questionId: questions[currentQuestion].id }])
  }, [showResult, questions, currentQuestion])

  const nextQuestion = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizComplete(true)
      const score = answers.filter(a => a.correct).length + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0)
      onComplete?.(score, 5)
    }
  }, [currentQuestion, questions.length, answers, selectedAnswer, onComplete])

  const restartQuiz = useCallback(() => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setAnswers([])
    setQuizComplete(false)
  }, [])

  if (questions.length < 5) {
    return (
      <div className={cn('h-full flex items-center justify-center', className)}>
        <p className="text-xs text-[var(--muted-foreground)]">
          Not enough terms for quiz
        </p>
      </div>
    )
  }

  // Show final results
  if (quizComplete) {
    const finalScore = answers.filter(a => a.correct).length
    const percentage = Math.round((finalScore / 5) * 100)
    // Tier thresholds: Gold 90%+, Silver 70-89%, Bronze 60-69%
    const isGold = percentage >= 90
    const isSilver = percentage >= 70 && percentage < 90
    const isBronze = percentage >= 60 && percentage < 70
    const passed = percentage >= 60

    return (
      <div className={cn('h-full flex flex-col items-center justify-center p-4', className)}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          {/* Score Circle */}
          <div
            className={cn(
              'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3',
              'border-4',
              isGold ? 'border-yellow-500 bg-yellow-500/10' :
              isSilver ? 'border-slate-400 bg-slate-400/10' :
              isBronze ? 'border-amber-600 bg-amber-600/10' :
              'border-red-500 bg-red-500/10'
            )}
          >
            <span className={cn(
              'text-2xl font-bold',
              isGold ? 'text-yellow-600' :
              isSilver ? 'text-slate-500' :
              isBronze ? 'text-amber-700' :
              'text-red-600'
            )}>
              {percentage}%
            </span>
          </div>

          {/* Result Message */}
          <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">
            {isGold ? '🥇 Gold!' :
             isSilver ? '🥈 Silver!' :
             isBronze ? '🥉 Bronze!' :
             '📚 Keep Learning!'}
          </h3>
          <p className="text-[10px] text-[var(--muted-foreground)] mb-1">
            {finalScore}/5 Correct Answers
          </p>
          <p className="text-[10px] text-[var(--muted-foreground)] mb-3">
            Chapter {chapterIndex + 1} Quiz
          </p>

          {/* Badge Progress Hint */}
          {isGold && (
            <div className="text-[9px] text-yellow-600 bg-yellow-500/10 px-2 py-1 rounded mb-3">
              🏆 Badge progress: Gold tier earned!
            </div>
          )}
          {isSilver && (
            <div className="text-[9px] text-slate-600 bg-slate-400/10 px-2 py-1 rounded mb-3">
              🥈 Badge progress: Silver tier earned!
            </div>
          )}
          {isBronze && (
            <div className="text-[9px] text-amber-700 bg-amber-600/10 px-2 py-1 rounded mb-3">
              🥉 Badge progress: Bronze tier earned!
            </div>
          )}
          {!passed && (
            <div className="text-[9px] text-red-600 bg-red-500/10 px-2 py-1 rounded mb-3">
              📖 Review content & try again for a badge
            </div>
          )}

          <button
            onClick={restartQuiz}
            className="px-4 py-1.5 rounded text-[10px] font-medium bg-[var(--primary)] text-[var(--primary-foreground)]"
          >
            <RotateCcw className="w-3 h-3 inline mr-1" />
            Try Again
          </button>
        </motion.div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className={cn('h-full flex flex-col', className)}>
      {/* Progress */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1 h-1.5 bg-[var(--muted)] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: topicColor }}
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / 5) * 100}%` }}
          />
        </div>
        <span className="text-[10px] font-medium text-[var(--muted-foreground)]">
          {currentQuestion + 1}/5
        </span>
      </div>

      {/* Question */}
      <div className="mb-3">
        <p className="text-xs font-medium text-[var(--foreground)] leading-relaxed">
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="flex-1 space-y-2 overflow-y-auto">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === option
          const isCorrect = option === question.correctAnswer
          const showCorrect = showResult && isCorrect
          const showWrong = showResult && isSelected && !isCorrect

          return (
            <motion.button
              key={idx}
              onClick={() => handleAnswer(option)}
              disabled={showResult}
              className={cn(
                'w-full p-2 rounded-lg border text-left transition-all',
                'text-[10px] leading-relaxed',
                !showResult && 'hover:bg-[var(--muted)] border-[var(--border)]',
                showCorrect && 'bg-emerald-500/20 border-emerald-500 text-emerald-700',
                showWrong && 'bg-red-500/20 border-red-500 text-red-700',
                isSelected && !showResult && 'border-[var(--primary)] bg-[var(--primary)]/10'
              )}
              whileHover={!showResult ? { scale: 1.01 } : {}}
              whileTap={!showResult ? { scale: 0.99 } : {}}
            >
              <span className="flex items-start gap-2">
                <span className={cn(
                  'shrink-0 w-4 h-4 rounded-full border flex items-center justify-center text-[8px] font-bold mt-0.5',
                  showCorrect && 'bg-emerald-500 border-emerald-500 text-white',
                  showWrong && 'bg-red-500 border-red-500 text-white',
                  !showResult && 'border-[var(--border)]'
                )}>
                  {showCorrect ? <Check className="w-2.5 h-2.5" /> :
                   showWrong ? <X className="w-2.5 h-2.5" /> :
                   String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">
                  {option.length > 100 ? option.slice(0, 100) + '...' : option}
                </span>
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Next Button */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex justify-center"
        >
          <button
            onClick={nextQuestion}
            className="px-4 py-1.5 rounded text-[10px] font-medium bg-[var(--primary)] text-[var(--primary-foreground)]"
          >
            {currentQuestion < 4 ? 'Next Question →' : 'See Results'}
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default BookGameSelector
