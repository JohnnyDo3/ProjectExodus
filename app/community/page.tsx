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

  // Non-logged-in: Immersive public landing
  if (!session?.user?.id) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        {/* Animated Hero with Theme-Aware Background */}
        <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Day Theme Background - Warm sunrise/nature */}
          <div className="absolute inset-0 day-only">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-emerald-50 to-cyan-100" />
            <div className="absolute inset-0">
              {/* Sun rays */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[60%]" style={{
                background: `radial-gradient(ellipse at 50% -20%, rgba(255, 200, 100, 0.3) 0%, transparent 70%)`
              }} />
              {/* Rolling hills silhouette */}
              <svg className="absolute bottom-0 left-0 right-0 h-48 text-emerald-200/50" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="currentColor" d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,208C840,213,960,203,1080,186.7C1200,171,1320,149,1380,138.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
              </svg>
              <svg className="absolute bottom-0 left-0 right-0 h-32 text-emerald-300/40" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="currentColor" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
              </svg>
            </div>
            {/* Floating elements */}
            <div className="absolute top-20 right-20 w-32 h-32 sm:w-48 sm:h-48 bg-amber-200/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-40 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-emerald-200/40 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {/* Night Theme Background - Starry sky with aurora */}
          <div className="absolute inset-0 night-only">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900" />
            {/* Stars */}
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(2px 2px at 20px 30px, white, transparent),
                               radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
                               radial-gradient(1px 1px at 90px 40px, white, transparent),
                               radial-gradient(2px 2px at 160px 120px, rgba(255,255,255,0.9), transparent),
                               radial-gradient(1px 1px at 230px 80px, white, transparent),
                               radial-gradient(2px 2px at 300px 150px, rgba(255,255,255,0.7), transparent)`,
              backgroundSize: '350px 200px'
            }} />
            {/* Aurora effect */}
            <div className="absolute top-0 left-0 right-0 h-2/3">
              <div className="absolute top-20 left-1/4 w-[60%] h-48 bg-gradient-to-r from-emerald-500/20 via-cyan-400/30 to-purple-500/20 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute top-32 left-1/3 w-[40%] h-32 bg-gradient-to-r from-purple-500/15 via-pink-400/20 to-blue-500/15 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
            </div>
            {/* Mountain silhouette */}
            <svg className="absolute bottom-0 left-0 right-0 h-48 text-slate-800" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,320L80,288C160,256,320,192,480,181.3C640,171,800,213,960,224C1120,235,1280,213,1360,202.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
            </svg>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[var(--card)]/80 backdrop-blur-md rounded-full border border-[var(--border)] shadow-lg">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[var(--foreground)]">Join the Movement</span>
              </div>

              {/* Main headline */}
              <h1 className="text-[var(--foreground)]" style={{
                fontSize: 'clamp(2.5rem, 10vw, 7rem)',
                fontWeight: 900,
                lineHeight: 0.95
              }}>
                BUILD THE
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 50%, var(--secondary) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>FUTURE</span>
              </h1>

              <p className="text-base sm:text-xl md:text-2xl font-bold text-theme-muted max-w-3xl mx-auto leading-relaxed px-4">
                Connect with <span className="text-theme-primary font-black">thousands</span> of changemakers,
                share your journey, and collaborate on projects that matter
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4 px-4">
                <Link href="/auth/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-base sm:text-xl px-8 sm:px-12 py-6 sm:py-8 rounded-2xl font-black shadow-2xl">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    GET STARTED FREE
                  </Button>
                </Link>
                <Link href="/auth/signin" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-xl px-8 sm:px-12 py-6 sm:py-8 border-2 rounded-2xl font-black">
                    SIGN IN
                  </Button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 sm:pt-8 px-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${['from-pink-400 to-rose-500', 'from-blue-400 to-cyan-500', 'from-green-400 to-emerald-500', 'from-purple-400 to-violet-500', 'from-amber-400 to-orange-500'][i-1]} border-2 border-[var(--card)] flex items-center justify-center`}>
                        <span className="text-[10px] sm:text-xs font-bold text-white">{['A', 'B', 'C', 'D', 'E'][i-1]}</span>
                      </div>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-theme-muted">+2,000 members</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                  <span className="text-xs sm:text-sm font-bold text-theme-muted">Community-driven</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                  <span className="text-xs sm:text-sm font-bold text-theme-muted">Safe & supportive</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator - hide on mobile */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
            <div className="w-6 h-10 sm:w-8 sm:h-14 rounded-full border-2 border-[var(--border)] flex items-start justify-center p-1.5 sm:p-2 bg-[var(--card)]/50 backdrop-blur-sm">
              <div className="w-1.5 h-2 sm:w-2 sm:h-3 bg-[var(--foreground)] rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-24 bg-[var(--background)] relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 sm:mb-16">
              <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[var(--accent)]/10 rounded-full text-xs sm:text-sm font-black text-theme-accent uppercase tracking-wider mb-3 sm:mb-4">
                Unlock Your Potential
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[var(--foreground)] mb-3 sm:mb-4">
                WHAT AWAITS YOU
              </h2>
              <p className="text-base sm:text-xl font-semibold text-theme-muted max-w-2xl mx-auto px-4">
                Everything you need to make a real impact
              </p>
            </div>

            {/* Bento Grid Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {/* Large Feature Card */}
              <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/80 p-6 sm:p-8 text-white">
                <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center mb-4 sm:mb-6">
                    <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">MEANINGFUL DISCUSSIONS</h3>
                  <p className="text-base sm:text-lg font-medium opacity-90 mb-4 sm:mb-6 flex-1">
                    Engage in deep conversations about sustainability, personal growth, and building a better world.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-bold opacity-75">
                    <span className="px-2 sm:px-3 py-1 bg-white/20 rounded-full">Daily Topics</span>
                    <span className="px-2 sm:px-3 py-1 bg-white/20 rounded-full">Expert AMAs</span>
                    <span className="px-2 sm:px-3 py-1 bg-white/20 rounded-full">Book Clubs</span>
                  </div>
                </div>
              </div>

              {/* Medium Cards */}
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[var(--card)] border-2 sm:border-4 border-theme-accent p-5 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/70 flex items-center justify-center mb-3 sm:mb-4">
                  <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[var(--foreground)] mb-2">COLLABORATIVE PROJECTS</h3>
                <p className="text-sm font-medium text-theme-muted">
                  Start or join local initiatives. Find collaborators who share your vision.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[var(--card)] border-2 sm:border-4 border-theme-secondary p-5 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary)]/70 flex items-center justify-center mb-3 sm:mb-4">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[var(--foreground)] mb-2">SHARED KNOWLEDGE</h3>
                <p className="text-sm font-medium text-theme-muted">
                  Access case studies and insights from community members worldwide.
                </p>
              </div>

              {/* Bottom Row */}
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] p-5 sm:p-6 text-white">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center mb-3 sm:mb-4">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-black mb-2">GLOBAL NETWORK</h3>
                <p className="text-sm font-medium opacity-90">Connect with changemakers worldwide</p>
              </div>

              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[var(--muted)] p-5 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-3 sm:mb-4">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[var(--foreground)] mb-2">ACHIEVEMENTS</h3>
                <p className="text-sm font-medium text-theme-muted">Earn badges and track your journey</p>
              </div>

              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[var(--muted)] p-5 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mb-3 sm:mb-4">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[var(--foreground)] mb-2">SOCIAL FEED</h3>
                <p className="text-sm font-medium text-theme-muted">Share your journey and inspire others</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)]" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-48 sm:w-80 h-48 sm:h-80 bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur rounded-full">
                <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                <span className="text-xs sm:text-sm font-bold">100% Free Forever</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-black leading-tight">
                YOUR JOURNEY
                <br />
                STARTS NOW
              </h2>
              <p className="text-base sm:text-xl font-semibold opacity-90 max-w-2xl mx-auto px-4">
                Join a community of passionate individuals committed to positive change.
              </p>
              <Link href="/auth/signup" className="inline-block">
                <Button size="lg" className="text-lg sm:text-2xl px-10 sm:px-16 py-6 sm:py-10 bg-white text-[var(--primary)] hover:bg-gray-100 rounded-2xl font-black shadow-2xl">
                  CREATE FREE ACCOUNT
                  <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 ml-2 sm:ml-3" />
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

      {/* Welcome Header with Theme-Aware Background */}
      <section className="relative overflow-hidden">
        {/* Day background */}
        <div className="absolute inset-0 day-only">
          <div className={`absolute inset-0 bg-gradient-to-br ${userArchetype?.gradient || 'from-emerald-500 via-teal-500 to-cyan-500'}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10" />
        </div>
        {/* Night background */}
        <div className="absolute inset-0 night-only">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-800" />
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.5), transparent),
                             radial-gradient(1px 1px at 60px 80px, rgba(255,255,255,0.4), transparent),
                             radial-gradient(1px 1px at 100px 50px, rgba(255,255,255,0.3), transparent)`,
            backgroundSize: '150px 100px'
          }} />
        </div>

        <div className="relative z-10 py-6 sm:py-10 px-4 text-white">
          <div className="container mx-auto">
            <div className="max-w-7xl mx-auto">
              {/* Mobile-friendly flex layout */}
              <div className="flex flex-col gap-4 sm:gap-6">
                {/* Welcome Message Row */}
                <div className="flex items-center gap-3 sm:gap-5">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm p-0.5 sm:p-1">
                      {user?.image ? (
                        <img src={user.image} alt={user.name || 'User'} className="w-full h-full rounded-lg sm:rounded-xl object-cover" />
                      ) : (
                        <div className="w-full h-full rounded-lg sm:rounded-xl bg-white/30 flex items-center justify-center">
                          <span className="text-xl sm:text-2xl font-black">{user?.name?.[0]?.toUpperCase() || '?'}</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/30 backdrop-blur-sm flex items-center justify-center">
                      <ArchetypeIcon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-sm font-bold opacity-80 mb-0.5 sm:mb-1">
                      {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                    <h1 className="text-xl sm:text-3xl md:text-4xl font-black truncate">
                      Welcome, {user?.name?.split(' ')[0] || 'friend'}!
                    </h1>
                    {userArchetype && (
                      <p className="text-[10px] sm:text-sm font-semibold opacity-80 mt-0.5 sm:mt-1 flex items-center gap-1 sm:gap-2">
                        <ArchetypeIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate">{userArchetype.name}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Stats Grid - Scrollable on mobile */}
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
                  {[
                    { value: user?._count.articles || 0, label: 'Articles' },
                    { value: user?._count.createdProjects || 0, label: 'Projects' },
                    { value: user?._count.followers || 0, label: 'Followers' },
                    { value: user?.userBadges.length || 0, label: 'Badges' },
                  ].map((stat, i) => (
                    <div key={i} className="flex-shrink-0 px-3 sm:px-5 py-2 sm:py-3 bg-white/15 backdrop-blur-sm rounded-xl sm:rounded-2xl text-center min-w-[70px] sm:min-w-[80px]">
                      <div className="text-lg sm:text-2xl font-black">{stat.value}</div>
                      <div className="text-[9px] sm:text-[10px] font-bold uppercase opacity-80">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions - Scrollable on mobile */}
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
                  <Link href="/community/feed" className="flex-shrink-0">
                    <Button size="sm" className="bg-white text-[var(--foreground)] hover:bg-gray-100 font-bold rounded-lg sm:rounded-xl shadow-lg text-xs sm:text-sm">
                      <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      Discussions
                    </Button>
                  </Link>
                  <Link href="/articles" className="flex-shrink-0">
                    <Button size="sm" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm">
                      <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      Articles
                    </Button>
                  </Link>
                  <Link href="/community/projects/new" className="flex-shrink-0">
                    <Button size="sm" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm">
                      <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      New Project
                    </Button>
                  </Link>
                  <Link href="/community/leaderboard" className="flex-shrink-0 hidden sm:block">
                    <Button size="sm" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-bold rounded-xl text-sm">
                      <Award className="w-4 h-4 mr-2" />
                      Leaderboard
                    </Button>
                  </Link>
                  <Link href="/community/users" className="flex-shrink-0 hidden sm:block">
                    <Button size="sm" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-bold rounded-xl text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      Members
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Stats Bar */}
        <div className="relative z-10 bg-[var(--card)] border-b border-[var(--border)] py-3 sm:py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4 sm:gap-8 text-center overflow-x-auto">
              {[
                { icon: Users, value: communityStats.totalMembers, label: 'Members', color: 'text-theme-primary' },
                { icon: Rocket, value: communityStats.totalProjects, label: 'Projects', color: 'text-theme-secondary' },
                { icon: BookOpen, value: communityStats.totalArticles, label: 'Articles', color: 'text-theme-accent' },
                { icon: Activity, value: communityStats.activeProjects, label: 'Active', color: 'text-emerald-500' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                  <span className="text-sm sm:text-lg font-black text-[var(--foreground)]">{stat.value.toLocaleString()}</span>
                  <span className="text-xs sm:text-sm font-bold text-theme-muted hidden xs:inline">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Grid */}
      <section className="py-4 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-4 sm:gap-6">
              {/* Main Content */}
              <div className="lg:col-span-8 space-y-4 sm:space-y-6">
                <RecentDiscussionsWidget initialDiscussions={recentDiscussions} />
                <ActiveProjectsWidget initialProjects={activeProjects} />

                {/* People to Follow */}
                <div className="p-4 sm:p-6 bg-[var(--card)] rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-theme-primary/30 shadow-lg overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-br from-[var(--primary)]/10 to-transparent rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />

                  <div className="flex items-center justify-between mb-4 sm:mb-5 relative z-10">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/70 flex items-center justify-center shadow-lg">
                        <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-xl font-black text-[var(--foreground)]">People to Follow</h2>
                        <p className="text-[10px] sm:text-xs font-semibold text-theme-muted hidden sm:block">Connect with active members</p>
                      </div>
                    </div>
                    <Link href="/community/users">
                      <Button variant="ghost" size="sm" className="font-bold text-xs sm:text-sm rounded-full hover:bg-[var(--muted)]">
                        See all <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10">
                    {suggestedUsers.slice(0, 4).map((suggestedUser: any) => {
                      const userArchetypeConfig = suggestedUser.guardianArchetype ? archetypeConfig[suggestedUser.guardianArchetype] : null
                      const UserArchetypeIcon = userArchetypeConfig?.icon || Compass

                      return (
                        <Link key={suggestedUser.id} href={`/profile/${suggestedUser.id}`}>
                          <div className="group p-3 sm:p-4 bg-gradient-to-br from-[var(--muted)]/50 to-[var(--muted)] rounded-xl sm:rounded-2xl hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-theme-primary/30 text-center">
                            <div className="relative mx-auto w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-3">
                              {suggestedUser.image ? (
                                <img src={suggestedUser.image} alt={suggestedUser.name || 'User'} className="w-full h-full rounded-xl sm:rounded-2xl object-cover shadow-md" />
                              ) : (
                                <div className="w-full h-full rounded-xl sm:rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-md">
                                  <span className="text-base sm:text-xl font-bold text-white">{suggestedUser.name?.[0]?.toUpperCase() || '?'}</span>
                                </div>
                              )}
                              {userArchetypeConfig && (
                                <div className={`absolute -bottom-1 -right-1 w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-gradient-to-br ${userArchetypeConfig.gradient} flex items-center justify-center shadow-md`}>
                                  <UserArchetypeIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white" />
                                </div>
                              )}
                            </div>
                            <h4 className="font-bold text-xs sm:text-sm text-[var(--foreground)] truncate">{suggestedUser.name || 'Anonymous'}</h4>
                            <div className="flex items-center justify-center gap-1 sm:gap-3 mt-1 sm:mt-2 text-[9px] sm:text-[10px] font-bold text-theme-muted">
                              <span>{suggestedUser._count.followers} followers</span>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-6">
                  <NetworkActivityFeed />

                  {/* Quick Write */}
                  <div className="p-4 sm:p-5 bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] rounded-2xl sm:rounded-3xl text-white shadow-lg">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center">
                        <PenTool className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <h3 className="font-black text-sm sm:text-base">Share Your Story</h3>
                        <p className="text-[10px] sm:text-xs font-medium opacity-80">Write an article</p>
                      </div>
                    </div>
                    <Link href="/articles/write">
                      <Button size="sm" className="w-full bg-white text-[var(--foreground)] hover:bg-gray-100 font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm">
                        Start Writing
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                      </Button>
                    </Link>
                  </div>

                  {/* Badges */}
                  {user?.userBadges && user.userBadges.length > 0 && (
                    <div className="p-4 sm:p-5 bg-[var(--card)] rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-amber-500/40 shadow-sm">
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                          <Award className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <h3 className="text-xs sm:text-sm font-black text-[var(--foreground)]">Recent Badges</h3>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {user.userBadges.map((ub: any) => (
                          <div key={ub.id} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-amber-500/10 rounded-full border border-amber-500/30">
                            <span className="text-[10px] sm:text-xs font-bold text-amber-600">{ub.badge.name}</span>
                          </div>
                        ))}
                      </div>
                      <Link href="/my/volition" className="block mt-2 sm:mt-3">
                        <Button variant="ghost" size="sm" className="w-full font-bold text-[10px] sm:text-xs rounded-full hover:bg-amber-500/10">
                          View all badges <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1" />
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
