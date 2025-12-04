import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Sprout, Home, Globe, ChevronRight, Clock, BookOpen,
  CheckCircle2, Circle, Lock, ArrowLeft, Target, Award, Users
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const pathsData: Record<string, {
  id: string
  title: string
  subtitle: string
  description: string
  level: string
  duration: string
  totalModules: number
  icon: any
  color: string
  heroEmoji: string
  overview: string
  whatYoullLearn: string[]
  modules: Array<{
    week: number
    title: string
    description: string
    slug?: string
    available: boolean
    lessons: number
  }>
  requirements: string[]
  outcomes: string[]
}> = {
  'beginner': {
    id: 'beginner',
    title: 'SUSTAINABILITY 101',
    subtitle: 'Start Your Journey',
    description: 'Perfect for newcomers. Learn the fundamentals of sustainable living.',
    level: 'Beginner',
    duration: '4 weeks',
    totalModules: 8,
    icon: Sprout,
    color: 'moss',
    heroEmoji: '🌱',
    overview: 'This foundational path is designed for anyone new to sustainability. You\'ll learn the core concepts, understand your environmental impact, and discover practical steps you can take today to live more sustainably. No prior knowledge required!',
    whatYoullLearn: [
      'Understanding sustainability and why it matters',
      'Calculating and reducing your carbon footprint',
      'Building sustainable daily habits',
      'Making eco-friendly choices at home',
      'Reducing waste and consumption',
      'Connecting with the sustainability community'
    ],
    modules: [
      { week: 1, title: 'What is Sustainability?', description: 'Core concepts and the triple bottom line', available: false, lessons: 3 },
      { week: 1, title: 'Understanding Your Carbon Footprint', slug: 'carbon-footprint', description: 'Measure and understand your impact', available: true, lessons: 4 },
      { week: 2, title: 'Sustainable Daily Habits', description: 'Small changes with big impact', available: false, lessons: 4 },
      { week: 2, title: 'The Zero Waste Mindset', description: 'Reduce, reuse, recycle, and beyond', available: false, lessons: 3 },
      { week: 3, title: 'Water Conservation', slug: 'water-conservation', description: 'Protecting our most precious resource', available: true, lessons: 4 },
      { week: 3, title: 'Energy at Home', description: 'Simple ways to reduce energy use', available: false, lessons: 3 },
      { week: 4, title: 'Sustainable Shopping', description: 'Making better purchasing decisions', available: false, lessons: 3 },
      { week: 4, title: 'Building Your Green Community', description: 'Connect and grow together', available: false, lessons: 2 }
    ],
    requirements: [
      'No prior knowledge needed',
      'Curiosity and willingness to learn',
      'About 2-3 hours per week'
    ],
    outcomes: [
      'Understand key sustainability concepts',
      'Know your personal environmental impact',
      'Have actionable steps to reduce your footprint',
      'Be prepared for intermediate topics'
    ]
  },
  'intermediate': {
    id: 'intermediate',
    title: 'HOME & LIFESTYLE',
    subtitle: 'Transform Your Space',
    description: 'Dive deeper into sustainable home practices and energy efficiency.',
    level: 'Intermediate',
    duration: '6 weeks',
    totalModules: 12,
    icon: Home,
    color: 'ocean',
    heroEmoji: '🏠',
    overview: 'Ready to take your sustainability journey further? This intermediate path focuses on transforming your home into an eco-friendly haven. Learn about renewable energy, water systems, green cleaning, and sustainable design principles.',
    whatYoullLearn: [
      'Home energy audits and efficiency',
      'Solar and renewable energy basics',
      'Water harvesting and conservation systems',
      'Non-toxic cleaning and home care',
      'Sustainable interior design',
      'Smart home technology for efficiency'
    ],
    modules: [
      { week: 1, title: 'Home Energy Audit', description: 'Assess your home\'s energy use', available: false, lessons: 4 },
      { week: 1, title: 'Solar Energy Basics', slug: 'solar-energy', description: 'Is solar right for you?', available: true, lessons: 4 },
      { week: 2, title: 'Efficient Heating & Cooling', description: 'Reduce HVAC energy consumption', available: false, lessons: 4 },
      { week: 2, title: 'LED Lighting & Smart Controls', description: 'Lighting efficiency strategies', available: false, lessons: 3 },
      { week: 3, title: 'Rainwater Harvesting', description: 'Collect and use rainwater', available: false, lessons: 4 },
      { week: 3, title: 'Greywater Systems', description: 'Reusing household water safely', available: false, lessons: 3 },
      { week: 4, title: 'Non-Toxic Cleaning', description: 'DIY natural cleaning products', available: false, lessons: 3 },
      { week: 4, title: 'Indoor Air Quality', description: 'Plants and ventilation for health', available: false, lessons: 3 },
      { week: 5, title: 'Sustainable Materials', description: 'Choosing eco-friendly furnishings', available: false, lessons: 4 },
      { week: 5, title: 'Composting Masterclass', slug: 'composting', description: 'From kitchen scraps to garden gold', available: true, lessons: 4 },
      { week: 6, title: 'Smart Home Integration', description: 'Technology for sustainability', available: false, lessons: 3 },
      { week: 6, title: 'Home Sustainability Audit', description: 'Putting it all together', available: false, lessons: 2 }
    ],
    requirements: [
      'Completed Sustainability 101 or equivalent knowledge',
      'Access to your home for hands-on projects',
      'About 3-4 hours per week'
    ],
    outcomes: [
      'Significantly reduced home energy use',
      'Implemented water-saving systems',
      'Created a healthier indoor environment',
      'Saved money on utilities',
      'Ready for advanced sustainability topics'
    ]
  },
  'advanced': {
    id: 'advanced',
    title: 'SYSTEMS THINKING',
    subtitle: 'Lead The Change',
    description: 'Explore regenerative systems, community organizing, and policy advocacy.',
    level: 'Advanced',
    duration: '8 weeks',
    totalModules: 16,
    icon: Globe,
    color: 'terra',
    heroEmoji: '🌍',
    overview: 'For committed changemakers ready to think bigger. This advanced path covers systems-level thinking, regenerative design, community leadership, and how to advocate for policy change. Become a sustainability leader in your community.',
    whatYoullLearn: [
      'Systems thinking and interconnections',
      'Regenerative agriculture principles',
      'Community organizing and leadership',
      'Policy advocacy and civic engagement',
      'Sustainable business models',
      'Building resilient communities'
    ],
    modules: [
      { week: 1, title: 'Introduction to Systems Thinking', description: 'See the bigger picture', available: false, lessons: 4 },
      { week: 1, title: 'Regenerative Agriculture Principles', slug: 'regenerative-agriculture', description: 'Farming that heals the land', available: true, lessons: 5 },
      { week: 2, title: 'Carbon Sequestration', description: 'Drawing down atmospheric carbon', available: false, lessons: 4 },
      { week: 2, title: 'Permaculture Design', description: 'Design with nature', available: false, lessons: 5 },
      { week: 3, title: 'Local Food Systems', description: 'Building food sovereignty', available: false, lessons: 4 },
      { week: 3, title: 'Community Gardens', description: 'Growing together', available: false, lessons: 3 },
      { week: 4, title: 'Sustainable Fashion', slug: 'sustainable-wardrobe', description: 'Building an ethical wardrobe', available: true, lessons: 4 },
      { week: 4, title: 'Circular Economy', description: 'Beyond recycling', available: false, lessons: 4 },
      { week: 5, title: 'Community Organizing', description: 'Mobilize for change', available: false, lessons: 4 },
      { week: 5, title: 'Environmental Justice', description: 'Equity in sustainability', available: false, lessons: 4 },
      { week: 6, title: 'Policy & Advocacy', description: 'Influence systemic change', available: false, lessons: 4 },
      { week: 6, title: 'Local Government Engagement', description: 'Work with your city', available: false, lessons: 3 },
      { week: 7, title: 'Sustainable Business Models', description: 'Purpose-driven enterprise', available: false, lessons: 4 },
      { week: 7, title: 'Green Jobs & Careers', description: 'Work in sustainability', available: false, lessons: 3 },
      { week: 8, title: 'Community Resilience', description: 'Prepare for climate change', available: false, lessons: 4 },
      { week: 8, title: 'Your Leadership Journey', description: 'Create your action plan', available: false, lessons: 2 }
    ],
    requirements: [
      'Completed intermediate path or equivalent',
      'Passion for community leadership',
      'Ready to take action beyond your home',
      'About 4-5 hours per week'
    ],
    outcomes: [
      'Think in systems and interconnections',
      'Lead sustainability initiatives',
      'Advocate effectively for policy change',
      'Build and strengthen community networks',
      'Create lasting systemic impact'
    ]
  }
}

export default async function LearningPathPage({
  params
}: {
  params: Promise<{ pathId: string }>
}) {
  const { pathId } = await params
  const path = pathsData[pathId]

  if (!path) {
    notFound()
  }

  const Icon = path.icon
  const availableModules = path.modules.filter(m => m.available).length
  const totalLessons = path.modules.reduce((acc, m) => acc + m.lessons, 0)

  // Group modules by week
  const modulesByWeek = path.modules.reduce((acc, module) => {
    if (!acc[module.week]) acc[module.week] = []
    acc[module.week].push(module)
    return acc
  }, {} as Record<number, typeof path.modules>)

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-earth-900">
      {/* Hero */}
      <section className={`py-20 bg-gradient-to-br from-${path.color}-500 via-${path.color}-600 to-${path.color}-700 text-white relative overflow-hidden`}>
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
              <div className="text-8xl">{path.heroEmoji}</div>
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold bg-white/20 mb-2`}>
                  {path.level.toUpperCase()}
                </span>
                <h1 className="text-5xl font-black mb-2">{path.title}</h1>
                <p className="text-xl font-medium opacity-90">{path.subtitle}</p>
              </div>
            </div>

            <p className="text-lg opacity-90 mb-8 max-w-2xl">{path.description}</p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-5 h-5" />
                <span className="font-bold">{path.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <BookOpen className="w-5 h-5" />
                <span className="font-bold">{path.totalModules} Modules</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Target className="w-5 h-5" />
                <span className="font-bold">{totalLessons} Lessons</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-bold">{availableModules} Available Now</span>
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
                  {path.overview}
                </p>
              </section>

              {/* What You'll Learn */}
              <section>
                <h2 className="text-3xl font-black mb-6 text-earth-900 dark:text-sand-100">What You'll Learn</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {path.whatYoullLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-earth-800 border-2 border-sand-200 dark:border-earth-700">
                      <CheckCircle2 className={`w-6 h-6 text-${path.color}-500 flex-shrink-0`} />
                      <span className="font-medium text-earth-700 dark:text-sand-300">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Curriculum */}
              <section>
                <h2 className="text-3xl font-black mb-6 text-earth-900 dark:text-sand-100">Curriculum</h2>
                <div className="space-y-8">
                  {Object.entries(modulesByWeek).map(([week, modules]) => (
                    <div key={week}>
                      <h3 className={`text-lg font-black text-${path.color}-600 dark:text-${path.color}-400 mb-4`}>
                        Week {week}
                      </h3>
                      <div className="space-y-3">
                        {modules.map((module, i) => {
                          const ModuleCard = (
                            <div className={`flex items-center gap-4 p-4 rounded-xl ${
                              module.available
                                ? `bg-white dark:bg-earth-800 border-2 border-${path.color}-300 dark:border-${path.color}-700 hover:border-${path.color}-500 cursor-pointer`
                                : 'bg-sand-100 dark:bg-earth-800/50 border-2 border-sand-200 dark:border-earth-700'
                            } transition-all`}>
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                module.available
                                  ? `bg-${path.color}-100 dark:bg-${path.color}-900`
                                  : 'bg-sand-200 dark:bg-earth-700'
                              }`}>
                                {module.available ? (
                                  <CheckCircle2 className={`w-5 h-5 text-${path.color}-600 dark:text-${path.color}-400`} />
                                ) : (
                                  <Lock className="w-5 h-5 text-earth-400 dark:text-sand-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className={`font-bold ${module.available ? 'text-earth-900 dark:text-sand-100' : 'text-earth-500 dark:text-sand-500'}`}>
                                  {module.title}
                                </h4>
                                <p className="text-sm text-earth-500 dark:text-sand-500">{module.description}</p>
                              </div>
                              <div className="text-sm text-earth-400 dark:text-sand-600">
                                {module.lessons} lessons
                              </div>
                              {module.available && (
                                <ChevronRight className={`w-5 h-5 text-${path.color}-500`} />
                              )}
                            </div>
                          )

                          return module.available && module.slug ? (
                            <Link key={i} href={`/learn/modules/${module.slug}`}>
                              {ModuleCard}
                            </Link>
                          ) : (
                            <div key={i}>{ModuleCard}</div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Enroll CTA */}
              <Card className={`border-4 border-${path.color}-400 dark:border-${path.color}-600 bg-gradient-to-br from-${path.color}-50 to-white dark:from-earth-800 dark:to-earth-900`}>
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4">{path.heroEmoji}</div>
                  <h3 className="text-xl font-black mb-2 text-earth-900 dark:text-sand-100">Start This Path</h3>
                  <p className="text-earth-600 dark:text-sand-400 mb-4">
                    {availableModules} modules available now
                  </p>
                  <Button className="w-full font-bold text-lg py-6">
                    Begin Learning <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card className="border-2 border-sand-200 dark:border-earth-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-black mb-4 text-earth-900 dark:text-sand-100">Requirements</h3>
                  <ul className="space-y-3">
                    {path.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Circle className="w-4 h-4 text-earth-400 flex-shrink-0 mt-1" />
                        <span className="text-earth-600 dark:text-sand-400">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Outcomes */}
              <Card className={`border-2 border-${path.color}-300 dark:border-${path.color}-700`}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-black mb-4 text-earth-900 dark:text-sand-100 flex items-center gap-2">
                    <Award className={`w-6 h-6 text-${path.color}-500`} />
                    Outcomes
                  </h3>
                  <ul className="space-y-3">
                    {path.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 text-${path.color}-500 flex-shrink-0 mt-0.5`} />
                        <span className="text-earth-700 dark:text-sand-300">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
