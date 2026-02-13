/**
 * Simple sound effects using Web Audio API
 * No external files needed - generates tones programmatically
 */

let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null

  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch {
      return null
    }
  }
  return audioContext
}

interface ToneOptions {
  frequency: number
  duration: number
  type?: OscillatorType
  volume?: number
}

function playTone({ frequency, duration, type = 'sine', volume = 0.3 }: ToneOptions): void {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)

    // Fade in and out to avoid clicks
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01)
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + duration)
  } catch {
    // Silently fail if audio isn't available
  }
}

/**
 * Play a cheerful "correct" sound (ascending tones)
 */
export function playCorrectSound(volume = 0.3): void {
  const ctx = getAudioContext()
  if (!ctx) return

  // Two quick ascending notes
  playTone({ frequency: 523.25, duration: 0.1, type: 'sine', volume }) // C5
  setTimeout(() => {
    playTone({ frequency: 659.25, duration: 0.15, type: 'sine', volume }) // E5
  }, 80)
}

/**
 * Play a "wrong" sound (descending tone)
 */
export function playWrongSound(volume = 0.3): void {
  playTone({ frequency: 200, duration: 0.25, type: 'triangle', volume })
}

/**
 * Play a click sound for UI interactions
 */
export function playClickSound(volume = 0.15): void {
  playTone({ frequency: 800, duration: 0.05, type: 'sine', volume })
}
