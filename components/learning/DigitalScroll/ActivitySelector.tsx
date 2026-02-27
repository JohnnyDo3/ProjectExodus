'use client'

// ============================================
// ACTIVITY SELECTOR
// Inline activity picker for Digital Scroll pages
// Allows users to choose practice activities
// ============================================

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import {
  Puzzle,
  BookOpen,
  PenLine,
  ClipboardCheck,
  Shuffle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react'
import type { LearningLevel } from '@/types/learning'

// ============================================
// TYPES
// ============================================

export interface ActivityItem {
  id: string
  term: string
  definition: string
  hint?: string
}

export type ActivityType = 'matching' | 'flashcards' | 'fill-blank' | 'word-scramble'

interface ActivityOption {
  type: ActivityType
  name: string
  description: string
  icon: typeof Puzzle
  color: string
}

interface ActivitySelectorProps {
  pageId: string
  items: ActivityItem[]
  topicColor?: string
  level: LearningLevel
  onActivityComplete?: (type: ActivityType, score: number) => void
  className?: string
  compact?: boolean
}

interface ActivityCompletionState {
  [pageId: string]: {
    [activityType: string]: {
      completed: boolean
      score: number
      completedAt: string
    }
  }
}

// ============================================
// ACTIVITY OPTIONS
// ============================================

const ACTIVITY_OPTIONS: ActivityOption[] = [
  {
    type: 'matching',
    name: 'Match Terms',
    description: 'Match terms with definitions',
    icon: Puzzle,
    color: '#10b981',
  },
  {
    type: 'flashcards',
    name: 'Flashcards',
    description: 'Study with flip cards',
    icon: BookOpen,
    color: '#0ea5e9',
  },
  {
    type: 'fill-blank',
    name: 'Fill in Blank',
    description: 'Complete the sentences',
    icon: PenLine,
    color: '#f59e0b',
  },
  {
    type: 'word-scramble',
    name: 'Word Scramble',
    description: 'Unscramble key terms',
    icon: Shuffle,
    color: '#8b5cf6',
  },
]

// ============================================
// STORAGE HELPERS
// ============================================

const STORAGE_KEY = 'exodus_activity_completion'

function getCompletionState(): ActivityCompletionState {
  if (typeof window === 'undefined') return {}
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

function saveCompletionState(state: ActivityCompletionState): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.error('Failed to save activity completion:', e)
  }
}

// ============================================
// MINI MATCHING GAME
// Compact version for inline use
// ============================================

interface MiniMatchingProps {
  items: ActivityItem[]
  topicColor?: string
  onComplete: (score: number) => void
  onClose: () => void
}

function MiniMatching({ items, topicColor, onComplete, onClose }: MiniMatchingProps) {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [incorrect, setIncorrect] = useState<Set<string>>(new Set())

  const gameItems = items.slice(0, 4)
  // Memoize shuffled definitions so they don't re-shuffle on every render
  const shuffledDefs = useMemo(() => {
    const arr = [...gameItems]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [gameItems.map(g => g.id).join(',')])

  const handleTermClick = (id: string) => {
    if (matched.has(id)) return
    setSelectedTerm(id)
    setIncorrect(new Set())
  }

  const handleDefClick = (item: ActivityItem) => {
    if (!selectedTerm || matched.has(item.id)) return

    if (selectedTerm === item.id) {
      setMatched(prev => new Set([...prev, item.id]))
      setSelectedTerm(null)

      if (matched.size + 1 === gameItems.length) {
        const score = Math.round(((matched.size + 1) / gameItems.length) * 100)
        setTimeout(() => onComplete(score), 500)
      }
    } else {
      setIncorrect(new Set([selectedTerm, item.id]))
      setTimeout(() => setIncorrect(new Set()), 600)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[var(--foreground)]/70 uppercase tracking-wider">
          Match the Terms ({matched.size}/{gameItems.length})
        </span>
        <button onClick={onClose} className="p-1 hover:bg-[var(--muted)] rounded">
          <X className="w-3 h-3" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* Terms column */}
        <div className="space-y-1.5">
          {gameItems.map(item => (
            <button
              key={`term-${item.id}`}
              onClick={() => handleTermClick(item.id)}
              disabled={matched.has(item.id)}
              className={cn(
                "w-full px-2 py-1.5 text-left text-xs rounded-lg border transition-all",
                matched.has(item.id) && "bg-green-500/10 border-green-500/30 text-green-600",
                selectedTerm === item.id && !matched.has(item.id) && "border-[var(--primary)] bg-[var(--primary)]/10",
                incorrect.has(item.id) && "border-red-500 bg-red-500/10",
                !matched.has(item.id) && selectedTerm !== item.id && !incorrect.has(item.id) && "border-[var(--border)] hover:border-[var(--primary)]/50"
              )}
            >
              {item.term}
            </button>
          ))}
        </div>

        {/* Definitions column */}
        <div className="space-y-1.5">
          {shuffledDefs.map(item => (
            <button
              key={`def-${item.id}`}
              onClick={() => handleDefClick(item)}
              disabled={matched.has(item.id) || !selectedTerm}
              className={cn(
                "w-full px-2 py-1.5 text-left text-xs rounded-lg border transition-all",
                matched.has(item.id) && "bg-green-500/10 border-green-500/30 text-green-600",
                incorrect.has(item.id) && "border-red-500 bg-red-500/10",
                !matched.has(item.id) && !incorrect.has(item.id) && "border-[var(--border)]",
                selectedTerm && !matched.has(item.id) && "hover:border-[var(--primary)]/50 cursor-pointer"
              )}
            >
              {item.definition.length > 40 ? item.definition.slice(0, 40) + '...' : item.definition}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// MINI FLASHCARDS
// Compact version for inline use
// ============================================

interface MiniFlashcardsProps {
  items: ActivityItem[]
  topicColor?: string
  onComplete: (score: number) => void
  onClose: () => void
}

function MiniFlashcards({ items, topicColor, onComplete, onClose }: MiniFlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [known, setKnown] = useState(0)

  const gameItems = items.slice(0, 5)
  const currentItem = gameItems[currentIndex]

  const handleKnew = () => {
    const newKnown = known + 1
    setKnown(newKnown)
    if (currentIndex + 1 >= gameItems.length) {
      const score = Math.round((newKnown / gameItems.length) * 100)
      onComplete(score)
    } else {
      setIsFlipped(false)
      setCurrentIndex(prev => prev + 1)
    }
  }

  const handleDidntKnow = () => {
    if (currentIndex + 1 >= gameItems.length) {
      const score = Math.round((known / gameItems.length) * 100)
      onComplete(score)
    } else {
      setIsFlipped(false)
      setCurrentIndex(prev => prev + 1)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[var(--foreground)]/70 uppercase tracking-wider">
          Flashcard {currentIndex + 1}/{gameItems.length}
        </span>
        <button onClick={onClose} className="p-1 hover:bg-[var(--muted)] rounded">
          <X className="w-3 h-3" />
        </button>
      </div>

      <motion.div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative h-24 cursor-pointer perspective-1000"
      >
        <motion.div
          className={cn(
            "absolute inset-0 rounded-lg border p-3 backface-hidden",
            "flex items-center justify-center text-center",
            isFlipped ? "bg-[var(--muted)]" : "bg-[var(--card)]",
            "border-[var(--border)]"
          )}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.4s ease'
          }}
        >
          <span className="text-sm font-medium">{currentItem.term}</span>
        </motion.div>

        <motion.div
          className={cn(
            "absolute inset-0 rounded-lg border p-3 backface-hidden",
            "flex items-center justify-center text-center",
            "bg-[var(--muted)] border-[var(--border)]"
          )}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
            transition: 'transform 0.4s ease'
          }}
        >
          <span className="text-xs">{currentItem.definition}</span>
        </motion.div>
      </motion.div>

      <div className="flex gap-2">
        <button
          onClick={handleDidntKnow}
          className="flex-1 py-1.5 text-xs rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10"
        >
          Didn't Know
        </button>
        <button
          onClick={handleKnew}
          className="flex-1 py-1.5 text-xs rounded-lg border border-green-500/30 text-green-500 hover:bg-green-500/10"
        >
          Knew It!
        </button>
      </div>
    </div>
  )
}

// ============================================
// MINI FILL IN BLANK
// Compact version for inline use
// ============================================

interface MiniFillBlankProps {
  items: ActivityItem[]
  topicColor?: string
  onComplete: (score: number) => void
  onClose: () => void
}

function MiniFillBlank({ items, topicColor, onComplete, onClose }: MiniFillBlankProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [correct, setCorrect] = useState(0)
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null)

  const gameItems = items.slice(0, 4)
  const currentItem = gameItems[currentIndex]

  const handleSubmit = () => {
    const isCorrect = userInput.toLowerCase().trim() === currentItem.term.toLowerCase()
    setShowResult(isCorrect ? 'correct' : 'incorrect')
    if (isCorrect) setCorrect(prev => prev + 1)

    setTimeout(() => {
      if (currentIndex + 1 >= gameItems.length) {
        const score = Math.round(((correct + (isCorrect ? 1 : 0)) / gameItems.length) * 100)
        onComplete(score)
      } else {
        setShowResult(null)
        setUserInput('')
        setCurrentIndex(prev => prev + 1)
      }
    }, 1000)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[var(--foreground)]/70 uppercase tracking-wider">
          Fill in Blank ({currentIndex + 1}/{gameItems.length})
        </span>
        <button onClick={onClose} className="p-1 hover:bg-[var(--muted)] rounded">
          <X className="w-3 h-3" />
        </button>
      </div>

      <div className="p-3 rounded-lg bg-[var(--muted)] border border-[var(--border)]">
        <p className="text-xs text-[var(--foreground)]/80 mb-2">
          {currentItem.definition}
        </p>
        <p className="text-xs text-[var(--muted-foreground)] italic">
          The answer is: _______
        </p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Type your answer..."
          className={cn(
            "flex-1 px-3 py-1.5 text-xs rounded-lg border bg-[var(--background)]",
            showResult === 'correct' && "border-green-500 bg-green-500/10",
            showResult === 'incorrect' && "border-red-500 bg-red-500/10",
            !showResult && "border-[var(--border)]"
          )}
          disabled={showResult !== null}
        />
        <button
          onClick={handleSubmit}
          disabled={!userInput.trim() || showResult !== null}
          className="px-3 py-1.5 text-xs rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] disabled:opacity-50"
        >
          Check
        </button>
      </div>

      {showResult === 'incorrect' && (
        <p className="text-xs text-red-500">
          The answer was: <strong>{currentItem.term}</strong>
        </p>
      )}
    </div>
  )
}

// ============================================
// MINI WORD SCRAMBLE
// Compact version for inline use
// ============================================

interface MiniWordScrambleProps {
  items: ActivityItem[]
  topicColor?: string
  onComplete: (score: number) => void
  onClose: () => void
}

function MiniWordScramble({ items, topicColor, onComplete, onClose }: MiniWordScrambleProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [correct, setCorrect] = useState(0)
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null)

  const gameItems = items.slice(0, 4)
  const currentItem = gameItems[currentIndex]

  // Memoize scramble so it doesn't re-shuffle on every render/keystroke
  const scrambledWord = useMemo(() => {
    const letters = currentItem.term.split('')
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]]
    }
    const result = letters.join('').toUpperCase()
    // If shuffle produced the original word, reverse it
    if (result === currentItem.term.toUpperCase()) {
      return letters.reverse().join('').toUpperCase()
    }
    return result
  }, [currentItem.id])

  const handleSubmit = () => {
    const isCorrect = userInput.toLowerCase().trim() === currentItem.term.toLowerCase()
    setShowResult(isCorrect ? 'correct' : 'incorrect')
    if (isCorrect) setCorrect(prev => prev + 1)

    setTimeout(() => {
      if (currentIndex + 1 >= gameItems.length) {
        const score = Math.round(((correct + (isCorrect ? 1 : 0)) / gameItems.length) * 100)
        onComplete(score)
      } else {
        setShowResult(null)
        setUserInput('')
        setCurrentIndex(prev => prev + 1)
      }
    }, 1000)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[var(--foreground)]/70 uppercase tracking-wider">
          Unscramble ({currentIndex + 1}/{gameItems.length})
        </span>
        <button onClick={onClose} className="p-1 hover:bg-[var(--muted)] rounded">
          <X className="w-3 h-3" />
        </button>
      </div>

      <div className="p-3 rounded-lg bg-[var(--muted)] border border-[var(--border)] text-center">
        <p className="text-lg font-mono font-bold tracking-widest" style={{ color: topicColor }}>
          {scrambledWord}
        </p>
        <p className="text-xs text-[var(--muted-foreground)] mt-2">
          Hint: {currentItem.hint || currentItem.definition.slice(0, 50) + '...'}
        </p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Unscramble the word..."
          className={cn(
            "flex-1 px-3 py-1.5 text-xs rounded-lg border bg-[var(--background)]",
            showResult === 'correct' && "border-green-500 bg-green-500/10",
            showResult === 'incorrect' && "border-red-500 bg-red-500/10",
            !showResult && "border-[var(--border)]"
          )}
          disabled={showResult !== null}
        />
        <button
          onClick={handleSubmit}
          disabled={!userInput.trim() || showResult !== null}
          className="px-3 py-1.5 text-xs rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] disabled:opacity-50"
        >
          Check
        </button>
      </div>
    </div>
  )
}

// ============================================
// MAIN ACTIVITY SELECTOR
// ============================================

export function ActivitySelector({
  pageId,
  items,
  topicColor,
  level,
  onActivityComplete,
  className,
  compact = true,
}: ActivitySelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null)
  const [completionState, setCompletionState] = useState<ActivityCompletionState>({})

  // Load completion state
  useEffect(() => {
    setCompletionState(getCompletionState())
  }, [])

  const pageCompletion = completionState[pageId] || {}
  const completedCount = Object.values(pageCompletion).filter(a => a.completed).length
  const allCompleted = completedCount === ACTIVITY_OPTIONS.length

  const handleActivityComplete = useCallback((type: ActivityType, score: number) => {
    setCompletionState(prev => {
      const newState = {
        ...prev,
        [pageId]: {
          ...(prev[pageId] || {}),
          [type]: {
            completed: true,
            score,
            completedAt: new Date().toISOString(),
          },
        },
      }
      saveCompletionState(newState)
      return newState
    })
    setSelectedActivity(null)
    onActivityComplete?.(type, score)
  }, [pageId, onActivityComplete])

  const handleClose = useCallback(() => {
    setSelectedActivity(null)
  }, [])

  if (items.length < 2) return null

  return (
    <div className={cn("my-4", className)}>
      {/* Collapsed Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 rounded-lg",
          "border transition-all",
          allCompleted
            ? "bg-green-500/10 border-green-500/30"
            : "bg-[var(--muted)] border-[var(--border)] hover:border-[var(--primary)]/50"
        )}
      >
        <div className="flex items-center gap-2">
          {allCompleted ? (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          ) : (
            <ClipboardCheck className="w-4 h-4 text-[var(--muted-foreground)]" />
          )}
          <span className="text-xs font-bold text-[var(--foreground)]">
            Practice Activities
          </span>
          <span className="text-xs text-[var(--muted-foreground)]">
            ({completedCount}/{ACTIVITY_OPTIONS.length} complete)
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-[var(--muted-foreground)]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[var(--muted-foreground)]" />
        )}
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-3">
              {/* Activity not selected - show options */}
              {!selectedActivity && (
                <div className="grid grid-cols-2 gap-2">
                  {ACTIVITY_OPTIONS.map(option => {
                    const isCompleted = pageCompletion[option.type]?.completed
                    const Icon = option.icon

                    return (
                      <button
                        key={option.type}
                        onClick={() => setSelectedActivity(option.type)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg border text-left transition-all",
                          isCompleted
                            ? "bg-green-500/10 border-green-500/30"
                            : "bg-[var(--card)] border-[var(--border)] hover:border-[var(--primary)]/50"
                        )}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${option.color}20` }}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <Icon className="w-4 h-4" style={{ color: option.color }} />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[var(--foreground)]">
                            {option.name}
                          </p>
                          {isCompleted && (
                            <p className="text-[10px] text-green-500">
                              Score: {pageCompletion[option.type].score}%
                            </p>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Activity selected - show mini game */}
              {selectedActivity === 'matching' && (
                <MiniMatching
                  items={items}
                  topicColor={topicColor}
                  onComplete={(score) => handleActivityComplete('matching', score)}
                  onClose={handleClose}
                />
              )}

              {selectedActivity === 'flashcards' && (
                <MiniFlashcards
                  items={items}
                  topicColor={topicColor}
                  onComplete={(score) => handleActivityComplete('flashcards', score)}
                  onClose={handleClose}
                />
              )}

              {selectedActivity === 'fill-blank' && (
                <MiniFillBlank
                  items={items}
                  topicColor={topicColor}
                  onComplete={(score) => handleActivityComplete('fill-blank', score)}
                  onClose={handleClose}
                />
              )}

              {selectedActivity === 'word-scramble' && (
                <MiniWordScramble
                  items={items}
                  topicColor={topicColor}
                  onComplete={(score) => handleActivityComplete('word-scramble', score)}
                  onClose={handleClose}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// COMPLETION BADGE
// Shows completion status for a page
// ============================================

interface CompletionBadgeProps {
  pageId: string
  className?: string
}

export function ActivityCompletionBadge({ pageId, className }: CompletionBadgeProps) {
  const [completionState, setCompletionState] = useState<ActivityCompletionState>({})

  useEffect(() => {
    setCompletionState(getCompletionState())
  }, [])

  const pageCompletion = completionState[pageId] || {}
  const completedCount = Object.values(pageCompletion).filter(a => a.completed).length

  if (completedCount === 0) return null

  const allCompleted = completedCount === ACTIVITY_OPTIONS.length

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold",
        allCompleted
          ? "bg-green-500/20 text-green-600"
          : "bg-[var(--primary)]/20 text-[var(--primary)]",
        className
      )}
    >
      <CheckCircle2 className="w-3 h-3" />
      {allCompleted ? 'Complete' : `${completedCount}/${ACTIVITY_OPTIONS.length}`}
    </div>
  )
}

export default ActivitySelector
