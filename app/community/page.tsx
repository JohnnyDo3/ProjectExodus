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
            forumPosts: true,
            followers: true,
            following: true,
            createdProjects: true,
            forumReplies: true
          }
        }
      }
    })

    // Get recent forum activity
    const recentForumPosts = await prisma.forumPost.findMany({
      take: 8,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        category: {
          select: {
            name: true,
            slug: true
          }
        },
        _count: {
          select: {
            replies: true,
            likes: true
          }
        }
      }
    })

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
      include: {
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
      include: {
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

    // Get community stats
    const stats = await prisma.$transaction([
      prisma.user.count(),
      prisma.forumPost.count(),
      prisma.project.count({ where: { status: { in: ['ACTIVE', 'PLANNING'] } } }),
      prisma.article.count({ where: { status: 'PUBLISHED' } })
    ])

    return {
      user,
      recentForumPosts,
      suggestedUsers,
      activeProjects,
      communityStats: {
        totalMembers: stats[0],
        totalDiscussions: stats[1],
        activeProjects: stats[2],
        knowledgeArticles: stats[3]
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
                  ⚡ Create an account to join
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

  const { user, recentForumPosts, suggestedUsers, activeProjects, communityStats } = dashboardData

  return (
    <div className="min-h-screen bg-[var(--background)] relative">
      {/* Decorative Elements */}
      <TreeBranches />
      <FlyingBirds />

      {/* Welcome Header - Cute & Compact */}
      <section className="py-6 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)] rounded-b-3xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-black mb-1">
                  Hey {user?.name || 'friend'}!
                </h1>
                <p className="text-xs font-medium opacity-80">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href="/community/feed">
                  <Button size="sm" className="bg-white text-[var(--primary)] hover:bg-gray-100 font-bold rounded-full shadow-lg">
                    <Heart className="w-3.5 h-3.5 mr-1.5" />
                    Feed
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar - Cute Pills */}
      <section className="py-5 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              <div className="px-5 py-3 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 rounded-full border-2 border-[var(--primary)]/20">
                <div className="text-center">
                  <div className="text-lg font-black text-theme-primary">{user?._count.articles || 0}</div>
                  <div className="text-[10px] font-bold text-theme-muted uppercase">Articles</div>
                </div>
              </div>
              <div className="px-5 py-3 bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5 rounded-full border-2 border-[var(--accent)]/20">
                <div className="text-center">
                  <div className="text-lg font-black text-theme-accent">{user?._count.forumPosts || 0}</div>
                  <div className="text-[10px] font-bold text-theme-muted uppercase">Posts</div>
                </div>
              </div>
              <div className="px-5 py-3 bg-gradient-to-br from-[var(--secondary)]/10 to-[var(--secondary)]/5 rounded-full border-2 border-[var(--secondary)]/20">
                <div className="text-center">
                  <div className="text-lg font-black text-theme-secondary">{user?._count.followers || 0}</div>
                  <div className="text-[10px] font-bold text-theme-muted uppercase">Followers</div>
                </div>
              </div>
              <div className="px-5 py-3 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/5 rounded-full border-2 border-[var(--primary)]/20">
                <div className="text-center">
                  <div className="text-lg font-black text-theme-primary">{user?.userBadges.length || 0}</div>
                  <div className="text-[10px] font-bold text-theme-muted uppercase">Badges</div>
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
              <Link href="/community/forum/new">
                <Button size="sm" className="font-bold rounded-full shadow-md hover:shadow-lg transition-shadow">
                  <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                  Start Discussion
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

      {/* Flowing Content - Cute & Curvy */}
      <section className="py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6">

            {/* Trending Discussions - Cute Cards */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/70 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-base font-black text-[var(--foreground)]">Trending Discussions</h2>
                </div>
                <Link href="/community/forum">
                  <Button variant="ghost" size="sm" className="font-bold text-xs rounded-full hover:bg-[var(--muted)]">
                    View all <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-2">
                {recentForumPosts.map((post) => (
                  <Link key={post.id} href={`/community/forum/posts/${post.id}`}>
                    <div className="p-3 bg-[var(--muted)]/50 rounded-2xl hover:bg-[var(--muted)] transition-all hover:shadow-md cursor-pointer border-2 border-transparent hover:border-theme-accent/30">
                      <div className="flex items-start gap-2.5">
                        {post.user.image ? (
                          <img src={post.user.image} alt={post.user.name || 'User'} className="w-7 h-7 rounded-full flex-shrink-0" />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-bold text-white">{post.user.name?.[0]?.toUpperCase() || '?'}</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm text-[var(--foreground)] mb-0.5 line-clamp-1">{post.title}</h3>
                          <div className="flex items-center gap-1.5 text-[10px] font-medium text-theme-muted flex-wrap">
                            <span>{post.user.name || 'Anonymous'}</span>
                            <span>•</span>
                            <span className="px-1.5 py-0.5 bg-theme-accent/10 text-theme-accent rounded-full">{post.category.name}</span>
                            <span>•</span>
                            <span><span title="Replies">↪</span> {post._count.replies} replies</span>
                            <span><span title="Likes">♥</span> {post._count.likes} likes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Active Projects - Cute Grid */}
            <div>
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
                {activeProjects.map((project) => (
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

            {/* Suggested Connections - Cute List */}
            <div>
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
                {suggestedUsers.map((suggestedUser) => (
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
                        <p className="text-[10px] font-medium text-theme-muted">{suggestedUser._count.followers} followers • {suggestedUser._count.articles} articles</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-theme-muted flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Community Stats - Cute Rounded Card */}
            <div className="p-5 bg-gradient-to-br from-[var(--primary)]/10 via-[var(--accent)]/10 to-[var(--secondary)]/10 rounded-3xl border-2 border-[var(--border)]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                  <Globe className="w-3.5 h-3.5 text-white" />
                </div>
                <h3 className="text-sm font-black text-[var(--foreground)]">Community Stats</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center p-3 bg-[var(--background)]/50 rounded-2xl">
                  <div className="text-lg font-black text-theme-primary mb-0.5">{communityStats.totalMembers.toLocaleString()}</div>
                  <div className="text-[10px] font-bold text-theme-muted uppercase">Members</div>
                </div>
                <div className="text-center p-3 bg-[var(--background)]/50 rounded-2xl">
                  <div className="text-lg font-black text-theme-accent mb-0.5">{communityStats.totalDiscussions.toLocaleString()}</div>
                  <div className="text-[10px] font-bold text-theme-muted uppercase">Discussions</div>
                </div>
                <div className="text-center p-3 bg-[var(--background)]/50 rounded-2xl">
                  <div className="text-lg font-black text-theme-secondary mb-0.5">{communityStats.activeProjects}</div>
                  <div className="text-[10px] font-bold text-theme-muted uppercase">Projects</div>
                </div>
                <div className="text-center p-3 bg-[var(--background)]/50 rounded-2xl">
                  <div className="text-lg font-black text-theme-primary mb-0.5">{communityStats.knowledgeArticles}</div>
                  <div className="text-[10px] font-bold text-theme-muted uppercase">Articles</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
