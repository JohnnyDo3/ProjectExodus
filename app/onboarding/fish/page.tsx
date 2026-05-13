'use client'

/**
 * Step 1 of post-signup onboarding: customize the user's fishbowl
 * fish. Reuses the existing FishCustomizer modal — its onSave hits the
 * fish-customize API, then we route to step 2. Closing the modal (the
 * X button) and the bottom "Skip this step" link both route to step 2.
 */

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { FishCustomizer } from '@/components/fishbowl/FishCustomizer'
import type { FishCustomization } from '@/components/fishbowl/FishSpecies'

export default function FishOnboardingPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  // Guard against unauthenticated access — onboarding is only for
  // freshly-signed-up users.
  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/auth/signin?callbackUrl=/onboarding/fish')
  }, [status, router])

  const saveAndContinue = async (customization: FishCustomization) => {
    try {
      // The customize endpoint expects the fields flat — not wrapped
      // in { customization: ... }.
      const res = await fetch('/api/fishbowl/personal/customize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customization),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Couldn\'t save your fish.')
      }
    } catch (err) {
      // Save failed, but we still let the user continue — they can
      // edit their fish later from settings.
      console.error('Fish save failed during onboarding:', err)
    }
    router.push('/onboarding/profile')
  }

  const skipToNext = () => router.push('/onboarding/profile')

  if (status === 'loading' || !session?.user?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A1628]">
        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      <FishCustomizer
        stockScore={0}
        currentCustomization={null}
        onSave={saveAndContinue}
        onClose={skipToNext}
      />
      {/* Skip-this-step link floats at the bottom of the screen above
          the modal so it's always reachable. z-[400] beats the modal's
          z-[300]. */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[400]">
        <button
          onClick={skipToNext}
          className="px-4 py-2 rounded-full bg-black/60 backdrop-blur text-white/80 hover:text-white text-xs font-bold uppercase tracking-wider border border-white/20 hover:border-white/40 transition-colors"
        >
          Skip this step →
        </button>
      </div>
    </>
  )
}
