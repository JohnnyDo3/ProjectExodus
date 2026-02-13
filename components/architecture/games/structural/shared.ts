/**
 * Shared utilities for structural engineering games
 */

import {
  getAllStructuralComparisonSets,
  bracingTypesComparison,
  trussTypesComparison,
  foundationTypesComparison,
  loadTypesComparison,
} from '@/lib/architecture/structuralComparisonSets'

// Re-export for components that need direct access
export { getAllStructuralComparisonSets }
export type { ComparisonSet } from '@/lib/architecture/comparisonSets'

// All structural comparison sets for the games
export const STRUCTURAL_SETS = [
  bracingTypesComparison,
  trussTypesComparison,
  foundationTypesComparison,
  loadTypesComparison,
]

// Element type for games
export interface StructuralElement {
  id: string
  name: string
  component: React.FC<{ showHalo?: boolean }>
  category: string
  categoryName: string
}

// Flatten all elements from all sets
export function getAllStructuralElements(): StructuralElement[] {
  const elements: StructuralElement[] = []

  STRUCTURAL_SETS.forEach(set => {
    set.elements.forEach(el => {
      elements.push({
        id: el.id,
        name: el.name,
        component: el.component,
        category: set.id,
        categoryName: set.title,
      })
    })
  })

  return elements
}

// Common game props
export interface GameProps {
  onBack: () => void
}
