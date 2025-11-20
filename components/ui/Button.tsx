import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'focus-visible:ring-[var(--primary)]',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 shadow-sm hover:shadow-md': variant === 'primary',
            'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:opacity-90 shadow-sm hover:shadow-md': variant === 'secondary',
            'border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--muted)] bg-transparent': variant === 'outline',
            'hover:bg-[var(--muted)] text-[var(--foreground)] bg-transparent': variant === 'ghost',
          },
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
