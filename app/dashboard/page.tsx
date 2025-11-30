'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to My Basecamp
    router.replace('/my/basecamp')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-lg font-bold text-theme-muted">Redirecting to your Base Camp...</p>
      </div>
    </div>
  )
}
