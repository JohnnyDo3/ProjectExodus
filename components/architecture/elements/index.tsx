'use client'

import React from 'react'

// Import all element SVG mappings
import { COLUMN_ELEMENTS } from './columns'
import { ARCH_ELEMENTS } from './arches'
import { DOME_ELEMENTS } from './domes'
import { VAULT_ELEMENTS } from './vaults'
import { ROOF_ELEMENTS } from './roofs'
import { WINDOW_ELEMENTS } from './windows'
import { DOOR_ELEMENTS } from './doors'
import { DECORATIVE_ELEMENTS } from './decorative'
import { FACADE_ELEMENTS } from './facade'
import { RELIGIOUS_ELEMENTS } from './religious'
import { FORTIFICATION_ELEMENTS } from './fortification'
import { FLOOR_ELEMENTS } from './floor'
import { CEILING_ELEMENTS } from './ceiling'

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

  // Windows (13)
  ...WINDOW_ELEMENTS,

  // Doors (11)
  ...DOOR_ELEMENTS,

  // Decorative (14)
  ...DECORATIVE_ELEMENTS,

  // Facade (11)
  ...FACADE_ELEMENTS,

  // Religious (16)
  ...RELIGIOUS_ELEMENTS,

  // Fortification (5)
  ...FORTIFICATION_ELEMENTS,

  // Floor (20)
  ...FLOOR_ELEMENTS,

  // Ceiling (7)
  ...CEILING_ELEMENTS,
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
export * from './windows'
export * from './doors'
export * from './decorative'
export * from './facade'
export * from './religious'
export * from './fortification'
export * from './floor'
export * from './ceiling'
