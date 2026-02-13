'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Trophy, ArrowLeft, Volume2, VolumeX } from 'lucide-react'
import { STRUCTURAL_SETS, GameProps, type ComparisonSet } from './shared'
import { useTextToSpeech } from '@/hooks/useTextToSpeech'

// Screen reader announcement component
function LiveRegion({ message }: { message: string }) {
  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {message}
    </div>
  )
}

export function MatchingGame({ onBack }: GameProps) {
  const [selectedSet, setSelectedSet] = useState<ComparisonSet | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [wrongPair, setWrongPair] = useState<string | null>(null)
  const [gameComplete, setGameComplete] = useState(false)
  const [shuffledItems, setShuffledItems] = useState<Array<{ id: string; text: string; correctElementId: string }>>([])
  const [announcement, setAnnouncement] = useState('')
  const [audioEnabled, setAudioEnabled] = useState(true)

  const descriptionRefs = useRef<(HTMLButtonElement | null)[]>([])
  const elementRefs = useRef<(HTMLButtonElement | null)[]>([])

  const { speak, isSupported: ttsSupported } = useTextToSpeech()

  const startGame = useCallback((set: ComparisonSet) => {
    setSelectedSet(set)
    setMatchedPairs([])
    setSelectedItem(null)
    setGameComplete(false)
    if (set.matchingGame) {
      setShuffledItems([...set.matchingGame.items].sort(() => Math.random() - 0.5))
    }
    setAnnouncement(`Starting ${set.title}. Select a description, then match it to an element.`)
  }, [])

  // Focus first description when game starts
  useEffect(() => {
    if (selectedSet && shuffledItems.length > 0) {
      setTimeout(() => descriptionRefs.current[0]?.focus(), 100)
    }
  }, [selectedSet, shuffledItems.length])

  const handleElementClick = useCallback((elementId: string, elementName: string) => {
    if (matchedPairs.includes(elementId) || !selectedItem) return

    const matchingItem = shuffledItems.find(item => item.id === selectedItem)
    if (matchingItem?.correctElementId === elementId) {
      const newMatched = [...matchedPairs, elementId]
      setMatchedPairs(newMatched)
      setSelectedItem(null)
      setAnnouncement(`Correct! Matched with ${elementName}.`)
      if (audioEnabled && ttsSupported) {
        speak(elementName)
      }
      if (newMatched.length === shuffledItems.length) {
        setGameComplete(true)
        setAnnouncement(`Congratulations! You matched all ${newMatched.length} pairs!`)
      }
    } else {
      setWrongPair(elementId)
      setAnnouncement(`Incorrect match. Try again.`)
      setTimeout(() => setWrongPair(null), 500)
    }
  }, [matchedPairs, selectedItem, shuffledItems, audioEnabled, ttsSupported, speak])

  const handleDescriptionClick = useCallback((itemId: string, itemText: string) => {
    const item = shuffledItems.find(i => i.id === itemId)
    if (item && matchedPairs.includes(item.correctElementId)) return

    if (selectedItem === itemId) {
      setSelectedItem(null)
      setAnnouncement('Description deselected.')
    } else {
      setSelectedItem(itemId)
      setAnnouncement(`Selected: ${itemText}. Now select the matching element.`)
    }
  }, [shuffledItems, matchedPairs, selectedItem])

  // Keyboard navigation
  useEffect(() => {
    if (!selectedSet) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab navigation is handled by browser
      // Enter/Space handled by button default behavior
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedSet])

  if (!selectedSet) {
    return (
      <div className="py-8" role="region" aria-label="Matching Game Selection">
        <h3 className="text-xl font-bold text-center mb-6">Choose a Matching Game</h3>
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto" role="list">
          {STRUCTURAL_SETS.filter(set => set.matchingGame).map((set) => (
            <button
              key={set.id}
              onClick={() => startGame(set)}
              className="p-6 rounded-xl bg-muted hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              role="listitem"
              aria-label={`${set.title}: ${set.matchingGame?.items.length} pairs to match`}
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
      <div className="text-center py-12" role="region" aria-label="Game Complete">
        <LiveRegion message={`Game complete! You matched all ${matchedPairs.length} pairs!`} />
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" aria-hidden="true" />
        <h3 className="text-2xl font-bold mb-2">All Matched!</h3>
        <p className="text-muted-foreground mb-6">You matched all {matchedPairs.length} pairs correctly!</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => startGame(selectedSet)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Play this game again"
          >
            Play Again
          </button>
          <button
            onClick={() => setSelectedSet(null)}
            className="px-6 py-2 bg-muted rounded-lg font-bold hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Choose a different matching game"
          >
            Choose Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto" role="region" aria-label="Matching Game">
      <LiveRegion message={announcement} />

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setSelectedSet(null)}
          className="text-sm text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
          aria-label="Go back to game selection"
        >
          <ArrowLeft className="w-4 h-4 inline mr-1" aria-hidden="true" /> Back
        </button>
        <h3 className="font-bold">{selectedSet.title}</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm" aria-label={`${matchedPairs.length} of ${shuffledItems.length} pairs matched`}>
            {matchedPairs.length}/{shuffledItems.length} matched
          </span>
          {ttsSupported && (
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={audioEnabled ? 'Disable audio' : 'Enable audio'}
              aria-pressed={audioEnabled}
            >
              {audioEnabled ? (
                <Volume2 className="w-4 h-4 text-blue-500" aria-hidden="true" />
              ) : (
                <VolumeX className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>

      <p className="text-center text-muted-foreground mb-6" id="game-instructions">
        {selectedSet.matchingGame?.question}
      </p>

      <div className="grid md:grid-cols-2 gap-8" aria-describedby="game-instructions">
        {/* Descriptions */}
        <div className="space-y-3" role="group" aria-label="Descriptions to match">
          <h4 className="text-sm font-bold text-muted-foreground mb-2">Descriptions</h4>
          {shuffledItems.map((item, index) => {
            const isMatched = matchedPairs.includes(item.correctElementId)
            return (
              <button
                key={item.id}
                ref={el => { descriptionRefs.current[index] = el }}
                onClick={() => handleDescriptionClick(item.id, item.text)}
                disabled={isMatched}
                className={`w-full p-3 rounded-lg text-left text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isMatched
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 opacity-60'
                    : selectedItem === item.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                    : 'bg-muted hover:bg-muted/80'
                }`}
                aria-pressed={selectedItem === item.id}
                aria-disabled={isMatched}
                aria-label={isMatched ? `${item.text} - Already matched` : item.text}
              >
                {item.text}
              </button>
            )
          })}
        </div>

        {/* Elements */}
        <div className="space-y-3" role="group" aria-label="Elements to match with descriptions">
          <h4 className="text-sm font-bold text-muted-foreground mb-2">Elements</h4>
          <div className="grid grid-cols-2 gap-3">
            {selectedSet.elements.map((element, index) => {
              const isMatched = matchedPairs.includes(element.id)
              const isWrong = wrongPair === element.id
              return (
                <button
                  key={element.id}
                  ref={el => { elementRefs.current[index] = el }}
                  onClick={() => handleElementClick(element.id, element.name)}
                  disabled={isMatched || !selectedItem}
                  className={`p-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isMatched
                      ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500'
                      : isWrong
                      ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500 animate-shake'
                      : selectedItem
                      ? 'bg-muted hover:bg-blue-100 dark:hover:bg-blue-900/30 cursor-pointer'
                      : 'bg-muted opacity-60 cursor-not-allowed'
                  }`}
                  aria-label={
                    isMatched
                      ? `${element.name} - Matched`
                      : selectedItem
                      ? `Match with ${element.name}`
                      : `${element.name} - Select a description first`
                  }
                  aria-disabled={isMatched || !selectedItem}
                >
                  <div className="w-16 h-16 mx-auto mb-2" aria-hidden="true">
                    <element.component showHalo={false} />
                  </div>
                  <p className="text-xs font-bold text-center">{element.name}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Instructions for screen readers */}
      <p className="sr-only">
        {selectedItem
          ? 'A description is selected. Use Tab to navigate to elements and press Enter to match.'
          : 'Select a description first, then match it to the correct element.'}
      </p>
    </div>
  )
}
