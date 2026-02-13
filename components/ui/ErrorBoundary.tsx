'use client'

import { Component, type ReactNode, type ErrorInfo } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  showRetry?: boolean
  level?: 'page' | 'component'
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * ErrorBoundary - Catches React errors and displays a fallback UI
 *
 * Usage:
 * - Page level: <ErrorBoundary level="page">{children}</ErrorBoundary>
 * - Component level: <ErrorBoundary level="component">{children}</ErrorBoundary>
 * - With custom fallback: <ErrorBoundary fallback={<MyFallback />}>{children}</ErrorBoundary>
 * - With error callback: <ErrorBoundary onError={(err) => reportToSentry(err)}>{children}</ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to console (prep for Sentry integration)
    console.error('[ErrorBoundary] Caught error:', error)
    console.error('[ErrorBoundary] Component stack:', errorInfo.componentStack)

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)

    // Future: Add Sentry integration here
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } })
    // }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      const isPageLevel = this.props.level === 'page'

      return (
        <div
          className={`flex flex-col items-center justify-center ${
            isPageLevel ? 'min-h-[50vh] p-8' : 'p-6'
          }`}
        >
          <div className={`text-center ${isPageLevel ? 'max-w-md' : 'max-w-xs'}`}>
            <div className={`mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20 ${
              isPageLevel ? 'w-16 h-16' : 'w-12 h-12'
            } flex items-center justify-center`}>
              <AlertTriangle className={`text-red-600 dark:text-red-400 ${
                isPageLevel ? 'w-8 h-8' : 'w-6 h-6'
              }`} />
            </div>

            <h3 className={`font-bold text-foreground ${
              isPageLevel ? 'text-xl mb-2' : 'text-lg mb-1'
            }`}>
              {isPageLevel ? 'Something went wrong' : 'Error loading content'}
            </h3>

            <p className={`text-muted-foreground ${
              isPageLevel ? 'text-base mb-6' : 'text-sm mb-4'
            }`}>
              {isPageLevel
                ? 'We encountered an unexpected error. Please try again or refresh the page.'
                : 'This section could not be loaded.'}
            </p>

            {(this.props.showRetry !== false) && (
              <button
                onClick={this.handleRetry}
                className={`inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors ${
                  isPageLevel ? 'px-6 py-3' : 'px-4 py-2 text-sm'
                }`}
              >
                <RefreshCw className={isPageLevel ? 'w-5 h-5' : 'w-4 h-4'} />
                Try again
              </button>
            )}

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                  Error details (dev only)
                </summary>
                <pre className="mt-2 p-3 bg-muted rounded-lg text-xs overflow-auto max-h-48 text-red-600 dark:text-red-400">
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * withErrorBoundary - HOC to wrap a component with an error boundary
 *
 * Usage:
 * const SafeComponent = withErrorBoundary(MyComponent, { level: 'component' })
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithErrorBoundary = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  )

  ComponentWithErrorBoundary.displayName = `withErrorBoundary(${displayName})`

  return ComponentWithErrorBoundary
}
