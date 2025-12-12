'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  ChevronLeft, ChevronRight, CheckCircle2, Circle,
  BookOpen, Trophy, Clock, Target, ArrowLeft, Play, Quote,
  MessageSquare, GraduationCap, Sparkles, Search, ExternalLink,
  Image as ImageIcon, ChevronDown, Star, Lightbulb, Award
} from 'lucide-react'
import Link from 'next/link'
import { sanitizeHtml } from '@/lib/utils/sanitize'
import { LevelSelector } from '@/components/learn/levels/LevelSelector'
import { ModuleDiscussions } from '@/components/learn/discussions/ModuleDiscussions'
import { LearningLevel, LEARNING_LEVELS } from '@/types/learning'
import { Module, CoreTopic } from '@/data/modules'

// Animated section wrapper
function AnimatedSection({
  children,
  delay = 0,
  direction = 'up'
}: {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : 0,
      x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

// Quote highlight component for scavenger hunt
function QuoteHighlight({
  quote,
  author,
  id,
  isFound,
  onFind
}: {
  quote: string
  author: string
  id: string
  isFound: boolean
  onFind: (id: string) => void
}) {
  return (
    <motion.blockquote
      className={`relative my-8 p-6 rounded-2xl border-l-4 transition-all duration-500 cursor-pointer ${
        isFound
          ? 'border-green-500 bg-green-500/10'
          : 'border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] hover:bg-[color-mix(in_srgb,var(--primary)_15%,var(--background))]'
      }`}
      onClick={() => onFind(id)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isFound && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
        >
          <CheckCircle2 className="w-5 h-5 text-white" />
        </motion.div>
      )}
      <div className="flex items-start gap-3">
        <Quote className="w-8 h-8 text-[var(--primary)] flex-shrink-0 mt-1" />
        <div>
          <p className="text-lg font-medium italic text-[var(--foreground)] leading-relaxed">
            "{quote}"
          </p>
          <p className="mt-2 text-sm font-bold text-theme-primary">— {author}</p>
        </div>
      </div>
      {!isFound && (
        <p className="text-xs text-theme-muted mt-3 flex items-center gap-1">
          <Search className="w-3 h-3" />
          Click to mark as found for quiz
        </p>
      )}
    </motion.blockquote>
  )
}

// Reference link component
function ReferenceLink({
  title,
  url,
  type,
  index
}: {
  title: string
  url: string
  type: string
  index: number
}) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-xl bg-[var(--muted)] hover:bg-[color-mix(in_srgb,var(--primary)_10%,var(--muted))] transition-colors group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="w-8 h-8 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm">
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[var(--foreground)] truncate group-hover:text-theme-primary transition-colors">
          {title}
        </p>
        <p className="text-xs text-theme-muted capitalize">{type}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-theme-muted group-hover:text-theme-primary transition-colors" />
    </motion.a>
  )
}

// Image placeholder component
function ImagePlaceholder({ caption }: { caption: string }) {
  return (
    <div className="my-8 p-8 rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--muted)] text-center">
      <ImageIcon className="w-16 h-16 mx-auto text-theme-muted mb-4" />
      <p className="text-sm font-bold text-theme-muted">{caption}</p>
      <p className="text-xs text-theme-muted mt-1">Image placeholder - Add your visual here</p>
    </div>
  )
}

// Scavenger Hunt Quiz component
function ScavengerHuntQuiz({
  questions,
  foundQuotes,
  onComplete
}: {
  questions: Array<{
    id: string
    question: string
    options: string[]
    correctIndex: number
    explanation: string
    relatedQuoteId?: string
  }>
  foundQuotes: Set<string>
  onComplete: (score: number, passed: boolean) => void
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const question = questions[currentQuestion]
  const isAnswered = answers[currentQuestion] !== undefined
  const isCorrect = isAnswered && answers[currentQuestion] === question.correctIndex

  const handleAnswer = (index: number) => {
    if (isAnswered) return
    setAnswers(prev => ({ ...prev, [currentQuestion]: index }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowHint(false)
    } else {
      setShowResults(true)
      const correct = Object.entries(answers).filter(
        ([idx, ans]) => questions[parseInt(idx)].correctIndex === ans
      ).length
      const score = Math.round((correct / questions.length) * 100)
      onComplete(score, score >= 80)
    }
  }

  if (showResults) {
    const correct = Object.entries(answers).filter(
      ([idx, ans]) => questions[parseInt(idx)].correctIndex === ans
    ).length
    const score = Math.round((correct / questions.length) * 100)
    const passed = score >= 80

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          {passed ? (
            <Trophy className="w-24 h-24 mx-auto text-yellow-500 mb-6" />
          ) : (
            <Target className="w-24 h-24 mx-auto text-theme-secondary mb-6" />
          )}
        </motion.div>
        <h3 className="text-4xl font-black mb-2">{score}%</h3>
        <p className={`text-xl font-bold ${passed ? 'text-green-500' : 'text-theme-secondary'}`}>
          {passed ? 'Congratulations! You passed!' : 'Keep studying! You need 80% to pass.'}
        </p>
        <p className="text-theme-muted mt-2">
          You got {correct} out of {questions.length} questions correct.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-2 bg-[var(--muted)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[var(--primary)]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold text-theme-muted">
          {currentQuestion + 1}/{questions.length}
        </span>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center font-black">
              {currentQuestion + 1}
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-[var(--foreground)]">{question.question}</h4>
              {question.relatedQuoteId && (
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="mt-2 text-sm text-theme-primary font-bold flex items-center gap-1 hover:underline"
                >
                  <Lightbulb className="w-4 h-4" />
                  {showHint ? 'Hide hint' : 'Need a hint? Click here'}
                </button>
              )}
              {showHint && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 text-sm text-theme-muted bg-[var(--muted)] p-3 rounded-lg"
                >
                  Look for the highlighted quote in the lesson. If you found it, the answer is there!
                  {foundQuotes.has(question.relatedQuoteId!) && (
                    <span className="text-green-500 font-bold ml-2">✓ You found this quote!</span>
                  )}
                </motion.p>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = answers[currentQuestion] === idx
              const showCorrect = isAnswered && idx === question.correctIndex
              const showWrong = isAnswered && isSelected && idx !== question.correctIndex

              return (
                <motion.button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-green-500/10'
                      : showWrong
                      ? 'border-red-500 bg-red-500/10'
                      : isSelected
                      ? 'border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))]'
                      : 'border-[var(--border)] hover:border-[var(--primary)]'
                  }`}
                  whileHover={!isAnswered ? { scale: 1.01 } : {}}
                  whileTap={!isAnswered ? { scale: 0.99 } : {}}
                >
                  <span className="font-medium text-[var(--foreground)]">{option}</span>
                  {showCorrect && <CheckCircle2 className="inline-block w-5 h-5 text-green-500 ml-2" />}
                </motion.button>
              )
            })}
          </div>

          {/* Explanation */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-[color-mix(in_srgb,var(--accent)_10%,var(--background))] border border-[var(--accent)]"
            >
              <p className="text-sm text-[var(--foreground)]">
                <strong>Explanation:</strong> {question.explanation}
              </p>
            </motion.div>
          )}

          {/* Next button */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-end"
            >
              <Button onClick={nextQuestion} className="font-bold">
                {currentQuestion === questions.length - 1 ? 'See Results' : 'Next Question'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Main Interactive Textbook Props
interface InteractiveTextbookProps {
  module: Module
  levelContent: {
    description: string
    duration: number
    lessons: Array<{
      id: string
      title: string
      order: number
      content: string
      duration: number
      hasActivity?: boolean
      activityType?: string
    }>
    quiz: {
      id: string
      passingScore: number
      questions: Array<{
        id: string
        question: string
        options: string[]
        correctIndex: number
        explanation: string
      }>
    }
  }
  selectedLevel: LearningLevel
  onLevelChange: (level: LearningLevel) => void
  topicSlug: string
}

export function InteractiveTextbook({
  module,
  levelContent,
  selectedLevel,
  onLevelChange,
  topicSlug
}: InteractiveTextbookProps) {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizPassed, setQuizPassed] = useState(false)
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [started, setStarted] = useState(false)
  const [foundQuotes, setFoundQuotes] = useState<Set<string>>(new Set())
  const [showDiscussions, setShowDiscussions] = useState(false)

  const lesson = levelContent.lessons[currentLesson]
  const totalLessons = levelContent.lessons.length
  const progressPercent = Math.round((completedLessons.size / totalLessons) * 100)

  // Mark lesson complete
  const markComplete = (lessonId: string) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]))
  }

  // Handle quote found
  const handleQuoteFound = (quoteId: string) => {
    setFoundQuotes(prev => new Set([...prev, quoteId]))
  }

  // Navigate lessons
  const goToNext = () => {
    if (!completedLessons.has(lesson.id)) {
      markComplete(lesson.id)
    }
    if (currentLesson < totalLessons - 1) {
      setCurrentLesson(currentLesson + 1)
    } else {
      setShowQuiz(true)
    }
  }

  const goToPrevious = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1)
    }
  }

  // Handle quiz completion
  const handleQuizComplete = (score: number, passed: boolean) => {
    setQuizScore(score)
    setQuizPassed(passed)
    // TODO: Save progress to API
  }

  // Start screen
  if (!started) {
    return (
      <div className="min-h-screen bg-[var(--background)] py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href={`/learn/topics/${topicSlug}?level=${selectedLevel.toLowerCase()}`}
            className="inline-flex items-center gap-2 text-theme-primary font-bold mb-8 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Topic
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-4 border-theme-primary overflow-hidden">
              <div className="h-3 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]" />
              <CardContent className="p-8 md:p-12">
                {/* Module Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] text-theme-primary font-bold text-sm mb-4"
                  >
                    <Sparkles className="w-4 h-4" />
                    {module.category}
                    {module.isMasterclass && (
                      <span className="px-2 py-0.5 bg-yellow-400 text-yellow-900 rounded text-xs font-black ml-2">
                        MASTERCLASS
                      </span>
                    )}
                  </motion.div>

                  <h1 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-4">
                    {module.title}
                  </h1>

                  <p className="text-lg text-theme-muted max-w-2xl mx-auto">
                    {levelContent.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-theme-muted">
                  <span className="flex items-center gap-2 font-bold">
                    <BookOpen className="w-5 h-5" />
                    {totalLessons} Lessons
                  </span>
                  <span className="flex items-center gap-2 font-bold">
                    <Clock className="w-5 h-5" />
                    {levelContent.duration} min
                  </span>
                  <span className="flex items-center gap-2 font-bold">
                    <Target className="w-5 h-5" />
                    Scavenger Hunt Quiz
                  </span>
                </div>

                {/* Level Selector */}
                <div className="mb-8">
                  <p className="text-sm font-bold text-theme-muted mb-3 flex items-center justify-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Select Your Learning Level
                  </p>
                  <LevelSelector
                    currentLevel={selectedLevel}
                    onLevelChange={onLevelChange}
                    variant="cards"
                    showDescriptions={false}
                    className="justify-center"
                  />
                  <p className="text-xs text-theme-muted mt-2 text-center">
                    {LEARNING_LEVELS[selectedLevel].icon} {LEARNING_LEVELS[selectedLevel].label}: {LEARNING_LEVELS[selectedLevel].description}
                  </p>
                </div>

                {/* How it works */}
                <div className="bg-[var(--muted)] rounded-2xl p-6 mb-8">
                  <h3 className="font-black text-[var(--foreground)] mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-theme-primary" />
                    How This Lesson Works
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Read the Story</p>
                        <p className="text-theme-muted">Learn through an engaging narrative with animations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Find the Quotes</p>
                        <p className="text-theme-muted">Click highlighted quotes to mark them as found</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Complete the Hunt</p>
                        <p className="text-theme-muted">Use what you learned to answer quiz questions</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* References Preview */}
                {module.externalResources.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-black text-[var(--foreground)] mb-3 flex items-center gap-2">
                      <ExternalLink className="w-5 h-5 text-theme-primary" />
                      References ({module.externalResources.length})
                    </h3>
                    <div className="space-y-2">
                      {module.externalResources.slice(0, 3).map((resource, idx) => (
                        <ReferenceLink
                          key={resource.url}
                          title={resource.title}
                          url={resource.url}
                          type={resource.type}
                          index={idx}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  size="lg"
                  onClick={() => setStarted(true)}
                  className="w-full text-xl py-6 rounded-xl font-black shadow-xl"
                >
                  <Play className="w-6 h-6 mr-3" />
                  BEGIN YOUR LEARNING JOURNEY
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  // Quiz screen
  if (showQuiz) {
    return (
      <div className="min-h-screen bg-[var(--background)] py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-4 border-theme-accent overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]" />
            <CardContent className="p-6 md:p-8">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring" }}
                >
                  <Search className="w-16 h-16 text-theme-accent mx-auto mb-4" />
                </motion.div>
                <h2 className="text-3xl font-black text-[var(--foreground)] mb-2">
                  Scavenger Hunt Quiz
                </h2>
                <p className="text-theme-muted">
                  Use what you discovered in the lesson to answer these questions!
                </p>
                <p className="text-sm text-theme-primary font-bold mt-2">
                  Quotes found: {foundQuotes.size} | Need 80% to pass
                </p>
              </div>

              <ScavengerHuntQuiz
                questions={levelContent.quiz.questions}
                foundQuotes={foundQuotes}
                onComplete={handleQuizComplete}
              />

              {quizScore !== null && (
                <div className="mt-8 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowQuiz(false)
                      setQuizScore(null)
                    }}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Review Lessons
                  </Button>
                  <Link href={`/learn/topics/${topicSlug}?level=${selectedLevel.toLowerCase()}`}>
                    <Button className="font-bold">
                      Continue to Next Module
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Main lesson view
  return (
    <div className="min-h-screen bg-[var(--background)] py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link
            href={`/learn/topics/${topicSlug}?level=${selectedLevel.toLowerCase()}`}
            className="inline-flex items-center gap-2 text-theme-primary font-bold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-theme-muted">
              {progressPercent}%
            </span>
            <div className="w-32 h-2 bg-[var(--muted)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Module Info */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-theme-primary">{module.category}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[color-mix(in_srgb,var(--primary)_15%,var(--background))] text-theme-primary">
              {LEARNING_LEVELS[selectedLevel].icon} {LEARNING_LEVELS[selectedLevel].shortLabel}
            </span>
          </div>
          <h1 className="text-2xl font-black text-[var(--foreground)]">{module.title}</h1>
        </div>

        {/* Lesson Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {levelContent.lessons.map((les, idx) => {
            const isCompleted = completedLessons.has(les.id)
            const isCurrent = idx === currentLesson

            return (
              <button
                key={les.id}
                onClick={() => setCurrentLesson(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                    : isCompleted
                    ? 'bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] text-theme-primary'
                    : 'bg-[var(--muted)] text-theme-muted hover:bg-[color-mix(in_srgb,var(--primary)_10%,var(--muted))]'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                {idx + 1}. {les.title}
              </button>
            )
          })}
          <button
            onClick={() => setShowQuiz(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap bg-[color-mix(in_srgb,var(--accent)_15%,var(--background))] text-theme-accent hover:bg-[color-mix(in_srgb,var(--accent)_25%,var(--background))]"
          >
            <Trophy className="w-4 h-4" />
            Quiz
          </button>
        </div>

        {/* Lesson Content */}
        <Card className="border-2 border-[var(--border)] mb-4">
          <CardContent className="p-6 md:p-8">
            <AnimatedSection>
              <h2 className="text-2xl font-black text-[var(--foreground)] mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center font-black">
                  {currentLesson + 1}
                </div>
                {lesson.title}
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div
                className="prose prose-lg max-w-none text-[var(--foreground)]
                           prose-headings:text-[var(--foreground)] prose-headings:font-black
                           prose-p:text-[var(--foreground)] prose-p:leading-relaxed
                           prose-li:text-[var(--foreground)]
                           prose-strong:text-[var(--foreground)]
                           prose-a:text-theme-primary prose-a:font-semibold
                           prose-blockquote:border-[var(--primary)] prose-blockquote:text-theme-muted
                           prose-ul:space-y-2 prose-ol:space-y-2"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(lesson.content) }}
              />
            </AnimatedSection>

            {/* References at bottom of lesson */}
            {module.externalResources.length > 0 && currentLesson === totalLessons - 1 && (
              <AnimatedSection delay={0.2}>
                <div className="mt-8 pt-8 border-t border-[var(--border)]">
                  <h3 className="font-black text-[var(--foreground)] mb-4 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-theme-primary" />
                    References & Further Reading
                  </h3>
                  <div className="space-y-2">
                    {module.externalResources.map((resource, idx) => (
                      <ReferenceLink
                        key={resource.url}
                        title={resource.title}
                        url={resource.url}
                        type={resource.type}
                        index={idx}
                      />
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={currentLesson === 0}
            className="font-bold"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <p className="text-sm text-theme-muted text-center px-4">
            {currentLesson === totalLessons - 1
              ? 'Ready for the scavenger hunt quiz!'
              : `${totalLessons - currentLesson - 1} lessons remaining`
            }
          </p>

          <Button onClick={goToNext} className="font-bold">
            {currentLesson === totalLessons - 1 ? 'Take Quiz' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Discussions */}
        <button
          onClick={() => setShowDiscussions(!showDiscussions)}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-[var(--card)] border-2 border-[var(--border)] hover:border-[var(--primary)] transition-colors"
        >
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-theme-primary" />
            <span className="font-bold text-[var(--foreground)]">Module Discussions</span>
          </div>
          <ChevronDown className={`w-5 h-5 text-theme-muted transition-transform ${showDiscussions ? 'rotate-180' : ''}`} />
        </button>

        {showDiscussions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4"
          >
            <ModuleDiscussions
              articleId={module.id}
              currentLevel={selectedLevel}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}
