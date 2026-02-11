'use client'

/**
 * Structural Engineering SVG Components - Index
 *
 * This index re-exports all structural engineering SVG components from the
 * main structural.tsx file. This ensures proper module resolution when
 * importing from '@/components/architecture/elements/structural'.
 */

// Re-export all structural engineering components from the main file
export * from '../structural'

// Also export the individual SVGs from this folder for direct access
export { HerringboneBrickPatternSVG } from './HerringboneBrickPatternSVG'
export { StoneAndChainHoopsSVG } from './StoneAndChainHoopsSVG'
