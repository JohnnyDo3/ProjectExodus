import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Briefcase, Heart, Users, Zap, Globe, Leaf, MapPin, Clock, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default function CareersPage() {
  const values = [
    {
      icon: Leaf,
      title: 'Sustainability First',
      description: 'Every decision we make considers environmental impact'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'We build together with our users and team'
    },
    {
      icon: Heart,
      title: 'Purpose & Impact',
      description: 'Your work directly contributes to positive change'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We embrace new ideas and creative solutions'
    }
  ]

  const openings = [
    {
      title: 'Senior Full Stack Engineer',
      department: 'Engineering',
      location: 'Remote (US)',
      type: 'Full-time',
      description: 'Build scalable features for our sustainable living platform using Next.js, React, and Prisma.'
    },
    {
      title: 'Content Strategist',
      department: 'Content',
      location: 'Remote',
      type: 'Full-time',
      description: 'Create compelling educational content about sustainability topics and eco-friendly living.'
    },
    {
      title: 'Vendor Success Manager',
      department: 'Partnerships',
      location: 'Hybrid (SF Bay Area)',
      type: 'Full-time',
      description: 'Support our sustainable vendor partners and help them succeed on the platform.'
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Design beautiful, accessible user experiences that make sustainable living easy and delightful.'
    }
  ]

  const perks = [
    '🌿 Competitive salary + equity',
    '🏥 Health, dental, and vision insurance',
    '🏖️ Unlimited PTO',
    '🏠 Remote-first culture',
    '📚 Learning & development budget',
    '🌱 Sustainability stipend',
    '💻 Top-tier equipment',
    '🤝 Team retreats & events',
    '👶 Parental leave',
    '🧘 Wellness benefits',
    '📈 Career growth opportunities',
    '🌍 Make a real impact'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] mb-6 shadow-xl">
              <Briefcase className="w-10 h-10 text-[var(--primary-foreground)]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[var(--foreground)]">
              CAREERS AT PROJECT EXODUS
            </h1>
            <p className="text-xl font-semibold text-theme-muted max-w-2xl mx-auto">
              Join us in building the future of sustainable living
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-primary shadow-xl">
              <CardContent className="p-10 text-center">
                <h2 className="text-3xl font-black mb-6 text-[var(--foreground)]">
                  WORK THAT MATTERS
                </h2>
                <p className="text-lg font-medium text-theme-muted leading-relaxed">
                  At Project Exodus, you'll work alongside passionate people who care deeply about
                  sustainability, community, and creating positive change. Every line of code, every piece
                  of content, and every user interaction contributes to making sustainable living more
                  accessible to everyone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black mb-12 text-center text-[var(--foreground)]">
              OUR VALUES
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, i) => (
                <Card key={i} className="border-4 border-theme-accent hover:border-theme-primary transition-all text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-lg">
                      <value.icon className="w-8 h-8 text-[var(--primary-foreground)]" />
                    </div>
                    <h3 className="text-xl font-black mb-3 text-[var(--foreground)]">
                      {value.title}
                    </h3>
                    <p className="text-sm font-medium text-theme-muted">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-black mb-4 text-center text-[var(--foreground)]">
              OPEN POSITIONS
            </h2>
            <p className="text-lg font-semibold text-theme-muted text-center mb-12">
              Join our growing team and help build the future of sustainability
            </p>

            <div className="space-y-6">
              {openings.map((job, i) => (
                <Card key={i} className="border-2 border-[var(--border)] hover:border-theme-primary transition-all">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-black mb-3 text-[var(--foreground)]">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 mb-4">
                          <span className="flex items-center gap-2 text-sm font-bold text-theme-primary">
                            <Briefcase className="w-4 h-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-2 text-sm font-bold text-theme-muted">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-2 text-sm font-bold text-theme-muted">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </span>
                        </div>
                        <p className="text-base font-medium text-theme-muted">
                          {job.description}
                        </p>
                      </div>
                      <div className="md:ml-6">
                        <Button className="w-full md:w-auto font-black">
                          APPLY NOW →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Perks & Benefits */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-black mb-4 text-center text-[var(--foreground)]">
              PERKS & BENEFITS
            </h2>
            <p className="text-lg font-semibold text-theme-muted text-center mb-12">
              We invest in our team's wellbeing and growth
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-[var(--card)] border-2 border-[var(--border)]">
                  <span className="text-2xl">{perk.split(' ')[0]}</span>
                  <span className="font-bold text-[var(--foreground)]">
                    {perk.substring(perk.indexOf(' ') + 1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Globe className="w-16 h-16 mx-auto" />
            <h2 className="text-4xl font-black">DON'T SEE THE RIGHT ROLE?</h2>
            <p className="text-xl font-semibold opacity-90">
              We're always looking for talented people who share our mission
            </p>
            <div className="pt-4">
              <Link href="/contact">
                <Button size="lg" className="text-lg px-10 py-6 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-xl">
                  GET IN TOUCH
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
