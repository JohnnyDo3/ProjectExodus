import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section - BOLD & EXPERIMENTAL */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--muted)] via-[color-mix(in_srgb,var(--primary)_20%,var(--background))] to-[color-mix(in_srgb,var(--accent)_20%,var(--background))]">
        {/* Morphing Background Blobs - 3D Effect */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-[var(--primary)] rounded-full blur-3xl opacity-30 animate-pulse"
               style={{ transform: 'translateZ(0) scale(1.2)', animationDuration: '8s' }} />
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-[var(--accent)] rounded-full blur-3xl opacity-30 animate-pulse"
               style={{ transform: 'translateZ(0) scale(1.3)', animationDelay: '2s', animationDuration: '10s' }} />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[var(--secondary)] rounded-full blur-3xl opacity-20 animate-pulse"
               style={{ transform: 'translateZ(0)', animationDelay: '4s', animationDuration: '12s' }} />
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-6xl mx-auto">
            {/* Badge - Floating */}
            <div className="flex justify-center mb-8 animate-bounce" style={{ animationDuration: '3s' }}>
              <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border-2 border-theme-primary text-theme-primary font-bold text-base backdrop-blur-xl">
                <span className="w-3 h-3 bg-theme-primary rounded-full animate-ping" />
                <span className="w-3 h-3 bg-theme-primary rounded-full absolute pulse-alive" />
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
              <div className="text-[var(--foreground)]" style={{ marginBottom: '0.2em' }}>
                WELCOME TO
              </div>
              <div style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 50%, var(--secondary) 100%)',
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
            <p className="text-center max-w-4xl mx-auto mb-12 text-[var(--foreground)]" style={{
              fontSize: 'clamp(1.25rem, 3vw, 2rem)',
              fontWeight: 600,
              lineHeight: 1.4
            }}>
              Building sustainable infrastructure for <span style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800
              }}>Food</span>, <span style={{
                background: 'linear-gradient(135deg, var(--accent), var(--secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800
              }}>Water</span>, and <span style={{
                background: 'linear-gradient(135deg, var(--secondary), var(--primary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800
              }}>Energy</span>
            </p>

            {/* CTA Buttons - Large & Prominent */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/products">
                <Button size="lg" className="text-xl px-12 py-8 rounded-2xl shadow-theme-2xl hover:scale-110 transition-transform duration-300" style={{
                  minWidth: '250px'
                }}>
                  Explore Now →
                </Button>
              </Link>
              <Link href="/learn">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 rounded-2xl border-4 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-300" style={{
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
          <div className="w-6 h-10 border-4 border-[var(--foreground)] rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-[var(--foreground)] rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Mission Section - Asymmetric Layout */}
      <section className="py-32 bg-[var(--background)] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, var(--primary) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Section Title - Offset */}
            <div className="mb-20">
              <div className="inline-block transform -rotate-2 bg-theme-primary text-[var(--primary-foreground)] px-8 py-4 rounded-2xl mb-6">
                <span className="text-sm font-bold tracking-wider">OUR MISSION</span>
              </div>
              <h2 className="text-[var(--foreground)]" style={{
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
                <div className="relative p-10 rounded-3xl bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_20%,var(--background))] to-[color-mix(in_srgb,var(--primary)_30%,var(--background))] border-4 border-theme-primary hover:shadow-theme-2xl transition-shadow duration-300">
                  <div className="w-20 h-20 mb-6 rounded-full bg-theme-primary flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <div className="w-10 h-10 rounded-full bg-[var(--background)]" />
                  </div>
                  <h3 className="text-3xl font-black mb-4 text-theme-primary">
                    DISCOVER
                  </h3>
                  <p className="text-lg font-medium text-[var(--foreground)]">
                    Thousands of sustainable products across every category imaginable
                  </p>
                </div>
              </div>

              {/* Learn Card */}
              <div className="group perspective transform hover:scale-105 transition-all duration-500" style={{ transform: 'rotate(1deg)' }}>
                <div className="relative p-10 rounded-3xl bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_20%,var(--background))] to-[color-mix(in_srgb,var(--accent)_30%,var(--background))] border-4 border-theme-accent hover:shadow-theme-2xl transition-shadow duration-300">
                  <div className="w-20 h-20 mb-6 rounded-full bg-theme-accent flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <div className="w-10 h-10 rounded-full bg-[var(--background)]" />
                  </div>
                  <h3 className="text-3xl font-black mb-4 text-theme-accent">
                    LEARN
                  </h3>
                  <p className="text-lg font-medium text-[var(--foreground)]">
                    Deep-dive educational content that empowers informed decisions
                  </p>
                </div>
              </div>

              {/* Connect Card */}
              <div className="group perspective transform hover:scale-105 transition-all duration-500" style={{ transform: 'rotate(-1deg)' }}>
                <div className="relative p-10 rounded-3xl bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_30%,var(--background))] border-4 border-theme-secondary hover:shadow-theme-2xl transition-shadow duration-300">
                  <div className="w-20 h-20 mb-6 rounded-full bg-theme-secondary flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <div className="w-10 h-10 rounded-full bg-[var(--background)]" />
                  </div>
                  <h3 className="text-3xl font-black mb-4 text-theme-secondary">
                    CONNECT
                  </h3>
                  <p className="text-lg font-medium text-[var(--foreground)]">
                    Join a vibrant community of changemakers building the future
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Bold Numbers */}
      <section className="py-56 bg-[var(--foreground)] text-[var(--background)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]" />
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
                  background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1rem'
                }}>
                  {stat.value}
                </div>
                <div className="text-xl font-black tracking-wider text-[var(--background)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Full Bleed */}
      <section className="py-56 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[var(--background)] rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[var(--background)] rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-[var(--primary-foreground)]" style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '2rem'
            }}>
              READY TO START YOUR SUSTAINABLE JOURNEY?
            </h2>
            <p className="text-2xl font-semibold mb-12 opacity-90 text-[var(--primary-foreground)]">
              Every choice matters. Every action counts. Join us today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center text-xl px-12 py-8 rounded-2xl border-4 border-[var(--primary-foreground)] bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 shadow-theme-2xl hover:scale-110 transition-all duration-300 font-black"
                style={{ minWidth: '250px' }}
              >
                GET STARTED →
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center text-xl px-12 py-8 rounded-2xl border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] transition-all duration-300 font-black"
                style={{ minWidth: '250px' }}
              >
                VIEW DEMO
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
