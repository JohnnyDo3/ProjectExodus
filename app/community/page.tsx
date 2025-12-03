import { Button } from '@/components/ui/Button'
import {
  MessageSquare, Users, Award, Rocket, Sparkles, Heart,
  UserPlus, ArrowRight, Activity, Zap, Globe, BookOpen,
  ChevronRight, PenTool, Target, Compass, Star, Shield,
  Eye, Flame, Crown, Waves, Mountain, TreePine, Sun, Moon
} from 'lucide-react'
import Link from 'next/link'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'
import { TreeBranches } from '@/components/decorative/TreeBranches'
import { FlyingBirds } from '@/components/decorative/FlyingBirds'
import { RecentDiscussionsWidget } from '@/components/community/RecentDiscussionsWidget'
import { ActiveProjectsWidget } from '@/components/community/ActiveProjectsWidget'
import { NetworkActivityFeed } from '@/components/community/NetworkActivityFeed'

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
        _count: { select: { comments: true, likes: true } }
      }
    })

    const stats = await prisma.$transaction([
      prisma.user.count(),
      prisma.project.count({ where: { status: { in: ['ACTIVE', 'PLANNING'] } } }),
      prisma.article.count({ where: { status: 'PUBLISHED' } })
    ])

    return {
      user,
      suggestedUsers,
      activeProjects,
      recentDiscussions,
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

  // Non-logged-in: Calm, inviting public landing
  if (!session?.user?.id) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        {/* Hero Section - Calm & Welcoming */}
        <section className="relative py-16 sm:py-24 overflow-hidden">
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[color-mix(in_srgb,var(--primary)_8%,var(--background))] to-[var(--background)]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Welcome badge - subtle */}
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-theme-primary" />
                <span className="text-xs font-semibold text-theme-muted uppercase tracking-wide">Welcome to the Community</span>
              </div>

              {/* Main headline - friendly, not shouty */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4 leading-tight">
                Connect with people building
                <span className="text-theme-primary"> a better future</span>
              </h1>

              <p className="text-base sm:text-lg text-theme-muted mb-8 max-w-2xl leading-relaxed">
                Join a supportive community of changemakers sharing ideas, collaborating on projects, and learning together. Everyone's welcome here.
              </p>

              {/* CTA Buttons - understated */}
              <div className="flex flex-wrap items-center gap-3 mb-10">
                <Link href="/auth/signup">
                  <Button size="sm" className="px-5 py-2.5 rounded-lg font-semibold shadow-md">
                    <Zap className="w-4 h-4 mr-2" />
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button size="sm" variant="outline" className="px-5 py-2.5 rounded-lg font-semibold border">
                    Sign In
                  </Button>
                </Link>
              </div>

              {/* Social proof - inline, readable */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-theme-muted">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`w-6 h-6 rounded-full bg-gradient-to-br ${['from-emerald-400 to-green-500', 'from-blue-400 to-cyan-500', 'from-amber-400 to-orange-500', 'from-violet-400 to-purple-500'][i-1]} border-2 border-[var(--background)]`} />
                    ))}
                  </div>
                  <span>2,000+ members</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500" /> Community-driven
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" /> Safe space
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Clean grid */}
        <section className="py-12 sm:py-16 bg-[var(--background)]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <span className="text-xs font-semibold text-theme-accent uppercase tracking-wide">What you'll find</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mt-1">
                  Everything you need to make an impact
                </h2>
              </div>

              {/* Features grid - clean, readable cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: MessageSquare, title: 'Discussions', desc: 'Share ideas and learn from others in daily conversations', color: 'text-theme-primary' },
                  { icon: Rocket, title: 'Projects', desc: 'Start or join community initiatives near you', color: 'text-theme-secondary' },
                  { icon: BookOpen, title: 'Articles', desc: 'Read and write about sustainability topics', color: 'text-theme-accent' },
                  { icon: Users, title: 'Network', desc: 'Connect with like-minded people globally', color: 'text-emerald-500' },
                  { icon: Award, title: 'Recognition', desc: 'Earn badges as you contribute and grow', color: 'text-amber-500' },
                  { icon: Heart, title: 'Social Feed', desc: 'Share your journey and celebrate wins', color: 'text-rose-500' },
                ].map((feature, i) => (
                  <div key={i} className="p-4 bg-[var(--card)] rounded-xl border border-[var(--border)] hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <feature.icon className={`w-5 h-5 ${feature.color} flex-shrink-0 mt-0.5`} />
                      <div>
                        <h3 className="font-semibold text-[var(--foreground)] mb-1">{feature.title}</h3>
                        <p className="text-sm text-theme-muted leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Gentle invitation */}
        <section className="py-12 sm:py-16 bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--primary)]/10 rounded-full mb-4">
                <Crown className="w-3.5 h-3.5 text-theme-primary" />
                <span className="text-xs font-semibold text-theme-primary">Always free</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-3">
                Ready to join us?
              </h2>
              <p className="text-theme-muted mb-6">
                Create your free account and start connecting with the community today.
              </p>
              <Link href="/auth/signup">
                <Button className="px-6 py-2.5 rounded-lg font-semibold shadow-md">
                  Create Free Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Logged-in user: Personalized dashboard
  const dashboardData = await getDashboardData(session.user.id)

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-lg sm:text-xl font-semibold text-theme-muted text-center">Error loading dashboard</p>
      </div>
    )
  }

  const { user, suggestedUsers, activeProjects, recentDiscussions, communityStats } = dashboardData
  const userArchetype = user?.guardianArchetype ? archetypeConfig[user.guardianArchetype] : null
  const ArchetypeIcon = userArchetype?.icon || Compass

  return (
    <div className="min-h-screen bg-[var(--background)] relative">
      <TreeBranches />
      <FlyingBirds />

      {/* Welcome Header - Clean & Calm */}
      <section className="relative bg-gradient-to-b from-[color-mix(in_srgb,var(--primary)_12%,var(--background))] to-[var(--background)] pt-6 pb-4">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Row - Horizontal layout */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              {/* User info */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-theme-primary/30">
                    {user?.image ? (
                      <img src={user.image} alt={user.name || 'User'} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                        <span className="text-lg font-semibold text-white">{user?.name?.[0]?.toUpperCase() || '?'}</span>
                      </div>
                    )}
                  </div>
                  {userArchetype && (
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-md bg-gradient-to-br ${userArchetype.gradient} flex items-center justify-center shadow-sm`}>
                      <ArchetypeIcon className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs text-theme-muted">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </p>
                  <h1 className="text-lg sm:text-xl font-semibold text-[var(--foreground)]">
                    Welcome back, {user?.name?.split(' ')[0] || 'friend'}
                  </h1>
                </div>
              </div>

              {/* Quick Stats - Inline */}
              <div className="flex items-center gap-4 sm:gap-6 text-sm">
                {[
                  { value: user?._count.articles || 0, label: 'Articles' },
                  { value: user?._count.createdProjects || 0, label: 'Projects' },
                  { value: user?._count.followers || 0, label: 'Followers' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="font-semibold text-[var(--foreground)]">{stat.value}</div>
                    <div className="text-xs text-theme-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions - Compact horizontal row */}
            <div className="flex items-center gap-2 flex-wrap">
              <Link href="/community/feed">
                <Button size="sm" className="px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm">
                  <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                  Discussions
                </Button>
              </Link>
              <Link href="/articles">
                <Button size="sm" variant="outline" className="px-3 py-1.5 rounded-lg text-xs font-medium border">
                  <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                  Articles
                </Button>
              </Link>
              <Link href="/community/projects/new">
                <Button size="sm" variant="outline" className="px-3 py-1.5 rounded-lg text-xs font-medium border">
                  <Rocket className="w-3.5 h-3.5 mr-1.5" />
                  New Project
                </Button>
              </Link>
              <Link href="/community/leaderboard" className="hidden sm:block">
                <Button size="sm" variant="ghost" className="px-3 py-1.5 rounded-lg text-xs font-medium">
                  <Award className="w-3.5 h-3.5 mr-1.5" />
                  Leaderboard
                </Button>
              </Link>
              <Link href="/community/users" className="hidden sm:block">
                <Button size="sm" variant="ghost" className="px-3 py-1.5 rounded-lg text-xs font-medium">
                  <Users className="w-3.5 h-3.5 mr-1.5" />
                  Members
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Community Stats Bar - Subtle */}
        <div className="mt-4 pt-3 border-t border-[var(--border)]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto flex items-center justify-start gap-6 text-sm text-theme-muted overflow-x-auto">
              {[
                { icon: Users, value: communityStats.totalMembers, label: 'members' },
                { icon: Rocket, value: communityStats.totalProjects, label: 'projects' },
                { icon: BookOpen, value: communityStats.totalArticles, label: 'articles' },
                { icon: Activity, value: communityStats.activeProjects, label: 'active' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-1.5 flex-shrink-0">
                  <stat.icon className="w-3.5 h-3.5" />
                  <span className="font-medium text-[var(--foreground)]">{stat.value.toLocaleString()}</span>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Grid */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-4 sm:gap-6">
              {/* Main Content */}
              <div className="lg:col-span-8 space-y-4">
                <RecentDiscussionsWidget initialDiscussions={recentDiscussions} />
                <ActiveProjectsWidget initialProjects={activeProjects} />

                {/* People to Follow - Clean card */}
                <div className="p-4 bg-[var(--card)] rounded-xl border border-[var(--border)]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4 text-theme-primary" />
                      <h2 className="text-sm font-semibold text-[var(--foreground)]">People to Follow</h2>
                    </div>
                    <Link href="/community/users" className="text-xs text-theme-primary hover:underline">
                      See all
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {suggestedUsers.slice(0, 4).map((suggestedUser: any) => {
                      const userArchetypeConfig = suggestedUser.guardianArchetype ? archetypeConfig[suggestedUser.guardianArchetype] : null
                      const UserArchetypeIcon = userArchetypeConfig?.icon || Compass

                      return (
                        <Link key={suggestedUser.id} href={`/profile/${suggestedUser.id}`}>
                          <div className="p-3 bg-[var(--muted)]/50 rounded-lg hover:bg-[var(--muted)] transition-colors text-center">
                            <div className="relative mx-auto w-10 h-10 mb-2">
                              {suggestedUser.image ? (
                                <img src={suggestedUser.image} alt={suggestedUser.name || 'User'} className="w-full h-full rounded-lg object-cover" />
                              ) : (
                                <div className="w-full h-full rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                                  <span className="text-sm font-medium text-white">{suggestedUser.name?.[0]?.toUpperCase() || '?'}</span>
                                </div>
                              )}
                              {userArchetypeConfig && (
                                <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded bg-gradient-to-br ${userArchetypeConfig.gradient} flex items-center justify-center`}>
                                  <UserArchetypeIcon className="w-2.5 h-2.5 text-white" />
                                </div>
                              )}
                            </div>
                            <p className="text-xs font-medium text-[var(--foreground)] truncate">{suggestedUser.name || 'Anonymous'}</p>
                            <p className="text-[10px] text-theme-muted">{suggestedUser._count.followers} followers</p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-24 space-y-4">
                  <NetworkActivityFeed />

                  {/* Quick Write - Subtle */}
                  <div className="p-4 bg-[color-mix(in_srgb,var(--accent)_15%,var(--card))] rounded-xl border border-[var(--accent)]/30">
                    <div className="flex items-center gap-2 mb-3">
                      <PenTool className="w-4 h-4 text-theme-accent" />
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--foreground)]">Share Your Story</h3>
                        <p className="text-xs text-theme-muted">Write an article</p>
                      </div>
                    </div>
                    <Link href="/articles/write">
                      <Button size="sm" className="w-full text-xs font-medium rounded-lg">
                        Start Writing
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </Link>
                  </div>

                  {/* Badges - Clean */}
                  {user?.userBadges && user.userBadges.length > 0 && (
                    <div className="p-4 bg-[var(--card)] rounded-xl border border-[var(--border)]">
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="w-4 h-4 text-amber-500" />
                        <h3 className="text-sm font-semibold text-[var(--foreground)]">Recent Badges</h3>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {user.userBadges.map((ub: any) => (
                          <span key={ub.id} className="px-2 py-1 bg-amber-500/10 rounded text-xs text-amber-600">
                            {ub.badge.name}
                          </span>
                        ))}
                      </div>
                      <Link href="/my/volition" className="block mt-3 text-xs text-theme-primary hover:underline">
                        View all badges
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
