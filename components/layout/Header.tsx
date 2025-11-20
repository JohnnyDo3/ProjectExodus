'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Menu, X, Leaf, User, LogOut, Settings } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Learn', href: '/learn' },
    { name: 'Community', href: '/community' },
    { name: 'About', href: '/about' },
  ]

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <header className="sticky top-0 z-50 bg-[var(--card)] border-b-4 border-theme-primary shadow-sm transition-colors">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-moss-600 to-ocean-600 flex items-center justify-center pulse-alive shadow-lg">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-black text-[var(--foreground)] group-hover:text-theme-primary transition-colors tracking-tight">
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
                      ? 'text-theme-primary'
                      : 'text-[var(--foreground)] hover:text-theme-primary'
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

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {status === 'loading' ? (
              <div className="w-24 h-9 bg-[var(--muted)] rounded-lg animate-pulse" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[var(--muted)] hover:bg-theme-primary hover:text-[var(--primary-foreground)] transition-colors border-2 border-theme-primary"
                >
                  <div className="w-8 h-8 rounded-full bg-theme-primary flex items-center justify-center">
                    <User className="w-5 h-5 text-[var(--primary-foreground)]" />
                  </div>
                  <span className="font-bold">
                    {session.user?.name || session.user?.email}
                  </span>
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-[var(--card)] rounded-xl shadow-theme-lg border-2 border-theme-primary overflow-hidden z-50">
                      <div className="p-4 border-b-2 border-[var(--border)]">
                        <p className="font-bold text-[var(--foreground)]">
                          {session.user?.name}
                        </p>
                        <p className="text-sm text-theme-muted truncate">
                          {session.user?.email}
                        </p>
                      </div>
                      <div className="p-2">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 text-theme-muted" />
                          <span className="font-medium text-[var(--foreground)]">Dashboard</span>
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4 text-theme-secondary" />
                          <span className="font-medium text-theme-secondary">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center justify-center rounded-lg font-bold transition-all duration-200 border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--muted)] bg-transparent px-3 py-1.5 text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-lg font-bold transition-all duration-200 bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 shadow-lg px-3 py-1.5 text-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[var(--foreground)]" />
              ) : (
                <Menu className="w-6 h-6 text-[var(--foreground)]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-[var(--border)]">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block py-2 font-medium transition-colors ${
                    isActive
                      ? 'text-theme-primary'
                      : 'text-[var(--foreground)] hover:text-theme-primary'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
            <div className="pt-4 space-y-2 border-t border-[var(--border)]">
              <div className="flex justify-center mb-2">
                <ThemeToggle />
              </div>
              {status === 'loading' ? (
                <div className="w-full h-9 bg-[var(--muted)] rounded-lg animate-pulse" />
              ) : session ? (
                <div className="space-y-2">
                  <div className="px-4 py-3 rounded-lg bg-[var(--muted)] border-2 border-theme-primary">
                    <p className="font-bold text-[var(--foreground)]">
                      {session.user?.name}
                    </p>
                    <p className="text-sm text-theme-muted truncate">
                      {session.user?.email}
                    </p>
                  </div>
                  <Link href="/dashboard" className="block" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleSignOut()
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center rounded-lg font-bold transition-all duration-200 border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--muted)] bg-transparent px-3 py-1.5 text-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center rounded-lg font-bold transition-all duration-200 bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 shadow-lg px-3 py-1.5 text-sm"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
