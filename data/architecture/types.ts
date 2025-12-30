// Architecture Training Ground - Core Type Definitions
// A comprehensive architectural education platform covering all recorded history

// =============================================================================
// ENUMS & CONSTANTS
// =============================================================================

export type LearningLevel =
  | 'ELEMENTARY'
  | 'MIDDLE_SCHOOL'
  | 'HIGH_SCHOOL'
  | 'UNDERGRADUATE'
  | 'GRADUATE'
  | 'PHD';

export const LEARNING_LEVELS: LearningLevel[] = [
  'ELEMENTARY',
  'MIDDLE_SCHOOL',
  'HIGH_SCHOOL',
  'UNDERGRADUATE',
  'GRADUATE',
  'PHD'
];

export type ElementCategory =
  | 'columns'
  | 'arches'
  | 'vaults'
  | 'domes'
  | 'roofs'
  | 'walls'
  | 'windows'
  | 'doors-portals'
  | 'classical-ornament'
  | 'gothic-elements'
  | 'islamic-elements'
  | 'asian-elements'
  | 'indian-elements'
  | 'african-elements'
  | 'americas-elements'
  | 'structural'
  | 'modern-elements'
  | 'exterior-features';

export type GeographicRegion =
  | 'mediterranean'
  | 'western-europe'
  | 'eastern-europe'
  | 'middle-east'
  | 'north-africa'
  | 'sub-saharan-africa'
  | 'south-asia'
  | 'southeast-asia'
  | 'east-asia'
  | 'central-asia'
  | 'north-america'
  | 'mesoamerica'
  | 'south-america'
  | 'oceania'
  | 'global';

export type ArchitecturalPeriod =
  // Ancient
  | 'ancient-egyptian'
  | 'mesopotamian'
  | 'minoan-mycenaean'
  | 'ancient-persian'
  | 'classical-greek'
  | 'hellenistic'
  | 'roman'
  | 'mesoamerican-classic'
  | 'andean-ancient'
  // Medieval
  | 'byzantine'
  | 'early-islamic'
  | 'romanesque'
  | 'gothic'
  | 'moorish'
  | 'indian-medieval'
  | 'southeast-asian-classical'
  | 'east-asian-classical'
  | 'african-kingdoms'
  // Renaissance to Early Modern
  | 'renaissance'
  | 'mannerism'
  | 'mughal'
  | 'ottoman'
  | 'baroque'
  | 'rococo'
  | 'colonial-american'
  | 'neoclassical'
  // 19th Century
  | 'gothic-revival'
  | 'beaux-arts'
  | 'arts-and-crafts'
  | 'art-nouveau'
  | 'chicago-school'
  // 20th Century
  | 'art-deco'
  | 'international-style'
  | 'brutalism'
  | 'metabolism'
  | 'postmodernism'
  | 'deconstructivism'
  | 'high-tech'
  // 21st Century
  | 'parametricism'
  | 'sustainable'
  | 'neo-futurism';

export type ArchitecturalStyle =
  | 'classical'
  | 'medieval'
  | 'renaissance'
  | 'baroque'
  | 'neoclassical'
  | 'romantic'
  | 'modern'
  | 'postmodern'
  | 'contemporary'
  | 'vernacular'
  | 'religious'
  | 'civic'
  | 'residential'
  | 'commercial';

export type GameMode = 'random' | 'timeline' | 'mixed';
export type QuestionType = 'image-to-name' | 'name-to-image' | 'element-to-period' | 'element-to-region';
export type DiagramDifficulty = 1 | 2 | 3 | 4 | 5;

// =============================================================================
// LEVELED CONTENT - Content that varies by learning level
// =============================================================================

export interface LeveledContent {
  ELEMENTARY: string;
  MIDDLE_SCHOOL: string;
  HIGH_SCHOOL: string;
  UNDERGRADUATE: string;
  GRADUATE: string;
  PHD: string;
}

// =============================================================================
// ARCHITECTURAL ELEMENT - Core data structure for each element
// =============================================================================

export interface ArchitecturalElement {
  id: string;
  slug: string;
  name: string;
  alternativeNames: string[];

  // Pronunciation with audio support
  pronunciation: {
    phonetic: string;           // "moo-KAR-nas"
    audioUrl?: string;          // "/audio/architecture/muqarnas.mp3"
    language: string;           // Original language of the term
  };

  // Etymology - word origin
  etymology: {
    origin: string;             // "Arabic"
    meaning: string;            // "stalactite" or "honeycomb"
    rootWord?: string;          // Original word in source language
  };

  // Classification
  category: ElementCategory;
  subcategory: string;
  periods: ArchitecturalPeriod[];
  regions: GeographicRegion[];
  styles: ArchitecturalStyle[];

  // Timeline positioning
  firstAppearance: {
    year: number;               // Negative for BCE
    location: string;
    context: string;
  };
  peakUsage: {
    startYear: number;
    endYear: number;
  };

  // Media - images and diagrams
  images: {
    primary: {
      url: string;
      caption: string;
      source: string;           // "Wikimedia Commons", etc.
      license: string;          // "CC BY-SA 4.0", "Public Domain"
      photographer?: string;
    };
    diagram?: {
      url: string;
      caption: string;
    };
    examples: {
      url: string;
      caption: string;
      location: string;
      photographer?: string;
    }[];
  };

  // Educational content - varies by learning level
  definition: LeveledContent;
  history: LeveledContent;
  construction: LeveledContent;

  // Additional educational content
  symbolism: string;
  culturalContext: string;

  // Famous examples with locations
  famousExamples: {
    name: string;
    location: string;
    dateBuilt: string;
    architect?: string;
    description: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    imageUrl?: string;
  }[];

  // Element relationships
  relatedElements: string[];    // Element IDs

  // Confusion Buster data - commonly confused elements
  commonlyConfusedWith: {
    elementId: string;
    distinction: string;        // Clear explanation of difference
    visualCue: string;          // Quick visual identifier
    memoryTrick?: string;       // Mnemonic device
  }[];

  // Fun facts for engagement
  funFacts: string[];

  // Smart search support
  searchTags: string[];         // "leaf", "decoration", "Greek"
  searchSynonyms: string[];     // "that curly thing on columns"

  // AR-ready metadata for future features
  arMetadata?: {
    visualFeatures: string[];   // For future ML recognition
    typicalScale: 'small' | 'medium' | 'large' | 'monumental' | 'varies';
    typicalMaterials: string[]; // "stone", "marble", "wood"
    viewAngles: string[];       // "from below", "straight on"
    recognitionKeypoints?: string[]; // Key visual features for AI
  };

  // Game metadata
  difficulty: DiagramDifficulty;
  visualDistinctiveness: DiagramDifficulty;
  commonness: DiagramDifficulty;      // How often seen in real world
}

// =============================================================================
// CONFUSION PAIR - For Confusion Buster mode
// =============================================================================

export interface ConfusionPair {
  id: string;
  elementA: string;             // Element ID
  elementB: string;             // Element ID

  // Side-by-side comparison content
  comparison: {
    title: string;              // "Dentils vs. Modillions"

    elementAName: string;
    elementBName: string;

    elementAFeatures: string[]; // Key visual features
    elementBFeatures: string[]; // Key visual features

    keyDifference: string;      // The main distinction

    memoryTrick: string;        // "DENTils = DENTist teeth"

    visualComparison: {
      imageA: string;
      imageB: string;
      annotatedDiagram?: string; // Side-by-side with callouts
    };
  };

  // Difficulty of distinction
  difficulty: DiagramDifficulty;

  // Related pairs to study together
  relatedPairs?: string[];
}

// =============================================================================
// ARCHITECTURAL DIAGRAM - For word bank game mode
// =============================================================================

export interface DiagramLabel {
  id: string;
  elementId: string;            // Links to ArchitecturalElement
  correctAnswer: string;        // The term that goes here

  // Position (percentage-based for responsiveness)
  position: {
    x: number;                  // 0-100
    y: number;                  // 0-100
    anchor: 'left' | 'right' | 'top' | 'bottom';
  };

  // Leader line (connecting line to element)
  leaderLine?: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  };

  // Hint (optional, for easier modes)
  hint?: string;
}

export interface ArchitecturalDiagram {
  id: string;
  slug: string;
  name: string;

  // Classification
  category: ElementCategory;
  subcategory: string;
  periods: ArchitecturalPeriod[];
  regions: GeographicRegion[];

  // Difficulty & Prerequisites
  difficulty: DiagramDifficulty;
  requiredMasteredElements: string[]; // Must know these first
  prerequisiteDiagrams?: string[];    // Must complete these first

  // The diagram image (SVG preferred for crisp scaling)
  diagramImage: {
    svg?: string;               // Vector version (preferred)
    png: string;                // Fallback raster
    width: number;
    height: number;
  };

  // Label hotspots
  labelPoints: DiagramLabel[];

  // Word bank configuration
  wordBank: {
    correctTerms: string[];     // All correct answers
    distractors: {
      beginner: string[];       // Easy mode - fewer distractors
      intermediate: string[];   // More confusing options
      advanced: string[];       // Very similar terms
    };
  };

  // Educational content (varies by level)
  title: LeveledContent;
  description: LeveledContent;

  // After completion - educational summary
  completionContent: LeveledContent;

  // Fun facts about this structure type
  funFacts: string[];

  // Famous examples of this structure type
  famousExamples: {
    name: string;
    location: string;
    imageUrl?: string;
  }[];
}

// =============================================================================
// GAME & PROGRESS TYPES
// =============================================================================

export interface GameQuestion {
  id: string;
  type: QuestionType;
  elementId: string;
  imageUrl: string;             // Could be original or user's spotted photo
  isPersonalPhoto: boolean;
  personalPhotoLocation?: string;

  correctAnswer: string;
  options: string[];            // 4 options including correct

  // Ghost data from previous attempt
  ghostData?: {
    previousTime: number;       // ms
    previousAnswer: string;
    wasCorrect: boolean;
  };
}

export interface GameSession {
  id: string;
  mode: GameMode;
  questionTypes: QuestionType[];

  questions: GameQuestion[];
  currentIndex: number;

  // Results
  answers: {
    questionId: string;
    selectedAnswer: string;
    isCorrect: boolean;
    timeMs: number;
  }[];

  totalTimeMs: number;
  startedAt: Date;
  completedAt?: Date;
}

export interface GhostRun {
  id: string;
  sessionId: string;
  mode: GameMode;

  totalQuestions: number;
  correctAnswers: number;
  totalTimeMs: number;

  // Per-question timing for ghost racing
  questionTimes: number[];
  questionResults: boolean[];
  questionIds: string[];

  isPersonalBest: boolean;
  createdAt: Date;
}

export interface ElementStat {
  elementId: string;

  timesShown: number;
  timesCorrect: number;
  timesIncorrect: number;

  lastAnswer: 'correct' | 'incorrect' | null;
  lastWrongChoice?: string;

  avgResponseTimeMs: number;
  currentStreak: number;
  bestStreak: number;

  // For adaptive learning
  masteryScore: number;         // 0-100
  lastStudiedAt?: Date;
}

export interface DiagramStat {
  diagramId: string;

  attempts: number;
  bestScore: number;            // 0-1
  bestTimeMs?: number;

  // Track which labels they struggle with
  labelStats: {
    [labelId: string]: {
      correct: number;
      incorrect: number;
    };
  };

  lastAttemptAt?: Date;
  firstCompletedAt?: Date;
}

// =============================================================================
// USER PROGRESS
// =============================================================================

export interface SpottedElement {
  id: string;
  elementId: string;

  // Photo
  photoUrl: string;
  photoWidth: number;
  photoHeight: number;

  // Location
  locationName?: string;
  buildingName?: string;
  city?: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };

  // Details
  architect?: string;
  yearBuilt?: string;
  notes?: string;

  // Social
  isPublic: boolean;
  shareCount: number;

  spottedAt: Date;
}

export interface UserArchitectureProgress {
  userId: string;

  // Study progress
  elementsStudied: string[];
  elementsMastered: string[];   // >80% accuracy, 5+ attempts

  // Game stats
  totalGamesPlayed: number;
  totalQuestions: number;
  totalCorrect: number;

  // Personal records by mode
  bestTimes: {
    random?: number;
    timeline?: number;
    mixed?: number;
  };
  bestStreaks: {
    random: number;
    timeline: number;
    mixed: number;
  };

  // Diagram progress
  diagramsAttempted: string[];
  diagramsCompleted: string[];  // 100% score

  // Per-element statistics
  elementStats: { [elementId: string]: ElementStat };

  // Per-diagram statistics
  diagramStats: { [diagramId: string]: DiagramStat };

  // Adaptive learning weights (higher = needs more practice)
  adaptiveWeights: { [elementId: string]: number };

  // Achievements
  badges: string[];

  // Spotted in the wild
  spottedElements: SpottedElement[];

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// BADGES & ACHIEVEMENTS
// =============================================================================

export type BadgeCategory =
  | 'progress'
  | 'streak'
  | 'speed'
  | 'knowledge-domain'
  | 'spotted'
  | 'diagram';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;                 // Emoji or icon name
  category: BadgeCategory;

  // Unlock requirements
  requirement: {
    type: 'elements_studied' | 'elements_mastered' | 'streak' | 'speed' |
          'spotted' | 'diagrams' | 'region' | 'period' | 'perfect_score' | 'games_played';
    value: number;
    specificIds?: string[];     // Specific elements/diagrams required
  };

  // Rarity
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

  // Points awarded
  points: number;
}

// =============================================================================
// SEARCH & FILTERING
// =============================================================================

export interface SearchResult {
  element: ArchitecturalElement;
  score: number;
  matchType: 'exact' | 'partial' | 'tag' | 'synonym';
  matchedField: string;
}

export interface FilterOptions {
  categories?: ElementCategory[];
  periods?: ArchitecturalPeriod[];
  regions?: GeographicRegion[];
  difficulty?: DiagramDifficulty[];
  searchQuery?: string;
}

// =============================================================================
// PRINT MATERIALS
// =============================================================================

export type PrintFormat = 'flashcards' | 'cheatsheet' | 'diagrams' | 'quiz';

export interface PrintableStudySet {
  id: string;
  title: string;

  // Content selection
  elementIds: string[];
  diagramIds?: string[];

  // Format options
  format: PrintFormat;
  cardsPerPage: 4 | 6 | 9;

  includeImages: boolean;
  includeHistory: boolean;
  includePronunciation: boolean;
  learningLevel: LearningLevel;

  // Generated output
  pdfUrl?: string;
  generatedAt?: Date;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface ArchitectureApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface GameStartResponse {
  sessionId: string;
  questions: GameQuestion[];
  ghostRun?: GhostRun;
}

export interface GameSubmitResponse {
  isCorrect: boolean;
  correctAnswer: string;
  explanation?: string;

  // Updated stats
  newStreak: number;
  elementMastery: number;

  // Ghost comparison
  ghostComparison?: {
    yourTime: number;
    ghostTime: number;
    ghostWasCorrect: boolean;
  };
}

export interface GameCompleteResponse {
  sessionId: string;

  // Results
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  totalTimeMs: number;

  // Personal best
  isPersonalBest: boolean;
  previousBest?: number;
  improvement?: number;

  // Elements to review
  elementsToReview: {
    elementId: string;
    name: string;
    yourAnswer: string;
    correctAnswer: string;
  }[];

  // Badges earned
  newBadges: Badge[];

  // XP/points earned
  pointsEarned: number;
}
