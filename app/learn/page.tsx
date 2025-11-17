import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BookOpen, Video, Calculator, Download } from 'lucide-react'

export default function LearnPage() {
  const topics = [
    {
      title: 'Renewable Energy 101',
      description: 'Understanding solar, wind, and clean energy systems',
      icon: '⚡',
      articles: 12
    },
    {
      title: 'Sustainable Fashion',
      description: 'Ethical clothing, materials, and circular fashion',
      icon: '👕',
      articles: 8
    },
    {
      title: 'Regenerative Agriculture',
      description: 'Farming practices that restore ecosystems',
      icon: '🌾',
      articles: 15
    },
    {
      title: 'Zero Waste Living',
      description: 'Practical tips for reducing waste at home',
      icon: '♻️',
      articles: 20
    },
    {
      title: 'Green Building',
      description: 'Sustainable architecture and construction',
      icon: '🏡',
      articles: 10
    },
    {
      title: 'Water Conservation',
      description: 'Smart water use and harvesting techniques',
      icon: '💧',
      articles: 7
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
              <span className="earth-gradient bg-clip-text text-transparent">
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
              <Card key={topic.title} className="card-gradient hover-lift cursor-pointer">
                <CardHeader>
                  <div className="text-5xl mb-4">{topic.icon}</div>
                  <CardTitle>{topic.title}</CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {topic.articles} articles available
                  </p>
                </CardContent>
              </Card>
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
                      <div className={`w-12 h-12 rounded-lg bg-${tool.color}-100 flex items-center justify-center mb-4`}>
                        <Icon className={`w-6 h-6 text-${tool.color}-600`} />
                      </div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Coming Soon */}
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
        </div>
      </section>
    </div>
  )
}
