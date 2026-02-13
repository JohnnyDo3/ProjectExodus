'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  HardHat, Gamepad2, Brain, Layers, Shuffle,
  ChevronRight, ArrowLeft, Search
} from 'lucide-react'

// Import game components from extracted modules
import {
  FlashcardGame,
  MatchingGame,
  ComparisonGame,
  DiagramBuilder,
  ExploreMode,
  STRUCTURAL_SETS,
  getAllStructuralComparisonSets,
} from '@/components/architecture/games/structural'

// Game modes available
type GameMode = 'flashcard' | 'matching' | 'comparison' | 'diagram' | 'explore'

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
    {
      id: 'explore' as GameMode,
      name: 'Explore Elements',
      description: 'Browse and study all structural elements',
      icon: Search,
      color: 'from-amber-500 to-orange-600',
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
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
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
              {activeMode === 'explore' && <ExploreMode onBack={() => setActiveMode(null)} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
