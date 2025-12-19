'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Play, CheckCircle, Circle,
  Lightbulb, BookOpen, HelpCircle, ChevronRight, Sparkles,
  Lock, Unlock
} from 'lucide-react'
import Link from 'next/link'

// Sample lesson content
const lessonContent = [
  {
    id: 'intro',
    type: 'content',
    title: 'What is a System?',
    content: 'A **system** is an interconnected set of elements—technological, institutional, behavioral, and cultural—that function as an integrated whole.\n\nSystems exhibit *emergent properties* that cannot be understood by examining parts in isolation. The food system, for example, includes farms, processing facilities, distribution networks, retailers, and consumers—all working together.',
    insight: 'Think of a system you interact with daily. What are its visible and invisible components?'
  },
  {
    id: 'interactive1',
    type: 'interaction',
    title: 'Identify the System',
    question: 'Which of these best describes a "system" in Exodological terms?',
    options: [
      { id: 'a', text: 'A single technology or tool', correct: false, feedback: 'A technology is a component, but not a complete system.' },
      { id: 'b', text: 'Interconnected elements that function as a whole', correct: true, feedback: 'Exactly! Systems are defined by relationships between elements, not just the elements themselves.' },
      { id: 'c', text: 'A government policy or regulation', correct: false, feedback: 'Policies are part of systems, but a system includes many more elements.' },
      { id: 'd', text: 'Any large organization', correct: false, feedback: 'Organizations can be systems, but the definition is broader.' }
    ]
  },
  {
    id: 'content2',
    type: 'content',
    title: 'Why Systems Resist Change',
    content: 'Systems develop **lock-in**—accumulated advantages, interdependencies, and feedback loops that make change difficult.\n\nConsider the automobile system: roads, gas stations, car manufacturing, suburban design, driving regulations, and cultural attitudes all reinforce each other. Changing one element is hard because everything is connected.',
    insight: 'Lock-in explains why "obvious" solutions often fail. The system pushes back.'
  },
  {
    id: 'interactive2',
    type: 'interaction',
    title: 'Recognizing Lock-in',
    question: 'You want to reduce car dependency in a city. Which response best shows systems thinking?',
    options: [
      { id: 'a', text: 'Build more bike lanes', correct: false, feedback: 'Good start, but infrastructure alone won\'t change the system.' },
      { id: 'b', text: 'Ban cars from the city center', correct: false, feedback: 'This addresses symptoms without considering why people drive.' },
      { id: 'c', text: 'Address infrastructure, zoning, culture, and economics together', correct: true, feedback: 'Yes! Systems change requires working across multiple dimensions simultaneously.' },
      { id: 'd', text: 'Wait for electric cars to solve the problem', correct: false, feedback: 'Electric cars still reinforce car dependency. The system stays locked-in.' }
    ]
  },
  {
    id: 'summary',
    type: 'summary',
    title: 'Key Takeaways',
    points: [
      'Systems are interconnected wholes, not just collections of parts',
      'Lock-in creates resistance to change through accumulated dependencies',
      'Effective transitions require addressing multiple system dimensions',
      'Understanding system dynamics is the foundation of Exodology'
    ]
  }
]

export default function PreviewPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set())

  const section = lessonContent[currentSection]
  const progress = ((currentSection + 1) / lessonContent.length) * 100

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswer(optionId)
    setShowFeedback(true)

    // Auto-complete after viewing feedback
    setTimeout(() => {
      setCompletedSections(prev => new Set([...prev, currentSection]))
    }, 1000)
  }

  const nextSection = () => {
    if (currentSection < lessonContent.length - 1) {
      setCurrentSection(prev => prev + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    }
  }

  const markComplete = () => {
    setCompletedSections(prev => new Set([...prev, currentSection]))
  }

  const canProceed = completedSections.has(currentSection) ||
    (section.type === 'interaction' && showFeedback && selectedAnswer && section.options?.find(o => o.id === selectedAnswer)?.correct)

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/exodology"
            className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--muted-foreground)]">SAMPLE LESSON</span>
            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 text-xs font-bold rounded">PREVIEW</span>
          </div>

          <Link
            href="/exodology/start"
            className="text-sm text-[var(--primary)] font-medium hover:underline"
          >
            Start Full Course
          </Link>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-1.5 bg-[var(--muted)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
            <span className="text-sm font-medium text-[var(--foreground)]">
              {currentSection + 1}/{lessonContent.length}
            </span>
          </div>

          {/* Section indicators */}
          <div className="flex gap-2 mt-2">
            {lessonContent.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentSection(i)
                  setSelectedAnswer(null)
                  setShowFeedback(false)
                }}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${
                  i === currentSection
                    ? 'bg-amber-500 text-white'
                    : completedSections.has(i)
                    ? 'bg-green-500/10 text-green-600'
                    : 'bg-[var(--muted)]/50 text-[var(--muted-foreground)]'
                }`}
              >
                {completedSections.has(i) ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  <Circle className="w-3 h-3" />
                )}
                <span className="hidden sm:inline">{s.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {section.type === 'content' && (
                <ContentSection
                  section={section as typeof lessonContent[0]}
                  onComplete={markComplete}
                  isComplete={completedSections.has(currentSection)}
                />
              )}

              {section.type === 'interaction' && (
                <InteractionSection
                  section={section as typeof lessonContent[1]}
                  selectedAnswer={selectedAnswer}
                  showFeedback={showFeedback}
                  onSelect={handleAnswerSelect}
                />
              )}

              {section.type === 'summary' && (
                <SummarySection section={section as typeof lessonContent[4]} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation */}
      <footer className="p-4 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={prevSection}
            disabled={currentSection === 0}
            className={currentSection === 0 ? 'invisible' : ''}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentSection < lessonContent.length - 1 ? (
            <Button
              onClick={nextSection}
              disabled={!canProceed && section.type === 'interaction'}
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Link href="/exodology/start">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0">
                Start Full Course
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </footer>
    </div>
  )
}

// Content Section Component
function ContentSection({
  section,
  onComplete,
  isComplete
}: {
  section: typeof lessonContent[0]
  onComplete: () => void
  isComplete: boolean
}) {
  // Parse markdown-like formatting
  const formatContent = (text: string) => {
    return text.split('\n\n').map((paragraph, i) => (
      <p key={i} className="mb-4 last:mb-0">
        {paragraph.split(/(\*\*.*?\*\*|\*.*?\*)/).map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="text-[var(--foreground)] font-bold">{part.slice(2, -2)}</strong>
          }
          if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={j}>{part.slice(1, -1)}</em>
          }
          return part
        })}
      </p>
    ))
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-amber-500" />
        </div>
        <h1 className="text-2xl font-black text-[var(--foreground)]">{section.title}</h1>
      </div>

      {section.content && (
        <Card className="border border-[var(--border)] mb-6">
          <CardContent className="p-6">
            <div className="text-[var(--muted-foreground)] text-lg leading-relaxed">
              {formatContent(section.content)}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Insight box */}
      {'insight' in section && section.insight && (
        <Card className="border-2 border-amber-500/30 bg-amber-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[var(--foreground)] text-sm mb-1">Reflection</h3>
                <p className="text-sm text-[var(--muted-foreground)]">{section.insight}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!isComplete && (
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={onComplete}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark as Read
          </Button>
        </div>
      )}
    </div>
  )
}

// Interaction Section Component
function InteractionSection({
  section,
  selectedAnswer,
  showFeedback,
  onSelect
}: {
  section: typeof lessonContent[1]
  selectedAnswer: string | null
  showFeedback: boolean
  onSelect: (id: string) => void
}) {
  const options = section.options || []
  const selectedOption = options.find(o => o.id === selectedAnswer)

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
          <HelpCircle className="w-6 h-6 text-purple-500" />
        </div>
        <h1 className="text-2xl font-black text-[var(--foreground)]">{section.title}</h1>
      </div>

      <p className="text-lg text-[var(--muted-foreground)] mb-6">{section.question}</p>

      <div className="space-y-3">
        {options.map((option, i) => {
          const isSelected = selectedAnswer === option.id
          const isCorrect = option.correct
          const showResult = showFeedback && isSelected

          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => !showFeedback && onSelect(option.id)}
              disabled={showFeedback}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                showResult
                  ? isCorrect
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-red-500 bg-red-500/10'
                  : isSelected
                  ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                  : 'border-[var(--border)] hover:border-[var(--primary)]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  showResult
                    ? isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : isSelected
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--muted)] text-[var(--muted-foreground)]'
                }`}>
                  {showResult ? (isCorrect ? '✓' : '✗') : String.fromCharCode(65 + i)}
                </div>
                <span className={`flex-1 ${
                  isSelected ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'
                }`}>
                  {option.text}
                </span>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-xl ${
              selectedOption.correct
                ? 'bg-green-500/10 border-2 border-green-500/30'
                : 'bg-amber-500/10 border-2 border-amber-500/30'
            }`}
          >
            <div className="flex items-start gap-3">
              {selectedOption.correct ? (
                <Sparkles className="w-5 h-5 text-green-500 mt-0.5" />
              ) : (
                <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5" />
              )}
              <div>
                <h3 className={`font-bold text-sm mb-1 ${
                  selectedOption.correct ? 'text-green-600' : 'text-amber-600'
                }`}>
                  {selectedOption.correct ? 'Correct!' : 'Not quite'}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)]">{selectedOption.feedback}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Summary Section Component
function SummarySection({ section }: { section: typeof lessonContent[4] }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-black text-[var(--foreground)]">{section.title}</h1>
      </div>

      <Card className="border-2 border-amber-500/30 mb-6">
        <CardContent className="p-6">
          <ul className="space-y-3">
            {'points' in section && section.points?.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-[var(--foreground)]">{point}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border border-[var(--border)] bg-[var(--muted)]/30">
        <CardContent className="p-6 text-center">
          <Unlock className="w-10 h-10 text-[var(--primary)] mx-auto mb-3" />
          <h3 className="font-bold text-[var(--foreground)] mb-2">
            You've completed the sample lesson!
          </h3>
          <p className="text-sm text-[var(--muted-foreground)] mb-4">
            This is just a taste of what you'll learn. Ready to master transition science?
          </p>
          <Link href="/exodology/start">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0">
              Find My Learning Path
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
