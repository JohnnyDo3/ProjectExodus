/**
 * Structural Engineering Games - Barrel Export
 */

// Game components
export { FlashcardGame } from './FlashcardGame'
export { MatchingGame } from './MatchingGame'
export { ComparisonGame } from './ComparisonGame'
export { DiagramBuilder } from './DiagramBuilder'
export { ExploreMode } from './ExploreMode'

// Shared utilities
export {
  STRUCTURAL_SETS,
  getAllStructuralElements,
  getAllStructuralComparisonSets,
  type StructuralElement,
  type GameProps,
  type ComparisonSet,
} from './shared'
