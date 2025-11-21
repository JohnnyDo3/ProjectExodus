import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Citation } from '@/components/learn/Citation'
import { Droplet, TrendingUp, AlertTriangle, Leaf, Home, Sprout, CheckCircle, DollarSign, Zap } from 'lucide-react'
import Link from 'next/link'

export default function WaterConservationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-32 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_20%,var(--background))] via-[var(--background)] to-[color-mix(in_srgb,var(--accent)_20%,var(--background))] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="text-7xl mb-6">💧</div>
            <h1 className="text-[var(--foreground)]" style={{
              fontSize: 'clamp(3rem, 10vw, 6rem)',
              fontWeight: 900,
              lineHeight: 1
            }}>
              WATER CONSERVATION
            </h1>
            <p className="text-2xl font-bold text-theme-muted max-w-3xl mx-auto">
              Protecting our most <span style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>precious resource</span> through smart use and innovative technology
            </p>
          </div>
        </div>
      </section>

      {/* Water Crisis */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-[var(--foreground)] mb-4">THE GLOBAL WATER CRISIS</h2>
              <p className="text-xl font-semibold text-theme-muted">Understanding water scarcity and stress</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8 text-center">
                  <Droplet className="w-12 h-12 text-theme-secondary mx-auto mb-4" />
                  <div className="text-4xl font-black text-theme-secondary mb-2">0.5%</div>
                  <p className="font-bold text-[var(--foreground)] text-sm">Accessible freshwater of Earth's total water</p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8 text-center">
                  <AlertTriangle className="w-12 h-12 text-theme-accent mx-auto mb-4" />
                  <div className="text-4xl font-black text-theme-accent mb-2">2.2 Bn</div>
                  <p className="font-bold text-[var(--foreground)] text-sm">People lack access to safely managed drinking water</p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8 text-center">
                  <TrendingUp className="w-12 h-12 text-theme-primary mx-auto mb-4" />
                  <div className="text-4xl font-black text-theme-primary mb-2">55%</div>
                  <p className="font-bold text-[var(--foreground)] text-sm">Global population facing water scarcity at least 1 month/year</p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8 text-center">
                  <Sprout className="w-12 h-12 text-theme-secondary mx-auto mb-4" />
                  <div className="text-4xl font-black text-theme-secondary mb-2">70%</div>
                  <p className="font-bold text-[var(--foreground)] text-sm">Freshwater withdrawals for agriculture</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-4 border-theme-accent">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black text-theme-accent mb-6">Water: The Defining Crisis of Our Century</h3>

                <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">
                  By 2025, <span className="font-black text-2xl text-theme-accent">1.8 billion people</span> will live in regions with absolute water scarcity, and <span className="font-bold text-theme-accent">two-thirds of the world's population</span> could be living under water-stressed conditions. Yet global water demand is projected to increase <span className="font-black">20-30% above current levels by 2050</span>, driven by population growth, economic development, and changing consumption patterns.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-accent">
                    <h4 className="text-xl font-black text-theme-accent mb-4">Agricultural Demand</h4>
                    <ul className="space-y-2 text-sm text-theme-muted">
                      <li>• <span className="font-bold">70% of global freshwater</span> withdrawals</li>
                      <li>• <span className="font-bold">1,800 gallons</span> to produce 1 lb of beef</li>
                      <li>• <span className="font-bold">40% irrigation water</span> lost to inefficiency</li>
                      <li>• Groundwater depletion: <span className="font-bold">20% faster than recharge</span></li>
                    </ul>
                  </div>

                  <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-primary">
                    <h4 className="text-xl font-black text-theme-primary mb-4">Urban & Industrial Use</h4>
                    <ul className="space-y-2 text-sm text-theme-muted">
                      <li>• <span className="font-bold">22% industrial,</span> 8% domestic use</li>
                      <li>• Average US household: <span className="font-bold">300 gallons/day</span></li>
                      <li>• <span className="font-bold">1 trillion gallons</span> leaked from US pipes annually</li>
                      <li>• Urban areas growing <span className="font-bold">1.5M people/week</span></li>
                    </ul>
                  </div>

                  <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-secondary">
                    <h4 className="text-xl font-black text-theme-secondary mb-4">Climate Impacts</h4>
                    <ul className="space-y-2 text-sm text-theme-muted">
                      <li>• Drought frequency <span className="font-bold">doubled since 2000</span></li>
                      <li>• Glacier melt threatening <span className="font-bold">2 billion</span> people's water supply</li>
                      <li>• Extreme weather events intensifying</li>
                      <li>• Aquifer depletion: <span className="font-bold">21 of 37 largest aquifers</span> declining</li>
                    </ul>
                  </div>
                </div>

                <Citation
                  statistic="Global water scarcity and demand statistics"
                  sources={[
                    {
                      title: "The United Nations World Water Development Report 2024",
                      author: "UN-Water",
                      organization: "United Nations",
                      year: 2024,
                      url: "https://www.unwater.org/publications/un-world-water-development-report-2024"
                    },
                    {
                      title: "Water Scarcity and Climate Change",
                      author: "Intergovernmental Panel on Climate Change",
                      organization: "IPCC",
                      year: 2024,
                      url: "https://www.ipcc.ch/report/ar6/wg2/"
                    },
                    {
                      title: "Groundwater Depletion in the United States",
                      author: "US Geological Survey",
                      organization: "USGS",
                      year: 2024,
                      url: "https://www.usgs.gov/mission-areas/water-resources/science/groundwater-depletion"
                    }
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Home Water Conservation */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Home className="w-16 h-16 text-theme-primary" />
              <h2 className="text-5xl font-black text-[var(--foreground)]">HOME WATER CONSERVATION</h2>
            </div>

            <Card className="border-4 border-theme-primary mb-8">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black text-theme-primary mb-6">High-Efficiency Fixtures & Appliances</h3>

                <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">
                  The average American household uses <span className="font-black text-2xl text-theme-primary">300 gallons of water daily</span>. By upgrading to WaterSense labeled fixtures and ENERGY STAR appliances, families can reduce consumption by <span className="font-bold text-theme-primary">20-60%</span>—saving <span className="font-black">13,000+ gallons annually</span> while cutting water bills by <span className="font-bold">$380/year</span>.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-2xl font-black text-theme-primary mb-4">Indoor Water Use</h4>
                    <div className="space-y-4">
                      <div className="bg-[var(--background)] p-5 rounded-lg border-2 border-theme-primary">
                        <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Toilets (24% of indoor use)</h5>
                        <ul className="text-sm text-theme-muted space-y-1">
                          <li>• Old toilets: <span className="font-bold">3.5-7 gallons/flush</span></li>
                          <li>• WaterSense: <span className="font-bold">≤1.28 gallons/flush</span></li>
                          <li>• Dual-flush: <span className="font-bold">0.8/1.6 gallons</span> (liquid/solid)</li>
                          <li>• Savings: <span className="font-bold">13,000 gallons/year</span> per household</li>
                        </ul>
                      </div>

                      <div className="bg-[var(--background)] p-5 rounded-lg border-2 border-theme-accent">
                        <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Showers (20% of indoor use)</h5>
                        <ul className="text-sm text-theme-muted space-y-1">
                          <li>• Standard: <span className="font-bold">2.5 gallons/minute</span></li>
                          <li>• Low-flow: <span className="font-bold">1.5-2.0 gpm</span></li>
                          <li>• Ultra-efficient: <span className="font-bold">≤1.0 gpm</span> (hotel/gym)</li>
                          <li>• Savings: <span className="font-bold">2,900 gallons/year</span> per person</li>
                        </ul>
                      </div>

                      <div className="bg-[var(--background)] p-5 rounded-lg border-2 border-theme-secondary">
                        <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Faucets (19% of indoor use)</h5>
                        <ul className="text-sm text-theme-muted space-y-1">
                          <li>• Standard: <span className="font-bold">2.2 gpm</span></li>
                          <li>• WaterSense: <span className="font-bold">≤1.5 gpm</span></li>
                          <li>• Aerators add air, maintain pressure</li>
                          <li>• Savings: <span className="font-bold">700 gallons/year</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-2xl font-black text-theme-accent mb-4">Appliances</h4>
                    <div className="space-y-4">
                      <div className="bg-[var(--background)] p-5 rounded-lg border-2 border-theme-accent">
                        <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Washing Machines (17% of indoor use)</h5>
                        <ul className="text-sm text-theme-muted space-y-1">
                          <li>• Old top-loaders: <span className="font-bold">40 gallons/load</span></li>
                          <li>• ENERGY STAR front-loaders: <span className="font-bold">13 gallons/load</span></li>
                          <li>• Savings: <span className="font-bold">6,000 gallons/year</span></li>
                          <li>• Also uses <span className="font-bold">25% less energy</span></li>
                        </ul>
                      </div>

                      <div className="bg-[var(--background)] p-5 rounded-lg border-2 border-theme-primary">
                        <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Dishwashers (1% of indoor use)</h5>
                        <ul className="text-sm text-theme-muted space-y-1">
                          <li>• Old models: <span className="font-bold">10 gallons/load</span></li>
                          <li>• ENERGY STAR: <span className="font-bold">3-5 gallons/load</span></li>
                          <li>• More efficient than hand washing</li>
                          <li>• Savings: <span className="font-bold">3,870 gallons/year</span></li>
                        </ul>
                      </div>

                      <div className="bg-[var(--background)] p-5 rounded-lg border-2 border-theme-secondary">
                        <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Leak Detection & Repair</h5>
                        <ul className="text-sm text-theme-muted space-y-1">
                          <li>• <span className="font-bold">1 trillion gallons</span> wasted annually (US)</li>
                          <li>• Average household wastes <span className="font-bold">10,000 gallons/year</span></li>
                          <li>• Dripping faucet: <span className="font-bold">3,000 gallons/year</span></li>
                          <li>• Running toilet: <span className="font-bold">200 gallons/day</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <Citation
                  statistic="Home water use and fixture efficiency data"
                  sources={[
                    {
                      title: "WaterSense: Statistics and Facts",
                      author: "US Environmental Protection Agency",
                      organization: "EPA",
                      year: 2024,
                      url: "https://www.epa.gov/watersense/statistics-and-facts"
                    },
                    {
                      title: "Residential End Uses of Water, Version 2",
                      author: "Water Research Foundation",
                      organization: "WRF",
                      year: 2024,
                      url: "https://www.waterrf.org/research/projects/residential-end-uses-water-version-2"
                    },
                    {
                      title: "Fix a Leak Week",
                      author: "EPA WaterSense",
                      organization: "EPA",
                      year: 2024,
                      url: "https://www.epa.gov/watersense/fix-leak-week"
                    }
                  ]}
                />
              </CardContent>
            </Card>

            <Card className="border-4 border-theme-accent">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black text-theme-accent mb-6">Outdoor Water Conservation</h3>

                <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">
                  Outdoor water use accounts for <span className="font-black text-2xl text-theme-accent">30% of total household consumption</span>—up to <span className="font-bold text-theme-accent">70% in arid regions</span>. The EPA estimates that <span className="font-black">50% of landscape irrigation is wasted</span> due to overwatering, evaporation, and runoff. Smart outdoor practices can reduce outdoor water use by <span className="font-bold text-theme-accent">20-50%</span>.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-accent">
                    <h4 className="text-xl font-black text-theme-accent mb-4">Smart Irrigation</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Drip Irrigation</p>
                          <p className="text-theme-muted"><span className="font-bold">90% efficiency</span> vs. 65% sprinklers</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Weather-Based Controllers</p>
                          <p className="text-theme-muted">Adjust for rainfall, temperature, humidity</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Soil Moisture Sensors</p>
                          <p className="text-theme-muted">Water only when needed</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Savings</p>
                          <p className="text-theme-muted"><span className="font-bold">15,000 gallons/year</span></p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-primary">
                    <h4 className="text-xl font-black text-theme-primary mb-4">Xeriscaping</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Native Plants</p>
                          <p className="text-theme-muted">Adapted to local rainfall</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Drought-Tolerant Species</p>
                          <p className="text-theme-muted">Reduce irrigation <span className="font-bold">50-75%</span></p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Mulching</p>
                          <p className="text-theme-muted">Reduces evaporation <span className="font-bold">25-75%</span></p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Turf Reduction</p>
                          <p className="text-theme-muted">Lawns use <span className="font-bold">8,000 gal/1000 sq ft/year</span></p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-secondary">
                    <h4 className="text-xl font-black text-theme-secondary mb-4">Rainwater Harvesting</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Rain Barrels</p>
                          <p className="text-theme-muted"><span className="font-bold">1,300 gallons</span> from 1" rain on 1,000 sq ft roof</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Cisterns</p>
                          <p className="text-theme-muted">1,000-10,000 gallon storage</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Rain Gardens</p>
                          <p className="text-theme-muted">Infiltrate runoff, recharge groundwater</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Savings</p>
                          <p className="text-theme-muted">Offset <span className="font-bold">40% outdoor water</span> use</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <Citation
                  statistic="Outdoor water use and conservation strategies"
                  sources={[
                    {
                      title: "Outdoor Water Use in the United States",
                      author: "EPA WaterSense",
                      organization: "EPA",
                      year: 2024,
                      url: "https://www.epa.gov/watersense/outdoor-water-use-united-states"
                    },
                    {
                      title: "Drip Irrigation for the Homeowner",
                      author: "University of Georgia Extension",
                      organization: "UGA",
                      year: 2024,
                      url: "https://extension.uga.edu/publications/detail.html?number=C1021"
                    },
                    {
                      title: "Rainwater Harvesting: Guidance for Homeowners",
                      author: "American Rainwater Catchment Systems Association",
                      organization: "ARCSA",
                      year: 2024,
                      url: "https://www.arcsa.org/"
                    }
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Agricultural Water Conservation */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Sprout className="w-16 h-16 text-theme-secondary" />
              <h2 className="text-5xl font-black text-[var(--foreground)]">AGRICULTURAL WATER EFFICIENCY</h2>
            </div>

            <Card className="border-4 border-theme-secondary">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black text-theme-secondary mb-6">Transforming the Biggest Water User</h3>

                <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">
                  Agriculture consumes <span className="font-black text-2xl text-theme-secondary">70% of global freshwater withdrawals</span>, yet <span className="font-bold text-theme-secondary">40-60% is lost</span> to inefficient irrigation. Modernizing agricultural water use could save enough water to meet the needs of <span className="font-black">1 billion people</span> while increasing crop yields by <span className="font-bold text-theme-secondary">20-40%</span>.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-2xl font-black text-theme-secondary mb-4">Precision Irrigation Technologies</h4>
                    <div className="space-y-4">
                      <div className="bg-[var(--muted)] p-5 rounded-lg border-2 border-theme-secondary">
                        <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Drip/Micro-Irrigation</h5>
                        <ul className="text-sm text-theme-muted space-y-1">
                          <li>• <span className="font-bold">90-95% water efficiency</span> (vs. 50-70% flood irrigation)</li>
                          <li>• Delivers water directly to root zone</li>
                          <li>• Reduces evaporation by <span className="font-bold">30-70%</span></li>
                          <li>• Increases yields <span className="font-bold">20-90%</span> depending on crop</li>
                        </ul>
                      </div>

                      <div className="bg-[var(--muted)] p-5 rounded-lg border-2 border-theme-primary">
                        <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Variable Rate Irrigation (VRI)</h5>
                        <ul className="text-sm text-theme-muted space-y-1">
                          <li>• GPS-guided precision application</li>
                          <li>• Adjusts for soil types, topography</li>
                          <li>• Reduces water use <span className="font-bold">10-30%</span></li>
                          <li>• Eliminates over/under-watering</li>
                        </ul>
                      </div>

                      <div className="bg-[var(--muted)] p-5 rounded-lg border-2 border-theme-accent">
                        <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Soil Moisture Monitoring</h5>
                        <ul className="text-sm text-theme-muted space-y-1">
                          <li>• Real-time sensors guide irrigation timing</li>
                          <li>• Prevents runoff and deep percolation</li>
                          <li>• Water savings: <span className="font-bold">25-40%</span></li>
                          <li>• ROI: <span className="font-bold">1-3 years</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-2xl font-black text-theme-primary mb-4">Regenerative Agriculture & Water</h4>
                    <div className="space-y-4">
                      <div className="bg-[var(--muted)] p-5 rounded-lg border-2 border-theme-primary">
                        <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Soil Organic Matter</h5>
                        <ul className="text-sm text-theme-muted space-y-1">
                          <li>• <span className="font-bold">1% increase = 20,000 gal/acre</span> water storage</li>
                          <li>• Improves infiltration <span className="font-bold">5-10x</span></li>
                          <li>• Reduces irrigation needs <span className="font-bold">30-50%</span></li>
                          <li>• Drought resilience: yields <span className="font-bold">40% higher</span> during drought</li>
                        </ul>
                      </div>

                      <div className="bg-[var(--muted)] p-5 rounded-lg border-2 border-theme-accent">
                        <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Cover Crops</h5>
                        <ul className="text-sm text-theme-muted space-y-1">
                          <li>• Reduce evaporation from soil surface</li>
                          <li>• Improve soil structure and water infiltration</li>
                          <li>• Reduce runoff by <span className="font-bold">50-90%</span></li>
                          <li>• Act as living mulch retaining moisture</li>
                        </ul>
                      </div>

                      <div className="bg-[var(--muted)] p-5 rounded-lg border-2 border-theme-secondary">
                        <h5 className="font-black text-lg text-[var(--foreground)] mb-2">Crop Selection</h5>
                        <ul className="text-sm text-theme-muted space-y-1">
                          <li>• Drought-tolerant varieties</li>
                          <li>• Perennial crops (deeper roots, less irrigation)</li>
                          <li>• Strategic crop rotation</li>
                          <li>• Regional adaptation to water availability</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[color-mix(in_srgb,var(--secondary)_10%,var(--background))] p-8 rounded-xl border-2 border-theme-secondary">
                  <h4 className="text-2xl font-black text-theme-secondary mb-4">Economic Impact</h4>
                  <p className="text-[var(--foreground)] leading-relaxed mb-4">
                    A comprehensive study by the Pacific Institute found that improving agricultural water efficiency in California alone could save <span className="font-black">5.6-6.6 million acre-feet annually</span>—enough to supply <span className="font-bold">11-13 million households</span>. Investment in precision irrigation pays back in <span className="font-bold">3-7 years</span> through water savings, increased yields, reduced energy costs, and improved crop quality.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="text-center">
                      <div className="text-4xl font-black text-theme-secondary mb-2">15-30%</div>
                      <p className="text-sm font-bold text-[var(--foreground)]">Increased Yields</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-black text-theme-accent mb-2">25-50%</div>
                      <p className="text-sm font-bold text-[var(--foreground)]">Water Savings</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-black text-theme-primary mb-2">3-7 yrs</div>
                      <p className="text-sm font-bold text-[var(--foreground)]">ROI Period</p>
                    </div>
                  </div>
                </div>

                <Citation
                  statistic="Agricultural water use and efficiency technologies"
                  sources={[
                    {
                      title: "Agricultural Water Use Efficiency",
                      author: "Food and Agriculture Organization",
                      organization: "FAO",
                      year: 2024,
                      url: "https://www.fao.org/land-water/water/watergovernance/watermanagement/en/"
                    },
                    {
                      title: "Drip Irrigation for Agriculture: Benefits and Implementation",
                      author: "World Bank Water Resources",
                      organization: "World Bank",
                      year: 2024,
                      url: "https://www.worldbank.org/en/topic/water-in-agriculture"
                    },
                    {
                      title: "Untapped Potential: Agricultural Water Efficiency in California",
                      author: "Pacific Institute",
                      organization: "Pacific Institute",
                      year: 2024,
                      url: "https://pacinst.org/publication/ca-ag-water-efficiency/"
                    },
                    {
                      title: "Soil Health and Water Retention",
                      author: "Rodale Institute",
                      organization: "Rodale Institute",
                      year: 2024,
                      url: "https://rodaleinstitute.org/science/farming-systems-trial/"
                    }
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Innovative Technologies */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-[var(--foreground)] mb-12 text-center">INNOVATIVE WATER TECHNOLOGIES</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <Zap className="w-12 h-12 text-theme-accent mb-4" />
                  <h3 className="text-2xl font-black text-theme-accent mb-4">Atmospheric Water Generation</h3>
                  <p className="text-[var(--foreground)] mb-4">
                    Extract water from air humidity—even in arid climates. Commercial units produce <span className="font-bold">20-10,000 liters/day</span> using renewable energy.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Works at <span className="font-bold">30%+ humidity</span></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Potable water quality without treatment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Cost: <span className="font-bold">$0.10-0.30/liter</span> (improving rapidly)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <Droplet className="w-12 h-12 text-theme-primary mb-4" />
                  <h3 className="text-2xl font-black text-theme-primary mb-4">Desalination Advances</h3>
                  <p className="text-[var(--foreground)] mb-4">
                    New reverse osmosis and graphene membranes cut energy use <span className="font-bold">50%</span> vs. traditional desalination, making ocean water viable for <span className="font-bold">$0.50-1.00/m³</span>.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Global capacity: <span className="font-bold">100M m³/day</span></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Solar-powered desalination scaling rapidly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Brine management improving (mineral recovery)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8">
                  <Leaf className="w-12 h-12 text-theme-secondary mb-4" />
                  <h3 className="text-2xl font-black text-theme-secondary mb-4">Greywater Recycling</h3>
                  <p className="text-[var(--foreground)] mb-4">
                    Reuse water from sinks, showers, and laundry for irrigation and toilet flushing. Can reduce household water use by <span className="font-bold">30-50%</span>.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Greywater = <span className="font-bold">50-80%</span> of household wastewater</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Simple systems: <span className="font-bold">$500-2,000</span></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Commercial buildings saving <span className="font-bold">$10,000s annually</span></span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <TrendingUp className="w-12 h-12 text-theme-accent mb-4" />
                  <h3 className="text-2xl font-black text-theme-accent mb-4">AI & IoT Water Management</h3>
                  <p className="text-[var(--foreground)] mb-4">
                    Smart sensors and AI optimize water distribution, predict leaks, and reduce waste by <span className="font-bold">25-40%</span> in municipal systems.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Real-time leak detection saves <span className="font-bold">50% repair costs</span></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Predictive maintenance prevents failures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Barcelona saved <span className="font-bold">$58M/year</span> with smart water</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Citation
              statistic="Innovative water technology performance and costs"
              sources={[
                {
                  title: "Atmospheric Water Generation: Technology Review",
                  author: "International Desalination Association",
                  organization: "IDA",
                  year: 2024,
                  url: "https://idadesal.org/"
                },
                {
                  title: "Desalination Technology Roadmap",
                  author: "International Energy Agency",
                  organization: "IEA",
                  year: 2024,
                  url: "https://www.iea.org/reports/desalination"
                },
                {
                  title: "Greywater Reuse Systems for Residential Applications",
                  author: "Water Environment Federation",
                  organization: "WEF",
                  year: 2024,
                  url: "https://www.wef.org/"
                },
                {
                  title: "Smart Water Management: IoT and AI Applications",
                  author: "McKinsey Global Institute",
                  organization: "McKinsey",
                  year: 2024,
                  url: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/smart-cities-digital-solutions-for-a-more-livable-future"
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-6xl font-black">EVERY DROP COUNTS</h2>
            <p className="text-2xl font-semibold">
              Water conservation isn't optional—it's essential for survival. Start today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/products?category=water-conservation">
                <Button size="lg" className="text-xl px-12 py-8 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-2xl">
                  WATER-SAVING PRODUCTS
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
