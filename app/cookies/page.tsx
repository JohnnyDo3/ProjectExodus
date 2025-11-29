import { Card, CardContent } from '@/components/ui/Card'
import { Cookie, Shield, Eye, TrendingUp, Settings, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function CookiesPage() {
  const lastUpdated = 'November 20, 2025'

  const cookieTypes = [
    {
      icon: Shield,
      name: 'Strictly Necessary Cookies',
      required: true,
      description: 'Essential for the Platform to function properly. These cannot be disabled.',
      purpose: 'Authentication, security, load balancing, and basic functionality',
      examples: [
        'Session management and login authentication',
        'Security and fraud prevention',
        'Load balancing for optimal performance',
        'Remembering your privacy preferences'
      ],
      retention: 'Session-based or up to 1 year'
    },
    {
      icon: Settings,
      name: 'Functional Cookies',
      required: false,
      description: 'Enhance functionality and personalization but are not essential.',
      purpose: 'Remember your preferences and provide enhanced features',
      examples: [
        'Language and region preferences',
        'Display settings and accessibility options',
        'Recently viewed items',
        'Shopping cart contents (if not logged in)'
      ],
      retention: 'Up to 1 year'
    },
    {
      icon: TrendingUp,
      name: 'Analytics Cookies',
      required: false,
      description: 'Help us understand how visitors use our Platform.',
      purpose: 'Collect anonymous data about site usage and performance',
      examples: [
        'Pages visited and time spent',
        'Traffic sources and navigation patterns',
        'Device and browser information',
        'Error tracking and performance metrics'
      ],
      retention: 'Up to 2 years'
    },
    {
      icon: Eye,
      name: 'Marketing Cookies',
      required: false,
      description: 'Used to deliver relevant advertising and measure campaign effectiveness.',
      purpose: 'Show relevant ads and measure marketing performance',
      examples: [
        'Track ad campaign effectiveness',
        'Display personalized recommendations',
        'Remember products you\'ve viewed',
        'Social media integration'
      ],
      retention: 'Up to 2 years'
    }
  ]

  const thirdPartyCookies = [
    {
      provider: 'Google Analytics',
      purpose: 'Website analytics and traffic analysis',
      type: 'Analytics',
      link: 'https://policies.google.com/privacy'
    },
    {
      provider: 'Stripe',
      purpose: 'Payment processing and fraud prevention',
      type: 'Functional',
      link: 'https://stripe.com/privacy'
    },
    {
      provider: 'Facebook',
      purpose: 'Social login and marketing pixels',
      type: 'Marketing',
      link: 'https://www.facebook.com/privacy/explanation'
    },
    {
      provider: 'Cloudflare',
      purpose: 'Security and performance optimization',
      type: 'Necessary',
      link: 'https://www.cloudflare.com/privacypolicy/'
    }
  ]

  const browserControls = [
    {
      browser: 'Google Chrome',
      steps: 'Settings > Privacy and Security > Cookies and other site data'
    },
    {
      browser: 'Mozilla Firefox',
      steps: 'Settings > Privacy & Security > Cookies and Site Data'
    },
    {
      browser: 'Safari',
      steps: 'Preferences > Privacy > Cookies and website data'
    },
    {
      browser: 'Microsoft Edge',
      steps: 'Settings > Cookies and site permissions > Cookies and data stored'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[var(--muted)] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] mb-6 shadow-xl">
              <Cookie className="w-10 h-10 text-[var(--primary-foreground)]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[var(--foreground)]">
              COOKIE POLICY
            </h1>
            <p className="text-xl font-semibold text-theme-muted max-w-2xl mx-auto">
              Learn how we use cookies and similar technologies on Project Exodus
            </p>
            <p className="text-sm font-bold text-theme-primary">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* What Are Cookies */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-primary shadow-xl">
              <CardContent className="p-10">
                <h2 className="text-3xl font-black mb-6 text-[var(--foreground)]">
                  WHAT ARE COOKIES?
                </h2>
                <div className="space-y-4 text-base font-medium text-theme-muted leading-relaxed">
                  <p>
                    Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when
                    you visit a website. They are widely used to make websites work more efficiently and provide a
                    better user experience.
                  </p>
                  <p>
                    Cookies help websites remember your preferences, keep you logged in, and understand how you use
                    the site. Some cookies are essential for the website to function, while others enhance your
                    experience or help us improve our services.
                  </p>
                  <p>
                    This Cookie Policy explains what cookies we use, why we use them, and how you can control them.
                    This policy should be read in conjunction with our <Link href="/privacy" className="font-bold text-theme-primary hover:opacity-80">Privacy Policy</Link>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">
              TYPES OF COOKIES WE USE
            </h2>
            <p className="text-lg font-semibold text-theme-muted">
              We use different types of cookies for different purposes
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {cookieTypes.map((type, i) => (
              <Card key={i} className="border-4 border-theme-primary hover:border-theme-accent transition-all">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-lg flex-shrink-0">
                      <type.icon className="w-8 h-8 text-[var(--primary-foreground)]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-black text-[var(--foreground)]">
                          {type.name}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-black ${
                          type.required
                            ? 'bg-theme-secondary text-[var(--secondary-foreground)]'
                            : 'bg-theme-primary text-[var(--primary-foreground)]'
                        }`}>
                          {type.required ? 'REQUIRED' : 'OPTIONAL'}
                        </span>
                      </div>
                      <p className="text-base font-medium text-theme-muted mb-4">
                        {type.description}
                      </p>
                      <div className="mb-4">
                        <h4 className="font-black text-sm mb-2 text-[var(--foreground)] uppercase">Purpose:</h4>
                        <p className="font-medium text-theme-muted">{type.purpose}</p>
                      </div>
                      <div>
                        <h4 className="font-black text-sm mb-3 text-[var(--foreground)] uppercase">Examples:</h4>
                        <ul className="space-y-2">
                          {type.examples.map((example, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-theme-primary flex-shrink-0 mt-0.5" />
                              <span className="font-medium text-theme-muted text-sm">{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 pt-4 border-t-2 border-[var(--border)]">
                        <p className="text-sm font-bold text-theme-muted">
                          Retention Period: <span className="text-[var(--foreground)]">{type.retention}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Third-Party Cookies */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">
                THIRD-PARTY COOKIES
              </h2>
              <p className="text-lg font-semibold text-theme-muted">
                Some cookies are set by third-party services we use
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {thirdPartyCookies.map((cookie, i) => (
                <Card key={i} className="border-2 border-[var(--border)] hover:border-theme-primary transition-all">
                  <CardContent className="p-6">
                    <h3 className="font-black text-xl mb-2 text-[var(--foreground)]">
                      {cookie.provider}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium text-theme-muted">
                        <span className="font-bold text-[var(--foreground)]">Purpose:</span> {cookie.purpose}
                      </p>
                      <p className="text-sm font-medium text-theme-muted">
                        <span className="font-bold text-[var(--foreground)]">Type:</span> {cookie.type}
                      </p>
                    </div>
                    <a
                      href={cookie.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-theme-primary hover:opacity-80"
                    >
                      View Privacy Policy →
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Managing Cookies */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">
                MANAGING YOUR COOKIE PREFERENCES
              </h2>
              <p className="text-lg font-semibold text-theme-muted">
                You have control over which cookies you accept
              </p>
            </div>

            <div className="space-y-8">
              {/* Cookie Settings */}
              <Card className="border-4 border-theme-primary shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <Settings className="w-12 h-12 text-theme-primary flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-black mb-4 text-[var(--foreground)]">
                        OUR COOKIE SETTINGS
                      </h3>
                      <p className="text-base font-medium text-theme-muted mb-6">
                        You can manage your cookie preferences through our cookie settings tool (typically accessible
                        via a banner when you first visit or through your account settings).
                      </p>
                      <Button className="font-black">
                        MANAGE COOKIE PREFERENCES
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Browser Settings */}
              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-6 text-[var(--foreground)]">
                    BROWSER COOKIE CONTROLS
                  </h3>
                  <p className="text-base font-medium text-theme-muted mb-6">
                    Most browsers allow you to control cookies through their settings. Here's how to access cookie
                    controls in popular browsers:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {browserControls.map((browser, i) => (
                      <div key={i} className="p-4 rounded-lg bg-[var(--muted)]">
                        <h4 className="font-black text-base mb-2 text-[var(--foreground)]">
                          {browser.browser}
                        </h4>
                        <p className="text-sm font-medium text-theme-muted">
                          {browser.steps}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Important Note */}
              <Card className="border-2 border-theme-secondary bg-[color-mix(in_srgb,var(--secondary)_10%,var(--card))]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-8 h-8 text-theme-secondary flex-shrink-0" />
                    <div>
                      <h4 className="font-black text-lg mb-2 text-[var(--foreground)]">
                        IMPORTANT NOTE
                      </h4>
                      <p className="font-medium text-theme-muted">
                        Disabling certain cookies may affect your experience on Project Exodus. Some features may not
                        work properly if you block essential cookies. If you choose to delete all cookies, you'll need
                        to reset your preferences the next time you visit.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Do Not Track */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-accent shadow-xl">
              <CardContent className="p-10">
                <h2 className="text-3xl font-black mb-6 text-[var(--foreground)]">
                  DO NOT TRACK SIGNALS
                </h2>
                <p className="text-base font-medium text-theme-muted leading-relaxed">
                  We respect Do Not Track (DNT) browser signals. When DNT is enabled, we limit our data collection
                  to strictly necessary functions only. We disable analytics and marketing cookies and do not track
                  your activity across other websites. You can enable DNT in your browser's privacy settings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-6 text-[var(--foreground)]">
              QUESTIONS ABOUT COOKIES?
            </h2>
            <p className="text-lg font-semibold text-theme-muted mb-8">
              If you have questions about our use of cookies, please contact us.
            </p>
            <div className="space-y-4 mb-8">
              <p className="font-bold text-[var(--foreground)]">
                Email: <a href="mailto:privacy@projectexodus.com" className="text-theme-primary hover:opacity-80">privacy@projectexodus.com</a>
              </p>
            </div>
            <Link href="/contact">
              <Button size="lg" className="text-lg px-10 py-6 font-black shadow-lg">
                CONTACT US
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Policies */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-black">RELATED POLICIES</h2>
            <p className="text-xl font-semibold opacity-90">
              Learn more about how we protect your privacy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/privacy">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black">
                  PRIVACY POLICY
                </Button>
              </Link>
              <Link href="/terms">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black">
                  TERMS OF SERVICE
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
