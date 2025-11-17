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
            className="block text-sm font-medium text-earth-900 mb-2"
          >
            {label}
            {props.required && <span className="text-terra-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'w-full px-4 py-2 rounded-lg border text-earth-900',
            'bg-white placeholder:text-earth-400',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-moss-500 focus:border-transparent',
            'resize-y min-h-[100px]',
            error
              ? 'border-terra-500 focus:ring-terra-500'
              : 'border-sand-300 hover:border-sand-400',
            'disabled:bg-sand-100 disabled:cursor-not-allowed disabled:text-earth-500',
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
            className="mt-1 text-sm text-terra-600"
            role="alert"
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p
            id={`${textareaId}-hint`}
            className="mt-1 text-sm text-earth-600"
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
