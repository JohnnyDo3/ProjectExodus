'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Timer, Trophy, Layers, ChevronRight, RotateCcw, Home,
  Check, X, Target, MousePointer, Hand, ChevronDown
} from 'lucide-react'
import type { ArchitecturalElement, LearningLevel } from '@/data/architecture/types'
import { ALL_ELEMENTS } from '@/data/architecture/elements'
import { ArchitectureSVG } from './ArchitectureSVG'

interface DiagramLabel {
  id: string
  elementId: string
  x: number // percentage
  y: number // percentage
  position: 'top' | 'bottom' | 'left' | 'right'
}

interface DiagramStructure {
  id: string
  name: string
  description: string
  category: string
  imageUrl?: string
  labels: DiagramLabel[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

interface GameConfig {
  structureId?: string
  learningLevel: LearningLevel
  interactionMode: 'click' | 'drag'
}

interface GameState {
  phase: 'intro' | 'playing' | 'results'
  assignments: Record<string, string> // labelId -> elementId
  selectedWord: string | null
  correctCount: number
  startTime: number
  elapsed: number
  attempts: number
}

interface DiagramBuilderGameProps {
  config?: Partial<GameConfig>
  onComplete?: (results: GameState) => void
  onExit?: () => void
  showConfig?: boolean
}

const DEFAULT_CONFIG: GameConfig = {
  learningLevel: 'MIDDLE_SCHOOL',
  interactionMode: 'click',
}

// Define some diagram structures
const DIAGRAM_STRUCTURES: DiagramStructure[] = [
  {
    id: 'greek-temple',
    name: 'Greek Temple',
    description: 'Classic Greek temple with columns',
    category: 'Columns',
    difficulty: 'beginner',
    labels: [
      { id: 'l1', elementId: 'pediment', x: 50, y: 10, position: 'top' },
      { id: 'l2', elementId: 'entablature', x: 50, y: 25, position: 'right' },
      { id: 'l3', elementId: 'capital-corinthian', x: 25, y: 40, position: 'left' },
      { id: 'l4', elementId: 'shaft', x: 75, y: 60, position: 'right' },
      { id: 'l5', elementId: 'base', x: 25, y: 85, position: 'bottom' },
    ],
  },
  {
    id: 'gothic-cathedral',
    name: 'Gothic Cathedral',
    description: 'Medieval cathedral with flying buttresses',
    category: 'Arches',
    difficulty: 'intermediate',
    labels: [
      { id: 'l1', elementId: 'spire', x: 50, y: 5, position: 'top' },
      { id: 'l2', elementId: 'rose-window', x: 50, y: 30, position: 'left' },
      { id: 'l3', elementId: 'flying-buttress', x: 20, y: 50, position: 'left' },
      { id: 'l4', elementId: 'pointed-arch', x: 50, y: 65, position: 'right' },
      { id: 'l5', elementId: 'pier', x: 70, y: 80, position: 'right' },
    ],
  },
  {
    id: 'roman-arch',
    name: 'Roman Triumphal Arch',
    description: 'Ancient Roman arch structure',
    category: 'Arches',
    difficulty: 'beginner',
    labels: [
      { id: 'l1', elementId: 'keystone', x: 50, y: 20, position: 'top' },
      { id: 'l2', elementId: 'voussoir', x: 35, y: 30, position: 'left' },
      { id: 'l3', elementId: 'arch', x: 50, y: 40, position: 'right' },
      { id: 'l4', elementId: 'pier', x: 25, y: 70, position: 'left' },
      { id: 'l5', elementId: 'cornice', x: 75, y: 10, position: 'right' },
    ],
  },
]

export function DiagramBuilderGame({ config: userConfig, onComplete, onExit, showConfig = false }: DiagramBuilderGameProps) {
  // Config state
  const [selectedStructure, setSelectedStructure] = useState<string | undefined>(userConfig?.structureId)
  const [selectedMode, setSelectedMode] = useState<'click' | 'drag'>(userConfig?.interactionMode || 'click')

  const config = {
    ...DEFAULT_CONFIG,
    ...userConfig,
    ...(showConfig ? {
      structureId: selectedStructure,
      interactionMode: selectedMode
    } : {})
  }

  // Get current structure
  const currentStructure = DIAGRAM_STRUCTURES.find(s => s.id === (selectedStructure || config.structureId)) || DIAGRAM_STRUCTURES[0]

  // Game state
  const [gameState, setGameState] = useState<GameState>({
    phase: 'intro',
    assignments: {},
    selectedWord: null,
    correctCount: 0,
    startTime: 0,
    elapsed: 0,
    attempts: 0,
  })

  // Get elements for the word bank
  const wordBankElements = currentStructure.labels.map(label => {
    const element = ALL_ELEMENTS.find(el => el.id === label.elementId)
    return element
  }).filter(Boolean) as ArchitecturalElement[]

  // Shuffle word bank
  const [shuffledWords, setShuffledWords] = useState<ArchitecturalElement[]>([])

  useEffect(() => {
    setShuffledWords([...wordBankElements].sort(() => Math.random() - 0.5))
  }, [currentStructure.id])

  // Timer
  useEffect(() => {
    if (gameState.phase === 'playing') {
      const interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          elapsed: Date.now() - prev.startTime,
        }))
      }, 100)
      return () => clearInterval(interval)
    }
  }, [gameState.phase, gameState.startTime])

  // Start game
  const startGame = useCallback(() => {
    setGameState({
      phase: 'playing',
      assignments: {},
      selectedWord: null,
      correctCount: 0,
      startTime: Date.now(),
      elapsed: 0,
      attempts: 0,
    })
  }, [])

  // Handle word selection
  const handleWordClick = useCallback((elementId: string) => {
    if (gameState.phase !== 'playing') return

    setGameState(prev => ({
      ...prev,
      selectedWord: prev.selectedWord === elementId ? null : elementId,
    }))
  }, [gameState.phase])

  // Handle label click
  const handleLabelClick = useCallback((labelId: string) => {
    if (gameState.phase !== 'playing' || !gameState.selectedWord) return

    const label = currentStructure.labels.find(l => l.id === labelId)
    if (!label) return

    const isCorrect = label.elementId === gameState.selectedWord

    setGameState(prev => {
      const newAssignments = { ...prev.assignments, [labelId]: gameState.selectedWord! }
      const correctCount = currentStructure.labels.filter(
        l => newAssignments[l.id] === l.elementId
      ).length

      // Check if game is complete
      if (correctCount === currentStructure.labels.length) {
        setTimeout(() => {
          setGameState(state => ({
            ...state,
            phase: 'results',
            elapsed: Date.now() - state.startTime,
          }))
          onComplete?.(gameState)
        }, 500)
      }

      return {
        ...prev,
        assignments: newAssignments,
        selectedWord: null,
        correctCount,
        attempts: prev.attempts + 1,
      }
    })
  }, [gameState.phase, gameState.selectedWord, currentStructure, onComplete])

  // Format time
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const tenths = Math.floor((ms % 1000) / 100)
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}.${tenths}`
  }

  // Calculate accuracy
  const accuracy = gameState.attempts > 0
    ? Math.round((gameState.correctCount / gameState.attempts) * 100)
    : 0

  return (
    <div className="h-full bg-[var(--background)] flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Intro Phase */}
        {gameState.phase === 'intro' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center p-3 sm:p-4"
          >
            <Card className="max-w-2xl w-full border-2 border-[var(--border)]">
              <CardContent className="p-3 sm:p-4">
                <div className="text-center mb-3 sm:mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center"
                  >
                    <Layers className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </motion.div>

                  <h2 className="text-lg sm:text-xl font-black text-[var(--foreground)] mb-1">
                    Diagram Builder
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                    {showConfig ? 'Select a structure to label' : 'Label architectural elements on the diagram'}
                  </p>
                </div>

                {/* Structure Selection */}
                {showConfig && (
                  <div className="space-y-3 sm:space-y-4 mb-3 sm:mb-4">
                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-[var(--muted-foreground)] mb-1.5 block">
                        Choose Structure
                      </label>
                      <div className="grid gap-2">
                        {DIAGRAM_STRUCTURES.map((structure) => (
                          <button
                            key={structure.id}
                            onClick={() => setSelectedStructure(structure.id)}
                            className={`p-2 sm:p-3 rounded-lg border-2 transition-all text-left ${
                              selectedStructure === structure.id
                                ? 'border-teal-500 bg-teal-500/10'
                                : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-bold text-xs sm:text-sm text-[var(--foreground)] block">
                                  {structure.name}
                                </span>
                                <span className="text-[0.625rem] text-[var(--muted-foreground)]">
                                  {structure.description} • {structure.labels.length} labels
                                </span>
                              </div>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                structure.difficulty === 'beginner' ? 'bg-green-500/10 text-green-600' :
                                structure.difficulty === 'intermediate' ? 'bg-amber-500/10 text-amber-600' :
                                'bg-red-500/10 text-red-600'
                              }`}>
                                {structure.difficulty}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Interaction Mode */}
                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-[var(--muted-foreground)] mb-1.5 block">
                        Interaction Mode
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSelectedMode('click')}
                          className={`p-2 sm:p-3 rounded-lg border-2 transition-all ${
                            selectedMode === 'click'
                              ? 'border-teal-500 bg-teal-500/10'
                              : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                          }`}
                        >
                          <MousePointer className="w-4 h-4 mx-auto mb-1 text-teal-500" />
                          <span className="font-bold text-xs sm:text-sm text-[var(--foreground)] block text-center">
                            Click Mode
                          </span>
                          <span className="text-[0.625rem] text-[var(--muted-foreground)] block text-center">
                            Click word, then label
                          </span>
                        </button>
                        <button
                          onClick={() => setSelectedMode('drag')}
                          className={`p-2 sm:p-3 rounded-lg border-2 transition-all ${
                            selectedMode === 'drag'
                              ? 'border-teal-500 bg-teal-500/10'
                              : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                          }`}
                        >
                          <Hand className="w-4 h-4 mx-auto mb-1 text-teal-500" />
                          <span className="font-bold text-xs sm:text-sm text-[var(--foreground)] block text-center">
                            Drag Mode
                          </span>
                          <span className="text-[0.625rem] text-[var(--muted-foreground)] block text-center">
                            Drag words to labels
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-1.5 sm:space-y-2">
                  <Button
                    onClick={startGame}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold py-2.5 sm:py-3 text-sm sm:text-base"
                    disabled={showConfig && !selectedStructure}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Start Labeling
                  </Button>

                  {onExit && (
                    <Button
                      onClick={onExit}
                      variant="outline"
                      className="w-full text-sm"
                    >
                      <Home className="w-3.5 h-3.5 mr-2" />
                      Back to Menu
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Playing Phase */}
        {gameState.phase === 'playing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-[var(--background)]/95 backdrop-blur border-b border-[var(--border)] px-[clamp(0.5rem,2vw,1rem)] py-[clamp(0.25rem,1vh,0.75rem)]">
              <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-[clamp(0.375rem,1vw,0.75rem)]">
                  {onExit && (
                    <Button
                      onClick={onExit}
                      variant="ghost"
                      size="sm"
                      className="py-1 h-auto"
                      style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)' }}
                    >
                      <Home className="mr-1" style={{ width: 'clamp(0.625rem, 2vw, 0.875rem)', height: 'clamp(0.625rem, 2vw, 0.875rem)' }} />
                      <span className="hidden sm:inline">Quit</span>
                    </Button>
                  )}
                  <span className="font-bold text-[var(--foreground)]" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
                    {currentStructure.name}
                  </span>
                </div>

                <div className="flex items-center gap-[clamp(0.5rem,2vw,1rem)]">
                  <div className="flex items-center gap-1">
                    <Check className="text-green-500" style={{ width: 'clamp(0.625rem, 2vw, 0.875rem)', height: 'clamp(0.625rem, 2vw, 0.875rem)' }} />
                    <span className="font-bold text-[var(--foreground)]" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
                      {gameState.correctCount}/{currentStructure.labels.length}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[var(--foreground)]" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
                    {formatTime(gameState.elapsed)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="max-w-6xl mx-auto mt-2">
                <div className="bg-[var(--muted)] rounded-full overflow-hidden" style={{ height: 'clamp(0.25rem, 0.8vh, 0.375rem)' }}>
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(gameState.correctCount / currentStructure.labels.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Diagram Area */}
              <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
                <div className="relative w-full max-w-2xl aspect-[3/4] bg-gradient-to-br from-[var(--muted)] to-[var(--background)] border-2 border-[var(--border)] rounded-lg">
                  {/* Placeholder diagram - would be replaced with actual diagram */}
                  <div className="absolute inset-0 flex items-center justify-center text-[var(--muted-foreground)] text-sm">
                    [Diagram of {currentStructure.name}]
                  </div>

                  {/* Labels */}
                  {currentStructure.labels.map((label) => {
                    const assignment = gameState.assignments[label.id]
                    const isCorrect = assignment === label.elementId
                    const element = assignment ? ALL_ELEMENTS.find(el => el.id === assignment) : null

                    return (
                      <button
                        key={label.id}
                        onClick={() => handleLabelClick(label.id)}
                        className={`absolute p-1.5 sm:p-2 rounded border-2 transition-all text-xs font-bold ${
                          assignment
                            ? isCorrect
                              ? 'border-green-500 bg-green-500/10 text-green-600'
                              : 'border-red-500 bg-red-500/10 text-red-600'
                            : gameState.selectedWord
                            ? 'border-teal-500 bg-teal-500/10 hover:bg-teal-500/20 cursor-pointer'
                            : 'border-[var(--border)] bg-[var(--background)]'
                        }`}
                        style={{
                          left: `${label.x}%`,
                          top: `${label.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        {element ? element.name : `Label ${label.id.slice(-1)}`}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Word Bank */}
              <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-[var(--border)] bg-[var(--background)] p-3 overflow-auto">
                <h3 className="font-bold text-sm mb-2 text-[var(--foreground)]">Word Bank</h3>
                <p className="text-xs text-[var(--muted-foreground)] mb-3">
                  {config.interactionMode === 'click' ? 'Click a word, then click a label' : 'Drag words to labels'}
                </p>
                <div className="space-y-2">
                  {shuffledWords.map((element) => {
                    const isUsed = Object.values(gameState.assignments).includes(element.id)
                    const isSelected = gameState.selectedWord === element.id

                    return (
                      <button
                        key={element.id}
                        onClick={() => handleWordClick(element.id)}
                        disabled={isUsed}
                        className={`w-full p-2 rounded-lg border-2 transition-all text-left ${
                          isUsed
                            ? 'border-[var(--border)] bg-[var(--muted)] opacity-50 cursor-not-allowed'
                            : isSelected
                            ? 'border-teal-500 bg-teal-500/10'
                            : 'border-[var(--border)] hover:border-teal-500/50 cursor-pointer'
                        }`}
                      >
                        <span className="font-bold text-xs sm:text-sm text-[var(--foreground)]">
                          {element.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Phase */}
        {gameState.phase === 'results' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center p-3 sm:p-4"
          >
            <Card className="max-w-md w-full border-2 border-[var(--border)]">
              <CardContent className="p-4 sm:p-5 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center"
                >
                  <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </motion.div>

                <h2 className="text-xl sm:text-2xl font-black text-[var(--foreground)] mb-1 sm:mb-2">
                  Diagram Complete!
                </h2>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 my-3 sm:my-4">
                  <div className="p-2 sm:p-3 rounded-xl bg-[var(--muted)]">
                    <p className="text-2xl font-mono font-bold text-[var(--foreground)]">
                      {formatTime(gameState.elapsed)}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Time</p>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl bg-[var(--muted)]">
                    <p className="text-2xl font-bold text-[var(--foreground)]">
                      {accuracy}%
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Accuracy</p>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl bg-[var(--muted)]">
                    <p className="text-2xl font-bold text-[var(--foreground)]">
                      {gameState.correctCount}/{currentStructure.labels.length}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Correct</p>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl bg-[var(--muted)]">
                    <p className="text-2xl font-bold text-[var(--foreground)]">
                      {gameState.attempts}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Attempts</p>
                  </div>
                </div>

                {/* Perfect Score */}
                {accuracy === 100 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-xl bg-teal-500/20 border border-teal-500/30"
                  >
                    <div className="flex items-center justify-center gap-2 text-teal-500 mb-1">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base font-bold">PERFECT!</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                      You labeled everything correctly on the first try!
                    </p>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="space-y-2">
                  <Button
                    onClick={startGame}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>

                  {onExit && (
                    <Button
                      onClick={onExit}
                      variant="outline"
                      className="w-full"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Back to Menu
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DiagramBuilderGame
