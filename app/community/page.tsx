import { Button } from '@/components/ui/Button'
import {
  MessageSquare, Users, Award, Rocket, Sparkles, Heart,
  UserPlus, ArrowRight, Activity, Zap, Globe, BookOpen,
  ChevronRight, PenTool, Target, Compass, Star, Shield,
  Eye, Flame, Crown, Waves, Mountain, TreePine, Sun, Moon,
  TrendingUp, Calendar, MapPin, Coffee
} from 'lucide-react'
import Link from 'next/link'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { RecentDiscussionsWidget } from '@/components/community/RecentDiscussionsWidget'
import { ActiveProjectsWidget } from '@/components/community/ActiveProjectsWidget'
import { NetworkActivityFeed } from '@/components/community/NetworkActivityFeed'
import { CommunityHeartPage } from '@/components/community/CommunityHeartPage'

// Guardian archetype icons and colors
const archetypeConfig: Record<string, { icon: any, gradient: string, name: string }> = {
  GUARDIAN_OF_TEMPERANCE: { icon: Shield, gradient: 'from-blue-500 to-cyan-500', name: 'Guardian of Temperance' },
  GUARDIAN_OF_WISDOM: { icon: Eye, gradient: 'from-violet-500 to-purple-500', name: 'Guardian of Wisdom' },
  GUARDIAN_OF_COURAGE: { icon: Flame, gradient: 'from-orange-500 to-red-500', name: 'Guardian of Courage' },
  GUARDIAN_OF_JUSTICE: { icon: Target, gradient: 'from-amber-500 to-yellow-500', name: 'Guardian of Justice' },
  GUARDIAN_OF_HUMANITY: { icon: Heart, gradient: 'from-pink-500 to-rose-500', name: 'Guardian of Humanity' },
  GUARDIAN_OF_TRANSCENDENCE: { icon: Sparkles, gradient: 'from-indigo-500 to-blue-500', name: 'Guardian of Transcendence' },
  GUARDIAN_OF_NATURE: { icon: Globe, gradient: 'from-emerald-500 to-green-500', name: 'Guardian of Nature' },
}

async function getDashboardData(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userBadges: {
          take: 5,
          include: { badge: true },
          orderBy: { earnedAt: 'desc' }
        },
        createdProjects: {
          take: 3,
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            articles: true,
            followers: true,
            following: true,
            createdProjects: true
          }
        }
      }
    })

    const totalArticles = await prisma.article.count()
    const totalProjects = await prisma.project.count()

    const suggestedUsers = await prisma.user.findMany({
      where: {
        NOT: { id: userId },
        followers: {
          some: {
            createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
          }
        }
      },
      take: 8,
      select: {
        id: true,
        name: true,
        image: true,
        guardianArchetype: true,
        _count: { select: { followers: true, articles: true } }
      },
      orderBy: { followers: { _count: 'desc' } }
    })

    const activeProjects = await prisma.project.findMany({
      where: { status: 'ACTIVE', NOT: { creatorId: userId } },
      take: 6,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, name: true, slug: true, description: true,
        status: true, createdAt: true,
        creator: { select: { name: true, image: true } },
        _count: { select: { members: true } }
      }
    })

    const recentDiscussions = await prisma.socialPost.findMany({
      where: { visibility: 'PUBLIC' },
      take: 6,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, content: true, createdAt: true,
        user: { select: { id: true, name: true, image: true } },
        _count: { select: { comments: true, likes: true } },
        likes: {
          where: { userId: userId },
          select: { id: true },
          take: 1
        }
      }
    })

    // Transform to include isLiked boolean
    const discussionsWithLikeStatus = recentDiscussions.map((d: typeof recentDiscussions[number]) => ({
      ...d,
      isLiked: d.likes.length > 0,
      likes: undefined // Remove the likes array, keep only isLiked
    }))

    const stats = await prisma.$transaction([
      prisma.user.count(),
      prisma.project.count({ where: { status: { in: ['ACTIVE', 'PLANNING'] } } }),
      prisma.article.count({ where: { status: 'PUBLISHED' } })
    ])

    return {
      user,
      suggestedUsers,
      activeProjects,
      recentDiscussions: discussionsWithLikeStatus,
      communityStats: {
        totalMembers: stats[0],
        activeProjects: stats[1],
        knowledgeArticles: stats[2],
        totalArticles,
        totalProjects
      }
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return null
  }
}

export default async function CommunityPage() {
  const session = await auth()

  // ============================================
  // NON-LOGGED IN VIEW - Living Heart Page
  // ============================================
  if (!session?.user?.id) {
    return <CommunityHeartPage isAuthenticated={false} />
  }

  // ============================================
  // LOGGED IN VIEW - Dashboard Bento Layout
  // ============================================
  const dashboardData = await getDashboardData(session.user.id)

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-xl font-semibold text-theme-muted">Error loading dashboard</p>
      </div>
    )
  }

  const { user, suggestedUsers, activeProjects, recentDiscussions, communityStats } = dashboardData
  const userArchetype = user?.guardianArchetype ? archetypeConfig[user.guardianArchetype] : null
  const ArchetypeIcon = userArchetype?.icon || Compass

  return (
    <div className="min-h-screen bg-[var(--muted)] relative">
      {/* Day Theme - Warm palette */}
      <div className="day-only absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-transparent to-emerald-50/30" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[radial-gradient(circle,rgba(253,224,71,0.15)_0%,transparent_70%)]" />
      </div>

      {/* Night Theme - Cool palette with stars */}
      <div className="night-only absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-indigo-900/15" />
        <div className="absolute top-20 left-[10%] w-1 h-1 bg-white/30 rounded-full animate-pulse" />
        <div className="absolute top-32 left-[30%] w-0.5 h-0.5 bg-white/25 rounded-full" />
        <div className="absolute top-16 left-[60%] w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }} />
      </div>

      {/* Compact Profile Banner */}
      <section className={`relative overflow-hidden bg-gradient-to-r ${userArchetype?.gradient || 'from-[var(--primary)] to-[var(--accent)]'}`}>
        <div className="absolute inset-0 bg-black/5" />
        <div className="container mx-auto px-4 py-5 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/20 backdrop-blur p-0.5">
                  {user?.image ? (
                    <img src={user.image} alt="" className="w-full h-full rounded-lg object-cover" />
                  ) : (
                    <div className="w-full h-full rounded-lg bg-white/30 flex items-center justify-center">
                      <span className="text-lg font-semibold text-white">{user?.name?.[0]?.toUpperCase()}</span>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded bg-white/30 backdrop-blur flex items-center justify-center">
                  <ArchetypeIcon className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="text-white">
                <p className="text-[10px] opacity-70">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                <h1 className="text-base sm:text-lg font-semibold">Welcome, {user?.name?.split(' ')[0]}</h1>
                {userArchetype && (
                  <p className="text-[10px] opacity-70 flex items-center gap-1">
                    <ArchetypeIcon className="w-2.5 h-2.5" /> {userArchetype.name}
                  </p>
                )}
              </div>
            </div>

            {/* Compact Stats Row */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-lg px-4 py-2">
              {[
                { value: user?._count.articles || 0, label: 'Articles' },
                { value: user?._count.createdProjects || 0, label: 'Projects' },
                { value: user?._count.followers || 0, label: 'Followers' },
              ].map((stat, i) => (
                <div key={i} className="text-center text-white">
                  <div className="text-base sm:text-lg font-semibold">{stat.value}</div>
                  <div className="text-[10px] opacity-70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compact Quick Actions Bar */}
      <section className="bg-[var(--card)] border-b border-[var(--border)] sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1.5 py-2 overflow-x-auto scrollbar-hide">
            <Link href="/community/feed">
              <Button size="sm" className="rounded-full px-3 py-1 text-xs font-medium h-7">
                <MessageSquare className="w-3 h-3 mr-1.5" />
                Discussions
              </Button>
            </Link>
            <Link href="/articles">
              <Button size="sm" variant="outline" className="rounded-full px-3 py-1 text-xs font-medium border h-7">
                <BookOpen className="w-3 h-3 mr-1.5" />
                Articles
              </Button>
            </Link>
            <Link href="/community/projects/new">
              <Button size="sm" variant="outline" className="rounded-full px-3 py-1 text-xs font-medium border h-7">
                <Rocket className="w-3 h-3 mr-1.5" />
                New Project
              </Button>
            </Link>
            <Link href="/community/leaderboard">
              <Button size="sm" variant="ghost" className="rounded-full px-3 py-1 text-xs font-medium h-7">
                <Award className="w-3 h-3 mr-1.5" />
                Leaderboard
              </Button>
            </Link>
            <Link href="/community/users">
              <Button size="sm" variant="ghost" className="rounded-full px-3 py-1 text-xs font-medium h-7">
                <Users className="w-3 h-3 mr-1.5" />
                Members
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Compact Dashboard Content */}
      <section className="py-4 relative z-10">
        <div className="container mx-auto px-4">
          {/* Compact Community Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {[
              { icon: Users, value: communityStats.totalMembers, label: 'Members', color: 'text-blue-500' },
              { icon: Rocket, value: communityStats.totalProjects, label: 'Projects', color: 'text-orange-500' },
              { icon: BookOpen, value: communityStats.totalArticles, label: 'Articles', color: 'text-emerald-500' },
              { icon: Activity, value: communityStats.activeProjects, label: 'Active', color: 'text-purple-500' },
            ].map((stat, i) => (
              <div key={i} className="p-2.5 bg-[var(--card)] rounded-lg border border-[var(--border)]">
                <stat.icon className={`w-4 h-4 ${stat.color} mb-1`} />
                <div className="text-lg font-semibold text-[var(--foreground)]">{stat.value.toLocaleString()}</div>
                <div className="text-[10px] text-theme-muted">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Compact Bento Grid */}
          <div className="grid lg:grid-cols-3 gap-3">
            {/* Main Column - Discussions & Projects */}
            <div className="lg:col-span-2 space-y-3">
              <RecentDiscussionsWidget initialDiscussions={recentDiscussions} />
              <ActiveProjectsWidget initialProjects={activeProjects} />
            </div>

            {/* Sidebar Column */}
            <div className="space-y-3">
              {/* Compact Write CTA */}
              <div className="p-4 bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] rounded-xl text-white">
                <PenTool className="w-6 h-6 mb-2 opacity-90" />
                <h3 className="font-semibold text-sm">Share Your Story</h3>
                <p className="text-xs opacity-80 mb-3">Write an article</p>
                <Link href="/articles/write">
                  <Button size="sm" className="w-full bg-white text-[var(--foreground)] hover:bg-white/90 rounded-lg text-xs font-medium h-7">
                    Start Writing
                  </Button>
                </Link>
              </div>

              {/* Activity Feed */}
              <NetworkActivityFeed />

              {/* Compact People to Follow */}
              <div className="p-3 bg-[var(--card)] rounded-lg border border-[var(--border)]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-[var(--foreground)] flex items-center gap-1.5">
                    <UserPlus className="w-3.5 h-3.5 text-theme-primary" />
                    Suggested
                  </h3>
                  <Link href="/network" className="text-[10px] text-theme-primary hover:underline">
                    See all
                  </Link>
                </div>
                <div className="space-y-2">
                  {suggestedUsers.slice(0, 3).map((suggestedUser: any) => {
                    const config = suggestedUser.guardianArchetype ? archetypeConfig[suggestedUser.guardianArchetype] : null
                    const Icon = config?.icon || Compass
                    return (
                      <Link key={suggestedUser.id} href={`/profile/${suggestedUser.id}`}>
                        <div className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors">
                          <div className="relative">
                            {suggestedUser.image ? (
                              <img src={suggestedUser.image} alt="" className="w-8 h-8 rounded-md object-cover" />
                            ) : (
                              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                                <span className="text-xs font-medium text-white">{suggestedUser.name?.[0]}</span>
                              </div>
                            )}
                            {config && (
                              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
                                <Icon className="w-2 h-2 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-[var(--foreground)] truncate">{suggestedUser.name}</p>
                            <p className="text-[10px] text-theme-muted">{suggestedUser._count.followers} followers</p>
                          </div>
                          <ChevronRight className="w-3 h-3 text-theme-muted" />
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Compact Badges */}
              {user?.userBadges && user.userBadges.length > 0 && (
                <div className="p-3 bg-[var(--card)] rounded-lg border border-[var(--border)]">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <h3 className="text-sm font-semibold text-[var(--foreground)]">Badges</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {user.userBadges.map((ub: any) => (
                      <span key={ub.id} className="px-2 py-1 bg-amber-500/10 rounded text-[10px] font-medium text-amber-600">
                        {ub.badge.name}
                      </span>
                    ))}
                  </div>
                  <Link href="/my/volition" className="block mt-2 text-[10px] text-theme-primary hover:underline">
                    View all
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
