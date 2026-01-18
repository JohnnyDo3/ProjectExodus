import { Construction, Package, ShieldCheck, Store, Sparkles, Bell } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[color-mix(in_srgb,var(--primary)_5%,var(--background))] to-[var(--background)]">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Construction Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--primary)] blur-3xl opacity-20 rounded-full animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] p-8 rounded-3xl shadow-2xl">
                  <Construction className="w-24 h-24 text-[var(--primary-foreground)]" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1
                className="text-[var(--foreground)]"
                style={{
                  fontSize: 'clamp(2rem, 6vw, 5rem)',
                  fontWeight: 900,
                  lineHeight: 1.1
                }}
              >
                MARKETPLACE
                <br />
                <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] bg-clip-text text-transparent">
                  COMING SOON
                </span>
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl font-semibold text-[var(--muted-foreground)] max-w-3xl mx-auto">
                We're building something extraordinary for conscious consumers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Coming Section */}
      <section className="py-16 bg-[var(--card)]/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center text-[var(--foreground)] mb-12">
              What's Coming
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Affiliate Sustainable Products */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative bg-[var(--card)] border-2 border-[var(--border)] rounded-2xl p-8 hover:border-[var(--primary)]/50 transition-all duration-300 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 rounded-xl flex items-center justify-center mb-6">
                    <Package className="w-8 h-8 text-[var(--primary)]" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">
                    Affiliate Sustainable Products
                  </h3>
                  <p className="text-[var(--muted-foreground)] leading-relaxed">
                    Carefully curated eco-friendly products from trusted brands, vetted for authenticity and environmental impact
                  </p>
                </div>
              </div>

              {/* Exodus Approved Items */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative bg-[var(--card)] border-2 border-[var(--border)] rounded-2xl p-8 hover:border-[var(--accent)]/50 transition-all duration-300 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5 rounded-xl flex items-center justify-center mb-6">
                    <ShieldCheck className="w-8 h-8 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">
                    Exodus Approved Items
                  </h3>
                  <p className="text-[var(--muted-foreground)] leading-relaxed">
                    Products that meet our rigorous sustainability standards, complete with carbon impact data and transparency reports
                  </p>
                </div>
              </div>

              {/* Our Own Line */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative bg-[var(--card)] border-2 border-[var(--border)] rounded-2xl p-8 hover:border-[var(--secondary)]/50 transition-all duration-300 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--secondary)]/10 to-[var(--secondary)]/5 rounded-xl flex items-center justify-center mb-6">
                    <Store className="w-8 h-8 text-[var(--secondary)]" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">
                    Exodus Products & Partnerships
                  </h3>
                  <p className="text-[var(--muted-foreground)] leading-relaxed">
                    Our exclusive line of sustainable products, services, and strategic partnerships with changemakers worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[var(--primary)]/10 via-[var(--accent)]/10 to-[var(--secondary)]/10 rounded-3xl p-8 md:p-12 border border-[var(--border)]">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--card)] rounded-full border border-[var(--border)]">
                  <Sparkles className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-sm font-bold text-[var(--foreground)]">Expected Features</span>
                </div>

                <ul className="grid sm:grid-cols-2 gap-4 text-left">
                  {[
                    'Real-time sustainability scores',
                    'Carbon footprint tracking',
                    'Verified vendor profiles',
                    'Community reviews & ratings',
                    'Price comparison tools',
                    'Impact dashboard',
                    'Personalized recommendations',
                    'Exclusive member discounts'
                  ].map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-[var(--foreground)] font-medium"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--card)] rounded-full border-2 border-[var(--primary)] mb-4">
              <Bell className="w-5 h-5 text-[var(--primary)] animate-pulse" />
              <span className="font-bold text-[var(--foreground)]">Stay Updated</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--foreground)]">
              Be the First to Know
            </h2>

            <p className="text-lg md:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Join our community to get early access when the marketplace launches
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/community">
                <Button
                  size="lg"
                  className="text-lg px-10 py-6 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] hover:opacity-90 font-bold shadow-xl rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Join Community
                </Button>
              </Link>
              <Link href="/learn">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-6 border-2 border-[var(--border)] hover:border-[var(--primary)] font-bold rounded-xl transition-all duration-300"
                >
                  Explore Learning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
