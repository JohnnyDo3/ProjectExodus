import { Button } from '@/components/ui/Button'
import {
  MessageSquare, Users, Award, Rocket, Sparkles, Heart,
  UserPlus, ArrowRight, Activity, Zap, Globe, BookOpen,
  ChevronRight, PenTool, Target, Compass, Star, Shield,
  Eye, Flame, Crown, Waves, Mountain, TreePine, Sun, Moon,
  TrendingUp, Calendar, MapPin, Coffee, Newspaper, Radio,
  Clock, AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { TreeBranches } from '@/components/decorative/TreeBranches'
import { FlyingBirds } from '@/components/decorative/FlyingBirds'
import { CommunityNewspaper } from '@/components/community/CommunityNewspaper'

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
      where: { status: 'ACTIVE' },
      take: 12,
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
      take: 15,
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

    // Get recent activity for "breaking news"
    const recentActivity = await prisma.$queryRaw<Array<{
      type: string
      message: string
      created_at: Date
    }>>`
      SELECT 'new_user' as type, CONCAT('New member joined: ', name) as message, "createdAt" as created_at
      FROM "User"
      WHERE "createdAt" >= NOW() - INTERVAL '24 hours'
      UNION ALL
      SELECT 'new_project' as type, CONCAT('New project launched: ', name) as message, "createdAt" as created_at
      FROM "Project"
      WHERE "createdAt" >= NOW() - INTERVAL '24 hours'
      UNION ALL
      SELECT 'new_article' as type, CONCAT('New article published: ', title) as message, "createdAt" as created_at
      FROM "Article"
      WHERE "createdAt" >= NOW() - INTERVAL '24 hours'
      ORDER BY created_at DESC
      LIMIT 10
    `

    return {
      user,
      suggestedUsers,
      activeProjects,
      recentDiscussions: discussionsWithLikeStatus,
      recentActivity,
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
  // NON-LOGGED IN VIEW - Compact Landing Design
  // ============================================
  if (!session?.user?.id) {
    return (
      <div className="min-h-screen bg-[var(--background)] relative">
        {/* Day Theme - Warm golden sunrise palette */}
        <div className="day-only absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/60 via-orange-50/40 to-emerald-100/50" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle,rgba(253,224,71,0.25)_0%,transparent_70%)]" />
          <Sun className="absolute top-6 right-8 w-14 h-14 text-amber-400/50" />
        </div>

        {/* Night Theme - Deep cool aurora palette */}
        <div className="night-only absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-indigo-950/30 to-purple-950/40" />
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle,rgba(30,64,175,0.15)_0%,transparent_70%)]" />
          <Moon className="absolute top-6 right-8 w-10 h-10 text-blue-200/40" />
          {/* Stars */}
          <div className="absolute top-12 left-[15%] w-1 h-1 bg-white/50 rounded-full animate-pulse" />
          <div className="absolute top-20 left-[25%] w-0.5 h-0.5 bg-white/40 rounded-full" />
          <div className="absolute top-8 left-[40%] w-1 h-1 bg-white/35 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-16 left-[55%] w-0.5 h-0.5 bg-white/45 rounded-full" />
          <div className="absolute top-24 left-[70%] w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Decorative elements */}
        <TreeBranches />
        <FlyingBirds />

        {/* HERO - Compact Split Layout */}
        <section className="min-h-[60vh] relative overflow-hidden">
          <div className="container mx-auto px-4 py-8 sm:py-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left: Content */}
              <div className="space-y-5">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--primary)]/10 rounded-full">
                    <div className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-pulse" />
                    <span className="text-[10px] font-semibold text-theme-primary">2,000+ changemakers</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--foreground)] leading-tight">
                    Where ideas
                    <span className="block text-theme-primary">become action</span>
                  </h1>

                  <p className="text-sm text-theme-muted max-w-sm">
                    Connect with people building a sustainable future. Collaborate, learn, make impact.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link href="/auth/signup">
                    <Button size="sm" className="px-5 py-2 rounded-lg font-semibold">
                      Join Free
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </Link>
                  <Link href="/auth/signin">
                    <Button size="sm" variant="outline" className="px-5 py-2 rounded-lg font-semibold border">
                      Sign In
                    </Button>
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs text-theme-muted">Safe & private</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-amber-500" />
                    <span className="text-xs text-theme-muted">Always free</span>
                  </div>
                </div>
              </div>

              {/* Right: Compact Visual Grid */}
              <div className="relative lg:pl-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-3">
                    <div className="p-4 bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-sm">
                      <MessageSquare className="w-6 h-6 text-theme-primary mb-2" />
                      <h3 className="text-sm font-semibold text-[var(--foreground)]">Round Table</h3>
                      <p className="text-xs text-theme-muted mt-0.5">Share ideas daily</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-xl text-white shadow-sm">
                      <Rocket className="w-6 h-6 mb-2 opacity-90" />
                      <h3 className="text-sm font-semibold">Projects</h3>
                      <p className="text-xs mt-0.5 opacity-80">Launch initiatives</p>
                    </div>
                  </div>
                  <div className="space-y-3 mt-6">
                    <div className="p-4 bg-[var(--muted)] rounded-xl">
                      <BookOpen className="w-6 h-6 text-theme-accent mb-2" />
                      <h3 className="text-sm font-semibold text-[var(--foreground)]">Articles</h3>
                      <p className="text-xs text-theme-muted mt-0.5">Share knowledge</p>
                    </div>
                    <div className="p-4 bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-sm">
                      <Users className="w-6 h-6 text-theme-secondary mb-2" />
                      <h3 className="text-sm font-semibold text-[var(--foreground)]">Network</h3>
                      <p className="text-xs text-theme-muted mt-0.5">Find your people</p>
                    </div>
                  </div>
                </div>

                {/* Compact Stats Bar */}
                <div className="mt-4 p-3 bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-sm">
                  <div className="flex items-center justify-around text-center">
                    <div>
                      <div className="text-lg font-bold text-theme-primary">2K+</div>
                      <div className="text-[10px] text-theme-muted">Members</div>
                    </div>
                    <div className="w-px h-6 bg-[var(--border)]" />
                    <div>
                      <div className="text-lg font-bold text-theme-accent">150+</div>
                      <div className="text-[10px] text-theme-muted">Projects</div>
                    </div>
                    <div className="w-px h-6 bg-[var(--border)]" />
                    <div>
                      <div className="text-lg font-bold text-theme-secondary">500+</div>
                      <div className="text-[10px] text-theme-muted">Articles</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES - Compact Grid */}
        <section className="py-8 bg-[var(--muted)]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)]">
                Everything you need
              </h2>
              <p className="text-xs text-theme-muted mt-1">Tools for collaboration</p>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:overflow-visible">
              {[
                { icon: MessageSquare, title: 'Round Table', color: 'bg-blue-500' },
                { icon: Rocket, title: 'Projects', color: 'bg-orange-500' },
                { icon: BookOpen, title: 'Articles', color: 'bg-emerald-500' },
                { icon: Users, title: 'Network', color: 'bg-purple-500' },
                { icon: Award, title: 'Badges', color: 'bg-amber-500' },
                { icon: Heart, title: 'Feed', color: 'bg-rose-500' },
              ].map((item, i) => (
                <div key={i} className="flex-shrink-0 w-24 sm:w-auto snap-start">
                  <div className="flex flex-col items-center p-3 bg-[var(--card)] rounded-lg border border-[var(--border)] hover:shadow transition-shadow">
                    <div className={`w-9 h-9 ${item.color} rounded-lg flex items-center justify-center mb-2`}>
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-[var(--foreground)]">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Compact */}
        <section className="py-10 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)]">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-lg mx-auto space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Start making an impact today
              </h2>
              <p className="text-sm text-white/80">
                Join changemakers building a better future.
              </p>
              <Link href="/auth/signup">
                <Button size="sm" className="px-6 py-2.5 bg-white text-[var(--primary)] hover:bg-white/90 rounded-lg font-semibold shadow-lg">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // ============================================
  // LOGGED IN VIEW - Newspaper Layout
  // ============================================
  const dashboardData = await getDashboardData(session.user.id)

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-xl font-semibold text-theme-muted">Error loading dashboard</p>
      </div>
    )
  }

  const { user, suggestedUsers, activeProjects, recentDiscussions, recentActivity, communityStats } = dashboardData

  return (
    <CommunityNewspaper
      user={user}
      suggestedUsers={suggestedUsers}
      activeProjects={activeProjects}
      recentDiscussions={recentDiscussions}
      recentActivity={recentActivity}
      communityStats={communityStats}
    />
  )
}
