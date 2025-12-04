'use client'

import { use, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Redirect old /messages/[userId] URLs to /messages?user=[userId]
export default function ConversationRedirectPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params)
  const router = useRouter()

  useEffect(() => {
    // Redirect to the main messages page with user pre-selected
    router.replace(`/messages?user=${userId}`)
  }, [userId, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-lg font-bold text-theme-muted">Redirecting to messages...</p>
      </div>
    </div>
  )
}
