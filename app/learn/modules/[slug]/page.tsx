import { notFound } from 'next/navigation'
import { getAllModules } from '@/data/modules'
import { LearningLevel, LEARNING_LEVELS } from '@/types/learning'
import ModulePageClient from './ModulePageClient'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ level?: string; topic?: string; view?: string }>
}

export default async function ModulePage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { level, topic, view } = await searchParams

  // Server-side: find the module (data stays on server, not shipped to client)
  const allModules = getAllModules()
  const module = allModules.find(m => m.slug === slug)

  if (!module) {
    notFound()
  }

  // Determine initial level from URL params
  const levelParam = level?.toUpperCase() as LearningLevel | undefined
  const initialLevel: LearningLevel = levelParam && LEARNING_LEVELS[levelParam] ? levelParam : 'HIGH_SCHOOL'
  const initialView = view === 'classic' ? 'classic' as const : 'canvas' as const

  // Pass only the needed module data to the client component
  return (
    <ModulePageClient
      module={module}
      initialLevel={initialLevel}
      initialView={initialView}
      topicSlug={topic || null}
    />
  )
}
