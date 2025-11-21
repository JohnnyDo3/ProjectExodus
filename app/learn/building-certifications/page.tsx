import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import {
  Building2,
  Leaf,
  Droplet,
  Zap,
  Wind,
  Heart,
  Home,
  ArrowLeft,
  Award,
  CheckCircle2,
  Star,
  Globe,
  Users,
  Lightbulb,
  Apple,
  Dumbbell,
  Brain,
  Sun,
  Trees
} from 'lucide-react'

export default function BuildingCertificationsPage() {
  const certifications = [
    {
      name: 'BREEAM',
      fullName: 'Building Research Establishment Environmental Assessment Method',
      year: 1990,
      origin: 'United Kingdom',
      buildings: '540,000+',
      color: 'primary',
      description: 'The world\'s first and longest-established sustainability assessment method for the built environment',
      icon: Building2
    },
    {
      name: 'WELL',
      fullName: 'WELL Building Standard',
      year: 2014,
      origin: 'United States',
      buildings: 'Growing globally',
      color: 'accent',
      description: 'Focuses exclusively on enhancing people\'s health and well-being in the built environment',
      icon: Heart
    },
    {
      name: 'Living Building Challenge',
      fullName: 'Living Building Challenge',
      year: 2006,
      origin: 'International',
      buildings: '250 certified, 500 pursuing',
      color: 'secondary',
      description: 'The most rigorous and comprehensive certification program - net zero energy, water, and waste',
      icon: Leaf
    }
  ]

  const breeamCategories = [
    { name: 'Management', description: 'Project management and procurement', icon: Users },
    { name: 'Health & Wellbeing', description: 'Indoor environmental quality', icon: Heart },
    { name: 'Energy', description: 'Energy efficiency and CO2 emissions', icon: Zap },
    { name: 'Transport', description: 'Location and accessibility', icon: Building2 },
    { name: 'Water', description: 'Water consumption and efficiency', icon: Droplet },
    { name: 'Materials', description: 'Sustainable sourcing and life cycle', icon: Home },
    { name: 'Waste', description: 'Waste management and resources', icon: Leaf },
    { name: 'Land Use & Ecology', description: 'Site ecology and biodiversity', icon: Trees },
    { name: 'Pollution', description: 'Air, water, and light pollution', icon: Wind },
    { name: 'Innovation', description: 'Exceptional performance', icon: Lightbulb }
  ]

  const breeamLevels = [
    { level: 'Pass', score: '30-44%', stars: 1, description: 'Meets basic sustainability standards' },
    { level: 'Good', score: '45-54%', stars: 2, description: 'Good sustainability performance' },
    { level: 'Very Good', score: '55-69%', stars: 3, description: 'Advanced sustainability practices' },
    { level: 'Excellent', score: '70-84%', stars: 4, description: 'Exemplary sustainability achievement' },
    { level: 'Outstanding', score: '85%+', stars: 5, description: 'World-class sustainability leadership' }
  ]

  const wellConcepts = [
    {
      name: 'Air',
      description: 'Optimize air quality through ventilation, filtration, and source control',
      icon: Wind
    },
    {
      name: 'Water',
      description: 'Ensure clean, safe, and accessible drinking water',
      icon: Droplet
    },
    {
      name: 'Nourishment',
      description: 'Encourage healthy eating habits and food transparency',
      icon: Apple
    },
    {
      name: 'Light',
      description: 'Maximize natural light and optimize artificial lighting',
      icon: Sun
    },
    {
      name: 'Movement',
      description: 'Promote physical activity and active living',
      icon: Dumbbell
    },
    {
      name: 'Thermal Comfort',
      description: 'Maintain comfortable temperature and humidity levels',
      icon: Home
    },
    {
      name: 'Sound',
      description: 'Control acoustic environment to support health',
      icon: Heart
    },
    {
      name: 'Materials',
      description: 'Reduce exposure to harmful chemicals',
      icon: Leaf
    },
    {
      name: 'Mind',
      description: 'Support mental and emotional health',
      icon: Brain
    },
    {
      name: 'Community',
      description: 'Foster social connection and equity',
      icon: Users
    }
  ]

  const wellLevels = [
    { level: 'Silver', description: 'Meets foundational health and wellness criteria' },
    { level: 'Gold', description: 'Demonstrates advanced health optimization' },
    { level: 'Platinum', description: 'Achieves exceptional health and wellness performance' }
  ]

  const lbcPetals = [
    {
      petal: 'Place',
      description: 'Restore a healthy relationship between buildings and nature',
      imperatives: 'Limits to Growth, Urban Agriculture, Habitat Exchange, Car Free Living'
    },
    {
      petal: 'Water',
      description: 'Net Positive Water - return more water than consumed',
      imperatives: 'Net Positive Water'
    },
    {
      petal: 'Energy',
      description: 'Net Positive Energy - produce more energy than consumed',
      imperatives: 'Net Positive Energy, Energy Storage, Embodied Carbon'
    },
    {
      petal: 'Health & Happiness',
      description: 'Create healthy, inspiring spaces',
      imperatives: 'Healthy Interior Environment, Biophilic Environment, Accessible Design'
    },
    {
      petal: 'Materials',
      description: 'Use safe, sustainable materials',
      imperatives: 'Red List, Responsible Industry, Living Economy Sourcing, Net Positive Waste'
    },
    {
      petal: 'Equity',
      description: 'Support a just, equitable world',
      imperatives: 'Human Scaled Living, Universal Access, Equitable Investment, JUST Organizations'
    },
    {
      petal: 'Beauty',
      description: 'Celebrate design that uplifts the human spirit',
      imperatives: 'Beauty + Spirit, Inspiration + Education'
    }
  ]

  const lbcCertificationTypes = [
    {
      type: 'Living Certification',
      description: 'Highest level - must meet all 20 imperatives across all 7 petals',
      requirements: 'Full compliance with all imperatives'
    },
    {
      type: 'Petal Certification',
      description: 'Meet 3 petals plus Core imperatives',
      requirements: '10 core imperatives + all imperatives in 3 petals (one must be Water, Energy, or Materials)'
    },
    {
      type: 'Core Certification',
      description: 'Meet essential sustainability requirements',
      requirements: '10 core imperatives only'
    }
  ]

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/learn">
              <Button variant="ghost" className="mb-6 font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK TO LEARN
              </Button>
            </Link>

            <div className="text-center space-y-6">
              <div className="inline-block px-6 py-3 rounded-full bg-theme-primary text-[var(--primary-foreground)] font-black text-sm uppercase mb-4">
                SUSTAINABLE BUILDING CERTIFICATIONS
              </div>
              <h1 className="text-6xl md:text-7xl font-black text-[var(--foreground)]">
                GLOBAL GREEN BUILDING STANDARDS
              </h1>
              <p className="text-2xl font-bold text-theme-muted max-w-3xl mx-auto">
                Explore BREEAM, WELL Building Standard, and Living Building Challenge - three transformative certification systems
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Comparison */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center text-[var(--foreground)]">CERTIFICATION OVERVIEW</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {certifications.map((cert, idx) => (
                <Card key={idx} className={`border-4 border-theme-${cert.color} bg-gradient-to-br from-[color-mix(in_srgb,var(--${cert.color})_10%,var(--background))] to-[color-mix(in_srgb,var(--${cert.color})_20%,var(--background))] shadow-theme-xl hover:scale-105 transition-transform`}>
                  <CardHeader>
                    <cert.icon className={`w-16 h-16 text-theme-${cert.color} mx-auto mb-4`} />
                    <CardTitle className={`text-3xl font-black text-center text-theme-${cert.color}`}>
                      {cert.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm font-bold text-theme-muted">{cert.fullName}</p>
                    <div className="space-y-2 text-sm font-semibold text-[var(--foreground)]">
                      <p><span className="font-black">Established:</span> {cert.year}</p>
                      <p><span className="font-black">Origin:</span> {cert.origin}</p>
                      <p><span className="font-black">Global Reach:</span> {cert.buildings} certified</p>
                    </div>
                    <p className="text-base font-semibold text-[var(--foreground)] pt-4 border-t-2 border-theme-muted">
                      {cert.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BREEAM Section */}
      <section className="py-20 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--background))] to-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Building2 className="w-20 h-20 text-theme-primary mx-auto mb-6" />
              <h2 className="text-5xl font-black mb-6 text-[var(--foreground)]">BREEAM</h2>
              <p className="text-xl font-bold text-theme-muted max-w-3xl mx-auto">
                The world's first sustainability assessment method - evaluating management, water, energy, transport, health, resources, and ecology
              </p>
            </div>

            {/* BREEAM Categories */}
            <div className="mb-16">
              <h3 className="text-3xl font-black mb-8 text-center text-theme-primary">ASSESSMENT CATEGORIES</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                {breeamCategories.map((category, idx) => (
                  <Card key={idx} className="border-2 border-theme-primary hover:border-theme-accent transition-colors">
                    <CardContent className="p-6 text-center">
                      <category.icon className="w-10 h-10 text-theme-primary mx-auto mb-3" />
                      <h4 className="text-sm font-black mb-2 text-theme-primary">{category.name}</h4>
                      <p className="text-xs font-semibold text-theme-muted">{category.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* BREEAM Rating Levels */}
            <div>
              <h3 className="text-3xl font-black mb-8 text-center text-theme-primary">RATING LEVELS</h3>
              <div className="space-y-4">
                {breeamLevels.map((level, idx) => (
                  <Card key={idx} className="border-4 border-theme-primary hover:scale-102 transition-transform">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="flex gap-1">
                            {[...Array(level.stars)].map((_, i) => (
                              <Star key={i} className="w-6 h-6 fill-theme-primary text-theme-primary" />
                            ))}
                          </div>
                          <div>
                            <h4 className="text-2xl font-black text-theme-primary">{level.level}</h4>
                            <p className="text-sm font-semibold text-theme-muted">{level.description}</p>
                          </div>
                        </div>
                        <div className="px-4 py-2 rounded-full bg-theme-primary text-[var(--primary-foreground)] font-black">
                          {level.score}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WELL Section */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Heart className="w-20 h-20 text-theme-accent mx-auto mb-6" />
              <h2 className="text-5xl font-black mb-6 text-[var(--foreground)]">WELL BUILDING STANDARD</h2>
              <p className="text-xl font-bold text-theme-muted max-w-3xl mx-auto">
                The first building standard focused exclusively on human health and wellness - addressing user behavior, operations, and design
              </p>
            </div>

            {/* WELL Concepts */}
            <div className="mb-16">
              <h3 className="text-3xl font-black mb-8 text-center text-theme-accent">10 CORE CONCEPTS</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                {wellConcepts.map((concept, idx) => (
                  <Card key={idx} className="border-4 border-theme-accent bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_10%,var(--background))] to-[color-mix(in_srgb,var(--accent)_20%,var(--background))] shadow-theme-xl hover:scale-105 transition-transform">
                    <CardContent className="p-6 text-center">
                      <concept.icon className="w-12 h-12 text-theme-accent mx-auto mb-4" />
                      <h4 className="text-lg font-black mb-2 text-theme-accent">{concept.name}</h4>
                      <p className="text-sm font-semibold text-theme-muted">{concept.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* WELL Certification Levels */}
            <div>
              <h3 className="text-3xl font-black mb-8 text-center text-theme-accent">CERTIFICATION LEVELS</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {wellLevels.map((level, idx) => (
                  <Card key={idx} className="border-4 border-theme-accent shadow-theme-xl">
                    <CardContent className="p-8 text-center">
                      <Award className="w-16 h-16 text-theme-accent mx-auto mb-4" />
                      <h4 className="text-2xl font-black mb-3 text-theme-accent">{level.level}</h4>
                      <p className="text-base font-semibold text-[var(--foreground)]">{level.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Living Building Challenge Section */}
      <section className="py-20 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_10%,var(--background))] to-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Leaf className="w-20 h-20 text-theme-secondary mx-auto mb-6" />
              <h2 className="text-5xl font-black mb-6 text-[var(--foreground)]">LIVING BUILDING CHALLENGE</h2>
              <p className="text-xl font-bold text-theme-muted max-w-3xl mx-auto">
                The most rigorous green building certification - philosophy, advocacy tool, and standard for net zero energy, water, and waste
              </p>
            </div>

            {/* Seven Petals */}
            <div className="mb-16">
              <h3 className="text-3xl font-black mb-8 text-center text-theme-secondary">SEVEN PETALS</h3>
              <div className="space-y-4">
                {lbcPetals.map((petal, idx) => (
                  <Card key={idx} className="border-4 border-theme-secondary hover:scale-102 transition-transform">
                    <CardContent className="p-8">
                      <h4 className="text-2xl font-black mb-3 text-theme-secondary">{petal.petal}</h4>
                      <p className="text-lg font-semibold text-[var(--foreground)] mb-4">{petal.description}</p>
                      <div className="pt-4 border-t-2 border-theme-muted">
                        <p className="text-sm font-bold text-theme-muted">
                          <span className="font-black text-theme-secondary">Imperatives:</span> {petal.imperatives}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Certification Types */}
            <div>
              <h3 className="text-3xl font-black mb-8 text-center text-theme-secondary">CERTIFICATION TYPES</h3>
              <div className="space-y-6">
                {lbcCertificationTypes.map((type, idx) => (
                  <Card key={idx} className="border-4 border-theme-secondary bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_10%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] shadow-theme-xl">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[var(--accent)] flex items-center justify-center text-[var(--primary-foreground)] text-2xl font-black shadow-theme-xl">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="text-2xl font-black mb-3 text-theme-secondary">{type.type}</h4>
                          <p className="text-lg font-semibold text-[var(--foreground)] mb-3">{type.description}</p>
                          <p className="text-sm font-bold text-theme-muted">{type.requirements}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center text-[var(--foreground)]">CHOOSING THE RIGHT CERTIFICATION</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-4 border-theme-primary shadow-theme-xl">
                <CardContent className="p-8">
                  <Building2 className="w-12 h-12 text-theme-primary mb-4" />
                  <h3 className="text-2xl font-black mb-4 text-theme-primary">Choose BREEAM if:</h3>
                  <ul className="space-y-3 text-base font-semibold text-[var(--foreground)]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                      <span>You need comprehensive environmental assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                      <span>Global recognition is important</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                      <span>You want proven track record (since 1990)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent shadow-theme-xl">
                <CardContent className="p-8">
                  <Heart className="w-12 h-12 text-theme-accent mb-4" />
                  <h3 className="text-2xl font-black mb-4 text-theme-accent">Choose WELL if:</h3>
                  <ul className="space-y-3 text-base font-semibold text-[var(--foreground)]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                      <span>Human health and wellness is your priority</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                      <span>You focus on occupant experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                      <span>Indoor air quality matters most</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary shadow-theme-xl">
                <CardContent className="p-8">
                  <Leaf className="w-12 h-12 text-theme-secondary mb-4" />
                  <h3 className="text-2xl font-black mb-4 text-theme-secondary">Choose LBC if:</h3>
                  <ul className="space-y-3 text-base font-semibold text-[var(--foreground)]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <span>You want net zero/net positive performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <span>You're committed to highest standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <span>Beauty and equity matter to you</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-5xl font-black text-[var(--primary-foreground)]">EXPLORE MORE</h2>
            <p className="text-2xl font-semibold text-[var(--primary-foreground)]">
              Continue your sustainable building education
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/learn/leed-certification">
                <Button size="lg" className="text-xl px-12 py-8 bg-[var(--background)] text-[var(--foreground)] hover:opacity-90 font-black shadow-theme-2xl rounded-2xl">
                  LEED CERTIFICATION
                </Button>
              </Link>
              <Link href="/learn/passive-house">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black rounded-2xl">
                  PASSIVE HOUSE
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
