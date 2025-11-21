import { ArticleCard } from '@/components/article/ArticleCard'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BookOpen, Video, Calculator, Download, Zap, Leaf, Home, Award, CheckCircle, Sprout, TrendingUp, Target, Flame, ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'
import prisma from '@/lib/db/prisma'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

async function getArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      take: 6,
      orderBy: {
        publishedAt: 'desc',
      },
    })

    return articles
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

async function getUserLearningProgress(userId: string) {
  try {
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
        _count: {
          select: {
            articles: true,
          }
        }
      }
    })

    return user
  } catch (error) {
    console.error('Error fetching user learning progress:', error)
    return null
  }
}

export default async function MyLearningPage() {
  const session = await auth()

  // Redirect to login if not authenticated
  if (!session?.user?.id) {
    redirect('/auth/signin?callbackUrl=/profile/learning')
  }

  const articles = await getArticles()
  const userProgress = await getUserLearningProgress(session.user.id)

  const topics = [
    { title: 'RENEWABLE ENERGY', desc: 'Solar, wind, and clean energy', icon: Zap, slug: 'renewable-energy', color: 'primary' },
    { title: 'REGENERATIVE AGRICULTURE', desc: 'Farming that restores ecosystems', icon: Sprout, slug: 'agriculture', color: 'accent' },
    { title: 'ZERO WASTE', desc: 'Practical waste reduction', icon: Target, slug: 'zero-waste', color: 'secondary' },
    { title: 'GREEN BUILDING', desc: 'Sustainable architecture', icon: Home, slug: 'green-building', color: 'primary' },
  ]

  const quickLinks = [
    { title: 'Havana Organopónicos', subtitle: 'Urban Agriculture Case Study', href: '/learn/havana-organoponicos', icon: Sprout, color: 'secondary' },
    { title: 'Emerging Technologies', subtitle: 'Carbon capture, green hydrogen & more', href: '/learn/emerging-tech', icon: Zap, color: 'primary' },
    { title: 'Success Stories', subtitle: 'Real-world sustainability wins', href: '/learn/success-stories', icon: Award, color: 'accent' },
    { title: 'LEED Certification', subtitle: 'Green building standards', href: '/learn/leed-certification', icon: CheckCircle, color: 'primary' },
  ]

  return (
    <div className="min-h-screen bg-[var(--muted)]">
      {/* Compact Welcome Header */}
      <section className="py-12 bg-gradient-to-br from-[var(--accent)] via-[var(--primary)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="inline-block px-4 py-2 bg-white/20 rounded-full mb-3">
                  <span className="text-xs font-black uppercase tracking-wider">My Learning Dashboard</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-2">
                  {session.user.name?.toUpperCase()}'S LEARNING
                </h1>
                <p className="text-lg font-semibold opacity-90">
                  Track your progress and continue your sustainability journey
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/tools/carbon-calculator">
                  <Button size="lg" className="bg-white text-[var(--primary)] hover:bg-gray-100 font-black">
                    <Calculator className="w-5 h-5 mr-2" />
                    CALCULATOR
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Impact Stats */}
      <section className="py-6 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-3">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span className="text-xs font-black uppercase tracking-wider opacity-90">Environmental Impact Today</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black mb-1">6.9M</div>
                <div className="text-xs font-bold uppercase opacity-90">Tons Waste/Day</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black mb-1">95M</div>
                <div className="text-xs font-bold uppercase opacity-90">Tons CO₂/Day</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black mb-1">43K</div>
                <div className="text-xs font-bold uppercase opacity-90">Hectares Lost/Day</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black mb-1">11B</div>
                <div className="text-xs font-bold uppercase opacity-90">m³ Water/Day</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Learning Progress */}
                {userProgress && (
                  <Card className="border-4 border-theme-primary">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <Target className="w-7 h-7 text-theme-primary" />
                        <h2 className="text-2xl font-black text-[var(--foreground)]">YOUR LEARNING PROGRESS</h2>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-[var(--background)] rounded-lg">
                          <div className="text-4xl font-black text-theme-primary mb-1">{userProgress._count.articles}</div>
                          <div className="text-xs font-bold text-theme-muted uppercase">Articles Read</div>
                        </div>
                        <div className="text-center p-4 bg-[var(--background)] rounded-lg">
                          <div className="text-4xl font-black text-theme-accent mb-1">{userProgress.userBadges.length}</div>
                          <div className="text-xs font-bold text-theme-muted uppercase">Badges Earned</div>
                        </div>
                        <div className="text-center p-4 bg-[var(--background)] rounded-lg">
                          <div className="text-4xl font-black text-theme-secondary mb-1">
                            {Math.min(Math.floor((userProgress._count.articles / 10) * 100), 100)}%
                          </div>
                          <div className="text-xs font-bold text-theme-muted uppercase">Completion</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Latest Articles */}
                {articles.length > 0 && (
                  <Card className="border-4 border-theme-accent">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <TrendingUp className="w-7 h-7 text-theme-accent" />
                          <h2 className="text-2xl font-black text-[var(--foreground)]">CONTINUE LEARNING</h2>
                        </div>
                        <Link href="/learn">
                          <Button variant="outline" size="sm" className="font-black">
                            BROWSE ALL
                          </Button>
                        </Link>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        {articles.map((article: any) => (
                          <ArticleCard key={article.id} article={article} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Explore Topics */}
                <Card className="border-4 border-theme-secondary">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <BookOpen className="w-7 h-7 text-theme-secondary" />
                      <h2 className="text-2xl font-black text-[var(--foreground)]">EXPLORE TOPICS</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {topics.map((topic) => (
                        <Link key={topic.title} href={`/learn/${topic.slug}`}>
                          <div className={`p-6 bg-[var(--background)] rounded-lg hover:bg-[var(--card)] transition-colors cursor-pointer border-2 border-transparent hover:border-theme-${topic.color} h-full`}>
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-full bg-theme-${topic.color}/20 flex items-center justify-center flex-shrink-0`}>
                                <topic.icon className={`w-6 h-6 text-theme-${topic.color}`} />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-black text-[var(--foreground)] mb-1">{topic.title}</h3>
                                <p className="text-sm font-medium text-theme-muted">{topic.desc}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Interactive Tools */}
                <Card className="border-4 border-theme-primary">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Calculator className="w-7 h-7 text-theme-primary" />
                      <h2 className="text-2xl font-black text-[var(--foreground)]">INTERACTIVE TOOLS</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Link href="/tools/carbon-calculator">
                        <div className="p-6 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--primary)_25%,var(--background))] rounded-lg border-2 border-theme-primary hover:scale-105 transition-all cursor-pointer h-full text-center">
                          <Calculator className="w-10 h-10 text-theme-primary mx-auto mb-3" />
                          <h3 className="text-sm font-black text-[var(--foreground)] mb-1">CARBON CALCULATOR</h3>
                          <p className="text-xs font-medium text-theme-muted">Measure your footprint</p>
                        </div>
                      </Link>
                      <div className="p-6 bg-[var(--background)] rounded-lg border-2 border-theme-muted opacity-60 h-full text-center">
                        <Video className="w-10 h-10 text-theme-muted mx-auto mb-3" />
                        <h3 className="text-sm font-black text-theme-muted mb-1">VIDEO TUTORIALS</h3>
                        <p className="text-xs font-medium text-theme-muted">Coming soon</p>
                      </div>
                      <div className="p-6 bg-[var(--background)] rounded-lg border-2 border-theme-muted opacity-60 h-full text-center">
                        <Download className="w-10 h-10 text-theme-muted mx-auto mb-3" />
                        <h3 className="text-sm font-black text-theme-muted mb-1">RESOURCES</h3>
                        <p className="text-xs font-medium text-theme-muted">Coming soon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Featured Content */}
                <Card className="border-4 border-theme-primary">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Flame className="w-6 h-6 text-theme-primary" />
                      <h3 className="text-xl font-black text-[var(--foreground)]">FEATURED</h3>
                    </div>
                    <div className="space-y-3">
                      {quickLinks.map((link) => (
                        <Link key={link.title} href={link.href}>
                          <div className="p-4 bg-[var(--background)] rounded-lg hover:bg-[var(--card)] transition-colors cursor-pointer border-2 border-transparent hover:border-theme-primary">
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-full bg-theme-${link.color}/20 flex items-center justify-center flex-shrink-0`}>
                                <link.icon className={`w-5 h-5 text-theme-${link.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-black text-sm text-[var(--foreground)] mb-1">{link.title}</h4>
                                <p className="text-xs font-medium text-theme-muted">{link.subtitle}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Building Certifications */}
                <Card className="border-4 border-theme-accent">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-6 h-6 text-theme-accent" />
                      <h3 className="text-xl font-black text-[var(--foreground)]">CERTIFICATIONS</h3>
                    </div>
                    <div className="space-y-3">
                      <Link href="/learn/leed-certification">
                        <div className="p-4 bg-[var(--background)] rounded-lg hover:bg-[var(--card)] transition-colors cursor-pointer">
                          <h4 className="font-black text-sm text-theme-primary mb-1">LEED Certification</h4>
                          <p className="text-xs font-medium text-theme-muted">Learn LEED v5 standards</p>
                        </div>
                      </Link>
                      <Link href="/learn/building-certifications">
                        <div className="p-4 bg-[var(--background)] rounded-lg hover:bg-[var(--card)] transition-colors cursor-pointer">
                          <h4 className="font-black text-sm text-theme-accent mb-1">Building Certifications</h4>
                          <p className="text-xs font-medium text-theme-muted">BREEAM, WELL & more</p>
                        </div>
                      </Link>
                      <Link href="/learn/passive-house">
                        <div className="p-4 bg-[var(--background)] rounded-lg hover:bg-[var(--card)] transition-colors cursor-pointer">
                          <h4 className="font-black text-sm text-theme-secondary mb-1">Passive House</h4>
                          <p className="text-xs font-medium text-theme-muted">Ultra-efficient buildings</p>
                        </div>
                      </Link>
                      <Link href="/learn/acorn-land-labs">
                        <div className="p-4 bg-[var(--background)] rounded-lg hover:bg-[var(--card)] transition-colors cursor-pointer">
                          <h4 className="font-black text-sm text-theme-primary mb-1">Acorn Land Labs</h4>
                          <p className="text-xs font-medium text-theme-muted">Off-grid systems education</p>
                        </div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-4 border-theme-secondary">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-6 h-6 text-theme-secondary" />
                      <h3 className="text-xl font-black text-[var(--foreground)]">QUICK ACTIONS</h3>
                    </div>
                    <div className="space-y-3">
                      <Link href="/tools/carbon-calculator">
                        <Button className="w-full font-black" size="lg">
                          <Calculator className="w-5 h-5 mr-2" />
                          CALCULATE IMPACT
                        </Button>
                      </Link>
                      <Link href="/community">
                        <Button variant="outline" className="w-full font-black" size="lg">
                          <BookOpen className="w-5 h-5 mr-2" />
                          JOIN COMMUNITY
                        </Button>
                      </Link>
                      <Link href="/products">
                        <Button variant="outline" className="w-full font-black" size="lg">
                          <Leaf className="w-5 h-5 mr-2" />
                          SHOP SUSTAINABLE
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
