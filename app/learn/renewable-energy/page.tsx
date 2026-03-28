import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Citation } from '@/components/learn/Citation'
import { BackButton } from '@/components/navigation/BackButton'
import { Zap, Sun, Wind, Battery, TrendingUp, DollarSign, Leaf, Home, Factory, CheckCircle, GraduationCap, BookOpen, Award, Clock, Target, FileText, Users, Shield } from 'lucide-react'
import Link from 'next/link'

export default function RenewableEnergyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-32 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_20%,var(--background))] via-[var(--background)] to-[color-mix(in_srgb,var(--accent)_20%,var(--background))] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Learn" fallbackUrl="/learn" />
          </div>
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="text-7xl mb-6">⚡</div>
            <h1 className="text-[var(--foreground)]" style={{
              fontSize: 'clamp(3rem, 10vw, 6rem)',
              fontWeight: 900,
              lineHeight: 1
            }}>
              RENEWABLE ENERGY
            </h1>
            <p className="text-2xl font-bold text-theme-muted max-w-3xl mx-auto">
              Harnessing the power of nature to create clean, sustainable energy systems for a <span style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>regenerative future</span>
            </p>
          </div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--background))] to-[var(--background)]">
              <CardContent className="p-8 text-center">
                <TrendingUp className="w-12 h-12 text-theme-primary mx-auto mb-4" />
                <div className="text-5xl font-black text-theme-primary mb-2">29.9%</div>
                <p className="font-bold text-[var(--foreground)] mb-2">Global Electricity from Renewables (2023)</p>
                <p className="text-sm text-theme-muted">Up from 19% in 2011</p>
              </CardContent>
            </Card>
            <Card className="border-4 border-theme-accent bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_10%,var(--background))] to-[var(--background)]">
              <CardContent className="p-8 text-center">
                <DollarSign className="w-12 h-12 text-theme-accent mx-auto mb-4" />
                <div className="text-5xl font-black text-theme-accent mb-2">$1.77T</div>
                <p className="font-bold text-[var(--foreground)] mb-2">Global Clean Energy Investment (2023)</p>
                <p className="text-sm text-theme-muted">Record-breaking year</p>
              </CardContent>
            </Card>
            <Card className="border-4 border-theme-secondary bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_10%,var(--background))] to-[var(--background)]">
              <CardContent className="p-8 text-center">
                <Leaf className="w-12 h-12 text-theme-secondary mx-auto mb-4" />
                <div className="text-5xl font-black text-theme-secondary mb-2">12 Gt</div>
                <p className="font-bold text-[var(--foreground)] mb-2">CO₂ Emissions Avoided Annually</p>
                <p className="text-sm text-theme-muted">Through renewable adoption</p>
              </CardContent>
            </Card>
          </div>
          <Citation
            statistic="Global renewable energy statistics"
            sources={[
              {
                title: "Renewable Energy Statistics 2024",
                author: "International Renewable Energy Agency (IRENA)",
                organization: "IRENA",
                year: 2024,
                url: "https://www.irena.org/Publications/2024/Jul/Renewable-energy-statistics-2024"
              },
              {
                title: "World Energy Investment 2024",
                author: "International Energy Agency",
                organization: "IEA",
                year: 2024,
                url: "https://www.iea.org/reports/world-energy-investment-2024"
              },
              {
                title: "Global Status Report 2024",
                author: "REN21",
                organization: "Renewable Energy Policy Network for the 21st Century",
                year: 2024,
                url: "https://www.ren21.net/gsr-2024/"
              }
            ]}
          />
        </div>
      </section>

      {/* ACE Accreditation & Course Information */}
      <section className="py-20 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_8%,var(--background))] to-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[color-mix(in_srgb,var(--primary)_15%,var(--background))] border-2 border-theme-primary mb-6">
                <GraduationCap className="w-5 h-5 text-theme-primary" />
                <span className="text-sm font-bold text-theme-primary uppercase tracking-wider">ACE Credit Recommended Course</span>
              </div>
              <h2 className="text-4xl font-black text-[var(--foreground)] mb-4">
                Renewable Energy Systems: Technology, Policy, and Integration
              </h2>
              <p className="text-lg text-theme-muted max-w-3xl mx-auto">
                A comprehensive upper-division course designed for ACE (American Council on Education) credit recommendation in partnership with the Golisano Institute for Sustainability at Rochester Institute of Technology.
              </p>
            </div>

            {/* Course Metadata Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-10">
              <Card className="border-2 border-theme-primary">
                <CardContent className="p-5 text-center">
                  <Award className="w-8 h-8 text-theme-primary mx-auto mb-2" />
                  <div className="text-3xl font-black text-theme-primary">3</div>
                  <p className="text-sm font-bold text-[var(--foreground)]">Credit Hours</p>
                  <p className="text-xs text-theme-muted">ACE Recommended</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-theme-accent">
                <CardContent className="p-5 text-center">
                  <Clock className="w-8 h-8 text-theme-accent mx-auto mb-2" />
                  <div className="text-3xl font-black text-theme-accent">45</div>
                  <p className="text-sm font-bold text-[var(--foreground)]">Learning Hours</p>
                  <p className="text-xs text-theme-muted">Contact + Independent Study</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-theme-secondary">
                <CardContent className="p-5 text-center">
                  <BookOpen className="w-8 h-8 text-theme-secondary mx-auto mb-2" />
                  <div className="text-3xl font-black text-theme-secondary">30</div>
                  <p className="text-sm font-bold text-[var(--foreground)]">Modules</p>
                  <p className="text-xs text-theme-muted">6 Thematic Units</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-theme-primary">
                <CardContent className="p-5 text-center">
                  <Target className="w-8 h-8 text-theme-primary mx-auto mb-2" />
                  <div className="text-3xl font-black text-theme-primary">70%</div>
                  <p className="text-sm font-bold text-[var(--foreground)]">Pass Threshold</p>
                  <p className="text-xs text-theme-muted">For Credit Recommendation</p>
                </CardContent>
              </Card>
            </div>

            {/* Course Description */}
            <Card className="border-4 border-theme-primary mb-8">
              <CardContent className="p-10">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-8 h-8 text-theme-primary" />
                  <h3 className="text-2xl font-black text-theme-primary">Course Description</h3>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-[var(--foreground)] leading-relaxed mb-4">
                    A comprehensive examination of renewable energy technologies, grid integration strategies, and the socioeconomic forces driving the global energy transition. Students analyze photovoltaic and concentrated solar systems, onshore and offshore wind engineering, hydropower modernization, geothermal resource development, and advanced energy storage architectures.
                  </p>
                  <p className="text-[var(--foreground)] leading-relaxed mb-4">
                    The course emphasizes quantitative analysis of system performance metrics including levelized cost of energy (LCOE), capacity factors, and grid reliability contributions. Students evaluate policy frameworks such as renewable portfolio standards, carbon pricing mechanisms, and federal tax incentives that shape deployment trajectories.
                  </p>
                  <p className="text-[var(--foreground)] leading-relaxed">
                    Through applied projects, learners design renewable energy systems for real-world scenarios, conduct resource assessments, and model grid integration challenges at high penetration levels. The course integrates environmental justice perspectives, examining equitable access to clean energy and community ownership models.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Learning Outcomes */}
            <Card className="border-4 border-theme-accent mb-8">
              <CardContent className="p-10">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-8 h-8 text-theme-accent" />
                  <h3 className="text-2xl font-black text-theme-accent">Program Learning Outcomes</h3>
                </div>
                <p className="text-sm text-theme-muted mb-6 italic">
                  Upon successful completion of this course, students will be able to:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Analyze the physics, engineering principles, and performance characteristics of solar, wind, hydro, geothermal, and storage technologies',
                    'Evaluate the economic viability of renewable energy projects using LCOE, net present value, and internal rate of return methodologies',
                    'Apply quantitative methods to conduct site-specific renewable energy resource assessments',
                    'Synthesize grid integration challenges and solutions for high-penetration renewable energy scenarios',
                    'Assess the environmental, social, and equity dimensions of energy transition policies',
                    'Design a renewable energy system proposal incorporating technical, economic, and regulatory constraints',
                    'Critically evaluate emerging technologies and their potential to disrupt current energy paradigms',
                    'Communicate technical findings through professional reports and data-driven presentations'
                  ].map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[color-mix(in_srgb,var(--accent)_8%,var(--background))]">
                      <div className="w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-[var(--foreground)] leading-relaxed">{outcome}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Structure & Assessment */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-8 h-8 text-theme-secondary" />
                    <h3 className="text-xl font-black text-theme-secondary">Course Structure</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { unit: 'Unit 1', title: 'Solar Energy Systems', weeks: 'Weeks 1-3' },
                      { unit: 'Unit 2', title: 'Wind Energy Engineering', weeks: 'Weeks 4-6' },
                      { unit: 'Unit 3', title: 'Hydropower & Geothermal', weeks: 'Weeks 7-9' },
                      { unit: 'Unit 4', title: 'Energy Storage & Grid Integration', weeks: 'Weeks 10-11' },
                      { unit: 'Unit 5', title: 'Policy, Markets & Energy Justice', weeks: 'Weeks 12-13' },
                      { unit: 'Unit 6', title: 'Capstone & Comprehensive Assessment', weeks: 'Weeks 14-15' }
                    ].map((unit, idx) => (
                      <div key={idx} className="flex items-center gap-3 py-2 border-b border-[var(--border)]/30 last:border-0">
                        <div className="w-8 h-8 rounded-full bg-[var(--secondary)] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm text-[var(--foreground)]">{unit.title}</p>
                          <p className="text-xs text-theme-muted">{unit.weeks}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-8 h-8 text-theme-primary" />
                    <h3 className="text-xl font-black text-theme-primary">Assessment & Grading</h3>
                  </div>
                  <div className="space-y-4 mb-6">
                    {[
                      { component: 'Module Assessments (10 per module)', weight: '25%' },
                      { component: 'Reflection & Scenario Exercises', weight: '10%' },
                      { component: 'Applied Mini-Projects', weight: '10%' },
                      { component: 'Comprehensive Final Exam (Proctored)', weight: '25%' },
                      { component: 'Capstone Project', weight: '30%' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-[var(--border)]/30 last:border-0">
                        <p className="text-sm text-[var(--foreground)]">{item.component}</p>
                        <span className="text-sm font-black text-theme-primary">{item.weight}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] p-4 rounded-lg">
                    <p className="text-xs font-bold text-theme-primary mb-2">Grading Scale</p>
                    <div className="grid grid-cols-5 gap-2 text-center text-xs">
                      <div><span className="font-black">A</span><br/><span className="text-theme-muted">90-100%</span></div>
                      <div><span className="font-black">B</span><br/><span className="text-theme-muted">80-89%</span></div>
                      <div><span className="font-black">C</span><br/><span className="text-theme-muted">70-79%</span></div>
                      <div><span className="font-black">D</span><br/><span className="text-theme-muted">60-69%</span></div>
                      <div><span className="font-black">F</span><br/><span className="text-theme-muted">&lt;60%</span></div>
                    </div>
                    <p className="text-[10px] text-theme-muted mt-2 italic">Minimum C (70%) required for ACE credit recommendation</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Capstone Project & Institutional Partner */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <h3 className="text-xl font-black text-theme-accent mb-4">Capstone Project</h3>
                  <p className="font-bold text-lg text-[var(--foreground)] mb-3">Community Renewable Energy Transition Plan</p>
                  <p className="text-sm text-theme-muted mb-4">
                    Develop a comprehensive renewable energy transition plan for a real or simulated community integrating resource assessment, technology selection, system sizing, economic analysis, and equity considerations.
                  </p>
                  <p className="text-xs font-bold text-theme-accent mb-2">Deliverables:</p>
                  <ul className="space-y-1">
                    {[
                      'Executive summary for municipal decision-makers',
                      'Technical resource assessment with site analysis',
                      'System design with equipment specifications',
                      'Financial pro forma (LCOE, NPV, IRR)',
                      'Grid integration and storage plan',
                      'Environmental and social impact assessment',
                      'Professional presentation with data visualizations'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[var(--foreground)]">
                        <CheckCircle className="w-3 h-3 text-theme-accent mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_5%,var(--background))] to-[var(--background)]">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-theme-secondary" />
                    <h3 className="text-xl font-black text-theme-secondary">Accreditation & Partnership</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-[var(--background)] border-2 border-theme-secondary">
                      <p className="text-sm font-black text-[var(--foreground)] mb-1">Institutional Partner</p>
                      <p className="text-sm text-theme-muted">Golisano Institute for Sustainability</p>
                      <p className="text-sm text-theme-muted">Rochester Institute of Technology</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[var(--background)] border-2 border-theme-primary">
                      <p className="text-sm font-black text-[var(--foreground)] mb-1">Credit Recommendation</p>
                      <p className="text-sm text-theme-muted">ACE (American Council on Education)</p>
                      <p className="text-xs text-theme-muted mt-1">3 semester hours, upper-division baccalaureate</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[var(--background)] border-2 border-theme-accent">
                      <p className="text-sm font-black text-[var(--foreground)] mb-1">Quality Assurance</p>
                      <ul className="text-xs text-theme-muted space-y-1 mt-1">
                        <li>• Identity-verified proctored assessments</li>
                        <li>• SME-reviewed content and rubrics</li>
                        <li>• Regular substantive interaction (RSI)</li>
                        <li>• Bloom&apos;s taxonomy-aligned outcomes</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Citation
              statistic="Accreditation framework and standards"
              sources={[
                {
                  title: "ACE Credit Recommendation Service",
                  author: "American Council on Education",
                  organization: "ACE",
                  year: 2024,
                  url: "https://www.acenet.edu/Programs-Services/Pages/Credit-Transcripts/Credit-Recommendation.aspx"
                },
                {
                  title: "Golisano Institute for Sustainability",
                  author: "Rochester Institute of Technology",
                  organization: "RIT",
                  year: 2024,
                  url: "https://www.rit.edu/sustainabilityinstitute/"
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Solar Energy */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Sun className="w-16 h-16 text-theme-primary" />
              <h2 className="text-5xl font-black text-[var(--foreground)]">SOLAR ENERGY</h2>
            </div>

            <div className="space-y-8">
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-10">
                  <h3 className="text-3xl font-black text-theme-primary mb-6">The Solar Revolution</h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">
                      Solar photovoltaic (PV) technology has experienced unprecedented growth, becoming the <span className="font-bold text-theme-primary">fastest-growing renewable energy source globally</span>. In 2023, solar PV added <span className="font-black text-2xl text-theme-primary">444 GW</span> of new capacity worldwide, representing a 76% increase from 2022.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 my-8">
                      <div className="bg-[var(--background)] p-6 rounded-xl border-2 border-theme-primary">
                        <h4 className="text-xl font-black text-theme-primary mb-4">Cost Reduction</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                            <span className="text-[var(--foreground)]"><span className="font-black">89% cost decline</span> since 2010</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                            <span className="text-[var(--foreground)]">Now <span className="font-black">cheapest source</span> of electricity in most regions</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                            <span className="text-[var(--foreground)]">Residential solar payback: <span className="font-black">6-8 years</span> average</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-[var(--background)] p-6 rounded-xl border-2 border-theme-accent">
                        <h4 className="text-xl font-black text-theme-accent mb-4">Efficiency Gains</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-theme-accent mt-1 flex-shrink-0" />
                            <span className="text-[var(--foreground)]">Commercial panels: <span className="font-black">22-24% efficiency</span></span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-theme-accent mt-1 flex-shrink-0" />
                            <span className="text-[var(--foreground)]">Perovskite cells: <span className="font-black">26.1% lab efficiency</span></span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-theme-accent mt-1 flex-shrink-0" />
                            <span className="text-[var(--foreground)]">Bifacial panels: <span className="font-black">+10-30% output</span></span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">
                      The International Energy Agency projects that solar PV will become the world's largest source of electricity by <span className="font-black text-theme-primary">2035</span>, surpassing coal, natural gas, and all other sources. This transformation is driven by technological innovation, economies of scale, and supportive policy frameworks.
                    </p>
                  </div>

                  <Citation
                    statistic="Solar PV growth and cost reduction data"
                    sources={[
                      {
                        title: "Renewable Capacity Statistics 2024",
                        author: "International Renewable Energy Agency",
                        organization: "IRENA",
                        year: 2024,
                        url: "https://www.irena.org/Publications/2024/Mar/Renewable-Capacity-Statistics-2024"
                      },
                      {
                        title: "Solar PV Global Supply Chain Report",
                        author: "International Energy Agency",
                        organization: "IEA",
                        year: 2024,
                        url: "https://www.iea.org/reports/solar-pv-global-supply-chains"
                      },
                      {
                        title: "Solar Market Insight Report 2024",
                        author: "Wood Mackenzie & SEIA",
                        organization: "Solar Energy Industries Association",
                        year: 2024,
                        url: "https://www.seia.org/solar-market-insight-report"
                      },
                      {
                        title: "Best Research-Cell Efficiency Chart",
                        author: "National Renewable Energy Laboratory",
                        organization: "NREL",
                        year: 2024,
                        url: "https://www.nrel.gov/pv/cell-efficiency.html"
                      }
                    ]}
                  />
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-10">
                  <h3 className="text-3xl font-black text-theme-secondary mb-6">Solar Technologies Overview</h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-2xl font-black text-theme-primary mb-4">Photovoltaic (PV) Systems</h4>
                      <ul className="space-y-4">
                        <li>
                          <p className="font-bold text-lg text-[var(--foreground)] mb-2">Monocrystalline Silicon</p>
                          <p className="text-theme-muted">Highest efficiency (20-24%), best for limited space, premium cost</p>
                        </li>
                        <li>
                          <p className="font-bold text-lg text-[var(--foreground)] mb-2">Polycrystalline Silicon</p>
                          <p className="text-theme-muted">Good efficiency (15-20%), lower cost, widely available</p>
                        </li>
                        <li>
                          <p className="font-bold text-lg text-[var(--foreground)] mb-2">Thin-Film (CIGS, CdTe)</p>
                          <p className="text-theme-muted">Flexible, lightweight, performs well in low light</p>
                        </li>
                        <li>
                          <p className="font-bold text-lg text-[var(--foreground)] mb-2">Perovskite (Emerging)</p>
                          <p className="text-theme-muted">Revolutionary efficiency potential, lower manufacturing cost</p>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-2xl font-black text-theme-accent mb-4">Concentrated Solar Power (CSP)</h4>
                      <ul className="space-y-4">
                        <li>
                          <p className="font-bold text-lg text-[var(--foreground)] mb-2">Parabolic Trough</p>
                          <p className="text-theme-muted">Most mature CSP technology, thermal energy storage capable</p>
                        </li>
                        <li>
                          <p className="font-bold text-lg text-[var(--foreground)] mb-2">Solar Tower</p>
                          <p className="text-theme-muted">Higher temperatures, better efficiency, molten salt storage</p>
                        </li>
                        <li>
                          <p className="font-bold text-lg text-[var(--foreground)] mb-2">Linear Fresnel</p>
                          <p className="text-theme-muted">Lower cost, simpler design, good for industrial heat</p>
                        </li>
                        <li>
                          <p className="font-bold text-lg text-[var(--foreground)] mb-2">Dish Stirling</p>
                          <p className="text-theme-muted">Highest solar-to-electric efficiency (up to 31.25%)</p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Citation
                    statistic="Solar technology types and efficiency"
                    sources={[
                      {
                        title: "Technology Roadmap: Solar Photovoltaic Energy",
                        author: "International Energy Agency",
                        organization: "IEA",
                        year: 2024,
                        url: "https://www.iea.org/reports/technology-roadmap-solar-photovoltaic-energy"
                      },
                      {
                        title: "Concentrating Solar Power Best Practices Study",
                        author: "National Renewable Energy Laboratory",
                        organization: "NREL",
                        year: 2024,
                        url: "https://www.nrel.gov/csp/"
                      },
                      {
                        title: "Photovoltaics Report",
                        author: "Fraunhofer Institute for Solar Energy Systems",
                        organization: "Fraunhofer ISE",
                        year: 2024,
                        url: "https://www.ise.fraunhofer.de/en/publications/studies/photovoltaics-report.html"
                      }
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Wind Energy */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Wind className="w-16 h-16 text-theme-accent" />
              <h2 className="text-5xl font-black text-[var(--foreground)]">WIND ENERGY</h2>
            </div>

            <Card className="border-4 border-theme-accent">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black text-theme-accent mb-6">Wind Power: Clean Energy at Scale</h3>

                <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">
                  Wind energy has emerged as a cornerstone of the global energy transition. In 2023, global wind capacity reached <span className="font-black text-2xl text-theme-accent">1,021 GW</span>, with <span className="font-bold text-theme-accent">117 GW</span> of new installations added during the year. Wind now provides approximately <span className="font-black">7.6% of global electricity</span>.
                </p>

                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-accent">
                    <h4 className="text-xl font-black text-theme-accent mb-3">Onshore Wind</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]"><span className="font-bold">969 GW</span> installed globally</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">LCOE: <span className="font-bold">$24-75/MWh</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Capacity factor: <span className="font-bold">35-45%</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Modern turbines: <span className="font-bold">5-7 MW</span></span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-primary">
                    <h4 className="text-xl font-black text-theme-primary mb-3">Offshore Wind</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]"><span className="font-bold">75 GW</span> installed globally</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Higher wind speeds: <span className="font-bold">+40% output</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Capacity factor: <span className="font-bold">45-55%</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Latest turbines: <span className="font-bold">15-18 MW</span></span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[var(--muted)] p-6 rounded-xl border-2 border-theme-secondary">
                    <h4 className="text-xl font-black text-theme-secondary mb-3">Floating Offshore</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]"><span className="font-bold">236 MW</span> operational</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Access to <span className="font-bold">80% ocean wind</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Depths: <span className="font-bold">&gt;60 meters</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-theme-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--foreground)]">Market potential: <span className="font-bold">$1+ trillion</span></span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[color-mix(in_srgb,var(--accent)_10%,var(--background))] p-8 rounded-xl border-2 border-theme-accent my-8">
                  <h4 className="text-2xl font-black text-theme-accent mb-4">Innovation Spotlight: Next-Generation Turbines</h4>
                  <p className="text-[var(--foreground)] leading-relaxed mb-4">
                    The latest generation of offshore wind turbines represents a quantum leap in renewable energy technology. The <span className="font-bold">Vestas V236-15.0 MW</span> and <span className="font-bold">GE Haliade-X 14 MW</span> turbines feature rotor diameters exceeding 220 meters—larger than two football fields. A single rotation of these massive blades can power an average home for two days.
                  </p>
                  <p className="text-[var(--foreground)] leading-relaxed">
                    Siemens Gamesa's 18 MW turbine, announced in 2024, pushes boundaries even further with a <span className="font-black">280-meter rotor diameter</span>. These innovations enable offshore wind farms to generate clean electricity at costs competitive with fossil fuels, with some projects achieving <span className="font-bold">levelized costs below $40/MWh</span>.
                  </p>
                </div>

                <Citation
                  statistic="Wind energy capacity and technology specifications"
                  sources={[
                    {
                      title: "Global Wind Report 2024",
                      author: "Global Wind Energy Council",
                      organization: "GWEC",
                      year: 2024,
                      url: "https://gwec.net/global-wind-report-2024/"
                    },
                    {
                      title: "Offshore Wind Outlook 2024",
                      author: "International Energy Agency",
                      organization: "IEA",
                      year: 2024,
                      url: "https://www.iea.org/reports/offshore-wind-outlook-2024"
                    },
                    {
                      title: "Renewable Power Generation Costs in 2023",
                      author: "International Renewable Energy Agency",
                      organization: "IRENA",
                      year: 2024,
                      url: "https://www.irena.org/publications/2024/Aug/Renewable-Power-Generation-Costs-in-2023"
                    },
                    {
                      title: "Floating Offshore Wind Vision",
                      author: "National Renewable Energy Laboratory",
                      organization: "NREL",
                      year: 2024,
                      url: "https://www.nrel.gov/wind/floating-offshore-wind.html"
                    }
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Energy Storage */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Battery className="w-16 h-16 text-theme-secondary" />
              <h2 className="text-5xl font-black text-[var(--foreground)]">ENERGY STORAGE</h2>
            </div>

            <Card className="border-4 border-theme-secondary">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black text-theme-secondary mb-6">The Key to 24/7 Clean Energy</h3>

                <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">
                  Energy storage is the linchpin of the renewable energy transition. As solar and wind are intermittent sources, advanced storage technologies enable grid stability and 24/7 clean power. The global energy storage market exploded to <span className="font-black text-2xl text-theme-secondary">90 GW / 196 GWh</span> in 2023, with installations growing <span className="font-bold text-theme-secondary">112% year-over-year</span>.
                </p>

                <div className="grid md:grid-cols-2 gap-8 my-8">
                  <div>
                    <h4 className="text-2xl font-black text-theme-primary mb-4">Battery Technologies</h4>
                    <div className="space-y-4">
                      <div className="bg-[var(--background)] p-5 rounded-lg border-2 border-theme-primary">
                        <h5 className="font-black text-lg text-theme-primary mb-2">Lithium-Ion Batteries</h5>
                        <ul className="space-y-2 text-sm text-theme-muted">
                          <li>• <span className="font-bold">85% market share</span> in grid storage</li>
                          <li>• Cost declined <span className="font-bold">90% since 2010</span></li>
                          <li>• Now <span className="font-bold">$139/kWh</span> average (2024)</li>
                          <li>• Round-trip efficiency: <span className="font-bold">85-95%</span></li>
                        </ul>
                      </div>

                      <div className="bg-[var(--background)] p-5 rounded-lg border-2 border-theme-accent">
                        <h5 className="font-black text-lg text-theme-accent mb-2">Sodium-Ion Batteries (Emerging)</h5>
                        <ul className="space-y-2 text-sm text-theme-muted">
                          <li>• <span className="font-bold">40% lower material costs</span></li>
                          <li>• No cobalt or lithium required</li>
                          <li>• Better safety characteristics</li>
                          <li>• Commercial production began 2023</li>
                        </ul>
                      </div>

                      <div className="bg-[var(--background)] p-5 rounded-lg border-2 border-theme-secondary">
                        <h5 className="font-black text-lg text-theme-secondary mb-2">Flow Batteries</h5>
                        <ul className="space-y-2 text-sm text-theme-muted">
                          <li>• <span className="font-bold">10-20 hour</span> duration capability</li>
                          <li>• <span className="font-bold">25+ year lifespan</span></li>
                          <li>• Unlimited charge cycles</li>
                          <li>• Ideal for grid-scale storage</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-2xl font-black text-theme-accent mb-4">Alternative Storage Methods</h4>
                    <div className="space-y-4">
                      <div className="bg-[var(--background)] p-5 rounded-lg border-2 border-theme-primary">
                        <h5 className="font-black text-lg text-theme-primary mb-2">Pumped Hydro Storage</h5>
                        <ul className="space-y-2 text-sm text-theme-muted">
                          <li>• <span className="font-bold">94% of global storage</span> capacity</li>
                          <li>• <span className="font-bold">181 GW</span> installed worldwide</li>
                          <li>• 70-85% round-trip efficiency</li>
                          <li>• 50-100 year operational life</li>
                        </ul>
                      </div>

                      <div className="bg-[var(--background)] p-5 rounded-lg border-2 border-theme-accent">
                        <h5 className="font-black text-lg text-theme-accent mb-2">Compressed Air Energy Storage</h5>
                        <ul className="space-y-2 text-sm text-theme-muted">
                          <li>• Long duration: <span className="font-bold">8-24 hours</span></li>
                          <li>• <span className="font-bold">42-54% efficiency</span> (improving)</li>
                          <li>• Lower environmental impact</li>
                          <li>• Scalable to GW-scale</li>
                        </ul>
                      </div>

                      <div className="bg-[var(--background)] p-5 rounded-lg border-2 border-theme-secondary">
                        <h5 className="font-black text-lg text-theme-secondary mb-2">Thermal Energy Storage</h5>
                        <ul className="space-y-2 text-sm text-theme-muted">
                          <li>• Molten salt systems: <span className="font-bold">98% efficiency</span></li>
                          <li>• Storage duration: <span className="font-bold">6-15 hours</span></li>
                          <li>• Cost: <span className="font-bold">$15-30/kWh</span></li>
                          <li>• Perfect for CSP integration</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[color-mix(in_srgb,var(--secondary)_10%,var(--background))] p-8 rounded-xl border-2 border-theme-secondary my-8">
                  <h4 className="text-2xl font-black text-theme-secondary mb-4">Future of Storage: Solid-State & Beyond</h4>
                  <p className="text-[var(--foreground)] leading-relaxed mb-4">
                    Solid-state batteries represent the next frontier in energy storage. With <span className="font-bold">energy densities 2-3x higher</span> than current lithium-ion batteries, charging times <span className="font-bold">reduced to 10-15 minutes</span>, and enhanced safety through elimination of flammable liquid electrolytes, solid-state technology could revolutionize both EVs and grid storage.
                  </p>
                  <p className="text-[var(--foreground)] leading-relaxed">
                    Companies like QuantumScape, Solid Power, and Toyota are racing to commercialize solid-state batteries by 2025-2027. Meanwhile, iron-air batteries from Form Energy promise <span className="font-bold">100-hour duration storage at $20/kWh</span>—a game-changer for seasonal energy storage and grid resilience.
                  </p>
                </div>

                <Citation
                  statistic="Energy storage capacity, costs, and technology data"
                  sources={[
                    {
                      title: "Energy Storage Market Report 2024",
                      author: "BloombergNEF",
                      organization: "Bloomberg New Energy Finance",
                      year: 2024,
                      url: "https://about.bnef.com/blog/global-energy-storage-market-set-to-hit-one-terawatt-hour-by-2030/"
                    },
                    {
                      title: "Battery Pack Prices Fall to Record Low",
                      author: "BloombergNEF",
                      organization: "Bloomberg New Energy Finance",
                      year: 2024,
                      url: "https://about.bnef.com/blog/battery-pack-prices-fall-to-139-kwh-record-low/"
                    },
                    {
                      title: "Electricity Storage and Renewables: Costs and Markets to 2030",
                      author: "International Renewable Energy Agency",
                      organization: "IRENA",
                      year: 2024,
                      url: "https://www.irena.org/publications/2024/electricity-storage-and-renewables-costs-and-markets"
                    },
                    {
                      title: "Grid-Scale Battery Storage Technical Report",
                      author: "National Renewable Energy Laboratory",
                      organization: "NREL",
                      year: 2024,
                      url: "https://www.nrel.gov/docs/fy24osti/grid-battery-storage.pdf"
                    }
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-[var(--foreground)] mb-12 text-center">IMPLEMENTATION ROADMAP</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-4 border-theme-primary">
                <CardContent className="p-8">
                  <Home className="w-12 h-12 text-theme-primary mb-4" />
                  <h3 className="text-2xl font-black text-theme-primary mb-4">RESIDENTIAL</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Rooftop Solar + Battery</p>
                        <p className="text-sm text-theme-muted">5-10 kW solar, 10-15 kWh storage</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Average Cost</p>
                        <p className="text-sm text-theme-muted">$15,000-$30,000 after incentives</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Payback Period</p>
                        <p className="text-sm text-theme-muted">6-10 years, 25-30% ROI</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Energy Independence</p>
                        <p className="text-sm text-theme-muted">70-100% self-sufficiency</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <Factory className="w-12 h-12 text-theme-accent mb-4" />
                  <h3 className="text-2xl font-black text-theme-accent mb-4">COMMERCIAL</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Large-Scale Solar</p>
                        <p className="text-sm text-theme-muted">100 kW - 5 MW systems</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Cost per Watt</p>
                        <p className="text-sm text-theme-muted">$1.50-$2.50/W installed</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Tax Benefits</p>
                        <p className="text-sm text-theme-muted">30% ITC + accelerated depreciation</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Payback Period</p>
                        <p className="text-sm text-theme-muted">4-7 years typical</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8">
                  <Zap className="w-12 h-12 text-theme-secondary mb-4" />
                  <h3 className="text-2xl font-black text-theme-secondary mb-4">UTILITY-SCALE</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Project Size</p>
                        <p className="text-sm text-theme-muted">10 MW - 2+ GW solar/wind farms</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">LCOE</p>
                        <p className="text-sm text-theme-muted">$24-$75/MWh (cheaper than coal)</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Grid Integration</p>
                        <p className="text-sm text-theme-muted">+ Storage for baseload capability</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">Development Time</p>
                        <p className="text-sm text-theme-muted">2-4 years planning to operation</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Citation
              statistic="Renewable energy implementation costs and ROI"
              sources={[
                {
                  title: "Solar Market Insight Report 2024",
                  author: "Wood Mackenzie & SEIA",
                  organization: "Solar Energy Industries Association",
                  year: 2024,
                  url: "https://www.seia.org/solar-market-insight-report"
                },
                {
                  title: "Levelized Cost of Energy Analysis",
                  author: "Lazard",
                  organization: "Lazard",
                  year: 2024,
                  url: "https://www.lazard.com/research-insights/levelized-cost-of-energyplus/"
                },
                {
                  title: "Renewable Energy Cost Analysis",
                  author: "International Renewable Energy Agency",
                  organization: "IRENA",
                  year: 2024,
                  url: "https://www.irena.org/costs"
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
            <h2 className="text-6xl font-black">POWER YOUR FUTURE WITH CLEAN ENERGY</h2>
            <p className="text-2xl font-semibold">
              The renewable revolution is here. Join the transition to sustainable power.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/products?category=renewable-energy">
                <Button size="lg" className="text-xl px-12 py-8 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-2xl">
                  EXPLORE SOLAR PRODUCTS
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
