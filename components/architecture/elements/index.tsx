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
import { WALL_ELEMENTS } from './wall'
import { INTERIOR_ELEMENTS } from './interior'
import { GARDEN_ELEMENTS } from './garden'
import { URBAN_ELEMENTS } from './urban'
import { SPECIALIZED_ELEMENTS } from './specialized'

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

  // Wall (8)
  ...WALL_ELEMENTS,

  // Interior (9)
  ...INTERIOR_ELEMENTS,

  // Garden (14)
  ...GARDEN_ELEMENTS,

  // Urban (10)
  ...URBAN_ELEMENTS,

  // Specialized (32)
  ...SPECIALIZED_ELEMENTS,
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
// Note: Some modules have conflicting exports (FountainSVG, CapitalSVG, ConsoleSVG, CorniceSVG)
// We use explicit re-exports to resolve ambiguity

export * from './columns'
export * from './arches'
export * from './domes'
export * from './vaults'
export * from './roofs'
export * from './windows'
export * from './doors'
export * from './religious'
export * from './fortification'
export * from './floor'
export * from './ceiling'
export * from './wall'
export * from './interior'

// Decorative - has CorniceSVG, CapitalSVG, ConsoleSVG (keep these from decorative)
export {
  DECORATIVE_ELEMENTS,
  AcroterionSVG,
  BalusterSVG,
  BalustradeSVG,
  CapitalSVG,
  BracketSVG,
  CartoucheSVG,
  ConsoleSVG,
  CorniceSVG,
  CrestingSVG,
  FestoonSVG,
  FinialSVG,
  FriezeSVG,
  GargoyleSVG,
  GrotesqueSVG,
  MedallionSVG,
  MoldingSVG,
  ParapetSVG,
  PinnacleSVG,
} from './decorative'

// Facade - exclude CorniceSVG (already exported from decorative)
export {
  FACADE_ELEMENTS,
  AwningSVG,
  BayWindowSVG,
  CanopySVG,
  EntablatureSVG,
  FacadeSVG,
  LoggiaSVG,
  MarqueeSVG,
  PorticoSVG,
  StorefrontSVG,
  VerandaSVG,
  // CorniceSVG excluded - already exported from decorative
} from './facade'

// Garden - has FountainSVG (keep from garden)
export {
  GARDEN_ELEMENTS,
  ArborSVG,
  BenchSVG,
  FollySVG,
  FountainSVG,
  GazeboSVG,
  GrottoSVG,
  HaHaSVG,
  ObeliskSVG,
  PagodaSVG,
  ParterreSVG,
  PergolaSVG,
  SundialSVG,
  TopiarySVG,
  TrellisSVG,
} from './garden'

// Urban - exclude FountainSVG (already exported from garden)
export {
  URBAN_ELEMENTS,
  ArcadeSVG,
  BoulevardSVG,
  BridgeSVG,
  KioskSVG,
  PlazaSVG,
  PromenadeSVG,
  SquareSVG,
  StreetSVG,
  WaterfrontSVG,
  // FountainSVG excluded - already exported from garden
} from './urban'

// Specialized - exclude CapitalSVG, ConsoleSVG (already exported from decorative)
export {
  SPECIALIZED_ELEMENTS,
  AbutmentSVG,
  AmbulatorySVG,
  BalconySVG,
  BasementSVG,
  ChimneySVG,
  CopingSVG,
  EaveSVG,
  GutterSVG,
  JambSVG,
  JoistSVG,
  LouverSVG,
  NewelSVG,
  PedestalSVG,
  PierSVG,
  PillarSVG,
  QuoinSVG,
  RafterSVG,
  RailSVG,
  RevealSVG,
  RidgepoleSVG,
  RiserSVG,
  SillSVG,
  SoffitSVG,
  SpandrelSVG,
  StaircaseSVG,
  StrutSVG,
  StringCourseSVG,
  TrussSVG,
  TurretSVG,
  WainscotSVG,
  // CapitalSVG excluded - already exported from decorative
  // ConsoleSVG excluded - already exported from decorative
} from './specialized'
