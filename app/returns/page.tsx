import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  RefreshCcw,
  Package,
  CheckCircle2,
  Clock,
  DollarSign,
  AlertCircle,
  Mail,
  FileText
} from 'lucide-react'
import Link from 'next/link'

export default function ReturnsPage() {
  const returnSteps = [
    {
      step: 1,
      icon: Mail,
      title: 'Contact Us',
      description: 'Email us within 30 days of delivery with your order number and reason for return'
    },
    {
      step: 2,
      icon: CheckCircle2,
      title: 'Get Approval',
      description: 'We\'ll review your request and provide a return authorization number within 24 hours'
    },
    {
      step: 3,
      icon: Package,
      title: 'Ship It Back',
      description: 'Pack the item securely in original packaging and ship with tracking number'
    },
    {
      step: 4,
      icon: DollarSign,
      title: 'Receive Refund',
      description: 'Once received and inspected, your refund will be processed within 5-7 business days'
    }
  ]

  const policies = [
    {
      icon: Clock,
      title: '30-Day Return Window',
      description: 'Items can be returned within 30 days of delivery for a full refund or exchange'
    },
    {
      icon: Package,
      title: 'Original Condition',
      description: 'Items must be unused, unworn, and in original packaging with all tags attached'
    },
    {
      icon: RefreshCcw,
      title: 'Free Exchanges',
      description: 'We offer free exchanges on all products - just pay return shipping'
    },
    {
      icon: DollarSign,
      title: 'Full Refunds',
      description: 'Receive a full refund to your original payment method once return is processed'
    }
  ]

  const nonReturnableItems = [
    'Personal care items (for hygiene reasons)',
    'Food and beverage products',
    'Custom or personalized items',
    'Digital products and downloads',
    'Gift cards',
    'Items marked as final sale'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[var(--muted)] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] mb-6 shadow-xl">
              <RefreshCcw className="w-10 h-10 text-[var(--primary-foreground)]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[var(--foreground)]">
              RETURNS & REFUNDS
            </h1>
            <p className="text-xl font-semibold text-theme-muted max-w-2xl mx-auto">
              We want you to love your purchase. If you're not completely satisfied, we make returns easy.
            </p>
          </div>
        </div>
      </section>

      {/* Return Policy Overview */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">OUR RETURN POLICY</h2>
            <p className="text-lg font-semibold text-theme-muted">
              Simple, fair, and designed with you in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {policies.map((policy, i) => (
              <Card key={i} className="border-4 border-theme-primary hover:border-theme-accent transition-all text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] flex items-center justify-center">
                    <policy.icon className="w-8 h-8 text-theme-primary" />
                  </div>
                  <h3 className="text-lg font-black mb-3 text-[var(--foreground)]">
                    {policy.title}
                  </h3>
                  <p className="text-sm font-medium text-theme-muted">
                    {policy.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">
                HOW TO RETURN AN ITEM
              </h2>
              <p className="text-lg font-semibold text-theme-muted">
                Follow these simple steps to return your purchase
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {returnSteps.map((step, i) => (
                <Card key={i} className="border-4 border-theme-accent hover:border-theme-primary transition-all">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] flex items-center justify-center shadow-lg">
                          <step.icon className="w-8 h-8 text-[var(--primary-foreground)]" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center shadow-md">
                          <span className="text-sm font-black text-[var(--primary-foreground)]">{step.step}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-black mb-3 text-[var(--foreground)]">
                          {step.title}
                        </h3>
                        <p className="text-base font-medium text-theme-muted">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Non-Returnable Items */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-secondary shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-4 justify-center">
                  <AlertCircle className="w-12 h-12 text-theme-secondary" />
                  <CardTitle className="text-3xl font-black text-[var(--foreground)]">
                    NON-RETURNABLE ITEMS
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-center text-lg font-semibold text-theme-muted mb-8">
                  For health, safety, and legal reasons, the following items cannot be returned:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {nonReturnableItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-[var(--muted)]">
                      <div className="w-2 h-2 rounded-full bg-theme-secondary mt-2 flex-shrink-0" />
                      <p className="font-bold text-[var(--foreground)]">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Refund Information */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">
                REFUND DETAILS
              </h2>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-theme-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-black text-lg text-[var(--foreground)] mb-2">REFUND PROCESSING TIME</h3>
                      <p className="font-medium text-theme-muted">
                        Once we receive and inspect your return, we'll process your refund within 5-7 business days.
                        The refund will be issued to your original payment method.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-theme-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-black text-lg text-[var(--foreground)] mb-2">RETURN SHIPPING COSTS</h3>
                      <p className="font-medium text-theme-muted">
                        Customers are responsible for return shipping costs unless the item is defective or we made an error.
                        We recommend using a trackable shipping service.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-theme-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-black text-lg text-[var(--foreground)] mb-2">EXCHANGES</h3>
                      <p className="font-medium text-theme-muted">
                        Need a different size or color? We offer free exchanges! Simply indicate your preference when
                        initiating your return and we'll ship the replacement at no additional cost.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-theme-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-black text-lg text-[var(--foreground)] mb-2">DAMAGED OR DEFECTIVE ITEMS</h3>
                      <p className="font-medium text-theme-muted">
                        If you receive a damaged or defective item, contact us immediately with photos.
                        We'll provide a prepaid return label and rush a replacement or full refund.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-theme-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-black text-lg text-[var(--foreground)] mb-2">LATE OR MISSING REFUNDS</h3>
                      <p className="font-medium text-theme-muted">
                        If you haven't received your refund within the stated timeframe, first check your bank account,
                        then contact your credit card company. If you've done all of this and still haven't received your refund, please contact us.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Returns Note */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-primary shadow-xl bg-[color-mix(in_srgb,var(--primary)_10%,var(--card))]">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <FileText className="w-12 h-12 text-theme-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-black mb-4 text-[var(--foreground)]">
                      VENDOR-SPECIFIC POLICIES
                    </h3>
                    <p className="text-base font-medium text-theme-muted leading-relaxed mb-4">
                      Project Exodus is a marketplace connecting you with sustainable vendors. While we strive for consistency,
                      some vendors may have their own return policies that differ slightly from ours.
                    </p>
                    <p className="text-base font-medium text-theme-muted leading-relaxed">
                      Always check the product page for vendor-specific return information, or contact the vendor directly
                      through their storefront. If you need assistance, our support team is happy to help mediate.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-black">NEED TO MAKE A RETURN?</h2>
            <p className="text-xl font-semibold opacity-90">
              Contact our support team to initiate your return or exchange
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact">
                <Button size="lg" className="text-lg px-10 py-6 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-xl">
                  START A RETURN
                </Button>
              </Link>
              <Link href="/support">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black">
                  VISIT HELP CENTER
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
