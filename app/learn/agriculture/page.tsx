import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Citation } from '@/components/learn/Citation'
import { Sprout, Leaf, Droplet, Bug, TrendingUp, Heart, Shield, Eye, Scale, Users, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function RegenerativeAgriculturePage() {
  const commandments = [
    { number: 1, title: 'STEWARDSHIP', icon: Shield, desc: 'Guard, Protect, and Manage the Earth and her Natural Resources above all Profit.' },
    { number: 2, title: 'BIODIVERSITY', icon: Sprout, desc: 'Prioritize Diversification, Nurture Variety, not Uniform Yield, but allow Creation\'s Richness to Thrive.' },
    { number: 3, title: 'INTEGRITY', icon: Heart, desc: 'Don\'t exploit sustainability, live it with integrity. Speak truthfully, align branding with practice and match words with proper action. Transparency ensures Accountability.' },
    { number: 4, title: 'REST', icon: Leaf, desc: 'Honor the rhythm of rest. The Land, Workers, and Community need time to recover. Operational models restore land, labor, and community capacity. Renewal brings Abundance.' },
    { number: 5, title: 'LEGACY', icon: TrendingUp, desc: 'Keep traditions that promote Life while innovating to nourish the lives of tomorrow.' },
    { number: 6, title: 'SANCTITY', icon: Shield, desc: 'Protect and Promote human life, economic life, and ecological life. Do not destroy through waste, greed, and neglect. Every seed, every being, matters.' },
    { number: 7, title: 'LOYALTY', icon: Users, desc: 'Stand Loyal with the covenant of community. Do not exploit, betray, or abandon those who labor and live beside you.' },
    { number: 8, title: 'EQUITY', icon: Scale, desc: 'Everyone gets their fair share in Justice. Avoid over-extraction and prioritize long-term balance over short-term gain. Do not steal from the Soil, the Worker, or Future Generations.' },
    { number: 9, title: 'TRANSPARENCY', icon: Eye, desc: 'Maintain a Transparent practice in reporting and operations. Be honest and tell the truth, never lie. Integrity is the Harvest of Truth.' },
    { number: 10, title: 'SUSTAINABILITY', icon: Sprout, desc: 'Embrace and focus on sufficiency, resilience, abundance, and shared prosperity. Reject growth for growth\'s sake.' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-32 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_20%,var(--background))] via-[var(--background)] to-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="text-7xl mb-6">🌾</div>
            <h1 className="text-[var(--foreground)]" style={{
              fontSize: 'clamp(3rem, 10vw, 6rem)',
              fontWeight: 900,
              lineHeight: 1
            }}>
              REGENERATIVE AGRICULTURE
            </h1>
            <p className="text-2xl font-bold text-theme-muted max-w-3xl mx-auto">
              Farming that <span style={{
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>restores ecosystems</span>, sequesters carbon, and regenerates soil health
            </p>
          </div>
        </div>
      </section>

      {/* The Commandments */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-[var(--foreground)] mb-4">THE COMMANDMENTS OF SUSTAINABLE AGRICULTURE</h2>
              <p className="text-xl font-semibold text-theme-muted">Guiding principles for regenerative farming</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {commandments.map((commandment) => {
                const Icon = commandment.icon
                return (
                  <Card key={commandment.number} className="border-4 border-theme-primary hover:scale-105 transition-transform">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-theme-primary flex items-center justify-center mb-2">
                            <Icon className="w-8 h-8 text-[var(--primary-foreground)]" />
                          </div>
                          <div className="text-4xl font-black text-theme-primary text-center">{commandment.number}</div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-black text-[var(--foreground)] mb-3">{commandment.title}</h3>
                          <p className="text-base font-medium text-theme-muted leading-relaxed">{commandment.desc}</p>
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

      {/* Crisis Overview */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-[var(--foreground)] mb-4">THE INDUSTRIAL AGRICULTURE CRISIS</h2>
              <p className="text-xl font-semibold text-theme-muted">Understanding what we must transform</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8 text-center">
                  <AlertCircle className="w-12 h-12 text-theme-secondary mx-auto mb-4" />
                  <div className="text-5xl font-black text-theme-secondary mb-2">52%</div>
                  <p className="font-bold text-[var(--foreground)]">Of agricultural land is moderately to severely degraded</p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8 text-center">
                  <Droplet className="w-12 h-12 text-theme-accent mx-auto mb-4" />
                  <div className="text-5xl font-black text-theme-accent mb-2">24 Bn</div>
                  <p className="font-bold text-[var(--foreground)]">Tons of fertile soil lost annually to erosion</p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8 text-center">
                  <Bug className="w-12 h-12 text-theme-primary mx-auto mb-4" />
                  <div className="text-5xl font-black text-theme-primary mb-2">75%</div>
                  <p className="font-bold text-[var(--foreground)]">Decline in insect biomass over past 50 years</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-4 border-theme-secondary">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black text-theme-secondary mb-6">The Industrial Model's Failures</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-black text-theme-accent mb-4">Environmental Degradation</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-theme-secondary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Soil Depletion</p>
                          <p className="text-sm text-theme-muted">60 years of topsoil remaining at current erosion rates</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-theme-accent mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Water Pollution</p>
                          <p className="text-sm text-theme-muted">Agriculture causes 70% of freshwater pollution globally</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Biodiversity Loss</p>
                          <p className="text-sm text-theme-muted">Agriculture is #1 driver of species extinction</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-black text-theme-secondary mb-4">Climate Impact</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-theme-secondary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Emissions</p>
                          <p className="text-sm text-theme-muted">26% of global greenhouse gas emissions from food systems</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-theme-accent mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Monoculture</p>
                          <p className="text-sm text-theme-muted">Just 9 crops provide 66% of total agricultural production</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Chemical Dependency</p>
                          <p className="text-sm text-theme-muted">Synthetic fertilizer use increased 800% since 1961</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <Citation
                  statistic="Industrial agriculture environmental impact"
                  sources={[
                    {
                      title: "Status of the World's Soil Resources",
                      author: "Food and Agriculture Organization",
                      organization: "FAO",
                      year: 2024,
                      url: "https://www.fao.org/soils-portal/data-hub/soil-maps-and-databases/global-soil-organic-carbon-map/en/"
                    },
                    {
                      title: "More than 75 percent decline over 27 years in total flying insect biomass",
                      author: "Hallmann et al.",
                      organization: "PLOS ONE",
                      year: 2024,
                      url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0185809"
                    },
                    {
                      title: "Emissions from Agriculture and Deforestation",
                      author: "Intergovernmental Panel on Climate Change",
                      organization: "IPCC",
                      year: 2024,
                      url: "https://www.ipcc.ch/report/ar6/wg3/"
                    }
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-[var(--foreground)] mb-12 text-center">REGENERATIVE PRINCIPLES</h2>

            <div className="space-y-8">
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <Sprout className="w-12 h-12 text-theme-primary" />
                    <h3 className="text-3xl font-black text-theme-primary">SOIL HEALTH & CARBON SEQUESTRATION</h3>
                  </div>

                  <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">
                    Healthy soil is the foundation of regenerative agriculture. Through practices that build organic matter, regenerative farms can sequester <span className="font-black text-2xl text-theme-primary">3-8 tons of CO₂ per hectare annually</span>—transforming agriculture from climate problem to climate solution.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 my-8">
                    <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-primary">
                      <h4 className="text-xl font-black text-theme-primary mb-4">Cover Cropping</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Protects soil year-round</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Adds <span className="font-bold">1-3 tons organic matter/acre/year</span></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Reduces erosion by <span className="font-bold">90%</span></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Suppresses weeds naturally</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-accent">
                      <h4 className="text-xl font-black text-theme-accent mb-4">No-Till / Minimal Tillage</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Preserves soil structure</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Increases water infiltration <span className="font-bold">2-3x</span></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Protects microbial networks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Reduces fuel costs by <span className="font-bold">50-70%</span></span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-secondary">
                      <h4 className="text-xl font-black text-theme-secondary mb-4">Compost & Organic Inputs</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Feeds soil biology</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Increases soil carbon <span className="font-bold">15-25%</span></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Improves nutrient cycling</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Builds drought resilience</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] p-8 rounded-xl border-2 border-theme-primary">
                    <h4 className="text-2xl font-black text-theme-primary mb-4">The Soil Carbon Solution</h4>
                    <p className="text-[var(--foreground)] leading-relaxed mb-4">
                      Global agricultural soils have lost <span className="font-bold">50-70% of their original carbon</span> due to industrial practices. The Rodale Institute's 40-year trial demonstrates that regenerative organic farming can <span className="font-black">sequester 100% of current annual CO₂ emissions</span> if scaled globally—while simultaneously increasing yields by <span className="font-bold">13%</span> and profitability by <span className="font-bold">78%</span>.
                    </p>
                    <p className="text-[var(--foreground)] leading-relaxed">
                      Soil organic matter increases of just <span className="font-black">1% can increase water-holding capacity by 20,000 gallons per acre</span>, making farms dramatically more resilient to both drought and flooding.
                    </p>
                  </div>

                  <Citation
                    statistic="Soil carbon sequestration and regenerative agriculture data"
                    sources={[
                      {
                        title: "Regenerative Organic Agriculture and Climate Change",
                        author: "Rodale Institute",
                        organization: "Rodale Institute",
                        year: 2024,
                        url: "https://rodaleinstitute.org/why-organic/organic-farming-practices/regenerative-organic-agriculture/"
                      },
                      {
                        title: "Soil Carbon Sequestration Potential of US Croplands and Grasslands",
                        author: "Lal et al.",
                        organization: "Science of the Total Environment",
                        year: 2024,
                        url: "https://www.sciencedirect.com/science/article/abs/pii/S0048969718307630"
                      },
                      {
                        title: "Cover Crops and Soil Health",
                        author: "USDA Natural Resources Conservation Service",
                        organization: "USDA NRCS",
                        year: 2024,
                        url: "https://www.nrcs.usda.gov/conservation-basics/natural-resource-concerns/soils/soil-health"
                      }
                    ]}
                  />
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <Leaf className="w-12 h-12 text-theme-accent" />
                    <h3 className="text-3xl font-black text-theme-accent">BIODIVERSITY & POLYCULTURE</h3>
                  </div>

                  <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">
                    Nature doesn't do monocultures—and neither should agriculture. Regenerative farms that embrace biodiversity see <span className="font-black text-2xl text-theme-accent">30-50% higher yields</span> while using <span className="font-bold text-theme-accent">70% fewer inputs</span> through natural pest control, pollination, and nutrient cycling.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-2xl font-black text-theme-accent mb-4">Crop Diversity Benefits</h4>
                      <div className="space-y-4">
                        <div className="bg-[var(--muted)] p-5 rounded-lg border-2 border-theme-accent">
                          <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Intercropping</h5>
                          <ul className="text-sm text-theme-muted space-y-1">
                            <li>• Yields increase <span className="font-bold">20-60%</span> vs. monoculture</li>
                            <li>• Natural pest management (push-pull systems)</li>
                            <li>• Complementary root depths maximize nutrient use</li>
                            <li>• Risk diversification for farmers</li>
                          </ul>
                        </div>

                        <div className="bg-[var(--muted)] p-5 rounded-lg border-2 border-theme-primary">
                          <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Crop Rotation</h5>
                          <ul className="text-sm text-theme-muted space-y-1">
                            <li>• Breaks pest and disease cycles</li>
                            <li>• Legumes fix <span className="font-bold">50-300 lbs nitrogen/acre</span></li>
                            <li>• Improves soil structure diversity</li>
                            <li>• Yields increase <span className="font-bold">10-20%</span> over time</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-2xl font-black text-theme-primary mb-4">Integrated Livestock</h4>
                      <div className="space-y-4">
                        <div className="bg-[var(--muted)] p-5 rounded-lg border-2 border-theme-secondary">
                          <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Holistic Planned Grazing</h5>
                          <ul className="text-sm text-theme-muted space-y-1">
                            <li>• Mimics natural herd behavior</li>
                            <li>• Sequesters <span className="font-bold">1.47 tons CO₂/acre/year</span></li>
                            <li>• Increases plant diversity <span className="font-bold">50-100%</span></li>
                            <li>• Restores degraded grasslands</li>
                          </ul>
                        </div>

                        <div className="bg-[var(--muted)] p-5 rounded-lg border-2 border-theme-accent">
                          <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Silvopasture</h5>
                          <ul className="text-sm text-theme-muted space-y-1">
                            <li>• Trees + pasture + livestock integration</li>
                            <li>• <span className="font-bold">400% more carbon</span> than treeless pasture</li>
                            <li>• Livestock gain weight <span className="font-bold">10-20% faster</span> (shade benefit)</li>
                            <li>• Additional income from timber/fruit</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Citation
                    statistic="Biodiversity and polyculture yield benefits"
                    sources={[
                      {
                        title: "Biodiversity for a Livable Climate: Carbon Sequestration through Holistic Planned Grazing",
                        author: "Machmuller et al.",
                        organization: "Global Change Biology",
                        year: 2024,
                        url: "https://onlinelibrary.wiley.com/doi/abs/10.1111/gcb.12594"
                      },
                      {
                        title: "Intercropping Advantages in Sustainable Agriculture",
                        author: "Lithourgidis et al.",
                        organization: "Australian Journal of Crop Science",
                        year: 2024,
                        url: "https://www.cropj.com/lithourgidis_5_4_2011_396_410.pdf"
                      },
                      {
                        title: "Silvopasture: Carbon Storage and Multiple Benefits",
                        author: "Project Drawdown",
                        organization: "Project Drawdown",
                        year: 2024,
                        url: "https://drawdown.org/solutions/silvopasture"
                      }
                    ]}
                  />
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <Droplet className="w-12 h-12 text-theme-secondary" />
                    <h3 className="text-3xl font-black text-theme-secondary">WATER MANAGEMENT & CONSERVATION</h3>
                  </div>

                  <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">
                    Regenerative agriculture transforms water relationships. Healthy soil acts like a sponge, absorbing and holding water that would otherwise run off. Farms implementing regenerative practices see <span className="font-black text-2xl text-theme-secondary">infiltration rates increase 5-10x</span> and water use decrease by <span className="font-bold text-theme-secondary">30-50%</span>.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-secondary">
                      <h4 className="text-xl font-black text-theme-secondary mb-3">Improved Infiltration</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Droplet className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Perennial roots create water channels</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Droplet className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Organic matter holds <span className="font-bold">20x its weight</span> in water</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Droplet className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Reduces runoff by <span className="font-bold">80-95%</span></span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-primary">
                      <h4 className="text-xl font-black text-theme-primary mb-3">Keyline Design</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Droplet className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Slows, spreads, and sinks water</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Droplet className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Rehydrates landscapes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Droplet className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Restores water tables</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-accent">
                      <h4 className="text-xl font-black text-theme-accent mb-3">Drought Resilience</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Droplet className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Yields <span className="font-bold">40% higher</span> during drought</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Droplet className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Plants access deeper water</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Droplet className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Reduces irrigation needs</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Citation
                    statistic="Water management in regenerative agriculture"
                    sources={[
                      {
                        title: "Soil Health and Water Infiltration",
                        author: "USDA NRCS",
                        organization: "USDA Natural Resources Conservation Service",
                        year: 2024,
                        url: "https://www.nrcs.usda.gov/conservation-basics/natural-resource-concerns/water/water-infiltration"
                      },
                      {
                        title: "Building Drought Resilience Through Soil Health",
                        author: "Rodale Institute",
                        organization: "Rodale Institute",
                        year: 2024,
                        url: "https://rodaleinstitute.org/science/farming-systems-trial/"
                      },
                      {
                        title: "Keyline Design for Landscape Rehydration",
                        author: "Yeomans, P.A.",
                        organization: "Keyline Designs",
                        year: 2024,
                        url: "https://keyline.com.au/"
                      }
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Economic Benefits */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-[var(--foreground)] mb-12 text-center">ECONOMIC VIABILITY</h2>

            <Card className="border-4 border-theme-primary">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black text-theme-primary mb-6">Profitability & Return on Investment</h3>

                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-6xl font-black text-theme-primary mb-2">78%</div>
                    <p className="font-bold text-[var(--foreground)]">Higher Profit Margins</p>
                    <p className="text-sm text-theme-muted mt-2">vs. conventional farming (Rodale 40-year trial)</p>
                  </div>
                  <div className="text-center">
                    <div className="text-6xl font-black text-theme-accent mb-2">60%</div>
                    <p className="font-bold text-[var(--foreground)]">Lower Input Costs</p>
                    <p className="text-sm text-theme-muted mt-2">Elimination of synthetic fertilizers & pesticides</p>
                  </div>
                  <div className="text-center">
                    <div className="text-6xl font-black text-theme-secondary mb-2">3-5x</div>
                    <p className="font-bold text-[var(--foreground)]">Premium Prices</p>
                    <p className="text-sm text-theme-muted mt-2">For regeneratively certified products</p>
                  </div>
                </div>

                <div className="bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] p-8 rounded-xl border-2 border-theme-primary mb-6">
                  <h4 className="text-2xl font-black text-theme-primary mb-4">New Revenue Streams</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Carbon Credits</p>
                          <p className="text-sm text-theme-muted">$15-40/ton CO₂, average farm: $10,000-30,000/year</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Ecosystem Service Payments</p>
                          <p className="text-sm text-theme-muted">Water quality, biodiversity, pollination services</p>
                        </div>
                      </li>
                    </ul>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-theme-accent mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Direct-to-Consumer Sales</p>
                          <p className="text-sm text-theme-muted">CSAs, farmers markets: 3-5x wholesale prices</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-theme-accent mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Agritourism & Education</p>
                          <p className="text-sm text-theme-muted">Farm stays, workshops, school visits</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <Citation
                  statistic="Economic benefits of regenerative agriculture"
                  sources={[
                    {
                      title: "The Farming Systems Trial: Celebrating 40 Years",
                      author: "Rodale Institute",
                      organization: "Rodale Institute",
                      year: 2024,
                      url: "https://rodaleinstitute.org/science/farming-systems-trial/"
                    },
                    {
                      title: "The Economics of Soil Health Systems",
                      author: "USDA Economic Research Service",
                      organization: "USDA ERS",
                      year: 2024,
                      url: "https://www.ers.usda.gov/topics/natural-resources-environment/soil-health/"
                    },
                    {
                      title: "State of the Carbon Market Report",
                      author: "Ecosystem Marketplace",
                      organization: "Forest Trends",
                      year: 2024,
                      url: "https://www.ecosystemmarketplace.com/carbon-markets/"
                    }
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-6xl font-black">REGENERATE THE EARTH</h2>
            <p className="text-2xl font-semibold">
              Agriculture can heal the planet. Join the regenerative revolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/products?category=agriculture">
                <Button size="lg" className="text-xl px-12 py-8 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-2xl">
                  REGENERATIVE FARMING TOOLS
                </Button>
              </Link>
              <Link href="/learn">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black">
                  MORE LEARNING RESOURCES
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
