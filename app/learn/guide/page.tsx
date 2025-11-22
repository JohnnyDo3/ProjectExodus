import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Leaf,
  Lightbulb,
  Droplet,
  Recycle,
  Home,
  ShoppingBag,
  Utensils,
  Zap,
  TreePine,
  Wind,
  Sun,
  Heart,
  Users,
  TrendingUp,
  BookOpen,
  CheckCircle2
} from 'lucide-react'
import Link from 'next/link'

export default function SustainabilityGuidePage() {
  const guideTopics = [
    {
      icon: Recycle,
      title: 'Reduce, Reuse, Recycle',
      slug: 'waste-reduction',
      description: 'Master the art of waste reduction and zero-waste living',
      tips: [
        'Start with a waste audit to understand what you throw away',
        'Replace single-use items with reusable alternatives',
        'Learn proper recycling and composting techniques',
        'Buy products with minimal or recyclable packaging',
        'Repair and repurpose items instead of discarding them'
      ]
    },
    {
      icon: Zap,
      title: 'Energy Conservation',
      slug: 'energy',
      description: 'Reduce your carbon footprint through smart energy use',
      tips: [
        'Switch to LED bulbs throughout your home',
        'Unplug devices when not in use to prevent phantom energy drain',
        'Use a programmable thermostat to optimize heating and cooling',
        'Insulate your home properly to reduce energy loss',
        'Consider renewable energy sources like solar panels'
      ]
    },
    {
      icon: Droplet,
      title: 'Water Conservation',
      slug: 'water',
      description: 'Protect our most precious resource',
      tips: [
        'Fix leaks promptly - a dripping faucet wastes gallons daily',
        'Install low-flow showerheads and faucet aerators',
        'Collect rainwater for garden irrigation',
        'Run dishwashers and washing machines only with full loads',
        'Choose drought-resistant native plants for landscaping'
      ]
    },
    {
      icon: Utensils,
      title: 'Sustainable Eating',
      slug: 'food',
      description: 'Make eco-friendly food choices',
      tips: [
        'Buy local, seasonal produce to reduce transportation emissions',
        'Reduce meat consumption - try Meatless Mondays',
        'Choose organic when possible to support sustainable farming',
        'Minimize food waste through meal planning and proper storage',
        'Grow your own herbs, vegetables, or fruits'
      ]
    },
    {
      icon: ShoppingBag,
      title: 'Conscious Consumption',
      slug: 'shopping',
      description: 'Shop mindfully and support sustainable businesses',
      tips: [
        'Buy quality items that last rather than cheap disposable goods',
        'Support businesses with transparent sustainability practices',
        'Choose products with eco-certifications and labels',
        'Buy secondhand when possible',
        'Ask "Do I really need this?" before every purchase'
      ]
    },
    {
      icon: Home,
      title: 'Green Living Spaces',
      slug: 'home',
      description: 'Create an eco-friendly home environment',
      tips: [
        'Use natural, non-toxic cleaning products',
        'Choose sustainable materials for furniture and decor',
        'Maximize natural lighting to reduce electricity use',
        'Add indoor plants to improve air quality',
        'Opt for energy-efficient appliances'
      ]
    }
  ]

  const impactStats = [
    {
      icon: TreePine,
      stat: '15+ Tons',
      label: 'CO₂ Reduced by our community',
      color: 'primary'
    },
    {
      icon: Recycle,
      stat: '50K+ lbs',
      label: 'Waste diverted from landfills',
      color: 'accent'
    },
    {
      icon: Users,
      stat: '10,000+',
      label: 'People taking action',
      color: 'secondary'
    }
  ]

  const quickWins = [
    {
      icon: ShoppingBag,
      action: 'Bring reusable bags',
      impact: 'Save 500+ plastic bags per year'
    },
    {
      icon: Droplet,
      action: 'Take shorter showers',
      impact: 'Save 2,500+ gallons annually'
    },
    {
      icon: Utensils,
      action: 'Meal plan weekly',
      impact: 'Reduce food waste by 40%'
    },
    {
      icon: Zap,
      action: 'Switch to LEDs',
      impact: 'Cut lighting costs by 75%'
    },
    {
      icon: Recycle,
      action: 'Start composting',
      impact: 'Divert 30% of household waste'
    },
    {
      icon: Home,
      action: 'Use natural cleaners',
      impact: 'Eliminate toxic chemicals'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[var(--muted)] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] mb-6 shadow-xl">
              <BookOpen className="w-10 h-10 text-[var(--primary-foreground)]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[var(--foreground)]">
              SUSTAINABILITY GUIDE
            </h1>
            <p className="text-xl font-semibold text-theme-muted max-w-2xl mx-auto">
              Your comprehensive resource for living a more sustainable, eco-conscious life
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-primary shadow-xl">
              <CardContent className="p-10">
                <div className="flex items-start gap-6">
                  <Leaf className="w-16 h-16 text-theme-primary flex-shrink-0" />
                  <div>
                    <h2 className="text-3xl font-black mb-4 text-[var(--foreground)]">
                      WHY SUSTAINABLE LIVING MATTERS
                    </h2>
                    <div className="space-y-4 text-base font-medium text-theme-muted leading-relaxed">
                      <p>
                        Every day, our choices impact the planet. From the products we buy to the energy we use,
                        each decision creates ripples that affect our environment, communities, and future generations.
                      </p>
                      <p>
                        Sustainable living isn't about perfection - it's about progress. Small, consistent changes
                        in our daily habits can lead to significant positive impacts over time. Whether you're just
                        starting your sustainability journey or looking to deepen your commitment, this guide will
                        help you make informed, impactful choices.
                      </p>
                      <p>
                        Remember: <span className="font-black text-[var(--foreground)]">Every action matters. Every person counts.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Wins */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">
              QUICK WINS - START TODAY
            </h2>
            <p className="text-lg font-semibold text-theme-muted">
              Simple actions with immediate impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {quickWins.map((item, i) => (
              <Card key={i} className="border-2 border-[var(--border)] hover:border-theme-primary transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-theme-primary" />
                    </div>
                    <div>
                      <h3 className="font-black text-base mb-2 text-[var(--foreground)]">
                        {item.action}
                      </h3>
                      <p className="text-sm font-medium text-theme-muted">
                        {item.impact}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Guide Topics */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">
              COMPREHENSIVE GUIDE TOPICS
            </h2>
            <p className="text-lg font-semibold text-theme-muted">
              Deep dive into key areas of sustainable living
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {guideTopics.map((topic, i) => (
              <Card key={i} id={topic.slug} className="border-4 border-theme-primary hover:border-theme-accent transition-all">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-lg flex-shrink-0">
                      <topic.icon className="w-8 h-8 text-[var(--primary-foreground)]" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-black text-[var(--foreground)]">
                        {topic.title}
                      </CardTitle>
                      <p className="text-base font-medium text-theme-muted mt-1">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <h4 className="font-black text-lg mb-4 text-[var(--foreground)]">KEY ACTIONS:</h4>
                  <div className="space-y-3">
                    {topic.tips.map((tip, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-theme-primary flex-shrink-0 mt-0.5" />
                        <p className="font-medium text-theme-muted">{tip}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">OUR COLLECTIVE IMPACT</h2>
            <p className="text-xl font-semibold opacity-90">
              Together, we're making a real difference
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {impactStats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--primary-foreground)] bg-opacity-20 flex items-center justify-center backdrop-blur-sm">
                  <stat.icon className="w-10 h-10" />
                </div>
                <div className="text-5xl font-black mb-3">{stat.stat}</div>
                <p className="text-lg font-semibold opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Topics */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">
                TAKE IT FURTHER
              </h2>
              <p className="text-lg font-semibold text-theme-muted">
                Ready to deepen your impact? Explore these advanced topics
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Sun,
                  title: 'Renewable Energy',
                  description: 'Learn about solar, wind, and other clean energy options for your home'
                },
                {
                  icon: Wind,
                  title: 'Carbon Offsetting',
                  description: 'Understand and participate in carbon offset programs'
                },
                {
                  icon: Heart,
                  title: 'Ethical Investing',
                  description: 'Align your finances with your values through sustainable investing'
                },
                {
                  icon: TrendingUp,
                  title: 'Circular Economy',
                  description: 'Support businesses that embrace circular economy principles'
                }
              ].map((topic, i) => (
                <Card key={i} className="border-4 border-theme-accent hover:border-theme-secondary transition-all">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] flex items-center justify-center flex-shrink-0">
                        <topic.icon className="w-7 h-7 text-theme-accent" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black mb-2 text-[var(--foreground)]">
                          {topic.title}
                        </h3>
                        <p className="font-medium text-theme-muted">
                          {topic.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-primary shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl font-black text-center text-[var(--foreground)]">
                  CONTINUE YOUR LEARNING
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-center text-lg font-semibold text-theme-muted mb-8">
                  This guide is just the beginning. Explore these resources to learn more:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-lg bg-[var(--muted)]">
                    <Lightbulb className="w-8 h-8 text-theme-primary mb-3" />
                    <h4 className="font-black text-lg mb-2 text-[var(--foreground)]">Articles & Guides</h4>
                    <p className="text-sm font-medium text-theme-muted mb-4">
                      Browse our library of in-depth articles on sustainability topics
                    </p>
                    <Link href="/learn">
                      <Button className="w-full font-black">
                        EXPLORE ARTICLES →
                      </Button>
                    </Link>
                  </div>
                  <div className="p-6 rounded-lg bg-[var(--muted)]">
                    <Users className="w-8 h-8 text-theme-accent mb-3" />
                    <h4 className="font-black text-lg mb-2 text-[var(--foreground)]">Join the Community</h4>
                    <p className="text-sm font-medium text-theme-muted mb-4">
                      Connect with others on the same journey and share experiences
                    </p>
                    <Link href="/community">
                      <Button variant="outline" className="w-full font-black border-2">
                        JOIN COMMUNITY →
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-black" style={{
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              START YOUR JOURNEY TODAY
            </h2>
            <p className="text-xl font-semibold text-theme-muted">
              Small steps lead to big changes. Begin with one action today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/products">
                <Button size="lg" className="text-lg px-10 py-6 font-black shadow-xl">
                  SHOP SUSTAINABLE PRODUCTS
                </Button>
              </Link>
              <Link href="/community">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 font-black border-2">
                  CONNECT WITH OTHERS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
