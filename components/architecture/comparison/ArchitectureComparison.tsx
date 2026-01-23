'use client'

import React, { useState } from 'react'
import { DoricColumnSVG, IonicColumnSVG, CorinthianColumnSVG } from '../elements/columns'
import { PointedArchSVG, RoundArchSVG, HorseshoeArchSVG } from '../elements/arches'

// Comparison data structure
interface ComparisonFeature {
  label: string
  doric?: string
  ionic?: string
  corinthian?: string
  highlighted?: boolean
}

interface ComparisonSet {
  id: string
  title: string
  subtitle: string
  elements: {
    id: string
    name: string
    component: React.FC<{ showHalo?: boolean }>
  }[]
  features: ComparisonFeature[]
  culturalContext?: string
}

// Greek Column Orders Comparison
const greekColumnsComparison: ComparisonSet = {
  id: 'greek-columns',
  title: 'The Three Greek Orders',
  subtitle: 'How to tell Doric, Ionic, and Corinthian apart',
  elements: [
    { id: 'doric', name: 'Doric', component: DoricColumnSVG },
    { id: 'ionic', name: 'Ionic', component: IonicColumnSVG },
    { id: 'corinthian', name: 'Corinthian', component: CorinthianColumnSVG },
  ],
  features: [
    {
      label: 'Base',
      doric: 'NO BASE - sits directly on platform',
      ionic: 'Elaborate Attic base with moldings',
      corinthian: 'Similar to Ionic - ornate base',
      highlighted: true,
    },
    {
      label: 'Proportions',
      doric: 'Stocky (1:4-6 height to diameter)',
      ionic: 'Slender (1:9)',
      corinthian: 'Tallest (1:10+)',
    },
    {
      label: 'Flutes',
      doric: '20 shallow flutes, sharp edges',
      ionic: '24 deeper flutes with flat fillets',
      corinthian: '24 flutes like Ionic',
    },
    {
      label: 'Capital',
      doric: 'Simple echinus (cushion) + abacus',
      ionic: 'Scroll volutes (ram\'s horns)',
      corinthian: 'Ornate acanthus leaves + small volutes',
      highlighted: true,
    },
    {
      label: 'Character',
      doric: 'Masculine, sturdy, military',
      ionic: 'Feminine, elegant, refined',
      corinthian: 'Ornate, luxurious, decorative',
    },
    {
      label: 'Famous Example',
      doric: 'Parthenon (Athens)',
      ionic: 'Erechtheion (Athens)',
      corinthian: 'Temple of Olympian Zeus (Athens)',
    },
  ],
  culturalContext: 'The Greeks developed these three orders in sequence: Doric (earliest, 7th century BCE) → Ionic (6th century BCE) → Corinthian (5th century BCE). Each represented different aesthetic values and was chosen for specific building types.',
}

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
                <td className="p-4 text-sm">
                  {feature.doric && (
                    <span className={selectedFeature === feature.label ? 'font-semibold' : ''}>
                      {feature.doric}
                    </span>
                  )}
                </td>
                <td className="p-4 text-sm">
                  {feature.ionic && (
                    <span className={selectedFeature === feature.label ? 'font-semibold' : ''}>
                      {feature.ionic}
                    </span>
                  )}
                </td>
                <td className="p-4 text-sm">
                  {feature.corinthian && (
                    <span className={selectedFeature === feature.label ? 'font-semibold' : ''}>
                      {feature.corinthian}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Tip */}
      <div className="bg-accent/50 border border-accent rounded-lg p-4">
        <h4 className="font-semibold mb-2">💡 Quick Memory Tip</h4>
        <p className="text-sm">
          <strong>D</strong>oric = <strong>D</strong>irect (no base),
          <strong> I</strong>onic = <strong>I</strong>ntricate (scroll volutes),
          <strong> C</strong>orinthian = <strong>C</strong>urly (acanthus leaves)
        </p>
      </div>

      {/* Interactive Hint */}
      <p className="text-center text-sm text-muted-foreground">
        💡 Click any row in the table to highlight that feature
      </p>
    </div>
  )
}
