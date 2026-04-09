import Link from 'next/link'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Users, Heart, BookOpen, Award } from 'lucide-react'
import { FeatureShowcase } from '@/components/home/FeatureShowcase'

// Lazy-load heavy decorative components
const TreeBranches = dynamic(() => import('@/components/decorative/TreeBranches').then(mod => ({ default: mod.TreeBranches })))
const FlyingBirds = dynamic(() => import('@/components/decorative/FlyingBirds').then(mod => ({ default: mod.FlyingBirds })))
const CircularCarousel = dynamic(() => import('@/components/carousel/CircularCarousel').then(mod => ({ default: mod.CircularCarousel })))
const ProgressiveSkyline = dynamic(() => import('@/components/decorative/ProgressiveSkyline').then(mod => ({ default: mod.ProgressiveSkyline })))

export default function Home() {
  const commandments = [
    {
      number: 1,
      title: 'STEWARDSHIP',
      description: 'Guard, Protect, and Manage the Earth and her Natural Resources above all Profit.',
      iconName: 'Shield',
      color: '#36763d'
    },
    {
      number: 2,
      title: 'BIODIVERSITY',
      description: "Prioritize Diversification, Nurture Variety, not Uniform Yield, but allow Creation's Richness to Thrive.",
      iconName: 'Sprout',
      color: '#357777'
    },
    {
      number: 3,
      title: 'INTEGRITY',
      description: "Don't exploit sustainability, live it with integrity. Speak truthfully, align branding with practice and match words with proper action. Transparency ensures Accountability.",
      iconName: 'Heart',
      color: '#c24f31'
    },
    {
      number: 4,
      title: 'REST',
      description: 'Honor the rhythm of rest. The Land, Workers, and Community need time to recover. Operational models restore land, labor, and community capacity. Renewal brings Abundance.',
      iconName: 'Leaf',
      color: '#36763d'
    },
    {
      number: 5,
      title: 'LEGACY',
      description: 'Keep traditions that promote Life while innovating to nourish the lives of tomorrow.',
      iconName: 'BookOpen',
      color: '#357777'
    },
    {
      number: 6,
      title: 'SANCTITY',
      description: 'Protect and Promote human life, economic life, and ecological life. Do not destroy through waste, greed, and neglect. Every seed, every being, matters.',
      iconName: 'Shield',
      color: '#c24f31'
    },
    {
      number: 7,
      title: 'LOYALTY',
      description: 'Stand Loyal with the covenant of community. Do not exploit, betray, or abandon those who labor and live beside you.',
      iconName: 'Handshake',
      color: '#36763d'
    },
    {
      number: 8,
      title: 'EQUITY',
      description: 'Everyone gets their fair share in Justice. Avoid over-extraction and prioritize long-term balance over short-term gain. Do not steal from the Soil, the Worker, or Future Generations.',
      iconName: 'Scale',
      color: '#357777'
    },
    {
      number: 9,
      title: 'TRANSPARENCY',
      description: 'Maintain a Transparent practice in reporting and operations. Be honest and tell the truth, never lie. Integrity is the Harvest of Truth.',
      iconName: 'Eye',
      color: '#c24f31'
    },
    {
      number: 10,
      title: 'SUSTAINABILITY',
      description: 'Embrace and focus on sufficiency, resilience, abundance, and shared prosperity. Reject growth for growth\'s sake.',
      iconName: 'Award',
      color: '#36763d'
    }
  ]

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Decorative Elements - loaded after main content */}
      <Suspense fallback={null}>
        <TreeBranches />
      </Suspense>
      <Suspense fallback={null}>
        <FlyingBirds />
      </Suspense>

      {/* Hero Section - BOLD & EXPERIMENTAL */}
      <section className="relative min-h-[60vh] h-[85vh] md:h-[85vh] flex items-start justify-center overflow-hidden pt-5">
        {/* Daytime: Sun Ray Gradient Background - Subtle with slight prominence */}
        <div className="absolute inset-0 z-0 day-only" style={{
          background: `
            radial-gradient(ellipse 150% 120% at 50% -30%,
              rgba(255, 245, 150, 0.4) 0%,
              rgba(255, 235, 120, 0.35) 15%,
              rgba(135, 206, 250, 0.28) 40%,
              rgba(135, 206, 250, 0.4) 70%,
              rgba(176, 224, 230, 0.28) 85%,
              rgba(255, 255, 255, 0.15) 100%
            ),
            linear-gradient(180deg,
              rgba(255, 252, 240, 0.5) 0%,
              rgba(135, 206, 250, 0.45) 50%,
              rgba(100, 149, 237, 0.35) 100%
            )
          `
        }}>
          {/* Prominent sun rays - 3x wider */}
          <div className="absolute inset-0" style={{
            background: `
              repeating-conic-gradient(
                from 0deg at 50% -60%,
                transparent 0deg,
                rgba(255, 255, 255, 0.15) 3deg,
                rgba(255, 250, 200, 0.12) 4.5deg,
                transparent 6deg,
                transparent 24deg
              )
            `,
            opacity: 0.75,
            mixBlendMode: 'soft-light'
          }} />

          {/* Wispy clouds */}
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse 60% 30% at 20% 40%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 250, 240, 0.15) 30%, transparent 60%),
              radial-gradient(ellipse 50% 25% at 80% 30%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 248, 230, 0.12) 30%, transparent 60%),
              radial-gradient(ellipse 70% 35% at 60% 70%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 245, 220, 0.09) 30%, transparent 60%)
            `
          }} />
        </div>

        {/* Subtle Background Blobs - Static (no animation for performance) */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-[var(--primary)] rounded-full blur-3xl opacity-30"
               style={{ transform: 'translateZ(0) scale(1.2)' }} />
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-[var(--accent)] rounded-full blur-3xl opacity-30"
               style={{ transform: 'translateZ(0) scale(1.3)' }} />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[var(--secondary)] rounded-full blur-3xl opacity-20"
               style={{ transform: 'translateZ(0)' }} />
        </div>

        {/* Main Hero Content - pointer-events-none allows constellation hover through text */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4 pointer-events-none">
          <div className="max-w-6xl mx-auto">
            {/* Massive Hero Title - Ultra Bold - Fits Above Fold */}
            <h1 className="text-center mb-4 md:mb-6" style={{
              fontSize: 'clamp(1.75rem, 6vw, 5rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.02em'
            }}>
              <div className="text-[var(--foreground)]" style={{ marginBottom: '0.2em' }}>
                WELCOME TO
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #36763d 0%, #357777 50%, #c24f31 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 40px rgba(54, 118, 61, 0.3)',
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))'
              }}>
                PROJECT EXODUS
              </div>
            </h1>

            {/* Subtitle - Large & Bold */}
            <p className="text-center max-w-4xl mx-auto mb-6 md:mb-8 text-[var(--foreground)]" style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.5rem)',
              fontWeight: 600,
              lineHeight: 1.3
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
          </div>
        </div>

        {/* Progressive Skyline - Fixed to bottom of hero page */}
        <Suspense fallback={null}>
          <ProgressiveSkyline />
        </Suspense>
      </section>

      {/* Feature Showcase - Platform Overview */}
      <FeatureShowcase />

      {/* Mission Statement */}
      <section className="py-32 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black mb-8 text-[var(--foreground)]">OUR MISSION</h2>
            </div>
            <Card className="border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--accent)_15%,var(--background))] shadow-theme-2xl">
              <CardContent className="p-12">
                <div className="flex items-center justify-center mb-8">
                  <Heart className="w-20 h-20 text-theme-primary" />
                </div>
                <p className="text-2xl font-bold leading-relaxed text-center text-[var(--foreground)]">
                  It is our <span style={{
                    background: 'linear-gradient(135deg, #36763d, #357777)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 900
                  }}>duty, destiny, and responsibility</span>, to ensure that those of you who choose to be a part of our family and make it yours, that{' '}
                  <span className="font-black text-theme-primary">You will love it the same way if not more than me and the team here at Project Exodus.</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Commandments of Sustainable Agriculture */}
      <section className="py-4 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-2">
              <h2 className="text-3xl md:text-4xl font-black mb-1 text-[var(--primary-foreground)]">THE COMMANDMENTS</h2>
              <p className="text-lg md:text-xl font-bold text-[var(--primary-foreground)]">OF SUSTAINABLE AGRICULTURE</p>
            </div>

            <Suspense fallback={<div className="h-96" />}>
              <CircularCarousel items={commandments} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Team Structure */}
      <section className="py-32 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-black mb-6 text-[var(--foreground)]">OUR TEAM STRUCTURE</h2>
              <p className="text-xl font-semibold text-theme-muted">
                Building the future together through collaborative leadership
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--primary)_25%,var(--background))] shadow-theme-xl">
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_srgb,var(--primary)_80%,black)] flex items-center justify-center shadow-theme-xl">
                      <Users className="w-10 h-10 text-[var(--primary-foreground)]" />
                    </div>
                    <h3 className="text-2xl font-black text-theme-primary">ROUND TABLE</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-base font-bold text-theme-muted">
                    Our Senate - Collaborative prosumer decision-making body guiding strategic direction
                  </p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--accent)_25%,var(--background))] shadow-theme-xl">
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_80%,black)] flex items-center justify-center shadow-theme-xl">
                      <BookOpen className="w-10 h-10 text-[var(--primary-foreground)]" />
                    </div>
                    <h3 className="text-2xl font-black text-theme-accent">ITJ COMMITTEE</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-base font-bold text-theme-muted">
                    Innovation, Technology & Justice - Driving our technical and ethical initiatives
                  </p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_25%,var(--background))] shadow-theme-xl">
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[color-mix(in_srgb,var(--secondary)_80%,black)] flex items-center justify-center shadow-theme-xl">
                      <Award className="w-10 h-10 text-[var(--primary-foreground)]" />
                    </div>
                    <h3 className="text-2xl font-black text-theme-secondary">BIZ OP</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-base font-bold text-theme-muted">
                    Business Operations - Managing partnerships, growth, and sustainability
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Business Philosophy */}
      <section className="scroll-mt-24 py-32 bg-gradient-to-b from-[var(--background)] to-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Sacred divider */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />
              <span className="text-2xl text-[var(--primary)]">☥</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[var(--primary)] to-transparent" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-center mb-8 text-[var(--foreground)]">OUR PHILOSOPHY</h2>

            {/* Decorative framed content */}
            <div className="relative">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--primary)]/30" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--primary)]/30" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--primary)]/30" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--primary)]/30" />

              <div className="px-8 py-12 text-center space-y-6">
                {/* Core message */}
                <p className="text-xl sm:text-2xl font-serif italic text-[var(--foreground)] leading-relaxed">
                  "Every action we take today becomes the foundation for tomorrow."
                </p>

                {/* The seed metaphor */}
                <p className="text-lg text-[var(--muted-foreground)] leading-relaxed max-w-2xl mx-auto">
                  When you <span className="font-bold text-[var(--foreground)]" style={{
                    background: 'linear-gradient(135deg, #36763d, #357777)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 900
                  }}>plant a seed</span>, it grows into a tree.
                  Everyone who encounters that tree interacts with it differently.
                </p>

                <p className="text-lg text-[var(--muted-foreground)] leading-relaxed max-w-2xl mx-auto">
                  Some find shade. Others find fruit. Some find shelter.
                  But the tree stands as a testament to <span className="font-bold text-[var(--foreground)]">the seed that was planted with intention</span>.
                </p>

                {/* The Covenant */}
                <div className="pt-6 space-y-4">
                  <h3 className="text-lg font-black text-[var(--primary)] uppercase tracking-wider">
                    Our Covenant
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                    <div className="p-4 bg-[var(--card)] rounded-xl border border-[var(--border)]">
                      <p className="font-bold text-[var(--foreground)] mb-1">We Build With:</p>
                      <ul className="text-sm text-[var(--muted-foreground)] space-y-1">
                        <li>• Purpose in every innovation</li>
                        <li>• Care in every partnership</li>
                        <li>• Intention in every decision</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-[var(--card)] rounded-xl border border-[var(--border)]">
                      <p className="font-bold text-[var(--foreground)] mb-1">We Share With:</p>
                      <ul className="text-sm text-[var(--muted-foreground)] space-y-1">
                        <li>• Transparency in every action</li>
                        <li>• Generosity in every harvest</li>
                        <li>• Vision for every tomorrow</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Final statement */}
                <p className="text-base text-[var(--muted-foreground)] italic pt-4">
                  Planted with purpose, grown with care, shared with all.
                </p>

                {/* Attribution */}
                <p className="text-xs text-[var(--muted-foreground)]/60 tracking-widest uppercase pt-4">
                  — The Project Exodus Vision
                </p>
              </div>
            </div>

            {/* Sacred divider */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />
              <span className="text-2xl text-[var(--primary)]">✦</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[var(--primary)] to-transparent" />
            </div>
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
