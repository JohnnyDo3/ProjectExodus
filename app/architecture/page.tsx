'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import {
  Building2, Gamepad2, Camera, BookOpen, Trophy, Timer,
  ChevronRight, Layers, Globe, Search, Shuffle, Clock,
  Target, Zap, Award, Map, GraduationCap, Columns3,
  ChurchIcon, Castle, ArrowRight, Play, Sparkles, Brain
} from 'lucide-react'
import Link from 'next/link'
import { ALL_ELEMENTS, ELEMENT_STATS } from '@/data/architecture/elements'
import { PERIODS } from '@/data/architecture/periods'
import { REGIONS } from '@/data/architecture/regions'
import { CATEGORIES } from '@/data/architecture/categories'

// Learning level definitions
const learningLevels = [
  { id: 'ELEMENTARY', name: 'Elementary', icon: '1-3', color: 'from-green-400 to-emerald-500', description: 'Perfect for young learners' },
  { id: 'MIDDLE_SCHOOL', name: 'Middle School', icon: '4-6', color: 'from-blue-400 to-cyan-500', description: 'Building foundational knowledge' },
  { id: 'HIGH_SCHOOL', name: 'High School', icon: '9-12', color: 'from-purple-400 to-violet-500', description: 'Deeper understanding' },
  { id: 'UNDERGRADUATE', name: 'Undergraduate', icon: 'UG', color: 'from-amber-400 to-orange-500', description: 'College-level analysis' },
  { id: 'GRADUATE', name: 'Graduate', icon: 'GR', color: 'from-rose-400 to-pink-500', description: 'Advanced scholarship' },
  { id: 'PHD', name: 'PhD', icon: 'PhD', color: 'from-indigo-500 to-purple-600', description: 'Expert-level discourse' },
]

// Game modes
const gameModes = [
  {
    id: 'flashcard',
    name: 'Flashcard Match',
    description: 'Match architectural elements with their images. Race against your personal best!',
    icon: Gamepad2,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-500/10',
    features: ['Kahoot-style gameplay', 'Ghost racing mode', 'Personal records'],
    href: '/architecture/play/flashcard'
  },
  {
    id: 'diagram',
    name: 'Diagram Builder',
    description: 'Label architectural diagrams by dragging or clicking terms into place.',
    icon: Layers,
    color: 'from-teal-500 to-cyan-600',
    bgColor: 'bg-teal-500/10',
    features: ['Drag & drop labels', 'Word bank mode', 'Full structure diagrams'],
    href: '/architecture/play/diagram'
  },
  {
    id: 'confusion',
    name: 'Confusion Buster',
    description: 'Study commonly confused architectural pairs with side-by-side comparisons.',
    icon: Brain,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-500/10',
    features: ['Side-by-side comparisons', 'Key differences', 'Visual learning'],
    href: '/architecture/play/confusion'
  },
  {
    id: 'spotted',
    name: 'Spotted in the Wild',
    description: 'Upload photos of elements you find in real life and add them to your game!',
    icon: Camera,
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-500/10',
    features: ['Photo upload', 'Location tagging', 'Personal gallery'],
    href: '/architecture/spotted'
  },
]

// Featured categories for quick start
const featuredCategories = [
  { id: 'STRUCTURAL', name: 'Structural Elements', icon: Columns3, count: 25 },
  { id: 'DECORATIVE', name: 'Decorative Details', icon: Sparkles, count: 12 },
  { id: 'RELIGIOUS', name: 'Religious Architecture', icon: ChurchIcon, count: 8 },
  { id: 'FORTIFICATION', name: 'Fortifications', icon: Castle, count: 5 },
]

export default function ArchitecturePage() {
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated' && !!session?.user
  const [hoveredMode, setHoveredMode] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-[var(--background)] to-teal-900/20" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--muted)] border border-[var(--border)] mb-6"
            >
              <Building2 className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-bold text-[var(--foreground)]">Interactive Learning</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-amber-500 via-teal-500 to-purple-500 bg-clip-text text-transparent"
            >
              ARCHITECTURE
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl font-semibold text-[var(--muted-foreground)] mb-8"
            >
              Master Architectural Elements Through Play
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 mb-8"
            >
              {[
                { value: ALL_ELEMENTS.length, label: 'Elements', icon: Layers },
                { value: Object.keys(PERIODS).length, label: 'Historical Periods', icon: Clock },
                { value: Object.keys(REGIONS).length, label: 'World Regions', icon: Globe },
                { value: learningLevels.length, label: 'Learning Levels', icon: GraduationCap },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--card)] border border-[var(--border)]">
                  <Icon className="w-5 h-5 text-amber-500" />
                  <span className="font-bold text-[var(--foreground)]">{value}</span>
                  <span className="text-sm text-[var(--muted-foreground)]">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/architecture/play">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 via-teal-500 to-purple-500 text-white border-0 font-bold">
                  <Play className="w-5 h-5 mr-2" />
                  Start Playing
                </Button>
              </Link>
              <Link href="/architecture/explore">
                <Button size="lg" variant="outline" className="font-bold">
                  <Search className="w-5 h-5 mr-2" />
                  Explore Elements
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-12 bg-gradient-to-r from-amber-500/5 via-teal-500/5 to-purple-500/5 border-y border-[var(--border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  href: '/architecture/play/flashcard',
                  icon: Gamepad2,
                  title: 'Quick Game',
                  subtitle: 'Jump into a 10-element flashcard round',
                  color: 'text-amber-500'
                },
                {
                  href: '/architecture/explore',
                  icon: Search,
                  title: 'Browse All',
                  subtitle: 'Explore the full element library',
                  color: 'text-teal-500'
                },
                {
                  href: '/architecture/dashboard',
                  icon: Trophy,
                  title: 'My Progress',
                  subtitle: 'View stats, badges, and achievements',
                  color: 'text-purple-500'
                }
              ].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link href={item.href}>
                    <Card className="h-full border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all cursor-pointer group">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--muted)] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <item.icon className={`w-6 h-6 ${item.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[var(--muted-foreground)]">{item.subtitle}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all" />
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Game Modes */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-black text-[var(--foreground)] mb-4"
            >
              GAME MODES
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto"
            >
              Multiple ways to learn and master architectural elements
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {gameModes.map((mode, index) => {
              const Icon = mode.icon
              return (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredMode(mode.id)}
                  onMouseLeave={() => setHoveredMode(null)}
                >
                  <Link href={mode.href}>
                    <Card className={`h-full border-2 border-[var(--border)] hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer`}>
                      <div className={`h-2 bg-gradient-to-r ${mode.color}`} />
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <motion.div
                            animate={hoveredMode === mode.id ? { rotate: [0, -10, 10, 0] } : {}}
                            transition={{ duration: 0.5 }}
                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center shadow-lg shrink-0`}
                          >
                            <Icon className="w-7 h-7 text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="text-xl font-black text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                              {mode.name}
                            </h3>
                            <p className="text-sm text-[var(--muted-foreground)] mb-4">
                              {mode.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {mode.features.map((feature) => (
                                <span
                                  key={feature}
                                  className={`text-xs px-2 py-1 rounded-full ${mode.bgColor} text-[var(--foreground)]`}
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Ghost Racing Feature */}
      <section className="py-20 bg-[var(--muted)]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 text-sm font-bold mb-4">
                  <Zap className="w-4 h-4" />
                  Unique Feature
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[var(--foreground)] mb-4">
                  GHOST RACING
                </h2>
                <p className="text-lg text-[var(--muted-foreground)] mb-6">
                  Compete against your personal best! Like racing game ghosts,
                  your previous attempts create a &quot;ghost&quot; you race against.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Beat your own time records',
                    'See your progress in real-time',
                    'No countdown pressure - work at your pace',
                    'Track improvement over time',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[var(--foreground)]">
                      <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <ChevronRight className="w-3 h-3 text-amber-500" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/architecture/play/flashcard?mode=ghost">
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold">
                    <Timer className="w-4 h-4 mr-2" />
                    Try Ghost Mode
                  </Button>
                </Link>
              </div>

              {/* Ghost Racing Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-[var(--card)] border-2 border-[var(--border)] rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-[var(--muted-foreground)]">Racing...</span>
                    <span className="text-2xl font-mono font-bold text-[var(--foreground)]">0:42.3</span>
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-amber-500 font-bold">You</span>
                        <span className="text-[var(--muted-foreground)]">7/10</span>
                      </div>
                      <div className="h-3 bg-[var(--muted)] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '70%' }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-purple-500/60 font-bold">Ghost (Best: 0:51.2)</span>
                        <span className="text-[var(--muted-foreground)]">6/10</span>
                      </div>
                      <div className="h-3 bg-[var(--muted)] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '60%' }}
                          transition={{ duration: 1, delay: 0.7 }}
                          className="h-full bg-gradient-to-r from-purple-500/40 to-indigo-500/40 rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[var(--border)]">
                    <p className="text-center text-sm text-amber-500 font-bold">
                      You&apos;re ahead by 8.9 seconds!
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learning Levels */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-black text-[var(--foreground)] mb-4"
            >
              ADAPTIVE LEARNING LEVELS
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto"
            >
              Content adapts to your knowledge level - from elementary school to PhD
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {learningLevels.map((level, index) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all cursor-pointer group">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${level.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <span className="text-white font-bold text-sm">{level.icon}</span>
                    </div>
                    <h3 className="font-bold text-sm text-[var(--foreground)]">{level.name}</h3>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">{level.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 bg-[var(--muted)]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-black text-[var(--foreground)] mb-4"
            >
              CHOOSE YOUR PATH
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto"
            >
              Learn chronologically through history or shuffle for variety
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Timeline Path */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/architecture/play?path=timeline">
                <Card className="h-full border-2 border-amber-500/30 hover:border-amber-500/50 transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                        <Clock className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-[var(--foreground)] group-hover:text-amber-500 transition-colors">
                          Timeline Journey
                        </h3>
                        <p className="text-sm text-amber-500">Ancient to Modern</p>
                      </div>
                    </div>
                    <p className="text-[var(--muted-foreground)] mb-4">
                      Travel through architectural history from Ancient Egypt to Contemporary design.
                      See how styles evolved and influenced each other across millennia.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Egyptian', 'Greek', 'Roman', 'Gothic', 'Modern'].map((era) => (
                        <span key={era} className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-600">
                          {era}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Random Path */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/architecture/play?path=random">
                <Card className="h-full border-2 border-teal-500/30 hover:border-teal-500/50 transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                        <Shuffle className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-[var(--foreground)] group-hover:text-teal-500 transition-colors">
                          Random Shuffle
                        </h3>
                        <p className="text-sm text-teal-500">Mix It Up</p>
                      </div>
                    </div>
                    <p className="text-[var(--muted-foreground)] mb-4">
                      Jump between eras and regions for variety. Great for testing your knowledge
                      across all periods and avoiding pattern memorization.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Varied', 'Challenging', 'Adaptive', 'Comprehensive'].map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-teal-500/10 text-teal-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-black text-[var(--foreground)] mb-4"
            >
              BROWSE BY CATEGORY
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {featuredCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/architecture/explore?category=${category.id}`}>
                    <Card className="h-full border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all cursor-pointer group">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--muted)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-[var(--primary)]" />
                        </div>
                        <h3 className="font-bold text-sm text-[var(--foreground)]">{category.name}</h3>
                        <p className="text-xs text-[var(--muted-foreground)] mt-1">{category.count} elements</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <div className="text-center">
            <Link href="/architecture/explore">
              <Button variant="outline" className="font-bold">
                View All Categories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-purple-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Award className="w-16 h-16 mx-auto mb-6 text-amber-500" />
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--foreground)] mb-4">
              Ready to Master Architecture?
            </h2>
            <p className="text-lg text-[var(--muted-foreground)] mb-8">
              Start with a quick flashcard round or dive deep into the element library.
              Your progress is saved automatically.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/architecture/play/flashcard">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold">
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  Start Playing Now
                </Button>
              </Link>
              {!isAuthenticated && (
                <Link href="/auth/signin">
                  <Button size="lg" variant="outline" className="font-bold">
                    Sign In to Save Progress
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cross-link */}
      <section className="py-12 bg-[var(--muted)]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[var(--muted-foreground)] mb-4">
              Interested in sustainability and system transitions?
            </p>
            <Link href="/exodology" className="inline-flex items-center gap-2 text-[var(--primary)] font-bold hover:underline">
              Explore Exodology Learning Paths
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
