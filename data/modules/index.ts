// Central Module Data Index
// This file exports all module definitions organized by topic

import { LearningLevel } from '@/types/learning'

// Re-export LearningLevel for use in module files
export type { LearningLevel }

// Module Types
export interface ModuleLesson {
  id: string
  title: string
  order: number
  content: Record<LearningLevel, string> // HTML content per level
  duration: number // minutes
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
  timeLimit?: number // seconds per round
  difficultyByLevel: Record<LearningLevel, 'easy' | 'medium' | 'hard' | 'expert'>
}

export interface ModuleActivity {
  id: string
  type: 'DRAG_DROP' | 'SIMULATION' | 'PUZZLE' | 'SCENARIO' | 'STEP_GUIDED' | 'TIMED_CHALLENGE'
  title: Record<LearningLevel, string>
  description: Record<LearningLevel, string>
  config: Record<LearningLevel, unknown>
}

export interface Module {
  id: string
  slug: string
  title: string
  description: Record<LearningLevel, string>
  topic: CoreTopic
  category: string
  icon: string // lucide icon name
  color: 'moss' | 'ocean' | 'terra'
  duration: Record<LearningLevel, number> // total minutes by level
  isMasterclass: boolean
  hasVideo?: boolean // For future Masterclass videos
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

export type CoreTopic =
  | 'renewable-energy'
  | 'water-systems'
  | 'regenerative-agriculture'
  | 'zero-waste'
  | 'green-building'
  | 'food-sovereignty'

export interface TopicDefinition {
  id: CoreTopic
  title: string
  description: string
  icon: string
  color: 'moss' | 'ocean' | 'terra'
  modules: Module[]
}

// Import all topic modules
import { renewableEnergyModules } from './renewable-energy'
import { waterSystemsModules } from './water-systems'
import { regenerativeAgricultureModules } from './regenerative-agriculture'
import { zeroWasteModules } from './zero-waste'
import { greenBuildingModules } from './green-building'
import { foodSovereigntyModules } from './food-sovereignty'

// Topic Definitions
export const TOPICS: TopicDefinition[] = [
  {
    id: 'renewable-energy',
    title: 'RENEWABLE ENERGY',
    description: 'Solar, wind, and clean energy systems for homes and communities',
    icon: 'Zap',
    color: 'moss',
    modules: renewableEnergyModules
  },
  {
    id: 'water-systems',
    title: 'WATER SYSTEMS',
    description: 'Conservation, harvesting, and sustainable water management',
    icon: 'Droplet',
    color: 'ocean',
    modules: waterSystemsModules
  },
  {
    id: 'regenerative-agriculture',
    title: 'REGENERATIVE AGRICULTURE',
    description: 'Farming practices that restore ecosystems and sequester carbon',
    icon: 'Sprout',
    color: 'terra',
    modules: regenerativeAgricultureModules
  },
  {
    id: 'zero-waste',
    title: 'ZERO WASTE LIVING',
    description: 'Practical strategies to minimize waste and live lighter',
    icon: 'Recycle',
    color: 'moss',
    modules: zeroWasteModules
  },
  {
    id: 'green-building',
    title: 'GREEN BUILDING',
    description: 'Sustainable architecture, materials, and energy-efficient design',
    icon: 'Home',
    color: 'ocean',
    modules: greenBuildingModules
  },
  {
    id: 'food-sovereignty',
    title: 'FOOD SOVEREIGNTY',
    description: 'Local food systems, gardening, and community nutrition',
    icon: 'Leaf',
    color: 'terra',
    modules: foodSovereigntyModules
  }
]

// Helper function to get topic by slug
export function getTopic(slug: CoreTopic): TopicDefinition | undefined {
  return TOPICS.find(t => t.id === slug)
}

// Helper function to get module by slug
export function getModule(topicSlug: CoreTopic, moduleSlug: string): Module | undefined {
  const topic = getTopic(topicSlug)
  return topic?.modules.find(m => m.slug === moduleSlug)
}

// Helper function to get all modules across all topics
export function getAllModules(): Module[] {
  return TOPICS.flatMap(t => t.modules)
}

// Helper function to get module content for specific level
export function getModuleContentForLevel(module: Module, level: LearningLevel) {
  return {
    ...module,
    description: module.description[level],
    duration: module.duration[level],
    lessons: module.lessons.map(lesson => ({
      ...lesson,
      content: lesson.content[level]
    })),
    activities: module.activities.map(activity => ({
      ...activity,
      title: activity.title[level],
      description: activity.description[level],
      config: activity.config[level]
    })),
    quiz: {
      ...module.quiz,
      questions: module.quiz.questions.map(q => ({
        ...q,
        question: q.question[level],
        options: q.options[level],
        explanation: q.explanation[level]
      }))
    }
  }
}
