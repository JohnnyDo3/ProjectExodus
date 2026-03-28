// Central Module Data Index
// This file exports all module definitions organized by topic

import { LearningLevel } from '@/types/learning'

// Re-export LearningLevel for use in module files
export type { LearningLevel }

// Classroom/Category types for organizing lessons within topics
export interface Classroom {
  id: string
  name: string
  description: string
  icon: string // lucide icon name
  order: number
}

// Default classrooms available across topics
export const DEFAULT_CLASSROOMS: Classroom[] = [
  { id: 'fundamentals', name: 'Fundamentals', description: 'Core concepts and basic principles', icon: 'BookOpen', order: 1 },
  { id: 'practical-skills', name: 'Practical Skills', description: 'Hands-on techniques and how-to guides', icon: 'Wrench', order: 2 },
  { id: 'deep-dive', name: 'Deep Dive', description: 'Advanced theory and scientific understanding', icon: 'Microscope', order: 3 },
  { id: 'real-world', name: 'Real World', description: 'Case studies and real-world applications', icon: 'Globe', order: 4 },
  { id: 'projects', name: 'Projects', description: 'Hands-on projects and activities', icon: 'Hammer', order: 5 },
]

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

// ACE Credit Recommendation Accreditation Metadata
export interface AccreditationMetadata {
  courseTitle: string // Formal academic course title
  courseDescription: string // 150-250 word university catalog description
  learningObjectives: string[] // 6-8 measurable objectives using Bloom's taxonomy verbs
  creditHours: number // ACE recommended credit hours (1-3)
  totalLearningHours: number // Contact + independent study hours (15-45)
  prerequisites: string[] // Required prior knowledge
  assessmentFramework: {
    formativeAssessments: string[] // Ongoing checks (reflection prompts, scenario questions)
    summativeAssessments: string[] // Final evaluations (exams, projects)
    passingThreshold: number // Minimum score for credit (typically 70-80%)
    proctoringRequirement: string // Identity verification / proctoring notes
  }
  finalProject: {
    title: string
    description: string
    deliverables: string[]
    rubricCriteria: string[]
  }
  accreditationNotes: {
    aceReadiness: string // How this meets ACE standards
    identityVerification: string // How learner identity is verified
    regularSubstantiveInteraction: string // RSI plan for instructor interaction
    smeRecommendations: string[] // Where subject matter experts are needed
  }
  academicLevel: 'lower-division' | 'upper-division' | 'graduate'
  discipline: string // e.g., "Environmental Science", "Sustainability Studies"
  institutionalPartner?: string // e.g., "Golisano Institute for Sustainability, RIT"
}

export interface Module {
  id: string
  slug: string
  title: string
  description: Record<LearningLevel, string>
  topic: CoreTopic
  category: string
  classroom?: string // Classroom ID for categorization within topic (defaults to 'fundamentals')
  icon: string // lucide icon name
  color: 'moss' | 'ocean' | 'terra'
  duration: Record<LearningLevel, number> // total minutes by level
  isMasterclass: boolean
  hasVideo?: boolean // For future Masterclass videos
  accreditation?: AccreditationMetadata // ACE credit recommendation metadata
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

// Course-level accreditation for an entire topic (encompasses all modules)
export interface CourseAccreditation {
  courseTitle: string
  catalogDescription: string // 150-250 word formal description
  totalCreditHours: number // Total ACE recommended credits for full course
  totalLearningHours: number // Sum across all modules
  learningOutcomes: string[] // 6-8 program-level outcomes
  courseStructure: string // How modules map to a semester
  finalExam: {
    description: string
    format: string // e.g., "proctored, timed, 2-hour comprehensive exam"
    weight: string // e.g., "30% of final grade"
  }
  capstoneProject: {
    title: string
    description: string
    deliverables: string[]
    weight: string
  }
  gradingScale: { letter: string; range: string; description: string }[]
  aceJustification: string // Why this meets college-level standards
  institutionalPartner?: string
}

export interface TopicDefinition {
  id: CoreTopic
  title: string
  description: string
  icon: string
  color: 'moss' | 'ocean' | 'terra'
  modules: Module[]
  courseAccreditation?: CourseAccreditation
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
    modules: renewableEnergyModules,
    courseAccreditation: {
      courseTitle: 'Renewable Energy Systems: Technology, Policy, and Integration',
      catalogDescription: 'A comprehensive examination of renewable energy technologies, grid integration strategies, and the socioeconomic forces driving the global energy transition. Students analyze photovoltaic and concentrated solar systems, onshore and offshore wind engineering, hydropower modernization, geothermal resource development, and advanced energy storage architectures. The course emphasizes quantitative analysis of system performance metrics including levelized cost of energy (LCOE), capacity factors, and grid reliability contributions. Students evaluate policy frameworks such as renewable portfolio standards, carbon pricing mechanisms, and federal tax incentives that shape deployment trajectories. Through applied projects, learners design renewable energy systems for real-world scenarios, conduct resource assessments, and model grid integration challenges at high penetration levels. The course integrates environmental justice perspectives, examining equitable access to clean energy and community ownership models. Designed for learners seeking professional competency in sustainable energy systems with pathways to industry certification and graduate study.',
      totalCreditHours: 3,
      totalLearningHours: 45,
      learningOutcomes: [
        'Analyze the physics, engineering principles, and performance characteristics of solar, wind, hydro, geothermal, and storage technologies',
        'Evaluate the economic viability of renewable energy projects using LCOE, net present value, and internal rate of return methodologies',
        'Apply quantitative methods to conduct site-specific renewable energy resource assessments',
        'Synthesize grid integration challenges and solutions for high-penetration renewable energy scenarios',
        'Assess the environmental, social, and equity dimensions of energy transition policies',
        'Design a renewable energy system proposal incorporating technical, economic, and regulatory constraints',
        'Critically evaluate emerging technologies and their potential to disrupt current energy paradigms',
        'Communicate technical findings through professional reports and data-driven presentations'
      ],
      courseStructure: 'The course is organized into 6 thematic units delivered over 15 weeks. Unit 1: Solar Energy Systems (Weeks 1-3). Unit 2: Wind Energy Engineering (Weeks 4-6). Unit 3: Hydropower and Geothermal Systems (Weeks 7-9). Unit 4: Energy Storage and Grid Integration (Weeks 10-11). Unit 5: Policy, Markets, and Energy Justice (Weeks 12-13). Unit 6: Capstone Project and Comprehensive Assessment (Weeks 14-15). Each unit includes asynchronous lessons, interactive simulations, reflection exercises, and a summative module assessment.',
      finalExam: {
        description: 'Comprehensive proctored examination covering all course units. Includes multiple-choice, short-answer, and case-study analysis sections testing conceptual understanding, quantitative problem-solving, and critical evaluation of real-world scenarios.',
        format: 'Proctored, timed, 2-hour comprehensive exam with 60 multiple-choice questions and 4 extended-response problems',
        weight: '25% of final grade'
      },
      capstoneProject: {
        title: 'Community Renewable Energy Transition Plan',
        description: 'Students develop a comprehensive renewable energy transition plan for a real or simulated community. The project integrates resource assessment, technology selection, system sizing, economic analysis, grid integration planning, and equity considerations into a professional-quality deliverable.',
        deliverables: [
          'Executive summary (500 words) suitable for municipal decision-makers',
          'Technical resource assessment with site-specific solar, wind, or hybrid analysis',
          'System design with equipment specifications, layout, and performance projections',
          'Financial pro forma including LCOE, payback period, NPV, and sensitivity analysis',
          'Grid integration plan addressing interconnection, variability, and storage needs',
          'Environmental and social impact assessment with community engagement strategy',
          'Professional presentation (15 minutes) with data visualizations'
        ],
        weight: '30% of final grade'
      },
      gradingScale: [
        { letter: 'A', range: '90-100%', description: 'Demonstrates mastery of renewable energy concepts with exceptional analytical depth' },
        { letter: 'B', range: '80-89%', description: 'Shows strong understanding with competent application of technical and analytical skills' },
        { letter: 'C', range: '70-79%', description: 'Meets minimum competency standards for credit recommendation' },
        { letter: 'D', range: '60-69%', description: 'Below credit recommendation threshold; partial understanding demonstrated' },
        { letter: 'F', range: 'Below 60%', description: 'Does not meet minimum standards for course completion' }
      ],
      aceJustification: 'This course meets ACE credit recommendation standards through: (1) college-level content depth equivalent to an upper-division undergraduate course in environmental science or engineering; (2) measurable learning outcomes aligned with Bloom\'s taxonomy at the analyze, evaluate, and create levels; (3) rigorous assessment including proctored examinations, applied projects, and reflective writing; (4) total learning hours (45) consistent with a 3-credit semester course; (5) content developed with reference to peer-reviewed sources and industry standards from NREL, IEA, IRENA, and IEEE; (6) interactive simulations and applied activities that develop professional competencies.',
      institutionalPartner: 'Golisano Institute for Sustainability, Rochester Institute of Technology'
    }
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

// Helper function to get modules by classroom within a topic
export function getModulesByClassroom(topicSlug: CoreTopic): Record<string, Module[]> {
  const topic = getTopic(topicSlug)
  if (!topic) return {}

  const grouped: Record<string, Module[]> = {}

  topic.modules.forEach(module => {
    const classroomId = module.classroom || 'fundamentals'
    if (!grouped[classroomId]) {
      grouped[classroomId] = []
    }
    grouped[classroomId].push(module)
  })

  return grouped
}

// Helper function to get classrooms that have modules in a topic
export function getTopicClassrooms(topicSlug: CoreTopic): Classroom[] {
  const modulesByClassroom = getModulesByClassroom(topicSlug)
  const classroomIds = Object.keys(modulesByClassroom)

  return DEFAULT_CLASSROOMS
    .filter(c => classroomIds.includes(c.id))
    .sort((a, b) => a.order - b.order)
}

// Helper function to get a specific classroom
export function getClassroom(classroomId: string): Classroom | undefined {
  return DEFAULT_CLASSROOMS.find(c => c.id === classroomId)
}
