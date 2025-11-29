import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Zap, Droplet, Sprout, Recycle, Home, Leaf,
  ChevronRight, Clock, BookOpen, CheckCircle2, Play,
  Sun, Wind, Battery, Lightbulb, Target, ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const topicsData: Record<string, {
  title: string
  description: string
  icon: any
  color: string
  heroImage: string
  stats: { lessons: number; duration: string; level: string }
  overview: string
  modules: Array<{
    title: string
    slug: string
    description: string
    duration: string
    lessons: number
    available: boolean
  }>
  keyTakeaways: string[]
  relatedTopics: string[]
}> = {
  'renewable-energy': {
    title: 'RENEWABLE ENERGY',
    description: 'Solar, wind, and clean energy systems for homes and communities',
    icon: Zap,
    color: 'moss',
    heroImage: '⚡',
    stats: { lessons: 24, duration: '8 hours', level: 'All Levels' },
    overview: 'Explore the world of renewable energy sources and learn how to harness clean power for your home and community. From understanding solar panels to wind turbines and battery storage, this topic covers everything you need to transition to sustainable energy.',
    modules: [
      { title: 'Solar Energy Basics', slug: 'solar-energy', description: 'How solar panels work and if they\'re right for you', duration: '55 min', lessons: 4, available: true },
      { title: 'Home Battery Systems', slug: 'battery-storage', description: 'Store solar energy for use anytime', duration: '45 min', lessons: 3, available: false },
      { title: 'Wind Power 101', slug: 'wind-power', description: 'Small-scale wind energy for residential use', duration: '40 min', lessons: 3, available: false },
      { title: 'Grid Independence', slug: 'off-grid', description: 'Steps to reduce or eliminate grid dependence', duration: '60 min', lessons: 5, available: false }
    ],
    keyTakeaways: [
      'Understanding different renewable energy sources',
      'Evaluating solar potential for your home',
      'Battery storage options and considerations',
      'Financial incentives and ROI calculations',
      'Grid-tied vs off-grid systems'
    ],
    relatedTopics: ['green-building', 'zero-waste']
  },
  'water-systems': {
    title: 'WATER SYSTEMS',
    description: 'Conservation, harvesting, and sustainable water management',
    icon: Droplet,
    color: 'ocean',
    heroImage: '💧',
    stats: { lessons: 18, duration: '6 hours', level: 'All Levels' },
    overview: 'Water is our most precious resource. Learn how to conserve, harvest, and manage water sustainably. From rainwater collection to greywater systems and drought-resistant landscaping, discover practical ways to reduce your water footprint.',
    modules: [
      { title: 'Water Conservation', slug: 'water-conservation', description: 'Techniques for reducing water usage at home', duration: '60 min', lessons: 4, available: true },
      { title: 'Rainwater Harvesting', slug: 'rainwater', description: 'Collect and use rainwater effectively', duration: '45 min', lessons: 3, available: false },
      { title: 'Greywater Systems', slug: 'greywater', description: 'Reuse household water safely', duration: '50 min', lessons: 4, available: false },
      { title: 'Drought-Resistant Landscaping', slug: 'xeriscaping', description: 'Beautiful gardens that need less water', duration: '40 min', lessons: 3, available: false }
    ],
    keyTakeaways: [
      'Understanding your water footprint',
      'Indoor and outdoor conservation techniques',
      'Rainwater harvesting setup and maintenance',
      'Safe greywater reuse practices',
      'Native and drought-tolerant plant selection'
    ],
    relatedTopics: ['agriculture', 'green-building']
  },
  'agriculture': {
    title: 'REGENERATIVE AGRICULTURE',
    description: 'Farming practices that restore ecosystems and sequester carbon',
    icon: Sprout,
    color: 'terra',
    heroImage: '🌱',
    stats: { lessons: 32, duration: '12 hours', level: 'Intermediate' },
    overview: 'Discover farming and gardening practices that go beyond sustainability to actually regenerate soil health, sequester carbon, and restore ecosystems. Learn about permaculture, no-till methods, cover cropping, and more.',
    modules: [
      { title: 'Regenerative Agriculture Principles', slug: 'regenerative-agriculture', description: 'Core concepts of soil restoration', duration: '75 min', lessons: 5, available: true },
      { title: 'Composting Masterclass', slug: 'composting', description: 'Turn waste into garden gold', duration: '40 min', lessons: 4, available: true },
      { title: 'Permaculture Design', slug: 'permaculture', description: 'Design sustainable food systems', duration: '90 min', lessons: 6, available: false },
      { title: 'Urban Gardening', slug: 'urban-gardening', description: 'Grow food in small spaces', duration: '50 min', lessons: 4, available: false }
    ],
    keyTakeaways: [
      'Principles of regenerative agriculture',
      'Building healthy soil ecosystems',
      'Composting methods for any scale',
      'Permaculture design principles',
      'Carbon sequestration through farming'
    ],
    relatedTopics: ['food-sovereignty', 'zero-waste']
  },
  'zero-waste': {
    title: 'ZERO WASTE LIVING',
    description: 'Practical strategies to minimize waste and live lighter',
    icon: Recycle,
    color: 'moss',
    heroImage: '♻️',
    stats: { lessons: 21, duration: '7 hours', level: 'Beginner' },
    overview: 'Zero waste isn\'t about perfection—it\'s about making better choices. Learn practical strategies to reduce, reuse, and recycle effectively. From kitchen swaps to sustainable shopping, discover how to dramatically reduce your waste footprint.',
    modules: [
      { title: 'Zero Waste Fundamentals', slug: 'zero-waste-basics', description: 'Start your waste-free journey', duration: '45 min', lessons: 4, available: false },
      { title: 'Kitchen & Food Waste', slug: 'food-waste', description: 'Reduce waste where it matters most', duration: '50 min', lessons: 4, available: false },
      { title: 'Sustainable Shopping', slug: 'sustainable-shopping', description: 'Buy less, choose well', duration: '40 min', lessons: 3, available: false },
      { title: 'DIY Cleaning Products', slug: 'diy-cleaning', description: 'Make your own eco-friendly cleaners', duration: '35 min', lessons: 3, available: false }
    ],
    keyTakeaways: [
      'The 5 Rs: Refuse, Reduce, Reuse, Recycle, Rot',
      'Practical kitchen waste reduction',
      'Understanding recycling properly',
      'Composting food scraps',
      'Transitioning to reusables'
    ],
    relatedTopics: ['food-sovereignty', 'agriculture']
  },
  'green-building': {
    title: 'GREEN BUILDING',
    description: 'Sustainable architecture, materials, and energy-efficient design',
    icon: Home,
    color: 'ocean',
    heroImage: '🏠',
    stats: { lessons: 28, duration: '10 hours', level: 'Intermediate' },
    overview: 'Whether you\'re building new or retrofitting existing structures, learn how to create energy-efficient, healthy, and sustainable buildings. Explore passive design, sustainable materials, and smart home technology.',
    modules: [
      { title: 'Energy-Efficient Homes', slug: 'energy-efficiency', description: 'Reduce home energy consumption', duration: '60 min', lessons: 5, available: false },
      { title: 'Sustainable Materials', slug: 'materials', description: 'Choose eco-friendly building materials', duration: '50 min', lessons: 4, available: false },
      { title: 'Passive Solar Design', slug: 'passive-solar', description: 'Use the sun to heat and cool naturally', duration: '55 min', lessons: 4, available: false },
      { title: 'Smart Home Energy', slug: 'smart-home', description: 'Technology for efficiency', duration: '45 min', lessons: 3, available: false }
    ],
    keyTakeaways: [
      'Passive heating and cooling strategies',
      'Insulation and air sealing',
      'Sustainable material selection',
      'Energy-efficient appliances and systems',
      'Smart home automation for efficiency'
    ],
    relatedTopics: ['renewable-energy', 'water-systems']
  },
  'food-sovereignty': {
    title: 'FOOD SOVEREIGNTY',
    description: 'Local food systems, gardening, and community nutrition',
    icon: Leaf,
    color: 'terra',
    heroImage: '🥬',
    stats: { lessons: 26, duration: '9 hours', level: 'All Levels' },
    overview: 'Take control of your food supply by understanding local food systems, growing your own food, and supporting community-based agriculture. Learn about food preservation, seasonal eating, and building resilient local food networks.',
    modules: [
      { title: 'Sustainable Wardrobe', slug: 'sustainable-wardrobe', description: 'Ethical fashion choices', duration: '50 min', lessons: 4, available: true },
      { title: 'Home Vegetable Gardening', slug: 'vegetable-gardening', description: 'Grow your own organic produce', duration: '60 min', lessons: 5, available: false },
      { title: 'Food Preservation', slug: 'food-preservation', description: 'Canning, fermenting, and storing', duration: '55 min', lessons: 4, available: false },
      { title: 'Community Food Systems', slug: 'community-food', description: 'Support and build local food networks', duration: '45 min', lessons: 3, available: false }
    ],
    keyTakeaways: [
      'Understanding food miles and local sourcing',
      'Starting a vegetable garden',
      'Food preservation techniques',
      'Supporting farmers markets and CSAs',
      'Building community food resilience'
    ],
    relatedTopics: ['agriculture', 'zero-waste']
  }
}

export default async function TopicPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const topic = topicsData[slug]

  if (!topic) {
    notFound()
  }

  const Icon = topic.icon

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-earth-900">
      {/* Hero Section */}
      <section className={`py-20 bg-gradient-to-br from-${topic.color}-500 via-${topic.color}-600 to-${topic.color}-700 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/learn" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 font-bold">
              <ArrowLeft className="w-5 h-5" />
              Back to Learn
            </Link>

            <div className="flex items-center gap-6 mb-6">
              <div className="text-8xl">{topic.heroImage}</div>
              <div>
                <h1 className="text-5xl font-black mb-2">{topic.title}</h1>
                <p className="text-xl font-medium opacity-90">{topic.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <BookOpen className="w-5 h-5" />
                <span className="font-bold">{topic.stats.lessons} Lessons</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-5 h-5" />
                <span className="font-bold">{topic.stats.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Target className="w-5 h-5" />
                <span className="font-bold">{topic.stats.level}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <section>
                <h2 className="text-3xl font-black mb-4 text-earth-900 dark:text-sand-100">Overview</h2>
                <p className="text-lg text-earth-700 dark:text-sand-300 leading-relaxed">
                  {topic.overview}
                </p>
              </section>

              {/* Modules */}
              <section>
                <h2 className="text-3xl font-black mb-6 text-earth-900 dark:text-sand-100">Modules</h2>
                <div className="space-y-4">
                  {topic.modules.map((module, i) => {
                    const ModuleCard = (
                      <Card className={`border-2 ${module.available ? `border-${topic.color}-300 dark:border-${topic.color}-700 hover:border-${topic.color}-500 cursor-pointer` : 'border-sand-200 dark:border-earth-700 opacity-70'} transition-all`}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl ${module.available ? `bg-${topic.color}-100 dark:bg-${topic.color}-900` : 'bg-sand-100 dark:bg-earth-800'} flex items-center justify-center flex-shrink-0`}>
                              {module.available ? (
                                <Play className={`w-6 h-6 text-${topic.color}-600 dark:text-${topic.color}-400`} />
                              ) : (
                                <Clock className="w-6 h-6 text-earth-400 dark:text-sand-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="text-lg font-black text-earth-900 dark:text-sand-100">{module.title}</h3>
                                {!module.available && (
                                  <span className="px-2 py-1 text-xs font-bold bg-sand-200 dark:bg-earth-700 text-earth-500 dark:text-sand-500 rounded">
                                    COMING SOON
                                  </span>
                                )}
                              </div>
                              <p className="text-earth-600 dark:text-sand-400 mb-2">{module.description}</p>
                              <div className="flex items-center gap-4 text-sm text-earth-500 dark:text-sand-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {module.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                  <BookOpen className="w-4 h-4" />
                                  {module.lessons} lessons
                                </span>
                              </div>
                            </div>
                            {module.available && (
                              <ChevronRight className={`w-6 h-6 text-${topic.color}-500`} />
                            )}
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
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Key Takeaways */}
              <Card className={`border-2 border-${topic.color}-300 dark:border-${topic.color}-700`}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-black mb-4 text-earth-900 dark:text-sand-100">Key Takeaways</h3>
                  <ul className="space-y-3">
                    {topic.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 text-${topic.color}-500 flex-shrink-0 mt-0.5`} />
                        <span className="text-earth-700 dark:text-sand-300">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Start Learning CTA */}
              <Card className={`border-4 border-${topic.color}-400 dark:border-${topic.color}-600 bg-gradient-to-br from-${topic.color}-50 to-white dark:from-earth-800 dark:to-earth-900`}>
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4">{topic.heroImage}</div>
                  <h3 className="text-xl font-black mb-2 text-earth-900 dark:text-sand-100">Ready to Start?</h3>
                  <p className="text-earth-600 dark:text-sand-400 mb-4">
                    Begin your journey with the first available module
                  </p>
                  {topic.modules.find(m => m.available) && (
                    <Link href={`/learn/modules/${topic.modules.find(m => m.available)?.slug}`}>
                      <Button className="w-full font-bold">
                        Start Learning <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>

              {/* Related Topics */}
              <Card className="border-2 border-sand-200 dark:border-earth-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-black mb-4 text-earth-900 dark:text-sand-100">Related Topics</h3>
                  <div className="space-y-2">
                    {topic.relatedTopics.map((relatedSlug, i) => {
                      const related = topicsData[relatedSlug]
                      if (!related) return null
                      const RelatedIcon = related.icon
                      return (
                        <Link key={i} href={`/learn/topics/${relatedSlug}`}>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-sand-50 dark:bg-earth-800 hover:bg-sand-100 dark:hover:bg-earth-700 transition-colors">
                            <div className={`w-10 h-10 rounded-lg bg-${related.color}-100 dark:bg-${related.color}-900 flex items-center justify-center`}>
                              <RelatedIcon className={`w-5 h-5 text-${related.color}-600 dark:text-${related.color}-400`} />
                            </div>
                            <span className="font-bold text-earth-800 dark:text-sand-200">{related.title}</span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
