import { ArticleCard } from '@/components/article/ArticleCard'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  BookOpen, Video, Calculator, Download, Zap, Leaf,
  GraduationCap, Target, Clock, Users, Star, ChevronRight,
  Lightbulb, TrendingUp, Award, Play, FileText, Droplet,
  Sun, Wind, Recycle, Home, Sprout, Heart, Globe, CheckCircle2
} from 'lucide-react'
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

  const learningPaths = [
    {
      id: 'beginner',
      title: 'SUSTAINABILITY 101',
      subtitle: 'Start Your Journey',
      description: 'Perfect for newcomers. Learn the fundamentals of sustainable living, understand key concepts, and take your first steps toward a greener lifestyle.',
      level: 'Beginner',
      duration: '4 weeks',
      modules: 8,
      color: 'moss',
      icon: Sprout,
      topics: ['Basic Concepts', 'Carbon Footprint', 'Daily Habits', 'Waste Reduction']
    },
    {
      id: 'intermediate',
      title: 'HOME & LIFESTYLE',
      subtitle: 'Transform Your Space',
      description: 'Ready to level up? Dive into sustainable home practices, energy efficiency, water conservation, and creating an eco-friendly living environment.',
      level: 'Intermediate',
      duration: '6 weeks',
      modules: 12,
      color: 'ocean',
      icon: Home,
      topics: ['Energy Efficiency', 'Water Systems', 'Green Cleaning', 'Sustainable Design']
    },
    {
      id: 'advanced',
      title: 'SYSTEMS THINKING',
      subtitle: 'Lead The Change',
      description: 'For committed changemakers. Explore regenerative systems, community organizing, policy advocacy, and building sustainable infrastructure.',
      level: 'Advanced',
      duration: '8 weeks',
      modules: 16,
      color: 'terra',
      icon: Globe,
      topics: ['Regenerative Design', 'Community Building', 'Policy & Advocacy', 'Systems Change']
    }
  ]

  const featuredModules = [
    {
      title: 'Understanding Your Carbon Footprint',
      slug: 'carbon-footprint',
      description: 'Learn how to measure, track, and reduce your personal environmental impact with practical tools and strategies.',
      category: 'FUNDAMENTALS',
      duration: '45 min',
      type: 'Interactive Lesson',
      icon: Target,
      color: 'moss',
      available: true
    },
    {
      title: 'The Water Cycle & Conservation',
      slug: 'water-conservation',
      description: 'Explore how water systems work and discover innovative techniques for conservation at home and in your community.',
      category: 'WATER SYSTEMS',
      duration: '60 min',
      type: 'Video + Quiz',
      icon: Droplet,
      color: 'ocean',
      available: true
    },
    {
      title: 'Solar Energy Basics',
      slug: 'solar-energy',
      description: 'Everything you need to know about solar power - from how panels work to evaluating if solar is right for your home.',
      category: 'RENEWABLE ENERGY',
      duration: '55 min',
      type: 'Comprehensive Guide',
      icon: Sun,
      color: 'terra',
      available: true
    },
    {
      title: 'Composting Masterclass',
      slug: 'composting',
      description: 'Turn waste into gold! Master the art of composting with our step-by-step guide to creating nutrient-rich soil.',
      category: 'ZERO WASTE',
      duration: '40 min',
      type: 'Practical Workshop',
      icon: Recycle,
      color: 'moss',
      available: true
    },
    {
      title: 'Regenerative Agriculture Principles',
      slug: 'regenerative-agriculture',
      description: 'Discover farming practices that heal the land, sequester carbon, and produce healthier food for communities.',
      category: 'FOOD SYSTEMS',
      duration: '75 min',
      type: 'Deep Dive',
      icon: Sprout,
      color: 'ocean',
      available: true
    },
    {
      title: 'Building a Sustainable Wardrobe',
      slug: 'sustainable-wardrobe',
      description: 'Transform your closet with ethical fashion choices, capsule wardrobes, and understanding textile sustainability.',
      category: 'SUSTAINABLE FASHION',
      duration: '50 min',
      type: 'Style Guide',
      icon: Heart,
      color: 'terra',
      available: true
    }
  ]

  const quickFacts = [
    { fact: 'The average person generates 4.4 lbs of trash per day', source: 'EPA' },
    { fact: 'Solar energy costs have dropped 89% since 2010', source: 'IRENA' },
    { fact: 'Composting can divert 30% of household waste from landfills', source: 'USDA' },
    { fact: 'A single tree absorbs 48 lbs of CO2 per year', source: 'Arbor Day Foundation' },
    { fact: 'Regenerative agriculture can sequester 3-6 tons of carbon per acre annually', source: 'Rodale Institute' },
    { fact: 'LED bulbs use 75% less energy than incandescent lighting', source: 'DOE' }
  ]

  const topics = [
    { title: 'RENEWABLE ENERGY', desc: 'Solar, wind, and clean energy systems for homes and communities', icon: Zap, slug: 'renewable-energy', color: 'moss', lessons: 24 },
    { title: 'WATER SYSTEMS', desc: 'Conservation, harvesting, and sustainable water management', icon: Droplet, slug: 'water-systems', color: 'ocean', lessons: 18 },
    { title: 'REGENERATIVE AGRICULTURE', desc: 'Farming practices that restore ecosystems and sequester carbon', icon: Sprout, slug: 'agriculture', color: 'terra', lessons: 32 },
    { title: 'ZERO WASTE LIVING', desc: 'Practical strategies to minimize waste and live lighter', icon: Recycle, slug: 'zero-waste', color: 'moss', lessons: 21 },
    { title: 'GREEN BUILDING', desc: 'Sustainable architecture, materials, and energy-efficient design', icon: Home, slug: 'green-building', color: 'ocean', lessons: 28 },
    { title: 'FOOD SOVEREIGNTY', desc: 'Local food systems, gardening, and community nutrition', icon: Leaf, slug: 'food-sovereignty', color: 'terra', lessons: 26 },
  ]

  const expertInsights = [
    {
      quote: "Sustainability is not about perfection. It's about making better choices, one day at a time.",
      author: "Professor Sage",
      role: "Lead Educator, Project Exodus",
      image: "🌱"
    },
    {
      quote: "The greatest threat to our planet is the belief that someone else will save it.",
      author: "Robert Swan",
      role: "Polar Explorer & Environmentalist",
      image: "🌍"
    },
    {
      quote: "We don't need a handful of people doing zero waste perfectly. We need millions doing it imperfectly.",
      author: "Anne-Marie Bonneau",
      role: "Zero Waste Chef",
      image: "♻️"
    }
  ]

  const resourceTypes = [
    { type: 'Video Tutorials', count: 150, icon: Play, color: 'moss' },
    { type: 'Written Guides', count: 200, icon: FileText, color: 'ocean' },
    { type: 'Worksheets & Templates', count: 75, icon: Download, color: 'terra' },
    { type: 'Interactive Calculators', count: 12, icon: Calculator, color: 'moss' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero - Professor Sage Welcome */}
      <section className="py-24 bg-gradient-to-br from-ocean-50 via-moss-50 to-sand-50 dark:from-earth-900 dark:via-earth-800 dark:to-earth-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-moss-400 dark:bg-moss-600 rounded-full blur-3xl opacity-30 dark:opacity-20" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-ocean-400 dark:bg-ocean-600 rounded-full blur-3xl opacity-30 dark:opacity-20" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-moss-100 dark:bg-moss-900 border-2 border-moss-500 dark:border-moss-600">
                  <GraduationCap className="w-6 h-6 text-moss-700 dark:text-moss-400" />
                  <span className="font-bold text-moss-800 dark:text-moss-300">PROFESSOR SAGE'S CLASSROOM</span>
                </div>

                <h1 style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                }} className="text-earth-900 dark:text-sand-100">
                  LEARN TO BUILD A{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, #36763d, #357777)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    SUSTAINABLE FUTURE
                  </span>
                </h1>

                <p className="text-xl font-semibold text-earth-700 dark:text-sand-300">
                  Welcome to the most comprehensive sustainability education platform.
                  From beginner basics to advanced systems thinking—your journey to
                  becoming an environmental changemaker starts here.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="text-lg px-8 py-6 rounded-xl font-black shadow-xl">
                    <Play className="w-5 h-5 mr-2" />
                    START LEARNING
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl font-bold border-2">
                    BROWSE COURSES
                  </Button>
                </div>
              </div>

              <div className="hidden lg:block">
                <Card className="border-4 border-moss-400 dark:border-moss-600 bg-white/90 dark:bg-earth-800/90 backdrop-blur-sm shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <CardContent className="p-8">
                    <div className="text-center space-y-4">
                      <div className="text-8xl">🌱</div>
                      <h3 className="text-2xl font-black text-earth-900 dark:text-sand-100">Quick Stats</h3>
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="p-4 bg-moss-50 dark:bg-earth-700 rounded-xl">
                          <div className="text-3xl font-black text-moss-700 dark:text-moss-400">150+</div>
                          <div className="text-sm font-bold text-earth-600 dark:text-sand-300">Lessons</div>
                        </div>
                        <div className="p-4 bg-ocean-50 dark:bg-earth-700 rounded-xl">
                          <div className="text-3xl font-black text-ocean-700 dark:text-ocean-400">36</div>
                          <div className="text-sm font-bold text-earth-600 dark:text-sand-300">Modules</div>
                        </div>
                        <div className="p-4 bg-terra-50 dark:bg-earth-700 rounded-xl">
                          <div className="text-3xl font-black text-terra-700 dark:text-terra-400">6</div>
                          <div className="text-sm font-bold text-earth-600 dark:text-sand-300">Core Topics</div>
                        </div>
                        <div className="p-4 bg-sand-100 dark:bg-earth-700 rounded-xl">
                          <div className="text-3xl font-black text-earth-700 dark:text-sand-300">∞</div>
                          <div className="text-sm font-bold text-earth-600 dark:text-sand-300">Impact</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-24 bg-white dark:bg-earth-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-earth-900 dark:text-sand-100">LEARNING PATHS</h2>
            <p className="text-xl font-semibold text-earth-700 dark:text-sand-300">
              Structured courses designed to take you from curious to expert
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {learningPaths.map((path) => (
              <Card
                key={path.id}
                className={`border-4 border-${path.color}-300 dark:border-${path.color}-600 hover:border-${path.color}-500 dark:hover:border-${path.color}-500 bg-gradient-to-br from-${path.color}-50 to-white dark:from-earth-800 dark:to-earth-900 transform hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}
              >
                <div className={`h-2 bg-gradient-to-r from-${path.color}-500 to-${path.color}-600`} />
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-${path.color}-100 dark:bg-${path.color}-900 flex items-center justify-center`}>
                      <path.icon className={`w-8 h-8 text-${path.color}-600 dark:text-${path.color}-400`} />
                    </div>
                    <div>
                      <span className={`text-sm font-black text-${path.color}-600 dark:text-${path.color}-400`}>{path.level}</span>
                      <h3 className="text-xl font-black text-earth-900 dark:text-sand-100">{path.title}</h3>
                    </div>
                  </div>

                  <p className="text-base font-medium text-earth-700 dark:text-sand-300 mb-6">
                    {path.description}
                  </p>

                  <div className="flex items-center gap-6 mb-6 text-sm font-bold text-earth-600 dark:text-sand-400">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {path.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {path.modules} modules
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {path.topics.map((topic, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-xs font-bold bg-${path.color}-100 dark:bg-${path.color}-900 text-${path.color}-700 dark:text-${path.color}-300`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <Button className={`w-full font-bold`}>
                    START PATH <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Modules */}
      <section className="py-24 bg-sand-50 dark:bg-earth-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-earth-900 dark:text-sand-100">FEATURED MODULES</h2>
            <p className="text-xl font-semibold text-earth-700 dark:text-sand-300">
              Dive deep with our most popular lessons
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {featuredModules.map((module, i) => {
              const ModuleCard = (
                <Card
                  className={`border-2 border-sand-300 dark:border-earth-600 ${module.available ? 'hover:border-moss-400 dark:hover:border-moss-500 cursor-pointer' : 'opacity-75'} bg-white dark:bg-earth-900 transform ${module.available ? 'hover:-translate-y-2' : ''} transition-all duration-300 group relative`}
                >
                  {!module.available && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-earth-200 dark:bg-earth-700 rounded text-xs font-bold text-earth-600 dark:text-sand-400">
                      COMING SOON
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-black bg-${module.color}-100 dark:bg-${module.color}-900 text-${module.color}-700 dark:text-${module.color}-400`}>
                        {module.category}
                      </span>
                      <div className={`w-12 h-12 rounded-xl bg-${module.color}-100 dark:bg-${module.color}-900 flex items-center justify-center ${module.available ? 'group-hover:scale-110' : ''} transition-transform`}>
                        <module.icon className={`w-6 h-6 text-${module.color}-600 dark:text-${module.color}-400`} />
                      </div>
                    </div>

                    <h3 className={`text-lg font-black mb-2 text-earth-900 dark:text-sand-100 ${module.available ? 'group-hover:text-moss-700 dark:group-hover:text-moss-400' : ''} transition-colors`}>
                      {module.title}
                    </h3>

                    <p className="text-sm font-medium text-earth-600 dark:text-sand-400 mb-4">
                      {module.description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-earth-500 dark:text-sand-500 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {module.duration}
                      </span>
                      <span className={`font-bold ${module.available ? 'text-moss-600 dark:text-moss-400' : 'text-earth-400 dark:text-earth-500'} flex items-center gap-1`}>
                        {module.available ? 'START MODULE' : module.type}
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )

              return module.available ? (
                <Link key={i} href={`/learn/modules/${module.slug}`}>
                  {ModuleCard}
                </Link>
              ) : (
                <div key={i}>{ModuleCard}</div>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="text-lg px-10 py-6 font-black border-2">
              VIEW ALL MODULES
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Facts Marquee */}
      <section className="py-12 bg-moss-600 dark:bg-moss-800 overflow-hidden">
        <div className="flex gap-12 animate-scroll">
          {[...quickFacts, ...quickFacts].map((item, i) => (
            <div key={i} className="flex items-center gap-4 whitespace-nowrap">
              <Lightbulb className="w-6 h-6 text-moss-200" />
              <span className="text-lg font-bold text-white">{item.fact}</span>
              <span className="text-sm font-medium text-moss-200">— {item.source}</span>
              <span className="text-moss-300 mx-4">•</span>
            </div>
          ))}
        </div>
      </section>

      {/* Core Topics */}
      <section className="py-24 bg-white dark:bg-earth-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-earth-900 dark:text-sand-100">CORE TOPICS</h2>
            <p className="text-xl font-semibold text-earth-700 dark:text-sand-300">
              Master the pillars of sustainability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {topics.map((topic) => (
              <Link key={topic.title} href={`/learn/topics/${topic.slug}`}>
                <Card className={`h-full border-4 border-${topic.color}-300 dark:border-${topic.color}-600 bg-gradient-to-br from-${topic.color}-50 to-white dark:from-earth-800 dark:to-earth-900 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer`}>
                  <CardContent className="p-8">
                    <div className={`w-20 h-20 mb-6 rounded-2xl bg-${topic.color}-100 dark:bg-${topic.color}-900 flex items-center justify-center`}>
                      <topic.icon className={`w-10 h-10 text-${topic.color}-600 dark:text-${topic.color}-400`} />
                    </div>
                    <h3 className="text-2xl font-black mb-3 text-earth-900 dark:text-sand-100">
                      {topic.title}
                    </h3>
                    <p className="text-base font-medium mb-4 text-earth-700 dark:text-sand-300">
                      {topic.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-earth-500 dark:text-sand-500">
                        {topic.lessons} lessons
                      </span>
                      <span className={`text-${topic.color}-600 dark:text-${topic.color}-400 font-black text-sm flex items-center gap-1`}>
                        EXPLORE <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Insights */}
      <section className="py-24 bg-gradient-to-br from-earth-800 to-earth-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">WORDS OF WISDOM</h2>
            <p className="text-xl font-semibold text-sand-300">
              Insights from sustainability leaders
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {expertInsights.map((expert, i) => (
              <Card key={i} className="bg-earth-700/50 border-2 border-earth-600 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-6">{expert.image}</div>
                  <blockquote className="text-lg font-medium text-sand-200 mb-6 italic">
                    "{expert.quote}"
                  </blockquote>
                  <div>
                    <div className="font-black text-sand-100">{expert.author}</div>
                    <div className="text-sm font-medium text-sand-400">{expert.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="py-24 bg-sand-50 dark:bg-earth-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-earth-900 dark:text-sand-100">INTERACTIVE TOOLS</h2>
            <p className="text-xl font-semibold text-earth-700 dark:text-sand-300">
              Learn by doing with hands-on resources
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {resourceTypes.map((resource, i) => (
              <Card key={i} className="border-2 border-sand-300 dark:border-earth-600 bg-white dark:bg-earth-900 hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-${resource.color}-100 dark:bg-${resource.color}-900 flex items-center justify-center`}>
                    <resource.icon className={`w-8 h-8 text-${resource.color}-600 dark:text-${resource.color}-400`} />
                  </div>
                  <h3 className="text-lg font-black mb-2 text-earth-900 dark:text-sand-100">{resource.type}</h3>
                  <div className={`text-3xl font-black text-${resource.color}-600 dark:text-${resource.color}-400`}>
                    {resource.count}+
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Calculator, title: 'CARBON CALCULATOR', desc: 'Calculate your environmental footprint and get personalized reduction tips', color: 'moss', cta: 'CALCULATE NOW' },
              { icon: Video, title: 'VIDEO LIBRARY', desc: 'Watch expert tutorials, documentaries, and step-by-step guides', color: 'ocean', cta: 'WATCH NOW' },
              { icon: Download, title: 'RESOURCE DOWNLOADS', desc: 'PDFs, worksheets, checklists, and templates for sustainable living', color: 'terra', cta: 'BROWSE RESOURCES' }
            ].map((tool, i) => (
              <Card key={i} className={`border-4 border-${tool.color}-300 dark:border-${tool.color}-600 bg-gradient-to-br from-${tool.color}-50 to-white dark:from-earth-800 dark:to-earth-900 transform hover:scale-105 transition-all cursor-pointer`}>
                <CardContent className="p-10 text-center">
                  <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-${tool.color}-100 dark:bg-${tool.color}-900 flex items-center justify-center`}>
                    <tool.icon className={`w-12 h-12 text-${tool.color}-600 dark:text-${tool.color}-400`} />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-earth-900 dark:text-sand-100">{tool.title}</h3>
                  <p className="font-medium mb-6 text-earth-700 dark:text-sand-300">{tool.desc}</p>
                  <Button variant="outline" className={`font-bold border-2 border-${tool.color}-500 text-${tool.color}-700 dark:text-${tool.color}-400 hover:bg-${tool.color}-500 hover:text-white`}>
                    {tool.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      {articles.length > 0 && (
        <section className="py-24 bg-white dark:bg-earth-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4" style={{
                background: 'linear-gradient(135deg, #36763d, #2e6161)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                LATEST ARTICLES
              </h2>
              <p className="text-xl font-semibold text-earth-700 dark:text-sand-300">
                Fresh insights and in-depth guides from Professor Sage
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {articles.map((article: any) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {articles.length >= 12 && (
              <div className="text-center mt-12">
                <Button size="lg" className="text-xl px-12 py-8 rounded-2xl font-black shadow-2xl">
                  VIEW ALL ARTICLES →
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Coming Soon */}
      {articles.length === 0 && (
        <section className="py-24 bg-ocean-50 dark:bg-ocean-900/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Card className="border-4 border-ocean-300 dark:border-ocean-600 bg-white dark:bg-earth-800">
                <CardContent className="p-12">
                  <BookOpen className="w-20 h-20 text-ocean-600 dark:text-ocean-400 mx-auto mb-6" />
                  <h3 className="text-4xl font-black mb-6 text-ocean-700 dark:text-ocean-300">
                    NEW ARTICLES COMING SOON
                  </h3>
                  <p className="text-xl font-semibold mb-8 text-ocean-600 dark:text-ocean-400">
                    Professor Sage is crafting comprehensive, research-backed articles
                    to empower your sustainability journey!
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
      <section className="py-24 bg-gradient-to-br from-moss-500 via-ocean-500 to-terra-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="text-7xl">🎓</div>
            <h2 className="text-5xl font-black">READY TO BECOME A SUSTAINABILITY EXPERT?</h2>
            <p className="text-2xl font-semibold text-sand-100">
              Join thousands of learners transforming knowledge into action.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-xl px-12 py-8 bg-white text-earth-900 hover:bg-sand-100 font-black shadow-2xl rounded-2xl">
                START YOUR JOURNEY
              </Button>
              <Link href="/community">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 border-4 border-white text-white hover:bg-white hover:text-earth-900 font-black rounded-2xl">
                  JOIN THE COMMUNITY
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
