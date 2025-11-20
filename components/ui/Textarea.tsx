import { forwardRef, TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-[var(--foreground)] mb-2"
          >
            {label}
            {props.required && <span className="text-theme-secondary ml-1">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'w-full px-4 py-2 rounded-lg border text-[var(--foreground)]',
            'bg-[var(--card)] placeholder:text-theme-muted',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent',
            'resize-y min-h-[100px]',
            error
              ? 'border-theme-secondary focus:ring-[var(--secondary)]'
              : 'border-[var(--border)] hover:border-theme-primary',
            'disabled:bg-[var(--muted)] disabled:cursor-not-allowed disabled:opacity-60',
            className
          )}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : hint
              ? `${textareaId}-hint`
              : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-1 text-sm text-theme-secondary"
            role="alert"
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p
            id={`${textareaId}-hint`}
            className="mt-1 text-sm text-theme-muted"
          >
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
