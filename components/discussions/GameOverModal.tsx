'use client'

import { Trophy, Target, Zap, Star, X, ArrowRight } from 'lucide-react'
import type { GameMode } from './GameModePicker'

interface GameStats {
  score: number
  hits: number
  misses: number
  maxCombo: number
  maxStreak: number
  accuracy: number
  perfectCount: number
  greatCount: number
  goodCount: number
  mode: GameMode
  duration: number // seconds played
}

interface GameOverModalProps {
  stats: GameStats
  onClose: () => void
  onPlayAgain: () => void
  isSubmitting: boolean
  submitted: boolean
  rank: number | null
}

export function GameOverModal({ stats, onClose, onPlayAgain, isSubmitting, submitted, rank }: GameOverModalProps) {
  const gradeLabel = stats.accuracy >= 95 ? 'S' : stats.accuracy >= 85 ? 'A' : stats.accuracy >= 70 ? 'B' : stats.accuracy >= 50 ? 'C' : 'D'
  const gradeColor = stats.accuracy >= 95 ? '#FFD700' : stats.accuracy >= 85 ? '#4ECDC4' : stats.accuracy >= 70 ? '#A78BFA' : stats.accuracy >= 50 ? '#FBBF24' : '#FF6B6B'

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 bg-black/95 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-black text-white">GAME OVER</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-4 h-4 text-white/40" />
          </button>
        </div>

        {/* Grade */}
        <div className="flex items-center justify-center py-6">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center border-2"
            style={{
              borderColor: `${gradeColor}60`,
              background: `${gradeColor}15`,
              boxShadow: `0 0 40px ${gradeColor}20`,
            }}
          >
            <span className="text-4xl font-black" style={{ color: gradeColor }}>
              {gradeLabel}
            </span>
          </div>
        </div>

        {/* Score */}
        <div className="text-center pb-4">
          <p className="text-4xl font-black text-white tabular-nums">{stats.score.toLocaleString()}</p>
          <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
            {stats.mode.type === 'endless' ? 'Endless' : stats.mode.type === 'timed' ? `${stats.mode.seconds}s Round` : `${stats.mode.count} Notes`}
            {' · '}{Math.floor(stats.duration)}s played
          </p>
          {rank && (
            <p className="text-sm font-black text-yellow-400 mt-2">
              #{rank} on leaderboard
            </p>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-px bg-white/5 mx-5 rounded-xl overflow-hidden mb-5">
          <div className="bg-black/80 p-3 text-center">
            <Target className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <p className="text-lg font-black text-white tabular-nums">{stats.accuracy.toFixed(0)}%</p>
            <p className="text-[9px] text-white/40 uppercase">Accuracy</p>
          </div>
          <div className="bg-black/80 p-3 text-center">
            <Zap className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
            <p className="text-lg font-black text-white tabular-nums">{stats.maxCombo}</p>
            <p className="text-[9px] text-white/40 uppercase">Max Combo</p>
          </div>
          <div className="bg-black/80 p-3 text-center">
            <Star className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <p className="text-lg font-black text-white tabular-nums">{stats.maxStreak}</p>
            <p className="text-[9px] text-white/40 uppercase">Max Streak</p>
          </div>
        </div>

        {/* Hit breakdown */}
        <div className="mx-5 mb-5 text-[11px] font-bold space-y-1">
          <div className="flex justify-between text-white/50">
            <span>Perfect</span>
            <span className="text-[#FFD700]">{stats.perfectCount}</span>
          </div>
          <div className="flex justify-between text-white/50">
            <span>Great</span>
            <span className="text-[#4ECDC4]">{stats.greatCount}</span>
          </div>
          <div className="flex justify-between text-white/50">
            <span>Good</span>
            <span className="text-[#A78BFA]">{stats.goodCount}</span>
          </div>
          <div className="flex justify-between text-white/50">
            <span>Miss</span>
            <span className="text-[#FF4444]">{stats.misses}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 px-5 py-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white/60 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onPlayAgain}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-500 hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            Play Again
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Submit status */}
        {isSubmitting && (
          <div className="px-5 pb-3 text-center text-[10px] text-white/30">Saving score...</div>
        )}
        {submitted && !isSubmitting && (
          <div className="px-5 pb-3 text-center text-[10px] text-emerald-400/60">Score saved to leaderboard!</div>
        )}
      </div>
    </div>
  )
}

export type { GameStats }
