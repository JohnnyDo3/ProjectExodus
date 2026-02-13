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
  pause: () => void
  resume: () => void
  stop: () => void
  isSpeaking: boolean
  isPaused: boolean
  isSupported: boolean
  voices: SpeechSynthesisVoice[]
  progress: number // 0-100 approximate progress
  setRate: (rate: number) => void
  rate: number
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
 * const { speak, pause, resume, stop, isSpeaking, isPaused, progress } = useTextToSpeech()
 * speak('Hello world')
 */
export function useTextToSpeech(): UseTTSReturn {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isSupported, setIsSupported] = useState(false)
  const [progress, setProgress] = useState(0)
  const [rate, setRate] = useState(0.9)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const textRef = useRef<string>('')
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

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

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  // Estimate reading duration
  const estimateDuration = useCallback((text: string, speechRate: number) => {
    const words = text.split(/\s+/).length
    const wpm = 150 * speechRate
    return (words / wpm) * 60 * 1000
  }, [])

  const speak = useCallback((text: string, options: TTSOptions = {}) => {
    if (!isSupported) return

    // Stop any current speech
    window.speechSynthesis.cancel()
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    // Strip HTML tags
    const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    textRef.current = cleanText

    const mergedOptions = { ...DEFAULT_OPTIONS, ...options, rate: options.rate ?? rate }
    const utterance = new SpeechSynthesisUtterance(cleanText)

    utterance.rate = mergedOptions.rate!
    utterance.pitch = mergedOptions.pitch!
    utterance.volume = mergedOptions.volume!

    // Try to find a good English voice
    if (mergedOptions.voice) {
      const voice = voices.find(v => v.name === mergedOptions.voice)
      if (voice) utterance.voice = voice
    } else {
      const preferredVoice = voices.find(v =>
        v.lang.startsWith('en-US') && v.localService
      ) || voices.find(v =>
        v.lang.startsWith('en')
      )
      if (preferredVoice) utterance.voice = preferredVoice
    }

    utterance.onstart = () => {
      setIsSpeaking(true)
      setIsPaused(false)
      setProgress(0)
      startTimeRef.current = Date.now()

      const duration = estimateDuration(cleanText, mergedOptions.rate!)
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current
        const newProgress = Math.min(100, (elapsed / duration) * 100)
        setProgress(newProgress)
      }, 100)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      setIsPaused(false)
      setProgress(100)
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }

    utterance.onerror = (event) => {
      if (event.error !== 'interrupted') {
        console.error('Speech synthesis error:', event.error)
      }
      setIsSpeaking(false)
      setIsPaused(false)
      setProgress(0)
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [isSupported, voices, rate, estimateDuration])

  const pause = useCallback(() => {
    if (!isSupported) return
    window.speechSynthesis.pause()
    setIsPaused(true)
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
  }, [isSupported])

  const resume = useCallback(() => {
    if (!isSupported) return
    window.speechSynthesis.resume()
    setIsPaused(false)
    startTimeRef.current = Date.now() - (progress / 100) * estimateDuration(textRef.current, rate)

    const duration = estimateDuration(textRef.current, rate)
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const newProgress = Math.min(100, (elapsed / duration) * 100)
      setProgress(newProgress)
    }, 100)
  }, [isSupported, progress, rate, estimateDuration])

  const stop = useCallback(() => {
    if (!isSupported) return
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    setIsPaused(false)
    setProgress(0)
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
  }, [isSupported])

  return { speak, pause, resume, stop, isSpeaking, isPaused, isSupported, voices, progress, setRate, rate }
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
