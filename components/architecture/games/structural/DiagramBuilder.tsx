'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Trophy, ArrowLeft } from 'lucide-react'
import { STRUCTURAL_SETS, GameProps } from './shared'

export function DiagramBuilder({ onBack }: { onBack: () => void }) {
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
