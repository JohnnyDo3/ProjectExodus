import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section - BOLD & EXPERIMENTAL */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sand-50 via-moss-50 to-ocean-50">
        {/* Morphing Background Blobs - 3D Effect */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-moss-400 rounded-full blur-3xl opacity-40 animate-pulse"
               style={{ transform: 'translateZ(0) scale(1.2)', animationDuration: '8s' }} />
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-ocean-400 rounded-full blur-3xl opacity-40 animate-pulse"
               style={{ transform: 'translateZ(0) scale(1.3)', animationDelay: '2s', animationDuration: '10s' }} />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-terra-300 rounded-full blur-3xl opacity-30 animate-pulse"
               style={{ transform: 'translateZ(0)', animationDelay: '4s', animationDuration: '12s' }} />
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-6xl mx-auto">
            {/* Badge - Floating */}
            <div className="flex justify-center mb-8 animate-bounce" style={{ animationDuration: '3s' }}>
              <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border-2 border-moss-300 text-moss-900 font-bold text-base backdrop-blur-xl">
                <span className="w-3 h-3 bg-moss-500 rounded-full animate-ping" />
                <span className="w-3 h-3 bg-moss-500 rounded-full absolute pulse-alive" />
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
              <div style={{ color: '#000', marginBottom: '0.2em' }}>
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
            <p className="text-center max-w-4xl mx-auto mb-12" style={{
              fontSize: 'clamp(1.25rem, 3vw, 2rem)',
              fontWeight: 600,
              color: '#1a1a1a',
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
          <div className="w-6 h-10 border-4 border-earth-900 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-earth-900 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Mission Section - Asymmetric Layout */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, #36763d 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Section Title - Offset */}
            <div className="mb-20">
              <div className="inline-block transform -rotate-2 bg-moss-500 text-white px-8 py-4 rounded-2xl mb-6">
                <span className="text-sm font-bold tracking-wider">OUR MISSION</span>
              </div>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                maxWidth: '800px',
                background: 'linear-gradient(135deg, #000 0%, #36763d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Building the FAMILY that loves sustainability as much as we do
              </h2>
            </div>

            {/* Cards - Tilted & 3D */}
            <div className="grid lg:grid-cols-3 gap-12 mb-20">
              {/* Discover Card */}
              <div className="group perspective transform hover:scale-105 transition-all duration-500" style={{ transform: 'rotate(-2deg)' }}>
                <div className="relative p-10 rounded-3xl bg-gradient-to-br from-moss-100 to-moss-200 border-4 border-moss-600 hover:shadow-2xl transition-shadow duration-300">
                  <div className="w-20 h-20 mb-6 rounded-full bg-moss-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <div className="w-10 h-10 rounded-full bg-white" />
                  </div>
                  <h3 className="text-3xl font-black mb-4" style={{ color: '#36763d' }}>
                    DISCOVER
                  </h3>
                  <p className="text-lg font-medium" style={{ color: '#1a1a1a' }}>
                    Thousands of sustainable products across every category imaginable
                  </p>
                </div>
              </div>

              {/* Learn Card */}
              <div className="group perspective transform hover:scale-105 transition-all duration-500" style={{ transform: 'rotate(1deg)' }}>
                <div className="relative p-10 rounded-3xl bg-gradient-to-br from-ocean-100 to-ocean-200 border-4 border-ocean-600 hover:shadow-2xl transition-shadow duration-300">
                  <div className="w-20 h-20 mb-6 rounded-full bg-ocean-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <div className="w-10 h-10 rounded-full bg-white" />
                  </div>
                  <h3 className="text-3xl font-black mb-4" style={{ color: '#357777' }}>
                    LEARN
                  </h3>
                  <p className="text-lg font-medium" style={{ color: '#1a1a1a' }}>
                    Deep-dive educational content that empowers informed decisions
                  </p>
                </div>
              </div>

              {/* Connect Card */}
              <div className="group perspective transform hover:scale-105 transition-all duration-500" style={{ transform: 'rotate(-1deg)' }}>
                <div className="relative p-10 rounded-3xl bg-gradient-to-br from-terra-100 to-terra-200 border-4 border-terra-600 hover:shadow-2xl transition-shadow duration-300">
                  <div className="w-20 h-20 mb-6 rounded-full bg-terra-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <div className="w-10 h-10 rounded-full bg-white" />
                  </div>
                  <h3 className="text-3xl font-black mb-4" style={{ color: '#c24f31' }}>
                    CONNECT
                  </h3>
                  <p className="text-lg font-medium" style={{ color: '#1a1a1a' }}>
                    Join a vibrant community of changemakers building the future
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Bold Numbers */}
      <section className="py-56 bg-earth-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-moss-500 to-ocean-500" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 max-w-6xl mx-auto">
            {[
              { value: '10K+', label: 'PRODUCTS' },
              { value: '∞', label: 'IMPACT' },
              { value: '100%', label: 'EARTH-FIRST' },
              { value: '🌱', label: 'LIVING' },
            ].map((stat, i) => (
              <div key={i} className="text-center transform hover:scale-110 transition-transform duration-300">
                <div style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  fontWeight: 900,
                  lineHeight: 1.2,
                  background: 'linear-gradient(135deg, #9ccba0, #91cdcd)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1rem'
                }}>
                  {stat.value}
                </div>
                <div className="text-xl font-black tracking-wider" style={{ color: '#fafaf9' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Full Bleed */}
      <section className="py-56 bg-gradient-to-br from-moss-500 via-ocean-500 to-terra-500 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '2rem'
            }}>
              READY TO START YOUR SUSTAINABLE JOURNEY?
            </h2>
            <p className="text-2xl font-semibold mb-12 opacity-90">
              Every choice matters. Every action counts. Join us today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="text-xl px-12 py-8 rounded-2xl bg-white text-earth-900 hover:bg-sand-100 shadow-2xl hover:scale-110 transition-all duration-300" style={{
                  minWidth: '250px',
                  fontWeight: 800
                }}>
                  GET STARTED →
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 rounded-2xl border-4 border-white text-white hover:bg-white hover:text-earth-900 transition-all duration-300" style={{
                  minWidth: '250px',
                  fontWeight: 800
                }}>
                  VIEW DEMO
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
