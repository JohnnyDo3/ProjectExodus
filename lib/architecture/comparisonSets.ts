/**
 * Architectural Element Comparison Sets
 *
 * Defines side-by-side comparisons for architectural learning.
 * Each set compares related elements to help students understand
 * relationships, evolution, and distinguishing features.
 */

import { DoricColumnSVG, IonicColumnSVG, CorinthianColumnSVG } from '@/components/architecture/elements/columns'
import { PointedArchSVG, RoundArchSVG, HorseshoeArchSVG, OgeeArchSVG } from '@/components/architecture/elements/arches'
import { RoseWindowSVG, ClerestorySVG, StainedGlassSVG } from '@/components/architecture/elements/windows'

export interface ComparisonFeature {
  label: string
  [key: string]: string | boolean | undefined
  highlighted?: boolean
}

export interface ComparisonElement {
  id: string
  name: string
  component: React.FC<{ showHalo?: boolean }>
}

export interface ComparisonSet {
  id: string
  category: 'columns' | 'arches' | 'windows' | 'roofs' | 'mixed'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  title: string
  subtitle: string
  elements: ComparisonElement[]
  features: ComparisonFeature[]
  culturalContext?: string
  memoryTip?: string
}

// =============================================================================
// GREEK COLUMN ORDERS
// =============================================================================

export const greekColumnsComparison: ComparisonSet = {
  id: 'greek-columns',
  category: 'columns',
  difficulty: 'beginner',
  title: 'The Three Greek Orders',
  subtitle: 'How to tell Doric, Ionic, and Corinthian apart',
  elements: [
    { id: 'doric', name: 'Doric', component: DoricColumnSVG },
    { id: 'ionic', name: 'Ionic', component: IonicColumnSVG },
    { id: 'corinthian', name: 'Corinthian', component: CorinthianColumnSVG },
  ],
  features: [
    {
      label: 'Base',
      doric: 'NO BASE - sits directly on platform',
      ionic: 'Elaborate Attic base with moldings',
      corinthian: 'Similar to Ionic - ornate base',
      highlighted: true,
    },
    {
      label: 'Proportions',
      doric: 'Stocky (1:4-6 height to diameter)',
      ionic: 'Slender (1:9)',
      corinthian: 'Tallest (1:10+)',
    },
    {
      label: 'Flutes',
      doric: '20 shallow flutes, sharp edges',
      ionic: '24 deeper flutes with flat fillets',
      corinthian: '24 flutes like Ionic',
    },
    {
      label: 'Capital',
      doric: 'Simple echinus (cushion) + abacus',
      ionic: 'Scroll volutes (ram\'s horns)',
      corinthian: 'Ornate acanthus leaves + small volutes',
      highlighted: true,
    },
    {
      label: 'Character',
      doric: 'Masculine, sturdy, military',
      ionic: 'Feminine, elegant, refined',
      corinthian: 'Ornate, luxurious, decorative',
    },
    {
      label: 'Period',
      doric: 'Earliest - 7th century BCE',
      ionic: '6th century BCE',
      corinthian: 'Latest - 5th century BCE',
    },
    {
      label: 'Famous Example',
      doric: 'Parthenon (Athens)',
      ionic: 'Erechtheion (Athens)',
      corinthian: 'Temple of Olympian Zeus (Athens)',
    },
  ],
  culturalContext: 'The Greeks developed these three orders in sequence: Doric (earliest, 7th century BCE) → Ionic (6th century BCE) → Corinthian (5th century BCE). Each represented different aesthetic values and was chosen for specific building types. Doric was used for temples to male gods (strength), Ionic for female deities (elegance), and Corinthian for the most important, luxurious buildings.',
  memoryTip: '**D**oric = **D**irect (no base), **I**onic = **I**ntricate (scroll volutes), **C**orinthian = **C**urly (acanthus leaves)',
}

// =============================================================================
// ARCH EVOLUTION
// =============================================================================

export const archEvolutionComparison: ComparisonSet = {
  id: 'arch-evolution',
  category: 'arches',
  difficulty: 'intermediate',
  title: 'How Arches Evolved',
  subtitle: 'From Roman engineering to Gothic innovation',
  elements: [
    { id: 'round', name: 'Round Arch', component: RoundArchSVG },
    { id: 'pointed', name: 'Pointed Arch', component: PointedArchSVG },
    { id: 'ogee', name: 'Ogee Arch', component: OgeeArchSVG },
  ],
  features: [
    {
      label: 'Origin',
      round: 'Ancient Rome, ~200 BCE',
      pointed: 'Gothic Europe, ~1100 CE',
      ogee: 'Islamic/Persian, adopted by Gothic',
      highlighted: true,
    },
    {
      label: 'Structural Advantage',
      round: 'Distributes weight evenly in semicircle',
      pointed: 'Focuses weight to specific points - allows taller buildings',
      ogee: 'Decorative - not structural improvement',
      highlighted: true,
    },
    {
      label: 'Span Capability',
      round: 'Limited - wider spans need more support',
      pointed: 'Greater spans possible with less material',
      ogee: 'Similar to pointed arch',
    },
    {
      label: 'Height Potential',
      round: 'Height = width of span (semicircle)',
      pointed: 'Can be TALLER than span width',
      ogee: 'Can be very tall',
    },
    {
      label: 'Best For',
      round: 'Aqueducts, bridges, vaults, arcades',
      pointed: 'Cathedrals, large interior spaces, flying buttresses',
      ogee: 'Decorative facades, gateways, palace entrances',
    },
    {
      label: 'Engineering',
      round: 'All stones compressed equally',
      pointed: 'Thrusts directed downward more efficiently',
      ogee: 'Similar to pointed with added curves',
    },
    {
      label: 'Famous Example',
      round: 'Roman Colosseum, Pont du Gard aqueduct',
      pointed: 'Notre-Dame Cathedral, Westminster Abbey',
      ogee: 'Doge\'s Palace (Venice), Taj Mahal',
    },
  ],
  culturalContext: 'The pointed arch revolutionized architecture. Romans mastered the round arch (brilliant engineering for their time), but Gothic builders discovered that pointed arches transferred weight more efficiently. This allowed them to build taller cathedrals with larger windows and less material. The ogee arch, borrowed from Islamic architecture, added decorative flourish while maintaining structural benefits.',
  memoryTip: 'Round = Roman roads (ancient engineering), Pointed = Praying hands (Gothic cathedrals), Ogee = Onion dome (Eastern influence)',
}

// =============================================================================
// SACRED WINDOWS
// =============================================================================

export const sacredWindowsComparison: ComparisonSet = {
  id: 'sacred-windows',
  category: 'windows',
  difficulty: 'intermediate',
  title: 'Sacred Light: Cathedral Windows',
  subtitle: 'Rose, Clerestory, and Stained Glass compared',
  elements: [
    { id: 'rose', name: 'Rose Window', component: RoseWindowSVG },
    { id: 'clerestory', name: 'Clerestory', component: ClerestorySVG },
    { id: 'stained', name: 'Stained Glass', component: StainedGlassSVG },
  ],
  features: [
    {
      label: 'Shape',
      rose: 'Circular with radiating pattern (like a rose)',
      clerestory: 'Rectangular or arched, arranged in rows',
      stained: 'Varies - often arched or rectangular panels',
      highlighted: true,
    },
    {
      label: 'Location',
      rose: 'West facade (main entrance) or transept ends',
      clerestory: 'HIGH in nave walls, above arcade',
      stained: 'Throughout church - windows, lancets, rose centers',
    },
    {
      label: 'Purpose',
      rose: 'Symbolic (divine light, heavenly perfection) + focal point',
      clerestory: 'FLOOD interior with light from above',
      stained: 'Tell biblical stories to illiterate congregations',
      highlighted: true,
    },
    {
      label: 'Light Effect',
      rose: 'Dramatic colored beams radiating into nave',
      clerestory: 'Bright natural light flooding sanctuary',
      stained: 'Filtered colored light creating sacred atmosphere',
    },
    {
      label: 'Tracery',
      rose: 'Complex radiating stonework (petals, spokes)',
      clerestory: 'Simple or none - plain rectangular frames',
      stained: 'Varies - can be very ornate Gothic tracery',
    },
    {
      label: 'Size',
      rose: 'MASSIVE - up to 40+ feet diameter',
      clerestory: 'Long horizontal rows of smaller windows',
      stained: 'Ranges from small to very large',
    },
    {
      label: 'Period',
      rose: 'Gothic innovation (12th-13th century)',
      clerestory: 'Ancient (Egyptian temples) → Gothic cathedrals',
      stained: 'Medieval perfection (12th-16th century)',
    },
    {
      label: 'Famous Example',
      rose: 'Notre-Dame de Paris, Chartres Cathedral',
      clerestory: 'Most Gothic cathedrals, Sainte-Chapelle',
      stained: 'Chartres, Sainte-Chapelle, Canterbury',
    },
  ],
  culturalContext: 'Gothic cathedrals used all three window types together: Rose windows dominated the facades (symbolizing divine perfection), clerestory windows flooded the interior with light (representing heavenly illumination), and stained glass throughout told biblical stories in glowing color. Together, they transformed stone buildings into ethereal spaces of colored light.',
  memoryTip: 'Rose = Round & Radial (flower-like), Clerestory = Clear story (upper level floods light), Stained = Stories in glass',
}

// =============================================================================
// CULTURAL ARCH VARIATIONS
// =============================================================================

export const culturalArchesComparison: ComparisonSet = {
  id: 'cultural-arches',
  category: 'arches',
  difficulty: 'intermediate',
  title: 'Arches Around the World',
  subtitle: 'How different cultures shaped the arch',
  elements: [
    { id: 'round', name: 'Roman Round', component: RoundArchSVG },
    { id: 'horseshoe', name: 'Islamic Horseshoe', component: HorseshoeArchSVG },
    { id: 'pointed', name: 'Gothic Pointed', component: PointedArchSVG },
  ],
  features: [
    {
      label: 'Culture',
      round: 'Ancient Roman civilization',
      horseshoe: 'Islamic Spain (Umayyad)',
      pointed: 'Medieval Christian Europe',
      highlighted: true,
    },
    {
      label: 'Distinctive Feature',
      round: 'Perfect semicircle - mathematical precision',
      horseshoe: 'Curves INWARD past vertical - unique shape',
      pointed: 'Two curves meet at peak - distributes weight',
      highlighted: true,
    },
    {
      label: 'Symbolism',
      round: 'Roman order, engineering prowess, empire',
      horseshoe: 'Islamic paradise, protection, welcome',
      pointed: 'Reaching toward heaven, aspiration',
    },
    {
      label: 'Materials',
      round: 'Stone, brick, concrete (Roman innovation)',
      horseshoe: 'Alternating stone/brick (ablaq pattern)',
      pointed: 'Cut stone with precise geometry',
    },
    {
      label: 'Context',
      round: 'Aqueducts, forums, triumphal arches, bridges',
      horseshoe: 'Mosques (Córdoba), palaces, courtyards',
      pointed: 'Cathedrals, monasteries, universities',
    },
    {
      label: 'Spread',
      round: 'Roman Empire → Renaissance revival',
      horseshoe: 'Spain, North Africa, Morocco',
      pointed: 'Originated Middle East → Europe → worldwide',
    },
    {
      label: 'Famous Example',
      round: 'Pont du Gard (France), Colosseum',
      horseshoe: 'Great Mosque of Córdoba',
      pointed: 'Notre-Dame, Westminster Abbey',
    },
  ],
  culturalContext: 'Each culture adapted the arch to express their values: Romans used the round arch to demonstrate engineering mastery and imperial power. Islamic architects created the horseshoe arch as a welcoming, protective form (like embracing arms). Gothic Christians pointed arches skyward, symbolizing spiritual aspiration toward God.',
  memoryTip: 'Roman = Rational (perfect circle), Islamic = Inviting (horseshoe curves in), Gothic = God-ward (pointing up)',
}

// =============================================================================
// COMPARISON SETS REGISTRY
// =============================================================================

export const COMPARISON_SETS: Record<string, ComparisonSet> = {
  'greek-columns': greekColumnsComparison,
  'arch-evolution': archEvolutionComparison,
  'sacred-windows': sacredWindowsComparison,
  'cultural-arches': culturalArchesComparison,
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getComparisonSetById(id: string): ComparisonSet | undefined {
  return COMPARISON_SETS[id]
}

export function getComparisonSetsByCategory(category: string): ComparisonSet[] {
  return Object.values(COMPARISON_SETS).filter(set => set.category === category)
}

export function getComparisonSetsByDifficulty(difficulty: string): ComparisonSet[] {
  return Object.values(COMPARISON_SETS).filter(set => set.difficulty === difficulty)
}

export function getAllComparisonSets(): ComparisonSet[] {
  return Object.values(COMPARISON_SETS)
}

export function getComparisonSetIds(): string[] {
  return Object.keys(COMPARISON_SETS)
}
