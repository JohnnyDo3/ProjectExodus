import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Newspaper, Download, Mail, Image, FileText, Video } from 'lucide-react'
import Link from 'next/link'

export default function PressPage() {
  const pressReleases = [
    {
      date: 'November 2025',
      title: 'Project Exodus Launches Sustainable Living Marketplace',
      excerpt: 'New platform connects conscious consumers with eco-friendly products and community resources.',
    },
    {
      date: 'October 2025',
      title: 'Partnership Announced with Leading Sustainable Vendors',
      excerpt: 'Project Exodus partners with Goal Zero, Berkey, and other sustainability leaders.',
    },
  ]

  const mediaKit = [
    {
      icon: Image,
      title: 'Brand Assets',
      description: 'Logos, color palette, and brand guidelines',
      size: '2.4 MB',
    },
    {
      icon: FileText,
      title: 'Company Fact Sheet',
      description: 'Key information about Project Exodus',
      size: '156 KB',
    },
    {
      icon: Video,
      title: 'Product Screenshots',
      description: 'High-resolution platform screenshots',
      size: '8.2 MB',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] mb-6 shadow-xl">
              <Newspaper className="w-10 h-10 text-[var(--primary-foreground)]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[var(--foreground)]">
              PRESS & MEDIA
            </h1>
            <p className="text-xl font-semibold text-theme-muted max-w-2xl mx-auto">
              News, resources, and media assets for journalists and content creators
            </p>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black mb-12 text-center text-[var(--foreground)]">
              LATEST NEWS
            </h2>
            <div className="space-y-6">
              {pressReleases.map((release, i) => (
                <Card key={i} className="border-2 border-[var(--border)] hover:border-theme-primary transition-colors">
                  <CardContent className="p-8">
                    <p className="text-sm font-bold text-theme-primary mb-2">
                      {release.date}
                    </p>
                    <h3 className="text-2xl font-black mb-3 text-[var(--foreground)]">
                      {release.title}
                    </h3>
                    <p className="text-base font-medium text-theme-muted mb-4">
                      {release.excerpt}
                    </p>
                    <Button variant="outline" className="font-bold">
                      READ MORE →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-black mb-4 text-center text-[var(--foreground)]">
              MEDIA KIT
            </h2>
            <p className="text-lg font-semibold text-theme-muted text-center mb-12">
              Download our press assets and brand resources
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {mediaKit.map((item, i) => (
                <Card key={i} className="border-4 border-theme-accent hover:border-theme-primary transition-all">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-theme-accent" />
                    </div>
                    <h3 className="text-lg font-black mb-2 text-[var(--foreground)]">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-theme-muted mb-3">
                      {item.description}
                    </p>
                    <p className="text-xs font-bold text-theme-muted mb-4">
                      {item.size}
                    </p>
                    <Button size="sm" variant="outline" className="w-full font-bold">
                      <Download className="w-4 h-4 mr-2" />
                      DOWNLOAD
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" className="text-lg px-10 py-6 font-black shadow-lg">
                <Download className="w-5 h-5 mr-2" />
                DOWNLOAD COMPLETE MEDIA KIT
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-primary shadow-xl">
              <CardContent className="p-10">
                <h2 className="text-3xl font-black mb-6 text-[var(--foreground)]">
                  ABOUT PROJECT EXODUS
                </h2>
                <div className="space-y-4 text-base font-medium text-theme-muted leading-relaxed">
                  <p>
                    Project Exodus is a sustainable living marketplace and community platform that connects
                    conscious consumers with eco-friendly products, educational resources, and like-minded
                    changemakers.
                  </p>
                  <p>
                    Our mission is to make sustainable living accessible, practical, and impactful by providing
                    a curated marketplace of verified sustainable vendors, comprehensive educational content,
                    and a vibrant community of sustainability advocates.
                  </p>
                  <p>
                    Founded in 2025, Project Exodus serves thousands of users worldwide committed to reducing
                    their environmental impact and building a more sustainable future.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Mail className="w-16 h-16 mx-auto" />
            <h2 className="text-4xl font-black">MEDIA INQUIRIES</h2>
            <p className="text-xl font-semibold opacity-90">
              For press inquiries, interviews, or media requests
            </p>
            <div className="space-y-2">
              <p className="font-bold text-lg">
                Email: <a href="mailto:press@projectexodus.com" className="hover:opacity-80">press@projectexodus.com</a>
              </p>
              <p className="font-bold text-lg">
                Phone: <a href="tel:1-800-326-5433" className="hover:opacity-80">1-800-ECO-LIFE</a>
              </p>
            </div>
            <div className="pt-4">
              <Link href="/contact">
                <Button size="lg" className="text-lg px-10 py-6 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-xl">
                  CONTACT US
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
