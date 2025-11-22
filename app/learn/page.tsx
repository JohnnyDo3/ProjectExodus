import { ArticleCard } from '@/components/article/ArticleCard'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BookOpen, Video, Calculator, Download, Zap, Leaf, Home, Award, CheckCircle, Sprout } from 'lucide-react'
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
              <Link key={topic.title} href={`/learn/${topic.slug}`}>
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

      {/* Featured Case Study - Havana Organopónicos */}
      <section className="py-32 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block px-6 py-2 bg-[var(--secondary)] text-[var(--primary-foreground)] rounded-full text-sm font-black mb-4">
                FEATURED CASE STUDY
              </div>
              <h2 className="text-4xl font-black text-[var(--foreground)] mb-4">ARCH-662: Sustainable Built Environment</h2>
            </div>
            <Link href="/learn/havana-organoponicos">
              <Card className="hover-lift border-4 border-theme-secondary bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] via-[var(--background)] to-[color-mix(in_srgb,var(--primary)_20%,var(--background))] cursor-pointer transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-12 md:p-16">
                  <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-2">
                      <h3 className="text-4xl font-black mb-4" style={{
                        background: 'linear-gradient(135deg, var(--secondary), var(--primary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        URBAN AGRICULTURE: ORGANOPÓNICOS
                      </h3>
                      <p className="text-2xl font-black text-theme-secondary mb-4">Havana, Cuba</p>
                      <p className="text-lg font-semibold text-theme-muted mb-6">
                        How Cuba transformed crisis into innovation: 35,000 hectares, 200,000 tons of produce annually, 30,000+ urban farmers employed. From vacant lots to global model for sustainable food production.
                      </p>
                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="px-4 py-2 bg-[var(--secondary)] text-[var(--primary-foreground)] rounded-full text-sm font-black">Urban Resilience</span>
                        <span className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full text-sm font-black">Organic Farming</span>
                        <span className="px-4 py-2 bg-[var(--accent)] text-[var(--primary-foreground)] rounded-full text-sm font-black">Food Security</span>
                        <span className="px-4 py-2 bg-[var(--secondary)] text-[var(--primary-foreground)] rounded-full text-sm font-black">Community-Driven</span>
                      </div>
                      <div className="text-theme-secondary font-black text-lg">
                        READ CASE STUDY →
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] flex items-center justify-center shadow-theme-xl">
                        <Sprout className="w-16 h-16 text-[var(--primary-foreground)]" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Content - Emerging Tech & Success Stories */}
      <section className="py-32 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Emerging Technologies */}
            <Link href="/learn/emerging-tech">
              <Card className="hover-lift border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_20%,var(--background))] via-[color-mix(in_srgb,var(--accent)_20%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] cursor-pointer transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-16 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] flex items-center justify-center shadow-theme-xl animate-pulse">
                    <Zap className="w-12 h-12 text-[var(--primary-foreground)]" />
                  </div>
                  <h2 className="text-5xl font-black mb-6" style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--accent), var(--secondary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    EMERGING TECHNOLOGIES & INNOVATIONS
                  </h2>
                  <p className="text-xl font-semibold text-theme-muted mb-6 max-w-3xl mx-auto">
                    Discover breakthrough innovations in carbon capture, advanced batteries, green hydrogen, vertical farming, and AI-driven climate solutions transforming our world
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <span className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full text-sm font-black">Carbon Capture</span>
                    <span className="px-4 py-2 bg-[var(--accent)] text-[var(--primary-foreground)] rounded-full text-sm font-black">Solid-State Batteries</span>
                    <span className="px-4 py-2 bg-[var(--secondary)] text-[var(--primary-foreground)] rounded-full text-sm font-black">Green Hydrogen</span>
                    <span className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full text-sm font-black">Vertical Farming</span>
                    <span className="px-4 py-2 bg-[var(--accent)] text-[var(--primary-foreground)] rounded-full text-sm font-black">Climate AI</span>
                  </div>
                  <div className="text-theme-primary font-black text-lg">
                    EXPLORE INNOVATIONS →
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Success Stories */}
            <Link href="/learn/success-stories">
              <Card className="hover-lift border-4 border-theme-accent bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_20%,var(--background))] via-[color-mix(in_srgb,var(--primary)_20%,var(--background))] to-[color-mix(in_srgb,var(--accent)_20%,var(--background))] cursor-pointer transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-16 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] flex items-center justify-center shadow-theme-xl">
                    <Award className="w-12 h-12 text-[var(--primary-foreground)]" />
                  </div>
                  <h2 className="text-5xl font-black mb-6" style={{
                    background: 'linear-gradient(135deg, var(--accent), var(--primary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    SUCCESS STORIES & CASE STUDIES
                  </h2>
                  <p className="text-xl font-semibold text-theme-muted mb-6 max-w-3xl mx-auto">
                    Real-world proof that sustainability works—from Patagonia's $3B business to Copenhagen's carbon neutrality, regenerative farms, and net-zero buildings
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <span className="px-4 py-2 bg-[var(--accent)] text-[var(--primary-foreground)] rounded-full text-sm font-black">Companies</span>
                    <span className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full text-sm font-black">Cities</span>
                    <span className="px-4 py-2 bg-[var(--accent)] text-[var(--primary-foreground)] rounded-full text-sm font-black">Farms</span>
                    <span className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full text-sm font-black">Buildings</span>
                  </div>
                  <div className="text-theme-accent font-black text-lg">
                    SEE THE PROOF →
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Building Certifications & Standards */}
      <section className="py-32 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-4 text-[var(--foreground)]">
              CERTIFICATIONS & BUILDING STANDARDS
            </h2>
            <p className="text-xl font-semibold text-theme-muted">
              Master green building certifications and sustainable design principles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <Link href="/learn/leed-certification">
              <Card className="hover-lift border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--primary)_25%,var(--background))] transform hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-8 text-center flex flex-col h-full">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_srgb,var(--primary)_80%,black)] flex items-center justify-center shadow-theme-xl">
                    <Award className="w-10 h-10 text-[var(--primary-foreground)]" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-theme-primary">
                    LEED CERTIFICATION
                  </h3>
                  <p className="text-base font-semibold mb-4 text-theme-muted flex-1">
                    Learn about LEED v5 (2025), certification levels, and the path to sustainable building
                  </p>
                  <div className="text-theme-primary font-black text-sm mt-auto">
                    LEARN MORE →
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/learn/building-certifications">
              <Card className="hover-lift border-4 border-theme-accent bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--accent)_25%,var(--background))] transform hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-8 text-center flex flex-col h-full">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_80%,black)] flex items-center justify-center shadow-theme-xl">
                    <CheckCircle className="w-10 h-10 text-[var(--primary-foreground)]" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-theme-accent">
                    BUILDING CERTIFICATIONS
                  </h3>
                  <p className="text-base font-semibold mb-4 text-theme-muted flex-1">
                    Explore BREEAM, WELL, and Living Building Challenge certifications
                  </p>
                  <div className="text-theme-accent font-black text-sm mt-auto">
                    EXPLORE →
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/learn/passive-house">
              <Card className="hover-lift border-4 border-theme-secondary bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_25%,var(--background))] transform hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-8 text-center flex flex-col h-full">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[color-mix(in_srgb,var(--secondary)_80%,black)] flex items-center justify-center shadow-theme-xl">
                    <Home className="w-10 h-10 text-[var(--primary-foreground)]" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-theme-secondary">
                    PASSIVE HOUSE
                  </h3>
                  <p className="text-base font-semibold mb-4 text-theme-muted flex-1">
                    Master ultra-efficient building standards achieving 90% energy reduction
                  </p>
                  <div className="text-theme-secondary font-black text-sm mt-auto">
                    DISCOVER →
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/learn/acorn-land-labs">
              <Card className="hover-lift border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--primary)_25%,var(--background))] transform hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-8 text-center flex flex-col h-full">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_srgb,var(--primary)_80%,black)] flex items-center justify-center shadow-theme-xl">
                    <Sprout className="w-10 h-10 text-[var(--primary-foreground)]" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-theme-primary">
                    ACORN LAND LABS
                  </h3>
                  <p className="text-base font-semibold mb-4 text-theme-muted flex-1">
                    Off-grid systems education for food, water, shelter, sanitation, and energy
                  </p>
                  <div className="text-theme-primary font-black text-sm mt-auto">
                    START LEARNING →
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="py-32 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-[var(--foreground)]">INTERACTIVE TOOLS</h2>
            <p className="text-xl font-semibold mt-4 text-theme-muted">
              Measure your impact and discover personalized sustainability actions
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Carbon Calculator - Active */}
            <Link href="/tools/carbon-calculator">
              <Card className="hover-lift border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--primary)_25%,var(--background))] cursor-pointer transform hover:scale-105 transition-all h-full">
                <CardContent className="p-10 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_srgb,var(--primary)_80%,black)] flex items-center justify-center shadow-theme-xl">
                    <Calculator className="w-12 h-12 text-[var(--primary-foreground)]" />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-[var(--foreground)]">CARBON FOOTPRINT CALCULATOR</h3>
                  <p className="font-semibold text-theme-muted mb-4">
                    Measure your annual CO₂ emissions and get personalized reduction strategies
                  </p>
                  <div className="text-theme-primary font-black text-sm">
                    START CALCULATING →
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Video Tutorials - Coming Soon */}
            <Card className="hover-lift border-4 border-theme-accent bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--accent)_25%,var(--background))] cursor-not-allowed opacity-75 transform hover:scale-105 transition-all h-full">
              <CardContent className="p-10 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_80%,black)] flex items-center justify-center shadow-theme-xl">
                  <Video className="w-12 h-12 text-[var(--primary-foreground)]" />
                </div>
                <h3 className="text-xl font-black mb-3 text-[var(--foreground)]">VIDEO TUTORIALS</h3>
                <p className="font-semibold text-theme-muted mb-4">
                  Step-by-step guides on renewable energy, zero waste, and sustainable living
                </p>
                <div className="text-theme-accent font-black text-sm">
                  COMING SOON
                </div>
              </CardContent>
            </Card>

            {/* Resource Library - Coming Soon */}
            <Card className="hover-lift border-4 border-theme-secondary bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_25%,var(--background))] cursor-not-allowed opacity-75 transform hover:scale-105 transition-all h-full">
              <CardContent className="p-10 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[color-mix(in_srgb,var(--secondary)_80%,black)] flex items-center justify-center shadow-theme-xl">
                  <Download className="w-12 h-12 text-[var(--primary-foreground)]" />
                </div>
                <h3 className="text-xl font-black mb-3 text-[var(--foreground)]">RESOURCE LIBRARY</h3>
                <p className="font-semibold text-theme-muted mb-4">
                  Download PDFs, templates, and guides for your sustainability journey
                </p>
                <div className="text-theme-secondary font-black text-sm">
                  COMING SOON
                </div>
              </CardContent>
            </Card>
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
