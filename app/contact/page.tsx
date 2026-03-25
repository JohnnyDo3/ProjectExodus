'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Clock,
  Leaf
} from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'hello@projectexodus.com',
      description: 'We respond within 24 hours',
      href: 'mailto:hello@projectexodus.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '1-800-ECO-LIFE',
      description: 'Mon-Fri, 9am-6pm EST',
      href: 'tel:1-800-326-5433'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      value: 'Chat with us',
      description: 'Available during business hours',
      href: '#'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[var(--muted)] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] mb-6 shadow-xl">
              <Mail className="w-10 h-10 text-[var(--primary-foreground)]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[var(--foreground)]">
              GET IN TOUCH
            </h1>
            <p className="text-xl font-semibold text-theme-muted max-w-2xl mx-auto">
              Have a question or feedback? We'd love to hear from you. Our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {contactMethods.map((method, i) => (
              <Card key={i} className="border-4 border-theme-primary hover:border-theme-accent transition-all transform hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] flex items-center justify-center">
                    <method.icon className="w-8 h-8 text-theme-primary" />
                  </div>
                  <CardTitle className="text-2xl font-black text-[var(--foreground)]">
                    {method.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <a
                    href={method.href}
                    className="block text-lg font-bold text-theme-primary hover:opacity-80 transition-colors"
                  >
                    {method.value}
                  </a>
                  <p className="text-sm font-medium text-theme-muted">
                    {method.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">SEND US A MESSAGE</h2>
              <p className="text-lg font-semibold text-theme-muted">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </div>

            <Card className="border-4 border-theme-primary shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                      SUBJECT *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                      MESSAGE *
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium resize-none"
                      placeholder="Tell us more about your question or feedback..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full text-lg py-6 font-black shadow-lg">
                    <Send className="w-5 h-5 mr-2" />
                    SEND MESSAGE
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">
                FIND US
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-4 border-theme-accent">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-theme-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-[var(--foreground)] mb-3">
                        HEADQUARTERS
                      </h3>
                      <p className="text-base font-medium text-theme-muted leading-relaxed">
                        123 Sustainability Lane<br />
                        Green City, CA 94016<br />
                        United States
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-theme-secondary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-[var(--foreground)] mb-3">
                        BUSINESS HOURS
                      </h3>
                      <div className="text-base font-medium text-theme-muted space-y-2">
                        <p><span className="font-bold">Monday - Friday:</span> 9:00 AM - 6:00 PM EST</p>
                        <p><span className="font-bold">Saturday:</span> 10:00 AM - 4:00 PM EST</p>
                        <p><span className="font-bold">Sunday:</span> Closed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Leaf className="w-16 h-16 mx-auto opacity-90" />
            <h2 className="text-4xl font-black">JOIN OUR COMMUNITY</h2>
            <p className="text-xl font-semibold opacity-90">
              Connect with thousands of changemakers building a sustainable future
            </p>
            <Button size="lg" className="text-lg px-10 py-6 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-xl">
              JOIN NOW →
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
