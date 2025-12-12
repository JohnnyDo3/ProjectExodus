'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LearningCanvas } from '@/components/learning/LearningCanvas'
import { InteractiveTextbook } from '@/components/learning/InteractiveTextbook'
import { getAllModules, getModuleContentForLevel, Module } from '@/data/modules'
import { LearningLevel, LEARNING_LEVELS } from '@/types/learning'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Loader2, LayoutGrid, BookOpen } from 'lucide-react'

export default function ModulePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string

  // Get level from URL params or default to HIGH_SCHOOL
  const levelParam = searchParams.get('level')?.toUpperCase() as LearningLevel | undefined
  const topicParam = searchParams.get('topic')
  const viewParam = searchParams.get('view') // 'canvas' or 'classic'

  const [module, setModule] = useState<Module | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel>(
    levelParam && LEARNING_LEVELS[levelParam] ? levelParam : 'HIGH_SCHOOL'
  )
  // Default to canvas (revolutionary) view, allow classic view via URL param
  const [viewMode, setViewMode] = useState<'canvas' | 'classic'>(
    viewParam === 'classic' ? 'classic' : 'canvas'
  )

  useEffect(() => {
    // Find the module by slug
    const allModules = getAllModules()
    const foundModule = allModules.find(m => m.slug === slug)

    if (foundModule) {
      setModule(foundModule)
    }
    setLoading(false)
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-theme-primary mx-auto mb-4" />
          <p className="text-theme-muted font-bold">Loading module...</p>
        </div>
      </div>
    )
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4 text-[var(--foreground)]">Module Not Found</h1>
          <p className="text-theme-muted mb-6">The module you're looking for doesn't exist.</p>
          <Link href="/learn">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Learn
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Get content adapted for the selected level
  const levelContent = getModuleContentForLevel(module, selectedLevel)

  // Use the revolutionary LearningCanvas by default
  if (viewMode === 'canvas') {
    return (
      <>
        {/* View Toggle - small button in corner */}
        <button
          onClick={() => setViewMode('classic')}
          className="fixed top-20 right-4 z-50 flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg text-xs font-medium text-gray-600 hover:bg-white transition-colors"
          title="Switch to classic view"
        >
          <BookOpen className="w-4 h-4" />
          Classic View
        </button>
        <LearningCanvas
          module={module}
          levelContent={levelContent}
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
          topicSlug={topicParam || module.topic}
        />
      </>
    )
  }

  // Classic InteractiveTextbook view
  return (
    <>
      {/* View Toggle - small button in corner */}
      <button
        onClick={() => setViewMode('canvas')}
        className="fixed top-20 right-4 z-50 flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg text-xs font-medium text-gray-600 hover:bg-white transition-colors"
        title="Switch to discovery board"
      >
        <LayoutGrid className="w-4 h-4" />
        Discovery Board
      </button>
      <InteractiveTextbook
        module={module}
        levelContent={levelContent}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        topicSlug={topicParam || module.topic}
      />
    </>
  )
}
