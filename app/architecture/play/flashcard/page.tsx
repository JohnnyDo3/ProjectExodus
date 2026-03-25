'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { FlashcardGame } from '@/components/architecture/FlashcardGame'
import type { LearningLevel } from '@/data/architecture/types'

function FlashcardGameWrapper() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Parse query params
  const count = parseInt(searchParams.get('count') || '10')
  const path = searchParams.get('path') as 'random' | 'timeline' | 'category' || 'random'
  const category = searchParams.get('category') || undefined
  const level = (searchParams.get('level') || 'MIDDLE_SCHOOL') as LearningLevel
  const ghostMode = searchParams.get('mode') === 'ghost'

  const config = {
    elementCount: Math.min(Math.max(count, 5), 50), // Clamp between 5-50
    learningLevel: level,
    enableGhost: true,
    shuffleMode: path,
    category,
  }

  const handleExit = () => {
    router.push('/architecture/play')
  }

  const handleComplete = (results: any) => {
    // Could save results to database here
  }

  return (
    <div className="h-full">
      <FlashcardGame
        config={config}
        onExit={handleExit}
        onComplete={handleComplete}
        showConfig={!searchParams.get('count')} // Show config if no parameters provided
      />
    </div>
  )
}

export default function FlashcardPlayPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--muted-foreground)]">Loading game...</p>
        </div>
      </div>
    }>
      <FlashcardGameWrapper />
    </Suspense>
  )
}
