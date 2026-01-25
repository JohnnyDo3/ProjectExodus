'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import {
  Gamepad2, Layers, Brain, Camera,
  ChevronRight, ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

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

export default function PlayPage() {
  return (
    <div className="h-full bg-[var(--background)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-[var(--background)]/95 backdrop-blur border-b border-[var(--border)]">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Link href="/architecture">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-sm font-bold text-[var(--foreground)]">Choose Game Mode</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 max-w-4xl">
        {/* Game Mode Selection */}
        <section className="mb-2 sm:mb-3">
          <h2 className="text-base sm:text-lg font-bold text-[var(--foreground)] mb-1.5 sm:mb-2">Game Mode</h2>
          <div className="grid md:grid-cols-2 gap-2 sm:gap-3">
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
                      <CardContent className="p-2 sm:p-3">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm sm:text-base text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                              {mode.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">{mode.description}</p>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                              {mode.features.map((feature) => (
                                <span
                                  key={feature}
                                  className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${mode.bgColor}`}
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </section>
        </div>
      </div>
    </div>
  )
}
