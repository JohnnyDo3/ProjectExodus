'use client'

import React from 'react'

// Import all element SVG mappings
import { COLUMN_ELEMENTS } from './columns'
import { ARCH_ELEMENTS } from './arches'
import { DOME_ELEMENTS } from './domes'
import { VAULT_ELEMENTS } from './vaults'
import { ROOF_ELEMENTS } from './roofs'

interface SVGProps {
  showHalo?: boolean
}

// Combined element lookup - maps elementId to specific SVG component
export const ELEMENT_SVGS: Record<string, React.FC<SVGProps>> = {
  // Columns (8)
  ...COLUMN_ELEMENTS,

  // Arches (8)
  ...ARCH_ELEMENTS,

  // Domes (5)
  ...DOME_ELEMENTS,

  // Vaults (4)
  ...VAULT_ELEMENTS,

  // Roofs (7)
  ...ROOF_ELEMENTS,
  // ...WINDOW_ELEMENTS,
  // ...DOOR_ELEMENTS,
  // ...DECORATIVE_ELEMENTS,
  // ...FACADE_ELEMENTS,
  // ...RELIGIOUS_ELEMENTS,
  // ...FORTIFICATION_ELEMENTS,
  // ...FLOOR_ELEMENTS,
  // ...CEILING_ELEMENTS,
  // ...WALL_ELEMENTS,
  // ...INTERIOR_ELEMENTS,
  // ...GARDEN_ELEMENTS,
  // ...URBAN_ELEMENTS,
  // ...SPECIALIZED_ELEMENTS,
}

// Helper function to get element SVG by ID
export function getElementSVG(elementId: string): React.FC<SVGProps> | null {
  return ELEMENT_SVGS[elementId] || null
}

// Check if an element has a specific SVG
export function hasElementSVG(elementId: string): boolean {
  return elementId in ELEMENT_SVGS
}

// Get list of all element IDs with specific SVGs
export function getElementsWithSVGs(): string[] {
  return Object.keys(ELEMENT_SVGS)
}

// Re-export individual category exports for direct access
export * from './columns'
export * from './arches'
export * from './domes'
export * from './vaults'
export * from './roofs'
