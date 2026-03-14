'use client'

import { useState, useCallback } from 'react'
import { X, Check, Sparkles, Palette, Fish } from 'lucide-react'
import {
  FishSVG,
  getTierFromScore,
  getTierName,
  TIER_COLORS,
  type FishTier,
  type FishColors,
  type FishPattern,
  type FishSpecies,
  type FishCustomization,
} from './FishSpecies'

interface FishCustomizerProps {
  stockScore: number
  currentCustomization: FishCustomization | null
  onSave: (customization: FishCustomization) => Promise<void>
  onClose: () => void
}

const ALL_SPECIES: { species: FishSpecies; tier: FishTier; name: string; unlockScore: number; description: string }[] = [
  { species: 'guppy', tier: 0, name: 'Guppy', unlockScore: 0, description: 'Your humble beginning' },
  { species: 'swift-guppy', tier: 1, name: 'Swift Guppy', unlockScore: 10, description: 'Sleeker and faster' },
  { species: 'fancy-guppy', tier: 2, name: 'Fancy Guppy', unlockScore: 25, description: 'Fan tail with flair' },
  { species: 'delta-guppy', tier: 3, name: 'Delta Guppy', unlockScore: 50, description: 'Majestic delta tail' },
  { species: 'veil-guppy', tier: 4, name: 'Veil Guppy', unlockScore: 100, description: 'Flowing veil fins' },
  { species: 'supreme-guppy', tier: 5, name: 'Supreme Guppy', unlockScore: 200, description: 'The crown jewel' },
]

const ALL_PATTERNS: { pattern: FishPattern; name: string; description: string }[] = [
  { pattern: 'none', name: 'Default', description: 'Natural look' },
  { pattern: 'scales', name: 'Scales', description: 'Classic fish scale pattern' },
  { pattern: 'fine-scales', name: 'Fine Scales', description: 'Detailed small scales' },
  { pattern: 'armored', name: 'Armored', description: 'Heavy plated scales' },
  { pattern: 'shimmer', name: 'Shimmer', description: 'Iridescent scale sheen' },
  { pattern: 'koi', name: 'Koi', description: 'Koi-style patches with scales' },
]

const COLOR_PRESETS: { name: string; colors: Partial<FishColors> }[] = [
  { name: 'Ocean', colors: { body: '#1E88E5', fin: '#0D47A1', accent: '#64B5F6' } },
  { name: 'Coral', colors: { body: '#FF7043', fin: '#E64A19', accent: '#FFAB91' } },
  { name: 'Emerald', colors: { body: '#43A047', fin: '#2E7D32', accent: '#81C784' } },
  { name: 'Sunset', colors: { body: '#FF6F00', fin: '#E65100', accent: '#FFD54F' } },
  { name: 'Amethyst', colors: { body: '#8E24AA', fin: '#6A1B9A', accent: '#CE93D8' } },
  { name: 'Rose', colors: { body: '#EC407A', fin: '#C2185B', accent: '#F48FB1' } },
  { name: 'Midnight', colors: { body: '#283593', fin: '#1A237E', accent: '#7986CB' } },
  { name: 'Gold', colors: { body: '#F9A825', fin: '#F57F17', accent: '#FFF176' } },
  { name: 'Crimson', colors: { body: '#D32F2F', fin: '#B71C1C', accent: '#EF9A9A' } },
  { name: 'Arctic', colors: { body: '#4DD0E1', fin: '#00838F', accent: '#E0F7FA' } },
  { name: 'Obsidian', colors: { body: '#37474F', fin: '#263238', accent: '#78909C' } },
  { name: 'Sakura', colors: { body: '#F06292', fin: '#AD1457', accent: '#FCE4EC' } },
]

type Tab = 'species' | 'colors' | 'patterns'

export function FishCustomizer({ stockScore, currentCustomization, onSave, onClose }: FishCustomizerProps) {
  const userTier = getTierFromScore(stockScore)
  const [tab, setTab] = useState<Tab>('species')
  const [saving, setSaving] = useState(false)

  const [selectedSpecies, setSelectedSpecies] = useState<FishSpecies | null>(
    currentCustomization?.species || null
  )
  const [selectedColors, setSelectedColors] = useState<Partial<FishColors>>(
    (currentCustomization?.colors as Partial<FishColors>) || {}
  )
  const [selectedPattern, setSelectedPattern] = useState<FishPattern>(
    currentCustomization?.pattern || 'none'
  )

  // The preview tier (which species shape to show)
  const previewTier = selectedSpecies
    ? ALL_SPECIES.find(s => s.species === selectedSpecies)?.tier ?? userTier
    : userTier

  const previewCustomization: FishCustomization = {
    species: selectedSpecies,
    colors: Object.keys(selectedColors).length > 0 ? selectedColors : null,
    pattern: selectedPattern,
  }

  const handleSave = useCallback(async () => {
    setSaving(true)
    try {
      await onSave(previewCustomization)
    } finally {
      setSaving(false)
    }
  }, [onSave, previewCustomization])

  const handleColorChange = (key: keyof FishColors, value: string) => {
    setSelectedColors(prev => ({ ...prev, [key]: value }))
  }

  const applyPreset = (preset: Partial<FishColors>) => {
    setSelectedColors(prev => ({ ...prev, ...preset }))
  }

  const resetColors = () => {
    setSelectedColors({})
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-cyan-700/50"
        style={{ background: '#0A1628' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-800/40 bg-gradient-to-r from-[#0D2137] via-[#123855] to-[#0D2137]">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-black text-cyan-100">CUSTOMIZE YOUR FISH</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-cyan-900/40 transition-colors"
          >
            <X className="w-4 h-4 text-cyan-500" />
          </button>
        </div>

        {/* Preview */}
        <div className="relative px-5 py-4 flex items-center justify-center border-b border-cyan-800/30"
          style={{ background: 'linear-gradient(180deg, #0D2137 0%, #123855 100%)' }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <FishSVG
                tier={previewTier as FishTier}
                size={80}
                customization={previewCustomization}
                id="customizer-preview"
              />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-cyan-300">
                {selectedSpecies
                  ? ALL_SPECIES.find(s => s.species === selectedSpecies)?.name
                  : getTierName(userTier)}
              </p>
              <p className="text-[10px] text-cyan-500">{stockScore} STOCK · Tier {userTier + 1}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-cyan-800/30">
          {([
            { id: 'species' as Tab, label: 'Species', icon: Fish },
            { id: 'colors' as Tab, label: 'Colors', icon: Palette },
            { id: 'patterns' as Tab, label: 'Designs', icon: Sparkles },
          ]).map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold transition-colors ${
                tab === t.id
                  ? 'text-cyan-300 border-b-2 border-cyan-400 bg-cyan-900/20'
                  : 'text-cyan-600 hover:text-cyan-400 hover:bg-cyan-900/10'
              }`}
            >
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4 max-h-[320px] overflow-y-auto">
          {tab === 'species' && (
            <div className="space-y-2">
              <p className="text-[10px] text-cyan-500 font-medium mb-3">
                Unlock higher-tier species by earning STOCK.
                {stockScore > 0 && ` You have ${stockScore} STOCK.`}
              </p>
              <div className="space-y-2">
                {ALL_SPECIES.map(sp => {
                  const isUnlocked = stockScore >= sp.unlockScore
                  const isSelected = selectedSpecies === sp.species ||
                    (!selectedSpecies && sp.tier === userTier)

                  return (
                    <button
                      key={sp.species}
                      onClick={() => isUnlocked && setSelectedSpecies(sp.species)}
                      disabled={!isUnlocked}
                      className={`relative w-full flex items-center gap-3 px-3 py-3 rounded-xl border transition-all ${
                        !isUnlocked
                          ? 'border-cyan-900/30 bg-cyan-950/20 opacity-50 cursor-not-allowed'
                          : isSelected
                            ? 'border-cyan-400 bg-cyan-900/30 shadow-lg shadow-cyan-900/20'
                            : 'border-cyan-800/40 bg-cyan-900/10 hover:border-cyan-600/50 hover:bg-cyan-900/20'
                      }`}
                    >
                      <div className="flex-shrink-0 w-14 h-10 flex items-center justify-center">
                        <FishSVG tier={sp.tier} size={48} id={`species-${sp.species}`} />
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <p className={`text-xs font-bold ${isUnlocked ? 'text-cyan-200' : 'text-cyan-600'}`}>
                          {sp.name}
                        </p>
                        <p className="text-[9px] text-cyan-600">
                          {sp.description}
                        </p>
                        {!isUnlocked ? (
                          <p className="text-[8px] text-amber-500/80 font-bold mt-0.5">
                            {sp.unlockScore}+ STOCK to unlock
                          </p>
                        ) : !isSelected ? (
                          <p className="text-[8px] text-emerald-500/70 font-medium mt-0.5">
                            Unlocked
                          </p>
                        ) : null}
                      </div>
                      {isSelected && isUnlocked && (
                        <Check className="absolute top-2 right-2 w-3.5 h-3.5 text-cyan-400" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {tab === 'colors' && (
            <div className="space-y-4">
              {/* Color presets */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] text-cyan-500 font-bold uppercase">Color Presets</p>
                  <button
                    onClick={resetColors}
                    className="text-[10px] text-cyan-600 hover:text-cyan-400 font-medium transition-colors"
                  >
                    Reset to default
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {COLOR_PRESETS.map(preset => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset.colors)}
                      className="flex flex-col items-center gap-1 p-2 rounded-lg border border-cyan-800/30 hover:border-cyan-600/50 hover:bg-cyan-900/20 transition-all"
                    >
                      <div className="flex gap-0.5">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: preset.colors.body }}
                        />
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: preset.colors.fin }}
                        />
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: preset.colors.accent }}
                        />
                      </div>
                      <span className="text-[8px] font-bold text-cyan-500">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Individual color pickers */}
              <div>
                <p className="text-[10px] text-cyan-500 font-bold uppercase mb-2">Custom Colors</p>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { key: 'body' as keyof FishColors, label: 'Body' },
                    { key: 'fin' as keyof FishColors, label: 'Fins' },
                    { key: 'accent' as keyof FishColors, label: 'Accent' },
                    { key: 'eye' as keyof FishColors, label: 'Eye' },
                  ]).map(c => {
                    const defaultColor = TIER_COLORS[previewTier as FishTier]?.[c.key] || '#888888'
                    const currentColor = selectedColors[c.key] || defaultColor

                    return (
                      <label
                        key={c.key}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-cyan-800/30 hover:border-cyan-600/50 transition-colors cursor-pointer"
                      >
                        <input
                          type="color"
                          value={currentColor}
                          onChange={e => handleColorChange(c.key, e.target.value)}
                          className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-none"
                        />
                        <span className="text-xs font-medium text-cyan-300">{c.label}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {tab === 'patterns' && (
            <div className="space-y-2">
              <p className="text-[10px] text-cyan-500 font-medium mb-3">
                Add a unique design overlay to make your fish stand out.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {ALL_PATTERNS.map(p => {
                  const isSelected = selectedPattern === p.pattern

                  return (
                    <button
                      key={p.pattern}
                      onClick={() => setSelectedPattern(p.pattern)}
                      className={`relative flex items-center gap-3 px-3 py-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-900/30 shadow-lg shadow-cyan-900/20'
                          : 'border-cyan-800/40 bg-cyan-900/10 hover:border-cyan-600/50 hover:bg-cyan-900/20'
                      }`}
                    >
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                        <FishSVG
                          tier={previewTier as FishTier}
                          size={28}
                          customization={{
                            colors: Object.keys(selectedColors).length > 0 ? selectedColors : null,
                            pattern: p.pattern,
                          }}
                          id={`pattern-preview-${p.pattern}`}
                        />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-cyan-200">{p.name}</p>
                        <p className="text-[9px] text-cyan-600">{p.description}</p>
                      </div>
                      {isSelected && (
                        <Check className="absolute top-2 right-2 w-3.5 h-3.5 text-cyan-400" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-cyan-800/30 bg-cyan-900/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-cyan-500 hover:text-cyan-300 hover:bg-cyan-900/30 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 transition-all disabled:opacity-50"
          >
            {saving ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Check className="w-3.5 h-3.5" />
            )}
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
