'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import {
  Trophy, Award, Zap, Target, Clock, Flame, Star,
  ArrowLeft, ChevronRight, TrendingUp, Calendar, Gamepad2,
  Camera, Brain, Medal, Crown, Shield, Gem, Heart
} from 'lucide-react'
import Link from 'next/link'
import { ALL_ELEMENTS } from '@/data/architecture/elements'
import { BADGES } from '@/data/architecture/badges'

// Mock user stats - in production these would come from the database
const mockStats = {
  totalGames: 12,
  totalCorrect: 89,
  totalQuestions: 120,
  accuracy: 74,
  currentStreak: 3,
  longestStreak: 7,
  bestTime: 52300, // ms
  totalTimeSpent: 1245000, // ms
  elementsMastered: 15,
  elementsLearning: 28,
  elementsNew: 30,
  spottedPhotos: 5,
  xpTotal: 2450,
  level: 8,
  xpToNextLevel: 550,
}

const recentActivity = [
  { type: 'game', mode: 'flashcard', score: 850, correct: 8, total: 10, time: 48200, date: new Date() },
  { type: 'spotted', element: 'Corinthian Column', location: 'City Hall', date: new Date(Date.now() - 86400000) },
  { type: 'badge', badge: 'First Steps', date: new Date(Date.now() - 172800000) },
]

const earnedBadges = [
  { id: 'first-steps', earnedAt: new Date(Date.now() - 172800000) },
  { id: 'perfect-10', earnedAt: new Date(Date.now() - 86400000) },
  { id: 'column-expert', earnedAt: new Date(Date.now() - 432000000) },
]

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'elements' | 'history'>('overview')

  // Calculate XP progress
  const xpProgress = (mockStats.xpTotal % 1000) / 10 // Percentage to next level

  // Format time
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    const tenths = Math.floor((ms % 1000) / 100)
    return `${minutes}:${secs.toString().padStart(2, '0')}.${tenths}`
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-2 border-[var(--border)]">
          <CardContent className="p-8 text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-amber-500" />
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
              Sign In to Track Progress
            </h2>
            <p className="text-[var(--muted-foreground)] mb-6">
              Create an account to save your game stats, earn badges, and track your architectural knowledge!
            </p>
            <Link href="/auth/signin">
              <Button className="w-full">Sign In to Continue</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

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
            <h1 className="text-xl font-black text-[var(--foreground)]">My Progress</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="border-2 border-[var(--border)] overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-amber-500 via-teal-500 to-purple-500" />
            <CardContent className="p-6 -mt-12">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-2xl bg-[var(--card)] border-4 border-[var(--background)] shadow-xl flex items-center justify-center">
                  <span className="text-4xl">🏛️</span>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-black text-[var(--foreground)]">
                    {session?.user?.name || 'Architecture Student'}
                  </h2>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-sm font-bold">
                      Level {mockStats.level}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 text-sm font-bold">
                      {mockStats.xpTotal} XP
                    </span>
                    <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 text-sm font-bold flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {mockStats.currentStreak} day streak
                    </span>
                  </div>
                </div>

                {/* XP Progress */}
                <div className="text-center sm:text-right">
                  <p className="text-xs text-[var(--muted-foreground)] mb-1">
                    {mockStats.xpToNextLevel} XP to Level {mockStats.level + 1}
                  </p>
                  <div className="w-32 h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpProgress}%` }}
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: Target },
            { id: 'badges', label: 'Badges', icon: Award },
            { id: 'elements', label: 'Elements', icon: Brain },
            { id: 'history', label: 'History', icon: Clock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-white'
                  : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Games Played', value: mockStats.totalGames, icon: Gamepad2, color: 'text-amber-500' },
                { label: 'Accuracy', value: `${mockStats.accuracy}%`, icon: Target, color: 'text-teal-500' },
                { label: 'Best Time', value: formatTime(mockStats.bestTime), icon: Zap, color: 'text-purple-500' },
                { label: 'Photos', value: mockStats.spottedPhotos, icon: Camera, color: 'text-rose-500' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="border border-[var(--border)]">
                    <CardContent className="p-4 text-center">
                      <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                      <p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Element Mastery */}
            <Card className="border border-[var(--border)]">
              <CardContent className="p-6">
                <h3 className="font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  Element Mastery
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-green-500 font-semibold">Mastered</span>
                      <span className="text-[var(--muted-foreground)]">{mockStats.elementsMastered}</span>
                    </div>
                    <div className="h-3 bg-[var(--muted)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(mockStats.elementsMastered / ALL_ELEMENTS.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-amber-500 font-semibold">Learning</span>
                      <span className="text-[var(--muted-foreground)]">{mockStats.elementsLearning}</span>
                    </div>
                    <div className="h-3 bg-[var(--muted)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${(mockStats.elementsLearning / ALL_ELEMENTS.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[var(--muted-foreground)] font-semibold">New</span>
                      <span className="text-[var(--muted-foreground)]">{mockStats.elementsNew}</span>
                    </div>
                    <div className="h-3 bg-[var(--muted)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--border)] rounded-full"
                        style={{ width: `${(mockStats.elementsNew / ALL_ELEMENTS.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-[var(--muted-foreground)] mt-4">
                  {mockStats.elementsMastered + mockStats.elementsLearning} of {ALL_ELEMENTS.length} elements discovered
                </p>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border border-[var(--border)]">
              <CardContent className="p-6">
                <h3 className="font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal-500" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3 rounded-xl bg-[var(--muted)]"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activity.type === 'game' ? 'bg-amber-500/20' :
                        activity.type === 'spotted' ? 'bg-rose-500/20' : 'bg-purple-500/20'
                      }`}>
                        {activity.type === 'game' ? <Gamepad2 className="w-5 h-5 text-amber-500" /> :
                         activity.type === 'spotted' ? <Camera className="w-5 h-5 text-rose-500" /> :
                         <Award className="w-5 h-5 text-purple-500" />}
                      </div>
                      <div className="flex-1">
                        {activity.type === 'game' && (
                          <>
                            <p className="font-semibold text-[var(--foreground)]">
                              Flashcard Game - {activity.correct}/{activity.total} correct
                            </p>
                            <p className="text-sm text-[var(--muted-foreground)]">
                              {activity.score} points • {formatTime(activity.time ?? 0)}
                            </p>
                          </>
                        )}
                        {activity.type === 'spotted' && (
                          <>
                            <p className="font-semibold text-[var(--foreground)]">
                              Spotted: {activity.element}
                            </p>
                            <p className="text-sm text-[var(--muted-foreground)]">
                              {activity.location}
                            </p>
                          </>
                        )}
                        {activity.type === 'badge' && (
                          <>
                            <p className="font-semibold text-[var(--foreground)]">
                              Earned: {activity.badge}
                            </p>
                            <p className="text-sm text-[var(--muted-foreground)]">
                              New badge unlocked!
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="space-y-6">
            {/* Earned Badges */}
            <div>
              <h3 className="font-bold text-[var(--foreground)] mb-4">
                Earned Badges ({earnedBadges.length})
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {earnedBadges.map((earned, i) => {
                  const badge = BADGES.find(b => b.id === earned.id)
                  if (!badge) return null

                  return (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card className="border-2 border-amber-500/30 bg-amber-500/5">
                        <CardContent className="p-4 text-center">
                          <div className="text-4xl mb-2">{badge.icon}</div>
                          <p className="font-bold text-sm text-[var(--foreground)]">{badge.name}</p>
                          <p className="text-xs text-[var(--muted-foreground)]">{badge.tier}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Available Badges */}
            <div>
              <h3 className="font-bold text-[var(--foreground)] mb-4">
                Available Badges
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {BADGES.filter(b => !earnedBadges.find(e => e.id === b.id)).slice(0, 10).map((badge, i) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="border border-[var(--border)] opacity-60">
                      <CardContent className="p-4 text-center">
                        <div className="text-4xl mb-2 grayscale">{badge.icon}</div>
                        <p className="font-bold text-sm text-[var(--foreground)]">{badge.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{badge.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Elements Tab */}
        {activeTab === 'elements' && (
          <div className="space-y-4">
            <p className="text-[var(--muted-foreground)]">
              Track your mastery of individual architectural elements
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {ALL_ELEMENTS.slice(0, 20).map((element, i) => {
                const mastery = Math.random() * 100 // Mock mastery level
                const status = mastery > 80 ? 'mastered' : mastery > 30 ? 'learning' : 'new'

                return (
                  <Card
                    key={element.id}
                    className={`border ${
                      status === 'mastered' ? 'border-green-500/50' :
                      status === 'learning' ? 'border-amber-500/50' : 'border-[var(--border)]'
                    }`}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">
                          {element.category === 'STRUCTURAL' ? '🏛️' : '🎨'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-[var(--foreground)] truncate">{element.name}</p>
                        </div>
                      </div>
                      <div className="h-1.5 bg-[var(--muted)] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            status === 'mastered' ? 'bg-green-500' :
                            status === 'learning' ? 'bg-amber-500' : 'bg-[var(--border)]'
                          }`}
                          style={{ width: `${mastery}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <Link href="/architecture/explore">
              <Button variant="outline" className="w-full">
                View All Elements
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <p className="text-[var(--muted-foreground)]">
              Your complete game history
            </p>
            <Card className="border border-[var(--border)]">
              <CardContent className="p-6 text-center text-[var(--muted-foreground)]">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Game history will appear here as you play more games.</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link href="/architecture/play">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold">
              <Gamepad2 className="w-5 h-5 mr-2" />
              Play Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
