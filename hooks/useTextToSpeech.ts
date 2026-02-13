'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

interface TTSOptions {
  rate?: number
  pitch?: number
  volume?: number
  voice?: string
}

interface UseTTSReturn {
  speak: (text: string, options?: TTSOptions) => void
  stop: () => void
  isSpeaking: boolean
  isSupported: boolean
  voices: SpeechSynthesisVoice[]
}

const DEFAULT_OPTIONS: TTSOptions = {
  rate: 0.9,
  pitch: 1,
  volume: 1,
}

/**
 * useTextToSpeech - Hook for browser Text-to-Speech
 *
 * Usage:
 * const { speak, stop, isSpeaking, isSupported } = useTextToSpeech()
 * speak('King Post Truss')
 */
export function useTextToSpeech(): UseTTSReturn {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isSupported, setIsSupported] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true)

      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices()
        setVoices(availableVoices)
      }

      loadVoices()
      window.speechSynthesis.onvoiceschanged = loadVoices

      return () => {
        window.speechSynthesis.onvoiceschanged = null
      }
    }
  }, [])

  const speak = useCallback((text: string, options: TTSOptions = {}) => {
    if (!isSupported) return

    // Stop any current speech
    window.speechSynthesis.cancel()

    const mergedOptions = { ...DEFAULT_OPTIONS, ...options }
    const utterance = new SpeechSynthesisUtterance(text)

    utterance.rate = mergedOptions.rate!
    utterance.pitch = mergedOptions.pitch!
    utterance.volume = mergedOptions.volume!

    // Try to find a good English voice
    if (mergedOptions.voice) {
      const voice = voices.find(v => v.name === mergedOptions.voice)
      if (voice) utterance.voice = voice
    } else {
      // Prefer US English voices
      const preferredVoice = voices.find(v =>
        v.lang.startsWith('en-US') && v.localService
      ) || voices.find(v =>
        v.lang.startsWith('en')
      )
      if (preferredVoice) utterance.voice = preferredVoice
    }

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [isSupported, voices])

  const stop = useCallback(() => {
    if (!isSupported) return
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [isSupported])

  return { speak, stop, isSpeaking, isSupported, voices }
}

/**
 * Phonetic helpers for structural engineering terms
 */
export const PHONETICS: Record<string, string> = {
  // Bracing
  'diagonal-bracing': 'die-AG-uh-nul BRAY-sing',
  'x-bracing': 'ex BRAY-sing',
  'k-bracing': 'kay BRAY-sing',
  'v-bracing': 'vee BRAY-sing',
  'chevron-bracing': 'SHEV-ron BRAY-sing',
  'eccentric-bracing': 'ek-SEN-trik BRAY-sing',
  'knee-bracing': 'nee BRAY-sing',
  'zipper-bracing': 'ZIP-er BRAY-sing',
  'mega-bracing': 'MEG-uh BRAY-sing',
  'outrigger': 'OUT-rig-er',

  // Trusses
  'king-post': 'king pohst',
  'queen-post': 'kween pohst',
  'howe-truss': 'how truss',
  'pratt-truss': 'prat truss',
  'warren-truss': 'WAR-en truss',
  'fink-truss': 'fink truss',
  'gambrel': 'GAM-brel',
  'scissor-truss': 'SIZ-er truss',
  'bowstring-truss': 'BOH-string truss',
  'vierendeel': 'VEER-en-deel',
  'lattice-truss': 'LAT-iss truss',
  'space-frame': 'spays fraym',

  // Foundations
  'spread-footing': 'spred FOOT-ing',
  'mat-foundation': 'mat foun-DAY-shun',
  'pile-foundation': 'pyle foun-DAY-shun',
  'drilled-shaft': 'drild shaft',
  'caisson': 'KAY-son',
  'strip-footing': 'strip FOOT-ing',
  'raft-foundation': 'raft foun-DAY-shun',
  'micropile': 'MY-kro-pyle',
  'helical-pile': 'HEL-ih-kul pyle',
  'pier-foundation': 'peer foun-DAY-shun',
  'combined-footing': 'kom-BYND FOOT-ing',

  // Loads
  'dead-load': 'ded lohd',
  'live-load': 'lyv lohd',
  'wind-load': 'wind lohd',
  'seismic-load': 'SYZ-mik lohd',
  'snow-load': 'snoh lohd',
  'impact-load': 'IM-pakt lohd',
  'thermal-load': 'THER-mul lohd',
  'hydrostatic': 'HY-droh-STAT-ik',
  'soil-pressure': 'soyl PRESH-er',
  'dynamic-load': 'dy-NAM-ik lohd',
  'fatigue-load': 'fuh-TEEG lohd',
}

/**
 * Get pronunciation text for a term
 */
export function getPronunciation(termId: string): string | undefined {
  return PHONETICS[termId]
}
