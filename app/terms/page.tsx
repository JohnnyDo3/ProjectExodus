import { Card, CardContent } from '@/components/ui/Card'
import { FileText, Scale, Users, ShoppingCart, MessageSquare, AlertCircle, Shield, Mail } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function TermsPage() {
  const lastUpdated = 'November 20, 2025'

  const sections = [
    {
      id: 'acceptance',
      icon: FileText,
      title: 'Acceptance of Terms',
      content: [
        {
          text: 'By accessing or using Project Exodus (the "Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use our Platform.'
        },
        {
          text: 'We may modify these Terms at any time. Material changes will be communicated via email or prominent notice on the Platform. Your continued use after changes constitutes acceptance of the modified Terms.'
        },
        {
          text: 'You must be at least 13 years old to use Project Exodus. Users between 13-18 must have parental or guardian consent.'
        }
      ]
    },
    {
      id: 'account',
      icon: Users,
      title: 'User Accounts',
      content: [
        {
          subtitle: 'Account Creation',
          text: 'You may create an account using your email address or through supported social login providers. You agree to provide accurate, current, and complete information during registration and to update it as necessary.'
        },
        {
          subtitle: 'Account Security',
          text: 'You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized access or security breaches. You are responsible for all activities that occur under your account.'
        },
        {
          subtitle: 'Account Termination',
          text: 'You may delete your account at any time through your account settings. We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or for any other reason at our discretion.'
        }
      ]
    },
    {
      id: 'marketplace',
      icon: ShoppingCart,
      title: 'Marketplace and Transactions',
      content: [
        {
          subtitle: 'Platform Role',
          text: 'Project Exodus is a marketplace platform connecting buyers with independent third-party vendors. We facilitate these connections but are not a party to the transactions between you and vendors.'
        },
        {
          subtitle: 'Vendor Responsibility',
          text: 'Each vendor is responsible for their product listings, pricing, inventory, order fulfillment, customer service, and compliance with applicable laws. Product information and availability are subject to change without notice.'
        },
        {
          subtitle: 'Purchases',
          text: 'When you make a purchase through our Platform, you are entering into a contract directly with the vendor. Payment processing, shipping, returns, and refunds are handled according to the vendor\'s policies, which may vary. We are not responsible for vendor performance or disputes.'
        },
        {
          subtitle: 'Pricing and Payment',
          text: 'All prices are displayed in the vendor\'s chosen currency. Vendors are responsible for pricing accuracy. You agree to pay all charges incurred under your account, including applicable taxes and shipping fees.'
        },
        {
          subtitle: 'Our Commission',
          text: 'We earn a commission on sales made through the Platform. This commission is paid by vendors and does not affect the price you pay.'
        }
      ]
    },
    {
      id: 'user-content',
      icon: MessageSquare,
      title: 'User-Generated Content',
      content: [
        {
          subtitle: 'Your Content',
          text: 'You may post content on our Platform, including forum posts, project descriptions, comments, and reviews ("User Content"). You retain ownership of your User Content but grant us a worldwide, non-exclusive, royalty-free license to use, display, reproduce, and distribute it on the Platform.'
        },
        {
          subtitle: 'Content Standards',
          text: 'You agree that your User Content will not contain: illegal content, hate speech or discriminatory content, harassment or threats, spam or deceptive content, personal information of others without consent, copyrighted material you don\'t have rights to use, or malicious code or viruses.'
        },
        {
          subtitle: 'Content Moderation',
          text: 'We reserve the right (but have no obligation) to monitor, review, and remove User Content that violates these Terms or is otherwise objectionable. We are not responsible for User Content posted by others.'
        },
        {
          subtitle: 'Copyright Infringement',
          text: 'We respect intellectual property rights. If you believe content on our Platform infringes your copyright, please contact us at copyright@projectexodus.com with detailed information.'
        }
      ]
    },
    {
      id: 'prohibited-conduct',
      icon: AlertCircle,
      title: 'Prohibited Conduct',
      content: [
        {
          text: 'You agree not to: violate any laws or regulations; infringe on intellectual property rights; transmit viruses or malicious code; attempt to gain unauthorized access to our systems; impersonate others or misrepresent your affiliation; scrape or harvest data from the Platform without permission; interfere with the Platform\'s operation; engage in fraudulent activity; harass, abuse, or harm others; or use the Platform for any unauthorized commercial purpose.'
        }
      ]
    },
    {
      id: 'intellectual-property',
      icon: Shield,
      title: 'Intellectual Property',
      content: [
        {
          subtitle: 'Our IP',
          text: 'The Platform, including its design, features, functionality, and content (excluding User Content and vendor content), is owned by Project Exodus and protected by copyright, trademark, and other intellectual property laws.'
        },
        {
          subtitle: 'Limited License',
          text: 'We grant you a limited, non-exclusive, non-transferable license to access and use the Platform for personal, non-commercial purposes in accordance with these Terms.'
        },
        {
          subtitle: 'Restrictions',
          text: 'You may not copy, modify, distribute, sell, or lease any part of our Platform or its content without our express written permission.'
        }
      ]
    },
    {
      id: 'disclaimers',
      icon: AlertCircle,
      title: 'Disclaimers',
      content: [
        {
          subtitle: 'As-Is Basis',
          text: 'THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.'
        },
        {
          subtitle: 'No Guarantees',
          text: 'We do not guarantee that the Platform will be uninterrupted, error-free, secure, or free of viruses or other harmful components. We do not guarantee the accuracy, completeness, or reliability of content on the Platform.'
        },
        {
          subtitle: 'Vendor Responsibility',
          text: 'We do not endorse or guarantee any vendor, product, or service on the Platform. We are not responsible for vendor conduct, product quality, delivery, or disputes between you and vendors.'
        }
      ]
    },
    {
      id: 'limitation-liability',
      icon: Scale,
      title: 'Limitation of Liability',
      content: [
        {
          text: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, PROJECT EXODUS AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AND PARTNERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST DATA, OR BUSINESS INTERRUPTION, ARISING FROM YOUR USE OF THE PLATFORM.'
        },
        {
          text: 'OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING FROM YOUR USE OF THE PLATFORM SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.'
        },
        {
          text: 'Some jurisdictions do not allow the exclusion or limitation of certain damages, so the above limitations may not apply to you.'
        }
      ]
    },
    {
      id: 'indemnification',
      icon: Shield,
      title: 'Indemnification',
      content: [
        {
          text: 'You agree to indemnify, defend, and hold harmless Project Exodus and its affiliates, officers, employees, and partners from any claims, liabilities, damages, losses, and expenses (including legal fees) arising from: your use of the Platform; your User Content; your violation of these Terms; or your violation of any rights of others.'
        }
      ]
    },
    {
      id: 'dispute-resolution',
      icon: Scale,
      title: 'Dispute Resolution',
      content: [
        {
          subtitle: 'Informal Resolution',
          text: 'If you have a dispute with us, please contact us first at legal@projectexodus.com to attempt to resolve it informally.'
        },
        {
          subtitle: 'Arbitration',
          text: 'Any disputes that cannot be resolved informally shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. You waive your right to participate in class action lawsuits or class-wide arbitration.'
        },
        {
          subtitle: 'Governing Law',
          text: 'These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles.'
        },
        {
          subtitle: 'Exceptions',
          text: 'Nothing in this section prevents either party from seeking injunctive relief in court for violations of intellectual property rights.'
        }
      ]
    },
    {
      id: 'general',
      icon: FileText,
      title: 'General Provisions',
      content: [
        {
          subtitle: 'Entire Agreement',
          text: 'These Terms, along with our Privacy Policy and any other legal notices published on the Platform, constitute the entire agreement between you and Project Exodus.'
        },
        {
          subtitle: 'Severability',
          text: 'If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.'
        },
        {
          subtitle: 'No Waiver',
          text: 'Our failure to enforce any right or provision of these Terms does not constitute a waiver of that right or provision.'
        },
        {
          subtitle: 'Assignment',
          text: 'You may not assign or transfer these Terms without our written consent. We may assign these Terms without restriction.'
        },
        {
          subtitle: 'Force Majeure',
          text: 'We are not liable for delays or failures in performance resulting from causes beyond our reasonable control.'
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
              <FileText className="w-10 h-10 text-[var(--primary-foreground)]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[var(--foreground)]">
              TERMS OF SERVICE
            </h1>
            <p className="text-xl font-semibold text-theme-muted max-w-2xl mx-auto">
              Please read these terms carefully before using Project Exodus
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
                  Welcome to Project Exodus! These Terms of Service ("Terms") govern your use of our sustainable living
                  marketplace and community platform. By using our services, you agree to these Terms.
                </p>
                <p className="text-base font-medium text-theme-muted leading-relaxed">
                  We've written these Terms in plain language to make them as clear as possible. If you have questions,
                  please contact us at <a href="mailto:legal@projectexodus.com" className="font-bold text-theme-primary hover:opacity-80">legal@projectexodus.com</a>.
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

      {/* Terms Sections */}
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
                        {item.subtitle && (
                          <h3 className="font-black text-lg mb-3 text-[var(--foreground)]">
                            {item.subtitle}
                          </h3>
                        )}
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
                  QUESTIONS ABOUT THESE TERMS?
                </h2>
                <p className="text-lg font-semibold text-theme-muted mb-8">
                  Our legal team is available to help clarify any questions about our Terms of Service.
                </p>
                <div className="space-y-4">
                  <p className="font-bold text-[var(--foreground)]">
                    Email: <a href="mailto:legal@projectexodus.com" className="text-theme-primary hover:opacity-80">legal@projectexodus.com</a>
                  </p>
                  <p className="font-bold text-[var(--foreground)]">
                    Mail: Project Exodus Legal Department, 123 Sustainability Lane, Green City, CA 94016
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
              Learn more about your rights and our practices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/privacy">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black">
                  PRIVACY POLICY
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
