'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Lightbulb } from 'lucide-react'
import { getAllStructuralComparisonSets, ComparisonSet, GameProps } from './shared'

export function ComparisonGame({ onBack }: GameProps) {
  const [selectedSet, setSelectedSet] = useState<ComparisonSet | null>(null)
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  if (!selectedSet) {
    return (
      <div className="py-8">
        <h3 className="text-xl font-bold text-center mb-2">Confusion Buster</h3>
        <p className="text-center text-muted-foreground mb-6">Compare similar structural elements side-by-side</p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {getAllStructuralComparisonSets().map((set) => (
            <button
              key={set.id}
              onClick={() => setSelectedSet(set)}
              className="p-6 rounded-xl bg-muted hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-left"
            >
              <h4 className="font-bold mb-1">{set.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{set.subtitle}</p>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-0.5 bg-background rounded">{set.elements.length} elements</span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  set.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                  set.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>{set.difficulty}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setSelectedSet(null)} className="text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 inline mr-1" /> Back
        </button>
        <div className="text-center">
          <h3 className="font-bold">{selectedSet.title}</h3>
          <p className="text-sm text-muted-foreground">{selectedSet.subtitle}</p>
        </div>
        <div />
      </div>

      {/* Memory tip */}
      {selectedSet.memoryTip && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm text-amber-700 dark:text-amber-300">Memory Tip</p>
              <p className="text-sm text-amber-800 dark:text-amber-200">{selectedSet.memoryTip}</p>
            </div>
          </div>
        </div>
      )}

      {/* Elements Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {selectedSet.elements.map((element) => (
          <div key={element.id} className="text-center">
            <div className="w-24 h-24 mx-auto mb-2 rounded-lg border bg-background p-2">
              <element.component showHalo={false} />
            </div>
            <p className="font-bold text-sm">{element.name}</p>
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted">
              <th className="text-left p-3 font-bold border-r">Feature</th>
              {selectedSet.elements.map((el) => (
                <th key={el.id} className="text-center p-3 font-bold text-sm">{el.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedSet.features.map((feature, idx) => (
              <tr
                key={feature.label}
                className={`${idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'} ${
                  feature.highlighted ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                } ${selectedFeature === feature.label ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedFeature(selectedFeature === feature.label ? null : feature.label)}
              >
                <td className="p-3 font-bold text-sm border-r">
                  {feature.highlighted && <span className="text-blue-500 mr-1">*</span>}
                  {feature.label}
                </td>
                {selectedSet.elements.map((el) => (
                  <td key={el.id} className="p-3 text-sm text-center">
                    {feature.values[el.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Historical Timeline */}
      {selectedSet.historicalTimeline && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm font-bold mb-1">Historical Timeline</p>
          <p className="text-sm text-muted-foreground">{selectedSet.historicalTimeline}</p>
        </div>
      )}
    </div>
  )
}
