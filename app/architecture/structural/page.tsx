'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  HardHat, Gamepad2, Brain, Layers, Shuffle, Check, X, RotateCcw,
  ChevronRight, Trophy, Timer, Zap, Target, ArrowLeft, Play,
  BookOpen, Lightbulb, GripVertical
} from 'lucide-react'
import {
  getAllStructuralComparisonSets,
  bracingTypesComparison,
  trussTypesComparison,
  foundationTypesComparison,
  loadTypesComparison,
} from '@/lib/architecture/structuralComparisonSets'
import type { ComparisonSet } from '@/lib/architecture/comparisonSets'

// Game modes available
type GameMode = 'flashcard' | 'matching' | 'comparison' | 'diagram'

// All structural sets for the games
const STRUCTURAL_SETS = [
  bracingTypesComparison,
  trussTypesComparison,
  foundationTypesComparison,
  loadTypesComparison,
]

// Flatten all elements from all sets for flashcard game
function getAllStructuralElements() {
  const elements: Array<{
    id: string
    name: string
    component: React.FC<{ showHalo?: boolean }>
    category: string
    categoryName: string
  }> = []

  STRUCTURAL_SETS.forEach(set => {
    set.elements.forEach(el => {
      elements.push({
        id: el.id,
        name: el.name,
        component: el.component,
        category: set.id,
        categoryName: set.title,
      })
    })
  })

  return elements
}

// =============================================================================
// FLASHCARD GAME COMPONENT
// =============================================================================
function FlashcardGame({ onBack }: { onBack: () => void }) {
  const allElements = useMemo(() => getAllStructuralElements(), [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showResult, setShowResult] = useState<'correct' | 'wrong' | null>(null)
  const [gameElements, setGameElements] = useState<typeof allElements>([])
  const [options, setOptions] = useState<typeof allElements>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

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
    }
  }, [currentIndex, gameElements, isPlaying, allElements])

  const handleAnswer = (answerId: string) => {
    if (showResult) return

    const correct = answerId === gameElements[currentIndex].id
    setShowResult(correct ? 'correct' : 'wrong')

    if (correct) {
      setScore(s => s + 1)
      setStreak(s => s + 1)
    } else {
      setStreak(0)
    }

    setTimeout(() => {
      setShowResult(null)
      if (currentIndex + 1 >= gameElements.length) {
        setGameComplete(true)
        setIsPlaying(false)
      } else {
        setCurrentIndex(i => i + 1)
      }
    }, 1000)
  }

  if (!isPlaying && !gameComplete) {
    return (
      <div className="text-center py-12">
        <HardHat className="w-16 h-16 mx-auto mb-4 text-blue-500" />
        <h3 className="text-2xl font-bold mb-2">Structural Flashcards</h3>
        <p className="text-muted-foreground mb-6">
          Identify structural elements from their diagrams. 10 questions, beat your best score!
        </p>
        <button
          onClick={startGame}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          <Play className="w-5 h-5 inline mr-2" />
          Start Game
        </button>
      </div>
    )
  }

  if (gameComplete) {
    return (
      <div className="text-center py-12">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h3 className="text-2xl font-bold mb-2">Game Complete!</h3>
        <p className="text-4xl font-black text-blue-600 mb-4">{score}/10</p>
        <p className="text-muted-foreground mb-6">
          {score === 10 ? 'Perfect score! Structural master!' :
           score >= 7 ? 'Great job! You know your structures!' :
           score >= 5 ? 'Good effort! Keep practicing!' :
           'Keep learning, you\'ll get better!'}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={startGame}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
          >
            <RotateCcw className="w-4 h-4 inline mr-2" />
            Play Again
          </button>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-muted text-foreground rounded-lg font-bold hover:bg-muted/80"
          >
            Back to Menu
          </button>
        </div>
      </div>
    )
  }

  const current = gameElements[currentIndex]

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${((currentIndex + 1) / gameElements.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold">{currentIndex + 1}/{gameElements.length}</span>
        <div className="flex items-center gap-1 text-yellow-500">
          <Zap className="w-4 h-4" />
          <span className="font-bold">{streak}</span>
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground mb-2">{current.categoryName}</p>
        <h4 className="text-lg font-bold">What type of {current.categoryName.toLowerCase().replace(' systems', '').replace(' types', '')} is this?</h4>
      </div>

      {/* SVG Display */}
      <div className={`relative w-48 h-48 mx-auto mb-8 rounded-xl border-4 transition-colors ${
        showResult === 'correct' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
        showResult === 'wrong' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
        'border-border bg-background'
      }`}>
        <current.component showHalo={false} />
        {showResult && (
          <div className={`absolute inset-0 flex items-center justify-center ${
            showResult === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            {showResult === 'correct' ? (
              <Check className="w-16 h-16 text-green-500" />
            ) : (
              <X className="w-16 h-16 text-red-500" />
            )}
          </div>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(option.id)}
            disabled={showResult !== null}
            className={`p-4 rounded-xl font-bold text-left transition-all ${
              showResult && option.id === current.id
                ? 'bg-green-500 text-white'
                : showResult && option.id !== current.id
                ? 'bg-muted opacity-50'
                : 'bg-muted hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:border-blue-500 border-2 border-transparent'
            }`}
          >
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

// =============================================================================
// MATCHING GAME COMPONENT
// =============================================================================
function MatchingGame({ onBack }: { onBack: () => void }) {
  const [selectedSet, setSelectedSet] = useState<ComparisonSet | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [wrongPair, setWrongPair] = useState<string | null>(null)
  const [gameComplete, setGameComplete] = useState(false)
  const [shuffledItems, setShuffledItems] = useState<Array<{ id: string; text: string; correctElementId: string }>>([])

  const startGame = (set: ComparisonSet) => {
    setSelectedSet(set)
    setMatchedPairs([])
    setSelectedItem(null)
    setGameComplete(false)
    if (set.matchingGame) {
      setShuffledItems([...set.matchingGame.items].sort(() => Math.random() - 0.5))
    }
  }

  const handleElementClick = (elementId: string) => {
    if (matchedPairs.includes(elementId) || !selectedItem) return

    const matchingItem = shuffledItems.find(item => item.id === selectedItem)
    if (matchingItem?.correctElementId === elementId) {
      const newMatched = [...matchedPairs, elementId]
      setMatchedPairs(newMatched)
      setSelectedItem(null)
      if (newMatched.length === shuffledItems.length) {
        setGameComplete(true)
      }
    } else {
      setWrongPair(elementId)
      setTimeout(() => setWrongPair(null), 500)
    }
  }

  const handleDescriptionClick = (itemId: string) => {
    const item = shuffledItems.find(i => i.id === itemId)
    if (item && matchedPairs.includes(item.correctElementId)) return
    setSelectedItem(selectedItem === itemId ? null : itemId)
  }

  if (!selectedSet) {
    return (
      <div className="py-8">
        <h3 className="text-xl font-bold text-center mb-6">Choose a Matching Game</h3>
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {STRUCTURAL_SETS.filter(set => set.matchingGame).map((set) => (
            <button
              key={set.id}
              onClick={() => startGame(set)}
              className="p-6 rounded-xl bg-muted hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-left"
            >
              <h4 className="font-bold mb-1">{set.title}</h4>
              <p className="text-sm text-muted-foreground">{set.matchingGame?.items.length} pairs to match</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (gameComplete) {
    return (
      <div className="text-center py-12">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h3 className="text-2xl font-bold mb-2">All Matched!</h3>
        <p className="text-muted-foreground mb-6">You matched all {matchedPairs.length} pairs correctly!</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => startGame(selectedSet)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold"
          >
            Play Again
          </button>
          <button
            onClick={() => setSelectedSet(null)}
            className="px-6 py-2 bg-muted rounded-lg font-bold"
          >
            Choose Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setSelectedSet(null)} className="text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 inline mr-1" /> Back
        </button>
        <h3 className="font-bold">{selectedSet.title}</h3>
        <span className="text-sm">{matchedPairs.length}/{shuffledItems.length} matched</span>
      </div>

      <p className="text-center text-muted-foreground mb-6">{selectedSet.matchingGame?.question}</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Descriptions */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-muted-foreground mb-2">Descriptions</h4>
          {shuffledItems.map((item) => {
            const isMatched = matchedPairs.includes(item.correctElementId)
            return (
              <button
                key={item.id}
                onClick={() => handleDescriptionClick(item.id)}
                disabled={isMatched}
                className={`w-full p-3 rounded-lg text-left text-sm transition-all ${
                  isMatched
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 opacity-60'
                    : selectedItem === item.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {item.text}
              </button>
            )
          })}
        </div>

        {/* Elements */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-muted-foreground mb-2">Elements</h4>
          <div className="grid grid-cols-2 gap-3">
            {selectedSet.elements.map((element) => {
              const isMatched = matchedPairs.includes(element.id)
              const isWrong = wrongPair === element.id
              return (
                <button
                  key={element.id}
                  onClick={() => handleElementClick(element.id)}
                  disabled={isMatched || !selectedItem}
                  className={`p-3 rounded-lg transition-all ${
                    isMatched
                      ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500'
                      : isWrong
                      ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500 animate-shake'
                      : selectedItem
                      ? 'bg-muted hover:bg-blue-100 dark:hover:bg-blue-900/30 cursor-pointer'
                      : 'bg-muted opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="w-16 h-16 mx-auto mb-2">
                    <element.component showHalo={false} />
                  </div>
                  <p className="text-xs font-bold text-center">{element.name}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// COMPARISON (CONFUSION BUSTER) COMPONENT
// =============================================================================
function ComparisonGame({ onBack }: { onBack: () => void }) {
  const [selectedSet, setSelectedSet] = useState<ComparisonSet | null>(null)
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  if (!selectedSet) {
    return (
      <div className="py-8">
        <h3 className="text-xl font-bold text-center mb-2">Confusion Buster</h3>
        <p className="text-center text-muted-foreground mb-6">Compare similar structural elements side-by-side</p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {getAllStructuralComparisonSets().map((set) => (
            <button
              key={set.id}
              onClick={() => setSelectedSet(set)}
              className="p-6 rounded-xl bg-muted hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-left"
            >
              <h4 className="font-bold mb-1">{set.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{set.subtitle}</p>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-0.5 bg-background rounded">{set.elements.length} elements</span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  set.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                  set.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>{set.difficulty}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setSelectedSet(null)} className="text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 inline mr-1" /> Back
        </button>
        <div className="text-center">
          <h3 className="font-bold">{selectedSet.title}</h3>
          <p className="text-sm text-muted-foreground">{selectedSet.subtitle}</p>
        </div>
        <div />
      </div>

      {/* Memory tip */}
      {selectedSet.memoryTip && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm text-amber-700 dark:text-amber-300">Memory Tip</p>
              <p className="text-sm text-amber-800 dark:text-amber-200">{selectedSet.memoryTip}</p>
            </div>
          </div>
        </div>
      )}

      {/* Elements Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {selectedSet.elements.map((element) => (
          <div key={element.id} className="text-center">
            <div className="w-24 h-24 mx-auto mb-2 rounded-lg border bg-background p-2">
              <element.component showHalo={false} />
            </div>
            <p className="font-bold text-sm">{element.name}</p>
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted">
              <th className="text-left p-3 font-bold border-r">Feature</th>
              {selectedSet.elements.map((el) => (
                <th key={el.id} className="text-center p-3 font-bold text-sm">{el.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedSet.features.map((feature, idx) => (
              <tr
                key={feature.label}
                className={`${idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'} ${
                  feature.highlighted ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                } ${selectedFeature === feature.label ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedFeature(selectedFeature === feature.label ? null : feature.label)}
              >
                <td className="p-3 font-bold text-sm border-r">
                  {feature.highlighted && <span className="text-blue-500 mr-1">*</span>}
                  {feature.label}
                </td>
                {selectedSet.elements.map((el) => (
                  <td key={el.id} className="p-3 text-sm text-center">
                    {feature.values[el.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Historical Timeline */}
      {selectedSet.historicalTimeline && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm font-bold mb-1">Historical Timeline</p>
          <p className="text-sm text-muted-foreground">{selectedSet.historicalTimeline}</p>
        </div>
      )}
    </div>
  )
}

// =============================================================================
// DIAGRAM BUILDER COMPONENT
// =============================================================================
function DiagramBuilder({ onBack }: { onBack: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentElement, setCurrentElement] = useState<number>(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const categoryElements = useMemo(() => {
    if (!selectedCategory) return []
    const set = STRUCTURAL_SETS.find(s => s.id === selectedCategory)
    return set?.elements || []
  }, [selectedCategory])

  const categoryFeatures = useMemo(() => {
    if (!selectedCategory) return []
    const set = STRUCTURAL_SETS.find(s => s.id === selectedCategory)
    return set?.features.filter(f => f.highlighted).slice(0, 3) || []
  }, [selectedCategory])

  const handleAnswer = (featureLabel: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [`${currentElement}-${featureLabel}`]: answer }))
  }

  const checkAnswers = () => {
    if (!selectedCategory) return
    const set = STRUCTURAL_SETS.find(s => s.id === selectedCategory)
    if (!set) return

    let correct = 0
    categoryElements.forEach((el, idx) => {
      categoryFeatures.forEach(feature => {
        const userAnswer = answers[`${idx}-${feature.label}`]
        const correctAnswer = feature.values[el.id]
        if (userAnswer === correctAnswer) correct++
      })
    })
    setScore(correct)
    setShowResults(true)
  }

  if (!selectedCategory) {
    return (
      <div className="py-8">
        <h3 className="text-xl font-bold text-center mb-2">Diagram Builder</h3>
        <p className="text-center text-muted-foreground mb-6">Label structural diagrams with the correct features</p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {STRUCTURAL_SETS.map((set) => (
            <button
              key={set.id}
              onClick={() => {
                setSelectedCategory(set.id)
                setCurrentElement(0)
                setAnswers({})
                setShowResults(false)
              }}
              className="p-6 rounded-xl bg-muted hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors text-left"
            >
              <h4 className="font-bold mb-1">{set.title}</h4>
              <p className="text-sm text-muted-foreground">{set.elements.length} elements to label</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (showResults) {
    const total = categoryElements.length * categoryFeatures.length
    return (
      <div className="text-center py-12">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h3 className="text-2xl font-bold mb-2">Results</h3>
        <p className="text-4xl font-black text-teal-600 mb-4">{score}/{total}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              setAnswers({})
              setCurrentElement(0)
              setShowResults(false)
            }}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg font-bold"
          >
            Try Again
          </button>
          <button
            onClick={() => setSelectedCategory(null)}
            className="px-6 py-2 bg-muted rounded-lg font-bold"
          >
            Choose Another
          </button>
        </div>
      </div>
    )
  }

  const element = categoryElements[currentElement]
  const set = STRUCTURAL_SETS.find(s => s.id === selectedCategory)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setSelectedCategory(null)} className="text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 inline mr-1" /> Back
        </button>
        <span className="font-bold">{currentElement + 1}/{categoryElements.length}</span>
      </div>

      {/* Element display */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/2">
          <div className="w-48 h-48 mx-auto rounded-xl border-4 border-teal-500 bg-background p-4">
            <element.component showHalo={false} />
          </div>
          <p className="text-center font-bold mt-4">{element.name}</p>
        </div>

        {/* Labels to fill */}
        <div className="w-full md:w-1/2 space-y-4">
          <h4 className="font-bold">Fill in the features:</h4>
          {categoryFeatures.map((feature) => (
            <div key={feature.label} className="space-y-1">
              <label className="text-sm font-medium">{feature.label}</label>
              <select
                value={answers[`${currentElement}-${feature.label}`] || ''}
                onChange={(e) => handleAnswer(feature.label, e.target.value)}
                className="w-full p-2 rounded-lg border bg-background"
              >
                <option value="">Select...</option>
                {categoryElements.map((el) => (
                  <option key={el.id} value={feature.values[el.id]}>
                    {feature.values[el.id]}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentElement(i => Math.max(0, i - 1))}
          disabled={currentElement === 0}
          className="px-4 py-2 rounded-lg bg-muted disabled:opacity-50"
        >
          Previous
        </button>
        {currentElement < categoryElements.length - 1 ? (
          <button
            onClick={() => setCurrentElement(i => i + 1)}
            className="px-4 py-2 rounded-lg bg-teal-600 text-white font-bold"
          >
            Next
          </button>
        ) : (
          <button
            onClick={checkAnswers}
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-bold"
          >
            Check Answers
          </button>
        )}
      </div>
    </div>
  )
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================
export default function StructuralEngineeringPage() {
  const [activeMode, setActiveMode] = useState<GameMode | null>(null)

  const gameModes = [
    {
      id: 'flashcard' as GameMode,
      name: 'Flashcard Match',
      description: 'Identify structural elements from their diagrams',
      icon: Gamepad2,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'matching' as GameMode,
      name: 'Matching Game',
      description: 'Match descriptions to structural elements',
      icon: Shuffle,
      color: 'from-green-500 to-emerald-600',
    },
    {
      id: 'comparison' as GameMode,
      name: 'Confusion Buster',
      description: 'Compare similar elements side-by-side',
      icon: Brain,
      color: 'from-purple-500 to-indigo-600',
    },
    {
      id: 'diagram' as GameMode,
      name: 'Diagram Builder',
      description: 'Label structural diagrams with correct features',
      icon: Layers,
      color: 'from-teal-500 to-cyan-600',
    },
  ]

  const stats = useMemo(() => {
    const allSets = getAllStructuralComparisonSets()
    const totalElements = allSets.reduce((acc, set) => acc + set.elements.length, 0)
    return {
      sets: allSets.length,
      elements: totalElements,
      categories: 4,
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-blue-900/20 via-background to-indigo-900/20">
        <div className="container py-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/architecture" className="hover:text-foreground transition-colors">
              Architecture
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Structural Engineering</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <HardHat className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black">Structural Engineering</h1>
              <p className="text-muted-foreground">Master bracing, trusses, foundations, and load types</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-6">
            <div className="text-center">
              <p className="text-2xl font-black text-blue-500">{stats.sets}</p>
              <p className="text-xs text-muted-foreground">Learning Sets</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-indigo-500">{stats.elements}</p>
              <p className="text-xs text-muted-foreground">Elements</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-purple-500">{stats.categories}</p>
              <p className="text-xs text-muted-foreground">Categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        <AnimatePresence mode="wait">
          {!activeMode ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Game Mode Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {gameModes.map((mode) => {
                  const Icon = mode.icon
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setActiveMode(mode.id)}
                      className="group p-6 rounded-2xl bg-muted hover:bg-gradient-to-br hover:from-muted hover:to-background border-2 border-transparent hover:border-blue-500/50 transition-all text-left"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-1">{mode.name}</h3>
                      <p className="text-sm text-muted-foreground">{mode.description}</p>
                    </button>
                  )
                })}
              </div>

              {/* Category Overview */}
              <div>
                <h2 className="text-xl font-bold mb-4">What You'll Learn</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {STRUCTURAL_SETS.map((set) => (
                    <div key={set.id} className="p-4 rounded-xl bg-muted/50 border">
                      <h4 className="font-bold mb-1">{set.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{set.subtitle}</p>
                      <p className="text-xs text-muted-foreground">{set.elements.length} elements</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Back button */}
              <button
                onClick={() => setActiveMode(null)}
                className="mb-6 text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Games
              </button>

              {/* Game Components */}
              {activeMode === 'flashcard' && <FlashcardGame onBack={() => setActiveMode(null)} />}
              {activeMode === 'matching' && <MatchingGame onBack={() => setActiveMode(null)} />}
              {activeMode === 'comparison' && <ComparisonGame onBack={() => setActiveMode(null)} />}
              {activeMode === 'diagram' && <DiagramBuilder onBack={() => setActiveMode(null)} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
