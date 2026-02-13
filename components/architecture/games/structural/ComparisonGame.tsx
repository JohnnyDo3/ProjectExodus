'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Lightbulb, Volume2, VolumeX } from 'lucide-react'
import { getAllStructuralComparisonSets, ComparisonSet, GameProps } from './shared'
import { useTextToSpeech } from '@/hooks/useTextToSpeech'

// Screen reader announcement component
function LiveRegion({ message }: { message: string }) {
  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {message}
    </div>
  )
}

export function ComparisonGame({ onBack }: GameProps) {
  const [selectedSet, setSelectedSet] = useState<ComparisonSet | null>(null)
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [announcement, setAnnouncement] = useState('')
  const [audioEnabled, setAudioEnabled] = useState(true)

  const tableRef = useRef<HTMLTableElement>(null)
  const { speak, isSupported: ttsSupported } = useTextToSpeech()

  const handleSetSelect = useCallback((set: ComparisonSet) => {
    setSelectedSet(set)
    setAnnouncement(`Viewing ${set.title}. ${set.elements.length} elements to compare.`)
  }, [])

  const handleFeatureSelect = useCallback((feature: { label: string; values: Record<string, string> }) => {
    if (selectedFeature === feature.label) {
      setSelectedFeature(null)
      setAnnouncement('Feature deselected.')
    } else {
      setSelectedFeature(feature.label)
      const values = selectedSet?.elements.map(el => `${el.name}: ${feature.values[el.id]}`).join('. ')
      setAnnouncement(`${feature.label}. ${values}`)
      if (audioEnabled && ttsSupported) {
        speak(feature.label)
      }
    }
  }, [selectedFeature, selectedSet, audioEnabled, ttsSupported, speak])

  // Keyboard navigation for table rows
  useEffect(() => {
    if (!selectedSet) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!tableRef.current) return

      const rows = Array.from(tableRef.current.querySelectorAll('tbody tr'))
      const currentIndex = selectedFeature
        ? selectedSet.features.findIndex(f => f.label === selectedFeature)
        : -1

      if (e.key === 'ArrowDown' && currentIndex < rows.length - 1) {
        e.preventDefault()
        const nextFeature = selectedSet.features[currentIndex + 1]
        if (nextFeature) handleFeatureSelect(nextFeature)
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault()
        const prevFeature = selectedSet.features[currentIndex - 1]
        if (prevFeature) handleFeatureSelect(prevFeature)
      } else if (e.key === 'Escape') {
        setSelectedFeature(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedSet, selectedFeature, handleFeatureSelect])

  if (!selectedSet) {
    return (
      <div className="py-8" role="region" aria-label="Comparison Game Selection">
        <LiveRegion message={announcement} />
        <h3 className="text-xl font-bold text-center mb-2">Confusion Buster</h3>
        <p className="text-center text-muted-foreground mb-6">Compare similar structural elements side-by-side</p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto" role="list">
          {getAllStructuralComparisonSets().map((set) => (
            <button
              key={set.id}
              onClick={() => handleSetSelect(set)}
              className="p-6 rounded-xl bg-muted hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              role="listitem"
              aria-label={`${set.title}: ${set.subtitle}. ${set.elements.length} elements, ${set.difficulty} difficulty`}
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
    <div className="max-w-6xl mx-auto" role="region" aria-label={`Comparing ${selectedSet.title}`}>
      <LiveRegion message={announcement} />

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setSelectedSet(null)}
          className="text-sm text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1"
          aria-label="Go back to comparison selection"
        >
          <ArrowLeft className="w-4 h-4 inline mr-1" aria-hidden="true" /> Back
        </button>
        <div className="text-center">
          <h3 className="font-bold">{selectedSet.title}</h3>
          <p className="text-sm text-muted-foreground">{selectedSet.subtitle}</p>
        </div>
        <div className="flex items-center">
          {ttsSupported && (
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label={audioEnabled ? 'Disable audio' : 'Enable audio'}
              aria-pressed={audioEnabled}
            >
              {audioEnabled ? (
                <Volume2 className="w-4 h-4 text-purple-500" aria-hidden="true" />
              ) : (
                <VolumeX className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Memory tip */}
      {selectedSet.memoryTip && (
        <div
          className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6"
          role="note"
          aria-label="Memory tip"
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-bold text-sm text-amber-700 dark:text-amber-300">Memory Tip</p>
              <p className="text-sm text-amber-800 dark:text-amber-200">{selectedSet.memoryTip}</p>
            </div>
          </div>
        </div>
      )}

      {/* Elements Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" role="list" aria-label="Elements being compared">
        {selectedSet.elements.map((element) => (
          <div key={element.id} className="text-center" role="listitem">
            <div
              className="w-24 h-24 mx-auto mb-2 rounded-lg border bg-background p-2"
              role="img"
              aria-label={`Diagram of ${element.name}`}
            >
              <element.component showHalo={false} />
            </div>
            <p className="font-bold text-sm">{element.name}</p>
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="border rounded-lg overflow-hidden">
        <table
          ref={tableRef}
          className="w-full"
          role="grid"
          aria-label="Feature comparison table. Use arrow keys to navigate rows."
        >
          <thead>
            <tr className="bg-muted">
              <th scope="col" className="text-left p-3 font-bold border-r">Feature</th>
              {selectedSet.elements.map((el) => (
                <th key={el.id} scope="col" className="text-center p-3 font-bold text-sm">
                  {el.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedSet.features.map((feature, idx) => (
              <tr
                key={feature.label}
                className={`cursor-pointer transition-colors ${idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'} ${
                  feature.highlighted ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                } ${selectedFeature === feature.label ? 'ring-2 ring-purple-500 ring-inset' : ''} hover:bg-purple-50 dark:hover:bg-purple-900/20`}
                onClick={() => handleFeatureSelect(feature)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleFeatureSelect(feature)
                  }
                }}
                tabIndex={0}
                role="row"
                aria-selected={selectedFeature === feature.label}
                aria-label={`${feature.label}: ${selectedSet.elements.map(el => `${el.name} is ${feature.values[el.id]}`).join(', ')}`}
              >
                <th scope="row" className="p-3 font-bold text-sm border-r text-left">
                  {feature.highlighted && <span className="text-purple-500 mr-1" aria-label="Key differentiator">*</span>}
                  {feature.label}
                </th>
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

      {/* Keyboard hint */}
      <p className="text-xs text-muted-foreground text-center mt-2">
        Click a row or use ↑↓ arrow keys to explore features
      </p>

      {/* Historical Timeline */}
      {selectedSet.historicalTimeline && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg" role="note" aria-label="Historical context">
          <p className="text-sm font-bold mb-1">Historical Timeline</p>
          <p className="text-sm text-muted-foreground">{selectedSet.historicalTimeline}</p>
        </div>
      )}
    </div>
  )
}
