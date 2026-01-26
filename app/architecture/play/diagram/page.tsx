'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { DiagramBuilderGame } from '@/components/architecture/DiagramBuilderGame'
import type { LearningLevel } from '@/data/architecture/types'

function DiagramGameWrapper() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Parse query params
  const structure = searchParams.get('structure') || undefined
  const level = (searchParams.get('level') || 'MIDDLE_SCHOOL') as LearningLevel
  const mode = searchParams.get('mode') as 'click' | 'drag' || 'click'

  const config = {
    structureId: structure,
    learningLevel: level,
    interactionMode: mode,
  }

  const handleExit = () => {
    router.push('/architecture/play')
  }

  const handleComplete = (results: any) => {
    console.log('Diagram completed:', results)
  }

  return (
    <div className="h-full">
      <DiagramBuilderGame
        config={config}
        onExit={handleExit}
        onComplete={handleComplete}
        showConfig={!searchParams.get('structure')}
      />
    </div>
  )
}

export default function DiagramPlayPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--muted-foreground)]">Loading diagram...</p>
        </div>
      </div>
    }>
      <DiagramGameWrapper />
    </Suspense>
  )
}
