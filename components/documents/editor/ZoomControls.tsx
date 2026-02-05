'use client'

import { useState } from 'react'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ZoomControlsProps {
  zoom: number
  onZoomChange: (zoom: number) => void
  min?: number
  max?: number
  step?: number
}

const ZOOM_PRESETS = [50, 75, 90, 100, 110, 125, 150, 175, 200]

export function ZoomControls({
  zoom,
  onZoomChange,
  min = 50,
  max = 200,
  step = 10,
}: ZoomControlsProps) {
  const [showPresets, setShowPresets] = useState(false)

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + step, max)
    onZoomChange(newZoom)
  }

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - step, min)
    onZoomChange(newZoom)
  }

  const handleReset = () => {
    onZoomChange(100)
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onZoomChange(parseInt(e.target.value))
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="ghost"
        onClick={handleZoomOut}
        disabled={zoom <= min}
        title="Zoom Out"
        className="h-8 w-8 p-0"
      >
        <ZoomOut className="w-4 h-4" />
      </Button>

      <div className="relative">
        <button
          onClick={() => setShowPresets(!showPresets)}
          className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-[var(--background)] border border-[var(--border)] rounded hover:bg-[var(--secondary)]/20 min-w-[60px] justify-center"
        >
          {zoom}%
        </button>

        {showPresets && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowPresets(false)}
            />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg py-1 z-50 min-w-[80px]">
              {ZOOM_PRESETS.map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    onZoomChange(preset)
                    setShowPresets(false)
                  }}
                  className={`w-full px-3 py-1.5 text-xs text-left hover:bg-[var(--secondary)]/20 ${
                    zoom === preset ? 'font-bold text-[var(--primary)]' : ''
                  }`}
                >
                  {preset}%
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <Button
        size="sm"
        variant="ghost"
        onClick={handleZoomIn}
        disabled={zoom >= max}
        title="Zoom In"
        className="h-8 w-8 p-0"
      >
        <ZoomIn className="w-4 h-4" />
      </Button>

      {/* Slider for finer control */}
      <div className="hidden sm:flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={zoom}
          onChange={handleSliderChange}
          className="w-20 h-1 bg-[var(--border)] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[var(--primary)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>

      {zoom !== 100 && (
        <Button
          size="sm"
          variant="ghost"
          onClick={handleReset}
          title="Reset to 100%"
          className="h-8 w-8 p-0"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}

export default ZoomControls
