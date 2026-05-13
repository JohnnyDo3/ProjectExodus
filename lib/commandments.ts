/**
 * THE 10 COMMANDMENTS OF SUSTAINABILITY — single source of truth.
 *
 * Replaces the older 7 Guardian Archetypes (Michael, Gabriel, etc.).
 * Each user picks the commandment they resonate with most; that
 * choice drives the theming of their digital ID and surfaces
 * throughout the network feed, articles, and community pages.
 *
 * Storage: the `User.guardianArchetype` column is reused as the
 * commandment slug ('stewardship', 'integrity', etc.). For legacy
 * profiles whose column still holds an old archetype id ('michael',
 * 'gabriel', ...), `resolveCommandmentSlug()` maps them to the
 * commandment that matches the archetype's primary value.
 */

import {
  Shield,
  Sprout,
  Heart,
  Leaf,
  BookOpen,
  Sparkles,
  Handshake,
  Scale,
  Eye,
  Infinity as InfinityIcon,
  type LucideIcon,
} from 'lucide-react'

export interface Commandment {
  id: CommandmentSlug
  number: number
  name: string
  title: string
  description: string
  icon: LucideIcon
  /** Tailwind `from-X to-Y` color stops, used in `bg-gradient-to-r` etc. */
  gradient: string
  /** Tailwind `from-X/20 to-Y/10` — softer card-bg version of `gradient`. */
  bgGradient: string
  accentColor: string
  borderColor: string
  hexAccent: string
  /** Hex/CSS variants for surfaces that need literal CSS (inline styles,
   *  canvas, SVG, charts) instead of Tailwind classes. */
  colors: {
    from: string
    to: string
    gradient: string
  }
}

export type CommandmentSlug =
  | 'stewardship'
  | 'biodiversity'
  | 'integrity'
  | 'rest'
  | 'legacy'
  | 'sanctity'
  | 'loyalty'
  | 'equity'
  | 'transparency'
  | 'sustainability'

export const COMMANDMENTS: Record<CommandmentSlug, Commandment> = {
  stewardship: {
    id: 'stewardship',
    number: 1,
    name: 'STEWARDSHIP',
    title: 'Guard, Protect, and Manage the Earth',
    description: 'You guard what cannot guard itself. Earth\'s care rests in your hands.',
    icon: Shield,
    gradient: 'from-emerald-600 to-green-700',
    bgGradient: 'from-emerald-600/20 to-green-700/10',
    accentColor: 'text-emerald-600',
    borderColor: 'border-emerald-600',
    hexAccent: '#059669',
    colors: { from: '#059669', to: '#15803d', gradient: 'linear-gradient(135deg, #059669 0%, #15803d 100%)' },
  },
  biodiversity: {
    id: 'biodiversity',
    number: 2,
    name: 'BIODIVERSITY',
    title: 'Prioritize Diversification',
    description: 'You see strength in difference. Diversity is how the world stays alive.',
    icon: Sprout,
    gradient: 'from-teal-500 to-cyan-600',
    bgGradient: 'from-teal-500/20 to-cyan-600/10',
    accentColor: 'text-teal-500',
    borderColor: 'border-teal-500',
    hexAccent: '#14b8a6',
    colors: { from: '#14b8a6', to: '#0891b2', gradient: 'linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)' },
  },
  integrity: {
    id: 'integrity',
    number: 3,
    name: 'INTEGRITY',
    title: "Don't exploit sustainability — live it",
    description: "You don't perform sustainability, you live it. Your actions match your words.",
    icon: Heart,
    gradient: 'from-orange-500 to-amber-600',
    bgGradient: 'from-orange-500/20 to-amber-600/10',
    accentColor: 'text-orange-500',
    borderColor: 'border-orange-500',
    hexAccent: '#f97316',
    colors: { from: '#f97316', to: '#d97706', gradient: 'linear-gradient(135deg, #f97316 0%, #d97706 100%)' },
  },
  rest: {
    id: 'rest',
    number: 4,
    name: 'REST',
    title: 'Honor the rhythm of rest',
    description: 'You honor the pause. Rest is where renewal grows.',
    icon: Leaf,
    gradient: 'from-slate-500 to-blue-500',
    bgGradient: 'from-slate-500/20 to-blue-500/10',
    accentColor: 'text-slate-500',
    borderColor: 'border-slate-500',
    hexAccent: '#64748b',
    colors: { from: '#64748b', to: '#3b82f6', gradient: 'linear-gradient(135deg, #64748b 0%, #3b82f6 100%)' },
  },
  legacy: {
    id: 'legacy',
    number: 5,
    name: 'LEGACY',
    title: 'Keep traditions while innovating',
    description: "You carry the past forward while building what's next.",
    icon: BookOpen,
    gradient: 'from-purple-600 to-violet-700',
    bgGradient: 'from-purple-600/20 to-violet-700/10',
    accentColor: 'text-purple-600',
    borderColor: 'border-purple-600',
    hexAccent: '#9333ea',
    colors: { from: '#9333ea', to: '#6d28d9', gradient: 'linear-gradient(135deg, #9333ea 0%, #6d28d9 100%)' },
  },
  sanctity: {
    id: 'sanctity',
    number: 6,
    name: 'SANCTITY',
    title: 'Protect human, economic, ecological life',
    description: 'You hold all life sacred — human, ecological, economic.',
    icon: Sparkles,
    gradient: 'from-rose-500 to-pink-600',
    bgGradient: 'from-rose-500/20 to-pink-600/10',
    accentColor: 'text-rose-500',
    borderColor: 'border-rose-500',
    hexAccent: '#f43f5e',
    colors: { from: '#f43f5e', to: '#db2777', gradient: 'linear-gradient(135deg, #f43f5e 0%, #db2777 100%)' },
  },
  loyalty: {
    id: 'loyalty',
    number: 7,
    name: 'LOYALTY',
    title: 'Stand with community',
    description: 'You stand with your community. Belonging is the root of action.',
    icon: Handshake,
    gradient: 'from-fuchsia-500 to-pink-700',
    bgGradient: 'from-fuchsia-500/20 to-pink-700/10',
    accentColor: 'text-fuchsia-500',
    borderColor: 'border-fuchsia-500',
    hexAccent: '#d946ef',
    colors: { from: '#d946ef', to: '#be185d', gradient: 'linear-gradient(135deg, #d946ef 0%, #be185d 100%)' },
  },
  equity: {
    id: 'equity',
    number: 8,
    name: 'EQUITY',
    title: 'Fair share in justice',
    description: 'You insist on a fair share. Justice is not optional.',
    icon: Scale,
    gradient: 'from-sky-500 to-indigo-600',
    bgGradient: 'from-sky-500/20 to-indigo-600/10',
    accentColor: 'text-sky-500',
    borderColor: 'border-sky-500',
    hexAccent: '#0ea5e9',
    colors: { from: '#0ea5e9', to: '#4f46e5', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #4f46e5 100%)' },
  },
  transparency: {
    id: 'transparency',
    number: 9,
    name: 'TRANSPARENCY',
    title: 'Maintain honest reporting',
    description: 'You bring truth into the open. Sunlight is the best disinfectant.',
    icon: Eye,
    gradient: 'from-amber-400 to-yellow-500',
    bgGradient: 'from-amber-400/20 to-yellow-500/10',
    accentColor: 'text-amber-500',
    borderColor: 'border-amber-500',
    hexAccent: '#f59e0b',
    colors: { from: '#fbbf24', to: '#eab308', gradient: 'linear-gradient(135deg, #fbbf24 0%, #eab308 100%)' },
  },
  sustainability: {
    id: 'sustainability',
    number: 10,
    name: 'SUSTAINABILITY',
    title: 'Embrace sufficiency and resilience',
    description: 'You embrace enough. Resilience over excess, always.',
    icon: InfinityIcon,
    gradient: 'from-lime-500 to-green-600',
    bgGradient: 'from-lime-500/20 to-green-600/10',
    accentColor: 'text-lime-600',
    borderColor: 'border-lime-600',
    hexAccent: '#65a30d',
    colors: { from: '#84cc16', to: '#16a34a', gradient: 'linear-gradient(135deg, #84cc16 0%, #16a34a 100%)' },
  },
}

export const COMMANDMENT_LIST: Commandment[] = Object.values(COMMANDMENTS)

export const DEFAULT_COMMANDMENT: CommandmentSlug = 'stewardship'

/**
 * Maps a legacy guardian archetype id ('michael', 'gabriel', etc.)
 * to the commandment slug that best represents that archetype's
 * primary value. Returns the input unchanged if it's already a
 * commandment slug, or falls back to DEFAULT_COMMANDMENT if the
 * value is unknown / null.
 */
const ARCHETYPE_TO_COMMANDMENT: Record<string, CommandmentSlug> = {
  michael: 'stewardship',    // Strength → Guard the Earth
  gabriel: 'transparency',   // Revelation → Bring truth
  raphael: 'sanctity',       // Healing → Protect life
  uriel: 'legacy',           // Wisdom → Keep traditions
  camael: 'loyalty',         // Love → Stand with community
  jophiel: 'biodiversity',   // Beauty → Diversity as strength
  zadkiel: 'integrity',      // Mercy → Live your values
}

export function resolveCommandmentSlug(value?: string | null): CommandmentSlug {
  if (!value) return DEFAULT_COMMANDMENT
  const lower = value.toLowerCase()
  if (lower in COMMANDMENTS) return lower as CommandmentSlug
  if (lower in ARCHETYPE_TO_COMMANDMENT) return ARCHETYPE_TO_COMMANDMENT[lower]
  return DEFAULT_COMMANDMENT
}

export function resolveCommandment(value?: string | null): Commandment {
  return COMMANDMENTS[resolveCommandmentSlug(value)]
}
