'use client'

/**
 * Small dismissible banner shown to signed-in users whose post-signup
 * onboarding looks incomplete (no profile photo / bio, or no fish
 * design). Encourages them to finish without forcing the flow — one
 * click jumps back into /onboarding/fish; dismiss persists per-user
 * in localStorage.
 */

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Sparkles, X } from 'lucide-react'

const STORAGE_PREFIX = 'onboarding-reminder-dismissed-'

export function OnboardingReminderBanner() {
  const { data: session } = useSession()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const userId = session?.user?.id
    if (!userId) return

    // Per-user dismissal: once dismissed, this user won't see it again
    // on this device unless localStorage is cleared.
    try {
      if (localStorage.getItem(`${STORAGE_PREFIX}${userId}`)) return
    } catch { return }

    let cancelled = false
    fetch(`/api/users/${userId}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        if (cancelled) return
        const u = data?.user ?? data?.data ?? data
        if (!u) return
        // Treat onboarding as "incomplete" if either profile or fish
        // is still empty. Image OR bio missing → profile incomplete.
        const profileIncomplete = !u.image && !u.bio
        const fishIncomplete = !u.fishCustomization
        if (profileIncomplete || fishIncomplete) {
          setShow(true)
        }
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [session?.user?.id])

  const dismiss = () => {
    setShow(false)
    const userId = session?.user?.id
    if (userId) {
      try { localStorage.setItem(`${STORAGE_PREFIX}${userId}`, '1') } catch {}
    }
  }

  if (!show) return null

  return (
    <div className="rounded-xl border-2 border-theme-primary bg-gradient-to-r from-[var(--primary)]/10 via-[var(--accent)]/10 to-[var(--primary)]/10 p-4 mb-6">
      <div className="flex items-start gap-3">
        <Sparkles className="w-5 h-5 mt-0.5 shrink-0 text-theme-primary" />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm text-[var(--foreground)]">
            Finish setting up your profile
          </p>
          <p className="text-xs text-theme-muted mt-0.5 leading-relaxed">
            Add your fish design and digital ID so the community can find and recognise you. Takes a minute.
          </p>
          <Link
            href="/onboarding/fish"
            className="inline-flex items-center gap-1 text-xs font-bold text-theme-primary hover:opacity-80 mt-2"
          >
            Continue setup →
          </Link>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="p-1 rounded text-theme-muted hover:text-theme-foreground shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
