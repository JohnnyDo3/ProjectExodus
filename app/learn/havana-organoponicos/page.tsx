import { Card, CardContent } from '@/components/ui/Card'
import { Citation } from '@/components/learn/Citation'
import { BackButton } from '@/components/navigation/BackButton'
import {
  Sprout,
  Users,
  TrendingUp,
  Leaf,
  Droplet,
  Shield,
  Building2,
  Globe,
  Heart,
  Award,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

export default function HavanaOrganoponicosPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-32 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-theme-xl">
                <Sprout className="w-12 h-12 text-[var(--primary-foreground)]" />
              </div>
            </div>
            <div className="inline-block px-6 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full text-sm font-black mb-4">
              CASE STUDY
            </div>
            <h1 className="text-[var(--foreground)]" style={{
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1.1
            }}>
              URBAN AGRICULTURE: ORGANOPÓNICOS
            </h1>
            <p className="text-3xl font-black text-theme-primary">
              Havana, Cuba
            </p>
            <p className="text-xl font-semibold text-theme-muted max-w-3xl mx-auto">
              How crisis sparked innovation: Transforming vacant city spaces into thriving centers of <span style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>food production and community life</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-theme-muted">
              <span>Dylan Harvey</span>
              <span>•</span>
              <span>Selin Kahyaoglu</span>
              <span>•</span>
              <span>Julia Resnick</span>
              <span>•</span>
              <span>Stefan Rogowski</span>
            </div>
            <p className="text-sm font-semibold text-theme-muted">
              Sustainable Built Environment (ARCH-662) - Fall 2025
            </p>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-primary">
              <CardContent className="p-12">
                <h2 className="text-4xl font-black mb-6 text-[var(--foreground)]">From Crisis to Global Model</h2>
                <div className="space-y-6 text-lg font-medium text-theme-muted leading-relaxed">
                  <p>
                    The Organopónicos of Havana represent one of the most remarkable examples of urban resilience and sustainability in the modern era. Developed in response to the severe food shortages that followed Cuba's "Special Period" in the early 1990s, these urban gardens transformed vacant city spaces into thriving centers of food production and community life.
                  </p>
                  <p>
                    Built on principles of <span className="font-bold text-[var(--foreground)]">organic farming, self-sufficiency and ecological care</span>, the Organopónicos redefined how a dense urban environment could feed itself with limited resources. What began as a survival strategy during a time of crisis evolved into <span className="font-bold text-[var(--foreground)]">a global model for sustainable urban agriculture</span>, demonstrating the power of community-driven adaptation and ecological resilience.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Historical Context */}
      <section className="py-24 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-[var(--foreground)] mb-4">THE SPECIAL PERIOD CRISIS</h2>
              <p className="text-xl font-semibold text-theme-muted">Necessity drives innovation</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-theme-secondary">The Challenge</h3>
                  <div className="space-y-4 text-base font-medium text-theme-muted">
                    <p>
                      When the Soviet Union collapsed in 1991, Cuba lost critical agricultural imports: <span className="font-bold text-[var(--foreground)]">fuel, fertilizer, and food</span>. Havana faced the urgent problem of feeding its dense urban population with limited transport resources.
                    </p>
                    <p className="font-bold text-theme-secondary">
                      Multiple crises converged:
                    </p>
                    <ul className="space-y-2 ml-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <span>Food insecurity across urban centers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <span>Widespread unemployment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <span>Environmental degradation in vacant lots</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <span>No access to synthetic chemicals or machinery</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-theme-primary">The Response</h3>
                  <div className="space-y-4 text-base font-medium text-theme-muted">
                    <p>
                      The initiative transformed <span className="font-bold text-[var(--foreground)]">underused urban land</span>—empty lots, rooftops, and roadside areas—into highly productive organic gardens. These gardens addressed all urban issues simultaneously.
                    </p>
                    <p className="font-bold text-theme-primary">
                      Core sustainability principles:
                    </p>
                    <ul className="space-y-2 ml-6">
                      <li className="flex items-start gap-2">
                        <Leaf className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span><span className="font-bold">Compost & crop rotation</span> instead of synthetic chemicals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Leaf className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span><span className="font-bold">Biological pest control</span> for healthy ecosystems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Leaf className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span><span className="font-bold">Self-sufficiency</span> reducing import dependency</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Leaf className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span><span className="font-bold">Community resilience</span> through shared labor</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Key Innovations */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-[var(--foreground)] mb-4">KEY INNOVATIONS</h2>
              <p className="text-xl font-semibold text-theme-muted">Sustainable, high-yield farms within the urban environment</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_srgb,var(--primary)_80%,black)] flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-[var(--primary-foreground)]" />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-[var(--foreground)] text-center">RAISED-BED GARDENS</h3>
                  <p className="text-sm font-medium text-theme-muted text-center">
                    Built using organic matter and compost as base layers. As decomposition formed living ecosystems, the original contaminated city soil became increasingly fertile.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_80%,black)] flex items-center justify-center">
                    <Droplet className="w-8 h-8 text-[var(--primary-foreground)]" />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-[var(--foreground)] text-center">DRIP IRRIGATION</h3>
                  <p className="text-sm font-medium text-theme-muted text-center">
                    Water recycling systems adapted to maximize efficiency. With limited water access, farmers innovated to maintain optimal growing conditions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[color-mix(in_srgb,var(--secondary)_80%,black)] flex items-center justify-center">
                    <Sprout className="w-8 h-8 text-[var(--primary-foreground)]" />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-[var(--foreground)] text-center">AGROECOLOGY</h3>
                  <p className="text-sm font-medium text-theme-muted text-center">
                    Biological pest control for aphids, crop rotation techniques to protect plants. Chemical-free methods ensured successful harvests and healthy soil.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_srgb,var(--primary)_80%,black)] flex items-center justify-center">
                    <Users className="w-8 h-8 text-[var(--primary-foreground)]" />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-[var(--foreground)] text-center">COMMUNITY PARTICIPATION</h3>
                  <p className="text-sm font-medium text-theme-muted text-center">
                    Government support through land usufruct rights, "seed houses" for education, and legalized direct sales between producers and consumers.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_80%,black)] flex items-center justify-center">
                    <Shield className="w-8 h-8 text-[var(--primary-foreground)]" />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-[var(--foreground)] text-center">ORGANIC ALTERNATIVES</h3>
                  <p className="text-sm font-medium text-theme-muted text-center">
                    With imported agrochemicals illegal, Cubans utilized organic alternatives that proved more beneficial than synthetic options.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[color-mix(in_srgb,var(--secondary)_80%,black)] flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-[var(--primary-foreground)]" />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-[var(--foreground)] text-center">EDUCATION PROGRAMS</h3>
                  <p className="text-sm font-medium text-theme-muted text-center">
                    Extensive extension programs provided technical assistance and agronomy training to residents with no prior agricultural experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-[var(--foreground)] mb-4">REMARKABLE RESULTS</h2>
              <p className="text-xl font-semibold text-theme-muted">From survival to sustainability</p>
            </div>

            <Card className="border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--background))] to-[var(--background)] mb-8">
              <CardContent className="p-10">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-5xl font-black text-theme-primary mb-2">35,000</div>
                    <p className="text-sm font-bold text-theme-muted">Hectares under urban/suburban agriculture nationwide</p>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-theme-primary mb-2">200,000</div>
                    <p className="text-sm font-bold text-theme-muted">Tons of produce annually at peak</p>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-theme-primary mb-2">30,000+</div>
                    <p className="text-sm font-bold text-theme-muted">Urban farmers employed</p>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-theme-primary mb-2">50-60%</div>
                    <p className="text-sm font-bold text-theme-muted">Of Havana's vegetable consumption from local production</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-4 border-theme-accent">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black mb-6 text-theme-accent">🌱 Agricultural Performance</h3>
                <div className="space-y-4 text-base font-medium text-theme-muted">
                  <p>
                    <span className="font-bold text-[var(--foreground)]">Leafy greens yielding 15-20 kg/m²/year</span>—one of the highest rates in Latin America
                  </p>
                  <p>
                    Dramatic reduction in dependence on imported food and long-distance transport
                  </p>
                  <p>
                    Cleaner soils, restored pollinator populations, and healthier urban ecosystems
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Governance & Financing */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-[var(--foreground)] mb-4">GOVERNANCE & FINANCING</h2>
              <p className="text-xl font-semibold text-theme-muted">Hybrid model combining state, cooperative, and private operation</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-theme-primary">Initial Phase (1990s)</h3>
                  <div className="space-y-3 text-base font-medium text-theme-muted">
                    <p>
                      <span className="font-bold text-theme-primary">Government-led:</span> Ministry of Agriculture (MINAGRI) coordinated response
                    </p>
                    <p>
                      <span className="font-bold text-theme-primary">State provided:</span> Land access, infrastructure, technical support
                    </p>
                    <p>
                      <span className="font-bold text-theme-primary">International aid:</span> NGOs supplied tools and seeds
                    </p>
                    <p>
                      <span className="font-bold text-theme-primary">Subsidized startups:</span> Ensured farmers could establish operations
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-theme-accent">Evolved Model (2000s+)</h3>
                  <div className="space-y-3 text-base font-medium text-theme-muted">
                    <p>
                      <span className="font-bold text-theme-accent">Decentralized:</span> State-managed, cooperative, and private gardens
                    </p>
                    <p>
                      <span className="font-bold text-theme-accent">Self-sustaining:</span> Small cooperatives sell directly to consumers/markets
                    </p>
                    <p>
                      <span className="font-bold text-theme-accent">Low external inputs:</span> Recycling organic waste makes farms economically viable
                    </p>
                    <p>
                      <span className="font-bold text-theme-accent">Community-based:</span> Shared responsibility and sustainable resource management
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Global Replicability */}
      <section className="py-24 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-[var(--foreground)] mb-4">GLOBAL REPLICABILITY</h2>
              <p className="text-xl font-semibold text-theme-muted">How cities worldwide can adapt this model</p>
            </div>

            <Card className="border-4 border-theme-secondary mb-8">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black mb-6 text-theme-secondary">Why It Works Everywhere</h3>
                <div className="space-y-4 text-lg font-medium text-theme-muted">
                  <p>
                    This initiative can be widely adapted globally to promote <span className="font-bold text-[var(--foreground)]">urban resiliency</span>, as resilience is directly embedded in its design. Essential resources such as food and oil were in short supply when Cuba adapted the organopónicos, which is an increasing issue in many countries today due to climate change impacts.
                  </p>
                  <p className="font-bold text-theme-secondary">
                    Universal benefits:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <Globe className="w-5 h-5 text-theme-secondary mt-1 flex-shrink-0" />
                      <span><span className="font-bold">Boosts local economies</span> through employment and reduced import costs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Globe className="w-5 h-5 text-theme-secondary mt-1 flex-shrink-0" />
                      <span><span className="font-bold">Improves food security</span> in dense urban centers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Globe className="w-5 h-5 text-theme-secondary mt-1 flex-shrink-0" />
                      <span><span className="font-bold">Enhances social infrastructure</span> through community participation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Globe className="w-5 h-5 text-theme-secondary mt-1 flex-shrink-0" />
                      <span><span className="font-bold">Reduces fossil fuel dependency</span> through manual labor and local production</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Globe className="w-5 h-5 text-theme-secondary mt-1 flex-shrink-0" />
                      <span><span className="font-bold">Creates biodiversity</span> through polyculture and organic methods</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-4 border-theme-primary">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black mb-6 text-theme-primary">Case Study: Rochester, NY Adaptation</h3>
                <div className="space-y-4 text-base font-medium text-theme-muted">
                  <p>
                    Both Rochester and Havana share post-industrial landscapes with <span className="font-bold text-[var(--foreground)]">vacant lots, underused land, and food insecurity</span> in low-income neighborhoods, making urban agriculture a relevant tool for community revitalization.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-black text-[var(--foreground)] mb-3">Required Adaptations:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span>Greenhouses, hoop houses, cold frames for cold weather</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span>Local composting programs and distribution networks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span>Partnerships with universities/schools/nonprofits for training</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span>Municipal incentives: land access, water credits, tax abatements</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-black text-[var(--foreground)] mb-3">Transferable Principles:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Heart className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span>Community-driven, low-cost structure</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Heart className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span>Ecologically sustainable closed-loop systems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Heart className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span>Improved food access in underserved neighborhoods</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Heart className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span>Local employment and neighborhood cohesion</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Resilience Assessment */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-[var(--foreground)] mb-4">RESILIENCE ASSESSMENT</h2>
              <p className="text-xl font-semibold text-theme-muted">Evaluated using Sherwood Design Engineers' stages of increasing resilience</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="inline-block px-4 py-1 bg-theme-primary text-[var(--primary-foreground)] rounded-full text-xs font-black mb-3">
                      LEVEL 4
                    </div>
                    <h3 className="text-xl font-black text-theme-primary">COMMUNITY</h3>
                  </div>
                  <p className="text-sm font-medium text-theme-muted text-center">
                    <span className="font-bold">Regenerative Design</span> - Long-term economic, educational, and social benefits achieved
                  </p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="inline-block px-4 py-1 bg-theme-accent text-[var(--primary-foreground)] rounded-full text-xs font-black mb-3">
                      LEVEL 2
                    </div>
                    <h3 className="text-xl font-black text-theme-accent">BIODIVERSITY</h3>
                  </div>
                  <p className="text-sm font-medium text-theme-muted text-center">
                    <span className="font-bold">Sustainable Sourcing</span> - Variety of vegetation, polyculture, restored ecosystems
                  </p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="inline-block px-4 py-1 bg-theme-secondary text-[var(--primary-foreground)] rounded-full text-xs font-black mb-3">
                      LEVEL 2
                    </div>
                    <h3 className="text-xl font-black text-theme-secondary">MATERIALS</h3>
                  </div>
                  <p className="text-sm font-medium text-theme-muted text-center">
                    <span className="font-bold">Sustainable Sourcing</span> - Raised beds, manpower, composting, recycled organic waste
                  </p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-primary">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="inline-block px-4 py-1 bg-theme-primary text-[var(--primary-foreground)] rounded-full text-xs font-black mb-3">
                      LEVEL 1
                    </div>
                    <h3 className="text-xl font-black text-theme-primary">WATER</h3>
                  </div>
                  <p className="text-sm font-medium text-theme-muted text-center">
                    <span className="font-bold">Reduce Harm</span> - Drip irrigation, rainwater harvesting, efficient use
                  </p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="inline-block px-4 py-1 bg-theme-accent text-[var(--primary-foreground)] rounded-full text-xs font-black mb-3">
                      LEVEL 1
                    </div>
                    <h3 className="text-xl font-black text-theme-accent">ENERGY</h3>
                  </div>
                  <p className="text-sm font-medium text-theme-muted text-center">
                    <span className="font-bold">Reduce Harm</span> - Manual labor, minimal machinery, local production
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-24 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-primary">
              <CardContent className="p-12">
                <div className="flex items-center gap-4 mb-6">
                  <Award className="w-12 h-12 text-theme-primary" />
                  <h2 className="text-4xl font-black text-[var(--foreground)]">CONCLUSION</h2>
                </div>
                <div className="space-y-6 text-lg font-medium text-theme-muted leading-relaxed">
                  <p>
                    Havana's Organopónicos stand as a powerful example of how <span className="font-bold text-[var(--foreground)]">necessity can drive innovation and resilience</span>. What began as an emergency response to economic crisis became a long-term model for food security, ecological restoration and social empowerment.
                  </p>
                  <p>
                    Through <span className="font-bold text-[var(--foreground)]">cooperative governance, organic farming methods and community participation</span>, Havana reimagined its urban landscape as both productive and sustainable. The success of this system continues to inspire cities around the world facing similar challenges of climate change, resource scarcity and food inequality.
                  </p>
                  <p className="text-xl font-bold text-theme-primary">
                    With careful adaptation to local conditions, the principles behind the Organopónicos—self-reliance, ecological stewardship and social cooperation—can offer a pathway toward more resilient and sustainable urban futures.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-[var(--foreground)] mb-8 text-center">REFERENCES</h2>
            <Citation
              sources={[
                {
                  title: "The Greening of the 'Barrios': Urban Agriculture for Food Security in Cuba",
                  author: "Altieri, Miguel A., Fernando R. Funes-Monzote, and Paulo Petersen",
                  organization: "Agriculture and Human Values 16, no. 2",
                  year: 1999,
                  url: "https://ideas.repec.org/a/spr/agrhuv/v16y1999i2p131-140.html"
                },
                {
                  title: "Urban Agriculture in Havana: Evidence from Empirical Research",
                  author: "Górna, Ada, and Krzysztof Górny",
                  organization: "Miscellanea Geographica – Regional Studies on Development 24, no. 2",
                  year: 2020,
                  url: "https://doi.org/10.2478/mgrsd-2020-0012"
                },
                {
                  title: "Food Security through Urban Agriculture in Havana, Cuba",
                  author: "Metropolis",
                  organization: "Use: Metropolis",
                  year: 2025,
                  url: "https://use.metropolis.org/case-studies/food-security-through-urban-agriculture-in-havana-cuba"
                },
                {
                  title: "Havana Homegrown: Inside Cuba's Urban Agriculture Revolution",
                  author: "Seed Money",
                  organization: "YouTube Documentary",
                  year: 2010,
                  url: "https://youtu.be/iGuipXzxPFY"
                },
                {
                  title: "Urban Farm-Fed Cities: Lessons from Cuba's Organopónicos",
                  author: "SAGE Magazine",
                  organization: "SAGE Magazine",
                  year: 2018,
                  url: "https://sagemagazine.org/urban-farm-fed-cities-lessons-from-cubas-organoponicos/"
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-6xl font-black">BRING ORGANOPÓNICOS TO YOUR CITY</h2>
            <p className="text-2xl font-semibold">
              Every city can transform vacant lots into thriving food centers.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/learn/agriculture">
                <button className="text-xl px-12 py-8 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-2xl rounded-xl">
                  LEARN REGENERATIVE AGRICULTURE
                </button>
              </Link>
              <Link href="/learn/success-stories">
                <button className="text-xl px-12 py-8 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black rounded-xl">
                  MORE SUCCESS STORIES
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
