'use client'

// =============================================================================
// STRUCTURAL ENGINEERING SVG COMPONENTS - BARREL EXPORT
// =============================================================================
// This file re-exports all structural components for backward compatibility.
// The components are now organized into category-specific files:
// - shared.tsx: HaloFilter, SVGProps
// - bracing.tsx: Bracing system SVGs
// - trusses.tsx: Truss type SVGs
// - foundations.tsx: Foundation type SVGs
// - loads.tsx: Load type SVGs (main, symbolic, effect views)
// =============================================================================

// Re-export shared utilities
export { HaloFilter, type SVGProps } from './shared'

// Re-export all bracing components
export {
  DiagonalBracingSVG,
  XBracingSVG,
  KBracingSVG,
  ChevronBracingSVG,
  InvertedChevronBracingSVG,
  KneeBracingSVG,
  EccentricBracingSVG,
  MomentFrameSVG,
  ZipperBracingSVG,
  BucklingRestrainedBraceSVG,
  BRACING_ELEMENTS,
} from './bracing'

// Re-export all truss components
export {
  KingPostTrussSVG,
  QueenPostTrussSVG,
  PrattTrussSVG,
  HoweTrussSVG,
  WarrenTrussSVG,
  FinkTrussSVG,
  BowstringTrussSVG,
  VierendeelTrussSVG,
  LatticeTrussSVG,
  BaltimoreTrussSVG,
  ScissorsTrussSVG,
  GambrelTrussSVG,
  TRUSS_ELEMENTS,
} from './trusses'

// Re-export all foundation components
export {
  SpreadFootingSVG,
  StripFootingSVG,
  CombinedFootingSVG,
  MatFoundationSVG,
  DrivenPileSVG,
  BoredPileSVG,
  CaissonFoundationSVG,
  FloatingFoundationSVG,
  RubbleTrenchSVG,
  HelicalPileSVG,
  MicropileSVG,
  FOUNDATION_ELEMENTS,
} from './foundations'

// Re-export all load components (main, symbolic, and effect views)
export {
  // Main views
  DeadLoadSVG,
  LiveLoadSVG,
  WindLoadSVG,
  SeismicLoadSVG,
  SnowLoadSVG,
  RainLoadSVG,
  ImpactLoadSVG,
  ThermalLoadSVG,
  HydrostaticLoadSVG,
  EarthPressureLoadSVG,
  BuoyancyLoadSVG,
  // Symbolic views
  DeadLoadSymbolicSVG,
  LiveLoadSymbolicSVG,
  WindLoadSymbolicSVG,
  SeismicLoadSymbolicSVG,
  SnowLoadSymbolicSVG,
  RainLoadSymbolicSVG,
  ImpactLoadSymbolicSVG,
  ThermalLoadSymbolicSVG,
  HydrostaticLoadSymbolicSVG,
  EarthPressureSymbolicSVG,
  BuoyancySymbolicSVG,
  // Effect views
  DeadLoadEffectSVG,
  LiveLoadEffectSVG,
  WindLoadEffectSVG,
  SeismicLoadEffectSVG,
  SnowLoadEffectSVG,
  RainLoadEffectSVG,
  ImpactLoadEffectSVG,
  ThermalLoadEffectSVG,
  HydrostaticLoadEffectSVG,
  EarthPressureEffectSVG,
  BuoyancyEffectSVG,
  // Export maps
  LOAD_ELEMENTS,
  LOAD_SYMBOLIC_VIEWS,
  LOAD_EFFECT_VIEWS,
} from './loads'

// Re-export additional standalone SVGs from this folder
export { HerringboneBrickPatternSVG } from './HerringboneBrickPatternSVG'
export { StoneAndChainHoopsSVG } from './StoneAndChainHoopsSVG'

// Import the element maps for the combined export
import { BRACING_ELEMENTS } from './bracing'
import { TRUSS_ELEMENTS } from './trusses'
import { FOUNDATION_ELEMENTS } from './foundations'
import { LOAD_ELEMENTS } from './loads'

// Combined export of all structural elements
export const STRUCTURAL_ELEMENTS = {
  ...BRACING_ELEMENTS,
  ...TRUSS_ELEMENTS,
  ...FOUNDATION_ELEMENTS,
  ...LOAD_ELEMENTS,
}
