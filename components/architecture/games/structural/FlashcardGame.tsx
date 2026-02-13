'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { HardHat, Play, Trophy, RotateCcw, Zap, Check, X } from 'lucide-react'
import { getAllStructuralElements, GameProps } from './shared'

// Screen reader announcement component
function LiveRegion({ message }: { message: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  )
}

// =============================================================================
// FLASHCARD GAME COMPONENT
// =============================================================================
export function FlashcardGame({ onBack }: GameProps) {
  const allElements = useMemo(() => getAllStructuralElements(), [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showResult, setShowResult] = useState<'correct' | 'wrong' | null>(null)
  const [gameElements, setGameElements] = useState<typeof allElements>([])
  const [options, setOptions] = useState<typeof allElements>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])
  const startButtonRef = useRef<HTMLButtonElement>(null)

  const startGame = useCallback(() => {
    const shuffled = [...allElements].sort(() => Math.random() - 0.5).slice(0, 10)
    setGameElements(shuffled)
    setCurrentIndex(0)
    setScore(0)
    setStreak(0)
    setGameComplete(false)
    setIsPlaying(true)
  }, [allElements])

  useEffect(() => {
    if (isPlaying && gameElements.length > 0 && currentIndex < gameElements.length) {
      const current = gameElements[currentIndex]
      const others = allElements.filter(e => e.id !== current.id)
      const wrongOptions = others.sort(() => Math.random() - 0.5).slice(0, 3)
      const allOptions = [current, ...wrongOptions].sort(() => Math.random() - 0.5)
      setOptions(allOptions)
      // Focus first option when question changes
      setTimeout(() => optionRefs.current[0]?.focus(), 100)
    }
  }, [currentIndex, gameElements, isPlaying, allElements])

  const handleAnswer = useCallback((answerId: string) => {
    if (showResult) return

    const correct = answerId === gameElements[currentIndex]?.id
    const correctName = gameElements[currentIndex]?.name || ''
    setShowResult(correct ? 'correct' : 'wrong')

    if (correct) {
      setScore(s => s + 1)
      setStreak(s => s + 1)
      setAnnouncement(`Correct! It was ${correctName}.`)
    } else {
      setStreak(0)
      setAnnouncement(`Incorrect. The answer was ${correctName}.`)
    }

    setTimeout(() => {
      setShowResult(null)
      if (currentIndex + 1 >= gameElements.length) {
        setGameComplete(true)
        setIsPlaying(false)
      } else {
        setCurrentIndex(i => i + 1)
        setAnnouncement('')
      }
    }, 1000)
  }, [showResult, gameElements, currentIndex])

  // Keyboard shortcuts for answers (1-4)
  useEffect(() => {
    if (!isPlaying || showResult) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const keyNum = parseInt(e.key)
      if (keyNum >= 1 && keyNum <= 4 && options[keyNum - 1]) {
        handleAnswer(options[keyNum - 1].id)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying, showResult, options, handleAnswer])

  if (!isPlaying && !gameComplete) {
    return (
      <div className="text-center py-12" role="region" aria-label="Flashcard Game Start">
        <HardHat className="w-16 h-16 mx-auto mb-4 text-blue-500" aria-hidden="true" />
        <h3 className="text-2xl font-bold mb-2">Structural Flashcards</h3>
        <p className="text-muted-foreground mb-6">
          Identify structural elements from their diagrams. 10 questions, beat your best score!
        </p>
        <button
          ref={startButtonRef}
          onClick={startGame}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Start flashcard game with 10 questions"
        >
          <Play className="w-5 h-5 inline mr-2" aria-hidden="true" />
          Start Game
        </button>
      </div>
    )
  }

  if (gameComplete) {
    return (
      <div className="text-center py-12" role="region" aria-label="Game Results">
        <LiveRegion message={`Game complete! You scored ${score} out of ${gameElements.length}.`} />
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" aria-hidden="true" />
        <h3 className="text-2xl font-bold mb-2">Game Complete!</h3>
        <p className="text-4xl font-black text-blue-600 mb-4" aria-label={`Score: ${score} out of 10`}>{score}/10</p>
        <p className="text-muted-foreground mb-6">
          {score === 10 ? 'Perfect score! Structural master!' :
           score >= 7 ? 'Great job! You know your structures!' :
           score >= 5 ? 'Good effort! Keep practicing!' :
           'Keep learning, you\'ll get better!'}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={startGame}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Play again"
          >
            <RotateCcw className="w-4 h-4 inline mr-2" aria-hidden="true" />
            Play Again
          </button>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-muted text-foreground rounded-lg font-bold hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Return to game menu"
          >
            Back to Menu
          </button>
        </div>
      </div>
    )
  }

  const current = gameElements[currentIndex]

  return (
    <div className="max-w-2xl mx-auto" role="region" aria-label="Flashcard Game">
      <LiveRegion message={announcement} />

      {/* Progress bar */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="flex-1 h-2 bg-muted rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={currentIndex + 1}
          aria-valuemin={1}
          aria-valuemax={gameElements.length}
          aria-label={`Question ${currentIndex + 1} of ${gameElements.length}`}
        >
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${((currentIndex + 1) / gameElements.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold" aria-hidden="true">{currentIndex + 1}/{gameElements.length}</span>
        <div className="flex items-center gap-1 text-yellow-500" aria-label={`Streak: ${streak}`}>
          <Zap className="w-4 h-4" aria-hidden="true" />
          <span className="font-bold">{streak}</span>
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground mb-2">{current.categoryName}</p>
        <h4 className="text-lg font-bold">What type of {current.categoryName.toLowerCase().replace(' systems', '').replace(' types', '')} is this?</h4>
      </div>

      {/* SVG Display */}
      <div
        className={`relative w-48 h-48 mx-auto mb-8 rounded-xl border-4 transition-colors ${
          showResult === 'correct' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
          showResult === 'wrong' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
          'border-border bg-background'
        }`}
        role="img"
        aria-label={`Diagram of a ${current.categoryName.toLowerCase()} element. Identify which type it is.`}
      >
        <current.component showHalo={false} />
        {showResult && (
          <div className={`absolute inset-0 flex items-center justify-center ${
            showResult === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            {showResult === 'correct' ? (
              <Check className="w-16 h-16 text-green-500" aria-hidden="true" />
            ) : (
              <X className="w-16 h-16 text-red-500" aria-hidden="true" />
            )}
          </div>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3" role="group" aria-label="Answer options. Press 1-4 to select.">
        {options.map((option, index) => (
          <button
            key={option.id}
            ref={el => { optionRefs.current[index] = el }}
            onClick={() => handleAnswer(option.id)}
            disabled={showResult !== null}
            className={`p-4 rounded-xl font-bold text-left transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              showResult && option.id === current.id
                ? 'bg-green-500 text-white'
                : showResult && option.id !== current.id
                ? 'bg-muted opacity-50'
                : 'bg-muted hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:border-blue-500 border-2 border-transparent'
            }`}
            aria-label={`Option ${index + 1}: ${option.name}. Press ${index + 1} to select.`}
            aria-pressed={showResult && option.id === current.id ? 'true' : undefined}
          >
            <span className="sr-only">{index + 1}. </span>
            {option.name}
          </button>
        ))}
      </div>

      {/* Score */}
      <div className="text-center mt-6 text-muted-foreground">
        Score: <span className="font-bold text-foreground">{score}</span>
      </div>
    </div>
  )
}
