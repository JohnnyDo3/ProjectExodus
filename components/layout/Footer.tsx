'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Send, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ProgressiveSkyline } from '@/components/decorative/ProgressiveSkyline'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source: 'footer' }),
      })

      const data = await res.json()

      if (data.success) {
        setSubscribed(true)
        setEmail('')
        setMessage(data.message)
        setTimeout(() => {
          setSubscribed(false)
          setMessage('')
        }, 5000)
      } else {
        setMessage(data.error || 'Failed to subscribe')
        setTimeout(() => setMessage(''), 5000)
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
      setTimeout(() => setMessage(''), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const footerSections = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Mission', href: '/about#mission' },
      { name: 'Team', href: '/about#team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
    ],
    products: [
      { name: 'Browse Products', href: '/products' },
      { name: 'Categories', href: '/products#categories' },
      { name: 'Vendors', href: '/vendors' },
      { name: 'New Arrivals', href: '/products?filter=new' },
      { name: 'Best Sellers', href: '/products?filter=popular' },
    ],
    resources: [
      { name: 'Learn Hub', href: '/learn' },
      { name: 'Sustainability Guide', href: '/learn/guide' },
      { name: 'Community Forum', href: '/community/forum' },
      { name: 'Projects', href: '/community/projects' },
      { name: 'Blog', href: '/learn#articles' },
    ],
    support: [
      { name: 'Help Center', href: '/support' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/projectexodus' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/projectexodus' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/projectexodus' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/projectexodus' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@projectexodus' },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
  ]

  return (
    <footer className="bg-[var(--card)] text-[var(--card-foreground)] border-t-8 border-theme-primary">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section - Newsletter & Social */}
        <div className="mb-16 pb-12 border-b border-[var(--border)]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Newsletter Signup */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-8 h-8 text-theme-primary" />
                <h3 className="text-3xl font-black tracking-tight">
                  STAY IN THE LOOP
                </h3>
              </div>
              <p className="text-theme-muted text-lg mb-6 font-medium">
                Get the latest sustainable products, tips, and community updates delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3 max-w-lg">
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-4 rounded-xl bg-[var(--muted)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors text-base font-medium disabled:opacity-50"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
                  >
                    {subscribed ? '✓ Subscribed!' : isSubmitting ? 'Subscribing...' : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Subscribe
                      </>
                    )}
                  </Button>
                </div>
                {message && (
                  <p className={`text-sm font-bold ${subscribed ? 'text-theme-accent' : 'text-theme-secondary'}`}>
                    {message}
                  </p>
                )}
              </form>
            </div>

            {/* Social Links */}
            <div className="lg:text-right">
              <h3 className="text-2xl font-black mb-6 tracking-tight">
                CONNECT WITH US
              </h3>
              <div className="flex gap-4 lg:justify-end">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-[var(--muted)] border-2 border-[var(--border)] hover:border-theme-primary hover:bg-theme-primary flex items-center justify-center transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <social.icon className="w-6 h-6 text-[var(--foreground)] group-hover:text-[var(--primary-foreground)] transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-moss-600 to-ocean-600 flex items-center justify-center pulse-alive shadow-lg">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight" style={{
                background: 'linear-gradient(135deg, #9ccba0, #91cdcd)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                PROJECT
                <br />
                EXODUS
              </span>
            </Link>
            <p className="text-theme-muted font-medium leading-relaxed">
              Building sustainable infrastructure for a better tomorrow. Food, Water, Energy.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-black mb-6 text-theme-primary tracking-wide">
              COMPANY
            </h4>
            <ul className="space-y-3">
              {footerSections.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-theme-muted hover:text-theme-primary transition-colors font-medium block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-black mb-6 text-theme-primary tracking-wide">
              PRODUCTS
            </h4>
            <ul className="space-y-3">
              {footerSections.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-theme-muted hover:text-theme-primary transition-colors font-medium block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-black mb-6 text-theme-primary tracking-wide">
              RESOURCES
            </h4>
            <ul className="space-y-3">
              {footerSections.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-theme-muted hover:text-theme-primary transition-colors font-medium block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-black mb-6 text-theme-primary tracking-wide">
              SUPPORT
            </h4>
            <ul className="space-y-3">
              {footerSections.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-theme-muted hover:text-theme-primary transition-colors font-medium block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-theme-muted font-bold tracking-wide text-center md:text-left">
              © 2025 PROJECT EXODUS • IN COLLABORATION WITH SAGE AND MR. NOBODY
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-theme-muted hover:text-theme-primary transition-colors font-semibold text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progressive Skyline - Rural to Sustainable City */}
      <ProgressiveSkyline />
    </footer>
  )
}
