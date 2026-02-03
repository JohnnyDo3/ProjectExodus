/**
 * Architecture Comparison Sets
 *
 * Defines side-by-side comparisons for architectural elements.
 * Used by /architecture/compare routes.
 */

import { DoricColumnSVG, IonicColumnSVG, CorinthianColumnSVG } from '@/components/architecture/elements/columns'
import { PointedArchSVG, RoundArchSVG, HorseshoeArchSVG, OgeeArchSVG } from '@/components/architecture/elements/arches'
import { RoseWindowSVG, ClerestorySVG, StainedGlassSVG } from '@/components/architecture/elements/windows'

export interface ComparisonFeature {
  label: string
  values: Record<string, string> // elementId -> description
  highlighted?: boolean // Mark key distinguishing features
}

export interface ElementView {
  id: string
  label: string
  description?: string
  component: React.FC<{ showHalo?: boolean }>
}

export interface ComparisonElement {
  id: string
  name: string
  component: React.FC<{ showHalo?: boolean }> // Primary/default view
  views?: ElementView[] // Additional views for click-through learning
}

export interface ComparisonSet {
  id: string
  category: 'columns' | 'arches' | 'windows' | 'roofs' | 'mixed' | 'structural'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  title: string
  subtitle: string
  description?: string
  elements: ComparisonElement[]
  features: ComparisonFeature[]
  culturalContext?: string
  historicalTimeline?: string
  memoryTip?: string
  quizQuestions?: ComparisonQuizQuestion[]
  matchingGame?: MatchingGameData
}

export interface ComparisonQuizQuestion {
  id: string
  question: string
  type: 'multiple-choice' | 'match' | 'order'
  correctAnswer: string
  options?: string[]
  explanation?: string
}

export interface MatchingGameItem {
  id: string
  text: string
  correctElementId: string
}

export interface MatchingGameData {
  question: string
  items: MatchingGameItem[]
}

// ============================================================================
// GREEK COLUMN ORDERS - The Classic Comparison
// ============================================================================
export const greekColumnsComparison: ComparisonSet = {
  id: 'greek-columns',
  category: 'columns',
  difficulty: 'beginner',
  title: 'The Three Greek Orders',
  subtitle: 'Doric, Ionic, and Corinthian - How to tell them apart',
  description: 'The ancient Greeks developed three distinct column styles, each with its own proportions, decorative elements, and cultural associations. Learning to distinguish these is fundamental to reading Classical architecture.',

  elements: [
    { id: 'doric', name: 'Doric', component: DoricColumnSVG },
    { id: 'ionic', name: 'Ionic', component: IonicColumnSVG },
    { id: 'corinthian', name: 'Corinthian', component: CorinthianColumnSVG },
  ],

  features: [
    {
      label: 'Base',
      values: {
        doric: 'NO BASE - column sits directly on platform (stylobate)',
        ionic: 'Elaborate Attic base with torus and scotia moldings',
        corinthian: 'Similar to Ionic - ornate base with multiple moldings',
      },
      highlighted: true,
    },
    {
      label: 'Proportions',
      values: {
        doric: 'Stocky and muscular - 1:4 to 1:6 (height to diameter)',
        ionic: 'Slender and elegant - 1:9 ratio',
        corinthian: 'Tallest and most slender - 1:10+ ratio',
      },
    },
    {
      label: 'Flutes',
      values: {
        doric: '20 shallow flutes with sharp arrises (edges)',
        ionic: '24 deeper flutes separated by flat fillets',
        corinthian: '24 flutes like Ionic',
      },
    },
    {
      label: 'Capital',
      values: {
        doric: 'Simple echinus (cushion) topped by square abacus',
        ionic: 'Distinctive scroll volutes resembling ram\'s horns',
        corinthian: 'Elaborate carved acanthus leaves with small corner volutes',
      },
      highlighted: true,
    },
    {
      label: 'Character',
      values: {
        doric: 'Masculine, sturdy, military strength',
        ionic: 'Feminine, graceful, intellectual refinement',
        corinthian: 'Ornate, luxurious, imperial grandeur',
      },
    },
    {
      label: 'Entablature',
      values: {
        doric: 'Triglyphs and metopes in frieze',
        ionic: 'Continuous frieze, dentils under cornice',
        corinthian: 'Most ornate - modillions, acanthus, elaborate cornice',
      },
    },
    {
      label: 'Origin & Date',
      values: {
        doric: 'Mainland Greece - 7th century BCE (earliest)',
        ionic: 'Ionian Islands/Asia Minor - 6th century BCE',
        corinthian: 'Athens - 5th century BCE (latest, most evolved)',
      },
    },
    {
      label: 'Famous Example',
      values: {
        doric: 'Parthenon, Athens (447-432 BCE)',
        ionic: 'Erechtheion, Athens (421-406 BCE)',
        corinthian: 'Temple of Olympian Zeus, Athens (completed 131 CE)',
      },
    },
    {
      label: 'Roman Usage',
      values: {
        doric: 'Roman Doric - added base, became Tuscan order',
        ionic: 'Used extensively in Roman temples',
        corinthian: 'Romans\' favorite - used for grandest buildings',
      },
    },
  ],

  culturalContext: 'The three Greek orders represent an evolution in architectural sophistication and cultural values. The Doric order emerged first among the Dorian Greeks of mainland Greece, embodying their martial culture. The Ionic order developed in the Ionian colonies, reflecting their emphasis on grace and learning. The Corinthian order, invented in Athens, represented the height of Classical refinement and was later adopted enthusiastically by the Romans for their most important buildings.',

  historicalTimeline: 'Doric (700 BCE) → Ionic (600 BCE) → Corinthian (500 BCE) → Roman adaptations (100 BCE - 400 CE) → Renaissance revival (1400s) → Neoclassical (1700s-1800s) → Still used today in government buildings worldwide',

  memoryTip: '**D**oric = **D**irect (no base), **I**onic = **I**ntricate scrolls, **C**orinthian = **C**urly leaves',

  matchingGame: {
    question: 'Match each description to the correct Greek column order',
    items: [
      {
        id: 'no-base',
        text: 'No base - sits directly on platform',
        correctElementId: 'doric'
      },
      {
        id: 'scroll-volutes',
        text: 'Distinctive scroll volutes (ram\'s horns)',
        correctElementId: 'ionic'
      },
      {
        id: 'acanthus-leaves',
        text: 'Elaborate carved acanthus leaves',
        correctElementId: 'corinthian'
      }
    ]
  },

  quizQuestions: [
    {
      id: 'base-question',
      question: 'Which Greek order has NO BASE and sits directly on the platform?',
      type: 'multiple-choice',
      correctAnswer: 'doric',
      options: ['doric', 'ionic', 'corinthian'],
      explanation: 'The Doric order is the only Greek order without a base. The column shaft rises directly from the stylobate (platform). This contributes to its sturdy, grounded appearance.',
    },
    {
      id: 'capital-volutes',
      question: 'Which order features distinctive scroll volutes (spiral scrolls) on the capital?',
      type: 'multiple-choice',
      correctAnswer: 'ionic',
      options: ['doric', 'ionic', 'corinthian'],
      explanation: 'The Ionic capital is defined by its paired volutes (spiral scrolls) that resemble ram\'s horns. While Corinthian has small corner volutes, the Ionic volutes are the dominant feature.',
    },
    {
      id: 'acanthus-leaves',
      question: 'Which order has a capital decorated with carved acanthus leaves?',
      type: 'multiple-choice',
      correctAnswer: 'corinthian',
      options: ['doric', 'ionic', 'corinthian'],
      explanation: 'The Corinthian capital is distinguished by its elaborate carving of acanthus leaves (a Mediterranean plant). This ornate decoration made it the most luxurious of the three Greek orders.',
    },
    {
      id: 'historical-order',
      question: 'Arrange these orders from EARLIEST to LATEST in development:',
      type: 'order',
      correctAnswer: 'doric,ionic,corinthian',
      explanation: 'The orders developed sequentially: Doric (7th c. BCE), Ionic (6th c. BCE), Corinthian (5th c. BCE). Each represented increasing sophistication and decorative elaboration.',
    },
  ],
}

// ============================================================================
// ARCH EVOLUTION - How Arches Developed Across Cultures
// ============================================================================
export const archEvolutionComparison: ComparisonSet = {
  id: 'arch-evolution',
  category: 'arches',
  difficulty: 'intermediate',
  title: 'The Evolution of the Arch',
  subtitle: 'From Roman engineering to Gothic and Islamic innovations',
  description: 'The arch is one of humanity\'s greatest structural inventions. Watch how different cultures adapted and evolved this form for both engineering and aesthetic purposes.',

  elements: [
    { id: 'round', name: 'Round Arch', component: RoundArchSVG },
    { id: 'pointed', name: 'Pointed Arch', component: PointedArchSVG },
    { id: 'horseshoe', name: 'Horseshoe Arch', component: HorseshoeArchSVG },
    { id: 'ogee', name: 'Ogee Arch', component: OgeeArchSVG },
  ],

  features: [
    {
      label: 'Origin & Culture',
      values: {
        round: 'Ancient Rome, ~200 BCE - engineering innovation',
        pointed: 'Gothic Europe, ~1100 CE - structural breakthrough',
        horseshoe: 'Visigothic/Islamic, ~600 CE - cultural signature',
        ogee: 'Persian/Islamic, ~1200 CE → Gothic, ~1300 CE',
      },
      highlighted: true,
    },
    {
      label: 'Structural Advantage',
      values: {
        round: 'Distributes weight evenly - very stable',
        pointed: 'Concentrates forces vertically - allows taller buildings',
        horseshoe: 'Similar to round but more decorative',
        ogee: 'Primarily decorative - not structural improvement',
      },
      highlighted: true,
    },
    {
      label: 'Span Capability',
      values: {
        round: 'Limited span - wider arches need thicker supports',
        pointed: 'Greater span possible with less support',
        horseshoe: 'Similar to round arch',
        ogee: 'Moderate span - decorative form',
      },
    },
    {
      label: 'Height Potential',
      values: {
        round: 'Height limited by semicircular geometry',
        pointed: 'Can be made very tall - key to Gothic cathedrals',
        horseshoe: 'Similar height to round',
        ogee: 'Moderate height with elegant curves',
      },
    },
    {
      label: 'Best Applications',
      values: {
        round: 'Aqueducts, bridges, barrel vaults, arcades',
        pointed: 'Cathedral naves, large interior spaces, tall buildings',
        horseshoe: 'Mosques, courtyards, decorative gateways',
        ogee: 'Decorative facades, palace windows, ornamental gateways',
      },
    },
    {
      label: 'Visual Character',
      values: {
        round: 'Solid, stable, eternal - Roman power',
        pointed: 'Soaring, vertical, heavenly - Gothic aspiration',
        horseshoe: 'Embracing, welcoming - Islamic hospitality',
        ogee: 'Flowing, elegant, exotic - Eastern refinement',
      },
    },
    {
      label: 'Famous Example',
      values: {
        round: 'Pont du Gard aqueduct, France (19 BCE)',
        pointed: 'Notre-Dame Cathedral, Paris (1163-1345)',
        horseshoe: 'Great Mosque of Córdoba, Spain (784-987)',
        ogee: 'Doge\'s Palace, Venice (1340s)',
      },
    },
    {
      label: 'Cross-Cultural Influence',
      values: {
        round: 'Roman → Byzantine → Romanesque → Renaissance',
        pointed: 'Islamic pointed arches → Gothic Europe via Crusades',
        horseshoe: 'Visigothic Spain → Islamic → Mudéjar style',
        ogee: 'Persian → Islamic → Gothic (via Venice/trade routes)',
      },
    },
  ],

  culturalContext: 'The arch\'s evolution shows how engineering innovations spread and transform across cultures. Romans perfected the round arch for massive engineering projects. Islamic architects in the Middle East developed the pointed arch independently. When Crusaders returned from the Holy Land, they brought this innovation to Europe, where Gothic architects realized its structural potential - enabling the soaring cathedrals that defined the Middle Ages.',

  historicalTimeline: 'Round arch (Ancient Rome 200 BCE) → Horseshoe (Visigoths/Islam 600 CE) → Pointed arch develops independently in Islamic architecture (800s) → Gothic architects adopt pointed arch (1100s) → Ogee arrives via Islamic/Persian influence (1200s-1300s)',

  memoryTip: '**Round** = **R**oman, **Pointed** = Gothic **P**rayers reaching heaven, **Horseshoe** = **H**ugging (embracing form), **Ogee** = **O**rnamental double-curve',

  matchingGame: {
    question: 'Match each description to the correct arch type',
    items: [
      {
        id: 'roman-engineering',
        text: 'Ancient Rome - engineering innovation',
        correctElementId: 'round'
      },
      {
        id: 'gothic-structural',
        text: 'Gothic - allows taller buildings',
        correctElementId: 'pointed'
      },
      {
        id: 'islamic-cultural',
        text: 'Islamic - cultural signature',
        correctElementId: 'horseshoe'
      },
      {
        id: 'persian-decorative',
        text: 'Persian/Islamic - decorative curves',
        correctElementId: 'ogee'
      }
    ]
  },
}

// ============================================================================
// SACRED WINDOWS - Light in Religious Architecture
// ============================================================================
export const sacredWindowsComparison: ComparisonSet = {
  id: 'sacred-windows',
  category: 'windows',
  difficulty: 'intermediate',
  title: 'Sacred Light: Cathedral Windows',
  subtitle: 'Rose, Clerestory, and Stained Glass - Divine illumination',
  description: 'In medieval cathedrals, windows weren\'t just openings - they were theology in glass, transforming physical light into spiritual illumination.',

  elements: [
    { id: 'rose', name: 'Rose Window', component: RoseWindowSVG },
    { id: 'clerestory', name: 'Clerestory', component: ClerestorySVG },
    { id: 'stained', name: 'Stained Glass', component: StainedGlassSVG },
  ],

  features: [
    {
      label: 'Location in Church',
      values: {
        rose: 'West facade (main entrance) or transept ends - focal point',
        clerestory: 'High windows in nave walls - above the arcade',
        stained: 'Anywhere - aisles, chapels, choir - tells stories',
      },
      highlighted: true,
    },
    {
      label: 'Primary Purpose',
      values: {
        rose: 'Symbolic centerpiece - represents divine perfection/cosmos',
        clerestory: 'Illumination - flood nave with natural light',
        stained: 'Education - "Bible for the illiterate" in colored glass',
      },
      highlighted: true,
    },
    {
      label: 'Design Pattern',
      values: {
        rose: 'Circular with radiating petals/tracery - geometric perfection',
        clerestory: 'Row of tall, narrow windows - often lancet style',
        stained: 'Narrative panels with biblical scenes and saints',
      },
    },
    {
      label: 'Light Quality',
      values: {
        rose: 'Spectacular colored rays - dramatic afternoon light',
        clerestory: 'Bright, diffuse overhead light - illuminates entire space',
        stained: 'Rich colored light - creates jewel-like interior',
      },
    },
    {
      label: 'Structural Innovation',
      values: {
        rose: 'Requires strong stone tracery to support glass weight',
        clerestory: 'Made possible by pointed arches + flying buttresses',
        stained: 'Lead came technique allows large glass areas',
      },
    },
    {
      label: 'Symbolism',
      values: {
        rose: 'Mary (Virgin), Christ, divine perfection, wheel of fortune',
        clerestory: 'Heaven\'s light entering earthly realm',
        stained: 'Biblical narratives, saints\' lives, moral lessons',
      },
    },
    {
      label: 'Evolution',
      values: {
        rose: 'Romanesque small → Gothic enormous (Chartres: 43 ft diameter!)',
        clerestory: 'Romanesque small openings → Gothic floor-to-ceiling',
        stained: 'Early simple → High Gothic elaborate narrative cycles',
      },
    },
    {
      label: 'Famous Example',
      values: {
        rose: 'Notre-Dame north rose (1250s) - 43 ft, 80 panels',
        clerestory: 'Chartres Cathedral (1194-1220) - revolutionary height',
        stained: 'Sainte-Chapelle, Paris (1248) - 15 windows, 1,113 scenes!',
      },
    },
  ],

  culturalContext: 'Medieval cathedral windows served multiple purposes: practical (illumination), theological (divine light symbolism), and educational (teaching Bible stories to illiterate congregations). Abbot Suger of Saint-Denis pioneered this "metaphysics of light" in the 1140s, believing colored light brought worshippers closer to God. The technology of stained glass - melting sand with metal oxides for color, cutting shapes, joining with lead - was one of the most sophisticated crafts of the Middle Ages.',

  memoryTip: '**R**ose = **R**ound and radial, **C**lerestory = **C**lear (high) light, **S**tained = **S**tories in glass',

  matchingGame: {
    question: 'Match each description to the correct window type',
    items: [
      {
        id: 'west-facade',
        text: 'West facade - symbolic centerpiece',
        correctElementId: 'rose'
      },
      {
        id: 'high-walls',
        text: 'High walls - floods nave with light',
        correctElementId: 'clerestory'
      },
      {
        id: 'biblical-stories',
        text: 'Biblical stories - Bible for illiterate',
        correctElementId: 'stained'
      }
    ]
  },
}

// ============================================================================
// COMPARISON SETS REGISTRY
// ============================================================================
import { STRUCTURAL_COMPARISON_SETS } from './structuralComparisonSets'

export const COMPARISON_SETS: Record<string, ComparisonSet> = {
  'greek-columns': greekColumnsComparison,
  'arch-evolution': archEvolutionComparison,
  'sacred-windows': sacredWindowsComparison,
  // Structural engineering sets are merged in
  ...STRUCTURAL_COMPARISON_SETS,
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getComparisonSetById(id: string): ComparisonSet | undefined {
  return COMPARISON_SETS[id]
}

export function getAllComparisonSets(): ComparisonSet[] {
  return Object.values(COMPARISON_SETS)
}

export function getComparisonSetsByCategory(category: ComparisonSet['category']): ComparisonSet[] {
  return Object.values(COMPARISON_SETS).filter(set => set.category === category)
}

export function getComparisonSetsByDifficulty(difficulty: ComparisonSet['difficulty']): ComparisonSet[] {
  return Object.values(COMPARISON_SETS).filter(set => set.difficulty === difficulty)
}

export function getComparisonSetIds(): string[] {
  return Object.keys(COMPARISON_SETS)
}

// =============================================================================
// STRUCTURAL ENGINEERING SETS (imported from structuralComparisonSets.ts)
// =============================================================================

export {
  STRUCTURAL_COMPARISON_SETS,
  getAllStructuralComparisonSets,
  getStructuralComparisonSetById,
  getStructuralSetsByDifficulty,
  bracingTypesComparison,
  trussTypesComparison,
  foundationTypesComparison,
  loadTypesComparison,
  advancedBracingComparison,
  advancedTrussComparison,
  advancedFoundationsComparison,
  environmentalLoadsComparison,
} from './structuralComparisonSets'
