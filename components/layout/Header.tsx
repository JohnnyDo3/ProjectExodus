'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Menu, X, Leaf, User, LogOut, Settings, Users, Calendar, LayoutDashboard, ChevronRight, MessageCircle, Bell, ChevronDown, Lock, Crown, GraduationCap } from 'lucide-react'
import NotificationBell from '@/components/notifications/NotificationBell'
import { useDigitalScrollContext } from '@/components/learning/DigitalScroll/DigitalScrollContext'
import { useSageContextSafe } from '@/components/ai/SageContext'

interface LeaderboardUser {
  userId: string
  name: string | null
  image: string | null
  points: number
  rank: number
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [communityMenuOpen, setCommunityMenuOpen] = useState(false)
  const [learnMenuOpen, setLearnMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [topUsers, setTopUsers] = useState<LeaderboardUser[]>([])
  const lastScrollY = useRef(0)
  const communityHoverTimeout = useRef<NodeJS.Timeout | null>(null)
  const learnHoverTimeout = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const { isScrollOpen } = useDigitalScrollContext()
  const sageContext = useSageContextSafe()

  // Fetch top users for dropdown
  useEffect(() => {
    async function fetchTopUsers() {
      try {
        const res = await fetch('/api/gamification/leaderboard?type=all-time&limit=10')
        const data = await res.json()
        if (data.success && data.data?.leaderboard) {
          setTopUsers(data.data.leaderboard)
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
      }
    }
    fetchTopUsers()
  }, [])

  // Community dropdown hover handlers
  const handleCommunityMouseEnter = () => {
    if (communityHoverTimeout.current) {
      clearTimeout(communityHoverTimeout.current)
      communityHoverTimeout.current = null
    }
    setCommunityMenuOpen(true)
  }

  const handleCommunityMouseLeave = () => {
    communityHoverTimeout.current = setTimeout(() => {
      setCommunityMenuOpen(false)
    }, 150) // Small delay to prevent accidental closing
  }

  // Learn dropdown hover handlers
  const handleLearnMouseEnter = () => {
    if (learnHoverTimeout.current) {
      clearTimeout(learnHoverTimeout.current)
      learnHoverTimeout.current = null
    }
    setLearnMenuOpen(true)
  }

  const handleLearnMouseLeave = () => {
    learnHoverTimeout.current = setTimeout(() => {
      setLearnMenuOpen(false)
    }, 150)
  }

  // Cleanup hover timeout on unmount
  useEffect(() => {
    return () => {
      if (communityHoverTimeout.current) {
        clearTimeout(communityHoverTimeout.current)
      }
      if (learnHoverTimeout.current) {
        clearTimeout(learnHoverTimeout.current)
      }
    }
  }, [])

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setCommunityMenuOpen(false)
    setLearnMenuOpen(false)
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

  // Auto-hide header when Digital Scroll is open, show on scroll up
  useEffect(() => {
    if (!isScrollOpen) {
      // Scroll is closed - show header immediately
      setIsHeaderVisible(true)
      return
    }

    // Scroll is open - hide header immediately
    setIsHeaderVisible(false)

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show header when scrolling up
      if (currentScrollY < lastScrollY.current && currentScrollY > 50) {
        setIsHeaderVisible(true)
      } else if (currentScrollY > lastScrollY.current) {
        // Hide when scrolling down
        setIsHeaderVisible(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrollOpen])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Learn', href: '/learn' },
    { name: 'Articles', href: '/articles' },
    { name: 'Community', href: '/community' },
  ]

  const learnMenuItems = [
    { label: 'Exodology', href: '/exodology', requiresAuth: true },
    { label: 'Architecture', href: '/architecture', requiresAuth: true },
    { label: 'Structural Engineering', href: '/architecture/structural', requiresAuth: true },
  ]

  const communityMenuItems = [
    { label: 'Discussions', href: '/community/feed', myLabel: 'Discussions' },
    { label: 'Projects', href: '/community/projects', myLabel: 'Projects' },
    { label: 'Network', href: '/network', myLabel: 'Network' },
  ]

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <header
      className="sticky top-0 z-[100] bg-[var(--card)] border-b-4 border-theme-primary shadow-sm transition-all duration-300 safe-area-top"
      style={{
        // When mobile menu is open OR Sage is napping/animating, disable transform to prevent breaking positioning
        transform: (mobileMenuOpen || sageContext?.isNapping || sageContext?.isAnimating) ? 'none' : (isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)'),
        opacity: (mobileMenuOpen || sageContext?.isNapping || sageContext?.isAnimating) ? 1 : (isHeaderVisible ? 1 : 0),
      }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Icon separated from text for Sage nap integration */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Sage's home - the leaf icon */}
            <div
              ref={sageContext?.headerLogoRef}
              onClick={sageContext?.isNapping && !sageContext?.isAnimating ? sageContext.wakeUp : undefined}
              className={`group relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-moss-600 to-ocean-600 flex items-center justify-center shadow-lg transition-all overflow-visible ${
                sageContext?.isNapping && !sageContext?.isAnimating
                  ? 'cursor-pointer sage-sleeping sage-wake-indicator hover:scale-110'
                  : 'pulse-alive'
              }`}
              style={{
                // Ensure stable positioning for animation target
                willChange: sageContext?.isAnimating ? 'transform' : 'auto',
                isolation: 'isolate',
              }}
            >
              <Leaf className="w-5 h-5 sm:w-7 sm:h-7 text-white" />

              {/* Zzz animation when Sage is napping (not during animation) */}
              {sageContext?.isNapping && !sageContext?.isAnimating && (
                <>
                  {/* Stable container for zzz elements to prevent jitter */}
                  <div className="absolute inset-0 pointer-events-none" style={{ willChange: 'transform' }}>
                    <span className="sage-zzz sage-zzz-1">z</span>
                    <span className="sage-zzz sage-zzz-2">z</span>
                    <span className="sage-zzz sage-zzz-3">z</span>
                  </div>

                  {/* Hover tooltip - "Click to wake" - positioned below with arrow pointing up */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 pointer-events-none z-[200] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {/* Arrow pointing up */}
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[var(--card)] border-l border-t border-[var(--primary)]" />
                    {/* Tooltip body */}
                    <div className="relative px-3 py-1.5 bg-[var(--card)] border border-[var(--primary)] rounded-lg shadow-lg min-w-max">
                      <span className="text-xs font-medium text-[var(--foreground)] whitespace-nowrap">Click to wake</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* PROJECT EXODUS text - links to home */}
            <Link href="/" className="group">
              <span className="text-base sm:text-2xl font-black text-[var(--foreground)] group-hover:text-theme-primary transition-colors tracking-tight">
                PROJECT EXODUS
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href ||
                (item.name === 'Community' && pathname.startsWith('/community')) ||
                (item.name === 'Learn' && (pathname.startsWith('/learn') || pathname.startsWith('/exodology')))

              // Learn gets a hover dropdown with Exodology for logged-in users
              if (item.name === 'Learn') {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={handleLearnMouseEnter}
                    onMouseLeave={handleLearnMouseLeave}
                  >
                    <Link
                      href="/learn"
                      className={`font-bold text-sm xl:text-base transition-all uppercase tracking-wide flex items-center gap-1 ${
                        isActive || learnMenuOpen
                          ? 'text-theme-primary'
                          : 'text-[var(--foreground)] hover:text-theme-primary'
                      }`}
                      style={{
                        borderBottom: isActive ? '3px solid currentColor' : 'none',
                        paddingBottom: '4px'
                      }}
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${learnMenuOpen ? 'rotate-180' : ''}`} />
                    </Link>

                    {/* Learn Dropdown menu - centered, matching Community dropdown */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[200px] rounded-xl overflow-hidden z-[201] transition-all duration-200 origin-top ${
                        learnMenuOpen
                          ? 'opacity-100 scale-100 translate-y-0'
                          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="bg-[var(--card)]/95 backdrop-blur-xl border-2 border-theme-primary shadow-2xl rounded-xl overflow-hidden">
                        {/* Decorative top gradient bar */}
                        <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

                        {/* Navigation links */}
                        <div className="p-2">
                          {learnMenuItems.map((menuItem) => {
                            const isLocked = menuItem.requiresAuth && !session
                            const isIndented = 'indent' in menuItem && menuItem.indent

                            return isLocked ? (
                              <div
                                key={menuItem.label}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[var(--muted-foreground)] opacity-60 cursor-not-allowed ${isIndented ? 'ml-4 text-xs' : 'justify-center'}`}
                                title="Sign in to access"
                              >
                                <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                                <span className={`font-medium whitespace-nowrap ${isIndented ? 'text-xs' : 'text-sm'}`}>{menuItem.label}</span>
                              </div>
                            ) : (
                              <Link
                                key={menuItem.label}
                                href={menuItem.href}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-[var(--foreground)] hover:bg-[var(--muted)]/50 hover:text-emerald-600 transition-colors whitespace-nowrap ${isIndented ? 'ml-4 text-xs' : 'justify-center text-sm'}`}
                                onClick={() => setLearnMenuOpen(false)}
                              >
                                {isIndented && <span className="text-muted-foreground">→</span>}
                                <span>{menuItem.label}</span>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              // Community gets a hover dropdown - click navigates to page
              if (item.name === 'Community') {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={handleCommunityMouseEnter}
                    onMouseLeave={handleCommunityMouseLeave}
                  >
                    <Link
                      href="/community"
                      className={`font-bold text-sm xl:text-base transition-all uppercase tracking-wide flex items-center gap-1 ${
                        isActive || communityMenuOpen
                          ? 'text-theme-primary'
                          : 'text-[var(--foreground)] hover:text-theme-primary'
                      }`}
                      style={{
                        borderBottom: isActive ? '3px solid currentColor' : 'none',
                        paddingBottom: '4px'
                      }}
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${communityMenuOpen ? 'rotate-180' : ''}`} />
                    </Link>

                    {/* Dropdown menu - centered */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl overflow-hidden z-[201] transition-all duration-200 origin-top ${
                        communityMenuOpen
                          ? 'opacity-100 scale-100 translate-y-0'
                          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="bg-[var(--card)]/95 backdrop-blur-xl border-2 border-theme-primary shadow-2xl rounded-xl overflow-hidden">
                        {/* Decorative top gradient bar */}
                        <div className="h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)]" />

                        {/* Navigation links - centered */}
                        <div className="p-2">
                          {communityMenuItems.map((menuItem) => {
                            const isLocked = !session

                            return isLocked ? (
                              <div
                                key={menuItem.label}
                                className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[var(--muted-foreground)] opacity-60 cursor-not-allowed"
                              >
                                <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                                <span className="text-sm font-medium">{menuItem.label}</span>
                              </div>
                            ) : (
                              <Link
                                key={menuItem.label}
                                href={menuItem.href}
                                className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)]/50 hover:text-[var(--primary)] transition-colors"
                                onClick={() => setCommunityMenuOpen(false)}
                              >
                                <span>{menuItem.myLabel}</span>
                              </Link>
                            )
                          })}
                        </div>

                        {/* Top 10 Users Section */}
                        {topUsers.length > 0 && (
                          <>
                            <div className="border-t border-[var(--border)]/50" />
                            <div className="p-2">
                              <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">
                                <Crown className="w-3 h-3 text-amber-500" />
                                Top Members
                              </div>
                              <div className="space-y-0.5">
                                {topUsers.slice(0, 10).map((user) => (
                                  <Link
                                    key={user.userId}
                                    href={`/profile/${user.userId}`}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[var(--muted)]/50 transition-colors group"
                                    onClick={() => setCommunityMenuOpen(false)}
                                  >
                                    <span className={`w-5 text-xs font-bold ${user.rank <= 3 ? 'text-amber-500' : 'text-[var(--muted-foreground)]'}`}>
                                      #{user.rank}
                                    </span>
                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                                      {user.image ? (
                                        <img src={user.image} alt="" className="w-full h-full rounded-full object-cover" />
                                      ) : (
                                        <span className="text-[10px] font-bold text-white">
                                          {user.name?.[0]?.toUpperCase() || '?'}
                                        </span>
                                      )}
                                    </div>
                                    <span className="flex-1 text-xs font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] truncate">
                                      {user.name?.split(' ')[0] || 'Anon'}
                                    </span>
                                    <span className="text-[10px] text-[var(--muted-foreground)]">
                                      {user.points.toLocaleString()}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )
              }

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
            {session && (
              <Link
                href="/messages"
                className="relative p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                title="Messages"
              >
                <MessageCircle className="w-5 h-5 text-[var(--foreground)]" />
              </Link>
            )}
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
                          href="/events"
                          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors group"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Calendar className="w-4 h-4 text-theme-secondary" />
                          <span className="font-bold text-[var(--foreground)] group-hover:text-theme-secondary">My Events</span>
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
                  className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 px-3 py-1.5 text-sm border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--muted)] bg-transparent"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 px-3 py-1.5 text-sm bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-sm hover:shadow-md"
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
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[101]"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-in Menu */}
          <div className="lg:hidden fixed top-16 sm:top-20 left-0 right-0 bottom-0 bg-[var(--card)] z-[102] overflow-y-auto safe-area-inset">
            <div className="container mx-auto px-4 py-6 space-y-6">
              {/* Navigation Links */}
              <div className="space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href ||
                    (item.name === 'Community' && pathname.startsWith('/community')) ||
                    (item.name === 'Learn' && (pathname.startsWith('/learn') || pathname.startsWith('/exodology')))
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

              {/* Learn Quick Links - Exodology */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide px-2">Learning</p>
                <div className="flex flex-col gap-2">
                  {learnMenuItems.map((menuItem) => {
                    const isLocked = menuItem.requiresAuth && !session
                    const isIndented = 'indent' in menuItem && menuItem.indent

                    if (isLocked) {
                      return (
                        <div
                          key={menuItem.label}
                          className={`flex items-center gap-2 py-3 px-6 rounded-xl bg-[var(--muted)]/50 opacity-60 ${isIndented ? 'ml-6' : 'justify-center'}`}
                        >
                          <Lock className="w-4 h-4 flex-shrink-0 text-[var(--muted-foreground)]" />
                          <span className={`font-semibold text-[var(--muted-foreground)] ${isIndented ? 'text-xs' : 'text-sm'}`}>{menuItem.label}</span>
                        </div>
                      )
                    }

                    return (
                      <Link
                        key={menuItem.label}
                        href={menuItem.href}
                        className={`flex items-center gap-2 py-3 px-6 rounded-xl bg-[var(--muted)] hover:bg-theme-primary/10 transition-colors ${isIndented ? 'ml-6' : 'justify-center'}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <GraduationCap className={`text-[var(--foreground)] ${isIndented ? 'w-3 h-3' : 'w-4 h-4'}`} />
                        <span className={`font-semibold text-[var(--foreground)] ${isIndented ? 'text-xs' : 'text-sm'}`}>{menuItem.label}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Community Quick Links */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide px-2">Community Features</p>
                <div className="grid grid-cols-3 gap-2">
                  {communityMenuItems.map((menuItem) => {
                    const isLocked = !session // All items locked for non-users

                    if (isLocked) {
                      return (
                        <div
                          key={menuItem.label}
                          className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-[var(--muted)]/50 opacity-60"
                        >
                          <Lock className="w-3 h-3 flex-shrink-0 text-[var(--muted-foreground)]" />
                          <span className="text-xs font-medium text-[var(--muted-foreground)]">{menuItem.label}</span>
                        </div>
                      )
                    }

                    return (
                      <Link
                        key={menuItem.label}
                        href={menuItem.href}
                        className="flex items-center justify-center py-3 px-2 rounded-xl bg-[var(--muted)] hover:bg-theme-primary/10 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="text-xs font-medium text-[var(--foreground)]">{menuItem.myLabel}</span>
                      </Link>
                    )
                  })}
                </div>
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
