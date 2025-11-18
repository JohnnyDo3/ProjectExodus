import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/product/ProductCard'
import { Store, ExternalLink, MapPin, Package, CheckCircle2, Globe } from 'lucide-react'
import Link from 'next/link'

async function getVendor(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/vendors/${slug}`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.success ? data.data : null
  } catch (error) {
    return null
  }
}

export default async function VendorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const vendor = await getVendor(slug)
  if (!vendor) notFound()
  const products = vendor.products || []

  return (
    <div className="min-h-screen">
      <section className="py-24 bg-gradient-to-br from-ocean-50 via-moss-50 to-terra-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-moss-500 to-ocean-500 flex items-center justify-center shadow-2xl flex-shrink-0">
              <Store className="w-20 h-20 text-white" />
            </div>
            <div className="flex-1 space-y-6">
              <div>
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  <h1 className="text-6xl font-black" style={{ color: '#000' }}>{vendor.name.toUpperCase()}</h1>
                  {vendor.verified && (
                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-moss-500 to-ocean-500 flex items-center gap-2 shadow-lg">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                      <span className="text-sm font-black text-white uppercase">Verified</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xl font-semibold" style={{ color: '#444' }}>{vendor.description}</p>
              <div className="flex flex-wrap gap-6">
                {vendor.website && (
                  <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-moss-600 hover:text-moss-700 font-bold">
                    <Globe className="w-5 h-5" /><span className="uppercase">Visit Website</span>
                  </a>
                )}
                {vendor.location && (
                  <div className="flex items-center gap-2 font-semibold" style={{ color: '#666' }}>
                    <MapPin className="w-5 h-5 text-ocean-600" /><span>{vendor.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {products.length > 0 ? (
        <section className="py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black mb-6" style={{ color: '#000' }}>PRODUCTS FROM {vendor.name.toUpperCase()}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {products.map((product: any) => (<ProductCard key={product.id} product={product} />))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
            <Card className="border-4 border-moss-300 bg-gradient-to-br from-moss-50 to-moss-100">
              <CardContent className="p-12">
                <Package className="w-20 h-20 text-moss-600 mx-auto mb-6" />
                <h3 className="text-4xl font-black mb-6" style={{ color: '#36763d' }}>PRODUCTS COMING SOON</h3>
                <Link href="/vendors"><Button size="lg" variant="outline" className="text-lg px-10 py-6 font-black border-2">BROWSE ALL VENDORS</Button></Link>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  )
}
