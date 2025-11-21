import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import {
  Building2,
  Leaf,
  Droplet,
  Zap,
  Wind,
  Recycle,
  Home,
  ArrowLeft,
  Award,
  CheckCircle2,
  Target
} from 'lucide-react'

export default function LEEDCertificationPage() {
  const certificationLevels = [
    {
      level: 'CERTIFIED',
      points: '40-49',
      description: 'Commitment to sustainability through energy efficiency, water conservation, and responsible material use',
      color: '#4ade80'
    },
    {
      level: 'SILVER',
      points: '50-59',
      description: 'Higher sustainability performance across multiple categories',
      color: '#94a3b8'
    },
    {
      level: 'GOLD',
      points: '60-79',
      description: 'Significant achievement in sustainable building practices',
      color: '#fbbf24'
    },
    {
      level: 'PLATINUM',
      points: '80+',
      description: 'Exceptional leadership in sustainability and environmental performance',
      color: '#e0e7ff'
    }
  ]

  const creditCategories = [
    {
      title: 'Integrative Process',
      icon: Target,
      description: 'Early analysis of interrelationships among systems',
      points: '1 point'
    },
    {
      title: 'Location and Transportation',
      icon: Building2,
      description: 'Encourage development in areas with existing infrastructure, reduce vehicle distance traveled',
      points: 'Up to 16 points'
    },
    {
      title: 'Sustainable Sites',
      icon: Leaf,
      description: 'Minimize development impact on ecosystems and waterways',
      points: 'Up to 10 points'
    },
    {
      title: 'Water Efficiency',
      icon: Droplet,
      description: 'Reduce potable water consumption, monitor performance',
      points: 'Up to 11 points'
    },
    {
      title: 'Energy and Atmosphere',
      icon: Zap,
      description: 'Reduce energy use, utilize renewable energy, commission systems',
      points: 'Up to 33 points'
    },
    {
      title: 'Materials and Resources',
      icon: Recycle,
      description: 'Minimize waste, use sustainable materials, plan for end of life',
      points: 'Up to 13 points'
    },
    {
      title: 'Indoor Environmental Quality',
      icon: Wind,
      description: 'Improve indoor air quality, thermal and lighting conditions',
      points: 'Up to 16 points'
    },
    {
      title: 'Innovation',
      icon: Award,
      description: 'Reward exceptional or innovative performance',
      points: 'Up to 6 points'
    },
    {
      title: 'Regional Priority',
      icon: Home,
      description: 'Address specific local environmental priorities',
      points: 'Up to 4 points'
    }
  ]

  const leedV5Updates = [
    {
      title: 'Decarbonization Focus',
      description: 'Worth 50% of certification points - emphasis on embodied and operational carbon reduction',
      icon: Zap
    },
    {
      title: 'Quality of Life',
      description: 'Worth 25% of points - inclusive design and air quality standards for underserved communities',
      icon: Heart
    },
    {
      title: 'Conservation & Restoration',
      description: 'Worth 25% of points - ecosystem preservation and ecological restoration',
      icon: Leaf
    },
    {
      title: 'Resilience Credits',
      description: 'New credits for natural disaster preparedness, grid reliability, and climate adaptability',
      icon: Shield
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
                SUSTAINABLE BUILDING CERTIFICATION
              </div>
              <h1 className="text-6xl md:text-7xl font-black text-[var(--foreground)]">
                LEED CERTIFICATION
              </h1>
              <p className="text-2xl font-bold text-theme-muted max-w-3xl mx-auto">
                Leadership in Energy and Environmental Design - The world's most recognized green building certification system
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is LEED */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center text-[var(--foreground)]">WHAT IS LEED?</h2>
            <Card className="border-4 border-theme-primary shadow-theme-xl">
              <CardContent className="p-12">
                <div className="space-y-6 text-lg font-semibold text-[var(--foreground)]">
                  <p>
                    <span className="font-black text-theme-primary">LEED (Leadership in Energy and Environmental Design)</span> is a globally recognized certification system developed by the U.S. Green Building Council (USGBC) that provides a comprehensive framework for evaluating the sustainability of buildings.
                  </p>
                  <p>
                    LEED certification demonstrates a building's commitment to <span className="font-black">energy efficiency</span>, <span className="font-black">environmental impact reduction</span>, and <span className="font-black">occupant well-being</span>.
                  </p>
                  <div className="pt-6 border-t-2 border-theme-muted">
                    <p className="text-2xl font-black text-theme-primary mb-4">LEED v5 (2025 Release)</p>
                    <p>
                      The latest version emphasizes <span className="font-black text-theme-accent">decarbonization</span>, <span className="font-black text-theme-accent">resilience</span>, and <span className="font-black text-theme-accent">equity</span>, reflecting the industry's increased focus on climate action and social justice.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* LEED v5 Global Goals */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center text-[var(--foreground)]">LEED v5 GLOBAL GOALS</h2>
            <p className="text-xl font-bold text-center text-theme-muted mb-12 max-w-3xl mx-auto">
              The new scorecard reorganizes around three global goals expressed through five principles
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {leedV5Updates.map((update, idx) => (
                <Card key={idx} className="border-4 border-theme-accent bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_10%,var(--background))] to-[color-mix(in_srgb,var(--accent)_20%,var(--background))] shadow-theme-xl hover:scale-105 transition-transform">
                  <CardContent className="p-8 text-center">
                    <update.icon className="w-16 h-16 text-theme-accent mx-auto mb-4" />
                    <h3 className="text-xl font-black mb-3 text-theme-accent">{update.title}</h3>
                    <p className="text-sm font-bold text-theme-muted">{update.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certification Levels */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center text-[var(--foreground)]">CERTIFICATION LEVELS</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {certificationLevels.map((level, idx) => (
                <Card key={idx} className="border-4 border-theme-primary shadow-theme-xl hover:scale-105 transition-transform">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle className="text-3xl font-black text-theme-primary">
                        {level.level}
                      </CardTitle>
                      <div className="px-4 py-2 rounded-full bg-theme-primary text-[var(--primary-foreground)] font-black">
                        {level.points} PTS
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-[var(--foreground)]">
                      {level.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Card className="border-4 border-theme-secondary bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_10%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_20%,var(--background))]">
                <CardContent className="p-8">
                  <p className="text-xl font-bold text-[var(--foreground)]">
                    <span className="font-black text-theme-secondary">Total of 110 points available</span> across all credit categories. The more points earned, the higher the certification level achieved.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Credit Categories */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center text-[var(--primary-foreground)]">CREDIT CATEGORIES</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creditCategories.map((category, idx) => (
                <Card key={idx} className="border-4 border-[var(--background)] bg-[var(--card)]/95 shadow-theme-2xl hover:scale-105 transition-transform">
                  <CardContent className="p-8">
                    <category.icon className="w-12 h-12 text-theme-primary mb-4" />
                    <h3 className="text-xl font-black mb-3 text-theme-primary">{category.title}</h3>
                    <p className="text-sm font-semibold text-theme-muted mb-4">{category.description}</p>
                    <div className="inline-block px-3 py-1 rounded-full bg-theme-accent text-[var(--primary-foreground)] text-xs font-black">
                      {category.points}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certification Process */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center text-[var(--foreground)]">CERTIFICATION PROCESS</h2>

            <div className="space-y-6">
              {[
                {
                  step: '1',
                  title: 'Determine Rating System',
                  description: 'Choose the appropriate LEED rating system and version (LEED v5, v4.1, or v4) for your project type'
                },
                {
                  step: '2',
                  title: 'Review Requirements',
                  description: 'Review minimum program requirements and prerequisites for all credit categories'
                },
                {
                  step: '3',
                  title: 'Build Your Scorecard',
                  description: 'Choose credits that align with your project goals using the LEED credit library'
                },
                {
                  step: '4',
                  title: 'Register Project',
                  description: 'Register your project with USGBC and begin documentation'
                },
                {
                  step: '5',
                  title: 'Submit for Review',
                  description: 'Submit documentation for certification review (typically 20-25 business days)'
                },
                {
                  step: '6',
                  title: 'Receive Certification',
                  description: 'If documentation meets criteria, project receives LEED certification at appropriate level'
                }
              ].map((process, idx) => (
                <Card key={idx} className="border-4 border-theme-primary hover:border-theme-accent transition-colors">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-[var(--primary-foreground)] text-2xl font-black shadow-theme-xl">
                        {process.step}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black mb-3 text-theme-primary">{process.title}</h3>
                        <p className="text-lg font-semibold text-[var(--foreground)]">{process.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center text-[var(--foreground)]">BENEFITS OF LEED</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--background))] to-[color-mix(in_srgb,var(--primary)_20%,var(--background))] shadow-theme-xl">
                <CardContent className="p-8 text-center">
                  <Zap className="w-16 h-16 text-theme-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-black mb-4 text-theme-primary">ENVIRONMENTAL</h3>
                  <ul className="text-left space-y-2 text-base font-semibold text-[var(--foreground)]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                      <span>Reduce carbon emissions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                      <span>Conserve water & energy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                      <span>Minimize waste</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_10%,var(--background))] to-[color-mix(in_srgb,var(--accent)_20%,var(--background))] shadow-theme-xl">
                <CardContent className="p-8 text-center">
                  <Award className="w-16 h-16 text-theme-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-black mb-4 text-theme-accent">ECONOMIC</h3>
                  <ul className="text-left space-y-2 text-base font-semibold text-[var(--foreground)]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                      <span>Lower operating costs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                      <span>Increase property value</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                      <span>Tax incentives & rebates</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_10%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] shadow-theme-xl">
                <CardContent className="p-8 text-center">
                  <Heart className="w-16 h-16 text-theme-secondary mx-auto mb-4" />
                  <h3 className="text-2xl font-black mb-4 text-theme-secondary">SOCIAL</h3>
                  <ul className="text-left space-y-2 text-base font-semibold text-[var(--foreground)]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <span>Improve indoor air quality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <span>Enhance occupant health</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <span>Boost productivity</span>
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
            <h2 className="text-5xl font-black text-[var(--primary-foreground)]">READY TO GO GREEN?</h2>
            <p className="text-2xl font-semibold text-[var(--primary-foreground)]">
              Explore more sustainable building certifications and techniques
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/learn/building-certifications">
                <Button size="lg" className="text-xl px-12 py-8 bg-[var(--background)] text-[var(--foreground)] hover:opacity-90 font-black shadow-theme-2xl rounded-2xl">
                  OTHER CERTIFICATIONS
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

import { Heart, Shield } from 'lucide-react'
