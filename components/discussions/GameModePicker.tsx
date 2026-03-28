'use client'

import { Gamepad2, Timer, Hash, Infinity, X } from 'lucide-react'

export type GameMode =
  | { type: 'endless' }
  | { type: 'timed'; seconds: number }
  | { type: 'notes'; count: number }

interface GameModePickerProps {
  onSelect: (mode: GameMode) => void
  onCancel: () => void
}

const MODES: { mode: GameMode; label: string; desc: string; icon: typeof Timer }[] = [
  { mode: { type: 'endless' }, label: 'ENDLESS', desc: 'Play until you stop', icon: Infinity },
  { mode: { type: 'timed', seconds: 60 }, label: '60 SEC', desc: 'Sprint round', icon: Timer },
  { mode: { type: 'timed', seconds: 90 }, label: '90 SEC', desc: 'Standard round', icon: Timer },
  { mode: { type: 'timed', seconds: 120 }, label: '120 SEC', desc: 'Extended round', icon: Timer },
  { mode: { type: 'notes', count: 50 }, label: '50 NOTES', desc: 'Quick session', icon: Hash },
  { mode: { type: 'notes', count: 100 }, label: '100 NOTES', desc: 'Full session', icon: Hash },
]

export function GameModePicker({ onSelect, onCancel }: GameModePickerProps) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden border border-white/10 bg-black/95 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-6 h-6 text-cyan-400" />
            <div>
              <h2 className="text-lg font-black text-white tracking-wide">GAME MODE</h2>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Choose your challenge</p>
            </div>
          </div>
          <button onClick={onCancel} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-5 h-5 text-white/40" />
          </button>
        </div>

        {/* Key hint */}
        <div className="px-6 py-3 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-b border-white/5">
          <p className="text-[11px] text-white/50 text-center">
            Press <span className="font-black text-cyan-400">1-8</span> keys to hit notes as they reach the bottom.
            <span className="hidden sm:inline"> On mobile, tap the lane.</span>
          </p>
        </div>

        {/* Mode buttons */}
        <div className="p-4 grid grid-cols-2 gap-3">
          {MODES.map((m, i) => {
            const Icon = m.icon
            return (
              <button
                key={i}
                onClick={() => onSelect(m.mode)}
                className="group relative p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-cyan-500/40 transition-all text-left"
              >
                <Icon className="w-5 h-5 text-white/30 group-hover:text-cyan-400 transition-colors mb-2" />
                <p className="text-sm font-black text-white tracking-wide">{m.label}</p>
                <p className="text-[10px] text-white/40 mt-0.5">{m.desc}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
