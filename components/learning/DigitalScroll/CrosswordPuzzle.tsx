'use client'

// ============================================
// SACRED BOOK CROSSWORD PUZZLE
// Educational crossword with level-appropriate difficulty
// ============================================

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { Check, Lightbulb, RotateCcw } from 'lucide-react'
import type { LearningLevel } from '@/types/learning'

// ============================================
// TYPES
// ============================================

interface CrosswordWord {
  id: string
  answer: string
  clue: string
}

interface PlacedWord {
  word: CrosswordWord
  row: number
  col: number
  direction: 'across' | 'down'
  number: number
}

interface Cell {
  letter: string
  wordIds: string[]
  number?: number
  isBlank: boolean
}

interface CrosswordPuzzleProps {
  words: CrosswordWord[]
  topicColor?: string
  level: LearningLevel
  onComplete?: (score: number) => void
  className?: string
}

// ============================================
// DIFFICULTY SETTINGS
// ============================================

const DIFFICULTY_BY_LEVEL: Record<LearningLevel, {
  gridSize: number
  maxWords: number
  showLetterHints: boolean
  revealOnWrong: boolean
}> = {
  ELEMENTARY: {
    gridSize: 8,
    maxWords: 4,
    showLetterHints: true,
    revealOnWrong: true,
  },
  MIDDLE_SCHOOL: {
    gridSize: 10,
    maxWords: 5,
    showLetterHints: true,
    revealOnWrong: false,
  },
  HIGH_SCHOOL: {
    gridSize: 12,
    maxWords: 6,
    showLetterHints: false,
    revealOnWrong: false,
  },
  UNDERGRADUATE: {
    gridSize: 14,
    maxWords: 8,
    showLetterHints: false,
    revealOnWrong: false,
  },
  GRADUATE: {
    gridSize: 15,
    maxWords: 10,
    showLetterHints: false,
    revealOnWrong: false,
  },
  PHD: {
    gridSize: 16,
    maxWords: 12,
    showLetterHints: false,
    revealOnWrong: false,
  },
}

// ============================================
// CROSSWORD GENERATOR
// ============================================

function generateCrossword(
  words: CrosswordWord[],
  gridSize: number
): { grid: Cell[][]; placedWords: PlacedWord[] } {
  // Sort words by length (longest first for better placement)
  const sortedWords = [...words].sort((a, b) => b.answer.length - a.answer.length)

  // Initialize empty grid
  const grid: Cell[][] = Array(gridSize).fill(null).map(() =>
    Array(gridSize).fill(null).map(() => ({
      letter: '',
      wordIds: [],
      isBlank: true,
    }))
  )

  const placedWords: PlacedWord[] = []
  let wordNumber = 1

  // Place first word horizontally in center
  if (sortedWords.length > 0) {
    const firstWord = sortedWords[0]
    const startRow = Math.floor(gridSize / 2)
    const startCol = Math.floor((gridSize - firstWord.answer.length) / 2)

    if (placeWord(grid, firstWord, startRow, startCol, 'across', gridSize)) {
      placedWords.push({
        word: firstWord,
        row: startRow,
        col: startCol,
        direction: 'across',
        number: wordNumber++,
      })
      grid[startRow][startCol].number = wordNumber - 1
    }
  }

  // Try to place remaining words
  for (let i = 1; i < sortedWords.length; i++) {
    const word = sortedWords[i]
    const placement = findBestPlacement(grid, word, placedWords, gridSize)

    if (placement) {
      if (placeWord(grid, word, placement.row, placement.col, placement.direction, gridSize)) {
        // Check if this position already has a number
        if (!grid[placement.row][placement.col].number) {
          grid[placement.row][placement.col].number = wordNumber++
        }
        placedWords.push({
          word,
          row: placement.row,
          col: placement.col,
          direction: placement.direction,
          number: grid[placement.row][placement.col].number || wordNumber - 1,
        })
      }
    }
  }

  return { grid, placedWords }
}

function placeWord(
  grid: Cell[][],
  word: CrosswordWord,
  row: number,
  col: number,
  direction: 'across' | 'down',
  gridSize: number
): boolean {
  const answer = word.answer.toUpperCase()

  // Check bounds
  if (direction === 'across' && col + answer.length > gridSize) return false
  if (direction === 'down' && row + answer.length > gridSize) return false

  // Place letters
  for (let i = 0; i < answer.length; i++) {
    const r = direction === 'across' ? row : row + i
    const c = direction === 'across' ? col + i : col

    grid[r][c].letter = answer[i]
    grid[r][c].wordIds.push(word.id)
    grid[r][c].isBlank = false
  }

  return true
}

function findBestPlacement(
  grid: Cell[][],
  word: CrosswordWord,
  placedWords: PlacedWord[],
  gridSize: number
): { row: number; col: number; direction: 'across' | 'down' } | null {
  const answer = word.answer.toUpperCase()

  // Look for intersection points with existing words
  for (const placed of placedWords) {
    const placedAnswer = placed.word.answer.toUpperCase()

    for (let i = 0; i < answer.length; i++) {
      for (let j = 0; j < placedAnswer.length; j++) {
        if (answer[i] === placedAnswer[j]) {
          // Found matching letter
          const newDirection: 'across' | 'down' = placed.direction === 'across' ? 'down' : 'across'

          let newRow: number
          let newCol: number

          if (newDirection === 'across') {
            newRow = placed.row + j
            newCol = placed.col - i
          } else {
            newRow = placed.row - i
            newCol = placed.col + j
          }

          // Check if placement is valid
          if (isValidPlacement(grid, answer, newRow, newCol, newDirection, gridSize)) {
            return { row: newRow, col: newCol, direction: newDirection }
          }
        }
      }
    }
  }

  return null
}

function isValidPlacement(
  grid: Cell[][],
  answer: string,
  row: number,
  col: number,
  direction: 'across' | 'down',
  gridSize: number
): boolean {
  // Check bounds
  if (row < 0 || col < 0) return false
  if (direction === 'across' && col + answer.length > gridSize) return false
  if (direction === 'down' && row + answer.length > gridSize) return false

  // Check each cell
  for (let i = 0; i < answer.length; i++) {
    const r = direction === 'across' ? row : row + i
    const c = direction === 'across' ? col + i : col

    const cell = grid[r][c]

    // Cell must be empty or have matching letter
    if (!cell.isBlank && cell.letter !== answer[i]) {
      return false
    }

    // Check adjacent cells — prevent parallel words running alongside each other
    // Only check adjacency for cells that are currently blank (not intersections)
    if (cell.isBlank) {
      if (direction === 'across') {
        // A blank cell that will become part of an across word shouldn't
        // have non-blank neighbors above or below (that would form accidental adjacency)
        if (r > 0 && !grid[r - 1][c].isBlank) return false
        if (r < gridSize - 1 && !grid[r + 1][c].isBlank) return false
      } else {
        // Same for down words — no non-blank neighbors to left or right
        if (c > 0 && !grid[r][c - 1].isBlank) return false
        if (c < gridSize - 1 && !grid[r][c + 1].isBlank) return false
      }
    }
  }

  // Check before and after the word
  if (direction === 'across') {
    if (col > 0 && !grid[row][col - 1].isBlank) return false
    if (col + answer.length < gridSize && !grid[row][col + answer.length].isBlank) return false
  } else {
    if (row > 0 && !grid[row - 1][col].isBlank) return false
    if (row + answer.length < gridSize && !grid[row + answer.length][col].isBlank) return false
  }

  return true
}

// ============================================
// CROSSWORD COMPONENT
// ============================================

export function CrosswordPuzzle({
  words,
  topicColor = 'var(--primary)',
  level,
  onComplete,
  className,
}: CrosswordPuzzleProps) {
  const settings = DIFFICULTY_BY_LEVEL[level]
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map())

  // Generate crossword
  const { grid, placedWords } = useMemo(() => {
    const eligible = words
      .filter(w => w.answer.length >= 3 && w.answer.length <= settings.gridSize - 2)
      .slice(0, settings.maxWords)
    return generateCrossword(eligible, settings.gridSize)
  }, [words, settings])

  // User input state
  const [userGrid, setUserGrid] = useState<string[][]>(() =>
    Array(settings.gridSize).fill(null).map(() =>
      Array(settings.gridSize).fill('')
    )
  )

  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)
  const [selectedDirection, setSelectedDirection] = useState<'across' | 'down'>('across')
  const [completedWords, setCompletedWords] = useState<string[]>([])
  const [revealedCells, setRevealedCells] = useState<Set<string>>(new Set())
  const [hasNotifiedComplete, setHasNotifiedComplete] = useState(false)

  // Reset userGrid when words/level change
  useEffect(() => {
    setUserGrid(Array(settings.gridSize).fill(null).map(() =>
      Array(settings.gridSize).fill('')
    ))
    setCompletedWords([])
    setRevealedCells(new Set())
    setSelectedCell(null)
    setHasNotifiedComplete(false)
  }, [words, settings.gridSize])

  // Check if word is complete
  const checkWordComplete = useCallback((wordId: string) => {
    const placed = placedWords.find(pw => pw.word.id === wordId)
    if (!placed) return false

    const answer = placed.word.answer.toUpperCase()
    for (let i = 0; i < answer.length; i++) {
      const r = placed.direction === 'across' ? placed.row : placed.row + i
      const c = placed.direction === 'across' ? placed.col + i : placed.col
      if (userGrid[r][c].toUpperCase() !== answer[i]) {
        return false
      }
    }
    return true
  }, [placedWords, userGrid])

  // Check all words on input change
  useEffect(() => {
    const newCompleted: string[] = []
    for (const pw of placedWords) {
      if (checkWordComplete(pw.word.id)) {
        newCompleted.push(pw.word.id)
      }
    }
    setCompletedWords(newCompleted)

    if (newCompleted.length === placedWords.length && placedWords.length > 0 && !hasNotifiedComplete) {
      setHasNotifiedComplete(true)
      const score = Math.round((1 - revealedCells.size / (placedWords.reduce((acc, pw) => acc + pw.word.answer.length, 0))) * 100)
      onComplete?.(Math.max(0, score))
    }
  }, [userGrid, placedWords, checkWordComplete, revealedCells.size, onComplete, hasNotifiedComplete])

  // Handle cell input
  const handleCellInput = (row: number, col: number, value: string) => {
    const letter = value.slice(-1).toUpperCase()

    setUserGrid(prev => {
      const newGrid = prev.map(r => [...r])
      newGrid[row][col] = letter
      return newGrid
    })

    // Move to next cell
    if (letter) {
      moveToNextCell(row, col)
    }
  }

  const moveToNextCell = (row: number, col: number) => {
    let nextRow = row
    let nextCol = col

    if (selectedDirection === 'across') {
      nextCol++
    } else {
      nextRow++
    }

    // Find next non-blank cell
    while (nextRow < settings.gridSize && nextCol < settings.gridSize) {
      if (!grid[nextRow][nextCol].isBlank) {
        setSelectedCell({ row: nextRow, col: nextCol })
        const input = inputRefs.current.get(`${nextRow}-${nextCol}`)
        input?.focus()
        return
      }
      if (selectedDirection === 'across') {
        nextCol++
      } else {
        nextRow++
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    if (e.key === 'Backspace' && !userGrid[row][col]) {
      // Move to previous cell
      let prevRow = row
      let prevCol = col

      if (selectedDirection === 'across') {
        prevCol--
      } else {
        prevRow--
      }

      if (prevRow >= 0 && prevCol >= 0 && !grid[prevRow][prevCol].isBlank) {
        setSelectedCell({ row: prevRow, col: prevCol })
        const input = inputRefs.current.get(`${prevRow}-${prevCol}`)
        input?.focus()
      }
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      let newRow = row
      let newCol = col

      if (e.key === 'ArrowRight') newCol++
      if (e.key === 'ArrowLeft') newCol--
      if (e.key === 'ArrowUp') newRow--
      if (e.key === 'ArrowDown') newRow++

      if (newRow >= 0 && newRow < settings.gridSize && newCol >= 0 && newCol < settings.gridSize) {
        if (!grid[newRow][newCol].isBlank) {
          setSelectedCell({ row: newRow, col: newCol })
          const input = inputRefs.current.get(`${newRow}-${newCol}`)
          input?.focus()
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      setSelectedDirection(prev => prev === 'across' ? 'down' : 'across')
    }
  }

  const revealLetter = (row: number, col: number) => {
    const letter = grid[row][col].letter
    setUserGrid(prev => {
      const newGrid = prev.map(r => [...r])
      newGrid[row][col] = letter
      return newGrid
    })
    setRevealedCells(prev => new Set([...prev, `${row}-${col}`]))
  }

  const resetPuzzle = () => {
    setUserGrid(Array(settings.gridSize).fill(null).map(() =>
      Array(settings.gridSize).fill('')
    ))
    setCompletedWords([])
    setRevealedCells(new Set())
    setSelectedCell(null)
    setHasNotifiedComplete(false)
  }

  // Calculate visible grid bounds
  const bounds = useMemo(() => {
    let minRow = settings.gridSize, maxRow = 0, minCol = settings.gridSize, maxCol = 0
    for (let r = 0; r < settings.gridSize; r++) {
      for (let c = 0; c < settings.gridSize; c++) {
        if (!grid[r][c].isBlank) {
          minRow = Math.min(minRow, r)
          maxRow = Math.max(maxRow, r)
          minCol = Math.min(minCol, c)
          maxCol = Math.max(maxCol, c)
        }
      }
    }
    return { minRow: Math.max(0, minRow - 1), maxRow: Math.min(settings.gridSize - 1, maxRow + 1), minCol: Math.max(0, minCol - 1), maxCol: Math.min(settings.gridSize - 1, maxCol + 1) }
  }, [grid, settings.gridSize])

  const isComplete = completedWords.length === placedWords.length && placedWords.length > 0

  if (placedWords.length === 0) {
    return (
      <div className={cn('w-full h-full flex items-center justify-center', className)}>
        <p className="text-sm text-[var(--muted-foreground)]">No crossword available</p>
      </div>
    )
  }

  return (
    <div className={cn('w-full h-full flex flex-col overflow-hidden', className)}>
      {/* Header */}
      <div className="text-center pb-1 shrink-0">
        <div className="flex items-center justify-center gap-2">
          <span className="text-base">📝</span>
          <h3 className="text-xs font-serif font-bold text-[var(--foreground)]">
            Crossword
          </h3>
        </div>
        <p className="text-[9px] text-[var(--muted-foreground)]">
          {completedWords.length}/{placedWords.length} words
        </p>
      </div>

      {/* Grid and Clues */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Grid */}
        <div className="flex-shrink-0 flex justify-center p-1">
          <div
            className="grid gap-px bg-[var(--border)]"
            style={{
              gridTemplateColumns: `repeat(${bounds.maxCol - bounds.minCol + 1}, 1fr)`,
            }}
          >
            {Array.from({ length: bounds.maxRow - bounds.minRow + 1 }).map((_, rowIdx) => {
              const row = bounds.minRow + rowIdx
              return Array.from({ length: bounds.maxCol - bounds.minCol + 1 }).map((_, colIdx) => {
                const col = bounds.minCol + colIdx
                const cell = grid[row][col]
                const isSelected = selectedCell?.row === row && selectedCell?.col === col
                const isWordComplete = cell.wordIds.some(id => completedWords.includes(id))
                const isRevealed = revealedCells.has(`${row}-${col}`)

                if (cell.isBlank) {
                  return (
                    <div
                      key={`${row}-${col}`}
                      className="w-5 h-5 bg-[var(--muted)]"
                    />
                  )
                }

                return (
                  <div
                    key={`${row}-${col}`}
                    className={cn(
                      'w-5 h-5 relative',
                      'bg-[var(--background)]',
                      isSelected && 'ring-1 ring-inset',
                      isWordComplete && 'bg-green-500/10'
                    )}
                    style={{ '--tw-ring-color': topicColor } as React.CSSProperties}
                  >
                    {cell.number && (
                      <span className="absolute top-0 left-0.5 text-[6px] text-[var(--muted-foreground)]">
                        {cell.number}
                      </span>
                    )}
                    <input
                      ref={(el) => {
                        if (el) inputRefs.current.set(`${row}-${col}`, el)
                      }}
                      type="text"
                      maxLength={1}
                      aria-label={`Cell row ${row + 1} column ${col + 1}${cell.number ? `, clue ${cell.number}` : ''}`}
                      value={userGrid[row][col]}
                      onChange={(e) => handleCellInput(row, col, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, row, col)}
                      onFocus={() => setSelectedCell({ row, col })}
                      className={cn(
                        'w-full h-full text-center text-[10px] font-bold uppercase',
                        'bg-transparent focus:outline-none',
                        isRevealed && 'text-orange-600',
                        isWordComplete && 'text-green-600'
                      )}
                    />
                  </div>
                )
              })
            })}
          </div>
        </div>

        {/* Clues */}
        <div className="flex-1 min-h-0 overflow-auto px-2 pb-1">
          <div className="grid grid-cols-2 gap-2 text-[8px]">
            {/* Across */}
            <div>
              <div className="font-bold text-[var(--foreground)] mb-0.5 uppercase tracking-wider">
                Across
              </div>
              {placedWords
                .filter(pw => pw.direction === 'across')
                .sort((a, b) => a.number - b.number)
                .map(pw => (
                  <div
                    key={pw.word.id}
                    className={cn(
                      'leading-tight py-0.5',
                      completedWords.includes(pw.word.id) && 'line-through opacity-50'
                    )}
                  >
                    <span className="font-bold">{pw.number}.</span>{' '}
                    {pw.word.clue}
                  </div>
                ))}
            </div>

            {/* Down */}
            <div>
              <div className="font-bold text-[var(--foreground)] mb-0.5 uppercase tracking-wider">
                Down
              </div>
              {placedWords
                .filter(pw => pw.direction === 'down')
                .sort((a, b) => a.number - b.number)
                .map(pw => (
                  <div
                    key={pw.word.id}
                    className={cn(
                      'leading-tight py-0.5',
                      completedWords.includes(pw.word.id) && 'line-through opacity-50'
                    )}
                  >
                    <span className="font-bold">{pw.number}.</span>{' '}
                    {pw.word.clue}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="shrink-0 pt-1 flex justify-center gap-2 px-2">
        {settings.showLetterHints && selectedCell && !grid[selectedCell.row][selectedCell.col].isBlank && (
          <button
            onClick={() => revealLetter(selectedCell.row, selectedCell.col)}
            className="text-[9px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center gap-0.5"
          >
            <Lightbulb className="w-3 h-3" />
            Hint
          </button>
        )}
        <button
          onClick={resetPuzzle}
          className="text-[9px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center gap-0.5"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Completion */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            className="absolute inset-0 bg-[var(--background)]/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">🎊</div>
              <p className="text-sm font-bold">Puzzle Complete!</p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {revealedCells.size > 0
                  ? `${revealedCells.size} hints used`
                  : 'Perfect!'}
              </p>
              <button
                onClick={resetPuzzle}
                className="mt-2 text-xs px-3 py-1 rounded bg-[var(--primary)] text-[var(--primary-foreground)]"
              >
                Play Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CrosswordPuzzle
