import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  MessageCircle,
  Mail,
  BookOpen,
  HelpCircle,
  Package,
  Users,
  ShieldCheck,
  Leaf,
  ChevronDown,
  Search
} from 'lucide-react'
import Link from 'next/link'

export default function SupportPage() {
  const faqs = [
    {
      category: 'Getting Started',
      icon: Leaf,
      questions: [
        {
          q: 'What is Project Exodus?',
          a: 'Project Exodus is a sustainable living marketplace and community platform. We connect conscious consumers with eco-friendly products, educational resources, and like-minded changemakers building a better future.'
        },
        {
          q: 'How do I create an account?',
          a: 'Click the "Sign Up" button in the top right corner. You can create an account with your email or sign in with social providers. All accounts are free!'
        },
        {
          q: 'Is Project Exodus free to use?',
          a: 'Yes! Browsing products, reading articles, and joining the community is completely free. We only earn commission when you purchase products through our verified vendor partners.'
        }
      ]
    },
    {
      category: 'Shopping',
      icon: Package,
      questions: [
        {
          q: 'How do I purchase products?',
          a: 'Browse our curated product listings, click on items you\'re interested in, and you\'ll be directed to our verified vendor partners to complete your purchase securely.'
        },
        {
          q: 'Are all vendors verified?',
          a: 'Yes! We carefully vet every vendor for authentic sustainability practices, ethical manufacturing, and transparent business practices. Look for the "Verified" badge.'
        },
        {
          q: 'What if I have issues with my order?',
          a: 'Contact the vendor directly first, as they handle fulfillment. If you need additional support, reach out to us at support@projectexodus.com with your order details.'
        },
        {
          q: 'Do you offer refunds?',
          a: 'Refund policies vary by vendor. Check the individual vendor\'s return policy on their page or contact them directly for specific questions about returns and exchanges.'
        }
      ]
    },
    {
      category: 'Community',
      icon: Users,
      questions: [
        {
          q: 'How do I join the community?',
          a: 'Create a free account and visit the Community section to join forums, start discussions, contribute to projects, and connect with other sustainability enthusiasts.'
        },
        {
          q: 'Can I share my own sustainability projects?',
          a: 'Absolutely! Head to Community > Projects and click "Create Project" to share your initiatives. We love seeing community-led sustainability efforts!'
        },
        {
          q: 'How do I earn badges?',
          a: 'Badges are awarded for active community participation: posting helpful content, contributing to discussions, completing projects, and supporting other members.'
        }
      ]
    },
    {
      category: 'Account & Privacy',
      icon: ShieldCheck,
      questions: [
        {
          q: 'How is my data protected?',
          a: 'We use industry-standard encryption and security practices. Your personal information is never sold to third parties. Read our Privacy Policy for full details.'
        },
        {
          q: 'How do I update my profile?',
          a: 'Click on your profile icon in the top right, select "Profile Settings", and you can update your information, preferences, and notification settings.'
        },
        {
          q: 'Can I delete my account?',
          a: 'Yes, you can delete your account anytime from Profile Settings > Account > Delete Account. This action is permanent and cannot be undone.'
        }
      ]
    }
  ]

  const contactOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      availability: 'Mon-Fri, 9am-6pm EST',
      action: 'Start Chat',
      href: '#'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'We respond within 24 hours',
      availability: 'support@projectexodus.com',
      action: 'Send Email',
      href: 'mailto:support@projectexodus.com'
    },
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Browse our help articles',
      availability: '100+ articles',
      action: 'Browse Docs',
      href: '/learn'
    }
  ]

  const popularTopics = [
    { title: 'Account Setup', href: '#getting-started', icon: '🚀' },
    { title: 'Product Returns', href: '#shopping', icon: '📦' },
    { title: 'Vendor Verification', href: '#shopping', icon: '✓' },
    { title: 'Community Guidelines', href: '#community', icon: '👥' },
    { title: 'Privacy & Security', href: '#account-privacy', icon: '🔒' },
    { title: 'Sustainability Scoring', href: '#shopping', icon: '🌱' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[var(--muted)] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] mb-6 shadow-xl">
              <HelpCircle className="w-10 h-10 text-[var(--primary-foreground)]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[var(--foreground)]">
              HOW CAN WE HELP?
            </h1>
            <p className="text-xl font-semibold text-theme-muted max-w-2xl mx-auto">
              Search our knowledge base or browse popular topics below
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto pt-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-muted" />
                <input
                  type="text"
                  placeholder="Search for help articles, guides, FAQs..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors text-base font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-black mb-6 text-[var(--foreground)]">POPULAR TOPICS</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {popularTopics.map((topic, i) => (
                <a
                  key={i}
                  href={topic.href}
                  className="flex items-center gap-3 p-4 rounded-xl bg-[var(--card)] border-2 border-[var(--border)] hover:border-theme-primary transition-all transform hover:scale-105 group"
                >
                  <span className="text-2xl">{topic.icon}</span>
                  <span className="font-bold text-[var(--foreground)] group-hover:text-theme-primary transition-colors">
                    {topic.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">GET IN TOUCH</h2>
            <p className="text-lg font-semibold text-theme-muted">
              Choose your preferred way to reach us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {contactOptions.map((option, i) => (
              <Card key={i} className="border-4 border-theme-primary hover:border-theme-accent transition-all transform hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] flex items-center justify-center">
                    <option.icon className="w-8 h-8 text-theme-primary" />
                  </div>
                  <CardTitle className="text-2xl font-black text-[var(--foreground)]">
                    {option.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="font-semibold text-theme-muted">{option.description}</p>
                  <p className="text-sm font-bold text-theme-primary">{option.availability}</p>
                  <Link href={option.href}>
                    <Button className="w-full font-black">
                      {option.action} →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">
                FREQUENTLY ASKED QUESTIONS
              </h2>
              <p className="text-lg font-semibold text-theme-muted">
                Quick answers to common questions
              </p>
            </div>

            <div className="space-y-12">
              {faqs.map((section, i) => (
                <div key={i} id={section.category.toLowerCase().replace(/\s+/g, '-')}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-lg">
                      <section.icon className="w-6 h-6 text-[var(--primary-foreground)]" />
                    </div>
                    <h3 className="text-3xl font-black text-[var(--foreground)]">
                      {section.category.toUpperCase()}
                    </h3>
                  </div>

                  <div className="space-y-4 ml-15">
                    {section.questions.map((faq, j) => (
                      <Card key={j} className="border-2 border-[var(--border)] hover:border-theme-accent transition-all">
                        <CardContent className="p-6">
                          <details className="group">
                            <summary className="flex items-start justify-between cursor-pointer list-none">
                              <h4 className="font-black text-lg text-[var(--foreground)] pr-4">
                                {faq.q}
                              </h4>
                              <ChevronDown className="w-5 h-5 text-theme-primary mt-1 transition-transform group-open:rotate-180 flex-shrink-0" />
                            </summary>
                            <p className="mt-4 text-base font-medium text-theme-muted leading-relaxed">
                              {faq.a}
                            </p>
                          </details>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-black">STILL NEED HELP?</h2>
            <p className="text-xl font-semibold opacity-90">
              Our support team is here for you. We typically respond within a few hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="mailto:support@projectexodus.com">
                <Button size="lg" className="text-lg px-10 py-6 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-xl">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Support
                </Button>
              </Link>
              <Link href="/community">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black">
                  <Users className="w-5 h-5 mr-2" />
                  Ask Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
