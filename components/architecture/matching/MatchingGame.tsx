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
      // Delay the onComplete callback to show the success animation
      setTimeout(() => {
        onComplete()
      }, 2000)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-lg border-2 border-purple-500/30 p-6 md:p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
              Matching Challenge
            </h2>
            <Sparkles className="w-6 h-6 text-purple-500" />
          </div>
          <p className="text-lg text-[var(--muted-foreground)]">
            {question}
          </p>
        </div>

        {/* Elements with drop zones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {elements.map(element => {
            const ElementComponent = element.component
            const assignedItemId = slotAssignments[element.id]
            const assignedItem = items.find(i => i.id === assignedItemId)
            const isCorrect = showFeedback[element.id]
            const hasAssignment = !!assignedItemId
            const isDragOver = dragOverSlot === element.id

            return (
              <div key={element.id} className="flex flex-col items-center gap-4">
                {/* Element name and SVG */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                    {element.name}
                  </h3>
                  <div className="bg-[var(--card)] rounded-lg p-4 border border-[var(--border)]">
                    <ElementComponent showHalo={false} />
                  </div>
                </div>

                {/* Drop zone */}
                <div
                  onDragOver={(e) => handleDragOver(e, element.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, element.id)}
                  className={`
                    w-full min-h-[100px] rounded-lg border-2 border-dashed
                    flex items-center justify-center p-4 transition-all
                    ${isDragOver ? 'border-purple-500 bg-purple-500/20 scale-105' : ''}
                    ${!hasAssignment && !isDragOver ? 'border-[var(--border)] bg-[var(--card)]/50' : ''}
                    ${hasAssignment && !hasChecked ? 'border-blue-500 bg-blue-500/10' : ''}
                    ${hasChecked && isCorrect ? 'border-green-500 bg-green-500/10' : ''}
                    ${hasChecked && !isCorrect && hasAssignment ? 'border-red-500 bg-red-500/10' : ''}
                  `}
                >
                  {hasAssignment ? (
                    <div
                      draggable
                      onDragStart={() => handleDragStartFromSlot(element.id)}
                      className="cursor-move text-center relative group"
                    >
                      <p className="text-sm font-medium text-[var(--foreground)] leading-snug">
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
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-500" />
                          )}
                        </motion.div>
                      )}

                      {/* Hover hint */}
                      {!hasChecked && (
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                          <span className="text-xs text-[var(--muted-foreground)]">
                            Drag to move
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--muted-foreground)]">
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
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3 text-center">
              Drag these descriptions to match:
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
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
                    rounded-lg px-4 py-3 cursor-move
                    hover:shadow-lg hover:border-purple-500
                    transition-all max-w-[300px]
                  "
                >
                  <p className="text-sm font-medium text-[var(--foreground)] leading-snug text-center">
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
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-3"
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
              className="mt-6 text-center"
            >
              <div className="inline-block bg-amber-500/20 border border-amber-500/50 rounded-lg px-6 py-3">
                <p className="text-amber-600 dark:text-amber-400 font-medium">
                  Not quite right! Try rearranging the incorrect matches.
                </p>
              </div>
            </motion.div>
          )}

          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 text-center"
            >
              <div className="inline-block bg-green-500/20 border-2 border-green-500 rounded-lg px-8 py-4">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    Perfect! 🎉
                  </p>
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-[var(--muted-foreground)]">
                  Loading the full comparison...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
