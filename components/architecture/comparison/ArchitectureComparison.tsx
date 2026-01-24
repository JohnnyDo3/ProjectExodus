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
        padding: 'clamp(0.75rem, 2vh, 1.5rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1rem, 2vh, 2rem)'
      }}
    >
      {/* Header */}
      <div className="text-center" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.25rem, 0.5vh, 0.5rem)' }}>
        <h2 className="font-bold" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.875rem)' }}>{comparisonSet.title}</h2>
        <p className="text-muted-foreground" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}>{comparisonSet.subtitle}</p>

        {comparisonSet.culturalContext && (
          <button
            onClick={() => setShowContext(!showContext)}
            className="text-primary hover:underline"
            style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', marginTop: 'clamp(0.25rem, 0.5vh, 0.5rem)' }}
          >
            {showContext ? '− Hide' : '+ Show'} Historical Context
          </button>
        )}

        {showContext && comparisonSet.culturalContext && (
          <div
            className="bg-muted/50 rounded-lg text-left max-w-3xl mx-auto"
            style={{
              marginTop: 'clamp(0.5rem, 1vh, 1rem)',
              padding: 'clamp(0.75rem, 1.5vh, 1rem)',
              fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
            }}
          >
            <p className="leading-relaxed">{comparisonSet.culturalContext}</p>
          </div>
        )}
      </div>

      {/* Side-by-Side Elements */}
      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ gap: 'clamp(0.75rem, 2vw, 1.5rem)' }}
      >
        {comparisonSet.elements.map((element) => (
          <div
            key={element.id}
            style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1vh, 0.75rem)' }}
          >
            <h3 className="font-semibold text-center" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>{element.name}</h3>

            {/* SVG Container - Viewport-Aware Sizing */}
            <div
              className="relative bg-background border-2 border-border rounded-lg overflow-hidden shadow-sm"
              style={{
                width: '100%',
                maxWidth: 'min(clamp(200px, 30vw, 400px), clamp(20vh, 30vh, 40vh))',
                height: 'min(clamp(200px, 30vw, 400px), clamp(20vh, 30vh, 40vh))',
                aspectRatio: '1 / 1',
                margin: '0 auto'
              }}
            >
              <element.component showHalo={false} />
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table - Viewport-Aware with Horizontal Scroll */}
      <div className="border rounded-lg overflow-x-auto overflow-y-visible">
        <table className="w-full min-w-max">
          <thead>
            <tr className="bg-muted">
              <th
                className="text-left font-semibold border-r sticky left-0 bg-muted z-10"
                style={{
                  padding: 'clamp(0.5rem, 1vh, 1rem)',
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                  minWidth: 'clamp(100px, 20vw, 150px)'
                }}
              >
                Feature
              </th>
              {comparisonSet.elements.map((element) => (
                <th
                  key={element.id}
                  className="text-left font-semibold"
                  style={{
                    padding: 'clamp(0.5rem, 1vh, 1rem)',
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                    minWidth: 'clamp(150px, 25vw, 250px)'
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
                    ? 'bg-accent/30'
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedFeature(
                  selectedFeature === feature.label ? null : feature.label
                )}
                style={{ cursor: 'pointer' }}
              >
                <td
                  className="font-medium border-r sticky left-0 z-10"
                  style={{
                    padding: 'clamp(0.5rem, 1vh, 1rem)',
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                    backgroundColor: selectedFeature === feature.label
                      ? 'var(--primary-opacity-10)'
                      : feature.highlighted
                      ? 'var(--accent-opacity-30)'
                      : 'var(--background)'
                  }}
                >
                  {feature.label}
                  {feature.highlighted && (
                    <span
                      className="ml-2 bg-primary text-primary-foreground px-2 py-0.5 rounded"
                      style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.75rem)' }}
                    >
                      KEY
                    </span>
                  )}
                </td>
                {comparisonSet.elements.map((element) => (
                  <td
                    key={element.id}
                    style={{
                      padding: 'clamp(0.5rem, 1vh, 1rem)',
                      fontSize: 'clamp(0.7rem, 1.4vw, 0.8rem)'
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
          className="bg-accent/50 border border-accent rounded-lg"
          style={{ padding: 'clamp(0.75rem, 1.5vh, 1rem)' }}
        >
          <h4 className="font-semibold" style={{ fontSize: 'clamp(0.875rem, 1.75vw, 1rem)', marginBottom: 'clamp(0.25rem, 0.5vh, 0.5rem)' }}>
            💡 Quick Memory Tip
          </h4>
          <p style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>{comparisonSet.memoryTip}</p>
        </div>
      )}

      {/* Historical Timeline */}
      {comparisonSet.historicalTimeline && (
        <div>
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="text-primary hover:underline"
            style={{
              fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
              marginBottom: 'clamp(0.25rem, 0.5vh, 0.5rem)'
            }}
          >
            {showTimeline ? '− Hide' : '+ Show'} Historical Timeline
          </button>
          {showTimeline && (
            <div
              className="bg-muted/50 rounded-lg"
              style={{
                padding: 'clamp(0.75rem, 1.5vh, 1rem)',
                fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
              }}
            >
              <p className="leading-relaxed">{comparisonSet.historicalTimeline}</p>
            </div>
          )}
        </div>
      )}

      {/* Interactive Hint */}
      <p
        className="text-center text-muted-foreground"
        style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
      >
        💡 Click any row in the table to highlight that feature
      </p>
    </div>
  )
}
