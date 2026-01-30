import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'sm', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200',
          'whitespace-nowrap',
          {
            'bg-[var(--muted)] text-[var(--muted-foreground)]': variant === 'default',
            'bg-[var(--primary)] text-[var(--primary-foreground)]': variant === 'primary',
            'bg-[var(--secondary)] text-[var(--secondary-foreground)]': variant === 'secondary',
            'bg-green-500/10 text-green-600 dark:text-green-400': variant === 'success',
            'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400': variant === 'warning',
            'bg-red-500/10 text-red-600 dark:text-red-400': variant === 'danger',
            'border-2 border-[var(--border)] text-[var(--foreground)] bg-transparent': variant === 'outline',
          },
          {
            'px-2 py-0.5 text-xs': size === 'sm',
            'px-3 py-1 text-sm': size === 'md',
            'px-4 py-1.5 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
