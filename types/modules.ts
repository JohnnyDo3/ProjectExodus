// Module types - extracted from data/modules/index.ts for client-safe imports
// Import this file in client components instead of @/data/modules to avoid
// pulling 16K+ lines of module content into the client bundle.

import { LearningLevel } from '@/types/learning'

export type { LearningLevel }

export interface Classroom {
  id: string
  name: string
  description: string
  icon: string
  order: number
}

export interface ModuleLesson {
  id: string
  title: string
  order: number
  content: Record<LearningLevel, string>
  duration: number
  hasActivity?: boolean
  activityType?: 'DRAG_DROP' | 'SIMULATION' | 'PUZZLE' | 'SCENARIO' | 'STEP_GUIDED' | 'TIMED_CHALLENGE'
}

export interface ModuleQuizQuestion {
  id: string
  question: Record<LearningLevel, string>
  options: Record<LearningLevel, string[]>
  correctIndex: number
  explanation: Record<LearningLevel, string>
}

export interface ModuleGame {
  id: string
  type: 'matching' | 'sorting' | 'timed_challenge' | 'simulation' | 'puzzle'
  title: string
  description: string
  rounds: number
  timeLimit?: number
  difficultyByLevel: Record<LearningLevel, 'easy' | 'medium' | 'hard' | 'expert'>
}

export interface ModuleActivity {
  id: string
  type: 'DRAG_DROP' | 'SIMULATION' | 'PUZZLE' | 'SCENARIO' | 'STEP_GUIDED' | 'TIMED_CHALLENGE'
  title: Record<LearningLevel, string>
  description: Record<LearningLevel, string>
  config: Record<LearningLevel, unknown>
}

export type CoreTopic =
  | 'renewable-energy'
  | 'water-systems'
  | 'regenerative-agriculture'
  | 'zero-waste'
  | 'green-building'
  | 'food-sovereignty'

export interface Module {
  id: string
  slug: string
  title: string
  description: Record<LearningLevel, string>
  topic: CoreTopic
  category: string
  classroom?: string
  icon: string
  color: 'moss' | 'ocean' | 'terra'
  duration: Record<LearningLevel, number>
  isMasterclass: boolean
  hasVideo?: boolean
  lessons: ModuleLesson[]
  activities: ModuleActivity[]
  game: ModuleGame
  quiz: {
    id: string
    passingScore: number
    questions: ModuleQuizQuestion[]
  }
  externalResources: {
    title: string
    url: string
    type: 'article' | 'video' | 'tool' | 'research'
  }[]
}

export interface TopicDefinition {
  id: CoreTopic
  title: string
  description: string
  icon: string
  color: 'moss' | 'ocean' | 'terra'
  modules: Module[]
}

// Default classrooms - small static config, safe for client bundle
export const DEFAULT_CLASSROOMS: Classroom[] = [
  { id: 'fundamentals', name: 'Fundamentals', description: 'Core concepts and basic principles', icon: 'BookOpen', order: 1 },
  { id: 'practical-skills', name: 'Practical Skills', description: 'Hands-on techniques and how-to guides', icon: 'Wrench', order: 2 },
  { id: 'deep-dive', name: 'Deep Dive', description: 'Advanced theory and scientific understanding', icon: 'Microscope', order: 3 },
  { id: 'real-world', name: 'Real World', description: 'Case studies and real-world applications', icon: 'Globe', order: 4 },
  { id: 'projects', name: 'Projects', description: 'Hands-on projects and activities', icon: 'Hammer', order: 5 },
]
