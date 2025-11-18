import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Store, ExternalLink, MapPin, Package, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

async function getVendors() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/vendors`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch vendors')
    }

    const data = await res.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error('Error fetching vendors:', error)
    return []
  }
}

export default async function VendorsPage() {
  const vendors = await getVendors()

  // Mock data for demonstration since API might not have vendors yet
  const displayVendors = vendors.length > 0 ? vendors : [
    {
      id: '1',
      name: 'Goal Zero',
      slug: 'goal-zero',
      description: 'Leading manufacturer of portable solar power solutions for outdoor adventures and emergency preparedness',
      website: 'https://goalzero.com',
      location: 'Utah, USA',
      productCount: 28,
      verified: true
    },
    {
      id: '2',
      name: 'Berkey Filters',
      slug: 'berkey-filters',
      description: 'Premium water filtration systems for home and travel, providing clean drinking water anywhere',
      website: 'https://berkeyfilters.com',
      location: 'Texas, USA',
      productCount: 15,
      verified: true
    },
    {
      id: '3',
      name: 'Patagonia',
      slug: 'patagonia',
      description: 'Outdoor clothing and gear built to last, backed by environmental activism and fair trade practices',
      website: 'https://patagonia.com',
      location: 'California, USA',
      productCount: 42,
      verified: true
    },
    {
      id: '4',
      name: 'Seventh Generation',
      slug: 'seventh-generation',
      description: 'Plant-based household products that are safe for your family and the environment',
      website: 'https://seventhgeneration.com',
      location: 'Vermont, USA',
      productCount: 35,
      verified: true
    },
    {
      id: '5',
      name: 'Allbirds',
      slug: 'allbirds',
      description: 'Sustainable footwear made from natural materials like merino wool and eucalyptus',
      website: 'https://allbirds.com',
      location: 'San Francisco, USA',
      productCount: 22,
      verified: false
    },
    {
      id: '6',
      name: 'Package Free',
      slug: 'package-free',
      description: 'Zero-waste lifestyle products from reusable containers to plastic-free alternatives',
      website: 'https://packagefreeshop.com',
      location: 'New York, USA',
      productCount: 18,
      verified: false
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-ocean-50 via-moss-50 to-terra-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <h1 style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 900,
              lineHeight: 1,
              color: '#000'
            }}>
              SUSTAINABLE VENDORS
            </h1>
            <p className="text-2xl font-bold" style={{ color: '#222' }}>
              Meet the companies{' '}
              <span style={{
                background: 'linear-gradient(135deg, #36763d, #357777)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>leading the way</span>{' '}
              in sustainability
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b-4 border-moss-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: displayVendors.length, label: 'TRUSTED VENDORS' },
              { value: displayVendors.filter((v: any) => v.verified).length, label: 'VERIFIED PARTNERS' },
              { value: displayVendors.reduce((sum: number, v: any) => sum + v.productCount, 0), label: 'TOTAL PRODUCTS' },
              { value: '100%', label: 'ECO-COMMITTED' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-black mb-2" style={{
                  background: 'linear-gradient(135deg, #36763d, #357777)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {stat.value}
                </div>
                <div className="text-sm font-bold tracking-wider" style={{ color: '#666' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendors Grid */}
      <section className="py-32 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6" style={{ color: '#000' }}>
              ALL VENDORS
            </h2>
            <p className="text-xl font-semibold" style={{ color: '#333' }}>
              Carefully curated partners committed to sustainable practices
            </p>
          </div>

          <div className="max-w-7xl mx-auto space-y-6">
            {displayVendors.map((vendor: any) => (
              <Card
                key={vendor.id}
                className="border-4 border-moss-200 hover:border-moss-400 transition-all transform hover:scale-[1.02] shadow-lg"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    {/* Vendor Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-moss-500 to-ocean-500 flex items-center justify-center shadow-xl">
                        <Store className="w-10 h-10 text-white" />
                      </div>
                    </div>

                    {/* Vendor Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-3xl font-black" style={{ color: '#000' }}>
                              {vendor.name.toUpperCase()}
                            </h3>
                            {vendor.verified && (
                              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-moss-500 to-ocean-500 flex items-center gap-1.5 shadow-md">
                                <CheckCircle2 className="w-4 h-4 text-white" />
                                <span className="text-xs font-black text-white uppercase">Verified</span>
                              </div>
                            )}
                          </div>
                          <p className="text-sm font-bold mb-1" style={{ color: '#666' }}>
                            /{vendor.slug}
                          </p>
                        </div>
                      </div>

                      <p className="text-base font-medium mb-6" style={{ color: '#444' }}>
                        {vendor.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-6">
                        {vendor.website && (
                          <a
                            href={vendor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-moss-600 hover:text-moss-700 font-bold transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                            <span>VISIT WEBSITE</span>
                          </a>
                        )}
                        {vendor.location && (
                          <div className="flex items-center gap-2 font-semibold" style={{ color: '#666' }}>
                            <MapPin className="w-5 h-5 text-ocean-600" />
                            <span>{vendor.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 font-semibold" style={{ color: '#666' }}>
                          <Package className="w-5 h-5 text-terra-600" />
                          <span>{vendor.productCount} PRODUCTS</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Link href={`/vendors/${vendor.slug}`}>
                          <Button className="font-black shadow-lg">
                            VIEW ALL PRODUCTS →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-moss-500 via-ocean-500 to-terra-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-6xl font-black">
              PARTNER WITH US
            </h2>
            <p className="text-2xl font-semibold">
              Are you a sustainable brand? Join our marketplace and reach conscious consumers
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-xl px-12 py-8 bg-white text-earth-900 hover:bg-sand-100 font-black shadow-2xl rounded-2xl">
                BECOME A VENDOR
              </Button>
              <Link href="/products">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 border-4 border-white text-white hover:bg-white hover:text-earth-900 font-black rounded-2xl">
                  BROWSE PRODUCTS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
