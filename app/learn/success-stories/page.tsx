import { Card, CardContent } from '@/components/ui/Card'
import { Citation } from '@/components/learn/Citation'
import {
  Building2,
  Factory,
  Users,
  Sprout,
  Home,
  Globe,
  TrendingUp,
  Award,
  Target,
  Zap,
  Heart
} from 'lucide-react'
import Link from 'next/link'

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-32 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-theme-xl">
                <Award className="w-12 h-12 text-[var(--primary-foreground)]" />
              </div>
            </div>
            <h1 className="text-[var(--foreground)]" style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 900,
              lineHeight: 1.1
            }}>
              SUCCESS STORIES & CASE STUDIES
            </h1>
            <p className="text-2xl font-bold text-theme-muted max-w-3xl mx-auto">
              Real-world proof that <span style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>sustainability works</span> at every scale
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
                <h2 className="text-4xl font-black mb-6 text-[var(--foreground)]">From Vision to Reality</h2>
                <div className="space-y-6 text-lg font-medium text-theme-muted leading-relaxed">
                  <p>
                    Sustainability isn't just theory—it's happening NOW at companies, cities, farms, and communities worldwide. These success stories prove that <span className="font-bold text-[var(--foreground)]">environmental stewardship</span> and <span className="font-bold text-[var(--foreground)]">economic prosperity</span> go hand-in-hand.
                  </p>
                  <p>
                    From Patagonia's $3 billion in sustainable fashion sales to Copenhagen's path to carbon neutrality, from regenerative farms sequestering millions of tons of carbon to net-zero buildings saving millions in energy costs—these are the pioneers proving what's possible.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Success Stories */}
      <section className="py-24 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_srgb,var(--primary)_80%,black)] flex items-center justify-center shadow-theme-xl">
                <Factory className="w-10 h-10 text-[var(--primary-foreground)]" />
              </div>
              <div>
                <h2 className="text-5xl font-black text-[var(--foreground)]">COMPANIES LEADING THE WAY</h2>
                <p className="text-xl font-semibold text-theme-muted mt-2">Businesses proving sustainability drives profitability</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Patagonia */}
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_srgb,var(--primary)_80%,black)] flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-[var(--primary-foreground)]" />
                    </div>
                    <h3 className="text-2xl font-black text-theme-primary">PATAGONIA</h3>
                  </div>
                  <div className="space-y-4 text-base font-medium text-theme-muted">
                    <p className="text-lg font-bold text-[var(--foreground)]">
                      Building a $3B company on environmental activism
                    </p>
                    <p>
                      <span className="font-bold text-theme-primary">1% for the Planet:</span> Donated over <span className="font-bold text-[var(--foreground)]">$140 million</span> to environmental causes since 1985
                    </p>
                    <p>
                      <span className="font-bold text-theme-primary">Worn Wear Program:</span> Repaired <span className="font-bold text-[var(--foreground)]">100,000+ garments</span> in 2022, extending product life and reducing new production
                    </p>
                    <p>
                      <span className="font-bold text-theme-primary">Materials:</span> <span className="font-bold text-[var(--foreground)]">100% organic cotton</span> since 1996, <span className="font-bold">87% recycled polyester</span> in 2022
                    </p>
                    <p>
                      <span className="font-bold text-theme-primary">Impact:</span> Diverted <span className="font-bold text-[var(--foreground)]">82 tons of clothing</span> from landfills in 2022, saved <span className="font-bold">enough CO₂</span> to power 1,000 homes for a year
                    </p>
                    <p className="mt-4 p-4 bg-[var(--muted)] rounded-lg border-l-4 border-theme-primary">
                      <span className="font-black text-[var(--foreground)]">"We're in business to save our home planet."</span> — Patagonia Mission Statement
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Interface */}
              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_80%,black)] flex items-center justify-center">
                      <Factory className="w-8 h-8 text-[var(--primary-foreground)]" />
                    </div>
                    <h3 className="text-2xl font-black text-theme-accent">INTERFACE</h3>
                  </div>
                  <div className="space-y-4 text-base font-medium text-theme-muted">
                    <p className="text-lg font-bold text-[var(--foreground)]">
                      World's first carbon-negative carpet manufacturer
                    </p>
                    <p>
                      <span className="font-bold text-theme-accent">Mission Zero:</span> Reduced GHG emissions by <span className="font-bold text-[var(--foreground)]">96%</span> since 1996, from 19.8 lbs CO₂e/sq yd to 0.8 lbs
                    </p>
                    <p>
                      <span className="font-bold text-theme-accent">Recycled Content:</span> <span className="font-bold text-[var(--foreground)]">85% recycled materials</span> in products, reclaimed <span className="font-bold">263 million lbs</span> of fishing nets from oceans
                    </p>
                    <p>
                      <span className="font-bold text-theme-accent">Energy:</span> <span className="font-bold text-[var(--foreground)]">100% renewable electricity</span> globally, reduced energy use <span className="font-bold">46%</span> per unit
                    </p>
                    <p>
                      <span className="font-bold text-theme-accent">Financial Impact:</span> Saved <span className="font-bold text-[var(--foreground)]">$450 million</span> through sustainability initiatives while revenue grew to <span className="font-bold">$1.2B</span>
                    </p>
                    <p className="mt-4 p-4 bg-[var(--muted)] rounded-lg border-l-4 border-theme-accent">
                      <span className="font-black text-[var(--foreground)]">Proof that doing good = doing well.</span> Stock price up 300%+ since launching Mission Zero.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Ørsted */}
              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[color-mix(in_srgb,var(--secondary)_80%,black)] flex items-center justify-center">
                      <Zap className="w-8 h-8 text-[var(--primary-foreground)]" />
                    </div>
                    <h3 className="text-2xl font-black text-theme-secondary">ØRSTED</h3>
                  </div>
                  <div className="space-y-4 text-base font-medium text-theme-muted">
                    <p className="text-lg font-bold text-[var(--foreground)]">
                      From Europe's most coal-intensive to 100% renewable energy
                    </p>
                    <p>
                      <span className="font-bold text-theme-secondary">Transformation:</span> Went from <span className="font-bold text-[var(--foreground)]">85% fossil fuels (2006)</span> to <span className="font-bold">100% renewable energy (2023)</span> in just 17 years
                    </p>
                    <p>
                      <span className="font-bold text-theme-secondary">Emissions Reduction:</span> Cut CO₂ emissions by <span className="font-bold text-[var(--foreground)]">87%</span> since 2006—from 32.5M tons to 4.2M tons annually
                    </p>
                    <p>
                      <span className="font-bold text-theme-secondary">Offshore Wind Leader:</span> Built <span className="font-bold text-[var(--foreground)]">30% of global offshore wind capacity</span>, operating 7.6 GW worldwide
                    </p>
                    <p>
                      <span className="font-bold text-theme-secondary">Market Value:</span> Company valuation grew from <span className="font-bold text-[var(--foreground)]">$8B (2016)</span> to <span className="font-bold">$40B+ (2023)</span>
                    </p>
                    <p className="mt-4 p-4 bg-[var(--muted)] rounded-lg border-l-4 border-theme-secondary">
                      <span className="font-black text-[var(--foreground)]">Most sustainable company in the world</span> (Corporate Knights 2020, 2021)
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Unilever */}
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_srgb,var(--primary)_80%,black)] flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-[var(--primary-foreground)]" />
                    </div>
                    <h3 className="text-2xl font-black text-theme-primary">UNILEVER</h3>
                  </div>
                  <div className="space-y-4 text-base font-medium text-theme-muted">
                    <p className="text-lg font-bold text-[var(--foreground)]">
                      $60B company proving sustainable brands outperform
                    </p>
                    <p>
                      <span className="font-bold text-theme-primary">Sustainable Living Brands:</span> 28 brands (Dove, Ben & Jerry's, Seventh Generation) grew <span className="font-bold text-[var(--foreground)]">69% faster</span> than rest of business (2010-2020)
                    </p>
                    <p>
                      <span className="font-bold text-theme-primary">Carbon Footprint:</span> Reduced manufacturing CO₂ by <span className="font-bold text-[var(--foreground)]">65%</span> per product since 2008, <span className="font-bold">100% renewable grid electricity</span> (2020)
                    </p>
                    <p>
                      <span className="font-bold text-theme-primary">Water Impact:</span> Reduced water use in manufacturing by <span className="font-bold text-[var(--foreground)]">49%</span> per ton of production since 2008
                    </p>
                    <p>
                      <span className="font-bold text-theme-primary">Waste:</span> <span className="font-bold text-[var(--foreground)]">Zero non-hazardous waste to landfill</span> across 600+ sites globally
                    </p>
                    <p className="mt-4 p-4 bg-[var(--muted)] rounded-lg border-l-4 border-theme-primary">
                      <span className="font-black text-[var(--foreground)]">Sustainable brands delivered 75% of company's growth</span> and growing 3x faster than other brands.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12">
              <Citation
                statistic="Company sustainability performance data"
                sources={[
                  {
                    title: "Patagonia Environmental & Social Footprint Report",
                    author: "Patagonia Inc.",
                    organization: "Patagonia",
                    year: 2022,
                    url: "https://www.patagonia.com/our-footprint/"
                  },
                  {
                    title: "Interface Sustainability Report 2023",
                    author: "Interface Inc.",
                    organization: "Interface",
                    year: 2023,
                    url: "https://www.interface.com/US/en-US/about/mission/Interface-Sustainability-Report-en_US"
                  },
                  {
                    title: "Ørsted ESG Performance Report",
                    author: "Ørsted A/S",
                    organization: "Ørsted",
                    year: 2023,
                    url: "https://orsted.com/en/sustainability"
                  },
                  {
                    title: "Unilever Sustainable Living Report",
                    author: "Unilever PLC",
                    organization: "Unilever",
                    year: 2020,
                    url: "https://www.unilever.com/planet-and-society/sustainability-report/"
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* City Success Stories */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_80%,black)] flex items-center justify-center shadow-theme-xl">
                <Globe className="w-10 h-10 text-[var(--primary-foreground)]" />
              </div>
              <div>
                <h2 className="text-5xl font-black text-[var(--foreground)]">CITIES ACHIEVING CARBON NEUTRALITY</h2>
                <p className="text-xl font-semibold text-theme-muted mt-2">Urban centers leading the climate transition</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Copenhagen */}
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-theme-primary">🇩🇰 COPENHAGEN, DENMARK</h3>
                  <p className="text-lg font-bold text-[var(--foreground)] mb-4">World's most livable carbon-neutral city</p>
                  <div className="space-y-3 text-base font-medium text-theme-muted">
                    <p><span className="font-bold text-theme-primary">Target:</span> <span className="font-bold text-[var(--foreground)]">Carbon neutral by 2025</span> (on track after 80% reduction since 2005)</p>
                    <p><span className="font-bold text-theme-primary">Cycling:</span> <span className="font-bold text-[var(--foreground)]">62% of residents bike to work</span> via 390km bike lanes—saves 90,000 tons CO₂/year</p>
                    <p><span className="font-bold text-theme-primary">District Heating:</span> <span className="font-bold text-[var(--foreground)]">98% of buildings</span> connected to efficient district heating, 64% powered by waste-to-energy</p>
                    <p><span className="font-bold text-theme-primary">Wind Power:</span> Offshore wind farms provide <span className="font-bold text-[var(--foreground)]">50% of electricity</span></p>
                    <p><span className="font-bold text-theme-primary">Green Roofs:</span> All new buildings required to have green/solar roofs—created <span className="font-bold text-[var(--foreground)]">5 million sq ft</span> of green space</p>
                  </div>
                </CardContent>
              </Card>

              {/* Reykjavik */}
              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-theme-accent">🇮🇸 REYKJAVIK, ICELAND</h3>
                  <p className="text-lg font-bold text-[var(--foreground)] mb-4">100% renewable energy city</p>
                  <div className="space-y-3 text-base font-medium text-theme-muted">
                    <p><span className="font-bold text-theme-accent">Energy:</span> <span className="font-bold text-[var(--foreground)]">100% renewable electricity</span> (73% hydro, 27% geothermal) since 1970s</p>
                    <p><span className="font-bold text-theme-accent">Heating:</span> <span className="font-bold text-[var(--foreground)]">95% of homes</span> heated by geothermal energy—virtually zero heating emissions</p>
                    <p><span className="font-bold text-theme-accent">Transportation:</span> Converting bus fleet to <span className="font-bold text-[var(--foreground)]">hydrogen fuel cells</span>, aiming 100% clean transport by 2030</p>
                    <p><span className="font-bold text-theme-accent">Carbon Capture:</span> Home to <span className="font-bold text-[var(--foreground)]">Climeworks Orca & Mammoth</span> DAC plants storing 40,000 tons CO₂/year in basalt</p>
                  </div>
                </CardContent>
              </Card>

              {/* Vancouver */}
              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-theme-secondary">🇨🇦 VANCOUVER, CANADA</h3>
                  <p className="text-lg font-bold text-[var(--foreground)] mb-4">Greenest city in North America</p>
                  <div className="space-y-3 text-base font-medium text-theme-muted">
                    <p><span className="font-bold text-theme-secondary">Emissions:</span> Reduced GHG <span className="font-bold text-[var(--foreground)]">38%</span> below 2007 levels while population grew 27%</p>
                    <p><span className="font-bold text-theme-secondary">Buildings:</span> <span className="font-bold text-[var(--foreground)]">Zero Emissions Building Plan</span>—all new buildings near-zero by 2025</p>
                    <p><span className="font-bold text-theme-secondary">Transport:</span> <span className="font-bold text-[var(--foreground)]">50% of trips</span> by walking/cycling/transit, highest EV adoption in Canada</p>
                    <p><span className="font-bold text-theme-secondary">Waste:</span> <span className="font-bold text-[var(--foreground)]">65% waste diversion</span> rate, aiming for zero waste by 2040</p>
                    <p><span className="font-bold text-theme-secondary">Green Space:</span> <span className="font-bold text-[var(--foreground)]">270+ parks</span> covering 11% of city area</p>
                  </div>
                </CardContent>
              </Card>

              {/* Singapore */}
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-theme-primary">🇸🇬 SINGAPORE</h3>
                  <p className="text-lg font-bold text-[var(--foreground)] mb-4">Asia's leading green city-state</p>
                  <div className="space-y-3 text-base font-medium text-theme-muted">
                    <p><span className="font-bold text-theme-primary">Green Buildings:</span> <span className="font-bold text-[var(--foreground)]">50% of buildings</span> Green Mark certified, target 80% by 2030</p>
                    <p><span className="font-bold text-theme-primary">Solar:</span> Aiming for <span className="font-bold text-[var(--foreground)]">2 GW solar by 2030</span>—enough for 350,000 homes (5x current capacity)</p>
                    <p><span className="font-bold text-theme-primary">NEWater:</span> Recycles <span className="font-bold text-[var(--foreground)]">40% of water supply</span> from wastewater—ultra-clean, drinkable</p>
                    <p><span className="font-bold text-theme-primary">Green Roofs:</span> <span className="font-bold text-[var(--foreground)]">200+ hectares</span> of rooftop greenery, aiming to double by 2030</p>
                    <p><span className="font-bold text-theme-primary">Public Transit:</span> <span className="font-bold text-[var(--foreground)]">75% of morning trips</span> by public transport—best in world</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12">
              <Citation
                statistic="City sustainability achievements"
                sources={[
                  {
                    title: "CPH 2025 Climate Plan",
                    author: "City of Copenhagen",
                    organization: "Copenhagen Municipality",
                    year: 2023,
                    url: "https://www.kk.dk/carbonneut"
                  },
                  {
                    title: "Climate Action Plan 2050",
                    author: "City of Vancouver",
                    organization: "Vancouver City Council",
                    year: 2022,
                    url: "https://vancouver.ca/green-vancouver/climate-action.aspx"
                  },
                  {
                    title: "Green Plan 2030",
                    author: "Singapore Government",
                    organization: "Singapore Ministry of Sustainability",
                    year: 2021,
                    url: "https://www.greenplan.gov.sg/"
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Regenerative Farm Success */}
      <section className="py-24 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[color-mix(in_srgb,var(--secondary)_80%,black)] flex items-center justify-center shadow-theme-xl">
                <Sprout className="w-10 h-10 text-[var(--primary-foreground)]" />
              </div>
              <div>
                <h2 className="text-5xl font-black text-[var(--foreground)]">REGENERATIVE FARMS</h2>
                <p className="text-xl font-semibold text-theme-muted mt-2">Farms healing land while increasing profitability</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-theme-primary">WHITE OAK PASTURES (Georgia, USA)</h3>
                  <p className="text-lg font-bold text-[var(--foreground)] mb-4">Carbon-negative beef farm</p>
                  <div className="space-y-3 text-base font-medium text-theme-muted">
                    <p><span className="font-bold text-theme-primary">Carbon Impact:</span> Sequesters <span className="font-bold text-[var(--foreground)]">3.5 lbs CO₂ per 1 lb beef</span> produced (study by Quantis/Michigan State)</p>
                    <p><span className="font-bold text-theme-primary">Comparison:</span> Conventional feedlot beef emits <span className="font-bold text-[var(--foreground)]">33 lbs CO₂ per lb</span>—White Oak is <span className="font-bold">111% more climate-friendly</span></p>
                    <p><span className="font-bold text-theme-primary">Practices:</span> Multi-species grazing (cattle, pigs, chickens), adaptive grazing, no synthetic inputs</p>
                    <p><span className="font-bold text-theme-primary">Soil Health:</span> Increased organic matter from <span className="font-bold text-[var(--foreground)]">1% to 8%</span> in 10 years</p>
                    <p><span className="font-bold text-theme-primary">Economics:</span> Direct-to-consumer sales generate <span className="font-bold text-[var(--foreground)]">$20M+ annually</span></p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-theme-accent">GABE BROWN RANCH (North Dakota, USA)</h3>
                  <p className="text-lg font-bold text-[var(--foreground)] mb-4">No-till, cover crop pioneer</p>
                  <div className="space-y-3 text-base font-medium text-theme-muted">
                    <p><span className="font-bold text-theme-accent">Soil Organic Matter:</span> Increased from <span className="font-bold text-[var(--foreground)]">1.7% to 6.1%</span> over 20 years</p>
                    <p><span className="font-bold text-theme-accent">Water Infiltration:</span> Went from <span className="font-bold text-[var(--foreground)]">0.5 inches/hour to 8+ inches/hour</span>—40% more rainfall captured</p>
                    <p><span className="font-bold text-theme-accent">Input Costs:</span> Reduced by <span className="font-bold text-[var(--foreground)]">$120/acre</span> by eliminating synthetic fertilizers/pesticides</p>
                    <p><span className="font-bold text-theme-accent">Profitability:</span> Net profit increased <span className="font-bold text-[var(--foreground)]">$100-$200/acre</span> vs. conventional neighbors</p>
                    <p><span className="font-bold text-theme-accent">Resilience:</span> Maintained yields during 2002, 2006, 2017 droughts while neighbors lost crops</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Citation
                statistic="Regenerative farm carbon and economic data"
                sources={[
                  {
                    title: "Life Cycle Assessment of Beef Production from the White Oak Pastures",
                    author: "Quantis & Michigan State University",
                    organization: "Quantis",
                    year: 2019,
                    url: "https://blog.whiteoakpastures.com/hubfs/WOP-LCA-Quantis-2019.pdf"
                  },
                  {
                    title: "Dirt to Soil: One Family's Journey into Regenerative Agriculture",
                    author: "Gabe Brown",
                    organization: "Chelsea Green Publishing",
                    year: 2018,
                    url: "https://www.chelseagreen.com/product/dirt-to-soil/"
                  },
                  {
                    title: "Regenerative Agriculture and Climate Change",
                    author: "Rodale Institute",
                    organization: "Rodale Institute",
                    year: 2020,
                    url: "https://rodaleinstitute.org/why-organic/organic-farming-practices/regenerative-organic-agriculture/"
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Net-Zero Buildings */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_srgb,var(--primary)_80%,black)] flex items-center justify-center shadow-theme-xl">
                <Home className="w-10 h-10 text-[var(--primary-foreground)]" />
              </div>
              <div>
                <h2 className="text-5xl font-black text-[var(--foreground)]">NET-ZERO BUILDINGS</h2>
                <p className="text-xl font-semibold text-theme-muted mt-2">Structures producing as much energy as they consume</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-theme-primary">BULLITT CENTER (Seattle, USA)</h3>
                  <p className="text-lg font-bold text-[var(--foreground)] mb-4">"Greenest commercial building in the world"</p>
                  <div className="space-y-3 text-base font-medium text-theme-muted">
                    <p><span className="font-bold text-theme-primary">Energy:</span> <span className="font-bold text-[var(--foreground)]">Net-positive</span>—rooftop solar generates 230,000 kWh/year, uses only 209,000</p>
                    <p><span className="font-bold text-theme-primary">Water:</span> 100% rainwater harvesting, <span className="font-bold text-[var(--foreground)]">net-zero water</span> with composting toilets</p>
                    <p><span className="font-bold text-theme-primary">Materials:</span> Used <span className="font-bold text-[var(--foreground)]">Red List-free materials</span> (no toxic substances), certified Forest Stewardship Council wood</p>
                    <p><span className="font-bold text-theme-primary">Performance:</span> Uses <span className="font-bold text-[var(--foreground)]">83% less energy</span> than comparable Seattle office buildings</p>
                    <p><span className="font-bold text-theme-primary">Cost:</span> Tenants save <span className="font-bold text-[var(--foreground)]">$60,000+/year</span> on utilities, building fully leased at premium rents</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-theme-accent">EDGE OLYMPIC (Amsterdam, Netherlands)</h3>
                  <p className="text-lg font-bold text-[var(--foreground)] mb-4">World's most sustainable office (BREEAM 98.4%)</p>
                  <div className="space-y-3 text-base font-medium text-theme-muted">
                    <p><span className="font-bold text-theme-accent">Energy:</span> Uses <span className="font-bold text-[var(--foreground)]">70% less electricity</span> than average office via smart LED lighting + 4,200 solar panels</p>
                    <p><span className="font-bold text-theme-accent">Smart Systems:</span> <span className="font-bold text-[var(--foreground)]">28,000 sensors</span> optimize lighting, heating, cooling per person—app-controlled</p>
                    <p><span className="font-bold text-theme-accent">Water:</span> Rainwater collection + greywater recycling reduces usage <span className="font-bold text-[var(--foreground)]">40%</span></p>
                    <p><span className="font-bold text-theme-accent">Thermal Storage:</span> Aquifer thermal energy storage system eliminates traditional HVAC</p>
                    <p><span className="font-bold text-theme-accent">ROI:</span> Energy savings pay for smart systems in <span className="font-bold text-[var(--foreground)]">8.5 years</span>, then pure profit</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Citation
                statistic="Net-zero building performance data"
                sources={[
                  {
                    title: "Bullitt Center Performance Report",
                    author: "Bullitt Foundation",
                    organization: "Bullitt Center",
                    year: 2023,
                    url: "https://bullittcenter.org/building/performance/"
                  },
                  {
                    title: "EDGE Olympic Amsterdam Case Study",
                    author: "EDGE Technologies",
                    organization: "OVG Real Estate",
                    year: 2022,
                    url: "https://edge.tech/edge-olympic/"
                  },
                  {
                    title: "Net Zero Energy Buildings: A Review",
                    author: "World Green Building Council",
                    organization: "WorldGBC",
                    year: 2021,
                    url: "https://www.worldgbc.org/advancing-net-zero"
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="py-24 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Card className="border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--background))] to-[var(--background)]">
              <CardContent className="p-12">
                <div className="flex items-center gap-4 mb-8">
                  <Target className="w-12 h-12 text-theme-primary" />
                  <h2 className="text-4xl font-black text-[var(--foreground)]">KEY TAKEAWAYS</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <Heart className="w-6 h-6 text-theme-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-black text-lg mb-2 text-[var(--foreground)]">Sustainability = Profitability</h3>
                      <p className="text-theme-muted font-medium">Patagonia, Unilever, Interface all saw revenue growth accelerate with sustainability focus</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <TrendingUp className="w-6 h-6 text-theme-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-black text-lg mb-2 text-[var(--foreground)]">Real Cost Savings</h3>
                      <p className="text-theme-muted font-medium">Interface saved $450M, net-zero buildings cutting energy costs 70-90%</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Globe className="w-6 h-6 text-theme-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-black text-lg mb-2 text-[var(--foreground)]">Scalable Solutions</h3>
                      <p className="text-theme-muted font-medium">Cities, companies, farms at all scales proving it works—from individual to global</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Award className="w-6 h-6 text-theme-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-black text-lg mb-2 text-[var(--foreground)]">Market Advantage</h3>
                      <p className="text-theme-muted font-medium">Sustainable brands growing 3x faster, green buildings commanding premium rents</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-6xl font-black">YOUR SUCCESS STORY STARTS NOW</h2>
            <p className="text-2xl font-semibold">
              These pioneers proved it's possible. Now it's your turn.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/tools/carbon-calculator">
                <button className="text-xl px-12 py-8 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-2xl rounded-xl">
                  MEASURE YOUR IMPACT
                </button>
              </Link>
              <Link href="/learn">
                <button className="text-xl px-12 py-8 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black rounded-xl">
                  START LEARNING
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
