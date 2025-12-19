'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Compass, Map, Target, Sparkles,
  BookOpen, Lightbulb, Wrench, Crown, CheckCircle, RefreshCw
} from 'lucide-react'
import Link from 'next/link'

// Quiz questions to determine learning path
const quizQuestions = [
  {
    id: 'background',
    question: 'What best describes your current background?',
    subtitle: 'This helps us understand where you\'re starting from',
    options: [
      { id: 'new', label: 'New to systems thinking and transitions', icon: Sparkles, points: { foundations: 3, applied: 1, strategic: 0 } },
      { id: 'aware', label: 'Familiar with sustainability concepts', icon: Lightbulb, points: { foundations: 2, applied: 2, strategic: 1 } },
      { id: 'practitioner', label: 'Working professional in related field', icon: Wrench, points: { foundations: 1, applied: 3, strategic: 2 } },
      { id: 'expert', label: 'Experienced in systems change work', icon: Crown, points: { foundations: 0, applied: 2, strategic: 3 } }
    ]
  },
  {
    id: 'goal',
    question: 'What\'s your primary goal?',
    subtitle: 'Understanding your motivation shapes your path',
    options: [
      { id: 'understand', label: 'Understand why systems fail and how change happens', icon: BookOpen, points: { foundations: 3, applied: 1, strategic: 1 } },
      { id: 'build', label: 'Build or contribute to alternative systems', icon: Wrench, points: { foundations: 1, applied: 3, strategic: 1 } },
      { id: 'lead', label: 'Lead large-scale transition initiatives', icon: Target, points: { foundations: 1, applied: 2, strategic: 3 } },
      { id: 'all', label: 'Comprehensive mastery of all aspects', icon: Crown, points: { foundations: 2, applied: 2, strategic: 2 } }
    ]
  },
  {
    id: 'time',
    question: 'How much time can you dedicate weekly?',
    subtitle: 'Be realistic - consistent progress beats burnout',
    options: [
      { id: 'light', label: '1-2 hours per week', icon: Compass, points: { foundations: 3, applied: 1, strategic: 0 } },
      { id: 'moderate', label: '3-5 hours per week', icon: Map, points: { foundations: 2, applied: 3, strategic: 1 } },
      { id: 'intensive', label: '6+ hours per week', icon: Target, points: { foundations: 1, applied: 2, strategic: 3 } }
    ]
  },
  {
    id: 'interest',
    question: 'Which topic interests you most?',
    subtitle: 'All paths cover multiple domains, but emphasis differs',
    options: [
      { id: 'theory', label: 'Theory and frameworks for understanding change', icon: BookOpen, points: { foundations: 3, applied: 1, strategic: 1 } },
      { id: 'practical', label: 'Practical tools for building alternatives', icon: Wrench, points: { foundations: 1, applied: 3, strategic: 1 } },
      { id: 'strategy', label: 'Strategy and governance of transitions', icon: Target, points: { foundations: 1, applied: 1, strategic: 3 } },
      { id: 'justice', label: 'Justice and equity in system change', icon: Sparkles, points: { foundations: 2, applied: 2, strategic: 2 } }
    ]
  }
]

const pathData = {
  foundations: {
    id: 'foundations',
    name: 'Foundations of Exodology',
    subtitle: 'Exodological Literacy',
    description: 'Build a deep understanding of why systems fail, how transitions occur, and the ethical dimensions of intentional change.',
    icon: Compass,
    color: 'from-amber-500 to-orange-600',
    duration: '4 weeks',
    modules: 8
  },
  applied: {
    id: 'applied',
    name: 'Applied Exodology',
    subtitle: 'Exodological Application',
    description: 'Learn to design, build, and evaluate exit-capable systems with practical frameworks for food, water, and energy.',
    icon: Map,
    color: 'from-teal-500 to-cyan-600',
    duration: '6 weeks',
    modules: 12
  },
  strategic: {
    id: 'strategic',
    name: 'Strategic Exodology',
    subtitle: 'Exodological Stewardship',
    description: 'Master the governance, policy, and leadership skills needed to guide large-scale system transitions.',
    icon: Target,
    color: 'from-purple-500 to-indigo-600',
    duration: '8 weeks',
    modules: 16
  }
}

export default function StartPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }))

    // Auto-advance after selection
    setIsAnimating(true)
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
      } else {
        setShowResult(true)
      }
      setIsAnimating(false)
    }, 400)
  }

  const calculateResult = () => {
    const scores = { foundations: 0, applied: 0, strategic: 0 }

    quizQuestions.forEach(q => {
      const answerId = answers[q.id]
      if (answerId) {
        const option = q.options.find(o => o.id === answerId)
        if (option) {
          scores.foundations += option.points.foundations
          scores.applied += option.points.applied
          scores.strategic += option.points.strategic
        }
      }
    })

    // Find the highest score
    const max = Math.max(scores.foundations, scores.applied, scores.strategic)
    if (scores.strategic === max) return 'strategic'
    if (scores.applied === max) return 'applied'
    return 'foundations'
  }

  const restart = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
  }

  const recommendedPath = showResult ? pathData[calculateResult() as keyof typeof pathData] : null
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Minimal Header */}
      <header className="p-4 flex items-center justify-between">
        <Link
          href="/exodology"
          className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        {!showResult && (
          <button
            onClick={restart}
            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            Start over
          </button>
        )}
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[var(--muted-foreground)]">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </span>
                    <span className="text-sm font-bold text-[var(--foreground)]">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-500 via-teal-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="text-center mb-8">
                  <motion.h1
                    key={quizQuestions[currentQuestion].id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl sm:text-3xl font-black text-[var(--foreground)] mb-2"
                  >
                    {quizQuestions[currentQuestion].question}
                  </motion.h1>
                  <p className="text-[var(--muted-foreground)]">
                    {quizQuestions[currentQuestion].subtitle}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, i) => {
                    const Icon = option.icon
                    const isSelected = answers[quizQuestions[currentQuestion].id] === option.id

                    return (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => !isAnimating && handleAnswer(quizQuestions[currentQuestion].id, option.id)}
                        disabled={isAnimating}
                        className={`w-full p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all ${
                          isSelected
                            ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                            : 'border-[var(--border)] hover:border-[var(--primary)]/50 hover:bg-[var(--muted)]/30'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[var(--primary)] text-white'
                            : 'bg-[var(--muted)] text-[var(--muted-foreground)]'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`font-medium flex-1 ${
                          isSelected ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'
                        }`}>
                          {option.label}
                        </span>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-[var(--primary)]" />
                        )}
                      </motion.button>
                    )
                  })}
                </div>

                {/* Navigation hint */}
                <p className="text-center text-sm text-[var(--muted-foreground)] mt-6">
                  Select an option to continue
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Celebration */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mb-8"
                >
                  <div className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${recommendedPath?.color} flex items-center justify-center shadow-xl`}>
                    {recommendedPath && <recommendedPath.icon className="w-12 h-12 text-white" />}
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl sm:text-3xl font-black text-[var(--foreground)] mb-2"
                >
                  Your Recommended Path
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <h2 className={`text-xl font-black bg-gradient-to-r ${recommendedPath?.color} bg-clip-text text-transparent mb-1`}>
                    {recommendedPath?.name}
                  </h2>
                  <p className="text-[var(--muted-foreground)]">{recommendedPath?.subtitle}</p>
                </motion.div>

                {/* Path Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className={`border-2 border-transparent bg-gradient-to-br ${recommendedPath?.color} p-[2px] rounded-2xl mb-6`}>
                    <CardContent className="bg-[var(--background)] rounded-[14px] p-6">
                      <p className="text-[var(--muted-foreground)] mb-4">
                        {recommendedPath?.description}
                      </p>
                      <div className="flex items-center justify-center gap-6 text-sm">
                        <span className="text-[var(--foreground)] font-medium">
                          {recommendedPath?.duration}
                        </span>
                        <span className="text-[var(--muted-foreground)]">•</span>
                        <span className="text-[var(--foreground)] font-medium">
                          {recommendedPath?.modules} modules
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                  <Link href={`/exodology/paths/${recommendedPath?.id}`}>
                    <Button size="lg" className={`bg-gradient-to-r ${recommendedPath?.color} text-white border-0 px-8`}>
                      Start Learning
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={restart}
                    className="px-8"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retake Quiz
                  </Button>
                </motion.div>

                {/* All paths link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6"
                >
                  <Link
                    href="/exodology/paths"
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                  >
                    Or browse all learning paths
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
