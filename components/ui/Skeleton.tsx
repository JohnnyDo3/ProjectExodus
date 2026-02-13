'use client'

interface SkeletonProps {
  className?: string
  variant?: 'pulse' | 'shimmer'
}

/**
 * Skeleton - Loading placeholder with pulse or shimmer animation
 *
 * Usage:
 * <Skeleton className="h-4 w-full" /> // shimmer by default
 * <Skeleton variant="pulse" className="h-4 w-full" />
 */
export function Skeleton({ className, variant = 'shimmer' }: SkeletonProps) {
  if (variant === 'pulse') {
    return (
      <div
        className={`animate-pulse rounded-md bg-[var(--muted)] ${className || ''}`}
      />
    )
  }

  return (
    <div
      className={`relative overflow-hidden rounded-md bg-[var(--muted)] ${className || ''}`}
    >
      <div className="absolute inset-0 animate-skeleton-shimmer bg-gradient-to-r from-transparent via-[var(--foreground)]/5 to-transparent" />
    </div>
  )
}

/**
 * SkeletonText - Multiple lines of skeleton text
 */
export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number
  className?: string
}) {
  return (
    <div className={`space-y-2 ${className || ''}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  )
}

/**
 * SkeletonCircle - Circular skeleton for avatars
 */
export function SkeletonCircle({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  return (
    <Skeleton className={`rounded-full ${sizeClasses[size]} ${className || ''}`} />
  )
}

/**
 * SkeletonButton - Button-shaped skeleton
 */
export function SkeletonButton({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-10 w-24',
    lg: 'h-12 w-32',
  }

  return (
    <Skeleton className={`${sizeClasses[size]} ${className || ''}`} />
  )
}
