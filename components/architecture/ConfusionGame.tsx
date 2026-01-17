'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Timer, Trophy, Zap, ChevronRight, RotateCcw, Home,
  Check, X, Lightbulb, Brain, Play, ArrowRight, ArrowLeft
} from 'lucide-react'
import { ConfusedPair, getRandomConfusedPairs } from '@/data/architecture/confused-pairs'
import { ArchitectureSVG } from './ArchitectureSVG'

interface QuizQuestion {
  pair: ConfusedPair
  correctElement: 1 | 2 // Which element is the correct answer
  prompt: string
}

interface GameState {
  phase: 'intro' | 'learning' | 'quiz' | 'results'
  currentPairIndex: number
  currentQuestionIndex: number
  score: number
  streak: number
  maxStreak: number
  startTime: number
  elapsed: number
  answers: { correct: boolean; timeMs: number }[]
}

interface ConfusionGameProps {
  config?: {
    pairCount?: number
    questionsPerPair?: number
  }
  onComplete?: (results: GameState) => void
  onExit?: () => void
}

const DEFAULT_CONFIG = {
  pairCount: 5,
  questionsPerPair: 3,
}

export function ConfusionGame({ config: userConfig, onComplete, onExit }: ConfusionGameProps) {
  const config = { ...DEFAULT_CONFIG, ...userConfig }

  const [gameState, setGameState] = useState<GameState>({
    phase: 'intro',
    currentPairIndex: 0,
    currentQuestionIndex: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    startTime: 0,
    elapsed: 0,
    answers: [],
  })

  const [pairs, setPairs] = useState<ConfusedPair[]>([])
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<1 | 2 | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const questionStartRef = useRef<number>(0)

  // Generate pairs and questions
  useEffect(() => {
    const selectedPairs = getRandomConfusedPairs(config.pairCount)
    setPairs(selectedPairs)

    // Generate quiz questions for all pairs
    const allQuestions: QuizQuestion[] = []
    selectedPairs.forEach(pair => {
      for (let i = 0; i < config.questionsPerPair; i++) {
        const correctElement = Math.random() > 0.5 ? 1 : 2
        const prompts = [
          `Which element is ${correctElement === 1 ? pair.element1Name : pair.element2Name}?`,
          `Identify the ${correctElement === 1 ? pair.element1Name : pair.element2Name}`,
          `Select the ${correctElement === 1 ? pair.element1Name : pair.element2Name}`,
        ]
        allQuestions.push({
          pair,
          correctElement,
          prompt: prompts[i % prompts.length],
        })
      }
    })
    setQuestions(allQuestions)
  }, [config.pairCount, config.questionsPerPair])

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: 'learning',
      startTime: Date.now(),
    }))

    timerRef.current = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        elapsed: Date.now() - prev.startTime,
      }))
    }, 100)
  }, [])

  const startQuiz = useCallback(() => {
    setGameState(prev => ({ ...prev, phase: 'quiz' }))
    questionStartRef.current = Date.now()
  }, [])

  const handleAnswer = useCallback((answer: 1 | 2) => {
    if (selectedAnswer !== null || !questions[gameState.currentQuestionIndex]) return

    setSelectedAnswer(answer)
    const question = questions[gameState.currentQuestionIndex]
    const correct = answer === question.correctElement
    const timeMs = Date.now() - questionStartRef.current

    setShowFeedback(true)

    // Update score and streak
    setGameState(prev => ({
      ...prev,
      score: correct ? prev.score + 100 + (prev.streak * 10) : prev.score,
      streak: correct ? prev.streak + 1 : 0,
      maxStreak: correct ? Math.max(prev.maxStreak, prev.streak + 1) : prev.maxStreak,
      answers: [...prev.answers, { correct, timeMs }],
    }))

    // Move to next question or end game
    setTimeout(() => {
      setShowFeedback(false)
      setSelectedAnswer(null)

      if (gameState.currentQuestionIndex + 1 >= questions.length) {
        // Game complete
        if (timerRef.current) clearInterval(timerRef.current)
        setGameState(prev => ({ ...prev, phase: 'results' }))
        if (onComplete) {
          setTimeout(() => onComplete(gameState), 500)
        }
      } else {
        setGameState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
        }))
        questionStartRef.current = Date.now()
      }
    }, 1500)
  }, [gameState.currentQuestionIndex, questions, selectedAnswer, onComplete, gameState])

  const nextPair = useCallback(() => {
    if (gameState.currentPairIndex + 1 >= pairs.length) {
      startQuiz()
    } else {
      setGameState(prev => ({
        ...prev,
        currentPairIndex: prev.currentPairIndex + 1,
      }))
    }
  }, [gameState.currentPairIndex, pairs.length, startQuiz])

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const currentPair = pairs[gameState.currentPairIndex]
  const currentQuestion = questions[gameState.currentQuestionIndex]

  return (
    <div className="h-full bg-[var(--background)] flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Intro Phase */}
        {gameState.phase === 'intro' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center p-4"
          >
            <Card className="max-w-md w-full border-2 border-[var(--border)]">
              <CardContent className="p-6 text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center"
                >
                  <Brain className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-2xl font-black text-[var(--foreground)] mb-2">
                  Confusion Buster
                </h2>
                <p className="text-[var(--muted-foreground)] mb-6">
                  Learn to distinguish {config.pairCount} commonly confused element pairs with side-by-side comparisons
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={startGame}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-6 text-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Game
                  </Button>

                  {onExit && (
                    <Button onClick={onExit} variant="outline" className="w-full">
                      <Home className="w-4 h-4 mr-2" />
                      Back to Menu
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Learning Phase */}
        {gameState.phase === 'learning' && currentPair && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-[var(--background)]/95 backdrop-blur border-b border-[var(--border)] p-3">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[var(--foreground)]">
                    Learning Pair {gameState.currentPairIndex + 1}/{pairs.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-mono text-purple-500">
                      {formatTime(gameState.elapsed)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="max-w-5xl mx-auto space-y-4">
                {/* Title */}
                <div className="text-center">
                  <h2 className="text-2xl font-black text-[var(--foreground)] mb-2">
                    {currentPair.element1Name} vs {currentPair.element2Name}
                  </h2>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Learn the key differences
                  </p>
                </div>

                {/* Side-by-side comparison */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Element 1 */}
                  <Card className="border-2 border-purple-500">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-black text-purple-500 mb-3 text-center">
                        {currentPair.element1Name}
                      </h3>
                      <div className="aspect-square bg-gradient-to-br from-[var(--muted)] to-[var(--background)] rounded-xl flex items-center justify-center mb-3 p-6">
                        <ArchitectureSVG
                          category={currentPair.category}
                          elementId={currentPair.element1Id}
                          className="w-full h-full"
                          showHalo={false}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Element 2 */}
                  <Card className="border-2 border-indigo-500">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-black text-indigo-500 mb-3 text-center">
                        {currentPair.element2Name}
                      </h3>
                      <div className="aspect-square bg-gradient-to-br from-[var(--muted)] to-[var(--background)] rounded-xl flex items-center justify-center mb-3 p-6">
                        <ArchitectureSVG
                          category={currentPair.category}
                          elementId={currentPair.element2Id}
                          className="w-full h-full"
                          showHalo={false}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Key Differences */}
                <Card className="border-2 border-[var(--border)]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-amber-500" />
                      <h3 className="font-black text-[var(--foreground)]">Key Differences</h3>
                    </div>
                    <ul className="space-y-2">
                      {currentPair.keyDifferences.map((diff, idx) => (
                        <li key={idx} className="flex gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-[var(--foreground)]">{diff}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Memory Trick */}
                <Card className="border-2 border-amber-500 bg-amber-500/5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-5 h-5 text-amber-500" />
                      <h3 className="font-black text-amber-600">Memory Trick</h3>
                    </div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {currentPair.memoryTrick}
                    </p>
                  </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex gap-3">
                  {gameState.currentPairIndex > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => setGameState(prev => ({ ...prev, currentPairIndex: prev.currentPairIndex - 1 }))}
                      className="flex-1"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  <Button
                    onClick={nextPair}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold"
                  >
                    {gameState.currentPairIndex + 1 >= pairs.length ? 'Start Quiz' : 'Next Pair'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quiz Phase */}
        {gameState.phase === 'quiz' && currentQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-[var(--background)]/95 backdrop-blur border-b border-[var(--border)] p-3">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-[var(--foreground)]">
                    Question {gameState.currentQuestionIndex + 1}/{questions.length}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <Timer className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-mono text-purple-500">
                        {formatTime(gameState.elapsed)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-bold text-[var(--foreground)]">
                        {gameState.score}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all"
                    style={{ width: `${((gameState.currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
                {gameState.streak > 0 && (
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span className="text-xs font-bold text-amber-500">{gameState.streak}x streak!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Question */}
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <div className="max-w-3xl w-full">
                <h2 className="text-xl font-black text-[var(--foreground)] mb-6 text-center">
                  {currentQuestion.prompt}
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Option 1 */}
                  <motion.button
                    whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                    whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(1)}
                    disabled={selectedAnswer !== null}
                    className={`relative aspect-square rounded-2xl border-4 transition-all ${
                      selectedAnswer === null
                        ? 'border-[var(--border)] hover:border-purple-500'
                        : selectedAnswer === 1
                        ? currentQuestion.correctElement === 1
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-red-500 bg-red-500/10'
                        : currentQuestion.correctElement === 1
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-[var(--border)] opacity-50'
                    }`}
                  >
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex-1 flex items-center justify-center">
                        <ArchitectureSVG
                          category={currentQuestion.pair.category}
                          elementId={currentQuestion.pair.element1Id}
                          className="w-full h-full max-w-[200px]"
                          showHalo={false}
                        />
                      </div>
                      <h3 className="text-lg font-black text-[var(--foreground)] mt-4 text-center">
                        {currentQuestion.pair.element1Name}
                      </h3>
                    </div>

                    {showFeedback && selectedAnswer === 1 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                          currentQuestion.correctElement === 1 ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {currentQuestion.correctElement === 1 ? (
                            <Check className="w-10 h-10 text-white" />
                          ) : (
                            <X className="w-10 h-10 text-white" />
                          )}
                        </div>
                      </div>
                    )}
                  </motion.button>

                  {/* Option 2 */}
                  <motion.button
                    whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                    whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(2)}
                    disabled={selectedAnswer !== null}
                    className={`relative aspect-square rounded-2xl border-4 transition-all ${
                      selectedAnswer === null
                        ? 'border-[var(--border)] hover:border-indigo-500'
                        : selectedAnswer === 2
                        ? currentQuestion.correctElement === 2
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-red-500 bg-red-500/10'
                        : currentQuestion.correctElement === 2
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-[var(--border)] opacity-50'
                    }`}
                  >
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex-1 flex items-center justify-center">
                        <ArchitectureSVG
                          category={currentQuestion.pair.category}
                          elementId={currentQuestion.pair.element2Id}
                          className="w-full h-full max-w-[200px]"
                          showHalo={false}
                        />
                      </div>
                      <h3 className="text-lg font-black text-[var(--foreground)] mt-4 text-center">
                        {currentQuestion.pair.element2Name}
                      </h3>
                    </div>

                    {showFeedback && selectedAnswer === 2 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                          currentQuestion.correctElement === 2 ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {currentQuestion.correctElement === 2 ? (
                            <Check className="w-10 h-10 text-white" />
                          ) : (
                            <X className="w-10 h-10 text-white" />
                          )}
                        </div>
                      </div>
                    )}
                  </motion.button>
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
            className="flex-1 flex items-center justify-center p-4"
          >
            <Card className="max-w-md w-full border-2 border-[var(--border)]">
              <CardContent className="p-6 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                  className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center"
                >
                  <Trophy className="w-12 h-12 text-white" />
                </motion.div>

                <h2 className="text-2xl font-black text-[var(--foreground)] mb-2">
                  Quiz Complete!
                </h2>

                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="p-4 rounded-xl bg-[var(--muted)]">
                    <p className="text-2xl font-mono font-bold text-[var(--foreground)]">
                      {formatTime(gameState.elapsed)}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Time</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--muted)]">
                    <p className="text-2xl font-bold text-[var(--foreground)]">
                      {gameState.score}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Score</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--muted)]">
                    <p className="text-2xl font-bold text-[var(--foreground)]">
                      {gameState.answers.filter(a => a.correct).length}/{questions.length}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Correct</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--muted)]">
                    <p className="text-2xl font-bold text-[var(--foreground)]">
                      {gameState.maxStreak}x
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Best Streak</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={startGame}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Play Again
                  </Button>

                  {onExit && (
                    <Button onClick={onExit} variant="outline" className="w-full">
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
