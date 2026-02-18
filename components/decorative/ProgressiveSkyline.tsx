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

        @keyframes windmillSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .windmill-blades {
          animation: windmillSpin 10s linear infinite;
        }

        .windmill-blades-slow {
          animation: windmillSpin 14s linear infinite;
        }

        @keyframes animalDrink {
          0%, 70%, 100% { transform: translateX(0px) translateY(0px); }
          15% { transform: translateX(-3px) translateY(1px); }
          30% { transform: translateX(-5px) translateY(2px); }
          45% { transform: translateX(-3px) translateY(1px); }
          55% { transform: translateX(0px) translateY(0px); }
        }

        @keyframes chickenBathe {
          0%, 100% { transform: translateY(0px); }
          15% { transform: translateY(2px); }
          30% { transform: translateY(0.5px); }
          45% { transform: translateY(2.5px); }
          60% { transform: translateY(1px); }
          75% { transform: translateY(2px); }
        }

        .animal-drinking {
          animation: animalDrink 8s ease-in-out infinite;
        }

        .chicken-bathing {
          animation: chickenBathe 3s ease-in-out infinite;
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

              {/* Rolling hills - multi-layered for atmospheric depth */}
              {/* Distant background hills - dark, misty */}
              <path d="M 0,200 Q 80,190 160,195 Q 250,185 350,192 Q 450,188 550,193 Q 650,185 750,190 Q 800,195 900,198 L 900,250 L 0,250 Z"
                    fill="#4a7a4a" opacity="0.5" />
              <path d="M 0,197 Q 100,188 200,193 Q 300,183 400,190 Q 500,195 600,187 Q 700,183 800,192 Q 850,195 900,197 L 900,250 L 0,250 Z"
                    fill="#5a8a5a" opacity="0.45" />
              {/* Mid-ground hills - primary terrain */}
              <path d="M 0,210 Q 100,195 200,205 Q 300,215 400,200 Q 500,190 600,200 Q 650,205 700,208 Q 750,210 800,210 Q 850,210 900,210 L 900,250 L 0,250 Z"
                    fill="#7aa87a" opacity="1" />
              <path d="M 0,205 Q 80,192 160,200 Q 240,208 320,195 Q 400,185 480,195 Q 560,203 600,198 Q 650,203 700,206 Q 750,208 800,208 Q 850,208 900,208 L 900,250 L 0,250 Z"
                    fill="#8ab88a" opacity="1" />

              {/* Dirt paths connecting structures */}
              <path d="M 210,205 Q 240,208 260,206 Q 275,205 285,205" stroke="#b89a6a" strokeWidth="2.5" fill="none" opacity="0.6" />
              <path d="M 475,202 Q 500,206 520,205 Q 540,204 560,205" stroke="#b89a6a" strokeWidth="2" fill="none" opacity="0.5" />

              {/* Crop field rows - wheat near Barn #1 */}
              <g opacity="0.7">
                <rect x="300" y="201" width="30" height="8" fill="#d4b87a" opacity="0.4" rx="1" />
                {Array.from({length: 7}).map((_, i) => (
                  <g key={`wheat-${i}`}>
                    <rect x={302 + i * 4} y="199" width="1" height="9" fill="#c9a855" opacity="0.8" rx="0.5" />
                    <ellipse cx={302.5 + i * 4} cy="198.5" rx="1" ry="0.8" fill="#d4b87a" opacity="0.7" />
                  </g>
                ))}
              </g>
              {/* Small farm pond with cattails - scaled 2/3 */}
              <g>
                {/* Pond depression */}
                <ellipse cx="130" cy="217" rx="15" ry="4" fill="#5a7a5a" opacity="0.4" />
                {/* Water surface */}
                <ellipse cx="130" cy="217" rx="12" ry="3" fill="#4a7a9a" opacity="0.7" />
                {/* Light reflection */}
                <ellipse cx="128" cy="216.5" rx="7" ry="1.3" fill="#6a9aba" opacity="0.4" />
                <ellipse cx="132" cy="217.5" rx="4" ry="0.7" fill="#5a8aaa" opacity="0.3" />
                {/* Cattails */}
                <rect x="118" y="213" width="0.7" height="5" fill="#5a6a3a" opacity="0.8" />
                <ellipse cx="118.3" cy="212.7" rx="0.8" ry="1.3" fill="#6b5a3a" opacity="0.8" />
                <rect x="120" y="213.5" width="0.7" height="4.5" fill="#5a6a3a" opacity="0.8" />
                <ellipse cx="120.3" cy="213.2" rx="0.7" ry="1.2" fill="#6b5a3a" opacity="0.8" />
                <rect x="141" y="213.5" width="0.7" height="4.5" fill="#5a6a3a" opacity="0.8" />
                <ellipse cx="141.3" cy="213.2" rx="0.8" ry="1.3" fill="#6b5a3a" opacity="0.8" />
                <rect x="143" y="214" width="0.7" height="4" fill="#5a6a3a" opacity="0.8" />
                <ellipse cx="143.3" cy="213.7" rx="0.7" ry="1" fill="#6b5a3a" opacity="0.8" />
              </g>

              {/* Wildflower patches scattered in pastures */}
              <g opacity="0.9">
                {/* Patch near x=50 */}
                {[45, 48, 52, 55, 47, 53].map((fx, fi) => (
                  <circle key={`flower-a-${fi}`} cx={fx} cy={213 + (fi % 3) * 1.5} r="0.8" fill={['#ff69b4', '#ffd700', '#9370db', '#ff6347', '#ffd700', '#ff69b4'][fi]} opacity="1" />
                ))}
                {/* Patch near x=380 */}
                {[375, 378, 382, 385, 377, 383].map((fx, fi) => (
                  <circle key={`flower-b-${fi}`} cx={fx} cy={212 + (fi % 3) * 1.5} r="0.8" fill={['#ffd700', '#ff69b4', '#ff6347', '#9370db', '#ff69b4', '#ffd700'][fi]} opacity="1" />
                ))}
                {/* Patch near x=700 */}
                {[695, 698, 702, 705, 697, 703].map((fx, fi) => (
                  <circle key={`flower-c-${fi}`} cx={fx} cy={213 + (fi % 3) * 1.5} r="0.8" fill={['#9370db', '#ffd700', '#ff69b4', '#ffd700', '#ff6347', '#9370db'][fi]} opacity="1" />
                ))}
              </g>

              {/* White picket fences with sturdy posts - CONTINUOUS */}
              <g>
                {/* Fence posts every 40px - thicker structural posts */}
                {Array.from({length: 21}).map((_, i) => (
                  <rect key={`post-${i}`} x={i * 40 - 1} y="223" width="3" height="13" fill="#e8e0d0" opacity="1" />
                ))}
                {/* Pickets between posts */}
                {Array.from({length: 100}).map((_, i) => (
                  <g key={`picket-${i}`}>
                    <rect x={i * 8} y="225" width="2" height="10" fill="#f5f5f5" opacity="1" />
                    <path d={`M ${i * 8},225 L ${i * 8 + 1},223 L ${i * 8 + 2},225 Z`} fill="#f5f5f5" opacity="1" />
                  </g>
                ))}
                {/* Horizontal rails spanning entire length */}
                <rect x="0" y="228" width="800" height="1.5" fill="#f0ece0" opacity="1" />
                <rect x="0" y="232" width="800" height="1.5" fill="#f0ece0" opacity="1" />
              </g>

              {/* Building shadows/foundations - ground all structures */}
              <g opacity="0.3">
                {/* Barn #1 shadow */}
                <ellipse cx="195" cy="206" rx="28" ry="3" fill="#2f3f2f" />
                {/* Silo #1 shadow */}
                <ellipse cx="225.5" cy="206" rx="8" ry="2.5" fill="#2f3f2f" />
                {/* Barn #2 shadow */}
                <ellipse cx="460" cy="203" rx="20" ry="2.5" fill="#2f3f2f" />
                {/* Silo #2 shadow */}
                <ellipse cx="482.5" cy="203" rx="6" ry="2" fill="#2f3f2f" />
                {/* Barn #3 shadow */}
                <ellipse cx="656" cy="204" rx="18" ry="2.5" fill="#2f3f2f" />
                {/* Farmhouse #1 shadow */}
                <ellipse cx="289" cy="206" rx="12" ry="2" fill="#2f3f2f" />
                {/* Farmhouse #2 shadow */}
                <ellipse cx="570" cy="206" rx="10" ry="2" fill="#2f3f2f" />
                {/* Tractor shadows */}
                <ellipse cx="259" cy="208" rx="10" ry="2" fill="#2f3f2f" />
                <ellipse cx="529" cy="208" rx="10" ry="2" fill="#2f3f2f" />
              </g>

              {/* Red Barn #1 - Large Classic Barn with Details (1/3 LARGER) */}
              <g>
                {/* Foundation */}
                <rect x="169" y="204" width="45" height="2" fill="#6a6a5a" opacity="0.8" />
                <rect x="170" y="178" width="43" height="27" fill="#c73e3e" opacity="1" />
                <path d="M 165,178 L 191.5,158 L 218,178 Z" fill="#a83232" opacity="1" />
                {/* Roof eave overhang */}
                <path d="M 165,178 L 218,178" stroke="#8a2828" strokeWidth="1.5" opacity="1" />
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
                <rect x="441" y="201" width="34" height="2" fill="#6a6a5a" opacity="0.8" />
                <rect x="442" y="182" width="32" height="20" fill="#c73e3e" opacity="1" />
                <path d="M 438,182 L 458,166 L 478,182 Z" fill="#a83232" opacity="1" />
                <path d="M 438,182 L 478,182" stroke="#8a2828" strokeWidth="1.2" opacity="1" />
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
                <rect x="641" y="202" width="29" height="2" fill="#6a6a5a" opacity="0.8" />
                <rect x="642" y="185" width="27" height="18" fill="#c73e3e" opacity="1" />
                <path d="M 639,185 L 655.5,172 L 672,185 Z" fill="#a83232" opacity="1" />
                <path d="M 639,185 L 672,185" stroke="#8a2828" strokeWidth="1" opacity="1" />
                <rect x="651" y="190" width="7" height="13" fill="#6d4428" opacity="1" />
                <rect x="644" y="187" width="4" height="5" fill="#4a4a4a" opacity="1" />
                <rect x="663" y="187" width="4" height="5" fill="#4a4a4a" opacity="1" />
                {/* Weathered wood detail */}
                <path d="M 643,190 L 668,190 M 643,195 L 668,195" stroke="#a83232" strokeWidth="0.5" opacity="1" />
              </g>

              {/* Open pasture areas for animals */}

              {/* Enhanced Farmhouses with porches, shutters, smoke */}
              <g>
                {/* Farmhouse #1 - larger with full detail */}
                {/* Foundation */}
                <rect x="279" y="204" width="20" height="2" fill="#8a8a7a" opacity="0.8" />
                {/* Main body */}
                <rect x="280" y="195" width="18" height="10" fill="#f0e6d3" opacity="1" />
                {/* Roof with overhang */}
                <path d="M 277,195 L 289,186 L 301,195 Z" fill="#8b5a3c" opacity="1" />
                {/* Roof ridge line */}
                <path d="M 277,195 L 289,186 L 301,195" stroke="#7a4a2c" strokeWidth="0.5" fill="none" opacity="1" />
                {/* Front door with frame */}
                <rect x="284.5" y="197.5" width="4" height="7.5" fill="#5a3a2a" opacity="1" />
                <rect x="284" y="197" width="5" height="0.8" fill="#6d4428" opacity="1" />
                {/* Door knob */}
                <circle cx="287.5" cy="201" r="0.4" fill="#d4af37" opacity="1" />
                {/* Windows with shutters */}
                <rect x="282" y="197" width="2.5" height="3" fill="#6b8ea8" opacity="1" />
                <rect x="281.5" y="197" width="0.5" height="3" fill="#3a5a3a" opacity="1" />
                <rect x="284.5" y="197" width="0.5" height="3" fill="#3a5a3a" opacity="0.6" />
                <rect x="292" y="197" width="2.5" height="3" fill="#6b8ea8" opacity="1" />
                <rect x="291.5" y="197" width="0.5" height="3" fill="#3a5a3a" opacity="0.6" />
                <rect x="294.5" y="197" width="0.5" height="3" fill="#3a5a3a" opacity="1" />
                {/* Window pane dividers */}
                <path d="M 283.25,197 L 283.25,200 M 282,198.5 L 284.5,198.5" stroke="#4a6a7a" strokeWidth="0.3" />
                <path d="M 293.25,197 L 293.25,200 M 292,198.5 L 294.5,198.5" stroke="#4a6a7a" strokeWidth="0.3" />
                {/* Porch */}
                <rect x="282" y="204.5" width="9" height="1.5" fill="#c9b18f" opacity="1" />
                <rect x="283" y="201" width="1" height="4" fill="#c9b18f" opacity="0.8" />
                <rect x="289" y="201" width="1" height="4" fill="#c9b18f" opacity="0.8" />
                {/* Chimney with smoke */}
                <rect x="295" y="189" width="2.5" height="6" fill="#a85757" opacity="1" />
                <rect x="294.5" y="188.5" width="3.5" height="1" fill="#8a4a4a" opacity="1" />
                <ellipse cx="296.5" cy="186" rx="1.5" ry="2" fill="#c4c4c4" opacity="0.3" />
                <ellipse cx="297" cy="183" rx="1" ry="1.5" fill="#c4c4c4" opacity="0.2" />

                {/* Farmhouse #2 - with full detail */}
                {/* Foundation */}
                <rect x="559" y="204" width="18" height="2" fill="#8a8a7a" opacity="0.8" />
                {/* Main body */}
                <rect x="560" y="197" width="16" height="8" fill="#e8d4b8" opacity="1" />
                {/* Roof with overhang */}
                <path d="M 557,197 L 568,189 L 579,197 Z" fill="#6b5a45" opacity="1" />
                <path d="M 557,197 L 568,189 L 579,197" stroke="#5a4a35" strokeWidth="0.5" fill="none" opacity="1" />
                {/* Front door with frame */}
                <rect x="564.5" y="199" width="3.5" height="6" fill="#5a3a2a" opacity="1" />
                <circle cx="567" cy="202" r="0.35" fill="#d4af37" opacity="1" />
                {/* Windows with shutters */}
                <rect x="561" y="198.5" width="2.5" height="2.5" fill="#6b8ea8" opacity="1" />
                <rect x="560.5" y="198.5" width="0.5" height="2.5" fill="#3a5a3a" opacity="1" />
                <rect x="563.5" y="198.5" width="0.5" height="2.5" fill="#3a5a3a" opacity="0.6" />
                <rect x="570" y="198.5" width="2.5" height="2.5" fill="#6b8ea8" opacity="1" />
                <rect x="569.5" y="198.5" width="0.5" height="2.5" fill="#3a5a3a" opacity="0.6" />
                <rect x="572.5" y="198.5" width="0.5" height="2.5" fill="#3a5a3a" opacity="1" />
                {/* Window pane dividers */}
                <path d="M 562.25,198.5 L 562.25,201 M 561,199.75 L 563.5,199.75" stroke="#4a6a7a" strokeWidth="0.3" />
                <path d="M 571.25,198.5 L 571.25,201 M 570,199.75 L 572.5,199.75" stroke="#4a6a7a" strokeWidth="0.3" />
                {/* Porch */}
                <rect x="562" y="204.5" width="8" height="1.5" fill="#c9b18f" opacity="1" />
                {/* Chimney with smoke */}
                <rect x="574" y="192" width="2" height="5" fill="#a85757" opacity="1" />
                <ellipse cx="575" cy="189.5" rx="1.2" ry="1.8" fill="#c4c4c4" opacity="0.25" />
              </g>

              {/* Varied trees - deciduous and evergreen mix with size variation */}
              <g>
                {/* Large deciduous oak - x=60 */}
                <g>
                  <rect x="59" y="193" width="4" height="12" fill="#5a4a35" />
                  <rect x="57" y="203" width="2" height="3" fill="#5a4a35" opacity="0.6" transform="rotate(-15 58 203)" />
                  <circle cx="61" cy="189" r="9" fill="#4a7a4a" />
                  <circle cx="55" cy="191" r="6" fill="#5a8a5a" />
                  <circle cx="67" cy="191" r="6" fill="#5a8a5a" />
                  <circle cx="61" cy="185" r="5" fill="#6a9a6a" />
                </g>
                {/* Medium evergreen pine - x=110 */}
                <g>
                  <rect x="110" y="196" width="2.5" height="9" fill="#5a4a35" />
                  <path d="M 103,205 L 111.25,187 L 119.5,205 Z" fill="#3a6a3a" />
                  <path d="M 105,200 L 111.25,185 L 117.5,200 Z" fill="#4a7a4a" />
                  <path d="M 107,195 L 111.25,183 L 115.5,195 Z" fill="#5a8a5a" />
                </g>
                {/* Small young tree - x=165 */}
                <g>
                  <rect x="165" y="198" width="2" height="7" fill="#6b5a45" />
                  <circle cx="166" cy="196" r="4" fill="#6a9a6a" />
                  <circle cx="164" cy="197" r="3" fill="#7aaa7a" />
                  <circle cx="168" cy="197" r="3" fill="#7aaa7a" />
                </g>
                {/* Large deciduous maple - x=320 */}
                <g>
                  <rect x="319" y="194" width="4" height="11" fill="#5a4a35" />
                  <circle cx="321" cy="190" r="8" fill="#5a8a5a" />
                  <circle cx="315" cy="192" r="5.5" fill="#6a9a6a" />
                  <circle cx="327" cy="192" r="5.5" fill="#6a9a6a" />
                  <circle cx="321" cy="186" r="4.5" fill="#8ab88a" />
                </g>
                {/* Tall evergreen spruce - x=410 */}
                <g>
                  <rect x="410" y="195" width="2.5" height="10" fill="#4a3a25" />
                  <path d="M 403,206 L 411.25,185 L 419.5,206 Z" fill="#2f5f2f" />
                  <path d="M 405,200 L 411.25,182 L 417.5,200 Z" fill="#3a6a3a" />
                  <path d="M 407,195 L 411.25,180 L 415.5,195 Z" fill="#4a7a4a" />
                </g>
                {/* Medium deciduous - x=490 */}
                <g>
                  <rect x="490" y="196" width="3" height="9" fill="#6b5a45" />
                  <circle cx="491.5" cy="193" r="6.5" fill="#5a8a5a" />
                  <circle cx="488" cy="195" r="4.5" fill="#6a9a6a" />
                  <circle cx="495" cy="195" r="4.5" fill="#6a9a6a" />
                </g>
                {/* Small evergreen - x=610 */}
                <g>
                  <rect x="610" y="198" width="2" height="7" fill="#4a3a25" />
                  <path d="M 605,205 L 611,192 L 617,205 Z" fill="#3a6a3a" />
                  <path d="M 607,201 L 611,190 L 615,201 Z" fill="#4a7a4a" />
                </g>
                {/* Large deciduous elm - x=690 */}
                <g>
                  <rect x="689" y="193" width="4" height="12" fill="#5a4a35" />
                  <circle cx="691" cy="189" r="8" fill="#4a7a4a" />
                  <circle cx="685" cy="191" r="5.5" fill="#5a8a5a" />
                  <circle cx="697" cy="191" r="5.5" fill="#5a8a5a" />
                  <circle cx="691" cy="185" r="5" fill="#6a9a6a" />
                </g>
                {/* Medium deciduous birch - x=750 */}
                <g>
                  <rect x="750" y="196" width="2.5" height="9" fill="#c9b89a" />
                  <path d="M 750.5,197 L 750.5,200" stroke="#6b5a45" strokeWidth="0.5" />
                  <path d="M 751.5,198 L 751.5,201" stroke="#6b5a45" strokeWidth="0.5" />
                  <circle cx="751.25" cy="193" r="6" fill="#6a9a6a" />
                  <circle cx="748" cy="195" r="4" fill="#7aaa7a" />
                  <circle cx="755" cy="195" r="4" fill="#7aaa7a" />
                </g>
              </g>

              {/* Parked Tractors - GREEN JOHN DEERE STYLE! */}
              <g>
                {[250, 520].map((x, i) => (
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

              {/* Windmill - iconic rural landmark */}
              <g>
                {/* Windmill tower - lattice structure */}
                <path d="M 386,205 L 389,175 L 393,175 L 396,205 Z" fill="#8a8a7a" opacity="0.9" />
                {/* Lattice cross-bracing */}
                <path d="M 387.5,200 L 394,180 M 394.5,200 L 388,180" stroke="#6a6a5a" strokeWidth="0.5" opacity="0.7" />
                <path d="M 388,195 L 394,190 M 394,195 L 388,190" stroke="#6a6a5a" strokeWidth="0.4" opacity="0.6" />
                {/* Platform at top */}
                <rect x="387" y="174" width="8" height="1.5" fill="#6a6a5a" opacity="1" />
                {/* Nacelle/hub */}
                <rect x="389" y="172" width="4" height="3" rx="1" fill="#7a7a6a" opacity="1" />
                {/* Blades - 4 blades extending from hub, animated spin */}
                <g className="windmill-blades" style={{transformOrigin: '391px 173px'}}>
                  <path d="M 391,173 L 391,157" stroke="#e8e0d0" strokeWidth="1.2" opacity="0.9" />
                  <path d="M 391,173 L 391,189" stroke="#e8e0d0" strokeWidth="1.2" opacity="0.9" />
                  <path d="M 391,173 L 377,169" stroke="#e8e0d0" strokeWidth="1.2" opacity="0.9" />
                  <path d="M 391,173 L 405,177" stroke="#e8e0d0" strokeWidth="1.2" opacity="0.9" />
                  {/* Blade surfaces - angled panels */}
                  <path d="M 391,157 L 392.5,160 L 391,168 L 389.5,165 Z" fill="#e8e0d0" opacity="0.4" />
                  <path d="M 391,189 L 389.5,186 L 391,178 L 392.5,181 Z" fill="#e8e0d0" opacity="0.4" />
                  <path d="M 377,169 L 380,170.5 L 387,173 L 384,171.5 Z" fill="#e8e0d0" opacity="0.4" />
                  <path d="M 405,177 L 402,175.5 L 395,173 L 398,174.5 Z" fill="#e8e0d0" opacity="0.4" />
                </g>
                {/* Hub center - on top of blades */}
                <circle cx="391" cy="173" r="1.5" fill="#5a5a4a" opacity="1" />
              </g>

              {/* FARM ANIMALS - Shrunk 1/3, self-aware, grouped naturally */}

              {/* Horses in pairs - facing each other, 2/3 scale */}
              <g>
                {/* Pair 1: Two horses facing each other near x=40 */}
                {[
                  {x: 35, facing: 1, y: -3, color: '#654321', chest: '#7a5230'},
                  {x: 60, facing: -1, y: -2, color: '#8b6f47', chest: '#9a7a55'},
                ].map((h, i) => (
                  <g key={`horse-pair1-${i}`} transform={`translate(0, ${h.y}) scale(${h.facing}, 1)`} className="animal-horse" opacity="1" style={{animationDelay: `${i * 0.3}s`}}>
                    <g transform={`translate(${h.facing === -1 ? -2 * h.x : 0}, 0)`}>
                      <ellipse cx={h.x * h.facing} cy="204" rx="6.7" ry="4" fill={h.color} />
                      <ellipse cx={h.x * h.facing + 4} cy="204" rx="3.3" ry="4" fill={h.chest} />
                      <path d={`M ${h.x * h.facing + 5.3},202.7 L ${h.x * h.facing + 7.3},200.7 L ${h.x * h.facing + 6.7},204 Z`} fill={h.color} />
                      <ellipse cx={h.x * h.facing + 8.7} cy="200.3" rx="2.3" ry="3" fill={h.color} />
                      <ellipse cx={h.x * h.facing + 10} cy="201" rx="1.3" ry="1.7" fill="#8b6f47" />
                      <path d={`M ${h.x * h.facing + 8},197.3 L ${h.x * h.facing + 7.3},195.3 L ${h.x * h.facing + 8.7},196.7 Z`} fill={h.color} />
                      <path d={`M ${h.x * h.facing + 9.3},197.3 L ${h.x * h.facing + 10},195.3 L ${h.x * h.facing + 9},196.7 Z`} fill={h.color} />
                      <circle cx={h.x * h.facing + 8.7} cy="199.7" r="0.7" fill="#2f2f2f" />
                      <circle cx={h.x * h.facing + 8.9} cy="199.5" r="0.3" fill="#ffffff" />
                      <circle cx={h.x * h.facing + 10.3} cy="201.3" r="0.3" fill="#4a3520" />
                      <rect x={h.x * h.facing + 2} y="208" width="1.3" height="4" fill={h.color} />
                      <rect x={h.x * h.facing + 4.7} y="208" width="1.3" height="4" fill={h.chest} />
                      <rect x={h.x * h.facing - 3.3} y="208" width="1.3" height="4" fill={h.color} />
                      <rect x={h.x * h.facing - 0.7} y="208" width="1.3" height="4" fill={h.chest} />
                      <rect x={h.x * h.facing + 2} y="211.5" width="1.3" height="0.7" fill="#2f2f2f" />
                      <rect x={h.x * h.facing + 4.7} y="211.5" width="1.3" height="0.7" fill="#2f2f2f" />
                      <rect x={h.x * h.facing - 3.3} y="211.5" width="1.3" height="0.7" fill="#2f2f2f" />
                      <rect x={h.x * h.facing - 0.7} y="211.5" width="1.3" height="0.7" fill="#2f2f2f" />
                      <path d={`M ${h.x * h.facing - 6.7},203 Q ${h.x * h.facing - 8.7},204.7 ${h.x * h.facing - 9.3},207.3`} stroke="#4a3520" strokeWidth="1.3" fill="none" />
                      <path d={`M ${h.x * h.facing + 7.3},198 Q ${h.x * h.facing + 6},198.7 ${h.x * h.facing + 4.7},200`} stroke="#4a3520" strokeWidth="1" fill="none" />
                    </g>
                  </g>
                ))}
                {/* Pair 2: Two horses near x=340, one nuzzling the other */}
                {[
                  {x: 335, y: -1, color: '#654321'},
                  {x: 355, y: 0, color: '#4a3520'},
                ].map((h, i) => (
                  <g key={`horse-pair2-${i}`} transform={`translate(0, ${h.y})`} className="animal-horse" opacity="1" style={{animationDelay: `${(i + 2) * 0.3}s`}}>
                    <ellipse cx={h.x} cy="204" rx="6.7" ry="4" fill={h.color} />
                    <ellipse cx={h.x + 4} cy="204" rx="3.3" ry="4" fill="#7a5230" />
                    <path d={`M ${h.x + 5.3},202.7 L ${h.x + 7.3},200.7 L ${h.x + 6.7},204 Z`} fill={h.color} />
                    <ellipse cx={h.x + 8.7} cy="200.3" rx="2.3" ry="3" fill={h.color} />
                    <ellipse cx={h.x + 10} cy="201" rx="1.3" ry="1.7" fill="#8b6f47" />
                    <path d={`M ${h.x + 8},197.3 L ${h.x + 7.3},195.3 L ${h.x + 8.7},196.7 Z`} fill={h.color} />
                    <path d={`M ${h.x + 9.3},197.3 L ${h.x + 10},195.3 L ${h.x + 9},196.7 Z`} fill={h.color} />
                    <circle cx={h.x + 8.7} cy="199.7" r="0.7" fill="#2f2f2f" />
                    <circle cx={h.x + 8.9} cy="199.5" r="0.3" fill="#ffffff" />
                    <rect x={h.x + 2} y="208" width="1.3" height="4" fill={h.color} />
                    <rect x={h.x + 4.7} y="208" width="1.3" height="4" fill="#7a5230" />
                    <rect x={h.x - 3.3} y="208" width="1.3" height="4" fill={h.color} />
                    <rect x={h.x - 0.7} y="208" width="1.3" height="4" fill="#7a5230" />
                    <rect x={h.x + 2} y="211.5" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={h.x + 4.7} y="211.5" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={h.x - 3.3} y="211.5" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={h.x - 0.7} y="211.5" width="1.3" height="0.7" fill="#2f2f2f" />
                    <path d={`M ${h.x - 6.7},203 Q ${h.x - 8.7},204.7 ${h.x - 9.3},207.3`} stroke="#4a3520" strokeWidth="1.3" fill="none" />
                    <path d={`M ${h.x + 7.3},198 Q ${h.x + 6},198.7 ${h.x + 4.7},200`} stroke="#4a3520" strokeWidth="1" fill="none" />
                  </g>
                ))}
                {/* Solo horse at x=715 looking toward cows */}
                <g transform="translate(0, 2)" className="animal-horse" opacity="1" style={{animationDelay: '1.2s'}}>
                  <ellipse cx={715} cy="204" rx="6.7" ry="4" fill="#654321" />
                  <ellipse cx={721} cy="204" rx="3.3" ry="4" fill="#7a5230" />
                  <path d={`M 720.3,202.7 L 722.3,200.7 L 721.7,204 Z`} fill="#654321" />
                  <ellipse cx={723.7} cy="200.3" rx="2.3" ry="3" fill="#654321" />
                  <ellipse cx={725} cy="201" rx="1.3" ry="1.7" fill="#8b6f47" />
                  <path d="M 723,197.3 L 722.3,195.3 L 723.7,196.7 Z" fill="#654321" />
                  <path d="M 724.3,197.3 L 725,195.3 L 724,196.7 Z" fill="#654321" />
                  <circle cx={723.7} cy="199.7" r="0.7" fill="#2f2f2f" />
                  <circle cx={723.9} cy="199.5" r="0.3" fill="#ffffff" />
                  <rect x={717} y="208" width="1.3" height="4" fill="#654321" />
                  <rect x={719.7} y="208" width="1.3" height="4" fill="#7a5230" />
                  <rect x={711.7} y="208" width="1.3" height="4" fill="#654321" />
                  <rect x={714.3} y="208" width="1.3" height="4" fill="#7a5230" />
                  <rect x={717} y="211.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={719.7} y="211.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={711.7} y="211.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={714.3} y="211.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <path d={`M 708.3,203 Q 706.3,204.7 705.7,207.3`} stroke="#4a3520" strokeWidth="1.3" fill="none" />
                  <path d="M 722.3,198 Q 721,198.7 719.7,200" stroke="#4a3520" strokeWidth="1" fill="none" />
                </g>
              </g>

              {/* Cows grazing in groups - 2/3 scale, facing each other */}
              <g>
                {/* Cow group 1: mother+calf near x=105 facing same direction */}
                {[
                  {x: 100, y: 2, scale: 1},
                  {x: 118, y: 3, scale: 0.7},
                ].map((c, i) => (
                  <g key={`cow-group1-${i}`} transform={`translate(0, ${c.y}) scale(${c.scale})`} className="animal-cow" opacity="1" style={{animationDelay: `${i * 0.5}s`}}>
                    <g transform={`scale(${1/c.scale}) translate(0,${c.y * (1 - 1/c.scale)})`}>
                      <rect x={c.x / c.scale - 5.3} y="201.3" width="10.7" height="5.3" rx="1.3" fill="#f5f5f5" />
                      <ellipse cx={c.x / c.scale} cy="206.7" rx="2" ry="1.3" fill="#ffb6c1" />
                      <ellipse cx={c.x / c.scale - 3.3} cy="202.7" rx="1.7" ry="1.3" fill="#2f2f2f" />
                      <ellipse cx={c.x / c.scale + 1.3} cy="202" rx="2" ry="1.7" fill="#2f2f2f" />
                      <rect x={c.x / c.scale - 6} y="199.3" width="2" height="3.3" rx="0.7" fill="#f5f5f5" />
                      <ellipse cx={c.x / c.scale - 6.7} cy="200" rx="2.3" ry="2.7" fill="#f5f5f5" />
                      <ellipse cx={c.x / c.scale - 7.3} cy="199.3" rx="1" ry="1" fill="#2f2f2f" />
                      <ellipse cx={c.x / c.scale - 8} cy="201.3" rx="1.3" ry="1.7" fill="#ffb6c1" />
                      <circle cx={c.x / c.scale - 6.7} cy="199.3" r="0.7" fill="#2f2f2f" />
                      <circle cx={c.x / c.scale - 6.5} cy="199.1" r="0.3" fill="#ffffff" />
                      <path d={`M ${c.x / c.scale - 7.3},197.3 Q ${c.x / c.scale - 8},196 ${c.x / c.scale - 8.7},195.3`} stroke="#8a7a6a" strokeWidth="0.8" fill="none" />
                      <path d={`M ${c.x / c.scale - 6},197.3 Q ${c.x / c.scale - 5.3},196 ${c.x / c.scale - 4.7},195.3`} stroke="#8a7a6a" strokeWidth="0.8" fill="none" />
                      <rect x={c.x / c.scale - 3.3} y="207" width="1.3" height="4.7" rx="0.7" fill="#e8e8e8" />
                      <rect x={c.x / c.scale - 0.7} y="207" width="1.3" height="4.7" rx="0.7" fill="#e8e8e8" />
                      <rect x={c.x / c.scale + 1.3} y="207" width="1.3" height="4.7" rx="0.7" fill="#e8e8e8" />
                      <rect x={c.x / c.scale + 4} y="207" width="1.3" height="4.7" rx="0.7" fill="#e8e8e8" />
                      <rect x={c.x / c.scale - 3.3} y="211.3" width="1.3" height="0.7" fill="#2f2f2f" />
                      <rect x={c.x / c.scale - 0.7} y="211.3" width="1.3" height="0.7" fill="#2f2f2f" />
                      <rect x={c.x / c.scale + 1.3} y="211.3" width="1.3" height="0.7" fill="#2f2f2f" />
                      <rect x={c.x / c.scale + 4} y="211.3" width="1.3" height="0.7" fill="#2f2f2f" />
                      <path d={`M ${c.x / c.scale + 5.3},202.7 L ${c.x / c.scale + 6.7},207`} stroke="#f5f5f5" strokeWidth="1" />
                      <ellipse cx={c.x / c.scale + 6.7} cy="207.7" rx="1" ry="1.3" fill="#2f2f2f" />
                    </g>
                  </g>
                ))}
                {/* Cow pair facing each other near x=410 and x=430 */}
                {[
                  {x: 410, y: -3, dir: 1},
                  {x: 440, y: -2, dir: -1},
                ].map((c, i) => (
                  <g key={`cow-pair-${i}`} transform={`translate(0, ${c.y})`} className="animal-cow" opacity="1" style={{animationDelay: `${(i + 2) * 0.5}s`}}>
                    <rect x={c.x - 5.3} y="201.3" width="10.7" height="5.3" rx="1.3" fill="#f5f5f5" />
                    <ellipse cx={c.x} cy="206.7" rx="2" ry="1.3" fill="#ffb6c1" />
                    <ellipse cx={c.x - 3.3} cy="202.7" rx="1.7" ry="1.3" fill="#2f2f2f" />
                    <ellipse cx={c.x + 1.3} cy="202" rx="2" ry="1.7" fill="#2f2f2f" />
                    <rect x={c.x + (c.dir > 0 ? -6 : 4)} y="199.3" width="2" height="3.3" rx="0.7" fill="#f5f5f5" />
                    <ellipse cx={c.x + (c.dir > 0 ? -6.7 : 6.7)} cy="200" rx="2.3" ry="2.7" fill="#f5f5f5" />
                    <ellipse cx={c.x + (c.dir > 0 ? -7.3 : 7.3)} cy="199.3" rx="1" ry="1" fill="#2f2f2f" />
                    <ellipse cx={c.x + (c.dir > 0 ? -8 : 8)} cy="201.3" rx="1.3" ry="1.7" fill="#ffb6c1" />
                    <circle cx={c.x + (c.dir > 0 ? -6.7 : 6.7)} cy="199.3" r="0.7" fill="#2f2f2f" />
                    <circle cx={c.x + (c.dir > 0 ? -6.5 : 6.5)} cy="199.1" r="0.3" fill="#ffffff" />
                    <rect x={c.x - 3.3} y="207" width="1.3" height="4.7" rx="0.7" fill="#e8e8e8" />
                    <rect x={c.x - 0.7} y="207" width="1.3" height="4.7" rx="0.7" fill="#e8e8e8" />
                    <rect x={c.x + 1.3} y="207" width="1.3" height="4.7" rx="0.7" fill="#e8e8e8" />
                    <rect x={c.x + 4} y="207" width="1.3" height="4.7" rx="0.7" fill="#e8e8e8" />
                    <rect x={c.x - 3.3} y="211.3" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={c.x - 0.7} y="211.3" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={c.x + 1.3} y="211.3" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={c.x + 4} y="211.3" width="1.3" height="0.7" fill="#2f2f2f" />
                    <path d={`M ${c.x + (c.dir > 0 ? 5.3 : -5.3)},202.7 L ${c.x + (c.dir > 0 ? 6.7 : -6.7)},207`} stroke="#f5f5f5" strokeWidth="1" />
                    <ellipse cx={c.x + (c.dir > 0 ? 6.7 : -6.7)} cy="207.7" rx="1" ry="1.3" fill="#2f2f2f" />
                  </g>
                ))}
                {/* Solo cow near x=760 grazing, looking at nearby horse */}
                <g transform="translate(0, -1)" className="animal-cow" opacity="1" style={{animationDelay: '2s'}}>
                  <rect x={754.7} y="201.3" width="10.7" height="5.3" rx="1.3" fill="#f5f5f5" />
                  <ellipse cx={760} cy="206.7" rx="2" ry="1.3" fill="#ffb6c1" />
                  <ellipse cx={756.7} cy="202.7" rx="1.7" ry="1.3" fill="#2f2f2f" />
                  <ellipse cx={761.3} cy="202" rx="2" ry="1.7" fill="#2f2f2f" />
                  <rect x={749} y="199.3" width="2" height="3.3" rx="0.7" fill="#f5f5f5" />
                  <ellipse cx={748.3} cy="200" rx="2.3" ry="2.7" fill="#f5f5f5" />
                  <ellipse cx={747.7} cy="199.3" rx="1" ry="1" fill="#2f2f2f" />
                  <ellipse cx={747} cy="201.3" rx="1.3" ry="1.7" fill="#ffb6c1" />
                  <circle cx={748.3} cy="199.3" r="0.7" fill="#2f2f2f" />
                  <circle cx={748.5} cy="199.1" r="0.3" fill="#ffffff" />
                  <rect x={756.7} y="207" width="1.3" height="4.7" rx="0.7" fill="#e8e8e8" />
                  <rect x={759.3} y="207" width="1.3" height="4.7" rx="0.7" fill="#e8e8e8" />
                  <rect x={761.3} y="207" width="1.3" height="4.7" rx="0.7" fill="#e8e8e8" />
                  <rect x={764} y="207" width="1.3" height="4.7" rx="0.7" fill="#e8e8e8" />
                  <rect x={756.7} y="211.3" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={759.3} y="211.3" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={761.3} y="211.3" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={764} y="211.3" width="1.3" height="0.7" fill="#2f2f2f" />
                  <path d={`M 765.3,202.7 L 766.7,207`} stroke="#f5f5f5" strokeWidth="1" />
                  <ellipse cx={766.7} cy="207.7" rx="1" ry="1.3" fill="#2f2f2f" />
                </g>
              </g>

              {/* Sheep in flocks - 2/3 scale, huddled together, aware of each other */}
              <g>
                {/* Flock 1: 3 sheep huddled near x=75 */}
                {[
                  {x: 68, y: -2, dir: 1},
                  {x: 78, y: -1, dir: 1},
                  {x: 86, y: -3, dir: -1},
                ].map((s, i) => (
                  <g key={`sheep-flock1-${i}`} transform={`translate(0, ${s.y})`} className="animal-sheep" opacity="1" style={{animationDelay: `${i * 0.4}s`}}>
                    <circle cx={s.x} cy="206" r="3" fill="#f5f5f5" />
                    <circle cx={s.x - 2 * s.dir} cy="205.3" r="2.3" fill="#f5f5f5" />
                    <circle cx={s.x + 2 * s.dir} cy="205.3" r="2.3" fill="#f5f5f5" />
                    <circle cx={s.x - 0.7 * s.dir} cy="207.3" r="2" fill="#f5f5f5" />
                    <circle cx={s.x + 1.3 * s.dir} cy="207.3" r="2" fill="#f5f5f5" />
                    <circle cx={s.x} cy="204" r="2" fill="#f5f5f5" />
                    <circle cx={s.x - 1.3 * s.dir} cy="204.7" r="1" fill="#e8e8e8" />
                    <circle cx={s.x + 0.7 * s.dir} cy="205.7" r="1" fill="#e8e8e8" />
                    <ellipse cx={s.x - 4 * s.dir} cy="204.7" rx="1.7" ry="2" fill="#2f2f2f" />
                    <ellipse cx={s.x - 4.7 * s.dir} cy="203.3" rx="0.7" ry="1" fill="#2f2f2f" />
                    <ellipse cx={s.x - 3.3 * s.dir} cy="203.3" rx="0.7" ry="1" fill="#2f2f2f" />
                    <circle cx={s.x - 4.3 * s.dir} cy="204.7" r="0.4" fill="#ffffff" />
                    <circle cx={s.x - 4.3 * s.dir} cy="204.7" r="0.2" fill="#2f2f2f" />
                    <ellipse cx={s.x - 5 * s.dir} cy="205.3" rx="0.5" ry="0.4" fill="#1a1a1a" />
                    <rect x={s.x - 2.7} y="208.7" width="1" height="2.7" rx="0.3" fill="#2f2f2f" />
                    <rect x={s.x - 0.7} y="208.7" width="1" height="2.7" rx="0.3" fill="#2f2f2f" />
                    <rect x={s.x + 0.7} y="208.7" width="1" height="2.7" rx="0.3" fill="#2f2f2f" />
                    <rect x={s.x + 2.7} y="208.7" width="1" height="2.7" rx="0.3" fill="#2f2f2f" />
                    <circle cx={s.x + 3.3 * s.dir} cy="206.7" r="1" fill="#f5f5f5" />
                  </g>
                ))}
                {/* Flock 2: 2 sheep near x=500 facing each other */}
                {[
                  {x: 497, y: 0, dir: 1},
                  {x: 513, y: 1, dir: -1},
                ].map((s, i) => (
                  <g key={`sheep-flock2-${i}`} transform={`translate(0, ${s.y})`} className="animal-sheep" opacity="1" style={{animationDelay: `${(i + 3) * 0.4}s`}}>
                    <circle cx={s.x} cy="206" r="3" fill="#f5f5f5" />
                    <circle cx={s.x - 2 * s.dir} cy="205.3" r="2.3" fill="#f5f5f5" />
                    <circle cx={s.x + 2 * s.dir} cy="205.3" r="2.3" fill="#f5f5f5" />
                    <circle cx={s.x} cy="204" r="2" fill="#f5f5f5" />
                    <circle cx={s.x - 1.3 * s.dir} cy="204.7" r="1" fill="#e8e8e8" />
                    <ellipse cx={s.x - 4 * s.dir} cy="204.7" rx="1.7" ry="2" fill="#2f2f2f" />
                    <ellipse cx={s.x - 4.7 * s.dir} cy="203.3" rx="0.7" ry="1" fill="#2f2f2f" />
                    <ellipse cx={s.x - 3.3 * s.dir} cy="203.3" rx="0.7" ry="1" fill="#2f2f2f" />
                    <circle cx={s.x - 4.3 * s.dir} cy="204.7" r="0.4" fill="#ffffff" />
                    <circle cx={s.x - 4.3 * s.dir} cy="204.7" r="0.2" fill="#2f2f2f" />
                    <ellipse cx={s.x - 5 * s.dir} cy="205.3" rx="0.5" ry="0.4" fill="#1a1a1a" />
                    <rect x={s.x - 2.7} y="208.7" width="1" height="2.7" rx="0.3" fill="#2f2f2f" />
                    <rect x={s.x - 0.7} y="208.7" width="1" height="2.7" rx="0.3" fill="#2f2f2f" />
                    <rect x={s.x + 0.7} y="208.7" width="1" height="2.7" rx="0.3" fill="#2f2f2f" />
                    <rect x={s.x + 2.7} y="208.7" width="1" height="2.7" rx="0.3" fill="#2f2f2f" />
                    <circle cx={s.x + 3.3 * s.dir} cy="206.7" r="1" fill="#f5f5f5" />
                  </g>
                ))}
                {/* Solo sheep near x=308 looking toward flock */}
                <g transform="translate(0, 3)" className="animal-sheep" opacity="1" style={{animationDelay: '2s'}}>
                  <circle cx={308} cy="206" r="3" fill="#f5f5f5" />
                  <circle cx={306} cy="205.3" r="2.3" fill="#f5f5f5" />
                  <circle cx={310} cy="205.3" r="2.3" fill="#f5f5f5" />
                  <circle cx={308} cy="204" r="2" fill="#f5f5f5" />
                  <ellipse cx={304} cy="204.7" rx="1.7" ry="2" fill="#2f2f2f" />
                  <ellipse cx={303.3} cy="203.3" rx="0.7" ry="1" fill="#2f2f2f" />
                  <ellipse cx={304.7} cy="203.3" rx="0.7" ry="1" fill="#2f2f2f" />
                  <circle cx={303.7} cy="204.7" r="0.4" fill="#ffffff" />
                  <circle cx={303.7} cy="204.7" r="0.2" fill="#2f2f2f" />
                  <ellipse cx={303} cy="205.3" rx="0.5" ry="0.4" fill="#1a1a1a" />
                  <rect x={305.3} y="208.7" width="1" height="2.7" rx="0.3" fill="#2f2f2f" />
                  <rect x={307.3} y="208.7" width="1" height="2.7" rx="0.3" fill="#2f2f2f" />
                  <rect x={309} y="208.7" width="1" height="2.7" rx="0.3" fill="#2f2f2f" />
                  <rect x={310.7} y="208.7" width="1" height="2.7" rx="0.3" fill="#2f2f2f" />
                  <circle cx={311.3} cy="206.7" r="1" fill="#f5f5f5" />
                </g>
              </g>

              {/* Chickens pecking in groups - 2/3 scale, scratching together */}
              <g>
                {[
                  {x: 8, y: 1, dir: 1},
                  {x: 16, y: 2, dir: -1},
                  {x: 241, y: -1, dir: 1},
                  {x: 248, y: 0, dir: 1},
                  {x: 375, y: 2, dir: -1},
                  {x: 382, y: 1, dir: 1},
                  {x: 435, y: -1, dir: -1},
                  {x: 585, y: 1, dir: 1},
                  {x: 592, y: 0, dir: -1},
                  {x: 635, y: 3, dir: 1},
                  {x: 795, y: 0, dir: -1},
                ].map((ch, i) => (
                  <g key={`chicken-${i}`} transform={`translate(0, ${ch.y})`} className="animal-chicken" opacity="1" style={{animationDelay: `${i * 0.15}s`}}>
                    <ellipse cx={ch.x} cy="209" rx="2.3" ry="2" fill="#d4a574" />
                    <ellipse cx={ch.x + 0.3 * ch.dir} cy="209" rx="1.3" ry="1.3" fill="#b8946a" />
                    <path d={`M ${ch.x + 2 * ch.dir},208.3 Q ${ch.x + 3 * ch.dir},207 ${ch.x + 3.3 * ch.dir},205.7 Q ${ch.x + 2.7 * ch.dir},206.3 ${ch.x + 2.3 * ch.dir},207.7 Z`} fill="#8b6f47" />
                    <rect x={ch.x - 1.7 * ch.dir - 0.5} y="207.3" width="1" height="1.3" rx="0.3" fill="#d4a574" />
                    <circle cx={ch.x - 1.7 * ch.dir} cy="207" r="1.3" fill="#d4a574" />
                    <path d={`M ${ch.x - 2 * ch.dir},205.7 L ${ch.x - 1.9 * ch.dir},204.7 L ${ch.x - 1.5 * ch.dir},205.2 L ${ch.x - 1.3 * ch.dir},204.3 L ${ch.x - 1.2 * ch.dir},205 L ${ch.x - 1 * ch.dir},205.7 Z`} fill="#cc3333" />
                    <ellipse cx={ch.x - 2 * ch.dir} cy="207.7" rx="0.4" ry="0.5" fill="#cc3333" />
                    <path d={`M ${ch.x - 2.7 * ch.dir},207 L ${ch.x - 3.3 * ch.dir},207 L ${ch.x - 3 * ch.dir},207.3 Z`} fill="#ffd700" />
                    <circle cx={ch.x - 1.7 * ch.dir} cy="206.5" r="0.3" fill="#2f2f2f" />
                    <circle cx={ch.x - 1.5 * ch.dir} cy="206.3" r="0.1" fill="#ffffff" />
                    <path d={`M ${ch.x - 0.7},211.3 L ${ch.x - 0.7},212 L ${ch.x - 1.3},212.5`} stroke="#ffd700" strokeWidth="0.7" fill="none" />
                    <path d={`M ${ch.x + 0.7},211.3 L ${ch.x + 0.7},212 L ${ch.x + 1.3},212.5`} stroke="#ffd700" strokeWidth="0.7" fill="none" />
                  </g>
                ))}
              </g>

              {/* FOREGROUND: Drinking animals at pond - rendered last so they appear in front */}
              <g>
                {/* Cow drinking at the pond - 2/3 scale, head dipped to water */}
                <g className="animal-drinking" style={{animationDelay: '0s', animationDuration: '12s'}}>
                  <ellipse cx={148} cy="209" rx="5.3" ry="3.3" fill="#f5f5f5" />
                  <ellipse cx={146} cy="208.3" rx="1.7" ry="1.3" fill="#2f2f2f" />
                  <ellipse cx={150} cy="207.7" rx="2" ry="1.7" fill="#2f2f2f" />
                  <ellipse cx={148} cy="212.3" rx="2" ry="1.3" fill="#ffb6c1" />
                  <path d={`M 143.3,208.3 L 140,213 L 142,213.7 L 144.7,209.3 Z`} fill="#f5f5f5" />
                  <ellipse cx={139} cy="213.7" rx="2.3" ry="2" fill="#f5f5f5" />
                  <ellipse cx={138.3} cy="213" rx="1" ry="1" fill="#2f2f2f" />
                  <ellipse cx={137.3} cy="214.7" rx="1.3" ry="1.2" fill="#ffb6c1" />
                  <ellipse cx={136.3} cy="216" rx="2" ry="0.5" fill="#6a9aba" opacity="0.5" />
                  <ellipse cx={136.3} cy="216" rx="3.3" ry="0.7" fill="#6a9aba" opacity="0.2" />
                  <ellipse cx={137.3} cy="211.7" rx="1" ry="0.7" fill="#e8e8e8" transform="rotate(-30 137.3 211.7)" />
                  <ellipse cx={140} cy="211.7" rx="1" ry="0.7" fill="#e8e8e8" transform="rotate(30 140 211.7)" />
                  <circle cx={139} cy="213" r="0.5" fill="#2f2f2f" />
                  <circle cx={139.1} cy="212.9" r="0.2" fill="#ffffff" />
                  <path d={`M 137.3,211 Q 136.7,210 136,209.7`} stroke="#8a7a6a" strokeWidth="0.7" fill="none" />
                  <path d={`M 139.3,211 Q 140,210 140.7,209.7`} stroke="#8a7a6a" strokeWidth="0.7" fill="none" />
                  <rect x={145.3} y="212.3" width="1.3" height="3.3" rx="0.5" fill="#e8e8e8" />
                  <rect x={148} y="212.3" width="1.3" height="3.3" rx="0.5" fill="#e8e8e8" />
                  <rect x={143.3} y="212.3" width="1.3" height="3.3" rx="0.5" fill="#e8e8e8" />
                  <rect x={150.7} y="212.3" width="1.3" height="3.3" rx="0.5" fill="#e8e8e8" />
                  <rect x={145.3} y="215.3" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={148} y="215.3" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={143.3} y="215.3" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={150.7} y="215.3" width="1.3" height="0.7" fill="#2f2f2f" />
                  <path d={`M 152.7,207.7 Q 154,209.7 153.3,212.3`} stroke="#f5f5f5" strokeWidth="0.8" fill="none" />
                  <ellipse cx={153.3} cy="213" rx="0.7" ry="1" fill="#2f2f2f" />
                </g>

                {/* Horse drinking at opposite side - 2/3 scale */}
                <g className="animal-drinking" style={{animationDelay: '4s', animationDuration: '10s'}}>
                  <ellipse cx={115} cy="207" rx="6.7" ry="4" fill="#654321" />
                  <ellipse cx={119} cy="207" rx="3.3" ry="4" fill="#7a5230" />
                  <path d={`M 120,205.7 L 123.3,211 L 121.3,212.3 L 118.7,207 Z`} fill="#654321" />
                  <ellipse cx={122} cy="212.3" rx="2.7" ry="1.7" fill="#5a3a1a" />
                  <ellipse cx={124} cy="213" rx="1.3" ry="1" fill="#4a2a0a" />
                  <circle cx={124.7} cy="212.7" r="0.3" fill="#2f2f2f" />
                  <circle cx={124.7} cy="213.3" r="0.3" fill="#2f2f2f" />
                  <ellipse cx={124.7} cy="214.3" rx="2" ry="0.5" fill="#6a9aba" opacity="0.5" />
                  <ellipse cx={124.7} cy="214.3" rx="3.3" ry="0.7" fill="#6a9aba" opacity="0.2" />
                  <circle cx={121.3} cy="211.7" r="0.4" fill="#2f2f2f" />
                  <circle cx={121.5} cy="211.5" r="0.13" fill="#ffffff" />
                  <path d="M 120.7,210.7 L 120,209.3 L 121.3,210 Z" fill="#5a3a1a" />
                  <path d="M 122,210.7 L 122.7,209.3 L 121.7,210 Z" fill="#5a3a1a" />
                  <path d={`M 118.7,204 Q 120,203.3 121.3,204.7`} stroke="#3a2a1a" strokeWidth="1" fill="none" />
                  <rect x={110.7} y="211" width="1.3" height="4" rx="0.5" fill="#654321" />
                  <rect x={113.3} y="211" width="1.3" height="4" rx="0.5" fill="#654321" />
                  <rect x={116} y="211" width="1.3" height="4" rx="0.5" fill="#654321" />
                  <rect x={118.7} y="211" width="1.3" height="4" rx="0.5" fill="#654321" />
                  <rect x={110.7} y="214.7" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={113.3} y="214.7" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={116} y="214.7" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={118.7} y="214.7" width="1.3" height="0.7" fill="#2f2f2f" />
                  <path d={`M 108.7,205.7 Q 106.7,208 107.3,211`} stroke="#3a2a1a" strokeWidth="1" fill="none" />
                </g>

                {/* Chickens bathing in shallow water - 2/3 scale */}
                {[126, 131, 135].map((cx, ci) => (
                  <g key={`chicken-bath-${ci}`} className="chicken-bathing" style={{animationDelay: `${ci * 1.2}s`}}>
                    <ellipse cx={cx} cy="217" rx="2" ry="1.3" fill="#d4a574" />
                    <path d={`M ${cx-0.7},216.3 Q ${cx-1.3},215 ${cx},215.3 Q ${cx+1.3},215 ${cx+0.7},216.3`} fill="#b8946a" opacity="0.8" />
                    <ellipse cx={cx} cy="217.3" rx="3" ry="0.7" fill="#6a9aba" opacity="0.35" />
                    <circle cx={cx-1.3} cy="216" r="1" fill="#d4a574" />
                    <path d={`M ${cx-1.7},215.3 L ${cx-1.5},214.7 L ${cx-1.3},215 L ${cx-1.2},214.5 L ${cx-1},215.3 Z`} fill="#cc3333" />
                    <path d={`M ${cx-2.3},216 L ${cx-2.8},216 L ${cx-2.5},216.3 Z`} fill="#ffd700" />
                    <circle cx={cx-1.5} cy="215.7" r="0.2" fill="#2f2f2f" />
                    <circle cx={cx+1.3} cy="215.3" r="0.3" fill="#6a9aba" opacity="0.5" />
                    <circle cx={cx-0.7} cy="215" r="0.2" fill="#6a9aba" opacity="0.4" />
                  </g>
                ))}
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
              <path d="M 800,210 Q 900,210 1000,209 Q 1100,211 1200,209 Q 1300,208 1400,210 Q 1500,210 1600,209 Q 1700,209 1800,210 Q 1900,210 1950,210 Q 2000,210 2050,210 Q 2100,210 2100,210 L 2100,250 L 800,250 Z"
                    fill="#7aa87a" opacity="1" />
              <path d="M 800,208 Q 900,208 1000,207 Q 1100,209 1200,207 Q 1300,206 1400,208 Q 1500,209 1600,207 Q 1700,207 1800,208 Q 1900,208 1950,208 Q 2000,208 2050,208 Q 2100,208 2100,208 L 2100,250 L 800,250 Z"
                    fill="#8ab88a" opacity="1" />

              {/* Main road infrastructure */}
              <g opacity="1">
                {/* Concrete curb - top side */}
                <rect x="800" y="216" width="1200" height="2" fill="#b8b8b0" opacity="1" />
                {/* Asphalt road */}
                <rect x="800" y="218" width="1200" height="32" fill={`url(#roadGradient-${iteration})`} />
                {/* Concrete curb - bottom side */}
                <rect x="800" y="250" width="1200" height="1.5" fill="#b8b8b0" opacity="1" />

                {/* Center line - yellow dashed */}
                {Array.from({length: 40}).map((_, li) => (
                  <rect key={`center-line-${li}`} x={810 + li * 30} y="233.5" width="18" height="1" fill="#d4a017" opacity="0.9" />
                ))}

                {/* Crosswalks at intervals */}
                {[900, 1200, 1500, 1800].map((cx, ci) => (
                  <g key={`crosswalk-${ci}`}>
                    {Array.from({length: 6}).map((_, si) => (
                      <rect key={`cw-stripe-${ci}-${si}`} x={cx + si * 5} y="218" width="3" height="32" fill="#e8e8e0" opacity="0.6" />
                    ))}
                  </g>
                ))}

                {/* Sidewalk - concrete path between grass and road */}
                <rect x="800" y="212" width="1200" height="4" fill="#d4d0c8" opacity="1" />
                {/* Sidewalk expansion joints */}
                {Array.from({length: 60}).map((_, ji) => (
                  <rect key={`joint-${ji}`} x={810 + ji * 20} y="212" width="0.5" height="4" fill="#bab6ae" opacity="0.5" />
                ))}

                {/* Grass strips - continuous green to sidewalk edge */}
                <rect x="800" y="210" width="1200" height="2" fill="#7aa87a" opacity="1" />
                <rect x="800" y="251.5" width="1200" height="2" fill="#7aa87a" opacity="1" />
              </g>

              {/* Power lines along street */}
              <g opacity="0.6">
                {/* Power poles */}
                {[830, 980, 1130, 1280, 1430, 1580, 1730, 1880].map((px, pi) => (
                  <g key={`power-pole-${pi}`}>
                    <rect x={px} y="175" width="1.5" height="37" fill="#6b5a45" opacity="0.8" />
                    {/* Cross arm */}
                    <rect x={px-4} y="177" width="10" height="1" fill="#6b5a45" opacity="0.8" />
                    {/* Insulators */}
                    <rect x={px-3.5} y="176" width="1" height="2" fill="#4a4a4a" opacity="0.8" />
                    <rect x={px+4} y="176" width="1" height="2" fill="#4a4a4a" opacity="0.8" />
                  </g>
                ))}
                {/* Power wires connecting poles - slight sag */}
                {[830, 980, 1130, 1280, 1430, 1580, 1730].map((px, pi) => {
                  const nx = px + 150;
                  return (
                    <g key={`power-wire-${pi}`}>
                      <path d={`M ${px-3},177 Q ${(px + nx) / 2 - 3},181 ${nx-3},177`} stroke="#3a3a3a" strokeWidth="0.4" fill="none" />
                      <path d={`M ${px+5},177 Q ${(px + nx) / 2 + 5},181 ${nx+5},177`} stroke="#3a3a3a" strokeWidth="0.4" fill="none" />
                    </g>
                  );
                })}
              </g>


              {/* Ultra-detailed miniature houses - Victorian style (1/4 LARGER) */}
              {[820, 1120, 1420, 1720].map((x, i) => (
                <g key={`victorian-${i}`}>
                  {/* Foundation */}
                  <rect x={x-1} y="208" width="37" height="3" fill="#8a8a7a" opacity="0.9" />
                  {/* Driveway connecting to road */}
                  <rect x={x+30} y="208" width="8" height="8" fill="#c8c4bc" opacity="0.8" />
                  {/* Parked car in driveway */}
                  {i % 2 === 0 && (
                    <g>
                      <rect x={x+31} y="209" width="6" height="3.5" rx="0.8" fill={["#4a6a8a","#8a3030","#3a5a3a","#5a5a7a"][i]} opacity="0.9" />
                      <rect x={x+31.5} y="209.5" width="3" height="1.5" rx="0.5" fill="#8ab8d8" opacity="0.5" />
                      <circle cx={x+32} cy="212.5" r="0.8" fill="#2f2f2f" />
                      <circle cx={x+36} cy="212.5" r="0.8" fill="#2f2f2f" />
                    </g>
                  )}
                  {/* Main house body */}
                  <rect x={x} y="180" width="35" height="28" fill={`url(#victorianHouse-${iteration})`} />

                  {/* Steep Victorian roof with decorative peak */}
                  <path d={`M ${x-4},180 L ${x+17.5},162 L ${x+39},180 Z`} fill={`url(#victorianRoof-${iteration})`} />
                  <rect x={x+13.5} y="162" width="8" height="18" fill={`url(#victorianHouse-${iteration})`} />
                  <path d={`M ${x+11},162 L ${x+17.5},153 L ${x+24},162 Z`} fill={`url(#victorianRoof-${iteration})`} />
                  {/* Gutters along roofline */}
                  <path d={`M ${x-4},180 L ${x+39},180`} stroke="#7a6a5a" strokeWidth="0.8" opacity="0.7" />
                  {/* Downspout */}
                  <rect x={x+37} y="180" width="0.8" height="28" fill="#7a6a5a" opacity="0.6" />
                  {/* Roof vent */}
                  <rect x={x+6} y="170" width="3" height="2" rx="0.5" fill="#6a6a6a" opacity="0.6" />

                  {/* Windows - 6-pane (2x3 grid) */}
                  <g>
                    <rect x={x+5} y="186" width="6" height="9" fill="#4a4a4a" opacity="1" />
                    {[0, 1].map(col => [0, 1, 2].map(row => (
                      <rect key={`vic-left-${i}-${col}-${row}`} x={x + 5.4 + col * 2.8} y={186.4 + row * 2.8} width="2.4" height="2.4"
                        fill={isNightTime && isWindowLit(x + i * 100) ? "#FFD700" : "#6b8ea8"} opacity="1" />
                    )))}
                    <rect x={x+4.5} y="194.5" width="7" height="1" fill="#d4c4a8" opacity="1" />
                  </g>
                  <g>
                    <rect x={x+24} y="186" width="6" height="9" fill="#4a4a4a" opacity="1" />
                    {[0, 1].map(col => [0, 1, 2].map(row => (
                      <rect key={`vic-right-${i}-${col}-${row}`} x={x + 24.4 + col * 2.8} y={186.4 + row * 2.8} width="2.4" height="2.4"
                        fill={isNightTime && isWindowLit(x + i * 100 + 1) ? "#FFD700" : "#6b8ea8"} opacity="1" />
                    )))}
                    <rect x={x+23.5} y="194.5" width="7" height="1" fill="#d4c4a8" opacity="1" />
                  </g>
                  {/* Tower window */}
                  <g>
                    <rect x={x+14.5} y="169" width="6" height="7" fill="#4a4a4a" opacity="1" />
                    {[0, 1].map(col => [0, 1].map(row => (
                      <rect key={`vic-tower-${i}-${col}-${row}`} x={x + 14.8 + col * 2.8} y={169.3 + row * 3.2} width="2.4" height="2.8"
                        fill={isNightTime && isWindowLit(x + i * 100 + 2) ? "#FFA500" : "#6b8ea8"} opacity="1" />
                    )))}
                  </g>

                  {/* Front door with porch */}
                  <rect x={x+14} y="194" width="7" height="14" fill="#8b5a3c" opacity="1" />
                  <circle cx={x+19} cy="201" r="0.5" fill="#d4af37" opacity="1" />
                  <path d={`M ${x+10},194 L ${x+25},194`} stroke="#6d4428" strokeWidth="2" opacity="1" />
                  {/* Porch pillars */}
                  <rect x={x+11} y="194" width="1.5" height="14" fill="#e8e0d0" opacity="0.9" />
                  <rect x={x+22.5} y="194" width="1.5" height="14" fill="#e8e0d0" opacity="0.9" />
                  {/* Front stoop - 3 steps */}
                  <rect x={x+12} y="208" width="11" height="1.5" fill="#a0988a" opacity="0.9" />
                  <rect x={x+13} y="209.5" width="9" height="1.5" fill="#a0988a" opacity="0.8" />
                  <rect x={x+14} y="211" width="7" height="1.5" fill="#a0988a" opacity="0.7" />

                  {/* Chimney with smoke and cap */}
                  <rect x={x+28} y="168" width="4" height="12" fill="#a85757" opacity="1" />
                  <rect x={x+27.5} y="167.5" width="5" height="1" fill="#8a4a4a" opacity="1" />
                  <ellipse className="chimney-smoke" cx={x+30} cy="164" rx="2.5" ry="4" fill="#c4c4c4" opacity="1" />

                  {/* Decorative trim */}
                  <rect x={x} y="207" width="35" height="1.5" fill="#d4c4a8" opacity="1" />

                  {/* Foundation plantings - bushes along house base */}
                  <circle cx={x+4} cy="208" r="2" fill="#4a7a4a" opacity="0.8" />
                  <circle cx={x+8} cy="208.5" r="1.5" fill="#5a8a5a" opacity="0.7" />
                  <circle cx={x+27} cy="208.5" r="1.5" fill="#5a8a5a" opacity="0.7" />
                  <circle cx={x+31} cy="208" r="2" fill="#4a7a4a" opacity="0.8" />
                </g>
              ))}

              {/* Colonial style houses - symmetrical design (1/4 LARGER) */}
              {[1000, 1300, 1600, 1900].map((x, i) => (
                <g key={`colonial-${i}`}>
                  {/* Foundation */}
                  <rect x={x-1} y="208" width="42" height="3" fill="#8a8a7a" opacity="0.9" />
                  {/* Driveway */}
                  <rect x={x-10} y="208" width="10" height="8" fill="#c8c4bc" opacity="0.8" />
                  {/* Attached garage on left side */}
                  <rect x={x-12} y="193" width="12" height="15" fill={`url(#colonialHouse-${iteration})`} />
                  <path d={`M ${x-14},193 L ${x-6},187 L ${x+2},193 Z`} fill={`url(#colonialRoof-${iteration})`} />
                  <rect x={x-10} y="200" width="8" height="8" fill="#4a4a4a" opacity="0.9" />
                  {/* Garage door horizontal lines */}
                  <path d={`M ${x-10},202 L ${x-2},202 M ${x-10},204 L ${x-2},204 M ${x-10},206 L ${x-2},206`} stroke="#3a3a3a" strokeWidth="0.3" opacity="0.6" />
                  {/* Parked car in driveway */}
                  {i % 2 === 1 && (
                    <g>
                      <rect x={x-9} y="209" width="7" height="3.5" rx="0.8" fill={["#2f4f6f","#6f3f3f","#3f5f3f","#5f4f6f"][i]} opacity="0.9" />
                      <rect x={x-8.5} y="209.5" width="3.5" height="1.5" rx="0.5" fill="#8ab8d8" opacity="0.5" />
                      <circle cx={x-8} cy="212.5" r="0.8" fill="#2f2f2f" />
                      <circle cx={x-3.5} cy="212.5" r="0.8" fill="#2f2f2f" />
                    </g>
                  )}
                  {/* Main colonial structure */}
                  <rect x={x} y="178" width="40" height="30" fill={`url(#colonialHouse-${iteration})`} />

                  {/* Classic colonial roof */}
                  <path d={`M ${x-3},178 L ${x+20},164 L ${x+43},178 Z`} fill={`url(#colonialRoof-${iteration})`} />
                  {/* Gutters */}
                  <path d={`M ${x-3},178 L ${x+43},178`} stroke="#7a6a5a" strokeWidth="0.8" opacity="0.7" />
                  {/* Downspout */}
                  <rect x={x} y="178" width="0.8" height="30" fill="#7a6a5a" opacity="0.5" />
                  {/* Roof vent */}
                  <rect x={x+8} y="170" width="3" height="2" rx="0.5" fill="#6a6a6a" opacity="0.5" />

                  {/* 4 windows (2 stories, 2x3 pane) */}
                  <g>
                    <rect x={x+5} y="184" width="6" height="8" fill="#4a4a4a" opacity="1" />
                    {[0, 1].map(col => [0, 1, 2].map(row => (
                      <rect key={`col-tl-${i}-${col}-${row}`} x={x + 5.3 + col * 2.8} y={184.3 + row * 2.5} width="2.4" height="2.2"
                        fill={isNightTime && isWindowLit(x + i * 200) ? "#FFD700" : "#6b8ea8"} opacity="1" />
                    )))}
                  </g>
                  <g>
                    <rect x={x+29} y="184" width="6" height="8" fill="#4a4a4a" opacity="1" />
                    {[0, 1].map(col => [0, 1, 2].map(row => (
                      <rect key={`col-tr-${i}-${col}-${row}`} x={x + 29.3 + col * 2.8} y={184.3 + row * 2.5} width="2.4" height="2.2"
                        fill={isNightTime && isWindowLit(x + i * 200 + 1) ? "#FFA500" : "#6b8ea8"} opacity="1" />
                    )))}
                  </g>
                  <g>
                    <rect x={x+5} y="196" width="6" height="8" fill="#4a4a4a" opacity="1" />
                    {[0, 1].map(col => [0, 1, 2].map(row => (
                      <rect key={`col-bl-${i}-${col}-${row}`} x={x + 5.3 + col * 2.8} y={196.3 + row * 2.5} width="2.4" height="2.2"
                        fill={isNightTime && isWindowLit(x + i * 200 + 2) ? "#FFD700" : "#6b8ea8"} opacity="1" />
                    )))}
                  </g>
                  <g>
                    <rect x={x+29} y="196" width="6" height="8" fill="#4a4a4a" opacity="1" />
                    {[0, 1].map(col => [0, 1, 2].map(row => (
                      <rect key={`col-br-${i}-${col}-${row}`} x={x + 29.3 + col * 2.8} y={196.3 + row * 2.5} width="2.4" height="2.2"
                        fill={isNightTime && isWindowLit(x + i * 200 + 3) ? "#FFA500" : "#6b8ea8"} opacity="1" />
                    )))}
                  </g>

                  {/* Centered front door */}
                  <rect x={x+16} y="194" width="8" height="14" fill="#5a4a3a" opacity="1" />
                  <circle cx={x+21} cy="201" r="0.7" fill="#d4af37" opacity="1" />

                  {/* Front porch pillars */}
                  <rect x={x+12} y="194" width="2" height="14" fill="#e8e8e8" opacity="1" />
                  <rect x={x+26} y="194" width="2" height="14" fill="#e8e8e8" opacity="1" />
                  {/* Front stoop - 3 steps */}
                  <rect x={x+13} y="208" width="14" height="1.5" fill="#a0988a" opacity="0.9" />
                  <rect x={x+14} y="209.5" width="12" height="1.5" fill="#a0988a" opacity="0.8" />
                  <rect x={x+15} y="211" width="10" height="1.5" fill="#a0988a" opacity="0.7" />

                  {/* Chimney with cap and smoke */}
                  <rect x={x+34} y="168" width="4" height="10" fill="#a85757" opacity="1" />
                  <rect x={x+33.5} y="167.5" width="5" height="1" fill="#8a4a4a" opacity="1" />
                  <ellipse className="chimney-smoke" cx={x+36} cy="164" rx="2" ry="3" fill="#c4c4c4" opacity="0.3" />

                  {/* Shutters - all 8 windows */}
                  <rect x={x+3} y="184" width="1.2" height="8" fill="#2f2f2f" opacity="1" />
                  <rect x={x+11.8} y="184" width="1.2" height="8" fill="#2f2f2f" opacity="1" />
                  <rect x={x+27} y="184" width="1.2" height="8" fill="#2f2f2f" opacity="1" />
                  <rect x={x+35.8} y="184" width="1.2" height="8" fill="#2f2f2f" opacity="1" />
                  <rect x={x+3} y="196" width="1.2" height="8" fill="#2f2f2f" opacity="1" />
                  <rect x={x+11.8} y="196" width="1.2" height="8" fill="#2f2f2f" opacity="1" />
                  <rect x={x+27} y="196" width="1.2" height="8" fill="#2f2f2f" opacity="1" />
                  <rect x={x+35.8} y="196" width="1.2" height="8" fill="#2f2f2f" opacity="1" />

                  {/* Foundation plantings */}
                  <circle cx={x+4} cy="208.5" r="1.8" fill="#4a7a4a" opacity="0.7" />
                  <circle cx={x+36} cy="208.5" r="1.8" fill="#4a7a4a" opacity="0.7" />
                  <circle cx={x+39} cy="209" r="1.5" fill="#5a8a5a" opacity="0.6" />
                </g>
              ))}

              {/* Ranch style houses - low and wide (1/4 LARGER) */}
              {[880, 1180, 1480, 1780].map((x, i) => (
                <g key={`ranch-${i}`}>
                  {/* Foundation */}
                  <rect x={x-1} y="206" width="50" height="2.5" fill="#8a8a7a" opacity="0.9" />
                  {/* Driveway from garage to road */}
                  <rect x={x+38} y="206" width="10" height="10" fill="#c8c4bc" opacity="0.8" />
                  {/* Parked car in driveway */}
                  {i % 2 === 0 && (
                    <g>
                      <rect x={x+39} y="208" width="7" height="3.5" rx="0.8" fill={["#7a2a2a","#2a4a6a","#5a5a2a","#4a3a5a"][i]} opacity="0.9" />
                      <rect x={x+39.5} y="208.5" width="3.5" height="1.5" rx="0.5" fill="#8ab8d8" opacity="0.5" />
                      <circle cx={x+40} cy="211.5" r="0.8" fill="#2f2f2f" />
                      <circle cx={x+45} cy="211.5" r="0.8" fill="#2f2f2f" />
                    </g>
                  )}
                  {/* Wide, low ranch house */}
                  <rect x={x} y="188" width="48" height="18" fill={`url(#ranchHouse-${iteration})`} />

                  {/* Low-pitched roof */}
                  <path d={`M ${x-3},188 L ${x+24},179 L ${x+51},188 Z`} fill={`url(#ranchRoof-${iteration})`} />
                  {/* Gutters */}
                  <path d={`M ${x-3},188 L ${x+51},188`} stroke="#7a6a5a" strokeWidth="0.6" opacity="0.6" />
                  {/* Downspout */}
                  <rect x={x+48} y="188" width="0.7" height="18" fill="#7a6a5a" opacity="0.5" />

                  {/* Horizontal windows - Ranch style 6-pane (3x2 grid) */}
                  <g>
                    <rect x={x+6} y="191" width="10" height="5" fill="#4a4a4a" opacity="1" />
                    {[0, 1, 2].map(col => [0, 1].map(row => (
                      <rect key={`ranch-left-${i}-${col}-${row}`} x={x + 6.3 + col * 3.2} y={191.3 + row * 2.3} width="2.8" height="2"
                        fill={isNightTime && isWindowLit(x + i * 150) ? "#FFD700" : "#6b8ea8"} opacity="1" />
                    )))}
                  </g>
                  <g>
                    <rect x={x+26} y="191" width="10" height="5" fill="#4a4a4a" opacity="1" />
                    {[0, 1, 2].map(col => [0, 1].map(row => (
                      <rect key={`ranch-right-${i}-${col}-${row}`} x={x + 26.3 + col * 3.2} y={191.3 + row * 2.3} width="2.8" height="2"
                        fill={isNightTime && isWindowLit(x + i * 150 + 1) ? "#FFA500" : "#6b8ea8"} opacity="1" />
                    )))}
                  </g>

                  {/* Attached garage */}
                  <rect x={x+38} y="189" width="9" height="17" fill="#c9b18f" opacity="1" />
                  <rect x={x+39} y="199" width="7" height="7" fill="#4a4a4a" opacity="0.9" />
                  {/* Garage door horizontal lines */}
                  <path d={`M ${x+39},201 L ${x+46},201 M ${x+39},203 L ${x+46},203 M ${x+39},205 L ${x+46},205`} stroke="#3a3a3a" strokeWidth="0.3" opacity="0.5" />

                  {/* Front door with knob */}
                  <rect x={x+19} y="196" width="5" height="10" fill="#6b5a45" opacity="1" />
                  <circle cx={x+23} cy="201" r="0.4" fill="#d4af37" opacity="1" />

                  {/* Front stoop - 2 steps */}
                  <rect x={x+17} y="206" width="9" height="1.5" fill="#a0988a" opacity="0.9" />
                  <rect x={x+18} y="207.5" width="7" height="1.5" fill="#a0988a" opacity="0.8" />

                  {/* Foundation plantings - low hedge along front */}
                  {[2, 8, 14, 28, 34].map((ox, oi) => (
                    <ellipse key={`ranch-bush-${i}-${oi}`} cx={x + ox} cy="206.5" rx="2.5" ry="1.5" fill="#5a8a5a" opacity="0.7" />
                  ))}
                </g>
              ))}

              {/* Cottage style houses - small and cozy (1/4 LARGER) */}
              {[1060, 1360, 1660, 1960].map((x, i) => (
                <g key={`cottage-${i}`}>
                  {/* Foundation */}
                  <rect x={x-1} y="207" width="32" height="2.5" fill="#8a8a7a" opacity="0.9" />
                  {/* Stone walkway path to door */}
                  {[0, 3, 6, 9].map((step, si) => (
                    <rect key={`cottage-path-${i}-${si}`} x={x+13} y={209.5 + step * 0.8} width="4" height="2" rx="0.5" fill="#b8b0a0" opacity="0.7" />
                  ))}
                  {/* Cottage body */}
                  <rect x={x} y="188" width="30" height="19" fill={`url(#cottageHouse-${iteration})`} />

                  {/* Rounded cottage roof */}
                  <path d={`M ${x-3},188 Q ${x+15},175 ${x+33},188 Z`} fill={`url(#cottageRoof-${iteration})`} />
                  {/* Gutter along roofline */}
                  <path d={`M ${x-3},188 Q ${x+15},188.5 ${x+33},188`} stroke="#7a6a5a" strokeWidth="0.6" fill="none" opacity="0.6" />
                  {/* Downspout */}
                  <rect x={x-1} y="188" width="0.7" height="19" fill="#7a6a5a" opacity="0.5" />

                  {/* Arched door */}
                  <path d={`M ${x+11},193 L ${x+11},207 L ${x+19},207 L ${x+19},193 Q ${x+15},190 ${x+11},193 Z`} fill="#a85757" opacity="1" />
                  {/* Door knob */}
                  <circle cx={x+17} cy="201" r="0.4" fill="#d4af37" opacity="1" />
                  {/* Front stoop */}
                  <rect x={x+10} y="207" width="10" height="1.5" fill="#a0988a" opacity="0.9" />
                  <rect x={x+11} y="208.5" width="8" height="1.5" fill="#a0988a" opacity="0.8" />

                  {/* Cottage windows - 4-pane */}
                  <g>
                    <rect x={x+3} y="191" width="5" height="5" fill="#4a4a4a" opacity="1" />
                    {[0, 1].map(col => [0, 1].map(row => (
                      <rect key={`cottage-left-${i}-${col}-${row}`} x={x + 3.3 + col * 2.3} y={191.3 + row * 2.3} width="2" height="2"
                        fill={isNightTime && isWindowLit(x + i * 120) ? "#FFD700" : "#6b8ea8"} opacity="1" />
                    )))}
                  </g>
                  <g>
                    <rect x={x+22} y="191" width="5" height="5" fill="#4a4a4a" opacity="1" />
                    {[0, 1].map(col => [0, 1].map(row => (
                      <rect key={`cottage-right-${i}-${col}-${row}`} x={x + 22.3 + col * 2.3} y={191.3 + row * 2.3} width="2" height="2"
                        fill={isNightTime && isWindowLit(x + i * 120 + 1) ? "#FFA500" : "#6b8ea8"} opacity="1" />
                    )))}
                  </g>

                  {/* Window boxes with flowers */}
                  <rect x={x+2.5} y="196.5" width="6" height="1.5" fill="#8b7355" opacity="1" />
                  <rect x={x+21.5} y="196.5" width="6" height="1.5" fill="#8b7355" opacity="1" />
                  <circle cx={x+4} cy="196" r="0.8" fill="#ff69b4" opacity="1" />
                  <circle cx={x+6.5} cy="196" r="0.8" fill="#ffd700" opacity="1" />
                  <circle cx={x+5.3} cy="195.8" r="0.6" fill="#9370db" opacity="0.8" />
                  <circle cx={x+23} cy="196" r="0.8" fill="#ff69b4" opacity="1" />
                  <circle cx={x+25.5} cy="196" r="0.8" fill="#ffd700" opacity="1" />
                  <circle cx={x+24.3} cy="195.8" r="0.6" fill="#9370db" opacity="0.8" />

                  {/* Small chimney with cap */}
                  <rect x={x+26} y="182" width="2.5" height="8" fill="#a85757" opacity="1" />
                  <rect x={x+25.5} y="181.5" width="3.5" height="1" fill="#8a4a4a" opacity="1" />
                  <ellipse cx={x+27.5} cy="179.5" rx="1.2" ry="1.5" fill="#c4c4c4" opacity="0.2" />

                  {/* White picket garden fence - gap at doorway */}
                  {[0, 3, 6, 21, 24, 27].map((offset, fi) => (
                    <g key={`cottage-fence-${i}-${fi}`}>
                      <rect x={x + offset} y="207" width="1.2" height="4" fill="#f5f5f0" opacity="0.9" />
                      <path d={`M ${x+offset},207 L ${x+offset+0.6},206 L ${x+offset+1.2},207`} fill="#f5f5f0" opacity="0.9" />
                    </g>
                  ))}
                  {/* Horizontal fence rails */}
                  <rect x={x} y="208.5" width="9" height="0.5" fill="#f5f5f0" opacity="0.7" />
                  <rect x={x+21} y="208.5" width="9" height="0.5" fill="#f5f5f0" opacity="0.7" />

                  {/* Cottage garden - flowers and bushes around house */}
                  <circle cx={x+2} cy="207.5" r="2" fill="#5a8a5a" opacity="0.7" />
                  <circle cx={x+28} cy="207.5" r="2" fill="#5a8a5a" opacity="0.7" />
                  {/* Small garden flowers */}
                  <circle cx={x+1} cy="209" r="0.5" fill="#ff69b4" opacity="0.8" />
                  <circle cx={x+3} cy="209.5" r="0.5" fill="#ffd700" opacity="0.8" />
                  <circle cx={x+27} cy="209" r="0.5" fill="#ff69b4" opacity="0.8" />
                  <circle cx={x+29} cy="209.5" r="0.5" fill="#ffd700" opacity="0.8" />
                </g>
              ))}

              {/* Modern style houses - clean lines (1/4 LARGER) */}
              {[940, 1240, 1540, 1840].map((x, i) => (
                <g key={`modern-${i}`}>
                  {/* Foundation - modern concrete */}
                  <rect x={x-1} y="207" width="35" height="2.5" fill="#9a9a92" opacity="0.9" />
                  {/* Driveway - modern paved */}
                  <rect x={x-10} y="207" width="10" height="9" fill="#a0a098" opacity="0.7" />
                  {/* Modern carport/garage */}
                  <rect x={x-10} y="195" width="10" height="12" fill={`url(#modernHouse-${iteration})`} />
                  <rect x={x-9} y="195" width="8" height="0.8" fill={`url(#modernRoof-${iteration})`} />
                  <rect x={x-8} y="201" width="7" height="6" fill="#3a4a5a" opacity="0.8" />
                  {/* Parked car */}
                  {i % 2 === 1 && (
                    <g>
                      <rect x={x-9} y="208" width="7" height="3.5" rx="1" fill={["#e8e8e8","#1a1a2a","#c8c8c8","#2a2a3a"][i]} opacity="0.9" />
                      <rect x={x-8.5} y="208.5" width="3.5" height="1.5" rx="0.5" fill="#8ab8d8" opacity="0.5" />
                      <circle cx={x-8} cy="211.5" r="0.8" fill="#2f2f2f" />
                      <circle cx={x-3.5} cy="211.5" r="0.8" fill="#2f2f2f" />
                    </g>
                  )}
                  {/* Cubic modern house */}
                  <rect x={x} y="183" width="33" height="24" fill={`url(#modernHouse-${iteration})`} />

                  {/* Flat/minimal roof with overhang */}
                  <rect x={x-2} y="180" width="37" height="3" fill={`url(#modernRoof-${iteration})`} />
                  {/* Roof edge drip line */}
                  <rect x={x-2} y="182.5" width="37" height="0.5" fill="#5a5a5a" opacity="0.5" />

                  {/* Large modern windows - floor-to-ceiling */}
                  <g>
                    <rect x={x+3} y="188" width="10" height="14" fill="#3a4a5a" opacity="1" />
                    {[0, 1, 2].map(col => [0, 1, 2, 3].map(row => (
                      <rect key={`modern-left-${i}-${col}-${row}`} x={x + 3.3 + col * 3.2} y={188.3 + row * 3.4} width="2.9" height="3.1"
                        fill={isNightTime && isWindowLit(x + i * 180) ? "#FFD700" : "#6b8ea8"} opacity="1" />
                    )))}
                  </g>
                  <g>
                    <rect x={x+20} y="188" width="10" height="14" fill="#3a4a5a" opacity="1" />
                    {[0, 1, 2].map(col => [0, 1, 2, 3].map(row => (
                      <rect key={`modern-right-${i}-${col}-${row}`} x={x + 20.3 + col * 3.2} y={188.3 + row * 3.4} width="2.9" height="3.1"
                        fill={isNightTime && isWindowLit(x + i * 180 + 1) ? "#FFA500" : "#6b8ea8"} opacity="1" />
                    )))}
                  </g>

                  {/* Minimal door with handle */}
                  <rect x={x+14} y="196" width="5" height="11" fill="#5a7a8a" opacity="1" />
                  <rect x={x+18} y="200" width="0.8" height="3" rx="0.3" fill="#c0c0c0" opacity="0.8" />
                  {/* Front step */}
                  <rect x={x+13} y="207" width="7" height="1.5" fill="#9a9a92" opacity="0.9" />

                  {/* Solar panels on roof */}
                  <rect x={x+2} y="181" width="12" height="1.5" fill="#3d5866" opacity="1" />
                  <rect x={x+18} y="181" width="12" height="1.5" fill="#3d5866" opacity="1" />

                  {/* Modern landscaping - geometric trimmed shrubs + ornamental grass */}
                  <ellipse cx={x+5} cy="208.5" rx="3" ry="2" fill="#8bc34a" opacity="0.9" />
                  <ellipse cx={x+28} cy="208.5" rx="3" ry="2" fill="#8bc34a" opacity="0.9" />
                  {/* Ornamental grass */}
                  <path d={`M ${x+16},207 Q ${x+15},204 ${x+14},207 Q ${x+16},203 ${x+17},207 Q ${x+15.5},204 ${x+16.5},207`} stroke="#7aaa5a" strokeWidth="0.4" fill="none" opacity="0.6" />
                </g>
              ))}

              {/* Yard trees and landscaping - varied sizes, between houses */}
              <g opacity="1">
                {[868, 986, 1050, 1105, 1168, 1286, 1350, 1405, 1468, 1586, 1650, 1705, 1768, 1886].map((x, i) => {
                  const isMature = i % 3 === 0;
                  const isMedium = i % 3 === 1;
                  const trunkH = isMature ? 10 : isMedium ? 7 : 5;
                  const foliageR = isMature ? 6 : isMedium ? 4.5 : 3;
                  const foliageY = isMature ? 197 : isMedium ? 200 : 203;
                  const trunkY = 210 - trunkH;
                  return (
                  <g key={`yard-tree-${i}`}>
                    <rect x={x} y={trunkY} width={isMature ? 3 : 2} height={trunkH} fill="#6b5a45" opacity="1" />
                    <circle cx={x+1} cy={foliageY} r={foliageR} fill={i % 2 === 0 ? "#4a7a4a" : "#5a8a5a"} opacity="1" />
                    {isMature && <>
                      <circle cx={x-3} cy={foliageY+2} r={foliageR * 0.7} fill="#5a8a5a" opacity="0.9" />
                      <circle cx={x+5} cy={foliageY+2} r={foliageR * 0.7} fill="#5a8a5a" opacity="0.9" />
                    </>}
                  </g>
                  );
                })}
              </g>

              {/* White picket fences between some properties */}
              <g opacity="0.75">
                {[860, 970, 1160, 1270, 1460, 1570, 1760, 1870].map((fx, fi) => (
                  <g key={`prop-fence-${fi}`}>
                    {/* Fence posts */}
                    <rect x={fx} y="207" width="1" height="5" fill="#e8e0d0" opacity="0.9" />
                    <rect x={fx+8} y="207" width="1" height="5" fill="#e8e0d0" opacity="0.9" />
                    {/* Horizontal rails */}
                    <rect x={fx} y="208" width="9" height="0.5" fill="#e8e0d0" opacity="0.8" />
                    <rect x={fx} y="210" width="9" height="0.5" fill="#e8e0d0" opacity="0.8" />
                    {/* Pickets */}
                    {Array.from({length: 4}).map((_, pi) => (
                      <g key={`picket-${fi}-${pi}`}>
                        <rect x={fx + 1.5 + pi * 2} y="207" width="0.8" height="5" fill="#f5f5f0" opacity="0.85" />
                        <path d={`M ${fx + 1.5 + pi * 2},207 L ${fx + 1.9 + pi * 2},206 L ${fx + 2.3 + pi * 2},207`} fill="#f5f5f0" opacity="0.85" />
                      </g>
                    ))}
                  </g>
                ))}
              </g>

              {/* Street lights along the road - ON SIDEWALK CURB */}
              <g opacity="1">
                {[840, 990, 1140, 1290, 1440, 1590, 1740, 1890].map((x, i) => (
                  <g key={`street-light-${i}`}>
                    {/* Light pole on sidewalk, base at curb */}
                    <rect x={x} y="198" width="1.5" height="18" fill="#6a6a6a" opacity="1" />
                    {/* Light arm curving over road */}
                    <path d={`M ${x+0.75},199 Q ${x+4},197 ${x+8},198`} stroke="#6a6a6a" strokeWidth="1.2" fill="none" />
                    {/* Light fixture - hanging down */}
                    <rect x={x+6.5} y="198" width="3" height="2" rx="0.5" fill="#5a5a5a" opacity="1" />
                    {/* Light glow */}
                    <circle cx={x+8} cy="201" r="2.5" fill="#ffd700" opacity="0.15" />
                    <circle cx={x+8} cy="200.5" r="1.5" fill="#ffd700" opacity="0.9" />
                    <circle cx={x+8} cy="200.5" r="0.8" fill="#ffeb3b" className="window-light" />
                  </g>
                ))}
              </g>

              {/* Moving cars on the road */}
              <g>
                {[
                  {x: 850, y: 222, color: '#3a5a8a', dir: 1, type: 'sedan'},
                  {x: 1050, y: 240, color: '#8a3a3a', dir: -1, type: 'sedan'},
                  {x: 1350, y: 223, color: '#e8e8e0', dir: 1, type: 'suv'},
                  {x: 1550, y: 241, color: '#2a4a2a', dir: -1, type: 'sedan'},
                  {x: 1750, y: 222, color: '#5a5a7a', dir: 1, type: 'sedan'},
                  {x: 1950, y: 240, color: '#8a6a3a', dir: -1, type: 'suv'},
                ].map((car, ci) => (
                  <g key={`road-car-${ci}`}>
                    {/* Car body */}
                    <rect x={car.x} y={car.y} width={car.type === 'suv' ? 14 : 12} height={car.type === 'suv' ? 5 : 4} rx="1.5" fill={car.color} opacity="0.9" />
                    {/* Car roof/cabin */}
                    <rect x={car.x + (car.dir > 0 ? 3 : 2)} y={car.y - 2.5} width={car.type === 'suv' ? 8 : 6} height="2.8" rx="1" fill={car.color} opacity="0.85" />
                    {/* Windshield */}
                    <rect x={car.x + (car.dir > 0 ? 7 : 2.5)} y={car.y - 2} width="2.5" height="2" rx="0.5" fill="#8ab8d8" opacity="0.6" />
                    {/* Rear window */}
                    <rect x={car.x + (car.dir > 0 ? 3.5 : 7.5)} y={car.y - 2} width="2" height="2" rx="0.5" fill="#8ab8d8" opacity="0.5" />
                    {/* Wheels */}
                    <circle cx={car.x + 2.5} cy={car.y + (car.type === 'suv' ? 5 : 4)} r="1.3" fill="#2f2f2f" />
                    <circle cx={car.x + (car.type === 'suv' ? 11.5 : 9.5)} cy={car.y + (car.type === 'suv' ? 5 : 4)} r="1.3" fill="#2f2f2f" />
                    <circle cx={car.x + 2.5} cy={car.y + (car.type === 'suv' ? 5 : 4)} r="0.5" fill="#8a8a8a" />
                    <circle cx={car.x + (car.type === 'suv' ? 11.5 : 9.5)} cy={car.y + (car.type === 'suv' ? 5 : 4)} r="0.5" fill="#8a8a8a" />
                    {/* Headlights/taillights */}
                    <rect x={car.dir > 0 ? car.x + (car.type === 'suv' ? 13 : 11) : car.x} y={car.y + 0.5} width="1" height="1.5" rx="0.3" fill={car.dir > 0 ? '#ffd700' : '#cc3333'} opacity="0.8" />
                    <rect x={car.dir > 0 ? car.x : car.x + (car.type === 'suv' ? 13 : 11)} y={car.y + 0.5} width="1" height="1.5" rx="0.3" fill={car.dir > 0 ? '#cc3333' : '#ffd700'} opacity="0.8" />
                  </g>
                ))}
              </g>

              {/* Background landscape - tiny house silhouettes behind homes */}
              <g opacity="0.25">
                {/* Distant hillside with tiny houses */}
                <path d="M 800,185 Q 900,182 1000,184 Q 1100,181 1200,183 Q 1300,180 1400,182 Q 1500,183 1600,181 Q 1700,183 1800,182 Q 1900,184 2000,185" stroke="none" fill="#6a8a6a" opacity="0.4" />
                {/* Tiny background houses - just silhouettes */}
                {[830, 870, 920, 960, 1010, 1060, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950].map((bx, bi) => {
                  const bh = 3 + (bi % 3) * 1.5;
                  const bw = 5 + (bi % 2) * 2;
                  const by = 182 - (bi % 5) * 0.8;
                  return (
                    <g key={`bg-house-${bi}`}>
                      <rect x={bx} y={by} width={bw} height={bh} fill="#5a6a5a" opacity="0.6" />
                      <path d={`M ${bx-0.5},${by} L ${bx + bw/2},${by - 2 - (bi % 2)} L ${bx + bw + 0.5},${by} Z`} fill="#4a5a4a" opacity="0.5" />
                      {bi % 3 === 0 && <rect x={bx + 1} y={by + 1} width="1" height="1" fill="#8a9a7a" opacity="0.5" />}
                    </g>
                  );
                })}
                {/* Background trees between houses */}
                {[845, 890, 935, 985, 1035, 1080, 1125, 1175, 1225, 1275, 1325, 1375, 1425, 1475, 1525, 1575, 1625, 1675, 1725, 1775, 1825, 1875, 1925].map((tx, ti) => (
                  <g key={`bg-tree-${ti}`}>
                    <rect x={tx} y={183 - (ti % 3)} width="0.8" height={3 + (ti % 2)} fill="#4a5a3a" opacity="0.5" />
                    <circle cx={tx + 0.4} cy={181 - (ti % 3)} r={1.5 + (ti % 2) * 0.5} fill="#5a7a4a" opacity="0.5" />
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
              <path d="M 2000,210 Q 2100,210 2200,210 L 3400,210 Q 3500,209 3600,208 Q 3650,207 3700,206 Q 3750,205 3800,205 Q 3850,203 3900,200 L 3900,250 L 2000,250 Z"
                    fill="#7aa87a" opacity="1" />
              <path d="M 2000,208 Q 2100,208 2200,208 L 3400,208 Q 3500,207 3600,206 Q 3650,206 3700,205 Q 3750,204 3800,204 Q 3850,202 3900,199 L 3900,250 L 2000,250 Z"
                    fill="#8ab88a" opacity="1" />

              {/* Pedestrian-friendly streets with bike lanes */}
              <g opacity="1">
                {/* Main street at bottom - aligned with suburbs road (y=218) */}
                <rect x="2000" y="218" width="1800" height="32" fill={`url(#roadGradient-${iteration})`} />

                {/* Sidewalk/pedestrian path - matches suburbs sidewalk bottom edge */}
                <rect x="2000" y="214" width="1800" height="4" fill="#d8d8d8" opacity="1" />

                {/* Grass strip between road and sidewalk - sits at suburbs sidewalk level */}
                <rect x="2000" y="210" width="1800" height="4" fill="#7aa87a" opacity="1" />

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

              {/* Rolling hills - multi-layered for atmospheric depth */}
              {/* Distant background hills */}
              <path d="M 3800,200 Q 3900,192 4000,195 Q 4150,186 4300,192 Q 4450,188 4600,193 Q 4750,185 4900,190 Q 5000,195 5000,198 L 5000,250 L 3800,250 Z"
                    fill="#4a7a4a" opacity="0.5" />
              <path d="M 3800,197 Q 3900,189 4050,193 Q 4200,183 4350,190 Q 4500,195 4650,187 Q 4800,183 4950,192 Q 5000,195 5000,197 L 5000,250 L 3800,250 Z"
                    fill="#5a8a5a" opacity="0.45" />
              {/* Mid-ground hills */}
              <path d="M 3800,205 Q 3900,200 4000,202 Q 4100,215 4200,200 Q 4300,192 4400,202 Q 4500,205 4600,197 Q 4700,202 4800,205 Q 4900,197 5000,210 L 5000,250 L 3800,250 Z"
                    fill="#7aa87a" opacity="1" />
              <path d="M 3800,204 Q 3900,199 4000,200 Q 4100,208 4200,197 Q 4300,187 4400,197 Q 4500,203 4600,192 Q 4700,187 4800,194 Q 4900,190 5000,205 L 5000,250 L 3800,250 Z"
                    fill="#8ab88a" opacity="1" />

              {/* Dirt paths connecting structures */}
              <path d="M 4013,205 Q 4040,208 4060,206 Q 4075,205 4085,205" stroke="#b89a6a" strokeWidth="2.5" fill="none" opacity="0.6" />
              <path d="M 4469,204 Q 4500,207 4520,205 Q 4550,204 4570,205" stroke="#b89a6a" strokeWidth="2" fill="none" opacity="0.5" />
              <path d="M 4709,203 Q 4730,206 4750,204 Q 4770,203 4780,204" stroke="#b89a6a" strokeWidth="2" fill="none" opacity="0.5" />

              {/* Crop field rows */}
              <g opacity="0.7">
                {/* Wheat field near Barn #1 */}
                <rect x="4100" y="201" width="30" height="8" fill="#d4b87a" opacity="0.4" rx="1" />
                {Array.from({length: 7}).map((_, i) => (
                  <g key={`wheat-end-${i}`}>
                    <rect x={4102 + i * 4} y="199" width="1" height="8" fill="#c9a855" opacity="0.8" rx="0.5" />
                    <ellipse cx={4102.5 + i * 4} cy="198.5" rx="1" ry="0.8" fill="#d4b87a" opacity="0.7" />
                  </g>
                ))}
              </g>

              {/* Farm pond with cattails - 2/3 scale */}
              <g>
                <ellipse cx="4830" cy="217" rx="15" ry="4" fill="#5a7a5a" opacity="0.4" />
                <ellipse cx="4830" cy="217" rx="12" ry="3" fill="#4a7a9a" opacity="0.7" />
                <ellipse cx="4828" cy="216.5" rx="7" ry="1.3" fill="#6a9aba" opacity="0.4" />
                <ellipse cx="4832" cy="217.5" rx="4" ry="0.7" fill="#5a8aaa" opacity="0.3" />
                <rect x="4818" y="213" width="0.7" height="5" fill="#5a6a3a" opacity="0.8" />
                <ellipse cx="4818.3" cy="212.7" rx="0.8" ry="1.3" fill="#6b5a3a" opacity="0.8" />
                <rect x="4820" y="213.5" width="0.7" height="4.5" fill="#5a6a3a" opacity="0.8" />
                <ellipse cx="4820.3" cy="213.2" rx="0.7" ry="1.2" fill="#6b5a3a" opacity="0.8" />
                <rect x="4841" y="213.5" width="0.7" height="4.5" fill="#5a6a3a" opacity="0.8" />
                <ellipse cx="4841.3" cy="213.2" rx="0.8" ry="1.3" fill="#6b5a3a" opacity="0.8" />
              </g>

              {/* Wildflower patches */}
              <g opacity="0.9">
                {[3850, 3853, 3857, 3860, 3852, 3858].map((fx, fi) => (
                  <circle key={`flower-d-${fi}`} cx={fx} cy={213 + (fi % 3) * 1.5} r="0.8" fill={['#ff69b4', '#ffd700', '#9370db', '#ff6347', '#ffd700', '#ff69b4'][fi]} opacity="1" />
                ))}
                {[4300, 4303, 4307, 4310, 4302, 4308].map((fx, fi) => (
                  <circle key={`flower-e-${fi}`} cx={fx} cy={212 + (fi % 3) * 1.5} r="0.8" fill={['#ffd700', '#ff69b4', '#ff6347', '#9370db', '#ff69b4', '#ffd700'][fi]} opacity="1" />
                ))}
                {[4600, 4603, 4607, 4610, 4602, 4608].map((fx, fi) => (
                  <circle key={`flower-f-${fi}`} cx={fx} cy={213 + (fi % 3) * 1.5} r="0.8" fill={['#9370db', '#ffd700', '#ff69b4', '#ffd700', '#ff6347', '#9370db'][fi]} opacity="1" />
                ))}
              </g>

              {/* White picket fences with sturdy posts - CONTINUOUS */}
              <g>
                {/* Fence posts every 40px */}
                {Array.from({length: 31}).map((_, i) => (
                  <rect key={`post-end-${i}`} x={3800 + i * 40 - 1} y="223" width="3" height="13" fill="#e8e0d0" opacity="1" />
                ))}
                {/* Pickets */}
                {Array.from({length: 150}).map((_, i) => (
                  <g key={`picket-end-${i}`}>
                    <rect x={3800 + i * 8} y="225" width="2" height="10" fill="#f5f5f5" opacity="1" />
                    <path d={`M ${3800 + i * 8},225 L ${3800 + i * 8 + 1},223 L ${3800 + i * 8 + 2},225 Z`} fill="#f5f5f5" opacity="1" />
                  </g>
                ))}
                {/* Horizontal rails */}
                <rect x="3800" y="228" width="1200" height="1.5" fill="#f0ece0" opacity="1" />
                <rect x="3800" y="232" width="1200" height="1.5" fill="#f0ece0" opacity="1" />
              </g>

              {/* Building shadows/foundations - ground all structures */}
              <g opacity="0.3">
                <ellipse cx="3995" cy="206" rx="28" ry="3" fill="#2f3f2f" />
                <ellipse cx="4022.5" cy="206" rx="8" ry="2.5" fill="#2f3f2f" />
                <ellipse cx="4260" cy="203" rx="20" ry="2.5" fill="#2f3f2f" />
                <ellipse cx="4282.5" cy="203" rx="6" ry="2" fill="#2f3f2f" />
                <ellipse cx="4456" cy="203" rx="16" ry="2.5" fill="#2f3f2f" />
                <ellipse cx="4692" cy="203" rx="22" ry="2.5" fill="#2f3f2f" />
                <ellipse cx="4717.5" cy="203" rx="6" ry="2" fill="#2f3f2f" />
                <ellipse cx="4908" cy="203" rx="18" ry="2.5" fill="#2f3f2f" />
                {/* Farmhouse shadows */}
                <ellipse cx="4089" cy="206" rx="12" ry="2" fill="#2f3f2f" />
                <ellipse cx="4368" cy="206" rx="10" ry="2" fill="#2f3f2f" />
                <ellipse cx="4628" cy="206" rx="11" ry="2" fill="#2f3f2f" />
                <ellipse cx="4857" cy="206" rx="9" ry="2" fill="#2f3f2f" />
                {/* Tractor shadows */}
                <ellipse cx="4059" cy="208" rx="10" ry="2" fill="#2f3f2f" />
                <ellipse cx="4509" cy="208" rx="10" ry="2" fill="#2f3f2f" />
                <ellipse cx="4759" cy="208" rx="10" ry="2" fill="#2f3f2f" />
                <ellipse cx="4939" cy="208" rx="10" ry="2" fill="#2f3f2f" />
              </g>

              {/* Red barns - matching opening, extended (1/3 LARGER) */}
              <g>
                {/* Barn 1 - Large (fully detailed like Phase 1 Barn 1) */}
                {/* Foundation */}
                <rect x="3969" y="204" width="45" height="2" fill="#6a6a5a" opacity="0.8" />
                <rect x="3970" y="178" width="43" height="27" fill="#c73e3e" opacity="1" />
                <path d="M 3965,178 L 3991.5,158 L 4018,178 Z" fill="#a83232" opacity="1" />
                {/* Roof eave overhang */}
                <path d="M 3965,178 L 4018,178" stroke="#8a2828" strokeWidth="1.5" opacity="1" />
                {/* Wood plank texture lines */}
                <path d="M 3972,185 L 4012,185 M 3972,192 L 4012,192 M 3972,199 L 4012,199" stroke="#a83232" strokeWidth="0.7" opacity="1" />
                {/* Barn doors with cross pattern */}
                <rect x="3986" y="188" width="11" height="17" fill="#6d4428" opacity="1" />
                <path d="M 3991.5,193 L 3991.5,205 M 3986,198 L 3997,198" stroke="#5a3a2a" strokeWidth="1.3" opacity="1" />
                {/* Hayloft windows */}
                <rect x="3975" y="183" width="6" height="7" fill="#4a4a4a" opacity="1" />
                <rect x="4000" y="183" width="6" height="7" fill="#4a4a4a" opacity="1" />
                {/* Cross beams on sides */}
                <path d="M 3970,178 L 3970,205 M 4013,178 L 4013,205" stroke="#a83232" strokeWidth="1" opacity="1" />
                {/* Weather vane on top */}
                <rect x="3990.5" y="155" width="1.5" height="7" fill="#4a4a4a" opacity="1" />
                <path d="M 3985,158 L 3991.5,155 L 3991.5,161 Z" fill="#d4af37" opacity="1" />
                <path d="M 3998,158 L 3991.5,155 L 3991.5,161 Z" fill="#d4af37" opacity="1" />
                {/* Silo next to barn */}
                <rect x="4017" y="170" width="11" height="35" fill="#d4d4d4" opacity="1" />
                <ellipse cx="4022.5" cy="170" rx="5.5" ry="2.5" fill="#b8b8b8" opacity="1" />
                {/* Silo roof */}
                <path d="M 4019,168 L 4022.5,161 L 4026,168" fill="#a83232" opacity="1" />
                {/* Silo bands */}
                <rect x="4017" y="183" width="11" height="1.5" fill="#a8a8a8" opacity="1" />
                <rect x="4017" y="194" width="11" height="1.5" fill="#a8a8a8" opacity="1" />
                {/* Silo ladder */}
                <rect x="4022" y="175" width="1" height="25" fill="#8a8a8a" opacity="1" />
                {Array.from({length: 8}).map((_, li) => (
                  <rect key={`ladder-end-${li}`} x="4020" y={178 + li * 3} width="5" height="0.5" fill="#8a8a8a" opacity="1" />
                ))}

                {/* Barn 2 - Medium (detailed like Phase 1 Barn 2) */}
                {/* Foundation */}
                <rect x="4241" y="201" width="34" height="2" fill="#6a6a5a" opacity="0.8" />
                <rect x="4242" y="182" width="32" height="20" fill="#c73e3e" opacity="1" />
                <path d="M 4238,182 L 4258,166 L 4278,182 Z" fill="#a83232" opacity="1" />
                {/* Roof eave overhang */}
                <path d="M 4238,182 L 4278,182" stroke="#8a2828" strokeWidth="1.2" opacity="1" />
                <rect x="4252" y="189" width="8" height="13" fill="#6d4428" opacity="1" />
                {/* Barn door X pattern */}
                <path d="M 4252,189 L 4260,202 M 4260,189 L 4252,202" stroke="#5a3a2a" strokeWidth="0.8" opacity="1" />
                {/* Hayloft windows */}
                <rect x="4244" y="185" width="5" height="6" fill="#4a4a4a" opacity="1" />
                <rect x="4265" y="185" width="5" height="6" fill="#4a4a4a" opacity="1" />
                {/* Silo */}
                <rect x="4278" y="178" width="9" height="24" fill="#d4d4d4" opacity="1" />
                <ellipse cx="4282.5" cy="178" rx="4.5" ry="2" fill="#b8b8b8" opacity="1" />
                <path d="M 4279,176 L 4282.5,170 L 4286,176" fill="#a83232" opacity="1" />

                {/* Barn 3 - Small-Medium (detailed like Phase 1 Barn 3) */}
                {/* Foundation */}
                <rect x="4441" y="201" width="29" height="2" fill="#6a6a5a" opacity="0.8" />
                <rect x="4442" y="185" width="27" height="17" fill="#c73e3e" opacity="1" />
                <path d="M 4439,185 L 4455.5,172 L 4472,185 Z" fill="#a83232" opacity="1" />
                {/* Roof eave overhang */}
                <path d="M 4439,185 L 4472,185" stroke="#8a2828" strokeWidth="1" opacity="1" />
                <rect x="4450" y="190" width="7" height="12" fill="#6d4428" opacity="1" />
                {/* Windows */}
                <rect x="4444" y="187" width="4" height="5" fill="#4a4a4a" opacity="1" />
                <rect x="4463" y="187" width="4" height="5" fill="#4a4a4a" opacity="1" />
                {/* Weathered wood detail */}
                <path d="M 4443,190 L 4468,190 M 4443,195 L 4468,195" stroke="#a83232" strokeWidth="0.5" opacity="1" />

                {/* Barn 4 - Large (fully detailed) */}
                {/* Foundation */}
                <rect x="4671" y="201" width="39" height="2" fill="#6a6a5a" opacity="0.8" />
                <rect x="4672" y="178" width="37" height="24" fill="#c73e3e" opacity="1" />
                <path d="M 4668,178 L 4690.5,162 L 4713,178 Z" fill="#a83232" opacity="1" />
                {/* Roof eave overhang */}
                <path d="M 4668,178 L 4713,178" stroke="#8a2828" strokeWidth="1.3" opacity="1" />
                {/* Wood plank texture */}
                <path d="M 4674,185 L 4708,185 M 4674,192 L 4708,192 M 4674,197 L 4708,197" stroke="#a83232" strokeWidth="0.5" opacity="1" />
                {/* Barn doors with X pattern */}
                <rect x="4684" y="187" width="9" height="15" fill="#6d4428" opacity="1" />
                <path d="M 4684,187 L 4693,202 M 4693,187 L 4684,202" stroke="#5a3a2a" strokeWidth="0.8" opacity="1" />
                {/* Hayloft windows */}
                <rect x="4676" y="183" width="5" height="6" fill="#4a4a4a" opacity="1" />
                <rect x="4698" y="183" width="5" height="6" fill="#4a4a4a" opacity="1" />
                {/* Silo with full details */}
                <rect x="4713" y="173" width="9" height="29" fill="#d4d4d4" opacity="1" />
                <ellipse cx="4717.5" cy="173" rx="4.5" ry="2.2" fill="#b8b8b8" opacity="1" />
                <path d="M 4715,171 L 4717.5,165 L 4720,171" fill="#a83232" opacity="1" />
                <rect x="4713" y="183" width="9" height="1.5" fill="#a8a8a8" opacity="1" />
                <rect x="4713" y="193" width="9" height="1.5" fill="#a8a8a8" opacity="1" />
                {/* Silo ladder */}
                <rect x="4717" y="178" width="1" height="22" fill="#8a8a8a" opacity="1" />
                {Array.from({length: 7}).map((_, li) => (
                  <rect key={`ladder-end2-${li}`} x="4715" y={180 + li * 3} width="5" height="0.5" fill="#8a8a8a" opacity="1" />
                ))}

                {/* Barn 5 - Medium (detailed) */}
                {/* Foundation */}
                <rect x="4891" y="201" width="31" height="2" fill="#6a6a5a" opacity="0.8" />
                <rect x="4892" y="183" width="29" height="19" fill="#c73e3e" opacity="1" />
                <path d="M 4889,183 L 4906.5,170 L 4924,183 Z" fill="#a83232" opacity="1" />
                {/* Roof eave overhang */}
                <path d="M 4889,183 L 4924,183" stroke="#8a2828" strokeWidth="1" opacity="1" />
                <rect x="4901" y="189" width="8" height="13" fill="#6d4428" opacity="1" />
                {/* Windows */}
                <rect x="4895" y="186" width="4" height="5" fill="#4a4a4a" opacity="1" />
                <rect x="4914" y="186" width="4" height="5" fill="#4a4a4a" opacity="1" />
                {/* Wood planks */}
                <path d="M 4893,189 L 4920,189 M 4893,194 L 4920,194" stroke="#a83232" strokeWidth="0.5" opacity="1" />
              </g>

              {/* Enhanced Farmhouses with porches, shutters, smoke */}
              <g>
                {/* Farmhouse #1 - larger with full detail (matching Phase 1 Farmhouse #1) */}
                {/* Foundation */}
                <rect x="4079" y="204" width="20" height="2" fill="#8a8a7a" opacity="0.8" />
                {/* Main body */}
                <rect x="4080" y="195" width="18" height="10" fill="#f0e6d3" opacity="1" />
                {/* Roof with overhang */}
                <path d="M 4077,195 L 4089,186 L 4101,195 Z" fill="#8b5a3c" opacity="1" />
                {/* Roof ridge line */}
                <path d="M 4077,195 L 4089,186 L 4101,195" stroke="#7a4a2c" strokeWidth="0.5" fill="none" opacity="1" />
                {/* Front door with frame */}
                <rect x="4084.5" y="197.5" width="4" height="7.5" fill="#5a3a2a" opacity="1" />
                <rect x="4084" y="197" width="5" height="0.8" fill="#6d4428" opacity="1" />
                {/* Door knob */}
                <circle cx="4087.5" cy="201" r="0.4" fill="#d4af37" opacity="1" />
                {/* Windows with paired shutters */}
                <rect x="4082" y="197" width="2.5" height="3" fill="#6b8ea8" opacity="1" />
                <rect x="4081.5" y="197" width="0.5" height="3" fill="#3a5a3a" opacity="1" />
                <rect x="4084.5" y="197" width="0.5" height="3" fill="#3a5a3a" opacity="0.6" />
                <rect x="4092" y="197" width="2.5" height="3" fill="#6b8ea8" opacity="1" />
                <rect x="4091.5" y="197" width="0.5" height="3" fill="#3a5a3a" opacity="0.6" />
                <rect x="4094.5" y="197" width="0.5" height="3" fill="#3a5a3a" opacity="1" />
                {/* Window pane dividers */}
                <path d="M 4083.25,197 L 4083.25,200 M 4082,198.5 L 4084.5,198.5" stroke="#4a6a7a" strokeWidth="0.3" />
                <path d="M 4093.25,197 L 4093.25,200 M 4092,198.5 L 4094.5,198.5" stroke="#4a6a7a" strokeWidth="0.3" />
                {/* Porch with support posts */}
                <rect x="4082" y="204.5" width="9" height="1.5" fill="#c9b18f" opacity="1" />
                <rect x="4083" y="201" width="1" height="4" fill="#c9b18f" opacity="0.8" />
                <rect x="4089" y="201" width="1" height="4" fill="#c9b18f" opacity="0.8" />
                {/* Chimney with smoke and cap */}
                <rect x="4095" y="189" width="2.5" height="6" fill="#a85757" opacity="1" />
                <rect x="4094.5" y="188.5" width="3.5" height="1" fill="#8a4a4a" opacity="1" />
                <ellipse cx="4096.5" cy="186" rx="1.5" ry="2" fill="#c4c4c4" opacity="0.3" />
                <ellipse cx="4097" cy="183" rx="1" ry="1.5" fill="#c4c4c4" opacity="0.2" />

                {/* Farmhouse #2 - with full detail (matching Phase 1 Farmhouse #2) */}
                {/* Foundation */}
                <rect x="4359" y="204" width="18" height="2" fill="#8a8a7a" opacity="0.8" />
                {/* Main body */}
                <rect x="4360" y="197" width="16" height="8" fill="#e8d4b8" opacity="1" />
                {/* Roof with overhang */}
                <path d="M 4357,197 L 4368,189 L 4379,197 Z" fill="#6b5a45" opacity="1" />
                {/* Roof ridge line */}
                <path d="M 4357,197 L 4368,189 L 4379,197" stroke="#5a4a35" strokeWidth="0.5" fill="none" opacity="1" />
                {/* Front door */}
                <rect x="4364.5" y="199" width="3.5" height="6" fill="#5a3a2a" opacity="1" />
                <circle cx="4367" cy="202" r="0.35" fill="#d4af37" opacity="1" />
                {/* Windows with paired shutters */}
                <rect x="4361" y="198.5" width="2.5" height="2.5" fill="#6b8ea8" opacity="1" />
                <rect x="4360.5" y="198.5" width="0.5" height="2.5" fill="#3a5a3a" opacity="1" />
                <rect x="4363.5" y="198.5" width="0.5" height="2.5" fill="#3a5a3a" opacity="0.6" />
                <rect x="4370" y="198.5" width="2.5" height="2.5" fill="#6b8ea8" opacity="1" />
                <rect x="4369.5" y="198.5" width="0.5" height="2.5" fill="#3a5a3a" opacity="0.6" />
                <rect x="4372.5" y="198.5" width="0.5" height="2.5" fill="#3a5a3a" opacity="1" />
                {/* Window pane dividers */}
                <path d="M 4362.25,198.5 L 4362.25,201 M 4361,199.75 L 4363.5,199.75" stroke="#4a6a7a" strokeWidth="0.3" />
                <path d="M 4371.25,198.5 L 4371.25,201 M 4370,199.75 L 4372.5,199.75" stroke="#4a6a7a" strokeWidth="0.3" />
                {/* Porch */}
                <rect x="4362" y="204.5" width="8" height="1.5" fill="#c9b18f" opacity="1" />
                {/* Chimney with smoke */}
                <rect x="4374" y="192" width="2" height="5" fill="#a85757" opacity="1" />
                <ellipse cx="4375" cy="189.5" rx="1.2" ry="1.8" fill="#c4c4c4" opacity="0.25" />

                {/* Farmhouse #3 - with full detail */}
                {/* Foundation */}
                <rect x="4619" y="204" width="19" height="2" fill="#8a8a7a" opacity="0.8" />
                {/* Main body */}
                <rect x="4620" y="196" width="17" height="9" fill="#f0e6d3" opacity="1" />
                {/* Roof with overhang */}
                <path d="M 4617,196 L 4628.5,188 L 4640,196 Z" fill="#8b5a3c" opacity="1" />
                {/* Roof ridge line */}
                <path d="M 4617,196 L 4628.5,188 L 4640,196" stroke="#7a4a2c" strokeWidth="0.5" fill="none" opacity="1" />
                {/* Front door with frame */}
                <rect x="4625.5" y="198.5" width="3.5" height="6.5" fill="#5a3a2a" opacity="1" />
                <rect x="4625" y="198" width="4.5" height="0.8" fill="#6d4428" opacity="1" />
                <circle cx="4628" cy="202" r="0.4" fill="#d4af37" opacity="1" />
                {/* Windows with paired shutters */}
                <rect x="4622" y="198" width="2.5" height="2.5" fill="#6b8ea8" opacity="1" />
                <rect x="4621.5" y="198" width="0.5" height="2.5" fill="#3a5a3a" opacity="1" />
                <rect x="4624.5" y="198" width="0.5" height="2.5" fill="#3a5a3a" opacity="0.6" />
                <rect x="4632" y="198" width="2.5" height="2.5" fill="#6b8ea8" opacity="1" />
                <rect x="4631.5" y="198" width="0.5" height="2.5" fill="#3a5a3a" opacity="0.6" />
                <rect x="4634.5" y="198" width="0.5" height="2.5" fill="#3a5a3a" opacity="1" />
                {/* Window pane dividers */}
                <path d="M 4623.25,198 L 4623.25,200.5 M 4622,199.25 L 4624.5,199.25" stroke="#4a6a7a" strokeWidth="0.3" />
                <path d="M 4633.25,198 L 4633.25,200.5 M 4632,199.25 L 4634.5,199.25" stroke="#4a6a7a" strokeWidth="0.3" />
                {/* Porch with support posts */}
                <rect x="4623" y="204.5" width="8" height="1.5" fill="#c9b18f" opacity="1" />
                <rect x="4624" y="201" width="1" height="4" fill="#c9b18f" opacity="0.8" />
                <rect x="4629" y="201" width="1" height="4" fill="#c9b18f" opacity="0.8" />
                {/* Chimney with smoke and cap */}
                <rect x="4634" y="190" width="2.5" height="6" fill="#a85757" opacity="1" />
                <rect x="4633.5" y="189.5" width="3.5" height="1" fill="#8a4a4a" opacity="1" />
                <ellipse cx="4635.5" cy="187.5" rx="1.5" ry="2" fill="#c4c4c4" opacity="0.3" />
                <ellipse cx="4636" cy="185" rx="1" ry="1.5" fill="#c4c4c4" opacity="0.2" />

                {/* Farmhouse #4 - with full detail */}
                {/* Foundation */}
                <rect x="4849" y="204" width="17" height="2" fill="#8a8a7a" opacity="0.8" />
                {/* Main body */}
                <rect x="4850" y="198" width="15" height="7" fill="#e8d4b8" opacity="1" />
                {/* Roof with overhang */}
                <path d="M 4847,198 L 4857.5,191 L 4868,198 Z" fill="#6b5a45" opacity="1" />
                {/* Roof ridge line */}
                <path d="M 4847,198 L 4857.5,191 L 4868,198" stroke="#5a4a35" strokeWidth="0.5" fill="none" opacity="1" />
                {/* Front door */}
                <rect x="4854.5" y="200" width="3" height="5" fill="#5a3a2a" opacity="1" />
                <circle cx="4856.5" cy="202.5" r="0.35" fill="#d4af37" opacity="1" />
                {/* Windows with paired shutters */}
                <rect x="4851" y="199" width="2.5" height="2.5" fill="#6b8ea8" opacity="1" />
                <rect x="4850.5" y="199" width="0.5" height="2.5" fill="#3a5a3a" opacity="1" />
                <rect x="4853.5" y="199" width="0.5" height="2.5" fill="#3a5a3a" opacity="0.6" />
                <rect x="4860" y="199" width="2.5" height="2.5" fill="#6b8ea8" opacity="1" />
                <rect x="4859.5" y="199" width="0.5" height="2.5" fill="#3a5a3a" opacity="0.6" />
                <rect x="4862.5" y="199" width="0.5" height="2.5" fill="#3a5a3a" opacity="1" />
                {/* Window pane dividers */}
                <path d="M 4852.25,199 L 4852.25,201.5 M 4851,200.25 L 4853.5,200.25" stroke="#4a6a7a" strokeWidth="0.3" />
                <path d="M 4861.25,199 L 4861.25,201.5 M 4860,200.25 L 4862.5,200.25" stroke="#4a6a7a" strokeWidth="0.3" />
                {/* Porch */}
                <rect x="4852" y="204.5" width="7" height="1.5" fill="#c9b18f" opacity="1" />
                {/* Chimney with smoke */}
                <rect x="4862" y="194" width="2" height="4" fill="#a85757" opacity="1" />
                <ellipse cx="4863" cy="191.5" rx="1.2" ry="1.8" fill="#c4c4c4" opacity="0.25" />
                <ellipse cx="4863.5" cy="189" rx="0.8" ry="1.3" fill="#c4c4c4" opacity="0.15" />
              </g>

              {/* Varied trees - deciduous and evergreen mix */}
              <g>
                {/* Large oak - 3860 */}
                <g><rect x="3859" y="193" width="4" height="12" fill="#5a4a35" /><circle cx="3861" cy="189" r="9" fill="#4a7a4a" /><circle cx="3855" cy="191" r="6" fill="#5a8a5a" /><circle cx="3867" cy="191" r="6" fill="#5a8a5a" /></g>
                {/* Evergreen pine - 3910 */}
                <g><rect x="3910" y="196" width="2.5" height="9" fill="#5a4a35" /><path d="M 3903,205 L 3911.25,187 L 3919.5,205 Z" fill="#3a6a3a" /><path d="M 3905,200 L 3911.25,185 L 3917.5,200 Z" fill="#4a7a4a" /><path d="M 3907,195 L 3911.25,183 L 3915.5,195 Z" fill="#5a8a5a" /></g>
                {/* Small young tree - 3965 */}
                <g><rect x="3965" y="198" width="2" height="7" fill="#6b5a45" /><circle cx="3966" cy="196" r="4" fill="#6a9a6a" /><circle cx="3964" cy="197" r="3" fill="#7aaa7a" /></g>
                {/* Large maple - 4120 */}
                <g><rect x="4119" y="194" width="4" height="11" fill="#5a4a35" /><circle cx="4121" cy="190" r="8" fill="#5a8a5a" /><circle cx="4115" cy="192" r="5.5" fill="#6a9a6a" /><circle cx="4127" cy="192" r="5.5" fill="#6a9a6a" /><circle cx="4121" cy="186" r="4.5" fill="#8ab88a" /></g>
                {/* Medium deciduous - 4210 */}
                <g><rect x="4210" y="196" width="3" height="9" fill="#6b5a45" /><circle cx="4211.5" cy="193" r="6.5" fill="#5a8a5a" /><circle cx="4208" cy="195" r="4.5" fill="#6a9a6a" /><circle cx="4215" cy="195" r="4.5" fill="#6a9a6a" /></g>
                {/* Tall spruce - 4290 */}
                <g><rect x="4290" y="195" width="2.5" height="10" fill="#4a3a25" /><path d="M 4283,206 L 4291.25,185 L 4299.5,206 Z" fill="#2f5f2f" /><path d="M 4285,200 L 4291.25,182 L 4297.5,200 Z" fill="#3a6a3a" /><path d="M 4287,195 L 4291.25,180 L 4295.5,195 Z" fill="#4a7a4a" /></g>
                {/* Small evergreen - 4410 */}
                <g><rect x="4410" y="198" width="2" height="7" fill="#4a3a25" /><path d="M 4405,205 L 4411,192 L 4417,205 Z" fill="#3a6a3a" /><path d="M 4407,201 L 4411,190 L 4415,201 Z" fill="#4a7a4a" /></g>
                {/* Large oak - 4490 */}
                <g><rect x="4489" y="193" width="4" height="12" fill="#5a4a35" /><circle cx="4491" cy="189" r="8" fill="#4a7a4a" /><circle cx="4485" cy="191" r="5.5" fill="#5a8a5a" /><circle cx="4497" cy="191" r="5.5" fill="#5a8a5a" /><circle cx="4491" cy="185" r="5" fill="#6a9a6a" /></g>
                {/* Birch - 4550 */}
                <g><rect x="4550" y="196" width="2.5" height="9" fill="#c9b89a" /><path d="M 4550.5,197 L 4550.5,200" stroke="#6b5a45" strokeWidth="0.5" /><circle cx="4551.25" cy="193" r="6" fill="#6a9a6a" /><circle cx="4548" cy="195" r="4" fill="#7aaa7a" /><circle cx="4555" cy="195" r="4" fill="#7aaa7a" /></g>
                {/* Medium deciduous - 4640 */}
                <g><rect x="4640" y="196" width="3" height="9" fill="#6b5a45" /><circle cx="4641.5" cy="192" r="7" fill="#5a8a5a" /><circle cx="4638" cy="194" r="5" fill="#6a9a6a" /><circle cx="4645" cy="194" r="5" fill="#6a9a6a" /></g>
                {/* Evergreen - 4720 */}
                <g><rect x="4720" y="196" width="2.5" height="9" fill="#4a3a25" /><path d="M 4714,205 L 4721.25,188 L 4728.5,205 Z" fill="#3a6a3a" /><path d="M 4716,201 L 4721.25,186 L 4726.5,201 Z" fill="#4a7a4a" /><path d="M 4718,197 L 4721.25,184 L 4724.5,197 Z" fill="#5a8a5a" /></g>
                {/* Large elm - 4790 */}
                <g><rect x="4789" y="193" width="4" height="12" fill="#5a4a35" /><circle cx="4791" cy="189" r="8" fill="#4a7a4a" /><circle cx="4785" cy="191" r="5.5" fill="#5a8a5a" /><circle cx="4797" cy="191" r="5.5" fill="#5a8a5a" /></g>
                {/* Small deciduous - 4880 */}
                <g><rect x="4880" y="198" width="2" height="7" fill="#6b5a45" /><circle cx="4881" cy="196" r="4.5" fill="#6a9a6a" /><circle cx="4879" cy="197" r="3.5" fill="#7aaa7a" /><circle cx="4884" cy="197" r="3.5" fill="#7aaa7a" /></g>
                {/* Tall pine - 4960 */}
                <g><rect x="4960" y="196" width="2.5" height="9" fill="#5a4a35" /><path d="M 4954,205 L 4961.25,188 L 4968.5,205 Z" fill="#3a6a3a" /><path d="M 4956,200 L 4961.25,185 L 4966.5,200 Z" fill="#4a7a4a" /><path d="M 4958,195 L 4961.25,183 L 4964.5,195 Z" fill="#5a8a5a" /></g>
              </g>

              {/* Tractors - fully detailed like Phase 1 */}
              <g>
                {[4050, 4500, 4750, 4930].map((x, i) => (
                  <g key={`tractor-end-${i}`} opacity="1">
                    {/* Tractor body - green */}
                    <rect x={x} y="198" width="18" height="8" rx="1" fill="#4a7c2f" />
                    {/* Engine hood */}
                    <rect x={x+12} y="196" width="6" height="4" rx="0.5" fill="#3d6928" />
                    {/* Cab */}
                    <rect x={x+4} y="194" width="6" height="5" rx="0.5" fill="#5a8a3f" />
                    {/* Cab window */}
                    <rect x={x+5} y="195" width="4" height="3" fill="#6b8ea8" opacity="1" />
                    {/* Big rear wheel with hub */}
                    <circle cx={x+4} cy="206" r="4" fill="#2f2f2f" />
                    <circle cx={x+4} cy="206" r="2" fill="#4a4a4a" />
                    {/* Small front wheel with hub */}
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

              {/* Windmill - iconic rural landmark */}
              <g>
                <path d="M 4186,205 L 4189,175 L 4193,175 L 4196,205 Z" fill="#8a8a7a" opacity="0.9" />
                <path d="M 4187.5,200 L 4194,180 M 4194.5,200 L 4188,180" stroke="#6a6a5a" strokeWidth="0.5" opacity="0.7" />
                <path d="M 4188,195 L 4194,190 M 4194,195 L 4188,190" stroke="#6a6a5a" strokeWidth="0.4" opacity="0.6" />
                <rect x="4187" y="174" width="8" height="1.5" fill="#6a6a5a" opacity="1" />
                <rect x="4189" y="172" width="4" height="3" rx="1" fill="#7a7a6a" opacity="1" />
                {/* Blades - animated spin (slower variant) */}
                <g className="windmill-blades-slow" style={{transformOrigin: '4191px 173px'}}>
                  <path d="M 4191,173 L 4191,157" stroke="#e8e0d0" strokeWidth="1.2" opacity="0.9" />
                  <path d="M 4191,173 L 4191,189" stroke="#e8e0d0" strokeWidth="1.2" opacity="0.9" />
                  <path d="M 4191,173 L 4177,169" stroke="#e8e0d0" strokeWidth="1.2" opacity="0.9" />
                  <path d="M 4191,173 L 4205,177" stroke="#e8e0d0" strokeWidth="1.2" opacity="0.9" />
                  <path d="M 4191,157 L 4192.5,160 L 4191,168 L 4189.5,165 Z" fill="#e8e0d0" opacity="0.4" />
                  <path d="M 4191,189 L 4189.5,186 L 4191,178 L 4192.5,181 Z" fill="#e8e0d0" opacity="0.4" />
                  <path d="M 4177,169 L 4180,170.5 L 4187,173 L 4184,171.5 Z" fill="#e8e0d0" opacity="0.4" />
                  <path d="M 4205,177 L 4202,175.5 L 4195,173 L 4198,174.5 Z" fill="#e8e0d0" opacity="0.4" />
                </g>
                <circle cx="4191" cy="173" r="1.5" fill="#5a5a4a" opacity="1" />
              </g>

              {/* FARM ANIMALS - 2/3 scale, self-aware, matching opening biome */}

              {/* Horses in pairs - 2/3 scale, facing each other */}
              <g>
                {[
                  {x: 3845, y: 1, dir: 1},
                  {x: 3868, y: 2, dir: -1},
                  {x: 4145, y: -2, dir: 1},
                  {x: 4325, y: 3, dir: 1},
                  {x: 4345, y: 2, dir: -1},
                  {x: 4515, y: -1, dir: 1},
                  {x: 4654, y: 2, dir: 1},
                ].map((h, i) => (
                  <g key={`horse-end-${i}`} transform={`translate(0, ${h.y})`} className="animal-horse" opacity="1" style={{animationDelay: `${i * 0.3}s`}}>
                    <ellipse cx={h.x} cy="204" rx="6.7" ry="4" fill="#654321" />
                    <ellipse cx={h.x + 4 * h.dir} cy="204" rx="3.3" ry="4" fill="#7a5230" />
                    <path d={`M ${h.x + 5.3 * h.dir},202.7 L ${h.x + 7.3 * h.dir},200.7 L ${h.x + 6.7 * h.dir},204 Z`} fill="#654321" />
                    <ellipse cx={h.x + 8.7 * h.dir} cy="200.3" rx="2.3" ry="3" fill="#654321" />
                    <ellipse cx={h.x + 10 * h.dir} cy="201" rx="1.3" ry="1.7" fill="#8b6f47" />
                    <path d={`M ${h.x + 8 * h.dir},197.3 L ${h.x + 7.3 * h.dir},195.3 L ${h.x + 8.7 * h.dir},196.7 Z`} fill="#654321" />
                    <path d={`M ${h.x + 9.3 * h.dir},197.3 L ${h.x + 10 * h.dir},195.3 L ${h.x + 9 * h.dir},196.7 Z`} fill="#654321" />
                    <circle cx={h.x + 8.7 * h.dir} cy="199.7" r="0.7" fill="#2f2f2f" />
                    <circle cx={h.x + 8.9 * h.dir} cy="199.5" r="0.3" fill="#ffffff" />
                    <rect x={h.x + 2} y="208" width="1.3" height="4" fill="#654321" />
                    <rect x={h.x + 4.7} y="208" width="1.3" height="4" fill="#7a5230" />
                    <rect x={h.x - 3.3} y="208" width="1.3" height="4" fill="#654321" />
                    <rect x={h.x - 0.7} y="208" width="1.3" height="4" fill="#7a5230" />
                    <rect x={h.x + 2} y="211.5" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={h.x + 4.7} y="211.5" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={h.x - 3.3} y="211.5" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={h.x - 0.7} y="211.5" width="1.3" height="0.7" fill="#2f2f2f" />
                    <path d={`M ${h.x - 6.7 * h.dir},203 Q ${h.x - 8.7 * h.dir},204.7 ${h.x - 9.3 * h.dir},207.3`} stroke="#4a3520" strokeWidth="1.3" fill="none" />
                    <path d={`M ${h.x + 7.3 * h.dir},198 Q ${h.x + 6 * h.dir},198.7 ${h.x + 4.7 * h.dir},200`} stroke="#4a3520" strokeWidth="1" fill="none" />
                  </g>
                ))}
              </g>

              {/* Cows in groups - 2/3 scale, facing each other */}
              <g>
                {[
                  {x: 3920, y: 3, dir: 1},
                  {x: 3945, y: 2, dir: -1},
                  {x: 4215, y: -1, dir: 1},
                  {x: 4395, y: 2, dir: -1},
                  {x: 4415, y: 1, dir: 1},
                  {x: 4590, y: -2, dir: 1},
                ].map((c, i) => (
                  <g key={`cow-end-${i}`} transform={`translate(0, ${c.y})`} className="animal-cow" opacity="1" style={{animationDelay: `${i * 0.5}s`}}>
                    <rect x={c.x - 5.3} y="201.3" width="10.7" height="5.3" rx="1.3" fill="#f5f5f5" />
                    <ellipse cx={c.x} cy="206.7" rx="2" ry="1.3" fill="#ffb6c1" />
                    <ellipse cx={c.x - 3.3} cy="202.7" rx="1.7" ry="1.3" fill="#2f2f2f" />
                    <ellipse cx={c.x + 1.3} cy="202" rx="2" ry="1.7" fill="#2f2f2f" />
                    <rect x={c.x + (c.dir > 0 ? -6 : 4)} y="199.3" width="2" height="3.3" rx="0.7" fill="#f5f5f5" />
                    <ellipse cx={c.x + (c.dir > 0 ? -6.7 : 6.7)} cy="200" rx="2.3" ry="2.7" fill="#f5f5f5" />
                    <ellipse cx={c.x + (c.dir > 0 ? -7.3 : 7.3)} cy="199.3" rx="1" ry="1" fill="#2f2f2f" />
                    <ellipse cx={c.x + (c.dir > 0 ? -8 : 8)} cy="201.3" rx="1.3" ry="1.7" fill="#ffb6c1" />
                    <circle cx={c.x + (c.dir > 0 ? -6.7 : 6.7)} cy="199.3" r="0.7" fill="#2f2f2f" />
                    <circle cx={c.x + (c.dir > 0 ? -6.5 : 6.5)} cy="199.1" r="0.3" fill="#ffffff" />
                    <path d={`M ${c.x + (c.dir > 0 ? -7.3 : 7.3)},197.3 Q ${c.x + (c.dir > 0 ? -8 : 8)},196 ${c.x + (c.dir > 0 ? -8.7 : 8.7)},195.3`} stroke="#8a7a6a" strokeWidth="0.8" fill="none" />
                    <rect x={c.x - 3.3} y="207" width="1.3" height="4.7" rx="0.7" fill="#e8e8e8" />
                    <rect x={c.x - 0.7} y="207" width="1.3" height="4.7" rx="0.7" fill="#e8e8e8" />
                    <rect x={c.x + 1.3} y="207" width="1.3" height="4.7" rx="0.7" fill="#e8e8e8" />
                    <rect x={c.x + 4} y="207" width="1.3" height="4.7" rx="0.7" fill="#e8e8e8" />
                    <rect x={c.x - 3.3} y="211.3" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={c.x - 0.7} y="211.3" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={c.x + 1.3} y="211.3" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={c.x + 4} y="211.3" width="1.3" height="0.7" fill="#2f2f2f" />
                    <path d={`M ${c.x + (c.dir > 0 ? 5.3 : -5.3)},202.7 L ${c.x + (c.dir > 0 ? 6.7 : -6.7)},207`} stroke="#f5f5f5" strokeWidth="1" />
                    <ellipse cx={c.x + (c.dir > 0 ? 6.7 : -6.7)} cy="207.7" rx="1" ry="1.3" fill="#2f2f2f" />
                  </g>
                ))}
              </g>

              {/* Sheep in flocks - 2/3 scale */}
              <g>
                {[
                  {x: 3885, y: -1, dir: 1},
                  {x: 3895, y: 0, dir: -1},
                  {x: 4110, y: 4, dir: 1},
                  {x: 4120, y: 3, dir: 1},
                  {x: 4296, y: -3, dir: -1},
                  {x: 4555, y: 0, dir: 1},
                  {x: 4565, y: 1, dir: -1},
                  {x: 4790, y: -2, dir: 1},
                ].map((s, i) => (
                  <g key={`sheep-end-${i}`} transform={`translate(0, ${s.y})`} className="animal-sheep" opacity="1" style={{animationDelay: `${i * 0.4}s`}}>
                    <circle cx={s.x} cy="206" r="3" fill="#f5f5f5" />
                    <circle cx={s.x - 2 * s.dir} cy="205.3" r="2.3" fill="#f5f5f5" />
                    <circle cx={s.x + 2 * s.dir} cy="205.3" r="2.3" fill="#f5f5f5" />
                    <circle cx={s.x} cy="204" r="2" fill="#f5f5f5" />
                    <circle cx={s.x - 1.3 * s.dir} cy="204.7" r="1" fill="#e8e8e8" />
                    <ellipse cx={s.x - 4 * s.dir} cy="204.7" rx="1.7" ry="2" fill="#2f2f2f" />
                    <ellipse cx={s.x - 4.7 * s.dir} cy="203.3" rx="0.7" ry="1" fill="#2f2f2f" />
                    <ellipse cx={s.x - 3.3 * s.dir} cy="203.3" rx="0.7" ry="1" fill="#2f2f2f" />
                    <circle cx={s.x - 4.3 * s.dir} cy="204.7" r="0.4" fill="#ffffff" />
                    <circle cx={s.x - 4.3 * s.dir} cy="204.7" r="0.2" fill="#2f2f2f" />
                    <ellipse cx={s.x - 5 * s.dir} cy="205.3" rx="0.5" ry="0.4" fill="#1a1a1a" />
                    <rect x={s.x - 2.7} y="208.7" width="1" height="2.7" rx="0.3" fill="#2f2f2f" />
                    <rect x={s.x - 0.7} y="208.7" width="1" height="2.7" rx="0.3" fill="#2f2f2f" />
                    <rect x={s.x + 0.7} y="208.7" width="1" height="2.7" rx="0.3" fill="#2f2f2f" />
                    <rect x={s.x + 2.7} y="208.7" width="1" height="2.7" rx="0.3" fill="#2f2f2f" />
                    <circle cx={s.x + 3.3 * s.dir} cy="206.7" r="1" fill="#f5f5f5" />
                  </g>
                ))}
              </g>

              {/* Chickens in pairs - 2/3 scale */}
              <g>
                {[
                  {x: 3810, y: 2, dir: 1},
                  {x: 3818, y: 1, dir: -1},
                  {x: 3950, y: -2, dir: 1},
                  {x: 4180, y: 1, dir: -1},
                  {x: 4187, y: 0, dir: 1},
                  {x: 4430, y: -1, dir: 1},
                  {x: 4438, y: 0, dir: -1},
                  {x: 4480, y: 3, dir: 1},
                  {x: 4625, y: -1, dir: -1},
                  {x: 4820, y: 1, dir: 1},
                  {x: 4828, y: 2, dir: -1},
                ].map((ch, i) => (
                  <g key={`chicken-end-${i}`} transform={`translate(0, ${ch.y})`} className="animal-chicken" opacity="1" style={{animationDelay: `${i * 0.15}s`}}>
                    <ellipse cx={ch.x} cy="209" rx="2.3" ry="2" fill="#d4a574" />
                    <ellipse cx={ch.x + 0.3 * ch.dir} cy="209" rx="1.3" ry="1.3" fill="#b8946a" />
                    <path d={`M ${ch.x + 2 * ch.dir},208.3 Q ${ch.x + 3 * ch.dir},207 ${ch.x + 3.3 * ch.dir},205.7 Q ${ch.x + 2.7 * ch.dir},206.3 ${ch.x + 2.3 * ch.dir},207.7 Z`} fill="#8b6f47" />
                    <rect x={ch.x - 1.7 * ch.dir - 0.5} y="207.3" width="1" height="1.3" rx="0.3" fill="#d4a574" />
                    <circle cx={ch.x - 1.7 * ch.dir} cy="207" r="1.3" fill="#d4a574" />
                    <path d={`M ${ch.x - 2 * ch.dir},205.7 L ${ch.x - 1.9 * ch.dir},204.7 L ${ch.x - 1.5 * ch.dir},205.2 L ${ch.x - 1.3 * ch.dir},204.3 L ${ch.x - 1.2 * ch.dir},205 L ${ch.x - 1 * ch.dir},205.7 Z`} fill="#cc3333" />
                    <ellipse cx={ch.x - 2 * ch.dir} cy="207.7" rx="0.4" ry="0.5" fill="#cc3333" />
                    <path d={`M ${ch.x - 2.7 * ch.dir},207 L ${ch.x - 3.3 * ch.dir},207 L ${ch.x - 3 * ch.dir},207.3 Z`} fill="#ffd700" />
                    <circle cx={ch.x - 1.7 * ch.dir} cy="206.5" r="0.3" fill="#2f2f2f" />
                    <path d={`M ${ch.x - 0.7},211.3 L ${ch.x - 0.7},212 L ${ch.x - 1.3},212.5`} stroke="#ffd700" strokeWidth="0.7" fill="none" />
                    <path d={`M ${ch.x + 0.7},211.3 L ${ch.x + 0.7},212 L ${ch.x + 1.3},212.5`} stroke="#ffd700" strokeWidth="0.7" fill="none" />
                  </g>
                ))}
              </g>

              {/* FOREGROUND: Drinking animals at ending pond - rendered last */}
              <g>
                {/* Cow drinking - 2/3 scale */}
                <g className="animal-drinking" style={{animationDelay: '2s', animationDuration: '11s'}}>
                  <ellipse cx={4848} cy="209" rx="5.3" ry="3.3" fill="#f5f5f5" />
                  <ellipse cx={4846} cy="208.3" rx="1.7" ry="1.3" fill="#2f2f2f" />
                  <ellipse cx={4850} cy="207.7" rx="2" ry="1.7" fill="#2f2f2f" />
                  <ellipse cx={4848} cy="212.3" rx="2" ry="1.3" fill="#ffb6c1" />
                  <path d={`M 4843.3,208.3 L 4840,213 L 4842,213.7 L 4844.7,209.3 Z`} fill="#f5f5f5" />
                  <ellipse cx={4839} cy="213.7" rx="2.3" ry="2" fill="#f5f5f5" />
                  <ellipse cx={4838.3} cy="213" rx="1" ry="1" fill="#2f2f2f" />
                  <ellipse cx={4837.3} cy="214.7" rx="1.3" ry="1.2" fill="#ffb6c1" />
                  <ellipse cx={4836.3} cy="216" rx="2" ry="0.5" fill="#6a9aba" opacity="0.5" />
                  <ellipse cx={4836.3} cy="216" rx="3.3" ry="0.7" fill="#6a9aba" opacity="0.2" />
                  <circle cx={4839} cy="213" r="0.5" fill="#2f2f2f" />
                  <circle cx={4839.1} cy="212.9" r="0.2" fill="#ffffff" />
                  <rect x={4845.3} y="212.3" width="1.3" height="3.3" rx="0.5" fill="#e8e8e8" />
                  <rect x={4848} y="212.3" width="1.3" height="3.3" rx="0.5" fill="#e8e8e8" />
                  <rect x={4843.3} y="212.3" width="1.3" height="3.3" rx="0.5" fill="#e8e8e8" />
                  <rect x={4850.7} y="212.3" width="1.3" height="3.3" rx="0.5" fill="#e8e8e8" />
                  <rect x={4845.3} y="215.3" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={4848} y="215.3" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={4843.3} y="215.3" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={4850.7} y="215.3" width="1.3" height="0.7" fill="#2f2f2f" />
                  <path d={`M 4852.7,207.7 Q 4854,209.7 4853.3,212.3`} stroke="#f5f5f5" strokeWidth="0.8" fill="none" />
                  <ellipse cx={4853.3} cy="213" rx="0.7" ry="1" fill="#2f2f2f" />
                </g>

                {/* Horse drinking - 2/3 scale */}
                <g className="animal-drinking" style={{animationDelay: '6s', animationDuration: '9s'}}>
                  <ellipse cx={4815} cy="207" rx="6.7" ry="4" fill="#654321" />
                  <ellipse cx={4819} cy="207" rx="3.3" ry="4" fill="#7a5230" />
                  <path d={`M 4820,205.7 L 4823.3,211 L 4821.3,212.3 L 4818.7,207 Z`} fill="#654321" />
                  <ellipse cx={4822} cy="212.3" rx="2.7" ry="1.7" fill="#5a3a1a" />
                  <ellipse cx={4824} cy="213" rx="1.3" ry="1" fill="#4a2a0a" />
                  <circle cx={4824.7} cy="212.7" r="0.3" fill="#2f2f2f" />
                  <circle cx={4824.7} cy="213.3" r="0.3" fill="#2f2f2f" />
                  <ellipse cx={4824.7} cy="214.3" rx="2" ry="0.5" fill="#6a9aba" opacity="0.5" />
                  <ellipse cx={4824.7} cy="214.3" rx="3.3" ry="0.7" fill="#6a9aba" opacity="0.2" />
                  <circle cx={4821.3} cy="211.7" r="0.4" fill="#2f2f2f" />
                  <circle cx={4821.5} cy="211.5" r="0.13" fill="#ffffff" />
                  <path d="M 4820.7,210.7 L 4820,209.3 L 4821.3,210 Z" fill="#5a3a1a" />
                  <path d="M 4822,210.7 L 4822.7,209.3 L 4821.7,210 Z" fill="#5a3a1a" />
                  <path d={`M 4818.7,204 Q 4820,203.3 4821.3,204.7`} stroke="#3a2a1a" strokeWidth="1" fill="none" />
                  <rect x={4810.7} y="211" width="1.3" height="4" rx="0.5" fill="#654321" />
                  <rect x={4813.3} y="211" width="1.3" height="4" rx="0.5" fill="#654321" />
                  <rect x={4816} y="211" width="1.3" height="4" rx="0.5" fill="#654321" />
                  <rect x={4818.7} y="211" width="1.3" height="4" rx="0.5" fill="#654321" />
                  <rect x={4810.7} y="214.7" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={4813.3} y="214.7" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={4816} y="214.7" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={4818.7} y="214.7" width="1.3" height="0.7" fill="#2f2f2f" />
                  <path d={`M 4808.7,205.7 Q 4806.7,208 4807.3,211`} stroke="#3a2a1a" strokeWidth="1" fill="none" />
                </g>

                {/* Chickens bathing - 2/3 scale */}
                {[4826, 4831, 4835].map((cx, ci) => (
                  <g key={`chicken-bath-end-${ci}`} className="chicken-bathing" style={{animationDelay: `${ci * 1.5 + 0.5}s`}}>
                    <ellipse cx={cx} cy="217" rx="2" ry="1.3" fill="#d4a574" />
                    <path d={`M ${cx-0.7},216.3 Q ${cx-1.3},215 ${cx},215.3 Q ${cx+1.3},215 ${cx+0.7},216.3`} fill="#b8946a" opacity="0.8" />
                    <ellipse cx={cx} cy="217.3" rx="3" ry="0.7" fill="#6a9aba" opacity="0.35" />
                    <circle cx={cx-1.3} cy="216" r="1" fill="#d4a574" />
                    <path d={`M ${cx-1.7},215.3 L ${cx-1.5},214.7 L ${cx-1.3},215 L ${cx-1.2},214.5 L ${cx-1},215.3 Z`} fill="#cc3333" />
                    <path d={`M ${cx-2.3},216 L ${cx-2.8},216 L ${cx-2.5},216.3 Z`} fill="#ffd700" />
                    <circle cx={cx-1.5} cy="215.7" r="0.2" fill="#2f2f2f" />
                    <circle cx={cx+1.3} cy="215.3" r="0.3" fill="#6a9aba" opacity="0.5" />
                  </g>
                ))}
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
                  {x: 20, color: "#8b4513", direction: "forward"},     // Brown - near left edge
                  {x: 400, color: "#c73e3e", direction: "forward"},    // Red
                  {x: 1200, color: "#2f4f7f", direction: "reverse"},   // Blue
                  {x: 1950, color: "#4a7c2f", direction: "forward"},   // Green - just before green city
                  {x: 3850, color: "#d4af37", direction: "reverse"},   // Gold - just after green city
                  {x: 4600, color: "#cc6633", direction: "forward"},   // Orange
                  {x: 4950, color: "#4a4a8a", direction: "reverse"}    // Indigo - near right edge
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
                  {x: 50, direction: "forward"},        // Near left edge
                  {x: 800, direction: "reverse"},
                  {x: 1600, direction: "forward"},
                  {x: 3900, direction: "reverse"},     // Just after green city
                  {x: 4800, direction: "forward"},
                  {x: 4920, direction: "reverse"}       // Near right edge
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
