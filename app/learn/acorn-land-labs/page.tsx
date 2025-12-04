import { BackButton } from '@/components/navigation/BackButton'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import {
  Leaf,
  Droplet,
  Zap,
  Home,
  Sprout,
  Sun,
  Wind,
  Waves,
  Recycle,
  BookOpen,
  Laptop,
  Users,
  Target,
  CheckCircle,
  ArrowLeft,
  ExternalLink,
  Lightbulb,
  Heart,
  Globe,
  Shield
} from 'lucide-react'

export default function AcornLandLabsPage() {
  const coreAreas = [
    {
      title: 'FOOD',
      description: 'Regenerative agriculture, permaculture design, soil health, and food forest systems',
      icon: Sprout,
      color: 'primary',
      techniques: [
        'Permaculture principles and design',
        'Soil regeneration and composting',
        'Food forest establishment',
        'Season extension techniques',
        'Seed saving and plant propagation'
      ]
    },
    {
      title: 'WATER',
      description: 'Rainwater harvesting, greywater systems, and sustainable water management',
      icon: Droplet,
      color: 'accent',
      techniques: [
        'Rainwater catchment systems',
        'Greywater recycling and filtration',
        'Swale construction for water retention',
        'Spring development and protection',
        'Water quality testing and treatment'
      ]
    },
    {
      title: 'SHELTER',
      description: 'Natural building techniques, passive solar design, and sustainable construction',
      icon: Home,
      color: 'secondary',
      techniques: [
        'Cob and natural plaster techniques',
        'Timber framing and wood preservation',
        'Passive solar orientation',
        'Natural insulation materials',
        'Green roof systems'
      ]
    },
    {
      title: 'SANITATION',
      description: 'Composting toilet systems, waste management, and ecological sanitation',
      icon: Recycle,
      color: 'primary',
      techniques: [
        'Composting toilet construction',
        'Humanure composting systems',
        'Greywater wetland systems',
        'Waste stream analysis',
        'Closed-loop sanitation design'
      ]
    },
    {
      title: 'ENERGY',
      description: 'Solar, wind, and renewable energy systems for off-grid living',
      icon: Zap,
      color: 'accent',
      techniques: [
        'Solar PV system design and sizing',
        'Battery bank configuration',
        'Micro-hydro power assessment',
        'Wind energy site evaluation',
        'Energy efficiency optimization'
      ]
    }
  ]

  const educationalPrograms = [
    {
      title: '10-Hour Comprehensive Course',
      description: 'Deep dive into off-grid systems and sustainable living practices',
      icon: BookOpen,
      features: [
        'Complete coverage of all 5 core areas',
        'Hands-on practical demonstrations',
        'System design and implementation',
        'Troubleshooting and maintenance',
        'Real-world case studies',
        'Certification upon completion'
      ],
      duration: '10 Hours',
      format: 'Online & In-Person'
    },
    {
      title: 'Land Lab Simulator App',
      description: 'Interactive digital tool for designing and planning off-grid homesteads',
      icon: Laptop,
      features: [
        'Site analysis and assessment tools',
        'System sizing calculators',
        'Cost estimation and budgeting',
        'Component selection guidance',
        'Timeline and project planning',
        'Resource library and references'
      ],
      duration: 'Self-Paced',
      format: 'Mobile & Web App'
    },
    {
      title: 'Community Learning Network',
      description: 'Connect with experienced practitioners and fellow learners',
      icon: Users,
      features: [
        'Expert mentorship programs',
        'Peer learning circles',
        'Project showcase and feedback',
        'Monthly Q&A sessions',
        'Regional meetups and workshops',
        'Shared resource library'
      ],
      duration: 'Ongoing',
      format: 'Online Community'
    }
  ]

  const designPrinciples = [
    {
      number: 1,
      principle: 'OBSERVE & INTERACT',
      description: 'Take time to engage with nature and recognize patterns before taking action',
      icon: Globe,
      color: '#36763d'
    },
    {
      number: 2,
      principle: 'CATCH & STORE ENERGY',
      description: 'Capture resources at peak abundance for use during times of need',
      icon: Sun,
      color: '#357777'
    },
    {
      number: 3,
      principle: 'OBTAIN A YIELD',
      description: 'Ensure systems produce truly useful rewards at each stage',
      icon: Sprout,
      color: '#c24f31'
    },
    {
      number: 4,
      principle: 'SELF-REGULATION',
      description: 'Design systems that discourage inappropriate activity and self-correct',
      icon: Recycle,
      color: '#36763d'
    },
    {
      number: 5,
      principle: 'USE RENEWABLE RESOURCES',
      description: 'Make best use of nature\'s abundance to reduce consumption and dependence',
      icon: Wind,
      color: '#357777'
    },
    {
      number: 6,
      principle: 'PRODUCE NO WASTE',
      description: 'Value and employ all resources available, waste nothing',
      icon: Leaf,
      color: '#c24f31'
    },
    {
      number: 7,
      principle: 'DESIGN FROM PATTERNS',
      description: 'Use patterns found in nature as the backbone for designs',
      icon: Waves,
      color: '#36763d'
    },
    {
      number: 8,
      principle: 'INTEGRATE RATHER THAN SEGREGATE',
      description: 'Put elements together so they can assist each other',
      icon: Heart,
      color: '#357777'
    }
  ]

  const systemBenefits = [
    {
      category: 'RESILIENCE',
      benefits: [
        'Energy independence from grid failures',
        'Food security through local production',
        'Water autonomy in drought conditions',
        'Reduced vulnerability to supply chain disruptions'
      ],
      icon: Shield
    },
    {
      category: 'ENVIRONMENTAL',
      benefits: [
        'Zero fossil fuel dependency',
        'Carbon sequestration through regenerative practices',
        'Biodiversity enhancement',
        'Soil health restoration'
      ],
      icon: Globe
    },
    {
      category: 'ECONOMIC',
      benefits: [
        '80-90% reduction in utility bills',
        'Increased property value',
        'Lower long-term operating costs',
        'Revenue from surplus production'
      ],
      icon: Target
    },
    {
      category: 'LIFESTYLE',
      benefits: [
        'Connection to natural cycles',
        'Enhanced self-sufficiency skills',
        'Community building opportunities',
        'Meaningful sustainable living'
      ],
      icon: Heart
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-theme-xl">
                <Sprout className="w-12 h-12 text-[var(--primary-foreground)]" />
              </div>
            </div>
            <h1 className="text-6xl font-black text-[var(--foreground)]">
              ACORN LAND LABS
            </h1>
            <p className="text-2xl font-bold text-theme-muted leading-relaxed">
              Off-Grid Systems Education & Sustainable Living Design
            </p>
            <div className="flex justify-center gap-4">
              <a href="https://acornlandlabs.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="text-lg px-8 py-6 font-black">
                  VISIT ACORN LAND LABS
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-primary shadow-theme-xl">
              <CardContent className="p-10">
                <div className="flex items-center gap-4 mb-6">
                  <Lightbulb className="w-10 h-10 text-theme-primary flex-shrink-0" />
                  <h2 className="text-3xl font-black text-[var(--foreground)]">
                    WHAT IS ACORN LAND LABS?
                  </h2>
                </div>
                <div className="space-y-4 text-lg font-semibold text-theme-muted leading-relaxed">
                  <p>
                    Acorn Land Labs is a comprehensive educational platform dedicated to teaching the essential systems and skills needed for sustainable off-grid living. Founded on permaculture principles and regenerative design, Acorn Land Labs empowers individuals and communities to create resilient, self-sufficient homesteads.
                  </p>
                  <p>
                    The program focuses on five critical infrastructure areas: <span className="font-black text-theme-primary">Food, Water, Shelter, Sanitation, and Energy</span>. Through hands-on education, digital simulation tools, and community support, Acorn Land Labs provides a complete pathway from conceptual design to practical implementation.
                  </p>
                  <p className="font-black text-[var(--foreground)]">
                    Whether you're planning a small urban homestead or a complete off-grid property, Acorn Land Labs offers the knowledge, tools, and community support to make sustainable living accessible and achievable.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Five Core Areas */}
      <section className="py-16 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4 text-[var(--foreground)]">
                FIVE CORE INFRASTRUCTURE AREAS
              </h2>
              <p className="text-xl font-semibold text-theme-muted">
                Master the essential systems for complete self-sufficiency
              </p>
            </div>

            <div className="space-y-6">
              {coreAreas.map((area, index) => {
                const Icon = area.icon
                const colorClass = `text-theme-${area.color}`
                const bgClass = `bg-gradient-to-br from-[color-mix(in_srgb,var(--${area.color})_15%,var(--background))] to-[color-mix(in_srgb,var(--${area.color})_25%,var(--background))]`
                const borderClass = `border-theme-${area.color}`

                return (
                  <Card key={index} className={`border-4 ${borderClass} ${bgClass} shadow-theme-xl hover-lift`}>
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className={`flex-shrink-0 w-16 h-16 rounded-full ${bgClass} flex items-center justify-center shadow-theme-lg`}>
                          <Icon className={`w-8 h-8 ${colorClass}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-3xl font-black mb-3 ${colorClass}`}>
                            {area.title}
                          </h3>
                          <p className="text-lg font-bold mb-6 text-[var(--foreground)]">
                            {area.description}
                          </p>
                          <div className="grid md:grid-cols-2 gap-3">
                            {area.techniques.map((technique, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colorClass}`} />
                                <span className="text-base font-semibold text-theme-muted">
                                  {technique}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Educational Programs */}
      <section className="py-16 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4 text-[var(--foreground)]">
                EDUCATIONAL PROGRAMS
              </h2>
              <p className="text-xl font-semibold text-theme-muted">
                Comprehensive learning paths for every stage of your journey
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {educationalPrograms.map((program, index) => {
                const Icon = program.icon
                const colors = ['primary', 'accent', 'secondary']
                const color = colors[index % colors.length]

                return (
                  <Card key={index} className={`border-4 border-theme-${color} bg-gradient-to-br from-[color-mix(in_srgb,var(--${color})_15%,var(--background))] to-[color-mix(in_srgb,var(--${color})_25%,var(--background))] shadow-theme-xl hover-lift`}>
                    <CardHeader>
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--${color})] to-[color-mix(in_srgb,var(--${color})_80%,black)] flex items-center justify-center shadow-theme-lg`}>
                        <Icon className="w-8 h-8 text-[var(--primary-foreground)]" />
                      </div>
                      <CardTitle className="text-center">
                        <h3 className={`text-2xl font-black mb-3 text-theme-${color}`}>
                          {program.title}
                        </h3>
                        <p className="text-base font-bold text-theme-muted">
                          {program.description}
                        </p>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mb-6">
                        {program.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 text-theme-${color}`} />
                            <span className="text-sm font-semibold text-theme-muted">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 border-t-2 border-theme-muted space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-theme-muted">Duration:</span>
                          <span className={`text-sm font-black text-theme-${color}`}>{program.duration}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-theme-muted">Format:</span>
                          <span className={`text-sm font-black text-theme-${color}`}>{program.format}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4 text-[var(--primary-foreground)]">
                PERMACULTURE DESIGN PRINCIPLES
              </h2>
              <p className="text-xl font-semibold text-[var(--primary-foreground)]">
                Time-tested ethics guiding regenerative system design
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {designPrinciples.map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.number} className="border-4 border-[var(--background)] bg-[var(--card)]/95 shadow-theme-xl hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-[var(--primary-foreground)] text-2xl font-black shadow-theme-lg"
                          style={{
                            background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`
                          }}
                        >
                          {item.number}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-black mb-2" style={{ color: item.color }}>
                            {item.principle}
                          </h3>
                          <p className="text-base font-semibold text-theme-muted">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* System Benefits */}
      <section className="py-16 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4 text-[var(--foreground)]">
                BENEFITS OF OFF-GRID SYSTEMS
              </h2>
              <p className="text-xl font-semibold text-theme-muted">
                Transform your life through sustainable living practices
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {systemBenefits.map((category, index) => {
                const Icon = category.icon
                const colors = ['primary', 'accent', 'secondary', 'primary']
                const color = colors[index % colors.length]

                return (
                  <Card key={index} className={`border-4 border-theme-${color} bg-gradient-to-br from-[color-mix(in_srgb,var(--${color})_15%,var(--background))] to-[color-mix(in_srgb,var(--${color})_25%,var(--background))] shadow-theme-xl`}>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-[var(--${color})] to-[color-mix(in_srgb,var(--${color})_80%,black)] flex items-center justify-center shadow-theme-lg`}>
                          <Icon className="w-7 h-7 text-[var(--primary-foreground)]" />
                        </div>
                        <CardTitle className={`text-2xl font-black text-theme-${color}`}>
                          {category.category}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {category.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 text-theme-${color}`} />
                            <span className="text-base font-semibold text-[var(--foreground)]">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-accent shadow-theme-2xl">
              <CardContent className="p-12">
                <div className="text-center space-y-6">
                  <Target className="w-16 h-16 text-theme-accent mx-auto" />
                  <h2 className="text-4xl font-black text-[var(--foreground)]">
                    START YOUR OFF-GRID JOURNEY
                  </h2>
                  <p className="text-xl font-bold text-theme-muted leading-relaxed">
                    Whether you're planning a complete homestead or starting with a single system, Acorn Land Labs provides the education and tools you need to succeed. Join thousands of learners building resilient, sustainable futures.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <a href="https://acornlandlabs.com" target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="text-lg px-10 py-6 font-black shadow-lg">
                        EXPLORE COURSES
                        <ExternalLink className="w-5 h-5 ml-2" />
                      </Button>
                    </a>
                    <Link href="/learn">
                      <Button size="lg" variant="outline" className="text-lg px-10 py-6 font-black border-4">
                        MORE LEARNING MODULES
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Topics */}
      <section className="py-16 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">
                RELATED LEARNING MODULES
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/learn/passive-house">
                <Card className="border-4 border-theme-primary hover:border-theme-accent transition-all hover-lift cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Home className="w-12 h-12 text-theme-primary mx-auto mb-4" />
                    <h3 className="text-xl font-black mb-2 text-theme-primary">
                      PASSIVE HOUSE
                    </h3>
                    <p className="text-sm font-semibold text-theme-muted">
                      Ultra-efficient building standards
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/learn/building-certifications">
                <Card className="border-4 border-theme-accent hover:border-theme-primary transition-all hover-lift cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="w-12 h-12 text-theme-accent mx-auto mb-4" />
                    <h3 className="text-xl font-black mb-2 text-theme-accent">
                      CERTIFICATIONS
                    </h3>
                    <p className="text-sm font-semibold text-theme-muted">
                      BREEAM, WELL, Living Building
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/products">
                <Card className="border-4 border-theme-secondary hover:border-theme-accent transition-all hover-lift cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Leaf className="w-12 h-12 text-theme-secondary mx-auto mb-4" />
                    <h3 className="text-xl font-black mb-2 text-theme-secondary">
                      OUR PRODUCTS
                    </h3>
                    <p className="text-sm font-semibold text-theme-muted">
                      Sustainable solutions catalog
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
