import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  HelpCircle,
  Search,
  Package,
  ShoppingCart,
  Users,
  Leaf,
  ShieldCheck,
  CreditCard,
  Truck,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'

export default function FAQPage() {
  const faqCategories = [
    {
      id: 'general',
      name: 'General',
      icon: HelpCircle,
      questions: [
        {
          q: 'What is Project Exodus?',
          a: 'Project Exodus is a sustainable living marketplace and community platform. We connect conscious consumers with eco-friendly products, educational resources, and like-minded changemakers committed to building a better, more sustainable future.'
        },
        {
          q: 'How does Project Exodus work?',
          a: 'We curate products from verified sustainable vendors, provide educational content about sustainable living, and host a community where members can share knowledge, collaborate on projects, and support each other\'s sustainability journeys. You can browse products, read articles, join discussions, and make purchases all in one place.'
        },
        {
          q: 'Is Project Exodus free to use?',
          a: 'Yes! Creating an account, browsing products, reading articles, and joining the community is completely free. We only earn a small commission when you purchase products through our verified vendor partners.'
        },
        {
          q: 'How do you verify vendors?',
          a: 'We carefully vet every vendor for authentic sustainability practices, ethical manufacturing processes, transparent supply chains, and genuine commitment to environmental responsibility. Only vendors meeting our strict criteria receive the "Verified" badge.'
        }
      ]
    },
    {
      id: 'shopping',
      name: 'Shopping & Orders',
      icon: ShoppingCart,
      questions: [
        {
          q: 'How do I purchase products?',
          a: 'Browse our curated marketplace, click on products you\'re interested in, and you\'ll be directed to our verified vendor partners\' secure checkout pages to complete your purchase. Each vendor handles their own transactions and fulfillment.'
        },
        {
          q: 'Do you store my payment information?',
          a: 'No. All payments are processed securely through our vendor partners\' payment systems. We never store or have access to your credit card information.'
        },
        {
          q: 'Can I track my order?',
          a: 'Yes! Once your order ships, you\'ll receive a tracking number from the vendor via email. You can use this to monitor your shipment in real-time.'
        },
        {
          q: 'What if I have issues with my order?',
          a: 'Contact the vendor directly first, as they handle fulfillment and customer service for their products. If you need additional assistance, our support team at support@projectexodus.com is happy to help mediate.'
        },
        {
          q: 'Can I cancel or modify my order?',
          a: 'Order modifications and cancellations depend on the vendor\'s policy and how quickly you contact them. Reach out to the vendor as soon as possible if you need to make changes.'
        }
      ]
    },
    {
      id: 'shipping',
      name: 'Shipping & Delivery',
      icon: Truck,
      questions: [
        {
          q: 'How much does shipping cost?',
          a: 'Shipping costs vary by vendor, your location, and the products you order. Most vendors offer free shipping on orders over a certain threshold (typically $50-75). Exact costs are displayed at checkout.'
        },
        {
          q: 'How long does shipping take?',
          a: 'Standard shipping typically takes 5-7 business days within the US. Express shipping (2-3 days) is available for most products. International orders take 10-21 business days depending on destination and customs.'
        },
        {
          q: 'Do you ship internationally?',
          a: 'Yes! Many of our vendors ship worldwide. International shipping rates and times vary by destination. Note that you may be responsible for customs fees and import duties.'
        },
        {
          q: 'Is your shipping eco-friendly?',
          a: 'Absolutely! We partner with vendors who use carbon-neutral shipping, sustainable packaging materials (recyclable, compostable, or reusable), and eco-conscious carriers whenever possible.'
        }
      ]
    },
    {
      id: 'returns',
      name: 'Returns & Refunds',
      icon: Package,
      questions: [
        {
          q: 'What is your return policy?',
          a: 'Most vendors offer 30-day returns on unused items in original packaging. The specific return policy may vary by vendor, so check the product page or vendor storefront for details.'
        },
        {
          q: 'How do I initiate a return?',
          a: 'Contact the vendor or our support team within 30 days of delivery with your order number and reason for return. You\'ll receive return instructions and authorization if approved.'
        },
        {
          q: 'Who pays for return shipping?',
          a: 'Customers typically pay return shipping unless the item is defective or there was an error with the order. Some vendors offer free return shipping - check their specific policy.'
        },
        {
          q: 'How long do refunds take?',
          a: 'Once the vendor receives and inspects your return, refunds are typically processed within 5-7 business days to your original payment method. Allow additional time for your bank to process the refund.'
        },
        {
          q: 'Can I exchange an item?',
          a: 'Yes! Many vendors offer exchanges for different sizes, colors, or products. Indicate your preference when initiating your return.'
        }
      ]
    },
    {
      id: 'community',
      name: 'Community',
      icon: Users,
      questions: [
        {
          q: 'How do I join the community?',
          a: 'Create a free account and head to the Community section. There you can join forums, start discussions, collaborate on projects, and connect with other sustainability enthusiasts from around the world.'
        },
        {
          q: 'Can I share my own sustainability projects?',
          a: 'Absolutely! We encourage members to share their initiatives. Go to Community > Projects and click "Create Project" to showcase your sustainability efforts and invite others to collaborate.'
        },
        {
          q: 'How do I earn badges and reputation?',
          a: 'Badges are awarded for active participation: posting helpful content, contributing to discussions, completing sustainability challenges, supporting other members, and reaching milestones in your journey.'
        },
        {
          q: 'Are there community guidelines?',
          a: 'Yes. We maintain a respectful, supportive environment. Be kind, stay on-topic, don\'t spam, respect others\' opinions, and focus on constructive conversations about sustainability.'
        }
      ]
    },
    {
      id: 'sustainability',
      name: 'Sustainability',
      icon: Leaf,
      questions: [
        {
          q: 'How do you define sustainable products?',
          a: 'We look for products that minimize environmental impact through eco-friendly materials, ethical manufacturing, reduced waste, energy efficiency, durability, and transparent supply chains. Each product includes details about its sustainability features.'
        },
        {
          q: 'What is your sustainability scoring system?',
          a: 'We rate products across multiple criteria: materials (renewable, recycled, biodegradable), manufacturing (fair labor, low emissions), packaging (minimal, recyclable), and lifecycle (durability, end-of-life options). Higher scores indicate better sustainability.'
        },
        {
          q: 'Do you offset carbon emissions?',
          a: 'Yes! We work with vendors who participate in carbon offset programs. Many also use carbon-neutral shipping and invest in renewable energy for their operations.'
        },
        {
          q: 'How can I live more sustainably?',
          a: 'Visit our Learn section for comprehensive guides on sustainable living topics: reducing waste, conserving energy, eating sustainably, sustainable fashion, green cleaning, and more. Start small and build habits over time!'
        }
      ]
    },
    {
      id: 'account',
      name: 'Account & Privacy',
      icon: ShieldCheck,
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click "Sign Up" in the top navigation. You can create an account with your email or sign in using social providers like Google or Facebook. All accounts are free!'
        },
        {
          q: 'Is my personal information secure?',
          a: 'Yes. We use industry-standard encryption and security practices. Your personal information is never sold to third parties. Read our Privacy Policy for complete details on how we protect your data.'
        },
        {
          q: 'How do I update my profile information?',
          a: 'Click your profile icon in the top right corner, select "Profile Settings", and you can update your personal information, preferences, notification settings, and more.'
        },
        {
          q: 'Can I delete my account?',
          a: 'Yes, you have complete control over your data. Go to Profile Settings > Account > Delete Account. This action is permanent and cannot be undone, so make sure you\'re ready before proceeding.'
        },
        {
          q: 'What data do you collect?',
          a: 'We collect information you provide (name, email, preferences), usage data (pages visited, features used), and standard technical data (IP address, browser type). We never sell your data. See our Privacy Policy for full details.'
        }
      ]
    },
    {
      id: 'vendors',
      name: 'For Vendors',
      icon: Package,
      questions: [
        {
          q: 'How do I become a vendor?',
          a: 'Visit our Vendors page and click "Become a Vendor". You\'ll need to provide information about your business, sustainability practices, certifications, and products. Our team reviews all applications carefully.'
        },
        {
          q: 'What are the requirements to sell on Project Exodus?',
          a: 'Vendors must demonstrate authentic sustainability practices, ethical manufacturing, transparent supply chains, quality products, and commitment to environmental responsibility. We prioritize businesses with third-party certifications.'
        },
        {
          q: 'What fees do you charge vendors?',
          a: 'We charge a small commission on sales made through our platform. The percentage varies based on product category and vendor tier. Contact us for detailed pricing information.'
        },
        {
          q: 'How do payments work for vendors?',
          a: 'Vendors receive payments directly from customers through their own payment processing systems. We don\'t handle transactions - we simply connect buyers with sellers.'
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
              <HelpCircle className="w-10 h-10 text-[var(--primary-foreground)]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[var(--foreground)]">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <p className="text-xl font-semibold text-theme-muted max-w-2xl mx-auto">
              Find answers to common questions about Project Exodus
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto pt-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-muted" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors text-base font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-black mb-6 text-center text-[var(--foreground)]">BROWSE BY CATEGORY</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {faqCategories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="flex items-center gap-3 p-4 rounded-xl bg-[var(--card)] border-2 border-[var(--border)] hover:border-theme-primary transition-all transform hover:scale-105 group"
                >
                  <category.icon className="w-6 h-6 text-theme-primary" />
                  <span className="font-bold text-[var(--foreground)] group-hover:text-theme-primary transition-colors">
                    {category.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-16">
            {faqCategories.map((category) => (
              <div key={category.id} id={category.id}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-lg">
                    <category.icon className="w-7 h-7 text-[var(--primary-foreground)]" />
                  </div>
                  <h2 className="text-3xl font-black text-[var(--foreground)]">
                    {category.name.toUpperCase()}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq, i) => (
                    <Card key={i} className="border-2 border-[var(--border)] hover:border-theme-accent transition-all">
                      <CardContent className="p-6">
                        <details className="group">
                          <summary className="flex items-start justify-between cursor-pointer list-none">
                            <h3 className="font-black text-lg text-[var(--foreground)] pr-4">
                              {faq.q}
                            </h3>
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
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-black">STILL HAVE QUESTIONS?</h2>
            <p className="text-xl font-semibold opacity-90">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact">
                <Button size="lg" className="text-lg px-10 py-6 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-xl">
                  CONTACT SUPPORT
                </Button>
              </Link>
              <Link href="/community">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black">
                  ASK THE COMMUNITY
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
