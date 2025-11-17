import { ArticleCard } from '@/components/article/ArticleCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BookOpen, Video, Calculator, Download } from 'lucide-react'
import Link from 'next/link'

async function getArticles() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/articles?limit=12`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch articles')
    }

    const data = await res.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export default async function LearnPage() {
  const articles = await getArticles()

  const topics = [
    {
      title: 'Renewable Energy 101',
      description: 'Understanding solar, wind, and clean energy systems',
      icon: '⚡',
      slug: 'renewable-energy'
    },
    {
      title: 'Sustainable Fashion',
      description: 'Ethical clothing, materials, and circular fashion',
      icon: '👕',
      slug: 'sustainable-fashion'
    },
    {
      title: 'Regenerative Agriculture',
      description: 'Farming practices that restore ecosystems',
      icon: '🌾',
      slug: 'agriculture'
    },
    {
      title: 'Zero Waste Living',
      description: 'Practical tips for reducing waste at home',
      icon: '♻️',
      slug: 'zero-waste'
    },
    {
      title: 'Green Building',
      description: 'Sustainable architecture and construction',
      icon: '🏡',
      slug: 'green-building'
    },
    {
      title: 'Water Conservation',
      description: 'Smart water use and harvesting techniques',
      icon: '💧',
      slug: 'water-conservation'
    },
  ]

  const tools = [
    {
      name: 'Carbon Footprint Calculator',
      description: 'Calculate your personal or business carbon footprint',
      icon: Calculator,
      color: 'moss'
    },
    {
      name: 'Video Tutorials',
      description: 'Watch step-by-step sustainability guides',
      icon: Video,
      color: 'ocean'
    },
    {
      name: 'Resource Library',
      description: 'Download PDFs, templates, and guides',
      icon: Download,
      color: 'terra'
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Learn About{' '}
              <span className="earth-gradient-text">
                Sustainability
              </span>
            </h1>
            <p className="text-xl text-earth-700">
              Educational content that empowers you to make informed decisions
              and create real impact. From basics to advanced topics.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      {articles.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Latest Articles</h2>
              <p className="text-lg text-earth-700">
                In-depth guides and insights on sustainable living
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {articles.map((article: any) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {articles.length >= 12 && (
              <div className="text-center mt-12">
                <Button size="lg" variant="outline">
                  View All Articles
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Topics Grid */}
      <section className="py-20 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Explore Topics</h2>
            <p className="text-lg text-earth-700">
              Dive deep into sustainability subjects that matter
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {topics.map((topic) => (
              <Link
                key={topic.title}
                href={`/learn?topic=${topic.slug}`}
              >
                <Card className="card-gradient hover-lift cursor-pointer h-full">
                  <CardHeader>
                    <div className="text-5xl mb-4">{topic.icon}</div>
                    <CardTitle>{topic.title}</CardTitle>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-moss-700 font-medium">
                      Explore Topic →
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Interactive Tools */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-8">Interactive Tools</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {tools.map((tool) => {
                const Icon = tool.icon
                return (
                  <Card key={tool.name} className="hover-lift cursor-pointer">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-moss-100 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-moss-600" />
                      </div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Coming Soon - if no articles */}
          {articles.length === 0 && (
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-ocean-50 border-2 border-ocean-200 rounded-xl p-8">
                <BookOpen className="w-16 h-16 text-ocean-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-ocean-900">
                  Educational Content Coming Soon!
                </h3>
                <p className="text-ocean-800 mb-6">
                  We're crafting comprehensive, well-researched articles on all things sustainability.
                  Each piece will be written to empower you with actionable knowledge and backed by science.
                </p>
                <Button>
                  Notify Me When Articles Launch
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
