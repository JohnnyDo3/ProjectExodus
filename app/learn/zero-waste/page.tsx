import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Citation } from '@/components/learn/Citation'
import { BackButton } from '@/components/navigation/BackButton'
import { Recycle, Trash2, PackageCheck, Leaf, TrendingDown, Home, ShoppingBag, Utensils, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function ZeroWastePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-32 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] via-[var(--background)] to-[color-mix(in_srgb,var(--primary)_20%,var(--background))] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="text-7xl mb-6">♻️</div>
            <h1 className="text-[var(--foreground)]" style={{
              fontSize: 'clamp(3rem, 10vw, 6rem)',
              fontWeight: 900,
              lineHeight: 1
            }}>
              ZERO WASTE LIVING
            </h1>
            <p className="text-2xl font-bold text-theme-muted max-w-3xl mx-auto">
              Redesigning our lives to <span style={{
                background: 'linear-gradient(135deg, var(--secondary), var(--primary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>eliminate waste</span> and create circular systems
            </p>
          </div>
        </div>
      </section>

      {/* The Waste Crisis */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-[var(--foreground)] mb-4">THE GLOBAL WASTE CRISIS</h2>
              <p className="text-xl font-semibold text-theme-muted">Understanding the scale of the problem</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8 text-center">
                  <Trash2 className="w-12 h-12 text-theme-secondary mx-auto mb-4" />
                  <div className="text-4xl font-black text-theme-secondary mb-2">2.24 Bn</div>
                  <p className="font-bold text-[var(--foreground)] text-sm">Tons of waste generated globally each year</p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8 text-center">
                  <TrendingDown className="w-12 h-12 text-theme-accent mx-auto mb-4" />
                  <div className="text-4xl font-black text-theme-accent mb-2">13.5%</div>
                  <p className="font-bold text-[var(--foreground)] text-sm">Global recycling rate (only!)</p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8 text-center">
                  <PackageCheck className="w-12 h-12 text-theme-primary mx-auto mb-4" />
                  <div className="text-4xl font-black text-theme-primary mb-2">$120 Bn</div>
                  <p className="font-bold text-[var(--foreground)] text-sm">Value of plastic packaging wasted annually</p>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8 text-center">
                  <Leaf className="w-12 h-12 text-theme-secondary mx-auto mb-4" />
                  <div className="text-4xl font-black text-theme-secondary mb-2">3.3 Bn</div>
                  <p className="font-bold text-[var(--foreground)] text-sm">Tons of CO₂ from waste management annually</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-4 border-theme-secondary">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black text-theme-secondary mb-6">Where Does Our Waste Go?</h3>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-secondary">
                    <h4 className="text-xl font-black text-theme-secondary mb-3">Landfills (55%)</h4>
                    <ul className="space-y-2 text-sm text-theme-muted">
                      <li>• Decomposition produces methane (28x worse than CO₂)</li>
                      <li>• Leachate pollutes groundwater</li>
                      <li>• Takes up <span className="font-bold">1.8 million acres</span> in US alone</li>
                      <li>• Organics take <span className="font-bold">25+ years</span> to decompose anaerobically</li>
                    </ul>
                  </div>

                  <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-accent">
                    <h4 className="text-xl font-black text-theme-accent mb-3">Incineration (11%)</h4>
                    <ul className="space-y-2 text-sm text-theme-muted">
                      <li>• Releases toxic pollutants (dioxins, heavy metals)</li>
                      <li>• Produces <span className="font-bold">1 ton CO₂ per ton</span> waste burned</li>
                      <li>• Ash residue still requires landfilling</li>
                      <li>• Disproportionately impacts low-income communities</li>
                    </ul>
                  </div>

                  <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-primary">
                    <h4 className="text-xl font-black text-theme-primary mb-3">Ocean Dumping (8 M tons/year)</h4>
                    <ul className="space-y-2 text-sm text-theme-muted">
                      <li>• <span className="font-bold">5.25 trillion</span> pieces of plastic in oceans</li>
                      <li>• Forms 5 major garbage patches</li>
                      <li>• Microplastics in <span className="font-bold">90% of sea salt</span></li>
                      <li>• Kills 1+ million seabirds & 100,000 marine mammals yearly</li>
                    </ul>
                  </div>
                </div>

                <Citation
                  statistic="Global waste statistics and environmental impact"
                  sources={[
                    {
                      title: "What a Waste 2.0: A Global Snapshot of Solid Waste Management to 2050",
                      author: "Kaza, Silpa et al.",
                      organization: "World Bank Group",
                      year: 2024,
                      url: "https://openknowledge.worldbank.org/handle/10986/30317"
                    },
                    {
                      title: "The New Plastics Economy: Rethinking the Future of Plastics",
                      author: "Ellen MacArthur Foundation",
                      organization: "Ellen MacArthur Foundation",
                      year: 2024,
                      url: "https://ellenmacarthurfoundation.org/the-new-plastics-economy-rethinking-the-future-of-plastics"
                    },
                    {
                      title: "Marine Plastic Pollution",
                      author: "IUCN",
                      organization: "International Union for Conservation of Nature",
                      year: 2024,
                      url: "https://www.iucn.org/resources/issues-brief/marine-plastic-pollution"
                    }
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The 5 R's */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-[var(--foreground)] mb-12 text-center">THE 5 R's OF ZERO WASTE</h2>

            <div className="space-y-6">
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-theme-primary flex items-center justify-center text-[var(--primary-foreground)] text-3xl font-black">1</div>
                    <h3 className="text-3xl font-black text-theme-primary">REFUSE</h3>
                  </div>
                  <p className="text-lg text-[var(--foreground)] mb-4">The most impactful step: say no to what you don't need. <span className="font-bold text-theme-primary">Prevention is better than recycling.</span></p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Decline single-use plastics (straws, bags, utensils)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Say no to freebies and promotional items</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Opt out of junk mail (<span className="font-bold">90 lbs/person/year</span> in US)</span>
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Refuse excessive packaging at checkout</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Choose digital over paper when possible</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Decline hotel mini toiletries (bring your own)</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-theme-accent flex items-center justify-center text-[var(--primary-foreground)] text-3xl font-black">2</div>
                    <h3 className="text-3xl font-black text-theme-accent">REDUCE</h3>
                  </div>
                  <p className="text-lg text-[var(--foreground)] mb-4">Minimize consumption and choose quality over quantity. <span className="font-bold text-theme-accent">Americans throw away 82 lbs of textiles per person annually.</span></p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Embrace minimalism (own <span className="font-bold">30% less</span>, increase satisfaction)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Plan meals to reduce food waste (<span className="font-bold">40% food wasted</span> in US)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Buy only what you need, when you need it</span>
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Choose multi-purpose items over specialized gadgets</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Digitize documents, photos, and media</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Borrow or rent instead of buying rarely-used items</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-theme-secondary flex items-center justify-center text-[var(--primary-foreground)] text-3xl font-black">3</div>
                    <h3 className="text-3xl font-black text-theme-secondary">REUSE</h3>
                  </div>
                  <p className="text-lg text-[var(--foreground)] mb-4">Choose reusables over disposables. <span className="font-bold text-theme-secondary">1 reusable water bottle replaces 167 plastic bottles/year.</span></p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Carry reusable bags, bottles, cups, utensils</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Use cloth napkins, towels, handkerchiefs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Buy second-hand (saves <span className="font-bold">70% embodied energy</span>)</span>
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Repurpose containers for storage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Use rechargeable batteries (saves <span className="font-bold">1,000+ disposables</span>)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Donate or swap instead of discarding</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-theme-primary flex items-center justify-center text-[var(--primary-foreground)] text-3xl font-black">4</div>
                    <h3 className="text-3xl font-black text-theme-primary">RECYCLE</h3>
                  </div>
                  <p className="text-lg text-[var(--foreground)] mb-4">Last resort after refuse, reduce, and reuse. <span className="font-bold text-theme-primary">Proper recycling saves 95% energy vs. virgin aluminum production.</span></p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-black text-lg text-theme-primary mb-3">What to Recycle</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Clean paper, cardboard (<span className="font-bold">1 ton saves 17 trees</span>)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Glass bottles & jars (infinitely recyclable)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Metal cans (aluminum, steel, tin)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Plastics #1, #2, #5 (check local guidelines)</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-theme-secondary mb-3">Common Contamination</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Greasy pizza boxes (compost instead)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Plastic bags (return to store drop-off)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Styrofoam (not recyclable in most areas)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Wish-cycling contaminates <span className="font-bold">25% of loads</span></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-theme-accent flex items-center justify-center text-[var(--primary-foreground)] text-3xl font-black">5</div>
                    <h3 className="text-3xl font-black text-theme-accent">ROT (COMPOST)</h3>
                  </div>
                  <p className="text-lg text-[var(--foreground)] mb-4">Return organics to the earth. <span className="font-bold text-theme-accent">Composting reduces methane emissions by 50% vs. landfills.</span></p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-black text-lg text-theme-accent mb-3">Compost Benefits</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Diverts <span className="font-bold">30%</span> of household waste</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Creates nutrient-rich soil amendment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Sequesters carbon in soil</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Reduces need for chemical fertilizers</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-theme-primary mb-3">What to Compost</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Fruit & vegetable scraps</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Coffee grounds & tea bags (remove staples)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Eggshells, nutshells</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--foreground)]">Yard waste, leaves, grass clippings</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Citation
              statistic="Zero waste practices and waste reduction statistics"
              sources={[
                {
                  title: "Zero Waste: A Sustainable Approach to Waste Management",
                  author: "US EPA",
                  organization: "Environmental Protection Agency",
                  year: 2024,
                  url: "https://www.epa.gov/recycle/reducing-and-reusing-basics"
                },
                {
                  title: "The Impact of Composting on Greenhouse Gas Emissions",
                  author: "Project Drawdown",
                  organization: "Project Drawdown",
                  year: 2024,
                  url: "https://drawdown.org/solutions/composting"
                },
                {
                  title: "Municipal Solid Waste Generation, Recycling, and Disposal",
                  author: "EPA",
                  organization: "US Environmental Protection Agency",
                  year: 2024,
                  url: "https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling"
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Room-by-Room Guide */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-[var(--foreground)] mb-12 text-center">ROOM-BY-ROOM ZERO WASTE GUIDE</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Utensils className="w-10 h-10 text-theme-primary" />
                    <h3 className="text-2xl font-black text-theme-primary">KITCHEN</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Buy in bulk with reusable containers</p>
                        <p className="text-sm text-theme-muted">Reduces packaging waste by 90%</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Beeswax wraps replace plastic wrap</p>
                        <p className="text-sm text-theme-muted">Last 1+ year, fully compostable</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Silicone storage bags vs. Ziploc</p>
                        <p className="text-sm text-theme-muted">Reusable 3,000+ times</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Compost bin for food scraps</p>
                        <p className="text-sm text-theme-muted">Diverts 200+ lbs/year from landfill</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Home className="w-10 h-10 text-theme-accent" />
                    <h3 className="text-2xl font-black text-theme-accent">BATHROOM</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-theme-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Shampoo & soap bars</p>
                        <p className="text-sm text-theme-muted">Eliminates 552M plastic bottles/year</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-theme-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Bamboo toothbrush</p>
                        <p className="text-sm text-theme-muted">1 billion plastic toothbrushes discarded yearly in US</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-theme-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Safety razor vs. disposables</p>
                        <p className="text-sm text-theme-muted">Saves $200/year, lasts lifetime</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-theme-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Reusable cotton rounds</p>
                        <p className="text-sm text-theme-muted">Replaces 365 disposables/person/year</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <ShoppingBag className="w-10 h-10 text-theme-secondary" />
                    <h3 className="text-2xl font-black text-theme-secondary">SHOPPING</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-theme-secondary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Reusable produce bags</p>
                        <p className="text-sm text-theme-muted">Americans use 100B plastic bags/year</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-theme-secondary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Shop farmers markets</p>
                        <p className="text-sm text-theme-muted">Less packaging, supports local economy</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-theme-secondary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Choose glass/metal over plastic</p>
                        <p className="text-sm text-theme-muted">Infinitely recyclable materials</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-theme-secondary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">BYOC (Bring Your Own Container)</p>
                        <p className="text-sm text-theme-muted">Many stores fill your containers</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Leaf className="w-10 h-10 text-theme-primary" />
                    <h3 className="text-2xl font-black text-theme-primary">LIFESTYLE</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Digital subscriptions vs. magazines</p>
                        <p className="text-sm text-theme-muted">Saves 55 lbs paper/year</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Library instead of buying books</p>
                        <p className="text-sm text-theme-muted">1 library book = 6.6 purchased books saved</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Repair instead of replace</p>
                        <p className="text-sm text-theme-muted">Extends product life 5-10x</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Experience gifts vs. physical items</p>
                        <p className="text-sm text-theme-muted">Zero waste, maximum memories</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Citation
              statistic="Zero waste household strategies and impact"
              sources={[
                {
                  title: "Zero Waste Home: The Ultimate Guide",
                  author: "Johnson, Bea",
                  organization: "Zero Waste Home",
                  year: 2024,
                  url: "https://zerowastehome.com/"
                },
                {
                  title: "Plastic Waste by the Numbers",
                  author: "National Geographic Society",
                  organization: "National Geographic",
                  year: 2024,
                  url: "https://www.nationalgeographic.com/environment/article/plastic-pollution"
                },
                {
                  title: "Facts and Figures about Materials, Waste and Recycling",
                  author: "EPA",
                  organization: "US Environmental Protection Agency",
                  year: 2024,
                  url: "https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling"
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-br from-[var(--secondary)] via-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-6xl font-black">START YOUR ZERO WASTE JOURNEY</h2>
            <p className="text-2xl font-semibold">
              Every small change adds up. Begin today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/products?category=zero-waste">
                <Button size="lg" className="text-xl px-12 py-8 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-2xl">
                  SHOP ZERO WASTE PRODUCTS
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
