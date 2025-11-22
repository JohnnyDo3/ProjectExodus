import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import {
  Home,
  Zap,
  Wind,
  Thermometer,
  Shield,
  Droplet,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Gauge,
  Wrench,
  Eye,
  Target,
  ExternalLink,
  FileText,
  BookOpen,
  Award
} from 'lucide-react'

export default function PassiveHousePage() {
  const fivePrinciples = [
    {
      title: 'Superinsulated Envelope',
      description: 'Continuous insulation throughout the building envelope with typical U-values of 0.10–0.15 W/m²·K',
      icon: Home,
      details: 'Prevents heat loss and maintains stable indoor temperatures',
      color: 'primary'
    },
    {
      title: 'Airtight Construction',
      description: 'Achieve n50 ≤ 0.6 air changes per hour at ±50 Pa during blower-door testing',
      icon: Shield,
      details: 'Eliminates drafts and uncontrolled air infiltration',
      color: 'accent'
    },
    {
      title: 'High-Performance Windows & Doors',
      description: 'Triple/quad glazing with low-e coatings and whole-window U-values ≤0.80 W/m²·K',
      icon: Building2,
      details: 'Minimize heat transfer while maximizing solar gains',
      color: 'secondary'
    },
    {
      title: 'Thermal-Bridge-Free Design',
      description: 'Continuous insulation with psi-values below 0.01 W/(mK) at all junctions',
      icon: Thermometer,
      details: 'Prevent cold spots and energy loss at connections',
      color: 'primary'
    },
    {
      title: 'Heat Recovery Ventilation',
      description: 'Mechanical ventilation with ≥75% sensible heat recovery efficiency',
      icon: Wind,
      details: 'Fresh air continuously while recovering energy',
      color: 'accent'
    }
  ]

  const performanceStandards = [
    {
      standard: 'Space Heating Demand',
      requirement: '≤ 15 kWh/m²/year',
      alternative: 'OR peak heat load ≤ 10 W/m²',
      description: 'Annual heating energy use per square meter'
    },
    {
      standard: 'Airtightness',
      requirement: 'n50 ≤ 0.6 ACH',
      alternative: '1.0 ACH for EnerPHit (retrofits)',
      description: 'Air changes per hour at 50 Pascals pressure'
    },
    {
      standard: 'Total Primary Energy',
      requirement: '≤ 60 kWh/m²/year',
      alternative: 'Renewable energy sources',
      description: 'All energy use including heating, cooling, hot water, lighting, appliances'
    },
    {
      standard: 'Overheating',
      requirement: '< 10% hours above 25°C',
      alternative: 'Passive cooling strategies',
      description: 'Thermal comfort without active cooling'
    }
  ]

  const constructionTechniques = [
    {
      technique: 'Double-Stud Walls',
      description: 'Two parallel stud walls with continuous insulation in the gap',
      benefit: 'No thermal bridging through studs',
      icon: Home
    },
    {
      technique: 'Insulated Concrete Forms (ICF)',
      description: 'Interlocking foam panels filled with concrete',
      benefit: 'Eliminates need for additional insulation layers',
      icon: Building2
    },
    {
      technique: 'Structural Insulated Panels (SIPs)',
      description: 'Factory-made sandwich panels with foam core',
      benefit: 'Greater precision and reduced installation errors',
      icon: Shield
    },
    {
      technique: 'Cross-Laminated Timber (CLT)',
      description: 'Engineered wood with layers oriented at right angles',
      benefit: 'Carbon-negative and excellent thermal performance',
      icon: Home
    }
  ]

  const windowDetails = [
    {
      feature: 'Glazing',
      specification: 'Triple or quad-pane with low-e coatings',
      performance: 'U-value ≤0.80 W/m²·K'
    },
    {
      feature: 'Gas Fills',
      specification: 'Argon or krypton between panes',
      performance: 'Reduces conductive heat transfer'
    },
    {
      feature: 'Warm-Edge Spacers',
      specification: 'Low-conductivity spacer materials',
      performance: 'Prevents condensation at edges'
    },
    {
      feature: 'Installation',
      specification: 'Positioned in line with insulation layer',
      performance: 'Minimizes thermal bridging'
    }
  ]

  const ventilationSystems = [
    {
      system: 'HRV (Heat Recovery Ventilator)',
      function: 'Exchanges heat only between airstreams',
      efficiency: 'Up to 90% heat recovery',
      climate: 'Best for cold/dry climates',
      icon: Wind
    },
    {
      system: 'ERV (Energy Recovery Ventilator)',
      function: 'Exchanges both heat and moisture',
      efficiency: 'Up to 90% total energy recovery',
      climate: 'Best for humid climates',
      icon: Droplet
    }
  ]

  const blowerDoorProcess = [
    {
      step: 1,
      title: 'Preparation',
      description: 'Close all windows, doors, and intentional openings. Open all interior doors.'
    },
    {
      step: 2,
      title: 'Fan Installation',
      description: 'Install calibrated fan in main exterior door opening, typically covering entire doorway.'
    },
    {
      step: 3,
      title: 'Pressure Test',
      description: 'Generate 50 Pascals pressure difference between inside and outside.'
    },
    {
      step: 4,
      title: 'Measurement',
      description: 'Measure air leakage rate to calculate n50 (air changes per hour at 50 Pa).'
    },
    {
      step: 5,
      title: 'Leak Detection',
      description: 'Use thermal cameras or smoke to identify air infiltration points.'
    },
    {
      step: 6,
      title: 'Verification',
      description: 'Must achieve n50 ≤ 0.6 ACH for Passive House certification.'
    }
  ]

  const energySavings = [
    {
      metric: 'Heating/Cooling Energy',
      savings: '90% reduction',
      comparison: 'vs. conventional buildings'
    },
    {
      metric: 'Total Energy Use',
      savings: '60-70% reduction',
      comparison: 'vs. code minimum'
    },
    {
      metric: 'Peak Heating Load',
      savings: '75-90% reduction',
      comparison: 'Smaller HVAC systems needed'
    }
  ]

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-5xl mx-auto">
            <Link href="/learn">
              <Button variant="ghost" className="mb-6 font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK TO LEARN
              </Button>
            </Link>

            <div className="text-center space-y-6">
              <div className="inline-block px-6 py-3 rounded-full bg-theme-primary text-[var(--primary-foreground)] font-black text-sm uppercase mb-4">
                ULTRA-EFFICIENT BUILDING STANDARD
              </div>
              <h1 className="text-6xl md:text-7xl font-black text-[var(--foreground)]">
                PASSIVE HOUSE
              </h1>
              <p className="text-2xl font-bold text-theme-muted max-w-3xl mx-auto">
                The world's most rigorous voluntary energy-based standard - achieving up to 90% reduction in heating and cooling energy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-5xl mx-auto">
            <Card className="border-4 border-theme-primary shadow-theme-xl">
              <CardContent className="p-12">
                <div className="space-y-6 text-lg font-semibold text-[var(--foreground)]">
                  <p>
                    <span className="font-black text-theme-primary">Passive House (Passivhaus)</span> is a performance-based building standard that creates ultra-comfortable, energy-efficient buildings requiring minimal heating and cooling.
                  </p>
                  <p>
                    Originating in Germany, Passive House has become the <span className="font-black">gold standard for energy efficiency</span> worldwide, with buildings that use up to <span className="font-black text-theme-accent">90% less energy</span> than conventional construction.
                  </p>
                  <div className="pt-6 border-t-2 border-theme-muted">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-8 h-8 text-theme-primary" />
                      <h3 className="text-2xl font-black text-theme-primary">THE RESULT</h3>
                    </div>
                    <p className="text-xl font-black text-theme-accent">
                      Buildings so efficient they can be heated by body heat, sunlight, and everyday activities - with minimal active heating systems.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Five Principles */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center text-[var(--primary-foreground)]">
              FIVE CORE PRINCIPLES
            </h2>

            <div className="grid md:grid-cols-1 gap-6">
              {fivePrinciples.map((principle, idx) => (
                <Card key={idx} className="border-4 border-[var(--background)] bg-[var(--card)]/95 shadow-theme-2xl hover:scale-102 transition-transform">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[var(--${principle.color})] to-[var(--accent)] flex items-center justify-center shadow-theme-xl`}>
                        <principle.icon className="w-8 h-8 text-[var(--primary-foreground)]" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-2xl font-black mb-3 text-theme-${principle.color}`}>
                          {idx + 1}. {principle.title}
                        </h3>
                        <p className="text-lg font-bold text-[var(--foreground)] mb-2">
                          {principle.description}
                        </p>
                        <p className="text-base font-semibold text-theme-muted">
                          {principle.details}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Performance Standards */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center text-[var(--foreground)]">
              PERFORMANCE STANDARDS
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {performanceStandards.map((standard, idx) => (
                <Card key={idx} className="border-4 border-theme-primary shadow-theme-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black text-theme-primary">
                      {standard.standard}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-theme-primary text-[var(--primary-foreground)] rounded-lg">
                      <span className="font-bold">Requirement:</span>
                      <span className="text-2xl font-black">{standard.requirement}</span>
                    </div>
                    <div className="p-4 bg-[var(--muted)] rounded-lg">
                      <p className="text-sm font-bold text-theme-muted mb-2">Alternative:</p>
                      <p className="font-semibold text-[var(--foreground)]">{standard.alternative}</p>
                    </div>
                    <p className="text-base font-semibold text-theme-muted pt-2 border-t-2 border-theme-muted">
                      {standard.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Construction Techniques */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center text-[var(--foreground)]">
              MODERN CONSTRUCTION TECHNIQUES
            </h2>
            <p className="text-xl font-bold text-center text-theme-muted mb-12 max-w-3xl mx-auto">
              Factory-made systems reduce errors and offer greater precision in achieving airtightness and thermal performance
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {constructionTechniques.map((tech, idx) => (
                <Card key={idx} className="border-4 border-theme-accent hover:scale-105 transition-transform">
                  <CardContent className="p-8">
                    <tech.icon className="w-12 h-12 text-theme-accent mb-4" />
                    <h3 className="text-2xl font-black mb-3 text-theme-accent">{tech.technique}</h3>
                    <p className="text-base font-semibold text-[var(--foreground)] mb-4">{tech.description}</p>
                    <div className="pt-4 border-t-2 border-theme-muted">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-bold text-theme-accent">{tech.benefit}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Windows & Doors */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center text-[var(--foreground)]">
              HIGH-PERFORMANCE WINDOWS
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {windowDetails.map((detail, idx) => (
                <Card key={idx} className="border-4 border-theme-secondary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-black mb-3 text-theme-secondary">{detail.feature}</h3>
                    <p className="text-base font-semibold text-[var(--foreground)] mb-3">{detail.specification}</p>
                    <div className="flex items-start gap-2 pt-3 border-t-2 border-theme-muted">
                      <Gauge className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-bold text-theme-muted">{detail.performance}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-4 border-theme-secondary bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_10%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_20%,var(--background))]">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-theme-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-black mb-3 text-theme-secondary">CRITICAL: Window Position</h4>
                    <p className="text-base font-semibold text-[var(--foreground)]">
                      Windows must be positioned to line up with the insulation layer and minimize thermal bridging at the frame.
                      The gasket forms a tight seal when compressed in the locked position - testing in unlocked position can compromise results.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ventilation Systems */}
      <section className="py-20 bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_10%,var(--background))] to-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center text-[var(--foreground)]">
              HEAT RECOVERY VENTILATION
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {ventilationSystems.map((system, idx) => (
                <Card key={idx} className="border-4 border-theme-accent shadow-theme-xl">
                  <CardHeader>
                    <system.icon className="w-16 h-16 text-theme-accent mx-auto mb-4" />
                    <CardTitle className="text-3xl font-black text-center text-theme-accent">
                      {system.system}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-black uppercase text-theme-accent mb-2">Function</p>
                      <p className="text-base font-semibold text-[var(--foreground)]">{system.function}</p>
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase text-theme-accent mb-2">Efficiency</p>
                      <p className="text-lg font-black text-theme-primary">{system.efficiency}</p>
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase text-theme-accent mb-2">Best For</p>
                      <p className="text-base font-semibold text-[var(--foreground)]">{system.climate}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 border-4 border-theme-primary">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Wrench className="w-8 h-8 text-theme-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-black mb-3 text-theme-primary">DUCTLESS OPTIONS AVAILABLE</h4>
                    <p className="text-base font-semibold text-[var(--foreground)]">
                      Ductless HRV/ERV systems provide fresh air without extensive ductwork, perfect for retrofits or spaces where traditional installation is impractical.
                      Systems like Zehnder fit in 2×4 walls and exceed Passive House energy requirements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blower Door Testing */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center text-[var(--foreground)]">
              BLOWER DOOR TESTING
            </h2>
            <p className="text-xl font-bold text-center text-theme-muted mb-12 max-w-3xl mx-auto">
              Essential verification that the building meets airtightness requirements
            </p>

            <div className="space-y-4">
              {blowerDoorProcess.map((process, idx) => (
                <Card key={idx} className="border-4 border-theme-primary hover:border-theme-accent transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-[var(--primary-foreground)] text-xl font-black shadow-theme-xl">
                        {process.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-black mb-2 text-theme-primary">{process.title}</h3>
                        <p className="text-base font-semibold text-[var(--foreground)]">{process.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 border-4 border-theme-accent bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_10%,var(--background))] to-[color-mix(in_srgb,var(--accent)_20%,var(--background))]">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Eye className="w-8 h-8 text-theme-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-black mb-3 text-theme-accent">LEAK DETECTION TOOLS</h4>
                    <p className="text-base font-semibold text-[var(--foreground)]">
                      During testing, thermal cameras or smoke detectors visually identify air infiltration points. Common weak areas include:
                      joints, doors/windows, unsealed connections, and gaskets. Early detection allows for immediate fixes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Energy Savings */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center text-[var(--foreground)]">
              PROVEN ENERGY SAVINGS
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {energySavings.map((saving, idx) => (
                <Card key={idx} className="border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--background))] to-[color-mix(in_srgb,var(--primary)_20%,var(--background))] shadow-theme-xl text-center">
                  <CardContent className="p-8">
                    <Zap className="w-16 h-16 text-theme-primary mx-auto mb-4" />
                    <div className="text-5xl font-black text-theme-primary mb-4">{saving.savings}</div>
                    <h3 className="text-xl font-black mb-3 text-[var(--foreground)]">{saving.metric}</h3>
                    <p className="text-base font-semibold text-theme-muted">{saving.comparison}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-12 border-4 border-theme-secondary">
              <CardContent className="p-12 text-center">
                <Target className="w-20 h-20 text-theme-secondary mx-auto mb-6" />
                <h3 className="text-3xl font-black mb-4 text-theme-secondary">THE BOTTOM LINE</h3>
                <p className="text-2xl font-bold text-[var(--foreground)]">
                  Passive House buildings provide <span className="text-theme-primary">superior comfort</span>,
                  <span className="text-theme-accent"> exceptional air quality</span>, and
                  <span className="text-theme-secondary"> massive energy savings</span> -
                  making them the future of sustainable construction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Official Resources */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4 text-[var(--foreground)]">
                OFFICIAL PASSIVE HOUSE RESOURCES
              </h2>
              <p className="text-xl font-semibold text-theme-muted">
                Access official documentation and certification requirements
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <a href="https://passivehouse.com" target="_blank" rel="noopener noreferrer">
                <Card className="border-4 border-theme-primary hover:border-theme-accent transition-all hover-lift cursor-pointer h-full">
                  <CardContent className="p-8">
                    <ExternalLink className="w-12 h-12 text-theme-primary mb-4" />
                    <h3 className="text-2xl font-black mb-3 text-theme-primary">
                      PASSIVE HOUSE INSTITUTE
                    </h3>
                    <p className="text-base font-semibold text-theme-muted">
                      Official Passivhaus Institut (PHI) certification portal
                    </p>
                  </CardContent>
                </Card>
              </a>

              <a href="https://www.phius.org" target="_blank" rel="noopener noreferrer">
                <Card className="border-4 border-theme-accent hover:border-theme-primary transition-all hover-lift cursor-pointer h-full">
                  <CardContent className="p-8">
                    <ExternalLink className="w-12 h-12 text-theme-accent mb-4" />
                    <h3 className="text-2xl font-black mb-3 text-theme-accent">
                      PHIUS (US)
                    </h3>
                    <p className="text-base font-semibold text-theme-muted">
                      Passive House Institute US - North American standards
                    </p>
                  </CardContent>
                </Card>
              </a>

              <a href="https://passivehouse.com/04_phi/04_phi.htm" target="_blank" rel="noopener noreferrer">
                <Card className="border-4 border-theme-secondary hover:border-theme-accent transition-all hover-lift cursor-pointer h-full">
                  <CardContent className="p-8">
                    <FileText className="w-12 h-12 text-theme-secondary mb-4" />
                    <h3 className="text-2xl font-black mb-3 text-theme-secondary">
                      CERTIFICATION CRITERIA
                    </h3>
                    <p className="text-base font-semibold text-theme-muted">
                      Complete performance standards and requirements
                    </p>
                  </CardContent>
                </Card>
              </a>

              <a href="https://www.phius.org/phius-certification-for-buildings-and-products" target="_blank" rel="noopener noreferrer">
                <Card className="border-4 border-theme-primary hover:border-theme-accent transition-all hover-lift cursor-pointer h-full">
                  <CardContent className="p-8">
                    <Award className="w-12 h-12 text-theme-primary mb-4" />
                    <h3 className="text-2xl font-black mb-3 text-theme-primary">
                      CERTIFICATION PROCESS
                    </h3>
                    <p className="text-base font-semibold text-theme-muted">
                      Step-by-step guide to Passive House certification
                    </p>
                  </CardContent>
                </Card>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-5xl font-black text-[var(--primary-foreground)]">CONTINUE LEARNING</h2>
            <p className="text-2xl font-semibold text-[var(--primary-foreground)]">
              Explore more sustainable building certifications and techniques
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/learn/leed-certification">
                <Button size="lg" className="text-xl px-12 py-8 bg-[var(--background)] text-[var(--foreground)] hover:opacity-90 font-black shadow-theme-2xl rounded-2xl">
                  LEED CERTIFICATION
                </Button>
              </Link>
              <Link href="/learn/building-certifications">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black rounded-2xl">
                  OTHER CERTIFICATIONS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
