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
              <div className="w-24 h-9 bg-sand-200 dark:bg-earth-700 rounded-lg animate-pulse" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-moss-50 dark:bg-earth-700 hover:bg-moss-100 dark:hover:bg-earth-600 transition-colors border-2 border-moss-500 dark:border-moss-600"
                >
                  <div className="w-8 h-8 rounded-full bg-moss-600 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-earth-900 dark:text-sand-100">
                    {session.user?.name || session.user?.email}
                  </span>
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-earth-800 rounded-xl shadow-xl border-2 border-moss-500 dark:border-moss-600 overflow-hidden z-50">
                      <div className="p-4 border-b-2 border-sand-200 dark:border-earth-700">
                        <p className="font-bold text-earth-900 dark:text-sand-100">
                          {session.user?.name}
                        </p>
                        <p className="text-sm text-earth-600 dark:text-sand-300 truncate">
                          {session.user?.email}
                        </p>
                      </div>
                      <div className="p-2">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-moss-50 dark:hover:bg-earth-700 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 text-earth-700 dark:text-sand-300" />
                          <span className="font-medium text-earth-900 dark:text-sand-100">Dashboard</span>
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-terra-50 dark:hover:bg-earth-700 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4 text-terra-600 dark:text-terra-400" />
                          <span className="font-medium text-terra-700 dark:text-terra-400">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
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
              {status === 'loading' ? (
                <div className="w-full h-9 bg-sand-200 dark:bg-earth-700 rounded-lg animate-pulse" />
              ) : session ? (
                <div className="space-y-2">
                  <div className="px-4 py-3 rounded-lg bg-moss-50 dark:bg-earth-700 border-2 border-moss-500 dark:border-moss-600">
                    <p className="font-bold text-earth-900 dark:text-sand-100">
                      {session.user?.name}
                    </p>
                    <p className="text-sm text-earth-600 dark:text-sand-300 truncate">
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
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
