import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Leaf, Zap, Droplet, Recycle } from 'lucide-react'

export default function ProductsPage() {
  // Mock categories for now - will be database-driven
  const categories = [
    {
      id: 1,
      name: 'Renewable Energy',
      icon: Zap,
      description: 'Solar panels, wind turbines, and clean energy solutions',
      count: 24,
      color: 'moss'
    },
    {
      id: 2,
      name: 'Water Systems',
      icon: Droplet,
      description: 'Filtration, conservation, and harvesting solutions',
      count: 18,
      color: 'ocean'
    },
    {
      id: 3,
      name: 'Sustainable Materials',
      icon: Recycle,
      description: 'Eco-friendly building and crafting materials',
      count: 32,
      color: 'terra'
    },
    {
      id: 4,
      name: 'Organic Products',
      icon: Leaf,
      description: 'Natural, chemical-free everyday items',
      count: 41,
      color: 'moss'
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Discover Sustainable{' '}
              <span className="earth-gradient bg-clip-text text-transparent">
                Products
              </span>
            </h1>
            <p className="text-xl text-earth-700">
              Explore eco-friendly alternatives across every category.
              Find products that align with your values and make a real impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <input
                type="search"
                placeholder="Search products..."
                className="px-6 py-3 rounded-lg border-2 border-sand-300 focus:border-moss-500 focus:outline-none w-full sm:w-96"
              />
              <Button size="lg">Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-lg text-earth-700">
              Find exactly what you're looking for
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Card key={category.id} className="card-gradient hover-lift cursor-pointer">
                  <CardHeader>
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${category.color}-100 flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 text-${category.color}-600`} />
                    </div>
                    <CardTitle className="text-center">{category.name}</CardTitle>
                    <CardDescription className="text-center">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {category.count} products
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-16 max-w-2xl mx-auto text-center">
            <div className="bg-moss-50 border-2 border-moss-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-moss-900">
                Products Coming Soon!
              </h3>
              <p className="text-moss-800 mb-6">
                We're currently building out our comprehensive product database.
                This page will soon feature real sustainable products with detailed
                specifications, sustainability metrics, and direct purchase links.
              </p>
              <p className="text-sm text-moss-700">
                Check back soon or sign up to be notified when we launch! 🌱
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
