import { ArticleCard } from '@/components/article/ArticleCard'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CompactLiveImpactStats } from '@/components/learn/CompactLiveImpactStats'
import { BookOpen, Video, Calculator, Download, Zap, Leaf, Home, Award, CheckCircle, Sprout } from 'lucide-react'
import Link from 'next/link'
import prisma from '@/lib/db/prisma'
import { TreeBranches } from '@/components/decorative/TreeBranches'
import { FlyingBirds } from '@/components/decorative/FlyingBirds'

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
      take: 12,
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

export default async function LearnPage() {
  const articles = await getArticles()

  return (
    <div className="min-h-screen relative">
      {/* Decorative Elements */}
      <TreeBranches />
      <FlyingBirds />

      {/* Hero Section - Full Viewport */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_15%,var(--background))] via-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[var(--muted)] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <h1 className="text-[var(--foreground)]" style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 900,
              lineHeight: 1
            }}>
              LEARN SUSTAINABILITY
            </h1>
            <p className="text-2xl font-bold text-theme-muted">
              Knowledge that <span style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>empowers</span> real change
            </p>
          </div>
        </div>
      </section>

      {/* The Planet in Numbers - Full Viewport, Compact */}
      <section className="min-h-screen flex items-center justify-center bg-[var(--background)] py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-red-500/20 rounded-full border-2 border-red-500 mb-4">
                <span className="text-xs font-black text-red-500 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  REAL-TIME ENVIRONMENTAL IMPACT
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4" style={{
                background: 'linear-gradient(135deg, #ef4444, #f97316, #eab308)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                THE PLANET IN NUMBERS
              </h2>
              <p className="text-base font-semibold text-theme-muted max-w-3xl mx-auto">
                Watch these statistics count up in <span className="font-black text-red-500">real-time</span>.
                Every number represents the environmental impact happening across our planet right now.
              </p>
            </div>

            <CompactLiveImpactStats />
          </div>
        </div>
      </section>

      {/* Unified Content Library - Full Viewport Scroll */}
      <section className="min-h-screen bg-[var(--muted)] py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 rounded-full border-2 border-theme-primary mb-3">
                <span className="text-xs font-black text-theme-primary uppercase tracking-wider">Unified Learning Hub</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-2" style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                CONTENT LIBRARY
              </h2>
              <p className="text-sm font-semibold text-theme-muted max-w-2xl mx-auto">
                Explore topics, certifications, guides, and learning tools—all in one place
              </p>
            </div>

            {/* Learning Assistants - Widget Style */}
            <div className="mb-8">
              <h3 className="text-lg font-black text-[var(--foreground)] mb-3 text-center">
                📚 LEARNING ASSISTANTS
              </h3>
              <div className="grid grid-cols-3 gap-3 max-w-4xl mx-auto">
                {/* Carbon Calculator Widget */}
                <Link href="/tools/carbon-calculator">
                  <Card className="border-2 border-theme-primary/40 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/20 cursor-pointer hover:shadow-md transition-all">
                    <CardContent className="p-3 text-center">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                        <Calculator className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-xs font-black mb-1 text-[var(--foreground)]">Calculator</h4>
                      <p className="text-[10px] font-semibold text-theme-muted leading-tight">
                        Track your footprint
                      </p>
                    </CardContent>
                  </Card>
                </Link>

                {/* Video Tutorials Widget */}
                <Card className="border-2 border-theme-accent/40 bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/20 cursor-not-allowed opacity-60">
                  <CardContent className="p-3 text-center">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center">
                      <Video className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-xs font-black mb-1 text-[var(--foreground)]">Videos</h4>
                    <p className="text-[10px] font-semibold text-theme-muted leading-tight">
                      Coming soon
                    </p>
                  </CardContent>
                </Card>

                {/* Resources Widget */}
                <Card className="border-2 border-theme-secondary/40 bg-gradient-to-br from-[var(--secondary)]/10 to-[var(--secondary)]/20 cursor-not-allowed opacity-60">
                  <CardContent className="p-3 text-center">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] flex items-center justify-center">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-xs font-black mb-1 text-[var(--foreground)]">Resources</h4>
                    <p className="text-[10px] font-semibold text-theme-muted leading-tight">
                      Coming soon
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content Categories */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Featured Categories */}
              <Link href="/learn/emerging-tech">
                <Card className="border-3 border-theme-primary/40 bg-[var(--card)] rounded-3xl cursor-pointer hover:shadow-md transition-all h-full">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-sm">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black mb-1 text-theme-primary">
                          Emerging Tech
                        </h3>
                        <p className="text-xs font-semibold text-theme-muted mb-1.5 leading-relaxed line-clamp-2">
                          Carbon capture, batteries, hydrogen, AI climate solutions
                        </p>
                        <div className="text-theme-primary font-black text-xs">
                          EXPLORE →
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/learn/success-stories">
                <Card className="border-3 border-theme-accent/40 bg-[var(--card)] rounded-3xl cursor-pointer hover:shadow-md transition-all h-full">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center shadow-sm">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black mb-1 text-theme-accent">
                          Success Stories
                        </h3>
                        <p className="text-xs font-semibold text-theme-muted mb-1.5 leading-relaxed line-clamp-2">
                          Patagonia, Copenhagen, regenerative farms, net-zero buildings
                        </p>
                        <div className="text-theme-accent font-black text-xs">
                          READ STORIES →
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/learn#articles">
                <Card className="border-3 border-theme-secondary/40 bg-[var(--card)] rounded-3xl cursor-pointer hover:shadow-md transition-all h-full">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] flex items-center justify-center shadow-sm">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black mb-1 text-theme-secondary">
                          Guides & Tutorials
                        </h3>
                        <p className="text-xs font-semibold text-theme-muted mb-1.5 leading-relaxed line-clamp-2">
                          Sustainable living, renewable energy, zero waste practices
                        </p>
                        <div className="text-theme-secondary font-black text-xs">
                          START LEARNING →
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/learn#research">
                <Card className="border-3 border-theme-primary/40 bg-[var(--card)] rounded-3xl cursor-pointer hover:shadow-md transition-all h-full">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_srgb,var(--primary)_70%,black)] flex items-center justify-center shadow-sm">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black mb-1 text-theme-primary">
                          Research & Data
                        </h3>
                        <p className="text-xs font-semibold text-theme-muted mb-1.5 leading-relaxed line-clamp-2">
                          Science-backed reports, environmental statistics, research
                        </p>
                        <div className="text-theme-primary font-black text-xs">
                          VIEW DATA →
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Topic Exploration Grid */}
            <div className="mb-8">
              <h3 className="text-xl font-black text-[var(--foreground)] mb-4 text-center">
                EXPLORE BY TOPIC
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { title: 'Renewable Energy', icon: '⚡', slug: 'renewable-energy' },
                  { title: 'Sustainable Fashion', icon: '👕', slug: 'sustainable-fashion' },
                  { title: 'Agriculture', icon: '🌾', slug: 'agriculture' },
                  { title: 'Zero Waste', icon: '♻️', slug: 'zero-waste' },
                  { title: 'Green Building', icon: '🏡', slug: 'green-building' },
                  { title: 'Water Conservation', icon: '💧', slug: 'water-conservation' },
                ].map((topic) => (
                  <Link key={topic.title} href={`/learn/${topic.slug}`}>
                    <Card className="border-2 border-theme-primary/30 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/20 cursor-pointer hover:shadow-md transition-all h-full">
                      <CardContent className="p-3 text-center">
                        <div className="text-3xl mb-1">{topic.icon}</div>
                        <h4 className="text-xs font-black text-[var(--foreground)] leading-tight">
                          {topic.title}
                        </h4>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Certifications & Standards */}
            <div className="mb-8">
              <h3 className="text-xl font-black text-[var(--foreground)] mb-4 text-center">
                CERTIFICATIONS & STANDARDS
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                <Link href="/learn/leed-certification">
                  <Card className="border-2 border-theme-primary/30 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/20 cursor-pointer hover:shadow-md transition-all h-full">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-sm font-black mb-1 text-theme-primary">
                        LEED
                      </h4>
                      <p className="text-xs font-semibold text-theme-muted leading-tight">
                        Building certification
                      </p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/learn/building-certifications">
                  <Card className="border-2 border-theme-accent/30 bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/20 cursor-pointer hover:shadow-md transition-all h-full">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-sm font-black mb-1 text-theme-accent">
                        BREEAM & WELL
                      </h4>
                      <p className="text-xs font-semibold text-theme-muted leading-tight">
                        Global standards
                      </p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/learn/passive-house">
                  <Card className="border-2 border-theme-secondary/30 bg-gradient-to-br from-[var(--secondary)]/10 to-[var(--secondary)]/20 cursor-pointer hover:shadow-md transition-all h-full">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] flex items-center justify-center">
                        <Home className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-sm font-black mb-1 text-theme-secondary">
                        Passive House
                      </h4>
                      <p className="text-xs font-semibold text-theme-muted leading-tight">
                        Ultra-efficient design
                      </p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/learn/acorn-land-labs">
                  <Card className="border-2 border-theme-primary/30 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/20 cursor-pointer hover:shadow-md transition-all h-full">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                        <Sprout className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-sm font-black mb-1 text-theme-primary">
                        Acorn Land Labs
                      </h4>
                      <p className="text-xs font-semibold text-theme-muted leading-tight">
                        Off-grid systems
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>

            {/* Latest Articles */}
            {articles.length > 0 && (
              <div>
                <h3 className="text-xl font-black mb-4 text-center text-[var(--foreground)]">
                  RECENTLY PUBLISHED
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {articles.slice(0, 6).map((article: any) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
                {articles.length > 6 && (
                  <div className="text-center mt-6">
                    <Button size="lg" className="text-base px-8 py-4 rounded-xl font-black shadow-lg">
                      VIEW ALL ARTICLES →
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section - Full Viewport */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-5xl md:text-6xl font-black">START LEARNING TODAY</h2>
            <p className="text-xl md:text-2xl font-semibold">
              Knowledge is power. Turn learning into action.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-xl px-12 py-8 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-2xl">
                BROWSE ARTICLES
              </Button>
              <Link href="/products">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black">
                  EXPLORE PRODUCTS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
