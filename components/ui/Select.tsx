import { forwardRef, SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options?: Array<{ value: string; label: string; disabled?: boolean }>
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, id, options, children, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-[var(--foreground)] mb-2"
          >
            {label}
            {props.required && <span className="text-theme-secondary ml-1">*</span>}
          </label>
        )}
        <select
          id={selectId}
          className={cn(
            'w-full px-4 py-2 rounded-lg border text-[var(--foreground)]',
            'bg-[var(--card)]',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent',
            error
              ? 'border-theme-secondary focus:ring-[var(--secondary)]'
              : 'border-[var(--border)] hover:border-theme-primary',
            'disabled:bg-[var(--muted)] disabled:cursor-not-allowed disabled:opacity-60',
            className
          )}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined
          }
          {...props}
        >
          {options
            ? options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))
            : children}
        </select>
        {error && (
          <p
            id={`${selectId}-error`}
            className="mt-1 text-sm text-theme-secondary"
            role="alert"
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${selectId}-hint`} className="mt-1 text-sm text-theme-muted">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export { Select }
