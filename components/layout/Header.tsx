'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Menu, X, Leaf } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Learn', href: '/learn' },
    { name: 'Community', href: '/community' },
    { name: 'About', href: '/about' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-earth-800 border-b-4 border-moss-500 dark:border-moss-600 shadow-sm transition-colors">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-moss-600 to-ocean-600 flex items-center justify-center pulse-alive shadow-lg">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-black text-earth-900 dark:text-sand-100 group-hover:text-moss-700 dark:group-hover:text-moss-400 transition-colors tracking-tight">
              PROJECT EXODUS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-bold text-base transition-all uppercase tracking-wide relative ${
                    isActive
                      ? 'text-moss-600 dark:text-moss-400'
                      : 'text-earth-900 dark:text-sand-200 hover:text-moss-600 dark:hover:text-moss-400'
                  }`}
                  style={{
                    borderBottom: isActive ? '3px solid currentColor' : 'none',
                    paddingBottom: '4px'
                  }}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link href="/auth/signin">
              <Button variant="outline" size="sm" className="font-bold border-2">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="font-bold shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-lg hover:bg-sand-200 dark:hover:bg-earth-700 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-earth-900 dark:text-sand-100" />
              ) : (
                <Menu className="w-6 h-6 text-earth-900 dark:text-sand-100" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-sand-300 dark:border-earth-700">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block py-2 font-medium transition-colors ${
                    isActive
                      ? 'text-moss-600 dark:text-moss-400'
                      : 'text-earth-700 dark:text-sand-200 hover:text-moss-600 dark:hover:text-moss-400'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
            <div className="pt-4 space-y-2 border-t border-sand-300 dark:border-earth-700">
              <div className="flex justify-center mb-2">
                <ThemeToggle />
              </div>
              <Link href="/auth/signin" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
