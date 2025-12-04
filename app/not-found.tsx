'use client'

import { Button } from '@/components/ui/Button'
import { Leaf, Home, Search, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          {/* Large 404 */}
          <div>
            <div className="relative">
              <h1
                className="text-[12rem] md:text-[20rem] font-black leading-none opacity-20"
                style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-2xl animate-pulse">
                  <Leaf className="w-16 h-16 md:w-20 md:h-20 text-[var(--primary-foreground)]" />
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-black text-[var(--foreground)]">
              PAGE NOT FOUND
            </h2>
            <p className="text-2xl font-semibold max-w-2xl mx-auto text-theme-muted">
              Looks like this page has gone off the grid!{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>
                Let's get you back on track.
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link href="/">
              <Button size="lg" className="text-xl px-12 py-8 rounded-2xl font-black shadow-2xl">
                <Home className="w-6 h-6 mr-3" />
                GO HOME
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="text-xl px-12 py-8 rounded-2xl font-black border-4 shadow-xl">
                <Search className="w-6 h-6 mr-3" />
                BROWSE PRODUCTS
              </Button>
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="pt-12 border-t-4 border-theme-primary">
            <p className="text-lg font-bold mb-6 text-theme-muted">
              POPULAR PAGES
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { name: 'Products', href: '/products' },
                { name: 'Learn', href: '/learn' },
                { name: 'Community', href: '/community' },
                { name: 'About', href: '/about' },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-6 py-4 bg-[var(--card)] border-2 border-theme-primary hover:border-theme-accent rounded-xl text-base font-bold transition-all transform hover:scale-105 shadow-md text-[var(--foreground)]"
                >
                  {link.name.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>

          {/* Back Link */}
          <div className="pt-8">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-lg font-bold text-theme-accent hover:opacity-80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              GO BACK TO PREVIOUS PAGE
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
