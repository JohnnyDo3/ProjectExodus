import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Package,
  Truck,
  Globe,
  Clock,
  DollarSign,
  MapPin,
  CheckCircle2,
  Leaf
} from 'lucide-react'
import Link from 'next/link'

export default function ShippingPage() {
  const shippingMethods = [
    {
      icon: Package,
      name: 'Standard Shipping',
      time: '5-7 Business Days',
      cost: 'FREE on orders over $50',
      description: 'Affordable eco-friendly shipping for most products'
    },
    {
      icon: Truck,
      name: 'Express Shipping',
      time: '2-3 Business Days',
      cost: '$15 flat rate',
      description: 'Faster delivery with carbon offset included'
    },
    {
      icon: Globe,
      name: 'International Shipping',
      time: '10-21 Business Days',
      cost: 'Calculated at checkout',
      description: 'We ship sustainable products worldwide'
    }
  ]

  const regions = [
    {
      name: 'United States',
      freeThreshold: '$50',
      standardCost: '$6.99',
      timeframe: '5-7 business days'
    },
    {
      name: 'Canada',
      freeThreshold: '$75',
      standardCost: '$12.99',
      timeframe: '7-10 business days'
    },
    {
      name: 'Europe',
      freeThreshold: '$100',
      standardCost: '$18.99',
      timeframe: '10-14 business days'
    },
    {
      name: 'Rest of World',
      freeThreshold: '$125',
      standardCost: '$24.99',
      timeframe: '14-21 business days'
    }
  ]

  const ecoFeatures = [
    {
      icon: Leaf,
      title: 'Carbon-Neutral Shipping',
      description: 'All shipments are carbon offset through verified environmental projects'
    },
    {
      icon: Package,
      title: 'Sustainable Packaging',
      description: '100% recyclable, compostable, or reusable packaging materials'
    },
    {
      icon: Truck,
      title: 'Eco-Friendly Carriers',
      description: 'We partner with carriers committed to reducing environmental impact'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[var(--muted)] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] mb-6 shadow-xl">
              <Truck className="w-10 h-10 text-[var(--primary-foreground)]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[var(--foreground)]">
              SHIPPING INFORMATION
            </h1>
            <p className="text-xl font-semibold text-theme-muted max-w-2xl mx-auto">
              Fast, affordable, and eco-friendly shipping on all sustainable products
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Methods */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">SHIPPING OPTIONS</h2>
            <p className="text-lg font-semibold text-theme-muted">
              Choose the delivery speed that works for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {shippingMethods.map((method, i) => (
              <Card key={i} className="border-4 border-theme-primary hover:border-theme-accent transition-all transform hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-lg">
                    <method.icon className="w-10 h-10 text-[var(--primary-foreground)]" />
                  </div>
                  <CardTitle className="text-2xl font-black text-[var(--foreground)]">
                    {method.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="space-y-2">
                    <p className="text-lg font-bold text-theme-primary">
                      {method.time}
                    </p>
                    <p className="text-base font-bold text-[var(--foreground)]">
                      {method.cost}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-theme-muted">
                    {method.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Shipping */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">
                SHIPPING BY REGION
              </h2>
              <p className="text-lg font-semibold text-theme-muted">
                Standard shipping rates and delivery times by location
              </p>
            </div>

            <div className="space-y-4">
              {regions.map((region, i) => (
                <Card key={i} className="border-2 border-[var(--border)] hover:border-theme-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <MapPin className="w-8 h-8 text-theme-primary flex-shrink-0" />
                        <div>
                          <h3 className="text-xl font-black text-[var(--foreground)]">
                            {region.name}
                          </h3>
                          <p className="text-sm font-medium text-theme-muted">
                            {region.timeframe}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-6 md:ml-auto">
                        <div>
                          <p className="text-xs font-bold text-theme-muted uppercase">Standard</p>
                          <p className="text-lg font-black text-[var(--foreground)]">{region.standardCost}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-theme-muted uppercase">Free Over</p>
                          <p className="text-lg font-black text-theme-primary">{region.freeThreshold}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eco-Friendly Shipping */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4" style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                SUSTAINABLE SHIPPING PRACTICES
              </h2>
              <p className="text-lg font-semibold text-theme-muted">
                Every delivery is designed with the planet in mind
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {ecoFeatures.map((feature, i) => (
                <Card key={i} className="border-4 border-theme-accent hover:border-theme-secondary transition-all">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-theme-accent" />
                    </div>
                    <h3 className="text-xl font-black mb-3 text-[var(--foreground)]">
                      {feature.title}
                    </h3>
                    <p className="text-base font-medium text-theme-muted">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-primary shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl font-black text-center text-[var(--foreground)]">
                  IMPORTANT SHIPPING INFORMATION
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-theme-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-black text-[var(--foreground)] mb-2">PROCESSING TIME</h4>
                      <p className="font-medium text-theme-muted">
                        Orders are processed within 1-2 business days. You'll receive a tracking number once your order ships.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-theme-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-black text-[var(--foreground)] mb-2">TRACKING YOUR ORDER</h4>
                      <p className="font-medium text-theme-muted">
                        Track your shipment in real-time using the tracking number provided via email. Updates typically appear within 24 hours of shipping.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-theme-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-black text-[var(--foreground)] mb-2">CUSTOMS & DUTIES</h4>
                      <p className="font-medium text-theme-muted">
                        International orders may be subject to customs fees and import duties. These charges are the responsibility of the recipient and vary by country.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-theme-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-black text-[var(--foreground)] mb-2">SHIPPING DELAYS</h4>
                      <p className="font-medium text-theme-muted">
                        While rare, delays can occur due to weather, carrier issues, or customs. Contact us if your order is significantly delayed.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-theme-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-black text-[var(--foreground)] mb-2">SHIPPING RESTRICTIONS</h4>
                      <p className="font-medium text-theme-muted">
                        Some products may have shipping restrictions to certain regions. These will be noted on the product page.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-black">HAVE SHIPPING QUESTIONS?</h2>
            <p className="text-xl font-semibold opacity-90">
              Our support team is here to help with any shipping concerns
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact">
                <Button size="lg" className="text-lg px-10 py-6 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-xl">
                  CONTACT SUPPORT
                </Button>
              </Link>
              <Link href="/returns">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black">
                  VIEW RETURNS POLICY
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
