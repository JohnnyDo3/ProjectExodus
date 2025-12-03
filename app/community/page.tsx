import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  MessageSquare, Users, Award, Rocket, Sparkles, Heart,
  TrendingUp, Calendar, Bell, UserPlus, ArrowRight, Activity,
  Zap, Globe, BookOpen, ChevronRight, PenTool, Target, Compass,
  Star, Shield, Eye, Flame, Crown
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
    // Get user with stats
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userBadges: {
          take: 5,
          include: {
            badge: true
          },
          orderBy: {
            earnedAt: 'desc'
          }
        },
        createdProjects: {
          take: 3,
          orderBy: {
            createdAt: 'desc'
          }
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

    // Get community activity stats
    const totalArticles = await prisma.article.count()
    const totalProjects = await prisma.project.count()

    // Get trending users (most followers in last 30 days)
    const suggestedUsers = await prisma.user.findMany({
      where: {
        NOT: {
          id: userId
        },
        followers: {
          some: {
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            }
          }
        }
      },
      take: 8,
      select: {
        id: true,
        name: true,
        image: true,
        guardianArchetype: true,
        _count: {
          select: {
            followers: true,
            articles: true
          }
        }
      },
      orderBy: {
        followers: {
          _count: 'desc'
        }
      }
    })

    // Get active projects
    const activeProjects = await prisma.project.findMany({
      where: {
        status: 'ACTIVE',
        NOT: {
          creatorId: userId
        }
      },
      take: 6,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        status: true,
        createdAt: true,
        creator: {
          select: {
            name: true,
            image: true
          }
        },
        _count: {
          select: {
            members: true
          }
        }
      }
    })

    // Get recent discussions (feed posts)
    const recentDiscussions = await prisma.socialPost.findMany({
      where: {
        visibility: 'PUBLIC'
      },
      take: 6,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      }
    })

    // Get community stats
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
        totalArticles: totalArticles,
        totalProjects: totalProjects
      }
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return null
  }
}

export default async function CommunityPage() {
  const session = await auth()

  // If not logged in, show immersive public landing page
  if (!session?.user?.id) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        {/* Animated Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)]">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-white/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center text-white space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-black uppercase tracking-widest">Join the Movement</span>
              </div>

              {/* Main headline */}
              <h1 className="leading-none" style={{
                fontSize: 'clamp(3.5rem, 12vw, 8rem)',
                fontWeight: 900,
                textShadow: '0 4px 30px rgba(0,0,0,0.3)'
              }}>
                BUILD THE
                <br />
                <span className="relative">
                  <span className="relative z-10">FUTURE</span>
                  <span className="absolute inset-0 bg-white/20 blur-xl" />
                </span>
              </h1>

              <p className="text-xl md:text-2xl font-bold opacity-90 max-w-3xl mx-auto leading-relaxed">
                Connect with <span className="text-yellow-300 font-black">thousands</span> of changemakers,
                share your journey, and collaborate on projects that matter
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/auth/signup">
                  <Button size="lg" className="text-xl px-12 py-8 bg-white text-[var(--primary)] hover:bg-gray-100 rounded-2xl font-black shadow-2xl transform hover:scale-105 transition-all">
                    <Zap className="w-6 h-6 mr-2" />
                    GET STARTED FREE
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button size="lg" variant="outline" className="text-xl px-12 py-8 bg-transparent text-white border-2 border-white/50 hover:bg-white/10 rounded-2xl font-black">
                    SIGN IN
                  </Button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`w-10 h-10 rounded-full bg-gradient-to-br ${['from-pink-400 to-rose-500', 'from-blue-400 to-cyan-500', 'from-green-400 to-emerald-500', 'from-purple-400 to-violet-500', 'from-amber-400 to-orange-500'][i-1]} border-2 border-white flex items-center justify-center`}>
                        <span className="text-xs font-bold text-white">{['A', 'B', 'C', 'D', 'E'][i-1]}</span>
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-bold">+2,000 members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-bold">Community-driven</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-300" />
                  <span className="text-sm font-bold">Safe & supportive</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-8 h-14 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
              <div className="w-2 h-3 bg-white rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* What Awaits You Section */}
        <section className="py-24 bg-[var(--background)] relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-[var(--accent)]/10 rounded-full text-sm font-black text-theme-accent uppercase tracking-wider mb-4">
                Unlock Your Potential
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-[var(--foreground)] mb-4">
                WHAT AWAITS YOU
              </h2>
              <p className="text-xl font-semibold text-theme-muted max-w-2xl mx-auto">
                Everything you need to make a real impact in your community and beyond
              </p>
            </div>

            {/* Bento Grid Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Large Feature Card */}
              <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/80 p-8 text-white group hover:shadow-2xl transition-all">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black mb-4">MEANINGFUL DISCUSSIONS</h3>
                  <p className="text-lg font-medium opacity-90 mb-6 flex-1">
                    Engage in deep conversations about sustainability, personal growth, and building a better world.
                    Share ideas, ask questions, and learn from diverse perspectives.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold opacity-75">
                    <span className="px-3 py-1 bg-white/20 rounded-full">Daily Topics</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full">Expert AMAs</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full">Book Clubs</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 text-white/5 text-[200px] font-black leading-none select-none">
                  01
                </div>
              </div>

              {/* Medium Cards */}
              <div className="relative overflow-hidden rounded-3xl bg-[var(--card)] border-4 border-theme-accent p-6 group hover:shadow-xl transition-all hover:border-[var(--accent)]">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/70 flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-[var(--foreground)] mb-2">COLLABORATIVE PROJECTS</h3>
                <p className="text-sm font-medium text-theme-muted">
                  Start or join local initiatives. Find collaborators who share your vision.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-[var(--card)] border-4 border-theme-secondary p-6 group hover:shadow-xl transition-all hover:border-[var(--secondary)]">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary)]/70 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-[var(--foreground)] mb-2">SHARED KNOWLEDGE</h3>
                <p className="text-sm font-medium text-theme-muted">
                  Access case studies and insights from community members around the world.
                </p>
              </div>

              {/* Bottom Row */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] p-6 text-white">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black mb-2">GLOBAL NETWORK</h3>
                <p className="text-sm font-medium opacity-90">
                  Connect with changemakers worldwide
                </p>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-[var(--muted)] p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-[var(--foreground)] mb-2">ACHIEVEMENTS</h3>
                <p className="text-sm font-medium text-theme-muted">
                  Earn badges and track your journey
                </p>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-[var(--muted)] p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-[var(--foreground)] mb-2">SOCIAL FEED</h3>
                <p className="text-sm font-medium text-theme-muted">
                  Share your journey and inspire others
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)]" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full">
                <Crown className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-bold">100% Free Forever</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black leading-tight">
                YOUR JOURNEY
                <br />
                STARTS NOW
              </h2>
              <p className="text-xl font-semibold opacity-90 max-w-2xl mx-auto">
                Join a community of passionate individuals committed to positive change.
                No credit card required. No strings attached.
              </p>
              <Link href="/auth/signup">
                <Button size="lg" className="text-2xl px-16 py-10 bg-white text-[var(--primary)] hover:bg-gray-100 rounded-2xl font-black shadow-2xl transform hover:scale-105 transition-all">
                  CREATE FREE ACCOUNT
                  <ArrowRight className="w-7 h-7 ml-3" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Logged-in user: Show personalized bento dashboard
  const dashboardData = await getDashboardData(session.user.id)

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-theme-muted">Error loading dashboard</p>
      </div>
    )
  }

  const { user, suggestedUsers, activeProjects, recentDiscussions, communityStats } = dashboardData

  // Get user's archetype config
  const userArchetype = user?.guardianArchetype ? archetypeConfig[user.guardianArchetype] : null
  const ArchetypeIcon = userArchetype?.icon || Compass

  return (
    <div className="min-h-screen bg-[var(--background)] relative">
      {/* Decorative Elements */}
      <TreeBranches />
      <FlyingBirds />

      {/* Immersive Welcome Header */}
      <section className="relative overflow-hidden">
        <div className={`py-10 px-4 bg-gradient-to-br ${userArchetype?.gradient || 'from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)]'} text-white`}>
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Welcome Message */}
                <div className="flex items-center gap-5">
                  {/* Avatar with archetype ring */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm p-1 transform rotate-3 hover:rotate-0 transition-transform">
                      {user?.image ? (
                        <img src={user.image} alt={user.name || 'User'} className="w-full h-full rounded-xl object-cover" />
                      ) : (
                        <div className="w-full h-full rounded-xl bg-white/30 flex items-center justify-center">
                          <span className="text-2xl font-black">{user?.name?.[0]?.toUpperCase() || '?'}</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-white/30 backdrop-blur-sm flex items-center justify-center">
                      <ArchetypeIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-bold opacity-80 mb-1">
                      {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                    <h1 className="text-3xl md:text-4xl font-black">
                      Welcome back, {user?.name?.split(' ')[0] || 'friend'}!
                    </h1>
                    {userArchetype && (
                      <p className="text-sm font-semibold opacity-80 mt-1 flex items-center gap-2">
                        <ArchetypeIcon className="w-4 h-4" />
                        {userArchetype.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Stats Tiles */}
                <div className="flex flex-wrap gap-3">
                  <div className="px-5 py-3 bg-white/15 backdrop-blur-sm rounded-2xl text-center min-w-[80px]">
                    <div className="text-2xl font-black">{user?._count.articles || 0}</div>
                    <div className="text-[10px] font-bold uppercase opacity-80">Articles</div>
                  </div>
                  <div className="px-5 py-3 bg-white/15 backdrop-blur-sm rounded-2xl text-center min-w-[80px]">
                    <div className="text-2xl font-black">{user?._count.createdProjects || 0}</div>
                    <div className="text-[10px] font-bold uppercase opacity-80">Projects</div>
                  </div>
                  <div className="px-5 py-3 bg-white/15 backdrop-blur-sm rounded-2xl text-center min-w-[80px]">
                    <div className="text-2xl font-black">{user?._count.followers || 0}</div>
                    <div className="text-[10px] font-bold uppercase opacity-80">Followers</div>
                  </div>
                  <div className="px-5 py-3 bg-white/15 backdrop-blur-sm rounded-2xl text-center min-w-[80px]">
                    <div className="text-2xl font-black">{user?.userBadges.length || 0}</div>
                    <div className="text-[10px] font-bold uppercase opacity-80">Badges</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/community/feed">
                  <Button className="bg-white text-[var(--foreground)] hover:bg-gray-100 font-bold rounded-xl shadow-lg">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Discussions
                  </Button>
                </Link>
                <Link href="/articles">
                  <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-bold rounded-xl">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Articles
                  </Button>
                </Link>
                <Link href="/community/projects/new">
                  <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-bold rounded-xl">
                    <Rocket className="w-4 h-4 mr-2" />
                    Create Project
                  </Button>
                </Link>
                <Link href="/community/leaderboard">
                  <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-bold rounded-xl">
                    <Award className="w-4 h-4 mr-2" />
                    Leaderboard
                  </Button>
                </Link>
                <Link href="/community/users">
                  <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-bold rounded-xl">
                    <Users className="w-4 h-4 mr-2" />
                    Members
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Community Stats Bar */}
        <div className="bg-[var(--card)] border-b border-[var(--border)] py-4">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-8 text-center">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-theme-primary" />
                <span className="text-lg font-black text-[var(--foreground)]">{communityStats.totalMembers.toLocaleString()}</span>
                <span className="text-sm font-bold text-theme-muted">Members</span>
              </div>
              <div className="w-px h-6 bg-[var(--border)]" />
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-theme-secondary" />
                <span className="text-lg font-black text-[var(--foreground)]">{communityStats.totalProjects.toLocaleString()}</span>
                <span className="text-sm font-bold text-theme-muted">Projects</span>
              </div>
              <div className="w-px h-6 bg-[var(--border)]" />
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-theme-accent" />
                <span className="text-lg font-black text-[var(--foreground)]">{communityStats.totalArticles.toLocaleString()}</span>
                <span className="text-sm font-bold text-theme-muted">Articles</span>
              </div>
              <div className="w-px h-6 bg-[var(--border)]" />
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-500" />
                <span className="text-lg font-black text-[var(--foreground)]">{communityStats.activeProjects}</span>
                <span className="text-sm font-bold text-theme-muted">Active Now</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Dashboard */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Main Content Column - 8 cols */}
              <div className="lg:col-span-8 space-y-6">
                {/* Recent Discussions - Client Component with Filters */}
                <RecentDiscussionsWidget initialDiscussions={recentDiscussions} />

                {/* Active Projects - Client Component with Filters */}
                <ActiveProjectsWidget initialProjects={activeProjects} />

                {/* People to Follow - Full Width Card */}
                <div className="p-6 bg-[var(--card)] rounded-3xl border-4 border-theme-primary/30 shadow-lg overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[var(--primary)]/10 to-transparent rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />

                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/70 flex items-center justify-center shadow-lg">
                        <UserPlus className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-[var(--foreground)]">People to Follow</h2>
                        <p className="text-xs font-semibold text-theme-muted">Connect with active community members</p>
                      </div>
                    </div>
                    <Link href="/community/users">
                      <Button variant="ghost" size="sm" className="font-bold text-sm rounded-full hover:bg-[var(--muted)]">
                        See all <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                    {suggestedUsers.map((suggestedUser: any) => {
                      const userArchetypeConfig = suggestedUser.guardianArchetype ? archetypeConfig[suggestedUser.guardianArchetype] : null
                      const UserArchetypeIcon = userArchetypeConfig?.icon || Compass

                      return (
                        <Link key={suggestedUser.id} href={`/profile/${suggestedUser.id}`}>
                          <div className="group p-4 bg-gradient-to-br from-[var(--muted)]/50 to-[var(--muted)] rounded-2xl hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-theme-primary/30 text-center">
                            <div className="relative mx-auto w-16 h-16 mb-3">
                              {suggestedUser.image ? (
                                <img
                                  src={suggestedUser.image}
                                  alt={suggestedUser.name || 'User'}
                                  className="w-full h-full rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform"
                                />
                              ) : (
                                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                                  <span className="text-xl font-bold text-white">{suggestedUser.name?.[0]?.toUpperCase() || '?'}</span>
                                </div>
                              )}
                              {userArchetypeConfig && (
                                <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-gradient-to-br ${userArchetypeConfig.gradient} flex items-center justify-center shadow-md`}>
                                  <UserArchetypeIcon className="w-3.5 h-3.5 text-white" />
                                </div>
                              )}
                            </div>
                            <h4 className="font-bold text-sm text-[var(--foreground)] truncate">{suggestedUser.name || 'Anonymous'}</h4>
                            <div className="flex items-center justify-center gap-3 mt-2 text-[10px] font-bold text-theme-muted">
                              <span>{suggestedUser._count.followers} followers</span>
                              <span>•</span>
                              <span>{suggestedUser._count.articles} articles</span>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Sidebar Column - 4 cols */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Network Activity Feed */}
                  <NetworkActivityFeed />

                  {/* Quick Write Card */}
                  <div className="p-5 bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] rounded-3xl text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <PenTool className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-black">Share Your Story</h3>
                        <p className="text-xs font-medium opacity-80">Write an article for the community</p>
                      </div>
                    </div>
                    <Link href="/articles/write">
                      <Button className="w-full bg-white text-[var(--foreground)] hover:bg-gray-100 font-bold rounded-xl">
                        Start Writing
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>

                  {/* Badges Preview */}
                  {user?.userBadges && user.userBadges.length > 0 && (
                    <div className="p-5 bg-[var(--card)] rounded-3xl border-3 border-amber-500/40 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                          <Award className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-sm font-black text-[var(--foreground)]">Recent Badges</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {user.userBadges.map((ub: any) => (
                          <div key={ub.id} className="px-3 py-1.5 bg-amber-500/10 rounded-full border border-amber-500/30" title={ub.badge.description}>
                            <span className="text-xs font-bold text-amber-600">{ub.badge.name}</span>
                          </div>
                        ))}
                      </div>
                      <Link href="/my/volition" className="block mt-3">
                        <Button variant="ghost" size="sm" className="w-full font-bold text-xs rounded-full hover:bg-amber-500/10">
                          View all badges <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
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
