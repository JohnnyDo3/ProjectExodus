'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Timer, Trophy, Zap, ChevronRight, RotateCcw, Home,
  Volume2, VolumeX, Check, X, Ghost, Flag, Pause, Play
} from 'lucide-react'
import type { ArchitecturalElement, LearningLevel } from '@/data/architecture/types'
import { ALL_ELEMENTS, getRandomElements } from '@/data/architecture/elements'
import { ArchitectureSVG } from './ArchitectureSVG'

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
}

const DEFAULT_CONFIG: GameConfig = {
  elementCount: 10,
  learningLevel: 'MIDDLE_SCHOOL',
  enableGhost: true,
  shuffleMode: 'random',
}

export function FlashcardGame({ config: userConfig, onComplete, onExit }: FlashcardGameProps) {
  const config = { ...DEFAULT_CONFIG, ...userConfig }

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

  // Timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null)
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
      const wrongOptions = getRandomElements(3, [current.id, ...elements.map(e => e.id)])
      const allOptions = [current, ...wrongOptions].sort(() => Math.random() - 0.5)
      setOptions(allOptions)
      questionStartRef.current = Date.now()
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

    // Play sound
    if (soundEnabled) {
      const audio = new Audio(correct ? '/sounds/correct.mp3' : '/sounds/wrong.mp3')
      audio.volume = 0.3
      audio.play().catch(() => {}) // Ignore audio errors
    }

    // Update state
    setGameState(prev => {
      const newStreak = correct ? prev.streak + 1 : 0
      return {
        ...prev,
        score: prev.score + (correct ? 100 + (prev.streak * 10) : 0),
        streak: newStreak,
        maxStreak: Math.max(prev.maxStreak, newStreak),
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

  // Finish game
  const finishGame = useCallback(() => {
    const finalElapsed = Date.now() - gameState.startTime

    setGameState(prev => ({
      ...prev,
      phase: 'results',
      elapsed: finalElapsed,
    }))

    // Save ghost data if this is a new best
    if (!bestTime || finalElapsed < bestTime) {
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

    if (onComplete) {
      onComplete(gameState)
    }
  }, [gameState, bestTime, onComplete])

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
    <div className="h-full bg-[var(--background)] flex flex-col overflow-hidden">
      {/* Intro Phase */}
      <AnimatePresence mode="wait">
        {gameState.phase === 'intro' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center p-3 sm:p-4"
          >
            <Card className="max-w-md w-full border-2 border-[var(--border)]">
              <CardContent className="p-4 sm:p-5 text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center"
                >
                  <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </motion.div>

                <h2 className="text-xl sm:text-2xl font-black text-[var(--foreground)] mb-1 sm:mb-2">
                  Flashcard Match
                </h2>
                <p className="text-sm sm:text-base text-[var(--muted-foreground)] mb-3 sm:mb-4">
                  Match {config.elementCount} architectural elements with their images
                </p>

                {/* Ghost Racing Info */}
                {config.enableGhost && bestTime && (
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                    <div className="flex items-center justify-center gap-2 text-purple-500 mb-1">
                      <Ghost className="w-5 h-5" />
                      <span className="font-bold">Ghost Mode Active</span>
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Beat your best time: <span className="font-mono font-bold">{formatTime(bestTime)}</span>
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Button
                    onClick={startGame}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-4 sm:py-5 text-base sm:text-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Game
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

        {/* Playing Phase */}
        {gameState.phase === 'playing' && currentElement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            {/* Header */}
            <div className="bg-[var(--background)]/95 backdrop-blur border-b border-[var(--border)] px-2 py-1">
              <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
                {/* Progress */}
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-2">
                    {onExit && (
                      <Button
                        onClick={onExit}
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                      >
                        <Home className="w-3 h-3 mr-1" />
                        Quit
                      </Button>
                    )}
                    <span className="text-xs sm:text-sm font-bold text-[var(--foreground)]">
                      {gameState.currentIndex + 1} / {elements.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-[var(--foreground)]">
                      {formatTime(gameState.elapsed)}
                    </span>
                    <button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className="p-0.5 rounded-full hover:bg-[var(--muted)]"
                    >
                      {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-0.5">
                  {/* Your progress */}
                  <div className="h-1 bg-[var(--muted)] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((gameState.currentIndex) / elements.length) * 100}%` }}
                    />
                  </div>

                  {/* Ghost progress */}
                  {config.enableGhost && bestTime && (
                    <div className="h-0.5 bg-[var(--muted)] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-purple-500/50 rounded-full"
                        animate={{ width: `${(ghostProgress / elements.length) * 100}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Score & Streak */}
                <div className="flex items-center justify-between mt-0.5">
                  <div className="flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-amber-500" />
                    <span className="font-bold text-xs text-[var(--foreground)]">{gameState.score}</span>
                  </div>
                  {gameState.streak > 1 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1 px-2 py-0.5 sm:py-1 rounded-full bg-amber-500/20"
                    >
                      <Zap className="w-3 h-3 text-amber-500" />
                      <span className="text-[10px] sm:text-xs font-bold text-amber-500">{gameState.streak}x streak!</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Question Area */}
            <div className="flex-1 flex flex-col p-1.5 sm:p-2 max-w-lg md:max-w-2xl mx-auto w-full overflow-hidden min-h-0">
              {/* Image */}
              <motion.div
                key={currentElement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex items-center justify-center mb-1 min-h-0"
              >
                <div className="relative w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-[var(--muted)] to-[var(--background)] border-2 border-[var(--border)]">
                  {/* SVG Illustration */}
                  <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-3">
                    <ArchitectureSVG
                      category={currentElement.category}
                      elementId={currentElement.id}
                      className="w-full h-full"
                      showHalo={false}
                    />
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-full bg-[var(--background)]/80 backdrop-blur text-[8px] font-medium text-[var(--muted-foreground)]">
                    {currentElement.category}
                  </div>

                  {/* Feedback overlay */}
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
                          className={`w-20 h-20 rounded-full flex items-center justify-center ${
                            isCorrect ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        >
                          {isCorrect ? (
                            <Check className="w-10 h-10 text-white" />
                          ) : (
                            <X className="w-10 h-10 text-white" />
                          )}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Answer Options */}
              <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
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
                      className={`p-1 sm:p-1.5 rounded-md border-2 transition-all ${buttonClass} ${
                        selectedAnswer === null ? 'active:scale-95 hover:scale-[1.02]' : ''
                      }`}
                    >
                      <span className="font-bold text-[10px] sm:text-[11px] text-[var(--foreground)] leading-tight block">
                        {option.name}
                      </span>
                    </motion.button>
                  )
                })}
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
