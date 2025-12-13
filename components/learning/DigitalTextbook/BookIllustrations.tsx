'use client'

// ============================================
// SACRED BOOK ILLUSTRATIONS
// Ancient manuscript meets modern sustainability
// Carved, etched, illuminated visual elements
// ============================================

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import {
  Leaf,
  Droplets,
  Sun,
  Wind,
  Recycle,
  TreePine,
  Factory,
  Home,
  Car,
  Lightbulb,
  Battery,
  Flame,
  Cloud,
  ThermometerSun,
  Fish,
  Bird,
  Bug,
  Sprout,
  Mountain,
  Waves,
  ArrowRight,
  ArrowDown,
  Circle,
  type LucideIcon,
} from 'lucide-react'

// ============================================
// ILLUMINATED LETTER (Drop Cap)
// Medieval manuscript style first letter
// ============================================

interface IlluminatedLetterProps {
  letter: string
  color?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function IlluminatedLetter({ letter, color, size = 'md', className }: IlluminatedLetterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const sizeClasses = {
    sm: 'w-12 h-12 text-3xl',
    md: 'w-16 h-16 text-4xl',
    lg: 'w-20 h-20 text-5xl',
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative float-left mr-3 mb-1',
        sizeClasses[size],
        'flex items-center justify-center',
        'font-serif font-black',
        className
      )}
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ duration: 0.6, type: 'spring' }}
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(135deg, ${color || 'var(--primary)'}15 0%, ${color || 'var(--primary)'}05 100%)`,
          border: `2px solid ${color || 'var(--primary)'}30`,
        }}
      />

      {/* Corner flourishes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 64">
        <path
          d="M4 16 L4 4 L16 4"
          fill="none"
          stroke={color || 'var(--primary)'}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={0.5}
        />
        <path
          d="M60 16 L60 4 L48 4"
          fill="none"
          stroke={color || 'var(--primary)'}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={0.5}
        />
        <path
          d="M4 48 L4 60 L16 60"
          fill="none"
          stroke={color || 'var(--primary)'}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={0.5}
        />
        <path
          d="M60 48 L60 60 L48 60"
          fill="none"
          stroke={color || 'var(--primary)'}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={0.5}
        />
      </svg>

      {/* The letter */}
      <span
        className="relative z-10"
        style={{ color: color || 'var(--primary)' }}
      >
        {letter.toUpperCase()}
      </span>
    </motion.div>
  )
}

// ============================================
// CIRCULAR ECONOMY DIAGRAM
// Animated cycle showing reduce-reuse-recycle
// ============================================

interface CircularDiagramProps {
  items?: { icon: LucideIcon; label: string; color?: string }[]
  centerIcon?: LucideIcon
  centerLabel?: string
  color?: string
  className?: string
}

export function CircularEconomyDiagram({
  items = [
    { icon: Factory, label: 'Produce' },
    { icon: Home, label: 'Consume' },
    { icon: Recycle, label: 'Recycle' },
    { icon: Sprout, label: 'Regenerate' },
  ],
  centerIcon: CenterIcon = Leaf,
  centerLabel = 'Circular Economy',
  color = '#10b981',
  className,
}: CircularDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const angleStep = 360 / items.length
  const radius = 90

  return (
    <motion.div
      ref={ref}
      className={cn('relative w-64 h-64 mx-auto my-8', className)}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0"
        animate={isInView ? { rotate: 360 } : {}}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <svg className="w-full h-full" viewBox="0 0 256 256">
          <circle
            cx="128"
            cy="128"
            r="100"
            fill="none"
            stroke={`${color}20`}
            strokeWidth="2"
            strokeDasharray="8 4"
          />
        </svg>
      </motion.div>

      {/* Connection arrows */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
        {items.map((_, i) => {
          const startAngle = (i * angleStep - 90) * (Math.PI / 180)
          const endAngle = ((i + 1) * angleStep - 90) * (Math.PI / 180)
          const midAngle = ((i + 0.5) * angleStep - 90) * (Math.PI / 180)
          const arrowRadius = radius - 15

          return (
            <motion.path
              key={i}
              d={`M ${128 + Math.cos(startAngle) * arrowRadius} ${128 + Math.sin(startAngle) * arrowRadius}
                  A ${arrowRadius} ${arrowRadius} 0 0 1
                  ${128 + Math.cos(endAngle) * arrowRadius} ${128 + Math.sin(endAngle) * arrowRadius}`}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            />
          )
        })}
      </svg>

      {/* Items around the circle */}
      {items.map((item, i) => {
        const angle = (i * angleStep - 90) * (Math.PI / 180)
        const x = 128 + Math.cos(angle) * radius
        const y = 128 + Math.sin(angle) * radius
        const ItemIcon = item.icon

        return (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center"
            style={{
              left: `${(x / 256) * 100}%`,
              top: `${(y / 256) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: `${item.color || color}20`, border: `2px solid ${item.color || color}` }}
            >
              <ItemIcon className="w-6 h-6" style={{ color: item.color || color }} />
            </div>
            <span className="text-xs font-medium mt-1 text-[var(--foreground)]">{item.label}</span>
          </motion.div>
        )
      })}

      {/* Center element */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6, type: 'spring' }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
          style={{ background: color }}
        >
          <CenterIcon className="w-8 h-8 text-white" />
        </div>
        <span className="text-xs font-bold mt-2 text-center text-[var(--foreground)]">{centerLabel}</span>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// CARBON CYCLE DIAGRAM
// Shows natural carbon flow
// ============================================

export function CarbonCycleDiagram({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const elements = [
    { icon: Sun, label: 'Sunlight', x: 50, y: 5, color: '#f59e0b' },
    { icon: Cloud, label: 'Atmosphere CO₂', x: 50, y: 25, color: '#94a3b8' },
    { icon: TreePine, label: 'Plants', x: 20, y: 50, color: '#22c55e' },
    { icon: Factory, label: 'Industry', x: 80, y: 50, color: '#64748b' },
    { icon: Fish, label: 'Ocean', x: 50, y: 75, color: '#0ea5e9' },
    { icon: Mountain, label: 'Soil', x: 20, y: 85, color: '#92400e' },
  ]

  const arrows = [
    { from: 0, to: 2, label: 'Photosynthesis' },
    { from: 2, to: 1, label: 'Respiration' },
    { from: 3, to: 1, label: 'Emissions' },
    { from: 1, to: 4, label: 'Absorption' },
    { from: 2, to: 5, label: 'Decomposition' },
  ]

  return (
    <motion.div
      ref={ref}
      className={cn('relative w-full max-w-md h-72 mx-auto my-8', className)}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {/* Background etched effect */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'linear-gradient(135deg, var(--muted) 0%, transparent 50%, var(--muted) 100%)',
          opacity: 0.3,
        }}
      />

      {/* Elements */}
      {elements.map((el, i) => {
        const Icon = el.icon
        return (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center"
            style={{ left: `${el.x}%`, top: `${el.y}%`, transform: 'translate(-50%, -50%)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <motion.div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: `${el.color}20`, border: `2px solid ${el.color}` }}
              whileHover={{ scale: 1.1 }}
            >
              <Icon className="w-5 h-5" style={{ color: el.color }} />
            </motion.div>
            <span className="text-[10px] font-medium mt-1 text-[var(--muted-foreground)] whitespace-nowrap">
              {el.label}
            </span>
          </motion.div>
        )
      })}

      {/* Animated particles flowing */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            r="3"
            fill="#22c55e"
            opacity={0.6}
            initial={{ cx: '50%', cy: '75%' }}
            animate={isInView ? {
              cx: ['50%', '20%', '20%', '50%', '50%'],
              cy: ['75%', '50%', '25%', '25%', '75%'],
            } : {}}
            transition={{
              duration: 8,
              delay: i * 2.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

// ============================================
// ENERGY FLOW DIAGRAM
// Renewable vs Non-renewable
// ============================================

export function EnergyFlowDiagram({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const renewables = [
    { icon: Sun, label: 'Solar', color: '#f59e0b' },
    { icon: Wind, label: 'Wind', color: '#0ea5e9' },
    { icon: Waves, label: 'Hydro', color: '#3b82f6' },
    { icon: ThermometerSun, label: 'Geothermal', color: '#ef4444' },
  ]

  const nonRenewables = [
    { icon: Flame, label: 'Coal', color: '#1f2937' },
    { icon: Droplets, label: 'Oil', color: '#374151' },
    { icon: Factory, label: 'Natural Gas', color: '#4b5563' },
  ]

  return (
    <motion.div
      ref={ref}
      className={cn('relative w-full max-w-lg mx-auto my-8 p-6', className)}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      <div className="grid grid-cols-2 gap-8">
        {/* Renewable column */}
        <div className="space-y-4">
          <motion.h4
            className="text-sm font-bold text-green-600 text-center uppercase tracking-wider"
            initial={{ y: -20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
          >
            Renewable
          </motion.h4>
          {renewables.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                className="flex items-center gap-3 p-2 rounded-lg bg-green-500/10 border border-green-500/30"
                initial={{ x: -50, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: `${item.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <span className="text-sm font-medium text-[var(--foreground)]">{item.label}</span>
              </motion.div>
            )
          })}
        </div>

        {/* Non-renewable column */}
        <div className="space-y-4">
          <motion.h4
            className="text-sm font-bold text-gray-500 text-center uppercase tracking-wider"
            initial={{ y: -20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
          >
            Non-Renewable
          </motion.h4>
          {nonRenewables.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                className="flex items-center gap-3 p-2 rounded-lg bg-gray-500/10 border border-gray-500/30"
                initial={{ x: 50, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: `${item.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <span className="text-sm font-medium text-[var(--foreground)]">{item.label}</span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Arrow to home */}
      <motion.div
        className="flex items-center justify-center mt-6 gap-4"
        initial={{ y: 20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        <ArrowDown className="w-5 h-5 text-[var(--primary)]" />
        <div className="w-12 h-12 rounded-full bg-[var(--primary)]/20 flex items-center justify-center border-2 border-[var(--primary)]">
          <Home className="w-6 h-6 text-[var(--primary)]" />
        </div>
        <ArrowDown className="w-5 h-5 text-[var(--primary)]" />
      </motion.div>
      <p className="text-center text-xs text-[var(--muted-foreground)] mt-2">Powers Our Homes</p>
    </motion.div>
  )
}

// ============================================
// ECOSYSTEM DIAGRAM
// Interconnected web of life
// ============================================

export function EcosystemDiagram({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const organisms = [
    { icon: Sun, label: 'Sun', x: 50, y: 10, color: '#f59e0b', size: 'lg' },
    { icon: TreePine, label: 'Producers', x: 30, y: 35, color: '#22c55e', size: 'md' },
    { icon: Sprout, label: 'Plants', x: 70, y: 35, color: '#16a34a', size: 'md' },
    { icon: Bug, label: 'Herbivores', x: 25, y: 60, color: '#84cc16', size: 'sm' },
    { icon: Bird, label: 'Omnivores', x: 50, y: 55, color: '#eab308', size: 'sm' },
    { icon: Fish, label: 'Carnivores', x: 75, y: 60, color: '#f97316', size: 'sm' },
    { icon: Mountain, label: 'Decomposers', x: 50, y: 85, color: '#92400e', size: 'md' },
  ]

  return (
    <motion.div
      ref={ref}
      className={cn('relative w-full max-w-md h-64 mx-auto my-8', className)}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.line x1="50%" y1="20%" x2="30%" y2="35%" stroke="var(--primary)" strokeWidth="1" opacity={0.3}
          initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ delay: 0.5 }} />
        <motion.line x1="50%" y1="20%" x2="70%" y2="35%" stroke="var(--primary)" strokeWidth="1" opacity={0.3}
          initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ delay: 0.6 }} />
        <motion.line x1="30%" y1="40%" x2="25%" y2="55%" stroke="var(--primary)" strokeWidth="1" opacity={0.3}
          initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ delay: 0.7 }} />
        <motion.line x1="70%" y1="40%" x2="75%" y2="55%" stroke="var(--primary)" strokeWidth="1" opacity={0.3}
          initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ delay: 0.8 }} />
        <motion.line x1="50%" y1="60%" x2="50%" y2="80%" stroke="var(--primary)" strokeWidth="1" opacity={0.3}
          initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ delay: 0.9 }} />
      </svg>

      {/* Organisms */}
      {organisms.map((org, i) => {
        const Icon = org.icon
        const sizeClass = org.size === 'lg' ? 'w-12 h-12' : org.size === 'md' ? 'w-10 h-10' : 'w-8 h-8'
        const iconSize = org.size === 'lg' ? 'w-6 h-6' : org.size === 'md' ? 'w-5 h-5' : 'w-4 h-4'

        return (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center"
            style={{ left: `${org.x}%`, top: `${org.y}%`, transform: 'translate(-50%, -50%)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <motion.div
              className={cn('rounded-full flex items-center justify-center', sizeClass)}
              style={{ background: `${org.color}20`, border: `2px solid ${org.color}` }}
              whileHover={{ scale: 1.15 }}
            >
              <Icon className={iconSize} style={{ color: org.color }} />
            </motion.div>
            <span className="text-[9px] font-medium mt-1 text-[var(--muted-foreground)]">{org.label}</span>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

// ============================================
// ORNAMENTAL DIVIDER
// Decorative section break
// ============================================

interface OrnamentalDividerProps {
  color?: string
  symbol?: string
  animated?: boolean
  className?: string
}

export function OrnamentalDivider({
  color = 'var(--primary)',
  symbol = '❧',
  animated = true,
  className,
}: OrnamentalDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className={cn('flex items-center justify-center gap-4 my-8', className)}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      <motion.div
        className="flex-1 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${color}50, ${color})`,
        }}
        initial={{ scaleX: 0, originX: 1 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6 }}
      />
      <motion.span
        className="text-2xl"
        style={{ color }}
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
      >
        {symbol}
      </motion.span>
      <motion.div
        className="flex-1 h-px"
        style={{
          background: `linear-gradient(to left, transparent, ${color}50, ${color})`,
        }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  )
}

// ============================================
// ANIMATED QUOTE BOX
// Illuminated manuscript style quote
// ============================================

interface AnimatedQuoteProps {
  quote: string
  author: string
  source?: string
  color?: string
  className?: string
}

export function AnimatedQuote({ quote, author, source, color = 'var(--primary)', className }: AnimatedQuoteProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.blockquote
      ref={ref}
      className={cn(
        'relative my-8 p-6 rounded-xl overflow-hidden',
        'bg-gradient-to-br from-[var(--muted)]/50 to-transparent',
        'border-l-4',
        className
      )}
      style={{ borderColor: color }}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative quote marks */}
      <motion.span
        className="absolute top-2 left-4 text-6xl font-serif opacity-10"
        style={{ color }}
        initial={{ y: -20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 0.1 } : {}}
        transition={{ delay: 0.3 }}
      >
        "
      </motion.span>

      {/* Quote text */}
      <motion.p
        className="text-lg font-serif italic text-[var(--foreground)] relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        {quote}
      </motion.p>

      {/* Attribution */}
      <motion.footer
        className="mt-4 text-sm text-[var(--muted-foreground)]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
      >
        — <span className="font-semibold" style={{ color }}>{author}</span>
        {source && <span>, {source}</span>}
      </motion.footer>

      {/* Corner flourish */}
      <motion.svg
        className="absolute bottom-2 right-2 w-8 h-8 opacity-20"
        viewBox="0 0 32 32"
        initial={{ scale: 0, rotate: 90 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ delay: 0.5 }}
      >
        <path
          d="M28 4 L28 28 L4 28"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="28" cy="4" r="2" fill={color} />
      </motion.svg>
    </motion.blockquote>
  )
}

// ============================================
// STEP FLOW DIAGRAM
// Process steps with connections
// ============================================

interface StepFlowProps {
  steps: { icon: LucideIcon; title: string; description?: string }[]
  color?: string
  className?: string
}

export function StepFlowDiagram({ steps, color = 'var(--primary)', className }: StepFlowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className={cn('my-8', className)}>
      <div className="flex flex-wrap justify-center gap-4">
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.div
              key={i}
              className="flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
            >
              <div className="flex flex-col items-center max-w-[120px]">
                <motion.div
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg mb-2"
                  style={{ background: `${color}20`, border: `2px solid ${color}` }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon className="w-7 h-7" style={{ color }} />
                </motion.div>
                <span className="text-sm font-bold text-center text-[var(--foreground)]">{step.title}</span>
                {step.description && (
                  <span className="text-xs text-center text-[var(--muted-foreground)] mt-1">{step.description}</span>
                )}
              </div>
              {i < steps.length - 1 && (
                <motion.div
                  className="mx-3"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: i * 0.15 + 0.1 }}
                >
                  <ArrowRight className="w-5 h-5" style={{ color }} />
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================
// STATISTIC CARD
// Animated number with icon
// ============================================

interface StatCardProps {
  icon: LucideIcon
  value: string | number
  label: string
  color?: string
  className?: string
}

export function StatCard({ icon: Icon, value, label, color = 'var(--primary)', className }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className={cn(
        'p-4 rounded-xl text-center',
        'bg-gradient-to-br from-[var(--muted)]/50 to-transparent',
        'border border-[var(--border)]',
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      whileHover={{ y: -2 }}
    >
      <motion.div
        className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
        style={{ background: `${color}20` }}
        initial={{ rotate: -180, scale: 0 }}
        animate={isInView ? { rotate: 0, scale: 1 } : {}}
        transition={{ delay: 0.2, type: 'spring' }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </motion.div>
      <motion.div
        className="text-2xl font-black"
        style={{ color }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        {value}
      </motion.div>
      <div className="text-xs text-[var(--muted-foreground)] mt-1">{label}</div>
    </motion.div>
  )
}

// Export all components
export {
  type IlluminatedLetterProps,
  type CircularDiagramProps,
  type OrnamentalDividerProps,
  type AnimatedQuoteProps,
  type StepFlowProps,
  type StatCardProps,
}
