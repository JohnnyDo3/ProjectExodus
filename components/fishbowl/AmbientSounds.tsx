'use client'

import { useEffect, useRef } from 'react'

interface AmbientSoundsProps {
  enabled: boolean
}

// Generates ambient underwater sounds using Web Audio API
// No external audio files needed - purely synthesized
export function AmbientSounds({ enabled }: AmbientSoundsProps) {
  const ctxRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const nodesRef = useRef<OscillatorNode[]>([])

  useEffect(() => {
    if (!enabled) {
      // Fade out and cleanup
      if (gainRef.current && ctxRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.5)
        setTimeout(() => {
          nodesRef.current.forEach(n => { try { n.stop() } catch {} })
          nodesRef.current = []
          if (ctxRef.current?.state !== 'closed') {
            try { ctxRef.current?.close() } catch {}
          }
          ctxRef.current = null
          gainRef.current = null
        }, 600)
      }
      return
    }

    // Create ambient underwater sound
    try {
      const ctx = new AudioContext()
      ctxRef.current = ctx

      const masterGain = ctx.createGain()
      masterGain.gain.value = 0
      masterGain.connect(ctx.destination)
      gainRef.current = masterGain

      // Low rumble - ocean ambience
      const rumble = ctx.createOscillator()
      rumble.type = 'sine'
      rumble.frequency.value = 60
      const rumbleGain = ctx.createGain()
      rumbleGain.gain.value = 0.03
      rumble.connect(rumbleGain)
      rumbleGain.connect(masterGain)
      rumble.start()
      nodesRef.current.push(rumble)

      // Modulate rumble slightly
      const lfo = ctx.createOscillator()
      lfo.type = 'sine'
      lfo.frequency.value = 0.1
      const lfoGain = ctx.createGain()
      lfoGain.gain.value = 5
      lfo.connect(lfoGain)
      lfoGain.connect(rumble.frequency)
      lfo.start()
      nodesRef.current.push(lfo)

      // Filtered noise - water texture
      const bufferSize = ctx.sampleRate * 2
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5
      }
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      noise.loop = true

      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 200
      filter.Q.value = 1

      const noiseGain = ctx.createGain()
      noiseGain.gain.value = 0.015

      noise.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(masterGain)
      noise.start()

      // Occasional bubble sounds via scheduled oscillators
      const scheduleBubble = () => {
        if (!ctxRef.current || ctxRef.current.state === 'closed') return

        const bubbleOsc = ctx.createOscillator()
        bubbleOsc.type = 'sine'
        const startFreq = 800 + Math.random() * 600
        bubbleOsc.frequency.setValueAtTime(startFreq, ctx.currentTime)
        bubbleOsc.frequency.exponentialRampToValueAtTime(startFreq * 1.5, ctx.currentTime + 0.08)

        const bubbleGain = ctx.createGain()
        bubbleGain.gain.setValueAtTime(0.008, ctx.currentTime)
        bubbleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)

        bubbleOsc.connect(bubbleGain)
        bubbleGain.connect(masterGain)
        bubbleOsc.start(ctx.currentTime)
        bubbleOsc.stop(ctx.currentTime + 0.12)

        // Schedule next bubble
        const nextDelay = 2000 + Math.random() * 5000
        setTimeout(scheduleBubble, nextDelay)
      }

      setTimeout(scheduleBubble, 1000)

      // Fade in
      masterGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 1)
    } catch (e) {
      console.warn('Audio not available:', e)
    }

    return () => {
      nodesRef.current.forEach(n => { try { n.stop() } catch {} })
      nodesRef.current = []
      if (ctxRef.current?.state !== 'closed') {
        try { ctxRef.current?.close() } catch {}
      }
      ctxRef.current = null
      gainRef.current = null
    }
  }, [enabled])

  return null
}
