import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Leaf, Droplet, Zap, Users, Heart, Shield, Sprout, BookOpen, Scale, Eye, Handshake, Award } from 'lucide-react'

export default function AboutPage() {
  const commandments = [
    {
      number: 1,
      title: 'STEWARDSHIP',
      description: 'Guard, Protect, and Manage the Earth',
      icon: Shield,
      color: '#36763d'
    },
    {
      number: 2,
      title: 'BIODIVERSITY',
      description: 'Prioritize Diversification',
      icon: Sprout,
      color: '#357777'
    },
    {
      number: 3,
      title: 'INTEGRITY',
      description: "Don't exploit sustainability, live it",
      icon: Heart,
      color: '#c24f31'
    },
    {
      number: 4,
      title: 'REST',
      description: 'Honor the rhythm of rest',
      icon: Leaf,
      color: '#36763d'
    },
    {
      number: 5,
      title: 'LEGACY',
      description: 'Keep traditions while innovating',
      icon: BookOpen,
      color: '#357777'
    },
    {
      number: 6,
      title: 'SANCTITY',
      description: 'Protect human, economic, ecological life',
      icon: Shield,
      color: '#c24f31'
    },
    {
      number: 7,
      title: 'LOYALTY',
      description: 'Stand with community',
      icon: Handshake,
      color: '#36763d'
    },
    {
      number: 8,
      title: 'EQUITY',
      description: 'Fair share in Justice',
      icon: Scale,
      color: '#357777'
    },
    {
      number: 9,
      title: 'TRANSPARENCY',
      description: 'Maintain honest reporting',
      icon: Eye,
      color: '#c24f31'
    },
    {
      number: 10,
      title: 'SUSTAINABILITY',
      description: 'Embrace sufficiency and resilience',
      icon: Award,
      color: '#36763d'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero - Company Description */}
      <section className="py-32 bg-gradient-to-br from-moss-50 via-ocean-50 to-sand-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <h1 style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 900,
              lineHeight: 1,
              color: '#000'
            }}>
              PROJECT EXODUS
            </h1>
            <p className="text-3xl font-black leading-relaxed" style={{ color: '#222' }}>
              WE ARE DEVELOPING{' '}
              <span style={{
                background: 'linear-gradient(135deg, #36763d, #357777)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>SUSTAINABLE INNOVATIONS</span>{' '}
              TO IMPLEMENT AS NEW ENVIRONMENTAL INFRASTRUCTURE
            </p>

            {/* Food, Water, Energy Icons */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-8">
              <Card className="border-4 border-moss-300 bg-gradient-to-br from-moss-50 to-moss-100 shadow-xl">
                <CardContent className="p-8 text-center">
                  <Leaf className="w-16 h-16 text-moss-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-black" style={{ color: '#36763d' }}>FOOD</h3>
                  <p className="mt-3 text-base font-bold" style={{ color: '#444' }}>
                    Sustainable agriculture and food systems
                  </p>
                </CardContent>
              </Card>
              <Card className="border-4 border-ocean-300 bg-gradient-to-br from-ocean-50 to-ocean-100 shadow-xl">
                <CardContent className="p-8 text-center">
                  <Droplet className="w-16 h-16 text-ocean-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-black" style={{ color: '#357777' }}>WATER</h3>
                  <p className="mt-3 text-base font-bold" style={{ color: '#444' }}>
                    Clean water access and conservation
                  </p>
                </CardContent>
              </Card>
              <Card className="border-4 border-terra-300 bg-gradient-to-br from-terra-50 to-terra-100 shadow-xl">
                <CardContent className="p-8 text-center">
                  <Zap className="w-16 h-16 text-terra-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-black" style={{ color: '#c24f31' }}>ENERGY</h3>
                  <p className="mt-3 text-base font-bold" style={{ color: '#444' }}>
                    Renewable energy solutions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-6xl font-black mb-8" style={{ color: '#000' }}>OUR MISSION</h2>
            </div>
            <Card className="border-4 border-moss-300 bg-gradient-to-br from-moss-50 to-ocean-50 shadow-2xl">
              <CardContent className="p-12">
                <div className="flex items-center justify-center mb-8">
                  <Heart className="w-20 h-20 text-moss-600" />
                </div>
                <p className="text-2xl font-bold leading-relaxed text-center" style={{ color: '#222' }}>
                  It is our <span style={{
                    background: 'linear-gradient(135deg, #36763d, #357777)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 900
                  }}>duty, destiny, and responsibility</span>, to ensure that those of you who choose to be a part of our family and make it yours, that{' '}
                  <span className="font-black" style={{ color: '#36763d' }}>You will love it the same way if not more than me and the team here at Project Exodus.</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Commandments of Sustainable Agriculture */}
      <section className="py-32 bg-gradient-to-br from-moss-500 via-ocean-500 to-terra-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-7xl font-black mb-8">THE COMMANDMENTS</h2>
              <p className="text-3xl font-bold">OF SUSTAINABLE AGRICULTURE</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {commandments.map((commandment) => (
                <Card
                  key={commandment.number}
                  className="border-4 border-white bg-white/95 shadow-2xl transform hover:scale-105 transition-all"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div
                        className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-xl"
                        style={{
                          background: `linear-gradient(135deg, ${commandment.color}, ${commandment.color}dd)`
                        }}
                      >
                        {commandment.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-black mb-3" style={{ color: commandment.color }}>
                          {commandment.title}
                        </h3>
                        <p className="text-lg font-bold" style={{ color: '#333' }}>
                          {commandment.description}
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

      {/* Team Structure */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-6xl font-black mb-6" style={{ color: '#000' }}>OUR TEAM STRUCTURE</h2>
              <p className="text-xl font-semibold" style={{ color: '#333' }}>
                Building the future together through collaborative leadership
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-4 border-moss-300 bg-gradient-to-br from-moss-50 to-moss-100 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-moss-500 to-moss-600 flex items-center justify-center shadow-xl">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black" style={{ color: '#36763d' }}>ROUND TABLE</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-base font-bold" style={{ color: '#444' }}>
                    Our Senate - Collaborative decision-making body guiding strategic direction
                  </p>
                </CardContent>
              </Card>

              <Card className="border-4 border-ocean-300 bg-gradient-to-br from-ocean-50 to-ocean-100 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-ocean-500 to-ocean-600 flex items-center justify-center shadow-xl">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black" style={{ color: '#357777' }}>ITJ COMMITTEE</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-base font-bold" style={{ color: '#444' }}>
                    Innovation, Technology & Justice - Driving our technical and ethical initiatives
                  </p>
                </CardContent>
              </Card>

              <Card className="border-4 border-terra-300 bg-gradient-to-br from-terra-50 to-terra-100 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-terra-500 to-terra-600 flex items-center justify-center shadow-xl">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black" style={{ color: '#c24f31' }}>BIZ OP</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-base font-bold" style={{ color: '#444' }}>
                    Business Operations - Managing partnerships, growth, and sustainability
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Business Philosophy */}
      <section className="py-32 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-black mb-6" style={{ color: '#000' }}>OUR PHILOSOPHY</h2>
              <p className="text-xl font-semibold" style={{ color: '#333' }}>
                Every action we take today becomes the foundation for tomorrow
              </p>
            </div>

            <Card className="border-4 border-moss-300 shadow-2xl">
              <CardContent className="p-12">
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <Sprout className="w-16 h-16 text-moss-600 mx-auto" />
                  </div>
                  <blockquote className="text-xl font-bold leading-relaxed text-center space-y-6" style={{ color: '#222' }}>
                    <p>
                      When you <span style={{
                        background: 'linear-gradient(135deg, #36763d, #357777)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 900
                      }}>plant a seed</span>, it grows into a tree.
                    </p>
                    <p style={{ color: '#333' }}>
                      Everyone who encounters that tree interacts with it differently.
                    </p>
                    <p style={{ color: '#333' }}>
                      Some find shade. Others find fruit. Some find shelter.
                    </p>
                    <p className="font-black" style={{ color: '#36763d' }}>
                      But the tree stands as a testament to the seed that was planted with intention.
                    </p>
                  </blockquote>
                </div>
              </CardContent>
            </Card>

            <div className="mt-12 text-center">
              <p className="text-lg font-bold" style={{ color: '#444' }}>
                This is how we build at Project Exodus. Every innovation, every partnership, every decision—
                <span className="font-black" style={{ color: '#36763d' }}> planted with purpose, grown with care, shared with all.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-br from-moss-500 via-ocean-500 to-terra-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-6xl font-black">JOIN OUR FAMILY</h2>
            <p className="text-2xl font-semibold">
              Be part of the movement building sustainable infrastructure for Food, Water, and Energy
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="text-xl px-12 py-8 bg-white text-earth-900 hover:bg-sand-100 font-black shadow-2xl rounded-2xl">
                  GET STARTED
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 border-4 border-white text-white hover:bg-white hover:text-earth-900 font-black rounded-2xl">
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
