import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Heart, Target, Zap, Globe } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Earth-First',
      description: 'Every decision we make prioritizes planetary health and sustainability.'
    },
    {
      icon: Target,
      title: 'Accessible',
      description: 'Making sustainability knowledge and products available to everyone, everywhere.'
    },
    {
      icon: Zap,
      title: 'Action-Oriented',
      description: 'We believe in empowering people to take real, tangible action today.'
    },
    {
      icon: Globe,
      title: 'Community-Driven',
      description: 'Built by and for a global community of sustainability advocates.'
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              About{' '}
              <span className="earth-gradient-text">
                Project Exodus
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-earth-700">
              We're building the world's most accessible sustainability hub.
              A single destination where people can discover, learn about, and access
              sustainable alternatives across all aspects of life.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-earth-700 leading-relaxed mb-8">
              The climate crisis is here. But so is the solution. Every day, brilliant minds are
              creating sustainable alternatives to conventional products and practices. The problem?
              Most people don't know these alternatives exist, where to find them, or how to use them.
            </p>
            <p className="text-lg text-earth-700 leading-relaxed mb-8">
              Project Exodus bridges that gap. We're creating a comprehensive, accessible hub where
              anyone can discover sustainable products, learn about eco-friendly practices, and connect
              with a community of changemakers. From renewable energy systems to organic materials,
              from regenerative agriculture to circular fashion - if it's sustainable, it's here.
            </p>
            <p className="text-lg text-earth-700 leading-relaxed">
              This isn't just a website. It's a movement. It's a tool for transformation. It's your
              guide to living more sustainably, starting today.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <Card key={value.title} className="card-gradient">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-moss-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-moss-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-2">{value.title}</CardTitle>
                        <p className="text-earth-700">{value.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Built by Sage</h2>
            <p className="text-lg text-earth-700 leading-relaxed mb-8">
              Project Exodus is being crafted with care, creativity, and a deep commitment to
              our planet's future. This platform embodies an earthy, organic aesthetic that
              reflects the natural world we're working to protect.
            </p>
            <div className="bg-moss-50 border-2 border-moss-200 rounded-xl p-8">
              <p className="text-moss-900 font-medium mb-4">
                "Every choice matters. Every product has an impact. Every person can make a difference.
                This platform exists to make those choices easier, those impacts more positive, and
                that difference more accessible."
              </p>
              <p className="text-moss-700 text-sm">
                - Sage, Creator of Project Exodus 🌱
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-earth-700">
              Join us in building a more sustainable future. Start exploring, learning, and taking action today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Explore Products
              </Button>
              <Button size="lg" variant="outline">
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
