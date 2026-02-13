'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Trophy, ArrowLeft } from 'lucide-react'
import { STRUCTURAL_SETS, GameProps, type ComparisonSet } from './shared'

export function MatchingGame({ onBack }: GameProps) {
  const [selectedSet, setSelectedSet] = useState<ComparisonSet | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [wrongPair, setWrongPair] = useState<string | null>(null)
  const [gameComplete, setGameComplete] = useState(false)
  const [shuffledItems, setShuffledItems] = useState<Array<{ id: string; text: string; correctElementId: string }>>([])

  const startGame = (set: ComparisonSet) => {
    setSelectedSet(set)
    setMatchedPairs([])
    setSelectedItem(null)
    setGameComplete(false)
    if (set.matchingGame) {
      setShuffledItems([...set.matchingGame.items].sort(() => Math.random() - 0.5))
    }
  }

  const handleElementClick = (elementId: string) => {
    if (matchedPairs.includes(elementId) || !selectedItem) return

    const matchingItem = shuffledItems.find(item => item.id === selectedItem)
    if (matchingItem?.correctElementId === elementId) {
      const newMatched = [...matchedPairs, elementId]
      setMatchedPairs(newMatched)
      setSelectedItem(null)
      if (newMatched.length === shuffledItems.length) {
        setGameComplete(true)
      }
    } else {
      setWrongPair(elementId)
      setTimeout(() => setWrongPair(null), 500)
    }
  }

  const handleDescriptionClick = (itemId: string) => {
    const item = shuffledItems.find(i => i.id === itemId)
    if (item && matchedPairs.includes(item.correctElementId)) return
    setSelectedItem(selectedItem === itemId ? null : itemId)
  }

  if (!selectedSet) {
    return (
      <div className="py-8">
        <h3 className="text-xl font-bold text-center mb-6">Choose a Matching Game</h3>
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {STRUCTURAL_SETS.filter(set => set.matchingGame).map((set) => (
            <button
              key={set.id}
              onClick={() => startGame(set)}
              className="p-6 rounded-xl bg-muted hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-left"
            >
              <h4 className="font-bold mb-1">{set.title}</h4>
              <p className="text-sm text-muted-foreground">{set.matchingGame?.items.length} pairs to match</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (gameComplete) {
    return (
      <div className="text-center py-12">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h3 className="text-2xl font-bold mb-2">All Matched!</h3>
        <p className="text-muted-foreground mb-6">You matched all {matchedPairs.length} pairs correctly!</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => startGame(selectedSet)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold"
          >
            Play Again
          </button>
          <button
            onClick={() => setSelectedSet(null)}
            className="px-6 py-2 bg-muted rounded-lg font-bold"
          >
            Choose Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setSelectedSet(null)} className="text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 inline mr-1" /> Back
        </button>
        <h3 className="font-bold">{selectedSet.title}</h3>
        <span className="text-sm">{matchedPairs.length}/{shuffledItems.length} matched</span>
      </div>

      <p className="text-center text-muted-foreground mb-6">{selectedSet.matchingGame?.question}</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Descriptions */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-muted-foreground mb-2">Descriptions</h4>
          {shuffledItems.map((item) => {
            const isMatched = matchedPairs.includes(item.correctElementId)
            return (
              <button
                key={item.id}
                onClick={() => handleDescriptionClick(item.id)}
                disabled={isMatched}
                className={`w-full p-3 rounded-lg text-left text-sm transition-all ${
                  isMatched
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 opacity-60'
                    : selectedItem === item.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {item.text}
              </button>
            )
          })}
        </div>

        {/* Elements */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-muted-foreground mb-2">Elements</h4>
          <div className="grid grid-cols-2 gap-3">
            {selectedSet.elements.map((element) => {
              const isMatched = matchedPairs.includes(element.id)
              const isWrong = wrongPair === element.id
              return (
                <button
                  key={element.id}
                  onClick={() => handleElementClick(element.id)}
                  disabled={isMatched || !selectedItem}
                  className={`p-3 rounded-lg transition-all ${
                    isMatched
                      ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500'
                      : isWrong
                      ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500 animate-shake'
                      : selectedItem
                      ? 'bg-muted hover:bg-blue-100 dark:hover:bg-blue-900/30 cursor-pointer'
                      : 'bg-muted opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="w-16 h-16 mx-auto mb-2">
                    <element.component showHalo={false} />
                  </div>
                  <p className="text-xs font-bold text-center">{element.name}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
