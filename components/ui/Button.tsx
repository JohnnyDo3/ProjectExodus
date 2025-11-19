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
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-500 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-moss-600 text-white hover:bg-moss-700 dark:bg-moss-500 dark:hover:bg-moss-600 shadow-sm hover:shadow-md': variant === 'primary',
            'bg-terra-500 text-white hover:bg-terra-600 dark:bg-terra-400 dark:hover:bg-terra-500 shadow-sm hover:shadow-md': variant === 'secondary',
            'border-2 border-moss-600 text-moss-700 hover:bg-moss-50 dark:border-moss-400 dark:text-moss-400 dark:hover:bg-moss-950': variant === 'outline',
            'hover:bg-sand-200 text-earth-700 dark:hover:bg-earth-700 dark:text-sand-200': variant === 'ghost',
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
