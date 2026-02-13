'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Pause, Play, Square, Settings, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useTextToSpeech } from '@/hooks/useTextToSpeech'

interface TextToSpeechControlProps {
  content: string
  className?: string
}

export function TextToSpeechControl({ content, className }: TextToSpeechControlProps) {
  const {
    speak,
    pause,
    resume,
    stop,
    isSpeaking,
    isPaused,
    isSupported,
    progress,
    setRate,
    rate,
  } = useTextToSpeech()

  const [showSettings, setShowSettings] = useState(false)

  if (!isSupported) {
    return null // Don't render if TTS not supported
  }

  const handlePlayPause = () => {
    if (isSpeaking && !isPaused) {
      pause()
    } else if (isPaused) {
      resume()
    } else {
      speak(content)
    }
  }

  const handleStop = () => {
    stop()
    setShowSettings(false)
  }

  const rateOptions = [
    { value: 0.5, label: '0.5x' },
    { value: 0.75, label: '0.75x' },
    { value: 0.9, label: '0.9x' },
    { value: 1, label: '1x' },
    { value: 1.25, label: '1.25x' },
    { value: 1.5, label: '1.5x' },
  ]

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Main play/pause button */}
      <button
        onClick={handlePlayPause}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all',
          isSpeaking
            ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
            : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted)]/80'
        )}
        title={isSpeaking ? (isPaused ? 'Resume' : 'Pause') : 'Read aloud'}
      >
        {isSpeaking ? (
          isPaused ? (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </>
          )
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5" />
            <span>Listen</span>
          </>
        )}
      </button>

      {/* Stop button (only when playing) */}
      {isSpeaking && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleStop}
          className="p-1.5 rounded-lg bg-red-500/20 text-red-600 hover:bg-red-500/30 transition-colors"
          title="Stop"
        >
          <Square className="w-3.5 h-3.5" />
        </motion.button>
      )}

      {/* Settings button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className={cn(
          'p-1.5 rounded-lg transition-colors',
          showSettings
            ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
            : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted)]/80'
        )}
        title="Settings"
      >
        <Settings className="w-3.5 h-3.5" />
      </button>

      {/* Progress bar (when playing) */}
      {isSpeaking && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 60 }}
          className="h-1.5 bg-[var(--muted)] rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-[var(--primary)] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </motion.div>
      )}

      {/* Settings dropdown */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full mt-2 right-0 p-3 bg-[var(--card)] rounded-lg shadow-xl border border-[var(--border)] z-50"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[var(--foreground)]">Speed</span>
              <button
                onClick={() => setShowSettings(false)}
                className="p-0.5 rounded hover:bg-[var(--muted)]"
              >
                <X className="w-3 h-3 text-[var(--muted-foreground)]" />
              </button>
            </div>
            <div className="flex gap-1">
              {rateOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setRate(option.value)}
                  className={cn(
                    'px-2 py-1 text-[10px] rounded transition-colors',
                    rate === option.value
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                      : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted)]/80'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
