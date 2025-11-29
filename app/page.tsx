import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { prisma } from '@/lib/db'
import {
  BookOpen, Users, Leaf, ShoppingBag, Calculator, Droplet,
  GraduationCap, Target, ChevronRight, Lightbulb, Play,
  Clock, Zap, Sun, Recycle, Sprout, Heart, ArrowRight
} from 'lucide-react'

async function getStats() {
  try {
    const [productCount, articleCount, userCount] = await Promise.all([
      prisma.product.count({ where: { status: 'PUBLISHED' } }),
      prisma.article.count({ where: { status: 'PUBLISHED' } }),
      prisma.user.count()
    ])
    return { productCount, articleCount, userCount }
  } catch {
    return { productCount: 0, articleCount: 0, userCount: 0 }
  }
}

export default async function Home() {
  const stats = await getStats()

  const quickFacts = [
    { fact: 'The average person generates 4.4 lbs of trash per day', source: 'EPA' },
    { fact: 'Solar energy costs have dropped 89% since 2010', source: 'IRENA' },
    { fact: 'Composting can divert 30% of household waste from landfills', source: 'USDA' },
    { fact: 'A single tree absorbs 48 lbs of CO2 per year', source: 'Arbor Day Foundation' },
    { fact: 'Regenerative agriculture can sequester 3-6 tons of carbon per acre annually', source: 'Rodale Institute' },
    { fact: 'LED bulbs use 75% less energy than incandescent lighting', source: 'DOE' }
  ]

  const featuredModules = [
    {
      title: 'Understanding Your Carbon Footprint',
      slug: 'carbon-footprint',
      description: 'Learn to measure and reduce your environmental impact',
      category: 'FUNDAMENTALS',
      duration: '45 min',
      icon: Target,
      color: 'moss'
    },
    {
      title: 'Water Conservation',
      slug: 'water-conservation',
      description: 'Discover innovative techniques for water conservation',
      category: 'WATER SYSTEMS',
      duration: '60 min',
      icon: Droplet,
      color: 'ocean'
    },
    {
      title: 'Solar Energy Basics',
      slug: 'solar-energy',
      description: 'Everything about solar power for your home',
      category: 'RENEWABLE ENERGY',
      duration: '55 min',
      icon: Sun,
      color: 'terra'
    }
  ]

  const interactiveTools = [
    {
      title: 'Carbon Calculator',
      description: 'Calculate your environmental footprint and get personalized tips',
      href: '/tools/carbon-calculator',
      icon: Leaf,
      color: 'moss',
      cta: 'Calculate Now'
    },
    {
      title: 'Water Footprint',
      description: 'Discover your total water usage - direct and virtual',
      href: '/tools/water-calculator',
      icon: Droplet,
      color: 'ocean',
      cta: 'Measure Now'
    }
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section - BOLD & EXPERIMENTAL */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sand-50 via-moss-50 to-ocean-50 dark:from-earth-900 dark:via-earth-800 dark:to-earth-900">
        {/* Morphing Background Blobs - 3D Effect */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-moss-400 dark:bg-moss-600 rounded-full blur-3xl opacity-40 dark:opacity-30 animate-pulse"
               style={{ transform: 'translateZ(0) scale(1.2)', animationDuration: '8s' }} />
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-ocean-400 dark:bg-ocean-600 rounded-full blur-3xl opacity-40 dark:opacity-30 animate-pulse"
               style={{ transform: 'translateZ(0) scale(1.3)', animationDelay: '2s', animationDuration: '10s' }} />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-terra-300 dark:bg-terra-600 rounded-full blur-3xl opacity-30 dark:opacity-20 animate-pulse"
               style={{ transform: 'translateZ(0)', animationDelay: '4s', animationDuration: '12s' }} />
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-6xl mx-auto">
            {/* Badge - Floating */}
            <div className="flex justify-center mb-8 animate-bounce" style={{ animationDuration: '3s' }}>
              <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border-2 border-moss-300 dark:border-moss-600 text-moss-900 dark:text-moss-300 font-bold text-base backdrop-blur-xl">
                <span className="w-3 h-3 bg-moss-500 dark:bg-moss-400 rounded-full animate-ping" />
                <span className="w-3 h-3 bg-moss-500 dark:bg-moss-400 rounded-full absolute pulse-alive" />
                BUILDING A SUSTAINABLE FUTURE
              </span>
            </div>

            {/* Massive Hero Title - Ultra Bold */}
            <h1 className="text-center mb-8" style={{
              fontSize: 'clamp(3rem, 12vw, 9rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.02em'
            }}>
              <div className="text-earth-900 dark:text-sand-100" style={{ marginBottom: '0.2em' }}>
                WELCOME TO
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #36763d 0%, #357777 50%, #c24f31 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 6s ease infinite'
              }}>
                PROJECT EXODUS
              </div>
            </h1>

            {/* Subtitle - Large & Bold */}
            <p className="text-center max-w-4xl mx-auto mb-12 text-earth-900 dark:text-sand-200" style={{
              fontSize: 'clamp(1.25rem, 3vw, 2rem)',
              fontWeight: 600,
              lineHeight: 1.4
            }}>
              Building sustainable infrastructure for <span style={{
                background: 'linear-gradient(135deg, #36763d, #357777)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800
              }}>Food</span>, <span style={{
                background: 'linear-gradient(135deg, #357777, #c24f31)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800
              }}>Water</span>, and <span style={{
                background: 'linear-gradient(135deg, #c24f31, #36763d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800
              }}>Energy</span>
            </p>

            {/* CTA Buttons - Large & Prominent */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/products">
                <Button size="lg" className="text-xl px-12 py-8 rounded-2xl shadow-2xl hover:scale-110 transition-transform duration-300" style={{
                  background: 'linear-gradient(135deg, #36763d, #2d5e32)',
                  minWidth: '250px'
                }}>
                  Explore Now →
                </Button>
              </Link>
              <Link href="/learn">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 rounded-2xl border-4 border-earth-900 hover:bg-earth-900 hover:text-white transition-all duration-300" style={{
                  minWidth: '250px',
                  fontWeight: 700
                }}>
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ animationDuration: '2s' }}>
          <div className="w-6 h-10 border-4 border-earth-900 dark:border-sand-200 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-earth-900 dark:bg-sand-200 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Mission Section - Asymmetric Layout */}
      <section className="py-32 bg-white dark:bg-earth-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, #36763d 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Section Title - Offset */}
            <div className="mb-20">
              <div className="inline-block transform -rotate-2 bg-moss-500 dark:bg-moss-600 text-white px-8 py-4 rounded-2xl mb-6">
                <span className="text-sm font-bold tracking-wider">OUR MISSION</span>
              </div>
              <h2 className="text-earth-900 dark:text-sand-100" style={{
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                maxWidth: '800px'
              }}>
                Building the FAMILY that loves sustainability as much as we do
              </h2>
            </div>

            {/* Cards - Tilted & 3D */}
            <div className="grid lg:grid-cols-3 gap-12 mb-20">
              {/* Discover Card */}
              <div className="group perspective transform hover:scale-105 transition-all duration-500" style={{ transform: 'rotate(-2deg)' }}>
                <div className="relative p-10 rounded-3xl bg-gradient-to-br from-moss-100 to-moss-200 dark:from-moss-900 dark:to-moss-800 border-4 border-moss-600 dark:border-moss-500 hover:shadow-2xl transition-shadow duration-300">
                  <div className="w-20 h-20 mb-6 rounded-full bg-moss-500 dark:bg-moss-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <ShoppingBag className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black mb-4 text-moss-700 dark:text-moss-300">
                    DISCOVER
                  </h3>
                  <p className="text-lg font-medium text-earth-900 dark:text-sand-200">
                    Thousands of sustainable products across every category imaginable
                  </p>
                </div>
              </div>

              {/* Learn Card */}
              <div className="group perspective transform hover:scale-105 transition-all duration-500" style={{ transform: 'rotate(1deg)' }}>
                <div className="relative p-10 rounded-3xl bg-gradient-to-br from-ocean-100 to-ocean-200 dark:from-ocean-900 dark:to-ocean-800 border-4 border-ocean-600 dark:border-ocean-500 hover:shadow-2xl transition-shadow duration-300">
                  <div className="w-20 h-20 mb-6 rounded-full bg-ocean-500 dark:bg-ocean-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black mb-4 text-ocean-700 dark:text-ocean-300">
                    LEARN
                  </h3>
                  <p className="text-lg font-medium text-earth-900 dark:text-sand-200">
                    Deep-dive educational content that empowers informed decisions
                  </p>
                </div>
              </div>

              {/* Connect Card */}
              <div className="group perspective transform hover:scale-105 transition-all duration-500" style={{ transform: 'rotate(-1deg)' }}>
                <div className="relative p-10 rounded-3xl bg-gradient-to-br from-terra-100 to-terra-200 dark:from-terra-900 dark:to-terra-800 border-4 border-terra-600 dark:border-terra-500 hover:shadow-2xl transition-shadow duration-300">
                  <div className="w-20 h-20 mb-6 rounded-full bg-terra-500 dark:bg-terra-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black mb-4 text-terra-700 dark:text-terra-300">
                    CONNECT
                  </h3>
                  <p className="text-lg font-medium text-earth-900 dark:text-sand-200">
                    Join a vibrant community of changemakers building the future
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats - Bold Numbers */}
      <section className="py-32 bg-earth-900 dark:bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-moss-500 to-ocean-500 dark:from-moss-600 dark:to-ocean-600" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">GROWING EVERY DAY</h2>
            <p className="text-xl text-sand-300">Real-time stats from our community</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 max-w-6xl mx-auto">
            {[
              { value: stats.productCount > 0 ? `${stats.productCount}` : '10K+', label: 'PRODUCTS', icon: ShoppingBag },
              { value: stats.articleCount > 0 ? `${stats.articleCount}` : '150+', label: 'ARTICLES', icon: BookOpen },
              { value: stats.userCount > 0 ? `${stats.userCount}` : '5K+', label: 'MEMBERS', icon: Users },
              { value: '6', label: 'LEARNING MODULES', icon: GraduationCap },
            ].map((stat, i) => (
              <div key={i} className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-moss-500 to-ocean-500 flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: 900,
                  lineHeight: 1.2,
                  background: 'linear-gradient(135deg, #9ccba0, #91cdcd)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}>
                  {stat.value}
                </div>
                <div className="text-lg font-black tracking-wider text-sand-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Facts Marquee */}
      <section className="py-8 bg-moss-600 dark:bg-moss-800 overflow-hidden">
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

      {/* Featured Learning Modules */}
      <section className="py-24 bg-sand-50 dark:bg-earth-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-moss-100 dark:bg-moss-900 border-2 border-moss-500 dark:border-moss-600 mb-6">
              <GraduationCap className="w-6 h-6 text-moss-700 dark:text-moss-400" />
              <span className="font-bold text-moss-800 dark:text-moss-300">PROFESSOR SAGE'S CLASSROOM</span>
            </div>
            <h2 className="text-5xl font-black mb-4 text-earth-900 dark:text-sand-100">START LEARNING TODAY</h2>
            <p className="text-xl font-semibold text-earth-700 dark:text-sand-300">
              Interactive modules with quizzes and progress tracking
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {featuredModules.map((module, i) => (
              <Link key={i} href={`/learn/modules/${module.slug}`}>
                <Card className={`h-full border-2 border-sand-300 dark:border-earth-600 hover:border-${module.color}-400 dark:hover:border-${module.color}-500 bg-white dark:bg-earth-900 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-black bg-${module.color}-100 dark:bg-${module.color}-900 text-${module.color}-700 dark:text-${module.color}-400`}>
                        {module.category}
                      </span>
                      <div className={`w-12 h-12 rounded-xl bg-${module.color}-100 dark:bg-${module.color}-900 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <module.icon className={`w-6 h-6 text-${module.color}-600 dark:text-${module.color}-400`} />
                      </div>
                    </div>

                    <h3 className="text-lg font-black mb-2 text-earth-900 dark:text-sand-100 group-hover:text-moss-700 dark:group-hover:text-moss-400 transition-colors">
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
                      <span className="font-bold text-moss-600 dark:text-moss-400 flex items-center gap-1">
                        START <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/learn">
              <Button size="lg" className="text-lg px-10 py-6 font-black shadow-xl">
                VIEW ALL MODULES <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Tools Preview */}
      <section className="py-24 bg-white dark:bg-earth-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-earth-900 dark:text-sand-100">INTERACTIVE TOOLS</h2>
            <p className="text-xl font-semibold text-earth-700 dark:text-sand-300">
              Calculate your environmental impact with our free tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {interactiveTools.map((tool, i) => (
              <Link key={i} href={tool.href}>
                <Card className={`h-full border-4 border-${tool.color}-300 dark:border-${tool.color}-600 bg-gradient-to-br from-${tool.color}-50 to-white dark:from-earth-800 dark:to-earth-900 transform hover:scale-105 transition-all cursor-pointer group`}>
                  <CardContent className="p-10 text-center">
                    <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-${tool.color}-100 dark:bg-${tool.color}-900 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <tool.icon className={`w-12 h-12 text-${tool.color}-600 dark:text-${tool.color}-400`} />
                    </div>
                    <h3 className="text-2xl font-black mb-3 text-earth-900 dark:text-sand-100">{tool.title}</h3>
                    <p className="font-medium mb-6 text-earth-700 dark:text-sand-300">{tool.description}</p>
                    <Button className={`font-bold bg-${tool.color}-500 hover:bg-${tool.color}-600`}>
                      {tool.cta} <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Preview */}
      <section className="py-24 bg-sand-50 dark:bg-earth-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-earth-900 dark:text-sand-100">EXPLORE TOPICS</h2>
            <p className="text-xl font-semibold text-earth-700 dark:text-sand-300">
              Dive deep into the pillars of sustainability
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {[
              { icon: Zap, label: 'Energy', color: 'moss' },
              { icon: Droplet, label: 'Water', color: 'ocean' },
              { icon: Sprout, label: 'Agriculture', color: 'terra' },
              { icon: Recycle, label: 'Zero Waste', color: 'moss' },
              { icon: Sun, label: 'Solar', color: 'ocean' },
              { icon: Heart, label: 'Fashion', color: 'terra' }
            ].map((topic, i) => (
              <Link key={i} href="/learn">
                <div className={`p-6 rounded-2xl bg-white dark:bg-earth-900 border-2 border-sand-200 dark:border-earth-700 hover:border-${topic.color}-400 dark:hover:border-${topic.color}-500 text-center transform hover:scale-105 transition-all cursor-pointer`}>
                  <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-${topic.color}-100 dark:bg-${topic.color}-900 flex items-center justify-center`}>
                    <topic.icon className={`w-7 h-7 text-${topic.color}-600 dark:text-${topic.color}-400`} />
                  </div>
                  <span className="font-black text-earth-800 dark:text-sand-200">{topic.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Full Bleed */}
      <section className="py-32 bg-gradient-to-br from-moss-500 via-ocean-500 to-terra-500 dark:from-moss-700 dark:via-ocean-700 dark:to-terra-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-white dark:bg-sand-100 rounded-full blur-3xl opacity-10 dark:opacity-5 animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white dark:bg-sand-100 rounded-full blur-3xl opacity-10 dark:opacity-5 animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="text-7xl mb-8">🌍</div>
            <h2 className="text-white" style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '2rem'
            }}>
              READY TO START YOUR SUSTAINABLE JOURNEY?
            </h2>
            <p className="text-2xl font-semibold mb-12 opacity-90 text-sand-50">
              Every choice matters. Every action counts. Join us today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="text-xl px-12 py-8 rounded-2xl border-4 border-white bg-white text-earth-900 hover:bg-sand-100 dark:hover:bg-sand-200 shadow-2xl hover:scale-110 transition-all duration-300" style={{
                  minWidth: '250px',
                  fontWeight: 800
                }}>
                  GET STARTED →
                </Button>
              </Link>
              <Link href="/tools/carbon-calculator">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 rounded-2xl border-4 border-white text-white hover:bg-white hover:text-earth-900 transition-all duration-300" style={{
                  minWidth: '250px',
                  fontWeight: 800
                }}>
                  TRY CALCULATOR
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
