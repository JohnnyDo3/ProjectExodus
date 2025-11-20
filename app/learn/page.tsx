import { ArticleCard } from '@/components/article/ArticleCard'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BookOpen, Video, Calculator, Download, Zap, Leaf } from 'lucide-react'
import Link from 'next/link'
import prisma from '@/lib/db/prisma'

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

  const topics = [
    { title: 'RENEWABLE ENERGY', desc: 'Solar, wind, and clean energy systems', icon: '⚡', slug: 'renewable-energy', color: 'moss' },
    { title: 'SUSTAINABLE FASHION', desc: 'Ethical clothing and circular fashion', icon: '👕', slug: 'sustainable-fashion', color: 'ocean' },
    { title: 'REGENERATIVE AGRICULTURE', desc: 'Farming that restores ecosystems', icon: '🌾', slug: 'agriculture', color: 'terra' },
    { title: 'ZERO WASTE LIVING', desc: 'Practical waste reduction tips', icon: '♻️', slug: 'zero-waste', color: 'moss' },
    { title: 'GREEN BUILDING', desc: 'Sustainable architecture', icon: '🏡', slug: 'green-building', color: 'ocean' },
    { title: 'WATER CONSERVATION', desc: 'Smart water use techniques', icon: '💧', slug: 'water-conservation', color: 'terra' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-32 bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_15%,var(--background))] via-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[var(--muted)] relative overflow-hidden">
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

      {/* Articles Grid */}
      {articles.length > 0 && (
        <section className="py-32 bg-[var(--background)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black mb-6" style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                LATEST ARTICLES
              </h2>
              <p className="text-xl font-semibold text-theme-muted">
                In-depth guides and insights on sustainable living
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {articles.map((article: any) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {articles.length >= 12 && (
              <div className="text-center mt-16">
                <Button size="lg" className="text-xl px-12 py-8 rounded-2xl font-black shadow-2xl">
                  VIEW ALL ARTICLES →
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Topics Grid */}
      <section className="py-32 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-[var(--foreground)]">EXPLORE TOPICS</h2>
            <p className="text-xl font-semibold mt-4 text-theme-muted">
              Dive deep into sustainability subjects that matter
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {topics.map((topic) => (
              <Link key={topic.title} href={`/learn?topic=${topic.slug}`}>
                <Card className="hover-lift border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--primary)_25%,var(--background))] transform hover:scale-105 transition-all duration-300">
                  <CardContent className="p-10 text-center">
                    <div className="text-7xl mb-6">{topic.icon}</div>
                    <h3 className="text-2xl font-black mb-3 text-[var(--foreground)]">
                      {topic.title}
                    </h3>
                    <p className="text-lg font-medium mb-4 text-theme-muted">
                      {topic.desc}
                    </p>
                    <div className="text-theme-primary font-bold text-sm">
                      EXPLORE →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="py-32 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-[var(--foreground)]">INTERACTIVE TOOLS</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Calculator, title: 'CARBON CALCULATOR', desc: 'Calculate your footprint' },
              { icon: Video, title: 'VIDEO TUTORIALS', desc: 'Step-by-step guides' },
              { icon: Download, title: 'RESOURCE LIBRARY', desc: 'Download PDFs & templates' }
            ].map((tool, i) => (
              <Card key={i} className="hover-lift border-4 border-theme-accent cursor-pointer transform hover:scale-105 transition-all">
                <CardContent className="p-10 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] flex items-center justify-center">
                    <tool.icon className="w-12 h-12 text-theme-accent" />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-[var(--foreground)]">{tool.title}</h3>
                  <p className="font-medium text-theme-muted">{tool.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      {articles.length === 0 && (
        <section className="py-32 bg-[var(--muted)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Card className="border-4 border-theme-accent">
                <CardContent className="p-12">
                  <BookOpen className="w-20 h-20 text-theme-accent mx-auto mb-6" />
                  <h3 className="text-4xl font-black mb-6 text-theme-accent">
                    EDUCATIONAL CONTENT LAUNCHING SOON
                  </h3>
                  <p className="text-xl font-semibold mb-8 text-theme-muted">
                    We're crafting comprehensive, research-backed articles that empower you
                    with actionable knowledge on all things sustainability!
                  </p>
                  <Button size="lg" className="text-lg px-10 py-6 font-black shadow-lg">
                    NOTIFY ME WHEN ARTICLES LAUNCH
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-32 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-6xl font-black">START LEARNING TODAY</h2>
            <p className="text-2xl font-semibold">
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
