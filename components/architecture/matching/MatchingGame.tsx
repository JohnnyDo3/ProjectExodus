'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export interface MatchingItem {
  id: string
  text: string
  correctElementId: string
}

export interface MatchingGameElement {
  id: string
  name: string
  component: React.FC<{ showHalo?: boolean }>
}

export interface MatchingGameProps {
  question: string
  elements: MatchingGameElement[]
  items: MatchingItem[]
  onComplete: () => void
}

interface DraggedItem {
  itemId: string
  text: string
}

export default function MatchingGame({ question, elements, items, onComplete }: MatchingGameProps) {
  // Track which item is in which slot
  const [slotAssignments, setSlotAssignments] = useState<Record<string, string>>({}) // elementId -> itemId
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null)
  const [dragOverSlot, setDragOverSlot] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({}) // elementId -> isCorrect
  const [isComplete, setIsComplete] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)

  // Get items that haven't been placed yet
  const availableItems = items.filter(item =>
    !Object.values(slotAssignments).includes(item.id)
  )

  // Check if all slots are filled
  const allSlotsFilled = elements.every(element => slotAssignments[element.id])

  // Handle drag start from available items
  const handleDragStart = (item: MatchingItem) => {
    setDraggedItem({ itemId: item.id, text: item.text })
  }

  // Handle drag start from a slot (to remove it)
  const handleDragStartFromSlot = (elementId: string) => {
    const itemId = slotAssignments[elementId]
    const item = items.find(i => i.id === itemId)
    if (item) {
      setDraggedItem({ itemId: item.id, text: item.text })
      // Remove from slot immediately
      setSlotAssignments(prev => {
        const newAssignments = { ...prev }
        delete newAssignments[elementId]
        return newAssignments
      })
    }
  }

  // Handle drag over slot
  const handleDragOver = (e: React.DragEvent, elementId: string) => {
    e.preventDefault()
    setDragOverSlot(elementId)
  }

  // Handle drag leave
  const handleDragLeave = () => {
    setDragOverSlot(null)
  }

  // Handle drop on slot
  const handleDrop = (e: React.DragEvent, elementId: string) => {
    e.preventDefault()
    setDragOverSlot(null)

    if (draggedItem) {
      // Update assignments
      setSlotAssignments(prev => ({
        ...prev,
        [elementId]: draggedItem.itemId
      }))
      setDraggedItem(null)

      // Clear feedback when user makes changes
      if (hasChecked) {
        setShowFeedback({})
        setHasChecked(false)
      }
    }
  }

  // Check answers
  const checkAnswers = () => {
    const feedback: Record<string, boolean> = {}
    let allCorrect = true

    elements.forEach(element => {
      const assignedItemId = slotAssignments[element.id]
      if (assignedItemId) {
        const item = items.find(i => i.id === assignedItemId)
        const isCorrect = item?.correctElementId === element.id
        feedback[element.id] = isCorrect
        if (!isCorrect) allCorrect = false
      } else {
        allCorrect = false
      }
    })

    setShowFeedback(feedback)
    setHasChecked(true)

    if (allCorrect) {
      setIsComplete(true)
    }
  }

  // Try again - reset the quiz
  const handleTryAgain = () => {
    setSlotAssignments({})
    setShowFeedback({})
    setHasChecked(false)
    setIsComplete(false)
  }

  // Proceed to next set
  const handleNext = () => {
    onComplete()
  }

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-lg border-2 border-purple-500/30 flex flex-col"
        style={{
          padding: 'clamp(0.75rem, 1.5vh, 1rem)',
          paddingBottom: 'clamp(1.5rem, 3vh, 2rem)',
          minHeight: 0,
          flex: 1,
          maxHeight: '100%',
          overflow: 'auto'
        }}
      >
        {/* Header */}
        <div
          className="text-center"
          style={{ marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)' }}
        >
          <div
            className="flex items-center justify-center mb-2"
            style={{ gap: 'clamp(0.25rem, 0.5vw, 0.5rem)' }}
          >
            <Sparkles
              className="text-purple-500"
              style={{ width: 'clamp(1rem, 2vw, 1.25rem)', height: 'clamp(1rem, 2vw, 1.25rem)' }}
            />
            <h2
              className="font-bold text-[var(--foreground)]"
              style={{ fontSize: 'clamp(1.125rem, 2.25vw, 1.5rem)' }}
            >
              Matching Challenge
            </h2>
            <Sparkles
              className="text-purple-500"
              style={{ width: 'clamp(1rem, 2vw, 1.25rem)', height: 'clamp(1rem, 2vw, 1.25rem)' }}
            />
          </div>
          <p
            className="text-[var(--muted-foreground)]"
            style={{ fontSize: 'clamp(0.875rem, 1.75vw, 1rem)' }}
          >
            {question}
          </p>
        </div>

        {/* Elements with drop zones */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            gap: 'clamp(0.75rem, 1.5vw, 1rem)',
            marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)'
          }}
        >
          {elements.map(element => {
            const ElementComponent = element.component
            const assignedItemId = slotAssignments[element.id]
            const assignedItem = items.find(i => i.id === assignedItemId)
            const isCorrect = showFeedback[element.id]
            const hasAssignment = !!assignedItemId
            const isDragOver = dragOverSlot === element.id

            return (
              <div
                key={element.id}
                className="flex flex-col items-center"
                style={{ gap: 'clamp(0.5rem, 1vh, 0.75rem)' }}
              >
                {/* Element name and SVG */}
                <div className="text-center w-full">
                  <h3
                    className="font-semibold text-[var(--foreground)]"
                    style={{
                      fontSize: 'clamp(0.875rem, 1.75vw, 1rem)',
                      marginBottom: 'clamp(0.375rem, 0.75vh, 0.5rem)'
                    }}
                  >
                    {element.name}
                  </h3>
                  <div
                    className="bg-[var(--card)] rounded-lg border border-[var(--border)] mx-auto"
                    style={{
                      padding: 'clamp(0.5rem, 1vh, 0.75rem)',
                      maxWidth: 'clamp(80px, 15vw, 120px)',
                      maxHeight: 'clamp(80px, 15vh, 120px)'
                    }}
                  >
                    <ElementComponent showHalo={false} />
                  </div>
                </div>

                {/* Drop zone */}
                <div
                  onDragOver={(e) => handleDragOver(e, element.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, element.id)}
                  className={`
                    w-full rounded-lg border-2 border-dashed
                    flex items-center justify-center transition-all
                    ${isDragOver ? 'border-purple-500 bg-purple-500/20 scale-105' : ''}
                    ${!hasAssignment && !isDragOver ? 'border-[var(--border)] bg-[var(--card)]/50' : ''}
                    ${hasAssignment && !hasChecked ? 'border-blue-500 bg-blue-500/10' : ''}
                    ${hasChecked && isCorrect ? 'border-green-500 bg-green-500/10' : ''}
                    ${hasChecked && !isCorrect && hasAssignment ? 'border-red-500 bg-red-500/10' : ''}
                  `}
                  style={{
                    minHeight: 'clamp(60px, 10vh, 80px)',
                    padding: 'clamp(0.5rem, 1vh, 0.75rem)'
                  }}
                >
                  {hasAssignment ? (
                    <div
                      draggable
                      onDragStart={() => handleDragStartFromSlot(element.id)}
                      className="cursor-move text-center relative group w-full"
                    >
                      <p
                        className="font-medium text-[var(--foreground)] leading-snug"
                        style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
                      >
                        {assignedItem?.text}
                      </p>

                      {/* Feedback icons */}
                      {hasChecked && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2"
                        >
                          {isCorrect ? (
                            <CheckCircle2
                              className="text-green-500"
                              style={{ width: 'clamp(1rem, 2vw, 1.25rem)', height: 'clamp(1rem, 2vw, 1.25rem)' }}
                            />
                          ) : (
                            <XCircle
                              className="text-red-500"
                              style={{ width: 'clamp(1rem, 2vw, 1.25rem)', height: 'clamp(1rem, 2vw, 1.25rem)' }}
                            />
                          )}
                        </motion.div>
                      )}

                      {/* Hover hint */}
                      {!hasChecked && (
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                          <span
                            className="text-[var(--muted-foreground)]"
                            style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.75rem)' }}
                          >
                            Drag to move
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p
                      className="text-[var(--muted-foreground)]"
                      style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
                    >
                      Drop answer here
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Available items */}
        {availableItems.length > 0 && (
          <div style={{ marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)' }}>
            <h3
              className="font-semibold text-[var(--foreground)] text-center"
              style={{
                fontSize: 'clamp(0.875rem, 1.75vw, 1rem)',
                marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)'
              }}
            >
              Drag these descriptions to match:
            </h3>
            <div
              className="flex flex-wrap justify-center"
              style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}
            >
              {availableItems.map(item => (
                <motion.div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className="
                    bg-gradient-to-br from-purple-500/20 to-blue-500/20
                    border-2 border-purple-500/50
                    rounded-lg cursor-move
                    hover:shadow-lg hover:border-purple-500
                    transition-all
                  "
                  style={{
                    padding: 'clamp(0.5rem, 1vh, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)',
                    maxWidth: 'clamp(200px, 40vw, 280px)'
                  }}
                >
                  <p
                    className="font-medium text-[var(--foreground)] leading-snug text-center"
                    style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
                  >
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Check button */}
        {allSlotsFilled && !isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Button
              onClick={checkAnswers}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold"
              style={{
                fontSize: 'clamp(0.875rem, 1.75vw, 1rem)',
                padding: 'clamp(0.5rem, 1vh, 0.625rem) clamp(1.5rem, 3vw, 2rem)'
              }}
            >
              Check My Answers
            </Button>
          </motion.div>
        )}

        {/* Feedback message */}
        <AnimatePresence>
          {hasChecked && !isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
              style={{ marginTop: 'clamp(0.75rem, 1.5vh, 1rem)', gap: 'clamp(0.75rem, 1.5vh, 1rem)' }}
            >
              <div
                className="inline-block bg-amber-500/20 border border-amber-500/50 rounded-lg"
                style={{ padding: 'clamp(0.5rem, 1vh, 0.75rem) clamp(1rem, 2vw, 1.5rem)' }}
              >
                <p
                  className="text-amber-600 dark:text-amber-400 font-medium"
                  style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
                >
                  Not quite right! You must get all correct to proceed.
                </p>
              </div>
              <Button
                onClick={handleTryAgain}
                size="lg"
                variant="outline"
                className="font-semibold"
                style={{
                  fontSize: 'clamp(0.875rem, 1.75vw, 1rem)',
                  padding: 'clamp(0.5rem, 1vh, 0.625rem) clamp(1.5rem, 3vw, 2rem)'
                }}
              >
                Try Again
              </Button>
            </motion.div>
          )}

          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
              style={{ marginTop: 'clamp(0.75rem, 1.5vh, 1rem)', gap: 'clamp(0.75rem, 1.5vh, 1rem)' }}
            >
              <div
                className="inline-block bg-green-500/20 border-2 border-green-500 rounded-lg"
                style={{ padding: 'clamp(0.75rem, 1.5vh, 1rem) clamp(1.5rem, 3vw, 2rem)' }}
              >
                <div
                  className="flex items-center justify-center mb-1"
                  style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}
                >
                  <CheckCircle2
                    className="text-green-500"
                    style={{ width: 'clamp(1.25rem, 2.5vw, 1.5rem)', height: 'clamp(1.25rem, 2.5vw, 1.5rem)' }}
                  />
                  <p
                    className="font-bold text-green-600 dark:text-green-400"
                    style={{ fontSize: 'clamp(1.125rem, 2.25vw, 1.5rem)' }}
                  >
                    Perfect! 🎉
                  </p>
                  <CheckCircle2
                    className="text-green-500"
                    style={{ width: 'clamp(1.25rem, 2.5vw, 1.5rem)', height: 'clamp(1.25rem, 2.5vw, 1.5rem)' }}
                  />
                </div>
                <p
                  className="text-[var(--muted-foreground)]"
                  style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
                >
                  You mastered this set! Click Next to continue.
                </p>
              </div>
              <Button
                onClick={handleNext}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold"
                style={{
                  fontSize: 'clamp(0.875rem, 1.75vw, 1rem)',
                  padding: 'clamp(0.5rem, 1vh, 0.625rem) clamp(1.5rem, 3vw, 2rem)'
                }}
              >
                Next Set →
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
