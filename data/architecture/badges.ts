/**
 * Badges & Achievements for Architecture Learning Platform
 * Comprehensive gamification system
 */

import { Badge, BadgeTier, BadgeCategory, GeographicRegion, ArchitecturalPeriod, ElementCategory } from './types';

// Badge definitions with tiers
export const BADGES: Badge[] = [
  // ============================================
  // STUDY STREAK BADGES - Consistent Learning
  // ============================================
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first architecture quiz',
    icon: '👣',
    tier: 'BRONZE',
    category: 'STREAK',
    requirement: { type: 'games_completed', count: 1 },
    xpReward: 50,
    rarity: 0.95,
    unlockedMessage: "Welcome to your architectural journey! Every expert was once a beginner.",
  },
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Complete 10 quizzes',
    icon: '🌱',
    tier: 'BRONZE',
    category: 'STREAK',
    requirement: { type: 'games_completed', count: 10 },
    xpReward: 100,
    rarity: 0.7,
    unlockedMessage: "You're building a strong foundation!",
  },
  {
    id: 'dedicated-learner',
    name: 'Dedicated Learner',
    description: 'Complete 50 quizzes',
    icon: '📚',
    tier: 'SILVER',
    category: 'STREAK',
    requirement: { type: 'games_completed', count: 50 },
    xpReward: 250,
    rarity: 0.4,
    unlockedMessage: "Your dedication to learning is remarkable!",
  },
  {
    id: 'architecture-enthusiast',
    name: 'Architecture Enthusiast',
    description: 'Complete 100 quizzes',
    icon: '🏛️',
    tier: 'GOLD',
    category: 'STREAK',
    requirement: { type: 'games_completed', count: 100 },
    xpReward: 500,
    rarity: 0.2,
    unlockedMessage: "You're becoming a true architecture enthusiast!",
  },
  {
    id: 'architecture-devotee',
    name: 'Architecture Devotee',
    description: 'Complete 500 quizzes',
    icon: '⭐',
    tier: 'PLATINUM',
    category: 'STREAK',
    requirement: { type: 'games_completed', count: 500 },
    xpReward: 1000,
    rarity: 0.05,
    unlockedMessage: "Your commitment is extraordinary. You've played 500 games!",
  },
  {
    id: 'architecture-master',
    name: 'Architecture Master',
    description: 'Complete 1000 quizzes',
    icon: '👑',
    tier: 'DIAMOND',
    category: 'STREAK',
    requirement: { type: 'games_completed', count: 1000 },
    xpReward: 2500,
    rarity: 0.01,
    unlockedMessage: "1000 games! You've achieved legendary status!",
  },

  // Daily streaks
  {
    id: 'daily-practice',
    name: 'Daily Practice',
    description: 'Practice 3 days in a row',
    icon: '🔥',
    tier: 'BRONZE',
    category: 'STREAK',
    requirement: { type: 'daily_streak', count: 3 },
    xpReward: 75,
    rarity: 0.6,
    unlockedMessage: "You're building a habit! Keep the streak going!",
  },
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Practice 7 days in a row',
    icon: '📅',
    tier: 'SILVER',
    category: 'STREAK',
    requirement: { type: 'daily_streak', count: 7 },
    xpReward: 200,
    rarity: 0.35,
    unlockedMessage: "A full week of practice! Your dedication is showing!",
  },
  {
    id: 'fortnight-focus',
    name: 'Fortnight Focus',
    description: 'Practice 14 days in a row',
    icon: '🗓️',
    tier: 'GOLD',
    category: 'STREAK',
    requirement: { type: 'daily_streak', count: 14 },
    xpReward: 400,
    rarity: 0.15,
    unlockedMessage: "Two weeks straight! You're in the zone!",
  },
  {
    id: 'monthly-master',
    name: 'Monthly Master',
    description: 'Practice 30 days in a row',
    icon: '🌙',
    tier: 'PLATINUM',
    category: 'STREAK',
    requirement: { type: 'daily_streak', count: 30 },
    xpReward: 1000,
    rarity: 0.05,
    unlockedMessage: "30 days of dedication! You're unstoppable!",
  },
  {
    id: 'centurion',
    name: 'Centurion',
    description: 'Practice 100 days in a row',
    icon: '💯',
    tier: 'DIAMOND',
    category: 'STREAK',
    requirement: { type: 'daily_streak', count: 100 },
    xpReward: 5000,
    rarity: 0.005,
    unlockedMessage: "100 DAYS! You are a true centurion of learning!",
  },

  // ============================================
  // MASTERY BADGES - Knowledge Depth
  // ============================================
  {
    id: 'element-apprentice',
    name: 'Element Apprentice',
    description: 'Master 10 architectural elements',
    icon: '📖',
    tier: 'BRONZE',
    category: 'MASTERY',
    requirement: { type: 'elements_mastered', count: 10 },
    xpReward: 150,
    rarity: 0.5,
    unlockedMessage: "10 elements mastered! Your vocabulary is growing!",
  },
  {
    id: 'element-scholar',
    name: 'Element Scholar',
    description: 'Master 50 architectural elements',
    icon: '🎓',
    tier: 'SILVER',
    category: 'MASTERY',
    requirement: { type: 'elements_mastered', count: 50 },
    xpReward: 400,
    rarity: 0.25,
    unlockedMessage: "50 elements! You can read buildings like books!",
  },
  {
    id: 'element-expert',
    name: 'Element Expert',
    description: 'Master 100 architectural elements',
    icon: '🏆',
    tier: 'GOLD',
    category: 'MASTERY',
    requirement: { type: 'elements_mastered', count: 100 },
    xpReward: 750,
    rarity: 0.1,
    unlockedMessage: "100 elements mastered! You're an expert!",
  },
  {
    id: 'element-professor',
    name: 'Element Professor',
    description: 'Master 250 architectural elements',
    icon: '🎖️',
    tier: 'PLATINUM',
    category: 'MASTERY',
    requirement: { type: 'elements_mastered', count: 250 },
    xpReward: 1500,
    rarity: 0.03,
    unlockedMessage: "250 elements! You could teach this!",
  },
  {
    id: 'element-grandmaster',
    name: 'Element Grandmaster',
    description: 'Master 500 architectural elements',
    icon: '🌟',
    tier: 'DIAMOND',
    category: 'MASTERY',
    requirement: { type: 'elements_mastered', count: 500 },
    xpReward: 3000,
    rarity: 0.01,
    unlockedMessage: "500 elements! You're a walking encyclopedia!",
  },

  // ============================================
  // ACCURACY BADGES - Precision & Skill
  // ============================================
  {
    id: 'sharp-eye',
    name: 'Sharp Eye',
    description: 'Get 80% accuracy on 10 quizzes',
    icon: '👁️',
    tier: 'BRONZE',
    category: 'ACCURACY',
    requirement: { type: 'accuracy_streak', accuracy: 80, count: 10 },
    xpReward: 100,
    rarity: 0.45,
    unlockedMessage: "Your eye for detail is developing!",
  },
  {
    id: 'precision-player',
    name: 'Precision Player',
    description: 'Get 90% accuracy on 10 quizzes',
    icon: '🎯',
    tier: 'SILVER',
    category: 'ACCURACY',
    requirement: { type: 'accuracy_streak', accuracy: 90, count: 10 },
    xpReward: 300,
    rarity: 0.2,
    unlockedMessage: "90% accuracy 10 times! Impressive precision!",
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Get a perfect score on any quiz',
    icon: '💎',
    tier: 'SILVER',
    category: 'ACCURACY',
    requirement: { type: 'perfect_game', count: 1 },
    xpReward: 200,
    rarity: 0.15,
    unlockedMessage: "A perfect game! Flawless victory!",
  },
  {
    id: 'serial-perfectionist',
    name: 'Serial Perfectionist',
    description: 'Get 10 perfect scores',
    icon: '💫',
    tier: 'GOLD',
    category: 'ACCURACY',
    requirement: { type: 'perfect_game', count: 10 },
    xpReward: 600,
    rarity: 0.05,
    unlockedMessage: "10 perfect games! Your accuracy is legendary!",
  },
  {
    id: 'flawless-master',
    name: 'Flawless Master',
    description: 'Get 50 perfect scores',
    icon: '🌠',
    tier: 'PLATINUM',
    category: 'ACCURACY',
    requirement: { type: 'perfect_game', count: 50 },
    xpReward: 1500,
    rarity: 0.01,
    unlockedMessage: "50 perfect games! Absolutely incredible!",
  },

  // ============================================
  // SPEED BADGES - Quick Thinking
  // ============================================
  {
    id: 'quick-thinker',
    name: 'Quick Thinker',
    description: 'Answer 10 questions in under 3 seconds each',
    icon: '⚡',
    tier: 'BRONZE',
    category: 'SPEED',
    requirement: { type: 'fast_answers', time: 3000, count: 10 },
    xpReward: 100,
    rarity: 0.4,
    unlockedMessage: "Lightning fast! Your reflexes are sharp!",
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Complete a 25-question quiz in under 2 minutes',
    icon: '🏎️',
    tier: 'SILVER',
    category: 'SPEED',
    requirement: { type: 'fast_game', questions: 25, time: 120000 },
    xpReward: 300,
    rarity: 0.15,
    unlockedMessage: "Under 2 minutes for 25 questions! Blazing fast!",
  },
  {
    id: 'time-lord',
    name: 'Time Lord',
    description: 'Beat your personal best time 10 times',
    icon: '⏱️',
    tier: 'GOLD',
    category: 'SPEED',
    requirement: { type: 'personal_best_beaten', count: 10 },
    xpReward: 500,
    rarity: 0.1,
    unlockedMessage: "You keep beating yourself! Self-improvement at its finest!",
  },
  {
    id: 'ghost-hunter',
    name: 'Ghost Hunter',
    description: 'Beat your ghost 25 times',
    icon: '👻',
    tier: 'PLATINUM',
    category: 'SPEED',
    requirement: { type: 'ghost_beaten', count: 25 },
    xpReward: 800,
    rarity: 0.05,
    unlockedMessage: "You've conquered your past self 25 times!",
  },

  // ============================================
  // EXPLORER BADGES - Geographic Coverage
  // ============================================
  {
    id: 'world-traveler',
    name: 'World Traveler',
    description: 'Study elements from 5 different regions',
    icon: '🌍',
    tier: 'BRONZE',
    category: 'EXPLORER',
    requirement: { type: 'regions_studied', count: 5 },
    xpReward: 150,
    rarity: 0.4,
    unlockedMessage: "You're exploring architecture around the world!",
  },
  {
    id: 'global-citizen',
    name: 'Global Citizen',
    description: 'Study elements from all regions',
    icon: '🌏',
    tier: 'GOLD',
    category: 'EXPLORER',
    requirement: { type: 'regions_studied', count: 13 },
    xpReward: 500,
    rarity: 0.1,
    unlockedMessage: "You've studied architecture from every corner of the globe!",
  },
  {
    id: 'time-traveler',
    name: 'Time Traveler',
    description: 'Study elements from 10 different historical periods',
    icon: '⏳',
    tier: 'SILVER',
    category: 'EXPLORER',
    requirement: { type: 'periods_studied', count: 10 },
    xpReward: 300,
    rarity: 0.25,
    unlockedMessage: "You're traveling through architectural history!",
  },
  {
    id: 'history-completionist',
    name: 'History Completionist',
    description: 'Study elements from all historical periods',
    icon: '📜',
    tier: 'PLATINUM',
    category: 'EXPLORER',
    requirement: { type: 'periods_studied', count: 20 },
    xpReward: 750,
    rarity: 0.05,
    unlockedMessage: "From ancient to modern—you've seen it all!",
  },

  // Regional specialist badges
  {
    id: 'mediterranean-maven',
    name: 'Mediterranean Maven',
    description: 'Master 25 Mediterranean architectural elements',
    icon: '🏛️',
    tier: 'GOLD',
    category: 'EXPLORER',
    requirement: { type: 'region_mastery', region: 'MEDITERRANEAN', count: 25 },
    xpReward: 400,
    rarity: 0.08,
    unlockedMessage: "The cradle of Western architecture is your specialty!",
  },
  {
    id: 'eastern-expert',
    name: 'Eastern Expert',
    description: 'Master 25 East Asian architectural elements',
    icon: '🏯',
    tier: 'GOLD',
    category: 'EXPLORER',
    requirement: { type: 'region_mastery', region: 'EAST_ASIA', count: 25 },
    xpReward: 400,
    rarity: 0.08,
    unlockedMessage: "The elegance of Eastern architecture is your domain!",
  },
  {
    id: 'islamic-illuminated',
    name: 'Islamic Illuminated',
    description: 'Master 25 Middle Eastern architectural elements',
    icon: '🕌',
    tier: 'GOLD',
    category: 'EXPLORER',
    requirement: { type: 'region_mastery', region: 'MIDDLE_EAST', count: 25 },
    xpReward: 400,
    rarity: 0.08,
    unlockedMessage: "The geometric beauty of Islamic architecture is yours!",
  },

  // ============================================
  // CATEGORY SPECIALIST BADGES
  // ============================================
  {
    id: 'column-connoisseur',
    name: 'Column Connoisseur',
    description: 'Master all classical orders and column types',
    icon: '🏛️',
    tier: 'GOLD',
    category: 'SPECIALIST',
    requirement: { type: 'category_mastery', category: 'COLUMN', count: 20 },
    xpReward: 400,
    rarity: 0.1,
    unlockedMessage: "Doric, Ionic, Corinthian—you know them all!",
  },
  {
    id: 'arch-aficionado',
    name: 'Arch Aficionado',
    description: 'Master 15 types of arches',
    icon: '🌉',
    tier: 'GOLD',
    category: 'SPECIALIST',
    requirement: { type: 'subcategory_mastery', subcategory: 'arches', count: 15 },
    xpReward: 350,
    rarity: 0.12,
    unlockedMessage: "From round to pointed to horseshoe—arches are your thing!",
  },
  {
    id: 'window-wizard',
    name: 'Window Wizard',
    description: 'Master 20 window elements',
    icon: '🪟',
    tier: 'GOLD',
    category: 'SPECIALIST',
    requirement: { type: 'category_mastery', category: 'WINDOW', count: 20 },
    xpReward: 400,
    rarity: 0.1,
    unlockedMessage: "Rose windows, Palladian, oriel—you see through them all!",
  },
  {
    id: 'roof-reader',
    name: 'Roof Reader',
    description: 'Master 20 roof elements',
    icon: '🏠',
    tier: 'GOLD',
    category: 'SPECIALIST',
    requirement: { type: 'category_mastery', category: 'ROOF', count: 20 },
    xpReward: 400,
    rarity: 0.1,
    unlockedMessage: "Gable, hip, mansard—you've got buildings covered!",
  },
  {
    id: 'door-devotee',
    name: 'Door Devotee',
    description: 'Master 15 door elements',
    icon: '🚪',
    tier: 'GOLD',
    category: 'SPECIALIST',
    requirement: { type: 'category_mastery', category: 'DOOR', count: 15 },
    xpReward: 350,
    rarity: 0.12,
    unlockedMessage: "Every door opens for you!",
  },
  {
    id: 'fortification-fanatic',
    name: 'Fortification Fanatic',
    description: 'Master 20 fortification elements',
    icon: '🏰',
    tier: 'GOLD',
    category: 'SPECIALIST',
    requirement: { type: 'category_mastery', category: 'FORTIFICATION', count: 20 },
    xpReward: 400,
    rarity: 0.1,
    unlockedMessage: "Battlements, barbicans, bastions—you're castle-ready!",
  },
  {
    id: 'sacred-scholar',
    name: 'Sacred Scholar',
    description: 'Master 25 religious architectural elements',
    icon: '⛪',
    tier: 'GOLD',
    category: 'SPECIALIST',
    requirement: { type: 'category_mastery', category: 'RELIGIOUS', count: 25 },
    xpReward: 450,
    rarity: 0.08,
    unlockedMessage: "Sacred spaces across all faiths are your specialty!",
  },

  // ============================================
  // SPOTTED IN THE WILD BADGES
  // ============================================
  {
    id: 'first-sighting',
    name: 'First Sighting',
    description: 'Log your first architectural element in the wild',
    icon: '📸',
    tier: 'BRONZE',
    category: 'SPOTTER',
    requirement: { type: 'elements_spotted', count: 1 },
    xpReward: 100,
    rarity: 0.6,
    unlockedMessage: "You've started seeing architecture everywhere!",
  },
  {
    id: 'eagle-eye',
    name: 'Eagle Eye',
    description: 'Spot 10 different architectural elements',
    icon: '🦅',
    tier: 'SILVER',
    category: 'SPOTTER',
    requirement: { type: 'elements_spotted', count: 10 },
    xpReward: 250,
    rarity: 0.3,
    unlockedMessage: "10 elements spotted! You're seeing the world differently!",
  },
  {
    id: 'architecture-hunter',
    name: 'Architecture Hunter',
    description: 'Spot 50 different architectural elements',
    icon: '🔍',
    tier: 'GOLD',
    category: 'SPOTTER',
    requirement: { type: 'elements_spotted', count: 50 },
    xpReward: 600,
    rarity: 0.1,
    unlockedMessage: "50 elements! You're a true architecture hunter!",
  },
  {
    id: 'urban-archaeologist',
    name: 'Urban Archaeologist',
    description: 'Spot 100 different architectural elements',
    icon: '🏺',
    tier: 'PLATINUM',
    category: 'SPOTTER',
    requirement: { type: 'elements_spotted', count: 100 },
    xpReward: 1200,
    rarity: 0.03,
    unlockedMessage: "100 elements! You're an urban archaeologist!",
  },
  {
    id: 'world-documenter',
    name: 'World Documenter',
    description: 'Spot elements from 5 different regions',
    icon: '📍',
    tier: 'GOLD',
    category: 'SPOTTER',
    requirement: { type: 'spotted_regions', count: 5 },
    xpReward: 500,
    rarity: 0.08,
    unlockedMessage: "You're documenting architecture across the globe!",
  },
  {
    id: 'photo-collector',
    name: 'Photo Collector',
    description: 'Upload 25 unique photos',
    icon: '🖼️',
    tier: 'SILVER',
    category: 'SPOTTER',
    requirement: { type: 'photos_uploaded', count: 25 },
    xpReward: 300,
    rarity: 0.15,
    unlockedMessage: "25 photos! You're building an amazing collection!",
  },
  {
    id: 'shutterbug',
    name: 'Shutterbug',
    description: 'Upload 100 photos',
    icon: '📷',
    tier: 'GOLD',
    category: 'SPOTTER',
    requirement: { type: 'photos_uploaded', count: 100 },
    xpReward: 700,
    rarity: 0.05,
    unlockedMessage: "100 photos! Your personal architecture library is impressive!",
  },

  // ============================================
  // DIAGRAM BADGES
  // ============================================
  {
    id: 'diagram-beginner',
    name: 'Diagram Beginner',
    description: 'Complete your first diagram quiz',
    icon: '📐',
    tier: 'BRONZE',
    category: 'MASTERY',
    requirement: { type: 'diagrams_completed', count: 1 },
    xpReward: 75,
    rarity: 0.5,
    unlockedMessage: "You've started learning to label buildings!",
  },
  {
    id: 'diagram-adept',
    name: 'Diagram Adept',
    description: 'Complete 25 diagram quizzes',
    icon: '✏️',
    tier: 'SILVER',
    category: 'MASTERY',
    requirement: { type: 'diagrams_completed', count: 25 },
    xpReward: 300,
    rarity: 0.2,
    unlockedMessage: "You're getting great at labeling architectural diagrams!",
  },
  {
    id: 'blueprint-reader',
    name: 'Blueprint Reader',
    description: 'Get 100% on 10 diagram quizzes',
    icon: '📋',
    tier: 'GOLD',
    category: 'MASTERY',
    requirement: { type: 'diagram_perfect', count: 10 },
    xpReward: 500,
    rarity: 0.1,
    unlockedMessage: "You can read buildings like blueprints!",
  },

  // ============================================
  // SPECIAL & SECRET BADGES
  // ============================================
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Study architecture after midnight',
    icon: '🦉',
    tier: 'BRONZE',
    category: 'SPECIAL',
    requirement: { type: 'time_of_day', hours: [0, 1, 2, 3, 4] },
    xpReward: 50,
    secret: true,
    rarity: 0.3,
    unlockedMessage: "Burning the midnight oil! True dedication!",
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Study architecture before 6 AM',
    icon: '🐦',
    tier: 'BRONZE',
    category: 'SPECIAL',
    requirement: { type: 'time_of_day', hours: [5] },
    xpReward: 50,
    secret: true,
    rarity: 0.15,
    unlockedMessage: "Early morning study session! Rise and learn!",
  },
  {
    id: 'weekend-warrior',
    name: 'Weekend Warrior',
    description: 'Study every weekend for a month',
    icon: '🗓️',
    tier: 'SILVER',
    category: 'SPECIAL',
    requirement: { type: 'weekend_streak', count: 4 },
    xpReward: 200,
    secret: true,
    rarity: 0.15,
    unlockedMessage: "Weekends are for architecture!",
  },
  {
    id: 'comeback-kid',
    name: 'Comeback Kid',
    description: 'Return after 30 days away and complete a quiz',
    icon: '🔄',
    tier: 'BRONZE',
    category: 'SPECIAL',
    requirement: { type: 'return_after_absence', days: 30 },
    xpReward: 100,
    secret: true,
    rarity: 0.2,
    unlockedMessage: "Welcome back! Architecture missed you!",
  },
  {
    id: 'marathon-session',
    name: 'Marathon Session',
    description: 'Complete 20 quizzes in one session',
    icon: '🏃',
    tier: 'GOLD',
    category: 'SPECIAL',
    requirement: { type: 'games_in_session', count: 20 },
    xpReward: 400,
    secret: true,
    rarity: 0.05,
    unlockedMessage: "20 games in one sitting! What a marathon!",
  },
  {
    id: 'globe-trotter',
    name: 'Globe Trotter',
    description: 'Spot elements on 3 different continents',
    icon: '✈️',
    tier: 'PLATINUM',
    category: 'SPOTTER',
    requirement: { type: 'spotted_continents', count: 3 },
    xpReward: 1000,
    secret: true,
    rarity: 0.02,
    unlockedMessage: "Architecture tourism across continents! Amazing!",
  },
  {
    id: 'founding-architect',
    name: 'Founding Architect',
    description: 'Be one of the first 100 users',
    icon: '🏗️',
    tier: 'DIAMOND',
    category: 'SPECIAL',
    requirement: { type: 'early_adopter', rank: 100 },
    xpReward: 1000,
    secret: true,
    rarity: 0.001,
    unlockedMessage: "You're a founding member of this community!",
  },

  // Period specialist badges
  {
    id: 'ancient-scholar',
    name: 'Ancient Scholar',
    description: 'Master 30 elements from ancient periods (before 500 CE)',
    icon: '🏛️',
    tier: 'GOLD',
    category: 'SPECIALIST',
    requirement: { type: 'era_mastery', era: 'ancient', count: 30 },
    xpReward: 450,
    rarity: 0.08,
    unlockedMessage: "The ancient world's architecture is your specialty!",
  },
  {
    id: 'medieval-master',
    name: 'Medieval Master',
    description: 'Master 30 elements from medieval periods',
    icon: '⚔️',
    tier: 'GOLD',
    category: 'SPECIALIST',
    requirement: { type: 'era_mastery', era: 'medieval', count: 30 },
    xpReward: 450,
    rarity: 0.08,
    unlockedMessage: "Gothic, Romanesque, Byzantine—the medieval world is yours!",
  },
  {
    id: 'renaissance-virtuoso',
    name: 'Renaissance Virtuoso',
    description: 'Master 25 Renaissance and Baroque elements',
    icon: '🎨',
    tier: 'GOLD',
    category: 'SPECIALIST',
    requirement: { type: 'era_mastery', era: 'renaissance', count: 25 },
    xpReward: 400,
    rarity: 0.1,
    unlockedMessage: "The rebirth of classical architecture speaks to you!",
  },
  {
    id: 'modern-maven',
    name: 'Modern Maven',
    description: 'Master 30 modern and contemporary elements',
    icon: '🏙️',
    tier: 'GOLD',
    category: 'SPECIALIST',
    requirement: { type: 'era_mastery', era: 'modern', count: 30 },
    xpReward: 450,
    rarity: 0.08,
    unlockedMessage: "Modernism to deconstructivism—you know the cutting edge!",
  },
];

// Helper functions

export function getBadgeById(id: string): Badge | undefined {
  return BADGES.find(badge => badge.id === id);
}

export function getBadgesByCategory(category: BadgeCategory): Badge[] {
  return BADGES.filter(badge => badge.category === category);
}

export function getBadgesByTier(tier: BadgeTier): Badge[] {
  return BADGES.filter(badge => badge.tier === tier);
}

export function getSecretBadges(): Badge[] {
  return BADGES.filter(badge => badge.secret);
}

export function getVisibleBadges(): Badge[] {
  return BADGES.filter(badge => !badge.secret);
}

export function getBadgeProgress(badge: Badge, userStats: Record<string, number>): number {
  // Calculate progress toward badge (0-100)
  const req = badge.requirement;
  switch (req.type) {
    case 'games_completed':
    case 'daily_streak':
    case 'elements_mastered':
    case 'perfect_game':
    case 'elements_spotted':
    case 'photos_uploaded':
    case 'diagrams_completed':
    case 'regions_studied':
    case 'periods_studied':
    case 'personal_best_beaten':
    case 'ghost_beaten':
      const current = userStats[req.type] || 0;
      return Math.min(100, Math.round((current / req.count!) * 100));
    default:
      return 0;
  }
}

export function sortBadgesByRarity(badges: Badge[]): Badge[] {
  return [...badges].sort((a, b) => a.rarity - b.rarity);
}

// Tier rankings for sorting
export const TIER_RANKINGS: Record<BadgeTier, number> = {
  BRONZE: 1,
  SILVER: 2,
  GOLD: 3,
  PLATINUM: 4,
  DIAMOND: 5,
};

export function sortBadgesByTier(badges: Badge[]): Badge[] {
  return [...badges].sort((a, b) => TIER_RANKINGS[b.tier] - TIER_RANKINGS[a.tier]);
}

// Category labels and icons
export const CATEGORY_INFO: Record<BadgeCategory, { label: string; icon: string; description: string }> = {
  STREAK: {
    label: 'Streak Badges',
    icon: '🔥',
    description: 'Earned through consistent daily practice',
  },
  MASTERY: {
    label: 'Mastery Badges',
    icon: '🎓',
    description: 'Earned by mastering architectural knowledge',
  },
  SPEED: {
    label: 'Speed Badges',
    icon: '⚡',
    description: 'Earned through quick thinking and fast answers',
  },
  ACCURACY: {
    label: 'Accuracy Badges',
    icon: '🎯',
    description: 'Earned through precise, accurate answers',
  },
  EXPLORER: {
    label: 'Explorer Badges',
    icon: '🌍',
    description: 'Earned by exploring diverse regions and periods',
  },
  SPECIALIST: {
    label: 'Specialist Badges',
    icon: '🔬',
    description: 'Earned by deep expertise in specific areas',
  },
  SPOTTER: {
    label: 'Spotter Badges',
    icon: '📸',
    description: 'Earned by finding architecture in the real world',
  },
  SPECIAL: {
    label: 'Special Badges',
    icon: '✨',
    description: 'Unique and secret achievements',
  },
};

// Tier styling information
export const TIER_INFO: Record<BadgeTier, { label: string; color: string; bgColor: string; glow: string }> = {
  BRONZE: {
    label: 'Bronze',
    color: '#CD7F32',
    bgColor: 'rgba(205, 127, 50, 0.1)',
    glow: '0 0 10px rgba(205, 127, 50, 0.5)',
  },
  SILVER: {
    label: 'Silver',
    color: '#C0C0C0',
    bgColor: 'rgba(192, 192, 192, 0.1)',
    glow: '0 0 10px rgba(192, 192, 192, 0.5)',
  },
  GOLD: {
    label: 'Gold',
    color: '#FFD700',
    bgColor: 'rgba(255, 215, 0, 0.1)',
    glow: '0 0 15px rgba(255, 215, 0, 0.6)',
  },
  PLATINUM: {
    label: 'Platinum',
    color: '#E5E4E2',
    bgColor: 'rgba(229, 228, 226, 0.15)',
    glow: '0 0 20px rgba(229, 228, 226, 0.7)',
  },
  DIAMOND: {
    label: 'Diamond',
    color: '#B9F2FF',
    bgColor: 'rgba(185, 242, 255, 0.2)',
    glow: '0 0 25px rgba(185, 242, 255, 0.8)',
  },
};

// Calculate total XP value of all badges
export const TOTAL_BADGE_XP = BADGES.reduce((sum, badge) => sum + badge.xpReward, 0);

// Badge statistics
export const BADGE_STATS = {
  total: BADGES.length,
  byTier: {
    BRONZE: BADGES.filter(b => b.tier === 'BRONZE').length,
    SILVER: BADGES.filter(b => b.tier === 'SILVER').length,
    GOLD: BADGES.filter(b => b.tier === 'GOLD').length,
    PLATINUM: BADGES.filter(b => b.tier === 'PLATINUM').length,
    DIAMOND: BADGES.filter(b => b.tier === 'DIAMOND').length,
  },
  byCategory: Object.fromEntries(
    Object.keys(CATEGORY_INFO).map(cat => [
      cat,
      BADGES.filter(b => b.category === cat as BadgeCategory).length,
    ])
  ) as Record<BadgeCategory, number>,
  secret: BADGES.filter(b => b.secret).length,
};
