'use client'

import React, { useState } from 'react'
import type { ComparisonSet } from '@/lib/architecture/comparisonSets'
import { greekColumnsComparison } from '@/lib/architecture/comparisonSets'

interface Props {
  comparisonSet?: ComparisonSet
  mode?: 'study' | 'quiz'
}

export default function ArchitectureComparison({
  comparisonSet = greekColumnsComparison,
  mode = 'study'
}: Props) {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [showContext, setShowContext] = useState(false)
  const [showTimeline, setShowTimeline] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})

  return (
    <div
      className="w-full max-w-7xl mx-auto"
      style={{
        padding: 'clamp(0.5rem, 1.5vh, 1rem)',
        paddingBottom: 'clamp(1.5rem, 3vh, 2rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1rem, 2vh, 1.5rem)'
      }}
    >
      {/* Header */}
      <div className="text-center" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1vh, 0.75rem)' }}>
        <h2 className="font-bold" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>{comparisonSet.title}</h2>
        <p className="text-muted-foreground" style={{ fontSize: 'clamp(0.75rem, 1.75vw, 0.875rem)' }}>{comparisonSet.subtitle}</p>

        {comparisonSet.culturalContext && (
          <details className="group max-w-3xl mx-auto">
            <summary
              className="cursor-pointer list-none flex items-center justify-center gap-1.5 text-[var(--primary)] hover:underline"
              style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.75rem)' }}
            >
              <span className="transition-transform group-open:rotate-90">▶</span>
              <span>Historical Context</span>
            </summary>
            <div
              className="bg-muted/40 rounded-lg text-left mt-2"
              style={{
                padding: 'clamp(0.5rem, 1vh, 0.75rem)',
                fontSize: 'clamp(0.625rem, 1.25vw, 0.7rem)',
                lineHeight: '1.5'
              }}
            >
              <p>{comparisonSet.culturalContext}</p>
            </div>
          </details>
        )}
      </div>

      {/* Side-by-Side Elements */}
      <div
        className="grid grid-cols-2 md:grid-cols-3"
        style={{ gap: 'clamp(0.75rem, 2vw, 1.5rem)' }}
      >
        {comparisonSet.elements.map((element) => (
          <div
            key={element.id}
            style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1vh, 0.75rem)' }}
          >
            <h3 className="font-bold text-center" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>{element.name}</h3>

            {/* SVG Container - Smaller & More Compact */}
            <div
              className="relative bg-background border border-border rounded-lg overflow-hidden"
              style={{
                width: '100%',
                maxWidth: 'min(clamp(120px, 25vw, 250px), clamp(15vh, 22vh, 30vh))',
                height: 'min(clamp(120px, 25vw, 250px), clamp(15vh, 22vh, 30vh))',
                aspectRatio: '1 / 1',
                margin: '0 auto'
              }}
            >
              <element.component showHalo={false} />
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="border rounded-lg overflow-x-auto overflow-y-visible">
        <table className="w-full min-w-max">
          <thead>
            <tr className="bg-muted/80">
              <th
                className="text-left font-bold border-r sticky left-0 bg-muted/80 z-10"
                style={{
                  padding: 'clamp(0.375rem, 0.75vh, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)',
                  fontSize: 'clamp(0.625rem, 1.25vw, 0.75rem)',
                  minWidth: 'clamp(90px, 18vw, 120px)'
                }}
              >
                Feature
              </th>
              {comparisonSet.elements.map((element) => (
                <th
                  key={element.id}
                  className="text-left font-bold"
                  style={{
                    padding: 'clamp(0.375rem, 0.75vh, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)',
                    fontSize: 'clamp(0.625rem, 1.25vw, 0.75rem)',
                    minWidth: 'clamp(120px, 22vw, 200px)'
                  }}
                >
                  {element.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonSet.features.map((feature, index) => (
              <tr
                key={index}
                className={`border-t transition-colors ${
                  selectedFeature === feature.label
                    ? 'bg-primary/10'
                    : feature.highlighted
                    ? 'bg-purple-500/10 border-l-2 border-l-purple-500'
                    : 'hover:bg-muted/30'
                }`}
                onClick={() => setSelectedFeature(
                  selectedFeature === feature.label ? null : feature.label
                )}
                style={{ cursor: 'pointer' }}
              >
                <td
                  className="font-semibold border-r sticky left-0 z-10"
                  style={{
                    padding: 'clamp(0.375rem, 0.75vh, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)',
                    fontSize: 'clamp(0.625rem, 1.25vw, 0.75rem)',
                    backgroundColor: selectedFeature === feature.label
                      ? 'var(--primary-opacity-10)'
                      : feature.highlighted
                      ? 'rgb(168 85 247 / 0.1)'
                      : 'var(--background)'
                  }}
                >
                  <div className="flex items-center gap-1">
                    {feature.highlighted && <span className="text-purple-500">★</span>}
                    <span>{feature.label}</span>
                  </div>
                </td>
                {comparisonSet.elements.map((element) => (
                  <td
                    key={element.id}
                    style={{
                      padding: 'clamp(0.375rem, 0.75vh, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)',
                      fontSize: 'clamp(0.625rem, 1.25vw, 0.7rem)',
                      lineHeight: '1.4'
                    }}
                  >
                    {feature.values[element.id] && (
                      <span className={selectedFeature === feature.label ? 'font-semibold' : ''}>
                        {feature.values[element.id]}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Memory Tip */}
      {comparisonSet.memoryTip && (
        <div
          className="bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start"
          style={{ padding: 'clamp(0.75rem, 1.5vh, 1rem)', gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}
        >
          <span className="text-amber-500 flex-shrink-0" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>💡</span>
          <div>
            <h4 className="font-bold text-amber-600 dark:text-amber-500" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', marginBottom: 'clamp(0.25rem, 0.5vh, 0.375rem)' }}>
              Memory Tip
            </h4>
            <p className="text-[var(--foreground)]" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', lineHeight: '1.5' }}>{comparisonSet.memoryTip}</p>
          </div>
        </div>
      )}

      {/* Historical Timeline */}
      {comparisonSet.historicalTimeline && (
        <details className="group">
          <summary
            className="cursor-pointer list-none flex items-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', gap: 'clamp(0.375rem, 0.75vw, 0.5rem)' }}
          >
            <span className="transition-transform group-open:rotate-90">▶</span>
            <span>Historical Timeline</span>
          </summary>
          <div
            className="bg-muted/30 rounded-lg"
            style={{
              marginTop: 'clamp(0.5rem, 1vh, 0.75rem)',
              padding: 'clamp(0.75rem, 1.5vh, 1rem)',
              fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
              lineHeight: '1.6'
            }}
          >
            <p>{comparisonSet.historicalTimeline}</p>
          </div>
        </details>
      )}

      {/* Interactive Hint */}
      <p
        className="text-center text-muted-foreground italic"
        style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
      >
        Tip: Click rows with ★ to highlight key differences
      </p>
    </div>
  )
}
