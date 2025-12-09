// ============================================
// LEARNING SYSTEM TYPES & CONSTANTS
// Multi-level interactive learning with games and discussions
// ============================================

// Learning Levels - 6 educational tiers
export type LearningLevel =
  | 'ELEMENTARY'
  | 'MIDDLE_SCHOOL'
  | 'HIGH_SCHOOL'
  | 'UNDERGRADUATE'
  | 'GRADUATE'
  | 'PHD'

export interface LevelMeta {
  value: LearningLevel
  label: string
  shortLabel: string
  ageRange: string
  description: string
  icon: string
  color: string
  readingAge: number // Approximate reading age
  vocabularyLevel: 'basic' | 'intermediate' | 'standard' | 'technical' | 'specialized' | 'expert'
}

export const LEARNING_LEVELS: Record<LearningLevel, LevelMeta> = {
  ELEMENTARY: {
    value: 'ELEMENTARY',
    label: 'Elementary',
    shortLabel: 'Elem',
    ageRange: '6-10',
    description: 'Simple concepts with fun, engaging activities',
    icon: '🌱',
    color: 'emerald',
    readingAge: 8,
    vocabularyLevel: 'basic'
  },
  MIDDLE_SCHOOL: {
    value: 'MIDDLE_SCHOOL',
    label: 'Middle School',
    shortLabel: 'Middle',
    ageRange: '11-13',
    description: 'Building foundational understanding with real examples',
    icon: '📚',
    color: 'blue',
    readingAge: 12,
    vocabularyLevel: 'intermediate'
  },
  HIGH_SCHOOL: {
    value: 'HIGH_SCHOOL',
    label: 'High School',
    shortLabel: 'High',
    ageRange: '14-17',
    description: 'Comprehensive coverage with practical applications',
    icon: '🎓',
    color: 'purple',
    readingAge: 16,
    vocabularyLevel: 'standard'
  },
  UNDERGRADUATE: {
    value: 'UNDERGRADUATE',
    label: 'Undergraduate',
    shortLabel: 'Undergrad',
    ageRange: '18-22',
    description: 'In-depth analysis and critical thinking',
    icon: '🔬',
    color: 'orange',
    readingAge: 20,
    vocabularyLevel: 'technical'
  },
  GRADUATE: {
    value: 'GRADUATE',
    label: 'Graduate',
    shortLabel: 'Grad',
    ageRange: '22+',
    description: 'Advanced concepts and research methodology',
    icon: '📊',
    color: 'red',
    readingAge: 24,
    vocabularyLevel: 'specialized'
  },
  PHD: {
    value: 'PHD',
    label: 'PhD',
    shortLabel: 'PhD',
    ageRange: 'Expert',
    description: 'Cutting-edge research and synthesis',
    icon: '🧬',
    color: 'amber',
    readingAge: 28,
    vocabularyLevel: 'expert'
  }
}

export const LEARNING_LEVEL_ORDER: LearningLevel[] = [
  'ELEMENTARY',
  'MIDDLE_SCHOOL',
  'HIGH_SCHOOL',
  'UNDERGRADUATE',
  'GRADUATE',
  'PHD'
]

// ============================================
// ACTIVITY TYPES
// ============================================

export type ActivityType =
  | 'DRAG_DROP'
  | 'SIMULATION'
  | 'PUZZLE'
  | 'SCENARIO'
  | 'STEP_GUIDED'
  | 'TIMED_CHALLENGE'

export interface ActivityMeta {
  type: ActivityType
  label: string
  description: string
  icon: string
  supportsMobile: boolean
}

export const ACTIVITY_TYPES: Record<ActivityType, ActivityMeta> = {
  DRAG_DROP: {
    type: 'DRAG_DROP',
    label: 'Drag & Drop',
    description: 'Drag items to their correct locations',
    icon: '🎯',
    supportsMobile: true
  },
  SIMULATION: {
    type: 'SIMULATION',
    label: 'Simulation',
    description: 'Adjust variables and see real-time outcomes',
    icon: '⚙️',
    supportsMobile: true
  },
  PUZZLE: {
    type: 'PUZZLE',
    label: 'Puzzle',
    description: 'Match, sort, or solve word puzzles',
    icon: '🧩',
    supportsMobile: true
  },
  SCENARIO: {
    type: 'SCENARIO',
    label: 'Scenario',
    description: 'Make choices in realistic scenarios',
    icon: '🎭',
    supportsMobile: true
  },
  STEP_GUIDED: {
    type: 'STEP_GUIDED',
    label: 'Step-by-Step',
    description: 'Follow guided steps to complete a task',
    icon: '📋',
    supportsMobile: true
  },
  TIMED_CHALLENGE: {
    type: 'TIMED_CHALLENGE',
    label: 'Timed Challenge',
    description: 'Answer quickly for bonus points',
    icon: '⏱️',
    supportsMobile: true
  }
}

// ============================================
// ACTIVITY CONFIGURATIONS
// ============================================

export interface BaseActivityConfig {
  id: string
  type: ActivityType
  title: string
  instructions: string
  points: number
  required: boolean
}

// Drag & Drop Activity
export interface DragDropItem {
  id: string
  label: string
  image?: string
  category?: string
}

export interface DragDropZone {
  id: string
  label: string
  description?: string
  accepts?: string[] // Categories that can be dropped here
  maxItems?: number
}

export interface DragDropConfig extends BaseActivityConfig {
  type: 'DRAG_DROP'
  config: {
    items: DragDropItem[]
    zones: DragDropZone[]
    correctPlacements: Record<string, string> // itemId -> zoneId
    shuffleItems: boolean
    feedback: {
      correct: string
      incorrect: string
    }
  }
}

// Simulation Activity
export interface SimulationVariable {
  id: string
  name: string
  label: string
  min: number
  max: number
  step: number
  defaultValue: number
  unit?: string
}

export interface SimulationConfig extends BaseActivityConfig {
  type: 'SIMULATION'
  config: {
    scenario: string
    image?: string
    variables: SimulationVariable[]
    formula: string // JavaScript expression using variable names
    targetRange: { min: number; max: number }
    resultLabel: string
    resultUnit?: string
    explanation: string
    hints?: string[]
  }
}

// Puzzle Activity
export type PuzzleType = 'matching' | 'sorting' | 'fill_blank' | 'word_scramble' | 'crossword'

export interface MatchingPair {
  id: string
  left: string
  right: string
}

export interface SortingItem {
  id: string
  label: string
  correctPosition: number
}

export interface FillBlankItem {
  text: string // Use __BLANK__ for blanks
  answers: string[] // Correct answers for each blank
}

export interface WordScrambleItem {
  scrambled: string
  answer: string
  hint?: string
}

export interface PuzzleConfig extends BaseActivityConfig {
  type: 'PUZZLE'
  config: {
    puzzleType: PuzzleType
    timeLimit?: number // seconds
    data: {
      matching?: MatchingPair[]
      sorting?: SortingItem[]
      fillBlanks?: FillBlankItem[]
      wordScramble?: WordScrambleItem[]
    }
  }
}

// Scenario Activity
export interface ScenarioChoice {
  id: string
  text: string
  consequence: string
  points: number
  isOptimal: boolean
  nextScenarioId?: string // For branching scenarios
}

export interface ScenarioConfig extends BaseActivityConfig {
  type: 'SCENARIO'
  config: {
    narrative: string
    image?: string
    choices: ScenarioChoice[]
    allowUndo: boolean
  }
}

// Step-Guided Activity
export interface GuidedStep {
  id: string
  instruction: string
  expectedAction: string
  hint?: string
  image?: string
  validation: {
    type: 'click' | 'input' | 'select' | 'checkbox'
    target?: string
    expectedValue?: string
  }
}

export interface StepGuidedConfig extends BaseActivityConfig {
  type: 'STEP_GUIDED'
  config: {
    steps: GuidedStep[]
    allowSkip: boolean
    showProgress: boolean
  }
}

// Timed Challenge Activity
export interface TimedQuestion {
  id: string
  question: string
  options?: string[]
  correctAnswer: string
  points: number
  explanation?: string
}

export interface TimedChallengeConfig extends BaseActivityConfig {
  type: 'TIMED_CHALLENGE'
  config: {
    questions: TimedQuestion[]
    timePerQuestion: number // seconds
    bonusPointsPerSecond: number
    showTimer: boolean
    allowSkip: boolean
  }
}

export type ActivityConfig =
  | DragDropConfig
  | SimulationConfig
  | PuzzleConfig
  | ScenarioConfig
  | StepGuidedConfig
  | TimedChallengeConfig

// ============================================
// LEARNING GAME TYPES
// ============================================

export type GameQuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'fill_blank'
  | 'matching'
  | 'ordering'
  | 'image_choice'

export interface GameRound {
  id: string
  type: GameQuestionType
  question: string
  media?: {
    type: 'image' | 'video' | 'audio'
    url: string
    alt?: string
  }
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  points: number
  timeLimit?: number // seconds, optional per-question limit
  difficulty: 1 | 2 | 3 | 4 | 5
}

export interface LearningGameConfig {
  id: string
  title: string
  description: string

  // Game mechanics
  totalRounds: number
  livesCount: number
  basePoints: number
  streakMultiplier: number
  timeBonusEnabled: boolean
  timeBonusPointsPerSecond: number

  // Rounds
  rounds: GameRound[]

  // Star thresholds (percentage of max possible score)
  starThresholds: {
    oneStar: number   // e.g., 60
    twoStar: number   // e.g., 80
    threeStar: number // e.g., 95
  }

  // Passing requirement
  passingScore: number // percentage
}

export interface GameState {
  sessionId: string
  currentRound: number
  totalRounds: number
  lives: number
  maxLives: number
  score: number
  streak: number
  maxStreak: number
  timeStarted: number
  answers: GameRoundResult[]
}

export interface GameRoundResult {
  roundId: string
  userAnswer: string | string[]
  isCorrect: boolean
  pointsEarned: number
  timeBonus: number
  timeTaken: number
}

export interface GameResults {
  sessionId: string
  finalScore: number
  maxPossibleScore: number
  percentage: number
  stars: 0 | 1 | 2 | 3
  passed: boolean
  correctAnswers: number
  totalRounds: number
  longestStreak: number
  totalTimeTaken: number
  roundResults: GameRoundResult[]
}

// ============================================
// LEVEL-SPECIFIC CONTENT
// ============================================

export interface KeyTerm {
  term: string
  definition: string
  example?: string
}

export interface ContentSection {
  id: string
  title: string
  content: string // HTML content
  interactiveElements?: {
    type: 'callout' | 'expandable' | 'highlight' | 'tooltip'
    content: string
    position?: number // Character position in content
  }[]
  checkpoint?: {
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
  }
}

export interface LevelContent {
  level: LearningLevel

  // Content
  introduction: string
  sections: ContentSection[]
  summary: string

  // Learning objectives
  objectives: string[]

  // Vocabulary
  keyTerms: KeyTerm[]

  // Activities
  activities: ActivityConfig[]

  // Learning game
  learningGame: LearningGameConfig

  // Metadata
  estimatedMinutes: number
  readingLevel: string
  prerequisites?: string[]
}

// ============================================
// DISCUSSION TYPES
// ============================================

export interface DiscussionAuthor {
  id: string
  name: string
  image?: string
  hasCompletedModule: boolean
}

export interface ModuleDiscussion {
  id: string
  articleId: string
  level: LearningLevel
  author: DiscussionAuthor
  title: string
  content: string
  isResolved: boolean
  isPinned: boolean
  viewCount: number
  replyCount: number
  createdAt: string
  updatedAt: string
}

export interface DiscussionReply {
  id: string
  discussionId: string
  author: DiscussionAuthor
  content: string
  isFromCompleter: boolean
  isAcceptedAnswer: boolean
  helpfulCount: number
  hasUserVotedHelpful: boolean
  parentReplyId?: string
  childReplies?: DiscussionReply[]
  createdAt: string
  updatedAt: string
}

export interface DiscussionWithReplies extends ModuleDiscussion {
  replies: DiscussionReply[]
}

// ============================================
// API REQUEST/RESPONSE TYPES
// ============================================

// Level Content
export interface GetLevelContentResponse {
  success: boolean
  data: LevelContent | null
  availableLevels: LearningLevel[]
}

// Activity Submission
export interface SubmitActivityRequest {
  activityId: string
  submissionData: Record<string, unknown>
  timeSpent: number
}

export interface SubmitActivityResponse {
  success: boolean
  data: {
    score: number
    maxScore: number
    passed: boolean
    feedback: string
    correctAnswers?: Record<string, unknown>
  }
}

// Game Session
export interface StartGameResponse {
  success: boolean
  data: {
    sessionId: string
    gameConfig: LearningGameConfig
    initialState: GameState
  }
}

export interface SubmitGameAnswerRequest {
  sessionId: string
  roundId: string
  answer: string | string[]
  timeTaken: number
}

export interface SubmitGameAnswerResponse {
  success: boolean
  data: {
    isCorrect: boolean
    correctAnswer: string | string[]
    explanation: string
    pointsEarned: number
    timeBonus: number
    newState: GameState
    isGameOver: boolean
    results?: GameResults
  }
}

// Discussion
export interface CreateDiscussionRequest {
  articleId: string
  level: LearningLevel
  title: string
  content: string
}

export interface CreateDiscussionResponse {
  success: boolean
  data: ModuleDiscussion
}

export interface GetDiscussionsRequest {
  articleId?: string
  level?: LearningLevel
  page?: number
  limit?: number
  sort?: 'recent' | 'popular' | 'unanswered'
}

export interface GetDiscussionsResponse {
  success: boolean
  data: ModuleDiscussion[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface CreateReplyRequest {
  discussionId: string
  content: string
  parentReplyId?: string
}

export interface CreateReplyResponse {
  success: boolean
  data: DiscussionReply
}

export interface ToggleHelpfulResponse {
  success: boolean
  data: {
    helpfulCount: number
    hasUserVotedHelpful: boolean
  }
}

// ============================================
// COMMUNITY INTEGRATION
// ============================================

export interface CommunityLearnFilter {
  source: 'learn'
  moduleId?: string
  level?: LearningLevel
}

export interface CommunityDiscussionItem extends ModuleDiscussion {
  moduleName: string
  moduleSlug: string
}

// ============================================
// PROGRESS TRACKING
// ============================================

export interface ModuleProgress {
  id: string
  articleId: string
  selectedLevel: LearningLevel
  status: 'IN_PROGRESS' | 'COMPLETED'
  progressPercentage: number
  currentSectionId?: string

  // Activity tracking
  completedActivities: string[]
  activityScores: Record<string, number>

  // Game tracking
  gameHighScore?: number
  gameStars?: number
  gamePassed: boolean

  // Timestamps
  startedAt: string
  completedAt?: string
  lastAccessedAt: string
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function getLevelMeta(level: LearningLevel): LevelMeta {
  return LEARNING_LEVELS[level]
}

export function getActivityMeta(type: ActivityType): ActivityMeta {
  return ACTIVITY_TYPES[type]
}

export function calculateStars(score: number, maxScore: number, thresholds: LearningGameConfig['starThresholds']): 0 | 1 | 2 | 3 {
  const percentage = (score / maxScore) * 100
  if (percentage >= thresholds.threeStar) return 3
  if (percentage >= thresholds.twoStar) return 2
  if (percentage >= thresholds.oneStar) return 1
  return 0
}

export function getLevelDifficultyMultiplier(level: LearningLevel): number {
  const multipliers: Record<LearningLevel, number> = {
    ELEMENTARY: 0.6,
    MIDDLE_SCHOOL: 0.75,
    HIGH_SCHOOL: 1.0,
    UNDERGRADUATE: 1.25,
    GRADUATE: 1.5,
    PHD: 2.0
  }
  return multipliers[level]
}

export function getPassingScoreForLevel(level: LearningLevel, basePassingScore: number = 60): number {
  // Higher levels have slightly higher passing requirements
  const adjustments: Record<LearningLevel, number> = {
    ELEMENTARY: -10,
    MIDDLE_SCHOOL: -5,
    HIGH_SCHOOL: 0,
    UNDERGRADUATE: 5,
    GRADUATE: 10,
    PHD: 15
  }
  return Math.min(95, Math.max(50, basePassingScore + adjustments[level]))
}
