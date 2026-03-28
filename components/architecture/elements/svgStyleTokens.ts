/**
 * SVG Style Tokens for Architectural Element Illustrations
 *
 * Centralized design tokens that define the 4-tier visual hierarchy
 * used across all 182+ architectural SVG components.
 *
 * VISUAL HIERARCHY (from background to foreground):
 *
 *   1. CONTEXT_FAR   — Distant environment: landscape, far buildings, sky
 *                       Long dashes, very faint, thin strokes
 *
 *   2. CONTEXT_NEAR  — Connected structure: bearing walls, adjacent columns,
 *                       the entablature above, the foundation below
 *                       Standard hidden-line dashes, moderate opacity
 *
 *   3. PRIMARY        — The focal element itself: bold solid strokes,
 *                       full opacity, round linecaps for organic feel
 *
 *   4. DETAIL         — Surface texture, joints, ornament ON the primary:
 *                       solid strokes (never dashed — this is what
 *                       distinguishes them from context), moderate opacity
 *
 *   5. EFFECTS        — Atmospheric: light beams, water, dust motes, shadows
 *                       Dotted/short-dash patterns, ultra-low opacity,
 *                       may use fill instead of stroke
 *
 * PRINCIPLES:
 * - All strokes use "currentColor" — never hardcoded colors
 * - All fills are "none" except effects (which may use "currentColor" at low opacity)
 * - strokeLinecap="round" everywhere for the hand-drawn architectural sketch feel
 * - Context uses dashes; Detail uses solid — this is the key distinction
 */

// ─── CONTEXT: FAR ──────────────────────────────────────────────────────────────
// Distant environment that establishes the setting but is NOT structurally
// connected to the primary element. Examples: distant skyline, landscape,
// far buildings, atmospheric depth cues.

export const CONTEXT_FAR = {
  /** Long dash with generous gaps — reads as "far away" */
  dash: '4 3',
  /** Very faint — should barely register */
  opacity: 0.2,
  /** Thin strokes — less visual weight than near context */
  strokeWidth: 0.5,
  /** Even fainter sub-elements within far context */
  opacitySubtle: 0.12,
  strokeWidthFine: 0.3,
} as const

// ─── CONTEXT: NEAR ─────────────────────────────────────────────────────────────
// Structure directly connected to or supporting the primary element.
// Examples: the wall a buttress leans against, adjacent columns in a colonnade,
// the entablature above a column, foundation below.

export const CONTEXT_NEAR = {
  /** Standard architectural hidden-line dash */
  dash: '3 2',
  /** Clearly visible but subordinate to primary */
  opacity: 0.4,
  /** Moderate weight — heavier than far context */
  strokeWidth: 0.7,
  /** For secondary near-context elements */
  opacitySubtle: 0.28,
  strokeWidthFine: 0.5,
} as const

// ─── PRIMARY ───────────────────────────────────────────────────────────────────
// The architectural element being illustrated. Bold, solid, commanding.
// ALWAYS solid lines (no dashes). ALWAYS full opacity on main outlines.

export const PRIMARY = {
  /** Heaviest emphasis — main structural outlines */
  strokeWidthHeavy: 3.0,
  /** Strong outlines — secondary structural lines */
  strokeWidthBold: 2.0,
  /** Standard primary weight */
  strokeWidth: 1.5,
  /** Lighter primary lines (inner structure) */
  strokeWidthLight: 1.0,
  /** Full visibility */
  opacity: 1,
  /** Organic hand-drawn feel */
  strokeLinecap: 'round' as const,
} as const

// ─── DETAIL ────────────────────────────────────────────────────────────────────
// Surface treatment, texture, joints, ornamental detail ON the primary element.
// KEY RULE: Details are ALWAYS solid strokes (never dashed).
// This is what visually distinguishes them from context lines.
// They "belong to" the primary element — they're on its surface.

export const DETAIL = {
  /** Standard detail weight */
  strokeWidth: 0.8,
  /** Fine detail (individual stones, subtle texture) */
  strokeWidthFine: 0.5,
  /** Coarser detail (molding profiles, major joints) */
  strokeWidthBold: 1.2,
  /** Clearly visible — higher than context to show ownership */
  opacity: 0.55,
  /** For very subtle surface texture */
  opacitySubtle: 0.35,
  /** For prominent detail features */
  opacityStrong: 0.7,
} as const

// ─── EFFECTS ───────────────────────────────────────────────────────────────────
// Atmospheric and environmental effects: light beams, water spray,
// dust motes, cast shadows, colored light through windows.
// These are the only elements that may use fill="currentColor".

export const EFFECTS = {
  /** Short dotted pattern — reads as immaterial/ephemeral */
  dash: '2 3',
  /** Very thin — atmospheric, not structural */
  strokeWidth: 0.4,
  /** Subtle presence */
  opacity: 0.15,
  /** For slightly more visible effects (water streams) */
  opacityModerate: 0.3,
  /** For filled elements (dust motes, light pools) */
  fillOpacity: 0.08,
  /** For more visible filled effects */
  fillOpacityStrong: 0.15,
} as const

// ─── SHORTHAND IMPORT ──────────────────────────────────────────────────────────
// Use: import { S } from './svgStyleTokens'
// Then: <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity}>

export const S = {
  /** Context Far */
  CF: CONTEXT_FAR,
  /** Context Near */
  CN: CONTEXT_NEAR,
  /** Primary */
  P: PRIMARY,
  /** Detail */
  D: DETAIL,
  /** Effects */
  E: EFFECTS,
} as const
