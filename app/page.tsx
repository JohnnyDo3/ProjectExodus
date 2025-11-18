import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Immersive and Alive */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 bg-moss-300 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-ocean-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-terra-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-moss-100 text-moss-800 font-medium text-sm">
                <span className="w-2 h-2 bg-moss-500 rounded-full pulse-alive" />
                Building a Sustainable Future
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight" style={{ color: '#000' }}>
              Welcome to{' '}
              <span style={{
                background: 'linear-gradient(135deg, #36763d 0%, #357777 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block'
              }}>
                Project Exodus
              </span>
            </h1>

            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium" style={{ color: '#222' }}>
              Your gateway to discovering, learning about, and accessing sustainable alternatives
              across all aspects of life. From renewable energy to eco-friendly materials,
              we're building the world's most accessible sustainability hub.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" className="min-w-[200px]">
                Explore Products
              </Button>
              <Button size="lg" variant="outline" className="min-w-[200px]">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Organic wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0,32 C240,96 480,0 720,32 C960,64 1200,0 1440,32 L1440,120 L0,120 Z" fill="var(--sand-50)" />
          </svg>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-32 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold" style={{
              background: 'linear-gradient(135deg, #36763d 0%, #2e6161 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Our Mission
            </h2>
            <p className="text-lg font-medium" style={{ color: '#1a1a1a' }}>
              Making sustainability accessible, understandable, and actionable for everyone.
              One product, one article, one community at a time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="card-gradient text-center">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-moss-100 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-moss-500" />
                </div>
                <CardTitle style={{ color: '#36763d' }}>Discover</CardTitle>
                <CardDescription style={{ color: '#333' }}>
                  Explore sustainable products across every category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium" style={{ color: '#444' }}>
                  From solar panels to organic clothing, find alternatives that align with your values
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient text-center">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ocean-100 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-ocean-500" />
                </div>
                <CardTitle style={{ color: '#357777' }}>Learn</CardTitle>
                <CardDescription style={{ color: '#333' }}>
                  Deep-dive into sustainability topics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium" style={{ color: '#444' }}>
                  Educational content that empowers you to make informed decisions
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient text-center">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-terra-100 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-terra-500" />
                </div>
                <CardTitle style={{ color: '#c24f31' }}>Connect</CardTitle>
                <CardDescription style={{ color: '#333' }}>
                  Join a community of changemakers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium" style={{ color: '#444' }}>
                  Share knowledge, collaborate on projects, and grow together
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '10+', label: 'Product Categories' },
              { value: '∞', label: 'Sustainability Impact' },
              { value: '100%', label: 'Earth-First' },
              { value: '🌱', label: 'Living Platform' },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold" style={{
                  background: 'linear-gradient(135deg, #36763d 0%, #357777 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {stat.value}
                </div>
                <div className="text-sm font-semibold" style={{ color: '#222' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 hero-gradient relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#000' }}>
              Ready to Start Your Sustainable Journey?
            </h2>
            <p className="text-lg font-medium" style={{ color: '#222' }}>
              Join us in building a better future for our planet. Every choice matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="min-w-[200px]">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="min-w-[200px]">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-earth-900 text-sand-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Project Exodus</h3>
            <p className="text-sand-300 max-w-md mx-auto">
              Building the world's most accessible sustainability hub. One step at a time.
            </p>
            <div className="pt-4 text-sm text-sand-400">
              Made with 🌱 by Sage • 2025
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
