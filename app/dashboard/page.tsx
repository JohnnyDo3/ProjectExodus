'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  User,
  Mail,
  Calendar,
  Settings,
  Heart,
  MessageCircle,
  ShoppingBag,
  BookOpen,
  TrendingUp,
  Award,
  Leaf,
  Users,
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const user = session.user

  const stats = [
    {
      icon: ShoppingBag,
      label: 'Orders',
      value: '0',
      color: 'primary',
    },
    {
      icon: Heart,
      label: 'Saved Items',
      value: '0',
      color: 'accent',
    },
    {
      icon: MessageCircle,
      label: 'Forum Posts',
      value: '0',
      color: 'secondary',
    },
    {
      icon: BookOpen,
      label: 'Articles Read',
      value: '0',
      color: 'primary',
    },
  ]

  const quickActions = [
    {
      icon: ShoppingBag,
      title: 'Browse Products',
      description: 'Discover sustainable products',
      href: '/products',
      color: 'primary',
    },
    {
      icon: BookOpen,
      title: 'Learn',
      description: 'Read sustainability articles',
      href: '/learn',
      color: 'accent',
    },
    {
      icon: Users,
      title: 'Join Community',
      description: 'Connect with others',
      href: '/community',
      color: 'secondary',
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Manage your account',
      href: '/settings',
      color: 'primary',
    },
  ]

  const achievementBadges = [
    {
      icon: '🌱',
      name: 'Early Adopter',
      description: 'Joined the community',
    },
    {
      icon: '💚',
      name: 'Eco Warrior',
      description: 'First sustainable purchase',
      locked: true,
    },
    {
      icon: '📚',
      name: 'Knowledge Seeker',
      description: 'Read 5 articles',
      locked: true,
    },
    {
      icon: '🤝',
      name: 'Community Builder',
      description: 'First forum post',
      locked: true,
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Profile Card */}
              <Card className="border-4 border-theme-primary shadow-xl md:w-1/3">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {user?.image ? (
                      <img
                        src={user.image}
                        alt={user.name || 'User'}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-[var(--primary-foreground)]" />
                    )}
                  </div>
                  <h1 className="text-2xl font-black mb-2 text-[var(--foreground)]">
                    {user?.name || 'User'}
                  </h1>
                  <p className="text-sm font-medium text-theme-muted mb-4 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user?.email}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm font-medium text-theme-muted mb-6">
                    <Calendar className="w-4 h-4" />
                    <span>Member since {new Date().getFullYear()}</span>
                  </div>
                  <Link href="/settings">
                    <Button className="w-full font-bold">
                      <Settings className="w-4 h-4 mr-2" />
                      EDIT PROFILE
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Welcome Message */}
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-4xl font-black mb-4 text-[var(--foreground)]">
                    Welcome back, {user?.name?.split(' ')[0] || 'friend'}!
                  </h2>
                  <p className="text-lg font-semibold text-theme-muted">
                    Ready to continue your sustainability journey?
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, i) => (
                    <Card key={i} className="border-2 border-[var(--border)]">
                      <CardContent className="p-4 text-center">
                        <div className={`w-10 h-10 rounded-full bg-[color-mix(in_srgb,var(--${stat.color})_20%,var(--background))] flex items-center justify-center mx-auto mb-2`}>
                          <stat.icon className={`w-5 h-5 text-theme-${stat.color}`} />
                        </div>
                        <p className="text-2xl font-black text-[var(--foreground)]">{stat.value}</p>
                        <p className="text-xs font-bold text-theme-muted uppercase">{stat.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Quick Actions */}
            <div>
              <h3 className="text-3xl font-black mb-6 text-[var(--foreground)]">QUICK ACTIONS</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, i) => (
                  <Link key={i} href={action.href}>
                    <Card className="border-4 border-theme-primary hover:border-theme-accent transition-all transform hover:scale-105 h-full">
                      <CardContent className="p-6 text-center">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-[var(--${action.color})] to-[var(--accent)] flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                          <action.icon className="w-7 h-7 text-[var(--primary-foreground)]" />
                        </div>
                        <h4 className="text-lg font-black mb-2 text-[var(--foreground)]">
                          {action.title}
                        </h4>
                        <p className="text-sm font-medium text-theme-muted">
                          {action.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-3xl font-black mb-6 text-[var(--foreground)]">YOUR BADGES</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievementBadges.map((badge, i) => (
                  <Card key={i} className={`border-2 ${badge.locked ? 'border-[var(--border)] opacity-60' : 'border-theme-accent'}`}>
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{badge.icon}</div>
                      <h4 className="text-base font-black mb-2 text-[var(--foreground)]">
                        {badge.name}
                      </h4>
                      <p className="text-xs font-medium text-theme-muted">
                        {badge.description}
                      </p>
                      {badge.locked && (
                        <p className="text-xs font-bold text-theme-secondary mt-2">🔒 LOCKED</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Activity & Impact */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <Card className="border-4 border-theme-primary">
                <CardHeader>
                  <CardTitle className="text-2xl font-black flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-theme-primary" />
                    RECENT ACTIVITY
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 text-theme-muted mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-bold text-theme-muted">No recent activity</p>
                    <p className="text-sm font-medium text-theme-muted mt-2">
                      Start exploring to see your activity here
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Environmental Impact */}
              <Card className="border-4 border-theme-accent bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_10%,var(--card))] to-[var(--card)]">
                <CardHeader>
                  <CardTitle className="text-2xl font-black flex items-center gap-2">
                    <Leaf className="w-6 h-6 text-theme-accent" />
                    YOUR IMPACT
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[var(--background)] rounded-lg">
                      <div>
                        <p className="text-sm font-bold text-theme-muted">CO₂ Saved</p>
                        <p className="text-2xl font-black text-[var(--foreground)]">0 kg</p>
                      </div>
                      <div className="text-4xl">🌍</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[var(--background)] rounded-lg">
                      <div>
                        <p className="text-sm font-bold text-theme-muted">Waste Reduced</p>
                        <p className="text-2xl font-black text-[var(--foreground)]">0 lbs</p>
                      </div>
                      <div className="text-4xl">♻️</div>
                    </div>
                    <div className="p-4 bg-[var(--background)] rounded-lg text-center">
                      <p className="text-sm font-medium text-theme-muted">
                        Make your first sustainable purchase to start tracking your impact!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Leaf className="w-16 h-16 mx-auto" />
            <h2 className="text-4xl font-black">CONTINUE YOUR JOURNEY</h2>
            <p className="text-xl font-semibold opacity-90">
              Every sustainable choice makes a difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/products">
                <Button size="lg" className="text-lg px-10 py-6 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-xl">
                  SHOP PRODUCTS
                </Button>
              </Link>
              <Link href="/community">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black">
                  JOIN COMMUNITY
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
