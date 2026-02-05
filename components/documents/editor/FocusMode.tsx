'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Volume2, VolumeX, Target, Pencil, Eye } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface FocusModeProps {
  isActive: boolean
  onClose: () => void
  children: React.ReactNode
  wordCount?: number
  wordGoal?: number
  onWordGoalChange?: (goal: number) => void
}

type AmbientSound = 'none' | 'rain' | 'cafe' | 'nature' | 'whitenoise'

export function FocusMode({
  isActive,
  onClose,
  children,
  wordCount = 0,
  wordGoal = 0,
  onWordGoalChange,
}: FocusModeProps) {
  const [ambientSound, setAmbientSound] = useState<AmbientSound>('none')
  const [typewriterMode, setTypewriterMode] = useState(false)
  const [dimSurroundings, setDimSurroundings] = useState(true)
  const [showStats, setShowStats] = useState(true)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  // Ambient sound URLs (would be hosted audio files in production)
  const soundUrls: Record<AmbientSound, string> = {
    none: '',
    rain: '/sounds/rain.mp3',
    cafe: '/sounds/cafe.mp3',
    nature: '/sounds/nature.mp3',
    whitenoise: '/sounds/whitenoise.mp3',
  }

  // Handle ambient sounds
  useEffect(() => {
    if (ambientSound === 'none') {
      if (audioElement) {
        audioElement.pause()
        audioElement.src = ''
      }
      return
    }

    // Note: In production, these audio files would need to exist
    // For now, we'll just set up the infrastructure
    const audio = new Audio()
    audio.loop = true
    audio.volume = 0.3

    // Uncomment when audio files are available:
    // audio.src = soundUrls[ambientSound]
    // audio.play().catch(console.error)

    setAudioElement(audio)

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [ambientSound])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause()
        audioElement.src = ''
      }
    }
  }, [audioElement])

  // Handle escape key to exit focus mode
  useEffect(() => {
    if (!isActive) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isActive, onClose])

  // Calculate progress percentage
  const progressPercent = wordGoal > 0 ? Math.min((wordCount / wordGoal) * 100, 100) : 0

  if (!isActive) return <>{children}</>

  return (
    <div className="fixed inset-0 z-50 bg-[var(--background)] overflow-hidden">
      {/* Top control bar */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-[var(--background)]/80 backdrop-blur-sm border-b border-[var(--border)]/50 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-4">
          {/* Ambient Sound Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--muted)]">Sounds:</span>
            <select
              value={ambientSound}
              onChange={(e) => setAmbientSound(e.target.value as AmbientSound)}
              className="text-xs bg-transparent border border-[var(--border)] rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            >
              <option value="none">None</option>
              <option value="rain">Rain</option>
              <option value="cafe">Coffee Shop</option>
              <option value="nature">Nature</option>
              <option value="whitenoise">White Noise</option>
            </select>
            {ambientSound !== 'none' && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setAmbientSound('none')}
                className="h-6 w-6 p-0"
              >
                <VolumeX className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Mode toggles */}
          <div className="flex items-center gap-2 border-l border-[var(--border)] pl-4">
            <Button
              size="sm"
              variant={typewriterMode ? 'primary' : 'ghost'}
              onClick={() => setTypewriterMode(!typewriterMode)}
              title="Typewriter Mode - Keep cursor centered"
              className="h-7 px-2 text-xs gap-1"
            >
              <Pencil className="w-3 h-3" />
              Typewriter
            </Button>
            <Button
              size="sm"
              variant={dimSurroundings ? 'primary' : 'ghost'}
              onClick={() => setDimSurroundings(!dimSurroundings)}
              title="Dim surrounding paragraphs"
              className="h-7 px-2 text-xs gap-1"
            >
              <Target className="w-3 h-3" />
              Highlight Focus
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Word Goal */}
          {onWordGoalChange && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--muted)]">Goal:</span>
              <input
                type="number"
                value={wordGoal || ''}
                onChange={(e) => onWordGoalChange(parseInt(e.target.value) || 0)}
                placeholder="words"
                className="w-16 text-xs bg-transparent border border-[var(--border)] rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>
          )}

          <Button
            size="sm"
            variant="outline"
            onClick={onClose}
            className="h-7 px-3 text-xs gap-1"
          >
            <X className="w-3 h-3" />
            Exit Focus Mode
          </Button>
        </div>
      </div>

      {/* Main content area with centering */}
      <div
        className={`h-full pt-12 pb-16 overflow-auto ${
          typewriterMode ? 'typewriter-scroll' : ''
        }`}
      >
        <div className="max-w-3xl mx-auto px-8 py-12">
          <div
            className={`focus-mode-content ${dimSurroundings ? 'dim-surroundings' : ''}`}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      {showStats && (
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-[var(--background)]/80 backdrop-blur-sm border-t border-[var(--border)]/50 flex items-center justify-center gap-8 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="text-center">
            <div className="text-lg font-bold text-[var(--foreground)]">{wordCount}</div>
            <div className="text-[10px] text-[var(--muted)] uppercase tracking-wide">Words</div>
          </div>

          {wordGoal > 0 && (
            <>
              <div className="h-8 w-px bg-[var(--border)]" />
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--primary)] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-xs text-[var(--muted)]">
                  {Math.round(progressPercent)}% of {wordGoal}
                </span>
              </div>
            </>
          )}

          <div className="h-8 w-px bg-[var(--border)]" />

          <div className="text-center">
            <div className="text-lg font-bold text-[var(--foreground)]">
              ~{Math.ceil(wordCount / 200)}
            </div>
            <div className="text-[10px] text-[var(--muted)] uppercase tracking-wide">Min read</div>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowStats(!showStats)}
            className="absolute right-4 h-6 w-6 p-0"
          >
            <Eye className="w-3 h-3" />
          </Button>
        </div>
      )}

      <style jsx>{`
        .typewriter-scroll {
          scroll-behavior: smooth;
        }

        .dim-surroundings :global(p:not(:focus-within)),
        .dim-surroundings :global(h1:not(:focus-within)),
        .dim-surroundings :global(h2:not(:focus-within)),
        .dim-surroundings :global(h3:not(:focus-within)),
        .dim-surroundings :global(li:not(:focus-within)),
        .dim-surroundings :global(blockquote:not(:focus-within)) {
          opacity: 0.4;
          transition: opacity 0.3s ease;
        }

        .dim-surroundings :global(p:focus-within),
        .dim-surroundings :global(h1:focus-within),
        .dim-surroundings :global(h2:focus-within),
        .dim-surroundings :global(h3:focus-within),
        .dim-surroundings :global(li:focus-within),
        .dim-surroundings :global(blockquote:focus-within),
        .dim-surroundings:hover :global(p),
        .dim-surroundings:hover :global(h1),
        .dim-surroundings:hover :global(h2),
        .dim-surroundings:hover :global(h3),
        .dim-surroundings:hover :global(li),
        .dim-surroundings:hover :global(blockquote) {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}

export default FocusMode
