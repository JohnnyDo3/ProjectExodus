'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Brain } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ArchitectureComparison from '@/components/architecture/comparison/ArchitectureComparison'
import {
  getAllComparisonSets,
} from '@/lib/architecture/comparisonSets'

export default function ConfusionBusterPage() {
  const allSets = getAllComparisonSets()
  const [currentSetIndex, setCurrentSetIndex] = useState(0)

  const currentSet = allSets[currentSetIndex]

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
                  Study commonly confused pairs
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
                {currentSet.difficulty} • {currentSet.category}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container mx-auto max-w-7xl lg:flex-1 lg:overflow-y-auto lg:min-h-0"
        style={{
          padding: 'clamp(0.75rem, 2vh, 1.5rem)',
          paddingBottom: 'clamp(2rem, 5vh, 4rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(0.75rem, 1.5vh, 1.5rem)'
        }}
      >
        {/* Study Mode */}
        <motion.div
          key={currentSetIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <ArchitectureComparison comparisonSet={currentSet} mode="study" />

          {/* Navigation */}
          <div
            className="flex justify-between items-center flex-wrap"
            style={{
              marginTop: 'clamp(1rem, 2vh, 2rem)',
              gap: 'clamp(0.5rem, 1vw, 0.75rem)'
            }}
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
              ← Previous Pair
            </Button>

            <div className="flex-1" />

            <Button
              variant="outline"
              onClick={handleNextSet}
              disabled={currentSetIndex === allSets.length - 1}
              style={{
                fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                padding: 'clamp(0.375rem, 1vh, 0.5rem) clamp(0.75rem, 2vw, 1rem)'
              }}
            >
              Next Pair →
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
