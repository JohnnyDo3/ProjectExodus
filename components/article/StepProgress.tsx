'use client'

import { Check } from 'lucide-react'

interface Step {
  id: string
  label: string
  icon?: React.ReactNode
}

interface StepProgressProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (stepIndex: number) => void
}

export default function StepProgress({
  steps,
  currentStep,
  onStepClick,
}: StepProgressProps) {
  return (
    <div className="step-progress">
      <div className="step-container">
        {steps.map((step, index) => {
          const isComplete = index < currentStep
          const isCurrent = index === currentStep
          const isClickable = onStepClick && (isComplete || isCurrent)

          return (
            <div key={step.id} className="step-wrapper">
              {/* Connector line */}
              {index > 0 && (
                <div
                  className={`step-connector ${index <= currentStep ? 'active' : ''}`}
                />
              )}

              {/* Step circle */}
              <button
                type="button"
                onClick={() => isClickable && onStepClick?.(index)}
                disabled={!isClickable}
                className={`step-circle ${isComplete ? 'complete' : ''} ${isCurrent ? 'current' : ''} ${isClickable ? 'clickable' : ''}`}
              >
                {isComplete ? (
                  <Check size={16} strokeWidth={3} />
                ) : (
                  <span className="step-number">{index + 1}</span>
                )}
              </button>

              {/* Step label */}
              <span
                className={`step-label ${isCurrent ? 'current' : ''} ${isComplete ? 'complete' : ''}`}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .step-progress {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--background);
          padding: 20px 0;
          border-bottom: 1px solid var(--border);
          margin-bottom: 24px;
        }

        .step-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          max-width: 600px;
          margin: 0 auto;
        }

        .step-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          flex: 1;
          max-width: 150px;
        }

        .step-connector {
          position: absolute;
          top: 18px;
          right: 50%;
          width: 100%;
          height: 3px;
          background: var(--border);
          z-index: -1;
          transform: translateX(-50%);
        }

        .step-connector.active {
          background: var(--primary);
        }

        .step-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--muted);
          border: 3px solid var(--border);
          color: var(--muted-foreground);
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: default;
        }

        .step-circle.clickable {
          cursor: pointer;
        }

        .step-circle.clickable:hover {
          transform: scale(1.1);
        }

        .step-circle.current {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
          box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.2);
        }

        .step-circle.complete {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }

        .step-number {
          line-height: 1;
        }

        .step-label {
          margin-top: 8px;
          font-size: 13px;
          font-weight: 500;
          color: var(--muted-foreground);
          text-align: center;
          transition: color 0.2s ease;
        }

        .step-label.current {
          color: var(--primary);
          font-weight: 600;
        }

        .step-label.complete {
          color: var(--foreground);
        }

        @media (max-width: 640px) {
          .step-progress {
            padding: 16px 0;
          }

          .step-circle {
            width: 32px;
            height: 32px;
            font-size: 12px;
          }

          .step-connector {
            top: 16px;
          }

          .step-label {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  )
}
