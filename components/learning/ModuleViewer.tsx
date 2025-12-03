'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  ChevronLeft, ChevronRight, CheckCircle2, Circle,
  BookOpen, Trophy, Clock, Target, ArrowLeft, Play, Quote
} from 'lucide-react'
import Link from 'next/link'

// Historical sustainability quotes from influential figures throughout human history
const historicalQuotes = [
  // Ancient Wisdom
  { quote: "The frog does not drink up the pond in which it lives.", author: "Native American Proverb", era: "Ancient" },
  { quote: "We do not inherit the Earth from our ancestors; we borrow it from our children.", author: "Indigenous Wisdom", era: "Ancient" },
  { quote: "When the well is dry, we know the worth of water.", author: "Benjamin Franklin", era: "1700s" },
  { quote: "In all things of nature there is something of the marvelous.", author: "Aristotle", era: "384-322 BC" },
  { quote: "The land is sacred. These words are at the core of your being.", author: "Chief Seattle", era: "1854" },

  // Renaissance & Early Modern
  { quote: "Look deep into nature, and then you will understand everything better.", author: "Albert Einstein", era: "1879-1955" },
  { quote: "The Earth has music for those who listen.", author: "William Shakespeare", era: "1564-1616" },
  { quote: "Study nature, love nature, stay close to nature. It will never fail you.", author: "Frank Lloyd Wright", era: "1867-1959" },
  { quote: "What we are doing to the forests of the world is but a mirror reflection of what we are doing to ourselves.", author: "Mahatma Gandhi", era: "1869-1948" },

  // Environmental Pioneers
  { quote: "In wildness is the preservation of the world.", author: "Henry David Thoreau", era: "1817-1862" },
  { quote: "The nation that destroys its soil destroys itself.", author: "Franklin D. Roosevelt", era: "1882-1945" },
  { quote: "A nation that destroys its soils destroys itself. Forests are the lungs of our land.", author: "Franklin D. Roosevelt", era: "1937" },
  { quote: "The ultimate test of a moral society is the kind of world it leaves to its children.", author: "Dietrich Bonhoeffer", era: "1906-1945" },
  { quote: "Plans to protect air and water, wilderness and wildlife are in fact plans to protect man.", author: "Stewart Udall", era: "1920-2010" },

  // Modern Environmentalists
  { quote: "The environment is where we all meet; where we all have a mutual interest.", author: "Lady Bird Johnson", era: "1912-2007" },
  { quote: "We won't have a society if we destroy the environment.", author: "Margaret Mead", era: "1901-1978" },
  { quote: "Nature is not a place to visit. It is home.", author: "Gary Snyder", era: "1930-present" },
  { quote: "The Earth does not belong to us: we belong to the Earth.", author: "Marlee Matlin", era: "Modern" },
  { quote: "One touch of nature makes the whole world kin.", author: "William Shakespeare", era: "1564-1616" },

  // Scientific & Modern Leaders
  { quote: "The greatest threat to our planet is the belief that someone else will save it.", author: "Robert Swan", era: "1956-present" },
  { quote: "We are the first generation to feel the impact of climate change and the last generation that can do something about it.", author: "Barack Obama", era: "2014" },
  { quote: "Climate change is the greatest threat to our existence in our short history on this planet.", author: "Leonardo DiCaprio", era: "Modern" },
  { quote: "The Earth provides enough to satisfy every man's needs, but not every man's greed.", author: "Mahatma Gandhi", era: "1869-1948" },
  { quote: "Unless someone like you cares a whole awful lot, nothing is going to get better. It's not.", author: "Dr. Seuss", era: "1904-1991" },

  // Women Environmental Leaders
  { quote: "The human race is challenged more than ever before to demonstrate our mastery, not over nature but of ourselves.", author: "Rachel Carson", era: "1907-1964" },
  { quote: "You cannot get through a single day without having an impact on the world around you.", author: "Jane Goodall", era: "1934-present" },
  { quote: "What you do makes a difference, and you have to decide what kind of difference you want to make.", author: "Jane Goodall", era: "1934-present" },
  { quote: "Until you dig a hole, you plant a tree, you water it and make it survive, you haven't done a thing.", author: "Wangari Maathai", era: "1940-2011" },
  { quote: "When we heal the earth, we heal ourselves.", author: "David Orr", era: "Modern" },

  // Youth & Future Leaders
  { quote: "Our house is on fire. I am here to say, our house is on fire.", author: "Greta Thunberg", era: "2019" },
  { quote: "You are never too small to make a difference.", author: "Greta Thunberg", era: "2018" },
  { quote: "We don't need a handful of people doing zero waste perfectly. We need millions doing it imperfectly.", author: "Anne-Marie Bonneau", era: "Modern" },
  { quote: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", era: "Ancient" },
  { quote: "Act as if what you do makes a difference. It does.", author: "William James", era: "1842-1910" },

  // Philosophers & Thinkers
  { quote: "Adopt the pace of nature: her secret is patience.", author: "Ralph Waldo Emerson", era: "1803-1882" },
  { quote: "To forget how to dig the earth and to tend the soil is to forget ourselves.", author: "Mahatma Gandhi", era: "1869-1948" },
  { quote: "He that plants trees loves others besides himself.", author: "Thomas Fuller", era: "1608-1661" },
  { quote: "Live in each season as it passes; breathe the air, drink the drink, taste the fruit.", author: "Henry David Thoreau", era: "1817-1862" },
  { quote: "The poetry of the earth is never dead.", author: "John Keats", era: "1795-1821" },
]

interface Lesson {
  id: string
  title: string
  content: string
  order: number
}

interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

interface QuizQuestion {
  id: string
  question: string
  explanation?: string
  options: QuizOption[]
}

interface Quiz {
  id: string
  passingScore: number
  questions: QuizQuestion[]
}

interface Module {
  id: string
  title: string
  slug: string
  description: string
  category: string
  duration?: number
  color?: string
  lessons: Lesson[]
  quiz?: Quiz
}

interface ModuleViewerProps {
  module: Module
  userId?: string
  initialProgress?: {
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
    progressPercent: number
    completedLessons: string[]
  }
}

export function ModuleViewer({ module, userId, initialProgress }: ModuleViewerProps) {
  const [currentTab, setCurrentTab] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(initialProgress?.completedLessons || [])
  )
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [started, setStarted] = useState(initialProgress?.status !== 'NOT_STARTED')
  const [currentQuote, setCurrentQuote] = useState<typeof historicalQuotes[0] | null>(null)
  const [showQuote, setShowQuote] = useState(false)

  // Get a random quote
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * historicalQuotes.length)
    return historicalQuotes[randomIndex]
  }

  // Show quote with auto-hide
  const displayQuote = () => {
    setCurrentQuote(getRandomQuote())
    setShowQuote(true)
    // Auto-hide after 4 seconds
    setTimeout(() => setShowQuote(false), 4000)
  }

  const totalLessons = module.lessons.length
  const progressPercent = Math.round((completedLessons.size / totalLessons) * 100)
  const currentLesson = module.lessons[currentTab]
  const hasQuiz = module.quiz && module.quiz.questions.length > 0

  // Mark lesson as complete
  const markLessonComplete = async (lessonId: string) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]))

    if (userId) {
      try {
        await fetch('/api/learn/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            moduleId: module.id,
            lessonId,
            action: 'complete_lesson'
          })
        })
      } catch (error) {
        console.error('Error saving progress:', error)
      }
    }
  }

  // Start module
  const handleStart = async () => {
    setStarted(true)

    if (userId) {
      try {
        await fetch('/api/learn/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            moduleId: module.id,
            action: 'start'
          })
        })
      } catch (error) {
        console.error('Error starting module:', error)
      }
    }
  }

  // Navigate lessons
  const goToNext = () => {
    if (!completedLessons.has(currentLesson.id)) {
      markLessonComplete(currentLesson.id)
    }

    if (currentTab < totalLessons - 1) {
      setCurrentTab(currentTab + 1)
      displayQuote() // Show wisdom quote on navigation
    } else if (hasQuiz) {
      setShowQuiz(true)
    }
  }

  const goToPrevious = () => {
    if (currentTab > 0) {
      setCurrentTab(currentTab - 1)
      displayQuote() // Show wisdom quote on navigation
    }
  }

  // Quiz handling
  const handleQuizAnswer = (questionId: string, optionId: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionId }))
  }

  const submitQuiz = async () => {
    if (!module.quiz) return

    let correct = 0
    module.quiz.questions.forEach(question => {
      const selectedOption = question.options.find(o => o.id === quizAnswers[question.id])
      if (selectedOption?.isCorrect) correct++
    })

    const score = Math.round((correct / module.quiz.questions.length) * 100)
    setQuizScore(score)
    setQuizSubmitted(true)

    if (userId) {
      try {
        await fetch('/api/learn/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            moduleId: module.id,
            quizId: module.quiz.id,
            score,
            passed: score >= module.quiz.passingScore,
            answers: quizAnswers,
            action: 'submit_quiz'
          })
        })
      } catch (error) {
        console.error('Error submitting quiz:', error)
      }
    }
  }

  // Start screen
  if (!started) {
    return (
      <div className="min-h-screen bg-[var(--background)] py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/learn" className="inline-flex items-center gap-2 text-theme-primary font-bold mb-8 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Learn
          </Link>

          <Card className="border-4 border-theme-primary overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]" />
            <CardContent className="p-6 sm:p-10 md:p-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] text-theme-primary font-bold text-sm mb-6">
                {module.category}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--foreground)] mb-4">
                {module.title}
              </h1>

              <p className="text-lg text-theme-muted mb-8 max-w-2xl mx-auto">
                {module.description}
              </p>

              <div className="flex items-center justify-center gap-8 mb-10 text-theme-muted">
                <span className="flex items-center gap-2 font-bold">
                  <BookOpen className="w-5 h-5" />
                  {totalLessons} Lessons
                </span>
                {module.duration && (
                  <span className="flex items-center gap-2 font-bold">
                    <Clock className="w-5 h-5" />
                    {module.duration} min
                  </span>
                )}
                {hasQuiz && (
                  <span className="flex items-center gap-2 font-bold">
                    <Target className="w-5 h-5" />
                    Quiz Included
                  </span>
                )}
              </div>

              <Button
                size="lg"
                onClick={handleStart}
                className="text-xl px-12 py-6 rounded-xl font-black shadow-xl"
              >
                <Play className="w-6 h-6 mr-3" />
                START MODULE
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Quiz screen
  if (showQuiz && module.quiz) {
    return (
      <div className="min-h-screen bg-[var(--background)] py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-4 border-theme-accent overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]" />
            <CardContent className="p-4 sm:p-6 md:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-theme-accent mx-auto mb-4" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[var(--foreground)] mb-2">
                  {quizSubmitted ? 'Quiz Complete!' : 'Knowledge Check'}
                </h2>
                {quizSubmitted && quizScore !== null && (
                  <div className={`text-5xl font-black ${quizScore >= module.quiz.passingScore ? 'text-theme-primary' : 'text-theme-secondary'}`}>
                    {quizScore}%
                  </div>
                )}
                {quizSubmitted && (
                  <p className={`text-lg font-bold mt-2 ${quizScore && quizScore >= module.quiz.passingScore ? 'text-theme-primary' : 'text-theme-secondary'}`}>
                    {quizScore && quizScore >= module.quiz.passingScore
                      ? 'Congratulations! You passed!'
                      : `You need ${module.quiz.passingScore}% to pass. Try again!`}
                  </p>
                )}
              </div>

              <div className="space-y-8">
                {module.quiz.questions.map((question, qIndex) => {
                  const selectedAnswer = quizAnswers[question.id]
                  const correctOption = question.options.find(o => o.isCorrect)

                  return (
                    <div key={question.id} className="p-6 bg-[var(--card)] rounded-xl border-2 border-[var(--border)]">
                      <p className="text-lg font-bold text-[var(--foreground)] mb-4">
                        {qIndex + 1}. {question.question}
                      </p>

                      <div className="space-y-3">
                        {question.options.map((option) => {
                          const isSelected = selectedAnswer === option.id
                          const showResult = quizSubmitted

                          let optionClass = 'border-[var(--border)] hover:border-[var(--primary)]'
                          if (showResult) {
                            if (option.isCorrect) {
                              optionClass = 'border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_15%,var(--background))]'
                            } else if (isSelected && !option.isCorrect) {
                              optionClass = 'border-[var(--secondary)] bg-[color-mix(in_srgb,var(--secondary)_15%,var(--background))]'
                            }
                          } else if (isSelected) {
                            optionClass = 'border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_15%,var(--background))]'
                          }

                          return (
                            <button
                              key={option.id}
                              onClick={() => !quizSubmitted && handleQuizAnswer(question.id, option.id)}
                              disabled={quizSubmitted}
                              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${optionClass}`}
                            >
                              <span className="font-medium text-[var(--foreground)]">
                                {option.text}
                              </span>
                              {showResult && option.isCorrect && (
                                <CheckCircle2 className="inline-block w-5 h-5 text-theme-primary ml-2" />
                              )}
                            </button>
                          )
                        })}
                      </div>

                      {quizSubmitted && question.explanation && (
                        <div className="mt-4 p-4 bg-[color-mix(in_srgb,var(--accent)_15%,var(--background))] rounded-lg border border-[var(--accent)]">
                          <p className="text-sm font-medium text-[var(--foreground)]">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowQuiz(false)
                    setQuizSubmitted(false)
                    setQuizAnswers({})
                    setQuizScore(null)
                  }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Lessons
                </Button>

                {!quizSubmitted ? (
                  <Button
                    onClick={submitQuiz}
                    disabled={Object.keys(quizAnswers).length < module.quiz.questions.length}
                    className="font-bold"
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Link href="/learn">
                    <Button className="font-bold">
                      Continue Learning
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Check if module is completed (all lessons done + quiz passed if applicable)
  const allLessonsComplete = completedLessons.size === totalLessons
  const quizPassed = quizSubmitted && quizScore !== null && module.quiz && quizScore >= module.quiz.passingScore
  const moduleComplete = hasQuiz ? (allLessonsComplete && quizPassed) : allLessonsComplete

  // Lesson viewer
  return (
    <div className="min-h-screen bg-[var(--background)] py-8 relative">
      {/* Floating Wisdom Quote Toast */}
      {showQuote && currentQuote && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[90%] sm:w-auto animate-fade-in-up">
          <div className="bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] p-4 sm:p-5 rounded-2xl shadow-2xl text-white">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Quote className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-medium leading-relaxed italic">
                  "{currentQuote.quote}"
                </p>
                <p className="text-xs sm:text-sm font-bold mt-2 opacity-90">
                  — {currentQuote.author}
                  <span className="opacity-70 ml-2">({currentQuote.era})</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/learn" className="inline-flex items-center gap-2 text-theme-primary font-bold hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Learn
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-theme-muted">
              {progressPercent}% Complete
            </span>
            <div className="w-32 h-2 bg-[var(--muted)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Module Title */}
        <div className="mb-3">
          <span className="text-sm font-bold text-theme-primary">{module.category}</span>
          <h1 className="text-2xl font-black text-[var(--foreground)]">{module.title}</h1>
        </div>

        {/* Tab Navigation - Compact */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
          {module.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.has(lesson.id)
            const isCurrent = index === currentTab

            return (
              <button
                key={lesson.id}
                onClick={() => setCurrentTab(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                    : isCompleted
                    ? 'bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] text-theme-primary'
                    : 'bg-[var(--muted)] text-theme-muted hover:bg-[color-mix(in_srgb,var(--primary)_10%,var(--muted))]'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
                {index + 1}. {lesson.title}
              </button>
            )
          })}
          {hasQuiz && (
            <button
              onClick={() => setShowQuiz(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${
                quizPassed
                  ? 'bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] text-theme-accent'
                  : 'bg-[color-mix(in_srgb,var(--accent)_15%,var(--background))] text-theme-accent hover:bg-[color-mix(in_srgb,var(--accent)_25%,var(--background))]'
              }`}
            >
              {quizPassed ? <CheckCircle2 className="w-4 h-4" /> : <Trophy className="w-4 h-4" />}
              Quiz
            </button>
          )}
        </div>

        {/* Lesson Content */}
        <Card className="border-2 border-[var(--border)] mb-4">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-black text-[var(--foreground)] mb-4 sm:mb-6">
              {currentLesson.title}
            </h2>

            <div
              className="prose prose-lg max-w-none text-[var(--foreground)]
                         prose-headings:text-[var(--foreground)]
                         prose-p:text-[var(--foreground)]
                         prose-li:text-[var(--foreground)]
                         prose-strong:text-[var(--foreground)]
                         prose-a:text-theme-primary prose-a:font-semibold
                         prose-blockquote:border-[var(--primary)] prose-blockquote:text-theme-muted"
              dangerouslySetInnerHTML={{ __html: currentLesson.content }}
            />
          </CardContent>
        </Card>

        {/* Navigation with Completion Text */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={currentTab === 0}
            className="font-bold"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {/* Engraved completion text - centered */}
          <p className="text-sm font-medium text-theme-muted opacity-70 text-center px-4" style={{
            textShadow: '0 1px 0 rgba(255,255,255,0.1)',
            letterSpacing: '0.02em'
          }}>
            {moduleComplete
              ? 'Module complete! You can revisit this material anytime.'
              : 'Complete the quiz to finish this module at 100%.'
            }
          </p>

          <Button
            onClick={goToNext}
            className="font-bold"
          >
            {currentTab === totalLessons - 1 ? (
              hasQuiz ? 'Take Quiz' : 'Complete Module'
            ) : (
              'Next'
            )}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
