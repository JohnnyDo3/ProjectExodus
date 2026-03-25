import { notFound } from 'next/navigation'
import { getTopic, CoreTopic } from '@/data/modules'
import { LearningLevel, LEARNING_LEVELS } from '@/types/learning'
import TopicPageClient from './TopicPageClient'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ level?: string }>
}

export default async function TopicPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { level } = await searchParams

  // Server-side: fetch topic data (stays on server, not in client bundle)
  const topic = getTopic(slug as CoreTopic)

  if (!topic) {
    notFound()
  }

  // Determine initial level from URL params
  const levelParam = level?.toUpperCase() as LearningLevel | undefined
  const initialLevel: LearningLevel = levelParam && LEARNING_LEVELS[levelParam] ? levelParam : 'HIGH_SCHOOL'

  return (
    <TopicPageClient
      topic={topic}
      initialLevel={initialLevel}
    />
  )
}
