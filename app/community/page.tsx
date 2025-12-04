import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MessageSquare, Users, Award, Rocket, Sparkles, Heart } from 'lucide-react'
import Link from 'next/link'

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-32 bg-gradient-to-br from-terra-50 via-ocean-50 to-moss-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <h1 style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 900,
              lineHeight: 1,
              color: '#000'
            }}>
              JOIN THE COMMUNITY
            </h1>
            <p className="text-2xl font-bold" style={{ color: '#222' }}>
              Connect with <span style={{
                background: 'linear-gradient(135deg, #36763d, #357777)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>thousands</span> of changemakers building a sustainable future
            </p>
            <Button size="lg" className="text-xl px-12 py-8 rounded-2xl shadow-2xl font-black">
              CREATE YOUR PROFILE →
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black" style={{ color: '#000' }}>WHAT'S INSIDE</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {[
              { icon: MessageSquare, title: 'ROUND TABLE', desc: 'Deep conversations on sustainability topics', color: 'moss' },
              { icon: Users, title: 'USER PROFILES', desc: 'Track your journey and build your reputation', color: 'ocean' },
              { icon: Award, title: 'ACHIEVEMENTS', desc: 'Earn badges for your contributions', color: 'terra' },
              { icon: Rocket, title: 'PROJECTS', desc: 'Collaborate on local initiatives', color: 'moss' },
              { icon: Sparkles, title: 'KNOWLEDGE SHARING', desc: 'Learn from experts and peers', color: 'ocean' },
              { icon: Heart, title: 'SUPPORT NETWORK', desc: 'Find your sustainability tribe', color: 'terra' }
            ].map((feature, i) => (
              <Card key={i} className="hover-lift border-4 transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-10 text-center">
                  <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-${feature.color}-100 flex items-center justify-center`}>
                    <feature.icon className={`w-12 h-12 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-black mb-4" style={{ color: '#000' }}>
                    {feature.title}
                  </h3>
                  <p className="text-lg font-medium" style={{ color: '#444' }}>
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 bg-gradient-to-br from-moss-500 to-ocean-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4">GROWING TOGETHER</h2>
              <p className="text-xl font-semibold opacity-90">
                Our community is just getting started
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {[
                { value: '1K+', label: 'MEMBERS' },
                { value: '500+', label: 'CONVERSATIONS' },
                { value: '50+', label: 'PROJECTS' },
                { value: '∞', label: 'IMPACT' }
              ].map((stat, i) => (
                <div key={i} className="text-center transform hover:scale-110 transition-transform">
                  <div className="text-6xl font-black mb-2">{stat.value}</div>
                  <div className="text-lg font-bold tracking-wider opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Explore Features */}
      <section className="py-32 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4" style={{ color: '#000' }}>
                EXPLORE THE COMMUNITY
              </h2>
              <p className="text-xl font-semibold" style={{ color: '#333' }}>
                Jump into conversations, join projects, and connect with fellow changemakers
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Forum Card */}
              <Card className="border-4 border-moss-300 hover-lift hover:border-moss-500 transition-all">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-moss-100 flex items-center justify-center">
                      <MessageSquare className="w-8 h-8 text-moss-600" />
                    </div>
                    <h3 className="text-3xl font-black" style={{ color: '#000' }}>
                      ROUND TABLE
                    </h3>
                  </div>
                  <p className="text-lg font-semibold mb-8" style={{ color: '#1f2937' }}>
                    Join conversations about sustainability tips, product topics, and community projects.
                    Share your knowledge and learn from others.
                  </p>
                  <Link href="/community/forum">
                    <Button size="lg" className="text-lg px-8 py-6 font-black w-full">
                      JOIN THE ROUND TABLE →
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Projects Card */}
              <Card className="border-4 border-ocean-300 hover-lift hover:border-ocean-500 transition-all">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-ocean-100 flex items-center justify-center">
                      <Rocket className="w-8 h-8 text-ocean-600" />
                    </div>
                    <h3 className="text-3xl font-black" style={{ color: '#000' }}>
                      COMMUNITY PROJECTS
                    </h3>
                  </div>
                  <p className="text-lg font-semibold mb-8" style={{ color: '#1f2937' }}>
                    Collaborate on local sustainability initiatives. From community solar to zero-waste restaurants,
                    make real impact together.
                  </p>
                  <Link href="/community/projects">
                    <Button size="lg" className="text-lg px-8 py-6 font-black w-full">
                      VIEW PROJECTS →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-6xl font-black" style={{
              background: 'linear-gradient(135deg, #36763d, #357777)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              READY TO CONNECT?
            </h2>
            <p className="text-2xl font-semibold" style={{ color: '#333' }}>
              Start your sustainability journey with like-minded people today
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-xl px-12 py-8 rounded-2xl font-black shadow-2xl">
                GET STARTED
              </Button>
              <Link href="/products">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 rounded-2xl font-black border-4">
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
