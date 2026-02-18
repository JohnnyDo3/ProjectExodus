'use client'

import { useSkyTheme } from '@/components/theme/SkyThemeProvider'

/**
 * ProgressiveSkyline - An animated journey through civilization's evolution
 *
 * Visual narrative: Rural → Suburbs → Industrial City (with pollution) → Sustainable Green City → Back to Rural
 * The cycle repeats infinitely, showing that sustainability means returning to harmony with nature
 *
 * Features:
 * - Hyper-detailed miniature houses with realistic architectural styles
 * - Proper streets and roads with moving vehicles
 * - Victorian, Colonial, Ranch, Cottage, and Modern house designs
 * - Smooth horizontal scrolling animation
 * - Pollution/smog effects in industrial phase
 * - Seamless looping
 * - Multiple layers for depth
 */

export function ProgressiveSkyline() {
  const { currentPhase } = useSkyTheme()
  const isNightTime = ['dusk', 'evening', 'night', 'midnight'].includes(currentPhase)

  // Helper function to determine if a window should be lit (60-70% chance)
  const isWindowLit = (seed: number) => {
    // Use a deterministic random based on seed for consistent pattern
    const random = Math.abs(Math.sin(seed * 12.9898) * 43758.5453) % 1
    return random > 0.35 // ~65% of windows lit
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10 overflow-hidden">
      <style jsx>{`
        @keyframes skylineScroll {
          0% {
            transform: translateX(-2400px);
          }
          100% {
            transform: translateX(-7400px);
          }
        }

        .skyline-container {
          animation: skylineScroll 420s linear infinite;
          will-change: transform;
        }

        @keyframes smogDrift {
          0%, 100% {
            opacity: 1;
            transform: translateX(0);
          }
          50% {
            opacity: 1;
            transform: translateX(20px);
          }
        }

        .smog-layer {
          animation: smogDrift 8s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .window-light {
          animation: twinkle 3s ease-in-out infinite;
          filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.6));
          transition: opacity 2s ease-in-out;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .turbine-blade {
          animation: rotate 4s linear infinite;
          transform-origin: center;
        }

        @keyframes carDrive {
          0% { transform: translateX(0); }
          100% { transform: translateX(5000px); }
        }

        .moving-car {
          animation: carDrive 100s linear infinite;
        }

        @keyframes carDriveReverse {
          0% { transform: translateX(0) scaleX(-1); }
          100% { transform: translateX(-5000px) scaleX(-1); }
        }

        .moving-car-reverse {
          animation: carDriveReverse 100s linear infinite;
        }

        @keyframes chimneySmokeRise {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 1; transform: translateY(-20px); }
        }

        .chimney-smoke {
          animation: chimneySmokeRise 3s ease-out infinite;
        }

        @keyframes animalWalk {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        .animal-horse {
          animation: animalWalk 3s ease-in-out infinite;
        }

        .animal-cow {
          animation: animalWalk 4s ease-in-out infinite;
        }

        .animal-sheep {
          animation: animalWalk 3.5s ease-in-out infinite;
        }

        @keyframes animalPeck {
          0%, 80%, 100% { transform: translateY(0); }
          10%, 30%, 50%, 70% { transform: translateY(-1px); }
          20%, 40%, 60% { transform: translateY(0); }
        }

        .animal-chicken {
          animation: animalPeck 4s ease-in-out infinite;
        }

      `}</style>

      {/* Background atmosphere layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-100" />

      <div className="skyline-container flex">
        {/* Main skyline (duplicated for seamless loop) */}
        {[0, 1].map((iteration) => (
          <svg
            key={iteration}
            className="flex-shrink-0 opacity-100"
            width="5000"
            height="250"
            viewBox="0 0 5000 250"
            preserveAspectRatio="xMidYMax meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradients for depth and atmosphere */}
              <linearGradient id={`skylineGradient-${iteration}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id={`smogGradient-${iteration}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#666666" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#888888" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#999999" stopOpacity="0.1" />
              </linearGradient>

              <linearGradient id={`buildingGradient-${iteration}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.7" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id={`roadGradient-${iteration}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
              </linearGradient>

              {/* House Color Gradients - Victorian (Warm Beige/Cream) */}
              <linearGradient id={`victorianHouse-${iteration}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f5e6d3" stopOpacity="1" />
                <stop offset="100%" stopColor="#d4c4a8" stopOpacity="1" />
              </linearGradient>
              <linearGradient id={`victorianRoof-${iteration}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5a3c" stopOpacity="1" />
                <stop offset="100%" stopColor="#6d4428" stopOpacity="1" />
              </linearGradient>

              {/* Colonial (White/Light Gray) */}
              <linearGradient id={`colonialHouse-${iteration}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f0f0f0" stopOpacity="1" />
                <stop offset="100%" stopColor="#d8d8d8" stopOpacity="1" />
              </linearGradient>
              <linearGradient id={`colonialRoof-${iteration}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4a4a4a" stopOpacity="1" />
                <stop offset="100%" stopColor="#2f2f2f" stopOpacity="1" />
              </linearGradient>

              {/* Ranch (Tan/Brown Earth Tones) */}
              <linearGradient id={`ranchHouse-${iteration}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e8d4b8" stopOpacity="1" />
                <stop offset="100%" stopColor="#c9b18f" stopOpacity="1" />
              </linearGradient>
              <linearGradient id={`ranchRoof-${iteration}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b7355" stopOpacity="1" />
                <stop offset="100%" stopColor="#6b5a45" stopOpacity="1" />
              </linearGradient>

              {/* Cottage (Pastel Blue) */}
              <linearGradient id={`cottageHouse-${iteration}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d4e7f5" stopOpacity="1" />
                <stop offset="100%" stopColor="#b8d4e8" stopOpacity="1" />
              </linearGradient>
              <linearGradient id={`cottageRoof-${iteration}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a85757" stopOpacity="1" />
                <stop offset="100%" stopColor="#8b4545" stopOpacity="1" />
              </linearGradient>

              {/* Modern (Gray/White with Blue Accent) */}
              <linearGradient id={`modernHouse-${iteration}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e8e8e8" stopOpacity="1" />
                <stop offset="100%" stopColor="#c4c4c4" stopOpacity="1" />
              </linearGradient>
              <linearGradient id={`modernRoof-${iteration}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5a7a8a" stopOpacity="1" />
                <stop offset="100%" stopColor="#3d5866" stopOpacity="1" />
              </linearGradient>
            </defs>

            <g fill={`url(#skylineGradient-${iteration})`} className="text-[var(--foreground)]">
              {/* ========== PHASE 1: RURAL COUNTRYSIDE (0-800) ========== */}

              {/* Beautiful rolling hills - gradually calming toward suburbs (WIDE BUFFER: 600-900) */}
              <path d="M 0,210 Q 100,195 200,205 Q 300,215 400,200 Q 500,190 600,200 Q 650,205 700,208 Q 750,210 800,210 Q 850,210 900,210 L 900,250 L 0,250 Z"
                    fill="#7aa87a" opacity="1" />
              <path d="M 0,205 Q 80,192 160,200 Q 240,208 320,195 Q 400,185 480,195 Q 560,203 600,198 Q 650,203 700,206 Q 750,208 800,208 Q 850,208 900,208 L 900,250 L 0,250 Z"
                    fill="#8ab88a" opacity="1" />

              {/* White picket fences along road - protecting animals - CONTINUOUS */}
              <g>
                {/* Continuous fence from 0 to 800 */}
                {Array.from({length: 100}).map((_, i) => (
                  <g key={`picket-${i}`}>
                    <rect x={i * 8} y="225" width="2" height="10" fill="#f5f5f5" opacity="1" />
                    <path d={`M ${i * 8},225 L ${i * 8 + 1},223 L ${i * 8 + 2},225 Z`} fill="#f5f5f5" opacity="1" />
                  </g>
                ))}
                {/* Horizontal rails spanning entire length */}
                <rect x="0" y="228" width="800" height="1.5" fill="#f5f5f5" opacity="1" />
                <rect x="0" y="232" width="800" height="1.5" fill="#f5f5f5" opacity="1" />
              </g>

              {/* Red Barn #1 - Large Classic Barn with Details (1/3 LARGER) */}
              <g>
                <rect x="170" y="178" width="43" height="27" fill="#c73e3e" opacity="1" />
                <path d="M 165,178 L 191.5,158 L 218,178 Z" fill="#a83232" opacity="1" />
                {/* Wood plank texture lines */}
                <path d="M 172,185 L 212,185 M 172,192 L 212,192 M 172,199 L 212,199" stroke="#a83232" strokeWidth="0.7" opacity="1" />
                {/* Barn doors */}
                <rect x="185" y="188" width="11" height="17" fill="#6d4428" opacity="1" />
                {/* Barn door cross pattern */}
                <path d="M 190.5,193 L 190.5,205 M 185,198 L 196,198" stroke="#5a3a2a" strokeWidth="1.3" opacity="1" />
                {/* Hayloft windows */}
                <rect x="175" y="183" width="6" height="7" fill="#4a4a4a" opacity="1" />
                <rect x="200" y="183" width="6" height="7" fill="#4a4a4a" opacity="1" />
                {/* Additional barn detail - cross beams */}
                <path d="M 170,178 L 170,205 M 213,178 L 213,205" stroke="#a83232" strokeWidth="1" opacity="1" />
                {/* Weather vane on top */}
                <rect x="190.5" y="155" width="1.5" height="7" fill="#4a4a4a" opacity="1" />
                <path d="M 185,158 L 191.5,155 L 191.5,161 Z" fill="#d4af37" opacity="1" />
                <path d="M 198,158 L 191.5,155 L 191.5,161 Z" fill="#d4af37" opacity="1" />
                {/* Silo next to barn - larger */}
                <rect x="220" y="172" width="11" height="33" fill="#d4d4d4" opacity="1" />
                <ellipse cx="225.5" cy="172" rx="5.5" ry="2.5" fill="#b8b8b8" opacity="1" />
                {/* Silo roof */}
                <path d="M 222,170 L 225.5,163 L 229,170" fill="#a83232" opacity="1" />
                {/* Silo bands */}
                <rect x="220" y="183" width="11" height="1.5" fill="#a8a8a8" opacity="1" />
                <rect x="220" y="194" width="11" height="1.5" fill="#a8a8a8" opacity="1" />
                {/* Silo ladder */}
                <rect x="225" y="175" width="1" height="25" fill="#8a8a8a" opacity="1" />
                {Array.from({length: 8}).map((_, i) => (
                  <rect key={`ladder-${i}`} x="223" y={178 + i * 3} width="5" height="0.5" fill="#8a8a8a" opacity="1" />
                ))}
              </g>

              {/* Red Barn #2 - Medium Barn (1/3 LARGER) */}
              <g>
                <rect x="442" y="182" width="32" height="20" fill="#c73e3e" opacity="1" />
                <path d="M 438,182 L 458,166 L 478,182 Z" fill="#a83232" opacity="1" />
                <rect x="452" y="188" width="8" height="14" fill="#6d4428" opacity="1" />
                <rect x="444" y="185" width="5" height="6" fill="#4a4a4a" opacity="1" />
                <rect x="465" y="185" width="5" height="6" fill="#4a4a4a" opacity="1" />
                {/* Barn door X pattern */}
                <path d="M 452,188 L 460,202 M 460,188 L 452,202" stroke="#5a3a2a" strokeWidth="0.8" opacity="1" />
                {/* Larger silo */}
                <rect x="478" y="178" width="9" height="24" fill="#d4d4d4" opacity="1" />
                <ellipse cx="482.5" cy="178" rx="4.5" ry="2" fill="#b8b8b8" opacity="1" />
                {/* Silo cap */}
                <path d="M 479,176 L 482.5,170 L 486,176" fill="#a83232" opacity="1" />
              </g>

              {/* Red Barn #3 - Rustic Barn (1/3 LARGER) */}
              <g>
                <rect x="642" y="185" width="27" height="18" fill="#c73e3e" opacity="1" />
                <path d="M 639,185 L 655.5,172 L 672,185 Z" fill="#a83232" opacity="1" />
                <rect x="651" y="190" width="7" height="13" fill="#6d4428" opacity="1" />
                <rect x="644" y="187" width="4" height="5" fill="#4a4a4a" opacity="1" />
                <rect x="663" y="187" width="4" height="5" fill="#4a4a4a" opacity="1" />
                {/* Weathered wood detail */}
                <path d="M 643,190 L 668,190 M 643,195 L 668,195" stroke="#a83232" strokeWidth="0.5" opacity="1" />
              </g>

              {/* Farmland/crop rows near barns (grass areas for animals, crop rows without) */}
              <g opacity="0.9">
                {/* Light farmland patches - tilled soil appearance */}
                <rect x="235" y="200" width="35" height="8" fill="#c9b18f" opacity="0.4" />
                <rect x="490" y="198" width="30" height="7" fill="#c9b18f" opacity="0.4" />
                {/* Crop rows - simple lines */}
                {Array.from({length: 8}).map((_, i) => (
                  <rect key={`crop-1-${i}`} x={237 + i * 4} y="201" width="2" height="6" fill="#6a9a6a" opacity="0.7" />
                ))}
                {Array.from({length: 7}).map((_, i) => (
                  <rect key={`crop-2-${i}`} x={492 + i * 4} y="199" width="2" height="5" fill="#6a9a6a" opacity="0.7" />
                ))}
              </g>

              {/* Miniature Farmhouses */}
              <g>
                {/* Farmhouse #1 */}
                <rect x="280" y="195" width="18" height="10" fill="#f0e6d3" opacity="1" />
                <path d="M 278,195 L 289,188 L 300,195 Z" fill="#8b5a3c" opacity="1" />
                <rect x="285" y="198" width="3" height="7" fill="#6d4428" opacity="1" />
                <rect x={283} y="197" width="2" height="2.5" fill="#6b8ea8" opacity="1" />
                <rect x={291} y="197" width="2" height="2.5" fill="#6b8ea8" opacity="1" />
                <rect x="295" y="191" width="2" height="4" fill="#a85757" opacity="1" />

                {/* Farmhouse #2 */}
                <rect x="560" y="197" width="16" height="8" fill="#e8d4b8" opacity="1" />
                <path d="M 558,197 L 568,191 L 578,197 Z" fill="#6b5a45" opacity="1" />
                <rect x="565" y="199" width="3" height="6" fill="#6d4428" opacity="1" />
                <rect x={562} y="198" width="2" height="2" fill="#6b8ea8" opacity="1" />
                <rect x={570} y="198" width="2" height="2" fill="#6b8ea8" opacity="1" />
              </g>

              {/* Natural scattered trees */}
              <g>
                {[60, 110, 165, 320, 410, 490, 610, 690, 750].map((x, i) => (
                  <g key={`tree-${i}`} opacity="1">
                    {/* Tree trunk */}
                    <rect x={x} y="195" width="3" height="10" fill="#6b5a45" />
                    {/* Tree foliage - fuller, rounder */}
                    <circle cx={x+1.5} cy="192" r="7" fill="#5a8a5a" opacity="1" />
                    <circle cx={x-2} cy="194" r="5" fill="#6a9a6a" opacity="1" />
                    <circle cx={x+5} cy="194" r="5" fill="#6a9a6a" opacity="1" />
                  </g>
                ))}
              </g>

              {/* Hay bales scattered in fields */}
              <g>
                {[350, 420, 620, 680].map((x, i) => (
                  <g key={`hay-${i}`} opacity="1">
                    <ellipse cx={x} cy="205" rx="5" ry="3" fill="#d4a574" />
                    <ellipse cx={x} cy="203" rx="4" ry="2" fill="#c9995f" />
                    {/* Hay texture lines */}
                    <path d={`M ${x-3},204 L ${x+3},204 M ${x-2},205 L ${x+2},205`} stroke="#b88a50" strokeWidth="0.5" opacity="1" />
                  </g>
                ))}
              </g>

              {/* Parked Tractors - GREEN JOHN DEERE STYLE! */}
              <g>
                {[250, 550].map((x, i) => (
                  <g key={`tractor-${i}`} opacity="1">
                    {/* Tractor body - green */}
                    <rect x={x} y="198" width="18" height="8" rx="1" fill="#4a7c2f" />
                    {/* Engine hood */}
                    <rect x={x+12} y="196" width="6" height="4" rx="0.5" fill="#3d6928" />
                    {/* Cab */}
                    <rect x={x+4} y="194" width="6" height="5" rx="0.5" fill="#5a8a3f" />
                    {/* Cab window */}
                    <rect x={x+5} y="195" width="4" height="3" fill="#6b8ea8" opacity="1" />
                    {/* Big rear wheel */}
                    <circle cx={x+4} cy="206" r="4" fill="#2f2f2f" />
                    <circle cx={x+4} cy="206" r="2" fill="#4a4a4a" />
                    {/* Small front wheel */}
                    <circle cx={x+15} cy="204" r="2.5" fill="#2f2f2f" />
                    <circle cx={x+15} cy="204" r="1" fill="#4a4a4a" />
                    {/* Exhaust pipe */}
                    <rect x={x+10} y="192" width="1" height="4" fill="#4a4a4a" />
                    <ellipse cx={x+10.5} cy="192" rx="1.5" ry="0.8" fill="#6a6a6a" />
                    {/* Yellow details */}
                    <rect x={x+13} y="199" width="4" height="1" fill="#ffd700" opacity="1" />
                  </g>
                ))}
              </g>

              {/* FARM ANIMALS - Rendered on top of trees and hay */}

              {/* Horses in the fields - DETAILED AND RECOGNIZABLE! */}
              <g>
                {[120, 320, 420, 580, 680, 760].map((x, i) => {
                  const yOffsets = [-5, 2, -2, 4, 0, 3]; // Varied depths for visual interest
                  return (
                  <g key={`horse-${i}`} transform={`translate(0, ${yOffsets[i]})`} className="animal-horse" opacity="1" style={{animationDelay: `${i * 0.3}s`}}>
                    {/* Main body - larger and more defined */}
                    <ellipse cx={x} cy="200" rx="10" ry="6" fill="#654321" />

                    {/* Chest/shoulder area */}
                    <ellipse cx={x+6} cy="200" rx="5" ry="6" fill="#7a5230" />

                    {/* Neck - connecting body to head */}
                    <path d={`M ${x+8},198 L ${x+11},195 L ${x+10},200 Z`} fill="#654321" />

                    {/* Horse head - defined and forward-facing */}
                    <ellipse cx={x+13} cy="195" rx="3.5" ry="4.5" fill="#654321" />

                    {/* Snout/muzzle - lighter color */}
                    <ellipse cx={x+15} cy="196" rx="2" ry="2.5" fill="#8b6f47" />

                    {/* Ears - two visible ears */}
                    <path d={`M ${x+12},191 L ${x+11},188 L ${x+13},190 Z`} fill="#654321" />
                    <path d={`M ${x+14},191 L ${x+15},188 L ${x+13.5},190 Z`} fill="#654321" />

                    {/* Eye - large and visible */}
                    <circle cx={x+13} cy="194" r="1" fill="#2f2f2f" />
                    <circle cx={x+13.3} cy="193.7" r="0.4" fill="#ffffff" opacity="1" />

                    {/* Nostril */}
                    <circle cx={x+15.5} cy="197" r="0.5" fill="#4a3520" />

                    {/* Front legs - clearly separated */}
                    <rect x={x+3} y="206" width="2" height="6" fill="#654321" />
                    <rect x={x+7} y="206" width="2" height="6" fill="#7a5230" />
                    {/* Hooves on front legs */}
                    <rect x={x+3} y="211" width="2" height="1" fill="#2f2f2f" />
                    <rect x={x+7} y="211" width="2" height="1" fill="#2f2f2f" />

                    {/* Back legs - clearly separated */}
                    <rect x={x-5} y="206" width="2" height="6" fill="#654321" />
                    <rect x={x-1} y="206" width="2" height="6" fill="#7a5230" />
                    {/* Hooves on back legs */}
                    <rect x={x-5} y="211" width="2" height="1" fill="#2f2f2f" />
                    <rect x={x-1} y="211" width="2" height="1" fill="#2f2f2f" />

                    {/* Tail - flowing and detailed */}
                    <path d={`M ${x-10},199 Q ${x-13},201 ${x-14},205 Q ${x-13},208 ${x-11},207`}
                          stroke="#4a3520" strokeWidth="2" fill="none" />

                    {/* Mane - flowing down neck */}
                    <path d={`M ${x+11},192 Q ${x+9},193 ${x+7},195 Q ${x+5},196 ${x+3},197`}
                          stroke="#4a3520" strokeWidth="1.5" fill="none" />
                    <path d={`M ${x+10},193 Q ${x+8},194 ${x+6},196`}
                          stroke="#4a3520" strokeWidth="1.2" fill="none" />
                  </g>
                  );
                })}
              </g>

              {/* Cows grazing - DETAILED AND RECOGNIZABLE! */}
              <g>
                {[230, 390, 510, 640].map((x, i) => {
                  const yOffsets = [3, -4, 1, -2]; // Varied depths
                  return (
                  <g key={`cow-${i}`} transform={`translate(0, ${yOffsets[i]})`} className="animal-cow" opacity="1" style={{animationDelay: `${i * 0.5}s`}}>
                    {/* Main cow body - large and boxy */}
                    <rect x={x-8} y="197" width="16" height="8" rx="2" fill="#f5f5f5" />

                    {/* Udder underneath */}
                    <ellipse cx={x} cy="205" rx="3" ry="2" fill="#ffb6c1" />

                    {/* Black spots - multiple and prominent */}
                    <ellipse cx={x-5} cy="199" rx="2.5" ry="2" fill="#2f2f2f" />
                    <ellipse cx={x+2} cy="198" rx="3" ry="2.5" fill="#2f2f2f" />
                    <ellipse cx={x-2} cy="202" rx="2" ry="1.5" fill="#2f2f2f" />
                    <ellipse cx={x+5} cy="201" rx="2.5" ry="2" fill="#2f2f2f" />

                    {/* Neck */}
                    <rect x={x-9} y="194" width="3" height="5" rx="1" fill="#f5f5f5" />

                    {/* Cow head - defined and forward-facing */}
                    <ellipse cx={x-10} cy="195" rx="3.5" ry="4" fill="#f5f5f5" />

                    {/* Spot on head */}
                    <ellipse cx={x-11} cy="194" rx="1.5" ry="1.5" fill="#2f2f2f" />

                    {/* Snout/muzzle - pink */}
                    <ellipse cx={x-12} cy="197" rx="2" ry="2.5" fill="#ffb6c1" />

                    {/* Nostrils */}
                    <circle cx={x-12.5} cy="196.5" r="0.4" fill="#2f2f2f" />
                    <circle cx={x-11.5} cy="196.5" r="0.4" fill="#2f2f2f" />

                    {/* Horns - curved upward */}
                    <path d={`M ${x-11},191 Q ${x-12},189 ${x-13},188`} stroke="#8a7a6a" strokeWidth="1.2" fill="none" />
                    <path d={`M ${x-9},191 Q ${x-8},189 ${x-7},188`} stroke="#8a7a6a" strokeWidth="1.2" fill="none" />

                    {/* Ears - floppy */}
                    <ellipse cx={x-12} cy="192" rx="1.5" ry="1" fill="#e8e8e8" transform={`rotate(-30 ${x-12} 192)`} />
                    <ellipse cx={x-8} cy="192" rx="1.5" ry="1" fill="#e8e8e8" transform={`rotate(30 ${x-8} 192)`} />

                    {/* Eye - large and visible */}
                    <circle cx={x-10} cy="194" r="1" fill="#2f2f2f" />
                    <circle cx={x-9.7} cy="193.7" r="0.4" fill="#ffffff" opacity="1" />

                    {/* Front legs - clearly separated */}
                    <rect x={x-5} y="205" width="2" height="7" rx="1" fill="#e8e8e8" />
                    <rect x={x-1} y="205" width="2" height="7" rx="1" fill="#e8e8e8" />
                    {/* Hooves on front legs */}
                    <rect x={x-5} y="211" width="2" height="1" fill="#2f2f2f" />
                    <rect x={x-1} y="211" width="2" height="1" fill="#2f2f2f" />

                    {/* Back legs - clearly separated */}
                    <rect x={x+2} y="205" width="2" height="7" rx="1" fill="#e8e8e8" />
                    <rect x={x+6} y="205" width="2" height="7" rx="1" fill="#e8e8e8" />
                    {/* Hooves on back legs */}
                    <rect x={x+2} y="211" width="2" height="1" fill="#2f2f2f" />
                    <rect x={x+6} y="211" width="2" height="1" fill="#2f2f2f" />

                    {/* Tail - hanging down with tuft */}
                    <path d={`M ${x+8},199 L ${x+10},205`} stroke="#f5f5f5" strokeWidth="1.5" />
                    <ellipse cx={x+10} cy="206" rx="1.5" ry="2" fill="#2f2f2f" />
                  </g>
                  );
                })}
              </g>

              {/* Sheep grazing - FLUFFY AND RECOGNIZABLE! */}
              <g>
                {[160, 290, 470, 590, 700].map((x, i) => {
                  const yOffsets = [-3, 4, -1, 2, 0]; // Varied depths
                  return (
                  <g key={`sheep-${i}`} transform={`translate(0, ${yOffsets[i]})`} className="animal-sheep" opacity="1" style={{animationDelay: `${i * 0.4}s`}}>
                    {/* Fluffy wool body - multiple overlapping circles for texture */}
                    <circle cx={x} cy="203" r="4.5" fill="#f5f5f5" />
                    <circle cx={x-3} cy="202" r="3.5" fill="#f5f5f5" />
                    <circle cx={x+3} cy="202" r="3.5" fill="#f5f5f5" />
                    <circle cx={x-1} cy="205" r="3" fill="#f5f5f5" />
                    <circle cx={x+2} cy="205" r="3" fill="#f5f5f5" />
                    <circle cx={x} cy="200" r="3" fill="#f5f5f5" />

                    {/* Wool texture - smaller accent circles */}
                    <circle cx={x-2} cy="201" r="1.5" fill="#e8e8e8" />
                    <circle cx={x+1} cy="203" r="1.5" fill="#e8e8e8" />
                    <circle cx={x+3} cy="200" r="1.2" fill="#e8e8e8" />

                    {/* Black sheep face and head - clearly defined */}
                    <ellipse cx={x-6} cy="201" rx="2.5" ry="3" fill="#2f2f2f" />

                    {/* Ears - sticking up */}
                    <ellipse cx={x-7} cy="199" rx="1" ry="1.5" fill="#2f2f2f" />
                    <ellipse cx={x-5} cy="199" rx="1" ry="1.5" fill="#2f2f2f" />

                    {/* Eyes - visible white with black pupils */}
                    <circle cx={x-6.5} cy="201" r="0.6" fill="#ffffff" />
                    <circle cx={x-6.5} cy="201" r="0.3" fill="#2f2f2f" />

                    {/* Nose/snout */}
                    <ellipse cx={x-7.5} cy="202" rx="0.8" ry="0.6" fill="#1a1a1a" />

                    {/* Four black legs - clearly visible */}
                    <rect x={x-4} y="207" width="1.5" height="4" rx="0.5" fill="#2f2f2f" />
                    <rect x={x-1} y="207" width="1.5" height="4" rx="0.5" fill="#2f2f2f" />
                    <rect x={x+1} y="207" width="1.5" height="4" rx="0.5" fill="#2f2f2f" />
                    <rect x={x+4} y="207" width="1.5" height="4" rx="0.5" fill="#2f2f2f" />

                    {/* Small fluffy tail */}
                    <circle cx={x+5} cy="204" r="1.5" fill="#f5f5f5" />
                  </g>
                  );
                })}
              </g>

              {/* Chickens pecking - DETAILED AND RECOGNIZABLE! */}
              <g>
                {[200, 260, 340, 480, 540, 620, 730].map((x, i) => {
                  const yOffsets = [2, -2, 3, -1, 1, 4, 0]; // Varied depths
                  return (
                  <g key={`chicken-${i}`} transform={`translate(0, ${yOffsets[i]})`} className="animal-chicken" opacity="1" style={{animationDelay: `${i * 0.2}s`}}>
                    {/* Chicken body - plump and defined */}
                    <ellipse cx={x} cy="207" rx="3.5" ry="3" fill="#d4a574" />

                    {/* Wing detail - darker feather area */}
                    <ellipse cx={x+0.5} cy="207" rx="2" ry="2" fill="#b8946a" />

                    {/* Tail feathers - pointing upward */}
                    <path d={`M ${x+3},206 Q ${x+4.5},204 ${x+5},202 Q ${x+4},203 ${x+3.5},205 Z`}
                          fill="#8b6f47" />
                    <path d={`M ${x+3.5},205 Q ${x+5},203 ${x+5.5},201 Q ${x+4.5},202 ${x+4},204 Z`}
                          fill="#9a7a55" />

                    {/* Neck connecting body to head */}
                    <rect x={x-2.5} y="204" width="1.5" height="2" rx="0.5" fill="#d4a574" />

                    {/* Chicken head - round and defined */}
                    <circle cx={x-2.5} cy="204" r="2" fill="#d4a574" />

                    {/* Red comb - prominent and wavy */}
                    <path d={`M ${x-3},202 L ${x-2.8},200.5 L ${x-2.3},201 L ${x-2},200 L ${x-1.8},201 L ${x-1.5},202 Z`}
                          fill="#cc3333" />

                    {/* Wattle under beak */}
                    <ellipse cx={x-3} cy="205" rx="0.6" ry="0.8" fill="#cc3333" />

                    {/* Beak - prominent yellow */}
                    <path d={`M ${x-4},204 L ${x-5},204 L ${x-4.5},204.5 Z`}
                          fill="#ffd700" />

                    {/* Eye - small but visible */}
                    <circle cx={x-2.5} cy="203.5" r="0.4" fill="#2f2f2f" />
                    <circle cx={x-2.3} cy="203.3" r="0.15" fill="#ffffff" />

                    {/* Legs - thin chicken legs with visible joints */}
                    <path d={`M ${x-1},210 L ${x-1},211 L ${x-2},212`}
                          stroke="#ffd700" strokeWidth="1" fill="none" />
                    <path d={`M ${x+1},210 L ${x+1},211 L ${x+2},212`}
                          stroke="#ffd700" strokeWidth="1" fill="none" />

                    {/* Feet - three toes visible */}
                    <path d={`M ${x-2},212 L ${x-2.5},212 M ${x-2},212 L ${x-2},212.5 M ${x-2},212 L ${x-1.5},212`}
                          stroke="#ffd700" strokeWidth="0.5" />
                    <path d={`M ${x+2},212 L ${x+2.5},212 M ${x+2},212 L ${x+2},212.5 M ${x+2},212 L ${x+1.5},212`}
                          stroke="#ffd700" strokeWidth="0.5" />
                  </g>
                  );
                })}
              </g>

              {/* ========== VERTICAL BOUNDARY: Rural → Suburbs (x=800) ========== */}
              <g opacity="1">
                {/* White picket fence border */}
                {Array.from({length: 20}).map((_, i) => (
                  <g key={`boundary-fence-1-${i}`}>
                    {/* Picket */}
                    <rect x="798" y={195 + i * 3} width="4" height="10" fill="#f5f5f5" />
                    {/* Pointed top */}
                    <path d={`M 798,${195 + i * 3} L 800,${192 + i * 3} L 802,${195 + i * 3} Z`} fill="#f5f5f5" />
                  </g>
                ))}
                {/* Horizontal rails */}
                <rect x="798" y="200" width="4" height="2" fill="#f5f5f5" />
                <rect x="798" y="210" width="4" height="2" fill="#f5f5f5" />
                <rect x="798" y="220" width="4" height="2" fill="#f5f5f5" />
              </g>

              {/* ========== PHASE 2: DEVELOPING SUBURBS (800-2000) ========== */}

              {/* Grassy ground layer - smooth from rural buffer, flattening toward city (WIDE BUFFERS: 800-900, 1800-2100) */}
              <path d="M 800,210 Q 900,210 1000,208 Q 1100,212 1200,207 Q 1300,203 1400,209 Q 1500,211 1600,206 Q 1700,206 1800,208 Q 1900,209 1950,210 Q 2000,210 2050,210 Q 2100,210 2100,210 L 2100,250 L 800,250 Z"
                    fill="#7aa87a" opacity="1" />
              <path d="M 800,208 Q 900,208 1000,206 Q 1100,209 1200,205 Q 1300,202 1400,207 Q 1500,210 1600,205 Q 1700,205 1800,206 Q 1900,207 1950,208 Q 2000,208 2050,208 Q 2100,208 2100,208 L 2100,250 L 800,250 Z"
                    fill="#8ab88a" opacity="1" />

              {/* Main road infrastructure */}
              <g opacity="1">
                {/* Asphalt road */}
                <rect x="800" y="218" width="1200" height="32" fill={`url(#roadGradient-${iteration})`} />

                {/* Road center line (dashed) */}
                {Array.from({length: 30}).map((_, i) => (
                  <rect key={`dash-${i}`} x={800 + i * 40} y="232" width="20" height="2" opacity="1" />
                ))}

                {/* Sidewalks */}
                <rect x="800" y="210" width="1200" height="4" fill="#d8d8d8" opacity="1" />
                <rect x="800" y="250" width="1200" height="2" fill="#d8d8d8" opacity="1" />
              </g>


              {/* Ultra-detailed miniature houses - Victorian style (1/4 LARGER) */}
              {[820, 1120, 1420, 1720].map((x, i) => (
                <g key={`victorian-${i}`}>
                  {/* Main house body - 25% larger */}
                  <rect x={x} y="180" width="35" height="28" fill={`url(#victorianHouse-${iteration})`} />

                  {/* Steep Victorian roof with decorative peak */}
                  <path d={`M ${x-4},180 L ${x+17.5},162 L ${x+39},180 Z`} fill={`url(#victorianRoof-${iteration})`} />
                  <rect x={x+15} y="162" width="5" height="18" fill={`url(#victorianHouse-${iteration})`} /> {/* Tower */}
                  <path d={`M ${x+12.5},162 L ${x+17.5},153 L ${x+22.5},162 Z`} fill={`url(#victorianRoof-${iteration})`} /> {/* Tower roof */}

                  {/* Detailed multi-pane windows - Victorian style with 2x3 panes */}
                  {/* Left window - 6-pane (2x3 grid) */}
                  <g>
                    <rect x={x+5} y="186" width="6" height="9" fill="#4a4a4a" opacity="1" />
                    {[0, 1].map(col => [0, 1, 2].map(row => (
                      <rect
                        key={`vic-left-${i}-${col}-${row}`}
                        x={x + 5.4 + col * 2.8}
                        y={186.4 + row * 2.8}
                        width="2.4"
                        height="2.4"
                        fill={isNightTime && isWindowLit(x + i * 100) ? "#FFD700" : "#6b8ea8"}
                        opacity="1"
                      />
                    )))}
                    {/* Window sill */}
                    <rect x={x+4.5} y="194.5" width="7" height="1" fill="#d4c4a8" opacity="1" />
                  </g>
                  {/* Right window - 6-pane (2x3 grid) */}
                  <g>
                    <rect x={x+24} y="186" width="6" height="9" fill="#4a4a4a" opacity="1" />
                    {[0, 1].map(col => [0, 1, 2].map(row => (
                      <rect
                        key={`vic-right-${i}-${col}-${row}`}
                        x={x + 24.4 + col * 2.8}
                        y={186.4 + row * 2.8}
                        width="2.4"
                        height="2.4"
                        fill={isNightTime && isWindowLit(x + i * 100 + 1) ? "#FFD700" : "#6b8ea8"}
                        opacity="1"
                      />
                    )))}
                    {/* Window sill */}
                    <rect x={x+23.5} y="194.5" width="7" height="1" fill="#d4c4a8" opacity="1" />
                  </g>
                  {/* Tower window - 4-pane (2x2 grid) */}
                  <g>
                    <rect x={x+14} y="170" width="5" height="6" fill="#4a4a4a" opacity="1" />
                    {[0, 1].map(col => [0, 1].map(row => (
                      <rect
                        key={`vic-tower-${i}-${col}-${row}`}
                        x={x + 14.4 + col * 2.2}
                        y={170.4 + row * 2.6}
                        width="1.9"
                        height="2.2"
                        fill={isNightTime && isWindowLit(x + i * 100 + 2) ? "#FFA500" : "#6b8ea8"}
                        opacity="1"
                      />
                    )))}
                  </g>

                  {/* Front door with porch */}
                  <rect x={x+14} y="194" width="7" height="14" fill="#8b5a3c" opacity="1" />
                  <path d={`M ${x+10},194 L ${x+25},194`} stroke="#6d4428" strokeWidth="2" opacity="1" />

                  {/* Chimney with smoke */}
                  <rect x={x+28} y="168" width="4" height="12" fill="#a85757" opacity="1" />
                  <ellipse className="chimney-smoke" cx={x+30} cy="164" rx="2.5" ry="4" fill="#c4c4c4" opacity="1" />

                  {/* Decorative trim */}
                  <rect x={x} y="207" width="35" height="2" fill="#d4c4a8" opacity="1" />
                </g>
              ))}

              {/* Colonial style houses - symmetrical design (1/4 LARGER) */}
              {[1000, 1300, 1600, 1900].map((x, i) => (
                <g key={`colonial-${i}`}>
                  {/* Main colonial structure - 25% larger */}
                  <rect x={x} y="178" width="40" height="30" fill={`url(#colonialHouse-${iteration})`} />

                  {/* Classic colonial roof */}
                  <path d={`M ${x-3},178 L ${x+20},164 L ${x+43},178 Z`} fill={`url(#colonialRoof-${iteration})`} />

                  {/* Symmetrical windows (4 windows, 2 stories) - Colonial 6-pane style (2x3 grid) */}
                  {/* Top left window */}
                  <g>
                    <rect x={x+5} y="184" width="6" height="8" fill="#4a4a4a" opacity="1" />
                    {[0, 1].map(col => [0, 1, 2].map(row => (
                      <rect
                        key={`col-tl-${i}-${col}-${row}`}
                        x={x + 5.3 + col * 2.8}
                        y={184.3 + row * 2.5}
                        width="2.4"
                        height="2.2"
                        fill={isNightTime && isWindowLit(x + i * 200) ? "#FFD700" : "#6b8ea8"}
                        opacity="1"
                      />
                    )))}
                  </g>
                  {/* Top right window */}
                  <g>
                    <rect x={x+29} y="184" width="6" height="8" fill="#4a4a4a" opacity="1" />
                    {[0, 1].map(col => [0, 1, 2].map(row => (
                      <rect
                        key={`col-tr-${i}-${col}-${row}`}
                        x={x + 29.3 + col * 2.8}
                        y={184.3 + row * 2.5}
                        width="2.4"
                        height="2.2"
                        fill={isNightTime && isWindowLit(x + i * 200 + 1) ? "#FFA500" : "#6b8ea8"}
                        opacity="1"
                      />
                    )))}
                  </g>
                  {/* Bottom left window */}
                  <g>
                    <rect x={x+5} y="196" width="6" height="8" fill="#4a4a4a" opacity="1" />
                    {[0, 1].map(col => [0, 1, 2].map(row => (
                      <rect
                        key={`col-bl-${i}-${col}-${row}`}
                        x={x + 5.3 + col * 2.8}
                        y={196.3 + row * 2.5}
                        width="2.4"
                        height="2.2"
                        fill={isNightTime && isWindowLit(x + i * 200 + 2) ? "#FFD700" : "#6b8ea8"}
                        opacity="1"
                      />
                    )))}
                  </g>
                  {/* Bottom right window */}
                  <g>
                    <rect x={x+29} y="196" width="6" height="8" fill="#4a4a4a" opacity="1" />
                    {[0, 1].map(col => [0, 1, 2].map(row => (
                      <rect
                        key={`col-br-${i}-${col}-${row}`}
                        x={x + 29.3 + col * 2.8}
                        y={196.3 + row * 2.5}
                        width="2.4"
                        height="2.2"
                        fill={isNightTime && isWindowLit(x + i * 200 + 3) ? "#FFA500" : "#6b8ea8"}
                        opacity="1"
                      />
                    )))}
                  </g>

                  {/* Centered front door */}
                  <rect x={x+16} y="194" width="8" height="14" fill="#5a4a3a" opacity="1" />
                  <circle cx={x+21} cy="201" r="0.7" fill="#d4af37" opacity="1" />

                  {/* Front porch pillars */}
                  <rect x={x+12} y="194" width="2" height="14" fill="#e8e8e8" opacity="1" />
                  <rect x={x+26} y="194" width="2" height="14" fill="#e8e8e8" opacity="1" />

                  {/* Chimney */}
                  <rect x={x+34} y="168" width="4" height="10" fill="#a85757" opacity="1" />

                  {/* Shutters - top and bottom story */}
                  <rect x={x+3} y="184" width="1.2" height="8" fill="#2f2f2f" opacity="1" />
                  <rect x={x+11.8} y="184" width="1.2" height="8" fill="#2f2f2f" opacity="1" />
                  <rect x={x+27} y="184" width="1.2" height="8" fill="#2f2f2f" opacity="1" />
                  <rect x={x+35.8} y="184" width="1.2" height="8" fill="#2f2f2f" opacity="1" />
                  <rect x={x+3} y="196" width="1.2" height="8" fill="#2f2f2f" opacity="1" />
                  <rect x={x+11.8} y="196" width="1.2" height="8" fill="#2f2f2f" opacity="1" />
                  <rect x={x+27} y="196" width="1.2" height="8" fill="#2f2f2f" opacity="1" />
                  <rect x={x+35.8} y="196" width="1.2" height="8" fill="#2f2f2f" opacity="1" />
                </g>
              ))}

              {/* Ranch style houses - low and wide (1/4 LARGER, NO DRIVEWAYS) */}
              {[880, 1180, 1480, 1780].map((x, i) => (
                <g key={`ranch-${i}`}>
                  {/* Wide, low ranch house - 25% larger */}
                  <rect x={x} y="188" width="48" height="18" fill={`url(#ranchHouse-${iteration})`} />

                  {/* Low-pitched roof */}
                  <path d={`M ${x-3},188 L ${x+24},179 L ${x+51},188 Z`} fill={`url(#ranchRoof-${iteration})`} />

                  {/* Horizontal windows - Ranch style 6-pane (3x2 grid) for wide look */}
                  {/* Left window */}
                  <g>
                    <rect x={x+6} y="191" width="10" height="5" fill="#4a4a4a" opacity="1" />
                    {[0, 1, 2].map(col => [0, 1].map(row => (
                      <rect
                        key={`ranch-left-${i}-${col}-${row}`}
                        x={x + 6.3 + col * 3.2}
                        y={191.3 + row * 2.3}
                        width="2.8"
                        height="2"
                        fill={isNightTime && isWindowLit(x + i * 150) ? "#FFD700" : "#6b8ea8"}
                        opacity="1"
                      />
                    )))}
                  </g>
                  {/* Right window - positioned between door and garage */}
                  <g>
                    <rect x={x+26} y="191" width="10" height="5" fill="#4a4a4a" opacity="1" />
                    {[0, 1, 2].map(col => [0, 1].map(row => (
                      <rect
                        key={`ranch-right-${i}-${col}-${row}`}
                        x={x + 26.3 + col * 3.2}
                        y={191.3 + row * 2.3}
                        width="2.8"
                        height="2"
                        fill={isNightTime && isWindowLit(x + i * 150 + 1) ? "#FFA500" : "#6b8ea8"}
                        opacity="1"
                      />
                    )))}
                  </g>

                  {/* Attached garage - larger */}
                  <rect x={x+38} y="193" width="9" height="13" fill="#c9b18f" opacity="1" />
                  <rect x={x+39} y="200" width="7" height="6" fill="#4a4a4a" opacity="1" />

                  {/* Front door */}
                  <rect x={x+19} y="196" width="5" height="10" fill="#6b5a45" opacity="1" />

                  {/* Front porch/step */}
                  <rect x={x+17} y="206" width="9" height="2" fill="#c9b18f" opacity="1" />
                </g>
              ))}

              {/* Cottage style houses - small and cozy (1/4 LARGER) */}
              {[1060, 1360, 1660, 1960].map((x, i) => (
                <g key={`cottage-${i}`}>
                  {/* Cottage body - 25% larger */}
                  <rect x={x} y="188" width="30" height="19" fill={`url(#cottageHouse-${iteration})`} />

                  {/* Rounded cottage roof */}
                  <path d={`M ${x-3},188 Q ${x+15},175 ${x+33},188 Z`} fill={`url(#cottageRoof-${iteration})`} />

                  {/* Arched door - larger */}
                  <path d={`M ${x+11},193 L ${x+11},207 L ${x+19},207 L ${x+19},193 Q ${x+15},190 ${x+11},193 Z`} fill="#a85757" opacity="1" />

                  {/* Cottage windows - cozy 4-pane (2x2 grid) */}
                  <g>
                    <rect x={x+5} y="191" width="5" height="5" fill="#4a4a4a" opacity="1" />
                    {[0, 1].map(col => [0, 1].map(row => (
                      <rect
                        key={`cottage-left-${i}-${col}-${row}`}
                        x={x + 5.3 + col * 2.3}
                        y={191.3 + row * 2.3}
                        width="2"
                        height="2"
                        fill={isNightTime && isWindowLit(x + i * 120) ? "#FFD700" : "#6b8ea8"}
                        opacity="1"
                      />
                    )))}
                  </g>
                  <g>
                    <rect x={x+20} y="191" width="5" height="5" fill="#4a4a4a" opacity="1" />
                    {[0, 1].map(col => [0, 1].map(row => (
                      <rect
                        key={`cottage-right-${i}-${col}-${row}`}
                        x={x + 20.3 + col * 2.3}
                        y={191.3 + row * 2.3}
                        width="2"
                        height="2"
                        fill={isNightTime && isWindowLit(x + i * 120 + 1) ? "#FFA500" : "#6b8ea8"}
                        opacity="1"
                      />
                    )))}
                  </g>

                  {/* Window boxes with flowers - snug below windows */}
                  <rect x={x+3} y="196.5" width="6" height="1.5" fill="#8b7355" opacity="1" />
                  <rect x={x+18} y="196.5" width="6" height="1.5" fill="#8b7355" opacity="1" />
                  <circle cx={x+5} cy="197" r="0.8" fill="#ff69b4" opacity="1" />
                  <circle cx={x+7} cy="197" r="0.8" fill="#ffd700" opacity="1" />
                  <circle cx={x+20} cy="197" r="0.8" fill="#ff69b4" opacity="1" />
                  <circle cx={x+22} cy="197" r="0.8" fill="#ffd700" opacity="1" />

                  {/* Small chimney - right of windows */}
                  <rect x={x+26} y="182" width="2.5" height="8" fill="#a85757" opacity="1" />

                  {/* Garden fence - gap at doorway */}
                  {[0, 4, 8, 21, 25, 29].map((offset, fi) => (
                    <rect key={`fence-${fi}`} x={x + offset} y="207" width="1" height="5" fill="#e8d4b8" opacity="1" />
                  ))}
                </g>
              ))}

              {/* Modern style houses - clean lines (1/4 LARGER) */}
              {[940, 1240, 1540, 1840].map((x, i) => (
                <g key={`modern-${i}`}>
                  {/* Cubic modern house - 25% larger */}
                  <rect x={x} y="183" width="33" height="24" fill={`url(#modernHouse-${iteration})`} />

                  {/* Flat/minimal roof */}
                  <rect x={x-1} y="180" width="35" height="3" fill={`url(#modernRoof-${iteration})`} />

                  {/* Large modern windows - floor-to-ceiling 3x4 grid pane design */}
                  <g>
                    <rect x={x+3} y="188" width="10" height="14" fill="#3a4a5a" opacity="1" />
                    {[0, 1, 2].map(col => [0, 1, 2, 3].map(row => (
                      <rect
                        key={`modern-left-${i}-${col}-${row}`}
                        x={x + 3.3 + col * 3.2}
                        y={188.3 + row * 3.4}
                        width="2.9"
                        height="3.1"
                        fill={isNightTime && isWindowLit(x + i * 180) ? "#FFD700" : "#6b8ea8"}
                        opacity="1"
                      />
                    )))}
                  </g>
                  <g>
                    <rect x={x+20} y="188" width="10" height="14" fill="#3a4a5a" opacity="1" />
                    {[0, 1, 2].map(col => [0, 1, 2, 3].map(row => (
                      <rect
                        key={`modern-right-${i}-${col}-${row}`}
                        x={x + 20.3 + col * 3.2}
                        y={188.3 + row * 3.4}
                        width="2.9"
                        height="3.1"
                        fill={isNightTime && isWindowLit(x + i * 180 + 1) ? "#FFA500" : "#6b8ea8"}
                        opacity="1"
                      />
                    )))}
                  </g>

                  {/* Minimal door */}
                  <rect x={x+14} y="196" width="5" height="11" fill="#5a7a8a" opacity="1" />

                  {/* Solar panels on roof - more panels */}
                  <rect x={x+2} y="181" width="12" height="1.5" fill="#3d5866" opacity="1" />
                  <rect x={x+18} y="181" width="12" height="1.5" fill="#3d5866" opacity="1" />

                  {/* Modern landscaping - larger */}
                  <circle cx={x+5} cy="208" r="4" fill="#8bc34a" opacity="1" />
                  <circle cx={x+28} cy="208" r="4" fill="#8bc34a" opacity="1" />
                </g>
              ))}

              {/* Yard trees and landscaping - between houses, not blocking views */}
              <g opacity="1">
                {[868, 986, 1050, 1105, 1168, 1286, 1350, 1405, 1468, 1586, 1650, 1705, 1768, 1886].map((x, i) => (
                  <g key={`yard-tree-${i}`}>
                    {/* Tree trunk */}
                    <rect x={x} y="203" width="2" height="7" fill="#6b5a45" opacity="1" />
                    {/* Tree foliage */}
                    <circle cx={x+1} cy="201" r="4" fill="#5a8a5a" opacity="1" />
                  </g>
                ))}
              </g>

              {/* Street lights along the road - POSITIONED ON ROAD EDGE */}
              <g opacity="1">
                {[840, 990, 1140, 1290, 1440, 1590, 1740, 1890].map((x, i) => (
                  <g key={`street-light-${i}`}>
                    {/* Light pole base on sidewalk edge near road */}
                    <rect x={x} y="212" width="2" height="12" fill="#4a4a4a" opacity="1" />
                    {/* Light arm extending over road */}
                    <rect x={x} y="212" width="8" height="1.5" fill="#4a4a4a" opacity="1" />
                    {/* Light fixture */}
                    <rect x={x+5} y="213" width="4" height="2" fill="#5a5a5a" opacity="1" />
                    <circle cx={x+7} cy="216" r="2" fill="#ffd700" opacity="1" />
                    <circle cx={x+7} cy="216" r="1" fill="#ffeb3b" className="window-light" />
                  </g>
                ))}
              </g>

              {/* Mailboxes */}
              <g opacity="1">
                {[825, 975, 1125, 1275, 1425, 1575, 1725, 1875].map((x, i) => (
                  <g key={`mailbox-${i}`}>
                    <rect x={x} y="211" width="1.5" height="4" fill="#5a4a3a" opacity="1" />
                    <rect x={x-0.5} y="210" width="2.5" height="2" rx="0.5" fill="#d4af37" opacity="1" />
                  </g>
                ))}
              </g>

              {/* Fire hydrants */}
              <g opacity="1">
                {[1000, 1300, 1600, 1900].map((x, i) => (
                  <g key={`hydrant-${i}`}>
                    <rect x={x} y="212" width="3" height="4" fill="#cc3333" opacity="1" />
                    <rect x={x-0.5} y="213" width="4" height="1.5" fill="#aa2222" opacity="1" />
                  </g>
                ))}
              </g>

              {/* ========== PHASE 3: SUSTAINABLE GREEN CITY - PROJECT EXODUS (2000-3800) ========== */}

              {/* Flat ground layer - with wide buffers from suburbs and to rural (WIDE BUFFERS: 2000-2100, 3600-3900) */}
              <path d="M 2000,210 Q 2100,210 2200,210 L 3500,210 Q 3600,210 3650,209 Q 3700,207 3750,205 Q 3800,203 3850,200 Q 3900,198 3900,198 L 3900,250 L 2000,250 Z"
                    fill="#7aa87a" opacity="1" />
              <path d="M 2000,208 Q 2100,208 2200,208 L 3500,208 Q 3600,208 3650,207 Q 3700,206 3750,204 Q 3800,202 3850,199 Q 3900,197 3900,197 L 3900,250 L 2000,250 Z"
                    fill="#8ab88a" opacity="1" />

              {/* Pedestrian-friendly streets with bike lanes */}
              <g opacity="1">
                {/* Main street at bottom */}
                <rect x="2000" y="220" width="1800" height="30" fill={`url(#roadGradient-${iteration})`} />

                {/* Sidewalk/pedestrian path */}
                <rect x="2000" y="217" width="1800" height="3" fill="#d8d8d8" opacity="1" />

                {/* Grass strip between road and sidewalk - landscape architecture area */}
                <rect x="2000" y="213" width="1800" height="4" fill="#7aa87a" opacity="1" />

                {/* Bike lane markings on street */}
                {Array.from({length: 36}).map((_, i) => (
                  <path key={`bike-${i}`} d={`M ${2010 + i * 50},225 L ${2015 + i * 50},230 L ${2010 + i * 50},235`}
                        stroke="#4a7c2f" strokeWidth="1.5" fill="none" opacity="1" />
                ))}
              </g>

              {/* Modern eco-buildings with varied sizes and detailed architecture - MINIATURE */}
              <g>
                {[
                  {x: 2020, h: 60, w: 45, color: "#e8f4e8"}, {x: 2074, h: 80, w: 58, color: "#f0f8f0"},
                  {x: 2142, h: 68, w: 52, color: "#e0f2e0"}, {x: 2204, h: 90, w: 64, color: "#e8f4e8"},
                  {x: 2338, h: 88, w: 62, color: "#e0f2e0"},
                  {x: 2410, h: 65, w: 48, color: "#e8f4e8"},
                  {x: 2468, h: 98, w: 68, color: "#f0f8f0"},
                  {x: 2546, h: 78, w: 56, color: "#e0f2e0"}, {x: 2612, h: 85, w: 60, color: "#e8f4e8"},
                  {x: 2682, h: 72, w: 54, color: "#f0f8f0"},
                  {x: 2822, h: 82, w: 58, color: "#e8f4e8"}, {x: 2890, h: 75, w: 52, color: "#f0f8f0"},
                  {x: 2952, h: 92, w: 64, color: "#e0f2e0"}, {x: 3026, h: 68, w: 50, color: "#e8f4e8"},
                  {x: 3086, h: 88, w: 62, color: "#f0f8f0"}, {x: 3158, h: 78, w: 56, color: "#e0f2e0"},
                  {x: 3224, h: 98, w: 68, color: "#e8f4e8"}, {x: 3302, h: 85, w: 60, color: "#f0f8f0"},
                  /* Park 3 replaces building at x=3372 */
                  {x: 3436, h: 95, w: 66, color: "#e8f4e8"},
                  {x: 3512, h: 82, w: 58, color: "#f0f8f0"}, {x: 3580, h: 100, w: 70, color: "#e0f2e0"},
                  {x: 3660, h: 88, w: 62, color: "#e8f4e8"}, {x: 3732, h: 75, w: 54, color: "#f0f8f0"}
                ].map((bldg, i) => {
                  // Calculate skyscraper window layout - detailed windows with tight spacing
                  const windowWidth = 8
                  const windowHeight = 12
                  const windowGapX = 3 // Gap between windows horizontally
                  const windowGapY = 3 // Gap between rows vertically
                  const sideMargin = 4 // Fixed small margin from building edge
                  const topMargin = 8 // Margin from roof (below cornice details)
                  const bottomMargin = 16 // Space for first floor (door area)

                  // Calculate number of window columns - fill width with small margins
                  const availableWidth = bldg.w - sideMargin * 2
                  const windowCols = Math.max(1, Math.floor((availableWidth + windowGapX) / (windowWidth + windowGapX)))
                  const totalWindowsWidth = windowCols * windowWidth + (windowCols - 1) * windowGapX
                  const startX = bldg.x + (bldg.w - totalWindowsWidth) / 2

                  // Calculate number of rows - fill the building height
                  const availableHeight = bldg.h - topMargin - bottomMargin
                  const windowRows = Math.floor(availableHeight / (windowHeight + windowGapY))

                  return (
                  <g key={`green-bldg-${i}`}>
                    {/* Building body with green tint - extends to sidewalk at y=217 */}
                    <rect x={bldg.x} y={215-bldg.h} width={bldg.w} height={bldg.h + 2} fill={bldg.color} opacity="1" />

                    {/* GREEN ROOF with plants */}
                    <rect x={bldg.x} y={215-bldg.h-3} width={bldg.w} height="3" fill="#4a7c2f" opacity="1" />
                    {Array.from({length: Math.floor(bldg.w/8)}).map((_, plant) => (
                      <circle key={`plant-${plant}`} cx={bldg.x + 4 + plant * 8} cy={215-bldg.h-2} r="1.5" fill="#5a8a5a" opacity="1" />
                    ))}

                    {/* SOLAR PANELS covering entire roof */}
                    <g opacity="1">
                      {Array.from({length: Math.floor(bldg.w/12)}).map((_, panel) => (
                        <rect key={`solar-${panel}`}
                              x={bldg.x + 2 + panel * 12}
                              y={215 - bldg.h - 6}
                              width="10"
                              height="6"
                              fill="#2f4f7f"
                              stroke="#1a2f4f"
                              strokeWidth="0.5" />
                      ))}
                    </g>

                    {/* Decorative cornice at roofline - multi-layer detail */}
                    <rect x={bldg.x - 2} y={215 - bldg.h - 1} width={bldg.w + 4} height="2" fill="#c8d8c8" opacity="1" />
                    <rect x={bldg.x - 1} y={215 - bldg.h + 1} width={bldg.w + 2} height="1" fill="#b8c8b8" opacity="1" />
                    {/* Dentil molding - small decorative blocks */}
                    {Array.from({length: Math.floor(bldg.w / 6)}).map((_, d) => (
                      <rect key={`dentil-${d}`}
                            x={bldg.x + 2 + d * 6}
                            y={215 - bldg.h + 2}
                            width="3"
                            height="1.5"
                            fill="#a8b8a8"
                            opacity="1" />
                    ))}

                    {/* Detailed skyscraper windows - grid pattern with balconies */}
                    <g opacity="1">
                      {Array.from({length: windowRows}).map((_, row) => (
                        <g key={`row-${row}`}>
                          {/* Windows in this row */}
                          {Array.from({length: windowCols}).map((_, col) => {
                            const windowX = startX + col * (windowWidth + windowGapX)
                            const windowY = 215 - bldg.h + topMargin + row * (windowHeight + windowGapY)
                            const hasBalcony = row % 3 === 1 // Balcony every 3rd row
                            const isLit = isNightTime && isWindowLit(bldg.x + row * 100 + col * 50 + i)
                            return (
                            <g key={`win-${row}-${col}`}>
                              {/* Window frame - outer border */}
                              <rect x={windowX}
                                    y={windowY}
                                    width={windowWidth}
                                    height={windowHeight}
                                    fill="#4a5a4a"
                                    opacity="1" />

                              {/* Window glass background */}
                              <rect x={windowX + 0.8}
                                    y={windowY + 0.8}
                                    width={windowWidth - 1.6}
                                    height={windowHeight - 1.6}
                                    fill={isLit ? "#FFD700" : "#6b8ea8"}
                                    opacity="1" />

                              {/* Horizontal mullion - divides window in half */}
                              <rect x={windowX + 0.8}
                                    y={windowY + windowHeight / 2 - 0.3}
                                    width={windowWidth - 1.6}
                                    height="0.6"
                                    fill="#4a5a4a"
                                    opacity="1" />

                              {/* Vertical mullion - divides window in half */}
                              <rect x={windowX + windowWidth / 2 - 0.3}
                                    y={windowY + 0.8}
                                    width="0.6"
                                    height={windowHeight - 1.6}
                                    fill="#4a5a4a"
                                    opacity="1" />

                              {/* Window sill - bottom ledge */}
                              <rect x={windowX - 0.5}
                                    y={windowY + windowHeight - 0.5}
                                    width={windowWidth + 1}
                                    height="1"
                                    fill="#5a6a5a"
                                    opacity="1" />

                              {/* Reflection highlight - top left corner */}
                              {!isLit && (
                                <rect x={windowX + 1.2}
                                      y={windowY + 1.2}
                                      width={windowWidth / 2 - 1.5}
                                      height={windowHeight / 2 - 1.5}
                                      fill="#8ab8d8"
                                      opacity="0.4" />
                              )}

                              {/* Nighttime warm glow effect */}
                              {isLit && (
                                <rect className="window-light"
                                      x={windowX + 0.8}
                                      y={windowY + 0.8}
                                      width={windowWidth - 1.6}
                                      height={windowHeight - 1.6}
                                      fill="#FFD700"
                                      opacity="0.3" />
                              )}

                              {/* Balcony - every 3rd row */}
                              {hasBalcony && (
                                <g>
                                  {/* Balcony floor - extends beyond window */}
                                  <rect x={windowX - 1.5}
                                        y={windowY + windowHeight}
                                        width={windowWidth + 3}
                                        height="1.5"
                                        fill="#7a8a7a"
                                        opacity="1" />
                                  {/* Balcony railing - left post */}
                                  <rect x={windowX - 1.5}
                                        y={windowY + windowHeight - 4}
                                        width="1"
                                        height="4"
                                        fill="#6a7a6a"
                                        opacity="1" />
                                  {/* Balcony railing - right post */}
                                  <rect x={windowX + windowWidth + 0.5}
                                        y={windowY + windowHeight - 4}
                                        width="1"
                                        height="4"
                                        fill="#6a7a6a"
                                        opacity="1" />
                                  {/* Balcony railing - center post */}
                                  <rect x={windowX + windowWidth / 2 - 0.5}
                                        y={windowY + windowHeight - 4}
                                        width="1"
                                        height="4"
                                        fill="#6a7a6a"
                                        opacity="1" />
                                  {/* Balcony top rail */}
                                  <rect x={windowX - 1.5}
                                        y={windowY + windowHeight - 4}
                                        width={windowWidth + 3}
                                        height="0.8"
                                        fill="#5a6a5a"
                                        opacity="1" />
                                  {/* Middle horizontal rail */}
                                  <rect x={windowX - 1.5}
                                        y={windowY + windowHeight - 2}
                                        width={windowWidth + 3}
                                        height="0.5"
                                        fill="#6a7a6a"
                                        opacity="1" />
                                </g>
                              )}
                            </g>
                          )})}
                        </g>
                      ))}
                    </g>

                    {/* Architectural details - vertical pilasters on building edges */}
                    <rect x={bldg.x} y={215 - bldg.h} width="3" height={bldg.h - 14} fill="#d0e0d0" opacity="1" />
                    <rect x={bldg.x + bldg.w - 3} y={215 - bldg.h} width="3" height={bldg.h - 14} fill="#d0e0d0" opacity="1" />
                    {/* Pilaster capitals at top */}
                    <rect x={bldg.x - 0.5} y={215 - bldg.h + 2} width="4" height="2" fill="#c0d0c0" opacity="1" />
                    <rect x={bldg.x + bldg.w - 3.5} y={215 - bldg.h + 2} width="4" height="2" fill="#c0d0c0" opacity="1" />

                    {/* Floor band above first floor with ornamentation */}
                    <rect x={bldg.x} y={198} width={bldg.w} height="2" fill="#b8c8b8" opacity="1" />
                    <rect x={bldg.x} y={197} width={bldg.w} height="1" fill="#c8d8c8" opacity="1" />

                    {/* Decorative ornamentation band between floors */}
                    <g opacity="1">
                      {/* Dentil molding - small rectangular blocks */}
                      {Array.from({ length: Math.floor(bldg.w / 3) }).map((_, d) => (
                        <rect
                          key={`dentil-${i}-${d}`}
                          x={bldg.x + 1 + d * 3}
                          y={196}
                          width="1.5"
                          height="1"
                          fill="#a8b8a8"
                          opacity="1"
                        />
                      ))}

                      {/* Decorative medallions/rosettes at intervals */}
                      {[0.25, 0.5, 0.75].map((pos, m) => (
                        <g key={`medallion-${i}-${m}`}>
                          {/* Circular medallion */}
                          <circle
                            cx={bldg.x + bldg.w * pos}
                            cy={193}
                            r="2"
                            fill="#d0dcd0"
                            stroke="#9aaa9a"
                            strokeWidth="0.3"
                            opacity="1"
                          />
                          {/* Inner decorative circle */}
                          <circle
                            cx={bldg.x + bldg.w * pos}
                            cy={193}
                            r="1.2"
                            fill="none"
                            stroke="#b0c0b0"
                            strokeWidth="0.2"
                            opacity="1"
                          />
                          {/* Center dot */}
                          <circle
                            cx={bldg.x + bldg.w * pos}
                            cy={193}
                            r="0.4"
                            fill="#8a9a8a"
                            opacity="1"
                          />
                        </g>
                      ))}

                      {/* Egg-and-dart style trim above dentils */}
                      <rect x={bldg.x} y={194.5} width={bldg.w} height="0.5" fill="#c0d0c0" opacity="1" />
                      {Array.from({ length: Math.floor(bldg.w / 4) }).map((_, e) => (
                        <ellipse
                          key={`egg-${i}-${e}`}
                          cx={bldg.x + 2 + e * 4}
                          cy={195.5}
                          rx="1"
                          ry="0.6"
                          fill="#d8e0d8"
                          opacity="0.8"
                        />
                      ))}

                      {/* Decorative scrollwork brackets at corners */}
                      <path
                        d={`M ${bldg.x + 2},195 Q ${bldg.x + 1},193 ${bldg.x + 2},191`}
                        stroke="#9aaa9a"
                        strokeWidth="0.5"
                        fill="none"
                        opacity="0.8"
                      />
                      <path
                        d={`M ${bldg.x + bldg.w - 2},195 Q ${bldg.x + bldg.w - 1},193 ${bldg.x + bldg.w - 2},191`}
                        stroke="#9aaa9a"
                        strokeWidth="0.5"
                        fill="none"
                        opacity="0.8"
                      />
                    </g>

                    {/* First floor windows - wide shop-style with 6 panes (3x2 grid) */}
                    <g opacity="1">
                      {/* Left storefront window - wide 6-pane shop window */}
                      {(() => {
                        const leftWinX = bldg.x + bldg.w/2 - 26
                        const leftWinY = 200
                        const sfWidth = 18
                        const sfHeight = 10
                        const paneWidth = (sfWidth - 2.4) / 3  // 3 columns
                        const paneHeight = (sfHeight - 1.6) / 2  // 2 rows
                        const isLeftLit = isNightTime && isWindowLit(bldg.x + 1000 + i)
                        return (
                          <g>
                            {/* Window frame */}
                            <rect x={leftWinX} y={leftWinY} width={sfWidth} height={sfHeight} fill="#4a5a4a" opacity="1" />
                            {/* 6 panes of glass (3 columns x 2 rows) */}
                            {[0, 1, 2].map(col => [0, 1].map(row => (
                              <rect
                                key={`left-pane-${col}-${row}`}
                                x={leftWinX + 0.6 + col * (paneWidth + 0.3)}
                                y={leftWinY + 0.6 + row * (paneHeight + 0.4)}
                                width={paneWidth}
                                height={paneHeight}
                                fill={isLeftLit ? "#FFD700" : "#6b8ea8"}
                                opacity="1"
                              />
                            )))}
                            {/* Vertical mullions (2 dividers for 3 columns) */}
                            <rect x={leftWinX + 0.6 + paneWidth} y={leftWinY + 0.6} width="0.6" height={sfHeight - 1.2} fill="#4a5a4a" opacity="1" />
                            <rect x={leftWinX + 0.6 + 2 * paneWidth + 0.3} y={leftWinY + 0.6} width="0.6" height={sfHeight - 1.2} fill="#4a5a4a" opacity="1" />
                            {/* Horizontal mullion (center divider for 2 rows) */}
                            <rect x={leftWinX + 0.6} y={leftWinY + 0.6 + paneHeight} width={sfWidth - 1.2} height="0.5" fill="#4a5a4a" opacity="1" />
                            {/* Window sill */}
                            <rect x={leftWinX - 0.5} y={leftWinY + sfHeight - 0.5} width={sfWidth + 1} height="1.5" fill="#5a6a5a" opacity="1" />
                            {/* Decorative trim above window */}
                            <rect x={leftWinX - 0.5} y={leftWinY - 1} width={sfWidth + 1} height="1" fill="#6a7a6a" opacity="1" />
                            {/* Reflections on each pane */}
                            {!isLeftLit && [0, 1, 2].map(col => (
                              <rect
                                key={`left-reflect-${col}`}
                                x={leftWinX + 1 + col * (paneWidth + 0.3)}
                                y={leftWinY + 1}
                                width={paneWidth * 0.4}
                                height={paneHeight * 0.5}
                                fill="#8ab8d8"
                                opacity="0.35"
                              />
                            ))}
                          </g>
                        )
                      })()}

                      {/* Right storefront window - wide 6-pane shop window */}
                      {(() => {
                        const rightWinX = bldg.x + bldg.w/2 + 8
                        const rightWinY = 200
                        const sfWidth = 18
                        const sfHeight = 10
                        const paneWidth = (sfWidth - 2.4) / 3  // 3 columns
                        const paneHeight = (sfHeight - 1.6) / 2  // 2 rows
                        const isRightLit = isNightTime && isWindowLit(bldg.x + 1001 + i)
                        return (
                          <g>
                            {/* Window frame */}
                            <rect x={rightWinX} y={rightWinY} width={sfWidth} height={sfHeight} fill="#4a5a4a" opacity="1" />
                            {/* 6 panes of glass (3 columns x 2 rows) */}
                            {[0, 1, 2].map(col => [0, 1].map(row => (
                              <rect
                                key={`right-pane-${col}-${row}`}
                                x={rightWinX + 0.6 + col * (paneWidth + 0.3)}
                                y={rightWinY + 0.6 + row * (paneHeight + 0.4)}
                                width={paneWidth}
                                height={paneHeight}
                                fill={isRightLit ? "#FFD700" : "#6b8ea8"}
                                opacity="1"
                              />
                            )))}
                            {/* Vertical mullions (2 dividers for 3 columns) */}
                            <rect x={rightWinX + 0.6 + paneWidth} y={rightWinY + 0.6} width="0.6" height={sfHeight - 1.2} fill="#4a5a4a" opacity="1" />
                            <rect x={rightWinX + 0.6 + 2 * paneWidth + 0.3} y={rightWinY + 0.6} width="0.6" height={sfHeight - 1.2} fill="#4a5a4a" opacity="1" />
                            {/* Horizontal mullion (center divider for 2 rows) */}
                            <rect x={rightWinX + 0.6} y={rightWinY + 0.6 + paneHeight} width={sfWidth - 1.2} height="0.5" fill="#4a5a4a" opacity="1" />
                            {/* Window sill */}
                            <rect x={rightWinX - 0.5} y={rightWinY + sfHeight - 0.5} width={sfWidth + 1} height="1.5" fill="#5a6a5a" opacity="1" />
                            {/* Decorative trim above window */}
                            <rect x={rightWinX - 0.5} y={rightWinY - 1} width={sfWidth + 1} height="1" fill="#6a7a6a" opacity="1" />
                            {/* Reflections on each pane */}
                            {!isRightLit && [0, 1, 2].map(col => (
                              <rect
                                key={`right-reflect-${col}`}
                                x={rightWinX + 1 + col * (paneWidth + 0.3)}
                                y={rightWinY + 1}
                                width={paneWidth * 0.4}
                                height={paneHeight * 0.5}
                                fill="#8ab8d8"
                                opacity="0.35"
                              />
                            ))}
                          </g>
                        )
                      })()}
                    </g>

                    {/* Building foundation/sidewalk - prevents merging into grass */}
                    <g opacity="1">
                      {/* Concrete foundation strip under building */}
                      <rect x={bldg.x - 3}
                            y="212"
                            width={bldg.w + 6}
                            height="6"
                            fill="#c8c8c8"
                            opacity="1" />
                      {/* Foundation edge detail */}
                      <rect x={bldg.x - 3}
                            y="212"
                            width={bldg.w + 6}
                            height="1"
                            fill="#b0b0b0"
                            opacity="1" />
                    </g>

                    {/* Ground-level entrance with architectural details */}
                    <g opacity="1">
                      {/* Entrance canopy/awning */}
                      <rect x={bldg.x + bldg.w/2 - 12}
                            y={197}
                            width="24"
                            height="2"
                            fill="#4a5a4a"
                            opacity="1" />
                      {/* Canopy support brackets */}
                      <path d={`M ${bldg.x + bldg.w/2 - 10},199 L ${bldg.x + bldg.w/2 - 10},197 L ${bldg.x + bldg.w/2 - 8},197`}
                            stroke="#3a4a3a" strokeWidth="1" fill="none" />
                      <path d={`M ${bldg.x + bldg.w/2 + 10},199 L ${bldg.x + bldg.w/2 + 10},197 L ${bldg.x + bldg.w/2 + 8},197`}
                            stroke="#3a4a3a" strokeWidth="1" fill="none" />

                      {/* Door frame - extends to sidewalk level (y=212) */}
                      <rect x={bldg.x + bldg.w/2 - 8}
                            y={199}
                            width="16"
                            height="13"
                            fill="#5a6a5a"
                            opacity="1" />

                      {/* Decorative keystone above door */}
                      <path d={`M ${bldg.x + bldg.w/2 - 3},199 L ${bldg.x + bldg.w/2},196 L ${bldg.x + bldg.w/2 + 3},199 Z`}
                            fill="#c8d8c8" opacity="1" />

                      {/* Glass doors with mullions */}
                      <rect x={bldg.x + bldg.w/2 - 6}
                            y={200}
                            width="5"
                            height="12"
                            fill="#6b8ea8"
                            opacity="0.9" />
                      <rect x={bldg.x + bldg.w/2 + 1}
                            y={200}
                            width="5"
                            height="12"
                            fill="#6b8ea8"
                            opacity="0.9" />
                      {/* Door mullions - horizontal */}
                      <rect x={bldg.x + bldg.w/2 - 6} y={206} width="5" height="0.5" fill="#4a5a4a" opacity="1" />
                      <rect x={bldg.x + bldg.w/2 + 1} y={206} width="5" height="0.5" fill="#4a5a4a" opacity="1" />
                      {/* Door handles */}
                      <rect x={bldg.x + bldg.w/2 - 1.5}
                            y={205}
                            width="0.8"
                            height="4"
                            fill="#d4af37"
                            opacity="1" />
                      <rect x={bldg.x + bldg.w/2 + 0.7}
                            y={205}
                            width="0.8"
                            height="4"
                            fill="#d4af37"
                            opacity="1" />

                      {/* Entrance step */}
                      <rect x={bldg.x + bldg.w/2 - 10}
                            y={212}
                            width="20"
                            height="1.5"
                            fill="#a8a8a8"
                            opacity="1" />
                    </g>

                    {/* Rooftop equipment (HVAC units, antennas) */}
                    <g opacity="1">
                      {/* HVAC unit */}
                      <rect x={bldg.x + bldg.w - 12}
                            y={215 - bldg.h - 8}
                            width="8"
                            height="5"
                            fill="#a8a8a8"
                            opacity="1" />
                      {/* Antenna */}
                      <rect x={bldg.x + 6}
                            y={215 - bldg.h - 15}
                            width="1"
                            height="12"
                            fill="#8a8a8a"
                            opacity="1" />
                      <circle cx={bldg.x + 6.5}
                              cy={215 - bldg.h - 15}
                              r="2"
                              fill="#8a8a8a"
                              opacity="1" />

                      {/* Small rooftop wind turbine */}
                      <g>
                        {/* Turbine tower - small white pole */}
                        <rect x={bldg.x + bldg.w/2 - 1}
                              y={215 - bldg.h - 10}
                              width="2"
                              height="10"
                              fill="#e8e8e8"
                              opacity="1" />
                        {/* Turbine hub - small green circle */}
                        <circle cx={bldg.x + bldg.w/2}
                                cy={215 - bldg.h - 10}
                                r="2"
                                fill="#4a7c2f"
                                opacity="1" />
                        {/* Small rotating blades */}
                        <g className="turbine-blade" style={{animationDelay: `${i * 0.2}s`, transformOrigin: `${bldg.x + bldg.w/2}px ${215 - bldg.h - 10}px`}}>
                          {/* Blade 1 - pointing up */}
                          <path d={`M ${bldg.x + bldg.w/2},${215 - bldg.h - 12} L ${bldg.x + bldg.w/2 + 1},${215 - bldg.h - 18} L ${bldg.x + bldg.w/2 - 1},${215 - bldg.h - 18} Z`}
                                fill="#f0f0f0"
                                opacity="1" />
                          {/* Blade 2 - pointing right */}
                          <path d={`M ${bldg.x + bldg.w/2 + 2},${215 - bldg.h - 10} L ${bldg.x + bldg.w/2 + 8},${215 - bldg.h - 11} L ${bldg.x + bldg.w/2 + 7},${215 - bldg.h - 9} Z`}
                                fill="#f0f0f0"
                                opacity="1" />
                          {/* Blade 3 - pointing lower left */}
                          <path d={`M ${bldg.x + bldg.w/2 - 1},${215 - bldg.h - 8} L ${bldg.x + bldg.w/2 - 6},${215 - bldg.h - 5} L ${bldg.x + bldg.w/2 - 5},${215 - bldg.h - 7} Z`}
                                fill="#f0f0f0"
                                opacity="1" />
                        </g>
                      </g>
                    </g>
                  </g>
                )})}
              </g>

              {/* City Parks - Green spaces with centered fountains and symmetrical layout */}
              {/* Trees scaled to 75% of original size */}
              <g>
                {/* Park 1 - centered at x=2303 (between buildings 2268 and 2338) */}
                <g>
                  {/* Oak tree - left side (75% scale) */}
                  <g key="park1-tree-1">
                    <rect x="2275" y="199" width="3" height="11" fill="#5a4a3a" opacity="1" />
                    <circle cx="2276.5" cy="194" r="7.5" fill="#4a7c2f" opacity="1" />
                    <circle cx="2271" cy="197" r="5" fill="#5a8a4a" opacity="1" />
                    <circle cx="2282" cy="197" r="5" fill="#5a8a4a" opacity="1" />
                    <circle cx="2276.5" cy="188" r="4.5" fill="#6a9a5a" opacity="1" />
                  </g>
                  {/* Pine tree - left-center (75% scale) */}
                  <g key="park1-tree-2">
                    <rect x="2292" y="201" width="2" height="9" fill="#5a4a3a" opacity="1" />
                    <polygon points="2293,182 2286,203 2300,203" fill="#2d5a3d" opacity="1" />
                    <polygon points="2293,188 2288,201 2298,201" fill="#3d6a4d" opacity="1" />
                    <polygon points="2293,193 2289,200 2297,200" fill="#2d5a3d" opacity="1" />
                  </g>
                  {/* Maple tree - center-right (75% scale) */}
                  <g key="park1-tree-3">
                    <rect x="2313" y="200" width="2" height="10" fill="#6b5a45" opacity="1" />
                    <ellipse cx="2314" cy="192" rx="7.5" ry="7" fill="#5a9a4a" opacity="1" />
                    <ellipse cx="2308" cy="195" r="4" fill="#6aaa5a" opacity="1" />
                    <ellipse cx="2320" cy="195" r="4" fill="#6aaa5a" opacity="1" />
                  </g>
                  {/* Oak tree - right side (75% scale) */}
                  <g key="park1-tree-4">
                    <rect x="2329" y="199" width="3" height="11" fill="#5a4a3a" opacity="1" />
                    <circle cx="2330.5" cy="194" r="7.5" fill="#4a7c2f" opacity="1" />
                    <circle cx="2325" cy="197" r="5" fill="#5a8a4a" opacity="1" />
                    <circle cx="2336" cy="197" r="5" fill="#5a8a4a" opacity="1" />
                    <circle cx="2330.5" cy="188" r="4.5" fill="#6a9a5a" opacity="1" />
                  </g>

                  {/* Fountain centered at x=2303 */}
                  <g>
                    {/* Fountain base */}
                    <ellipse cx="2303" cy="210" rx="10" ry="4" fill="#a8a8a8" opacity="1" />
                    <rect x="2298" y="206" width="10" height="4" fill="#b8b8b8" opacity="1" rx="1" />

                    {/* Fountain basin */}
                    <ellipse cx="2303" cy="206" rx="8" ry="3" fill="#87CEEB" opacity="1" />

                    {/* Water spray - symmetrical around center */}
                    <circle cx="2303" cy="203" r="1.5" fill="#B0E0E6" opacity="1" />
                    <circle cx="2300" cy="204" r="1" fill="#B0E0E6" opacity="1" />
                    <circle cx="2306" cy="204" r="1" fill="#B0E0E6" opacity="1" />
                    <circle cx="2301" cy="201" r="0.8" fill="#B0E0E6" opacity="1" />
                    <circle cx="2305" cy="201" r="0.8" fill="#B0E0E6" opacity="1" />

                    {/* Central water column */}
                    <path d="M 2303,203 L 2303,198 L 2302,199 M 2303,198 L 2304,199"
                          stroke="#B0E0E6" strokeWidth="0.8" fill="none" opacity="1" />
                  </g>

                  {/* Bench on left side - 25px from center */}
                  <g>
                    <rect x="2273" y="211" width="10" height="2" fill="#8b7355" opacity="1" />
                    <rect x="2273" y="208" width="10" height="3" fill="#8b7355" opacity="1" />
                    <rect x="2273" y="209" width="2" height="4" fill="#6b5a45" opacity="1" />
                    <rect x="2281" y="209" width="2" height="4" fill="#6b5a45" opacity="1" />
                  </g>

                  {/* Bench on right side - 25px from center (mirror of left) */}
                  <g>
                    <rect x="2323" y="211" width="10" height="2" fill="#8b7355" opacity="1" />
                    <rect x="2323" y="208" width="10" height="3" fill="#8b7355" opacity="1" />
                    <rect x="2323" y="209" width="2" height="4" fill="#6b5a45" opacity="1" />
                    <rect x="2331" y="209" width="2" height="4" fill="#6b5a45" opacity="1" />
                  </g>
                </g>

                {/* Park 2 - centered at x=2779 (between buildings 2736 and 2822) - largest park */}
                <g>
                  {/* Cypress tree - far left (75% scale) */}
                  <g key="park2-tree-1">
                    <rect x="2743" y="201" width="2" height="9" fill="#5a4a3a" opacity="1" />
                    <ellipse cx="2744" cy="188" rx="4" ry="13" fill="#2d5a3d" opacity="1" />
                    <ellipse cx="2744" cy="190" rx="3" ry="11" fill="#3d6a4d" opacity="1" />
                  </g>
                  {/* Oak - left side (75% scale) */}
                  <g key="park2-tree-2">
                    <rect x="2755" y="197" width="4" height="13" fill="#5a4a3a" opacity="1" />
                    <circle cx="2757" cy="190" r="9" fill="#4a7c2f" opacity="1" />
                    <circle cx="2750" cy="194" r="6" fill="#5a8a4a" opacity="1" />
                    <circle cx="2764" cy="194" r="6" fill="#5a8a4a" opacity="1" />
                    <circle cx="2757" cy="183" r="5" fill="#6a9a5a" opacity="1" />
                  </g>
                  {/* Pine - center left (75% scale) */}
                  <g key="park2-tree-3">
                    <rect x="2773" y="200" width="2" height="10" fill="#5a4a3a" opacity="1" />
                    <polygon points="2774,180 2767,202 2781,202" fill="#2d5a3d" opacity="1" />
                    <polygon points="2774,186 2769,200 2779,200" fill="#3d6a4d" opacity="1" />
                    <polygon points="2774,192 2770,199 2778,199" fill="#2d5a3d" opacity="1" />
                  </g>
                  {/* Pine - center right (75% scale) */}
                  <g key="park2-tree-4">
                    <rect x="2785" y="200" width="2" height="10" fill="#5a4a3a" opacity="1" />
                    <polygon points="2786,182 2779,202 2793,202" fill="#2d5a3d" opacity="1" />
                    <polygon points="2786,188 2781,200 2791,200" fill="#3d6a4d" opacity="1" />
                    <polygon points="2786,193 2782,199 2790,199" fill="#2d5a3d" opacity="1" />
                  </g>
                  {/* Oak - right side (75% scale) */}
                  <g key="park2-tree-5">
                    <rect x="2801" y="197" width="4" height="13" fill="#5a4a3a" opacity="1" />
                    <circle cx="2803" cy="190" r="9" fill="#4a7c2f" opacity="1" />
                    <circle cx="2796" cy="194" r="6" fill="#5a8a4a" opacity="1" />
                    <circle cx="2810" cy="194" r="6" fill="#5a8a4a" opacity="1" />
                    <circle cx="2803" cy="183" r="5" fill="#6a9a5a" opacity="1" />
                  </g>

                  {/* Fountain centered at x=2779 */}
                  <g>
                    {/* Fountain base */}
                    <ellipse cx="2779" cy="210" rx="10" ry="4" fill="#a8a8a8" opacity="1" />
                    <rect x="2774" y="206" width="10" height="4" fill="#b8b8b8" opacity="1" rx="1" />

                    {/* Fountain basin */}
                    <ellipse cx="2779" cy="206" rx="8" ry="3" fill="#87CEEB" opacity="1" />

                    {/* Water spray - symmetrical */}
                    <circle cx="2779" cy="203" r="1.5" fill="#B0E0E6" opacity="1" />
                    <circle cx="2776" cy="204" r="1" fill="#B0E0E6" opacity="1" />
                    <circle cx="2782" cy="204" r="1" fill="#B0E0E6" opacity="1" />
                    <circle cx="2777" cy="201" r="0.8" fill="#B0E0E6" opacity="1" />
                    <circle cx="2781" cy="201" r="0.8" fill="#B0E0E6" opacity="1" />

                    {/* Central water column */}
                    <path d="M 2779,203 L 2779,198 L 2778,199 M 2779,198 L 2780,199"
                          stroke="#B0E0E6" strokeWidth="0.8" fill="none" opacity="1" />
                  </g>

                  {/* Bench on left side - 27px from center */}
                  <g>
                    <rect x="2747" y="211" width="10" height="2" fill="#8b7355" opacity="1" />
                    <rect x="2747" y="208" width="10" height="3" fill="#8b7355" opacity="1" />
                    <rect x="2747" y="209" width="2" height="4" fill="#6b5a45" opacity="1" />
                    <rect x="2755" y="209" width="2" height="4" fill="#6b5a45" opacity="1" />
                  </g>

                  {/* Bench on right side - 27px from center (mirror of left) */}
                  <g>
                    <rect x="2801" y="211" width="10" height="2" fill="#8b7355" opacity="1" />
                    <rect x="2801" y="208" width="10" height="3" fill="#8b7355" opacity="1" />
                    <rect x="2801" y="209" width="2" height="4" fill="#6b5a45" opacity="1" />
                    <rect x="2809" y="209" width="2" height="4" fill="#6b5a45" opacity="1" />
                  </g>
                </g>

                {/* Park 3 - centered at x=3399 (between buildings 3362 and 3436) */}
                <g>
                  {/* Maple tree - left side (75% scale) */}
                  <g key="park3-tree-1">
                    <rect x="3369" y="198" width="3" height="12" fill="#6b5a45" opacity="1" />
                    <ellipse cx="3370.5" cy="190" rx="8" ry="7.5" fill="#5a9a4a" opacity="1" />
                    <ellipse cx="3364" cy="194" r="4.5" fill="#6aaa5a" opacity="1" />
                    <ellipse cx="3377" cy="194" r="4.5" fill="#6aaa5a" opacity="1" />
                    <ellipse cx="3370.5" cy="184" rx="4.5" ry="4" fill="#7aba6a" opacity="1" />
                  </g>
                  {/* Pine - left-center (75% scale) */}
                  <g key="park3-tree-2">
                    <rect x="3387" y="200" width="2" height="10" fill="#5a4a3a" opacity="1" />
                    <polygon points="3388,183 3381,202 3395,202" fill="#2d5a3d" opacity="1" />
                    <polygon points="3388,189 3383,200 3393,200" fill="#3d6a4d" opacity="1" />
                    <polygon points="3388,194 3384,199 3392,199" fill="#2d5a3d" opacity="1" />
                  </g>
                  {/* Cypress - center (75% scale) */}
                  <g key="park3-tree-3">
                    <rect x="3398" y="201" width="2" height="9" fill="#5a4a3a" opacity="1" />
                    <ellipse cx="3399" cy="189" rx="3" ry="12" fill="#2d5a3d" opacity="1" />
                    <ellipse cx="3399" cy="191" rx="2.5" ry="10" fill="#3d6a4d" opacity="1" />
                  </g>
                  {/* Oak tree - right side (75% scale) */}
                  <g key="park3-tree-4">
                    <rect x="3421" y="198" width="3" height="12" fill="#5a4a3a" opacity="1" />
                    <circle cx="3422.5" cy="191" r="8" fill="#4a7c2f" opacity="1" />
                    <circle cx="3416" cy="195" r="5" fill="#5a8a4a" opacity="1" />
                    <circle cx="3429" cy="195" r="5" fill="#5a8a4a" opacity="1" />
                    <circle cx="3422.5" cy="185" r="4.5" fill="#6a9a5a" opacity="1" />
                  </g>

                  {/* Fountain centered at x=3399 */}
                  <g>
                    {/* Fountain base */}
                    <ellipse cx="3399" cy="210" rx="10" ry="4" fill="#a8a8a8" opacity="1" />
                    <rect x="3394" y="206" width="10" height="4" fill="#b8b8b8" opacity="1" rx="1" />

                    {/* Fountain basin */}
                    <ellipse cx="3399" cy="206" rx="8" ry="3" fill="#87CEEB" opacity="1" />

                    {/* Water spray - symmetrical */}
                    <circle cx="3399" cy="203" r="1.5" fill="#B0E0E6" opacity="1" />
                    <circle cx="3396" cy="204" r="1" fill="#B0E0E6" opacity="1" />
                    <circle cx="3402" cy="204" r="1" fill="#B0E0E6" opacity="1" />
                    <circle cx="3397" cy="201" r="0.8" fill="#B0E0E6" opacity="1" />
                    <circle cx="3401" cy="201" r="0.8" fill="#B0E0E6" opacity="1" />

                    {/* Central water column */}
                    <path d="M 3399,203 L 3399,198 L 3398,199 M 3399,198 L 3400,199"
                          stroke="#B0E0E6" strokeWidth="0.8" fill="none" opacity="1" />
                  </g>

                  {/* Bench on left side - 27px from center */}
                  <g>
                    <rect x="3367" y="211" width="10" height="2" fill="#8b7355" opacity="1" />
                    <rect x="3367" y="208" width="10" height="3" fill="#8b7355" opacity="1" />
                    <rect x="3367" y="209" width="2" height="4" fill="#6b5a45" opacity="1" />
                    <rect x="3375" y="209" width="2" height="4" fill="#6b5a45" opacity="1" />
                  </g>

                  {/* Bench on right side - 27px from center (mirror of left) */}
                  <g>
                    <rect x="3421" y="211" width="10" height="2" fill="#8b7355" opacity="1" />
                    <rect x="3421" y="208" width="10" height="3" fill="#8b7355" opacity="1" />
                    <rect x="3421" y="209" width="2" height="4" fill="#6b5a45" opacity="1" />
                    <rect x="3429" y="209" width="2" height="4" fill="#6b5a45" opacity="1" />
                  </g>
                </g>
              </g>

              {/* Roman-Glass Dome Bridge Indoor Garden Parks - enclosed conservatory bridges with Roman architecture */}
              <g>
                {/* Bridge 1 over Park 1 - Roman columns + fully enclosed glass dome */}
                <g>
                  {/* Ornate Roman stone base with decorative moldings */}
                  <rect x="2268" y="140" width="70" height="15" fill="#d8d0c8" opacity="1" />
                  <rect x="2266" y="138" width="74" height="3" fill="#e8e0d8" opacity="1" />
                  {/* Base molding details */}
                  <rect x="2266" y="152" width="74" height="2" fill="#c8c0b8" opacity="1" />
                  <rect x="2268" y="154" width="70" height="1" fill="#b8b0a8" opacity="1" />
                  {/* Decorative dentil molding on base */}
                  {Array.from({length: 12}).map((_, d) => (
                    <rect key={`base-dentil1-${d}`} x={2270 + d * 5.5} y="150" width="3" height="2" fill="#b8b0a8" opacity="1" />
                  ))}
                  {/* Balustrade/railing on base */}
                  <rect x="2270" y="141" width="66" height="0.8" fill="#f0e8e0" opacity="1" />
                  {Array.from({length: 14}).map((_, b) => (
                    <rect key={`baluster1-${b}`} x={2272 + b * 4.5} y="141" width="1.5" height="8" fill="#e8e0d8" opacity="0.8" />
                  ))}

                  {/* Roman columns supporting the dome */}
                  <rect x="2270" y="120" width="6" height="20" fill="#d8d0c8" opacity="1" />
                  <rect x="2286" y="120" width="6" height="20" fill="#d8d0c8" opacity="1" />
                  <rect x="2314" y="120" width="6" height="20" fill="#d8d0c8" opacity="1" />
                  <rect x="2330" y="120" width="6" height="20" fill="#d8d0c8" opacity="1" />
                  {/* Column fluting */}
                  <line x1="2272" y1="122" x2="2272" y2="138" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="2274" y1="122" x2="2274" y2="138" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="2288" y1="122" x2="2288" y2="138" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="2290" y1="122" x2="2290" y2="138" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="2316" y1="122" x2="2316" y2="138" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="2318" y1="122" x2="2318" y2="138" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="2332" y1="122" x2="2332" y2="138" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="2334" y1="122" x2="2334" y2="138" stroke="#c8c0b8" strokeWidth="0.5" />
                  {/* Ornate column capitals with scrollwork */}
                  <rect x="2268" y="117" width="10" height="4" fill="#e8e0d8" opacity="1" />
                  <rect x="2284" y="117" width="10" height="4" fill="#e8e0d8" opacity="1" />
                  <rect x="2312" y="117" width="10" height="4" fill="#e8e0d8" opacity="1" />
                  <rect x="2328" y="117" width="10" height="4" fill="#e8e0d8" opacity="1" />
                  {/* Capital decorative details */}
                  <ellipse cx="2273" cy="118" rx="2" ry="1" fill="#f0e8e0" opacity="1" />
                  <ellipse cx="2289" cy="118" rx="2" ry="1" fill="#f0e8e0" opacity="1" />
                  <ellipse cx="2317" cy="118" rx="2" ry="1" fill="#f0e8e0" opacity="1" />
                  <ellipse cx="2333" cy="118" rx="2" ry="1" fill="#f0e8e0" opacity="1" />
                  {/* Column bases with torus molding */}
                  <rect x="2268" y="138" width="10" height="3" fill="#c8c0b8" opacity="1" />
                  <rect x="2284" y="138" width="10" height="3" fill="#c8c0b8" opacity="1" />
                  <rect x="2312" y="138" width="10" height="3" fill="#c8c0b8" opacity="1" />
                  <rect x="2328" y="138" width="10" height="3" fill="#c8c0b8" opacity="1" />
                  <ellipse cx="2273" cy="139" rx="4" ry="1" fill="#d8d0c8" opacity="1" />
                  <ellipse cx="2289" cy="139" rx="4" ry="1" fill="#d8d0c8" opacity="1" />
                  <ellipse cx="2317" cy="139" rx="4" ry="1" fill="#d8d0c8" opacity="1" />
                  <ellipse cx="2333" cy="139" rx="4" ry="1" fill="#d8d0c8" opacity="1" />

                  {/* Roman arched framework connecting columns */}
                  <path d="M 2276,117 Q 2276,105 2289,105 Q 2302,105 2303,100" stroke="#d8d0c8" strokeWidth="3" fill="none" opacity="1" />
                  <path d="M 2330,117 Q 2330,105 2317,105 Q 2304,105 2303,100" stroke="#d8d0c8" strokeWidth="3" fill="none" opacity="1" />

                  {/* Glass side panels between columns - fully enclosed */}
                  <rect x="2276" y="120" width="10" height="18" fill="#b8d4e8" opacity="0.2" />
                  <rect x="2320" y="120" width="10" height="18" fill="#b8d4e8" opacity="0.2" />
                  {/* Side panel mullions */}
                  <line x1="2281" y1="120" x2="2281" y2="138" stroke="#a8c8d8" strokeWidth="0.5" opacity="0.5" />
                  <line x1="2325" y1="120" x2="2325" y2="138" stroke="#a8c8d8" strokeWidth="0.5" opacity="0.5" />
                  <line x1="2276" y1="129" x2="2286" y2="129" stroke="#a8c8d8" strokeWidth="0.4" opacity="0.4" />
                  <line x1="2320" y1="129" x2="2330" y2="129" stroke="#a8c8d8" strokeWidth="0.4" opacity="0.4" />

                  {/* Full glass dome on top - with complete coverage */}
                  <path d="M 2273,117 Q 2273,85 2303,80 Q 2333,85 2333,117"
                        fill="#b8d4e8" opacity="0.3" />
                  {/* Glass dome frame/ribs - thicker */}
                  <path d="M 2273,117 Q 2273,85 2303,80 Q 2333,85 2333,117"
                        stroke="#a8c8d8" strokeWidth="2" fill="none" opacity="0.7" />
                  {/* Additional glass panel divisions for fuller coverage */}
                  <path d="M 2278,116 Q 2280,92 2303,85 Q 2326,92 2328,116" stroke="#a8c8d8" strokeWidth="1" fill="none" opacity="0.6" />
                  <path d="M 2283,115 Q 2285,95 2303,88 Q 2321,95 2323,115" stroke="#a8c8d8" strokeWidth="0.8" fill="none" opacity="0.5" />
                  <path d="M 2293,112 Q 2296,98 2303,93 Q 2310,98 2313,112" stroke="#a8c8d8" strokeWidth="0.6" fill="none" opacity="0.4" />
                  {/* More vertical mullions for complete glass coverage */}
                  <line x1="2280" y1="117" x2="2282" y2="88" stroke="#a8c8d8" strokeWidth="0.5" opacity="0.5" />
                  <line x1="2288" y1="117" x2="2290" y2="92" stroke="#a8c8d8" strokeWidth="0.6" opacity="0.5" />
                  <line x1="2296" y1="117" x2="2297" y2="86" stroke="#a8c8d8" strokeWidth="0.5" opacity="0.5" />
                  <line x1="2303" y1="117" x2="2303" y2="80" stroke="#a8c8d8" strokeWidth="0.8" opacity="0.6" />
                  <line x1="2310" y1="117" x2="2309" y2="86" stroke="#a8c8d8" strokeWidth="0.5" opacity="0.5" />
                  <line x1="2318" y1="117" x2="2316" y2="92" stroke="#a8c8d8" strokeWidth="0.6" opacity="0.5" />
                  <line x1="2326" y1="117" x2="2324" y2="88" stroke="#a8c8d8" strokeWidth="0.5" opacity="0.5" />
                  {/* Horizontal ring mullions */}
                  <path d="M 2278,105 Q 2290,102 2303,100 Q 2316,102 2328,105" stroke="#a8c8d8" strokeWidth="0.5" fill="none" opacity="0.4" />
                  {/* Glass reflections - multiple for shine */}
                  <path d="M 2280,105 Q 2290,92 2298,85" stroke="#ffffff" strokeWidth="0.6" fill="none" opacity="0.5" />
                  <path d="M 2282,110 Q 2288,100 2294,92" stroke="#ffffff" strokeWidth="0.4" fill="none" opacity="0.3" />
                  <path d="M 2308,100 Q 2318,90 2325,85" stroke="#ffffff" strokeWidth="0.4" fill="none" opacity="0.3" />

                  {/* Ornate decorative keystone at apex */}
                  <ellipse cx="2303" cy="80" rx="6" ry="4" fill="#e8e0d8" opacity="1" />
                  <rect x="2299" y="77" width="8" height="4" fill="#f0e8e0" opacity="1" />
                  {/* Keystone decorative carving */}
                  <circle cx="2303" cy="79" r="1.5" fill="#d8d0c8" opacity="1" />
                  <line x1="2300" y1="79" x2="2296" y2="79" stroke="#d8d0c8" strokeWidth="0.8" opacity="0.8" />
                  <line x1="2306" y1="79" x2="2310" y2="79" stroke="#d8d0c8" strokeWidth="0.8" opacity="0.8" />

                  {/* Indoor garden visible through glass */}
                  <rect x="2290" y="130" width="3" height="8" fill="#6b5a45" opacity="0.8" />
                  <circle cx="2291.5" cy="125" r="6" fill="#4a7c2f" opacity="0.7" />
                  <circle cx="2288" cy="127" r="4" fill="#5a8a5a" opacity="0.7" />
                  <rect x="2313" y="130" width="3" height="8" fill="#6b5a45" opacity="0.8" />
                  <circle cx="2314.5" cy="125" r="6" fill="#4a7c2f" opacity="0.7" />
                  <circle cx="2318" cy="127" r="4" fill="#5a8a5a" opacity="0.7" />
                  {/* Central tree */}
                  <rect x="2301" y="128" width="4" height="10" fill="#6b5a45" opacity="0.8" />
                  <circle cx="2303" cy="120" r="8" fill="#5a8a5a" opacity="0.7" />
                  <circle cx="2298" cy="123" r="5" fill="#4a7c2f" opacity="0.7" />
                  <circle cx="2308" cy="123" r="5" fill="#4a7c2f" opacity="0.7" />
                  {/* Shrubs */}
                  <ellipse cx="2280" cy="137" rx="5" ry="3" fill="#5a9a5a" opacity="0.6" />
                  <ellipse cx="2326" cy="137" rx="5" ry="3" fill="#5a9a5a" opacity="0.6" />
                  {/* Flowers */}
                  <circle cx="2295" cy="135" r="1.2" fill="#ff9999" opacity="0.7" />
                  <circle cx="2303" cy="133" r="1.5" fill="#ffcc66" opacity="0.7" />
                  <circle cx="2311" cy="135" r="1.2" fill="#cc99ff" opacity="0.7" />
                </g>

                {/* Bridge 2 over Park 2 - Roman columns + fully enclosed glass dome */}
                <g>
                  {/* Ornate Roman stone base with decorative moldings */}
                  <rect x="2736" y="145" width="86" height="13" fill="#d8d0c8" opacity="1" />
                  <rect x="2734" y="143" width="90" height="3" fill="#e8e0d8" opacity="1" />
                  {/* Base molding details */}
                  <rect x="2734" y="156" width="90" height="2" fill="#c8c0b8" opacity="1" />
                  <rect x="2736" y="158" width="86" height="1" fill="#b8b0a8" opacity="1" />
                  {/* Decorative dentil molding on base */}
                  {Array.from({length: 15}).map((_, d) => (
                    <rect key={`base-dentil2-${d}`} x={2738 + d * 5.5} y="154" width="3" height="2" fill="#b8b0a8" opacity="1" />
                  ))}
                  {/* Balustrade/railing on base */}
                  <rect x="2738" y="146" width="82" height="0.8" fill="#f0e8e0" opacity="1" />
                  {Array.from({length: 17}).map((_, b) => (
                    <rect key={`baluster2-${b}`} x={2740 + b * 4.7} y="146" width="1.5" height="8" fill="#e8e0d8" opacity="0.8" />
                  ))}

                  {/* Roman columns */}
                  <rect x="2738" y="125" width="6" height="20" fill="#d8d0c8" opacity="1" />
                  <rect x="2758" y="125" width="6" height="20" fill="#d8d0c8" opacity="1" />
                  <rect x="2794" y="125" width="6" height="20" fill="#d8d0c8" opacity="1" />
                  <rect x="2814" y="125" width="6" height="20" fill="#d8d0c8" opacity="1" />
                  {/* Column fluting */}
                  <line x1="2740" y1="127" x2="2740" y2="143" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="2742" y1="127" x2="2742" y2="143" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="2760" y1="127" x2="2760" y2="143" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="2762" y1="127" x2="2762" y2="143" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="2796" y1="127" x2="2796" y2="143" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="2798" y1="127" x2="2798" y2="143" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="2816" y1="127" x2="2816" y2="143" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="2818" y1="127" x2="2818" y2="143" stroke="#c8c0b8" strokeWidth="0.5" />
                  {/* Ornate column capitals */}
                  <rect x="2736" y="122" width="10" height="4" fill="#e8e0d8" opacity="1" />
                  <rect x="2756" y="122" width="10" height="4" fill="#e8e0d8" opacity="1" />
                  <rect x="2792" y="122" width="10" height="4" fill="#e8e0d8" opacity="1" />
                  <rect x="2812" y="122" width="10" height="4" fill="#e8e0d8" opacity="1" />
                  <ellipse cx="2741" cy="123" rx="2" ry="1" fill="#f0e8e0" opacity="1" />
                  <ellipse cx="2761" cy="123" rx="2" ry="1" fill="#f0e8e0" opacity="1" />
                  <ellipse cx="2797" cy="123" rx="2" ry="1" fill="#f0e8e0" opacity="1" />
                  <ellipse cx="2817" cy="123" rx="2" ry="1" fill="#f0e8e0" opacity="1" />
                  {/* Column bases with torus molding */}
                  <rect x="2736" y="143" width="10" height="3" fill="#c8c0b8" opacity="1" />
                  <rect x="2756" y="143" width="10" height="3" fill="#c8c0b8" opacity="1" />
                  <rect x="2792" y="143" width="10" height="3" fill="#c8c0b8" opacity="1" />
                  <rect x="2812" y="143" width="10" height="3" fill="#c8c0b8" opacity="1" />
                  <ellipse cx="2741" cy="144" rx="4" ry="1" fill="#d8d0c8" opacity="1" />
                  <ellipse cx="2761" cy="144" rx="4" ry="1" fill="#d8d0c8" opacity="1" />
                  <ellipse cx="2797" cy="144" rx="4" ry="1" fill="#d8d0c8" opacity="1" />
                  <ellipse cx="2817" cy="144" rx="4" ry="1" fill="#d8d0c8" opacity="1" />

                  {/* Roman arched framework */}
                  <path d="M 2744,122 Q 2744,108 2761,108 Q 2778,108 2779,100" stroke="#d8d0c8" strokeWidth="3" fill="none" opacity="1" />
                  <path d="M 2814,122 Q 2814,108 2797,108 Q 2780,108 2779,100" stroke="#d8d0c8" strokeWidth="3" fill="none" opacity="1" />

                  {/* Glass side panels between columns - fully enclosed */}
                  <rect x="2744" y="125" width="14" height="18" fill="#b8d4e8" opacity="0.2" />
                  <rect x="2800" y="125" width="14" height="18" fill="#b8d4e8" opacity="0.2" />
                  <line x1="2751" y1="125" x2="2751" y2="143" stroke="#a8c8d8" strokeWidth="0.5" opacity="0.5" />
                  <line x1="2807" y1="125" x2="2807" y2="143" stroke="#a8c8d8" strokeWidth="0.5" opacity="0.5" />
                  <line x1="2744" y1="134" x2="2758" y2="134" stroke="#a8c8d8" strokeWidth="0.4" opacity="0.4" />
                  <line x1="2800" y1="134" x2="2814" y2="134" stroke="#a8c8d8" strokeWidth="0.4" opacity="0.4" />

                  {/* Full glass dome with complete coverage */}
                  <path d="M 2741,122 Q 2741,88 2779,82 Q 2817,88 2817,122"
                        fill="#b8d4e8" opacity="0.3" />
                  <path d="M 2741,122 Q 2741,88 2779,82 Q 2817,88 2817,122"
                        stroke="#a8c8d8" strokeWidth="2" fill="none" opacity="0.7" />
                  {/* Additional glass panels for fuller coverage */}
                  <path d="M 2747,121 Q 2750,95 2779,87 Q 2808,95 2811,121" stroke="#a8c8d8" strokeWidth="1" fill="none" opacity="0.6" />
                  <path d="M 2753,120 Q 2758,98 2779,90 Q 2800,98 2805,120" stroke="#a8c8d8" strokeWidth="0.8" fill="none" opacity="0.5" />
                  <path d="M 2765,117 Q 2770,100 2779,95 Q 2788,100 2793,117" stroke="#a8c8d8" strokeWidth="0.6" fill="none" opacity="0.4" />
                  {/* More vertical mullions */}
                  <line x1="2750" y1="122" x2="2752" y2="92" stroke="#a8c8d8" strokeWidth="0.5" opacity="0.5" />
                  <line x1="2759" y1="122" x2="2762" y2="95" stroke="#a8c8d8" strokeWidth="0.6" opacity="0.5" />
                  <line x1="2769" y1="122" x2="2770" y2="88" stroke="#a8c8d8" strokeWidth="0.5" opacity="0.5" />
                  <line x1="2779" y1="122" x2="2779" y2="82" stroke="#a8c8d8" strokeWidth="0.8" opacity="0.6" />
                  <line x1="2789" y1="122" x2="2788" y2="88" stroke="#a8c8d8" strokeWidth="0.5" opacity="0.5" />
                  <line x1="2799" y1="122" x2="2796" y2="95" stroke="#a8c8d8" strokeWidth="0.6" opacity="0.5" />
                  <line x1="2808" y1="122" x2="2806" y2="92" stroke="#a8c8d8" strokeWidth="0.5" opacity="0.5" />
                  {/* Horizontal ring mullion */}
                  <path d="M 2748,107 Q 2763,104 2779,102 Q 2795,104 2810,107" stroke="#a8c8d8" strokeWidth="0.5" fill="none" opacity="0.4" />
                  {/* Glass reflections */}
                  <path d="M 2750,110 Q 2765,95 2778,88" stroke="#ffffff" strokeWidth="0.6" fill="none" opacity="0.5" />
                  <path d="M 2752,115 Q 2760,103 2768,95" stroke="#ffffff" strokeWidth="0.4" fill="none" opacity="0.3" />
                  <path d="M 2785,102 Q 2800,92 2810,88" stroke="#ffffff" strokeWidth="0.4" fill="none" opacity="0.3" />

                  {/* Ornate keystone */}
                  <ellipse cx="2779" cy="82" rx="6" ry="4" fill="#e8e0d8" opacity="1" />
                  <rect x="2775" y="79" width="8" height="4" fill="#f0e8e0" opacity="1" />
                  <circle cx="2779" cy="81" r="1.5" fill="#d8d0c8" opacity="1" />
                  <line x1="2776" y1="81" x2="2772" y2="81" stroke="#d8d0c8" strokeWidth="0.8" opacity="0.8" />
                  <line x1="2782" y1="81" x2="2786" y2="81" stroke="#d8d0c8" strokeWidth="0.8" opacity="0.8" />

                  {/* Indoor garden */}
                  <rect x="2758" y="135" width="3" height="8" fill="#6b5a45" opacity="0.8" />
                  <circle cx="2759.5" cy="130" r="6" fill="#4a7c2f" opacity="0.7" />
                  <rect x="2797" y="135" width="3" height="8" fill="#6b5a45" opacity="0.8" />
                  <circle cx="2798.5" cy="130" r="6" fill="#4a7c2f" opacity="0.7" />
                  {/* Central tree */}
                  <rect x="2777" y="132" width="4" height="11" fill="#6b5a45" opacity="0.8" />
                  <circle cx="2779" cy="123" r="9" fill="#5a8a5a" opacity="0.7" />
                  <circle cx="2773" cy="127" r="5" fill="#4a7c2f" opacity="0.7" />
                  <circle cx="2785" cy="127" r="5" fill="#4a7c2f" opacity="0.7" />
                  {/* Shrubs */}
                  <ellipse cx="2748" cy="142" rx="5" ry="3" fill="#5a9a5a" opacity="0.6" />
                  <ellipse cx="2810" cy="142" rx="5" ry="3" fill="#5a9a5a" opacity="0.6" />
                  {/* Flowers */}
                  <circle cx="2768" cy="140" r="1.2" fill="#cc99ff" opacity="0.7" />
                  <circle cx="2779" cy="138" r="1.5" fill="#ffcc66" opacity="0.7" />
                  <circle cx="2790" cy="140" r="1.2" fill="#ff9999" opacity="0.7" />
                </g>

                {/* Bridge 3 over Park 3 - Roman columns + fully enclosed glass dome */}
                <g>
                  {/* Ornate Roman stone base with decorative moldings */}
                  <rect x="3362" y="143" width="78" height="12" fill="#d8d0c8" opacity="1" />
                  <rect x="3360" y="141" width="82" height="3" fill="#e8e0d8" opacity="1" />
                  {/* Base molding details */}
                  <rect x="3360" y="153" width="82" height="2" fill="#c8c0b8" opacity="1" />
                  <rect x="3362" y="155" width="78" height="1" fill="#b8b0a8" opacity="1" />
                  {/* Decorative dentil molding on base */}
                  {Array.from({length: 13}).map((_, d) => (
                    <rect key={`base-dentil3-${d}`} x={3364 + d * 5.5} y="151" width="3" height="2" fill="#b8b0a8" opacity="1" />
                  ))}
                  {/* Balustrade/railing on base */}
                  <rect x="3364" y="144" width="74" height="0.8" fill="#f0e8e0" opacity="1" />
                  {Array.from({length: 15}).map((_, b) => (
                    <rect key={`baluster3-${b}`} x={3366 + b * 4.7} y="144" width="1.5" height="8" fill="#e8e0d8" opacity="0.8" />
                  ))}

                  {/* Roman columns */}
                  <rect x="3364" y="122" width="6" height="21" fill="#d8d0c8" opacity="1" />
                  <rect x="3384" y="122" width="6" height="21" fill="#d8d0c8" opacity="1" />
                  <rect x="3410" y="122" width="6" height="21" fill="#d8d0c8" opacity="1" />
                  <rect x="3430" y="122" width="6" height="21" fill="#d8d0c8" opacity="1" />
                  {/* Column fluting */}
                  <line x1="3366" y1="124" x2="3366" y2="141" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="3368" y1="124" x2="3368" y2="141" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="3386" y1="124" x2="3386" y2="141" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="3388" y1="124" x2="3388" y2="141" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="3412" y1="124" x2="3412" y2="141" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="3414" y1="124" x2="3414" y2="141" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="3432" y1="124" x2="3432" y2="141" stroke="#c8c0b8" strokeWidth="0.5" />
                  <line x1="3434" y1="124" x2="3434" y2="141" stroke="#c8c0b8" strokeWidth="0.5" />
                  {/* Ornate column capitals */}
                  <rect x="3362" y="119" width="10" height="4" fill="#e8e0d8" opacity="1" />
                  <rect x="3382" y="119" width="10" height="4" fill="#e8e0d8" opacity="1" />
                  <rect x="3408" y="119" width="10" height="4" fill="#e8e0d8" opacity="1" />
                  <rect x="3428" y="119" width="10" height="4" fill="#e8e0d8" opacity="1" />
                  <ellipse cx="3367" cy="120" rx="2" ry="1" fill="#f0e8e0" opacity="1" />
                  <ellipse cx="3387" cy="120" rx="2" ry="1" fill="#f0e8e0" opacity="1" />
                  <ellipse cx="3413" cy="120" rx="2" ry="1" fill="#f0e8e0" opacity="1" />
                  <ellipse cx="3433" cy="120" rx="2" ry="1" fill="#f0e8e0" opacity="1" />
                  {/* Column bases with torus molding */}
                  <rect x="3362" y="141" width="10" height="3" fill="#c8c0b8" opacity="1" />
                  <rect x="3382" y="141" width="10" height="3" fill="#c8c0b8" opacity="1" />
                  <rect x="3408" y="141" width="10" height="3" fill="#c8c0b8" opacity="1" />
                  <rect x="3428" y="141" width="10" height="3" fill="#c8c0b8" opacity="1" />
                  <ellipse cx="3367" cy="142" rx="4" ry="1" fill="#d8d0c8" opacity="1" />
                  <ellipse cx="3387" cy="142" rx="4" ry="1" fill="#d8d0c8" opacity="1" />
                  <ellipse cx="3413" cy="142" rx="4" ry="1" fill="#d8d0c8" opacity="1" />
                  <ellipse cx="3433" cy="142" rx="4" ry="1" fill="#d8d0c8" opacity="1" />

                  {/* Roman arched framework */}
                  <path d="M 3370,119 Q 3370,102 3387,102 Q 3400,102 3401,95" stroke="#d8d0c8" strokeWidth="3" fill="none" opacity="1" />
                  <path d="M 3432,119 Q 3432,102 3415,102 Q 3402,102 3401,95" stroke="#d8d0c8" strokeWidth="3" fill="none" opacity="1" />

                  {/* Glass side panels between columns - fully enclosed */}
                  <rect x="3370" y="122" width="14" height="19" fill="#b8d4e8" opacity="0.2" />
                  <rect x="3416" y="122" width="14" height="19" fill="#b8d4e8" opacity="0.2" />
                  <line x1="3377" y1="122" x2="3377" y2="141" stroke="#a8c8d8" strokeWidth="0.5" opacity="0.5" />
                  <line x1="3423" y1="122" x2="3423" y2="141" stroke="#a8c8d8" strokeWidth="0.5" opacity="0.5" />
                  <line x1="3370" y1="131" x2="3384" y2="131" stroke="#a8c8d8" strokeWidth="0.4" opacity="0.4" />
                  <line x1="3416" y1="131" x2="3430" y2="131" stroke="#a8c8d8" strokeWidth="0.4" opacity="0.4" />

                  {/* Full glass dome with complete coverage */}
                  <path d="M 3367,119 Q 3367,80 3401,75 Q 3435,80 3435,119"
                        fill="#b8d4e8" opacity="0.3" />
                  <path d="M 3367,119 Q 3367,80 3401,75 Q 3435,80 3435,119"
                        stroke="#a8c8d8" strokeWidth="2" fill="none" opacity="0.7" />
                  {/* Additional glass panels for fuller coverage */}
                  <path d="M 3373,118 Q 3376,90 3401,82 Q 3426,90 3429,118" stroke="#a8c8d8" strokeWidth="1" fill="none" opacity="0.6" />
                  <path d="M 3379,117 Q 3385,92 3401,84 Q 3417,92 3423,117" stroke="#a8c8d8" strokeWidth="0.8" fill="none" opacity="0.5" />
                  <path d="M 3391,114 Q 3395,95 3401,90 Q 3407,95 3411,114" stroke="#a8c8d8" strokeWidth="0.6" fill="none" opacity="0.4" />
                  {/* More vertical mullions */}
                  <line x1="3375" y1="119" x2="3377" y2="88" stroke="#a8c8d8" strokeWidth="0.5" opacity="0.5" />
                  <line x1="3385" y1="119" x2="3388" y2="90" stroke="#a8c8d8" strokeWidth="0.6" opacity="0.5" />
                  <line x1="3393" y1="119" x2="3394" y2="84" stroke="#a8c8d8" strokeWidth="0.5" opacity="0.5" />
                  <line x1="3401" y1="119" x2="3401" y2="75" stroke="#a8c8d8" strokeWidth="0.8" opacity="0.6" />
                  <line x1="3409" y1="119" x2="3408" y2="84" stroke="#a8c8d8" strokeWidth="0.5" opacity="0.5" />
                  <line x1="3417" y1="119" x2="3414" y2="90" stroke="#a8c8d8" strokeWidth="0.6" opacity="0.5" />
                  <line x1="3427" y1="119" x2="3425" y2="88" stroke="#a8c8d8" strokeWidth="0.5" opacity="0.5" />
                  {/* Horizontal ring mullion */}
                  <path d="M 3374,102 Q 3387,99 3401,97 Q 3415,99 3428,102" stroke="#a8c8d8" strokeWidth="0.5" fill="none" opacity="0.4" />
                  {/* Glass reflections */}
                  <path d="M 3375,105 Q 3390,90 3400,82" stroke="#ffffff" strokeWidth="0.6" fill="none" opacity="0.5" />
                  <path d="M 3377,110 Q 3385,98 3393,90" stroke="#ffffff" strokeWidth="0.4" fill="none" opacity="0.3" />
                  <path d="M 3408,98 Q 3420,88 3428,82" stroke="#ffffff" strokeWidth="0.4" fill="none" opacity="0.3" />

                  {/* Ornate keystone */}
                  <ellipse cx="3401" cy="75" rx="6" ry="4" fill="#e8e0d8" opacity="1" />
                  <rect x="3397" y="72" width="8" height="4" fill="#f0e8e0" opacity="1" />
                  <circle cx="3401" cy="74" r="1.5" fill="#d8d0c8" opacity="1" />
                  <line x1="3398" y1="74" x2="3394" y2="74" stroke="#d8d0c8" strokeWidth="0.8" opacity="0.8" />
                  <line x1="3404" y1="74" x2="3408" y2="74" stroke="#d8d0c8" strokeWidth="0.8" opacity="0.8" />

                  {/* Indoor garden */}
                  <rect x="3383" y="132" width="3" height="9" fill="#6b5a45" opacity="0.8" />
                  <circle cx="3384.5" cy="126" r="7" fill="#4a7c2f" opacity="0.7" />
                  <circle cx="3380" cy="129" r="4" fill="#5a8a5a" opacity="0.7" />
                  <rect x="3415" y="132" width="3" height="9" fill="#6b5a45" opacity="0.8" />
                  <circle cx="3416.5" cy="126" r="7" fill="#4a7c2f" opacity="0.7" />
                  <circle cx="3421" cy="129" r="4" fill="#5a8a5a" opacity="0.7" />
                  {/* Central tree */}
                  <rect x="3399" y="128" width="4" height="13" fill="#6b5a45" opacity="0.8" />
                  <circle cx="3401" cy="118" r="10" fill="#5a8a5a" opacity="0.7" />
                  <circle cx="3394" cy="122" r="6" fill="#4a7c2f" opacity="0.7" />
                  <circle cx="3408" cy="122" r="6" fill="#4a7c2f" opacity="0.7" />
                  <circle cx="3401" cy="112" r="5" fill="#6a9a6a" opacity="0.7" />
                  {/* Shrubs */}
                  <ellipse cx="3372" cy="140" rx="5" ry="3" fill="#5a9a5a" opacity="0.6" />
                  <ellipse cx="3430" cy="140" rx="5" ry="3" fill="#5a9a5a" opacity="0.6" />
                  {/* Flowers */}
                  <circle cx="3393" cy="138" r="1.2" fill="#ff9999" opacity="0.7" />
                  <circle cx="3401" cy="135" r="1.5" fill="#66ccff" opacity="0.7" />
                  <circle cx="3409" cy="138" r="1.2" fill="#cc99ff" opacity="0.7" />
                </g>
              </g>

              {/* Variety of trees and bushes along the roadway in the grass */}
              {/* Skip vegetation in park areas: Park 1 (2268-2338), Park 2 (2736-2822), Park 3 (3362-3436) */}
              <g opacity="1">
                {Array.from({length: 50}).map((_, i) => {
                  const x = 2025 + i * 36;

                  // Skip areas that would overlap with parks
                  if ((x >= 2260 && x <= 2345) || (x >= 2728 && x <= 2830) || (x >= 3355 && x <= 3445)) {
                    return null;
                  }

                  // Variety pattern: 0=tall tree, 1=medium tree, 2=round bush, 3=small bush
                  const plantType = [0, 2, 1, 3, 0, 3, 2, 1, 0, 2, 3, 1, 0, 2, 1, 3, 0, 3, 2, 1, 0, 2, 3, 1, 0, 2, 1, 3, 0, 3, 2, 1, 0, 2, 3, 1, 0, 2, 1, 3, 0, 3, 2, 1, 0, 2, 3, 1, 0, 2][i % 50];
                  // Position in grass area (y=214-218 is grass by street)
                  const baseY = 214;

                  if (plantType === 0) {
                    // Tall tree
                    return (
                      <g key={`plant-${i}`}>
                        <rect x={x} y={baseY - 10} width="2.5" height="12" fill="#6b5a45" opacity="1" />
                        <circle cx={x+1.25} cy={baseY - 12} r="5" fill="#4a7c2f" opacity="1" />
                        <circle cx={x-2} cy={baseY - 10} r="4" fill="#5a8a5a" opacity="1" />
                        <circle cx={x+4.5} cy={baseY - 10} r="4" fill="#5a8a5a" opacity="1" />
                        <circle cx={x+1.25} cy={baseY - 16} r="3" fill="#6a9a6a" opacity="1" />
                      </g>
                    );
                  } else if (plantType === 1) {
                    // Medium tree
                    return (
                      <g key={`plant-${i}`}>
                        <rect x={x} y={baseY - 7} width="2" height="9" fill="#6b5a45" opacity="1" />
                        <circle cx={x+1} cy={baseY - 9} r="4" fill="#4a7c2f" opacity="1" />
                        <circle cx={x-1.5} cy={baseY - 7} r="3" fill="#5a8a5a" opacity="1" />
                        <circle cx={x+3.5} cy={baseY - 7} r="3" fill="#5a8a5a" opacity="1" />
                      </g>
                    );
                  } else if (plantType === 2) {
                    // Round bush
                    return (
                      <g key={`plant-${i}`}>
                        <circle cx={x+1} cy={baseY - 2} r="4" fill="#3a7a3a" opacity="1" />
                        <circle cx={x-1} cy={baseY - 1} r="3" fill="#4a8a4a" opacity="1" />
                        <circle cx={x+3} cy={baseY - 1} r="3" fill="#4a8a4a" opacity="1" />
                        <circle cx={x+1} cy={baseY - 4} r="2.5" fill="#5a9a5a" opacity="1" />
                      </g>
                    );
                  } else {
                    // Small bush/shrub
                    return (
                      <g key={`plant-${i}`}>
                        <ellipse cx={x+1} cy={baseY - 1} rx="3" ry="2" fill="#3a6a3a" opacity="1" />
                        <circle cx={x-0.5} cy={baseY - 2} r="2" fill="#4a7a4a" opacity="1" />
                        <circle cx={x+2.5} cy={baseY - 2} r="2" fill="#4a7a4a" opacity="1" />
                      </g>
                    );
                  }
                })}
              </g>

              {/* Electric cars/bikes on streets - cleaner design */}
              <g opacity="1">
                {Array.from({length: 20}).map((_, i) => (
                  <g key={`e-vehicle-${i}`}>
                    {/* Simple car shape */}
                    <rect x={2095 + i * 90} y="225" width="10" height="4" rx="1" fill="#5a8a5a" />
                    <rect x={2097 + i * 90} y="223" width="6" height="3" rx="1" fill="#5a8a5a" />
                  </g>
                ))}
              </g>

              {/* Street furniture: Benches */}
              <g opacity="1">
                {[2080, 2280, 2480, 2680, 2880, 3080, 3280, 3480, 3680].map((x, i) => (
                  <g key={`bench-${i}`}>
                    {/* Bench seat */}
                    <rect x={x} y="213" width="12" height="2" fill="#8b7355" opacity="1" />
                    {/* Bench back */}
                    <rect x={x} y="209" width="12" height="4" fill="#8b7355" opacity="1" />
                    {/* Bench legs */}
                    <rect x={x+2} y="215" width="1" height="3" fill="#6b5a45" opacity="1" />
                    <rect x={x+9} y="215" width="1" height="3" fill="#6b5a45" opacity="1" />
                  </g>
                ))}
              </g>

              {/* Planters with flowers and greenery */}
              <g opacity="1">
                {[2140, 2340, 2540, 2740, 2940, 3140, 3340, 3540, 3740].map((x, i) => (
                  <g key={`planter-${i}`}>
                    {/* Planter box */}
                    <rect x={x} y="211" width="16" height="7" fill="#8b7355" opacity="1" />
                    {/* Flowers/plants */}
                    <circle cx={x+3} cy="210" r="1.5" fill="#ff69b4" opacity="1" />
                    <circle cx={x+6} cy="209" r="1.5" fill="#ffd700" opacity="1" />
                    <circle cx={x+9} cy="210" r="1.5" fill="#9b59b6" opacity="1" />
                    <circle cx={x+12} cy="209" r="1.5" fill="#ff69b4" opacity="1" />
                    {/* Greenery */}
                    <rect x={x+4} y="212" width="1" height="4" fill="#4a7c2f" opacity="1" />
                    <rect x={x+8} y="212" width="1" height="5" fill="#4a7c2f" opacity="1" />
                    <rect x={x+11} y="212" width="1" height="4" fill="#4a7c2f" opacity="1" />
                  </g>
                ))}
              </g>

              {/* Pedestrians walking */}
              <g opacity="1">
                {[2050, 2200, 2350, 2500, 2650, 2800, 2950, 3100, 3250, 3400, 3550, 3700].map((x, i) => (
                  <g key={`ped-${i}`}>
                    {/* Person body */}
                    <ellipse cx={x} cy="213" rx="2" ry="3" fill={i % 3 === 0 ? "#5a7a8a" : i % 3 === 1 ? "#8a6a5a" : "#6a5a7a"} opacity="1" />
                    {/* Person head */}
                    <circle cx={x} cy="209" r="1.5" fill="#d4a574" opacity="1" />
                    {/* Person legs */}
                    <rect x={x-1} y="216" width="0.8" height="2.5" fill={i % 3 === 0 ? "#4a5a6a" : i % 3 === 1 ? "#6a5a4a" : "#5a4a6a"} opacity="1" />
                    <rect x={x+0.2} y="216" width="0.8" height="2.5" fill={i % 3 === 0 ? "#4a5a6a" : i % 3 === 1 ? "#6a5a4a" : "#5a4a6a"} opacity="1" />
                  </g>
                ))}
              </g>

              {/* Cyclists riding bikes */}
              <g opacity="1">
                {[2120, 2320, 2520, 2720, 2920, 3120, 3320, 3520, 3720].map((x, i) => (
                  <g key={`cyclist-${i}`}>
                    {/* Bike frame */}
                    <path d={`M ${x},214 L ${x+4},214 L ${x+2},210 Z`} stroke="#4a7c2f" strokeWidth="1" fill="none" opacity="1" />
                    {/* Wheels */}
                    <circle cx={x} cy="216" r="2" fill="none" stroke="#2f2f2f" strokeWidth="0.8" opacity="1" />
                    <circle cx={x+4} cy="216" r="2" fill="none" stroke="#2f2f2f" strokeWidth="0.8" opacity="1" />
                    {/* Cyclist body */}
                    <ellipse cx={x+2} cy="211" rx="1.5" ry="2" fill={i % 2 === 0 ? "#5a8a5a" : "#7a6a5a"} opacity="1" />
                    {/* Cyclist head */}
                    <circle cx={x+2} cy="208" r="1.2" fill="#d4a574" opacity="1" />
                    {/* Helmet */}
                    <ellipse cx={x+2} cy="207.5" rx="1.4" ry="1" fill={i % 2 === 0 ? "#4a7c2f" : "#c73e3e"} opacity="1" />
                  </g>
                ))}
              </g>

              {/* ========== VERTICAL BOUNDARY: Green City → Rural (x=3800) ========== */}
              <g opacity="1">
                {/* White picket fence border */}
                {Array.from({length: 20}).map((_, i) => (
                  <g key={`boundary-fence-3-${i}`}>
                    {/* Picket */}
                    <rect x="3798" y={195 + i * 3} width="4" height="10" fill="#f5f5f5" />
                    {/* Pointed top */}
                    <path d={`M 3798,${195 + i * 3} L 3800,${192 + i * 3} L 3802,${195 + i * 3} Z`} fill="#f5f5f5" />
                  </g>
                ))}
                {/* Horizontal rails */}
                <rect x="3798" y="200" width="4" height="2" fill="#f5f5f5" />
                <rect x="3798" y="210" width="4" height="2" fill="#f5f5f5" />
                <rect x="3798" y="220" width="4" height="2" fill="#f5f5f5" />
              </g>

              {/* ========== PHASE 4: RETURN TO RURAL - IDENTICAL TO OPENING (3800-5000) ========== */}
              {/* This creates a SEAMLESS LOOP back to the start */}

              {/* Rolling hills - smooth gradual emergence from city buffer (WIDE BUFFER: 3800-3900) */}
              <path d="M 3800,203 Q 3900,198 4000,200 Q 4100,215 4200,200 Q 4300,190 4400,200 Q 4500,205 4600,195 Q 4700,200 4800,205 Q 4900,195 5000,210 L 5000,250 L 3800,250 Z"
                    fill="#7aa87a" opacity="1" />
              <path d="M 3800,202 Q 3900,197 4000,198 Q 4100,208 4200,195 Q 4300,185 4400,195 Q 4500,203 4600,190 Q 4700,185 4800,192 Q 4900,188 5000,205 L 5000,250 L 3800,250 Z"
                    fill="#8ab88a" opacity="1" />

              {/* White picket fences along road - protecting animals - CONTINUOUS */}
              <g>
                {/* Continuous fence from 3800 to 5000 */}
                {Array.from({length: 150}).map((_, i) => (
                  <g key={`picket-end-${i}`}>
                    <rect x={3800 + i * 8} y="225" width="2" height="10" fill="#f5f5f5" opacity="1" />
                    <path d={`M ${3800 + i * 8},225 L ${3800 + i * 8 + 1},223 L ${3800 + i * 8 + 2},225 Z`} fill="#f5f5f5" opacity="1" />
                  </g>
                ))}
                {/* Horizontal rails spanning entire length */}
                <rect x="3800" y="228" width="1200" height="1.5" fill="#f5f5f5" opacity="1" />
                <rect x="3800" y="232" width="1200" height="1.5" fill="#f5f5f5" opacity="1" />
              </g>

              {/* Red barns - matching opening, extended (1/3 LARGER) */}
              <g>
                {/* Barn 1 - Large */}
                <rect x="3970" y="178" width="43" height="27" fill="#c73e3e" opacity="1" />
                <path d="M 3965,178 L 3991.5,158 L 4018,178 Z" fill="#a83232" opacity="1" />
                <rect x="3986" y="189" width="11" height="16" fill="#6d4428" opacity="1" />
                <rect x="4017" y="170" width="11" height="35" fill="#d4d4d4" opacity="1" />
                <ellipse cx="4022.5" cy="170" rx="5.5" ry="2.5" fill="#b8b8b8" opacity="1" />
                {/* Detail: wood planks */}
                <path d="M 3972,185 L 4012,185 M 3972,192 L 4012,192 M 3972,199 L 4012,199" stroke="#a83232" strokeWidth="0.5" opacity="1" />

                {/* Barn 2 - Medium */}
                <rect x="4242" y="182" width="32" height="20" fill="#c73e3e" opacity="1" />
                <path d="M 4238,182 L 4258,166 L 4278,182 Z" fill="#a83232" opacity="1" />
                <rect x="4252" y="189" width="8" height="13" fill="#6d4428" opacity="1" />
                {/* Detail: window */}
                <rect x="4244" y="185" width="4" height="4" fill="#4a4a4a" opacity="1" />
                <rect x="4268" y="185" width="4" height="4" fill="#4a4a4a" opacity="1" />

                {/* Barn 3 - Small-Medium */}
                <rect x="4442" y="185" width="27" height="17" fill="#c73e3e" opacity="1" />
                <path d="M 4439,185 L 4455.5,172 L 4472,185 Z" fill="#a83232" opacity="1" />
                <rect x="4450" y="190" width="7" height="12" fill="#6d4428" opacity="1" />

                {/* Barn 4 - Large */}
                <rect x="4672" y="178" width="37" height="24" fill="#c73e3e" opacity="1" />
                <path d="M 4668,178 L 4690.5,162 L 4713,178 Z" fill="#a83232" opacity="1" />
                <rect x="4684" y="187" width="9" height="15" fill="#6d4428" opacity="1" />
                <rect x="4713" y="173" width="9" height="29" fill="#d4d4d4" opacity="1" />
                <ellipse cx="4717.5" cy="173" rx="4.5" ry="2.2" fill="#b8b8b8" opacity="1" />
                {/* Detail: X on door */}
                <path d="M 4684,187 L 4693,202 M 4693,187 L 4684,202" stroke="#5a3a2a" strokeWidth="0.8" opacity="1" />

                {/* Barn 5 - Medium */}
                <rect x="4892" y="183" width="29" height="19" fill="#c73e3e" opacity="1" />
                <path d="M 4889,183 L 4906.5,170 L 4924,183 Z" fill="#a83232" opacity="1" />
                <rect x="4901" y="189" width="8" height="13" fill="#6d4428" opacity="1" />
              </g>

              {/* Farmhouses */}
              <g>
                <rect x="4080" y="195" width="18" height="10" fill="#f0e6d3" opacity="1" />
                <path d="M 4078,195 L 4089,188 L 4100,195 Z" fill="#8b5a3c" opacity="1" />
                <rect x="4085" y="198" width="3" height="7" fill="#6d4428" opacity="1" />

                <rect x="4360" y="197" width="16" height="8" fill="#e8d4b8" opacity="1" />
                <path d="M 4358,197 L 4368,191 L 4378,197 Z" fill="#6b5a45" opacity="1" />
                <rect x="4365" y="199" width="3" height="6" fill="#6d4428" opacity="1" />

                <rect x="4620" y="196" width="17" height="9" fill="#f0e6d3" opacity="1" />
                <path d="M 4618,196 L 4628.5,190 L 4639,196 Z" fill="#8b5a3c" opacity="1" />
                <rect x="4626" y="199" width="3" height="6" fill="#6d4428" opacity="1" />

                <rect x="4850" y="198" width="15" height="7" fill="#e8d4b8" opacity="1" />
                <path d="M 4848,198 L 4857.5,193 L 4867,198 Z" fill="#6b5a45" opacity="1" />
                <rect x="4855" y="200" width="3" height="5" fill="#6d4428" opacity="1" />
              </g>

              {/* Trees */}
              <g>
                {[3860, 3910, 3965, 4120, 4210, 4290, 4410, 4490, 4550, 4640, 4720, 4790, 4880, 4960].map((x, i) => (
                  <g key={`tree-end-${i}`} opacity="1">
                    <rect x={x} y="195" width="3" height="10" fill="#6b5a45" />
                    <circle cx={x+1.5} cy="192" r="7" fill="#5a8a5a" opacity="1" />
                    <circle cx={x-2} cy="194" r="5" fill="#6a9a6a" opacity="1" />
                    <circle cx={x+5} cy="194" r="5" fill="#6a9a6a" opacity="1" />
                  </g>
                ))}
              </g>

              {/* Hay bales */}
              <g>
                {[4150, 4220, 4420, 4480, 4670, 4760, 4920].map((x, i) => (
                  <g key={`hay-end-${i}`} opacity="1">
                    <ellipse cx={x} cy="205" rx="5" ry="3" fill="#d4a574" />
                    <ellipse cx={x} cy="203" rx="4" ry="2" fill="#c9995f" />
                  </g>
                ))}
              </g>

              {/* Tractors */}
              <g>
                {[4050, 4350, 4750, 4950].map((x, i) => (
                  <g key={`tractor-end-${i}`} opacity="1">
                    <rect x={x} y="198" width="18" height="8" rx="1" fill="#4a7c2f" />
                    <rect x={x+12} y="196" width="6" height="4" rx="0.5" fill="#3d6928" />
                    <rect x={x+4} y="194" width="6" height="5" rx="0.5" fill="#5a8a3f" />
                    <circle cx={x+4} cy="206" r="4" fill="#2f2f2f" />
                    <circle cx={x+15} cy="204" r="2.5" fill="#2f2f2f" />
                  </g>
                ))}
              </g>

              {/* FARM ANIMALS - matching opening rural biome */}

              {/* Horses in the fields - DETAILED AND RECOGNIZABLE! */}
              <g>
                {[3920, 4120, 4220, 4380, 4480, 4560].map((x, i) => {
                  const yOffsets = [3, -4, 1, -2, 4, 0]; // Varied depths
                  return (
                  <g key={`horse-end-${i}`} transform={`translate(0, ${yOffsets[i]})`} className="animal-horse" opacity="1" style={{animationDelay: `${i * 0.3}s`}}>
                    {/* Main body - larger and more defined */}
                    <ellipse cx={x} cy="200" rx="10" ry="6" fill="#654321" />

                    {/* Chest/shoulder area */}
                    <ellipse cx={x+6} cy="200" rx="5" ry="6" fill="#7a5230" />

                    {/* Neck - connecting body to head */}
                    <path d={`M ${x+8},198 L ${x+11},195 L ${x+10},200 Z`} fill="#654321" />

                    {/* Horse head - defined and forward-facing */}
                    <ellipse cx={x+13} cy="195" rx="3.5" ry="4.5" fill="#654321" />

                    {/* Snout/muzzle - lighter color */}
                    <ellipse cx={x+15} cy="196" rx="2" ry="2.5" fill="#8b6f47" />

                    {/* Ears - two visible ears */}
                    <path d={`M ${x+12},191 L ${x+11},188 L ${x+13},190 Z`} fill="#654321" />
                    <path d={`M ${x+14},191 L ${x+15},188 L ${x+13.5},190 Z`} fill="#654321" />

                    {/* Eye - large and visible */}
                    <circle cx={x+13} cy="194" r="1" fill="#2f2f2f" />
                    <circle cx={x+13.3} cy="193.7" r="0.4" fill="#ffffff" opacity="1" />

                    {/* Nostril */}
                    <circle cx={x+15.5} cy="197" r="0.5" fill="#4a3520" />

                    {/* Front legs - clearly separated */}
                    <rect x={x+3} y="206" width="2" height="6" fill="#654321" />
                    <rect x={x+7} y="206" width="2" height="6" fill="#7a5230" />
                    {/* Hooves on front legs */}
                    <rect x={x+3} y="211" width="2" height="1" fill="#2f2f2f" />
                    <rect x={x+7} y="211" width="2" height="1" fill="#2f2f2f" />

                    {/* Back legs - clearly separated */}
                    <rect x={x-5} y="206" width="2" height="6" fill="#654321" />
                    <rect x={x-1} y="206" width="2" height="6" fill="#7a5230" />
                    {/* Hooves on back legs */}
                    <rect x={x-5} y="211" width="2" height="1" fill="#2f2f2f" />
                    <rect x={x-1} y="211" width="2" height="1" fill="#2f2f2f" />

                    {/* Tail - flowing and detailed */}
                    <path d={`M ${x-10},199 Q ${x-13},201 ${x-14},205 Q ${x-13},208 ${x-11},207`}
                          stroke="#4a3520" strokeWidth="2" fill="none" />

                    {/* Mane - flowing down neck */}
                    <path d={`M ${x+11},192 Q ${x+9},193 ${x+7},195 Q ${x+5},196 ${x+3},197`}
                          stroke="#4a3520" strokeWidth="1.5" fill="none" />
                    <path d={`M ${x+10},193 Q ${x+8},194 ${x+6},196`}
                          stroke="#4a3520" strokeWidth="1.2" fill="none" />
                  </g>
                  );
                })}
              </g>

              {/* Cows grazing - DETAILED AND RECOGNIZABLE! */}
              <g>
                {[4030, 4190, 4310, 4440].map((x, i) => {
                  const yOffsets = [-2, 3, -4, 2]; // Varied depths
                  return (
                  <g key={`cow-end-${i}`} transform={`translate(0, ${yOffsets[i]})`} className="animal-cow" opacity="1" style={{animationDelay: `${i * 0.5}s`}}>
                    {/* Main cow body - large and boxy */}
                    <rect x={x-8} y="197" width="16" height="8" rx="2" fill="#f5f5f5" />

                    {/* Udder underneath */}
                    <ellipse cx={x} cy="205" rx="3" ry="2" fill="#ffb6c1" />

                    {/* Black spots - multiple and prominent */}
                    <ellipse cx={x-5} cy="199" rx="2.5" ry="2" fill="#2f2f2f" />
                    <ellipse cx={x+2} cy="198" rx="3" ry="2.5" fill="#2f2f2f" />
                    <ellipse cx={x-2} cy="202" rx="2" ry="1.5" fill="#2f2f2f" />
                    <ellipse cx={x+5} cy="201" rx="2.5" ry="2" fill="#2f2f2f" />

                    {/* Neck */}
                    <rect x={x-9} y="194" width="3" height="5" rx="1" fill="#f5f5f5" />

                    {/* Cow head - defined and forward-facing */}
                    <ellipse cx={x-10} cy="195" rx="3.5" ry="4" fill="#f5f5f5" />

                    {/* Spot on head */}
                    <ellipse cx={x-11} cy="194" rx="1.5" ry="1.5" fill="#2f2f2f" />

                    {/* Snout/muzzle - pink */}
                    <ellipse cx={x-12} cy="197" rx="2" ry="2.5" fill="#ffb6c1" />

                    {/* Nostrils */}
                    <circle cx={x-12.5} cy="196.5" r="0.4" fill="#2f2f2f" />
                    <circle cx={x-11.5} cy="196.5" r="0.4" fill="#2f2f2f" />

                    {/* Horns - curved upward */}
                    <path d={`M ${x-11},191 Q ${x-12},189 ${x-13},188`} stroke="#8a7a6a" strokeWidth="1.2" fill="none" />
                    <path d={`M ${x-9},191 Q ${x-8},189 ${x-7},188`} stroke="#8a7a6a" strokeWidth="1.2" fill="none" />

                    {/* Ears - floppy */}
                    <ellipse cx={x-12} cy="192" rx="1.5" ry="1" fill="#e8e8e8" transform={`rotate(-30 ${x-12} 192)`} />
                    <ellipse cx={x-8} cy="192" rx="1.5" ry="1" fill="#e8e8e8" transform={`rotate(30 ${x-8} 192)`} />

                    {/* Eye - large and visible */}
                    <circle cx={x-10} cy="194" r="1" fill="#2f2f2f" />
                    <circle cx={x-9.7} cy="193.7" r="0.4" fill="#ffffff" opacity="1" />

                    {/* Front legs - clearly separated */}
                    <rect x={x-5} y="205" width="2" height="7" rx="1" fill="#e8e8e8" />
                    <rect x={x-1} y="205" width="2" height="7" rx="1" fill="#e8e8e8" />
                    {/* Hooves on front legs */}
                    <rect x={x-5} y="211" width="2" height="1" fill="#2f2f2f" />
                    <rect x={x-1} y="211" width="2" height="1" fill="#2f2f2f" />

                    {/* Back legs - clearly separated */}
                    <rect x={x+2} y="205" width="2" height="7" rx="1" fill="#e8e8e8" />
                    <rect x={x+6} y="205" width="2" height="7" rx="1" fill="#e8e8e8" />
                    {/* Hooves on back legs */}
                    <rect x={x+2} y="211" width="2" height="1" fill="#2f2f2f" />
                    <rect x={x+6} y="211" width="2" height="1" fill="#2f2f2f" />

                    {/* Tail - hanging down with tuft */}
                    <path d={`M ${x+8},199 L ${x+10},205`} stroke="#f5f5f5" strokeWidth="1.5" />
                    <ellipse cx={x+10} cy="206" rx="1.5" ry="2" fill="#2f2f2f" />
                  </g>
                  );
                })}
              </g>

              {/* Sheep grazing - FLUFFY AND RECOGNIZABLE! */}
              <g>
                {[3960, 4090, 4270, 4390, 4500].map((x, i) => {
                  const yOffsets = [4, -3, 2, -1, 3]; // Varied depths
                  return (
                  <g key={`sheep-end-${i}`} transform={`translate(0, ${yOffsets[i]})`} className="animal-sheep" opacity="1" style={{animationDelay: `${i * 0.4}s`}}>
                    {/* Fluffy wool body - multiple overlapping circles for texture */}
                    <circle cx={x} cy="203" r="4.5" fill="#f5f5f5" />
                    <circle cx={x-3} cy="202" r="3.5" fill="#f5f5f5" />
                    <circle cx={x+3} cy="202" r="3.5" fill="#f5f5f5" />
                    <circle cx={x-1} cy="205" r="3" fill="#f5f5f5" />
                    <circle cx={x+2} cy="205" r="3" fill="#f5f5f5" />
                    <circle cx={x} cy="200" r="3" fill="#f5f5f5" />

                    {/* Wool texture - smaller accent circles */}
                    <circle cx={x-2} cy="201" r="1.5" fill="#e8e8e8" />
                    <circle cx={x+1} cy="203" r="1.5" fill="#e8e8e8" />
                    <circle cx={x+3} cy="200" r="1.2" fill="#e8e8e8" />

                    {/* Black sheep face and head - clearly defined */}
                    <ellipse cx={x-6} cy="201" rx="2.5" ry="3" fill="#2f2f2f" />

                    {/* Ears - sticking up */}
                    <ellipse cx={x-7} cy="199" rx="1" ry="1.5" fill="#2f2f2f" />
                    <ellipse cx={x-5} cy="199" rx="1" ry="1.5" fill="#2f2f2f" />

                    {/* Eyes - visible white with black pupils */}
                    <circle cx={x-6.5} cy="201" r="0.6" fill="#ffffff" />
                    <circle cx={x-6.5} cy="201" r="0.3" fill="#2f2f2f" />

                    {/* Nose/snout */}
                    <ellipse cx={x-7.5} cy="202" rx="0.8" ry="0.6" fill="#1a1a1a" />

                    {/* Four black legs - clearly visible */}
                    <rect x={x-4} y="207" width="1.5" height="4" rx="0.5" fill="#2f2f2f" />
                    <rect x={x-1} y="207" width="1.5" height="4" rx="0.5" fill="#2f2f2f" />
                    <rect x={x+1} y="207" width="1.5" height="4" rx="0.5" fill="#2f2f2f" />
                    <rect x={x+4} y="207" width="1.5" height="4" rx="0.5" fill="#2f2f2f" />

                    {/* Small fluffy tail */}
                    <circle cx={x+5} cy="204" r="1.5" fill="#f5f5f5" />
                  </g>
                  );
                })}
              </g>

              {/* Chickens pecking - DETAILED AND RECOGNIZABLE! */}
              <g>
                {[4000, 4060, 4140, 4280, 4340, 4420, 4530].map((x, i) => {
                  const yOffsets = [-1, 3, -2, 1, 4, 0, 2]; // Varied depths
                  return (
                  <g key={`chicken-end-${i}`} transform={`translate(0, ${yOffsets[i]})`} className="animal-chicken" opacity="1" style={{animationDelay: `${i * 0.2}s`}}>
                    {/* Chicken body - plump and defined */}
                    <ellipse cx={x} cy="207" rx="3.5" ry="3" fill="#d4a574" />

                    {/* Wing detail - darker feather area */}
                    <ellipse cx={x+0.5} cy="207" rx="2" ry="2" fill="#b8946a" />

                    {/* Tail feathers - pointing upward */}
                    <path d={`M ${x+3},206 Q ${x+4.5},204 ${x+5},202 Q ${x+4},203 ${x+3.5},205 Z`}
                          fill="#8b6f47" />
                    <path d={`M ${x+3.5},205 Q ${x+5},203 ${x+5.5},201 Q ${x+4.5},202 ${x+4},204 Z`}
                          fill="#9a7a55" />

                    {/* Neck connecting body to head */}
                    <rect x={x-2.5} y="204" width="1.5" height="2" rx="0.5" fill="#d4a574" />

                    {/* Chicken head - round and defined */}
                    <circle cx={x-2.5} cy="204" r="2" fill="#d4a574" />

                    {/* Red comb - prominent and wavy */}
                    <path d={`M ${x-3},202 L ${x-2.8},200.5 L ${x-2.3},201 L ${x-2},200 L ${x-1.8},201 L ${x-1.5},202 Z`}
                          fill="#cc3333" />

                    {/* Wattle under beak */}
                    <ellipse cx={x-3} cy="205" rx="0.6" ry="0.8" fill="#cc3333" />

                    {/* Beak - prominent yellow */}
                    <path d={`M ${x-4},204 L ${x-5},204 L ${x-4.5},204.5 Z`}
                          fill="#ffd700" />

                    {/* Eye - small but visible */}
                    <circle cx={x-2.5} cy="203.5" r="0.4" fill="#2f2f2f" />
                    <circle cx={x-2.3} cy="203.3" r="0.15" fill="#ffffff" />

                    {/* Legs - thin chicken legs with visible joints */}
                    <path d={`M ${x-1},210 L ${x-1},211 L ${x-2},212`}
                          stroke="#ffd700" strokeWidth="1" fill="none" />
                    <path d={`M ${x+1},210 L ${x+1},211 L ${x+2},212`}
                          stroke="#ffd700" strokeWidth="1" fill="none" />

                    {/* Feet - three toes visible */}
                    <path d={`M ${x-2},212 L ${x-2.5},212 M ${x-2},212 L ${x-2},212.5 M ${x-2},212 L ${x-1.5},212`}
                          stroke="#ffd700" strokeWidth="0.5" />
                    <path d={`M ${x+2},212 L ${x+2.5},212 M ${x+2},212 L ${x+2},212.5 M ${x+2},212 L ${x+1.5},212`}
                          stroke="#ffd700" strokeWidth="0.5" />
                  </g>
                  );
                })}
              </g>

              {/* ========== FOREGROUND: GRASS STRIP WITH VARIETY TREES ========== */}
              {/* Grass strip at foreground where street meets landscape - GREEN CITY SECTION ONLY */}
              <rect x="2000" y="232" width="1800" height="6" fill="#7aa87a" opacity="1" />

              {/* VARIETY TREES - Evergreen and Deciduous mix along foreground - GREEN CITY ONLY (x=2000-3800) */}
              <g opacity="1">
                {Array.from({length: 45}).map((_, i) => {
                  const x = 2010 + i * 40;
                  // Tree pattern: 0=tall evergreen (pine), 1=deciduous (oak), 2=small evergreen (cypress), 3=deciduous (maple)
                  const treeType = [0, 1, 2, 3, 1, 0, 3, 2, 1, 0, 2, 1, 3, 0, 1, 2, 0, 3, 1, 0, 2, 1, 3, 0, 1, 2, 0, 3, 1, 0, 2, 1, 3, 0, 1, 2, 0, 3, 1, 0, 2, 1, 3, 0, 1, 0, 1, 2, 3, 1][i % 50];
                  const baseY = 235;

                  if (treeType === 0) {
                    // Tall Evergreen Pine - triangular conifer
                    return (
                      <g key={`fg-tree-${i}`}>
                        {/* Trunk */}
                        <rect x={x+4} y={baseY-3} width="4" height="6" fill="#5a4a3a" opacity="1" />
                        {/* Pine layers - dark green, stays green year-round */}
                        <polygon points={`${x+6},${baseY-28} ${x-3},${baseY-6} ${x+15},${baseY-6}`} fill="#2d5a3d" opacity="1" />
                        <polygon points={`${x+6},${baseY-22} ${x-1},${baseY-8} ${x+13},${baseY-8}`} fill="#3d6a4d" opacity="1" />
                        <polygon points={`${x+6},${baseY-16} ${x+1},${baseY-5} ${x+11},${baseY-5}`} fill="#2d5a3d" opacity="1" />
                      </g>
                    );
                  } else if (treeType === 1) {
                    // Deciduous Oak - round canopy
                    return (
                      <g key={`fg-tree-${i}`}>
                        {/* Trunk */}
                        <rect x={x+3} y={baseY-3} width="5" height="7" fill="#6b5a45" opacity="1" />
                        {/* Round leafy canopy - varied greens */}
                        <circle cx={x+5.5} cy={baseY-16} r="10" fill="#5a8a4a" opacity="1" />
                        <circle cx={x-1} cy={baseY-12} r="6" fill="#6a9a5a" opacity="1" />
                        <circle cx={x+12} cy={baseY-12} r="6" fill="#6a9a5a" opacity="1" />
                        <circle cx={x+5.5} cy={baseY-22} r="5" fill="#7aaa6a" opacity="1" />
                      </g>
                    );
                  } else if (treeType === 2) {
                    // Small Evergreen Cypress - narrow columnar shape
                    return (
                      <g key={`fg-tree-${i}`}>
                        {/* Trunk */}
                        <rect x={x+3} y={baseY-3} width="3" height="5" fill="#5a4a3a" opacity="1" />
                        {/* Narrow columnar evergreen */}
                        <ellipse cx={x+4.5} cy={baseY-14} rx="5" ry="14" fill="#2d5a3d" opacity="1" />
                        <ellipse cx={x+4.5} cy={baseY-16} rx="4" ry="11" fill="#3d6a4d" opacity="1" />
                      </g>
                    );
                  } else {
                    // Deciduous Maple - spreading canopy
                    return (
                      <g key={`fg-tree-${i}`}>
                        {/* Trunk */}
                        <rect x={x+3} y={baseY-3} width="4" height="6" fill="#6b5a45" opacity="1" />
                        {/* Spreading maple canopy */}
                        <ellipse cx={x+5} cy={baseY-14} rx="11" ry="9" fill="#5a9a4a" opacity="1" />
                        <ellipse cx={x-2} cy={baseY-11} rx="5" ry="5" fill="#6aaa5a" opacity="1" />
                        <ellipse cx={x+12} cy={baseY-11} rx="5" ry="5" fill="#6aaa5a" opacity="1" />
                        <ellipse cx={x+5} cy={baseY-20} rx="6" ry="5" fill="#7aba6a" opacity="1" />
                      </g>
                    );
                  }
                })}
              </g>

              {/* ========== FOREGROUND: MAIN STREET WITH TRAFFIC ========== */}
              {/* Main foreground road spanning entire city */}
              <g opacity="1">
                {/* Asphalt road at very bottom */}
                <rect x="0" y="238" width="5000" height="12" fill="#4a4a4a" opacity="1" />

                {/* Road center dashed lines */}
                {Array.from({length: 125}).map((_, i) => (
                  <rect key={`fg-dash-${i}`} x={i * 40} y="243" width="20" height="1.5" fill="#ffeb3b" opacity="1" />
                ))}

                {/* Road edge lines */}
                <rect x="0" y="238" width="5000" height="1" fill="#f5f5f5" opacity="1" />
                <rect x="0" y="249" width="5000" height="1" fill="#f5f5f5" opacity="1" />
              </g>

              {/* Moving traffic - cars driving across the entire city with VARIED COLORS and BIDIRECTIONAL! */}
              <g>
                {[
                  {x: 400, color: "#c73e3e", direction: "forward"},    // Red
                  {x: 1200, color: "#2f4f7f", direction: "reverse"},   // Blue
                  {x: 1950, color: "#4a7c2f", direction: "forward"},   // Green - just before green city
                  {x: 3850, color: "#d4af37", direction: "reverse"},   // Gold - just after green city
                  {x: 4600, color: "#cc6633", direction: "forward"}    // Orange
                ].map((car, i) => (
                  <g key={`fg-car-${i}`} className={car.direction === "forward" ? "moving-car" : "moving-car-reverse"} opacity="1" style={{animationDelay: `${i * 1.5}s`}}>
                    {/* Sedan body - COLORED! */}
                    <rect x={car.x} y="239.5" width="26" height="7" rx="2" fill={car.color} />
                    {/* Windshields */}
                    <rect x={car.x + 4} y="236" width="8" height="4" rx="1" fill="#6b8ea8" opacity="1" />
                    <rect x={car.x + 14} y="236" width="8" height="4" rx="1" fill="#6b8ea8" opacity="1" />
                    {/* Wheels */}
                    <circle cx={car.x + 6} cy="246.5" r="2" fill="#2f2f2f" />
                    <circle cx={car.x + 20} cy="246.5" r="2" fill="#2f2f2f" />
                    {/* Lights - headlights for forward, taillights for reverse */}
                    {car.direction === "forward" ? (
                      <>
                        <circle cx={car.x + 25} cy="241" r="0.8" fill="#ffeb3b" opacity="1" />
                        <circle cx={car.x + 25} cy="245" r="0.8" fill="#ffeb3b" opacity="1" />
                      </>
                    ) : (
                      <>
                        <circle cx={car.x + 1} cy="241" r="0.8" fill="#cc3333" opacity="1" />
                        <circle cx={car.x + 1} cy="245" r="0.8" fill="#cc3333" opacity="1" />
                      </>
                    )}
                  </g>
                ))}
              </g>

              {/* Additional vehicles - SUVs with bidirectional traffic */}
              <g>
                {[
                  {x: 800, direction: "reverse"},
                  {x: 1600, direction: "forward"},
                  {x: 3900, direction: "reverse"},     // Just after green city
                  {x: 4800, direction: "forward"}
                ].map((suv, i) => (
                  <g key={`fg-suv-${i}`} className={suv.direction === "forward" ? "moving-car" : "moving-car-reverse"} opacity="1" style={{animationDelay: `${i * 2}s`}}>
                    {/* SUV body - taller and wider */}
                    <rect x={suv.x} y="237" width="30" height="9" rx="2" fill="#2f4f7f" />
                    {/* Windows */}
                    <rect x={suv.x + 4} y="234" width="10" height="4" rx="1" fill="#6b8ea8" opacity="1" />
                    <rect x={suv.x + 16} y="234" width="10" height="4" rx="1" fill="#6b8ea8" opacity="1" />
                    {/* Wheels */}
                    <circle cx={suv.x + 7} cy="246" r="2.5" fill="#2f2f2f" />
                    <circle cx={suv.x + 23} cy="246" r="2.5" fill="#2f2f2f" />
                    {/* Lights - headlights for forward, taillights for reverse */}
                    {suv.direction === "forward" ? (
                      <>
                        <circle cx={suv.x + 28} cy="240" r="0.8" fill="#ffeb3b" opacity="1" />
                        <circle cx={suv.x + 28} cy="244" r="0.8" fill="#ffeb3b" opacity="1" />
                      </>
                    ) : (
                      <>
                        <circle cx={suv.x + 2} cy="240" r="0.8" fill="#cc3333" opacity="1" />
                        <circle cx={suv.x + 2} cy="244" r="0.8" fill="#cc3333" opacity="1" />
                      </>
                    )}
                  </g>
                ))}
              </g>

              {/* Delivery trucks with bidirectional traffic */}
              <g>
                {[
                  {x: 200, direction: "forward"},
                  {x: 1400, direction: "reverse"},
                  {x: 4200, direction: "forward"}
                ].map((truck, i) => (
                  <g key={`fg-truck-${i}`} className={truck.direction === "forward" ? "moving-car" : "moving-car-reverse"} opacity="1" style={{animationDelay: `${i * 2.5}s`}}>
                    {/* Truck body */}
                    <rect x={truck.x} y="236" width="35" height="10" rx="2" fill="#f0f0f0" />
                    {/* Cab positioned based on direction */}
                    {truck.direction === "forward" ? (
                      <>
                        <rect x={truck.x + 28} y="234" width="8" height="6" rx="1" fill="#e8d4b8" />
                        <rect x={truck.x + 29} y="235" width="6" height="3" rx="0.5" fill="#6b8ea8" opacity="1" />
                      </>
                    ) : (
                      <>
                        <rect x={truck.x} y="234" width="8" height="6" rx="1" fill="#e8d4b8" />
                        <rect x={truck.x + 1} y="235" width="6" height="3" rx="0.5" fill="#6b8ea8" opacity="1" />
                      </>
                    )}
                    {/* Wheels */}
                    <circle cx={truck.x + 8} cy="246" r="2.5" fill="#2f2f2f" />
                    <circle cx={truck.x + 20} cy="246" r="2.5" fill="#2f2f2f" />
                    <circle cx={truck.x + 30} cy="246" r="2.5" fill="#2f2f2f" />
                    {/* Lights - headlights for forward, taillights for reverse */}
                    {truck.direction === "forward" ? (
                      <>
                        <circle cx={truck.x + 35} cy="239" r="0.8" fill="#ffeb3b" opacity="1" />
                        <circle cx={truck.x + 35} cy="243" r="0.8" fill="#ffeb3b" opacity="1" />
                      </>
                    ) : (
                      <>
                        <circle cx={truck.x + 1} cy="239" r="0.8" fill="#cc3333" opacity="1" />
                        <circle cx={truck.x + 1} cy="243" r="0.8" fill="#cc3333" opacity="1" />
                      </>
                    )}
                  </g>
                ))}
              </g>
            </g>
          </svg>
        ))}
      </div>
    </div>
  )
}
