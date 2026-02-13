'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Timer, Trophy, Zap, ChevronRight, RotateCcw, Home,
  Volume2, VolumeX, Check, X, Ghost, Flag, Pause, Play,
  Shuffle, Clock, Target
} from 'lucide-react'
import type { ArchitecturalElement, LearningLevel } from '@/data/architecture/types'
import { ALL_ELEMENTS, getRandomElements, getRandomWrongOptions } from '@/data/architecture/elements'
import { CATEGORIES } from '@/data/architecture/categories'
import { ArchitectureSVG } from './ArchitectureSVG'
import { useSpacedRepetitionStore } from '@/hooks/useSpacedRepetitionStore'
import { gameResultToQuality } from '@/lib/spacedRepetition'

// Screen reader announcement component
function LiveRegion({ message }: { message: string }) {
  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {message}
    </div>
  )
}

interface GameConfig {
  elementCount: number
  learningLevel: LearningLevel
  enableGhost: boolean
  shuffleMode: 'random' | 'timeline' | 'category'
  category?: string
  period?: string
}

interface GhostData {
  elementId: string
  timestamp: number
  correct: boolean
}

interface GameState {
  phase: 'intro' | 'playing' | 'paused' | 'results'
  currentIndex: number
  score: number
  streak: number
  maxStreak: number
  startTime: number
  elapsed: number
  answers: { elementId: string; correct: boolean; timeMs: number }[]
}

interface FlashcardGameProps {
  config?: Partial<GameConfig>
  onComplete?: (results: GameState) => void
  onExit?: () => void
  showConfig?: boolean
}

const DEFAULT_CONFIG: GameConfig = {
  elementCount: 10,
  learningLevel: 'MIDDLE_SCHOOL',
  enableGhost: true,
  shuffleMode: 'random',
}

export function FlashcardGame({ config: userConfig, onComplete, onExit, showConfig = false }: FlashcardGameProps) {
  // Config state (for when showConfig is true)
  const [selectedCount, setSelectedCount] = useState(userConfig?.elementCount || 10)
  const [selectedPath, setSelectedPath] = useState<'random' | 'timeline' | 'category'>(userConfig?.shuffleMode || 'random')
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(userConfig?.category)

  const config = {
    ...DEFAULT_CONFIG,
    ...userConfig,
    ...(showConfig ? {
      elementCount: selectedCount,
      shuffleMode: selectedPath,
      category: selectedCategory
    } : {})
  }

  // Game state
  const [gameState, setGameState] = useState<GameState>({
    phase: 'intro',
    currentIndex: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    startTime: 0,
    elapsed: 0,
    answers: [],
  })

  // Game elements
  const [elements, setElements] = useState<ArchitecturalElement[]>([])
  const [options, setOptions] = useState<ArchitecturalElement[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  // Ghost racing
  const [ghostData, setGhostData] = useState<GhostData[]>([])
  const [ghostProgress, setGhostProgress] = useState(0)
  const [bestTime, setBestTime] = useState<number | null>(null)

  // Audio & UI
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [announcement, setAnnouncement] = useState('')

  // Spaced repetition
  const { recordReview } = useSpacedRepetitionStore()

  // Timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])
  const questionStartRef = useRef<number>(0)

  // Initialize game
  useEffect(() => {
    const gameElements = getRandomElements(config.elementCount)
    setElements(gameElements)

    // Load best time from localStorage
    const saved = localStorage.getItem('architecture-flashcard-best')
    if (saved) {
      const { time, ghost } = JSON.parse(saved)
      setBestTime(time)
      if (config.enableGhost && ghost) {
        setGhostData(ghost)
      }
    }
  }, [config.elementCount, config.enableGhost])

  // Timer effect
  useEffect(() => {
    if (gameState.phase === 'playing') {
      timerRef.current = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          elapsed: Date.now() - prev.startTime,
        }))

        // Update ghost progress
        if (config.enableGhost && ghostData.length > 0) {
          const elapsed = Date.now() - gameState.startTime
          const ghostAnswers = ghostData.filter(g => g.timestamp <= elapsed)
          setGhostProgress(ghostAnswers.length)
        }
      }, 100)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [gameState.phase, gameState.startTime, config.enableGhost, ghostData])

  // Generate options for current question
  useEffect(() => {
    if (elements.length > 0 && gameState.currentIndex < elements.length) {
      const current = elements[gameState.currentIndex]
      const wrongOptions = getRandomWrongOptions(3, current, elements.map(e => e.id))
      const allOptions = [current, ...wrongOptions].sort(() => Math.random() - 0.5)
      setOptions(allOptions)
      questionStartRef.current = Date.now()
      // Focus first option
      setTimeout(() => optionRefs.current[0]?.focus(), 100)
    }
  }, [elements, gameState.currentIndex])

  // Start game
  const startGame = useCallback(() => {
    setGameState({
      phase: 'playing',
      currentIndex: 0,
      score: 0,
      streak: 0,
      maxStreak: 0,
      startTime: Date.now(),
      elapsed: 0,
      answers: [],
    })
  }, [])

  // Handle answer selection
  const handleAnswer = useCallback((answerId: string) => {
    if (selectedAnswer !== null || gameState.phase !== 'playing') return

    const current = elements[gameState.currentIndex]
    const correct = answerId === current.id
    const timeMs = Date.now() - questionStartRef.current

    setSelectedAnswer(answerId)
    setIsCorrect(correct)
    setAnnouncement(correct ? `Correct! It was ${current.name}.` : `Incorrect. The answer was ${current.name}.`)

    // Play sound
    if (soundEnabled) {
      const audio = new Audio(correct ? '/sounds/correct.mp3' : '/sounds/wrong.mp3')
      audio.volume = 0.3
      audio.play().catch(() => {}) // Ignore audio errors
    }

    // Calculate streak for SRS quality
    const newStreak = correct ? gameState.streak + 1 : 0

    // Record to spaced repetition system (must be outside setState callback)
    const quality = gameResultToQuality(correct, timeMs, newStreak)
    recordReview(current.id, { quality })

    // Update state
    setGameState(prev => {
      return {
        ...prev,
        score: prev.score + (correct ? 100 + (prev.streak * 10) : 0),
        streak: correct ? prev.streak + 1 : 0,
        maxStreak: Math.max(prev.maxStreak, correct ? prev.streak + 1 : 0),
        answers: [...prev.answers, { elementId: current.id, correct, timeMs }],
      }
    })

    // Move to next question after delay
    setTimeout(() => {
      setSelectedAnswer(null)
      setIsCorrect(null)

      if (gameState.currentIndex + 1 >= elements.length) {
        finishGame()
      } else {
        setGameState(prev => ({
          ...prev,
          currentIndex: prev.currentIndex + 1,
        }))
      }
    }, 1000)
  }, [selectedAnswer, gameState.phase, gameState.currentIndex, elements, soundEnabled])

  // Keyboard shortcuts for answers (1-4)
  useEffect(() => {
    if (gameState.phase !== 'playing' || selectedAnswer !== null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const keyNum = parseInt(e.key)
      if (keyNum >= 1 && keyNum <= 4 && options[keyNum - 1]) {
        handleAnswer(options[keyNum - 1].id)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState.phase, selectedAnswer, options, handleAnswer])

  // Finish game
  const finishGame = useCallback(async () => {
    const finalElapsed = Date.now() - gameState.startTime
    const beatPB = bestTime ? finalElapsed < bestTime : false

    setGameState(prev => ({
      ...prev,
      phase: 'results',
      elapsed: finalElapsed,
    }))

    // Save ghost data if this is a new best
    if (beatPB) {
      const newGhostData: GhostData[] = gameState.answers.map((a, i) => ({
        elementId: a.elementId,
        timestamp: gameState.answers.slice(0, i + 1).reduce((sum, ans) => sum + ans.timeMs, 0),
        correct: a.correct,
      }))

      localStorage.setItem('architecture-flashcard-best', JSON.stringify({
        time: finalElapsed,
        ghost: newGhostData,
      }))
      setBestTime(finalElapsed)
    }

    // Save game results to database
    try {
      const correctCount = gameState.answers.filter(a => a.correct).length
      const accuracy = (correctCount / gameState.answers.length) * 100
      const xp = gameState.score // Use score as XP

      await fetch('/api/architecture/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameMode: 'FLASHCARD',
          learningPath: config.shuffleMode.toUpperCase(),
          questionCount: elements.length,
          correctAnswers: correctCount,
          incorrectAnswers: gameState.answers.length - correctCount,
          totalTimeMs: finalElapsed,
          score: gameState.score,
          maxStreak: gameState.maxStreak,
          accuracy,
          xpEarned: xp,
          beatPersonalBest: beatPB,
          previousBestTime: bestTime,
          questionTimes: gameState.answers,
          periodFilters: [],
          regionFilters: [],
          categoryFilters: config.category ? [config.category] : [],
        }),
      })
    } catch (error) {
      console.error('Failed to save game results:', error)
      // Continue anyway - don't block the user
    }

    if (onComplete) {
      onComplete(gameState)
    }
  }, [gameState, bestTime, onComplete, config, elements.length])

  // Format time
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const tenths = Math.floor((ms % 1000) / 100)
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}.${tenths}`
  }

  // Current element
  const currentElement = elements[gameState.currentIndex]

  return (
    <div className="h-full bg-[var(--background)] flex flex-col overflow-hidden" role="application" aria-label="Architecture Flashcard Game">
      <LiveRegion message={announcement} />
      {/* Intro Phase */}
      <AnimatePresence mode="wait">
        {gameState.phase === 'intro' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center p-3 sm:p-4"
          >
            <Card className="max-w-2xl w-full border-2 border-[var(--border)]">
              <CardContent className="p-3 sm:p-4">
                <div className="text-center mb-3 sm:mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center"
                  >
                    <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </motion.div>

                  <h2 className="text-lg sm:text-xl font-black text-[var(--foreground)] mb-1">
                    Flashcard Match
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                    {showConfig ? 'Configure your game settings' : `Match ${config.elementCount} architectural elements with their images`}
                  </p>
                </div>

                {/* Quick Play Settings (when showConfig is true) */}
                {showConfig && (
                  <div className="space-y-3 sm:space-y-4 mb-3 sm:mb-4">
                    {/* Element Count */}
                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-[var(--muted-foreground)] mb-1.5 block">
                        Number of Elements
                      </label>
                      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                        {[
                          { count: 5, time: '~1 min' },
                          { count: 10, time: '~3 min' },
                          { count: 20, time: '~6 min' },
                          { count: 50, time: '~15 min' },
                        ].map((option) => (
                          <button
                            key={option.count}
                            onClick={() => setSelectedCount(option.count)}
                            className={`p-1.5 sm:p-2 rounded-lg border-2 transition-all text-center ${
                              selectedCount === option.count
                                ? 'border-amber-500 bg-amber-500/10'
                                : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                            }`}
                          >
                            <span className="font-bold text-xs sm:text-sm text-[var(--foreground)] block">{option.count}</span>
                            <span className="text-[0.625rem] text-[var(--muted-foreground)]">{option.time}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Learning Path */}
                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-[var(--muted-foreground)] mb-1.5 block">
                        Learning Path
                      </label>
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                        <button
                          onClick={() => setSelectedPath('random')}
                          className={`p-1.5 sm:p-2 rounded-lg border-2 transition-all ${
                            selectedPath === 'random'
                              ? 'border-teal-500 bg-teal-500/10'
                              : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                          }`}
                        >
                          <Shuffle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto mb-0.5 text-teal-500" />
                          <span className="font-bold text-[0.625rem] sm:text-xs text-[var(--foreground)] block">Random</span>
                        </button>
                        <button
                          onClick={() => setSelectedPath('timeline')}
                          className={`p-1.5 sm:p-2 rounded-lg border-2 transition-all ${
                            selectedPath === 'timeline'
                              ? 'border-amber-500 bg-amber-500/10'
                              : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto mb-0.5 text-amber-500" />
                          <span className="font-bold text-[0.625rem] sm:text-xs text-[var(--foreground)] block">Timeline</span>
                        </button>
                        <button
                          onClick={() => setSelectedPath('category')}
                          className={`p-1.5 sm:p-2 rounded-lg border-2 transition-all ${
                            selectedPath === 'category'
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                          }`}
                        >
                          <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto mb-0.5 text-purple-500" />
                          <span className="font-bold text-[0.625rem] sm:text-xs text-[var(--foreground)] block">Category</span>
                        </button>
                      </div>
                    </div>

                    {/* Category Selection */}
                    {selectedPath === 'category' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                      >
                        <label className="text-xs sm:text-sm font-semibold text-[var(--muted-foreground)] mb-1.5 block">
                          Select Category
                        </label>
                        <div className="max-h-[200px] sm:max-h-[240px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[var(--muted-foreground)]/30 scrollbar-track-transparent">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
                            {Object.values(CATEGORIES).map((category) => (
                              <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`p-1.5 sm:p-2 rounded-lg border-2 transition-all text-left ${
                                  selectedCategory === category.id
                                    ? 'border-purple-500 bg-purple-500/10'
                                    : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                                }`}
                              >
                                <span className="font-bold text-xs sm:text-sm text-[var(--foreground)] block">{category.name}</span>
                                <span className="text-[0.625rem] text-[var(--muted-foreground)]">
                                  {ALL_ELEMENTS.filter(e => e.category === category.id).length} elements
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Ghost Racing Info */}
                {!showConfig && config.enableGhost && bestTime && (
                  <div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-xl bg-purple-500/10 border border-purple-500/30">
                    <div className="flex items-center justify-center gap-1.5 text-purple-500 mb-0.5">
                      <Ghost className="w-4 h-4" />
                      <span className="font-bold text-sm">Ghost Mode Active</span>
                    </div>
                    <p className="text-xs text-[var(--muted-foreground)] text-center">
                      Beat your best time: <span className="font-mono font-bold">{formatTime(bestTime)}</span>
                    </p>
                  </div>
                )}

                <div className="space-y-1.5 sm:space-y-2">
                  <Button
                    onClick={startGame}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-2.5 sm:py-3 text-sm sm:text-base"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Game
                  </Button>

                  {onExit && (
                    <Button
                      onClick={onExit}
                      variant="outline"
                      className="w-full text-sm"
                    >
                      <Home className="w-3.5 h-3.5 mr-2" />
                      Back to Menu
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Playing Phase */}
        {gameState.phase === 'playing' && currentElement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            {/* Header - Viewport-Aware Typography */}
            <div className="flex-shrink-0 bg-[var(--background)]/95 backdrop-blur border-b border-[var(--border)] px-[clamp(0.5rem,2vw,1rem)] py-[clamp(0.25rem,1vh,0.75rem)]">
              <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
                {/* Progress */}
                <div className="flex items-center justify-between mb-[clamp(0.25rem,0.5vh,0.5rem)]">
                  <div className="flex items-center gap-[clamp(0.375rem,1vw,0.75rem)]">
                    {onExit && (
                      <Button
                        onClick={onExit}
                        variant="ghost"
                        size="sm"
                        className="py-1 h-auto"
                        style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)' }}
                      >
                        <Home className="mr-1" style={{ width: 'clamp(0.625rem, 2vw, 0.875rem)', height: 'clamp(0.625rem, 2vw, 0.875rem)' }} />
                        <span className="hidden sm:inline">Quit</span>
                      </Button>
                    )}
                    <span className="font-bold text-[var(--foreground)]" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
                      {gameState.currentIndex + 1}/{elements.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-[clamp(0.25rem,1vw,0.5rem)]">
                    <span className="font-mono font-bold text-[var(--foreground)]" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
                      {formatTime(gameState.elapsed)}
                    </span>
                    <button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className="p-1 rounded-full hover:bg-[var(--muted)]"
                    >
                      {soundEnabled ?
                        <Volume2 style={{ width: 'clamp(0.625rem, 2vw, 0.875rem)', height: 'clamp(0.625rem, 2vw, 0.875rem)' }} /> :
                        <VolumeX style={{ width: 'clamp(0.625rem, 2vw, 0.875rem)', height: 'clamp(0.625rem, 2vw, 0.875rem)' }} />
                      }
                    </button>
                  </div>
                </div>

                {/* Progress Bars - Proportional Height */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.125rem, 0.3vh, 0.25rem)' }}>
                  <div className="bg-[var(--muted)] rounded-full overflow-hidden" style={{ height: 'clamp(0.25rem, 0.8vh, 0.375rem)' }}>
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((gameState.currentIndex) / elements.length) * 100}%` }}
                    />
                  </div>
                  {config.enableGhost && bestTime && (
                    <div className="bg-[var(--muted)] rounded-full overflow-hidden" style={{ height: 'clamp(0.125rem, 0.5vh, 0.25rem)' }}>
                      <motion.div
                        className="h-full bg-purple-500/50 rounded-full"
                        animate={{ width: `${(ghostProgress / elements.length) * 100}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Score & Streak - Fluid Icons */}
                <div className="flex items-center justify-between" style={{ marginTop: 'clamp(0.25rem, 0.8vh, 0.5rem)' }}>
                  <div className="flex items-center" style={{ gap: 'clamp(0.25rem, 1vw, 0.5rem)' }}>
                    <Trophy className="text-amber-500" style={{ width: 'clamp(0.625rem, 2vw, 0.875rem)', height: 'clamp(0.625rem, 2vw, 0.875rem)' }} />
                    <span className="font-bold text-[var(--foreground)]" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>{gameState.score}</span>
                  </div>
                  {gameState.streak > 1 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1 rounded-full bg-amber-500/20"
                      style={{ padding: 'clamp(0.25rem, 0.5vh, 0.375rem) clamp(0.5rem, 1.5vw, 0.75rem)' }}
                    >
                      <Zap className="text-amber-500" style={{ width: 'clamp(0.625rem, 2vw, 0.875rem)', height: 'clamp(0.625rem, 2vw, 0.875rem)' }} />
                      <span className="font-bold text-amber-500" style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)' }}>{gameState.streak}x</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Question Area - 50/50 Split Layout */}
            <div
              className="flex-1 flex flex-col lg:flex-row justify-center items-center lg:items-stretch max-w-lg md:max-w-2xl lg:max-w-6xl mx-auto w-full overflow-hidden min-h-0"
              style={{
                padding: 'clamp(0.5rem, 2vh, 1rem)',
                gap: 'clamp(1rem, 2vw, 1.5rem)'
              }}
            >
              {/* LEFT HALF - Image Container */}
              <div className="flex-shrink-0 lg:flex-1 flex items-center justify-center">
                <motion.div
                  key={currentElement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full flex items-center justify-center"
                >
                  <div
                    className="relative rounded-lg overflow-hidden bg-gradient-to-br from-[var(--muted)] to-[var(--background)] border-2 border-[var(--border)]"
                    style={{
                      width: 'min(clamp(120px, 45vw, 600px), clamp(28vh, 50vh, 65vh))',
                      height: 'min(clamp(120px, 45vw, 600px), clamp(28vh, 50vh, 65vh))',
                      aspectRatio: '1 / 1'
                    }}
                  >
                  {/* SVG Illustration */}
                  <div className="absolute inset-0 flex items-center justify-center" style={{ padding: 'clamp(0.5rem, 2%, 0.75rem)' }}>
                    <ArchitectureSVG
                      category={currentElement.category}
                      elementId={currentElement.id}
                      className="w-full h-full"
                      showHalo={false}
                    />
                  </div>

                  {/* Category Badge - Proportional to Image */}
                  <div
                    className="absolute rounded-full bg-[var(--background)]/80 backdrop-blur font-medium text-[var(--muted-foreground)]"
                    style={{
                      top: 'clamp(0.25rem, 2%, 0.375rem)',
                      left: 'clamp(0.25rem, 2%, 0.375rem)',
                      padding: 'clamp(0.125rem, 1%, 0.25rem) clamp(0.375rem, 2%, 0.5rem)',
                      fontSize: 'clamp(0.5rem, 1.5vw, 0.625rem)'
                    }}
                  >
                    {currentElement.category}
                  </div>

                  {/* Feedback Overlay - Intelligent Icon Sizing */}
                  <AnimatePresence>
                    {isCorrect !== null && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute inset-0 flex items-center justify-center ${
                          isCorrect ? 'bg-green-500/30' : 'bg-red-500/30'
                        }`}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`rounded-full flex items-center justify-center ${
                            isCorrect ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{
                            width: 'min(5rem, 40%)',
                            height: 'min(5rem, 40%)',
                            aspectRatio: '1 / 1'
                          }}
                        >
                          {isCorrect ? (
                            <Check className="text-white" style={{ width: '50%', height: '50%' }} />
                          ) : (
                            <X className="text-white" style={{ width: '50%', height: '50%' }} />
                          )}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* RIGHT HALF - Buttons Container */}
            <div className="w-full lg:flex-1 flex items-center justify-center">
              {/* Answer Options - Vertically Distributed */}
              <div
                className="w-full grid grid-cols-2 lg:grid-cols-1 lg:flex lg:flex-col lg:justify-between flex-shrink-0 max-w-md lg:max-w-full lg:h-full lg:py-4"
                style={{ gap: 'clamp(0.375rem, 1vh, 0.75rem)' }}
              >
                {options.map((option, index) => {
                  const isSelected = selectedAnswer === option.id
                  const isCorrectAnswer = option.id === currentElement.id
                  const showResult = selectedAnswer !== null

                  let buttonClass = 'border-[var(--border)] hover:border-[var(--primary)] bg-[var(--card)]'
                  if (showResult) {
                    if (isCorrectAnswer) {
                      buttonClass = 'border-green-500 bg-green-500/10'
                    } else if (isSelected && !isCorrectAnswer) {
                      buttonClass = 'border-red-500 bg-red-500/10'
                    }
                  }

                  return (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswer(option.id)}
                      disabled={selectedAnswer !== null}
                      className={`rounded-md border-2 transition-all lg:flex-1 lg:flex lg:items-center lg:justify-center ${buttonClass} ${
                        selectedAnswer === null ? 'active:scale-95 hover:scale-[1.02]' : ''
                      }`}
                      style={{
                        padding: 'clamp(0.375rem, 1vh, 0.5rem)',
                        minHeight: 'clamp(2rem, 4vh, 2.5rem)'
                      }}
                    >
                      <span
                        className="font-bold text-[var(--foreground)] leading-tight block"
                        style={{ fontSize: 'clamp(0.625rem, 1.75vw, 0.75rem)' }}
                      >
                        {option.name}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
            </div>
          </motion.div>
        )}

        {/* Results Phase */}
        {gameState.phase === 'results' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center p-3 sm:p-4"
          >
            <Card className="max-w-md w-full border-2 border-[var(--border)]">
              <CardContent className="p-4 sm:p-5 text-center">
                {/* Trophy animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center"
                >
                  <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </motion.div>

                <h2 className="text-xl sm:text-2xl font-black text-[var(--foreground)] mb-1 sm:mb-2">
                  Game Complete!
                </h2>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 my-3 sm:my-4">
                  <div className="p-2 sm:p-3 rounded-xl bg-[var(--muted)]">
                    <p className="text-2xl font-mono font-bold text-[var(--foreground)]">
                      {formatTime(gameState.elapsed)}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Time</p>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl bg-[var(--muted)]">
                    <p className="text-2xl font-bold text-[var(--foreground)]">
                      {gameState.score}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Score</p>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl bg-[var(--muted)]">
                    <p className="text-2xl font-bold text-[var(--foreground)]">
                      {gameState.answers.filter(a => a.correct).length}/{elements.length}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Correct</p>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl bg-[var(--muted)]">
                    <p className="text-2xl font-bold text-[var(--foreground)]">
                      {gameState.maxStreak}x
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Best Streak</p>
                  </div>
                </div>

                {/* New Record */}
                {bestTime && gameState.elapsed < bestTime && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-xl bg-amber-500/20 border border-amber-500/30"
                  >
                    <div className="flex items-center justify-center gap-2 text-amber-500 mb-1">
                      <Flag className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base font-bold">NEW PERSONAL BEST!</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                      You beat your previous time by{' '}
                      <span className="font-mono font-bold text-amber-500">
                        {formatTime(bestTime - gameState.elapsed)}
                      </span>
                    </p>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="space-y-2">
                  <Button
                    onClick={startGame}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Play Again
                  </Button>

                  {onExit && (
                    <Button
                      onClick={onExit}
                      variant="outline"
                      className="w-full"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Back to Menu
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FlashcardGame
