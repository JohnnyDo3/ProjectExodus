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

        /* Movement-only keyframes (facing handled by JS inline scaleX) */
        @keyframes roamRight {
          0%, 100% { transform: translateX(0px) translateY(0); }
          25% { transform: translateX(25px) translateY(-1px); }
          50% { transform: translateX(50px) translateY(0); }
          75% { transform: translateX(25px) translateY(-1px); }
        }
        @keyframes roamLeft {
          0%, 100% { transform: translateX(0px) translateY(0); }
          25% { transform: translateX(-25px) translateY(-1px); }
          50% { transform: translateX(-50px) translateY(0); }
          75% { transform: translateX(-25px) translateY(-1px); }
        }
        @keyframes roamWide {
          0%, 100% { transform: translateX(0px) translateY(0); }
          20% { transform: translateX(35px) translateY(-2px); }
          50% { transform: translateX(70px) translateY(0); }
          80% { transform: translateX(35px) translateY(-2px); }
        }
        @keyframes roamWideLeft {
          0%, 100% { transform: translateX(0px) translateY(0); }
          20% { transform: translateX(-35px) translateY(-2px); }
          50% { transform: translateX(-70px) translateY(0); }
          80% { transform: translateX(-35px) translateY(-2px); }
        }

        .animal-horse {
          animation: roamWide 28s ease-in-out infinite;
        }
        .animal-horse-left {
          animation: roamWideLeft 32s ease-in-out infinite;
        }
        .animal-cow {
          animation: roamRight 35s ease-in-out infinite;
        }
        .animal-cow-left {
          animation: roamLeft 30s ease-in-out infinite;
        }
        .animal-sheep {
          animation: roamRight 25s ease-in-out infinite;
        }
        .animal-sheep-left {
          animation: roamLeft 22s ease-in-out infinite;
        }

        /* Face-flip: scaleX around (0,0) - parent translate centers the animal first */
        @keyframes faceFlip {
          0%, 49.9% { transform: scaleX(1); }
          50%, 99.9% { transform: scaleX(-1); }
          100% { transform: scaleX(1); }
        }
        .face-horse { animation: faceFlip 28s linear infinite; }
        .face-horse-left { animation: faceFlip 32s linear infinite; }
        .face-cow { animation: faceFlip 35s linear infinite; }
        .face-cow-left { animation: faceFlip 30s linear infinite; }
        .face-sheep { animation: faceFlip 25s linear infinite; }
        .face-sheep-left { animation: faceFlip 22s linear infinite; }
        .face-chicken { animation: faceFlip 18s linear infinite; }
        .face-chicken-left { animation: faceFlip 20s linear infinite; }

        @keyframes animalPeck {
          0%, 80%, 100% { transform: translateY(0); }
          10%, 30%, 50%, 70% { transform: translateY(-1px); }
          20%, 40%, 60% { transform: translateY(0); }
        }

        @keyframes chickenRoam {
          0%, 100% { transform: translateX(0px) translateY(0); }
          15% { transform: translateX(10px) translateY(-1px); }
          30% { transform: translateX(20px) translateY(0); }
          50% { transform: translateX(30px) translateY(-1px); }
          65% { transform: translateX(20px) translateY(0); }
          80% { transform: translateX(10px) translateY(-1px); }
        }
        @keyframes chickenRoamLeft {
          0%, 100% { transform: translateX(0px) translateY(0); }
          15% { transform: translateX(-10px) translateY(-1px); }
          30% { transform: translateX(-20px) translateY(0); }
          50% { transform: translateX(-30px) translateY(-1px); }
          65% { transform: translateX(-20px) translateY(0); }
          80% { transform: translateX(-10px) translateY(-1px); }
        }

        .animal-chicken {
          animation: chickenRoam 18s ease-in-out infinite;
        }
        .animal-chicken-left {
          animation: chickenRoamLeft 20s ease-in-out infinite;
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

        /* Drinking animation - head bobs up and down to water */
        @keyframes animalDrink {
          0%, 100% { transform: translateX(0px) translateY(-3px); }
          10% { transform: translateX(-1px) translateY(-1px); }
          20% { transform: translateX(-2px) translateY(1px); }
          35% { transform: translateX(-3px) translateY(2px); }
          50% { transform: translateX(-2px) translateY(1px); }
          60% { transform: translateX(0px) translateY(-3px); }
          75% { transform: translateX(0px) translateY(-3px); }
          85% { transform: translateX(-1px) translateY(0px); }
          95% { transform: translateX(-2px) translateY(2px); }
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
              {/* Distant background hills - dark, misty - extend to x=850 to overlap with suburbs */}
              <path d="M 0,200 Q 80,190 160,195 Q 250,185 350,192 Q 450,188 550,193 Q 650,185 750,190 Q 800,193 850,195 L 850,250 L 0,250 Z"
                    fill="#4a7a4a" opacity="0.5" />
              <path d="M 0,197 Q 100,188 200,193 Q 300,183 400,190 Q 500,195 600,187 Q 700,183 800,190 Q 850,193 850,195 L 850,250 L 0,250 Z"
                    fill="#5a8a5a" opacity="0.45" />
              {/* Mid-ground hills - primary terrain - flatten at x=800 to merge with suburb ground */}
              <path d="M 0,210 Q 100,195 200,205 Q 300,215 400,200 Q 500,190 600,200 Q 650,205 700,208 Q 750,209 800,210 L 850,210 L 850,250 L 0,250 Z"
                    fill="#7aa87a" opacity="1" />
              <path d="M 0,205 Q 80,192 160,200 Q 240,208 320,195 Q 400,185 480,195 Q 560,203 600,198 Q 650,203 700,206 Q 750,208 800,208 L 850,208 L 850,250 L 0,250 Z"
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
                {/* Blades - 4 wide fan blades, animated spin */}
                <g className="windmill-blades" style={{transformOrigin: '391px 173px'}}>
                  {/* Blade 1 - Up */}
                  <path d="M 390,172 L 389,158 L 391,155 L 393,158 L 392,172 Z" fill="#e8e0d0" opacity="0.85" />
                  <path d="M 390,172 L 389,158 L 391,155" stroke="#d4ccb8" strokeWidth="0.4" fill="none" />
                  <path d="M 391,165 L 392,165" stroke="#ccc4b0" strokeWidth="0.3" opacity="0.6" />
                  <path d="M 391,160 L 392,160" stroke="#ccc4b0" strokeWidth="0.3" opacity="0.6" />
                  {/* Blade 2 - Down */}
                  <path d="M 392,174 L 393,188 L 391,191 L 389,188 L 390,174 Z" fill="#ddd6c4" opacity="0.8" />
                  <path d="M 392,174 L 393,188 L 391,191" stroke="#ccc4b0" strokeWidth="0.4" fill="none" />
                  <path d="M 391,181 L 390,181" stroke="#ccc4b0" strokeWidth="0.3" opacity="0.6" />
                  {/* Blade 3 - Left */}
                  <path d="M 390,172 L 376,171 L 374,173 L 376,175 L 390,174 Z" fill="#d8d0be" opacity="0.82" />
                  <path d="M 390,172 L 376,171 L 374,173" stroke="#ccc4b0" strokeWidth="0.4" fill="none" />
                  <path d="M 383,173 L 383,172" stroke="#ccc4b0" strokeWidth="0.3" opacity="0.6" />
                  {/* Blade 4 - Right */}
                  <path d="M 392,174 L 406,175 L 408,173 L 406,171 L 392,172 Z" fill="#e8e0d0" opacity="0.78" />
                  <path d="M 392,174 L 406,175 L 408,173" stroke="#d4ccb8" strokeWidth="0.4" fill="none" />
                  <path d="M 399,173 L 399,174" stroke="#ccc4b0" strokeWidth="0.3" opacity="0.6" />
                </g>
                {/* Hub center - on top of blades */}
                <circle cx="391" cy="173" r="2" fill="#6a6a5a" opacity="1" />
                <circle cx="391" cy="173" r="1" fill="#5a5a4a" opacity="1" />
              </g>

              {/* FARM ANIMALS - Minecraft/voxel style, all rectangles, no gaps */}

              {/* Horses - Minecraft blocky style, improved proportions, de-crowded */}
              <g>
                {[
                  {x: 35, dir: -1, y: -3, color: '#654321', chest: '#7a5230'},
                  {x: 160, dir: 1, y: -2, color: '#8b6f47', chest: '#9a7a55'},
                  {x: 340, dir: -1, y: -1, color: '#654321', chest: '#7a5230'},
                  {x: 720, dir: -1, y: 2, color: '#4a3520', chest: '#5a3a25'},
                ].map((h, i) => (
                  <g key={`horse-${i}`} transform={`translate(0, ${h.y})`}>
                  <g className={h.dir > 0 ? "animal-horse-left" : "animal-horse"} style={{animationDelay: `${i * 2.5}s`}}>
                  <g transform={`translate(${h.x}, 203)`}>
                  <g className={h.dir > 0 ? "face-horse-left" : "face-horse"} style={{animationDelay: `${i * 2.5}s`}}>
                  <g transform={`translate(${-h.x}, -203)`} opacity="1">
                    {/* Body block */}
                    <rect x={h.x - 6} y="201" width="12" height="7" fill={h.color} />
                    <rect x={h.x + (h.dir > 0 ? -6 : 2)} y="201" width="4" height="7" fill={h.chest} />
                    <rect x={h.x + (h.dir > 0 ? -8 : 5)} y="197.5" width="2.5" height="4.5" fill={h.color} />
                    <rect x={h.x + (h.dir > 0 ? -11.5 : 6.5)} y="195.5" width="4.5" height="3.5" fill={h.color} />
                    <rect x={h.x + (h.dir > 0 ? -12.5 : 10)} y="197" width="1.5" height="2" fill={h.chest} />
                    <rect x={h.x + (h.dir > 0 ? -10 : 8.5)} y="196.5" width="0.8" height="0.8" fill="#2f2f2f" />
                    <rect x={h.x + (h.dir > 0 ? -9.8 : 8.7)} y="196.5" width="0.3" height="0.4" fill="#ffffff" />
                    <rect x={h.x + (h.dir > 0 ? -11 : 7.5)} y="194" width="1" height="1.8" fill={h.color} />
                    <rect x={h.x + (h.dir > 0 ? -9.5 : 9)} y="194" width="1" height="1.8" fill={h.color} />
                    <rect x={h.x + (h.dir > 0 ? -12 : 11)} y="198" width="0.5" height="0.5" fill="#3a2a1a" />
                    <rect x={h.x + 3} y="207.5" width="1.3" height="4" fill={h.color} />
                    <rect x={h.x + 5} y="207.5" width="1.3" height="4" fill={h.chest} />
                    <rect x={h.x - 5.3} y="207.5" width="1.3" height="4" fill={h.color} />
                    <rect x={h.x - 3.3} y="207.5" width="1.3" height="4" fill={h.chest} />
                    <rect x={h.x + 3} y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={h.x + 5} y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={h.x - 5.3} y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={h.x - 3.3} y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={h.x + (h.dir > 0 ? 5.5 : -7)} y="201.5" width="1.5" height="5.5" fill="#4a3520" />
                    <rect x={h.x + (h.dir > 0 ? -8 : 7)} y="195.5" width="1" height="6" fill="#4a3520" />
                  </g></g></g>
                  </g>
                  </g>
                ))}
              </g>

              {/* Cows - Minecraft blocky style, de-crowded */}
              <g>
                {[
                  {x: 95, dir: 1, y: 2, s: 1},
                  {x: 420, dir: -1, y: -3, s: 1},
                  {x: 600, dir: 1, y: -1, s: 1},
                  {x: 760, dir: 1, y: -1, s: 0.7},
                ].map((c, i) => (
                  <g key={`cow-${i}`} transform={`translate(${c.x - c.x * c.s}, ${c.y + (1 - c.s) * 208}) scale(${c.s})`}>
                  <g className={c.dir > 0 ? "animal-cow-left" : "animal-cow"} style={{animationDelay: `${i * 3}s`}}>
                  <g transform={`translate(${c.x}, 203)`}>
                  <g className={c.dir > 0 ? "face-cow-left" : "face-cow"} style={{animationDelay: `${i * 3}s`}}>
                  <g transform={`translate(${-c.x}, -203)`} opacity="1">
                    {/* Body block - white */}
                    <rect x={c.x - 5} y="201" width="11" height="7" fill="#f5f5f5" />
                    {/* Black spots on body */}
                    <rect x={c.x - 3.5} y="202" width="3" height="2.5" fill="#2f2f2f" />
                    <rect x={c.x + 1} y="201.5" width="3.5" height="2.5" fill="#2f2f2f" />
                    {/* Neck */}
                    <rect x={c.x + (c.dir > 0 ? -7 : 5)} y="199" width="2.5" height="3" fill="#f5f5f5" />
                    {/* Head block */}
                    <rect x={c.x + (c.dir > 0 ? -11 : 5.5)} y="197" width="5" height="5" fill="#f5f5f5" />
                    {/* Face spot */}
                    <rect x={c.x + (c.dir > 0 ? -10.5 : 6)} y="197.5" width="2.5" height="2" fill="#2f2f2f" />
                    {/* Snout/muzzle - pink */}
                    <rect x={c.x + (c.dir > 0 ? -12.5 : 9)} y="200" width="2.5" height="2" fill="#ffb6c1" />
                    {/* Nostrils */}
                    <rect x={c.x + (c.dir > 0 ? -12 : 9.5)} y="200.8" width="0.5" height="0.5" fill="#4a3520" />
                    <rect x={c.x + (c.dir > 0 ? -11 : 10.5)} y="200.8" width="0.5" height="0.5" fill="#4a3520" />
                    {/* Eye */}
                    <rect x={c.x + (c.dir > 0 ? -8.5 : 7.5)} y="198.5" width="1" height="1" fill="#2f2f2f" />
                    <rect x={c.x + (c.dir > 0 ? -8.3 : 7.7)} y="198.5" width="0.4" height="0.5" fill="#ffffff" />
                    {/* Horns */}
                    <rect x={c.x + (c.dir > 0 ? -10 : 6.5)} y="195.5" width="0.8" height="2" fill="#8a7a6a" />
                    <rect x={c.x + (c.dir > 0 ? -8 : 8.5)} y="195.5" width="0.8" height="2" fill="#8a7a6a" />
                    {/* Udder - pink, flush under body */}
                    <rect x={c.x - 1.5} y="207" width="3" height="1.5" fill="#ffb6c1" />
                    {/* Legs - overlap body by 0.5px */}
                    <rect x={c.x - 4} y="207.5" width="1.3" height="4" fill="#e8e8e8" />
                    <rect x={c.x - 2} y="207.5" width="1.3" height="4" fill="#e8e8e8" />
                    <rect x={c.x + 1.5} y="207.5" width="1.3" height="4" fill="#e8e8e8" />
                    <rect x={c.x + 3.5} y="207.5" width="1.3" height="4" fill="#e8e8e8" />
                    {/* Hooves */}
                    <rect x={c.x - 4} y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={c.x - 2} y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={c.x + 1.5} y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={c.x + 3.5} y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                    {/* Tail */}
                    <rect x={c.x + (c.dir > 0 ? 5 : -6.5)} y="202" width="1" height="5" fill="#2f2f2f" />
                  </g></g></g>
                  </g>
                  </g>
                ))}
              </g>

              {/* Sheep - Minecraft blocky style, de-crowded */}
              <g>
                {[
                  {x: 65, dir: 1, y: -2},
                  {x: 300, dir: -1, y: 3},
                  {x: 500, dir: 1, y: 0},
                  {x: 680, dir: -1, y: 1},
                ].map((s, i) => (
                  <g key={`sheep-${i}`} transform={`translate(0, ${s.y})`}>
                  <g className={s.dir > 0 ? "animal-sheep-left" : "animal-sheep"} style={{animationDelay: `${i * 3.5}s`}}>
                  <g transform={`translate(${s.x}, 206)`}>
                  <g className={s.dir > 0 ? "face-sheep-left" : "face-sheep"} style={{animationDelay: `${i * 3.5}s`}}>
                  <g transform={`translate(${-s.x}, -206)`} opacity="1">
                    {/* Woolly body block - slightly oversized for fluffy look */}
                    <rect x={s.x - 5} y="203" width="10" height="6" fill="#f5f5f5" />
                    {/* Wool texture highlights */}
                    <rect x={s.x - 4} y="203.5" width="2" height="1.5" fill="#e8e8e8" />
                    <rect x={s.x + 1} y="204" width="2" height="1.5" fill="#e8e8e8" />
                    <rect x={s.x - 2} y="206" width="2" height="1.5" fill="#e8e8e8" />
                    {/* Dark face */}
                    <rect x={s.x + (s.dir > 0 ? -8 : 4)} y="203.5" width="3.5" height="4" fill="#2f2f2f" />
                    {/* Ears */}
                    <rect x={s.x + (s.dir > 0 ? -8.5 : 4)} y="203" width="1.2" height="1.5" fill="#2f2f2f" />
                    <rect x={s.x + (s.dir > 0 ? -5.5 : 6.5)} y="203" width="1.2" height="1.5" fill="#2f2f2f" />
                    {/* Eye */}
                    <rect x={s.x + (s.dir > 0 ? -7 : 5.5)} y="204.5" width="0.8" height="0.8" fill="#ffffff" />
                    <rect x={s.x + (s.dir > 0 ? -6.8 : 5.7)} y="204.5" width="0.3" height="0.4" fill="#1a1a1a" />
                    {/* Nose */}
                    <rect x={s.x + (s.dir > 0 ? -8.5 : 7)} y="206" width="1" height="0.7" fill="#1a1a1a" />
                    {/* Legs - dark, flush with body */}
                    <rect x={s.x - 3.5} y="208.5" width="1" height="3" fill="#2f2f2f" />
                    <rect x={s.x - 1.5} y="208.5" width="1" height="3" fill="#2f2f2f" />
                    <rect x={s.x + 1} y="208.5" width="1" height="3" fill="#2f2f2f" />
                    <rect x={s.x + 3} y="208.5" width="1" height="3" fill="#2f2f2f" />
                    {/* Tail puff */}
                    <rect x={s.x + (s.dir > 0 ? 4.5 : -5.5)} y="204" width="1.5" height="2" fill="#f5f5f5" />
                  </g></g></g>
                  </g>
                  </g>
                ))}
              </g>

              {/* Chickens - Minecraft blocky style, de-crowded */}
              <g>
                {[
                  {x: 15, y: 1, dir: 1},
                  {x: 245, y: -1, dir: -1},
                  {x: 380, y: 2, dir: 1},
                  {x: 500, y: -1, dir: -1},
                  {x: 630, y: 1, dir: 1},
                  {x: 790, y: 0, dir: -1},
                ].map((ch, i) => (
                  <g key={`chicken-${i}`} transform={`translate(0, ${ch.y})`}>
                  <g className={ch.dir > 0 ? "animal-chicken-left" : "animal-chicken"} style={{animationDelay: `${i * 1.5}s`}}>
                  <g transform={`translate(${ch.x}, 208)`}>
                  <g className={ch.dir > 0 ? "face-chicken-left" : "face-chicken"} style={{animationDelay: `${i * 1.5}s`}}>
                  <g transform={`translate(${-ch.x}, -208)`} opacity="1">
                    <rect x={ch.x - 2.5} y="207.5" width="5" height="3.5" fill="#d4a574" />
                    <rect x={ch.x + (ch.dir > 0 ? 0 : -2)} y="208" width="2" height="2" fill="#b8946a" />
                    <rect x={ch.x + (ch.dir > 0 ? 2 : -4)} y="206" width="2" height="3" fill="#8b6f47" />
                    <rect x={ch.x + (ch.dir > 0 ? -4 : 2)} y="206" width="2.5" height="2.5" fill="#d4a574" />
                    <rect x={ch.x + (ch.dir > 0 ? -3.5 : 2.5)} y="204.5" width="1.5" height="1.8" fill="#cc3333" />
                    <rect x={ch.x + (ch.dir > 0 ? -3.5 : 2.5)} y="208" width="0.8" height="0.8" fill="#cc3333" />
                    <rect x={ch.x + (ch.dir > 0 ? -5 : 4)} y="207" width="1.5" height="0.8" fill="#ffd700" />
                    <rect x={ch.x + (ch.dir > 0 ? -3 : 3)} y="206.5" width="0.5" height="0.5" fill="#2f2f2f" />
                    <rect x={ch.x - 1} y="210.5" width="0.7" height="2" fill="#e8a020" />
                    <rect x={ch.x + 0.7} y="210.5" width="0.7" height="2" fill="#e8a020" />
                    <rect x={ch.x - 1.5} y="212" width="1.5" height="0.5" fill="#e8a020" />
                    <rect x={ch.x + 0.5} y="212" width="1.5" height="0.5" fill="#e8a020" />
                  </g></g></g>
                  </g>
                  </g>
                ))}
              </g>

              {/* FOREGROUND: Drinking animals at pond - Minecraft blocky style */}
              <g>
                {/* Cow drinking at pond - head lowered toward water */}
                <g className="animal-drinking" style={{animationDelay: '0s', animationDuration: '12s'}}>
                  {/* Body block */}
                  <rect x={143} y="207" width="11" height="7" fill="#f5f5f5" />
                  {/* Black spots */}
                  <rect x={144.5} y="208" width="3" height="2.5" fill="#2f2f2f" />
                  <rect x={149} y="207.5" width="3.5" height="2.5" fill="#2f2f2f" />
                  {/* Neck - angled down toward water */}
                  <rect x={139} y="210" width="4.5" height="3" fill="#f5f5f5" />
                  {/* Head - lowered to water level */}
                  <rect x={135} y="211" width="5" height="4.5" fill="#f5f5f5" />
                  {/* Face spot */}
                  <rect x={135.5} y="211.5" width="2" height="1.5" fill="#2f2f2f" />
                  {/* Snout - pink */}
                  <rect x={133.5} y="213.5" width="2" height="2" fill="#ffb6c1" />
                  {/* Eye */}
                  <rect x={137.5} y="212" width="1" height="1" fill="#2f2f2f" />
                  {/* Water ripple */}
                  <rect x={133} y="216" width="6" height="0.5" fill="#6a9aba" opacity="0.4" />
                  <rect x={132} y="216.5" width="8" height="0.5" fill="#6a9aba" opacity="0.2" />
                  {/* Udder */}
                  <rect x={147} y="213" width="3" height="1.5" fill="#ffb6c1" />
                  {/* Legs */}
                  <rect x={144} y="213.5" width="1.3" height="3" fill="#e8e8e8" />
                  <rect x={146} y="213.5" width="1.3" height="3" fill="#e8e8e8" />
                  <rect x={150} y="213.5" width="1.3" height="3" fill="#e8e8e8" />
                  <rect x={152} y="213.5" width="1.3" height="3" fill="#e8e8e8" />
                  {/* Hooves */}
                  <rect x={144} y="216" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={146} y="216" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={150} y="216" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={152} y="216" width="1.3" height="0.7" fill="#2f2f2f" />
                  {/* Tail */}
                  <rect x={153.5} y="208" width="1" height="5" fill="#2f2f2f" />
                </g>

                {/* Horse drinking at opposite side - head lowered */}
                <g className="animal-drinking" style={{animationDelay: '4s', animationDuration: '10s'}}>
                  {/* Body block */}
                  <rect x={109} y="204" width="12" height="7" fill="#654321" />
                  {/* Chest */}
                  <rect x={117} y="204" width="4" height="7" fill="#7a5230" />
                  {/* Neck - angled down to water */}
                  <rect x={120} y="208" width="3" height="5" fill="#654321" />
                  {/* Head - lowered */}
                  <rect x={120} y="211" width="6" height="4" fill="#654321" />
                  {/* Muzzle */}
                  <rect x={124.5} y="213" width="2" height="2" fill="#7a5230" />
                  {/* Eye */}
                  <rect x={123} y="212" width="1" height="1" fill="#2f2f2f" />
                  {/* Nostril */}
                  <rect x={125.5} y="214" width="0.5" height="0.5" fill="#3a2a1a" />
                  {/* Water ripple */}
                  <rect x={123} y="215.5" width="5" height="0.5" fill="#6a9aba" opacity="0.4" />
                  <rect x={122} y="216" width="7" height="0.5" fill="#6a9aba" opacity="0.2" />
                  {/* Legs */}
                  <rect x={110} y="210.5" width="1.3" height="4.5" fill="#654321" />
                  <rect x={112.5} y="210.5" width="1.3" height="4.5" fill="#654321" />
                  <rect x={115} y="210.5" width="1.3" height="4.5" fill="#654321" />
                  <rect x={117.5} y="210.5" width="1.3" height="4.5" fill="#654321" />
                  {/* Hooves */}
                  <rect x={110} y="214.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={112.5} y="214.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={115} y="214.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={117.5} y="214.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  {/* Tail */}
                  <rect x={108} y="205" width="1.5" height="5" fill="#4a3520" />
                  {/* Mane */}
                  <rect x={120} y="208" width="1" height="4" fill="#4a3520" />
                </g>

                {/* Chickens bathing in shallow water - Minecraft blocky style */}
                {[126, 131, 135].map((cx, ci) => (
                  <g key={`chicken-bath-${ci}`} className="chicken-bathing" style={{animationDelay: `${ci * 1.2}s`}}>
                    {/* Body - partially submerged */}
                    <rect x={cx - 2} y="216" width="4" height="2" fill="#d4a574" />
                    {/* Water splash around body */}
                    <rect x={cx - 3} y="217.5" width="6" height="0.5" fill="#6a9aba" opacity="0.35" />
                    {/* Head poking up */}
                    <rect x={cx - 3} y="214.5" width="2" height="2" fill="#d4a574" />
                    {/* Comb */}
                    <rect x={cx - 2.5} y="213.5" width="1.2" height="1.2" fill="#cc3333" />
                    {/* Beak */}
                    <rect x={cx - 4} y="215.5" width="1.2" height="0.6" fill="#ffd700" />
                    {/* Eye */}
                    <rect x={cx - 2.5} y="215" width="0.4" height="0.4" fill="#2f2f2f" />
                    {/* Water droplets */}
                    <rect x={cx + 1.5} y="215.5" width="0.5" height="0.5" fill="#6a9aba" opacity="0.5" />
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

              {/* Background landscape - rolling hills with depth and house silhouettes */}
              {/* Rendered FIRST so foreground houses, roads, and cars appear in front */}

              {/* === LAYER 1: Farthest hills - starts matching rural distant hills at x=800, then rises === */}
              <g opacity="0.55">
                <path d="M 800,195 Q 870,190 950,186 Q 1050,178 1150,174 Q 1250,168 1350,165 Q 1450,162 1550,164 Q 1650,162 1750,166 Q 1850,172 1950,180 Q 2000,188 2000,210 L 800,210 Z"
                      fill="#5a7a5a" />
                {/* Farthest house silhouettes - small, visible */}
                {[900, 980, 1060, 1150, 1240, 1330, 1420, 1510, 1600, 1690, 1780, 1870, 1940].map((bx, bi) => {
                  const bh = 2 + (bi % 2) * 1;
                  const bw = 3 + (bi % 3);
                  const by = 170 - (bi % 4) * 1.5 - Math.sin(bi * 0.8) * 2 + (bx < 950 ? 15 : 0) + (bx > 1800 ? 10 : 0);
                  return (
                    <g key={`bg-far-${bi}`}>
                      <rect x={bx} y={by} width={bw} height={bh} fill="#4a6a4a" />
                      <path d={`M ${bx-0.3},${by} L ${bx + bw/2},${by - 1.5} L ${bx + bw + 0.3},${by} Z`} fill="#3a5a3a" />
                    </g>
                  );
                })}
              </g>

              {/* === LAYER 2: Mid-distance hills - ramps from rural mid-ground level === */}
              <g opacity="0.45">
                <path d="M 800,202 Q 880,198 960,195 Q 1050,190 1150,186 Q 1300,180 1450,183 Q 1600,179 1750,184 Q 1880,190 1950,197 Q 2000,202 2000,210 L 800,210 Z"
                      fill="#4a7a4a" />
                {/* Mid-distance tree line - starts sparse, gets denser */}
                {[920, 1010, 1090, 1180, 1270, 1350, 1440, 1530, 1620, 1710, 1800, 1890].map((tx, ti) => {
                  const ty = 185 + Math.sin(ti * 1.2) * 3 + (tx < 950 ? 8 : 0) + (tx > 1800 ? 6 : 0);
                  return (
                    <g key={`bg-mid-tree-${ti}`}>
                      <rect x={tx} y={ty + 3} width="1" height="3" fill="#3a5a3a" />
                      <ellipse cx={tx + 0.5} cy={ty + 2} rx="2.5" ry="3" fill="#4a6a4a" />
                    </g>
                  );
                })}
              </g>

              {/* === LAYER 3: Near backdrop - gentle transition from rural to ground === */}
              <g opacity="0.35">
                <path d="M 800,206 Q 900,203 1000,200 Q 1150,195 1300,193 Q 1500,191 1650,194 Q 1800,198 1900,203 Q 2000,207 2000,210 L 800,210 Z"
                      fill="#3a6a3a" />
              </g>

              {/* Full green ground - no road, grass everywhere */}
              <g opacity="1">
                {/* Lush grass covering entire ground area */}
                <rect x="800" y="210" width="1200" height="40" fill="#7aa87a" opacity="1" />
                <rect x="800" y="215" width="1200" height="35" fill="#6a9a6a" opacity="0.8" />
                <rect x="800" y="225" width="1200" height="25" fill="#5a8a5a" opacity="0.6" />
                {/* Grass texture - subtle variation patches */}
                {[830, 870, 920, 960, 1010, 1060, 1110, 1160, 1210, 1260, 1310, 1360, 1410, 1460, 1510, 1560, 1610, 1660, 1710, 1760, 1810, 1860, 1910, 1950].map((gx, gi) => (
                  <ellipse key={`grass-patch-${gi}`} cx={gx} cy={218 + (gi % 5) * 6} rx={8 + (gi % 3) * 3} ry={3 + (gi % 2) * 2} fill={gi % 2 === 0 ? "#8ab88a" : "#7aaa7a"} opacity="0.4" />
                ))}
                {/* Winding walking path through the green - stone/gravel */}
                <path d="M 800,230 Q 850,225 900,228 Q 960,232 1020,226 Q 1100,222 1180,228 Q 1260,234 1340,226 Q 1420,220 1500,228 Q 1580,235 1660,227 Q 1740,222 1820,228 Q 1900,234 1960,228 Q 1990,226 2000,228" stroke="#c9b89a" strokeWidth="3" fill="none" opacity="0.5" strokeLinecap="round" />
                <path d="M 800,230 Q 850,225 900,228 Q 960,232 1020,226 Q 1100,222 1180,228 Q 1260,234 1340,226 Q 1420,220 1500,228 Q 1580,235 1660,227 Q 1740,222 1820,228 Q 1900,234 1960,228 Q 1990,226 2000,228" stroke="#d4c4a0" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
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
                  {/* Garden bed where driveway used to be */}
                  <ellipse cx={x+34} cy="209" rx="4" ry="2" fill="#5a8a5a" opacity="0.8" />
                  <circle cx={x+32} cy="208.5" r="0.6" fill="#ff69b4" opacity="0.9" />
                  <circle cx={x+35} cy="208.5" r="0.6" fill="#ffd700" opacity="0.9" />
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
                  {/* Garden shed converted from garage */}
                  <rect x={x-12} y="193" width="12" height="15" fill={`url(#colonialHouse-${iteration})`} />
                  <path d={`M ${x-14},193 L ${x-6},187 L ${x+2},193 Z`} fill={`url(#colonialRoof-${iteration})`} />
                  {/* Shed window */}
                  <rect x={x-9} y="198" width="4" height="4" fill="#6b8ea8" opacity="0.7" />
                  {/* Garden path stones */}
                  <ellipse cx={x-5} cy="209" rx="2" ry="1" fill="#b8b0a0" opacity="0.5" />
                  <ellipse cx={x-8} cy="210" rx="1.5" ry="0.8" fill="#b8b0a0" opacity="0.4" />
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
                  {/* Green lawn where driveway was */}
                  <ellipse cx={x+43} cy="208" rx="5" ry="2.5" fill="#6a9a6a" opacity="0.7" />
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
                  {/* Short stepping stones to door */}
                  {[0, 3].map((step, si) => (
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
                  {/* Modern garden studio (converted from garage) */}
                  <rect x={x-10} y="195" width="10" height="12" fill={`url(#modernHouse-${iteration})`} />
                  <rect x={x-9} y="195" width="8" height="0.8" fill={`url(#modernRoof-${iteration})`} />
                  {/* Studio window */}
                  <rect x={x-8} y="199" width="6" height="5" fill="#6b8ea8" opacity="0.7" />
                  {/* Grassy area where driveway was */}
                  <ellipse cx={x-5} cy="208.5" rx="5" ry="2" fill="#6a9a6a" opacity="0.6" />
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

              {/* ===== PARKS & PLAYGROUNDS in grassy areas between houses ===== */}
              <g opacity="1">
                {/* === PLAYGROUND 1: Swing set near x=870 === */}
                <g>
                  {/* A-frame legs */}
                  <path d="M 862,210 L 865,200 L 868,210" stroke="#8a6a4a" strokeWidth="1.2" fill="none" />
                  <path d="M 878,210 L 875,200 L 872,210" stroke="#8a6a4a" strokeWidth="1.2" fill="none" />
                  {/* Top bar */}
                  <rect x="864" y="199.5" width="12" height="1" fill="#8a6a4a" rx="0.3" />
                  {/* Swing chains + seats */}
                  <line x1="867" y1="200" x2="866" y2="208" stroke="#6a6a6a" strokeWidth="0.4" />
                  <line x1="868.5" y1="200" x2="867.5" y2="208" stroke="#6a6a6a" strokeWidth="0.4" />
                  <rect x="865.5" y="208" width="2.5" height="0.8" rx="0.3" fill="#3a3a3a" />
                  <line x1="873" y1="200" x2="874" y2="207" stroke="#6a6a6a" strokeWidth="0.4" />
                  <line x1="874.5" y1="200" x2="875.5" y2="207" stroke="#6a6a6a" strokeWidth="0.4" />
                  <rect x="873.5" y="207" width="2.5" height="0.8" rx="0.3" fill="#3a3a3a" />
                </g>

                {/* === PLAYGROUND 2: Slide near x=1105 === */}
                <g>
                  {/* Ladder */}
                  <rect x="1100" y="203" width="1" height="8" fill="#5a7a8a" />
                  <rect x="1103" y="203" width="1" height="8" fill="#5a7a8a" />
                  {/* Ladder rungs */}
                  <rect x="1100" y="205" width="4" height="0.6" fill="#5a7a8a" />
                  <rect x="1100" y="207" width="4" height="0.6" fill="#5a7a8a" />
                  <rect x="1100" y="209" width="4" height="0.6" fill="#5a7a8a" />
                  {/* Platform */}
                  <rect x="1099" y="202.5" width="6" height="1" fill="#5a7a8a" rx="0.3" />
                  {/* Slide chute - curved */}
                  <path d="M 1105,203 Q 1110,206 1112,211" stroke="#e8a020" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  {/* Slide rails */}
                  <path d="M 1104.5,203 Q 1109.5,206 1111.5,211" stroke="#cc8800" strokeWidth="0.5" fill="none" />
                  <path d="M 1105.5,203 Q 1110.5,206 1112.5,211" stroke="#cc8800" strokeWidth="0.5" fill="none" />
                </g>

                {/* === PARK BENCH near x=1170 === */}
                <g>
                  {/* Bench legs */}
                  <rect x="1166" y="211" width="1" height="3" fill="#6b5a45" />
                  <rect x="1174" y="211" width="1" height="3" fill="#6b5a45" />
                  {/* Seat */}
                  <rect x="1165" y="210.5" width="11" height="1" rx="0.3" fill="#8b7355" />
                  {/* Back rest */}
                  <rect x="1165" y="208.5" width="11" height="0.8" rx="0.3" fill="#8b7355" />
                  <rect x="1165" y="210" width="0.5" height="2" fill="#6b5a45" />
                  <rect x="1175.5" y="210" width="0.5" height="2" fill="#6b5a45" />
                </g>

                {/* === SANDBOX near x=1350 === */}
                <g>
                  {/* Sandbox border */}
                  <rect x="1344" y="211" width="12" height="4" rx="0.5" fill="#c9a855" opacity="0.8" />
                  {/* Sand fill */}
                  <rect x="1345" y="211.5" width="10" height="3" rx="0.3" fill="#e8d4a0" opacity="0.9" />
                  {/* Little sand mounds */}
                  <ellipse cx="1348" cy="212.5" rx="1.5" ry="0.8" fill="#d4c490" />
                  <ellipse cx="1352" cy="213" rx="1.2" ry="0.6" fill="#d4c490" />
                  {/* Tiny flag in sand */}
                  <rect x="1350" y="210" width="0.4" height="2.5" fill="#6b5a45" />
                  <path d="M 1350.4,210 L 1353,210.8 L 1350.4,211.5" fill="#cc3333" />
                </g>

                {/* === PLAYGROUND 3: Seesaw/teeter-totter near x=1465 === */}
                <g>
                  {/* Fulcrum triangle */}
                  <path d="M 1463,214 L 1465,211 L 1467,214 Z" fill="#5a7a8a" />
                  {/* Plank */}
                  <rect x="1459" y="210.5" width="12" height="0.8" rx="0.3" fill="#8b7355" transform="rotate(-5, 1465, 211)" />
                  {/* Handle nubs */}
                  <rect x="1460" y="209.5" width="0.8" height="2" rx="0.3" fill="#5a7a8a" transform="rotate(-5, 1465, 211)" />
                  <rect x="1469.5" y="210.5" width="0.8" height="2" rx="0.3" fill="#5a7a8a" transform="rotate(-5, 1465, 211)" />
                </g>

                {/* === BASKETBALL HOOP near x=1650 === */}
                <g>
                  {/* Pole */}
                  <rect x="1648" y="196" width="1.2" height="16" fill="#6a6a6a" />
                  {/* Backboard */}
                  <rect x="1645" y="196" width="8" height="5" rx="0.3" fill="#e8e8e8" opacity="0.9" />
                  <rect x="1646" y="197" width="6" height="3.5" rx="0.2" fill="#ffffff" opacity="0.6" />
                  {/* Rim */}
                  <ellipse cx="1651" cy="201" rx="2" ry="0.6" fill="none" stroke="#cc3333" strokeWidth="0.6" />
                  {/* Net (simplified) */}
                  <path d="M 1649,201.5 L 1650,204 M 1651,201.5 L 1651,204 M 1653,201.5 L 1652,204" stroke="#e8e0d0" strokeWidth="0.3" />
                </g>

                {/* === FLOWER GARDEN near x=1770 === */}
                <g>
                  {/* Garden border stones */}
                  <ellipse cx="1770" cy="212" rx="8" ry="3" fill="#5a8a5a" opacity="0.6" />
                  {/* Flowers - colorful clusters */}
                  <circle cx="1766" cy="211" r="0.8" fill="#ff69b4" />
                  <circle cx="1768" cy="210.5" r="0.9" fill="#ffd700" />
                  <circle cx="1770" cy="211.2" r="0.7" fill="#9370db" />
                  <circle cx="1772" cy="210.8" r="0.8" fill="#ff6347" />
                  <circle cx="1774" cy="211.5" r="0.7" fill="#ff69b4" />
                  <circle cx="1767" cy="212" r="0.6" fill="#87ceeb" />
                  <circle cx="1771" cy="212.5" r="0.6" fill="#ffd700" />
                  <circle cx="1773" cy="212" r="0.7" fill="#9370db" />
                  {/* Stems */}
                  {[1766,1768,1770,1772,1774].map((fx, fi) => (
                    <rect key={`stem-${fi}`} x={fx - 0.15} y="211" width="0.3" height="2" fill="#4a7a3a" opacity="0.6" />
                  ))}
                </g>

                {/* === PARK BENCH 2 near x=1890 === */}
                <g>
                  <rect x="1886" y="211" width="1" height="3" fill="#6b5a45" />
                  <rect x="1894" y="211" width="1" height="3" fill="#6b5a45" />
                  <rect x="1885" y="210.5" width="11" height="1" rx="0.3" fill="#8b7355" />
                  <rect x="1885" y="208.5" width="11" height="0.8" rx="0.3" fill="#8b7355" />
                  <rect x="1885" y="210" width="0.5" height="2" fill="#6b5a45" />
                  <rect x="1895.5" y="210" width="0.5" height="2" fill="#6b5a45" />
                </g>

                {/* === LITTLE FREE LIBRARY near x=1290 === */}
                <g>
                  {/* Post */}
                  <rect x="1289" y="206" width="1.5" height="8" fill="#6b5a45" />
                  {/* Box */}
                  <rect x="1286" y="203" width="7" height="4" fill="#d4e7f5" rx="0.3" />
                  {/* Roof */}
                  <path d="M 1285,203 L 1289.5,200 L 1294,203 Z" fill="#a85757" />
                  {/* Door/glass */}
                  <rect x="1287.5" y="204" width="4" height="2.5" fill="#8ab8d8" opacity="0.6" rx="0.2" />
                  {/* Tiny books visible inside */}
                  <rect x="1288" y="204.5" width="0.8" height="1.8" fill="#cc3333" opacity="0.5" />
                  <rect x="1289" y="204.5" width="0.8" height="1.8" fill="#3a5a8a" opacity="0.5" />
                  <rect x="1290" y="204.5" width="0.8" height="1.8" fill="#4a7a4a" opacity="0.5" />
                </g>
              </g>

              {/* Park lamp posts - shorter, decorative */}
              <g opacity="1">
                {[870, 1020, 1170, 1320, 1470, 1620, 1770, 1920].map((x, i) => (
                  <g key={`park-light-${i}`}>
                    {/* Decorative lamp post */}
                    <rect x={x} y="207" width="1" height="8" fill="#4a4a4a" opacity="0.8" />
                    {/* Lamp top - globe style */}
                    <circle cx={x+0.5} cy="206.5" r="1.5" fill="#e8e0d0" opacity="0.7" />
                    <circle cx={x+0.5} cy="206.5" r="0.8" fill="#ffd700" opacity="0.5" />
                  </g>
                ))}
              </g>

              {/* People walking / cycling on paths */}
              <g opacity="0.8">
                {/* Person walking dog near x=900 */}
                <g>
                  <circle cx="905" cy="225" r="1.2" fill="#d4a574" />
                  <rect x="904.3" y="226" width="1.5" height="3" fill="#4a6a8a" />
                  <rect x="904" y="229" width="0.7" height="2" fill="#3a3a5a" />
                  <rect x="905.5" y="229" width="0.7" height="2" fill="#3a3a5a" />
                  {/* Leash */}
                  <path d="M 906,227.5 Q 908,228 910,228" stroke="#6b5a45" strokeWidth="0.3" fill="none" />
                  {/* Dog */}
                  <rect x="909" y="228" width="3" height="2" rx="0.5" fill="#8b6f47" />
                  <rect x="912" y="227" width="1.5" height="1.5" fill="#8b6f47" />
                  <rect x="909.5" y="230" width="0.5" height="1" fill="#6b5a45" />
                  <rect x="911.5" y="230" width="0.5" height="1" fill="#6b5a45" />
                </g>
                {/* Person on bench reading near x=1170 */}
                <g>
                  <circle cx="1170" cy="207.5" r="1.2" fill="#8b6f47" />
                  <rect x="1169.3" y="208.5" width="1.5" height="2.5" fill="#5a7a3a" />
                  {/* Book */}
                  <rect x="1168" y="209" width="1.2" height="1.5" fill="#e8e8e8" />
                </g>
                {/* Kid on swing near x=870 */}
                <g>
                  <circle cx="867" cy="205.5" r="0.8" fill="#d4a574" />
                  <rect x="866.5" y="206.2" width="1" height="2" fill="#cc3333" />
                </g>
              </g>

              {/* ===== SUBURBAN SIDEWALK at y=237, curving up to meet city sidewalk at y=214 near x=2000 ===== */}
              <g opacity="1">
                {/* Concrete sidewalk strip - flat until x=1850, then curves up to y=214 at x=2000 */}
                <path d="M 800,237 L 1850,237 Q 1900,237 1930,232 Q 1960,225 1980,218 Q 1995,215 2000,214 L 2000,218 Q 1995,219 1980,222 Q 1960,229 1930,236 Q 1900,240.5 1850,240.5 L 800,240.5 Z" fill="#d4d0c8" opacity="0.9" />
                {/* Sidewalk expansion joints - flat portion */}
                {Array.from({length: 53}).map((_, ji) => (
                  <rect key={`sw-joint-${ji}`} x={810 + ji * 20} y="237" width="0.4" height="3.5" fill="#bab6ae" opacity="0.4" />
                ))}
                {/* Curb edge - flat portion */}
                <path d="M 800,240.5 L 1850,240.5 Q 1900,240.5 1930,236 Q 1960,229 1980,222 Q 1995,219 2000,218" stroke="#b8b4ac" strokeWidth="0.8" fill="none" opacity="0.6" />
              </g>

              {/* ===== LONG DRIVEWAYS - mixed styles: skinny concrete, curved, stone walkways ===== */}
              <g opacity="0.8">
                {/* Victorian - alternating: gentle curve + stone walkway */}
                {[820, 1120, 1420, 1720].map((x, i) => (
                  i % 2 === 0 ? (
                    <path key={`vic-dw-${i}`} d={`M ${x+16},212 Q ${x+17},220 ${x+15},228 Q ${x+16},233 ${x+16},237`} stroke="#c8c4bc" strokeWidth="3.5" fill="none" opacity="0.65" strokeLinecap="round" />
                  ) : (
                    <g key={`vic-dw-${i}`}>
                      {Array.from({length: 9}).map((_, si) => (
                        <ellipse key={`vic-stone-${i}-${si}`} cx={x+16 + (si % 2 === 0 ? 0 : 0.8)} cy={213 + si * 2.8} rx="1.8" ry="1.2" fill="#b8b0a0" opacity="0.6" transform={`rotate(${si * 12 - 10}, ${x+16}, ${213 + si * 2.8})`} />
                      ))}
                    </g>
                  )
                ))}
                {/* Colonial - alternating: straight skinny + gentle curve */}
                {[1000, 1300, 1600, 1900].map((x, i) => (
                  i % 2 === 0 ? (
                    <rect key={`col-dw-${i}`} x={x+17} y="212" width="3.5" height="25" rx="0.5" fill="#c8c4bc" opacity="0.6" />
                  ) : (
                    <path key={`col-dw-${i}`} d={`M ${x+17},212 Q ${x+19},222 ${x+16},230 Q ${x+17},234 ${x+17},237`} stroke="#c8c4bc" strokeWidth="3.5" fill="none" opacity="0.6" strokeLinecap="round" />
                  )
                ))}
                {/* Ranch - alternating: skinny straight + stone path */}
                {[880, 1180, 1480, 1780].map((x, i) => (
                  i % 2 === 0 ? (
                    <rect key={`ranch-dw-${i}`} x={x+22} y="210" width="3.5" height="27" rx="0.5" fill="#c8c4bc" opacity="0.6" />
                  ) : (
                    <g key={`ranch-dw-${i}`}>
                      {Array.from({length: 10}).map((_, si) => (
                        <rect key={`ranch-stone-${i}-${si}`} x={x+21 + (si % 2 === 0 ? 0 : 0.5)} y={211 + si * 2.6} width="3" height="1.8" rx="0.8" fill="#b0a898" opacity="0.55" />
                      ))}
                    </g>
                  )
                ))}
                {/* Cottage - natural stepping stones with slight wander */}
                {[1060, 1360, 1660, 1960].map((x, i) => (
                  <g key={`cot-path-${i}`}>
                    {Array.from({length: 9}).map((_, si) => {
                      const wobble = Math.sin(si * 1.3 + i) * 1.5;
                      return (
                        <ellipse key={`cot-step-${i}-${si}`} cx={x+14 + wobble} cy={213 + si * 2.7} rx="2" ry="1.3" fill="#a8a090" opacity="0.55" transform={`rotate(${si * 15 + i * 8}, ${x+14 + wobble}, ${213 + si * 2.7})`} />
                      );
                    })}
                  </g>
                ))}
                {/* Modern - alternating: sleek skinny + curved path */}
                {[940, 1240, 1540, 1840].map((x, i) => (
                  i % 2 === 0 ? (
                    <path key={`mod-dw-${i}`} d={`M ${x+15},210 Q ${x+16},220 ${x+14},230 Q ${x+15},234 ${x+15},237`} stroke="#a0a098" strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round" />
                  ) : (
                    <rect key={`mod-dw-${i}`} x={x+14} y="210" width="3" height="27" rx="0.3" fill="#a0a098" opacity="0.55" />
                  )
                ))}
              </g>

              {/* ===== GARAGE DRIVEWAYS - wider concrete, from garage to sidewalk ===== */}
              <g opacity="0.75">
                {/* Ranch garage driveways - attached garage at x+38, garage door at x+39 */}
                {[880, 1180, 1480, 1780].map((x, i) => (
                  <rect key={`ranch-gdw-${i}`} x={x+40} y="207" width="7" height="30" rx="0.5" fill="#c4c0b8" opacity="0.7" />
                ))}
                {/* Colonial driveways to shed/garage at x-12 */}
                {[1000, 1300, 1600, 1900].map((x, i) => (
                  <path key={`col-gdw-${i}`} d={`M ${x-6},208 Q ${x-5},218 ${x-7},228 Q ${x-6},234 ${x-6},237`} stroke="#c4c0b8" strokeWidth="6" fill="none" opacity="0.6" strokeLinecap="round" />
                ))}
                {/* Modern driveways to studio/garage at x-10 */}
                {[940, 1240, 1540, 1840].map((x, i) => (
                  <rect key={`mod-gdw-${i}`} x={x-7} y="207" width="6" height="30" rx="0.3" fill="#b0b0a8" opacity="0.55" />
                ))}
              </g>

              {/* ===== MAILBOXES at the sidewalk ===== */}
              <g opacity="1">
                {[835, 950, 1070, 1135, 1250, 1370, 1435, 1550, 1670, 1735, 1850, 1970].map((x, i) => (
                  <g key={`mailbox-${i}`}>
                    {/* Post */}
                    <rect x={x} y="232" width="1.2" height="5.5" fill="#5a4a3a" />
                    {/* Mailbox */}
                    <rect x={x-0.8} y="231" width="3" height="2" rx="0.5" fill={i % 3 === 0 ? "#2a2a2a" : "#d4af37"} />
                  </g>
                ))}
              </g>

              {/* ===== FIRE HYDRANTS along sidewalk ===== */}
              <g opacity="0.9">
                {[1000, 1400, 1800].map((x, i) => (
                  <g key={`hydrant-${i}`}>
                    <rect x={x} y="234" width="2.5" height="3.5" fill="#cc3333" />
                    <rect x={x-0.3} y="235" width="3" height="1.2" fill="#aa2222" />
                  </g>
                ))}
              </g>

              {/* ========== PHASE 3: SUSTAINABLE GREEN CITY - PROJECT EXODUS (2000-3800) ========== */}

              {/* Flat ground layer - with wide buffers from suburbs and to rural (WIDE BUFFERS: 2000-2100, 3600-3900) */}
              <path d="M 2000,210 Q 2100,210 2200,210 L 3400,210 Q 3500,209 3600,208 Q 3650,207 3700,206 Q 3750,205 3800,205 Q 3850,203 3900,200 L 3900,250 L 2000,250 Z"
                    fill="#7aa87a" opacity="1" />
              <path d="M 2000,208 Q 2100,208 2200,208 L 3400,208 Q 3500,207 3600,206 Q 3650,206 3700,205 Q 3750,204 3800,204 Q 3850,202 3900,199 L 3900,250 L 2000,250 Z"
                    fill="#8ab88a" opacity="1" />

              {/* === CITY BACKGROUND: Transition hills that merge suburbs → city → rural === */}
              {/* Left transition (x=2000-2400): hills fade OUT from suburban background */}
              <g opacity="0.1">
                <path d="M 2000,188 Q 2050,191 2100,195 Q 2200,200 2300,205 Q 2400,208 2400,210 L 2400,210 L 2000,210 Z"
                      fill="#8aaa8a" />
              </g>
              <g opacity="0.06">
                <path d="M 2000,202 Q 2050,204 2100,206 Q 2200,208 2300,209 Q 2400,210 2400,210 L 2400,210 L 2000,210 Z"
                      fill="#7a9a7a" />
              </g>
              {/* Right transition (x=3400-3800): hills fade IN toward ending rural */}
              <g opacity="0.1">
                <path d="M 3400,210 Q 3500,208 3600,204 Q 3650,200 3700,197 Q 3750,195 3800,197 Q 3850,199 3900,200 L 3900,210 L 3400,210 Z"
                      fill="#4a7a4a" />
              </g>
              <g opacity="0.06">
                <path d="M 3500,210 Q 3600,207 3700,203 Q 3750,200 3800,202 Q 3850,204 3900,205 L 3900,210 L 3500,210 Z"
                      fill="#5a8a5a" />
              </g>

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
              {/* Distant background hills - ramp up from city transition */}
              <path d="M 3800,205 Q 3850,202 3900,198 Q 3950,194 4000,195 Q 4150,186 4300,192 Q 4450,188 4600,193 Q 4750,185 4900,192 Q 5000,197 5000,200 L 5000,250 L 3800,250 Z"
                    fill="#4a7a4a" opacity="0.5" />
              <path d="M 3800,204 Q 3850,200 3900,196 Q 3950,192 4050,193 Q 4200,183 4350,190 Q 4500,195 4650,187 Q 4800,183 4950,192 Q 5000,195 5000,197 L 5000,250 L 3800,250 Z"
                    fill="#5a8a5a" opacity="0.45" />
              {/* Mid-ground hills - start flat near city boundary, then undulate */}
              <path d="M 3800,208 Q 3850,207 3900,204 Q 3950,202 4000,202 Q 4100,215 4200,200 Q 4300,192 4400,202 Q 4500,205 4600,197 Q 4700,202 4800,205 Q 4900,197 5000,210 L 5000,250 L 3800,250 Z"
                    fill="#7aa87a" opacity="1" />
              <path d="M 3800,207 Q 3850,205 3900,202 Q 3950,200 4000,200 Q 4100,208 4200,197 Q 4300,187 4400,197 Q 4500,203 4600,192 Q 4700,187 4800,194 Q 4900,190 5000,205 L 5000,250 L 3800,250 Z"
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
                {/* Blades - 4 wide fan blades, animated spin (slower) */}
                <g className="windmill-blades-slow" style={{transformOrigin: '4191px 173px'}}>
                  {/* Blade 1 - Up */}
                  <path d="M 4190,172 L 4189,158 L 4191,155 L 4193,158 L 4192,172 Z" fill="#e8e0d0" opacity="0.85" />
                  <path d="M 4190,172 L 4189,158 L 4191,155" stroke="#d4ccb8" strokeWidth="0.4" fill="none" />
                  <path d="M 4191,165 L 4192,165" stroke="#ccc4b0" strokeWidth="0.3" opacity="0.6" />
                  <path d="M 4191,160 L 4192,160" stroke="#ccc4b0" strokeWidth="0.3" opacity="0.6" />
                  {/* Blade 2 - Down */}
                  <path d="M 4192,174 L 4193,188 L 4191,191 L 4189,188 L 4190,174 Z" fill="#ddd6c4" opacity="0.8" />
                  <path d="M 4192,174 L 4193,188 L 4191,191" stroke="#ccc4b0" strokeWidth="0.4" fill="none" />
                  <path d="M 4191,181 L 4190,181" stroke="#ccc4b0" strokeWidth="0.3" opacity="0.6" />
                  {/* Blade 3 - Left */}
                  <path d="M 4190,172 L 4176,171 L 4174,173 L 4176,175 L 4190,174 Z" fill="#d8d0be" opacity="0.82" />
                  <path d="M 4190,172 L 4176,171 L 4174,173" stroke="#ccc4b0" strokeWidth="0.4" fill="none" />
                  <path d="M 4183,173 L 4183,172" stroke="#ccc4b0" strokeWidth="0.3" opacity="0.6" />
                  {/* Blade 4 - Right */}
                  <path d="M 4192,174 L 4206,175 L 4208,173 L 4206,171 L 4192,172 Z" fill="#e8e0d0" opacity="0.78" />
                  <path d="M 4192,174 L 4206,175 L 4208,173" stroke="#d4ccb8" strokeWidth="0.4" fill="none" />
                  <path d="M 4199,173 L 4199,174" stroke="#ccc4b0" strokeWidth="0.3" opacity="0.6" />
                </g>
                <circle cx="4191" cy="173" r="2" fill="#6a6a5a" opacity="1" />
                <circle cx="4191" cy="173" r="1" fill="#5a5a4a" opacity="1" />
              </g>

              {/* FARM ANIMALS - Minecraft/voxel style, matching opening biome */}

              {/* Horses - improved proportions, de-crowded */}
              <g>
                {[
                  {x: 3850, dir: -1, y: 1, color: '#654321', chest: '#7a5230'},
                  {x: 4150, dir: 1, y: -2, color: '#8b6f47', chest: '#9a7a55'},
                  {x: 4330, dir: -1, y: 3, color: '#4a3520', chest: '#5a3a25'},
                  {x: 4520, dir: -1, y: -1, color: '#654321', chest: '#7a5230'},
                  {x: 4900, dir: 1, y: 2, color: '#8b6f47', chest: '#9a7a55'},
                ].map((h, i) => (
                  <g key={`horse-end-${i}`} transform={`translate(0, ${h.y})`}>
                  <g className={h.dir > 0 ? "animal-horse-left" : "animal-horse"} style={{animationDelay: `${i * 2.5}s`}}>
                  <g transform={`translate(${h.x}, 203)`}>
                  <g className={h.dir > 0 ? "face-horse-left" : "face-horse"} style={{animationDelay: `${i * 2.5}s`}}>
                  <g transform={`translate(${-h.x}, -203)`} opacity="1">
                    <rect x={h.x - 6} y="201" width="12" height="7" fill={h.color} />
                    <rect x={h.x + (h.dir > 0 ? -6 : 2)} y="201" width="4" height="7" fill={h.chest} />
                    <rect x={h.x + (h.dir > 0 ? -8 : 5)} y="197.5" width="2.5" height="4.5" fill={h.color} />
                    <rect x={h.x + (h.dir > 0 ? -11.5 : 6.5)} y="195.5" width="4.5" height="3.5" fill={h.color} />
                    <rect x={h.x + (h.dir > 0 ? -12.5 : 10)} y="197" width="1.5" height="2" fill={h.chest} />
                    <rect x={h.x + (h.dir > 0 ? -10 : 8.5)} y="196.5" width="0.8" height="0.8" fill="#2f2f2f" />
                    <rect x={h.x + (h.dir > 0 ? -9.8 : 8.7)} y="196.5" width="0.3" height="0.4" fill="#ffffff" />
                    <rect x={h.x + (h.dir > 0 ? -11 : 7.5)} y="194" width="1" height="1.8" fill={h.color} />
                    <rect x={h.x + (h.dir > 0 ? -9.5 : 9)} y="194" width="1" height="1.8" fill={h.color} />
                    <rect x={h.x + (h.dir > 0 ? -12 : 11)} y="198" width="0.5" height="0.5" fill="#3a2a1a" />
                    <rect x={h.x + 3} y="207.5" width="1.3" height="4" fill={h.color} />
                    <rect x={h.x + 5} y="207.5" width="1.3" height="4" fill={h.chest} />
                    <rect x={h.x - 5.3} y="207.5" width="1.3" height="4" fill={h.color} />
                    <rect x={h.x - 3.3} y="207.5" width="1.3" height="4" fill={h.chest} />
                    <rect x={h.x + 3} y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={h.x + 5} y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={h.x - 5.3} y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={h.x - 3.3} y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={h.x + (h.dir > 0 ? 5.5 : -7)} y="201.5" width="1.5" height="5.5" fill="#4a3520" />
                    <rect x={h.x + (h.dir > 0 ? -8 : 7)} y="195.5" width="1" height="6" fill="#4a3520" />
                  </g></g></g>
                  </g>
                  </g>
                ))}
              </g>

              {/* Cows - de-crowded */}
              <g>
                {[
                  {x: 3930, dir: 1, y: 3},
                  {x: 4220, dir: -1, y: -1},
                  {x: 4400, dir: 1, y: 2},
                  {x: 4700, dir: 1, y: -2},
                ].map((c, i) => (
                  <g key={`cow-end-${i}`} transform={`translate(0, ${c.y})`}>
                  <g className={c.dir > 0 ? "animal-cow-left" : "animal-cow"} style={{animationDelay: `${i * 3}s`}}>
                  <g transform={`translate(${c.x}, 203)`}>
                  <g className={c.dir > 0 ? "face-cow-left" : "face-cow"} style={{animationDelay: `${i * 3}s`}}>
                  <g transform={`translate(${-c.x}, -203)`} opacity="1">
                    <rect x={c.x - 5} y="201" width="11" height="7" fill="#f5f5f5" />
                    <rect x={c.x - 3.5} y="202" width="3" height="2.5" fill="#2f2f2f" />
                    <rect x={c.x + 1} y="201.5" width="3.5" height="2.5" fill="#2f2f2f" />
                    <rect x={c.x + (c.dir > 0 ? -7 : 5)} y="199" width="2.5" height="3" fill="#f5f5f5" />
                    <rect x={c.x + (c.dir > 0 ? -11 : 5.5)} y="197" width="5" height="5" fill="#f5f5f5" />
                    <rect x={c.x + (c.dir > 0 ? -10.5 : 6)} y="197.5" width="2.5" height="2" fill="#2f2f2f" />
                    <rect x={c.x + (c.dir > 0 ? -12.5 : 9)} y="200" width="2.5" height="2" fill="#ffb6c1" />
                    <rect x={c.x + (c.dir > 0 ? -12 : 9.5)} y="200.8" width="0.5" height="0.5" fill="#4a3520" />
                    <rect x={c.x + (c.dir > 0 ? -11 : 10.5)} y="200.8" width="0.5" height="0.5" fill="#4a3520" />
                    <rect x={c.x + (c.dir > 0 ? -8.5 : 7.5)} y="198.5" width="1" height="1" fill="#2f2f2f" />
                    <rect x={c.x + (c.dir > 0 ? -8.3 : 7.7)} y="198.5" width="0.4" height="0.5" fill="#ffffff" />
                    <rect x={c.x + (c.dir > 0 ? -10 : 6.5)} y="195.5" width="0.8" height="2" fill="#8a7a6a" />
                    <rect x={c.x + (c.dir > 0 ? -8 : 8.5)} y="195.5" width="0.8" height="2" fill="#8a7a6a" />
                    <rect x={c.x - 1.5} y="207" width="3" height="1.5" fill="#ffb6c1" />
                    <rect x={c.x - 4} y="207.5" width="1.3" height="4" fill="#e8e8e8" />
                    <rect x={c.x - 2} y="207.5" width="1.3" height="4" fill="#e8e8e8" />
                    <rect x={c.x + 1.5} y="207.5" width="1.3" height="4" fill="#e8e8e8" />
                    <rect x={c.x + 3.5} y="207.5" width="1.3" height="4" fill="#e8e8e8" />
                    <rect x={c.x - 4} y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={c.x - 2} y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={c.x + 1.5} y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={c.x + 3.5} y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                    <rect x={c.x + (c.dir > 0 ? 5 : -6.5)} y="202" width="1" height="5" fill="#2f2f2f" />
                  </g></g></g>
                  </g>
                  </g>
                ))}
              </g>

              {/* Sheep - de-crowded */}
              <g>
                {[
                  {x: 3890, dir: 1, y: -1},
                  {x: 4115, dir: -1, y: 4},
                  {x: 4300, dir: 1, y: -3},
                  {x: 4560, dir: -1, y: 0},
                  {x: 4790, dir: 1, y: -2},
                ].map((s, i) => (
                  <g key={`sheep-end-${i}`} transform={`translate(0, ${s.y})`}>
                  <g className={s.dir > 0 ? "animal-sheep-left" : "animal-sheep"} style={{animationDelay: `${i * 3.5}s`}}>
                  <g transform={`translate(${s.x}, 206)`}>
                  <g className={s.dir > 0 ? "face-sheep-left" : "face-sheep"} style={{animationDelay: `${i * 3.5}s`}}>
                  <g transform={`translate(${-s.x}, -206)`} opacity="1">
                    <rect x={s.x - 5} y="203" width="10" height="6" fill="#f5f5f5" />
                    <rect x={s.x - 4} y="203.5" width="2" height="1.5" fill="#e8e8e8" />
                    <rect x={s.x + 1} y="204" width="2" height="1.5" fill="#e8e8e8" />
                    <rect x={s.x - 2} y="206" width="2" height="1.5" fill="#e8e8e8" />
                    <rect x={s.x + (s.dir > 0 ? -8 : 4)} y="203.5" width="3.5" height="4" fill="#2f2f2f" />
                    <rect x={s.x + (s.dir > 0 ? -8.5 : 4)} y="203" width="1.2" height="1.5" fill="#2f2f2f" />
                    <rect x={s.x + (s.dir > 0 ? -5.5 : 6.5)} y="203" width="1.2" height="1.5" fill="#2f2f2f" />
                    <rect x={s.x + (s.dir > 0 ? -7 : 5.5)} y="204.5" width="0.8" height="0.8" fill="#ffffff" />
                    <rect x={s.x + (s.dir > 0 ? -6.8 : 5.7)} y="204.5" width="0.3" height="0.4" fill="#1a1a1a" />
                    <rect x={s.x + (s.dir > 0 ? -8.5 : 7)} y="206" width="1" height="0.7" fill="#1a1a1a" />
                    <rect x={s.x - 3.5} y="208.5" width="1" height="3" fill="#2f2f2f" />
                    <rect x={s.x - 1.5} y="208.5" width="1" height="3" fill="#2f2f2f" />
                    <rect x={s.x + 1} y="208.5" width="1" height="3" fill="#2f2f2f" />
                    <rect x={s.x + 3} y="208.5" width="1" height="3" fill="#2f2f2f" />
                    <rect x={s.x + (s.dir > 0 ? 4.5 : -5.5)} y="204" width="1.5" height="2" fill="#f5f5f5" />
                  </g></g></g>
                  </g>
                  </g>
                ))}
              </g>

              {/* Chickens - de-crowded */}
              <g>
                {[
                  {x: 3815, y: 2, dir: 1},
                  {x: 3955, y: -2, dir: -1},
                  {x: 4185, y: 1, dir: 1},
                  {x: 4435, y: -1, dir: -1},
                  {x: 4630, y: -1, dir: 1},
                  {x: 4825, y: 1, dir: -1},
                ].map((ch, i) => (
                  <g key={`chicken-end-${i}`} transform={`translate(0, ${ch.y})`}>
                  <g className={ch.dir > 0 ? "animal-chicken-left" : "animal-chicken"} style={{animationDelay: `${i * 1.5}s`}}>
                  <g transform={`translate(${ch.x}, 208)`}>
                  <g className={ch.dir > 0 ? "face-chicken-left" : "face-chicken"} style={{animationDelay: `${i * 1.5}s`}}>
                  <g transform={`translate(${-ch.x}, -208)`} opacity="1">
                    <rect x={ch.x - 2.5} y="207.5" width="5" height="3.5" fill="#d4a574" />
                    <rect x={ch.x + (ch.dir > 0 ? 0 : -2)} y="208" width="2" height="2" fill="#b8946a" />
                    <rect x={ch.x + (ch.dir > 0 ? 2 : -4)} y="206" width="2" height="3" fill="#8b6f47" />
                    <rect x={ch.x + (ch.dir > 0 ? -4 : 2)} y="206" width="2.5" height="2.5" fill="#d4a574" />
                    <rect x={ch.x + (ch.dir > 0 ? -3.5 : 2.5)} y="204.5" width="1.5" height="1.8" fill="#cc3333" />
                    <rect x={ch.x + (ch.dir > 0 ? -3.5 : 2.5)} y="208" width="0.8" height="0.8" fill="#cc3333" />
                    <rect x={ch.x + (ch.dir > 0 ? -5 : 4)} y="207" width="1.5" height="0.8" fill="#ffd700" />
                    <rect x={ch.x + (ch.dir > 0 ? -3 : 3)} y="206.5" width="0.5" height="0.5" fill="#2f2f2f" />
                    <rect x={ch.x - 1} y="210.5" width="0.7" height="2" fill="#e8a020" />
                    <rect x={ch.x + 0.7} y="210.5" width="0.7" height="2" fill="#e8a020" />
                    <rect x={ch.x - 1.5} y="212" width="1.5" height="0.5" fill="#e8a020" />
                    <rect x={ch.x + 0.5} y="212" width="1.5" height="0.5" fill="#e8a020" />
                  </g></g></g>
                  </g>
                  </g>
                ))}
              </g>

              {/* FOREGROUND: Drinking animals at ending pond - Minecraft blocky style */}
              <g>
                {/* Cow drinking - head lowered to water */}
                <g className="animal-drinking" style={{animationDelay: '2s', animationDuration: '11s'}}>
                  <rect x={4843} y="207" width="11" height="7" fill="#f5f5f5" />
                  <rect x={4844.5} y="208" width="3" height="2.5" fill="#2f2f2f" />
                  <rect x={4849} y="207.5" width="3.5" height="2.5" fill="#2f2f2f" />
                  <rect x={4839} y="210" width="4.5" height="3" fill="#f5f5f5" />
                  <rect x={4835} y="211" width="5" height="4.5" fill="#f5f5f5" />
                  <rect x={4835.5} y="211.5" width="2" height="1.5" fill="#2f2f2f" />
                  <rect x={4833.5} y="213.5" width="2" height="2" fill="#ffb6c1" />
                  <rect x={4837.5} y="212" width="1" height="1" fill="#2f2f2f" />
                  <rect x={4833} y="216" width="6" height="0.5" fill="#6a9aba" opacity="0.4" />
                  <rect x={4832} y="216.5" width="8" height="0.5" fill="#6a9aba" opacity="0.2" />
                  <rect x={4847} y="213" width="3" height="1.5" fill="#ffb6c1" />
                  <rect x={4844} y="213.5" width="1.3" height="3" fill="#e8e8e8" />
                  <rect x={4846} y="213.5" width="1.3" height="3" fill="#e8e8e8" />
                  <rect x={4850} y="213.5" width="1.3" height="3" fill="#e8e8e8" />
                  <rect x={4852} y="213.5" width="1.3" height="3" fill="#e8e8e8" />
                  <rect x={4844} y="216" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={4846} y="216" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={4850} y="216" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={4852} y="216" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={4853.5} y="208" width="1" height="5" fill="#2f2f2f" />
                </g>

                {/* Horse drinking - head lowered */}
                <g className="animal-drinking" style={{animationDelay: '6s', animationDuration: '9s'}}>
                  <rect x={4809} y="204" width="12" height="7" fill="#654321" />
                  <rect x={4817} y="204" width="4" height="7" fill="#7a5230" />
                  <rect x={4820} y="208" width="3" height="5" fill="#654321" />
                  <rect x={4820} y="211" width="6" height="4" fill="#654321" />
                  <rect x={4824.5} y="213" width="2" height="2" fill="#7a5230" />
                  <rect x={4823} y="212" width="1" height="1" fill="#2f2f2f" />
                  <rect x={4825.5} y="214" width="0.5" height="0.5" fill="#3a2a1a" />
                  <rect x={4823} y="215.5" width="5" height="0.5" fill="#6a9aba" opacity="0.4" />
                  <rect x={4822} y="216" width="7" height="0.5" fill="#6a9aba" opacity="0.2" />
                  <rect x={4810} y="210.5" width="1.3" height="4.5" fill="#654321" />
                  <rect x={4812.5} y="210.5" width="1.3" height="4.5" fill="#654321" />
                  <rect x={4815} y="210.5" width="1.3" height="4.5" fill="#654321" />
                  <rect x={4817.5} y="210.5" width="1.3" height="4.5" fill="#654321" />
                  <rect x={4810} y="214.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={4812.5} y="214.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={4815} y="214.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={4817.5} y="214.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={4808} y="205" width="1.5" height="5" fill="#4a3520" />
                  <rect x={4820} y="208" width="1" height="4" fill="#4a3520" />
                </g>

                {/* Chickens bathing - Minecraft blocky style */}
                {[4826, 4831, 4835].map((cx, ci) => (
                  <g key={`chicken-bath-end-${ci}`} className="chicken-bathing" style={{animationDelay: `${ci * 1.5 + 0.5}s`}}>
                    <rect x={cx - 2} y="216" width="4" height="2" fill="#d4a574" />
                    <rect x={cx - 3} y="217.5" width="6" height="0.5" fill="#6a9aba" opacity="0.35" />
                    <rect x={cx - 3} y="214.5" width="2" height="2" fill="#d4a574" />
                    <rect x={cx - 2.5} y="213.5" width="1.2" height="1.2" fill="#cc3333" />
                    <rect x={cx - 4} y="215.5" width="1.2" height="0.6" fill="#ffd700" />
                    <rect x={cx - 2.5} y="215" width="0.4" height="0.4" fill="#2f2f2f" />
                    <rect x={cx + 1.5} y="215.5" width="0.5" height="0.5" fill="#6a9aba" opacity="0.5" />
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
