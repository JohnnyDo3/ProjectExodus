'use client'

import { Zap, Target, Timer, Square } from 'lucide-react'
import type { GameMode } from './GameModePicker'

interface GameHUDProps {
  score: number
  combo: number
  multiplier: number
  accuracy: number
  hits: number
  misses: number
  mode: GameMode
  timeLeft: number | null  // seconds remaining (timed mode) or null
  notesLeft: number | null // notes remaining (notes mode) or null
  onStop: () => void
}

export function GameHUD({ score, combo, multiplier, accuracy, hits, misses, mode, timeLeft, notesLeft, onStop }: GameHUDProps) {
  return (
    <div className="absolute top-14 left-0 right-0 z-30 pointer-events-none">
      <div className="flex items-start justify-between px-4 sm:px-6 py-2">
        {/* Left: Score + Combo */}
        <div className="space-y-1">
          {/* Score */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-white tabular-nums tracking-tight">
              {score.toLocaleString()}
            </span>
            {multiplier > 1 && (
              <span className="text-sm font-black text-yellow-400 animate-pulse">
                {multiplier}x
              </span>
            )}
          </div>

          {/* Combo */}
          {combo > 0 && (
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs font-black text-yellow-400/80 tabular-nums">
                {combo} COMBO
              </span>
            </div>
          )}
        </div>

        {/* Center: Mode info */}
        <div className="text-center">
          {mode.type === 'timed' && timeLeft !== null && (
            <div className={`text-2xl font-black tabular-nums ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white/80'}`}>
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </div>
          )}
          {mode.type === 'notes' && notesLeft !== null && (
            <div className="text-lg font-black text-white/80 tabular-nums">
              {notesLeft} <span className="text-xs text-white/40">left</span>
            </div>
          )}
          {mode.type === 'endless' && (
            <div className="flex items-center gap-1 text-xs text-white/30">
              <Timer className="w-3 h-3" />
              <span className="font-bold uppercase tracking-wider">Endless</span>
            </div>
          )}
        </div>

        {/* Right: Accuracy + Stop */}
        <div className="space-y-1 text-right">
          {/* Accuracy */}
          <div className="flex items-center justify-end gap-1.5">
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            <span className={`text-lg font-black tabular-nums ${accuracy >= 80 ? 'text-emerald-400' : accuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
              {accuracy.toFixed(0)}%
            </span>
          </div>

          {/* Hit/Miss */}
          <div className="flex items-center gap-2 text-[10px] font-bold tabular-nums">
            <span className="text-emerald-400/60">{hits} hit</span>
            <span className="text-red-400/60">{misses} miss</span>
          </div>

          {/* Stop button */}
          <button
            onClick={onStop}
            className="pointer-events-auto flex items-center gap-1 px-2 py-1 rounded-md bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] font-black uppercase tracking-wider hover:bg-red-500/30 transition-colors mt-1"
          >
            <Square className="w-3 h-3" />
            Stop
          </button>
        </div>
      </div>
    </div>
  )
}
