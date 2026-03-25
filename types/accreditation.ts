// ============================================
// ACCREDITATION & COURSE STRUCTURE TYPES
// ACE Credit Recommendation Standards
// University-Level Instructional Design
// ============================================

import { LearningLevel } from './learning'

// ============================================
// COURSE-LEVEL TYPES
// ============================================

export type AccreditationLevel = 'UNDERGRADUATE' | 'GRADUATE'

export type BloomsTaxonomyVerb =
  | 'analyze'
  | 'evaluate'
  | 'apply'
  | 'synthesize'
  | 'create'
  | 'compare'
  | 'critique'
  | 'design'
  | 'formulate'
  | 'integrate'
  | 'assess'
  | 'construct'
  | 'justify'
  | 'propose'
  | 'examine'

export interface LearningObjective {
  id: string
  verb: BloomsTaxonomyVerb
  text: string
  // Maps to which course module(s) this objective is assessed in
  assessedInModules: string[]
  bloomsLevel: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create'
}

export interface CourseModule {
  id: string
  title: string
  weekNumber: number
  keyConcepts: string[]
  academicExplanation: string // Expanded academic-depth explanation
  realWorldApplication: string
  requiredReadings?: string[]
  supplementalReadings?: string[]
}

export interface ReflectionPrompt {
  id: string
  moduleId: string
  prompt: string
  expectedDepth: 'paragraph' | 'essay' | 'research-brief'
  rubricCriteria: string[]
}

export interface ScenarioQuestion {
  id: string
  moduleId: string
  scenario: string
  question: string
  evaluationCriteria: string[]
  sampleResponse?: string
}

export interface MiniProject {
  id: string
  moduleId: string
  title: string
  description: string
  deliverables: string[]
  estimatedHours: number
  rubricCriteria: string[]
}

// ============================================
// ASSESSMENT TYPES
// ============================================

export interface AssessmentQuestion {
  id: string
  type: 'multiple_choice' | 'short_answer' | 'essay' | 'case_study' | 'calculation'
  question: string
  // For multiple choice
  options?: string[]
  correctIndex?: number
  // For all types
  explanation: string
  bloomsLevel: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create'
  points: number
}

export interface MidtermAssessment {
  id: string
  title: string
  description: string
  coversModules: string[] // Module IDs covered
  timeLimit: number // minutes
  totalPoints: number
  passingScore: number // percentage
  questions: AssessmentQuestion[]
  instructions: string[]
}

export interface FinalAssessment {
  id: string
  title: string
  description: string
  timeLimit: number // minutes
  totalPoints: number
  passingScore: number // percentage
  // Part 1: Comprehensive exam
  examQuestions: AssessmentQuestion[]
  // Part 2: Final project
  finalProject: {
    title: string
    description: string
    requirements: string[]
    deliverables: string[]
    rubric: {
      criterion: string
      weight: number // percentage
      levels: {
        excellent: string
        proficient: string
        developing: string
        beginning: string
      }
    }[]
    estimatedHours: number
  }
  instructions: string[]
}

// ============================================
// ACADEMIC GAPS & SME RECOMMENDATIONS
// ============================================

export interface AcademicGap {
  id: string
  area: string
  description: string
  severity: 'minor' | 'moderate' | 'significant'
  recommendation: string
  smeNeeded: boolean
  smeSpecialty?: string
}

// ============================================
// CREDIT EQUIVALENCY
// ============================================

export interface CreditEquivalency {
  totalLearningHours: number
  contactHours: number // Direct instruction equivalent
  independentStudyHours: number
  creditRecommendation: number // 1-3 credits
  justification: string
  carnegiUnitAlignment: string
  comparableCourses: string[] // e.g., "SUST 301 at Arizona State University"
}

// ============================================
// ACCREDITATION READINESS
// ============================================

export interface AccreditationReadiness {
  identityVerification: {
    currentCapability: string
    recommendations: string[]
  }
  proctoredExams: {
    currentCapability: string
    recommendations: string[]
  }
  regularSubstantiveInteraction: {
    currentCapability: string
    recommendations: string[]
  }
  accessibilityCompliance: {
    currentCapability: string
    recommendations: string[]
  }
}

// ============================================
// FULL COURSE ACCREDITATION PACKAGE
// ============================================

export interface CourseAccreditation {
  // Identification
  courseId: string
  topicSlug: string
  level: AccreditationLevel
  prerequisiteLevel?: AccreditationLevel // For graduate courses

  // Course Catalog Entry
  courseTitle: string
  courseCode: string // e.g., "SUST 301" or "SUST 501"
  courseDescription: string // 150-250 words, catalog style

  // Learning Objectives (6-8, measurable verbs)
  learningObjectives: LearningObjective[]

  // Course Structure (4-6 modules)
  courseModules: CourseModule[]

  // Active Learning Integration
  reflectionPrompts: ReflectionPrompt[]
  scenarioQuestions: ScenarioQuestion[]
  miniProjects: MiniProject[]

  // Assessment System
  midterm: MidtermAssessment
  final: FinalAssessment

  // Academic Analysis
  academicGaps: AcademicGap[]

  // Credit & Accreditation
  creditEquivalency: CreditEquivalency
  accreditationReadiness: AccreditationReadiness

  // Metadata
  version: string
  lastUpdated: string
  designedBy: string
}
