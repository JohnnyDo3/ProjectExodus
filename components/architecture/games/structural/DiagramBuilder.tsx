'use client'

import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Trophy, ArrowLeft, Volume2, VolumeX } from 'lucide-react'
import { STRUCTURAL_SETS, GameProps } from './shared'
import { useTextToSpeech } from '@/hooks/useTextToSpeech'

// Screen reader announcement component
function LiveRegion({ message }: { message: string }) {
  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {message}
    </div>
  )
}

export function DiagramBuilder({ onBack }: { onBack: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentElement, setCurrentElement] = useState<number>(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const [audioEnabled, setAudioEnabled] = useState(true)

  const firstSelectRef = useRef<HTMLSelectElement>(null)
  const { speak, isSupported: ttsSupported } = useTextToSpeech()

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

  // Focus first select when element changes
  useEffect(() => {
    if (selectedCategory && !showResults) {
      setTimeout(() => firstSelectRef.current?.focus(), 100)
    }
  }, [selectedCategory, currentElement, showResults])

  const handleCategorySelect = useCallback((categoryId: string, categoryTitle: string) => {
    setSelectedCategory(categoryId)
    setCurrentElement(0)
    setAnswers({})
    setShowResults(false)
    setAnnouncement(`Starting ${categoryTitle}. Label each structural element with the correct features.`)
  }, [])

  const handleAnswer = useCallback((featureLabel: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [`${currentElement}-${featureLabel}`]: answer }))
    if (answer) {
      setAnnouncement(`Selected ${answer} for ${featureLabel}.`)
    }
  }, [currentElement])

  const checkAnswers = useCallback(() => {
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
    const total = categoryElements.length * categoryFeatures.length
    setAnnouncement(`Results: ${correct} out of ${total} correct.`)
  }, [selectedCategory, categoryElements, categoryFeatures, answers])

  const navigateElement = useCallback((direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentElement > 0) {
      setCurrentElement(i => i - 1)
      const prevElement = categoryElements[currentElement - 1]
      setAnnouncement(`Element ${currentElement} of ${categoryElements.length}: ${prevElement?.name}`)
      if (audioEnabled && ttsSupported && prevElement) {
        speak(prevElement.name)
      }
    } else if (direction === 'next' && currentElement < categoryElements.length - 1) {
      setCurrentElement(i => i + 1)
      const nextElement = categoryElements[currentElement + 1]
      setAnnouncement(`Element ${currentElement + 2} of ${categoryElements.length}: ${nextElement?.name}`)
      if (audioEnabled && ttsSupported && nextElement) {
        speak(nextElement.name)
      }
    }
  }, [currentElement, categoryElements, audioEnabled, ttsSupported, speak])

  if (!selectedCategory) {
    return (
      <div className="py-8" role="region" aria-label="Diagram Builder Selection">
        <LiveRegion message={announcement} />
        <h3 className="text-xl font-bold text-center mb-2">Diagram Builder</h3>
        <p className="text-center text-muted-foreground mb-6">Label structural diagrams with the correct features</p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto" role="list">
          {STRUCTURAL_SETS.map((set) => (
            <button
              key={set.id}
              onClick={() => handleCategorySelect(set.id, set.title)}
              className="p-6 rounded-xl bg-muted hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              role="listitem"
              aria-label={`${set.title}: ${set.elements.length} elements to label`}
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
    const percentage = Math.round((score / total) * 100)
    return (
      <div className="text-center py-12" role="region" aria-label="Quiz Results">
        <LiveRegion message={`Quiz complete! You scored ${score} out of ${total}, which is ${percentage} percent.`} />
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" aria-hidden="true" />
        <h3 className="text-2xl font-bold mb-2">Results</h3>
        <p className="text-4xl font-black text-teal-600 mb-4" aria-label={`Score: ${score} out of ${total}`}>
          {score}/{total}
        </p>
        <p className="text-muted-foreground mb-6">
          {percentage >= 80 ? 'Excellent work!' : percentage >= 60 ? 'Good job!' : 'Keep practicing!'}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              setAnswers({})
              setCurrentElement(0)
              setShowResults(false)
              setAnnouncement('Starting over. Good luck!')
            }}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            aria-label="Try this quiz again"
          >
            Try Again
          </button>
          <button
            onClick={() => setSelectedCategory(null)}
            className="px-6 py-2 bg-muted rounded-lg font-bold hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Choose a different category"
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
    <div className="max-w-3xl mx-auto" role="region" aria-label="Diagram Labeling Quiz">
      <LiveRegion message={announcement} />

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className="text-sm text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1"
          aria-label="Go back to category selection"
        >
          <ArrowLeft className="w-4 h-4 inline mr-1" aria-hidden="true" /> Back
        </button>
        <span
          className="font-bold"
          aria-label={`Element ${currentElement + 1} of ${categoryElements.length}`}
        >
          {currentElement + 1}/{categoryElements.length}
        </span>
        {ttsSupported && (
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label={audioEnabled ? 'Disable audio' : 'Enable audio'}
            aria-pressed={audioEnabled}
          >
            {audioEnabled ? (
              <Volume2 className="w-4 h-4 text-teal-500" aria-hidden="true" />
            ) : (
              <VolumeX className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {/* Element display */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/2">
          <div
            className="w-48 h-48 mx-auto rounded-xl border-4 border-teal-500 bg-background p-4"
            role="img"
            aria-label={`Diagram of ${element.name}`}
          >
            <element.component showHalo={false} />
          </div>
          <p className="text-center font-bold mt-4">{element.name}</p>
          {ttsSupported && audioEnabled && (
            <button
              onClick={() => speak(element.name)}
              className="mx-auto mt-2 text-xs text-teal-600 hover:underline focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1 flex items-center gap-1"
              aria-label={`Hear pronunciation of ${element.name}`}
            >
              <Volume2 className="w-3 h-3" aria-hidden="true" />
              Hear name
            </button>
          )}
        </div>

        {/* Labels to fill */}
        <div className="w-full md:w-1/2 space-y-4">
          <h4 className="font-bold" id="feature-instructions">Fill in the features:</h4>
          <div role="group" aria-labelledby="feature-instructions">
            {categoryFeatures.map((feature, index) => (
              <div key={feature.label} className="space-y-1 mb-4">
                <label
                  htmlFor={`feature-${currentElement}-${index}`}
                  className="text-sm font-medium"
                >
                  {feature.label}
                </label>
                <select
                  ref={index === 0 ? firstSelectRef : undefined}
                  id={`feature-${currentElement}-${index}`}
                  value={answers[`${currentElement}-${feature.label}`] || ''}
                  onChange={(e) => handleAnswer(feature.label, e.target.value)}
                  className="w-full p-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-teal-500"
                  aria-describedby={`feature-hint-${index}`}
                >
                  <option value="">Select...</option>
                  {categoryElements.map((el) => (
                    <option key={el.id} value={feature.values[el.id]}>
                      {feature.values[el.id]}
                    </option>
                  ))}
                </select>
                <span id={`feature-hint-${index}`} className="sr-only">
                  Choose the correct {feature.label.toLowerCase()} for {element.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between mt-8" aria-label="Quiz navigation">
        <button
          onClick={() => navigateElement('prev')}
          disabled={currentElement === 0}
          className="px-4 py-2 rounded-lg bg-muted disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          aria-label="Go to previous element"
        >
          Previous
        </button>
        {currentElement < categoryElements.length - 1 ? (
          <button
            onClick={() => navigateElement('next')}
            className="px-4 py-2 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            aria-label="Go to next element"
          >
            Next
          </button>
        ) : (
          <button
            onClick={checkAnswers}
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label="Submit and check all answers"
          >
            Check Answers
          </button>
        )}
      </nav>
    </div>
  )
}
