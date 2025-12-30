'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import {
  Gamepad2, Layers, Brain, Camera, Clock, Shuffle, Target,
  ChevronRight, Settings, ArrowLeft, Zap, Trophy, Ghost
} from 'lucide-react'
import Link from 'next/link'
import { ALL_ELEMENTS } from '@/data/architecture/elements'
import { CATEGORIES } from '@/data/architecture/categories'

const gameModes = [
  {
    id: 'flashcard',
    name: 'Flashcard Match',
    description: 'Match elements with images - Kahoot-style!',
    icon: Gamepad2,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-500/10',
    href: '/architecture/play/flashcard',
    features: ['Ghost Racing', 'Personal Records', 'Streak Bonuses'],
  },
  {
    id: 'diagram',
    name: 'Diagram Builder',
    description: 'Label architectural diagrams with drag & drop',
    icon: Layers,
    color: 'from-teal-500 to-cyan-600',
    bgColor: 'bg-teal-500/10',
    href: '/architecture/play/diagram',
    features: ['Full Structures', 'Word Bank', 'Click or Drag'],
  },
  {
    id: 'confusion',
    name: 'Confusion Buster',
    description: 'Master commonly confused element pairs',
    icon: Brain,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-500/10',
    href: '/architecture/play/confusion',
    features: ['Side-by-Side', 'Key Differences', 'Memory Tricks'],
  },
]

const quickPlayOptions = [
  { count: 5, label: 'Quick (5)', time: '~1 min' },
  { count: 10, label: 'Standard (10)', time: '~3 min' },
  { count: 20, label: 'Extended (20)', time: '~6 min' },
  { count: 50, label: 'Marathon (50)', time: '~15 min' },
]

export default function PlayPage() {
  const [selectedCount, setSelectedCount] = useState(10)
  const [selectedPath, setSelectedPath] = useState<'random' | 'timeline' | 'category'>('random')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--background)]/95 backdrop-blur border-b border-[var(--border)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/architecture">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-black text-[var(--foreground)]">Choose Game Mode</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Game Mode Selection */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-4">Game Mode</h2>
          <div className="grid gap-4">
            {gameModes.map((mode, index) => {
              const Icon = mode.icon
              return (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={mode.href}>
                    <Card className="border-2 border-[var(--border)] hover:border-[var(--primary)]/50 transition-all cursor-pointer group">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                              {mode.name}
                            </h3>
                            <p className="text-sm text-[var(--muted-foreground)]">{mode.description}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {mode.features.map((feature) => (
                                <span
                                  key={feature}
                                  className={`text-xs px-2 py-0.5 rounded-full ${mode.bgColor}`}
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Quick Play Configuration */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-[var(--foreground)]">Quick Play Settings</h2>
          </div>

          {/* Element Count */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-[var(--muted-foreground)] mb-2 block">
              Number of Elements
            </label>
            <div className="grid grid-cols-4 gap-2">
              {quickPlayOptions.map((option) => (
                <button
                  key={option.count}
                  onClick={() => setSelectedCount(option.count)}
                  className={`p-3 rounded-xl border-2 transition-all text-center ${
                    selectedCount === option.count
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                  }`}
                >
                  <span className="font-bold text-[var(--foreground)] block">{option.count}</span>
                  <span className="text-xs text-[var(--muted-foreground)]">{option.time}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Learning Path */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-[var(--muted-foreground)] mb-2 block">
              Learning Path
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedPath('random')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  selectedPath === 'random'
                    ? 'border-teal-500 bg-teal-500/10'
                    : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                }`}
              >
                <Shuffle className="w-5 h-5 mx-auto mb-1 text-teal-500" />
                <span className="font-bold text-sm text-[var(--foreground)] block">Random</span>
              </button>
              <button
                onClick={() => setSelectedPath('timeline')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  selectedPath === 'timeline'
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                }`}
              >
                <Clock className="w-5 h-5 mx-auto mb-1 text-amber-500" />
                <span className="font-bold text-sm text-[var(--foreground)] block">Timeline</span>
              </button>
              <button
                onClick={() => setSelectedPath('category')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  selectedPath === 'category'
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                }`}
              >
                <Target className="w-5 h-5 mx-auto mb-1 text-purple-500" />
                <span className="font-bold text-sm text-[var(--foreground)] block">Category</span>
              </button>
            </div>
          </div>

          {/* Category Selection (if category path selected) */}
          {selectedPath === 'category' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6"
            >
              <label className="text-sm font-semibold text-[var(--muted-foreground)] mb-2 block">
                Select Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.values(CATEGORIES).slice(0, 6).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-3 rounded-xl border-2 transition-all text-left ${
                      selectedCategory === category.id
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                    }`}
                  >
                    <span className="font-bold text-sm text-[var(--foreground)] block">{category.name}</span>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      {ALL_ELEMENTS.filter(e => e.category === category.id).length} elements
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Start Button */}
          <Link
            href={`/architecture/play/flashcard?count=${selectedCount}&path=${selectedPath}${selectedCategory ? `&category=${selectedCategory}` : ''}`}
          >
            <Button className="w-full py-6 text-lg font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-white">
              <Gamepad2 className="w-5 h-5 mr-2" />
              Start Flashcard Game
            </Button>
          </Link>
        </section>

        {/* Stats Preview */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-[var(--foreground)]">Your Stats</h2>
          </div>

          <Card className="border border-[var(--border)]">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">0</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Games Played</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">--</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Best Time</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">0</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Elements Mastered</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <div className="flex items-center justify-center gap-2 text-purple-500">
                  <Ghost className="w-4 h-4" />
                  <span className="text-sm font-semibold">Ghost Racing unlocks after your first game!</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
