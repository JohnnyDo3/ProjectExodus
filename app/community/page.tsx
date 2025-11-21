import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MessageSquare, Users, Award, Rocket, Sparkles, Heart } from 'lucide-react'
import Link from 'next/link'

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-32 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--primary)_15%,var(--background))] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <h1 className="text-[var(--foreground)]" style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 900,
              lineHeight: 1
            }}>
              JOIN THE COMMUNITY
            </h1>
            <p className="text-2xl font-bold text-theme-muted">
              Connect with <span style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>thousands</span> of changemakers building a sustainable future
            </p>
            <Link href="/profile/edit">
              <Button size="lg" className="text-xl px-12 py-8 rounded-2xl shadow-2xl font-black">
                CREATE YOUR PROFILE →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-[var(--foreground)]">WHAT'S INSIDE</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {[
              { icon: MessageSquare, title: 'DISCUSSION FORUMS', desc: 'Deep conversations on sustainability topics', link: '/community/forum' },
              { icon: Heart, title: 'SOCIAL FEED', desc: 'Share your journey and connect with others', link: '/community/feed' },
              { icon: Rocket, title: 'PROJECTS', desc: 'Collaborate on local initiatives', link: '/community/projects' },
              { icon: Sparkles, title: 'KNOWLEDGE BASE', desc: 'Learn from experts and peers', link: '/learn' },
              { icon: Users, title: 'MEMBER DIRECTORY', desc: 'Connect with the community', link: '/community/users' },
              { icon: Award, title: 'LEADERBOARD', desc: 'See top contributors and achievements', link: '/community/leaderboard' }
            ].map((feature, i) => (
              <Link key={i} href={feature.link}>
                <Card className="hover-lift border-4 border-theme-accent transform hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                  <CardContent className="p-10 text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] flex items-center justify-center">
                      <feature.icon className="w-12 h-12 text-theme-accent" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 text-[var(--foreground)]">
                      {feature.title}
                    </h3>
                    <p className="text-lg font-medium text-theme-muted">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4">GROWING TOGETHER</h2>
              <p className="text-xl font-semibold opacity-90">
                Our community is just getting started
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {[
                { value: '1K+', label: 'MEMBERS' },
                { value: '500+', label: 'DISCUSSIONS' },
                { value: '50+', label: 'PROJECTS' },
                { value: '∞', label: 'IMPACT' }
              ].map((stat, i) => (
                <div key={i} className="text-center transform hover:scale-110 transition-transform">
                  <div className="text-6xl font-black mb-2">{stat.value}</div>
                  <div className="text-lg font-bold tracking-wider opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Explore Features */}
      <section className="py-32 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4 text-[var(--foreground)]">
                EXPLORE THE COMMUNITY
              </h2>
              <p className="text-xl font-semibold text-theme-muted">
                Jump into conversations, join projects, and connect with fellow changemakers
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Forum Card */}
              <Card className="border-4 border-theme-primary hover-lift hover:border-theme-accent transition-all">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] flex items-center justify-center">
                      <MessageSquare className="w-8 h-8 text-theme-primary" />
                    </div>
                    <h3 className="text-3xl font-black text-[var(--foreground)]">
                      DISCUSSION FORUM
                    </h3>
                  </div>
                  <p className="text-lg font-semibold mb-8 text-theme-muted">
                    Join conversations about sustainability tips, product discussions, and community projects.
                    Share your knowledge and learn from others.
                  </p>
                  <Link href="/community/forum">
                    <Button size="lg" className="text-lg px-8 py-6 font-black w-full">
                      VISIT FORUM →
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Projects Card */}
              <Card className="border-4 border-theme-accent hover-lift hover:border-theme-secondary transition-all">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] flex items-center justify-center">
                      <Rocket className="w-8 h-8 text-theme-accent" />
                    </div>
                    <h3 className="text-3xl font-black text-[var(--foreground)]">
                      COMMUNITY PROJECTS
                    </h3>
                  </div>
                  <p className="text-lg font-semibold mb-8 text-theme-muted">
                    Collaborate on local sustainability initiatives. From community solar to zero-waste restaurants,
                    make real impact together.
                  </p>
                  <Link href="/community/projects">
                    <Button size="lg" className="text-lg px-8 py-6 font-black w-full">
                      VIEW PROJECTS →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-6xl font-black" style={{
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              READY TO CONNECT?
            </h2>
            <p className="text-2xl font-semibold text-theme-muted">
              Start your sustainability journey with like-minded people today
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/community/feed">
                <Button size="lg" className="text-xl px-12 py-8 rounded-2xl font-black shadow-2xl">
                  JOIN THE FEED →
                </Button>
              </Link>
              <Link href="/community/forum">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 rounded-2xl font-black border-4">
                  BROWSE FORUMS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
