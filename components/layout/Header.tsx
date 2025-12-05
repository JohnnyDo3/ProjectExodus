'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Menu, X, Leaf, User, LogOut, Settings, Users, Calendar, LayoutDashboard, ChevronRight, MessageCircle, Bell } from 'lucide-react'
import NotificationBell from '@/components/notifications/NotificationBell'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Learn', href: '/learn' },
    { name: 'Articles', href: '/articles' },
    { name: 'Community', href: '/community' },
  ]

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <header className="sticky top-0 z-[100] bg-[var(--card)] border-b-4 border-theme-primary shadow-sm transition-colors safe-area-top">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-moss-600 to-ocean-600 flex items-center justify-center pulse-alive shadow-lg">
              <Leaf className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
            <span className="text-base sm:text-2xl font-black text-[var(--foreground)] group-hover:text-theme-primary transition-colors tracking-tight">
              PROJECT EXODUS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-bold text-sm xl:text-base transition-all uppercase tracking-wide relative ${
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

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <ThemeToggle />
            {session && <NotificationBell />}
            {status === 'loading' ? (
              <div className="w-24 h-9 bg-[var(--muted)] rounded-lg animate-pulse" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2 rounded-lg bg-[var(--muted)] hover:bg-theme-primary hover:text-[var(--primary-foreground)] transition-colors border-2 border-theme-primary"
                >
                  <div className="w-7 h-7 xl:w-8 xl:h-8 rounded-full bg-theme-primary flex items-center justify-center">
                    <User className="w-4 h-4 xl:w-5 xl:h-5 text-[var(--primary-foreground)]" />
                  </div>
                  <span className="font-bold text-sm xl:text-base max-w-[120px] truncate">
                    {session.user?.name || session.user?.email}
                  </span>
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[200]"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-[var(--card)] rounded-xl shadow-theme-lg border-2 border-theme-primary overflow-hidden z-[201]">
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
                          href="/my/volition"
                          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors group"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4 text-theme-primary" />
                          <span className="font-bold text-[var(--foreground)] group-hover:text-theme-primary">My Volition</span>
                        </Link>
                        <Link
                          href="/network"
                          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors group"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Users className="w-4 h-4 text-theme-accent" />
                          <span className="font-bold text-[var(--foreground)] group-hover:text-theme-accent">My Network</span>
                        </Link>
                        <Link
                          href="/events"
                          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors group"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Calendar className="w-4 h-4 text-theme-secondary" />
                          <span className="font-bold text-[var(--foreground)] group-hover:text-theme-secondary">My Events</span>
                        </Link>
                        <Link
                          href="/messages"
                          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors group"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <MessageCircle className="w-4 h-4 text-theme-primary" />
                          <span className="font-bold text-[var(--foreground)] group-hover:text-theme-primary">Messages</span>
                        </Link>
                        <div className="border-t-2 border-[var(--border)] mt-2 pt-2">
                          <Link
                            href="/settings"
                            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors group"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Settings className="w-4 h-4 text-theme-muted" />
                            <span className="font-medium text-[var(--foreground)]">Settings</span>
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors text-left group"
                          >
                            <LogOut className="w-4 h-4 text-theme-secondary" />
                            <span className="font-medium text-theme-secondary">Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center justify-center rounded-lg font-bold transition-all duration-200 border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--muted)] bg-transparent px-3 py-1.5 text-sm no-min-size"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-lg font-bold transition-all duration-200 bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 shadow-lg px-3 py-1.5 text-sm no-min-size"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[var(--foreground)]" />
              ) : (
                <Menu className="w-6 h-6 text-[var(--foreground)]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[98]"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-in Menu */}
          <div className="lg:hidden fixed top-16 sm:top-20 left-0 right-0 bottom-0 bg-[var(--card)] z-[99] overflow-y-auto safe-area-inset">
            <div className="container mx-auto px-4 py-6 space-y-6">
              {/* Navigation Links */}
              <div className="space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center justify-between py-4 px-4 rounded-xl font-bold text-lg transition-all ${
                        isActive
                          ? 'bg-theme-primary text-[var(--primary-foreground)]'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-theme-primary/10'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  )
                })}
              </div>

              {/* Divider */}
              <div className="border-t-2 border-[var(--border)]" />

              {/* Auth Section */}
              {status === 'loading' ? (
                <div className="w-full h-12 bg-[var(--muted)] rounded-xl animate-pulse" />
              ) : session ? (
                <div className="space-y-3">
                  {/* User Info */}
                  <div className="px-4 py-4 rounded-xl bg-[var(--muted)] border-2 border-theme-primary">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-theme-primary flex items-center justify-center">
                        <User className="w-6 h-6 text-[var(--primary-foreground)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[var(--foreground)] truncate">
                          {session.user?.name}
                        </p>
                        <p className="text-sm text-theme-muted truncate">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* User Menu Links */}
                  <Link href="/my/volition" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-[var(--muted)] hover:bg-theme-primary/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <LayoutDashboard className="w-5 h-5 text-theme-primary" />
                        <span className="font-bold text-[var(--foreground)]">My Volition</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-theme-muted" />
                    </div>
                  </Link>
                  <Link href="/network" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-[var(--muted)] hover:bg-theme-primary/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-theme-accent" />
                        <span className="font-bold text-[var(--foreground)]">My Network</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-theme-muted" />
                    </div>
                  </Link>
                  <Link href="/events" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-[var(--muted)] hover:bg-theme-primary/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-theme-secondary" />
                        <span className="font-bold text-[var(--foreground)]">My Events</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-theme-muted" />
                    </div>
                  </Link>
                  <Link href="/messages" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-[var(--muted)] hover:bg-theme-primary/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-5 h-5 text-theme-primary" />
                        <span className="font-bold text-[var(--foreground)]">Messages</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-theme-muted" />
                    </div>
                  </Link>
                  <Link href="/notifications" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-[var(--muted)] hover:bg-theme-primary/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-theme-accent" />
                        <span className="font-bold text-[var(--foreground)]">Notifications</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-theme-muted" />
                    </div>
                  </Link>
                  <Link href="/settings" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-[var(--muted)] hover:bg-theme-primary/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <Settings className="w-5 h-5 text-theme-muted" />
                        <span className="font-bold text-[var(--foreground)]">Settings</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-theme-muted" />
                    </div>
                  </Link>

                  {/* Sign Out */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleSignOut()
                    }}
                    className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-theme-secondary text-[var(--secondary-foreground)] font-bold"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/auth/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center py-4 px-4 rounded-xl font-bold border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--muted)] transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center py-4 px-4 rounded-xl font-bold bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  )
}
