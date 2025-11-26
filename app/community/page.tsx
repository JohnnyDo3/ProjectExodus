import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  MessageSquare, Users, Award, Rocket, Sparkles, Heart,
  TrendingUp, Calendar, Bell, UserPlus, ArrowRight, Activity,
  Zap, Globe, BookOpen, ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'
import { LiveCounter } from '@/components/stats/LiveCounter'
import { TreeBranches } from '@/components/decorative/TreeBranches'
import { FlyingBirds } from '@/components/decorative/FlyingBirds'

async function getDashboardData(userId: string) {
  try {
    // Get user with stats
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userBadges: {
          take: 3,
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

    // Get recent discussions (articles)
    const recentDiscussions = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
        NOT: {
          authorId: userId
        }
      },
      take: 6,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        _count: {
          select: {
            comments: true
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

  // If not logged in, show public landing page
  if (!session?.user?.id) {
    return (
      <div className="min-h-screen">
        {/* Hero */}
        <section className="py-32 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--primary)_15%,var(--background))] relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <div className="inline-block px-6 py-3 bg-[var(--accent)]/10 rounded-full border-2 border-theme-accent mb-4">
                <span className="text-sm font-black text-theme-accent uppercase tracking-wider">
                  Create an account to join
                </span>
              </div>
              <h1 className="text-[var(--foreground)]" style={{
                fontSize: 'clamp(3rem, 10vw, 7rem)',
                fontWeight: 900,
                lineHeight: 1
              }}>
                JOIN THE COMMUNITY
              </h1>
              <p className="text-2xl font-bold text-theme-muted max-w-3xl mx-auto">
                Connect with <span style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 900
                }}>thousands</span> of changemakers building a sustainable future
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button size="lg" className="text-xl px-12 py-8 rounded-2xl shadow-2xl font-black">
                    CREATE ACCOUNT →
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button size="lg" variant="outline" className="text-xl px-12 py-8 rounded-2xl font-black border-4">
                    SIGN IN
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-32 bg-[var(--background)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black text-[var(--foreground)] mb-4">WHAT YOU'LL GET ACCESS TO</h2>
              <p className="text-xl font-semibold text-theme-muted">
                Create a free account to unlock the full community experience
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {[
                { icon: MessageSquare, title: 'DISCUSSION FORUMS', desc: 'Deep conversations on sustainability topics', color: 'primary' },
                { icon: Heart, title: 'SOCIAL FEED', desc: 'Share your journey and connect with others', color: 'accent' },
                { icon: Rocket, title: 'PROJECTS', desc: 'Collaborate on local initiatives', color: 'secondary' },
                { icon: BookOpen, title: 'KNOWLEDGE BASE', desc: 'Learn from experts and peers', color: 'primary' },
                { icon: Users, title: 'NETWORKING', desc: 'Connect with changemakers worldwide', color: 'accent' },
                { icon: Award, title: 'ACHIEVEMENTS', desc: 'Earn badges and track your impact', color: 'secondary' }
              ].map((feature, i) => (
                <Card key={i} className={`border-4 border-theme-${feature.color} relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 px-3 py-1 bg-red-500 text-white text-xs font-black rounded-bl-lg">
                    LOGIN REQUIRED
                  </div>
                  <CardContent className="p-10 text-center opacity-75">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] flex items-center justify-center">
                      <feature.icon className="w-12 h-12 text-theme-accent" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 text-[var(--foreground)]">
                      {feature.title}
                    </h3>
                    <p className="text-lg font-medium text-theme-muted">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-6xl font-black">
                READY TO GET STARTED?
              </h2>
              <p className="text-2xl font-semibold opacity-90">
                Join thousands of sustainability advocates making real change
              </p>
              <Link href="/auth/signup">
                <Button size="lg" className="text-xl px-16 py-10 bg-white text-[var(--primary)] hover:bg-gray-100 rounded-2xl font-black shadow-2xl">
                  CREATE FREE ACCOUNT →
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Logged-in user: Show personalized dashboard
  const dashboardData = await getDashboardData(session.user.id)

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-theme-muted">Error loading dashboard</p>
      </div>
    )
  }

  const { user, suggestedUsers, activeProjects, recentDiscussions, communityStats } = dashboardData

  return (
    <div className="min-h-screen bg-[var(--background)] relative">
      {/* Decorative Elements */}
      <TreeBranches />
      <FlyingBirds />

      {/* Welcome Header with Stats Grid */}
      <section className="py-6 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)] rounded-b-3xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* LEFT: Discussions Action Button */}
              <div className="flex-shrink-0">
                <Link href="/community/feed">
                  <Button size="sm" className="bg-white text-[var(--primary)] hover:bg-gray-100 font-bold rounded-full shadow-lg">
                    <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                    Discussions
                  </Button>
                </Link>
              </div>

              {/* CENTER: Greeting */}
              <div className="text-center lg:text-left">
                <h1 className="text-xl md:text-2xl font-black mb-1">
                  Hey {user?.name || 'friend'}!
                </h1>
                <p className="text-xs font-medium opacity-80">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>

              {/* RIGHT: 2x4 Stats Grid */}
              <div className="flex-shrink-0">
                <div className="space-y-2">
                  {/* User Stats Row */}
                  <div>
                    <div className="text-[8px] font-black uppercase opacity-70 mb-1 text-center">Your Stats</div>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                        <div className="text-sm font-black">{user?._count.articles || 0}</div>
                        <div className="text-[9px] font-bold uppercase opacity-90">Articles</div>
                      </div>
                      <div className="px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                        <div className="text-sm font-black">{user?._count.createdProjects || 0}</div>
                        <div className="text-[9px] font-bold uppercase opacity-90">Projects</div>
                      </div>
                      <div className="px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                        <div className="text-sm font-black">{user?._count.followers || 0}</div>
                        <div className="text-[9px] font-bold uppercase opacity-90">Followers</div>
                      </div>
                      <div className="px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                        <div className="text-sm font-black">{user?.userBadges.length || 0}</div>
                        <div className="text-[9px] font-bold uppercase opacity-90">Badges</div>
                      </div>
                    </div>
                  </div>

                  {/* Community Stats Row */}
                  <div>
                    <div className="text-[8px] font-black uppercase opacity-70 mb-1 text-center">Community Stats</div>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                        <div className="text-sm font-black">{communityStats.totalMembers.toLocaleString()}</div>
                        <div className="text-[9px] font-bold uppercase opacity-80">Members</div>
                      </div>
                      <div className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                        <div className="text-sm font-black">{communityStats.totalProjects.toLocaleString()}</div>
                        <div className="text-[9px] font-bold uppercase opacity-80">Projects</div>
                      </div>
                      <div className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                        <div className="text-sm font-black">{communityStats.totalArticles.toLocaleString()}</div>
                        <div className="text-[9px] font-bold uppercase opacity-80">Articles</div>
                      </div>
                      <div className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                        <div className="text-sm font-black">{communityStats.activeProjects}</div>
                        <div className="text-[9px] font-bold uppercase opacity-80">Active</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions - Cute Floating Pills */}
      <section className="py-4 bg-[var(--muted)]/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/learn">
                <Button size="sm" variant="outline" className="font-bold rounded-full hover:shadow-md transition-shadow">
                  <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                  Articles
                </Button>
              </Link>
              <Link href="/community/projects/new">
                <Button size="sm" variant="outline" className="font-bold rounded-full hover:shadow-md transition-shadow">
                  <Rocket className="w-3.5 h-3.5 mr-1.5" />
                  Create Project
                </Button>
              </Link>
              <Link href="/community/leaderboard">
                <Button size="sm" variant="outline" className="font-bold rounded-full hover:shadow-md transition-shadow">
                  <Award className="w-3.5 h-3.5 mr-1.5" />
                  Leaderboard
                </Button>
              </Link>
              <Link href="/community/users">
                <Button size="sm" variant="outline" className="font-bold rounded-full hover:shadow-md transition-shadow">
                  <Users className="w-3.5 h-3.5 mr-1.5" />
                  Members
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Flowing Content - Cute & Curvy with Borders */}
      <section className="py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-4">

            {/* Active Projects - Cute Grid */}
            <div className="p-5 bg-[var(--card)] rounded-3xl border-3 border-theme-secondary/40 shadow-sm lg:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary)]/70 flex items-center justify-center">
                    <Rocket className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-base font-black text-[var(--foreground)]">Active Projects</h2>
                </div>
                <Link href="/community/projects">
                  <Button variant="ghost" size="sm" className="font-bold text-xs rounded-full hover:bg-[var(--muted)]">
                    View all <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {activeProjects.map((project: any) => (
                  <Link key={project.id} href={`/community/projects/${project.slug}`}>
                    <div className="p-4 bg-[var(--muted)]/50 rounded-2xl hover:bg-[var(--muted)] transition-all hover:shadow-md cursor-pointer border-2 border-transparent hover:border-theme-secondary/30 h-full">
                      <h3 className="font-bold text-sm text-[var(--foreground)] mb-1.5 line-clamp-1">{project.name}</h3>
                      <p className="text-xs font-medium text-theme-muted mb-2 line-clamp-2">{project.description}</p>
                      <div className="flex items-center justify-between text-[10px] font-bold text-theme-muted">
                        <span><span title="Members">@</span> {project._count.members} members</span>
                        <span className="px-2 py-0.5 bg-theme-secondary/20 text-theme-secondary rounded-full">
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Discussions - Cute Cards */}
            <div className="p-5 bg-[var(--card)] rounded-3xl border-3 border-theme-accent/40 shadow-sm lg:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/70 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-base font-black text-[var(--foreground)]">Recent Discussions</h2>
                </div>
                <Link href="/learn">
                  <Button variant="ghost" size="sm" className="font-bold text-xs rounded-full hover:bg-[var(--muted)]">
                    View all <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {recentDiscussions.map((discussion: any) => (
                  <Link key={discussion.id} href={`/learn/${discussion.slug}`}>
                    <div className="p-4 bg-[var(--muted)]/50 rounded-2xl hover:bg-[var(--muted)] transition-all hover:shadow-md cursor-pointer border-2 border-transparent hover:border-theme-accent/30 h-full">
                      <div className="flex items-start gap-2.5 mb-2">
                        {discussion.author.image ? (
                          <img src={discussion.author.image} alt={discussion.author.name || 'User'} className="w-7 h-7 rounded-full flex-shrink-0" />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-bold text-white">{discussion.author.name?.[0]?.toUpperCase() || '?'}</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm text-[var(--foreground)] mb-1 line-clamp-2">{discussion.title}</h3>
                        </div>
                      </div>
                      {discussion.excerpt && (
                        <p className="text-xs font-medium text-theme-muted mb-2 line-clamp-2">{discussion.excerpt}</p>
                      )}
                      <div className="flex items-center justify-between text-[10px] font-bold text-theme-muted">
                        <span>{discussion.author.name || 'Anonymous'}</span>
                        <div className="flex items-center gap-2">
                          <span><span title="Comments">💬</span> {discussion._count.comments}</span>
                          <span className="px-2 py-0.5 bg-theme-accent/20 text-theme-accent rounded-full">
                            {new Date(discussion.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Suggested Connections - Cute List */}
            <div className="p-5 bg-[var(--card)] rounded-3xl border-3 border-theme-primary/40 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/70 flex items-center justify-center">
                    <UserPlus className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-base font-black text-[var(--foreground)]">People to Follow</h2>
                </div>
                <Link href="/community/users">
                  <Button variant="ghost" size="sm" className="font-bold text-xs rounded-full hover:bg-[var(--muted)]">
                    See more <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {suggestedUsers.map((suggestedUser: any) => (
                  <Link key={suggestedUser.id} href={`/profile/${suggestedUser.id}`}>
                    <div className="flex items-center gap-2.5 p-2.5 bg-[var(--muted)]/50 rounded-2xl hover:bg-[var(--muted)] transition-all hover:shadow-md cursor-pointer border-2 border-transparent hover:border-theme-primary/30">
                      {suggestedUser.image ? (
                        <img src={suggestedUser.image} alt={suggestedUser.name || 'User'} className="w-9 h-9 rounded-full flex-shrink-0" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-white">{suggestedUser.name?.[0]?.toUpperCase() || '?'}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-[var(--foreground)] truncate">{suggestedUser.name || 'Anonymous'}</h4>
                        <p className="text-[10px] font-medium text-theme-muted"><span title="Followers">◉</span> {suggestedUser._count.followers} followers • <span title="Articles">✎</span> {suggestedUser._count.articles} articles</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-theme-muted flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
