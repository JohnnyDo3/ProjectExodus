import { Card, CardContent } from '@/components/ui/Card'
import { Citation } from '@/components/learn/Citation'
import {
  Zap,
  Battery,
  Droplet,
  Sprout,
  Recycle,
  Brain,
  Leaf,
  Car,
  Factory,
  Wind,
  Sun,
  Rocket,
  TrendingUp,
  Award
} from 'lucide-react'
import Link from 'next/link'

export default function EmergingTechPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-32 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-theme-xl animate-pulse">
                <Rocket className="w-12 h-12 text-[var(--primary-foreground)]" />
              </div>
            </div>
            <h1 className="text-[var(--foreground)]" style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 900,
              lineHeight: 1.1
            }}>
              EMERGING TECHNOLOGIES & INNOVATIONS
            </h1>
            <p className="text-2xl font-bold text-theme-muted max-w-3xl mx-auto">
              The <span style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>breakthrough innovations</span> transforming sustainability and climate action
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-primary">
              <CardContent className="p-12">
                <h2 className="text-4xl font-black mb-6 text-[var(--foreground)]">The Innovation Revolution</h2>
                <div className="space-y-6 text-lg font-medium text-theme-muted leading-relaxed">
                  <p>
                    <span className="font-black text-theme-primary text-2xl">$1.4 trillion</span> was invested in climate tech in 2023, marking a <span className="font-bold text-[var(--foreground)]">70% increase</span> from 2020. Breakthrough innovations in carbon capture, battery technology, green hydrogen, vertical farming, and AI-driven climate solutions are accelerating the transition to a sustainable future.
                  </p>
                  <p>
                    These technologies aren't just reducing emissions—they're creating entirely new industries, generating <span className="font-bold text-[var(--foreground)]">65 million new jobs</span> by 2030 and unlocking <span className="font-bold text-[var(--foreground)]">$26 trillion</span> in economic opportunities by 2030 according to the ILO and Global Commission on the Economy and Climate.
                  </p>
                </div>

                <Citation
                  statistic="$1.4T climate tech investment in 2023"
                  sources={[
                    {
                      title: "State of Climate Tech 2023",
                      author: "PwC & London Stock Exchange Group",
                      organization: "PwC Climate Tech Report",
                      year: 2023,
                      url: "https://www.pwc.com/gx/en/services/sustainability/publications/state-of-climate-tech.html"
                    },
                    {
                      title: "World Employment and Social Outlook 2018: Greening with Jobs",
                      author: "International Labour Organization",
                      organization: "ILO",
                      year: 2018,
                      url: "https://www.ilo.org/global/research/global-reports/weso/greening-with-jobs/lang--en/index.htm"
                    },
                    {
                      title: "Unlocking the Inclusive Growth Story of the 21st Century",
                      author: "Global Commission on the Economy and Climate",
                      organization: "New Climate Economy",
                      year: 2018,
                      url: "https://newclimateeconomy.report/"
                    }
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Carbon Capture & Storage */}
      <section className="py-24 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_srgb,var(--primary)_80%,black)] flex items-center justify-center shadow-theme-xl">
                <Factory className="w-10 h-10 text-[var(--primary-foreground)]" />
              </div>
              <div>
                <h2 className="text-5xl font-black text-[var(--foreground)]">CARBON CAPTURE & STORAGE (CCS)</h2>
                <p className="text-xl font-semibold text-theme-muted mt-2">Removing CO₂ directly from the atmosphere and industrial sources</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-theme-primary">Direct Air Capture (DAC)</h3>
                  <div className="space-y-4 text-base font-medium text-theme-muted">
                    <p>
                      <span className="font-bold text-[var(--foreground)]">Climeworks' Orca plant</span> in Iceland captures <span className="font-bold">4,000 tons of CO₂ annually</span>, storing it permanently in basalt rock formations where it mineralizes in 2 years.
                    </p>
                    <p>
                      Their new <span className="font-bold text-[var(--foreground)]">Mammoth facility</span> (2024) captures <span className="font-bold">36,000 tons/year</span>—a 9x scale-up. Target: <span className="font-bold">1 million tons/year by 2030</span>.
                    </p>
                    <p className="text-theme-primary font-bold">
                      💰 Cost declining from $600-$1,000/ton to target of $100/ton by 2030
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-theme-accent">Point-Source Capture</h3>
                  <div className="space-y-4 text-base font-medium text-theme-muted">
                    <p>
                      <span className="font-bold text-[var(--foreground)]">NRG's Petra Nova</span> (Texas) captures <span className="font-bold">90% of CO₂</span> from coal plant flue gas—<span className="font-bold">1.6 million tons/year</span>.
                    </p>
                    <p>
                      <span className="font-bold text-[var(--foreground)]">Carbon Engineering</span> partnered with Occidental to build world's largest DAC facility in Texas: <span className="font-bold">1 million tons CO₂/year by 2025</span>.
                    </p>
                    <p className="text-theme-accent font-bold">
                      🌍 IEA projects 1.7 Gt CO₂/year capture needed by 2050 for net-zero
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Citation
                statistic="CCS costs and capacity projections"
                sources={[
                  {
                    title: "Direct Air Capture: A Key Technology for Net Zero",
                    author: "International Energy Agency",
                    organization: "IEA",
                    year: 2022,
                    url: "https://www.iea.org/reports/direct-air-capture"
                  },
                  {
                    title: "Climeworks Mammoth Plant Announcement",
                    author: "Climeworks AG",
                    organization: "Climeworks",
                    year: 2024,
                    url: "https://climeworks.com/news/mammoth-dac-plant"
                  },
                  {
                    title: "The Role of CCUS in Low-Carbon Power Systems",
                    author: "International Energy Agency",
                    organization: "IEA CCUS Report",
                    year: 2020,
                    url: "https://www.iea.org/reports/ccus-in-clean-energy-transitions"
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Battery Technologies */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_80%,black)] flex items-center justify-center shadow-theme-xl">
                <Battery className="w-10 h-10 text-[var(--primary-foreground)]" />
              </div>
              <div>
                <h2 className="text-5xl font-black text-[var(--foreground)]">ADVANCED BATTERY TECHNOLOGIES</h2>
                <p className="text-xl font-semibold text-theme-muted mt-2">Next-generation energy storage revolutionizing renewables</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">🔋</div>
                  <h3 className="text-xl font-black mb-4 text-theme-primary">SOLID-STATE BATTERIES</h3>
                  <div className="space-y-3 text-sm font-medium text-theme-muted">
                    <p><span className="font-bold text-[var(--foreground)]">QuantumScape</span> (backed by VW) achieved <span className="font-bold">80% charge in 15 minutes</span> with <span className="font-bold">800+ cycles</span></p>
                    <p><span className="font-bold">2-3x energy density</span> vs. lithium-ion = 500+ mile EV range</p>
                    <p className="text-theme-primary font-bold">Commercialization: 2025-2027</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">🧂</div>
                  <h3 className="text-xl font-black mb-4 text-theme-accent">SODIUM-ION BATTERIES</h3>
                  <div className="space-y-3 text-sm font-medium text-theme-muted">
                    <p><span className="font-bold text-[var(--foreground)]">CATL</span> launched commercial sodium-ion cells: <span className="font-bold">160 Wh/kg energy density</span></p>
                    <p><span className="font-bold">70% cheaper than lithium-ion</span>, abundant materials, safer chemistry</p>
                    <p className="text-theme-accent font-bold">Perfect for grid storage & budget EVs</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">🌊</div>
                  <h3 className="text-xl font-black mb-4 text-theme-secondary">FLOW BATTERIES</h3>
                  <div className="space-y-3 text-sm font-medium text-theme-muted">
                    <p><span className="font-bold text-[var(--foreground)]">ESS Inc.</span> iron flow batteries: <span className="font-bold">20,000+ cycle lifespan</span> (20-25 years)</p>
                    <p>100% recyclable, no degradation, <span className="font-bold">scalable from kW to GW</span></p>
                    <p className="text-theme-secondary font-bold">Ideal for long-duration storage (8-12 hrs)</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--background))] to-[var(--background)]">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black mb-6 text-theme-primary">📊 Market Transformation</h3>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-5xl font-black text-[var(--foreground)] mb-2">89%</div>
                    <p className="text-sm font-bold text-theme-muted">Battery cost decline since 2010 (now $139/kWh)</p>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-[var(--foreground)] mb-2">1,200 GWh</div>
                    <p className="text-sm font-bold text-theme-muted">Global battery production capacity by 2030</p>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-[var(--foreground)] mb-2">$400B</div>
                    <p className="text-sm font-bold text-theme-muted">Battery market value by 2030</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Citation
                statistic="Battery technology advancements and market data"
                sources={[
                  {
                    title: "Battery Pack Prices Fall to an Average of $139/kWh",
                    author: "BloombergNEF",
                    organization: "Bloomberg New Energy Finance",
                    year: 2023,
                    url: "https://about.bnef.com/blog/battery-pack-prices-fall-to-an-average-of-139-kwh-but-rising-commodity-prices-start-to-bite/"
                  },
                  {
                    title: "QuantumScape Q4 2023 Results",
                    author: "QuantumScape Corporation",
                    organization: "QuantumScape",
                    year: 2024,
                    url: "https://ir.quantumscape.com/"
                  },
                  {
                    title: "Global EV Outlook 2023",
                    author: "International Energy Agency",
                    organization: "IEA",
                    year: 2023,
                    url: "https://www.iea.org/reports/global-ev-outlook-2023"
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Green Hydrogen */}
      <section className="py-24 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[color-mix(in_srgb,var(--secondary)_80%,black)] flex items-center justify-center shadow-theme-xl">
                <Droplet className="w-10 h-10 text-[var(--primary-foreground)]" />
              </div>
              <div>
                <h2 className="text-5xl font-black text-[var(--foreground)]">GREEN HYDROGEN</h2>
                <p className="text-xl font-semibold text-theme-muted mt-2">Clean fuel for heavy industry, aviation, and shipping</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-theme-primary">Why Green Hydrogen Matters</h3>
                  <div className="space-y-4 text-base font-medium text-theme-muted">
                    <p>
                      Sectors like steel, cement, aviation, and shipping account for <span className="font-bold text-[var(--foreground)]">30% of global emissions</span> and are <span className="font-bold">extremely difficult to electrify</span>. Green hydrogen (produced via renewable-powered electrolysis) offers a zero-carbon solution.
                    </p>
                    <p>
                      <span className="font-bold text-theme-primary">1 kg of H₂</span> stores <span className="font-bold">3x more energy than gasoline</span> by weight and produces only water when burned.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-theme-accent">Breakthrough Projects</h3>
                  <div className="space-y-4 text-base font-medium text-theme-muted">
                    <p>
                      🇸🇦 <span className="font-bold text-[var(--foreground)]">NEOM Green Hydrogen</span> (Saudi Arabia): <span className="font-bold">650 tons/day by 2026</span>—world's largest plant powered by 4 GW solar+wind
                    </p>
                    <p>
                      🇦🇺 <span className="font-bold text-[var(--foreground)]">Asian Renewable Energy Hub</span> (Australia): <span className="font-bold">26 GW renewable capacity</span> producing 1.75 million tons H₂/year for export to Asia
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-4 border-theme-secondary bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_10%,var(--background))] to-[var(--background)]">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black mb-6 text-theme-secondary">📈 Cost Trajectory</h3>
                <div className="space-y-4 text-lg font-medium text-theme-muted">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--foreground)]">Today (2024):</span>
                    <span className="text-2xl font-black text-theme-secondary">$4-6/kg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--foreground)]">2030 Target:</span>
                    <span className="text-2xl font-black text-theme-primary">$1-2/kg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--foreground)]">Price Competitive with:</span>
                    <span className="font-bold">Grey hydrogen ($1-2/kg) + carbon tax</span>
                  </div>
                </div>
                <p className="mt-6 text-sm font-bold text-theme-muted">
                  IEA projects green H₂ production costs will fall <span className="text-theme-primary">70-85%</span> by 2050 due to electrolyzer cost reductions and cheap renewable electricity
                </p>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Citation
                statistic="Green hydrogen costs and project data"
                sources={[
                  {
                    title: "The Future of Hydrogen",
                    author: "International Energy Agency",
                    organization: "IEA",
                    year: 2019,
                    url: "https://www.iea.org/reports/the-future-of-hydrogen"
                  },
                  {
                    title: "Global Hydrogen Review 2023",
                    author: "International Energy Agency",
                    organization: "IEA",
                    year: 2023,
                    url: "https://www.iea.org/reports/global-hydrogen-review-2023"
                  },
                  {
                    title: "Green Hydrogen Cost Reduction",
                    author: "International Renewable Energy Agency",
                    organization: "IRENA",
                    year: 2020,
                    url: "https://www.irena.org/publications/2020/Dec/Green-hydrogen-cost-reduction"
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Farming & AgTech */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_srgb,var(--primary)_80%,black)] flex items-center justify-center shadow-theme-xl">
                <Sprout className="w-10 h-10 text-[var(--primary-foreground)]" />
              </div>
              <div>
                <h2 className="text-5xl font-black text-[var(--foreground)]">VERTICAL FARMING & AGTECH</h2>
                <p className="text-xl font-semibold text-theme-muted mt-2">Growing more food with 95% less water and 99% less land</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-theme-primary">Vertical Farming Revolution</h3>
                  <div className="space-y-4 text-base font-medium text-theme-muted">
                    <p>
                      <span className="font-bold text-[var(--foreground)]">AeroFarms</span> (New Jersey) grows leafy greens in <span className="font-bold">95% less water</span> and <span className="font-bold">390x higher yield per sq ft</span> than field farming using LED lighting and aeroponics.
                    </p>
                    <p>
                      <span className="font-bold text-[var(--foreground)]">Plenty Unlimited</span> (backed by Bezos, SoftBank) operates <span className="font-bold">year-round farms near cities</span>, cutting food miles by <span className="font-bold">90%</span> and eliminating pesticides entirely.
                    </p>
                    <p className="text-theme-primary font-bold">
                      🌱 Harvest every 14-21 days vs. 60-90 days in fields
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-theme-accent">Precision Agriculture AI</h3>
                  <div className="space-y-4 text-base font-medium text-theme-muted">
                    <p>
                      <span className="font-bold text-[var(--foreground)]">John Deere's See & Spray</span> uses computer vision to apply herbicides only where weeds exist, reducing chemical use by <span className="font-bold">77%</span>.
                    </p>
                    <p>
                      <span className="font-bold text-[var(--foreground)]">Climate FieldView</span> uses satellite imagery, soil sensors, and AI to optimize irrigation, fertilizer, and planting—increasing yields <span className="font-bold">10-15%</span> while cutting inputs <span className="font-bold">20-30%</span>.
                    </p>
                    <p className="text-theme-accent font-bold">
                      🚜 Autonomous tractors reduce labor costs 30-50%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-4 border-theme-secondary bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_10%,var(--background))] to-[var(--background)]">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black mb-6 text-theme-secondary">🌍 Global Impact Potential</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-black text-[var(--foreground)] mb-2">$24.8B</div>
                    <p className="text-sm font-bold text-theme-muted">Vertical farming market by 2030 (CAGR 24.8%)</p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-black text-[var(--foreground)] mb-2">4 Billion</div>
                    <p className="text-sm font-bold text-theme-muted">People fed if 10% of crops moved to vertical farms</p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-black text-[var(--foreground)] mb-2">99%</div>
                    <p className="text-sm font-bold text-theme-muted">Less land needed vs. traditional agriculture</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Citation
                statistic="Vertical farming and AgTech impact data"
                sources={[
                  {
                    title: "Vertical Farming Market Size Report 2030",
                    author: "Grand View Research",
                    organization: "Grand View Research",
                    year: 2023,
                    url: "https://www.grandviewresearch.com/industry-analysis/vertical-farming-market"
                  },
                  {
                    title: "AeroFarms Technology White Paper",
                    author: "AeroFarms",
                    organization: "AeroFarms Inc.",
                    year: 2023,
                    url: "https://www.aerofarms.com/technology/"
                  },
                  {
                    title: "Digital Agriculture and the Transformation of Food Systems",
                    author: "Food and Agriculture Organization",
                    organization: "FAO",
                    year: 2022,
                    url: "https://www.fao.org/digital-agriculture/en/"
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI for Climate */}
      <section className="py-24 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_80%,black)] flex items-center justify-center shadow-theme-xl">
                <Brain className="w-10 h-10 text-[var(--primary-foreground)]" />
              </div>
              <div>
                <h2 className="text-5xl font-black text-[var(--foreground)]">AI & MACHINE LEARNING FOR CLIMATE</h2>
                <p className="text-xl font-semibold text-theme-muted mt-2">Artificial intelligence accelerating climate solutions across all sectors</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">🔬</div>
                  <h3 className="text-xl font-black mb-4 text-theme-primary">Materials Discovery</h3>
                  <div className="space-y-3 text-sm font-medium text-theme-muted">
                    <p><span className="font-bold text-[var(--foreground)]">DeepMind's GNoME</span> discovered <span className="font-bold">2.2 million new materials</span> using AI—more than humanity had found in 250 years</p>
                    <p><span className="font-bold">800+ verified</span> for batteries, solar cells, catalysts</p>
                    <p className="text-theme-primary font-bold">Accelerates R&D by 10-100x</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">🌐</div>
                  <h3 className="text-xl font-black mb-4 text-theme-accent">Grid Optimization</h3>
                  <div className="space-y-3 text-sm font-medium text-theme-muted">
                    <p><span className="font-bold text-[var(--foreground)]">Google DeepMind</span> AI reduced data center cooling energy by <span className="font-bold">40%</span></p>
                    <p>Smart grid AI from <span className="font-bold">AutoGrid</span> cuts renewable curtailment by <span className="font-bold">30%</span></p>
                    <p className="text-theme-accent font-bold">Predicts demand with 99% accuracy</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="text-xl font-black mb-4 text-theme-secondary">Climate Modeling</h3>
                  <div className="space-y-3 text-sm font-medium text-theme-muted">
                    <p><span className="font-bold text-[var(--foreground)]">Microsoft's AI for Earth</span> grants $50M+ to 600+ projects using AI for climate</p>
                    <p>AI models predict extreme weather <span className="font-bold">5-7 days earlier</span> with <span className="font-bold">90%+ accuracy</span></p>
                    <p className="text-theme-secondary font-bold">Satellite imagery + AI detects deforestation in real-time</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--background))] to-[var(--background)]">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black mb-6 text-theme-primary">🚀 AI Climate Impact Projections</h3>
                <p className="text-lg font-medium text-theme-muted mb-6">
                  According to PwC, AI applications could reduce global GHG emissions by <span className="font-black text-2xl text-[var(--foreground)]">4% by 2030</span>—equivalent to <span className="font-bold text-[var(--foreground)]">2.4 Gt CO₂e</span>, matching the annual emissions of Australia, Canada, and Japan combined.
                </p>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-black text-theme-primary mb-2">1.5-3.0%</div>
                    <p className="text-sm font-bold text-theme-muted">Transportation</p>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-theme-primary mb-2">0.7-1.5%</div>
                    <p className="text-sm font-bold text-theme-muted">Energy</p>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-theme-primary mb-2">0.5-1.2%</div>
                    <p className="text-sm font-bold text-theme-muted">Agriculture</p>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-theme-primary mb-2">0.4-0.7%</div>
                    <p className="text-sm font-bold text-theme-muted">Buildings</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Citation
                statistic="AI for climate applications and impact"
                sources={[
                  {
                    title: "How AI Can Enable a Sustainable Future",
                    author: "PwC UK",
                    organization: "PwC",
                    year: 2023,
                    url: "https://www.pwc.co.uk/services/sustainability-climate-change/insights/how-ai-future-can-enable-sustainable-future.html"
                  },
                  {
                    title: "GNoME: Scaling Deep Learning for Materials Discovery",
                    author: "Google DeepMind",
                    organization: "DeepMind",
                    year: 2023,
                    url: "https://deepmind.google/discover/blog/millions-of-new-materials-discovered-with-deep-learning/"
                  },
                  {
                    title: "AI for Earth: Empowering Conservation",
                    author: "Microsoft Corporation",
                    organization: "Microsoft",
                    year: 2023,
                    url: "https://www.microsoft.com/en-us/ai/ai-for-earth"
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-16 text-[var(--foreground)]">MORE BREAKTHROUGH INNOVATIONS</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Recycle, title: 'Circular Economy Tech', desc: 'Chemical recycling, bio-plastics' },
                { icon: Car, title: 'Clean Transportation', desc: 'EVs, hydrogen trucks, SAF' },
                { icon: Sun, title: 'Next-Gen Solar', desc: 'Perovskites, tandem cells' },
                { icon: Wind, title: 'Offshore Wind', desc: 'Floating turbines, 15+ MW units' },
              ].map((item, i) => (
                <Card key={i} className="border-4 border-theme-accent hover:scale-105 transition-transform cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_80%,black)] flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-[var(--primary-foreground)]" />
                    </div>
                    <h3 className="text-lg font-black mb-2 text-[var(--foreground)]">{item.title}</h3>
                    <p className="text-sm font-medium text-theme-muted">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-6xl font-black">JOIN THE INNOVATION REVOLUTION</h2>
            <p className="text-2xl font-semibold">
              These technologies are scaling NOW. Be part of the exponential transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/products">
                <button className="text-xl px-12 py-8 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-2xl rounded-xl">
                  EXPLORE SUSTAINABLE PRODUCTS
                </button>
              </Link>
              <Link href="/tools/carbon-calculator">
                <button className="text-xl px-12 py-8 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black rounded-xl">
                  CALCULATE YOUR IMPACT
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
