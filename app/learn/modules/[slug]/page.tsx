'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { InteractiveTextbook } from '@/components/learning/InteractiveTextbook'
import { getAllModules, getModuleContentForLevel, Module } from '@/data/modules'
import { LearningLevel, LEARNING_LEVELS } from '@/types/learning'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Loader2 } from 'lucide-react'

export default function ModulePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string

  // Get level from URL params or default to HIGH_SCHOOL
  const levelParam = searchParams.get('level')?.toUpperCase() as LearningLevel | undefined
  const topicParam = searchParams.get('topic')

  const [module, setModule] = useState<Module | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel>(
    levelParam && LEARNING_LEVELS[levelParam] ? levelParam : 'HIGH_SCHOOL'
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

  return (
    <InteractiveTextbook
      module={module}
      levelContent={levelContent}
      selectedLevel={selectedLevel}
      onLevelChange={setSelectedLevel}
      topicSlug={topicParam || module.topic}
    />
  )
}
