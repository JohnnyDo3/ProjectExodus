'use client'

/**
 * Final step of post-signup onboarding: a small congrats / welcome
 * page. Just a moment of "you're in" — no quest, no tour, just a
 * friendly handoff before the user lands on the home page.
 */

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function WelcomeOnboardingPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const firstName = session?.user?.name?.split(/\s+/)[0]

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/auth/signin')
  }, [status, router])

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Sparkle */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] mb-6 shadow-2xl">
          <Sparkles className="w-10 h-10 text-[var(--primary-foreground)]" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-[var(--foreground)] mb-3">
          Welcome{firstName ? `, ${firstName}` : ''}!
        </h1>
        <p className="text-lg text-theme-muted mb-8 leading-relaxed">
          You&apos;re officially part of Project Exodus. Explore the
          community, read or publish articles, dive into projects —
          have a look around.
        </p>

        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-theme-primary text-black font-black text-base hover:opacity-90 shadow-lg"
        >
          Take me in
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-xs text-theme-muted mt-6">
          You can update your fish design and digital ID any time from{' '}
          <a href="/settings" className="underline hover:text-theme-foreground">Settings</a>.
        </p>
      </div>
    </div>
  )
}
