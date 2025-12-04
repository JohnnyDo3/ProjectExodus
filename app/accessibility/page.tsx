import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Accessibility,
  Eye,
  Ear,
  Mouse,
  Keyboard,
  Monitor,
  CheckCircle2,
  AlertCircle,
  Mail,
  Smartphone,
  Globe
} from 'lucide-react'
import Link from 'next/link'

export default function AccessibilityPage() {
  const lastUpdated = 'November 20, 2025'

  const features = [
    {
      icon: Keyboard,
      title: 'Keyboard Navigation',
      description: 'Full keyboard navigation support for users who cannot use a mouse',
      items: [
        'All interactive elements are keyboard accessible',
        'Logical tab order throughout the site',
        'Visible focus indicators on all interactive elements',
        'Keyboard shortcuts for common actions',
        'Skip navigation links to bypass repetitive content'
      ]
    },
    {
      icon: Eye,
      title: 'Screen Reader Compatibility',
      description: 'Optimized for screen readers and assistive technologies',
      items: [
        'Semantic HTML structure for proper content hierarchy',
        'ARIA labels and descriptions where needed',
        'Alternative text for all meaningful images',
        'Form labels properly associated with inputs',
        'Dynamic content announcements'
      ]
    },
    {
      icon: Monitor,
      title: 'Visual Accessibility',
      description: 'Design choices that support users with visual impairments',
      items: [
        'WCAG AA compliant color contrast ratios',
        'Responsive text that scales up to 200% without loss of functionality',
        'No reliance on color alone to convey information',
        'Clear, readable typography with adequate spacing',
        'Support for dark mode and high contrast themes'
      ]
    },
    {
      icon: Mouse,
      title: 'Motor Accessibility',
      description: 'Features for users with motor impairments',
      items: [
        'Large, easy-to-click interactive elements',
        'Adequate spacing between clickable elements',
        'No time-sensitive interactions required',
        'Support for voice control and dictation',
        'Alternative input methods supported'
      ]
    },
    {
      icon: Ear,
      title: 'Audio/Visual Content',
      description: 'Accessible multimedia content',
      items: [
        'Captions for all video content',
        'Transcripts for audio content',
        'No auto-playing media',
        'Visual alternatives for audio cues',
        'Adjustable playback speed'
      ]
    },
    {
      icon: Smartphone,
      title: 'Mobile Accessibility',
      description: 'Full accessibility on mobile devices',
      items: [
        'Responsive design that works on all screen sizes',
        'Touch-friendly interactive elements',
        'Pinch-to-zoom support',
        'Screen reader compatibility on mobile',
        'Simplified navigation for smaller screens'
      ]
    }
  ]

  const standards = [
    {
      name: 'WCAG 2.1 Level AA',
      description: 'We strive to meet Web Content Accessibility Guidelines 2.1 Level AA standards',
      status: 'In Progress'
    },
    {
      name: 'ADA Compliance',
      description: 'Following Americans with Disabilities Act digital accessibility requirements',
      status: 'Committed'
    },
    {
      name: 'Section 508',
      description: 'Adhering to Section 508 of the Rehabilitation Act standards',
      status: 'In Progress'
    }
  ]

  const assistiveTech = [
    'JAWS (Job Access With Speech)',
    'NVDA (NonVisual Desktop Access)',
    'VoiceOver (macOS and iOS)',
    'TalkBack (Android)',
    'ZoomText',
    'Dragon NaturallySpeaking',
    'Browser built-in accessibility features'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[var(--muted)] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] mb-6 shadow-xl">
              <Accessibility className="w-10 h-10 text-[var(--primary-foreground)]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[var(--foreground)]">
              ACCESSIBILITY STATEMENT
            </h1>
            <p className="text-xl font-semibold text-theme-muted max-w-2xl mx-auto">
              Project Exodus is committed to ensuring digital accessibility for people of all abilities
            </p>
            <p className="text-sm font-bold text-theme-primary">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-primary shadow-xl">
              <CardContent className="p-10">
                <h2 className="text-3xl font-black mb-6 text-[var(--foreground)]">
                  OUR COMMITMENT TO ACCESSIBILITY
                </h2>
                <div className="space-y-4 text-base font-medium text-theme-muted leading-relaxed">
                  <p>
                    At Project Exodus, we believe that sustainability is for everyone. We're committed to making our
                    platform accessible to all users, including those with disabilities. Accessibility is not just
                    a requirement—it's a core value that guides our design and development decisions.
                  </p>
                  <p>
                    We continually work to enhance the accessibility of our website to ensure that all visitors can
                    easily navigate, understand, and interact with our content regardless of their abilities or the
                    technologies they use.
                  </p>
                  <p>
                    This accessibility statement outlines our ongoing efforts, the features we've implemented, and
                    how you can get help if you encounter accessibility barriers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">
              ACCESSIBILITY FEATURES
            </h2>
            <p className="text-lg font-semibold text-theme-muted">
              How we make Project Exodus accessible to everyone
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <Card key={i} className="border-4 border-theme-primary hover:border-theme-accent transition-all">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-lg flex-shrink-0">
                      <feature.icon className="w-7 h-7 text-[var(--primary-foreground)]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black mb-2 text-[var(--foreground)]">
                        {feature.title}
                      </h3>
                      <p className="text-sm font-medium text-theme-muted">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {feature.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-theme-primary flex-shrink-0 mt-1" />
                        <span className="font-medium text-theme-muted text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Standards Compliance */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">
                STANDARDS & COMPLIANCE
              </h2>
              <p className="text-lg font-semibold text-theme-muted">
                We follow established accessibility standards and guidelines
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {standards.map((standard, i) => (
                <Card key={i} className="border-2 border-[var(--border)]">
                  <CardContent className="p-8 text-center">
                    <Globe className="w-12 h-12 text-theme-primary mx-auto mb-4" />
                    <h3 className="text-xl font-black mb-3 text-[var(--foreground)]">
                      {standard.name}
                    </h3>
                    <p className="text-sm font-medium text-theme-muted mb-4">
                      {standard.description}
                    </p>
                    <span className="inline-block px-4 py-2 rounded-full bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] text-sm font-bold text-theme-primary">
                      {standard.status}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compatible Technologies */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-accent shadow-xl">
              <CardContent className="p-10">
                <h2 className="text-3xl font-black mb-6 text-center text-[var(--foreground)]">
                  COMPATIBLE ASSISTIVE TECHNOLOGIES
                </h2>
                <p className="text-center text-base font-medium text-theme-muted mb-8">
                  Project Exodus is designed to work with the following assistive technologies:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {assistiveTech.map((tech, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-[var(--background)]">
                      <CheckCircle2 className="w-5 h-5 text-theme-accent flex-shrink-0" />
                      <span className="font-bold text-[var(--foreground)]">{tech}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Known Issues */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-secondary shadow-xl">
              <CardContent className="p-10">
                <div className="flex items-start gap-6">
                  <AlertCircle className="w-12 h-12 text-theme-secondary flex-shrink-0" />
                  <div>
                    <h2 className="text-3xl font-black mb-6 text-[var(--foreground)]">
                      KNOWN LIMITATIONS
                    </h2>
                    <div className="space-y-4 text-base font-medium text-theme-muted leading-relaxed">
                      <p>
                        Despite our best efforts, there may be some limitations to the accessibility of certain
                        features on Project Exodus:
                      </p>
                      <ul className="space-y-2 ml-6">
                        <li className="list-disc">
                          Some third-party vendor storefronts may have varying levels of accessibility
                        </li>
                        <li className="list-disc">
                          Certain user-generated content may not meet accessibility standards
                        </li>
                        <li className="list-disc">
                          Some legacy features are being updated to meet current standards
                        </li>
                      </ul>
                      <p>
                        We're actively working to address these limitations and welcome your feedback on how we
                        can improve.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testing & Evaluation */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">
                TESTING & EVALUATION
              </h2>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-6">
                  <h3 className="font-black text-lg mb-3 text-[var(--foreground)]">
                    REGULAR AUDITS
                  </h3>
                  <p className="font-medium text-theme-muted">
                    We conduct regular accessibility audits using both automated tools and manual testing with
                    assistive technologies to identify and fix accessibility issues.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-6">
                  <h3 className="font-black text-lg mb-3 text-[var(--foreground)]">
                    USER TESTING
                  </h3>
                  <p className="font-medium text-theme-muted">
                    We involve users with disabilities in our testing process to get real-world feedback on our
                    accessibility features and identify areas for improvement.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-6">
                  <h3 className="font-black text-lg mb-3 text-[var(--foreground)]">
                    ONGOING IMPROVEMENT
                  </h3>
                  <p className="font-medium text-theme-muted">
                    Accessibility is an ongoing commitment. We continuously update our platform based on user
                    feedback, evolving standards, and new accessibility best practices.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback & Contact */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="border-4 border-theme-primary shadow-xl">
              <CardContent className="p-10 text-center">
                <Mail className="w-16 h-16 text-theme-primary mx-auto mb-6" />
                <h2 className="text-3xl font-black mb-4 text-[var(--foreground)]">
                  ACCESSIBILITY FEEDBACK
                </h2>
                <p className="text-lg font-semibold text-theme-muted mb-6">
                  We welcome your feedback on the accessibility of Project Exodus
                </p>
                <div className="space-y-4 mb-8">
                  <p className="text-base font-medium text-theme-muted leading-relaxed">
                    If you encounter any accessibility barriers on our platform, please let us know. We're committed
                    to providing accessible content and will work with you to find solutions.
                  </p>
                  <div className="pt-4">
                    <p className="font-bold text-[var(--foreground)] mb-2">
                      Accessibility Coordinator
                    </p>
                    <p className="font-bold text-[var(--foreground)]">
                      Email: <a href="mailto:accessibility@projectexodus.com" className="text-theme-primary hover:opacity-80">accessibility@projectexodus.com</a>
                    </p>
                  </div>
                </div>
                <Link href="/contact">
                  <Button size="lg" className="text-lg px-10 py-6 font-black shadow-lg">
                    CONTACT US
                  </Button>
                </Link>
                <p className="text-sm font-medium text-theme-muted mt-6">
                  We aim to respond to accessibility feedback within 3 business days
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-black">ACCESSIBILITY RESOURCES</h2>
            <p className="text-xl font-semibold opacity-90">
              Learn more about web accessibility
            </p>
            <div className="grid md:grid-cols-2 gap-6 pt-6">
              <a
                href="https://www.w3.org/WAI/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-xl bg-[var(--primary-foreground)] bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-all"
              >
                <h3 className="font-black text-lg mb-2">W3C Web Accessibility Initiative</h3>
                <p className="text-sm opacity-90">Resources and guidelines for web accessibility</p>
              </a>
              <a
                href="https://www.ada.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-xl bg-[var(--primary-foreground)] bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-all"
              >
                <h3 className="font-black text-lg mb-2">ADA Information</h3>
                <p className="text-sm opacity-90">Americans with Disabilities Act resources</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
