import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Citation } from '@/components/learn/Citation'
import { BackButton } from '@/components/navigation/BackButton'
import { Shirt, Recycle, TrendingUp, Users, Leaf, Droplet, Factory, CheckCircle, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function SustainableFashionPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-32 bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_20%,var(--background))] via-[var(--background)] to-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="text-7xl mb-6">👕</div>
            <h1 className="text-[var(--foreground)]" style={{
              fontSize: 'clamp(3rem, 10vw, 6rem)',
              fontWeight: 900,
              lineHeight: 1
            }}>
              SUSTAINABLE FASHION
            </h1>
            <p className="text-2xl font-bold text-theme-muted max-w-3xl mx-auto">
              Transforming the fashion industry through <span style={{
                background: 'linear-gradient(135deg, var(--accent), var(--secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>ethical practices and circular design</span>
            </p>
          </div>
        </div>
      </section>

      {/* Crisis Overview */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-[var(--foreground)] mb-4">THE FASHION CRISIS</h2>
              <p className="text-xl font-semibold text-theme-muted">Understanding the scale of the problem</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="border-4 border-theme-secondary bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_10%,var(--background))] to-[var(--background)]">
                <CardContent className="p-8 text-center">
                  <Factory className="w-12 h-12 text-theme-secondary mx-auto mb-4" />
                  <div className="text-4xl font-black text-theme-secondary mb-2">10%</div>
                  <p className="font-bold text-[var(--foreground)] text-sm">Global carbon emissions from fashion industry</p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_10%,var(--background))] to-[var(--background)]">
                <CardContent className="p-8 text-center">
                  <Droplet className="w-12 h-12 text-theme-accent mx-auto mb-4" />
                  <div className="text-4xl font-black text-theme-accent mb-2">20%</div>
                  <p className="font-bold text-[var(--foreground)] text-sm">Global wastewater from textile dyeing</p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--background))] to-[var(--background)]">
                <CardContent className="p-8 text-center">
                  <Shirt className="w-12 h-12 text-theme-primary mx-auto mb-4" />
                  <div className="text-4xl font-black text-theme-primary mb-2">92M</div>
                  <p className="font-bold text-[var(--foreground)] text-sm">Tons of textile waste annually</p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_10%,var(--background))] to-[var(--background)]">
                <CardContent className="p-8 text-center">
                  <TrendingUp className="w-12 h-12 text-theme-secondary mx-auto mb-4" />
                  <div className="text-4xl font-black text-theme-secondary mb-2">$2.5T</div>
                  <p className="font-bold text-[var(--foreground)] text-sm">Global fashion industry value</p>
                </CardContent>
              </Card>
            </div>

            <Citation
              statistic="Fashion industry environmental impact statistics"
              sources={[
                {
                  title: "Fashion on Climate: McKinsey Sustainability",
                  author: "McKinsey & Global Fashion Agenda",
                  organization: "McKinsey & Company",
                  year: 2024,
                  url: "https://www.mckinsey.com/industries/retail/our-insights/fashion-on-climate"
                },
                {
                  title: "A New Textiles Economy: Redesigning Fashion's Future",
                  author: "Ellen MacArthur Foundation",
                  organization: "Ellen MacArthur Foundation",
                  year: 2024,
                  url: "https://ellenmacarthurfoundation.org/a-new-textiles-economy"
                },
                {
                  title: "Measuring Fashion: Environmental Impact of the Global Apparel and Footwear Industries Study",
                  author: "Quantis International",
                  organization: "Quantis",
                  year: 2024,
                  url: "https://quantis.com/measuring-fashion-report/"
                },
                {
                  title: "The State of Fashion 2024",
                  author: "McKinsey & BoF",
                  organization: "McKinsey & The Business of Fashion",
                  year: 2024,
                  url: "https://www.mckinsey.com/industries/retail/our-insights/state-of-fashion"
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Fast Fashion Problem */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-6xl mx-auto">
            <Card className="border-4 border-theme-secondary">
              <CardContent className="p-10">
                <div className="flex items-center gap-4 mb-6">
                  <AlertTriangle className="w-12 h-12 text-theme-secondary" />
                  <h2 className="text-4xl font-black text-theme-secondary">THE FAST FASHION PROBLEM</h2>
                </div>

                <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">
                  Fast fashion has created a culture of disposable clothing, where garments are worn an average of only <span className="font-black text-2xl text-theme-secondary">7-10 times</span> before being discarded. The industry produces <span className="font-bold text-theme-secondary">100 billion garments annually</span>—14 items for every person on Earth—with most ending up in landfills within a year.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-[var(--background)] p-6 rounded-xl border-2 border-theme-secondary">
                    <h3 className="text-xl font-black text-theme-secondary mb-4">Environmental Costs</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Droplet className="w-5 h-5 text-theme-accent mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Water Consumption</p>
                          <p className="text-sm text-theme-muted">2,700 liters for one cotton t-shirt (drinking water for 2.5 years)</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Factory className="w-5 h-5 text-theme-secondary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Carbon Footprint</p>
                          <p className="text-sm text-theme-muted">1.2 billion tons CO₂ annually—more than aviation + shipping combined</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Microplastics</p>
                          <p className="text-sm text-theme-muted">500,000 tons released into oceans yearly from synthetic textiles</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[var(--background)] p-6 rounded-xl border-2 border-theme-accent">
                    <h3 className="text-xl font-black text-theme-accent mb-4">Social Costs</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-theme-accent mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Labor Exploitation</p>
                          <p className="text-sm text-theme-muted">75 million garment workers, 80% women, earning poverty wages</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-theme-secondary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Unsafe Conditions</p>
                          <p className="text-sm text-theme-muted">Rana Plaza collapse (2013): 1,134 deaths highlighted industry negligence</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Factory className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">Chemical Exposure</p>
                          <p className="text-sm text-theme-muted">8,000+ synthetic chemicals used, many toxic to workers and consumers</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <Citation
                  statistic="Fast fashion environmental and social impact"
                  sources={[
                    {
                      title: "The Impact of Textile Production and Waste on the Environment",
                      author: "European Environment Agency",
                      organization: "EEA",
                      year: 2024,
                      url: "https://www.eea.europa.eu/publications/textiles-and-the-environment"
                    },
                    {
                      title: "Pulse of the Fashion Industry Report",
                      author: "Global Fashion Agenda & BCG",
                      organization: "Global Fashion Agenda",
                      year: 2024,
                      url: "https://www.globalfashionagenda.org/pulse-report/"
                    },
                    {
                      title: "Fashion Industry Waste Statistics",
                      author: "World Resources Institute",
                      organization: "WRI",
                      year: 2024,
                      url: "https://www.wri.org/insights/apparel-industry-environmental-impact"
                    }
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Circular Fashion Solutions */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Recycle className="w-16 h-16 text-theme-primary" />
              <h2 className="text-5xl font-black text-[var(--foreground)]">CIRCULAR FASHION</h2>
            </div>

            <Card className="border-4 border-theme-primary mb-8">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black text-theme-primary mb-6">The Circular Economy Model</h3>

                <p className="text-lg text-[var(--foreground)] leading-relaxed mb-8">
                  Circular fashion reimagines the entire lifecycle of clothing—from design to disposal—eliminating waste and pollution. The Ellen MacArthur Foundation estimates that adopting circular principles could create <span className="font-black text-2xl text-theme-primary">$560 billion</span> in economic opportunities while reducing carbon emissions by <span className="font-bold text-theme-primary">143 million tons annually</span> by 2030.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-primary">
                    <div className="text-5xl mb-3">♻️</div>
                    <h4 className="text-xl font-black text-theme-primary mb-3">Design for Longevity</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Durable, timeless designs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">High-quality materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Modular, repairable construction</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Mono-material for recyclability</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-accent">
                    <div className="text-5xl mb-3">🔄</div>
                    <h4 className="text-xl font-black text-theme-accent mb-3">Extend Product Life</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Repair and alteration services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Rental and sharing platforms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Resale and second-hand markets</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Care instructions for longevity</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-secondary">
                    <div className="text-5xl mb-3">🌱</div>
                    <h4 className="text-xl font-black text-theme-secondary mb-3">Regenerate Systems</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Textile-to-textile recycling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Biodegradable natural fibers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Regenerative agriculture for fibers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Closed-loop production systems</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Citation
                  statistic="Circular fashion economic and environmental benefits"
                  sources={[
                    {
                      title: "A New Textiles Economy: Redesigning Fashion's Future",
                      author: "Ellen MacArthur Foundation",
                      organization: "Ellen MacArthur Foundation",
                      year: 2024,
                      url: "https://ellenmacarthurfoundation.org/a-new-textiles-economy"
                    },
                    {
                      title: "Circular Business Models in the Textile and Fashion Industry",
                      author: "European Environment Agency",
                      organization: "EEA",
                      year: 2024,
                      url: "https://www.eea.europa.eu/publications/circular-business-models-in-the"
                    },
                    {
                      title: "The Future of Fashion: Circular Economy",
                      author: "World Economic Forum",
                      organization: "WEF",
                      year: 2024,
                      url: "https://www.weforum.org/agenda/2024/01/future-of-fashion-circular-economy/"
                    }
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sustainable Materials */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-[var(--foreground)] mb-12 text-center">SUSTAINABLE MATERIALS</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <Leaf className="w-12 h-12 text-theme-primary mb-4" />
                  <h3 className="text-2xl font-black text-theme-primary mb-6">Natural & Regenerative Fibers</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-black text-lg text-[var(--foreground)] mb-2">Organic Cotton</h4>
                      <ul className="text-sm text-theme-muted space-y-1">
                        <li>• <span className="font-bold">91% less water</span> than conventional cotton</li>
                        <li>• No synthetic pesticides or GMOs</li>
                        <li>• Builds soil health through crop rotation</li>
                        <li>• Global market: <span className="font-bold">$2.1B (2024)</span>, growing 12% annually</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-black text-lg text-[var(--foreground)] mb-2">Hemp</h4>
                      <ul className="text-sm text-theme-muted space-y-1">
                        <li>• Requires <span className="font-bold">50% less water</span> than cotton</li>
                        <li>• Sequesters <span className="font-bold">1.63 tons CO₂ per ton</span> of fiber</li>
                        <li>• No pesticides needed, naturally pest-resistant</li>
                        <li>• Regenerates soil in 4 months</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-black text-lg text-[var(--foreground)] mb-2">Linen (Flax)</h4>
                      <ul className="text-sm text-theme-muted space-y-1">
                        <li>• <span className="font-bold">Zero irrigation</span> in temperate climates</li>
                        <li>• Entire plant is usable (zero waste)</li>
                        <li>• Biodegrades in <span className="font-bold">2 weeks</span></li>
                        <li>• Durable: lasts decades with proper care</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-black text-lg text-[var(--foreground)] mb-2">Tencel™ (Lyocell)</h4>
                      <ul className="text-sm text-theme-muted space-y-1">
                        <li>• Made from sustainably harvested eucalyptus</li>
                        <li>• <span className="font-bold">99% solvent recovery</span> in closed-loop process</li>
                        <li>• <span className="font-bold">80% less water</span> than conventional cotton</li>
                        <li>• Fully biodegradable</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <Recycle className="w-12 h-12 text-theme-accent mb-4" />
                  <h3 className="text-2xl font-black text-theme-accent mb-6">Innovative & Recycled Materials</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-black text-lg text-[var(--foreground)] mb-2">Recycled Polyester (rPET)</h4>
                      <ul className="text-sm text-theme-muted space-y-1">
                        <li>• <span className="font-bold">59% less energy</span> than virgin polyester</li>
                        <li>• Diverts <span className="font-bold">70M+ plastic bottles</span> from landfills daily</li>
                        <li>• Reduces CO₂ emissions by <span className="font-bold">32%</span></li>
                        <li>• Market share: <span className="font-bold">14%</span> of global polyester (2024)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-black text-lg text-[var(--foreground)] mb-2">Piñatex (Pineapple Leather)</h4>
                      <ul className="text-sm text-theme-muted space-y-1">
                        <li>• Made from pineapple leaf waste</li>
                        <li>• <span className="font-bold">Zero additional land/water</span> required</li>
                        <li>• Provides extra income for farming communities</li>
                        <li>• Used by Hugo Boss, H&M, Nike</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-black text-lg text-[var(--foreground)] mb-2">Mycelium Leather</h4>
                      <ul className="text-sm text-theme-muted space-y-1">
                        <li>• Grown in <span className="font-bold">2 weeks</span> (vs. years for animal leather)</li>
                        <li>• <span className="font-bold">90% less carbon</span> footprint</li>
                        <li>• No animals, no chromium tanning</li>
                        <li>• Brands: Hermès, Adidas, Stella McCartney</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-black text-lg text-[var(--foreground)] mb-2">Ocean Plastic Textiles</h4>
                      <ul className="text-sm text-theme-muted space-y-1">
                        <li>• <span className="font-bold">11 plastic bottles</span> = 1 jacket</li>
                        <li>• Removes marine pollution</li>
                        <li>• Identical performance to virgin polyester</li>
                        <li>• Brands: Patagonia, Adidas, G-Star RAW</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Citation
              statistic="Sustainable textile materials environmental impact data"
              sources={[
                {
                  title: "Preferred Fiber & Materials Market Report 2024",
                  author: "Textile Exchange",
                  organization: "Textile Exchange",
                  year: 2024,
                  url: "https://textileexchange.org/knowledge-center/reports/preferred-fiber-and-materials/"
                },
                {
                  title: "The Higg Materials Sustainability Index",
                  author: "Sustainable Apparel Coalition",
                  organization: "SAC",
                  year: 2024,
                  url: "https://apparelcoalition.org/the-higg-index/"
                },
                {
                  title: "Circular Fibres Initiative Analysis",
                  author: "Ellen MacArthur Foundation",
                  organization: "Ellen MacArthur Foundation",
                  year: 2024,
                  url: "https://ellenmacarthurfoundation.org/topics/fashion/overview"
                },
                {
                  title: "Global Organic Textile Standard (GOTS) Statistics",
                  author: "Global Organic Textile Standard",
                  organization: "GOTS",
                  year: 2024,
                  url: "https://global-standard.org/the-standard/statistics"
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Take Action */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-[var(--foreground)] mb-12 text-center">HOW TO PARTICIPATE</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <Users className="w-12 h-12 text-theme-primary mb-4" />
                  <h3 className="text-2xl font-black text-theme-primary mb-4">AS A CONSUMER</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Buy less, choose quality over quantity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Support certified ethical brands (B Corp, Fair Trade)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Shop second-hand and vintage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Repair and upcycle existing garments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Rent for special occasions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <Factory className="w-12 h-12 text-theme-accent mb-4" />
                  <h3 className="text-2xl font-black text-theme-accent mb-4">AS A BRAND</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Implement circular design principles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Ensure supply chain transparency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Pay living wages to all workers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Use sustainable and recycled materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)]">Offer take-back and repair programs</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8">
                  <Leaf className="w-12 h-12 text-theme-secondary mb-4" />
                  <h3 className="text-2xl font-black text-theme-secondary mb-4">CERTIFICATIONS</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">GOTS</p>
                        <p className="text-sm text-theme-muted">Global Organic Textile Standard</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Fair Trade</p>
                        <p className="text-sm text-theme-muted">Ethical labor practices</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">B Corporation</p>
                        <p className="text-sm text-theme-muted">Verified social & environmental performance</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Bluesign</p>
                        <p className="text-sm text-theme-muted">Safe chemical management</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Cradle to Cradle</p>
                        <p className="text-sm text-theme-muted">Circular product design</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-br from-[var(--accent)] via-[var(--secondary)] to-[var(--primary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-6xl font-black">TRANSFORM FASHION TOGETHER</h2>
            <p className="text-2xl font-semibold">
              Every purchase is a vote for the kind of world you want to live in.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/products?category=sustainable-fashion">
                <Button size="lg" className="text-xl px-12 py-8 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-2xl">
                  SHOP ETHICAL BRANDS
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
