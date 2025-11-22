import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Citation } from '@/components/learn/Citation'
import { BackButton } from '@/components/navigation/BackButton'
import { Home, Sun, Droplet, Wind, TrendingDown, Leaf, Zap, CheckCircle, Award, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default function GreenBuildingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-32 bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_20%,var(--background))] via-[var(--background)] to-[color-mix(in_srgb,var(--primary)_20%,var(--background))] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="text-7xl mb-6">🏡</div>
            <h1 className="text-[var(--foreground)]" style={{
              fontSize: 'clamp(3rem, 10vw, 6rem)',
              fontWeight: 900,
              lineHeight: 1
            }}>
              GREEN BUILDING
            </h1>
            <p className="text-2xl font-bold text-theme-muted max-w-3xl mx-auto">
              Designing and constructing <span style={{
                background: 'linear-gradient(135deg, var(--accent), var(--primary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>healthy, efficient, and resilient</span> buildings for a sustainable future
            </p>
          </div>
        </div>
      </section>

      {/* Buildings & Climate */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-[var(--foreground)] mb-4">BUILDINGS & THE CLIMATE CRISIS</h2>
              <p className="text-xl font-semibold text-theme-muted">Why green building matters</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8 text-center">
                  <Home className="w-12 h-12 text-theme-secondary mx-auto mb-4" />
                  <div className="text-5xl font-black text-theme-secondary mb-2">39%</div>
                  <p className="font-bold text-[var(--foreground)]">Global energy-related CO₂ emissions from buildings</p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8 text-center">
                  <Zap className="w-12 h-12 text-theme-accent mx-auto mb-4" />
                  <div className="text-5xl font-black text-theme-accent mb-2">36%</div>
                  <p className="font-bold text-[var(--foreground)]">Global final energy consumption from buildings</p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8 text-center">
                  <TrendingDown className="w-12 h-12 text-theme-primary mx-auto mb-4" />
                  <div className="text-5xl font-black text-theme-primary mb-2">80%</div>
                  <p className="font-bold text-[var(--foreground)]">Potential emissions reduction through green building by 2050</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-4 border-theme-secondary">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black text-theme-secondary mb-6">The Building Sector Challenge</h3>

                <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">
                  Buildings are responsible for <span className="font-black text-2xl text-theme-secondary">39% of global CO₂ emissions</span> when accounting for both operational energy (heating, cooling, lighting) and embodied carbon (materials, construction). With <span className="font-bold text-theme-secondary">2.4 trillion square feet</span> of new floor area expected by 2060—equivalent to adding an entire New York City to the world every month for 40 years—how we build will define our climate future.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-secondary">
                    <h4 className="text-xl font-black text-theme-secondary mb-4">Operational Emissions (28%)</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Heating & Cooling: <span className="font-bold">48% of building energy</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Lighting: <span className="font-bold">11% of electricity use</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Water Heating: <span className="font-bold">18% residential energy</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Appliances & Plug Loads: <span className="font-bold">23% commercial</span></span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-primary">
                    <h4 className="text-xl font-black text-theme-primary mb-4">Embodied Carbon (11%)</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Home className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Concrete & Steel: <span className="font-bold">70% of embodied emissions</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Home className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Manufacturing processes emit <span className="font-bold">8% global CO₂</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Home className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Transportation of materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Home className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Construction & demolition waste</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Citation
                  statistic="Building sector emissions and energy consumption"
                  sources={[
                    {
                      title: "2024 Global Status Report for Buildings and Construction",
                      author: "UN Environment Programme",
                      organization: "UNEP",
                      year: 2024,
                      url: "https://www.unep.org/resources/publication/2024-global-status-report-buildings-and-construction"
                    },
                    {
                      title: "Net Zero Carbon Buildings: A Framework Definition",
                      author: "World Green Building Council",
                      organization: "WorldGBC",
                      year: 2024,
                      url: "https://worldgbc.org/advancing-net-zero/embodied-carbon/"
                    },
                    {
                      title: "Buildings Energy Data Book",
                      author: "US Department of Energy",
                      organization: "US DOE",
                      year: 2024,
                      url: "https://www.energy.gov/eere/buildings/data-tools-and-resources"
                    }
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Strategies */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-[var(--foreground)] mb-12 text-center">CORE GREEN BUILDING STRATEGIES</h2>

            <div className="space-y-8">
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <Sun className="w-12 h-12 text-theme-primary" />
                    <h3 className="text-3xl font-black text-theme-primary">PASSIVE DESIGN & SOLAR ORIENTATION</h3>
                  </div>

                  <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">
                    Passive design harnesses natural energy flows to maintain comfort with minimal mechanical systems. Buildings optimized for passive strategies can reduce energy consumption by <span className="font-black text-2xl text-theme-primary">60-90%</span> compared to conventional construction—often at <span className="font-bold text-theme-primary">zero additional cost</span> when incorporated during design.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 my-8">
                    <div className="bg-[var(--background)] p-6 rounded-xl border-2 border-theme-primary">
                      <h4 className="text-xl font-black text-theme-primary mb-4">Solar Orientation</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">South-facing windows (N. Hemisphere)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Overhangs for summer shading</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Reduces heating loads <span className="font-bold">25-40%</span></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Daylighting reduces lighting energy <span className="font-bold">60%</span></span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[var(--background)] p-6 rounded-xl border-2 border-theme-accent">
                      <h4 className="text-xl font-black text-theme-accent mb-4">Natural Ventilation</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Cross-ventilation design</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Stack effect cooling</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Night flush cooling</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Cooling energy reduction: <span className="font-bold">30-50%</span></span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[var(--background)] p-6 rounded-xl border-2 border-theme-secondary">
                      <h4 className="text-xl font-black text-theme-secondary mb-4">Thermal Mass</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Concrete, stone, brick interiors</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Stores heat/cool for time-shifting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Dampens temperature swings <span className="font-bold">10-15°F</span></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Peak load reduction: <span className="font-bold">20-30%</span></span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Citation
                    statistic="Passive design energy savings"
                    sources={[
                      {
                        title: "Passive House Institute Research",
                        author: "Passive House Institute",
                        organization: "PHI",
                        year: 2024,
                        url: "https://passivehouse.com/02_informations/01_whatisapassivehouse/01_whatisapassivehouse.htm"
                      },
                      {
                        title: "Natural Ventilation for Cooling in Buildings",
                        author: "ASHRAE",
                        organization: "American Society of Heating, Refrigerating and Air-Conditioning Engineers",
                        year: 2024,
                        url: "https://www.ashrae.org/"
                      },
                      {
                        title: "Daylighting Benefits and Performance",
                        author: "National Renewable Energy Laboratory",
                        organization: "NREL",
                        year: 2024,
                        url: "https://www.nrel.gov/buildings/daylighting.html"
                      }
                    ]}
                  />
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <Home className="w-12 h-12 text-theme-accent" />
                    <h3 className="text-3xl font-black text-theme-accent">SUPER-INSULATION & AIRTIGHTNESS</h3>
                  </div>

                  <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">
                    The building envelope is the most cost-effective efficiency investment. Passive House standard buildings use <span className="font-black text-2xl text-theme-accent">90% less energy</span> for heating and cooling than typical code-built structures through exceptional insulation and airtightness. Return on investment: <span className="font-bold text-theme-accent">8-12 years</span>, with comfort and health benefits that last the building's lifetime.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-2xl font-black text-theme-accent mb-4">Insulation Targets</h4>
                      <div className="space-y-4">
                        <div className="bg-[var(--muted)] p-5 rounded-lg border-2 border-theme-accent">
                          <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Walls: R-40 to R-60</h5>
                          <p className="text-sm text-theme-muted">vs. code minimum R-13 to R-21</p>
                          <p className="text-sm text-theme-muted mt-2">Materials: Dense-pack cellulose, mineral wool, rigid foam board</p>
                        </div>

                        <div className="bg-[var(--muted)] p-5 rounded-lg border-2 border-theme-primary">
                          <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Roof: R-60 to R-80</h5>
                          <p className="text-sm text-theme-muted">vs. code minimum R-38 to R-49</p>
                          <p className="text-sm text-theme-muted mt-2">Critical zone: 25-40% heat loss through inadequate roof insulation</p>
                        </div>

                        <div className="bg-[var(--muted)] p-5 rounded-lg border-2 border-theme-secondary">
                          <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Foundation: R-30 to R-40</h5>
                          <p className="text-sm text-theme-muted">vs. typical R-10 or uninsulated</p>
                          <p className="text-sm text-theme-muted mt-2">Often-neglected zone with massive heat loss</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-2xl font-black text-theme-primary mb-4">Airtightness</h4>
                      <div className="space-y-4">
                        <div className="bg-[var(--muted)] p-5 rounded-lg border-2 border-theme-primary">
                          <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Blower Door Test</h5>
                          <ul className="text-sm text-theme-muted space-y-1 mt-2">
                            <li>• Passive House: <span className="font-bold">≤0.6 ACH50</span> (air changes/hour at 50 Pa)</li>
                            <li>• Typical new build: <span className="font-bold">5-7 ACH50</span></li>
                            <li>• Older homes: <span className="font-bold">10-20+ ACH50</span></li>
                            <li>• Air leakage = <span className="font-bold">25-40% heat loss</span></li>
                          </ul>
                        </div>

                        <div className="bg-[var(--muted)] p-5 rounded-lg border-2 border-theme-accent">
                          <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Windows & Doors</h5>
                          <ul className="text-sm text-theme-muted space-y-1 mt-2">
                            <li>• Triple-pane, low-E windows: <span className="font-bold">U-0.15 to U-0.20</span></li>
                            <li>• vs. standard double-pane: <span className="font-bold">U-0.30 to U-0.50</span></li>
                            <li>• Proper installation: continuous air barrier</li>
                            <li>• Heat loss reduction: <span className="font-bold">50-70%</span></li>
                          </ul>
                        </div>

                        <div className="bg-[var(--muted)] p-5 rounded-lg border-2 border-theme-secondary">
                          <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Ventilation with HRV/ERV</h5>
                          <ul className="text-sm text-theme-muted space-y-1 mt-2">
                            <li>• Heat Recovery: <span className="font-bold">85-95% efficiency</span></li>
                            <li>• Continuous fresh air without heat loss</li>
                            <li>• Filters remove pollutants, allergens</li>
                            <li>• Superior indoor air quality</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Citation
                    statistic="Building envelope performance and Passive House standards"
                    sources={[
                      {
                        title: "Passive House Planning Package (PHPP)",
                        author: "Passive House Institute",
                        organization: "PHI",
                        year: 2024,
                        url: "https://passivehouse.com/04_phpp/04_phpp.htm"
                      },
                      {
                        title: "Building Envelope Thermal Performance Analysis",
                        author: "ASHRAE",
                        organization: "American Society of Heating, Refrigerating and Air-Conditioning Engineers",
                        year: 2024,
                        url: "https://www.ashrae.org/technical-resources/standards-and-guidelines"
                      },
                      {
                        title: "Air Leakage and Energy Loss in Buildings",
                        author: "Lawrence Berkeley National Laboratory",
                        organization: "LBNL",
                        year: 2024,
                        url: "https://buildings.lbl.gov/publications/air-leakage-residential-buildings"
                      }
                    ]}
                  />
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <Leaf className="w-12 h-12 text-theme-secondary" />
                    <h3 className="text-3xl font-black text-theme-secondary">SUSTAINABLE MATERIALS & EMBODIED CARBON</h3>
                  </div>

                  <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">
                    Material selection determines a building's embodied carbon—emissions from manufacturing, transport, and installation. With operational emissions declining due to efficiency improvements and grid decarbonization, embodied carbon now represents <span className="font-black text-2xl text-theme-secondary">20-50%</span> of a building's lifetime emissions. Low-carbon materials can reduce embodied emissions by <span className="font-bold text-theme-secondary">40-70%</span>.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-secondary">
                      <h4 className="text-xl font-black text-theme-secondary mb-4">Low-Carbon Structural Materials</h4>
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-bold text-[var(--foreground)] mb-1">Mass Timber (CLT, Glulam)</h5>
                          <ul className="text-sm text-theme-muted space-y-1">
                            <li>• Stores <span className="font-bold">1 ton CO₂ per m³</span> of wood</li>
                            <li>• <span className="font-bold">75% lower embodied carbon</span> than concrete/steel</li>
                            <li>• Buildings up to 18 stories proven</li>
                            <li>• Faster construction, lighter foundations</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-bold text-[var(--foreground)] mb-1">Low-Carbon Concrete</h5>
                          <ul className="text-sm text-theme-muted space-y-1">
                            <li>• Supplementary cementitious materials (fly ash, slag)</li>
                            <li>• Reduces cement content <span className="font-bold">30-70%</span></li>
                            <li>• Carbon-cured concrete sequesters CO₂</li>
                            <li>• Hempcrete: carbon-negative, insulating</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-bold text-[var(--foreground)] mb-1">Recycled Steel</h5>
                          <ul className="text-sm text-theme-muted space-y-1">
                            <li>• <span className="font-bold">70% less embodied energy</span> than virgin</li>
                            <li>• Electric arc furnace production</li>
                            <li>• Can be recycled infinitely</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-primary">
                      <h4 className="text-xl font-black text-theme-primary mb-4">Natural & Bio-Based Materials</h4>
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-bold text-[var(--foreground)] mb-1">Cellulose Insulation</h5>
                          <ul className="text-sm text-theme-muted space-y-1">
                            <li>• <span className="font-bold">85% recycled newspaper</span></li>
                            <li>• <span className="font-bold">1/6th embodied energy</span> of fiberglass</li>
                            <li>• Non-toxic, fire-resistant (boron treatment)</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-bold text-[var(--foreground)] mb-1">Cork Flooring</h5>
                          <ul className="text-sm text-theme-muted space-y-1">
                            <li>• Harvested from bark (tree lives 200+ years)</li>
                            <li>• Carbon-negative production</li>
                            <li>• Natural antimicrobial properties</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-bold text-[var(--foreground)] mb-1">Bamboo</h5>
                          <ul className="text-sm text-theme-muted space-y-1">
                            <li>• Grows to maturity in <span className="font-bold">3-5 years</span> vs. 30+ for hardwood</li>
                            <li>• Stronger than oak in compression</li>
                            <li>• Flooring, cabinetry, structural elements</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-bold text-[var(--foreground)] mb-1">Recycled Content Products</h5>
                          <ul className="text-sm text-theme-muted space-y-1">
                            <li>• Reclaimed wood: character + carbon savings</li>
                            <li>• Recycled glass countertops & tiles</li>
                            <li>• Rubber flooring from tires</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Citation
                    statistic="Embodied carbon and sustainable building materials"
                    sources={[
                      {
                        title: "Embodied Carbon in Construction Calculator (EC3)",
                        author: "Carbon Leadership Forum",
                        organization: "University of Washington",
                        year: 2024,
                        url: "https://www.buildingtransparency.org/"
                      },
                      {
                        title: "Mass Timber and Carbon Storage",
                        author: "Forest Products Laboratory",
                        organization: "USDA",
                        year: 2024,
                        url: "https://www.fpl.fs.fed.us/research/highlights/masstimber.php"
                      },
                      {
                        title: "Advancing Net Zero: Embodied Carbon",
                        author: "World Green Building Council",
                        organization: "WorldGBC",
                        year: 2024,
                        url: "https://worldgbc.org/advancing-net-zero/embodied-carbon/"
                      }
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ROI & Economics */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-[var(--foreground)] mb-12 text-center">ECONOMICS & ROI</h2>

            <Card className="border-4 border-theme-primary">
              <CardContent className="p-10">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <DollarSign className="w-12 h-12 text-theme-primary mx-auto mb-4" />
                    <div className="text-5xl font-black text-theme-primary mb-2">0-8%</div>
                    <p className="font-bold text-[var(--foreground)]">Additional Upfront Cost</p>
                    <p className="text-sm text-theme-muted mt-2">For high-performance green buildings vs. conventional</p>
                  </div>
                  <div className="text-center">
                    <TrendingDown className="w-12 h-12 text-theme-accent mx-auto mb-4" />
                    <div className="text-5xl font-black text-theme-accent mb-2">50-90%</div>
                    <p className="font-bold text-[var(--foreground)]">Energy Cost Savings</p>
                    <p className="text-sm text-theme-muted mt-2">Annual operational savings</p>
                  </div>
                  <div className="text-center">
                    <Award className="w-12 h-12 text-theme-secondary mx-auto mb-4" />
                    <div className="text-5xl font-black text-theme-secondary mb-2">7-18%</div>
                    <p className="font-bold text-[var(--foreground)]">Property Value Premium</p>
                    <p className="text-sm text-theme-muted mt-2">For certified green buildings</p>
                  </div>
                </div>

                <div className="bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] p-8 rounded-xl border-2 border-theme-primary">
                  <h4 className="text-2xl font-black text-theme-primary mb-4">Total Cost of Ownership Analysis</h4>
                  <p className="text-[var(--foreground)] leading-relaxed mb-4">
                    Green buildings deliver financial returns far exceeding upfront premiums. Over a <span className="font-bold">20-year building lifecycle</span>, a Passive House saves <span className="font-black">$150,000-$300,000</span> in energy costs (typical home) with only <span className="font-bold">$15,000-$40,000</span> additional upfront investment—a <span className="font-black">10:1 to 20:1 return</span>.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h5 className="font-black text-lg text-[var(--foreground)] mb-3">Financial Benefits</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Lower utility bills (40-90% reduction)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Reduced maintenance costs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Tax credits & rebates (ITC, state programs)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Higher resale value (+7-18%)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Faster lease-up rates (commercial)</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-black text-lg text-[var(--foreground)] mb-3">Non-Financial Benefits</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Superior comfort (even temperatures)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Better indoor air quality</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Increased productivity (11% in offices)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Health benefits (fewer sick days)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Climate resilience & disaster preparedness</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Citation
                  statistic="Green building costs and return on investment"
                  sources={[
                    {
                      title: "The Economics of High-Performance Buildings",
                      author: "Rocky Mountain Institute",
                      organization: "RMI",
                      year: 2024,
                      url: "https://rmi.org/insight/the-economics-of-zero-energy-homes/"
                    },
                    {
                      title: "Green Building Market Impact Report",
                      author: "US Green Building Council",
                      organization: "USGBC",
                      year: 2024,
                      url: "https://www.usgbc.org/resources/green-building-market-impact-report"
                    },
                    {
                      title: "Cost vs. Value of Passive House Construction",
                      author: "Passive House Institute US",
                      organization: "PHIUS",
                      year: 2024,
                      url: "https://www.phius.org/phius-certification-for-buildings-products/about-phius"
                    }
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-br from-[var(--accent)] via-[var(--primary)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-6xl font-black">BUILD FOR THE FUTURE</h2>
            <p className="text-2xl font-semibold">
              Every building is an opportunity to fight climate change and improve lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/learn/leed-certification">
                <Button size="lg" className="text-xl px-12 py-8 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-2xl">
                  EXPLORE CERTIFICATIONS
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
