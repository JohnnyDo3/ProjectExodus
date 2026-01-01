'use client'

import React from 'react'

interface ArchitectureSVGProps {
  category: string
  elementId?: string
  className?: string
  size?: number
}

// Hand-drawn style helper - adds slight randomness to paths
const jitter = (base: number, amount: number = 0.5): number => {
  return base + (Math.random() - 0.5) * amount
}

// Create a hand-drawn line path
const handDrawnLine = (x1: number, y1: number, x2: number, y2: number): string => {
  const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * 2
  const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * 2
  return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`
}

// Column SVG - Doric/Ionic/Corinthian style
const ColumnSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Base */}
    <path d="M 25 95 L 75 95" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 28 90 L 72 90" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 30 85 L 70 85" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Shaft with fluting lines */}
    <path d="M 32 85 L 35 25" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 68 85 L 65 25" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Fluting details */}
    <path d="M 38 80 L 40 28" strokeWidth="0.5" fill="none" opacity="0.6" />
    <path d="M 44 80 L 45 28" strokeWidth="0.5" fill="none" opacity="0.6" />
    <path d="M 50 80 L 50 28" strokeWidth="0.5" fill="none" opacity="0.6" />
    <path d="M 56 80 L 55 28" strokeWidth="0.5" fill="none" opacity="0.6" />
    <path d="M 62 80 L 60 28" strokeWidth="0.5" fill="none" opacity="0.6" />

    {/* Capital */}
    <path d="M 30 25 L 70 25" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 28 22 L 72 22" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Volutes (Ionic style) */}
    <path d="M 25 18 Q 20 15, 22 10 Q 25 5, 30 8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 75 18 Q 80 15, 78 10 Q 75 5, 70 8" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Abacus */}
    <path d="M 22 8 L 78 8" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 20 5 L 80 5" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
)

// Arch SVG - Round/Pointed/Horseshoe
const ArchSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Left pier */}
    <path d="M 15 95 L 15 40" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 25 95 L 25 40" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Right pier */}
    <path d="M 75 95 L 75 40" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 85 95 L 85 40" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Arch curve */}
    <path d="M 25 40 Q 25 10, 50 10 Q 75 10, 75 40" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 15 40 Q 15 5, 50 5 Q 85 5, 85 40" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Voussoirs (arch stones) */}
    <path d="M 30 35 L 25 25" strokeWidth="1" fill="none" opacity="0.6" />
    <path d="M 38 25 L 35 15" strokeWidth="1" fill="none" opacity="0.6" />
    <path d="M 50 20 L 50 10" strokeWidth="1" fill="none" opacity="0.6" />
    <path d="M 62 25 L 65 15" strokeWidth="1" fill="none" opacity="0.6" />
    <path d="M 70 35 L 75 25" strokeWidth="1" fill="none" opacity="0.6" />

    {/* Keystone */}
    <path d="M 45 12 L 45 5 L 55 5 L 55 12" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Ground line */}
    <path d="M 5 95 L 95 95" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
)

// Dome SVG
const DomeSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Main dome curve */}
    <path d="M 10 70 Q 10 20, 50 15 Q 90 20, 90 70" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Inner dome structure lines */}
    <path d="M 20 65 Q 20 30, 50 25 Q 80 30, 80 65" strokeWidth="1" fill="none" opacity="0.5" />

    {/* Ribbing */}
    <path d="M 50 15 L 50 70" strokeWidth="1" fill="none" opacity="0.6" />
    <path d="M 30 25 Q 35 45, 35 70" strokeWidth="0.8" fill="none" opacity="0.5" />
    <path d="M 70 25 Q 65 45, 65 70" strokeWidth="0.8" fill="none" opacity="0.5" />

    {/* Lantern/Oculus at top */}
    <ellipse cx="50" cy="15" rx="8" ry="3" strokeWidth="1.5" fill="none" />
    <path d="M 42 15 L 42 8" strokeWidth="1" fill="none" />
    <path d="M 58 15 L 58 8" strokeWidth="1" fill="none" />
    <path d="M 42 8 Q 50 3, 58 8" strokeWidth="1" fill="none" />

    {/* Drum/Base */}
    <path d="M 10 70 L 10 85" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 90 70 L 90 85" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 10 85 L 90 85" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Windows in drum */}
    <rect x="20" y="72" width="8" height="10" strokeWidth="1" fill="none" rx="1" />
    <rect x="35" y="72" width="8" height="10" strokeWidth="1" fill="none" rx="1" />
    <rect x="57" y="72" width="8" height="10" strokeWidth="1" fill="none" rx="1" />
    <rect x="72" y="72" width="8" height="10" strokeWidth="1" fill="none" rx="1" />
  </svg>
)

// Window SVG - Rose window / Palladian
const WindowSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Outer frame */}
    <path d="M 20 90 L 20 25" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 80 90 L 80 25" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 20 25 Q 20 10, 50 10 Q 80 10, 80 25" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 20 90 L 80 90" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Tracery - Rose window style */}
    <circle cx="50" cy="35" r="15" strokeWidth="1.5" fill="none" />
    <circle cx="50" cy="35" r="8" strokeWidth="1" fill="none" />

    {/* Tracery spokes */}
    <path d="M 50 20 L 50 27" strokeWidth="1" fill="none" />
    <path d="M 50 43 L 50 50" strokeWidth="1" fill="none" />
    <path d="M 35 35 L 42 35" strokeWidth="1" fill="none" />
    <path d="M 58 35 L 65 35" strokeWidth="1" fill="none" />
    <path d="M 39 24 L 44 29" strokeWidth="1" fill="none" />
    <path d="M 56 41 L 61 46" strokeWidth="1" fill="none" />
    <path d="M 61 24 L 56 29" strokeWidth="1" fill="none" />
    <path d="M 44 41 L 39 46" strokeWidth="1" fill="none" />

    {/* Lower panels */}
    <path d="M 20 55 L 80 55" strokeWidth="1" fill="none" />
    <path d="M 50 55 L 50 90" strokeWidth="1" fill="none" />

    {/* Mullions */}
    <path d="M 35 55 L 35 90" strokeWidth="0.8" fill="none" opacity="0.6" />
    <path d="M 65 55 L 65 90" strokeWidth="0.8" fill="none" opacity="0.6" />
  </svg>
)

// Roof SVG - Gable/Hip/Mansard
const RoofSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Main roof lines */}
    <path d="M 10 60 L 50 15 L 90 60" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

    {/* Roof texture lines */}
    <path d="M 15 55 L 50 22 L 85 55" strokeWidth="1" fill="none" opacity="0.5" />
    <path d="M 20 50 L 50 28 L 80 50" strokeWidth="0.8" fill="none" opacity="0.4" />

    {/* Shingle/tile lines */}
    <path d="M 25 52 L 35 42" strokeWidth="0.5" fill="none" opacity="0.4" />
    <path d="M 35 55 L 45 45" strokeWidth="0.5" fill="none" opacity="0.4" />
    <path d="M 55 45 L 65 55" strokeWidth="0.5" fill="none" opacity="0.4" />
    <path d="M 65 42 L 75 52" strokeWidth="0.5" fill="none" opacity="0.4" />

    {/* Chimney */}
    <path d="M 65 35 L 65 20 L 75 20 L 75 40" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 63 20 L 77 20" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Building facade below */}
    <path d="M 10 60 L 10 90" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 90 60 L 90 90" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 10 90 L 90 90" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Windows */}
    <rect x="25" y="68" width="12" height="15" strokeWidth="1" fill="none" rx="1" />
    <rect x="63" y="68" width="12" height="15" strokeWidth="1" fill="none" rx="1" />

    {/* Door */}
    <path d="M 43 90 L 43 70 Q 50 65, 57 70 L 57 90" strokeWidth="1.5" fill="none" />
  </svg>
)

// Vault SVG
const VaultSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Main vault curves */}
    <path d="M 5 85 Q 5 30, 50 25 Q 95 30, 95 85" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Inner vault */}
    <path d="M 15 80 Q 15 40, 50 35 Q 85 40, 85 80" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Rib vault lines */}
    <path d="M 50 25 L 50 85" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 15 80 Q 50 50, 85 80" strokeWidth="1" fill="none" opacity="0.7" />
    <path d="M 5 85 Q 50 55, 95 85" strokeWidth="1" fill="none" opacity="0.7" />

    {/* Cross ribs */}
    <path d="M 5 85 Q 50 40, 95 85" strokeWidth="1" fill="none" opacity="0.5" />

    {/* Texture lines */}
    <path d="M 25 70 Q 50 45, 75 70" strokeWidth="0.5" fill="none" opacity="0.4" />
    <path d="M 35 60 Q 50 42, 65 60" strokeWidth="0.5" fill="none" opacity="0.4" />

    {/* Base line */}
    <path d="M 0 85 L 100 85" strokeWidth="1.5" fill="none" />
  </svg>
)

// Religious/Church SVG
const ReligiousSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Main tower/steeple */}
    <path d="M 35 90 L 35 45" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 65 90 L 65 45" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Steeple */}
    <path d="M 35 45 L 50 15 L 65 45" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

    {/* Cross at top */}
    <path d="M 50 15 L 50 5" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 45 10 L 55 10" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Rose window */}
    <circle cx="50" cy="55" r="8" strokeWidth="1.5" fill="none" />
    <path d="M 50 47 L 50 63" strokeWidth="0.8" fill="none" />
    <path d="M 42 55 L 58 55" strokeWidth="0.8" fill="none" />

    {/* Door */}
    <path d="M 42 90 L 42 72 Q 50 67, 58 72 L 58 90" strokeWidth="1.5" fill="none" />

    {/* Side wings */}
    <path d="M 15 90 L 15 60 L 35 60" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 85 90 L 85 60 L 65 60" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Side roofs */}
    <path d="M 15 60 L 25 50 L 35 60" strokeWidth="1.5" fill="none" />
    <path d="M 65 60 L 75 50 L 85 60" strokeWidth="1.5" fill="none" />

    {/* Ground */}
    <path d="M 5 90 L 95 90" strokeWidth="1.5" fill="none" />
  </svg>
)

// Fortification/Castle SVG
const FortificationSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Main wall */}
    <path d="M 10 90 L 10 40" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 90 90 L 90 40" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Battlements/Crenellations */}
    <path d="M 10 40 L 10 35 L 18 35 L 18 40 L 26 40 L 26 35 L 34 35 L 34 40" strokeWidth="1.5" fill="none" />
    <path d="M 66 40 L 66 35 L 74 35 L 74 40 L 82 40 L 82 35 L 90 35 L 90 40" strokeWidth="1.5" fill="none" />

    {/* Central tower */}
    <path d="M 38 90 L 38 25" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 62 90 L 62 25" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Tower battlements */}
    <path d="M 38 25 L 38 20 L 44 20 L 44 25 L 50 25 L 50 20 L 56 20 L 56 25 L 62 25 L 62 20" strokeWidth="1.5" fill="none" />

    {/* Arrow slits */}
    <path d="M 49 35 L 51 35 M 50 32 L 50 38" strokeWidth="1" fill="none" />
    <path d="M 49 50 L 51 50 M 50 47 L 50 53" strokeWidth="1" fill="none" />

    {/* Gate */}
    <path d="M 43 90 L 43 65 Q 50 58, 57 65 L 57 90" strokeWidth="1.5" fill="none" />

    {/* Portcullis lines */}
    <path d="M 45 65 L 45 88" strokeWidth="0.5" fill="none" opacity="0.6" />
    <path d="M 50 60 L 50 88" strokeWidth="0.5" fill="none" opacity="0.6" />
    <path d="M 55 65 L 55 88" strokeWidth="0.5" fill="none" opacity="0.6" />
    <path d="M 43 72 L 57 72" strokeWidth="0.5" fill="none" opacity="0.6" />
    <path d="M 43 80 L 57 80" strokeWidth="0.5" fill="none" opacity="0.6" />

    {/* Ground */}
    <path d="M 0 90 L 100 90" strokeWidth="1.5" fill="none" />
  </svg>
)

// Door SVG
const DoorSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Door frame */}
    <path d="M 25 95 L 25 20" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 75 95 L 75 20" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Pediment */}
    <path d="M 20 20 L 50 5 L 80 20" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 20 20 L 80 20" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Door panels */}
    <rect x="30" y="55" width="15" height="25" strokeWidth="1" fill="none" rx="1" />
    <rect x="55" y="55" width="15" height="25" strokeWidth="1" fill="none" rx="1" />
    <rect x="30" y="25" width="15" height="22" strokeWidth="1" fill="none" rx="1" />
    <rect x="55" y="25" width="15" height="22" strokeWidth="1" fill="none" rx="1" />

    {/* Transom window */}
    <path d="M 25 20 L 75 20" strokeWidth="1" fill="none" />

    {/* Door handle */}
    <circle cx="68" cy="60" r="2" strokeWidth="1" fill="none" />

    {/* Threshold */}
    <path d="M 20 95 L 80 95" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Pilasters */}
    <path d="M 22 20 L 22 95" strokeWidth="1" fill="none" opacity="0.6" />
    <path d="M 78 20 L 78 95" strokeWidth="1" fill="none" opacity="0.6" />
  </svg>
)

// Decorative/Ornament SVG
const DecorativeSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Central rosette */}
    <circle cx="50" cy="50" r="20" strokeWidth="1.5" fill="none" />
    <circle cx="50" cy="50" r="12" strokeWidth="1" fill="none" />
    <circle cx="50" cy="50" r="5" strokeWidth="1" fill="none" />

    {/* Acanthus leaves */}
    <path d="M 50 30 Q 45 20, 50 10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 50 30 Q 55 20, 50 10" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    <path d="M 70 50 Q 80 45, 90 50" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 70 50 Q 80 55, 90 50" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    <path d="M 50 70 Q 45 80, 50 90" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 50 70 Q 55 80, 50 90" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    <path d="M 30 50 Q 20 45, 10 50" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 30 50 Q 20 55, 10 50" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Diagonal flourishes */}
    <path d="M 36 36 Q 25 25, 15 15" strokeWidth="1" fill="none" strokeLinecap="round" />
    <path d="M 64 36 Q 75 25, 85 15" strokeWidth="1" fill="none" strokeLinecap="round" />
    <path d="M 36 64 Q 25 75, 15 85" strokeWidth="1" fill="none" strokeLinecap="round" />
    <path d="M 64 64 Q 75 75, 85 85" strokeWidth="1" fill="none" strokeLinecap="round" />

    {/* Inner detail petals */}
    <path d="M 50 38 Q 45 44, 50 50" strokeWidth="0.8" fill="none" />
    <path d="M 50 38 Q 55 44, 50 50" strokeWidth="0.8" fill="none" />
    <path d="M 62 50 Q 56 45, 50 50" strokeWidth="0.8" fill="none" />
    <path d="M 62 50 Q 56 55, 50 50" strokeWidth="0.8" fill="none" />
  </svg>
)

// Facade SVG
const FacadeSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Main building outline */}
    <path d="M 10 90 L 10 25" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 90 90 L 90 25" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Pediment */}
    <path d="M 10 25 L 50 8 L 90 25" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

    {/* Cornice */}
    <path d="M 5 25 L 95 25" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Columns */}
    <path d="M 25 85 L 25 35" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 40 85 L 40 35" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 60 85 L 60 35" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 75 85 L 75 35" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Column capitals */}
    <path d="M 22 35 L 28 35" strokeWidth="1" fill="none" />
    <path d="M 37 35 L 43 35" strokeWidth="1" fill="none" />
    <path d="M 57 35 L 63 35" strokeWidth="1" fill="none" />
    <path d="M 72 35 L 78 35" strokeWidth="1" fill="none" />

    {/* Windows */}
    <rect x="28" y="45" width="10" height="15" strokeWidth="1" fill="none" rx="1" />
    <rect x="62" y="45" width="10" height="15" strokeWidth="1" fill="none" rx="1" />

    {/* Central door */}
    <path d="M 43 90 L 43 70 Q 50 65, 57 70 L 57 90" strokeWidth="1.5" fill="none" />

    {/* Steps */}
    <path d="M 35 90 L 65 90" strokeWidth="1" fill="none" />
    <path d="M 33 93 L 67 93" strokeWidth="1" fill="none" />
    <path d="M 31 96 L 69 96" strokeWidth="1" fill="none" />

    {/* Balustrade */}
    <path d="M 10 32 L 22 32" strokeWidth="0.8" fill="none" />
    <path d="M 78 32 L 90 32" strokeWidth="0.8" fill="none" />
  </svg>
)

// Floor/Stairs SVG
const FloorSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Staircase - grand spiral suggestion */}
    <path d="M 20 85 L 40 85 L 40 70 L 60 70 L 60 55 L 80 55 L 80 40" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

    {/* Handrail */}
    <path d="M 18 80 L 38 80 L 38 65 L 58 65 L 58 50 L 78 50 L 78 35" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

    {/* Balusters */}
    <path d="M 25 85 L 25 80" strokeWidth="1" fill="none" />
    <path d="M 32 85 L 32 80" strokeWidth="1" fill="none" />
    <path d="M 45 70 L 45 65" strokeWidth="1" fill="none" />
    <path d="M 52 70 L 52 65" strokeWidth="1" fill="none" />
    <path d="M 65 55 L 65 50" strokeWidth="1" fill="none" />
    <path d="M 72 55 L 72 50" strokeWidth="1" fill="none" />

    {/* Newel posts */}
    <circle cx="40" cy="70" r="2" strokeWidth="1" fill="none" />
    <circle cx="60" cy="55" r="2" strokeWidth="1" fill="none" />
    <circle cx="80" cy="40" r="2" strokeWidth="1" fill="none" />

    {/* Floor pattern */}
    <path d="M 5 95 L 95 95" strokeWidth="1" fill="none" />
    <path d="M 10 90 L 20 90" strokeWidth="0.5" fill="none" opacity="0.5" />
    <path d="M 25 90 L 35 90" strokeWidth="0.5" fill="none" opacity="0.5" />

    {/* Decorative top finial */}
    <path d="M 80 40 L 80 30" strokeWidth="1.5" fill="none" />
    <circle cx="80" cy="27" r="3" strokeWidth="1" fill="none" />
  </svg>
)

// Ceiling SVG
const CeilingSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Coffered ceiling pattern */}
    <rect x="10" y="10" width="80" height="80" strokeWidth="2" fill="none" />

    {/* Main grid */}
    <path d="M 10 36 L 90 36" strokeWidth="1.5" fill="none" />
    <path d="M 10 63 L 90 63" strokeWidth="1.5" fill="none" />
    <path d="M 36 10 L 36 90" strokeWidth="1.5" fill="none" />
    <path d="M 63 10 L 63 90" strokeWidth="1.5" fill="none" />

    {/* Central rosette */}
    <circle cx="50" cy="50" r="10" strokeWidth="1.5" fill="none" />
    <circle cx="50" cy="50" r="5" strokeWidth="1" fill="none" />

    {/* Corner details */}
    <path d="M 14 14 L 32 14 L 32 32 L 14 32 Z" strokeWidth="0.8" fill="none" />
    <path d="M 68 14 L 86 14 L 86 32 L 68 32 Z" strokeWidth="0.8" fill="none" />
    <path d="M 14 68 L 32 68 L 32 86 L 14 86 Z" strokeWidth="0.8" fill="none" />
    <path d="M 68 68 L 86 68 L 86 86 L 68 86 Z" strokeWidth="0.8" fill="none" />

    {/* Decorative inner frames */}
    <path d="M 18 18 L 28 18 L 28 28 L 18 28 Z" strokeWidth="0.5" fill="none" opacity="0.6" />
    <path d="M 72 18 L 82 18 L 82 28 L 72 28 Z" strokeWidth="0.5" fill="none" opacity="0.6" />
    <path d="M 18 72 L 28 72 L 28 82 L 18 82 Z" strokeWidth="0.5" fill="none" opacity="0.6" />
    <path d="M 72 72 L 82 72 L 82 82 L 72 82 Z" strokeWidth="0.5" fill="none" opacity="0.6" />

    {/* Rosette details */}
    <path d="M 50 40 L 50 45" strokeWidth="0.5" fill="none" />
    <path d="M 50 55 L 50 60" strokeWidth="0.5" fill="none" />
    <path d="M 40 50 L 45 50" strokeWidth="0.5" fill="none" />
    <path d="M 55 50 L 60 50" strokeWidth="0.5" fill="none" />
  </svg>
)

// Wall SVG
const WallSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Wall surface */}
    <rect x="10" y="15" width="80" height="75" strokeWidth="2" fill="none" />

    {/* Wainscoting/dado */}
    <path d="M 10 60 L 90 60" strokeWidth="1.5" fill="none" />

    {/* Chair rail */}
    <path d="M 10 58 L 90 58" strokeWidth="1" fill="none" />
    <path d="M 10 62 L 90 62" strokeWidth="1" fill="none" />

    {/* Panel details below chair rail */}
    <rect x="15" y="67" width="20" height="18" strokeWidth="1" fill="none" rx="1" />
    <rect x="40" y="67" width="20" height="18" strokeWidth="1" fill="none" rx="1" />
    <rect x="65" y="67" width="20" height="18" strokeWidth="1" fill="none" rx="1" />

    {/* Crown molding */}
    <path d="M 8 15 L 92 15" strokeWidth="1.5" fill="none" />
    <path d="M 10 18 L 90 18" strokeWidth="0.8" fill="none" />

    {/* Baseboard */}
    <path d="M 10 88 L 90 88" strokeWidth="1" fill="none" />

    {/* Niche/alcove suggestion */}
    <path d="M 40 25 L 40 50 Q 50 53, 60 50 L 60 25" strokeWidth="1.5" fill="none" />
    <path d="M 40 25 Q 50 20, 60 25" strokeWidth="1.5" fill="none" />

    {/* Decorative element in niche */}
    <ellipse cx="50" cy="40" rx="6" ry="8" strokeWidth="1" fill="none" />
  </svg>
)

// Garden/Landscape SVG
const GardenSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Pergola structure */}
    <path d="M 15 85 L 15 40" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 85 85 L 85 40" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Cross beams */}
    <path d="M 10 40 L 90 40" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 10 35 L 90 35" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Lattice/rafters */}
    <path d="M 25 35 L 25 25" strokeWidth="1" fill="none" />
    <path d="M 40 35 L 40 25" strokeWidth="1" fill="none" />
    <path d="M 55 35 L 55 25" strokeWidth="1" fill="none" />
    <path d="M 70 35 L 70 25" strokeWidth="1" fill="none" />

    {/* Vines/plants */}
    <path d="M 20 35 Q 25 30, 30 35 Q 35 30, 40 35" strokeWidth="0.8" fill="none" opacity="0.6" />
    <path d="M 55 35 Q 60 28, 65 35 Q 70 28, 75 35" strokeWidth="0.8" fill="none" opacity="0.6" />

    {/* Ground/path */}
    <path d="M 5 85 L 95 85" strokeWidth="1.5" fill="none" />

    {/* Path stones */}
    <ellipse cx="35" cy="88" rx="8" ry="3" strokeWidth="0.8" fill="none" />
    <ellipse cx="55" cy="90" rx="7" ry="2.5" strokeWidth="0.8" fill="none" />
    <ellipse cx="72" cy="87" rx="6" ry="2" strokeWidth="0.8" fill="none" />

    {/* Fountain in center */}
    <ellipse cx="50" cy="70" rx="15" ry="5" strokeWidth="1.5" fill="none" />
    <path d="M 50 70 L 50 55" strokeWidth="1.5" fill="none" />
    <path d="M 45 55 Q 50 45, 55 55" strokeWidth="1" fill="none" />

    {/* Water spray */}
    <path d="M 50 50 Q 45 45, 42 50" strokeWidth="0.5" fill="none" opacity="0.6" />
    <path d="M 50 50 Q 55 45, 58 50" strokeWidth="0.5" fill="none" opacity="0.6" />
  </svg>
)

// Interior SVG
const InteriorSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Fireplace mantel */}
    <path d="M 20 90 L 20 45" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 80 90 L 80 45" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Mantel shelf */}
    <path d="M 15 45 L 85 45" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 18 42 L 82 42" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Firebox opening */}
    <path d="M 30 90 L 30 55 Q 50 50, 70 55 L 70 90" strokeWidth="1.5" fill="none" />

    {/* Fire/hearth suggestion */}
    <path d="M 40 85 Q 45 75, 50 80 Q 55 70, 60 85" strokeWidth="1" fill="none" opacity="0.6" />

    {/* Decorative corbels */}
    <path d="M 20 45 Q 15 50, 20 55" strokeWidth="1" fill="none" />
    <path d="M 80 45 Q 85 50, 80 55" strokeWidth="1" fill="none" />

    {/* Mirror/artwork above */}
    <rect x="30" y="15" width="40" height="22" strokeWidth="1.5" fill="none" rx="1" />
    <rect x="33" y="18" width="34" height="16" strokeWidth="0.8" fill="none" rx="1" />

    {/* Candlesticks on mantel */}
    <path d="M 25 42 L 25 35" strokeWidth="1" fill="none" />
    <ellipse cx="25" cy="34" rx="2" ry="1" strokeWidth="0.8" fill="none" />
    <path d="M 75 42 L 75 35" strokeWidth="1" fill="none" />
    <ellipse cx="75" cy="34" rx="2" ry="1" strokeWidth="0.8" fill="none" />

    {/* Floor */}
    <path d="M 10 90 L 90 90" strokeWidth="1.5" fill="none" />
  </svg>
)

// Urban SVG
const UrbanSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Arcade/colonnade */}
    <path d="M 5 90 L 5 35" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 35 90 L 35 35" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 65 90 L 65 35" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 95 90 L 95 35" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Arches */}
    <path d="M 5 35 Q 5 15, 20 15 Q 35 15, 35 35" strokeWidth="1.5" fill="none" />
    <path d="M 35 35 Q 35 15, 50 15 Q 65 15, 65 35" strokeWidth="1.5" fill="none" />
    <path d="M 65 35 Q 65 15, 80 15 Q 95 15, 95 35" strokeWidth="1.5" fill="none" />

    {/* Upper structure */}
    <path d="M 0 35 L 100 35" strokeWidth="1.5" fill="none" />
    <path d="M 0 32 L 100 32" strokeWidth="1" fill="none" />

    {/* Building above */}
    <rect x="10" y="5" width="25" height="25" strokeWidth="1" fill="none" />
    <rect x="65" y="5" width="25" height="25" strokeWidth="1" fill="none" />

    {/* Windows in buildings */}
    <rect x="15" y="10" width="6" height="8" strokeWidth="0.8" fill="none" />
    <rect x="24" y="10" width="6" height="8" strokeWidth="0.8" fill="none" />
    <rect x="70" y="10" width="6" height="8" strokeWidth="0.8" fill="none" />
    <rect x="79" y="10" width="6" height="8" strokeWidth="0.8" fill="none" />

    {/* Ground/plaza */}
    <path d="M 0 90 L 100 90" strokeWidth="1.5" fill="none" />

    {/* Paving pattern */}
    <path d="M 10 92 L 30 92" strokeWidth="0.5" fill="none" opacity="0.5" />
    <path d="M 40 94 L 60 94" strokeWidth="0.5" fill="none" opacity="0.5" />
    <path d="M 70 92 L 90 92" strokeWidth="0.5" fill="none" opacity="0.5" />
  </svg>
)

// Specialized/Modern SVG
const ModernSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Pilotis */}
    <path d="M 15 90 L 15 60" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 50 90 L 50 60" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 85 90 L 85 60" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Main floor plate */}
    <path d="M 5 60 L 95 60" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 5 57 L 95 57" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Upper structure - ribbon windows */}
    <rect x="5" y="25" width="90" height="32" strokeWidth="2" fill="none" />

    {/* Ribbon window band */}
    <path d="M 5 35 L 95 35" strokeWidth="1" fill="none" />
    <path d="M 5 48 L 95 48" strokeWidth="1" fill="none" />

    {/* Window divisions */}
    <path d="M 20 35 L 20 48" strokeWidth="0.8" fill="none" opacity="0.6" />
    <path d="M 40 35 L 40 48" strokeWidth="0.8" fill="none" opacity="0.6" />
    <path d="M 60 35 L 60 48" strokeWidth="0.8" fill="none" opacity="0.6" />
    <path d="M 80 35 L 80 48" strokeWidth="0.8" fill="none" opacity="0.6" />

    {/* Roof garden suggestion */}
    <path d="M 5 25 L 95 25" strokeWidth="1.5" fill="none" />
    <path d="M 15 22 Q 20 18, 25 22" strokeWidth="0.8" fill="none" opacity="0.6" />
    <path d="M 35 20 Q 40 15, 45 20" strokeWidth="0.8" fill="none" opacity="0.6" />
    <path d="M 55 22 Q 60 17, 65 22" strokeWidth="0.8" fill="none" opacity="0.6" />
    <path d="M 75 20 Q 80 16, 85 20" strokeWidth="0.8" fill="none" opacity="0.6" />

    {/* Free plan interior suggestion */}
    <path d="M 25 60 L 25 75" strokeWidth="0.5" fill="none" opacity="0.4" />
    <path d="M 70 60 L 70 80" strokeWidth="0.5" fill="none" opacity="0.4" />

    {/* Ground */}
    <path d="M 0 90 L 100 90" strokeWidth="1.5" fill="none" />
  </svg>
)

// Default/Generic Architecture SVG
const DefaultSVG = ({ size = 100 }: { size: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="stroke-current">
    {/* Simple building */}
    <path d="M 20 90 L 20 35" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 80 90 L 80 35" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 20 35 L 50 15 L 80 35" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

    {/* Door */}
    <path d="M 40 90 L 40 65 Q 50 60, 60 65 L 60 90" strokeWidth="1.5" fill="none" />

    {/* Windows */}
    <rect x="27" y="50" width="10" height="12" strokeWidth="1" fill="none" rx="1" />
    <rect x="63" y="50" width="10" height="12" strokeWidth="1" fill="none" rx="1" />

    {/* Ground */}
    <path d="M 10 90 L 90 90" strokeWidth="1.5" fill="none" />
  </svg>
)

// Main component that selects the appropriate SVG based on category
export function ArchitectureSVG({ category, elementId, className = '', size = 100 }: ArchitectureSVGProps) {
  const svgClass = `text-[var(--foreground)] opacity-70 ${className}`

  // Map categories to SVG components
  const getSVGComponent = () => {
    const cat = category?.toUpperCase() || ''

    switch (cat) {
      case 'COLUMN':
      case 'COLUMNS':
        return <ColumnSVG size={size} />
      case 'ARCH':
      case 'ARCHES':
        return <ArchSVG size={size} />
      case 'DOME':
      case 'DOMES':
        return <DomeSVG size={size} />
      case 'WINDOW':
      case 'WINDOWS':
        return <WindowSVG size={size} />
      case 'ROOF':
      case 'ROOFS':
        return <RoofSVG size={size} />
      case 'VAULT':
      case 'VAULTS':
        return <VaultSVG size={size} />
      case 'RELIGIOUS':
        return <ReligiousSVG size={size} />
      case 'FORTIFICATION':
      case 'FORTIFICATIONS':
        return <FortificationSVG size={size} />
      case 'DOOR':
      case 'DOORS':
        return <DoorSVG size={size} />
      case 'DECORATIVE':
        return <DecorativeSVG size={size} />
      case 'FACADE':
        return <FacadeSVG size={size} />
      case 'FLOOR':
        return <FloorSVG size={size} />
      case 'CEILING':
        return <CeilingSVG size={size} />
      case 'WALL':
        return <WallSVG size={size} />
      case 'GARDEN':
        return <GardenSVG size={size} />
      case 'INTERIOR':
        return <InteriorSVG size={size} />
      case 'URBAN':
        return <UrbanSVG size={size} />
      case 'SPECIALIZED':
      case 'MODERN':
      case 'MODERNIST':
      case 'CONTEMPORARY':
      case 'HIGH-TECH':
      case 'BRUTALIST':
        return <ModernSVG size={size} />
      case 'STRUCTURAL':
        return <ColumnSVG size={size} />
      default:
        return <DefaultSVG size={size} />
    }
  }

  return (
    <div className={svgClass}>
      {getSVGComponent()}
    </div>
  )
}

export default ArchitectureSVG
