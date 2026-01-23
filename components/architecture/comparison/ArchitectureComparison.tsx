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
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">{comparisonSet.title}</h2>
        <p className="text-muted-foreground text-lg">{comparisonSet.subtitle}</p>

        {comparisonSet.culturalContext && (
          <button
            onClick={() => setShowContext(!showContext)}
            className="text-sm text-primary hover:underline"
          >
            {showContext ? '− Hide' : '+ Show'} Historical Context
          </button>
        )}

        {showContext && comparisonSet.culturalContext && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg text-sm text-left max-w-3xl mx-auto">
            <p className="leading-relaxed">{comparisonSet.culturalContext}</p>
          </div>
        )}
      </div>

      {/* Side-by-Side Elements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {comparisonSet.elements.map((element) => (
          <div
            key={element.id}
            className="space-y-3"
          >
            <h3 className="text-xl font-semibold text-center">{element.name}</h3>

            {/* SVG Container */}
            <div className="relative aspect-square bg-background border-2 border-border rounded-lg overflow-hidden shadow-sm">
              <element.component showHalo={false} />
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted">
              <th className="text-left p-4 font-semibold border-r">Feature</th>
              {comparisonSet.elements.map((element) => (
                <th key={element.id} className="text-left p-4 font-semibold">
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
                <td className="p-4 font-medium border-r">
                  {feature.label}
                  {feature.highlighted && (
                    <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                      KEY
                    </span>
                  )}
                </td>
                {comparisonSet.elements.map((element) => (
                  <td key={element.id} className="p-4 text-sm">
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
        <div className="bg-accent/50 border border-accent rounded-lg p-4">
          <h4 className="font-semibold mb-2">💡 Quick Memory Tip</h4>
          <p className="text-sm">{comparisonSet.memoryTip}</p>
        </div>
      )}

      {/* Historical Timeline */}
      {comparisonSet.historicalTimeline && (
        <div>
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="text-sm text-primary hover:underline mb-2"
          >
            {showTimeline ? '− Hide' : '+ Show'} Historical Timeline
          </button>
          {showTimeline && (
            <div className="p-4 bg-muted/50 rounded-lg text-sm">
              <p className="leading-relaxed">{comparisonSet.historicalTimeline}</p>
            </div>
          )}
        </div>
      )}

      {/* Interactive Hint */}
      <p className="text-center text-sm text-muted-foreground">
        💡 Click any row in the table to highlight that feature
      </p>
    </div>
  )
}
