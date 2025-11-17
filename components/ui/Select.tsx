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
            className="block text-sm font-medium text-earth-900 mb-2"
          >
            {label}
            {props.required && <span className="text-terra-500 ml-1">*</span>}
          </label>
        )}
        <select
          id={selectId}
          className={cn(
            'w-full px-4 py-2 rounded-lg border text-earth-900',
            'bg-white',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-moss-500 focus:border-transparent',
            error
              ? 'border-terra-500 focus:ring-terra-500'
              : 'border-sand-300 hover:border-sand-400',
            'disabled:bg-sand-100 disabled:cursor-not-allowed disabled:text-earth-500',
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
            className="mt-1 text-sm text-terra-600"
            role="alert"
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${selectId}-hint`} className="mt-1 text-sm text-earth-600">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export { Select }
