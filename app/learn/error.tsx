'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-sm opacity-70">An unexpected error occurred. Please try again.</p>
      <button
        onClick={reset}
        className="rounded-lg px-4 py-2 text-sm font-medium bg-[var(--primary)] text-white hover:opacity-90 transition-opacity"
      >
        Try again
      </button>
    </div>
  )
}
