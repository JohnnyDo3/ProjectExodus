'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Award, BookOpen, ChevronRight, Clock,
  Compass, Crown, Flame, Map, Target, Trophy, TrendingUp,
  Calendar, CheckCircle2, Play, Zap
} from 'lucide-react'
import Link from 'next/link'

// Path data
const paths = [
  {
    id: 'foundations',
    name: 'Foundations of Exodology',
    icon: Compass,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    totalLessons: 44,
    certName: 'Exodological Literacy'
  },
  {
    id: 'applied',
    name: 'Applied Exodology',
    icon: Map,
    color: 'teal',
    gradient: 'from-teal-500 to-cyan-600',
    totalLessons: 36,
    certName: 'Exodological Application'
  },
  {
    id: 'strategic',
    name: 'Strategic Exodology',
    icon: Target,
    color: 'purple',
    gradient: 'from-purple-500 to-indigo-600',
    totalLessons: 40,
    certName: 'Exodological Stewardship'
  }
]

// Type for progress data
type PathProgressData = {
  completed: number
  inProgress: number
  total: number
}

type CertProgressData = {
  foundations: { completed: number; required: number; earned: boolean }
  applied: { completed: number; required: number; earned: boolean }
  strategic: { completed: number; required: number; earned: boolean }
  master: { earned: boolean }
}

export default function ExodologyDashboard() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [progressByPath, setProgressByPath] = useState<Record<string, PathProgressData>>({})
  const [certifications, setCertifications] = useState<CertProgressData | null>(null)
  const [recentActivity, setRecentActivity] = useState<Array<{ lessonId: string; pathId: string; lastAccessedAt: string }>>([])
  const [streakData, setStreakData] = useState<{
    currentStreak: number
    longestStreak: number
    totalLearningDays: number
    isActiveToday: boolean
  } | null>(null)

  // Fetch dashboard data
  useEffect(() => {
    async function fetchDashboardData() {
      if (!session?.user) {
        setLoading(false)
        return
      }

      try {
        // Fetch progress, certifications, and streak in parallel
        const [progressRes, certRes, streakRes] = await Promise.all([
          fetch('/api/exodology/progress'),
          fetch('/api/exodology/certifications'),
          fetch('/api/exodology/streak')
        ])

        if (progressRes.ok) {
          const progressData = await progressRes.json()
          setProgressByPath(progressData.byPath || {})
          setRecentActivity(progressData.progress?.slice(0, 5) || [])
        }

        if (certRes.ok) {
          const certData = await certRes.json()
          setCertifications(certData.progress || null)
        }

        if (streakRes.ok) {
          const streakInfo = await streakRes.json()
          setStreakData(streakInfo.streak || null)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [session])

  // Calculate totals
  const totalCompleted = Object.values(progressByPath).reduce((sum, p) => sum + (p?.completed || 0), 0)
  const totalLessons = paths.reduce((sum, p) => sum + p.totalLessons, 0)
  const completionPercentage = Math.round((totalCompleted / totalLessons) * 100)
  const earnedCerts = certifications
    ? [certifications.foundations.earned, certifications.applied.earned, certifications.strategic.earned, certifications.master.earned].filter(Boolean).length
    : 0

  // Find recommended next lesson/path
  const getRecommendedPath = () => {
    // Start with foundations if no progress
    if (!progressByPath.foundations?.completed && !progressByPath.foundations?.total) {
      return paths[0]
    }

    // Find the path with most progress that isn't complete
    for (const path of paths) {
      const progress = progressByPath[path.id]
      if (!progress || progress.completed < path.totalLessons) {
        return path
      }
    }
    return null
  }

  const recommendedPath = getRecommendedPath()

  if (!session) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-[var(--primary)]" />
            <h1 className="text-2xl font-bold mb-2">Sign In to Track Progress</h1>
            <p className="text-[var(--muted-foreground)] mb-6">
              Create an account to track your learning progress and earn certifications.
            </p>
            <Link href="/auth/signin">
              <Button className="w-full">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-12 bg-gradient-to-br from-amber-500 via-orange-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/exodology"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Exodology
            </Link>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-black mb-2">Learning Dashboard</h1>
                <p className="text-white/80">
                  Welcome back, {session.user?.name || 'Learner'}! Track your progress across all paths.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black">{totalCompleted}</div>
                  <div className="text-xs text-white/70">Lessons Done</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black">{earnedCerts}</div>
                  <div className="text-xs text-white/70">Certifications</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black flex items-center justify-center gap-1">
                    <Flame className={`w-6 h-6 ${streakData?.isActiveToday ? 'text-orange-300' : 'text-white/50'}`} />
                    {streakData?.currentStreak || 0}
                  </div>
                  <div className="text-xs text-white/70">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black">{streakData?.totalLearningDays || 0}</div>
                  <div className="text-xs text-white/70">Total Days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overall Progress */}
              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-6">
                  <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
                    Overall Progress
                  </h2>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[var(--muted-foreground)]">Total Completion</span>
                      <span className="font-bold">{totalCompleted} / {totalLessons} lessons</span>
                    </div>
                    <div className="h-4 bg-[var(--muted)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${completionPercentage}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-gradient-to-r from-amber-500 via-teal-500 to-purple-500"
                      />
                    </div>
                    <div className="text-right text-sm font-bold mt-1">{completionPercentage}%</div>
                  </div>
                </CardContent>
              </Card>

              {/* Path Progress Cards */}
              <div className="space-y-4">
                <h2 className="text-xl font-black flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[var(--primary)]" />
                  Learning Paths
                </h2>

                {paths.map((path, i) => {
                  const progress = progressByPath[path.id] || { completed: 0, inProgress: 0, total: 0 }
                  const percentage = Math.round((progress.completed / path.totalLessons) * 100)
                  const isComplete = progress.completed >= path.totalLessons
                  const Icon = path.icon

                  return (
                    <motion.div
                      key={path.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card className={`border-2 ${isComplete ? 'border-green-500/50' : 'border-[var(--border)]'}`}>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                              isComplete ? 'from-green-500 to-emerald-600' : path.gradient
                            } flex items-center justify-center shadow-lg flex-shrink-0`}>
                              {isComplete ? (
                                <CheckCircle2 className="w-7 h-7 text-white" />
                              ) : (
                                <Icon className="w-7 h-7 text-white" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-bold text-[var(--foreground)] truncate">{path.name}</h3>
                                <span className="text-sm font-medium text-[var(--muted-foreground)]">
                                  {progress.completed}/{path.totalLessons}
                                </span>
                              </div>
                              <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden mb-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ duration: 0.5, delay: i * 0.1 }}
                                  className={`h-full ${isComplete ? 'bg-green-500' : `bg-gradient-to-r ${path.gradient}`}`}
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-[var(--muted-foreground)]">
                                  {isComplete ? `${path.certName} ✓` : `${percentage}% complete`}
                                </span>
                                <Link href={`/exodology/paths/${path.id}`}>
                                  <Button variant="ghost" size="sm">
                                    {isComplete ? 'Review' : 'Continue'}
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Streak Card */}
              {streakData && (
                <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-transparent">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-500" />
                      Learning Streak
                    </h3>
                    <div className="text-center mb-4">
                      <div className={`text-5xl font-black ${streakData.currentStreak > 0 ? 'text-orange-500' : 'text-[var(--muted-foreground)]'}`}>
                        {streakData.currentStreak}
                      </div>
                      <div className="text-sm text-[var(--muted-foreground)]">
                        {streakData.currentStreak === 1 ? 'day streak' : 'day streak'}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-[var(--foreground)]">{streakData.longestStreak}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">Best Streak</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-[var(--foreground)]">{streakData.totalLearningDays}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">Total Days</div>
                      </div>
                    </div>
                    {!streakData.isActiveToday && (
                      <div className="mt-4 p-3 bg-orange-500/10 rounded-lg text-center">
                        <p className="text-sm text-orange-600 font-medium">
                          Complete a lesson today to maintain your streak!
                        </p>
                      </div>
                    )}
                    {streakData.isActiveToday && (
                      <div className="mt-4 p-3 bg-green-500/10 rounded-lg text-center">
                        <p className="text-sm text-green-600 font-medium flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Active today!
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Recommended Next */}
              {recommendedPath && (
                <Card className="border-2 border-[var(--primary)]/30 bg-gradient-to-br from-[var(--primary)]/5 to-transparent">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[var(--primary)]" />
                      Recommended Next
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] mb-4">
                      Continue your learning journey with:
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${recommendedPath.gradient} flex items-center justify-center`}>
                        <recommendedPath.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-[var(--foreground)]">{recommendedPath.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {progressByPath[recommendedPath.id]?.completed || 0} of {recommendedPath.totalLessons} lessons
                        </p>
                      </div>
                    </div>
                    <Link href={`/exodology/paths/${recommendedPath.id}`}>
                      <Button className={`w-full bg-gradient-to-r ${recommendedPath.gradient}`}>
                        <Play className="w-4 h-4 mr-2" />
                        Continue Learning
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Certifications */}
              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[var(--primary)]" />
                    Certifications
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Exodological Literacy', earned: certifications?.foundations.earned, icon: Compass, color: 'amber' },
                      { name: 'Exodological Application', earned: certifications?.applied.earned, icon: Map, color: 'teal' },
                      { name: 'Exodological Stewardship', earned: certifications?.strategic.earned, icon: Target, color: 'purple' },
                      { name: 'Master Exodologist', earned: certifications?.master.earned, icon: Crown, color: 'yellow' }
                    ].map((cert) => (
                      <div key={cert.name} className={`flex items-center gap-3 p-2 rounded-lg ${cert.earned ? 'bg-green-500/10' : ''}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          cert.earned ? 'bg-green-500' : 'bg-[var(--muted)]'
                        }`}>
                          {cert.earned ? (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          ) : (
                            <cert.icon className="w-4 h-4 text-[var(--muted-foreground)]" />
                          )}
                        </div>
                        <span className={`text-sm ${cert.earned ? 'font-bold text-green-600' : 'text-[var(--muted-foreground)]'}`}>
                          {cert.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link href="/exodology/certifications">
                    <Button variant="outline" className="w-full mt-4">
                      View All Certifications
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              {recentActivity.length > 0 && (
                <Card className="border-2 border-[var(--border)]">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[var(--primary)]" />
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      {recentActivity.map((activity, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                          <Calendar className="w-4 h-4 text-[var(--muted-foreground)]" />
                          <span className="text-[var(--muted-foreground)]">
                            {new Date(activity.lastAccessedAt).toLocaleDateString()}
                          </span>
                          <span className="text-[var(--foreground)] truncate">
                            {activity.lessonId}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Links */}
              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-black mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    <Link href="/exodology">
                      <Button variant="ghost" className="w-full justify-start">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Exodology Home
                      </Button>
                    </Link>
                    <Link href="/exodology/reviews">
                      <Button variant="ghost" className="w-full justify-start">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Spaced Repetition
                      </Button>
                    </Link>
                    <Link href="/exodology/certifications">
                      <Button variant="ghost" className="w-full justify-start">
                        <Award className="w-4 h-4 mr-2" />
                        Certifications
                      </Button>
                    </Link>
                    <Link href="/learn">
                      <Button variant="ghost" className="w-full justify-start">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Other Courses
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
