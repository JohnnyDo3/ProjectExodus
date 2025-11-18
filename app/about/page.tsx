import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Target, Heart, Users, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-32 bg-gradient-to-br from-moss-50 via-ocean-50 to-sand-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 900,
              lineHeight: 1,
              color: '#000'
            }}>
              ABOUT PROJECT EXODUS
            </h1>
            <p className="text-2xl font-semibold" style={{ color: '#222' }}>
              We're on a mission to make sustainability <span style={{
                background: 'linear-gradient(135deg, #36763d, #357777)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>accessible</span> to everyone
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-5xl font-black mb-6" style={{
                background: 'linear-gradient(135deg, #36763d, #2e6161)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                OUR STORY
              </h2>
              <p className="text-xl leading-relaxed" style={{ color: '#333' }}>
                Project Exodus was born from a simple observation: <strong>sustainable living shouldn't be complicated or expensive</strong>.
                We believe that everyone deserves access to products and knowledge that help protect our planet.
              </p>
            </div>
            <div className="prose prose-lg max-w-none" style={{ color: '#333' }}>
              <p className="text-lg leading-relaxed">
                In a world drowning in greenwashing and confusing eco-labels, we're building something different.
                A platform that cuts through the noise. A community that shares real experiences. A marketplace that
                connects you directly with verified sustainable brands.
              </p>
              <p className="text-lg leading-relaxed">
                We're not just another sustainability blog. We're a <strong>living platform</strong> that grows with
                contributions from experts, activists, and everyday people making conscious choices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black" style={{ color: '#000' }}>OUR VALUES</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              { icon: Target, title: 'TRANSPARENCY', desc: 'No greenwashing, no hidden agendas. Just honest information.', color: 'moss' },
              { icon: Heart, title: 'ACCESSIBILITY', desc: 'Sustainability for all, not just the wealthy.', color: 'ocean' },
              { icon: Users, title: 'COMMUNITY', desc: 'Built by people, for people, with real experiences.', color: 'terra' },
              { icon: Zap, title: 'ACTION', desc: 'Less talk, more doing. Every choice matters.', color: 'moss' }
            ].map((value, i) => (
              <Card key={i} className="hover-lift border-4">
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-${value.color}-100 flex items-center justify-center`}>
                    <value.icon className={`w-10 h-10 text-${value.color}-600`} />
                  </div>
                  <h3 className="text-xl font-black mb-3" style={{ color: '#000' }}>{value.title}</h3>
                  <p className="font-medium" style={{ color: '#444' }}>{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl font-black mb-6" style={{ color: '#000' }}>BUILT BY SAGE</h2>
            <p className="text-xl font-semibold mb-8" style={{ color: '#333' }}>
              A passionate developer and sustainability advocate creating tools that make eco-conscious living easier and more accessible.
            </p>
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-moss-500 to-ocean-500 flex items-center justify-center shadow-2xl">
              <span className="text-white text-5xl font-black">S</span>
            </div>
            <p className="text-lg leading-relaxed" style={{ color: '#555' }}>
              This platform started as a personal project to consolidate my own sustainable living research.
              Now it's growing into something bigger—a comprehensive hub where anyone can discover, learn, and take action.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-br from-moss-500 via-ocean-500 to-terra-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-6xl font-black">JOIN THE MOVEMENT</h2>
            <p className="text-2xl font-semibold">
              Be part of the community building a more sustainable future
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/community">
                <Button size="lg" className="text-xl px-12 py-8 bg-white text-earth-900 hover:bg-sand-100 font-black shadow-2xl">
                  JOIN COMMUNITY
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 border-4 border-white text-white hover:bg-white hover:text-earth-900 font-black">
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
