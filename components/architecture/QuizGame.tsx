'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Timer, Trophy, Zap, RotateCcw, Home, Volume2, VolumeX,
  Check, X, Ghost, Flag, Play, HelpCircle, Lightbulb,
  BookOpen, Clock, Target, Award
} from 'lucide-react'
import type { ArchitecturalElement, LearningLevel } from '@/data/architecture/types'
import { ALL_ELEMENTS, getRandomElements } from '@/data/architecture/elements'
import { ArchitectureSVG } from './ArchitectureSVG'

// Question types
type QuestionType = 'definition' | 'image_identify' | 'era_match' | 'true_false' | 'fill_blank'

interface QuizQuestion {
  id: string
  type: QuestionType
  element: ArchitecturalElement
  questionText: string
  options: string[]
  correctAnswer: string
  hint?: string
  explanation: string
  points: number
  difficulty: 'easy' | 'medium' | 'hard'
}

interface QuizConfig {
  questionCount: number
  learningLevel: LearningLevel
  enableHints: boolean
  enableGhost: boolean
  questionTypes: QuestionType[]
  timeLimit?: number // seconds per question, undefined = no limit
  category?: string
}

interface GhostData {
  questionId: string
  timestamp: number
  correct: boolean
}

interface QuizState {
  phase: 'intro' | 'playing' | 'paused' | 'results'
  currentIndex: number
  score: number
  streak: number
  maxStreak: number
  startTime: number
  elapsed: number
  hintsUsed: number
  answers: { questionId: string; correct: boolean; timeMs: number; hintUsed: boolean }[]
}

interface QuizGameProps {
  config?: Partial<QuizConfig>
  onComplete?: (results: QuizResults) => void
  onExit?: () => void
}

interface QuizResults {
  score: number
  totalQuestions: number
  accuracy: number
  totalTime: number
  streak: number
  hintsUsed: number
}

const DEFAULT_CONFIG: QuizConfig = {
  questionCount: 10,
  learningLevel: 'HIGH_SCHOOL',
  enableHints: true,
  enableGhost: true,
  questionTypes: ['definition', 'image_identify', 'era_match', 'true_false'],
}

// Generate quiz questions from elements
function generateQuestions(
  elements: ArchitecturalElement[],
  types: QuestionType[],
  allElements: ArchitecturalElement[]
): QuizQuestion[] {
  return elements.map((element, index) => {
    const type = types[index % types.length]
    const difficulty = index < elements.length / 3 ? 'easy' :
                       index < (elements.length * 2) / 3 ? 'medium' : 'hard'
    const basePoints = difficulty === 'easy' ? 50 : difficulty === 'medium' ? 75 : 100

    switch (type) {
      case 'definition': {
        // Get wrong options from other elements
        const wrongElements = allElements
          .filter(e => e.id !== element.id && e.category === element.category)
          .slice(0, 3)
        if (wrongElements.length < 3) {
          wrongElements.push(...allElements.filter(e => e.id !== element.id).slice(0, 3 - wrongElements.length))
        }
        const options = [element.name, ...wrongElements.map(e => e.name)]
          .sort(() => Math.random() - 0.5)

        return {
          id: `q-${index}-${element.id}`,
          type,
          element,
          questionText: element.description.HIGH_SCHOOL.split('.')[0] + '.',
          options,
          correctAnswer: element.name,
          hint: `This is a type of ${element.category.toLowerCase()}`,
          explanation: element.description.HIGH_SCHOOL,
          points: basePoints,
          difficulty,
        }
      }

      case 'image_identify': {
        const wrongElements = allElements
          .filter(e => e.id !== element.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
        const options = [element.name, ...wrongElements.map(e => e.name)]
          .sort(() => Math.random() - 0.5)

        return {
          id: `q-${index}-${element.id}`,
          type,
          element,
          questionText: 'Identify this architectural element:',
          options,
          correctAnswer: element.name,
          hint: `It belongs to the ${element.category} category`,
          explanation: element.description.HIGH_SCHOOL,
          points: basePoints,
          difficulty,
        }
      }

      case 'era_match': {
        const period = element.periods?.[0] || 'Classical'
        const wrongPeriods = ['Gothic', 'Renaissance', 'Baroque', 'Neoclassical', 'Victorian', 'Art Deco', 'Modern']
          .filter(p => p !== period)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
        const options = [period, ...wrongPeriods].sort(() => Math.random() - 0.5)

        return {
          id: `q-${index}-${element.id}`,
          type,
          element,
          questionText: `Which historical period is most associated with the "${element.name}"?`,
          options,
          correctAnswer: period,
          hint: `Think about when ${element.category.toLowerCase()}s like this were most popular`,
          explanation: `The ${element.name} is most associated with the ${period} period. ${element.description.HIGH_SCHOOL}`,
          points: basePoints + 25, // Era questions are harder
          difficulty,
        }
      }

      case 'true_false': {
        const isTrue = Math.random() > 0.5
        const correctCategory = element.category
        const wrongCategory = allElements.find(e => e.category !== correctCategory)?.category || 'Decorative'
        const displayCategory = isTrue ? correctCategory : wrongCategory

        return {
          id: `q-${index}-${element.id}`,
          type,
          element,
          questionText: `True or False: The "${element.name}" is classified as a ${displayCategory.toLowerCase()} element.`,
          options: ['True', 'False'],
          correctAnswer: isTrue ? 'True' : 'False',
          hint: `Consider what category ${element.name} would logically fall under`,
          explanation: `The ${element.name} is classified as a ${correctCategory} element. ${element.description.HIGH_SCHOOL}`,
          points: basePoints - 10, // True/false are easier
          difficulty,
        }
      }

      case 'fill_blank': {
        const sentence = element.description.HIGH_SCHOOL.split('.')[0]
        const wordToRemove = element.name
        const blankedSentence = sentence.replace(
          new RegExp(wordToRemove, 'gi'),
          '_____'
        )

        return {
          id: `q-${index}-${element.id}`,
          type,
          element,
          questionText: `Fill in the blank: ${blankedSentence}`,
          options: [], // Fill-blank uses text input
          correctAnswer: element.name.toLowerCase(),
          hint: `It's a type of ${element.category.toLowerCase()}`,
          explanation: element.description.HIGH_SCHOOL,
          points: basePoints + 50, // Fill-blank is hardest
          difficulty,
        }
      }

      default:
        return null as never
    }
  })
}

export function QuizGame({ config: userConfig, onComplete, onExit }: QuizGameProps) {
  const config = { ...DEFAULT_CONFIG, ...userConfig }

  // Quiz state
  const [quizState, setQuizState] = useState<QuizState>({
    phase: 'intro',
    currentIndex: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    startTime: 0,
    elapsed: 0,
    hintsUsed: 0,
    answers: [],
  })

  // Questions
  const [questions, setQuestions] = useState<QuizQuestion[]>([])

  // UI state
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [fillBlankInput, setFillBlankInput] = useState('')
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Ghost race data (best previous run)
  const [ghostData, setGhostData] = useState<GhostData[]>([])
  const [ghostPosition, setGhostPosition] = useState(0)

  // Initialize quiz
  const startQuiz = useCallback(() => {
    const elements = config.category
      ? ALL_ELEMENTS.filter(e => e.category === config.category)
      : ALL_ELEMENTS

    const selectedElements = getRandomElements(config.questionCount)
    const generatedQuestions = generateQuestions(
      selectedElements,
      config.questionTypes,
      elements
    )

    setQuestions(generatedQuestions)
    setQuizState({
      phase: 'playing',
      currentIndex: 0,
      score: 0,
      streak: 0,
      maxStreak: 0,
      startTime: Date.now(),
      elapsed: 0,
      hintsUsed: 0,
      answers: [],
    })
    setSelectedAnswer(null)
    setShowResult(false)
    setShowHint(false)
    setFillBlankInput('')

    // Load ghost data from localStorage
    if (config.enableGhost) {
      const saved = localStorage.getItem('quiz-ghost-data')
      if (saved) {
        setGhostData(JSON.parse(saved))
      }
    }
  }, [config])

  // Timer effect
  useEffect(() => {
    if (quizState.phase === 'playing' && !showResult) {
      timerRef.current = setInterval(() => {
        setQuizState(prev => ({
          ...prev,
          elapsed: Date.now() - prev.startTime,
        }))
      }, 100)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [quizState.phase, showResult])

  // Handle answer selection
  const handleAnswer = useCallback((answer: string) => {
    if (showResult || !questions[quizState.currentIndex]) return

    setSelectedAnswer(answer)
    setShowResult(true)

    const currentQuestion = questions[quizState.currentIndex]
    const isCorrect = answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()
    const timeMs = Date.now() - quizState.startTime -
      quizState.answers.reduce((acc, a) => acc + a.timeMs, 0)

    const newStreak = isCorrect ? quizState.streak + 1 : 0
    const streakBonus = isCorrect && quizState.streak >= 3 ? Math.floor(quizState.streak * 10) : 0
    const hintPenalty = showHint ? Math.floor(currentQuestion.points * 0.3) : 0
    const pointsEarned = isCorrect ? currentQuestion.points + streakBonus - hintPenalty : 0

    setQuizState(prev => ({
      ...prev,
      score: prev.score + pointsEarned,
      streak: newStreak,
      maxStreak: Math.max(prev.maxStreak, newStreak),
      answers: [...prev.answers, {
        questionId: currentQuestion.id,
        correct: isCorrect,
        timeMs,
        hintUsed: showHint,
      }],
    }))

    // Play sound effect
    if (soundEnabled) {
      // Sound effects would go here
    }
  }, [showResult, questions, quizState, showHint, soundEnabled])

  // Move to next question
  const nextQuestion = useCallback(() => {
    if (quizState.currentIndex >= questions.length - 1) {
      // Quiz complete
      setQuizState(prev => ({ ...prev, phase: 'results' }))

      // Save ghost data
      if (config.enableGhost) {
        const newGhostData = quizState.answers.map((a, i) => ({
          questionId: questions[i].id,
          timestamp: a.timeMs,
          correct: a.correct,
        }))
        localStorage.setItem('quiz-ghost-data', JSON.stringify(newGhostData))
      }

      // Call completion handler
      if (onComplete) {
        onComplete({
          score: quizState.score,
          totalQuestions: questions.length,
          accuracy: quizState.answers.filter(a => a.correct).length / questions.length,
          totalTime: quizState.elapsed,
          streak: quizState.maxStreak,
          hintsUsed: quizState.hintsUsed,
        })
      }
    } else {
      setQuizState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
      }))
      setSelectedAnswer(null)
      setShowResult(false)
      setShowHint(false)
      setFillBlankInput('')
    }
  }, [quizState, questions, config.enableGhost, onComplete])

  // Use hint
  const useHint = useCallback(() => {
    if (!showHint && config.enableHints) {
      setShowHint(true)
      setQuizState(prev => ({
        ...prev,
        hintsUsed: prev.hintsUsed + 1,
      }))
    }
  }, [showHint, config.enableHints])

  // Current question
  const currentQuestion = questions[quizState.currentIndex]

  // Format time
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Render intro screen
  if (quizState.phase === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--muted)]/20 to-[var(--background)] p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-[var(--card)]/90 backdrop-blur-sm border-[var(--border)] shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg">
                  <BookOpen className="w-10 h-10" />
                </div>

                <h1 className="text-3xl font-black text-[var(--foreground)]">
                  Architecture Quiz
                </h1>

                <p className="text-[var(--muted-foreground)]">
                  Test your knowledge of architectural elements across history!
                </p>

                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="bg-[var(--muted)]/50 rounded-lg p-4 text-center">
                    <Target className="w-6 h-6 mx-auto mb-2 text-teal-500" />
                    <div className="text-2xl font-bold text-[var(--foreground)]">
                      {config.questionCount}
                    </div>
                    <div className="text-sm text-[var(--muted-foreground)]">Questions</div>
                  </div>
                  <div className="bg-[var(--muted)]/50 rounded-lg p-4 text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-amber-500" />
                    <div className="text-2xl font-bold text-[var(--foreground)]">
                      {config.timeLimit ? `${config.timeLimit}s` : '∞'}
                    </div>
                    <div className="text-sm text-[var(--muted-foreground)]">Per Question</div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={startQuiz}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-4 text-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Quiz
                  </Button>

                  {onExit && (
                    <Button
                      variant="ghost"
                      onClick={onExit}
                      className="w-full text-[var(--muted-foreground)]"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Back to Menu
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  // Render results screen
  if (quizState.phase === 'results') {
    const accuracy = quizState.answers.filter(a => a.correct).length / questions.length
    const grade = accuracy >= 0.9 ? 'A' : accuracy >= 0.8 ? 'B' : accuracy >= 0.7 ? 'C' : accuracy >= 0.6 ? 'D' : 'F'

    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--muted)]/20 to-[var(--background)] p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-[var(--card)]/90 backdrop-blur-sm border-[var(--border)] shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg"
                >
                  <Trophy className="w-12 h-12" />
                </motion.div>

                <h1 className="text-3xl font-black text-[var(--foreground)]">
                  Quiz Complete!
                </h1>

                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">
                  {quizState.score}
                </div>
                <p className="text-[var(--muted-foreground)]">Total Points</p>

                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="bg-[var(--muted)]/50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-500">{grade}</div>
                    <div className="text-sm text-[var(--muted-foreground)]">Grade</div>
                  </div>
                  <div className="bg-[var(--muted)]/50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-[var(--foreground)]">
                      {Math.round(accuracy * 100)}%
                    </div>
                    <div className="text-sm text-[var(--muted-foreground)]">Accuracy</div>
                  </div>
                  <div className="bg-[var(--muted)]/50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-amber-500">
                      {quizState.maxStreak}
                    </div>
                    <div className="text-sm text-[var(--muted-foreground)]">Best Streak</div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={startQuiz}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Play Again
                  </Button>

                  {onExit && (
                    <Button
                      variant="ghost"
                      onClick={onExit}
                      className="w-full text-[var(--muted-foreground)]"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Back to Menu
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  // Render playing screen
  if (!currentQuestion) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--muted)]/20 to-[var(--background)] p-4 md:p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[var(--card)] rounded-full px-4 py-2 shadow-md">
              <Timer className="w-4 h-4 text-[var(--muted-foreground)]" />
              <span className="font-mono font-bold text-[var(--foreground)]">
                {formatTime(quizState.elapsed)}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[var(--card)] rounded-full px-4 py-2 shadow-md">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="font-bold text-[var(--foreground)]">{quizState.score}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {quizState.streak >= 3 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full px-3 py-1"
              >
                <Zap className="w-4 h-4" />
                <span className="font-bold">{quizState.streak}x</span>
              </motion.div>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 bg-[var(--muted)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-500 to-cyan-600"
            initial={{ width: 0 }}
            animate={{ width: `${((quizState.currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="mt-1 text-sm text-[var(--muted-foreground)] text-center">
          Question {quizState.currentIndex + 1} of {questions.length}
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="bg-[var(--card)]/90 backdrop-blur-sm border-[var(--border)] shadow-2xl">
          <CardContent className="p-6 md:p-8">
            {/* Question type badge */}
            <div className="flex items-center justify-between mb-6">
              <span className={`
                px-3 py-1 rounded-full text-xs font-bold uppercase
                ${currentQuestion.difficulty === 'easy' ? 'bg-green-500/20 text-green-500' :
                  currentQuestion.difficulty === 'medium' ? 'bg-amber-500/20 text-amber-500' :
                  'bg-red-500/20 text-red-500'}
              `}>
                {currentQuestion.difficulty}
              </span>
              <span className="text-sm text-[var(--muted-foreground)]">
                +{currentQuestion.points} pts
              </span>
            </div>

            {/* Image for image_identify questions */}
            {currentQuestion.type === 'image_identify' && (
              <div className="mb-6 flex justify-center">
                <div className="w-48 h-48 bg-[var(--muted)]/50 rounded-xl p-4 flex items-center justify-center">
                  <ArchitectureSVG
                    category={currentQuestion.element.category}
                    elementId={currentQuestion.element.id}
                    size={160}
                    showHalo={showResult && selectedAnswer === currentQuestion.correctAnswer}
                  />
                </div>
              </div>
            )}

            {/* Question text */}
            <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-6 text-center">
              {currentQuestion.questionText}
            </h2>

            {/* Hint */}
            <AnimatePresence>
              {showHint && currentQuestion.hint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 bg-amber-500/10 border border-amber-500/30 rounded-lg p-4"
                >
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-amber-700 dark:text-amber-300">{currentQuestion.hint}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Options */}
            {currentQuestion.type === 'fill_blank' ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={fillBlankInput}
                  onChange={(e) => setFillBlankInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnswer(fillBlankInput)}
                  disabled={showResult}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--muted)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Type your answer..."
                />
                {!showResult && (
                  <Button
                    onClick={() => handleAnswer(fillBlankInput)}
                    disabled={!fillBlankInput.trim()}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600"
                  >
                    Submit Answer
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentQuestion.options.map((option, i) => {
                  const isSelected = selectedAnswer === option
                  const isCorrect = option === currentQuestion.correctAnswer
                  const showCorrectness = showResult

                  return (
                    <motion.button
                      key={option}
                      whileHover={!showResult ? { scale: 1.02 } : {}}
                      whileTap={!showResult ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswer(option)}
                      disabled={showResult}
                      className={`
                        relative p-4 rounded-xl text-left font-medium transition-all
                        ${showCorrectness && isCorrect
                          ? 'bg-green-500/20 border-2 border-green-500 text-green-700 dark:text-green-300'
                          : showCorrectness && isSelected && !isCorrect
                          ? 'bg-red-500/20 border-2 border-red-500 text-red-700 dark:text-red-300'
                          : isSelected
                          ? 'bg-teal-500/20 border-2 border-teal-500'
                          : 'bg-[var(--muted)]/50 border-2 border-transparent hover:border-[var(--border)]'
                        }
                        text-[var(--foreground)]
                      `}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[var(--muted)] flex items-center justify-center text-sm font-bold">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {option}
                      </span>

                      {showCorrectness && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2">
                          {isCorrect ? (
                            <Check className="w-6 h-6 text-green-500" />
                          ) : isSelected ? (
                            <X className="w-6 h-6 text-red-500" />
                          ) : null}
                        </span>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            )}

            {/* Result explanation */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-4"
                >
                  <div className={`
                    p-4 rounded-lg
                    ${selectedAnswer?.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()
                      ? 'bg-green-500/10 border border-green-500/30'
                      : 'bg-red-500/10 border border-red-500/30'
                    }
                  `}>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {currentQuestion.explanation}
                    </p>
                  </div>

                  <Button
                    onClick={nextQuestion}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold"
                  >
                    {quizState.currentIndex >= questions.length - 1 ? 'See Results' : 'Next Question'}
                    <Flag className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hint button */}
            {!showResult && config.enableHints && currentQuestion.hint && !showHint && (
              <div className="mt-6 text-center">
                <Button
                  variant="ghost"
                  onClick={useHint}
                  className="text-amber-500 hover:text-amber-600"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Use Hint (-30% points)
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
