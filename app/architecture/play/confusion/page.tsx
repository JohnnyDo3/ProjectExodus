'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Brain, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import ArchitectureComparison from '@/components/architecture/comparison/ArchitectureComparison'
import MatchingGame from '@/components/architecture/matching/MatchingGame'
import {
  getAllComparisonSets,
} from '@/lib/architecture/comparisonSets'

type Phase = 'study' | 'game'

export default function ConfusionBusterPage() {
  const allSets = getAllComparisonSets()
  const [currentSetIndex, setCurrentSetIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('study')

  const currentSet = allSets[currentSetIndex]

  // Reset to study phase when changing sets
  useEffect(() => {
    setPhase('study')
  }, [currentSetIndex])

  function handleNextSet() {
    if (currentSetIndex < allSets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1)
    }
  }

  function handlePreviousSet() {
    if (currentSetIndex > 0) {
      setCurrentSetIndex(currentSetIndex - 1)
    }
  }

  function handleProceedToGame() {
    setPhase('game')
  }

  function handleGameComplete() {
    // User can manually advance or it will auto-advance
    // Auto-advance removed - user controls navigation
  }

  return (
    <div className="min-h-screen lg:h-screen bg-[var(--background)] flex flex-col lg:overflow-hidden">
      {/* Header */}
      <div className="bg-[var(--background)]/95 backdrop-blur border-b border-[var(--border)] sticky top-0 z-10 flex-shrink-0">
        <div className="container mx-auto" style={{ padding: 'clamp(0.5rem, 1vh, 1rem)' }}>
          <div
            className="flex items-center justify-between flex-wrap"
            style={{ gap: 'clamp(0.5rem, 1vw, 1rem)' }}
          >
            <div
              className="flex items-center"
              style={{ gap: 'clamp(0.5rem, 1vw, 1rem)' }}
            >
              <Link href="/architecture/play">
                <Button
                  variant="ghost"
                  size="sm"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                    padding: 'clamp(0.25rem, 0.5vh, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)'
                  }}
                >
                  <ArrowLeft style={{ width: 'clamp(0.75rem, 1.5vw, 1rem)', height: 'clamp(0.75rem, 1.5vw, 1rem)', marginRight: 'clamp(0.25rem, 0.5vw, 0.5rem)' }} />
                  Back
                </Button>
              </Link>
              <div>
                <h1
                  className="font-bold text-[var(--foreground)] flex items-center"
                  style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                    gap: 'clamp(0.25rem, 0.5vw, 0.5rem)'
                  }}
                >
                  <Brain
                    className="text-purple-500"
                    style={{
                      width: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                      height: 'clamp(1.25rem, 2.5vw, 1.5rem)'
                    }}
                  />
                  Confusion Buster
                </h1>
                <p
                  className="text-[var(--muted-foreground)]"
                  style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
                >
                  {phase === 'study' ? 'Study the comparison' : 'Test your knowledge'}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="text-right">
              <p
                className="font-semibold text-[var(--foreground)]"
                style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
              >
                Set {currentSetIndex + 1} of {allSets.length}
              </p>
              <p
                className="text-[var(--muted-foreground)]"
                style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.75rem)' }}
              >
                {currentSet.difficulty} • {currentSet.category} • {phase === 'study' ? 'Study' : 'Game'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container mx-auto max-w-7xl lg:flex-1 lg:overflow-y-auto lg:min-h-0"
        style={{
          padding: 'clamp(0.75rem, 2vh, 1.5rem)',
          paddingBottom: 'clamp(1rem, 2vh, 2rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(0.75rem, 1.5vh, 1.5rem)'
        }}
      >
        {/* Study Mode or Matching Game */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSetIndex}-${phase}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {phase === 'study' ? (
              <div className="flex flex-col h-full">
                <ArchitectureComparison comparisonSet={currentSet} mode="study" />

                {/* Navigation Controls */}
                <div
                  className="flex flex-col"
                  style={{
                    marginTop: 'clamp(1rem, 2vh, 1.5rem)',
                    gap: 'clamp(0.75rem, 1.5vh, 1rem)'
                  }}
                >
                  {/* Primary Action - Test Knowledge or Next Pair */}
                  <div className="flex justify-center items-center">
                    {currentSet.matchingGame ? (
                      <Button
                        onClick={handleProceedToGame}
                        size="lg"
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold"
                        style={{
                          fontSize: 'clamp(0.875rem, 1.75vw, 1rem)',
                          padding: 'clamp(0.5rem, 1vh, 0.75rem) clamp(1.5rem, 3vw, 2rem)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'clamp(0.375rem, 0.75vw, 0.5rem)'
                        }}
                      >
                        Next: Test Your Knowledge
                        <ArrowRight style={{ width: 'clamp(1rem, 2vw, 1.25rem)', height: 'clamp(1rem, 2vw, 1.25rem)' }} />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNextSet}
                        disabled={currentSetIndex === allSets.length - 1}
                        size="lg"
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          fontSize: 'clamp(0.875rem, 1.75vw, 1rem)',
                          padding: 'clamp(0.5rem, 1vh, 0.75rem) clamp(1.5rem, 3vw, 2rem)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'clamp(0.375rem, 0.75vw, 0.5rem)'
                        }}
                      >
                        Next Pair
                        <ArrowRight style={{ width: 'clamp(1rem, 2vw, 1.25rem)', height: 'clamp(1rem, 2vw, 1.25rem)' }} />
                      </Button>
                    )}
                  </div>

                  {/* Secondary Navigation - Previous/Skip */}
                  <div
                    className="flex justify-center items-center flex-wrap"
                    style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}
                  >
                    <Button
                      variant="outline"
                      onClick={handlePreviousSet}
                      disabled={currentSetIndex === 0}
                      style={{
                        fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        padding: 'clamp(0.375rem, 1vh, 0.5rem) clamp(0.75rem, 2vw, 1rem)'
                      }}
                    >
                      ← Previous
                    </Button>

                    {currentSet.matchingGame && (
                      <Button
                        variant="ghost"
                        onClick={handleNextSet}
                        disabled={currentSetIndex === allSets.length - 1}
                        style={{
                          fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                          padding: 'clamp(0.375rem, 1vh, 0.5rem) clamp(0.75rem, 2vw, 1rem)'
                        }}
                      >
                        Skip Game →
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <MatchingGame
                  question={currentSet.matchingGame!.question}
                  elements={currentSet.elements}
                  items={currentSet.matchingGame!.items}
                  onComplete={handleGameComplete}
                />

                {/* Game Navigation */}
                <div
                  className="flex justify-center items-center flex-wrap"
                  style={{
                    marginTop: 'clamp(0.75rem, 1.5vh, 1rem)',
                    gap: 'clamp(0.5rem, 1vw, 0.75rem)'
                  }}
                >
                  <Button
                    variant="outline"
                    onClick={() => setPhase('study')}
                    style={{
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                      padding: 'clamp(0.375rem, 1vh, 0.5rem) clamp(0.75rem, 2vw, 1rem)'
                    }}
                  >
                    ← Back to Study
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleNextSet}
                    disabled={currentSetIndex === allSets.length - 1}
                    style={{
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                      padding: 'clamp(0.375rem, 1vh, 0.5rem) clamp(0.75rem, 2vw, 1rem)'
                    }}
                  >
                    Next Set →
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
