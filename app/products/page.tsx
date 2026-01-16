import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Package, Rocket, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      {/* Under Construction Hero */}
      <section className="py-32 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_20%,var(--background))] via-[color-mix(in_srgb,var(--accent)_20%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--card)] border-2 border-theme-accent rounded-full mb-4">
              <Rocket className="w-5 h-5 text-theme-accent" />
              <span className="text-sm font-black text-[var(--foreground)]">UNDER CONSTRUCTION</span>
            </div>

            <h1 className="text-[var(--foreground)]" style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 900,
              lineHeight: 1.1
            }}>
              SUSTAINABLE MARKETPLACE
            </h1>

            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-xl md:text-2xl lg:text-3xl font-black text-theme-muted">
                We're Building Something <span style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 900
                }}>Amazing</span>
              </p>

              <p className="text-lg md:text-xl font-semibold text-theme-muted">
                Our marketplace is currently under development as we curate the best sustainable products for you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Coming */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-[var(--foreground)]">
              WHAT'S COMING
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--background))] to-[var(--background)]">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-[var(--primary-foreground)]" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-theme-primary">
                      Curated Affiliate Products
                    </h3>
                  </div>
                  <p className="text-lg font-semibold text-[var(--foreground)] leading-relaxed">
                    We're partnering with trusted sustainable brands to bring you the best eco-friendly products. Every item will be vetted for sustainability, quality, and real environmental impact.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <div className="px-4 py-2 bg-[var(--card)] border-2 border-theme-primary rounded-full">
                      <span className="text-sm font-bold text-[var(--foreground)]">✓ Vetted Brands</span>
                    </div>
                    <div className="px-4 py-2 bg-[var(--card)] border-2 border-theme-primary rounded-full">
                      <span className="text-sm font-bold text-[var(--foreground)]">✓ Impact Data</span>
                    </div>
                    <div className="px-4 py-2 bg-[var(--card)] border-2 border-theme-primary rounded-full">
                      <span className="text-sm font-bold text-[var(--foreground)]">✓ Honest Reviews</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_10%,var(--background))] to-[var(--background)]">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center">
                      <Package className="w-8 h-8 text-[var(--primary-foreground)]" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-theme-accent">
                      Our Own Product Line
                    </h3>
                  </div>
                  <p className="text-lg font-semibold text-[var(--foreground)] leading-relaxed">
                    We're developing our own line of sustainable products designed with transparency, durability, and environmental impact at the core. From concept to delivery, every step will be optimized for sustainability.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <div className="px-4 py-2 bg-[var(--card)] border-2 border-theme-accent rounded-full">
                      <span className="text-sm font-bold text-[var(--foreground)]">✓ Carbon Neutral</span>
                    </div>
                    <div className="px-4 py-2 bg-[var(--card)] border-2 border-theme-accent rounded-full">
                      <span className="text-sm font-bold text-[var(--foreground)]">✓ Full Transparency</span>
                    </div>
                    <div className="px-4 py-2 bg-[var(--card)] border-2 border-theme-accent rounded-full">
                      <span className="text-sm font-bold text-[var(--foreground)]">✓ Built to Last</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Sparkles className="w-16 h-16 text-theme-primary mx-auto mb-4" />
              <h2 className="text-4xl font-black text-[var(--foreground)] mb-4">
                STAY TUNED
              </h2>
              <p className="text-xl font-semibold text-theme-muted">
                We're working hard to launch soon. In the meantime, explore our learning resources to discover sustainable living practices.
              </p>
            </div>

            <Card className="border-4 border-theme-secondary">
              <CardContent className="p-8 text-center">
                <p className="text-lg font-bold text-[var(--foreground)] mb-6">
                  Want to be notified when we launch?
                </p>
                <Link href="/contact">
                  <Button size="lg" className="text-xl px-12 py-6 font-black rounded-xl">
                    Get Launch Updates
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black">
              EXPLORE WHILE YOU WAIT
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold">
              Discover sustainable living practices and connect with our community
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/learn">
                <Button size="lg" className="text-xl px-12 py-8 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-2xl rounded-2xl">
                  EXPLORE LEARNING
                </Button>
              </Link>
              <Link href="/community">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black rounded-2xl">
                  JOIN COMMUNITY
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
