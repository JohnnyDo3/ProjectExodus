import { Card, CardContent } from '@/components/ui/Card'
import { ShieldCheck, Eye, Lock, Database, UserCheck, Bell, FileText, Mail } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function PrivacyPage() {
  const lastUpdated = 'November 20, 2025'

  const sections = [
    {
      id: 'information-we-collect',
      icon: Database,
      title: 'Information We Collect',
      content: [
        {
          subtitle: 'Information You Provide',
          text: 'When you create an account, make a purchase, or interact with our platform, you may provide us with information such as your name, email address, shipping address, phone number, and payment information (processed securely by our payment partners). You may also provide profile information, preferences, and content you post in our community forums.'
        },
        {
          subtitle: 'Automatically Collected Information',
          text: 'We automatically collect certain information when you use our services, including your IP address, browser type, device information, pages visited, time spent on pages, referring URLs, and interaction with features. We use cookies and similar technologies to collect this information.'
        },
        {
          subtitle: 'Information from Third Parties',
          text: 'If you sign in using a social media account (Google, Facebook, etc.), we receive basic profile information from those services. We may also receive information from our vendor partners about your purchases to facilitate order fulfillment and customer service.'
        }
      ]
    },
    {
      id: 'how-we-use-information',
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        {
          subtitle: 'Providing and Improving Services',
          text: 'We use your information to operate and maintain the Project Exodus platform, process transactions, provide customer support, personalize your experience, improve our products and services, and develop new features.'
        },
        {
          subtitle: 'Communication',
          text: 'We use your contact information to send order confirmations, shipping updates, respond to inquiries, send administrative messages, and (with your consent) send promotional emails about new products, features, and sustainability content. You can opt out of marketing emails at any time.'
        },
        {
          subtitle: 'Community Features',
          text: 'Information you provide in public forums, project posts, and community discussions is visible to other users. Your profile information may be displayed alongside your posts and contributions.'
        },
        {
          subtitle: 'Analytics and Research',
          text: 'We analyze aggregated, de-identified data to understand user behavior, measure the effectiveness of our platform, and conduct research about sustainability trends and impact.'
        }
      ]
    },
    {
      id: 'information-sharing',
      icon: UserCheck,
      title: 'How We Share Your Information',
      content: [
        {
          subtitle: 'With Vendors',
          text: 'When you purchase from a vendor through our marketplace, we share necessary information (name, shipping address, order details) with that vendor to fulfill your order. Each vendor has their own privacy practices.'
        },
        {
          subtitle: 'With Service Providers',
          text: 'We work with trusted third-party service providers who help us operate our platform (hosting, email services, analytics, payment processing). These providers are contractually obligated to protect your information and use it only for specified purposes.'
        },
        {
          subtitle: 'For Legal Reasons',
          text: 'We may disclose your information if required by law, to protect our rights or property, to prevent fraud or security issues, or in connection with a business transaction such as a merger or acquisition.'
        },
        {
          subtitle: 'With Your Consent',
          text: 'We may share your information in other ways with your explicit consent.'
        },
        {
          subtitle: 'What We Never Do',
          text: 'We NEVER sell your personal information to third parties for their marketing purposes. Your data is not a commodity to us.'
        }
      ]
    },
    {
      id: 'data-security',
      icon: Lock,
      title: 'Data Security',
      content: [
        {
          subtitle: 'Our Security Measures',
          text: 'We implement industry-standard security measures including encryption (SSL/TLS), secure servers, access controls, regular security audits, and employee training on data protection. Payment information is handled by PCI-compliant payment processors - we never store your full credit card details.'
        },
        {
          subtitle: 'Your Responsibility',
          text: 'Please use a strong, unique password and keep it confidential. Enable two-factor authentication if available. Be cautious about sharing personal information in public forums.'
        },
        {
          subtitle: 'Limitations',
          text: 'While we take security seriously, no method of internet transmission or electronic storage is 100% secure. We cannot guarantee absolute security but continuously work to protect your information.'
        }
      ]
    },
    {
      id: 'your-rights',
      icon: ShieldCheck,
      title: 'Your Privacy Rights',
      content: [
        {
          subtitle: 'Access and Portability',
          text: 'You have the right to access your personal information and receive a copy in a portable format.'
        },
        {
          subtitle: 'Correction',
          text: 'You can update or correct your information at any time through your account settings or by contacting us.'
        },
        {
          subtitle: 'Deletion',
          text: 'You can request deletion of your account and personal information. Some information may be retained for legal or legitimate business purposes.'
        },
        {
          subtitle: 'Opt-Out',
          text: 'You can opt out of marketing communications while still receiving important service-related messages.'
        },
        {
          subtitle: 'Cookie Management',
          text: 'You can manage cookie preferences through your browser settings. Note that disabling cookies may affect platform functionality.'
        },
        {
          subtitle: 'Do Not Track',
          text: 'We respect Do Not Track signals. When enabled, we limit data collection to essential functions only.'
        }
      ]
    },
    {
      id: 'cookies',
      icon: Bell,
      title: 'Cookies and Tracking',
      content: [
        {
          subtitle: 'What Are Cookies',
          text: 'Cookies are small text files stored on your device. We use them to remember your preferences, maintain your session, and analyze how you use our platform.'
        },
        {
          subtitle: 'Types of Cookies We Use',
          text: 'Essential cookies (required for platform operation), Functional cookies (remember preferences), Analytics cookies (understand usage patterns), and Marketing cookies (with consent, for relevant advertising).'
        },
        {
          subtitle: 'Managing Cookies',
          text: 'Most browsers allow you to refuse or delete cookies. Visit our Cookie Policy page for detailed information about our cookie practices and how to manage them.'
        }
      ]
    },
    {
      id: 'children',
      icon: UserCheck,
      title: "Children's Privacy",
      content: [
        {
          subtitle: 'Age Requirement',
          text: 'Project Exodus is not intended for children under 13. We do not knowingly collect information from children under 13. If you believe a child has provided us with personal information, please contact us immediately.'
        },
        {
          subtitle: 'Parental Consent',
          text: 'Users between 13-18 should have parental or guardian consent before using our platform.'
        }
      ]
    },
    {
      id: 'international',
      icon: Database,
      title: 'International Data Transfers',
      content: [
        {
          subtitle: 'Data Location',
          text: 'Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws.'
        },
        {
          subtitle: 'Protection Standards',
          text: 'When we transfer data internationally, we ensure appropriate safeguards are in place through standard contractual clauses, adequacy decisions, or other approved mechanisms.'
        }
      ]
    },
    {
      id: 'changes',
      icon: FileText,
      title: 'Changes to This Policy',
      content: [
        {
          subtitle: 'Updates',
          text: 'We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes via email or prominent notice on our platform.'
        },
        {
          subtitle: 'Effective Date',
          text: 'The "Last Updated" date at the top of this policy indicates when it was most recently revised. Continued use of our platform after changes constitutes acceptance of the updated policy.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[var(--muted)] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] mb-6 shadow-xl">
              <ShieldCheck className="w-10 h-10 text-[var(--primary-foreground)]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[var(--foreground)]">
              PRIVACY POLICY
            </h1>
            <p className="text-xl font-semibold text-theme-muted max-w-2xl mx-auto">
              Your privacy matters to us. Here's how we protect and use your information.
            </p>
            <p className="text-sm font-bold text-theme-primary">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-primary shadow-xl">
              <CardContent className="p-10">
                <p className="text-base font-medium text-theme-muted leading-relaxed mb-4">
                  At Project Exodus, we're committed to protecting your privacy and being transparent about how we collect,
                  use, and share your information. This Privacy Policy explains our data practices in clear, accessible language.
                </p>
                <p className="text-base font-medium text-theme-muted leading-relaxed">
                  By using Project Exodus, you agree to the practices described in this policy. If you have questions or concerns,
                  please contact us at <a href="mailto:privacy@projectexodus.com" className="font-bold text-theme-primary hover:opacity-80">privacy@projectexodus.com</a>.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-16 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-6 text-center text-[var(--foreground)]">TABLE OF CONTENTS</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {sections.map((section, i) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 p-4 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] hover:border-theme-primary transition-all group"
                >
                  <section.icon className="w-5 h-5 text-theme-primary" />
                  <span className="font-bold text-[var(--foreground)] group-hover:text-theme-primary transition-colors">
                    {i + 1}. {section.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, i) => (
              <div key={section.id} id={section.id}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-lg">
                    <section.icon className="w-7 h-7 text-[var(--primary-foreground)]" />
                  </div>
                  <h2 className="text-3xl font-black text-[var(--foreground)]">
                    {i + 1}. {section.title.toUpperCase()}
                  </h2>
                </div>

                <Card className="border-2 border-[var(--border)]">
                  <CardContent className="p-8 space-y-6">
                    {section.content.map((item, j) => (
                      <div key={j}>
                        <h3 className="font-black text-lg mb-3 text-[var(--foreground)]">
                          {item.subtitle}
                        </h3>
                        <p className="font-medium text-theme-muted leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="border-4 border-theme-primary shadow-xl">
              <CardContent className="p-10 text-center">
                <Mail className="w-16 h-16 text-theme-primary mx-auto mb-6" />
                <h2 className="text-3xl font-black mb-4 text-[var(--foreground)]">
                  QUESTIONS ABOUT YOUR PRIVACY?
                </h2>
                <p className="text-lg font-semibold text-theme-muted mb-8">
                  We're here to help. Contact our privacy team with any questions or concerns.
                </p>
                <div className="space-y-4">
                  <p className="font-bold text-[var(--foreground)]">
                    Email: <a href="mailto:privacy@projectexodus.com" className="text-theme-primary hover:opacity-80">privacy@projectexodus.com</a>
                  </p>
                  <p className="font-bold text-[var(--foreground)]">
                    Mail: Project Exodus Privacy Team, 123 Sustainability Lane, Green City, CA 94016
                  </p>
                </div>
                <div className="mt-8">
                  <Link href="/contact">
                    <Button size="lg" className="text-lg px-10 py-6 font-black shadow-lg">
                      CONTACT US
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Policies */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-black">RELATED POLICIES</h2>
            <p className="text-xl font-semibold opacity-90">
              Learn more about how we protect your rights and data
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/terms">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black">
                  TERMS OF SERVICE
                </Button>
              </Link>
              <Link href="/cookies">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black">
                  COOKIE POLICY
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
