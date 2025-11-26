'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  User,
  Settings,
  TrendingUp,
  Award,
  Leaf,
  Users,
  Briefcase,
  Target,
  Zap,
  Flame,
  Droplet,
  Wind,
  BookOpen,
  MessageCircle,
  FileText,
  CheckCircle2,
  ArrowUpRight,
  Activity,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function MyVolitionPage() {
  const { data: session, status } = useSession()
  const [projects, setProjects] = useState<any[]>([])
  const [activities, setActivities] = useState<any[]>([])
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Impact metrics state
  const [impactMetrics, setImpactMetrics] = useState({
    co2Saved: 127,
    wasteReduced: 89,
    energySaved: 234,
    waterSaved: 1450,
  })

  // Badge progress
  const [badgeProgress, setBadgeProgress] = useState([
    { name: 'Eco Warrior', icon: '🌱', progress: 75, current: 15, target: 20 },
    { name: 'Knowledge Seeker', icon: '📚', progress: 60, current: 12, target: 20 },
    { name: 'Community Builder', icon: '🤝', progress: 40, current: 8, target: 20 },
    { name: 'Impact Maker', icon: '💚', progress: 85, current: 17, target: 20 },
  ])

  useEffect(() => {
    if (session?.user?.id) {
      Promise.all([
        fetchProjects(),
        fetchActivities(),
        fetchProfile(),
      ]).finally(() => setIsLoading(false))
    }
  }, [session?.user?.id])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          const userProjects = data.data.filter((p: any) =>
            p.members.some((m: any) => m.userId === session?.user?.id) ||
            p.creatorId === session?.user?.id
          )
          setProjects(userProjects.slice(0, 3))
        }
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const fetchActivities = async () => {
    try {
      const res = await fetch('/api/activity?limit=4')
      if (res.ok) {
        const data = await res.json()
        if (data.success) setActivities(data.data)
      }
    } catch (error) {
      console.error('Error fetching activities:', error)
    }
  }

  const fetchProfile = async () => {
    try {
      const res = await fetch(`/api/users/${session?.user?.id}`)
      if (res.ok) {
        const data = await res.json()
        if (data.success) setUserProfile(data.data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading Your Volition...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const user = session.user

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Compact Header */}
      <div className="h-24 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] flex items-center px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <Zap className="w-8 h-8" />
              MY VOLITION
            </h1>
            <p className="text-sm font-bold text-white/90">
              Command Center • {user?.name?.split(' ')[0] || 'Explorer'}
            </p>
          </div>
          <Link href="/settings">
            <Button size="sm" variant="outline" className="font-bold bg-white/20 border-white/40 text-white hover:bg-white/30">
              <Settings className="w-4 h-4 mr-2" />
              SETTINGS
            </Button>
          </Link>
        </div>
      </div>

      {/* Single-Screen Dashboard - No Scroll */}
      <div className="container mx-auto px-6 py-4 max-h-[calc(100vh-8rem)] overflow-hidden">
        {/* Mission Statement Banner */}
        <div className="mb-3 p-3 bg-gradient-to-r from-[var(--primary)]/10 via-[var(--accent)]/10 to-[var(--secondary)]/10 border-2 border-theme-primary rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-black text-[var(--foreground)] mb-0.5">
                Your Personal Contribution Tracker
              </h2>
              <p className="text-xs font-semibold text-theme-muted leading-tight">
                This is YOUR dashboard to track how much you contribute and become part of Project Exodus.
                Every action you take—projects, learning, connections—builds a sustainable future together.
              </p>
            </div>
          </div>
        </div>

        {/* Tight 4-Column Grid */}
        <div className="grid grid-cols-12 gap-3 h-full">
          {/* LEFT COLUMN - Profile & Stats (3 cols) */}
          <div className="col-span-3 space-y-3">
            {/* Profile Mini Card */}
            <Card className="border-2 border-theme-primary">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    {user?.image ? (
                      <img src={user.image} alt={user.name || 'User'} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-black text-[var(--foreground)] truncate">
                      {user?.name || 'User'}
                    </h3>
                    <p className="text-xs font-medium text-theme-muted truncate">
                      {userProfile?.headline || 'Sustainability Advocate'}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1 text-center">
                  <div>
                    <div className="text-lg font-black text-theme-primary">{userProfile?._count?.followers || 0}</div>
                    <div className="text-[9px] font-bold text-theme-muted uppercase">Followers</div>
                  </div>
                  <div>
                    <div className="text-lg font-black text-theme-accent">{userProfile?._count?.following || 0}</div>
                    <div className="text-[9px] font-bold text-theme-muted uppercase">Following</div>
                  </div>
                  <div>
                    <div className="text-lg font-black text-theme-secondary">{projects.length}</div>
                    <div className="text-[9px] font-bold text-theme-muted uppercase">Projects</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Impact Gauges */}
            <Card className="border-2 border-theme-accent">
              <CardContent className="p-4">
                <h3 className="text-xs font-black text-[var(--foreground)] mb-3 flex items-center gap-1">
                  <Leaf className="w-3 h-3" />
                  ENVIRONMENTAL IMPACT
                </h3>
                <div className="space-y-2">
                  {/* CO2 */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-theme-muted flex items-center gap-1">
                        <Wind className="w-3 h-3" /> CO₂ Saved
                      </span>
                      <span className="text-xs font-black text-theme-primary">{impactMetrics.co2Saved}kg</span>
                    </div>
                    <div className="h-1.5 bg-[var(--muted)] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600" style={{ width: '63%' }} />
                    </div>
                  </div>
                  {/* Waste */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-theme-muted flex items-center gap-1">
                        <Target className="w-3 h-3" /> Waste Reduced
                      </span>
                      <span className="text-xs font-black text-theme-accent">{impactMetrics.wasteReduced}lbs</span>
                    </div>
                    <div className="h-1.5 bg-[var(--muted)] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-600" style={{ width: '44%' }} />
                    </div>
                  </div>
                  {/* Energy */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-theme-muted flex items-center gap-1">
                        <Zap className="w-3 h-3" /> Energy Saved
                      </span>
                      <span className="text-xs font-black text-theme-secondary">{impactMetrics.energySaved}kWh</span>
                    </div>
                    <div className="h-1.5 bg-[var(--muted)] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-600" style={{ width: '78%' }} />
                    </div>
                  </div>
                  {/* Water */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-theme-muted flex items-center gap-1">
                        <Droplet className="w-3 h-3" /> Water Saved
                      </span>
                      <span className="text-xs font-black text-theme-primary">{impactMetrics.waterSaved}gal</span>
                    </div>
                    <div className="h-1.5 bg-[var(--muted)] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600" style={{ width: '91%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badge Progress */}
            <Card className="border-2 border-theme-primary">
              <CardContent className="p-4">
                <h3 className="text-xs font-black text-[var(--foreground)] mb-3 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  BADGE PROGRESS
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {badgeProgress.map((badge, i) => (
                    <div key={i} className="text-center p-2 bg-[var(--muted)] rounded-lg">
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <div className="text-[9px] font-bold text-theme-muted mb-1">{badge.name}</div>
                      <div className="h-1 bg-[var(--background)] rounded-full overflow-hidden mb-1">
                        <div
                          className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
                          style={{ width: `${badge.progress}%` }}
                        />
                      </div>
                      <div className="text-[8px] font-black text-theme-primary">{badge.current}/{badge.target}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CENTER COLUMN - Projects & Activity (6 cols) */}
          <div className="col-span-6 space-y-3">
            {/* Active Projects */}
            <Card className="border-2 border-theme-primary">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-black text-[var(--foreground)] flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    ACTIVE PROJECTS
                  </h3>
                  <Link href="/community/projects/new">
                    <Button size="sm" variant="outline" className="font-bold text-xs h-7">
                      + NEW
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <Link key={project.id} href={`/community/projects/${project.slug}`}>
                        <div className="p-3 bg-[var(--muted)] rounded-lg border-2 border-[var(--border)] hover:border-theme-accent transition-all cursor-pointer h-full">
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-[8px] font-black text-theme-primary uppercase px-2 py-0.5 bg-[var(--background)] rounded">
                              {project.status}
                            </span>
                            <Target className="w-3 h-3 text-theme-accent" />
                          </div>
                          <h4 className="text-xs font-black text-[var(--foreground)] mb-1 line-clamp-2">
                            {project.name}
                          </h4>
                          <p className="text-[10px] font-medium text-theme-muted line-clamp-2 mb-2">
                            {project.description}
                          </p>
                          <div className="flex items-center gap-1 text-[9px] font-bold text-theme-muted">
                            <Users className="w-3 h-3" />
                            {project._count.members} members
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-6">
                      <Briefcase className="w-8 h-8 text-theme-muted mx-auto mb-2 opacity-50" />
                      <p className="text-xs font-bold text-theme-muted">No active projects</p>
                      <Link href="/community/projects/new">
                        <Button size="sm" className="mt-2 font-bold text-xs">START PROJECT</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Activity Stream & Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Recent Activity */}
              <Card className="border-2 border-theme-accent">
                <CardContent className="p-4">
                  <h3 className="text-xs font-black text-[var(--foreground)] mb-3 flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    RECENT ACTIVITY
                  </h3>
                  <div className="space-y-2">
                    {activities.length > 0 ? (
                      activities.slice(0, 4).map((activity) => (
                        <div key={activity.id} className="text-xs">
                          <div className="flex items-start gap-2 p-2 bg-[var(--muted)] rounded">
                            <TrendingUp className="w-3 h-3 text-theme-accent flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-[var(--foreground)] line-clamp-2">
                                {activity.description || activity.type}
                              </p>
                              <p className="text-[9px] font-medium text-theme-muted">
                                {new Date(activity.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-theme-muted text-center py-4">No recent activity</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Stats */}
              <Card className="border-2 border-theme-secondary">
                <CardContent className="p-4">
                  <h3 className="text-xs font-black text-[var(--foreground)] mb-3 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    LEARNING JOURNEY
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-[var(--muted)] rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-theme-primary" />
                        <span className="text-[10px] font-bold text-theme-muted">Articles Read</span>
                      </div>
                      <span className="text-lg font-black text-theme-primary">12</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-[var(--muted)] rounded">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-theme-accent" />
                        <span className="text-[10px] font-bold text-theme-muted">Courses Done</span>
                      </div>
                      <span className="text-lg font-black text-theme-accent">3</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-[var(--muted)] rounded">
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-theme-secondary" />
                        <span className="text-[10px] font-bold text-theme-muted">Learning Hours</span>
                      </div>
                      <span className="text-lg font-black text-theme-secondary">24h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* RIGHT COLUMN - Network & Quick Actions (3 cols) */}
          <div className="col-span-3 space-y-3">
            {/* Network Stats */}
            <Card className="border-2 border-theme-primary">
              <CardContent className="p-4">
                <h3 className="text-xs font-black text-[var(--foreground)] mb-3 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  NETWORK
                </h3>
                <div className="space-y-2">
                  <div className="p-2 bg-gradient-to-br from-[var(--primary)]/10 to-transparent border border-theme-primary rounded">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-theme-muted">Connections</span>
                      <span className="text-xl font-black text-theme-primary">{userProfile?._count?.followers || 0}</span>
                    </div>
                  </div>
                  <div className="p-2 bg-gradient-to-br from-[var(--accent)]/10 to-transparent border border-theme-accent rounded">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-theme-muted">Communities</span>
                      <span className="text-xl font-black text-theme-accent">5</span>
                    </div>
                  </div>
                  <Link href="/network">
                    <Button size="sm" className="w-full font-bold text-xs">
                      VIEW NETWORK
                      <ArrowUpRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-2 border-theme-accent bg-gradient-to-br from-[var(--accent)]/5 to-transparent">
              <CardContent className="p-4">
                <h3 className="text-xs font-black text-[var(--foreground)] mb-3 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  QUICK ACTIONS
                </h3>
                <div className="space-y-2">
                  <Link href="/community/projects/new">
                    <Button variant="outline" size="sm" className="w-full font-bold text-xs justify-start">
                      <Briefcase className="w-3 h-3 mr-2" />
                      Start New Project
                    </Button>
                  </Link>
                  <Link href="/learn">
                    <Button variant="outline" size="sm" className="w-full font-bold text-xs justify-start">
                      <BookOpen className="w-3 h-3 mr-2" />
                      Write Article
                    </Button>
                  </Link>
                  <Link href="/community/forum">
                    <Button variant="outline" size="sm" className="w-full font-bold text-xs justify-start">
                      <MessageCircle className="w-3 h-3 mr-2" />
                      Join Discussion
                    </Button>
                  </Link>
                  <Link href="/network/browse">
                    <Button variant="outline" size="sm" className="w-full font-bold text-xs justify-start">
                      <Users className="w-3 h-3 mr-2" />
                      Connect with Peers
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Achievements Showcase */}
            <Card className="border-2 border-theme-secondary bg-gradient-to-br from-[var(--secondary)]/5 to-transparent">
              <CardContent className="p-4">
                <h3 className="text-xs font-black text-[var(--foreground)] mb-3 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  LATEST ACHIEVEMENTS
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-500/30 rounded">
                    <div className="text-xl mb-1">🏆</div>
                    <div className="text-[8px] font-black text-yellow-600">FIRST PROJECT</div>
                  </div>
                  <div className="text-center p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 rounded">
                    <div className="text-xl mb-1">🌟</div>
                    <div className="text-[8px] font-black text-green-600">ECO CHAMPION</div>
                  </div>
                  <div className="text-center p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/30 rounded">
                    <div className="text-xl mb-1">📖</div>
                    <div className="text-[8px] font-black text-blue-600">KNOWLEDGE BUFF</div>
                  </div>
                  <div className="text-center p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/30 rounded">
                    <div className="text-xl mb-1">🤝</div>
                    <div className="text-[8px] font-black text-purple-600">TEAM PLAYER</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
