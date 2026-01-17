'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Timer, Trophy, Zap, ChevronRight, RotateCcw, Home,
  Check, X, Eye, EyeOff, Target, Play, Flag
} from 'lucide-react'
import type { ArchitecturalElement } from '@/data/architecture/types'
import { ALL_ELEMENTS, getRandomElements } from '@/data/architecture/elements'
import { ArchitectureSVG } from './ArchitectureSVG'

interface DiagramPart {
  id: string
  element: ArchitecturalElement
  x: number // percentage
  y: number // percentage
  labeled: boolean
  userAnswer: string | null
}

interface GameState {
  phase: 'intro' | 'playing' | 'paused' | 'results'
  currentDiagram: number
  score: number
  totalCorrect: number
  startTime: number
  elapsed: number
  answers: { diagramId: number; correct: number; total: number; timeMs: number }[]
}

interface DiagramGameProps {
  config?: {
    diagramCount?: number
    partsPerDiagram?: number
    showHints?: boolean
  }
  onComplete?: (results: GameState) => void
  onExit?: () => void
}

const DEFAULT_CONFIG = {
  diagramCount: 5,
  partsPerDiagram: 6,
  showHints: true,
}

// Pre-defined diagram layouts (positions for labels)
const DIAGRAM_LAYOUTS = [
  // Building facade
  [
    { x: 50, y: 10 }, // Top
    { x: 25, y: 25 }, // Upper left
    { x: 75, y: 25 }, // Upper right
    { x: 25, y: 50 }, // Middle left
    { x: 75, y: 50 }, // Middle right
    { x: 50, y: 85 }, // Bottom
  ],
  // Cross section
  [
    { x: 50, y: 5 },  // Roof
    { x: 15, y: 30 }, // Left wall
    { x: 85, y: 30 }, // Right wall
    { x: 30, y: 55 }, // Left interior
    { x: 70, y: 55 }, // Right interior
    { x: 50, y: 95 }, // Foundation
  ],
  // Detail view
  [
    { x: 30, y: 20 }, // Top left
    { x: 70, y: 20 }, // Top right
    { x: 20, y: 50 }, // Middle left
    { x: 50, y: 50 }, // Center
    { x: 80, y: 50 }, // Middle right
    { x: 50, y: 80 }, // Bottom
  ],
]

export function DiagramGame({ config: userConfig, onComplete, onExit }: DiagramGameProps) {
  const config = { ...DEFAULT_CONFIG, ...userConfig }

  const [gameState, setGameState] = useState<GameState>({
    phase: 'intro',
    currentDiagram: 0,
    score: 0,
    totalCorrect: 0,
    startTime: 0,
    elapsed: 0,
    answers: [],
  })

  const [diagrams, setDiagrams] = useState<DiagramPart[][]>([])
  const [selectedPart, setSelectedPart] = useState<number | null>(null)
  const [showHints, setShowHints] = useState(config.showHints)
  const [feedback, setFeedback] = useState<{ partId: string; correct: boolean } | null>(null)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const diagramStartRef = useRef<number>(0)

  // Generate diagrams
  useEffect(() => {
    const newDiagrams: DiagramPart[][] = []

    for (let i = 0; i < config.diagramCount; i++) {
      const elements = getRandomElements(config.partsPerDiagram)
      const layout = DIAGRAM_LAYOUTS[i % DIAGRAM_LAYOUTS.length]

      const parts: DiagramPart[] = elements.map((element, idx) => ({
        id: `${i}-${idx}`,
        element,
        x: layout[idx].x,
        y: layout[idx].y,
        labeled: false,
        userAnswer: null,
      }))

      newDiagrams.push(parts)
    }

    setDiagrams(newDiagrams)
  }, [config.diagramCount, config.partsPerDiagram])

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: 'playing',
      startTime: Date.now(),
    }))
    diagramStartRef.current = Date.now()

    timerRef.current = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        elapsed: Date.now() - prev.startTime,
      }))
    }, 100)
  }, [])

  const handleLabelSelect = useCallback((partIndex: number, answer: string) => {
    if (!diagrams[gameState.currentDiagram]) return

    const part = diagrams[gameState.currentDiagram][partIndex]
    const correct = part.element.name === answer

    // Update diagram
    const newDiagrams = [...diagrams]
    newDiagrams[gameState.currentDiagram][partIndex] = {
      ...part,
      labeled: true,
      userAnswer: answer,
    }
    setDiagrams(newDiagrams)

    // Show feedback
    setFeedback({ partId: part.id, correct })
    setTimeout(() => setFeedback(null), 800)

    // Update score
    if (correct) {
      setGameState(prev => ({
        ...prev,
        score: prev.score + 100,
        totalCorrect: prev.totalCorrect + 1,
      }))
    }

    setSelectedPart(null)

    // Check if diagram complete
    const allLabeled = newDiagrams[gameState.currentDiagram].every(p => p.labeled)
    if (allLabeled) {
      setTimeout(() => handleDiagramComplete(), 1000)
    }
  }, [diagrams, gameState.currentDiagram])

  const handleDiagramComplete = useCallback(() => {
    const timeMs = Date.now() - diagramStartRef.current
    const currentDiagram = diagrams[gameState.currentDiagram]
    const correct = currentDiagram.filter(p => p.userAnswer === p.element.name).length

    setGameState(prev => ({
      ...prev,
      answers: [...prev.answers, {
        diagramId: prev.currentDiagram,
        correct,
        total: currentDiagram.length,
        timeMs,
      }],
    }))

    if (gameState.currentDiagram + 1 >= config.diagramCount) {
      // Game complete
      if (timerRef.current) clearInterval(timerRef.current)
      setGameState(prev => ({ ...prev, phase: 'results' }))
      if (onComplete) {
        setTimeout(() => onComplete(gameState), 500)
      }
    } else {
      // Next diagram
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          currentDiagram: prev.currentDiagram + 1,
        }))
        diagramStartRef.current = Date.now()
      }, 1500)
    }
  }, [diagrams, gameState, config.diagramCount, onComplete])

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const currentDiagram = diagrams[gameState.currentDiagram] || []
  const unlabeledParts = currentDiagram.filter(p => !p.labeled)
  const wordBank = currentDiagram.map(p => p.element.name).sort()

  return (
    <div className="h-full bg-[var(--background)] flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Intro Phase */}
        {gameState.phase === 'intro' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center p-4"
          >
            <Card className="max-w-md w-full border-2 border-[var(--border)]">
              <CardContent className="p-6 text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center"
                >
                  <Target className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-2xl font-black text-[var(--foreground)] mb-2">
                  Diagram Builder
                </h2>
                <p className="text-[var(--muted-foreground)] mb-6">
                  Label {config.diagramCount} architectural diagrams by identifying {config.partsPerDiagram} elements each
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={startGame}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold py-6 text-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Game
                  </Button>

                  {onExit && (
                    <Button onClick={onExit} variant="outline" className="w-full">
                      <Home className="w-4 h-4 mr-2" />
                      Back to Menu
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Playing Phase */}
        {gameState.phase === 'playing' && currentDiagram.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-[var(--background)]/95 backdrop-blur border-b border-[var(--border)] p-3 sm:p-4">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm sm:text-base font-bold text-[var(--foreground)]">
                      Diagram {gameState.currentDiagram + 1}/{config.diagramCount}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Timer className="w-4 h-4 text-teal-500" />
                      <span className="text-sm font-mono text-teal-500">
                        {formatTime(gameState.elapsed)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <span className="text-sm sm:text-base font-bold text-[var(--foreground)]">
                        {gameState.score}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowHints(!showHints)}
                    >
                      {showHints ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Progress */}
                <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-600 transition-all"
                    style={{
                      width: `${((gameState.currentDiagram * config.partsPerDiagram + (config.partsPerDiagram - unlabeledParts.length)) / (config.diagramCount * config.partsPerDiagram)) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Diagram Area */}
            <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
              {/* Diagram View */}
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 relative bg-gradient-to-br from-[var(--muted)] to-[var(--background)] rounded-2xl border-2 border-[var(--border)] overflow-hidden">
                  {/* SVG Elements Positioned */}
                  {currentDiagram.map((part, index) => (
                    <div
                      key={part.id}
                      className="absolute"
                      style={{
                        left: `${part.x}%`,
                        top: `${part.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div className="relative">
                        {/* Element SVG */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                          <ArchitectureSVG
                            category={part.element.category}
                            elementId={part.element.id}
                            className="w-full h-full"
                            showHalo={false}
                          />
                        </div>

                        {/* Label Point */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => !part.labeled && setSelectedPart(index)}
                          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                            part.labeled
                              ? part.userAnswer === part.element.name
                                ? 'bg-green-500 border-green-600'
                                : 'bg-red-500 border-red-600'
                              : selectedPart === index
                              ? 'bg-teal-500 border-teal-600 animate-pulse'
                              : 'bg-[var(--background)] border-[var(--border)] hover:border-teal-500'
                          }`}
                          disabled={part.labeled}
                        >
                          {part.labeled ? (
                            part.userAnswer === part.element.name ? (
                              <Check className="w-4 h-4 text-white" />
                            ) : (
                              <X className="w-4 h-4 text-white" />
                            )
                          ) : (
                            <span className="text-xs font-bold">{index + 1}</span>
                          )}
                        </motion.button>

                        {/* Show label if completed */}
                        {part.labeled && (
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${
                              part.userAnswer === part.element.name
                                ? 'bg-green-500/20 text-green-600'
                                : 'bg-red-500/20 text-red-600'
                            }`}>
                              {part.userAnswer}
                            </span>
                          </div>
                        )}

                        {/* Feedback */}
                        {feedback?.partId === part.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                              feedback.correct ? 'bg-green-500' : 'bg-red-500'
                            }`}>
                              {feedback.correct ? (
                                <Check className="w-8 h-8 text-white" />
                              ) : (
                                <X className="w-8 h-8 text-white" />
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {showHints && selectedPart !== null && (
                  <div className="mt-2 p-3 bg-teal-500/10 border border-teal-500/30 rounded-lg">
                    <p className="text-sm font-semibold text-teal-600">
                      Hint: Look for defining characteristics like shape, position, and function
                    </p>
                  </div>
                )}
              </div>

              {/* Word Bank */}
              <div className="w-full lg:w-64 flex-shrink-0">
                <Card className="h-full border-2 border-[var(--border)]">
                  <CardContent className="p-3 h-full flex flex-col">
                    <h3 className="text-sm font-black text-[var(--foreground)] mb-3">
                      WORD BANK
                      {selectedPart !== null && (
                        <span className="ml-2 text-teal-500">→ Select Label #{selectedPart + 1}</span>
                      )}
                    </h3>
                    <div className="flex-1 overflow-y-auto space-y-2">
                      {wordBank.map((name) => {
                        const used = currentDiagram.find(p => p.userAnswer === name)
                        return (
                          <Button
                            key={name}
                            onClick={() => selectedPart !== null && handleLabelSelect(selectedPart, name)}
                            disabled={selectedPart === null || !!used}
                            variant="outline"
                            className={`w-full justify-start text-sm ${
                              used ? 'opacity-40 cursor-not-allowed' : ''
                            } ${selectedPart !== null && !used ? 'hover:bg-teal-500/10 hover:border-teal-500' : ''}`}
                          >
                            {name}
                            {used && <Check className="w-4 h-4 ml-auto text-green-500" />}
                          </Button>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
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
            className="flex-1 flex items-center justify-center p-4"
          >
            <Card className="max-w-md w-full border-2 border-[var(--border)]">
              <CardContent className="p-6 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                  className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center"
                >
                  <Trophy className="w-12 h-12 text-white" />
                </motion.div>

                <h2 className="text-2xl font-black text-[var(--foreground)] mb-2">
                  Game Complete!
                </h2>

                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="p-4 rounded-xl bg-[var(--muted)]">
                    <p className="text-2xl font-mono font-bold text-[var(--foreground)]">
                      {formatTime(gameState.elapsed)}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Time</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--muted)]">
                    <p className="text-2xl font-bold text-[var(--foreground)]">
                      {gameState.score}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Score</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--muted)]">
                    <p className="text-2xl font-bold text-[var(--foreground)]">
                      {gameState.totalCorrect}/{config.diagramCount * config.partsPerDiagram}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Correct</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--muted)]">
                    <p className="text-2xl font-bold text-[var(--foreground)]">
                      {Math.round((gameState.totalCorrect / (config.diagramCount * config.partsPerDiagram)) * 100)}%
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Accuracy</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={startGame}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Play Again
                  </Button>

                  {onExit && (
                    <Button onClick={onExit} variant="outline" className="w-full">
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
